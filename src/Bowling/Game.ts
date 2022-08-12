import BowlingGame from "./BowlingGame";

interface GameConstructor {
  maxFrames?: number;
  maxRollsPerFrame?: number;
  maxPinsPerRoll?: number;
}

export default class Game implements BowlingGame {
  private MAX_FRAMES;
  private MAX_ROLLS;
  private MAX_PINS;
  private rolls: number[];
  private currentFrame = 0;

  constructor(init?: GameConstructor) {
    this.MAX_PINS = init?.maxPinsPerRoll ? init.maxPinsPerRoll : 10;
    this.MAX_FRAMES = init?.maxFrames ? init.maxFrames : 10;
    this.MAX_ROLLS = init?.maxRollsPerFrame ? init.maxRollsPerFrame : 2;

    this.rolls = new Array(this.MAX_FRAMES * this.MAX_ROLLS + 1).fill(0);
  }

  public roll(pinsKnocked: number): void {
    this.rolls[this.currentFrame++] = pinsKnocked;
  }

  public score(): number {
    let score = 0;

    for (let frame = 0, rollIndex = 0; frame < this.MAX_FRAMES; frame++) {
      if (this.isStrike(rollIndex)) {
        score += this.MAX_FRAMES + this.strikeBonus(rollIndex);
        rollIndex += 1;
        continue;
      }

      if (this.isSpare(rollIndex)) {
        score += this.MAX_FRAMES + this.spareBonus(rollIndex);
        rollIndex += 2;
        continue;
      }

      score += this.sumOfFrame(rollIndex);
      rollIndex += 2;
    }

    return score;
  }

  private sumOfFrame(rollIndex: number) {
    let sum = 0;
    for (let index = rollIndex; index < rollIndex + this.MAX_ROLLS; index++)
      sum += this.rolls[index];

    return sum;
  }

  private isSpare(rollIndex: number) {
    return this.sumOfFrame(rollIndex) === this.MAX_PINS;
  }

  private isStrike(rollIndex: number) {
    return this.rolls[rollIndex] === this.MAX_PINS;
  }

  private spareBonus(rollIndex: number) {
    return this.rolls[rollIndex + 2];
  }

  private strikeBonus(rollIndex: number) {
    return this.rolls[rollIndex + 1] + this.rolls[rollIndex + 2];
  }
}
