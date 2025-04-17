import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Blog } from './blog.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateBlogDto } from './create-blog.dto';
import { UserRepository } from 'src/auth/user.repository';

const MAX_IMAGE_SIZE = 10 * 1024 * 1024;

@Injectable()
export class BlogRepository extends Repository<Blog> {
  constructor(
    private dataSource: DataSource,
    private userRepository: UserRepository,
  ) {
    super(Blog, dataSource.createEntityManager());
  }

  async createBlog(createBlogDto: CreateBlogDto): Promise<void> {
    const { title, content, datePosted, image, userId } = createBlogDto;

    const user = await this.userRepository.findOne({ where: { id: userId } });

    if (!user) {
      throw new Error('User not found');
    }

    if (image.length > MAX_IMAGE_SIZE) {
      throw new InternalServerErrorException('Image file is too large');
    }

    const imageBuffer = image ? Buffer.from(image, 'base64') : undefined;

    console.log('Image Size:', Buffer.byteLength(image, 'base64'));

    const blog = this.create({
      title: title,
      content,
      datePosted,
      image: imageBuffer,
    });
    try {
      await this.save(blog);
    } catch (error) {
      console.log(error);
      throw new InternalServerErrorException();
    }
  }
}
