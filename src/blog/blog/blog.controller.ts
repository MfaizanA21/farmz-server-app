import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from '../create-blog.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetBlogDto } from '../get-blog.dto';
import { EditBlogDto } from '../edit-blog.dto';

@Controller('blog')
export class BlogController {
  constructor(private blogService: BlogService) {}
  @UseGuards(AuthGuard())
  @Post('/create-blog')
  createBlog(@Body() createBlogDto: CreateBlogDto) {
    return this.blogService.createBlog(createBlogDto);
  }

  @Get('/get-blogs-for-user')
  @UseGuards(AuthGuard())
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
    console.log(blogs[0].title);
    return blogs;
  }

  @Get('/get-blog')
  async getBlogById(@Query('id') id: string): Promise<GetBlogDto> {
    const blog = await this.blogService.getBlogById(id);
    console.log(blog.title);
    return blog;
  }

  @Delete('/delete-blog/:id')
  @UseGuards(AuthGuard())
  async DeleteBlog(@Param('id') id: string): Promise<string> {
    return this.blogService.deleteBlog(id);
  }

  @Patch('/edit-blog/:id')
  @UseGuards(AuthGuard())
  async editBlog(
    @Param('id') id: string,
    @Body() editBlogDto: EditBlogDto,
  ): Promise<string> {
    return this.blogService.editBlog(id, editBlogDto);
  }
}
