# -*- coding: utf-8 -*-
"""Generate src/data/i18n.ts from products data + translation tables in /tmp/tr."""
import os, json, re, sys

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), 'i18n-data'))
from details_data import DETAILS
from names_data import NAMES
from heads_data import HEADS

DATA_FILES = [
    'src/data/products.ts', 'src/data/feimu-products.ts', 'src/data/malymoon-products.ts',
    'src/data/kiyovi-products.ts', 'src/data/waimeng-products.ts', 'src/data/detishe-products.ts',
]

def parse_products():
    out = []
    for f in DATA_FILES:
        text = open(f).read()
        for block in text.split('{ id: ')[1:]:
            block = '{ id: ' + block
            block = block[:block.find('},')]
            if 'category:' not in block:
                continue
            def fld(name):
                m = re.search(name + r":\s*['\"]([^'\"]*)['\"]", block)
                return m.group(1) if m else ''
            out.append({'id': fld('id'), 'name': fld('name'), 'detail': fld('detail'),
                        'palette': fld('palette'), 'sales': fld('sales')})
    return [p for p in out if p['id'] != 'qilesan']

prods = parse_products()
assert len(prods) == 298, len(prods)

# ---------- detail translation ----------
DETAIL_MAP = {cn: (en, jp) for cn, en, jp in DETAILS}
TMPL_SUFFIX = '套装配件以四视图呈现为准 · 未展示角度为 AI 推定'
TMPL_EN = ' · Four views presented as-is; accessories per product photos · Unshown angles AI-inferred'
TMPL_JP = '・四ビュー準拠・小物は商品写真通り・未掲載角度はAI推定'

def translate_detail(d):
    if d in DETAIL_MAP:
        return DETAIL_MAP[d]
    if d.endswith(TMPL_SUFFIX):
        head = d[:-len(TMPL_SUFFIX)].rstrip(' ·')
        assert head in HEADS, 'head missing: ' + head
        return (HEADS[head][0] + TMPL_EN, HEADS[head][1] + TMPL_JP)
    raise AssertionError('untranslated detail: ' + d[:60])

PROD_EN, PROD_JP = {}, {}
for p in prods:
    assert p['id'] in NAMES, 'name missing: ' + p['id']
    en_name, jp_name = NAMES[p['id']]
    en_det, jp_det = translate_detail(p['detail'])
    PROD_EN[p['id']] = {'name': en_name, 'detail': en_det}
    PROD_JP[p['id']] = {'name': jp_name, 'detail': jp_det}

# ---------- palette color coverage ----------
COLORS = {
    '黑': ('Black', '黒'), '白': ('White', '白'), '灰': ('Grey', 'グレー'),
    '浅灰': ('Light grey', 'ライトグレー'), '深蓝': ('Navy', 'ネイビー'),
    '蓝': ('Blue', 'ブルー'), '浅蓝': ('Light blue', 'ライトブルー'),
    '青': ('Teal', '青'), '绿': ('Green', '緑'), '红': ('Red', '赤'),
    '暗红': ('Dark red', 'ダークレッド'), '玫红': ('Rose', 'ローズ'),
    '粉红': ('Pink', 'ピンク'), '暗粉': ('Dusty pink', 'くすみピンク'),
    '紫': ('Purple', '紫'), '黄': ('Yellow', 'イエロー'), '金': ('Gold', 'ゴールド'),
    '棕': ('Brown', 'ブラウン'), '驼': ('Camel', 'キャメル'),
    '米': ('Beige', 'ベージュ'), '雾白': ('Mist white', '霧白'),
    '奶白': ('Cream', 'クリーム'), '珍珠白': ('Pearl white', 'パールホワイト'),
    '象牙白': ('Ivory', 'アイボリー'), '青瓷': ('Celadon', '青瓷'),
    '酒红': ('Wine red', 'ワインレッド'), '朱红': ('Vermilion', '朱紅'),
    '正红': ('True red', '正紅'), '玫粉': ('Rose pink', 'ローズピンク'),
    '浅粉': ('Light pink', 'ライトピンク'), '粉白': ('Pink-white', 'ピンク×ホワイト'),
    '冰蓝': ('Ice blue', 'アイスブルー'), '宝蓝': ('Royal blue', 'ロイヤルブルー'),
    '薰衣草紫': ('Lavender', 'ラベンダー'), '荧光绿': ('Neon green', 'ネオングリーン'),
    '古金': ('Antique gold', 'アンティークゴールド'), '奶蓝': ('Milk blue', 'ミルクブルー'),
    '天蓝': ('Sky blue', 'スカイブルー'), '碎花': ('Floral print', '小花柄'),
    '官图色': ('Official-image colors', '公式画像カラー'),
    '深紫': ('Deep purple', 'ディープパープル'), '蓝灰': ('Blue-grey', 'ブルーグレー'),
    '银': ('Silver', 'シルバー'), '官方参考图配色': ('Official reference colors', '公式参考画像カラー'),
    '薄荷绿': ('Mint green', 'ミントグリーン'), '彩虹渐变': ('Rainbow gradient', 'レインボーグラデーション'),
    '裸粉': ('Nude pink', 'ヌードピンク'), '淡青': ('Pale cyan', '淡い青'),
    '灰蓝': ('Grey-blue', 'グレイッシュブルー'), '白纱': ('White gauze', '白ガーゼ'),
    '青蓝': ('Teal blue', '青みブルー'), '暗紫': ('Dark purple', 'ダークパープル'),
    '大红': ('Bright red', '大紅'), '亮黑': ('Glossy black', 'つややかな黒'),
    '银灰': ('Silver grey', 'シルバーグレー'), '浅绿': ('Light green', 'ライトグリーン'),
    '品红': ('Magenta', 'マゼンタ'), '浅黄': ('Light yellow', 'ライトイエロー'),
    '藏青': ('Dark navy', '濃紺'), '粉': ('Pink', 'ピンク'),
    '蓝黑': ('Blue-black', 'ブルーブラック'),
}
missing_colors = set()
for p in prods:
    for c in p['palette'].split(' / '):
        c = c.strip()
        if c and c not in COLORS:
            missing_colors.add(c)
assert not missing_colors, missing_colors

# ---------- emit TS ----------
def ts_str(s):
    return json.dumps(s, ensure_ascii=False)

SHOPS_I18N = {
 'qilesan': {
   'pinyin': 'Qile Ge San',
   'en': {'mark': 'GARMENT STUDY · 2026.11', 'collection': 'Costume Archive',
          'description': 'An original-design shop focused on sets, dresses and bodysuits. Pieces are archived in four clean panels on a plain background.'},
   'jp': {'mark': 'GARMENT STUDY · 2026.11', 'collection': '衣装アーカイブ',
          'description': 'セット、ワンピース、ボディスーツを中心に扱うオリジナルデザインの店。白背景に前後左右の4パネルでアーカイブ。'},
 },
 'wuwuwushan': {
   'pinyin': 'Wuwuwushan',
   'en': {'mark': 'GARMENT STUDY · 2026.11', 'collection': 'Cos Archive',
          'description': 'Game and anime fan-costume recreations: qipao, gowns, combat suits and bunnysuits, archived in four clean panels.'},
   'jp': {'mark': 'GARMENT STUDY · 2026.11', 'collection': 'コスアーカイブ',
          'description': 'ゲーム・アニメの同人コス再現。チャイナドレス、ドレス、戦闘服、バニースーツを前後左右の4パネルでアーカイブ。'},
 },
 'feimu': {
   'pinyin': 'Feimu Qijiandian',
   'en': {'mark': 'GARMENT STUDY · 2026.11', 'collection': 'Lingerie Archive',
          'description': 'Everyday-ready bodysuits and matching lounge sets. The archive keeps only the garment itself in four clean panels.'},
   'jp': {'mark': 'GARMENT STUDY · 2026.11', 'collection': 'ランジェリーアーカイブ',
          'description': '日常使いしやすいボディスーツと揃いのルームウェア。衣装のみを前後左右の4パネルで記録。'},
 },
 'malymoon': {
   'pinyin': '',
   'en': {'mark': 'GARMENT STUDY · 2026.11', 'collection': 'Cosplay Archive',
          'description': 'In-house designed cosplay series, archived in four clean panels for color, structure, seam lines, and hem shape.'},
   'jp': {'mark': 'GARMENT STUDY · 2026.11', 'collection': 'コスプレアーカイブ',
          'description': 'オリジナルのコスプレシリーズ。色味、構造、縫い目、裾の形を前後左右の4パネルで記録。'},
 },
 'kiyovi': {
   'pinyin': '',
   'en': {'mark': 'GARMENT STUDY · 2026.11', 'collection': 'Cosplay Archive',
          'description': 'Fan-made cosplay from games and anime, restored as clean garment studies in four panels.'},
   'jp': {'mark': 'GARMENT STUDY · 2026.11', 'collection': 'コスプレアーカイブ',
          'description': 'ゲームやアニメの同人コスプレ。衣装そのものを前後左右の4パネルで整理して記録。'},
 },
 'waimeng': {
   'pinyin': 'Waimengshe',
   'en': {'mark': 'GARMENT STUDY · 2026.11', 'collection': 'Cosplay Archive',
          'description': 'A Taobao cosplay shop covering original designs, game and anime fan costumes, and licensed collaborations.'},
   'jp': {'mark': 'GARMENT STUDY · 2026.11', 'collection': 'コスアーカイブ',
          'description': 'オリジナル、ゲーム・アニメの同人コス、ライセンスコラボまで幅広く扱う淘宝のコスプレ店。'},
 },
 'detishe': {
   'pinyin': 'Detishe',
   'en': {'mark': 'GARMENT STUDY · 2026.11', 'collection': 'Swim & Sport Archive',
          'description': 'Original swimwear and sports bodysuits, cataloged in front, back, and side views with no figure inside.'},
   'jp': {'mark': 'GARMENT STUDY · 2026.11', 'collection': '水着＆スポーツアーカイブ',
          'description': 'オリジナルの競泳水着とスポーツボディスーツ。人物なしで前後横のパネルに整理。'},
 },
}

UI = {
 'cn': {'all_shops': '全部',
   'all_collection': 'ALL COLLECTIONS',
   'all_description': '七家店全部收录档案。套装、连衣裙、连体衣与睡裙，统一以前、后、左、右四个方向，呈现穿着时的立体形态。按店铺顺序陈列，新增款式顺延在所属店铺之后。',
   'archive_kicker': '01 / THE COLLECTION', 'archive_all': '全部衣橱', 'archive_suffix': '衣橱',
   'archive_note': '宫格顺序浏览，每页 30 款。点击任意款式，打开四视角详情。',
   'search_placeholder': '搜索款式、颜色或细节',
   'status_all': '全部', 'status_current': '公开在售', 'status_history': '历史收录',
   'category_label': '品类',
   'empty_title': '没有找到相符款式', 'empty_btn': '清除筛选',
   'pager_prev': '上一页', 'pager_next': '下一页',
   'pager_info': '第 {page} / {pages} 页 · 本页 {items} 款 / 共 {total} 款',
   'notes_kicker': '02 / COLLECTION NOTES',
   'notes_h2a': '只记录衣服，', 'notes_h2b': '不记录穿着者。',
   'note1_t': '完整套装', 'note1_p': '以套装、衣服和裙子为主；原搭配中的袜子与内裤一并呈现，不收录其单品。',
   'note2_t': '四个方向', 'note2_p': '每款统一前、后、左、右顺序，相同比例与白底光线，便于比较轮廓和细节。',
   'note3_t': '按店归档', 'note3_p': '以店铺为序陈列，新增款式顺延在所属店铺之后；信息来自淘宝公开商品页及公开历史收录。',
   'footer_suffix': '衣橱档案', 'back_top': '回到顶部 ↑',
   'stat_styles': '收录款式', 'stat_views': '独立视角', 'stat_archived': '历史收录',
   'hero_eyebrow': 'GARMENT STUDY · 2026.11',
   'hero_oss': '开源 · GitHub ↗',
   'view_labels': ['四视图', '前', '后', '左', '右'],
   'aria_view': '查看{name}四视角', 'alt_four': '{name}前后左右四视图',
   'modal_look': 'LOOK / ',
   'prev_look': '上一款', 'next_look': '下一款',
   'download': '下载四视图', 'download_name': '四视图',
   'copy': '复制款式链接', 'copied': '链接已复制', 'close': '关闭详情',
   'palette_label': '配色', 'category_meta_label': '品类', 'sales_label': '销售信息',
   'keywords_label': '商品关键词',
   'looks': 'LOOKS',
   'doc_title': '擦边衣橱 · 衣橱四视图档案',
 },
 'en': {'all_shops': 'All',
   'all_collection': 'ALL COLLECTIONS',
   'all_description': 'The full archive across all seven shops. Sets, dresses, bodysuits and nightgowns, shown from the front, back, left and right so you can see how each garment sits. Arranged by shop, with new pieces appended to their shop.',
   'archive_kicker': '01 / THE COLLECTION', 'archive_all': 'Full Wardrobe', 'archive_suffix': ' Wardrobe',
   'archive_note': 'Browse the grid, 30 pieces per page. Open any piece for the four-view detail.',
   'search_placeholder': 'Search styles, colors or details',
   'status_all': 'All', 'status_current': 'On sale', 'status_history': 'Archived',
   'category_label': 'Category',
   'empty_title': 'No matching pieces', 'empty_btn': 'Clear filters',
   'pager_prev': 'Prev', 'pager_next': 'Next',
   'pager_info': 'Page {page} / {pages} · {items} of {total} pieces',
   'notes_kicker': '02 / COLLECTION NOTES',
   'notes_h2a': 'The garment only,', 'notes_h2b': 'never the wearer.',
   'note1_t': 'Complete sets', 'note1_p': 'Mostly sets, tops and skirts; socks and briefs from the original styling are included, but no single pieces.',
   'note2_t': 'Four directions', 'note2_p': 'Every piece follows the same front, back, left, right order, ratio and white-background light, so silhouettes and details are easy to compare.',
   'note3_t': 'By shop', 'note3_p': 'Arranged by shop with new pieces appended after; information comes from public Taobao listings and public archived records.',
   'footer_suffix': 'Wardrobe Archive', 'back_top': 'Back to top ↑',
   'stat_styles': 'Pieces', 'stat_views': 'Unique views', 'stat_archived': 'Archived',
   'hero_eyebrow': 'GARMENT STUDY · 2026.11',
   'hero_oss': 'open source · github ↗',
   'view_labels': ['All views', 'Front', 'Back', 'Left', 'Right'],
   'aria_view': 'View {name} in four views', 'alt_four': '{name} front, back, left and right views',
   'modal_look': 'LOOK / ',
   'prev_look': 'Prev piece', 'next_look': 'Next piece',
   'download': 'Download four views', 'download_name': '4views',
   'copy': 'Copy link', 'copied': 'Link copied', 'close': 'Close detail',
   'palette_label': 'Palette', 'category_meta_label': 'Category', 'sales_label': 'Sales info',
   'keywords_label': 'Keywords',
   'looks': 'LOOKS',
   'doc_title': 'Cosplay Lingerie · Wardrobe Archive',
 },
 'jp': {'all_shops': 'すべて',
   'all_collection': 'ALL COLLECTIONS',
   'all_description': '7店舗の全収録アーカイブ。セット、ワンピース、ボディスーツ、ネグリジェを、前・後・左・右の4方向で立体的に呈示。店舗順に配列し、新アイテムは各店の末尾に追加。',
   'archive_kicker': '01 / THE COLLECTION', 'archive_all': '全衣装棚', 'archive_suffix': 'の衣装棚',
   'archive_note': 'グリッド順に、1ページ30点で配列。任意の衣装を開くと4方向の詳細が見られます。',
   'search_placeholder': '衣装・色・ディテールで検索',
   'status_all': 'すべて', 'status_current': '公開販売中', 'status_history': '過去収録',
   'category_label': 'カテゴリ',
   'empty_title': '該当する衣装がありません', 'empty_btn': '絞り込みを解除',
   'pager_prev': '前へ', 'pager_next': '次へ',
   'pager_info': '{page}/{pages} ページ · 全{total}点中 {items} 点',
   'notes_kicker': '02 / COLLECTION NOTES',
   'notes_h2a': '衣装だけを記録する。', 'notes_h2b': '着る人は記録しない。',
   'note1_t': '完全なセット', 'note1_p': 'セット・衣装・スカートを中心に、元のコーデに含まれる靴下とショーツも併せて呈示。単品は収録しません。',
   'note2_t': '4方向', 'note2_p': '全アイテムを前・後・左・右の統一順序で、同じ比率と白背景の光で撮影。シルエットとディテールの比較に便利です。',
   'note3_t': '店舗別アーカイブ', 'note3_p': '店舗順に配列し、新アイテムは各店の末尾に追加。情報は淘宝網の公開商品ページおよび公開履歴収録に基づきます。',
   'footer_suffix': '衣装アーカイブ', 'back_top': 'トップへ戻る ↑',
   'stat_styles': '収録アイテム', 'stat_views': '4方向ビュー', 'stat_archived': '過去収録',
   'hero_eyebrow': 'GARMENT STUDY · 2026.11',
   'hero_oss': 'オープンソース · GitHub ↗',
   'view_labels': ['全方向', '前', '後', '左', '右'],
   'aria_view': '{name}の4方向を見る', 'alt_four': '{name}の前後左右4方向',
   'modal_look': 'LOOK / ',
   'prev_look': '前の衣装', 'next_look': '次の衣装',
   'download': '4方向をダウンロード', 'download_name': '4方向',
   'copy': 'リンクをコピー', 'copied': 'コピーしました', 'close': '閉じる',
   'palette_label': '配色', 'category_meta_label': 'カテゴリ', 'sales_label': '販売情報',
   'keywords_label': 'キーワード',
   'looks': 'LOOKS',
   'doc_title': 'ギリギリ衣装棚・四方向衣装アーカイブ',
 },
}

CATEGORY_I18N = {
 '套装': ('Set', 'セット'), '连衣裙': ('Dress', 'ワンピース'),
 '睡裙': ('Sleep dress', 'キャミワンピース'), '连体衣': ('Bodysuit', 'ボディスーツ'),
 '泳衣': ('Swimsuit', '水着'),
}

TITLE_I18N = {'cn': '擦边衣橱', 'en': 'Cosplay Lingerie', 'jp': 'ギリギリ衣装棚'}

out = []
out.append('// AUTO-GENERATED by scripts/gen-i18n.py — do not edit by hand.')
out.append("export type Lang = 'cn' | 'en' | 'jp'")
out.append('')
out.append('export const TITLE_I18N: Record<Lang, string> = ' + json.dumps(TITLE_I18N, ensure_ascii=False, indent=2))
out.append('')
out.append('export const UI: Record<Lang, Record<string, string | string[]>> = ' + json.dumps(UI, ensure_ascii=False, indent=2))
out.append('')
out.append('export interface ShopI18n { pinyin: string; en: { mark: string; collection: string; description: string }; jp: { mark: string; collection: string; description: string } }')
out.append('export const SHOPS_I18N: Record<string, ShopI18n> = ' + json.dumps(SHOPS_I18N, ensure_ascii=False, indent=2))
out.append('')
out.append('export const CATEGORY_I18N: Record<string, { en: string; jp: string }> = ' + json.dumps({k: {'en': v[0], 'jp': v[1]} for k, v in CATEGORY_I18N.items()}, ensure_ascii=False, indent=2))
out.append('')
out.append('export const COLORS: Record<string, { en: string; jp: string }> = ' + json.dumps({k: {'en': v[0], 'jp': v[1]} for k, v in COLORS.items()}, ensure_ascii=False, indent=2))
out.append('')
out.append('export const PRODUCT_EN: Record<string, { name: string; detail: string }> = ' + json.dumps(PROD_EN, ensure_ascii=False, indent=1))
out.append('')
out.append('export const PRODUCT_JP: Record<string, { name: string; detail: string }> = ' + json.dumps(PROD_JP, ensure_ascii=False, indent=1))
out.append('')

sales_fn = r'''
const SALES_RULES: Record<Lang, [RegExp, string][]> = {
  cn: [[/.*/, '$&']],
  en: [
    [/^页面未显示$/, 'Not shown on listing'],
    [/^公开页已售 (.+)$/, 'Public page: $1 sold'],
    [/^公开页 (.+) 人付款$/, 'Public page: $1 paid'],
    [/^(.+)人付款$/, '$1 paid'],
    [/^公开页 (.+) 评价$/, 'Public page: $1 reviews'],
    [/^公开页 100% 好评$/, 'Public page: 100% positive'],
    [/^公开页价格信息$/, 'Public page: price info'],
    [/^公开商品页可查$/, 'See public product page'],
    [/^公开商品页有评价$/, 'Public page has reviews'],
    [/^收录于店铺公开商品页$/, 'Archived from shop public page'],
    [/^收录于公开商品聚合页$/, 'Archived from public aggregator page'],
    [/^同系列公开页 (.+) 人付款$/, 'Same series public page: $1 paid'],
    [/^已售100以内件（搜索摘要）$/, 'Sold: under 100 (search snippet)'],
    [/^已售100以内件$/, 'Sold: under 100'],
    [/^已售100\+件$/, 'Sold: 100+'],
    [/^2022 年历史收录$/, 'Archived 2022'],
    [/^历史公开收录$/, 'Archived from public listings'],
    [/^历史促销信息收录$/, 'Archived promo info'],
    [/^生产中$/, 'In production'],
    [/^预售$/, 'Pre-order'],
    [/^现货$/, 'In stock'],
  ],
  jp: [
    [/^页面未显示$/, 'ページに表示なし'],
    [/^公开页已售 (.+)$/, '公開ページ販売数 $1'],
    [/^公开页 (.+) 人付款$/, '公開ページ購入数 $1'],
    [/^(.+)人付款$/, '購入数 $1'],
    [/^公开页 (.+) 评价$/, '公開ページ評価 $1'],
    [/^公开页 100% 好评$/, '公開ページ 高評価100%'],
    [/^公开页价格信息$/, '公開ページに価格情報'],
    [/^公开商品页可查$/, '公開商品ページで確認可'],
    [/^公开商品页有评价$/, '公開ページにレビューあり'],
    [/^收录于店铺公开商品页$/, '店舗公開ページに収録'],
    [/^收录于公开商品聚合页$/, '公開商品まとめページに収録'],
    [/^同系列公开页 (.+) 人付款$/, '同シリーズ公開ページ 購入数 $1'],
    [/^已售100以内件（搜索摘要）$/, '販売数100以内（検索サマリー）'],
    [/^已售100以内件$/, '販売数100以内'],
    [/^已售100\+件$/, '販売数100+件'],
    [/^2022 年历史收录$/, '2022年 アーカイブ収録'],
    [/^历史公开收录$/, '過去の公開収録'],
    [/^历史促销信息收录$/, '過去のプロモ情報収録'],
    [/^生产中$/, '生産中'],
    [/^预售$/, '予約販売'],
    [/^现货$/, '在庫あり'],
  ],
}

export function translateSales(s: string, lang: Lang): string {
  if (!s) return ''
  if (lang === 'cn') return s
  for (const [re, tpl] of SALES_RULES[lang]) {
    if (re.test(s)) return s.replace(re, tpl)
  }
  return s
}
'''
out.append(sales_fn)

open('src/data/i18n.ts', 'w').write('\n'.join(out) + '\n')
print('written src/data/i18n.ts, products:', len(prods))
print('name coverage en/jp:', len(PROD_EN), len(PROD_JP))
