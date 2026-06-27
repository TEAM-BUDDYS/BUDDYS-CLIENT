/* global console, process */

import { spawn } from "node:child_process";
import { mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";

const packageRoot = process.cwd();
const svgRoot = path.join(packageRoot, "src", "assets", "icons");
const generatedRoot = path.join(packageRoot, "src", "shared", "components", "icons");

// 1. 실행 전, 기존에 생성된 .tsx와 index.ts를 전부 비움
//    → svg 파일명을 바꾸거나 지웠을 때 옛 결과물이 남아있는 문제를 방지
const cleanGeneratedFiles = async () => {
  await mkdir(generatedRoot, { recursive: true });

  const entries = await readdir(generatedRoot, { withFileTypes: true });
  await Promise.all(
    entries
      .filter(
        (entry) =>
          entry.isFile() && (entry.name.endsWith(".ts") || entry.name.endsWith(".tsx")),
      )
      .map((entry) => rm(path.join(generatedRoot, entry.name))),
  );
};

// 2. svgr을 셸 문자열이 아니라 spawn + 배열 인자로 직접 실행
//    → Windows PowerShell의 따옴표/이스케이프 처리 차이로 옵션이 깨지는 문제를 방지
const runSvgr = () => {
  const svgrCliPath = path.join(
    packageRoot,
    "node_modules",
    "@svgr",
    "cli",
    "bin",
    "svgr",
  );

  const args = [
    svgrCliPath,
    "--config-file",
    path.join(packageRoot, "svgr.config.mjs"),
    "--no-index",
    "--out-dir",
    path.relative(packageRoot, generatedRoot),
    path.relative(packageRoot, svgRoot),
  ];

  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, args, {
      cwd: packageRoot,
      stdio: "inherit",
    });

    child.on("error", reject);
    child.on("exit", (code) => {
      if (code === 0) {
        resolve();
        return;
      }
      reject(new Error(`SVGR exited with code ${code}`));
    });
  });
};

// 3. 생성된 컴포넌트 파일의 export 이름에 Icon suffix가 없으면 추가
const addIconSuffix = async () => {
  const entries = await readdir(generatedRoot, { withFileTypes: true });
  const componentFiles = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".tsx"))
    .map((entry) => entry.name);

  await Promise.all(
    componentFiles.map(async (file) => {
      const filePath = path.join(generatedRoot, file);
      const content = await readFile(filePath, "utf-8");
      const renamed = content.replace(
        /export const (\w+) =/,
        (_, name) => `export const ${name.endsWith("Icon") ? name : `${name}Icon`} =`,
      );
      await writeFile(filePath, renamed, "utf-8");
    }),
  );
};

// 4. barrel(index.ts) 생성 — 파일 내용에서 실제 export 이름을 읽어서 작성
const writeIconBarrel = async () => {
  const entries = await readdir(generatedRoot, { withFileTypes: true });
  const componentFiles = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".tsx"))
    .map((entry) => entry.name)
    .sort();

  const exportLines = await Promise.all(
    componentFiles.map(async (file) => {
      const filePath = path.join(generatedRoot, file);
      const content = await readFile(filePath, "utf-8");
      const match = content.match(/export const (\w+)/);

      if (!match) {
        console.warn(`⚠️ ${file}에서 export const를 찾지 못했습니다. 건너뜁니다.`);
        return null;
      }

      const exportName = match[1];
      const fileBaseName = path.basename(file, ".tsx");
      return `export { ${exportName} } from "./${fileBaseName}";`;
    }),
  );

  const validExportLines = exportLines.filter(Boolean);
  const content =
    validExportLines.length > 0 ? `${validExportLines.join("\n")}\n` : "export {};\n";

  await writeFile(path.join(generatedRoot, "index.ts"), content, "utf-8");

  console.log(`✅ icons/index.ts barrel 갱신 완료 (${validExportLines.length}개)`);
};

await cleanGeneratedFiles();
await runSvgr();
await addIconSuffix();
await writeIconBarrel();
