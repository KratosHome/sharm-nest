import {IsNotEmpty, IsOptional} from "class-validator";
import { Category } from "../entities/category.entity";
import { ApiProperty } from "@nestjs/swagger";

export class ReturnedCategoryDto {
   @ApiProperty()
   id: number;

   @ApiProperty()
   @IsNotEmpty()
   title: string;

   @ApiProperty()
   @IsNotEmpty()
   url: string;

   @ApiProperty()
   @IsOptional()
   description: string;

   @ApiProperty()
   @IsNotEmpty()
   parent: Category;

   @ApiProperty()
   createdAt: Date;

   @ApiProperty()
   updateAt: Date;
}
