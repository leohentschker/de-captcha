// external
import React from 'react'

// layouts
import BaseLayout from '../layouts/BaseLayout'

// routes
import HomeRoute from './Home'

export const routes = store => ({
  path: '/',
  component: BaseLayout,
  indexRoute: HomeRoute(store),
  childRoutes: [
  ],
})
