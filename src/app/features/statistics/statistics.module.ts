import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { StatisticsComponent } from './statistics/statistics.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { StatisticsRoutingModule } from './statistics-routing.module';

@NgModule({
  declarations: [StatisticsComponent],
  imports: [
    CommonModule,
    FormsModule,
    StatisticsRoutingModule,
    SharedModule
  ]
})
export class StatisticsModule { }
