import { createTheme, createText, createBox } from '@shopify/restyle'
import { TouchableOpacityProps, TouchableOpacity } from 'react-native';

const palette = {
  purpleLight: '#8C6FF7',
  purplePrimary: '#5A31F4',
  purpleDark: '#3F22AB',

  blueLight: '#4282FF',

  greenLight: '#56DCBA',
  greenPrimary: '#0ECD9D',
  greenDark: '#0A906E',

  black: '#0B0B0B',
  white: '#FFFFFF',
  grey: '#8F92A1',
  lightGrey: '#F6F7FB'
};


const theme = createTheme({
  colors: {
    mainBackground: palette.white,
    mainForeground: palette.black,
    cardPrimaryBackground: palette.blueLight,
    greyCard: palette.lightGrey,
    buttonPrimaryBackground: palette.purplePrimary,

    // 
    danger: 'red',
    // Texts
    primaryText: palette.black,
    secondaryText: palette.grey,
    whiteText: palette.white
  },
  spacing: {
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  breakpoints: {
    phone: 0,
    tablet: 768,
  },
  textVariants: {
    hero: {
      fontFamily: 'DMSans-Bold',
      fontSize: 34,
      lineHeight: 42.5,
      color: 'whiteText',
      letterSpacing: -0.4
    },
    header: {
      fontFamily: 'DMSans-Bold',
      fontSize: 24,
      lineHeight: 42.5,
      color: 'primaryText',
      letterSpacing: -0.4
    },
    header1: {
      fontFamily: 'DMSans-Bold',
      fontSize: 18,
      lineHeight: 42.5,
      color: 'primaryText',
      letterSpacing: -0.4
    },
    subheader: {
      fontFamily: 'DMSans-Medium',
      fontWeight: '600',
      fontSize: 14,
      lineHeight: 36,
      color: 'primaryText',
    },
    body: {
      fontFamily: 'DMSans-Medium',
      fontSize: 14,
      lineHeight: 24,
      color: 'primaryText',
    },
    body1: {
      fontFamily: 'DMSans-Medium',
      fontSize: 14,
      lineHeight: 24,
      color: 'secondaryText',
    },
    label: {
      fontFamily: 'DMSans-Medium',
      fontSize: 12,
      lineHeight: 24,
      color: 'secondaryText',
    }
  }
});

export type Theme = typeof theme;

export const Text = createText<Theme>();
export const Box = createBox<Theme>();
export const BaseButton = createBox<Theme, TouchableOpacityProps>(TouchableOpacity);
export default theme;