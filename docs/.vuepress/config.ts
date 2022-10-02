import { defaultTheme, defineUserConfig } from 'vuepress'

export default defineUserConfig({
  lang: 'ja-JP',
  title: 'mbs-tech',
  description: 'Tech blog',

  theme: defaultTheme({
    navbar: [
      { text: 'ubuntu', link: '/ubuntu/' },
      { text: '開発環境構築', link: '/develop/' },
    ],
  }),
})
