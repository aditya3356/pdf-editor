import { Module } from '@nestjs/common';
import { GetContentUseCases } from './content/getContent.usecases';
import { PostContentUseCases } from './content/postContent.usecases';

@Module({
  providers: [GetContentUseCases, PostContentUseCases],
})
export class UseCasesModule {}
