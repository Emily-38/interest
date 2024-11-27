import {
  Controller,
  UseInterceptors,
  UploadedFile,
  Post,
  Param,
  Get,
  Res,
  UseGuards,
  NotFoundException,
  Delete,
} from '@nestjs/common';
import { ImageService } from './image.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path';
import { createReadStream, existsSync, unlink } from 'fs';
import { Response } from 'express';
import { JwtGuard } from 'src/auth/guards';


@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @UseGuards(JwtGuard)
  @Post('/upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          const ext = extname(file.originalname);
          callback(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
        },
      }),
    }),
  )
  uploadFile(
    @UploadedFile() file: Express.Multer.File,
  ) {
  return file.filename
  }

   @Get('/view/:filename')
  viewImage(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = join(__dirname, '..','..','..', 'uploads', filename);
    if (existsSync(filePath)) {
      const fileStream = createReadStream(filePath);
      fileStream.pipe(res);
    } else {
      res.status(404).json({ message: 'Image not found' });
    }
  }

  @Delete('/:folder/:file')
  async deleteFile(
    @Param('folder') folder: string,
    @Param('file') file: string,
  ) {
    const filePath = `${folder}/${file}`;
    const fullPath = join(process.cwd(), filePath);

    unlink(fullPath, (err) => {
      if (err) {
        throw new NotFoundException('File not found or could not be deleted');
      }
      return 'File deleted successfully';
    });
  }
}

