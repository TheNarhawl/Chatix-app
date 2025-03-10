import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { v7 } from 'uuid';
import { Chat } from './chats';
import { User } from './users';

@Entity()
export class Message {
    @PrimaryColumn({ type: 'uuid'})
    id: string = v7();

    @Column({ type: 'uuid'})
    chatId: string;

    @Column({ type: 'uuid'})
    senderId: string;

    @Column({ type: 'text'})
    text: string;

    @Column({ type: 'boolean', nullable: false, default: false })
    isRead: boolean;

    @Column({ type: 'timestamp'})
    timestamp: Date;

    @ManyToOne(() => Chat, chat => chat.messages)
    @JoinColumn({ name: 'chatId' })
    chat: Chat;

    @ManyToOne(() => User, user => user.messages)
    @JoinColumn({ name: 'senderId' })
    sender: User;
}