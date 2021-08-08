import chalk from 'chalk';

function logger(message: string) {
  console.log(chalk.bold.greenBright('[mlite] ') + message);
}

function error(message: string) {
  console.log(chalk.bold.red('[mlite] ') + message);
}

export default {
  logger,
  error
};