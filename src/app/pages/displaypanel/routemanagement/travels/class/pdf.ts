import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { PdfMakeWrapper, Table, Txt, Columns, Img, ITable, Item, Stack, Canvas, Rect, Cell, Line } from 'pdfmake-wrapper';
import { Injectable } from '@angular/core';
import { Fixedcost, Report,Maintenamcecost, Extracost, ReportGuide, Bill } from '@app/shared/models/report.interface';
import { CompanyName } from '@app/shared/models/company.interface';
import { environment } from '@env/environment';
import { formatDate, Location } from '@angular/common';
PdfMakeWrapper.setFonts(pdfFonts);

@Injectable({
  providedIn: 'root'
})

export class PdfPrint {

  async pdf1(report: Report, company: CompanyName): Promise<void>{
    const date = new Date();
    const datefomat = formatDate(date,'yyyy-MM-dd  HH:mm','en');
    const img = environment.API_URL+company.logo;
    const pdf = new PdfMakeWrapper();
    //header
    pdf.add(new Columns([
      [
        new Item(
          await new Img(img).fit([80,80]).width(120).build(),
        ).alignment('left').end,
        new Txt(company.name).fontSize(9).bold().end,
        new Columns([
          new Txt('RUC:').width(25).bold().fontSize(9).end,
          new Txt(company.ruc).fontSize(9).end
        ]).end,
        new Txt(company.location).fontSize(8).end,
        new Txt(`${company.province} - ${company.country}`).fontSize(7).end,
      ],
      [
        new Stack([
          new Txt('Manifiesto').bold().fontSize(14).color('#3498DB').end,
          new Txt( `Codigo:  ${report.kms}`,).width(40).alignment('right').bold().fontSize(11).end,
          new Txt(`Fecha: ${datefomat}`).bold().fontSize(11).end,
        ]).alignment('right').end
      ]
    ]).end);
    pdf.add(
      new Table([['Datos del Viaje']])
      .widths(['*'])
      .margin([0,5,0,5])
      .alignment('center')
      .layout({
        fillColor: (rowIndex, node, columnIndex) =>{
          return rowIndex === 0 ? '#3498DB': '';
        },
        defaultBorder: false
      })
      .color('white')
      .fontSize(11)
      .bold().end
      //new Txt('Datos del Viaje').bold().alignment('center').width('*').fontSize(11).color('white').background('#2ECC71').absolutePosition(0,34).end
    );
    pdf.add(new Columns([
      new Columns([
        new Txt( 'Vehiculo:').width(60).bold().fontSize(11).end,
        new Txt(report.Vehicle).fontSize(11).end
      ]).end,
      new Columns([
        new Txt( 'Remolque:').width(65).bold().fontSize(11).end,
        new Txt(report.Trailer).fontSize(11).end
      ]).end
    ]).end);
    pdf.add(
      new Columns([
        new Txt('Conductor:').width(65).fontSize(11).bold().end,
        new Txt(report.employee).fontSize(11).end
      ]).margin([0,0,0,2]).end
    );
    pdf.add(
      new Columns([
        [
          new Txt( 'Remitente:').width(50).bold().fontSize(11).end,
          new Txt(company.name).fontSize(11).end
        ],[
          new Txt( 'Origen:').width(50).bold().fontSize(11).end,
          new Txt(report.origen).fontSize(11).end
        ]
      ]).margin([0,0,0,2]).end,
    );
    console.log(report.destinations);
    for(let i = 0; i < report.destinations.length; i++){
      pdf.add(
        new Columns([
          [
            new Txt( 'Destinatario:').width(50).bold().fontSize(11).end,
            new Txt(report.client[i]).fontSize(11).end
          ],[
            new Txt( 'Destino:').width(50).bold().fontSize(11).end,
            new Txt(report.destinations[i]).fontSize(11).end
          ]
        ]).end,
      );
    }
    pdf.add(
      new Table([['Datos del trayecto']])
      .widths(['*'])
      .margin([0,2,0,5])
      .alignment('center')
      .layout({
        fillColor: (rowIndex, node, columnIndex) =>{
          return rowIndex === 0 ? '#3498DB': '';
        },
        defaultBorder: false
      })
      .color('white')
      .fontSize(11)
      .bold().end
    );
    pdf.add(
      new Columns([
        new Txt('Tipo de carga:').width(80).bold().fontSize(11).end,
        new Txt(report.vehicle_use).fontSize(11).end,
      ]).end,
    );
    pdf.add(
      new Columns([
        new Columns([
          new Txt( 'Fecha de Salidad:').width(90).bold().fontSize(11).end,
          new Txt(report.datestart).fontSize(11).end,
        ]).end,
        new Columns([
          new Txt( 'Fecha de Llegada:').width(90).bold().fontSize(11).end,
          new Txt(report.dateend).fontSize(11).end,
        ]).end
      ]).end
    );
    pdf.add(
      new Columns([
        new Columns([
          new Txt( 'Kms de Recorrido:').width(100).bold().fontSize(11).end,
          new Txt(report.kms + ' Km').width(80).fontSize(11).end,
        ]).end,
        new Columns([
          new Txt( 'Kms de Desvio:').width(80).fontSize(11).bold().end,
          new Txt(report.kmsdes + ' Km').width(80).fontSize(11).end
        ]).end,
        new Columns([
          new Txt( 'Horas del Recorido:').width(100).fontSize(11).bold().end,
          new Txt(report.hours + 'h').width(80).fontSize(11).end
        ]).end
      ]).end
    );
    pdf.add(
      new Table([['Total']])
      .widths(['*'])
      .margin([0,2,0,5])
      .alignment('center')
      .layout({
        fillColor: (rowIndex, node, columnIndex) =>{
          return rowIndex === 0 ? '#3498DB': '';
        },
        defaultBorder: false
      })
      .color('white')
      .fontSize(11)
      .bold().end
    );
    pdf.add(
      new Columns([
        new Columns([
          new Txt( 'SubTotal:').width(80).bold().fontSize(11).end,
          report.subtotal
        ]).end,
        new Columns([
          new Txt( 'Porcentaje de Ganancia:').width(140).bold().fontSize(11).end,
          report.percentage + ' %',
        ]).end
      ]).end
    );
    pdf.add(
      new Columns([
        new Columns([
          new Txt( 'Total:').width(80).bold().fontSize(11).end,
          report.total
        ]).end,
        new Columns([
          new Txt( 'Rentabilidad:').width(90).bold().fontSize(11).end,
          report.profitability,
        ]).end
      ]).end
    );
    pdf.add(
      new Table([['Costos Fijos']])
      .widths(['*'])
      .margin([0,2,0,5])
      .alignment('center')
      .layout({
        fillColor: (rowIndex, node, columnIndex) =>{
          return rowIndex === 0 ? '#3498DB': '';
        },
        defaultBorder: false
      })
      .color('white')
      .fontSize(11)
      .bold().end
    );
    pdf.add(this.createTableFixedcost(report.fixedcost));
    pdf.add(
      new Table([['Costos de Mantenimiento']])
      .widths(['*'])
      .margin([0,2,0,5])
      .alignment('center')
      .layout({
        fillColor: (rowIndex, node, columnIndex) =>{
          return rowIndex === 0 ? '#3498DB': '';
        },
        defaultBorder: false
      })
      .color('white')
      .fontSize(11)
      .bold().end
    );
    pdf.add(this.createTableMaintenamceCost(report.maintenamcecost));
    pdf.add(
      new Table([['Costos Extras']])
      .widths(['*'])
      .margin([0,2,0,5])
      .alignment('center')
      .layout({
        fillColor: (rowIndex, node, columnIndex) =>{
          return rowIndex === 0 ? '#3498DB': '';
        },
        defaultBorder: false
      })
      .color('white')
      .fontSize(11)
      .bold().end
    );
    pdf.add(this.createTableExtracost(report.extracost));
    pdf.create().open();
  }

  pdf2(report: ReportGuide[]): void{
    const date = new Date();
    const datefomat = formatDate(date,'EEEE, d MMMM y','es-EC');
    const pdf = new PdfMakeWrapper();
    for (const item of report) {
      let n1 =0;
      let n2 =0;
      let n3 =0;
      let n4 =0;
      let n5 =0;
      let n6 =0;
      for(const i of item.bill){
        if(i.concepts === 'DIESEL'){
          n1 = i.amount;
        }
        if(i.concepts === 'PEAJE'){
          n2 = i.amount;
        }
        if(i.concepts === 'VIÁTICOS'){
          n3 = i.amount;
        }
        if(i.concepts === 'PESAS Y BALANZA'){
          n4 = i.amount;
        }
        if(i.concepts === 'CARGUE Y DESCARGUE'){
          n5 = i.amount;
        }
        if(i.concepts === 'CARAVANA'){
          n6 = i.amount;
        }
      }
      pdf.add(
        new Columns([
          new Stack([
            new Table([[`Recepción de GUÍA 000${item.guia}`]])
            .widths(['*'])
            .margin([0,2,0,5])
            .alignment('center')
            .layout({
              fillColor: (rowIndex, node, columnIndex) =>{
                return rowIndex === 0 ? '#3498DB': '';
              },
              defaultBorder: false
            })
            .color('white')
            .fontSize(9)
            .bold().end,
            new Columns([
              new Txt('fecha:').width(30).bold().fontSize(9).end,
              new Txt(datefomat).fontSize(9).end
            ]).end,
            new Table([['Datos de origen:'],['']])
            .widths(['*'])
            .margin([0,2,0,0])
            .alignment('left')
            .layout('lightHorizontalLines')
            .fontSize(9)
            .bold().end,
            new Columns([
              new Txt('Fecha de Llegada:').width(100).bold().fontSize(9).end,
              new Txt(item.dateend).fontSize(9).end
            ]).end,
            new Columns([
              new Txt('Guía principal:').width(100).bold().fontSize(9).end,
              new Txt('000'+item.guia).fontSize(9).end
            ]).end,
            new Columns([
              new Txt('Ruta:').width(50).bold().fontSize(9).end,
              new Txt(`${item.location} / ${item.destinations}`).fontSize(9).end
            ]).end,
            new Columns([
              new Txt('Tipo de Carga:').width(80).bold().fontSize(9).end,
              new Txt(item.vehicle_use).fontSize(9).end
            ]).end,
            new Columns([
              new Txt('Origen:').width(50).bold().fontSize(9).end,
              new Txt(item.location).fontSize(9).end
            ]).end,
            new Columns([
              new Txt('Cliente:').width(50).bold().fontSize(9).end,
              new Txt(item.client).fontSize(9).end
            ]).end,
            new Table([['Relacion de Gastos:'],['']])
            .widths(['*'])
            .margin([0,2,0,0])
            .alignment('left')
            .layout('lightHorizontalLines')
            .fontSize(9)
            .bold().end,
            new Columns([
              [
                new Columns([
                  new Txt('DIESEL:').width('auto').bold().fontSize(9).end,
                  new Txt(`${n1}`).fontSize(9).end
                ]).end,
              ],
              [
                new Columns([
                  new Txt('PEAJE:').width('auto').bold().fontSize(9).end,
                  new Txt(`${n2}`).fontSize(9).end
                ]).end,
              ],
              [
                new Columns([
                  new Txt('VIÁTICOS:').width('auto').bold().fontSize(9).end,
                  new Txt(`${n3}`).fontSize(9).end
                ]).end,
              ]
            ]).end,
            new Columns([
              [
                new Columns([
                  new Txt('PESAS(BALANZA):').width('auto').bold().fontSize(9).end,
                  new Txt(`${n4}`).fontSize(9).end
                ]).end,
              ],
              [
                new Columns([
                  new Txt('CARGUE/DESCARGUE:').width('auto').bold().fontSize(9).end,
                  new Txt(`${n4}`).fontSize(9).end
                ]).end,
              ],
              [
                new Columns([
                  new Txt('	CARAVANA:').width('auto').bold().fontSize(9).end,
                  new Txt(`${n6}`).fontSize(9).end
                ]).end,
              ]
            ]).end,
            new Columns([
              new Txt('Total Gastos:').width('auto').bold().fontSize(9).end,
              new Txt(`${item.totalbill}`).fontSize(9).end
            ]).end,
            new Table([['Datos del Empleado y Vehículo:'],['']])
            .widths(['*'])
            .margin([0,2,0,0])
            .alignment('left')
            .layout('lightHorizontalLines')
            .fontSize(9)
            .bold().end,
            new Columns([
              new Txt('Conductor:').width(70).bold().fontSize(9).end,
              new Txt(item.employee).fontSize(9).end
            ]).end,
            new Columns([
              [
                new Columns([
                  new Txt('Vehiculo:').width(60).bold().fontSize(9).end,
                  new Txt(item.Vehicle).fontSize(9).end
                ]).end,
              ],
              [
                new Columns([
                  new Txt('Remolque:').width(60).bold().fontSize(9).end,
                  new Txt(item.Trailer).fontSize(9).end
                ]).end,
              ]
            ]).end,
            new Table([['Datos de destino:'],['']])
            .widths(['*'])
            .margin([0,2,0,0])
            .alignment('left')
            .layout('lightHorizontalLines')
            .fontSize(9)
            .bold().end,
            new Columns([
              new Txt('Destino:').width(50).bold().fontSize(9).end,
              new Txt(item.destinations).fontSize(9).end
            ]).end,
            new Columns([
              [
                new Columns([
                  new Txt('Fecha de Salidad:').width(90).bold().fontSize(9).end,
                  new Txt(item.datestart).fontSize(9).end
                ]).end,
              ],
              [
                new Columns([
                  new Txt('Duración:').width(50).bold().fontSize(9).end,
                  new Txt(item.hours).fontSize(9).end
                ]).end,
              ]
            ]).end,
            new Txt('ORIGINAL-ORIGINAL ORIGINAL-ORIGINAL ORIGINAL-ORIGINAL ORIGINAL-ORIGINAL').alignment('center').fontSize(9).end
          ]).margin([5,0,5,0]).end,
          //copia
          new Stack([
            new Table([[`Recepción de GUÍA 000${item.guia}`]])
            .widths(['*'])
            .margin([0,2,0,5])
            .alignment('center')
            .layout({
              fillColor: (rowIndex, node, columnIndex) =>{
                return rowIndex === 0 ? '#3498DB': '';
              },
              defaultBorder: false
            })
            .color('white')
            .fontSize(9)
            .bold().end,
            new Columns([
              new Txt('fecha:').width(30).bold().fontSize(9).end,
              new Txt(datefomat).fontSize(9).end
            ]).end,
            new Table([['Datos de origen:'],['']])
            .widths(['*'])
            .margin([0,2,0,0])
            .alignment('left')
            .layout('lightHorizontalLines')
            .fontSize(9)
            .bold().end,
            new Columns([
              new Txt('Fecha de Llegada:').width(100).bold().fontSize(9).end,
              new Txt(item.dateend).fontSize(9).end
            ]).end,
            new Columns([
              new Txt('Guía principal:').width(100).bold().fontSize(9).end,
              new Txt('000'+item.guia).fontSize(9).end
            ]).end,
            new Columns([
              new Txt('Ruta:').width(50).bold().fontSize(9).end,
              new Txt(`${item.location} / ${item.destinations}`).fontSize(9).end
            ]).end,
            new Columns([
              new Txt('Tipo de Carga:').width(80).bold().fontSize(9).end,
              new Txt(item.vehicle_use).fontSize(9).end
            ]).end,
            new Columns([
              new Txt('Origen:').width(50).bold().fontSize(9).end,
              new Txt(item.location).fontSize(9).end
            ]).end,
            new Columns([
              new Txt('Cliente:').width(50).bold().fontSize(9).end,
              new Txt(item.client).fontSize(9).end
            ]).end,
            new Table([['Relacion de Gastos:'],['']])
            .widths(['*'])
            .margin([0,2,0,0])
            .alignment('left')
            .layout('lightHorizontalLines')
            .fontSize(9)
            .bold().end,
            new Columns([
              [
                new Columns([
                  new Txt('DIESEL:').width('auto').bold().fontSize(9).end,
                  new Txt(`${n1}`).fontSize(9).end
                ]).end,
              ],
              [
                new Columns([
                  new Txt('PEAJE:').width('auto').bold().fontSize(9).end,
                  new Txt(`${n2}`).fontSize(9).end
                ]).end,
              ],
              [
                new Columns([
                  new Txt('VIÁTICOS:').width('auto').bold().fontSize(9).end,
                  new Txt(`${n3}`).fontSize(9).end
                ]).end,
              ]
            ]).end,
            new Columns([
              [
                new Columns([
                  new Txt('PESAS(BALANZA):').width('auto').bold().fontSize(9).end,
                  new Txt(`${n4}`).fontSize(9).end
                ]).end,
              ],
              [
                new Columns([
                  new Txt('CARGUE/DESCARGUE:').width('auto').bold().fontSize(9).end,
                  new Txt(`${n4}`).fontSize(9).end
                ]).end,
              ],
              [
                new Columns([
                  new Txt('	CARAVANA:').width('auto').bold().fontSize(9).end,
                  new Txt(`${n6}`).fontSize(9).end
                ]).end,
              ]
            ]).end,
            new Columns([
              new Txt('Total Gastos:').width('auto').bold().fontSize(9).end,
              new Txt(`${item.totalbill}`).fontSize(9).end
            ]).end,
            new Table([['Datos del Empleado y Vehículo:'],['']])
            .widths(['*'])
            .margin([0,2,0,0])
            .alignment('left')
            .layout('lightHorizontalLines')
            .fontSize(9)
            .bold().end,
            new Columns([
              new Txt('Conductor:').width(70).bold().fontSize(9).end,
              new Txt(item.employee).fontSize(9).end
            ]).end,
            new Columns([
              [
                new Columns([
                  new Txt('Vehiculo:').width(60).bold().fontSize(9).end,
                  new Txt(item.Vehicle).fontSize(9).end
                ]).end,
              ],
              [
                new Columns([
                  new Txt('Remolque:').width(60).bold().fontSize(9).end,
                  new Txt(item.Trailer).fontSize(9).end
                ]).end,
              ]
            ]).end,
            new Table([['Datos de destino:'],['']])
            .widths(['*'])
            .margin([0,2,0,0])
            .alignment('left')
            .layout('lightHorizontalLines')
            .fontSize(9)
            .bold().end,
            new Columns([
              new Txt('Destino:').width(50).bold().fontSize(9).end,
              new Txt(item.destinations).fontSize(9).end
            ]).end,
            new Columns([
              [
                new Columns([
                  new Txt('Fecha de Salidad:').width(90).bold().fontSize(9).end,
                  new Txt(item.datestart).fontSize(9).end
                ]).end,
              ],
              [
                new Columns([
                  new Txt('Duración:').width(50).bold().fontSize(9).end,
                  new Txt(item.hours).fontSize(9).end
                ]).end,
              ]
            ]).end,
            new Txt('COPIA-COPIA COPIA-COPIA COPIA-COPIA COPIA-COPIA COPIA-COPIA COPIA-COPIA COPIA').alignment('center').fontSize(9).end
          ]).margin([5,0,5,0]).end,
        ]).end
      );
      pdf.add(
        new Columns([
          new Stack([
            new Table([[`Recepción de GUÍA 000${item.guia}`]])
            .widths(['*'])
            .margin([0,2,0,5])
            .alignment('center')
            .layout({
              fillColor: (rowIndex, node, columnIndex) =>{
                return rowIndex === 0 ? '#3498DB': '';
              },
              defaultBorder: false
            })
            .color('white')
            .fontSize(9)
            .bold().end,
            new Columns([
              new Txt('fecha:').width(30).bold().fontSize(9).end,
              new Txt(datefomat).fontSize(9).end
            ]).end,
            new Table([['Datos de origen:'],['']])
            .widths(['*'])
            .margin([0,2,0,0])
            .alignment('left')
            .layout('lightHorizontalLines')
            .fontSize(9)
            .bold().end,
            new Columns([
              new Txt('Fecha de Llegada:').width(100).bold().fontSize(9).end,
              new Txt(item.dateend).fontSize(9).end
            ]).end,
            new Columns([
              new Txt('Guía principal:').width(100).bold().fontSize(9).end,
              new Txt('000'+item.guia).fontSize(9).end
            ]).end,
            new Columns([
              new Txt('Ruta:').width(50).bold().fontSize(9).end,
              new Txt(`${item.location} / ${item.destinations}`).fontSize(9).end
            ]).end,
            new Columns([
              new Txt('Tipo de Carga:').width(80).bold().fontSize(9).end,
              new Txt(item.vehicle_use).fontSize(9).end
            ]).end,
            new Columns([
              new Txt('Origen:').width(50).bold().fontSize(9).end,
              new Txt(item.location).fontSize(9).end
            ]).end,
            new Columns([
              new Txt('Cliente:').width(50).bold().fontSize(9).end,
              new Txt(item.client).fontSize(9).end
            ]).end,
            new Table([['Relacion de Gastos:'],['']])
            .widths(['*'])
            .margin([0,2,0,0])
            .alignment('left')
            .layout('lightHorizontalLines')
            .fontSize(9)
            .bold().end,
            new Columns([
              [
                new Columns([
                  new Txt('DIESEL:').width('auto').bold().fontSize(9).end,
                  new Txt(`${n1}`).fontSize(9).end
                ]).end,
              ],
              [
                new Columns([
                  new Txt('PEAJE:').width('auto').bold().fontSize(9).end,
                  new Txt(`${n2}`).fontSize(9).end
                ]).end,
              ],
              [
                new Columns([
                  new Txt('VIÁTICOS:').width('auto').bold().fontSize(9).end,
                  new Txt(`${n3}`).fontSize(9).end
                ]).end,
              ]
            ]).end,
            new Columns([
              [
                new Columns([
                  new Txt('PESAS(BALANZA):').width('auto').bold().fontSize(9).end,
                  new Txt(`${n4}`).fontSize(9).end
                ]).end,
              ],
              [
                new Columns([
                  new Txt('CARGUE/DESCARGUE:').width('auto').bold().fontSize(9).end,
                  new Txt(`${n4}`).fontSize(9).end
                ]).end,
              ],
              [
                new Columns([
                  new Txt('	CARAVANA:').width('auto').bold().fontSize(9).end,
                  new Txt(`${n6}`).fontSize(9).end
                ]).end,
              ]
            ]).end,
            new Columns([
              new Txt('Total Gastos:').width('auto').bold().fontSize(9).end,
              new Txt(`${item.totalbill}`).fontSize(9).end
            ]).end,
            new Table([['Datos del Empleado y Vehículo:'],['']])
            .widths(['*'])
            .margin([0,2,0,0])
            .alignment('left')
            .layout('lightHorizontalLines')
            .fontSize(9)
            .bold().end,
            new Columns([
              new Txt('Conductor:').width(70).bold().fontSize(9).end,
              new Txt(item.employee).fontSize(9).end
            ]).end,
            new Columns([
              [
                new Columns([
                  new Txt('Vehiculo:').width(60).bold().fontSize(9).end,
                  new Txt(item.Vehicle).fontSize(9).end
                ]).end,
              ],
              [
                new Columns([
                  new Txt('Remolque:').width(60).bold().fontSize(9).end,
                  new Txt(item.Trailer).fontSize(9).end
                ]).end,
              ]
            ]).end,
            new Table([['Datos de destino:'],['']])
            .widths(['*'])
            .margin([0,2,0,0])
            .alignment('left')
            .layout('lightHorizontalLines')
            .fontSize(9)
            .bold().end,
            new Columns([
              new Txt('Destino:').width(50).bold().fontSize(9).end,
              new Txt(item.destinations).fontSize(9).end
            ]).end,
            new Columns([
              [
                new Columns([
                  new Txt('Fecha de Salidad:').width(90).bold().fontSize(9).end,
                  new Txt(item.datestart).fontSize(9).end
                ]).end,
              ],
              [
                new Columns([
                  new Txt('Duración:').width(50).bold().fontSize(9).end,
                  new Txt(item.hours).fontSize(9).end
                ]).end,
              ]
            ]).end,
            new Txt('ORIGINAL-ORIGINAL ORIGINAL-ORIGINAL ORIGINAL-ORIGINAL ORIGINAL-ORIGINAL').alignment('center').fontSize(9).end
          ]).margin([5,0,5,0]).end,
          //copia
          new Stack([
            new Table([[`Recepción de GUÍA 000${item.guia}`]])
            .widths(['*'])
            .margin([0,2,0,5])
            .alignment('center')
            .layout({
              fillColor: (rowIndex, node, columnIndex) =>{
                return rowIndex === 0 ? '#3498DB': '';
              },
              defaultBorder: false
            })
            .color('white')
            .fontSize(9)
            .bold().end,
            new Columns([
              new Txt('fecha:').width(30).bold().fontSize(9).end,
              new Txt(datefomat).fontSize(9).end
            ]).end,
            new Table([['Datos de origen:'],['']])
            .widths(['*'])
            .margin([0,2,0,0])
            .alignment('left')
            .layout('lightHorizontalLines')
            .fontSize(9)
            .bold().end,
            new Columns([
              new Txt('Fecha de Llegada:').width(100).bold().fontSize(9).end,
              new Txt(item.dateend).fontSize(9).end
            ]).end,
            new Columns([
              new Txt('Guía principal:').width(100).bold().fontSize(9).end,
              new Txt('000'+item.guia).fontSize(9).end
            ]).end,
            new Columns([
              new Txt('Ruta:').width(50).bold().fontSize(9).end,
              new Txt(`${item.location} / ${item.destinations}`).fontSize(9).end
            ]).end,
            new Columns([
              new Txt('Tipo de Carga:').width(80).bold().fontSize(9).end,
              new Txt(item.vehicle_use).fontSize(9).end
            ]).end,
            new Columns([
              new Txt('Origen:').width(50).bold().fontSize(9).end,
              new Txt(item.location).fontSize(9).end
            ]).end,
            new Columns([
              new Txt('Cliente:').width(50).bold().fontSize(9).end,
              new Txt(item.client).fontSize(9).end
            ]).end,
            new Table([['Relacion de Gastos:'],['']])
            .widths(['*'])
            .margin([0,2,0,0])
            .alignment('left')
            .layout('lightHorizontalLines')
            .fontSize(9)
            .bold().end,
            new Columns([
              [
                new Columns([
                  new Txt('DIESEL:').width('auto').bold().fontSize(9).end,
                  new Txt(`${n1}`).fontSize(9).end
                ]).end,
              ],
              [
                new Columns([
                  new Txt('PEAJE:').width('auto').bold().fontSize(9).end,
                  new Txt(`${n2}`).fontSize(9).end
                ]).end,
              ],
              [
                new Columns([
                  new Txt('VIÁTICOS:').width('auto').bold().fontSize(9).end,
                  new Txt(`${n3}`).fontSize(9).end
                ]).end,
              ]
            ]).end,
            new Columns([
              [
                new Columns([
                  new Txt('PESAS(BALANZA):').width('auto').bold().fontSize(9).end,
                  new Txt(`${n4}`).fontSize(9).end
                ]).end,
              ],
              [
                new Columns([
                  new Txt('CARGUE/DESCARGUE:').width('auto').bold().fontSize(9).end,
                  new Txt(`${n4}`).fontSize(9).end
                ]).end,
              ],
              [
                new Columns([
                  new Txt('	CARAVANA:').width('auto').bold().fontSize(9).end,
                  new Txt(`${n6}`).fontSize(9).end
                ]).end,
              ]
            ]).end,
            new Columns([
              new Txt('Total Gastos:').width('auto').bold().fontSize(9).end,
              new Txt(`${item.totalbill}`).fontSize(9).end
            ]).end,
            new Table([['Datos del Empleado y Vehículo:'],['']])
            .widths(['*'])
            .margin([0,2,0,0])
            .alignment('left')
            .layout('lightHorizontalLines')
            .fontSize(9)
            .bold().end,
            new Columns([
              new Txt('Conductor:').width(70).bold().fontSize(9).end,
              new Txt(item.employee).fontSize(9).end
            ]).end,
            new Columns([
              [
                new Columns([
                  new Txt('Vehiculo:').width(60).bold().fontSize(9).end,
                  new Txt(item.Vehicle).fontSize(9).end
                ]).end,
              ],
              [
                new Columns([
                  new Txt('Remolque:').width(60).bold().fontSize(9).end,
                  new Txt(item.Trailer).fontSize(9).end
                ]).end,
              ]
            ]).end,
            new Table([['Datos de destino:'],['']])
            .widths(['*'])
            .margin([0,2,0,0])
            .alignment('left')
            .layout('lightHorizontalLines')
            .fontSize(9)
            .bold().end,
            new Columns([
              new Txt('Destino:').width(50).bold().fontSize(9).end,
              new Txt(item.destinations).fontSize(9).end
            ]).end,
            new Columns([
              [
                new Columns([
                  new Txt('Fecha de Salidad:').width(90).bold().fontSize(9).end,
                  new Txt(item.datestart).fontSize(9).end
                ]).end,
              ],
              [
                new Columns([
                  new Txt('Duración:').width(50).bold().fontSize(9).end,
                  new Txt(item.hours).fontSize(9).end
                ]).end,
              ]
            ]).end,
            new Txt('COPIA-COPIA COPIA-COPIA COPIA-COPIA COPIA-COPIA COPIA-COPIA COPIA-COPIA COPIA').alignment('center').fontSize(9).end
          ]).margin([5,0,5,0]).end,
        ]).end
      );
    }
    pdf.pageMargins([10,20,20,10]);
    pdf.pageOrientation('landscape');
    pdf.create().open();
  }

  async pdf3(company: CompanyName): Promise<void>{
    const pdf = new PdfMakeWrapper();
    const img = environment.API_URL+company.logo;
    pdf.add(new Columns([
      new Stack([
        await new Img(img).fit([80,80]).width(120).build(),
        new Txt(company.name).fontSize(9).bold().end,
        new Columns([
          new Txt('RUC:').width(25).bold().fontSize(9).end,
          new Txt(company.ruc).fontSize(9).end
        ]).end,
        new Txt(company.location).fontSize(8).end,
        new Txt(`${company.province} - ${company.country}`).fontSize(7).end,
      ]).alignment('left').end,
      new Table([
        [
          new Txt('R.U.C').alignment('right').bold().end,
          new Txt(company.ruc).end
        ],
        [new Cell(
          new Stack([
            new Txt('GUÍA DE REMISIÓN').bold().alignment('center').end,
            new Txt('0001').bold().alignment('center').end,
          ]).end,
        ).colSpan(2).end],
        [
          new Txt('AUT. SRI:').bold().alignment('right').end,
          new Txt('').end
        ]
      ]).widths(['auto','*']).layout({
        hLineWidth: (rowIndex, node, columnIndex) =>{
            return (rowIndex === 0  || rowIndex === node.table.body.length) ? 0: 1;
        },
        vLineWidth: (rowIndex, node, columnIndex) =>{
          return (rowIndex === 0  || rowIndex === node.table.body.length) ? 0: 1;
        },
        hLineColor: (rowIndex, node, columnIndex) =>{
            return (rowIndex === 0  || rowIndex === node.table.body.length) ? 'black' : 'gray';
        },
        vLineColor: (rowIndex, node, columnIndex) =>{
          return (rowIndex === 0  || rowIndex === node.table.body.length) ? 'black' : 'gray';
        },
      }).margin([0,10,0,0]).end
    ]).end);
    pdf.add(
      new Canvas([
        new Rect([298, 50], [257, 72]).round(7).lineColor('black').end
      ]).absolutePosition(0, 0).end
    );
    pdf.add(new Canvas([
      new Line([10, 10], [500, 10]).lineColor('#3498DB').lineWidth(4).end
    ]).end);
    pdf.add(
      new Columns([
        new Columns([
          new Txt('FECHA INICIO DE TRASLADO:').width('auto').fontSize(11).bold().end,
          new Txt('10/10/1200').width('auto').fontSize(11).end,
        ]).end,
        new Columns([
          new Txt('FECHA TERMINACIÓN DE TRASLADO:').fontSize(11).width('auto').bold().end,
          new Txt('10/10/1200').width('auto').fontSize(11).end,
        ]).end
      ]).margin([0,5,0,0]).end
    );
    pdf.add(new Canvas([
      new Line([10, 10], [500, 10]).lineColor('#3498DB').lineWidth(4).end
    ]).end);
    pdf.add(new Txt('DATOS DE COMPROBANTE DE VENTA').fontSize(8).bold().margin([0,5,0,0]).end);
    pdf.add(
      new Columns([
        new Txt('TIPO:').width('auto').fontSize(11).bold().end,
        new Txt('10/10/1200').width('auto').fontSize(11).end,
      ]).end
    );
    pdf.add(
      new Columns([
        new Columns([
          new Txt('No. AUTORIZACIÓN:').width('auto').fontSize(11).bold().end,
          new Txt('10/10/1200').width('auto').fontSize(11).end,
        ]).end,
        new Columns([
          new Txt('No. DEL COMPROBANTE:').width('auto').fontSize(11).bold().end,
          new Txt('10/10/1200').width('auto').fontSize(11).end,
        ]).end
      ]).end
    );
    pdf.add(new Canvas([
      new Line([10, 10], [500, 10]).lineColor('#3498DB').lineWidth(4).end
    ]).end);
    pdf.add(
      new Columns([
        new Txt('NÚMERO DE DECLARACIÓN ADUANERA:').width('auto').fontSize(11).bold().end,
        new Txt('10/10/1200').width('auto').fontSize(11).end,
      ]).margin([0,5,0,0]).end
    );
    pdf.add(
      new Columns([
        new Txt('MOTIVO DEL TRASLADO:').width('auto').fontSize(11).bold().end,
        new Txt('10/10/1200').width('auto').fontSize(11).end,
      ]).end
    );
    pdf.add(
      new Columns([
        new Columns([
          new Txt('PUNTO DE PARTIDA:').width('auto').fontSize(11).bold().end,
          new Txt('10/10/1200').width('auto').fontSize(11).end,
        ]).end,
        new Columns([
          new Txt('DESTINO (PUNTO DE LLEGADA):').fontSize(11).width('auto').bold().end,
          new Txt('10/10/1200').width('auto').fontSize(11).end,
        ]).end
      ]).end
    );
    pdf.add(new Canvas([
      new Line([10, 10], [500, 10]).lineColor('#3498DB').lineWidth(4).end
    ]).end);
    pdf.add(
      new Columns([
        new Stack([
          new Txt('IDENTIFICACIÓN DEL DESTINATARIO').alignment('center').bold().fontSize(8).end,
          new Columns([
            new Txt('R.U.C / C.I.:').width('auto').bold().fontSize(11).end,
            new Txt('10/10/1200').width('auto').fontSize(11).end,
          ]).end,
          new Columns([
            new Txt('RAZÓN SOCIAL:').width('auto').fontSize(11).bold().end,
            new Txt('10/10/1200').width('auto').fontSize(11).end,
          ]).end
        ]).end,
        new Stack([
          new Txt('IDENTIFICACIÓN DEL TRANSPORTISTA').alignment('center').bold().fontSize(8).end,
          new Columns([
            new Txt('R.U.C / C.I.').width('auto').bold().fontSize(11).end,
            new Txt('10/10/1200').width('auto').fontSize(11).end,
          ]).end,
          new Columns([
            new Txt('RAZÓN SOCIAL:').width('auto').bold().fontSize(11).end,
            new Txt('10/10/1200').width('auto').fontSize(11).end,
          ]).end,
          new Columns([
            new Txt('PLACA:').width('auto').bold().fontSize(11).end,
            new Txt('10/10/1200').width('auto').fontSize(11).end,
          ]).end
        ]).end,
      ]).margin([0,5,0,0]).end
    );
    pdf.add(
      new Columns([
        new Txt('IDENTIFICACIÓN DEL REMITENTE:').width('auto').fontSize(11).bold().end,
        new Txt('10/10/1200').width('auto').fontSize(11).end,
      ]).end
    );
    pdf.add(this.createTableGuide());
    pdf.create().open();
  }

  pdf4(): void{
    const pdf = new PdfMakeWrapper();
    pdf.add('hola mundo 3');
    pdf.create().open();
    console.log('3');
  }

  pdf5(): void{
    const pdf = new PdfMakeWrapper();
    pdf.add('hola mundo 3');
    pdf.create().open();
    console.log('3');
  }

  pdf6(): void{
    const pdf = new PdfMakeWrapper();
    pdf.add('hola mundo 3');
    pdf.create().open();
    console.log('3');
  }

  pdf7(): void{
    const pdf = new PdfMakeWrapper();
    pdf.add('hola mundo 3');
    pdf.create().open();
    console.log('3');
  }

  pdf8(): void{
    const pdf = new PdfMakeWrapper();
    pdf.add('hola mundo 3');
    pdf.create().open();
    console.log('3');
  }

  createTableFixedcost(data: Fixedcost):ITable{
    return new Table([
      [
        new Txt('NOMBRE').bold().end,
        new Txt('COSTO ANUAL').bold().end,
        new Txt('MES').bold().end,
        new Txt('COSTO KM').bold().end
      ],
      [
        new Txt('Sueldos y prestaciones sociales').bold().end,
        data.salaryA,
        data.salary,
        data.salaryKm
      ],
      [
        new Txt('Garaje').bold().end,
        data.garageA,
        data.garage,
        data.garageKm
      ],
      [
        new Txt('Matriculación vehicular (impuesto ambiental, cabezal, plataforma, otros)').bold().end,
        data.registrationA,
        data.registration,
        data.registrationKm
      ],
      [
        new Txt('Seguros: vehículos, carga').bold().end,
        data.sureA,
        data.sure,
        data.sureKm
      ],
      [
        new Txt('Revisiones técnicas').bold().end,
        data.revisionA,
        data.revision,
        data.revisionKm
      ],
      [
        new Txt('Gastos administrativos (contribuciones filiales, gastos de representación)').bold().end,
        data.billsA,
        data.bills,
        data.billsKm
      ],
      [
        new Txt('Servicios Básicos (luz, agua, teléfono convencional - celular, internet)').bold().end,
        data.servicesA,
        data.services,
        data.servicesKm
      ],
      [
        new Txt('Costos financieros (cuota interés letra vehículo)').bold().end,
        data.costsA,
        data.costs,
        data.costsKm
      ],
      [
        new Txt('Depreciación del vehículo').bold().end,
        data.depreciationsA,
        data.depreciations,
        data.depreciationsKm
      ],
      [
        new Txt('Permisos y habilitaciones').bold().end,
        data.permissionsA,
        data.permissions,
        data.permissionsKm
      ],
      [
        new Txt('Rastreo satelital GPS').bold().end,
        data.gpsA,
        data.gps,
        data.gpsKm
      ],
      [
        new Txt('Póliza andina').bold().end,
        data.policiesA,
        data.policies,
        data.policiesKm
      ],
      [
        '',
        '',
        new Txt('Total').bold().end,
        data.total
      ],
    ])
    .widths(['*', 'auto', 'auto','auto'])
    .layout('lightHorizontalLines')
    .end;
  }

  createTableMaintenamceCost(data: Maintenamcecost):ITable{
    return new Table([
      [
        new Txt('NOMBRE').bold().end,
        new Txt('COSTO ANUAL').bold().end,
        new Txt('COSTO MES').bold().end,
        new Txt('COSTO KM').bold().end
      ],
      [
        new Txt('LLANTAS Y ALINEACIÓN').bold().end,
        data.tirealignmentA,
        data.tirealignment,
        data.tirealignmentKm
      ],
      [
        new Txt('MANTENIMIENTO ORDINARIO').bold().end,
        data.ordinarymaintenanceA,
        data.ordinarymaintenance,
        data.ordinarymaintenanceKm
      ],
      [
        new Txt('SISTEMA ELÉCTRICO').bold().end,
        data.electricsystemA,
        data.electricsystem,
        data.electricsystemKm
      ],
      [
        new Txt('SISTEMA DE FRENOS').bold().end,
        data.brakingsystemA,
        data.brakingsystem,
        data.brakingsystemKm
      ],
      [
        new Txt('SUSPENSIÓN').bold().end,
        data.suspensionA,
        data.suspension,
        data.suspensionKm
      ],
      [
        new Txt('SISTEMA DE TRANSMISIÓN').bold().end,
        data.transmissionsystemA,
        data.transmissionsystem,
        data.transmissionsystemKm
      ],
      [
        new Txt('REPARACIÓN DE MOTOR').bold().end,
        data.enginerepairA,
        data.enginerepair,
        data.enginerepairKm
      ],
      [
        '',
        '',
        new Txt('TOTAL').bold().end,
        data.total
      ]
    ])
    .widths(['*', 'auto', 'auto','auto'])
    .layout('lightHorizontalLines')
    .end;
  }

  createTableExtracost(data: Extracost):ITable{
    return new Table([
      [
        new Txt('NOMBRE').bold().end,
        new Txt('COSTO VIAJE').bold().end,
        new Txt('KILÓMETROS X VIAJE').bold().end,
        new Txt('CANTIDAD X VIAJE').bold().end,
        new Txt('COSTO X KM').bold().end
      ],
      [
        new Txt('DIESEL').bold().end,
        data.dieselCostv,
        data.dieselKmv,
        data.dieselCantv,
        data.dieselCostKm
      ],
      [
        new Txt('PEAJE').bold().end,
        data.tollCostv,
        data.tollKmv,
        data.tollCantv,
        data.tollCostKm
      ],
      [
        new Txt('VIÁTICOS').bold().end,
        data.viaticCostv,
        data.viaticKmv,
        data.viaticCantv,
        data.viaticCostKm
      ],
      [
        new Txt('PESAS Y BALANZA').bold().end,
        data.weightsScaleCostv,
        data.weightsScaleKmv,
        data.weightsScaleCantv,
        data.weightsScaleCostKm
      ],
      [
        new Txt('CARGUE Y DESCARGUE').bold().end,
        data.loadDownloadCostv,
        data.loadDownloadKmv,
        data.loadDownloadCantv,
        data.loadDownloadCostKm
      ],
      [
        new Txt('CARAVANA').bold().end,
        data.caravanCostv,
        data.caravanKmv,
        data.caravanCantv,
        data.caravanCostKm
      ],
      [
        '',
        '',
        '',
        new Txt('TOTAL').bold().end,
        data.total
      ]
    ])
    .widths(['*', 'auto', 'auto','auto','auto'])
    .layout('lightHorizontalLines')
    .end;
  }
  createTableGuide():ITable{
    return new Table([
      ['cantidad', 'Unidad', 'Descripción'],
      ['cantidad', 'Unidad', 'Descripción'],
      ['cantidad', 'Unidad', 'Descripción']
    ])
    .widths(['auto', 'auto','*'])
    .alignment('center')
    .end;
  }
}
