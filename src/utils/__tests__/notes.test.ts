import { getAllNaturalNotes } from "../notes";

describe("getAllNaturalNotes", () => {
  it("should return all natural notes between C4 and E4", () => {
    const naturalNotes = ["C", "D", "E", "F", "G", "A", "B"];
    const result = getAllNaturalNotes(naturalNotes, ["C4", "E4"]);
    expect(result).toEqual(["C4", "D4", "E4"]);
  });

  it("should return all natural notes between A3 and C4", () => {
    const naturalNotes = ["C", "D", "E", "F", "G", "A", "B"];
    const result = getAllNaturalNotes(naturalNotes, ["A3", "C4"]);
    expect(result).toEqual(["A3", "B3", "C4"]);
  });

  it("should throw an error for invalid keys", () => {
    const naturalNotes = ["C", "D", "E", "F", "G", "A", "B"];
    expect(() => getAllNaturalNotes(naturalNotes, ["H4", "C4"])).toThrow("Invalid key provided");
  });
});
