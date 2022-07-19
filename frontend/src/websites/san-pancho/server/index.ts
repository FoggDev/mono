import { Application } from 'express'

export default (app: Application) => {
  app.get('/pancho', (req, res) => {
    res.send('PANCHO')
  })

  return app
}
