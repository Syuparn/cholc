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

export function getPitch(code: ByteCode): ({pitch: number, ok: boolean}) {
  return {
    pitch: code % 12,
    ok: (code >= 0) && (code < 24),
  }
}

export function keySignatureMove(pitch1: number, pitch2: number): number {
  let pitch = pitch1
  for (let move = 0; move < 12; move++) {
    if (pitch == pitch2) {
      // adding more than 5 sharps means adding flats 
      return move > 5 ? move - 12 : move
    }

    // {add one sharp} == {7 semitones higher}
    pitch = (pitch + 7) % 12
  }

  throw new Error(`must not be reacted: pitch1: "${pitch1}", pitch2: "${pitch2}"`)
}
