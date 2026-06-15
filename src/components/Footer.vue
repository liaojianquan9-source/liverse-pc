<template>
  <footer class="footer">
    <div class="container">
      <div class="footer-top">
        <div class="footer-brand">
          <div class="logo">
            <img :src="getPublicAssetUrl('logo.png')" alt="Liverse Hall" class="logo-img" />
          </div>
          <p class="brand-desc">
            致力于为观众带来最精彩的现场演出体验
          </p>
        </div>

        <div class="footer-links">
          <div class="link-group">
            <h4>快速导航</h4>
            <a href="#home" @click.prevent="scrollTo('#home')">首页</a>
            <a href="#events" @click.prevent="scrollTo('#events')">演出</a>
            <a href="#gallery" @click.prevent="scrollTo('#gallery')">场馆</a>
            <a href="#faq" @click.prevent="scrollTo('#faq')">FAQ</a>
          </div>
          <div class="link-group">
            <h4>关注我们</h4>
            <a href="#" @click.prevent>微信公众号</a>
            <a href="#" @click.prevent>微博</a>
            <a href="#" @click.prevent>小红书</a>
            <a href="#" @click.prevent>Bilibili</a>
          </div>
          <div class="link-group">
            <h4>联系我们</h4>
            <span>电话：021-1234-5678</span>
            <span>邮箱：info@liversehall.com</span>
            <span>地址：XX市XX区XX路XX号</span>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p> Liverse Hall. All rights reserved.</p>
        <div class="footer-legal">
          <a href="#" @click.prevent>隐私政策</a>
          <a href="#" @click.prevent>使用条款</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { getPublicAssetUrl } from '../utils/assets.js'

function scrollTo(selector) {
  const el = document.querySelector(selector)
  if (el) {
    el.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style scoped>
.footer {
  background: var(--bg-secondary);
  border-top: 1px solid var(--border-subtle);
  padding: var(--space-9) 0 var(--space-6);
}

.footer-top {
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--space-8);
  margin-bottom: var(--space-8);
}

@media (min-width: 768px) {
  .footer-top {
    grid-template-columns: 280px 1fr;
  }
}

.footer-brand .logo {
  display: flex;
  align-items: center;
  margin-bottom: var(--space-4);
}

.logo-img {
  height: 32px;
  width: auto;
  display: block;
}

.brand-desc {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.7;
  max-width: 280px;
}

.footer-links {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-6);
}

@media (min-width: 640px) {
  .footer-links {
    grid-template-columns: repeat(3, 1fr);
  }
}

.link-group h4 {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: var(--space-4);
  letter-spacing: 0.02em;
}

.link-group a,
.link-group span {
  display: block;
  font-size: 14px;
  color: var(--text-secondary);
  text-decoration: none;
  margin-bottom: var(--space-3);
  transition: color 0.2s ease;
}

.link-group a:hover {
  color: var(--accent-primary);
}

.footer-bottom {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
  padding-top: var(--space-6);
  border-top: 1px solid var(--border-subtle);
}

@media (min-width: 640px) {
  .footer-bottom {
    flex-direction: row;
    justify-content: space-between;
  }
}

.footer-bottom p {
  font-size: 13px;
  color: var(--text-muted);
}

.footer-legal {
  display: flex;
  gap: var(--space-5);
}

.footer-legal a {
  font-size: 13px;
  color: var(--text-muted);
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer-legal a:hover {
  color: var(--text-secondary);
}
</style>
