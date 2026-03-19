<template>
  <div class="min-h-screen bg-background">
    <Header />
    <main class="container mx-auto max-w-4xl py-8 px-4">
      <ReceiptList />
    </main>
  </div>
</template>

<script setup lang="ts">
import { useReceiptsStore } from '~/stores/receipts'
import { useAsyncData } from 'nuxt/app'

const store = useReceiptsStore()

// Conforming to data fetching using useData/useAsyncData later
useAsyncData('receipts', async () => {
  await store.fetchReceipts()
  return true
})
</script>
