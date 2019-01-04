import { Employee } from '../../src/models/Employee';

test('Created Employee serialises as expected', () => {
    let displayName = 'Mark Ingram';
    let firstName = 'Mark';
    let lastName = 'Ingram';
    let nationality = 'Northern Irish';
    let dateOfBirth = new Date('1984-12-25');
    let location = 'Belfast';
    let department = 'Product Development';
    let jobTitle = 'Software Engineer';
    let startDate = new Date('2018-12-17');
    let pictureUrl = new URL('https://goo.gl/images/UVtZy7');
    let bio = 'I like words';
    
    let e = new Employee(
        displayName, firstName, lastName, nationality,
        dateOfBirth, location, department, jobTitle,
        startDate, pictureUrl, bio
    );
    
    expect(JSON.stringify(e)).toBeTruthy();
})