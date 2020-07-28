import { getCustomRepository, getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';
import Category from '../models/Category';
import TransactionsRepository from '../repositories/TransactionsRepository';

interface Request {
  title: string;
  type: 'income' | 'outcome';
  value: number;
  category: string;
}

class CreateTransactionService {
  public async execute({ title, value, type, category }: Request): Promise<Transaction> {
    const transactionsRepository = getCustomRepository(TransactionsRepository);
    const categoryRepository = getRepository(Category);

    const { total } = await transactionsRepository.getBalance();

    if (type === 'outcome' && total < value) {
      throw new AppError('You do not have enough balance.');
    }

    // Verificar se a categoria já existe.
     // Existe? Buscar ela do banco de dados, usar o ID que foi retornado.
    let transactionsCategory = await categoryRepository.findOne({ where: { title: category } });

    // Não existe? Crio ela.
    if (!transactionsCategory) {
      transactionsCategory = categoryRepository.create({
        title: category,
      });

      await categoryRepository.save(transactionsCategory);
    }

    const transaction = transactionsRepository.create({ title, value, type, category: transactionsCategory, });

    await transactionsRepository.save(transaction);

    return transaction;
  }
}

export default CreateTransactionService;
