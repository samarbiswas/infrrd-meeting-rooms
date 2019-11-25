import { Component, OnInit } from '@angular/core';
import { Room } from 'src/app/models/rooms.model';
import { MeetingRoomsDataService } from 'src/app/services/meeting-rooms-data.service';
import { BookingSlot } from 'src/app/models/booking-slots.model';

@Component({
  selector: 'app-meeting-rooms',
  templateUrl: './meeting-rooms.component.html',
  styleUrls: ['./meeting-rooms.component.css']
})
export class MeetingRoomsComponent implements OnInit {

  selectedDate;
  rooms: Room[] = [];
  bookingRoom: Room;
  startTimeSlots: BookingSlot[] = [];
  endTimeSlots: BookingSlot[] = [];
  endTimeSlotsFilterOption: BookingSlot[] = [];
  bookingFormSlot;
  bookingFormSlotFilterOption;

  constructor(private meetingRoomsService: MeetingRoomsDataService) {
    this.onSelectedDateChange(this.meetingRoomsService.formatDateToString(this.selectedDate));
  }

  ngOnInit() {
    this.bookingFormSlot = new BookingSlot(null);
    this.bookingFormSlotFilterOption = new BookingSlot(null);
    this.rooms = this.meetingRoomsService.getAllRooms();
  }

  /**
   * Updates the page based on date selection
   * @param dateString YYYY-MM-DD format of date
   */
  onSelectedDateChange(dateString) {
    this.selectedDate = dateString;
    this.startTimeSlots = this.meetingRoomsService.getTimeSlotsForDay(this.meetingRoomsService.formatStringToDate(dateString));
  }


  onSelectStartDate(value) {
    let selectedSlot = new Date(Number(value));
    this.endTimeSlots = [];
    this.endTimeSlots = this.startTimeSlots.filter(value => {
      if (value.startTime > selectedSlot) {
        return true;
      } else {
        return false;
      }
    });
    let lastOpt = new Date(this.selectedDate).setHours(18, 0, 0, 0);
    this.endTimeSlots.push(
      new BookingSlot(new Date(lastOpt))
    );
  }

  onSelectStartDateFilterOption(value) {
    let selectedSlot = new Date(Number(value));
    this.endTimeSlotsFilterOption = [];
    this.endTimeSlotsFilterOption = this.startTimeSlots.filter(value => {
      if (value.startTime > selectedSlot) {
        return true;
      } else {
        return false;
      }
    });
    let lastOpt = new Date(this.selectedDate).setHours(18, 0, 0, 0);
    this.endTimeSlotsFilterOption.push(
      new BookingSlot(new Date(lastOpt))
    );
  }

  getBookedSlots(room: Room): BookingSlot[] {
    return this.meetingRoomsService.getBookedSlots(room, this.selectedDate);
  }

  bookRoom(room: Room) {
    this.bookingFormSlot = new BookingSlot(null);
    this.bookingRoom = room;
    this.endTimeSlots = [];
  }

  submitBooking() {
    if (!this.isRoomAvailable(this.bookingRoom, this.bookingFormSlot)) {
      alert("Already Booked");
      return;
    }
    if (!this.bookingRoom.bookingsMap.get(this.meetingRoomsService.formatDateToString(this.selectedDate))) {
      this.bookingRoom.bookingsMap.set(this.meetingRoomsService.formatDateToString(this.selectedDate), []);
    }
    this.bookingRoom.bookingsMap.get(this.meetingRoomsService.formatDateToString(this.selectedDate)).push(this.bookingFormSlot);
    this.bookingRoom = new Room(null);
    this.bookingFormSlot = new BookingSlot(null);
  }

  isRoomAvailable(room, bookingFormSlot) {
    return this.meetingRoomsService.checkRoomBooking(room, bookingFormSlot, this.selectedDate) ? false : true;
  }

  checkRoomAvailability(room) {
    let alreadyBooked = this.meetingRoomsService.checkRoomBooking(room, this.bookingFormSlotFilterOption, this.selectedDate);
    if (!alreadyBooked) {
      return 'available'
    }
    if (alreadyBooked) {
      let currentDate = new Date();
      let startDate = new Date(Number(alreadyBooked.startTime));
      let endDate = new Date(Number(alreadyBooked.endTime));
      if (currentDate.getTime() > startDate.getTime()
        && currentDate.getTime() < endDate.getTime()
      ) {
        return 'in use by ' + alreadyBooked.username;
      } 
      else {
        return 'booked by ' + alreadyBooked.username;
      }
    }
  }

  deleteBooking(bookings, bookingItemIndex) {
    bookings.splice(bookingItemIndex, 1)
  }

}
