import type { IsPluginEnabled, Plugin } from '../../types/config.js';
import { _firstGlob } from '../../util/glob.js';

// https://pnpm.io/pnpmfile

const title = 'pnpm';

const isEnabled: IsPluginEnabled = async ({ cwd, manifest }) =>
  Boolean(
    manifest.packageManager?.startsWith('pnpm@') ||
      (await _firstGlob({ cwd, patterns: ['pnpm-lock.yaml', 'pnpm-workspace.yaml'] }))
  );

const config: string[] = ['.pnpmfile.cjs'];

export default {
  title,
  isEnabled,
  config,
} satisfies Plugin;
