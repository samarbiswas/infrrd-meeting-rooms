import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MeetingRoomsComponent } from './pages/meeting-rooms/meeting-rooms.component';


const routes: Routes = [
  { path: "**", component: MeetingRoomsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
