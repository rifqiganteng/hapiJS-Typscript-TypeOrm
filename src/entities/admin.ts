import {Column, Entity} from "typeorm";


@Entity({name:"admin"})
export class AdminAccount {
    @Column({})
    username: string;
    password: string;
    firstName: string;
    lastName: string;
}