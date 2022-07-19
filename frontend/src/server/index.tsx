import { Application, Request, Response } from 'express'
import React from 'react'
import { renderToString } from 'react-dom/server'
import { ServerStyleSheet, StyleSheetManager } from 'styled-components'

import App from '../App'
import Config from '../config'
import html from './html'
import expressApp from './server'

const sheet = new ServerStyleSheet()

let currentApp: Application = expressApp

// Loading Custom Server
try {
  const customServer = require(`../websites/${Config.web}/server`).default

  if (customServer) {
    currentApp = customServer(expressApp)
  }
} catch (e) {
  // eslint-disable-next-line no-console
  console.info(`${Config.web} does not have a custom server`)
}

// React Server Side Rendering
currentApp.get('*', (req: Request, res: Response) => {
  // Main entry for React
  const body = renderToString(
    <StyleSheetManager sheet={sheet.instance}>
      <App location={req.url} />
    </StyleSheetManager>
  )

  const styleTags = sheet.getStyleTags()

  res.send(html({ title: Config.webTitle, body, styleTags }))
})

const server = currentApp.listen(3000, () => {
  if (module.hot) {
    // eslint-disable-next-line no-console
    console.info('🚀🚀🚀 Server hot reloading enabled 🚀🚀🚀')
  }

  // eslint-disable-next-line no-console
  console.info(`🍺🍺🍺 Listening on port 3000 🍺🍺🍺`)
})

if (module.hot) {
  module.hot.accept()

  module.hot.dispose(() => server.close())
}
