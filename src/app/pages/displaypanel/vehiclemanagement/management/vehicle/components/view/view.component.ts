import { Component, OnInit,  Inject } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { VehicleModels,VehicleUse,Fuel, OwnerList, Vehicle, TechnicalData, DocumentList } from '@shared/models/vehicle.interface';
import { Employee } from '@shared/models/employee.interface';
import { VehicleService } from '@displaypanel/services/vehicle/vehicle.service';
import { CatalogueService } from '@displaypanel/services/vehicle/catalogue.service';
import { EmployeesService } from '@displaypanel/services/business/employees.service';
import { FormBuilder, Validators } from '@angular/forms';
import { AssigntrailerComponent } from '@displaypanel/vehiclemanagement/management/vehicle/components/assigntrailer/assigntrailer.component';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '@app/pages/auth/auth.service';
import { UserResponse } from '@app/shared/models/user.interface';
import { environment } from '@env/environment';
import { DocumentsComponent } from '../documents/documents.component';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { PdfMakeWrapper, Txt, Columns, Img, Ul, Polyline, Canvas, Rect, ITable, Table } from 'pdfmake-wrapper';

PdfMakeWrapper.setFonts(pdfFonts);
type TableRow1 = [ string, string, string, string, string ];

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})

export class ViewComponent implements OnInit {
  idVehicle: any;
  Idtechnicaldata: any;
  vehicle: Vehicle = {
    agination_date: '',
    engine_series: '',
    idemployee: 0,
    idowner: 0,
    idtechnical_data: 0,
    idvehicle: 0,
    idvehicle_model: 0,
    idvehicle_use: 0,
    state: false,
    tuition: '',
    image: ''
  };
  technicaldata: TechnicalData = {
    color: '',
    hours_use: '',
    year: '',
    idfuel: 0,
    idgps: 0,
    idtechnical_data: 0,
    load_capacity: 0,
    mileage: 0,
    observation: '',
    tank_capacity: 0,
    yield_gallon: 0
  };
  mensaje =''
  vehicleform: any;
  owners: OwnerList[] = [];
  vehiclemodels: VehicleModels[] = [];
  vehicleuse: any;
  fuel: any;
  employee: any;
  employee1: any;
  Idcompany=0;
  message: any;
  m: any;
  owner: any;
  owner1: any;
  vehiclemodel: any;
  empresa: any;
  trailer: any;
  img: string = './../../../../../../assets/noimage.png';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private vehicleSvc: VehicleService,
    private employeeSvc: EmployeesService,
    private catalogueSvc: CatalogueService,
    private fb: FormBuilder,
    private authSvc: AuthService,
  ) { }


  ngOnInit(): void {
    this.authSvc.user$.subscribe(
      (user: UserResponse)=>{
        this.Idcompany = user.idcompany;
      }
    );
    this.list();
  }

  list(): void {
    this.idVehicle = this.data.vehicle.idvehicle;
    this.Idtechnicaldata = this.data.vehicle.idtechnical_data;

    this.vehicleSvc.GetIdVehicle(this.idVehicle).subscribe(
      (vehicle: Vehicle)=>{
        if(vehicle.image){
          this.img = environment.API_URL+ vehicle.image;
        }else{
          this.img = './../../../../../../assets/noimage.png';
        }

        this.vehicle = vehicle;

        this.catalogueSvc.GetOwer().subscribe(ower=>{
          const c = ower.filter(res => res.idowner === vehicle.idowner);
          this.owner = c.map(res => res.name +'('+res.company+')');
          this.empresa = c.map( res => ''+ res.company);
          this.owner1 = c.map(res => res.name);
        });

        this.catalogueSvc.GetVehicleModel().subscribe(vehiclemodels=>{
          const v = vehiclemodels.filter(res => res.idvehicle_model === vehicle.idvehicle_model);
          this.vehiclemodel = v.map(res => res.manufacturer + '(' + res.model + ')' );
        });

        this.employeeSvc.GetPositionEmployee(this.Idcompany).subscribe(employee=>{
          const e = employee.filter( res => res.idemployee === vehicle.idemployee );
          this.employee = e.map( res => '(' + res.identificationcard + ') ' + res.names + ' ' + res.lastnames);
          this.employee1 = e.map( res => res.names + ' ' + res.lastnames);
        });

        this.catalogueSvc.GetVehicleUse().subscribe(vehicleuse=>{
          const v = vehicleuse.filter( res=> res.idvehicle_use === vehicle.idvehicle_use );
          this.vehicleuse = v.map(res => res.vehicle_use);
        });

        this.vehicleSvc.GetAssignVehiceTrailer(this.idVehicle).subscribe(
          (res: any)=>{
            this.vehicleSvc.GetIdTrailer(res[0].idtrailer).subscribe(
              (res1: any)=>{
                this.trailer = res1.tuition;
              }
            );
          }
        );

        this.catalogueSvc.GetIdTechnicalData(vehicle.idtechnical_data).subscribe(
          (technicaldata: TechnicalData)=>{
            this.technicaldata = technicaldata;
            this.catalogueSvc.GetFuel().subscribe(fuel=>{
              const f = fuel.filter(res => res.idfuel === technicaldata.idfuel );
              this.fuel = f.map( r => r.type_fuel)
            });
          }
        );
    });
  }

  onOpenModalAssignTrailer(vehicle = {}): void {
    let dialogRef = this.dialog.open( AssigntrailerComponent, {
      hasBackdrop: false,
      data: { title: 'Nuevo Vehiculo', vehicle },
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  onOpenModalDocument(vehicle ={}): void {
    let dialogRef = this.dialog.open( DocumentsComponent, {
      height: '480px',
      width: '2500px',
      hasBackdrop: true,
      disableClose: true,
      data: { title: 'Vehicle', vehicle },
    });
    dialogRef.afterClosed().subscribe(result => {});
  }

  async downloadPDF(): Promise<void> {
    const pdf = new PdfMakeWrapper();
    pdf.add(new Txt(this.empresa).alignment('center').fontSize(16).bold().italics().margin([0,0,0,2]).end);
    pdf.add(new Txt('Datos del Vehiculo').alignment('center').fontSize(12).bold().italics().margin([0,0,0,2]).end);
    pdf.add(new Columns([
      await new Img(this.img).fit([80,80]).width(100).build(),
      [
        new Columns([
          new Txt('Propietario:').width(70).bold().fontSize(13).end,
          new Txt(this.owner1).fontSize(13).end
        ]).end,
        new Columns([
          new Txt('Modelo:').width(70).bold().fontSize(13).end,
          new Txt(this.vehiclemodel).fontSize(13).end
        ]).end,
        new Columns([
          new Txt('Conductor:').width(70).bold().fontSize(13).end,
          new Txt(this.employee).fontSize(13).end
        ]).end,
        new Columns([
          new Txt('Uso Vehiculo:').width(90).bold().fontSize(14).end,
          new Txt(this.vehicleuse).fontSize(14).end
        ]).end
      ]
    ]).end);
    pdf.add(new Txt('Datos de Identificación').alignment('left').fontSize(11).bold().italics().margin([0,4,0,1]).end);
    pdf.add(new Columns([
      new Columns([
        new Txt('Matricula:').width(80).bold().fontSize(13).end,
        new Txt(this.vehicle.tuition).fontSize(13).end
      ]).end,
      new Columns([
        new Txt('Color:').width(40).bold().fontSize(13).end,
        new Txt(this.technicaldata.color).fontSize(13).end
      ]).end
    ]).end);
    pdf.add(new Columns([
      new Columns([
        new Txt('Serial Motor:').width(80).bold().fontSize(13).end,
        new Txt(this.vehicle.engine_series).fontSize(13).end
      ]).end,
      new Columns([
        new Txt('Year:').width(40).bold().fontSize(14).end,
        new Txt( '' + this.technicaldata.year ).fontSize(14).end
      ]).end
    ]).end);
    pdf.add(
      new Canvas([
        new Rect([30, 155], [530, 35]).end
      ]).absolutePosition(0, 0).end
    );
    pdf.add(
      new Columns([
        new Columns([
          new Txt('Asignado el:').bold().fontSize(13).width(95).end,
          new Txt(this.vehicle.agination_date).fontSize(13).end
        ]).end,
        new Columns([
          new Txt('Horas de Uso:').bold().fontSize(13).width(110).end,
          new Txt(this.technicaldata.hours_use).fontSize(13).end
        ]).end
      ]).margin([0,8,4,0]).end
    );
    pdf.add(
      new Columns([
        new Columns([
          new Txt('Kilometraje:').bold().fontSize(13).width(95).end,
          new Txt(''+this.technicaldata.mileage).fontSize(13).end
        ]).end,
        new Columns([
          new Txt('Tipo Combustible:').bold().fontSize(13).width(110).end,
          new Txt(this.fuel).fontSize(13).end
        ]).end
      ]).end
    );
    pdf.add(
      new Columns([
        new Columns([
          new Txt('Capacidad de Carga:').bold().fontSize(13).width(130).end,
          new Txt(''+this.technicaldata.load_capacity).fontSize(13).end
        ]).end,
        new Columns([
          new Txt('Capacidad de Tanque:').bold().fontSize(13).width(150).end,
          new Txt(''+this.technicaldata.yield_gallon).fontSize(13).end
        ]).end
      ]).end
    );
    pdf.add(
      new Columns([
        new Columns([
          new Txt('Rendimiento:').bold().fontSize(13).width(95).end,
          new Txt(''+this.technicaldata.yield_gallon +' Kms por Galón').fontSize(13).end
        ]).end,
        new Columns([
          new Txt('Gps:').bold().fontSize(13).width(40).end,
          new Txt('Ninguno').fontSize(13).end
        ]).end
      ]).end
    );
    pdf.add(new Columns([
      new Txt('Remolque:').bold().fontSize(13).width(70).end,
      new Txt(this.trailer).fontSize(13).end
    ]).end);
    this.catalogueSvc.GetDocumentVehicle(this.idVehicle).subscribe(
      (document)=>{
        pdf.add(new Txt('Documentos').alignment('center').fontSize(14).bold().italics().margin([0,20,0,2]).end);
        pdf.add(this.createTable1(document));
        pdf.create().open()
      },
      (err) => console.log(err)
    );
  }

  createTable1(data: DocumentList[]):ITable{
    return new Table([
      [
        new Txt('Documento').bold().end,
        new Txt('Costo').bold().end,
        new Txt('Fecha de Expedicioón').bold().end,
        new Txt('Fecha de Expiración').bold().end,
        new Txt('Obsevaciones').bold().end
      ],
      ...this.extractData1(data)
    ])
    .widths(['*',100,'*','*',100])
    .layout('lightHorizontalLines')
    .end;
  }

  extractData1(data: DocumentList[]): TableRow1[] {
    return data.map(row=>[row.document_type, ''+row.procedure_cost, row.issue_date, row.expiration_date, row.observations]);
  }
}
