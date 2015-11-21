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
      return t.callExpression(t.memberExpression(t.thisExpression(),
             t.identifier(type.name.value)), []);
  }
}

function getInterfaces(node) {
  const interfaces = t.arrayExpression(
    node.interfaces.map(iface => { return getType(iface); })
  );

  return t.objectProperty(t.identifier('interfaces'), interfaces);
}

function getFields(node) {
  const fields = node.fields.map(f => {
    return t.objectProperty(
      t.identifier(f.name.value),
      t.objectExpression([
        t.objectProperty(t.identifier('type'), getType(f.type))
      ]))
  });

  return t.objectProperty(t.identifier('fields'),
         t.arrowFunctionExpression([], t.objectExpression(fields)));
}

function getValues(node) {
  const values = node.values.map(v => {
    return t.objectProperty(t.identifier(v.name.value), t.objectExpression([]));
  });

  return t.objectProperty(t.identifier('values'), t.objectExpression(values))
}

function getName(node) {
  return t.objectProperty(t.identifier('name'),
         t.stringLiteral(node.name.value));
}

function getTypeDefintionBody(node) {
  const body = [];

  body.push(getName(node));

  if (node.fields && node.fields.length) {
    body.push(getFields(node));
  }

  if (node.values && node.values.length) {
    body.push(getValues(node));
  }

  if (node.interfaces && node.interfaces.length) {
    body.push(getInterfaces(node));
  }

  return [t.objectExpression(body)]
}

function graphQLTypeDefinition(graphQLType, node) {
  const typeName = node.name.value;

  return t.objectProperty(t.identifier(typeName),
    t.functionExpression(null, [], t.blockStatement(
      [t.returnStatement(
        t.newExpression(t.identifier(graphQLType), getTypeDefintionBody(node))
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
            const schema = path.node.quasi.expressions[0].quasis[0].value.raw;

            const ast = parse(schema);

            visit(ast, {
              enter(node) {
                switch(node.kind) {
                  case kinds.OBJECT_TYPE_DEFINITION:
                    result.push(graphQLTypeDefinition(GraphQLObjectType.name, node));
                    break;
                  case kinds.ENUM_TYPE_DEFINITION:
                    result.push(graphQLTypeDefinition(GraphQLEnumType.name, node));
                    break;
                  case kinds.INTERFACE_TYPE_DEFINITION:
                    result.push(graphQLTypeDefinition(GraphQLInterfaceType.name, node));
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

