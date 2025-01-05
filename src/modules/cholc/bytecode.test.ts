import { byteCodes, getPitch, isMajor, isMinor, keySignatureMove } from "./bytecode";

describe("check whether code is major chord", () => {
  test.each`
    code                 | expected
    ${byteCodes.C}       | ${true} 
    ${byteCodes.CMinor}  | ${false} 
    ${byteCodes.Unknown} | ${false} 
    ${byteCodes.Input}   | ${false} 
  `("whether $code is major chord", ({code, expected}) => {
    expect(isMajor(code)).toBe(expected)
  })
});

describe("check whether code is minor chord", () => {
  test.each`
    code                 | expected
    ${byteCodes.C}       | ${false} 
    ${byteCodes.CMinor}  | ${true} 
    ${byteCodes.Unknown} | ${false} 
    ${byteCodes.Input}   | ${false} 
  `("whether $code is minor chord", ({code, expected}) => {
    expect(isMinor(code)).toBe(expected)
  })
});

describe("get pitch", () => {
  test.each`
    code                     | expected
    ${byteCodes.C}           | ${0} 
    ${byteCodes.CMinor}      | ${0} 
    ${byteCodes.CSharp}      | ${1} 
    ${byteCodes.CSharpMinor} | ${1} 
  `("whether $code is minor chord", ({code, expected}) => {
    const {pitch, ok} = getPitch(code)

    expect(pitch).toBe(expected)
    expect(ok).toBe(true)
  })
});

describe("get pitch (special codes)", () => {
  test.each`
    code
    ${byteCodes.Unknown} 
    ${byteCodes.StartLoop} 
    ${byteCodes.EndLoop} 
    ${byteCodes.Input} 
    ${byteCodes.Output} 
  `("whether $code is minor chord", ({code}) => {
    const {ok} = getPitch(code)

    expect(ok).toBe(false)
  })
});

describe("key signature move", () => {
  test.each`
    title        | pitch1 | pitch2 | expected
    ${"C -> C "} | ${0}   | ${0}   | ${0}
    ${"C -> G "} | ${0}   | ${7}   | ${1}
    ${"C -> D "} | ${0}   | ${2}   | ${2}
    ${"C -> A "} | ${0}   | ${9}   | ${3}
    ${"C -> E "} | ${0}   | ${4}   | ${4}
    ${"C -> B "} | ${0}   | ${11}  | ${5}
    ${"C -> Gb"} | ${0}   | ${6}   | ${-6} 
    ${"C -> Db"} | ${0}   | ${1}   | ${-5} 
    ${"C -> Ab"} | ${0}   | ${8}   | ${-4} 
    ${"C -> Eb"} | ${0}   | ${3}   | ${-3} 
    ${"C -> Bb"} | ${0}   | ${10}  | ${-2} 
    ${"C -> F "} | ${0}   | ${5}   | ${-1} 
    ${"G -> D "} | ${7}   | ${2}   | ${1}
    ${"D -> E "} | ${2}   | ${4}   | ${2}
    ${"Bb-> Eb"} | ${10}  | ${3}   | ${-1}
    `("move $title", ({pitch1, pitch2, expected}) => {
    expect(keySignatureMove(pitch1, pitch2)).toBe(expected)
  })
});
