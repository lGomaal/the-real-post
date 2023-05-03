import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbPaginationModule } from '@ng-bootstrap/ng-bootstrap';
import { PaginatorComponent } from './components/paginator/paginator.component';
import { FormsModule } from '@angular/forms';
import { SortIconComponent } from './components/sort-icon/sort-icon.component';

@NgModule({
  declarations: [PaginatorComponent, SortIconComponent],
  imports: [CommonModule, FormsModule, NgbPaginationModule],
  exports: [PaginatorComponent, SortIconComponent],
})
export class CrudTableModule {}
