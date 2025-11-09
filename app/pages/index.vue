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
            再現された鳩山キャンパスを、まるでその場にいるかのように体験できます。
            ご自宅でも、鳩山の空気をまとった時間をお楽しみください。
          </p>
          <div class="hero-actions">
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

      <section class="experience" id="experience">
        <div class="section-heading">
          <p class="section-eyebrow">Gameplay & Tours</p>
          <h2>サービスの遊び方</h2>
          <p class="section-description">
            キャンパスでは、生徒との会話やイベントを通じて大学の雰囲気を体験できます。
          </p>
        </div>

        <div class="experience-grid">
          <article
            v-for="event in gameplayEvents"
            :key="event.title"
            class="experience-card"
          >
            <figure v-if="event.image" class="experience-figure">
              <img :src="event.image" :alt="event.alt || ''" loading="lazy" />
            </figure>
            <div class="experience-card__body">
              <span class="experience-card__badge">{{ event.badge }}</span>
              <h3>{{ event.title }}</h3>
              <p>{{ event.description }}</p>
            </div>
          </article>
        </div>

        <div class="experience-subheading">
          <p class="section-eyebrow">Tour Programs</p>
          <h3>２つのキャンパスツアーを選択</h3>
          <p>
            迷ったら先輩と歩く案内コース、気ままに歩きたいなら自由コース。
            どちらの体験も、実際のキャンパスで感じる視線や空気感を再現しました。
          </p>
        </div>

        <div class="course-grid">
          <article class="course-card guided">
            <div class="course-card__header">
              <h3>案内コース</h3>
              <span class="course-tag">先輩ナビゲーター</span>
            </div>
            <p>
              ナビゲーターがキャンパス内を案内。
              自然豊かな環境の中を巡りながら、大学生活の魅力を発見しましょう。
            </p>
            <ul>
              <li>施設内の見どころをナビゲーターが解説</li>
              <li>休憩スポットのおすすめや学生目線の過ごし方もチェック</li>
            </ul>
          </article>

          <article class="course-card free">
            <div class="course-card__header">
              <h3>自由コース</h3>
              <span class="course-tag">自分のペース</span>
            </div>
            <p>
              好きな順番でキャンパスを散策しながら、スターを見つけに行きましょう。
            </p>
            <ul>
              <li>スターを探しながら、キャンパス内を自由に散策</li>
              <li>全部のスターを集めて、大学について詳しくなりましょう</li>
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
const welcomeGirlImage = new URL('../assets/image/welcome_girl.png', import.meta.url).href
const lectureGuideImage = new URL('../assets/image/teach_lecturet_mob.png', import.meta.url).href

const gameplayEvents = [
  {
    title: '赤髪の生徒に話しかけよう',
    description:
      '建物内にいる赤髪の生徒と会話すると、キャンパスツアーにおける案内コース、自由コースのどちらかを選択できます。最初の一歩に迷ったら彼女に相談しましょう。',
    badge: 'キャンパスツアー',
    image: welcomeGirlImage,
    alt: 'ツアー選択を案内してくれる赤髪の生徒キャラクター'
  },
  {
    title: '講義内容を紹介してくれる生徒',
    description:
      'キャンパス内には複数の生徒が通っています。講義の内容など、授業の雰囲気をリアルな言葉で教えてくれます。たくさんの生徒に話しかけてイメージを膨らませましょう。',
    badge: '講義ガイド',
    image: lectureGuideImage,
    alt: '講義内容を教えてくれる生徒キャラクター'
  }
]

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
