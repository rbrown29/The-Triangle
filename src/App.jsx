import { useState } from "react";
import { incidentsGeoJSON } from "./incidents"; // Import incidents
import MapComponent from "./Map";
import StoryPanel from "./StoryPanel";
import "./App.css"; // Import CSS

const App = () => {
  const [selectedStory, setSelectedStory] = useState(null);

  // Create stories from incidents
  const stories = incidentsGeoJSON.features.map((feature) => ({
    title: feature.properties.name,
    date: feature.properties.date,
  }));

  const handleSelectStory = (index) => {
    const story = stories[index];
    const geoFeature = incidentsGeoJSON.features[index];

    if (geoFeature) {
      const selected = {
        ...story,
        longitude: geoFeature.geometry.coordinates[0],
        latitude: geoFeature.geometry.coordinates[1],
        description: geoFeature.properties.description,
      };
      setSelectedStory(selected);
      console.log("Selected Story with GeoJSON:", selected);
    }
  };

  return (
    <div className="app-container">
      <StoryPanel stories={stories} onSelectStory={handleSelectStory} />
      <MapComponent selectedLocation={selectedStory} />
    </div>
  );
};

export default App;








