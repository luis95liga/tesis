import { LOCALE_ID, NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from '@app/material.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FooterComponent } from './shared/components/footer/footer.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { SidebarModule } from './shared/components/sidebar/sidebar.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastrModule } from 'ngx-toastr';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { FlexLayoutModule } from '@angular/flex-layout';
import { AgmCoreModule } from '@agm/core';
import { RouterInterceptor } from '@shared/interceptors/router-interceptor';
import { AlertComponent } from '@shared/components/alert/alert.component';
import localeEc from '@angular/common/locales/es-EC';
import { registerLocaleData } from '@angular/common';

registerLocaleData(localeEc, 'es-EC');

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    AlertComponent
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    FontAwesomeModule,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    SidebarModule,
    FlexLayoutModule,
    FontAwesomeModule,
    ToastrModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAvavdNdatOvWWFHE3X_M8m9vIcNAQVAT8',
      libraries: ['places']
    }),
    GooglePlaceModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RouterInterceptor,
      multi: true,
    },
    {
      provide: LOCALE_ID, useValue: 'es-EC'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
