import { useEffect, useMemo, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, Check, Copy, Download, Search, X } from 'lucide-react'
import { products, shops, type Product, type ProductCategory, type ProductStatus, type ShopId } from '@/data/products'
import {
  CATEGORY_I18N,
  COLORS,
  PRODUCT_EN,
  PRODUCT_JP,
  SHOPS_I18N,
  TITLE_I18N,
  UI,
  translateSales,
  type Lang,
} from '@/data/i18n'

const VIEW_CODES = ['ALL', 'FRONT', 'BACK', 'LEFT', 'RIGHT'] as const
const VIEW_KEYS = ['all', 'front', 'back', 'left', 'right'] as const
type ViewKey = (typeof VIEW_KEYS)[number]
type StatusFilter = 'all' | ProductStatus
type CategoryFilter = '全部' | ProductCategory
type Scope = ShopId | 'all'

const PAGE_SIZE = 30

const positions: Record<Exclude<ViewKey, 'all'>, string> = {
  front: '0%', back: '33.333333%', left: '66.666667%', right: '100%',
}

const ALL_SCOPE = {
  id: 'all' as Scope,
  name: '全部',
  mark: '全',
  collection: 'ALL COLLECTIONS',
  description: '',
}

function imagePath(id: string) {
  if (id.startsWith('w')) return `/views/wuwuwushan/${id}.webp`
  if (id.startsWith('f')) return `/views/feimu/${id}.webp`
  if (id.startsWith('m')) return `/views/malymoon/${id}.webp`
  if (id.startsWith('k')) return `/views/kiyovi/${id}.webp`
  if (id.startsWith('y')) return `/views/waimeng/${id}.webp`
  if (id.startsWith('d')) return `/views/detishe/${id}.webp`
  return `/views/${id}.webp`
}

function productNumber(id: string) {
  return id.match(/\d+/)?.[0] ?? '01'
}

function shopMark(id: ShopId) {
  return shops.find(item => item.id === id)?.mark ?? id
}

function parseHash(): { scope: Scope; page: number; look: string | null } {
  const hash = window.location.hash
  if (hash.startsWith('#shop=')) {
    const params = new URLSearchParams(hash.slice(1))
    const raw = params.get('shop') ?? 'all'
    const scope: Scope = raw === 'all' || shops.some(item => item.id === raw) ? (raw as Scope) : 'all'
    const page = Math.max(1, Number.parseInt(params.get('page') ?? '1', 10) || 1)
    return { scope, page, look: params.get('look') }
  }
  if (hash.startsWith('#look-')) {
    const id = hash.replace('#look-', '')
    const product = products.find(item => item.shop === 'qilesan' && item.id === id)
    if (product) return { scope: 'qilesan' as const, page: 1, look: product.id }
  }
  return { scope: 'all' as const, page: 1, look: null }
}

function buildHash(scope: Scope, page: number, look: string | null) {
  if (scope === 'all') {
    const pagePart = page > 1 ? `&page=${page}` : ''
    return `#shop=all${pagePart}${look ? `&look=${look}` : ''}`
  }
  if (scope === 'qilesan') return look ? `#look-${look}` : '#shop=qilesan'
  return `#shop=${scope}${look ? `&look=${look}` : ''}`
}

function App() {
  const [initial] = useState(parseHash)
  const [lang, setLang] = useState<Lang>(() => {
    const saved = window.localStorage.getItem('cb-lang')
    return saved === 'en' || saved === 'jp' ? saved : 'cn'
  })
  const [scope, setScope] = useState<Scope>(initial.scope)
  const [page, setPage] = useState(initial.page)
  const [selectedId, setSelectedId] = useState<string | null>(initial.look)
  const [zoomed, setZoomed] = useState(Boolean(initial.look))
  const [view, setView] = useState<ViewKey>('all')
  const [status, setStatus] = useState<StatusFilter>('all')
  const [category, setCategory] = useState<CategoryFilter>('全部')
  const [query, setQuery] = useState('')
  const [copied, setCopied] = useState(false)
  const archiveRef = useRef<HTMLElement>(null)
  const skipPageReset = useRef(true)

  const t = UI[lang]
  const ts = (key: string) => (t[key] as string) ?? key
  const tlist = (key: string) => (t[key] as string[]) ?? []
  const i18nTable = lang === 'en' ? PRODUCT_EN : lang === 'jp' ? PRODUCT_JP : null
  const i18nKey = lang === 'en' ? 'en' : 'jp'

  const dispName = (p: Product) => (lang === 'cn' ? p.name : (i18nTable?.[p.id]?.name ?? p.name))
  const dispDetail = (p: Product) => (lang === 'cn' ? p.detail : (i18nTable?.[p.id]?.detail ?? p.detail))
  const dispCat = (c: string) => (lang === 'cn' ? c : (CATEGORY_I18N[c]?.[i18nKey] ?? c))
  const dispPalette = (s: string) =>
    lang === 'cn'
      ? s
      : s
          .split(' / ')
          .map(c => COLORS[c.trim()]?.[i18nKey] ?? c)
          .join(' / ')
  const dispSales = (s: string) => translateSales(s, lang)
  const fmt = (tpl: string, vars: Record<string, string | number>) =>
    tpl.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? ''))

  const shopMeta = scope === 'all' ? ALL_SCOPE : shops.find(item => item.id === scope)!
  const shopI18n = scope === 'all' ? undefined : SHOPS_I18N[scope]
  const shopPinyin = shopI18n?.pinyin ?? ''
  const shopCollection =
    scope === 'all'
      ? ts('all_collection')
      : lang === 'cn'
        ? shopMeta.collection
        : (shopI18n?.[lang].collection ?? shopMeta.collection)
  const shopDescription =
    scope === 'all'
      ? ts('all_description')
      : lang === 'cn'
        ? shopMeta.description
        : (shopI18n?.[lang].description ?? shopMeta.description)

  const scopeProducts = useMemo(
    () => (scope === 'all' ? products : products.filter(product => product.shop === scope)),
    [scope],
  )

  const filtered = useMemo(() => scopeProducts.filter(product => {
    const statusMatch = status === 'all' || product.status === status
    const categoryMatch = category === '全部' || product.category === category
    const keyword = query.trim().toLowerCase()
    const haystack = (
      `${product.name}${product.en}${product.detail}${product.palette}` +
      `${dispName(product)}${dispDetail(product)}${dispPalette(product.palette)}${(product.keywords ?? []).join(' ')}`
    ).toLowerCase()
    const queryMatch = !keyword || haystack.includes(keyword)
    return statusMatch && categoryMatch && queryMatch
  }), [scopeProducts, status, category, query, lang])

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const safePage = Math.min(page, pageCount)
  const pageItems = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE)

  const selected = selectedId ? filtered.find(product => product.id === selectedId) : undefined
  const selectedIndex = selected ? filtered.findIndex(product => product.id === selected.id) : -1
  const productLink = selected
    ? `${window.location.origin}${window.location.pathname}${window.location.search}${buildHash(scope, safePage, selected.id)}`
    : ''

  useEffect(() => {
    document.title = ts('doc_title')
    document.documentElement.lang = lang === 'cn' ? 'zh-CN' : lang === 'en' ? 'en' : 'ja'
    window.localStorage.setItem('cb-lang', lang)
  }, [lang])

  useEffect(() => {
    if (skipPageReset.current) { skipPageReset.current = false; return }
    setPage(1)
  }, [scope, status, category, query, lang])

  useEffect(() => {
    const look = zoomed && selected ? selected.id : null
    window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}${buildHash(scope, safePage, look)}`)
  }, [scope, safePage, zoomed, selected])

  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash
      if (!hash.startsWith('#shop=') && !hash.startsWith('#look-')) return
      const next = parseHash()
      setScope(next.scope)
      setPage(next.page)
      setSelectedId(next.look)
      setZoomed(Boolean(next.look))
      setView('all')
      setStatus('all')
      setCategory('全部')
      setQuery('')
      setCopied(false)
    }
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setZoomed(false)
      if ((event.target as HTMLElement)?.matches('input, textarea')) return
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        if (!zoomed || !filtered.length) return
        event.preventDefault()
        const current = Math.max(0, selectedIndex)
        const next = event.key === 'ArrowRight'
          ? (current + 1) % filtered.length
          : (current - 1 + filtered.length) % filtered.length
        setSelectedId(filtered[next].id)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [filtered, selectedIndex, zoomed])

  useEffect(() => {
    document.body.style.overflow = zoomed ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [zoomed])

  const move = (direction: number) => {
    if (!filtered.length) return
    const current = Math.max(0, selectedIndex)
    setSelectedId(filtered[(current + direction + filtered.length) % filtered.length].id)
  }

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(productLink)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      const input = document.createElement('input')
      input.value = productLink
      document.body.appendChild(input)
      input.select()
      document.execCommand('copy')
      input.remove()
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    }
  }

  const clearFilters = () => {
    setStatus('all')
    setCategory('全部')
    setQuery('')
  }

  const switchScope = (nextScope: Scope) => {
    if (nextScope === scope) return
    setScope(nextScope)
    setPage(1)
    setSelectedId(null)
    setZoomed(false)
    setView('all')
    setCopied(false)
    clearFilters()
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const openLook = (id: string) => {
    setSelectedId(id)
    setView('all')
    setCopied(false)
    setZoomed(true)
  }

  const goPage = (next: number) => {
    setPage(Math.min(pageCount, Math.max(1, next)))
    archiveRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const statusLabel = (value: ProductStatus) => (value === 'current' ? ts('status_current') : ts('status_history'))

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#top" aria-label={ts('back_top')}>
          <span className="brand-mark">{shopMeta.mark}</span>
          <span className="brand-copy">
            <strong>{shopMeta.name}</strong>
            <small>{shopPinyin ? `${shopPinyin} · WARDROBE ARCHIVE` : 'WARDROBE ARCHIVE'}</small>
          </span>
        </a>
        <nav className="shop-switch" aria-label="Shops">
          <button className={scope === 'all' ? 'active' : ''} onClick={() => switchScope('all')} aria-pressed={scope === 'all'}>
            <span>{ts('all_shops')}</span><small>{products.length}</small>
          </button>
          {shops.map(item => (
            <button key={item.id} className={scope === item.id ? 'active' : ''} onClick={() => switchScope(item.id)} aria-pressed={scope === item.id}>
              <span>{item.name}</span>
              <small>{SHOPS_I18N[item.id]?.pinyin ? `${SHOPS_I18N[item.id].pinyin} · ` : ''}{products.filter(product => product.shop === item.id).length}</small>
            </button>
          ))}
        </nav>
        <div className="header-right">
          <div className="lang-switch" role="group" aria-label="Language">
            {(['cn', 'en', 'jp'] as const).map(code => (
              <button
                key={code}
                type="button"
                className={lang === code ? 'active' : ''}
                aria-pressed={lang === code}
                onClick={() => setLang(code)}
              >
                {code.toUpperCase()}
              </button>
            ))}
          </div>
          <a className="header-count" href="#archive"><span>{shopCollection}</span><strong>{scopeProducts.length} {ts('looks')}</strong></a>
        </div>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-copy">
            <p className="eyebrow"><span /> {ts('hero_eyebrow')}</p>
            <h1 id="hero-title">{TITLE_I18N[lang]}</h1>
            <p className="hero-intro">{shopDescription}</p>
          </div>
          <div className="hero-stats" aria-label="Collection stats">
            <div><strong>{scopeProducts.length}</strong><span>{ts('stat_styles')}</span></div>
            <div><strong>{scopeProducts.length * 4}</strong><span>{ts('stat_views')}</span></div>
            <div><strong>{String(scopeProducts.filter(product => product.status === 'history').length).padStart(2, '0')}</strong><span>{ts('stat_archived')}</span></div>
          </div>
        </section>

        <section className="archive" id="archive" ref={archiveRef} aria-labelledby="archive-title">
          <div className="archive-heading">
            <div>
              <p className="section-index">{ts('archive_kicker')}</p>
              <h2 id="archive-title">
                {scope === 'all' ? ts('archive_all') : `${shopMeta.name}${ts('archive_suffix')}`}
                {shopPinyin && <small className="title-pinyin"> {shopPinyin}</small>}
              </h2>
            </div>
            <p>{ts('archive_note')}</p>
          </div>

          <div className="filter-bar">
            <label className="search-field">
              <Search size={17} aria-hidden="true" />
              <input value={query} onChange={e => setQuery(e.target.value)} placeholder={ts('search_placeholder')} aria-label={ts('search_placeholder')} />
              {query && <button onClick={() => setQuery('')} aria-label={ts('empty_btn')}><X size={16} /></button>}
            </label>
            <div className="filter-group" aria-label="Status">
              {([['all', ts('status_all')], ['current', ts('status_current')], ['history', ts('status_history')]] as const).map(([key, label]) => (
                <button key={key} className={status === key ? 'active' : ''} onClick={() => setStatus(key as StatusFilter)}>{label}</button>
              ))}
            </div>
            <label className="category-select">{ts('category_label')}
              <select value={category} onChange={e => setCategory(e.target.value as CategoryFilter)} aria-label={ts('category_label')}>
                {(['全部', '套装', '连衣裙', '睡裙', '连体衣', '泳衣'] as const).map(item => (
                  <option key={item} value={item}>{item === '全部' ? ts('status_all') : dispCat(item)}</option>
                ))}
              </select>
            </label>
          </div>

          {pageItems.length ? (
            <div className="wardrobe-grid">
              {pageItems.map(product => (
                <button key={product.id} className="look-card" onClick={() => openLook(product.id)} aria-label={fmt(ts('aria_view'), { name: dispName(product) })}>
                  <span className="look-card-image"><img src={imagePath(product.id)} alt={fmt(ts('alt_four'), { name: dispName(product) })} loading="lazy" /></span>
                  <span className="look-card-caption">
                    <span className="look-card-number">LOOK / {productNumber(product.id)}</span>
                    <span className="look-card-name">{dispName(product)}</span>
                    {scope === 'all' && <span className="look-card-shop">{shopMark(product.shop)}</span>}
                    <i className={product.status === 'current' ? 'dot current' : 'dot'} title={statusLabel(product.status)} />
                  </span>
                </button>
              ))}
            </div>
          ) : (
            <div className="empty-state"><p>{ts('empty_title')}</p><button onClick={clearFilters}>{ts('empty_btn')}</button></div>
          )}

          <div className="pager" aria-label="Pages">
            <button onClick={() => goPage(safePage - 1)} disabled={safePage <= 1}><ArrowLeft size={15} />{ts('pager_prev')}</button>
            <span>{fmt(ts('pager_info'), { page: String(safePage).padStart(2, '0'), pages: String(pageCount).padStart(2, '0'), items: pageItems.length, total: filtered.length })}</span>
            <button onClick={() => goPage(safePage + 1)} disabled={safePage >= pageCount}>{ts('pager_next')}<ArrowRight size={15} /></button>
          </div>
        </section>

        <section className="notes" id="notes" aria-labelledby="notes-title">
          <p className="section-index">{ts('notes_kicker')}</p>
          <div className="notes-grid">
            <h2 id="notes-title">{ts('notes_h2a')}<br />{ts('notes_h2b')}</h2>
            <div className="note-item"><span>01</span><h3>{ts('note1_t')}</h3><p>{ts('note1_p')}</p></div>
            <div className="note-item"><span>02</span><h3>{ts('note2_t')}</h3><p>{ts('note2_p')}</p></div>
            <div className="note-item"><span>03</span><h3>{ts('note3_t')}</h3><p>{ts('note3_p')}</p></div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div><span className="brand-mark">{shopMeta.mark}</span><strong>{shopMeta.name} · {ts('footer_suffix')}</strong></div>
        <p>{shopCollection} / NOVEMBER 2026</p>
        <a href="#top">{ts('back_top')}</a>
      </footer>

      {zoomed && selected && (
        <div className="zoom-modal look-modal" role="dialog" aria-modal="true" aria-label={dispName(selected)} onClick={() => setZoomed(false)}>
          <button className="zoom-close" onClick={() => setZoomed(false)} aria-label={ts('close')}><X size={24} /></button>
          <div className="zoom-heading">
            <span>{ts('modal_look')}{productNumber(selected.id)}</span>
            <strong>{dispName(selected)}</strong>
            <em>{selected.en}</em>
            <i className={selected.status === 'current' ? 'current' : ''}>{statusLabel(selected.status)}</i>
          </div>

          <div className="modal-shell" onClick={e => e.stopPropagation()}>
            <div className="modal-toolbar" aria-label="Views">
              <div className="view-tabs">
                {VIEW_KEYS.map((key, index) => (
                  <button key={key} className={view === key ? 'active' : ''} onClick={() => setView(key)} aria-pressed={view === key}>
                    <span>{tlist('view_labels')[index] ?? key}</span><small>{VIEW_CODES[index]}</small>
                  </button>
                ))}
              </div>
            </div>

            <div className="modal-stage">
              {view === 'all'
                ? <img src={imagePath(selected.id)} alt={fmt(ts('alt_four'), { name: dispName(selected) })} />
                : <span className="cropped-garment" style={{ backgroundImage: `url(${imagePath(selected.id)})`, backgroundPosition: positions[view] }} />}
            </div>

            <div className="modal-bar">
              <button onClick={() => move(-1)}><ArrowLeft size={15} />{ts('prev_look')}</button>
              <span className="modal-count">{String(Math.max(1, selectedIndex + 1)).padStart(2, '0')} / {String(filtered.length).padStart(2, '0')}</span>
              <button onClick={() => move(1)}>{ts('next_look')}<ArrowRight size={15} /></button>
              <a href={imagePath(selected.id)} download={`${selected.id}-${ts('download_name')}.webp`}><Download size={15} />{ts('download')}</a>
              <button onClick={copyLink}>{copied ? <Check size={15} /> : <Copy size={15} />}{copied ? ts('copied') : ts('copy')}</button>
            </div>

            <div className="modal-meta">
              <p>{dispDetail(selected)}</p>
              <div className="modal-meta-line">
                <span>{ts('palette_label')} · {dispPalette(selected.palette)}</span>
                <span>{ts('category_meta_label')} · {dispCat(selected.category)}</span>
                <span>{ts('sales_label')} · {dispSales(selected.sales)}</span>
              </div>
              {selected.keywords && selected.keywords.length > 0 && (
                <div className="modal-keywords" aria-label={ts('keywords_label')}>
                  {selected.keywords.map(keyword => <span key={keyword}>{keyword}</span>)}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
