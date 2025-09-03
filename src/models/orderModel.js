let ordersById = new Map();
let assignments = new Map(); // orderId -> { riderId, assignedAt, status }
let lastSyncAt = null;

function normalizeId(o){
  return String(o?.id || o?.name || o?.order_number || o?.orderNumber || '');
}

function upsertMany(list){
  if(Array.isArray(list)){
    list.forEach(o=>{
      const id = normalizeId(o);
      if(!id) return;
      ordersById.set(id, o);
    });
    lastSyncAt = new Date().toISOString();
  }
}

function getAll(){
  return Array.from(ordersById.values());
}

function getById(id){
  return ordersById.get(String(id)) || null;
}

function assign(orderId, riderId){
  const id = String(orderId);
  const rec = { riderId: String(riderId), assignedAt: new Date().toISOString(), status: 'assigned' };
  assignments.set(id, rec);
  return rec;
}

function unassign(orderId){
  assignments.delete(String(orderId));
}

function getAssignment(orderId){
  return assignments.get(String(orderId)) || null;
}

function listAssignments(){
  return Array.from(assignments.entries()).map(([orderId, a])=> ({ orderId, ...a }));
}

function getLastSync(){ return lastSyncAt; }

module.exports = { upsertMany, getAll, getById, assign, unassign, getAssignment, listAssignments, getLastSync };
