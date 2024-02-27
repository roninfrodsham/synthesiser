import { STARTING_FREQUENCY } from "../constants";

let audioContext: AudioContext | undefined | null;
let allNotes: string[] = [];
let currentNote: string | null = null;
let oscillators: OscillatorType = {};

function setAllNotes(allKeyboardNotes: string[]) {
  allNotes = allKeyboardNotes;
}

function startSynth() {
  audioContext = new AudioContext();
}

function stopSynth() {
  if (audioContext) {
    audioContext.close().then(() => {
      audioContext = null;
      // Clean up oscillators
      for (const note in oscillators) {
        if (Object.prototype.hasOwnProperty.call(oscillators, note)) {
          oscillators[note].stop();
        }
      }
      oscillators = {};
    });
  }
}

function playNote(note: string) {
  if (!audioContext) return;

  currentNote = note;
  const noteIndex = allNotes.indexOf(note);

  // Creating an oscillator for the note
  const oscillator: CustomOscillatorNode = audioContext.createOscillator();
  oscillator.type = "sine";
  oscillator.frequency.value = STARTING_FREQUENCY * Math.pow(2, noteIndex / 12);

  // Creating a gain for the oscillator
  const oscillatorGain = audioContext.createGain();
  oscillatorGain.gain.value = 0.33;
  oscillator.gain = oscillatorGain;
  oscillator.connect(oscillatorGain);
  oscillatorGain.connect(audioContext.destination);

  // Adding the oscillator to the oscillators object
  oscillators[note] = oscillator;

  oscillator.start();
}

function stopNote() {
  if (!audioContext || !currentNote) return;

  const oscillator = oscillators[currentNote];

  // Gradually reducing the gain to zero
  const oscillatorGain = oscillator.gain;
  oscillatorGain?.gain.setValueAtTime(oscillatorGain.gain.value, audioContext.currentTime);
  oscillatorGain?.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 1.2);
  oscillator.stop(audioContext.currentTime + 1);

  // Removing the oscillator from the oscillators object
  delete oscillators[currentNote];
  currentNote = null;
}

// Defining a type for custom oscillator node extending the OscillatorNode for the gain property
type CustomOscillatorNode = OscillatorNode & { gain?: GainNode };

type OscillatorType = {
  [key: string]: CustomOscillatorNode;
};

export { startSynth, stopSynth, playNote, stopNote, setAllNotes };
