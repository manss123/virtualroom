import { Module } from '@nestjs/common'
import { QuestionnairesService } from './questionnaires.service'
import { QuestionnairesController } from './questionnaires.controller'
import { PrismaModule } from '../prisma/prisma.module'

@Module({
  imports: [PrismaModule],
  providers: [QuestionnairesService],
  controllers: [QuestionnairesController],
})
export class QuestionnairesModule {}
