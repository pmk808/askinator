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
const messages = [
    { name: 'ChatGPT', text: 'Hello! How can I assist you today?' },
    { name: 'User', text: 'Hi, I have a question about your products.' },
    { name: 'ChatGPT', text: 'Sure, feel free to ask. I\'m here to help!' },
    { name: 'User', text: 'Do you have this product in different colors?' },
    { name: 'ChatGPT', text: 'Yes, we offer it in blue, red, and green.' },
    { name: 'User', text: 'Great, I\'ll take it in blue. Can I order it online?' },
    { name: 'ChatGPT', text: 'Absolutely! You can order it directly from our website.' },
    { name: 'User', text: 'Thank you for your help!' },
    { name: 'ChatGPT', text: 'You\'re welcome! If you have any more questions, feel free to ask.' },
    { name: 'ChatGPT', text: 'Hello! How can I assist you today?' },
    { name: 'User', text: 'Hi, I have a question about your products.' },
    { name: 'ChatGPT', text: 'Sure, feel free to ask. I\'m here to help!' },
    { name: 'User', text: 'Do you have this product in different colors?' },
    { name: 'ChatGPT', text: 'Yes, we offer it in blue, red, and green.' },
    { name: 'User', text: 'Great, I\'ll take it in blue. Can I order it online?' },
    { name: 'ChatGPT', text: 'Absolutely! You can order it directly from our website.' },
    { name: 'User', text: 'Thank you for your help!' },
    { name: 'ChatGPT', text: 'You\'re welcome! If you have any more questions, feel free to ask.' },
];
const userInput = ref('');

const sendMessage = () => {
  // Add logic to process user input (e.g., update messages)
  messages.push({ name: 'User', text: userInput.value });
  userInput.value = ''; // Clear input field after sending
}
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