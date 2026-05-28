import React from 'react';

export default function ProgressBar({ skill, percentage }) {
  return (
    <div className="progress-container">
      <div className="progress-label">
        <span>{skill}</span>
        <span>{percentage}</span>
      </div>
      <div className="progress-bar-bg">
        <div className="progress-bar-fill" style={{ width: percentage }}></div>
      </div>
    </div>
  );
}