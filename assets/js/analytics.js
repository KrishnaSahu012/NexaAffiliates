/* =========================================
   NexaAffiliates - Performance Analytics
   Portfolio Simulation
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =========================================
       FICTIONAL PERFORMANCE DATA
    ========================================= */

    const performanceData = [

        {
            id: "CMP-001",
            campaign: "Finance Lead Acquisition",
            vertical: "Finance",
            traffic: "Search",
            clicks: 8420,
            conversions: 286,
            revenue: 5148
        },

        {
            id: "CMP-002",
            campaign: "Insurance Quote Flow",
            vertical: "Insurance",
            traffic: "Content",
            clicks: 6940,
            conversions: 221,
            revenue: 5414.50
        },

        {
            id: "CMP-003",
            campaign: "Home Services Lead Gen",
            vertical: "Home Services",
            traffic: "Search",
            clicks: 9180,
            conversions: 318,
            revenue: 5167.50
        },

        {
            id: "CMP-004",
            campaign: "SaaS Trial Acquisition",
            vertical: "SaaS",
            traffic: "Content",
            clicks: 5760,
            conversions: 174,
            revenue: 4176
        },

        {
            id: "CMP-005",
            campaign: "Education Enrollment",
            vertical: "Education",
            traffic: "Social",
            clicks: 4320,
            conversions: 129,
            revenue: 2515.50
        },

        {
            id: "CMP-006",
            campaign: "Insurance Partner Campaign",
            vertical: "Insurance",
            traffic: "Email",
            clicks: 3580,
            conversions: 142,
            revenue: 3479
        },

        {
            id: "CMP-007",
            campaign: "Consumer Finance Signup",
            vertical: "Finance",
            traffic: "Search",
            clicks: 7280,
            conversions: 247,
            revenue: 4446
        },

        {
            id: "CMP-008",
            campaign: "Home Improvement Leads",
            vertical: "Home Services",
            traffic: "Content",
            clicks: 2980,
            conversions: 91,
            revenue: 1478.75
        }

    ];


    /* =========================================
       DOM ELEMENTS
    ========================================= */

    const tableBody =
        document.getElementById("analyticsTableBody");

    const searchInput =
        document.getElementById("analyticsSearch");

    const dateFilter =
        document.getElementById("analyticsDateFilter");

    const verticalFilter =
        document.getElementById("analyticsVerticalFilter");

    const trafficFilter =
        document.getElementById("analyticsTrafficFilter");

    const resetButton =
        document.getElementById("resetAnalyticsFilters");

    const resultCount =
        document.getElementById("analyticsResultCount");

    const clicksElement =
        document.getElementById("analyticsClicks");

    const conversionsElement =
        document.getElementById("analyticsConversions");

    const revenueElement =
        document.getElementById("analyticsRevenue");

    const epcElement =
        document.getElementById("analyticsEpc");

    const trafficSourceList =
        document.getElementById("trafficSourceList");

    const trafficChart =
        document.getElementById("trafficChart");

    const exportButton =
        document.getElementById("exportAnalyticsButton");


    /* =========================================
       FORMAT NUMBER
    ========================================= */

    function formatNumber(value) {

        return Number(value).toLocaleString("en-US");

    }


    /* =========================================
       FORMAT CURRENCY
    ========================================= */

    function formatCurrency(value) {

        return "$" + Number(value).toLocaleString(
            "en-US",
            {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2
            }
        );

    }


    /* =========================================
       CALCULATE CONVERSION RATE
    ========================================= */

    function getConversionRate(clicks, conversions) {

        if (!clicks) {
            return 0;
        }

        return (
            (conversions / clicks) * 100
        );

    }


    /* =========================================
       CALCULATE EPC
    ========================================= */

    function getEpc(clicks, revenue) {

        if (!clicks) {
            return 0;
        }

        return revenue / clicks;

    }


    /* =========================================
       TRAFFIC CLASS
    ========================================= */

    function getTrafficClass(traffic) {

        if (traffic === "Search") {
            return "badge-primary";
        }

        if (traffic === "Content") {
            return "badge-info";
        }

        if (traffic === "Social") {
            return "badge-warning";
        }

        return "badge-neutral";

    }


    /* =========================================
       UPDATE KPI CARDS
    ========================================= */

    function updateKpis(data) {

        let totalClicks = 0;
        let totalConversions = 0;
        let totalRevenue = 0;


        data.forEach(function (item) {

            totalClicks += item.clicks;

            totalConversions += item.conversions;

            totalRevenue += item.revenue;

        });


        const totalEpc =
            totalClicks > 0
                ? totalRevenue / totalClicks
                : 0;


        if (clicksElement) {

            clicksElement.textContent =
                formatNumber(totalClicks);

        }


        if (conversionsElement) {

            conversionsElement.textContent =
                formatNumber(totalConversions);

        }


        if (revenueElement) {

            revenueElement.textContent =
                formatCurrency(totalRevenue);

        }


        if (epcElement) {

            epcElement.textContent =
                formatCurrency(totalEpc);

        }

    }


    /* =========================================
       CREATE PERFORMANCE ROW
    ========================================= */

    function createPerformanceRow(item) {

        const row =
            document.createElement("tr");


        const conversionRate =
            getConversionRate(
                item.clicks,
                item.conversions
            );


        const epc =
            getEpc(
                item.clicks,
                item.revenue
            );


        const trafficClass =
            getTrafficClass(item.traffic);


        row.innerHTML = `

            <td>

                <div class="primary-text">
                    ${item.campaign}
                </div>

                <span class="secondary-text">
                    ${item.id}
                </span>

            </td>


            <td>
                ${item.vertical}
            </td>


            <td>

                <span class="badge ${trafficClass}">
                    ${item.traffic}
                </span>

            </td>


            <td>

                <span class="primary-text">
                    ${formatNumber(item.clicks)}
                </span>

            </td>


            <td>

                <span class="primary-text">
                    ${formatNumber(item.conversions)}
                </span>

            </td>


            <td>

                ${conversionRate.toFixed(2)}%

            </td>


            <td>

                <span class="primary-text">
                    ${formatCurrency(item.revenue)}
                </span>

            </td>


            <td>

                <span class="primary-text">
                    ${formatCurrency(epc)}
                </span>

            </td>

        `;


        return row;

    }


    /* =========================================
       RENDER TABLE
    ========================================= */

    function renderTable(data) {

        if (!tableBody) {

            console.error(
                "NexaAffiliates: Analytics table not found."
            );

            return;

        }


        tableBody.innerHTML = "";


        if (resultCount) {

            resultCount.textContent =
                `${data.length} campaign${data.length !== 1 ? "s" : ""}`;

        }


        if (data.length === 0) {

            tableBody.innerHTML = `

                <tr>

                    <td colspan="8">

                        <div class="empty-state">

                            <div class="empty-state-icon">

                                <i class="fa-solid fa-chart-column"></i>

                            </div>


                            <h3 class="empty-state-title">

                                No performance data found

                            </h3>


                            <p class="empty-state-text">

                                Try changing your search or filter options.

                            </p>

                        </div>

                    </td>

                </tr>

            `;

            return;

        }


        data.forEach(function (item) {

            tableBody.appendChild(
                createPerformanceRow(item)
            );

        });

    }


    /* =========================================
       TRAFFIC SOURCE SUMMARY
    ========================================= */

    function renderTrafficSources(data) {

        if (!trafficSourceList) {
            return;
        }


        trafficSourceList.innerHTML = "";


        const sourceTotals = {};


        data.forEach(function (item) {

            if (!sourceTotals[item.traffic]) {

                sourceTotals[item.traffic] = {
                    clicks: 0,
                    conversions: 0
                };

            }


            sourceTotals[item.traffic].clicks +=
                item.clicks;


            sourceTotals[item.traffic].conversions +=
                item.conversions;

        });


        const totalClicks =
            data.reduce(function (sum, item) {

                return sum + item.clicks;

            }, 0);


        Object.keys(sourceTotals).forEach(function (source) {

            const sourceData =
                sourceTotals[source];


            const percentage =
                totalClicks > 0
                    ? (sourceData.clicks / totalClicks) * 100
                    : 0;


            const item =
                document.createElement("div");


            item.className =
                "activity-item";


            item.innerHTML = `

                <div class="activity-icon">

                    <i class="fa-solid fa-chart-simple"></i>

                </div>


                <div class="activity-content">

                    <div class="activity-title">

                        ${source}

                    </div>


                    <div class="activity-time">

                        ${formatNumber(sourceData.clicks)}
                        clicks ·
                        ${formatNumber(sourceData.conversions)}
                        conversions

                    </div>


                    <div class="progress">

                        <div
                            class="progress-bar"
                            style="width: ${percentage.toFixed(1)}%"
                        ></div>

                    </div>

                </div>

            `;


            trafficSourceList.appendChild(item);

        });

    }


    /* =========================================
       PERFORMANCE VISUAL
    ========================================= */

    function renderPerformanceVisual(data) {

        if (!trafficChart) {
            return;
        }


        if (data.length === 0) {

            trafficChart.innerHTML = `

                <div class="chart-placeholder">

                    No performance data available

                </div>

            `;

            return;

        }


        const maxClicks =
            Math.max.apply(
                null,
                data.map(function (item) {
                    return item.clicks;
                })
            );


        const chart =
            document.createElement("div");


        chart.style.display = "flex";

        chart.style.flexDirection = "column";

        chart.style.gap = "14px";

        chart.style.padding = "12px";


        data.forEach(function (item) {

            const row =
                document.createElement("div");


            const percentage =
                maxClicks > 0
                    ? (item.clicks / maxClicks) * 100
                    : 0;


            row.innerHTML = `

                <div
                    style="
                        display:flex;
                        justify-content:space-between;
                        gap:12px;
                        margin-bottom:6px;
                        font-size:12px;
                    "
                >

                    <span>

                        ${item.campaign}

                    </span>


                    <strong>

                        ${formatNumber(item.clicks)}

                    </strong>

                </div>


                <div class="progress">

                    <div
                        class="progress-bar"
                        style="width:${percentage.toFixed(1)}%"
                    ></div>

                </div>

            `;


            chart.appendChild(row);

        });


        trafficChart.innerHTML = "";

        trafficChart.appendChild(chart);

    }


    /* =========================================
       FILTER DATA
    ========================================= */

    function getFilteredData() {

        const search =
            searchInput
                ? searchInput.value.toLowerCase().trim()
                : "";


        const selectedVertical =
            verticalFilter
                ? verticalFilter.value
                : "all";


        const selectedTraffic =
            trafficFilter
                ? trafficFilter.value
                : "all";


        /*
            Date range is a portfolio-view control.
            The demo dataset represents the selected
            reporting window, so the data is not
            artificially changed by the date selector.
        */

        if (dateFilter) {
            const selectedDays = dateFilter.value;

            console.log(
                "Analytics reporting window:",
                selectedDays,
                "days"
            );
        }


        return performanceData.filter(function (item) {

            const searchableText = [

                item.campaign,
                item.id,
                item.vertical,
                item.traffic

            ]
                .join(" ")
                .toLowerCase();


            const matchesSearch =
                search === "" ||
                searchableText.includes(search);


            const matchesVertical =
                selectedVertical === "all" ||
                item.vertical === selectedVertical;


            const matchesTraffic =
                selectedTraffic === "all" ||
                item.traffic === selectedTraffic;


            return (
                matchesSearch &&
                matchesVertical &&
                matchesTraffic
            );

        });

    }


    /* =========================================
       APPLY FILTERS
    ========================================= */

    function applyFilters() {

        const filtered =
            getFilteredData();


        renderTable(filtered);

        updateKpis(filtered);

        renderTrafficSources(filtered);

        renderPerformanceVisual(filtered);

    }


    /* =========================================
       RESET FILTERS
    ========================================= */

    if (resetButton) {

        resetButton.addEventListener(
            "click",
            function () {

                if (searchInput) {
                    searchInput.value = "";
                }


                if (dateFilter) {
                    dateFilter.value = "30";
                }


                if (verticalFilter) {
                    verticalFilter.value = "all";
                }


                if (trafficFilter) {
                    trafficFilter.value = "all";
                }


                applyFilters();

            }
        );

    }


    /* =========================================
       SEARCH
    ========================================= */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            applyFilters
        );

    }


    /* =========================================
       DATE FILTER
    ========================================= */

    if (dateFilter) {

        dateFilter.addEventListener(
            "change",
            applyFilters
        );

    }


    /* =========================================
       VERTICAL FILTER
    ========================================= */

    if (verticalFilter) {

        verticalFilter.addEventListener(
            "change",
            applyFilters
        );

    }


    /* =========================================
       TRAFFIC FILTER
    ========================================= */

    if (trafficFilter) {

        trafficFilter.addEventListener(
            "change",
            applyFilters
        );

    }


    /* =========================================
       EXPORT DEMO REPORT
    ========================================= */

    if (exportButton) {

        exportButton.addEventListener(
            "click",
            function () {

                const data =
                    getFilteredData();


                let csv =
                    "Campaign,ID,Vertical,Traffic,Clicks,Conversions,Conversion Rate,Revenue,EPC\n";


                data.forEach(function (item) {

                    const rate =
                        getConversionRate(
                            item.clicks,
                            item.conversions
                        );


                    const epc =
                        getEpc(
                            item.clicks,
                            item.revenue
                        );


                    csv +=
                        `"${item.campaign}",` +
                        `"${item.id}",` +
                        `"${item.vertical}",` +
                        `"${item.traffic}",` +
                        `${item.clicks},` +
                        `${item.conversions},` +
                        `${rate.toFixed(2)}%,` +
                        `${item.revenue.toFixed(2)},` +
                        `${epc.toFixed(4)}\n`;

                });


                const blob =
                    new Blob(
                        [csv],
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
                    "nexaaffiliates-performance-demo.csv";


                document.body.appendChild(link);

                link.click();

                document.body.removeChild(link);


                URL.revokeObjectURL(url);

            }
        );

    }


    /* =========================================
       INITIAL LOAD
    ========================================= */

    applyFilters();


    console.log(
        "NexaAffiliates: Performance Analytics loaded.",
        performanceData.length,
        "demo campaigns."
    );

});