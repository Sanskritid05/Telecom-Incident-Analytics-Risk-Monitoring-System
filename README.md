# Telecom Incident Analytics & Risk Monitoring System

An AI-powered telecom operational intelligence platform designed to monitor telecom incidents, estimate reopen risk probabilities, generate operational analytics, and simulate enterprise-grade incident intelligence workflows using Machine Learning, FastAPI, React, and cloud deployment infrastructure.

---

# Executive Summary

Modern telecom systems generate thousands of operational incidents daily, including:

- Fiber outages
- Network instability
- Escalation loops
- Repeated incident reopenings
- Service degradations
- Customer-impacting operational failures

Traditional monitoring systems provide historical visibility into incidents but fail to answer deeper operational questions such as:

- Which incidents are likely to reopen?
- Which regions are operationally unstable?
- Which network domains show degradation patterns?
- Which incidents require proactive intervention?
- Which operational trends indicate escalation risk?

This project was designed to solve those operational intelligence gaps.

The platform combines:

- Machine Learning-based reopen probability estimation
- Telecom operational monitoring dashboards
- Live KPI systems
- Dynamic risk intelligence tables
- Probability-driven operational scoring
- Production deployment architecture

The final system evolved from a simple analytics dashboard into a realistic simulation of enterprise operational intelligence engineering.

---

# Core Objectives

The primary objectives of the project were:

- Build a telecom incident intelligence platform
- Predict reopen risk probabilities
- Visualize operational telecom metrics
- Create real-time dashboard APIs
- Deploy the system to production
- Simulate enterprise operational monitoring
- Maintain production reliability under deployment constraints

---

# Technology Stack

## Frontend

| Technology | Purpose |
|---|---|
| React | UI framework |
| Vite | Frontend build system |
| Tailwind CSS | Styling framework |
| Recharts | Data visualization |
| React Router | Routing/navigation |

---

## Backend

| Technology | Purpose |
|---|---|
| FastAPI | Backend API framework |
| Pandas | Data processing |
| NumPy | Numerical computation |
| Scikit-learn | Machine learning |
| Joblib | Model serialization |

---

## Deployment

| Platform | Responsibility |
|---|---|
| Vercel | Frontend hosting |
| Render | Backend hosting |

---

# Dataset Characteristics

The telecom incident dataset contained operational ticket records involving:

- Incident IDs
- Priorities
- Escalation indicators
- Telecom regions
- Network categories
- Resolution timelines
- Reopen status indicators

---

# Critical Dataset Observation

The dataset suffered from:

## Severe Class Imbalance

Most telecom incidents:
- Were successfully resolved
- Never reopened

Only a small minority represented:
- High-risk operational failures
- Repeated reopen incidents

This created a highly imbalanced binary classification problem.

---

# Initial Machine Learning Pipeline

The original ML architecture focused on:

- Reopen risk classification
- Minority incident detection
- Telecom escalation analysis
- Operational risk prediction

---

# SMOTE Experimentation

The project initially experimented with:

## SMOTE
(Synthetic Minority Oversampling Technique)

to artificially balance minority reopen incidents.

---

# Why SMOTE Was Introduced

Without balancing:

- The model heavily favored majority-class predictions
- Reopen incidents were under-detected
- Accuracy became misleading

SMOTE helped:
- Increase minority visibility
- Improve sensitivity
- Reduce majority bias

---

# Model Evaluation Metrics

The project tracked multiple classification metrics before and after architectural refinements.

---

# Quantitative Model Performance

| Metric | Initial | Improved |
|---|---|---|
| Accuracy | 72.56% | 84.05% |
| ROC-AUC | 0.8064 | 0.8064 |
| PR-AUC | 0.1780 | 0.1780 |
| Precision | 0.1195 | 0.1630 |
| Recall | 0.7221 | 0.5449 |
| F1 Score | 0.2051 | 0.2509 |

---

# Interpretation of Metrics

## Accuracy
**72.56% → 84.05%**

The increase in accuracy demonstrated improved overall classification consistency after pipeline stabilization.

However, due to class imbalance, accuracy alone was not considered reliable.

A classifier predicting mostly:
```python
NOT REOPENED
```

could still achieve deceptively high accuracy.

Therefore, additional metrics became critical.

---

## ROC-AUC
**0.8064**

The ROC-AUC score remained consistently strong.

This indicated:

- Good ranking capability
- Effective probability ordering
- Strong class separation behavior

Even when threshold-based metrics fluctuated, the model continued assigning:

- Higher probabilities to risky incidents
- Lower probabilities to stable incidents

This made ROC-AUC one of the most meaningful metrics in the project.

---

# Why ROC-AUC Was Important

Telecom operational systems prioritize:

## Ranking Quality

more than strict binary certainty.

Operations teams care about:
- Which incidents deserve attention first
- Which tickets require escalation priority

ROC-AUC captured this behavior effectively.

---

## PR-AUC
**0.1780**

The Precision-Recall AUC remained relatively low.

This was expected because:
- Minority reopen incidents were extremely rare
- The dataset remained heavily imbalanced
- Telecom reopen behavior was noisy

PR-AUC is particularly harsh under severe imbalance conditions.

---

## Precision
**0.1195 → 0.1630**

Precision improved noticeably.

This meant:

> A larger proportion of predicted reopen incidents became truly risky incidents.

Operationally, this reduced:
- Unnecessary escalations
- False operational alerts
- Wasted engineering investigations

---

## Recall
**0.7221 → 0.5449**

Recall decreased after optimization.

This was an intentional engineering tradeoff.

Initially, the system aggressively flagged incidents to maximize sensitivity.

This produced:
- Higher recall
- Many false positives

Later refinements improved precision and stability, but slightly reduced incident capture sensitivity.

---

# Operational Interpretation

Even after reduction:

```python
Recall ≈ 54%
```

still meant the system detected over half of genuinely risky incidents.

For a noisy telecom imbalance problem, this remained operationally useful.

---

## F1 Score
**0.2051 → 0.2509**

The F1 score improved significantly.

Although the absolute value remained relatively low, this is statistically understandable under severe imbalance.

---

# Why F1 Was Low

Several reasons contributed:

---

## A. Severe Minority Scarcity

Very few telecom incidents actually reopened.

Thus:
- True positives were rare
- Small prediction variations dramatically affected F1

---

## B. Recall vs Precision Tradeoff

Improving precision reduced aggressive positive predictions.

This naturally lowered recall.

Because:

```python
F1 balances BOTH precision and recall
```

the score remained constrained.

---

## C. Operational Simulation Layer

The project eventually evolved toward:
- Operational realism
- Deployment reliability
- Probability-driven monitoring

rather than pure benchmark optimization.

Thus the platform intentionally prioritized:
- Stable operational behavior
- Realistic intelligence dashboards
- Production deployment stability

over Kaggle-style metric maximization.

---

# Statistical Significance & Threshold Logic

The reopen risk system uses probability thresholds to categorize operational severity.

---

# Final Risk Thresholds

| Probability | Operational Risk |
|---|---|
| < 40% | LOW |
| 40–70% | MEDIUM |
| > 70% | HIGH |

---

# Why Thresholds Were Not Fixed at 50%

In telecom operations:

- Missing dangerous incidents is expensive
- Escalation delays impact customers
- Operational downtime has real consequences

Therefore the system intentionally lowered operational sensitivity thresholds.

This increased proactive monitoring capability.

---

# Type I and Type II Error Analysis

The project demonstrated important operational tradeoffs.

---

# Type I Error (False Positive)

## Meaning

Predicting:
```python
Incident will reopen
```

when it actually does not.

---

## Operational Impact

- Unnecessary escalation
- Wasted monitoring effort
- Engineering overhead
- Operational alert fatigue

---

# Type II Error (False Negative)

## Meaning

Predicting:
```python
Incident is safe
```

when it later reopens.

---

## Operational Impact

- Customer dissatisfaction
- Repeated outages
- SLA violations
- Operational downtime
- Delayed intervention

---

# Which Error Was Prioritized?

The system intentionally prioritized reducing:

## Type II Errors

because telecom operations typically prefer:
- Investigating suspicious incidents

rather than:
- Missing dangerous escalations

This influenced:
- Threshold selection
- Probability sensitivity
- Recall behavior

---

# Why the System Eventually Shifted Toward Probability Intelligence

A major architectural realization emerged:

Binary predictions:
```python
0 or 1
```

were too rigid for operational workflows.

Telecom operations require:
- Prioritization
- Escalation ranking
- Monitoring intensity decisions

Thus the project evolved into:

## Probability-Driven Operational Intelligence

instead of strict binary classification.

---

# Operational Intelligence Dashboard

The frontend dashboard provides:

- Monthly incident trends
- Region analysis
- Network performance monitoring
- Reopen risk analytics
- Dynamic KPI tracking
- Risk intelligence tables

---

# Risk Intelligence Table

One of the most important components.

The table dynamically generates:

- Incident IDs
- Risk scores
- Operational priorities
- Telecom regions
- Timestamps
- Escalation probabilities

This simulates real operational monitoring systems used in enterprise telecom environments.

---

# Major Engineering Challenges

The project evolved into a real production debugging experience.

---

# 1. API Schema Instability

Frontend and backend occasionally disagreed on response structures.

This caused runtime failures such as:

```python
regionData.map is not a function
```

The issue was resolved by standardizing:
- Response unwrapping
- Array validation
- Frontend state contracts

---

# 2. Recharts Visualization Failures

Malformed API responses caused chart crashes.

Defensive rendering patterns were implemented:

```javascript
Array.isArray(data) ? data : []
```

to stabilize the visualization layer.

---

# 3. Render Memory Failures

Heavy dataframe operations and SMOTE workflows caused backend crashes.

The architecture was redesigned toward:
- Lightweight operational scoring
- Probability simulation
- Deployment-safe aggregation logic

This significantly improved production reliability.

---

# 4. CORS & Deployment Synchronization

Frontend and backend deployments initially failed to communicate due to:

- Cross-origin restrictions
- Route mismatches
- Deployment branch inconsistencies

These were resolved through:
- Production-safe CORS middleware
- Git rollback strategies
- Endpoint synchronization

---

# Production Deployment

## Frontend

Hosted on Vercel.

Responsibilities:
- Frontend rendering
- CDN delivery
- Dashboard serving

---

## Backend

Hosted on Render.

Responsibilities:
- ML inference
- Aggregation APIs
- Operational intelligence generation

---

# Final Engineering Philosophy

The project ultimately became:

> A hybrid telecom operational intelligence platform combining real ML-based reopen probability estimation with simulated enterprise-scale operational analytics under production deployment constraints.

The system intentionally balanced:

| Goal | Priority |
|---|---|
| Deployment reliability | High |
| Operational realism | High |
| Dashboard stability | High |
| Real-time responsiveness | High |
| Pure benchmark optimization | Moderate |

---

# Future Improvements

Potential future enhancements include:

- Kafka streaming pipelines
- WebSocket-based live ingestion
- Redis caching
- JWT authentication
- RBAC access control
- Prometheus monitoring
- Grafana observability
- True real-time model serving
- Advanced ensemble ML pipelines

---

# Conclusion

The Telecom Incident Analytics & Risk Monitoring System evolved far beyond a traditional dashboard project.

It became a realistic simulation of:
- Production operational intelligence
- Telecom monitoring workflows
- ML deployment engineering
- Frontend/backend synchronization
- Probability-driven incident prioritization
- Cloud deployment recovery workflows

The project demonstrates practical experience in:

- Machine learning engineering
- Production debugging
- Frontend systems
- Backend architecture
- Deployment reliability
- Operational analytics
- Visualization engineering
- Git recovery workflows
- Fullstack system stabilization

Most importantly, the project reflects the engineering mindset required to maintain reliability, observability, and operational consistency in live production systems.
