import React, { Component } from "react";
import axios from "axios";
import Telegram from "telegram-send-message";

export default class Main extends Component {
  getSlots = async (dateObj) => {
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

  initFunc = async () => {
    let today = new Date();
    let tomorrow = new Date(today);
    let dayAfter = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 4);
    dayAfter.setDate(dayAfter.getDate() + 5);
    var available_days = [];
    let slot1 = await this.getSlots(today);
    let slot2 = await this.getSlots(tomorrow);
    let slot3 = await this.getSlots(dayAfter);
    available_days = [...slot1, ...slot2, ...slot3];
    console.log(available_days, "DINGDING");
    Telegram.setToken(`1867619764:AAH4819PJWF6VBUFpRYDz_bDdwzBB-SAP1c`);
    // 1867619764:AAH4819PJWF6VBUFpRYDz_bDdwzBB-SAP1c
    Telegram.setRecipient("406120769");
    Telegram.setMessage(`Bla bla bla i'm a nerd.`);
    Telegram.send();
  };

  componentDidMount() {
    this.initFunc();
  }
  render() {
    return <div>hi</div>;
  }
}
