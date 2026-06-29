const translations = {
  en: {
    "nav.gameplay": "Gameplay",
    "nav.features": "Features",
    "nav.privacy": "Privacy",
    "hero.eyebrow": "Minimalist 3D puzzle game for iPhone and iPad",
    "hero.title": "Find your third direction.",
    "hero.lede": "You thought the world had four directions: up, down, left, right. Then the wall you could not pass became a path when you changed your view.",
    "hero.primary": "See how it plays",
    "hero.secondary": "Privacy-first design",
    "stats.levels": "campaign levels",
    "stats.chapters": "chapters",
    "stats.random": "seeded random mazes",
    "gameplay.eyebrow": "Core gameplay",
    "gameplay.title": "A 3D maze, understood as flat slices.",
    "gameplay.body": "Move the slime on the visible 2D plane with one-finger swipes. Rotate the cube to reveal another slice of the same maze, then use the new perspective to reach the exit door.",
    "features.eyebrow": "What is inside",
    "features.title": "Built for short sessions and deep spatial thinking.",
    "features.campaign.title": "Handcrafted campaign",
    "features.campaign.body": "120 levels across five chapters, ordered from approachable puzzles to dense cube labyrinths.",
    "features.rotation.title": "Perspective switching",
    "features.rotation.body": "Rotate between views to turn hidden depth into usable paths.",
    "features.hint.title": "3D hints",
    "features.hint.body": "Need a nudge? Use an inline bird’s-eye hint to inspect the cube without leaving the game.",
    "features.random.title": "Seeded random mode",
    "features.random.body": "Generate new mazes, share seeds, and replay the same challenge later.",
    "features.gamecenter.title": "Game Center",
    "features.gamecenter.body": "Campaign leaderboards and achievements reward clean solves.",
    "features.language.title": "English and Chinese",
    "features.language.body": "The game and this website support English and Simplified Chinese.",
    "quote.text": "“In this sliced labyrinth, learn to shift your perspective.”",
    "privacy.eyebrow": "Privacy-first",
    "privacy.title": "No ads. No tracking. No analytics SDK.",
    "privacy.body": "CubeMaze uses Apple Game Center for leaderboards and StoreKit for purchases. Progress, coins, settings, and random preferences stay local unless Apple services are used.",
    "privacy.en": "Privacy Policy · English",
    "privacy.zh": "隐私政策 · 简体中文",
    "terms.en": "Terms · English",
    "terms.zh": "服务条款 · 简体中文"
  },
  zh: {
    "nav.gameplay": "玩法",
    "nav.features": "特色",
    "nav.privacy": "隐私",
    "hero.eyebrow": "适合 iPhone 与 iPad 的极简 3D 解谜游戏",
    "hero.title": "找到第三个方向。",
    "hero.lede": "你曾以为世界只有上下左右。直到某一天，那堵无法翻越的墙，只要切换一个角度就能绕过。",
    "hero.primary": "了解核心玩法",
    "hero.secondary": "隐私优先设计",
    "stats.levels": "闯关关卡",
    "stats.chapters": "章节",
    "stats.random": "种子随机迷宫",
    "gameplay.eyebrow": "核心玩法",
    "gameplay.title": "用二维切片理解三维迷宫。",
    "gameplay.body": "在当前可见的二维平面中单指滑动移动史莱姆。旋转方块，切换到同一个迷宫的另一个切面，再利用新的视角找到出口之门。",
    "features.eyebrow": "游戏内容",
    "features.title": "适合碎片时间，也足够考验空间感。",
    "features.campaign.title": "手工关卡",
    "features.campaign.body": "5 个章节，120 个关卡，从入门谜题逐步进入复杂立方迷宫。",
    "features.rotation.title": "切换视角",
    "features.rotation.body": "通过旋转视角，把隐藏的深度变成可以行走的路径。",
    "features.hint.title": "3D 提示",
    "features.hint.body": "卡住时，可以在游戏区原地打开鸟瞰提示，查看方块结构而不离开当前关卡。",
    "features.random.title": "种子随机模式",
    "features.random.body": "生成新迷宫，分享种子，也可以稍后重玩同一个挑战。",
    "features.gamecenter.title": "Game Center",
    "features.gamecenter.body": "闯关排行榜与成就记录更干净的解法。",
    "features.language.title": "中英文支持",
    "features.language.body": "游戏与官网均支持英文和简体中文。",
    "quote.text": "“在这座由切片构成的迷宫里，学会切换视角。”",
    "privacy.eyebrow": "隐私优先",
    "privacy.title": "无广告，无追踪，无分析 SDK。",
    "privacy.body": "CubeMaze 使用 Apple Game Center 提供排行榜，使用 StoreKit 处理购买。除非使用 Apple 服务，进度、金币、设置和随机偏好都保存在本地。",
    "privacy.en": "Privacy Policy · English",
    "privacy.zh": "隐私政策 · 简体中文",
    "terms.en": "Terms · English",
    "terms.zh": "服务条款 · 简体中文"
  }
};

const languageKey = "cubemaze.website.language";
const supportedLanguages = ["en", "zh"];

function preferredLanguage() {
  const stored = localStorage.getItem(languageKey);
  if (supportedLanguages.includes(stored)) return stored;
  const browserLanguages = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language];
  return browserLanguages.some((language) => language && language.toLowerCase().startsWith("zh")) ? "zh" : "en";
}

function applyLanguage(language) {
  const lang = supportedLanguages.includes(language) ? language : "en";
  document.documentElement.lang = lang === "zh" ? "zh-Hans" : "en";
  document.documentElement.dataset.lang = lang;
  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.dataset.i18n;
    const value = translations[lang][key];
    if (value) element.textContent = value;
  });
  const label = document.querySelector("[data-lang-label]");
  if (label) label.textContent = lang === "zh" ? "English" : "中文";
  localStorage.setItem(languageKey, lang);
}

document.addEventListener("DOMContentLoaded", () => {
  applyLanguage(preferredLanguage());
  const year = document.querySelector("[data-year]");
  if (year) year.textContent = new Date().getFullYear().toString();
  const toggle = document.querySelector("[data-language-toggle]");
  if (toggle) {
    toggle.addEventListener("click", () => {
      applyLanguage(document.documentElement.dataset.lang === "zh" ? "en" : "zh");
    });
  }
});
