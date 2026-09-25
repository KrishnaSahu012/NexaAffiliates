/* =========================================
   NexaAffiliates - Campaign Management
   Portfolio Simulation
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =========================================
       FICTIONAL CAMPAIGN DATA
    ========================================== */

    const campaigns = [

        {
            id: "CMP-001",
            name: "Finance Lead Acquisition",
            advertiser: "HarborPoint Financial",
            affiliate: "NorthStar Media",
            vertical: "Finance",
            traffic: "Search",
            status: "Live"
        },

        {
            id: "CMP-002",
            name: "Insurance Quote Flow",
            advertiser: "SafeNest Insurance",
            affiliate: "BluePeak Content",
            vertical: "Insurance",
            traffic: "Content",
            status: "Live"
        },

        {
            id: "CMP-003",
            name: "Home Services Lead Gen",
            advertiser: "HomePro Connect",
            affiliate: "GrowthPilot Media",
            vertical: "Home Services",
            traffic: "Search",
            status: "Live"
        },

        {
            id: "CMP-004",
            name: "SaaS Trial Acquisition",
            advertiser: "CloudDesk Solutions",
            affiliate: "BluePeak Content",
            vertical: "SaaS",
            traffic: "Content",
            status: "Live"
        },

        {
            id: "CMP-005",
            name: "Education Enrollment",
            advertiser: "LearnBridge Academy",
            affiliate: "GrowthPilot Media",
            vertical: "Education",
            traffic: "Social",
            status: "Review"
        },

        {
            id: "CMP-006",
            name: "Insurance Partner Campaign",
            advertiser: "Evergreen Quote Network",
            affiliate: "NorthStar Media",
            vertical: "Insurance",
            traffic: "Email",
            status: "Paused"
        },

        {
            id: "CMP-007",
            name: "Consumer Finance Signup",
            advertiser: "HarborPoint Financial",
            affiliate: "BluePeak Content",
            vertical: "Finance",
            traffic: "Search",
            status: "Live"
        },

        {
            id: "CMP-008",
            name: "Home Improvement Leads",
            advertiser: "HomePro Connect",
            affiliate: "NorthStar Media",
            vertical: "Home Services",
            traffic: "Content",
            status: "Draft"
        }

    ];


    /* =========================================
       DOM ELEMENTS
    ========================================= */

    const tableBody =
        document.getElementById("campaignTableBody");

    const searchInput =
        document.getElementById("campaignSearch");

    const statusFilter =
        document.getElementById("campaignStatusFilter");

    const verticalFilter =
        document.getElementById("campaignVerticalFilter");

    const trafficFilter =
        document.getElementById("campaignTrafficFilter");

    const resetButton =
        document.getElementById("resetCampaignFilters");

    const resultCount =
        document.getElementById("campaignResultCount");

    const totalCount =
        document.getElementById("totalCampaignsCount");

    const liveCount =
        document.getElementById("liveCampaignsCount");

    const pausedCount =
        document.getElementById("pausedCampaignsCount");

    const reviewCount =
        document.getElementById("campaignReviewsCount");

    const createButton =
        document.getElementById("createCampaignButton");


    /* =========================================
       STATUS BADGE
    ========================================= */

    function getStatusClass(status) {

        if (status === "Live") {
            return "badge-success";
        }

        if (status === "Paused") {
            return "badge-warning";
        }

        if (status === "Review") {
            return "badge-danger";
        }

        if (status === "Draft") {
            return "badge-neutral";
        }

        return "badge-neutral";
    }


    /* =========================================
       STATUS ICON
    ========================================= */

    function getStatusIcon(status) {

        if (status === "Live") {
            return "fa-circle-play";
        }

        if (status === "Paused") {
            return "fa-pause";
        }

        if (status === "Review") {
            return "fa-shield-halved";
        }

        if (status === "Draft") {
            return "fa-file";
        }

        return "fa-circle-info";
    }


    /* =========================================
       TRAFFIC BADGE
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

        if (traffic === "Email") {
            return "badge-neutral";
        }

        return "badge-neutral";
    }


    /* =========================================
       UPDATE KPI
    ========================================= */

    function updateStatistics() {

        const total =
            campaigns.length;


        const live =
            campaigns.filter(function (campaign) {

                return campaign.status === "Live";

            }).length;


        const paused =
            campaigns.filter(function (campaign) {

                return campaign.status === "Paused";

            }).length;


        const review =
            campaigns.filter(function (campaign) {

                return campaign.status === "Review";

            }).length;


        if (totalCount) {
            totalCount.textContent = total;
        }


        if (liveCount) {
            liveCount.textContent = live;
        }


        if (pausedCount) {
            pausedCount.textContent = paused;
        }


        if (reviewCount) {
            reviewCount.textContent = review;
        }

    }


    /* =========================================
       CREATE CAMPAIGN ROW
    ========================================= */

    function createCampaignRow(campaign) {

        const row =
            document.createElement("tr");


        const statusClass =
            getStatusClass(campaign.status);


        const statusIcon =
            getStatusIcon(campaign.status);


        const trafficClass =
            getTrafficClass(campaign.traffic);


        row.innerHTML = `

            <td>

                <div>

                    <div class="primary-text">
                        ${campaign.name}
                    </div>

                    <span class="secondary-text">
                        ${campaign.id}
                    </span>

                </div>

            </td>


            <td>

                <span class="primary-text">
                    ${campaign.advertiser}
                </span>

            </td>


            <td>

                ${campaign.affiliate}

            </td>


            <td>

                ${campaign.vertical}

            </td>


            <td>

                <span class="badge ${trafficClass}">
                    ${campaign.traffic}
                </span>

            </td>


            <td>

                <span class="badge ${statusClass}">

                    <i class="fa-solid ${statusIcon}"></i>

                    ${campaign.status}

                </span>

            </td>


            <td>

                <button
                    class="btn btn-secondary btn-sm"
                    type="button"
                    data-action="view"
                    data-id="${campaign.id}"
                >

                    <i class="fa-regular fa-eye"></i>

                    View

                </button>

            </td>

        `;


        return row;
    }


    /* =========================================
       RENDER CAMPAIGNS
    ========================================= */

    function renderCampaigns(data) {

        if (!tableBody) {

            console.error(
                "NexaAffiliates: Campaign table not found."
            );

            return;
        }


        tableBody.innerHTML = "";


        if (resultCount) {

            resultCount.textContent =
                `${data.length} campaign${data.length !== 1 ? "s" : ""}`;

        }


        /* EMPTY STATE */

        if (data.length === 0) {

            tableBody.innerHTML = `

                <tr>

                    <td colspan="7">

                        <div class="empty-state">

                            <div class="empty-state-icon">

                                <i class="fa-solid fa-filter-circle-xmark"></i>

                            </div>


                            <h3 class="empty-state-title">

                                No campaigns found

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


        data.forEach(function (campaign) {

            tableBody.appendChild(
                createCampaignRow(campaign)
            );

        });

    }


    /* =========================================
       FILTER CAMPAIGNS
    ========================================= */

    function getFilteredCampaigns() {

        const search =
            searchInput
                ? searchInput.value.toLowerCase().trim()
                : "";


        const selectedStatus =
            statusFilter
                ? statusFilter.value
                : "all";


        const selectedVertical =
            verticalFilter
                ? verticalFilter.value
                : "all";


        const selectedTraffic =
            trafficFilter
                ? trafficFilter.value
                : "all";


        return campaigns.filter(function (campaign) {

            const searchableText = [

                campaign.name,
                campaign.id,
                campaign.advertiser,
                campaign.affiliate,
                campaign.vertical,
                campaign.traffic,
                campaign.status

            ]
                .join(" ")
                .toLowerCase();


            const matchesSearch =
                search === "" ||
                searchableText.includes(search);


            const matchesStatus =
                selectedStatus === "all" ||
                campaign.status === selectedStatus;


            const matchesVertical =
                selectedVertical === "all" ||
                campaign.vertical === selectedVertical;


            const matchesTraffic =
                selectedTraffic === "all" ||
                campaign.traffic === selectedTraffic;


            return (
                matchesSearch &&
                matchesStatus &&
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
            getFilteredCampaigns();


        renderCampaigns(filtered);

    }


    /* =========================================
       VIEW CAMPAIGN
    ========================================= */

    function viewCampaign(id) {

        const campaign =
            campaigns.find(function (item) {

                return item.id === id;

            });


        if (!campaign) {
            return;
        }


        alert(

            "CAMPAIGN DETAILS\n\n" +

            "Campaign: " +
            campaign.name +

            "\nCampaign ID: " +
            campaign.id +

            "\nAdvertiser: " +
            campaign.advertiser +

            "\nAffiliate: " +
            campaign.affiliate +

            "\nVertical: " +
            campaign.vertical +

            "\nTraffic Source: " +
            campaign.traffic +

            "\nStatus: " +
            campaign.status +

            "\n\nPortfolio simulation data."

        );

    }


    /* =========================================
       TABLE ACTION
    ========================================= */

    if (tableBody) {

        tableBody.addEventListener(
            "click",
            function (event) {

                const button =
                    event.target.closest("[data-action]");


                if (!button) {
                    return;
                }


                const action =
                    button.dataset.action;


                const id =
                    button.dataset.id;


                if (action === "view") {

                    viewCampaign(id);

                }

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
       STATUS FILTER
    ========================================= */

    if (statusFilter) {

        statusFilter.addEventListener(
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
       RESET FILTERS
    ========================================= */

    if (resetButton) {

        resetButton.addEventListener(
            "click",
            function () {

                if (searchInput) {
                    searchInput.value = "";
                }


                if (statusFilter) {
                    statusFilter.value = "all";
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
       CREATE CAMPAIGN
    ========================================= */

    if (createButton) {

        createButton.addEventListener(
            "click",
            function () {

                alert(

                    "CREATE CAMPAIGN\n\n" +

                    "Campaign creation workflow will be " +
                    "added in the next stage.\n\n" +

                    "This portfolio uses fictional demo data."

                );

            }
        );

    }


    /* =========================================
       INITIALIZE
    ========================================= */

    updateStatistics();

    renderCampaigns(campaigns);


    console.log(
        "NexaAffiliates: Campaign Management loaded.",
        campaigns.length,
        "demo campaigns."
    );

});