import { defaultTheme, defineUserConfig } from 'vuepress'
import { generateSidebar, generateExtendsPageOptions } from './generator'

generateSidebar()

export default defineUserConfig({
  lang: 'ja-JP',
  title: 'mbs-tech',
  description: 'Tech blog',

  extendsPageOptions: generateExtendsPageOptions,

  theme: defaultTheme({
    contributors: false,
    lastUpdated: true,
    lastUpdatedText: '最終更新日',

    sidebar: generateSidebar(),

    navbar: [
      { text: 'ubuntu', link: '/ubuntu/index' },
      { text: '開発環境構築', link: '/develop/index' },
    ],
  }),
})
