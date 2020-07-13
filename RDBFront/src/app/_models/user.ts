export class User {
    fullname: string;
    email: string;
    token: string;
    userrole: string;

    constructor(
        fullname: string,
        email: string,
        token: string,
        userrole: string){
            this.fullname = fullname;
            this.email = email;
            this.token = token;
            this.userrole = userrole;
    }
    


}