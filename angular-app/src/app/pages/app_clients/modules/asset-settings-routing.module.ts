import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LocationComponent } from '../components/assets/location/location.component';
import { CategoryAddComponent } from '../components/asset_settings/category/add/category-add.component';
import { CategoryListComponent } from '../components/asset_settings/category/list/category-list.component';
import { LocationAddComponent } from '../components/asset_settings/location/add/location-add.component';
import { VendorListComponent } from '../components/asset_settings/vendor/list/vendor-list.component';

const routes: Routes = [
  {
    path: 'category-list',
    component: CategoryListComponent

  },
  {
    path: 'category-add',
    component: CategoryAddComponent
  },

  {
    path: 'location-list',
    component: LocationComponent
  },
  {
    path: 'location-add',
    component: LocationAddComponent
  },
  {
    path:'vendor-list',
    component: VendorListComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssetSettingsRoutingModule { }
