import { getCustomRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Transaction from '../models/Transaction';
import TransactionRepository from '../repositories/TransactionsRepository';

class DeleteTransactionService {
  public async execute(id: string): Promise<void> {
    // Busca do BD - Existe? Então deleta, Não existe? Retorna um erro.
    const transactionsRepository = getCustomRepository(TransactionRepository)

    // Procurar no banco
    const transaction = await transactionsRepository.findOne(id);

    // Se não encontrar, retorna o erro
    if (!transaction) {
      throw new AppError('Transaction does not exist!');
    }

    // Excluir o ID selecionado
    await transactionsRepository.remove(transaction);

    return;
  }
}

export default DeleteTransactionService;
