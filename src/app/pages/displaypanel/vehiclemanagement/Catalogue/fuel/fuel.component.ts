import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Fuel } from '@shared/models/vehicle.interface';
import { CatalogueService } from '@displaypanel/services/vehicle/catalogue.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { BaseFormFuel } from '@shared/utils/base.form.fuel';
import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';

enum Action {
  EDIT = 'EDIT',
  NEW = 'NEW',
}

@Component({
  selector: 'app-fuel',
  templateUrl: './fuel.component.html',
  styleUrls: ['./fuel.component.scss']
})
export class FuelComponent implements OnInit, OnDestroy {

  private subscription: Subscription = new Subscription();

  @ViewChild('scheduledOrdersPaginator') set paginator(pager:MatPaginator) {
    if (pager) this.dataSource.paginator = pager;
  }

  m: any = [];
  actionTODO = '';
  isedit:string | number = 0;
  message =''
  displayedColumns: string[] = [ 'idfuel', 'type_fuel', 'performance','actions'];
  dataSource = new MatTableDataSource();
  length = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [];
  ed = false;

  constructor(
    private catalogueSvc: CatalogueService,
    public formfuel1: BaseFormFuel,
    private toastr: ToastrService,
  ) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  fuels: Fuel[] = [];
  fuel: any = [];

  ngOnInit(): void {
    this.actionTODO = Action.NEW;
    this.list();
  }

  list(): void {
    this.ed = false;
    this.catalogueSvc.GetFuel().subscribe(
      fuel=>{
        this.dataSource.data = fuel;
        this.length = fuel.length;
        this.pageSizeOptions = [5, 10, 20, fuel.length];
      },
      err => console.error(err)
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  save(): void {
    if (this.formfuel1.fuelform.invalid ) {
      return;
    }

    const fuel = this.formfuel1.fuelform.value;
    if(this.isedit ==0){
      if(this.actionTODO === Action.NEW ) {
        this.catalogueSvc.PostFuel(fuel).subscribe((res) => {
          this.m = res;
          this.toastr.success(this.m.message, 'Creado',{
            timeOut: 3000,
          });
          this.list();
          this.formfuel1.fuelform.reset();
          this.isedit = 0;
          this.ed = false;
          this.formfuel1.fromdisable(this.ed);
        });
      }
    }else{
      if(this.actionTODO === Action.EDIT ) {
        this.catalogueSvc.PutFuel(fuel, this.isedit ).subscribe((res) => {
          this.m = res;
          this.toastr.warning(this.m.message, 'Actualizado',{
            timeOut: 3000,
          });
          this.list();
          this.formfuel1.fuelform.reset();
          this.isedit = 0;
          this.actionTODO = Action.NEW;
          this.ed = false;
          this.formfuel1.fromdisable(this.ed);
        });
      }
    }
  }

  New(): void {
    this.ed = true;
    this.formfuel1.fromdisable(this.ed);
    this.actionTODO = Action.NEW;
    this.formfuel1.fuelform.reset();
    this.isedit = 0;
  }

  edit(fuel: Fuel): void {
    this.ed = true;
    this.formfuel1.fromdisable(this.ed);
    this.actionTODO = Action.EDIT;
    this.isedit = fuel.idfuel;
    this.formfuel1.fuelform.patchValue({
      type_fuel: fuel.type_fuel,
      performance: fuel.performance,
    });
    this.formfuel1.fuelform.updateValueAndValidity();
  }

  cancel(): void {
    this.formfuel1.fuelform.reset();
    this.isedit = 0;
    this.actionTODO = Action.NEW;
    this.ed = false;
    this.formfuel1.fromdisable(this.ed);
  }

  delete(id: string| number ): void {
    if (window.confirm('Desea eliminar este Registro')) {
      this.catalogueSvc.DeleteFuel(id).subscribe(() => {
        this.toastr.error('Registro Eliminado', 'Eliminado',{
          timeOut: 3000,
        });
          this.list();
      });
    }
  }

  checkField(field: string): boolean {
    return this.formfuel1.isValidField(field);
  }

}
