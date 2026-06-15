<template>
  <div class="page-view">
    <div class="page-hero">
      <div class="page-hero-bg" style="background-image: url('https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=1600&h=600&fit=crop')"></div>
      <div class="page-hero-overlay"></div>
      <div class="container">
        <h1 class="page-title">最新资讯</h1>
        <p class="page-subtitle">NEWS</p>
      </div>
    </div>

    <section class="section">
      <div class="container">
        <div class="news-grid">
          <article v-for="news in newsList" :key="news.id" class="news-card">
            <div class="news-image">
              <img :src="news.image" :alt="news.title" loading="lazy" />
            </div>
            <div class="news-content">
              <span class="news-date">{{ news.date }}</span>
              <span :class="['news-tag', news.category]">{{ news.categoryText }}</span>
              <h3 class="news-title">{{ news.title }}</h3>
              <p class="news-excerpt">{{ news.excerpt }}</p>
              <a href="#" class="news-link" @click.prevent>阅读全文 →</a>
            </div>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
const newsList = [
  {
    id: 'news-001',
    date: '2026.06.10',
    category: 'event',
    categoryText: '演出',
    title: '星空交响音乐会门票今日开售',
    excerpt: '上海交响乐团倾情呈现的星空主题音乐盛宴将于 6 月 20 日上演，今日 10:00 正式开票。',
    image: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=600&h=400&fit=crop'
  },
  {
    id: 'news-002',
    date: '2026.05.28',
    category: 'info',
    categoryText: '通知',
    title: '场馆暑期开放时间调整公告',
    excerpt: '因设备维护需要，Liverse Hall 将于 7 月 1 日至 7 月 5 日暂停对外开放，已购票观众可联系客服处理。',
    image: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=600&h=400&fit=crop'
  },
  {
    id: 'news-003',
    date: '2026.05.15',
    category: 'event',
    categoryText: '演出',
    title: '独立摇滚之夜阵容公布',
    excerpt: '草东没有派对 × 落日飞车双专场正式确认！6 月 25 日，不见不散。',
    image: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=400&fit=crop'
  },
  {
    id: 'news-004',
    date: '2026.04.20',
    category: 'media',
    categoryText: '媒体',
    title: 'Liverse Hall 入选「2026 年度最佳 livehouse」',
    excerpt: '凭借卓越的声学设计与观众体验，Liverse Hall 被音乐媒体评选为年度推荐场馆。',
    image: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=600&h=400&fit=crop'
  },
  {
    id: 'news-005',
    date: '2026.04.01',
    category: 'info',
    categoryText: '通知',
    title: '新会员系统正式上线',
    excerpt: 'Liverse Hall 会员系统全新升级，购票优先权、积分兑换、专属活动等福利同步开启。',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=600&h=400&fit=crop'
  },
  {
    id: 'news-006',
    date: '2026.03.10',
    category: 'event',
    categoryText: '演出',
    title: '世界音乐之旅巡演嘉宾揭晓',
    excerpt: '丝绸之路乐团将携 8 国音乐家登台，7 月 22 日开启跨越国界的音乐对话。',
    image: 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=600&h=400&fit=crop'
  }
]
</script>

<style scoped>
.page-view { padding-top: 72px; }
.page-hero {
  position: relative;
  height: 320px;
  display: flex;
  align-items: flex-end;
  padding-bottom: 60px;
  overflow: hidden;
}
.page-hero-bg {
  position: absolute;
  inset: 0;
  background-size: cover;
  background-position: center;
}
.page-hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(10,10,10,0.95) 0%, rgba(10,10,10,0.5) 60%, transparent 100%);
}
.page-title {
  position: relative;
  z-index: 1;
  font-size: clamp(32px, 5vw, 48px);
  font-weight: 700;
  margin-bottom: 8px;
}
.page-subtitle {
  position: relative;
  z-index: 1;
  font-size: 14px;
  color: var(--text-muted);
  letter-spacing: 0.1em;
  font-family: var(--font-mono);
}
.section { padding: var(--space-9) 0; }

.news-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-5);
}
.news-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-subtle);
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.3s ease;
}
.news-card:hover {
  border-color: var(--border-strong);
  transform: translateY(-4px);
}
.news-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
}
.news-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.4s ease;
}
.news-card:hover .news-image img {
  transform: scale(1.05);
}
.news-content {
  padding: var(--space-5);
}
.news-date {
  font-size: 12px;
  color: var(--text-muted);
  font-family: var(--font-mono);
}
.news-tag {
  display: inline-block;
  margin-left: 8px;
  padding: 2px 8px;
  font-size: 11px;
  font-weight: 600;
  border-radius: 4px;
}
.news-tag.event { background: var(--accent-primary); color: var(--text-inverse); }
.news-tag.info { background: var(--bg-elevated); color: var(--text-secondary); border: 1px solid var(--border-default); }
.news-tag.media { background: var(--warning); color: var(--text-inverse); }
.news-title {
  font-size: 17px;
  font-weight: 600;
  margin: var(--space-3) 0;
  line-height: 1.4;
}
.news-excerpt {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: var(--space-3);
}
.news-link {
  font-size: 14px;
  color: var(--accent-primary);
  font-weight: 500;
  text-decoration: none;
}
.news-link:hover {
  text-decoration: underline;
}

@media (max-width: 1024px) {
  .news-grid { grid-template-columns: repeat(2, 1fr); }
}
@media (max-width: 768px) {
  .page-hero { height: 240px; padding-bottom: 40px; }
  .news-grid { grid-template-columns: 1fr; }
}
</style>
