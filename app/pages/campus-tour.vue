<template>
  <div class="tour-page">
    <NuxtRouteAnnouncer />

    <header class="tour-header">
      <div class="header-left">
        <button class="back-button" type="button" @click="goBack">
          ← トップへ戻る
        </button>
        <div>
          <p class="eyebrow">Virtual Tour</p>
          <h1>鳩山キャンパス ツアー体験</h1>
        </div>
      </div>
    </header>

    <main class="tour-main">
      <div class="player-shell">
        <ClientOnly>
          <UnityPlayer />
        </ClientOnly>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { navigateTo, useHead } from '#imports'
import UnityPlayer from '~/components/UnityPlayer.client.vue'

const goBack = () => {
  navigateTo('/')
}

useHead({
  title: '鳩山キャンパス ツアー体験｜東京電機大学',
  meta: [
    {
      name: 'description',
      content: 'Unityによる鳩山キャンパスの仮想体験ページ'
    }
  ]
})
</script>

<style scoped src="./campus-tour.css"></style>

