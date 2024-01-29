import { useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { Controls } from "./components/Controls";
import { Keys } from "./components/Keys";
import { getAllNaturalNotes } from "./utils/notes";
import { startSynth } from "./utils/synth";
import "./App.css";

function App() {
  const [power, setPower] = useState(false);
  const isMobile = useMediaQuery("(max-width: 1024px)");

  const range = isMobile ? ["C3", "C5"] : ["C3", "C7"];
  const naturalNotes = ["C", "D", "E", "F", "G", "A", "B"];
  const sharpNotes = ["C", "D", "F", "G", "A"];

  const allNaturalNotes = getAllNaturalNotes(naturalNotes, range);
  const naturalNoteWidth = 100 / allNaturalNotes.length;
  const keyboardWidth = 100 - naturalNoteWidth * 2;

  return (
    <div className='h-screen flex items-center justify-center p-10'>
      <div className='synth shadow-lg'>
        <Controls naturalNoteWidth={naturalNoteWidth} power={power} setPower={setPower} startSynth={startSynth} />
        <div className='keys' style={{ left: `${naturalNoteWidth}%`, width: `${keyboardWidth}%` }}>
          <Keys naturalNotes={allNaturalNotes} sharpNotes={sharpNotes} whiteKeyWidth={naturalNoteWidth} />
        </div>
      </div>
    </div>
  );
}

export default App;
