import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Post,
    Put,
    UseGuards,
    Request
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { JwtAuthGuard } from 'src/core/guard/jwt-auth.guard';
import { JwtOptionalGuard } from 'src/core/guard/jwt-optional.guard';

@Controller('books')
export class BooksController {
    constructor(private readonly booksService: BooksService) {}

    // Получить список всех книг
    @Get()
    async getAllBooks() {
        // необходимо вызвать соответствующий метод сервиса и вернуть результат
        //const result = await this.booksService.someMethod();
        return this.booksService.getAllBooks();
    }

    // Получить книгу по ID
        @UseGuards(JwtOptionalGuard)
    @Get(':id')
    async getBookById(@Param('id') id: number, @Request() req: any) {
        const userId = req.user?.userId ?? null;
        return this.booksService.getBookById(id, userId);
    }

    // Создать новую книгу
    @Post()
    @HttpCode(201)
    @UseGuards(JwtAuthGuard)
    async createBook(@Body() bookDto: CreateBookDto, @Request() req: any) {
       // console.log(req.user.userId, 'userId');
        return this.booksService.createBook(bookDto, req.user.userId);
    }

    // Обновить информацию о книге
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    async updateBook(@Param('id') id: number, @Body() bookDto: UpdateBookDto, @Request() req: any) {
        
        return this.booksService.updateBook(bookDto, req.user.userId, id);
    }

    // Удалить книгу
    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async deleteBook(@Param('id') id: number, @Request() req: any) {
        
        return this.booksService.deleteBook(id, req.user.userId);
    }
}