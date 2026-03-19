import { ref } from 'vue'

export function useFileDrop() {
  const isDragging = ref(false)
  const selectedFile = ref<File | null>(null)
  const errorMsg = ref('')

  const validateFile = (file: File) => {
    errorMsg.value = ''
    
    const validTypes = ['image/jpeg', 'image/png', 'image/webp']
    if (!validTypes.includes(file.type)) {
      errorMsg.value = 'Invalid file format. Please upload JPG, PNG or WEBP.'
      return false
    }

    const maxSize = 10 * 1024 * 1024
    if (file.size > maxSize) {
      errorMsg.value = 'File size exceeds 10MB limit.'
      return false
    }

    return true
  }

  const handleFile = (file: File | undefined | null) => {
    if (file && validateFile(file)) {
      selectedFile.value = file
    }
  }

  const handleDrop = (e: DragEvent) => {
    isDragging.value = false
    const file = e.dataTransfer?.files[0]
    handleFile(file)
  }

  const handleFileSelect = (e: Event) => {
    const target = e.target as HTMLInputElement
    const file = target.files?.[0]
    handleFile(file)
  }

  const resetState = () => {
    selectedFile.value = null
    errorMsg.value = ''
    isDragging.value = false
  }

  return {
    isDragging,
    selectedFile,
    errorMsg,
    handleDrop,
    handleFileSelect,
    resetState
  }
}
