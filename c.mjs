import { execSync } from 'child_process';
const o = { cwd: 'D:/intellij/Projects/Nasa_Space_apps26/lunar-legacy', stdio: 'pipe', timeout: 60000 };
execSync('git.exe add -A', o);
try { execSync('git.exe commit -m "chore: remove push helper scripts"', o); } catch(_) {}
execSync('git.exe push origin main', o);
console.log('done');
