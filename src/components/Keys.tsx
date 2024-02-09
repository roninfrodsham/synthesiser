import { useEffect, useMemo } from "react";
import { Key } from "./Key";
import { setAllNotes } from "../utils/synth";
import { NATURAL_NOTES_WITH_SHARP } from "../constants";

function Keys({ naturalNotes, whiteKeyWidth }: KeysProps) {
  let blackKeyXPosition = whiteKeyWidth - whiteKeyWidth / 4;

  const allKeyboardNotes = useMemo(() => {
    const notes: string[] = [];
    naturalNotes.forEach((note, i) => {
      notes.push(note);
      if (NATURAL_NOTES_WITH_SHARP.includes(note[0]) && i !== naturalNotes.length - 1) {
        notes.push(note + "#");
      }
    });
    return notes;
  }, [naturalNotes]);

  useEffect(() => {
    setAllNotes(allKeyboardNotes);
  }, [allKeyboardNotes]);

  const keys = naturalNotes.map((note, i) => {
    const keyComponents = [<Key key={`key-${i}`} color='white' styles={{ width: `${whiteKeyWidth}%` }} note={note} />];

    if (NATURAL_NOTES_WITH_SHARP.includes(note[0]) && i !== naturalNotes.length - 1) {
      keyComponents.push(
        <Key
          key={`key-${i}-sharp`}
          color='black'
          styles={{ width: `${whiteKeyWidth / 2}%`, left: `${blackKeyXPosition}%` }}
          note={note + "#"}
        />
      );
      allKeyboardNotes.push(note + "#");
    }

    blackKeyXPosition += whiteKeyWidth;

    return keyComponents;
  });

  return keys;
}

type KeysProps = {
  naturalNotes: Array<string>;
  whiteKeyWidth: number;
};

export { Keys };
