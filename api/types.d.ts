declare namespace Express {
    export interface Request {
        user: {
            email:string,
            name:string,
            _id:string,
        }
    }
}