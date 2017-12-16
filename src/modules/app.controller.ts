import { Get, Controller } from "@nestjs/common";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { User } from "./../entity/user.entity";

@Controller()
export class AppController {
  @Get()
  async root(): Promise<string> {
    return "Hello world!"
  }
}
