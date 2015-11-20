export const NonNullDirective =
`const HelloType = new GraphQLObjectType({
  name: "Hello",
  fields: () => ({
    world: {
      type: new GraphQLNonNull(GraphQLString)
    }
  })
});`

export const StringType =
`const HelloType = new GraphQLObjectType({
  name: "Hello",
  fields: () => ({
    world: {
      type: GraphQLString
    }
  })
});`

export const IntType =
`const HelloType = new GraphQLObjectType({
  name: "Hello",
  fields: () => ({
    world: {
      type: GraphQLInt
    }
  })
});`

export const FloatType =
`const HelloType = new GraphQLObjectType({
  name: "Hello",
  fields: () => ({
    world: {
      type: GraphQLFloat
    }
  })
});`

export const BooleanType =
`const HelloType = new GraphQLObjectType({
  name: "Hello",
  fields: () => ({
    world: {
      type: GraphQLBoolean
    }
  })
});`

export const IdType =
`const HelloType = new GraphQLObjectType({
  name: "Hello",
  fields: () => ({
    world: {
      type: GraphQLID
    }
  })
});`

export const Enum =
`const HelloEnum = new GraphQLEnumType({
  name: "Hello",
  values: {
    WORLD: {},
    STAR: {},
    UNIVERSE: {}
  }
});`

