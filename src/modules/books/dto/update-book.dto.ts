import {
    IsInt,
    IsOptional,
    IsString,
    Max,
    Min,
    MinLength,
} from 'class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateBookDto } from './create-book.dto';

export class UpdateBookDto {
    @IsString()
    @IsOptional()
    @MinLength(2)
    title?: string;

    @IsInt()
    @Min(5)
    @Max(120)
    @IsOptional()
    ageRestriction?: number;

    @IsString()
    @IsOptional()
    author?: string;
}