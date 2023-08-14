import { Module } from '@nestjs/common';
import { ContentController } from './content/content.controller';
import { GetContentUseCases } from 'src/usecases/content/getContent.usecases';
import { PostContentUseCases } from 'src/usecases/content/postContent.usecases';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [ContentController],
  providers: [PrismaService, GetContentUseCases, PostContentUseCases],
})
export class ControllersModule {}
