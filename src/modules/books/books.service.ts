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

    // Получить список всех книг
    async getAllBooks(): Promise<Book[]> {
        return this.booksRepository.findAll();
    }

    // Получить книгу по ID
    async getBookById(id: number, userId: number | null): Promise<Book> {
        let userPromise: Promise<User> | null = null;

        if (userId !== null) {
            userPromise = this.userRepo.findByIdOrNotFoundFail(userId);
        }

        const bookPromise = this.booksRepository.findOneOrNotFoundFail(id);

        const [user, book] = await Promise.all([userPromise, bookPromise]);
        
        
        if (book.ageRestriction >= 18) {
            if (!user || user.age < 18) {
                throw new ForbiddenException('Age restriction');
            }
        }

        return book;
    }

    // Создать новую книгу
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

    async deleteBook(id: number, userId: number): Promise<void> {

        const book = await this.booksRepository.findOneOrNotFoundFail(id);

        if (book.ownerId !== userId) {
            throw new ForbiddenException('Cannot delete the book');
        }

        await this.booksRepository.remove(id);

    }
}