import { render, fireEvent } from "@testing-library/react";
import { Key } from "../Key";
import { playNote } from "../../utils/synth";

// Mock the playNote function from synth utility
vi.mock("../../utils/synth", () => ({
  playNote: vi.fn(),
}));

describe("Key", () => {
  it("renders correctly and responds to mouse down event", () => {
    const note = "C4";
    const color = "white";
    const styles = { width: "10%", left: "0%" };

    const { container } = render(<Key color={color} note={note} styles={styles} />);

    // Check if the component is rendered with correct props
    const keyElement = container.querySelector('[data-note="C4"]');
    expect(keyElement).toBeInTheDocument();
    expect(keyElement).toHaveClass(color);
    expect(keyElement).toHaveStyle(`width: ${styles.width}`);
    expect(keyElement).toHaveStyle(`left: ${styles.left}`);

    // Simulate a mouse down event and check if playNote is called
    fireEvent.mouseDown(keyElement);
    expect(playNote).toHaveBeenCalledWith(note);
  });
});
