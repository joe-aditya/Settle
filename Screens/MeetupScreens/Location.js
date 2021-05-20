import React,{useEffect} from "react";
import { Text, StyleSheet, View } from "react-native";



const Location  = () => {
  console.log("RENDERING Location");
  useEffect(() => {
    return ()=>console.log("CLEANUP Location");
  }, []);
  return (
    <View style={styles.container}>
      <Text>
       Iam Location screen !!
      </Text>
    
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 300,
    marginBottom: 30,
    backgroundColor: "rgba(255,0,0,0.1)",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Location ;