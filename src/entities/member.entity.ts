import {
  AllowNull,
  BeforeCreate,
  BelongsTo,
  Column,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  Validate,
} from 'sequelize-typescript';

import { v4 as uuid } from 'uuid';
import { Book } from './book.entity';
const bcrypt = require('bcryptjs');

@Table
export class Member extends Model {
  @PrimaryKey
  @Column
  id: string;

  @Column({ allowNull: false })
  name: string;

  @Column({ allowNull: false, unique: true })
  username: string;

  @Column({ defaultValue: false })
  penalized: boolean;

  @Column({ allowNull: false, validate: { isEmail: true }, unique: true })
  email: string;

  @Column({ allowNull: false })
  password: string;

  @Column
  memberCode: string;

  @Column({ defaultValue: 0 })
  borrowedBook: number;

  @HasMany(() => Book)
  books: string;

  @BeforeCreate
  static generate(member: Member) {
    member.id = uuid();
  }

  @BeforeCreate
  static async hashPassword(member: Member) {
    const salt = bcrypt.genSaltSync(10);
    member.password = bcrypt.hashSync(member.password, salt);
  }

  @BeforeCreate
  static generateCode(member) {
    member.memberCode = 'M-' + member.id;
  }
}
