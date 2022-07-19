import React, { FC } from 'react'
import Config from '~/config'

import MainRoutes from './Routes'

let CustomRoutes: FC

try {
  CustomRoutes = require(`./websites/${Config.web}/CustomRoutes`).default
} catch (e) {
  console.info(`${Config.web} does not have Custom Routes`)
}

type Props = {
  location?: string
}

const App: FC<Props> = ({ location = '/' }) => {
  if (CustomRoutes) {
    return <CustomRoutes />
  }

  return <MainRoutes />
}

export default App
