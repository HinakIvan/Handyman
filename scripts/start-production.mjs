import { spawn } from 'node:child_process';
import { existsSync } from 'node:fs';
import path from 'node:path';
import process from 'node:process';

const root = process.cwd();
const pnpmBin = process.platform === 'win32' ? 'pnpm.cmd' : 'pnpm';
const localNext = path.join(root, 'node_modules', 'next', 'dist', 'bin', 'next');
const localTsNode = path.join(root, 'node_modules', 'ts-node', 'dist', 'bin.js');

if (!existsSync(localNext) || !existsSync(localTsNode)) {
  console.error('Dependencies are missing. Run `pnpm install` and `pnpm run build` first.');
  process.exit(1);
}

const webPort = String(process.env.PORT || '3000');
const rpcPort = String(process.env.RPC_PORT || '3100');
const commonEnv = { ...process.env, NODE_ENV: 'production' };

const api = spawn(process.execPath, [
  localTsNode,
  '-r', 'tsconfig-paths/register',
  '--transpile-only',
  '--project', 'tsconfig.server.json',
  'server/dev-host.ts',
], {
  cwd: root,
  env: { ...commonEnv, RPC_PORT: rpcPort },
  stdio: 'inherit',
});

const web = spawn(process.execPath, [localNext, 'start', '-p', webPort], {
  cwd: root,
  env: { ...commonEnv, RPC_PORT: rpcPort },
  stdio: 'inherit',
});

let shuttingDown = false;
function shutdown(code = 0) {
  if (shuttingDown) return;
  shuttingDown = true;
  for (const child of [api, web]) {
    if (child.exitCode === null && !child.killed) child.kill('SIGTERM');
  }
  setTimeout(() => process.exit(code), 500).unref();
}

for (const child of [api, web]) {
  child.on('error', (error) => {
    console.error('Failed to start service:', error);
    shutdown(1);
  });
  child.on('exit', (code, signal) => {
    if (!shuttingDown) {
      console.error(`Service exited (code=${code}, signal=${signal}); stopping the other service.`);
      shutdown(code || 1);
    }
  });
}

process.on('SIGTERM', () => shutdown(0));
process.on('SIGINT', () => shutdown(0));
console.log(`Starting Next.js on port ${webPort} and RPC backend on port ${rpcPort}`);
