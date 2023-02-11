import {
    Accent,
    ColorTheme,
    Denotive,
    Layout,
    TextTheme
  } from './types'

  
  // ------------ Colors --------------
  export const accent: Accent = {
    primary: "#34344A",
    secondary: "#7B88F2",
    highlight: "#66668F",
    gradient: "#EC7324",
    like: "#C03522",
  }
  
  export const layout: Layout = {
    base: "#F8F8F9",
    background: "#FFFFFF",
    backgroundSecondary: '#F5F5F4',
    highlight: "#F9FAFC",
    borderPrimary: "#CCD2E2BF", //rgba(204, 210, 226, 0.75)
    borderSecondary: "#CCD2E25C", //rgba(204, 210, 226, 0.36)
    input: "#F7F7F8",
    overlay: "#0000009A", //rgba(0, 0, 0, 0.60)
    tooltip: "#191A1A",
    homeWidgetBackgroundPromotion: "#5774E7",
    homeWidgetBackgroundAlert: "#E27429",
    discussionBackgroundReply: '#EEEEEE',
    dropdown: '#F4F4F4',
    screen: '#F5F4F4'
    // contrast: [
    //   "#CCD2E229",
    //   "#F6F8F9"
    // ],
  }
  
  export const text: TextTheme = {
    header: '#354052',
    title: "#030229",
    bodyPrimary: "#354052BF", //rgba(53, 64, 82, 0.75)
    bodySecondary: "#35405280", //rgba(53, 64, 82, 0.50)
    placeholder: "#35405240", //rgba(53, 64, 82, 0.25)
    labelPrimary: "#67707D",
    labelSecondary: "#8D949A",
    buttonPrimary: "#FFFFFF",
    buttonSecondary: "#9A9FA8",
    tab:'#444444',
  }
  
  export const denotive: Denotive = {
    success: "#41A906",
    error: "#DA0E0F",
    warning: "#E89519",
    disabled: "#E7EAF1",
  }
  
  
  const color: ColorTheme = {
    accent,
    layout,
    text,
    denotive
  }
  
  export default {
    name: 'light',
    color,
  }
  