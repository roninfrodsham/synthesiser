import { playNote } from "../utils/synth";
import "./Key.css";

function Key({ color, note, styles }: KeyProps) {
  return <div className={color} data-note={note} style={styles} onClick={() => playNote(note)} />;
}

type KeyProps = {
  color: string;
  styles: { width: string; left?: string };
  note: string;
};

export { Key };
