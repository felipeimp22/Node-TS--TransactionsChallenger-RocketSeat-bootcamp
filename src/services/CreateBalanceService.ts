import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestDTO {
  income: number;
  outcome: number;
  total: number;
}
class CreateBalanceService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(): RequestDTO {
    const balance = this.transactionsRepository.getBalance();
    if (
      Number.isNaN(Number(balance.income)) ||
      Number.isNaN(Number(balance.outcome)) ||
      Number.isNaN(Number(balance.total))
    ) {
      throw new Error('the field Balance needs be a number');
    }
    // const checkBalance = Math.sign(balance.total);
    // if (checkBalance === -1) {
    //   throw new Error("the outcome should'nt be more higher than income");
    // }
    return balance;
  }
}

export default CreateBalanceService;
