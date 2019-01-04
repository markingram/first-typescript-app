import { PersonRepository } from "../repository/PersonRepository";

// TODO is this service layer needed?
export class PersonService {
    constructor(private repository: PersonRepository) {

    }

    async getPeople(pageNumber = 1) {
        return this.repository.getPeople(pageNumber);
    }
}