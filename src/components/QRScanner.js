import React, { useState, useEffect } from "react";
import { StyleSheet,View,Dimensions, ActivityIndicator } from "react-native";
import {
  Camera,
  useCameraDevice,
  useCodeScanner,
} from "react-native-vision-camera";


const QRScanner = (props) => {
  const [hasPermission, setHasPermission] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const device = useCameraDevice("back");
  
  const codeScanner = useCodeScanner({
    codeTypes: ["qr"],
    onCodeScanned: (codes) => {
      console.log(`onCodeScanned `, codes);
      console.log(`onCodeScanned value`, codes[0].value);
      props.onRead(codes[0].value);
    },
  });

  useEffect(() => {
    // exception case
    setRefresh(!refresh);
  }, [device, hasPermission]);

  useEffect(() => {
    const requestCameraPermission = async () => {
      const permission = await Camera.requestCameraPermission();
      console.log("Camera.requestCameraPermission ", permission);
      setHasPermission(permission === "granted");
    };

    requestCameraPermission();

    //if it is idle for 15 secs, it will be closed
    // setTimeout(() => {
    //   props.onRead(null);
    // }, 15 * 1000);
  }, []);

  if (device == null || !hasPermission) {
    return (
      <View style={styles.page2}>
          <ActivityIndicator size="large" color="purple" />
      </View>
    );
  }

  return (
    <View style={styles.page2}>
      <Camera
        codeScanner={codeScanner}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={true}
      />
    </View>
  );
};

export default QRScanner;

const styles = StyleSheet.create({
  page2: {
   flex: 1,
    position: "absolute",
    top: 0,
    //left:12,
    height: Dimensions.get('window').height,
    width: Dimensions.get('window').width,
    alignItems: "center",
    justifyContent: "center",
    borderWidth:1
  },
  
});

