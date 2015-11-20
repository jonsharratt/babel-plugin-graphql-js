export const NonNullDirective =
`{
  Hello: new GraphQLObjectType({
    name: "Hello",
    fields: () => ({
      world: {
        type: new GraphQLNonNull(GraphQLString)
      }
    })
  })
}`

export const StringType =
`{
  Hello: new GraphQLObjectType({
    name: "Hello",
    fields: () => ({
      world: {
        type: GraphQLString
      }
    })
  })
}`

export const IntType =
`{
  Hello: new GraphQLObjectType({
    name: "Hello",
    fields: () => ({
      world: {
        type: GraphQLInt
      }
    })
  })
}`

export const FloatType =
`{
  Hello: new GraphQLObjectType({
    name: "Hello",
    fields: () => ({
      world: {
        type: GraphQLFloat
      }
    })
  })
}`

export const BooleanType =
`{
  Hello: new GraphQLObjectType({
    name: "Hello",
    fields: () => ({
      world: {
        type: GraphQLBoolean
      }
    })
  })
}`

export const IdType =
`{
  Hello: new GraphQLObjectType({
    name: "Hello",
    fields: () => ({
      world: {
        type: GraphQLID
      }
    })
  })
}`

export const Enum =
`{
  Hello: new GraphQLEnumType({
    name: "Hello",
    values: {
      WORLD: {},
      STAR: {},
      UNIVERSE: {}
    }
  })
}`

export const Lists =
`{
  Hello: new GraphQLObjectType({
    name: "Hello",
    fields: () => ({
      world: {
        type: new GraphQLList(GraphQLString)
      }
    })
  })
}`

export const Example =
`{
  Customer: new GraphQLObjectType({
    name: "Customer",
    fields: () => ({
      contactNumber: {
        type: new GraphQLNonNull(GraphQLString)
      },
      accessToken: {
        type: new GraphQLNonNull(GraphQLString)
      },
      refreshToken: {
        type: new GraphQLNonNull(GraphQLString)
      }
    })
  })
}`

export const StarWars =
`{
  Episode: new GraphQLEnumType({
    name: "Episode",
    values: {
      NEWHOPE: {},
      EMPIRE: {},
      JEDI: {}
    }
  }),
  Human: new GraphQLObjectType({
    name: "Human",
    fields: () => ({
      id: {
        type: new GraphQLNonNull(GraphQLString)
      },
      name: {
        type: GraphQLString
      },
      homePlanet: {
        type: GraphQLString
      }
    })
  }),
  Droid: new GraphQLObjectType({
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
  })
}`
