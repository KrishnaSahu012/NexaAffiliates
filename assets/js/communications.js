/* =========================================
   NexaAffiliates - Communications
   Demo Portfolio Data
   ========================================= */

const communicationData = [

    {
        id: "MSG-001",
        contact: "Alex Morgan",
        organization: "NorthStar Media",
        subject: "Finance campaign traffic update",
        type: "Affiliate",
        priority: "Medium",
        status: "Read",
        lastActivity: "2026-09-15"
    },

    {
        id: "MSG-002",
        contact: "Sarah Mitchell",
        organization: "SafeNest Insurance",
        subject: "Insurance offer requirements",
        type: "Advertiser",
        priority: "High",
        status: "Unread",
        lastActivity: "2026-09-16"
    },

    {
        id: "MSG-003",
        contact: "Daniel Carter",
        organization: "BluePeak Content",
        subject: "Content placement review",
        type: "Affiliate",
        priority: "Medium",
        status: "Follow-Up",
        lastActivity: "2026-09-14"
    },

    {
        id: "MSG-004",
        contact: "Emily Johnson",
        organization: "HomePro Connect",
        subject: "Home services campaign launch",
        type: "Advertiser",
        priority: "High",
        status: "Resolved",
        lastActivity: "2026-09-13"
    },

    {
        id: "MSG-005",
        contact: "Michael Brown",
        organization: "GrowthPilot Media",
        subject: "Traffic source approval",
        type: "Affiliate",
        priority: "High",
        status: "Follow-Up",
        lastActivity: "2026-09-15"
    },

    {
        id: "MSG-006",
        contact: "Olivia Wilson",
        organization: "CloudDesk Solutions",
        subject: "SaaS trial campaign update",
        type: "Advertiser",
        priority: "Low",
        status: "Read",
        lastActivity: "2026-09-12"
    },

    {
        id: "MSG-007",
        contact: "James Anderson",
        organization: "NorthStar Media",
        subject: "Compliance review follow-up",
        type: "Affiliate",
        priority: "High",
        status: "Unread",
        lastActivity: "2026-09-16"
    },

    {
        id: "MSG-008",
        contact: "Sophia Taylor",
        organization: "Internal Account Team",
        subject: "Weekly account review",
        type: "Internal",
        priority: "Low",
        status: "Resolved",
        lastActivity: "2026-09-11"
    },

    {
        id: "MSG-009",
        contact: "William Davis",
        organization: "LearnBridge Academy",
        subject: "Education campaign feedback",
        type: "Advertiser",
        priority: "Medium",
        status: "Unread",
        lastActivity: "2026-09-16"
    },

    {
        id: "MSG-010",
        contact: "Emma Thomas",
        organization: "BluePeak Content",
        subject: "Performance optimization discussion",
        type: "Affiliate",
        priority: "Medium",
        status: "Read",
        lastActivity: "2026-09-10"
    }

];


/* =========================================
   Helper
   ========================================= */

function getCommunicationElement(id) {

    return document.getElementById(id);

}


function escapeCommunicationHTML(value) {

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

function getMessageStatusBadge(status) {

    const badgeMap = {

        "Unread": "badge-info",

        "Follow-Up": "badge-warning",

        "Resolved": "badge-success",

        "Read": "badge-neutral"

    };

    const badgeClass =
        badgeMap[status] || "badge-neutral";


    return `
        <span class="badge ${badgeClass}">
            ${escapeCommunicationHTML(status)}
        </span>
    `;

}


/* =========================================
   Priority Badge
   ========================================= */

function getMessagePriorityBadge(priority) {

    const badgeMap = {

        "High": "badge-danger",

        "Medium": "badge-warning",

        "Low": "badge-neutral"

    };

    const badgeClass =
        badgeMap[priority] || "badge-neutral";


    return `
        <span class="badge ${badgeClass}">
            ${escapeCommunicationHTML(priority)}
        </span>
    `;

}


/* =========================================
   Type Badge
   ========================================= */

function getMessageTypeBadge(type) {

    const badgeMap = {

        "Affiliate": "badge-primary",

        "Advertiser": "badge-info",

        "Internal": "badge-neutral"

    };

    const badgeClass =
        badgeMap[type] || "badge-neutral";


    return `
        <span class="badge ${badgeClass}">
            ${escapeCommunicationHTML(type)}
        </span>
    `;

}


/* =========================================
   Update KPIs
   ========================================= */

function updateCommunicationKPIs(data) {

    const total = data.length;


    const unread = data.filter(
        item => item.status === "Unread"
    ).length;


    const followUps = data.filter(
        item => item.status === "Follow-Up"
    ).length;


    const resolved = data.filter(
        item => item.status === "Resolved"
    ).length;


    const totalElement =
        getCommunicationElement("totalMessagesCount");


    const unreadElement =
        getCommunicationElement("unreadMessagesCount");


    const followUpElement =
        getCommunicationElement("followUpMessagesCount");


    const resolvedElement =
        getCommunicationElement("resolvedMessagesCount");


    if (totalElement) {

        totalElement.textContent = total;

    }


    if (unreadElement) {

        unreadElement.textContent = unread;

    }


    if (followUpElement) {

        followUpElement.textContent = followUps;

    }


    if (resolvedElement) {

        resolvedElement.textContent = resolved;

    }

}


/* =========================================
   Render Messages
   ========================================= */

function renderCommunicationTable(data) {

    const tableBody =
        getCommunicationElement("messagesTableBody");


    const resultCount =
        getCommunicationElement("messagesResultCount");


    const countBadge =
        getCommunicationElement("messagesCountBadge");


    if (!tableBody) {

        return;

    }


    if (data.length === 0) {

        tableBody.innerHTML = `

            <tr>

                <td colspan="8">

                    <div class="empty-state">

                        <div class="empty-state-icon">

                            <i class="fa-solid fa-comments"></i>

                        </div>

                        <h3 class="empty-state-title">
                            No messages found
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

                    <!-- Contact -->

                    <td>

                        <span class="primary-text">
                            ${escapeCommunicationHTML(item.contact)}
                        </span>

                        <span class="secondary-text">
                            ${escapeCommunicationHTML(item.id)}
                        </span>

                    </td>


                    <!-- Organization -->

                    <td>

                        <span class="primary-text">
                            ${escapeCommunicationHTML(item.organization)}
                        </span>

                    </td>


                    <!-- Subject -->

                    <td>

                        <span class="primary-text">
                            ${escapeCommunicationHTML(item.subject)}
                        </span>

                    </td>


                    <!-- Type -->

                    <td>

                        ${getMessageTypeBadge(item.type)}

                    </td>


                    <!-- Priority -->

                    <td>

                        ${getMessagePriorityBadge(item.priority)}

                    </td>


                    <!-- Status -->

                    <td>

                        ${getMessageStatusBadge(item.status)}

                    </td>


                    <!-- Last Activity -->

                    <td>

                        ${escapeCommunicationHTML(item.lastActivity)}

                    </td>


                    <!-- Actions -->

                    <td>

                        <div class="table-actions">


                            <button
                                class="table-action"
                                type="button"
                                title="View message"
                                data-action="view"
                                data-id="${escapeCommunicationHTML(item.id)}"
                            >

                                <i class="fa-solid fa-eye"></i>

                            </button>


                            <button
                                class="table-action"
                                type="button"
                                title="Reply"
                                data-action="reply"
                                data-id="${escapeCommunicationHTML(item.id)}"
                            >

                                <i class="fa-solid fa-reply"></i>

                            </button>


                        </div>

                    </td>

                </tr>

            `;

        }).join("");

    }


    if (resultCount) {

        resultCount.textContent =
            `${data.length} message${data.length === 1 ? "" : "s"}`;

    }


    if (countBadge) {

        countBadge.textContent =
            `${data.length} message${data.length === 1 ? "" : "s"}`;

    }

}


/* =========================================
   Filter Messages
   ========================================= */

function filterCommunicationData() {

    const searchInput =
        getCommunicationElement("messageSearch");


    const typeFilter =
        getCommunicationElement("messageTypeFilter");


    const statusFilter =
        getCommunicationElement("messageStatusFilter");


    const priorityFilter =
        getCommunicationElement("messagePriorityFilter");


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


    const selectedPriority =
        priorityFilter
            ? priorityFilter.value
            : "all";


    const filteredData =
        communicationData.filter(item => {


            const matchesSearch =

                searchTerm === "" ||

                item.contact
                    .toLowerCase()
                    .includes(searchTerm) ||

                item.organization
                    .toLowerCase()
                    .includes(searchTerm) ||

                item.subject
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


            const matchesPriority =

                selectedPriority === "all" ||

                item.priority === selectedPriority;


            return (

                matchesSearch &&

                matchesType &&

                matchesStatus &&

                matchesPriority

            );

        });


    updateCommunicationKPIs(filteredData);

    renderCommunicationTable(filteredData);

}


/* =========================================
   Reset Filters
   ========================================= */

function resetCommunicationFilters() {

    const searchInput =
        getCommunicationElement("messageSearch");


    const typeFilter =
        getCommunicationElement("messageTypeFilter");


    const statusFilter =
        getCommunicationElement("messageStatusFilter");


    const priorityFilter =
        getCommunicationElement("messagePriorityFilter");


    if (searchInput) {

        searchInput.value = "";

    }


    if (typeFilter) {

        typeFilter.value = "all";

    }


    if (statusFilter) {

        statusFilter.value = "all";

    }


    if (priorityFilter) {

        priorityFilter.value = "all";

    }


    filterCommunicationData();

}


/* =========================================
   Message Actions
   ========================================= */

function handleCommunicationAction(action, id) {

    const message =
        communicationData.find(
            item => item.id === id
        );


    if (!message) {

        return;

    }


    if (action === "view") {

        alert(

            `Message Details\n\n` +

            `ID: ${message.id}\n` +

            `Contact: ${message.contact}\n` +

            `Organization: ${message.organization}\n` +

            `Subject: ${message.subject}\n` +

            `Type: ${message.type}\n` +

            `Priority: ${message.priority}\n` +

            `Status: ${message.status}\n` +

            `Last Activity: ${message.lastActivity}`

        );

    }


    if (action === "reply") {

        alert(

            `Reply to ${message.contact}\n\n` +

            `Subject: ${message.subject}\n\n` +

            `Demo workflow: the reply composer would open here in a production system.`

        );

    }

}


/* =========================================
   Compose Message
   ========================================= */

function composeMessage() {

    alert(

        "Compose Message\n\n" +

        "Demo workflow: a message composer would open here " +

        "in a production communication system."

    );

}


/* =========================================
   Event Listeners
   ========================================= */

function setupCommunicationEvents() {

    const searchInput =
        getCommunicationElement("messageSearch");


    const typeFilter =
        getCommunicationElement("messageTypeFilter");


    const statusFilter =
        getCommunicationElement("messageStatusFilter");


    const priorityFilter =
        getCommunicationElement("messagePriorityFilter");


    const resetButton =
        getCommunicationElement("resetMessageFilters");


    const composeButton =
        getCommunicationElement("composeMessageButton");


    if (searchInput) {

        searchInput.addEventListener(
            "input",
            filterCommunicationData
        );

    }


    if (typeFilter) {

        typeFilter.addEventListener(
            "change",
            filterCommunicationData
        );

    }


    if (statusFilter) {

        statusFilter.addEventListener(
            "change",
            filterCommunicationData
        );

    }


    if (priorityFilter) {

        priorityFilter.addEventListener(
            "change",
            filterCommunicationData
        );

    }


    if (resetButton) {

        resetButton.addEventListener(
            "click",
            resetCommunicationFilters
        );

    }


    if (composeButton) {

        composeButton.addEventListener(
            "click",
            composeMessage
        );

    }


    const tableBody =
        getCommunicationElement("messagesTableBody");


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


                handleCommunicationAction(
                    action,
                    id
                );

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

        setupCommunicationEvents();

        filterCommunicationData();

    }
);