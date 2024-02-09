import { playNote } from "../utils/synth";
import "./Key.css";

type KeyProps = {
  color: string;
  styles: { width: string; left?: string };
  note: string;
};

function Key({ color, note, styles }: KeyProps) {
  return <div className={color} data-note={note} style={styles} onMouseDown={() => playNote(note)} />;
}

export { Key };
