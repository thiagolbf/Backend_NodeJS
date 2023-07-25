import { Column, Entity, PrimaryGeneratedColumn, Check } from "typeorm";

@Entity("movies")
class Movie {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ length: 50, unique: true })
  name: string;

  @Column({ type: "text", nullable: true })
  description?: string | undefined | null;

  @Column()
  @Check("duration > 0")
  duration: number;

  @Column()
  @Check("price > 0")
  price: number;
}

export default Movie;
