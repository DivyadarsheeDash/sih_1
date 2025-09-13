document.getElementById('cropForm').addEventListener('submit', function(e) {
    e.preventDefault();

    // Get form values
    const formData = new FormData(this);
    const inputs = {};
    for (let [key, value] of formData.entries()) {
        inputs[key] = parseFloat(value);
    }

    // Show loading state
    document.getElementById('results').classList.remove('hidden');
    document.getElementById('predictedCrop').textContent = "Analyzing...";
    document.getElementById('resultImage').src = "assets/images/loading.jpeg"; // ← Changed from .jpg to .jpeg
    document.getElementById('confidenceBar').style.width = "0%";
    document.getElementById('confidenceValue').textContent = "0%";
    document.getElementById('top3List').innerHTML = "";

    // Simulate API call (replace with fetch() to your backend later)
    setTimeout(() => {
        // Mock result based on your model's output
        const mockResult = {
            predicted_crop: "Rice",
            confidence: 0.87,
            top_3_predictions: [
                ["Rice", 0.87],
                ["Maize", 0.10],
                ["Pulses", 0.03]
            ]
        };

        document.getElementById('predictedCrop').textContent = mockResult.predicted_crop;

        // 🚨 ALL IMAGES NOW USE .jpeg
        document.getElementById('resultImage').src = `assets/images/${mockResult.predicted_crop.toLowerCase()}.jpeg`;

        document.getElementById('confidenceBar').style.width = `${mockResult.confidence * 100}%`;
        document.getElementById('confidenceValue').textContent = `${Math.round(mockResult.confidence * 100)}%`;

        const top3List = document.getElementById('top3List');
        top3List.innerHTML = ""; // Clear previous
        mockResult.top_3_predictions.forEach(([crop, prob]) => {
            const li = document.createElement('li');
            li.textContent = `${crop} (${Math.round(prob * 100)}%)`;
            top3List.appendChild(li);
        });

        // Dynamic tip
        const tips = {
            "Rice": "Rice thrives in flooded fields with high humidity and rich alluvial soil.",
            "Wheat": "Wheat prefers cooler temperatures and well-drained loamy soils.",
            "Cotton": "Cotton needs warm climate and black soil with good drainage.",
            "Tea": "Tea grows best in acidic laterite soil with consistent rainfall.",
            "Sugarcane": "Sugarcane requires high temperatures and abundant water.",
            "Maize": "Maize does well in fertile alluvial soils with moderate rainfall.",
            "Mustard": "Mustard grows in cool climates with sandy-loam soil.",
            "Jowar": "Jowar (Sorghum) is drought-tolerant and ideal for dry regions.",
            "Bajra": "Bajra flourishes in sandy soils with low rainfall.",
            "Potato": "Potatoes prefer cool weather and slightly acidic soils.",
            "Pulses": "Pulses enrich soil nitrogen and grow well in loamy or black soils.",
            "Coffee": "Coffee needs shade, high humidity, and well-drained laterite soil."
        };
        document.getElementById('tipText').textContent = tips[mockResult.predicted_crop] || "Crops thrive when nutrients are balanced. Always test soil before planting!";
    }, 1500);
});
