import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PageSizes, PaginatorState } from '../../models/paginator.model';

@Component({
  selector: 'trp-paginator',
  templateUrl: './paginator.component.html',
  styleUrls: ['./paginator.component.scss'],
})
export class PaginatorComponent {
  paginator: PaginatorState = new PaginatorState();

  @Input() set paginatorSetter(paginator: PaginatorState) {
    this.paginator = paginator;
    this.pageSizes = paginator.pageSizes;
  }
  @Input() isLoading = false;
  @Output() paginate: EventEmitter<PaginatorState> = new EventEmitter();
  pageSizes: number[] = PageSizes;

  pageChange(num: number) {
    this.paginator.page = num;
    this.paginate.emit(this.paginator);
  }

  sizeChange() {
    this.paginator.pageSize = +this.paginator.pageSize;
    this.paginator.page = 1;
    this.paginate.emit(this.paginator);
  }
}
