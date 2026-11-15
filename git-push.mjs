import { execSync } from 'child_process';

const cwd = 'D:/intellij/Projects/Nasa_Space_apps26/lunar-legacy';
const run = (cmd, opts = {}) => {
  console.log(`\n> ${cmd}`);
  try {
    const out = execSync(cmd, { cwd, stdio: 'pipe', timeout: 60000, ...opts });
    const s = out?.toString().trim();
    if (s) console.log(s);
    return s;
  } catch (e) {
    const stderr = e.stderr?.toString().trim();
    const stdout = e.stdout?.toString().trim();
    if (stdout) console.log(stdout);
    if (stderr) console.error(stderr);
    // Don't throw on non-fatal git messages
    return null;
  }
};

console.log('=== Lunar Legacy → GitHub ===\n');

// 1. Check if already a git repo
const isRepo = run('git.exe rev-parse --is-inside-work-tree');

if (isRepo !== 'true') {
  run('git.exe init -b main');
} else {
  console.log('Already a git repo.');
  // Make sure we are on main
  run('git.exe checkout -B main');
}

// 2. Set identity (required for commits in some environments)
run('git.exe config user.email "lunar-legacy@spaceapps.dev"');
run('git.exe config user.name "Lunar Legacy"');

// 3. Remove old remote if present, add correct one
run('git.exe remote remove origin');
run('git.exe remote add origin https://github.com/Niranjana2410/Lunar_Legacy.git');

// 4. Stage everything
run('git.exe add -A');

// 5. Commit
const status = run('git.exe status --short');
if (status) {
  run('git.exe commit -m "feat: initial Lunar Legacy application\n\nNASA Space Apps Challenge 2026\nComplete React + Vite web application documenting abandoned space hardware.\nData sourced from NASA NSSDCA public records."');
} else {
  console.log('Nothing new to commit — checking if we just need to push.');
}

// 6. Push
console.log('\nPushing to origin main...');
try {
  const pushOut = execSync(
    'git.exe push -u origin main --force',
    { cwd, stdio: 'pipe', timeout: 60000 }
  );
  console.log(pushOut?.toString().trim());
  console.log('\n✓ Push successful!');
} catch (e) {
  console.error('Push error:', e.stderr?.toString());
  console.log(e.stdout?.toString());
}
