export class ApprovalModel {
  public code: string;
  public name: string;
  public isxog: boolean;
  public description: string;
  public id : number;
  public subject : string;
  public wflapproval: string;
  public xogmessage: string;
  public actions:Array<string>;

// Copy constructor.
  constructor(obj?: ApprovalModel) {

    this.code = obj.code;
    this.name = obj.name;
    this.isxog = obj.isxog;
    this.description = obj.description || '';
    this.id = obj.id || 0;
    this.subject = obj.subject || '';
    this.wflapproval = obj.wflapproval || '';
    this.xogmessage = obj.xogmessage || '';
    let action:string = obj.actions + "" || '';
    this.actions = action.split(';') || [];
  }

  // New static method.
  static fromJSONArray(array: Array<ApprovalModel>): ApprovalModel[] {
    console.log ('array', array);

    return array.map(obj => new ApprovalModel(obj));
  }

}
