import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CoursesService } from './courses.service';

@Controller('courses')
export class CoursesController {
    constructor(private coursesService: CoursesService) { }

    @Get()
    findAll() {
        return this.coursesService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.coursesService.findOne(id);
    }

    @Post()
    create(@Body() createData: any) {
        return this.coursesService.create(createData);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() updateData: any) {
        return this.coursesService.update(id, updateData);
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.coursesService.delete(id);
    }

    @Post(':id/lessons')
    createLesson(@Param('id') id: string, @Body() lessonData: any) {
        return this.coursesService.createLesson(id, lessonData);
    }

    @Put('lessons/:id')
    updateLesson(@Param('id') id: string, @Body() lessonData: any) {
        return this.coursesService.updateLesson(id, lessonData);
    }
}
