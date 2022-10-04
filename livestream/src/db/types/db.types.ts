export interface ChatUser {
    id: number;
    username: string;
}

export interface Room {
    id: number;
    room_name: string;
}

export interface Message {
    id: number;
    room_id: number;
    user_id: number;
    message: string;
}