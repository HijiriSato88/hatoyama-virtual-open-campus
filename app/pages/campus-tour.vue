<template>
  <div class="tour-page">
    <NuxtRouteAnnouncer />

    <header class="tour-header">
      <div class="header-left">
        <button v-if="!isMobile" class="back-button" type="button" @click="goBack">
          ← トップへ戻る
        </button>
        <div>
          <p class="eyebrow">Virtual Open Campus</p>
          <h1>鳩山 キャンパスツアー</h1>
        </div>
      </div>
    </header>

    <main class="tour-main">
      <div class="player-shell">
        <div v-if="!deviceReady" class="player-placeholder">
          <p>読み込み中...</p>
        </div>
        <template v-else>
          <ClientOnly v-if="!isMobile">
            <UnityPlayer />
          </ClientOnly>
          <div v-else class="mobile-blocker">
            <p class="mobile-blocker__title">PC専用コンテンツです</p>
            <p class="mobile-blocker__description">
              キャンパスツアーはPCブラウザ向けに開発されています。PC端末からアクセスしてください。
            </p>
            <button class="back-button secondary" type="button" @click="goBack">
              トップページに戻る
            </button>
          </div>
        </template>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { navigateTo, useHead } from '#imports'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import UnityPlayer from '~/components/UnityPlayer.client.vue'

const goBack = () => {
  navigateTo('/')
}

const isMobile = ref(false)
const deviceReady = ref(false)

let mediaQuery: MediaQueryList | null = null
let mediaQueryListener: ((event: MediaQueryListEvent) => void) | null = null

const setDeviceState = () => {
  if (!mediaQuery) return
  isMobile.value = mediaQuery.matches
  deviceReady.value = true
}

onMounted(() => {
  if (typeof window === 'undefined') {
    deviceReady.value = true
    return
  }

  mediaQuery = window.matchMedia('(max-width: 768px)')
  setDeviceState()

  mediaQueryListener = (event) => {
    isMobile.value = event.matches
  }

  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener('change', mediaQueryListener)
  } else if (mediaQuery.addListener) {
    mediaQuery.addListener(mediaQueryListener)
  }
})

onBeforeUnmount(() => {
  if (!mediaQuery || !mediaQueryListener) return
  if (mediaQuery.removeEventListener) {
    mediaQuery.removeEventListener('change', mediaQueryListener)
  } else if (mediaQuery.removeListener) {
    mediaQuery.removeListener(mediaQueryListener)
  }
})

useHead({
  title: '鳩山VirtualOpenCampus',
  meta: [
    {
      name: 'description',
      content: '鳩山キャンパスの仮想体験ページ'
    }
  ]
})
</script>

<style scoped src="./campus-tour.css"></style>
