import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  constructor() {}
  @Get()
  create() {
    return "I'm working fine!";
  }
}
