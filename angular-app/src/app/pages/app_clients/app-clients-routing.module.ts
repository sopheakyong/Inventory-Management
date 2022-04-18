import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
 
  { path: 'assets', loadChildren: () => import('./modules/assets.module').then(m => m.AssetsModule) },
  { path: 'asset-settings', loadChildren: () => import('./modules/asset-settings.module').then(m => m.AssetSettingsModule)},


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppClientsRoutingModule { }
