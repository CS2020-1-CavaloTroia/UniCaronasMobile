import React, { useState, useEffect } from "react";
import { Image } from "react-native";
import { useSelector } from "react-redux";
import { Marker } from "react-native-maps";

import Logo from "~/assets/pin.svg";
import { lightOrDark, lightenDarkenColor } from "~/services/functions";

import motorbike from "~/assets/motorbike.png";

export default function ConnectedDrivers({}) {
  const socket = useSelector((state) => state.socket.socket);
  const [connectedDrivers, setConnectedDrivers] = useState([]);

  useEffect(() => {
    if (socket) {
      socket.on("connectedDrivers", (msg) => {
        const drivers = JSON.parse(msg);
        //console.log(drivers);

        setConnectedDrivers(drivers);
      });
    }
  }, [socket]);

  return (
    <>
      {connectedDrivers &&
        connectedDrivers.length > 0 &&
        connectedDrivers.map((value, index) => {
          if (
            typeof value.latitude === "number" &&
            typeof value.longitude === "number"
          ) {
            return (
              <Marker
                title={value.name}
                flat={true}
                key={index}
                style={{
                  transform: [
                    {
                      rotate: `${value.heading ? value.heading - 90 : 0}deg`,
                    },
                  ],
                }}
                coordinate={{
                  latitude: value.latitude,
                  longitude: value.longitude,
                }}
              >
                <Logo width={23} height={18} />
              </Marker>
            );
          }
        })}
    </>
  );
}
