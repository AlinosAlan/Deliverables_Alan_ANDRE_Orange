import useAboutStore from "../stores/aboutStore";
import { useStore } from "../stores/useStore";
import "./About.css";
 
const About = () => {
  const { description, setDescription } = useAboutStore();
  const { username } = useStore();
 
  return (
    <div className="about-page">
      <h1>About</h1>
 
      <p className="about-username">{username || "No username set"}</p>
 
      <textarea
        className="about-textarea"
        placeholder="Write your description here..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
 
      {description && (
        <p className="about-description">{description}</p>
      )}
    </div>
  );
};
 
export default About;