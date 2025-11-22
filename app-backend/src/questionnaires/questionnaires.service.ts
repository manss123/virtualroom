import { Injectable } from '@nestjs/common'
import {
  QuestionnaireStatusState,
  QuestionnaireType,
} from '../../generated/prisma/client'
import { PrismaService } from '../prisma/prisma.service'

@Injectable()
export class QuestionnairesService {
  private readonly allTypes: QuestionnaireType[] = [
    QuestionnaireType.PDPA_CONSENT,
    QuestionnaireType.PRE_TEST,
    QuestionnaireType.PRE_SURVEY,
    QuestionnaireType.POST_TEST,
    QuestionnaireType.POST_SURVEY,
  ]

  constructor(private prisma: PrismaService) {}

  private async ensureUserStatuses(userId: string) {
    const existing = await this.prisma.questionnaireStatus.findMany({
      where: { userId },
    })
    const existingTypes = new Set(existing.map((s) => s.type))
    const missing = this.allTypes.filter((type) => !existingTypes.has(type))

    if (missing.length) {
      await this.prisma.questionnaireStatus.createMany({
        data: missing.map((type) => ({ userId, type })),
        skipDuplicates: true,
      })
    }
  }

  async listStatuses(userId: string) {
    await this.ensureUserStatuses(userId)
    return this.prisma.questionnaireStatus.findMany({
      where: { userId },
      orderBy: { type: 'asc' },
    })
  }

  async updateStatus(
    userId: string,
    type: QuestionnaireType,
    status: QuestionnaireStatusState,
  ) {
    await this.ensureUserStatuses(userId)
    const completedAt =
      status === QuestionnaireStatusState.COMPLETED ? new Date() : null

    return this.prisma.questionnaireStatus.update({
      where: { userId_type: { userId, type } },
      data: { status, completedAt },
    })
  }
}
