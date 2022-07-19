import React, { FC } from 'react'
import { BrowserRouter, Route, Routes as ReactRouterRoutes } from 'react-router-dom'
import { StaticRouter } from 'react-router-dom/server'

import GlobalStyle from './GlobalStyles'
import Landing from './pages/Landing'
import Login from './pages/Login'

const CustomRoutes: FC = () => {
  const getCurrentUrl = () => (typeof window !== 'undefined' ? window.location.href : '/')

  const Router: FC =
    typeof window !== 'undefined'
      ? ({ children }) => <BrowserRouter>{children}</BrowserRouter>
      : ({ children }) => <StaticRouter location={getCurrentUrl()}>{children}</StaticRouter>

  return (
    <>
      <GlobalStyle />

      <Router>
        <ReactRouterRoutes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Landing />} />
        </ReactRouterRoutes>
      </Router>
    </>
  )
}

export default CustomRoutes
