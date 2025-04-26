<script>
  import { goto } from '$app/navigation';
  import { page } from '$app/stores';

  // Get supabase client and session from page data
  $: ({ supabase, session } = $page.data);

  let email = '';
  let password = '';
  let loading = false;
  let errorMessage = '';

  // Sign in with email and password
  async function handleLogin() {
    try {
      loading = true;
      errorMessage = '';
      
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      });
      
      if (error) {
        errorMessage = error.message;
        return;
      }
      
      // Navigate to home page on successful login
      goto('/');
      
    } catch (error) {
      console.error('Login error:', error);
      errorMessage = error.message;
    } finally {
      loading = false;
    }
  }

  // Sign up with email and password
  async function handleSignUp() {
    try {
      loading = true;
      errorMessage = '';
      
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      });
      
      if (error) {
        errorMessage = error.message;
        return;
      }
      
      // Show success message or redirect
      alert('Check your email for the confirmation link');
      
    } catch (error) {
      console.error('Signup error:', error);
      errorMessage = error.message;
    } finally {
      loading = false;
    }
  }

  // Sign out
  async function handleSignOut() {
    try {
      loading = true;
      
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        errorMessage = error.message;
        return;
      }
      
      // Refresh the page to update the session
      window.location.reload();
      
    } catch (error) {
      console.error('Signout error:', error);
      errorMessage = error.message;
    } finally {
      loading = false;
    }
  }

  // Sign in with OAuth providers
  async function signInWithProvider(provider) {
    try {
      loading = true;
      errorMessage = '';
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });
      
      if (error) {
        errorMessage = error.message;
      }
    } catch (error) {
      console.error(`Sign in with ${provider} error:`, error);
      errorMessage = error.message;
    } finally {
      loading = false;
    }
  }
</script>

<svelte:head>
  <title>Authentication</title>
</svelte:head>

<div class="auth-container">
  <h1>Authentication</h1>
  
  {#if errorMessage}
    <div class="error-message">
      {errorMessage}
    </div>
  {/if}
  
  {#if session}
    <!-- Logged in state -->
    <div class="profile-section">
      <h2>You are logged in</h2>
      <p>Email: {session.user.email}</p>
      <button on:click={handleSignOut} disabled={loading}>
        {loading ? 'Loading...' : 'Sign Out'}
      </button>
    </div>
  {:else}
    <!-- Authentication form -->
    <form on:submit|preventDefault={handleLogin} class="auth-form">
      <div class="form-group">
        <label for="email">Email</label>
        <input
          id="email"
          type="email"
          bind:value={email}
          required
          placeholder="Your email"
        />
      </div>
      
      <div class="form-group">
        <label for="password">Password</label>
        <input
          id="password"
          type="password"
          bind:value={password}
          required
          placeholder="Your password"
          minlength="6"
        />
      </div>
      
      <div class="button-group">
        <button type="submit" disabled={loading} class="primary-button">
          {loading ? 'Loading...' : 'Sign In'}
        </button>
        <button type="button" on:click={handleSignUp} disabled={loading} class="secondary-button">
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
      </div>
    </form>
    
    <div class="divider">OR</div>
    
    <!-- OAuth Providers -->
    <div class="oauth-providers">
      <button on:click={() => signInWithProvider('google')} disabled={loading} class="oauth-button google">
        Continue with Google
      </button>
      <button on:click={() => signInWithProvider('github')} disabled={loading} class="oauth-button github">
        Continue with GitHub
      </button>
    </div>
  {/if}
</div>

<style>
  .auth-container {
    max-width: 400px;
    margin: 2rem auto;
    padding: 2rem;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  }
  
  h1 {
    text-align: center;
    margin-bottom: 2rem;
    color: #333;
  }
  
  .error-message {
    background-color: #ffebee;
    color: #d32f2f;
    padding: 0.75rem;
    border-radius: 4px;
    margin-bottom: 1.5rem;
    text-align: center;
  }
  
  .form-group {
    margin-bottom: 1.25rem;
  }
  
  label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: #555;
  }
  
  input {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 1rem;
  }
  
  input:focus {
    outline: none;
    border-color: #4a56e2;
    box-shadow: 0 0 0 2px rgba(74, 86, 226, 0.2);
  }
  
  .button-group {
    display: flex;
    gap: 1rem;
    margin-top: 1.5rem;
  }
  
  button {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 4px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s, transform 0.1s;
  }
  
  button:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
  
  .primary-button {
    background-color: #4a56e2;
    color: white;
    flex: 1;
  }
  
  .primary-button:hover:not(:disabled) {
    background-color: #3a46d2;
  }
  
  .secondary-button {
    background-color: #f5f5f5;
    color: #333;
    flex: 1;
  }
  
  .secondary-button:hover:not(:disabled) {
    background-color: #e5e5e5;
  }
  
  .divider {
    display: flex;
    align-items: center;
    margin: 2rem 0;
    color: #777;
  }
  
  .divider::before,
  .divider::after {
    content: "";
    flex: 1;
    border-bottom: 1px solid #ddd;
  }
  
  .divider::before {
    margin-right: 1rem;
  }
  
  .divider::after {
    margin-left: 1rem;
  }
  
  .oauth-providers {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  
  .oauth-button {
    display: flex;
    justify-content: center;
    padding: 0.75rem;
    background-color: #fff;
    border: 1px solid #ddd;
    color: #333;
    font-weight: 500;
  }
  
  .oauth-button:hover:not(:disabled) {
    background-color: #f5f5f5;
  }
  
  .profile-section {
    text-align: center;
  }
  
  .profile-section h2 {
    margin-bottom: 1rem;
    color: #333;
  }
  
  .profile-section p {
    margin-bottom: 1.5rem;
    color: #555;
  }
</style>

