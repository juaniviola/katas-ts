import Banking from "../../src/Banking";
import WithoutFundsError from "../../src/Banking/WithoutFunds";

describe("Banking happy path", () => {
  it("should get balance of 0 after initialize account", () => {
    const bank = new Banking();
    const balance = bank.getBalance();

    expect(balance).toEqual("Date      Amount      Balance\n");
  });

  it("should add 500 to balance", () => {
    const bank = new Banking();
    const amount = 500;
    bank.deposit(amount);
    const balance = bank.getBalance();

    const date = `${new Date().getDay()}.${new Date().getMonth()}.${new Date().getFullYear()}`;
    expect(balance).toEqual(
      `Date      Amount      Balance\n${date}      +${amount}      ${amount}\n`
    );
  });

  it("should get final balance of 0 after deposit 500 and withdraw 500", () => {
    const bank = new Banking();
    const amount = 500;
    bank.deposit(amount);
    bank.withdraw(amount);
    const balance = bank.getBalance();

    const date = `${new Date().getDay()}.${new Date().getMonth()}.${new Date().getFullYear()}`;
    const expectedBalance = [
      "Date      Amount      Balance\n",
      `${date}      +${amount}      ${amount}\n`,
      `${date}      -${amount}      0\n`,
    ];
    expect(balance).toEqual(expectedBalance.join(""));
  });
});

describe("Banking errors", () => {
  it("should throw error when you try to with draw with balance in 0", () => {
    const bank = new Banking();

    const amount = 10;
    expect(() => bank.withdraw(amount)).toThrowError(WithoutFundsError);
  });

  it("should throw error when you try to with draw more than you have in balance", () => {
    const bank = new Banking();
    bank.deposit(500);

    const amountToWithdraw = 510;
    expect(() => bank.withdraw(amountToWithdraw)).toThrowError(
      WithoutFundsError
    );
  });
});
