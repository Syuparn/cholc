import * as Tone from "tone";

const synth = new Tone.PolySynth().toDestination();

export function playChord(notes: string[]): void {
  synth.triggerAttackRelease(notes, "4n");
}
