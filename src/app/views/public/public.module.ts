import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PublicRoutingModule } from './public-routing.module';
import { CommonModule } from '@angular/common';


// Import ngx-translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { provideTranslateHttpLoader, TranslateHttpLoader } from '@ngx-translate/http-loader';
import { ContactComponent } from './pages/contact/contact.component';
import { ExpertiseComponent } from './pages/expertise/expertise.component';
import { FormationsComponent } from './pages/formations/formations.component';
import { HomeComponent } from './pages/home/home.component';
import { MissionsComponent } from './pages/missions/missions.component';
import { PublicFooterComponent } from './public-layout/includes/public-footer/public-footer.component';
import { PublicHeaderComponent } from './public-layout/includes/public-header/public-header.component';
import { SharedModule } from '../shared/shared.module';
import { PublicLayoutComponent } from './public-layout/public-layout.component';



@NgModule({
  declarations: [
    PublicHeaderComponent,
    PublicFooterComponent,
    PublicLayoutComponent,
    HomeComponent,
    MissionsComponent,
    FormationsComponent,
    ExpertiseComponent,
    ContactComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    PublicRoutingModule,
        TranslateModule.forRoot({
      loader: { provide: TranslateLoader, useClass: TranslateHttpLoader }
    }),
  SharedModule
  ],
   providers: [
    provideTranslateHttpLoader({   // 👈 injection de la config
      prefix: './assets/i18n/',
      suffix: '.json'
    })
  ],
})
export class PublicModule { }
