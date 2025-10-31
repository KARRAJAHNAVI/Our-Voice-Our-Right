// ======= District data for selected states =======
const districtData = {
  "Andhra Pradesh": ["Srikakulam","Vizianagaram","Visakhapatnam","East Godavari","West Godavari","Krishna","Guntur","Prakasam","Nellore","Kadapa","Kurnool","Anantapur","Chittoor"],
  "Telangana": ["Adilabad","Nizamabad","Karimnagar","Medak","Hyderabad","Rangareddy","Mahabubnagar","Nalgonda","Warangal","Khammam"],
  "Karnataka": ["Belgaum","Bagalkot","Bijapur","Bidar","Raichur","Koppal","Gadag","Dharwad","Uttara Kannada","Haveri","Bellary","Chitradurga","Davanagere","Shimoga","Udupi","Chikmagalur","Tumkur","Bangalore Rural","Ramanagara","Bangalore Urban","Dakshina Kannada","Kodagu","Mysore","Chamarajanagar","Gulbarga","Yadgir","Kolar","Chikkaballapura"],
  "Kerala": ["Kasaragod","Kannur","Wayanad","Kozhikode","Malappuram","Palakkad","Thrissur","Ernakulam","Idukki","Kottayam","Alappuzha","Pathanamthitta","Kollam","Thiruvananthapuram"],
  "Tamil Nadu": ["Ariyalur","Chengalpattu","Chennai","Coimbatore","Cuddalore","Dharmapuri","Dindigul","Erode","Kallakurichi","Kancheepuram","Karur","Krishnagiri","Madurai","Mayiladuthurai","Nagapattinam","Namakkal","Perambalur","Pudukkottai","Ramanathapuram","Ranipet","Salem","Sivaganga","Tenkasi","Thanjavur","Theni","Thoothukkudi","Tiruchirappalli","Tirunelveli","Tiruppur","Tiruvallur","Tiruvannamalai","Vellore","Viluppuram","Virudhunagar","Kanyakumari"],
  "Maharashtra": ["Mumbai Suburban","Mumbai City","Pune","Nagpur","Thane","Nashik","Aurangabad","Solapur","Amravati","Satara","Kolhapur","Raigad","Sangli","Beed","Jalgaon","Akola","Wardha","Yavatmal","Gondia","Bhandara","Ratnagiri","Sindhudurg","Palghar","Dhule","Latur","Nanded","Parbhani","Hingoli","Chandrapur","Gadchiroli"],
  "Goa": ["North Goa","South Goa"],
  "Gujarat": ["Ahmedabad","Surat","Vadodara","Rajkot","Bhavnagar","Jamnagar","Junagadh","Gandhinagar","Anand","Mehsana","Navsari","Bhuj","Valsad","Porbandar","Bharuch","Surendranagar","Patan","Kheda","Dahod","Narmada","Dang","Tapi","Chhota Udaipur","Mahisagar","Aravalli","Botad","Morbi"],
  "Odisha": ["Angul","Balangir","Balasore","Bargarh","Bhadrak","Boudh","Cuttack","Deogarh","Dhenkanal","Gajapati","Ganjam","Jagatsinghpur","Jajpur","Jharsuguda","Kalahandi","Kandhamal","Kendrapara","Kendujhar","Khordha","Koraput","Malkangiri","Mayurbhanj","Nabarangpur","Nuapada","Puri","Rayagada","Sambalpur","Sonepur","Sundargarh"],
  "Madhya Pradesh": ["Agar Malwa","Alirajpur","Anuppur","Ashoknagar","Balaghat","Barwani","Betul","Bhind","Bhopal","Burhanpur","Chhatarpur","Chhindwara","Damoh","Datia","Dewas","Dhar","Dindori","Guna","Gwalior","Harda","Hoshangabad","Indore","Jabalpur","Jhabua","Katni","Khandwa","Khargone","Mandla","Mandsaur","Morena","Narsinghpur","Neemuch","Panna","Raisen","Rajgarh","Ratlam","Rewa","Sagar","Satna","Sehore","Seoni","Shahdol","Shajapur","Sheopur","Shivpuri","Sidhi","Singrauli","Tikamgarh","Ujjain","Umaria","Vidisha"],
  "Delhi": ["Central Delhi","East Delhi","New Delhi","North Delhi","North East Delhi","North West Delhi","Shahdara","South Delhi","South East Delhi","South West Delhi","West Delhi"]
};

// ======= Populate district dropdown based on selected state =======
function populateDistricts() {
  const state = document.getElementById('stateSelect').value;
  const districtSelect = document.getElementById('districtSelect');
  districtSelect.innerHTML = '<option value="">--Select District--</option>';

  if (state && districtData[state]) {
    districtData[state].forEach(d => {
      const option = document.createElement('option');
      option.value = d;
      option.textContent = d;
      districtSelect.appendChild(option);
    });
  }
}

// ======= Sample performance data =======
const samplePerformance = {
  current: 75, // % of jobs completed
  past: [50, 60, 70, 65, 75], // last 5 months
  rank: 3 // district ranking
};

// ======= Load data for selected district =======
function loadData() {
  const district = document.getElementById('districtSelect').value;
  if (!district) {
    alert("Please select a district");
    return;
  }

  const chartContainer = document.getElementById('performanceChart');
  if (chartContainer.chartInstance) {
    chartContainer.chartInstance.destroy();
  }

  const ctx = chartContainer.getContext('2d');
  chartContainer.chartInstance = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ["5 months ago", "4 months ago", "3 months ago", "2 months ago", "Last month"],
      datasets: [{
        label: `${district} Performance (%)`,
        data: samplePerformance.past,
        borderColor: 'green',
        backgroundColor: 'rgba(0, 255, 0, 0.2)',
        fill: true,
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      plugins: { legend: { display: true } },
      scales: { y: { beginAtZero: true, max: 100 } }
    }
  });

  document.getElementById('comparison').innerHTML = `
    <p>Current Job Completion: <strong>${samplePerformance.current}%</strong></p>
    <p>District Rank: <strong>${samplePerformance.rank}</strong></p>
  `;
}

// ======= Bonus: Auto-detect location =======
function detectLocation() {
  if (!navigator.geolocation) {
    alert("Geolocation not supported by your browser.");
    return;
  }

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude } = position.coords;
      alert(`Detected your location:\nLat: ${latitude}, Lon: ${longitude}`);
      // Optional: Use reverse geocoding to auto-select nearest district automatically
    },
    () => alert("Unable to retrieve your location.")
  );
}
