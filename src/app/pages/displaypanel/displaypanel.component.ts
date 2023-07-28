import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { CompanyService } from './services/business/company.service';
import { Title } from '@angular/platform-browser';
import { AuthService } from '../auth/auth.service';
import { UserResponse } from '@app/shared/models/user.interface';
import { Company } from '@app/shared/models/company.interface';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];

@Component({
  selector: 'app-displaypanel',
  templateUrl: './displaypanel.component.html',
  styleUrls: ['./displaypanel.component.scss']
})
export class DisplaypanelComponent implements OnInit {

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild('scheduledOrdersPaginator') set paginator(pager:MatPaginator) {
    if (pager) this.dataSource.paginator = pager;
  }

  item = {
    nombre: 'Luis Arcos',
    fecha: '2022/12/12 10:32',
  };

  name = "";

  items:any = [];
  constructor(
    private companySvc: CompanyService,
    private authSvc: AuthService,
    private setTitle: Title,
  ) {
    this.setTitle.setTitle('TRANSPORTROUTE - Panel');
    for(let i =0; i<10; i++){
      this.items.push(this.item);
    }
   }

  ngOnInit(): void {
    this.authSvc.user$.subscribe(
      (user: UserResponse) => {
        if(user){
          this.companySvc.GetIdCompany(user.idcompany).subscribe(
            (company: Company) => {
              this.name = company.name;
            }
          );
        }
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
}
