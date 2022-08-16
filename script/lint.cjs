const { ESLint } = require("eslint");

const files = process.argv.slice(1).map((val, index) => {
  return val;
});
(async function main() {
  // 1. Create an instance with the `fix` option.
  const eslint = new ESLint({ fix: true });

  // 2. Lint files. This doesn't modify target files.
  const results = await eslint.lintFiles(files);

  // 3. Modify the files with the fixed code.
  await ESLint.outputFixes(results);

  // 4. Format the results.
  const formatter = await eslint.loadFormatter("stylish");
  const resultText = formatter.format(results);

  // 5. Output it.
  // console.log(resultText);
  if (resultText) {
    throw new Error(resultText);
  }
})().catch((error) => {
  process.exitCode = 1;
  // eslint-disable-next-line no-console
  console.error(error.message);
});
