import { render, fireEvent } from "@testing-library/react";
import { Controls } from "../Controls";

describe("Controls", () => {
  it("renders correctly and responds to click event", async () => {
    const naturalNoteWidth = 10;
    const power = false;
    const setPower = vi.fn();

    const { container, getByRole } = render(
      <Controls naturalNoteWidth={naturalNoteWidth} power={power} setPower={setPower} />
    );

    // Check if the component is rendered with correct styles
    const logoElements = container.querySelectorAll(".logo");
    expect(logoElements).toHaveLength(2);
    logoElements.forEach((logoElement) => {
      expect(logoElement).toHaveStyle(`left: ${naturalNoteWidth}%`);
    });

    const powerButton = getByRole("button", { name: /power/i });
    expect(powerButton).toHaveStyle(`right: ${naturalNoteWidth}%`);

    const powerLight = powerButton.querySelector("span");
    expect(powerLight).not.toHaveClass("power-light-on");

    // Simulate a click event and check if setPower is called
    fireEvent.click(powerButton);
    expect(setPower).toHaveBeenCalledWith(!power);
  });
});
