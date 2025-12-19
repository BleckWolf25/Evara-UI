/**
 * @file .lintstagedrc.js
 *
 * @version 1.0.0
 * @author BleckWolf25
 * @contributors
 * @license MIT
 *
 * @description
 * Configuration file for `lint-staged`.
 * Defines the commands to be executed automatically on files in the "staging area" of Git, before each commit.
 * Ensures that only code that meets quality and style standards is committed to the repository.
 *
 * @since 2025-12-18
 * @updated 2025-12-18
 *
 * @see {@link https://github.com/okonet/lint-staged | lint-staged documentation }
 * @see {@link .eslint.config.js}
 * @see {@link prettier.config.js}
 */
// ---------- CONFIGURATION
export default {
  '*.{ts,tsx,js,jsx}': filenames => {
    const filtered = filenames.filter(filename => !filename.includes('next-env.d.ts'));
    if (filtered.length === 0) return [];

    // Group files by workspace
    const byWorkspace = filtered.reduce((acc, file) => {
      const match = file.match(/\/(backend|frontend|electron)\//);
      const workspace = match ? match[1] : 'root';
      if (!acc[workspace]) acc[workspace] = [];
      acc[workspace].push(file);
      return acc;
    }, {});

    // Execute eslint and tests from each workspace directory
    const commands = [];
    const workspacesWithTests = ['backend', 'frontend', 'e2e'];

    for (const [workspace, files] of Object.entries(byWorkspace)) {
      if (workspace === 'root') {
        commands.push(`eslint --fix ${files.join(' ')}`);
      } else {
        const relativePaths = files.map(f => {
          const parts = f.split(`/${workspace}/`);
          return parts.length > 1 ? parts[1] : f;
        });
        commands.push(`cd ${workspace} && eslint --fix ${relativePaths.join(' ')}`);

        if (workspacesWithTests.includes(workspace)) {
          const testFiles = relativePaths.filter(
            f => f.includes('__tests__') || f.includes('.test.') || f.includes('.spec.')
          );
          if (testFiles.length > 0) {
            commands.push(`cd ${workspace} && pnpm test -- ${testFiles.join(' ')}`);
          }
        }
      }
    }
    commands.push(`prettier --write ${filtered.join(' ')}`);
    return commands;
  },
  '*.{json,md,yml,yaml}': ['prettier --write'],
};
