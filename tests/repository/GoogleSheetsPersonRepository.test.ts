import { GoogleSheetsPersonRepository } from '../../src/repository/GoogleSheetsPersonRepository';

const url = 'https://sheets.googleapis.com/v4/spreadsheets/1obsISYj9zR4s-qFEfzTijYeiwiriWTGlIJj7IE3LYcg/values/';

test('data is returned from call', async () => {
    let repo = new GoogleSheetsPersonRepository(url, 20);
    let employees =  await repo.getPeople(1);
    expect(employees.length).toBe(3);
    //console.log(JSON.stringify(employees, null, 2));
});

test('first page of data works', async () => {
    let repo = new GoogleSheetsPersonRepository(url, 2);
    let employees = await repo.getPeople(1);
    expect(employees.length).toBe(2);
    //console.log(JSON.stringify(employees, null, 2));
})

test('second page of data works', async () => {
    let repo = new GoogleSheetsPersonRepository(url, 2);
    let employees = await repo.getPeople(2);
    expect(employees.length).toBe(1);
    //console.log(JSON.stringify(employees, null, 2));
})
