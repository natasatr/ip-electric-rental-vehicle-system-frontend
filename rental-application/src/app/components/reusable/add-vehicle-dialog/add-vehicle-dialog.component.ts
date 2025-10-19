import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ManufacturerDTO } from '../../../model/ManufacturerDTO';

@Component({
  selector: 'app-add-vehicle-dialog',
  templateUrl: './add-vehicle-dialog.component.html',
  styleUrl: './add-vehicle-dialog.component.css'
})
export class AddVehicleDialogComponent {

 @Input() isOpen = false;
  @Input() fields: any[] = [];
  @Input() showImage = false;
  @Input() manufacturers: ManufacturerDTO[] = []; 

  @Output() close = new EventEmitter<void>();
  @Output() save = new EventEmitter<any>();

  formData: any = {};
  fileData: File | null = null;

  
  onSave() {
    if (this.fileData) {
      this.formData.file = this.fileData;
    }

    
    if (this.formData.manufacturerId === '') {
      this.formData.manufacturerId = null;
    }

    this.save.emit(this.formData);
  }

  
  onFileChange(event: any) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.fileData = fileList[0];
    }
  }

  onClose() {
    this.close.emit();
    this.formData = {};
    this.fileData = null;
  }

}
