import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AssetAddComponent } from '../components/assets/add/asset-add.component';
import { AssetListComponent } from '../components/assets/list/asset-list.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'asset-list',
    
  },
  {
    path: 'asset-list',
    component: AssetListComponent,

  },
  {
    path: 'asset-add',
    component: AssetAddComponent,
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AssetsRoutingModule { }
