// fake-script.js
document.write(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Latte X Games</title>
  <style>
    body {
      margin: 0;
      font-family: "Segoe UI", sans-serif;
      background: #1b1f25;
      color: #fff;
      display: flex;
      height: 100vh;
      overflow: hidden;
    }
    /* Sidebar */
    .sidebar {
      width: 220px;
      background: #171a21;
      display: flex;
      flex-direction: column;
      border-right: 1px solid #2a2f36;
    }
    .sidebar h2 {
      padding: 1rem;
      margin: 0;
      font-size: 1.1rem;
      font-weight: 600;
      color: #66c0f4;
    }
    .sidebar nav {
      display: flex;
      flex-direction: column;
    }
    .sidebar nav button {
      background: none;
      border: none;
      text-align: left;
      padding: 0.8rem 1rem;
      color: #c7d5e0;
      cursor: pointer;
      font-size: 0.95rem;
      transition: background 0.2s;
    }
    .sidebar nav button:hover {
      background: #2a475e;
      color: #fff;
    }

    /* Main area */
    .main {
      flex: 1;
      display: flex;
      flex-direction: column;
      background: #1b2838;
    }
    header {
      background: #171a21;
      padding: 0.6rem 1rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-bottom: 1px solid #2a2f36;
    }
    header h1 {
      margin: 0;
      font-size: 1.2rem;
      color: #66c0f4;
      font-weight: 600;
    }
    .search-controls {
      display: flex;
      align-items: center;
      gap: 0.6rem;
    }
    .search-controls input {
      background: #2a2f36;
      border: 1px solid #444b55;
      padding: 0.5rem 0.8rem;
      border-radius: 4px;
      color: #fff;
    }
    .search-controls select {
      background: #2a2f36;
      border: 1px solid #444b55;
      padding: 0.45rem 0.7rem;
      border-radius: 4px;
      color: #fff;
    }
    .search-controls input:focus,
    .search-controls select:focus {
      outline: 1px solid #66c0f4;
    }

    /* Grid */
    main {
      flex: 1;
      overflow-y: auto;
      padding: 1rem;
    }
    #grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
      gap: 1rem;
    }
    .card {
      background: #2a2f36;
      border-radius: 6px;
      overflow: hidden;
      cursor: pointer;
      transition: transform 0.2s;
      border: 1px solid #1b1f25;
    }
    .card:hover {
      transform: scale(1.03);
      border-color: #66c0f4;
    }
    .thumb {
      width: 100%;
      aspect-ratio: 16/9;
      background-size: cover;
      background-position: center;
    }
    .label {
      padding: 0.6rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 0.9rem;
      color: #c7d5e0;
    }
    .fav {
      cursor: pointer;
      font-size: 1rem;
    }
    .fav:hover {
      color: #66c0f4;
    }

    /* Popups */
    #details, #playmode {
      position: fixed;
      inset: 0;
      background: rgba(27, 31, 37, 0.98);
      display: flex;
      flex-direction: column;
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.3s ease;
      z-index: 1000;
    }
    #details.active, #playmode.active {
      opacity: 1;
      pointer-events: auto;
    }
    #details header, #playmode header {
      background: #171a21;
      padding: 0.6rem 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #2a2f36;
    }
    #details .content {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      padding: 2rem;
      text-align: center;
    }
    #details img {
      max-width: 300px;
      border-radius: 6px;
      border: 1px solid #2a2f36;
    }
    #details h2 {
      margin: 0;
      font-size: 1.6rem;
      color: #66c0f4;
    }
    #details p {
      max-width: 600px;
      color: #c7d5e0;
    }
    .play-btn {
      background: #66c0f4;
      color: #fff;
      border: none;
      padding: 0.7rem 1.2rem;
      border-radius: 4px;
      font-size: 1rem;
      cursor: pointer;
      transition: background 0.2s;
    }
    .play-btn:hover {
      background: #1999ff;
    }
    iframe {
      flex: 1;
      border: none;
    }
    .control-buttons button {
      background: none;
      border: none;
      color: #c7d5e0;
      font-size: 1.2rem;
      cursor: pointer;
      margin-left: 0.6rem;
    }
    .control-buttons button:hover {
      color: #66c0f4;
    }
  </style>
</head>
<body>
  <!-- Sidebar -->
  <aside class="sidebar">
    <h2>Library</h2>
    <nav>
      <button>pick a game im not stoping you </button>
    </nav>
  </aside>

  <!-- Main -->
  <div class="main">
    <header>
      <h1>Latte X Games</h1>
      <div class="search-controls">
        <input type="text" id="search" placeholder="Search games...">
        <span id="gameCount" style="font-size:0.85rem;color:#c7d5e0;">0 games</span>
        <select id="sort">
          <option value="az">Sort A–Z</option>
          <option value="za">Sort Z–A</option>
          <option value="fav">Favorites First</option>
        </select>
      </div>
    </header>
    <main>
      <div id="grid"></div>
      <p id="empty" style="text-align:center; margin-top:2rem; color:#777; display:none;">No games found</p>
    </main>
  </div>

  <!-- Details -->
  <div id="details">
    <header>
      <span id="detailTitle">Game Details</span>
      <div class="control-buttons">
        <button id="closeDetails">✖</button>
      </div>
    </header>
    <div class="content">
      <img id="detailImg" src="" alt="">
      <h2 id="detailName"></h2>
      <p id="detailDesc"></p>
      <button class="play-btn" id="playBtn">Play</button>
    </div>
  </div>

  <!-- Play mode -->
  <div id="playmode">
    <header>
      <span id="playTitle">Playing...</span>
      <div class="control-buttons">
        <button id="fullscreenBtn">⛶</button>
        <button id="closePlay">✖</button>
      </div>
    </header>
    <iframe id="gameFrame"></iframe>
  </div>

  <script src="https://cdn.jsdelivr.net/gh/RamenIgoodies/hiw@main/gamesitself.js"></script>
</body>
</html>
`);
