import { feimuProducts } from './feimu-products'
import { malymoonProducts } from './malymoon-products'
import { kiyoviProducts } from './kiyovi-products'
import { waimengProducts } from './waimeng-products'
import { detisheProducts } from './detishe-products'

export type ProductStatus = 'current' | 'history'
export type ProductCategory = '连衣裙' | '套装' | '连体衣' | '睡裙' | '泳衣'
export type ShopId = 'qilesan' | 'wuwuwushan' | 'feimu' | 'malymoon' | 'kiyovi' | 'waimeng' | 'detishe'

export interface Shop {
  id: ShopId
  name: string
  mark: string
  collection: string
  description: string
  hero: Array<{ id: string; position: 'front' | 'left' | 'right' }>
}

export interface Product {
  id: string
  shop: ShopId
  name: string
  en: string
  category: ProductCategory
  /** 淘宝商品标题关键词（颜色/类型/IP/角色名），仅来自商品标题，抓不到则留空 */
  keywords?: string[]
  status: ProductStatus
  price?: string
  sales: string
  source: string
  sourceLabel: string
  detail: string
  palette: string
}

export const shops: Shop[] = [
  {
    id: 'qilesan',
    name: '七了个三',
    mark: '七三',
    collection: 'COLLECTION 001',
    description: '七了个三畅销服装档案。套装、裙子与连体衣，以前、后、左、右四个方向，呈现穿着时的立体形态。',
    hero: [
      { id: '02-abyss-maid', position: 'front' },
      { id: '01-sweet-guard', position: 'left' },
      { id: '14-sea-mermaid', position: 'right' },
    ],
  },
  {
    id: 'wuwuwushan',
    name: '污污污山',
    mark: '污山',
    collection: 'COLLECTION 002',
    description: '污污污山角色服装档案。礼服、旗袍与角色套装，以前、后、左、右四个方向，呈现完整搭配与服装轮廓。',
    hero: [
      { id: 'w13-shuten-gown', position: 'front' },
      { id: 'w07-mainz-qipao', position: 'left' },
      { id: 'w24-cheshire-wedding', position: 'right' },
    ],
  },
  {
    id: 'feimu',
    name: '霏慕旗舰店',
    mark: '霏慕',
    collection: 'COLLECTION 003',
    description: '霏慕旗舰店服装档案。女仆、学院、和服、旗袍与睡裙，以前、后、左、右四个方向，呈现服装结构与完整搭配。',
    hero: [
      { id: 'f08-white-academy', position: 'front' },
      { id: 'f09-red-academy', position: 'left' },
      { id: 'f24-blue-backless', position: 'right' },
    ],
  },
  {
    id: 'malymoon',
    name: 'Malymoon',
    mark: 'MM',
    collection: 'COLLECTION 004',
    description: 'Malymoon 角色服装档案。女仆、护士、动物系与幻想套装，以前、后、左、右四个方向，呈现服装结构与完整搭配。',
    hero: [
      { id: 'm02', position: 'front' },
      { id: 'm08', position: 'left' },
      { id: 'm24', position: 'right' },
    ],
  },
  {
    id: 'kiyovi',
    name: 'KIYOVI',
    mark: 'KI',
    collection: 'COLLECTION 005',
    description: 'KIYOVI 角色服装档案。女仆、旗袍、礼服与角色套装，以前、后、左、右四个方向，呈现服装轮廓与细节。',
    hero: [
      { id: 'k03', position: 'front' },
      { id: 'k04', position: 'left' },
      { id: 'k23', position: 'right' },
    ],
  },
  {
    id: 'waimeng',
    name: '歪萌舍',
    mark: '歪萌',
    collection: 'COLLECTION 006',
    description: '歪萌舍角色服装档案。女仆、兔女郎、旗袍与幻想套装，以前、后、左、右四个方向，呈现完整搭配与服装轮廓。',
    hero: [
      { id: 'y06', position: 'front' },
      { id: 'y14', position: 'left' },
      { id: 'y16', position: 'right' },
    ],
  },
  {
    id: 'detishe',
    name: '得体社',
    mark: '得体',
    collection: 'COLLECTION 007',
    description: '得体社角色服装档案。女仆、礼服、护士与角色套装，以前、后、左、右四个方向，呈现服装结构与完整搭配。',
    hero: [
      { id: 'd01', position: 'front' },
      { id: 'd13', position: 'left' },
      { id: 'd15', position: 'right' },
    ],
  },
]

const qilesanProducts: Array<Omit<Product, 'shop'>> = [
  { id: '01-sweet-guard', keywords: ['七了个三', '甜心守护', '立领', '修身', '连衣裙', '纯欲', '睡裙', '套装', '睡衣', '家居服'], name: '甜心守护', en: 'SWEET GUARD', category: '连衣裙', status: 'current', price: '¥79', sales: '公开页 400+ 人付款', source: 'https://www.taobao.com/list/item/cTJVeUFWd0ozQndkZzJYZDRVU1psdz09.htm', sourceLabel: '淘宝商品页', detail: '立领短袖连衣裙 · 心形标识 · 腰带 · 配套白色袜类', palette: '雾白 / 浅蓝' },
  { id: '02-abyss-maid', keywords: ['七了个三', '深渊女仆', '暗黑', 'pu皮', '长裙', '大裙摆', '立领', '连衣裙', '女佣', 'cos'], name: '深渊女仆', en: 'ABYSS MAID', category: '连衣裙', status: 'current', sales: '公开商品页有评价', source: 'https://www.taobao.com/list/item/UXV3clFyUDB3RVZjN3poeU5wNFdOQT09.htm', sourceLabel: '淘宝商品页', detail: 'PU 长裙 · 立领羊腿袖 · 荷叶胸饰 · 宽版扣袢腰封', palette: '亮黑' },
  { id: '03-blue-maid', name: '奶蓝甜心女仆', en: 'BLUE SWEETHEART', category: '套装', status: 'current', sales: '收录于店铺公开商品页', source: 'https://www.taobao.com/list/item/cTJVeUFWd0ozQndkZzJYZDRVU1psdz09.htm', sourceLabel: '淘宝公开页', detail: '心形胸衣 · 短围裙 · 多层褶裙 · 配套白色过膝袜', palette: '奶蓝 / 白' },
  { id: '04-pink-maid', name: '粉白甜心女仆', en: 'PINK SWEETHEART', category: '套装', status: 'current', sales: '收录于店铺公开商品页', source: 'https://www.taobao.com/list/item/cTJVeUFWd0ozQndkZzJYZDRVU1psdz09.htm', sourceLabel: '淘宝公开页', detail: '红色领结 · 粉色滚边 · 印花短裙 · 配套白色过膝袜', palette: '粉白 / 大红' },
  { id: '05-purple-witch', name: '紫夜小恶魔', en: 'PURPLE NIGHT', category: '连衣裙', status: 'current', sales: '收录于店铺公开商品页', source: 'https://www.taobao.com/list/item/cTJVeUFWd0ozQndkZzJYZDRVU1psdz09.htm', sourceLabel: '淘宝公开页', detail: '紫蝴蝶结 · 束身胸衣 · 刺绣纹样 · 双层短裙', palette: '黑 / 紫' },
  { id: '06-stray-maid', keywords: ['七了个三', '迷途女仆', '性感', '镂空', '黑白', '女佣风', '制服', '短裙', '套装', '甜美'], name: '迷途女仆', en: 'STRAY MAID', category: '套装', status: 'current', sales: '公开商品页可查', source: 'https://www.taobao.com/list/item/UUpEOXRBSVRSRjhIVTBVOWlBKzZOQT09.htm', sourceLabel: '淘宝商品页', detail: '短上衣 · 胸前镂空 · 荷叶肩带 · 黑白围裙短裙', palette: '黑 / 白' },
  { id: '07-china-maid', name: '青瓷中华女仆', en: 'CELADON MAID', category: '套装', status: 'current', sales: '收录于公开商品聚合页', source: 'https://guangtao.taobao.com/product-afd710582868779dc1e189fc45127413f2998ffa7ad307064a5296e2a53dc975143d6bbf8fac90b46a8818449b278896.html', sourceLabel: '淘宝聚合页', detail: '盘扣立领 · 印花水袖 · 熊形围裙 · 层叠白裙', palette: '青瓷 / 白' },
  { id: '08-holy-nun', keywords: ['七了个三', '修女圣愿', '性感', '镂空', '高叉', '长裙', '露肩', '连衣裙', '修女', 'cos'], name: '修女圣愿', en: 'HOLY VOW', category: '连衣裙', status: 'current', price: '¥29.99', sales: '公开页 5000+ 人付款', source: 'https://www.taobao.com/list/item/MkRKU29jZnJrbFdqVlBVc0ZWampLQT09.htm', sourceLabel: '淘宝商品页', detail: '白色十字领 · 露肩长袖 · 高开衩长裙 · 配套袜类', palette: '黑 / 白' },
  { id: '09-midnight-witch', keywords: ['七了个三', '午夜魔女', '暗黑', 'pu皮', '弹力', '短裙', '连衣裙', '深渊女仆', '制服', 'cos'], name: '午夜魔女', en: 'MIDNIGHT WITCH', category: '连衣裙', status: 'current', sales: '公开商品页可查', source: 'https://www.taobao.com/list/item/WkJqYy9sOVU0bDNvREVYTXNLUVZ5UT09.htm', sourceLabel: '淘宝商品页', detail: 'PU 弹力短裙 · 荷叶立领 · 胸前镂空 · 喇叭长袖', palette: '亮黑' },
  { id: '10-dream-sweetheart', keywords: ['七了个三', '捕梦甜心', '原创', '透感', '雪纺', '女仆', '性感', '镂空', '睡裙', '睡衣'], name: '捕梦甜心', en: 'DREAM CATCHER', category: '睡裙', status: 'current', price: '¥128', sales: '公开页 100% 好评', source: 'https://www.taobao.com/list/item/SVN1MytzZVZKVFlUL05VWHZYZFIxZz09.htm', sourceLabel: '淘宝商品页', detail: '透感雪纺 · 细肩带 · 蝴蝶结 · 深色波浪裙边', palette: '雾白 / 浅绿' },
  { id: '11-sugar-cat', keywords: ['七了个三', '糖心猫厨', '原创', '小猫', '印花', '围裙', '可爱', '女仆风', '背心', '短裙'], name: '糖心猫厨', en: 'SUGAR CAT', category: '套装', status: 'current', price: '¥108', sales: '公开商品页可查', source: 'https://www.taobao.com/list/item/YWtxcDN3UVJxd0NOK09qU0FNM2d6dz09.htm', sourceLabel: '淘宝商品页', detail: '猫咪印花 · 蓝白围裙 · 泡泡短袖 · 荷叶短裙', palette: '天蓝 / 白' },
  { id: '12-abyss-demon', keywords: ['七了个三', '深渊魅魔', '性感', '镂空', '复古', '旗袍领', '连衣裙', '恶魔', 'cos', '高叉'], name: '深渊魅魔', en: 'ABYSS DEMON', category: '连衣裙', status: 'current', sales: '公开商品页可查', source: 'https://www.taobao.com/list/item/bXlHbTM4L2ptVzRuT2kwRTdTZXd6QT09.htm', sourceLabel: '淘宝商品页', detail: '旗袍立领 · 粉色滚边 · 藤蔓刺绣 · 高开衩长裙', palette: '黑 / 玫粉' },
  { id: '13-devil-mark', name: '冰蓝恶魔女仆', en: 'ICE BLUE MAID', category: '套装', status: 'current', sales: '收录于店铺公开商品页', source: 'https://www.taobao.com/list/item/cTJVeUFWd0ozQndkZzJYZDRVU1psdz09.htm', sourceLabel: '淘宝公开页', detail: '中式立领 · 熊形印花 · 长袖围裙 · 配套白色袜类', palette: '冰蓝 / 白' },
  { id: '14-sea-mermaid', keywords: ['七了个三', '海汐鳞音', '性感', '人鱼', '舞姬', '仿珍珠', '身体链', '睡衣', '睡裙', '家居服'], name: '海汐鳞音', en: 'TIDAL PEARL', category: '套装', status: 'current', price: '¥168', sales: '公开商品页可查', source: 'https://www.taobao.com/list/item/TWpEMk5HTGZ2Qmw5T2pJbHdZSnVJUT09.htm', sourceLabel: '淘宝商品页', detail: '挂脖短衣 · 仿珍珠链 · 流苏装饰 · 不对称长裙', palette: '薄荷绿 / 珍珠白' },
  { id: '15-mech-09', keywords: ['七了个三', '机械特工09', '原创', '赛博', '机甲', 'cp', '镂空', '高叉', '打底衣', 'cos'], name: '机械特工 09', en: 'MECH AGENT 09', category: '连体衣', status: 'current', price: '¥99', sales: '公开页 100+ 人付款', source: 'https://www.taobao.com/chanpin/44ca3a69a382e70a2b11c887155abbdb50e0803919603e8449aec4c30b93207e.html', sourceLabel: '淘宝聚合页', detail: '赛博印花 · 长袖高领 · 机能扣带 · 高衩连体打底', palette: '黑 / 薰衣草紫' },
  { id: '16-mech-01', keywords: ['七了个三', '机械特工01', '原创', '机械印花', '暗黑', '朋克', '赛博', '镂空', '连体', '内衣'], name: '机械特工 01', en: 'MECH AGENT 01', category: '连体衣', status: 'current', price: '¥99', sales: '同系列公开页 27 人付款', source: 'https://www.taobao.com/chanpin/6b039039956c97f250c89e7e81679433.html', sourceLabel: '淘宝聚合页', detail: '荧光绿机能带 · 机械印花 · 长袖高领 · 连体打底', palette: '黑 / 荧光绿' },
  { id: '17-bone-nun', keywords: ['七了个三', '幽骨修女', '暗黑', '战斗修女', 'cos', '网纱', '丝绒', '性感', '高叉', '连衣裙'], name: '幽骨修女', en: 'BONE NUN', category: '连衣裙', status: 'current', price: '¥99', sales: '公开页 100+ 人付款', source: 'https://www.taobao.com/chanpin/ab8914b7b9f0e833d6c7f0007eed0c1f.html', sourceLabel: '淘宝聚合页', detail: '丝绒胸衣 · 双排扣袢 · 不规则长裙 · 长手套与袜类', palette: '黑 / 白' },
  { id: '18-soft-rabbit', name: '软乎萌兔', en: 'SOFT BUNNY', category: '连体衣', status: 'current', price: '¥65', sales: '公开商品页可查', source: 'https://www.taobao.com/list/item/R1VKL1BVSEVvWTlvMUsvbTJWY002QT09.htm', sourceLabel: '淘宝商品页', detail: '细肩带 · 腰部镂空 · 侧系绳绒球 · 配套白色袜类', palette: '奶白' },
  { id: '19-contract', keywords: ['结缘契约', '性感', '显瘦', '深蓝灰色', '睡裙', '纯御', '御姐', 'OL风', '包臀裙', '睡衣'], name: '结缘契约', en: 'OFFICE CONTRACT', category: '套装', status: 'current', price: '¥29', sales: '公开页 400+ 人付款', source: 'https://mobile-phone.taobao.com/chanpin/8aebadc72abedf8f260c6b27fa6f07654dc885e00bbcc40c1eca770604746b9e.html', sourceLabel: '淘宝聚合页', detail: '深蓝无袖高领上衣 · 灰色包臀短裙 · 配套深色袜类', palette: '深蓝 / 灰' },
  { id: '20-magic-sailor', name: '魔法少女水手服', en: 'MAGIC SAILOR', category: '套装', status: 'history', sales: '2022 年历史收录', source: 'http://huaban.com/pins/4715056784/', sourceLabel: '历史收录页', detail: '短款水手领 · 酒红领结 · 金色滚边 · 百褶短裙', palette: '黑 / 白 / 酒红' },
  { id: '21-pearl-sweetheart', keywords: ['七了个三', '粉系', '辣妹', '甜心', '珍珠', '内衣', '套装', '性感', '可爱', '透视'], name: '粉系辣妹甜心珍珠套装', en: 'PEARL SWEETHEART', category: '套装', status: 'history', sales: '2022 年历史收录', source: 'http://huaban.com/pins/5137748229/', sourceLabel: '历史收录页', detail: '珍珠饰边 · 细肩带 · 透感蓬蓬短裙 · 配套内裤与袜类', palette: '浅粉 / 珍珠白' },
  { id: '22-tail-skirt', keywords: ['七了个三', '优雅', '黑色', '燕尾', '蓬蓬裙', '超短', '连衣裙', '套装', '性感', '可爱'], name: '优雅黑色燕尾蓬蓬裙', en: 'SWALLOWTAIL DRESS', category: '连衣裙', status: 'history', sales: '历史公开收录', source: 'https://huaban.com/pins/7269551796/', sourceLabel: '历史收录页', detail: '束身上衣 · 前短后长 · 燕尾网纱 · 层叠蓬裙', palette: '黑' },
  { id: '23-patent-bunny', keywords: ['七了个三', '漆皮', '兔女郎', '可爱', '性感', '女佣装', '兔子女仆', '连体衣', '开叉', '镂空'], name: '漆皮兔女郎女佣装', en: 'PATENT BUNNY', category: '连体衣', status: 'history', sales: '2022 年历史收录', source: 'http://huaban.com/pins/4996351148/', sourceLabel: '历史收录页', detail: '漆皮连体衣 · 兔耳头饰 · 女佣腰饰 · 配套袜类', palette: '亮黑 / 白' },
  { id: '24-rose-qipao', name: '白玫瑰复古旗袍', en: 'ROSE QIPAO', category: '连衣裙', status: 'history', sales: '历史促销信息收录', source: 'https://www.smzdm.com/p/12549622/', sourceLabel: '历史促销页', detail: '玫瑰提花 · 中式立领 · 盘扣短袖 · 高开衩长裙', palette: '象牙白' },
  { id: 'q25', keywords: ['七了个三', '熊猫小厨', '中华女仆套装'], name: '熊猫小厨', en: 'QILESAN 25', category: '套装', status: 'current', price: '¥148', sales: '页面未显示', source: 'https://www.taobao.com/list/dianpu/61578589.htm', sourceLabel: '淘宝公开页', detail: '中华女仆套装 · 套装配件以四视图呈现为准 · 未展示角度为 AI 推定', palette: '黑 / 白' },
  { id: 'q26', keywords: ['七了个三', '运动部兔仆', '运动套装'], name: '运动部兔仆', en: 'QILESAN 26', category: '套装', status: 'current', price: '¥135', sales: '公开页价格信息', source: 'https://www.taobao.com/list/item/bW8yVlV5QU5tbTYvTkpRaFJlSGhXZz09.htm', sourceLabel: '淘宝公开页', detail: '运动套装 · 套装配件以四视图呈现为准 · 未展示角度为 AI 推定', palette: '浅蓝 / 白' },
  { id: 'q27', keywords: ['七了个三', '兔系萌仆', '女仆套装'], name: '兔系萌仆', en: 'QILESAN 27', category: '套装', status: 'current', price: '¥128', sales: '页面未显示', source: 'https://www.taobao.com/list/dianpu/61578589.htm', sourceLabel: '淘宝公开页', detail: '女仆套装 · 套装配件以四视图呈现为准 · 未展示角度为 AI 推定', palette: '蓝 / 白' },
  { id: 'q28', keywords: ['七了个三', '黑糖女仆', '女仆套装'], name: '黑糖女仆', en: 'QILESAN 28', category: '套装', status: 'current', price: '¥128', sales: '公开页 100+ 评价', source: 'https://www.taobao.com/list/product/%E5%A5%B3%E4%BB%86%E4%B8%8A%E8%A1%A3.htm', sourceLabel: '淘宝公开页', detail: '女仆套装 · 套装配件以四视图呈现为准 · 未展示角度为 AI 推定', palette: '黑 / 白 / 灰' },
  { id: 'q29', keywords: ['七了个三', '黑Saber泳装', '泳衣'], name: '黑Saber泳装', en: 'QILESAN 29', category: '泳衣', status: 'current', price: '¥125', sales: '公开页 100+ 人付款', source: 'https://www.taobao.com/list/dianpu/61578589.htm', sourceLabel: '淘宝公开页', detail: '泳衣 · 套装配件以四视图呈现为准 · 未展示角度为 AI 推定', palette: '黑' },
  { id: 'q30', keywords: ['七了个三', '绒兔bunny', '连体家居服'], name: '绒兔bunny', en: 'QILESAN 30', category: '连体衣', status: 'current', price: '¥108', sales: '公开页 300+ 人付款', source: 'https://www.taobao.com/list/dianpu/61578589.htm', sourceLabel: '淘宝公开页', detail: '连体家居服 · 套装配件以四视图呈现为准 · 未展示角度为 AI 推定', palette: '白 / 粉' },
  { id: 'q31', keywords: ['七了个三', '魅魔特工', '特工套装'], name: '魅魔特工', en: 'QILESAN 31', category: '套装', status: 'current', price: '¥99', sales: '公开页 200+ 人付款', source: 'https://www.taobao.com/list/dianpu/61578589.htm', sourceLabel: '淘宝公开页', detail: '特工套装 · 套装配件以四视图呈现为准 · 未展示角度为 AI 推定', palette: '黑 / 粉' },
  { id: 'q32', keywords: ['七了个三', '特工小兔', '卫衣短裙套装'], name: '特工小兔', en: 'QILESAN 32', category: '套装', status: 'current', price: '¥99', sales: '公开页 200+ 人付款', source: 'https://www.taobao.com/list/item/WEEvbE1VUkw0R3huOWZscXAxV1NXdz09.htm', sourceLabel: '淘宝公开页', detail: '卫衣短裙套装 · 套装配件以四视图呈现为准 · 未展示角度为 AI 推定', palette: '黑 / 白' },
  { id: 'q33', keywords: ['七了个三', '藤蔓深渊', '连衣裙'], name: '藤蔓深渊', en: 'QILESAN 33', category: '连衣裙', status: 'current', price: '¥89', sales: '公开页 200+ 人付款', source: 'https://www.taobao.com/list/item/MStmVFlrMkQyUjhOb2Rud3VMMVBXUT09.htm', sourceLabel: '淘宝公开页', detail: '连衣裙 · 套装配件以四视图呈现为准 · 未展示角度为 AI 推定', palette: '黑 / 品红' },
  { id: 'q34', keywords: ['七了个三', '萌兔情人节', '兔女郎套装'], name: '萌兔情人节', en: 'QILESAN 34', category: '连体衣', status: 'current', price: '¥79', sales: '公开页 100+ 人付款', source: 'https://www.taobao.com/list/dianpu/61578589.htm', sourceLabel: '淘宝公开页', detail: '兔女郎套装 · 套装配件以四视图呈现为准 · 未展示角度为 AI 推定', palette: '粉 / 白' },
  { id: 'q35', keywords: ['七了个三', '月光魔女', '漆皮连体衣'], name: '月光魔女', en: 'QILESAN 35', category: '连体衣', status: 'current', price: '¥59', sales: '公开页 300+ 人付款', source: 'https://www.taobao.com/list/item/djFuckhqWEI5dzNrZHh4UHo5VnM1Zz09.htm', sourceLabel: '淘宝公开页', detail: '漆皮连体衣 · 套装配件以四视图呈现为准 · 未展示角度为 AI 推定', palette: '黑' },
  { id: 'q36', keywords: ['七了个三', '甜美护士', '护士套装'], name: '甜美护士', en: 'QILESAN 36', category: '套装', status: 'current', price: '¥58', sales: '公开页 4 人付款', source: 'https://www.taobao.com/list/dianpu/61578589.htm', sourceLabel: '淘宝公开页', detail: '护士套装 · 套装配件以四视图呈现为准 · 未展示角度为 AI 推定', palette: '白 / 粉' },
  { id: 'q37', keywords: ['七了个三', '七了个三基础死库水', '泳衣'], name: '七了个三基础死库水', en: 'QILESAN 37', category: '泳衣', status: 'current', price: '¥55', sales: '公开页 600+ 人付款', source: 'https://guangtao.taobao.com/product-03383df145769ff73a06f3bd71cc7adc10a29926ac7909ff16581c7d28892ebc.html', sourceLabel: '淘宝公开页', detail: '泳衣 · 套装配件以四视图呈现为准 · 未展示角度为 AI 推定', palette: '深蓝' },
  { id: 'q38', keywords: ['七了个三', '夏夜海风', '水手服套装'], name: '夏夜海风', en: 'QILESAN 38', category: '套装', status: 'current', price: '¥39', sales: '页面未显示', source: 'https://www.taobao.com/list/item/Si9NMjFxZ0JpM1NVWVpjYTN4Z21EZz09.htm', sourceLabel: '淘宝公开页', detail: '水手服套装 · 套装配件以四视图呈现为准 · 未展示角度为 AI 推定', palette: '深蓝 / 白 / 红' },
  { id: 'q39', keywords: ['七了个三', '甜奶油', '针织连衣裙'], name: '甜奶油', en: 'QILESAN 39', category: '连衣裙', status: 'current', price: '¥19.99', sales: '公开页 200+ 人付款', source: 'https://www.taobao.com/list/item/ZDMzcDZHR0xvd0hQNm5yV0lqQmlCQT09.htm', sourceLabel: '淘宝公开页', detail: '针织连衣裙 · 套装配件以四视图呈现为准 · 未展示角度为 AI 推定', palette: '奶白' },
  { id: 'q40', keywords: ['七了个三', '粉樱暗黑猫', '猫耳连衣裙'], name: '粉樱暗黑猫', en: 'QILESAN 40', category: '连衣裙', status: 'current', price: '', sales: '页面未显示', source: 'https://www.taobao.com/list/dianpu/61578589.htm', sourceLabel: '淘宝公开页', detail: '猫耳连衣裙 · 套装配件以四视图呈现为准 · 未展示角度为 AI 推定', palette: '黑 / 粉 / 白' },
  { id: 'q41', keywords: ['七了个三', '特工稽查', '特工连体衣'], name: '特工稽查', en: 'QILESAN 41', category: '连体衣', status: 'current', price: '', sales: '页面未显示', source: 'https://www.taobao.com/list/dianpu/61578589.htm', sourceLabel: '淘宝公开页', detail: '特工连体衣 · 套装配件以四视图呈现为准 · 未展示角度为 AI 推定', palette: '蓝 / 黑' },
]

const wuwuwushanProducts: Product[] = [
  { id: 'w01-wilhelmina', keywords: ['污污污山', '棕色尘埃2', '威廉明娜', '兔女郎', 'cosplay'], shop: 'wuwuwushan', name: '威廉明娜兔女郎', en: 'WILHELMINA BUNNY', category: '连体衣', status: 'current', price: '¥298', sales: '公开页已售 200+', source: 'https://item.taobao.com/item.htm?id=1009796551247', sourceLabel: '淘宝商品页', detail: '短款披肩 · 兔女郎连体衣 · 高领扣饰 · 配套白色长袜', palette: '珍珠白 / 银灰' },
  { id: 'w02-hindenburg-dancer', keywords: ['污污污山', 'cosplay', '碧蓝航线', '兴登堡', '舞娘'], shop: 'wuwuwushan', name: '兴登堡舞娘', en: 'HINDENBURG DANCER', category: '套装', status: 'current', price: '¥58 起', sales: '公开页已售 200+', source: 'https://item.taobao.com/item.htm?id=1080771158581', sourceLabel: '淘宝商品页', detail: '预售 · 蝙蝠翼袖饰 · 裹胸上衣 · 透感长裙与腰饰', palette: '黑 / 暗紫' },
  { id: 'w03-mori-bunny', keywords: ['污污污山', 'cosplay', '胜利女神', '森兔女郎', 'nikke'], shop: 'wuwuwushan', name: '森兔女郎', en: 'MORI BUNNY', category: '连体衣', status: 'current', price: '¥68 起', sales: '公开页已售 200+', source: 'https://item.taobao.com/item.htm?id=1082300046083', sourceLabel: '淘宝商品页', detail: '预售 · 亮面连体衣 · 紫色滚边 · 长手套与过膝袜', palette: '亮黑 / 深紫' },
  { id: 'w04-mistiola-dancer', keywords: ['污污污山', '黑兽', '米斯蒂奥拉', '暗精灵', '舞娘', 'cosplay'], shop: 'wuwuwushan', name: '米斯蒂奥拉暗精灵舞娘', en: 'MISTIOLA DANCER', category: '套装', status: 'current', price: '¥328', sales: '公开页已售 200+', source: 'https://item.taobao.com/item.htm?id=1060946128692', sourceLabel: '淘宝商品页', detail: '生产中 · 金属颈饰 · 裹胸上衣 · 不对称透感长裙', palette: '黑 / 古金' },
  { id: 'w05-lion-uniform', keywords: ['污污污山', '碧蓝航线', '狮', '二次元', '私房', '制服', 'cosplay'], shop: 'wuwuwushan', name: '狮国风制服', en: 'LION UNIFORM', category: '套装', status: 'current', price: '¥38 起', sales: '公开页已售 200+', source: 'https://item.taobao.com/item.htm?id=1042759093915', sourceLabel: '淘宝商品页', detail: '生产中 · 国风短上衣 · 腰封与长后摆 · 配套深色袜类', palette: '朱红 / 黑 / 金' },
  { id: 'w06-mari-nun', keywords: ['污污污山', 'cosplay', '蔚蓝档案', '玛丽', '修女'], shop: 'wuwuwushan', name: '玛丽同人修女', en: 'MARI NUN', category: '套装', status: 'current', price: '¥368', sales: '公开页已售 400+', source: 'https://item.taobao.com/item.htm?id=1058484384039', sourceLabel: '淘宝商品页', detail: '生产中 · 连帽长上衣 · 青蓝蝴蝶结 · 配套白色长袜', palette: '黑 / 青蓝 / 白' },
  { id: 'w07-mainz-qipao', keywords: ['污污污山', 'cosplay', '碧蓝航线', '美因茨', '新春', '旗袍'], shop: 'wuwuwushan', name: '美因茨新春旗袍', en: 'MAINZ QIPAO', category: '连衣裙', status: 'current', price: '¥418', sales: '公开页已售 100+', source: 'https://item.taobao.com/item.htm?id=877799726094', sourceLabel: '淘宝商品页', detail: '中式立领 · 镂空长袖 · 蓝白滚边 · 前短后长旗袍摆', palette: '宝蓝 / 白 / 金' },
  { id: 'w08-anchorage-bunny', keywords: ['污污污山', 'cosplay', '碧蓝航线', '安克雷奇', '兔女郎'], shop: 'wuwuwushan', name: '安克雷奇兔女郎', en: 'ANCHORAGE BUNNY', category: '套装', status: 'current', price: '¥338', sales: '公开页已售 100+', source: 'https://item.taobao.com/item.htm?id=1034339542784', sourceLabel: '淘宝商品页', detail: '预售 · 绑带胸衣 · 分体长袖 · 高腰下装与长袜', palette: '白 / 冰蓝 / 黑' },
  { id: 'w09-rio-knit', keywords: ['污污污山', 'cosplay', 'RIO', '莉音', '毛衣'], shop: 'wuwuwushan', name: '莉音毛衣套装', en: 'RIO KNIT', category: '套装', status: 'current', price: '¥108', sales: '公开页已售 200+', source: 'https://item.taobao.com/item.htm?id=980975870565', sourceLabel: '淘宝商品页', detail: '针织短毛衣 · 针织下装 · 配套针织大腿袜', palette: '奶白' },
  { id: 'w10-rio-jiangshi', keywords: ['污污污山', '蔚蓝', '莉音', '僵尸', '二次元', '私房', 'cosplay'], shop: 'wuwuwushan', name: '莉音同人僵尸', en: 'RIO JIANGSHI', category: '连衣裙', status: 'current', price: '¥288', sales: '公开页已售 100+', source: 'https://item.taobao.com/item.htm?id=1042557266381', sourceLabel: '淘宝商品页', detail: '中式立领 · 黑白长旗袍 · 分体宽袖 · 红色绑带细节', palette: '黑 / 白 / 红' },
  { id: 'w11-velvet-maid', keywords: ['污污污山', 'nikke', '胜利女神', '薇尔维特', '私房', '旗袍', '女仆装', 'cosplay'], shop: 'wuwuwushan', name: '薇尔维特旗袍女仆', en: 'VELVET MAID', category: '套装', status: 'current', price: '¥298', sales: '公开页已售 200+', source: 'https://item.taobao.com/item.htm?id=1017507112392', sourceLabel: '淘宝商品页', detail: '预售 · 酒红旗袍短裙 · 白色围裙 · 背部大蝴蝶结与袜类', palette: '酒红 / 白 / 黑' },
  { id: 'w12-asuna-nurse', keywords: ['污污污山', '蔚蓝', '明日奈', '内衣', '私房', '二次元', '护士服', 'cosplay'], shop: 'wuwuwushan', name: '明日奈护士套装', en: 'ASUNA NURSE', category: '套装', status: 'current', price: '¥238', sales: '公开页已售 100+', source: 'https://item.taobao.com/item.htm?id=1048820116858', sourceLabel: '淘宝商品页', detail: '透感护士外袍 · 蓝色滚边 · 内搭套装 · 配套白色袜类', palette: '白 / 浅蓝' },
  { id: 'w13-shuten-gown', keywords: ['污污污山', 'FGO', '酒吞童子', '礼服', '二次元', '私房', 'cosplay'], shop: 'wuwuwushan', name: '酒吞童子同人礼服', en: 'SHUTEN GOWN', category: '连衣裙', status: 'current', price: '¥428', sales: '公开页已售 300+', source: 'https://item.taobao.com/item.htm?id=1041474129105', sourceLabel: '淘宝商品页', detail: '生产中 · 高领长袖 · 暗纹胸衣 · 不规则层叠长礼服', palette: '黑 / 深紫' },
  { id: 'w14-mogador-nurse', keywords: ['污污污山', '碧蓝航线', '莫加多尔', '护士', '私房', 'cosplay'], shop: 'wuwuwushan', name: '莫加多尔护士', en: 'MOGADOR NURSE', category: '套装', status: 'current', price: '¥259', sales: '公开页已售 200+', source: 'https://item.taobao.com/item.htm?id=902191532677', sourceLabel: '淘宝商品页', detail: '亮面长袖上衣 · 白色护士短裙 · 黑色内搭与过膝袜', palette: '亮黑 / 白' },
  { id: 'w15-immelmann', keywords: ['污污污山', '碧蓝航线', '殷麦曼', '私房', 'cosplay'], shop: 'wuwuwushan', name: '马克斯·殷麦曼', en: 'IMMELMANN', category: '套装', status: 'current', price: '¥388', sales: '公开页已售 100+', source: 'https://item.taobao.com/item.htm?id=1064657256974', sourceLabel: '淘宝商品页', detail: '机能胸衣 · 分体长袖 · 黑白腰封 · 短裙与长袜', palette: '黑 / 白' },
  { id: 'w16-shuten-second', keywords: ['污污污山', 'cosplay', 'FGO', '酒吞童子', '二破'], shop: 'wuwuwushan', name: '酒吞童子二破', en: 'SHUTEN SECOND', category: '套装', status: 'current', price: '¥428', sales: '公开页已售 300+', source: 'https://item.taobao.com/item.htm?id=900292233624', sourceLabel: '淘宝商品页', detail: '挂脖内搭 · 宽袖长外衣 · 红色腰封 · 层叠长摆与袜类', palette: '暗紫 / 酒红 / 黑' },
  { id: 'w17-rio-bunny', keywords: ['污污污山', 'cosplay', '蔚蓝档案', '莉音', '兔女郎'], shop: 'wuwuwushan', name: '莉音兔女郎', en: 'RIO BUNNY', category: '连体衣', status: 'current', price: '¥198', sales: '公开页已售 100+', source: 'https://item.taobao.com/item.htm?id=1030362853170', sourceLabel: '淘宝商品页', detail: '生产中 · 兔耳头饰 · 长袖短外套 · 亮面连体衣与深色袜类', palette: '亮黑 / 白' },
  { id: 'w18-genis-bunny', keywords: ['污污污山', 'cosplay', '棕色尘埃2', '杰尼斯', '兔女郎'], shop: 'wuwuwushan', name: '杰尼斯兔女郎', en: 'GENIS BUNNY', category: '套装', status: 'current', price: '¥198', sales: '公开页已售 100+', source: 'https://item.taobao.com/item.htm?id=997834534043', sourceLabel: '淘宝商品页', detail: '青蓝兔耳与领结 · 白色裹胸 · 腰链挂饰 · 配套长袜', palette: '白 / 青蓝' },
  { id: 'w19-sirius-bunny', keywords: ['污污污山', 'cosplay', '碧蓝航线', '天狼星', '天堂兔'], shop: 'wuwuwushan', name: '天狼星天堂兔', en: 'SIRIUS BUNNY', category: '连体衣', status: 'current', price: '¥198', sales: '公开页已售 85', source: 'https://item.taobao.com/item.htm?id=836276366237', sourceLabel: '淘宝商品页', detail: '现货 · 白色连体衣 · 分体短袖 · 薄荷色饰结与长袜', palette: '白 / 淡青' },
  { id: 'w20-mudan-qipao', keywords: ['污污污山', 'cosplay', 'nikke', '牡丹', '百花之王', '旗袍'], shop: 'wuwuwushan', name: '牡丹百花之王旗袍', en: 'MUDAN QIPAO', category: '连体衣', status: 'current', price: '¥268', sales: '公开页已售 200+', source: 'https://item.taobao.com/item.htm?id=1056568910291', sourceLabel: '淘宝商品页', detail: '生产中 · 中式立领 · 胸前镂空 · 黑金刺绣与分体长袖', palette: '黑 / 古金' },
  { id: 'w21-sirius-wedding', keywords: ['污污污山', 'cosplay', '碧蓝航线', '天狼星', '誓约', '婚纱', '礼服', '连衣裙', '花嫁'], shop: 'wuwuwushan', name: '天狼星誓约婚纱', en: 'SIRIUS WEDDING', category: '连衣裙', status: 'current', price: '¥278', sales: '公开页已售 100+', source: 'https://item.taobao.com/item.htm?id=1052875536883', sourceLabel: '淘宝商品页', detail: '露肩胸衣 · 轻透层叠长裙 · 长拖尾 · 配套白色袜类', palette: '象牙白' },
  { id: 'w22-albion-gown', keywords: ['污污污山', 'cosplay', '碧蓝航线', '阿尔比恩', '礼服'], shop: 'wuwuwushan', name: '阿尔比恩礼服', en: 'ALBION GOWN', category: '连衣裙', status: 'current', price: '¥178', sales: '公开页已售 100+', source: 'https://item.taobao.com/item.htm?id=913912567985', sourceLabel: '淘宝商品页', detail: '浅粉礼服胸衣 · 分体长袖 · 层叠裙撑 · 配套袜类', palette: '浅粉 / 珍珠白' },
  { id: 'w23-taihou-bunny', keywords: ['污污污山', 'cosplay', '碧蓝航线', '大凤', '兔女郎', '绮愿良宵'], shop: 'wuwuwushan', name: '大凤绮愿良宵兔女郎', en: 'TAIHOU BUNNY', category: '连体衣', status: 'current', price: '¥208', sales: '公开页已售 57', source: 'https://item.taobao.com/item.htm?id=924312918391', sourceLabel: '淘宝商品页', detail: '红色兔耳 · 亮面连体衣 · 领结与腰部镂空 · 配套深色袜类', palette: '正红 / 黑' },
  { id: 'w24-cheshire-wedding', keywords: ['污污污山', 'cosplay', '碧蓝航线', '柴郡', '婚纱', '花嫁', '誓约', '礼服'], shop: 'wuwuwushan', name: '柴郡誓约婚纱', en: 'CHESHIRE WEDDING', category: '连衣裙', status: 'current', price: '¥798', sales: '公开页已售 25', source: 'https://item.taobao.com/item.htm?id=924857021636', sourceLabel: '淘宝商品页', detail: '现货 · 多层轻纱礼服 · 露肩胸衣 · 长拖尾与配套袜类', palette: '珍珠白' },
  { id: 'w25', keywords: ['污污污山', '柴郡旗袍音乐绚烂', '旗袍'], shop: 'wuwuwushan', name: '柴郡旗袍音乐绚烂', en: 'WUWUWUSHAN 25', category: '连衣裙', status: 'current', price: '¥512.2', sales: '页面未显示', source: 'https://www.taobao.com/list/item/eHR4YkpNalJid3l6MWg4dVQxakxXUT09.htm', sourceLabel: '淘宝公开页', detail: '旗袍 · 套装配件以四视图呈现为准 · 未展示角度为 AI 推定', palette: '浅蓝 / 白 / 金' },
  { id: 'w26', keywords: ['污污污山', '镇海翠园佳绣', '旗袍'], shop: 'wuwuwushan', name: '镇海翠园佳绣', en: 'WUWUWUSHAN 26', category: '连衣裙', status: 'current', price: '¥428', sales: '页面未显示', source: 'https://www.taobao.com/chanpin/edc86481310aa65722a862b82d456e23.html', sourceLabel: '淘宝公开页', detail: '旗袍 · 套装配件以四视图呈现为准 · 未展示角度为 AI 推定', palette: '浅蓝 / 白 / 黑' },
  { id: 'w27', keywords: ['污污污山', '埃姆登白旗袍', '旗袍'], shop: 'wuwuwushan', name: '埃姆登白旗袍', en: 'WUWUWUSHAN 27', category: '连衣裙', status: 'current', price: '¥428', sales: '页面未显示', source: 'https://www.taobao.com/list/item/SVdlV1VPQ3daOXFPVHh2ay9DcnMrQT09.htm', sourceLabel: '淘宝公开页', detail: '旗袍 · 套装配件以四视图呈现为准 · 未展示角度为 AI 推定', palette: '白 / 银' },
  { id: 'w28', keywords: ['污污污山', '森亚琉琉歌露露卡', '套装'], shop: 'wuwuwushan', name: '森亚琉琉歌露露卡', en: 'WUWUWUSHAN 28', category: '套装', status: 'current', price: '¥428', sales: '页面未显示', source: 'https://www.taobao.com/chanpin/09478e2d9f4c37636fefa36099975ace7dcd8ea00a3ab0e617fdfe5d3ae8b762.html', sourceLabel: '淘宝公开页', detail: '套装 · 套装配件以四视图呈现为准 · 未展示角度为 AI 推定', palette: '黑 / 紫 / 粉' },
  { id: 'w29', keywords: ['污污污山', '花月新春旗袍', '旗袍'], shop: 'wuwuwushan', name: '花月新春旗袍', en: 'WUWUWUSHAN 29', category: '连衣裙', status: 'current', price: '¥368', sales: '页面未显示', source: 'https://www.taobao.com/list/item/MWU1N0FIMm1IVS81NTROWlhTc1IrUT09.htm', sourceLabel: '淘宝公开页', detail: '旗袍 · 套装配件以四视图呈现为准 · 未展示角度为 AI 推定', palette: '粉 / 红 / 金' },
  { id: 'w30', keywords: ['污污污山', '调月莉音临战战斗服', '战斗服'], shop: 'wuwuwushan', name: '调月莉音临战战斗服', en: 'WUWUWUSHAN 30', category: '套装', status: 'current', price: '¥358', sales: '页面未显示', source: 'https://www.taobao.com/chanpin/96f9b172582bec8a8975a9bfd3caa2ec3d4bffc7f7c4bd09374e9c8d035bb914.html', sourceLabel: '淘宝公开页', detail: '战斗服 · 套装配件以四视图呈现为准 · 未展示角度为 AI 推定', palette: '黑 / 红 / 银' },
  { id: 'w32', keywords: ['污污污山', '拉菲新春旗袍', '旗袍'], shop: 'wuwuwushan', name: '拉菲新春旗袍', en: 'WUWUWUSHAN 32', category: '连衣裙', status: 'current', price: '¥328', sales: '页面未显示', source: 'https://www.taobao.com/chanpin/c24317d52c26ab895a534e60bd657406.html', sourceLabel: '淘宝公开页', detail: '旗袍 · 套装配件以四视图呈现为准 · 未展示角度为 AI 推定', palette: '白 / 金 / 粉' },
  { id: 'w33', keywords: ['污污污山', '流萤同人泳衣', '泳衣'], shop: 'wuwuwushan', name: '流萤同人泳衣', en: 'WUWUWUSHAN 33', category: '泳衣', status: 'current', price: '¥298', sales: '页面未显示', source: 'https://www.taobao.com/chanpin/a3cc89c0f305bd54d1a869895b8ae516.html', sourceLabel: '淘宝公开页', detail: '泳衣 · 套装配件以四视图呈现为准 · 未展示角度为 AI 推定', palette: '薄荷绿 / 白 / 金 / 黑' },
  { id: 'w34', keywords: ['污污污山', '莉贝雷利奥水母礼服', '礼服'], shop: 'wuwuwushan', name: '莉贝雷利奥水母礼服', en: 'WUWUWUSHAN 34', category: '连衣裙', status: 'current', price: '¥298', sales: '页面未显示', source: 'https://mobile-phone.taobao.com/chanpin/ee9724665239ddc3f929b3a69f6bb020.html', sourceLabel: '淘宝公开页', detail: '礼服 · 套装配件以四视图呈现为准 · 未展示角度为 AI 推定', palette: '黑' },
  { id: 'w35', keywords: ['污污污山', 'Panty新天使衣装', '套装'], shop: 'wuwuwushan', name: 'Panty新天使衣装', en: 'WUWUWUSHAN 35', category: '套装', status: 'current', price: '¥288', sales: '页面未显示', source: 'https://www.taobao.com/chanpin/1ca33b8101776b4e101946be6b8e88cb098b063638c21816ca10d430edd87931.html', sourceLabel: '淘宝公开页', detail: '套装 · 套装配件以四视图呈现为准 · 未展示角度为 AI 推定', palette: '白 / 金 / 粉' },
  { id: 'w36', keywords: ['污污污山', '奥古斯特礼服', '礼服'], shop: 'wuwuwushan', name: '奥古斯特礼服', en: 'WUWUWUSHAN 36', category: '连衣裙', status: 'current', price: '¥288', sales: '页面未显示', source: 'https://guangtao.taobao.com/product-fcf90a15e1aee0c5f96cdf9fcb9cea89f0e1344ff2a469f7c4d8133903b204dd.html', sourceLabel: '淘宝公开页', detail: '礼服 · 套装配件以四视图呈现为准 · 未展示角度为 AI 推定', palette: '银灰' },
  { id: 'w37', keywords: ['污污污山', '银狼泳装', '泳衣'], shop: 'wuwuwushan', name: '银狼泳装', en: 'WUWUWUSHAN 37', category: '泳衣', status: 'current', price: '¥268', sales: '页面未显示', source: 'https://www.taobao.com/list/item/QkRxTm9yUkF6SmtGaWc3OTZ5QjNvZz09.htm', sourceLabel: '淘宝公开页', detail: '泳衣 · 套装配件以四视图呈现为准 · 未展示角度为 AI 推定', palette: '黑 / 紫 / 白' },
  { id: 'w38', keywords: ['污污污山', '万圣节小僵尸旗袍', '旗袍'], shop: 'wuwuwushan', name: '万圣节小僵尸旗袍', en: 'WUWUWUSHAN 38', category: '连衣裙', status: 'current', price: '¥258', sales: '页面未显示', source: 'https://ca.world.taobao.com/product/%E8%90%9D%E8%8E%89%E6%97%97%E8%A2%8D.htm', sourceLabel: '淘宝公开页', detail: '旗袍 · 套装配件以四视图呈现为准 · 未展示角度为 AI 推定', palette: '粉 / 金' },
  { id: 'w39', keywords: ['污污污山', '蔚蓝飞鸟泳装', '泳衣'], shop: 'wuwuwushan', name: '蔚蓝飞鸟泳装', en: 'WUWUWUSHAN 39', category: '泳衣', status: 'current', price: '¥258', sales: '页面未显示', source: 'https://www.taobao.com/list/product/%E6%B1%A1%E6%B1%A1%E6%B1%A1%E5%B1%B1cos%E9%A9%AC%E6%96%AF%E7%89%B9.htm', sourceLabel: '淘宝公开页', detail: '泳衣 · 套装配件以四视图呈现为准 · 未展示角度为 AI 推定', palette: '蓝 / 白' },
  { id: 'w40', keywords: ['污污污山', '武藏星光礼服', '礼服'], shop: 'wuwuwushan', name: '武藏星光礼服', en: 'WUWUWUSHAN 40', category: '连衣裙', status: 'current', price: '¥248', sales: '页面未显示', source: 'https://www.taobao.com/list/item/cUswRVBTRmJkd0JwaUZGWGs0TFNndz09.htm', sourceLabel: '淘宝公开页', detail: '礼服 · 套装配件以四视图呈现为准 · 未展示角度为 AI 推定', palette: '黑' },
  { id: 'w41', keywords: ['污污污山', '白虎虎啸风生', '旗袍'], shop: 'wuwuwushan', name: '白虎虎啸风生', en: 'WUWUWUSHAN 41', category: '连衣裙', status: 'current', price: '¥218', sales: '页面未显示', source: 'https://www.taobao.com/list/product/%E6%B1%A1%E6%B1%A1%E6%B1%A1%E6%B1%A1%E6%B1%A1%E5%B1%B1.htm', sourceLabel: '淘宝公开页', detail: '旗袍 · 套装配件以四视图呈现为准 · 未展示角度为 AI 推定', palette: '黑 / 白 / 金' },
  { id: 'w42', keywords: ['污污污山', '灰姑娘女仆装', '女仆套装'], shop: 'wuwuwushan', name: '灰姑娘女仆装', en: 'WUWUWUSHAN 42', category: '套装', status: 'current', price: '¥198', sales: '页面未显示', source: 'https://my.world.taobao.com/product/%E5%B1%B1cosplay.htm', sourceLabel: '淘宝公开页', detail: '女仆套装 · 套装配件以四视图呈现为准 · 未展示角度为 AI 推定', palette: '黑 / 白' },
  { id: 'w43', keywords: ['污污污山', '兴登堡希尔德旗袍', '旗袍'], shop: 'wuwuwushan', name: '兴登堡希尔德旗袍', en: 'WUWUWUSHAN 43', category: '连衣裙', status: 'current', price: '¥188', sales: '页面未显示', source: 'https://www.taobao.com/chanpin/bc50b93054e8c1ea524134f98072e852.html', sourceLabel: '淘宝公开页', detail: '旗袍 · 套装配件以四视图呈现为准 · 未展示角度为 AI 推定', palette: '黑 / 金' },
  { id: 'w44', keywords: ['污污污山', '毒蛇泳装', '泳衣'], shop: 'wuwuwushan', name: '毒蛇泳装', en: 'WUWUWUSHAN 44', category: '泳衣', status: 'current', price: '¥188', sales: '页面未显示', source: 'https://goods.taobao.com/t/Cosplaynvzhuang_1490/746128c5da5aea8dff52198f804b0d93.html', sourceLabel: '淘宝公开页', detail: '泳衣 · 套装配件以四视图呈现为准 · 未展示角度为 AI 推定', palette: '白' },
  { id: 'w45', keywords: ['污污污山', '妃咲猫耳露背毛衣', '毛衣套装'], shop: 'wuwuwushan', name: '妃咲猫耳露背毛衣', en: 'WUWUWUSHAN 45', category: '套装', status: 'current', price: '¥138', sales: '页面未显示', source: 'https://www.taobao.com/list/dianpu/332309837.htm', sourceLabel: '淘宝公开页', detail: '毛衣套装 · 套装配件以四视图呈现为准 · 未展示角度为 AI 推定', palette: '白 / 灰' },
  { id: 'w46', keywords: ['污污污山', '灰姑娘泳装', '泳衣'], shop: 'wuwuwushan', name: '灰姑娘泳装', en: 'WUWUWUSHAN 46', category: '泳衣', status: 'current', price: '¥108', sales: '页面未显示', source: 'https://th.world.taobao.com/product/%E8%83%9C%E5%88%A9%E5%A5%B3%E7%A5%9Ecos%E5%BE%B7%E5%B0%94%E5%A1%94.htm', sourceLabel: '淘宝公开页', detail: '泳衣 · 套装配件以四视图呈现为准 · 未展示角度为 AI 推定', palette: '白 / 浅灰' },
]

export const products: Product[] = [
  ...qilesanProducts.map(product => ({ ...product, shop: 'qilesan' as const })),
  ...wuwuwushanProducts,
  ...feimuProducts,
  ...malymoonProducts,
  ...kiyoviProducts,
  ...waimengProducts,
  ...detisheProducts,
]
