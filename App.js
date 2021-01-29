import { createAppContainer, createSwitchNavigator } from "react-navigation";
import { createDrawerNavigator } from "react-navigation-drawer";
import { TabNavigator } from "./routes/TabNavigator";
import LoginScreen from "./screens/auth/LoginScreen";
import SettingsScreen from "./screens/SettingsScreen";
import Sidebar from "./components/Sidebar";

import { LogBox } from "react-native";
import _ from "lodash";
LogBox.ignoreLogs(["Setting a timer"]);
const _console = _.clone(console);
console.warn = (message) => {
  if (message.indexOf("Setting a timer") <= -1) {
    _console.warn(message);
  }
};

const DrawerNavigator = createDrawerNavigator(
  {
    TabNavigator: {
      screen: TabNavigator,
      navigationOptions: {
        title: "Home",
      },
    },
    Settings: {
      screen: SettingsScreen,
    },
  },
  {
    contentComponent: Sidebar,
  },
  {
    initialRouteName: "Home",
  }
);

const SwitchNavigator = createSwitchNavigator({
  LoginScreen: {
    screen: LoginScreen,
  },
  DrawerNavigator: {
    screen: DrawerNavigator,
  },
});

export default createAppContainer(SwitchNavigator);
