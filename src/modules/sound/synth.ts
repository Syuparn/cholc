import * as Tone from "tone";

export function synth(volume: number): Tone.PolySynth<Tone.Synth<Tone.SynthOptions>> {
  return new Tone.PolySynth({volume}).toDestination();
}

export function playChord(synth: Tone.PolySynth<Tone.Synth<Tone.SynthOptions>>, notes: string[], duration: string = "4n"): void {
  synth.releaseAll()
  synth.triggerAttackRelease(notes, duration);
}
