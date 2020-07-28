import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn} from 'typeorm';

/*
Um para Um (OneToOne)
Um para Muitos (OneToMany)
Muitos para Muitos (ManytoMany)
*/

import Category from './Category';

@Entity('transactions')
class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  type: 'income' | 'outcome';

  // value é do tipo 'decimal', conforme definido na migration
  @Column('decimal')
  value: number;

  /*
  Um para Muitos (OneToMany), é uma relação em que A contém várias instâncias de B, mas B contém apenas uma instância de A. Vamos considerar, por exemplo, entidades Usuário e Foto. O usuário pode ter várias fotos, mas cada foto pertence a apenas um usuário.
  Relacionando as tabelas.
  */
  @ManyToOne(() => Category)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @Column()
  category_id: string;

  @CreateDateColumn()
  created_at: Date;
  
  @UpdateDateColumn()
  updated_at: Date;
}

export default Transaction;
