<template>
  <div class="page-view">
    <div class="page-hero">
      <div class="page-hero-bg" style="background-image: url('https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=1600&h=600&fit=crop')"></div>
      <div class="page-hero-overlay"></div>
      <div class="container">
        <h1 class="page-title">联系方式</h1>
        <p class="page-subtitle">CONTACT</p>
      </div>
    </div>

    <section class="section">
      <div class="container">
        <div class="contact-grid">
          <!-- 商务合作 -->
          <div class="contact-card contact-info">
            <h2 class="contact-heading">商务合作</h2>
            <div class="contact-brand">LIVERSE</div>
            <ul class="contact-list">
              <li>
                <span class="label">联系电话</span>
                <a href="tel:0512-59205222" class="value">0512-59205222</a>
              </li>
              <li>
                <span class="label">场地合作</span>
                <a href="mailto:booking@liverse.com" class="value">booking@liverse.com</a>
              </li>
              <li>
                <span class="label">品牌合作</span>
                <a href="mailto:cobrand@liverse.com" class="value">cobrand@liverse.com</a>
              </li>
            </ul>
          </div>

          <!-- 二维码 -->
          <div class="contact-card qr-card">
            <div class="qr-item">
              <div class="qr-image">
                <img :src="getPublicAssetUrl('contact-wechat-qr.jpg')" alt="微信公众号" />
              </div>
              <span class="qr-label">微信公众号</span>
            </div>
            <div class="qr-item">
              <div class="qr-image">
                <img :src="getPublicAssetUrl('contact-ticket-qr.jpg')" alt="微信购票小程序" />
              </div>
              <span class="qr-label">微信购票小程序</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section section-alt">
      <div class="container">
        <h2 class="section-title">场馆地址</h2>
        <div class="address-grid">
          <div class="address-card">
            <h3>北京场馆</h3>
            <p>北京市通州区胡家垡村甲9号院9号楼1层101</p>
          </div>
          <div class="address-card">
            <h3>上海场馆</h3>
            <p>上海市徐汇区叠彩路133号1-3层剧场</p>
          </div>
          <div class="address-card">
            <h3>苏州场馆</h3>
            <p>江苏省苏州市吴中区数智影视文化产业园（木渎影视城）5号楼</p>
          </div>
        </div>
        <p class="coming-soon">广州、深圳、东莞、长沙、郑州即将起航</p>
      </div>
    </section>

    <section class="section cta-section">
      <div class="container">
        <div class="cta-grid">
          <a href="mailto:booking@liverse.com" class="cta-card">
            <Icon name="calendar" :size="32" :stroke-width="1.5" />
            <span>场馆预定</span>
          </a>
          <router-link to="/contact" class="cta-card">
            <Icon name="mail" :size="32" :stroke-width="1.5" />
            <span>联系我们</span>
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { getPublicAssetUrl } from '../utils/assets.js'
import Icon from '../components/Icon.vue'
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
.section-alt { background: var(--bg-secondary); }
.section-title {
  font-size: clamp(24px, 3vw, 32px);
  font-weight: 700;
  text-align: center;
  margin-bottom: var(--space-6);
}

.contact-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-6);
  max-width: 1100px;
  margin: 0 auto;
}

@media (min-width: 768px) {
  .contact-grid {
    grid-template-columns: 1.2fr 0.8fr;
  }
}

.contact-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-subtle);
  border-radius: 16px;
  padding: var(--space-7);
}

.contact-heading {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-muted);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: var(--space-4);
}

.contact-brand {
  font-size: 32px;
  font-weight: 700;
  margin-bottom: var(--space-6);
  letter-spacing: 0.05em;
}

.contact-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.contact-list li {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.contact-list .label {
  font-size: 13px;
  color: var(--text-muted);
}

.contact-list .value {
  font-size: 16px;
  color: var(--text-primary);
  text-decoration: none;
  transition: color 0.2s ease;
}

.contact-list .value:hover {
  color: var(--accent-primary);
}

.qr-card {
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: var(--space-5);
  flex-wrap: wrap;
}

.qr-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-3);
  flex: 1;
  min-width: 140px;
}

.qr-image {
  width: 140px;
  height: 140px;
  border-radius: 12px;
  overflow: hidden;
  background: var(--bg-primary);
  border: 1px solid var(--border-subtle);
}

.qr-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.qr-label {
  font-size: 13px;
  color: var(--text-secondary);
  text-align: center;
}

.address-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-5);
  max-width: 1000px;
  margin: 0 auto var(--space-6);
}

@media (min-width: 640px) {
  .address-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 1024px) {
  .address-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

.address-card {
  background: var(--bg-primary);
  border: 1px solid var(--border-subtle);
  border-radius: 12px;
  padding: var(--space-6);
}

.address-card h3 {
  font-size: 18px;
  font-weight: 600;
  margin-bottom: var(--space-3);
}

.address-card p {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.7;
  margin: 0;
}

.coming-soon {
  text-align: center;
  font-size: 15px;
  color: var(--text-muted);
  margin-top: var(--space-6);
}

.cta-section {
  padding-top: var(--space-8);
  padding-bottom: var(--space-8);
}

.cta-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-5);
  max-width: 600px;
  margin: 0 auto;
}

@media (min-width: 480px) {
  .cta-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

.cta-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-6);
  border-radius: 12px;
  border: 1px solid var(--border-subtle);
  background: var(--bg-secondary);
  color: var(--text-primary);
  text-decoration: none;
  font-size: 16px;
  font-weight: 600;
  transition: all 0.2s ease;
}

.cta-card:hover {
  border-color: var(--accent-primary);
  color: var(--accent-primary);
  background: rgba(242, 101, 34, 0.08);
}

@media (max-width: 768px) {
  .page-hero { height: 240px; padding-bottom: 40px; }
  .qr-image {
    width: 120px;
    height: 120px;
  }
}
</style>
