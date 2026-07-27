export interface IRegister {
  fullName: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ILogin {
  identifier: string;
  password: string;
}

export interface IActivation {
  code: string;
}

export interface IProfile {
  id?: number;
  email?: string;
  fullName?: string;
  isActive?: boolean;
  profilePicture?: string;
  role?: string;
  username?: string;
}

export interface IUpdatePassword {
  oldPassword: string;
  password: string;
  confirmPassword: string;
}