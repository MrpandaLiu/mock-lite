import chalk from 'chalk';

function logger(message: string) {
  console.log(chalk.bold.greenBright('[mlite] ') + message);
}

export default logger;