import { byteCodes, getPitch, isMajor, isMinor } from "./bytecode";

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
