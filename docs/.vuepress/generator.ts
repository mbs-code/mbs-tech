import { readdirSync, existsSync, statSync } from 'fs'

const root = 'docs'
const ignores = ['.', '_']

const filterIgnore = (name: string) => !ignores.some(ignore => name.startsWith(ignore))
const sanitizePath = (path: string) => path
  .replace(/[0-9]+(_|-|\.)/g, '')
  .replace(/\.md$/, '.html')
const pageSorter = (a: string, b: string) => a.startsWith('index') ? -9999 : a.localeCompare(b)

export const generateExtendsPageOptions = (pageOptions, app) => {
  // 相対パスを生成
  const relative = pageOptions.filePath?.replace(app.dir.source(), '') ?? ''
  const hasDirectory = relative.indexOf('/', 1) >= 0
  const hasPermalink = pageOptions.frontmatter?.permalink

  if (relative && hasDirectory && !hasPermalink) {
    // パーマリンクを生成
    pageOptions.frontmatter = pageOptions.frontmatter ?? {}
    pageOptions.frontmatter.permalink = sanitizePath(relative)
  }
}

/**
 * @example
 * {
 *   '/develop/': [{
 *     text: 'develop',
 *     children: [
 *       '/develop/ppp.html',
 *       '/develop/qqq.html',
 *       '/develop/index.html'
 *     ]}
 *   ]
 * }
 */
export const generateSidebar = () => {
  // ディレクトリ一覧
  const dirs = readdirSync(`./${root}`)
    .filter(name =>
      filterIgnore(name) // 先頭禁則
      && existsSync(`${root}/${name}`) // 存在確認
      && statSync(`${root}/${name}`).isDirectory() // ディレクトリのみ
    )

  // それぞれで子供探索
  const sidebars = dirs.map(name => {
    const dir = `./${root}/${name}`
    const fmtDirName = name.replace(/[0-9]+(_|-|\.)/g, '')

    const files = readdirSync(dir)
      .filter(name =>
        filterIgnore(name) // 先頭禁則
        && existsSync(`${dir}/${name}`) // 存在確認
        && statSync(`${dir}/${name}`).isFile() // ファイルのみ
      )
      .sort(pageSorter)
      .map(name => `/${fmtDirName}/${sanitizePath(name)}`)

    return [
      `/${fmtDirName}/`,
      [{
        text: fmtDirName,
        children: files,
      }],
    ]
  })

  return Object.fromEntries(sidebars)
}