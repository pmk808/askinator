// Import any necessary dependencies
import { ref } from 'vue';

// Define reactive variables
const message = ref('');
const chatHistory = ref([]);

// Define function to send a message
const sendMessage = () => {
  if (message.value.trim() === '') return;
  // Add the message to the chat history
  chatHistory.value.push({ sender: 'user', text: message.value });
  // Clear the input field
  message.value = '';
  // Simulate a response from the bot (for testing purposes)
  simulateBotResponse();
};

// Function to simulate a response from the bot (for testing purposes)
const simulateBotResponse = () => {
  setTimeout(() => {
    // Add the bot's response to the chat history
    chatHistory.value.push({ sender: 'bot', text: 'This is a simulated response from the bot.' });
  }, 500); // Simulate a delay for a more realistic chat experience
};

// Export the variables and functions
export {
  message,
  chatHistory,
  sendMessage
};
