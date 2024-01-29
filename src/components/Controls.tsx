function Controls({ naturalNoteWidth }: { naturalNoteWidth: number }) {
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
    </>
  );
}

export { Controls };
