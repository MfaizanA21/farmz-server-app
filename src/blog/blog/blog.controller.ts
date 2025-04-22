import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from '../create-blog.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetBlogDto } from '../get-blog.dto';

@Controller('blog')
@UseGuards(AuthGuard())
export class BlogController {
  constructor(private blogService: BlogService) {}

  @Post('/create-blog')
  createBlog(@Body() createBlogDto: CreateBlogDto) {
    return this.blogService.createBlog(createBlogDto);
  }

  @Get('/get-blogs-for-user')
  async getPersonalBlogs(
    @Query('userId') userId: string,
  ): Promise<GetBlogDto[]> {
    const blogs = await this.blogService.getBlogsForUser(userId);
    for (const blog of blogs) {
      console.log(blog.title);
    }
    return blogs;
  }

  @Get('/get-all-blogs')
  async getOtherBlogs(@Query('userId') userId: string): Promise<GetBlogDto[]> {
    const blogs = await this.blogService.getOtherBlogsForUser(userId);
    for (const blog of blogs) {
      console.log(blog.title);
    }
    return blogs;
  }
}
