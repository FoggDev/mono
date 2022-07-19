import React, { FC } from 'react'
import { RouteProps, useParams } from 'react-router-dom'

const Slug: FC<RouteProps> = () => {
  const { slug = 'home' } = useParams()

  return <div className="slug">Slug page: {slug}</div>
}

export default Slug
