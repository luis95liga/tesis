import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { VehicleService } from '@app/pages/displaypanel/services/vehicle/vehicle.service';
import { VehicleList } from '@app/shared/models/vehicle.interface';

@Component({
  selector: 'app-trailer',
  templateUrl: './trailer.component.html',
  styleUrls: ['./trailer.component.scss']
})
export class TrailerComponent implements OnInit {
  vehicle: VehicleList[] = [];
  checked = false;
  indeterminate = false;
  labelPosition: number=0;
  disabled = false;

  constructor(
    private vehicleSvc: VehicleService,
    private dialogRef: MatDialogRef<TrailerComponent>
  ) { }

  ngOnInit(): void {
    this.vehicleSvc.GetVehicle().subscribe(
      (vehicle: VehicleList[]) => {
      this.vehicle = vehicle;
    });
  }

  save(): void {
    this.dialogRef.close(this.labelPosition);
  }

}
