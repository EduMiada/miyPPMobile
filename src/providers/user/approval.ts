import { Injectable } from '@angular/core';
import { Observable }  from 'rxjs/Observable';
import { CoreProvider } from '../core/core';
import { UserProvider } from '../user/user';
import { XogProvider } from '../core/xog';
import { ApprovalModel } from './approval-model';
import 'rxjs/add/operator/map';
import 'rxjs/Rx';

@Injectable()
export class ApprovalProvider {

  constructor(private core: CoreProvider, private user:UserProvider, private xog:XogProvider) {
  }

  pendingApprovals(){
    let filter = '<tns:param_user_id>' + this.user.profile.id + '</tns:param_user_id>';
    let approvals:Array<ApprovalModel>;
    return this.xog.executeQuery('cabr_list_pending_approvals', this.core.token, filter)
      .map(data => approvals = this.xog2JsonArray(data))
      .map(data => approvals)
      .catch(this.handleError);
  }

  xog2JsonArray(data){
    let approvals : Array<ApprovalModel>;
    approvals = [];
    console.log('json array', data );

    if (data){
      if (data.Record.length){
        for (var i in data.Record) {
          approvals.push(new ApprovalModel(data.Record[i])); //data.Records[i]) )  ;
        }
      }else{
        approvals.push(new ApprovalModel(data.Record));
      }
    }
   return approvals ;
  }

  sendResponse(item, value){
    let xog:string;
    xog = item.xogmessage;
    xog += '';
    xog = xog.replace(/(\r\n|\n|\r)/gm,"");
    xog = xog.replace('@IDEA_NAME@', item.name);
    xog = xog.replace('@IDEA_CODE@', item.code);
    xog = xog.replace('@RESPONSE_CODE@', value);

    return this.xog.execute(xog, this.user.profile.token)
      .map(data => {(data.$.updatedRecords == '1') ? "SUCCESS" : "FAILURE"; this.pendingApprovals()})
      .catch(this.handleError);
  }


  // //get users myprojects list from xog query and call rest api to get project´s properties
  // getMyProjects(){
  //   let projects;// : ProjectModel[];
  //   let filter = '<tns:usercode>' + this.user.profile.username + '</tns:usercode>';
  //
  //    return this.xog.executeQuery('my_projects_list', this.user.profile.token, filter)
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
  //
  // myProjectsXog2JsonFilter(data){
  //   let filter = '';
  //   let filterItem = '';
  //
  //   for (var prop in data.Record) {
  //     filterItem = '(_internalId = ' + data.Record[prop].projectid + ')';
  //     filter += (Number(prop) < data.Record.length-1)? filterItem + ' or ' : filterItem;
  //   }
  //   return (filter.length > 1)? '(' + filter + ')': '' ;
  // }
  //
  // //call api to get project list - fields and filter default if not provided
  // listProjects(fields, filter): Observable<ProjectModel[]>{
  //   let activeFilter = filter || '((isActive = true) and (isTemplate = false))';
  //   let fieldList = fields || ProjectModel.apiFieldShortList;
  //   let projects:Array<ProjectModel>;
  //   // let project : new ProjectModel;
  //
  //   let url = this.core.SERVER_URL.API_PROJECTS +  '?fields=' + fieldList + '&filter=' + activeFilter;
  //   return this.core.httpGet(url)
  //     .map(res => res.json()._results)
  //     .map(res => projects = ProjectModel.fromJSONArray(res))
  //     .map(res => projects)
  //     .catch(this.handleError);
  // };
  //
  // getProject (projectID) {
  //   let url = this.core.SERVER_URL.API_PROJECTS + '/' + projectID;
  //
  //   return this.core.httpGet(url)
  //     .map(res => res.json())
  //     .catch(this.handleError);
  //  };
  //
  //  getProjectMilestones (projectID) {
  //    let url = this.core.SERVER_URL.API_PROJECTS + '/' + projectID;
  //    var filter = this.core.SERVER_URL.API_TASKS + '?fields=name%2CfinishDate&filter=(isMilestone%20%3D%20true)';
  //
  //    return this.core.httpGet(url + filter)
  //      .map(res => res.json())
  //      .catch(this.handleError);
  //   };


  //hande http observer error
  handleError(error) {
    console.error('erro server', error);
    // return Observable.throw(error.json().error || 'Server error');
    return Observable.throw( 'Server error');
  }
}
