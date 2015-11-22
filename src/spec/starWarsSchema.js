export const schema = `

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
}`;

export const fields = `
{
  Character: {
    resolveType: character => {
      return getHuman(character.id) ? humanType : droidType;
    }
  },
  Droid: {
    friends: {
      resolve: droid => getFriends(droid),
    }
  }
}
`;
