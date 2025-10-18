import React, { useEffect, useState } from 'react';

export default function AssignModal({ orderId, onClose, onAssigned }){
  const [riders, setRiders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [assigning, setAssigning] = useState(null);

  useEffect(()=>{
    let alive = true;
    (async ()=>{
      setLoading(true); setError('');
      try{
        const res = await fetch('/api/riders?limit=200', { credentials: 'include' });
        if(res.status === 401){ window.location.href = '/auth/login'; return; }
        if(!res.ok) throw new Error('Failed to load riders');
        const data = await res.json();
        if(alive) setRiders(Array.isArray(data.riders) ? data.riders : data.riders || []);
      }catch(e){ if(alive) setError(e.message || 'Failed to load packers'); }
      finally{ if(alive) setLoading(false); }
    })();
    return ()=>{ alive = false; };
  },[]);

  async function assignTo(riderId){
    if(!orderId || !riderId) return;
    setAssigning(riderId);
    try{
      const res = await fetch(`/api/orders/${encodeURIComponent(orderId)}/assign`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ riderId }),
      });
      if(res.status === 401){ window.location.href = '/auth/login'; return; }
      const json = await res.json().catch(()=>null);
      if(!res.ok) throw new Error((json && json.error) ? json.error : 'Assign failed');
      if(onAssigned) onAssigned({ orderId, riderId });
      onClose();
    }catch(e){ alert(e.message || 'Failed to assign packer'); }
    finally{ setAssigning(null); }
  }

  return (
    <div className="assign-modal-backdrop" role="dialog" aria-modal="true">
      <div className="assign-modal">
        <header className="assign-modal-header">
          <h3 className="assign-modal-title">Assign Packers</h3>
          <button className="assign-modal-close" onClick={onClose} aria-label="Close">✕</button>
        </header>
        <div className="assign-modal-body">
          {loading && <div className="section-note">Loading packers…</div>}
          {error && <div className="auth-error">{error}</div>}
          {!loading && !error && (
            <table className="assign-table">
              <thead>
                <tr><th>Name</th><th>Last Active (days)</th><th>Action</th></tr>
              </thead>
              <tbody>
                {riders.map(r => (
                  <tr key={r.id}>
                    <td>{r.name}</td>
                    <td>{r.lastActiveDays ?? '-'}</td>
                    <td>
                      <button className="btn-assign" onClick={()=>assignTo(r.id)} disabled={assigning && assigning!==r.id}>
                        {assigning===r.id ? 'Assigning…' : 'Assign'}
                      </button>
                    </td>
                  </tr>
                ))}
                {riders.length === 0 && (<tr><td colSpan={3} className="section-note">No packers found.</td></tr>)}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
