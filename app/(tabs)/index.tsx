import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useRouter } from "expo-router";
import CollectForm from "../components/collect";  
import Login from "../users/login";  
import { getToken } from "../../utils/auth";  

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = await getToken();  
      if (token) {
        setIsLoggedIn(true);  
      } else {
        setIsLoggedIn(false);  
      }
    };
    
    checkAuth();
  }, []);

  if (isLoggedIn === null) {
    return null; 
  }

  return (
    <Tab.Navigator>
      
      {!isLoggedIn ? (
        <Tab.Screen
          name="Login"
          component={Login}
          options={{
            headerShown: false,
            tabBarLabel: "Connexion",
          }}
        />
      ) : (
        
        <Tab.Screen
          name="Collect"
          component={CollectForm}
          options={{
            headerShown: false,
            tabBarLabel: "Collecte",
          }}
        />
      )}
    </Tab.Navigator>
  );
}
