export class CustomError {

    name: string;
    details: string;

    constructor (name: string, details:string){
        this.name = name;
        this.details = details;
    }
    
}