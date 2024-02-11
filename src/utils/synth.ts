let audioContext: AudioContext | undefined | null;
let allNotes: string[] = [];
let currentNote: string | null = null;
const startingFrequency = 65.41;
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

  const oscillator: CustomOscillatorNode = audioContext.createOscillator();
  oscillator.type = "sine";
  oscillator.frequency.value = startingFrequency * Math.pow(2, noteIndex / 12);

  const oscillatorGain = audioContext.createGain();
  oscillatorGain.gain.value = 0.33;
  oscillator.gain = oscillatorGain;
  oscillator.connect(oscillatorGain);
  oscillatorGain.connect(audioContext.destination);

  oscillators[note] = oscillator;

  oscillator.start();
}

function stopNote() {
  if (!audioContext || !currentNote) return;

  const oscillator = oscillators[currentNote];

  const oscillatorGain = oscillator.gain;
  oscillatorGain?.gain.setValueAtTime(oscillatorGain.gain.value, audioContext.currentTime);
  oscillatorGain?.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 1.2);
  oscillator.stop(audioContext.currentTime + 1);

  delete oscillators[currentNote];
  currentNote = null;
}

type CustomOscillatorNode = OscillatorNode & { gain?: GainNode };

type OscillatorType = {
  [key: string]: CustomOscillatorNode;
};

export { startSynth, stopSynth, playNote, stopNote, setAllNotes };
