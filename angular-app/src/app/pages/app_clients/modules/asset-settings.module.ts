import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AssetSettingsRoutingModule } from './asset-settings-routing.module';
import { UIModule } from 'src/app/shared/ui/ui.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AssetSettingsRoutingModule,
    UIModule,
  ]
})
export class AssetSettingsModule { }
