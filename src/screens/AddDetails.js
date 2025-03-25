import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import { FormProvider, useForm } from "react-hook-form";
import Page1 from "./Page1";
import Page2 from "./Page2";

const Stack = createStackNavigator({});

const AddDetails = props => {
  const methods = useForm({
    defaultValues: props?.route.params?.details || { qrCode: "", city: "", name: "" } 
  });

  return (
    <FormProvider {...methods}>
      <Stack.Navigator
        screenOptions={{
          // animation: "slide_from_right", // Slide effect
          // gestureEnabled: true,          // Enable swipe gestures
        }}
      >
        <Stack.Screen name="Page1" component={Page1} options={{ headerShown:false }} />
        <Stack.Screen name="Page2" component={Page2} options={{ headerShown:false }} />
      </Stack.Navigator>
    </FormProvider>
  );
};

export default AddDetails;
