<script lang="ts" setup>
const { awesome } = useAppConfig()
definePageMeta({ layout: 'page' })
useHead({ titleTemplate: '', title: awesome?.name || 'Darshan Astro' })
</script>

<template>
  <div>
<!--  <AwesomeWelcome :with-alert="true" />-->
    <ClientOnly>
      <ThreejsCanvas />
    </ClientOnly>
  </div>
</template>
