import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProjectDetailPage } from './project-detail';
import { ShortNumber } from '../../pipes/core/short-number';

@NgModule({
  declarations: [
    ProjectDetailPage,
    ShortNumber
  
  ],
  imports: [
    IonicPageModule.forChild(ProjectDetailPage),
  ],
  exports: [
    ProjectDetailPage,
    ShortNumber
  ]
})
export class ProjectDetailPageModule {}
