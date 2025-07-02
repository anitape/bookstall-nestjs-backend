import { ForbiddenException, Injectable } from '@nestjs/common';
import { BooksRepository } from './books.repository';
import { Book } from './book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UsersRepository } from '../users/users.repository';
import { UpdateBookDto } from './dto/update-book.dto';
import { User } from '../users/user.entity';

@Injectable()
export class BooksService {
    constructor(private readonly booksRepository: BooksRepository, private userRepo: UsersRepository) { }

    // Get a list of all books
    async getAllBooks(): Promise<Book[]> {
        return this.booksRepository.findAll();
    }

    // Get a book by ID
    async getBookById(id: number, userId: number | null): Promise<Book> {
        let userPromise: Promise<User> | null = null;

        // If user is authenticated, load user data for age checking
        if (userId !== null) {
            userPromise = this.userRepo.findByIdOrNotFoundFail(userId);
        }

        const bookPromise = this.booksRepository.findOneOrNotFoundFail(id);

        // Await both user and book queries in parallel for efficiency
        const [user, book] = await Promise.all([userPromise, bookPromise]);
        
        // Check if the book has an age restriction of 18 or above
        // If yes, and user is unauthorized or authorized user is not old enough --> throw ForbiddenException
        if (book.ageRestriction >= 18) {
            if (!user || user.age < 18) {
                throw new ForbiddenException('Age restriction');
            }
        }

        return book;
    }

    // Create a new book
    async createBook(dto: CreateBookDto, userId: number): Promise<void> {
        const user = await this.userRepo.findByIdOrNotFoundFail(userId);

        const book = Book.createBook(dto, userId, user.age);

        await this.booksRepository.save(book);
    }

    async updateBook(dto: UpdateBookDto, userId: number, bookId: number): Promise<void> {
        const book = await this.booksRepository.findOneOrNotFoundFail(bookId);

        book.updateBook(dto, userId);

        await this.booksRepository.save(book);
    }

    // Delete a book
    async deleteBook(id: number, userId: number): Promise<void> {

        const book = await this.booksRepository.findOneOrNotFoundFail(id);

        // Check if the user owns the book; else forbid deletion
        if (book.ownerId !== userId) {
            throw new ForbiddenException('Cannot delete the book');
        }

        await this.booksRepository.remove(id);

    }
}