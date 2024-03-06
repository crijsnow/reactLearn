// tailwind.config.js
module.exports = {
  mode: 'jit',//即时编译模式
  purge: [//将其中未使用的样式从最终生成的 CSS 文件中删除。这个配置主要用于优化代码，减小文件大小。
    './src/**/*.{vue,js,ts,jsx,tsx}',
    './public/index.html'
  ],
  darkMode: false, // or 'media' or 'class'深色模式
  theme: {//主题模式，可以在这里修改字体、颜色、边距等主题相关的样式。
    extend: {},
  },
  variants: {//变体配置，可以在这里设置样式在不同状态下的变化，比如悬停状态、焦点状态等。
    extend: {},
  },
  plugins: [],//插件配置
}