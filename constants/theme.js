import { Dimensions } from "react-native";
const {width, height} = Dimensions.get('window');

export const COLORS = {
    primary: '#0E1F3F',
    secondary: '#ea4335',
    white: '#FFFFFF',
    yelo: '#F2A900',
    black: '#000',
    blu: '#A5A6F6',
    liteBlu: '#E2E8FB'
}

export const SIZES = {
    width,
    height,
    base: 10
}

const theme = {COLORS, SIZES};

export default theme;