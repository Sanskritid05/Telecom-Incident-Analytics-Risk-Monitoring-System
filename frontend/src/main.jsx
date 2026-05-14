import React from 'react'
import ReactDOM from 'react-dom/client'

import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'

import { HelmetProvider } from 'react-helmet-async'

import './index.css'
import './pages/dashboard.css'

import Dashboard from './pages/Dashboard'

const MonthlyTrends = React.lazy(() =>
  import('./pages/MonthlyTrends')
)

const RegionAnalysis = React.lazy(() =>
  import('./pages/RegionAnalysis')
)

const NetworkPerformance = React.lazy(() =>
  import('./pages/NetworkPerformance')
)

const ReopenRisk = React.lazy(() =>
  import('./pages/ReopenRisk')
)

ReactDOM.createRoot(
  document.getElementById('root')
).render(

  <React.StrictMode>

    <HelmetProvider>

      <BrowserRouter>

        <React.Suspense
          fallback={
            <div className="loading-screen">

              <h1>
                Loading Dashboard...
              </h1>

            </div>
          }
        >

          <Routes>

            <Route
              path="/"
              element={<Dashboard />}
            />

            <Route
              path="/monthly-trends"
              element={<MonthlyTrends />}
            />

            <Route
              path="/region-analysis"
              element={<RegionAnalysis />}
            />

            <Route
              path="/network-performance"
              element={<NetworkPerformance />}
            />

            <Route
              path="/reopen-risk"
              element={<ReopenRisk />}
            />

          </Routes>

        </React.Suspense>

      </BrowserRouter>

    </HelmetProvider>

  </React.StrictMode>
)