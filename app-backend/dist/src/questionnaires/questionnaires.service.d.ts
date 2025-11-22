import { QuestionnaireStatusState, QuestionnaireType } from 'generated/prisma/enums';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class QuestionnairesService {
    private prisma;
    private readonly allTypes;
    constructor(prisma: PrismaService);
    private ensureUserStatuses;
    listStatuses(userId: string): Promise<{
        id: string;
        updatedAt: Date;
        type: QuestionnaireType;
        userId: string;
        status: QuestionnaireStatusState;
        completedAt: Date | null;
    }[]>;
    updateStatus(userId: string, type: QuestionnaireType, status: QuestionnaireStatusState): Promise<{
        id: string;
        updatedAt: Date;
        type: QuestionnaireType;
        userId: string;
        status: QuestionnaireStatusState;
        completedAt: Date | null;
    }>;
}
