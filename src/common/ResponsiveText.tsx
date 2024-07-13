import React from 'react';
import {Text, TextStyle} from 'react-native';
import {widthPercentageToDP as wp} from 'react-native-responsive-screen';
import {useTheme} from '@react-navigation/native';

// import Fonts from "@src/theme/fonts";

interface CustomProps {
  numberOfLines?: number;
  style?: TextStyle;
  onPress?: () => void;
  children?:
    | string
    | JSX.Element
    | JSX.Element[]
    | string[]
    | React.ReactElement
    | any;
}
const ResponsiveText: React.FC<CustomProps> = props => {
  const {colors} = useTheme();

  const text = {
    // color: colors.TextColor,
    // fontFamily: Fonts.ManropeRegular,
  };

  const {style, children} = props;
  let fontSize = wp('4%');
  let lineHeight = wp('5.5%');

  if (style && style.fontSize) {
    fontSize = wp(style.fontSize);
  }
  if (style && style.fontSize) {
    lineHeight = wp(style.fontSize) + wp('1%');
  }
  if (style && style.lineHeight) {
    lineHeight = style.lineHeight;
  }
  return (
    <Text
      onPress={props.onPress}
      allowFontScaling={false}
      numberOfLines={props.numberOfLines}
      style={{
        ...text,
        ...props.style,
        ...{fontSize, lineHeight},
      }}>
      {children}
    </Text>
  );
};
export default ResponsiveText;
