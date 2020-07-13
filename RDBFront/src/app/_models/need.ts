import { User } from './user';
import { Category } from './category';

export class Need {

    id: string;
    title: string;
    description: string;
    priority: string;
    category: Category;
    user: User;
    votes: number;
    isanonymous: boolean;
    creationdate: Date;
    lasmodifieddate: Date;

    constructor(id: string,
                title: string, 
                description: string, 
                priority: string,
                category: Category,
                user: User,
                isanonymous: boolean,
                creationDatetime: Date,
                modificationDatetime: Date,
                votes?: number
                ){
        this.id = id;
        this.title = title;
        this.description = description;
        this.priority = priority;
        this.user = user;
        this.category = category;
        this.isanonymous = isanonymous;
        this.creationdate = creationDatetime;
        this.lasmodifieddate = modificationDatetime;
        this.votes = votes || 0;

    }

}