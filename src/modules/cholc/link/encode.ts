import { ByteCode, byteCodes, Program } from "../bytecode"
import { Parser } from "../parse"

export function programToQuery(program: Program): string {
  return program.map(codeToQuery).join("")
}

function codeToQuery(code: ByteCode): string {
  // ignore unknown
  if (code === byteCodes.Unknown) {
    return ""
  }

  // use 36-base convertion (a, b, c, ..., z, 0, ..., 9)

  const alphabetOffset = "a".charCodeAt(0)
  const numOffset = "0".charCodeAt(0)

  if (code < 26) {
    return String.fromCharCode(code + alphabetOffset)
  }

  if (code < 36) {
    return String.fromCharCode(code - 26 + numOffset) 
  }

  throw new Error(`code must not be ${code}`)
}

export function sourceToQuery(source: string): string {
  const program = new Parser(source).parse()
  return programToQuery(program)
}
