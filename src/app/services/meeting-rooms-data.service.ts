import { Injectable } from '@angular/core';
import { BookingSlot } from '../models/booking-slots.model';
import { Room } from '../models/rooms.model';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class MeetingRoomsDataService {

  private noOfRooms = 10; // For 10 meeting rooms

  constructor() {
  }

  getAllRooms(): Room[] {
    let rooms = [];
    for (let roomId = 1; roomId <= this.noOfRooms; roomId++) {
      rooms.push(new Room(roomId));
    }
    return rooms;
  }

  getTimeSlotsForDay(date): BookingSlot[] {
    var timeSlots: BookingSlot[] = []
    var dayStart = new Date(date.getTime());
    var dayEnd = new Date(date.getTime());

    if (date.getDay() != 0 && date.getDay() != 6) {
      dayStart.setHours(9, 0, 0, 0)
      dayEnd.setHours(18, 0, 0, 0)
    } else {
      return timeSlots;
    }

    do {
      timeSlots.push(new BookingSlot(new Date(dayStart.getTime())));
      dayStart.setHours(dayStart.getHours(), dayStart.getMinutes() + 30)
    } while (dayStart < dayEnd);

    return timeSlots;
  }

  getBookedSlots(room: Room, selectedDate): BookingSlot[] {
    let slots = room.bookingsMap ? room.bookingsMap.get(this.formatDateToString(selectedDate)) : [];
    return slots ? slots : [];
  }

  checkRoomBooking(room, bookingFormSlot, selectedDate) {
    let bookingSlots = this.getBookedSlots(room, selectedDate);
    let alreadyBooked = bookingSlots.find(slot => {
      if (
        slot.startTime === bookingFormSlot.startTime &&
        slot.endTime === bookingFormSlot.endTime
      ) {
        return true;
      }
      if (
        slot.startTime < bookingFormSlot.startTime &&
        slot.endTime > bookingFormSlot.startTime
      ) {
        return true;
      }
      if (
        slot.startTime > bookingFormSlot.startTime &&
        slot.endTime < bookingFormSlot.endTime
      ) {
        return true;
      }
      if (
        slot.startTime < bookingFormSlot.endTime &&
        slot.endTime > bookingFormSlot.endTime
      ) {
        return true;
      }
    });
    if (alreadyBooked) {
      return alreadyBooked;
    } else {
      return false;
    }
  }


  formatDateToString(date) {
    return moment(date).format('YYYY-MM-DD');
  }

  formatStringToDate(dateString) {
    return moment(dateString, 'YYYY-MM-DD').toDate();
  }

}
