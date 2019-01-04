import { LambdaResponse, SuccessResponse, ServerErrorResponse } from "./models/SuccessResponse";
import { GoogleSheetsPersonRepository } from "./repository/GoogleSheetsPersonRepository";
import { PersonService } from "./services/PersonService";

const DEFAULT_PAGE_SIZE = 20;
const DEFAULT_PAGE_NUMBER = 1;

exports.handler = async (event: any) : Promise<LambdaResponse> => {
    if (event.body !== null && event.body !== undefined) {
        try {
            let personRepo = new GoogleSheetsPersonRepository(event.body.location, event.body.page_size || DEFAULT_PAGE_SIZE);
            let personSvc = new PersonService(personRepo);
            let personData = await personSvc.getPeople(event.body.page_number || DEFAULT_PAGE_NUMBER);
            return new SuccessResponse(personData);
        }
        catch (error) {
            console.log((<Error>error).message);
        }
    }
    return new ServerErrorResponse();
}