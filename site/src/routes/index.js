// external
import React from 'react'

// layouts
import BaseLayout from '../layouts/BaseLayout'

// routes
import UploadRoute from './Upload'
import HomeRoute from './Home'

export const routes = store => ({
  path: '/',
  childRoutes: [
    {
      component: BaseLayout,
      indexRoute: HomeRoute(store),
      childRoutes: [
        UploadRoute(store),
      ],
    },
  ],
})
