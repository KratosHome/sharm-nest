import {IsNotEmpty, IsOptional} from "class-validator";

export class CreateCategoryDto {

    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    url: string;

    @IsOptional()
    description: string;
}
