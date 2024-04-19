<template>
  <q-page class="flex flex-start">
    <q-card class="q-mb-md"
      style="max-width: 500px; min-width: 390px; margin-bottom: 0px; margin-top: 70px; margin-left: 20px;">
      <q-card-section>
        <q-card-title style="font-weight: 400; font-size: 20px;">Menu</q-card-title>
        <q-card-main>
        </q-card-main>
      </q-card-section>
    </q-card>
    <!-- <add-store-form @submit="showDisplayForm" v-if="!displayStoreForm" />
    <display-store-form v-if="displayStoreForm" /> -->
  </q-page>
</template>

<script setup>
import ChatPage from 'components/ChatPage.vue';
// import DisplayStoreForm from 'components/DisplayStoreForm.vue';
import { ref } from 'vue';

const displayStoreForm = ref(false);

function showDisplayForm() {
  displayStoreForm.value = true;
}
</script>

<style scoped>
.form-group {
  margin-bottom: 20px;
}

.required {
  color: red;
  margin-left: 5px;
}
</style>
