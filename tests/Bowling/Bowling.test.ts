import Game from "../../src/Bowling/Game";

describe("Bowling game", () => {
  let game: Game;

  it("score should be 0", () => {
    rollManyTimesWithValue(20, 0);

    expect(game.score()).toBe(0);
  });

  it("rolls without strikes and spares", () => {
    rollManyTimesWithValue(20, 2);

    expect(game.score()).toBe(2 * 10 * 2);
  });

  it("rolls with spare", () => {
    rollSpare();
    rollManyTimesWithValue(1, 3);
    rollManyTimesWithValue(17, 0);

    expect(game.score()).toBe(16);
  });

  it("rolls with strike", () => {
    rollStrike();
    game.roll(3);
    game.roll(4);
    rollManyTimesWithValue(16, 0);

    expect(game.score()).toBe(24);
  });

  it("rolls with all strikes", () => {
    rollManyTimesWithValue(12, 10);

    expect(game.score()).toBe(300);
  });

  beforeEach(() => {
    game = new Game();
  });

  const rollStrike = () => game.roll(10);

  const rollManyTimesWithValue = (times: number, value: number) =>
    Array(times)
      .fill(0)
      .forEach(() => game.roll(value));

  const rollSpare = () => {
    game.roll(4);
    game.roll(6);
  };
});
