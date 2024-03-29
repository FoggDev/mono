import { createGlobalStyle, css } from 'styled-components'

import WorkSansRegularWoff from './fonts/worksans/worksans-regular.woff'
import WorkSansRegularWoff2 from './fonts/worksans/worksans-regular.woff2'

const fontStyles = css`
  @font-face {
    font-family: 'WorkSans';
    font-style: normal;
    font-weight: 400;
    src: url('${WorkSansRegularWoff}') format('woff'),
      url('${WorkSansRegularWoff2}') format('woff2');
  }
`

const htmlReset = css`
  * {
    outline: none;
  }
  body {
    font-family: 'WorkSans';
    margin: 0;
    padding: 0;
  }
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p {
    margin: 0;
    padding: 0;
  }
`

const globalStyles = css`
  body {
    font-family: WorkSans;
  }
`

const GlobalStyle = createGlobalStyle`
  ${fontStyles}
  ${htmlReset}
  ${globalStyles}
`

export default GlobalStyle
