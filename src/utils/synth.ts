let audioContext: AudioContext | undefined;
let allNotes: string[] = [];
let currentNote: string;
const startingFrequency = 65.41;
const oscillators: OscillatorType = {};

function setAllNotes(allKeyboardNotes: string[]) {
  allNotes = allKeyboardNotes;
}

function startSynth() {
  audioContext = new AudioContext();
}

function stopSynth() {
  if (audioContext === undefined) return;

  audioContext.close();
  audioContext = undefined;
}

function playNote(note: string) {
  if (audioContext === undefined) return;

  currentNote = note;
  const noteIndex = allNotes.indexOf(note);

  const oscillator: CustomOscillatorNode = audioContext.createOscillator();
  oscillator.type = "sine";

  // To work out the frequency I used this site:
  // http://techlib.com/reference/musical_note_frequencies.htm
  // I've chosen the lowest C note as the starting point
  // and then multiplied it by 2^(n/12) where n is the number
  // of keys including semitones away from the starting note.
  oscillator.frequency.value = startingFrequency * Math.pow(2, noteIndex / 12);

  const oscillatorGain = audioContext.createGain();
  oscillatorGain.gain.value = 0.33;
  oscillator.gain = oscillatorGain;
  oscillator.connect(oscillatorGain);
  oscillatorGain.connect(audioContext.destination);

  oscillators[note] = oscillator;

  oscillator.start();
}

function stopNote(note: string) {
  if (audioContext === undefined) return;
  console.log("current note", currentNote, note);
  const oscillator = oscillators[note];

  const oscillatorGain = oscillator.gain;
  oscillatorGain?.gain.setValueAtTime(oscillatorGain.gain.value, audioContext.currentTime);
  oscillatorGain?.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 1);
  oscillator.stop(audioContext.currentTime + 1);

  delete oscillators[note];
}

type CustomOscillatorNode = OscillatorNode & { gain?: GainNode };

type OscillatorType = {
  [key: string]: CustomOscillatorNode;
};

export { startSynth, stopSynth, playNote, stopNote, setAllNotes };
