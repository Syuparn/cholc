import { byteCodes } from "./bytecode";
import { Parser } from "./parse";

describe("encode token to byteCode", () => {
  test.each`
    token  | expected
    ${"C"} | ${byteCodes.C}
    ${"D"} | ${byteCodes.D}
    ${"E"} | ${byteCodes.E}
    ${"F"} | ${byteCodes.F}
    ${"G"} | ${byteCodes.G}
    ${"A"} | ${byteCodes.A}
    ${"B"} | ${byteCodes.B}
  `("token '$token' -> bytecode '$expected'", ({token, expected}) => {
    const parser = new Parser("")
    expect(parser._encode(token)).toBe(expected)
  })
});

describe("encode token to byteCode (with #, b)", () => {
  test.each`
    token  | expected
    ${"C#"} | ${byteCodes.CSharp}
    ${"D#"} | ${byteCodes.DSharp}
    ${"E#"} | ${byteCodes.F}
    ${"F#"} | ${byteCodes.FSharp}
    ${"G#"} | ${byteCodes.GSharp}
    ${"A#"} | ${byteCodes.ASharp}
    ${"B#"} | ${byteCodes.C}
    ${"Cb"} | ${byteCodes.B}
    ${"Db"} | ${byteCodes.CSharp}
    ${"Eb"} | ${byteCodes.DSharp}
    ${"Fb"} | ${byteCodes.E}
    ${"Gb"} | ${byteCodes.FSharp}
    ${"Ab"} | ${byteCodes.GSharp}
    ${"Bb"} | ${byteCodes.ASharp}
    `("token '$token' -> bytecode '$expected'", ({token, expected}) => {
    const parser = new Parser("")
    expect(parser._encode(token)).toBe(expected)
  })
});

describe("encode token to byteCode (minor)", () => {
  test.each`
    token  | expected
    ${"Cm"} | ${byteCodes.CMinor}
    ${"Dm"} | ${byteCodes.DMinor}
    ${"Em"} | ${byteCodes.EMinor}
    ${"Fm"} | ${byteCodes.FMinor}
    ${"Gm"} | ${byteCodes.GMinor}
    ${"Am"} | ${byteCodes.AMinor}
    ${"Bm"} | ${byteCodes.BMinor}
  `("token '$token' -> bytecode '$expected'", ({token, expected}) => {
    const parser = new Parser("")
    expect(parser._encode(token)).toBe(expected)
  })
});

describe("encode token to byteCode (minor with #, b)", () => {
  test.each`
    token  | expected
    ${"C#m"} | ${byteCodes.CSharpMinor}
    ${"D#m"} | ${byteCodes.DSharpMinor}
    ${"E#m"} | ${byteCodes.FMinor}
    ${"F#m"} | ${byteCodes.FSharpMinor}
    ${"G#m"} | ${byteCodes.GSharpMinor}
    ${"A#m"} | ${byteCodes.ASharpMinor}
    ${"B#m"} | ${byteCodes.CMinor}
    ${"Cbm"} | ${byteCodes.BMinor}
    ${"Dbm"} | ${byteCodes.CSharpMinor}
    ${"Ebm"} | ${byteCodes.DSharpMinor}
    ${"Fbm"} | ${byteCodes.EMinor}
    ${"Gbm"} | ${byteCodes.FSharpMinor}
    ${"Abm"} | ${byteCodes.GSharpMinor}
    ${"Bbm"} | ${byteCodes.ASharpMinor}
    `("token '$token' -> bytecode '$expected'", ({token, expected}) => {
    const parser = new Parser("")
    expect(parser._encode(token)).toBe(expected)
  })
});

describe("encode token to byteCode (special codes)", () => {
  test.each`
    token  | expected
    ${"|:"} | ${byteCodes.StartLoop}
    ${":|"} | ${byteCodes.EndLoop}
    ${"v"} | ${byteCodes.Input}
    ${"X"} | ${byteCodes.Output}
  `("token '$token' -> bytecode '$expected'", ({token, expected}) => {
    const parser = new Parser("")
    expect(parser._encode(token)).toBe(expected)
  })
});

describe("encode malformed token to byteCode", () => {
  test.each`
    token  | expected
    ${"malformed"} | ${byteCodes.Unknown}
    ${"C#b"} | ${byteCodes.Unknown}
    ${"Cb#"} | ${byteCodes.Unknown}
    ${"Cmm"} | ${byteCodes.Unknown}
    ${"Cm#"} | ${byteCodes.Unknown}
    ${"#m"} | ${byteCodes.Unknown}
    ${"X#"} | ${byteCodes.Unknown}
    ${"v#"} | ${byteCodes.Unknown}
    ${"|:#"} | ${byteCodes.Unknown}
    ${":|#"} | ${byteCodes.Unknown}
  `("token '$token' -> bytecode '$expected'", ({token, expected}) => {
    const parser = new Parser("")
    expect(parser._encode(token)).toBe(expected)
  })
});

describe("parse source code to byteCodes", () => {
  test.each`
    source         | expected
    ${""}         | ${[]}
    ${"C"}        | ${[byteCodes.C]}
    ${"C D"}      | ${[byteCodes.C, byteCodes.D]}
    ${"Am F G C"} | ${[byteCodes.AMinor, byteCodes.F, byteCodes.G, byteCodes.C]}
  `("source '$source' -> bytecode '$expected'", ({source, expected}) => {
    const parser = new Parser(source)
    expect(parser.parse()).toStrictEqual(expected)
  })
});
