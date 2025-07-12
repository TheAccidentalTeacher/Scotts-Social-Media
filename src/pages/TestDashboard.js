import React from 'react';

const TestDashboard = () => {
  return (
    <div>
      <h2>Test Dashboard</h2>
      <p>If you can see this, the basic React app is working!</p>
      <div style={{ padding: '20px', backgroundColor: '#f0f0f0', margin: '20px 0' }}>
        <h3>Dashboard Stats</h3>
        <ul>
          <li>Total Followers: 15,420</li>
          <li>Total Posts: 89</li>
          <li>Engagement: 4.2%</li>
          <li>Reach: 28,560</li>
        </ul>
      </div>
    </div>
  );
};

export default TestDashboard;
