import { Entity, Column } from 'typeorm';
import { BaseEntity } from '../../core/entity/base.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { ForbiddenException } from '@nestjs/common';
import { UpdateBookDto } from './dto/update-book.dto';

@Entity('books')
export class Book extends BaseEntity {
  @Column()
  title: string;

  @Column()
  author: string;

  @Column()
  ageRestriction: number; //age restrictions on the book

  @Column({ nullable: true })
  ownerId: number; //id of the user who added the book

  @Column({ nullable: true })
  image?: string;

  static createBook(dto: CreateBookDto, userId: number, userAge: number) {
    // Enforce age restriction: throw if user is too young for the book's age restriction
    if(userAge < 18 && dto.ageRestriction >= 18) {
        throw new ForbiddenException('too young');
      }    
    
      // Create and populate a new Book entity instance
      const book = new Book();
      book.title = dto.title;
      book.ageRestriction = dto.ageRestriction;
      book.author = dto.author;
      book.ownerId = userId; // Assign ownership to the user creating the book

      return book;
  }

  updateBook(dto: UpdateBookDto, userId: number) {

    // Check if current user is the owner; deny update if not
    if (this.ownerId !== userId) {
      throw new ForbiddenException();
    }
    // Update fields if provided in the DTO, else keep existing values
    this.title = dto.title ?? this.title;
    this.ageRestriction = dto.ageRestriction ?? this.ageRestriction;
    this.author = dto.author ?? this.author;

    return this; // Return updated book entity for saving

  }
}
