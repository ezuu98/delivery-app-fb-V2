import React from 'react';

export default function App(){
  const path = window.location.pathname;
  return (
    <div style={{padding: '8px 0'}}>
      <span style={{display:'inline-block',padding:'6px 10px',border:'1px solid #e5e7eb',borderRadius:8,background:'#F7FAFC',color:'#374151'}}>
        React active on {path}
      </span>
    </div>
  );
}
