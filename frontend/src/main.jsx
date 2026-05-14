import React from 'react'
import ReactDOM from 'react-dom/client'

import {
  BrowserRouter,
  Routes,
  Route
} from 'react-router-dom'

import './index.css'

import Dashboard from './pages/Dashboard'

import MonthlyTrends from './pages/MonthlyTrends'
import RegionAnalysis from './pages/RegionAnalysis'
import NetworkPerformance from './pages/NetworkPerformance'
import ReopenRisk from './pages/ReopenRisk'

ReactDOM.createRoot(document.getElementById('root')).render(

  <React.StrictMode>

    <BrowserRouter>

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

    </BrowserRouter>

  </React.StrictMode>
)