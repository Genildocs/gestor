import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CalendarComponent } from './calendar.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      {
        path: '',
        component: CalendarComponent,
      },
    ]),
  ],
  exports: [RouterModule],
})
export class CalendarRoutingModule {}
