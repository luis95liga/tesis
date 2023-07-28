import { EmployeesService } from '@displaypanel/services/business/employees.service';
import { Component, OnInit,  Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DocumentEmployeeList, EmployeeList } from '@shared/models/employee.interface';
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

  img:any;
  employee: EmployeeList = {
    idemployee: 0,
    identificationcard: '',
    entry_date: '',
    names: '',
    photo: '',
    email: '',
    phone: '',
    cell: '',
    observations: '',
    salary: 0,
    birth_date: '',
    address: '',
    location: '',
    position: '',
    period_payment: '',

  };
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private employeeSvc: EmployeesService
  ) { }

  ngOnInit(): void {
    this.employee = this.data.employee;
    if(this.employee.photo!=''){
      this.img = 'http://127.0.0.1:8000'+this.employee.photo;
    }else{
      this.img = './../../../../../../../assets/noimage.png';
    }
  }

  async downloadPDF(): Promise<void> {
    const pdf = new PdfMakeWrapper();
    pdf.add(new Txt('Datos Personales').alignment('center').fontSize(16).bold().italics().margin([0,0,0,2]).end);
    pdf.add(new Columns([
      await new Img(this.img).fit([80,80]).width(120).build(),
      [
        new Columns([
          new Txt('Cedula').width(65).bold().fontSize(14).end,
          new Txt(this.employee.identificationcard).fontSize(14).end
        ]).end,
        new Columns([
          new Txt('Nombre:').width(65).bold().fontSize(14).end,
          new Txt(this.employee.names).fontSize(14).end
        ]).end,
        new Columns([
          new Txt('Fecha de Nacimiento:').width(150).bold().fontSize(14).end,
          new Txt(this.employee.birth_date).fontSize(14).end
        ]).end,
        new Columns([
          new Txt('Correo Electrónico:').width(130).bold().fontSize(14).end,
          new Txt(this.employee.email).fontSize(14).end
        ]).end
      ]
    ]).end);
    pdf.add(new Txt('Datos del Nómina').alignment('left').fontSize(12).bold().italics().margin([0,4,0,1]).end);
    pdf.add(new Columns([
      new Columns([
        new Txt('Ocupación:').width(75).bold().fontSize(14).end,
        new Txt(this.employee.position).fontSize(14).end
      ]).end,
      new Columns([
        new Txt('Salario:').width(70).bold().fontSize(14).end,
        new Txt(''+this.employee.salary).fontSize(14).end
      ]).end
    ]).end);
    pdf.add(new Columns([
      new Columns([
        new Txt('Periodo de Pago:').width(130).bold().fontSize(14).end,
        new Txt(this.employee.period_payment).fontSize(14).end
      ]).end,
      new Columns([
        new Txt('Fecha de Ingreso:').width(130).bold().fontSize(14).end,
        new Txt(this.employee.entry_date).fontSize(14).end
      ]).end
    ]).end);
    pdf.add(
      new Canvas([
        new Rect([30, 160], [530, 35]).end
      ]).absolutePosition(0, 0).end
    );
    pdf.add(new Columns([
      new Txt('Localización:').bold().fontSize(14).width(130).end,
      new Txt(this.employee.location).fontSize(14).end
    ]).margin([0,4,0,0]).end);
    pdf.add(new Columns([
      new Txt('Dirección:').bold().fontSize(14).width(130).end,
      new Txt(this.employee.address).fontSize(14).end
    ]).end);
    pdf.add(new Columns([
      new Txt('Teléfono de Domicilio:').bold().fontSize(14).width(130).end,
      new Txt(this.employee.cell).fontSize(14).end
    ]).end);
    pdf.add(new Columns([
      new Txt('Teléfono Movil:').bold().fontSize(14).width(130).end,
      new Txt(this.employee.phone).fontSize(14).end
    ]).end);
    pdf.add(new Columns([
      new Txt('Observaciones:').bold().fontSize(14).width(130).end,
      new Txt(this.employee.observations).fontSize(14).end
    ]).end);
    this.employeeSvc.GetDocumentEmployee(this.employee.idemployee).subscribe(
      (document: DocumentEmployeeList[])=>{
        pdf.add(new Txt('Documentos').alignment('center').fontSize(16).bold().italics().margin([0,20,0,2]).end);
        pdf.add(this.createTable1(document));
        pdf.create().open()
      },
      err=>console.log(err)
    );
  }

  createTable1(data: DocumentEmployeeList[]):ITable{
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

  extractData1(data: DocumentEmployeeList[]): TableRow1[] {
    return data.map(row=>[row.document_type, ''+row.procedure_cost, row.issue_date, row.expiration_date, row.observations]);
  }
}


