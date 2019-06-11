#!/usr/bin/env node

// 命令交互
const commander = require('commander');
const inquirer = require('inquirer');
// 颜色
const chalk = require('chalk');

// shell脚本拉取远端内容
const shell = require('shelljs');

const pkg = require('../package.json');

createApp ();

function createApp() {
	const currentNodeVersion = process.version;
	const semver = currentNodeVersion.split('.');
	const major = semver[0];

	if (major < 8) {
		console.error(
			'You are running Node' +
			chalk.green(currentNodeVersion)+
			'.\n'+
			'Create App Requires Node 8 or Higher ./n'+
			'Please update your version of Node'
		)
		process.exit(0)
	}
	console.info(chalk.green('createApp'))
}

const initAction = () => {
	inquirer.prompt([{
		type: 'input',
		message: '请输入项目名称',
		name: 'name'
	}]).then(answers => {
		if (!answers.name) {
			console.log(chalk.red('项目名称不能为空哦！！！'));
			process.exit(0)
		}
		console.log('正在拷贝项目，请稍等...');
		const remote = 'https://github.com/xiaosunJessica/node-koa.git';
		const curName = 'node-koa';
		const target = answers.name;

		shell.exec(`
			cd ${curName}
			git clone ${remote} --depth=1
			mv ${curName} ${target}
			rm -rf ./${target}/.git
			cd ${target}/client && npm i
			cd ${target}/server && npm i
		`, (error, stdout, stderr) => {
			if (error) {
				console.error(`exec error: ${chalk.red(error)}`)
			}
			console.log(chalk.cyan(stdout))
			console.log(chalk.cyan(stderr))
		})
	})
}


// 注册版本号与描述
commander
	.version(pkg.version)
	.description('A first template cli tool')

// 注册参数
commander
	.option('-p, --peppers', 'Add peppers')
	.option('-P, --pineapple', 'Add pineapple')
	.option('-b, --bbq-sauce', 'Add bbq sauce')
	.option('-c, --cheese [type]', 'Add the specified type of cheese [marble]', 'marble')

// 注册子命令
commander
	.command('rm <dir>')
	.option('-r, --recursive', 'Remove recursively')
	.action((dir, cmd) => {
		console.log('remove' + dir + (cmd.recursive ? 'recursively' : ''))
	})

commander
	.command('init')
	.description('Generate a new project')
	.alias('i')
	.action(initAction)

// 解析
commander.parse(process.argv);
