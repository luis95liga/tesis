export interface Report {
  Vehicle: string
  vehicle_use: string
  employee: string
  Trailer: string
  origen: string[]
  destinations: string[]
  client: string[]
  kms: string
  kmsdes: number
  datestart: string
  dateend: string
  hours: number
  subtotal: string
  percentage: number
  total: string
  profitability: string
  fixedcost: Fixedcost
  maintenamcecost: Maintenamcecost
  extracost: Extracost
}

export interface Fixedcost {
  salaryA: number
  salary: number
  salaryKm: number
  garageA: number
  garage: number
  garageKm: number
  registrationA: number
  registration: number
  registrationKm: number
  sureA: number
  sure: number
  sureKm: number
  revisionA: number
  revision: number
  revisionKm: number
  billsA: number
  bills: number
  billsKm: number
  servicesA: number
  services: number
  servicesKm: number
  costsA: number
  costs: number
  costsKm: number
  depreciationsA: number
  depreciations: number
  depreciationsKm: number
  permissionsA: number
  permissions: number
  permissionsKm: number
  gpsA: number
  gps: number
  gpsKm: number
  policiesA: number
  policies: number
  policiesKm: number
  total: number
}

export interface Maintenamcecost {
  tirealignmentA: number
  ordinarymaintenanceA: number
  electricsystemA: number
  brakingsystemA: number
  suspensionA: number
  transmissionsystemA: number
  enginerepairA: number
  tirealignment: number
  ordinarymaintenance: number
  electricsystem: number
  brakingsystem: number
  suspension: number
  transmissionsystem: number
  enginerepair: number
  tirealignmentKm: number
  ordinarymaintenanceKm: number
  electricsystemKm: number
  brakingsystemKm: number
  suspensionKm: number
  transmissionsystemKm: number
  enginerepairKm: number
  total: string
}

export interface Extracost {
  dieselCostv: number
  dieselKmv: number
  dieselCantv: number
  dieselCostKm: number
  tollCostv: number
  tollKmv: number
  tollCantv: number
  tollCostKm: number
  viaticCostv: number
  viaticKmv: number
  viaticCantv: number
  viaticCostKm: number
  weightsScaleCostv: number
  weightsScaleKmv: number
  weightsScaleCantv: number
  weightsScaleCostKm: number
  loadDownloadCostv: number
  loadDownloadKmv: number
  loadDownloadCantv: number
  loadDownloadCostKm: number
  caravanCostv: number
  caravanKmv: number
  caravanCantv: number
  caravanCostKm: number
  total: number
}

export interface ReportGuide {
  datestart: string
  guia: number
  rute: string
  vehicle_use: string
  location: string
  client: string
  bill: Bill[]
  totalbill: number
  Vehicle: string
  employee: string
  Trailer: string
  destinations: string
  dateend: string
  hours: string
}

export interface Bill {
  idbill: number
  concepts: string
  amount: number
  idcompany: number
  idtabulation: number
}
