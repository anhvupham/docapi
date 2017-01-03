export class User {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  token: string;

  constructor(data?: any) {
    if (!data) return;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.username = data.username;
    this.password = data.password;
    this.token = data.token;
  }
}
