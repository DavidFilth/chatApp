import { Injectable } from '@angular/core';

@Injectable()
export class CommonFunctionalityService {

  constructor() { 
  }
  newMessageObject(date: Date, from: customTypes.contactInfo, content: string, type: string ){
    return <customTypes.Message>{
      _id: undefined,
      date: this.dateToUTC(date),
      from,
      content,
      type
    }
  }
  newConversationObject(name: string, type: string, participants: customTypes.contactInfo[]){
    return <customTypes.conversationInfo>{
      _id: undefined,
      name,
      type,
      participants,
      usersTyping: [],
      lastMessage: null,
      unreadMessages: 0
    }
  }
  dateToUTC(d: Date){
    return Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds(), d.getMilliseconds())
  }
  contactFromPtoP(participants: customTypes.contactInfo[], userId: string) : customTypes.contactInfo{
    let contactsCopy = participants.filter(contact => contact._id !== userId);
    return contactsCopy[0];
  }
}
