interface IUser {
   id?: number;
   fullName: string;
   username: string;
   email: string;
   password: string;
   role: string;
   profilePicture: string;
}

export type { IUser };