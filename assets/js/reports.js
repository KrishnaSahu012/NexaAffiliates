/* =========================================
   NexaAffiliates - Reports
   Demo Portfolio Data
   ========================================= */

const reportsData = [

    {
        id: "RPT-001",
        name: "Weekly Campaign Performance",
        type: "Performance",
        period: "Weekly",
        owner: "Account Team",
        status: "Ready",
        lastGenerated: "2026-09-15"
    },

    {
        id: "RPT-002",
        name: "Monthly Affiliate Performance",
        type: "Performance",
        period: "Monthly",
        owner: "Account Team",
        status: "Ready",
        lastGenerated: "2026-09-01"
    },

    {
        id: "RPT-003",
        name: "Daily Traffic Summary",
        type: "Performance",
        period: "Daily",
        owner: "Analytics Team",
        status: "Scheduled",
        lastGenerated: "2026-09-16"
    },

    {
        id: "RPT-004",
        name: "Affiliate Account Activity",
        type: "Account",
        period: "Weekly",
        owner: "Account Team",
        status: "Ready",
        lastGenerated: "2026-09-14"
    },

    {
        id: "RPT-005",
        name: "Advertiser Account Summary",
        type: "Account",
        period: "Monthly",
        owner: "Account Team",
        status: "Draft",
        lastGenerated: "2026-08-31"
    },

    {
        id: "RPT-006",
        name: "Compliance Review Summary",
        type: "Compliance",
        period: "Weekly",
        owner: "Compliance Team",
        status: "Ready",
        lastGenerated: "2026-09-15"
    },

    {
        id: "RPT-007",
        name: "Campaign Launch Report",
        type: "Campaign",
        period: "Daily",
        owner: "Campaign Team",
        status: "Ready",
        lastGenerated: "2026-09-16"
    },

    {
        id: "RPT-008",
        name: "Monthly Compliance Overview",
        type: "Compliance",
        period: "Monthly",
        owner: "Compliance Team",
        status: "Scheduled",
        lastGenerated: "2026-09-01"
    },

    {
        id: "RPT-009",
        name: "Campaign Optimization Summary",
        type: "Campaign",
        period: "Weekly",
        owner: "Analytics Team",
        status: "Draft",
        lastGenerated: "2026-09-12"
    }

];


/* =========================================
   Helper
   ========================================= */

function getReportElement(id) {

    return document.getElementById(id);

}


function escapeReportHTML(value) {

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

function getReportStatusBadge(status) {

    const badgeMap = {

        "Ready": "badge-success",

        "Scheduled": "badge-info",

        "Draft": "badge-warning"

    };

    const badgeClass =
        badgeMap[status] || "badge-neutral";


    return `
        <span class="badge ${badgeClass}">
            ${escapeReportHTML(status)}
        </span>
    `;

}


/* =========================================
   Type Badge
   ========================================= */

function getReportTypeBadge(type) {

    const badgeMap = {

        "Performance": "badge-primary",

        "Account": "badge-info",

        "Compliance": "badge-warning",

        "Campaign": "badge-success"

    };

    const badgeClass =
        badgeMap[type] || "badge-neutral";


    return `
        <span class="badge ${badgeClass}">
            ${escapeReportHTML(type)}
        </span>
    `;

}


/* =========================================
   Update KPIs
   ========================================= */

function updateReportKPIs(data) {

    const total =
        data.length;


    const performance =
        data.filter(
            item => item.type === "Performance"
        ).length;


    const account =
        data.filter(
            item => item.type === "Account"
        ).length;


    const scheduled =
        data.filter(
            item => item.status === "Scheduled"
        ).length;


    const totalElement =
        getReportElement("totalReportsCount");


    const performanceElement =
        getReportElement("performanceReportsCount");


    const accountElement =
        getReportElement("accountReportsCount");


    const scheduledElement =
        getReportElement("scheduledReportsCount");


    if (totalElement) {

        totalElement.textContent = total;

    }


    if (performanceElement) {

        performanceElement.textContent = performance;

    }


    if (accountElement) {

        accountElement.textContent = account;

    }


    if (scheduledElement) {

        scheduledElement.textContent = scheduled;

    }

}


/* =========================================
   Render Report Table
   ========================================= */

function renderReportsTable(data) {

    const tableBody =
        getReportElement("reportsTableBody");


    const resultCount =
        getReportElement("reportsResultCount");


    const countBadge =
        getReportElement("reportsCountBadge");


    if (!tableBody) {

        return;

    }


    if (data.length === 0) {

        tableBody.innerHTML = `

            <tr>

                <td colspan="7">

                    <div class="empty-state">

                        <div class="empty-state-icon">

                            <i class="fa-solid fa-file-circle-xmark"></i>

                        </div>


                        <h3 class="empty-state-title">
                            No reports found
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

            return `

                <tr>


                    <!-- Report -->

                    <td>

                        <span class="primary-text">
                            ${escapeReportHTML(item.name)}
                        </span>

                        <span class="secondary-text">
                            ${escapeReportHTML(item.id)}
                        </span>

                    </td>


                    <!-- Type -->

                    <td>

                        ${getReportTypeBadge(item.type)}

                    </td>


                    <!-- Period -->

                    <td>

                        <span class="primary-text">
                            ${escapeReportHTML(item.period)}
                        </span>

                    </td>


                    <!-- Owner -->

                    <td>

                        <span class="primary-text">
                            ${escapeReportHTML(item.owner)}
                        </span>

                    </td>


                    <!-- Status -->

                    <td>

                        ${getReportStatusBadge(item.status)}

                    </td>


                    <!-- Last Generated -->

                    <td>

                        ${escapeReportHTML(item.lastGenerated)}

                    </td>


                    <!-- Actions -->

                    <td>

                        <div class="table-actions">


                            <button
                                class="table-action"
                                type="button"
                                title="View report"
                                data-action="view"
                                data-id="${escapeReportHTML(item.id)}"
                            >

                                <i class="fa-solid fa-eye"></i>

                            </button>


                            <button
                                class="table-action"
                                type="button"
                                title="Download report"
                                data-action="download"
                                data-id="${escapeReportHTML(item.id)}"
                            >

                                <i class="fa-solid fa-download"></i>

                            </button>


                        </div>

                    </td>


                </tr>

            `;

        }).join("");

    }


    if (resultCount) {

        resultCount.textContent =
            `${data.length} report${data.length === 1 ? "" : "s"}`;

    }


    if (countBadge) {

        countBadge.textContent =
            `${data.length} report${data.length === 1 ? "" : "s"}`;

    }

}


/* =========================================
   Filter Reports
   ========================================= */

function filterReportsData() {

    const searchInput =
        getReportElement("reportSearch");


    const typeFilter =
        getReportElement("reportTypeFilter");


    const statusFilter =
        getReportElement("reportStatusFilter");


    const periodFilter =
        getReportElement("reportPeriodFilter");


    const searchTerm =
        searchInput
            ? searchInput.value.trim().toLowerCase()
            : "";


    const selectedType =
        typeFilter
            ? typeFilter.value
            : "all";


    const selectedStatus =
        statusFilter
            ? statusFilter.value
            : "all";


    const selectedPeriod =
        periodFilter
            ? periodFilter.value
            : "all";


    const filteredData =
        reportsData.filter(item => {


            const matchesSearch =

                searchTerm === "" ||

                item.name
                    .toLowerCase()
                    .includes(searchTerm) ||

                item.owner
                    .toLowerCase()
                    .includes(searchTerm) ||

                item.id
                    .toLowerCase()
                    .includes(searchTerm);


            const matchesType =

                selectedType === "all" ||

                item.type === selectedType;


            const matchesStatus =

                selectedStatus === "all" ||

                item.status === selectedStatus;


            const matchesPeriod =

                selectedPeriod === "all" ||

                item.period === selectedPeriod;


            return (

                matchesSearch &&

                matchesType &&

                matchesStatus &&

                matchesPeriod

            );

        });


    updateReportKPIs(filteredData);

    renderReportsTable(filteredData);

}


/* =========================================
   Reset Filters
   ========================================= */

function resetReportFilters() {

    const searchInput =
        getReportElement("reportSearch");


    const typeFilter =
        getReportElement("reportTypeFilter");


    const statusFilter =
        getReportElement("reportStatusFilter");


    const periodFilter =
        getReportElement("reportPeriodFilter");


    if (searchInput) {

        searchInput.value = "";

    }


    if (typeFilter) {

        typeFilter.value = "all";

    }


    if (statusFilter) {

        statusFilter.value = "all";

    }


    if (periodFilter) {

        periodFilter.value = "all";

    }


    filterReportsData();

}


/* =========================================
   View Report
   ========================================= */

function viewReport(id) {

    const report =
        reportsData.find(
            item => item.id === id
        );


    if (!report) {

        return;

    }


    alert(

        `Report Details\n\n` +

        `ID: ${report.id}\n` +

        `Name: ${report.name}\n` +

        `Type: ${report.type}\n` +

        `Period: ${report.period}\n` +

        `Owner: ${report.owner}\n` +

        `Status: ${report.status}\n` +

        `Last Generated: ${report.lastGenerated}`

    );

}


/* =========================================
   Download Demo Report
   ========================================= */

function downloadReport(id) {

    const report =
        reportsData.find(
            item => item.id === id
        );


    if (!report) {

        return;

    }


    const csvRows = [

        [
            "Report ID",
            "Report Name",
            "Type",
            "Period",
            "Owner",
            "Status",
            "Last Generated"
        ],

        [
            report.id,
            report.name,
            report.type,
            report.period,
            report.owner,
            report.status,
            report.lastGenerated
        ]

    ];


    const csvContent =
        csvRows
            .map(row =>
                row
                    .map(value =>
                        `"${String(value).replace(/"/g, '""')}"`
                    )
                    .join(",")
            )
            .join("\n");


    const blob =
        new Blob(
            [csvContent],
            {
                type: "text/csv;charset=utf-8;"
            }
        );


    const url =
        URL.createObjectURL(blob);


    const link =
        document.createElement("a");


    link.href = url;

    link.download =
        `${report.id}-demo-report.csv`;


    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);


    URL.revokeObjectURL(url);

}


/* =========================================
   Generate Report
   ========================================= */

function generateReport() {

    const reportName =
        "Generated Campaign Performance Report";


    const csvRows = [

        [
            "Campaign",
            "Vertical",
            "Traffic",
            "Clicks",
            "Conversions",
            "Revenue"
        ],

        [
            "Finance Lead Acquisition",
            "Finance",
            "Search",
            "8420",
            "286",
            "5148.00"
        ],

        [
            "Insurance Quote Flow",
            "Insurance",
            "Content",
            "6940",
            "221",
            "5414.50"
        ],

        [
            "Home Services Lead Gen",
            "Home Services",
            "Search",
            "9180",
            "318",
            "5167.50"
        ]

    ];


    const csvContent =
        csvRows
            .map(row =>
                row
                    .map(value =>
                        `"${String(value).replace(/"/g, '""')}"`
                    )
                    .join(",")
            )
            .join("\n");


    const blob =
        new Blob(
            [csvContent],
            {
                type: "text/csv;charset=utf-8;"
            }
        );


    const url =
        URL.createObjectURL(blob);


    const link =
        document.createElement("a");


    link.href = url;

    link.download =
        "nexaaffiliates-generated-performance-demo.csv";


    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);


    URL.revokeObjectURL(url);


    alert(
        `${reportName} generated successfully.\n\n` +
        `Demo CSV file has been prepared.`
    );

}


/* =========================================
   Event Listeners
   ========================================= */

function setupReportEvents() {

    const searchInput =
        getReportElement("reportSearch");


    const typeFilter =
        getReportElement("reportTypeFilter");


    const statusFilter =
        getReportElement("reportStatusFilter");


    const periodFilter =
        getReportElement("reportPeriodFilter");


    const resetButton =
        getReportElement("resetReportFilters");


    const generateButton =
        getReportElement("generateReportButton");


    if (searchInput) {

        searchInput.addEventListener(
            "input",
            filterReportsData
        );

    }


    if (typeFilter) {

        typeFilter.addEventListener(
            "change",
            filterReportsData
        );

    }


    if (statusFilter) {

        statusFilter.addEventListener(
            "change",
            filterReportsData
        );

    }


    if (periodFilter) {

        periodFilter.addEventListener(
            "change",
            filterReportsData
        );

    }


    if (resetButton) {

        resetButton.addEventListener(
            "click",
            resetReportFilters
        );

    }


    if (generateButton) {

        generateButton.addEventListener(
            "click",
            generateReport
        );

    }


    const tableBody =
        getReportElement("reportsTableBody");


    if (tableBody) {

        tableBody.addEventListener(
            "click",
            function(event) {


                const button =
                    event.target.closest("[data-action]");


                if (!button) {

                    return;

                }


                const action =
                    button.getAttribute("data-action");


                const id =
                    button.getAttribute("data-id");


                if (action === "view") {

                    viewReport(id);

                }


                if (action === "download") {

                    downloadReport(id);

                }

            }
        );

    }

}


/* =========================================
   Initialize
   ========================================= */

document.addEventListener(
    "DOMContentLoaded",
    function() {

        setupReportEvents();

        filterReportsData();

    }
);