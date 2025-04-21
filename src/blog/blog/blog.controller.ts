import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './create-blog.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetBlogDto } from './get-blog.dto';

@Controller('blog')
@UseGuards(AuthGuard())
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Post('/create-blog')
  createBlog(@Body() createBlogDto: CreateBlogDto) {
    return this.blogService.createBlog(createBlogDto);
  }

  @Get('/get-blogs-for-user')
  async getAll(@Query('userId') userId: string): Promise<GetBlogDto[]> {
    const blogs = await this.blogService.getBlogsForUser(userId);
    console.log(blogs);
    return blogs;
  }
}
