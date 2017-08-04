import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'custom'
})
export class CustomPipe implements PipeTransform {

  transform(value: customTypes.conversationInfo[], args?: any): any {
    console.log('hey');
    return value.sort((a,b)=>{
      return b.unreadMessages - a.unreadMessages;
    });
  }

}
