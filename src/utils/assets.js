/**
 * 获取 public 目录下静态资源的完整 URL
 * 会自动适配 Vite 的 base 配置（本地开发为 /，GitHub Pages 为 /liverse-pc/）
 * @param {string} path - 资源路径，如 'logo.png' 或 '/logo.png'
 * @returns {string} 完整资源 URL
 */
export function getPublicAssetUrl(path) {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path
  return `${import.meta.env.BASE_URL}${cleanPath}`
}
