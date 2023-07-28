import { Component, OnInit,ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CatalogueService } from '@displaypanel/services/vehicle/catalogue.service';
import { VehicleService } from '@displaypanel/services/vehicle/vehicle.service';
import { FormComponent } from './components/form/form.component';
import { ViewComponent } from './components/view/view.component';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-trailer',
  templateUrl: './trailer.component.html',
  styleUrls: ['./trailer.component.scss']
})
export class TrailerComponent implements OnInit {

  @ViewChild('scheduledOrdersPaginator') set paginator(pager:MatPaginator) {
    if (pager) this.dataSource.paginator = pager;
  }

  displayedColumns: string[] = ['idtrailer','tuition','owner','vehicle_model','vehicle_use', 'actions'];
  dataSource = new MatTableDataSource();
  length = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [];

  constructor(
    private dialog: MatDialog,
    private catalogueSvc: CatalogueService,
    private vehicleSvc: VehicleService,
    private toastr: ToastrService,
  ){}

  ngOnInit(): void {
    this.list();
  }

  list(): void {
    this.vehicleSvc.GetTrailer().subscribe(trailer=>{
      this.dataSource.data = trailer;
      console.log(this.dataSource.data);
      this.length = trailer.length;
      this.pageSizeOptions = [5, 10, 20, trailer.length];
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onOpenModalForm(trailer = {}): void {
    let dialogRef = this.dialog.open( FormComponent, {
      height: '520px',
      width: '2500px',
      hasBackdrop: true,
      disableClose: true,
      data: { title: 'Nuevo Trailer', trailers:this.dataSource.data, trailer },
    });
    dialogRef.afterClosed().subscribe(result => {
      this.vehicleSvc.GetTrailer().subscribe(
        trailer=>{
          this.dataSource.data = trailer;
        },
        err => console.error(err)
      );
      this.list();
    });
  }

  onOpenModalView(trailer = {}): void{
    let dialogRef = this.dialog.open( ViewComponent, {
      height: '500px',
      width: '2500px',
      hasBackdrop: true,
      disableClose: true,
      data: { title: 'View Vehiculo', trailer },
    });
    dialogRef.afterClosed().subscribe(result => {
      this.vehicleSvc.GetTrailer().subscribe(
        trailer=>{
          this.dataSource.data = trailer;
        },
        err => console.error(err)
      );
    });
  }

  delete(trailer: any): void {
    if (window.confirm('Desea eliminar este Registro')) {
      this.vehicleSvc.DeleteVehicle(trailer.idtrailer).subscribe((res) => {
      });
      this.catalogueSvc.DeleteTechnicalData(trailer.idtechnical_datatrailer).subscribe((res) => {
        console.log(trailer.idtechnical_data);
        this.toastr.error('Registro Eliminado', 'Eliminado',{
          timeOut: 3000,
        });
          this.list();
      });
    }
  }
}
