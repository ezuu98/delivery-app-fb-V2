const MINUTE_PATTERN = /^(-?\d+(?:\.\d+)?)\s*(m|min|mins|minutes)$/i;
const SECOND_PATTERN = /^(-?\d+(?:\.\d+)?)\s*(s|sec|secs|seconds)$/i;

function isObject(value) {
  return value !== null && typeof value === 'object';
}

export function toDateOrNull(value) {
  if (value === null || value === undefined) return null;
  if (value instanceof Date) return value;
  if (typeof value?.toDate === 'function') {
    try {
      const asDate = value.toDate();
      if (asDate instanceof Date && !Number.isNaN(asDate.getTime())) return asDate;
    } catch (_) {
      return null;
    }
  }
  if (isObject(value) && value.seconds !== undefined) {
    const seconds = Number(value.seconds);
    if (Number.isFinite(seconds)) {
      const millis = seconds * 1000;
      return new Date(millis);
    }
  }
  if (typeof value === 'number') {
    if (!Number.isFinite(value)) return null;
    if (value > 1e12) return new Date(value);
    if (value > 1e9) return new Date(value * 1000);
  }
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (!trimmed) return null;
    const parsed = Date.parse(trimmed);
    if (Number.isFinite(parsed)) return new Date(parsed);
  }
  if (isObject(value)) {
    if (value.at) return toDateOrNull(value.at);
    if (value.value && value.value !== value) return toDateOrNull(value.value);
    if (value.expectedAt) return toDateOrNull(value.expectedAt);
  }
  return null;
}

function extractDurationMinutes(raw) {
  if (raw === null || raw === undefined || raw === '') return null;
  if (typeof raw === 'number') {
    if (Number.isFinite(raw)) return raw;
    return null;
  }
  if (raw instanceof Date) return null;
  if (typeof raw === 'string') {
    const trimmed = raw.trim();
    if (!trimmed) return null;
    if (MINUTE_PATTERN.test(trimmed)) return parseFloat(trimmed.replace(MINUTE_PATTERN, '$1'));
    if (SECOND_PATTERN.test(trimmed)) return parseFloat(trimmed.replace(SECOND_PATTERN, '$1')) / 60;
    const numeric = Number(trimmed);
    if (Number.isFinite(numeric)) return numeric;
    return null;
  }
  if (isObject(raw)) {
    if (Number.isFinite(raw.minutes)) return Number(raw.minutes);
    if (Number.isFinite(raw.expectedMinutes)) return Number(raw.expectedMinutes);
    if (Number.isFinite(raw.seconds)) return Number(raw.seconds) / 60;
    if (raw.duration !== undefined && raw.duration !== raw) {
      const nested = extractDurationMinutes(raw.duration);
      if (nested !== null) return nested;
    }
    if (raw.value !== undefined && raw.value !== raw) {
      const nested = extractDurationMinutes(raw.value);
      if (nested !== null) return nested;
    }
  }
  return null;
}

function getDurationMinutes(order) {
  if (!isObject(order)) return null;
  const candidates = [
    order.durationMins,
    order.duration_minutes,
    order.deliveryDuration,
    order.delivery_duration,
    order.actualDuration,
    order.actual_duration,
    order.actualDurationMinutes,
    order.orders?.deliveryDuration,
    order.orders?.delivery_duration,
    order.orders?.durationMins,
    order.orders?.duration_minutes,
    order.orders?.actualDuration,
    order.orders?.actualDurationMinutes,
  ];
  for (const candidate of candidates) {
    const minutes = extractDurationMinutes(candidate);
    if (minutes !== null) return minutes;
  }
  return null;
}

function getDeliveredValue(order) {
  if (!isObject(order)) return null;
  const candidates = [
    order.deliveredAt,
    order.actual_delivery_time,
    order.actualDeliveryTime,
    order.deliveryEndTime,
    order.delivery_end_time,
    order.orders?.deliveredAt,
    order.orders?.actual_delivery_time,
    order.orders?.actualDeliveryTime,
    order.orders?.deliveryEndTime,
  ];
  for (const candidate of candidates) {
    if (candidate !== null && candidate !== undefined) return candidate;
  }
  return null;
}

function getStartFieldValue(order) {
  if (!isObject(order)) return null;
  const candidates = [
    order.deliveryStartTime,
    order.delivery_start_time,
    order.start_time,
    order.startTime,
    order.started_at,
    order.startedAt,
    order.orders?.deliveryStartTime,
    order.orders?.delivery_start_time,
    order.orders?.start_time,
    order.orders?.startTime,
    order.orders?.started_at,
    order.orders?.startedAt,
  ];
  for (const candidate of candidates) {
    if (candidate !== null && candidate !== undefined) return candidate;
  }
  return null;
}

export function resolveStartTime(order) {
  if (!isObject(order)) return null;
  const direct = getStartFieldValue(order);
  if (direct !== null && direct !== undefined) return direct;

  const delivered = getDeliveredValue(order);
  const duration = getDurationMinutes(order);
  if (delivered !== null && delivered !== undefined && Number.isFinite(duration)) {
    const deliveredDate = toDateOrNull(delivered);
    if (deliveredDate instanceof Date) {
      return new Date(deliveredDate.getTime() - (duration * 60000));
    }
  }

  const createdCandidates = [
    order.created_at,
    order.createdAt,
    order.created,
    order.orders?.created_at,
    order.orders?.createdAt,
  ];
  for (const candidate of createdCandidates) {
    if (candidate !== null && candidate !== undefined) return candidate;
  }

  return null;
}

export function resolveActualDuration(order) {
  if (!isObject(order)) return null;
  const direct = getDurationMinutes(order);
  if (Number.isFinite(direct)) return direct;

  const delivered = toDateOrNull(getDeliveredValue(order));
  const start = toDateOrNull(getStartFieldValue(order));
  if (delivered instanceof Date && start instanceof Date) {
    const diffMs = delivered.getTime() - start.getTime();
    if (diffMs >= 0) {
      return Math.round(diffMs / 60000);
    }
  }

  return null;
}

export function formatTimeOfDay(value) {
  const date = toDateOrNull(value);
  if (!(date instanceof Date) || Number.isNaN(date.getTime())) return '-';
  try {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } catch (_) {
    return '-';
  }
}

export function formatExpectedTime(value) {
  if (value === null || value === undefined) return '-';
  if (isObject(value) && value.minutes !== undefined) {
    const minutes = Number(value.minutes);
    if (Number.isFinite(minutes)) return `${minutes} min`;
  }
  const asDate = toDateOrNull(value);
  if (asDate instanceof Date && !Number.isNaN(asDate.getTime())) {
    try {
      return asDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (_) {
      return '-';
    }
  }
  if (typeof value === 'number') {
    if (!Number.isFinite(value)) return '-';
    const minutes = Math.round(value);
    return `${minutes} min`;
  }
  if (typeof value === 'string') {
    const trimmed = value.trim();
    if (!trimmed) return '-';
    const match = trimmed.match(MINUTE_PATTERN);
    if (match) {
      const qty = match[1].replace(/\.0+$/, '').replace(/(\.\d*[1-9])0+$/, '$1');
      return `${qty} min`;
    }
    return trimmed;
  }
  if (isObject(value) && value.expectedMinutes !== undefined) {
    const minutes = Number(value.expectedMinutes);
    if (Number.isFinite(minutes)) return `${minutes} min`;
  }
  return String(value);
}

export function resolveExpectedValue(order) {
  if (!isObject(order)) return null;
  const candidates = [
    order.expected_delivery_time,
    order.expectedDeliveryTime,
    order.order?.expected_delivery_time,
    order.order?.expectedDeliveryTime,
    order.orders?.expected_delivery_time,
    order.orders?.expectedDeliveryTime,
    order.delivery?.expected_delivery_time,
    order.delivery?.expectedDeliveryTime,
    order.expected_delivery?.time,
    order.expected_delivery?.minutes,
    order.expected_time,
    order.expectedTime,
    order.expectedMinutes,
  ];
  for (const candidate of candidates) {
    if (candidate === null || candidate === undefined) continue;
    if (typeof candidate === 'string' && !candidate.trim()) continue;
    return candidate;
  }
  const events = order.delivery_events || order.deliveryEvents || order.events || null;
  if (Array.isArray(events)) {
    for (let i = events.length - 1; i >= 0; i -= 1) {
      const ev = events[i];
      if (!ev) continue;
      const type = typeof ev.type === 'string' ? ev.type.toLowerCase().trim() : '';
      if (type !== 'eta' && type !== 'expected') continue;
      if (ev.expectedMinutes !== undefined && ev.expectedMinutes !== null) return { minutes: ev.expectedMinutes };
      if (ev.minutes !== undefined && ev.minutes !== null) return { minutes: ev.minutes };
      if (ev.expectedAt) return ev.expectedAt;
    }
  }
  return null;
}

export function formatDurationHM(value) {
  const minutes = extractDurationMinutes(value);
  if (minutes === null) return '-';
  if (!Number.isFinite(minutes)) return '-';
  const rounded = Math.round(minutes);
  if (rounded < 60) return `${rounded} min`;
  const hours = Math.floor(rounded / 60);
  const remaining = rounded % 60;
  return `${hours}h ${remaining}m`;
}
