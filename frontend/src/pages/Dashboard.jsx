import { useEffect, useState } from 'react'

import Sidebar from '../components/Sidebar'
import Header from '../components/Header'

import { useNavigate } from 'react-router-dom'

import { Helmet } from 'react-helmet-async'

import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend
} from 'recharts'

import {
  predictReopenRisk,
  fetchLiveKPIs,
  fetchMonthlyTrends,
  fetchRegionAnalysis,
  fetchNetworkPerformance,
  fetchRiskDistribution,
  generateInsight,
  warmupBackend

} from '../services/api'

function Dashboard() {



  // =========================
  // NAVIGATION
  // =========================

  const navigate = useNavigate()

  // =========================
  // STATES
  // =========================

  const [prediction, setPrediction] = useState(null)

  const [loading, setLoading] = useState(true)

  const [kpis, setKpis] = useState(null)

  const [monthlyData, setMonthlyData] = useState([])

  const [regionData, setRegionData] = useState([])

  const [networkData, setNetworkData] = useState([])

  const [riskData, setRiskData] = useState([])

  const [insight, setInsight] = useState('')

  const COLORS = [
  '#00D1FF',
  '#FFC857',
  '#1E90FF',
  '#22C55E'
  ]

  // =========================
  // LIVE AI FETCHING
  // =========================

useEffect(() => {

  const fetchAIData = async () => {

    try {

      await warmupBackend()

      const predictionData =
        await predictReopenRisk()

      const kpiData =
        await fetchLiveKPIs()

      const monthly =
        await fetchMonthlyTrends()

      const regions =
        await fetchRegionAnalysis()

      const network =
        await fetchNetworkPerformance()

      const risk =
        await fetchRiskDistribution()

      const insightData =
        await generateInsight('risk')

      setMonthlyData(monthly)

      setRegionData(regions)

      setNetworkData(network)

      setRiskData(risk)

      setPrediction(predictionData)

      setKpis(kpiData)

      setInsight(
        insightData.ai_insight
      )

      setLoading(false)

    } catch (error) {

      console.log(error)
    }
  }

  fetchAIData()

  const interval = setInterval(() => {

    fetchAIData()

  }, 10000)

  return () => clearInterval(interval)

}, [])

  if (loading) {

  return (

    <div className="h-screen bg-[#061223] flex items-center justify-center text-cyan-300 text-2xl font-bold">

      Initializing Telecom Intelligence System...

    </div>
  )
  }
  return (

  <>

    <Helmet>

      <title>
        AI Telecom Incident Intelligence Platform
      </title>

      <meta
        name="description"
        content="
          AI-powered telecom analytics platform
          for operational intelligence,
          KPI monitoring,
          network analytics,
          and predictive incident risk analysis.
        "
      />

    </Helmet>

    <div className="bg-[#061223] min-h-screen text-white overflow-x-hidden">

      {/* SIDEBAR */}

      <Sidebar />

      {/* HEADER */}

      <Header />

      {/* MAIN CONTENT */}

      <main className="
        pt-[90px]
        px-4
        sm:px-6
        lg:px-8
        pb-8
        w-full
        xl:pr-[300px]
      ">      

        {/* TITLE */}

        <div className="mb-8" id='overview'>

          <h1 className="text-2xl sm:text-3xl md:text-4xl xl:text-5xl font-bold text-cyan-300 uppercase tracking-wide">

            Risk & Operations Hub

          </h1>

          <p className="text-gray-400 mt-3">

            {insight}

          </p>

        </div>

        {/* CHART GRID */}

        <div className="grid
            grid-cols-1
            md:grid-cols-1
            xl:grid-cols-2
            gap-6
            w-full"
        >

          {/* MONTHLY INCIDENT TRENDS */}

          <div
            onClick={() => navigate('/monthly-trends')}
            className="
              bg-[#0B1B2B]/95
              border
              border-cyan-400/20
              rounded-[30px]
              p-5 md:p-7
              min-h-[380px]
              md:min-h-[420px]
              w-full
              hover:scale-[1.03]
              hover:shadow-cyan-500/20
              hover:shadow-2xl
              hover:border-cyan-300
              transition-all
              duration-300
              cursor-pointer
            "
          >

            <h2 className="text-xl font-bold text-cyan-300 uppercase mb-8 tracking-wide">

              Monthly Incident Trends

            </h2>

            <ResponsiveContainer width="100%" height="100%">

              <LineChart data={monthlyData || []}>

                <CartesianGrid
                  stroke="#16324d"
                  strokeDasharray="3 3"
                />

                <XAxis
                  dataKey="month"
                  stroke="#94A3B8"
                  tick={{ fill: '#94A3B8' }}
                />

                <YAxis
                  stroke="#94A3B8"
                  tick={{ fill: '#94A3B8' }}
                />

                <Tooltip />

                <Line
                  type="monotone"
                  dataKey="incidents"
                  stroke="#FFC857"
                  strokeWidth={4}
                  dot={{
                    r: 5,
                    fill: '#FFC857'
                  }}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

          {/* REGION ANALYSIS */}

          <div
            onClick={() => navigate('/region-analysis')}
            className="
              bg-[#0B1B2B]/95
              border
              border-cyan-400/20
              rounded-[30px]
              p-5 md:p-7
              min-h-[380px]
              md:min-h-[420px]
              w-full
              hover:scale-[1.03]
              hover:shadow-cyan-500/20
              hover:shadow-2xl
              hover:border-cyan-300
              transition-all
              duration-300
              cursor-pointer
            "
          >

            <h2 className="text-xl font-bold text-cyan-300 uppercase mb-8 tracking-wide">

              Region Analysis

            </h2>

            <ResponsiveContainer width="100%" height="100%">

              <PieChart>

                <Pie
                  data={regionData || []}
                  dataKey="value"
                  outerRadius={78}
                  innerRadius={45}
                  paddingAngle={3}
                >

                  {

                    regionData.map((entry, index) => (

                      <Cell
                        key={index}
                        fill={COLORS[index % COLORS.length]}
                      />

                    ))

                  }

                </Pie>

                <Tooltip />

                <Legend />

              </PieChart>

            </ResponsiveContainer>

          </div>

          {/* NETWORK PERFORMANCE */}

          <div
            onClick={() => navigate('/network-performance')}
            className="
              bg-[#0B1B2B]/95
              border
              border-cyan-400/20
              rounded-[30px]
              p-5 md:p-7
              h-[420px]
              w-full
              hover:scale-[1.03]
              hover:shadow-cyan-500/20
              hover:shadow-2xl
              hover:border-cyan-300
              transition-all
              duration-300
              cursor-pointer
            "
          >

            <h2 className="text-xl font-bold text-cyan-300 uppercase mb-8 tracking-wide">

              Network Performance

            </h2>

            <ResponsiveContainer width="100%" height="100%">

              <BarChart data={networkData || []}>

                <CartesianGrid
                  stroke="#16324d"
                  strokeDasharray="3 3"
                />

                <XAxis
                  dataKey="name"
                  stroke="#94A3B8"
                />

                <YAxis
                  stroke="#94A3B8"
                />

                <Tooltip />

                <Bar
                  dataKey="value"
                  fill="#00D1FF"
                  radius={[12, 12, 0, 0]}
                  barSize={60}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

          {/* REOPEN RISK */}

          <div
            onClick={() => navigate('/reopen-risk')}
            className="
              bg-[#0B1B2B]/95
              border
              border-cyan-400/20
              rounded-[30px]
              p-5 md:p-7
              h-[420px]
              w-full
              hover:scale-[1.03]
              hover:shadow-cyan-500/20
              hover:shadow-2xl
              hover:border-cyan-300
              transition-all
              duration-300
              cursor-pointer
            "
          >

            <h2 className="text-xl font-bold text-cyan-300 uppercase mb-8 tracking-wide">

              Reopen Risk

            </h2>

            <ResponsiveContainer width="100%" height="100%">

              <BarChart data={riskData || []}>

                <CartesianGrid
                  stroke="#16324d"
                  strokeDasharray="3 3"
                />

                <XAxis
                  dataKey="name"
                  stroke="#94A3B8"
                />

                <YAxis
                  stroke="#94A3B8"
                />

                <Tooltip />

                <Bar
                  dataKey="value"
                  fill="#FFC857"
                  radius={[12, 12, 0, 0]}
                  barSize={60}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

      </main>

      {/* KPI PANEL */}

      <aside className="
          hidden
          xl:flex
          flex-col
          fixed
          right-0
          top-0
          w-[280px]
          2xl:w-[320px]
          h-screen
          bg-[#081726]/95
          border-l
          border-cyan-400/20
          p-4
          lg:p-6
          overflow-y-auto
          z-50
        ">

        <h2 className="
          text-cyan-300
          text-xl
          font-bold
          uppercase
          text-center
          mb-10
          leading-10
        ">

          Key Performance Indicators

        </h2>

        <div className="space-y-3">

          <div className="
            bg-[#0B1B2B]/95
            border
            border-cyan-400/20
            rounded-[28px]
            p-5 md:p-7
            text-center
          ">

            <p className="text-gray-400 uppercase mb-4">

              Total Incidents

            </p>

            <h1 className="text-3xl font-bold text-cyan-300">

              {kpis?.total_incidents}

            </h1>

          </div>

        </div>

      </aside>

    </div>

  </>

)

  
}



export default Dashboard