const BASE_URL = "http://localhost:5000";

/* ======================================================
   LOAD ALL MONTHS INTO DROPDOWN
====================================================== */
async function loadMonths() {
  const response = await fetch(`${BASE_URL}/api/months`);
  const months = await response.json();

  const selector = document.getElementById("monthSelector");
  selector.innerHTML = "";

  months.forEach(month => {
    const option = document.createElement("option");
    option.value = month.id;
    option.textContent = month.month_label;
    selector.appendChild(option);
  });

  if (months.length > 0) {
    loadMonthData();
  } else {
    document.getElementById("summaryBox").innerHTML = "No months available";
    document.querySelector("#membersTable tbody").innerHTML = "";
  }
}

/* ======================================================
   CREATE MONTH
====================================================== */
async function createMonth() {
  const monthLabel = document.getElementById("monthLabel").value;
  const bidAmount = document.getElementById("bidAmount").value;
  const payAmount = document.getElementById("payAmount").value;

  const response = await fetch(`${BASE_URL}/api/month`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      monthLabel,
      bidAmount: bidAmount || undefined,
      payAmount: payAmount || undefined
    })
  });

  const data = await response.json();
  alert(data.message || data.error);

  document.getElementById("monthLabel").value = "";
  document.getElementById("bidAmount").value = "";
  document.getElementById("payAmount").value = "";

  loadMonths();
}

/* ======================================================
   LOCK MONTH
====================================================== */
async function lockMonth() {
  const monthId = document.getElementById("monthSelector").value;

  const response = await fetch(`${BASE_URL}/api/month/lock/${monthId}`, {
    method: "POST"
  });

  const data = await response.json();
  alert(data.message || data.error);

  loadMonthData();
}

/* ======================================================
   LOAD SUMMARY + MEMBERS
====================================================== */
async function loadMonthData() {
  const monthId = document.getElementById("monthSelector").value;

  if (!monthId) return;

  // Load summary
  const summaryRes = await fetch(`${BASE_URL}/api/month/${monthId}/summary`);
  const summary = await summaryRes.json();

  const progressPercent =
    summary.totalMembers > 0
      ? (summary.paidMembers / summary.totalMembers) * 100
      : 0;

  document.getElementById("summaryBox").innerHTML = `
    <p><strong>Month:</strong> ${summary.month}</p>
    <p><strong>Bid:</strong> ₹${summary.bidAmount}</p>
    <p><strong>Pay Amount:</strong> ₹${summary.payAmount}</p>
    <p><strong>Collected So Far:</strong> ₹${summary.collectedSoFar}</p>
    <p><strong>Status:</strong> ${
      summary.isLocked ? "LOCKED" : "OPEN"
    }</p>

    <div class="progress-bar">
      <div class="progress-bar-inner" style="width:${progressPercent}%">
        ${summary.paidMembers}/${summary.totalMembers} Paid
      </div>
    </div>
  `;

  // Load members
  const membersRes = await fetch(
    `${BASE_URL}/api/month/${monthId}/members`
  );
  const members = await membersRes.json();

  const tbody = document.querySelector("#membersTable tbody");
  tbody.innerHTML = "";

  members.forEach(member => {
    const row = document.createElement("tr");

    const statusClass =
      member.paymentStatus === "PAID" ? "green" : "red";

    row.innerHTML = `
      <td>${member.name}</td>
      <td>${member.phone}</td>
      <td class="${statusClass}">
        ${member.paymentStatus}
      </td>
      <td>${member.paymentMode || "-"}</td>
      <td>
        ${
          member.paymentStatus === "NOT PAID"
            ? `<button onclick="payMember(${monthId}, ${member.memberId})">
                 Pay
               </button>`
            : "-"
        }
      </td>
    `;

    tbody.appendChild(row);
  });
}

/* ======================================================
   PAY MEMBER
====================================================== */
async function payMember(monthId, memberId) {
  const paymentMode = prompt("Enter payment mode (CASH or ONLINE):");

  if (!paymentMode) return;

  const response = await fetch(`${BASE_URL}/api/payment`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ monthId, memberId, paymentMode })
  });

  const data = await response.json();
  alert(data.message || data.error);

  loadMonthData();
}

/* ======================================================
   INITIAL LOAD
====================================================== */
window.onload = loadMonths;