import { Injectable } from '@nestjs/common';
import { BlogRepository } from './blog.repository';
import { CreateBlogDto } from './create-blog.dto';
import { Blog } from './blog.entity';

@Injectable()
export class BlogService {
  constructor(private blogRepository: BlogRepository) {}

  async getBlogs(): Promise<Blog[]> {
    return await this.blogRepository.find();
  }

  async createBlog(createBlogDto: CreateBlogDto): Promise<void> {
    return this.blogRepository.createBlog(createBlogDto);
  }
}
