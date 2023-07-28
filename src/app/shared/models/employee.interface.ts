
export interface EmployeeList {
  idemployee: number;
  identificationcard: string;
  entry_date: string;
  names: string;
  photo: string;
  email: string;
  phone: string;
  cell: string;
  observations: string;
  salary: number;
  birth_date: string;
  address: string;
  location: string;
  position: string;
  period_payment: string;
}

export interface Employee {
  idemployee: number;
  identificationcard: string;
  names: string;
  lastnames: string;
  birth_date: string;
  photo?: string;
  address: string;
  email: string;
  phone: string;
  cell: string;
  observations: string;
  salary: string;
  entry_date: string;
  idlocation: number;
  idposition: number;
  idperiod_payment: number;
  idcompany: number;
}

export interface PeriodPayment {
  idperiod_payment: number;
  period: string;
}

export interface PositionType {
  idposition_type: number;
  job_type_name: string;
}

export interface Position {
  idposition: number;
  job_name: string;
  idposition_type: number;
}

export interface PositionList {
  idposition: number;
  job_name: string;
  position_type: number;
}

export interface DocumentEmployeeList {
  iddocument_person: number;
  issue_date: string;
  expiration_date: string;
  attachment: string;
  procedure_cost: number;
  observations: string;
  document_type: string;
  idemployee: string;
}


export interface DocumentEmployee {
  iddocument_employee : number;
  issue_date: string;
  expiration_date: string;
  attachment?: string;
  procedure_cost: string;
  observations: string;
  iddocument_type: number;
  idemployee: number;
}

export interface DocumentType {
  iddocument_type: number;
  name: string;
  description: string;
}

export interface isLogin {
  idislogin: number;
  islogin: boolean;
  idemployee: number;
  id: number;
}
