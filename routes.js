import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { StatusBar, View, TouchableOpacity } from "react-native";

import { navigationRef } from "~/services/NavigationService";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import colors from "~/styles/colors";

import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";

MaterialCommunityIcons.loadFont();

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

import PassengerDrawer from "~/components/Passenger/PassengerDrawer";
import DriverDrawer from "~/components/Driver/DriverDrawer";

import SignIn from "~/screens/SignIn";

import DriverMap from "~/screens/Driver/Map";
import DriverRaces from "~/screens/Driver/Races";
import DriverRaceInProgress from "~/screens/Driver/RaceInProgress";
import DriverProfile from "~/screens/Driver/Profile";

import PassengerMap from "~/screens/Passenger/Map";
import PassengerRaces from "~/screens/Passenger/Races";
import PassengerProfile from "~/screens/Passenger/Profile";

import Modal from "~/components/Modal";

export default function Routes() {
  const token = useSelector((state) => state.auth.token);
  const userType = useSelector((state) => state.auth.type);
  const showDrawer = false;

  return (
    <>
      <StatusBar backgroundColor={colors.secondaryColor} />
      <Modal />
      <NavigationContainer ref={navigationRef}>
        {!token && (
          <Stack.Navigator>
            <Stack.Screen name="SignIn" component={SignIn} />
          </Stack.Navigator>
        )}
        {token && userType === "driver" && (
          <Drawer.Navigator
            drawerStyle={{ width: !showDrawer ? null : 350 }}
            initialRouteName="Map"
            drawerContent={(props) => (
              <DriverDrawer
                activeItemIndex={props.state.index}
                navigation={props.navigation}
              />
            )}
          >
            <Stack.Screen name="Map" component={DriverMap} />
            <Stack.Screen name="AwaitingRaces" component={DriverRaces} />
            <Stack.Screen
              name="RaceInProgress"
              component={DriverRaceInProgress}
            />
            <Stack.Screen name="Profile" component={DriverProfile} />
          </Drawer.Navigator>
        )}

        {token && userType === "passenger" && (
          <Drawer.Navigator
            drawerStyle={{ width: !showDrawer ? null : 350 }}
            initialRouteName="Map"
            drawerContent={(props) => (
              <PassengerDrawer
                activeItemIndex={props.state.index}
                navigation={props.navigation}
              />
            )}
          >
            <Stack.Screen name="Map" component={PassengerMap} />
            <Stack.Screen name="AwaitingRaces" component={PassengerRaces} />
            <Stack.Screen name="InProgressRaces" component={PassengerRaces} />
            <Stack.Screen name="Profile" component={PassengerProfile} />
          </Drawer.Navigator>
        )}
      </NavigationContainer>
    </>
  );
}
