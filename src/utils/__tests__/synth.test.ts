import { startSynth, stopSynth, playNote, stopNote, setAllNotes } from "./synth";

// Mocking the AudioContext
global.AudioContext = vi.fn(() => ({
  createOscillator: vi.fn(() => ({
    type: "",
    frequency: { value: 0 },
    connect: vi.fn(),
    start: vi.fn(),
    stop: vi.fn(),
  })),
  createGain: vi.fn(() => ({
    gain: { value: 0 },
    connect: vi.fn(),
  })),
  close: vi.fn(() => Promise.resolve()),
}));

describe("Synth", () => {
  beforeEach(() => {
    // Reset all mocks before each test
    vi.clearAllMocks();
  });

  it("starts the synth", () => {
    startSynth();
    expect(global.AudioContext).toHaveBeenCalled();
  });

  it("stops the synth", async () => {
    startSynth();
    await stopSynth();
    expect(global.AudioContext().close).toHaveBeenCalled();
  });

  it("sets all notes", () => {
    setAllNotes(["A", "B", "C"]);
    playNote("A");
    expect(global.AudioContext().createOscillator).toHaveBeenCalled();
  });

  it("plays a note", () => {
    startSynth();
    setAllNotes(["A", "B", "C"]);
    playNote("A");
    expect(global.AudioContext().createOscillator().start).toHaveBeenCalled();
  });

  it("stops a note", () => {
    startSynth();
    setAllNotes(["A", "B", "C"]);
    playNote("A");
    stopNote();
    expect(global.AudioContext().createOscillator().stop).toHaveBeenCalled();
  });
});
