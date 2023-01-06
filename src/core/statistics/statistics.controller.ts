import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { GetStatisticsDto } from './dto/get-statistics.dto';
import { StatisticsService } from './statistics.service';

@ApiTags('Statistics')
@Controller('statistics')
export class StatisticsController {
    constructor(private readonly statisticsService: StatisticsService) {}

    @Get('/')
    getStatistics(@Query() query: GetStatisticsDto) {
        return this.statisticsService.getStatistics(query);
    }
}
