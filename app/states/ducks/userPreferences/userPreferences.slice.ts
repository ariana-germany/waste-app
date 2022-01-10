import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppointmentInterface } from "interfaces";
import { currentLanguage } from "utils";

export enum WasteType {
  RES,
  BIO,
  PAPER,
  GREEN,
  SPECIAL,
  PACKAGE,
  ELECTRO,
}
export interface NotificationsConfigs {
  hour: number;
  minutes: number;
  // repeat: false;
  daySooner: number;
}
export interface cityInterface {
  id: string;
  country: string;
  name: string;
  zipcode: string;
}
export interface collectionStateInterface {
  id: number;
  areaId: string;
}
export interface placeStateInterface {
  id: number;
  street: string;
  fromNumber: string | null;
  toNumber: string | null;
  collection: collectionStateInterface;
}
export type WastesInterface = {
  [key in WasteType]: boolean;
};
export interface initialStateInterface {
  // selectors: any;
  activatedNotifications: boolean;
  introDone: boolean;
  language: string;
  timesStarted: number;
  city: cityInterface | null;
  place: placeStateInterface | null;
  ROI: WastesInterface;
  appointments: AppointmentInterface[] | null;
  notificationsConfigs: NotificationsConfigs;
}

const initialState: initialStateInterface = {
  activatedNotifications: false,
  introDone: false,
  language: currentLanguage,
  timesStarted: 0,
  city: null,
  place: null,
  appointments: null,

  ROI: {
    [WasteType.BIO]: false,
    [WasteType.ELECTRO]: false,
    [WasteType.GREEN]: false,
    [WasteType.PAPER]: false,
    [WasteType.SPECIAL]: false,
    [WasteType.RES]: false,
    [WasteType.PACKAGE]: false,
  },
  notificationsConfigs: {
    hour: 9,
    minutes: 30,
    // repeat: false,
    daySooner: 0,
  },
};

const userPreferences = createSlice({
  name: "userPreferences",
  initialState,
  reducers: {
    changeNotificationsConfigs(state, action: PayloadAction<NotificationsConfigs>) {
      state.notificationsConfigs = action.payload;
    },
    toggleNotifications(state, action: PayloadAction<boolean>) {
      state.activatedNotifications = action.payload;
    },
    changeLanguage(state, action: PayloadAction<string>) {
      state.language = action.payload;
    },
    changeCity(state, action: PayloadAction<cityInterface | null>) {
      state.city = action.payload;
    },
    changePlace(state, action: PayloadAction<placeStateInterface | null>) {
      state.place = action.payload;
    },
    changeROI(state, action: PayloadAction<WastesInterface>) {
      state.ROI = action.payload;
    },
    changeAppointment(state, action: PayloadAction<AppointmentInterface[]>) {
      state.appointments = action.payload;
    },
    incrementTimesStarted(state) {
      state.timesStarted += 1;
    },
    changeIntroDone(state, action: PayloadAction<boolean>) {
      state.introDone = action.payload;
    },
  },
});

const {
  toggleNotifications,
  changeLanguage,
  incrementTimesStarted,
  changeCity,
  changePlace,
  changeROI,
  changeNotificationsConfigs,
  changeAppointment,
  changeIntroDone,
} = userPreferences.actions;

export const actions = {
  toggleNotifications,
  changeNotificationsConfigs,
  changeLanguage,
  incrementTimesStarted,
  changeCity,
  changePlace,
  changeROI,
  changeAppointment,
  changeIntroDone,
};

export const namespace = userPreferences.name;

export const reducer = userPreferences.reducer;
