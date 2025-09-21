import { test } from 'bun:test';
import assert from 'node:assert/strict';
import { main } from '../../src/index.js';
import { createOptions } from '../../src/util/create-options.js';
import { join } from '../../src/util/path.js';
import baseCounters from '../helpers/baseCounters.js';
import { resolve } from '../helpers/resolve.js';

const cwd = resolve('fixtures/plugins/rstest');

test('Find dependencies with the rstest plugin', async () => {
  const options = await createOptions({ cwd });
  const { counters, issues } = await main(options);

  assert(issues.files.has(join(cwd, 'not-included.ts')));

  assert.deepEqual(counters, {
    ...baseCounters,
    files: 1,
    processed: 3,
    total: 3,
  });
});
