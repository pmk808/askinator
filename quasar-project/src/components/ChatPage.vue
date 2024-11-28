<template>
  <div class="q-pa-md row justify-center">
    <div style="width: 100%; max-width: 400px">
      <!-- Display chat messages -->
      <div class="chat-message" v-for="(message, index) in messages" :key="index">
        <div class="sender">{{ message.name }}</div>
        <div class="text">{{ message.text }}</div>
      </div>
      
      <!-- User input and send button -->
      <div class="user-input">
        <input type="text" v-model="userInput" placeholder="Type your message..." />
        <button @click="sendMessage" class="q-btn bg-cyan">Send</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import { ref } from 'vue';

// Load sensitive information from environment variables
const GEMINI_API_ENDPOINT = process.env.VUE_APP_GEMINI_API_ENDPOINT; 
console.log(
  process.env.NODE_ENV === 'development'
    ? `Gemini API Endpoint: ${GEMINI_API_ENDPOINT}`
    : 'Gemini API Endpoint is loaded from environment variables.'
);

// Reactive variables for user input and chat messages
const userInput = ref('');
const messages = ref([]);

// Function to send message
async function sendMessage() {
  // Add user's message to the messages array
  messages.value.push({ name: 'User', text: userInput.value });

  // Define the request body
  const requestBody = {
    contents: [
      {
        role: 'user',
        parts: [{ text: userInput.value }],
      },
    ],
    safety_settings: {
      category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
      threshold: 'BLOCK_LOW_AND_ABOVE',
    },
    generationConfig: {
      temperature: 0.7,
      topP: 0.8,
      topK: 40,
      candidateCount: 1,
      maxOutputTokens: 100,
    },
  };

  try {
    // Send POST request to the Gemini API endpoint
    const response = await axios.post(GEMINI_API_ENDPOINT, requestBody);

    // Process the response data
    const reply = response.data?.content ?? 'No reply received.';
    console.log('API Reply:', reply);

    // Add the response message to the messages array
    messages.value.push({ name: 'Gemini', text: reply });
  } catch (error) {
    // Log error safely in production
    if (process.env.NODE_ENV === 'development') {
      console.error('Error sending message:', error);
    } else {
      console.error('An error occurred while sending the message.');
    }
  }

  // Clear user input after sending
  userInput.value = '';
}
</script>

<style scoped>
/* Scoped styling for chat UI */
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
