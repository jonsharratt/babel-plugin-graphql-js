export const NonNullDirective =
`{
  Hello: function () {
    return new GraphQLObjectType({
      name: "Hello",
      fields: () => ({
        world: {
          type: new GraphQLNonNull(GraphQLString)
        }
      })
    });
  }
}`

export const StringType =
`{
  Hello: function () {
    return new GraphQLObjectType({
      name: "Hello",
      fields: () => ({
        world: {
          type: GraphQLString
        }
      })
    });
  }
}`

export const IntType =
`{
  Hello: function () {
    return new GraphQLObjectType({
      name: "Hello",
      fields: () => ({
        world: {
          type: GraphQLInt
        }
      })
    });
  }
}`

export const FloatType =
`{
  Hello: function () {
    return new GraphQLObjectType({
      name: "Hello",
      fields: () => ({
        world: {
          type: GraphQLFloat
        }
      })
    });
  }
}`

export const BooleanType =
`{
  Hello: function () {
    return new GraphQLObjectType({
      name: "Hello",
      fields: () => ({
        world: {
          type: GraphQLBoolean
        }
      })
    });
  }
}`

export const IdType =
`{
  Hello: function () {
    return new GraphQLObjectType({
      name: "Hello",
      fields: () => ({
        world: {
          type: GraphQLID
        }
      })
    });
  }
}`

export const Enum =
`{
  Hello: function () {
    return new GraphQLEnumType({
      name: "Hello",
      values: {
        WORLD: {},
        STAR: {},
        UNIVERSE: {}
      }
    });
  }
}`

export const Lists =
`{
  Hello: function () {
    return new GraphQLObjectType({
      name: "Hello",
      fields: () => ({
        world: {
          type: new GraphQLList(GraphQLString)
        }
      })
    });
  }
}`

export const StarWars =
`{
  Episode: function () {
    return new GraphQLEnumType({
      name: "Episode",
      values: {
        NEWHOPE: {},
        EMPIRE: {},
        JEDI: {}
      }
    });
  },
  Character: function () {
    return new GraphQLInterfaceType({
      name: "Character",
      fields: () => ({
        id: {
          type: new GraphQLNonNull(GraphQLString)
        },
        name: {
          type: GraphQLString
        }
      })
    });
  },
  Human: function () {
    return new GraphQLObjectType({
      name: "Human",
      fields: () => ({
        id: {
          type: new GraphQLNonNull(GraphQLString)
        },
        name: {
          type: GraphQLString
        },
        friends: {
          type: new GraphQLList(this.Character())
        },
        homePlanet: {
          type: GraphQLString
        }
      })
    });
  },
  Droid: function () {
    return new GraphQLObjectType({
      name: "Droid",
      fields: () => ({
        id: {
          type: new GraphQLNonNull(GraphQLString)
        },
        name: {
          type: GraphQLString
        },
        primaryFunction: {
          type: GraphQLString
        }
      })
    });
  }
}`
