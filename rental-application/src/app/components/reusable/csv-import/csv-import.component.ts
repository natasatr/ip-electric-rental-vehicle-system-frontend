import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-csv-import',
  templateUrl: './csv-import.component.html',
  styleUrl: './csv-import.component.css'
})
export class CsvImportComponent {
  @Input() entityName: string = '';
  @Output() fileSelected = new EventEmitter<File>();
  @Output() upload = new EventEmitter<void>();

  selectedFile: File | null = null;

  onFileChange(event: any) {
    this.selectedFile = event.target.files[0];
    if (this.selectedFile) {
      this.fileSelected.emit(this.selectedFile);
    }
  }

  onUploadClick() {
    if (this.selectedFile) {
      this.upload.emit();
    } else {
      alert("Please select a CSV file first.");
    }
  }
}
