import { expect } from "chai";
import * as expectations from "./expectations";

const transform = (str) => {
  return require("babel-core").transform(str, {
    plugins: [".."],
  }).code
}

describe('Schema', () => {
  describe('Directives', () => {
    it('NonNull', () => {
      const code = 'Schema`type Hello { world: String! }`'
      expect(transform(code)).to.equal(`${expectations.NonNullDirective}`);
    });
  });

  it('Enum', () => {
    const code = 'Schema`enum Hello { WORLD, STAR, UNIVERSE }`'
    expect(transform(code)).to.equal(`${expectations.Enum}`);
  });

  describe('Types', () => {
    it('String', () => {
      const code = 'Schema`type Hello { world: String }`'
      expect(transform(code)).to.equal(`${expectations.StringType}`);
    });

    it('Int', () => {
      const code = 'Schema`type Hello { world: Int }`'
      expect(transform(code)).to.equal(`${expectations.IntType}`);
    });

    it('Float', () => {
      const code = 'Schema`type Hello { world: Float }`'
      expect(transform(code)).to.equal(`${expectations.FloatType}`);
    });

    it('Boolean', () => {
      const code = 'Schema`type Hello { world: Boolean }`'
      expect(transform(code)).to.equal(`${expectations.BooleanType}`);
    });

    it('ID', () => {
      const code = 'Schema`type Hello { world: ID }`'
      expect(transform(code)).to.equal(`${expectations.IdType}`);
    });
  });
});
