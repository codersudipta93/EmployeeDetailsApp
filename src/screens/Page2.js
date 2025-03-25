import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  useWindowDimensions
} from "react-native";
import LinearGradient from 'react-native-linear-gradient';
import Ionicons from "react-native-vector-icons/Ionicons";
import CityDropdown from "../components/CityDropdown";
import Button from "../components/Button";
import { useFormContext } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { setData } from '../storage/asyncStorageHelper';
import Header from "../components/Header";

const Page2 = ({ }) => {

  const { width, height } = useWindowDimensions();
  const navigation = useNavigation();
  const { setValue, watch, getValues } = useFormContext();

  //Final Submit data
  const handleSubmit = async () => {
    const formData = getValues();
    //console.log(formData)
    await setData("userDetails", formData);
    navigation.navigate("Dashboard");
  };

  // Responsive styles based on device dimensions
  const responsiveStyles = StyleSheet.create({
    container: {
      width: width * 0.9,
      maxWidth: 500,
      alignSelf: 'center',
      padding: Math.min(25, width * 0.06),
      borderRadius: 20,
    },
    title: {
      fontSize: Math.min(22, width * 0.06),
    },
    input: {
      fontSize: Math.min(16, width * 0.04),
      padding: Math.min(12, width * 0.03),
    },
    inputContainer: {
      height: Math.min(50, height * 0.07),
      marginBottom: Math.min(20, height * 0.025),
    }
  });

  return (
    <LinearGradient
      colors={['#6A11CB', '#2575FC']}
      style={styles.gradientContainer}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <SafeAreaView style={styles.container}>
        {/* Custom Header */}
        <Header title="Add Details" backAction={() => { navigation.goBack() }} />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.keyboardAvoidContainer}
        >

          <View style={[styles.content, responsiveStyles.container]}>
             <Text style={{textAlign:'right',fontWeight:'600',fontSize:14,marginBottom:12}}>2/2</Text>
            <Text style={[styles.title, responsiveStyles.title]}>
              Complete Your Profile
            </Text>

            {/* City Dropdown with action on selection */}
            <View style={[responsiveStyles.inputContainer]}>
              <CityDropdown
                selectedCity={watch("city")}
                setSelectedCity={(value) => setValue("city", value)}
                style={[styles.dropdown, {}]}
              />
            </View>

            {/* Name Input */}
            <View style={[styles.inputContainer, responsiveStyles.inputContainer]}>
              <Ionicons name="person-outline" size={20} color="#6A11CB" style={styles.inputIcon} />
              <TextInput
                placeholder="Enter Your Name"
                onChangeText={(text) => setValue("name", text)}
                value={watch("name")}
                style={[styles.input, responsiveStyles.input]}
                placeholderTextColor="#888"
              />
            </View>

            {/* Action Buttons  */}
            <View style={styles.navigationContainer}>
              <Button
                onPress={() => navigation.goBack()}
                icon={<Ionicons name="arrow-back" size={24} color="white" />}
                title="Previous"
                colors={['#ab7e03', '#ab7e03']}
                disabled={false}
              />

              <Button
                onPress={() => handleSubmit()}
                icon={<Ionicons name="add-circle-outline" size={24} color="white" />}
                title="Submit"
                colors={['#250259', '#250259']}
                disabled={getValues().city === "" || !getValues().name}
              />
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default Page2;

const styles = StyleSheet.create({
  gradientContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  keyboardAvoidContainer: {
    flex: 1,
    justifyContent: "center",
  },
  backButton: {
    position: 'absolute',
    left: 20,
    zIndex: 10,
  },
  content: {
    backgroundColor: "rgba(255,255,255,0.9)",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 10,
    elevation: 8,
  },
  title: {
    fontWeight: "700",
    marginBottom: 25,
    textAlign: "center",
    color: "#333",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 10,
    backgroundColor: "#F9F9F9",
  },
  inputIcon: {
    marginLeft: 10,
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: "#333",
  },
  dropdown: {
    flex: 1,
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  }
});