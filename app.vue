<script lang="ts" setup>
import '@unocss/reset/tailwind.css'

const getIconUrl = (icon: string) => `/api/${icon}`

let favicon = $ref('ph:dice-one-fill?color=fb923c')
const faviconHref = $computed(() => getIconUrl(favicon))

useHead({
  link: [
    { rel: 'icon', type: 'image/svg+xml', href: faviconHref },
  ],
})

let origin = $ref('http://localhost:3000')
onMounted(() => {
  if (process.client)
    origin = window.location.origin
})

const icons = [
  'fluent-emoji:blossom',
  'twemoji:face-holding-back-tears',
  'ph:fire-duotone?color=orange',
  'tabler:seeding?color=22c55e',
  'carbon:chart-radial?color=ec4899',
  'circle-flags:hr',
  'logos:figma',
  'logos:typescript-icon',
]

const setFaviconAndCopy = (icon: string) => {
  favicon = icon
  const url = getIconUrl(icon)
  navigator.clipboard.writeText(`${origin}${url}`)
}

const linkTagHtml = $computed(() => [`<link rel="icon" href="${origin}/api/`, '" />'])
</script>

<template>
  <Body class="bg-orange-1 text-orange-6">
    <div
      container max-w-5xl mx-auto min-h-screen
      flex flex-col justify-between items-stretch
    >
      <div flex-1 w-full mx-auto p-8 mt="5vh">
        <div flex justify-center items-center gap-5>
          <div w-full flex flex-col gap-8 items-center>
            <div>
              <h1 text-8xl font-semibold>
                Got favicon?
              </h1>
              <p mt-4 text-center>
                Click to try out!
              </p>
            </div>

            <main w-full flex flex-col gap-4>
              <div
                text-right space-y-4
                mr="[calc(40px_+_1rem)]"
              >
                <!-- Example url -->
                <div
                  min-h="40px"
                  w-fit inline-flex items-center
                  px-2 font-mono
                  bg-orange-2 text-orange-6
                  cursor-pointer
                  ring-2 ring-orange-3
                  rounded-sm
                >
                  <span opacity-40 py-1>{{ origin }}</span>
                  <span>/api/</span>
                  <span bg-blue-1 text-blue-6 py-1>[icon-pack]</span>:
                  <span bg-green-1 text-green-6 py-1>[icon-name]</span>
                  ?color=<span bg-violet-1 text-violet-6 py-1>[color]</span>
                </div>

                <!-- Example link tag -->
                <div>
                  <p text-uppercase font-medium text-lg mb-1>
                    Current favicon
                  </p>
                  <div
                    min-h="40px"
                    w-fit inline-flex items-center
                    py-1 px-2 font-mono
                    bg-orange-2 text-orange-6
                    cursor-pointer
                    ring-2 ring-orange-3
                    rounded-sm
                  >
                    <span opacity-50>{{ linkTagHtml[0] }}</span>
                    {{ favicon }}
                    <span opacity-50>{{ linkTagHtml[1] }}</span>
                  </div>
                </div>
              </div>

              <!-- Examples -->
              <div flex flex-col gap-4 mt-8>
                <div
                  v-for="(icon, i) in icons"
                  :key="i"
                  flex items-center justify-end gap-4
                >
                  <div
                    min-h="40px"
                    w-fit inline-flex items-center
                    py-1 px-2 font-mono
                    bg-orange-2 text-orange-6
                    cursor-pointer
                    class="hover:(ring-2 ring-orange-3)"
                    rounded-sm
                    @click="setFaviconAndCopy(icon)"
                  >
                    <span opacity-50>{{ linkTagHtml[0] }}</span>
                    {{ icon }}
                    <span opacity-50>{{ linkTagHtml[1] }}</span>
                  </div>
                  <img
                    w-10 aspect-square
                    :src="getIconUrl(icon)"
                    alt="icon preview"
                  >
                </div>
              </div>
            </main>

            <div w-full mt-8 text-center>
              <div bg-orange-2 p-5 rounded-sm space-y-4>
                <p>
                  Supports over <span font-semibold>100,000</span> open source vector icons, across <span font-semibold>100+</span>  icon
                  sets.
                </p>
                <p>
                  Search them all on
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
      </div>

      <Footer />
    </div>
  </Body>
</template>

<style>
@import url('https://fonts.cdnfonts.com/css/chillax');

html {
	font-family: 'Chillax', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue',	sans-serif;
}
</style>
