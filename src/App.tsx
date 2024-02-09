import { useEffect, useState, useMemo } from "react";
import { useMediaQuery } from "usehooks-ts";
import { Controls } from "./components/Controls";
import { Keyboard } from "./components/Keyboard";
import { getAllNaturalNotes } from "./utils/notes";
import { startSynth, stopSynth, stopNote } from "./utils/synth";
import { MOBILE_MAX_WIDTH, NATURAL_NOTES } from "./constants";
import "./App.css";

function App() {
  const [power, setPower] = useState(false);
  const isMobile = useMediaQuery(`(max-width: ${MOBILE_MAX_WIDTH}px)`);

  const range = useMemo(() => (isMobile ? ["C4", "C6"] : ["C3", "C7"]), [isMobile]);

  const allNaturalNotes = useMemo(() => getAllNaturalNotes(NATURAL_NOTES, range), [range]);

  const naturalNoteWidth = 100 / allNaturalNotes.length;

  useEffect(() => {
    const handleMouseUp = () => stopNote();
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  useEffect(() => {
    if (power) {
      startSynth();
    } else {
      stopSynth();
    }
  }, [power]);

  return (
    <div className='h-screen flex items-center justify-center p-10'>
      <div className='synth relative w-full shadow-lg'>
        <Controls naturalNoteWidth={naturalNoteWidth} power={power} setPower={setPower} />
        <Keyboard naturalNotes={allNaturalNotes} whiteKeyWidth={naturalNoteWidth} naturalNoteWidth={naturalNoteWidth} />
      </div>
    </div>
  );
}

export { App };
