import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateMovieTable1690244825314 implements MigrationInterface {
    name = 'CreateMovieTable1690244825314'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "movies" ("id" SERIAL NOT NULL, "name" character varying(50) NOT NULL, "description" text, "duration" integer NOT NULL, "price" integer NOT NULL, CONSTRAINT "UQ_3a794f850bd3e432c46b3faa913" UNIQUE ("name"), CONSTRAINT "CHK_3cc2a4a78ff1cbe7eb3a851eac" CHECK (duration > 0), CONSTRAINT "CHK_303709e1359b0fed6a7161d54d" CHECK (price > 0), CONSTRAINT "PK_c5b2c134e871bfd1c2fe7cc3705" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "movies"`);
    }

}
