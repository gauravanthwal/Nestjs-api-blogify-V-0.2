import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateBlogDto {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsOptional()
  @IsOptional()
  @IsString()
  readonly description: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  readonly body: string;
}
