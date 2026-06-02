import pandas as pd
import random
from pathlib import Path

# -----------------------------
# BASE DIRECTORY
# -----------------------------

BASE_DIR = Path(__file__).resolve().parents[3]

# -----------------------------
# LOAD ORIGINAL DATASET
# -----------------------------

data_path = (
    BASE_DIR
    / "backend"
    / "data"
    / "raw"
    / "ISTM.csv"
)

data = pd.read_csv(
    data_path,
    low_memory=False
)

# -----------------------------
# REGION GENERATION
# -----------------------------

data['Region'] = random.choices(
    ['APAC', 'EMEA', 'NAM', 'LATAM'],
    weights=[40, 25, 25, 10],
    k=len(data)
)

# -----------------------------
# NETWORK TYPE GENERATION
# -----------------------------

network_types = [
    '5G Network',
    'Core Network',
    'Wireless Network',
    'VPN Service',
    'Mobile Core',
    'Fiber Network'
]

data['Network_Type'] = [
    random.choice(network_types)
    for _ in range(len(data))
]

# -----------------------------
# DESCRIPTION GENERATOR
# -----------------------------

def generate_description(row):

    category = str(row['Category']).lower()

    network = str(row['Network_Type'])

    ci_cat = str(row['CI_Cat'])

    reassignments = row['No_of_Reassignments']

    # --------------------------------
    # SHARED TELECOM VOCABULARY
    # --------------------------------

    operational_events = [
        "packet loss affecting telecom traffic",
        "network latency impacting operations",
        "intermittent wireless instability observed",
        "vpn disruption affecting connectivity",
        "service degradation impacting users",
        "routing instability detected in network",
        "traffic congestion affecting node performance",
        "telecom outage impacting regional services",
        "network slowdown affecting enterprise traffic",
        "connectivity fluctuations under investigation"
    ]

    support_actions = [
        "awaiting operational confirmation",
        "ticket escalated to telecom support",
        "monitoring ongoing service issue",
        "requires infrastructure verification",
        "engineering review in progress",
        "further network analysis required",
        "issue under telecom investigation"
    ]

    descriptions = []

    # --------------------------------
    # CATEGORY TONE
    # --------------------------------
    neutral_phrases = [
        "telecom ticket under investigation",
        "ongoing operational activity observed",
        "network operations monitoring update",
        "telecom workflow activity detected"
    ]
    descriptions.append(
        random.choice(neutral_phrases)
    )

    if category == "incident":

        incident_phrases = [
            "critical operational issue detected",
            "service instability reported",
            "network issue impacting operations",
            "telecom disruption identified",
            "active outage affecting telecom services",
            "network degradation impacting enterprise traffic",
            "urgent investigation required for telecom disruption",
            "request raised for outage escalation support"
        ]

        request_style_phrases = [
            "requesting update regarding ongoing issue",
            "clarification needed for ongoing connectivity issue"
        ]

        descriptions.append(
            random.choice(
                incident_phrases +
                random.sample(request_style_phrases, 1)
            )
    )

    elif category == "request for information":

        request_phrases = [
            "requesting update regarding ongoing issue",
            "need clarification regarding service behavior",
            "request raised for operational review",
            "seeking status update for telecom issue",
            "guidance required regarding network instability",
            "requesting investigation update from telecom team",
            "clarification needed for ongoing connectivity issue"
        ]

        incident_style_phrases = [
            "service instability reported",
            "network issue impacting operations"
        ]

        descriptions.append(
            random.choice(
                request_phrases +
                random.sample(incident_style_phrases, 1)
            )
        )

    else:

        descriptions.append(
            "general telecom operational activity"
        )

        # --------------------------------
    # SHARED TELECOM CONTEXT
    # --------------------------------

    descriptions.append(
        f"{network} {random.choice(operational_events)}"
    )

    # --------------------------------
    # SHARED SUPPORT CONTEXT
    # --------------------------------

    descriptions.append(
        random.choice(support_actions)
    )

    # --------------------------------
    # REASSIGNMENT CONTEXT
    # --------------------------------

    if pd.notnull(reassignments):

        if reassignments >= 10:

            descriptions.append(
                "ticket reassigned across multiple teams"
            )

    # --------------------------------
    # CI CATEGORY CONTEXT
    # --------------------------------

    descriptions.append(
        f"impacting {ci_cat} services"
    )

    # --------------------------------
    # RANDOMIZE ORDER
    # --------------------------------

    random.shuffle(descriptions)

    return " | ".join(descriptions)

    # --------------------------------
    # SHARED TELECOM CONTEXT
    # --------------------------------

    descriptions.append(
        f"{network} {random.choice(operational_events)}"
    )

    # --------------------------------
    # SHARED SUPPORT CONTEXT
    # --------------------------------

    descriptions.append(
        random.choice(support_actions)
    )

    # --------------------------------
    # REASSIGNMENT CONTEXT
    # --------------------------------

    if pd.notnull(reassignments):

        if reassignments >= 10:

            descriptions.append(
                "ticket reassigned across multiple teams"
            )

    # --------------------------------
    # CI CATEGORY CONTEXT
    # --------------------------------

    descriptions.append(
        f"impacting {ci_cat} services"
    )
    random.shuffle(descriptions)
    return " | ".join(descriptions)

# -----------------------------
# GENERATE DESCRIPTIONS
# -----------------------------

data['Incident Description'] = data.apply(
    generate_description,
    axis=1
)

# -----------------------------
# WAS REOPENED FLAG
# -----------------------------

data['Was_Reopened'] = (
    data['Reopen_Time']
    .notnull()
    .astype(int)
)

# -----------------------------
# DROP UNUSED COLUMNS
# -----------------------------

columns_to_drop = [
    'WBS',
    'number_cnt',
    'KB_number',
    'Related_Interaction',
    'Related_Change'
]

data.drop(
    columns=columns_to_drop,
    inplace=True,
    errors='ignore'
)

# -----------------------------
# SAVE FINAL DATASET
# -----------------------------

output_path = (
    BASE_DIR
    / "backend"
    / "data"
    / "processed"
    / "final_istm_data.csv"
)

data.to_csv(
    output_path,
    index=False
)

# -----------------------------
# OUTPUT
# -----------------------------

print("\nFinal synthetic telecom dataset created successfully.")

print("\nDataset Shape:", data.shape)

pd.set_option(
    'display.max_colwidth',
    None
)

print("\nSample Incident Descriptions:\n")

print(
    data[
        ['Category', 'Incident Description']
    ].head(10)
)