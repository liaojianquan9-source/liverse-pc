<template>
  <div class="page-view">
    <div class="page-hero">
      <div class="page-hero-bg" style="background-image: url('https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1600&h=600&fit=crop')"></div>
      <div class="page-hero-overlay"></div>
      <div class="container">
        <h1 class="page-title">加入我们</h1>
        <p class="page-subtitle">JOBS</p>
      </div>
    </div>

    <section class="section">
      <div class="container">
        <div class="jobs-intro">
          <h2>与音乐同行</h2>
          <p>Liverse Hall 是一个充满活力的团队，我们相信每一场精彩演出的背后，都有一群热爱现场音乐的人在默默付出。如果你也热爱音乐、热爱现场，欢迎加入我们。</p>
        </div>

        <div class="jobs-list">
          <div v-for="job in jobs" :key="job.id" class="job-card">
            <div class="job-header">
              <div>
                <h3 class="job-title">{{ job.title }}</h3>
                <div class="job-tags">
                  <span class="job-tag">{{ job.type }}</span>
                  <span class="job-tag">{{ job.location }}</span>
                  <span class="job-tag">{{ job.salary }}</span>
                </div>
              </div>
              <button class="btn-apply" @click="showDetail(job)">查看详情</button>
            </div>
            <div class="job-desc">
              <p>{{ job.summary }}</p>
            </div>
            <div class="job-requirements">
              <h4>任职要求</h4>
              <ul>
                <li v-for="(req, i) in job.requirements" :key="i">{{ req }}</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="contact-section">
          <h3>简历投递</h3>
          <p>请将简历发送至 <a href="mailto:jobs@liversehall.com">jobs@liversehall.com</a>，邮件标题注明应聘职位。</p>
          <p>我们期待与你的相遇。</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const jobs = ref([
  {
    id: 'job-001',
    title: '现场音响工程师',
    type: '全职',
    location: '上海',
    salary: '15K-25K',
    summary: '负责演出现场的音响系统调试、混音及设备维护，确保每一场演出的音质达到最佳状态。',
    requirements: [
      '3 年以上 livehouse / 演唱会音响工作经验',
      '熟悉 Digico、Yamaha CL/QL 系列调音台',
      '具备基础的设备故障排查与应急处理能力',
      '热爱现场音乐，能适应晚间及周末工作'
    ]
  },
  {
    id: 'job-002',
    title: '舞台灯光师',
    type: '全职',
    location: '上海',
    salary: '12K-20K',
    summary: '负责演出灯光设计、编程与现场操控，配合导演与艺人团队打造沉浸式视觉体验。',
    requirements: [
      '2 年以上舞台灯光设计或操作经验',
      '熟练使用 GrandMA2/3、Avolites 等控台',
      '具备一定的审美能力与创意表达能力',
      '能够承受高强度工作节奏'
    ]
  },
  {
    id: 'job-003',
    title: '演出策划专员',
    type: '全职',
    location: '上海',
    salary: '10K-18K',
    summary: '负责演出项目的全流程策划与执行，包括艺人对接、场地协调、宣传推广等。',
    requirements: [
      '1 年以上演出 / 活动策划相关经验',
      '熟悉国内独立音乐、摇滚、电子等演出市场',
      '具备优秀的沟通协调能力与项目管理能力',
      '英语流利者优先'
    ]
  },
  {
    id: 'job-004',
    title: '饮品销售专员（兼职）',
    type: '兼职',
    location: '上海',
    salary: '30元/时',
    summary: '负责演出期间的饮品销售与服务，为顾客提供愉快的消费体验。',
    requirements: [
      '年满 18 周岁，持有健康证',
      '有餐饮 / 零售服务经验者优先',
      '性格开朗，服务意识强',
      '能适应晚间及周末排班'
    ]
  }
])

function showDetail(job) {
  alert(`职位：${job.title}\n\n${job.summary}\n\n任职要求：\n${job.requirements.join('\n')}\n\n请将简历发送至 jobs@liversehall.com`)
}
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

.jobs-intro {
  text-align: center;
  max-width: 700px;
  margin: 0 auto var(--space-8);
}
.jobs-intro h2 {
  font-size: clamp(24px, 3vw, 32px);
  font-weight: 700;
  margin-bottom: var(--space-4);
}
.jobs-intro p {
  font-size: 16px;
  color: var(--text-secondary);
  line-height: 1.7;
}

.jobs-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
  margin-bottom: var(--space-9);
}
.job-card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-subtle);
  border-radius: 12px;
  padding: var(--space-6);
  transition: all 0.3s ease;
}
.job-card:hover {
  border-color: var(--border-strong);
}
.job-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: var(--space-4);
}
.job-title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: var(--space-3);
}
.job-tags {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.job-tag {
  padding: 4px 10px;
  font-size: 12px;
  color: var(--text-secondary);
  background: var(--bg-tertiary);
  border: 1px solid var(--border-subtle);
  border-radius: 4px;
}
.btn-apply {
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 600;
  color: var(--text-inverse);
  background: var(--accent-primary);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}
.btn-apply:hover {
  background: var(--accent-hover);
}
.job-desc p {
  font-size: 15px;
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: var(--space-4);
}
.job-requirements h4 {
  font-size: 14px;
  font-weight: 600;
  color: var(--text-muted);
  margin-bottom: var(--space-3);
}
.job-requirements ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
.job-requirements li {
  font-size: 14px;
  color: var(--text-secondary);
  padding: 6px 0;
  padding-left: 20px;
  position: relative;
}
.job-requirements li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: var(--accent-primary);
}

.contact-section {
  text-align: center;
  padding: var(--space-8);
  background: var(--bg-tertiary);
  border: 1px solid var(--border-subtle);
  border-radius: 12px;
}
.contact-section h3 {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: var(--space-4);
}
.contact-section p {
  font-size: 15px;
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: var(--space-3);
}
.contact-section a {
  color: var(--accent-primary);
  text-decoration: none;
}
.contact-section a:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .page-hero { height: 240px; padding-bottom: 40px; }
  .job-header {
    flex-direction: column;
    gap: var(--space-3);
  }
  .btn-apply { width: 100%; }
}
</style>
