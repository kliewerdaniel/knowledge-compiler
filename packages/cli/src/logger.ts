import chalk from "chalk";
import ora from "ora";

export const logger = {
  info(msg: string) {
    console.log(chalk.blue("i"), msg);
  },

  success(msg: string) {
    console.log(chalk.green("ok"), msg);
  },

  warn(msg: string) {
    console.log(chalk.yellow("warn"), msg);
  },

  error(msg: string) {
    console.error(chalk.red("err"), msg);
  },

  debug(msg: string) {
    if (process.env.KC_DEBUG) {
      console.log(chalk.gray("  "), msg);
    }
  },

  table(data: Record<string, unknown>[]) {
    if (data.length === 0) {
      console.log(chalk.gray("  (no data)"));
      return;
    }
    const headers = Object.keys(data[0]);
    const widths = headers.map((h) => Math.max(h.length, ...data.map((row) => String(row[h] ?? "").length)));

    const headerLine = headers
      .map((h, i) => chalk.bold(h.padEnd(widths[i])))
      .join("  ");
    console.log(headerLine);
    console.log(widths.map((w) => "-".repeat(w)).join("  "));

    for (const row of data) {
      console.log(
        headers
          .map((h, i) => String(row[h] ?? "").padEnd(widths[i]))
          .join("  ")
      );
    }
  },

  spinner(text: string) {
    return ora(text);
  },

  dim(msg: string) {
    console.log(chalk.dim(msg));
  },

  bold(msg: string) {
    console.log(chalk.bold(msg));
  },

  underline(msg: string) {
    console.log(chalk.underline(msg));
  },
};
