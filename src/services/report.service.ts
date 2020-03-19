import {getRepository} from "typeorm";
import {Report} from '../entities/report'

export class ReportService {
    reportRepository() {
        return getRepository(Report)
    }

    async findAllReport() {
        return await this.reportRepository().find()
    }

    async createReport(report: Report) {
        return await this.reportRepository().save(report)
    }

    async findReportByHastag(report: Report) {
        return await this.reportRepository().findOne(report)
    }
}