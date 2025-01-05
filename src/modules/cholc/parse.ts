import { ByteCode, ByteCodeName, byteCodes, Program } from "./bytecode"

export class Parser {
  source: string

  constructor(source: string) {
    this.source = source
  }

  parse(): Program {
    if (this.source === "") {
      return []
    }

    const tokens = this.source.split(" ")
    return tokens.map((t) => this._encode(t))
  }

  _encode(token: string): ByteCode {
    // special tokens
    if (token === "|:") {
      return byteCodes.StartLoop
    } else if (token === ":|") {
      return byteCodes.EndLoop
    } else if (token === "v") {
      return byteCodes.Input
    } else if (token === "X") {
      return byteCodes.Output
    }

    // chords
    const matches = token.match(/^([CDEFGAB])(#+|b+)?(m)?$/)

    if (matches == null) {
      return byteCodes.Unknown
    }

    const [_, note, accidentals, minor] = matches

    if (note == undefined) {
      return byteCodes.Unknown
    }

    let byteCode = byteCodes[note as ByteCodeName]

    if (accidentals !== undefined) {
      if (accidentals[0] === "#") {
        // must be within [0, 12)
        byteCode = ((byteCode + accidentals.length) % 12) as ByteCode
      } else {
        // must be within [0, 12)
        byteCode = ((byteCode - accidentals.length + 12) % 12) as ByteCode
      }
    }

    if (minor !== undefined) {
        // must be within [12, 24)
      byteCode = (byteCode + 12) as ByteCode
    }

    return byteCode
  }
}
