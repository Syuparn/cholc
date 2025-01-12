import { queryToSource } from "./decode"
import { programToQuery, sourceToQuery } from "./encode"

describe("encode program", () => {
  test.each`
  program       | expected
  ${[]}         | ${""}
  ${[0]}        | ${"a"}
  ${[1]}        | ${"b"}
  ${[25]}       | ${"z"}
  ${[26]}       | ${"0"}
  ${[27]}       | ${"1"}
  ${[0, 1, 2]}  | ${"abc"}
  ${[-1]}       | ${""}
  ${[1, -1, 3]} | ${"bd"}
  `("program: $program", ({program, expected}) => {
    expect(programToQuery(program)).toBe(expected)
  })
})

describe("encode then decode", () => {
  test.each`
  source
  ${""}
  ${"C"}
  ${"C Fm"}
  ${"Am F G C"}
  ${"C C C"}
  ${"Eb G#m"}
  `("source: $source", ({source}) => {
    expect(queryToSource(sourceToQuery(source))).toBe(source)
  })
})

describe("queryToSource formatts the source", () => {
  test.each`
  source           | expected
  ${"A#"}          | ${"Bb"}
  ${"G  C"}        | ${"G C"}
  ${"F invalid C"} | ${"F C"}
  `("source: $source", ({source, expected}) => {
    expect(queryToSource(sourceToQuery(source))).toBe(expected)
  })
})
