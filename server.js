import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Example license database
const licenses = {
  "DRACO-1234": { expires: "2025-12-31" },
  "VIP-5678": { expires: "2026-03-01" },
  "TEST-0000": { expires: "2024-12-01" }
};

// API route to check license
app.post("/check-license", (req, res) => {
  const { license } = req.body;
  const licenseData = licenses[license];
  const now = new Date();

  if (!licenseData) {
    return res.status(400).json({ valid: false, message: "Invalid license" });
  }

  const expiry = new Date(licenseData.expires);
  if (now > expiry) {
    return res.status(400).json({ valid: false, message: `Expired on ${licenseData.expires}` });
  }

  res.json({ valid: true, message: "License is valid", expires: licenseData.expires });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`License server running on port ${PORT}`));
