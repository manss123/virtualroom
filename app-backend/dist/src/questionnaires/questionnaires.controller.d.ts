import { Request } from 'express';
import { UpdateQuestionnaireStatusDto } from './dto/update-questionnaire-status.dto';
import { QuestionnairesService } from './questionnaires.service';
import { QuestionnaireType } from '../../generated/prisma/client';
export declare class QuestionnairesController {
    private questionnaires;
    constructor(questionnaires: QuestionnairesService);
    list(req: Request): Promise<{
        statuses: {
            id: string;
            updatedAt: Date;
            type: QuestionnaireType;
            userId: string;
            status: import("../../generated/prisma/enums").QuestionnaireStatusState;
            completedAt: Date | null;
        }[];
    }>;
    update(req: Request, type: QuestionnaireType, dto: UpdateQuestionnaireStatusDto): Promise<{
        status: {
            id: string;
            updatedAt: Date;
            type: QuestionnaireType;
            userId: string;
            status: import("../../generated/prisma/enums").QuestionnaireStatusState;
            completedAt: Date | null;
        };
    }>;
}
