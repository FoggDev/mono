import { redirectTo } from '@contentpi/lib'
import { Button, Input, Notification, RenderIf, Text } from '@contentpi/ui-kit'
import React, { FC, useContext, useState } from 'react'
import { useLocation } from 'react-router-dom'

import { FormContext } from '~/contexts/form'
import {
  CSSButtons,
  CSSInputControl,
  CSSLoginCard,
  CSSLoginContainer,
  CSSLoginForm
} from './Login.styled'

const Authentication: FC = () => {
  const { pathname } = useLocation()
  // States
  const [values, setValues] = useState({
    email: '',
    password: ''
  })

  const [notification, setNotification] = useState({
    id: Math.random(),
    message: ''
  })

  const [invalidLogin, setInvalidLogin] = useState(false)

  // Contexts
  const { onChange } = useContext(FormContext)
  // const { login } = useContext(UserContext)

  // Methods
  const _onChange = (e: any): any => {
    onChange(e, setValues)
  }

  const handleSubmit = async (user: any): Promise<void> => {
    // const response = await login(user)
    const response: any = {}
    if (response.error) {
      setInvalidLogin(true)
      setNotification({
        id: Math.random(),
        message: response.message
      })
    } else {
      redirectTo(pathname || '/', false)
    }
  }

  return (
    <>
      <RenderIf isTrue={invalidLogin && notification.message !== ''}>
        <Notification
          notification={notification}
          type="error"
          position="bottom-right"
          maxNotifications={5}
          duration={5}
        />
      </RenderIf>
      <CSSLoginContainer>
        <CSSLoginCard>
          <Text align="center" variant="h1">
            Bienvenido
          </Text>
          <Text align="center" variant="caption1">
            Conectarse a su cuenta
          </Text>
          <CSSLoginForm>
            <CSSInputControl>
              <Text>Email</Text>
              <Input
                placeholder="Email"
                autoComplete="off"
                type="email"
                name="email"
                onChange={_onChange}
                value={values.email}
              />
            </CSSInputControl>
            <CSSInputControl>
              <Text>Contraseña</Text>
              <Input
                placeholder="Contraseña"
                type="password"
                autoComplete="off"
                name="password"
                onChange={_onChange}
                value={values.password}
              />
            </CSSInputControl>
          </CSSLoginForm>

          <CSSButtons>
            <Button fullWidth onClick={(): Promise<void> => handleSubmit(values)}>
              Conectar
            </Button>
          </CSSButtons>
        </CSSLoginCard>
      </CSSLoginContainer>
    </>
  )
}

export default Authentication
