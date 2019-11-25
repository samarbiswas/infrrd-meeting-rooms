import { BookingSlot } from './booking-slots.model';

export class Room {
    roomId: number;
    bookingsMap: Map<string, BookingSlot[]>;
    constructor(roomId) {
        this.roomId = roomId;
        this.bookingsMap = new Map();
    }
}
