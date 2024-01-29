let audioContext: AudioContext;

function startSynth() {
  audioContext = new AudioContext();
  console.log("audioContext", audioContext);
  const oscillator = audioContext.createOscillator();
  oscillator.connect(audioContext.destination);
  console.log("starting oscillator");
}

export { startSynth };
