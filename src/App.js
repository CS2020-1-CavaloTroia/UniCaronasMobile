import "react-native-gesture-handler";
import React, { useMemo, useEffect } from "react";
import { Alert } from "react-native";
import Routes from "../routes";
import ptBR from "~/config/MomentLocale";
import messaging from "@react-native-firebase/messaging";
import NotifService from "~/services/NotifSevice";

import {
  updateFirebaseTokenRequest,
  getProfileStatusRequest,
} from "~/store/modules/auth/actions";

import * as NavigationService from "~/services/NavigationService";

import io from "socket.io-client";
import urls from "~/config/urls";
import { useDispatch, useSelector } from "react-redux";
import { setWebSocketConnection } from "./store/modules/socket/actions";
import { setNetworkInfo } from "./store/modules/network/actions";

import shareLocation from "./services/shareLocation";

export default function App() {
  const dispatch = useDispatch();
  const _id = useSelector((state) => state.auth._id);
  const type = useSelector((state) => state.auth.type);
  const token = useSelector((state) => state.auth.token);

  function onRegister(token) {
    console.log(token);
  }

  function onNotif(notif) {
    if (notif.action === "Aceitar") {
      Alert.alert("Corrida aceita", "Sua rota será iniciada");
    }
  }

  const notif = new NotifService(onRegister.bind(this), onNotif.bind(this));

  useEffect(() => {
    if (_id && type !== "") {
      dispatch(
        setWebSocketConnection(
          io(urls.socketURL, {
            query: {
              user_id: _id,
              user_type: type,
            },
          })
        )
      );

      if (type === "driver") {
        dispatch(getProfileStatusRequest());
      }
    }
  }, [_id, type]);

  // Driver notifications Code
  // 7001 - new Race reated

  // Passenger notifications Code
  // 8001 - Initialize race by driver
  // 8002 - Delivery cancel by driver
  // 8003 - finish race

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      if (remoteMessage.data.code === "7001" && type === "driver") {
        notif.localNotif(
          remoteMessage.notification.title,
          remoteMessage.notification.body,
          ""
          //`['Aceitar', 'Recusar']`
        );

        NavigationService.navigate("AwaitingRaces", {
          filter: "awaiting",
        });
      } else if (remoteMessage.data.code === "8001" && type === "passenger") {
        notif.localNotif(
          remoteMessage.notification.title,
          remoteMessage.notification.body,
          ""
          //`['Aceitar', 'Recusar']`
        );

        NavigationService.navigate("InProgressRaces", {
          filter: "inProgress",
        });
      } else if (remoteMessage.data.code === "8002" && type === "passenger") {
        notif.localNotif(
          remoteMessage.notification.title,
          remoteMessage.notification.body,
          ""
          //`['Aceitar', 'Recusar']`
        );

        NavigationService.navigate("AwaitingRaces", {
          filter: "awaiting",
        });
      } else if (remoteMessage.data.code === "8003" && type === "passenger") {
        notif.localNotif(
          remoteMessage.notification.title,
          remoteMessage.notification.body,
          ""
          //`['Aceitar', 'Recusar']`
        );

        NavigationService.navigate("Map");
      }
    });

    messaging().onNotificationOpenedApp(async (remoteBackgroundMessage) => {
      if (remoteBackgroundMessage.data.code === "7001" && type === "driver") {
        NavigationService.navigate("AwaitingRaces", {
          filter: "awaiting",
        });
      } else if (
        remoteBackgroundMessage.data.code === "8001" &&
        type === "passenger"
      ) {
        NavigationService.navigate("InProgressRaces", {
          filter: "inProgress",
        });
      } else if (
        remoteBackgroundMessage.data.code === "8002" &&
        type === "passenger"
      ) {
        NavigationService.navigate("AwaitingRaces", {
          filter: "awaiting",
        });
      } else if (
        remoteBackgroundMessage.data.code === "8003" &&
        type === "passenger"
      ) {
        NavigationService.navigate("Map");
      }
    });

    return unsubscribe;
  }, []);

  ptBR();
  return <Routes />;
}
