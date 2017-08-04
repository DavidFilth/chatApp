/* SystemJS module definition */
declare var module: NodeModule;
interface NodeModule {
  id: string;
}
declare namespace customTypes {
    export interface User {
        _id: string;
        name: string;
        username: string;
        email: string;
        password: string;
        contacts: contactInfo[];
        conversations: conversationInfo[];
        pendingRequests: contactInfo[];
        getUserInfo() : contactInfo;
        countUnreadMessages() : number;
    }

    export interface contactInfo{
        _id: string;
        name: string;
        email: string;
        username: string;
        status?: boolean;
    }
    export interface conversationInfo{
        _id: string;
        name : string;
        type: string;
        participants: contactInfo[];
        usersTyping?: contactInfo[];
        messages?: Message[];
        lastMessage?: Message;
        unreadMessages: number;
    }
    export interface Message{
        _id: string;
        date: number;
        from: contactInfo;
        content: string;
        type: string;
    }
    export interface tool{
        value: string;
    }
    export interface messageForm{
        message: string;
        file?: any;
    }
    export interface groupForm{
        name: string;
        participants: contactInfo[];
    }
    export interface friendRequest{
        status: number;
        contact: contactInfo;
    }
}
