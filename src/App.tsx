import { useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import { Controls } from "./components/Controls";
import { Keys } from "./components/Keys";
import { getAllNaturalNotes } from "./utils/notes";
import { startSynth } from "./utils/synth";
import { NATURAL_NOTES } from "./constants";
import "./App.css";

function App() {
  const [power, setPower] = useState(false);
  const isMobile = useMediaQuery("(max-width: 1024px)");

  const range = isMobile ? ["C4", "C6"] : ["C3", "C7"];

  const allNaturalNotes = getAllNaturalNotes(NATURAL_NOTES, range);
  const naturalNoteWidth = 100 / allNaturalNotes.length;
  const keyboardWidth = 100 - naturalNoteWidth * 2;

  return (
    <div className='h-screen flex items-center justify-center p-10'>
      <div className='synth shadow-lg'>
        <Controls naturalNoteWidth={naturalNoteWidth} power={power} setPower={setPower} startSynth={startSynth} />
        <div className='keys' style={{ left: `${naturalNoteWidth}%`, width: `${keyboardWidth}%` }}>
          <Keys naturalNotes={allNaturalNotes} whiteKeyWidth={naturalNoteWidth} />
        </div>
      </div>
    </div>
  );
}

export default App;
