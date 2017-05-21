import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProjectProvider } from '../../providers/project/project';
//import { ProjectModel } from '../../providers/project/project-model';

/**
 * Generated class for the ProjectDetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-project-detail',
  templateUrl: 'project-detail.html'
})
export class ProjectDetailPage {
  private projectID : String;
  private project :  any;
  private milestones :Array<any> = [{name:'',finishDate:''}];


  constructor(public nav: NavController, public navParams: NavParams, private projectProvider: ProjectProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProjectDetailPage');
    this.projectID = this.navParams.data.projectID;
    this.loadProject(this.projectID);
  }

  loadProject(projectID){
    this.projectProvider.getProject(projectID)
      .subscribe(
        data => {this.project = data, this.loadProjectMilestones(projectID) } ,
        err => console.log('Erro', err),
        () => console.log('this project', this.project)
      );
  }

  loadProjectMilestones(projectID){
    this.projectProvider.getProjectMilestones(projectID)
      .subscribe(
        data => this.milestones = data._results ,
        err => console.log('Erro', err),
        () => console.log('milestones', this.milestones)
      );
  }

  goBack(){
    this.nav.pop();
  }

}
