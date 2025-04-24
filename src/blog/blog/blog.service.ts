/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import { Injectable, NotFoundException } from '@nestjs/common';
import { BlogRepository } from './blog.repository';
import { CreateBlogDto } from '../create-blog.dto';
import { GetBlogDto } from '../get-blog.dto';
import { Not } from 'typeorm';
import { Blog } from './blog.entity';
import { EditBlogDto } from '../edit-blog.dto';

@Injectable()
export class BlogService {
  constructor(private blogRepository: BlogRepository) {}

  async deleteBlog(id: string): Promise<string> {
    const result = await this.blogRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Blog with ${id} not found`);
    }
    return 'Blog deleted Successfully';
  }

  async getOtherBlogsForUser(userId: string): Promise<GetBlogDto[]> {
    let blogs: Blog[];

    if (userId && userId !== '') {
      blogs = await this.blogRepository.find({
        where: {
          user: {
            id: Not(userId),
          },
        },
      });
    } else {
      blogs = await this.blogRepository.find();
    }

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
      getBlogDto.datePosted = blog.datePosted;
      return getBlogDto;
    });
  }

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
      getBlogDto.datePosted = blog.datePosted;
      return getBlogDto;
    });
  }

  async createBlog(createBlogDto: CreateBlogDto): Promise<void> {
    return this.blogRepository.createBlog(createBlogDto);
  }

  async getBlogById(id: string): Promise<GetBlogDto> {
    const blog = await this.blogRepository.findOne({ where: { id } });
    const getBlogDto = new GetBlogDto();

    if (blog != null) {
      getBlogDto.id = blog.id;
      getBlogDto.title = blog.title;
      getBlogDto.content = blog.content;
      getBlogDto.datePosted = blog.datePosted;
      getBlogDto.image = blog.image.toString('base64');
      getBlogDto.firstName = blog.user.firstname;
      getBlogDto.lastName = blog.user.lastname;
      getBlogDto.email = blog.user.email;
      getBlogDto.userId = blog.user.id;
      return getBlogDto;
    } else {
      throw new NotFoundException('No Blog Found');
    }
  }

  async editBlog(id: string, editBlogDto: EditBlogDto): Promise<string> {
    const blog = await this.blogRepository.findOne({ where: { id } });

    if (!blog) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }

    blog.title = editBlogDto.title;
    blog.content = editBlogDto.content;

    console.log('updated', blog.title);

    await this.blogRepository.save(blog);

    return id;
  }
}
