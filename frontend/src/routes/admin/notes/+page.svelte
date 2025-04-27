<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';

  let notes = [];
  let messages = [];
  let newNote = '';
  let newMessage = '';
  let username = 'Lucas'; // 🚀 Kan kopplas till login sen

  // Mock-fetch på notes och messages
  onMount(() => {
    fetchNotes();
    fetchMessages();
    // Enkel polling var 2 sek för chat
    setInterval(fetchMessages, 2000);
  });

  async function fetchNotes() {
    // TODO: Hämta från API
    notes = [
      { id: 1, title: '🔥 Uppgradera servern', tag: 'Quest' },
      { id: 2, title: '✨ Nya API endpoints live', tag: 'Update' }
    ];
  }

  async function fetchMessages() {
    // TODO: Hämta från API
    messages = [
      { id: 1, user: 'Lucas', text: 'Vi deployade precis!' },
      { id: 2, user: 'Du', text: 'Nice, jag testar!' }
    ];
  }

  async function sendNote() {
    if (newNote.trim() === '') return;
    // TODO: POST till backend
    notes.push({ id: notes.length + 1, title: newNote, tag: 'Quest' });
    newNote = '';
  }

  async function sendMessage() {
    if (newMessage.trim() === '') return;
    // TODO: POST till backend
    messages.push({ id: messages.length + 1, user: username, text: newMessage });
    newMessage = '';
  }
</script>

<main class="container">
  <div class="banner">
    <h1>🍻 Tavernan - Lime Admin Tavern</h1>
    <p>Häng, snacka och posta quests tillsammans!</p>
  </div>

  <div class="content">
    <!-- Vänster: Quest Board -->
    <div class="notes">
      <h2>🧙 Quest Board</h2>
      <div class="notes-list">
        {#each notes as note}
          <div class="note">
            <h3>{note.title}</h3>
            <span class="tag">{note.tag}</span>
          </div>
        {/each}
      </div>

      <div class="new-note">
        <input bind:value={newNote} placeholder="Ny quest eller update..." />
        <button on:click={sendNote}>Posta Quest</button>
      </div>
    </div>

    <!-- Höger: Chat -->
    <div class="chat">
      <h2>💬 Tavern Talk</h2>
      <div class="chat-messages">
        {#each messages as msg}
          <div class="message">
            <strong>{msg.user}:</strong> {msg.text}
          </div>
        {/each}
      </div>

      <div class="new-message">
        <input bind:value={newMessage} placeholder="Skriv ett meddelande..." />
        <button on:click={sendMessage}>Skicka</button>
      </div>
    </div>
  </div>
</main>

<style>
  .container {
    display: flex;
    flex-direction: column;
    height: 100vh;
    background: #f9f5e3;
  }

  .banner {
    background: #8b5e3c;
    color: white;
    text-align: center;
    padding: 2rem;
  }

  .content {
    display: flex;
    flex: 1;
    overflow: hidden;
  }

  .notes, .chat {
    padding: 2rem;
    overflow-y: auto;
  }

  .notes {
    flex: 2;
    border-right: 2px solid #d3c7b2;
    background: #fcf8e8;
  }

  .chat {
    flex: 1;
    background: #f2ebe3;
  }

  .notes-list, .chat-messages {
    margin-bottom: 2rem;
  }

  .note, .message {
    background: #fff;
    padding: 1rem;
    margin-bottom: 1rem;
    border-radius: 8px;
    box-shadow: 0 0 5px rgba(0,0,0,0.1);
  }

  .tag {
    display: inline-block;
    margin-top: 0.5rem;
    background: #d3c7b2;
    padding: 0.25rem 0.5rem;
    border-radius: 4px;
    font-size: 0.8rem;
  }

  input {
    padding: 0.75rem;
    width: 100%;
    margin-bottom: 1rem;
    border-radius: 6px;
    border: 1px solid #ccc;
    font-size: 1rem;
  }

  button {
    background: #22c55e;
    color: white;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 1rem;
  }

  button:hover {
    background: #16a34a;
  }

  .new-note, .new-message {
    margin-top: auto;
  }
</style>
