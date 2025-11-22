import { IsEnum } from 'class-validator'
import { QuestionnaireStatusState } from '../../../generated/prisma/client'

export class UpdateQuestionnaireStatusDto {
  @IsEnum(QuestionnaireStatusState)
  status!: QuestionnaireStatusState
}
