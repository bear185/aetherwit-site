# Aetherwit 网站 UI/UX 提升方案

> 版本：v1.0  
> 日期：2026-03-08  
> 状态：待评审

---

## 📋 方案概述

本方案基于全面的UI/UX审查，针对Aetherwit网站的现有问题提出系统性改进建议，并新增四项关键任务：移动端首页动画、明亮模式默认化、中英文规范化、以及多语言系统架构。

---

## 🎯 核心任务清单

### 任务一：移动端首页动画特效
**优先级：高 **

#### 设计目标
为移动端首页（Hero Section）设计一套专属动画，在保持桌面端Spotlight效果的同时，针对触屏设备优化交互体验。

#### 技术方案

**1. 触摸追踪光效系统**
```typescript
// 概念：替换鼠标追踪为触摸追踪
interface TouchSpotlightProps {
  // 多点触摸支持（最多3点）
  maxTouchPoints: 3;
  // 触摸点光晕半径
  glowRadius: '120px';
  // 跟随延迟（平滑效果）
  followDelay: 150ms;
  // 双击触发全屏扫描动画
  doubleTapAction: 'scan-effect';
}
```

**2. 滚动触发动画序列**
```
用户滚动首页时触发：
├─ 0-20% 滚动：Hero文字逐字显现
├─ 20-40% 滚动：副标题滑入
├─ 40-60% 滚动：按钮从底部弹入
├─ 60-80% 滚动：背景电路图案亮度递增
└─ 80-100% 滚动：准备显示下一屏内容
```

**3. 手势交互**
- 下滑：显示"下拉刷新"风格的实验室入口
- 长按Hero区域：触发全屏沉浸模式（隐藏UI，只保留背景和核心文字）
- 双指缩放：放大查看背景电路图案细节

**4. 性能优化**
- 使用CSS `touch-action: pan-y` 防止滚动冲突
- 动画仅使用 `transform` 和 `opacity` 属性
- 添加 `will-change` 提示浏览器优化
- 帧率控制在60fps（使用 `requestAnimationFrame`）

#### 设计细节

**视觉风格**
- 保持赛博朋克美学
- 触摸点使用青色脉冲光环（呼应硅基主题）
- 添加轻微的震动反馈（Haptic Feedback API）

**动画参数**
```css
--mobile-animation-duration: 0.4s;
--mobile-easing: cubic-bezier(0.4, 0, 0.2, 1);
--scroll-trigger-offset: 50px;
```

#### 文件修改范围
```
src/components/
├── SpotlightBackground.tsx       # 添加触摸追踪逻辑
├── HeroSection.tsx              # 添加滚动触发动画
└── NEW: MobileHeroAnimation.tsx  # 移动端专属动画组件

src/hooks/
└── NEW: useTouchSpotlight.ts     # 触摸追踪Hook
```

---

### 任务二：明亮模式作为默认显示风格
**优先级：高 | **

#### 当前问题
```tsx
// layout.tsx 第71行
<ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
```
默认主题为dark，与品牌想要传达的"开放、友好、可接近"形象不符。

#### 修改方案

**1. 主题配置修改**
```tsx
// layout.tsx
<ThemeProvider 
  attribute="class" 
  defaultTheme="light"      // 改为light
  enableSystem={false}      // 禁用系统主题跟随
  disableTransitionOnChange={false}  // 保留过渡动画
>
```

**2. 明亮模式色彩优化**

当前明亮模式色彩需要调整以提升专业感：

```css
/* globals.css 优化 */
:root {
  /* 背景：暖白色，更柔和 */
  --background: #FAFAF8;
  
  /* 前景：深蓝黑色，提升阅读性 */
  --foreground: #1E293B;
  
  /* 卡片背景：纯白微透 */
  --card-bg: rgba(255, 255, 255, 0.85);
  
  /* 边框：更柔和的灰色 */
  --border-color: rgba(0, 0, 0, 0.06);
  
  /* 硅基色：降低饱和度，更专业 */
  --color-silicon: #0891B2;  /* cyan-600 */
  
  /* 碳基色：保持温暖 */
  --color-carbon: #EA580C;   /* orange-600 */
  
  /* AI色：神秘紫色 */
  --color-ai: #7C3AED;       /* violet-600 */
}
```

**3. 组件适配清单**

| 组件 | 明亮模式适配点 | 修改建议 |
|------|---------------|----------|
| SpotlightBackground | 电路图案在亮底上不明显 | 增加图案对比度，使用更深的灰色 |
| Navbar | 毛玻璃效果在亮色下发白 | 调整backdrop-blur强度，增加边框可见度 |
| HeroSection | 文字阴影在亮色下过重 | 减少阴影，改用颜色对比 |
| ThemeToggle | 默认显示太阳图标 | 调整初始状态，显示当前为明亮模式 |
| Footer | 边框颜色可能过浅 | 增加边框对比度至0.1 |

**4. 暗色模式保留**
暗色模式作为可选主题完全保留，通过ThemeToggle切换。

---

### 任务三：英文内容中文化（保留专有名词）
**优先级：高 | 预估工时：6-8小时**

#### 处理原则

**保留英文的情况（专有名词）：**
- 品牌名：Aetherwit
- 技术术语：AI、AGI
- 产品名：Aetherwit Town、EXP_01
- 人名：Herosann、61🍚
- URL路径：/projects、/vision（保持不变）

**必须中文化的情况：**
- 所有UI标签
- 按钮文字
- 提示信息
- 状态描述
- 表单标签


#### 逐页审查清单

**1. layout.tsx**
```tsx
// 第31行 - 修改前
description: "Aetherwit 是一个两人 & AI 实验室。碳硅共生的 AGI 游乐场。",

// 第34行 - 修改前
title: "Aetherwit | AGI Playground",

// 第35行 - 修改前
description: "碳硅共生的 AGI 游乐场",
```
（此处无需修改）

**2. page.tsx（首页）**
```tsx
// 无需修改，已是中文
```

**3. HeroSection.tsx**
```tsx
// 第17-19行 - 修改前
<div className="flex items-center gap-3 mb-8 opacity-60 font-mono text-sm tracking-widest text-[var(--color-silicon)] uppercase">
  <Radio className="w-4 h-4 animate-pulse" />
  <span>Signal Established</span>  <!-- 改为：信号已建立 -->
</div>

// 第38-41行 - 修改前
<motion.button
  <Terminal className="w-5 h-5 group-hover:animate-pulse" />
  <span className="font-bold">探索 (Explore)</span>  <!-- 改为：探索 -->
  <span className="terminal-cursor">_</span>
</motion.button>

// 第48-52行 - 修改前
<motion.button>
  <Zap className="w-5 h-5 group-hover:animate-pulse" />
  <span className="font-bold">接入 (Connect)</span>  <!-- 改为：联系我们 -->
</motion.button>
```

**4. Navbar.tsx**
```tsx
// 第37-39行 - 修改前（保持）
<Link href="/" className="font-bold text-lg font-sans">
  Aetherwit<span className="text-[var(--color-silicon)]">.</span>
</Link>

// 第76-78行 - 修改前
<Link href="/auth" className="...">
  登录  <!-- 已是中文，OK -->
</Link>

// 第141行 - 移动端菜单
<span>登录 / 注册</span>  <!-- 已是中文，OK -->
```

**5. Footer.tsx**
```tsx
// 第7-10行 - 修改前
<p className="opacity-60 font-mono text-xs uppercase tracking-widest text-center md:text-left">
  Aetherwit: A Two-Person & AI Lab. <br className="md:hidden" />
  <span className="opacity-40 mt-2 md:mt-0 inline-block">All rights simulated.</span>
</p>

// 改为
<p className="opacity-60 font-mono text-xs uppercase tracking-widest text-center md:text-left">
  Aetherwit：双人 & AI 实验室 <br className="md:hidden" />
  <span className="opacity-40 mt-2 md:mt-0 inline-block">保留所有权利</span>
</p>
```

**6. PageHeader.tsx（所有使用页面）**
```tsx
// 各页面传入的label、subtitle需要检查
// vision/page.tsx: "Philosophy & Vision" → "理念与愿景"
// vision/page.tsx: "AI ：第三位合伙人" → 已是中文，OK

// projects/page.tsx: "Active Nodes" → "项目介绍"
// projects/page.tsx: subtitle 已是中文，OK

// logs/page.tsx: "Build in Public" → "日志公开"
// logs/page.tsx: subtitle 已是中文，OK
```

**7. Contact Page**
```tsx
// 第42-45行 - 修改前
<div className="flex items-center gap-3 mb-8 text-[var(--color-carbon)] font-mono text-sm tracking-widest uppercase">
  <Terminal className="w-4 h-4" />
  <span>Connection Protocol Init</span>  <!-- 改为：连接协议初始化 -->
</div>

// 第58-60行 - 修改前
<div className="flex items-center gap-3 mb-2 text-[var(--color-silicon)]">
  <Mail className="w-5 h-5" />
  <span className="font-mono text-sm uppercase tracking-widest opacity-60">Direct Channel</span>
  <!-- 改为：直接通道 -->
</div>

// 表单标签
<label>Signal Source [Name]</label>     <!-- 改为：信号源 [姓名] -->
<label>Return Frequency [Email]</label> <!-- 改为：返回频率 [邮箱] -->
<label>Payload [Message]</label>        <!-- 改为：载荷 [留言] -->

// 第126行
<span className="font-bold">发送信号 (Transmit Signal)</span>  <!-- 改为：发送信号 -->
```

**8. Auth Page**
```tsx
// 第94-97行 - 修改前
<div className="flex items-center gap-3 mb-8 text-[var(--color-silicon)] font-mono text-sm tracking-widest uppercase">
  <Terminal className="w-4 h-4" />
  <span>Identity Protocol</span>  <!-- 改为：身份认证 -->
</div>

// 第99-101行
<h1 className="text-3xl font-black tracking-tighter mb-2 text-[var(--foreground)]">
  {isLogin ? "登录 (Login)" : "注册 (Register)"}  <!-- 改为：登录 / 注册 -->
</h1>

// 表单标签
<label>昵称 / Username</label>  <!-- 改为：昵称 -->
<label>邮箱 / Email</label>     <!-- 改为：邮箱 -->
<label>密码 / Password</label>  <!-- 改为：密码 -->

// 第189-198行
<span>Processing...</span>           <!-- 改为：处理中... -->
<span>{isLogin ? "接入 (Login)" : "注册 (Register)"}</span>  <!-- 改为：登录 / 注册 -->
```

**9. ExperimentCard.tsx**
```tsx
// status显示已是英文（Running/Compiling/Simulating）
// 建议改为：运行中 / 编译中 / 模拟中
```

**10. Modal.tsx**
```tsx
// 第95行
<p className="font-mono text-sm opacity-60 mb-6 uppercase tracking-widest">Coming Soon</p>
<!-- 改为：即将推出 -->
```

**11. Log Detail Page**
```tsx
// 第40-43行
<div className="flex items-center gap-3 mb-4 font-mono text-sm uppercase tracking-widest text-[var(--color-silicon)]">
  <Radio className="w-4 h-4 animate-pulse" />
  <span>LOG_ENTRY_DETECTED</span>  <!-- 改为：日志条目已检测 -->
</div>
```

**12. Profile Components**
```tsx
// IdentityCard.tsx
<span>Identity Verified</span>  <!-- 改为：身份已验证 -->
<span>入驻日期</span>           <!-- 已是中文，OK -->

// StatusDashboard.tsx
<span>意识在线</span>    <!-- 已是中文，OK -->
<span>碳硅共鸣</span>    <!-- 已是中文，OK -->
<span>信号强度</span>    <!-- 已是中文，OK -->
```

#### 实施策略

**方案A：硬编码替换（推荐）**
- 直接修改各组件中的静态文本
- 优点：简单直接，无需额外依赖
- 缺点：未来扩展多语言需要重构

**方案B：准备i18n结构（预留）**
- 创建 `src/i18n/content.ts` 文件
- 将中文内容提取为常量
- 为未来多语言切换做准备

```typescript
// src/i18n/content.ts
export const zhCN = {
  nav: {
    vision: '愿景',
    projects: '项目站与实验室',
    logs: '日志记录',
    login: '登录',
  },
  hero: {
    signalEstablished: '信号已建立',
    explore: '探索',
    connect: '接入',
  },
  // ... 其他内容
};
```

---

### 任务四：多语言切换系统设计
**优先级：中 |**

#### 系统架构设计

**1. 技术选型**
```
推荐方案：next-intl
理由：
- 完美支持Next.js App Router
- 类型安全
- 支持服务端组件
- 轻量级（~12KB gzipped）
- 活跃维护

备选方案：react-i18next
- 更成熟，生态更丰富
- 但配置较复杂
```

**2. 目录结构**
```
src/
├── i18n/
│   ├── config.ts              # 国际化配置
│   ├── locales/
│   │   ├── zh-CN.json         # 简体中文
│   │   ├── en-US.json         # 英文（美国）
│   │   └── ja-JP.json         # 日文（预留）
│   └── types.ts               # 类型定义
├── middleware.ts              # 语言路由中间件
└── components/
    └── LanguageSwitcher.tsx   # 语言切换组件
```

**3. URL策略**

采用子路径策略（推荐）：
```
/zh-CN/          # 简体中文（默认）
/zh-CN/vision    # 中文愿景页
/en-US/          # 英文首页
/en-US/vision    # 英文愿景页
```

**4. 语言配置**

```typescript
// src/i18n/config.ts
export const locales = ['zh-CN', 'en-US'] as const;
export const defaultLocale = 'zh-CN';

export type Locale = typeof locales[number];

export const localeLabels: Record<Locale, { label: string; flag: string }> = {
  'zh-CN': { label: '简体中文', flag: '🇨🇳' },
  'en-US': { label: 'English', flag: '🇺🇸' },
};
```

**5. 语言切换组件设计**

```tsx
// components/LanguageSwitcher.tsx
interface LanguageSwitcherProps {
  variant?: 'dropdown' | 'buttons' | 'minimal';
  position?: 'navbar' | 'footer' | 'floating';
}

// 设计方案A：下拉菜单（Navbar右侧）
// 设计方案B：按钮组（Footer）
// 设计方案C：极简图标（Floating，移动端）
```

**视觉设计规范**
```
位置：Navbar右侧，紧邻主题切换器
样式：
- 当前语言高亮显示
- 下拉菜单使用卡片样式
- 添加国旗emoji（或使用SVG图标）
- 悬停显示语言全称

动画：
- 切换时页面淡入淡出（300ms）
- 语言标记滑动过渡
```

**6. 内容翻译策略**

**英文版本内容规划：**

```json
// en-US.json 核心内容示例
{
  "metadata": {
    "title": "Aetherwit | AGI Playground",
    "description": "Aetherwit is a Two-Person & AI Lab. A playground for carbon-silicon symbiosis."
  },
  "nav": {
    "vision": "Vision",
    "projects": "Projects & Lab",
    "logs": "Build Logs",
    "login": "Sign In",
    "profile": "Profile"
  },
  "hero": {
    "signalStatus": "Signal Established",
    "headline": "Don't rush to change the world,",
    "subheadline": "start by changing the rules of the game.",
    "description": "Aetherwit is an AGI playground. The great carbon-silicon symbiosis deduction starts with 'fun'.",
    "ctaPrimary": "Explore",
    "ctaSecondary": "Connect"
  },
  // ... 其他页面内容
}
```

**文化适配注意事项：**
- 英文版本需要调整部分中文特有的表达
- Hero区域的口号可能需要重新创作，而非直译
- 保持品牌的"赛博朋克"调性在英文中同样成立
- 日期格式：MM/DD/YYYY（美国）vs DD/MM/YYYY（英国）

**7. SEO与元数据**

```typescript
// 为每种语言生成独立的meta标签
export async function generateMetadata({ 
  params: { locale } 
}: { 
  params: { locale: Locale } 
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'metadata' });
  
  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `/${locale}`,
      languages: {
        'zh-CN': '/zh-CN',
        'en-US': '/en-US',
      },
    },
  };
}
```

**8. 用户语言偏好持久化**

```typescript
// 优先级：URL参数 > Cookie > LocalStorage > 浏览器语言 > 默认
const detectLocale = (): Locale => {
  // 1. 检查URL路径
  const pathname = window.location.pathname;
  const pathLocale = pathname.split('/')[1];
  if (locales.includes(pathLocale as Locale)) return pathLocale as Locale;
  
  // 2. 检查Cookie
  const cookieLocale = getCookie('NEXT_LOCALE');
  if (cookieLocale && locales.includes(cookieLocale as Locale)) {
    return cookieLocale as Locale;
  }
  
  // 3. 检查浏览器语言
  const browserLocale = navigator.language;
  if (browserLocale.startsWith('zh')) return 'zh-CN';
  if (browserLocale.startsWith('en')) return 'en-US';
  
  // 4. 默认
  return defaultLocale;
};
```

**9. 未来扩展接口**

预留日语、韩语支持：
```typescript
// src/i18n/config.ts
export const futureLocales = ['ja-JP', 'ko-KR'] as const;

// 只需添加：
// 1. ja-JP.json 翻译文件
// 2. 更新 locales 数组
// 3. 添加日语字体支持（Noto Sans JP）
```

---

## 🔧 基础优化任务（原有审查建议）

### 1. 可访问性改进

**颜色对比度修复**
```css
/* 修复前 */
.opacity-40 { opacity: 0.4; } /* 对比度不足 */

/* 修复后 */
.text-secondary {
  color: rgba(var(--foreground), 0.7); /* 确保4.5:1对比度 */
}
```

**焦点状态**
```css
/* 为所有交互元素添加 */
:focus-visible {
  outline: 2px solid var(--color-silicon);
  outline-offset: 2px;
}
```

### 2. 交互反馈改进

**添加cursor-pointer**
```tsx
// ExperimentCard.tsx
<motion.div
  whileHover={{ scale: 1.02 }}
  className="... cursor-pointer"  // 添加此行
>
```

**减少动画抖动**
```tsx
// 将scale动画改为transform
// 修复前
whileHover={{ scale: 1.02 }}

// 修复后（添加will-change）
className="... will-change-transform"
whileHover={{ scale: 1.02 }}
transition={{ type: "spring", stiffness: 300, damping: 20 }}
```

### 3. 响应式优化

**断点统一**
```css
/* 定义标准断点 */
--breakpoint-sm: 640px;
--breakpoint-md: 768px;
--breakpoint-lg: 1024px;
--breakpoint-xl: 1280px;
--breakpoint-2xl: 1536px;
```

**移动端Timeline重构**
```tsx
// 移动端改为卡片布局而非时间线
// 使用CSS Grid替代绝对定位
```

---

## 📊 实施计划与资源分配

### 阶段一：基础修复（第1周）
- [ ] 修复颜色对比度问题
- [ ] 添加所有cursor-pointer
- [ ] 修改默认主题为明亮模式
- [ ] 英文内容中文化

**负责人：** 前端开发者  
**工时：** 16-20小时

### 阶段二：功能开发（第2周）
- [ ] 移动端首页动画特效
- [ ] 多语言系统架构搭建
- [ ] 英文版本翻译
- [ ] 语言切换组件开发

**负责人：** 前端开发者 + 翻译协作  
**工时：** 24-28小时

### 阶段三：测试优化（第3周）
- [ ] 移动端多设备测试
- [ ] 可访问性审计（axe-core）
- [ ] 性能测试（Lighthouse）
- [ ] 语言切换流程测试

**负责人：** QA + 前端开发者  
**工时：** 12-16小时

### 阶段四：部署上线（第4周）
- [ ] 预发布环境验证
- [ ] SEO验证（多语言hreflang）
- [ ] 生产环境部署
- [ ] 监控与回滚预案

**负责人：** DevOps + 全团队  
**工时：** 8小时

---

## 🎨 设计资源需求

### 需要设计支持的内容
1. 移动端Hero动画的交互原型（Figma）
2. 语言切换器的视觉设计规范
3. 英文版本的Hero口号重新创作
4. 移动端Timeline的卡片布局设计

### 技术资源需求
```json
{
  "dependencies": {
    "next-intl": "^3.0.0",
    "@formatjs/intl-localematcher": "^0.5.0",
    "negotiator": "^0.6.0"
  },
  "devDependencies": {
    "@axe-core/react": "^4.8.0",
    "lighthouse": "^11.0.0"
  }
}
```

---

## ✅ 验收标准

### 功能验收
- [ ] 移动端首页有专属的触摸追踪动画
- [ ] 默认打开网站显示明亮模式
- [ ] 所有非专有名词均为中文
- [ ] 可通过切换器在中文/英文间切换
- [ ] 语言切换后URL正确更新
- [ ] 语言偏好被正确保存

### 性能验收
- [ ] Lighthouse Accessibility分数 ≥ 95
- [ ] Lighthouse Performance分数 ≥ 90
- [ ] 移动端动画帧率稳定在60fps
- [ ] 首屏加载时间 < 2s（4G网络）

### 体验验收
- [ ] 所有可点击元素有cursor-pointer
- [ ] 焦点状态清晰可见
- [ ] 语言切换无页面闪烁
- [ ] 移动端手势操作流畅
- [ ] 暗/亮模式切换平滑

---

## 📝 附录

### A. 保留英文专有名词完整清单
```
品牌与产品：
- Aetherwit
- Aetherwit Town
- EXP_01 / EXP_02 / EXP_03
- LIFE_JOURNEY
- MUSIC_SYNTH

技术术语：
- AI (Artificial Intelligence)
- AGI (Artificial General Intelligence)

人名：
- Herosann
- 61🍚

URL路径（保持不变）：
- /projects
- /vision
- /logs
- /contact
- /auth
- /profile
```

### B. 中英对照术语表
```
碳硅共生 - Carbon-Silicon Symbiosis
AGI游乐场 - AGI Playground
项目站 - Projects Station
实验室 - Laboratory
观测日志 - Observation Logs
信号 - Signal
意识在线 - Consciousness Online
碳硅共鸣 - Carbon-Silicon Resonance
```

### C. 风险评估

| 风险 | 影响 | 概率 | 缓解措施 |
|------|------|------|----------|
| 多语言SEO配置错误 | 高 | 中 | 使用next-intl官方方案，充分测试hreflang |
| 移动端动画性能问题 | 中 | 中 | 使用CSS动画优先，添加低端设备检测 |
| 翻译质量不佳 | 中 | 低 | 聘请专业译者审核，保持品牌调性 |
| 主题切换闪烁 | 低 | 中 | 使用next-themes的disableTransitionOnChange |

---


