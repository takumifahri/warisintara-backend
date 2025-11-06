async function runSeeds() {
  console.log("🚀 Starting database seeding...");
  
  try {
    // Import and run seeds sequentially
    console.log("\n1️⃣ Running user & role seed...");
    await import('./userSeeder');
    
    console.log("\n🎉 All seeds completed successfully!");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  }
}

runSeeds();