export const byteCodes = {
  // major chord
  C: 0,
  CSharp: 1,
  D: 2,
  DSharp: 3,
  E: 4,
  F: 5,
  FSharp: 6,
  G: 7,
  GSharp: 8,
  A: 9,
  ASharp: 10,
  B: 11,

  // minor chord
  CMinor: 12,
  CSharpMinor: 13,
  DMinor: 14,
  DSharpMinor: 15,
  EMinor: 16,
  FMinor: 17,
  FSharpMinor: 18,
  GMinor: 19,
  GSharpMinor: 20,
  AMinor: 21,
  ASharpMinor: 22,
  BMinor: 23,

  // special codes
  StartLoop: 24,
  EndLoop: 25,
  Input: 26,
  Output: 27,

  // comments or typos, which is ignored
  Unknown: -1,
} as const

export type ByteCodeName = keyof typeof byteCodes
export type ByteCode = typeof byteCodes[ByteCodeName]

export type Program = ByteCode[]


export function isMajor(code: ByteCode): boolean {
  return (code >= 0) && (code < 12)
}

export function isMinor(code: ByteCode): boolean {
  return (code >= 12) && (code < 24)
}
