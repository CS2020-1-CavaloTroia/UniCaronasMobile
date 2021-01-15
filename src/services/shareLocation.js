import BackgroundGeolocation from "@mauron85/react-native-background-geolocation";
import colors from "~/styles/colors";
import urls from "~/config/urls";

export default function (message, token, _id) {
  BackgroundGeolocation.configure({
    desiredAccuracy: BackgroundGeolocation.HIGH_ACCURACY,
    stationaryRadius: 50,
    distanceFilter: 50,
    notificationTitle: "UniCaronas Motorista",
    notificationText: message,
    debug: false,
    startOnBoot: false,
    stopOnTerminate: true,
    locationProvider: BackgroundGeolocation.ACTIVITY_PROVIDER,
    interval: 2000,
    fastestInterval: 2000,
    activitiesInterval: 2000,
    stopOnStillActivity: false,
    url: `${urls.socketURL}/driver/updatelocation`,
    notificationIconColor: colors.secondaryColor,

    notificationIconLarge: "ic_launcher_round",
    notificationIconSmall: "ic_notification",
    httpHeaders: {
      "access-token": token,
    },
    postTemplate: {
      latitude: "@latitude",
      longitude: "@longitude",
      heading: "@bearing",
      speed: "@speed",
      _id,
    },
  });

  BackgroundGeolocation.start();
}
