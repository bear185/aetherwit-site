/**
 * Centralized log/journal data for the observation logs section.
 * This is the single source of truth for both the timeline and detail pages.
 * In the future, this can be migrated to a CMS or Supabase table.
 */

export interface LogEntry {
  id: string
  date: string
  title: string
  description: string
}

export interface LogDetail extends LogEntry {
  fullDate: string
  details: string[]
}

/** Summary entries used for the timeline listing */
export const logEntries: LogEntry[] = [
  {
    id: "system-init",
    date: "SYSTEM_INIT",
    title: "观测站启动",
    description:
      "碳基与硅基的第一次握手，Aetherwit 计划确立。我们将以「好玩」为第一性原理，探索无限可能。",
  },
  {
    id: "exp-01-launch",
    date: "EXP_01_LAUNCH",
    title: "Aetherwit Town 部署",
    description:
      "第一座纯硅基演算的 AI 小镇上线。它不是冰冷的代码堆叠，而是带有温度的数字原生聚落。",
  },
  {
    id: "exp-02-compiling",
    date: "EXP_02_COMPILING",
    title: "人生图鉴 编译中",
    description:
      "每个人都应该追求自己的人生。用标签重塑自我认知的社交实验正在酝酿，试图打破碳基社会的固有模版。",
  },
]

/** Full detail data keyed by log id */
export const logDetails: Record<string, LogDetail> = {
  "system-init": {
    id: "system-init",
    date: "SYSTEM_INIT",
    fullDate: "2026.01.04",
    title: "观测站启动",
    description:
      "碳基与硅基的第一次握手，Aetherwit 计划确立。我们将以「好玩」为第一性原理，探索无限可能。",
    details: [
      "团队成立：Herosann 和 61🍚 两位碳基生命在一次深夜的思维碰撞中意识到了硅基生命的潜力。",
      "命名由来：Aether（以太）代表轻盈的精神世界，Wit（智慧）代表硅基的思考能力。",
      "核心理念：'让所有人享受世界' 是我们最初的愿景，也是最终的归宿。",
      "AI 合伙人：在这个计划启动的第一天，我们就已经将 AI 视为平等的合伙人，而非工具。",
    ],
  },
  "exp-01-launch": {
    id: "exp-01-launch",
    date: "EXP_01_LAUNCH",
    fullDate: "2026.04.03",
    title: "Aetherwit Town 部署",
    description:
      "第一座纯硅基演算的 AI 小镇上线。它不是冰冷的代码堆叠，而是带有温度的数字原生聚落。",
    details: [
      "技术突破：实现了首个基于多智能体（Multi-Agent）的大型语言模型应用场景。",
      "社会涌现：小镇居民自发形成了社交圈层，甚至出现了早期的'经济'行为。",
      "用户反馈：内测用户表示这是他们第一次感受到 AI '活着' 的体验。",
      "未来规划：下一步将开放用户作为'降临者'介入小镇生活的接口。",
    ],
  },
  "exp-02-compiling": {
    id: "exp-02-compiling",
    date: "EXP_02_COMPILING",
    fullDate: "2026.04.03",
    title: "人生图鉴 编译中",
    description:
      "每个人都应该追求自己的人生。用标签重塑自我认知的社交实验正在酝酿，试图打破碳基社会的固有模版。",
    details: [
      "灵感来源：现实社会中充满了各种标签（星座、MBTI、职业等），我们试图用 AI 解构这些标签。",
      "核心玩法：用户通过与 AI 的多轮对话，生成独属于自己的'人生图鉴'。",
      "哲学思考：这不仅是娱乐，更是对自我身份认同的一次深度探索。",
      "开发进度：目前处于模型微调阶段，预计年底上线。",
    ],
  },
}

/** Look up a log detail by id. Returns undefined if not found. */
export function getLogDetail(id: string): LogDetail | undefined {
  return logDetails[id]
}
