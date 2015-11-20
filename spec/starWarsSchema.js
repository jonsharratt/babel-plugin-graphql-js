export const schema = `

enum Episode { NEWHOPE, EMPIRE, JEDI }

interface Character {
  id: String!
  name: String
}

type Human implements Character {
  id: String!
  name: String
  homePlanet: String
}

type Droid implements Character {
  id: String!
  name: String
  primaryFunction: String
}`
