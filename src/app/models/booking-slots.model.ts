export class BookingSlot {
    username:string;
    agenda:string;
    startTime: Date;
    endTime: Date;
    bookingDate: Date;
    roomNo: number;

    constructor(startTime) {
        this.startTime = startTime;
    }
}