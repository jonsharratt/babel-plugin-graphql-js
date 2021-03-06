import { expect } from 'chai';
import * as expectations from './expectations';

import { schema, fields } from './starWarsSchema';

const transform = (str) => {
  return require('babel-core').transform(str, {
    plugins: ['./src']
  }).code;
};

describe('Schema', () => {
  it('StarWars', () => {
    const code = schema;
    expect(transform('graphql`${`' + code + '`}${' + fields +'}`')).to.equal(`${expectations.StarWars}`);
  });

  it('Query', () => {
    const code = 'graphql`${`type Query { hello(id: String): World }`}`';
    expect(transform(code)).to.equal(`${expectations.BasicQuery}`);
  });

  describe('Resolvers', () => {
    it('Interface', () => {
      const code = 'graphql`${ `interface Hello { world: String }`}' +
                           '${ { Hello: { resolveType: () => { return "foo"; } } } }`';
      expect(transform(code)).to.equal(`${expectations.InterfaceResolver}`);
    });

    it('Field', () => {
      const code = 'graphql`${ `type Hello { world: String }`}' +
                           '${ { Hello: { world: { resolve: () => { return "foo"; } } } } }`';
      expect(transform(code)).to.equal(`${expectations.FieldResolver}`);
    });
  });

  describe('Directives', () => {
    it('NonNull', () => {
      const code = 'graphql`${`type Hello { world: String! }`}`';
      expect(transform(code)).to.equal(`${expectations.NonNullDirective}`);
    });
  });

  describe('Interfaces', () => {
    it('Single', () => {
      const code = 'graphql`${`type Hello implements World { }`}`';
      expect(transform(code)).to.equal(`${expectations.SingleInterface}`);
    });

    it('Multiple', () => {
      const code = 'graphql`${`type Hello implements World, Universe { }`}`';
      expect(transform(code)).to.equal(`${expectations.MultipleInterfaces}`);
    });
  });

  it('Enum', () => {
    const code = 'graphql`${`enum Hello { WORLD, STAR, UNIVERSE }`}`';
    expect(transform(code)).to.equal(`${expectations.Enum}`);
  });

  it('Lists', () => {
    const code = 'graphql`${`type Hello { world: [String] }`}`';
    expect(transform(code)).to.equal(`${expectations.Lists}`);
  });

  describe('Types', () => {
    it('String', () => {
      const code = 'graphql`${`type Hello { world: String }`}`';
      expect(transform(code)).to.equal(`${expectations.StringType}`);
    });

    it('Int', () => {
      const code = 'graphql`${`type Hello { world: Int }`}`';
      expect(transform(code)).to.equal(`${expectations.IntType}`);
    });

    it('Float', () => {
      const code = 'graphql`${`type Hello { world: Float }`}`';
      expect(transform(code)).to.equal(`${expectations.FloatType}`);
    });

    it('Boolean', () => {
      const code = 'graphql`${`type Hello { world: Boolean }`}`';
      expect(transform(code)).to.equal(`${expectations.BooleanType}`);
    });

    it('ID', () => {
      const code = 'graphql`${`type Hello { world: ID }`}`';
      expect(transform(code)).to.equal(`${expectations.IdType}`);
    });
  });
});
