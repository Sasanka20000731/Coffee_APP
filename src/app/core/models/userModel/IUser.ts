export interface IUserModel {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    contact: string;
    userLevelStr: string;
    userLevel: number;
    status: boolean;
    createDate: Date;
    dbo : Date;
  }
  