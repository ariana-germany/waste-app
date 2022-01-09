import { getAllAppointment } from "network/Appointment";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "states";
import { userPreferences } from "states/ducks";
import { WasteType } from "states/ducks/userPreferences/userPreferences.slice";
import notify from "../utils/notification";

type Props = {
  children: any;
};
const NotificationProvider = (props: Props) => {
  // get data from redux
  const data = useSelector((state: RootState) => state.userPreferences);
  const dispatch = useDispatch();

  // get update appointment
  const getData = async () => {
    let appointments = await getAllAppointment(Number(data.place?.collection.id));
    dispatch(userPreferences.actions.changeAppointment(appointments));
  };
  useEffect(() => {
    getData();
    // filter appointment base on user selected roi
    let appointments = data.appointments?.filter((item) =>
      Object.keys(data.ROI)
        .filter((i: string, index: WasteType) => data.ROI[index])
        .includes(item.type.toString())
    );
    // delete old notifications
    appointments && notify.deleteAllNotifications();
    // set new notifications

    appointments &&
      data.activatedNotifications &&
      notify.addListNotification(appointments, data.notificationsConfigs);
  }, [
    data.activatedNotifications,
    data.notificationsConfigs.daySooner,
    data.notificationsConfigs.hour,
    data.notificationsConfigs.minutes,
    data.place,
    data.city,
    data.ROI,
  ]);

  return props.children;
};

export default NotificationProvider;