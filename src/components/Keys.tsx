import { Key } from "./Key";
import { setAllNotes } from "../utils/synth";
import { NATURAL_NOTES_WITH_SHARP } from "../constants";

function Keys({ naturalNotes, whiteKeyWidth }: KeysProps) {
  const keys: Array<React.ReactNode> = [];
  let blackKeyXPosition = whiteKeyWidth - whiteKeyWidth / 4;
  const allKeyboardNotes: Array<string> = [];

  naturalNotes.forEach((note, i) => {
    allKeyboardNotes.push(note);

    keys.push(<Key key={`key-${i}`} color='white' styles={{ width: `${whiteKeyWidth}%` }} note={note} />);

    if (NATURAL_NOTES_WITH_SHARP.includes(note[0]) && i !== naturalNotes.length - 1) {
      keys.push(
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
  });

  setAllNotes(allKeyboardNotes);

  return keys;
}

type KeysProps = {
  naturalNotes: Array<string>;
  whiteKeyWidth: number;
};

export { Keys };
