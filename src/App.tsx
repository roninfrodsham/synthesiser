import { useMediaQuery } from "usehooks-ts";
import "./App.css";

// const flatNotes = ["D", "E", "G", "A", "B"];

function getAllNaturalNotes(naturalNotes: Array<string>, [firstKey, lastKey]: Array<string>) {
  const firstNote = firstKey[0];
  const firstOctave = parseInt(firstKey[1]);
  const firstNotePosition = naturalNotes.indexOf(firstNote);

  const lastNote = lastKey[0];
  const lastOctave = parseInt(lastKey[1]);
  const lastNotePosition = naturalNotes.indexOf(lastNote);

  const allNaturalNotes: Array<string> = [];

  for (let octave = firstOctave; octave <= lastOctave; octave++) {
    if (octave === firstOctave) {
      naturalNotes.slice(firstNotePosition).forEach((note) => {
        allNaturalNotes.push(`${note}${octave}`);
      });
    } else if (octave === lastOctave) {
      naturalNotes.slice(0, lastNotePosition + 1).forEach((note) => {
        allNaturalNotes.push(`${note}${octave}`);
      });
    } else {
      naturalNotes.forEach((note) => {
        allNaturalNotes.push(`${note}${octave}`);
      });
    }
  }

  return allNaturalNotes;
}

function Keys({ naturalNotes, sharpNotes, whiteKeyWidth }: KeysProps) {
  const test = () => {
    console.log("test");
  };

  const keys: Array<React.ReactNode> = [];
  let blackKeyXPosition = whiteKeyWidth - whiteKeyWidth / 4;

  for (let i = 0; i < naturalNotes.length; i++) {
    keys.push(<div key={`key-${i}`} className='white' style={{ width: `${whiteKeyWidth}%` }} onClick={test} />);

    if (sharpNotes.includes(naturalNotes[i][0]) && i !== naturalNotes.length - 1) {
      keys.push(
        <div
          key={`key-${i}-sharp`}
          className='black'
          style={{ width: `${whiteKeyWidth / 2}%`, left: `${blackKeyXPosition}%` }}
        />
      );
    }
    blackKeyXPosition += whiteKeyWidth;
  }
  return keys;
}

function App() {
  const isMobile = useMediaQuery("(max-width: 1024px)");
  console.log(isMobile);
  const naturalNotes = ["C", "D", "E", "F", "G", "A", "B"];
  const sharpNotes = ["C", "D", "F", "G", "A"];
  const range = isMobile ? ["C3", "C5"] : ["C3", "C7"];
  const allNaturalNotes = getAllNaturalNotes(naturalNotes, range);
  const naturalNoteWidth = 100 / allNaturalNotes.length;
  const keyboardWidth = 100 - naturalNoteWidth * 2;
  console.log(naturalNoteWidth, keyboardWidth);

  return (
    <div className='h-screen flex items-center justify-center p-10'>
      <div className='synth shadow-lg'>
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
        <div className='keys' style={{ left: `${naturalNoteWidth}%`, width: `${keyboardWidth}%` }}>
          <Keys naturalNotes={allNaturalNotes} sharpNotes={sharpNotes} whiteKeyWidth={naturalNoteWidth} />
        </div>
      </div>
    </div>
  );
}

type KeysProps = {
  naturalNotes: Array<string>;
  sharpNotes: Array<string>;
  whiteKeyWidth: number;
};

export default App;
