## GraphQL Schema to GraphQL.js Plugin
[![Circle CI](https://circleci.com/gh/jonsharratt/babel-graphql-js.svg?style=shield)](https://circleci.com/gh/jonsharratt/babel-graphql-js)

#### Still in active development, not ready for use.
#### Declaring types should all work fine just now as per example.
#### Queries are still a work in progress.

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
    name: {
      resolve: () => { return 'Joe Blogs'; }
    },
    description: 'A mechanical creature in the Star Wars universe.'
  }
}
}`;


