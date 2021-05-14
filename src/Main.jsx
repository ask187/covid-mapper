import React, { Component } from "react";
import axios from "axios";

export default class Main extends Component {
  getSlots = async (dateObj) => {
    console.log(dateObj, "dateObj");

    let date = dateObj.getDate();
    let month = dateObj.getMonth();
    let year = dateObj.getFullYear();
    let slots = await axios
      .get(
        `https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/calendarByPin?pincode=560066&date=${date}-04-${year}`
      )
      .then((d) => {
        let center_session = d.data.centers.map((center) => {
          let sessionArray = center.sessions.filter(
            (d) => d.available_capacity >= 0
          );
          return { ...center, sessions: sessionArray };
        });
        let available_slots = center_session.filter(
          (center) => center.sessions.length > 0
        );
        // console.log(available_slots, "available Slots");
        return available_slots;
      });
    return slots;
  };

  componentDidMount() {
    let today = new Date();
    let tomorrow = new Date(today);
    let dayAfter = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    dayAfter.setDate(dayAfter.getDate() + 2);
    var available_days = [];
    [today, tomorrow, dayAfter].forEach(async (day) => {
      let slot = await this.getSlots(day);
      if (slot.length > 0) {
        available_days.push(...slot);
      }
      console.log(available_days, "SLOTS");
    });

    // console.log(today.getDate())
    // this.getSlots(today);
  }
  render() {
    return <div>hi</div>;
  }
}
