import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { GetContentUseCases } from 'src/usecases/content/getContent.usecases';
import { PostContentUseCases } from 'src/usecases/content/postContent.usecases';

@Controller('/content')
export class ContentController {
  constructor(
    private readonly getContentUseCases: GetContentUseCases,
    private readonly postContentUseCases: PostContentUseCases,
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  postContent(@UploadedFile() file) {
    this.postContentUseCases.postContent(file);
  }

  @Get()
  getContent(): Promise<Buffer> {
    return this.getContentUseCases.getContent();
  }
}
