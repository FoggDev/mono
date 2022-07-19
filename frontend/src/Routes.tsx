import React, { FC } from 'react'
import { BrowserRouter, Route, Routes as ReactRouterRoutes } from 'react-router-dom'
import { StaticRouter } from 'react-router-dom/server'
import Slug from '~/pages/Slug'

const Routes: FC = () => {
  const getCurrentUrl = () => (typeof window !== 'undefined' ? window.location.href : '/')

  const Router: FC =
    typeof window !== 'undefined'
      ? ({ children }) => <BrowserRouter>{children}</BrowserRouter>
      : ({ children }) => <StaticRouter location={getCurrentUrl()}>{children}</StaticRouter>

  return (
    <Router>
      <ReactRouterRoutes>
        <Route path="/" element={<Slug />} />
      </ReactRouterRoutes>
    </Router>
  )
}

export default Routes
