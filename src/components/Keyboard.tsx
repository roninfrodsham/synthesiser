import { useEffect, useMemo } from "react";
import { Key } from "./Key";
import { setAllNotes } from "../utils/synth";
import { NATURAL_NOTES_WITH_SHARP } from "../constants";
import "./Keyboard.css";

type KeysProps = {
  naturalNotes: string[]; // Array of natural notes
  whiteKeyWidth: number; // Width of the white keys
  naturalNoteWidth: number; // Width of the natural notes
};

function Keyboard({ naturalNotes, whiteKeyWidth, naturalNoteWidth }: KeysProps) {
  // Calculate the initial position for the first black key
  let blackKeyXPosition = whiteKeyWidth - whiteKeyWidth / 4;
  // Calculate the width of the keyboard
  const keyboardWidth = 100 - naturalNoteWidth * 2;

  // Use useMemo to create a memoised version of all keyboard notes
  const allKeyboardNotes = useMemo(() => {
    const notes: string[] = [];
    naturalNotes.forEach((note, i) => {
      notes.push(note);
      // If the note can have a sharp version and it's not the last note, add the sharp version to the notes array
      if (NATURAL_NOTES_WITH_SHARP.includes(note[0]) && i !== naturalNotes.length - 1) {
        notes.push(note + "#");
      }
    });
    return notes;
  }, [naturalNotes]);

  // Use useEffect to call setAllNotes whenever allKeyboardNotes changes
  // This ensures that the synth always has the correct notes
  useEffect(() => {
    setAllNotes(allKeyboardNotes);
  }, [allKeyboardNotes]);

  // Map over the naturalNotes to create the Key components
  const keys = naturalNotes.map((note, i) => {
    // Create a Key component for the natural note
    const keyComponents = [<Key key={`key-${i}`} color='white' styles={{ width: `${whiteKeyWidth}%` }} note={note} />];

    // If the note can have a sharp version and it's not the last note, add a Key component for the sharp note
    if (NATURAL_NOTES_WITH_SHARP.includes(note[0]) && i !== naturalNotes.length - 1) {
      keyComponents.push(
        <Key
          key={`key-${i}-sharp`}
          color='black'
          styles={{ width: `${whiteKeyWidth / 2}%`, left: `${blackKeyXPosition}%` }}
          note={note + "#"}
        />
      );
    }

    // Update the position for the next black key
    blackKeyXPosition += whiteKeyWidth;

    return keyComponents;
  });

  // Return a div containing all the Key components
  // The div is positioned and sized based on the naturalNoteWidth
  return (
    <div className='keyboard absolute flex' style={{ left: `${naturalNoteWidth}%`, width: `${keyboardWidth}%` }}>
      {keys}
    </div>
  );
}

export { Keyboard };
