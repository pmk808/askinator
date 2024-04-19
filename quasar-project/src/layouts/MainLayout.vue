<template>
  <q-layout view="lHh Lpr lFf" class="gray-background">
 
    <q-drawer v-model="leftDrawerOpen" show-if-above bordered side="left">
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />
      </q-toolbar>
      <q-list>
        <q-item clickable v-for="item in drawerItems" :key="item.title" @click="handleDrawerItemClick(item)">
          <q-item-section>
            <q-item-label>{{ item.title }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container :class="leftDrawerOpen ? '' : 'left-margin'">

      <router-view />
  
    </q-page-container>

    <q-card v-if="!leftDrawerOpen"
      style="position: fixed; bottom: 0; left: 0; width: 80px; height: 100vh; display: flex; flex-direction: column; justify-content: flex-end;">
      <q-card-section style="text-align: center;">
        <div style="flex-grow: 1;"></div>
        <q-icon name="home" size="24px" style="margin-bottom: 15px;"></q-icon>
        <q-btn flat dense round aria-label="Menu" @click="toggleLeftDrawer">
          <q-icon name="menu" color="orange" size="24px" style="margin-bottom: 10px;" />
        </q-btn>
        <div style="font-size: 12px;">Menu</div>
      </q-card-section>
    </q-card>

  </q-layout>
</template>

<script setup>
import { ref, onMounted } from 'vue'

defineOptions({
  name: 'MainLayout'
})

const leftDrawerOpen = ref(false)

onMounted(() => {
  leftDrawerOpen.value = false;
})

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

const drawerItems = [
  { title: 'Item 1' },
  { title: 'Item 2' },
  { title: 'Item 3' }
]
</script>

<style scoped>
.gray-background {
  background-color: #f2f2f2;
}

.left-margin {
  margin-left: 80px;
}
</style>
