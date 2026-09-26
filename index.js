document.addEventListener("DOMContentLoaded", async () => {
  // Default fallback data
  let data = {
    "productName": "Saras Ghee 500 ml",
    "uid": "RLTQ4AAZDGI5",
    "status": "Product Already Sold",
    "batchNo": "NJ 304",
    "expiryDate": "April 25, 2026",
    "manufactureDate": "October 26, 2025",
    "mrp": 277,
    "producedAt": "JAIPUR ZILA DUGDH UTPADAK SAHAKARI SANGH LTD, Jaipur",
    "totalUniqueDevicesScanned": 5,
    "recentScans": [
      {
        "device": "71be5a79f8c6d45022b31195f265ebcd",
        "location": "undefined,undefined",
        "time": "23/09/2026, 7:15:33 AM"
      },
      {
        "device": "ef2b6a-47ec-87d9fb",
        "location": "(,)",
        "time": "21/11/2025, 7:19:56 PM"
      },
      {
        "device": "dd2bd0-4045-a020e2",
        "location": "(27.00657,75.704372)",
        "time": "21/11/2025, 7:05:07 PM"
      }
    ],
    "additionalScansOnOtherDevices": 2
  };

  try {
    const response = await fetch("https://api.launchifyy.com/api/v1/nk");
    if (response.ok) {
      const result = await response.json();
      // The API returns an object with a "data" property containing our fields
      if (result && result.data) {
        data = result.data;
      }
    } else {
      console.warn("API returned non-OK status, falling back to default data");
    }
  } catch (error) {
    console.error("Failed to fetch from API, falling back to default data", error);
  }

  // Update DOM elements with data
  document.getElementById('product-title').textContent = data.productName;
  document.getElementById('product-uid').textContent = `(UID: ${data.uid})`;
  document.getElementById('product-status').textContent = data.status;

  document.getElementById('product-batch').textContent = data.batchNo;
  document.getElementById('product-expiry').textContent = data.expiryDate;
  document.getElementById('product-manufacture').textContent = data.manufactureDate;
  document.getElementById('product-mrp').textContent = data.mrp;
  document.getElementById('product-produced-at').textContent = data.producedAt;

  document.getElementById('device-count-text').innerHTML = `This product has been scanned on <strong>${data.totalUniqueDevicesScanned}</strong> unique devices.`;

  // Set the dynamic heading for scans count
  document.getElementById('scans-count-heading').textContent = `Last ${data.recentScans.length} scans:`;

  // Populate scans list
  const scansList = document.getElementById('scans-list');
  data.recentScans.forEach(scan => {
    const scanDiv = document.createElement('div');
    scanDiv.className = 'mb-2';
    scanDiv.innerHTML = `
      <p class="mb-0"><strong>Device:</strong> ${scan.device}</p>
      <p class="mb-0"><strong>Location:</strong> ${scan.location}</p>
      <p class="mb-0"><strong>Time:</strong> ${scan.time}</p>
      <hr>
    `;
    scansList.appendChild(scanDiv);
  });

  document.getElementById('additional-scans-text').textContent = `Product scanned on ${data.additionalScansOnOtherDevices} more devices.`;
});
