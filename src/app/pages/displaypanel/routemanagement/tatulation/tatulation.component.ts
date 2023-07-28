import { AuthService } from '@auth/auth.service';
import { TabulationService } from './../../services/routes/tabulation.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Country, ProvinceList } from '@shared/models/company.interface';
import { PlaceService } from '@displaypanel/services/business/place.service';
import { FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { FormComponent } from './components/form/form.component';
import { TabulationList } from '@app/shared/models/router.interface';
import { BillsComponent } from './components/bills/bills.component';
import { FreightComponent } from './components/freight/freight.component';

@Component({
  selector: 'app-tatulation',
  templateUrl: './tatulation.component.html',
  styleUrls: ['./tatulation.component.scss']
})
export class TatulationComponent implements OnInit {

  data: any[] = [];
  constructor(
    private dialog: MatDialog,
    private tabulationSvc: TabulationService,
    private authSvc: AuthService
  ){

  }

  @ViewChild('scheduledOrdersPaginator') set paginator(pager:MatPaginator) {
    if (pager) this.dataSource.paginator = pager;
  }

  actionTODO = '';
  isedit:string | number = 0;
  message ='';
  provinceform: any;
  displayedColumns: string[] = [ 'idtabulation', 'location', 'destinations', 'km','hours','actions', 'cos'];
  dataSource = new MatTableDataSource();
  length = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [];
  numRegex = /^-?\d*[.,]?\d{0,2}$/;
  m: any = [];
  ed = false;
  cl = false;

  ngOnInit(): void {
    this.List();
  }

  List(): void {
    const idCompany = this.authSvc.userValue.idcompany;
    this.tabulationSvc.GetTabulationCompany(idCompany).subscribe(
      (tatulation: TabulationList[])=>{
        this.dataSource.data = tatulation;
        this.length = tatulation.length;
        this.pageSizeOptions = [5, 10, 20, tatulation.length];
      },
      (err)=> console.error(err)
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onOpenModal(route = {}): void {
    let dialogRef = this.dialog.open(FormComponent, {
      height: '350px',
      width: '600px',
      hasBackdrop: true,
      disableClose: true,
      data: { title: 'Ruta', route },
    });

    dialogRef.afterClosed().subscribe(
      (result: boolean) => {
        this.List();
      },
      (err)=> console.error(err)
    );
  }

  onOpenModalBills(route = {}): void {
    let dialogRef = this.dialog.open(BillsComponent, {
      maxHeight: '100hv',
      maxWidth: '100hv',
      height: '95%',
      width: '95%',
      hasBackdrop: true,
      disableClose: true,
      data: { title: 'Ruta', route },
    });

    dialogRef.afterClosed().subscribe(
      (result: boolean) => {},
      (err)=> console.error(err)
    );
  }

  onOpenModalFreight(route = {}): void {
    let dialogRef = this.dialog.open(FreightComponent, {
      height: '350px',
      width: '600px',
      hasBackdrop: true,
      disableClose: true,
      data: { title: 'Ruta', route },
    });

    dialogRef.afterClosed().subscribe(
      (result: boolean) => {},
      (err)=> console.error(err)
    );
  }

}
