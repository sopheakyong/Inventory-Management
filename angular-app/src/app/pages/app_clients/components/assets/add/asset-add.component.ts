import { Component, OnInit } from '@angular/core';
import { DropzoneConfigInterface } from 'ngx-dropzone-wrapper';
@Component({
  selector: 'app-asset-add',
  templateUrl: './asset-add.component.html',
  styleUrls: ['./asset-add.component.scss']
})
export class AssetAddComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  config: DropzoneConfigInterface = {
    // Change this to your upload POST address:
    maxFilesize: 50,
    acceptedFiles: 'image/*',
    method: 'POST',
    uploadMultiple: false,
    accept: (file) => {
      this.onAccept(file);
    }
  };
  image = '';
  file = '';

  onAccept(file: any) {
    this.image = file.name;
    this.file = file;
  }

  constructor() { }
ngOnInit() {
    this.breadCrumbItems = [{ label: 'Asset' }, { label: 'Create', active: true }];
  }

}
