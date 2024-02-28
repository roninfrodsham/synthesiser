import { useEffect, useMemo, useCallback } from "react";
import { useDeviceType, useSynth } from "./hooks";
import { Controls } from "./components/Controls";
import { Keyboard } from "./components/Keyboard";
import { getAllNaturalNotes } from "./utils/notes";
import { stopNote } from "./utils/synth";
import { NATURAL_NOTES } from "./constants";
import "./App.css";

function App() {
  // Use custom hook to get range of notes by device type
  const { range } = useDeviceType();

  // Get all natural notes within the determined range
  const allNaturalNotes = useMemo(() => getAllNaturalNotes(NATURAL_NOTES, range), [range]);

  // Calculate the width of each natural note
  const naturalNoteWidth = 100 / allNaturalNotes.length;

  // Use useCallback for the mouse up event handler
  const handleMouseUp = useCallback(() => stopNote(), []);

  // Add an event listener to stop the note when the mouse is released
  useEffect(() => {
    window.addEventListener("mouseup", handleMouseUp);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [handleMouseUp]);

  // Use custom hook for synth power state
  const { power, setPower } = useSynth();

  // Render the Controls and Keyboard components
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
