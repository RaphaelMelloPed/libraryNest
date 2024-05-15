import { v2 as cloudinary } from 'cloudinary';
import { Injectable } from '@nestjs/common';
import * as dotenv from 'dotenv';
dotenv.config();

@Injectable()
export class CloudinaryService {
  constructor() {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      cloud_key: process.env.CLOUDINARY_KEY,
      cloud_secret: process.env.CLOUDINARY_SECRET,
      folder: process.env.CLOUDINARY_FOLDER
    });
  }

  async uploadImage(image: any): Promise<string> {
    if (!image || !image.buffer) {
      

      return image = process.env.DEFAULT_USER_IMAGE
    }

    const imageBase64 = image.buffer.toString('base64'); 
    const result = await cloudinary.uploader.upload(`data:${image.mimetype};base64,${imageBase64}`); 

    if (!result || !result.secure_url) {
      throw new Error('Failed to upload image to Cloudinary');
    }

    return result.secure_url;
  }
}