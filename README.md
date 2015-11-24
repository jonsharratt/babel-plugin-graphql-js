## GraphQL Schema to GraphQL.js Plugin
[![Circle CI](https://circleci.com/gh/jonsharratt/babel-plugin-graphql-js/tree/master.svg?style=svg)](https://circleci.com/gh/jonsharratt/babel-plugin-graphql-js/tree/master)

Babel plugin that uses a tagged template string with two expressions, the first being the string of the GraphQL Schema Language.  The second being a decorator object to apply resolvers, descriptions and deprecations.

##Tagged Template String
```
graphql`${"schema"} ${decorator}`
```

###Example
```js
const StarWarsTypes = graphql`${`

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

type Query {
  hero(episode: Episode): Character
  human(id: String!): Human
  droid(id: String!): Droid
}
`}${
{
  Character: {
    description: 'A character in the Star Wars Trilogy',
    resolveType: () => { return StarWarsSchema.Human; },
    id: {
      description: 'The id of the character.'
    }
  },
  Droid: {
    description: 'A mechanical creature in the Star Wars universe.'
    name: {
      resolve: () => { return 'Buzz Droid'; }
    }
  }
}
}`;
```

Using [https://github.com/graphql/express-graphql](https://github.com/graphql/express-graphql) you can then easily setup your GraphQL endpoint.

```js
export var StarWarsSchema = new GraphQLSchema({
  query: StarWarsTypes.Query
});

const app = express();
app.use('/', graphqlHTTP({ schema: StarWarsSchema, graphiql: true }));

const server = app.listen(3000, function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
})
```

