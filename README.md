## GraphQL Schema to GraphQL.js Plugin
[![Circle CI](https://circleci.com/gh/jonsharratt/babel-graphql-js.svg?style=shield)](https://circleci.com/gh/jonsharratt/babel-graphql-js)

#### Still in active development, not ready for use.

Babel plugin that uses a tagged template string with two expressions, the first being the string of the GraphQL Schema Language.  The second being a decorator object to apply resolvers, descriptions and deprecations.

##Tagged Template String
```
graphql`${'schema'} ${decorator}`
```

###Example
```js
const starwars = `

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
}`
```

```js
const decorator = {
  Droid: {
    friends: {
      resolve: droid => getFriends(droid)
    }
  }
}
```

```js
const schema = graphql`${starwars} ${decorator}`
```


