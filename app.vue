<script lang="ts" setup>
import type { Ref } from 'vue'

let origin = $ref('https://favicones.vercel.app')
onMounted(() => {
  if (process.client)
    origin = window.location.origin
})

let favicon = $ref('icon-park-twotone:healthy-recognition?color=EA580B')

const linkTagHtml = $computed(() => [`<link rel="icon" href="${origin}/api/`, '" />'])

const getRelativeIconUrl = (icon: string) => `/api/${icon}`
const getIconUrl = (icon: string) => `${origin}${getRelativeIconUrl(icon)}`
const getFaviconLinkTag = (icon: string) => `<link rel="icon" href="${getIconUrl(icon)}">`
const getIconWithColor = (icon: string, color: string) => `${icon}?color=${color.replace('#', '')}`

useHead({
  title: 'Favicônes',
  link: [
    { rel: 'icon', href: computed(() => getRelativeIconUrl(favicon)) },
  ],
})

const iconExamples = [
  'fluent-emoji:blossom',
  'fluent-emoji-flat:alien',
  'twemoji:face-holding-back-tears',
  'ph:fire-duotone?color=orange',
  'tabler:seeding?color=22c55e',
  'carbon:chart-radial?color=ec4899',
  'circle-flags:hr',
  'logos:figma',
  'logos:typescript-icon',
]

const query = $ref('')
const color = $ref('#9A3413')
const results = ref<string[]>([])

const iconNameCopied = ref<Record<string, boolean>>({})
const linkTagCopied = ref<Record<string, boolean>>({})
const urlCopied = ref<Record<string, boolean>>({})
const faviconApplied = ref<Record<string, boolean>>({})

const copy = (text: string) => {
  navigator.clipboard.writeText(text)
}

const handleActionApplied = (ref: Ref<Record<string, boolean>>, icon: string) => {
  ref.value = { [icon]: true }
  setTimeout(() => ref.value = {}, 1500)
}

// TODO: favicon doesn't awlays apply after setting previous (cache issue?)
const applyFavicon = (icon: string, color?: string) => {
  favicon = color ? getIconWithColor(icon, color) : icon
  handleActionApplied(faviconApplied, icon)
}

const copyIconName = (icon: string) => {
  copy(icon)
  handleActionApplied(iconNameCopied, icon)
}

const copyLinkTag = (icon: string) => {
  copy(getFaviconLinkTag(icon))
  handleActionApplied(linkTagCopied, icon)
}
const copyUrl = (icon: string) => {
  copy(getIconUrl(icon))
  handleActionApplied(urlCopied, icon)
}

const applyFaviconAndCopyLinkTag = (icon: string) => {
  applyFavicon(icon)
  copyLinkTag(icon)
}

const onIconSearch = async () => {
  const { data } = await useFetch('/api/search', { params: { query } })
  results.value = data.value?.icons ?? []
}

const onDebouncedIconSearch = useDebounceFn(onIconSearch, 400)
</script>

<template>
  <Body class="bg-orange-50 text-orange-6">
    <div
      h-screen overflow-hidden
      flex flex-col justify-between
    >
      <div flex h-screen>
        <div
          container
          flex-1 w-full mx-auto px-8
          overflow-y-auto
        >
          <div flex justify-center items-center gap-5 py-8>
            <div w-full flex flex-col gap-16 items-center>
              <div mt="4vh">
                <h1 text-8xl font-semibold>
                  Got favicon?
                </h1>
                <p mt-4 text-center>
                  Click to try out!
                </p>
              </div>

              <main w-full flex flex-col gap-4>
                <div
                  space-y-4 px-2 font-mono
                  bg-orange-1 text-orange-6
                  cursor-pointer
                  border-2 border-orange-3
                  rounded-sm
                >
                  <!-- Example url -->
                  <div
                    min-h="40px"
                    w-fit inline-flex items-center
                  >
                    <span opacity-40 py-1>{{ origin }}/api/</span>
                    <span bg-blue-1 text-blue-6 py-1>[icon-pack]</span>:
                    <span bg-green-1 text-green-6 py-1>[icon-name]</span>
                    ?color=<span bg-violet-1 text-violet-6 py-1>[color]</span>
                  </div>
                </div>

                <!-- Examples -->
                <div flex flex-col gap-4 mt-8 text-sm>
                  <div
                    v-for="(icon, i) in iconExamples"
                    :key="i"
                    flex items-center justify-end gap-4
                  >
                    <button
                      min-h="40px" cursor-pointer
                      flex-1 flex justify-start items-center
                      py-1 px-2 font-mono rounded-sm
                      bg-orange-1 text-orange-6
                      border-2 border-orange-3 border-dashed
                      class="hover:(border-solid bg-orange-2/60)"
                      @click="applyFaviconAndCopyLinkTag(icon)"
                    >
                      <p v-if="linkTagCopied[icon] && faviconApplied[icon]" text-center w-full>
                        Favicon applied & link tag copied!
                      </p>
                      <div v-else flex-1 inline-flex items-center class="whitespace-none">
                        <span opacity-50 line-clamp-1>{{ linkTagHtml[0] }}</span>
                        {{ icon }}
                        <span opacity-50>{{ linkTagHtml[1] }}</span>
                      </div>
                    </button>
                    <div>
                      <img
                        w-10 aspect-square
                        :src="getRelativeIconUrl(icon)"
                        alt="icon preview"
                      >
                    </div>
                  </div>
                </div>
              </main>

              <div w-full text-center>
                <div bg-orange-1 p-5 rounded-sm space-y-4>
                  <p>
                    Over <span font-semibold>100,000</span> open source vector icons, across <span font-semibold>100+</span> icon
                    sets.
                  </p>
                  <p>
                    Find them all on
                    <NuxtLink
                      to="https://icones.js.org/collection/all"
                      underline
                    >
                      Icônes
                    </NuxtLink>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <Footer />
        </div>

        <div w="120" border="l-1 y-1 orange-3">
          <form flex items-center pr-4 bg="orange-1" @submit.prevent="onIconSearch">
            <input
              v-model="query"
              bg-transparent
              w-full p-4
              type="search"
              placeholder="Search icons"
              aria-label="Search for icons"
              class="placeholder:text-orange-7 focus:outline-none"
              @input="onDebouncedIconSearch"
            >
            <ColorPicker
              v-model="color"
            />
          </form>
          <div h="[calc(100vh-56px)]" overflow-y-auto border="t-1 orange-3">
            <div flex flex-col divide-y-1 divide-orange-3>
              <article v-for="icon in results" :key="icon" p-4 text-orange-8>
                <div flex gap-5 items-center>
                  <!-- Icon preview -->
                  <div w="40px" aspect-square grid place-content-center>
                    <Icon :name="icon" text-4xl :style="{ color }" />
                  </div>

                  <div flex-1>
                    <!-- Icon name -->
                    <div flex items-center gap-2>
                      <p font-medium line-clamp-1 :title="icon">
                        {{ icon }}
                      </p>
                      <button
                        p-1 class="group" transition
                        flex items-center justify-content-center gap-2
                        @click="copyIconName(icon)"
                      >
                        <span v-if="iconNameCopied[icon]" text-sm>
                          Copied!
                        </span>
                        <Icon
                          v-else
                          name="mdi:content-copy"
                          class="transition opacity-50 group-active:scale-90 group-hover:opacity-100"
                          text-xl
                        />
                      </button>
                    </div>

                    <!-- Copy options -->
                    <div text-sm uppercase flex items-center gap-3 mt-1>
                      <button class="hover:underline active:(scale-90)" transition @click="copyUrl(icon)">
                        {{ urlCopied?.[icon] ? 'Copied!' : 'Copy url' }}
                      </button>
                      <button class="hover:underline active:(scale-90)" transition @click="copyLinkTag(icon)">
                        {{ linkTagCopied[icon] ? 'Copied!' : 'Copy link tag' }}
                      </button>
                      <button class="hover:underline active:(scale-90)" transition @click="applyFavicon(icon, color)">
                        {{ faviconApplied[icon] ? 'Applied!' : 'Apply favicon' }}
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Body>
</template>

<style>
@import url('https://fonts.cdnfonts.com/css/chillax');

html {
	font-family: 'Chillax', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',	sans-serif;
}
</style>
