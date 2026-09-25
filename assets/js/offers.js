/* =========================================
   NexaAffiliates - Offers Management
   Portfolio Simulation
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =========================================
       DOM ELEMENTS
    ========================================= */

    const searchInput = document.getElementById("offerSearch");
    const verticalFilter = document.getElementById("verticalFilter");
    const modelFilter = document.getElementById("modelFilter");
    const statusFilter = document.getElementById("statusFilter");
    const resetButton = document.getElementById("resetFilters");

    const tableBody = document.getElementById("offersTableBody");

    const totalOffersCount =
        document.getElementById("totalOffersCount");

    const activeOffersCount =
        document.getElementById("activeOffersCount");

    const cpaOffersCount =
        document.getElementById("cpaOffersCount");

    const cplOffersCount =
        document.getElementById("cplOffersCount");

    const offerCountBadge =
        document.getElementById("offerCountBadge");

    const addOfferButton =
        document.getElementById("addOfferButton");


    /* =========================================
       DEMO DATA FALLBACK
       
       If assets/data/offers.js is not loaded
       correctly, this data keeps the page
       functional.
    ========================================= */

    const fallbackOffers = [

        {
            id: "NX-FIN-001",
            name: "US Personal Finance Lead",
            vertical: "Finance",
            model: "CPL",
            payout: 18.00,
            traffic: "Search",
            status: "Active"
        },

        {
            id: "NX-INS-002",
            name: "Home Insurance Quote",
            vertical: "Insurance",
            model: "CPL",
            payout: 24.50,
            traffic: "Content",
            status: "Active"
        },

        {
            id: "NX-SWP-003",
            name: "Consumer Rewards Entry",
            vertical: "Sweepstakes",
            model: "CPA",
            payout: 9.75,
            traffic: "Social",
            status: "Monitoring"
        },

        {
            id: "NX-HOM-004",
            name: "Home Improvement Leads",
            vertical: "Home Services",
            model: "CPL",
            payout: 16.25,
            traffic: "Search",
            status: "Active"
        },

        {
            id: "NX-FIN-005",
            name: "Credit Monitoring Signup",
            vertical: "Finance",
            model: "CPA",
            payout: 21.00,
            traffic: "Search",
            status: "Under Review"
        }

    ];


    /* =========================================
       USE EXTERNAL DATA IF AVAILABLE
    ========================================= */

    let offers = fallbackOffers;

    if (
        typeof offersData !== "undefined" &&
        Array.isArray(offersData) &&
        offersData.length > 0
    ) {
        offers = offersData;
    }


    /* =========================================
       HELPER FUNCTIONS
    ========================================= */

    function normalize(value) {

        return String(value || "")
            .toLowerCase()
            .trim();

    }


    function getStatusClass(status) {

        const normalizedStatus = normalize(status);

        if (normalizedStatus === "active") {
            return "badge-success";
        }

        if (
            normalizedStatus === "monitoring" ||
            normalizedStatus === "pending"
        ) {
            return "badge-warning";
        }

        if (
            normalizedStatus === "under review" ||
            normalizedStatus === "review"
        ) {
            return "badge-neutral";
        }

        if (normalizedStatus === "paused") {
            return "badge-danger";
        }

        return "badge-neutral";

    }


    function getModelClass(model) {

        if (normalize(model) === "cpa") {
            return "badge-info";
        }

        return "badge-primary";

    }


    /* =========================================
       UPDATE KPI STATISTICS
    ========================================= */

    function updateStatistics(data) {

        const total =
            data.length;

        const active =
            data.filter(function (offer) {
                return normalize(offer.status) === "active";
            }).length;

        const cpa =
            data.filter(function (offer) {
                return normalize(offer.model) === "cpa";
            }).length;

        const cpl =
            data.filter(function (offer) {
                return normalize(offer.model) === "cpl";
            }).length;


        if (totalOffersCount) {
            totalOffersCount.textContent = total;
        }

        if (activeOffersCount) {
            activeOffersCount.textContent = active;
        }

        if (cpaOffersCount) {
            cpaOffersCount.textContent = cpa;
        }

        if (cplOffersCount) {
            cplOffersCount.textContent = cpl;
        }

        if (offerCountBadge) {
            offerCountBadge.textContent =
                `${total} ${total === 1 ? "Offer" : "Offers"}`;
        }

    }


    /* =========================================
       CREATE OFFER ROW
    ========================================= */

    function createOfferRow(offer) {

        const row =
            document.createElement("tr");


        const modelClass =
            getModelClass(offer.model);

        const statusClass =
            getStatusClass(offer.status);


        row.innerHTML = `

            <td>

                <div class="primary-text">
                    ${offer.name}
                </div>

                <span class="secondary-text">
                    ${offer.id}
                </span>

            </td>


            <td>
                ${offer.vertical}
            </td>


            <td>

                <span class="badge ${modelClass}">
                    ${offer.model}
                </span>

            </td>


            <td>

                <span class="primary-text">
                    $${Number(offer.payout).toFixed(2)}
                </span>

            </td>


            <td>
                ${offer.traffic}
            </td>


            <td>

                <span class="badge ${statusClass}">
                    ${offer.status}
                </span>

            </td>


            <td>

                <div class="table-actions">

                    <button
                        class="table-action"
                        type="button"
                        title="View offer"
                        aria-label="View offer"
                        data-action="view"
                        data-id="${offer.id}"
                    >

                        <i class="fa-regular fa-eye"></i>

                    </button>


                    <button
                        class="table-action"
                        type="button"
                        title="Edit offer"
                        aria-label="Edit offer"
                        data-action="edit"
                        data-id="${offer.id}"
                    >

                        <i class="fa-solid fa-pen"></i>

                    </button>

                </div>

            </td>

        `;

        return row;

    }


    /* =========================================
       RENDER OFFERS
    ========================================= */

    function renderOffers(data) {

        if (!tableBody) {

            console.error(
                "NexaAffiliates: offers table body not found."
            );

            return;

        }


        tableBody.innerHTML = "";


        updateStatistics(data);


        if (data.length === 0) {

            tableBody.innerHTML = `

                <tr>

                    <td colspan="7">

                        <div class="empty-state">

                            <div class="empty-state-icon">

                                <i class="fa-solid fa-magnifying-glass"></i>

                            </div>

                            <h3 class="empty-state-title">
                                No offers found
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


        data.forEach(function (offer) {

            const row =
                createOfferRow(offer);

            tableBody.appendChild(row);

        });

    }


    /* =========================================
       FILTER OFFERS
    ========================================= */

    function filterOffers() {

        const searchValue =
            normalize(
                searchInput
                    ? searchInput.value
                    : ""
            );


        const verticalValue =
            normalize(
                verticalFilter
                    ? verticalFilter.value
                    : "all"
            );


        const modelValue =
            normalize(
                modelFilter
                    ? modelFilter.value
                    : "all"
            );


        const statusValue =
            normalize(
                statusFilter
                    ? statusFilter.value
                    : "all"
            );


        const filteredOffers =
            offers.filter(function (offer) {


                /* SEARCH */

                const searchableText = [

                    offer.name,
                    offer.id,
                    offer.vertical,
                    offer.model,
                    offer.traffic,
                    offer.status

                ]
                    .join(" ")
                    .toLowerCase();


                const matchesSearch =
                    searchValue === "" ||
                    searchableText.includes(searchValue);


                /* VERTICAL */

                const offerVertical =
                    normalize(offer.vertical);


                let matchesVertical = true;


                if (verticalValue !== "all") {

                    if (verticalValue === "home") {

                        matchesVertical =
                            offerVertical === "home services";

                    } else {

                        matchesVertical =
                            offerVertical === verticalValue;

                    }

                }


                /* MODEL */

                const matchesModel =
                    modelValue === "all" ||
                    normalize(offer.model) === modelValue;


                /* STATUS */

                const offerStatus =
                    normalize(offer.status);


                let matchesStatus = true;


                if (statusValue !== "all") {

                    if (statusValue === "review") {

                        matchesStatus =
                            offerStatus === "under review" ||
                            offerStatus === "review";

                    }

                    else if (statusValue === "monitoring") {

                        matchesStatus =
                            offerStatus === "monitoring";

                    }

                    else if (statusValue === "paused") {

                        matchesStatus =
                            offerStatus === "paused";

                    }

                    else {

                        matchesStatus =
                            offerStatus === statusValue;

                    }

                }


                return (
                    matchesSearch &&
                    matchesVertical &&
                    matchesModel &&
                    matchesStatus
                );

            });


        renderOffers(filteredOffers);

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

                if (verticalFilter) {
                    verticalFilter.value = "all";
                }

                if (modelFilter) {
                    modelFilter.value = "all";
                }

                if (statusFilter) {
                    statusFilter.value = "all";
                }


                filterOffers();

            }
        );

    }


    /* =========================================
       SEARCH EVENT
    ========================================= */

    if (searchInput) {

        searchInput.addEventListener(
            "input",
            filterOffers
        );

    }


    /* =========================================
       VERTICAL EVENT
    ========================================= */

    if (verticalFilter) {

        verticalFilter.addEventListener(
            "change",
            filterOffers
        );

    }


    /* =========================================
       MODEL EVENT
    ========================================= */

    if (modelFilter) {

        modelFilter.addEventListener(
            "change",
            filterOffers
        );

    }


    /* =========================================
       STATUS EVENT
    ========================================= */

    if (statusFilter) {

        statusFilter.addEventListener(
            "change",
            filterOffers
        );

    }


    /* =========================================
       TABLE ACTIONS
    ========================================= */

    if (tableBody) {

        tableBody.addEventListener(
            "click",
            function (event) {

                const button =
                    event.target.closest(".table-action");


                if (!button) {
                    return;
                }


                const action =
                    button.dataset.action;


                const offerId =
                    button.dataset.id;


                const offer =
                    offers.find(function (item) {

                        return item.id === offerId;

                    });


                if (!offer) {
                    return;
                }


                /* VIEW */

                if (action === "view") {

                    alert(

                        "OFFER DETAILS\n\n" +

                        "Name: " +
                        offer.name +

                        "\nOffer ID: " +
                        offer.id +

                        "\nVertical: " +
                        offer.vertical +

                        "\nModel: " +
                        offer.model +

                        "\nPayout: $" +
                        Number(offer.payout).toFixed(2) +

                        "\nTraffic: " +
                        offer.traffic +

                        "\nStatus: " +
                        offer.status +

                        "\n\nPortfolio simulation data."

                    );

                }


                /* EDIT */

                if (action === "edit") {

                    alert(

                        "EDIT OFFER\n\n" +

                        offer.name +

                        "\n\n" +

                        "Offer ID: " +
                        offer.id +

                        "\nModel: " +
                        offer.model +

                        "\nPayout: $" +
                        Number(offer.payout).toFixed(2) +

                        "\n\n" +

                        "Offer editing workflow will be added in the next module."

                    );

                }

            }
        );

    }


    /* =========================================
       ADD OFFER BUTTON
    ========================================= */

    if (addOfferButton) {

        addOfferButton.addEventListener(
            "click",
            function () {

                alert(

                    "ADD OFFER\n\n" +

                    "The offer creation workflow is planned for the next step.\n\n" +

                    "This portfolio currently uses fictional demonstration data."

                );

            }
        );

    }


    /* =========================================
       INITIAL LOAD
    ========================================= */

    renderOffers(offers);


    console.log(
        "NexaAffiliates Offers loaded:",
        offers.length,
        "demo offers"
    );

});