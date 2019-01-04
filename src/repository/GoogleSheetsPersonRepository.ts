import { PersonRepository } from './PersonRepository';
import { Person } from '../models/Person';
import request from 'superagent';

export class GoogleSheetsPersonRepository implements PersonRepository {
    constructor(private readonly location: string, private readonly pageSize: number) {
    }

    async getPeople(pageNumber: number) {
        let range = this.computeRange(pageNumber);

        let response = await request
            .get(this.location + range)
            .query({key: `AIzaSyAwek-VxjPcskVGAqBlEs1JBZhQqhm-ao0`}) // TODO client-specific? does this come from manifest?
            .timeout({response: 5000, deadline: 20000}) // Timeout set to 5 seconds, with 20 seconds to complete response buffering
            .retry(2);  // Retry API call twice on inital failure (total 3 attempts)
        
        if (!response.ok) {
            let errMsg = `Response from Google Sheets API not OK. Status is ${response.status}. Body is ${response.body}.`;
            console.error(errMsg);
            throw new Error(errMsg);
        }

        let responseObj: GoogleSheetsData = response.body;
        
        // this only works on first page
        if (pageNumber === 1) {
            if (!this.isExpectedColumnHeaders(responseObj.values[0])) {
                throw new Error(`Google Sheet headers are not as expected. Check logs for more info.`);
            }
            responseObj.values.shift(); // column headers validated so remove the header row
        }

        // Now assumptions validated, build Employees
        let employees: Person[] = [];

        for (let i = 0; i < responseObj.values.length; i++) {
            let e = new Person(
                responseObj.values[i][ColumnHeaders.DisplayName],
                responseObj.values[i][ColumnHeaders.FirstName],
                responseObj.values[i][ColumnHeaders.LastName],
                responseObj.values[i][ColumnHeaders.Nationality],
                new Date(responseObj.values[i][ColumnHeaders.DOB]),
                responseObj.values[i][ColumnHeaders.Office],
                responseObj.values[i][ColumnHeaders.Department],
                responseObj.values[i][ColumnHeaders.JobTitle],
                new Date(responseObj.values[i][ColumnHeaders.StartDate]),
                responseObj.values[i][ColumnHeaders.Picture] ? new URL(responseObj.values[i][ColumnHeaders.Picture]) : null,
                responseObj.values[i][ColumnHeaders.Bio]
            );
            employees.push(e);
        }

        return employees;
    }

    private computeRange(pageNumber: number) {
        let lastRowNumber: number = (pageNumber * this.pageSize) + 1;
        let firstRowNumber: number = (lastRowNumber - this.pageSize) + 1;
        if (pageNumber === 1) firstRowNumber--; // include header row on first page
        return `Sheet1!A${firstRowNumber}:K${lastRowNumber}`;
    }

    private isExpectedColumnHeaders(columnHeaders: string[]) {
        return this.isMatch(columnHeaders[0], 'Display Name')
            && this.isMatch(columnHeaders[1], 'First Name')
            && this.isMatch(columnHeaders[2], 'Last Name')
            && this.isMatch(columnHeaders[3], 'Nationality')
            && this.isMatch(columnHeaders[4], 'DOB')
            && this.isMatch(columnHeaders[5], 'Office')
            && this.isMatch(columnHeaders[6], 'Department')
            && this.isMatch(columnHeaders[7], 'Job Title')
            && this.isMatch(columnHeaders[8], 'Start Date')
            && this.isMatch(columnHeaders[9], 'Picture')
            && this.isMatch(columnHeaders[10], 'Bio');
    }

    private isMatch = (responseValue: string, expectedValue: string) => {
        if (responseValue !== expectedValue) {
            console.error(`Expected ${expectedValue} from Google Sheets but received ${responseValue}.`);
            return false;
        }
        return true;
    }
}

enum ColumnHeaders {
    DisplayName,
    FirstName,
    LastName,
    Nationality,
    DOB,
    Office,
    Department,
    JobTitle,
    StartDate,
    Picture,
    Bio
}

interface GoogleSheetsData {
    range: string;
    majorDimension: string;
    values: Array<Array<string>>;
}