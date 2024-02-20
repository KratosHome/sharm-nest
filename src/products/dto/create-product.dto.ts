import { CreateProductLocalizationDto } from './create-product-localization.dto';

export class CreateProductDto {
  readonly visited: number;
  readonly localizations: CreateProductLocalizationDto[];
}
