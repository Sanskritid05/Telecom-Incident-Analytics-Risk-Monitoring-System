import { useEffect, useState } from 'react'

import Sidebar from '../components/Sidebar'
import Header from '../components/Header'

import { useNavigate } from 'react-router-dom'

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

  fetchMonthlyDashboard,

  fetchRegionDashboard,

  fetchNetworkDashboard,

  fetchRiskDashboard,

  generateInsight

} from '../services/api'

function Dashboard() {

  const navigate = useNavigate()

  const [prediction, setPrediction] = useState({})

  const [kpis, setKpis] = useState({})

  const [monthlyData, setMonthlyData] = useState([])

  const [regionData, setRegionData] = useState([])

  const [networkData, setNetworkData] = useState([])

  const [riskData, setRiskData] = useState([])

  const [insight, setInsight] = useState('')

  const [loading, setLoading] = useState(true)

  const COLORS = [

    '#00D1FF',
    '#FFC857',
    '#1E90FF',
    '#22C55E'
  ]

  useEffect(() => {

    const loadDashboard = async () => {

      try {

        const predictionData =

          await predictReopenRisk()

        setPrediction(
          predictionData || {}
        )

        const kpiData =

          await fetchLiveKPIs()

        setKpis(
          kpiData || {}
        )

        const monthly =

          await fetchMonthlyDashboard()

        setMonthlyData(

          monthly?.monthlyIncidents || []
        )

        const regions =

          await fetchRegionDashboard()

        setRegionData(

          regions?.regionDistribution || []
        )


        const network =

          await fetchNetworkDashboard()

        setNetworkData(

          network || []
        )

        const risk =

          await fetchRiskDashboard()

        setRiskData(

          risk?.riskCategory || []
        )

        const insightData =

          await generateInsight()

        setInsight(

          insightData?.ai_insight ||

          'AI Telecom Intelligence Platform'
        )

      } catch (error) {

        console.log(
          'Dashboard Error:',
          error
        )

      } finally {

        setLoading(false)
      }
    }

    loadDashboard()

  }, [])

  if (loading) {

    return (

      <div className="h-screen bg-[#061223] flex items-center justify-center text-cyan-300 text-2xl font-bold">

        Loading Telecom Intelligence Dashboard...

      </div>
    )
  }

  return (

    <div className="bg-[#061223] min-h-screen text-white">

      <Sidebar />

      <Header />

      <main className="pt-[90px] px-8 pb-10">

        <div className="mb-8">

          <h1 className="text-4xl font-bold text-cyan-300 uppercase">

            Risk & Operations Hub

          </h1>

          <p className="text-gray-400 mt-3">

            {insight}

          </p>

        </div>

        {/* RIGHT KPI PANEL */}

        <aside className="fixed right-0 top-0 w-[320px] h-screen bg-[#081726]/95 border-l border-cyan-400/20 p-6 overflow-y-auto z-50">

          <h2 className="text-cyan-300 text-xl font-bold uppercase text-center mb-10 leading-10">

            Key Performance Indicators

          </h2>

          <div className="space-y-3">

            <div className="bg-[#0B1B2B]/95 border border-cyan-400/20 rounded-[28px] p-8 text-center">

              <p className="text-gray-400 uppercase mb-4 tracking-wide">

                Total Incidents

              </p>

              <h1 className="text-3xl font-bold text-cyan-300">

                {kpis?.total_incidents || 0}

              </h1>

            </div>

            <div className="bg-[#0B1B2B]/95 border border-cyan-400/20 rounded-[28px] p-8 text-center">

              <p className="text-gray-400 uppercase mb-4 tracking-wide">

                High Risk Tickets

              </p>

              <h1 className="text-3xl font-bold text-red-400">

                {riskData[2]?.value || 0}%

              </h1>

            </div>

            <div className="bg-[#0B1B2B]/95 border border-cyan-400/20 rounded-[28px] p-8 text-center">

              <p className="text-gray-400 uppercase mb-4 tracking-wide">

                Low Risk Tickets

              </p>

              <h1 className="text-3xl font-bold text-green-400">

                {riskData[0]?.value || 0}%

              </h1>

            </div>

            <div className="bg-[#0B1B2B]/95 border border-cyan-400/20 rounded-[28px] p-8 text-center">

              <p className="text-gray-400 uppercase mb-4 tracking-wide">

                Avg Resolution Time

              </p>

              <h1 className="text-3xl font-bold text-yellow-400">

                {kpis?.avg_resolution_time || 0} hrs

              </h1>

            </div>

          </div>

        </aside>

        {/* GRID */}

        <div className="grid grid-cols-2 gap-8 pr-[340px]">

          <div
            onClick={() => navigate('/monthly-trends')}
            className="bg-[#0B1B2B]/95 border border-cyan-400/20 rounded-[30px] p-8 h-[420px] cursor-pointer"
          >

            <h2 className="text-xl font-bold text-cyan-300 mb-8">

              Monthly Incident Trends

            </h2>

            <ResponsiveContainer width="100%" height={260}>

              <LineChart data={monthlyData}>

                <CartesianGrid stroke="#16324d" />

                <XAxis
                  dataKey="month"
                  stroke="#94A3B8"
                />

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

          <div
            onClick={() => navigate('/region-analysis')}
            className="bg-[#0B1B2B]/95 border border-cyan-400/20 rounded-[30px] p-8 h-[420px] cursor-pointer"
          >

            <h2 className="text-xl font-bold text-cyan-300 mb-8">

              Region Analysis

            </h2>

            <ResponsiveContainer width="100%" height={260}>

              <PieChart>

                <Pie
                  data={regionData}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={100}
                  label
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

          <div
            onClick={() => navigate('/network-performance')}
            className="bg-[#0B1B2B]/95 border border-cyan-400/20 rounded-[30px] p-8 h-[420px] cursor-pointer"
          >

            <h2 className="text-xl font-bold text-cyan-300 mb-8">

              Network Performance

            </h2>

            <ResponsiveContainer width="100%" height={260}>

              <BarChart data={networkData}>

                <CartesianGrid stroke="#16324d" />

                <XAxis
                  dataKey="name"
                  stroke="#94A3B8"
                />

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

          <div
            onClick={() => navigate('/reopen-risk')}
            className="bg-[#0B1B2B]/95 border border-cyan-400/20 rounded-[30px] p-8 h-[420px] cursor-pointer"
          >

            <h2 className="text-xl font-bold text-cyan-300 mb-8">

              Reopen Risk

            </h2>

            <ResponsiveContainer width="100%" height={260}>

              <BarChart data={riskData}>

                <CartesianGrid stroke="#16324d" />

                <XAxis
                  dataKey="name"
                  stroke="#94A3B8"
                />

                <YAxis stroke="#94A3B8" />

                <Tooltip />

                <Bar
                  dataKey="value"
                  fill="#FFC857"
                  radius={[10, 10, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>

      </main>

    </div>
  )
}

export default Dashboard