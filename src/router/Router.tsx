import React, { useEffect } from "react";
import { Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Feather } from "@expo/vector-icons";
import * as ScreenOrientation from "expo-screen-orientation";
import { useI18n } from "../translator/i18n";
import SignIn from "../components/pages/auth/SignIn";
import SignUp from "../components/pages/auth/SignUp";
import Welcome from "../components/pages/Welcome";
import ForgotPassword from "../components/pages/auth/ForgotPassword";
import Homepage from "../components/pages/Homepage";
import MyProfile from "../components/pages/settings/MyProfile";
import Verification from "../components/pages/auth/Verification";
import ChangePassword from "../components/pages/auth/ChangePassword";
import ChangeLanguage from "../components/pages/settings/ChangeLanguage";
import EditProfile from "../components/pages/settings/EditProfile";
import Notifications from "../components/pages/settings/Notifications";
import MyContracts from "../components/pages/MyContracts";
import Contract from "../components/pages/contracts/Contract";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { requestLanguage } from "../store/modules/profile/action-creators";
import { requestToken } from "../store/modules/auth/action-creators";
import { orientationChange } from "../store/modules/main/action-creators";
import { AUTH_ROUTE } from "./AuthRouterTypes";
import { PROFILE_ROUTER } from "./ProfileRouterTypes";
import { HOME_ROUTER } from "./HomeRouterType";
import { MYCONTRACT_ROUTER } from "./MyContractRouterTypes";

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const ProfileStack = createStackNavigator();
const HomeStack = createStackNavigator();
const MyContractsStack = createStackNavigator();

export default function Router() {
  const token = useAppSelector((state) => state.auth.token);
  const language = useAppSelector((state) => state.profile.language);
  const { t } = useI18n();

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(requestLanguage());
    dispatch(requestToken());
    dispatch(orientationChange(ScreenOrientation.OrientationLock.PORTRAIT_UP));
  }, [dispatch]);

  if (!language) {
    return <Text>Loading Lang</Text>;
  }

  return token ? (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: "#1696E2",
        keyboardHidesTabBar: true,
        style: {
          height: 53,
          paddingTop: 5,
          paddingBottom: 5,
        },
      }}
      initialRouteName="Homepage"
    >
      <Tab.Screen
        name="MyContracts"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="file-text" size={size} color={color} />
          ),
          tabBarLabel: t("my_contracts.tab_name"),
        }}
      >
        {() => (
          <MyContractsStack.Navigator headerMode="none">
            <ProfileStack.Screen
              name={MYCONTRACT_ROUTER.MY_CONTRACTS}
              component={MyContracts}
            />

            <ProfileStack.Screen
              name={PROFILE_ROUTER.NOTIFICATIONS}
              component={Notifications}
            />
          </MyContractsStack.Navigator>
        )}
      </Tab.Screen>
      <Tab.Screen
        name="Homepage"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="file-plus" size={size} color={color} />
          ),
          tabBarLabel: t("homepage.tab_name"),
        }}
      >
        {() => (
          <HomeStack.Navigator headerMode="none">
            <HomeStack.Screen
              name={HOME_ROUTER.HOMEPAGE}
              component={Homepage}
            />
            <HomeStack.Screen
              name={HOME_ROUTER.CONTRACT}
              component={Contract}
            />
            <ProfileStack.Screen
              name={PROFILE_ROUTER.NOTIFICATIONS}
              component={Notifications}
            />
          </HomeStack.Navigator>
        )}
      </Tab.Screen>
      <Tab.Screen
        name="Settings"
        options={{
          tabBarIcon: ({ color, size }) => (
            <Feather name="settings" size={size} color={color} />
          ),
          tabBarLabel: t("my_profile.tab_name"),
        }}
      >
        {() => (
          <ProfileStack.Navigator headerMode="none">
            <ProfileStack.Screen
              name={PROFILE_ROUTER.MY_PROFILE}
              component={MyProfile}
            />
            <ProfileStack.Screen
              name={PROFILE_ROUTER.CHANGE_LANGUAGE}
              component={ChangeLanguage}
            />
            <ProfileStack.Screen
              name={PROFILE_ROUTER.EDIT_PROFILE}
              component={EditProfile}
            />
            <ProfileStack.Screen
              name={PROFILE_ROUTER.NOTIFICATIONS}
              component={Notifications}
            />
          </ProfileStack.Navigator>
        )}
      </Tab.Screen>
    </Tab.Navigator>
  ) : (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name={AUTH_ROUTE.WELCOME} component={Welcome} />
      <Stack.Screen name={AUTH_ROUTE.SIGNIN} component={SignIn} />
      <Stack.Screen name={AUTH_ROUTE.SIGNUP} component={SignUp} />
      <Stack.Screen name={AUTH_ROUTE.FORGOT} component={ForgotPassword} />
      <Stack.Screen name={AUTH_ROUTE.VERIFICATION} component={Verification} />
      <Stack.Screen
        name={AUTH_ROUTE.CHANGE_PASSWORD}
        component={ChangePassword}
      />
    </Stack.Navigator>
  );
}
