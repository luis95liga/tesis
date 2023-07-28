export interface ClientList {
  idclient: number;
  identificationcard: string;
  entry_date: string;
  names: string;
  photo: string;
  email: string;
  phone: string;
  cell: string;
  observations: string;
  birth_date: string;
  address: string;
  destinations: string;
}

export interface Client {
  idclient: number;
  identificationcard: string;
  names: string;
  lastnames: string;
  birth_date: string;
  photo?: any;
  address: string;
  email: string;
  phone: string;
  cell: string;
  observations: string;
  entry_date: string;
  iddestinations: number;
  idcompany: number;
}
