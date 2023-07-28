import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Company, LocationList, TypeCompany, Document, BankAccount, DocumentList } from '@shared/models/company.interface';
import { CompanyService } from '@displaypanel/services/business/company.service';
import { PlaceService } from '@displaypanel/services/business/place.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { AccountsComponent } from './components/accounts/accounts.component';
import { DocumentsComponent } from './components/documents/documents.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '@app/pages/auth/auth.service';
import { UserResponse } from '@app/shared/models/user.interface';
import { environment } from '@env/environment';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { PdfMakeWrapper, Table, Txt, Columns, Img } from 'pdfmake-wrapper';
import { ITable } from 'pdfmake-wrapper/lib/interfaces';

PdfMakeWrapper.setFonts(pdfFonts);
type TableRow = [ string, string, string ];
type TableRow1 = [ string, string, string, string, string ];
enum Action {
  EDIT = 'edit',
  NEW = 'new',
}

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  isedit: boolean;
  form: any;
  img: string ='';
  @ViewChild('scheduledOrdersPaginator') set paginator(pager:MatPaginator) {
    if (pager) this.dataSource.paginator = pager;
  }

  actionTODO = '';
  tdocument: any[] = [];
  message ='';
  companyform: any;
  location: LocationList[]=[];
  displayedColumns: string[] = [ 'idcompany', 'name', 'type_company', 'logo', 'ruc', 'location', 'address', 'email', 'phone' , 'tel_atcn_client', 'cell', 'default_load_type' ];
  dataSource = new MatTableDataSource();
  length = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [];
  Bankaccount: any[] = [];
  m: any = [];
  id:any;
  private isValidEmail = /\S+@\S+\.\S+/;

  constructor(
    private companySvc: CompanyService,
    private placeSvc: PlaceService,
    private fb: FormBuilder,
    private router: Router,
    private toastr: ToastrService,
    private dialog: MatDialog,
    private authSvc: AuthService,
  ) {
    this.isedit = false;
   }

  company: any;
  typecompany: TypeCompany[] = [];

  ngOnInit(): void {
    this.actionTODO = Action.NEW;
    this.CompanyForm();
    this.list();

  }

  fromdisable(is: boolean): void {
    if(is){
      this.companyform.controls['name'].disable();
      this.companyform.controls['logo'].disable();
      this.companyform.controls['ruc'].disable();
      this.companyform.controls['address'].disable();
      this.companyform.controls['email'].disable();
      this.companyform.controls['phone'].disable();
      this.companyform.controls['tel_atcn_client'].disable();
      this.companyform.controls['cell'].disable();
      this.companyform.controls['default_load_type'].disable();
      this.companyform.controls['idtype_company'].disable();
      this.companyform.controls['idlocation'].disable();
    }else{
      this.companyform.controls['name'].enable();
      this.companyform.controls['logo'].enable();
      this.companyform.controls['ruc'].enable();
      this.companyform.controls['address'].enable();
      this.companyform.controls['email'].enable();
      this.companyform.controls['phone'].enable();
      this.companyform.controls['tel_atcn_client'].enable();
      this.companyform.controls['cell'].enable();
      this.companyform.controls['default_load_type'].enable();
      this.companyform.controls['idtype_company'].enable();
      this.companyform.controls['idlocation'].enable();
    }
  }

  CompanyForm(): void {
    this.companyform = this.fb.group({
      name: [{value: '', disabled: true},[Validators.required, Validators.minLength(4)]],
      logo: [{value: '', disabled: true}],
      ruc: [{value: '', disabled: true},[Validators.required, Validators.minLength(10)]],
      address: [{value: '', disabled: true},[Validators.required, Validators.minLength(4)]],
      email: [{value: '', disabled: true},[Validators.required, Validators.minLength(4), Validators.pattern(this.isValidEmail)]],
      phone: [{value: '', disabled: true},[Validators.required, Validators.minLength(8)]],
      tel_atcn_client: [{value: '', disabled: true},[Validators.required, Validators.minLength(8)]],
      cell: [{value: '', disabled: true},[Validators.required, Validators.minLength(8)]],
      default_load_type: [{value: '', disabled: true},[Validators.required]],
      idtype_company: [{value: '', disabled: true},[Validators.required]],
      idlocation: [{value: '', disabled: true},[Validators.required]],
    });
    this.form = this.fb.group({
      profile: ['']
    });
  }

  list(): void {
    this.id = this.authSvc.userValue.idcompany;
    this.companySvc.GetIdCompany(this.authSvc.userValue.idcompany).subscribe(
      (company: Company) => {
        this.company = company;
        if(company.logo){
          this.img = environment.API_URL+company.logo;
        }else{
          this.img = './../../../../../../assets/noimage.png'
        }

        this.companyform.patchValue({
          name: company.name,
          logo: company.logo,
          ruc: company.ruc,
          address: company.address,
          email: company.email,
          phone: company.phone,
          tel_atcn_client: company.tel_atcn_client,
          cell: company.cell,
          default_load_type: company.default_load_type,
          idtype_company: company.idtype_company,
          idlocation: company.idlocation,
        });
        this.companyform.updateValueAndValidity();
      }
    );

    this.companySvc.GetTypeCompany().subscribe(
      typecountry=>{
        this.typecompany = typecountry;
      },
      err => console.error(err)
    );
    this.placeSvc.GetLocation().subscribe(
      location=>{
      this.location = location;
    },
    err => console.error(err)
    );
  }

  edit(is: boolean):boolean{
    this.fromdisable(this.isedit);
    this.isedit = !this.isedit;
    return this.isedit;
  }

  onOpenModal(): void {
    let dialogRef = this.dialog.open( AccountsComponent, {
      height: '500px',
      width: '2500px',
      hasBackdrop: true,
      disableClose: true,
      data: { title: 'Empresa', company: this.company },
    });
    dialogRef.afterClosed().subscribe(result => {
      // Update result after adding new user.
      //this.userSvc.getAll().subscribe((users) => {
        //this.dataSource.data = users;
      //});
    });
  }

  onOpenModal2(): void {
    let dialogRef = this.dialog.open( DocumentsComponent, {
      height: '500px',
      width: '3000px',
      hasBackdrop: true,
      disableClose: true,
      data: { title: 'Empresa', company: this.company },
    });
    dialogRef.afterClosed().subscribe(result => {
      // Update result after adding new user.
      //this.userSvc.getAll().subscribe((users) => {
        //this.dataSource.data = users;
      //});
    });
  }

  onChange(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.form.get('profile').setValue(file);
    }
  }

  save(): void{
    if(this.form.get('profile').value){
      const formData = new FormData();
      formData.append('name', this.companyform.value.name);
      formData.append('logo', this.form.get('profile').value);
      formData.append('ruc', this.companyform.value.ruc);
      formData.append('address', this.companyform.value.address);
      formData.append('email', this.companyform.value.email);
      formData.append('phone', this.companyform.value.phone);
      formData.append('tel_atcn_client', this.companyform.value.tel_atcn_client);
      formData.append('cell', this.companyform.value.cell);
      formData.append('default_load_type', this.companyform.value.default_load_type);
      formData.append('idtype_company', this.companyform.value.idtype_company);
      formData.append('idlocation', this.companyform.value.idlocation);
      const form = this.companyform.value;
      this.companySvc.PutCompany(formData, this.id).subscribe(res=>{
        this.m = res;
        this.toastr.warning(this.m.message, 'Actulizado',{
          timeOut: 3000,
        });
        this.router.navigate(['/displaypanel/business'])
      },err=>console.error(err));
    }else{
      const form = this.companyform.value;
      this.companySvc.PutCompany(form, this.id).subscribe(res=>{
        this.m = res;
        this.toastr.warning(this.m.message, 'Actulizado',{
          timeOut: 3000,
        });
        this.router.navigate(['/displaypanel/business'])
      },err=>console.error(err));
    }
  }

  async createPDF(){
    const type = this.typecompany.filter(res=>res.idtype_company === this.companyform.value.idtype_company);
    const locality = this.location.filter(res=> res.idlocation === this.companyform.value.idlocation);
    const pdf = new PdfMakeWrapper();
    this.companySvc.getCompanyAccount(this.id).subscribe(
      async (account: BankAccount[])=>{
        this.Bankaccount = account;
        pdf.add(new Columns([
          await new Img(this.img).fit([80,80]).width(120).build(),
          [
            new Columns([
              new Txt('RUC').width(65).bold().fontSize(14).end,
              new Txt(this.companyform.value.ruc).fontSize(14).end
            ]).end,
            new Columns([
              new Txt('Empresa:').width(65).bold().fontSize(14).end,
              new Txt(this.companyform.value.name).fontSize(14).end
            ]).end,
            new Columns([
              new Txt('Tipo:').width(65).bold().fontSize(14).end,
              new Txt(type[0].name).fontSize(14).end
            ]).end,
            new Columns([
              new Txt('Correo Electrónico:').width(130).bold().fontSize(14).end,
              new Txt(this.companyform.value.email).fontSize(14).end
            ]).end
          ]
        ]).end);
        pdf.add(new Columns([
          new Txt('Teléfono Principal:').bold().fontSize(14).width(130).end,
          new Txt(this.companyform.value.phone).fontSize(14).end,
          new Txt('Teléfono:').bold().fontSize(14).width(130).end,
          new Txt(this.companyform.value.tel_atcn_client).fontSize(14).end,
        ]).end);
        pdf.add(new Columns([
          new Txt('Teléfono Móvil:').bold().fontSize(14).width(130).end,
          new Txt(this.companyform.value.cell).fontSize(14).end
        ]).end);
        pdf.add(new Columns([
          new Txt('Localidad:').bold().fontSize(14).width(130).end,
          new Txt(locality[0].location).fontSize(14).end
        ]).end);
        pdf.add(new Columns([
          new Txt('Dirección:').bold().fontSize(14).width(130).end,
          new Txt(this.companyform.value.address).fontSize(14).end
        ]).end);
        pdf.add(new Txt('Cuentas Bancarias').alignment('left').fontSize(16).bold().italics().margin(5).end);
        pdf.add(this.createTable(this.Bankaccount));
        this.companySvc.GetDocumentCompany(this.id).subscribe(
          (document: DocumentList[])=>{
            pdf.add(new Txt('Documentos').alignment('left').fontSize(16).bold().italics().margin(5).end);
            pdf.add(this.createTable1(document));
            pdf.create().open();
        });
      },
      err => console.error(err)
    );
  }

  createTable(data: BankAccount[]):ITable{
    return new Table([
      [
        new Txt('Nombre Del Banco').bold().end,
        new Txt('N° Cuenta').bold().end,
        new Txt('Por Defecto').bold().end
      ],
      ...this.extractData(data)
    ])
    .widths(['*', 'auto', 100])
    .layout('lightHorizontalLines')
    .end;
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

  extractData(data: BankAccount[]): TableRow[] {
    return data.map(row=>[row.bank_name, row.account_number, this.defauld(row.default)]);
  }

  extractData1(data: DocumentList[]): TableRow1[] {
    return data.map(row=>[row.type_document, ''+row.cost_procedure, row.issue_date, row.expiration_date, row.observations]);
  }

  NombreDoc(id: number): string{
    let nom = '';
    this.companySvc.GetTypeDocuments().subscribe(
      res=>{
        this.tdocument = res;
        this.tdocument = this.tdocument.filter(res=>res.iddocument_type === id);
        nom = this.tdocument[0].name;
        console.log(nom);
        return this.tdocument[0].name;
      },(err)=>{
        console.log(err);
        return '';
      }
    );
    return '';

  }

  defauld(i: boolean): string {
    if(i){
      return 'si';
    }
    return 'no';
  }

  isvalid(field: string): boolean {
    return (this.companyform.get(field).invalid && (this.companyform.get(field).dirty || this.companyform.get(field).touched));
  }


  errorMessage(field: string): string {
    const  { errors }   = this.companyform.get(field);
    let minlenght = errors?.minlength?.requiredLength;
    if (errors) {
      const messages:any = {
        required: 'El campo es requerido',
        pattern: 'El correo Electronico no es Valido',
        minlength: `El valor ingresado es menor a ${ minlenght } carateres`,
      };
      const errorkey = Object.keys(errors).find(Boolean);
      return messages[errorkey|| ''];
    }
    return '';
  }
}
