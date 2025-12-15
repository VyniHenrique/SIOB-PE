import { StyleProp, TextStyle } from "react-native";
import { TextInput } from "react-native-paper";

interface Props {
  label: string;
  style?: StyleProp<TextStyle>;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
}

export default function CustomTextInput({
  label,
  style,
  placeholder,
  value,
  onChangeText,
}: Props) {

	
  return (
    <TextInput
      label={label}
      placeholder={placeholder}
      activeOutlineColor="#8f0404"
      mode="outlined"
      style={style}
      value={value}
      onChangeText={onChangeText}
    />
  );
}
