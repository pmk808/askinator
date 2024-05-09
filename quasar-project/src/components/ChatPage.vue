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
import axios from 'axios';
import { ref } from 'vue';

// Define the endpoint URL
const geminiEndpoint = 'https://us-central1-aiplatform.googleapis.com/v1/projects/askinator/locations/us-central1/publishers/google/models/gemini-1.0-pro:streamGenerateContent?alt=sse';

// Define reactive variable for user input
const userInput = ref('');

// Define reactive variable for messages
const messages = ref([]);

// Function to send message
async function sendMessage() {
  // Add user message to the messages array
  messages.value.push({ name: 'User', text: userInput.value });

  // Define the request body
  const requestBody = {
    contents: [
      {
        role: 'user',
        parts: [
          {
            text: userInput.value,
          },
        ],
      },
    ],
    safety_settings: {
      category: "HARM_CATEGORY_SEXUALLY_EXPLICIT",
      threshold: "BLOCK_LOW_AND_ABOVE"
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
    // Send POST request to Gemini API endpoint
    const response = await axios.post(geminiEndpoint, requestBody);

    // Handle the response data
    console.log('Response:', response.data);
    // You can update your UI with the response data here
  } catch (error) {
    console.error('Error sending message:', error);
    // Handle errors here
  }

  // Clear user input after sending message
  userInput.value = '';
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
