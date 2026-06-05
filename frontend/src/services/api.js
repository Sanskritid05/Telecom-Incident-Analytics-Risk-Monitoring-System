const BASE_URL =
  'https://telecom-ai-backend-pm1k.onrender.com'

// ==========================================
// BACKEND WARMUP
// ==========================================

export const warmupBackend = async () => {

  try {

    await fetch(BASE_URL)

  } catch (error) {

    console.log(error)
  }
}

// ==========================================
// GENERIC FETCH HELPER
// ==========================================

const fetchAPI = async (endpoint) => {

  try {

    const response = await fetch(

      `${BASE_URL}${endpoint}?t=${Date.now()}`,

      {
        cache: 'no-store'
      }
    )

    if (!response.ok) {

      throw new Error(

        `HTTP ERROR: ${response.status}`
      )
    }

    return await response.json()

  } catch (error) {

    console.log(
      'API ERROR:',
      error
    )

    return null
  }
}

// ==========================================
// GENERATE AI INSIGHT
// ==========================================

export const generateInsight = async () => {

  return await fetchAPI(
    '/generate-insight'
  )
}

// ==========================================
// LIVE REOPEN PREDICTION
// ==========================================

export const predictReopenRisk = async () => {

  return await fetchAPI(
    '/live-prediction'
  )
}

// ==========================================
// LIVE KPI METRICS
// ==========================================

export const fetchLiveKPIs = async () => {

  return await fetchAPI(
    '/live-kpis'
  )
}

// ==========================================
// MONTHLY DASHBOARD
// ==========================================

export const fetchMonthlyDashboard = async () => {

  return await fetchAPI(
    '/dashboard/monthly-trends'
  )
}

// ==========================================
// REGION ANALYSIS DASHBOARD
// ==========================================

export const fetchRegionDashboard = async () => {

  return await fetchAPI(
    '/dashboard/region-analysis'
  )
}

// ==========================================
// NETWORK PERFORMANCE DASHBOARD
// ==========================================

export const fetchNetworkDashboard = async () => {

  return await fetchAPI(
    '/dashboard/network-performance'
  )
}

// ==========================================
// REOPEN RISK DASHBOARD
// ==========================================

export const fetchRiskDashboard = async () => {

  return await fetchAPI(
    '/dashboard/reopen-risk'
  )
}

// ==========================================
// AI DASHBOARD SUBTITLES
// ==========================================

export const fetchAISubtitle = async (

  dashboard

) => {

  return await fetchAPI(

    `/generate-ai-subtitle/${dashboard}`
  )
}