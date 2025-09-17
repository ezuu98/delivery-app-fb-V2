function Yc(e, t) {
  for (var n = 0; n < t.length; n++) {
    const r = t[n];
    if (typeof r != "string" && !Array.isArray(r)) {
      for (const l in r)
        if (l !== "default" && !(l in e)) {
          const i = Object.getOwnPropertyDescriptor(r, l);
          i && Object.defineProperty(e, l, i.get ? i : {
            enumerable: !0,
            get: () => r[l]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }));
}
function Gc(e) {
  return e && e.__esModule && Object.prototype.hasOwnProperty.call(e, "default") ? e.default : e;
}
var ko = { exports: {} }, yl = {}, jo = { exports: {} }, M = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var cr = Symbol.for("react.element"), Xc = Symbol.for("react.portal"), Jc = Symbol.for("react.fragment"), Zc = Symbol.for("react.strict_mode"), qc = Symbol.for("react.profiler"), bc = Symbol.for("react.provider"), ed = Symbol.for("react.context"), td = Symbol.for("react.forward_ref"), nd = Symbol.for("react.suspense"), rd = Symbol.for("react.memo"), ld = Symbol.for("react.lazy"), la = Symbol.iterator;
function id(e) {
  return e === null || typeof e != "object" ? null : (e = la && e[la] || e["@@iterator"], typeof e == "function" ? e : null);
}
var Eo = { isMounted: function() {
  return !1;
}, enqueueForceUpdate: function() {
}, enqueueReplaceState: function() {
}, enqueueSetState: function() {
} }, Co = Object.assign, _o = {};
function wn(e, t, n) {
  this.props = e, this.context = t, this.refs = _o, this.updater = n || Eo;
}
wn.prototype.isReactComponent = {};
wn.prototype.setState = function(e, t) {
  if (typeof e != "object" && typeof e != "function" && e != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
  this.updater.enqueueSetState(this, e, t, "setState");
};
wn.prototype.forceUpdate = function(e) {
  this.updater.enqueueForceUpdate(this, e, "forceUpdate");
};
function Po() {
}
Po.prototype = wn.prototype;
function is(e, t, n) {
  this.props = e, this.context = t, this.refs = _o, this.updater = n || Eo;
}
var ss = is.prototype = new Po();
ss.constructor = is;
Co(ss, wn.prototype);
ss.isPureReactComponent = !0;
var ia = Array.isArray, To = Object.prototype.hasOwnProperty, as = { current: null }, Lo = { key: !0, ref: !0, __self: !0, __source: !0 };
function Ro(e, t, n) {
  var r, l = {}, i = null, s = null;
  if (t != null) for (r in t.ref !== void 0 && (s = t.ref), t.key !== void 0 && (i = "" + t.key), t) To.call(t, r) && !Lo.hasOwnProperty(r) && (l[r] = t[r]);
  var o = arguments.length - 2;
  if (o === 1) l.children = n;
  else if (1 < o) {
    for (var u = Array(o), c = 0; c < o; c++) u[c] = arguments[c + 2];
    l.children = u;
  }
  if (e && e.defaultProps) for (r in o = e.defaultProps, o) l[r] === void 0 && (l[r] = o[r]);
  return { $$typeof: cr, type: e, key: i, ref: s, props: l, _owner: as.current };
}
function sd(e, t) {
  return { $$typeof: cr, type: e.type, key: t, ref: e.ref, props: e.props, _owner: e._owner };
}
function os(e) {
  return typeof e == "object" && e !== null && e.$$typeof === cr;
}
function ad(e) {
  var t = { "=": "=0", ":": "=2" };
  return "$" + e.replace(/[=:]/g, function(n) {
    return t[n];
  });
}
var sa = /\/+/g;
function Ml(e, t) {
  return typeof e == "object" && e !== null && e.key != null ? ad("" + e.key) : t.toString(36);
}
function Dr(e, t, n, r, l) {
  var i = typeof e;
  (i === "undefined" || i === "boolean") && (e = null);
  var s = !1;
  if (e === null) s = !0;
  else switch (i) {
    case "string":
    case "number":
      s = !0;
      break;
    case "object":
      switch (e.$$typeof) {
        case cr:
        case Xc:
          s = !0;
      }
  }
  if (s) return s = e, l = l(s), e = r === "" ? "." + Ml(s, 0) : r, ia(l) ? (n = "", e != null && (n = e.replace(sa, "$&/") + "/"), Dr(l, t, n, "", function(c) {
    return c;
  })) : l != null && (os(l) && (l = sd(l, n + (!l.key || s && s.key === l.key ? "" : ("" + l.key).replace(sa, "$&/") + "/") + e)), t.push(l)), 1;
  if (s = 0, r = r === "" ? "." : r + ":", ia(e)) for (var o = 0; o < e.length; o++) {
    i = e[o];
    var u = r + Ml(i, o);
    s += Dr(i, t, n, u, l);
  }
  else if (u = id(e), typeof u == "function") for (e = u.call(e), o = 0; !(i = e.next()).done; ) i = i.value, u = r + Ml(i, o++), s += Dr(i, t, n, u, l);
  else if (i === "object") throw t = String(e), Error("Objects are not valid as a React child (found: " + (t === "[object Object]" ? "object with keys {" + Object.keys(e).join(", ") + "}" : t) + "). If you meant to render a collection of children, use an array instead.");
  return s;
}
function yr(e, t, n) {
  if (e == null) return e;
  var r = [], l = 0;
  return Dr(e, r, "", "", function(i) {
    return t.call(n, i, l++);
  }), r;
}
function od(e) {
  if (e._status === -1) {
    var t = e._result;
    t = t(), t.then(function(n) {
      (e._status === 0 || e._status === -1) && (e._status = 1, e._result = n);
    }, function(n) {
      (e._status === 0 || e._status === -1) && (e._status = 2, e._result = n);
    }), e._status === -1 && (e._status = 0, e._result = t);
  }
  if (e._status === 1) return e._result.default;
  throw e._result;
}
var ve = { current: null }, Mr = { transition: null }, ud = { ReactCurrentDispatcher: ve, ReactCurrentBatchConfig: Mr, ReactCurrentOwner: as };
function Io() {
  throw Error("act(...) is not supported in production builds of React.");
}
M.Children = { map: yr, forEach: function(e, t, n) {
  yr(e, function() {
    t.apply(this, arguments);
  }, n);
}, count: function(e) {
  var t = 0;
  return yr(e, function() {
    t++;
  }), t;
}, toArray: function(e) {
  return yr(e, function(t) {
    return t;
  }) || [];
}, only: function(e) {
  if (!os(e)) throw Error("React.Children.only expected to receive a single React element child.");
  return e;
} };
M.Component = wn;
M.Fragment = Jc;
M.Profiler = qc;
M.PureComponent = is;
M.StrictMode = Zc;
M.Suspense = nd;
M.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ud;
M.act = Io;
M.cloneElement = function(e, t, n) {
  if (e == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + e + ".");
  var r = Co({}, e.props), l = e.key, i = e.ref, s = e._owner;
  if (t != null) {
    if (t.ref !== void 0 && (i = t.ref, s = as.current), t.key !== void 0 && (l = "" + t.key), e.type && e.type.defaultProps) var o = e.type.defaultProps;
    for (u in t) To.call(t, u) && !Lo.hasOwnProperty(u) && (r[u] = t[u] === void 0 && o !== void 0 ? o[u] : t[u]);
  }
  var u = arguments.length - 2;
  if (u === 1) r.children = n;
  else if (1 < u) {
    o = Array(u);
    for (var c = 0; c < u; c++) o[c] = arguments[c + 2];
    r.children = o;
  }
  return { $$typeof: cr, type: e.type, key: l, ref: i, props: r, _owner: s };
};
M.createContext = function(e) {
  return e = { $$typeof: ed, _currentValue: e, _currentValue2: e, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, e.Provider = { $$typeof: bc, _context: e }, e.Consumer = e;
};
M.createElement = Ro;
M.createFactory = function(e) {
  var t = Ro.bind(null, e);
  return t.type = e, t;
};
M.createRef = function() {
  return { current: null };
};
M.forwardRef = function(e) {
  return { $$typeof: td, render: e };
};
M.isValidElement = os;
M.lazy = function(e) {
  return { $$typeof: ld, _payload: { _status: -1, _result: e }, _init: od };
};
M.memo = function(e, t) {
  return { $$typeof: rd, type: e, compare: t === void 0 ? null : t };
};
M.startTransition = function(e) {
  var t = Mr.transition;
  Mr.transition = {};
  try {
    e();
  } finally {
    Mr.transition = t;
  }
};
M.unstable_act = Io;
M.useCallback = function(e, t) {
  return ve.current.useCallback(e, t);
};
M.useContext = function(e) {
  return ve.current.useContext(e);
};
M.useDebugValue = function() {
};
M.useDeferredValue = function(e) {
  return ve.current.useDeferredValue(e);
};
M.useEffect = function(e, t) {
  return ve.current.useEffect(e, t);
};
M.useId = function() {
  return ve.current.useId();
};
M.useImperativeHandle = function(e, t, n) {
  return ve.current.useImperativeHandle(e, t, n);
};
M.useInsertionEffect = function(e, t) {
  return ve.current.useInsertionEffect(e, t);
};
M.useLayoutEffect = function(e, t) {
  return ve.current.useLayoutEffect(e, t);
};
M.useMemo = function(e, t) {
  return ve.current.useMemo(e, t);
};
M.useReducer = function(e, t, n) {
  return ve.current.useReducer(e, t, n);
};
M.useRef = function(e) {
  return ve.current.useRef(e);
};
M.useState = function(e) {
  return ve.current.useState(e);
};
M.useSyncExternalStore = function(e, t, n) {
  return ve.current.useSyncExternalStore(e, t, n);
};
M.useTransition = function() {
  return ve.current.useTransition();
};
M.version = "18.3.1";
jo.exports = M;
var y = jo.exports;
const cd = /* @__PURE__ */ Gc(y), dd = /* @__PURE__ */ Yc({
  __proto__: null,
  default: cd
}, [y]);
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var fd = y, pd = Symbol.for("react.element"), hd = Symbol.for("react.fragment"), md = Object.prototype.hasOwnProperty, vd = fd.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, gd = { key: !0, ref: !0, __self: !0, __source: !0 };
function zo(e, t, n) {
  var r, l = {}, i = null, s = null;
  n !== void 0 && (i = "" + n), t.key !== void 0 && (i = "" + t.key), t.ref !== void 0 && (s = t.ref);
  for (r in t) md.call(t, r) && !gd.hasOwnProperty(r) && (l[r] = t[r]);
  if (e && e.defaultProps) for (r in t = e.defaultProps, t) l[r] === void 0 && (l[r] = t[r]);
  return { $$typeof: pd, type: e, key: i, ref: s, props: l, _owner: vd.current };
}
yl.Fragment = hd;
yl.jsx = zo;
yl.jsxs = zo;
ko.exports = yl;
var a = ko.exports, Oo = { exports: {} }, _e = {}, Do = { exports: {} }, Mo = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function(e) {
  function t(T, O) {
    var D = T.length;
    T.push(O);
    e: for (; 0 < D; ) {
      var Z = D - 1 >>> 1, le = T[Z];
      if (0 < l(le, O)) T[Z] = O, T[D] = le, D = Z;
      else break e;
    }
  }
  function n(T) {
    return T.length === 0 ? null : T[0];
  }
  function r(T) {
    if (T.length === 0) return null;
    var O = T[0], D = T.pop();
    if (D !== O) {
      T[0] = D;
      e: for (var Z = 0, le = T.length, vr = le >>> 1; Z < vr; ) {
        var Tt = 2 * (Z + 1) - 1, Dl = T[Tt], Lt = Tt + 1, gr = T[Lt];
        if (0 > l(Dl, D)) Lt < le && 0 > l(gr, Dl) ? (T[Z] = gr, T[Lt] = D, Z = Lt) : (T[Z] = Dl, T[Tt] = D, Z = Tt);
        else if (Lt < le && 0 > l(gr, D)) T[Z] = gr, T[Lt] = D, Z = Lt;
        else break e;
      }
    }
    return O;
  }
  function l(T, O) {
    var D = T.sortIndex - O.sortIndex;
    return D !== 0 ? D : T.id - O.id;
  }
  if (typeof performance == "object" && typeof performance.now == "function") {
    var i = performance;
    e.unstable_now = function() {
      return i.now();
    };
  } else {
    var s = Date, o = s.now();
    e.unstable_now = function() {
      return s.now() - o;
    };
  }
  var u = [], c = [], p = 1, f = null, m = 3, w = !1, N = !1, k = !1, P = typeof setTimeout == "function" ? setTimeout : null, v = typeof clearTimeout == "function" ? clearTimeout : null, d = typeof setImmediate < "u" ? setImmediate : null;
  typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
  function h(T) {
    for (var O = n(c); O !== null; ) {
      if (O.callback === null) r(c);
      else if (O.startTime <= T) r(c), O.sortIndex = O.expirationTime, t(u, O);
      else break;
      O = n(c);
    }
  }
  function g(T) {
    if (k = !1, h(T), !N) if (n(u) !== null) N = !0, B(x);
    else {
      var O = n(c);
      O !== null && K(g, O.startTime - T);
    }
  }
  function x(T, O) {
    N = !1, k && (k = !1, v(L), L = -1), w = !0;
    var D = m;
    try {
      for (h(O), f = n(u); f !== null && (!(f.expirationTime > O) || T && !z()); ) {
        var Z = f.callback;
        if (typeof Z == "function") {
          f.callback = null, m = f.priorityLevel;
          var le = Z(f.expirationTime <= O);
          O = e.unstable_now(), typeof le == "function" ? f.callback = le : f === n(u) && r(u), h(O);
        } else r(u);
        f = n(u);
      }
      if (f !== null) var vr = !0;
      else {
        var Tt = n(c);
        Tt !== null && K(g, Tt.startTime - O), vr = !1;
      }
      return vr;
    } finally {
      f = null, m = D, w = !1;
    }
  }
  var C = !1, S = null, L = -1, I = 5, _ = -1;
  function z() {
    return !(e.unstable_now() - _ < I);
  }
  function j() {
    if (S !== null) {
      var T = e.unstable_now();
      _ = T;
      var O = !0;
      try {
        O = S(!0, T);
      } finally {
        O ? U() : (C = !1, S = null);
      }
    } else C = !1;
  }
  var U;
  if (typeof d == "function") U = function() {
    d(j);
  };
  else if (typeof MessageChannel < "u") {
    var F = new MessageChannel(), V = F.port2;
    F.port1.onmessage = j, U = function() {
      V.postMessage(null);
    };
  } else U = function() {
    P(j, 0);
  };
  function B(T) {
    S = T, C || (C = !0, U());
  }
  function K(T, O) {
    L = P(function() {
      T(e.unstable_now());
    }, O);
  }
  e.unstable_IdlePriority = 5, e.unstable_ImmediatePriority = 1, e.unstable_LowPriority = 4, e.unstable_NormalPriority = 3, e.unstable_Profiling = null, e.unstable_UserBlockingPriority = 2, e.unstable_cancelCallback = function(T) {
    T.callback = null;
  }, e.unstable_continueExecution = function() {
    N || w || (N = !0, B(x));
  }, e.unstable_forceFrameRate = function(T) {
    0 > T || 125 < T ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : I = 0 < T ? Math.floor(1e3 / T) : 5;
  }, e.unstable_getCurrentPriorityLevel = function() {
    return m;
  }, e.unstable_getFirstCallbackNode = function() {
    return n(u);
  }, e.unstable_next = function(T) {
    switch (m) {
      case 1:
      case 2:
      case 3:
        var O = 3;
        break;
      default:
        O = m;
    }
    var D = m;
    m = O;
    try {
      return T();
    } finally {
      m = D;
    }
  }, e.unstable_pauseExecution = function() {
  }, e.unstable_requestPaint = function() {
  }, e.unstable_runWithPriority = function(T, O) {
    switch (T) {
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
        break;
      default:
        T = 3;
    }
    var D = m;
    m = T;
    try {
      return O();
    } finally {
      m = D;
    }
  }, e.unstable_scheduleCallback = function(T, O, D) {
    var Z = e.unstable_now();
    switch (typeof D == "object" && D !== null ? (D = D.delay, D = typeof D == "number" && 0 < D ? Z + D : Z) : D = Z, T) {
      case 1:
        var le = -1;
        break;
      case 2:
        le = 250;
        break;
      case 5:
        le = 1073741823;
        break;
      case 4:
        le = 1e4;
        break;
      default:
        le = 5e3;
    }
    return le = D + le, T = { id: p++, callback: O, priorityLevel: T, startTime: D, expirationTime: le, sortIndex: -1 }, D > Z ? (T.sortIndex = D, t(c, T), n(u) === null && T === n(c) && (k ? (v(L), L = -1) : k = !0, K(g, D - Z))) : (T.sortIndex = le, t(u, T), N || w || (N = !0, B(x))), T;
  }, e.unstable_shouldYield = z, e.unstable_wrapCallback = function(T) {
    var O = m;
    return function() {
      var D = m;
      m = O;
      try {
        return T.apply(this, arguments);
      } finally {
        m = D;
      }
    };
  };
})(Mo);
Do.exports = Mo;
var yd = Do.exports;
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var wd = y, Ce = yd;
function E(e) {
  for (var t = "https://reactjs.org/docs/error-decoder.html?invariant=" + e, n = 1; n < arguments.length; n++) t += "&args[]=" + encodeURIComponent(arguments[n]);
  return "Minified React error #" + e + "; visit " + t + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
}
var Fo = /* @__PURE__ */ new Set(), Qn = {};
function Wt(e, t) {
  fn(e, t), fn(e + "Capture", t);
}
function fn(e, t) {
  for (Qn[e] = t, e = 0; e < t.length; e++) Fo.add(t[e]);
}
var be = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), ci = Object.prototype.hasOwnProperty, xd = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, aa = {}, oa = {};
function Sd(e) {
  return ci.call(oa, e) ? !0 : ci.call(aa, e) ? !1 : xd.test(e) ? oa[e] = !0 : (aa[e] = !0, !1);
}
function Nd(e, t, n, r) {
  if (n !== null && n.type === 0) return !1;
  switch (typeof t) {
    case "function":
    case "symbol":
      return !0;
    case "boolean":
      return r ? !1 : n !== null ? !n.acceptsBooleans : (e = e.toLowerCase().slice(0, 5), e !== "data-" && e !== "aria-");
    default:
      return !1;
  }
}
function kd(e, t, n, r) {
  if (t === null || typeof t > "u" || Nd(e, t, n, r)) return !0;
  if (r) return !1;
  if (n !== null) switch (n.type) {
    case 3:
      return !t;
    case 4:
      return t === !1;
    case 5:
      return isNaN(t);
    case 6:
      return isNaN(t) || 1 > t;
  }
  return !1;
}
function ge(e, t, n, r, l, i, s) {
  this.acceptsBooleans = t === 2 || t === 3 || t === 4, this.attributeName = r, this.attributeNamespace = l, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = i, this.removeEmptyString = s;
}
var ue = {};
"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(e) {
  ue[e] = new ge(e, 0, !1, e, null, !1, !1);
});
[["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
  var t = e[0];
  ue[t] = new ge(t, 1, !1, e[1], null, !1, !1);
});
["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
  ue[e] = new ge(e, 2, !1, e.toLowerCase(), null, !1, !1);
});
["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
  ue[e] = new ge(e, 2, !1, e, null, !1, !1);
});
"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(e) {
  ue[e] = new ge(e, 3, !1, e.toLowerCase(), null, !1, !1);
});
["checked", "multiple", "muted", "selected"].forEach(function(e) {
  ue[e] = new ge(e, 3, !0, e, null, !1, !1);
});
["capture", "download"].forEach(function(e) {
  ue[e] = new ge(e, 4, !1, e, null, !1, !1);
});
["cols", "rows", "size", "span"].forEach(function(e) {
  ue[e] = new ge(e, 6, !1, e, null, !1, !1);
});
["rowSpan", "start"].forEach(function(e) {
  ue[e] = new ge(e, 5, !1, e.toLowerCase(), null, !1, !1);
});
var us = /[\-:]([a-z])/g;
function cs(e) {
  return e[1].toUpperCase();
}
"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(e) {
  var t = e.replace(
    us,
    cs
  );
  ue[t] = new ge(t, 1, !1, e, null, !1, !1);
});
"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(e) {
  var t = e.replace(us, cs);
  ue[t] = new ge(t, 1, !1, e, "http://www.w3.org/1999/xlink", !1, !1);
});
["xml:base", "xml:lang", "xml:space"].forEach(function(e) {
  var t = e.replace(us, cs);
  ue[t] = new ge(t, 1, !1, e, "http://www.w3.org/XML/1998/namespace", !1, !1);
});
["tabIndex", "crossOrigin"].forEach(function(e) {
  ue[e] = new ge(e, 1, !1, e.toLowerCase(), null, !1, !1);
});
ue.xlinkHref = new ge("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1);
["src", "href", "action", "formAction"].forEach(function(e) {
  ue[e] = new ge(e, 1, !1, e.toLowerCase(), null, !0, !0);
});
function ds(e, t, n, r) {
  var l = ue.hasOwnProperty(t) ? ue[t] : null;
  (l !== null ? l.type !== 0 : r || !(2 < t.length) || t[0] !== "o" && t[0] !== "O" || t[1] !== "n" && t[1] !== "N") && (kd(t, n, l, r) && (n = null), r || l === null ? Sd(t) && (n === null ? e.removeAttribute(t) : e.setAttribute(t, "" + n)) : l.mustUseProperty ? e[l.propertyName] = n === null ? l.type === 3 ? !1 : "" : n : (t = l.attributeName, r = l.attributeNamespace, n === null ? e.removeAttribute(t) : (l = l.type, n = l === 3 || l === 4 && n === !0 ? "" : "" + n, r ? e.setAttributeNS(r, t, n) : e.setAttribute(t, n))));
}
var rt = wd.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, wr = Symbol.for("react.element"), Yt = Symbol.for("react.portal"), Gt = Symbol.for("react.fragment"), fs = Symbol.for("react.strict_mode"), di = Symbol.for("react.profiler"), Ao = Symbol.for("react.provider"), Uo = Symbol.for("react.context"), ps = Symbol.for("react.forward_ref"), fi = Symbol.for("react.suspense"), pi = Symbol.for("react.suspense_list"), hs = Symbol.for("react.memo"), st = Symbol.for("react.lazy"), Bo = Symbol.for("react.offscreen"), ua = Symbol.iterator;
function jn(e) {
  return e === null || typeof e != "object" ? null : (e = ua && e[ua] || e["@@iterator"], typeof e == "function" ? e : null);
}
var J = Object.assign, Fl;
function In(e) {
  if (Fl === void 0) try {
    throw Error();
  } catch (n) {
    var t = n.stack.trim().match(/\n( *(at )?)/);
    Fl = t && t[1] || "";
  }
  return `
` + Fl + e;
}
var Al = !1;
function Ul(e, t) {
  if (!e || Al) return "";
  Al = !0;
  var n = Error.prepareStackTrace;
  Error.prepareStackTrace = void 0;
  try {
    if (t) if (t = function() {
      throw Error();
    }, Object.defineProperty(t.prototype, "props", { set: function() {
      throw Error();
    } }), typeof Reflect == "object" && Reflect.construct) {
      try {
        Reflect.construct(t, []);
      } catch (c) {
        var r = c;
      }
      Reflect.construct(e, [], t);
    } else {
      try {
        t.call();
      } catch (c) {
        r = c;
      }
      e.call(t.prototype);
    }
    else {
      try {
        throw Error();
      } catch (c) {
        r = c;
      }
      e();
    }
  } catch (c) {
    if (c && r && typeof c.stack == "string") {
      for (var l = c.stack.split(`
`), i = r.stack.split(`
`), s = l.length - 1, o = i.length - 1; 1 <= s && 0 <= o && l[s] !== i[o]; ) o--;
      for (; 1 <= s && 0 <= o; s--, o--) if (l[s] !== i[o]) {
        if (s !== 1 || o !== 1)
          do
            if (s--, o--, 0 > o || l[s] !== i[o]) {
              var u = `
` + l[s].replace(" at new ", " at ");
              return e.displayName && u.includes("<anonymous>") && (u = u.replace("<anonymous>", e.displayName)), u;
            }
          while (1 <= s && 0 <= o);
        break;
      }
    }
  } finally {
    Al = !1, Error.prepareStackTrace = n;
  }
  return (e = e ? e.displayName || e.name : "") ? In(e) : "";
}
function jd(e) {
  switch (e.tag) {
    case 5:
      return In(e.type);
    case 16:
      return In("Lazy");
    case 13:
      return In("Suspense");
    case 19:
      return In("SuspenseList");
    case 0:
    case 2:
    case 15:
      return e = Ul(e.type, !1), e;
    case 11:
      return e = Ul(e.type.render, !1), e;
    case 1:
      return e = Ul(e.type, !0), e;
    default:
      return "";
  }
}
function hi(e) {
  if (e == null) return null;
  if (typeof e == "function") return e.displayName || e.name || null;
  if (typeof e == "string") return e;
  switch (e) {
    case Gt:
      return "Fragment";
    case Yt:
      return "Portal";
    case di:
      return "Profiler";
    case fs:
      return "StrictMode";
    case fi:
      return "Suspense";
    case pi:
      return "SuspenseList";
  }
  if (typeof e == "object") switch (e.$$typeof) {
    case Uo:
      return (e.displayName || "Context") + ".Consumer";
    case Ao:
      return (e._context.displayName || "Context") + ".Provider";
    case ps:
      var t = e.render;
      return e = e.displayName, e || (e = t.displayName || t.name || "", e = e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef"), e;
    case hs:
      return t = e.displayName || null, t !== null ? t : hi(e.type) || "Memo";
    case st:
      t = e._payload, e = e._init;
      try {
        return hi(e(t));
      } catch {
      }
  }
  return null;
}
function Ed(e) {
  var t = e.type;
  switch (e.tag) {
    case 24:
      return "Cache";
    case 9:
      return (t.displayName || "Context") + ".Consumer";
    case 10:
      return (t._context.displayName || "Context") + ".Provider";
    case 18:
      return "DehydratedFragment";
    case 11:
      return e = t.render, e = e.displayName || e.name || "", t.displayName || (e !== "" ? "ForwardRef(" + e + ")" : "ForwardRef");
    case 7:
      return "Fragment";
    case 5:
      return t;
    case 4:
      return "Portal";
    case 3:
      return "Root";
    case 6:
      return "Text";
    case 16:
      return hi(t);
    case 8:
      return t === fs ? "StrictMode" : "Mode";
    case 22:
      return "Offscreen";
    case 12:
      return "Profiler";
    case 21:
      return "Scope";
    case 13:
      return "Suspense";
    case 19:
      return "SuspenseList";
    case 25:
      return "TracingMarker";
    case 1:
    case 0:
    case 17:
    case 2:
    case 14:
    case 15:
      if (typeof t == "function") return t.displayName || t.name || null;
      if (typeof t == "string") return t;
  }
  return null;
}
function kt(e) {
  switch (typeof e) {
    case "boolean":
    case "number":
    case "string":
    case "undefined":
      return e;
    case "object":
      return e;
    default:
      return "";
  }
}
function $o(e) {
  var t = e.type;
  return (e = e.nodeName) && e.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
}
function Cd(e) {
  var t = $o(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t), r = "" + e[t];
  if (!e.hasOwnProperty(t) && typeof n < "u" && typeof n.get == "function" && typeof n.set == "function") {
    var l = n.get, i = n.set;
    return Object.defineProperty(e, t, { configurable: !0, get: function() {
      return l.call(this);
    }, set: function(s) {
      r = "" + s, i.call(this, s);
    } }), Object.defineProperty(e, t, { enumerable: n.enumerable }), { getValue: function() {
      return r;
    }, setValue: function(s) {
      r = "" + s;
    }, stopTracking: function() {
      e._valueTracker = null, delete e[t];
    } };
  }
}
function xr(e) {
  e._valueTracker || (e._valueTracker = Cd(e));
}
function Vo(e) {
  if (!e) return !1;
  var t = e._valueTracker;
  if (!t) return !0;
  var n = t.getValue(), r = "";
  return e && (r = $o(e) ? e.checked ? "true" : "false" : e.value), e = r, e !== n ? (t.setValue(e), !0) : !1;
}
function Yr(e) {
  if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u") return null;
  try {
    return e.activeElement || e.body;
  } catch {
    return e.body;
  }
}
function mi(e, t) {
  var n = t.checked;
  return J({}, t, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: n ?? e._wrapperState.initialChecked });
}
function ca(e, t) {
  var n = t.defaultValue == null ? "" : t.defaultValue, r = t.checked != null ? t.checked : t.defaultChecked;
  n = kt(t.value != null ? t.value : n), e._wrapperState = { initialChecked: r, initialValue: n, controlled: t.type === "checkbox" || t.type === "radio" ? t.checked != null : t.value != null };
}
function Wo(e, t) {
  t = t.checked, t != null && ds(e, "checked", t, !1);
}
function vi(e, t) {
  Wo(e, t);
  var n = kt(t.value), r = t.type;
  if (n != null) r === "number" ? (n === 0 && e.value === "" || e.value != n) && (e.value = "" + n) : e.value !== "" + n && (e.value = "" + n);
  else if (r === "submit" || r === "reset") {
    e.removeAttribute("value");
    return;
  }
  t.hasOwnProperty("value") ? gi(e, t.type, n) : t.hasOwnProperty("defaultValue") && gi(e, t.type, kt(t.defaultValue)), t.checked == null && t.defaultChecked != null && (e.defaultChecked = !!t.defaultChecked);
}
function da(e, t, n) {
  if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
    var r = t.type;
    if (!(r !== "submit" && r !== "reset" || t.value !== void 0 && t.value !== null)) return;
    t = "" + e._wrapperState.initialValue, n || t === e.value || (e.value = t), e.defaultValue = t;
  }
  n = e.name, n !== "" && (e.name = ""), e.defaultChecked = !!e._wrapperState.initialChecked, n !== "" && (e.name = n);
}
function gi(e, t, n) {
  (t !== "number" || Yr(e.ownerDocument) !== e) && (n == null ? e.defaultValue = "" + e._wrapperState.initialValue : e.defaultValue !== "" + n && (e.defaultValue = "" + n));
}
var zn = Array.isArray;
function sn(e, t, n, r) {
  if (e = e.options, t) {
    t = {};
    for (var l = 0; l < n.length; l++) t["$" + n[l]] = !0;
    for (n = 0; n < e.length; n++) l = t.hasOwnProperty("$" + e[n].value), e[n].selected !== l && (e[n].selected = l), l && r && (e[n].defaultSelected = !0);
  } else {
    for (n = "" + kt(n), t = null, l = 0; l < e.length; l++) {
      if (e[l].value === n) {
        e[l].selected = !0, r && (e[l].defaultSelected = !0);
        return;
      }
      t !== null || e[l].disabled || (t = e[l]);
    }
    t !== null && (t.selected = !0);
  }
}
function yi(e, t) {
  if (t.dangerouslySetInnerHTML != null) throw Error(E(91));
  return J({}, t, { value: void 0, defaultValue: void 0, children: "" + e._wrapperState.initialValue });
}
function fa(e, t) {
  var n = t.value;
  if (n == null) {
    if (n = t.children, t = t.defaultValue, n != null) {
      if (t != null) throw Error(E(92));
      if (zn(n)) {
        if (1 < n.length) throw Error(E(93));
        n = n[0];
      }
      t = n;
    }
    t == null && (t = ""), n = t;
  }
  e._wrapperState = { initialValue: kt(n) };
}
function Ho(e, t) {
  var n = kt(t.value), r = kt(t.defaultValue);
  n != null && (n = "" + n, n !== e.value && (e.value = n), t.defaultValue == null && e.defaultValue !== n && (e.defaultValue = n)), r != null && (e.defaultValue = "" + r);
}
function pa(e) {
  var t = e.textContent;
  t === e._wrapperState.initialValue && t !== "" && t !== null && (e.value = t);
}
function Qo(e) {
  switch (e) {
    case "svg":
      return "http://www.w3.org/2000/svg";
    case "math":
      return "http://www.w3.org/1998/Math/MathML";
    default:
      return "http://www.w3.org/1999/xhtml";
  }
}
function wi(e, t) {
  return e == null || e === "http://www.w3.org/1999/xhtml" ? Qo(t) : e === "http://www.w3.org/2000/svg" && t === "foreignObject" ? "http://www.w3.org/1999/xhtml" : e;
}
var Sr, Ko = function(e) {
  return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, r, l) {
    MSApp.execUnsafeLocalFunction(function() {
      return e(t, n, r, l);
    });
  } : e;
}(function(e, t) {
  if (e.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in e) e.innerHTML = t;
  else {
    for (Sr = Sr || document.createElement("div"), Sr.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>", t = Sr.firstChild; e.firstChild; ) e.removeChild(e.firstChild);
    for (; t.firstChild; ) e.appendChild(t.firstChild);
  }
});
function Kn(e, t) {
  if (t) {
    var n = e.firstChild;
    if (n && n === e.lastChild && n.nodeType === 3) {
      n.nodeValue = t;
      return;
    }
  }
  e.textContent = t;
}
var Mn = {
  animationIterationCount: !0,
  aspectRatio: !0,
  borderImageOutset: !0,
  borderImageSlice: !0,
  borderImageWidth: !0,
  boxFlex: !0,
  boxFlexGroup: !0,
  boxOrdinalGroup: !0,
  columnCount: !0,
  columns: !0,
  flex: !0,
  flexGrow: !0,
  flexPositive: !0,
  flexShrink: !0,
  flexNegative: !0,
  flexOrder: !0,
  gridArea: !0,
  gridRow: !0,
  gridRowEnd: !0,
  gridRowSpan: !0,
  gridRowStart: !0,
  gridColumn: !0,
  gridColumnEnd: !0,
  gridColumnSpan: !0,
  gridColumnStart: !0,
  fontWeight: !0,
  lineClamp: !0,
  lineHeight: !0,
  opacity: !0,
  order: !0,
  orphans: !0,
  tabSize: !0,
  widows: !0,
  zIndex: !0,
  zoom: !0,
  fillOpacity: !0,
  floodOpacity: !0,
  stopOpacity: !0,
  strokeDasharray: !0,
  strokeDashoffset: !0,
  strokeMiterlimit: !0,
  strokeOpacity: !0,
  strokeWidth: !0
}, _d = ["Webkit", "ms", "Moz", "O"];
Object.keys(Mn).forEach(function(e) {
  _d.forEach(function(t) {
    t = t + e.charAt(0).toUpperCase() + e.substring(1), Mn[t] = Mn[e];
  });
});
function Yo(e, t, n) {
  return t == null || typeof t == "boolean" || t === "" ? "" : n || typeof t != "number" || t === 0 || Mn.hasOwnProperty(e) && Mn[e] ? ("" + t).trim() : t + "px";
}
function Go(e, t) {
  e = e.style;
  for (var n in t) if (t.hasOwnProperty(n)) {
    var r = n.indexOf("--") === 0, l = Yo(n, t[n], r);
    n === "float" && (n = "cssFloat"), r ? e.setProperty(n, l) : e[n] = l;
  }
}
var Pd = J({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
function xi(e, t) {
  if (t) {
    if (Pd[e] && (t.children != null || t.dangerouslySetInnerHTML != null)) throw Error(E(137, e));
    if (t.dangerouslySetInnerHTML != null) {
      if (t.children != null) throw Error(E(60));
      if (typeof t.dangerouslySetInnerHTML != "object" || !("__html" in t.dangerouslySetInnerHTML)) throw Error(E(61));
    }
    if (t.style != null && typeof t.style != "object") throw Error(E(62));
  }
}
function Si(e, t) {
  if (e.indexOf("-") === -1) return typeof t.is == "string";
  switch (e) {
    case "annotation-xml":
    case "color-profile":
    case "font-face":
    case "font-face-src":
    case "font-face-uri":
    case "font-face-format":
    case "font-face-name":
    case "missing-glyph":
      return !1;
    default:
      return !0;
  }
}
var Ni = null;
function ms(e) {
  return e = e.target || e.srcElement || window, e.correspondingUseElement && (e = e.correspondingUseElement), e.nodeType === 3 ? e.parentNode : e;
}
var ki = null, an = null, on = null;
function ha(e) {
  if (e = pr(e)) {
    if (typeof ki != "function") throw Error(E(280));
    var t = e.stateNode;
    t && (t = kl(t), ki(e.stateNode, e.type, t));
  }
}
function Xo(e) {
  an ? on ? on.push(e) : on = [e] : an = e;
}
function Jo() {
  if (an) {
    var e = an, t = on;
    if (on = an = null, ha(e), t) for (e = 0; e < t.length; e++) ha(t[e]);
  }
}
function Zo(e, t) {
  return e(t);
}
function qo() {
}
var Bl = !1;
function bo(e, t, n) {
  if (Bl) return e(t, n);
  Bl = !0;
  try {
    return Zo(e, t, n);
  } finally {
    Bl = !1, (an !== null || on !== null) && (qo(), Jo());
  }
}
function Yn(e, t) {
  var n = e.stateNode;
  if (n === null) return null;
  var r = kl(n);
  if (r === null) return null;
  n = r[t];
  e: switch (t) {
    case "onClick":
    case "onClickCapture":
    case "onDoubleClick":
    case "onDoubleClickCapture":
    case "onMouseDown":
    case "onMouseDownCapture":
    case "onMouseMove":
    case "onMouseMoveCapture":
    case "onMouseUp":
    case "onMouseUpCapture":
    case "onMouseEnter":
      (r = !r.disabled) || (e = e.type, r = !(e === "button" || e === "input" || e === "select" || e === "textarea")), e = !r;
      break e;
    default:
      e = !1;
  }
  if (e) return null;
  if (n && typeof n != "function") throw Error(E(231, t, typeof n));
  return n;
}
var ji = !1;
if (be) try {
  var En = {};
  Object.defineProperty(En, "passive", { get: function() {
    ji = !0;
  } }), window.addEventListener("test", En, En), window.removeEventListener("test", En, En);
} catch {
  ji = !1;
}
function Td(e, t, n, r, l, i, s, o, u) {
  var c = Array.prototype.slice.call(arguments, 3);
  try {
    t.apply(n, c);
  } catch (p) {
    this.onError(p);
  }
}
var Fn = !1, Gr = null, Xr = !1, Ei = null, Ld = { onError: function(e) {
  Fn = !0, Gr = e;
} };
function Rd(e, t, n, r, l, i, s, o, u) {
  Fn = !1, Gr = null, Td.apply(Ld, arguments);
}
function Id(e, t, n, r, l, i, s, o, u) {
  if (Rd.apply(this, arguments), Fn) {
    if (Fn) {
      var c = Gr;
      Fn = !1, Gr = null;
    } else throw Error(E(198));
    Xr || (Xr = !0, Ei = c);
  }
}
function Ht(e) {
  var t = e, n = e;
  if (e.alternate) for (; t.return; ) t = t.return;
  else {
    e = t;
    do
      t = e, t.flags & 4098 && (n = t.return), e = t.return;
    while (e);
  }
  return t.tag === 3 ? n : null;
}
function eu(e) {
  if (e.tag === 13) {
    var t = e.memoizedState;
    if (t === null && (e = e.alternate, e !== null && (t = e.memoizedState)), t !== null) return t.dehydrated;
  }
  return null;
}
function ma(e) {
  if (Ht(e) !== e) throw Error(E(188));
}
function zd(e) {
  var t = e.alternate;
  if (!t) {
    if (t = Ht(e), t === null) throw Error(E(188));
    return t !== e ? null : e;
  }
  for (var n = e, r = t; ; ) {
    var l = n.return;
    if (l === null) break;
    var i = l.alternate;
    if (i === null) {
      if (r = l.return, r !== null) {
        n = r;
        continue;
      }
      break;
    }
    if (l.child === i.child) {
      for (i = l.child; i; ) {
        if (i === n) return ma(l), e;
        if (i === r) return ma(l), t;
        i = i.sibling;
      }
      throw Error(E(188));
    }
    if (n.return !== r.return) n = l, r = i;
    else {
      for (var s = !1, o = l.child; o; ) {
        if (o === n) {
          s = !0, n = l, r = i;
          break;
        }
        if (o === r) {
          s = !0, r = l, n = i;
          break;
        }
        o = o.sibling;
      }
      if (!s) {
        for (o = i.child; o; ) {
          if (o === n) {
            s = !0, n = i, r = l;
            break;
          }
          if (o === r) {
            s = !0, r = i, n = l;
            break;
          }
          o = o.sibling;
        }
        if (!s) throw Error(E(189));
      }
    }
    if (n.alternate !== r) throw Error(E(190));
  }
  if (n.tag !== 3) throw Error(E(188));
  return n.stateNode.current === n ? e : t;
}
function tu(e) {
  return e = zd(e), e !== null ? nu(e) : null;
}
function nu(e) {
  if (e.tag === 5 || e.tag === 6) return e;
  for (e = e.child; e !== null; ) {
    var t = nu(e);
    if (t !== null) return t;
    e = e.sibling;
  }
  return null;
}
var ru = Ce.unstable_scheduleCallback, va = Ce.unstable_cancelCallback, Od = Ce.unstable_shouldYield, Dd = Ce.unstable_requestPaint, b = Ce.unstable_now, Md = Ce.unstable_getCurrentPriorityLevel, vs = Ce.unstable_ImmediatePriority, lu = Ce.unstable_UserBlockingPriority, Jr = Ce.unstable_NormalPriority, Fd = Ce.unstable_LowPriority, iu = Ce.unstable_IdlePriority, wl = null, Qe = null;
function Ad(e) {
  if (Qe && typeof Qe.onCommitFiberRoot == "function") try {
    Qe.onCommitFiberRoot(wl, e, void 0, (e.current.flags & 128) === 128);
  } catch {
  }
}
var Ue = Math.clz32 ? Math.clz32 : $d, Ud = Math.log, Bd = Math.LN2;
function $d(e) {
  return e >>>= 0, e === 0 ? 32 : 31 - (Ud(e) / Bd | 0) | 0;
}
var Nr = 64, kr = 4194304;
function On(e) {
  switch (e & -e) {
    case 1:
      return 1;
    case 2:
      return 2;
    case 4:
      return 4;
    case 8:
      return 8;
    case 16:
      return 16;
    case 32:
      return 32;
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return e & 4194240;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return e & 130023424;
    case 134217728:
      return 134217728;
    case 268435456:
      return 268435456;
    case 536870912:
      return 536870912;
    case 1073741824:
      return 1073741824;
    default:
      return e;
  }
}
function Zr(e, t) {
  var n = e.pendingLanes;
  if (n === 0) return 0;
  var r = 0, l = e.suspendedLanes, i = e.pingedLanes, s = n & 268435455;
  if (s !== 0) {
    var o = s & ~l;
    o !== 0 ? r = On(o) : (i &= s, i !== 0 && (r = On(i)));
  } else s = n & ~l, s !== 0 ? r = On(s) : i !== 0 && (r = On(i));
  if (r === 0) return 0;
  if (t !== 0 && t !== r && !(t & l) && (l = r & -r, i = t & -t, l >= i || l === 16 && (i & 4194240) !== 0)) return t;
  if (r & 4 && (r |= n & 16), t = e.entangledLanes, t !== 0) for (e = e.entanglements, t &= r; 0 < t; ) n = 31 - Ue(t), l = 1 << n, r |= e[n], t &= ~l;
  return r;
}
function Vd(e, t) {
  switch (e) {
    case 1:
    case 2:
    case 4:
      return t + 250;
    case 8:
    case 16:
    case 32:
    case 64:
    case 128:
    case 256:
    case 512:
    case 1024:
    case 2048:
    case 4096:
    case 8192:
    case 16384:
    case 32768:
    case 65536:
    case 131072:
    case 262144:
    case 524288:
    case 1048576:
    case 2097152:
      return t + 5e3;
    case 4194304:
    case 8388608:
    case 16777216:
    case 33554432:
    case 67108864:
      return -1;
    case 134217728:
    case 268435456:
    case 536870912:
    case 1073741824:
      return -1;
    default:
      return -1;
  }
}
function Wd(e, t) {
  for (var n = e.suspendedLanes, r = e.pingedLanes, l = e.expirationTimes, i = e.pendingLanes; 0 < i; ) {
    var s = 31 - Ue(i), o = 1 << s, u = l[s];
    u === -1 ? (!(o & n) || o & r) && (l[s] = Vd(o, t)) : u <= t && (e.expiredLanes |= o), i &= ~o;
  }
}
function Ci(e) {
  return e = e.pendingLanes & -1073741825, e !== 0 ? e : e & 1073741824 ? 1073741824 : 0;
}
function su() {
  var e = Nr;
  return Nr <<= 1, !(Nr & 4194240) && (Nr = 64), e;
}
function $l(e) {
  for (var t = [], n = 0; 31 > n; n++) t.push(e);
  return t;
}
function dr(e, t, n) {
  e.pendingLanes |= t, t !== 536870912 && (e.suspendedLanes = 0, e.pingedLanes = 0), e = e.eventTimes, t = 31 - Ue(t), e[t] = n;
}
function Hd(e, t) {
  var n = e.pendingLanes & ~t;
  e.pendingLanes = t, e.suspendedLanes = 0, e.pingedLanes = 0, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t, t = e.entanglements;
  var r = e.eventTimes;
  for (e = e.expirationTimes; 0 < n; ) {
    var l = 31 - Ue(n), i = 1 << l;
    t[l] = 0, r[l] = -1, e[l] = -1, n &= ~i;
  }
}
function gs(e, t) {
  var n = e.entangledLanes |= t;
  for (e = e.entanglements; n; ) {
    var r = 31 - Ue(n), l = 1 << r;
    l & t | e[r] & t && (e[r] |= t), n &= ~l;
  }
}
var $ = 0;
function au(e) {
  return e &= -e, 1 < e ? 4 < e ? e & 268435455 ? 16 : 536870912 : 4 : 1;
}
var ou, ys, uu, cu, du, _i = !1, jr = [], ht = null, mt = null, vt = null, Gn = /* @__PURE__ */ new Map(), Xn = /* @__PURE__ */ new Map(), ot = [], Qd = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
function ga(e, t) {
  switch (e) {
    case "focusin":
    case "focusout":
      ht = null;
      break;
    case "dragenter":
    case "dragleave":
      mt = null;
      break;
    case "mouseover":
    case "mouseout":
      vt = null;
      break;
    case "pointerover":
    case "pointerout":
      Gn.delete(t.pointerId);
      break;
    case "gotpointercapture":
    case "lostpointercapture":
      Xn.delete(t.pointerId);
  }
}
function Cn(e, t, n, r, l, i) {
  return e === null || e.nativeEvent !== i ? (e = { blockedOn: t, domEventName: n, eventSystemFlags: r, nativeEvent: i, targetContainers: [l] }, t !== null && (t = pr(t), t !== null && ys(t)), e) : (e.eventSystemFlags |= r, t = e.targetContainers, l !== null && t.indexOf(l) === -1 && t.push(l), e);
}
function Kd(e, t, n, r, l) {
  switch (t) {
    case "focusin":
      return ht = Cn(ht, e, t, n, r, l), !0;
    case "dragenter":
      return mt = Cn(mt, e, t, n, r, l), !0;
    case "mouseover":
      return vt = Cn(vt, e, t, n, r, l), !0;
    case "pointerover":
      var i = l.pointerId;
      return Gn.set(i, Cn(Gn.get(i) || null, e, t, n, r, l)), !0;
    case "gotpointercapture":
      return i = l.pointerId, Xn.set(i, Cn(Xn.get(i) || null, e, t, n, r, l)), !0;
  }
  return !1;
}
function fu(e) {
  var t = zt(e.target);
  if (t !== null) {
    var n = Ht(t);
    if (n !== null) {
      if (t = n.tag, t === 13) {
        if (t = eu(n), t !== null) {
          e.blockedOn = t, du(e.priority, function() {
            uu(n);
          });
          return;
        }
      } else if (t === 3 && n.stateNode.current.memoizedState.isDehydrated) {
        e.blockedOn = n.tag === 3 ? n.stateNode.containerInfo : null;
        return;
      }
    }
  }
  e.blockedOn = null;
}
function Fr(e) {
  if (e.blockedOn !== null) return !1;
  for (var t = e.targetContainers; 0 < t.length; ) {
    var n = Pi(e.domEventName, e.eventSystemFlags, t[0], e.nativeEvent);
    if (n === null) {
      n = e.nativeEvent;
      var r = new n.constructor(n.type, n);
      Ni = r, n.target.dispatchEvent(r), Ni = null;
    } else return t = pr(n), t !== null && ys(t), e.blockedOn = n, !1;
    t.shift();
  }
  return !0;
}
function ya(e, t, n) {
  Fr(e) && n.delete(t);
}
function Yd() {
  _i = !1, ht !== null && Fr(ht) && (ht = null), mt !== null && Fr(mt) && (mt = null), vt !== null && Fr(vt) && (vt = null), Gn.forEach(ya), Xn.forEach(ya);
}
function _n(e, t) {
  e.blockedOn === t && (e.blockedOn = null, _i || (_i = !0, Ce.unstable_scheduleCallback(Ce.unstable_NormalPriority, Yd)));
}
function Jn(e) {
  function t(l) {
    return _n(l, e);
  }
  if (0 < jr.length) {
    _n(jr[0], e);
    for (var n = 1; n < jr.length; n++) {
      var r = jr[n];
      r.blockedOn === e && (r.blockedOn = null);
    }
  }
  for (ht !== null && _n(ht, e), mt !== null && _n(mt, e), vt !== null && _n(vt, e), Gn.forEach(t), Xn.forEach(t), n = 0; n < ot.length; n++) r = ot[n], r.blockedOn === e && (r.blockedOn = null);
  for (; 0 < ot.length && (n = ot[0], n.blockedOn === null); ) fu(n), n.blockedOn === null && ot.shift();
}
var un = rt.ReactCurrentBatchConfig, qr = !0;
function Gd(e, t, n, r) {
  var l = $, i = un.transition;
  un.transition = null;
  try {
    $ = 1, ws(e, t, n, r);
  } finally {
    $ = l, un.transition = i;
  }
}
function Xd(e, t, n, r) {
  var l = $, i = un.transition;
  un.transition = null;
  try {
    $ = 4, ws(e, t, n, r);
  } finally {
    $ = l, un.transition = i;
  }
}
function ws(e, t, n, r) {
  if (qr) {
    var l = Pi(e, t, n, r);
    if (l === null) Zl(e, t, r, br, n), ga(e, r);
    else if (Kd(l, e, t, n, r)) r.stopPropagation();
    else if (ga(e, r), t & 4 && -1 < Qd.indexOf(e)) {
      for (; l !== null; ) {
        var i = pr(l);
        if (i !== null && ou(i), i = Pi(e, t, n, r), i === null && Zl(e, t, r, br, n), i === l) break;
        l = i;
      }
      l !== null && r.stopPropagation();
    } else Zl(e, t, r, null, n);
  }
}
var br = null;
function Pi(e, t, n, r) {
  if (br = null, e = ms(r), e = zt(e), e !== null) if (t = Ht(e), t === null) e = null;
  else if (n = t.tag, n === 13) {
    if (e = eu(t), e !== null) return e;
    e = null;
  } else if (n === 3) {
    if (t.stateNode.current.memoizedState.isDehydrated) return t.tag === 3 ? t.stateNode.containerInfo : null;
    e = null;
  } else t !== e && (e = null);
  return br = e, null;
}
function pu(e) {
  switch (e) {
    case "cancel":
    case "click":
    case "close":
    case "contextmenu":
    case "copy":
    case "cut":
    case "auxclick":
    case "dblclick":
    case "dragend":
    case "dragstart":
    case "drop":
    case "focusin":
    case "focusout":
    case "input":
    case "invalid":
    case "keydown":
    case "keypress":
    case "keyup":
    case "mousedown":
    case "mouseup":
    case "paste":
    case "pause":
    case "play":
    case "pointercancel":
    case "pointerdown":
    case "pointerup":
    case "ratechange":
    case "reset":
    case "resize":
    case "seeked":
    case "submit":
    case "touchcancel":
    case "touchend":
    case "touchstart":
    case "volumechange":
    case "change":
    case "selectionchange":
    case "textInput":
    case "compositionstart":
    case "compositionend":
    case "compositionupdate":
    case "beforeblur":
    case "afterblur":
    case "beforeinput":
    case "blur":
    case "fullscreenchange":
    case "focus":
    case "hashchange":
    case "popstate":
    case "select":
    case "selectstart":
      return 1;
    case "drag":
    case "dragenter":
    case "dragexit":
    case "dragleave":
    case "dragover":
    case "mousemove":
    case "mouseout":
    case "mouseover":
    case "pointermove":
    case "pointerout":
    case "pointerover":
    case "scroll":
    case "toggle":
    case "touchmove":
    case "wheel":
    case "mouseenter":
    case "mouseleave":
    case "pointerenter":
    case "pointerleave":
      return 4;
    case "message":
      switch (Md()) {
        case vs:
          return 1;
        case lu:
          return 4;
        case Jr:
        case Fd:
          return 16;
        case iu:
          return 536870912;
        default:
          return 16;
      }
    default:
      return 16;
  }
}
var ct = null, xs = null, Ar = null;
function hu() {
  if (Ar) return Ar;
  var e, t = xs, n = t.length, r, l = "value" in ct ? ct.value : ct.textContent, i = l.length;
  for (e = 0; e < n && t[e] === l[e]; e++) ;
  var s = n - e;
  for (r = 1; r <= s && t[n - r] === l[i - r]; r++) ;
  return Ar = l.slice(e, 1 < r ? 1 - r : void 0);
}
function Ur(e) {
  var t = e.keyCode;
  return "charCode" in e ? (e = e.charCode, e === 0 && t === 13 && (e = 13)) : e = t, e === 10 && (e = 13), 32 <= e || e === 13 ? e : 0;
}
function Er() {
  return !0;
}
function wa() {
  return !1;
}
function Pe(e) {
  function t(n, r, l, i, s) {
    this._reactName = n, this._targetInst = l, this.type = r, this.nativeEvent = i, this.target = s, this.currentTarget = null;
    for (var o in e) e.hasOwnProperty(o) && (n = e[o], this[o] = n ? n(i) : i[o]);
    return this.isDefaultPrevented = (i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1) ? Er : wa, this.isPropagationStopped = wa, this;
  }
  return J(t.prototype, { preventDefault: function() {
    this.defaultPrevented = !0;
    var n = this.nativeEvent;
    n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = Er);
  }, stopPropagation: function() {
    var n = this.nativeEvent;
    n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = Er);
  }, persist: function() {
  }, isPersistent: Er }), t;
}
var xn = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(e) {
  return e.timeStamp || Date.now();
}, defaultPrevented: 0, isTrusted: 0 }, Ss = Pe(xn), fr = J({}, xn, { view: 0, detail: 0 }), Jd = Pe(fr), Vl, Wl, Pn, xl = J({}, fr, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: Ns, button: 0, buttons: 0, relatedTarget: function(e) {
  return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
}, movementX: function(e) {
  return "movementX" in e ? e.movementX : (e !== Pn && (Pn && e.type === "mousemove" ? (Vl = e.screenX - Pn.screenX, Wl = e.screenY - Pn.screenY) : Wl = Vl = 0, Pn = e), Vl);
}, movementY: function(e) {
  return "movementY" in e ? e.movementY : Wl;
} }), xa = Pe(xl), Zd = J({}, xl, { dataTransfer: 0 }), qd = Pe(Zd), bd = J({}, fr, { relatedTarget: 0 }), Hl = Pe(bd), ef = J({}, xn, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), tf = Pe(ef), nf = J({}, xn, { clipboardData: function(e) {
  return "clipboardData" in e ? e.clipboardData : window.clipboardData;
} }), rf = Pe(nf), lf = J({}, xn, { data: 0 }), Sa = Pe(lf), sf = {
  Esc: "Escape",
  Spacebar: " ",
  Left: "ArrowLeft",
  Up: "ArrowUp",
  Right: "ArrowRight",
  Down: "ArrowDown",
  Del: "Delete",
  Win: "OS",
  Menu: "ContextMenu",
  Apps: "ContextMenu",
  Scroll: "ScrollLock",
  MozPrintableKey: "Unidentified"
}, af = {
  8: "Backspace",
  9: "Tab",
  12: "Clear",
  13: "Enter",
  16: "Shift",
  17: "Control",
  18: "Alt",
  19: "Pause",
  20: "CapsLock",
  27: "Escape",
  32: " ",
  33: "PageUp",
  34: "PageDown",
  35: "End",
  36: "Home",
  37: "ArrowLeft",
  38: "ArrowUp",
  39: "ArrowRight",
  40: "ArrowDown",
  45: "Insert",
  46: "Delete",
  112: "F1",
  113: "F2",
  114: "F3",
  115: "F4",
  116: "F5",
  117: "F6",
  118: "F7",
  119: "F8",
  120: "F9",
  121: "F10",
  122: "F11",
  123: "F12",
  144: "NumLock",
  145: "ScrollLock",
  224: "Meta"
}, of = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
function uf(e) {
  var t = this.nativeEvent;
  return t.getModifierState ? t.getModifierState(e) : (e = of[e]) ? !!t[e] : !1;
}
function Ns() {
  return uf;
}
var cf = J({}, fr, { key: function(e) {
  if (e.key) {
    var t = sf[e.key] || e.key;
    if (t !== "Unidentified") return t;
  }
  return e.type === "keypress" ? (e = Ur(e), e === 13 ? "Enter" : String.fromCharCode(e)) : e.type === "keydown" || e.type === "keyup" ? af[e.keyCode] || "Unidentified" : "";
}, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: Ns, charCode: function(e) {
  return e.type === "keypress" ? Ur(e) : 0;
}, keyCode: function(e) {
  return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
}, which: function(e) {
  return e.type === "keypress" ? Ur(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
} }), df = Pe(cf), ff = J({}, xl, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Na = Pe(ff), pf = J({}, fr, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: Ns }), hf = Pe(pf), mf = J({}, xn, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), vf = Pe(mf), gf = J({}, xl, {
  deltaX: function(e) {
    return "deltaX" in e ? e.deltaX : "wheelDeltaX" in e ? -e.wheelDeltaX : 0;
  },
  deltaY: function(e) {
    return "deltaY" in e ? e.deltaY : "wheelDeltaY" in e ? -e.wheelDeltaY : "wheelDelta" in e ? -e.wheelDelta : 0;
  },
  deltaZ: 0,
  deltaMode: 0
}), yf = Pe(gf), wf = [9, 13, 27, 32], ks = be && "CompositionEvent" in window, An = null;
be && "documentMode" in document && (An = document.documentMode);
var xf = be && "TextEvent" in window && !An, mu = be && (!ks || An && 8 < An && 11 >= An), ka = " ", ja = !1;
function vu(e, t) {
  switch (e) {
    case "keyup":
      return wf.indexOf(t.keyCode) !== -1;
    case "keydown":
      return t.keyCode !== 229;
    case "keypress":
    case "mousedown":
    case "focusout":
      return !0;
    default:
      return !1;
  }
}
function gu(e) {
  return e = e.detail, typeof e == "object" && "data" in e ? e.data : null;
}
var Xt = !1;
function Sf(e, t) {
  switch (e) {
    case "compositionend":
      return gu(t);
    case "keypress":
      return t.which !== 32 ? null : (ja = !0, ka);
    case "textInput":
      return e = t.data, e === ka && ja ? null : e;
    default:
      return null;
  }
}
function Nf(e, t) {
  if (Xt) return e === "compositionend" || !ks && vu(e, t) ? (e = hu(), Ar = xs = ct = null, Xt = !1, e) : null;
  switch (e) {
    case "paste":
      return null;
    case "keypress":
      if (!(t.ctrlKey || t.altKey || t.metaKey) || t.ctrlKey && t.altKey) {
        if (t.char && 1 < t.char.length) return t.char;
        if (t.which) return String.fromCharCode(t.which);
      }
      return null;
    case "compositionend":
      return mu && t.locale !== "ko" ? null : t.data;
    default:
      return null;
  }
}
var kf = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
function Ea(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t === "input" ? !!kf[e.type] : t === "textarea";
}
function yu(e, t, n, r) {
  Xo(r), t = el(t, "onChange"), 0 < t.length && (n = new Ss("onChange", "change", null, n, r), e.push({ event: n, listeners: t }));
}
var Un = null, Zn = null;
function jf(e) {
  Tu(e, 0);
}
function Sl(e) {
  var t = qt(e);
  if (Vo(t)) return e;
}
function Ef(e, t) {
  if (e === "change") return t;
}
var wu = !1;
if (be) {
  var Ql;
  if (be) {
    var Kl = "oninput" in document;
    if (!Kl) {
      var Ca = document.createElement("div");
      Ca.setAttribute("oninput", "return;"), Kl = typeof Ca.oninput == "function";
    }
    Ql = Kl;
  } else Ql = !1;
  wu = Ql && (!document.documentMode || 9 < document.documentMode);
}
function _a() {
  Un && (Un.detachEvent("onpropertychange", xu), Zn = Un = null);
}
function xu(e) {
  if (e.propertyName === "value" && Sl(Zn)) {
    var t = [];
    yu(t, Zn, e, ms(e)), bo(jf, t);
  }
}
function Cf(e, t, n) {
  e === "focusin" ? (_a(), Un = t, Zn = n, Un.attachEvent("onpropertychange", xu)) : e === "focusout" && _a();
}
function _f(e) {
  if (e === "selectionchange" || e === "keyup" || e === "keydown") return Sl(Zn);
}
function Pf(e, t) {
  if (e === "click") return Sl(t);
}
function Tf(e, t) {
  if (e === "input" || e === "change") return Sl(t);
}
function Lf(e, t) {
  return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
}
var $e = typeof Object.is == "function" ? Object.is : Lf;
function qn(e, t) {
  if ($e(e, t)) return !0;
  if (typeof e != "object" || e === null || typeof t != "object" || t === null) return !1;
  var n = Object.keys(e), r = Object.keys(t);
  if (n.length !== r.length) return !1;
  for (r = 0; r < n.length; r++) {
    var l = n[r];
    if (!ci.call(t, l) || !$e(e[l], t[l])) return !1;
  }
  return !0;
}
function Pa(e) {
  for (; e && e.firstChild; ) e = e.firstChild;
  return e;
}
function Ta(e, t) {
  var n = Pa(e);
  e = 0;
  for (var r; n; ) {
    if (n.nodeType === 3) {
      if (r = e + n.textContent.length, e <= t && r >= t) return { node: n, offset: t - e };
      e = r;
    }
    e: {
      for (; n; ) {
        if (n.nextSibling) {
          n = n.nextSibling;
          break e;
        }
        n = n.parentNode;
      }
      n = void 0;
    }
    n = Pa(n);
  }
}
function Su(e, t) {
  return e && t ? e === t ? !0 : e && e.nodeType === 3 ? !1 : t && t.nodeType === 3 ? Su(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1 : !1;
}
function Nu() {
  for (var e = window, t = Yr(); t instanceof e.HTMLIFrameElement; ) {
    try {
      var n = typeof t.contentWindow.location.href == "string";
    } catch {
      n = !1;
    }
    if (n) e = t.contentWindow;
    else break;
    t = Yr(e.document);
  }
  return t;
}
function js(e) {
  var t = e && e.nodeName && e.nodeName.toLowerCase();
  return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
}
function Rf(e) {
  var t = Nu(), n = e.focusedElem, r = e.selectionRange;
  if (t !== n && n && n.ownerDocument && Su(n.ownerDocument.documentElement, n)) {
    if (r !== null && js(n)) {
      if (t = r.start, e = r.end, e === void 0 && (e = t), "selectionStart" in n) n.selectionStart = t, n.selectionEnd = Math.min(e, n.value.length);
      else if (e = (t = n.ownerDocument || document) && t.defaultView || window, e.getSelection) {
        e = e.getSelection();
        var l = n.textContent.length, i = Math.min(r.start, l);
        r = r.end === void 0 ? i : Math.min(r.end, l), !e.extend && i > r && (l = r, r = i, i = l), l = Ta(n, i);
        var s = Ta(
          n,
          r
        );
        l && s && (e.rangeCount !== 1 || e.anchorNode !== l.node || e.anchorOffset !== l.offset || e.focusNode !== s.node || e.focusOffset !== s.offset) && (t = t.createRange(), t.setStart(l.node, l.offset), e.removeAllRanges(), i > r ? (e.addRange(t), e.extend(s.node, s.offset)) : (t.setEnd(s.node, s.offset), e.addRange(t)));
      }
    }
    for (t = [], e = n; e = e.parentNode; ) e.nodeType === 1 && t.push({ element: e, left: e.scrollLeft, top: e.scrollTop });
    for (typeof n.focus == "function" && n.focus(), n = 0; n < t.length; n++) e = t[n], e.element.scrollLeft = e.left, e.element.scrollTop = e.top;
  }
}
var If = be && "documentMode" in document && 11 >= document.documentMode, Jt = null, Ti = null, Bn = null, Li = !1;
function La(e, t, n) {
  var r = n.window === n ? n.document : n.nodeType === 9 ? n : n.ownerDocument;
  Li || Jt == null || Jt !== Yr(r) || (r = Jt, "selectionStart" in r && js(r) ? r = { start: r.selectionStart, end: r.selectionEnd } : (r = (r.ownerDocument && r.ownerDocument.defaultView || window).getSelection(), r = { anchorNode: r.anchorNode, anchorOffset: r.anchorOffset, focusNode: r.focusNode, focusOffset: r.focusOffset }), Bn && qn(Bn, r) || (Bn = r, r = el(Ti, "onSelect"), 0 < r.length && (t = new Ss("onSelect", "select", null, t, n), e.push({ event: t, listeners: r }), t.target = Jt)));
}
function Cr(e, t) {
  var n = {};
  return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
}
var Zt = { animationend: Cr("Animation", "AnimationEnd"), animationiteration: Cr("Animation", "AnimationIteration"), animationstart: Cr("Animation", "AnimationStart"), transitionend: Cr("Transition", "TransitionEnd") }, Yl = {}, ku = {};
be && (ku = document.createElement("div").style, "AnimationEvent" in window || (delete Zt.animationend.animation, delete Zt.animationiteration.animation, delete Zt.animationstart.animation), "TransitionEvent" in window || delete Zt.transitionend.transition);
function Nl(e) {
  if (Yl[e]) return Yl[e];
  if (!Zt[e]) return e;
  var t = Zt[e], n;
  for (n in t) if (t.hasOwnProperty(n) && n in ku) return Yl[e] = t[n];
  return e;
}
var ju = Nl("animationend"), Eu = Nl("animationiteration"), Cu = Nl("animationstart"), _u = Nl("transitionend"), Pu = /* @__PURE__ */ new Map(), Ra = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
function Et(e, t) {
  Pu.set(e, t), Wt(t, [e]);
}
for (var Gl = 0; Gl < Ra.length; Gl++) {
  var Xl = Ra[Gl], zf = Xl.toLowerCase(), Of = Xl[0].toUpperCase() + Xl.slice(1);
  Et(zf, "on" + Of);
}
Et(ju, "onAnimationEnd");
Et(Eu, "onAnimationIteration");
Et(Cu, "onAnimationStart");
Et("dblclick", "onDoubleClick");
Et("focusin", "onFocus");
Et("focusout", "onBlur");
Et(_u, "onTransitionEnd");
fn("onMouseEnter", ["mouseout", "mouseover"]);
fn("onMouseLeave", ["mouseout", "mouseover"]);
fn("onPointerEnter", ["pointerout", "pointerover"]);
fn("onPointerLeave", ["pointerout", "pointerover"]);
Wt("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" "));
Wt("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" "));
Wt("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]);
Wt("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" "));
Wt("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" "));
Wt("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
var Dn = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), Df = new Set("cancel close invalid load scroll toggle".split(" ").concat(Dn));
function Ia(e, t, n) {
  var r = e.type || "unknown-event";
  e.currentTarget = n, Id(r, t, void 0, e), e.currentTarget = null;
}
function Tu(e, t) {
  t = (t & 4) !== 0;
  for (var n = 0; n < e.length; n++) {
    var r = e[n], l = r.event;
    r = r.listeners;
    e: {
      var i = void 0;
      if (t) for (var s = r.length - 1; 0 <= s; s--) {
        var o = r[s], u = o.instance, c = o.currentTarget;
        if (o = o.listener, u !== i && l.isPropagationStopped()) break e;
        Ia(l, o, c), i = u;
      }
      else for (s = 0; s < r.length; s++) {
        if (o = r[s], u = o.instance, c = o.currentTarget, o = o.listener, u !== i && l.isPropagationStopped()) break e;
        Ia(l, o, c), i = u;
      }
    }
  }
  if (Xr) throw e = Ei, Xr = !1, Ei = null, e;
}
function H(e, t) {
  var n = t[Di];
  n === void 0 && (n = t[Di] = /* @__PURE__ */ new Set());
  var r = e + "__bubble";
  n.has(r) || (Lu(t, e, 2, !1), n.add(r));
}
function Jl(e, t, n) {
  var r = 0;
  t && (r |= 4), Lu(n, e, r, t);
}
var _r = "_reactListening" + Math.random().toString(36).slice(2);
function bn(e) {
  if (!e[_r]) {
    e[_r] = !0, Fo.forEach(function(n) {
      n !== "selectionchange" && (Df.has(n) || Jl(n, !1, e), Jl(n, !0, e));
    });
    var t = e.nodeType === 9 ? e : e.ownerDocument;
    t === null || t[_r] || (t[_r] = !0, Jl("selectionchange", !1, t));
  }
}
function Lu(e, t, n, r) {
  switch (pu(t)) {
    case 1:
      var l = Gd;
      break;
    case 4:
      l = Xd;
      break;
    default:
      l = ws;
  }
  n = l.bind(null, t, n, e), l = void 0, !ji || t !== "touchstart" && t !== "touchmove" && t !== "wheel" || (l = !0), r ? l !== void 0 ? e.addEventListener(t, n, { capture: !0, passive: l }) : e.addEventListener(t, n, !0) : l !== void 0 ? e.addEventListener(t, n, { passive: l }) : e.addEventListener(t, n, !1);
}
function Zl(e, t, n, r, l) {
  var i = r;
  if (!(t & 1) && !(t & 2) && r !== null) e: for (; ; ) {
    if (r === null) return;
    var s = r.tag;
    if (s === 3 || s === 4) {
      var o = r.stateNode.containerInfo;
      if (o === l || o.nodeType === 8 && o.parentNode === l) break;
      if (s === 4) for (s = r.return; s !== null; ) {
        var u = s.tag;
        if ((u === 3 || u === 4) && (u = s.stateNode.containerInfo, u === l || u.nodeType === 8 && u.parentNode === l)) return;
        s = s.return;
      }
      for (; o !== null; ) {
        if (s = zt(o), s === null) return;
        if (u = s.tag, u === 5 || u === 6) {
          r = i = s;
          continue e;
        }
        o = o.parentNode;
      }
    }
    r = r.return;
  }
  bo(function() {
    var c = i, p = ms(n), f = [];
    e: {
      var m = Pu.get(e);
      if (m !== void 0) {
        var w = Ss, N = e;
        switch (e) {
          case "keypress":
            if (Ur(n) === 0) break e;
          case "keydown":
          case "keyup":
            w = df;
            break;
          case "focusin":
            N = "focus", w = Hl;
            break;
          case "focusout":
            N = "blur", w = Hl;
            break;
          case "beforeblur":
          case "afterblur":
            w = Hl;
            break;
          case "click":
            if (n.button === 2) break e;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            w = xa;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            w = qd;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            w = hf;
            break;
          case ju:
          case Eu:
          case Cu:
            w = tf;
            break;
          case _u:
            w = vf;
            break;
          case "scroll":
            w = Jd;
            break;
          case "wheel":
            w = yf;
            break;
          case "copy":
          case "cut":
          case "paste":
            w = rf;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            w = Na;
        }
        var k = (t & 4) !== 0, P = !k && e === "scroll", v = k ? m !== null ? m + "Capture" : null : m;
        k = [];
        for (var d = c, h; d !== null; ) {
          h = d;
          var g = h.stateNode;
          if (h.tag === 5 && g !== null && (h = g, v !== null && (g = Yn(d, v), g != null && k.push(er(d, g, h)))), P) break;
          d = d.return;
        }
        0 < k.length && (m = new w(m, N, null, n, p), f.push({ event: m, listeners: k }));
      }
    }
    if (!(t & 7)) {
      e: {
        if (m = e === "mouseover" || e === "pointerover", w = e === "mouseout" || e === "pointerout", m && n !== Ni && (N = n.relatedTarget || n.fromElement) && (zt(N) || N[et])) break e;
        if ((w || m) && (m = p.window === p ? p : (m = p.ownerDocument) ? m.defaultView || m.parentWindow : window, w ? (N = n.relatedTarget || n.toElement, w = c, N = N ? zt(N) : null, N !== null && (P = Ht(N), N !== P || N.tag !== 5 && N.tag !== 6) && (N = null)) : (w = null, N = c), w !== N)) {
          if (k = xa, g = "onMouseLeave", v = "onMouseEnter", d = "mouse", (e === "pointerout" || e === "pointerover") && (k = Na, g = "onPointerLeave", v = "onPointerEnter", d = "pointer"), P = w == null ? m : qt(w), h = N == null ? m : qt(N), m = new k(g, d + "leave", w, n, p), m.target = P, m.relatedTarget = h, g = null, zt(p) === c && (k = new k(v, d + "enter", N, n, p), k.target = h, k.relatedTarget = P, g = k), P = g, w && N) t: {
            for (k = w, v = N, d = 0, h = k; h; h = Qt(h)) d++;
            for (h = 0, g = v; g; g = Qt(g)) h++;
            for (; 0 < d - h; ) k = Qt(k), d--;
            for (; 0 < h - d; ) v = Qt(v), h--;
            for (; d--; ) {
              if (k === v || v !== null && k === v.alternate) break t;
              k = Qt(k), v = Qt(v);
            }
            k = null;
          }
          else k = null;
          w !== null && za(f, m, w, k, !1), N !== null && P !== null && za(f, P, N, k, !0);
        }
      }
      e: {
        if (m = c ? qt(c) : window, w = m.nodeName && m.nodeName.toLowerCase(), w === "select" || w === "input" && m.type === "file") var x = Ef;
        else if (Ea(m)) if (wu) x = Tf;
        else {
          x = _f;
          var C = Cf;
        }
        else (w = m.nodeName) && w.toLowerCase() === "input" && (m.type === "checkbox" || m.type === "radio") && (x = Pf);
        if (x && (x = x(e, c))) {
          yu(f, x, n, p);
          break e;
        }
        C && C(e, m, c), e === "focusout" && (C = m._wrapperState) && C.controlled && m.type === "number" && gi(m, "number", m.value);
      }
      switch (C = c ? qt(c) : window, e) {
        case "focusin":
          (Ea(C) || C.contentEditable === "true") && (Jt = C, Ti = c, Bn = null);
          break;
        case "focusout":
          Bn = Ti = Jt = null;
          break;
        case "mousedown":
          Li = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Li = !1, La(f, n, p);
          break;
        case "selectionchange":
          if (If) break;
        case "keydown":
        case "keyup":
          La(f, n, p);
      }
      var S;
      if (ks) e: {
        switch (e) {
          case "compositionstart":
            var L = "onCompositionStart";
            break e;
          case "compositionend":
            L = "onCompositionEnd";
            break e;
          case "compositionupdate":
            L = "onCompositionUpdate";
            break e;
        }
        L = void 0;
      }
      else Xt ? vu(e, n) && (L = "onCompositionEnd") : e === "keydown" && n.keyCode === 229 && (L = "onCompositionStart");
      L && (mu && n.locale !== "ko" && (Xt || L !== "onCompositionStart" ? L === "onCompositionEnd" && Xt && (S = hu()) : (ct = p, xs = "value" in ct ? ct.value : ct.textContent, Xt = !0)), C = el(c, L), 0 < C.length && (L = new Sa(L, e, null, n, p), f.push({ event: L, listeners: C }), S ? L.data = S : (S = gu(n), S !== null && (L.data = S)))), (S = xf ? Sf(e, n) : Nf(e, n)) && (c = el(c, "onBeforeInput"), 0 < c.length && (p = new Sa("onBeforeInput", "beforeinput", null, n, p), f.push({ event: p, listeners: c }), p.data = S));
    }
    Tu(f, t);
  });
}
function er(e, t, n) {
  return { instance: e, listener: t, currentTarget: n };
}
function el(e, t) {
  for (var n = t + "Capture", r = []; e !== null; ) {
    var l = e, i = l.stateNode;
    l.tag === 5 && i !== null && (l = i, i = Yn(e, n), i != null && r.unshift(er(e, i, l)), i = Yn(e, t), i != null && r.push(er(e, i, l))), e = e.return;
  }
  return r;
}
function Qt(e) {
  if (e === null) return null;
  do
    e = e.return;
  while (e && e.tag !== 5);
  return e || null;
}
function za(e, t, n, r, l) {
  for (var i = t._reactName, s = []; n !== null && n !== r; ) {
    var o = n, u = o.alternate, c = o.stateNode;
    if (u !== null && u === r) break;
    o.tag === 5 && c !== null && (o = c, l ? (u = Yn(n, i), u != null && s.unshift(er(n, u, o))) : l || (u = Yn(n, i), u != null && s.push(er(n, u, o)))), n = n.return;
  }
  s.length !== 0 && e.push({ event: t, listeners: s });
}
var Mf = /\r\n?/g, Ff = /\u0000|\uFFFD/g;
function Oa(e) {
  return (typeof e == "string" ? e : "" + e).replace(Mf, `
`).replace(Ff, "");
}
function Pr(e, t, n) {
  if (t = Oa(t), Oa(e) !== t && n) throw Error(E(425));
}
function tl() {
}
var Ri = null, Ii = null;
function zi(e, t) {
  return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
}
var Oi = typeof setTimeout == "function" ? setTimeout : void 0, Af = typeof clearTimeout == "function" ? clearTimeout : void 0, Da = typeof Promise == "function" ? Promise : void 0, Uf = typeof queueMicrotask == "function" ? queueMicrotask : typeof Da < "u" ? function(e) {
  return Da.resolve(null).then(e).catch(Bf);
} : Oi;
function Bf(e) {
  setTimeout(function() {
    throw e;
  });
}
function ql(e, t) {
  var n = t, r = 0;
  do {
    var l = n.nextSibling;
    if (e.removeChild(n), l && l.nodeType === 8) if (n = l.data, n === "/$") {
      if (r === 0) {
        e.removeChild(l), Jn(t);
        return;
      }
      r--;
    } else n !== "$" && n !== "$?" && n !== "$!" || r++;
    n = l;
  } while (n);
  Jn(t);
}
function gt(e) {
  for (; e != null; e = e.nextSibling) {
    var t = e.nodeType;
    if (t === 1 || t === 3) break;
    if (t === 8) {
      if (t = e.data, t === "$" || t === "$!" || t === "$?") break;
      if (t === "/$") return null;
    }
  }
  return e;
}
function Ma(e) {
  e = e.previousSibling;
  for (var t = 0; e; ) {
    if (e.nodeType === 8) {
      var n = e.data;
      if (n === "$" || n === "$!" || n === "$?") {
        if (t === 0) return e;
        t--;
      } else n === "/$" && t++;
    }
    e = e.previousSibling;
  }
  return null;
}
var Sn = Math.random().toString(36).slice(2), He = "__reactFiber$" + Sn, tr = "__reactProps$" + Sn, et = "__reactContainer$" + Sn, Di = "__reactEvents$" + Sn, $f = "__reactListeners$" + Sn, Vf = "__reactHandles$" + Sn;
function zt(e) {
  var t = e[He];
  if (t) return t;
  for (var n = e.parentNode; n; ) {
    if (t = n[et] || n[He]) {
      if (n = t.alternate, t.child !== null || n !== null && n.child !== null) for (e = Ma(e); e !== null; ) {
        if (n = e[He]) return n;
        e = Ma(e);
      }
      return t;
    }
    e = n, n = e.parentNode;
  }
  return null;
}
function pr(e) {
  return e = e[He] || e[et], !e || e.tag !== 5 && e.tag !== 6 && e.tag !== 13 && e.tag !== 3 ? null : e;
}
function qt(e) {
  if (e.tag === 5 || e.tag === 6) return e.stateNode;
  throw Error(E(33));
}
function kl(e) {
  return e[tr] || null;
}
var Mi = [], bt = -1;
function Ct(e) {
  return { current: e };
}
function Q(e) {
  0 > bt || (e.current = Mi[bt], Mi[bt] = null, bt--);
}
function W(e, t) {
  bt++, Mi[bt] = e.current, e.current = t;
}
var jt = {}, pe = Ct(jt), xe = Ct(!1), At = jt;
function pn(e, t) {
  var n = e.type.contextTypes;
  if (!n) return jt;
  var r = e.stateNode;
  if (r && r.__reactInternalMemoizedUnmaskedChildContext === t) return r.__reactInternalMemoizedMaskedChildContext;
  var l = {}, i;
  for (i in n) l[i] = t[i];
  return r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = t, e.__reactInternalMemoizedMaskedChildContext = l), l;
}
function Se(e) {
  return e = e.childContextTypes, e != null;
}
function nl() {
  Q(xe), Q(pe);
}
function Fa(e, t, n) {
  if (pe.current !== jt) throw Error(E(168));
  W(pe, t), W(xe, n);
}
function Ru(e, t, n) {
  var r = e.stateNode;
  if (t = t.childContextTypes, typeof r.getChildContext != "function") return n;
  r = r.getChildContext();
  for (var l in r) if (!(l in t)) throw Error(E(108, Ed(e) || "Unknown", l));
  return J({}, n, r);
}
function rl(e) {
  return e = (e = e.stateNode) && e.__reactInternalMemoizedMergedChildContext || jt, At = pe.current, W(pe, e), W(xe, xe.current), !0;
}
function Aa(e, t, n) {
  var r = e.stateNode;
  if (!r) throw Error(E(169));
  n ? (e = Ru(e, t, At), r.__reactInternalMemoizedMergedChildContext = e, Q(xe), Q(pe), W(pe, e)) : Q(xe), W(xe, n);
}
var Xe = null, jl = !1, bl = !1;
function Iu(e) {
  Xe === null ? Xe = [e] : Xe.push(e);
}
function Wf(e) {
  jl = !0, Iu(e);
}
function _t() {
  if (!bl && Xe !== null) {
    bl = !0;
    var e = 0, t = $;
    try {
      var n = Xe;
      for ($ = 1; e < n.length; e++) {
        var r = n[e];
        do
          r = r(!0);
        while (r !== null);
      }
      Xe = null, jl = !1;
    } catch (l) {
      throw Xe !== null && (Xe = Xe.slice(e + 1)), ru(vs, _t), l;
    } finally {
      $ = t, bl = !1;
    }
  }
  return null;
}
var en = [], tn = 0, ll = null, il = 0, Te = [], Le = 0, Ut = null, Je = 1, Ze = "";
function Rt(e, t) {
  en[tn++] = il, en[tn++] = ll, ll = e, il = t;
}
function zu(e, t, n) {
  Te[Le++] = Je, Te[Le++] = Ze, Te[Le++] = Ut, Ut = e;
  var r = Je;
  e = Ze;
  var l = 32 - Ue(r) - 1;
  r &= ~(1 << l), n += 1;
  var i = 32 - Ue(t) + l;
  if (30 < i) {
    var s = l - l % 5;
    i = (r & (1 << s) - 1).toString(32), r >>= s, l -= s, Je = 1 << 32 - Ue(t) + l | n << l | r, Ze = i + e;
  } else Je = 1 << i | n << l | r, Ze = e;
}
function Es(e) {
  e.return !== null && (Rt(e, 1), zu(e, 1, 0));
}
function Cs(e) {
  for (; e === ll; ) ll = en[--tn], en[tn] = null, il = en[--tn], en[tn] = null;
  for (; e === Ut; ) Ut = Te[--Le], Te[Le] = null, Ze = Te[--Le], Te[Le] = null, Je = Te[--Le], Te[Le] = null;
}
var Ee = null, je = null, Y = !1, Ae = null;
function Ou(e, t) {
  var n = Re(5, null, null, 0);
  n.elementType = "DELETED", n.stateNode = t, n.return = e, t = e.deletions, t === null ? (e.deletions = [n], e.flags |= 16) : t.push(n);
}
function Ua(e, t) {
  switch (e.tag) {
    case 5:
      var n = e.type;
      return t = t.nodeType !== 1 || n.toLowerCase() !== t.nodeName.toLowerCase() ? null : t, t !== null ? (e.stateNode = t, Ee = e, je = gt(t.firstChild), !0) : !1;
    case 6:
      return t = e.pendingProps === "" || t.nodeType !== 3 ? null : t, t !== null ? (e.stateNode = t, Ee = e, je = null, !0) : !1;
    case 13:
      return t = t.nodeType !== 8 ? null : t, t !== null ? (n = Ut !== null ? { id: Je, overflow: Ze } : null, e.memoizedState = { dehydrated: t, treeContext: n, retryLane: 1073741824 }, n = Re(18, null, null, 0), n.stateNode = t, n.return = e, e.child = n, Ee = e, je = null, !0) : !1;
    default:
      return !1;
  }
}
function Fi(e) {
  return (e.mode & 1) !== 0 && (e.flags & 128) === 0;
}
function Ai(e) {
  if (Y) {
    var t = je;
    if (t) {
      var n = t;
      if (!Ua(e, t)) {
        if (Fi(e)) throw Error(E(418));
        t = gt(n.nextSibling);
        var r = Ee;
        t && Ua(e, t) ? Ou(r, n) : (e.flags = e.flags & -4097 | 2, Y = !1, Ee = e);
      }
    } else {
      if (Fi(e)) throw Error(E(418));
      e.flags = e.flags & -4097 | 2, Y = !1, Ee = e;
    }
  }
}
function Ba(e) {
  for (e = e.return; e !== null && e.tag !== 5 && e.tag !== 3 && e.tag !== 13; ) e = e.return;
  Ee = e;
}
function Tr(e) {
  if (e !== Ee) return !1;
  if (!Y) return Ba(e), Y = !0, !1;
  var t;
  if ((t = e.tag !== 3) && !(t = e.tag !== 5) && (t = e.type, t = t !== "head" && t !== "body" && !zi(e.type, e.memoizedProps)), t && (t = je)) {
    if (Fi(e)) throw Du(), Error(E(418));
    for (; t; ) Ou(e, t), t = gt(t.nextSibling);
  }
  if (Ba(e), e.tag === 13) {
    if (e = e.memoizedState, e = e !== null ? e.dehydrated : null, !e) throw Error(E(317));
    e: {
      for (e = e.nextSibling, t = 0; e; ) {
        if (e.nodeType === 8) {
          var n = e.data;
          if (n === "/$") {
            if (t === 0) {
              je = gt(e.nextSibling);
              break e;
            }
            t--;
          } else n !== "$" && n !== "$!" && n !== "$?" || t++;
        }
        e = e.nextSibling;
      }
      je = null;
    }
  } else je = Ee ? gt(e.stateNode.nextSibling) : null;
  return !0;
}
function Du() {
  for (var e = je; e; ) e = gt(e.nextSibling);
}
function hn() {
  je = Ee = null, Y = !1;
}
function _s(e) {
  Ae === null ? Ae = [e] : Ae.push(e);
}
var Hf = rt.ReactCurrentBatchConfig;
function Tn(e, t, n) {
  if (e = n.ref, e !== null && typeof e != "function" && typeof e != "object") {
    if (n._owner) {
      if (n = n._owner, n) {
        if (n.tag !== 1) throw Error(E(309));
        var r = n.stateNode;
      }
      if (!r) throw Error(E(147, e));
      var l = r, i = "" + e;
      return t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === i ? t.ref : (t = function(s) {
        var o = l.refs;
        s === null ? delete o[i] : o[i] = s;
      }, t._stringRef = i, t);
    }
    if (typeof e != "string") throw Error(E(284));
    if (!n._owner) throw Error(E(290, e));
  }
  return e;
}
function Lr(e, t) {
  throw e = Object.prototype.toString.call(t), Error(E(31, e === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : e));
}
function $a(e) {
  var t = e._init;
  return t(e._payload);
}
function Mu(e) {
  function t(v, d) {
    if (e) {
      var h = v.deletions;
      h === null ? (v.deletions = [d], v.flags |= 16) : h.push(d);
    }
  }
  function n(v, d) {
    if (!e) return null;
    for (; d !== null; ) t(v, d), d = d.sibling;
    return null;
  }
  function r(v, d) {
    for (v = /* @__PURE__ */ new Map(); d !== null; ) d.key !== null ? v.set(d.key, d) : v.set(d.index, d), d = d.sibling;
    return v;
  }
  function l(v, d) {
    return v = St(v, d), v.index = 0, v.sibling = null, v;
  }
  function i(v, d, h) {
    return v.index = h, e ? (h = v.alternate, h !== null ? (h = h.index, h < d ? (v.flags |= 2, d) : h) : (v.flags |= 2, d)) : (v.flags |= 1048576, d);
  }
  function s(v) {
    return e && v.alternate === null && (v.flags |= 2), v;
  }
  function o(v, d, h, g) {
    return d === null || d.tag !== 6 ? (d = si(h, v.mode, g), d.return = v, d) : (d = l(d, h), d.return = v, d);
  }
  function u(v, d, h, g) {
    var x = h.type;
    return x === Gt ? p(v, d, h.props.children, g, h.key) : d !== null && (d.elementType === x || typeof x == "object" && x !== null && x.$$typeof === st && $a(x) === d.type) ? (g = l(d, h.props), g.ref = Tn(v, d, h), g.return = v, g) : (g = Kr(h.type, h.key, h.props, null, v.mode, g), g.ref = Tn(v, d, h), g.return = v, g);
  }
  function c(v, d, h, g) {
    return d === null || d.tag !== 4 || d.stateNode.containerInfo !== h.containerInfo || d.stateNode.implementation !== h.implementation ? (d = ai(h, v.mode, g), d.return = v, d) : (d = l(d, h.children || []), d.return = v, d);
  }
  function p(v, d, h, g, x) {
    return d === null || d.tag !== 7 ? (d = Ft(h, v.mode, g, x), d.return = v, d) : (d = l(d, h), d.return = v, d);
  }
  function f(v, d, h) {
    if (typeof d == "string" && d !== "" || typeof d == "number") return d = si("" + d, v.mode, h), d.return = v, d;
    if (typeof d == "object" && d !== null) {
      switch (d.$$typeof) {
        case wr:
          return h = Kr(d.type, d.key, d.props, null, v.mode, h), h.ref = Tn(v, null, d), h.return = v, h;
        case Yt:
          return d = ai(d, v.mode, h), d.return = v, d;
        case st:
          var g = d._init;
          return f(v, g(d._payload), h);
      }
      if (zn(d) || jn(d)) return d = Ft(d, v.mode, h, null), d.return = v, d;
      Lr(v, d);
    }
    return null;
  }
  function m(v, d, h, g) {
    var x = d !== null ? d.key : null;
    if (typeof h == "string" && h !== "" || typeof h == "number") return x !== null ? null : o(v, d, "" + h, g);
    if (typeof h == "object" && h !== null) {
      switch (h.$$typeof) {
        case wr:
          return h.key === x ? u(v, d, h, g) : null;
        case Yt:
          return h.key === x ? c(v, d, h, g) : null;
        case st:
          return x = h._init, m(
            v,
            d,
            x(h._payload),
            g
          );
      }
      if (zn(h) || jn(h)) return x !== null ? null : p(v, d, h, g, null);
      Lr(v, h);
    }
    return null;
  }
  function w(v, d, h, g, x) {
    if (typeof g == "string" && g !== "" || typeof g == "number") return v = v.get(h) || null, o(d, v, "" + g, x);
    if (typeof g == "object" && g !== null) {
      switch (g.$$typeof) {
        case wr:
          return v = v.get(g.key === null ? h : g.key) || null, u(d, v, g, x);
        case Yt:
          return v = v.get(g.key === null ? h : g.key) || null, c(d, v, g, x);
        case st:
          var C = g._init;
          return w(v, d, h, C(g._payload), x);
      }
      if (zn(g) || jn(g)) return v = v.get(h) || null, p(d, v, g, x, null);
      Lr(d, g);
    }
    return null;
  }
  function N(v, d, h, g) {
    for (var x = null, C = null, S = d, L = d = 0, I = null; S !== null && L < h.length; L++) {
      S.index > L ? (I = S, S = null) : I = S.sibling;
      var _ = m(v, S, h[L], g);
      if (_ === null) {
        S === null && (S = I);
        break;
      }
      e && S && _.alternate === null && t(v, S), d = i(_, d, L), C === null ? x = _ : C.sibling = _, C = _, S = I;
    }
    if (L === h.length) return n(v, S), Y && Rt(v, L), x;
    if (S === null) {
      for (; L < h.length; L++) S = f(v, h[L], g), S !== null && (d = i(S, d, L), C === null ? x = S : C.sibling = S, C = S);
      return Y && Rt(v, L), x;
    }
    for (S = r(v, S); L < h.length; L++) I = w(S, v, L, h[L], g), I !== null && (e && I.alternate !== null && S.delete(I.key === null ? L : I.key), d = i(I, d, L), C === null ? x = I : C.sibling = I, C = I);
    return e && S.forEach(function(z) {
      return t(v, z);
    }), Y && Rt(v, L), x;
  }
  function k(v, d, h, g) {
    var x = jn(h);
    if (typeof x != "function") throw Error(E(150));
    if (h = x.call(h), h == null) throw Error(E(151));
    for (var C = x = null, S = d, L = d = 0, I = null, _ = h.next(); S !== null && !_.done; L++, _ = h.next()) {
      S.index > L ? (I = S, S = null) : I = S.sibling;
      var z = m(v, S, _.value, g);
      if (z === null) {
        S === null && (S = I);
        break;
      }
      e && S && z.alternate === null && t(v, S), d = i(z, d, L), C === null ? x = z : C.sibling = z, C = z, S = I;
    }
    if (_.done) return n(
      v,
      S
    ), Y && Rt(v, L), x;
    if (S === null) {
      for (; !_.done; L++, _ = h.next()) _ = f(v, _.value, g), _ !== null && (d = i(_, d, L), C === null ? x = _ : C.sibling = _, C = _);
      return Y && Rt(v, L), x;
    }
    for (S = r(v, S); !_.done; L++, _ = h.next()) _ = w(S, v, L, _.value, g), _ !== null && (e && _.alternate !== null && S.delete(_.key === null ? L : _.key), d = i(_, d, L), C === null ? x = _ : C.sibling = _, C = _);
    return e && S.forEach(function(j) {
      return t(v, j);
    }), Y && Rt(v, L), x;
  }
  function P(v, d, h, g) {
    if (typeof h == "object" && h !== null && h.type === Gt && h.key === null && (h = h.props.children), typeof h == "object" && h !== null) {
      switch (h.$$typeof) {
        case wr:
          e: {
            for (var x = h.key, C = d; C !== null; ) {
              if (C.key === x) {
                if (x = h.type, x === Gt) {
                  if (C.tag === 7) {
                    n(v, C.sibling), d = l(C, h.props.children), d.return = v, v = d;
                    break e;
                  }
                } else if (C.elementType === x || typeof x == "object" && x !== null && x.$$typeof === st && $a(x) === C.type) {
                  n(v, C.sibling), d = l(C, h.props), d.ref = Tn(v, C, h), d.return = v, v = d;
                  break e;
                }
                n(v, C);
                break;
              } else t(v, C);
              C = C.sibling;
            }
            h.type === Gt ? (d = Ft(h.props.children, v.mode, g, h.key), d.return = v, v = d) : (g = Kr(h.type, h.key, h.props, null, v.mode, g), g.ref = Tn(v, d, h), g.return = v, v = g);
          }
          return s(v);
        case Yt:
          e: {
            for (C = h.key; d !== null; ) {
              if (d.key === C) if (d.tag === 4 && d.stateNode.containerInfo === h.containerInfo && d.stateNode.implementation === h.implementation) {
                n(v, d.sibling), d = l(d, h.children || []), d.return = v, v = d;
                break e;
              } else {
                n(v, d);
                break;
              }
              else t(v, d);
              d = d.sibling;
            }
            d = ai(h, v.mode, g), d.return = v, v = d;
          }
          return s(v);
        case st:
          return C = h._init, P(v, d, C(h._payload), g);
      }
      if (zn(h)) return N(v, d, h, g);
      if (jn(h)) return k(v, d, h, g);
      Lr(v, h);
    }
    return typeof h == "string" && h !== "" || typeof h == "number" ? (h = "" + h, d !== null && d.tag === 6 ? (n(v, d.sibling), d = l(d, h), d.return = v, v = d) : (n(v, d), d = si(h, v.mode, g), d.return = v, v = d), s(v)) : n(v, d);
  }
  return P;
}
var mn = Mu(!0), Fu = Mu(!1), sl = Ct(null), al = null, nn = null, Ps = null;
function Ts() {
  Ps = nn = al = null;
}
function Ls(e) {
  var t = sl.current;
  Q(sl), e._currentValue = t;
}
function Ui(e, t, n) {
  for (; e !== null; ) {
    var r = e.alternate;
    if ((e.childLanes & t) !== t ? (e.childLanes |= t, r !== null && (r.childLanes |= t)) : r !== null && (r.childLanes & t) !== t && (r.childLanes |= t), e === n) break;
    e = e.return;
  }
}
function cn(e, t) {
  al = e, Ps = nn = null, e = e.dependencies, e !== null && e.firstContext !== null && (e.lanes & t && (we = !0), e.firstContext = null);
}
function ze(e) {
  var t = e._currentValue;
  if (Ps !== e) if (e = { context: e, memoizedValue: t, next: null }, nn === null) {
    if (al === null) throw Error(E(308));
    nn = e, al.dependencies = { lanes: 0, firstContext: e };
  } else nn = nn.next = e;
  return t;
}
var Ot = null;
function Rs(e) {
  Ot === null ? Ot = [e] : Ot.push(e);
}
function Au(e, t, n, r) {
  var l = t.interleaved;
  return l === null ? (n.next = n, Rs(t)) : (n.next = l.next, l.next = n), t.interleaved = n, tt(e, r);
}
function tt(e, t) {
  e.lanes |= t;
  var n = e.alternate;
  for (n !== null && (n.lanes |= t), n = e, e = e.return; e !== null; ) e.childLanes |= t, n = e.alternate, n !== null && (n.childLanes |= t), n = e, e = e.return;
  return n.tag === 3 ? n.stateNode : null;
}
var at = !1;
function Is(e) {
  e.updateQueue = { baseState: e.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
}
function Uu(e, t) {
  e = e.updateQueue, t.updateQueue === e && (t.updateQueue = { baseState: e.baseState, firstBaseUpdate: e.firstBaseUpdate, lastBaseUpdate: e.lastBaseUpdate, shared: e.shared, effects: e.effects });
}
function qe(e, t) {
  return { eventTime: e, lane: t, tag: 0, payload: null, callback: null, next: null };
}
function yt(e, t, n) {
  var r = e.updateQueue;
  if (r === null) return null;
  if (r = r.shared, A & 2) {
    var l = r.pending;
    return l === null ? t.next = t : (t.next = l.next, l.next = t), r.pending = t, tt(e, n);
  }
  return l = r.interleaved, l === null ? (t.next = t, Rs(r)) : (t.next = l.next, l.next = t), r.interleaved = t, tt(e, n);
}
function Br(e, t, n) {
  if (t = t.updateQueue, t !== null && (t = t.shared, (n & 4194240) !== 0)) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, gs(e, n);
  }
}
function Va(e, t) {
  var n = e.updateQueue, r = e.alternate;
  if (r !== null && (r = r.updateQueue, n === r)) {
    var l = null, i = null;
    if (n = n.firstBaseUpdate, n !== null) {
      do {
        var s = { eventTime: n.eventTime, lane: n.lane, tag: n.tag, payload: n.payload, callback: n.callback, next: null };
        i === null ? l = i = s : i = i.next = s, n = n.next;
      } while (n !== null);
      i === null ? l = i = t : i = i.next = t;
    } else l = i = t;
    n = { baseState: r.baseState, firstBaseUpdate: l, lastBaseUpdate: i, shared: r.shared, effects: r.effects }, e.updateQueue = n;
    return;
  }
  e = n.lastBaseUpdate, e === null ? n.firstBaseUpdate = t : e.next = t, n.lastBaseUpdate = t;
}
function ol(e, t, n, r) {
  var l = e.updateQueue;
  at = !1;
  var i = l.firstBaseUpdate, s = l.lastBaseUpdate, o = l.shared.pending;
  if (o !== null) {
    l.shared.pending = null;
    var u = o, c = u.next;
    u.next = null, s === null ? i = c : s.next = c, s = u;
    var p = e.alternate;
    p !== null && (p = p.updateQueue, o = p.lastBaseUpdate, o !== s && (o === null ? p.firstBaseUpdate = c : o.next = c, p.lastBaseUpdate = u));
  }
  if (i !== null) {
    var f = l.baseState;
    s = 0, p = c = u = null, o = i;
    do {
      var m = o.lane, w = o.eventTime;
      if ((r & m) === m) {
        p !== null && (p = p.next = {
          eventTime: w,
          lane: 0,
          tag: o.tag,
          payload: o.payload,
          callback: o.callback,
          next: null
        });
        e: {
          var N = e, k = o;
          switch (m = t, w = n, k.tag) {
            case 1:
              if (N = k.payload, typeof N == "function") {
                f = N.call(w, f, m);
                break e;
              }
              f = N;
              break e;
            case 3:
              N.flags = N.flags & -65537 | 128;
            case 0:
              if (N = k.payload, m = typeof N == "function" ? N.call(w, f, m) : N, m == null) break e;
              f = J({}, f, m);
              break e;
            case 2:
              at = !0;
          }
        }
        o.callback !== null && o.lane !== 0 && (e.flags |= 64, m = l.effects, m === null ? l.effects = [o] : m.push(o));
      } else w = { eventTime: w, lane: m, tag: o.tag, payload: o.payload, callback: o.callback, next: null }, p === null ? (c = p = w, u = f) : p = p.next = w, s |= m;
      if (o = o.next, o === null) {
        if (o = l.shared.pending, o === null) break;
        m = o, o = m.next, m.next = null, l.lastBaseUpdate = m, l.shared.pending = null;
      }
    } while (!0);
    if (p === null && (u = f), l.baseState = u, l.firstBaseUpdate = c, l.lastBaseUpdate = p, t = l.shared.interleaved, t !== null) {
      l = t;
      do
        s |= l.lane, l = l.next;
      while (l !== t);
    } else i === null && (l.shared.lanes = 0);
    $t |= s, e.lanes = s, e.memoizedState = f;
  }
}
function Wa(e, t, n) {
  if (e = t.effects, t.effects = null, e !== null) for (t = 0; t < e.length; t++) {
    var r = e[t], l = r.callback;
    if (l !== null) {
      if (r.callback = null, r = n, typeof l != "function") throw Error(E(191, l));
      l.call(r);
    }
  }
}
var hr = {}, Ke = Ct(hr), nr = Ct(hr), rr = Ct(hr);
function Dt(e) {
  if (e === hr) throw Error(E(174));
  return e;
}
function zs(e, t) {
  switch (W(rr, t), W(nr, e), W(Ke, hr), e = t.nodeType, e) {
    case 9:
    case 11:
      t = (t = t.documentElement) ? t.namespaceURI : wi(null, "");
      break;
    default:
      e = e === 8 ? t.parentNode : t, t = e.namespaceURI || null, e = e.tagName, t = wi(t, e);
  }
  Q(Ke), W(Ke, t);
}
function vn() {
  Q(Ke), Q(nr), Q(rr);
}
function Bu(e) {
  Dt(rr.current);
  var t = Dt(Ke.current), n = wi(t, e.type);
  t !== n && (W(nr, e), W(Ke, n));
}
function Os(e) {
  nr.current === e && (Q(Ke), Q(nr));
}
var G = Ct(0);
function ul(e) {
  for (var t = e; t !== null; ) {
    if (t.tag === 13) {
      var n = t.memoizedState;
      if (n !== null && (n = n.dehydrated, n === null || n.data === "$?" || n.data === "$!")) return t;
    } else if (t.tag === 19 && t.memoizedProps.revealOrder !== void 0) {
      if (t.flags & 128) return t;
    } else if (t.child !== null) {
      t.child.return = t, t = t.child;
      continue;
    }
    if (t === e) break;
    for (; t.sibling === null; ) {
      if (t.return === null || t.return === e) return null;
      t = t.return;
    }
    t.sibling.return = t.return, t = t.sibling;
  }
  return null;
}
var ei = [];
function Ds() {
  for (var e = 0; e < ei.length; e++) ei[e]._workInProgressVersionPrimary = null;
  ei.length = 0;
}
var $r = rt.ReactCurrentDispatcher, ti = rt.ReactCurrentBatchConfig, Bt = 0, X = null, ne = null, ie = null, cl = !1, $n = !1, lr = 0, Qf = 0;
function ce() {
  throw Error(E(321));
}
function Ms(e, t) {
  if (t === null) return !1;
  for (var n = 0; n < t.length && n < e.length; n++) if (!$e(e[n], t[n])) return !1;
  return !0;
}
function Fs(e, t, n, r, l, i) {
  if (Bt = i, X = t, t.memoizedState = null, t.updateQueue = null, t.lanes = 0, $r.current = e === null || e.memoizedState === null ? Xf : Jf, e = n(r, l), $n) {
    i = 0;
    do {
      if ($n = !1, lr = 0, 25 <= i) throw Error(E(301));
      i += 1, ie = ne = null, t.updateQueue = null, $r.current = Zf, e = n(r, l);
    } while ($n);
  }
  if ($r.current = dl, t = ne !== null && ne.next !== null, Bt = 0, ie = ne = X = null, cl = !1, t) throw Error(E(300));
  return e;
}
function As() {
  var e = lr !== 0;
  return lr = 0, e;
}
function We() {
  var e = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
  return ie === null ? X.memoizedState = ie = e : ie = ie.next = e, ie;
}
function Oe() {
  if (ne === null) {
    var e = X.alternate;
    e = e !== null ? e.memoizedState : null;
  } else e = ne.next;
  var t = ie === null ? X.memoizedState : ie.next;
  if (t !== null) ie = t, ne = e;
  else {
    if (e === null) throw Error(E(310));
    ne = e, e = { memoizedState: ne.memoizedState, baseState: ne.baseState, baseQueue: ne.baseQueue, queue: ne.queue, next: null }, ie === null ? X.memoizedState = ie = e : ie = ie.next = e;
  }
  return ie;
}
function ir(e, t) {
  return typeof t == "function" ? t(e) : t;
}
function ni(e) {
  var t = Oe(), n = t.queue;
  if (n === null) throw Error(E(311));
  n.lastRenderedReducer = e;
  var r = ne, l = r.baseQueue, i = n.pending;
  if (i !== null) {
    if (l !== null) {
      var s = l.next;
      l.next = i.next, i.next = s;
    }
    r.baseQueue = l = i, n.pending = null;
  }
  if (l !== null) {
    i = l.next, r = r.baseState;
    var o = s = null, u = null, c = i;
    do {
      var p = c.lane;
      if ((Bt & p) === p) u !== null && (u = u.next = { lane: 0, action: c.action, hasEagerState: c.hasEagerState, eagerState: c.eagerState, next: null }), r = c.hasEagerState ? c.eagerState : e(r, c.action);
      else {
        var f = {
          lane: p,
          action: c.action,
          hasEagerState: c.hasEagerState,
          eagerState: c.eagerState,
          next: null
        };
        u === null ? (o = u = f, s = r) : u = u.next = f, X.lanes |= p, $t |= p;
      }
      c = c.next;
    } while (c !== null && c !== i);
    u === null ? s = r : u.next = o, $e(r, t.memoizedState) || (we = !0), t.memoizedState = r, t.baseState = s, t.baseQueue = u, n.lastRenderedState = r;
  }
  if (e = n.interleaved, e !== null) {
    l = e;
    do
      i = l.lane, X.lanes |= i, $t |= i, l = l.next;
    while (l !== e);
  } else l === null && (n.lanes = 0);
  return [t.memoizedState, n.dispatch];
}
function ri(e) {
  var t = Oe(), n = t.queue;
  if (n === null) throw Error(E(311));
  n.lastRenderedReducer = e;
  var r = n.dispatch, l = n.pending, i = t.memoizedState;
  if (l !== null) {
    n.pending = null;
    var s = l = l.next;
    do
      i = e(i, s.action), s = s.next;
    while (s !== l);
    $e(i, t.memoizedState) || (we = !0), t.memoizedState = i, t.baseQueue === null && (t.baseState = i), n.lastRenderedState = i;
  }
  return [i, r];
}
function $u() {
}
function Vu(e, t) {
  var n = X, r = Oe(), l = t(), i = !$e(r.memoizedState, l);
  if (i && (r.memoizedState = l, we = !0), r = r.queue, Us(Qu.bind(null, n, r, e), [e]), r.getSnapshot !== t || i || ie !== null && ie.memoizedState.tag & 1) {
    if (n.flags |= 2048, sr(9, Hu.bind(null, n, r, l, t), void 0, null), se === null) throw Error(E(349));
    Bt & 30 || Wu(n, t, l);
  }
  return l;
}
function Wu(e, t, n) {
  e.flags |= 16384, e = { getSnapshot: t, value: n }, t = X.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, X.updateQueue = t, t.stores = [e]) : (n = t.stores, n === null ? t.stores = [e] : n.push(e));
}
function Hu(e, t, n, r) {
  t.value = n, t.getSnapshot = r, Ku(t) && Yu(e);
}
function Qu(e, t, n) {
  return n(function() {
    Ku(t) && Yu(e);
  });
}
function Ku(e) {
  var t = e.getSnapshot;
  e = e.value;
  try {
    var n = t();
    return !$e(e, n);
  } catch {
    return !0;
  }
}
function Yu(e) {
  var t = tt(e, 1);
  t !== null && Be(t, e, 1, -1);
}
function Ha(e) {
  var t = We();
  return typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: ir, lastRenderedState: e }, t.queue = e, e = e.dispatch = Gf.bind(null, X, e), [t.memoizedState, e];
}
function sr(e, t, n, r) {
  return e = { tag: e, create: t, destroy: n, deps: r, next: null }, t = X.updateQueue, t === null ? (t = { lastEffect: null, stores: null }, X.updateQueue = t, t.lastEffect = e.next = e) : (n = t.lastEffect, n === null ? t.lastEffect = e.next = e : (r = n.next, n.next = e, e.next = r, t.lastEffect = e)), e;
}
function Gu() {
  return Oe().memoizedState;
}
function Vr(e, t, n, r) {
  var l = We();
  X.flags |= e, l.memoizedState = sr(1 | t, n, void 0, r === void 0 ? null : r);
}
function El(e, t, n, r) {
  var l = Oe();
  r = r === void 0 ? null : r;
  var i = void 0;
  if (ne !== null) {
    var s = ne.memoizedState;
    if (i = s.destroy, r !== null && Ms(r, s.deps)) {
      l.memoizedState = sr(t, n, i, r);
      return;
    }
  }
  X.flags |= e, l.memoizedState = sr(1 | t, n, i, r);
}
function Qa(e, t) {
  return Vr(8390656, 8, e, t);
}
function Us(e, t) {
  return El(2048, 8, e, t);
}
function Xu(e, t) {
  return El(4, 2, e, t);
}
function Ju(e, t) {
  return El(4, 4, e, t);
}
function Zu(e, t) {
  if (typeof t == "function") return e = e(), t(e), function() {
    t(null);
  };
  if (t != null) return e = e(), t.current = e, function() {
    t.current = null;
  };
}
function qu(e, t, n) {
  return n = n != null ? n.concat([e]) : null, El(4, 4, Zu.bind(null, t, e), n);
}
function Bs() {
}
function bu(e, t) {
  var n = Oe();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Ms(t, r[1]) ? r[0] : (n.memoizedState = [e, t], e);
}
function ec(e, t) {
  var n = Oe();
  t = t === void 0 ? null : t;
  var r = n.memoizedState;
  return r !== null && t !== null && Ms(t, r[1]) ? r[0] : (e = e(), n.memoizedState = [e, t], e);
}
function tc(e, t, n) {
  return Bt & 21 ? ($e(n, t) || (n = su(), X.lanes |= n, $t |= n, e.baseState = !0), t) : (e.baseState && (e.baseState = !1, we = !0), e.memoizedState = n);
}
function Kf(e, t) {
  var n = $;
  $ = n !== 0 && 4 > n ? n : 4, e(!0);
  var r = ti.transition;
  ti.transition = {};
  try {
    e(!1), t();
  } finally {
    $ = n, ti.transition = r;
  }
}
function nc() {
  return Oe().memoizedState;
}
function Yf(e, t, n) {
  var r = xt(e);
  if (n = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null }, rc(e)) lc(t, n);
  else if (n = Au(e, t, n, r), n !== null) {
    var l = me();
    Be(n, e, r, l), ic(n, t, r);
  }
}
function Gf(e, t, n) {
  var r = xt(e), l = { lane: r, action: n, hasEagerState: !1, eagerState: null, next: null };
  if (rc(e)) lc(t, l);
  else {
    var i = e.alternate;
    if (e.lanes === 0 && (i === null || i.lanes === 0) && (i = t.lastRenderedReducer, i !== null)) try {
      var s = t.lastRenderedState, o = i(s, n);
      if (l.hasEagerState = !0, l.eagerState = o, $e(o, s)) {
        var u = t.interleaved;
        u === null ? (l.next = l, Rs(t)) : (l.next = u.next, u.next = l), t.interleaved = l;
        return;
      }
    } catch {
    } finally {
    }
    n = Au(e, t, l, r), n !== null && (l = me(), Be(n, e, r, l), ic(n, t, r));
  }
}
function rc(e) {
  var t = e.alternate;
  return e === X || t !== null && t === X;
}
function lc(e, t) {
  $n = cl = !0;
  var n = e.pending;
  n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
}
function ic(e, t, n) {
  if (n & 4194240) {
    var r = t.lanes;
    r &= e.pendingLanes, n |= r, t.lanes = n, gs(e, n);
  }
}
var dl = { readContext: ze, useCallback: ce, useContext: ce, useEffect: ce, useImperativeHandle: ce, useInsertionEffect: ce, useLayoutEffect: ce, useMemo: ce, useReducer: ce, useRef: ce, useState: ce, useDebugValue: ce, useDeferredValue: ce, useTransition: ce, useMutableSource: ce, useSyncExternalStore: ce, useId: ce, unstable_isNewReconciler: !1 }, Xf = { readContext: ze, useCallback: function(e, t) {
  return We().memoizedState = [e, t === void 0 ? null : t], e;
}, useContext: ze, useEffect: Qa, useImperativeHandle: function(e, t, n) {
  return n = n != null ? n.concat([e]) : null, Vr(
    4194308,
    4,
    Zu.bind(null, t, e),
    n
  );
}, useLayoutEffect: function(e, t) {
  return Vr(4194308, 4, e, t);
}, useInsertionEffect: function(e, t) {
  return Vr(4, 2, e, t);
}, useMemo: function(e, t) {
  var n = We();
  return t = t === void 0 ? null : t, e = e(), n.memoizedState = [e, t], e;
}, useReducer: function(e, t, n) {
  var r = We();
  return t = n !== void 0 ? n(t) : t, r.memoizedState = r.baseState = t, e = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: e, lastRenderedState: t }, r.queue = e, e = e.dispatch = Yf.bind(null, X, e), [r.memoizedState, e];
}, useRef: function(e) {
  var t = We();
  return e = { current: e }, t.memoizedState = e;
}, useState: Ha, useDebugValue: Bs, useDeferredValue: function(e) {
  return We().memoizedState = e;
}, useTransition: function() {
  var e = Ha(!1), t = e[0];
  return e = Kf.bind(null, e[1]), We().memoizedState = e, [t, e];
}, useMutableSource: function() {
}, useSyncExternalStore: function(e, t, n) {
  var r = X, l = We();
  if (Y) {
    if (n === void 0) throw Error(E(407));
    n = n();
  } else {
    if (n = t(), se === null) throw Error(E(349));
    Bt & 30 || Wu(r, t, n);
  }
  l.memoizedState = n;
  var i = { value: n, getSnapshot: t };
  return l.queue = i, Qa(Qu.bind(
    null,
    r,
    i,
    e
  ), [e]), r.flags |= 2048, sr(9, Hu.bind(null, r, i, n, t), void 0, null), n;
}, useId: function() {
  var e = We(), t = se.identifierPrefix;
  if (Y) {
    var n = Ze, r = Je;
    n = (r & ~(1 << 32 - Ue(r) - 1)).toString(32) + n, t = ":" + t + "R" + n, n = lr++, 0 < n && (t += "H" + n.toString(32)), t += ":";
  } else n = Qf++, t = ":" + t + "r" + n.toString(32) + ":";
  return e.memoizedState = t;
}, unstable_isNewReconciler: !1 }, Jf = {
  readContext: ze,
  useCallback: bu,
  useContext: ze,
  useEffect: Us,
  useImperativeHandle: qu,
  useInsertionEffect: Xu,
  useLayoutEffect: Ju,
  useMemo: ec,
  useReducer: ni,
  useRef: Gu,
  useState: function() {
    return ni(ir);
  },
  useDebugValue: Bs,
  useDeferredValue: function(e) {
    var t = Oe();
    return tc(t, ne.memoizedState, e);
  },
  useTransition: function() {
    var e = ni(ir)[0], t = Oe().memoizedState;
    return [e, t];
  },
  useMutableSource: $u,
  useSyncExternalStore: Vu,
  useId: nc,
  unstable_isNewReconciler: !1
}, Zf = { readContext: ze, useCallback: bu, useContext: ze, useEffect: Us, useImperativeHandle: qu, useInsertionEffect: Xu, useLayoutEffect: Ju, useMemo: ec, useReducer: ri, useRef: Gu, useState: function() {
  return ri(ir);
}, useDebugValue: Bs, useDeferredValue: function(e) {
  var t = Oe();
  return ne === null ? t.memoizedState = e : tc(t, ne.memoizedState, e);
}, useTransition: function() {
  var e = ri(ir)[0], t = Oe().memoizedState;
  return [e, t];
}, useMutableSource: $u, useSyncExternalStore: Vu, useId: nc, unstable_isNewReconciler: !1 };
function Me(e, t) {
  if (e && e.defaultProps) {
    t = J({}, t), e = e.defaultProps;
    for (var n in e) t[n] === void 0 && (t[n] = e[n]);
    return t;
  }
  return t;
}
function Bi(e, t, n, r) {
  t = e.memoizedState, n = n(r, t), n = n == null ? t : J({}, t, n), e.memoizedState = n, e.lanes === 0 && (e.updateQueue.baseState = n);
}
var Cl = { isMounted: function(e) {
  return (e = e._reactInternals) ? Ht(e) === e : !1;
}, enqueueSetState: function(e, t, n) {
  e = e._reactInternals;
  var r = me(), l = xt(e), i = qe(r, l);
  i.payload = t, n != null && (i.callback = n), t = yt(e, i, l), t !== null && (Be(t, e, l, r), Br(t, e, l));
}, enqueueReplaceState: function(e, t, n) {
  e = e._reactInternals;
  var r = me(), l = xt(e), i = qe(r, l);
  i.tag = 1, i.payload = t, n != null && (i.callback = n), t = yt(e, i, l), t !== null && (Be(t, e, l, r), Br(t, e, l));
}, enqueueForceUpdate: function(e, t) {
  e = e._reactInternals;
  var n = me(), r = xt(e), l = qe(n, r);
  l.tag = 2, t != null && (l.callback = t), t = yt(e, l, r), t !== null && (Be(t, e, r, n), Br(t, e, r));
} };
function Ka(e, t, n, r, l, i, s) {
  return e = e.stateNode, typeof e.shouldComponentUpdate == "function" ? e.shouldComponentUpdate(r, i, s) : t.prototype && t.prototype.isPureReactComponent ? !qn(n, r) || !qn(l, i) : !0;
}
function sc(e, t, n) {
  var r = !1, l = jt, i = t.contextType;
  return typeof i == "object" && i !== null ? i = ze(i) : (l = Se(t) ? At : pe.current, r = t.contextTypes, i = (r = r != null) ? pn(e, l) : jt), t = new t(n, i), e.memoizedState = t.state !== null && t.state !== void 0 ? t.state : null, t.updater = Cl, e.stateNode = t, t._reactInternals = e, r && (e = e.stateNode, e.__reactInternalMemoizedUnmaskedChildContext = l, e.__reactInternalMemoizedMaskedChildContext = i), t;
}
function Ya(e, t, n, r) {
  e = t.state, typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, r), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, r), t.state !== e && Cl.enqueueReplaceState(t, t.state, null);
}
function $i(e, t, n, r) {
  var l = e.stateNode;
  l.props = n, l.state = e.memoizedState, l.refs = {}, Is(e);
  var i = t.contextType;
  typeof i == "object" && i !== null ? l.context = ze(i) : (i = Se(t) ? At : pe.current, l.context = pn(e, i)), l.state = e.memoizedState, i = t.getDerivedStateFromProps, typeof i == "function" && (Bi(e, t, i, n), l.state = e.memoizedState), typeof t.getDerivedStateFromProps == "function" || typeof l.getSnapshotBeforeUpdate == "function" || typeof l.UNSAFE_componentWillMount != "function" && typeof l.componentWillMount != "function" || (t = l.state, typeof l.componentWillMount == "function" && l.componentWillMount(), typeof l.UNSAFE_componentWillMount == "function" && l.UNSAFE_componentWillMount(), t !== l.state && Cl.enqueueReplaceState(l, l.state, null), ol(e, n, l, r), l.state = e.memoizedState), typeof l.componentDidMount == "function" && (e.flags |= 4194308);
}
function gn(e, t) {
  try {
    var n = "", r = t;
    do
      n += jd(r), r = r.return;
    while (r);
    var l = n;
  } catch (i) {
    l = `
Error generating stack: ` + i.message + `
` + i.stack;
  }
  return { value: e, source: t, stack: l, digest: null };
}
function li(e, t, n) {
  return { value: e, source: null, stack: n ?? null, digest: t ?? null };
}
function Vi(e, t) {
  try {
    console.error(t.value);
  } catch (n) {
    setTimeout(function() {
      throw n;
    });
  }
}
var qf = typeof WeakMap == "function" ? WeakMap : Map;
function ac(e, t, n) {
  n = qe(-1, n), n.tag = 3, n.payload = { element: null };
  var r = t.value;
  return n.callback = function() {
    pl || (pl = !0, qi = r), Vi(e, t);
  }, n;
}
function oc(e, t, n) {
  n = qe(-1, n), n.tag = 3;
  var r = e.type.getDerivedStateFromError;
  if (typeof r == "function") {
    var l = t.value;
    n.payload = function() {
      return r(l);
    }, n.callback = function() {
      Vi(e, t);
    };
  }
  var i = e.stateNode;
  return i !== null && typeof i.componentDidCatch == "function" && (n.callback = function() {
    Vi(e, t), typeof r != "function" && (wt === null ? wt = /* @__PURE__ */ new Set([this]) : wt.add(this));
    var s = t.stack;
    this.componentDidCatch(t.value, { componentStack: s !== null ? s : "" });
  }), n;
}
function Ga(e, t, n) {
  var r = e.pingCache;
  if (r === null) {
    r = e.pingCache = new qf();
    var l = /* @__PURE__ */ new Set();
    r.set(t, l);
  } else l = r.get(t), l === void 0 && (l = /* @__PURE__ */ new Set(), r.set(t, l));
  l.has(n) || (l.add(n), e = fp.bind(null, e, t, n), t.then(e, e));
}
function Xa(e) {
  do {
    var t;
    if ((t = e.tag === 13) && (t = e.memoizedState, t = t !== null ? t.dehydrated !== null : !0), t) return e;
    e = e.return;
  } while (e !== null);
  return null;
}
function Ja(e, t, n, r, l) {
  return e.mode & 1 ? (e.flags |= 65536, e.lanes = l, e) : (e === t ? e.flags |= 65536 : (e.flags |= 128, n.flags |= 131072, n.flags &= -52805, n.tag === 1 && (n.alternate === null ? n.tag = 17 : (t = qe(-1, 1), t.tag = 2, yt(n, t, 1))), n.lanes |= 1), e);
}
var bf = rt.ReactCurrentOwner, we = !1;
function he(e, t, n, r) {
  t.child = e === null ? Fu(t, null, n, r) : mn(t, e.child, n, r);
}
function Za(e, t, n, r, l) {
  n = n.render;
  var i = t.ref;
  return cn(t, l), r = Fs(e, t, n, r, i, l), n = As(), e !== null && !we ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, nt(e, t, l)) : (Y && n && Es(t), t.flags |= 1, he(e, t, r, l), t.child);
}
function qa(e, t, n, r, l) {
  if (e === null) {
    var i = n.type;
    return typeof i == "function" && !Gs(i) && i.defaultProps === void 0 && n.compare === null && n.defaultProps === void 0 ? (t.tag = 15, t.type = i, uc(e, t, i, r, l)) : (e = Kr(n.type, null, r, t, t.mode, l), e.ref = t.ref, e.return = t, t.child = e);
  }
  if (i = e.child, !(e.lanes & l)) {
    var s = i.memoizedProps;
    if (n = n.compare, n = n !== null ? n : qn, n(s, r) && e.ref === t.ref) return nt(e, t, l);
  }
  return t.flags |= 1, e = St(i, r), e.ref = t.ref, e.return = t, t.child = e;
}
function uc(e, t, n, r, l) {
  if (e !== null) {
    var i = e.memoizedProps;
    if (qn(i, r) && e.ref === t.ref) if (we = !1, t.pendingProps = r = i, (e.lanes & l) !== 0) e.flags & 131072 && (we = !0);
    else return t.lanes = e.lanes, nt(e, t, l);
  }
  return Wi(e, t, n, r, l);
}
function cc(e, t, n) {
  var r = t.pendingProps, l = r.children, i = e !== null ? e.memoizedState : null;
  if (r.mode === "hidden") if (!(t.mode & 1)) t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, W(ln, ke), ke |= n;
  else {
    if (!(n & 1073741824)) return e = i !== null ? i.baseLanes | n : n, t.lanes = t.childLanes = 1073741824, t.memoizedState = { baseLanes: e, cachePool: null, transitions: null }, t.updateQueue = null, W(ln, ke), ke |= e, null;
    t.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, r = i !== null ? i.baseLanes : n, W(ln, ke), ke |= r;
  }
  else i !== null ? (r = i.baseLanes | n, t.memoizedState = null) : r = n, W(ln, ke), ke |= r;
  return he(e, t, l, n), t.child;
}
function dc(e, t) {
  var n = t.ref;
  (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= 512, t.flags |= 2097152);
}
function Wi(e, t, n, r, l) {
  var i = Se(n) ? At : pe.current;
  return i = pn(t, i), cn(t, l), n = Fs(e, t, n, r, i, l), r = As(), e !== null && !we ? (t.updateQueue = e.updateQueue, t.flags &= -2053, e.lanes &= ~l, nt(e, t, l)) : (Y && r && Es(t), t.flags |= 1, he(e, t, n, l), t.child);
}
function ba(e, t, n, r, l) {
  if (Se(n)) {
    var i = !0;
    rl(t);
  } else i = !1;
  if (cn(t, l), t.stateNode === null) Wr(e, t), sc(t, n, r), $i(t, n, r, l), r = !0;
  else if (e === null) {
    var s = t.stateNode, o = t.memoizedProps;
    s.props = o;
    var u = s.context, c = n.contextType;
    typeof c == "object" && c !== null ? c = ze(c) : (c = Se(n) ? At : pe.current, c = pn(t, c));
    var p = n.getDerivedStateFromProps, f = typeof p == "function" || typeof s.getSnapshotBeforeUpdate == "function";
    f || typeof s.UNSAFE_componentWillReceiveProps != "function" && typeof s.componentWillReceiveProps != "function" || (o !== r || u !== c) && Ya(t, s, r, c), at = !1;
    var m = t.memoizedState;
    s.state = m, ol(t, r, s, l), u = t.memoizedState, o !== r || m !== u || xe.current || at ? (typeof p == "function" && (Bi(t, n, p, r), u = t.memoizedState), (o = at || Ka(t, n, o, r, m, u, c)) ? (f || typeof s.UNSAFE_componentWillMount != "function" && typeof s.componentWillMount != "function" || (typeof s.componentWillMount == "function" && s.componentWillMount(), typeof s.UNSAFE_componentWillMount == "function" && s.UNSAFE_componentWillMount()), typeof s.componentDidMount == "function" && (t.flags |= 4194308)) : (typeof s.componentDidMount == "function" && (t.flags |= 4194308), t.memoizedProps = r, t.memoizedState = u), s.props = r, s.state = u, s.context = c, r = o) : (typeof s.componentDidMount == "function" && (t.flags |= 4194308), r = !1);
  } else {
    s = t.stateNode, Uu(e, t), o = t.memoizedProps, c = t.type === t.elementType ? o : Me(t.type, o), s.props = c, f = t.pendingProps, m = s.context, u = n.contextType, typeof u == "object" && u !== null ? u = ze(u) : (u = Se(n) ? At : pe.current, u = pn(t, u));
    var w = n.getDerivedStateFromProps;
    (p = typeof w == "function" || typeof s.getSnapshotBeforeUpdate == "function") || typeof s.UNSAFE_componentWillReceiveProps != "function" && typeof s.componentWillReceiveProps != "function" || (o !== f || m !== u) && Ya(t, s, r, u), at = !1, m = t.memoizedState, s.state = m, ol(t, r, s, l);
    var N = t.memoizedState;
    o !== f || m !== N || xe.current || at ? (typeof w == "function" && (Bi(t, n, w, r), N = t.memoizedState), (c = at || Ka(t, n, c, r, m, N, u) || !1) ? (p || typeof s.UNSAFE_componentWillUpdate != "function" && typeof s.componentWillUpdate != "function" || (typeof s.componentWillUpdate == "function" && s.componentWillUpdate(r, N, u), typeof s.UNSAFE_componentWillUpdate == "function" && s.UNSAFE_componentWillUpdate(r, N, u)), typeof s.componentDidUpdate == "function" && (t.flags |= 4), typeof s.getSnapshotBeforeUpdate == "function" && (t.flags |= 1024)) : (typeof s.componentDidUpdate != "function" || o === e.memoizedProps && m === e.memoizedState || (t.flags |= 4), typeof s.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && m === e.memoizedState || (t.flags |= 1024), t.memoizedProps = r, t.memoizedState = N), s.props = r, s.state = N, s.context = u, r = c) : (typeof s.componentDidUpdate != "function" || o === e.memoizedProps && m === e.memoizedState || (t.flags |= 4), typeof s.getSnapshotBeforeUpdate != "function" || o === e.memoizedProps && m === e.memoizedState || (t.flags |= 1024), r = !1);
  }
  return Hi(e, t, n, r, i, l);
}
function Hi(e, t, n, r, l, i) {
  dc(e, t);
  var s = (t.flags & 128) !== 0;
  if (!r && !s) return l && Aa(t, n, !1), nt(e, t, i);
  r = t.stateNode, bf.current = t;
  var o = s && typeof n.getDerivedStateFromError != "function" ? null : r.render();
  return t.flags |= 1, e !== null && s ? (t.child = mn(t, e.child, null, i), t.child = mn(t, null, o, i)) : he(e, t, o, i), t.memoizedState = r.state, l && Aa(t, n, !0), t.child;
}
function fc(e) {
  var t = e.stateNode;
  t.pendingContext ? Fa(e, t.pendingContext, t.pendingContext !== t.context) : t.context && Fa(e, t.context, !1), zs(e, t.containerInfo);
}
function eo(e, t, n, r, l) {
  return hn(), _s(l), t.flags |= 256, he(e, t, n, r), t.child;
}
var Qi = { dehydrated: null, treeContext: null, retryLane: 0 };
function Ki(e) {
  return { baseLanes: e, cachePool: null, transitions: null };
}
function pc(e, t, n) {
  var r = t.pendingProps, l = G.current, i = !1, s = (t.flags & 128) !== 0, o;
  if ((o = s) || (o = e !== null && e.memoizedState === null ? !1 : (l & 2) !== 0), o ? (i = !0, t.flags &= -129) : (e === null || e.memoizedState !== null) && (l |= 1), W(G, l & 1), e === null)
    return Ai(t), e = t.memoizedState, e !== null && (e = e.dehydrated, e !== null) ? (t.mode & 1 ? e.data === "$!" ? t.lanes = 8 : t.lanes = 1073741824 : t.lanes = 1, null) : (s = r.children, e = r.fallback, i ? (r = t.mode, i = t.child, s = { mode: "hidden", children: s }, !(r & 1) && i !== null ? (i.childLanes = 0, i.pendingProps = s) : i = Tl(s, r, 0, null), e = Ft(e, r, n, null), i.return = t, e.return = t, i.sibling = e, t.child = i, t.child.memoizedState = Ki(n), t.memoizedState = Qi, e) : $s(t, s));
  if (l = e.memoizedState, l !== null && (o = l.dehydrated, o !== null)) return ep(e, t, s, r, o, l, n);
  if (i) {
    i = r.fallback, s = t.mode, l = e.child, o = l.sibling;
    var u = { mode: "hidden", children: r.children };
    return !(s & 1) && t.child !== l ? (r = t.child, r.childLanes = 0, r.pendingProps = u, t.deletions = null) : (r = St(l, u), r.subtreeFlags = l.subtreeFlags & 14680064), o !== null ? i = St(o, i) : (i = Ft(i, s, n, null), i.flags |= 2), i.return = t, r.return = t, r.sibling = i, t.child = r, r = i, i = t.child, s = e.child.memoizedState, s = s === null ? Ki(n) : { baseLanes: s.baseLanes | n, cachePool: null, transitions: s.transitions }, i.memoizedState = s, i.childLanes = e.childLanes & ~n, t.memoizedState = Qi, r;
  }
  return i = e.child, e = i.sibling, r = St(i, { mode: "visible", children: r.children }), !(t.mode & 1) && (r.lanes = n), r.return = t, r.sibling = null, e !== null && (n = t.deletions, n === null ? (t.deletions = [e], t.flags |= 16) : n.push(e)), t.child = r, t.memoizedState = null, r;
}
function $s(e, t) {
  return t = Tl({ mode: "visible", children: t }, e.mode, 0, null), t.return = e, e.child = t;
}
function Rr(e, t, n, r) {
  return r !== null && _s(r), mn(t, e.child, null, n), e = $s(t, t.pendingProps.children), e.flags |= 2, t.memoizedState = null, e;
}
function ep(e, t, n, r, l, i, s) {
  if (n)
    return t.flags & 256 ? (t.flags &= -257, r = li(Error(E(422))), Rr(e, t, s, r)) : t.memoizedState !== null ? (t.child = e.child, t.flags |= 128, null) : (i = r.fallback, l = t.mode, r = Tl({ mode: "visible", children: r.children }, l, 0, null), i = Ft(i, l, s, null), i.flags |= 2, r.return = t, i.return = t, r.sibling = i, t.child = r, t.mode & 1 && mn(t, e.child, null, s), t.child.memoizedState = Ki(s), t.memoizedState = Qi, i);
  if (!(t.mode & 1)) return Rr(e, t, s, null);
  if (l.data === "$!") {
    if (r = l.nextSibling && l.nextSibling.dataset, r) var o = r.dgst;
    return r = o, i = Error(E(419)), r = li(i, r, void 0), Rr(e, t, s, r);
  }
  if (o = (s & e.childLanes) !== 0, we || o) {
    if (r = se, r !== null) {
      switch (s & -s) {
        case 4:
          l = 2;
          break;
        case 16:
          l = 8;
          break;
        case 64:
        case 128:
        case 256:
        case 512:
        case 1024:
        case 2048:
        case 4096:
        case 8192:
        case 16384:
        case 32768:
        case 65536:
        case 131072:
        case 262144:
        case 524288:
        case 1048576:
        case 2097152:
        case 4194304:
        case 8388608:
        case 16777216:
        case 33554432:
        case 67108864:
          l = 32;
          break;
        case 536870912:
          l = 268435456;
          break;
        default:
          l = 0;
      }
      l = l & (r.suspendedLanes | s) ? 0 : l, l !== 0 && l !== i.retryLane && (i.retryLane = l, tt(e, l), Be(r, e, l, -1));
    }
    return Ys(), r = li(Error(E(421))), Rr(e, t, s, r);
  }
  return l.data === "$?" ? (t.flags |= 128, t.child = e.child, t = pp.bind(null, e), l._reactRetry = t, null) : (e = i.treeContext, je = gt(l.nextSibling), Ee = t, Y = !0, Ae = null, e !== null && (Te[Le++] = Je, Te[Le++] = Ze, Te[Le++] = Ut, Je = e.id, Ze = e.overflow, Ut = t), t = $s(t, r.children), t.flags |= 4096, t);
}
function to(e, t, n) {
  e.lanes |= t;
  var r = e.alternate;
  r !== null && (r.lanes |= t), Ui(e.return, t, n);
}
function ii(e, t, n, r, l) {
  var i = e.memoizedState;
  i === null ? e.memoizedState = { isBackwards: t, rendering: null, renderingStartTime: 0, last: r, tail: n, tailMode: l } : (i.isBackwards = t, i.rendering = null, i.renderingStartTime = 0, i.last = r, i.tail = n, i.tailMode = l);
}
function hc(e, t, n) {
  var r = t.pendingProps, l = r.revealOrder, i = r.tail;
  if (he(e, t, r.children, n), r = G.current, r & 2) r = r & 1 | 2, t.flags |= 128;
  else {
    if (e !== null && e.flags & 128) e: for (e = t.child; e !== null; ) {
      if (e.tag === 13) e.memoizedState !== null && to(e, n, t);
      else if (e.tag === 19) to(e, n, t);
      else if (e.child !== null) {
        e.child.return = e, e = e.child;
        continue;
      }
      if (e === t) break e;
      for (; e.sibling === null; ) {
        if (e.return === null || e.return === t) break e;
        e = e.return;
      }
      e.sibling.return = e.return, e = e.sibling;
    }
    r &= 1;
  }
  if (W(G, r), !(t.mode & 1)) t.memoizedState = null;
  else switch (l) {
    case "forwards":
      for (n = t.child, l = null; n !== null; ) e = n.alternate, e !== null && ul(e) === null && (l = n), n = n.sibling;
      n = l, n === null ? (l = t.child, t.child = null) : (l = n.sibling, n.sibling = null), ii(t, !1, l, n, i);
      break;
    case "backwards":
      for (n = null, l = t.child, t.child = null; l !== null; ) {
        if (e = l.alternate, e !== null && ul(e) === null) {
          t.child = l;
          break;
        }
        e = l.sibling, l.sibling = n, n = l, l = e;
      }
      ii(t, !0, n, null, i);
      break;
    case "together":
      ii(t, !1, null, null, void 0);
      break;
    default:
      t.memoizedState = null;
  }
  return t.child;
}
function Wr(e, t) {
  !(t.mode & 1) && e !== null && (e.alternate = null, t.alternate = null, t.flags |= 2);
}
function nt(e, t, n) {
  if (e !== null && (t.dependencies = e.dependencies), $t |= t.lanes, !(n & t.childLanes)) return null;
  if (e !== null && t.child !== e.child) throw Error(E(153));
  if (t.child !== null) {
    for (e = t.child, n = St(e, e.pendingProps), t.child = n, n.return = t; e.sibling !== null; ) e = e.sibling, n = n.sibling = St(e, e.pendingProps), n.return = t;
    n.sibling = null;
  }
  return t.child;
}
function tp(e, t, n) {
  switch (t.tag) {
    case 3:
      fc(t), hn();
      break;
    case 5:
      Bu(t);
      break;
    case 1:
      Se(t.type) && rl(t);
      break;
    case 4:
      zs(t, t.stateNode.containerInfo);
      break;
    case 10:
      var r = t.type._context, l = t.memoizedProps.value;
      W(sl, r._currentValue), r._currentValue = l;
      break;
    case 13:
      if (r = t.memoizedState, r !== null)
        return r.dehydrated !== null ? (W(G, G.current & 1), t.flags |= 128, null) : n & t.child.childLanes ? pc(e, t, n) : (W(G, G.current & 1), e = nt(e, t, n), e !== null ? e.sibling : null);
      W(G, G.current & 1);
      break;
    case 19:
      if (r = (n & t.childLanes) !== 0, e.flags & 128) {
        if (r) return hc(e, t, n);
        t.flags |= 128;
      }
      if (l = t.memoizedState, l !== null && (l.rendering = null, l.tail = null, l.lastEffect = null), W(G, G.current), r) break;
      return null;
    case 22:
    case 23:
      return t.lanes = 0, cc(e, t, n);
  }
  return nt(e, t, n);
}
var mc, Yi, vc, gc;
mc = function(e, t) {
  for (var n = t.child; n !== null; ) {
    if (n.tag === 5 || n.tag === 6) e.appendChild(n.stateNode);
    else if (n.tag !== 4 && n.child !== null) {
      n.child.return = n, n = n.child;
      continue;
    }
    if (n === t) break;
    for (; n.sibling === null; ) {
      if (n.return === null || n.return === t) return;
      n = n.return;
    }
    n.sibling.return = n.return, n = n.sibling;
  }
};
Yi = function() {
};
vc = function(e, t, n, r) {
  var l = e.memoizedProps;
  if (l !== r) {
    e = t.stateNode, Dt(Ke.current);
    var i = null;
    switch (n) {
      case "input":
        l = mi(e, l), r = mi(e, r), i = [];
        break;
      case "select":
        l = J({}, l, { value: void 0 }), r = J({}, r, { value: void 0 }), i = [];
        break;
      case "textarea":
        l = yi(e, l), r = yi(e, r), i = [];
        break;
      default:
        typeof l.onClick != "function" && typeof r.onClick == "function" && (e.onclick = tl);
    }
    xi(n, r);
    var s;
    n = null;
    for (c in l) if (!r.hasOwnProperty(c) && l.hasOwnProperty(c) && l[c] != null) if (c === "style") {
      var o = l[c];
      for (s in o) o.hasOwnProperty(s) && (n || (n = {}), n[s] = "");
    } else c !== "dangerouslySetInnerHTML" && c !== "children" && c !== "suppressContentEditableWarning" && c !== "suppressHydrationWarning" && c !== "autoFocus" && (Qn.hasOwnProperty(c) ? i || (i = []) : (i = i || []).push(c, null));
    for (c in r) {
      var u = r[c];
      if (o = l != null ? l[c] : void 0, r.hasOwnProperty(c) && u !== o && (u != null || o != null)) if (c === "style") if (o) {
        for (s in o) !o.hasOwnProperty(s) || u && u.hasOwnProperty(s) || (n || (n = {}), n[s] = "");
        for (s in u) u.hasOwnProperty(s) && o[s] !== u[s] && (n || (n = {}), n[s] = u[s]);
      } else n || (i || (i = []), i.push(
        c,
        n
      )), n = u;
      else c === "dangerouslySetInnerHTML" ? (u = u ? u.__html : void 0, o = o ? o.__html : void 0, u != null && o !== u && (i = i || []).push(c, u)) : c === "children" ? typeof u != "string" && typeof u != "number" || (i = i || []).push(c, "" + u) : c !== "suppressContentEditableWarning" && c !== "suppressHydrationWarning" && (Qn.hasOwnProperty(c) ? (u != null && c === "onScroll" && H("scroll", e), i || o === u || (i = [])) : (i = i || []).push(c, u));
    }
    n && (i = i || []).push("style", n);
    var c = i;
    (t.updateQueue = c) && (t.flags |= 4);
  }
};
gc = function(e, t, n, r) {
  n !== r && (t.flags |= 4);
};
function Ln(e, t) {
  if (!Y) switch (e.tailMode) {
    case "hidden":
      t = e.tail;
      for (var n = null; t !== null; ) t.alternate !== null && (n = t), t = t.sibling;
      n === null ? e.tail = null : n.sibling = null;
      break;
    case "collapsed":
      n = e.tail;
      for (var r = null; n !== null; ) n.alternate !== null && (r = n), n = n.sibling;
      r === null ? t || e.tail === null ? e.tail = null : e.tail.sibling = null : r.sibling = null;
  }
}
function de(e) {
  var t = e.alternate !== null && e.alternate.child === e.child, n = 0, r = 0;
  if (t) for (var l = e.child; l !== null; ) n |= l.lanes | l.childLanes, r |= l.subtreeFlags & 14680064, r |= l.flags & 14680064, l.return = e, l = l.sibling;
  else for (l = e.child; l !== null; ) n |= l.lanes | l.childLanes, r |= l.subtreeFlags, r |= l.flags, l.return = e, l = l.sibling;
  return e.subtreeFlags |= r, e.childLanes = n, t;
}
function np(e, t, n) {
  var r = t.pendingProps;
  switch (Cs(t), t.tag) {
    case 2:
    case 16:
    case 15:
    case 0:
    case 11:
    case 7:
    case 8:
    case 12:
    case 9:
    case 14:
      return de(t), null;
    case 1:
      return Se(t.type) && nl(), de(t), null;
    case 3:
      return r = t.stateNode, vn(), Q(xe), Q(pe), Ds(), r.pendingContext && (r.context = r.pendingContext, r.pendingContext = null), (e === null || e.child === null) && (Tr(t) ? t.flags |= 4 : e === null || e.memoizedState.isDehydrated && !(t.flags & 256) || (t.flags |= 1024, Ae !== null && (ts(Ae), Ae = null))), Yi(e, t), de(t), null;
    case 5:
      Os(t);
      var l = Dt(rr.current);
      if (n = t.type, e !== null && t.stateNode != null) vc(e, t, n, r, l), e.ref !== t.ref && (t.flags |= 512, t.flags |= 2097152);
      else {
        if (!r) {
          if (t.stateNode === null) throw Error(E(166));
          return de(t), null;
        }
        if (e = Dt(Ke.current), Tr(t)) {
          r = t.stateNode, n = t.type;
          var i = t.memoizedProps;
          switch (r[He] = t, r[tr] = i, e = (t.mode & 1) !== 0, n) {
            case "dialog":
              H("cancel", r), H("close", r);
              break;
            case "iframe":
            case "object":
            case "embed":
              H("load", r);
              break;
            case "video":
            case "audio":
              for (l = 0; l < Dn.length; l++) H(Dn[l], r);
              break;
            case "source":
              H("error", r);
              break;
            case "img":
            case "image":
            case "link":
              H(
                "error",
                r
              ), H("load", r);
              break;
            case "details":
              H("toggle", r);
              break;
            case "input":
              ca(r, i), H("invalid", r);
              break;
            case "select":
              r._wrapperState = { wasMultiple: !!i.multiple }, H("invalid", r);
              break;
            case "textarea":
              fa(r, i), H("invalid", r);
          }
          xi(n, i), l = null;
          for (var s in i) if (i.hasOwnProperty(s)) {
            var o = i[s];
            s === "children" ? typeof o == "string" ? r.textContent !== o && (i.suppressHydrationWarning !== !0 && Pr(r.textContent, o, e), l = ["children", o]) : typeof o == "number" && r.textContent !== "" + o && (i.suppressHydrationWarning !== !0 && Pr(
              r.textContent,
              o,
              e
            ), l = ["children", "" + o]) : Qn.hasOwnProperty(s) && o != null && s === "onScroll" && H("scroll", r);
          }
          switch (n) {
            case "input":
              xr(r), da(r, i, !0);
              break;
            case "textarea":
              xr(r), pa(r);
              break;
            case "select":
            case "option":
              break;
            default:
              typeof i.onClick == "function" && (r.onclick = tl);
          }
          r = l, t.updateQueue = r, r !== null && (t.flags |= 4);
        } else {
          s = l.nodeType === 9 ? l : l.ownerDocument, e === "http://www.w3.org/1999/xhtml" && (e = Qo(n)), e === "http://www.w3.org/1999/xhtml" ? n === "script" ? (e = s.createElement("div"), e.innerHTML = "<script><\/script>", e = e.removeChild(e.firstChild)) : typeof r.is == "string" ? e = s.createElement(n, { is: r.is }) : (e = s.createElement(n), n === "select" && (s = e, r.multiple ? s.multiple = !0 : r.size && (s.size = r.size))) : e = s.createElementNS(e, n), e[He] = t, e[tr] = r, mc(e, t, !1, !1), t.stateNode = e;
          e: {
            switch (s = Si(n, r), n) {
              case "dialog":
                H("cancel", e), H("close", e), l = r;
                break;
              case "iframe":
              case "object":
              case "embed":
                H("load", e), l = r;
                break;
              case "video":
              case "audio":
                for (l = 0; l < Dn.length; l++) H(Dn[l], e);
                l = r;
                break;
              case "source":
                H("error", e), l = r;
                break;
              case "img":
              case "image":
              case "link":
                H(
                  "error",
                  e
                ), H("load", e), l = r;
                break;
              case "details":
                H("toggle", e), l = r;
                break;
              case "input":
                ca(e, r), l = mi(e, r), H("invalid", e);
                break;
              case "option":
                l = r;
                break;
              case "select":
                e._wrapperState = { wasMultiple: !!r.multiple }, l = J({}, r, { value: void 0 }), H("invalid", e);
                break;
              case "textarea":
                fa(e, r), l = yi(e, r), H("invalid", e);
                break;
              default:
                l = r;
            }
            xi(n, l), o = l;
            for (i in o) if (o.hasOwnProperty(i)) {
              var u = o[i];
              i === "style" ? Go(e, u) : i === "dangerouslySetInnerHTML" ? (u = u ? u.__html : void 0, u != null && Ko(e, u)) : i === "children" ? typeof u == "string" ? (n !== "textarea" || u !== "") && Kn(e, u) : typeof u == "number" && Kn(e, "" + u) : i !== "suppressContentEditableWarning" && i !== "suppressHydrationWarning" && i !== "autoFocus" && (Qn.hasOwnProperty(i) ? u != null && i === "onScroll" && H("scroll", e) : u != null && ds(e, i, u, s));
            }
            switch (n) {
              case "input":
                xr(e), da(e, r, !1);
                break;
              case "textarea":
                xr(e), pa(e);
                break;
              case "option":
                r.value != null && e.setAttribute("value", "" + kt(r.value));
                break;
              case "select":
                e.multiple = !!r.multiple, i = r.value, i != null ? sn(e, !!r.multiple, i, !1) : r.defaultValue != null && sn(
                  e,
                  !!r.multiple,
                  r.defaultValue,
                  !0
                );
                break;
              default:
                typeof l.onClick == "function" && (e.onclick = tl);
            }
            switch (n) {
              case "button":
              case "input":
              case "select":
              case "textarea":
                r = !!r.autoFocus;
                break e;
              case "img":
                r = !0;
                break e;
              default:
                r = !1;
            }
          }
          r && (t.flags |= 4);
        }
        t.ref !== null && (t.flags |= 512, t.flags |= 2097152);
      }
      return de(t), null;
    case 6:
      if (e && t.stateNode != null) gc(e, t, e.memoizedProps, r);
      else {
        if (typeof r != "string" && t.stateNode === null) throw Error(E(166));
        if (n = Dt(rr.current), Dt(Ke.current), Tr(t)) {
          if (r = t.stateNode, n = t.memoizedProps, r[He] = t, (i = r.nodeValue !== n) && (e = Ee, e !== null)) switch (e.tag) {
            case 3:
              Pr(r.nodeValue, n, (e.mode & 1) !== 0);
              break;
            case 5:
              e.memoizedProps.suppressHydrationWarning !== !0 && Pr(r.nodeValue, n, (e.mode & 1) !== 0);
          }
          i && (t.flags |= 4);
        } else r = (n.nodeType === 9 ? n : n.ownerDocument).createTextNode(r), r[He] = t, t.stateNode = r;
      }
      return de(t), null;
    case 13:
      if (Q(G), r = t.memoizedState, e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
        if (Y && je !== null && t.mode & 1 && !(t.flags & 128)) Du(), hn(), t.flags |= 98560, i = !1;
        else if (i = Tr(t), r !== null && r.dehydrated !== null) {
          if (e === null) {
            if (!i) throw Error(E(318));
            if (i = t.memoizedState, i = i !== null ? i.dehydrated : null, !i) throw Error(E(317));
            i[He] = t;
          } else hn(), !(t.flags & 128) && (t.memoizedState = null), t.flags |= 4;
          de(t), i = !1;
        } else Ae !== null && (ts(Ae), Ae = null), i = !0;
        if (!i) return t.flags & 65536 ? t : null;
      }
      return t.flags & 128 ? (t.lanes = n, t) : (r = r !== null, r !== (e !== null && e.memoizedState !== null) && r && (t.child.flags |= 8192, t.mode & 1 && (e === null || G.current & 1 ? re === 0 && (re = 3) : Ys())), t.updateQueue !== null && (t.flags |= 4), de(t), null);
    case 4:
      return vn(), Yi(e, t), e === null && bn(t.stateNode.containerInfo), de(t), null;
    case 10:
      return Ls(t.type._context), de(t), null;
    case 17:
      return Se(t.type) && nl(), de(t), null;
    case 19:
      if (Q(G), i = t.memoizedState, i === null) return de(t), null;
      if (r = (t.flags & 128) !== 0, s = i.rendering, s === null) if (r) Ln(i, !1);
      else {
        if (re !== 0 || e !== null && e.flags & 128) for (e = t.child; e !== null; ) {
          if (s = ul(e), s !== null) {
            for (t.flags |= 128, Ln(i, !1), r = s.updateQueue, r !== null && (t.updateQueue = r, t.flags |= 4), t.subtreeFlags = 0, r = n, n = t.child; n !== null; ) i = n, e = r, i.flags &= 14680066, s = i.alternate, s === null ? (i.childLanes = 0, i.lanes = e, i.child = null, i.subtreeFlags = 0, i.memoizedProps = null, i.memoizedState = null, i.updateQueue = null, i.dependencies = null, i.stateNode = null) : (i.childLanes = s.childLanes, i.lanes = s.lanes, i.child = s.child, i.subtreeFlags = 0, i.deletions = null, i.memoizedProps = s.memoizedProps, i.memoizedState = s.memoizedState, i.updateQueue = s.updateQueue, i.type = s.type, e = s.dependencies, i.dependencies = e === null ? null : { lanes: e.lanes, firstContext: e.firstContext }), n = n.sibling;
            return W(G, G.current & 1 | 2), t.child;
          }
          e = e.sibling;
        }
        i.tail !== null && b() > yn && (t.flags |= 128, r = !0, Ln(i, !1), t.lanes = 4194304);
      }
      else {
        if (!r) if (e = ul(s), e !== null) {
          if (t.flags |= 128, r = !0, n = e.updateQueue, n !== null && (t.updateQueue = n, t.flags |= 4), Ln(i, !0), i.tail === null && i.tailMode === "hidden" && !s.alternate && !Y) return de(t), null;
        } else 2 * b() - i.renderingStartTime > yn && n !== 1073741824 && (t.flags |= 128, r = !0, Ln(i, !1), t.lanes = 4194304);
        i.isBackwards ? (s.sibling = t.child, t.child = s) : (n = i.last, n !== null ? n.sibling = s : t.child = s, i.last = s);
      }
      return i.tail !== null ? (t = i.tail, i.rendering = t, i.tail = t.sibling, i.renderingStartTime = b(), t.sibling = null, n = G.current, W(G, r ? n & 1 | 2 : n & 1), t) : (de(t), null);
    case 22:
    case 23:
      return Ks(), r = t.memoizedState !== null, e !== null && e.memoizedState !== null !== r && (t.flags |= 8192), r && t.mode & 1 ? ke & 1073741824 && (de(t), t.subtreeFlags & 6 && (t.flags |= 8192)) : de(t), null;
    case 24:
      return null;
    case 25:
      return null;
  }
  throw Error(E(156, t.tag));
}
function rp(e, t) {
  switch (Cs(t), t.tag) {
    case 1:
      return Se(t.type) && nl(), e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 3:
      return vn(), Q(xe), Q(pe), Ds(), e = t.flags, e & 65536 && !(e & 128) ? (t.flags = e & -65537 | 128, t) : null;
    case 5:
      return Os(t), null;
    case 13:
      if (Q(G), e = t.memoizedState, e !== null && e.dehydrated !== null) {
        if (t.alternate === null) throw Error(E(340));
        hn();
      }
      return e = t.flags, e & 65536 ? (t.flags = e & -65537 | 128, t) : null;
    case 19:
      return Q(G), null;
    case 4:
      return vn(), null;
    case 10:
      return Ls(t.type._context), null;
    case 22:
    case 23:
      return Ks(), null;
    case 24:
      return null;
    default:
      return null;
  }
}
var Ir = !1, fe = !1, lp = typeof WeakSet == "function" ? WeakSet : Set, R = null;
function rn(e, t) {
  var n = e.ref;
  if (n !== null) if (typeof n == "function") try {
    n(null);
  } catch (r) {
    q(e, t, r);
  }
  else n.current = null;
}
function Gi(e, t, n) {
  try {
    n();
  } catch (r) {
    q(e, t, r);
  }
}
var no = !1;
function ip(e, t) {
  if (Ri = qr, e = Nu(), js(e)) {
    if ("selectionStart" in e) var n = { start: e.selectionStart, end: e.selectionEnd };
    else e: {
      n = (n = e.ownerDocument) && n.defaultView || window;
      var r = n.getSelection && n.getSelection();
      if (r && r.rangeCount !== 0) {
        n = r.anchorNode;
        var l = r.anchorOffset, i = r.focusNode;
        r = r.focusOffset;
        try {
          n.nodeType, i.nodeType;
        } catch {
          n = null;
          break e;
        }
        var s = 0, o = -1, u = -1, c = 0, p = 0, f = e, m = null;
        t: for (; ; ) {
          for (var w; f !== n || l !== 0 && f.nodeType !== 3 || (o = s + l), f !== i || r !== 0 && f.nodeType !== 3 || (u = s + r), f.nodeType === 3 && (s += f.nodeValue.length), (w = f.firstChild) !== null; )
            m = f, f = w;
          for (; ; ) {
            if (f === e) break t;
            if (m === n && ++c === l && (o = s), m === i && ++p === r && (u = s), (w = f.nextSibling) !== null) break;
            f = m, m = f.parentNode;
          }
          f = w;
        }
        n = o === -1 || u === -1 ? null : { start: o, end: u };
      } else n = null;
    }
    n = n || { start: 0, end: 0 };
  } else n = null;
  for (Ii = { focusedElem: e, selectionRange: n }, qr = !1, R = t; R !== null; ) if (t = R, e = t.child, (t.subtreeFlags & 1028) !== 0 && e !== null) e.return = t, R = e;
  else for (; R !== null; ) {
    t = R;
    try {
      var N = t.alternate;
      if (t.flags & 1024) switch (t.tag) {
        case 0:
        case 11:
        case 15:
          break;
        case 1:
          if (N !== null) {
            var k = N.memoizedProps, P = N.memoizedState, v = t.stateNode, d = v.getSnapshotBeforeUpdate(t.elementType === t.type ? k : Me(t.type, k), P);
            v.__reactInternalSnapshotBeforeUpdate = d;
          }
          break;
        case 3:
          var h = t.stateNode.containerInfo;
          h.nodeType === 1 ? h.textContent = "" : h.nodeType === 9 && h.documentElement && h.removeChild(h.documentElement);
          break;
        case 5:
        case 6:
        case 4:
        case 17:
          break;
        default:
          throw Error(E(163));
      }
    } catch (g) {
      q(t, t.return, g);
    }
    if (e = t.sibling, e !== null) {
      e.return = t.return, R = e;
      break;
    }
    R = t.return;
  }
  return N = no, no = !1, N;
}
function Vn(e, t, n) {
  var r = t.updateQueue;
  if (r = r !== null ? r.lastEffect : null, r !== null) {
    var l = r = r.next;
    do {
      if ((l.tag & e) === e) {
        var i = l.destroy;
        l.destroy = void 0, i !== void 0 && Gi(t, n, i);
      }
      l = l.next;
    } while (l !== r);
  }
}
function _l(e, t) {
  if (t = t.updateQueue, t = t !== null ? t.lastEffect : null, t !== null) {
    var n = t = t.next;
    do {
      if ((n.tag & e) === e) {
        var r = n.create;
        n.destroy = r();
      }
      n = n.next;
    } while (n !== t);
  }
}
function Xi(e) {
  var t = e.ref;
  if (t !== null) {
    var n = e.stateNode;
    switch (e.tag) {
      case 5:
        e = n;
        break;
      default:
        e = n;
    }
    typeof t == "function" ? t(e) : t.current = e;
  }
}
function yc(e) {
  var t = e.alternate;
  t !== null && (e.alternate = null, yc(t)), e.child = null, e.deletions = null, e.sibling = null, e.tag === 5 && (t = e.stateNode, t !== null && (delete t[He], delete t[tr], delete t[Di], delete t[$f], delete t[Vf])), e.stateNode = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
}
function wc(e) {
  return e.tag === 5 || e.tag === 3 || e.tag === 4;
}
function ro(e) {
  e: for (; ; ) {
    for (; e.sibling === null; ) {
      if (e.return === null || wc(e.return)) return null;
      e = e.return;
    }
    for (e.sibling.return = e.return, e = e.sibling; e.tag !== 5 && e.tag !== 6 && e.tag !== 18; ) {
      if (e.flags & 2 || e.child === null || e.tag === 4) continue e;
      e.child.return = e, e = e.child;
    }
    if (!(e.flags & 2)) return e.stateNode;
  }
}
function Ji(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.nodeType === 8 ? n.parentNode.insertBefore(e, t) : n.insertBefore(e, t) : (n.nodeType === 8 ? (t = n.parentNode, t.insertBefore(e, n)) : (t = n, t.appendChild(e)), n = n._reactRootContainer, n != null || t.onclick !== null || (t.onclick = tl));
  else if (r !== 4 && (e = e.child, e !== null)) for (Ji(e, t, n), e = e.sibling; e !== null; ) Ji(e, t, n), e = e.sibling;
}
function Zi(e, t, n) {
  var r = e.tag;
  if (r === 5 || r === 6) e = e.stateNode, t ? n.insertBefore(e, t) : n.appendChild(e);
  else if (r !== 4 && (e = e.child, e !== null)) for (Zi(e, t, n), e = e.sibling; e !== null; ) Zi(e, t, n), e = e.sibling;
}
var ae = null, Fe = !1;
function it(e, t, n) {
  for (n = n.child; n !== null; ) xc(e, t, n), n = n.sibling;
}
function xc(e, t, n) {
  if (Qe && typeof Qe.onCommitFiberUnmount == "function") try {
    Qe.onCommitFiberUnmount(wl, n);
  } catch {
  }
  switch (n.tag) {
    case 5:
      fe || rn(n, t);
    case 6:
      var r = ae, l = Fe;
      ae = null, it(e, t, n), ae = r, Fe = l, ae !== null && (Fe ? (e = ae, n = n.stateNode, e.nodeType === 8 ? e.parentNode.removeChild(n) : e.removeChild(n)) : ae.removeChild(n.stateNode));
      break;
    case 18:
      ae !== null && (Fe ? (e = ae, n = n.stateNode, e.nodeType === 8 ? ql(e.parentNode, n) : e.nodeType === 1 && ql(e, n), Jn(e)) : ql(ae, n.stateNode));
      break;
    case 4:
      r = ae, l = Fe, ae = n.stateNode.containerInfo, Fe = !0, it(e, t, n), ae = r, Fe = l;
      break;
    case 0:
    case 11:
    case 14:
    case 15:
      if (!fe && (r = n.updateQueue, r !== null && (r = r.lastEffect, r !== null))) {
        l = r = r.next;
        do {
          var i = l, s = i.destroy;
          i = i.tag, s !== void 0 && (i & 2 || i & 4) && Gi(n, t, s), l = l.next;
        } while (l !== r);
      }
      it(e, t, n);
      break;
    case 1:
      if (!fe && (rn(n, t), r = n.stateNode, typeof r.componentWillUnmount == "function")) try {
        r.props = n.memoizedProps, r.state = n.memoizedState, r.componentWillUnmount();
      } catch (o) {
        q(n, t, o);
      }
      it(e, t, n);
      break;
    case 21:
      it(e, t, n);
      break;
    case 22:
      n.mode & 1 ? (fe = (r = fe) || n.memoizedState !== null, it(e, t, n), fe = r) : it(e, t, n);
      break;
    default:
      it(e, t, n);
  }
}
function lo(e) {
  var t = e.updateQueue;
  if (t !== null) {
    e.updateQueue = null;
    var n = e.stateNode;
    n === null && (n = e.stateNode = new lp()), t.forEach(function(r) {
      var l = hp.bind(null, e, r);
      n.has(r) || (n.add(r), r.then(l, l));
    });
  }
}
function De(e, t) {
  var n = t.deletions;
  if (n !== null) for (var r = 0; r < n.length; r++) {
    var l = n[r];
    try {
      var i = e, s = t, o = s;
      e: for (; o !== null; ) {
        switch (o.tag) {
          case 5:
            ae = o.stateNode, Fe = !1;
            break e;
          case 3:
            ae = o.stateNode.containerInfo, Fe = !0;
            break e;
          case 4:
            ae = o.stateNode.containerInfo, Fe = !0;
            break e;
        }
        o = o.return;
      }
      if (ae === null) throw Error(E(160));
      xc(i, s, l), ae = null, Fe = !1;
      var u = l.alternate;
      u !== null && (u.return = null), l.return = null;
    } catch (c) {
      q(l, t, c);
    }
  }
  if (t.subtreeFlags & 12854) for (t = t.child; t !== null; ) Sc(t, e), t = t.sibling;
}
function Sc(e, t) {
  var n = e.alternate, r = e.flags;
  switch (e.tag) {
    case 0:
    case 11:
    case 14:
    case 15:
      if (De(t, e), Ve(e), r & 4) {
        try {
          Vn(3, e, e.return), _l(3, e);
        } catch (k) {
          q(e, e.return, k);
        }
        try {
          Vn(5, e, e.return);
        } catch (k) {
          q(e, e.return, k);
        }
      }
      break;
    case 1:
      De(t, e), Ve(e), r & 512 && n !== null && rn(n, n.return);
      break;
    case 5:
      if (De(t, e), Ve(e), r & 512 && n !== null && rn(n, n.return), e.flags & 32) {
        var l = e.stateNode;
        try {
          Kn(l, "");
        } catch (k) {
          q(e, e.return, k);
        }
      }
      if (r & 4 && (l = e.stateNode, l != null)) {
        var i = e.memoizedProps, s = n !== null ? n.memoizedProps : i, o = e.type, u = e.updateQueue;
        if (e.updateQueue = null, u !== null) try {
          o === "input" && i.type === "radio" && i.name != null && Wo(l, i), Si(o, s);
          var c = Si(o, i);
          for (s = 0; s < u.length; s += 2) {
            var p = u[s], f = u[s + 1];
            p === "style" ? Go(l, f) : p === "dangerouslySetInnerHTML" ? Ko(l, f) : p === "children" ? Kn(l, f) : ds(l, p, f, c);
          }
          switch (o) {
            case "input":
              vi(l, i);
              break;
            case "textarea":
              Ho(l, i);
              break;
            case "select":
              var m = l._wrapperState.wasMultiple;
              l._wrapperState.wasMultiple = !!i.multiple;
              var w = i.value;
              w != null ? sn(l, !!i.multiple, w, !1) : m !== !!i.multiple && (i.defaultValue != null ? sn(
                l,
                !!i.multiple,
                i.defaultValue,
                !0
              ) : sn(l, !!i.multiple, i.multiple ? [] : "", !1));
          }
          l[tr] = i;
        } catch (k) {
          q(e, e.return, k);
        }
      }
      break;
    case 6:
      if (De(t, e), Ve(e), r & 4) {
        if (e.stateNode === null) throw Error(E(162));
        l = e.stateNode, i = e.memoizedProps;
        try {
          l.nodeValue = i;
        } catch (k) {
          q(e, e.return, k);
        }
      }
      break;
    case 3:
      if (De(t, e), Ve(e), r & 4 && n !== null && n.memoizedState.isDehydrated) try {
        Jn(t.containerInfo);
      } catch (k) {
        q(e, e.return, k);
      }
      break;
    case 4:
      De(t, e), Ve(e);
      break;
    case 13:
      De(t, e), Ve(e), l = e.child, l.flags & 8192 && (i = l.memoizedState !== null, l.stateNode.isHidden = i, !i || l.alternate !== null && l.alternate.memoizedState !== null || (Hs = b())), r & 4 && lo(e);
      break;
    case 22:
      if (p = n !== null && n.memoizedState !== null, e.mode & 1 ? (fe = (c = fe) || p, De(t, e), fe = c) : De(t, e), Ve(e), r & 8192) {
        if (c = e.memoizedState !== null, (e.stateNode.isHidden = c) && !p && e.mode & 1) for (R = e, p = e.child; p !== null; ) {
          for (f = R = p; R !== null; ) {
            switch (m = R, w = m.child, m.tag) {
              case 0:
              case 11:
              case 14:
              case 15:
                Vn(4, m, m.return);
                break;
              case 1:
                rn(m, m.return);
                var N = m.stateNode;
                if (typeof N.componentWillUnmount == "function") {
                  r = m, n = m.return;
                  try {
                    t = r, N.props = t.memoizedProps, N.state = t.memoizedState, N.componentWillUnmount();
                  } catch (k) {
                    q(r, n, k);
                  }
                }
                break;
              case 5:
                rn(m, m.return);
                break;
              case 22:
                if (m.memoizedState !== null) {
                  so(f);
                  continue;
                }
            }
            w !== null ? (w.return = m, R = w) : so(f);
          }
          p = p.sibling;
        }
        e: for (p = null, f = e; ; ) {
          if (f.tag === 5) {
            if (p === null) {
              p = f;
              try {
                l = f.stateNode, c ? (i = l.style, typeof i.setProperty == "function" ? i.setProperty("display", "none", "important") : i.display = "none") : (o = f.stateNode, u = f.memoizedProps.style, s = u != null && u.hasOwnProperty("display") ? u.display : null, o.style.display = Yo("display", s));
              } catch (k) {
                q(e, e.return, k);
              }
            }
          } else if (f.tag === 6) {
            if (p === null) try {
              f.stateNode.nodeValue = c ? "" : f.memoizedProps;
            } catch (k) {
              q(e, e.return, k);
            }
          } else if ((f.tag !== 22 && f.tag !== 23 || f.memoizedState === null || f === e) && f.child !== null) {
            f.child.return = f, f = f.child;
            continue;
          }
          if (f === e) break e;
          for (; f.sibling === null; ) {
            if (f.return === null || f.return === e) break e;
            p === f && (p = null), f = f.return;
          }
          p === f && (p = null), f.sibling.return = f.return, f = f.sibling;
        }
      }
      break;
    case 19:
      De(t, e), Ve(e), r & 4 && lo(e);
      break;
    case 21:
      break;
    default:
      De(
        t,
        e
      ), Ve(e);
  }
}
function Ve(e) {
  var t = e.flags;
  if (t & 2) {
    try {
      e: {
        for (var n = e.return; n !== null; ) {
          if (wc(n)) {
            var r = n;
            break e;
          }
          n = n.return;
        }
        throw Error(E(160));
      }
      switch (r.tag) {
        case 5:
          var l = r.stateNode;
          r.flags & 32 && (Kn(l, ""), r.flags &= -33);
          var i = ro(e);
          Zi(e, i, l);
          break;
        case 3:
        case 4:
          var s = r.stateNode.containerInfo, o = ro(e);
          Ji(e, o, s);
          break;
        default:
          throw Error(E(161));
      }
    } catch (u) {
      q(e, e.return, u);
    }
    e.flags &= -3;
  }
  t & 4096 && (e.flags &= -4097);
}
function sp(e, t, n) {
  R = e, Nc(e);
}
function Nc(e, t, n) {
  for (var r = (e.mode & 1) !== 0; R !== null; ) {
    var l = R, i = l.child;
    if (l.tag === 22 && r) {
      var s = l.memoizedState !== null || Ir;
      if (!s) {
        var o = l.alternate, u = o !== null && o.memoizedState !== null || fe;
        o = Ir;
        var c = fe;
        if (Ir = s, (fe = u) && !c) for (R = l; R !== null; ) s = R, u = s.child, s.tag === 22 && s.memoizedState !== null ? ao(l) : u !== null ? (u.return = s, R = u) : ao(l);
        for (; i !== null; ) R = i, Nc(i), i = i.sibling;
        R = l, Ir = o, fe = c;
      }
      io(e);
    } else l.subtreeFlags & 8772 && i !== null ? (i.return = l, R = i) : io(e);
  }
}
function io(e) {
  for (; R !== null; ) {
    var t = R;
    if (t.flags & 8772) {
      var n = t.alternate;
      try {
        if (t.flags & 8772) switch (t.tag) {
          case 0:
          case 11:
          case 15:
            fe || _l(5, t);
            break;
          case 1:
            var r = t.stateNode;
            if (t.flags & 4 && !fe) if (n === null) r.componentDidMount();
            else {
              var l = t.elementType === t.type ? n.memoizedProps : Me(t.type, n.memoizedProps);
              r.componentDidUpdate(l, n.memoizedState, r.__reactInternalSnapshotBeforeUpdate);
            }
            var i = t.updateQueue;
            i !== null && Wa(t, i, r);
            break;
          case 3:
            var s = t.updateQueue;
            if (s !== null) {
              if (n = null, t.child !== null) switch (t.child.tag) {
                case 5:
                  n = t.child.stateNode;
                  break;
                case 1:
                  n = t.child.stateNode;
              }
              Wa(t, s, n);
            }
            break;
          case 5:
            var o = t.stateNode;
            if (n === null && t.flags & 4) {
              n = o;
              var u = t.memoizedProps;
              switch (t.type) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  u.autoFocus && n.focus();
                  break;
                case "img":
                  u.src && (n.src = u.src);
              }
            }
            break;
          case 6:
            break;
          case 4:
            break;
          case 12:
            break;
          case 13:
            if (t.memoizedState === null) {
              var c = t.alternate;
              if (c !== null) {
                var p = c.memoizedState;
                if (p !== null) {
                  var f = p.dehydrated;
                  f !== null && Jn(f);
                }
              }
            }
            break;
          case 19:
          case 17:
          case 21:
          case 22:
          case 23:
          case 25:
            break;
          default:
            throw Error(E(163));
        }
        fe || t.flags & 512 && Xi(t);
      } catch (m) {
        q(t, t.return, m);
      }
    }
    if (t === e) {
      R = null;
      break;
    }
    if (n = t.sibling, n !== null) {
      n.return = t.return, R = n;
      break;
    }
    R = t.return;
  }
}
function so(e) {
  for (; R !== null; ) {
    var t = R;
    if (t === e) {
      R = null;
      break;
    }
    var n = t.sibling;
    if (n !== null) {
      n.return = t.return, R = n;
      break;
    }
    R = t.return;
  }
}
function ao(e) {
  for (; R !== null; ) {
    var t = R;
    try {
      switch (t.tag) {
        case 0:
        case 11:
        case 15:
          var n = t.return;
          try {
            _l(4, t);
          } catch (u) {
            q(t, n, u);
          }
          break;
        case 1:
          var r = t.stateNode;
          if (typeof r.componentDidMount == "function") {
            var l = t.return;
            try {
              r.componentDidMount();
            } catch (u) {
              q(t, l, u);
            }
          }
          var i = t.return;
          try {
            Xi(t);
          } catch (u) {
            q(t, i, u);
          }
          break;
        case 5:
          var s = t.return;
          try {
            Xi(t);
          } catch (u) {
            q(t, s, u);
          }
      }
    } catch (u) {
      q(t, t.return, u);
    }
    if (t === e) {
      R = null;
      break;
    }
    var o = t.sibling;
    if (o !== null) {
      o.return = t.return, R = o;
      break;
    }
    R = t.return;
  }
}
var ap = Math.ceil, fl = rt.ReactCurrentDispatcher, Vs = rt.ReactCurrentOwner, Ie = rt.ReactCurrentBatchConfig, A = 0, se = null, te = null, oe = 0, ke = 0, ln = Ct(0), re = 0, ar = null, $t = 0, Pl = 0, Ws = 0, Wn = null, ye = null, Hs = 0, yn = 1 / 0, Ge = null, pl = !1, qi = null, wt = null, zr = !1, dt = null, hl = 0, Hn = 0, bi = null, Hr = -1, Qr = 0;
function me() {
  return A & 6 ? b() : Hr !== -1 ? Hr : Hr = b();
}
function xt(e) {
  return e.mode & 1 ? A & 2 && oe !== 0 ? oe & -oe : Hf.transition !== null ? (Qr === 0 && (Qr = su()), Qr) : (e = $, e !== 0 || (e = window.event, e = e === void 0 ? 16 : pu(e.type)), e) : 1;
}
function Be(e, t, n, r) {
  if (50 < Hn) throw Hn = 0, bi = null, Error(E(185));
  dr(e, n, r), (!(A & 2) || e !== se) && (e === se && (!(A & 2) && (Pl |= n), re === 4 && ut(e, oe)), Ne(e, r), n === 1 && A === 0 && !(t.mode & 1) && (yn = b() + 500, jl && _t()));
}
function Ne(e, t) {
  var n = e.callbackNode;
  Wd(e, t);
  var r = Zr(e, e === se ? oe : 0);
  if (r === 0) n !== null && va(n), e.callbackNode = null, e.callbackPriority = 0;
  else if (t = r & -r, e.callbackPriority !== t) {
    if (n != null && va(n), t === 1) e.tag === 0 ? Wf(oo.bind(null, e)) : Iu(oo.bind(null, e)), Uf(function() {
      !(A & 6) && _t();
    }), n = null;
    else {
      switch (au(r)) {
        case 1:
          n = vs;
          break;
        case 4:
          n = lu;
          break;
        case 16:
          n = Jr;
          break;
        case 536870912:
          n = iu;
          break;
        default:
          n = Jr;
      }
      n = Lc(n, kc.bind(null, e));
    }
    e.callbackPriority = t, e.callbackNode = n;
  }
}
function kc(e, t) {
  if (Hr = -1, Qr = 0, A & 6) throw Error(E(327));
  var n = e.callbackNode;
  if (dn() && e.callbackNode !== n) return null;
  var r = Zr(e, e === se ? oe : 0);
  if (r === 0) return null;
  if (r & 30 || r & e.expiredLanes || t) t = ml(e, r);
  else {
    t = r;
    var l = A;
    A |= 2;
    var i = Ec();
    (se !== e || oe !== t) && (Ge = null, yn = b() + 500, Mt(e, t));
    do
      try {
        cp();
        break;
      } catch (o) {
        jc(e, o);
      }
    while (!0);
    Ts(), fl.current = i, A = l, te !== null ? t = 0 : (se = null, oe = 0, t = re);
  }
  if (t !== 0) {
    if (t === 2 && (l = Ci(e), l !== 0 && (r = l, t = es(e, l))), t === 1) throw n = ar, Mt(e, 0), ut(e, r), Ne(e, b()), n;
    if (t === 6) ut(e, r);
    else {
      if (l = e.current.alternate, !(r & 30) && !op(l) && (t = ml(e, r), t === 2 && (i = Ci(e), i !== 0 && (r = i, t = es(e, i))), t === 1)) throw n = ar, Mt(e, 0), ut(e, r), Ne(e, b()), n;
      switch (e.finishedWork = l, e.finishedLanes = r, t) {
        case 0:
        case 1:
          throw Error(E(345));
        case 2:
          It(e, ye, Ge);
          break;
        case 3:
          if (ut(e, r), (r & 130023424) === r && (t = Hs + 500 - b(), 10 < t)) {
            if (Zr(e, 0) !== 0) break;
            if (l = e.suspendedLanes, (l & r) !== r) {
              me(), e.pingedLanes |= e.suspendedLanes & l;
              break;
            }
            e.timeoutHandle = Oi(It.bind(null, e, ye, Ge), t);
            break;
          }
          It(e, ye, Ge);
          break;
        case 4:
          if (ut(e, r), (r & 4194240) === r) break;
          for (t = e.eventTimes, l = -1; 0 < r; ) {
            var s = 31 - Ue(r);
            i = 1 << s, s = t[s], s > l && (l = s), r &= ~i;
          }
          if (r = l, r = b() - r, r = (120 > r ? 120 : 480 > r ? 480 : 1080 > r ? 1080 : 1920 > r ? 1920 : 3e3 > r ? 3e3 : 4320 > r ? 4320 : 1960 * ap(r / 1960)) - r, 10 < r) {
            e.timeoutHandle = Oi(It.bind(null, e, ye, Ge), r);
            break;
          }
          It(e, ye, Ge);
          break;
        case 5:
          It(e, ye, Ge);
          break;
        default:
          throw Error(E(329));
      }
    }
  }
  return Ne(e, b()), e.callbackNode === n ? kc.bind(null, e) : null;
}
function es(e, t) {
  var n = Wn;
  return e.current.memoizedState.isDehydrated && (Mt(e, t).flags |= 256), e = ml(e, t), e !== 2 && (t = ye, ye = n, t !== null && ts(t)), e;
}
function ts(e) {
  ye === null ? ye = e : ye.push.apply(ye, e);
}
function op(e) {
  for (var t = e; ; ) {
    if (t.flags & 16384) {
      var n = t.updateQueue;
      if (n !== null && (n = n.stores, n !== null)) for (var r = 0; r < n.length; r++) {
        var l = n[r], i = l.getSnapshot;
        l = l.value;
        try {
          if (!$e(i(), l)) return !1;
        } catch {
          return !1;
        }
      }
    }
    if (n = t.child, t.subtreeFlags & 16384 && n !== null) n.return = t, t = n;
    else {
      if (t === e) break;
      for (; t.sibling === null; ) {
        if (t.return === null || t.return === e) return !0;
        t = t.return;
      }
      t.sibling.return = t.return, t = t.sibling;
    }
  }
  return !0;
}
function ut(e, t) {
  for (t &= ~Ws, t &= ~Pl, e.suspendedLanes |= t, e.pingedLanes &= ~t, e = e.expirationTimes; 0 < t; ) {
    var n = 31 - Ue(t), r = 1 << n;
    e[n] = -1, t &= ~r;
  }
}
function oo(e) {
  if (A & 6) throw Error(E(327));
  dn();
  var t = Zr(e, 0);
  if (!(t & 1)) return Ne(e, b()), null;
  var n = ml(e, t);
  if (e.tag !== 0 && n === 2) {
    var r = Ci(e);
    r !== 0 && (t = r, n = es(e, r));
  }
  if (n === 1) throw n = ar, Mt(e, 0), ut(e, t), Ne(e, b()), n;
  if (n === 6) throw Error(E(345));
  return e.finishedWork = e.current.alternate, e.finishedLanes = t, It(e, ye, Ge), Ne(e, b()), null;
}
function Qs(e, t) {
  var n = A;
  A |= 1;
  try {
    return e(t);
  } finally {
    A = n, A === 0 && (yn = b() + 500, jl && _t());
  }
}
function Vt(e) {
  dt !== null && dt.tag === 0 && !(A & 6) && dn();
  var t = A;
  A |= 1;
  var n = Ie.transition, r = $;
  try {
    if (Ie.transition = null, $ = 1, e) return e();
  } finally {
    $ = r, Ie.transition = n, A = t, !(A & 6) && _t();
  }
}
function Ks() {
  ke = ln.current, Q(ln);
}
function Mt(e, t) {
  e.finishedWork = null, e.finishedLanes = 0;
  var n = e.timeoutHandle;
  if (n !== -1 && (e.timeoutHandle = -1, Af(n)), te !== null) for (n = te.return; n !== null; ) {
    var r = n;
    switch (Cs(r), r.tag) {
      case 1:
        r = r.type.childContextTypes, r != null && nl();
        break;
      case 3:
        vn(), Q(xe), Q(pe), Ds();
        break;
      case 5:
        Os(r);
        break;
      case 4:
        vn();
        break;
      case 13:
        Q(G);
        break;
      case 19:
        Q(G);
        break;
      case 10:
        Ls(r.type._context);
        break;
      case 22:
      case 23:
        Ks();
    }
    n = n.return;
  }
  if (se = e, te = e = St(e.current, null), oe = ke = t, re = 0, ar = null, Ws = Pl = $t = 0, ye = Wn = null, Ot !== null) {
    for (t = 0; t < Ot.length; t++) if (n = Ot[t], r = n.interleaved, r !== null) {
      n.interleaved = null;
      var l = r.next, i = n.pending;
      if (i !== null) {
        var s = i.next;
        i.next = l, r.next = s;
      }
      n.pending = r;
    }
    Ot = null;
  }
  return e;
}
function jc(e, t) {
  do {
    var n = te;
    try {
      if (Ts(), $r.current = dl, cl) {
        for (var r = X.memoizedState; r !== null; ) {
          var l = r.queue;
          l !== null && (l.pending = null), r = r.next;
        }
        cl = !1;
      }
      if (Bt = 0, ie = ne = X = null, $n = !1, lr = 0, Vs.current = null, n === null || n.return === null) {
        re = 1, ar = t, te = null;
        break;
      }
      e: {
        var i = e, s = n.return, o = n, u = t;
        if (t = oe, o.flags |= 32768, u !== null && typeof u == "object" && typeof u.then == "function") {
          var c = u, p = o, f = p.tag;
          if (!(p.mode & 1) && (f === 0 || f === 11 || f === 15)) {
            var m = p.alternate;
            m ? (p.updateQueue = m.updateQueue, p.memoizedState = m.memoizedState, p.lanes = m.lanes) : (p.updateQueue = null, p.memoizedState = null);
          }
          var w = Xa(s);
          if (w !== null) {
            w.flags &= -257, Ja(w, s, o, i, t), w.mode & 1 && Ga(i, c, t), t = w, u = c;
            var N = t.updateQueue;
            if (N === null) {
              var k = /* @__PURE__ */ new Set();
              k.add(u), t.updateQueue = k;
            } else N.add(u);
            break e;
          } else {
            if (!(t & 1)) {
              Ga(i, c, t), Ys();
              break e;
            }
            u = Error(E(426));
          }
        } else if (Y && o.mode & 1) {
          var P = Xa(s);
          if (P !== null) {
            !(P.flags & 65536) && (P.flags |= 256), Ja(P, s, o, i, t), _s(gn(u, o));
            break e;
          }
        }
        i = u = gn(u, o), re !== 4 && (re = 2), Wn === null ? Wn = [i] : Wn.push(i), i = s;
        do {
          switch (i.tag) {
            case 3:
              i.flags |= 65536, t &= -t, i.lanes |= t;
              var v = ac(i, u, t);
              Va(i, v);
              break e;
            case 1:
              o = u;
              var d = i.type, h = i.stateNode;
              if (!(i.flags & 128) && (typeof d.getDerivedStateFromError == "function" || h !== null && typeof h.componentDidCatch == "function" && (wt === null || !wt.has(h)))) {
                i.flags |= 65536, t &= -t, i.lanes |= t;
                var g = oc(i, o, t);
                Va(i, g);
                break e;
              }
          }
          i = i.return;
        } while (i !== null);
      }
      _c(n);
    } catch (x) {
      t = x, te === n && n !== null && (te = n = n.return);
      continue;
    }
    break;
  } while (!0);
}
function Ec() {
  var e = fl.current;
  return fl.current = dl, e === null ? dl : e;
}
function Ys() {
  (re === 0 || re === 3 || re === 2) && (re = 4), se === null || !($t & 268435455) && !(Pl & 268435455) || ut(se, oe);
}
function ml(e, t) {
  var n = A;
  A |= 2;
  var r = Ec();
  (se !== e || oe !== t) && (Ge = null, Mt(e, t));
  do
    try {
      up();
      break;
    } catch (l) {
      jc(e, l);
    }
  while (!0);
  if (Ts(), A = n, fl.current = r, te !== null) throw Error(E(261));
  return se = null, oe = 0, re;
}
function up() {
  for (; te !== null; ) Cc(te);
}
function cp() {
  for (; te !== null && !Od(); ) Cc(te);
}
function Cc(e) {
  var t = Tc(e.alternate, e, ke);
  e.memoizedProps = e.pendingProps, t === null ? _c(e) : te = t, Vs.current = null;
}
function _c(e) {
  var t = e;
  do {
    var n = t.alternate;
    if (e = t.return, t.flags & 32768) {
      if (n = rp(n, t), n !== null) {
        n.flags &= 32767, te = n;
        return;
      }
      if (e !== null) e.flags |= 32768, e.subtreeFlags = 0, e.deletions = null;
      else {
        re = 6, te = null;
        return;
      }
    } else if (n = np(n, t, ke), n !== null) {
      te = n;
      return;
    }
    if (t = t.sibling, t !== null) {
      te = t;
      return;
    }
    te = t = e;
  } while (t !== null);
  re === 0 && (re = 5);
}
function It(e, t, n) {
  var r = $, l = Ie.transition;
  try {
    Ie.transition = null, $ = 1, dp(e, t, n, r);
  } finally {
    Ie.transition = l, $ = r;
  }
  return null;
}
function dp(e, t, n, r) {
  do
    dn();
  while (dt !== null);
  if (A & 6) throw Error(E(327));
  n = e.finishedWork;
  var l = e.finishedLanes;
  if (n === null) return null;
  if (e.finishedWork = null, e.finishedLanes = 0, n === e.current) throw Error(E(177));
  e.callbackNode = null, e.callbackPriority = 0;
  var i = n.lanes | n.childLanes;
  if (Hd(e, i), e === se && (te = se = null, oe = 0), !(n.subtreeFlags & 2064) && !(n.flags & 2064) || zr || (zr = !0, Lc(Jr, function() {
    return dn(), null;
  })), i = (n.flags & 15990) !== 0, n.subtreeFlags & 15990 || i) {
    i = Ie.transition, Ie.transition = null;
    var s = $;
    $ = 1;
    var o = A;
    A |= 4, Vs.current = null, ip(e, n), Sc(n, e), Rf(Ii), qr = !!Ri, Ii = Ri = null, e.current = n, sp(n), Dd(), A = o, $ = s, Ie.transition = i;
  } else e.current = n;
  if (zr && (zr = !1, dt = e, hl = l), i = e.pendingLanes, i === 0 && (wt = null), Ad(n.stateNode), Ne(e, b()), t !== null) for (r = e.onRecoverableError, n = 0; n < t.length; n++) l = t[n], r(l.value, { componentStack: l.stack, digest: l.digest });
  if (pl) throw pl = !1, e = qi, qi = null, e;
  return hl & 1 && e.tag !== 0 && dn(), i = e.pendingLanes, i & 1 ? e === bi ? Hn++ : (Hn = 0, bi = e) : Hn = 0, _t(), null;
}
function dn() {
  if (dt !== null) {
    var e = au(hl), t = Ie.transition, n = $;
    try {
      if (Ie.transition = null, $ = 16 > e ? 16 : e, dt === null) var r = !1;
      else {
        if (e = dt, dt = null, hl = 0, A & 6) throw Error(E(331));
        var l = A;
        for (A |= 4, R = e.current; R !== null; ) {
          var i = R, s = i.child;
          if (R.flags & 16) {
            var o = i.deletions;
            if (o !== null) {
              for (var u = 0; u < o.length; u++) {
                var c = o[u];
                for (R = c; R !== null; ) {
                  var p = R;
                  switch (p.tag) {
                    case 0:
                    case 11:
                    case 15:
                      Vn(8, p, i);
                  }
                  var f = p.child;
                  if (f !== null) f.return = p, R = f;
                  else for (; R !== null; ) {
                    p = R;
                    var m = p.sibling, w = p.return;
                    if (yc(p), p === c) {
                      R = null;
                      break;
                    }
                    if (m !== null) {
                      m.return = w, R = m;
                      break;
                    }
                    R = w;
                  }
                }
              }
              var N = i.alternate;
              if (N !== null) {
                var k = N.child;
                if (k !== null) {
                  N.child = null;
                  do {
                    var P = k.sibling;
                    k.sibling = null, k = P;
                  } while (k !== null);
                }
              }
              R = i;
            }
          }
          if (i.subtreeFlags & 2064 && s !== null) s.return = i, R = s;
          else e: for (; R !== null; ) {
            if (i = R, i.flags & 2048) switch (i.tag) {
              case 0:
              case 11:
              case 15:
                Vn(9, i, i.return);
            }
            var v = i.sibling;
            if (v !== null) {
              v.return = i.return, R = v;
              break e;
            }
            R = i.return;
          }
        }
        var d = e.current;
        for (R = d; R !== null; ) {
          s = R;
          var h = s.child;
          if (s.subtreeFlags & 2064 && h !== null) h.return = s, R = h;
          else e: for (s = d; R !== null; ) {
            if (o = R, o.flags & 2048) try {
              switch (o.tag) {
                case 0:
                case 11:
                case 15:
                  _l(9, o);
              }
            } catch (x) {
              q(o, o.return, x);
            }
            if (o === s) {
              R = null;
              break e;
            }
            var g = o.sibling;
            if (g !== null) {
              g.return = o.return, R = g;
              break e;
            }
            R = o.return;
          }
        }
        if (A = l, _t(), Qe && typeof Qe.onPostCommitFiberRoot == "function") try {
          Qe.onPostCommitFiberRoot(wl, e);
        } catch {
        }
        r = !0;
      }
      return r;
    } finally {
      $ = n, Ie.transition = t;
    }
  }
  return !1;
}
function uo(e, t, n) {
  t = gn(n, t), t = ac(e, t, 1), e = yt(e, t, 1), t = me(), e !== null && (dr(e, 1, t), Ne(e, t));
}
function q(e, t, n) {
  if (e.tag === 3) uo(e, e, n);
  else for (; t !== null; ) {
    if (t.tag === 3) {
      uo(t, e, n);
      break;
    } else if (t.tag === 1) {
      var r = t.stateNode;
      if (typeof t.type.getDerivedStateFromError == "function" || typeof r.componentDidCatch == "function" && (wt === null || !wt.has(r))) {
        e = gn(n, e), e = oc(t, e, 1), t = yt(t, e, 1), e = me(), t !== null && (dr(t, 1, e), Ne(t, e));
        break;
      }
    }
    t = t.return;
  }
}
function fp(e, t, n) {
  var r = e.pingCache;
  r !== null && r.delete(t), t = me(), e.pingedLanes |= e.suspendedLanes & n, se === e && (oe & n) === n && (re === 4 || re === 3 && (oe & 130023424) === oe && 500 > b() - Hs ? Mt(e, 0) : Ws |= n), Ne(e, t);
}
function Pc(e, t) {
  t === 0 && (e.mode & 1 ? (t = kr, kr <<= 1, !(kr & 130023424) && (kr = 4194304)) : t = 1);
  var n = me();
  e = tt(e, t), e !== null && (dr(e, t, n), Ne(e, n));
}
function pp(e) {
  var t = e.memoizedState, n = 0;
  t !== null && (n = t.retryLane), Pc(e, n);
}
function hp(e, t) {
  var n = 0;
  switch (e.tag) {
    case 13:
      var r = e.stateNode, l = e.memoizedState;
      l !== null && (n = l.retryLane);
      break;
    case 19:
      r = e.stateNode;
      break;
    default:
      throw Error(E(314));
  }
  r !== null && r.delete(t), Pc(e, n);
}
var Tc;
Tc = function(e, t, n) {
  if (e !== null) if (e.memoizedProps !== t.pendingProps || xe.current) we = !0;
  else {
    if (!(e.lanes & n) && !(t.flags & 128)) return we = !1, tp(e, t, n);
    we = !!(e.flags & 131072);
  }
  else we = !1, Y && t.flags & 1048576 && zu(t, il, t.index);
  switch (t.lanes = 0, t.tag) {
    case 2:
      var r = t.type;
      Wr(e, t), e = t.pendingProps;
      var l = pn(t, pe.current);
      cn(t, n), l = Fs(null, t, r, e, l, n);
      var i = As();
      return t.flags |= 1, typeof l == "object" && l !== null && typeof l.render == "function" && l.$$typeof === void 0 ? (t.tag = 1, t.memoizedState = null, t.updateQueue = null, Se(r) ? (i = !0, rl(t)) : i = !1, t.memoizedState = l.state !== null && l.state !== void 0 ? l.state : null, Is(t), l.updater = Cl, t.stateNode = l, l._reactInternals = t, $i(t, r, e, n), t = Hi(null, t, r, !0, i, n)) : (t.tag = 0, Y && i && Es(t), he(null, t, l, n), t = t.child), t;
    case 16:
      r = t.elementType;
      e: {
        switch (Wr(e, t), e = t.pendingProps, l = r._init, r = l(r._payload), t.type = r, l = t.tag = vp(r), e = Me(r, e), l) {
          case 0:
            t = Wi(null, t, r, e, n);
            break e;
          case 1:
            t = ba(null, t, r, e, n);
            break e;
          case 11:
            t = Za(null, t, r, e, n);
            break e;
          case 14:
            t = qa(null, t, r, Me(r.type, e), n);
            break e;
        }
        throw Error(E(
          306,
          r,
          ""
        ));
      }
      return t;
    case 0:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : Me(r, l), Wi(e, t, r, l, n);
    case 1:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : Me(r, l), ba(e, t, r, l, n);
    case 3:
      e: {
        if (fc(t), e === null) throw Error(E(387));
        r = t.pendingProps, i = t.memoizedState, l = i.element, Uu(e, t), ol(t, r, null, n);
        var s = t.memoizedState;
        if (r = s.element, i.isDehydrated) if (i = { element: r, isDehydrated: !1, cache: s.cache, pendingSuspenseBoundaries: s.pendingSuspenseBoundaries, transitions: s.transitions }, t.updateQueue.baseState = i, t.memoizedState = i, t.flags & 256) {
          l = gn(Error(E(423)), t), t = eo(e, t, r, n, l);
          break e;
        } else if (r !== l) {
          l = gn(Error(E(424)), t), t = eo(e, t, r, n, l);
          break e;
        } else for (je = gt(t.stateNode.containerInfo.firstChild), Ee = t, Y = !0, Ae = null, n = Fu(t, null, r, n), t.child = n; n; ) n.flags = n.flags & -3 | 4096, n = n.sibling;
        else {
          if (hn(), r === l) {
            t = nt(e, t, n);
            break e;
          }
          he(e, t, r, n);
        }
        t = t.child;
      }
      return t;
    case 5:
      return Bu(t), e === null && Ai(t), r = t.type, l = t.pendingProps, i = e !== null ? e.memoizedProps : null, s = l.children, zi(r, l) ? s = null : i !== null && zi(r, i) && (t.flags |= 32), dc(e, t), he(e, t, s, n), t.child;
    case 6:
      return e === null && Ai(t), null;
    case 13:
      return pc(e, t, n);
    case 4:
      return zs(t, t.stateNode.containerInfo), r = t.pendingProps, e === null ? t.child = mn(t, null, r, n) : he(e, t, r, n), t.child;
    case 11:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : Me(r, l), Za(e, t, r, l, n);
    case 7:
      return he(e, t, t.pendingProps, n), t.child;
    case 8:
      return he(e, t, t.pendingProps.children, n), t.child;
    case 12:
      return he(e, t, t.pendingProps.children, n), t.child;
    case 10:
      e: {
        if (r = t.type._context, l = t.pendingProps, i = t.memoizedProps, s = l.value, W(sl, r._currentValue), r._currentValue = s, i !== null) if ($e(i.value, s)) {
          if (i.children === l.children && !xe.current) {
            t = nt(e, t, n);
            break e;
          }
        } else for (i = t.child, i !== null && (i.return = t); i !== null; ) {
          var o = i.dependencies;
          if (o !== null) {
            s = i.child;
            for (var u = o.firstContext; u !== null; ) {
              if (u.context === r) {
                if (i.tag === 1) {
                  u = qe(-1, n & -n), u.tag = 2;
                  var c = i.updateQueue;
                  if (c !== null) {
                    c = c.shared;
                    var p = c.pending;
                    p === null ? u.next = u : (u.next = p.next, p.next = u), c.pending = u;
                  }
                }
                i.lanes |= n, u = i.alternate, u !== null && (u.lanes |= n), Ui(
                  i.return,
                  n,
                  t
                ), o.lanes |= n;
                break;
              }
              u = u.next;
            }
          } else if (i.tag === 10) s = i.type === t.type ? null : i.child;
          else if (i.tag === 18) {
            if (s = i.return, s === null) throw Error(E(341));
            s.lanes |= n, o = s.alternate, o !== null && (o.lanes |= n), Ui(s, n, t), s = i.sibling;
          } else s = i.child;
          if (s !== null) s.return = i;
          else for (s = i; s !== null; ) {
            if (s === t) {
              s = null;
              break;
            }
            if (i = s.sibling, i !== null) {
              i.return = s.return, s = i;
              break;
            }
            s = s.return;
          }
          i = s;
        }
        he(e, t, l.children, n), t = t.child;
      }
      return t;
    case 9:
      return l = t.type, r = t.pendingProps.children, cn(t, n), l = ze(l), r = r(l), t.flags |= 1, he(e, t, r, n), t.child;
    case 14:
      return r = t.type, l = Me(r, t.pendingProps), l = Me(r.type, l), qa(e, t, r, l, n);
    case 15:
      return uc(e, t, t.type, t.pendingProps, n);
    case 17:
      return r = t.type, l = t.pendingProps, l = t.elementType === r ? l : Me(r, l), Wr(e, t), t.tag = 1, Se(r) ? (e = !0, rl(t)) : e = !1, cn(t, n), sc(t, r, l), $i(t, r, l, n), Hi(null, t, r, !0, e, n);
    case 19:
      return hc(e, t, n);
    case 22:
      return cc(e, t, n);
  }
  throw Error(E(156, t.tag));
};
function Lc(e, t) {
  return ru(e, t);
}
function mp(e, t, n, r) {
  this.tag = e, this.key = n, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = t, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = r, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
}
function Re(e, t, n, r) {
  return new mp(e, t, n, r);
}
function Gs(e) {
  return e = e.prototype, !(!e || !e.isReactComponent);
}
function vp(e) {
  if (typeof e == "function") return Gs(e) ? 1 : 0;
  if (e != null) {
    if (e = e.$$typeof, e === ps) return 11;
    if (e === hs) return 14;
  }
  return 2;
}
function St(e, t) {
  var n = e.alternate;
  return n === null ? (n = Re(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = 0, n.subtreeFlags = 0, n.deletions = null), n.flags = e.flags & 14680064, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue, t = e.dependencies, n.dependencies = t === null ? null : { lanes: t.lanes, firstContext: t.firstContext }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n;
}
function Kr(e, t, n, r, l, i) {
  var s = 2;
  if (r = e, typeof e == "function") Gs(e) && (s = 1);
  else if (typeof e == "string") s = 5;
  else e: switch (e) {
    case Gt:
      return Ft(n.children, l, i, t);
    case fs:
      s = 8, l |= 8;
      break;
    case di:
      return e = Re(12, n, t, l | 2), e.elementType = di, e.lanes = i, e;
    case fi:
      return e = Re(13, n, t, l), e.elementType = fi, e.lanes = i, e;
    case pi:
      return e = Re(19, n, t, l), e.elementType = pi, e.lanes = i, e;
    case Bo:
      return Tl(n, l, i, t);
    default:
      if (typeof e == "object" && e !== null) switch (e.$$typeof) {
        case Ao:
          s = 10;
          break e;
        case Uo:
          s = 9;
          break e;
        case ps:
          s = 11;
          break e;
        case hs:
          s = 14;
          break e;
        case st:
          s = 16, r = null;
          break e;
      }
      throw Error(E(130, e == null ? e : typeof e, ""));
  }
  return t = Re(s, n, t, l), t.elementType = e, t.type = r, t.lanes = i, t;
}
function Ft(e, t, n, r) {
  return e = Re(7, e, r, t), e.lanes = n, e;
}
function Tl(e, t, n, r) {
  return e = Re(22, e, r, t), e.elementType = Bo, e.lanes = n, e.stateNode = { isHidden: !1 }, e;
}
function si(e, t, n) {
  return e = Re(6, e, null, t), e.lanes = n, e;
}
function ai(e, t, n) {
  return t = Re(4, e.children !== null ? e.children : [], e.key, t), t.lanes = n, t.stateNode = { containerInfo: e.containerInfo, pendingChildren: null, implementation: e.implementation }, t;
}
function gp(e, t, n, r, l) {
  this.tag = t, this.containerInfo = e, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = $l(0), this.expirationTimes = $l(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = $l(0), this.identifierPrefix = r, this.onRecoverableError = l, this.mutableSourceEagerHydrationData = null;
}
function Xs(e, t, n, r, l, i, s, o, u) {
  return e = new gp(e, t, n, o, u), t === 1 ? (t = 1, i === !0 && (t |= 8)) : t = 0, i = Re(3, null, null, t), e.current = i, i.stateNode = e, i.memoizedState = { element: r, isDehydrated: n, cache: null, transitions: null, pendingSuspenseBoundaries: null }, Is(i), e;
}
function yp(e, t, n) {
  var r = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
  return { $$typeof: Yt, key: r == null ? null : "" + r, children: e, containerInfo: t, implementation: n };
}
function Rc(e) {
  if (!e) return jt;
  e = e._reactInternals;
  e: {
    if (Ht(e) !== e || e.tag !== 1) throw Error(E(170));
    var t = e;
    do {
      switch (t.tag) {
        case 3:
          t = t.stateNode.context;
          break e;
        case 1:
          if (Se(t.type)) {
            t = t.stateNode.__reactInternalMemoizedMergedChildContext;
            break e;
          }
      }
      t = t.return;
    } while (t !== null);
    throw Error(E(171));
  }
  if (e.tag === 1) {
    var n = e.type;
    if (Se(n)) return Ru(e, n, t);
  }
  return t;
}
function Ic(e, t, n, r, l, i, s, o, u) {
  return e = Xs(n, r, !0, e, l, i, s, o, u), e.context = Rc(null), n = e.current, r = me(), l = xt(n), i = qe(r, l), i.callback = t ?? null, yt(n, i, l), e.current.lanes = l, dr(e, l, r), Ne(e, r), e;
}
function Ll(e, t, n, r) {
  var l = t.current, i = me(), s = xt(l);
  return n = Rc(n), t.context === null ? t.context = n : t.pendingContext = n, t = qe(i, s), t.payload = { element: e }, r = r === void 0 ? null : r, r !== null && (t.callback = r), e = yt(l, t, s), e !== null && (Be(e, l, s, i), Br(e, l, s)), s;
}
function vl(e) {
  if (e = e.current, !e.child) return null;
  switch (e.child.tag) {
    case 5:
      return e.child.stateNode;
    default:
      return e.child.stateNode;
  }
}
function co(e, t) {
  if (e = e.memoizedState, e !== null && e.dehydrated !== null) {
    var n = e.retryLane;
    e.retryLane = n !== 0 && n < t ? n : t;
  }
}
function Js(e, t) {
  co(e, t), (e = e.alternate) && co(e, t);
}
function wp() {
  return null;
}
var zc = typeof reportError == "function" ? reportError : function(e) {
  console.error(e);
};
function Zs(e) {
  this._internalRoot = e;
}
Rl.prototype.render = Zs.prototype.render = function(e) {
  var t = this._internalRoot;
  if (t === null) throw Error(E(409));
  Ll(e, t, null, null);
};
Rl.prototype.unmount = Zs.prototype.unmount = function() {
  var e = this._internalRoot;
  if (e !== null) {
    this._internalRoot = null;
    var t = e.containerInfo;
    Vt(function() {
      Ll(null, e, null, null);
    }), t[et] = null;
  }
};
function Rl(e) {
  this._internalRoot = e;
}
Rl.prototype.unstable_scheduleHydration = function(e) {
  if (e) {
    var t = cu();
    e = { blockedOn: null, target: e, priority: t };
    for (var n = 0; n < ot.length && t !== 0 && t < ot[n].priority; n++) ;
    ot.splice(n, 0, e), n === 0 && fu(e);
  }
};
function qs(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11);
}
function Il(e) {
  return !(!e || e.nodeType !== 1 && e.nodeType !== 9 && e.nodeType !== 11 && (e.nodeType !== 8 || e.nodeValue !== " react-mount-point-unstable "));
}
function fo() {
}
function xp(e, t, n, r, l) {
  if (l) {
    if (typeof r == "function") {
      var i = r;
      r = function() {
        var c = vl(s);
        i.call(c);
      };
    }
    var s = Ic(t, r, e, 0, null, !1, !1, "", fo);
    return e._reactRootContainer = s, e[et] = s.current, bn(e.nodeType === 8 ? e.parentNode : e), Vt(), s;
  }
  for (; l = e.lastChild; ) e.removeChild(l);
  if (typeof r == "function") {
    var o = r;
    r = function() {
      var c = vl(u);
      o.call(c);
    };
  }
  var u = Xs(e, 0, !1, null, null, !1, !1, "", fo);
  return e._reactRootContainer = u, e[et] = u.current, bn(e.nodeType === 8 ? e.parentNode : e), Vt(function() {
    Ll(t, u, n, r);
  }), u;
}
function zl(e, t, n, r, l) {
  var i = n._reactRootContainer;
  if (i) {
    var s = i;
    if (typeof l == "function") {
      var o = l;
      l = function() {
        var u = vl(s);
        o.call(u);
      };
    }
    Ll(t, s, e, l);
  } else s = xp(n, t, e, l, r);
  return vl(s);
}
ou = function(e) {
  switch (e.tag) {
    case 3:
      var t = e.stateNode;
      if (t.current.memoizedState.isDehydrated) {
        var n = On(t.pendingLanes);
        n !== 0 && (gs(t, n | 1), Ne(t, b()), !(A & 6) && (yn = b() + 500, _t()));
      }
      break;
    case 13:
      Vt(function() {
        var r = tt(e, 1);
        if (r !== null) {
          var l = me();
          Be(r, e, 1, l);
        }
      }), Js(e, 1);
  }
};
ys = function(e) {
  if (e.tag === 13) {
    var t = tt(e, 134217728);
    if (t !== null) {
      var n = me();
      Be(t, e, 134217728, n);
    }
    Js(e, 134217728);
  }
};
uu = function(e) {
  if (e.tag === 13) {
    var t = xt(e), n = tt(e, t);
    if (n !== null) {
      var r = me();
      Be(n, e, t, r);
    }
    Js(e, t);
  }
};
cu = function() {
  return $;
};
du = function(e, t) {
  var n = $;
  try {
    return $ = e, t();
  } finally {
    $ = n;
  }
};
ki = function(e, t, n) {
  switch (t) {
    case "input":
      if (vi(e, n), t = n.name, n.type === "radio" && t != null) {
        for (n = e; n.parentNode; ) n = n.parentNode;
        for (n = n.querySelectorAll("input[name=" + JSON.stringify("" + t) + '][type="radio"]'), t = 0; t < n.length; t++) {
          var r = n[t];
          if (r !== e && r.form === e.form) {
            var l = kl(r);
            if (!l) throw Error(E(90));
            Vo(r), vi(r, l);
          }
        }
      }
      break;
    case "textarea":
      Ho(e, n);
      break;
    case "select":
      t = n.value, t != null && sn(e, !!n.multiple, t, !1);
  }
};
Zo = Qs;
qo = Vt;
var Sp = { usingClientEntryPoint: !1, Events: [pr, qt, kl, Xo, Jo, Qs] }, Rn = { findFiberByHostInstance: zt, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, Np = { bundleType: Rn.bundleType, version: Rn.version, rendererPackageName: Rn.rendererPackageName, rendererConfig: Rn.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: rt.ReactCurrentDispatcher, findHostInstanceByFiber: function(e) {
  return e = tu(e), e === null ? null : e.stateNode;
}, findFiberByHostInstance: Rn.findFiberByHostInstance || wp, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
  var Or = __REACT_DEVTOOLS_GLOBAL_HOOK__;
  if (!Or.isDisabled && Or.supportsFiber) try {
    wl = Or.inject(Np), Qe = Or;
  } catch {
  }
}
_e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Sp;
_e.createPortal = function(e, t) {
  var n = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
  if (!qs(t)) throw Error(E(200));
  return yp(e, t, null, n);
};
_e.createRoot = function(e, t) {
  if (!qs(e)) throw Error(E(299));
  var n = !1, r = "", l = zc;
  return t != null && (t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (l = t.onRecoverableError)), t = Xs(e, 1, !1, null, null, n, !1, r, l), e[et] = t.current, bn(e.nodeType === 8 ? e.parentNode : e), new Zs(t);
};
_e.findDOMNode = function(e) {
  if (e == null) return null;
  if (e.nodeType === 1) return e;
  var t = e._reactInternals;
  if (t === void 0)
    throw typeof e.render == "function" ? Error(E(188)) : (e = Object.keys(e).join(","), Error(E(268, e)));
  return e = tu(t), e = e === null ? null : e.stateNode, e;
};
_e.flushSync = function(e) {
  return Vt(e);
};
_e.hydrate = function(e, t, n) {
  if (!Il(t)) throw Error(E(200));
  return zl(null, e, t, !0, n);
};
_e.hydrateRoot = function(e, t, n) {
  if (!qs(e)) throw Error(E(405));
  var r = n != null && n.hydratedSources || null, l = !1, i = "", s = zc;
  if (n != null && (n.unstable_strictMode === !0 && (l = !0), n.identifierPrefix !== void 0 && (i = n.identifierPrefix), n.onRecoverableError !== void 0 && (s = n.onRecoverableError)), t = Ic(t, null, e, 1, n ?? null, l, !1, i, s), e[et] = t.current, bn(e), r) for (e = 0; e < r.length; e++) n = r[e], l = n._getVersion, l = l(n._source), t.mutableSourceEagerHydrationData == null ? t.mutableSourceEagerHydrationData = [n, l] : t.mutableSourceEagerHydrationData.push(
    n,
    l
  );
  return new Rl(t);
};
_e.render = function(e, t, n) {
  if (!Il(t)) throw Error(E(200));
  return zl(null, e, t, !1, n);
};
_e.unmountComponentAtNode = function(e) {
  if (!Il(e)) throw Error(E(40));
  return e._reactRootContainer ? (Vt(function() {
    zl(null, null, e, !1, function() {
      e._reactRootContainer = null, e[et] = null;
    });
  }), !0) : !1;
};
_e.unstable_batchedUpdates = Qs;
_e.unstable_renderSubtreeIntoContainer = function(e, t, n, r) {
  if (!Il(n)) throw Error(E(200));
  if (e == null || e._reactInternals === void 0) throw Error(E(38));
  return zl(e, t, n, !1, r);
};
_e.version = "18.3.1-next-f1338f8080-20240426";
function Oc() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function"))
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Oc);
    } catch (e) {
      console.error(e);
    }
}
Oc(), Oo.exports = _e;
var kp = Oo.exports, Dc, po = kp;
Dc = po.createRoot, po.hydrateRoot;
/**
 * @remix-run/router v1.23.0
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function or() {
  return or = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, or.apply(this, arguments);
}
var ft;
(function(e) {
  e.Pop = "POP", e.Push = "PUSH", e.Replace = "REPLACE";
})(ft || (ft = {}));
const ho = "popstate";
function jp(e) {
  e === void 0 && (e = {});
  function t(r, l) {
    let {
      pathname: i,
      search: s,
      hash: o
    } = r.location;
    return ns(
      "",
      {
        pathname: i,
        search: s,
        hash: o
      },
      // state defaults to `null` because `window.history.state` does
      l.state && l.state.usr || null,
      l.state && l.state.key || "default"
    );
  }
  function n(r, l) {
    return typeof l == "string" ? l : gl(l);
  }
  return Cp(t, n, null, e);
}
function ee(e, t) {
  if (e === !1 || e === null || typeof e > "u")
    throw new Error(t);
}
function Mc(e, t) {
  if (!e) {
    typeof console < "u" && console.warn(t);
    try {
      throw new Error(t);
    } catch {
    }
  }
}
function Ep() {
  return Math.random().toString(36).substr(2, 8);
}
function mo(e, t) {
  return {
    usr: e.state,
    key: e.key,
    idx: t
  };
}
function ns(e, t, n, r) {
  return n === void 0 && (n = null), or({
    pathname: typeof e == "string" ? e : e.pathname,
    search: "",
    hash: ""
  }, typeof t == "string" ? Nn(t) : t, {
    state: n,
    // TODO: This could be cleaned up.  push/replace should probably just take
    // full Locations now and avoid the need to run through this flow at all
    // But that's a pretty big refactor to the current test suite so going to
    // keep as is for the time being and just let any incoming keys take precedence
    key: t && t.key || r || Ep()
  });
}
function gl(e) {
  let {
    pathname: t = "/",
    search: n = "",
    hash: r = ""
  } = e;
  return n && n !== "?" && (t += n.charAt(0) === "?" ? n : "?" + n), r && r !== "#" && (t += r.charAt(0) === "#" ? r : "#" + r), t;
}
function Nn(e) {
  let t = {};
  if (e) {
    let n = e.indexOf("#");
    n >= 0 && (t.hash = e.substr(n), e = e.substr(0, n));
    let r = e.indexOf("?");
    r >= 0 && (t.search = e.substr(r), e = e.substr(0, r)), e && (t.pathname = e);
  }
  return t;
}
function Cp(e, t, n, r) {
  r === void 0 && (r = {});
  let {
    window: l = document.defaultView,
    v5Compat: i = !1
  } = r, s = l.history, o = ft.Pop, u = null, c = p();
  c == null && (c = 0, s.replaceState(or({}, s.state, {
    idx: c
  }), ""));
  function p() {
    return (s.state || {
      idx: null
    }).idx;
  }
  function f() {
    o = ft.Pop;
    let P = p(), v = P == null ? null : P - c;
    c = P, u && u({
      action: o,
      location: k.location,
      delta: v
    });
  }
  function m(P, v) {
    o = ft.Push;
    let d = ns(k.location, P, v);
    c = p() + 1;
    let h = mo(d, c), g = k.createHref(d);
    try {
      s.pushState(h, "", g);
    } catch (x) {
      if (x instanceof DOMException && x.name === "DataCloneError")
        throw x;
      l.location.assign(g);
    }
    i && u && u({
      action: o,
      location: k.location,
      delta: 1
    });
  }
  function w(P, v) {
    o = ft.Replace;
    let d = ns(k.location, P, v);
    c = p();
    let h = mo(d, c), g = k.createHref(d);
    s.replaceState(h, "", g), i && u && u({
      action: o,
      location: k.location,
      delta: 0
    });
  }
  function N(P) {
    let v = l.location.origin !== "null" ? l.location.origin : l.location.href, d = typeof P == "string" ? P : gl(P);
    return d = d.replace(/ $/, "%20"), ee(v, "No window.location.(origin|href) available to create URL for href: " + d), new URL(d, v);
  }
  let k = {
    get action() {
      return o;
    },
    get location() {
      return e(l, s);
    },
    listen(P) {
      if (u)
        throw new Error("A history only accepts one active listener");
      return l.addEventListener(ho, f), u = P, () => {
        l.removeEventListener(ho, f), u = null;
      };
    },
    createHref(P) {
      return t(l, P);
    },
    createURL: N,
    encodeLocation(P) {
      let v = N(P);
      return {
        pathname: v.pathname,
        search: v.search,
        hash: v.hash
      };
    },
    push: m,
    replace: w,
    go(P) {
      return s.go(P);
    }
  };
  return k;
}
var vo;
(function(e) {
  e.data = "data", e.deferred = "deferred", e.redirect = "redirect", e.error = "error";
})(vo || (vo = {}));
function _p(e, t, n) {
  return n === void 0 && (n = "/"), Pp(e, t, n);
}
function Pp(e, t, n, r) {
  let l = typeof t == "string" ? Nn(t) : t, i = bs(l.pathname || "/", n);
  if (i == null)
    return null;
  let s = Fc(e);
  Tp(s);
  let o = null;
  for (let u = 0; o == null && u < s.length; ++u) {
    let c = $p(i);
    o = Ap(s[u], c);
  }
  return o;
}
function Fc(e, t, n, r) {
  t === void 0 && (t = []), n === void 0 && (n = []), r === void 0 && (r = "");
  let l = (i, s, o) => {
    let u = {
      relativePath: o === void 0 ? i.path || "" : o,
      caseSensitive: i.caseSensitive === !0,
      childrenIndex: s,
      route: i
    };
    u.relativePath.startsWith("/") && (ee(u.relativePath.startsWith(r), 'Absolute route path "' + u.relativePath + '" nested under path ' + ('"' + r + '" is not valid. An absolute child route path ') + "must start with the combined path of all its parent routes."), u.relativePath = u.relativePath.slice(r.length));
    let c = Nt([r, u.relativePath]), p = n.concat(u);
    i.children && i.children.length > 0 && (ee(
      // Our types know better, but runtime JS may not!
      // @ts-expect-error
      i.index !== !0,
      "Index routes must not have child routes. Please remove " + ('all child routes from route path "' + c + '".')
    ), Fc(i.children, t, p, c)), !(i.path == null && !i.index) && t.push({
      path: c,
      score: Mp(c, i.index),
      routesMeta: p
    });
  };
  return e.forEach((i, s) => {
    var o;
    if (i.path === "" || !((o = i.path) != null && o.includes("?")))
      l(i, s);
    else
      for (let u of Ac(i.path))
        l(i, s, u);
  }), t;
}
function Ac(e) {
  let t = e.split("/");
  if (t.length === 0) return [];
  let [n, ...r] = t, l = n.endsWith("?"), i = n.replace(/\?$/, "");
  if (r.length === 0)
    return l ? [i, ""] : [i];
  let s = Ac(r.join("/")), o = [];
  return o.push(...s.map((u) => u === "" ? i : [i, u].join("/"))), l && o.push(...s), o.map((u) => e.startsWith("/") && u === "" ? "/" : u);
}
function Tp(e) {
  e.sort((t, n) => t.score !== n.score ? n.score - t.score : Fp(t.routesMeta.map((r) => r.childrenIndex), n.routesMeta.map((r) => r.childrenIndex)));
}
const Lp = /^:[\w-]+$/, Rp = 3, Ip = 2, zp = 1, Op = 10, Dp = -2, go = (e) => e === "*";
function Mp(e, t) {
  let n = e.split("/"), r = n.length;
  return n.some(go) && (r += Dp), t && (r += Ip), n.filter((l) => !go(l)).reduce((l, i) => l + (Lp.test(i) ? Rp : i === "" ? zp : Op), r);
}
function Fp(e, t) {
  return e.length === t.length && e.slice(0, -1).every((r, l) => r === t[l]) ? (
    // If two routes are siblings, we should try to match the earlier sibling
    // first. This allows people to have fine-grained control over the matching
    // behavior by simply putting routes with identical paths in the order they
    // want them tried.
    e[e.length - 1] - t[t.length - 1]
  ) : (
    // Otherwise, it doesn't really make sense to rank non-siblings by index,
    // so they sort equally.
    0
  );
}
function Ap(e, t, n) {
  let {
    routesMeta: r
  } = e, l = {}, i = "/", s = [];
  for (let o = 0; o < r.length; ++o) {
    let u = r[o], c = o === r.length - 1, p = i === "/" ? t : t.slice(i.length) || "/", f = Up({
      path: u.relativePath,
      caseSensitive: u.caseSensitive,
      end: c
    }, p), m = u.route;
    if (!f)
      return null;
    Object.assign(l, f.params), s.push({
      // TODO: Can this as be avoided?
      params: l,
      pathname: Nt([i, f.pathname]),
      pathnameBase: Qp(Nt([i, f.pathnameBase])),
      route: m
    }), f.pathnameBase !== "/" && (i = Nt([i, f.pathnameBase]));
  }
  return s;
}
function Up(e, t) {
  typeof e == "string" && (e = {
    path: e,
    caseSensitive: !1,
    end: !0
  });
  let [n, r] = Bp(e.path, e.caseSensitive, e.end), l = t.match(n);
  if (!l) return null;
  let i = l[0], s = i.replace(/(.)\/+$/, "$1"), o = l.slice(1);
  return {
    params: r.reduce((c, p, f) => {
      let {
        paramName: m,
        isOptional: w
      } = p;
      if (m === "*") {
        let k = o[f] || "";
        s = i.slice(0, i.length - k.length).replace(/(.)\/+$/, "$1");
      }
      const N = o[f];
      return w && !N ? c[m] = void 0 : c[m] = (N || "").replace(/%2F/g, "/"), c;
    }, {}),
    pathname: i,
    pathnameBase: s,
    pattern: e
  };
}
function Bp(e, t, n) {
  t === void 0 && (t = !1), n === void 0 && (n = !0), Mc(e === "*" || !e.endsWith("*") || e.endsWith("/*"), 'Route path "' + e + '" will be treated as if it were ' + ('"' + e.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + e.replace(/\*$/, "/*") + '".'));
  let r = [], l = "^" + e.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(/\/:([\w-]+)(\?)?/g, (s, o, u) => (r.push({
    paramName: o,
    isOptional: u != null
  }), u ? "/?([^\\/]+)?" : "/([^\\/]+)"));
  return e.endsWith("*") ? (r.push({
    paramName: "*"
  }), l += e === "*" || e === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : n ? l += "\\/*$" : e !== "" && e !== "/" && (l += "(?:(?=\\/|$))"), [new RegExp(l, t ? void 0 : "i"), r];
}
function $p(e) {
  try {
    return e.split("/").map((t) => decodeURIComponent(t).replace(/\//g, "%2F")).join("/");
  } catch (t) {
    return Mc(!1, 'The URL path "' + e + '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' + ("encoding (" + t + ").")), e;
  }
}
function bs(e, t) {
  if (t === "/") return e;
  if (!e.toLowerCase().startsWith(t.toLowerCase()))
    return null;
  let n = t.endsWith("/") ? t.length - 1 : t.length, r = e.charAt(n);
  return r && r !== "/" ? null : e.slice(n) || "/";
}
function Vp(e, t) {
  t === void 0 && (t = "/");
  let {
    pathname: n,
    search: r = "",
    hash: l = ""
  } = typeof e == "string" ? Nn(e) : e;
  return {
    pathname: n ? n.startsWith("/") ? n : Wp(n, t) : t,
    search: Kp(r),
    hash: Yp(l)
  };
}
function Wp(e, t) {
  let n = t.replace(/\/+$/, "").split("/");
  return e.split("/").forEach((l) => {
    l === ".." ? n.length > 1 && n.pop() : l !== "." && n.push(l);
  }), n.length > 1 ? n.join("/") : "/";
}
function oi(e, t, n, r) {
  return "Cannot include a '" + e + "' character in a manually specified " + ("`to." + t + "` field [" + JSON.stringify(r) + "].  Please separate it out to the ") + ("`to." + n + "` field. Alternatively you may provide the full path as ") + 'a string in <Link to="..."> and the router will parse it for you.';
}
function Hp(e) {
  return e.filter((t, n) => n === 0 || t.route.path && t.route.path.length > 0);
}
function ea(e, t) {
  let n = Hp(e);
  return t ? n.map((r, l) => l === n.length - 1 ? r.pathname : r.pathnameBase) : n.map((r) => r.pathnameBase);
}
function ta(e, t, n, r) {
  r === void 0 && (r = !1);
  let l;
  typeof e == "string" ? l = Nn(e) : (l = or({}, e), ee(!l.pathname || !l.pathname.includes("?"), oi("?", "pathname", "search", l)), ee(!l.pathname || !l.pathname.includes("#"), oi("#", "pathname", "hash", l)), ee(!l.search || !l.search.includes("#"), oi("#", "search", "hash", l)));
  let i = e === "" || l.pathname === "", s = i ? "/" : l.pathname, o;
  if (s == null)
    o = n;
  else {
    let f = t.length - 1;
    if (!r && s.startsWith("..")) {
      let m = s.split("/");
      for (; m[0] === ".."; )
        m.shift(), f -= 1;
      l.pathname = m.join("/");
    }
    o = f >= 0 ? t[f] : "/";
  }
  let u = Vp(l, o), c = s && s !== "/" && s.endsWith("/"), p = (i || s === ".") && n.endsWith("/");
  return !u.pathname.endsWith("/") && (c || p) && (u.pathname += "/"), u;
}
const Nt = (e) => e.join("/").replace(/\/\/+/g, "/"), Qp = (e) => e.replace(/\/+$/, "").replace(/^\/*/, "/"), Kp = (e) => !e || e === "?" ? "" : e.startsWith("?") ? e : "?" + e, Yp = (e) => !e || e === "#" ? "" : e.startsWith("#") ? e : "#" + e;
function Gp(e) {
  return e != null && typeof e.status == "number" && typeof e.statusText == "string" && typeof e.internal == "boolean" && "data" in e;
}
const Uc = ["post", "put", "patch", "delete"];
new Set(Uc);
const Xp = ["get", ...Uc];
new Set(Xp);
/**
 * React Router v6.30.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function ur() {
  return ur = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, ur.apply(this, arguments);
}
const na = /* @__PURE__ */ y.createContext(null), Jp = /* @__PURE__ */ y.createContext(null), Pt = /* @__PURE__ */ y.createContext(null), Ol = /* @__PURE__ */ y.createContext(null), lt = /* @__PURE__ */ y.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
}), Bc = /* @__PURE__ */ y.createContext(null);
function Zp(e, t) {
  let {
    relative: n
  } = t === void 0 ? {} : t;
  kn() || ee(!1);
  let {
    basename: r,
    navigator: l
  } = y.useContext(Pt), {
    hash: i,
    pathname: s,
    search: o
  } = Vc(e, {
    relative: n
  }), u = s;
  return r !== "/" && (u = s === "/" ? r : Nt([r, s])), l.createHref({
    pathname: u,
    search: o,
    hash: i
  });
}
function kn() {
  return y.useContext(Ol) != null;
}
function mr() {
  return kn() || ee(!1), y.useContext(Ol).location;
}
function $c(e) {
  y.useContext(Pt).static || y.useLayoutEffect(e);
}
function ra() {
  let {
    isDataRoute: e
  } = y.useContext(lt);
  return e ? dh() : qp();
}
function qp() {
  kn() || ee(!1);
  let e = y.useContext(na), {
    basename: t,
    future: n,
    navigator: r
  } = y.useContext(Pt), {
    matches: l
  } = y.useContext(lt), {
    pathname: i
  } = mr(), s = JSON.stringify(ea(l, n.v7_relativeSplatPath)), o = y.useRef(!1);
  return $c(() => {
    o.current = !0;
  }), y.useCallback(function(c, p) {
    if (p === void 0 && (p = {}), !o.current) return;
    if (typeof c == "number") {
      r.go(c);
      return;
    }
    let f = ta(c, JSON.parse(s), i, p.relative === "path");
    e == null && t !== "/" && (f.pathname = f.pathname === "/" ? t : Nt([t, f.pathname])), (p.replace ? r.replace : r.push)(f, p.state, p);
  }, [t, r, s, i, e]);
}
function bp() {
  let {
    matches: e
  } = y.useContext(lt), t = e[e.length - 1];
  return t ? t.params : {};
}
function Vc(e, t) {
  let {
    relative: n
  } = t === void 0 ? {} : t, {
    future: r
  } = y.useContext(Pt), {
    matches: l
  } = y.useContext(lt), {
    pathname: i
  } = mr(), s = JSON.stringify(ea(l, r.v7_relativeSplatPath));
  return y.useMemo(() => ta(e, JSON.parse(s), i, n === "path"), [e, s, i, n]);
}
function eh(e, t) {
  return th(e, t);
}
function th(e, t, n, r) {
  kn() || ee(!1);
  let {
    navigator: l
  } = y.useContext(Pt), {
    matches: i
  } = y.useContext(lt), s = i[i.length - 1], o = s ? s.params : {};
  s && s.pathname;
  let u = s ? s.pathnameBase : "/";
  s && s.route;
  let c = mr(), p;
  if (t) {
    var f;
    let P = typeof t == "string" ? Nn(t) : t;
    u === "/" || (f = P.pathname) != null && f.startsWith(u) || ee(!1), p = P;
  } else
    p = c;
  let m = p.pathname || "/", w = m;
  if (u !== "/") {
    let P = u.replace(/^\//, "").split("/");
    w = "/" + m.replace(/^\//, "").split("/").slice(P.length).join("/");
  }
  let N = _p(e, {
    pathname: w
  }), k = sh(N && N.map((P) => Object.assign({}, P, {
    params: Object.assign({}, o, P.params),
    pathname: Nt([
      u,
      // Re-encode pathnames that were decoded inside matchRoutes
      l.encodeLocation ? l.encodeLocation(P.pathname).pathname : P.pathname
    ]),
    pathnameBase: P.pathnameBase === "/" ? u : Nt([
      u,
      // Re-encode pathnames that were decoded inside matchRoutes
      l.encodeLocation ? l.encodeLocation(P.pathnameBase).pathname : P.pathnameBase
    ])
  })), i, n, r);
  return t && k ? /* @__PURE__ */ y.createElement(Ol.Provider, {
    value: {
      location: ur({
        pathname: "/",
        search: "",
        hash: "",
        state: null,
        key: "default"
      }, p),
      navigationType: ft.Pop
    }
  }, k) : k;
}
function nh() {
  let e = ch(), t = Gp(e) ? e.status + " " + e.statusText : e instanceof Error ? e.message : JSON.stringify(e), n = e instanceof Error ? e.stack : null, l = {
    padding: "0.5rem",
    backgroundColor: "rgba(200,200,200, 0.5)"
  };
  return /* @__PURE__ */ y.createElement(y.Fragment, null, /* @__PURE__ */ y.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ y.createElement("h3", {
    style: {
      fontStyle: "italic"
    }
  }, t), n ? /* @__PURE__ */ y.createElement("pre", {
    style: l
  }, n) : null, null);
}
const rh = /* @__PURE__ */ y.createElement(nh, null);
class lh extends y.Component {
  constructor(t) {
    super(t), this.state = {
      location: t.location,
      revalidation: t.revalidation,
      error: t.error
    };
  }
  static getDerivedStateFromError(t) {
    return {
      error: t
    };
  }
  static getDerivedStateFromProps(t, n) {
    return n.location !== t.location || n.revalidation !== "idle" && t.revalidation === "idle" ? {
      error: t.error,
      location: t.location,
      revalidation: t.revalidation
    } : {
      error: t.error !== void 0 ? t.error : n.error,
      location: n.location,
      revalidation: t.revalidation || n.revalidation
    };
  }
  componentDidCatch(t, n) {
    console.error("React Router caught the following error during render", t, n);
  }
  render() {
    return this.state.error !== void 0 ? /* @__PURE__ */ y.createElement(lt.Provider, {
      value: this.props.routeContext
    }, /* @__PURE__ */ y.createElement(Bc.Provider, {
      value: this.state.error,
      children: this.props.component
    })) : this.props.children;
  }
}
function ih(e) {
  let {
    routeContext: t,
    match: n,
    children: r
  } = e, l = y.useContext(na);
  return l && l.static && l.staticContext && (n.route.errorElement || n.route.ErrorBoundary) && (l.staticContext._deepestRenderedBoundaryId = n.route.id), /* @__PURE__ */ y.createElement(lt.Provider, {
    value: t
  }, r);
}
function sh(e, t, n, r) {
  var l;
  if (t === void 0 && (t = []), n === void 0 && (n = null), r === void 0 && (r = null), e == null) {
    var i;
    if (!n)
      return null;
    if (n.errors)
      e = n.matches;
    else if ((i = r) != null && i.v7_partialHydration && t.length === 0 && !n.initialized && n.matches.length > 0)
      e = n.matches;
    else
      return null;
  }
  let s = e, o = (l = n) == null ? void 0 : l.errors;
  if (o != null) {
    let p = s.findIndex((f) => f.route.id && (o == null ? void 0 : o[f.route.id]) !== void 0);
    p >= 0 || ee(!1), s = s.slice(0, Math.min(s.length, p + 1));
  }
  let u = !1, c = -1;
  if (n && r && r.v7_partialHydration)
    for (let p = 0; p < s.length; p++) {
      let f = s[p];
      if ((f.route.HydrateFallback || f.route.hydrateFallbackElement) && (c = p), f.route.id) {
        let {
          loaderData: m,
          errors: w
        } = n, N = f.route.loader && m[f.route.id] === void 0 && (!w || w[f.route.id] === void 0);
        if (f.route.lazy || N) {
          u = !0, c >= 0 ? s = s.slice(0, c + 1) : s = [s[0]];
          break;
        }
      }
    }
  return s.reduceRight((p, f, m) => {
    let w, N = !1, k = null, P = null;
    n && (w = o && f.route.id ? o[f.route.id] : void 0, k = f.route.errorElement || rh, u && (c < 0 && m === 0 ? (fh("route-fallback"), N = !0, P = null) : c === m && (N = !0, P = f.route.hydrateFallbackElement || null)));
    let v = t.concat(s.slice(0, m + 1)), d = () => {
      let h;
      return w ? h = k : N ? h = P : f.route.Component ? h = /* @__PURE__ */ y.createElement(f.route.Component, null) : f.route.element ? h = f.route.element : h = p, /* @__PURE__ */ y.createElement(ih, {
        match: f,
        routeContext: {
          outlet: p,
          matches: v,
          isDataRoute: n != null
        },
        children: h
      });
    };
    return n && (f.route.ErrorBoundary || f.route.errorElement || m === 0) ? /* @__PURE__ */ y.createElement(lh, {
      location: n.location,
      revalidation: n.revalidation,
      component: k,
      error: w,
      children: d(),
      routeContext: {
        outlet: null,
        matches: v,
        isDataRoute: !0
      }
    }) : d();
  }, null);
}
var Wc = /* @__PURE__ */ function(e) {
  return e.UseBlocker = "useBlocker", e.UseRevalidator = "useRevalidator", e.UseNavigateStable = "useNavigate", e;
}(Wc || {}), Hc = /* @__PURE__ */ function(e) {
  return e.UseBlocker = "useBlocker", e.UseLoaderData = "useLoaderData", e.UseActionData = "useActionData", e.UseRouteError = "useRouteError", e.UseNavigation = "useNavigation", e.UseRouteLoaderData = "useRouteLoaderData", e.UseMatches = "useMatches", e.UseRevalidator = "useRevalidator", e.UseNavigateStable = "useNavigate", e.UseRouteId = "useRouteId", e;
}(Hc || {});
function ah(e) {
  let t = y.useContext(na);
  return t || ee(!1), t;
}
function oh(e) {
  let t = y.useContext(Jp);
  return t || ee(!1), t;
}
function uh(e) {
  let t = y.useContext(lt);
  return t || ee(!1), t;
}
function Qc(e) {
  let t = uh(), n = t.matches[t.matches.length - 1];
  return n.route.id || ee(!1), n.route.id;
}
function ch() {
  var e;
  let t = y.useContext(Bc), n = oh(), r = Qc();
  return t !== void 0 ? t : (e = n.errors) == null ? void 0 : e[r];
}
function dh() {
  let {
    router: e
  } = ah(Wc.UseNavigateStable), t = Qc(Hc.UseNavigateStable), n = y.useRef(!1);
  return $c(() => {
    n.current = !0;
  }), y.useCallback(function(l, i) {
    i === void 0 && (i = {}), n.current && (typeof l == "number" ? e.navigate(l) : e.navigate(l, ur({
      fromRouteId: t
    }, i)));
  }, [e, t]);
}
const yo = {};
function fh(e, t, n) {
  yo[e] || (yo[e] = !0);
}
function ph(e, t) {
  e == null || e.v7_startTransition, e == null || e.v7_relativeSplatPath;
}
function hh(e) {
  let {
    to: t,
    replace: n,
    state: r,
    relative: l
  } = e;
  kn() || ee(!1);
  let {
    future: i,
    static: s
  } = y.useContext(Pt), {
    matches: o
  } = y.useContext(lt), {
    pathname: u
  } = mr(), c = ra(), p = ta(t, ea(o, i.v7_relativeSplatPath), u, l === "path"), f = JSON.stringify(p);
  return y.useEffect(() => c(JSON.parse(f), {
    replace: n,
    state: r,
    relative: l
  }), [c, f, l, n, r]), null;
}
function Ye(e) {
  ee(!1);
}
function mh(e) {
  let {
    basename: t = "/",
    children: n = null,
    location: r,
    navigationType: l = ft.Pop,
    navigator: i,
    static: s = !1,
    future: o
  } = e;
  kn() && ee(!1);
  let u = t.replace(/^\/*/, "/"), c = y.useMemo(() => ({
    basename: u,
    navigator: i,
    static: s,
    future: ur({
      v7_relativeSplatPath: !1
    }, o)
  }), [u, o, i, s]);
  typeof r == "string" && (r = Nn(r));
  let {
    pathname: p = "/",
    search: f = "",
    hash: m = "",
    state: w = null,
    key: N = "default"
  } = r, k = y.useMemo(() => {
    let P = bs(p, u);
    return P == null ? null : {
      location: {
        pathname: P,
        search: f,
        hash: m,
        state: w,
        key: N
      },
      navigationType: l
    };
  }, [u, p, f, m, w, N, l]);
  return k == null ? null : /* @__PURE__ */ y.createElement(Pt.Provider, {
    value: c
  }, /* @__PURE__ */ y.createElement(Ol.Provider, {
    children: n,
    value: k
  }));
}
function vh(e) {
  let {
    children: t,
    location: n
  } = e;
  return eh(rs(t), n);
}
new Promise(() => {
});
function rs(e, t) {
  t === void 0 && (t = []);
  let n = [];
  return y.Children.forEach(e, (r, l) => {
    if (!/* @__PURE__ */ y.isValidElement(r))
      return;
    let i = [...t, l];
    if (r.type === y.Fragment) {
      n.push.apply(n, rs(r.props.children, i));
      return;
    }
    r.type !== Ye && ee(!1), !r.props.index || !r.props.children || ee(!1);
    let s = {
      id: r.props.id || i.join("-"),
      caseSensitive: r.props.caseSensitive,
      element: r.props.element,
      Component: r.props.Component,
      index: r.props.index,
      path: r.props.path,
      loader: r.props.loader,
      action: r.props.action,
      errorElement: r.props.errorElement,
      ErrorBoundary: r.props.ErrorBoundary,
      hasErrorBoundary: r.props.ErrorBoundary != null || r.props.errorElement != null,
      shouldRevalidate: r.props.shouldRevalidate,
      handle: r.props.handle,
      lazy: r.props.lazy
    };
    r.props.children && (s.children = rs(r.props.children, i)), n.push(s);
  }), n;
}
/**
 * React Router DOM v6.30.1
 *
 * Copyright (c) Remix Software Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE.md file in the root directory of this source tree.
 *
 * @license MIT
 */
function ls() {
  return ls = Object.assign ? Object.assign.bind() : function(e) {
    for (var t = 1; t < arguments.length; t++) {
      var n = arguments[t];
      for (var r in n)
        Object.prototype.hasOwnProperty.call(n, r) && (e[r] = n[r]);
    }
    return e;
  }, ls.apply(this, arguments);
}
function gh(e, t) {
  if (e == null) return {};
  var n = {}, r = Object.keys(e), l, i;
  for (i = 0; i < r.length; i++)
    l = r[i], !(t.indexOf(l) >= 0) && (n[l] = e[l]);
  return n;
}
function yh(e) {
  return !!(e.metaKey || e.altKey || e.ctrlKey || e.shiftKey);
}
function wh(e, t) {
  return e.button === 0 && // Ignore everything but left clicks
  (!t || t === "_self") && // Let browser handle "target=_blank" etc.
  !yh(e);
}
const xh = ["onClick", "relative", "reloadDocument", "replace", "state", "target", "to", "preventScrollReset", "viewTransition"], Sh = "6";
try {
  window.__reactRouterVersion = Sh;
} catch {
}
const Nh = "startTransition", wo = dd[Nh];
function kh(e) {
  let {
    basename: t,
    children: n,
    future: r,
    window: l
  } = e, i = y.useRef();
  i.current == null && (i.current = jp({
    window: l,
    v5Compat: !0
  }));
  let s = i.current, [o, u] = y.useState({
    action: s.action,
    location: s.location
  }), {
    v7_startTransition: c
  } = r || {}, p = y.useCallback((f) => {
    c && wo ? wo(() => u(f)) : u(f);
  }, [u, c]);
  return y.useLayoutEffect(() => s.listen(p), [s, p]), y.useEffect(() => ph(r), [r]), /* @__PURE__ */ y.createElement(mh, {
    basename: t,
    children: n,
    location: o.location,
    navigationType: o.action,
    navigator: s,
    future: r
  });
}
const jh = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", Eh = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, Kt = /* @__PURE__ */ y.forwardRef(function(t, n) {
  let {
    onClick: r,
    relative: l,
    reloadDocument: i,
    replace: s,
    state: o,
    target: u,
    to: c,
    preventScrollReset: p,
    viewTransition: f
  } = t, m = gh(t, xh), {
    basename: w
  } = y.useContext(Pt), N, k = !1;
  if (typeof c == "string" && Eh.test(c) && (N = c, jh))
    try {
      let h = new URL(window.location.href), g = c.startsWith("//") ? new URL(h.protocol + c) : new URL(c), x = bs(g.pathname, w);
      g.origin === h.origin && x != null ? c = x + g.search + g.hash : k = !0;
    } catch {
    }
  let P = Zp(c, {
    relative: l
  }), v = Ch(c, {
    replace: s,
    state: o,
    target: u,
    preventScrollReset: p,
    relative: l,
    viewTransition: f
  });
  function d(h) {
    r && r(h), h.defaultPrevented || v(h);
  }
  return (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    /* @__PURE__ */ y.createElement("a", ls({}, m, {
      href: N || P,
      onClick: k || i ? r : d,
      ref: n,
      target: u
    }))
  );
});
var xo;
(function(e) {
  e.UseScrollRestoration = "useScrollRestoration", e.UseSubmit = "useSubmit", e.UseSubmitFetcher = "useSubmitFetcher", e.UseFetcher = "useFetcher", e.useViewTransitionState = "useViewTransitionState";
})(xo || (xo = {}));
var So;
(function(e) {
  e.UseFetcher = "useFetcher", e.UseFetchers = "useFetchers", e.UseScrollRestoration = "useScrollRestoration";
})(So || (So = {}));
function Ch(e, t) {
  let {
    target: n,
    replace: r,
    state: l,
    preventScrollReset: i,
    relative: s,
    viewTransition: o
  } = t === void 0 ? {} : t, u = ra(), c = mr(), p = Vc(e, {
    relative: s
  });
  return y.useCallback((f) => {
    if (wh(f, n)) {
      f.preventDefault();
      let m = r !== void 0 ? r : gl(c) === gl(p);
      u(e, {
        replace: m,
        state: l,
        preventScrollReset: i,
        relative: s,
        viewTransition: o
      });
    }
  }, [c, u, p, r, l, n, e, i, s, o]);
}
function _h() {
  const [e, t] = y.useState(null), [n, r] = y.useState(""), [l, i] = y.useState(""), [s, o] = y.useState(!0), [u, c] = y.useState(""), [p, f] = y.useState(""), [m, w] = y.useState(!1), [N, k] = y.useState(!1);
  y.useEffect(() => {
    const h = typeof window < "u" ? window : void 0, g = h && h.__FIREBASE__ ? h.__FIREBASE__ : null;
    t({
      apiKey: g && g.apiKey || void 0 || "AIzaSyD-zBSQk_OIyIDzRG0wBNlQCloBqu25ijo",
      authDomain: g && g.authDomain || void 0 || "fresh-basket-a8933.firebaseapp.com",
      projectId: g && g.projectId || void 0 || "fresh-basket-a8933",
      appId: g && g.appId || void 0 || "1:163656027399:web:7bbd739740ec13453489a2",
      messagingSenderId: g && g.messagingSenderId || void 0 || "163656027399",
      measurementId: g && g.measurementId || void 0 || "G-7M8H5YJF18"
    });
  }, []);
  function P(h) {
    const g = (h == null ? void 0 : h.code) || "", x = (h == null ? void 0 : h.message) || "";
    return g.includes("invalid-email") ? "Please enter a valid email address." : g.includes("user-not-found") ? "No account found with that email." : g.includes("wrong-password") || g.includes("invalid-credential") || x.includes("INVALID_LOGIN_CREDENTIALS") ? "Incorrect email or password." : g.includes("too-many-requests") ? "Too many attempts. Please wait and try again." : g.includes("network-request-failed") ? "Network error. Check your connection and try again." : x || "Something went wrong.";
  }
  async function v(h) {
    h.preventDefault(), c(""), f(""), w(!0);
    try {
      if (!(e != null && e.apiKey)) throw new Error("Firebase not configured");
      const g = (await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js")).initializeApp(e), x = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js"), { getAuth: C, setPersistence: S, browserLocalPersistence: L, browserSessionPersistence: I, signInWithEmailAndPassword: _ } = x, z = C();
      await S(z, s ? L : I);
      const U = await (await _(z, n.trim(), l)).user.getIdToken();
      if (!(await fetch("/auth/session", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify({ idToken: U }) })).ok) throw new Error("Session creation failed");
      f("Signed in successfully. Redirecting..."), setTimeout(() => window.location.href = "/dashboard", 600);
    } catch (g) {
      c(P(g));
    } finally {
      w(!1);
    }
  }
  async function d() {
    c(""), f("");
    try {
      if (!(e != null && e.apiKey)) throw new Error("Firebase not configured");
      const h = (await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js")).initializeApp(e), { getAuth: g, sendPasswordResetEmail: x } = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js"), C = g();
      await x(C, n.trim()), f("If an account exists for that email, a reset link has been sent.");
    } catch (h) {
      c(P(h));
    }
  }
  return /* @__PURE__ */ a.jsxs("section", { className: "auth-layout", children: [
    /* @__PURE__ */ a.jsxs("div", { className: "auth-hero", children: [
      /* @__PURE__ */ a.jsx("img", { className: "hero-logo", src: "https://cdn.builder.io/api/v1/image/assets%2Fa5647e4ccf094d4d939a079b9f892c1c%2F240094ac7d6b4725b685503d97c9d9a3?format=webp&width=96", alt: "FreshBasket logo" }),
      /* @__PURE__ */ a.jsx("h2", { className: "hero-heading", children: "Welcome back" }),
      /* @__PURE__ */ a.jsx("p", { className: "hero-sub", children: "Sign in to manage orders, riders and deliveries." }),
      /* @__PURE__ */ a.jsxs("ul", { className: "hero-points", children: [
        /* @__PURE__ */ a.jsx("li", { children: "Secure account access" }),
        /* @__PURE__ */ a.jsx("li", { children: "Real-time dashboards" }),
        /* @__PURE__ */ a.jsx("li", { children: "Faster operations" })
      ] })
    ] }),
    /* @__PURE__ */ a.jsxs("div", { className: "auth-panel auth-panel-card", children: [
      /* @__PURE__ */ a.jsx("h2", { className: "auth-title", children: "Sign in to FreshBasket" }),
      u && /* @__PURE__ */ a.jsx("div", { className: "auth-error", children: u }),
      p && /* @__PURE__ */ a.jsx("div", { className: "auth-success", children: p }),
      /* @__PURE__ */ a.jsxs("form", { className: "auth-form", onSubmit: v, children: [
        /* @__PURE__ */ a.jsxs("label", { className: "auth-label", children: [
          "Email",
          /* @__PURE__ */ a.jsx("input", { className: "auth-input", type: "email", value: n, onChange: (h) => r(h.target.value), required: !0 })
        ] }),
        /* @__PURE__ */ a.jsxs("label", { className: "auth-label", children: [
          "Password",
          /* @__PURE__ */ a.jsxs("span", { className: "password-field", children: [
            /* @__PURE__ */ a.jsx("input", { className: "auth-input", type: N ? "text" : "password", value: l, onChange: (h) => i(h.target.value), required: !0 }),
            /* @__PURE__ */ a.jsx("button", { type: "button", id: "togglePwd", className: "toggle-password", "aria-label": N ? "Hide password" : "Show password", onClick: () => k((h) => !h), children: "👁️" })
          ] })
        ] }),
        /* @__PURE__ */ a.jsxs("div", { className: "auth-actions", children: [
          /* @__PURE__ */ a.jsxs("label", { className: "remember", children: [
            /* @__PURE__ */ a.jsx("input", { type: "checkbox", checked: s, onChange: (h) => o(h.target.checked) }),
            " Remember me"
          ] }),
          /* @__PURE__ */ a.jsx("button", { className: "link-button", type: "button", onClick: d, children: "Forgot password?" })
        ] }),
        /* @__PURE__ */ a.jsx("button", { className: "auth-button auth-button-wide", disabled: m, type: "submit", children: m ? "Signing in…" : "Sign in" })
      ] }),
      /* @__PURE__ */ a.jsxs("p", { className: "auth-alt", children: [
        "No account? ",
        /* @__PURE__ */ a.jsx("a", { href: "/auth/register", children: "Register" })
      ] })
    ] })
  ] });
}
function Ph() {
  const [e, t] = y.useState(null), [n, r] = y.useState(""), [l, i] = y.useState(""), [s, o] = y.useState(""), [u, c] = y.useState(""), [p, f] = y.useState(""), [m, w] = y.useState(""), [N, k] = y.useState(""), [P, v] = y.useState(!1), [d, h] = y.useState(!1), [g, x] = y.useState(!1), [C, S] = y.useState(!1);
  y.useEffect(() => {
    const _ = typeof window < "u" ? window : void 0, z = _ && _.__FIREBASE__ ? _.__FIREBASE__ : null;
    t({
      apiKey: z && z.apiKey || void 0 || "AIzaSyD-zBSQk_OIyIDzRG0wBNlQCloBqu25ijo",
      authDomain: z && z.authDomain || void 0 || "fresh-basket-a8933.firebaseapp.com",
      projectId: z && z.projectId || void 0 || "fresh-basket-a8933",
      appId: z && z.appId || void 0 || "1:163656027399:web:7bbd739740ec13453489a2",
      messagingSenderId: z && z.messagingSenderId || void 0 || "163656027399",
      measurementId: z && z.measurementId || void 0 || "G-7M8H5YJF18"
    });
  }, []);
  function L(_) {
    const z = (_ == null ? void 0 : _.code) || "";
    return z.includes("email-already-in-use") ? "An account with this email already exists." : z.includes("weak-password") ? "Password should be at least 6 characters." : z.includes("invalid-email") ? "Please enter a valid email address." : z.includes("network-request-failed") ? "Network error. Check your connection and try again." : (_ == null ? void 0 : _.message) || "Something went wrong.";
  }
  async function I(_) {
    _.preventDefault(), w(""), k(""), v(!0);
    try {
      const z = String(n).trim(), j = String(l).trim(), U = j.replace(/\D+/g, ""), F = { fn: !z, cn: !j };
      if (x(F.fn), S(F.cn || U.length < 7), F.fn || F.cn) {
        w("Please fill in required fields");
        return;
      }
      if (U.length < 7) {
        w("Please enter a valid mobile number");
        return;
      }
      if (u !== p) throw new Error("Passwords do not match");
      if (!(e != null && e.apiKey)) throw new Error("Firebase not configured");
      const V = (await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js")).initializeApp(e), { getAuth: B, createUserWithEmailAndPassword: K } = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js"), T = B(), D = await (await K(T, s.trim(), u)).user.getIdToken();
      if (!(await fetch("/auth/session", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify({ idToken: D, profile: { fullName: z, contactNumber: j } }) })).ok) throw new Error("Session creation failed");
      k("Account created successfully. Redirecting..."), setTimeout(() => window.location.href = "/riders", 700);
    } catch (z) {
      w(L(z));
    } finally {
      v(!1);
    }
  }
  return /* @__PURE__ */ a.jsxs("section", { className: "auth-panel", style: { maxWidth: 520, margin: "40px auto" }, children: [
    /* @__PURE__ */ a.jsx("h2", { className: "auth-title", children: "Register" }),
    m && /* @__PURE__ */ a.jsx("div", { className: "auth-error", children: m }),
    N && /* @__PURE__ */ a.jsx("div", { className: "auth-success", children: N }),
    /* @__PURE__ */ a.jsxs("form", { className: "auth-form", onSubmit: I, children: [
      /* @__PURE__ */ a.jsxs("label", { className: "auth-label", children: [
        "Full name",
        /* @__PURE__ */ a.jsx("input", { className: "auth-input" + (g && !String(n).trim() ? " input-error" : ""), value: n, onChange: (_) => {
          r(_.target.value), g && x(!String(_.target.value).trim());
        }, onBlur: () => x(!String(n).trim()), required: !0 })
      ] }),
      /* @__PURE__ */ a.jsxs("label", { className: "auth-label", children: [
        "Contact number",
        /* @__PURE__ */ a.jsx("input", { className: "auth-input" + (C ? " input-error" : ""), type: "tel", inputMode: "tel", pattern: "[0-9+()\\-\\s]{7,}", value: l, onChange: (_) => {
          if (i(_.target.value), C) {
            const z = String(_.target.value).trim().replace(/\D+/g, "");
            S(!(z.length >= 7));
          }
        }, onBlur: () => {
          const _ = String(l).trim().replace(/\D+/g, "");
          S(!(_.length >= 7));
        }, placeholder: "e.g. +1 555 123 4567", required: !0 })
      ] }),
      /* @__PURE__ */ a.jsxs("label", { className: "auth-label", children: [
        "Email",
        /* @__PURE__ */ a.jsx("input", { className: "auth-input", type: "email", value: s, onChange: (_) => o(_.target.value), required: !0 })
      ] }),
      /* @__PURE__ */ a.jsxs("label", { className: "auth-label", children: [
        "Password",
        /* @__PURE__ */ a.jsxs("span", { className: "password-field", children: [
          /* @__PURE__ */ a.jsx("input", { className: "auth-input", type: d ? "text" : "password", value: u, onChange: (_) => c(_.target.value), minLength: 6, required: !0 }),
          /* @__PURE__ */ a.jsx("button", { type: "button", className: "toggle-password", "aria-label": d ? "Hide password" : "Show password", onClick: () => h((_) => !_), children: "👁️" })
        ] })
      ] }),
      /* @__PURE__ */ a.jsxs("label", { className: "auth-label", children: [
        "Confirm Password",
        /* @__PURE__ */ a.jsx("input", { className: "auth-input", type: "password", value: p, onChange: (_) => f(_.target.value), minLength: 6, required: !0 })
      ] }),
      /* @__PURE__ */ a.jsx("button", { className: "auth-button", disabled: P, type: "submit", children: P ? "Creating account…" : "Create account" })
    ] }),
    /* @__PURE__ */ a.jsxs("p", { className: "auth-alt", children: [
      "Have an account? ",
      /* @__PURE__ */ a.jsx("a", { href: "/auth/login", children: "Login" })
    ] })
  ] });
}
function Th() {
  const [e, t] = y.useState([]);
  return y.useEffect(() => {
    const n = Array.isArray(window.__pendingToasts) ? window.__pendingToasts.slice() : [];
    if (n.length) {
      const r = n.map((l) => ({
        id: String(Date.now()) + Math.random().toString(36).slice(2, 8),
        message: String(l.message || ""),
        type: l.opts && l.opts.type || "success",
        ttl: l.opts && typeof l.opts.ttl == "number" ? l.opts.ttl : 4e3
      }));
      t((l) => [...r, ...l]);
      try {
        delete window.__pendingToasts;
      } catch {
        window.__pendingToasts = [];
      }
    }
    return window.showToast = function(r, l = {}) {
      const i = String(Date.now()) + Math.random().toString(36).slice(2, 8), s = { id: i, message: String(r || ""), type: l.type || "success", ttl: typeof l.ttl == "number" ? l.ttl : 4e3 };
      return t((o) => [s, ...o]), i;
    }, window.hideToast = function(r) {
      t((l) => l.filter((i) => i.id !== r));
    }, () => {
      try {
        window && typeof window.showToast == "function" && delete window.showToast, window && typeof window.hideToast == "function" && delete window.hideToast;
      } catch {
      }
    };
  }, []), y.useEffect(() => {
    if (!e.length) return;
    const n = e.map((r) => setTimeout(() => {
      t((l) => l.filter((i) => i.id !== r.id));
    }, r.ttl));
    return () => {
      n.forEach(clearTimeout);
    };
  }, [e]), e.length ? /* @__PURE__ */ a.jsx("div", { className: "toaster-container", "aria-live": "polite", "aria-atomic": "true", children: e.map((n) => /* @__PURE__ */ a.jsxs("div", { className: `toast ${n.type === "success" ? "toast-success" : "toast-info"}`, role: "status", children: [
    /* @__PURE__ */ a.jsx("div", { className: "toast-message", children: n.message }),
    /* @__PURE__ */ a.jsx("button", { className: "toast-close", onClick: () => t((r) => r.filter((l) => l.id !== n.id)), "aria-label": "Dismiss", children: "✕" })
  ] }, n.id)) }) : null;
}
function pt({ children: e }) {
  y.useEffect(() => {
    typeof window > "u" || (window.__pendingToasts = window.__pendingToasts || [], typeof window.showToast != "function" && (window.showToast = function(n, r) {
      return window.__pendingToasts.push({ message: n, opts: r || {} }), null;
    }), typeof window.hideToast != "function" && (window.hideToast = function(n) {
      try {
        window.__pendingToasts && (window.__pendingToasts = window.__pendingToasts.filter((r) => r.id !== n));
      } catch {
      }
    }));
  }, []);
  const t = ra();
  return y.useEffect(() => {
    const n = document.getElementById("notifBtn"), r = document.getElementById("notifMenu"), l = document.getElementById("profileBtn"), i = document.getElementById("profileMenu");
    function s(f, m, w) {
      f && (f.classList.toggle("hidden", !w), f.setAttribute("aria-hidden", w ? "false" : "true"), m && m.setAttribute("aria-expanded", w ? "true" : "false"));
    }
    function o() {
      s(r, n, !1), s(i, l, !1);
    }
    function u(f) {
      const m = (w) => w && (w === f.target || w.contains(f.target));
      !m(r) && !m(n) && !m(i) && !m(l) && o();
    }
    function c(f) {
      f.key === "Escape" && o();
    }
    function p(f) {
      f && f.querySelectorAll(".dropdown-item").forEach((m) => {
        m.addEventListener("click", () => o());
      });
    }
    return n && r && (n.addEventListener("click", (f) => {
      f.stopPropagation(), s(i, l, !1), s(r, n, r.classList.contains("hidden"));
    }), p(r)), l && i && (l.addEventListener("click", (f) => {
      f.stopPropagation(), s(r, n, !1), s(i, l, i.classList.contains("hidden"));
    }), p(i)), document.addEventListener("click", u), document.addEventListener("keydown", c), () => {
      document.removeEventListener("click", u), document.removeEventListener("keydown", c);
    };
  }, []), /* @__PURE__ */ a.jsxs(a.Fragment, { children: [
    /* @__PURE__ */ a.jsxs("header", { className: "site-header", children: [
      /* @__PURE__ */ a.jsx("h1", { className: "site-title", children: /* @__PURE__ */ a.jsxs("span", { className: "brand", children: [
        /* @__PURE__ */ a.jsx("img", { className: "brand-logo", src: "https://cdn.builder.io/api/v1/image/assets%2Fa5647e4ccf094d4d939a079b9f892c1c%2F240094ac7d6b4725b685503d97c9d9a3?format=webp&width=64", alt: "FreshBasket logo" }),
        /* @__PURE__ */ a.jsx("span", { className: "brand-name", children: "FreshBasket" })
      ] }) }),
      /* @__PURE__ */ a.jsxs("nav", { className: "site-nav", children: [
        /* @__PURE__ */ a.jsx(Kt, { to: "/dashboard", onClick: (n) => {
          n.preventDefault(), t("/dashboard");
        }, children: "Dashboard" }),
        /* @__PURE__ */ a.jsx(Kt, { to: "/orders", onClick: (n) => {
          n.preventDefault(), t("/orders");
        }, children: "Orders" }),
        /* @__PURE__ */ a.jsx(Kt, { to: "/riders", onClick: (n) => {
          n.preventDefault(), t("/riders");
        }, children: "Riders" }),
        /* @__PURE__ */ a.jsx(Kt, { to: "/reports", onClick: (n) => {
          n.preventDefault(), t("/reports");
        }, children: "Reports" }),
        /* @__PURE__ */ a.jsx("span", { className: "site-nav-spacer" }),
        /* @__PURE__ */ a.jsxs("div", { className: "nav-dropdown", children: [
          /* @__PURE__ */ a.jsx("button", { id: "notifBtn", className: "icon-btn", "aria-haspopup": "true", "aria-expanded": "false", "aria-controls": "notifMenu", "aria-label": "Notifications", title: "Notifications", children: /* @__PURE__ */ a.jsxs("svg", { className: "bell-icon", width: "29", height: "29", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true", children: [
            /* @__PURE__ */ a.jsx("defs", { children: /* @__PURE__ */ a.jsxs("linearGradient", { id: "bellGold", x1: "0", y1: "0", x2: "0", y2: "1", children: [
              /* @__PURE__ */ a.jsx("stop", { offset: "0%", stopColor: "#C08B3E" }),
              /* @__PURE__ */ a.jsx("stop", { offset: "50%", stopColor: "#D4AF37" }),
              /* @__PURE__ */ a.jsx("stop", { offset: "100%", stopColor: "#FFD700" })
            ] }) }),
            /* @__PURE__ */ a.jsx("path", { fill: "url(#bellGold)", d: "M12 22a2 2 0 0 0 1.995-1.85L14 20h-4a2 2 0 0 0 1.85 1.995L12 22Zm8-5h-1a1 1 0 0 1-.707-.293l-.147-.147A3.99 3.99 0 0 1 17 14.172V11a5 5 0 1 0-10 0v3.172a3.99 3.99 0 0 1-1.146 2.388l-.147.147A1 1 0 0 1 5 17H4a1 1 0 1 0 0 2h16a1 1 0 1 0 0-2Z" })
          ] }) }),
          /* @__PURE__ */ a.jsxs("div", { id: "notifMenu", className: "dropdown-menu hidden", role: "menu", "aria-labelledby": "notifBtn", "aria-hidden": "true", children: [
            /* @__PURE__ */ a.jsx("div", { className: "dropdown-header", children: "Notifications" }),
            /* @__PURE__ */ a.jsx("div", { className: "dropdown-item", children: "No new notifications" })
          ] })
        ] }),
        /* @__PURE__ */ a.jsxs("div", { className: "nav-dropdown", children: [
          /* @__PURE__ */ a.jsx("button", { id: "profileBtn", className: "icon-btn", "aria-haspopup": "true", "aria-expanded": "false", "aria-controls": "profileMenu", title: "Profile", children: /* @__PURE__ */ a.jsxs("svg", { className: "avatar", width: "28", height: "28", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
            /* @__PURE__ */ a.jsx("circle", { cx: "12", cy: "7.5", r: "3.5", stroke: "currentColor", strokeWidth: "1.5" }),
            /* @__PURE__ */ a.jsx("path", { d: "M4 20c0-3.314 3.582-6 8-6s8 2.686 8 6", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" })
          ] }) }),
          /* @__PURE__ */ a.jsxs("div", { id: "profileMenu", className: "dropdown-menu hidden", role: "menu", "aria-labelledby": "profileBtn", "aria-hidden": "true", children: [
            /* @__PURE__ */ a.jsx("div", { className: "dropdown-header", children: "Signed in" }),
            /* @__PURE__ */ a.jsx(Kt, { className: "dropdown-item", to: "/riders", onClick: (n) => {
              n.preventDefault(), t("/riders");
            }, children: "Riders" }),
            /* @__PURE__ */ a.jsx(Kt, { className: "dropdown-item", to: "/orders", onClick: (n) => {
              n.preventDefault(), t("/orders");
            }, children: "Orders" }),
            /* @__PURE__ */ a.jsx("form", { method: "POST", action: "/auth/logout", children: /* @__PURE__ */ a.jsx("button", { className: "dropdown-item", type: "submit", children: "Logout" }) })
          ] })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ a.jsx("main", { className: "content", children: e }),
    /* @__PURE__ */ a.jsxs("footer", { className: "site-footer", children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " FreshBasket"
    ] }),
    /* @__PURE__ */ a.jsx(Th, {})
  ] });
}
function Lh({ onClose: e, onCreated: t }) {
  const [n, r] = y.useState(""), [l, i] = y.useState(""), [s, o] = y.useState(""), [u, c] = y.useState(""), [p, f] = y.useState(!1), [m, w] = y.useState(""), [N, k] = y.useState(""), [P, v] = y.useState(!1), [d, h] = y.useState(!1), [g, x] = y.useState(!1), [C, S] = y.useState(!1);
  async function L() {
    w(""), k(""), S(!0);
    const I = String(n).trim(), _ = String(l), z = String(s).trim(), j = String(u).trim(), U = j.replace(/\D+/g, ""), F = { fn: !z, cn: !j, pw: !_ };
    if (v(F.fn), h(F.cn || U.length < 7), x(F.pw), F.fn || F.cn || F.pw) {
      w("Full name, mobile and password are required");
      return;
    }
    if (U.length < 7) {
      w("Please enter a valid mobile number"), h(!0);
      return;
    }
    if (I && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(I)) {
      w("Please enter a valid email");
      return;
    }
    if (_.length < 6) {
      x(!0), w("Password must be at least 6 characters");
      return;
    }
    f(!0);
    try {
      const V = await fetch("/api/mobile/register", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: I, password: _, fullName: z, contactNumber: j })
      }), B = await V.json().catch(() => null);
      if (!V.ok) {
        const K = String(B && (B.error || B.message) || ""), T = K.toUpperCase();
        if (/MISSING\s*FULLNAME\/CONTACTNUMBER/i.test(K) || /MISSING\s*EMAIL\/PASSWORD/i.test(K))
          w("Full name, mobile and password are required"), v(!z), h(!j || U.length < 7), x(!_);
        else if (T.includes("EMAIL_EXISTS"))
          w("An account with this email already exists. Use a different email or leave email blank.");
        else if (T.includes("INVALID_EMAIL"))
          w("Please enter a valid email");
        else if (T.includes("WEAK_PASSWORD") || /AT LEAST 6 CHARACTERS/i.test(K))
          x(!0), w("Password must be at least 6 characters");
        else if (/INVALID CONTACT NUMBER/i.test(K))
          h(!0), w("Please enter a valid mobile number");
        else if (/FIREBASE NOT CONFIGURED/i.test(K))
          w("Service temporarily unavailable. Please try again later.");
        else
          throw new Error(K || "Failed to create rider");
        return;
      }
      k("Rider created successfully"), t && t(), setTimeout(() => {
        e && e();
      }, 600);
    } catch (V) {
      const B = String((V == null ? void 0 : V.message) || "");
      /Missing\s*(fullName\/contactNumber|email\/password)/i.test(B) ? w("Full name, mobile and password are required") : /EMAIL_EXISTS/i.test(B) ? w("An account with this email already exists. Use a different email or leave email blank.") : /INVALID_EMAIL/i.test(B) ? w("Please enter a valid email") : /WEAK_PASSWORD/i.test(B) || /AT LEAST 6 CHARACTERS/i.test(B) ? (x(!0), w("Password must be at least 6 characters")) : /INVALID CONTACT NUMBER/i.test(B) ? (h(!0), w("Please enter a valid mobile number")) : w(B || "Failed to create rider");
    } finally {
      f(!1);
    }
  }
  return /* @__PURE__ */ a.jsx("div", { className: "create-rider-backdrop", role: "dialog", "aria-modal": "true", children: /* @__PURE__ */ a.jsxs("div", { className: "create-rider-modal", children: [
    /* @__PURE__ */ a.jsxs("header", { className: "create-rider-header", children: [
      /* @__PURE__ */ a.jsx("h3", { className: "create-rider-title", children: "Create Rider" }),
      /* @__PURE__ */ a.jsx("button", { className: "create-rider-close", onClick: e, "aria-label": "Close", children: "✕" })
    ] }),
    /* @__PURE__ */ a.jsxs("div", { className: "create-rider-body", children: [
      N && /* @__PURE__ */ a.jsx("div", { className: "auth-success", children: N }),
      /* @__PURE__ */ a.jsxs("label", { className: "field-label", children: [
        "Full name",
        /* @__PURE__ */ a.jsx("input", { className: "field-input" + (C && !String(s).trim() ? " input-error" : ""), value: s, onChange: (I) => {
          o(I.target.value), C && v(!String(I.target.value).trim());
        }, required: !0 })
      ] }),
      /* @__PURE__ */ a.jsxs("label", { className: "field-label", children: [
        "Email",
        /* @__PURE__ */ a.jsx("input", { className: "field-input", type: "email", value: n, onChange: (I) => {
          r(I.target.value);
        } })
      ] }),
      /* @__PURE__ */ a.jsxs("label", { className: "field-label", children: [
        "Password",
        /* @__PURE__ */ a.jsx("input", { className: "field-input" + (C && !String(l) ? " input-error" : ""), type: "password", value: l, onChange: (I) => {
          i(I.target.value), C && x(!String(I.target.value));
        }, required: !0 })
      ] }),
      /* @__PURE__ */ a.jsxs("label", { className: "field-label", children: [
        "Contact number",
        /* @__PURE__ */ a.jsx("input", { className: "field-input" + (C && String(u).trim().replace(/\D+/g, "").length < 7 ? " input-error" : ""), type: "tel", inputMode: "tel", pattern: "[0-9+()\\-\\s]{7,}", value: u, onChange: (I) => {
          if (c(I.target.value), C) {
            const _ = String(I.target.value).trim().replace(/\D+/g, "");
            h(!(_.length >= 7));
          }
        }, required: !0 })
      ] }),
      m && /* @__PURE__ */ a.jsx("div", { className: "auth-error", children: m }),
      /* @__PURE__ */ a.jsxs("div", { className: "create-rider-actions", children: [
        /* @__PURE__ */ a.jsx("button", { className: "btn-secondary", onClick: e, disabled: p, children: "Cancel" }),
        /* @__PURE__ */ a.jsx("button", { className: "btn-primary", onClick: L, disabled: p, children: p ? "Creating…" : "Create" })
      ] })
    ] })
  ] }) });
}
function Rh() {
  const [e, t] = y.useState([]), [n, r] = y.useState(""), [l, i] = y.useState("all"), [s, o] = y.useState("all"), [u, c] = y.useState("all"), [p, f] = y.useState(!0), [m, w] = y.useState(""), [N, k] = y.useState(1), [P, v] = y.useState(20), [d, h] = y.useState({ total: 0, page: 1, limit: 20, pages: 1 }), [g, x] = y.useState(!1);
  y.useEffect(() => {
    let S = !0;
    return (async () => {
      var L, I, _, z;
      f(!0), w("");
      try {
        const j = new URLSearchParams();
        n && j.set("q", n), u !== "all" && j.set("status", u), l !== "all" && j.set("lastDays", l), j.set("page", String(N)), j.set("limit", String(P));
        const U = await fetch(`/api/riders?${j.toString()}`, { credentials: "include" });
        if (U.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!U.ok) throw new Error("Failed to load riders");
        const F = await U.json();
        S && (t(Array.isArray(F.riders) ? F.riders : []), h({ total: ((L = F.meta) == null ? void 0 : L.total) || 0, page: ((I = F.meta) == null ? void 0 : I.page) || 1, limit: ((_ = F.meta) == null ? void 0 : _.limit) || P, pages: ((z = F.meta) == null ? void 0 : z.pages) || 1 }));
      } catch (j) {
        S && w(j.message || "Failed to load riders");
      } finally {
        S && f(!1);
      }
    })(), () => {
      S = !1;
    };
  }, [n, u, l, N, P]);
  const C = y.useMemo(() => e.filter((S) => {
    if (n && !S.name.toLowerCase().includes(n.toLowerCase().trim()) || u !== "all" && S.status !== u || s !== "all" && String(S.id) !== String(s)) return !1;
    if (l !== "all") {
      const L = parseInt(S.lastActiveDays, 10) || 9999, I = parseInt(l, 10);
      if (!(L <= I)) return !1;
    }
    return !0;
  }), [e, n, u, s, l]);
  return /* @__PURE__ */ a.jsx(pt, { children: /* @__PURE__ */ a.jsxs("section", { className: "rider-commissions", children: [
    /* @__PURE__ */ a.jsxs("header", { className: "rc-header riders-header", children: [
      /* @__PURE__ */ a.jsxs("div", { className: "riders-header-left", children: [
        /* @__PURE__ */ a.jsx("h2", { className: "rc-title", children: "Rider Commissions" }),
        /* @__PURE__ */ a.jsx("p", { className: "rc-subtitle", children: "View and manage rider commissions based on performance and distance traveled." })
      ] }),
      /* @__PURE__ */ a.jsx("div", { className: "riders-header-right", children: /* @__PURE__ */ a.jsx("button", { className: "btn-secondary btn-create-rider", onClick: () => x(!0), children: "Create Rider" }) })
    ] }),
    /* @__PURE__ */ a.jsxs("div", { className: "rc-toolbar", children: [
      /* @__PURE__ */ a.jsxs("div", { className: "rc-search", children: [
        /* @__PURE__ */ a.jsx("span", { className: "rc-search-icon", "aria-hidden": "true" }),
        /* @__PURE__ */ a.jsx("input", { className: "rc-search-input", type: "search", placeholder: "Search", value: n, onChange: (S) => {
          r(S.target.value), k(1);
        } })
      ] }),
      /* @__PURE__ */ a.jsxs("div", { className: "rc-filters", children: [
        /* @__PURE__ */ a.jsxs("select", { className: "rc-select rc-select-arrow rc-chip", value: l, onChange: (S) => {
          i(S.target.value), k(1);
        }, children: [
          /* @__PURE__ */ a.jsx("option", { value: "all", children: "Date Range" }),
          /* @__PURE__ */ a.jsx("option", { value: "7", children: "Last 7 days" }),
          /* @__PURE__ */ a.jsx("option", { value: "30", children: "Last 30 days" })
        ] }),
        /* @__PURE__ */ a.jsxs("select", { className: "rc-select rc-select-arrow rc-chip", value: s, onChange: (S) => o(S.target.value), children: [
          /* @__PURE__ */ a.jsx("option", { value: "all", children: "Rider" }),
          e.map((S) => /* @__PURE__ */ a.jsx("option", { value: S.id, children: S.name }, S.id))
        ] }),
        /* @__PURE__ */ a.jsxs("select", { className: "rc-select rc-select-arrow rc-chip", value: u, onChange: (S) => {
          c(S.target.value), k(1);
        }, children: [
          /* @__PURE__ */ a.jsx("option", { value: "all", children: "Status" }),
          /* @__PURE__ */ a.jsx("option", { value: "Active", children: "Active" }),
          /* @__PURE__ */ a.jsx("option", { value: "Inactive", children: "Inactive" })
        ] })
      ] }),
      /* @__PURE__ */ a.jsx("select", { className: "rc-select rc-select-arrow rc-chip", value: P, onChange: (S) => {
        v(parseInt(S.target.value, 10)), k(1);
      }, children: [10, 20, 50, 100].map((S) => /* @__PURE__ */ a.jsxs("option", { value: S, children: [
        S,
        "/page"
      ] }, S)) })
    ] }),
    /* @__PURE__ */ a.jsxs("div", { className: "rc-table-wrapper", children: [
      g && /* @__PURE__ */ a.jsx(Lh, { onClose: () => x(!1), onCreated: () => {
        window.location.reload();
      } }),
      /* @__PURE__ */ a.jsxs("table", { className: "rc-table", children: [
        /* @__PURE__ */ a.jsx("thead", { children: /* @__PURE__ */ a.jsxs("tr", { children: [
          /* @__PURE__ */ a.jsx("th", { className: "col-name", children: "Rider Name" }),
          /* @__PURE__ */ a.jsx("th", { className: "col-km", children: "Total KM Traveled" }),
          /* @__PURE__ */ a.jsx("th", { className: "col-perf", children: "Delivery Performance" }),
          /* @__PURE__ */ a.jsx("th", { className: "col-comm", children: "Commission Earned" })
        ] }) }),
        /* @__PURE__ */ a.jsxs("tbody", { children: [
          p && /* @__PURE__ */ a.jsx("tr", { children: /* @__PURE__ */ a.jsx("td", { colSpan: 4, className: "section-note", children: "Loading…" }) }),
          !p && m && /* @__PURE__ */ a.jsx("tr", { children: /* @__PURE__ */ a.jsx("td", { colSpan: 4, className: "auth-error", children: m }) }),
          !p && !m && C.map((S) => /* @__PURE__ */ a.jsxs("tr", { "data-rider-id": S.id, "data-status": S.status, "data-last-days": S.lastActiveDays, children: [
            /* @__PURE__ */ a.jsx("td", { className: "rc-col-name", children: /* @__PURE__ */ a.jsx("a", { className: "rider-name-link", href: `/riders/${S.id}`, children: S.name }) }),
            /* @__PURE__ */ a.jsxs("td", { className: "rc-col-km", children: [
              S.totalKm,
              " ",
              /* @__PURE__ */ a.jsx("span", { className: "rc-km-unit", children: "km" })
            ] }),
            /* @__PURE__ */ a.jsx("td", { className: "rc-col-perf", children: /* @__PURE__ */ a.jsxs("div", { className: "rc-progress", children: [
              /* @__PURE__ */ a.jsx("progress", { max: "100", value: S.performance, className: "rc-progress-bar" }),
              /* @__PURE__ */ a.jsx("span", { className: "rc-progress-value", children: S.performance })
            ] }) }),
            /* @__PURE__ */ a.jsxs("td", { className: "rc-col-commission", children: [
              "$",
              S.commissionUsd
            ] })
          ] }, S.id)),
          !p && !m && C.length === 0 && /* @__PURE__ */ a.jsx("tr", { children: /* @__PURE__ */ a.jsx("td", { colSpan: 4, className: "section-note", children: "No riders found." }) })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ a.jsx("div", { className: "rc-toolbar", "aria-label": "pagination", children: /* @__PURE__ */ a.jsxs("div", { className: "rc-filters", children: [
      /* @__PURE__ */ a.jsx("button", { className: "rc-select rc-chip", disabled: d.page <= 1 || p, onClick: () => k((S) => Math.max(1, S - 1)), children: "Prev" }),
      /* @__PURE__ */ a.jsxs("span", { className: "section-note", children: [
        "Page ",
        d.page,
        " of ",
        d.pages,
        " • ",
        d.total,
        " total"
      ] }),
      /* @__PURE__ */ a.jsx("button", { className: "rc-select rc-chip", disabled: d.page >= d.pages || p, onClick: () => k((S) => Math.min(d.pages, S + 1)), children: "Next" })
    ] }) })
  ] }) });
}
function Ih() {
  const { id: e } = bp(), [t, n] = y.useState(null), [r, l] = y.useState(!0), [i, s] = y.useState("");
  if (y.useEffect(() => {
    let p = !0;
    return (async () => {
      l(!0), s("");
      try {
        const f = await fetch(`/api/riders/${e}`, { credentials: "include" });
        if (f.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!f.ok) throw new Error("Failed to load rider");
        const m = await f.json();
        p && n(m);
      } catch (f) {
        p && s(f.message || "Failed to load rider");
      } finally {
        p && l(!1);
      }
    })(), () => {
      p = !1;
    };
  }, [e]), r)
    return /* @__PURE__ */ a.jsx(pt, { children: /* @__PURE__ */ a.jsx("section", { className: "section-page", children: /* @__PURE__ */ a.jsx("div", { className: "section-note", children: "Loading…" }) }) });
  if (i)
    return /* @__PURE__ */ a.jsx(pt, { children: /* @__PURE__ */ a.jsx("section", { className: "section-page", children: /* @__PURE__ */ a.jsx("div", { className: "auth-error", children: i }) }) });
  if (!t)
    return /* @__PURE__ */ a.jsx(pt, { children: /* @__PURE__ */ a.jsx("section", { className: "section-page", children: /* @__PURE__ */ a.jsx("div", { className: "section-note", children: "Not found" }) }) });
  const { rider: o, metrics: u, history: c } = t;
  return /* @__PURE__ */ a.jsx(pt, { children: /* @__PURE__ */ a.jsxs("section", { className: "rider-commissions", children: [
    /* @__PURE__ */ a.jsxs("header", { className: "rc-header", children: [
      /* @__PURE__ */ a.jsx("h2", { className: "rc-title", children: "Rider Profile" }),
      /* @__PURE__ */ a.jsx("p", { className: "rc-subtitle", children: "View detailed performance metrics for individual riders." })
    ] }),
    /* @__PURE__ */ a.jsx("div", { className: "rc-table-wrapper rp-card", children: /* @__PURE__ */ a.jsxs("div", { className: "rp-details", children: [
      /* @__PURE__ */ a.jsx("img", { src: "https://cdn.builder.io/api/v1/image/assets%2Fa5647e4ccf094d4d939a079b9f892c1c%2Ff54e0df2f0fb4bff9c894340e2efe67a?format=webp&width=72", alt: "avatar", className: "rp-avatar" }),
      /* @__PURE__ */ a.jsxs("div", { children: [
        /* @__PURE__ */ a.jsx("h3", { className: "rp-name", children: o.name }),
        /* @__PURE__ */ a.jsxs("div", { className: "section-note", children: [
          "Rider ID: ",
          o.id
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ a.jsx("div", { className: "rc-toolbar rp-stats", children: /* @__PURE__ */ a.jsxs("div", { className: "rc-filters rp-stats-wrap", children: [
      /* @__PURE__ */ a.jsxs("div", { className: "rc-select rc-chip", children: [
        "Total Deliveries ",
        /* @__PURE__ */ a.jsx("strong", { children: u.totalDeliveries })
      ] }),
      /* @__PURE__ */ a.jsxs("div", { className: "rc-select rc-chip", children: [
        "Avg. Delivery Time ",
        /* @__PURE__ */ a.jsxs("strong", { children: [
          u.avgDeliveryMins,
          " mins"
        ] })
      ] }),
      /* @__PURE__ */ a.jsxs("div", { className: "rc-select rc-chip", children: [
        "On-Time Rate ",
        /* @__PURE__ */ a.jsxs("strong", { children: [
          u.onTimeRate,
          "%"
        ] })
      ] }),
      /* @__PURE__ */ a.jsxs("div", { className: "rc-select rc-chip", children: [
        "Total KM Traveled ",
        /* @__PURE__ */ a.jsxs("strong", { children: [
          u.totalKm,
          " km"
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ a.jsx("div", { className: "rc-table-wrapper", children: /* @__PURE__ */ a.jsxs("table", { className: "rc-table", children: [
      /* @__PURE__ */ a.jsx("thead", { children: /* @__PURE__ */ a.jsxs("tr", { children: [
        /* @__PURE__ */ a.jsx("th", { className: "col-name", children: "Date" }),
        /* @__PURE__ */ a.jsx("th", { className: "col-km", children: "Deliveries" }),
        /* @__PURE__ */ a.jsx("th", { className: "col-perf", children: "Avg. Delivery Time" }),
        /* @__PURE__ */ a.jsx("th", { className: "col-comm", children: "Distance (KM)" })
      ] }) }),
      /* @__PURE__ */ a.jsx("tbody", { children: (c || []).map((p, f) => /* @__PURE__ */ a.jsxs("tr", { children: [
        /* @__PURE__ */ a.jsx("td", { className: "rc-col-name", children: p.date }),
        /* @__PURE__ */ a.jsx("td", { className: "rc-col-km", children: p.deliveries }),
        /* @__PURE__ */ a.jsxs("td", { className: "rc-col-perf", children: [
          p.avgTime,
          " mins"
        ] }),
        /* @__PURE__ */ a.jsxs("td", { className: "rc-col-commission", children: [
          p.distanceKm,
          " km"
        ] })
      ] }, f)) })
    ] }) })
  ] }) });
}
function Kc({ orderId: e, onClose: t, onAssigned: n }) {
  const [r, l] = y.useState([]), [i, s] = y.useState(!0), [o, u] = y.useState(""), [c, p] = y.useState(null);
  y.useEffect(() => {
    let m = !0;
    return (async () => {
      s(!0), u("");
      try {
        const w = await fetch("/api/riders?limit=200", { credentials: "include" });
        if (w.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!w.ok) throw new Error("Failed to load riders");
        const N = await w.json();
        m && l(Array.isArray(N.riders) ? N.riders : N.riders || []);
      } catch (w) {
        m && u(w.message || "Failed to load riders");
      } finally {
        m && s(!1);
      }
    })(), () => {
      m = !1;
    };
  }, []);
  async function f(m) {
    if (!(!e || !m)) {
      p(m);
      try {
        const w = await fetch(`/api/orders/${encodeURIComponent(e)}/assign`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ riderId: m })
        });
        if (w.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        const N = await w.json().catch(() => null);
        if (!w.ok) throw new Error(N && N.error ? N.error : "Assign failed");
        n && n({ orderId: e, riderId: m }), t();
      } catch (w) {
        alert(w.message || "Failed to assign rider");
      } finally {
        p(null);
      }
    }
  }
  return /* @__PURE__ */ a.jsx("div", { className: "assign-modal-backdrop", role: "dialog", "aria-modal": "true", children: /* @__PURE__ */ a.jsxs("div", { className: "assign-modal", children: [
    /* @__PURE__ */ a.jsxs("header", { className: "assign-modal-header", children: [
      /* @__PURE__ */ a.jsx("h3", { className: "assign-modal-title", children: "Assign Rider" }),
      /* @__PURE__ */ a.jsx("button", { className: "assign-modal-close", onClick: t, "aria-label": "Close", children: "✕" })
    ] }),
    /* @__PURE__ */ a.jsxs("div", { className: "assign-modal-body", children: [
      i && /* @__PURE__ */ a.jsx("div", { className: "section-note", children: "Loading riders…" }),
      o && /* @__PURE__ */ a.jsx("div", { className: "auth-error", children: o }),
      !i && !o && /* @__PURE__ */ a.jsxs("table", { className: "assign-table", children: [
        /* @__PURE__ */ a.jsx("thead", { children: /* @__PURE__ */ a.jsxs("tr", { children: [
          /* @__PURE__ */ a.jsx("th", { children: "Name" }),
          /* @__PURE__ */ a.jsx("th", { children: "Last Active (days)" }),
          /* @__PURE__ */ a.jsx("th", { children: "Action" })
        ] }) }),
        /* @__PURE__ */ a.jsxs("tbody", { children: [
          r.map((m) => /* @__PURE__ */ a.jsxs("tr", { children: [
            /* @__PURE__ */ a.jsx("td", { children: m.name }),
            /* @__PURE__ */ a.jsx("td", { children: m.lastActiveDays ?? "-" }),
            /* @__PURE__ */ a.jsx("td", { children: /* @__PURE__ */ a.jsx("button", { className: "btn-assign", onClick: () => f(m.id), disabled: c && c !== m.id, children: c === m.id ? "Assigning…" : "Assign" }) })
          ] }, m.id)),
          r.length === 0 && /* @__PURE__ */ a.jsx("tr", { children: /* @__PURE__ */ a.jsx("td", { colSpan: 3, className: "section-note", children: "No riders found." }) })
        ] })
      ] })
    ] })
  ] }) });
}
function ui(e) {
  return (Array.isArray(e.tags) ? e.tags : typeof e.tags == "string" ? e.tags.split(",") : []).join(",").toLowerCase().includes("assigned") ? "assigned" : e.fulfillment_status === "fulfilled" ? "delivered" : e.fulfillment_status === "partial" ? "in-transit" : "new";
}
function zh() {
  const [e, t] = y.useState([]), [n, r] = y.useState(""), [l, i] = y.useState("all"), [s, o] = y.useState(1), [u, c] = y.useState(20), [p, f] = y.useState({ total: 0, page: 1, limit: 20, pages: 1 }), [m, w] = y.useState(!0), [N, k] = y.useState(""), [P, v] = y.useState(""), [d, h] = y.useState(!0), [g, x] = y.useState(!1), [C, S] = y.useState(null);
  y.useEffect(() => {
    let j = !0;
    return (async () => {
      var U, F, V, B;
      w(!0), k(""), v("");
      try {
        const K = new URLSearchParams();
        n && K.set("q", n), l && l !== "all" && K.set("status", l), K.set("page", String(s)), K.set("limit", String(u));
        const T = await fetch(`/api/orders?${K.toString()}`, { credentials: "include" });
        if (T.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!T.ok) throw new Error("Failed to load orders");
        const O = await T.json();
        j && (t(Array.isArray(O.orders) ? O.orders : []), v(O.shopifyError || ""), h(!!O.shopifyConfigured), f({ total: ((U = O.meta) == null ? void 0 : U.total) || 0, page: ((F = O.meta) == null ? void 0 : F.page) || 1, limit: ((V = O.meta) == null ? void 0 : V.limit) || u, pages: ((B = O.meta) == null ? void 0 : B.pages) || 1 }));
      } catch (K) {
        j && k(K.message || "Failed to load orders");
      } finally {
        j && w(!1);
      }
    })(), () => {
      j = !1;
    };
  }, [n, l, s, u]);
  const L = y.useMemo(() => e, [e]), I = y.useMemo(() => Array.isArray(e) ? l === "all" ? e.filter((j) => ui(j) !== "assigned") : e.filter((j) => ui(j) === l) : [], [e, l]);
  function _() {
    S(null), x(!1);
  }
  function z(j) {
    try {
      const { orderId: U } = j || {};
      if (!U) return;
      const F = String(U).replace(/^#+/, "");
      t((V) => V.filter((B) => String(B.name || B.order_number || B.id).replace(/^#+/, "") !== String(F))), f((V) => ({ ...V || {}, total: Math.max(0, ((V == null ? void 0 : V.total) || 0) - 1) }));
      try {
        window && typeof window.showToast == "function" && window.showToast(`Order assigned: ${U}`, { type: "success" });
      } catch {
      }
    } catch {
    }
  }
  return /* @__PURE__ */ a.jsx(pt, { children: /* @__PURE__ */ a.jsxs("section", { className: "rider-commissions", children: [
    /* @__PURE__ */ a.jsxs("header", { className: "rc-header", children: [
      /* @__PURE__ */ a.jsx("h2", { className: "rc-title", children: "Order Management" }),
      /* @__PURE__ */ a.jsx("p", { className: "rc-subtitle", children: "Manage orders synced from Shopify." })
    ] }),
    /* @__PURE__ */ a.jsxs("div", { className: "rc-toolbar", children: [
      /* @__PURE__ */ a.jsxs("div", { className: "rc-search", children: [
        /* @__PURE__ */ a.jsx("span", { className: "rc-search-icon", "aria-hidden": "true" }),
        /* @__PURE__ */ a.jsx("input", { className: "rc-search-input", type: "search", placeholder: "Search", value: n, onChange: (j) => {
          r(j.target.value), o(1);
        } })
      ] }),
      /* @__PURE__ */ a.jsxs("div", { className: "rc-filters", children: [
        ["all", "new", "assigned", "in-transit", "delivered"].map((j) => /* @__PURE__ */ a.jsx("button", { className: `rc-select rc-chip${l === j ? " active" : ""}`, onClick: () => {
          i(j), o(1);
        }, "data-filter": j, children: j === "all" ? "All" : j.replace("-", " ") }, j)),
        /* @__PURE__ */ a.jsx("select", { className: "rc-select rc-select-arrow rc-chip", value: u, onChange: (j) => {
          c(parseInt(j.target.value, 10)), o(1);
        }, children: [10, 20, 50, 100].map((j) => /* @__PURE__ */ a.jsxs("option", { value: j, children: [
          j,
          "/page"
        ] }, j)) })
      ] })
    ] }),
    !d && /* @__PURE__ */ a.jsx("div", { className: "section-note", children: "Shopify is not configured. Set SHOPIFY_SHOP and SHOPIFY_ADMIN_TOKEN to enable orders sync." }),
    P && /* @__PURE__ */ a.jsx("div", { className: "auth-error", children: P }),
    /* @__PURE__ */ a.jsx("div", { className: "rc-table-wrapper", children: /* @__PURE__ */ a.jsxs("table", { className: "rc-table", children: [
      /* @__PURE__ */ a.jsx("thead", { children: /* @__PURE__ */ a.jsxs("tr", { children: [
        /* @__PURE__ */ a.jsx("th", { className: "col-name", children: "Order #" }),
        /* @__PURE__ */ a.jsx("th", { className: "col-km", children: "Customer" }),
        /* @__PURE__ */ a.jsx("th", { className: "col-perf", children: "Address" }),
        /* @__PURE__ */ a.jsx("th", { className: "col-rider", children: "Rider" }),
        /* @__PURE__ */ a.jsx("th", { className: "col-expected", children: "Expected Time" }),
        /* @__PURE__ */ a.jsx("th", { className: "col-actual", children: "Actual Time" }),
        /* @__PURE__ */ a.jsx("th", { className: "col-status", children: "Status" })
      ] }) }),
      /* @__PURE__ */ a.jsxs("tbody", { children: [
        m && /* @__PURE__ */ a.jsx("tr", { children: /* @__PURE__ */ a.jsx("td", { colSpan: 7, className: "section-note", children: "Loading…" }) }),
        !m && N && /* @__PURE__ */ a.jsx("tr", { children: /* @__PURE__ */ a.jsx("td", { colSpan: 7, className: "auth-error", children: N }) }),
        !m && !N && I.map((j, U) => {
          var T;
          const F = ui(j), V = j.full_name || (j.customer && j.customer.full_name ? j.customer.full_name : "");
          let B = "-";
          typeof j.shipping_address == "string" && String(j.shipping_address).trim() ? B = String(j.shipping_address).trim() : j.shipping_address && typeof j.shipping_address == "object" ? B = [j.shipping_address.address1 || "", j.shipping_address.city || "", j.shipping_address.province || "", j.shipping_address.country || ""].map((O) => String(O || "").trim()).filter(Boolean).join(", ") || "-" : typeof j.billing_address == "string" && String(j.billing_address).trim() ? B = String(j.billing_address).trim() : j.billing_address && typeof j.billing_address == "object" && (B = [j.billing_address.address1 || "", j.billing_address.city || "", j.billing_address.province || "", j.billing_address.country || ""].map((O) => String(O || "").trim()).filter(Boolean).join(", ") || "-");
          const K = j.name || j.order_number || j.id;
          return /* @__PURE__ */ a.jsxs("tr", { "data-status": F, children: [
            /* @__PURE__ */ a.jsx("td", { className: "rc-col-name", children: K }),
            /* @__PURE__ */ a.jsx("td", { className: "rc-col-km", children: V || "-" }),
            /* @__PURE__ */ a.jsx("td", { className: "rc-col-perf", children: B }),
            /* @__PURE__ */ a.jsx("td", { className: "rc-col-rider", children: j.rider ? String(j.rider) : (T = j.assignment) != null && T.riderId ? String(j.assignment.riderId) : "Unassigned" }),
            /* @__PURE__ */ a.jsx("td", { className: "rc-col-expected", children: j.expected_delivery_time ? new Date(j.expected_delivery_time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "-" }),
            /* @__PURE__ */ a.jsx("td", { className: "rc-col-actual", children: j.actual_delivery_time ? new Date(j.actual_delivery_time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "-" }),
            /* @__PURE__ */ a.jsx("td", { className: "rc-col-status", children: /* @__PURE__ */ a.jsx("span", { className: `status-chip status-${F}`, children: F.replace("-", " ") }) })
          ] }, K || U);
        }),
        !m && !N && L.length === 0 && /* @__PURE__ */ a.jsx("tr", { children: /* @__PURE__ */ a.jsx("td", { colSpan: 7, className: "section-note", children: "No orders to display." }) })
      ] })
    ] }) }),
    /* @__PURE__ */ a.jsxs("div", { className: "rc-toolbar", "aria-label": "pagination", children: [
      g && C && /* @__PURE__ */ a.jsx(Kc, { orderId: C, onClose: _, onAssigned: z }),
      /* @__PURE__ */ a.jsxs("div", { className: "rc-filters", children: [
        /* @__PURE__ */ a.jsx("button", { className: "rc-select rc-chip", disabled: p.page <= 1 || m, onClick: () => o((j) => Math.max(1, j - 1)), children: "Prev" }),
        /* @__PURE__ */ a.jsxs("span", { className: "section-note", children: [
          "Page ",
          p.page,
          " of ",
          p.pages,
          " • ",
          p.total,
          " total"
        ] }),
        /* @__PURE__ */ a.jsx("button", { className: "rc-select rc-chip", disabled: p.page >= p.pages || m, onClick: () => o((j) => Math.min(p.pages, j + 1)), children: "Next" })
      ] })
    ] })
  ] }) });
}
function Oh() {
  const [e, t] = y.useState({ totalDeliveries: 0, avgDeliveryMins: 0 }), [n, r] = y.useState([]), [l, i] = y.useState(!1), [s, o] = y.useState(!0), [u, c] = y.useState("");
  return y.useEffect(() => {
    let p = !0;
    return (async () => {
      o(!0), c("");
      try {
        const f = await fetch("/api/reports", { credentials: "include" });
        if (f.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!f.ok) throw new Error("Failed to load reports");
        const m = await f.json();
        p && (t(m.metrics || { totalDeliveries: 0, avgDeliveryMins: 0 }), r(Array.isArray(m.deliveries) ? m.deliveries : []));
      } catch (f) {
        p && c(f.message || "Failed to load reports");
      } finally {
        p && o(!1);
      }
    })(), () => {
      p = !1;
    };
  }, []), /* @__PURE__ */ a.jsx(pt, { children: /* @__PURE__ */ a.jsxs("section", { className: "rider-commissions", children: [
    /* @__PURE__ */ a.jsxs("header", { className: "rc-header", children: [
      /* @__PURE__ */ a.jsx("h2", { className: "rc-title", children: "Reporting & Analytics" }),
      /* @__PURE__ */ a.jsx("p", { className: "rc-subtitle", children: "Gain insights into your delivery operations with detailed reports and visualizations." })
    ] }),
    /* @__PURE__ */ a.jsx("div", { className: "rc-toolbar", children: /* @__PURE__ */ a.jsxs("div", { className: "rc-filters", children: [
      /* @__PURE__ */ a.jsx("button", { className: "rc-select rc-chip", "data-tab": "overview", children: "Overview" }),
      /* @__PURE__ */ a.jsx("button", { className: "rc-select rc-chip", "data-tab": "performance", children: "Performance" }),
      /* @__PURE__ */ a.jsx("button", { className: "rc-select rc-chip", "data-tab": "custom", children: "Custom Reports" })
    ] }) }),
    /* @__PURE__ */ a.jsxs("div", { id: "tab-overview", children: [
      /* @__PURE__ */ a.jsxs("div", { className: "rc-table-wrapper reports-overview", children: [
        /* @__PURE__ */ a.jsxs("div", { className: "rc-select rc-chip block-chip", children: [
          /* @__PURE__ */ a.jsx("div", { className: "section-title reports-stat-title", children: "Total Deliveries" }),
          /* @__PURE__ */ a.jsx("div", { className: "reports-stat-value", children: e.totalDeliveries })
        ] }),
        /* @__PURE__ */ a.jsxs("div", { className: "rc-select rc-chip block-chip", children: [
          /* @__PURE__ */ a.jsx("div", { className: "section-title reports-stat-title", children: "Average Delivery Time" }),
          /* @__PURE__ */ a.jsxs("div", { className: "reports-stat-value", children: [
            e.avgDeliveryMins,
            " mins"
          ] })
        ] })
      ] }),
      /* @__PURE__ */ a.jsxs("div", { className: "rc-toolbar reports-toolbar-center", children: [
        /* @__PURE__ */ a.jsx("div", { className: "section-title reports-stat-title", children: "Delivery Data" }),
        /* @__PURE__ */ a.jsxs("label", { className: "rc-select rc-chip toggle-data-label", children: [
          /* @__PURE__ */ a.jsx("input", { type: "checkbox", checked: l, onChange: (p) => i(p.target.checked) }),
          " Show Delivery Data Table"
        ] })
      ] }),
      l && /* @__PURE__ */ a.jsx("div", { className: "rc-table-wrapper", children: /* @__PURE__ */ a.jsxs("table", { className: "rc-table", children: [
        /* @__PURE__ */ a.jsx("thead", { children: /* @__PURE__ */ a.jsxs("tr", { children: [
          /* @__PURE__ */ a.jsx("th", { className: "col-name", children: "Order Number" }),
          /* @__PURE__ */ a.jsx("th", { className: "col-km", children: "Rider Assigned" }),
          /* @__PURE__ */ a.jsx("th", { className: "col-perf", children: "Expected Time" }),
          /* @__PURE__ */ a.jsx("th", { className: "col-perf", children: "Actual Delivery Time" }),
          /* @__PURE__ */ a.jsx("th", { className: "col-perf", children: "Distance Traveled" }),
          /* @__PURE__ */ a.jsx("th", { className: "col-comm", children: "Status" })
        ] }) }),
        /* @__PURE__ */ a.jsxs("tbody", { children: [
          !s && !u && n.map((p, f) => /* @__PURE__ */ a.jsxs("tr", { children: [
            /* @__PURE__ */ a.jsxs("td", { className: "rc-col-name", children: [
              "#",
              p.orderNumber || p.orderId
            ] }),
            /* @__PURE__ */ a.jsx("td", { className: "rc-col-km", children: p.riderId || "-" }),
            /* @__PURE__ */ a.jsx("td", { className: "rc-col-perf", children: p.expectedMinutes != null ? `${p.expectedMinutes} mins` : "-" }),
            /* @__PURE__ */ a.jsx("td", { className: "rc-col-perf", children: p.durationMins != null ? `${p.durationMins} mins` : "-" }),
            /* @__PURE__ */ a.jsx("td", { className: "rc-col-perf", children: "-" }),
            /* @__PURE__ */ a.jsx("td", { className: "rc-col-commission", children: p.status || "new" })
          ] }, p.orderId || f)),
          !s && !u && n.length === 0 && /* @__PURE__ */ a.jsx("tr", { children: /* @__PURE__ */ a.jsx("td", { colSpan: 6, className: "section-note", children: "No data." }) }),
          s && /* @__PURE__ */ a.jsx("tr", { children: /* @__PURE__ */ a.jsx("td", { colSpan: 6, className: "section-note", children: "Loading…" }) }),
          u && /* @__PURE__ */ a.jsx("tr", { children: /* @__PURE__ */ a.jsx("td", { colSpan: 6, className: "auth-error", children: u }) })
        ] })
      ] }) })
    ] })
  ] }) });
}
function Dh() {
  const [e, t] = y.useState([]), [n, r] = y.useState(!0), [l, i] = y.useState(""), [s, o] = y.useState(1), [u, c] = y.useState(25), [p, f] = y.useState({ total: 0, page: 1, limit: 25, pages: 1 });
  y.useEffect(() => {
    let g = !0;
    return (async () => {
      var x, C, S, L;
      r(!0), i("");
      try {
        const I = new URLSearchParams();
        I.set("limit", String(u)), I.set("page", String(s));
        const _ = await fetch(`/api/orders?${I.toString()}`, { credentials: "include" });
        if (_.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!_.ok) throw new Error("Failed to load orders");
        const z = await _.json();
        g && (t(Array.isArray(z.orders) ? z.orders : []), f({ total: ((x = z.meta) == null ? void 0 : x.total) || 0, page: ((C = z.meta) == null ? void 0 : C.page) || s, limit: ((S = z.meta) == null ? void 0 : S.limit) || u, pages: ((L = z.meta) == null ? void 0 : L.pages) || 1 }));
      } catch (I) {
        g && i(I.message || "Failed to load orders");
      } finally {
        g && r(!1);
      }
    })(), () => {
      g = !1;
    };
  }, [s]);
  function m(g) {
    return g && g.assignment || (Array.isArray(g.tags) ? g.tags : typeof g.tags == "string" ? g.tags.split(",") : []).join(",").toLowerCase().includes("assigned") ? "assigned" : g.fulfillment_status === "fulfilled" ? "delivered" : g.fulfillment_status === "partial" ? "in-transit" : "new";
  }
  const [w, N] = y.useState(!1), [k, P] = y.useState(null);
  function v(g) {
    P(g), N(!0);
  }
  function d() {
    P(null), N(!1);
  }
  function h(g) {
    try {
      const { orderId: x } = g || {};
      if (!x) return;
      const C = String(x).replace(/^#+/, "");
      t((S) => S.filter((L, I) => {
        const _ = String(L.id || L.name || L.order_number || I).replace(/^#+/, "");
        return String(_) !== String(C);
      })), f((S) => ({ ...S || {}, total: Math.max(0, ((S == null ? void 0 : S.total) || 0) - 1) }));
      try {
        window && typeof window.showToast == "function" && window.showToast(`Order assigned: ${x}`, { type: "success" });
      } catch {
      }
    } catch {
    }
  }
  return /* @__PURE__ */ a.jsx(pt, { children: /* @__PURE__ */ a.jsxs("section", { className: "dashboard-orders", children: [
    /* @__PURE__ */ a.jsxs("header", { className: "rc-header dashboard-header", children: [
      /* @__PURE__ */ a.jsxs("div", { className: "dashboard-header-left", children: [
        /* @__PURE__ */ a.jsx("h2", { className: "rc-title", children: "Recent Orders" }),
        /* @__PURE__ */ a.jsx("p", { className: "rc-subtitle", children: "Latest orders synced from Shopify." })
      ] }),
      /* @__PURE__ */ a.jsxs("div", { className: "dashboard-header-right", children: [
        /* @__PURE__ */ a.jsxs("div", { className: "stat-card", children: [
          /* @__PURE__ */ a.jsx("div", { className: "stat-value", children: n ? "…" : p.total || e.length }),
          /* @__PURE__ */ a.jsx("div", { className: "stat-label", children: "Orders" })
        ] }),
        /* @__PURE__ */ a.jsx("button", { className: "btn-primary", onClick: () => window.location.reload(), children: "Refresh" })
      ] })
    ] }),
    /* @__PURE__ */ a.jsx("div", { className: "rc-table-wrapper", children: /* @__PURE__ */ a.jsxs("table", { className: "rc-table dashboard-table", children: [
      /* @__PURE__ */ a.jsx("thead", { children: /* @__PURE__ */ a.jsxs("tr", { children: [
        /* @__PURE__ */ a.jsx("th", { className: "col-order", children: "Order #" }),
        /* @__PURE__ */ a.jsx("th", { className: "col-customer", children: "Customer" }),
        /* @__PURE__ */ a.jsx("th", { className: "col-address", children: "Address" }),
        /* @__PURE__ */ a.jsx("th", { className: "col-status", children: "Status" }),
        /* @__PURE__ */ a.jsx("th", { className: "col-date", children: "Date" }),
        /* @__PURE__ */ a.jsx("th", { className: "col-time", children: "Time" }),
        /* @__PURE__ */ a.jsx("th", { className: "col-action", children: "Action" })
      ] }) }),
      /* @__PURE__ */ a.jsxs("tbody", { children: [
        n && /* @__PURE__ */ a.jsx("tr", { children: /* @__PURE__ */ a.jsx("td", { colSpan: 7, className: "section-note", children: "Loading…" }) }),
        !n && l && /* @__PURE__ */ a.jsx("tr", { children: /* @__PURE__ */ a.jsx("td", { colSpan: 7, className: "auth-error", children: l }) }),
        !n && !l && (Array.isArray(e) ? e.filter((x) => m(x) !== "assigned") : []).map((x, C) => {
          const S = m(x), L = x.full_name || (x.customer && x.customer.full_name ? x.customer.full_name : "");
          let I = "-";
          typeof x.shipping_address == "string" && String(x.shipping_address).trim() ? I = String(x.shipping_address).trim() : x.shipping_address && typeof x.shipping_address == "object" ? I = [x.shipping_address.address1 || "", x.shipping_address.city || "", x.shipping_address.province || "", x.shipping_address.country || ""].map((V) => String(V || "").trim()).filter(Boolean).join(", ") || "-" : typeof x.billing_address == "string" && String(x.billing_address).trim() ? I = String(x.billing_address).trim() : x.billing_address && typeof x.billing_address == "object" && (I = [x.billing_address.address1 || "", x.billing_address.city || "", x.billing_address.province || "", x.billing_address.country || ""].map((V) => String(V || "").trim()).filter(Boolean).join(", ") || "-");
          const _ = x.name || x.order_number || x.id || C, z = String(x.id || x.name || x.order_number || C).replace(/^#+/, ""), j = x.created_at ? new Date(x.created_at) : null, U = j ? j.toLocaleDateString() : "-", F = j ? j.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "-";
          return /* @__PURE__ */ a.jsxs("tr", { "data-status": S, children: [
            /* @__PURE__ */ a.jsx("td", { className: "rc-col-order", children: _ }),
            /* @__PURE__ */ a.jsx("td", { className: "rc-col-customer", children: L || "-" }),
            /* @__PURE__ */ a.jsx("td", { className: "rc-col-address", children: I }),
            /* @__PURE__ */ a.jsx("td", { className: "rc-col-status", children: /* @__PURE__ */ a.jsx("span", { className: `status-chip status-${S}`, children: S.replace("-", " ") }) }),
            /* @__PURE__ */ a.jsx("td", { className: "rc-col-date", children: U }),
            /* @__PURE__ */ a.jsx("td", { className: "rc-col-time", children: F }),
            /* @__PURE__ */ a.jsx("td", { className: "rc-col-action", children: /* @__PURE__ */ a.jsx("button", { className: "order-action btn-manage", onClick: () => v(String(x.id || x.name || x.order_number || C)), children: "Assign Rider" }) })
          ] }, z);
        }),
        !n && !l && e.length === 0 && /* @__PURE__ */ a.jsx("tr", { children: /* @__PURE__ */ a.jsx("td", { colSpan: 7, className: "section-note", children: "No recent orders." }) })
      ] })
    ] }) }),
    /* @__PURE__ */ a.jsx("div", { className: "rc-toolbar", "aria-label": "pagination", children: /* @__PURE__ */ a.jsxs("div", { className: "rc-filters", children: [
      /* @__PURE__ */ a.jsx("button", { className: "rc-select rc-chip", disabled: p.page <= 1 || n, onClick: () => o((g) => Math.max(1, g - 1)), children: "Prev" }),
      /* @__PURE__ */ a.jsxs("span", { className: "section-note", children: [
        "Page ",
        p.page,
        " of ",
        p.pages,
        " • ",
        p.total,
        " total"
      ] }),
      /* @__PURE__ */ a.jsx("button", { className: "rc-select rc-chip", disabled: p.page >= p.pages || n, onClick: () => o((g) => Math.min(p.pages, g + 1)), children: "Next" })
    ] }) }),
    w && k && /* @__PURE__ */ a.jsx(Kc, { orderId: k, onClose: d, onAssigned: h })
  ] }) });
}
function Mh() {
  return /* @__PURE__ */ a.jsx(kh, { children: /* @__PURE__ */ a.jsxs(vh, { children: [
    /* @__PURE__ */ a.jsx(Ye, { path: "/auth/login", element: /* @__PURE__ */ a.jsx(_h, {}) }),
    /* @__PURE__ */ a.jsx(Ye, { path: "/auth/register", element: /* @__PURE__ */ a.jsx(Ph, {}) }),
    /* @__PURE__ */ a.jsx(Ye, { path: "/riders", element: /* @__PURE__ */ a.jsx(Rh, {}) }),
    /* @__PURE__ */ a.jsx(Ye, { path: "/riders/:id", element: /* @__PURE__ */ a.jsx(Ih, {}) }),
    /* @__PURE__ */ a.jsx(Ye, { path: "/orders", element: /* @__PURE__ */ a.jsx(zh, {}) }),
    /* @__PURE__ */ a.jsx(Ye, { path: "/reports", element: /* @__PURE__ */ a.jsx(Oh, {}) }),
    /* @__PURE__ */ a.jsx(Ye, { path: "/dashboard", element: /* @__PURE__ */ a.jsx(Dh, {}) }),
    /* @__PURE__ */ a.jsx(Ye, { path: "*", element: /* @__PURE__ */ a.jsx(hh, { to: "/auth/login", replace: !0 }) })
  ] }) });
}
function No() {
  const e = document.getElementById("react-root");
  if (!e) return;
  Dc(e).render(/* @__PURE__ */ a.jsx(Mh, {}));
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", No) : No();
