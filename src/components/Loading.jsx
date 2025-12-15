import "../styles/loading.css";
const Loading = () => {
  return (
    <div className="loading">
      <div className="spinner center" role="status" aria-label="Loading...">
        {Array.from({ length: 12 }).map((_, i) => (
          <div key={i} className="spinner-blade"></div>
        ))}
      </div>
    </div>
  );
};

export default Loading;
