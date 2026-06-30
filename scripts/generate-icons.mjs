import { spawn } from 'node:child_process';
import {
  access,
  mkdir,
  readdir,
  readFile,
  rename,
  rm,
  writeFile,
} from 'node:fs/promises';
import path from 'node:path';

const packageRoot = process.cwd();
const svgRoot = path.join(packageRoot, 'src', 'shared', 'assets', 'icons');
const finalDir = path.join(packageRoot, 'src', 'shared', 'components', 'icons');
const tempDir = `${finalDir}-tmp`;
const backupDir = `${finalDir}-backup`;

const pathExists = async (target) => {
  try {
    await access(target);
    return true;
  } catch {
    return false;
  }
};

const cleanupLeftovers = async () => {
  await rm(tempDir, { recursive: true, force: true });
  await rm(backupDir, { recursive: true, force: true });
};

const runSvgr = () => {
  const svgrCliPath = path.join(
    packageRoot,
    'node_modules',
    '@svgr',
    'cli',
    'bin',
    'svgr',
  );

  const args = [
    svgrCliPath,
    '--config-file',
    path.join(packageRoot, 'svgr.config.mjs'),
    '--no-index',
    '--out-dir',
    path.relative(packageRoot, tempDir),
    path.relative(packageRoot, svgRoot),
  ];

  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, args, {
      cwd: packageRoot,
      stdio: 'inherit',
    });

    child.on('error', reject);
    child.on('exit', (code) => {
      if (code === 0) {
        resolve();
        return;
      }
      reject(new Error(`SVGR exited with code ${code}`));
    });
  });
};

const addIconSuffix = async () => {
  const entries = await readdir(tempDir, { withFileTypes: true });
  const componentFiles = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith('.tsx'))
    .map((entry) => entry.name);

  await Promise.all(
    componentFiles.map(async (file) => {
      const filePath = path.join(tempDir, file);
      const content = await readFile(filePath, 'utf-8');
      const renamed = content.replace(
        /export const (\w+) =/,
        (_, name) =>
          `export const ${name.endsWith('Icon') ? name : `${name}Icon`} =`,
      );
      await writeFile(filePath, renamed, 'utf-8');
    }),
  );
};

const renameIconFiles = async () => {
  const entries = await readdir(tempDir, { withFileTypes: true });
  const componentFiles = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith('.tsx'))
    .map((entry) => entry.name);

  await Promise.all(
    componentFiles.map(async (file) => {
      const baseName = path.basename(file, '.tsx');
      if (!baseName.endsWith('Icon')) {
        await rename(
          path.join(tempDir, file),
          path.join(tempDir, `${baseName}Icon.tsx`),
        );
      }
    }),
  );
};

const writeIconBarrel = async () => {
  const entries = await readdir(tempDir, { withFileTypes: true });
  const componentFiles = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith('.tsx'))
    .map((entry) => entry.name)
    .sort();

  const exportLines = await Promise.all(
    componentFiles.map(async (file) => {
      const filePath = path.join(tempDir, file);
      const content = await readFile(filePath, 'utf-8');
      const match = content.match(/export const (\w+)/);

      if (!match) {
        console.warn(
          `⚠️ ${file}에서 export const를 찾지 못했습니다. 건너뜁니다.`,
        );
        return null;
      }

      const exportName = match[1];
      const fileBaseName = path.basename(file, '.tsx');
      return `export { ${exportName} } from "./${fileBaseName}";`;
    }),
  );

  const validExportLines = exportLines.filter(Boolean);
  const content =
    validExportLines.length > 0
      ? `${validExportLines.join('\n')}\n`
      : 'export {};\n';

  await writeFile(path.join(tempDir, 'index.ts'), content, 'utf-8');

  console.log(
    `✅ icons/index.ts barrel 갱신 완료 (${validExportLines.length}개)`,
  );
};

const runPrettier = () => {
  const prettierBin = path.join(
    packageRoot,
    'node_modules',
    'prettier',
    'bin',
    'prettier.cjs',
  );
  const args = [prettierBin, '--write', path.relative(packageRoot, tempDir)];

  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, args, {
      cwd: packageRoot,
      stdio: 'inherit',
    });
    child.on('error', reject);
    child.on('exit', (code) =>
      code === 0
        ? resolve()
        : reject(new Error(`Prettier exited with code ${code}`)),
    );
  });
};

const runEslintFix = () => {
  const eslintBin = path.join(
    packageRoot,
    'node_modules',
    'eslint',
    'bin',
    'eslint.js',
  );
  const args = [eslintBin, '--fix', path.relative(packageRoot, tempDir)];

  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, args, {
      cwd: packageRoot,
      stdio: 'inherit',
    });
    child.on('error', reject);
    child.on('exit', (code) =>
      code === 0
        ? resolve()
        : reject(new Error(`ESLint exited with code ${code}`)),
    );
  });
};

const swapDirectories = async () => {
  const hadExisting = await pathExists(finalDir);

  if (hadExisting) {
    await rename(finalDir, backupDir);
  }

  try {
    await rename(tempDir, finalDir);
  } catch (error) {
    if (hadExisting) {
      await rename(backupDir, finalDir);
    }
    throw error;
  }

  if (hadExisting) {
    await rm(backupDir, { recursive: true, force: true });
  }
};

try {
  await cleanupLeftovers();
  await mkdir(tempDir, { recursive: true });
  await runSvgr();
  await addIconSuffix();
  await renameIconFiles();
  await writeIconBarrel();
  await runPrettier();
  await runEslintFix();
  await swapDirectories();
} catch (error) {
  await rm(tempDir, { recursive: true, force: true });
  throw error;
}
