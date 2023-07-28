import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { GuideService } from '@app/pages/displaypanel/services/guide/guide.service';
import { InvoiceType, Unit, GuideList, GuideListView } from '@app/shared/models/guide.interface';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-guidedetail',
  templateUrl: './guidedetail.component.html',
  styleUrls: ['./guidedetail.component.scss']
})
export class GuidedetailComponent implements OnInit{

  actionTODO = '';
  displayedColumns: string[] = ['idguide', 'company', 'location', 'client', 'actions'];
  dataSource = new MatTableDataSource();
  length = 0;
  pageSize = 10;
  pageSizeOptions: number[] = [];
  units!: Unit[];
  invoicetypes!: InvoiceType[];
  guidedetail!: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialog: MatDialog,
    private guideSvc: GuideService,
    private fb: FormBuilder
  ){}

  ngOnInit(): void {
    const guide: GuideList = this.data.guide;
    this.Form();
    this.list();

    this.guideSvc.GetGuideListView(guide.idguide).subscribe(
      (guidelist: GuideListView)=>{
        this.guidedetail.patchValue({
          tuition: guidelist.tuition,
          client: guidelist.client,
          identificationcard: guidelist.identificationcard,
          company: guidelist.company,
          ruc: guidelist.ruc,
          destinations: guidelist.destinations,
          location: guide.location
        });
        console.log(guidelist);
      },
      (err)=> console.error(err)
    );
    /**/
  }

  Form(): void {
    this.guidedetail = this.fb.group({
      tuition: [null,[]],
      client: [null,[]],
      identificationcard: [null,[]],
      company: [null,[]],
      ruc:  [null,[]],
      destinations: [null,[]],
      location: [null,[]]

    });
  }

  list(): void {
    this.guideSvc.GetUnit().subscribe(
      (units: Unit[])=>{
        this.units = units;
      },
      (err)=> console.log(err)
    );

    this.guideSvc.GetInvoiceType().subscribe(
      (invoicetypes: InvoiceType[])=>{
        this.invoicetypes = invoicetypes;
      },
      (err)=> console.error(err)
    );


  }

}
