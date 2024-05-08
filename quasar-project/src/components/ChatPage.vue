<template>
  <div class="q-pa-md row justify-center">
    <div style="width: 100%; max-width: 400px">
      <div class="chat-message" v-for="(message, index) in messages" :key="index">
        <div class="sender">{{ message.name }}</div>
        <div class="text">{{ message.text }}</div>
      </div>
      <div class="user-input">
        <input type="text" v-model="userInput" placeholder="Type your message..." />
        <button @click="sendMessage" class="q-btn bg-cyan">Send</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import generateContent from './scripts/index';

const messages = [];
const userInput = ref('');

const sendMessage = async () => {
  try {
    // Call generateContent function to get generated messages
    const generatedMessages = await generateContent();
    
    // Add generated messages to the messages array
    messages.push(...generatedMessages);
    
    // Clear user input
    userInput.value = '';
  } catch (error) {
    console.error('Error:', error.message);
    // Handle errors, e.g., display an error message to the user
  }
};
</script>

<style scoped>
@import url('./styles/ChatPage.scss');

.user-input {
  display: flex;
  margin-top: 10px;
}

.user-input input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.user-input button {
  padding: 10px 15px;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
</style>
