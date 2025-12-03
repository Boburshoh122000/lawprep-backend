import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { TestsService } from './tests.service';
import { Prisma } from '@prisma/client';

@Controller('tests')
export class TestsController {
    constructor(private readonly testsService: TestsService) { }

    @Post()
    create(@Body() data: Prisma.TestCreateInput) {
        return this.testsService.create(data);
    }

    @Get()
    findAll() {
        return this.testsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.testsService.findOne(id);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() data: Prisma.TestUpdateInput) {
        return this.testsService.update(id, data);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.testsService.remove(id);
    }

    @Post(':id/questions')
    addQuestion(@Param('id') id: string, @Body() data: any) {
        return this.testsService.addQuestion(id, data);
    }

    @Put('questions/:id')
    updateQuestion(@Param('id') id: string, @Body() data: Prisma.QuestionUpdateInput) {
        return this.testsService.updateQuestion(id, data);
    }

    @Delete('questions/:id')
    removeQuestion(@Param('id') id: string) {
        return this.testsService.removeQuestion(id);
    }
}
