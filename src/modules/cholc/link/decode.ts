import { ByteCode, byteCodes, Program } from "../bytecode"
import { chordName } from "../chord"

export function queryToProgram(query: string): Program {
  return query.split("").map(queryToCode)
}

function queryToCode(query: string): ByteCode {
  switch (query) {
    case "a":
    case "b":
    case "c":
    case "d":
    case "e":
    case "f":
    case "g":
    case "h":
    case "i":
    case "j":
    case "k":
    case "l":
    case "m":
    case "n":
    case "o":
    case "p":
    case "q":
    case "r":
    case "s":
    case "t":
    case "u":
    case "v":
    case "w":
    case "x":
    case "y":
    case "z":
      return (query.charCodeAt(0) - "a".charCodeAt(0)) as ByteCode
    case "0":
      return 26
    case "1":
      return 27
    default:
      return byteCodes.Unknown
  }
}

export function queryToSource(query: string): string {
  return queryToProgram(query).map(chordName).join(" ")
}
