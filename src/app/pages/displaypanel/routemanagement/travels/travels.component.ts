import { CompanyService } from '@displaypanel/services/business/company.service';
import { TabulationService } from '@displaypanel/services/routes/tabulation.service';
import { AuthService } from '@auth/auth.service';
import { TravelService } from '@displaypanel/services/guide/travel.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { TrailerList, VehicleList } from '@app/shared/models/vehicle.interface';
import { VehicleService } from '@displaypanel/services/vehicle/vehicle.service';
import { TravelList } from '@app/shared/models/guide.interface';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { MapComponent } from './components/map/map.component';
import { PdfPrint } from './class/pdf';
import { Report, ReportGuide } from '@app/shared/models/report.interface';
import { Company, CompanyName } from '@app/shared/models/company.interface';
import { ReportService } from '@displaypanel/services/report/report.service';

@Component({
  selector: 'app-travels',
  templateUrl: './travels.component.html',
  styleUrls: ['./travels.component.scss']
})
export class TravelsComponent implements OnInit {
  m: any;

  @ViewChild('scheduledOrdersPaginator') set paginator(pager:MatPaginator) {
    if (pager) this.dataSource.paginator = pager;
  }

  displayedColumns: string[] = [ 'index', 'origin', 'Destination', 'kms', 'hours', 'total', 'actions'];
  dataSource = new MatTableDataSource();
  length = 0;
  pageSize = 10;
  travel: TravelList[] = [];
  pageSizeOptions: number[] = [];
  Vehicles: VehicleList[] = [];
  idvehicle: number | string = 0;
  isdata = false;
  trailers: TrailerList[] = [];

  constructor(
    private VehicleSvc: VehicleService,
    private travelSvc: TravelService,
    private TabulationSvc: TabulationService,
    private reportSvc: ReportService,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private pdfprint: PdfPrint,
    private authSvc: AuthService,
    private companySvc: CompanyService
  ) {}

  ngOnInit(): void {
    this.VehicleSvc.GetVehicle().subscribe(
      (vehicles)=>{
        this.Vehicles = vehicles;
      },(err)=>console.error(err)
    );
    this.VehicleSvc.GetTrailer().subscribe(
      (trailers)=>{
        this.trailers = trailers;
      }
    );

    this.travelSvc.GetTravel().subscribe(
      (travel: TravelList[])=>{
        //this.dataSource.data = travel;
        this.travel = travel;
        this.length = travel.length;
        this.pageSizeOptions = [5, 10, 20, travel.length];
      },
      (err)=>console.error(err)
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  vehicle(v: any): void{
    this.dataSource.data = this.travel.filter(res=>res.idvehicle == v.idvehicle);
  }

  trailer(v: any): void{
    this.dataSource.data = this.travel.filter(res=>res.idtrailer == v.idtrailer);
  }

  delete(id: number | string): void {
    if(window.confirm('Desea eliminar este Registro')){
      this.travelSvc.DeleteTravel(id).subscribe(
        (res)=>{
          this.m = res;
          this.toastr.error('Registro Elimindo', 'Eliminado', {
            timeOut: 3000,
          });
          this.dataSource.data = [];
        },
        (err)=> console.error(err)
      );
    }
  }

  OnOpenModal(id: any){
    let dialogRef = this.dialog.open( MapComponent, {
      maxHeight: '100hv',
      maxWidth: '100hv',
      height: '100%',
      width: '100%',
      hasBackdrop: true,
      disableClose: true,
      data: { title: 'Mapa', id },
    });

    dialogRef.afterClosed().subscribe(
      (result: boolean) => {},
      (err)=> console.error(err)
    );
  }

  pfd1(id:number | string): void {
    this.reportSvc.GetReport(id,this.authSvc.userValue.idcompany).subscribe(
      (report: Report)=>{
        this.companySvc.GetCompanyName(this.authSvc.userValue.idcompany).subscribe(
          (company: CompanyName)=>{
            this.pdfprint.pdf1(report, company);
          },
          (err)=> console.error(err)
        );
      },
      (err)=>{
        console.error(err);
      }
    );
  }

  pfd2(id:number | string): void {
    this.reportSvc.GetReportGuide(id,this.authSvc.userValue.idcompany).subscribe(
      (report: ReportGuide[])=>{
        this.pdfprint.pdf2(report);
      },
      (err)=>{
        console.error(err);
      }
    );
  }

  pfd3(): void {
    this.companySvc.GetCompanyName(this.authSvc.userValue.idcompany).subscribe(
      (company: CompanyName)=>{
        this.pdfprint.pdf3(company);
      },
      (err)=> console.error(err)
    );
  }
}
