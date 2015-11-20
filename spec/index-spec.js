import { expect } from "chai";
import * as expectations from "./expectations";

import { schema } from "./starWarsSchema";

const transform = (str) => {
  return require("babel-core").transform(str, {
    plugins: [".."],
  }).code
}

describe('Schema', () => {
  it('StarWars', () => {
    const code = schema;
    expect(transform('graphql`' + code + '`')).to.equal(`${expectations.StarWars}`);
  });

  describe('Directives', () => {
    it('NonNull', () => {
      const code = 'graphql`type Hello { world: String! }`'
      expect(transform(code)).to.equal(`${expectations.NonNullDirective}`);
    });
  });

  it('Enum', () => {
    const code = 'graphql`enum Hello { WORLD, STAR, UNIVERSE }`'
    expect(transform(code)).to.equal(`${expectations.Enum}`);
  });

  it('Lists', () => {
    const code = 'graphql`type Hello { world: [String] }`'
    expect(transform(code)).to.equal(`${expectations.Lists}`);
  });

  describe('Types', () => {
    it('String', () => {
      const code = 'graphql`type Hello { world: String }`'
      expect(transform(code)).to.equal(`${expectations.StringType}`);
    });

    it('Int', () => {
      const code = 'graphql`type Hello { world: Int }`'
      expect(transform(code)).to.equal(`${expectations.IntType}`);
    });

    it('Float', () => {
      const code = 'graphql`type Hello { world: Float }`'
      expect(transform(code)).to.equal(`${expectations.FloatType}`);
    });

    it('Boolean', () => {
      const code = 'graphql`type Hello { world: Boolean }`'
      expect(transform(code)).to.equal(`${expectations.BooleanType}`);
    });

    it('ID', () => {
      const code = 'graphql`type Hello { world: ID }`'
      expect(transform(code)).to.equal(`${expectations.IdType}`);
    });
  });
});
