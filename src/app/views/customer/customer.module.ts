import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CustomerRoutingModule } from './customer-routing.module';
import { SharedModule } from '../shared/shared.module';
import { CustomerHeaderComponent } from './customer-layout/includes/customer-header/customer-header.component';
import { CustomerFooterComponent } from './customer-layout/includes/customer-footer/customer-footer.component';
import { CustomerLayoutComponent } from './customer-layout/customer-layout.component';
import { RouterModule } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PmpHistoryComponent } from './pages/pmp-history/pmp-history.component';
import { PmpResultComponent } from './pages/pmp-result/pmp-result.component';
import { PmpSimulatorComponent } from './pages/pmp-simulator/pmp-simulator.component';
import { PmpTestComponent } from './pages/pmp-test/pmp-test.component';
import { PmpTrainingComponent } from './pages/pmp-training/pmp-training.component';
import { ProjectGeneratorComponent } from './pages/project-generator/project-generator.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CustomerHeaderComponent,
    CustomerFooterComponent,
    CustomerLayoutComponent,
     DashboardComponent,
    ProjectGeneratorComponent,
    PmpSimulatorComponent,
    PmpHistoryComponent,
    PmpTrainingComponent,
    PmpTestComponent,
    PmpResultComponent,
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule
  ]
})
export class CustomerModule { }
