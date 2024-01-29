import "./Controls.css";

function Controls({ naturalNoteWidth, power, setPower, startSynth }: ControlsProps) {
  const handleClick = () => {
    setPower(!power);
    startSynth();
  };

  return (
    <>
      <h1
        className='text-2xl sm:text-4xl md:text-5xl absolute antialiased subpixel-antialiased tracking-wide text-shadow'
        style={{ left: `${naturalNoteWidth}%` }}
      >
        R 106
      </h1>
      <h1
        className='text-2xl sm:text-4xl md:text-5xl absolute antialiased tracking-wide shine'
        style={{ left: `${naturalNoteWidth}%` }}
      >
        R 106
      </h1>
      <button
        className='power absolute flex items-center gap-x-4 rounded-md px-5 py-1 text-xl cursor-pointer'
        style={{ right: `${naturalNoteWidth}%` }}
        onClick={handleClick}
      >
        Power
        <span className={`power-light rounded-full ${power && "power-light-on"}`}></span>
      </button>
    </>
  );
}

type ControlsProps = {
  naturalNoteWidth: number;
  power: boolean;
  setPower: React.Dispatch<React.SetStateAction<boolean>>;
  startSynth: () => void;
};

export { Controls };