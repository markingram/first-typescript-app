import { Person } from '../models/Person';

export interface PersonRepository {
    getPeople(pageNumber: number): Promise<Person[]>;
}