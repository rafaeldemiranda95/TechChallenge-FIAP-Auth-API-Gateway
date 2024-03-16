

export class User {
    uid: string; // Identificador único do usuário, por exemplo, um UUID ou ID do Google
    email: string; // E-mail do usuário
    firstName: string; // Primeiro nome do usuário
    lastName: string; // Sobrenome do usuário
    createdAt: Date; // Data de criação do registro do usuário

    constructor(uid: string, email: string, firstName: string, lastName: string) {
        this.uid = uid;
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.createdAt = new Date();
    }
}
