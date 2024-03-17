

export class User {
    uid: string;
    email: string;
    firstName: string;
    lastName: string;
    createdAt: Date;
    address: string;
    cellphoneNumber: string;

    constructor(
        uid: string,
        email: string,
        firstName: string, lastName: string,
        address: string,
        cellphoneNumber: string) {
        this.uid = uid;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.createdAt = new Date();
        this.address = address;
        this.cellphoneNumber = cellphoneNumber;
    }
}
