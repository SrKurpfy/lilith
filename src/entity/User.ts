import {Entity, PrimaryGeneratedColumn, Column, BaseEntity} from "typeorm";

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column("char", { length: 18})
    discordId: string;

    @Column("char", { length: 18} )
    guildId: string;

    @Column("double")
    experience: number;

    @Column("double")
    level: number;

    required() {
        return 300 * this.level
    }


    toUpgrade() : number {
        let currentExperience = this.experience;
        let currentRequired = this.required();

        let level = 0;

        while (currentExperience >= currentRequired) {
            level++;
            this.experience = currentExperience - currentRequired;

            currentExperience = this.experience;
            currentRequired = this.required();
        }

        return level;
    }
}
