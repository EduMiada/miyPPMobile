import { Injectable }   from '@angular/core';
import { Observable}    from 'rxjs/Observable';
import { CoreProvider } from '../core/core';
import { UserProvider } from '../user/user';
import { ProjectModel } from './project-model';
import { XogProvider }  from '../core/xog';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';


@Injectable()
export class ProjectProvider {

  constructor(private core: CoreProvider, private user: UserProvider, private xog:XogProvider) {
    console.log('Hello ProjectProvider Provider');
  }

  getMyProjects(){
    //console.log(this.user.profile);
    let profile = this.user.profile;
    console.log('username', profile);
    console.log(profile.username);

    let filter = '<tns:usercode>' + profile.username + '</tns:usercode>';

    return this.xog.executeQuery('cabr_my_projects', this.core.token, filter)
      .map(data => this.myProjectsXog2JsonFilter(data))
      .catch(this.handleError);
  }

  // //get users myprojects list from xog query and call rest api to get project´s properties
  // getMyProjects(){
  //   let projects;// : ProjectModel[];
  //   let filter = '<tns:usercode>' + this.user.profile.username + '</tns:usercode>';
  //
  //    return this.xog.executeQuery('my_projects_list', this.core.token, filter)
  //     .map(
  //   //  .subscribe(
  //       data=>{
  //         this.listProjects(ProjectModel.apiFieldDetailedList, this.myProjectsXog2JsonFilter(data))
  //
  //         .map(
  //       //  .subscribe(
  //           data => {return data }//,
  //           //error => console.log(error),
  //           //() => projects
  //         );
  //
  //       }
  //       //error=> console.log(error)
  //     );
  //
  //     //return projects;
  //
  // }

  myProjectsXog2JsonFilter(data){
    let filter = '';
    let filterItem = '';

    for (var prop in data.Record) {
      filterItem = '(_internalId = ' + data.Record[prop].projectid + ')';
      filter += (Number(prop) < data.Record.length-1)? filterItem + ' or ' : filterItem;
    }
    return (filter.length > 1)? '(' + filter + ')': '' ;
  }

  //call api to get project list - fields and filter default if not provided
  listProjects(fields?, filter?): Observable<ProjectModel[]>{
    let activeFilter = filter || '((isActive = true) and (isTemplate = false))';
    let fieldList = fields || ProjectModel.apiFieldShortList;
    let projects:Array<ProjectModel>;
    // let project : new ProjectModel;

    let url = this.core.API_ENDPOINT.API_PROJECTS +  '?fields=' + fieldList + '&filter=' + activeFilter;
    return this.core.get(url)
      .map(res => res.json()._results)
      .map(res => projects = ProjectModel.fromJSONArray(res))
      .map(res => projects)
      .catch(this.handleError);
  };

  getProject (projectID, fields?): Observable<ProjectModel> {
    let fieldList = fields || ProjectModel.apiFieldDetailedList;
    let url = this.core.API_ENDPOINT.API_PROJECTS + '/' + projectID + '?fields=' + fieldList;
    let project:ProjectModel;
    return this.core.get(url)
      .map(res => res.json())
      .map(res => new ProjectModel(res))
      //.map(res => project)
      .catch(this.handleError);
   };

   getProjectMilestones (projectID) {
     let url = this.core.API_ENDPOINT.API_PROJECTS + '/' + projectID;
     var filter = this.core.API_ENDPOINT.API_TASKS + '?fields=name%2CfinishDate&filter=(isMilestone%20%3D%20true)';

     return this.core.get(url + filter)
       .map(res => res.json())
       .catch(this.handleError);
    };


  //hande http observer error
  handleError(error) {
    console.error('erro server', error);
    // return Observable.throw(error.json().error || 'Server error');
    return Observable.throw( 'Server error');
  }

}
