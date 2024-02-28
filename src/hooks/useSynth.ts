import { useEffect, useState } from "react";
import { startSynth, stopSynth } from "../utils/synth";

function useSynth() {
  // State for power switch
  const [power, setPower] = useState(false);

  // Start or stop the synth when the power state changes
  useEffect(() => {
    if (power) {
      startSynth();
    } else {
      stopSynth();
    }
  }, [power]);

  return { power, setPower };
}

export { useSynth };
