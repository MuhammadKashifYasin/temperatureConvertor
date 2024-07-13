import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Text,
} from 'react-native';

import Container from '../common/Container';
import SplashLogo from '../assets/images/hot.png';
// import LinearGradient from 'react-native-linear-gradient';
// import Colors from '../../theme/Colors';
// import Fonts from '../../theme/fonts';
import ResponsiveText from '../common/ResponsiveText';
import {wp} from '../common/Reponsive';

function Splash(props) {
  const [ballAnimation, setBallAnimation] = useState(new Animated.Value(0));
  useEffect(() => {
    animateBall();
  }, []);

  const animateBall = () => {
    Animated.timing(ballAnimation, {
      toValue: -100,
      duration: 1500,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(ballAnimation, {
        toValue: 0,
        duration: 1500,
        useNativeDriver: true,
      }).start();
    });
  };
  const balllAnimation = {
    transform: [
      {
        translateY: ballAnimation,
      },
    ],
  };
  useEffect(() => {
    setTimeout(() => {
      props.navigation.navigate('HomeScreen');
    }, 4000);
  }, []);
  return (
    <Container
      statusBarColor={'white'}
      barStyle="light-content"
      style={styles.container}>
      <View
        style={{
          flex: 1,
          backgroundColor: 'white',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Animated.View style={[styles.container, balllAnimation]}>
          <Image style={styles.imageStyle} source={SplashLogo} />

          {/* <View>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('Login');
            }}>
         <ResponsiveText>kkjj</ResponsiveText>
          </TouchableOpacity>
        </View> */}
        </Animated.View>
      </View>
    </Container>
  );
}
const styles = StyleSheet.create({
  linearGradient: {
    borderRadius: wp(2),
    paddingHorizontal: wp(10),
    paddingVertical: 10,
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  imageStyle: {
    height: wp(50),
    width: wp(50),
    resizeMode: 'contain',
    marginBottom: wp(10),
    // tintColor: Colors.Secondary,
  },
  textStyle: {
    // color: Colors.White,
    fontSize: 5,
    paddingHorizontal: wp(20),
    marginBottom: wp(10),
    // fontFamily: Fonts.NunitoRegular,
  },
});

export default Splash;
