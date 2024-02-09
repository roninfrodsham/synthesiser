# React Synthesiser

To run project:

```
npm i
npm run dev
```

### Frequency of Notes

To work out the frequency I used this [website](http://techlib.com/reference/musical_note_frequencies.htm) which suggest a formula for musical notes.
I chose the lowest C note as the starting point and then multiplied it by 2^(n/12) where n is the number of keys including semitones away from the starting note.
