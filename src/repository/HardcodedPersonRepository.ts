import { PersonRepository } from "./PersonRepository";
import { Person } from "../models/Person";

export class HardcodedPersonRepository implements PersonRepository {
    async getPeople() {
        let e1 = new Person(
            'Bart', 'Bart', 'Simpson', 'American', new Date('1990-01-31'),
            'Springfield', 'Child', 'Pervayor of Mischief',
            new Date('2018-12-17'), new URL('https://goo.gl/images/ui63Ni'),
            'Do the Bartman!'
        );
        let e2 = new Person(
            'Marge', 'Marjorie', 'Simpson', 'American',
            new Date('1982-05-27'), 'Springfield', 'Parents',
            'Housewife', new Date('2000-01-01'),
            new URL('https://goo.gl/images/imRkoq'), 'BAAARRRRT!'
        );
        
        return Promise.resolve([e1, e2]);
    }
}