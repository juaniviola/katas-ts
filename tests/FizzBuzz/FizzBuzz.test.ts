import FizzBuzz from "../../src/FizzBuzz";

describe("FizzBuzz", () => {
  it("should return number if not divisible by 3 or 5", () => {
    expect(FizzBuzz(1)).toBe("1");
    expect(FizzBuzz(2)).toBe("2");
    expect(FizzBuzz(4)).toBe("4");
    expect(FizzBuzz(7)).toBe("7");
  });

  it("should return 'Fizz' when number is divisible by 3", () => {
    expect(FizzBuzz(3)).toBe("Fizz");
    expect(FizzBuzz(6)).toBe("Fizz");
    expect(FizzBuzz(9)).toBe("Fizz");
  });

  it("should return 'Buzz' when number is divisible by 5", () => {
    expect(FizzBuzz(5)).toBe("Buzz");
    expect(FizzBuzz(10)).toBe("Buzz");
    expect(FizzBuzz(20)).toBe("Buzz");
  });

  it("should return 'FizzBuzz' when number is divisible by 3 and 5", () => {
    expect(FizzBuzz(15)).toBe("FizzBuzz");
    expect(FizzBuzz(30)).toBe("FizzBuzz");
    expect(FizzBuzz(45)).toBe("FizzBuzz");
  });
});
