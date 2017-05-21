import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ShortNumber'
})
export class ShortNumber implements PipeTransform {
  transform(value, args) {

   console.log('pipe', value);      
    if ( value ) {
      let abs = Math.abs( value );
      if ( abs >= Math.pow( 10, 12 ) ) {
        // trillion
        value = ( value / Math.pow( 10, 12 ) ).toFixed( 1 ) + "T";
      } else if ( abs < Math.pow( 10, 12 ) && abs >= Math.pow( 10, 9 ) ) {
        // billion
        value = ( value / Math.pow( 10, 9 ) ).toFixed( 1 ) + "B";
      } else if ( abs < Math.pow( 10, 9 ) && abs >= Math.pow( 10, 6 ) ) {
        // million
        value = ( value / Math.pow( 10, 6 ) ).toFixed( 1 ) + "M";
      } else if ( abs < Math.pow( 10, 6 ) && abs >= Math.pow( 10, 3 ) ) {
        // thousand
        value = ( value / Math.pow( 10, 3 ) ).toFixed( 1 ) + "K";
      } else{
        value = Number(value).toFixed(2);
      }
      return value;
    }else{
      return value;
    }   
  }
}


