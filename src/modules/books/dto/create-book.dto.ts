import { Type } from 'class-transformer';
import { IsInt, IsOptional, IsString, Max, Min, MinLength } from 'class-validator';

export class CreateBookDto {
    @IsString()
    @MinLength(2)
    title: string;

    @IsInt()
    @Min(5)
    @Max(120)
    @Type(() => Number)
    ageRestriction: number;

    @IsString()
    author: string;

    @IsOptional()
    @IsString()
    image?: string;
}
