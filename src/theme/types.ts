

export type Hex = string

export interface Rgb {
  // type: 'rgb'
  red: number
  green: number
  blue: number
}

export interface Alpha {
  alpha: number
}

type Rgba = Rgb & Alpha

export type Color = Hex | Rgb | Rgba

export const hexToRgb : (hex: Hex) => Rgb = hex => ({
  red: parseInt(hex.substring(1, 3), 16),
  green: parseInt(hex.substring(3, 5), 16),
  blue: parseInt(hex.substring(5, 7), 16)
})

export const alpha: (color: Rgb, alpha: number) => Rgba =
  (color, alpha) => ({ ...color, alpha  })

export const color : (color: Color) => string = color => {
  if (typeof color == "string") return color
  if (!color.hasOwnProperty("alpha")) return `rgb(${color.red}, ${color.green}, ${color.blue})`
  return `rgba(${color.red}, ${color.green}, ${color.blue}, ${(color as Rgba).alpha})`
}

export interface Accent {
  primary: Color
  secondary: Color
  gradient: Color
  highlight: Color
  like: Color
}

export interface Layout {
  base: Color
  background: Color
  backgroundSecondary: Color
  highlight: Color
  borderPrimary: Color
  borderSecondary: Color
  input: Color
  overlay: Color
  tooltip: Color
  homeWidgetBackgroundPromotion: Color
  homeWidgetBackgroundAlert: Color,
  dropdown: Color,
  screen: Color,
  discussionBackgroundReply: Color
}

export interface TextTheme {
  header: Color
  title: Color
  bodyPrimary: Color
  bodySecondary: Color
  placeholder: Color
  labelPrimary: Color
  labelSecondary: Color
  buttonPrimary: Color
  buttonSecondary: Color
  tab: Color
}

export interface Denotive {
  success: Color
  error: Color
  warning: Color
  disabled: Color
}

export interface ColorTheme {
  accent: Accent
  layout: Layout
  text: TextTheme
  denotive: Denotive
}

export enum Unit {
  Px = 1,
  Rem,
  Em,
  Pt,
  Vh,
  Vw
}

export interface Length {
  magnitude: number
  unit: Unit
}

export type Spacing = Array<Length>

export interface Font {
  fontFamily: string
  fontSize: Length
  lineHeight?: Length
  fontWidth?: number
  letterSpacing?: Length
}


export interface Icons<I> {
  icons: I
  variants: Array<Color>
}

export interface Theme {
  name: string
  color: ColorTheme
}


// helpers
export const length: (len: Length) => string = len =>
  (len.magnitude.toString(10)).concat(unitStr(len.unit))

export const pixels: (val: number) => Length = val => ({ magnitude: val, unit: Unit.Px })

const unitStr : (unit: Unit) => string = unit => {
  switch (unit) {
    case Unit.Px: return 'px'
    case Unit.Rem: return 'rem'
    case Unit.Em: return 'em'
    case Unit.Pt: return '%'
    case Unit.Vh: return 'vh'
    case Unit.Vw: return 'vw'
    default: return 'px'
  }
}

