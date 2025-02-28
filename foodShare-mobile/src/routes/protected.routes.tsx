import { Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";

import { Scan } from "@/screens/Scan";
import { Profile } from "@/screens/Profile";
import { Reservas } from "@/screens/Reservas";
import { Dashboard } from "@/screens/Dashboard";
import ReservaScreen from "@/screens/Reserve";
import { CardItem } from "@/@types/cardItem";
import theme from "@/constants/theme";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import TabBarIcon from "@/components/TabBarIcon";

type ProtectedRoutes = {
  dashboard: undefined;
  reservas: undefined;
  profile: undefined;
  scan: undefined;
  reservaScreen: { selectedFood: CardItem };
};

type RootStackParamList = {
  MainTabs: undefined;
  reservaScreen: { selectedFood: CardItem };
};

export type AppNavigatorRoutesProps = BottomTabNavigationProp<ProtectedRoutes>;

const Stack = createNativeStackNavigator<RootStackParamList>();

const Tab = createBottomTabNavigator<ProtectedRoutes>();

function BottomTabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.colors.light.accentForeground,
          height: 70,
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 15,
          borderTopWidth: 0,
        },
      }}
    >
      <Tab.Screen
        name="dashboard"
        component={Dashboard}
        options={{
          title: "",
          tabBarIcon: ({ focused, color }) => (
            <TabBarIcon
              focused={focused}
              color={color}
              iconName="home"
              label="Inicio"
            />
          ),
        }}
      />

      <Tab.Screen
        name="reservas"
        component={Reservas}
        options={{
          title: "",
          tabBarIcon: ({ focused, color }) => (
            <TabBarIcon
              focused={focused}
              color={color}
              iconName="shopping-bag"
              label="Reservas"
            />
          ),
        }}
      />

      <Tab.Screen
        name="scan"
        component={Scan}
        options={{
          title: "",
          tabBarIcon: ({ focused, color }) => (
            <TabBarIcon
              focused={focused}
              color={color}
              iconName="camera"
              label="Escanear código"
            />
          ),
        }}
      />

      <Tab.Screen
        name="profile"
        component={Profile}
        options={{
          title: "",
          tabBarIcon: ({ focused, color }) => (
            <TabBarIcon
              focused={focused}
              color={color}
              iconName="user"
              label="Meu perfil"
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function ProtectedRoutes() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MainTabs" component={BottomTabNavigator} />
      <Stack.Screen name="reservaScreen" component={ReservaScreen} />
    </Stack.Navigator>
  );
}
