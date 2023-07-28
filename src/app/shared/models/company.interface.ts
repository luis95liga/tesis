export interface Country {
  idcountry: number;
  initials: string;
  name: string;
}

export interface ProvinceList {
  idprovince: number;
  country: string;
  name: string;
}

export interface Province {
  idprovince: number;
  name: string;
  idcountry: number;
}

export interface LocationList {
  idlocation: number;
  location: string;
  state: boolean;
  province: string;
}

export interface Location {
  idlocation: number;
  location: string;
  latitude: number;
  longitude: number;
  state: boolean;
  idprovince: number;
}

export interface ListCompany {
  idcompany: number;
  name: string;
  type_company: string;
  logo: string;
  ruc: string;
  location: string;
  address: string;
  email: string;
  phone: string;
  tel_atcn_client: string;
  cell: string;
  default_load_type: number;
}

export interface Company {
  idcompany: number;
  name: string;
  logo?: any;
  ruc: string;
  address: string;
  email: string;
  phone: string;
  tel_atcn_client: string;
  cell: string;
  default_load_type: number;
  idtype_company: number;
  idlocation: number;
}

export interface TypeCompany {
  idtype_company: number;
  name: string;
  description: string;
}

export interface ListBankAccount {
  idbank_account: number;
  bank_name: string;
  account_number: string;
  default: boolean;
  company: string;
}

export interface BankAccount {
  idbank_account: number;
  bank_name: string;
  account_number: string;
  default: boolean;
  idcompany: number;
}

export interface DocumentList {
  iddocument: number
  type_document: string
  issue_date: string
  expiration_date: string
  attachment: string
  cost_procedure: number
  observations: string
  idcompany: number
}

export interface Document {
  iddocument: number;
  issue_date: string;
  expiration_date: string;
  attachment?: string;
  cost_procedure: string;
  observations: string;
  idtype_document: number;
  idcompany: number;
}

export interface DocumentType {
  iddocument_type: number;
  name: string;
  description: string;
}

export interface CompanyName {
  idcompany: number
  name: string
  logo: string
  type_company: string
  ruc: string
  location: string
  province: string
  country: string
  address: string
  email: string
  phone: string
  tel_atcn_client: string
  cell: string
  default_load_type: number
}
