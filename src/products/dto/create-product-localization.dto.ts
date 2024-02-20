import { Languages } from 'src/languages/languages.enum';
import { Product } from '../entities/product.entity';

export class CreateProductLocalizationDto {
  readonly name: string;
  readonly language: Languages;
  readonly product: Product;
  readonly subTitle: string;
}
