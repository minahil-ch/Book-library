const Activity = ({ activities }) => {
  const getIconClass = (type) => {
    switch(type) {
      case 'borrowed': return 'hi-borrowed';
      case 'returned': return 'hi-returned';
      case 'started': return 'hi-started';
      case 'finished': return 'hi-finished';
      default: return 'hi-added';
    }
  };

  const getIcon = (type) => {
    switch(type) {
      case 'borrowed': return '↗';
      case 'returned': return '↙';
      case 'started': return '👁';
      case 'finished': return '✓';
      default: return '+';
    }
  };

  return (
    <div>
      <div className="page-header">
        <h1 className="page-title">Activity</h1>
        <p className="page-subtitle">Your reading history and borrowing log</p>
      </div>
      <div className="history-list">
        {activities.map(a => (
          <div key={a._id} className="history-item">
            <div className={`history-icon ${getIconClass(a.type)}`}>{getIcon(a.type)}</div>
            <div className="history-info">
              <div className="history-title">{a.title}</div>
              <div className="history-detail">{a.description}</div>
            </div>
            <div className="history-date">
              {new Date(a.date).toLocaleDateString()}
            </div>
          </div>
        ))}
        {activities.length === 0 && <p>No activity yet.</p>}
      </div>
    </div>
  );
};

export default Activity;
