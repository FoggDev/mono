import React, { FC, useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Prism from 'prismjs'
import 'prismjs/components/prism-jsx.min'

import { BodyStyles, StyledApp, StyledWrapper } from './App.styled'
import Content from './Content'
import Sidebar from './Sidebar'
import components from './stories'
import GlobalStyles from '../src/components/GlobalStyles'

const App: FC = () => {
  const [showCode, setShowCode] = useState<boolean | number>(false)

  const handleShowCode = (code: number) => {
    if (showCode !== code) {
      setShowCode(code)
    } else {
      setShowCode(false)
    }
  }

  useEffect(() => {
    Prism.highlightAll()
  }, [showCode])

  return (
    <>
      <GlobalStyles />
      <BodyStyles />
      <StyledWrapper>
        <BrowserRouter>
          <Routes>
            <Route
              path="/:currentComponent"
              element={
                <>
                  <Sidebar components={components} />
                  <StyledApp>
                    <Content
                      components={components}
                      handleShowCode={handleShowCode}
                      showCode={showCode}
                    />
                  </StyledApp>
                </>
              }
            />
            <Route
              path="/"
              element={
                <>
                  <Sidebar components={components} />
                  <StyledApp>
                    <Content
                      components={components}
                      handleShowCode={handleShowCode}
                      showCode={showCode}
                    />
                  </StyledApp>
                </>
              }
            />
          </Routes>
        </BrowserRouter>
      </StyledWrapper>
    </>
  )
}

export default App
