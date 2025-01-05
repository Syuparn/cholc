import { byteCodes, isMajor, isMinor } from "./bytecode";

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
