export class ProjectModel {
  //constructor(
    public _internalId: number;
    public code: string;
    public name: string;
    public scheduleStart: string;
    public scheduleFinish: string;
    public percentComplete : number;
    public manager : {};
    public scheduleToBaseline: number;
    public scheduleVariancePercent: number;
    public projectedCostVariance: number;
    public projectedCostVariancePercent: number;
    public projectedEffortVariance: number;
    public projectedEffortVariancePercent: number;
    public etcLabor: number;
    public actuals: number;
    public totalLaborEffort: number;
    public actualsCost: {};
    public budgetCostTotal: {};
    public effortGraphData = [];
    //public scheduleToBaseline:string;

    static apiFieldShortList    = '_internalId,code,name,scheduleStart,scheduleFinish,percentComplete';
    static apiFieldDetailedList = '_internalId,code,name,scheduleStart,scheduleFinish,percentComplete,manager,scheduleToBaseline,' +
                                  'scheduleVariancePercent,projectedCostVariance,projectedCostVariancePercent,projectedEffortVariance,projectedEffortVariancePercent,' +
                                  'etcLabor,actuals,totalLaborEffort,actualsCost,budgetCostTotal';


  // Copy constructor.
    constructor(obj?: ProjectModel) {
      this._internalId = obj._internalId;
      this.code = obj.code;
      this.name = obj.name;
      this.scheduleStart = obj.scheduleStart || '';
      this.scheduleFinish = obj.scheduleFinish || '';
      this.percentComplete = obj.percentComplete || 0;
      this.manager = obj.manager || {};
      this.scheduleToBaseline = obj.scheduleToBaseline || 0;
      this.scheduleVariancePercent = obj.scheduleVariancePercent || 0;
      this.projectedCostVariance = obj.projectedCostVariance || 0;
      this.projectedCostVariancePercent = obj.projectedCostVariancePercent || 0;
      this.projectedEffortVariance = obj.projectedEffortVariance || 0;
      this.projectedEffortVariancePercent = obj.projectedEffortVariancePercent || 0;
      this.etcLabor = obj.etcLabor || 0;
      this.actuals = obj.actuals || 0;
      this.totalLaborEffort || obj.totalLaborEffort || 0;
      this.actualsCost =  obj.actualsCost || {amount:'0',currency:''}; 
      this.budgetCostTotal = obj.budgetCostTotal || {amount:'0',currency:''};

      this.effortGraphData.push(this.actuals, this.etcLabor );
    //  this.scheduleToBaseline = obj.scheduleToBaseline || '';

    }

  // New static method.
  static fromJSONArray(array: Array<ProjectModel>): ProjectModel[] {
    return array.map(obj => new ProjectModel(obj));
  }

}
