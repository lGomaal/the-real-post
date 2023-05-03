import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StandAlonePagesRoutingModule } from './stand-alone-pages-routing.module';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';

@NgModule({
  declarations: [PageNotFoundComponent],
  imports: [CommonModule, StandAlonePagesRoutingModule],
})
export class StandAlonePagesModule {}
