/**
 * Created by linyizong on 2017/04/16.
 */

export class PgeingShow{

  public pageingShow:string="";
  public pageingCss:string="";
}

export class PagingModel{

  public onePageCount:number=20;
  public selectPageCount:number=5;
  public pageShowArry:PgeingShow[]=[];

  constructor(){}

}
