import { Languages } from '../entities/product-localization.entity';

export class CreateProductDto {
  readonly name: string;
  readonly subTitle: string;
  readonly description: number;
  readonly language: Languages;
}
