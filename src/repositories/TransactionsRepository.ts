// import { request } from 'supertest';
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  private Total: number[] = [];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    // TODO
    return this.transactions;
  }

  public getTotal(): number[] {
    this.Total.splice(0);
    return this.Total;
  }

  public getBalance(): Balance {
    // TODO 'income' | 'outcome'
    const inComeArr: number[] = [0];
    const outComeArr: number[] = [0];

    this.transactions.forEach(e => {
      if (e.type === 'income') {
        inComeArr.push(e.value);
      }
    });
    this.transactions.forEach(e => {
      if (e.type === 'outcome') {
        outComeArr.push(e.value);
      }
    });

    const income = inComeArr.reduce((ac, cv) => ac + cv);
    const outcome = outComeArr.reduce((ac, cv) => ac + cv);
    const total = income - outcome;
    this.Total.push(total);
    const balance = {
      income,
      outcome,
      total,
    };

    return balance;
  }

  public create({ title, type, value }: Omit<Transaction, 'id'>): Transaction {
    const transaction = new Transaction({ title, type, value });
    this.transactions.push(transaction);
    this.getBalance();

    return transaction;
  }
}

export default TransactionsRepository;
