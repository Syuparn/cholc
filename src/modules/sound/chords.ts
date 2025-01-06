// HACK: change voicing (invert chords so that all notes are withing the octave)
// this helps to connect chords smoother
export const chords = {
  // major
  "C": ["C4", "E4", "G4"],
  "Db": ["Db4", "F4", "Ab4"],
  "D": ["D4", "F#4", "A4"],
  "Eb": ["Eb4", "G4", "Bb4"],
  "E": ["E4", "G#4", "B4"],
  "F": ["F4", "A4", "C4"],
  "Gb": ["Gb4", "Bb4", "Db4"],
  "G": ["G4", "B4", "D4"],
  "Ab": ["Ab4", "C4", "Eb4"],
  "A": ["A4", "C#4", "E4"],
  "Bb": ["Bb4", "D4", "F4"],
  "B": ["B4", "D#4", "F#4"],

  // minor
  "Cm": ["C4", "Eb4", "G4"],
  "C#m": ["C#4", "E4", "G#4"],
  "Dm": ["D4", "F4", "A4"],
  "Ebm": ["Eb4", "Gb4", "Bb4"],
  "Em": ["E4", "G4", "B4"],
  "Fm": ["F4", "Ab4", "C4"],
  "F#m": ["F#4", "A4", "C#4"],
  "Gm": ["G4", "Bb4", "D4"],
  "G#m": ["G#4", "B4", "D#4"],
  "Am": ["A4", "C4", "E4"],
  "Bbm": ["Bb4", "Db4", "F4"],
  "Bm": ["B4", "D4", "F#4"],
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
