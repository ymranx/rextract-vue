<template>
  <div class="space-y-4">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold tracking-tight">My Extractions</h1>
      <Button class="bg-[#0f172a] text-white hover:bg-[#1e293b]">
        <Plus class="w-4 h-4 mr-2" />
        New Extraction
      </Button>
    </div>

    <div class="space-y-3">
      <Card v-for="receipt in receipts" :key="receipt.id" class="flex flex-row items-center justify-between p-4 shadow-sm hover:shadow-md transition-shadow">
        <div class="flex items-center gap-4">
          <div class="w-12 h-16 bg-muted rounded overflow-hidden flex items-center justify-center border">
            <FileText class="w-6 h-6 text-muted-foreground" v-if="receipt.status !== 'Done'" />
            <img v-else src="https://placehold.co/48x64/f1f5f9/94a3b8?text=Doc" alt="Thumbnail" class="w-full h-full object-cover" />
          </div>
          <div>
            <h3 class="font-medium text-base">{{ receipt.fileName }}</h3>
            <p class="text-sm text-muted-foreground">{{ receipt.date }}</p>
          </div>
        </div>
        
        <div class="flex items-center gap-4">
          <Badge 
            :variant="receipt.status === 'Invalid' ? 'destructive' : 'default'" 
            class="rounded-full px-3"
            :class="receipt.status === 'Done' ? 'bg-[#0f172a] hover:bg-[#0f172a]' : ''"
          >
            {{ receipt.status }}
          </Badge>
          
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button variant="ghost" size="icon" class="h-8 w-8 text-muted-foreground">
                <MoreHorizontal class="h-4 w-4" />
                <span class="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem @click="deleteReceipt(receipt.id)">
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </Card>
      
      <div v-if="receipts.length === 0" class="text-center py-12 border rounded-lg border-dashed">
        <p class="text-muted-foreground">No extractions found. Click "New Extraction" to start.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Plus, MoreHorizontal, FileText } from 'lucide-vue-next'
import { useReceiptsStore } from '~/stores/receipts'

const store = useReceiptsStore()
const receipts = computed(() => store.receipts)

const deleteReceipt = (id: string) => {
  store.deleteReceipt(id)
}
</script>
