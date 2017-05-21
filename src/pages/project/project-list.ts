import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProjectProvider } from '../../providers/project/project';
import { ProjectModel } from '../../providers/project/project-model';
import { ProjectDetailPage } from './project-detail';


/**
 * Generated class for the ProjectListPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-project-list',
  templateUrl: 'project-list.html',
})
export class ProjectListPage {
  private projects : Array<ProjectModel>;

  constructor(public nav: NavController, public navParams: NavParams, private projectProvider: ProjectProvider ) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProjectListPage');
    this.loadProjects();
  }

  loadProjects(){
    this.projectProvider.listProjects()
      .subscribe(
        data => this.projects = data,
        err => console.log('Erro', err),
        () => console.log('projects', this.projects)
      );
  }

  viewProject(project){
    console.log('Project Click:', project);
    this.nav.push(ProjectDetailPage,{projectID:project._internalId});
  }


}
