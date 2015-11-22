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
  }
}
}`;

var queryType = new GraphQLObjectType({
  name: 'Query',
  fields: () => ({
    hero: {
      type: StarWarsTypes.Character,
      args: {
        episode: {
          description: 'If omitted, returns the hero of the whole saga. If ' +
                       'provided, returns the hero of that particular episode.',
          type: StarWarsTypes.Episode
        }
      }
    },
    human: {
      type: StarWarsTypes.Human,
      args: {
        id: {
          description: 'id of the human',
          type: new GraphQLNonNull(GraphQLString)
        }
      }
    },
    droid: {
      type: StarWarsTypes.Droid,
      args: {
        id: {
          description: 'id of the droid',
          type: new GraphQLNonNull(GraphQLString)
        }
      }
    },
  })
});
export var StarWarsSchema = new GraphQLSchema({
  query: queryType
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
