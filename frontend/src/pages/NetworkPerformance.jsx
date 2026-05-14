// =======================================
// NETWORK PERFORMANCE DASHBOARD
// File: src/pages/NetworkPerformance.jsx
// =======================================

import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom'

import { useEffect, useState } from 'react'

import {
  fetchNetworkDashboard
} from '../services/api'

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  Label
} from 'recharts'

function NetworkPerformance() {
    const navigate = useNavigate()

  const [coreData, setCoreData] = useState([])

  const [uptimeData, setUptimeData] = useState([])

  const [throughputData, setThroughputData] = useState([])

  const [latencyData, setLatencyData] = useState([])

  const [kpis, setKpis] = useState(null)

  useEffect(() => {

  const loadDashboard = async () => {

    const data = await fetchNetworkDashboard()

    setCoreData(data.coreData)

    setUptimeData(data.uptimeData)

    setThroughputData(
      data.throughputData
    )

    setLatencyData(data.latencyData)

    setKpis(data.kpis)
  }

  loadDashboard()

    const interval = setInterval(
      loadDashboard,
      5000
    )

    return () => clearInterval(interval)

}, [])

  return (

    <div className="bg-[#061223] min-h-screen text-white">

      <Sidebar />
      <Header />
    {/* TOP NAVIGATION */}

<div className="fixed top-[90px] left-[240px] right-[340px] flex justify-between z-40">

  {/* LEFT */}

  <button
    onClick={() => navigate('/region-analysis')}
    className="
      w-[70px]
      h-[70px]
      rounded-2xl
      bg-[#0B1B2B]
      border
      border-cyan-400/20
      text-3xl
      font-bold
      hover:border-cyan-300
      hover:scale-[1.05]
      hover:shadow-cyan-500/10
      hover:shadow-xl
      transition-all
      duration-300
    "
  >

    {'<<'}

  </button>

  {/* RIGHT */}

  <button
    onClick={() => navigate('/reopen-risk')}
    className="
      w-[70px]
      h-[70px]
      rounded-2xl
      bg-[#0B1B2B]
      border
      border-cyan-400/20
      text-3xl
      font-bold
      hover:border-cyan-300
      hover:scale-[1.05]
      hover:shadow-cyan-500/10
      hover:shadow-xl
      transition-all
      duration-300
    "
  >

    {'>>'}

  </button>

</div>
      <main className="pt-[90px] px-8 pb-10">

        <div className="mb-8">

          <h1 className="text-4xl font-bold text-cyan-300 uppercase">

            Network Performance Dashboard

          </h1>

          <p className="text-gray-400 mt-3">

            Telecom infrastructure performance and uptime analytics.

          </p>

        </div>

        <div className="grid grid-cols-2 gap-8">

          <div className="bg-[#0B1B2B] rounded-3xl p-6 border border-cyan-400/20">

            <h2 className="text-2xl font-bold text-cyan-300 mb-6">

              Core Network Performance

            </h2>

            <ResponsiveContainer width="100%" height={320}>

              <BarChart data={coreData || []}>

                <CartesianGrid stroke="#16324d" />

                <XAxis dataKey="name" stroke="#94A3B8" />

                <YAxis stroke="#94A3B8" />

                <Tooltip />

                <Bar
                  dataKey="value"
                  fill="#00D1FF"
                  radius={[10, 10, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

          <div className="bg-[#0B1B2B] rounded-3xl p-6 border border-cyan-400/20">

            <h2 className="text-2xl font-bold text-cyan-300 mb-6">

              5G Uptime Trends

            </h2>

            <ResponsiveContainer width="100%" height={320}>

              <LineChart data={uptimeData || []}>

                <CartesianGrid stroke="#16324d" />

                <XAxis dataKey="month" stroke="#94A3B8" />

                <YAxis stroke="#94A3B8" />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#22C55E"
                  strokeWidth={4}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

          <div className="bg-[#0B1B2B] rounded-3xl p-6 border border-cyan-400/20">

            <h2 className="text-2xl font-bold text-cyan-300 mb-6">

              Fiber Throughput

            </h2>

            <ResponsiveContainer width="100%" height={320}>

              <LineChart data={throughputData || []}>

                <CartesianGrid stroke="#16324d" />

                <XAxis dataKey="month" stroke="#94A3B8" />

                <YAxis stroke="#94A3B8" />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#FFC857"
                  strokeWidth={4}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

          <div className="bg-[#0B1B2B] rounded-3xl p-6 border border-cyan-400/20">

            <h2 className="text-2xl font-bold text-cyan-300 mb-6">

              Network Latency Analysis

            </h2>

            <ResponsiveContainer width="100%" height={320}>

              <BarChart data={latencyData || []}>

                <CartesianGrid stroke="#16324d" />

                <XAxis dataKey="zone" stroke="#94A3B8" />

                <YAxis stroke="#94A3B8" />

                <Tooltip />

                <Bar
                  dataKey="value"
                  fill="#EF4444"
                  radius={[10, 10, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

      </main>

      {/* KPI PANEL */}

      <aside className="fixed right-0 top-0 w-[320px] h-screen bg-[#081726]/95 border-l border-cyan-400/20 p-6 overflow-y-auto z-50">

        <h2 className="text-cyan-300 text-xl font-bold uppercase text-center mb-10 leading-10">

          Key Performance Indicators

        </h2>

        <div className="space-y-3">

          <div className="bg-[#0B1B2B]/95 border border-cyan-400/20 rounded-[28px] p-8 text-center">

            <p className="text-gray-400 uppercase mb-4">

              Core Stability

            </p>

            <h1 className="text-3xl font-bold text-cyan-300">

              {kpis?.core_stability}

            </h1>

          </div>

          <div className="bg-[#0B1B2B]/95 border border-cyan-400/20 rounded-[28px] p-8 text-center">

            <p className="text-gray-400 uppercase mb-4">

              5G Efficiency

            </p>

            <h1 className="text-3xl font-bold text-yellow-400">

              {kpis?.fiveg_efficiency}

            </h1>

          </div>

          <div className="bg-[#0B1B2B]/95 border border-cyan-400/20 rounded-[28px] p-8 text-center">

            <p className="text-gray-400 uppercase mb-4">

              Fiber Performance

            </p>

            <h1 className="text-3xl font-bold text-green-400">

              {kpis?.fiber_performance}

            </h1>

          </div>

          <div className="bg-[#0B1B2B]/95 border border-cyan-400/20 rounded-[28px] p-8 text-center">

            <p className="text-gray-400 uppercase mb-4">

              Downtime

            </p>

            <h1 className="text-3xl font-bold text-red-400">

              {kpis?.downtime}

            </h1>

          </div>

        </div>

      </aside>

    </div>
  )
}

export default NetworkPerformance