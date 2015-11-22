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
const KINDS_MAPPING = {
  [kinds.OBJECT_TYPE_DEFINITION]: GraphQLObjectType,
  [kinds.INTERFACE_TYPE_DEFINITION]: GraphQLInterfaceType,
  [kinds.ENUM_TYPE_DEFINITION]: GraphQLEnumType
};

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
    default:
      return t.identifier(type.name.value);
    }
    break;
  default:
    return t.identifier(type.name.value);
  }
}

function getInterfaces(node) {
  const interfaces = t.arrayExpression(
    node.interfaces.map(iface => { return getType(iface); })
  );

  return t.objectProperty(t.identifier('interfaces'), interfaces);
}

function getFieldDecorators(name, decorators) {
  const fieldDecorator = decorators.filter(p => {
    return p.key.name === name;
  })[0];

  if (fieldDecorator) {
    return fieldDecorator.value.properties;
  }
}

function getFields(node, decorators) {
  const fields = node.fields.map(f => {
    let fieldProperties = [
      t.objectProperty(t.identifier('type'), getType(f.type))
    ];

    if (decorators) {
      const fieldDecorators = getFieldDecorators(f.name.value, decorators);
      if (fieldDecorators) {
        fieldProperties = fieldProperties.concat(fieldDecorators);
      }
    }

    return t.objectProperty(
      t.identifier(f.name.value),
      t.objectExpression(fieldProperties));
  });

  return t.objectProperty(t.identifier('fields'),
         t.arrowFunctionExpression([], t.objectExpression(fields)));
}

function getValues(node) {
  const values = node.values.map(v => {
    return t.objectProperty(t.identifier(v.name.value), t.objectExpression([]));
  });

  return t.objectProperty(t.identifier('values'), t.objectExpression(values));
}

function getName(node) {
  return t.objectProperty(t.identifier('name'),
         t.stringLiteral(node.name.value));
}

function getBody(node, decorators) {
  let body = [];
  body.push(getName(node));

  if (node.fields && node.fields.length) {
    body.push(getFields(node, decorators));
  }

  if (node.values && node.values.length) {
    body.push(getValues(node));
  }

  if (node.interfaces && node.interfaces.length) {
    body.push(getInterfaces(node));
  }

  if (decorators) {
    const typeDecorators = decorators
    .filter(d => {
      return d.value.type !== 'ObjectExpression';
    }).map(d => {
      return t.objectProperty(t.identifier(d.key.name), d.value);
    });

    if (typeDecorators) {
      body = body.concat(typeDecorators);
    }
  }

  return [t.objectExpression(body)];
}

function typeDefinition(graphQLType, node, decorators) {
  return t.variableDeclaration('const',
         [t.variableDeclarator(t.identifier(`${node.name.value}`),
          t.newExpression(t.identifier(graphQLType.name), getBody(node, decorators)))]);
}

export default function() {
  return {
    visitor: {
      TaggedTemplateExpression: {
        enter: function(path) {
          if (path.node.tag.name === SCHEMA_TAG) {
            const root = [];
            const exports = [];

            const schema = path.node.quasi.expressions[0].quasis[0].value.raw;
            const decorator = path.node.quasi.expressions[1];
            const ast = parse(schema);

            visit(ast, {
              enter(node) {
                switch(node.kind) {
                case kinds.OBJECT_TYPE_DEFINITION:
                case kinds.ENUM_TYPE_DEFINITION:
                case kinds.INTERFACE_TYPE_DEFINITION:
                  let decorators = getDecorator(node, decorator);
                  exports.push(t.objectProperty(t.identifier(node.name.value), t.identifier(node.name.value)));
                  root.push(typeDefinition(KINDS_MAPPING[node.kind], node, decorators));
                  break;
                }
              }
            });

            root.push(getExports(exports));
            path.replaceWithMultiple(t.callExpression(
              t.functionExpression(null, [], t.blockStatement(root)),
            []));
          }
        }
      }
    }
  };
}

function getExports(exports) {
  return t.returnStatement(t.objectExpression(exports));
}

function getDecorator(node, all) {
  const typeProps = all ? all.properties.filter(p => {
    return p.key.name === node.name.value;
  })[0] : null;
  return typeProps ? typeProps.value.properties : null;
}

