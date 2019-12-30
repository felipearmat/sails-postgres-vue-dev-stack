var _presets = process.env.NODE_ENV !== 'test' ? ['@vue/app'] : ['@vue/cli-plugin-babel/preset']

module.exports = {
  presets: _presets
}
