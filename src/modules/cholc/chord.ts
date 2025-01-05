import { ByteCode, byteCodes } from "./bytecode";

export function chordName(code: ByteCode): string {
  // NOTE: use notation for chord player
  switch (code) {
    // major
    case byteCodes.C:
      return "C"
    case byteCodes.G:
      return "G"
    case byteCodes.D:
      return "D"
    case byteCodes.A:
      return "A"
    case byteCodes.E:
      return "E"
    case byteCodes.B:
      return "B"
    case byteCodes.FSharp:
      return "Gb"
    case byteCodes.CSharp:
      return "Db"
    case byteCodes.GSharp:
      return "Ab"
    case byteCodes.DSharp:
      return "Eb"
    case byteCodes.ASharp:
      return "Bb"
    case byteCodes.F:
      return "F"

    // minor
    case byteCodes.AMinor:
      return "Am"
    case byteCodes.EMinor:
      return "Em"
    case byteCodes.BMinor:
      return "Bm"
    case byteCodes.FSharpMinor:
      return "F#m"
    case byteCodes.CSharpMinor:
      return "C#m"
    case byteCodes.GSharpMinor:
      return "G#m"
    case byteCodes.DSharpMinor:
      return "Ebm"
    case byteCodes.ASharpMinor:
      return "Bbm"
    case byteCodes.FMinor:
      return "Fm"
    case byteCodes.CMinor:
      return "Cm"
    case byteCodes.GMinor:
      return "Gm"
    case byteCodes.DMinor:
      return "Dm"

    // rest
    case byteCodes.Output:
      return "X"
    
    // other special codes
    case byteCodes.StartLoop:
      return "unknown"
    case byteCodes.EndLoop:
      return "unknown"
    case byteCodes.Input:
      return "unknown"
    case byteCodes.Unknown:
      return "unknown"

    default: {
      // HACK: coverage check by type inference
      const _code: never = code
      throw new Error(`must not be reached here: '${_code}'`)
    }
  }
}
