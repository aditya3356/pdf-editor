import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';

@Injectable()
export class PostContentUseCases {
  constructor(private readonly prismaService: PrismaService) {}

  async postContent(content) {
    const pdf = await this.prismaService.pdf.findFirst();
    if (pdf !== null) {
      await this.prismaService.pdf.update({
        where: { id: pdf.id },
        data: {
          content: content.buffer,
        },
      });
      return;
    }
    await this.prismaService.pdf.create({
      data: {
        content: content.buffer,
      },
    });
  }
}
