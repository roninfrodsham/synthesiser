import { useMemo } from "react";
import { useMediaQuery } from "usehooks-ts";
import { SMALL_MOBILE_MAX_WIDTH, MOBILE_MAX_WIDTH } from "../constants";

function useDeviceType() {
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

  return { isSmallMobile, isMobile, range };
}

export { useDeviceType };
