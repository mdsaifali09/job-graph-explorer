import { useEffect, useState } from "react";

import DeveloperCard from "../components/DeveloperCard";
import SearchBar from "../components/SearchBar";

import {
  getDevelopers,
  searchBySkill,
  getDeveloper,
} from "../services/api";

function Dashboard() {
  const [developers, setDevelopers] = useState([]);
  const [selectedDeveloper, setSelectedDeveloper] = useState(null);

  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadDevelopers();
  }, []);

  const loadDevelopers = async () => {
    try {
      setLoading(true);

      const response = await getDevelopers();

      setDevelopers(response.data || []);
    } catch (error) {
      setError("Unable to load developers.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (skill) => {
    try {
      setSearching(true);
      setError("");

      const response = await searchBySkill(skill);

      const results = (response.data || []).map(
        (item) => item.developer
      );

      setDevelopers(results);
    } catch (error) {
      setError("Search failed. Please try again.");
    } finally {
      setSearching(false);
    }
  };

  const handleDeveloperClick = async (id) => {
    try {
      setError("");

      const response = await getDeveloper(id);

      setSelectedDeveloper(response.data);
    } catch (error) {
      setError("Unable to load developer profile.");
    }
  };

  return (
    <div className="dashboard">
      <div className="hero">
        <p className="eyebrow">GRAPH DATABASE EXPLORER</p>

        <h1>
          Discover developers through
          <span> connected skills.</span>
        </h1>

        <p className="subtitle">
          Explore developers, skills and projects powered by
          CognoDB graph relationships.
        </p>

        <SearchBar onSearch={handleSearch} />
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      <section className="developers-section">
        <div className="section-header">
          <div>
            <p className="eyebrow">DEVELOPERS</p>

            <h2>
              {searching
                ? "Searching..."
                : "Explore developers"}
            </h2>
          </div>

          <span className="result-count">
            {developers.length} results
          </span>
        </div>

        {loading || searching ? (
  <div className="loading">
    {searching
      ? "Searching developers..."
      : "Loading developers..."}
  </div>
) : developers.length === 0 ? (
          <div className="empty">
            No developers found.
          </div>
        ) : (
          <div className="developer-grid">
            {developers.map((developer) => (
              <DeveloperCard
                key={developer.id}
                developer={developer}
                onClick={handleDeveloperClick}
              />
            ))}
          </div>
        )}
      </section>

      {selectedDeveloper && (
        <div className="profile-panel">
          <button
            className="close-btn"
            onClick={() => setSelectedDeveloper(null)}
          >
            ×
          </button>

          <div className="profile-avatar">
            {selectedDeveloper.developer.name.charAt(0)}
          </div>

          <h2>
            {selectedDeveloper.developer.name}
          </h2>

          <p className="profile-id">
            {selectedDeveloper.developer.id}
          </p>

          <h3>Skills</h3>

          <div className="tags">
            {selectedDeveloper.skills.map((skill) => (
              <span key={skill.name}>
                {skill.name}
              </span>
            ))}
          </div>

          <h3>Projects</h3>

          <div className="projects">
            {selectedDeveloper.projects.map((project) => (
              <div key={project.id}>
                {project.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;