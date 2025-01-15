import {Dimensions, PixelRatio, Platform} from 'react-native';

const IPHONE_6_SCREEN_WIDTH = 375;

export const SCREEN_WIDTH = Dimensions.get('window').width;
export const SCREEN_HEIGHT_SCREEN = Dimensions.get('screen').height;
export const SCREEN_HEIGHT = Dimensions.get('window').height;
export const DESIGN_HEIGHT = 932;
export const DESIGN_WIDTH = 430;
export const SMALL_DEVICE = SCREEN_WIDTH < IPHONE_6_SCREEN_WIDTH;
export const MEDIUM_DEVICE = SCREEN_WIDTH <= IPHONE_6_SCREEN_WIDTH;
export const LARGE_DEVICE = SCREEN_WIDTH > IPHONE_6_SCREEN_WIDTH;
export const hundred = 100;
export const isIOS = Platform.OS === 'ios';
export const isAndroid = Platform.OS === 'android';
export const platformVersion = Platform.Version;

// It is based on the screen width of your design layouts e.g Height 600 x Width 375
const scale = SCREEN_WIDTH / DESIGN_WIDTH;

export function normalize(size) {
  return PixelRatio.roundToNearestPixel(size * scale);
}

export const vw = width => {
  let percent = (width / DESIGN_WIDTH) * hundred;
  const elemWidth = parseFloat(`${percent}`);
  return PixelRatio.roundToNearestPixel((SCREEN_WIDTH * elemWidth) / hundred);
};

export const vh = height => {
  let percent = (height / DESIGN_HEIGHT) * hundred;
  const elemHeight = parseFloat(`${percent}`);
  return PixelRatio.roundToNearestPixel((SCREEN_HEIGHT * elemHeight) / hundred);
};

export default {
  vh,
  vw,
  normalize,
  DESIGN_HEIGHT,
  DESIGN_WIDTH,
  SCREEN_WIDTH,
  SCREEN_HEIGHT,
};
