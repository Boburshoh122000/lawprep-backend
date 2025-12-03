import {
    Controller,
    Get,
    Param,
    Post,
    Res,
    UploadedFile,
    UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import type { Response } from 'express';

@Controller('uploads')
export class UploadsController {
    @Post()
    @UseInterceptors(FileInterceptor('file'))
    uploadFile(@UploadedFile() file: Express.Multer.File) {
        return {
            url: `/uploads/${file.filename}`,
            filename: file.filename,
        };
    }

    @Get(':filename')
    serveFile(@Param('filename') filename: string, @Res() res: Response) {
        return res.sendFile(filename, { root: './uploads' });
    }
}
