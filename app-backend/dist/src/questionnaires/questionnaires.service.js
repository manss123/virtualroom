"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionnairesService = void 0;
const common_1 = require("@nestjs/common");
const enums_1 = require("../../generated/prisma/enums");
const prisma_service_1 = require("../prisma/prisma.service");
let QuestionnairesService = class QuestionnairesService {
    constructor(prisma) {
        this.prisma = prisma;
        this.allTypes = [
            enums_1.QuestionnaireType.PDPA_CONSENT,
            enums_1.QuestionnaireType.PRE_TEST,
            enums_1.QuestionnaireType.PRE_SURVEY,
            enums_1.QuestionnaireType.POST_TEST,
            enums_1.QuestionnaireType.POST_SURVEY,
        ];
    }
    async ensureUserStatuses(userId) {
        const existing = await this.prisma.questionnaireStatus.findMany({
            where: { userId },
        });
        const existingTypes = new Set(existing.map((s) => s.type));
        const missing = this.allTypes.filter((type) => !existingTypes.has(type));
        if (missing.length) {
            await this.prisma.questionnaireStatus.createMany({
                data: missing.map((type) => ({ userId, type })),
                skipDuplicates: true,
            });
        }
    }
    async listStatuses(userId) {
        await this.ensureUserStatuses(userId);
        return this.prisma.questionnaireStatus.findMany({
            where: { userId },
            orderBy: { type: 'asc' },
        });
    }
    async updateStatus(userId, type, status) {
        await this.ensureUserStatuses(userId);
        const completedAt = status === enums_1.QuestionnaireStatusState.COMPLETED ? new Date() : null;
        return this.prisma.questionnaireStatus.update({
            where: { userId_type: { userId, type } },
            data: { status, completedAt },
        });
    }
};
exports.QuestionnairesService = QuestionnairesService;
exports.QuestionnairesService = QuestionnairesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], QuestionnairesService);
//# sourceMappingURL=questionnaires.service.js.map