import styled from 'styled-components'

export const CSSLoginContainer = styled.div({
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  background: '#fff'
})

export const CSSLoginCard = styled.div({
  margin: 'auto',
  borderRadius: '5px',
  padding: '3rem',
  background: '#fff'
})

export const CSSLoginForm = styled.div({
  marginBottom: '1.5rem'
})

export const CSSInputControl = styled.div({
  marginTop: '1.5rem',
  '& > p': {
    paddingBottom: '0.5rem'
  }
})

export const CSSButtons = styled.div({
  margin: '0 auto',
  textAlign: 'center'
})
