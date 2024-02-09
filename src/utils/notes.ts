// Function to get all natural notes between two keys
function getAllNaturalNotes(naturalNotes: string[], [firstKey, lastKey]: [string, string]): string[] {
  // Extract the note and octave from the first key
  const firstNote = firstKey.slice(0, 1);
  const firstOctave = parseInt(firstKey.slice(1));
  // Find the position of the first note in the naturalNotes array
  const firstNotePosition = naturalNotes.indexOf(firstNote);

  // Extract the note and octave from the last key
  const lastNote = lastKey.slice(0, 1);
  const lastOctave = parseInt(lastKey.slice(1));
  // Find the position of the last note in the naturalNotes array
  const lastNotePosition = naturalNotes.indexOf(lastNote);

  // If the first or last note is not found, throw an error
  if (firstNotePosition === -1 || lastNotePosition === -1) {
    throw new Error("Invalid key provided");
  }

  // Initialize an array to hold all the natural notes
  const allNaturalNotes: string[] = [];

  // Loop over each octave from the first to the last
  for (let octave = firstOctave; octave <= lastOctave; octave++) {
    // Determine the start and end positions for slicing the naturalNotes array
    const start = octave === firstOctave ? firstNotePosition : 0;
    const end = octave === lastOctave ? lastNotePosition + 1 : naturalNotes.length;

    // Slice the naturalNotes array and append the octave to each note
    const notes = naturalNotes.slice(start, end).map((note) => `${note}${octave}`);
    // Add the notes to the allNaturalNotes array
    allNaturalNotes.push(...notes);
  }

  return allNaturalNotes;
}

export { getAllNaturalNotes };
