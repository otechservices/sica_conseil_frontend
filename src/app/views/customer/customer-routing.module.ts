import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerLayoutComponent } from './customer-layout/customer-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PmpHistoryComponent } from './pages/pmp-history/pmp-history.component';
import { PmpResultComponent } from './pages/pmp-result/pmp-result.component';
import { PmpSimulatorComponent } from './pages/pmp-simulator/pmp-simulator.component';
import { PmpTestComponent } from './pages/pmp-test/pmp-test.component';
import { PmpTrainingComponent } from './pages/pmp-training/pmp-training.component';
import { ProjectGeneratorComponent } from './pages/project-generator/project-generator.component';
import { IsAuthedGuard } from '../../core/guards/is-authed.guard';
import { AuthGuard } from '../../core/guards/auth.guard';

const routes: Routes = [

    { 
      path: '', 
      component: CustomerLayoutComponent,
      canActivate:[AuthGuard],
      children:[
          { path: '', redirectTo: 'dashboard',pathMatch:"full" },
          { path: 'dashboard', component: DashboardComponent },
          { path: 'project-generator', component: ProjectGeneratorComponent },
          { path: 'simulator', component: PmpSimulatorComponent },
          { path: 'history', component: PmpHistoryComponent },
          { path: 'training', component: PmpTrainingComponent },
          { path: 'test', component: PmpTestComponent },
          { path: 'result', component: PmpResultComponent },
      ]
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
