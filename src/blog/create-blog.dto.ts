/* eslint-disable @typescript-eslint/no-unsafe-call */
import { IsDate, IsString } from 'class-validator';

export class CreateBlogDto {
  @IsString()
  title: string;
  @IsString()
  content: string;
  @IsDate()
  datePosted: Date;
  image: string;
  @IsString()
  userId: string;
}
