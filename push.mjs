import { execSync } from 'child_process';
const cwd = 'D:/intellij/Projects/Nasa_Space_apps26/lunar-legacy';
['git.exe add -A',
 'git.exe commit -m "chore: remove all temp helper scripts, repo is clean"',
 'git.exe push origin main'
].forEach(cmd => {
  console.log(`> ${cmd}`);
  try { const o = execSync(cmd, {cwd, stdio:'pipe', timeout:60000}); if(o?.toString().trim()) console.log(o.toString().trim()); }
  catch(e) { if(e.stderr?.toString().trim()) console.error(e.stderr.toString().trim()); if(e.stdout?.toString().trim()) console.log(e.stdout.toString().trim()); }
});
console.log('Push complete.');
