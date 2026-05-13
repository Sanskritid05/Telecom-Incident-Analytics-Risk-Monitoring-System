const BASE_URL = 'https://telecom-ai-backend-pm1k.onrender.com'


// ==========================================
// GENERIC FETCH HELPER
// ==========================================

const fetchAPI = async (endpoint) => {

  const response = await fetch(

    `${BASE_URL}${endpoint}?t=${Date.now()}`,

    {
      cache: 'no-store'
    }
  )

  return await response.json()
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
// MONTHLY INCIDENT TRENDS
// ==========================================

export const fetchMonthlyTrends = async () => {

  return await fetchAPI(
    '/monthly-trends'
  )
}

// ==========================================
// REGIONAL ANALYSIS
// ==========================================

export const fetchRegionAnalysis = async () => {

  return await fetchAPI(
    '/region-analysis'
  )
}

// ==========================================
// NETWORK PERFORMANCE
// ==========================================

export const fetchNetworkPerformance = async () => {

  return await fetchAPI(
    '/network-performance'
  )
}

// ==========================================
// RISK DISTRIBUTION
// ==========================================

export const fetchRiskDistribution = async () => {

  return await fetchAPI(
    '/risk-distribution'
  )
}

/// ==========================================
// LIVE PERSONALIZED DASHBOARDS
// ==========================================

/// ==========================================
// MONTHLY TREND DASHBOARDS
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