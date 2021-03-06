import webpack from 'webpack'
import config from './webpack.config'

const { plugins, output } = config

export default { ...config,
  devtool: 'eval',
  plugins: [ ...plugins.slice(0, -1), new webpack.HotModuleReplacementPlugin() ],
  output: { ...output, path: '/' }
}
