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
      <section class="page-section hero" id="hero">
        <div class="hero-text">
          <h1>
            鳩山キャンパスを<br class="mobile-only-break" />旅する仮想体験
          </h1>
          <p class="hero-description">
            再現された鳩山キャンパスを、まるでその場にいるかのように体験できます。
          </p>
          <p class="hero-note">
            ※キャンパスの一部を再現しています。
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
              <p>生徒ナビゲーターがキャンパス内を案内</p>
            </div>
            <div>
              <span class="highlight-label">声</span>
              <p>在学生のリアルな体験談を聞ける</p>
            </div>
          </div>

          <figure class="hero-photo hero-photo--mobile">
            <img
              :src="campusImage"
              alt="鳩山キャンパス"
              loading="lazy"
            />
          </figure>
        </div>
        <div class="hero-visual">
          <figure class="hero-photo forest">
            <img
              :src="campusImage"
              alt="鳩山キャンパス"
              loading="lazy"
            />
          </figure>
        </div>
      </section>

      <section class="page-section experience" id="experience">
        <div class="section-heading">
          <h2>サービスの遊び方</h2>
          <p class="section-description">
            キャンパスでは、生徒との会話やイベントを通じて大学の雰囲気に触れられます。
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
              <h3>{{ event.title }}</h3>
              <p>{{ event.description }}</p>
              <p v-if="event.detailLink" class="experience-card__note">
                {{ event.detailNotePrefix || '' }}<a :href="event.detailLink" target="_blank" rel="noopener noreferrer">こちら</a>{{ event.detailNoteSuffix || '' }}
              </p>
            </div>
          </article>
        </div>
      </section>

      <section class="page-section tours" id="tours">
        <div class="section-heading">
          <h2>キャンパスツアーを選択</h2>
          <p class="section-description">
            迷ったら先輩と歩く案内コース、気ままに歩きたいなら自由コース。
            どちらの体験も、実際のキャンパスで感じる視線や空気感を再現しました。
          </p>
        </div>

        <div class="course-tabs" role="tablist" aria-label="キャンパスツアーのタイプ">
          <button
            v-for="course in courseTabs"
            :key="course.id"
            class="course-tab"
            :class="{ 'course-tab--active': course.id === activeCourseId }"
            type="button"
            role="tab"
            :aria-selected="course.id === activeCourseId"
            @click="activeCourseId = course.id"
          >
            <span class="course-tab__label">{{ course.title }}</span>
            <span class="course-tab__sub">{{ course.tabLead }}</span>
          </button>
        </div>

        <article v-if="activeCourse" class="course-panel" role="tabpanel">
          <header class="course-panel__header">
            <div>
              <h3>{{ activeCourse.title }}</h3>
            </div>
          </header>
          <p class="course-panel__summary">
            {{ activeCourse.summary }}
          </p>
          <ul>
            <li v-for="point in activeCourse.points" :key="point">
              {{ point }}
            </li>
          </ul>
          <div class="course-panel__foot">
            <p>{{ activeCourse.recommendation }}</p>
          </div>
        </article>
      </section>

      <section class="page-section cta" id="cta">
          <h2>
            キャンパスに<br class="mobile-only-break" />遊びに行こう
          </h2>
          <p class="cta-text">
          </p>
          <div class="cta-actions">
            <button class="cta-button" @click="goToTour">
              キャンパスツアーを始める
            </button>
          </div>
      </section>
    </main>

    <footer class="page-footer">
      <p>© {{ year }} Hijiri Sato</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { useHead, navigateTo } from '#imports'
import { computed, ref } from 'vue'
import campusImage from '~/assets/image/campus.png'
import welcomeGirlImage from '~/assets/image/welcome_girl.png'
import lectureGuideImage from '~/assets/image/teach_lecturet_mob.png'

const year = new Date().getFullYear()

const goToTour = () => {
  navigateTo('/campus-tour')
}

const courseTabs = [
  {
    id: 'guided',
    title: '案内コース',
    tabLead: '先輩が同行して案内',
    summary:
      '鳩山キャンパスの施設の見どころを順番に巡る安心コースです。',
    points: [
      '施設内の見どころを、生徒ナビゲーターが紹介',
      '休憩スポットや学生目線の過ごし方もチェック'
    ],
    recommendation: '初めての方、迷わず効率的に周りたい人におすすめ。'
  },
  {
    id: 'free',
    title: '自由コース',
    tabLead: '自分のペースで散策',
    summary:
      '散りばめられたスターを集めながら自分だけの発見を楽しめるコースです。',
    points: [
      '気になるスポットを自由にチェック'
    ],
    recommendation: '２回目以降の方や、自分の直感で歩きたい人にぴったり。'
  }
]

const activeCourseId = ref(courseTabs[0].id)
const activeCourse = computed(() =>
  courseTabs.find((course) => course.id === activeCourseId.value)
)

const gameplayEvents = [
  {
    title: '生徒ナビゲーターに話しかけよう',
    description:
      '建物内にいる生徒ナビゲーターに話しかけると、キャンパスツアーの案内コース、自由コースを選択できます。最初の一歩に迷ったら彼女に相談しましょう。',
    image: welcomeGirlImage,
    alt: '案内してくれる生徒'
  },
  {
    title: '講義内容を紹介してくれる生徒',
    description:
      'キャンパスには複数の生徒が通っています。講義の内容など、授業の雰囲気を教えてくれます。たくさんの生徒に話しかけてイメージを膨らませましょう。',
    image: lectureGuideImage,
    alt: '講義内容を教えてくれる生徒',
    detailLink: 'https://www.dendai.ac.jp/about/undergraduate/rikougaku/rd/#',
    detailNotePrefix: '※情報システムデザイン学系のみになります。詳しくは',
    detailNoteSuffix: '。'
  }
]

useHead({
  title: '鳩山VirtualOpenCampus',
  meta: [
    {
      name: 'description',
      content: '東京電機大学 鳩山キャンパスの仮想オープンキャンパス'
    }
  ]
})
</script>

<style scoped src="./index.css"></style>
