# Bermuda Triangle(Devils Triangle) Incident Tracker

This project visualizes the mysterious incidents and locations in the Bermuda Triangle using **React** and **Mapbox GL JS**. The application features an interactive map and story panel that provide detailed information about events in the triangle's history.

---

### Live Site: [Bermuda Triangle(Devils Triangle)](https://devilstriangle.netlify.app/)

---

## Features

### Interactive Map

- Displays incident locations with custom markers.
- Animates the map to focus on selected incidents.
- Popups provide additional details about each event.

### Story Panel

- Lists incidents chronologically with titles and dates.
- Allows users to explore incidents interactively by clicking on them.

### Atmospheric Layers

- Visualizes weather patterns with a raster overlay.
- Simulates fog and other effects for added immersion.

### Embedded Media

- **YouTube video** embedded for historical background.
- Images displayed in popups for additional context.

---

## Installation

### Prerequisites

- Node.js (v16+ recommended)
- A Mapbox account and access token (sign up [here](https://www.mapbox.com/))

### Setup Steps

1. Clone the repository

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables: Create a .env file in the root directory and include the following:

   ```env
    VITE_MAPBOX_ACCESS_TOKEN=your_mapbox_access_token
    VITE_WEATHER_TILE_URL=your_weather_tile_url

   ```

4. Start the development server:

   ```bash
    npm run dev
   ```

5. Open the application in your browser at `http://localhost:5173`

---

## Usage

### Explore Incidents

1. View a list of incidents in the Story Panel on the left.
2. Click on an incident to see its details and location on the map.
3. Read detailed descriptions in popups that appear on the map.

Add new incidents to the `incidents.js` file in the `src/` directory.

```javascript

    {
        type: "Feature",
        properties: {
            name: "New Incident",
            date: "January 1, 2023",
            description: "Description of the new incident.",
        },
        geometry: {
            type: "Point",
            coordinates: [-80.0, 25.0],
        },
    }

```

### File Structure

```bash
src/
├── App.jsx                 # Main application component.
├── MapComponent.jsx        # Handles Mapbox interactions and layers.
├── StoryPanel.jsx          # Displays a list of stories and handles user
├── incidents.js            # GeoJSON data of incidents.
├── App.css                 # Global styles for the app.
```

### Technologies used

- React: A JavaScript library for building user interfaces.
- Mapbox GL JS: A JavaScript library for interactive, customizable maps.
- Vite: A fast, modern build tool that supports React and ES modules.
- GeoJSON: A format for encoding a variety of geographic data structures.

### Video

https://github.com/user-attachments/assets/5effd17b-87b3-486b-a6ea-eccabf667702

---

[<img src="https://img.youtube.com/vi/AgMcqNnqatw/0.jpg" width="1050" height="600"
/>](https://www.youtube.com/embed/AgMcqNnqatw)
