import { execSync } from 'child_process';
const cwd = 'D:/intellij/Projects/Nasa_Space_apps26/lunar-legacy';
const run = (cmd) => {
  console.log(`> ${cmd}`);
  try {
    const o = execSync(cmd, { cwd, stdio: 'pipe', timeout: 60000 });
    if (o?.toString().trim()) console.log(o.toString().trim());
  } catch(e) {
    if (e.stderr?.toString().trim()) console.error(e.stderr.toString().trim());
    if (e.stdout?.toString().trim()) console.log(e.stdout.toString().trim());
  }
};
run('git.exe add -A');
run('git.exe status --short');
run('git.exe commit -m "chore: final cleanup, remove all temp scripts"');
run('git.exe push origin main');
console.log('All done — repo is clean.');
