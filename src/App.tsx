import { useEffect, useState, useMemo } from "react";
import { useMediaQuery } from "usehooks-ts";
import { Controls } from "./components/Controls";
import { Keyboard } from "./components/Keyboard";
import { getAllNaturalNotes } from "./utils/notes";
import { startSynth, stopSynth, stopNote } from "./utils/synth";
import { SMALL_MOBILE_MAX_WIDTH, MOBILE_MAX_WIDTH, NATURAL_NOTES } from "./constants";
import "./App.css";

function App() {
  // State for power switch
  const [power, setPower] = useState(false);
  // Check if the device is a small mobile
  const isSmallMobile = useMediaQuery(`(max-width: ${SMALL_MOBILE_MAX_WIDTH}px)`);
  // Check if the device is mobile
  const isMobile = useMediaQuery(`(max-width: ${MOBILE_MAX_WIDTH}px)`);

  // Determine the range of notes based on the device type
  const range: [string, string] = useMemo(() => {
    if (isSmallMobile) {
      return ["C4", "C5"]; // Adjust the range as needed for small mobiles
    } else if (isMobile) {
      return ["C4", "C6"];
    } else {
      return ["C3", "C7"];
    }
  }, [isMobile, isSmallMobile]);

  // Get all natural notes within the determined range
  const allNaturalNotes = useMemo(() => getAllNaturalNotes(NATURAL_NOTES, range), [range]);

  // Calculate the width of each natural note
  const naturalNoteWidth = 100 / allNaturalNotes.length;

  // Add an event listener to stop the note when the mouse is released
  useEffect(() => {
    const handleMouseUp = () => stopNote();
    window.addEventListener("mouseup", handleMouseUp);

    // Clean up the event listener when the component is unmounted
    return () => {
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  // Start or stop the synth when the power state changes
  useEffect(() => {
    if (power) {
      startSynth();
    } else {
      stopSynth();
    }
  }, [power]);

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
