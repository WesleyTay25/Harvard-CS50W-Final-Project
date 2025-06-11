# StreamSphere

**CS50W Final Project**
Author: Wesley Tay
Demo Video: https://youtu.be/4mF_HLOnMoY

## Description

StreamSphere is a Spotify-inspired music streaming platform I created in hopes of having my own free version of Spotify. It allows users to search for tracks via the Deezer API, create and manage playlists. Users can play, pause, skip, restart, loop tracks, and browse songs directly within the app. Wanting to expose myself to full-stack development, I made StreamSphere using a React.js frontend with a Django backend, linking them together with API calls using DjangoForestFramework and Axios, styling the frontend with TailwindCSS, and adding security to the web application using JWT Tokens.

## Distinctiveness and Complexity

StreamSphere is distinct and complex for several key reasons:
-------------------------------------------------------------------------------------------------------

It is not a social network, e-commerce platform, or clone of any previous CS50W project. 

It implements an interactive music player with playback controls (play, pause, skip, previous, restart, loop) and contextual playlist navigation.

Wanting to avoid having the User download his own audio files, the application fetches real song data from the Deezer API, simulating a real-world streaming experience.

The project uses React with Axios for a single-page application frontend and communicates with a Django REST Framework API to connect the backend to the frontend.

I added JWT (access and refresh tokens) authentication to secure API routes, session management, and user authentication.

I used React's component features to develop the app such as React "useContext" Hook to manage global state across components (e.g. audio playback and current track info).

I used TailwindCSS to ensure that SteamSphere is fully mobile-responsive

I had ran into problems such as long fetching times which forced me to optimise my code by making some functions asynchronous while fetching data and keeping latency and scalability in mind. Additonally, I ran into audio URL expiration problem, which forced me to develop features to refresh audio URLS

This is more complex than any of the course projects I had done before due to the integration between frontend and backend, interactive state management, and extensive API consumption.

## Functionality

* User registration and login with JWT tokens
* Search for songs using the Deezer API
* Play previews of songs
* Create, name and delete custom playlists
* Add or remove songs from playlists
* Skip to next/previous track in playlist
* Playback bar with play/pause, restart, loop, skip song and prev song
* Automatic refresh of Deezer preview URLs when expired
* Secure access to playlists per user
* Fully responsive design with TailwindCSS

## Technologies Used

* **Frontend:** React.js, Axios, TailwindCSS
* **Backend:** Django, Django REST Framework
* **Authentication:** JSON Web Tokens (JWT)
* **Audio:** HTML5 Audio API
* **External API:** Deezer Music API
* **State Management:** React Context API

## File Structure Overview

* `frontend/` – React app with components for search, playback bar, playlist display, etc.

  * `SearchResults.jsx` – Shows search results and allows playing/adding tracks
  * `PlaybackBar.jsx` – Interactive player to control audio
  * `PlaylistDetails.jsx` – Shows playlist data and song list
  * `PlayerContext.jsx` – Global audio playback state/context
  * `Navbar.jsx` - Navigation Bar
  * `Form.jsx` - Form for logging/registering
  * `UserPlaylist.jsx` - Shows all User Created Playlists
  * `protectedRoute.jsx` - Ensures User is logged in before accessing certain routes
  * `App.jsx` - Architecture of all routes

* `backend/`

  * `models.py` – Playlist, Track, and PlaylistTrack models
  * `views.py` – DjangoRESTFramework APIViews for managing playlists, tracks, and preview URL refreshing
  * `serializers.py` – Serializers for converting models to/from JSON for integration of React and Django
  * `urls.py` – API endpoints
* `requirements.txt` – Python packages required
* `README.md` – This file

---

## How to Run

1. Create and activate a virtual environment:
   python -m venv venv
   source venv/bin/activate  
 
2. Install dependencies:
   pip install -r requirements.txt

3. Run the server:
   python manage.py runserver

4. Navigate to the `frontend` directory:
   cd frontend

5. Install npm packages:
   npm install

6. Start the development server:
   npm run dev


### Notes:
* Your backend must be running for the React frontend to communicate via API.

## Additional Notes

* Preview audio is handled via Deezer-provided temporary URLs that are refreshed on demand to avoid expiration.
* Audio playback state is managed across components with a custom React Context.
* The app was tested on mobile and desktop screen sizes for responsiveness.

## Requirements

All required Python packages are listed in `requirements.txt`.
All required frontend packages are managed via `npm` and listed in `frontend/package.json`.

Thank you for reviewing StreamSphere!

Wesley Tay, CS50W 2025


