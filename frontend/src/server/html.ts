import serialize from 'serialize-javascript'

import Config from '../config'

type HTMLMetaData = {
  title?: string
  initialState?: any
  body?: string
  styleTags?: string
}

const html = (options: HTMLMetaData) => {
  const { title = '', initialState = {}, body = '', styleTags = '' } = options

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"
        />
        <title>${title}</title>
        <link rel="shortcut icon" href="/images/favicon.png" type="image/x-icon" />
        <script defer="" src="${Config.publicPath}vendor.js"></script>
        <script defer="" src="${Config.publicPath}main.js"></script>
        ${styleTags}
      </head>
      <body>
        <div id="root">${body}</div>
        <script>
          window.initialState = ${serialize(initialState)};
        </script>
      </body>
    </html>
  `
}

export default html
