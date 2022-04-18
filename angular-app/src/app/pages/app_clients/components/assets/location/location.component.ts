import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss']
})
export class LocationComponent implements OnInit {
  breadCrumbItems: Array<{}>;
  constructor() { }

  ngOnInit() {
    this.breadCrumbItems = [{ label: 'Asset' }, { label: 'Create', active: true }];
  }


}
