export interface CellarsList {
  idcellars: number;
  cellar: string;
  state: boolean;
  province: string;
}

export interface Cellars {
  idcellars: number;
  cellar: string;
  latitude: number;
  longitude: number;
  state: boolean;
  idprovince: number;
}

export interface DestinationsList {
  iddestinations: number;
  destinations: string;
  state: boolean;
  province: string;
}

export interface Destinations {
  iddestinations: number;
  destinations: string;
  latitude: number;
  longitude: number;
  state: boolean;
  idprovince: number;
}

export interface Tabulation {
  idtabulation: number;
  km: number;
  hours: number;
  idlocation: number;
  iddestinations: number;
  idcompany: number;
}

export interface TabulationList {
  idtabulation: number;
  location: string;
  destinations: string;
  km: number;
  hours: number;
  idcompany: number;
}

export interface Bill {
  idbill: number;
  amount: string;
  idconcepts: number;
  idcompany: number;
  idtabulation: number;
}

export interface BillList {
  idbill: number;
  concepts: string;
  amount: number;
  idcompany: number;
  idtabulation: number;
}

export interface Concepts {
  idconcepts: number;
  concepts: string;
}

export interface BillTabulation {
  concepts: string;
  amount: number;
  idcompany: number;
}
