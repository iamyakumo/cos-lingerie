// 构建后注入：解析 7 个数据文件，生成 JSON-LD ItemList 结构化数据并写入 dist/index.html
// 数据字段全部来自源码（name/en/category/palette，以及将来填入的 keywords），不凭空生成。
import { readFileSync, writeFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const dataFiles = [
  'src/data/products.ts',
  'src/data/feimu-products.ts',
  'src/data/malymoon-products.ts',
  'src/data/kiyovi-products.ts',
  'src/data/waimeng-products.ts',
  'src/data/detishe-products.ts',
]

function imagePath(id) {
  if (id.startsWith('w')) return `/views/wuwuwushan/${id}.webp`
  if (id.startsWith('f')) return `/views/feimu/${id}.webp`
  if (id.startsWith('m')) return `/views/malymoon/${id}.webp`
  if (id.startsWith('k')) return `/views/kiyovi/${id}.webp`
  if (id.startsWith('y')) return `/views/waimeng/${id}.webp`
  if (id.startsWith('d')) return `/views/detishe/${id}.webp`
  return `/views/${id}.webp`
}

function field(block, name) {
  const m = block.match(new RegExp(`${name}:\\s*['"]([^'"]*)['"]`))
  return m ? m[1] : ''
}

const products = []
for (const file of dataFiles) {
  const text = readFileSync(join(root, file), 'utf8')
  for (const m of text.matchAll(/\{[^{}]*\}/gs)) {
    const block = m[0]
    if (!block.includes('category:') || !block.includes('source:')) continue // 排除 hero 等非商品对象
    const id = field(block, 'id')
    if (!id) continue
    const kw = block.match(/keywords:\s*\[([^\]]*)\]/)
    const keywords = kw
      ? [...kw[1].matchAll(/['"]([^'"]+)['"]/g)].map(x => x[1]).filter(Boolean)
      : []
    products.push({
      id,
      name: field(block, 'name'),
      en: field(block, 'en'),
      category: field(block, 'category'),
      palette: field(block, 'palette'),
      keywords,
    })
  }
}

if (products.length !== 298) {
  console.warn(`[inject-geo] 警告：解析到 ${products.length} 条商品（预期 298）`)
}

const BASE = 'https://cos-lingerie.pages.dev'
const listItems = products.map((p, i) => {
  const item = {
    '@type': 'Product',
    name: p.name,
    alternateName: p.en,
    category: p.category,
    color: p.palette,
    image: [`${BASE}${imagePath(p.id)}`],
    url: `${BASE}/#shop=all`,
  }
  if (p.keywords.length) item.keywords = p.keywords.join('，')
  return { '@type': 'ListItem', position: i + 1, item }
})

const jsonld = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: '衣橱四视图档案 · 全部收录',
  description: '七店 298 款服装四视角档案：无人物纯白底，前后左右四等宽面板呈现穿着立体形态。',
  numberOfItems: products.length,
  itemListElement: listItems,
}

const htmlFile = join(root, 'dist/index.html')
const html = readFileSync(htmlFile, 'utf8')
const START = '<!-- GEO-JSONLD:START -->'
const END = '<!-- GEO-JSONLD:END -->'
const snippet = `${START}\n    <script type="application/ld+json">\n${JSON.stringify(jsonld)}\n    </script>\n    ${END}`
const next = html.includes(START)
  ? html.replace(new RegExp(`${START}[\\s\\S]*?${END}`), snippet)
  : html.replace('</head>', `    ${snippet}\n  </head>`)
writeFileSync(htmlFile, next)
console.log(`[inject-geo] JSON-LD 已注入 dist/index.html（${products.length} 条，含关键词 ${products.filter(p => p.keywords.length).length} 条）`)
