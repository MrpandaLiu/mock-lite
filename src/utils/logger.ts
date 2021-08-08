import chalk from 'chalk';

function logger(message: string): void {
  console.log(chalk.bold.greenBright('[mlite] ') + message);
}

function error(message: string): void {
  console.log(chalk.bold.red('[mlite] ') + message);
}

export default {
  logger,
  error
};