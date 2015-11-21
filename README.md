## GraphQL Schema to GraphQL.js Plugin

Still very much experiemental.

Example:
```
const schema = graphql`
  enum Episode { NEWHOPE, EMPIRE, JEDI }
  
  interface Character {
    id: String!
    name: String
    friends: [Character]
    appearsIn: [Episode]
  }
  type Human implements Character {
    id: String!
    name: String
    friends: [Character]
    appearsIn: [Episode]
    homePlanet: String
  }
  type Droid implements Character {
    id: String!
    name: String
    friends: [Character]
    appearsIn: [Episode]
    primaryFunction: String
  }
`
```

Will produce the following:

```
const schema = {
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
        },
        friends: {
          type: new GraphQLList(this.Character())
        },
        appearsIn: {
          type: new GraphQLList(this.Episode())
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
        appearsIn: {
          type: new GraphQLList(this.Episode())
        },
        homePlanet: {
          type: GraphQLString
        }
      }),
      interfaces: [this.Character()]
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
        friends: {
          type: new GraphQLList(this.Character())
        },
        appearsIn: {
          type: new GraphQLList(this.Episode())
        },
        primaryFunction: {
          type: GraphQLString
        }
      }),
      interfaces: [this.Character()]
    });
  }
}
```
