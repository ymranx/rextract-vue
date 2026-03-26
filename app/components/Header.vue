<template>
  <header class="flex justify-end items-center py-4 px-8 border-b">
    <div class="flex items-center gap-3">
      <Avatar>
        <AvatarImage src="" alt="User profile" />
        <AvatarFallback>
          <User class="w-full h-full p-2" />
        </AvatarFallback>
      </Avatar>
      <div class="flex flex-col">
        <span class="text-sm font-semibold">Imran Personal</span>
        <span class="text-xs text-muted-foreground">Admin</span>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { User } from 'lucide-vue-next'
// Avatar components are auto-imported by Nuxt
</script>

