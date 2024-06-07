import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from './cloudinary.service';

@Controller('images')
export class CloudinaryController {
    constructor(private readonly cloudinaryService: CloudinaryService) {}

    @Post('upload')
    @UseInterceptors(FileInterceptor('file')) // Certifique-se de que o campo é "file"
    async uploadImage(@UploadedFile() file: Express.Multer.File) {

        if (!file) {
            throw new Error('No file uploaded');
        }
        console.log(file, "FILE NO BACKEND")

        try {
            const result = await this.cloudinaryService.uploadImage(file);
            return result;
        } catch (error) {
            throw new Error('Failed to upload image to Cloudinary');
        }
    }
}
