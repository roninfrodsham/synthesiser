import { Key } from "./Key";
import "./Keys.css";

function Keys({ naturalNotes, sharpNotes, whiteKeyWidth }: KeysProps) {
  const keys: Array<React.ReactNode> = [];
  let blackKeyXPosition = whiteKeyWidth - whiteKeyWidth / 4;

  for (let i = 0; i < naturalNotes.length; i++) {
    keys.push(<Key key={`key-${i}`} color='white' styles={{ width: `${whiteKeyWidth}%` }} note={naturalNotes[i]} />);

    if (sharpNotes.includes(naturalNotes[i][0]) && i !== naturalNotes.length - 1) {
      keys.push(
        <Key
          key={`key-${i}-sharp`}
          color='black'
          styles={{ width: `${whiteKeyWidth / 2}%`, left: `${blackKeyXPosition}%` }}
          note={naturalNotes[i] + "#"}
        />
      );
    }
    blackKeyXPosition += whiteKeyWidth;
  }
  return keys;
}

type KeysProps = {
  naturalNotes: Array<string>;
  sharpNotes: Array<string>;
  whiteKeyWidth: number;
};

export { Keys };
