import { Injectable } from '@angular/core';
import { CoreProvider } from '../core/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/Rx';
import * as x2js from "xml2js";

@Injectable()
export class XogProvider {

  constructor(private core:CoreProvider) {
    console.log('Hello XogProvider Provider');
  }
  executeQuery (queryCode,sessionID, filter) {
    let xog = '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:tns="http://www.niku.com/xog/Query">' +
              '<soap:Header><tns:Auth><tns:SessionID>' + sessionID + '</tns:SessionID></tns:Auth></soap:Header>' +
              '<soap:Body><tns:Query>' +
              '<tns:Code>' + queryCode + '</tns:Code>' +
              '<tns:Filter>'+ filter +'</tns:Filter>' +
              '</tns:Query></soap:Body></soap:Envelope>';

    return this.core.xogHttp(xog)
      .map(res => this.parseXML(res.text(),false) )
      .catch(this.handleError);
  };

  execute (xmlDoc,sessionID) {
    let xog = '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"  xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:tns="http://www.niku.com/xog/Query">' +
              '<soap:Header><tns:Auth><tns:SessionID>' + sessionID + '</tns:SessionID></tns:Auth></soap:Header>' +
              '<soap:Body>' + xmlDoc + '</soap:Body></soap:Envelope>';

    return this.core.xogHttp(xog)
      .map(res => this.parseXML(res.text(),true) )
      .catch(this.handleError);
  };

  //hande http observer error
  handleError(error) {
    console.error('erro server', error);
    // return Observable.throw(error.json().error || 'Server error');
    return Observable.throw( 'Server error');
  };

  parseXML(xml, action){
    //console.log('xml', xml);
    var jsonResult;

    //let promise = new Promise(resolve => {
    //  resolve(
    x2js.parseString(xml,  {trim: true, explicitArray: false, charsAsChildren:true}, function (err, result) {
     console.log('query results', result);
     if (action){
       jsonResult = result["soapenv:Envelope"]["soapenv:Body"]["XOGOutput"]["Statistics"];
     }else{
       jsonResult = result["soapenv:Envelope"]["soapenv:Body"]["QueryResult"]["Records"];
     }
    });

    return jsonResult;
  }

}
