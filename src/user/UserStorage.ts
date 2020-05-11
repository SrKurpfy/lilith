import {User} from "../entity/User";

export interface IUserStorage {
    clearCache();

    getById(id: number): User | undefined;
    getByDiscordId(discordId: string): User | undefined;

    getOrFetchById(id: number): Promise<User | undefined>;
    getOrFetchByDiscordId(discordId: string): Promise<User | undefined>;

    create(discordId: string, guildId: string) : Promise<User>;
    update(user : User) : Promise<User>;
}

export class UserStorage implements IUserStorage {

    private cache: User[] = [];

    getById(id: number): User | undefined {
        return this.cache.find(user => user.id == id);
    }

    getByDiscordId(discordId: string): User | undefined {
        return this.cache.find(user => user.discordId == discordId);
    }

    async getOrFetchByDiscordId(discordId: string): Promise<User | undefined> {
        let byDiscordId = this.getByDiscordId(discordId);

        if (byDiscordId == null) {
            const promise = User.findOne({discordId: discordId});

            byDiscordId = await promise;
            if (byDiscordId != null)
                this.cache.push(byDiscordId);
        }

        return byDiscordId;
    }

    async getOrFetchById(id: number): Promise<User | undefined> {
        let byId = this.getById(id);

        if (byId == null) {
            const promise = User.findOne({id: id});

            byId = await promise;
            if (byId != null)
                this.cache.push(byId);
        }

        return byId;
    }

    create(discordId: string, guildId: string) : Promise<User> {
        const user = new User();

        user.discordId = discordId;
        user.guildId = guildId;
        user.experience = 0;
        user.level = 1;

        return user.save();
    }

    update(user: User) :Promise<User> {
        return user.save();
    }

    clearCache() {
        this.cache = [];
    }
}