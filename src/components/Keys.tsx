import { Key } from "./Key";
import { setAllNotes } from "../utils/synth";
import { NATURAL_NOTES_WITH_SHARP } from "../constants";
import "./Keys.css";

function Keys({ naturalNotes, whiteKeyWidth }: KeysProps) {
  const keys: Array<React.ReactNode> = [];
  let blackKeyXPosition = whiteKeyWidth - whiteKeyWidth / 4;
  const allKeyboardNotes: Array<string> = [];

  for (let i = 0; i < naturalNotes.length; i++) {
    allKeyboardNotes.push(naturalNotes[i]);

    keys.push(<Key key={`key-${i}`} color='white' styles={{ width: `${whiteKeyWidth}%` }} note={naturalNotes[i]} />);

    if (NATURAL_NOTES_WITH_SHARP.includes(naturalNotes[i][0]) && i !== naturalNotes.length - 1) {
      keys.push(
        <Key
          key={`key-${i}-sharp`}
          color='black'
          styles={{ width: `${whiteKeyWidth / 2}%`, left: `${blackKeyXPosition}%` }}
          note={naturalNotes[i] + "#"}
        />
      );
      allKeyboardNotes.push(naturalNotes[i] + "#");
    }
    blackKeyXPosition += whiteKeyWidth;
  }

  setAllNotes(allKeyboardNotes);

  return keys;
}

type KeysProps = {
  naturalNotes: Array<string>;
  whiteKeyWidth: number;
};

export { Keys };
