export interface LoginDataProps {
  email: string;
  password: string;
}

export interface LoginFormDataProps extends LoginDataProps {
  remember_me: boolean;
}

export interface RegisterDataProps {
  email: string;
  password: string;
  passwordConfirm: string;
  name: string;
}

export interface UserRegisterData extends RegisterDataProps {
  verified?: boolean;
}
