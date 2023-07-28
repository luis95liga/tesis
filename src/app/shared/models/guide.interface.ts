export interface GuideList {
  idguide: number;
  km: number;
  hours: number;
  status: boolean;
  client: string;
  company: string;
  idlocation: number;
  location: string;
  iddestinations: number;
  destinations: string;
  idvehicle: number;
  iduser: number;
}

export interface Guide {
  idguide: number;
  km: number;
  hours: number;
  status: boolean;
  idclient: number;
  idcompany: number;
  name: string;
  idlocation: number;
  iddestinations: number;
  idvehicle: number;
  iduser: number;
}

export interface TravelList {
  idtravel: number;
  hours: number;
  kms: number;
  total: number;
  idtrailer: number;
  idvehicle: number;
}

export interface Travel {
  idtravel?: number;
  datestart: string;
  dateend: string;
  dif: string;
  feeding: string;
  hours: number;
  kms: string;
  kmsdes: number;
  ltes: string;
  ltgas: number;
  percentage: number;
  performance: string;
  profitability: string;
  salary: string;
  subtotal: string;
  tank: string;
  total: string;
  observations: string;
  idtrailer: number;
  idvehicle: number;
  guide: number[];
}

export interface GuideLocationLongitude {
  origin: Origin[];
  destination: Destination[];
}

export interface Origin {
  lat: number;
  lng: number;
}

export interface Destination {
  location: Location;
}

export interface Location {
  lat: number;
  lng: number;
}

export interface Unit {
  idunit: number;
  unit: string;
}

export interface InvoiceType {
  idinvoicetype: number;
  invoicetype: string;
}

export interface GuideContentDetail {
  idguidecontentdetail: number;
  idguidecontent: number;
  description: string;
  unit: string;
  amount: number;
}

export interface GuideContentDetailTmp {
  idguidecontentdetailtmp: number;
  idguide: number;
  idemployee: number;
  description: string;
  unit: string;
  amount: number;
}


export interface GuideContentList {
  idguidecontent: number;
  idguide: number;
  invoicetype: string;
  authorizacionno: string;
  receiptno: string;
  customsdeclarationnumber: string;
  reasonfortransfer: string;
}

export interface GuideContent {
  idguidecontent: number;
  authorizacionno: string;
  receiptno: string;
  customsdeclarationnumber: string;
  reasonfortransfer: string;
  idguide: number;
  idinvoicetype: number;
}

export interface GuideListView {
  idguide: number;
  km: number;
  hours: number;
  status: boolean;
  client: string;
  identificationcard: string;
  company: string;
  ruc: string;
  idcompany: number;
  location: string;
  destinations: string;
  idvehicle: number;
  tuition: string;
}

