import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CatalogueService } from '@app/pages/displaypanel/services/vehicle/catalogue.service';
import { MaintenamceCosts } from '@app/shared/models/vehicle.interface';
import { ToastrService } from 'ngx-toastr';

enum Action {
  EDIT = 'edit',
  NEW = 'new',
}

@Component({
  selector: 'app-maintenancecosts',
  templateUrl: './maintenancecosts.component.html',
  styleUrls: ['./maintenancecosts.component.scss']
})
export class MaintenancecostsComponent implements OnInit {
  actionTODO = Action.NEW;
  maintenancecostsform: any;
  message: any;
  idvehicle: any;
  idmaintenancecosts: number = 0;
  m: any;
  ok: boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private catalogueSvc:CatalogueService,
    private toastr: ToastrService,
    private dialogRef: MatDialogRef<MaintenancecostsComponent>
  ) {}

  MaintenanceCostsForm(): void {
    this.maintenancecostsform = this.fb.group({
      fronttiresCu: [, [ Validators.required,Validators.min(0)]],
      drivetiresCu: [, [ Validators.required,Validators.min(0)]],
      dragtiresCu: [, [ Validators.required,Validators.min(0)]],
      wheelsCu: [, [ Validators.required,Validators.min(0)]],
      puncturesanddamageCu: [, [ Validators.required,Validators.min(0)]],
      alignmentCu: [, [ Validators.required,Validators.min(0)]],
      swingingCu: [, [ Validators.required,Validators.min(0)]],
      fronttiresDkm: [, [ Validators.required,Validators.min(0)]],
      drivetiresDkm: [, [ Validators.required,Validators.min(0)]],
      dragtiresDkm: [, [ Validators.required,Validators.min(0)]],
      wheelsDkm: [, [ Validators.required,Validators.min(0)]],
      puncturesanddamageDkm: [, [ Validators.required,Validators.min(0)]],
      alignmentDkm: [, [ Validators.required,Validators.min(0)]],
      swingingDkm: [, [ Validators.required,Validators.min(0)]],
      fronttiresQ: [, [ Validators.required,Validators.min(0)]],
      drivetiresQ: [, [ Validators.required,Validators.min(0)]],
      dragtiresQ: [, [ Validators.required,Validators.min(0)]],
      wheelsQ: [, [ Validators.required,Validators.min(0)]],
      puncturesanddamageQ: [, [ Validators.required,Validators.min(0)]],
      alignmentQ: [, [ Validators.required,Validators.min(0)]],
      swingingQ: [, [ Validators.required,Validators.min(0)]],
      fronttiresCkm: [, [ Validators.required,Validators.min(0)]],
      drivetiresCkm: [, [ Validators.required,Validators.min(0)]],
      dragtiresCkm: [, [ Validators.required,Validators.min(0)]],
      wheelsCkm: [, [ Validators.required,Validators.min(0)]],
      puncturesanddamageCkm: [, [ Validators.required,Validators.min(0)]],
      alignmentCkm: [, [ Validators.required,Validators.min(0)]],
      swingingCkm: [, [ Validators.required,Validators.min(0)]],
      oilchangeCu: [, [ Validators.required,Validators.min(0)]],
      casetransmissionoilCu: [, [ Validators.required,Validators.min(0)]],
      airfiltersCu: [, [ Validators.required,Validators.min(0)]],
      lubricantsfluidsCu: [, [ Validators.required,Validators.min(0)]],
      cleaningCu: [, [ Validators.required,Validators.min(0)]],
      oilchangeDkm: [, [ Validators.required,Validators.min(0)]],
      casetransmissionoilDkm: [, [ Validators.required,Validators.min(0)]],
      airfiltersDkm: [, [ Validators.required,Validators.min(0)]],
      lubricantsfluidsDkm: [, [ Validators.required,Validators.min(0)]],
      cleaningDkm: [, [ Validators.required,Validators.min(0)]],
      oilchangeQ: [, [ Validators.required,Validators.min(0)]],
      casetransmissionoilQ: [, [ Validators.required,Validators.min(0)]],
      airfiltersQ: [, [ Validators.required,Validators.min(0)]],
      lubricantsfluidsQ: [, [ Validators.required,Validators.min(0)]],
      cleaningQ: [, [ Validators.required,Validators.min(0)]],
      oilchangeCkm: [, [ Validators.required,Validators.min(0)]],
      casetransmissionoilCkm: [, [ Validators.required,Validators.min(0)]],
      airfiltersCkm: [, [ Validators.required,Validators.min(0)]],
      lubricantsfluidsCkm: [, [ Validators.required,Validators.min(0)]],
      cleaningCkm: [, [ Validators.required,Validators.min(0)]],
      acCu: [, [ Validators.required,Validators.min(0)]],
      pressuregaugesCu: [, [ Validators.required,Validators.min(0)]],
      glassesandcleaningsystemCu: [, [ Validators.required,Validators.min(0)]],
      lightsCu: [, [ Validators.required,Validators.min(0)]],
      accessoriesCu: [, [ Validators.required,Validators.min(0)]],
      startingmotorCu: [, [ Validators.required,Validators.min(0)]],
      alternatorCu: [, [ Validators.required,Validators.min(0)]],
      batteriesCu: [, [ Validators.required,Validators.min(0)]],
      minorrepairCu: [, [ Validators.required,Validators.min(0)]],
      majorrepairCu: [, [ Validators.required,Validators.min(0)]],
      adjustmentscalibrationsCu: [, [ Validators.required,Validators.min(0)]],
      drumsCu: [, [ Validators.required,Validators.min(0)]],
      sealsCu: [, [ Validators.required,Validators.min(0)]],
      springsleafspringsCu: [, [ Validators.required,Validators.min(0)]],
      rubberCu: [, [ Validators.required,Validators.min(0)]],
      addressCu: [, [ Validators.required,Validators.min(0)]],
      pinCu: [, [ Validators.required,Validators.min(0)]],
      clutchclutchCu: [, [ Validators.required,Validators.min(0)]],
      transmissiondifferentialCu: [, [ Validators.required,Validators.min(0)]],
      boxCu: [, [ Validators.required,Validators.min(0)]],
      cardanCu: [, [ Validators.required,Validators.min(0)]],
      frontloadaxleCu: [, [ Validators.required,Validators.min(0)]],
      rearloadaxleCu: [, [ Validators.required,Validators.min(0)]],
      acDkm: [, [ Validators.required,Validators.min(0)]],
      pressuregaugesDkm:[, [ Validators.required,Validators.min(0)]],
      glassesandcleaningsystemDkm: [, [ Validators.required,Validators.min(0)]],
      lightsDkm: [, [ Validators.required,Validators.min(0)]],
      accessoriesDkm: [, [ Validators.required,Validators.min(0)]],
      startingmotorDkm: [, [ Validators.required,Validators.min(0)]],
      alternatorDkm: [, [ Validators.required,Validators.min(0)]],
      batteriesDkm: [, [ Validators.required,Validators.min(0)]],
      minorrepairDkm: [, [ Validators.required,Validators.min(0)]],
      majorrepairDkm: [, [ Validators.required,Validators.min(0)]],
      adjustmentscalibrationsDkm: [, [ Validators.required,Validators.min(0)]],
      drumsDkm: [, [ Validators.required,Validators.min(0)]],
      sealsDkm: [, [ Validators.required,Validators.min(0)]],
      springsleafspringsDkm: [, [ Validators.required,Validators.min(0)]],
      rubberDkm: [, [ Validators.required,Validators.min(0)]],
      addressDkm: [, [ Validators.required,Validators.min(0)]],
      pinDkm: [, [ Validators.required,Validators.min(0)]],
      clutchclutchDkm: [, [ Validators.required,Validators.min(0)]],
      transmissiondifferentialDkm: [, [ Validators.required,Validators.min(0)]],
      boxDkm: [, [ Validators.required,Validators.min(0)]],
      cardanDkm: [, [ Validators.required,Validators.min(0)]],
      frontloadaxleDkm: [, [ Validators.required,Validators.min(0)]],
      rearloadaxleDkm: [, [ Validators.required,Validators.min(0)]],
      acQ: [, [ Validators.required,Validators.min(0)]],
      pressuregaugesQ: [, [ Validators.required,Validators.min(0)]],
      glassesandcleaningsystemQ: [, [ Validators.required,Validators.min(0)]],
      lightsQ: [, [ Validators.required,Validators.min(0)]],
      accessoriesQ: [, [ Validators.required,Validators.min(0)]],
      startingmotorQ: [, [ Validators.required,Validators.min(0)]],
      alternatorQ: [, [ Validators.required,Validators.min(0)]],
      batteriesQ: [, [ Validators.required,Validators.min(0)]],
      minorrepairQ: [, [ Validators.required,Validators.min(0)]],
      majorrepairQ: [, [ Validators.required,Validators.min(0)]],
      adjustmentscalibrationsQ: [, [ Validators.required,Validators.min(0)]],
      drumsQ: [, [ Validators.required,Validators.min(0)]],
      sealsQ: [, [ Validators.required,Validators.min(0)]],
      springsleafspringsQ: [, [ Validators.required,Validators.min(0)]],
      rubberQ: [, [ Validators.required,Validators.min(0)]],
      addressQ: [, [ Validators.required,Validators.min(0)]],
      pinQ: [, [ Validators.required,Validators.min(0)]],
      clutchclutchQ: [, [ Validators.required,Validators.min(0)]],
      transmissiondifferentialQ: [, [ Validators.required,Validators.min(0)]],
      boxQ: [, [ Validators.required,Validators.min(0)]],
      cardanQ: [, [ Validators.required,Validators.min(0)]],
      frontloadaxleQ: [, [ Validators.required,Validators.min(0)]],
      rearloadaxleQ: [, [ Validators.required,Validators.min(0)]],
      acCkm: [, [ Validators.required,Validators.min(0)]],
      pressuregaugesCkm: [, [ Validators.required,Validators.min(0)]],
      glassesandcleaningsystemCkm: [, [ Validators.required,Validators.min(0)]],
      lightsCkm: [, [ Validators.required,Validators.min(0)]],
      accessoriesCkm: [, [ Validators.required,Validators.min(0)]],
      startingmotorCkm: [, [ Validators.required,Validators.min(0)]],
      alternatorCkm: [, [ Validators.required,Validators.min(0)]],
      batteriesCkm: [, [ Validators.required,Validators.min(0)]],
      minorrepairCkm: [, [ Validators.required,Validators.min(0)]],
      majorrepairCkm: [, [ Validators.required,Validators.min(0)]],
      adjustmentscalibrationsCkm: [, [ Validators.required,Validators.min(0)]],
      drumsCkm: [, [ Validators.required,Validators.min(0)]],
      sealsCkm: [, [ Validators.required,Validators.min(0)]],
      springsleafspringsCkm: [, [ Validators.required,Validators.min(0)]],
      rubberCkm: [, [ Validators.required,Validators.min(0)]],
      addressCkm: [, [ Validators.required,Validators.min(0)]],
      pinCkm: [, [ Validators.required,Validators.min(0)]],
      clutchclutchCkm: [, [ Validators.required,Validators.min(0)]],
      transmissiondifferentialCkm: [, [ Validators.required,Validators.min(0)]],
      boxCkm: [, [ Validators.required,Validators.min(0)]],
      cardanCkm: [, [ Validators.required,Validators.min(0)]],
      frontloadaxleCkm: [, [ Validators.required,Validators.min(0)]],
      rearloadaxleCkm: [, [ Validators.required,Validators.min(0)]],
      waterpumpCu: [, [ Validators.required,Validators.min(0)]],
      airpurifierCu: [, [ Validators.required,Validators.min(0)]],
      radiatorCu: [, [ Validators.required,Validators.min(0)]],
      intonationtuningCu: [, [ Validators.required,Validators.min(0)]],
      engineoverhaulCu: [, [ Validators.required,Validators.min(0)]],
      turboCu: [, [ Validators.required,Validators.min(0)]],
      fuelpumpCu: [, [ Validators.required,Validators.min(0)]],
      oilsystemCu: [, [ Validators.required,Validators.min(0)]],
      coolingCu: [, [ Validators.required,Validators.min(0)]],
      exhaustsystemCu: [, [ Validators.required,Validators.min(0)]],
      electronicsystemCu: [, [ Validators.required,Validators.min(0)]],
      waterpumpDkm: [, [ Validators.required,Validators.min(0)]],
      airpurifierDkm: [, [ Validators.required,Validators.min(0)]],
      radiatorDkm: [, [ Validators.required,Validators.min(0)]],
      intonationtuningDkm: [, [ Validators.required,Validators.min(0)]],
      engineoverhaulDkm: [, [ Validators.required,Validators.min(0)]],
      turboDkm: [, [ Validators.required,Validators.min(0)]],
      fuelpumpDkm: [, [ Validators.required,Validators.min(0)]],
      oilsystemDkm: [, [ Validators.required,Validators.min(0)]],
      coolingDkm: [, [ Validators.required,Validators.min(0)]],
      exhaustsystemDkm: [, [ Validators.required,Validators.min(0)]],
      electronicsystemDkm: [, [ Validators.required,Validators.min(0)]],
      waterpumpQ: [, [ Validators.required,Validators.min(0)]],
      airpurifierQ: [, [ Validators.required,Validators.min(0)]],
      radiatorQ: [, [ Validators.required,Validators.min(0)]],
      intonationtuningQ: [, [ Validators.required,Validators.min(0)]],
      engineoverhaulQ: [, [ Validators.required,Validators.min(0)]],
      turboQ: [, [ Validators.required,Validators.min(0)]],
      fuelpumpQ: [, [ Validators.required,Validators.min(0)]],
      oilsystemQ: [, [ Validators.required,Validators.min(0)]],
      coolingQ: [, [ Validators.required,Validators.min(0)]],
      exhaustsystemQ: [, [ Validators.required,Validators.min(0)]],
      electronicsystemQ: [, [ Validators.required,Validators.min(0)]],
      waterpumpCkm: [, [ Validators.required,Validators.min(0)]],
      airpurifierCkm: [, [ Validators.required,Validators.min(0)]],
      radiatorCkm: [, [ Validators.required,Validators.min(0)]],
      intonationtuningCkm: [, [ Validators.required,Validators.min(0)]],
      engineoverhaulCkm: [, [ Validators.required,Validators.min(0)]],
      turboCkm: [, [ Validators.required,Validators.min(0)]],
      fuelpumpCkm: [, [ Validators.required,Validators.min(0)]],
      oilsystemCkm: [, [ Validators.required,Validators.min(0)]],
      coolingCkm: [, [ Validators.required,Validators.min(0)]],
      exhaustsystemCkm: [, [ Validators.required,Validators.min(0)]],
      electronicsystemCkm: [, [ Validators.required,Validators.min(0)]],
      total: [, [ Validators.required,Validators.min(0)]],
      idvehicle: [,[Validators.required]],
    });
  }

  ngOnInit(): void {
    this.MaintenanceCostsForm();
    this.idvehicle =this.data.vehicle.idvehicle;
    if(this.data.vehicle.idvehicle){
      this.catalogueSvc.GetMaintenamceCostsVehicle(this.data.vehicle.idvehicle).subscribe(
        (res:any) => {
          if(res.length > 0){
            const maintenancecosts: MaintenamceCosts = res[0];
            this.actionTODO = Action.EDIT;
            this.idmaintenancecosts = maintenancecosts.idmaintenamceCosts;
            this.maintenancecostsform.patchValue({
              fronttiresCu: maintenancecosts.fronttiresCu,
              drivetiresCu: maintenancecosts.drivetiresCu,
              dragtiresCu: maintenancecosts.dragtiresCu,
              wheelsCu: maintenancecosts.wheelsCu,
              puncturesanddamageCu: maintenancecosts.puncturesanddamageCu,
              alignmentCu: maintenancecosts.alignmentCu,
              swingingCu: maintenancecosts.swingingCu,
              fronttiresDkm: maintenancecosts.fronttiresDkm,
              drivetiresDkm: maintenancecosts.drivetiresDkm,
              dragtiresDkm: maintenancecosts.dragtiresDkm,
              wheelsDkm: maintenancecosts.wheelsDkm,
              puncturesanddamageDkm: maintenancecosts.puncturesanddamageDkm,
              alignmentDkm: maintenancecosts.alignmentDkm,
              swingingDkm: maintenancecosts.swingingDkm,
              fronttiresQ: maintenancecosts.fronttiresQ,
              drivetiresQ: maintenancecosts.drivetiresQ,
              dragtiresQ: maintenancecosts.dragtiresQ,
              wheelsQ: maintenancecosts.wheelsQ,
              puncturesanddamageQ: maintenancecosts.puncturesanddamageQ,
              alignmentQ: maintenancecosts.alignmentQ,
              swingingQ: maintenancecosts.swingingQ,
              fronttiresCkm: maintenancecosts.fronttiresCkm,
              drivetiresCkm: maintenancecosts.drivetiresCkm,
              dragtiresCkm: maintenancecosts.dragtiresCkm,
              wheelsCkm: maintenancecosts.wheelsCkm,
              puncturesanddamageCkm: maintenancecosts.puncturesanddamageCkm,
              alignmentCkm: maintenancecosts.alignmentCkm,
              swingingCkm: maintenancecosts.swingingCkm,
              oilchangeCu: maintenancecosts.oilchangeCu,
              casetransmissionoilCu: maintenancecosts.casetransmissionoilCu,
              airfiltersCu: maintenancecosts.airfiltersCu,
              lubricantsfluidsCu: maintenancecosts.lubricantsfluidsCu,
              cleaningCu: maintenancecosts.cleaningCu,
              oilchangeDkm: maintenancecosts.oilchangeDkm,
              casetransmissionoilDkm: maintenancecosts.casetransmissionoilDkm,
              airfiltersDkm: maintenancecosts.airfiltersDkm,
              lubricantsfluidsDkm: maintenancecosts.lubricantsfluidsDkm,
              cleaningDkm: maintenancecosts.cleaningDkm,
              oilchangeQ: maintenancecosts.oilchangeQ,
              casetransmissionoilQ: maintenancecosts.casetransmissionoilQ,
              airfiltersQ: maintenancecosts.airfiltersQ,
              lubricantsfluidsQ: maintenancecosts.lubricantsfluidsQ,
              cleaningQ: maintenancecosts.cleaningQ,
              oilchangeCkm: maintenancecosts.oilchangeCkm,
              casetransmissionoilCkm: maintenancecosts.casetransmissionoilCkm,
              airfiltersCkm: maintenancecosts.airfiltersCkm,
              lubricantsfluidsCkm: maintenancecosts.lubricantsfluidsCkm,
              cleaningCkm: maintenancecosts.cleaningCkm,
              acCu: maintenancecosts.acCu,
              pressuregaugesCu: maintenancecosts.pressuregaugesCu,
              glassesandcleaningsystemCu: maintenancecosts.glassesandcleaningsystemCu,
              lightsCu: maintenancecosts.lightsCu,
              accessoriesCu: maintenancecosts.accessoriesCu,
              startingmotorCu: maintenancecosts.startingmotorCu,
              alternatorCu: maintenancecosts.alternatorCu,
              batteriesCu: maintenancecosts.batteriesCu,
              minorrepairCu: maintenancecosts.minorrepairCu,
              majorrepairCu: maintenancecosts.majorrepairCu,
              adjustmentscalibrationsCu: maintenancecosts.adjustmentscalibrationsCu,
              drumsCu: maintenancecosts.drumsCu,
              sealsCu: maintenancecosts.sealsCu,
              springsleafspringsCu: maintenancecosts.springsleafspringsCu,
              rubberCu: maintenancecosts.rubberCu,
              addressCu: maintenancecosts.addressCu,
              pinCu: maintenancecosts.pinCu,
              clutchclutchCu: maintenancecosts.clutchclutchCu,
              transmissiondifferentialCu: maintenancecosts.transmissiondifferentialCu,
              boxCu: maintenancecosts.boxCu,
              cardanCu: maintenancecosts.cardanCu,
              frontloadaxleCu: maintenancecosts.frontloadaxleCu,
              rearloadaxleCu: maintenancecosts.rearloadaxleCu,
              acDkm: maintenancecosts.acDkm,
              pressuregaugesDkm:maintenancecosts.pressuregaugesDkm,
              glassesandcleaningsystemDkm: maintenancecosts.glassesandcleaningsystemDkm,
              lightsDkm: maintenancecosts.lightsDkm,
              accessoriesDkm: maintenancecosts.accessoriesDkm,
              startingmotorDkm: maintenancecosts.startingmotorDkm,
              alternatorDkm: maintenancecosts.alternatorDkm,
              batteriesDkm: maintenancecosts.batteriesDkm,
              minorrepairDkm: maintenancecosts.minorrepairDkm,
              majorrepairDkm: maintenancecosts.majorrepairDkm,
              adjustmentscalibrationsDkm: maintenancecosts.adjustmentscalibrationsDkm,
              drumsDkm: maintenancecosts.drumsDkm,
              sealsDkm: maintenancecosts.sealsDkm,
              springsleafspringsDkm: maintenancecosts.springsleafspringsDkm,
              rubberDkm: maintenancecosts.rubberDkm,
              addressDkm: maintenancecosts.addressDkm,
              pinDkm: maintenancecosts.pinDkm,
              clutchclutchDkm: maintenancecosts.clutchclutchDkm,
              transmissiondifferentialDkm: maintenancecosts.transmissiondifferentialDkm,
              boxDkm: maintenancecosts.boxDkm,
              cardanDkm: maintenancecosts.cardanDkm,
              frontloadaxleDkm: maintenancecosts.frontloadaxleDkm,
              rearloadaxleDkm: maintenancecosts.rearloadaxleDkm,
              acQ: maintenancecosts.acQ,
              pressuregaugesQ: maintenancecosts.pressuregaugesQ,
              glassesandcleaningsystemQ: maintenancecosts.glassesandcleaningsystemQ,
              lightsQ: maintenancecosts.lightsQ,
              accessoriesQ: maintenancecosts.accessoriesQ,
              startingmotorQ: maintenancecosts.startingmotorQ,
              alternatorQ: maintenancecosts.alternatorQ,
              batteriesQ: maintenancecosts.batteriesQ,
              minorrepairQ: maintenancecosts.minorrepairQ,
              majorrepairQ: maintenancecosts.majorrepairQ,
              adjustmentscalibrationsQ: maintenancecosts.adjustmentscalibrationsQ,
              drumsQ: maintenancecosts.drumsQ,
              sealsQ: maintenancecosts.sealsQ,
              springsleafspringsQ: maintenancecosts.springsleafspringsQ,
              rubberQ: maintenancecosts.rubberQ,
              addressQ: maintenancecosts.addressQ,
              pinQ: maintenancecosts.pinQ,
              clutchclutchQ: maintenancecosts.clutchclutchQ,
              transmissiondifferentialQ: maintenancecosts.transmissiondifferentialQ,
              boxQ: maintenancecosts.boxQ,
              cardanQ: maintenancecosts.cardanQ,
              frontloadaxleQ: maintenancecosts.frontloadaxleQ,
              rearloadaxleQ: maintenancecosts.rearloadaxleQ,
              acCkm: maintenancecosts.acCkm,
              pressuregaugesCkm: maintenancecosts.pressuregaugesCkm,
              glassesandcleaningsystemCkm: maintenancecosts.glassesandcleaningsystemCkm,
              lightsCkm: maintenancecosts.lightsCkm,
              accessoriesCkm: maintenancecosts.accessoriesCkm,
              startingmotorCkm: maintenancecosts.startingmotorCkm,
              alternatorCkm: maintenancecosts.alternatorCkm,
              batteriesCkm: maintenancecosts.batteriesCkm,
              minorrepairCkm: maintenancecosts.minorrepairCkm,
              majorrepairCkm: maintenancecosts.majorrepairCkm,
              adjustmentscalibrationsCkm: maintenancecosts.adjustmentscalibrationsCkm,
              drumsCkm: maintenancecosts.drumsCkm,
              sealsCkm: maintenancecosts.sealsCkm,
              springsleafspringsCkm: maintenancecosts.springsleafspringsCkm,
              rubberCkm: maintenancecosts.rubberCkm,
              addressCkm: maintenancecosts.addressCkm,
              pinCkm: maintenancecosts.pinCkm,
              clutchclutchCkm: maintenancecosts.clutchclutchCkm,
              transmissiondifferentialCkm: maintenancecosts.transmissiondifferentialCkm,
              boxCkm: maintenancecosts.boxCkm,
              cardanCkm: maintenancecosts.cardanCkm,
              frontloadaxleCkm: maintenancecosts.frontloadaxleCkm,
              rearloadaxleCkm: maintenancecosts.rearloadaxleCkm,
              waterpumpCu: maintenancecosts.waterpumpCu,
              airpurifierCu: maintenancecosts.airpurifierCu,
              radiatorCu: maintenancecosts.radiatorCu,
              intonationtuningCu: maintenancecosts.intonationtuningCu,
              engineoverhaulCu: maintenancecosts.engineoverhaulCu,
              turboCu: maintenancecosts.turboCu,
              fuelpumpCu: maintenancecosts.fuelpumpCu,
              oilsystemCu: maintenancecosts.oilsystemCu,
              coolingCu: maintenancecosts.coolingCu,
              exhaustsystemCu: maintenancecosts.exhaustsystemCu,
              electronicsystemCu: maintenancecosts.electronicsystemCu,
              waterpumpDkm: maintenancecosts.waterpumpDkm,
              airpurifierDkm: maintenancecosts.airpurifierDkm,
              radiatorDkm: maintenancecosts.radiatorDkm,
              intonationtuningDkm: maintenancecosts.intonationtuningDkm,
              engineoverhaulDkm: maintenancecosts.engineoverhaulDkm,
              turboDkm: maintenancecosts.turboDkm,
              fuelpumpDkm: maintenancecosts.fuelpumpDkm,
              oilsystemDkm: maintenancecosts.oilsystemDkm,
              coolingDkm: maintenancecosts.coolingDkm,
              exhaustsystemDkm: maintenancecosts.exhaustsystemDkm,
              electronicsystemDkm: maintenancecosts.electronicsystemDkm,
              waterpumpQ: maintenancecosts.waterpumpQ,
              airpurifierQ: maintenancecosts.airpurifierQ,
              radiatorQ: maintenancecosts.radiatorQ,
              intonationtuningQ: maintenancecosts.intonationtuningQ,
              engineoverhaulQ: maintenancecosts.engineoverhaulQ,
              turboQ: maintenancecosts.turboQ,
              fuelpumpQ: maintenancecosts.fuelpumpQ,
              oilsystemQ: maintenancecosts.oilsystemQ,
              coolingQ: maintenancecosts.coolingQ,
              exhaustsystemQ: maintenancecosts.exhaustsystemQ,
              electronicsystemQ: maintenancecosts.electronicsystemQ,
              waterpumpCkm: maintenancecosts.waterpumpCkm,
              airpurifierCkm: maintenancecosts.airpurifierCkm,
              radiatorCkm: maintenancecosts.radiatorCkm,
              intonationtuningCkm: maintenancecosts.intonationtuningCkm,
              engineoverhaulCkm: maintenancecosts.engineoverhaulCkm,
              turboCkm: maintenancecosts.turboCkm,
              fuelpumpCkm: maintenancecosts.fuelpumpCkm,
              oilsystemCkm: maintenancecosts.oilsystemCkm,
              coolingCkm: maintenancecosts.coolingCkm,
              exhaustsystemCkm: maintenancecosts.exhaustsystemCkm,
              electronicsystemCkm: maintenancecosts.electronicsystemCkm,
              total: maintenancecosts.total,
              idvehicle:maintenancecosts.idvehicle,
            });
            this.maintenancecostsform.updateValueAndValidity();
          }
        });

    }
  }
  save():void{
    if(this.maintenancecostsform.invalid){
      return;
    }

    this.maintenancecostsform.patchValue({
      idvehicle: this.idvehicle,
    });
    this.maintenancecostsform.updateValueAndValidity();

    const data = this.maintenancecostsform.value;
    if(this.actionTODO === Action.NEW ) {
      this.catalogueSvc.PostMaintenamceCosts(data).subscribe(
        (res:any)=>{
          this.m = res;
          this.ok = true;
          this.toastr.success(this.m.message, 'Creado',{
            timeOut: 3000,
          });
          this.dialogRef.close(true);
        }
      );
    }

    if(this.actionTODO === Action.EDIT ) {
      this.catalogueSvc.PutMaintenamceCosts(data,this.idmaintenancecosts).subscribe(
        (res: any)=>{
          this.m = res;
          this.ok = true;
          this.toastr.warning(this.m.message, 'Actualizado',{
            timeOut: 3000,
          });
          this.dialogRef.close(true);
        }
      );
      this.actionTODO = Action.NEW;
    }
  }

  onData(field: string){
    const unityCost = parseFloat(this.maintenancecostsform.get(field+'Cu').value);
    const durationKm = parseFloat(this.maintenancecostsform.get(field+'Dkm').value);
    const cant = parseFloat(this.maintenancecostsform.get(field+'Q').value);
    const result = ((cant*unityCost)/durationKm).toFixed(5);
    console.log(unityCost,durationKm,cant ,result);
    this.maintenancecostsform.get(field+'Ckm').setValue(result  === 'NaN' ? 0 : result);
    this.onTotal();
  }

  onTotal(){
    const num1 = parseFloat(this.maintenancecostsform.get('fronttiresCkm').value);
    const num2 = parseFloat(this.maintenancecostsform.get('drivetiresCkm').value);
    const num3 = parseFloat(this.maintenancecostsform.get('dragtiresCkm').value);
    const num4 = parseFloat(this.maintenancecostsform.get('wheelsCkm').value);
    const num5 = parseFloat(this.maintenancecostsform.get('puncturesanddamageCkm').value);
    const num6 = parseFloat(this.maintenancecostsform.get('alignmentCkm').value);
    const num7 = parseFloat(this.maintenancecostsform.get('swingingCkm').value);
    const num8 = parseFloat(this.maintenancecostsform.get('oilchangeCkm').value);
    const num9 = parseFloat(this.maintenancecostsform.get('casetransmissionoilCkm').value);
    const num10 = parseFloat(this.maintenancecostsform.get('airfiltersCkm').value);
    const num11 = parseFloat(this.maintenancecostsform.get('lubricantsfluidsCkm').value);
    const num12 = parseFloat(this.maintenancecostsform.get('cleaningCkm').value);
    const num13 = parseFloat(this.maintenancecostsform.get('acCkm').value);
    const num14 = parseFloat(this.maintenancecostsform.get('pressuregaugesCkm').value);
    const num15 = parseFloat(this.maintenancecostsform.get('glassesandcleaningsystemCkm').value);
    const num16 = parseFloat(this.maintenancecostsform.get('lightsCkm').value);
    const num17 = parseFloat(this.maintenancecostsform.get('accessoriesCkm').value);
    const num18 = parseFloat(this.maintenancecostsform.get('startingmotorCkm').value);
    const num19 = parseFloat(this.maintenancecostsform.get('alternatorCkm').value);
    const num20 = parseFloat(this.maintenancecostsform.get('batteriesCkm').value);
    const num21 = parseFloat(this.maintenancecostsform.get('minorrepairCkm').value);
    const num22 = parseFloat(this.maintenancecostsform.get('majorrepairCkm').value);
    const num23 = parseFloat(this.maintenancecostsform.get('adjustmentscalibrationsCkm').value);
    const num24 = parseFloat(this.maintenancecostsform.get('drumsCkm').value);
    const num25 = parseFloat(this.maintenancecostsform.get('sealsCkm').value);
    const num26 = parseFloat(this.maintenancecostsform.get('springsleafspringsCkm').value);
    const num27 = parseFloat(this.maintenancecostsform.get('rubberCkm').value);
    const num28 = parseFloat(this.maintenancecostsform.get('addressCkm').value);
    const num29 = parseFloat(this.maintenancecostsform.get('pinCkm').value);
    const num30 = parseFloat(this.maintenancecostsform.get('clutchclutchCkm').value);
    const num31 = parseFloat(this.maintenancecostsform.get('transmissiondifferentialCkm').value);
    const num32 = parseFloat(this.maintenancecostsform.get('boxCkm').value);
    const num33 = parseFloat(this.maintenancecostsform.get('cardanCkm').value);
    const num34 = parseFloat(this.maintenancecostsform.get('frontloadaxleCkm').value);
    const num35 = parseFloat(this.maintenancecostsform.get('rearloadaxleCkm').value);
    const num36 = parseFloat(this.maintenancecostsform.get('waterpumpCkm').value);
    const num37 = parseFloat(this.maintenancecostsform.get('airpurifierCkm').value);
    const num38 = parseFloat(this.maintenancecostsform.get('radiatorCkm').value);
    const num39 = parseFloat(this.maintenancecostsform.get('intonationtuningCkm').value);
    const num40 = parseFloat(this.maintenancecostsform.get('engineoverhaulCkm').value);
    const num41 = parseFloat(this.maintenancecostsform.get('turboCkm').value);
    const num42 = parseFloat(this.maintenancecostsform.get('fuelpumpCkm').value);
    const num43 = parseFloat(this.maintenancecostsform.get('oilsystemCkm').value);
    const num44 = parseFloat(this.maintenancecostsform.get('coolingCkm').value);
    const num45 = parseFloat(this.maintenancecostsform.get('exhaustsystemCkm').value);
    const num46 = parseFloat(this.maintenancecostsform.get('electronicsystemCkm').value);
    const result = (
      num1 + num2 + num3 + num4 + num5 + num6 + num7 + num8 + num9 + num10 + num11 + num12 + num13 + num14 +
      num15 + num16 + num17 + num18 + num19 + num20 + num21 + num22 + num23 + num24 + num25 + num26 + num27 +
      num28 + num29 + num30 + num31 + num32 + num33 + num34 + num35 + num36 +num37 + num38 + num39 + num40 +
      num41 + num42 + num43 + num44 + num45 + num46 ).toFixed(2);
    this.maintenancecostsform.get('total').setValue(result  === 'NaN' ? 0 : result);
  }

  isvalid(field: string): boolean {
    const value = this.maintenancecostsform.get(field);
    return (value.invalid && (value.dirty || value.touched));
  }

  errorMessage(field: string): string {
    const { errors } = this.maintenancecostsform.get(field);

    let minlength = errors?.minlength?.requiredLength;
    const messages:any = {
      required: 'Campo es requerido',
      min: 'En valor no puede ser menor a 0',
      pattern: 'Solo Números enteros',
      minlength: `El valor Ingresado es menor a ${ minlength } caracteres`,
    };
    const errorkey = Object.keys(errors).find(Boolean);
    return messages[errorkey || ''];
  }
}
