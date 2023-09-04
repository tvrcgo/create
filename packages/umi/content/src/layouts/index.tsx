import React from 'react'
import { Outlet, Helmet } from 'umi'

export default () => {
  return (
    <div>
      <Helmet>
        <meta name='viewport' content='width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, viewport-fit=cover' />
      </Helmet>
      <Outlet />
    </div>
  )
}
