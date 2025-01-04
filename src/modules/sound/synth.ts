import * as Tone from "tone";

const synth = new Tone.PolySynth({volume: -14}).toDestination();

// TODO: add setter for synth.volume.value

export function playChord(notes: string[], duration: string = "4n"): void {
  synth.triggerAttackRelease(notes, duration);
}
