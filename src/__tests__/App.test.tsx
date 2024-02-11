import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import { App } from "../App";

beforeAll(() => {
  // Mock window.matchMedia
  const originalMatchMedia = window.matchMedia;
  window.matchMedia = (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  });

  // Mock AudioContext
  const originalAudioContext = window.AudioContext;
  window.AudioContext = vi.fn().mockImplementation(() => ({
    createOscillator: vi.fn(),
    createGain: vi.fn(),
    // add any other methods you need to mock here
  }));

  // Restore after all tests
  afterAll(() => {
    window.matchMedia = originalMatchMedia;
    window.AudioContext = originalAudioContext;
  });
});

describe("App component", () => {
  test("renders App correctly", () => {
    const { container } = render(<App />);

    const elements = screen.getAllByText("R 106");
    elements.forEach((element) => {
      expect(element).toBeInTheDocument();
    });

    const element = screen.getByText("Power");
    expect(element).toBeInTheDocument();

    const startKey = container.querySelector('[data-note="C3"]');
    expect(startKey).toBeInTheDocument();
    const endKey = container.querySelector('[data-note="C7"]');
    expect(endKey).toBeInTheDocument();
  });

  it("changes power state when setPower is called", () => {
    render(<App />);

    const powerButton = screen.getByText("Power");

    const powerLight = powerButton.querySelector(".power-light");
    expect(powerLight).toBeInTheDocument();

    fireEvent.click(powerButton);

    const powerLightOn = powerButton.querySelector(".power-light-on");
    expect(powerLightOn).toBeInTheDocument();
  });
});
