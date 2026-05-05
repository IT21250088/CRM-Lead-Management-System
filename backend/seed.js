const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");
const User = require("./models/User");
const Lead = require("./models/Lead");

dotenv.config();

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Clear existing data
    await User.deleteMany({});
    await Lead.deleteMany({});

    // Create test user
    const hashedPassword = await bcrypt.hash("password123", 10);
    const user = await User.create({
      name: "Admin User",
      email: "admin@example.com",
      password: hashedPassword,
      role: "admin"
    });

    console.log("Test user created:", user);

    // Create sample leads
    const sampleLeads = [
      {
        leadName: "Sahan Gunawardena",
        companyName: "TechCorp Inc",
        email: "sahan@gmail.com",
        phone: "0761943434",
        leadSource: "Website",
        assignedSalesperson: "Admin User",
        status: "New",
        estimatedDealValue: 50000
      },
      {
        leadName: "Janindu Perera",
        companyName: "Innovation Ltd",
        email: "janindu@gmail.com",
        phone: "0771234567",
        leadSource: "LinkedIn",
        assignedSalesperson: "Admin User",
        status: "Contacted",
        estimatedDealValue: 75000
      },
      {
        leadName: "Sanduni Silva",
        companyName: "Digital Solutions",
        email: "sanduni@gmail.com",
        phone: "0789876543",
        leadSource: "Referral",
        assignedSalesperson: "Admin User",
        status: "Qualified",
        estimatedDealValue: 100000
      },
      {
        leadName: "Ashan Fernando",
        companyName: "Global Enterprises",
        email: "ashan@gmail.com",
        phone: "0771234569",
        leadSource: "Cold Email",
        assignedSalesperson: "Admin User",
        status: "Proposal Sent",
        estimatedDealValue: 150000
      },
      {
        leadName: "Sandali Dias",
        companyName: "Strategic Partners",
        email: "sandali@gmail.com",
        phone: "0723421234",
        leadSource: "Event",
        assignedSalesperson: "Admin User",
        status: "Won",
        estimatedDealValue: 200000
      }
    ];

    const leads = await Lead.insertMany(sampleLeads);
    console.log(`${leads.length} sample leads created`);

    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
