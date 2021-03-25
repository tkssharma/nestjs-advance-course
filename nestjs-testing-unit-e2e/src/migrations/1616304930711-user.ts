import {MigrationInterface, QueryRunner} from "typeorm";

export class user1616304930711 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(
        `CREATE TABLE "user" (
          id SERIAL PRIMARY KEY,
          email character varying NOT NULL UNIQUE,
          password character varying NOT NULL,
          "createdAt" timestamp without time zone NOT NULL DEFAULT now(),
          "updatedAt" timestamp without time zone NOT NULL DEFAULT now()
      );`
      )
      await queryRunner.query(
        `CREATE UNIQUE INDEX "PK_cace4a159ff9f2512dd42373760" ON "user"(id int4_ops);
         CREATE UNIQUE INDEX "UQ_78a916df40e02a9deb1c4b75edb" ON "user"(email text_ops);`
      )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.query(`DROP table user`);
    }

}
