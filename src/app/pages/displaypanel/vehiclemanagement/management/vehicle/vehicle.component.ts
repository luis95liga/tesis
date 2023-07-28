import { AssigntrailerComponent } from './components/assigntrailer/assigntrailer.component';
import { Component, OnInit,ViewChild, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CatalogueService } from '@displaypanel/services/vehicle/catalogue.service';
import { VehicleService } from '@displaypanel/services/vehicle/vehicle.service';
import { FormComponent } from '@displaypanel/vehiclemanagement/management/vehicle/components/form/form.component';
import { ViewComponent } from '@displaypanel/vehiclemanagement/management/vehicle/components/view/view.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { FixedcostsComponent } from './components/fixedcosts/fixedcosts.component';
import { MaintenancecostsComponent } from './components/maintenancecosts/maintenancecosts.component';
import { ExtracostsComponent } from './components/extracosts/extracosts.component';
import { GeneraldataComponent } from './components/generaldata/generaldata.component';

@Component({
  selector: 'app-vehicle',
  templateUrl: './vehicle.component.html',
  styleUrls: ['./vehicle.component.scss'],
})
export class VehicleComponent implements OnInit {
  @ViewChild('scheduledOrdersPaginator') set paginator(pager:MatPaginator) {
    if (pager) this.dataSource.paginator = pager;
  }

  m: { tution: string; mesage: string; }[] = [];
  displayedColumns: string[] = ['idvehicle','tuition','employee','vehicle_use','agination_date','trailer', 'actions', 'menu'];
  dataSource = new MatTableDataSource();
  length = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [];

  constructor(
    private dialog: MatDialog,
    private catalogueSvc: CatalogueService,
    private vehicleSvc: VehicleService,
    private toastr: ToastrService,
    ) {}

  ngOnInit(): void {
    this.list();
  }

  list(): void {
    this.vehicleSvc.GetVehicle().subscribe(
      vehicles=>{
        this.dataSource.data = vehicles;
        for(let v of vehicles){
          this.catalogueSvc.GetGeneralData().subscribe(
            (res)=>{
              const d = res.filter(r=>r.idvehicle === v.idvehicle);
              if(!d.length){
                this.toastr.info(`Falta Los Datos Generales`,
                `Vehículo con Placa: ${ v.tuition }`,{
                  timeOut: 10000,
                  progressBar: true,
                });
              }
            }
          );
          this.catalogueSvc.GetMaintenamceCosts().subscribe((maintenamceCosts)=>{
            const d = maintenamceCosts.filter(r=>r.idvehicle === v.idvehicle);
            if(!d.length){
              this.toastr.info(`Falta Los Datos del Costos de Mantenimiento`,
              `Vehículo con Placa: ${ v.tuition }`,{
                timeOut: 10000,
                progressBar: true,
              });
            }
          });
          this.catalogueSvc.GetFixedCosts().subscribe((maintenamceCosts)=>{
            const d = maintenamceCosts.filter(r=>r.idvehicle === v.idvehicle);
            if(!d.length){
              this.toastr.info(`Falta Los Datos del Costos Fijos`,
              `Vehículo con Placa: ${ v.tuition }`,{
                timeOut: 10000,
                progressBar: true,
              });
            }
          });
        }
        this.length = vehicles.length;
        this.pageSizeOptions = [5, 10, 20, vehicles.length];
      },
      err => console.error(err)
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  onOpenModalForm(vehicle = {}): void {
    let dialogRef = this.dialog.open( FormComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '90%',
      width: '100%',
      hasBackdrop: true,
      disableClose: true,
      data: { title: 'Nuevo Vehiculo', vehicles:this.dataSource.data, vehicle },
    });
    dialogRef.afterClosed().subscribe(result => {
      this.vehicleSvc.GetVehicle().subscribe(
        vehicles=>{
          this.dataSource.data = vehicles;
        },
        err => console.error(err)
      );
      this.list();
    });
  }

  onOpenModalAssignTrailer(vehicle = {}): void {
    let dialogRef = this.dialog.open( AssigntrailerComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '65%',
      width: '45%',
      hasBackdrop: true,
      disableClose: true,
      data: { title: 'Nuevo Vehiculo', vehicle },
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  onOpenModalView(vehicle = {}): void{
    let dialogRef = this.dialog.open( ViewComponent, {
      maxHeight: '100vh',
      height: '90%',
      width: '2500px',
      hasBackdrop: true,
      disableClose: true,
      data: { title: 'View Vehiculo', vehicle },
    });
    dialogRef.afterClosed().subscribe(result => {
      this.vehicleSvc.GetVehicle().subscribe(
        vehicles=>{
          this.dataSource.data = vehicles;
        },
        err => console.error(err)
      );
    });
  }

  delete(vehicle: any): void {
    if (window.confirm('Desea eliminar este Registro')) {
      this.vehicleSvc.DeleteVehicle(vehicle.idvehicle).subscribe((res) => {
      });
      this.catalogueSvc.DeleteTechnicalData(vehicle.idtechnical_data).subscribe((res) => {
        this.toastr.error('Registro Eliminado', 'Eliminado',{
          timeOut: 3000,
        });
          this.list();
      });
    }
  }

  onOpenModalMaintenanceCosts(vehicle = {}): void{
    let dialogRef = this.dialog.open( MaintenancecostsComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '2500px',
      hasBackdrop: true,
      disableClose: true,
      data: { title: 'Costos Mantenimientos', vehicle },
    });

    dialogRef.afterClosed().subscribe(result => {
      this.vehicleSvc.GetVehicle().subscribe(
        vehicles=>{
          this.dataSource.data = vehicles;
        },
        err => console.error(err)
      );
      this.list();
    });
  }

  onOpenModalExtraCosts(vehicle = {}): void{
    let dialogRef = this.dialog.open( ExtracostsComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      hasBackdrop: true,
      disableClose: true,
      data: { title: 'Costos Extras', vehicle },
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  onOpenModalGeneralData(vehicle = {}): void{
    let dialogRef = this.dialog.open( GeneraldataComponent, {
      height: '450px',
      width: '600px',
      hasBackdrop: true,
      disableClose: true,
      data: { title: 'Datos Generales', vehicle },
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){

      }
    });
  }

  onOpenModalFixedCosts(vehicle = {}): void{
    let dialogRef = this.dialog.open( FixedcostsComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '75%',
      width: '70%',
      hasBackdrop: true,
      disableClose: true,
      data: { title: 'Datos Generales', vehicle },
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){

      }
    });
  }

}
