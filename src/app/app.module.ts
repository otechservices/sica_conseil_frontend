import { APP_INITIALIZER, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { ButtonComponent } from './components/base/button/button.component';
import { CardComponent } from './components/base/card/card.component';
import { ModalComponent } from './components/base/modal/modal.component';
import { ThemeToggleComponent } from './components/base/theme-toggle/theme-toggle.component';
import { HeaderComponent } from './components/feature/header/header.component';
import { FooterComponent } from './components/feature/footer/footer.component';

import { HomeComponent } from './pages/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { ProjectGeneratorComponent } from './pages/project-generator/project-generator.component';
import { PmpSimulatorComponent } from './pages/pmp-simulator/pmp-simulator.component';
import { PmpHistoryComponent } from './pages/pmp-history/pmp-history.component';
import { PmpTrainingComponent } from './pages/pmp-training/pmp-training.component';
import { PmpTestComponent } from './pages/pmp-test/pmp-test.component';
import { PmpResultComponent } from './pages/pmp-result/pmp-result.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { MissionsComponent } from './pages/missions/missions.component';
import { FormationsComponent } from './pages/formations/formations.component';
import { ExpertiseComponent } from './pages/expertise/expertise.component';
import { ContactComponent } from './pages/contact/contact.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { CommonModule } from '@angular/common';


// Import ngx-translate
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { provideTranslateHttpLoader, TranslateHttpLoader } from '@ngx-translate/http-loader';



@NgModule({
  declarations: [
    ButtonComponent,
    CardComponent,
    ModalComponent,
    ThemeToggleComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    DashboardComponent,
    ProjectGeneratorComponent,
    PmpSimulatorComponent,
    PmpHistoryComponent,
    PmpTrainingComponent,
    PmpTestComponent,
    PmpResultComponent,
    LoginComponent,
    RegisterComponent,
    MissionsComponent,
    FormationsComponent,
    ExpertiseComponent,
    ContactComponent,
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
        TranslateModule.forRoot({
      loader: { provide: TranslateLoader, useClass: TranslateHttpLoader }
    })
  ],
   providers: [
    provideTranslateHttpLoader({   // 👈 injection de la config
      prefix: './assets/i18n/',
      suffix: '.json'
    })
  ],
})
export class AppModule { }
