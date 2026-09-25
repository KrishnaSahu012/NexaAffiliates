/* =========================================
   NexaAffiliates - Affiliate Management
   Portfolio Simulation
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =========================================
       AFFILIATE DEMO DATA
    ========================================= */

    const affiliates = [

        {
            id: "AFF-001",
            name: "NorthStar Media",
            initials: "NM",
            geo: "US",
            traffic: "Search",
            vertical: "Home Services",
            status: "Active",
            compliance: "Verified",
            applicationDate: "2026-08-18"
        },

        {
            id: "AFF-002",
            name: "BluePeak Content",
            initials: "BC",
            geo: "US",
            traffic: "Content",
            vertical: "SaaS",
            status: "Active",
            compliance: "Verified",
            applicationDate: "2026-08-21"
        },

        {
            id: "AFF-003",
            name: "GrowthPilot Media",
            initials: "GM",
            geo: "US",
            traffic: "Social",
            vertical: "Education",
            status: "Pending",
            compliance: "Pending",
            applicationDate: "2026-08-29"
        },

        {
            id: "AFF-004",
            name: "LeadBridge Network",
            initials: "LN",
            geo: "US",
            traffic: "Search",
            vertical: "Finance",
            status: "Review",
            compliance: "Review",
            applicationDate: "2026-09-01"
        },

        {
            id: "AFF-005",
            name: "ConvertFlow Media",
            initials: "CM",
            geo: "US",
            traffic: "Email",
            vertical: "SaaS",
            status: "Active",
            compliance: "Verified",
            applicationDate: "2026-08-14"
        },

        {
            id: "AFF-006",
            name: "SearchWave Partners",
            initials: "SP",
            geo: "US",
            traffic: "Search",
            vertical: "Home Services",
            status: "Pending",
            compliance: "Pending",
            applicationDate: "2026-09-03"
        }

    ];


    /* =========================================
       DOM ELEMENTS
    ========================================= */

    const tableBody =
        document.getElementById("affiliateTableBody");

    const searchInput =
        document.getElementById("affiliateSearch");

    const statusFilter =
        document.getElementById("statusFilter");

    const trafficFilter =
        document.getElementById("trafficFilter");

    const verticalFilter =
        document.getElementById("verticalFilter");

    const resultCount =
        document.getElementById("resultCount");

    const totalCount =
        document.getElementById("totalAffiliatesCount");

    const activeCount =
        document.getElementById("activeAffiliatesCount");

    const pendingCount =
        document.getElementById("pendingAffiliatesCount");

    const reviewCount =
        document.getElementById("reviewAffiliatesCount");

    const addAffiliateButton =
        document.getElementById("addAffiliateButton");


    /* =========================================
       NORMALIZE VALUE
    ========================================= */

    function normalize(value) {

        return String(value || "")
            .toLowerCase()
            .trim();

    }


    /* =========================================
       STATUS BADGE
    ========================================= */

    function getStatusClass(status) {

        const value =
            normalize(status);


        if (value === "active") {
            return "badge-success";
        }


        if (value === "pending") {
            return "badge-warning";
        }


        if (value === "review") {
            return "badge-neutral";
        }


        return "badge-neutral";

    }


    /* =========================================
       COMPLIANCE BADGE
    ========================================= */

    function getComplianceClass(compliance) {

        const value =
            normalize(compliance);


        if (value === "verified") {
            return "badge-success";
        }


        if (value === "pending") {
            return "badge-warning";
        }


        if (value === "review") {
            return "badge-neutral";
        }


        return "badge-neutral";

    }


    /* =========================================
       UPDATE KPI STATISTICS
    ========================================= */

    function updateStatistics() {

        const total =
            affiliates.length;


        const active =
            affiliates.filter(function (affiliate) {

                return affiliate.status === "Active";

            }).length;


        const pending =
            affiliates.filter(function (affiliate) {

                return affiliate.status === "Pending";

            }).length;


        const review =
            affiliates.filter(function (affiliate) {

                return affiliate.status === "Review";

            }).length;


        if (totalCount) {
            totalCount.textContent = total;
        }


        if (activeCount) {
            activeCount.textContent = active;
        }


        if (pendingCount) {
            pendingCount.textContent = pending;
        }


        if (reviewCount) {
            reviewCount.textContent = review;
        }

    }


    /* =========================================
       CREATE AFFILIATE ROW
    ========================================= */

    function createAffiliateRow(affiliate) {

        const row =
            document.createElement("tr");


        const statusClass =
            getStatusClass(affiliate.status);


        const complianceClass =
            getComplianceClass(affiliate.compliance);


        const complianceIcon =
            affiliate.compliance === "Verified"
                ? "fa-circle-check"
                : affiliate.compliance === "Review"
                    ? "fa-clock"
                    : "fa-circle-exclamation";


        row.innerHTML = `

            <td>

                <div class="flex gap-md">

                    <div class="avatar">

                        ${affiliate.initials}

                    </div>


                    <div>

                        <div class="primary-text">

                            ${affiliate.name}

                        </div>


                        <span class="secondary-text">

                            ${affiliate.id}
                            · Applied ${affiliate.applicationDate}

                        </span>

                    </div>

                </div>

            </td>


            <td>

                <span class="primary-text">

                    🇺🇸 ${affiliate.geo}

                </span>

            </td>


            <td>

                ${affiliate.traffic}

            </td>


            <td>

                ${affiliate.vertical}

            </td>


            <td>

                <span class="badge ${statusClass}">

                    ${affiliate.status}

                </span>

            </td>


            <td>

                <span class="badge ${complianceClass}">

                    <i class="fa-solid ${complianceIcon}"></i>

                    ${affiliate.compliance}

                </span>

            </td>


            <td>

                <button
                    class="btn btn-secondary btn-sm"
                    type="button"
                    data-action="review"
                    data-id="${affiliate.id}"
                >

                    <i class="fa-solid fa-eye"></i>

                    Review

                </button>

            </td>

        `;


        return row;

    }


    /* =========================================
       RENDER AFFILIATES
    ========================================= */

    function renderAffiliates(data) {

        if (!tableBody) {

            console.error(
                "NexaAffiliates: Affiliate table not found."
            );

            return;

        }


        tableBody.innerHTML = "";


        if (resultCount) {

            resultCount.textContent =
                `${data.length} affiliate${data.length !== 1 ? "s" : ""}`;

        }


        /* EMPTY STATE */

        if (data.length === 0) {

            tableBody.innerHTML = `

                <tr>

                    <td colspan="7">

                        <div class="empty-state">

                            <div class="empty-state-icon">

                                <i class="fa-solid fa-users-slash"></i>

                            </div>


                            <h3 class="empty-state-title">

                                No affiliates found

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


        /* RENDER ROWS */

        data.forEach(function (affiliate) {

            tableBody.appendChild(
                createAffiliateRow(affiliate)
            );

        });

    }


    /* =========================================
       FILTER AFFILIATES
    ========================================= */

    function getFilteredAffiliates() {

        const search =
            searchInput
                ? normalize(searchInput.value)
                : "";


        const status =
            statusFilter
                ? statusFilter.value
                : "all";


        const traffic =
            trafficFilter
                ? trafficFilter.value
                : "all";


        const vertical =
            verticalFilter
                ? verticalFilter.value
                : "all";


        return affiliates.filter(function (affiliate) {


            /* SEARCH */

            const searchableText = [

                affiliate.name,
                affiliate.id,
                affiliate.geo,
                affiliate.traffic,
                affiliate.vertical,
                affiliate.status,
                affiliate.compliance

            ]
                .join(" ")
                .toLowerCase();


            const matchesSearch =
                search === "" ||
                searchableText.includes(search);


            /* STATUS */

            const matchesStatus =
                status === "all" ||
                affiliate.status === status;


            /* TRAFFIC */

            const matchesTraffic =
                traffic === "all" ||
                affiliate.traffic === traffic;


            /* VERTICAL */

            const matchesVertical =
                vertical === "all" ||
                affiliate.vertical === vertical;


            return (
                matchesSearch &&
                matchesStatus &&
                matchesTraffic &&
                matchesVertical
            );

        });

    }


    /* =========================================
       APPLY FILTERS
    ========================================= */

    function filterAffiliates() {

        const filtered =
            getFilteredAffiliates();


        renderAffiliates(filtered);

    }


    /* =========================================
       REVIEW AFFILIATE
    ========================================= */

    function reviewAffiliate(id) {

        const affiliate =
            affiliates.find(function (item) {

                return item.id === id;

            });


        if (!affiliate) {
            return;
        }


        /* ACTIVE + VERIFIED */

        if (
            affiliate.status === "Active" &&
            affiliate.compliance === "Verified"
        ) {

            alert(

                "AFFILIATE PROFILE\n\n" +

                "Name: " +
                affiliate.name +

                "\nAffiliate ID: " +
                affiliate.id +

                "\nGEO: " +
                affiliate.geo +

                "\nTraffic Source: " +
                affiliate.traffic +

                "\nVertical: " +
                affiliate.vertical +

                "\nStatus: " +
                affiliate.status +

                "\nCompliance: " +
                affiliate.compliance +

                "\nApplication Date: " +
                affiliate.applicationDate +

                "\n\nThis affiliate is already approved and active." +

                "\n\nPortfolio simulation data."

            );

            return;

        }


        /* REVIEW WORKFLOW */

        const action =
            prompt(

                "AFFILIATE REVIEW\n\n" +

                "Name: " +
                affiliate.name +

                "\nAffiliate ID: " +
                affiliate.id +

                "\nGEO: " +
                affiliate.geo +

                "\nTraffic Source: " +
                affiliate.traffic +

                "\nVertical: " +
                affiliate.vertical +

                "\nCurrent Status: " +
                affiliate.status +

                "\nCompliance: " +
                affiliate.compliance +

                "\n\nChoose an action:\n\n" +

                "1 = Approve Affiliate\n" +

                "2 = Reject / Hold for Review\n" +

                "3 = Request More Information\n\n" +

                "Enter 1, 2 or 3:"

            );


        /* APPROVE */

        if (action === "1") {

            affiliate.status =
                "Active";

            affiliate.compliance =
                "Verified";


            alert(

                "Affiliate Approved\n\n" +

                affiliate.name +

                " has been approved.\n\n" +

                "Status: Active\n" +

                "Compliance: Verified\n\n" +

                "Portfolio simulation data."

            );

        }


        /* REJECT / HOLD */

        else if (action === "2") {

            affiliate.status =
                "Review";

            affiliate.compliance =
                "Review";


            alert(

                "Affiliate Held for Review\n\n" +

                affiliate.name +

                " has been moved to review.\n\n" +

                "Status: Review\n" +

                "Compliance: Review\n\n" +

                "Portfolio simulation data."

            );

        }


        /* REQUEST INFORMATION */

        else if (action === "3") {

            affiliate.status =
                "Pending";

            affiliate.compliance =
                "Pending";


            alert(

                "Information Requested\n\n" +

                "Additional information has been requested from " +

                affiliate.name +

                ".\n\n" +

                "Status: Pending\n" +

                "Compliance: Pending\n\n" +

                "Portfolio simulation data."

            );

        }


        /* INVALID */

        else {

            alert(

                "No action was taken.\n\n" +

                "Please enter 1, 2 or 3."

            );

            return;

        }


        updateStatistics();

        filterAffiliates();

    }


    /* =========================================
       TABLE ACTION EVENTS
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


                if (action === "review") {

                    reviewAffiliate(id);

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
            filterAffiliates
        );

    }


    /* =========================================
       STATUS FILTER
    ========================================= */

    if (statusFilter) {

        statusFilter.addEventListener(
            "change",
            filterAffiliates
        );

    }


    /* =========================================
       TRAFFIC FILTER
    ========================================= */

    if (trafficFilter) {

        trafficFilter.addEventListener(
            "change",
            filterAffiliates
        );

    }


    /* =========================================
       VERTICAL FILTER
    ========================================= */

    if (verticalFilter) {

        verticalFilter.addEventListener(
            "change",
            filterAffiliates
        );

    }


    /* =========================================
       ADD AFFILIATE
    ========================================= */

    if (addAffiliateButton) {

        addAffiliateButton.addEventListener(
            "click",
            function () {

                alert(

                    "ADD AFFILIATE\n\n" +

                    "The affiliate onboarding form will be added " +
                    "as part of the extended affiliate workflow.\n\n" +

                    "This portfolio currently uses fictional demo data."

                );

            }
        );

    }


    /* =========================================
       INITIAL LOAD
    ========================================= */

    updateStatistics();

    renderAffiliates(affiliates);


    console.log(
        "NexaAffiliates: Affiliate Management loaded.",
        affiliates.length,
        "demo affiliates."
    );

});