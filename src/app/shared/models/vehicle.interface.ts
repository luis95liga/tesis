export interface OwnerList {
  idowner: number;
  name: string;
  company: string;
}

export interface Owner {
  idowner: number;
  name: string;
  idcompany: number;
}

export interface VehicleUse {
  idvehicle_use: number;
  vehicle_use: string;
  category: string;
  apply_in: string;
}

export interface Manufacturer {
  idmanufacturer: number;
  name: string;
  model_types: string;
}

export interface VehicleType {
  idvehicle_type: number;
  name: string;
  depends_other_vehicle: boolean;
}

export interface Fuel {
  idfuel: number;
  type_fuel: string;
  performance: string;
}

export interface TechnicalDataList {
  idtechnical_data: number;
  load_capacity: number;
  color: string;
  mileage: number;
  fuel: string;
  hours_use: string;
  tank_capacity: number;
  yield_gallon: number;
  observation: string;
  year: string;
  idgps: number;
}

export interface TechnicalData {
  idtechnical_data: number;
  load_capacity: number;
  color: string;
  mileage: number;
  hours_use: string;
  tank_capacity: number;
  yield_gallon: number;
  observation: string;
  year: string;
  idgps: number;
  idfuel: number;
}

export interface VehicleModels {
  idvehicle_model: number;
  manufacturer: string;
  model: string;
  year: string;
  vehicle_type: string;
  kind: string;
  fuel: string;
  axis: string;
}

export interface VehicleModel {
  idvehicle_model: number;
  model: string;
  year: string;
  kind: string;
  idmanufacturer: number;
  idvehicle_type: number;
  idfuel: number;
  idaxis: number;
}

export interface Axis {
  idaxis: number;
  name: string;
  number_axes: string;
  diagram?: any;
}

export interface VehicleList {
  idvehicle: number;
  owner: string;
  vehicle_model: string;
  idemployee: number;
  employee: string;
  vehicle_use: string;
  agination_date: string;
  tuition: string;
  engine_series: string;
  state: boolean;
  idtechnical_data: number;
}

export interface Vehicle {
  idvehicle: number;
  agination_date: string;
  image?: any;
  tuition: string;
  engine_series: string;
  state: boolean;
  idowner: number;
  idvehicle_model: number;
  idemployee: number;
  idvehicle_use: number;
  idtechnical_data: number;
}

export interface VehicleCreate {
  idvehicle: number;
  agination_date: string;
  image?: any;
  tuition: string;
  engine_series: string;
  state: boolean;
  idowner: number;
  idvehicle_model: number;
  idemployee: number;
  idvehicle_use: number;
  load_capacity: number;
  color: string;
  mileage: number;
  fuel: string;
  idadministrative_data: number;
  idgps: number;
}

export interface TrailerCreate {
  load_capacity: number;
  color: string;
  hours_use: number;
  observation: string;
  idadministrative_data: number;
  image: any;
  tuition: string;
  state: boolean;
  idowner: number;
  idvehicle_model: number;
  idvehicle_use: number;
}

export interface Trailer {
  idtrailer: number;
  image: any;
  tuition: string;
  state: boolean;
  idowner: number;
  idvehicle_model: number;
  idvehicle_use: number;
  idtechnical_datatrailer: number;
}

export interface TrailerList {
  idtrailer: number;
  owner: string;
  vehicle_model: string;
  vehicle_use: string;
  tuition: string;
  state: boolean;
  idtechnical_datatrailer: number;
}

export interface TechnicalDataTrailer {
  idtechnical_datatrailer: number;
  load_capacity: number;
  color: string;
  hours_use: number;
  observation: string;
  idadministrative_data: number;
}

export interface GeneralData {
  idgeneraldata: number;
  adminexpensesmonth: number;
  basicservicesmonth: number;
  garage: number;
  nkmmonth: number;
  ntravelkmmonth: number;
  permitsqualifications: number;
  vehiclevalue: number;
  idvehicle: number;
}

export interface MaintenamceCosts {
  idmaintenamceCosts: number;
  acCu: number;
  acDkm: number;
  acQ: number;
  acCkm: number;
  accessoriesCkm: number;
  accessoriesCu: number;
  accessoriesDkm: number;
  accessoriesQ: number;
  addressCkm: number;
  addressCu: number;
  addressDkm: number;
  addressQ: number;
  adjustmentscalibrationsCkm: number;
  adjustmentscalibrationsCu: number;
  adjustmentscalibrationsDkm: number;
  adjustmentscalibrationsQ: number;
  airfiltersCkm: number;
  airfiltersCu: number;
  airfiltersDkm: number;
  airfiltersQ: number;
  airpurifierCkm: number;
  airpurifierCu: number;
  airpurifierDkm: number;
  airpurifierQ: number;
  alignmentCkm: number;
  alignmentCu: number;
  alignmentDkm: number;
  alignmentQ: number;
  alternatorCkm: number;
  alternatorCu: number;
  alternatorDkm: number;
  alternatorQ: number;
  batteriesCkm: number;
  batteriesCu: number;
  batteriesDkm: number;
  batteriesQ: number;
  boxCkm: number;
  boxCu: number;
  boxDkm: number;
  boxQ: number;
  cardanCkm: number;
  cardanCu: number;
  cardanDkm: number;
  cardanQ: number;
  casetransmissionoilCkm: number;
  casetransmissionoilCu: number;
  casetransmissionoilDkm: number;
  casetransmissionoilQ: number;
  cleaningCkm: number;
  cleaningCu: number;
  cleaningDkm: number;
  cleaningQ: number;
  clutchclutchCkm: number;
  clutchclutchCu: number;
  clutchclutchDkm: number;
  clutchclutchQ: number;
  coolingCkm: number;
  coolingCu: number;
  coolingDkm: number;
  coolingQ: number;
  dragtiresCkm: number;
  dragtiresCu: number;
  dragtiresDkm: number;
  dragtiresQ: number;
  drivetiresCkm: number;
  drivetiresCu: number;
  drivetiresDkm: number;
  drivetiresQ: number;
  drumsCkm: number;
  drumsCu: number;
  drumsDkm: number;
  drumsQ: number;
  electronicsystemCkm: number;
  electronicsystemCu: number;
  electronicsystemDkm: number;
  electronicsystemQ: number;
  engineoverhaulCkm: number;
  engineoverhaulCu: number;
  engineoverhaulDkm: number;
  engineoverhaulQ: number;
  exhaustsystemCkm: number;
  exhaustsystemCu: number;
  exhaustsystemDkm: number;
  exhaustsystemQ: number;
  frontloadaxleCkm: number;
  frontloadaxleCu: number;
  frontloadaxleDkm: number;
  frontloadaxleQ: number;
  fronttiresCkm: number;
  fronttiresCu: number;
  fronttiresDkm: number;
  fronttiresQ: number;
  fuelpumpCkm: number;
  fuelpumpCu: number;
  fuelpumpDkm: number;
  fuelpumpQ: number;
  glassesandcleaningsystemCkm: number;
  glassesandcleaningsystemCu: number;
  glassesandcleaningsystemDkm: number;
  glassesandcleaningsystemQ: number;
  intonationtuningCkm: number;
  intonationtuningCu: number;
  intonationtuningDkm: number;
  intonationtuningQ: number;
  lightsCkm: number;
  lightsCu: number;
  lightsDkm: number;
  lightsQ: number;
  lubricantsfluidsCkm: number;
  lubricantsfluidsCu: number;
  lubricantsfluidsDkm: number;
  lubricantsfluidsQ: number;
  majorrepairCkm: number;
  majorrepairCu: number;
  majorrepairDkm: number;
  majorrepairQ: number;
  minorrepairCkm: number;
  minorrepairCu: number;
  minorrepairDkm: number;
  minorrepairQ: number;
  oilchangeCkm: number;
  oilchangeCu: number;
  oilchangeDkm: number;
  oilchangeQ: number;
  oilsystemCkm: number;
  oilsystemCu: number;
  oilsystemDkm: number;
  oilsystemQ: number;
  pinCkm: number;
  pinCu: number;
  pinDkm: number;
  pinQ: number;
  pressuregaugesCkm: number;
  pressuregaugesCu: number;
  pressuregaugesDkm: number;
  pressuregaugesQ: number;
  puncturesanddamageCkm: number;
  puncturesanddamageCu: number;
  puncturesanddamageDkm: number;
  puncturesanddamageQ: number;
  radiatorCkm: number;
  radiatorCu: number;
  radiatorDkm: number;
  radiatorQ: number;
  rearloadaxleCkm: number;
  rearloadaxleCu: number;
  rearloadaxleDkm: number;
  rearloadaxleQ: number;
  rubberCkm: number;
  rubberCu: number;
  rubberDkm: number;
  rubberQ: number;
  sealsCkm: number;
  sealsCu: number;
  sealsDkm: number;
  sealsQ: number;
  springsleafspringsCkm: number;
  springsleafspringsCu: number;
  springsleafspringsDkm: number;
  springsleafspringsQ: number;
  startingmotorCkm: number;
  startingmotorCu: number;
  startingmotorDkm: number;
  startingmotorQ: number;
  swingingCkm: number;
  swingingCu: number;
  swingingDkm: number;
  swingingQ: number;
  total: number;
  transmissiondifferentialCkm: number;
  transmissiondifferentialCu: number;
  transmissiondifferentialDkm: number;
  transmissiondifferentialQ: number;
  turboCkm: number;
  turboCu: number;
  turboDkm: number;
  turboQ: number;
  waterpumpCkm: number;
  waterpumpCu: number;
  waterpumpDkm: number;
  waterpumpQ: number;
  wheelsCkm: number;
  wheelsCu: number;
  wheelsDkm: number;
  wheelsQ: number;
  idvehicle: number;
}

export interface DocumentList {
  iddocument_vehicle: number
  issue_date: string;
  expiration_date: string;
  attachment: string;
  procedure_cost: number
  observations: string;
  document_type: string;
  idvehicle: number
}

export interface Document {
  iddocument_vehicle: number
  issue_date: string;
  expiration_date: string;
  attachment: any
  procedure_cost: string;
  observations: string;
  iddocument_type: number
  idvehicle: number
}

export interface DocumentType {
  iddocument_type: number;
  name: string;
  description: string;
}

export interface AssignTrailer {
  idassigntrailer: number;
  dateassign: string;
  observations: string;
  idvehicle: number;
  idtrailer: number;
}

export interface FixedCosts {
  idfixedcosts: number;
  andeanPolicy: number;
  financialCosts: number;
  insurance: number;
  satelliteTracking: number;
  technicalReviews: number;
  vehicleRegistration: number;
  idvehicle: number;
}
