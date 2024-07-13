import React, {JSXElementConstructor, ReactElement} from 'react';
import {
  ScrollView,
  View,
  Platform,
  KeyboardAvoidingView,
  StyleSheet,
  ViewStyle,
  StyleProp,
  RefreshControlProps,
} from 'react-native';

interface Props {
  refreshControl?:
    | ReactElement<RefreshControlProps, string | JSXElementConstructor<any>>
    | undefined;
  contentContainerStyle?: StyleProp<ViewStyle>;
  style?: StyleProp<ViewStyle>;
  keyboardAvoidingView?: boolean;
  children?: React.ReactNode;
}

const Content = React.forwardRef((props: Props, ref?: any) => {
  const style = props.style ? props.style : [];

  if (props.keyboardAvoidingView) {
    return (
      <KeyboardAvoidingView
        style={[styles.container, style]}
        behavior={Platform.OS === 'ios' ? 'height' : 'padding'}>
        <View style={[styles.container, style]}>{props.children}</View>
      </KeyboardAvoidingView>
    );
  }

  return (
    <ScrollView
      ref={ref}
      {...props}
      style={[styles.container, style]}
      contentContainerStyle={props.contentContainerStyle}
      refreshControl={props.refreshControl}
      showsVerticalScrollIndicator={false}>
      <View style={[styles.container, style]}>{props.children}</View>
    </ScrollView>
  );
});

const styles = {
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
};

export default Content;
