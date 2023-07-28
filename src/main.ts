import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from '@env/environment';
import { enableProdMode } from '@angular/core';

if(!navigator.geolocation) {
  alert('Navegador No soporta Geolocalización');
  throw new Error('Navegador no soporta Geolocalización');
}

if(environment.production){
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
