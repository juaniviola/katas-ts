export default interface Bank {
  deposit(amount: number): void;
  withdraw(amount: number): void;
  getBalance(): string;
}
