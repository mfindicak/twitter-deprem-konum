import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tweet } from 'src/twitter/entities/twitter.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: process.env.DBUSER,
      password: process.env.DBPASS,
      database: process.env.DB,
      entities: [Tweet],
      synchronize: true,
    }),
  ],
})
export class DBModule {}
