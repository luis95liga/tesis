export interface UserAccount {
  username: string;
  password: string;
}


export interface UserResponse extends UserAccount {
  message: string;
  refresh: string;
  token:   string;
  idcompany: number;
  idemployee: number;
  user:    User;
 }

 export interface User {
  id: number;
  email:     string;
  is_superuser: boolean;
  last_name: string;
  name:      string;
  username:  string;
 }


export interface Lagout {
  user: number;
}

export interface UserView {
  id: number;
  password: string;
  last_login: Date;
  is_superuser: boolean;
  username: string;
  email: string;
  name: string;
  last_name: string;
  image?: any;
  is_active: boolean;
  is_staff: boolean;
  groups: any[];
  user_permissions: any[];
}

export interface UserForm {
  password: string;
  last_login: string;
  is_superuser?: boolean;
  username: string;
  email: string;
  name: string;
  last_name: string;
  image?: any;
  is_active?: boolean;
  is_staff?: boolean;
  groups?: any[];
  user_permissions?: any[];
}
