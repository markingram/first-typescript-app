import { HardcodedPersonRepository } from '../../src/repository/HardcodedPersonRepository'

test('data can be retrieved as expected', async () => {
    let employees = await new HardcodedPersonRepository().getPeople();
    expect(employees.length).toBe(2);
    expect(employees[0].displayName).toStrictEqual('Bart');
    expect(employees[1].firstName).toStrictEqual('Marjorie');
})