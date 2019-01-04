export class Person {
    constructor(readonly displayName: string,
        readonly firstName: string,
        readonly lastName: string,
        readonly nationality: string,
        readonly dateOfBirth: Date,
        readonly location: string,
        readonly department: string,
        readonly jobTitle: string,
        readonly startDate: Date, 
        readonly pictureUrl: URL | null,
        readonly bio: string) { }
}


type Person1 = {
    firstName: string,
    lastName: string,
    nationality: string,
    dateOfBirth: Date,
    location: string,
    department: string,
    jobTitle: string,
    startDate: Date, 
    pictureUrl: URL | null,
    bio: string,
}

interface Person3 {
    firstName: string,
    lastName: string,
    nationality: string,
    dateOfBirth: Date,
    location: string,
    department: string,
    jobTitle: string,
    startDate: Date, 
    pictureUrl: URL | null,
    bio: string
}



class P {}
type P2 = {}
interface P3 {}
let p1: P = new P();
let p2: P2 = {};
let p3: P3 = {}

console.log(p1);
console.log(p2);
console.log(p3);


type Alias = { num: number }
interface Interface {
    num: number;
}
declare function aliased(arg: Alias): Alias;
declare function interfaced(arg: Interface): Interface;