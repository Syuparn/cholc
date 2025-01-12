import { Program } from "../bytecode"
import { queryToProgram } from "./decode"
import { programToQuery } from "./encode"

describe("decode program", () => {
  test.each`
  query    | expected
  ${""}    | ${[]} 
  ${"a"}   | ${[0]} 
  ${"b"}   | ${[1]} 
  ${"z"}   | ${[25]} 
  ${"0"}   | ${[26]}
  ${"1"}   | ${[27]}
  ${"abc"} | ${[0, 1, 2]} 
  ${"-_a"} | ${[-1, -1, 0]} 
  `("query: $query", ({query, expected}) => {
    expect(queryToProgram(query)).toStrictEqual(expected)
  })
})

describe("decode then encode", () => {
  test("must be equal", () => {
    for (let i = 0; i <= 27; i++) {
      const program = [i] as Program
      expect(queryToProgram(programToQuery(program))).toStrictEqual(program)
    }
  })
})
