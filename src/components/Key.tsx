import { playNote, stopNote } from "../utils/synth";
import "./Key.css";

function Key({ color, note, styles }: KeyProps) {
  return (
    <div
      className={color}
      data-note={note}
      style={styles}
      onMouseDown={() => playNote(note)}
      onMouseUp={() => stopNote(note)}
    />
  );
}

type KeyProps = {
  color: string;
  styles: { width: string; left?: string };
  note: string;
};

export { Key };
