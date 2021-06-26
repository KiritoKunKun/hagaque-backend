module.exports = {
	presets: [
		['@babel/preset-env', { targets: { node: 'current' } }],
		'@babel/preset-typescript',
	],
	plugins: [
		[
			'module-resolver',
			{
				alias: {
					'@config': './src/config',
					'@controllers': './src/controllers',
					'@database': './src/database',
					'@errors': './src/errors',
					'@middlewares': './src/middlewares',
					'@repositories': './src/repositories',
					'@routes': './src/routes',
					'@services': './src/services',
					'@shared': './src/shared',
				},
			},
		],
		'babel-plugin-transform-typescript-metadata',
		['@babel/plugin-proposal-decorators', { legacy: true }],
		['@babel/plugin-proposal-class-properties', { loose: true }],
	],
};
