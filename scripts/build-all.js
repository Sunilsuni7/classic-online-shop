const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

const rootDir = path.resolve(__dirname, "..");
const outDir = path.join(rootDir, "dist");

console.log("🚀 Starting unified multi-phase build for Classic Online Shop...");

function run(cmd, cwd) {
  console.log(`\n📦 Running: ${cmd} in ${cwd}`);
  execSync(cmd, { cwd, stdio: "inherit" });
}

// 1. Build Phase 4 (Primary Frontend)
run("npm install && npm run build", path.join(rootDir, "phase4/frontend"));

// 2. Build Phase 1
run("npm install --no-package-lock && npm run build", path.join(rootDir, "phase1"));

// 3. Build Phase 2
run("npm install --no-package-lock && npm run build", path.join(rootDir, "phase2/frontend"));

// 4. Build Phase 3
run("npm install --no-package-lock && npm run build", path.join(rootDir, "phase3/frontend"));

// 5. Assemble unified dist folder
console.log("\n📁 Assembling unified distribution directory at ./dist ...");
if (fs.existsSync(outDir)) {
  fs.rmSync(outDir, { recursive: true, force: true });
}
fs.mkdirSync(outDir, { recursive: true });

// Copy Phase 4 as root
fs.cpSync(path.join(rootDir, "phase4/frontend/dist"), outDir, { recursive: true });

// Copy Phase 1 into /phase1
fs.cpSync(path.join(rootDir, "phase1/dist"), path.join(outDir, "phase1"), { recursive: true });

// Copy Phase 2 into /phase2
fs.cpSync(path.join(rootDir, "phase2/frontend/dist"), path.join(outDir, "phase2"), { recursive: true });

// Copy Phase 3 into /phase3
fs.cpSync(path.join(rootDir, "phase3/frontend/dist"), path.join(outDir, "phase3"), { recursive: true });

console.log("✅ Unified build complete! All 4 phases assembled in ./dist");
