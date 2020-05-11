import {User} from "../entity/User";
import {IUserStorage} from "./UserStorage";

let queue: number[] = [];

export function addToQueue(user: User) {
    if (!queue.includes(user.id))
        queue.push(user.id);
}

export function releaseQueue(storage: IUserStorage) {
    for (let id of queue) {
        const user = storage.getById(id);
        if (user == null) continue;

        storage.update(user).then(ignored => {});
    }

    storage.clearCache();
    queue = [];
}

export function startQueue(storage: IUserStorage) {
    setInterval(() => {
        if(queue.length == 0) return

        console.log(`[Lilith] Releasing queue and clearing cache`);
        releaseQueue(storage);
    }, 30000);
}
