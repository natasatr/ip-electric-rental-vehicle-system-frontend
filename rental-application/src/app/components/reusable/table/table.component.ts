import { Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.css',
  encapsulation: ViewEncapsulation.None
})
export class TableComponent {

  @Input() columns: string[] = [];
  @Input() data: any[] = [];
  @Input() tableClass: string = '';
  @Input() showDelete: boolean = true;
  @Output() delete = new EventEmitter<any>();
  @Output() select = new EventEmitter<any>();
  @Input() showBlock: boolean = false;
  @Output() block = new EventEmitter<any>();
  @Output() showRents = new EventEmitter<any>();
  @Input() showRentButton: boolean = false;

  @Input() blockLabelFn?: (row: any) => string;
  @Input() blockClassFn?: (row: any) => string;

  onDelete(row: any) {
    this.delete.emit(row);
  }
  onSelect(row: any) {
    this.select.emit(row);
  }

  onBlock(r: any) {
      this.block.emit(r);
}

  onShowRents(row: any) {
    this.showRents.emit(row);
  }
}
