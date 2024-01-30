let audioContext: AudioContext;

function startSynth() {
  audioContext = new AudioContext();
  console.log("audioContext", audioContext);
}

function playNote(note: string) {
  console.log("playing note", note);
  const oscillator = audioContext.createOscillator();
  // Defaults to sine but I want to add functionality to change this
  oscillator.type = "sine";
  oscillator.frequency.value = 440;
  oscillator.connect(audioContext.destination);
  oscillator.start();
}

export { startSynth, playNote };
