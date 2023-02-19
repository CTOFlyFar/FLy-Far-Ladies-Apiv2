import express, {Request, Response} from 'express';
import { Controller, Get, Post, Body, Patch, Param, Delete, ParseFilePipe, Req, Res, UseInterceptors, UploadedFiles, ParseFilePipeBuilder, HttpStatus, forwardRef, Inject } from '@nestjs/common';
import { ImagesService } from './images.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { AnyFilesInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import { of } from 'rxjs';
import { join } from 'path';

@Controller('images')
export class ImagesController {
  constructor( private readonly imagesService: ImagesService
   ) {}

//cover image

@Post('AddImage')
@UseInterceptors(FilesInterceptor('Image',100,{
    storage:diskStorage({
      destination: './CoverImage',
      filename:(req, image, callback)=>{
        // const uniqueSuffix = Date.now() + '-' +Math.round(Math.random()*1e9);
        // const ext = extname(image.originalname)
        const filename = `${image.originalname}`;
        callback(null, filename)
      }
    })
  }))
async AddImage( 
    @UploadedFiles(
      new ParseFilePipeBuilder()
      .addFileTypeValidator({
        fileType:  /(jpg|jpeg|png|gif)$/,
      })
      .addMaxSizeValidator({
        maxSize: 9876546
      })
      .build({
        errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
      }),
      
    )
    files: Express.Multer.File,
    @Body()  @Req() req:Request, @Res() res:Response){  
      console.log(files);
      return res.status(HttpStatus.OK).send({message:"Image Added successfully"});
    }

@Get(':filename')
getImageFile(@Param('filename') filename, @Res() res: Response){
  return of(res.sendFile(join(process.cwd(), 'CoverImage' + filename)));
  
}


  @Get()
  findAll() {
    return this.imagesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imagesService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateImageDto: UpdateImageDto) {
    return this.imagesService.update(+id, updateImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imagesService.remove(+id);
  }
}
