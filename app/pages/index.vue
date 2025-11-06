<template>
  <div class="virtual-campus-page">
    <NuxtRouteAnnouncer />

    <header class="page-header">
      <div class="logo-group">
        <span class="logo-mark">TDU</span>
        <div class="logo-text">
          <p class="logo-text__title">東京電機大学 鳩山キャンパス</p>
          <p class="logo-text__subtitle">Virtual Open Campus</p>
        </div>
      </div>
    </header>

    <main class="page-main">
      <section class="hero" id="hero">
        <div class="hero-text">
          <h1>
            鳩山キャンパスを旅する仮想体験
          </h1>
          <p class="hero-lead">
            あなたのデバイスで、鳩山キャンパスの自然空間へ
          </p>
          <p class="hero-description">
            Unityで再現された鳩山キャンパスを、まるでその場にいるかのように体験できます。
            ご自宅でも、鳩山の空気をまとった時間をお楽しみください。
          </p>
          <div class="hero-actions">
            <button class="cta-button" @click="goToTour">
              キャンパスツアーを体験
            </button>
          </div>
          <div class="hero-highlights">
            <div>
              <span class="highlight-label">没入</span>
              <p>再現されたリアルな鳩山キャンパス</p>
            </div>
            <div>
              <span class="highlight-label">案内</span>
              <p>生徒役のナビゲーターがキャンパス内を案内</p>
            </div>
            <div>
              <span class="highlight-label">声</span>
              <p>在学生のリアルな意見を聞くことができます。</p>
            </div>
          </div>
        </div>
        <div class="hero-visual">
          <figure class="hero-photo forest">
            <img
              :src="campusImage"
              alt="鳩山キャンパスを思わせる深い森の小径"
              loading="lazy"
            />
            <figcaption>森林浴のような清澄な空気を再現</figcaption>
          </figure>
        </div>
      </section>


      <section class="courses" id="courses">
        <div class="section-heading">
          <p class="section-eyebrow">Tour Programs</p>
          <h2>２つのコースから旅を選択</h2>
          <p class="section-description">
            迷ったら先輩と歩く案内コース、気ままに歩きたいなら自由コース。
            どちらの体験も、実際のキャンパスで感じる視線、空気感を再現しました。
          </p>
        </div>
        <div class="course-grid">
          <article class="course-card guided">
            <div class="course-card__header">
              <h3>案内コース</h3>
              <span class="course-tag">先輩ナビゲーター</span>
            </div>
            <p>
              生徒役のナビゲーターがキャンパス内を案内。
              自然豊かな環境の中を巡りながら、大学生活の魅力を発見しましょう。
            </p>
            <ul>
              <li>キャンパスの歴史や研究内容を先輩がエピソード付きで紹介</li>
              <li>休憩スポットのおすすめや学生目線の過ごし方もチェック</li>
            </ul>
          </article>

          <article class="course-card free">
            <div class="course-card__header">
              <h3>自由コース</h3>
              <span class="course-tag">自分のペース</span>
            </div>
            <p>
              好きな順番でキャンパスを散策しながら、星を見つけに行きましょう。
            </p>
            <ul>
              <li>星を探しながら、キャンパス内を自由に散策</li>
              <li>全部の星を集めて、もっと詳しくなりましょう。</li>
            </ul>
          </article>
        </div>
      </section>

      <section class="cta" id="cta">
        <div class="cta-inner">
          <h2>準備はできましたか？</h2>
          <p class="cta-text">
          </p>
          <div class="cta-actions">
            <button class="cta-button" @click="goToTour">
              キャンパスツアーをすぐに始める
            </button>
          </div>
        </div>
      </section>
    </main>

    <footer class="page-footer">
      <p>© {{ year }} hijiri sato</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useHead, navigateTo } from '#imports'

const year = new Date().getFullYear()

const goToTour = () => {
  navigateTo('/campus-tour')
}

const campusImage = new URL('../assets/image/campus.png', import.meta.url).href

useHead({
  title: '鳩山キャンパス Virtual Open Campus｜東京電機大学',
  meta: [
    {
      name: 'description',
      content: '東京電機大学 鳩山キャンパスの仮想オープンキャンパス'
    }
  ]
})
</script>

<style scoped src="./index.css"></style>
