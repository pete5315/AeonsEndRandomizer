import {Image} from "react-native";

const PopOutCard = ({image, style}) => {

  
  return (
    
    <Image
    source={{ uri: image }}
    style={style}
    resizeMode="contain"
    />
    )
  }

export default PopOutCard;