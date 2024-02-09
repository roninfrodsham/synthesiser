import { playNote } from "../utils/synth";
import "./Key.css";

type KeyProps = {
  color: string;
  styles: { width: string; left?: string }; // left is optional for the black keys
  note: string;
};

function Key({ color, note, styles }: KeyProps) {
  // When the div is clicked, the playNote function is called with the note prop as an argument
  return <div className={color} data-note={note} style={styles} onMouseDown={() => playNote(note)} />;
}

export { Key };
