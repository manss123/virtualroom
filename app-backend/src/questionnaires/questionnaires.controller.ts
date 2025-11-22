import {
  Body,
  Controller,
  Get,
  Param,
  ParseEnumPipe,
  Patch,
  Req,
  UseGuards,
} from '@nestjs/common'
import { Request } from 'express'
import { JwtAuthGuard } from '../auth/jwt-auth.guard'
import { UpdateQuestionnaireStatusDto } from './dto/update-questionnaire-status.dto'
import { QuestionnairesService } from './questionnaires.service'
import { QuestionnaireType } from '../../generated/prisma/client'

@UseGuards(JwtAuthGuard)
@Controller('questionnaires')
export class QuestionnairesController {
  constructor(private questionnaires: QuestionnairesService) {}

  @Get('status')
  async list(@Req() req: Request) {
    const userId = (req.user as any)?.userId as string
    const statuses = await this.questionnaires.listStatuses(userId)
    return { statuses }
  }

  @Patch('status/:type')
  async update(
    @Req() req: Request,
    @Param('type', new ParseEnumPipe(QuestionnaireType)) type: QuestionnaireType,
    @Body() dto: UpdateQuestionnaireStatusDto,
  ) {
    const userId = (req.user as any)?.userId as string
    const status = await this.questionnaires.updateStatus(userId, type, dto.status)
    return { status }
  }
}
