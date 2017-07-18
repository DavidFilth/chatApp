/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}
declare namespace customTypes {
    export interface User {
        id: string,
        name: string,
        username: string
        email: string,
        password: string,
        contacts: contactInfo[],
        conversations: Conversation[]
        pendingRequests: contactInfo[]
    }

    export interface contactInfo{
        id: string,
        name: string,
        email: string
    }
    export interface userSchema{
      _id : string,
      name: string,
      username: string,
      email: string,
      password: string
      contacts: string[],
      conversations: string[],
      pendingRequests: string[]
    }
    export interface Conversation{
        id: string,
        name?: string,
        participants: contactInfo[],
        messages: Message[],
        type: string
    }
    export interface Message{
        id: string,
        date: Date,
        from: contactInfo,
        content: string,
        type: string
    }
}
