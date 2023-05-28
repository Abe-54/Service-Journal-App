import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

const TabsLayout = () => {
  return (
    <Tabs
      screenOptions={{
        tabBarLabelStyle: { fontSize: 12 },
        tabBarInactiveBackgroundColor: "#cbcee7",
        tabBarActiveBackgroundColor: "#b9bddf",
        tabBarActiveTintColor: "#505baf",
      }}
    >
      <Tabs.Screen
        name="clientsTab"
        options={{
          title: "Clients",
          tabBarIcon: ({ focused, color }) => (
            <MaterialCommunityIcons
              name="account-group"
              size={24}
              color={color}
            />
          ),
          headerTitleAlign: "center",
          headerStyle: { backgroundColor: "#858cc7" },
        }}
      />
      <Tabs.Screen
        name="newEntryTab"
        options={{
          title: "New Entry",
          tabBarIcon: ({ focused, color }) => (
            <MaterialCommunityIcons name="plus" size={24} color={color} />
          ),
          headerTitleAlign: "center",
        }}
      />
    </Tabs>
  );
};

export default TabsLayout;
