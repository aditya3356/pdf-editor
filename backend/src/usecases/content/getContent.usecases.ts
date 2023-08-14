import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';

@Injectable()
export class GetContentUseCases {
  constructor(private readonly prismaService: PrismaService) {}

  async getContent(): Promise<Buffer> {
    const pdf = await this.prismaService.pdf.findFirst();
    return Promise.resolve(pdf?.content);
  }
}
