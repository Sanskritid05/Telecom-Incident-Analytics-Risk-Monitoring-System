import Sidebar from '../components/Sidebar'
import Header from '../components/Header'
import { useNavigate } from 'react-router-dom'

import { useEffect, useState } from 'react'

import {
  fetchMonthlyDashboard
} from '../services/api'

import {

  fetchAISubtitle

} from '../services/api'

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Label,
  Legend

} from 'recharts'

function MonthlyTrends() {

  // =========================
  // DATA
  // =========================
  const navigate = useNavigate()

  const [monthlyIncidents, setMonthlyIncidents] = useState([])

  const [highRisk, setHighRisk] = useState([])

  const [regionCount, setRegionCount] = useState([])

  const [riskLevel, setRiskLevel] = useState([])

  const [kpis, setKpis] = useState(null)

  const COLORS = [
    '#00D1FF',
    '#FFC857',
    '#1E90FF',
    '#22C55E'
  ]

  useEffect(() => {

  const loadDashboard = async () => {

    const data = await fetchMonthlyDashboard()

    setMonthlyIncidents(
      data.monthlyIncidents
    )

    setHighRisk(
      data.highRisk
    )

    setRegionCount(
      data.regionCount
    )

    setRiskLevel(
      data.riskLevel
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
    onClick={() => navigate('/')}
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

    {'>>'}

  </button>

</div>

      <main className= "pt-[90px] px-8 pb-10">

        {/* PAGE TITLE */}

        <div className="mb-8">

          <h1 className="text-4xl font-bold text-cyan-300 uppercase">

            Monthly Incident Trends Dashboard

          </h1>

          <p className="text-gray-400 mt-3">

            Telecom incident escalation and regional distribution analysis.

          </p>

        </div>

        {/* RIGHT KPI PANEL */}

            <aside className="fixed right-0 top-0 w-[320px] h-screen bg-[#081726]/95 border-l border-cyan-400/20 p-6 overflow-y-auto z-50">

            <h2 className="text-cyan-300 text-xl font-bold uppercase text-center mb-10 leading-10">

                Key Performance Indicators

            </h2>

            <div className="space-y-3">

                {/* TOTAL INCIDENTS */}

                <div className="bg-[#0B1B2B]/95 border border-cyan-400/20 rounded-[28px] p-8 text-center">

                <p className="text-gray-400 uppercase mb-4 tracking-wide">

                    Total Incidents

                </p>

                <h1 className="text-3xl font-bold text-cyan-300">

                    {kpis?.total_incidents}

                </h1>

                </div>

                {/* HIGH RISK */}

                <div className="bg-[#0B1B2B]/95 border border-cyan-400/20 rounded-[28px] p-8 text-center">

                <p className="text-gray-400 uppercase mb-4 tracking-wide">

                    High Risk Tickets

                </p>

                <h1 className="text-3xl font-bold text-red-400">

                    {kpis?.high_risk} % 

                </h1>

                </div>

                {/* AVG GROWTH */}

                <div className="bg-[#0B1B2B]/95 border border-cyan-400/20 rounded-[28px] p-8 text-center">

                <p className="text-gray-400 uppercase mb-4 tracking-wide">

                    Avg Growth

                </p>

                <h1 className="text-3xl font-bold text-yellow-400">

                    {kpis?.growth} 

                </h1>

                </div>

                {/* PEAK MONTH */}

                <div className="bg-[#0B1B2B]/95 border border-cyan-400/20 rounded-[28px] p-8 text-center">

                <p className="text-gray-400 uppercase mb-4 tracking-wide">

                    Peak Month

                </p>

                <h1 className="text-3xl font-bold text-green-400">

                    {kpis?.peak_month}

                </h1>

                </div>

            </div>

            </aside>

        

        {/* ANALYTICS GRID */}

        <div className="grid grid-cols-2 gap-8">

          {/* MONTHLY INCIDENT COUNT */}

          <div className="bg-[#0B1B2B]/95 border border-cyan-400/20 rounded-[30px] p-8 h-[420px] w-full overflow-hidden min-w-[450px] hover:shadow-cyan-500/10 hover:shadow-2xl transition-all duration-300">
        

            <h2 className="text-2xl font-bold text-cyan-300 mb-6">

              Monthly Incident Count

            </h2>

            <ResponsiveContainer width="100%" height={320}>

              <LineChart data={monthlyIncidents || []}>

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

          {/* MONTHLY HIGH RISK */}

          <div className="bg-[#0B1B2B]/95 border border-cyan-400/20 rounded-[30px] p-8 h-[420px] w-full overflow-hidden min-w-[450px] hover:shadow-cyan-500/10 hover:shadow-2xl transition-all duration-300">


            <h2 className="text-2xl font-bold text-cyan-300 mb-6">

              Monthly High Risk Incidents

            </h2>

            <ResponsiveContainer width="100%" height={320}>

              <BarChart data={highRisk || []}>

                <CartesianGrid stroke="#16324d" />

                <XAxis dataKey="month" stroke="#94A3B8" />

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

          {/* REGION COUNT */}

        <div className="bg-[#0B1B2B]/95 border border-cyan-400/20 rounded-[30px] p-8 h-[420px] w-full overflow-hidden min-w-[450px] hover:shadow-cyan-500/10 hover:shadow-2xl transition-all duration-300">


            <h2 className="text-2xl font-bold text-cyan-300 mb-6">

              Monthly Region Count

            </h2>

            <ResponsiveContainer width="100%" height={320}>

              <PieChart>

                <Pie
                  data={regionCount || []}
                  dataKey="value"
                  outerRadius={100}
                  label
                >

                  {
                    regionCount.map((entry, index) => (

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

          {/* MONTHLY RISK LEVEL */}

          <div className="bg-[#0B1B2B]/95 border border-cyan-400/20 rounded-[30px] p-8 h-[420px] w-full overflow-hidden min-w-[450px] hover:shadow-cyan-500/10 hover:shadow-2xl transition-all duration-300">


            <h2 className="text-2xl font-bold text-cyan-300 mb-6">

              Monthly Risk Level

            </h2>

            <ResponsiveContainer width="100%" height={320}>

              <BarChart data={riskLevel || []}>

                <CartesianGrid stroke="#16324d" />

                <XAxis dataKey="level" stroke="#94A3B8" />

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

        </div>

      </main>

    </div>
  )
}

export default MonthlyTrends