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

    <div className="bg-[#061223] min-h-screen text-white overflow-x-hidden">

      {/* SIDEBAR */}

      <Sidebar />

      {/* HEADER */}

      <Header />

      {/* MAIN CONTENT */}

      <main className="pt-[90px] px-8 pb-8">

        {/* TITLE */}

        <div className="mb-8" id='overview'>

          <h1 className="text-5xl font-bold text-cyan-300 uppercase tracking-wide">

            Risk & Operations Hub

          </h1>

          <p className="text-gray-400 mt-3">

            {insight}

          </p>

        </div>

        {/* CHART GRID */}

        <div className="grid grid-cols-2 gap-8 w-full">

          {/* MONTHLY INCIDENT TRENDS */}

          <div
            onClick={() => navigate('/monthly-trends')}
            className="bg-[#0B1B2B]/95 border border-cyan-400/20 rounded-[30px] p-8 h-[420px] min-w-[450px]
            hover:scale-[1.03] hover:shadow-cyan-500/20 hover:shadow-2xl
            hover:border-cyan-300 transition-all duration-300 cursor-pointer"
          >

            <h2 className="text-xl font-bold text-cyan-300 uppercase mb-8 tracking-wide">

              Monthly Incident Trends

            </h2>

            <ResponsiveContainer width="100%" height={260}>

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

            <p className="text-gray-400 mt-6 text-sm">

              {/* {insight} */}

            </p>

          </div>

          {/* REGION ANALYSIS */}

          <div
            onClick={() => navigate('/region-analysis')}
            className="bg-[#0B1B2B]/95 border border-cyan-400/20 rounded-[30px] p-8 h-[420px] min-w-[450px]
            hover:scale-[1.03] hover:shadow-cyan-500/20 hover:shadow-2xl
            hover:border-cyan-300 transition-all duration-300 cursor-pointer"
          >

            <h2 className="text-xl font-bold text-cyan-300 uppercase mb-8 tracking-wide">

              Region Analysis

            </h2>

            <ResponsiveContainer width="100%" height={260}>

              <PieChart>

                <Pie
                  data={regionData || []}
                  dataKey="value"
                  outerRadius={78}
                  labelLine={false}
                  innerRadius={45}
                  paddingAngle={3}
                  label={({ 
                    cx,
                    cy,
                    midAngle,
                    outerRadius,
                    percent,
                    name,
                    fill
                  }) => {

                    const RADIAN = Math.PI / 180

                    // line start
                    const sx =
                      cx + outerRadius * Math.cos(-midAngle * RADIAN)

                    const sy =
                      cy + outerRadius * Math.sin(-midAngle * RADIAN)

                    // line middle
                    const mx =
                      cx + (outerRadius + 20) * Math.cos(-midAngle * RADIAN)

                    const my =
                      cy + (outerRadius + 20) * Math.sin(-midAngle * RADIAN)

                    // label position
                    const ex =
                      cx + (outerRadius + 28) * Math.cos(-midAngle * RADIAN)

                    const ey =
                      cy + (outerRadius + 28

                      ) * Math.sin(-midAngle * RADIAN)

                    const textAnchor =
                      ex > cx ? 'start' : 'end'

                    return (

                      <g>

                        {/* CONNECTOR LINE */}

                        <path
                          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
                          stroke={fill}
                          fill="none"
                          strokeWidth={2}
                        />

                        {/* LABEL TEXT */}

                        <text
                          x={ex}
                          y={ey}
                          fill={fill}
                          textAnchor={textAnchor}
                          dominantBaseline="central"
                          fontSize={12}
                          fontWeight="500"
                        >
                          {`${name} ${(percent * 100).toFixed(0)}%`}
                        </text>

                      </g>
                    )
                  }}
          
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

                <Tooltip
                  formatter={(value, name) => {

                    const total = (regionData || []).reduce(
                      (sum, item) => sum + item.value,
                      0
                    )

                    const percentage = (
                      (value / total) * 100
                    ).toFixed(1)

                    return [
                      `${value} (${percentage}%)`,
                      name
                    ]
                  }}
                />

                <Legend
                  wrapperStyle={{
                    fontSize: '20px'
                  }}
                  ></Legend>

              </PieChart>

            </ResponsiveContainer>

          </div>

          {/* NETWORK PERFORMANCE */}

          <div
            onClick={() => navigate('/network-performance')}
            className="bg-[#0B1B2B]/95 border border-cyan-400/20 rounded-[30px] p-8 h-[420px] min-w-[450px]
            hover:scale-[1.03] hover:shadow-cyan-500/20 hover:shadow-2xl
            hover:border-cyan-300 transition-all duration-300 cursor-pointer"
          >

            <h2 className="text-xl font-bold text-cyan-300 uppercase mb-8 tracking-wide">

              Network Performance

            </h2>

            <ResponsiveContainer width="100%" height={260}>

              <BarChart data={networkData || []}>

                <CartesianGrid
                  stroke="#16324d"
                  strokeDasharray="3 3"
                />

                <XAxis
                  dataKey="name"
                  stroke="#94A3B8"
                  tick={{ fill: '#94A3B8' }}
                />

                <YAxis
                  stroke="#94A3B8"
                  tick={{ fill: '#94A3B8' }}
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
            className="bg-[#0B1B2B]/95 border border-cyan-400/20 rounded-[30px] p-8 h-[420px] min-w-[450px]
            hover:scale-[1.03] hover:shadow-cyan-500/20 hover:shadow-2xl
            hover:border-cyan-300 transition-all duration-300 cursor-pointer"
          >

            <h2 className="text-xl font-bold text-cyan-300 uppercase mb-8 tracking-wide">

              Reopen Risk

            </h2>

            <ResponsiveContainer width="100%" height={260}>

              <BarChart data={riskData || []}>

                <CartesianGrid
                  stroke="#16324d"
                  strokeDasharray="3 3"
                />

                <XAxis
                  dataKey="name"
                  stroke="#94A3B8"
                  tick={{ fill: '#94A3B8' }}
                />

                <YAxis
                  stroke="#94A3B8"
                  tick={{ fill: '#94A3B8' }}
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

        {/* DYNAMIC RISK TABLE */}

        <div id="risk-table" className="mt-8 bg-[#0B1B2B]/95 border border-cyan-400/20 rounded-[30px] p-8 hover:shadow-cyan-500/10 hover:shadow-2xl transition-all duration-300">

          <h2 className="text-2xl font-bold text-cyan-300 uppercase mb-8 tracking-wide">

            Risk Intelligence Table

          </h2>

          {

            loading ? (

              <p className="text-gray-400">

                {/* {insight} */}


              </p>

            ) : (

              <div className="overflow-x-auto">

                <table className="w-full">

                  <thead>

                    <tr className="text-left border-b border-cyan-400/20 text-cyan-300 uppercase tracking-wide">

                      <th className="py-5">Incident ID</th>
                      <th>Risk Score</th>
                      <th>Risk Level</th>
                      <th>Region</th>
                      <th>Priority</th>
                      <th>Last Updated</th>

                    </tr>

                  </thead>

                  <tbody>

                    {[1, 2, 3, 4].map((item, index) => {

                      const probability = Math.min(
                        Math.max(
                          (prediction?.reopen_probability || 0) + (Math.random() * 30 - 15),
                          1
                        ),
                        99
                      )

                      return (

                        <tr
                          key={index}
                          className="border-b border-cyan-400/10 hover:bg-cyan-500/5 transition-all"
                        >

                          <td className="py-5">

                            IMC{Math.floor(Math.random() * 10000)}

                          </td>

                          <td>

                            {probability.toFixed(2)}%

                          </td>

                          <td>

                            <span
                              className={`px-4 py-1 rounded-full text-sm

                              ${
                                probability > 70
                                  ? 'bg-red-500/20 text-red-400'
                                  : probability > 40
                                  ? 'bg-yellow-500/20 text-yellow-400'
                                  : 'bg-green-500/20 text-green-400'
                              }
                            `}
                            >

                              {

                                probability > 70

                                  ? 'HIGH'

                                  : probability > 40

                                  ? 'MED'

                                  : 'LOW'
                              }

                            </span>

                          </td>

                          <td>

                            {Math.floor(Math.random() * 4)}

                          </td>

                          <td>

                            {Math.floor(Math.random() * 5) + 1}

                          </td>

                          <td>

                            {new Date().toLocaleTimeString()}

                          </td>

                        </tr>
                      )
                    })}

                  </tbody>

                </table>

              </div>

            )

          }

        </div>

      </main>

      {/* KPI PANEL */}

      {/* KPI PANEL */}

  <aside className="fixed right-0 top-0 w-[320px] h-screen bg-[#081726]/95 border-l border-cyan-400/20 p-6 overflow-y-auto z-50">

  <h2 className="text-cyan-300 text-xl font-bold uppercase text-center mb-10 leading-10">

    Key Performance Indicators

  </h2>

  <div className="space-y-3">

    {/* TOTAL INCIDENTS */}

    <div className="bg-[#0B1B2B]/95 border border-cyan-400/20 rounded-[28px] p-8 text-center hover:scale-[1.02] transition-all duration-300">

      <p className="text-gray-400 uppercase mb-4">

        Total Incidents

      </p>

      <h1 className="text-3xl font-bold text-cyan-300">

        {kpis?.total_incidents}

      </h1>

    </div>

    {/* REOPENED INCIDENTS */}

    <div className="bg-[#0B1B2B]/95 border border-cyan-400/20 rounded-[28px] p-8 text-center hover:scale-[1.02] transition-all duration-300">

      <p className="text-gray-400 uppercase mb-4">

        Reopened Incidents

      </p>

      <h1 className="text-3xl font-bold text-orange-400">

        {kpis?.reopened_incidents}

      </h1>

    </div>

    {/* HIGH RISK RATE */}

    <div className="bg-[#0B1B2B]/95 border border-cyan-400/20 rounded-[28px] p-8 text-center hover:scale-[1.02] transition-all duration-300">

      <p className="text-gray-400 uppercase mb-4">

        High Risk Rate

      </p>

      <h1 className="text-3xl font-bold text-red-400">

        {kpis?.high_risk_rate}%

      </h1>

    </div>

    {/* LOW RISK RATE */}

    <div className="bg-[#0B1B2B]/95 border border-cyan-400/20 rounded-[28px] p-8 text-center hover:scale-[1.02] transition-all duration-300">

      <p className="text-gray-400 uppercase mb-4">

        Low Risk Rate

      </p>

      <h1 className="text-3xl font-bold text-green-400">

        {kpis?.low_risk_rate}%

      </h1>

    </div>

    {/* AVG RESOLUTION TIME */}

    <div className="bg-[#0B1B2B]/95 border border-cyan-400/20 rounded-[28px] p-8 text-center hover:scale-[1.02] transition-all duration-300">

      <p className="text-gray-400 uppercase mb-4">

        Avg Resolution Time

      </p>

      <h1 className="text-3xl font-bold text-blue-400">

        {kpis?.avg_resolution_time} hrs

      </h1>

    </div>

    {/* NETWORK PERFORMANCE */}

    <div className="bg-[#0B1B2B]/95 border border-cyan-400/20 rounded-[28px] p-8 text-center hover:scale-[1.02] transition-all duration-300">

      <p className="text-gray-400 uppercase mb-4">

        Network Performance%

      </p>

      <h1 className="text-3xl font-bold text-blue-400">

        {kpis?.network_performance}%

      </h1>

    </div>

  </div>

  </aside>

    </div>
  )

  
}


export default Dashboard