<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';

  let notes = [];
  let messages = [];
  let newNote = '';
  let newMessage = '';
  let username = 'Lucas'; // 🚀 Kan kopplas till login sen

  onMount(() => {
    fetchNotes();
    fetchMessages();
    setInterval(fetchMessages, 2000);
  });

  async function fetchNotes() {
    try {
      const res = await fetch('http://localhost:8000/admin/notes');
      const data = await res.json();
      notes = data;
    } catch (error) {
      console.error('Fel vid hämtning av notes:', error);
    }
  }

  async function fetchMessages() {
    try {
      const res = await fetch('http://localhost:8000/admin/messages');
      const data = await res.json();
      messages = data;
    } catch (error) {
      console.error('Fel vid hämtning av meddelanden:', error);
    }
  }

  async function sendNote() {
    if (newNote.trim() === '') return;
    try {
      await fetch('http://localhost:8000/admin/notes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: notes.length + 1,
          title: newNote,
          tag: 'Quest'
        })
      });
      newNote = '';
      fetchNotes();
    } catch (error) {
      console.error('Fel vid post av note:', error);
    }
  }

  async function sendMessage() {
    if (newMessage.trim() === '') return;
    try {
      await fetch('http://localhost:8000/admin/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: messages.length + 1,
          user: username,
          text: newMessage
        })
      });
      newMessage = '';
      fetchMessages();
    } catch (error) {
      console.error('Fel vid post av meddelande:', error);
    }
  }
</script>

<main class="container">
  <div class="banner">
    <h1>🍻 Tavernan - Lime Admin Tavern</h1>
    <p>Häng, snacka och posta quests tillsammans!</p>
  </div>

  <div class="content">
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
