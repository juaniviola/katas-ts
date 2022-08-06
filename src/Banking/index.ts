import Account from "./Account";
import Bank from "./Banking";
import WithoutFunds from "./WithoutFunds";

export default class Banking implements Bank {
  private currentAmount = 0;
  private account: Account[] = [];

  private CurrentDate(): string {
    const date = new Date();
    const day = date.getDay();
    const month = date.getMonth();
    const year = date.getFullYear();

    return `${day}.${month}.${year}`;
  }

  deposit(amount: number): void {
    this.currentAmount += amount;
    this.account.push({
      Date: `${this.CurrentDate()}`,
      Amount: `+${amount}`,
      Balance: this.currentAmount,
    });
  }

  withdraw(amount: number): void {
    if (this.currentAmount - amount < 0) {
      throw new WithoutFunds(
        `You can't with draw ${amount} with a balance of ${this.currentAmount}`
      );
    }

    this.currentAmount -= amount;
    this.account.push({
      Date: `${this.CurrentDate()}`,
      Amount: `-${amount}`,
      Balance: this.currentAmount,
    });
  }

  getBalance(): string {
    let balance = "Date      Amount      Balance\n";

    this.account.forEach(({ Date, Amount, Balance }: Account): void => {
      balance = balance.concat(`${Date}      ${Amount}      ${Balance}\n`);
    });

    return balance;
  }
}
