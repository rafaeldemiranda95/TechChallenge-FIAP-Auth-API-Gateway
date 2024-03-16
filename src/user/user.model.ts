

export class User {
    uid: string;
    email: string;
    firstName: string;
    lastName: string;
    createdAt: Date;

    constructor(uid: string, email: string, firstName: string, lastName: string) {
        this.uid = uid;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.createdAt = new Date();
    }
}
