import express from 'express';
import graphqlHTTP from 'express-graphql';
import {
  GraphQLSchema,
  GraphQLInterfaceType,
  GraphQLEnumType,
  GraphQLList,
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull
} from 'graphql'

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
    },
    name: {
      description: 'The name of the character.'
    }
  },
  Droid: {
    description: 'A mechanical creature in the Star Wars universe.'
  }
}
}`;

export var StarWarsSchema = new GraphQLSchema({
  query: StarWarsTypes.Query
});

const app = express();
app.use('/',
  graphqlHTTP({
    schema: StarWarsSchema,
    graphiql: true
}));

const server = app.listen(3000, function () {
  const host = server.address().address;
  const port = server.address().port;
  console.log('Example app listening at http://%s:%s', host, port);
});

