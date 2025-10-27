import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './pages/contact/contact.component';
import { DashboardComponent } from '../customer/pages/dashboard/dashboard.component';
import { ExpertiseComponent } from './pages/expertise/expertise.component';
import { FormationsComponent } from './pages/formations/formations.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from '../auth/pages/login/login.component';
import { MissionsComponent } from './pages/missions/missions.component';
import { PmpHistoryComponent } from '../customer/pages/pmp-history/pmp-history.component';
import { PmpResultComponent } from '../customer/pages/pmp-result/pmp-result.component';
import { PmpSimulatorComponent } from '../customer/pages/pmp-simulator/pmp-simulator.component';
import { PmpTestComponent } from '../customer/pages/pmp-test/pmp-test.component';
import { PmpTrainingComponent } from '../customer/pages/pmp-training/pmp-training.component';
import { ProjectGeneratorComponent } from '../customer/pages/project-generator/project-generator.component';
import { RegisterComponent } from '../auth/pages/register/register.component';
import { PublicLayoutComponent } from './public-layout/public-layout.component';
import { AuthGuard } from '../../core/guards/auth.guard';

const routes: Routes = [
  { path: '', 
    component: PublicLayoutComponent,
   // canActivate:[AuthGuard],
    children:[
    { path: '', component: HomeComponent },
    { path: 'missions', component: MissionsComponent },
    { path: 'formations', component: FormationsComponent },
    { path: 'expertise', component: ExpertiseComponent },
    { path: 'contact', component: ContactComponent },
    ]
  
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
