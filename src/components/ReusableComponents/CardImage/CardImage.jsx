import {Image, StyleSheet, TouchableOpacity} from "react-native";

const CardImage = ({image, style}) => {

  
  return (

    <Image
    source={{ uri: image }}
    style={style}
    resizeMode="contain"
    />
    )
  }

  // const styles = StyleSheet.create({
  //   container: {
  //     // flex: 1,
  //     flexDirection: "row",
  //     flexWrap: "wrap",
  //     justifyContent: "center",
  //   },
  //   item: {
  //     width: "25%", // Adjust the width to create a 3x3 grid
  //     margin: 10,
  //     alignItems: "center",
  //   },
  //   image: {
  //     width: 160,
  //     height: 160,
  //   },
  //   textFont: {
  //     fontSize: 12,
  //     textAlign: "center",
  //   },
  // });

  export default CardImage;
