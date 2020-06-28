import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface RequestDTO {
  title: string;

  value: number;

  type: 'income' | 'outcome';

  total: number[];
}
class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({
    title,
    type,
    value,
    total,
  }: RequestDTO): Transaction | undefined {
    const createTransaction = this.transactionsRepository.create({
      title,
      type,
      value,
    });
    if (Number.isNaN(Number(value))) {
      throw new Error('The Field Value needs to be a number');
      // // eslint-disable-next-line no-unreachable
      // return undefined;
    }
    const checkTotal = Math.sign(total[0]);
    if (checkTotal === -1) {
      throw new Error("the income need's be a more higher than outcome ");
    }

    return createTransaction;
  }
}

export default CreateTransactionService;
