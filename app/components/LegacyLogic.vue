<script setup lang="ts">
import { ref, computed } from 'vue';

const items = ref([
  { id: 1, name: 'Apple', price: 10, category: 'fruit', stock: 5 },
  { id: 2, name: 'Banana', price: 5, category: 'fruit', stock: 12 },
  { id: 3, name: 'Carrot', price: 2, category: 'vegetable', stock: 0 },
  { id: 4, name: 'Doughnut', price: 15, category: 'pastry', stock: 2 },
]);

// --- DUPLICATION ISSUE ---
// This function is nearly identical to the calculateTotalV2 below
const calculateTotalV1 = (list: any[]) => {
  let total = 0;
  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    if (item.category === 'fruit' || item.category === 'pastry') {
      if (item.price > 5) {
        total += item.price * (item.stock || 1);
      } else {
        total += item.price;
      }
    }
  }
  return total;
};

const calculateTotalV2 = (arr: any[]) => {
  let finalResult = 0;
  for (let j = 0; j < arr.length; j++) {
    const obj = arr[j];
    if (obj.category === 'fruit' || obj.category === 'pastry') {
      if (obj.price > 5) {
        finalResult += obj.price * (obj.stock || 1);
      } else {
        finalResult += obj.price;
      }
    }
  }
  return finalResult;
};

// --- MAINTAINABILITY / COMPLEXITY ISSUE ---
// Extremely nested function with high cognitive complexity
const processOrder = (order: any, userId: string, discountCode: string) => {
  if (order) {
    if (order.status === 'pending') {
      if (order.items && order.items.length > 0) {
        order.items.forEach((item: any) => {
          if (item.stock > 0) {
            if (userId !== "GUEST") {
              if (discountCode) {
                if (discountCode === 'SAVE10') {
                  item.price = item.price * 0.9;
                } else if (discountCode === 'SAVE20') {
                  item.price = item.price * 0.8;
                } else {
                  console.log("Invalid discount");
                }
              } else {
                console.log("No discount applied for member");
              }
            } else {
              if (item.isPromo) {
                item.price = item.price * 0.95;
              }
            }
          } else {
            console.error("Item out of stock");
          }
        });
      }
    } else if (order.status === 'cancelled') {
      console.log("Order is already cancelled");
    }
  }
  
  // Unused variable
  const unusedVariable = "I am never used anywhere";
  
  return order;
};

// Hardcoded secret (though user didn't ask, it's a sonarqube classic)
const API_KEY = "12345-ABCDE-SECRET-KEY";

const total1 = computed(() => calculateTotalV1(items.value));
const total2 = computed(() => calculateTotalV2(items.value));

</script>

<template>
  <div class="legacy-component border-4 border-red-500 p-8 m-4 rounded-3xl bg-red-50">
    <h1 class="text-3xl font-black text-red-600 mb-6">SonarQube Detection Challenge 🔥</h1>
    
    <div class="grid grid-cols-2 gap-8">
      <div class="bg-white p-6 rounded-2xl shadow-xl">
        <h2 class="text-xl font-bold mb-4">Total V1 (Fruit & Pastry)</h2>
        <p class="text-4xl font-mono text-blue-600">${{ total1 }}</p>
      </div>

      <div class="bg-white p-6 rounded-2xl shadow-xl">
        <h2 class="text-xl font-bold mb-4">Total V2 (Duplicated Logic)</h2>
        <p class="text-4xl font-mono text-purple-600">${{ total2 }}</p>
      </div>
    </div>

    <div class="mt-8 p-6 bg-yellow-100 rounded-2xl border-2 border-yellow-300">
      <p class="font-medium text-yellow-800">
        This component contains:
        <ul class="list-disc ml-6 mt-2">
          <li><strong>Duplication:</strong> <code>calculateTotalV1</code> and <code>calculateTotalV2</code> are nearly identical.</li>
          <li><strong>Cognitive Complexity:</strong> <code>processOrder</code> has 7 levels of nesting.</li>
          <li><strong>Maintainability:</strong> Unused variables, hardcoded secrets, and inefficient loops.</li>
        </ul>
      </p>
    </div>
  </div>
</template>

<style scoped>
.legacy-component {
  font-family: 'Inter', sans-serif;
}
</style>
