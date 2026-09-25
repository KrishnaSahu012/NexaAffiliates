/* =========================================
   NexaAffiliates - Advertiser Management
   Portfolio Simulation
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =========================================
       FICTIONAL ADVERTISER DATA
    ========================================= */

    const advertisers = [

        {
            id: "ADV-001",
            name: "HarborPoint Financial",
            initials: "HF",
            type: "Direct",
            vertical: "Finance",
            offers: 4,
            campaigns: 3,
            status: "Active"
        },

        {
            id: "ADV-002",
            name: "SafeNest Insurance",
            initials: "SI",
            type: "Brand",
            vertical: "Insurance",
            offers: 3,
            campaigns: 2,
            status: "Active"
        },

        {
            id: "ADV-003",
            name: "HomePro Connect",
            initials: "HC",
            type: "Direct",
            vertical: "Home Services",
            offers: 5,
            campaigns: 4,
            status: "Active"
        },

        {
            id: "ADV-004",
            name: "CloudDesk Solutions",
            initials: "CS",
            type: "Brand",
            vertical: "SaaS",
            offers: 3,
            campaigns: 2,
            status: "Onboarding"
        },

        {
            id: "ADV-005",
            name: "LearnBridge Academy",
            initials: "LA",
            type: "Agency",
            vertical: "Education",
            offers: 2,
            campaigns: 1,
            status: "Review"
        },

        {
            id: "ADV-006",
            name: "Evergreen Quote Network",
            initials: "EQ",
            type: "Agency",
            vertical: "Insurance",
            offers: 4,
            campaigns: 3,
            status: "Paused"
        }

    ];


    /* =========================================
       DOM ELEMENTS
    ========================================= */

    const tableBody =
        document.getElementById("advertiserTableBody");

    const searchInput =
        document.getElementById("advertiserSearch");

    const statusFilter =
        document.getElementById("advertiserStatusFilter");

    const verticalFilter =
        document.getElementById("advertiserVerticalFilter");

    const typeFilter =
        document.getElementById("advertiserTypeFilter");

    const resetButton =
        document.getElementById("resetAdvertiserFilters");

    const resultCount =
        document.getElementById("advertiserResultCount");

    const totalCount =
        document.getElementById("totalAdvertisersCount");

    const activeCount =
        document.getElementById("activeAdvertisersCount");

    const offersCount =
        document.getElementById("advertiserOffersCount");

    const campaignsCount =
        document.getElementById("advertiserCampaignsCount");

    const addButton =
        document.getElementById("addAdvertiserButton");


    /* =========================================
       STATUS CLASS
    ========================================= */

    function getStatusClass(status) {

        if (status === "Active") {
            return "badge-success";
        }

        if (status === "Onboarding") {
            return "badge-warning";
        }

        if (status === "Paused") {
            return "badge-neutral";
        }

        if (status === "Review") {
            return "badge-danger";
        }

        return "badge-neutral";
    }


    /* =========================================
       STATUS ICON
    ========================================= */

    function getStatusIcon(status) {

        if (status === "Active") {
            return "fa-circle-check";
        }

        if (status === "Onboarding") {
            return "fa-clock";
        }

        if (status === "Paused") {
            return "fa-pause";
        }

        if (status === "Review") {
            return "fa-shield-halved";
        }

        return "fa-circle-info";
    }


    /* =========================================
       UPDATE KPI CARDS
    ========================================= */

    function updateStatistics() {

        const total =
            advertisers.length;


        const active =
            advertisers.filter(function (advertiser) {

                return advertiser.status === "Active";

            }).length;


        const totalOffers =
            advertisers.reduce(function (sum, advertiser) {

                return sum + advertiser.offers;

            }, 0);


        const liveCampaigns =
            advertisers.reduce(function (sum, advertiser) {

                return sum + advertiser.campaigns;

            }, 0);


        if (totalCount) {
            totalCount.textContent = total;
        }


        if (activeCount) {
            activeCount.textContent = active;
        }


        if (offersCount) {
            offersCount.textContent = totalOffers;
        }


        if (campaignsCount) {
            campaignsCount.textContent = liveCampaigns;
        }

    }


    /* =========================================
       CREATE TABLE ROW
    ========================================= */

    function createAdvertiserRow(advertiser) {

        const row =
            document.createElement("tr");


        const statusClass =
            getStatusClass(advertiser.status);


        const statusIcon =
            getStatusIcon(advertiser.status);


        row.innerHTML = `

            <td>

                <div class="flex gap-md">

                    <div class="avatar">

                        ${advertiser.initials}

                    </div>


                    <div>

                        <div class="primary-text">

                            ${advertiser.name}

                        </div>


                        <span class="secondary-text">

                            ${advertiser.id}

                        </span>

                    </div>

                </div>

            </td>


            <td>

                <span class="badge badge-neutral">

                    ${advertiser.type}

                </span>

            </td>


            <td>

                ${advertiser.vertical}

            </td>


            <td>

                <span class="primary-text">

                    ${advertiser.offers}

                </span>

            </td>


            <td>

                <span class="primary-text">

                    ${advertiser.campaigns}

                </span>

            </td>


            <td>

                <span class="badge ${statusClass}">

                    <i class="fa-solid ${statusIcon}"></i>

                    ${advertiser.status}

                </span>

            </td>


            <td>

                <button
                    class="btn btn-secondary btn-sm"
                    type="button"
                    data-action="view"
                    data-id="${advertiser.id}"
                >

                    <i class="fa-regular fa-eye"></i>

                    View

                </button>

            </td>

        `;


        return row;
    }


    /* =========================================
       RENDER TABLE
    ========================================= */

    function renderAdvertisers(data) {

        if (!tableBody) {

            console.error(
                "NexaAffiliates: Advertiser table not found."
            );

            return;
        }


        tableBody.innerHTML = "";


        if (resultCount) {

            resultCount.textContent =
                `${data.length} advertiser${data.length !== 1 ? "s" : ""}`;

        }


        /* EMPTY STATE */

        if (data.length === 0) {

            tableBody.innerHTML = `

                <tr>

                    <td colspan="7">

                        <div class="empty-state">

                            <div class="empty-state-icon">

                                <i class="fa-solid fa-building-circle-exclamation"></i>

                            </div>


                            <h3 class="empty-state-title">

                                No advertisers found

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


        /* CREATE ROWS */

        data.forEach(function (advertiser) {

            tableBody.appendChild(
                createAdvertiserRow(advertiser)
            );

        });

    }


    /* =========================================
       FILTER DATA
    ========================================= */

    function getFilteredAdvertisers() {

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


        const selectedType =
            typeFilter
                ? typeFilter.value
                : "all";


        return advertisers.filter(function (advertiser) {

            const searchableText = [

                advertiser.name,
                advertiser.id,
                advertiser.type,
                advertiser.vertical,
                advertiser.status

            ]
                .join(" ")
                .toLowerCase();


            const matchesSearch =
                search === "" ||
                searchableText.includes(search);


            const matchesStatus =
                selectedStatus === "all" ||
                advertiser.status === selectedStatus;


            const matchesVertical =
                selectedVertical === "all" ||
                advertiser.vertical === selectedVertical;


            const matchesType =
                selectedType === "all" ||
                advertiser.type === selectedType;


            return (
                matchesSearch &&
                matchesStatus &&
                matchesVertical &&
                matchesType
            );

        });

    }


    /* =========================================
       APPLY FILTERS
    ========================================= */

    function applyFilters() {

        const filtered =
            getFilteredAdvertisers();


        renderAdvertisers(filtered);

    }


    /* =========================================
       VIEW ADVERTISER
    ========================================= */

    function viewAdvertiser(id) {

        const advertiser =
            advertisers.find(function (item) {

                return item.id === id;

            });


        if (!advertiser) {
            return;
        }


        alert(

            "ADVERTISER ACCOUNT\n\n" +

            "Company: " +
            advertiser.name +

            "\nAdvertiser ID: " +
            advertiser.id +

            "\nAccount Type: " +
            advertiser.type +

            "\nVertical: " +
            advertiser.vertical +

            "\nActive Offers: " +
            advertiser.offers +

            "\nCampaigns: " +
            advertiser.campaigns +

            "\nStatus: " +
            advertiser.status +

            "\n\nPortfolio simulation data."

        );

    }


    /* =========================================
       TABLE CLICK HANDLER
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

                    viewAdvertiser(id);

                }

            }
        );

    }


    /* =========================================
       SEARCH EVENT
    ========================================= */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            applyFilters
        );

    }


    /* =========================================
       STATUS EVENT
    ========================================= */

    if (statusFilter) {

        statusFilter.addEventListener(
            "change",
            applyFilters
        );

    }


    /* =========================================
       VERTICAL EVENT
    ========================================= */

    if (verticalFilter) {

        verticalFilter.addEventListener(
            "change",
            applyFilters
        );

    }


    /* =========================================
       TYPE EVENT
    ========================================= */

    if (typeFilter) {

        typeFilter.addEventListener(
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


                if (typeFilter) {
                    typeFilter.value = "all";
                }


                applyFilters();

            }
        );

    }


    /* =========================================
       ADD ADVERTISER
    ========================================= */

    if (addButton) {

        addButton.addEventListener(
            "click",
            function () {

                alert(

                    "ADD ADVERTISER\n\n" +

                    "Advertiser onboarding workflow will be " +
                    "added in the next stage.\n\n" +

                    "This portfolio uses fictional demo data."

                );

            }
        );

    }


    /* =========================================
       INITIAL LOAD
    ========================================= */

    updateStatistics();

    renderAdvertisers(advertisers);


    console.log(
        "NexaAffiliates: Advertiser Management loaded.",
        advertisers.length,
        "demo advertisers."
    );

});