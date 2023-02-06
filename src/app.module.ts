import { Module } from '@nestjs/common';
import { TodoModule } from './todo/todo.module';
import {TypeOrmModule} from "@nestjs/typeorm";

@Module({
  imports: [
      TypeOrmModule.forRoot({
          type: 'postgres',
          host: process.env.POSTGRES_HOST,
          port: +process.env.POSTGRES_PORT || 5432,
          username: 'postgres',
          password: 'postgres',
          database: process.env.POSTGRES_DB,
          entities: [__dirname + '/**/*.entity.ts', __dirname + '/**/*.entity.js'],
          migrationsRun: false,
          logging: true,
          migrationsTableName: "migration",
          migrations: [__dirname + '/migration/**/*.ts', __dirname + '/migration/**/*.js'],
          synchronize: false,
      }),
      TodoModule,
  ]
})
export class AppModule {}
