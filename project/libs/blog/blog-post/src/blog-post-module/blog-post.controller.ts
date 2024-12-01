import { Controller } from '@nestjs/common';
import { BlogPostService } from './blog-post.service';

@Controller('blog-post')
export class BlogPostController {
  constructor(private readonly authService: BlogPostService) {}
}
