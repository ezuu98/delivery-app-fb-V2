import React, { useEffect, useState } from 'react';

export default function AssignModal({ orderId, onClose, onAssigned }){
  const [riders, setRiders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [assigning, setAssigning] = useState(null);
  const [step, setStep] = useState('rider');
  const [packers, setPackers] = useState([]);
  const [loadingPackers, setLoadingPackers] = useState(false);
  const [errorPackers, setErrorPackers] = useState('');
  const [assigningPacker, setAssigningPacker] = useState(null);

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
      }catch(e){ if(alive) setError(e.message || 'Failed to load riders'); }
      finally{ if(alive) setLoading(false); }
    })();
    return ()=>{ alive = false; };
  },[]);

  useEffect(()=>{
    if(step !== 'packer') return;
    let alive = true;
    (async ()=>{
      setLoadingPackers(true); setErrorPackers('');
      try{
        const res = await fetch('/api/packers?limit=200', { credentials: 'include' });
        if(res.status === 401){ window.location.href = '/auth/login'; return; }
        if(!res.ok) throw new Error('Failed to load packers');
        const data = await res.json();
        if(alive) setPackers(Array.isArray(data.packers) ? data.packers : data.packers || []);
      }catch(e){ if(alive) setErrorPackers(e.message || 'Failed to load packers'); }
      finally{ if(alive) setLoadingPackers(false); }
    })();
    return ()=>{ alive = false; };
  },[step]);

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
      setStep('packer');
    }catch(e){ alert(e.message || 'Failed to assign rider'); }
    finally{ setAssigning(null); }
  }

  async function assignToPacker(packerId){
    if(!orderId || !packerId) return;
    setAssigningPacker(packerId);
    try{
      const res = await fetch(`/api/orders/${encodeURIComponent(orderId)}/assign-packer`, {
        method: 'POST',
        credentials: 'include',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ packerId }),
      });
      if(res.status === 401){ window.location.href = '/auth/login'; return; }
      const json = await res.json().catch(()=>null);
      if(!res.ok) throw new Error((json && json.error) ? json.error : 'Assign failed');
      try{ if(window && typeof window.showToast === 'function'){ window.showToast(`Packer assigned: ${packerId}`, { type: 'success' }); } }catch(_){ }
      onClose();
    }catch(e){ alert(e.message || 'Failed to assign packer'); }
    finally{ setAssigningPacker(null); }
  }

  return (
    <div className="assign-modal-backdrop" role="dialog" aria-modal="true">
      <div className="assign-modal">
        <header className="assign-modal-header">
          <h3 className="assign-modal-title">{step === 'packer' ? 'Assign Packers' : 'Assign Rider'}</h3>
          <button className="assign-modal-close" onClick={onClose} aria-label="Close">✕</button>
        </header>
        <div className="assign-modal-body">
          {step !== 'packer' ? (
            <>
              {loading && <div className="section-note">Loading riders…</div>}
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
                    {riders.length === 0 && (<tr><td colSpan={3} className="section-note">No riders found.</td></tr>)}
                  </tbody>
                </table>
              )}
            </>
          ) : (
            <>
              {loadingPackers && <div className="section-note">Loading packers…</div>}
              {errorPackers && <div className="auth-error">{errorPackers}</div>}
              {!loadingPackers && !errorPackers && (
                <table className="assign-table">
                  <thead>
                    <tr><th>Name</th><th>Last Active (days)</th><th>Action</th></tr>
                  </thead>
                  <tbody>
                    {packers.map(p => (
                      <tr key={p.id}>
                        <td>{p.name}</td>
                        <td>{p.lastActiveDays ?? '-'}</td>
                        <td>
                          <button className="btn-assign" onClick={()=>assignToPacker(p.id)} disabled={assigningPacker && assigningPacker!==p.id}>
                            {assigningPacker===p.id ? 'Assigning…' : 'Assign'}
                          </button>
                        </td>
                      </tr>
                    ))}
                    {packers.length === 0 && (<tr><td colSpan={3} className="section-note">No packers found.</td></tr>)}
                  </tbody>
                </table>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
