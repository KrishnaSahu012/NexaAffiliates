/* =========================================
   NexaAffiliates - Compliance Management
   Demo Portfolio Data
   ========================================= */

const complianceData = [

    {
        id: "CMP-001",
        affiliate: "NorthStar Media",
        campaign: "Finance Lead Acquisition",
        vertical: "Finance",
        risk: "Low",
        checks: 8,
        passed: 8,
        status: "Approved",
        lastReview: "2026-09-12"
    },

    {
        id: "CMP-002",
        affiliate: "BluePeak Content",
        campaign: "Insurance Quote Flow",
        vertical: "Insurance",
        risk: "Medium",
        checks: 8,
        passed: 7,
        status: "Monitoring",
        lastReview: "2026-09-10"
    },

    {
        id: "CMP-003",
        affiliate: "GrowthPilot Media",
        campaign: "Home Services Lead Gen",
        vertical: "Home Services",
        risk: "Low",
        checks: 7,
        passed: 7,
        status: "Approved",
        lastReview: "2026-09-11"
    },

    {
        id: "CMP-004",
        affiliate: "BluePeak Content",
        campaign: "SaaS Trial Acquisition",
        vertical: "SaaS",
        risk: "Low",
        checks: 6,
        passed: 6,
        status: "Approved",
        lastReview: "2026-09-09"
    },

    {
        id: "CMP-005",
        affiliate: "GrowthPilot Media",
        campaign: "Education Enrollment",
        vertical: "Education",
        risk: "High",
        checks: 8,
        passed: 5,
        status: "Action Required",
        lastReview: "2026-09-13"
    },

    {
        id: "CMP-006",
        affiliate: "NorthStar Media",
        campaign: "Insurance Partner Campaign",
        vertical: "Insurance",
        risk: "Medium",
        checks: 7,
        passed: 6,
        status: "Monitoring",
        lastReview: "2026-09-08"
    },

    {
        id: "CMP-007",
        affiliate: "BluePeak Content",
        campaign: "Consumer Finance Signup",
        vertical: "Finance",
        risk: "Low",
        checks: 8,
        passed: 8,
        status: "Approved",
        lastReview: "2026-09-14"
    },

    {
        id: "CMP-008",
        affiliate: "NorthStar Media",
        campaign: "Home Improvement Leads",
        vertical: "Home Services",
        risk: "Medium",
        checks: 7,
        passed: 6,
        status: "Pending",
        lastReview: "2026-09-15"
    }

];


/* =========================================
   Helper Functions
   ========================================= */

function getElement(id) {
    return document.getElementById(id);
}


function escapeHTML(value) {

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");

}


/* =========================================
   Status Badge
   ========================================= */

function getStatusBadge(status) {

    const badgeMap = {

        "Approved": "badge-success",

        "Monitoring": "badge-warning",

        "Action Required": "badge-danger",

        "Pending": "badge-info"

    };

    const badgeClass = badgeMap[status] || "badge-neutral";

    return `
        <span class="badge ${badgeClass}">
            ${escapeHTML(status)}
        </span>
    `;

}


/* =========================================
   Risk Badge
   ========================================= */

function getRiskBadge(risk) {

    const badgeMap = {

        "Low": "badge-success",

        "Medium": "badge-warning",

        "High": "badge-danger"

    };

    const badgeClass = badgeMap[risk] || "badge-neutral";

    return `
        <span class="badge ${badgeClass}">
            ${escapeHTML(risk)}
        </span>
    `;

}


/* =========================================
   KPI Update
   ========================================= */

function updateComplianceKPIs(data) {

    const total = data.length;

    const approved = data.filter(
        item => item.status === "Approved"
    ).length;

    const monitoring = data.filter(
        item => item.status === "Monitoring"
    ).length;

    const actionRequired = data.filter(
        item => item.status === "Action Required"
    ).length;


    const totalElement = getElement("totalComplianceCount");
    const approvedElement = getElement("approvedComplianceCount");
    const monitoringElement = getElement("monitoringComplianceCount");
    const actionElement = getElement("actionComplianceCount");


    if (totalElement) {
        totalElement.textContent = total;
    }

    if (approvedElement) {
        approvedElement.textContent = approved;
    }

    if (monitoringElement) {
        monitoringElement.textContent = monitoring;
    }

    if (actionElement) {
        actionElement.textContent = actionRequired;
    }

}


/* =========================================
   Render Compliance Table
   ========================================= */

function renderComplianceTable(data) {

    const tableBody = getElement("complianceTableBody");

    const resultCount = getElement("complianceResultCount");

    const countBadge = getElement("complianceCountBadge");


    if (!tableBody) {
        return;
    }


    if (data.length === 0) {

        tableBody.innerHTML = `
            <tr>
                <td colspan="8">
                    <div class="empty-state">

                        <div class="empty-state-icon">
                            <i class="fa-solid fa-shield-halved"></i>
                        </div>

                        <h3 class="empty-state-title">
                            No compliance reviews found
                        </h3>

                        <p class="empty-state-text">
                            Try changing your search or filter options.
                        </p>

                    </div>
                </td>
            </tr>
        `;

    } else {

        tableBody.innerHTML = data.map(item => {

            const checkPercentage =
                Math.round((item.passed / item.checks) * 100);

            return `
                <tr>

                    <td>
                        <span class="primary-text">
                            ${escapeHTML(item.affiliate)}
                        </span>

                        <span class="secondary-text">
                            ${escapeHTML(item.id)}
                        </span>
                    </td>


                    <td>
                        <span class="primary-text">
                            ${escapeHTML(item.campaign)}
                        </span>
                    </td>


                    <td>
                        <span class="badge badge-neutral">
                            ${escapeHTML(item.vertical)}
                        </span>
                    </td>


                    <td>
                        ${getRiskBadge(item.risk)}
                    </td>


                    <td>

                        <div style="min-width:120px;">

                            <div
                                style="
                                    display:flex;
                                    justify-content:space-between;
                                    gap:10px;
                                    margin-bottom:6px;
                                "
                            >

                                <span class="secondary-text">
                                    ${item.passed}/${item.checks} passed
                                </span>

                                <span class="secondary-text">
                                    ${checkPercentage}%
                                </span>

                            </div>

                            <div class="progress">

                                <div
                                    class="progress-bar"
                                    style="width:${checkPercentage}%"
                                ></div>

                            </div>

                        </div>

                    </td>


                    <td>
                        ${getStatusBadge(item.status)}
                    </td>


                    <td>
                        ${escapeHTML(item.lastReview)}
                    </td>


                    <td>

                        <div class="table-actions">

                            <button
                                class="table-action"
                                type="button"
                                title="View review"
                                data-action="view"
                                data-id="${escapeHTML(item.id)}"
                            >
                                <i class="fa-solid fa-eye"></i>
                            </button>

                            <button
                                class="table-action"
                                type="button"
                                title="Review details"
                                data-action="details"
                                data-id="${escapeHTML(item.id)}"
                            >
                                <i class="fa-solid fa-file-lines"></i>
                            </button>

                        </div>

                    </td>

                </tr>
            `;

        }).join("");

    }


    if (resultCount) {

        resultCount.textContent =
            `${data.length} review${data.length === 1 ? "" : "s"}`;

    }


    if (countBadge) {

        countBadge.textContent =
            `${data.length} review${data.length === 1 ? "" : "s"}`;

    }

}


/* =========================================
   Filter Compliance Data
   ========================================= */

function filterComplianceData() {

    const searchInput = getElement("complianceSearch");

    const statusFilter = getElement("complianceStatusFilter");

    const riskFilter = getElement("complianceRiskFilter");

    const verticalFilter = getElement("complianceVerticalFilter");


    const searchTerm =
        searchInput
            ? searchInput.value.trim().toLowerCase()
            : "";


    const selectedStatus =
        statusFilter
            ? statusFilter.value
            : "all";


    const selectedRisk =
        riskFilter
            ? riskFilter.value
            : "all";


    const selectedVertical =
        verticalFilter
            ? verticalFilter.value
            : "all";


    const filteredData = complianceData.filter(item => {

        const matchesSearch =

            searchTerm === "" ||

            item.affiliate.toLowerCase().includes(searchTerm) ||

            item.campaign.toLowerCase().includes(searchTerm) ||

            item.id.toLowerCase().includes(searchTerm);


        const matchesStatus =

            selectedStatus === "all" ||

            item.status === selectedStatus;


        const matchesRisk =

            selectedRisk === "all" ||

            item.risk === selectedRisk;


        const matchesVertical =

            selectedVertical === "all" ||

            item.vertical === selectedVertical;


        return (
            matchesSearch &&
            matchesStatus &&
            matchesRisk &&
            matchesVertical
        );

    });


    updateComplianceKPIs(filteredData);

    renderComplianceTable(filteredData);

}


/* =========================================
   Reset Filters
   ========================================= */

function resetComplianceFilters() {

    const searchInput = getElement("complianceSearch");

    const statusFilter = getElement("complianceStatusFilter");

    const riskFilter = getElement("complianceRiskFilter");

    const verticalFilter = getElement("complianceVerticalFilter");


    if (searchInput) {
        searchInput.value = "";
    }

    if (statusFilter) {
        statusFilter.value = "all";
    }

    if (riskFilter) {
        riskFilter.value = "all";
    }

    if (verticalFilter) {
        verticalFilter.value = "all";
    }


    filterComplianceData();

}


/* =========================================
   Action Handler
   ========================================= */

function handleComplianceAction(action, id) {

    const item = complianceData.find(
        record => record.id === id
    );


    if (!item) {
        return;
    }


    if (action === "view") {

        alert(
            `Compliance Review\n\n` +
            `ID: ${item.id}\n` +
            `Affiliate: ${item.affiliate}\n` +
            `Campaign: ${item.campaign}\n` +
            `Risk: ${item.risk}\n` +
            `Status: ${item.status}\n` +
            `Last Review: ${item.lastReview}`
        );

    }


    if (action === "details") {

        alert(
            `Review Details\n\n` +
            `Policy Checks: ${item.checks}\n` +
            `Checks Passed: ${item.passed}\n` +
            `Pass Rate: ${Math.round(
                (item.passed / item.checks) * 100
            )}%\n\n` +
            `This is fictional portfolio data.`
        );

    }

}


/* =========================================
   Add Compliance Review
   ========================================= */

function addComplianceReview() {

    alert(
        "Add Compliance Review\n\n" +
        "Demo workflow: a new compliance review " +
        "would be created here in a production system."
    );

}


/* =========================================
   Event Listeners
   ========================================= */

function setupComplianceEvents() {

    const searchInput = getElement("complianceSearch");

    const statusFilter = getElement("complianceStatusFilter");

    const riskFilter = getElement("complianceRiskFilter");

    const verticalFilter = getElement("complianceVerticalFilter");

    const resetButton = getElement("resetComplianceFilters");

    const addButton = getElement("addComplianceReviewButton");


    if (searchInput) {

        searchInput.addEventListener(
            "input",
            filterComplianceData
        );

    }


    if (statusFilter) {

        statusFilter.addEventListener(
            "change",
            filterComplianceData
        );

    }


    if (riskFilter) {

        riskFilter.addEventListener(
            "change",
            filterComplianceData
        );

    }


    if (verticalFilter) {

        verticalFilter.addEventListener(
            "change",
            filterComplianceData
        );

    }


    if (resetButton) {

        resetButton.addEventListener(
            "click",
            resetComplianceFilters
        );

    }


    if (addButton) {

        addButton.addEventListener(
            "click",
            addComplianceReview
        );

    }


    const tableBody = getElement("complianceTableBody");


    if (tableBody) {

        tableBody.addEventListener("click", function(event) {

            const button =
                event.target.closest("[data-action]");


            if (!button) {
                return;
            }


            const action =
                button.getAttribute("data-action");


            const id =
                button.getAttribute("data-id");


            handleComplianceAction(action, id);

        });

    }

}


/* =========================================
   Initialize
   ========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        setupComplianceEvents();

        filterComplianceData();

    }
);