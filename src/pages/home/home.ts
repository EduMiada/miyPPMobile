import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController, Events } from 'ionic-angular';
import { ProjectProvider }  from '../../providers/project/project';
import { ProjectModel }     from '../../providers/project/project-model';
import { ApprovalProvider } from '../../providers/user/approval';
import { ApprovalModel }    from '../../providers/user/approval-model';
import '../../../node_modules/chart.js/dist/Chart.bundle.min.js';


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {
  private actionItems : Array<ApprovalModel>;
  private projects : Array<ProjectModel>;

  private percentCompleteChart: any;
 // private mySlideOptions = {
  //  loop: true,
  //  autoplay:500
  // };

  private doughnutChartLabels:string[] = ['Spent', 'ETC'];
  private chartOptions:any = {
    segmentShowStroke:false,
    cutoutPercentage:70,
    legend: {display:false}
  };
  private doughnutChartData:number[];
  private doughnutChartColors: any[] = [{ backgroundColor: ["#0077b5", "#CFEDFB", "#2c3e50", "#2980b9"] }];
  private doughnutChartType:string = 'doughnut';


  constructor(public nav: NavController, private loadingCtrl: LoadingController, 
              private apr:ApprovalProvider, private alertCtrl:AlertController, 
              private toastCtrl:ToastController, events:Events, private projectProvider: ProjectProvider) {
  }
  
  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
    this.loadPendingApprovals();
    this.loadMyProjects();
  }
  
  doRefresh(refresher) {
    this.ionViewDidLoad();
    setTimeout(() => {
      refresher.complete();
    }, 2000);
  }
 
  getStatusIndicatorIcon(value){
    value = Math.abs(value);
    return  (value > 10) ? "arrow-dropdown" : (value < 6) ? "arrow-dropup" : "arrow-dropright";
  }

  getStatusIndicatorColor(value){
    value = Math.abs(value);
    return  (value > 10) ? "#F16D64" : (value < 6) ? "lightGreen" : "lightYellow";
  }

  loadMyProjects(){
    let loading = this.loadingCtrl.create({
      content: "Loading my projects...",
      duration: 3000,
      dismissOnPageChange:true
    });
    this.projectProvider.getMyProjects()
      .subscribe(
        data => {
          if (data){
            this.projectProvider.listProjects(ProjectModel.apiFieldDetailedList, data)
              .subscribe(
                prj => this.projects = prj,
                error => loading.dismiss(),
                ()=> loading.dismiss()
              );
          }else{
            loading.dismiss();
          }
          
        },
        error =>  loading.dismiss()
      );

  }

  approvalResponse(text, value, item){
    let prompt = this.alertCtrl.create({
       title: text,
       message: "Do you really want to " + text + "?",
       buttons: [
           {
             text: 'Cancel',
             handler: data => {
               console.log('Cancel clicked');
             }
           },
           {
             text: 'Yes',
             handler: data => {

               this.apr.sendResponse(item, value)
                 .subscribe(
                   data => console.log('result', data ),
                   error => console.log('error', error)
                 );

             }
           }
         ]
       });
       //this.nav.present(prompt);
       prompt.present();
  }

  loadPendingApprovals(){
    let loading = this.loadingCtrl.create({
      content: "Loading action items...",
      duration: 3000,
      dismissOnPageChange:true
    });

    loading.present();

    this.apr.pendingApprovals()
      .subscribe(
        data => this.actionItems = data, // console.log( data),
        error => {loading.dismiss(); this.showToast(error); console.log(error)},
        () => loading.dismiss()
      );
  }

  showToast(message) {
    //this.loading.dismiss();
    let toast = this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'bottom'
    });

    toast.present();
  }

}
