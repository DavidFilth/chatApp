/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}
declare namespace customTypes {
    export interface User {
        _id: string,
        name: string,
        username: string
        email: string,
        password: string,
        contacts: contactInfo[],
        conversations: conversationSchema[]
        pendingRequests: contactInfo[]
    }

    export interface contactInfo{
        _id: string,
        name: string,
        email: string,
        username: string
    }
    export interface conversationInfo{
        _id: string,
        name : string,
        type: string,
        participants: contactInfo[],
        lastMessage: Message
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
        _id: string,
        name: string,
        participants: {
            [key : string] : {
                name: string,
                email: string
            }
        },
        messages: Message[],
        type: string
    }
    export interface conversationSchema{
        _id: string,
        name?: string,
        participants: string[],
        messages: string[],
        type: string,
        usersTyping?: contactInfo[]
    }
    export interface Message{
        _id: string,
        date: number,
        from: string,
        content: string,
        type: string
    }
    export interface tool{
        value: string
    }
    export interface messageForm{
        message: string,
        file?: any,
    }
    export interface groupForm{
        name: string,
        participants: contactInfo[]
    }
    export interface friendRequest{
        status: number,
        contact: contactInfo
    }
}
