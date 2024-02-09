import { Key } from "./Key";
import { setAllNotes } from "../utils/synth";
import { NATURAL_NOTES_WITH_SHARP } from "../constants";

function Keys({ naturalNotes, whiteKeyWidth }: KeysProps) {
  const allKeyboardNotes: Array<string> = [];
  let blackKeyXPosition = whiteKeyWidth - whiteKeyWidth / 4;

  const keys = naturalNotes.map((note, i) => {
    allKeyboardNotes.push(note);

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

  setAllNotes(allKeyboardNotes);

  return keys;
}

type KeysProps = {
  naturalNotes: Array<string>;
  whiteKeyWidth: number;
};

export { Keys };
