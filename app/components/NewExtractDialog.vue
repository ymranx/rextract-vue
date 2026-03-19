<template>
  <Dialog :open="isOpen" @update:open="$emit('update:isOpen', $event)">
    <DialogContent class="sm:max-w-[500px] border-border bg-background shadow-lg">
      <DialogHeader>
        <DialogTitle class="text-xl font-semibold">New Extraction</DialogTitle>
      </DialogHeader>

      <div
        class="border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center gap-4 cursor-pointer transition-colors mt-2 mb-4"
        :class="isDragging ? 'border-primary bg-primary/5' : 'border-slate-200'"
        @dragover.prevent="isDragging = true"
        @dragleave.prevent="isDragging = false"
        @drop.prevent="handleDrop"
      >
        <div class="bg-slate-100 p-4 rounded-full text-slate-600">
          <UploadIcon class="w-6 h-6" />
        </div>
        
        <input 
          type="file" 
          ref="fileInputRef" 
          class="hidden" 
          accept=".jpg,.jpeg,.png,.webp"
          @change="handleFileSelect"
        />

        <div class="text-center space-y-3 mt-2">
          <Button variant="outline" class="font-medium bg-white text-slate-700 shadow-sm border-slate-200" @click="() => fileInputRef?.click()">
            Choose file to Upload
          </Button>
          <p class="text-[15px] text-slate-500 font-medium">or drag and drop file here</p>
          <p class="text-[13px] text-slate-400">Valid formats: .jpg, .jpeg, .png, .webp (Max 10MB)</p>
        </div>

        <div v-if="selectedFile" class="mt-4 text-sm font-medium text-slate-700">
          Selected: {{ selectedFile.name }}
        </div>
        <div v-if="errorMsg" class="mt-2 text-sm text-destructive font-medium">
          {{ errorMsg }}
        </div>
      </div>

      <DialogFooter class="sm:justify-center gap-2 mt-4 flex w-full">
        <Button 
          class="bg-[#e12a2a] hover:bg-[#c92626] text-white rounded-md min-w-[100px]" 
          @click="closeDialog"
        >
          Cancel
        </Button>
        <Button 
          class="bg-[#9494a0] hover:bg-[#868692] text-white rounded-md min-w-[100px]" 
          :disabled="!selectedFile" 
          @click="submitFile"
        >
          Extract
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Upload as UploadIcon } from 'lucide-vue-next'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '~/components/ui/dialog'

import { useFileDrop } from '~/composables/useFileDrop'

const props = defineProps<{
  isOpen: boolean
}>()

const emit = defineEmits<{
  (e: 'update:isOpen', value: boolean): void
}>()

const fileInputRef = ref<HTMLInputElement | null>(null)

const {
  isDragging,
  selectedFile,
  errorMsg,
  handleDrop,
  handleFileSelect,
  resetState
} = useFileDrop()

const closeDialog = () => {
  resetState()
  emit('update:isOpen', false)
}

const submitFile = () => {
  if (selectedFile.value) {
    console.log('Extracting', selectedFile.value)
    closeDialog()
  }
}
</script>
