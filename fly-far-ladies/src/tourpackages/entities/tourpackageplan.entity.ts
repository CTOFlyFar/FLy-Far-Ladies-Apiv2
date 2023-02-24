import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class tourpackageplan {
  @PrimaryGeneratedColumn()
  Id: number;
  @Column({ type: 'text' })
  day1: string;
  @Column({ type: 'text' })
  day2: string;
  @Column({ type: 'text' })
  day3: string;
  @Column({ type: 'text' })
  day4: string;
  @Column({ type: 'text' })
  day5: string;
  @Column({ type: 'text' })
  day6: string;
  @Column({ type: 'text' })
  day7: string;
  @Column({ type: 'text' })
  day8: string;
  @Column({ type: 'text' })
  day9: string;
  @Column({ type: 'text' })
  day10: string;
  @Column({ type: 'text' })
  day11: string;
  @Column({ type: 'text' })
  day12: string;
  @Column({ type: 'text' })
  day13: string;
  @Column({ type: 'text' })
  day14: string;
  @Column({ type: 'text' })
  day15: string;
  @Column({ type: 'text' })
  day16: string;
  @Column({ type: 'text' })
  day17: string;
  @Column({ type: 'text' })
  day18: string;
  @Column({ type: 'text' })
  day19: string;
  @Column({ type: 'text' })
  day20: string;
}
