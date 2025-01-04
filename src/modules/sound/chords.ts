export const chords = {
  // major
  "C": ["C4", "E4", "G4"],
  "Db": ["Db4", "F4", "Ab4"],
  "D": ["D4", "F#4", "A4"],
  "Eb": ["Eb4", "G4", "Bb4"],
  "E": ["E4", "G#4", "B4"],
  "F": ["F4", "A4", "C5"],
  "Gb": ["Gb4", "Bb4", "Db5"],
  "G": ["G4", "B4", "D5"],
  "Ab": ["Ab4", "C5", "Eb5"],
  "A": ["A4", "C#5", "E5"],
  "Bb": ["Bb4", "D5", "F5"],
  "B": ["B4", "D#5", "F#5"],

  // minor
  "Cm": ["C4", "Eb4", "G4"],
  "C#m": ["C#4", "E4", "G#4"],
  "Dm": ["D4", "F4", "A4"],
  "Ebm": ["Eb4", "Gb4", "Bb4"],
  "Em": ["E4", "G4", "B4"],
  "Fm": ["F4", "Ab4", "C5"],
  "F#m": ["F#4", "A4", "C#5"],
  "Gm": ["G4", "Bb4", "D5"],
  "G#m": ["G#4", "B4", "D#5"],
  "Am": ["A4", "C5", "E5"],
  "Bbm": ["Bb4", "Db5", "F5"],
  "Bm": ["B4", "D5", "F#5"],
}

export type ChordName = keyof typeof chords

export function getChord(name: ChordName): string[] {
  return chords[name]
}

export const metaChords = {
  READY: "READY",
  INTERRUPT: "INTERRUPT",
  REST: "REST",
}
