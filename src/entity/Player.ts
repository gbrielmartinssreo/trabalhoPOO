import { Entity, PrimaryColumn, Column, OneToMany } from "typeorm";
import { License } from "./License";


@Entity()
export class Player {
  @PrimaryColumn()
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column({ type: "decimal", precision: 10, scale: 2, default: 0 })
  balance: number;

  @OneToMany(() => License, (license) => license.player, { cascade: ["remove"] })   
  licenses: License[];

  constructor(email?: string, name?: string, password?: string, balance?: number, licenses?:License[]) {
    this.email = email;
    this.name = name;
    this.password = password;
    this.balance = balance || 0;
    this.licenses = licenses;
  }
}

