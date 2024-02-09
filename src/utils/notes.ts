function getAllNaturalNotes(naturalNotes: string[], [firstKey, lastKey]: [string, string]): string[] {
  const firstNote = firstKey.slice(0, 1);
  const firstOctave = parseInt(firstKey.slice(1));
  const firstNotePosition = naturalNotes.indexOf(firstNote);
  const lastNote = lastKey.slice(0, 1);
  const lastOctave = parseInt(lastKey.slice(1));
  const lastNotePosition = naturalNotes.indexOf(lastNote);

  if (firstNotePosition === -1 || lastNotePosition === -1) {
    throw new Error("Invalid key provided");
  }

  const allNaturalNotes: string[] = [];

  for (let octave = firstOctave; octave <= lastOctave; octave++) {
    const start = octave === firstOctave ? firstNotePosition : 0;
    const end = octave === lastOctave ? lastNotePosition + 1 : naturalNotes.length;

    const notes = naturalNotes.slice(start, end).map((note) => `${note}${octave}`);
    allNaturalNotes.push(...notes);
  }

  return allNaturalNotes;
}

export { getAllNaturalNotes };
