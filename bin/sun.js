#!/usr/bin/env node

const pkg = require('../package.json');
console.info('-----test')

const commander = require('commander');

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
	.action(() => {
		require('../command/init')()
	})

// 解析
commander.parse(process.argv);
