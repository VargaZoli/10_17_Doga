import { Body, Controller, Get, Render, Res, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { get } from 'http';
import { Response } from 'express';
import { FoglalasDto } from './foglalas.dto';
import { error } from 'console';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get()
  @Render('index')
  getHello() {
    return {
      message: this.appService.getHello()
    };
  }
 

  @Get('foglalas')
  @Render('szallasFoglalas')
  showFoglalas(){
    return{
      errors: [],
      data: {}
    }

  }
  @Post('foglalas')
  @Render('szallasFoglalas')
  kezelFoglalas(
    @Body() foglalasData: FoglalasDto,
    @Res() response: Response,
  ){
    const errors: string[] = [];
    if(!foglalasData.name||!foglalasData.name.trim()){
  errors.push( 'Kötelező megadni nevet !' );
}

const emailcheck=/.+@.+\..+/;

if(!emailcheck.test(foglalasData.email)){
  errors.push(' Kötelező megadni email címet/Helytelen email!' );
  
}

const currentDate=new Date()
if(!foglalasData.date||new Date(foglalasData.date)<currentDate){
errors.push( 'Érvénytelen dátum!' );
}

const guests=parseInt(foglalasData.guests)
if (guests>10||guests<1) {
  errors.push('1 és 10 között lehetnek a vendégek!');
}

if(errors.length>0){
  response.render('szallasFoglalas',{
    errors,
    data: foglalasData
  })
  
} else{
  response.redirect(303,'./success');
}
  }
   
  @Get('success')
  @Render('success')
  showSuccess(){
    return{
      message:'Sikeres szállásfoglalás'
    }
  }
}
