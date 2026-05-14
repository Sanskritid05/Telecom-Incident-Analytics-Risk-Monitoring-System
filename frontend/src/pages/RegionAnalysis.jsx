// =======================================
// REGION ANALYSIS DASHBOARD
// File: src/pages/RegionAnalysis.jsx
// =======================================

import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom'

import { useEffect, useState } from 'react'

import {
  fetchRegionDashboard
} from '../services/api'


import {
  PieChart,
  Pie,
  Cell,
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

function RegionAnalysis() {
  const navigate = useNavigate()

  const [regionDistribution, setRegionDistribution] = useState([])

  const [apacGrowth, setApacGrowth] = useState([])

  const [regionalRisk, setRegionalRisk] = useState([])

  const [networkStability, setNetworkStability] = useState([])

  const [kpis, setKpis] = useState(null)

  const COLORS = [
    '#00D1FF',
    '#FFC857',
    '#1E90FF',
    '#22C55E'
  ]

  useEffect(() => {

    const loadDashboard = async () => {

    const data = await fetchRegionDashboard()

    console.log(data)

    setRegionDistribution(
      data.regionDistribution
    )

    setApacGrowth(
      data.apacGrowth
    )

    setRegionalRisk(
      data.regionalRisk
    )

    setNetworkStability(
      data.networkStability
    )

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
    onClick={() => navigate('/monthly-trends')}
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
    onClick={() => navigate('/network-performance')}
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

      <main className=" pt-[90px] px-8 pb-10">

        <div className="mb-8">

          <h1 className="text-4xl font-bold text-cyan-300 uppercase">

            Region Analysis Dashboard

          </h1>

          <p className="text-gray-400 mt-3">

            Regional telecom incident intelligence and risk distribution.

          </p>

        </div>

        <div className="grid grid-cols-2 gap-8">

          {/* PIE */}

          <div className="bg-[#0B1B2B] rounded-3xl p-6 border border-cyan-400/20">

            <h2 className="text-2xl font-bold text-cyan-300 mb-6">

              Regional Incident Distribution

            </h2>

            <div className="w-full h-[320px]">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <PieChart>

                  <Pie
                    data={regionDistribution || []}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={78}
                    innerRadius={45}
                    paddingAngle={3}
                    labelLine={false}

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

                      // LINE START

                      const sx =
                        cx + outerRadius * Math.cos(-midAngle * RADIAN)

                      const sy =
                        cy + outerRadius * Math.sin(-midAngle * RADIAN)

                      // LINE MIDDLE

                      const mx =
                        cx + (outerRadius + 20) * Math.cos(-midAngle * RADIAN)

                      const my =
                        cy + (outerRadius + 20) * Math.sin(-midAngle * RADIAN)

                      // LABEL POSITION

                      const ex =
                        cx + (outerRadius + 28) * Math.cos(-midAngle * RADIAN)

                      const ey =
                        cy + (outerRadius + 28) * Math.sin(-midAngle * RADIAN)

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

                          {/* LABEL */}

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

                      (regionDistribution || []).map((entry, index) => (

                        <Cell
                          key={index}
                          fill={COLORS[index % COLORS.length]}
                        />

                      ))

                    }

                  </Pie>

                  <Tooltip

                    formatter={(value, name) => {

                      const total = (
                        regionDistribution || []
                      ).reduce(

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
                  />

                </PieChart>
              </ResponsiveContainer>

            </div>

          </div>
          {/* APAC */}

          <div className="bg-[#0B1B2B] rounded-3xl p-6 border border-cyan-400/20">

            <h2 className="text-2xl font-bold text-cyan-300 mb-6">

              Monthly APAC Growth

            </h2>

            <div className="w-full h-[320px]">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <LineChart data={apacGrowth || []}>

                  <CartesianGrid stroke="#16324d" />

                  <XAxis dataKey="month" />

                  <YAxis />

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

          </div>

          {/* RISK */}

          <div className="bg-[#0B1B2B] rounded-3xl p-6 border border-cyan-400/20">

            <h2 className="text-2xl font-bold text-cyan-300 mb-6">

              Region-wise Risk Density

            </h2>

            <div className="w-full h-[320px]">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <BarChart data={regionalRisk || []}>

                  <CartesianGrid stroke="#16324d" />

                  <XAxis dataKey="region" />

                  <YAxis />

                  <Tooltip />

                  <Bar
                    dataKey="value"
                    fill="#EF4444"
                    radius={[12, 12, 0, 0]}
                  />

                </BarChart>

              </ResponsiveContainer>

            </div>

          </div>

          {/* STABILITY */}

          <div className="bg-[#0B1B2B] rounded-3xl p-6 border border-cyan-400/20">

            <h2 className="text-2xl font-bold text-cyan-300 mb-6">

              Regional Network Stability

            </h2>

            <div className="w-full h-[320px]">

              <ResponsiveContainer
                width="100%"
                height="100%"
              >

                <BarChart data={networkStability || []}>

                  <CartesianGrid stroke="#16324d" />

                  <XAxis dataKey="region" />

                  <YAxis />

                  <Tooltip />

                  <Bar
                    dataKey="value"
                    fill="#00D1FF"
                    radius={[12, 12, 0, 0]}
                  />

                </BarChart>

              </ResponsiveContainer>

            </div>
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

              APAC Incidents

            </p>

            <h1 className="text-3xl font-bold text-cyan-300">

              {kpis?.apac}

            </h1>

          </div>

          <div className="bg-[#0B1B2B]/95 border border-cyan-400/20 rounded-[28px] p-8 text-center">

            <p className="text-gray-400 uppercase mb-4">

              EMEA Incidents

            </p>

            <h1 className="text-3xl font-bold text-yellow-400">

              {kpis?.emea}

            </h1>

          </div>

          <div className="bg-[#0B1B2B]/95 border border-cyan-400/20 rounded-[28px] p-8 text-center">

            <p className="text-gray-400 uppercase mb-4">

              LATAM Growth

            </p>

            <h1 className="text-3xl font-bold text-green-400">

              {kpis?.latam_growth} 

            </h1>

          </div>

          <div className="bg-[#0B1B2B]/95 border border-cyan-400/20 rounded-[28px] p-8 text-center">

            <p className="text-gray-400 uppercase mb-4">

              Highest Region

            </p>

            <h1 className="text-3xl font-bold text-red-400">

              {kpis?.highest_region}

            </h1>

          </div>

        </div>

      </aside>

    </div>
  )
}

export default RegionAnalysis