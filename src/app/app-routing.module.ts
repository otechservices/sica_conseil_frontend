import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'project-generator', component: ProjectGeneratorComponent },
  { path: 'pmp-simulator', component: PmpSimulatorComponent },
  { path: 'pmp-history', component: PmpHistoryComponent },
  { path: 'pmp-training', component: PmpTrainingComponent },
  { path: 'pmp-test', component: PmpTestComponent },
  { path: 'pmp-result', component: PmpResultComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'missions', component: MissionsComponent },
  { path: 'formations', component: FormationsComponent },
  { path: 'expertise', component: ExpertiseComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
