import * as t from 'babel-types';
import { parse, visit } from 'graphql/language';
import * as kinds from 'graphql/language/kinds';

const SCHEMA_TAG = 'graphql';

function buildGraphQLEnumType(node) {
  const typeName = node.name.value;
  const values = node.values.map(v => {
    return t.objectProperty(
      t.identifier(v.name.value),
      t.objectExpression([]))
  });

  return t.objectProperty(t.identifier(typeName), t.newExpression(
      t.identifier('GraphQLEnumType'),
      [t.objectExpression([
        t.objectProperty(t.identifier('name'), t.stringLiteral(typeName)),
        t.objectProperty(t.identifier('values'), t.objectExpression(values))
      ])]
     ));
}

function buildGraphQLObjectType(node) {
  const typeName = node.name.value;
  const fields = node.fields.map(f => {
    let type;
    switch(f.type.kind) {
      case 'NonNullType':
        type = t.newExpression(
          t.identifier('GraphQLNonNull'), [t.identifier(`GraphQL${f.type.type.name.value}`)]);
        break;
      default:
        type = t.identifier(`GraphQL${f.type.name.value}`);
        break;
    }

    return t.objectProperty(
      t.identifier(f.name.value),
      t.objectExpression([
        t.objectProperty(t.identifier('type'),
        type)
      ]))
  });

  return t.objectProperty(t.identifier(typeName), t.newExpression(
      t.identifier('GraphQLObjectType'),
      [t.objectExpression([
        t.objectProperty(t.identifier('name'), t.stringLiteral(typeName)),
        t.objectProperty(t.identifier('fields'), t.arrowFunctionExpression([],
          t.objectExpression(fields)
        ))])]));
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
                  case 'ObjectTypeDefinition':
                    result.push(buildGraphQLObjectType(node));
                    break;
                  case 'EnumTypeDefinition':
                    result.push(buildGraphQLEnumType(node));
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

