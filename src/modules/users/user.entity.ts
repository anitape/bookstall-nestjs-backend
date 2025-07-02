import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../core/entity/base.entity';

@Entity('users')
export class User extends BaseEntity {
  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  age: number;

  @Column()
  passwordHash: string;
}
