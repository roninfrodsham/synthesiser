import "./Controls.css";

type ControlsProps = {
  naturalNoteWidth: number;
  power: boolean;
  setPower: React.Dispatch<React.SetStateAction<boolean>>;
};

function Controls({ naturalNoteWidth, power, setPower }: ControlsProps) {
  const handleClick = () => {
    setPower(!power);
  };

  return (
    <>
      <p
        className='logo text-2xl sm:text-4xl md:text-5xl absolute antialiased subpixel-antialiased tracking-wide text-shadow'
        style={{ left: `${naturalNoteWidth}%` }}
      >
        R 106
      </p>
      <p
        className='logo text-2xl sm:text-4xl md:text-5xl absolute antialiased tracking-wide shine'
        style={{ left: `${naturalNoteWidth}%` }}
      >
        R 106
      </p>
      <button
        className='power absolute flex items-center gap-x-3 rounded-md px-3 py-1 text-sm cursor-pointer md:gap-x-4 md:px-5 md:text-xl'
        style={{ right: `${naturalNoteWidth}%` }}
        onClick={handleClick}
      >
        Power
        <span className={`power-light rounded-full ${power && "power-light-on"}`}></span>
      </button>
    </>
  );
}

export { Controls };
