
import { IUserModel } from "./IUser";

export class UserModel implements IUserModel {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    contact: string;
    userLevelStr : string;
    userLevel: number;
    status: boolean;
    createDate: Date;
    dbo: Date;
    userName :string;
    constructor(
        id: number,
        firstName: string,
        lastName: string,
        email: string,
        contact: string,
        userLevelStr :string,
        userLevel: number,
        status: boolean,
        createDate: Date,
        dbo :Date,
        userName :string, 
    ) {
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.contact = contact;
        this.userLevelStr = userLevelStr;
        this.userLevel = userLevel;
        this.status = status;
        this.createDate = createDate;
        this.dbo = dbo;
        this.userName = userName;
    }

    // You can add additional methods if necessary
}
