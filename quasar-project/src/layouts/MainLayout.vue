<template>
  <q-layout view="lHh Lpr lFf" class="gray-background">

    <q-header class="gray-background">
      <q-toolbar>
        <q-toolbar-title class="cyan-text">
          Askinator
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

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

      <q-page-container>
        <q-page padding>
          <router-view />
          <q-page-scroller reverse position="top" :scroll-offset="20" :offset="[0, 18]">
            <q-btn fab icon="keyboard_arrow_down" color="cyan" />
          </q-page-scroller>
        </q-page>
      </q-page-container>

    </q-page-container>

    <q-card v-if="!leftDrawerOpen"
      style="position: fixed; bottom: 0; left: 0; width: 80px; height: 100vh; display: flex; flex-direction: column; justify-content: flex-end;">
      <q-card-section style="text-align: center;">
        <div style="flex-grow: 1;"></div>
        <q-icon name="home" size="24px" style="margin-bottom: 15px;"></q-icon>
        <q-btn flat dense round aria-label="Menu" @click="toggleLeftDrawer">
          <q-icon name="menu" color="cyan" size="24px" style="margin-bottom: 10px;" />
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

.cyan-text {
  color: black;
  font-weight: bold;
}
</style>
