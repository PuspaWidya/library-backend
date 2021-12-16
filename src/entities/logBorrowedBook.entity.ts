import { IsOptional } from 'class-validator';
import { Table, Model, Column } from 'sequelize-typescript';

@Table
export default class LogBorrowedBook extends Model {
  @Column
  userId: string;

  @Column
  bookId: string;

  @Column
  bookCode: string;

  @Column({ defaultValue: new Date() })
  loanDate: Date;

  @Column
  expectedReturnDate: Date;

  @Column
  returnedDate: Date;

  @Column({ defaultValue: false })
  returned: boolean;
}
