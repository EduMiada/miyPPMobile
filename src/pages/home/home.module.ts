import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { ShortNumber } from '../../pipes/core/short-number';

@NgModule({
  declarations: [
    HomePage,
    ShortNumber
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
  ],
  exports: [
    HomePage,
    ShortNumber
  ]
})
export class HomePageModule {}
