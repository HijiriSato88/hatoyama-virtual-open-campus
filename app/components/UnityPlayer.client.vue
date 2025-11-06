<template>
  <div ref="containerRef" class="unity-container unity-desktop virtual-tour-player">
    <canvas
      ref="canvasRef"
      id="unity-canvas"
      width="1280"
      height="720"
      tabindex="-1"
    />
    <div ref="loadingBarRef" id="unity-loading-bar">
      <div id="unity-logo" />
      <div id="unity-progress-bar-empty">
        <div ref="progressBarFullRef" id="unity-progress-bar-full" />
      </div>
    </div>
    <div ref="warningRef" id="unity-warning" />
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useHead } from '#imports'

const basePath = '/unity/campus'
const loaderSrc = `${basePath}/Build/webgl.loader.js`

const containerRef = ref<HTMLDivElement | null>(null)
const canvasRef = ref<HTMLCanvasElement | null>(null)
const loadingBarRef = ref<HTMLDivElement | null>(null)
const progressBarFullRef = ref<HTMLDivElement | null>(null)
const warningRef = ref<HTMLDivElement | null>(null)
const fullscreenButtonRef = ref<HTMLDivElement | null>(null)

let unityInstance: any = null
let loaderScriptEl: HTMLScriptElement | null = null

useHead({
  link: [
    { rel: 'stylesheet', href: `${basePath}/TemplateData/style.css` },
    { rel: 'shortcut icon', href: `${basePath}/TemplateData/favicon.ico` }
  ],
  meta: [
    {
      name: 'viewport',
      content:
        'width=device-width, height=device-height, initial-scale=1.0, user-scalable=no, shrink-to-fit=yes'
    }
  ]
})

onMounted(async () => {
  if (!canvasRef.value) {
    return
  }

  const applyMobileLayout = () => {
    const containerEl = containerRef.value
    const canvasEl = canvasRef.value
    if (!containerEl || !canvasEl) {
      return
    }
    containerEl.classList.remove('unity-desktop')
    containerEl.classList.add('unity-mobile')
    canvasEl.classList.add('unity-mobile')
    canvasEl.style.width = '100%'
    canvasEl.style.height = '100%'
    canvasEl.style.maxWidth = '100%'
    canvasEl.style.aspectRatio = '16 / 9'
  }

  const applyDesktopLayout = () => {
    const canvasEl = canvasRef.value
    if (!canvasEl) {
      return
    }
    canvasEl.style.width = '100%'
    canvasEl.style.maxWidth = '100%'
    canvasEl.style.height = '100%'
    canvasEl.style.aspectRatio = '16 / 9'
  }

  if (/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)) {
    applyMobileLayout()
  } else {
    applyDesktopLayout()
  }

  const showBanner = (msg: string, type: 'error' | 'warning' | string) => {
    const banner = warningRef.value
    if (!banner) return

    const div = document.createElement('div')
    div.innerHTML = msg
    if (type === 'error') {
      div.style.background = 'red'
      div.style.padding = '10px'
    } else if (type === 'warning') {
      div.style.background = 'yellow'
      div.style.padding = '10px'
      setTimeout(() => {
        if (div.parentElement === banner) {
          banner.removeChild(div)
          toggleBannerVisibility()
        }
      }, 5000)
    }

    banner.appendChild(div)
    toggleBannerVisibility()

    function toggleBannerVisibility() {
      if (!banner) return
      banner.style.display = banner.children.length ? 'block' : 'none'
    }
  }

  const scriptAlreadyLoaded =
    Array.from(document.querySelectorAll<HTMLScriptElement>('script')).some(
      (script) => script.src.includes(loaderSrc)
    )

  const ensureLoader = () =>
    new Promise<void>((resolve, reject) => {
      if (typeof window !== 'undefined' && (window as any).createUnityInstance) {
        resolve()
        return
      }

      if (scriptAlreadyLoaded) {
        // Loader is present but still initializing.
        const checkInterval = window.setInterval(() => {
          if ((window as any).createUnityInstance) {
            window.clearInterval(checkInterval)
            resolve()
          }
        }, 50)
        return
      }

      loaderScriptEl = document.createElement('script')
      loaderScriptEl.src = loaderSrc
      loaderScriptEl.async = true
      loaderScriptEl.onload = () => resolve()
      loaderScriptEl.onerror = () => reject(new Error('Failed to load Unity loader.'))
      document.body.appendChild(loaderScriptEl)
    })

  try {
    await ensureLoader()
    if (!canvasRef.value || !(window as any).createUnityInstance) {
      return
    }

    loadingBarRef.value && (loadingBarRef.value.style.display = 'block')

    const config = {
      dataUrl: `${basePath}/Build/webgl.data`,
      frameworkUrl: `${basePath}/Build/webgl.framework.js`,
      codeUrl: `${basePath}/Build/webgl.wasm`,
      streamingAssetsUrl: `${basePath}/StreamingAssets`,
      companyName: 'Tokyo Denki University',
      productName: 'Hatoyama Virtual Campus Tour',
      productVersion: '1.0',
      showBanner
    }

    unityInstance = await (window as any).createUnityInstance(
      canvasRef.value,
      config,
      (progress: number) => {
        if (progressBarFullRef.value) {
          progressBarFullRef.value.style.width = `${progress * 100}%`
        }
      }
    )

    if (loadingBarRef.value) {
      loadingBarRef.value.style.display = 'none'
    }

    if (fullscreenButtonRef.value) {
      fullscreenButtonRef.value.onclick = () => {
        unityInstance?.SetFullscreen?.(1)
      }
    }
  } catch (error: any) {
    if (warningRef.value) {
      warningRef.value.style.display = 'block'
      warningRef.value.textContent =
        error?.message || 'Failed to start Unity. Check the console for details.'
    }
    console.error(error)
  }
})

onBeforeUnmount(async () => {
  try {
    await unityInstance?.Quit?.()
  } catch (error) {
    console.warn('Unity quit raised an error', error)
  }
  unityInstance = null

  if (loaderScriptEl) {
    loaderScriptEl.remove()
    loaderScriptEl = null
  }
})
</script>
