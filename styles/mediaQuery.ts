export const BREAKPOINT_PC = 'pc'
export const BREAKPOINT_TABLET = 'tablet'
export const BREAKPOINT_MOBILE = 'mobile'

export const breakpoints = {
  pc: 1023,
  tablet: 767,
  mobile: 359,
}

export const mediaQuery = (key: keyof typeof breakpoints) => {
  return `@media (max-width: ${breakpoints[key]}px)`
}

/**
  미디어쿼리 사용방법 -> custom Styled component 내에서 호출

 ${mediaQueries(BREAKPOINT_TABLET)} {
    ${(props) => (props.theme.width)};
  }

 * */
