import * as t from 'babel-types';

import {
  GraphQLEnumType,
  GraphQLObjectType,
  GraphQLInterfaceType,
  GraphQLNonNull,
  GraphQLList,
  GraphQLString,
  GraphQLInt,
  GraphQLBoolean,
  GraphQLFloat,
  GraphQLID
} from 'graphql';

import { parse, visit } from 'graphql/language';
import * as kinds from 'graphql/language/kinds';

const SCHEMA_TAG = 'graphql';

function getType(type) {
  switch(type.kind) {
    case kinds.NON_NULL_TYPE:
      return t.newExpression(t.identifier(GraphQLNonNull.name), [getType(type.type)]);
    case kinds.LIST_TYPE:
      return t.newExpression(t.identifier(GraphQLList.name), [getType(type.type)]);
    case kinds.NAMED_TYPE:
      switch(type.name.value) {
        case GraphQLString.name:
        case GraphQLInt.name:
        case GraphQLFloat.name:
        case GraphQLBoolean.name:
        case GraphQLID.name:
          return t.identifier(`GraphQL${type.name.value}`);
      }
    default:
      return t.callExpression(t.memberExpression(t.thisExpression(), t.identifier(type.name.value)), []);
  }
}

function graphQLEnumTypeDefinition(node) {
  const typeName = node.name.value;
  const values = node.values.map(v => {
    return t.objectProperty(t.identifier(v.name.value), t.objectExpression([]));
  });

  return t.objectProperty(t.identifier(typeName),
    t.functionExpression(null, [], t.blockStatement(
      [t.returnStatement(
        t.newExpression(
          t.identifier(GraphQLEnumType.name),
          [t.objectExpression([
            t.objectProperty(t.identifier('name'), t.stringLiteral(typeName)),
            t.objectProperty(t.identifier('values'), t.objectExpression(values))
          ])]
    ))])));
}

function graphQLTypeDefinition(name, node) {
  const typeName = node.name.value;
  const fields = node.fields.map(f => {

  return t.objectProperty(
    t.identifier(f.name.value),
    t.objectExpression([
      t.objectProperty(t.identifier('type'), getType(f.type))
    ]))
  });

  return t.objectProperty(t.identifier(typeName),
    t.functionExpression(null, [], t.blockStatement(
      [t.returnStatement(
        t.newExpression(
          t.identifier(name),
          [t.objectExpression([
          t.objectProperty(t.identifier('name'), t.stringLiteral(typeName)),
          t.objectProperty(t.identifier('fields'), t.arrowFunctionExpression([],
            t.objectExpression(fields)
          ))])])
      )]
    ))
  );
}

export default function() {
  return {
    visitor: {
      TaggedTemplateExpression: {
        enter: function(path) {
          if (path.node.tag.name === SCHEMA_TAG) {
            const result = [];
            const schema = path.node.quasi.quasis[0].value.raw;
            const ast = parse(schema);

            visit(ast, {
              enter(node) {
                switch(node.kind) {
                  case kinds.OBJECT_TYPE_DEFINITION:
                    result.push(graphQLTypeDefinition(GraphQLObjectType.name, node));
                    break;
                  case kinds.INTERFACE_TYPE_DEFINITION:
                    result.push(graphQLTypeDefinition(GraphQLInterfaceType.name, node));
                    break;
                  case kinds.ENUM_TYPE_DEFINITION:
                    result.push(graphQLEnumTypeDefinition(node));
                    break;
                }
              }
            });
            path.parentPath.replaceWithMultiple(t.objectExpression(result));
          }
        }
      }
    }
  };
}

