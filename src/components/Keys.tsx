import "./Keys.css";

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

type KeysProps = {
  naturalNotes: Array<string>;
  sharpNotes: Array<string>;
  whiteKeyWidth: number;
};

export { Keys };
