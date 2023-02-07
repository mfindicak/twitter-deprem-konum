import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity()
export class Tweet {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  tweetId: string;

  @Column({ nullable: true })
  userId: string;

  @Column()
  tweet: string;

  @Column({ type: 'double precision' })
  lat: number;

  @Column({ type: 'double precision' })
  lng: number;

  @Column({ nullable: true })
  tweetDate: Date;

  @CreateDateColumn()
  createdDate: Date;
}
