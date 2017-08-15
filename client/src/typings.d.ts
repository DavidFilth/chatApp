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
        contacts: contact[];
        conversations: conversationItem[];
        pendingRequests: contact[];
        language: string;
        getUserInfo() : contact;
        countUnreadMessages() : number;
    }
    export interface conversationItem{
        unreadMessages: number;
        info: Conversation;
        messages?: Message[];
    }
    export interface contact{
        _id: string;
        name: string;
        email: string;
        username: string;
        status?: boolean;
    }
    export interface Conversation{
        _id: string;
        name?: string;
        type: string;
        participants: contact[];
        usersTyping?: contact[];
        lastMessage?: Message;
        admin?: contact;
    }
    export interface Message{
        _id: string;
        date: number;
        from: contact;
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
        participants: contact[];
    }
    export interface friendRequest{
        status: number;
        contact: contact;
    }
    export interface editableProperty{
        disableEdition: boolean;
        value: string;
        default: string;
    }
}
