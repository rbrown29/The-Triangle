import PropTypes from "prop-types";

const StoryPanel = ({ stories, onSelectStory }) => (
  <div className="story-panel">
    <h1 style={{ marginBottom: "20px" }}>Bermuda Triangle (Devils Triangle)</h1>
    <p style={{ marginBottom: "20px" }}>The Bermuda Triangle dates back to the times of the great explorer and navigator Christopher Columbus. He was the first to see fire crashing into the sea in the triangle during his voyage. First unusual disappearances was reported only in the 19th century and the region came to the public attention in the 20th century when a Navy cargo ship with more than 300 people on board, went missing. Paranormal activities and the presence of aliens was strongly suggested as the cause for this, however scientific theory says that it is because of magnetic anomalies. No single theory was able to prove the exact reason behind the mystery. Many believe that there is nothing strange but accidents continue to happen in the region every year.
    </p>
    <iframe width="560" height="315" src="https://www.youtube.com/embed/AgMcqNnqatw?si=gsYY4-9SLzMJVHHO" title="YouTube video player"  allowfullscreen style={{ marginBottom: "20px" }}></iframe>
    <p style={{ marginBottom: "20px" }}> Select a story to view more details.</p>
    {stories.map((story, index) => (
      <div
        key={index}
        className="story-item"
        onClick={() => onSelectStory(index)}
      >
        <h2 style={{ margin: "0 0 10px 0" }}>{story.title}</h2>
        <p style={{ margin: 0 }}>{story.date}</p>
      </div>
    ))}
    <p style={{ marginTop: "20px"}}>
        Made By:{" "}
        <a
            href="https://interactive-reality.netlify.app/"
            target="_blank"
            rel="noreferrer"
            style={{ color: "#08ff08" }}
        >
            Richard Brown
        </a>
    </p>
  </div>
);

StoryPanel.propTypes = {
  stories: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      date: PropTypes.string.isRequired,
    })
  ).isRequired,
  onSelectStory: PropTypes.func.isRequired,
};

export default StoryPanel;
