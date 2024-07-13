import React, {ReactNode, useEffect} from 'react';
import {
  SafeAreaView,
  Image,
  Dimensions,
  StatusBar,
  View,
  StyleSheet,
  StyleProp,
  ViewStyle,
  StatusBarStyle,
  ImageStyle,
  ImageSourcePropType,
} from 'react-native';

interface Props {
  backgroundColor: string;
  barStyle: null | StatusBarStyle | undefined;
  children: ReactNode;
  screenName: string;
  backgroundImageStyle: ImageStyle;
  style: StyleProp<ViewStyle>;
  statusBarColor: string;
  hidden: boolean;
  translucent: boolean;
  backgroundImage: ImageSourcePropType;
  overlay: boolean;
}

const Container = (props: Partial<Props>) => {
  const {backgroundImageStyle} = props;

  return (
    <SafeAreaView style={[styles.container, props.style]}>
      <StatusBar
        backgroundColor={props.statusBarColor}
        barStyle={props.barStyle}
        translucent={props.translucent}
        hidden={props.hidden}
      />

      {props.backgroundImage && (
        <Image
          source={props.backgroundImage}
          style={[styles.backgroundImage, backgroundImageStyle]}
        />
      )}
      {props.overlay && <View style={styles.overlayStyle} />}
      {props.children}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backgroundImage: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  overlayStyle: {
    position: 'absolute',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
});

export default Container;
