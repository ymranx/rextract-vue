import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Receipt {
  id: string
  fileName: string
  date: string
  status: 'Done' | 'Invalid' | 'Processing'
}

export const useReceiptsStore = defineStore('receipts', () => {
  const receipts = ref<Receipt[]>([
    { id: '1', fileName: '5.jpg', date: '17/02/2026 08:31 pm', status: 'Done' },
    { id: '2', fileName: '8.webp', date: '17/02/2026 08:29 pm', status: 'Done' },
    { id: '3', fileName: 'r2_bad.jpg', date: '17/02/2026 08:28 pm', status: 'Invalid' },
    { id: '4', fileName: '1.jpg', date: '17/02/2026 08:27 pm', status: 'Done' }
  ])

  // Mock function for future data fetching
  const fetchReceipts = async () => {
    // To be implemented using useData later.
  }

  const deleteReceipt = (id: string) => {
    receipts.value = receipts.value.filter(r => r.id !== id)
  }

  return { receipts, fetchReceipts, deleteReceipt }
})
