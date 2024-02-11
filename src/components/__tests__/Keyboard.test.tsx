import { render } from "@testing-library/react";
import { Keyboard } from "../Keyboard";

describe("Keyboard", () => {
  it("renders correctly", () => {
    const naturalNotes = ["C4", "D4", "E4", "F4", "G4", "A4", "B4"];
    const whiteKeyWidth = 10;
    const naturalNoteWidth = 5;
    const numberOfNotesInOctave = 12;

    const { container } = render(
      <Keyboard naturalNotes={naturalNotes} whiteKeyWidth={whiteKeyWidth} naturalNoteWidth={naturalNoteWidth} />
    );

    // Check if the component is rendered with correct styles
    const keyboardElement = container.querySelector(".keyboard");
    expect(keyboardElement).toHaveStyle(`left: ${naturalNoteWidth}%`);
    expect(keyboardElement).toHaveStyle(`width: ${100 - naturalNoteWidth * 2}%`);

    // Check if the correct number of keys are rendered
    const keyElements = container.querySelectorAll("div[data-note]");
    expect(keyElements.length).toBe(numberOfNotesInOctave);
  });
});
