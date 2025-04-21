/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable } from '@nestjs/common';
import { BlogRepository } from './blog.repository';
import { CreateBlogDto } from './create-blog.dto';
import { GetBlogDto } from './get-blog.dto';

@Injectable()
export class BlogService {
  constructor(private blogRepository: BlogRepository) {}

  async getBlogsForUser(userId: string): Promise<GetBlogDto[]> {
    const blogs = await this.blogRepository.find({
      where: { user: { id: userId } },
    });

    return blogs.map((blog) => {
      const getBlogDto = new GetBlogDto();
      getBlogDto.id = blog.id;
      getBlogDto.title = blog.title;
      getBlogDto.content = blog.content;
      getBlogDto.image = blog.image.toString('base64');
      getBlogDto.userId = blog.user.id;
      getBlogDto.firstName = blog.user.firstname;
      getBlogDto.lastName = blog.user.lastname;
      getBlogDto.email = blog.user.email;
      return getBlogDto;
    });
  }

  async createBlog(createBlogDto: CreateBlogDto): Promise<void> {
    return this.blogRepository.createBlog(createBlogDto);
  }
}
