import { Component, OnInit, ViewChild } from '@angular/core';
import { ClientList } from '@shared/models/client.interface';
import { ClientService } from '@displaypanel/services/client/client.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ViewComponent } from './components/view/view.component';
import { FormComponent } from './components/form/form.component';
//import { DocumentsComponent } from './components/documents/documents.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.scss']
})
export class ClientsComponent implements OnInit {
  @ViewChild('scheduledOrdersPaginator') set paginator(pager:MatPaginator) {
    if (pager) this.dataSource.paginator = pager;
  }

  displayedColumns: string[] = [ 'idclient', 'identificationcard', 'names','entry_date','cell','phone','destinations','actions'];
  dataSource = new MatTableDataSource();
  length = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [];

  constructor(
    private dialog: MatDialog,
    private clientSvc: ClientService,
    private toastr: ToastrService,
  ) { }

  employee: ClientList[] = []

  ngOnInit(): void {
    this.list();
  }

  list(): void {
    this.clientSvc.GetClient().subscribe(
      client=>{
        this.dataSource.data = client;
        this.length = client.length;
        this.pageSizeOptions = [5, 10, 20, client.length];
      },
      err => console.error(err)
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  delete( id: string| number ){
    if (window.confirm('Desea eliminar este Registro')) {
      this.clientSvc.DeleteClient(id).subscribe((res) => {
        this.toastr.error('Registro Eliminado', 'Eliminado',{
          timeOut: 3000,
        });
          this.list();
        });
    }
  }

  onOpenModalForm(client={}):void {
    let dialogRef = this.dialog.open( FormComponent, {
      width: '100%',
      hasBackdrop: true,
      data: { title: 'Cliente', client },
    });
    dialogRef.afterClosed().subscribe(result => {
      this.list();
      this.clientSvc.GetClient().subscribe(
        client=>{
          this.dataSource.data = client;
        },
        err => console.error(err)
      );
    });
  }

  onOpenModalView(client: any): void {
    let dialogRef = this.dialog.open( ViewComponent, {
      height: '550px',
      width: '2500px',
      hasBackdrop: false,
      data: { title: 'client', client },
    });
    dialogRef.afterClosed().subscribe(result => {});
  }
}
