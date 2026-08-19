function DeveloperCard({ developer, onClick }) {
  return (
    <div className="developer-card">
      <div className="avatar">
        {developer.name?.charAt(0)}
      </div>

      <div className="developer-info">
        <h3>{developer.name}</h3>
        <p>{developer.id}</p>
      </div>

      <button onClick={() => onClick(developer.id)}>
        View Profile
      </button>
    </div>
  );
}

export default DeveloperCard;