import React from 'react'
import * as Tone from "tone";
import { synth } from '../sound/synth';

type SynthState = {
  synth: Tone.PolySynth<Tone.Synth<Tone.SynthOptions>>,
  setSynth: React.Dispatch<React.SetStateAction<Tone.PolySynth<Tone.Synth<Tone.SynthOptions>>>>,
}

// NOTE: set small init value to avoid blasting
export const SynthContext = React.createContext<SynthState>({synth: synth(-99), setSynth: () => {}})

