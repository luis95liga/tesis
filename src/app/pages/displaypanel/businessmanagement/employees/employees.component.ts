import { Component, OnInit, ViewChild } from '@angular/core';
import { EmployeeList } from '@shared/models/employee.interface';
import { EmployeesService } from '@displaypanel/services/business/employees.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { ViewComponent } from './components/view/view.component';
import { FormComponent } from './components/form/form.component';
import { DocumentsComponent } from './components/documents/documents.component';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {
  @ViewChild('scheduledOrdersPaginator') set paginator(pager:MatPaginator) {
    if (pager) this.dataSource.paginator = pager;
  }

  displayedColumns: string[] = [ 'idemployee', 'identificationcard', 'names','entry_date', 'position', 'location','Document','actions'];
  dataSource = new MatTableDataSource();
  length = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [];

  constructor(
    private dialog: MatDialog,
    private employeeSvc: EmployeesService,
    private toastr: ToastrService,
  ) {
  }

  employee: EmployeeList[] = [];

  ngOnInit(): void {
    this.list();
  }

  list(): void {
    this.employeeSvc.getEmployee().subscribe(
      employees=>{
        this.dataSource.data = employees;
        this.length = employees.length;
        this.pageSizeOptions = [5, 10, 20, employees.length];
      },
      err => console.error(err)
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  edit(id: any){}
  delete( id: string| number ){
    if (window.confirm('Desea eliminar este Registro')) {
      this.employeeSvc.DeleteEmployee(id).subscribe((res) => {
        this.toastr.error('Registro Eliminado', 'Eliminado',{
          timeOut: 3000,
        });
          this.list();
        });
    }
  }

  onOpenModalForm(employee={}):void {
    let dialogRef = this.dialog.open( FormComponent, {
      height: '510px',
      width: '1000px',
      hasBackdrop: true,
      disableClose: true,
      data: { title: 'Empleado', employee },
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.employeeSvc.getEmployee().subscribe(
          employees=>{
            this.dataSource.data = employees;
            this.list();
          },
          (err)=>console.error(err)
          );
      }
    });
  }

  onOpenModalView(employee: any): void {
    let dialogRef = this.dialog.open( ViewComponent, {
      height: '480px',
      width: '2500px',
      hasBackdrop: true,
      disableClose: true,
      data: { title: 'Empleado', employee },
    });
    dialogRef.afterClosed().subscribe(result => {});
  }
  onOpenModalDocument(employee: any): void {
    let dialogRef = this.dialog.open( DocumentsComponent, {
      height: '540px',
      width: '2500px',
      hasBackdrop: true,
      disableClose: true,
      data: { title: 'Empleado', employee },
    });
    dialogRef.afterClosed().subscribe(result => {});
  }
}
