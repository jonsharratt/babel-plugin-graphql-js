export const NonNullDirective =
`(function () {
  const Hello = new GraphQLObjectType({
    name: "Hello",
    fields: () => ({
      world: {
        type: new GraphQLNonNull(GraphQLString)
      }
    })
  });
  return {
    Hello: Hello
  };
})()`;

export const MultipleInterfaces =
`(function () {
  const Hello = new GraphQLObjectType({
    name: "Hello",
    interfaces: [World, Universe]
  });
  return {
    Hello: Hello
  };
})()`;

export const SingleInterface =
`(function () {
  const Hello = new GraphQLObjectType({
    name: "Hello",
    interfaces: [World]
  });
  return {
    Hello: Hello
  };
})()`;

export const InterfaceResolver =
`(function () {
  const Hello = new GraphQLInterfaceType({
    name: "Hello",
    fields: () => ({
      world: {
        type: GraphQLString
      }
    }),
    resolveType: () => {
      return "foo";
    }
  });
  return {
    Hello: Hello
  };
})()`;

export const FieldResolver =
`(function () {
  const Hello = new GraphQLObjectType({
    name: "Hello",
    fields: () => ({
      world: {
        type: GraphQLString,
        resolve: () => {
          return "foo";
        } }
    })
  });
  return {
    Hello: Hello
  };
})()`;

export const BasicQuery =
`(function () {
  const Query = new GraphQLObjectType({
    name: "Query",
    fields: () => ({
      hello: {
        type: World,
        args: {
          id: {
            type: GraphQLString
          }
        }
      }
    })
  });
  return {
    Query: Query
  };
})()`;

export const StringType =
`(function () {
  const Hello = new GraphQLObjectType({
    name: "Hello",
    fields: () => ({
      world: {
        type: GraphQLString
      }
    })
  });
  return {
    Hello: Hello
  };
})()`;

export const IntType =
`(function () {
  const Hello = new GraphQLObjectType({
    name: "Hello",
    fields: () => ({
      world: {
        type: GraphQLInt
      }
    })
  });
  return {
    Hello: Hello
  };
})()`;

export const FloatType =
`(function () {
  const Hello = new GraphQLObjectType({
    name: "Hello",
    fields: () => ({
      world: {
        type: GraphQLFloat
      }
    })
  });
  return {
    Hello: Hello
  };
})()`;

export const BooleanType =
`(function () {
  const Hello = new GraphQLObjectType({
    name: "Hello",
    fields: () => ({
      world: {
        type: GraphQLBoolean
      }
    })
  });
  return {
    Hello: Hello
  };
})()`;

export const IdType =
`(function () {
  const Hello = new GraphQLObjectType({
    name: "Hello",
    fields: () => ({
      world: {
        type: GraphQLID
      }
    })
  });
  return {
    Hello: Hello
  };
})()`;

export const Enum =
`(function () {
  const Hello = new GraphQLEnumType({
    name: "Hello",
    values: {
      WORLD: {},
      STAR: {},
      UNIVERSE: {}
    }
  });
  return {
    Hello: Hello
  };
})()`;

export const Lists =
`(function () {
  const Hello = new GraphQLObjectType({
    name: "Hello",
    fields: () => ({
      world: {
        type: new GraphQLList(GraphQLString)
      }
    })
  });
  return {
    Hello: Hello
  };
})()`;

export const StarWars =
`(function () {
  const Episode = new GraphQLEnumType({
    name: "Episode",
    values: {
      NEWHOPE: {},
      EMPIRE: {},
      JEDI: {}
    }
  });
  const Character = new GraphQLInterfaceType({
    name: "Character",
    fields: () => ({
      id: {
        type: new GraphQLNonNull(GraphQLString)
      },
      name: {
        type: GraphQLString
      },
      friends: {
        type: new GraphQLList(Character)
      },
      appearsIn: {
        type: new GraphQLList(Episode)
      }
    }),
    resolveType: character => {
      return getHuman(character.id) ? humanType : droidType;
    }
  });
  const Human = new GraphQLObjectType({
    name: "Human",
    fields: () => ({
      id: {
        type: new GraphQLNonNull(GraphQLString)
      },
      name: {
        type: GraphQLString
      },
      friends: {
        type: new GraphQLList(Character)
      },
      appearsIn: {
        type: new GraphQLList(Episode)
      },
      homePlanet: {
        type: GraphQLString
      }
    }),
    interfaces: [Character]
  });
  const Droid = new GraphQLObjectType({
    name: "Droid",
    fields: () => ({
      id: {
        type: new GraphQLNonNull(GraphQLString)
      },
      name: {
        type: GraphQLString
      },
      friends: {
        type: new GraphQLList(Character),

        resolve: droid => getFriends(droid)
      },
      appearsIn: {
        type: new GraphQLList(Episode)
      },
      primaryFunction: {
        type: GraphQLString
      }
    }),
    interfaces: [Character]
  });
  return {
    Episode: Episode,
    Character: Character,
    Human: Human,
    Droid: Droid
  };
})()`;
