import { IsOptional } from 'class-validator';
import {
  AllowNull,
  BeforeCreate,
  Column,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  BelongsTo,
} from 'sequelize-typescript';

import { v4 as uuid } from 'uuid';
import { Member } from './member.entity';

@Table
export class Book extends Model {
  @PrimaryKey
  @Column
  id: string;

  @Column({ allowNull: false, unique: true })
  title: string;

  @Column
  author: string;

  @Column({
    defaultValue: 1,
  })
  stock: number;

  @Column({ unique: true })
  bookCode: string;

  @Column({ defaultValue: false })
  borrowed: boolean;

  @IsOptional()
  @ForeignKey(() => Member)
  @Column
  memberId: string;

  @BelongsTo(() => Member)
  member: Member;

  @BeforeCreate
  static generate(book: Book, options: any) {
    book.id = uuid();
  }
}
