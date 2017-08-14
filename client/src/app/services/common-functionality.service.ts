import { Injectable } from '@angular/core';

@Injectable()
export class CommonFunctionalityService {

  constructor() { 
  }
  newMessageObject(date: Date, from: customTypes.contact, content: string, type: string, conversation: string){
    return <customTypes.Message>{
      _id: undefined,
      date: this.dateToUTC(date),
      from,
      content,
      type,
      conversation
    }
  }
  newConversationObject(name: string, type: string, participants: customTypes.contact[], admin?: customTypes.contact){
    return <customTypes.Conversation>{
      _id: undefined,
      name,
      type,
      participants,
      usersTyping: [],
      lastMessage: undefined,
      admin
    }
  }
  dateToUTC(d: Date){
    return Date.UTC(d.getFullYear(), d.getMonth(), d.getDate(), d.getHours(), d.getMinutes(), d.getSeconds(), d.getMilliseconds())
  }
  contactFromPtoP(participants: customTypes.contact[], userId: string) : customTypes.contact{
    let contactsCopy = participants.filter(contact => contact._id !== userId);
    return contactsCopy[0];
  }
}
