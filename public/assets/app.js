function qD(m, C) {
  for (var E = 0; E < C.length; E++) {
    const x = C[E];
    if (typeof x != "string" && !Array.isArray(x)) {
      for (const N in x)
        if (N !== "default" && !(N in m)) {
          const A = Object.getOwnPropertyDescriptor(x, N);
          A && Object.defineProperty(m, N, A.get ? A : {
            enumerable: !0,
            get: () => x[N]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(m, Symbol.toStringTag, { value: "Module" }));
}
function XD(m) {
  return m && m.__esModule && Object.prototype.hasOwnProperty.call(m, "default") ? m.default : m;
}
var jE = { exports: {} }, uy = {};
/**
 * @license React
 * react-jsx-dev-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ow;
function JD() {
  if (Ow) return uy;
  Ow = 1;
  var m = Symbol.for("react.fragment");
  return uy.Fragment = m, uy.jsxDEV = void 0, uy;
}
var oy = {}, FE = { exports: {} }, xt = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Lw;
function ZD() {
  if (Lw) return xt;
  Lw = 1;
  var m = Symbol.for("react.element"), C = Symbol.for("react.portal"), E = Symbol.for("react.fragment"), x = Symbol.for("react.strict_mode"), N = Symbol.for("react.profiler"), A = Symbol.for("react.provider"), g = Symbol.for("react.context"), q = Symbol.for("react.forward_ref"), P = Symbol.for("react.suspense"), F = Symbol.for("react.memo"), ie = Symbol.for("react.lazy"), V = Symbol.iterator;
  function X(L) {
    return L === null || typeof L != "object" ? null : (L = V && L[V] || L["@@iterator"], typeof L == "function" ? L : null);
  }
  var le = { isMounted: function() {
    return !1;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, ve = Object.assign, be = {};
  function fe(L, G, et) {
    this.props = L, this.context = G, this.refs = be, this.updater = et || le;
  }
  fe.prototype.isReactComponent = {}, fe.prototype.setState = function(L, G) {
    if (typeof L != "object" && typeof L != "function" && L != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, L, G, "setState");
  }, fe.prototype.forceUpdate = function(L) {
    this.updater.enqueueForceUpdate(this, L, "forceUpdate");
  };
  function He() {
  }
  He.prototype = fe.prototype;
  function ue(L, G, et) {
    this.props = L, this.context = G, this.refs = be, this.updater = et || le;
  }
  var ae = ue.prototype = new He();
  ae.constructor = ue, ve(ae, fe.prototype), ae.isPureReactComponent = !0;
  var he = Array.isArray, ge = Object.prototype.hasOwnProperty, Ce = { current: null }, Ne = { key: !0, ref: !0, __self: !0, __source: !0 };
  function St(L, G, et) {
    var Je, vt = {}, ct = null, st = null;
    if (G != null) for (Je in G.ref !== void 0 && (st = G.ref), G.key !== void 0 && (ct = "" + G.key), G) ge.call(G, Je) && !Ne.hasOwnProperty(Je) && (vt[Je] = G[Je]);
    var ft = arguments.length - 2;
    if (ft === 1) vt.children = et;
    else if (1 < ft) {
      for (var ht = Array(ft), Gt = 0; Gt < ft; Gt++) ht[Gt] = arguments[Gt + 2];
      vt.children = ht;
    }
    if (L && L.defaultProps) for (Je in ft = L.defaultProps, ft) vt[Je] === void 0 && (vt[Je] = ft[Je]);
    return { $$typeof: m, type: L, key: ct, ref: st, props: vt, _owner: Ce.current };
  }
  function Et(L, G) {
    return { $$typeof: m, type: L.type, key: G, ref: L.ref, props: L.props, _owner: L._owner };
  }
  function wt(L) {
    return typeof L == "object" && L !== null && L.$$typeof === m;
  }
  function Ot(L) {
    var G = { "=": "=0", ":": "=2" };
    return "$" + L.replace(/[=:]/g, function(et) {
      return G[et];
    });
  }
  var bt = /\/+/g;
  function je(L, G) {
    return typeof L == "object" && L !== null && L.key != null ? Ot("" + L.key) : G.toString(36);
  }
  function At(L, G, et, Je, vt) {
    var ct = typeof L;
    (ct === "undefined" || ct === "boolean") && (L = null);
    var st = !1;
    if (L === null) st = !0;
    else switch (ct) {
      case "string":
      case "number":
        st = !0;
        break;
      case "object":
        switch (L.$$typeof) {
          case m:
          case C:
            st = !0;
        }
    }
    if (st) return st = L, vt = vt(st), L = Je === "" ? "." + je(st, 0) : Je, he(vt) ? (et = "", L != null && (et = L.replace(bt, "$&/") + "/"), At(vt, G, et, "", function(Gt) {
      return Gt;
    })) : vt != null && (wt(vt) && (vt = Et(vt, et + (!vt.key || st && st.key === vt.key ? "" : ("" + vt.key).replace(bt, "$&/") + "/") + L)), G.push(vt)), 1;
    if (st = 0, Je = Je === "" ? "." : Je + ":", he(L)) for (var ft = 0; ft < L.length; ft++) {
      ct = L[ft];
      var ht = Je + je(ct, ft);
      st += At(ct, G, et, ht, vt);
    }
    else if (ht = X(L), typeof ht == "function") for (L = ht.call(L), ft = 0; !(ct = L.next()).done; ) ct = ct.value, ht = Je + je(ct, ft++), st += At(ct, G, et, ht, vt);
    else if (ct === "object") throw G = String(L), Error("Objects are not valid as a React child (found: " + (G === "[object Object]" ? "object with keys {" + Object.keys(L).join(", ") + "}" : G) + "). If you meant to render a collection of children, use an array instead.");
    return st;
  }
  function Ut(L, G, et) {
    if (L == null) return L;
    var Je = [], vt = 0;
    return At(L, Je, "", "", function(ct) {
      return G.call(et, ct, vt++);
    }), Je;
  }
  function jt(L) {
    if (L._status === -1) {
      var G = L._result;
      G = G(), G.then(function(et) {
        (L._status === 0 || L._status === -1) && (L._status = 1, L._result = et);
      }, function(et) {
        (L._status === 0 || L._status === -1) && (L._status = 2, L._result = et);
      }), L._status === -1 && (L._status = 0, L._result = G);
    }
    if (L._status === 1) return L._result.default;
    throw L._result;
  }
  var ze = { current: null }, de = { transition: null }, Fe = { ReactCurrentDispatcher: ze, ReactCurrentBatchConfig: de, ReactCurrentOwner: Ce };
  function Se() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  return xt.Children = { map: Ut, forEach: function(L, G, et) {
    Ut(L, function() {
      G.apply(this, arguments);
    }, et);
  }, count: function(L) {
    var G = 0;
    return Ut(L, function() {
      G++;
    }), G;
  }, toArray: function(L) {
    return Ut(L, function(G) {
      return G;
    }) || [];
  }, only: function(L) {
    if (!wt(L)) throw Error("React.Children.only expected to receive a single React element child.");
    return L;
  } }, xt.Component = fe, xt.Fragment = E, xt.Profiler = N, xt.PureComponent = ue, xt.StrictMode = x, xt.Suspense = P, xt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Fe, xt.act = Se, xt.cloneElement = function(L, G, et) {
    if (L == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + L + ".");
    var Je = ve({}, L.props), vt = L.key, ct = L.ref, st = L._owner;
    if (G != null) {
      if (G.ref !== void 0 && (ct = G.ref, st = Ce.current), G.key !== void 0 && (vt = "" + G.key), L.type && L.type.defaultProps) var ft = L.type.defaultProps;
      for (ht in G) ge.call(G, ht) && !Ne.hasOwnProperty(ht) && (Je[ht] = G[ht] === void 0 && ft !== void 0 ? ft[ht] : G[ht]);
    }
    var ht = arguments.length - 2;
    if (ht === 1) Je.children = et;
    else if (1 < ht) {
      ft = Array(ht);
      for (var Gt = 0; Gt < ht; Gt++) ft[Gt] = arguments[Gt + 2];
      Je.children = ft;
    }
    return { $$typeof: m, type: L.type, key: vt, ref: ct, props: Je, _owner: st };
  }, xt.createContext = function(L) {
    return L = { $$typeof: g, _currentValue: L, _currentValue2: L, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, L.Provider = { $$typeof: A, _context: L }, L.Consumer = L;
  }, xt.createElement = St, xt.createFactory = function(L) {
    var G = St.bind(null, L);
    return G.type = L, G;
  }, xt.createRef = function() {
    return { current: null };
  }, xt.forwardRef = function(L) {
    return { $$typeof: q, render: L };
  }, xt.isValidElement = wt, xt.lazy = function(L) {
    return { $$typeof: ie, _payload: { _status: -1, _result: L }, _init: jt };
  }, xt.memo = function(L, G) {
    return { $$typeof: F, type: L, compare: G === void 0 ? null : G };
  }, xt.startTransition = function(L) {
    var G = de.transition;
    de.transition = {};
    try {
      L();
    } finally {
      de.transition = G;
    }
  }, xt.unstable_act = Se, xt.useCallback = function(L, G) {
    return ze.current.useCallback(L, G);
  }, xt.useContext = function(L) {
    return ze.current.useContext(L);
  }, xt.useDebugValue = function() {
  }, xt.useDeferredValue = function(L) {
    return ze.current.useDeferredValue(L);
  }, xt.useEffect = function(L, G) {
    return ze.current.useEffect(L, G);
  }, xt.useId = function() {
    return ze.current.useId();
  }, xt.useImperativeHandle = function(L, G, et) {
    return ze.current.useImperativeHandle(L, G, et);
  }, xt.useInsertionEffect = function(L, G) {
    return ze.current.useInsertionEffect(L, G);
  }, xt.useLayoutEffect = function(L, G) {
    return ze.current.useLayoutEffect(L, G);
  }, xt.useMemo = function(L, G) {
    return ze.current.useMemo(L, G);
  }, xt.useReducer = function(L, G, et) {
    return ze.current.useReducer(L, G, et);
  }, xt.useRef = function(L) {
    return ze.current.useRef(L);
  }, xt.useState = function(L) {
    return ze.current.useState(L);
  }, xt.useSyncExternalStore = function(L, G, et) {
    return ze.current.useSyncExternalStore(L, G, et);
  }, xt.useTransition = function() {
    return ze.current.useTransition();
  }, xt.version = "18.3.1", xt;
}
var ov = { exports: {} };
/**
 * @license React
 * react.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
ov.exports;
var Mw;
function eN() {
  return Mw || (Mw = 1, function(m, C) {
    process.env.NODE_ENV !== "production" && function() {
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
      var E = "18.3.1", x = Symbol.for("react.element"), N = Symbol.for("react.portal"), A = Symbol.for("react.fragment"), g = Symbol.for("react.strict_mode"), q = Symbol.for("react.profiler"), P = Symbol.for("react.provider"), F = Symbol.for("react.context"), ie = Symbol.for("react.forward_ref"), V = Symbol.for("react.suspense"), X = Symbol.for("react.suspense_list"), le = Symbol.for("react.memo"), ve = Symbol.for("react.lazy"), be = Symbol.for("react.offscreen"), fe = Symbol.iterator, He = "@@iterator";
      function ue(h) {
        if (h === null || typeof h != "object")
          return null;
        var T = fe && h[fe] || h[He];
        return typeof T == "function" ? T : null;
      }
      var ae = {
        /**
         * @internal
         * @type {ReactComponent}
         */
        current: null
      }, he = {
        transition: null
      }, ge = {
        current: null,
        // Used to reproduce behavior of `batchedUpdates` in legacy mode.
        isBatchingLegacy: !1,
        didScheduleLegacyUpdate: !1
      }, Ce = {
        /**
         * @internal
         * @type {ReactComponent}
         */
        current: null
      }, Ne = {}, St = null;
      function Et(h) {
        St = h;
      }
      Ne.setExtraStackFrame = function(h) {
        St = h;
      }, Ne.getCurrentStack = null, Ne.getStackAddendum = function() {
        var h = "";
        St && (h += St);
        var T = Ne.getCurrentStack;
        return T && (h += T() || ""), h;
      };
      var wt = !1, Ot = !1, bt = !1, je = !1, At = !1, Ut = {
        ReactCurrentDispatcher: ae,
        ReactCurrentBatchConfig: he,
        ReactCurrentOwner: Ce
      };
      Ut.ReactDebugCurrentFrame = Ne, Ut.ReactCurrentActQueue = ge;
      function jt(h) {
        {
          for (var T = arguments.length, B = new Array(T > 1 ? T - 1 : 0), Y = 1; Y < T; Y++)
            B[Y - 1] = arguments[Y];
          de("warn", h, B);
        }
      }
      function ze(h) {
        {
          for (var T = arguments.length, B = new Array(T > 1 ? T - 1 : 0), Y = 1; Y < T; Y++)
            B[Y - 1] = arguments[Y];
          de("error", h, B);
        }
      }
      function de(h, T, B) {
        {
          var Y = Ut.ReactDebugCurrentFrame, ce = Y.getStackAddendum();
          ce !== "" && (T += "%s", B = B.concat([ce]));
          var We = B.map(function(Ee) {
            return String(Ee);
          });
          We.unshift("Warning: " + T), Function.prototype.apply.call(console[h], console, We);
        }
      }
      var Fe = {};
      function Se(h, T) {
        {
          var B = h.constructor, Y = B && (B.displayName || B.name) || "ReactClass", ce = Y + "." + T;
          if (Fe[ce])
            return;
          ze("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", T, Y), Fe[ce] = !0;
        }
      }
      var L = {
        /**
         * Checks whether or not this composite component is mounted.
         * @param {ReactClass} publicInstance The instance we want to test.
         * @return {boolean} True if mounted, false otherwise.
         * @protected
         * @final
         */
        isMounted: function(h) {
          return !1;
        },
        /**
         * Forces an update. This should only be invoked when it is known with
         * certainty that we are **not** in a DOM transaction.
         *
         * You may want to call this when you know that some deeper aspect of the
         * component's state has changed but `setState` was not called.
         *
         * This will not invoke `shouldComponentUpdate`, but it will invoke
         * `componentWillUpdate` and `componentDidUpdate`.
         *
         * @param {ReactClass} publicInstance The instance that should rerender.
         * @param {?function} callback Called after component is updated.
         * @param {?string} callerName name of the calling function in the public API.
         * @internal
         */
        enqueueForceUpdate: function(h, T, B) {
          Se(h, "forceUpdate");
        },
        /**
         * Replaces all of the state. Always use this or `setState` to mutate state.
         * You should treat `this.state` as immutable.
         *
         * There is no guarantee that `this.state` will be immediately updated, so
         * accessing `this.state` after calling this method may return the old value.
         *
         * @param {ReactClass} publicInstance The instance that should rerender.
         * @param {object} completeState Next state.
         * @param {?function} callback Called after component is updated.
         * @param {?string} callerName name of the calling function in the public API.
         * @internal
         */
        enqueueReplaceState: function(h, T, B, Y) {
          Se(h, "replaceState");
        },
        /**
         * Sets a subset of the state. This only exists because _pendingState is
         * internal. This provides a merging strategy that is not available to deep
         * properties which is confusing. TODO: Expose pendingState or don't use it
         * during the merge.
         *
         * @param {ReactClass} publicInstance The instance that should rerender.
         * @param {object} partialState Next partial state to be merged with state.
         * @param {?function} callback Called after component is updated.
         * @param {?string} Name of the calling function in the public API.
         * @internal
         */
        enqueueSetState: function(h, T, B, Y) {
          Se(h, "setState");
        }
      }, G = Object.assign, et = {};
      Object.freeze(et);
      function Je(h, T, B) {
        this.props = h, this.context = T, this.refs = et, this.updater = B || L;
      }
      Je.prototype.isReactComponent = {}, Je.prototype.setState = function(h, T) {
        if (typeof h != "object" && typeof h != "function" && h != null)
          throw new Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
        this.updater.enqueueSetState(this, h, T, "setState");
      }, Je.prototype.forceUpdate = function(h) {
        this.updater.enqueueForceUpdate(this, h, "forceUpdate");
      };
      {
        var vt = {
          isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
          replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
        }, ct = function(h, T) {
          Object.defineProperty(Je.prototype, h, {
            get: function() {
              jt("%s(...) is deprecated in plain JavaScript React classes. %s", T[0], T[1]);
            }
          });
        };
        for (var st in vt)
          vt.hasOwnProperty(st) && ct(st, vt[st]);
      }
      function ft() {
      }
      ft.prototype = Je.prototype;
      function ht(h, T, B) {
        this.props = h, this.context = T, this.refs = et, this.updater = B || L;
      }
      var Gt = ht.prototype = new ft();
      Gt.constructor = ht, G(Gt, Je.prototype), Gt.isPureReactComponent = !0;
      function On() {
        var h = {
          current: null
        };
        return Object.seal(h), h;
      }
      var kr = Array.isArray;
      function wn(h) {
        return kr(h);
      }
      function ir(h) {
        {
          var T = typeof Symbol == "function" && Symbol.toStringTag, B = T && h[Symbol.toStringTag] || h.constructor.name || "Object";
          return B;
        }
      }
      function In(h) {
        try {
          return $n(h), !1;
        } catch {
          return !0;
        }
      }
      function $n(h) {
        return "" + h;
      }
      function Gr(h) {
        if (In(h))
          return ze("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", ir(h)), $n(h);
      }
      function fi(h, T, B) {
        var Y = h.displayName;
        if (Y)
          return Y;
        var ce = T.displayName || T.name || "";
        return ce !== "" ? B + "(" + ce + ")" : B;
      }
      function pa(h) {
        return h.displayName || "Context";
      }
      function Jn(h) {
        if (h == null)
          return null;
        if (typeof h.tag == "number" && ze("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof h == "function")
          return h.displayName || h.name || null;
        if (typeof h == "string")
          return h;
        switch (h) {
          case A:
            return "Fragment";
          case N:
            return "Portal";
          case q:
            return "Profiler";
          case g:
            return "StrictMode";
          case V:
            return "Suspense";
          case X:
            return "SuspenseList";
        }
        if (typeof h == "object")
          switch (h.$$typeof) {
            case F:
              var T = h;
              return pa(T) + ".Consumer";
            case P:
              var B = h;
              return pa(B._context) + ".Provider";
            case ie:
              return fi(h, h.render, "ForwardRef");
            case le:
              var Y = h.displayName || null;
              return Y !== null ? Y : Jn(h.type) || "Memo";
            case ve: {
              var ce = h, We = ce._payload, Ee = ce._init;
              try {
                return Jn(Ee(We));
              } catch {
                return null;
              }
            }
          }
        return null;
      }
      var Tn = Object.prototype.hasOwnProperty, Yn = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0
      }, Cr, Ga, Ln;
      Ln = {};
      function Rr(h) {
        if (Tn.call(h, "ref")) {
          var T = Object.getOwnPropertyDescriptor(h, "ref").get;
          if (T && T.isReactWarning)
            return !1;
        }
        return h.ref !== void 0;
      }
      function wr(h) {
        if (Tn.call(h, "key")) {
          var T = Object.getOwnPropertyDescriptor(h, "key").get;
          if (T && T.isReactWarning)
            return !1;
        }
        return h.key !== void 0;
      }
      function Ka(h, T) {
        var B = function() {
          Cr || (Cr = !0, ze("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", T));
        };
        B.isReactWarning = !0, Object.defineProperty(h, "key", {
          get: B,
          configurable: !0
        });
      }
      function di(h, T) {
        var B = function() {
          Ga || (Ga = !0, ze("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", T));
        };
        B.isReactWarning = !0, Object.defineProperty(h, "ref", {
          get: B,
          configurable: !0
        });
      }
      function pe(h) {
        if (typeof h.ref == "string" && Ce.current && h.__self && Ce.current.stateNode !== h.__self) {
          var T = Jn(Ce.current.type);
          Ln[T] || (ze('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', T, h.ref), Ln[T] = !0);
        }
      }
      var Ae = function(h, T, B, Y, ce, We, Ee) {
        var qe = {
          // This tag allows us to uniquely identify this as a React Element
          $$typeof: x,
          // Built-in properties that belong on the element
          type: h,
          key: T,
          ref: B,
          props: Ee,
          // Record the component responsible for creating this element.
          _owner: We
        };
        return qe._store = {}, Object.defineProperty(qe._store, "validated", {
          configurable: !1,
          enumerable: !1,
          writable: !0,
          value: !1
        }), Object.defineProperty(qe, "_self", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: Y
        }), Object.defineProperty(qe, "_source", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: ce
        }), Object.freeze && (Object.freeze(qe.props), Object.freeze(qe)), qe;
      };
      function dt(h, T, B) {
        var Y, ce = {}, We = null, Ee = null, qe = null, Ct = null;
        if (T != null) {
          Rr(T) && (Ee = T.ref, pe(T)), wr(T) && (Gr(T.key), We = "" + T.key), qe = T.__self === void 0 ? null : T.__self, Ct = T.__source === void 0 ? null : T.__source;
          for (Y in T)
            Tn.call(T, Y) && !Yn.hasOwnProperty(Y) && (ce[Y] = T[Y]);
        }
        var Mt = arguments.length - 2;
        if (Mt === 1)
          ce.children = B;
        else if (Mt > 1) {
          for (var ln = Array(Mt), Xt = 0; Xt < Mt; Xt++)
            ln[Xt] = arguments[Xt + 2];
          Object.freeze && Object.freeze(ln), ce.children = ln;
        }
        if (h && h.defaultProps) {
          var pt = h.defaultProps;
          for (Y in pt)
            ce[Y] === void 0 && (ce[Y] = pt[Y]);
        }
        if (We || Ee) {
          var Jt = typeof h == "function" ? h.displayName || h.name || "Unknown" : h;
          We && Ka(ce, Jt), Ee && di(ce, Jt);
        }
        return Ae(h, We, Ee, qe, Ct, Ce.current, ce);
      }
      function $t(h, T) {
        var B = Ae(h.type, T, h.ref, h._self, h._source, h._owner, h.props);
        return B;
      }
      function rn(h, T, B) {
        if (h == null)
          throw new Error("React.cloneElement(...): The argument must be a React element, but you passed " + h + ".");
        var Y, ce = G({}, h.props), We = h.key, Ee = h.ref, qe = h._self, Ct = h._source, Mt = h._owner;
        if (T != null) {
          Rr(T) && (Ee = T.ref, Mt = Ce.current), wr(T) && (Gr(T.key), We = "" + T.key);
          var ln;
          h.type && h.type.defaultProps && (ln = h.type.defaultProps);
          for (Y in T)
            Tn.call(T, Y) && !Yn.hasOwnProperty(Y) && (T[Y] === void 0 && ln !== void 0 ? ce[Y] = ln[Y] : ce[Y] = T[Y]);
        }
        var Xt = arguments.length - 2;
        if (Xt === 1)
          ce.children = B;
        else if (Xt > 1) {
          for (var pt = Array(Xt), Jt = 0; Jt < Xt; Jt++)
            pt[Jt] = arguments[Jt + 2];
          ce.children = pt;
        }
        return Ae(h.type, We, Ee, qe, Ct, Mt, ce);
      }
      function mn(h) {
        return typeof h == "object" && h !== null && h.$$typeof === x;
      }
      var on = ".", Zn = ":";
      function dn(h) {
        var T = /[=:]/g, B = {
          "=": "=0",
          ":": "=2"
        }, Y = h.replace(T, function(ce) {
          return B[ce];
        });
        return "$" + Y;
      }
      var Kt = !1, pn = /\/+/g;
      function Tr(h) {
        return h.replace(pn, "$&/");
      }
      function br(h, T) {
        return typeof h == "object" && h !== null && h.key != null ? (Gr(h.key), dn("" + h.key)) : T.toString(36);
      }
      function va(h, T, B, Y, ce) {
        var We = typeof h;
        (We === "undefined" || We === "boolean") && (h = null);
        var Ee = !1;
        if (h === null)
          Ee = !0;
        else
          switch (We) {
            case "string":
            case "number":
              Ee = !0;
              break;
            case "object":
              switch (h.$$typeof) {
                case x:
                case N:
                  Ee = !0;
              }
          }
        if (Ee) {
          var qe = h, Ct = ce(qe), Mt = Y === "" ? on + br(qe, 0) : Y;
          if (wn(Ct)) {
            var ln = "";
            Mt != null && (ln = Tr(Mt) + "/"), va(Ct, T, ln, "", function(ld) {
              return ld;
            });
          } else Ct != null && (mn(Ct) && (Ct.key && (!qe || qe.key !== Ct.key) && Gr(Ct.key), Ct = $t(
            Ct,
            // Keep both the (mapped) and old keys if they differ, just as
            // traverseAllChildren used to do for objects as children
            B + // $FlowFixMe Flow incorrectly thinks React.Portal doesn't have a key
            (Ct.key && (!qe || qe.key !== Ct.key) ? (
              // $FlowFixMe Flow incorrectly thinks existing element's key can be a number
              // eslint-disable-next-line react-internal/safe-string-coercion
              Tr("" + Ct.key) + "/"
            ) : "") + Mt
          )), T.push(Ct));
          return 1;
        }
        var Xt, pt, Jt = 0, yn = Y === "" ? on : Y + Zn;
        if (wn(h))
          for (var bl = 0; bl < h.length; bl++)
            Xt = h[bl], pt = yn + br(Xt, bl), Jt += va(Xt, T, B, pt, ce);
        else {
          var ns = ue(h);
          if (typeof ns == "function") {
            var Ii = h;
            ns === Ii.entries && (Kt || jt("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), Kt = !0);
            for (var rs = ns.call(Ii), cu, id = 0; !(cu = rs.next()).done; )
              Xt = cu.value, pt = yn + br(Xt, id++), Jt += va(Xt, T, B, pt, ce);
          } else if (We === "object") {
            var mc = String(h);
            throw new Error("Objects are not valid as a React child (found: " + (mc === "[object Object]" ? "object with keys {" + Object.keys(h).join(", ") + "}" : mc) + "). If you meant to render a collection of children, use an array instead.");
          }
        }
        return Jt;
      }
      function pi(h, T, B) {
        if (h == null)
          return h;
        var Y = [], ce = 0;
        return va(h, Y, "", "", function(We) {
          return T.call(B, We, ce++);
        }), Y;
      }
      function qu(h) {
        var T = 0;
        return pi(h, function() {
          T++;
        }), T;
      }
      function hl(h, T, B) {
        pi(h, function() {
          T.apply(this, arguments);
        }, B);
      }
      function ru(h) {
        return pi(h, function(T) {
          return T;
        }) || [];
      }
      function ml(h) {
        if (!mn(h))
          throw new Error("React.Children.only expected to receive a single React element child.");
        return h;
      }
      function yl(h) {
        var T = {
          $$typeof: F,
          // As a workaround to support multiple concurrent renderers, we categorize
          // some renderers as primary and others as secondary. We only expect
          // there to be two concurrent renderers at most: React Native (primary) and
          // Fabric (secondary); React DOM (primary) and React ART (secondary).
          // Secondary renderers store their context values on separate fields.
          _currentValue: h,
          _currentValue2: h,
          // Used to track how many concurrent renderers this context currently
          // supports within in a single renderer. Such as parallel server rendering.
          _threadCount: 0,
          // These are circular
          Provider: null,
          Consumer: null,
          // Add these to use same hidden class in VM as ServerContext
          _defaultValue: null,
          _globalName: null
        };
        T.Provider = {
          $$typeof: P,
          _context: T
        };
        var B = !1, Y = !1, ce = !1;
        {
          var We = {
            $$typeof: F,
            _context: T
          };
          Object.defineProperties(We, {
            Provider: {
              get: function() {
                return Y || (Y = !0, ze("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?")), T.Provider;
              },
              set: function(Ee) {
                T.Provider = Ee;
              }
            },
            _currentValue: {
              get: function() {
                return T._currentValue;
              },
              set: function(Ee) {
                T._currentValue = Ee;
              }
            },
            _currentValue2: {
              get: function() {
                return T._currentValue2;
              },
              set: function(Ee) {
                T._currentValue2 = Ee;
              }
            },
            _threadCount: {
              get: function() {
                return T._threadCount;
              },
              set: function(Ee) {
                T._threadCount = Ee;
              }
            },
            Consumer: {
              get: function() {
                return B || (B = !0, ze("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?")), T.Consumer;
              }
            },
            displayName: {
              get: function() {
                return T.displayName;
              },
              set: function(Ee) {
                ce || (jt("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.", Ee), ce = !0);
              }
            }
          }), T.Consumer = We;
        }
        return T._currentRenderer = null, T._currentRenderer2 = null, T;
      }
      var Or = -1, Kr = 0, lr = 1, vi = 2;
      function qa(h) {
        if (h._status === Or) {
          var T = h._result, B = T();
          if (B.then(function(We) {
            if (h._status === Kr || h._status === Or) {
              var Ee = h;
              Ee._status = lr, Ee._result = We;
            }
          }, function(We) {
            if (h._status === Kr || h._status === Or) {
              var Ee = h;
              Ee._status = vi, Ee._result = We;
            }
          }), h._status === Or) {
            var Y = h;
            Y._status = Kr, Y._result = B;
          }
        }
        if (h._status === lr) {
          var ce = h._result;
          return ce === void 0 && ze(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))

Did you accidentally put curly braces around the import?`, ce), "default" in ce || ze(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))`, ce), ce.default;
        } else
          throw h._result;
      }
      function b(h) {
        var T = {
          // We use these fields to store the result.
          _status: Or,
          _result: h
        }, B = {
          $$typeof: ve,
          _payload: T,
          _init: qa
        };
        {
          var Y, ce;
          Object.defineProperties(B, {
            defaultProps: {
              configurable: !0,
              get: function() {
                return Y;
              },
              set: function(We) {
                ze("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), Y = We, Object.defineProperty(B, "defaultProps", {
                  enumerable: !0
                });
              }
            },
            propTypes: {
              configurable: !0,
              get: function() {
                return ce;
              },
              set: function(We) {
                ze("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), ce = We, Object.defineProperty(B, "propTypes", {
                  enumerable: !0
                });
              }
            }
          });
        }
        return B;
      }
      function ee(h) {
        h != null && h.$$typeof === le ? ze("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).") : typeof h != "function" ? ze("forwardRef requires a render function but was given %s.", h === null ? "null" : typeof h) : h.length !== 0 && h.length !== 2 && ze("forwardRef render functions accept exactly two parameters: props and ref. %s", h.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."), h != null && (h.defaultProps != null || h.propTypes != null) && ze("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
        var T = {
          $$typeof: ie,
          render: h
        };
        {
          var B;
          Object.defineProperty(T, "displayName", {
            enumerable: !1,
            configurable: !0,
            get: function() {
              return B;
            },
            set: function(Y) {
              B = Y, !h.name && !h.displayName && (h.displayName = Y);
            }
          });
        }
        return T;
      }
      var me;
      me = Symbol.for("react.module.reference");
      function Be(h) {
        return !!(typeof h == "string" || typeof h == "function" || h === A || h === q || At || h === g || h === V || h === X || je || h === be || wt || Ot || bt || typeof h == "object" && h !== null && (h.$$typeof === ve || h.$$typeof === le || h.$$typeof === P || h.$$typeof === F || h.$$typeof === ie || // This needs to include all possible module reference object
        // types supported by any Flight configuration anywhere since
        // we don't know which Flight build this will end up being used
        // with.
        h.$$typeof === me || h.getModuleId !== void 0));
      }
      function Rt(h, T) {
        Be(h) || ze("memo: The first argument must be a component. Instead received: %s", h === null ? "null" : typeof h);
        var B = {
          $$typeof: le,
          type: h,
          compare: T === void 0 ? null : T
        };
        {
          var Y;
          Object.defineProperty(B, "displayName", {
            enumerable: !1,
            configurable: !0,
            get: function() {
              return Y;
            },
            set: function(ce) {
              Y = ce, !h.name && !h.displayName && (h.displayName = ce);
            }
          });
        }
        return B;
      }
      function nt() {
        var h = ae.current;
        return h === null && ze(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`), h;
      }
      function rt(h) {
        var T = nt();
        if (h._context !== void 0) {
          var B = h._context;
          B.Consumer === h ? ze("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?") : B.Provider === h && ze("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
        }
        return T.useContext(h);
      }
      function Ye(h) {
        var T = nt();
        return T.useState(h);
      }
      function Mn(h, T, B) {
        var Y = nt();
        return Y.useReducer(h, T, B);
      }
      function sn(h) {
        var T = nt();
        return T.useRef(h);
      }
      function an(h, T) {
        var B = nt();
        return B.useEffect(h, T);
      }
      function ur(h, T) {
        var B = nt();
        return B.useInsertionEffect(h, T);
      }
      function Xa(h, T) {
        var B = nt();
        return B.useLayoutEffect(h, T);
      }
      function _a(h, T) {
        var B = nt();
        return B.useCallback(h, T);
      }
      function Wn(h, T) {
        var B = nt();
        return B.useMemo(h, T);
      }
      function au(h, T, B) {
        var Y = nt();
        return Y.useImperativeHandle(h, T, B);
      }
      function Yt(h, T) {
        {
          var B = nt();
          return B.useDebugValue(h, T);
        }
      }
      function mt() {
        var h = nt();
        return h.useTransition();
      }
      function Pi(h) {
        var T = nt();
        return T.useDeferredValue(h);
      }
      function Xo() {
        var h = nt();
        return h.useId();
      }
      function iu(h, T, B) {
        var Y = nt();
        return Y.useSyncExternalStore(h, T, B);
      }
      var gl = 0, Xu, Sl, qr, Jo, Lr, vc, hc;
      function Ju() {
      }
      Ju.__reactDisabledLog = !0;
      function El() {
        {
          if (gl === 0) {
            Xu = console.log, Sl = console.info, qr = console.warn, Jo = console.error, Lr = console.group, vc = console.groupCollapsed, hc = console.groupEnd;
            var h = {
              configurable: !0,
              enumerable: !0,
              value: Ju,
              writable: !0
            };
            Object.defineProperties(console, {
              info: h,
              log: h,
              warn: h,
              error: h,
              group: h,
              groupCollapsed: h,
              groupEnd: h
            });
          }
          gl++;
        }
      }
      function ha() {
        {
          if (gl--, gl === 0) {
            var h = {
              configurable: !0,
              enumerable: !0,
              writable: !0
            };
            Object.defineProperties(console, {
              log: G({}, h, {
                value: Xu
              }),
              info: G({}, h, {
                value: Sl
              }),
              warn: G({}, h, {
                value: qr
              }),
              error: G({}, h, {
                value: Jo
              }),
              group: G({}, h, {
                value: Lr
              }),
              groupCollapsed: G({}, h, {
                value: vc
              }),
              groupEnd: G({}, h, {
                value: hc
              })
            });
          }
          gl < 0 && ze("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
        }
      }
      var Ja = Ut.ReactCurrentDispatcher, Za;
      function Zu(h, T, B) {
        {
          if (Za === void 0)
            try {
              throw Error();
            } catch (ce) {
              var Y = ce.stack.trim().match(/\n( *(at )?)/);
              Za = Y && Y[1] || "";
            }
          return `
` + Za + h;
        }
      }
      var lu = !1, Cl;
      {
        var eo = typeof WeakMap == "function" ? WeakMap : Map;
        Cl = new eo();
      }
      function to(h, T) {
        if (!h || lu)
          return "";
        {
          var B = Cl.get(h);
          if (B !== void 0)
            return B;
        }
        var Y;
        lu = !0;
        var ce = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        var We;
        We = Ja.current, Ja.current = null, El();
        try {
          if (T) {
            var Ee = function() {
              throw Error();
            };
            if (Object.defineProperty(Ee.prototype, "props", {
              set: function() {
                throw Error();
              }
            }), typeof Reflect == "object" && Reflect.construct) {
              try {
                Reflect.construct(Ee, []);
              } catch (yn) {
                Y = yn;
              }
              Reflect.construct(h, [], Ee);
            } else {
              try {
                Ee.call();
              } catch (yn) {
                Y = yn;
              }
              h.call(Ee.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (yn) {
              Y = yn;
            }
            h();
          }
        } catch (yn) {
          if (yn && Y && typeof yn.stack == "string") {
            for (var qe = yn.stack.split(`
`), Ct = Y.stack.split(`
`), Mt = qe.length - 1, ln = Ct.length - 1; Mt >= 1 && ln >= 0 && qe[Mt] !== Ct[ln]; )
              ln--;
            for (; Mt >= 1 && ln >= 0; Mt--, ln--)
              if (qe[Mt] !== Ct[ln]) {
                if (Mt !== 1 || ln !== 1)
                  do
                    if (Mt--, ln--, ln < 0 || qe[Mt] !== Ct[ln]) {
                      var Xt = `
` + qe[Mt].replace(" at new ", " at ");
                      return h.displayName && Xt.includes("<anonymous>") && (Xt = Xt.replace("<anonymous>", h.displayName)), typeof h == "function" && Cl.set(h, Xt), Xt;
                    }
                  while (Mt >= 1 && ln >= 0);
                break;
              }
          }
        } finally {
          lu = !1, Ja.current = We, ha(), Error.prepareStackTrace = ce;
        }
        var pt = h ? h.displayName || h.name : "", Jt = pt ? Zu(pt) : "";
        return typeof h == "function" && Cl.set(h, Jt), Jt;
      }
      function Hi(h, T, B) {
        return to(h, !1);
      }
      function rd(h) {
        var T = h.prototype;
        return !!(T && T.isReactComponent);
      }
      function Bi(h, T, B) {
        if (h == null)
          return "";
        if (typeof h == "function")
          return to(h, rd(h));
        if (typeof h == "string")
          return Zu(h);
        switch (h) {
          case V:
            return Zu("Suspense");
          case X:
            return Zu("SuspenseList");
        }
        if (typeof h == "object")
          switch (h.$$typeof) {
            case ie:
              return Hi(h.render);
            case le:
              return Bi(h.type, T, B);
            case ve: {
              var Y = h, ce = Y._payload, We = Y._init;
              try {
                return Bi(We(ce), T, B);
              } catch {
              }
            }
          }
        return "";
      }
      var Ft = {}, no = Ut.ReactDebugCurrentFrame;
      function Lt(h) {
        if (h) {
          var T = h._owner, B = Bi(h.type, h._source, T ? T.type : null);
          no.setExtraStackFrame(B);
        } else
          no.setExtraStackFrame(null);
      }
      function Zo(h, T, B, Y, ce) {
        {
          var We = Function.call.bind(Tn);
          for (var Ee in h)
            if (We(h, Ee)) {
              var qe = void 0;
              try {
                if (typeof h[Ee] != "function") {
                  var Ct = Error((Y || "React class") + ": " + B + " type `" + Ee + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof h[Ee] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                  throw Ct.name = "Invariant Violation", Ct;
                }
                qe = h[Ee](T, Ee, Y, B, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
              } catch (Mt) {
                qe = Mt;
              }
              qe && !(qe instanceof Error) && (Lt(ce), ze("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", Y || "React class", B, Ee, typeof qe), Lt(null)), qe instanceof Error && !(qe.message in Ft) && (Ft[qe.message] = !0, Lt(ce), ze("Failed %s type: %s", B, qe.message), Lt(null));
            }
        }
      }
      function hi(h) {
        if (h) {
          var T = h._owner, B = Bi(h.type, h._source, T ? T.type : null);
          Et(B);
        } else
          Et(null);
      }
      var it;
      it = !1;
      function ro() {
        if (Ce.current) {
          var h = Jn(Ce.current.type);
          if (h)
            return `

Check the render method of \`` + h + "`.";
        }
        return "";
      }
      function or(h) {
        if (h !== void 0) {
          var T = h.fileName.replace(/^.*[\\\/]/, ""), B = h.lineNumber;
          return `

Check your code at ` + T + ":" + B + ".";
        }
        return "";
      }
      function mi(h) {
        return h != null ? or(h.__source) : "";
      }
      var Mr = {};
      function yi(h) {
        var T = ro();
        if (!T) {
          var B = typeof h == "string" ? h : h.displayName || h.name;
          B && (T = `

Check the top-level render call using <` + B + ">.");
        }
        return T;
      }
      function cn(h, T) {
        if (!(!h._store || h._store.validated || h.key != null)) {
          h._store.validated = !0;
          var B = yi(T);
          if (!Mr[B]) {
            Mr[B] = !0;
            var Y = "";
            h && h._owner && h._owner !== Ce.current && (Y = " It was passed a child from " + Jn(h._owner.type) + "."), hi(h), ze('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', B, Y), hi(null);
          }
        }
      }
      function qt(h, T) {
        if (typeof h == "object") {
          if (wn(h))
            for (var B = 0; B < h.length; B++) {
              var Y = h[B];
              mn(Y) && cn(Y, T);
            }
          else if (mn(h))
            h._store && (h._store.validated = !0);
          else if (h) {
            var ce = ue(h);
            if (typeof ce == "function" && ce !== h.entries)
              for (var We = ce.call(h), Ee; !(Ee = We.next()).done; )
                mn(Ee.value) && cn(Ee.value, T);
          }
        }
      }
      function Rl(h) {
        {
          var T = h.type;
          if (T == null || typeof T == "string")
            return;
          var B;
          if (typeof T == "function")
            B = T.propTypes;
          else if (typeof T == "object" && (T.$$typeof === ie || // Note: Memo only checks outer props here.
          // Inner props are checked in the reconciler.
          T.$$typeof === le))
            B = T.propTypes;
          else
            return;
          if (B) {
            var Y = Jn(T);
            Zo(B, h.props, "prop", Y, h);
          } else if (T.PropTypes !== void 0 && !it) {
            it = !0;
            var ce = Jn(T);
            ze("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", ce || "Unknown");
          }
          typeof T.getDefaultProps == "function" && !T.getDefaultProps.isReactClassApproved && ze("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
        }
      }
      function Qn(h) {
        {
          for (var T = Object.keys(h.props), B = 0; B < T.length; B++) {
            var Y = T[B];
            if (Y !== "children" && Y !== "key") {
              hi(h), ze("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", Y), hi(null);
              break;
            }
          }
          h.ref !== null && (hi(h), ze("Invalid attribute `ref` supplied to `React.Fragment`."), hi(null));
        }
      }
      function Ur(h, T, B) {
        var Y = Be(h);
        if (!Y) {
          var ce = "";
          (h === void 0 || typeof h == "object" && h !== null && Object.keys(h).length === 0) && (ce += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var We = mi(T);
          We ? ce += We : ce += ro();
          var Ee;
          h === null ? Ee = "null" : wn(h) ? Ee = "array" : h !== void 0 && h.$$typeof === x ? (Ee = "<" + (Jn(h.type) || "Unknown") + " />", ce = " Did you accidentally export a JSX literal instead of a component?") : Ee = typeof h, ze("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", Ee, ce);
        }
        var qe = dt.apply(this, arguments);
        if (qe == null)
          return qe;
        if (Y)
          for (var Ct = 2; Ct < arguments.length; Ct++)
            qt(arguments[Ct], h);
        return h === A ? Qn(qe) : Rl(qe), qe;
      }
      var Da = !1;
      function uu(h) {
        var T = Ur.bind(null, h);
        return T.type = h, Da || (Da = !0, jt("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.")), Object.defineProperty(T, "type", {
          enumerable: !1,
          get: function() {
            return jt("Factory.type is deprecated. Access the class directly before passing it to createFactory."), Object.defineProperty(this, "type", {
              value: h
            }), h;
          }
        }), T;
      }
      function es(h, T, B) {
        for (var Y = rn.apply(this, arguments), ce = 2; ce < arguments.length; ce++)
          qt(arguments[ce], Y.type);
        return Rl(Y), Y;
      }
      function ts(h, T) {
        var B = he.transition;
        he.transition = {};
        var Y = he.transition;
        he.transition._updatedFibers = /* @__PURE__ */ new Set();
        try {
          h();
        } finally {
          if (he.transition = B, B === null && Y._updatedFibers) {
            var ce = Y._updatedFibers.size;
            ce > 10 && jt("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), Y._updatedFibers.clear();
          }
        }
      }
      var wl = !1, ou = null;
      function ad(h) {
        if (ou === null)
          try {
            var T = ("require" + Math.random()).slice(0, 7), B = m && m[T];
            ou = B.call(m, "timers").setImmediate;
          } catch {
            ou = function(ce) {
              wl === !1 && (wl = !0, typeof MessageChannel > "u" && ze("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));
              var We = new MessageChannel();
              We.port1.onmessage = ce, We.port2.postMessage(void 0);
            };
          }
        return ou(h);
      }
      var Na = 0, ei = !1;
      function gi(h) {
        {
          var T = Na;
          Na++, ge.current === null && (ge.current = []);
          var B = ge.isBatchingLegacy, Y;
          try {
            if (ge.isBatchingLegacy = !0, Y = h(), !B && ge.didScheduleLegacyUpdate) {
              var ce = ge.current;
              ce !== null && (ge.didScheduleLegacyUpdate = !1, Tl(ce));
            }
          } catch (pt) {
            throw ka(T), pt;
          } finally {
            ge.isBatchingLegacy = B;
          }
          if (Y !== null && typeof Y == "object" && typeof Y.then == "function") {
            var We = Y, Ee = !1, qe = {
              then: function(pt, Jt) {
                Ee = !0, We.then(function(yn) {
                  ka(T), Na === 0 ? ao(yn, pt, Jt) : pt(yn);
                }, function(yn) {
                  ka(T), Jt(yn);
                });
              }
            };
            return !ei && typeof Promise < "u" && Promise.resolve().then(function() {
            }).then(function() {
              Ee || (ei = !0, ze("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"));
            }), qe;
          } else {
            var Ct = Y;
            if (ka(T), Na === 0) {
              var Mt = ge.current;
              Mt !== null && (Tl(Mt), ge.current = null);
              var ln = {
                then: function(pt, Jt) {
                  ge.current === null ? (ge.current = [], ao(Ct, pt, Jt)) : pt(Ct);
                }
              };
              return ln;
            } else {
              var Xt = {
                then: function(pt, Jt) {
                  pt(Ct);
                }
              };
              return Xt;
            }
          }
        }
      }
      function ka(h) {
        h !== Na - 1 && ze("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "), Na = h;
      }
      function ao(h, T, B) {
        {
          var Y = ge.current;
          if (Y !== null)
            try {
              Tl(Y), ad(function() {
                Y.length === 0 ? (ge.current = null, T(h)) : ao(h, T, B);
              });
            } catch (ce) {
              B(ce);
            }
          else
            T(h);
        }
      }
      var io = !1;
      function Tl(h) {
        if (!io) {
          io = !0;
          var T = 0;
          try {
            for (; T < h.length; T++) {
              var B = h[T];
              do
                B = B(!0);
              while (B !== null);
            }
            h.length = 0;
          } catch (Y) {
            throw h = h.slice(T + 1), Y;
          } finally {
            io = !1;
          }
        }
      }
      var su = Ur, lo = es, uo = uu, ti = {
        map: pi,
        forEach: hl,
        count: qu,
        toArray: ru,
        only: ml
      };
      C.Children = ti, C.Component = Je, C.Fragment = A, C.Profiler = q, C.PureComponent = ht, C.StrictMode = g, C.Suspense = V, C.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Ut, C.act = gi, C.cloneElement = lo, C.createContext = yl, C.createElement = su, C.createFactory = uo, C.createRef = On, C.forwardRef = ee, C.isValidElement = mn, C.lazy = b, C.memo = Rt, C.startTransition = ts, C.unstable_act = gi, C.useCallback = _a, C.useContext = rt, C.useDebugValue = Yt, C.useDeferredValue = Pi, C.useEffect = an, C.useId = Xo, C.useImperativeHandle = au, C.useInsertionEffect = ur, C.useLayoutEffect = Xa, C.useMemo = Wn, C.useReducer = Mn, C.useRef = sn, C.useState = Ye, C.useSyncExternalStore = iu, C.useTransition = mt, C.version = E, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
    }();
  }(ov, ov.exports)), ov.exports;
}
process.env.NODE_ENV === "production" ? FE.exports = ZD() : FE.exports = eN();
var J = FE.exports;
const tN = /* @__PURE__ */ XD(J), nN = /* @__PURE__ */ qD({
  __proto__: null,
  default: tN
}, [J]);
/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Uw;
function rN() {
  return Uw || (Uw = 1, process.env.NODE_ENV !== "production" && function() {
    var m = J, C = Symbol.for("react.element"), E = Symbol.for("react.portal"), x = Symbol.for("react.fragment"), N = Symbol.for("react.strict_mode"), A = Symbol.for("react.profiler"), g = Symbol.for("react.provider"), q = Symbol.for("react.context"), P = Symbol.for("react.forward_ref"), F = Symbol.for("react.suspense"), ie = Symbol.for("react.suspense_list"), V = Symbol.for("react.memo"), X = Symbol.for("react.lazy"), le = Symbol.for("react.offscreen"), ve = Symbol.iterator, be = "@@iterator";
    function fe(b) {
      if (b === null || typeof b != "object")
        return null;
      var ee = ve && b[ve] || b[be];
      return typeof ee == "function" ? ee : null;
    }
    var He = m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function ue(b) {
      {
        for (var ee = arguments.length, me = new Array(ee > 1 ? ee - 1 : 0), Be = 1; Be < ee; Be++)
          me[Be - 1] = arguments[Be];
        ae("error", b, me);
      }
    }
    function ae(b, ee, me) {
      {
        var Be = He.ReactDebugCurrentFrame, Rt = Be.getStackAddendum();
        Rt !== "" && (ee += "%s", me = me.concat([Rt]));
        var nt = me.map(function(rt) {
          return String(rt);
        });
        nt.unshift("Warning: " + ee), Function.prototype.apply.call(console[b], console, nt);
      }
    }
    var he = !1, ge = !1, Ce = !1, Ne = !1, St = !1, Et;
    Et = Symbol.for("react.module.reference");
    function wt(b) {
      return !!(typeof b == "string" || typeof b == "function" || b === x || b === A || St || b === N || b === F || b === ie || Ne || b === le || he || ge || Ce || typeof b == "object" && b !== null && (b.$$typeof === X || b.$$typeof === V || b.$$typeof === g || b.$$typeof === q || b.$$typeof === P || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      b.$$typeof === Et || b.getModuleId !== void 0));
    }
    function Ot(b, ee, me) {
      var Be = b.displayName;
      if (Be)
        return Be;
      var Rt = ee.displayName || ee.name || "";
      return Rt !== "" ? me + "(" + Rt + ")" : me;
    }
    function bt(b) {
      return b.displayName || "Context";
    }
    function je(b) {
      if (b == null)
        return null;
      if (typeof b.tag == "number" && ue("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof b == "function")
        return b.displayName || b.name || null;
      if (typeof b == "string")
        return b;
      switch (b) {
        case x:
          return "Fragment";
        case E:
          return "Portal";
        case A:
          return "Profiler";
        case N:
          return "StrictMode";
        case F:
          return "Suspense";
        case ie:
          return "SuspenseList";
      }
      if (typeof b == "object")
        switch (b.$$typeof) {
          case q:
            var ee = b;
            return bt(ee) + ".Consumer";
          case g:
            var me = b;
            return bt(me._context) + ".Provider";
          case P:
            return Ot(b, b.render, "ForwardRef");
          case V:
            var Be = b.displayName || null;
            return Be !== null ? Be : je(b.type) || "Memo";
          case X: {
            var Rt = b, nt = Rt._payload, rt = Rt._init;
            try {
              return je(rt(nt));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var At = Object.assign, Ut = 0, jt, ze, de, Fe, Se, L, G;
    function et() {
    }
    et.__reactDisabledLog = !0;
    function Je() {
      {
        if (Ut === 0) {
          jt = console.log, ze = console.info, de = console.warn, Fe = console.error, Se = console.group, L = console.groupCollapsed, G = console.groupEnd;
          var b = {
            configurable: !0,
            enumerable: !0,
            value: et,
            writable: !0
          };
          Object.defineProperties(console, {
            info: b,
            log: b,
            warn: b,
            error: b,
            group: b,
            groupCollapsed: b,
            groupEnd: b
          });
        }
        Ut++;
      }
    }
    function vt() {
      {
        if (Ut--, Ut === 0) {
          var b = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: At({}, b, {
              value: jt
            }),
            info: At({}, b, {
              value: ze
            }),
            warn: At({}, b, {
              value: de
            }),
            error: At({}, b, {
              value: Fe
            }),
            group: At({}, b, {
              value: Se
            }),
            groupCollapsed: At({}, b, {
              value: L
            }),
            groupEnd: At({}, b, {
              value: G
            })
          });
        }
        Ut < 0 && ue("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var ct = He.ReactCurrentDispatcher, st;
    function ft(b, ee, me) {
      {
        if (st === void 0)
          try {
            throw Error();
          } catch (Rt) {
            var Be = Rt.stack.trim().match(/\n( *(at )?)/);
            st = Be && Be[1] || "";
          }
        return `
` + st + b;
      }
    }
    var ht = !1, Gt;
    {
      var On = typeof WeakMap == "function" ? WeakMap : Map;
      Gt = new On();
    }
    function kr(b, ee) {
      if (!b || ht)
        return "";
      {
        var me = Gt.get(b);
        if (me !== void 0)
          return me;
      }
      var Be;
      ht = !0;
      var Rt = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var nt;
      nt = ct.current, ct.current = null, Je();
      try {
        if (ee) {
          var rt = function() {
            throw Error();
          };
          if (Object.defineProperty(rt.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(rt, []);
            } catch (Wn) {
              Be = Wn;
            }
            Reflect.construct(b, [], rt);
          } else {
            try {
              rt.call();
            } catch (Wn) {
              Be = Wn;
            }
            b.call(rt.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (Wn) {
            Be = Wn;
          }
          b();
        }
      } catch (Wn) {
        if (Wn && Be && typeof Wn.stack == "string") {
          for (var Ye = Wn.stack.split(`
`), Mn = Be.stack.split(`
`), sn = Ye.length - 1, an = Mn.length - 1; sn >= 1 && an >= 0 && Ye[sn] !== Mn[an]; )
            an--;
          for (; sn >= 1 && an >= 0; sn--, an--)
            if (Ye[sn] !== Mn[an]) {
              if (sn !== 1 || an !== 1)
                do
                  if (sn--, an--, an < 0 || Ye[sn] !== Mn[an]) {
                    var ur = `
` + Ye[sn].replace(" at new ", " at ");
                    return b.displayName && ur.includes("<anonymous>") && (ur = ur.replace("<anonymous>", b.displayName)), typeof b == "function" && Gt.set(b, ur), ur;
                  }
                while (sn >= 1 && an >= 0);
              break;
            }
        }
      } finally {
        ht = !1, ct.current = nt, vt(), Error.prepareStackTrace = Rt;
      }
      var Xa = b ? b.displayName || b.name : "", _a = Xa ? ft(Xa) : "";
      return typeof b == "function" && Gt.set(b, _a), _a;
    }
    function wn(b, ee, me) {
      return kr(b, !1);
    }
    function ir(b) {
      var ee = b.prototype;
      return !!(ee && ee.isReactComponent);
    }
    function In(b, ee, me) {
      if (b == null)
        return "";
      if (typeof b == "function")
        return kr(b, ir(b));
      if (typeof b == "string")
        return ft(b);
      switch (b) {
        case F:
          return ft("Suspense");
        case ie:
          return ft("SuspenseList");
      }
      if (typeof b == "object")
        switch (b.$$typeof) {
          case P:
            return wn(b.render);
          case V:
            return In(b.type, ee, me);
          case X: {
            var Be = b, Rt = Be._payload, nt = Be._init;
            try {
              return In(nt(Rt), ee, me);
            } catch {
            }
          }
        }
      return "";
    }
    var $n = Object.prototype.hasOwnProperty, Gr = {}, fi = He.ReactDebugCurrentFrame;
    function pa(b) {
      if (b) {
        var ee = b._owner, me = In(b.type, b._source, ee ? ee.type : null);
        fi.setExtraStackFrame(me);
      } else
        fi.setExtraStackFrame(null);
    }
    function Jn(b, ee, me, Be, Rt) {
      {
        var nt = Function.call.bind($n);
        for (var rt in b)
          if (nt(b, rt)) {
            var Ye = void 0;
            try {
              if (typeof b[rt] != "function") {
                var Mn = Error((Be || "React class") + ": " + me + " type `" + rt + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof b[rt] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw Mn.name = "Invariant Violation", Mn;
              }
              Ye = b[rt](ee, rt, Be, me, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (sn) {
              Ye = sn;
            }
            Ye && !(Ye instanceof Error) && (pa(Rt), ue("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", Be || "React class", me, rt, typeof Ye), pa(null)), Ye instanceof Error && !(Ye.message in Gr) && (Gr[Ye.message] = !0, pa(Rt), ue("Failed %s type: %s", me, Ye.message), pa(null));
          }
      }
    }
    var Tn = Array.isArray;
    function Yn(b) {
      return Tn(b);
    }
    function Cr(b) {
      {
        var ee = typeof Symbol == "function" && Symbol.toStringTag, me = ee && b[Symbol.toStringTag] || b.constructor.name || "Object";
        return me;
      }
    }
    function Ga(b) {
      try {
        return Ln(b), !1;
      } catch {
        return !0;
      }
    }
    function Ln(b) {
      return "" + b;
    }
    function Rr(b) {
      if (Ga(b))
        return ue("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Cr(b)), Ln(b);
    }
    var wr = He.ReactCurrentOwner, Ka = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, di, pe, Ae;
    Ae = {};
    function dt(b) {
      if ($n.call(b, "ref")) {
        var ee = Object.getOwnPropertyDescriptor(b, "ref").get;
        if (ee && ee.isReactWarning)
          return !1;
      }
      return b.ref !== void 0;
    }
    function $t(b) {
      if ($n.call(b, "key")) {
        var ee = Object.getOwnPropertyDescriptor(b, "key").get;
        if (ee && ee.isReactWarning)
          return !1;
      }
      return b.key !== void 0;
    }
    function rn(b, ee) {
      if (typeof b.ref == "string" && wr.current && ee && wr.current.stateNode !== ee) {
        var me = je(wr.current.type);
        Ae[me] || (ue('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', je(wr.current.type), b.ref), Ae[me] = !0);
      }
    }
    function mn(b, ee) {
      {
        var me = function() {
          di || (di = !0, ue("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", ee));
        };
        me.isReactWarning = !0, Object.defineProperty(b, "key", {
          get: me,
          configurable: !0
        });
      }
    }
    function on(b, ee) {
      {
        var me = function() {
          pe || (pe = !0, ue("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", ee));
        };
        me.isReactWarning = !0, Object.defineProperty(b, "ref", {
          get: me,
          configurable: !0
        });
      }
    }
    var Zn = function(b, ee, me, Be, Rt, nt, rt) {
      var Ye = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: C,
        // Built-in properties that belong on the element
        type: b,
        key: ee,
        ref: me,
        props: rt,
        // Record the component responsible for creating this element.
        _owner: nt
      };
      return Ye._store = {}, Object.defineProperty(Ye._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(Ye, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: Be
      }), Object.defineProperty(Ye, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: Rt
      }), Object.freeze && (Object.freeze(Ye.props), Object.freeze(Ye)), Ye;
    };
    function dn(b, ee, me, Be, Rt) {
      {
        var nt, rt = {}, Ye = null, Mn = null;
        me !== void 0 && (Rr(me), Ye = "" + me), $t(ee) && (Rr(ee.key), Ye = "" + ee.key), dt(ee) && (Mn = ee.ref, rn(ee, Rt));
        for (nt in ee)
          $n.call(ee, nt) && !Ka.hasOwnProperty(nt) && (rt[nt] = ee[nt]);
        if (b && b.defaultProps) {
          var sn = b.defaultProps;
          for (nt in sn)
            rt[nt] === void 0 && (rt[nt] = sn[nt]);
        }
        if (Ye || Mn) {
          var an = typeof b == "function" ? b.displayName || b.name || "Unknown" : b;
          Ye && mn(rt, an), Mn && on(rt, an);
        }
        return Zn(b, Ye, Mn, Rt, Be, wr.current, rt);
      }
    }
    var Kt = He.ReactCurrentOwner, pn = He.ReactDebugCurrentFrame;
    function Tr(b) {
      if (b) {
        var ee = b._owner, me = In(b.type, b._source, ee ? ee.type : null);
        pn.setExtraStackFrame(me);
      } else
        pn.setExtraStackFrame(null);
    }
    var br;
    br = !1;
    function va(b) {
      return typeof b == "object" && b !== null && b.$$typeof === C;
    }
    function pi() {
      {
        if (Kt.current) {
          var b = je(Kt.current.type);
          if (b)
            return `

Check the render method of \`` + b + "`.";
        }
        return "";
      }
    }
    function qu(b) {
      {
        if (b !== void 0) {
          var ee = b.fileName.replace(/^.*[\\\/]/, ""), me = b.lineNumber;
          return `

Check your code at ` + ee + ":" + me + ".";
        }
        return "";
      }
    }
    var hl = {};
    function ru(b) {
      {
        var ee = pi();
        if (!ee) {
          var me = typeof b == "string" ? b : b.displayName || b.name;
          me && (ee = `

Check the top-level render call using <` + me + ">.");
        }
        return ee;
      }
    }
    function ml(b, ee) {
      {
        if (!b._store || b._store.validated || b.key != null)
          return;
        b._store.validated = !0;
        var me = ru(ee);
        if (hl[me])
          return;
        hl[me] = !0;
        var Be = "";
        b && b._owner && b._owner !== Kt.current && (Be = " It was passed a child from " + je(b._owner.type) + "."), Tr(b), ue('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', me, Be), Tr(null);
      }
    }
    function yl(b, ee) {
      {
        if (typeof b != "object")
          return;
        if (Yn(b))
          for (var me = 0; me < b.length; me++) {
            var Be = b[me];
            va(Be) && ml(Be, ee);
          }
        else if (va(b))
          b._store && (b._store.validated = !0);
        else if (b) {
          var Rt = fe(b);
          if (typeof Rt == "function" && Rt !== b.entries)
            for (var nt = Rt.call(b), rt; !(rt = nt.next()).done; )
              va(rt.value) && ml(rt.value, ee);
        }
      }
    }
    function Or(b) {
      {
        var ee = b.type;
        if (ee == null || typeof ee == "string")
          return;
        var me;
        if (typeof ee == "function")
          me = ee.propTypes;
        else if (typeof ee == "object" && (ee.$$typeof === P || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        ee.$$typeof === V))
          me = ee.propTypes;
        else
          return;
        if (me) {
          var Be = je(ee);
          Jn(me, b.props, "prop", Be, b);
        } else if (ee.PropTypes !== void 0 && !br) {
          br = !0;
          var Rt = je(ee);
          ue("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", Rt || "Unknown");
        }
        typeof ee.getDefaultProps == "function" && !ee.getDefaultProps.isReactClassApproved && ue("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Kr(b) {
      {
        for (var ee = Object.keys(b.props), me = 0; me < ee.length; me++) {
          var Be = ee[me];
          if (Be !== "children" && Be !== "key") {
            Tr(b), ue("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", Be), Tr(null);
            break;
          }
        }
        b.ref !== null && (Tr(b), ue("Invalid attribute `ref` supplied to `React.Fragment`."), Tr(null));
      }
    }
    var lr = {};
    function vi(b, ee, me, Be, Rt, nt) {
      {
        var rt = wt(b);
        if (!rt) {
          var Ye = "";
          (b === void 0 || typeof b == "object" && b !== null && Object.keys(b).length === 0) && (Ye += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var Mn = qu(Rt);
          Mn ? Ye += Mn : Ye += pi();
          var sn;
          b === null ? sn = "null" : Yn(b) ? sn = "array" : b !== void 0 && b.$$typeof === C ? (sn = "<" + (je(b.type) || "Unknown") + " />", Ye = " Did you accidentally export a JSX literal instead of a component?") : sn = typeof b, ue("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", sn, Ye);
        }
        var an = dn(b, ee, me, Rt, nt);
        if (an == null)
          return an;
        if (rt) {
          var ur = ee.children;
          if (ur !== void 0)
            if (Be)
              if (Yn(ur)) {
                for (var Xa = 0; Xa < ur.length; Xa++)
                  yl(ur[Xa], b);
                Object.freeze && Object.freeze(ur);
              } else
                ue("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              yl(ur, b);
        }
        if ($n.call(ee, "key")) {
          var _a = je(b), Wn = Object.keys(ee).filter(function(mt) {
            return mt !== "key";
          }), au = Wn.length > 0 ? "{key: someKey, " + Wn.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!lr[_a + au]) {
            var Yt = Wn.length > 0 ? "{" + Wn.join(": ..., ") + ": ...}" : "{}";
            ue(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, au, _a, Yt, _a), lr[_a + au] = !0;
          }
        }
        return b === x ? Kr(an) : Or(an), an;
      }
    }
    var qa = vi;
    oy.Fragment = x, oy.jsxDEV = qa;
  }()), oy;
}
process.env.NODE_ENV === "production" ? jE.exports = JD() : jE.exports = rN();
var Ge = jE.exports, VE = { exports: {} }, Wa = {}, sy = { exports: {} }, ME = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var zw;
function aN() {
  return zw || (zw = 1, function(m) {
    function C(de, Fe) {
      var Se = de.length;
      de.push(Fe);
      e: for (; 0 < Se; ) {
        var L = Se - 1 >>> 1, G = de[L];
        if (0 < N(G, Fe)) de[L] = Fe, de[Se] = G, Se = L;
        else break e;
      }
    }
    function E(de) {
      return de.length === 0 ? null : de[0];
    }
    function x(de) {
      if (de.length === 0) return null;
      var Fe = de[0], Se = de.pop();
      if (Se !== Fe) {
        de[0] = Se;
        e: for (var L = 0, G = de.length, et = G >>> 1; L < et; ) {
          var Je = 2 * (L + 1) - 1, vt = de[Je], ct = Je + 1, st = de[ct];
          if (0 > N(vt, Se)) ct < G && 0 > N(st, vt) ? (de[L] = st, de[ct] = Se, L = ct) : (de[L] = vt, de[Je] = Se, L = Je);
          else if (ct < G && 0 > N(st, Se)) de[L] = st, de[ct] = Se, L = ct;
          else break e;
        }
      }
      return Fe;
    }
    function N(de, Fe) {
      var Se = de.sortIndex - Fe.sortIndex;
      return Se !== 0 ? Se : de.id - Fe.id;
    }
    if (typeof performance == "object" && typeof performance.now == "function") {
      var A = performance;
      m.unstable_now = function() {
        return A.now();
      };
    } else {
      var g = Date, q = g.now();
      m.unstable_now = function() {
        return g.now() - q;
      };
    }
    var P = [], F = [], ie = 1, V = null, X = 3, le = !1, ve = !1, be = !1, fe = typeof setTimeout == "function" ? setTimeout : null, He = typeof clearTimeout == "function" ? clearTimeout : null, ue = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function ae(de) {
      for (var Fe = E(F); Fe !== null; ) {
        if (Fe.callback === null) x(F);
        else if (Fe.startTime <= de) x(F), Fe.sortIndex = Fe.expirationTime, C(P, Fe);
        else break;
        Fe = E(F);
      }
    }
    function he(de) {
      if (be = !1, ae(de), !ve) if (E(P) !== null) ve = !0, jt(ge);
      else {
        var Fe = E(F);
        Fe !== null && ze(he, Fe.startTime - de);
      }
    }
    function ge(de, Fe) {
      ve = !1, be && (be = !1, He(St), St = -1), le = !0;
      var Se = X;
      try {
        for (ae(Fe), V = E(P); V !== null && (!(V.expirationTime > Fe) || de && !Ot()); ) {
          var L = V.callback;
          if (typeof L == "function") {
            V.callback = null, X = V.priorityLevel;
            var G = L(V.expirationTime <= Fe);
            Fe = m.unstable_now(), typeof G == "function" ? V.callback = G : V === E(P) && x(P), ae(Fe);
          } else x(P);
          V = E(P);
        }
        if (V !== null) var et = !0;
        else {
          var Je = E(F);
          Je !== null && ze(he, Je.startTime - Fe), et = !1;
        }
        return et;
      } finally {
        V = null, X = Se, le = !1;
      }
    }
    var Ce = !1, Ne = null, St = -1, Et = 5, wt = -1;
    function Ot() {
      return !(m.unstable_now() - wt < Et);
    }
    function bt() {
      if (Ne !== null) {
        var de = m.unstable_now();
        wt = de;
        var Fe = !0;
        try {
          Fe = Ne(!0, de);
        } finally {
          Fe ? je() : (Ce = !1, Ne = null);
        }
      } else Ce = !1;
    }
    var je;
    if (typeof ue == "function") je = function() {
      ue(bt);
    };
    else if (typeof MessageChannel < "u") {
      var At = new MessageChannel(), Ut = At.port2;
      At.port1.onmessage = bt, je = function() {
        Ut.postMessage(null);
      };
    } else je = function() {
      fe(bt, 0);
    };
    function jt(de) {
      Ne = de, Ce || (Ce = !0, je());
    }
    function ze(de, Fe) {
      St = fe(function() {
        de(m.unstable_now());
      }, Fe);
    }
    m.unstable_IdlePriority = 5, m.unstable_ImmediatePriority = 1, m.unstable_LowPriority = 4, m.unstable_NormalPriority = 3, m.unstable_Profiling = null, m.unstable_UserBlockingPriority = 2, m.unstable_cancelCallback = function(de) {
      de.callback = null;
    }, m.unstable_continueExecution = function() {
      ve || le || (ve = !0, jt(ge));
    }, m.unstable_forceFrameRate = function(de) {
      0 > de || 125 < de ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : Et = 0 < de ? Math.floor(1e3 / de) : 5;
    }, m.unstable_getCurrentPriorityLevel = function() {
      return X;
    }, m.unstable_getFirstCallbackNode = function() {
      return E(P);
    }, m.unstable_next = function(de) {
      switch (X) {
        case 1:
        case 2:
        case 3:
          var Fe = 3;
          break;
        default:
          Fe = X;
      }
      var Se = X;
      X = Fe;
      try {
        return de();
      } finally {
        X = Se;
      }
    }, m.unstable_pauseExecution = function() {
    }, m.unstable_requestPaint = function() {
    }, m.unstable_runWithPriority = function(de, Fe) {
      switch (de) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          de = 3;
      }
      var Se = X;
      X = de;
      try {
        return Fe();
      } finally {
        X = Se;
      }
    }, m.unstable_scheduleCallback = function(de, Fe, Se) {
      var L = m.unstable_now();
      switch (typeof Se == "object" && Se !== null ? (Se = Se.delay, Se = typeof Se == "number" && 0 < Se ? L + Se : L) : Se = L, de) {
        case 1:
          var G = -1;
          break;
        case 2:
          G = 250;
          break;
        case 5:
          G = 1073741823;
          break;
        case 4:
          G = 1e4;
          break;
        default:
          G = 5e3;
      }
      return G = Se + G, de = { id: ie++, callback: Fe, priorityLevel: de, startTime: Se, expirationTime: G, sortIndex: -1 }, Se > L ? (de.sortIndex = Se, C(F, de), E(P) === null && de === E(F) && (be ? (He(St), St = -1) : be = !0, ze(he, Se - L))) : (de.sortIndex = G, C(P, de), ve || le || (ve = !0, jt(ge))), de;
    }, m.unstable_shouldYield = Ot, m.unstable_wrapCallback = function(de) {
      var Fe = X;
      return function() {
        var Se = X;
        X = Fe;
        try {
          return de.apply(this, arguments);
        } finally {
          X = Se;
        }
      };
    };
  }(ME)), ME;
}
var UE = {};
/**
 * @license React
 * scheduler.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Aw;
function iN() {
  return Aw || (Aw = 1, function(m) {
    process.env.NODE_ENV !== "production" && function() {
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
      var C = !1, E = 5;
      function x(pe, Ae) {
        var dt = pe.length;
        pe.push(Ae), g(pe, Ae, dt);
      }
      function N(pe) {
        return pe.length === 0 ? null : pe[0];
      }
      function A(pe) {
        if (pe.length === 0)
          return null;
        var Ae = pe[0], dt = pe.pop();
        return dt !== Ae && (pe[0] = dt, q(pe, dt, 0)), Ae;
      }
      function g(pe, Ae, dt) {
        for (var $t = dt; $t > 0; ) {
          var rn = $t - 1 >>> 1, mn = pe[rn];
          if (P(mn, Ae) > 0)
            pe[rn] = Ae, pe[$t] = mn, $t = rn;
          else
            return;
        }
      }
      function q(pe, Ae, dt) {
        for (var $t = dt, rn = pe.length, mn = rn >>> 1; $t < mn; ) {
          var on = ($t + 1) * 2 - 1, Zn = pe[on], dn = on + 1, Kt = pe[dn];
          if (P(Zn, Ae) < 0)
            dn < rn && P(Kt, Zn) < 0 ? (pe[$t] = Kt, pe[dn] = Ae, $t = dn) : (pe[$t] = Zn, pe[on] = Ae, $t = on);
          else if (dn < rn && P(Kt, Ae) < 0)
            pe[$t] = Kt, pe[dn] = Ae, $t = dn;
          else
            return;
        }
      }
      function P(pe, Ae) {
        var dt = pe.sortIndex - Ae.sortIndex;
        return dt !== 0 ? dt : pe.id - Ae.id;
      }
      var F = 1, ie = 2, V = 3, X = 4, le = 5;
      function ve(pe, Ae) {
      }
      var be = typeof performance == "object" && typeof performance.now == "function";
      if (be) {
        var fe = performance;
        m.unstable_now = function() {
          return fe.now();
        };
      } else {
        var He = Date, ue = He.now();
        m.unstable_now = function() {
          return He.now() - ue;
        };
      }
      var ae = 1073741823, he = -1, ge = 250, Ce = 5e3, Ne = 1e4, St = ae, Et = [], wt = [], Ot = 1, bt = null, je = V, At = !1, Ut = !1, jt = !1, ze = typeof setTimeout == "function" ? setTimeout : null, de = typeof clearTimeout == "function" ? clearTimeout : null, Fe = typeof setImmediate < "u" ? setImmediate : null;
      typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
      function Se(pe) {
        for (var Ae = N(wt); Ae !== null; ) {
          if (Ae.callback === null)
            A(wt);
          else if (Ae.startTime <= pe)
            A(wt), Ae.sortIndex = Ae.expirationTime, x(Et, Ae);
          else
            return;
          Ae = N(wt);
        }
      }
      function L(pe) {
        if (jt = !1, Se(pe), !Ut)
          if (N(Et) !== null)
            Ut = !0, Ln(G);
          else {
            var Ae = N(wt);
            Ae !== null && Rr(L, Ae.startTime - pe);
          }
      }
      function G(pe, Ae) {
        Ut = !1, jt && (jt = !1, wr()), At = !0;
        var dt = je;
        try {
          var $t;
          if (!C) return et(pe, Ae);
        } finally {
          bt = null, je = dt, At = !1;
        }
      }
      function et(pe, Ae) {
        var dt = Ae;
        for (Se(dt), bt = N(Et); bt !== null && !(bt.expirationTime > dt && (!pe || fi())); ) {
          var $t = bt.callback;
          if (typeof $t == "function") {
            bt.callback = null, je = bt.priorityLevel;
            var rn = bt.expirationTime <= dt, mn = $t(rn);
            dt = m.unstable_now(), typeof mn == "function" ? bt.callback = mn : bt === N(Et) && A(Et), Se(dt);
          } else
            A(Et);
          bt = N(Et);
        }
        if (bt !== null)
          return !0;
        var on = N(wt);
        return on !== null && Rr(L, on.startTime - dt), !1;
      }
      function Je(pe, Ae) {
        switch (pe) {
          case F:
          case ie:
          case V:
          case X:
          case le:
            break;
          default:
            pe = V;
        }
        var dt = je;
        je = pe;
        try {
          return Ae();
        } finally {
          je = dt;
        }
      }
      function vt(pe) {
        var Ae;
        switch (je) {
          case F:
          case ie:
          case V:
            Ae = V;
            break;
          default:
            Ae = je;
            break;
        }
        var dt = je;
        je = Ae;
        try {
          return pe();
        } finally {
          je = dt;
        }
      }
      function ct(pe) {
        var Ae = je;
        return function() {
          var dt = je;
          je = Ae;
          try {
            return pe.apply(this, arguments);
          } finally {
            je = dt;
          }
        };
      }
      function st(pe, Ae, dt) {
        var $t = m.unstable_now(), rn;
        if (typeof dt == "object" && dt !== null) {
          var mn = dt.delay;
          typeof mn == "number" && mn > 0 ? rn = $t + mn : rn = $t;
        } else
          rn = $t;
        var on;
        switch (pe) {
          case F:
            on = he;
            break;
          case ie:
            on = ge;
            break;
          case le:
            on = St;
            break;
          case X:
            on = Ne;
            break;
          case V:
          default:
            on = Ce;
            break;
        }
        var Zn = rn + on, dn = {
          id: Ot++,
          callback: Ae,
          priorityLevel: pe,
          startTime: rn,
          expirationTime: Zn,
          sortIndex: -1
        };
        return rn > $t ? (dn.sortIndex = rn, x(wt, dn), N(Et) === null && dn === N(wt) && (jt ? wr() : jt = !0, Rr(L, rn - $t))) : (dn.sortIndex = Zn, x(Et, dn), !Ut && !At && (Ut = !0, Ln(G))), dn;
      }
      function ft() {
      }
      function ht() {
        !Ut && !At && (Ut = !0, Ln(G));
      }
      function Gt() {
        return N(Et);
      }
      function On(pe) {
        pe.callback = null;
      }
      function kr() {
        return je;
      }
      var wn = !1, ir = null, In = -1, $n = E, Gr = -1;
      function fi() {
        var pe = m.unstable_now() - Gr;
        return !(pe < $n);
      }
      function pa() {
      }
      function Jn(pe) {
        if (pe < 0 || pe > 125) {
          console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported");
          return;
        }
        pe > 0 ? $n = Math.floor(1e3 / pe) : $n = E;
      }
      var Tn = function() {
        if (ir !== null) {
          var pe = m.unstable_now();
          Gr = pe;
          var Ae = !0, dt = !0;
          try {
            dt = ir(Ae, pe);
          } finally {
            dt ? Yn() : (wn = !1, ir = null);
          }
        } else
          wn = !1;
      }, Yn;
      if (typeof Fe == "function")
        Yn = function() {
          Fe(Tn);
        };
      else if (typeof MessageChannel < "u") {
        var Cr = new MessageChannel(), Ga = Cr.port2;
        Cr.port1.onmessage = Tn, Yn = function() {
          Ga.postMessage(null);
        };
      } else
        Yn = function() {
          ze(Tn, 0);
        };
      function Ln(pe) {
        ir = pe, wn || (wn = !0, Yn());
      }
      function Rr(pe, Ae) {
        In = ze(function() {
          pe(m.unstable_now());
        }, Ae);
      }
      function wr() {
        de(In), In = -1;
      }
      var Ka = pa, di = null;
      m.unstable_IdlePriority = le, m.unstable_ImmediatePriority = F, m.unstable_LowPriority = X, m.unstable_NormalPriority = V, m.unstable_Profiling = di, m.unstable_UserBlockingPriority = ie, m.unstable_cancelCallback = On, m.unstable_continueExecution = ht, m.unstable_forceFrameRate = Jn, m.unstable_getCurrentPriorityLevel = kr, m.unstable_getFirstCallbackNode = Gt, m.unstable_next = vt, m.unstable_pauseExecution = ft, m.unstable_requestPaint = Ka, m.unstable_runWithPriority = Je, m.unstable_scheduleCallback = st, m.unstable_shouldYield = fi, m.unstable_wrapCallback = ct, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
    }();
  }(UE)), UE;
}
var jw;
function Xw() {
  return jw || (jw = 1, process.env.NODE_ENV === "production" ? sy.exports = aN() : sy.exports = iN()), sy.exports;
}
/**
 * @license React
 * react-dom.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Fw;
function lN() {
  if (Fw) return Wa;
  Fw = 1;
  var m = J, C = Xw();
  function E(n) {
    for (var r = "https://reactjs.org/docs/error-decoder.html?invariant=" + n, l = 1; l < arguments.length; l++) r += "&args[]=" + encodeURIComponent(arguments[l]);
    return "Minified React error #" + n + "; visit " + r + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var x = /* @__PURE__ */ new Set(), N = {};
  function A(n, r) {
    g(n, r), g(n + "Capture", r);
  }
  function g(n, r) {
    for (N[n] = r, n = 0; n < r.length; n++) x.add(r[n]);
  }
  var q = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), P = Object.prototype.hasOwnProperty, F = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, ie = {}, V = {};
  function X(n) {
    return P.call(V, n) ? !0 : P.call(ie, n) ? !1 : F.test(n) ? V[n] = !0 : (ie[n] = !0, !1);
  }
  function le(n, r, l, o) {
    if (l !== null && l.type === 0) return !1;
    switch (typeof r) {
      case "function":
      case "symbol":
        return !0;
      case "boolean":
        return o ? !1 : l !== null ? !l.acceptsBooleans : (n = n.toLowerCase().slice(0, 5), n !== "data-" && n !== "aria-");
      default:
        return !1;
    }
  }
  function ve(n, r, l, o) {
    if (r === null || typeof r > "u" || le(n, r, l, o)) return !0;
    if (o) return !1;
    if (l !== null) switch (l.type) {
      case 3:
        return !r;
      case 4:
        return r === !1;
      case 5:
        return isNaN(r);
      case 6:
        return isNaN(r) || 1 > r;
    }
    return !1;
  }
  function be(n, r, l, o, c, d, y) {
    this.acceptsBooleans = r === 2 || r === 3 || r === 4, this.attributeName = o, this.attributeNamespace = c, this.mustUseProperty = l, this.propertyName = n, this.type = r, this.sanitizeURL = d, this.removeEmptyString = y;
  }
  var fe = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(n) {
    fe[n] = new be(n, 0, !1, n, null, !1, !1);
  }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(n) {
    var r = n[0];
    fe[r] = new be(r, 1, !1, n[1], null, !1, !1);
  }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(n) {
    fe[n] = new be(n, 2, !1, n.toLowerCase(), null, !1, !1);
  }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(n) {
    fe[n] = new be(n, 2, !1, n, null, !1, !1);
  }), "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(n) {
    fe[n] = new be(n, 3, !1, n.toLowerCase(), null, !1, !1);
  }), ["checked", "multiple", "muted", "selected"].forEach(function(n) {
    fe[n] = new be(n, 3, !0, n, null, !1, !1);
  }), ["capture", "download"].forEach(function(n) {
    fe[n] = new be(n, 4, !1, n, null, !1, !1);
  }), ["cols", "rows", "size", "span"].forEach(function(n) {
    fe[n] = new be(n, 6, !1, n, null, !1, !1);
  }), ["rowSpan", "start"].forEach(function(n) {
    fe[n] = new be(n, 5, !1, n.toLowerCase(), null, !1, !1);
  });
  var He = /[\-:]([a-z])/g;
  function ue(n) {
    return n[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(n) {
    var r = n.replace(
      He,
      ue
    );
    fe[r] = new be(r, 1, !1, n, null, !1, !1);
  }), "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(n) {
    var r = n.replace(He, ue);
    fe[r] = new be(r, 1, !1, n, "http://www.w3.org/1999/xlink", !1, !1);
  }), ["xml:base", "xml:lang", "xml:space"].forEach(function(n) {
    var r = n.replace(He, ue);
    fe[r] = new be(r, 1, !1, n, "http://www.w3.org/XML/1998/namespace", !1, !1);
  }), ["tabIndex", "crossOrigin"].forEach(function(n) {
    fe[n] = new be(n, 1, !1, n.toLowerCase(), null, !1, !1);
  }), fe.xlinkHref = new be("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1), ["src", "href", "action", "formAction"].forEach(function(n) {
    fe[n] = new be(n, 1, !1, n.toLowerCase(), null, !0, !0);
  });
  function ae(n, r, l, o) {
    var c = fe.hasOwnProperty(r) ? fe[r] : null;
    (c !== null ? c.type !== 0 : o || !(2 < r.length) || r[0] !== "o" && r[0] !== "O" || r[1] !== "n" && r[1] !== "N") && (ve(r, l, c, o) && (l = null), o || c === null ? X(r) && (l === null ? n.removeAttribute(r) : n.setAttribute(r, "" + l)) : c.mustUseProperty ? n[c.propertyName] = l === null ? c.type === 3 ? !1 : "" : l : (r = c.attributeName, o = c.attributeNamespace, l === null ? n.removeAttribute(r) : (c = c.type, l = c === 3 || c === 4 && l === !0 ? "" : "" + l, o ? n.setAttributeNS(o, r, l) : n.setAttribute(r, l))));
  }
  var he = m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, ge = Symbol.for("react.element"), Ce = Symbol.for("react.portal"), Ne = Symbol.for("react.fragment"), St = Symbol.for("react.strict_mode"), Et = Symbol.for("react.profiler"), wt = Symbol.for("react.provider"), Ot = Symbol.for("react.context"), bt = Symbol.for("react.forward_ref"), je = Symbol.for("react.suspense"), At = Symbol.for("react.suspense_list"), Ut = Symbol.for("react.memo"), jt = Symbol.for("react.lazy"), ze = Symbol.for("react.offscreen"), de = Symbol.iterator;
  function Fe(n) {
    return n === null || typeof n != "object" ? null : (n = de && n[de] || n["@@iterator"], typeof n == "function" ? n : null);
  }
  var Se = Object.assign, L;
  function G(n) {
    if (L === void 0) try {
      throw Error();
    } catch (l) {
      var r = l.stack.trim().match(/\n( *(at )?)/);
      L = r && r[1] || "";
    }
    return `
` + L + n;
  }
  var et = !1;
  function Je(n, r) {
    if (!n || et) return "";
    et = !0;
    var l = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    try {
      if (r) if (r = function() {
        throw Error();
      }, Object.defineProperty(r.prototype, "props", { set: function() {
        throw Error();
      } }), typeof Reflect == "object" && Reflect.construct) {
        try {
          Reflect.construct(r, []);
        } catch (I) {
          var o = I;
        }
        Reflect.construct(n, [], r);
      } else {
        try {
          r.call();
        } catch (I) {
          o = I;
        }
        n.call(r.prototype);
      }
      else {
        try {
          throw Error();
        } catch (I) {
          o = I;
        }
        n();
      }
    } catch (I) {
      if (I && o && typeof I.stack == "string") {
        for (var c = I.stack.split(`
`), d = o.stack.split(`
`), y = c.length - 1, w = d.length - 1; 1 <= y && 0 <= w && c[y] !== d[w]; ) w--;
        for (; 1 <= y && 0 <= w; y--, w--) if (c[y] !== d[w]) {
          if (y !== 1 || w !== 1)
            do
              if (y--, w--, 0 > w || c[y] !== d[w]) {
                var _ = `
` + c[y].replace(" at new ", " at ");
                return n.displayName && _.includes("<anonymous>") && (_ = _.replace("<anonymous>", n.displayName)), _;
              }
            while (1 <= y && 0 <= w);
          break;
        }
      }
    } finally {
      et = !1, Error.prepareStackTrace = l;
    }
    return (n = n ? n.displayName || n.name : "") ? G(n) : "";
  }
  function vt(n) {
    switch (n.tag) {
      case 5:
        return G(n.type);
      case 16:
        return G("Lazy");
      case 13:
        return G("Suspense");
      case 19:
        return G("SuspenseList");
      case 0:
      case 2:
      case 15:
        return n = Je(n.type, !1), n;
      case 11:
        return n = Je(n.type.render, !1), n;
      case 1:
        return n = Je(n.type, !0), n;
      default:
        return "";
    }
  }
  function ct(n) {
    if (n == null) return null;
    if (typeof n == "function") return n.displayName || n.name || null;
    if (typeof n == "string") return n;
    switch (n) {
      case Ne:
        return "Fragment";
      case Ce:
        return "Portal";
      case Et:
        return "Profiler";
      case St:
        return "StrictMode";
      case je:
        return "Suspense";
      case At:
        return "SuspenseList";
    }
    if (typeof n == "object") switch (n.$$typeof) {
      case Ot:
        return (n.displayName || "Context") + ".Consumer";
      case wt:
        return (n._context.displayName || "Context") + ".Provider";
      case bt:
        var r = n.render;
        return n = n.displayName, n || (n = r.displayName || r.name || "", n = n !== "" ? "ForwardRef(" + n + ")" : "ForwardRef"), n;
      case Ut:
        return r = n.displayName || null, r !== null ? r : ct(n.type) || "Memo";
      case jt:
        r = n._payload, n = n._init;
        try {
          return ct(n(r));
        } catch {
        }
    }
    return null;
  }
  function st(n) {
    var r = n.type;
    switch (n.tag) {
      case 24:
        return "Cache";
      case 9:
        return (r.displayName || "Context") + ".Consumer";
      case 10:
        return (r._context.displayName || "Context") + ".Provider";
      case 18:
        return "DehydratedFragment";
      case 11:
        return n = r.render, n = n.displayName || n.name || "", r.displayName || (n !== "" ? "ForwardRef(" + n + ")" : "ForwardRef");
      case 7:
        return "Fragment";
      case 5:
        return r;
      case 4:
        return "Portal";
      case 3:
        return "Root";
      case 6:
        return "Text";
      case 16:
        return ct(r);
      case 8:
        return r === St ? "StrictMode" : "Mode";
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
        if (typeof r == "function") return r.displayName || r.name || null;
        if (typeof r == "string") return r;
    }
    return null;
  }
  function ft(n) {
    switch (typeof n) {
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return n;
      case "object":
        return n;
      default:
        return "";
    }
  }
  function ht(n) {
    var r = n.type;
    return (n = n.nodeName) && n.toLowerCase() === "input" && (r === "checkbox" || r === "radio");
  }
  function Gt(n) {
    var r = ht(n) ? "checked" : "value", l = Object.getOwnPropertyDescriptor(n.constructor.prototype, r), o = "" + n[r];
    if (!n.hasOwnProperty(r) && typeof l < "u" && typeof l.get == "function" && typeof l.set == "function") {
      var c = l.get, d = l.set;
      return Object.defineProperty(n, r, { configurable: !0, get: function() {
        return c.call(this);
      }, set: function(y) {
        o = "" + y, d.call(this, y);
      } }), Object.defineProperty(n, r, { enumerable: l.enumerable }), { getValue: function() {
        return o;
      }, setValue: function(y) {
        o = "" + y;
      }, stopTracking: function() {
        n._valueTracker = null, delete n[r];
      } };
    }
  }
  function On(n) {
    n._valueTracker || (n._valueTracker = Gt(n));
  }
  function kr(n) {
    if (!n) return !1;
    var r = n._valueTracker;
    if (!r) return !0;
    var l = r.getValue(), o = "";
    return n && (o = ht(n) ? n.checked ? "true" : "false" : n.value), n = o, n !== l ? (r.setValue(n), !0) : !1;
  }
  function wn(n) {
    if (n = n || (typeof document < "u" ? document : void 0), typeof n > "u") return null;
    try {
      return n.activeElement || n.body;
    } catch {
      return n.body;
    }
  }
  function ir(n, r) {
    var l = r.checked;
    return Se({}, r, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: l ?? n._wrapperState.initialChecked });
  }
  function In(n, r) {
    var l = r.defaultValue == null ? "" : r.defaultValue, o = r.checked != null ? r.checked : r.defaultChecked;
    l = ft(r.value != null ? r.value : l), n._wrapperState = { initialChecked: o, initialValue: l, controlled: r.type === "checkbox" || r.type === "radio" ? r.checked != null : r.value != null };
  }
  function $n(n, r) {
    r = r.checked, r != null && ae(n, "checked", r, !1);
  }
  function Gr(n, r) {
    $n(n, r);
    var l = ft(r.value), o = r.type;
    if (l != null) o === "number" ? (l === 0 && n.value === "" || n.value != l) && (n.value = "" + l) : n.value !== "" + l && (n.value = "" + l);
    else if (o === "submit" || o === "reset") {
      n.removeAttribute("value");
      return;
    }
    r.hasOwnProperty("value") ? pa(n, r.type, l) : r.hasOwnProperty("defaultValue") && pa(n, r.type, ft(r.defaultValue)), r.checked == null && r.defaultChecked != null && (n.defaultChecked = !!r.defaultChecked);
  }
  function fi(n, r, l) {
    if (r.hasOwnProperty("value") || r.hasOwnProperty("defaultValue")) {
      var o = r.type;
      if (!(o !== "submit" && o !== "reset" || r.value !== void 0 && r.value !== null)) return;
      r = "" + n._wrapperState.initialValue, l || r === n.value || (n.value = r), n.defaultValue = r;
    }
    l = n.name, l !== "" && (n.name = ""), n.defaultChecked = !!n._wrapperState.initialChecked, l !== "" && (n.name = l);
  }
  function pa(n, r, l) {
    (r !== "number" || wn(n.ownerDocument) !== n) && (l == null ? n.defaultValue = "" + n._wrapperState.initialValue : n.defaultValue !== "" + l && (n.defaultValue = "" + l));
  }
  var Jn = Array.isArray;
  function Tn(n, r, l, o) {
    if (n = n.options, r) {
      r = {};
      for (var c = 0; c < l.length; c++) r["$" + l[c]] = !0;
      for (l = 0; l < n.length; l++) c = r.hasOwnProperty("$" + n[l].value), n[l].selected !== c && (n[l].selected = c), c && o && (n[l].defaultSelected = !0);
    } else {
      for (l = "" + ft(l), r = null, c = 0; c < n.length; c++) {
        if (n[c].value === l) {
          n[c].selected = !0, o && (n[c].defaultSelected = !0);
          return;
        }
        r !== null || n[c].disabled || (r = n[c]);
      }
      r !== null && (r.selected = !0);
    }
  }
  function Yn(n, r) {
    if (r.dangerouslySetInnerHTML != null) throw Error(E(91));
    return Se({}, r, { value: void 0, defaultValue: void 0, children: "" + n._wrapperState.initialValue });
  }
  function Cr(n, r) {
    var l = r.value;
    if (l == null) {
      if (l = r.children, r = r.defaultValue, l != null) {
        if (r != null) throw Error(E(92));
        if (Jn(l)) {
          if (1 < l.length) throw Error(E(93));
          l = l[0];
        }
        r = l;
      }
      r == null && (r = ""), l = r;
    }
    n._wrapperState = { initialValue: ft(l) };
  }
  function Ga(n, r) {
    var l = ft(r.value), o = ft(r.defaultValue);
    l != null && (l = "" + l, l !== n.value && (n.value = l), r.defaultValue == null && n.defaultValue !== l && (n.defaultValue = l)), o != null && (n.defaultValue = "" + o);
  }
  function Ln(n) {
    var r = n.textContent;
    r === n._wrapperState.initialValue && r !== "" && r !== null && (n.value = r);
  }
  function Rr(n) {
    switch (n) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function wr(n, r) {
    return n == null || n === "http://www.w3.org/1999/xhtml" ? Rr(r) : n === "http://www.w3.org/2000/svg" && r === "foreignObject" ? "http://www.w3.org/1999/xhtml" : n;
  }
  var Ka, di = function(n) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(r, l, o, c) {
      MSApp.execUnsafeLocalFunction(function() {
        return n(r, l, o, c);
      });
    } : n;
  }(function(n, r) {
    if (n.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in n) n.innerHTML = r;
    else {
      for (Ka = Ka || document.createElement("div"), Ka.innerHTML = "<svg>" + r.valueOf().toString() + "</svg>", r = Ka.firstChild; n.firstChild; ) n.removeChild(n.firstChild);
      for (; r.firstChild; ) n.appendChild(r.firstChild);
    }
  });
  function pe(n, r) {
    if (r) {
      var l = n.firstChild;
      if (l && l === n.lastChild && l.nodeType === 3) {
        l.nodeValue = r;
        return;
      }
    }
    n.textContent = r;
  }
  var Ae = {
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
  }, dt = ["Webkit", "ms", "Moz", "O"];
  Object.keys(Ae).forEach(function(n) {
    dt.forEach(function(r) {
      r = r + n.charAt(0).toUpperCase() + n.substring(1), Ae[r] = Ae[n];
    });
  });
  function $t(n, r, l) {
    return r == null || typeof r == "boolean" || r === "" ? "" : l || typeof r != "number" || r === 0 || Ae.hasOwnProperty(n) && Ae[n] ? ("" + r).trim() : r + "px";
  }
  function rn(n, r) {
    n = n.style;
    for (var l in r) if (r.hasOwnProperty(l)) {
      var o = l.indexOf("--") === 0, c = $t(l, r[l], o);
      l === "float" && (l = "cssFloat"), o ? n.setProperty(l, c) : n[l] = c;
    }
  }
  var mn = Se({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
  function on(n, r) {
    if (r) {
      if (mn[n] && (r.children != null || r.dangerouslySetInnerHTML != null)) throw Error(E(137, n));
      if (r.dangerouslySetInnerHTML != null) {
        if (r.children != null) throw Error(E(60));
        if (typeof r.dangerouslySetInnerHTML != "object" || !("__html" in r.dangerouslySetInnerHTML)) throw Error(E(61));
      }
      if (r.style != null && typeof r.style != "object") throw Error(E(62));
    }
  }
  function Zn(n, r) {
    if (n.indexOf("-") === -1) return typeof r.is == "string";
    switch (n) {
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
  var dn = null;
  function Kt(n) {
    return n = n.target || n.srcElement || window, n.correspondingUseElement && (n = n.correspondingUseElement), n.nodeType === 3 ? n.parentNode : n;
  }
  var pn = null, Tr = null, br = null;
  function va(n) {
    if (n = Ie(n)) {
      if (typeof pn != "function") throw Error(E(280));
      var r = n.stateNode;
      r && (r = gn(r), pn(n.stateNode, n.type, r));
    }
  }
  function pi(n) {
    Tr ? br ? br.push(n) : br = [n] : Tr = n;
  }
  function qu() {
    if (Tr) {
      var n = Tr, r = br;
      if (br = Tr = null, va(n), r) for (n = 0; n < r.length; n++) va(r[n]);
    }
  }
  function hl(n, r) {
    return n(r);
  }
  function ru() {
  }
  var ml = !1;
  function yl(n, r, l) {
    if (ml) return n(r, l);
    ml = !0;
    try {
      return hl(n, r, l);
    } finally {
      ml = !1, (Tr !== null || br !== null) && (ru(), qu());
    }
  }
  function Or(n, r) {
    var l = n.stateNode;
    if (l === null) return null;
    var o = gn(l);
    if (o === null) return null;
    l = o[r];
    e: switch (r) {
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
        (o = !o.disabled) || (n = n.type, o = !(n === "button" || n === "input" || n === "select" || n === "textarea")), n = !o;
        break e;
      default:
        n = !1;
    }
    if (n) return null;
    if (l && typeof l != "function") throw Error(E(231, r, typeof l));
    return l;
  }
  var Kr = !1;
  if (q) try {
    var lr = {};
    Object.defineProperty(lr, "passive", { get: function() {
      Kr = !0;
    } }), window.addEventListener("test", lr, lr), window.removeEventListener("test", lr, lr);
  } catch {
    Kr = !1;
  }
  function vi(n, r, l, o, c, d, y, w, _) {
    var I = Array.prototype.slice.call(arguments, 3);
    try {
      r.apply(l, I);
    } catch (ne) {
      this.onError(ne);
    }
  }
  var qa = !1, b = null, ee = !1, me = null, Be = { onError: function(n) {
    qa = !0, b = n;
  } };
  function Rt(n, r, l, o, c, d, y, w, _) {
    qa = !1, b = null, vi.apply(Be, arguments);
  }
  function nt(n, r, l, o, c, d, y, w, _) {
    if (Rt.apply(this, arguments), qa) {
      if (qa) {
        var I = b;
        qa = !1, b = null;
      } else throw Error(E(198));
      ee || (ee = !0, me = I);
    }
  }
  function rt(n) {
    var r = n, l = n;
    if (n.alternate) for (; r.return; ) r = r.return;
    else {
      n = r;
      do
        r = n, r.flags & 4098 && (l = r.return), n = r.return;
      while (n);
    }
    return r.tag === 3 ? l : null;
  }
  function Ye(n) {
    if (n.tag === 13) {
      var r = n.memoizedState;
      if (r === null && (n = n.alternate, n !== null && (r = n.memoizedState)), r !== null) return r.dehydrated;
    }
    return null;
  }
  function Mn(n) {
    if (rt(n) !== n) throw Error(E(188));
  }
  function sn(n) {
    var r = n.alternate;
    if (!r) {
      if (r = rt(n), r === null) throw Error(E(188));
      return r !== n ? null : n;
    }
    for (var l = n, o = r; ; ) {
      var c = l.return;
      if (c === null) break;
      var d = c.alternate;
      if (d === null) {
        if (o = c.return, o !== null) {
          l = o;
          continue;
        }
        break;
      }
      if (c.child === d.child) {
        for (d = c.child; d; ) {
          if (d === l) return Mn(c), n;
          if (d === o) return Mn(c), r;
          d = d.sibling;
        }
        throw Error(E(188));
      }
      if (l.return !== o.return) l = c, o = d;
      else {
        for (var y = !1, w = c.child; w; ) {
          if (w === l) {
            y = !0, l = c, o = d;
            break;
          }
          if (w === o) {
            y = !0, o = c, l = d;
            break;
          }
          w = w.sibling;
        }
        if (!y) {
          for (w = d.child; w; ) {
            if (w === l) {
              y = !0, l = d, o = c;
              break;
            }
            if (w === o) {
              y = !0, o = d, l = c;
              break;
            }
            w = w.sibling;
          }
          if (!y) throw Error(E(189));
        }
      }
      if (l.alternate !== o) throw Error(E(190));
    }
    if (l.tag !== 3) throw Error(E(188));
    return l.stateNode.current === l ? n : r;
  }
  function an(n) {
    return n = sn(n), n !== null ? ur(n) : null;
  }
  function ur(n) {
    if (n.tag === 5 || n.tag === 6) return n;
    for (n = n.child; n !== null; ) {
      var r = ur(n);
      if (r !== null) return r;
      n = n.sibling;
    }
    return null;
  }
  var Xa = C.unstable_scheduleCallback, _a = C.unstable_cancelCallback, Wn = C.unstable_shouldYield, au = C.unstable_requestPaint, Yt = C.unstable_now, mt = C.unstable_getCurrentPriorityLevel, Pi = C.unstable_ImmediatePriority, Xo = C.unstable_UserBlockingPriority, iu = C.unstable_NormalPriority, gl = C.unstable_LowPriority, Xu = C.unstable_IdlePriority, Sl = null, qr = null;
  function Jo(n) {
    if (qr && typeof qr.onCommitFiberRoot == "function") try {
      qr.onCommitFiberRoot(Sl, n, void 0, (n.current.flags & 128) === 128);
    } catch {
    }
  }
  var Lr = Math.clz32 ? Math.clz32 : Ju, vc = Math.log, hc = Math.LN2;
  function Ju(n) {
    return n >>>= 0, n === 0 ? 32 : 31 - (vc(n) / hc | 0) | 0;
  }
  var El = 64, ha = 4194304;
  function Ja(n) {
    switch (n & -n) {
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
        return n & 4194240;
      case 4194304:
      case 8388608:
      case 16777216:
      case 33554432:
      case 67108864:
        return n & 130023424;
      case 134217728:
        return 134217728;
      case 268435456:
        return 268435456;
      case 536870912:
        return 536870912;
      case 1073741824:
        return 1073741824;
      default:
        return n;
    }
  }
  function Za(n, r) {
    var l = n.pendingLanes;
    if (l === 0) return 0;
    var o = 0, c = n.suspendedLanes, d = n.pingedLanes, y = l & 268435455;
    if (y !== 0) {
      var w = y & ~c;
      w !== 0 ? o = Ja(w) : (d &= y, d !== 0 && (o = Ja(d)));
    } else y = l & ~c, y !== 0 ? o = Ja(y) : d !== 0 && (o = Ja(d));
    if (o === 0) return 0;
    if (r !== 0 && r !== o && !(r & c) && (c = o & -o, d = r & -r, c >= d || c === 16 && (d & 4194240) !== 0)) return r;
    if (o & 4 && (o |= l & 16), r = n.entangledLanes, r !== 0) for (n = n.entanglements, r &= o; 0 < r; ) l = 31 - Lr(r), c = 1 << l, o |= n[l], r &= ~c;
    return o;
  }
  function Zu(n, r) {
    switch (n) {
      case 1:
      case 2:
      case 4:
        return r + 250;
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
        return r + 5e3;
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
  function lu(n, r) {
    for (var l = n.suspendedLanes, o = n.pingedLanes, c = n.expirationTimes, d = n.pendingLanes; 0 < d; ) {
      var y = 31 - Lr(d), w = 1 << y, _ = c[y];
      _ === -1 ? (!(w & l) || w & o) && (c[y] = Zu(w, r)) : _ <= r && (n.expiredLanes |= w), d &= ~w;
    }
  }
  function Cl(n) {
    return n = n.pendingLanes & -1073741825, n !== 0 ? n : n & 1073741824 ? 1073741824 : 0;
  }
  function eo() {
    var n = El;
    return El <<= 1, !(El & 4194240) && (El = 64), n;
  }
  function to(n) {
    for (var r = [], l = 0; 31 > l; l++) r.push(n);
    return r;
  }
  function Hi(n, r, l) {
    n.pendingLanes |= r, r !== 536870912 && (n.suspendedLanes = 0, n.pingedLanes = 0), n = n.eventTimes, r = 31 - Lr(r), n[r] = l;
  }
  function rd(n, r) {
    var l = n.pendingLanes & ~r;
    n.pendingLanes = r, n.suspendedLanes = 0, n.pingedLanes = 0, n.expiredLanes &= r, n.mutableReadLanes &= r, n.entangledLanes &= r, r = n.entanglements;
    var o = n.eventTimes;
    for (n = n.expirationTimes; 0 < l; ) {
      var c = 31 - Lr(l), d = 1 << c;
      r[c] = 0, o[c] = -1, n[c] = -1, l &= ~d;
    }
  }
  function Bi(n, r) {
    var l = n.entangledLanes |= r;
    for (n = n.entanglements; l; ) {
      var o = 31 - Lr(l), c = 1 << o;
      c & r | n[o] & r && (n[o] |= r), l &= ~c;
    }
  }
  var Ft = 0;
  function no(n) {
    return n &= -n, 1 < n ? 4 < n ? n & 268435455 ? 16 : 536870912 : 4 : 1;
  }
  var Lt, Zo, hi, it, ro, or = !1, mi = [], Mr = null, yi = null, cn = null, qt = /* @__PURE__ */ new Map(), Rl = /* @__PURE__ */ new Map(), Qn = [], Ur = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
  function Da(n, r) {
    switch (n) {
      case "focusin":
      case "focusout":
        Mr = null;
        break;
      case "dragenter":
      case "dragleave":
        yi = null;
        break;
      case "mouseover":
      case "mouseout":
        cn = null;
        break;
      case "pointerover":
      case "pointerout":
        qt.delete(r.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        Rl.delete(r.pointerId);
    }
  }
  function uu(n, r, l, o, c, d) {
    return n === null || n.nativeEvent !== d ? (n = { blockedOn: r, domEventName: l, eventSystemFlags: o, nativeEvent: d, targetContainers: [c] }, r !== null && (r = Ie(r), r !== null && Zo(r)), n) : (n.eventSystemFlags |= o, r = n.targetContainers, c !== null && r.indexOf(c) === -1 && r.push(c), n);
  }
  function es(n, r, l, o, c) {
    switch (r) {
      case "focusin":
        return Mr = uu(Mr, n, r, l, o, c), !0;
      case "dragenter":
        return yi = uu(yi, n, r, l, o, c), !0;
      case "mouseover":
        return cn = uu(cn, n, r, l, o, c), !0;
      case "pointerover":
        var d = c.pointerId;
        return qt.set(d, uu(qt.get(d) || null, n, r, l, o, c)), !0;
      case "gotpointercapture":
        return d = c.pointerId, Rl.set(d, uu(Rl.get(d) || null, n, r, l, o, c)), !0;
    }
    return !1;
  }
  function ts(n) {
    var r = mu(n.target);
    if (r !== null) {
      var l = rt(r);
      if (l !== null) {
        if (r = l.tag, r === 13) {
          if (r = Ye(l), r !== null) {
            n.blockedOn = r, ro(n.priority, function() {
              hi(l);
            });
            return;
          }
        } else if (r === 3 && l.stateNode.current.memoizedState.isDehydrated) {
          n.blockedOn = l.tag === 3 ? l.stateNode.containerInfo : null;
          return;
        }
      }
    }
    n.blockedOn = null;
  }
  function wl(n) {
    if (n.blockedOn !== null) return !1;
    for (var r = n.targetContainers; 0 < r.length; ) {
      var l = lo(n.domEventName, n.eventSystemFlags, r[0], n.nativeEvent);
      if (l === null) {
        l = n.nativeEvent;
        var o = new l.constructor(l.type, l);
        dn = o, l.target.dispatchEvent(o), dn = null;
      } else return r = Ie(l), r !== null && Zo(r), n.blockedOn = l, !1;
      r.shift();
    }
    return !0;
  }
  function ou(n, r, l) {
    wl(n) && l.delete(r);
  }
  function ad() {
    or = !1, Mr !== null && wl(Mr) && (Mr = null), yi !== null && wl(yi) && (yi = null), cn !== null && wl(cn) && (cn = null), qt.forEach(ou), Rl.forEach(ou);
  }
  function Na(n, r) {
    n.blockedOn === r && (n.blockedOn = null, or || (or = !0, C.unstable_scheduleCallback(C.unstable_NormalPriority, ad)));
  }
  function ei(n) {
    function r(c) {
      return Na(c, n);
    }
    if (0 < mi.length) {
      Na(mi[0], n);
      for (var l = 1; l < mi.length; l++) {
        var o = mi[l];
        o.blockedOn === n && (o.blockedOn = null);
      }
    }
    for (Mr !== null && Na(Mr, n), yi !== null && Na(yi, n), cn !== null && Na(cn, n), qt.forEach(r), Rl.forEach(r), l = 0; l < Qn.length; l++) o = Qn[l], o.blockedOn === n && (o.blockedOn = null);
    for (; 0 < Qn.length && (l = Qn[0], l.blockedOn === null); ) ts(l), l.blockedOn === null && Qn.shift();
  }
  var gi = he.ReactCurrentBatchConfig, ka = !0;
  function ao(n, r, l, o) {
    var c = Ft, d = gi.transition;
    gi.transition = null;
    try {
      Ft = 1, Tl(n, r, l, o);
    } finally {
      Ft = c, gi.transition = d;
    }
  }
  function io(n, r, l, o) {
    var c = Ft, d = gi.transition;
    gi.transition = null;
    try {
      Ft = 4, Tl(n, r, l, o);
    } finally {
      Ft = c, gi.transition = d;
    }
  }
  function Tl(n, r, l, o) {
    if (ka) {
      var c = lo(n, r, l, o);
      if (c === null) _c(n, r, o, su, l), Da(n, o);
      else if (es(c, n, r, l, o)) o.stopPropagation();
      else if (Da(n, o), r & 4 && -1 < Ur.indexOf(n)) {
        for (; c !== null; ) {
          var d = Ie(c);
          if (d !== null && Lt(d), d = lo(n, r, l, o), d === null && _c(n, r, o, su, l), d === c) break;
          c = d;
        }
        c !== null && o.stopPropagation();
      } else _c(n, r, o, null, l);
    }
  }
  var su = null;
  function lo(n, r, l, o) {
    if (su = null, n = Kt(o), n = mu(n), n !== null) if (r = rt(n), r === null) n = null;
    else if (l = r.tag, l === 13) {
      if (n = Ye(r), n !== null) return n;
      n = null;
    } else if (l === 3) {
      if (r.stateNode.current.memoizedState.isDehydrated) return r.tag === 3 ? r.stateNode.containerInfo : null;
      n = null;
    } else r !== n && (n = null);
    return su = n, null;
  }
  function uo(n) {
    switch (n) {
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
        switch (mt()) {
          case Pi:
            return 1;
          case Xo:
            return 4;
          case iu:
          case gl:
            return 16;
          case Xu:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var ti = null, h = null, T = null;
  function B() {
    if (T) return T;
    var n, r = h, l = r.length, o, c = "value" in ti ? ti.value : ti.textContent, d = c.length;
    for (n = 0; n < l && r[n] === c[n]; n++) ;
    var y = l - n;
    for (o = 1; o <= y && r[l - o] === c[d - o]; o++) ;
    return T = c.slice(n, 1 < o ? 1 - o : void 0);
  }
  function Y(n) {
    var r = n.keyCode;
    return "charCode" in n ? (n = n.charCode, n === 0 && r === 13 && (n = 13)) : n = r, n === 10 && (n = 13), 32 <= n || n === 13 ? n : 0;
  }
  function ce() {
    return !0;
  }
  function We() {
    return !1;
  }
  function Ee(n) {
    function r(l, o, c, d, y) {
      this._reactName = l, this._targetInst = c, this.type = o, this.nativeEvent = d, this.target = y, this.currentTarget = null;
      for (var w in n) n.hasOwnProperty(w) && (l = n[w], this[w] = l ? l(d) : d[w]);
      return this.isDefaultPrevented = (d.defaultPrevented != null ? d.defaultPrevented : d.returnValue === !1) ? ce : We, this.isPropagationStopped = We, this;
    }
    return Se(r.prototype, { preventDefault: function() {
      this.defaultPrevented = !0;
      var l = this.nativeEvent;
      l && (l.preventDefault ? l.preventDefault() : typeof l.returnValue != "unknown" && (l.returnValue = !1), this.isDefaultPrevented = ce);
    }, stopPropagation: function() {
      var l = this.nativeEvent;
      l && (l.stopPropagation ? l.stopPropagation() : typeof l.cancelBubble != "unknown" && (l.cancelBubble = !0), this.isPropagationStopped = ce);
    }, persist: function() {
    }, isPersistent: ce }), r;
  }
  var qe = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(n) {
    return n.timeStamp || Date.now();
  }, defaultPrevented: 0, isTrusted: 0 }, Ct = Ee(qe), Mt = Se({}, qe, { view: 0, detail: 0 }), ln = Ee(Mt), Xt, pt, Jt, yn = Se({}, Mt, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: sd, button: 0, buttons: 0, relatedTarget: function(n) {
    return n.relatedTarget === void 0 ? n.fromElement === n.srcElement ? n.toElement : n.fromElement : n.relatedTarget;
  }, movementX: function(n) {
    return "movementX" in n ? n.movementX : (n !== Jt && (Jt && n.type === "mousemove" ? (Xt = n.screenX - Jt.screenX, pt = n.screenY - Jt.screenY) : pt = Xt = 0, Jt = n), Xt);
  }, movementY: function(n) {
    return "movementY" in n ? n.movementY : pt;
  } }), bl = Ee(yn), ns = Se({}, yn, { dataTransfer: 0 }), Ii = Ee(ns), rs = Se({}, Mt, { relatedTarget: 0 }), cu = Ee(rs), id = Se({}, qe, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), mc = Ee(id), ld = Se({}, qe, { clipboardData: function(n) {
    return "clipboardData" in n ? n.clipboardData : window.clipboardData;
  } }), mv = Ee(ld), ud = Se({}, qe, { data: 0 }), od = Ee(ud), yv = {
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
  }, gv = {
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
  }, yy = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function $i(n) {
    var r = this.nativeEvent;
    return r.getModifierState ? r.getModifierState(n) : (n = yy[n]) ? !!r[n] : !1;
  }
  function sd() {
    return $i;
  }
  var cd = Se({}, Mt, { key: function(n) {
    if (n.key) {
      var r = yv[n.key] || n.key;
      if (r !== "Unidentified") return r;
    }
    return n.type === "keypress" ? (n = Y(n), n === 13 ? "Enter" : String.fromCharCode(n)) : n.type === "keydown" || n.type === "keyup" ? gv[n.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: sd, charCode: function(n) {
    return n.type === "keypress" ? Y(n) : 0;
  }, keyCode: function(n) {
    return n.type === "keydown" || n.type === "keyup" ? n.keyCode : 0;
  }, which: function(n) {
    return n.type === "keypress" ? Y(n) : n.type === "keydown" || n.type === "keyup" ? n.keyCode : 0;
  } }), fd = Ee(cd), dd = Se({}, yn, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Sv = Ee(dd), yc = Se({}, Mt, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: sd }), Ev = Ee(yc), Xr = Se({}, qe, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Yi = Ee(Xr), Un = Se({}, yn, {
    deltaX: function(n) {
      return "deltaX" in n ? n.deltaX : "wheelDeltaX" in n ? -n.wheelDeltaX : 0;
    },
    deltaY: function(n) {
      return "deltaY" in n ? n.deltaY : "wheelDeltaY" in n ? -n.wheelDeltaY : "wheelDelta" in n ? -n.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Wi = Ee(Un), pd = [9, 13, 27, 32], oo = q && "CompositionEvent" in window, as = null;
  q && "documentMode" in document && (as = document.documentMode);
  var is = q && "TextEvent" in window && !as, Cv = q && (!oo || as && 8 < as && 11 >= as), Rv = " ", gc = !1;
  function wv(n, r) {
    switch (n) {
      case "keyup":
        return pd.indexOf(r.keyCode) !== -1;
      case "keydown":
        return r.keyCode !== 229;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function Tv(n) {
    return n = n.detail, typeof n == "object" && "data" in n ? n.data : null;
  }
  var so = !1;
  function bv(n, r) {
    switch (n) {
      case "compositionend":
        return Tv(r);
      case "keypress":
        return r.which !== 32 ? null : (gc = !0, Rv);
      case "textInput":
        return n = r.data, n === Rv && gc ? null : n;
      default:
        return null;
    }
  }
  function gy(n, r) {
    if (so) return n === "compositionend" || !oo && wv(n, r) ? (n = B(), T = h = ti = null, so = !1, n) : null;
    switch (n) {
      case "paste":
        return null;
      case "keypress":
        if (!(r.ctrlKey || r.altKey || r.metaKey) || r.ctrlKey && r.altKey) {
          if (r.char && 1 < r.char.length) return r.char;
          if (r.which) return String.fromCharCode(r.which);
        }
        return null;
      case "compositionend":
        return Cv && r.locale !== "ko" ? null : r.data;
      default:
        return null;
    }
  }
  var Sy = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
  function xv(n) {
    var r = n && n.nodeName && n.nodeName.toLowerCase();
    return r === "input" ? !!Sy[n.type] : r === "textarea";
  }
  function vd(n, r, l, o) {
    pi(o), r = fs(r, "onChange"), 0 < r.length && (l = new Ct("onChange", "change", null, l, o), n.push({ event: l, listeners: r }));
  }
  var Si = null, fu = null;
  function _v(n) {
    vu(n, 0);
  }
  function ls(n) {
    var r = ri(n);
    if (kr(r)) return n;
  }
  function Ey(n, r) {
    if (n === "change") return r;
  }
  var Dv = !1;
  if (q) {
    var hd;
    if (q) {
      var md = "oninput" in document;
      if (!md) {
        var Nv = document.createElement("div");
        Nv.setAttribute("oninput", "return;"), md = typeof Nv.oninput == "function";
      }
      hd = md;
    } else hd = !1;
    Dv = hd && (!document.documentMode || 9 < document.documentMode);
  }
  function kv() {
    Si && (Si.detachEvent("onpropertychange", Ov), fu = Si = null);
  }
  function Ov(n) {
    if (n.propertyName === "value" && ls(fu)) {
      var r = [];
      vd(r, fu, n, Kt(n)), yl(_v, r);
    }
  }
  function Cy(n, r, l) {
    n === "focusin" ? (kv(), Si = r, fu = l, Si.attachEvent("onpropertychange", Ov)) : n === "focusout" && kv();
  }
  function Lv(n) {
    if (n === "selectionchange" || n === "keyup" || n === "keydown") return ls(fu);
  }
  function Ry(n, r) {
    if (n === "click") return ls(r);
  }
  function Mv(n, r) {
    if (n === "input" || n === "change") return ls(r);
  }
  function wy(n, r) {
    return n === r && (n !== 0 || 1 / n === 1 / r) || n !== n && r !== r;
  }
  var ni = typeof Object.is == "function" ? Object.is : wy;
  function us(n, r) {
    if (ni(n, r)) return !0;
    if (typeof n != "object" || n === null || typeof r != "object" || r === null) return !1;
    var l = Object.keys(n), o = Object.keys(r);
    if (l.length !== o.length) return !1;
    for (o = 0; o < l.length; o++) {
      var c = l[o];
      if (!P.call(r, c) || !ni(n[c], r[c])) return !1;
    }
    return !0;
  }
  function Uv(n) {
    for (; n && n.firstChild; ) n = n.firstChild;
    return n;
  }
  function Sc(n, r) {
    var l = Uv(n);
    n = 0;
    for (var o; l; ) {
      if (l.nodeType === 3) {
        if (o = n + l.textContent.length, n <= r && o >= r) return { node: l, offset: r - n };
        n = o;
      }
      e: {
        for (; l; ) {
          if (l.nextSibling) {
            l = l.nextSibling;
            break e;
          }
          l = l.parentNode;
        }
        l = void 0;
      }
      l = Uv(l);
    }
  }
  function xl(n, r) {
    return n && r ? n === r ? !0 : n && n.nodeType === 3 ? !1 : r && r.nodeType === 3 ? xl(n, r.parentNode) : "contains" in n ? n.contains(r) : n.compareDocumentPosition ? !!(n.compareDocumentPosition(r) & 16) : !1 : !1;
  }
  function os() {
    for (var n = window, r = wn(); r instanceof n.HTMLIFrameElement; ) {
      try {
        var l = typeof r.contentWindow.location.href == "string";
      } catch {
        l = !1;
      }
      if (l) n = r.contentWindow;
      else break;
      r = wn(n.document);
    }
    return r;
  }
  function Ec(n) {
    var r = n && n.nodeName && n.nodeName.toLowerCase();
    return r && (r === "input" && (n.type === "text" || n.type === "search" || n.type === "tel" || n.type === "url" || n.type === "password") || r === "textarea" || n.contentEditable === "true");
  }
  function co(n) {
    var r = os(), l = n.focusedElem, o = n.selectionRange;
    if (r !== l && l && l.ownerDocument && xl(l.ownerDocument.documentElement, l)) {
      if (o !== null && Ec(l)) {
        if (r = o.start, n = o.end, n === void 0 && (n = r), "selectionStart" in l) l.selectionStart = r, l.selectionEnd = Math.min(n, l.value.length);
        else if (n = (r = l.ownerDocument || document) && r.defaultView || window, n.getSelection) {
          n = n.getSelection();
          var c = l.textContent.length, d = Math.min(o.start, c);
          o = o.end === void 0 ? d : Math.min(o.end, c), !n.extend && d > o && (c = o, o = d, d = c), c = Sc(l, d);
          var y = Sc(
            l,
            o
          );
          c && y && (n.rangeCount !== 1 || n.anchorNode !== c.node || n.anchorOffset !== c.offset || n.focusNode !== y.node || n.focusOffset !== y.offset) && (r = r.createRange(), r.setStart(c.node, c.offset), n.removeAllRanges(), d > o ? (n.addRange(r), n.extend(y.node, y.offset)) : (r.setEnd(y.node, y.offset), n.addRange(r)));
        }
      }
      for (r = [], n = l; n = n.parentNode; ) n.nodeType === 1 && r.push({ element: n, left: n.scrollLeft, top: n.scrollTop });
      for (typeof l.focus == "function" && l.focus(), l = 0; l < r.length; l++) n = r[l], n.element.scrollLeft = n.left, n.element.scrollTop = n.top;
    }
  }
  var Ty = q && "documentMode" in document && 11 >= document.documentMode, fo = null, yd = null, ss = null, gd = !1;
  function Sd(n, r, l) {
    var o = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
    gd || fo == null || fo !== wn(o) || (o = fo, "selectionStart" in o && Ec(o) ? o = { start: o.selectionStart, end: o.selectionEnd } : (o = (o.ownerDocument && o.ownerDocument.defaultView || window).getSelection(), o = { anchorNode: o.anchorNode, anchorOffset: o.anchorOffset, focusNode: o.focusNode, focusOffset: o.focusOffset }), ss && us(ss, o) || (ss = o, o = fs(yd, "onSelect"), 0 < o.length && (r = new Ct("onSelect", "select", null, r, l), n.push({ event: r, listeners: o }), r.target = fo)));
  }
  function Cc(n, r) {
    var l = {};
    return l[n.toLowerCase()] = r.toLowerCase(), l["Webkit" + n] = "webkit" + r, l["Moz" + n] = "moz" + r, l;
  }
  var du = { animationend: Cc("Animation", "AnimationEnd"), animationiteration: Cc("Animation", "AnimationIteration"), animationstart: Cc("Animation", "AnimationStart"), transitionend: Cc("Transition", "TransitionEnd") }, sr = {}, Ed = {};
  q && (Ed = document.createElement("div").style, "AnimationEvent" in window || (delete du.animationend.animation, delete du.animationiteration.animation, delete du.animationstart.animation), "TransitionEvent" in window || delete du.transitionend.transition);
  function Rc(n) {
    if (sr[n]) return sr[n];
    if (!du[n]) return n;
    var r = du[n], l;
    for (l in r) if (r.hasOwnProperty(l) && l in Ed) return sr[n] = r[l];
    return n;
  }
  var zv = Rc("animationend"), Av = Rc("animationiteration"), jv = Rc("animationstart"), Fv = Rc("transitionend"), Cd = /* @__PURE__ */ new Map(), wc = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  function Oa(n, r) {
    Cd.set(n, r), A(r, [n]);
  }
  for (var Rd = 0; Rd < wc.length; Rd++) {
    var pu = wc[Rd], by = pu.toLowerCase(), xy = pu[0].toUpperCase() + pu.slice(1);
    Oa(by, "on" + xy);
  }
  Oa(zv, "onAnimationEnd"), Oa(Av, "onAnimationIteration"), Oa(jv, "onAnimationStart"), Oa("dblclick", "onDoubleClick"), Oa("focusin", "onFocus"), Oa("focusout", "onBlur"), Oa(Fv, "onTransitionEnd"), g("onMouseEnter", ["mouseout", "mouseover"]), g("onMouseLeave", ["mouseout", "mouseover"]), g("onPointerEnter", ["pointerout", "pointerover"]), g("onPointerLeave", ["pointerout", "pointerover"]), A("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), A("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), A("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), A("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), A("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), A("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var cs = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), wd = new Set("cancel close invalid load scroll toggle".split(" ").concat(cs));
  function Tc(n, r, l) {
    var o = n.type || "unknown-event";
    n.currentTarget = l, nt(o, r, void 0, n), n.currentTarget = null;
  }
  function vu(n, r) {
    r = (r & 4) !== 0;
    for (var l = 0; l < n.length; l++) {
      var o = n[l], c = o.event;
      o = o.listeners;
      e: {
        var d = void 0;
        if (r) for (var y = o.length - 1; 0 <= y; y--) {
          var w = o[y], _ = w.instance, I = w.currentTarget;
          if (w = w.listener, _ !== d && c.isPropagationStopped()) break e;
          Tc(c, w, I), d = _;
        }
        else for (y = 0; y < o.length; y++) {
          if (w = o[y], _ = w.instance, I = w.currentTarget, w = w.listener, _ !== d && c.isPropagationStopped()) break e;
          Tc(c, w, I), d = _;
        }
      }
    }
    if (ee) throw n = me, ee = !1, me = null, n;
  }
  function Wt(n, r) {
    var l = r[vs];
    l === void 0 && (l = r[vs] = /* @__PURE__ */ new Set());
    var o = n + "__bubble";
    l.has(o) || (Vv(r, n, 2, !1), l.add(o));
  }
  function bc(n, r, l) {
    var o = 0;
    r && (o |= 4), Vv(l, n, o, r);
  }
  var xc = "_reactListening" + Math.random().toString(36).slice(2);
  function po(n) {
    if (!n[xc]) {
      n[xc] = !0, x.forEach(function(l) {
        l !== "selectionchange" && (wd.has(l) || bc(l, !1, n), bc(l, !0, n));
      });
      var r = n.nodeType === 9 ? n : n.ownerDocument;
      r === null || r[xc] || (r[xc] = !0, bc("selectionchange", !1, r));
    }
  }
  function Vv(n, r, l, o) {
    switch (uo(r)) {
      case 1:
        var c = ao;
        break;
      case 4:
        c = io;
        break;
      default:
        c = Tl;
    }
    l = c.bind(null, r, l, n), c = void 0, !Kr || r !== "touchstart" && r !== "touchmove" && r !== "wheel" || (c = !0), o ? c !== void 0 ? n.addEventListener(r, l, { capture: !0, passive: c }) : n.addEventListener(r, l, !0) : c !== void 0 ? n.addEventListener(r, l, { passive: c }) : n.addEventListener(r, l, !1);
  }
  function _c(n, r, l, o, c) {
    var d = o;
    if (!(r & 1) && !(r & 2) && o !== null) e: for (; ; ) {
      if (o === null) return;
      var y = o.tag;
      if (y === 3 || y === 4) {
        var w = o.stateNode.containerInfo;
        if (w === c || w.nodeType === 8 && w.parentNode === c) break;
        if (y === 4) for (y = o.return; y !== null; ) {
          var _ = y.tag;
          if ((_ === 3 || _ === 4) && (_ = y.stateNode.containerInfo, _ === c || _.nodeType === 8 && _.parentNode === c)) return;
          y = y.return;
        }
        for (; w !== null; ) {
          if (y = mu(w), y === null) return;
          if (_ = y.tag, _ === 5 || _ === 6) {
            o = d = y;
            continue e;
          }
          w = w.parentNode;
        }
      }
      o = o.return;
    }
    yl(function() {
      var I = d, ne = Kt(l), oe = [];
      e: {
        var te = Cd.get(n);
        if (te !== void 0) {
          var xe = Ct, Oe = n;
          switch (n) {
            case "keypress":
              if (Y(l) === 0) break e;
            case "keydown":
            case "keyup":
              xe = fd;
              break;
            case "focusin":
              Oe = "focus", xe = cu;
              break;
            case "focusout":
              Oe = "blur", xe = cu;
              break;
            case "beforeblur":
            case "afterblur":
              xe = cu;
              break;
            case "click":
              if (l.button === 2) break e;
            case "auxclick":
            case "dblclick":
            case "mousedown":
            case "mousemove":
            case "mouseup":
            case "mouseout":
            case "mouseover":
            case "contextmenu":
              xe = bl;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              xe = Ii;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              xe = Ev;
              break;
            case zv:
            case Av:
            case jv:
              xe = mc;
              break;
            case Fv:
              xe = Yi;
              break;
            case "scroll":
              xe = ln;
              break;
            case "wheel":
              xe = Wi;
              break;
            case "copy":
            case "cut":
            case "paste":
              xe = mv;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              xe = Sv;
          }
          var Ue = (r & 4) !== 0, Nn = !Ue && n === "scroll", M = Ue ? te !== null ? te + "Capture" : null : te;
          Ue = [];
          for (var k = I, j; k !== null; ) {
            j = k;
            var re = j.stateNode;
            if (j.tag === 5 && re !== null && (j = re, M !== null && (re = Or(k, M), re != null && Ue.push(vo(k, re, j)))), Nn) break;
            k = k.return;
          }
          0 < Ue.length && (te = new xe(te, Oe, null, l, ne), oe.push({ event: te, listeners: Ue }));
        }
      }
      if (!(r & 7)) {
        e: {
          if (te = n === "mouseover" || n === "pointerover", xe = n === "mouseout" || n === "pointerout", te && l !== dn && (Oe = l.relatedTarget || l.fromElement) && (mu(Oe) || Oe[Qi])) break e;
          if ((xe || te) && (te = ne.window === ne ? ne : (te = ne.ownerDocument) ? te.defaultView || te.parentWindow : window, xe ? (Oe = l.relatedTarget || l.toElement, xe = I, Oe = Oe ? mu(Oe) : null, Oe !== null && (Nn = rt(Oe), Oe !== Nn || Oe.tag !== 5 && Oe.tag !== 6) && (Oe = null)) : (xe = null, Oe = I), xe !== Oe)) {
            if (Ue = bl, re = "onMouseLeave", M = "onMouseEnter", k = "mouse", (n === "pointerout" || n === "pointerover") && (Ue = Sv, re = "onPointerLeave", M = "onPointerEnter", k = "pointer"), Nn = xe == null ? te : ri(xe), j = Oe == null ? te : ri(Oe), te = new Ue(re, k + "leave", xe, l, ne), te.target = Nn, te.relatedTarget = j, re = null, mu(ne) === I && (Ue = new Ue(M, k + "enter", Oe, l, ne), Ue.target = j, Ue.relatedTarget = Nn, re = Ue), Nn = re, xe && Oe) t: {
              for (Ue = xe, M = Oe, k = 0, j = Ue; j; j = _l(j)) k++;
              for (j = 0, re = M; re; re = _l(re)) j++;
              for (; 0 < k - j; ) Ue = _l(Ue), k--;
              for (; 0 < j - k; ) M = _l(M), j--;
              for (; k--; ) {
                if (Ue === M || M !== null && Ue === M.alternate) break t;
                Ue = _l(Ue), M = _l(M);
              }
              Ue = null;
            }
            else Ue = null;
            xe !== null && Pv(oe, te, xe, Ue, !1), Oe !== null && Nn !== null && Pv(oe, Nn, Oe, Ue, !0);
          }
        }
        e: {
          if (te = I ? ri(I) : window, xe = te.nodeName && te.nodeName.toLowerCase(), xe === "select" || xe === "input" && te.type === "file") var Le = Ey;
          else if (xv(te)) if (Dv) Le = Mv;
          else {
            Le = Lv;
            var Ke = Cy;
          }
          else (xe = te.nodeName) && xe.toLowerCase() === "input" && (te.type === "checkbox" || te.type === "radio") && (Le = Ry);
          if (Le && (Le = Le(n, I))) {
            vd(oe, Le, l, ne);
            break e;
          }
          Ke && Ke(n, te, I), n === "focusout" && (Ke = te._wrapperState) && Ke.controlled && te.type === "number" && pa(te, "number", te.value);
        }
        switch (Ke = I ? ri(I) : window, n) {
          case "focusin":
            (xv(Ke) || Ke.contentEditable === "true") && (fo = Ke, yd = I, ss = null);
            break;
          case "focusout":
            ss = yd = fo = null;
            break;
          case "mousedown":
            gd = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            gd = !1, Sd(oe, l, ne);
            break;
          case "selectionchange":
            if (Ty) break;
          case "keydown":
          case "keyup":
            Sd(oe, l, ne);
        }
        var Xe;
        if (oo) e: {
          switch (n) {
            case "compositionstart":
              var at = "onCompositionStart";
              break e;
            case "compositionend":
              at = "onCompositionEnd";
              break e;
            case "compositionupdate":
              at = "onCompositionUpdate";
              break e;
          }
          at = void 0;
        }
        else so ? wv(n, l) && (at = "onCompositionEnd") : n === "keydown" && l.keyCode === 229 && (at = "onCompositionStart");
        at && (Cv && l.locale !== "ko" && (so || at !== "onCompositionStart" ? at === "onCompositionEnd" && so && (Xe = B()) : (ti = ne, h = "value" in ti ? ti.value : ti.textContent, so = !0)), Ke = fs(I, at), 0 < Ke.length && (at = new od(at, n, null, l, ne), oe.push({ event: at, listeners: Ke }), Xe ? at.data = Xe : (Xe = Tv(l), Xe !== null && (at.data = Xe)))), (Xe = is ? bv(n, l) : gy(n, l)) && (I = fs(I, "onBeforeInput"), 0 < I.length && (ne = new od("onBeforeInput", "beforeinput", null, l, ne), oe.push({ event: ne, listeners: I }), ne.data = Xe));
      }
      vu(oe, r);
    });
  }
  function vo(n, r, l) {
    return { instance: n, listener: r, currentTarget: l };
  }
  function fs(n, r) {
    for (var l = r + "Capture", o = []; n !== null; ) {
      var c = n, d = c.stateNode;
      c.tag === 5 && d !== null && (c = d, d = Or(n, l), d != null && o.unshift(vo(n, d, c)), d = Or(n, r), d != null && o.push(vo(n, d, c))), n = n.return;
    }
    return o;
  }
  function _l(n) {
    if (n === null) return null;
    do
      n = n.return;
    while (n && n.tag !== 5);
    return n || null;
  }
  function Pv(n, r, l, o, c) {
    for (var d = r._reactName, y = []; l !== null && l !== o; ) {
      var w = l, _ = w.alternate, I = w.stateNode;
      if (_ !== null && _ === o) break;
      w.tag === 5 && I !== null && (w = I, c ? (_ = Or(l, d), _ != null && y.unshift(vo(l, _, w))) : c || (_ = Or(l, d), _ != null && y.push(vo(l, _, w)))), l = l.return;
    }
    y.length !== 0 && n.push({ event: r, listeners: y });
  }
  var Hv = /\r\n?/g, _y = /\u0000|\uFFFD/g;
  function Bv(n) {
    return (typeof n == "string" ? n : "" + n).replace(Hv, `
`).replace(_y, "");
  }
  function Dc(n, r, l) {
    if (r = Bv(r), Bv(n) !== r && l) throw Error(E(425));
  }
  function Dl() {
  }
  var ds = null, hu = null;
  function Nc(n, r) {
    return n === "textarea" || n === "noscript" || typeof r.children == "string" || typeof r.children == "number" || typeof r.dangerouslySetInnerHTML == "object" && r.dangerouslySetInnerHTML !== null && r.dangerouslySetInnerHTML.__html != null;
  }
  var kc = typeof setTimeout == "function" ? setTimeout : void 0, Td = typeof clearTimeout == "function" ? clearTimeout : void 0, Iv = typeof Promise == "function" ? Promise : void 0, ho = typeof queueMicrotask == "function" ? queueMicrotask : typeof Iv < "u" ? function(n) {
    return Iv.resolve(null).then(n).catch(Oc);
  } : kc;
  function Oc(n) {
    setTimeout(function() {
      throw n;
    });
  }
  function mo(n, r) {
    var l = r, o = 0;
    do {
      var c = l.nextSibling;
      if (n.removeChild(l), c && c.nodeType === 8) if (l = c.data, l === "/$") {
        if (o === 0) {
          n.removeChild(c), ei(r);
          return;
        }
        o--;
      } else l !== "$" && l !== "$?" && l !== "$!" || o++;
      l = c;
    } while (l);
    ei(r);
  }
  function Ei(n) {
    for (; n != null; n = n.nextSibling) {
      var r = n.nodeType;
      if (r === 1 || r === 3) break;
      if (r === 8) {
        if (r = n.data, r === "$" || r === "$!" || r === "$?") break;
        if (r === "/$") return null;
      }
    }
    return n;
  }
  function $v(n) {
    n = n.previousSibling;
    for (var r = 0; n; ) {
      if (n.nodeType === 8) {
        var l = n.data;
        if (l === "$" || l === "$!" || l === "$?") {
          if (r === 0) return n;
          r--;
        } else l === "/$" && r++;
      }
      n = n.previousSibling;
    }
    return null;
  }
  var Nl = Math.random().toString(36).slice(2), Ci = "__reactFiber$" + Nl, ps = "__reactProps$" + Nl, Qi = "__reactContainer$" + Nl, vs = "__reactEvents$" + Nl, yo = "__reactListeners$" + Nl, Dy = "__reactHandles$" + Nl;
  function mu(n) {
    var r = n[Ci];
    if (r) return r;
    for (var l = n.parentNode; l; ) {
      if (r = l[Qi] || l[Ci]) {
        if (l = r.alternate, r.child !== null || l !== null && l.child !== null) for (n = $v(n); n !== null; ) {
          if (l = n[Ci]) return l;
          n = $v(n);
        }
        return r;
      }
      n = l, l = n.parentNode;
    }
    return null;
  }
  function Ie(n) {
    return n = n[Ci] || n[Qi], !n || n.tag !== 5 && n.tag !== 6 && n.tag !== 13 && n.tag !== 3 ? null : n;
  }
  function ri(n) {
    if (n.tag === 5 || n.tag === 6) return n.stateNode;
    throw Error(E(33));
  }
  function gn(n) {
    return n[ps] || null;
  }
  var _t = [], La = -1;
  function Ma(n) {
    return { current: n };
  }
  function un(n) {
    0 > La || (n.current = _t[La], _t[La] = null, La--);
  }
  function Pe(n, r) {
    La++, _t[La] = n.current, n.current = r;
  }
  var xr = {}, Rn = Ma(xr), Gn = Ma(!1), Jr = xr;
  function Zr(n, r) {
    var l = n.type.contextTypes;
    if (!l) return xr;
    var o = n.stateNode;
    if (o && o.__reactInternalMemoizedUnmaskedChildContext === r) return o.__reactInternalMemoizedMaskedChildContext;
    var c = {}, d;
    for (d in l) c[d] = r[d];
    return o && (n = n.stateNode, n.__reactInternalMemoizedUnmaskedChildContext = r, n.__reactInternalMemoizedMaskedChildContext = c), c;
  }
  function zn(n) {
    return n = n.childContextTypes, n != null;
  }
  function go() {
    un(Gn), un(Rn);
  }
  function Yv(n, r, l) {
    if (Rn.current !== xr) throw Error(E(168));
    Pe(Rn, r), Pe(Gn, l);
  }
  function hs(n, r, l) {
    var o = n.stateNode;
    if (r = r.childContextTypes, typeof o.getChildContext != "function") return l;
    o = o.getChildContext();
    for (var c in o) if (!(c in r)) throw Error(E(108, st(n) || "Unknown", c));
    return Se({}, l, o);
  }
  function er(n) {
    return n = (n = n.stateNode) && n.__reactInternalMemoizedMergedChildContext || xr, Jr = Rn.current, Pe(Rn, n), Pe(Gn, Gn.current), !0;
  }
  function Lc(n, r, l) {
    var o = n.stateNode;
    if (!o) throw Error(E(169));
    l ? (n = hs(n, r, Jr), o.__reactInternalMemoizedMergedChildContext = n, un(Gn), un(Rn), Pe(Rn, n)) : un(Gn), Pe(Gn, l);
  }
  var Ri = null, So = !1, Gi = !1;
  function Mc(n) {
    Ri === null ? Ri = [n] : Ri.push(n);
  }
  function kl(n) {
    So = !0, Mc(n);
  }
  function wi() {
    if (!Gi && Ri !== null) {
      Gi = !0;
      var n = 0, r = Ft;
      try {
        var l = Ri;
        for (Ft = 1; n < l.length; n++) {
          var o = l[n];
          do
            o = o(!0);
          while (o !== null);
        }
        Ri = null, So = !1;
      } catch (c) {
        throw Ri !== null && (Ri = Ri.slice(n + 1)), Xa(Pi, wi), c;
      } finally {
        Ft = r, Gi = !1;
      }
    }
    return null;
  }
  var Ol = [], Ll = 0, Ml = null, Ki = 0, An = [], Ua = 0, ma = null, Ti = 1, bi = "";
  function yu(n, r) {
    Ol[Ll++] = Ki, Ol[Ll++] = Ml, Ml = n, Ki = r;
  }
  function Wv(n, r, l) {
    An[Ua++] = Ti, An[Ua++] = bi, An[Ua++] = ma, ma = n;
    var o = Ti;
    n = bi;
    var c = 32 - Lr(o) - 1;
    o &= ~(1 << c), l += 1;
    var d = 32 - Lr(r) + c;
    if (30 < d) {
      var y = c - c % 5;
      d = (o & (1 << y) - 1).toString(32), o >>= y, c -= y, Ti = 1 << 32 - Lr(r) + c | l << c | o, bi = d + n;
    } else Ti = 1 << d | l << c | o, bi = n;
  }
  function Uc(n) {
    n.return !== null && (yu(n, 1), Wv(n, 1, 0));
  }
  function zc(n) {
    for (; n === Ml; ) Ml = Ol[--Ll], Ol[Ll] = null, Ki = Ol[--Ll], Ol[Ll] = null;
    for (; n === ma; ) ma = An[--Ua], An[Ua] = null, bi = An[--Ua], An[Ua] = null, Ti = An[--Ua], An[Ua] = null;
  }
  var ea = null, ta = null, vn = !1, za = null;
  function bd(n, r) {
    var l = Pa(5, null, null, 0);
    l.elementType = "DELETED", l.stateNode = r, l.return = n, r = n.deletions, r === null ? (n.deletions = [l], n.flags |= 16) : r.push(l);
  }
  function Qv(n, r) {
    switch (n.tag) {
      case 5:
        var l = n.type;
        return r = r.nodeType !== 1 || l.toLowerCase() !== r.nodeName.toLowerCase() ? null : r, r !== null ? (n.stateNode = r, ea = n, ta = Ei(r.firstChild), !0) : !1;
      case 6:
        return r = n.pendingProps === "" || r.nodeType !== 3 ? null : r, r !== null ? (n.stateNode = r, ea = n, ta = null, !0) : !1;
      case 13:
        return r = r.nodeType !== 8 ? null : r, r !== null ? (l = ma !== null ? { id: Ti, overflow: bi } : null, n.memoizedState = { dehydrated: r, treeContext: l, retryLane: 1073741824 }, l = Pa(18, null, null, 0), l.stateNode = r, l.return = n, n.child = l, ea = n, ta = null, !0) : !1;
      default:
        return !1;
    }
  }
  function xd(n) {
    return (n.mode & 1) !== 0 && (n.flags & 128) === 0;
  }
  function _d(n) {
    if (vn) {
      var r = ta;
      if (r) {
        var l = r;
        if (!Qv(n, r)) {
          if (xd(n)) throw Error(E(418));
          r = Ei(l.nextSibling);
          var o = ea;
          r && Qv(n, r) ? bd(o, l) : (n.flags = n.flags & -4097 | 2, vn = !1, ea = n);
        }
      } else {
        if (xd(n)) throw Error(E(418));
        n.flags = n.flags & -4097 | 2, vn = !1, ea = n;
      }
    }
  }
  function Kn(n) {
    for (n = n.return; n !== null && n.tag !== 5 && n.tag !== 3 && n.tag !== 13; ) n = n.return;
    ea = n;
  }
  function Ac(n) {
    if (n !== ea) return !1;
    if (!vn) return Kn(n), vn = !0, !1;
    var r;
    if ((r = n.tag !== 3) && !(r = n.tag !== 5) && (r = n.type, r = r !== "head" && r !== "body" && !Nc(n.type, n.memoizedProps)), r && (r = ta)) {
      if (xd(n)) throw ms(), Error(E(418));
      for (; r; ) bd(n, r), r = Ei(r.nextSibling);
    }
    if (Kn(n), n.tag === 13) {
      if (n = n.memoizedState, n = n !== null ? n.dehydrated : null, !n) throw Error(E(317));
      e: {
        for (n = n.nextSibling, r = 0; n; ) {
          if (n.nodeType === 8) {
            var l = n.data;
            if (l === "/$") {
              if (r === 0) {
                ta = Ei(n.nextSibling);
                break e;
              }
              r--;
            } else l !== "$" && l !== "$!" && l !== "$?" || r++;
          }
          n = n.nextSibling;
        }
        ta = null;
      }
    } else ta = ea ? Ei(n.stateNode.nextSibling) : null;
    return !0;
  }
  function ms() {
    for (var n = ta; n; ) n = Ei(n.nextSibling);
  }
  function Ul() {
    ta = ea = null, vn = !1;
  }
  function qi(n) {
    za === null ? za = [n] : za.push(n);
  }
  var Ny = he.ReactCurrentBatchConfig;
  function gu(n, r, l) {
    if (n = l.ref, n !== null && typeof n != "function" && typeof n != "object") {
      if (l._owner) {
        if (l = l._owner, l) {
          if (l.tag !== 1) throw Error(E(309));
          var o = l.stateNode;
        }
        if (!o) throw Error(E(147, n));
        var c = o, d = "" + n;
        return r !== null && r.ref !== null && typeof r.ref == "function" && r.ref._stringRef === d ? r.ref : (r = function(y) {
          var w = c.refs;
          y === null ? delete w[d] : w[d] = y;
        }, r._stringRef = d, r);
      }
      if (typeof n != "string") throw Error(E(284));
      if (!l._owner) throw Error(E(290, n));
    }
    return n;
  }
  function jc(n, r) {
    throw n = Object.prototype.toString.call(r), Error(E(31, n === "[object Object]" ? "object with keys {" + Object.keys(r).join(", ") + "}" : n));
  }
  function Gv(n) {
    var r = n._init;
    return r(n._payload);
  }
  function Su(n) {
    function r(M, k) {
      if (n) {
        var j = M.deletions;
        j === null ? (M.deletions = [k], M.flags |= 16) : j.push(k);
      }
    }
    function l(M, k) {
      if (!n) return null;
      for (; k !== null; ) r(M, k), k = k.sibling;
      return null;
    }
    function o(M, k) {
      for (M = /* @__PURE__ */ new Map(); k !== null; ) k.key !== null ? M.set(k.key, k) : M.set(k.index, k), k = k.sibling;
      return M;
    }
    function c(M, k) {
      return M = Bl(M, k), M.index = 0, M.sibling = null, M;
    }
    function d(M, k, j) {
      return M.index = j, n ? (j = M.alternate, j !== null ? (j = j.index, j < k ? (M.flags |= 2, k) : j) : (M.flags |= 2, k)) : (M.flags |= 1048576, k);
    }
    function y(M) {
      return n && M.alternate === null && (M.flags |= 2), M;
    }
    function w(M, k, j, re) {
      return k === null || k.tag !== 6 ? (k = ap(j, M.mode, re), k.return = M, k) : (k = c(k, j), k.return = M, k);
    }
    function _(M, k, j, re) {
      var Le = j.type;
      return Le === Ne ? ne(M, k, j.props.children, re, j.key) : k !== null && (k.elementType === Le || typeof Le == "object" && Le !== null && Le.$$typeof === jt && Gv(Le) === k.type) ? (re = c(k, j.props), re.ref = gu(M, k, j), re.return = M, re) : (re = Ws(j.type, j.key, j.props, null, M.mode, re), re.ref = gu(M, k, j), re.return = M, re);
    }
    function I(M, k, j, re) {
      return k === null || k.tag !== 4 || k.stateNode.containerInfo !== j.containerInfo || k.stateNode.implementation !== j.implementation ? (k = yf(j, M.mode, re), k.return = M, k) : (k = c(k, j.children || []), k.return = M, k);
    }
    function ne(M, k, j, re, Le) {
      return k === null || k.tag !== 7 ? (k = nl(j, M.mode, re, Le), k.return = M, k) : (k = c(k, j), k.return = M, k);
    }
    function oe(M, k, j) {
      if (typeof k == "string" && k !== "" || typeof k == "number") return k = ap("" + k, M.mode, j), k.return = M, k;
      if (typeof k == "object" && k !== null) {
        switch (k.$$typeof) {
          case ge:
            return j = Ws(k.type, k.key, k.props, null, M.mode, j), j.ref = gu(M, null, k), j.return = M, j;
          case Ce:
            return k = yf(k, M.mode, j), k.return = M, k;
          case jt:
            var re = k._init;
            return oe(M, re(k._payload), j);
        }
        if (Jn(k) || Fe(k)) return k = nl(k, M.mode, j, null), k.return = M, k;
        jc(M, k);
      }
      return null;
    }
    function te(M, k, j, re) {
      var Le = k !== null ? k.key : null;
      if (typeof j == "string" && j !== "" || typeof j == "number") return Le !== null ? null : w(M, k, "" + j, re);
      if (typeof j == "object" && j !== null) {
        switch (j.$$typeof) {
          case ge:
            return j.key === Le ? _(M, k, j, re) : null;
          case Ce:
            return j.key === Le ? I(M, k, j, re) : null;
          case jt:
            return Le = j._init, te(
              M,
              k,
              Le(j._payload),
              re
            );
        }
        if (Jn(j) || Fe(j)) return Le !== null ? null : ne(M, k, j, re, null);
        jc(M, j);
      }
      return null;
    }
    function xe(M, k, j, re, Le) {
      if (typeof re == "string" && re !== "" || typeof re == "number") return M = M.get(j) || null, w(k, M, "" + re, Le);
      if (typeof re == "object" && re !== null) {
        switch (re.$$typeof) {
          case ge:
            return M = M.get(re.key === null ? j : re.key) || null, _(k, M, re, Le);
          case Ce:
            return M = M.get(re.key === null ? j : re.key) || null, I(k, M, re, Le);
          case jt:
            var Ke = re._init;
            return xe(M, k, j, Ke(re._payload), Le);
        }
        if (Jn(re) || Fe(re)) return M = M.get(j) || null, ne(k, M, re, Le, null);
        jc(k, re);
      }
      return null;
    }
    function Oe(M, k, j, re) {
      for (var Le = null, Ke = null, Xe = k, at = k = 0, rr = null; Xe !== null && at < j.length; at++) {
        Xe.index > at ? (rr = Xe, Xe = null) : rr = Xe.sibling;
        var Ht = te(M, Xe, j[at], re);
        if (Ht === null) {
          Xe === null && (Xe = rr);
          break;
        }
        n && Xe && Ht.alternate === null && r(M, Xe), k = d(Ht, k, at), Ke === null ? Le = Ht : Ke.sibling = Ht, Ke = Ht, Xe = rr;
      }
      if (at === j.length) return l(M, Xe), vn && yu(M, at), Le;
      if (Xe === null) {
        for (; at < j.length; at++) Xe = oe(M, j[at], re), Xe !== null && (k = d(Xe, k, at), Ke === null ? Le = Xe : Ke.sibling = Xe, Ke = Xe);
        return vn && yu(M, at), Le;
      }
      for (Xe = o(M, Xe); at < j.length; at++) rr = xe(Xe, M, at, j[at], re), rr !== null && (n && rr.alternate !== null && Xe.delete(rr.key === null ? at : rr.key), k = d(rr, k, at), Ke === null ? Le = rr : Ke.sibling = rr, Ke = rr);
      return n && Xe.forEach(function(Yl) {
        return r(M, Yl);
      }), vn && yu(M, at), Le;
    }
    function Ue(M, k, j, re) {
      var Le = Fe(j);
      if (typeof Le != "function") throw Error(E(150));
      if (j = Le.call(j), j == null) throw Error(E(151));
      for (var Ke = Le = null, Xe = k, at = k = 0, rr = null, Ht = j.next(); Xe !== null && !Ht.done; at++, Ht = j.next()) {
        Xe.index > at ? (rr = Xe, Xe = null) : rr = Xe.sibling;
        var Yl = te(M, Xe, Ht.value, re);
        if (Yl === null) {
          Xe === null && (Xe = rr);
          break;
        }
        n && Xe && Yl.alternate === null && r(M, Xe), k = d(Yl, k, at), Ke === null ? Le = Yl : Ke.sibling = Yl, Ke = Yl, Xe = rr;
      }
      if (Ht.done) return l(
        M,
        Xe
      ), vn && yu(M, at), Le;
      if (Xe === null) {
        for (; !Ht.done; at++, Ht = j.next()) Ht = oe(M, Ht.value, re), Ht !== null && (k = d(Ht, k, at), Ke === null ? Le = Ht : Ke.sibling = Ht, Ke = Ht);
        return vn && yu(M, at), Le;
      }
      for (Xe = o(M, Xe); !Ht.done; at++, Ht = j.next()) Ht = xe(Xe, M, at, Ht.value, re), Ht !== null && (n && Ht.alternate !== null && Xe.delete(Ht.key === null ? at : Ht.key), k = d(Ht, k, at), Ke === null ? Le = Ht : Ke.sibling = Ht, Ke = Ht);
      return n && Xe.forEach(function(kh) {
        return r(M, kh);
      }), vn && yu(M, at), Le;
    }
    function Nn(M, k, j, re) {
      if (typeof j == "object" && j !== null && j.type === Ne && j.key === null && (j = j.props.children), typeof j == "object" && j !== null) {
        switch (j.$$typeof) {
          case ge:
            e: {
              for (var Le = j.key, Ke = k; Ke !== null; ) {
                if (Ke.key === Le) {
                  if (Le = j.type, Le === Ne) {
                    if (Ke.tag === 7) {
                      l(M, Ke.sibling), k = c(Ke, j.props.children), k.return = M, M = k;
                      break e;
                    }
                  } else if (Ke.elementType === Le || typeof Le == "object" && Le !== null && Le.$$typeof === jt && Gv(Le) === Ke.type) {
                    l(M, Ke.sibling), k = c(Ke, j.props), k.ref = gu(M, Ke, j), k.return = M, M = k;
                    break e;
                  }
                  l(M, Ke);
                  break;
                } else r(M, Ke);
                Ke = Ke.sibling;
              }
              j.type === Ne ? (k = nl(j.props.children, M.mode, re, j.key), k.return = M, M = k) : (re = Ws(j.type, j.key, j.props, null, M.mode, re), re.ref = gu(M, k, j), re.return = M, M = re);
            }
            return y(M);
          case Ce:
            e: {
              for (Ke = j.key; k !== null; ) {
                if (k.key === Ke) if (k.tag === 4 && k.stateNode.containerInfo === j.containerInfo && k.stateNode.implementation === j.implementation) {
                  l(M, k.sibling), k = c(k, j.children || []), k.return = M, M = k;
                  break e;
                } else {
                  l(M, k);
                  break;
                }
                else r(M, k);
                k = k.sibling;
              }
              k = yf(j, M.mode, re), k.return = M, M = k;
            }
            return y(M);
          case jt:
            return Ke = j._init, Nn(M, k, Ke(j._payload), re);
        }
        if (Jn(j)) return Oe(M, k, j, re);
        if (Fe(j)) return Ue(M, k, j, re);
        jc(M, j);
      }
      return typeof j == "string" && j !== "" || typeof j == "number" ? (j = "" + j, k !== null && k.tag === 6 ? (l(M, k.sibling), k = c(k, j), k.return = M, M = k) : (l(M, k), k = ap(j, M.mode, re), k.return = M, M = k), y(M)) : l(M, k);
    }
    return Nn;
  }
  var bn = Su(!0), Re = Su(!1), ya = Ma(null), na = null, Eo = null, Dd = null;
  function Nd() {
    Dd = Eo = na = null;
  }
  function kd(n) {
    var r = ya.current;
    un(ya), n._currentValue = r;
  }
  function Od(n, r, l) {
    for (; n !== null; ) {
      var o = n.alternate;
      if ((n.childLanes & r) !== r ? (n.childLanes |= r, o !== null && (o.childLanes |= r)) : o !== null && (o.childLanes & r) !== r && (o.childLanes |= r), n === l) break;
      n = n.return;
    }
  }
  function Sn(n, r) {
    na = n, Dd = Eo = null, n = n.dependencies, n !== null && n.firstContext !== null && (n.lanes & r && (Fn = !0), n.firstContext = null);
  }
  function Aa(n) {
    var r = n._currentValue;
    if (Dd !== n) if (n = { context: n, memoizedValue: r, next: null }, Eo === null) {
      if (na === null) throw Error(E(308));
      Eo = n, na.dependencies = { lanes: 0, firstContext: n };
    } else Eo = Eo.next = n;
    return r;
  }
  var Eu = null;
  function Ld(n) {
    Eu === null ? Eu = [n] : Eu.push(n);
  }
  function Md(n, r, l, o) {
    var c = r.interleaved;
    return c === null ? (l.next = l, Ld(r)) : (l.next = c.next, c.next = l), r.interleaved = l, ga(n, o);
  }
  function ga(n, r) {
    n.lanes |= r;
    var l = n.alternate;
    for (l !== null && (l.lanes |= r), l = n, n = n.return; n !== null; ) n.childLanes |= r, l = n.alternate, l !== null && (l.childLanes |= r), l = n, n = n.return;
    return l.tag === 3 ? l.stateNode : null;
  }
  var Sa = !1;
  function Ud(n) {
    n.updateQueue = { baseState: n.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
  }
  function Kv(n, r) {
    n = n.updateQueue, r.updateQueue === n && (r.updateQueue = { baseState: n.baseState, firstBaseUpdate: n.firstBaseUpdate, lastBaseUpdate: n.lastBaseUpdate, shared: n.shared, effects: n.effects });
  }
  function Xi(n, r) {
    return { eventTime: n, lane: r, tag: 0, payload: null, callback: null, next: null };
  }
  function zl(n, r, l) {
    var o = n.updateQueue;
    if (o === null) return null;
    if (o = o.shared, Dt & 2) {
      var c = o.pending;
      return c === null ? r.next = r : (r.next = c.next, c.next = r), o.pending = r, ga(n, l);
    }
    return c = o.interleaved, c === null ? (r.next = r, Ld(o)) : (r.next = c.next, c.next = r), o.interleaved = r, ga(n, l);
  }
  function Fc(n, r, l) {
    if (r = r.updateQueue, r !== null && (r = r.shared, (l & 4194240) !== 0)) {
      var o = r.lanes;
      o &= n.pendingLanes, l |= o, r.lanes = l, Bi(n, l);
    }
  }
  function qv(n, r) {
    var l = n.updateQueue, o = n.alternate;
    if (o !== null && (o = o.updateQueue, l === o)) {
      var c = null, d = null;
      if (l = l.firstBaseUpdate, l !== null) {
        do {
          var y = { eventTime: l.eventTime, lane: l.lane, tag: l.tag, payload: l.payload, callback: l.callback, next: null };
          d === null ? c = d = y : d = d.next = y, l = l.next;
        } while (l !== null);
        d === null ? c = d = r : d = d.next = r;
      } else c = d = r;
      l = { baseState: o.baseState, firstBaseUpdate: c, lastBaseUpdate: d, shared: o.shared, effects: o.effects }, n.updateQueue = l;
      return;
    }
    n = l.lastBaseUpdate, n === null ? l.firstBaseUpdate = r : n.next = r, l.lastBaseUpdate = r;
  }
  function ys(n, r, l, o) {
    var c = n.updateQueue;
    Sa = !1;
    var d = c.firstBaseUpdate, y = c.lastBaseUpdate, w = c.shared.pending;
    if (w !== null) {
      c.shared.pending = null;
      var _ = w, I = _.next;
      _.next = null, y === null ? d = I : y.next = I, y = _;
      var ne = n.alternate;
      ne !== null && (ne = ne.updateQueue, w = ne.lastBaseUpdate, w !== y && (w === null ? ne.firstBaseUpdate = I : w.next = I, ne.lastBaseUpdate = _));
    }
    if (d !== null) {
      var oe = c.baseState;
      y = 0, ne = I = _ = null, w = d;
      do {
        var te = w.lane, xe = w.eventTime;
        if ((o & te) === te) {
          ne !== null && (ne = ne.next = {
            eventTime: xe,
            lane: 0,
            tag: w.tag,
            payload: w.payload,
            callback: w.callback,
            next: null
          });
          e: {
            var Oe = n, Ue = w;
            switch (te = r, xe = l, Ue.tag) {
              case 1:
                if (Oe = Ue.payload, typeof Oe == "function") {
                  oe = Oe.call(xe, oe, te);
                  break e;
                }
                oe = Oe;
                break e;
              case 3:
                Oe.flags = Oe.flags & -65537 | 128;
              case 0:
                if (Oe = Ue.payload, te = typeof Oe == "function" ? Oe.call(xe, oe, te) : Oe, te == null) break e;
                oe = Se({}, oe, te);
                break e;
              case 2:
                Sa = !0;
            }
          }
          w.callback !== null && w.lane !== 0 && (n.flags |= 64, te = c.effects, te === null ? c.effects = [w] : te.push(w));
        } else xe = { eventTime: xe, lane: te, tag: w.tag, payload: w.payload, callback: w.callback, next: null }, ne === null ? (I = ne = xe, _ = oe) : ne = ne.next = xe, y |= te;
        if (w = w.next, w === null) {
          if (w = c.shared.pending, w === null) break;
          te = w, w = te.next, te.next = null, c.lastBaseUpdate = te, c.shared.pending = null;
        }
      } while (!0);
      if (ne === null && (_ = oe), c.baseState = _, c.firstBaseUpdate = I, c.lastBaseUpdate = ne, r = c.shared.interleaved, r !== null) {
        c = r;
        do
          y |= c.lane, c = c.next;
        while (c !== r);
      } else d === null && (c.shared.lanes = 0);
      ki |= y, n.lanes = y, n.memoizedState = oe;
    }
  }
  function zd(n, r, l) {
    if (n = r.effects, r.effects = null, n !== null) for (r = 0; r < n.length; r++) {
      var o = n[r], c = o.callback;
      if (c !== null) {
        if (o.callback = null, o = l, typeof c != "function") throw Error(E(191, c));
        c.call(o);
      }
    }
  }
  var gs = {}, xi = Ma(gs), Ss = Ma(gs), Es = Ma(gs);
  function Cu(n) {
    if (n === gs) throw Error(E(174));
    return n;
  }
  function Ad(n, r) {
    switch (Pe(Es, r), Pe(Ss, n), Pe(xi, gs), n = r.nodeType, n) {
      case 9:
      case 11:
        r = (r = r.documentElement) ? r.namespaceURI : wr(null, "");
        break;
      default:
        n = n === 8 ? r.parentNode : r, r = n.namespaceURI || null, n = n.tagName, r = wr(r, n);
    }
    un(xi), Pe(xi, r);
  }
  function Ru() {
    un(xi), un(Ss), un(Es);
  }
  function Xv(n) {
    Cu(Es.current);
    var r = Cu(xi.current), l = wr(r, n.type);
    r !== l && (Pe(Ss, n), Pe(xi, l));
  }
  function Vc(n) {
    Ss.current === n && (un(xi), un(Ss));
  }
  var En = Ma(0);
  function Pc(n) {
    for (var r = n; r !== null; ) {
      if (r.tag === 13) {
        var l = r.memoizedState;
        if (l !== null && (l = l.dehydrated, l === null || l.data === "$?" || l.data === "$!")) return r;
      } else if (r.tag === 19 && r.memoizedProps.revealOrder !== void 0) {
        if (r.flags & 128) return r;
      } else if (r.child !== null) {
        r.child.return = r, r = r.child;
        continue;
      }
      if (r === n) break;
      for (; r.sibling === null; ) {
        if (r.return === null || r.return === n) return null;
        r = r.return;
      }
      r.sibling.return = r.return, r = r.sibling;
    }
    return null;
  }
  var Cs = [];
  function $e() {
    for (var n = 0; n < Cs.length; n++) Cs[n]._workInProgressVersionPrimary = null;
    Cs.length = 0;
  }
  var yt = he.ReactCurrentDispatcher, Vt = he.ReactCurrentBatchConfig, Zt = 0, Pt = null, jn = null, tr = null, Hc = !1, Rs = !1, wu = 0, Z = 0;
  function zt() {
    throw Error(E(321));
  }
  function Ze(n, r) {
    if (r === null) return !1;
    for (var l = 0; l < r.length && l < n.length; l++) if (!ni(n[l], r[l])) return !1;
    return !0;
  }
  function Al(n, r, l, o, c, d) {
    if (Zt = d, Pt = r, r.memoizedState = null, r.updateQueue = null, r.lanes = 0, yt.current = n === null || n.memoizedState === null ? nf : Ds, n = l(o, c), Rs) {
      d = 0;
      do {
        if (Rs = !1, wu = 0, 25 <= d) throw Error(E(301));
        d += 1, tr = jn = null, r.updateQueue = null, yt.current = rf, n = l(o, c);
      } while (Rs);
    }
    if (yt.current = Du, r = jn !== null && jn.next !== null, Zt = 0, tr = jn = Pt = null, Hc = !1, r) throw Error(E(300));
    return n;
  }
  function ai() {
    var n = wu !== 0;
    return wu = 0, n;
  }
  function _r() {
    var n = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return tr === null ? Pt.memoizedState = tr = n : tr = tr.next = n, tr;
  }
  function xn() {
    if (jn === null) {
      var n = Pt.alternate;
      n = n !== null ? n.memoizedState : null;
    } else n = jn.next;
    var r = tr === null ? Pt.memoizedState : tr.next;
    if (r !== null) tr = r, jn = n;
    else {
      if (n === null) throw Error(E(310));
      jn = n, n = { memoizedState: jn.memoizedState, baseState: jn.baseState, baseQueue: jn.baseQueue, queue: jn.queue, next: null }, tr === null ? Pt.memoizedState = tr = n : tr = tr.next = n;
    }
    return tr;
  }
  function Ji(n, r) {
    return typeof r == "function" ? r(n) : r;
  }
  function jl(n) {
    var r = xn(), l = r.queue;
    if (l === null) throw Error(E(311));
    l.lastRenderedReducer = n;
    var o = jn, c = o.baseQueue, d = l.pending;
    if (d !== null) {
      if (c !== null) {
        var y = c.next;
        c.next = d.next, d.next = y;
      }
      o.baseQueue = c = d, l.pending = null;
    }
    if (c !== null) {
      d = c.next, o = o.baseState;
      var w = y = null, _ = null, I = d;
      do {
        var ne = I.lane;
        if ((Zt & ne) === ne) _ !== null && (_ = _.next = { lane: 0, action: I.action, hasEagerState: I.hasEagerState, eagerState: I.eagerState, next: null }), o = I.hasEagerState ? I.eagerState : n(o, I.action);
        else {
          var oe = {
            lane: ne,
            action: I.action,
            hasEagerState: I.hasEagerState,
            eagerState: I.eagerState,
            next: null
          };
          _ === null ? (w = _ = oe, y = o) : _ = _.next = oe, Pt.lanes |= ne, ki |= ne;
        }
        I = I.next;
      } while (I !== null && I !== d);
      _ === null ? y = o : _.next = w, ni(o, r.memoizedState) || (Fn = !0), r.memoizedState = o, r.baseState = y, r.baseQueue = _, l.lastRenderedState = o;
    }
    if (n = l.interleaved, n !== null) {
      c = n;
      do
        d = c.lane, Pt.lanes |= d, ki |= d, c = c.next;
      while (c !== n);
    } else c === null && (l.lanes = 0);
    return [r.memoizedState, l.dispatch];
  }
  function Tu(n) {
    var r = xn(), l = r.queue;
    if (l === null) throw Error(E(311));
    l.lastRenderedReducer = n;
    var o = l.dispatch, c = l.pending, d = r.memoizedState;
    if (c !== null) {
      l.pending = null;
      var y = c = c.next;
      do
        d = n(d, y.action), y = y.next;
      while (y !== c);
      ni(d, r.memoizedState) || (Fn = !0), r.memoizedState = d, r.baseQueue === null && (r.baseState = d), l.lastRenderedState = d;
    }
    return [d, o];
  }
  function Bc() {
  }
  function Ic(n, r) {
    var l = Pt, o = xn(), c = r(), d = !ni(o.memoizedState, c);
    if (d && (o.memoizedState = c, Fn = !0), o = o.queue, ws(Wc.bind(null, l, o, n), [n]), o.getSnapshot !== r || d || tr !== null && tr.memoizedState.tag & 1) {
      if (l.flags |= 2048, bu(9, Yc.bind(null, l, o, c, r), void 0, null), qn === null) throw Error(E(349));
      Zt & 30 || $c(l, r, c);
    }
    return c;
  }
  function $c(n, r, l) {
    n.flags |= 16384, n = { getSnapshot: r, value: l }, r = Pt.updateQueue, r === null ? (r = { lastEffect: null, stores: null }, Pt.updateQueue = r, r.stores = [n]) : (l = r.stores, l === null ? r.stores = [n] : l.push(n));
  }
  function Yc(n, r, l, o) {
    r.value = l, r.getSnapshot = o, Qc(r) && Gc(n);
  }
  function Wc(n, r, l) {
    return l(function() {
      Qc(r) && Gc(n);
    });
  }
  function Qc(n) {
    var r = n.getSnapshot;
    n = n.value;
    try {
      var l = r();
      return !ni(n, l);
    } catch {
      return !0;
    }
  }
  function Gc(n) {
    var r = ga(n, 1);
    r !== null && Fr(r, n, 1, -1);
  }
  function Kc(n) {
    var r = _r();
    return typeof n == "function" && (n = n()), r.memoizedState = r.baseState = n, n = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Ji, lastRenderedState: n }, r.queue = n, n = n.dispatch = _u.bind(null, Pt, n), [r.memoizedState, n];
  }
  function bu(n, r, l, o) {
    return n = { tag: n, create: r, destroy: l, deps: o, next: null }, r = Pt.updateQueue, r === null ? (r = { lastEffect: null, stores: null }, Pt.updateQueue = r, r.lastEffect = n.next = n) : (l = r.lastEffect, l === null ? r.lastEffect = n.next = n : (o = l.next, l.next = n, n.next = o, r.lastEffect = n)), n;
  }
  function qc() {
    return xn().memoizedState;
  }
  function Co(n, r, l, o) {
    var c = _r();
    Pt.flags |= n, c.memoizedState = bu(1 | r, l, void 0, o === void 0 ? null : o);
  }
  function Ro(n, r, l, o) {
    var c = xn();
    o = o === void 0 ? null : o;
    var d = void 0;
    if (jn !== null) {
      var y = jn.memoizedState;
      if (d = y.destroy, o !== null && Ze(o, y.deps)) {
        c.memoizedState = bu(r, l, d, o);
        return;
      }
    }
    Pt.flags |= n, c.memoizedState = bu(1 | r, l, d, o);
  }
  function Xc(n, r) {
    return Co(8390656, 8, n, r);
  }
  function ws(n, r) {
    return Ro(2048, 8, n, r);
  }
  function Jc(n, r) {
    return Ro(4, 2, n, r);
  }
  function Ts(n, r) {
    return Ro(4, 4, n, r);
  }
  function xu(n, r) {
    if (typeof r == "function") return n = n(), r(n), function() {
      r(null);
    };
    if (r != null) return n = n(), r.current = n, function() {
      r.current = null;
    };
  }
  function Zc(n, r, l) {
    return l = l != null ? l.concat([n]) : null, Ro(4, 4, xu.bind(null, r, n), l);
  }
  function bs() {
  }
  function ef(n, r) {
    var l = xn();
    r = r === void 0 ? null : r;
    var o = l.memoizedState;
    return o !== null && r !== null && Ze(r, o[1]) ? o[0] : (l.memoizedState = [n, r], n);
  }
  function tf(n, r) {
    var l = xn();
    r = r === void 0 ? null : r;
    var o = l.memoizedState;
    return o !== null && r !== null && Ze(r, o[1]) ? o[0] : (n = n(), l.memoizedState = [n, r], n);
  }
  function jd(n, r, l) {
    return Zt & 21 ? (ni(l, r) || (l = eo(), Pt.lanes |= l, ki |= l, n.baseState = !0), r) : (n.baseState && (n.baseState = !1, Fn = !0), n.memoizedState = l);
  }
  function xs(n, r) {
    var l = Ft;
    Ft = l !== 0 && 4 > l ? l : 4, n(!0);
    var o = Vt.transition;
    Vt.transition = {};
    try {
      n(!1), r();
    } finally {
      Ft = l, Vt.transition = o;
    }
  }
  function Fd() {
    return xn().memoizedState;
  }
  function _s(n, r, l) {
    var o = Oi(n);
    if (l = { lane: o, action: l, hasEagerState: !1, eagerState: null, next: null }, ra(n)) Jv(r, l);
    else if (l = Md(n, r, l, o), l !== null) {
      var c = Hn();
      Fr(l, n, o, c), nn(l, r, o);
    }
  }
  function _u(n, r, l) {
    var o = Oi(n), c = { lane: o, action: l, hasEagerState: !1, eagerState: null, next: null };
    if (ra(n)) Jv(r, c);
    else {
      var d = n.alternate;
      if (n.lanes === 0 && (d === null || d.lanes === 0) && (d = r.lastRenderedReducer, d !== null)) try {
        var y = r.lastRenderedState, w = d(y, l);
        if (c.hasEagerState = !0, c.eagerState = w, ni(w, y)) {
          var _ = r.interleaved;
          _ === null ? (c.next = c, Ld(r)) : (c.next = _.next, _.next = c), r.interleaved = c;
          return;
        }
      } catch {
      } finally {
      }
      l = Md(n, r, c, o), l !== null && (c = Hn(), Fr(l, n, o, c), nn(l, r, o));
    }
  }
  function ra(n) {
    var r = n.alternate;
    return n === Pt || r !== null && r === Pt;
  }
  function Jv(n, r) {
    Rs = Hc = !0;
    var l = n.pending;
    l === null ? r.next = r : (r.next = l.next, l.next = r), n.pending = r;
  }
  function nn(n, r, l) {
    if (l & 4194240) {
      var o = r.lanes;
      o &= n.pendingLanes, l |= o, r.lanes = l, Bi(n, l);
    }
  }
  var Du = { readContext: Aa, useCallback: zt, useContext: zt, useEffect: zt, useImperativeHandle: zt, useInsertionEffect: zt, useLayoutEffect: zt, useMemo: zt, useReducer: zt, useRef: zt, useState: zt, useDebugValue: zt, useDeferredValue: zt, useTransition: zt, useMutableSource: zt, useSyncExternalStore: zt, useId: zt, unstable_isNewReconciler: !1 }, nf = { readContext: Aa, useCallback: function(n, r) {
    return _r().memoizedState = [n, r === void 0 ? null : r], n;
  }, useContext: Aa, useEffect: Xc, useImperativeHandle: function(n, r, l) {
    return l = l != null ? l.concat([n]) : null, Co(
      4194308,
      4,
      xu.bind(null, r, n),
      l
    );
  }, useLayoutEffect: function(n, r) {
    return Co(4194308, 4, n, r);
  }, useInsertionEffect: function(n, r) {
    return Co(4, 2, n, r);
  }, useMemo: function(n, r) {
    var l = _r();
    return r = r === void 0 ? null : r, n = n(), l.memoizedState = [n, r], n;
  }, useReducer: function(n, r, l) {
    var o = _r();
    return r = l !== void 0 ? l(r) : r, o.memoizedState = o.baseState = r, n = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: n, lastRenderedState: r }, o.queue = n, n = n.dispatch = _s.bind(null, Pt, n), [o.memoizedState, n];
  }, useRef: function(n) {
    var r = _r();
    return n = { current: n }, r.memoizedState = n;
  }, useState: Kc, useDebugValue: bs, useDeferredValue: function(n) {
    return _r().memoizedState = n;
  }, useTransition: function() {
    var n = Kc(!1), r = n[0];
    return n = xs.bind(null, n[1]), _r().memoizedState = n, [r, n];
  }, useMutableSource: function() {
  }, useSyncExternalStore: function(n, r, l) {
    var o = Pt, c = _r();
    if (vn) {
      if (l === void 0) throw Error(E(407));
      l = l();
    } else {
      if (l = r(), qn === null) throw Error(E(349));
      Zt & 30 || $c(o, r, l);
    }
    c.memoizedState = l;
    var d = { value: l, getSnapshot: r };
    return c.queue = d, Xc(Wc.bind(
      null,
      o,
      d,
      n
    ), [n]), o.flags |= 2048, bu(9, Yc.bind(null, o, d, l, r), void 0, null), l;
  }, useId: function() {
    var n = _r(), r = qn.identifierPrefix;
    if (vn) {
      var l = bi, o = Ti;
      l = (o & ~(1 << 32 - Lr(o) - 1)).toString(32) + l, r = ":" + r + "R" + l, l = wu++, 0 < l && (r += "H" + l.toString(32)), r += ":";
    } else l = Z++, r = ":" + r + "r" + l.toString(32) + ":";
    return n.memoizedState = r;
  }, unstable_isNewReconciler: !1 }, Ds = {
    readContext: Aa,
    useCallback: ef,
    useContext: Aa,
    useEffect: ws,
    useImperativeHandle: Zc,
    useInsertionEffect: Jc,
    useLayoutEffect: Ts,
    useMemo: tf,
    useReducer: jl,
    useRef: qc,
    useState: function() {
      return jl(Ji);
    },
    useDebugValue: bs,
    useDeferredValue: function(n) {
      var r = xn();
      return jd(r, jn.memoizedState, n);
    },
    useTransition: function() {
      var n = jl(Ji)[0], r = xn().memoizedState;
      return [n, r];
    },
    useMutableSource: Bc,
    useSyncExternalStore: Ic,
    useId: Fd,
    unstable_isNewReconciler: !1
  }, rf = { readContext: Aa, useCallback: ef, useContext: Aa, useEffect: ws, useImperativeHandle: Zc, useInsertionEffect: Jc, useLayoutEffect: Ts, useMemo: tf, useReducer: Tu, useRef: qc, useState: function() {
    return Tu(Ji);
  }, useDebugValue: bs, useDeferredValue: function(n) {
    var r = xn();
    return jn === null ? r.memoizedState = n : jd(r, jn.memoizedState, n);
  }, useTransition: function() {
    var n = Tu(Ji)[0], r = xn().memoizedState;
    return [n, r];
  }, useMutableSource: Bc, useSyncExternalStore: Ic, useId: Fd, unstable_isNewReconciler: !1 };
  function ii(n, r) {
    if (n && n.defaultProps) {
      r = Se({}, r), n = n.defaultProps;
      for (var l in n) r[l] === void 0 && (r[l] = n[l]);
      return r;
    }
    return r;
  }
  function Vd(n, r, l, o) {
    r = n.memoizedState, l = l(o, r), l = l == null ? r : Se({}, r, l), n.memoizedState = l, n.lanes === 0 && (n.updateQueue.baseState = l);
  }
  var af = { isMounted: function(n) {
    return (n = n._reactInternals) ? rt(n) === n : !1;
  }, enqueueSetState: function(n, r, l) {
    n = n._reactInternals;
    var o = Hn(), c = Oi(n), d = Xi(o, c);
    d.payload = r, l != null && (d.callback = l), r = zl(n, d, c), r !== null && (Fr(r, n, c, o), Fc(r, n, c));
  }, enqueueReplaceState: function(n, r, l) {
    n = n._reactInternals;
    var o = Hn(), c = Oi(n), d = Xi(o, c);
    d.tag = 1, d.payload = r, l != null && (d.callback = l), r = zl(n, d, c), r !== null && (Fr(r, n, c, o), Fc(r, n, c));
  }, enqueueForceUpdate: function(n, r) {
    n = n._reactInternals;
    var l = Hn(), o = Oi(n), c = Xi(l, o);
    c.tag = 2, r != null && (c.callback = r), r = zl(n, c, o), r !== null && (Fr(r, n, o, l), Fc(r, n, o));
  } };
  function Zv(n, r, l, o, c, d, y) {
    return n = n.stateNode, typeof n.shouldComponentUpdate == "function" ? n.shouldComponentUpdate(o, d, y) : r.prototype && r.prototype.isPureReactComponent ? !us(l, o) || !us(c, d) : !0;
  }
  function lf(n, r, l) {
    var o = !1, c = xr, d = r.contextType;
    return typeof d == "object" && d !== null ? d = Aa(d) : (c = zn(r) ? Jr : Rn.current, o = r.contextTypes, d = (o = o != null) ? Zr(n, c) : xr), r = new r(l, d), n.memoizedState = r.state !== null && r.state !== void 0 ? r.state : null, r.updater = af, n.stateNode = r, r._reactInternals = n, o && (n = n.stateNode, n.__reactInternalMemoizedUnmaskedChildContext = c, n.__reactInternalMemoizedMaskedChildContext = d), r;
  }
  function eh(n, r, l, o) {
    n = r.state, typeof r.componentWillReceiveProps == "function" && r.componentWillReceiveProps(l, o), typeof r.UNSAFE_componentWillReceiveProps == "function" && r.UNSAFE_componentWillReceiveProps(l, o), r.state !== n && af.enqueueReplaceState(r, r.state, null);
  }
  function Ns(n, r, l, o) {
    var c = n.stateNode;
    c.props = l, c.state = n.memoizedState, c.refs = {}, Ud(n);
    var d = r.contextType;
    typeof d == "object" && d !== null ? c.context = Aa(d) : (d = zn(r) ? Jr : Rn.current, c.context = Zr(n, d)), c.state = n.memoizedState, d = r.getDerivedStateFromProps, typeof d == "function" && (Vd(n, r, d, l), c.state = n.memoizedState), typeof r.getDerivedStateFromProps == "function" || typeof c.getSnapshotBeforeUpdate == "function" || typeof c.UNSAFE_componentWillMount != "function" && typeof c.componentWillMount != "function" || (r = c.state, typeof c.componentWillMount == "function" && c.componentWillMount(), typeof c.UNSAFE_componentWillMount == "function" && c.UNSAFE_componentWillMount(), r !== c.state && af.enqueueReplaceState(c, c.state, null), ys(n, l, c, o), c.state = n.memoizedState), typeof c.componentDidMount == "function" && (n.flags |= 4194308);
  }
  function Nu(n, r) {
    try {
      var l = "", o = r;
      do
        l += vt(o), o = o.return;
      while (o);
      var c = l;
    } catch (d) {
      c = `
Error generating stack: ` + d.message + `
` + d.stack;
    }
    return { value: n, source: r, stack: c, digest: null };
  }
  function Pd(n, r, l) {
    return { value: n, source: null, stack: l ?? null, digest: r ?? null };
  }
  function Hd(n, r) {
    try {
      console.error(r.value);
    } catch (l) {
      setTimeout(function() {
        throw l;
      });
    }
  }
  var uf = typeof WeakMap == "function" ? WeakMap : Map;
  function th(n, r, l) {
    l = Xi(-1, l), l.tag = 3, l.payload = { element: null };
    var o = r.value;
    return l.callback = function() {
      Do || (Do = !0, Lu = o), Hd(n, r);
    }, l;
  }
  function Bd(n, r, l) {
    l = Xi(-1, l), l.tag = 3;
    var o = n.type.getDerivedStateFromError;
    if (typeof o == "function") {
      var c = r.value;
      l.payload = function() {
        return o(c);
      }, l.callback = function() {
        Hd(n, r);
      };
    }
    var d = n.stateNode;
    return d !== null && typeof d.componentDidCatch == "function" && (l.callback = function() {
      Hd(n, r), typeof o != "function" && (Pl === null ? Pl = /* @__PURE__ */ new Set([this]) : Pl.add(this));
      var y = r.stack;
      this.componentDidCatch(r.value, { componentStack: y !== null ? y : "" });
    }), l;
  }
  function Id(n, r, l) {
    var o = n.pingCache;
    if (o === null) {
      o = n.pingCache = new uf();
      var c = /* @__PURE__ */ new Set();
      o.set(r, c);
    } else c = o.get(r), c === void 0 && (c = /* @__PURE__ */ new Set(), o.set(r, c));
    c.has(l) || (c.add(l), n = Ay.bind(null, n, r, l), r.then(n, n));
  }
  function nh(n) {
    do {
      var r;
      if ((r = n.tag === 13) && (r = n.memoizedState, r = r !== null ? r.dehydrated !== null : !0), r) return n;
      n = n.return;
    } while (n !== null);
    return null;
  }
  function Fl(n, r, l, o, c) {
    return n.mode & 1 ? (n.flags |= 65536, n.lanes = c, n) : (n === r ? n.flags |= 65536 : (n.flags |= 128, l.flags |= 131072, l.flags &= -52805, l.tag === 1 && (l.alternate === null ? l.tag = 17 : (r = Xi(-1, 1), r.tag = 2, zl(l, r, 1))), l.lanes |= 1), n);
  }
  var ks = he.ReactCurrentOwner, Fn = !1;
  function cr(n, r, l, o) {
    r.child = n === null ? Re(r, null, l, o) : bn(r, n.child, l, o);
  }
  function aa(n, r, l, o, c) {
    l = l.render;
    var d = r.ref;
    return Sn(r, c), o = Al(n, r, l, o, d, c), l = ai(), n !== null && !Fn ? (r.updateQueue = n.updateQueue, r.flags &= -2053, n.lanes &= ~c, Fa(n, r, c)) : (vn && l && Uc(r), r.flags |= 1, cr(n, r, o, c), r.child);
  }
  function ku(n, r, l, o, c) {
    if (n === null) {
      var d = l.type;
      return typeof d == "function" && !rp(d) && d.defaultProps === void 0 && l.compare === null && l.defaultProps === void 0 ? (r.tag = 15, r.type = d, ot(n, r, d, o, c)) : (n = Ws(l.type, null, o, r, r.mode, c), n.ref = r.ref, n.return = r, r.child = n);
    }
    if (d = n.child, !(n.lanes & c)) {
      var y = d.memoizedProps;
      if (l = l.compare, l = l !== null ? l : us, l(y, o) && n.ref === r.ref) return Fa(n, r, c);
    }
    return r.flags |= 1, n = Bl(d, o), n.ref = r.ref, n.return = r, r.child = n;
  }
  function ot(n, r, l, o, c) {
    if (n !== null) {
      var d = n.memoizedProps;
      if (us(d, o) && n.ref === r.ref) if (Fn = !1, r.pendingProps = o = d, (n.lanes & c) !== 0) n.flags & 131072 && (Fn = !0);
      else return r.lanes = n.lanes, Fa(n, r, c);
    }
    return rh(n, r, l, o, c);
  }
  function Os(n, r, l) {
    var o = r.pendingProps, c = o.children, d = n !== null ? n.memoizedState : null;
    if (o.mode === "hidden") if (!(r.mode & 1)) r.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, Pe(bo, Ea), Ea |= l;
    else {
      if (!(l & 1073741824)) return n = d !== null ? d.baseLanes | l : l, r.lanes = r.childLanes = 1073741824, r.memoizedState = { baseLanes: n, cachePool: null, transitions: null }, r.updateQueue = null, Pe(bo, Ea), Ea |= n, null;
      r.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, o = d !== null ? d.baseLanes : l, Pe(bo, Ea), Ea |= o;
    }
    else d !== null ? (o = d.baseLanes | l, r.memoizedState = null) : o = l, Pe(bo, Ea), Ea |= o;
    return cr(n, r, c, l), r.child;
  }
  function $d(n, r) {
    var l = r.ref;
    (n === null && l !== null || n !== null && n.ref !== l) && (r.flags |= 512, r.flags |= 2097152);
  }
  function rh(n, r, l, o, c) {
    var d = zn(l) ? Jr : Rn.current;
    return d = Zr(r, d), Sn(r, c), l = Al(n, r, l, o, d, c), o = ai(), n !== null && !Fn ? (r.updateQueue = n.updateQueue, r.flags &= -2053, n.lanes &= ~c, Fa(n, r, c)) : (vn && o && Uc(r), r.flags |= 1, cr(n, r, l, c), r.child);
  }
  function ah(n, r, l, o, c) {
    if (zn(l)) {
      var d = !0;
      er(r);
    } else d = !1;
    if (Sn(r, c), r.stateNode === null) ja(n, r), lf(r, l, o), Ns(r, l, o, c), o = !0;
    else if (n === null) {
      var y = r.stateNode, w = r.memoizedProps;
      y.props = w;
      var _ = y.context, I = l.contextType;
      typeof I == "object" && I !== null ? I = Aa(I) : (I = zn(l) ? Jr : Rn.current, I = Zr(r, I));
      var ne = l.getDerivedStateFromProps, oe = typeof ne == "function" || typeof y.getSnapshotBeforeUpdate == "function";
      oe || typeof y.UNSAFE_componentWillReceiveProps != "function" && typeof y.componentWillReceiveProps != "function" || (w !== o || _ !== I) && eh(r, y, o, I), Sa = !1;
      var te = r.memoizedState;
      y.state = te, ys(r, o, y, c), _ = r.memoizedState, w !== o || te !== _ || Gn.current || Sa ? (typeof ne == "function" && (Vd(r, l, ne, o), _ = r.memoizedState), (w = Sa || Zv(r, l, w, o, te, _, I)) ? (oe || typeof y.UNSAFE_componentWillMount != "function" && typeof y.componentWillMount != "function" || (typeof y.componentWillMount == "function" && y.componentWillMount(), typeof y.UNSAFE_componentWillMount == "function" && y.UNSAFE_componentWillMount()), typeof y.componentDidMount == "function" && (r.flags |= 4194308)) : (typeof y.componentDidMount == "function" && (r.flags |= 4194308), r.memoizedProps = o, r.memoizedState = _), y.props = o, y.state = _, y.context = I, o = w) : (typeof y.componentDidMount == "function" && (r.flags |= 4194308), o = !1);
    } else {
      y = r.stateNode, Kv(n, r), w = r.memoizedProps, I = r.type === r.elementType ? w : ii(r.type, w), y.props = I, oe = r.pendingProps, te = y.context, _ = l.contextType, typeof _ == "object" && _ !== null ? _ = Aa(_) : (_ = zn(l) ? Jr : Rn.current, _ = Zr(r, _));
      var xe = l.getDerivedStateFromProps;
      (ne = typeof xe == "function" || typeof y.getSnapshotBeforeUpdate == "function") || typeof y.UNSAFE_componentWillReceiveProps != "function" && typeof y.componentWillReceiveProps != "function" || (w !== oe || te !== _) && eh(r, y, o, _), Sa = !1, te = r.memoizedState, y.state = te, ys(r, o, y, c);
      var Oe = r.memoizedState;
      w !== oe || te !== Oe || Gn.current || Sa ? (typeof xe == "function" && (Vd(r, l, xe, o), Oe = r.memoizedState), (I = Sa || Zv(r, l, I, o, te, Oe, _) || !1) ? (ne || typeof y.UNSAFE_componentWillUpdate != "function" && typeof y.componentWillUpdate != "function" || (typeof y.componentWillUpdate == "function" && y.componentWillUpdate(o, Oe, _), typeof y.UNSAFE_componentWillUpdate == "function" && y.UNSAFE_componentWillUpdate(o, Oe, _)), typeof y.componentDidUpdate == "function" && (r.flags |= 4), typeof y.getSnapshotBeforeUpdate == "function" && (r.flags |= 1024)) : (typeof y.componentDidUpdate != "function" || w === n.memoizedProps && te === n.memoizedState || (r.flags |= 4), typeof y.getSnapshotBeforeUpdate != "function" || w === n.memoizedProps && te === n.memoizedState || (r.flags |= 1024), r.memoizedProps = o, r.memoizedState = Oe), y.props = o, y.state = Oe, y.context = _, o = I) : (typeof y.componentDidUpdate != "function" || w === n.memoizedProps && te === n.memoizedState || (r.flags |= 4), typeof y.getSnapshotBeforeUpdate != "function" || w === n.memoizedProps && te === n.memoizedState || (r.flags |= 1024), o = !1);
    }
    return Ls(n, r, l, o, d, c);
  }
  function Ls(n, r, l, o, c, d) {
    $d(n, r);
    var y = (r.flags & 128) !== 0;
    if (!o && !y) return c && Lc(r, l, !1), Fa(n, r, d);
    o = r.stateNode, ks.current = r;
    var w = y && typeof l.getDerivedStateFromError != "function" ? null : o.render();
    return r.flags |= 1, n !== null && y ? (r.child = bn(r, n.child, null, d), r.child = bn(r, null, w, d)) : cr(n, r, w, d), r.memoizedState = o.state, c && Lc(r, l, !0), r.child;
  }
  function wo(n) {
    var r = n.stateNode;
    r.pendingContext ? Yv(n, r.pendingContext, r.pendingContext !== r.context) : r.context && Yv(n, r.context, !1), Ad(n, r.containerInfo);
  }
  function ih(n, r, l, o, c) {
    return Ul(), qi(c), r.flags |= 256, cr(n, r, l, o), r.child;
  }
  var of = { dehydrated: null, treeContext: null, retryLane: 0 };
  function Yd(n) {
    return { baseLanes: n, cachePool: null, transitions: null };
  }
  function sf(n, r, l) {
    var o = r.pendingProps, c = En.current, d = !1, y = (r.flags & 128) !== 0, w;
    if ((w = y) || (w = n !== null && n.memoizedState === null ? !1 : (c & 2) !== 0), w ? (d = !0, r.flags &= -129) : (n === null || n.memoizedState !== null) && (c |= 1), Pe(En, c & 1), n === null)
      return _d(r), n = r.memoizedState, n !== null && (n = n.dehydrated, n !== null) ? (r.mode & 1 ? n.data === "$!" ? r.lanes = 8 : r.lanes = 1073741824 : r.lanes = 1, null) : (y = o.children, n = o.fallback, d ? (o = r.mode, d = r.child, y = { mode: "hidden", children: y }, !(o & 1) && d !== null ? (d.childLanes = 0, d.pendingProps = y) : d = Il(y, o, 0, null), n = nl(n, o, l, null), d.return = r, n.return = r, d.sibling = n, r.child = d, r.child.memoizedState = Yd(l), r.memoizedState = of, n) : Wd(r, y));
    if (c = n.memoizedState, c !== null && (w = c.dehydrated, w !== null)) return lh(n, r, y, o, w, c, l);
    if (d) {
      d = o.fallback, y = r.mode, c = n.child, w = c.sibling;
      var _ = { mode: "hidden", children: o.children };
      return !(y & 1) && r.child !== c ? (o = r.child, o.childLanes = 0, o.pendingProps = _, r.deletions = null) : (o = Bl(c, _), o.subtreeFlags = c.subtreeFlags & 14680064), w !== null ? d = Bl(w, d) : (d = nl(d, y, l, null), d.flags |= 2), d.return = r, o.return = r, o.sibling = d, r.child = o, o = d, d = r.child, y = n.child.memoizedState, y = y === null ? Yd(l) : { baseLanes: y.baseLanes | l, cachePool: null, transitions: y.transitions }, d.memoizedState = y, d.childLanes = n.childLanes & ~l, r.memoizedState = of, o;
    }
    return d = n.child, n = d.sibling, o = Bl(d, { mode: "visible", children: o.children }), !(r.mode & 1) && (o.lanes = l), o.return = r, o.sibling = null, n !== null && (l = r.deletions, l === null ? (r.deletions = [n], r.flags |= 16) : l.push(n)), r.child = o, r.memoizedState = null, o;
  }
  function Wd(n, r) {
    return r = Il({ mode: "visible", children: r }, n.mode, 0, null), r.return = n, n.child = r;
  }
  function Ms(n, r, l, o) {
    return o !== null && qi(o), bn(r, n.child, null, l), n = Wd(r, r.pendingProps.children), n.flags |= 2, r.memoizedState = null, n;
  }
  function lh(n, r, l, o, c, d, y) {
    if (l)
      return r.flags & 256 ? (r.flags &= -257, o = Pd(Error(E(422))), Ms(n, r, y, o)) : r.memoizedState !== null ? (r.child = n.child, r.flags |= 128, null) : (d = o.fallback, c = r.mode, o = Il({ mode: "visible", children: o.children }, c, 0, null), d = nl(d, c, y, null), d.flags |= 2, o.return = r, d.return = r, o.sibling = d, r.child = o, r.mode & 1 && bn(r, n.child, null, y), r.child.memoizedState = Yd(y), r.memoizedState = of, d);
    if (!(r.mode & 1)) return Ms(n, r, y, null);
    if (c.data === "$!") {
      if (o = c.nextSibling && c.nextSibling.dataset, o) var w = o.dgst;
      return o = w, d = Error(E(419)), o = Pd(d, o, void 0), Ms(n, r, y, o);
    }
    if (w = (y & n.childLanes) !== 0, Fn || w) {
      if (o = qn, o !== null) {
        switch (y & -y) {
          case 4:
            c = 2;
            break;
          case 16:
            c = 8;
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
            c = 32;
            break;
          case 536870912:
            c = 268435456;
            break;
          default:
            c = 0;
        }
        c = c & (o.suspendedLanes | y) ? 0 : c, c !== 0 && c !== d.retryLane && (d.retryLane = c, ga(n, c), Fr(o, n, c, -1));
      }
      return np(), o = Pd(Error(E(421))), Ms(n, r, y, o);
    }
    return c.data === "$?" ? (r.flags |= 128, r.child = n.child, r = jy.bind(null, n), c._reactRetry = r, null) : (n = d.treeContext, ta = Ei(c.nextSibling), ea = r, vn = !0, za = null, n !== null && (An[Ua++] = Ti, An[Ua++] = bi, An[Ua++] = ma, Ti = n.id, bi = n.overflow, ma = r), r = Wd(r, o.children), r.flags |= 4096, r);
  }
  function Qd(n, r, l) {
    n.lanes |= r;
    var o = n.alternate;
    o !== null && (o.lanes |= r), Od(n.return, r, l);
  }
  function zr(n, r, l, o, c) {
    var d = n.memoizedState;
    d === null ? n.memoizedState = { isBackwards: r, rendering: null, renderingStartTime: 0, last: o, tail: l, tailMode: c } : (d.isBackwards = r, d.rendering = null, d.renderingStartTime = 0, d.last = o, d.tail = l, d.tailMode = c);
  }
  function _i(n, r, l) {
    var o = r.pendingProps, c = o.revealOrder, d = o.tail;
    if (cr(n, r, o.children, l), o = En.current, o & 2) o = o & 1 | 2, r.flags |= 128;
    else {
      if (n !== null && n.flags & 128) e: for (n = r.child; n !== null; ) {
        if (n.tag === 13) n.memoizedState !== null && Qd(n, l, r);
        else if (n.tag === 19) Qd(n, l, r);
        else if (n.child !== null) {
          n.child.return = n, n = n.child;
          continue;
        }
        if (n === r) break e;
        for (; n.sibling === null; ) {
          if (n.return === null || n.return === r) break e;
          n = n.return;
        }
        n.sibling.return = n.return, n = n.sibling;
      }
      o &= 1;
    }
    if (Pe(En, o), !(r.mode & 1)) r.memoizedState = null;
    else switch (c) {
      case "forwards":
        for (l = r.child, c = null; l !== null; ) n = l.alternate, n !== null && Pc(n) === null && (c = l), l = l.sibling;
        l = c, l === null ? (c = r.child, r.child = null) : (c = l.sibling, l.sibling = null), zr(r, !1, c, l, d);
        break;
      case "backwards":
        for (l = null, c = r.child, r.child = null; c !== null; ) {
          if (n = c.alternate, n !== null && Pc(n) === null) {
            r.child = c;
            break;
          }
          n = c.sibling, c.sibling = l, l = c, c = n;
        }
        zr(r, !0, l, null, d);
        break;
      case "together":
        zr(r, !1, null, null, void 0);
        break;
      default:
        r.memoizedState = null;
    }
    return r.child;
  }
  function ja(n, r) {
    !(r.mode & 1) && n !== null && (n.alternate = null, r.alternate = null, r.flags |= 2);
  }
  function Fa(n, r, l) {
    if (n !== null && (r.dependencies = n.dependencies), ki |= r.lanes, !(l & r.childLanes)) return null;
    if (n !== null && r.child !== n.child) throw Error(E(153));
    if (r.child !== null) {
      for (n = r.child, l = Bl(n, n.pendingProps), r.child = l, l.return = r; n.sibling !== null; ) n = n.sibling, l = l.sibling = Bl(n, n.pendingProps), l.return = r;
      l.sibling = null;
    }
    return r.child;
  }
  function Us(n, r, l) {
    switch (r.tag) {
      case 3:
        wo(r), Ul();
        break;
      case 5:
        Xv(r);
        break;
      case 1:
        zn(r.type) && er(r);
        break;
      case 4:
        Ad(r, r.stateNode.containerInfo);
        break;
      case 10:
        var o = r.type._context, c = r.memoizedProps.value;
        Pe(ya, o._currentValue), o._currentValue = c;
        break;
      case 13:
        if (o = r.memoizedState, o !== null)
          return o.dehydrated !== null ? (Pe(En, En.current & 1), r.flags |= 128, null) : l & r.child.childLanes ? sf(n, r, l) : (Pe(En, En.current & 1), n = Fa(n, r, l), n !== null ? n.sibling : null);
        Pe(En, En.current & 1);
        break;
      case 19:
        if (o = (l & r.childLanes) !== 0, n.flags & 128) {
          if (o) return _i(n, r, l);
          r.flags |= 128;
        }
        if (c = r.memoizedState, c !== null && (c.rendering = null, c.tail = null, c.lastEffect = null), Pe(En, En.current), o) break;
        return null;
      case 22:
      case 23:
        return r.lanes = 0, Os(n, r, l);
    }
    return Fa(n, r, l);
  }
  var Va, Vn, uh, oh;
  Va = function(n, r) {
    for (var l = r.child; l !== null; ) {
      if (l.tag === 5 || l.tag === 6) n.appendChild(l.stateNode);
      else if (l.tag !== 4 && l.child !== null) {
        l.child.return = l, l = l.child;
        continue;
      }
      if (l === r) break;
      for (; l.sibling === null; ) {
        if (l.return === null || l.return === r) return;
        l = l.return;
      }
      l.sibling.return = l.return, l = l.sibling;
    }
  }, Vn = function() {
  }, uh = function(n, r, l, o) {
    var c = n.memoizedProps;
    if (c !== o) {
      n = r.stateNode, Cu(xi.current);
      var d = null;
      switch (l) {
        case "input":
          c = ir(n, c), o = ir(n, o), d = [];
          break;
        case "select":
          c = Se({}, c, { value: void 0 }), o = Se({}, o, { value: void 0 }), d = [];
          break;
        case "textarea":
          c = Yn(n, c), o = Yn(n, o), d = [];
          break;
        default:
          typeof c.onClick != "function" && typeof o.onClick == "function" && (n.onclick = Dl);
      }
      on(l, o);
      var y;
      l = null;
      for (I in c) if (!o.hasOwnProperty(I) && c.hasOwnProperty(I) && c[I] != null) if (I === "style") {
        var w = c[I];
        for (y in w) w.hasOwnProperty(y) && (l || (l = {}), l[y] = "");
      } else I !== "dangerouslySetInnerHTML" && I !== "children" && I !== "suppressContentEditableWarning" && I !== "suppressHydrationWarning" && I !== "autoFocus" && (N.hasOwnProperty(I) ? d || (d = []) : (d = d || []).push(I, null));
      for (I in o) {
        var _ = o[I];
        if (w = c != null ? c[I] : void 0, o.hasOwnProperty(I) && _ !== w && (_ != null || w != null)) if (I === "style") if (w) {
          for (y in w) !w.hasOwnProperty(y) || _ && _.hasOwnProperty(y) || (l || (l = {}), l[y] = "");
          for (y in _) _.hasOwnProperty(y) && w[y] !== _[y] && (l || (l = {}), l[y] = _[y]);
        } else l || (d || (d = []), d.push(
          I,
          l
        )), l = _;
        else I === "dangerouslySetInnerHTML" ? (_ = _ ? _.__html : void 0, w = w ? w.__html : void 0, _ != null && w !== _ && (d = d || []).push(I, _)) : I === "children" ? typeof _ != "string" && typeof _ != "number" || (d = d || []).push(I, "" + _) : I !== "suppressContentEditableWarning" && I !== "suppressHydrationWarning" && (N.hasOwnProperty(I) ? (_ != null && I === "onScroll" && Wt("scroll", n), d || w === _ || (d = [])) : (d = d || []).push(I, _));
      }
      l && (d = d || []).push("style", l);
      var I = d;
      (r.updateQueue = I) && (r.flags |= 4);
    }
  }, oh = function(n, r, l, o) {
    l !== o && (r.flags |= 4);
  };
  function zs(n, r) {
    if (!vn) switch (n.tailMode) {
      case "hidden":
        r = n.tail;
        for (var l = null; r !== null; ) r.alternate !== null && (l = r), r = r.sibling;
        l === null ? n.tail = null : l.sibling = null;
        break;
      case "collapsed":
        l = n.tail;
        for (var o = null; l !== null; ) l.alternate !== null && (o = l), l = l.sibling;
        o === null ? r || n.tail === null ? n.tail = null : n.tail.sibling = null : o.sibling = null;
    }
  }
  function nr(n) {
    var r = n.alternate !== null && n.alternate.child === n.child, l = 0, o = 0;
    if (r) for (var c = n.child; c !== null; ) l |= c.lanes | c.childLanes, o |= c.subtreeFlags & 14680064, o |= c.flags & 14680064, c.return = n, c = c.sibling;
    else for (c = n.child; c !== null; ) l |= c.lanes | c.childLanes, o |= c.subtreeFlags, o |= c.flags, c.return = n, c = c.sibling;
    return n.subtreeFlags |= o, n.childLanes = l, r;
  }
  function sh(n, r, l) {
    var o = r.pendingProps;
    switch (zc(r), r.tag) {
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
        return nr(r), null;
      case 1:
        return zn(r.type) && go(), nr(r), null;
      case 3:
        return o = r.stateNode, Ru(), un(Gn), un(Rn), $e(), o.pendingContext && (o.context = o.pendingContext, o.pendingContext = null), (n === null || n.child === null) && (Ac(r) ? r.flags |= 4 : n === null || n.memoizedState.isDehydrated && !(r.flags & 256) || (r.flags |= 1024, za !== null && (Mu(za), za = null))), Vn(n, r), nr(r), null;
      case 5:
        Vc(r);
        var c = Cu(Es.current);
        if (l = r.type, n !== null && r.stateNode != null) uh(n, r, l, o, c), n.ref !== r.ref && (r.flags |= 512, r.flags |= 2097152);
        else {
          if (!o) {
            if (r.stateNode === null) throw Error(E(166));
            return nr(r), null;
          }
          if (n = Cu(xi.current), Ac(r)) {
            o = r.stateNode, l = r.type;
            var d = r.memoizedProps;
            switch (o[Ci] = r, o[ps] = d, n = (r.mode & 1) !== 0, l) {
              case "dialog":
                Wt("cancel", o), Wt("close", o);
                break;
              case "iframe":
              case "object":
              case "embed":
                Wt("load", o);
                break;
              case "video":
              case "audio":
                for (c = 0; c < cs.length; c++) Wt(cs[c], o);
                break;
              case "source":
                Wt("error", o);
                break;
              case "img":
              case "image":
              case "link":
                Wt(
                  "error",
                  o
                ), Wt("load", o);
                break;
              case "details":
                Wt("toggle", o);
                break;
              case "input":
                In(o, d), Wt("invalid", o);
                break;
              case "select":
                o._wrapperState = { wasMultiple: !!d.multiple }, Wt("invalid", o);
                break;
              case "textarea":
                Cr(o, d), Wt("invalid", o);
            }
            on(l, d), c = null;
            for (var y in d) if (d.hasOwnProperty(y)) {
              var w = d[y];
              y === "children" ? typeof w == "string" ? o.textContent !== w && (d.suppressHydrationWarning !== !0 && Dc(o.textContent, w, n), c = ["children", w]) : typeof w == "number" && o.textContent !== "" + w && (d.suppressHydrationWarning !== !0 && Dc(
                o.textContent,
                w,
                n
              ), c = ["children", "" + w]) : N.hasOwnProperty(y) && w != null && y === "onScroll" && Wt("scroll", o);
            }
            switch (l) {
              case "input":
                On(o), fi(o, d, !0);
                break;
              case "textarea":
                On(o), Ln(o);
                break;
              case "select":
              case "option":
                break;
              default:
                typeof d.onClick == "function" && (o.onclick = Dl);
            }
            o = c, r.updateQueue = o, o !== null && (r.flags |= 4);
          } else {
            y = c.nodeType === 9 ? c : c.ownerDocument, n === "http://www.w3.org/1999/xhtml" && (n = Rr(l)), n === "http://www.w3.org/1999/xhtml" ? l === "script" ? (n = y.createElement("div"), n.innerHTML = "<script><\/script>", n = n.removeChild(n.firstChild)) : typeof o.is == "string" ? n = y.createElement(l, { is: o.is }) : (n = y.createElement(l), l === "select" && (y = n, o.multiple ? y.multiple = !0 : o.size && (y.size = o.size))) : n = y.createElementNS(n, l), n[Ci] = r, n[ps] = o, Va(n, r, !1, !1), r.stateNode = n;
            e: {
              switch (y = Zn(l, o), l) {
                case "dialog":
                  Wt("cancel", n), Wt("close", n), c = o;
                  break;
                case "iframe":
                case "object":
                case "embed":
                  Wt("load", n), c = o;
                  break;
                case "video":
                case "audio":
                  for (c = 0; c < cs.length; c++) Wt(cs[c], n);
                  c = o;
                  break;
                case "source":
                  Wt("error", n), c = o;
                  break;
                case "img":
                case "image":
                case "link":
                  Wt(
                    "error",
                    n
                  ), Wt("load", n), c = o;
                  break;
                case "details":
                  Wt("toggle", n), c = o;
                  break;
                case "input":
                  In(n, o), c = ir(n, o), Wt("invalid", n);
                  break;
                case "option":
                  c = o;
                  break;
                case "select":
                  n._wrapperState = { wasMultiple: !!o.multiple }, c = Se({}, o, { value: void 0 }), Wt("invalid", n);
                  break;
                case "textarea":
                  Cr(n, o), c = Yn(n, o), Wt("invalid", n);
                  break;
                default:
                  c = o;
              }
              on(l, c), w = c;
              for (d in w) if (w.hasOwnProperty(d)) {
                var _ = w[d];
                d === "style" ? rn(n, _) : d === "dangerouslySetInnerHTML" ? (_ = _ ? _.__html : void 0, _ != null && di(n, _)) : d === "children" ? typeof _ == "string" ? (l !== "textarea" || _ !== "") && pe(n, _) : typeof _ == "number" && pe(n, "" + _) : d !== "suppressContentEditableWarning" && d !== "suppressHydrationWarning" && d !== "autoFocus" && (N.hasOwnProperty(d) ? _ != null && d === "onScroll" && Wt("scroll", n) : _ != null && ae(n, d, _, y));
              }
              switch (l) {
                case "input":
                  On(n), fi(n, o, !1);
                  break;
                case "textarea":
                  On(n), Ln(n);
                  break;
                case "option":
                  o.value != null && n.setAttribute("value", "" + ft(o.value));
                  break;
                case "select":
                  n.multiple = !!o.multiple, d = o.value, d != null ? Tn(n, !!o.multiple, d, !1) : o.defaultValue != null && Tn(
                    n,
                    !!o.multiple,
                    o.defaultValue,
                    !0
                  );
                  break;
                default:
                  typeof c.onClick == "function" && (n.onclick = Dl);
              }
              switch (l) {
                case "button":
                case "input":
                case "select":
                case "textarea":
                  o = !!o.autoFocus;
                  break e;
                case "img":
                  o = !0;
                  break e;
                default:
                  o = !1;
              }
            }
            o && (r.flags |= 4);
          }
          r.ref !== null && (r.flags |= 512, r.flags |= 2097152);
        }
        return nr(r), null;
      case 6:
        if (n && r.stateNode != null) oh(n, r, n.memoizedProps, o);
        else {
          if (typeof o != "string" && r.stateNode === null) throw Error(E(166));
          if (l = Cu(Es.current), Cu(xi.current), Ac(r)) {
            if (o = r.stateNode, l = r.memoizedProps, o[Ci] = r, (d = o.nodeValue !== l) && (n = ea, n !== null)) switch (n.tag) {
              case 3:
                Dc(o.nodeValue, l, (n.mode & 1) !== 0);
                break;
              case 5:
                n.memoizedProps.suppressHydrationWarning !== !0 && Dc(o.nodeValue, l, (n.mode & 1) !== 0);
            }
            d && (r.flags |= 4);
          } else o = (l.nodeType === 9 ? l : l.ownerDocument).createTextNode(o), o[Ci] = r, r.stateNode = o;
        }
        return nr(r), null;
      case 13:
        if (un(En), o = r.memoizedState, n === null || n.memoizedState !== null && n.memoizedState.dehydrated !== null) {
          if (vn && ta !== null && r.mode & 1 && !(r.flags & 128)) ms(), Ul(), r.flags |= 98560, d = !1;
          else if (d = Ac(r), o !== null && o.dehydrated !== null) {
            if (n === null) {
              if (!d) throw Error(E(318));
              if (d = r.memoizedState, d = d !== null ? d.dehydrated : null, !d) throw Error(E(317));
              d[Ci] = r;
            } else Ul(), !(r.flags & 128) && (r.memoizedState = null), r.flags |= 4;
            nr(r), d = !1;
          } else za !== null && (Mu(za), za = null), d = !0;
          if (!d) return r.flags & 65536 ? r : null;
        }
        return r.flags & 128 ? (r.lanes = l, r) : (o = o !== null, o !== (n !== null && n.memoizedState !== null) && o && (r.child.flags |= 8192, r.mode & 1 && (n === null || En.current & 1 ? Dn === 0 && (Dn = 3) : np())), r.updateQueue !== null && (r.flags |= 4), nr(r), null);
      case 4:
        return Ru(), Vn(n, r), n === null && po(r.stateNode.containerInfo), nr(r), null;
      case 10:
        return kd(r.type._context), nr(r), null;
      case 17:
        return zn(r.type) && go(), nr(r), null;
      case 19:
        if (un(En), d = r.memoizedState, d === null) return nr(r), null;
        if (o = (r.flags & 128) !== 0, y = d.rendering, y === null) if (o) zs(d, !1);
        else {
          if (Dn !== 0 || n !== null && n.flags & 128) for (n = r.child; n !== null; ) {
            if (y = Pc(n), y !== null) {
              for (r.flags |= 128, zs(d, !1), o = y.updateQueue, o !== null && (r.updateQueue = o, r.flags |= 4), r.subtreeFlags = 0, o = l, l = r.child; l !== null; ) d = l, n = o, d.flags &= 14680066, y = d.alternate, y === null ? (d.childLanes = 0, d.lanes = n, d.child = null, d.subtreeFlags = 0, d.memoizedProps = null, d.memoizedState = null, d.updateQueue = null, d.dependencies = null, d.stateNode = null) : (d.childLanes = y.childLanes, d.lanes = y.lanes, d.child = y.child, d.subtreeFlags = 0, d.deletions = null, d.memoizedProps = y.memoizedProps, d.memoizedState = y.memoizedState, d.updateQueue = y.updateQueue, d.type = y.type, n = y.dependencies, d.dependencies = n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }), l = l.sibling;
              return Pe(En, En.current & 1 | 2), r.child;
            }
            n = n.sibling;
          }
          d.tail !== null && Yt() > _o && (r.flags |= 128, o = !0, zs(d, !1), r.lanes = 4194304);
        }
        else {
          if (!o) if (n = Pc(y), n !== null) {
            if (r.flags |= 128, o = !0, l = n.updateQueue, l !== null && (r.updateQueue = l, r.flags |= 4), zs(d, !0), d.tail === null && d.tailMode === "hidden" && !y.alternate && !vn) return nr(r), null;
          } else 2 * Yt() - d.renderingStartTime > _o && l !== 1073741824 && (r.flags |= 128, o = !0, zs(d, !1), r.lanes = 4194304);
          d.isBackwards ? (y.sibling = r.child, r.child = y) : (l = d.last, l !== null ? l.sibling = y : r.child = y, d.last = y);
        }
        return d.tail !== null ? (r = d.tail, d.rendering = r, d.tail = r.sibling, d.renderingStartTime = Yt(), r.sibling = null, l = En.current, Pe(En, o ? l & 1 | 2 : l & 1), r) : (nr(r), null);
      case 22:
      case 23:
        return tp(), o = r.memoizedState !== null, n !== null && n.memoizedState !== null !== o && (r.flags |= 8192), o && r.mode & 1 ? Ea & 1073741824 && (nr(r), r.subtreeFlags & 6 && (r.flags |= 8192)) : nr(r), null;
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(E(156, r.tag));
  }
  function cf(n, r) {
    switch (zc(r), r.tag) {
      case 1:
        return zn(r.type) && go(), n = r.flags, n & 65536 ? (r.flags = n & -65537 | 128, r) : null;
      case 3:
        return Ru(), un(Gn), un(Rn), $e(), n = r.flags, n & 65536 && !(n & 128) ? (r.flags = n & -65537 | 128, r) : null;
      case 5:
        return Vc(r), null;
      case 13:
        if (un(En), n = r.memoizedState, n !== null && n.dehydrated !== null) {
          if (r.alternate === null) throw Error(E(340));
          Ul();
        }
        return n = r.flags, n & 65536 ? (r.flags = n & -65537 | 128, r) : null;
      case 19:
        return un(En), null;
      case 4:
        return Ru(), null;
      case 10:
        return kd(r.type._context), null;
      case 22:
      case 23:
        return tp(), null;
      case 24:
        return null;
      default:
        return null;
    }
  }
  var As = !1, Dr = !1, ky = typeof WeakSet == "function" ? WeakSet : Set, ke = null;
  function To(n, r) {
    var l = n.ref;
    if (l !== null) if (typeof l == "function") try {
      l(null);
    } catch (o) {
      hn(n, r, o);
    }
    else l.current = null;
  }
  function ff(n, r, l) {
    try {
      l();
    } catch (o) {
      hn(n, r, o);
    }
  }
  var ch = !1;
  function fh(n, r) {
    if (ds = ka, n = os(), Ec(n)) {
      if ("selectionStart" in n) var l = { start: n.selectionStart, end: n.selectionEnd };
      else e: {
        l = (l = n.ownerDocument) && l.defaultView || window;
        var o = l.getSelection && l.getSelection();
        if (o && o.rangeCount !== 0) {
          l = o.anchorNode;
          var c = o.anchorOffset, d = o.focusNode;
          o = o.focusOffset;
          try {
            l.nodeType, d.nodeType;
          } catch {
            l = null;
            break e;
          }
          var y = 0, w = -1, _ = -1, I = 0, ne = 0, oe = n, te = null;
          t: for (; ; ) {
            for (var xe; oe !== l || c !== 0 && oe.nodeType !== 3 || (w = y + c), oe !== d || o !== 0 && oe.nodeType !== 3 || (_ = y + o), oe.nodeType === 3 && (y += oe.nodeValue.length), (xe = oe.firstChild) !== null; )
              te = oe, oe = xe;
            for (; ; ) {
              if (oe === n) break t;
              if (te === l && ++I === c && (w = y), te === d && ++ne === o && (_ = y), (xe = oe.nextSibling) !== null) break;
              oe = te, te = oe.parentNode;
            }
            oe = xe;
          }
          l = w === -1 || _ === -1 ? null : { start: w, end: _ };
        } else l = null;
      }
      l = l || { start: 0, end: 0 };
    } else l = null;
    for (hu = { focusedElem: n, selectionRange: l }, ka = !1, ke = r; ke !== null; ) if (r = ke, n = r.child, (r.subtreeFlags & 1028) !== 0 && n !== null) n.return = r, ke = n;
    else for (; ke !== null; ) {
      r = ke;
      try {
        var Oe = r.alternate;
        if (r.flags & 1024) switch (r.tag) {
          case 0:
          case 11:
          case 15:
            break;
          case 1:
            if (Oe !== null) {
              var Ue = Oe.memoizedProps, Nn = Oe.memoizedState, M = r.stateNode, k = M.getSnapshotBeforeUpdate(r.elementType === r.type ? Ue : ii(r.type, Ue), Nn);
              M.__reactInternalSnapshotBeforeUpdate = k;
            }
            break;
          case 3:
            var j = r.stateNode.containerInfo;
            j.nodeType === 1 ? j.textContent = "" : j.nodeType === 9 && j.documentElement && j.removeChild(j.documentElement);
            break;
          case 5:
          case 6:
          case 4:
          case 17:
            break;
          default:
            throw Error(E(163));
        }
      } catch (re) {
        hn(r, r.return, re);
      }
      if (n = r.sibling, n !== null) {
        n.return = r.return, ke = n;
        break;
      }
      ke = r.return;
    }
    return Oe = ch, ch = !1, Oe;
  }
  function js(n, r, l) {
    var o = r.updateQueue;
    if (o = o !== null ? o.lastEffect : null, o !== null) {
      var c = o = o.next;
      do {
        if ((c.tag & n) === n) {
          var d = c.destroy;
          c.destroy = void 0, d !== void 0 && ff(r, l, d);
        }
        c = c.next;
      } while (c !== o);
    }
  }
  function Fs(n, r) {
    if (r = r.updateQueue, r = r !== null ? r.lastEffect : null, r !== null) {
      var l = r = r.next;
      do {
        if ((l.tag & n) === n) {
          var o = l.create;
          l.destroy = o();
        }
        l = l.next;
      } while (l !== r);
    }
  }
  function Gd(n) {
    var r = n.ref;
    if (r !== null) {
      var l = n.stateNode;
      switch (n.tag) {
        case 5:
          n = l;
          break;
        default:
          n = l;
      }
      typeof r == "function" ? r(n) : r.current = n;
    }
  }
  function df(n) {
    var r = n.alternate;
    r !== null && (n.alternate = null, df(r)), n.child = null, n.deletions = null, n.sibling = null, n.tag === 5 && (r = n.stateNode, r !== null && (delete r[Ci], delete r[ps], delete r[vs], delete r[yo], delete r[Dy])), n.stateNode = null, n.return = null, n.dependencies = null, n.memoizedProps = null, n.memoizedState = null, n.pendingProps = null, n.stateNode = null, n.updateQueue = null;
  }
  function Vs(n) {
    return n.tag === 5 || n.tag === 3 || n.tag === 4;
  }
  function Zi(n) {
    e: for (; ; ) {
      for (; n.sibling === null; ) {
        if (n.return === null || Vs(n.return)) return null;
        n = n.return;
      }
      for (n.sibling.return = n.return, n = n.sibling; n.tag !== 5 && n.tag !== 6 && n.tag !== 18; ) {
        if (n.flags & 2 || n.child === null || n.tag === 4) continue e;
        n.child.return = n, n = n.child;
      }
      if (!(n.flags & 2)) return n.stateNode;
    }
  }
  function Di(n, r, l) {
    var o = n.tag;
    if (o === 5 || o === 6) n = n.stateNode, r ? l.nodeType === 8 ? l.parentNode.insertBefore(n, r) : l.insertBefore(n, r) : (l.nodeType === 8 ? (r = l.parentNode, r.insertBefore(n, l)) : (r = l, r.appendChild(n)), l = l._reactRootContainer, l != null || r.onclick !== null || (r.onclick = Dl));
    else if (o !== 4 && (n = n.child, n !== null)) for (Di(n, r, l), n = n.sibling; n !== null; ) Di(n, r, l), n = n.sibling;
  }
  function Ni(n, r, l) {
    var o = n.tag;
    if (o === 5 || o === 6) n = n.stateNode, r ? l.insertBefore(n, r) : l.appendChild(n);
    else if (o !== 4 && (n = n.child, n !== null)) for (Ni(n, r, l), n = n.sibling; n !== null; ) Ni(n, r, l), n = n.sibling;
  }
  var _n = null, Ar = !1;
  function jr(n, r, l) {
    for (l = l.child; l !== null; ) dh(n, r, l), l = l.sibling;
  }
  function dh(n, r, l) {
    if (qr && typeof qr.onCommitFiberUnmount == "function") try {
      qr.onCommitFiberUnmount(Sl, l);
    } catch {
    }
    switch (l.tag) {
      case 5:
        Dr || To(l, r);
      case 6:
        var o = _n, c = Ar;
        _n = null, jr(n, r, l), _n = o, Ar = c, _n !== null && (Ar ? (n = _n, l = l.stateNode, n.nodeType === 8 ? n.parentNode.removeChild(l) : n.removeChild(l)) : _n.removeChild(l.stateNode));
        break;
      case 18:
        _n !== null && (Ar ? (n = _n, l = l.stateNode, n.nodeType === 8 ? mo(n.parentNode, l) : n.nodeType === 1 && mo(n, l), ei(n)) : mo(_n, l.stateNode));
        break;
      case 4:
        o = _n, c = Ar, _n = l.stateNode.containerInfo, Ar = !0, jr(n, r, l), _n = o, Ar = c;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (!Dr && (o = l.updateQueue, o !== null && (o = o.lastEffect, o !== null))) {
          c = o = o.next;
          do {
            var d = c, y = d.destroy;
            d = d.tag, y !== void 0 && (d & 2 || d & 4) && ff(l, r, y), c = c.next;
          } while (c !== o);
        }
        jr(n, r, l);
        break;
      case 1:
        if (!Dr && (To(l, r), o = l.stateNode, typeof o.componentWillUnmount == "function")) try {
          o.props = l.memoizedProps, o.state = l.memoizedState, o.componentWillUnmount();
        } catch (w) {
          hn(l, r, w);
        }
        jr(n, r, l);
        break;
      case 21:
        jr(n, r, l);
        break;
      case 22:
        l.mode & 1 ? (Dr = (o = Dr) || l.memoizedState !== null, jr(n, r, l), Dr = o) : jr(n, r, l);
        break;
      default:
        jr(n, r, l);
    }
  }
  function ph(n) {
    var r = n.updateQueue;
    if (r !== null) {
      n.updateQueue = null;
      var l = n.stateNode;
      l === null && (l = n.stateNode = new ky()), r.forEach(function(o) {
        var c = Rh.bind(null, n, o);
        l.has(o) || (l.add(o), o.then(c, c));
      });
    }
  }
  function li(n, r) {
    var l = r.deletions;
    if (l !== null) for (var o = 0; o < l.length; o++) {
      var c = l[o];
      try {
        var d = n, y = r, w = y;
        e: for (; w !== null; ) {
          switch (w.tag) {
            case 5:
              _n = w.stateNode, Ar = !1;
              break e;
            case 3:
              _n = w.stateNode.containerInfo, Ar = !0;
              break e;
            case 4:
              _n = w.stateNode.containerInfo, Ar = !0;
              break e;
          }
          w = w.return;
        }
        if (_n === null) throw Error(E(160));
        dh(d, y, c), _n = null, Ar = !1;
        var _ = c.alternate;
        _ !== null && (_.return = null), c.return = null;
      } catch (I) {
        hn(c, r, I);
      }
    }
    if (r.subtreeFlags & 12854) for (r = r.child; r !== null; ) Kd(r, n), r = r.sibling;
  }
  function Kd(n, r) {
    var l = n.alternate, o = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (li(r, n), ia(n), o & 4) {
          try {
            js(3, n, n.return), Fs(3, n);
          } catch (Ue) {
            hn(n, n.return, Ue);
          }
          try {
            js(5, n, n.return);
          } catch (Ue) {
            hn(n, n.return, Ue);
          }
        }
        break;
      case 1:
        li(r, n), ia(n), o & 512 && l !== null && To(l, l.return);
        break;
      case 5:
        if (li(r, n), ia(n), o & 512 && l !== null && To(l, l.return), n.flags & 32) {
          var c = n.stateNode;
          try {
            pe(c, "");
          } catch (Ue) {
            hn(n, n.return, Ue);
          }
        }
        if (o & 4 && (c = n.stateNode, c != null)) {
          var d = n.memoizedProps, y = l !== null ? l.memoizedProps : d, w = n.type, _ = n.updateQueue;
          if (n.updateQueue = null, _ !== null) try {
            w === "input" && d.type === "radio" && d.name != null && $n(c, d), Zn(w, y);
            var I = Zn(w, d);
            for (y = 0; y < _.length; y += 2) {
              var ne = _[y], oe = _[y + 1];
              ne === "style" ? rn(c, oe) : ne === "dangerouslySetInnerHTML" ? di(c, oe) : ne === "children" ? pe(c, oe) : ae(c, ne, oe, I);
            }
            switch (w) {
              case "input":
                Gr(c, d);
                break;
              case "textarea":
                Ga(c, d);
                break;
              case "select":
                var te = c._wrapperState.wasMultiple;
                c._wrapperState.wasMultiple = !!d.multiple;
                var xe = d.value;
                xe != null ? Tn(c, !!d.multiple, xe, !1) : te !== !!d.multiple && (d.defaultValue != null ? Tn(
                  c,
                  !!d.multiple,
                  d.defaultValue,
                  !0
                ) : Tn(c, !!d.multiple, d.multiple ? [] : "", !1));
            }
            c[ps] = d;
          } catch (Ue) {
            hn(n, n.return, Ue);
          }
        }
        break;
      case 6:
        if (li(r, n), ia(n), o & 4) {
          if (n.stateNode === null) throw Error(E(162));
          c = n.stateNode, d = n.memoizedProps;
          try {
            c.nodeValue = d;
          } catch (Ue) {
            hn(n, n.return, Ue);
          }
        }
        break;
      case 3:
        if (li(r, n), ia(n), o & 4 && l !== null && l.memoizedState.isDehydrated) try {
          ei(r.containerInfo);
        } catch (Ue) {
          hn(n, n.return, Ue);
        }
        break;
      case 4:
        li(r, n), ia(n);
        break;
      case 13:
        li(r, n), ia(n), c = n.child, c.flags & 8192 && (d = c.memoizedState !== null, c.stateNode.isHidden = d, !d || c.alternate !== null && c.alternate.memoizedState !== null || (Jd = Yt())), o & 4 && ph(n);
        break;
      case 22:
        if (ne = l !== null && l.memoizedState !== null, n.mode & 1 ? (Dr = (I = Dr) || ne, li(r, n), Dr = I) : li(r, n), ia(n), o & 8192) {
          if (I = n.memoizedState !== null, (n.stateNode.isHidden = I) && !ne && n.mode & 1) for (ke = n, ne = n.child; ne !== null; ) {
            for (oe = ke = ne; ke !== null; ) {
              switch (te = ke, xe = te.child, te.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  js(4, te, te.return);
                  break;
                case 1:
                  To(te, te.return);
                  var Oe = te.stateNode;
                  if (typeof Oe.componentWillUnmount == "function") {
                    o = te, l = te.return;
                    try {
                      r = o, Oe.props = r.memoizedProps, Oe.state = r.memoizedState, Oe.componentWillUnmount();
                    } catch (Ue) {
                      hn(o, l, Ue);
                    }
                  }
                  break;
                case 5:
                  To(te, te.return);
                  break;
                case 22:
                  if (te.memoizedState !== null) {
                    Ps(oe);
                    continue;
                  }
              }
              xe !== null ? (xe.return = te, ke = xe) : Ps(oe);
            }
            ne = ne.sibling;
          }
          e: for (ne = null, oe = n; ; ) {
            if (oe.tag === 5) {
              if (ne === null) {
                ne = oe;
                try {
                  c = oe.stateNode, I ? (d = c.style, typeof d.setProperty == "function" ? d.setProperty("display", "none", "important") : d.display = "none") : (w = oe.stateNode, _ = oe.memoizedProps.style, y = _ != null && _.hasOwnProperty("display") ? _.display : null, w.style.display = $t("display", y));
                } catch (Ue) {
                  hn(n, n.return, Ue);
                }
              }
            } else if (oe.tag === 6) {
              if (ne === null) try {
                oe.stateNode.nodeValue = I ? "" : oe.memoizedProps;
              } catch (Ue) {
                hn(n, n.return, Ue);
              }
            } else if ((oe.tag !== 22 && oe.tag !== 23 || oe.memoizedState === null || oe === n) && oe.child !== null) {
              oe.child.return = oe, oe = oe.child;
              continue;
            }
            if (oe === n) break e;
            for (; oe.sibling === null; ) {
              if (oe.return === null || oe.return === n) break e;
              ne === oe && (ne = null), oe = oe.return;
            }
            ne === oe && (ne = null), oe.sibling.return = oe.return, oe = oe.sibling;
          }
        }
        break;
      case 19:
        li(r, n), ia(n), o & 4 && ph(n);
        break;
      case 21:
        break;
      default:
        li(
          r,
          n
        ), ia(n);
    }
  }
  function ia(n) {
    var r = n.flags;
    if (r & 2) {
      try {
        e: {
          for (var l = n.return; l !== null; ) {
            if (Vs(l)) {
              var o = l;
              break e;
            }
            l = l.return;
          }
          throw Error(E(160));
        }
        switch (o.tag) {
          case 5:
            var c = o.stateNode;
            o.flags & 32 && (pe(c, ""), o.flags &= -33);
            var d = Zi(n);
            Ni(n, d, c);
            break;
          case 3:
          case 4:
            var y = o.stateNode.containerInfo, w = Zi(n);
            Di(n, w, y);
            break;
          default:
            throw Error(E(161));
        }
      } catch (_) {
        hn(n, n.return, _);
      }
      n.flags &= -3;
    }
    r & 4096 && (n.flags &= -4097);
  }
  function Oy(n, r, l) {
    ke = n, qd(n);
  }
  function qd(n, r, l) {
    for (var o = (n.mode & 1) !== 0; ke !== null; ) {
      var c = ke, d = c.child;
      if (c.tag === 22 && o) {
        var y = c.memoizedState !== null || As;
        if (!y) {
          var w = c.alternate, _ = w !== null && w.memoizedState !== null || Dr;
          w = As;
          var I = Dr;
          if (As = y, (Dr = _) && !I) for (ke = c; ke !== null; ) y = ke, _ = y.child, y.tag === 22 && y.memoizedState !== null ? Xd(c) : _ !== null ? (_.return = y, ke = _) : Xd(c);
          for (; d !== null; ) ke = d, qd(d), d = d.sibling;
          ke = c, As = w, Dr = I;
        }
        vh(n);
      } else c.subtreeFlags & 8772 && d !== null ? (d.return = c, ke = d) : vh(n);
    }
  }
  function vh(n) {
    for (; ke !== null; ) {
      var r = ke;
      if (r.flags & 8772) {
        var l = r.alternate;
        try {
          if (r.flags & 8772) switch (r.tag) {
            case 0:
            case 11:
            case 15:
              Dr || Fs(5, r);
              break;
            case 1:
              var o = r.stateNode;
              if (r.flags & 4 && !Dr) if (l === null) o.componentDidMount();
              else {
                var c = r.elementType === r.type ? l.memoizedProps : ii(r.type, l.memoizedProps);
                o.componentDidUpdate(c, l.memoizedState, o.__reactInternalSnapshotBeforeUpdate);
              }
              var d = r.updateQueue;
              d !== null && zd(r, d, o);
              break;
            case 3:
              var y = r.updateQueue;
              if (y !== null) {
                if (l = null, r.child !== null) switch (r.child.tag) {
                  case 5:
                    l = r.child.stateNode;
                    break;
                  case 1:
                    l = r.child.stateNode;
                }
                zd(r, y, l);
              }
              break;
            case 5:
              var w = r.stateNode;
              if (l === null && r.flags & 4) {
                l = w;
                var _ = r.memoizedProps;
                switch (r.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    _.autoFocus && l.focus();
                    break;
                  case "img":
                    _.src && (l.src = _.src);
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
              if (r.memoizedState === null) {
                var I = r.alternate;
                if (I !== null) {
                  var ne = I.memoizedState;
                  if (ne !== null) {
                    var oe = ne.dehydrated;
                    oe !== null && ei(oe);
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
          Dr || r.flags & 512 && Gd(r);
        } catch (te) {
          hn(r, r.return, te);
        }
      }
      if (r === n) {
        ke = null;
        break;
      }
      if (l = r.sibling, l !== null) {
        l.return = r.return, ke = l;
        break;
      }
      ke = r.return;
    }
  }
  function Ps(n) {
    for (; ke !== null; ) {
      var r = ke;
      if (r === n) {
        ke = null;
        break;
      }
      var l = r.sibling;
      if (l !== null) {
        l.return = r.return, ke = l;
        break;
      }
      ke = r.return;
    }
  }
  function Xd(n) {
    for (; ke !== null; ) {
      var r = ke;
      try {
        switch (r.tag) {
          case 0:
          case 11:
          case 15:
            var l = r.return;
            try {
              Fs(4, r);
            } catch (_) {
              hn(r, l, _);
            }
            break;
          case 1:
            var o = r.stateNode;
            if (typeof o.componentDidMount == "function") {
              var c = r.return;
              try {
                o.componentDidMount();
              } catch (_) {
                hn(r, c, _);
              }
            }
            var d = r.return;
            try {
              Gd(r);
            } catch (_) {
              hn(r, d, _);
            }
            break;
          case 5:
            var y = r.return;
            try {
              Gd(r);
            } catch (_) {
              hn(r, y, _);
            }
        }
      } catch (_) {
        hn(r, r.return, _);
      }
      if (r === n) {
        ke = null;
        break;
      }
      var w = r.sibling;
      if (w !== null) {
        w.return = r.return, ke = w;
        break;
      }
      ke = r.return;
    }
  }
  var Ly = Math.ceil, Vl = he.ReactCurrentDispatcher, Ou = he.ReactCurrentOwner, fr = he.ReactCurrentBatchConfig, Dt = 0, qn = null, Pn = null, dr = 0, Ea = 0, bo = Ma(0), Dn = 0, Hs = null, ki = 0, xo = 0, pf = 0, Bs = null, la = null, Jd = 0, _o = 1 / 0, Ca = null, Do = !1, Lu = null, Pl = null, vf = !1, el = null, Is = 0, Hl = 0, No = null, $s = -1, Nr = 0;
  function Hn() {
    return Dt & 6 ? Yt() : $s !== -1 ? $s : $s = Yt();
  }
  function Oi(n) {
    return n.mode & 1 ? Dt & 2 && dr !== 0 ? dr & -dr : Ny.transition !== null ? (Nr === 0 && (Nr = eo()), Nr) : (n = Ft, n !== 0 || (n = window.event, n = n === void 0 ? 16 : uo(n.type)), n) : 1;
  }
  function Fr(n, r, l, o) {
    if (50 < Hl) throw Hl = 0, No = null, Error(E(185));
    Hi(n, l, o), (!(Dt & 2) || n !== qn) && (n === qn && (!(Dt & 2) && (xo |= l), Dn === 4 && ui(n, dr)), ua(n, o), l === 1 && Dt === 0 && !(r.mode & 1) && (_o = Yt() + 500, So && wi()));
  }
  function ua(n, r) {
    var l = n.callbackNode;
    lu(n, r);
    var o = Za(n, n === qn ? dr : 0);
    if (o === 0) l !== null && _a(l), n.callbackNode = null, n.callbackPriority = 0;
    else if (r = o & -o, n.callbackPriority !== r) {
      if (l != null && _a(l), r === 1) n.tag === 0 ? kl(Zd.bind(null, n)) : Mc(Zd.bind(null, n)), ho(function() {
        !(Dt & 6) && wi();
      }), l = null;
      else {
        switch (no(o)) {
          case 1:
            l = Pi;
            break;
          case 4:
            l = Xo;
            break;
          case 16:
            l = iu;
            break;
          case 536870912:
            l = Xu;
            break;
          default:
            l = iu;
        }
        l = Th(l, hf.bind(null, n));
      }
      n.callbackPriority = r, n.callbackNode = l;
    }
  }
  function hf(n, r) {
    if ($s = -1, Nr = 0, Dt & 6) throw Error(E(327));
    var l = n.callbackNode;
    if (ko() && n.callbackNode !== l) return null;
    var o = Za(n, n === qn ? dr : 0);
    if (o === 0) return null;
    if (o & 30 || o & n.expiredLanes || r) r = mf(n, o);
    else {
      r = o;
      var c = Dt;
      Dt |= 2;
      var d = mh();
      (qn !== n || dr !== r) && (Ca = null, _o = Yt() + 500, tl(n, r));
      do
        try {
          yh();
          break;
        } catch (w) {
          hh(n, w);
        }
      while (!0);
      Nd(), Vl.current = d, Dt = c, Pn !== null ? r = 0 : (qn = null, dr = 0, r = Dn);
    }
    if (r !== 0) {
      if (r === 2 && (c = Cl(n), c !== 0 && (o = c, r = Ys(n, c))), r === 1) throw l = Hs, tl(n, 0), ui(n, o), ua(n, Yt()), l;
      if (r === 6) ui(n, o);
      else {
        if (c = n.current.alternate, !(o & 30) && !My(c) && (r = mf(n, o), r === 2 && (d = Cl(n), d !== 0 && (o = d, r = Ys(n, d))), r === 1)) throw l = Hs, tl(n, 0), ui(n, o), ua(n, Yt()), l;
        switch (n.finishedWork = c, n.finishedLanes = o, r) {
          case 0:
          case 1:
            throw Error(E(345));
          case 2:
            zu(n, la, Ca);
            break;
          case 3:
            if (ui(n, o), (o & 130023424) === o && (r = Jd + 500 - Yt(), 10 < r)) {
              if (Za(n, 0) !== 0) break;
              if (c = n.suspendedLanes, (c & o) !== o) {
                Hn(), n.pingedLanes |= n.suspendedLanes & c;
                break;
              }
              n.timeoutHandle = kc(zu.bind(null, n, la, Ca), r);
              break;
            }
            zu(n, la, Ca);
            break;
          case 4:
            if (ui(n, o), (o & 4194240) === o) break;
            for (r = n.eventTimes, c = -1; 0 < o; ) {
              var y = 31 - Lr(o);
              d = 1 << y, y = r[y], y > c && (c = y), o &= ~d;
            }
            if (o = c, o = Yt() - o, o = (120 > o ? 120 : 480 > o ? 480 : 1080 > o ? 1080 : 1920 > o ? 1920 : 3e3 > o ? 3e3 : 4320 > o ? 4320 : 1960 * Ly(o / 1960)) - o, 10 < o) {
              n.timeoutHandle = kc(zu.bind(null, n, la, Ca), o);
              break;
            }
            zu(n, la, Ca);
            break;
          case 5:
            zu(n, la, Ca);
            break;
          default:
            throw Error(E(329));
        }
      }
    }
    return ua(n, Yt()), n.callbackNode === l ? hf.bind(null, n) : null;
  }
  function Ys(n, r) {
    var l = Bs;
    return n.current.memoizedState.isDehydrated && (tl(n, r).flags |= 256), n = mf(n, r), n !== 2 && (r = la, la = l, r !== null && Mu(r)), n;
  }
  function Mu(n) {
    la === null ? la = n : la.push.apply(la, n);
  }
  function My(n) {
    for (var r = n; ; ) {
      if (r.flags & 16384) {
        var l = r.updateQueue;
        if (l !== null && (l = l.stores, l !== null)) for (var o = 0; o < l.length; o++) {
          var c = l[o], d = c.getSnapshot;
          c = c.value;
          try {
            if (!ni(d(), c)) return !1;
          } catch {
            return !1;
          }
        }
      }
      if (l = r.child, r.subtreeFlags & 16384 && l !== null) l.return = r, r = l;
      else {
        if (r === n) break;
        for (; r.sibling === null; ) {
          if (r.return === null || r.return === n) return !0;
          r = r.return;
        }
        r.sibling.return = r.return, r = r.sibling;
      }
    }
    return !0;
  }
  function ui(n, r) {
    for (r &= ~pf, r &= ~xo, n.suspendedLanes |= r, n.pingedLanes &= ~r, n = n.expirationTimes; 0 < r; ) {
      var l = 31 - Lr(r), o = 1 << l;
      n[l] = -1, r &= ~o;
    }
  }
  function Zd(n) {
    if (Dt & 6) throw Error(E(327));
    ko();
    var r = Za(n, 0);
    if (!(r & 1)) return ua(n, Yt()), null;
    var l = mf(n, r);
    if (n.tag !== 0 && l === 2) {
      var o = Cl(n);
      o !== 0 && (r = o, l = Ys(n, o));
    }
    if (l === 1) throw l = Hs, tl(n, 0), ui(n, r), ua(n, Yt()), l;
    if (l === 6) throw Error(E(345));
    return n.finishedWork = n.current.alternate, n.finishedLanes = r, zu(n, la, Ca), ua(n, Yt()), null;
  }
  function ep(n, r) {
    var l = Dt;
    Dt |= 1;
    try {
      return n(r);
    } finally {
      Dt = l, Dt === 0 && (_o = Yt() + 500, So && wi());
    }
  }
  function Uu(n) {
    el !== null && el.tag === 0 && !(Dt & 6) && ko();
    var r = Dt;
    Dt |= 1;
    var l = fr.transition, o = Ft;
    try {
      if (fr.transition = null, Ft = 1, n) return n();
    } finally {
      Ft = o, fr.transition = l, Dt = r, !(Dt & 6) && wi();
    }
  }
  function tp() {
    Ea = bo.current, un(bo);
  }
  function tl(n, r) {
    n.finishedWork = null, n.finishedLanes = 0;
    var l = n.timeoutHandle;
    if (l !== -1 && (n.timeoutHandle = -1, Td(l)), Pn !== null) for (l = Pn.return; l !== null; ) {
      var o = l;
      switch (zc(o), o.tag) {
        case 1:
          o = o.type.childContextTypes, o != null && go();
          break;
        case 3:
          Ru(), un(Gn), un(Rn), $e();
          break;
        case 5:
          Vc(o);
          break;
        case 4:
          Ru();
          break;
        case 13:
          un(En);
          break;
        case 19:
          un(En);
          break;
        case 10:
          kd(o.type._context);
          break;
        case 22:
        case 23:
          tp();
      }
      l = l.return;
    }
    if (qn = n, Pn = n = Bl(n.current, null), dr = Ea = r, Dn = 0, Hs = null, pf = xo = ki = 0, la = Bs = null, Eu !== null) {
      for (r = 0; r < Eu.length; r++) if (l = Eu[r], o = l.interleaved, o !== null) {
        l.interleaved = null;
        var c = o.next, d = l.pending;
        if (d !== null) {
          var y = d.next;
          d.next = c, o.next = y;
        }
        l.pending = o;
      }
      Eu = null;
    }
    return n;
  }
  function hh(n, r) {
    do {
      var l = Pn;
      try {
        if (Nd(), yt.current = Du, Hc) {
          for (var o = Pt.memoizedState; o !== null; ) {
            var c = o.queue;
            c !== null && (c.pending = null), o = o.next;
          }
          Hc = !1;
        }
        if (Zt = 0, tr = jn = Pt = null, Rs = !1, wu = 0, Ou.current = null, l === null || l.return === null) {
          Dn = 1, Hs = r, Pn = null;
          break;
        }
        e: {
          var d = n, y = l.return, w = l, _ = r;
          if (r = dr, w.flags |= 32768, _ !== null && typeof _ == "object" && typeof _.then == "function") {
            var I = _, ne = w, oe = ne.tag;
            if (!(ne.mode & 1) && (oe === 0 || oe === 11 || oe === 15)) {
              var te = ne.alternate;
              te ? (ne.updateQueue = te.updateQueue, ne.memoizedState = te.memoizedState, ne.lanes = te.lanes) : (ne.updateQueue = null, ne.memoizedState = null);
            }
            var xe = nh(y);
            if (xe !== null) {
              xe.flags &= -257, Fl(xe, y, w, d, r), xe.mode & 1 && Id(d, I, r), r = xe, _ = I;
              var Oe = r.updateQueue;
              if (Oe === null) {
                var Ue = /* @__PURE__ */ new Set();
                Ue.add(_), r.updateQueue = Ue;
              } else Oe.add(_);
              break e;
            } else {
              if (!(r & 1)) {
                Id(d, I, r), np();
                break e;
              }
              _ = Error(E(426));
            }
          } else if (vn && w.mode & 1) {
            var Nn = nh(y);
            if (Nn !== null) {
              !(Nn.flags & 65536) && (Nn.flags |= 256), Fl(Nn, y, w, d, r), qi(Nu(_, w));
              break e;
            }
          }
          d = _ = Nu(_, w), Dn !== 4 && (Dn = 2), Bs === null ? Bs = [d] : Bs.push(d), d = y;
          do {
            switch (d.tag) {
              case 3:
                d.flags |= 65536, r &= -r, d.lanes |= r;
                var M = th(d, _, r);
                qv(d, M);
                break e;
              case 1:
                w = _;
                var k = d.type, j = d.stateNode;
                if (!(d.flags & 128) && (typeof k.getDerivedStateFromError == "function" || j !== null && typeof j.componentDidCatch == "function" && (Pl === null || !Pl.has(j)))) {
                  d.flags |= 65536, r &= -r, d.lanes |= r;
                  var re = Bd(d, w, r);
                  qv(d, re);
                  break e;
                }
            }
            d = d.return;
          } while (d !== null);
        }
        Sh(l);
      } catch (Le) {
        r = Le, Pn === l && l !== null && (Pn = l = l.return);
        continue;
      }
      break;
    } while (!0);
  }
  function mh() {
    var n = Vl.current;
    return Vl.current = Du, n === null ? Du : n;
  }
  function np() {
    (Dn === 0 || Dn === 3 || Dn === 2) && (Dn = 4), qn === null || !(ki & 268435455) && !(xo & 268435455) || ui(qn, dr);
  }
  function mf(n, r) {
    var l = Dt;
    Dt |= 2;
    var o = mh();
    (qn !== n || dr !== r) && (Ca = null, tl(n, r));
    do
      try {
        Uy();
        break;
      } catch (c) {
        hh(n, c);
      }
    while (!0);
    if (Nd(), Dt = l, Vl.current = o, Pn !== null) throw Error(E(261));
    return qn = null, dr = 0, Dn;
  }
  function Uy() {
    for (; Pn !== null; ) gh(Pn);
  }
  function yh() {
    for (; Pn !== null && !Wn(); ) gh(Pn);
  }
  function gh(n) {
    var r = wh(n.alternate, n, Ea);
    n.memoizedProps = n.pendingProps, r === null ? Sh(n) : Pn = r, Ou.current = null;
  }
  function Sh(n) {
    var r = n;
    do {
      var l = r.alternate;
      if (n = r.return, r.flags & 32768) {
        if (l = cf(l, r), l !== null) {
          l.flags &= 32767, Pn = l;
          return;
        }
        if (n !== null) n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null;
        else {
          Dn = 6, Pn = null;
          return;
        }
      } else if (l = sh(l, r, Ea), l !== null) {
        Pn = l;
        return;
      }
      if (r = r.sibling, r !== null) {
        Pn = r;
        return;
      }
      Pn = r = n;
    } while (r !== null);
    Dn === 0 && (Dn = 5);
  }
  function zu(n, r, l) {
    var o = Ft, c = fr.transition;
    try {
      fr.transition = null, Ft = 1, zy(n, r, l, o);
    } finally {
      fr.transition = c, Ft = o;
    }
    return null;
  }
  function zy(n, r, l, o) {
    do
      ko();
    while (el !== null);
    if (Dt & 6) throw Error(E(327));
    l = n.finishedWork;
    var c = n.finishedLanes;
    if (l === null) return null;
    if (n.finishedWork = null, n.finishedLanes = 0, l === n.current) throw Error(E(177));
    n.callbackNode = null, n.callbackPriority = 0;
    var d = l.lanes | l.childLanes;
    if (rd(n, d), n === qn && (Pn = qn = null, dr = 0), !(l.subtreeFlags & 2064) && !(l.flags & 2064) || vf || (vf = !0, Th(iu, function() {
      return ko(), null;
    })), d = (l.flags & 15990) !== 0, l.subtreeFlags & 15990 || d) {
      d = fr.transition, fr.transition = null;
      var y = Ft;
      Ft = 1;
      var w = Dt;
      Dt |= 4, Ou.current = null, fh(n, l), Kd(l, n), co(hu), ka = !!ds, hu = ds = null, n.current = l, Oy(l), au(), Dt = w, Ft = y, fr.transition = d;
    } else n.current = l;
    if (vf && (vf = !1, el = n, Is = c), d = n.pendingLanes, d === 0 && (Pl = null), Jo(l.stateNode), ua(n, Yt()), r !== null) for (o = n.onRecoverableError, l = 0; l < r.length; l++) c = r[l], o(c.value, { componentStack: c.stack, digest: c.digest });
    if (Do) throw Do = !1, n = Lu, Lu = null, n;
    return Is & 1 && n.tag !== 0 && ko(), d = n.pendingLanes, d & 1 ? n === No ? Hl++ : (Hl = 0, No = n) : Hl = 0, wi(), null;
  }
  function ko() {
    if (el !== null) {
      var n = no(Is), r = fr.transition, l = Ft;
      try {
        if (fr.transition = null, Ft = 16 > n ? 16 : n, el === null) var o = !1;
        else {
          if (n = el, el = null, Is = 0, Dt & 6) throw Error(E(331));
          var c = Dt;
          for (Dt |= 4, ke = n.current; ke !== null; ) {
            var d = ke, y = d.child;
            if (ke.flags & 16) {
              var w = d.deletions;
              if (w !== null) {
                for (var _ = 0; _ < w.length; _++) {
                  var I = w[_];
                  for (ke = I; ke !== null; ) {
                    var ne = ke;
                    switch (ne.tag) {
                      case 0:
                      case 11:
                      case 15:
                        js(8, ne, d);
                    }
                    var oe = ne.child;
                    if (oe !== null) oe.return = ne, ke = oe;
                    else for (; ke !== null; ) {
                      ne = ke;
                      var te = ne.sibling, xe = ne.return;
                      if (df(ne), ne === I) {
                        ke = null;
                        break;
                      }
                      if (te !== null) {
                        te.return = xe, ke = te;
                        break;
                      }
                      ke = xe;
                    }
                  }
                }
                var Oe = d.alternate;
                if (Oe !== null) {
                  var Ue = Oe.child;
                  if (Ue !== null) {
                    Oe.child = null;
                    do {
                      var Nn = Ue.sibling;
                      Ue.sibling = null, Ue = Nn;
                    } while (Ue !== null);
                  }
                }
                ke = d;
              }
            }
            if (d.subtreeFlags & 2064 && y !== null) y.return = d, ke = y;
            else e: for (; ke !== null; ) {
              if (d = ke, d.flags & 2048) switch (d.tag) {
                case 0:
                case 11:
                case 15:
                  js(9, d, d.return);
              }
              var M = d.sibling;
              if (M !== null) {
                M.return = d.return, ke = M;
                break e;
              }
              ke = d.return;
            }
          }
          var k = n.current;
          for (ke = k; ke !== null; ) {
            y = ke;
            var j = y.child;
            if (y.subtreeFlags & 2064 && j !== null) j.return = y, ke = j;
            else e: for (y = k; ke !== null; ) {
              if (w = ke, w.flags & 2048) try {
                switch (w.tag) {
                  case 0:
                  case 11:
                  case 15:
                    Fs(9, w);
                }
              } catch (Le) {
                hn(w, w.return, Le);
              }
              if (w === y) {
                ke = null;
                break e;
              }
              var re = w.sibling;
              if (re !== null) {
                re.return = w.return, ke = re;
                break e;
              }
              ke = w.return;
            }
          }
          if (Dt = c, wi(), qr && typeof qr.onPostCommitFiberRoot == "function") try {
            qr.onPostCommitFiberRoot(Sl, n);
          } catch {
          }
          o = !0;
        }
        return o;
      } finally {
        Ft = l, fr.transition = r;
      }
    }
    return !1;
  }
  function Eh(n, r, l) {
    r = Nu(l, r), r = th(n, r, 1), n = zl(n, r, 1), r = Hn(), n !== null && (Hi(n, 1, r), ua(n, r));
  }
  function hn(n, r, l) {
    if (n.tag === 3) Eh(n, n, l);
    else for (; r !== null; ) {
      if (r.tag === 3) {
        Eh(r, n, l);
        break;
      } else if (r.tag === 1) {
        var o = r.stateNode;
        if (typeof r.type.getDerivedStateFromError == "function" || typeof o.componentDidCatch == "function" && (Pl === null || !Pl.has(o))) {
          n = Nu(l, n), n = Bd(r, n, 1), r = zl(r, n, 1), n = Hn(), r !== null && (Hi(r, 1, n), ua(r, n));
          break;
        }
      }
      r = r.return;
    }
  }
  function Ay(n, r, l) {
    var o = n.pingCache;
    o !== null && o.delete(r), r = Hn(), n.pingedLanes |= n.suspendedLanes & l, qn === n && (dr & l) === l && (Dn === 4 || Dn === 3 && (dr & 130023424) === dr && 500 > Yt() - Jd ? tl(n, 0) : pf |= l), ua(n, r);
  }
  function Ch(n, r) {
    r === 0 && (n.mode & 1 ? (r = ha, ha <<= 1, !(ha & 130023424) && (ha = 4194304)) : r = 1);
    var l = Hn();
    n = ga(n, r), n !== null && (Hi(n, r, l), ua(n, l));
  }
  function jy(n) {
    var r = n.memoizedState, l = 0;
    r !== null && (l = r.retryLane), Ch(n, l);
  }
  function Rh(n, r) {
    var l = 0;
    switch (n.tag) {
      case 13:
        var o = n.stateNode, c = n.memoizedState;
        c !== null && (l = c.retryLane);
        break;
      case 19:
        o = n.stateNode;
        break;
      default:
        throw Error(E(314));
    }
    o !== null && o.delete(r), Ch(n, l);
  }
  var wh;
  wh = function(n, r, l) {
    if (n !== null) if (n.memoizedProps !== r.pendingProps || Gn.current) Fn = !0;
    else {
      if (!(n.lanes & l) && !(r.flags & 128)) return Fn = !1, Us(n, r, l);
      Fn = !!(n.flags & 131072);
    }
    else Fn = !1, vn && r.flags & 1048576 && Wv(r, Ki, r.index);
    switch (r.lanes = 0, r.tag) {
      case 2:
        var o = r.type;
        ja(n, r), n = r.pendingProps;
        var c = Zr(r, Rn.current);
        Sn(r, l), c = Al(null, r, o, n, c, l);
        var d = ai();
        return r.flags |= 1, typeof c == "object" && c !== null && typeof c.render == "function" && c.$$typeof === void 0 ? (r.tag = 1, r.memoizedState = null, r.updateQueue = null, zn(o) ? (d = !0, er(r)) : d = !1, r.memoizedState = c.state !== null && c.state !== void 0 ? c.state : null, Ud(r), c.updater = af, r.stateNode = c, c._reactInternals = r, Ns(r, o, n, l), r = Ls(null, r, o, !0, d, l)) : (r.tag = 0, vn && d && Uc(r), cr(null, r, c, l), r = r.child), r;
      case 16:
        o = r.elementType;
        e: {
          switch (ja(n, r), n = r.pendingProps, c = o._init, o = c(o._payload), r.type = o, c = r.tag = Vy(o), n = ii(o, n), c) {
            case 0:
              r = rh(null, r, o, n, l);
              break e;
            case 1:
              r = ah(null, r, o, n, l);
              break e;
            case 11:
              r = aa(null, r, o, n, l);
              break e;
            case 14:
              r = ku(null, r, o, ii(o.type, n), l);
              break e;
          }
          throw Error(E(
            306,
            o,
            ""
          ));
        }
        return r;
      case 0:
        return o = r.type, c = r.pendingProps, c = r.elementType === o ? c : ii(o, c), rh(n, r, o, c, l);
      case 1:
        return o = r.type, c = r.pendingProps, c = r.elementType === o ? c : ii(o, c), ah(n, r, o, c, l);
      case 3:
        e: {
          if (wo(r), n === null) throw Error(E(387));
          o = r.pendingProps, d = r.memoizedState, c = d.element, Kv(n, r), ys(r, o, null, l);
          var y = r.memoizedState;
          if (o = y.element, d.isDehydrated) if (d = { element: o, isDehydrated: !1, cache: y.cache, pendingSuspenseBoundaries: y.pendingSuspenseBoundaries, transitions: y.transitions }, r.updateQueue.baseState = d, r.memoizedState = d, r.flags & 256) {
            c = Nu(Error(E(423)), r), r = ih(n, r, o, l, c);
            break e;
          } else if (o !== c) {
            c = Nu(Error(E(424)), r), r = ih(n, r, o, l, c);
            break e;
          } else for (ta = Ei(r.stateNode.containerInfo.firstChild), ea = r, vn = !0, za = null, l = Re(r, null, o, l), r.child = l; l; ) l.flags = l.flags & -3 | 4096, l = l.sibling;
          else {
            if (Ul(), o === c) {
              r = Fa(n, r, l);
              break e;
            }
            cr(n, r, o, l);
          }
          r = r.child;
        }
        return r;
      case 5:
        return Xv(r), n === null && _d(r), o = r.type, c = r.pendingProps, d = n !== null ? n.memoizedProps : null, y = c.children, Nc(o, c) ? y = null : d !== null && Nc(o, d) && (r.flags |= 32), $d(n, r), cr(n, r, y, l), r.child;
      case 6:
        return n === null && _d(r), null;
      case 13:
        return sf(n, r, l);
      case 4:
        return Ad(r, r.stateNode.containerInfo), o = r.pendingProps, n === null ? r.child = bn(r, null, o, l) : cr(n, r, o, l), r.child;
      case 11:
        return o = r.type, c = r.pendingProps, c = r.elementType === o ? c : ii(o, c), aa(n, r, o, c, l);
      case 7:
        return cr(n, r, r.pendingProps, l), r.child;
      case 8:
        return cr(n, r, r.pendingProps.children, l), r.child;
      case 12:
        return cr(n, r, r.pendingProps.children, l), r.child;
      case 10:
        e: {
          if (o = r.type._context, c = r.pendingProps, d = r.memoizedProps, y = c.value, Pe(ya, o._currentValue), o._currentValue = y, d !== null) if (ni(d.value, y)) {
            if (d.children === c.children && !Gn.current) {
              r = Fa(n, r, l);
              break e;
            }
          } else for (d = r.child, d !== null && (d.return = r); d !== null; ) {
            var w = d.dependencies;
            if (w !== null) {
              y = d.child;
              for (var _ = w.firstContext; _ !== null; ) {
                if (_.context === o) {
                  if (d.tag === 1) {
                    _ = Xi(-1, l & -l), _.tag = 2;
                    var I = d.updateQueue;
                    if (I !== null) {
                      I = I.shared;
                      var ne = I.pending;
                      ne === null ? _.next = _ : (_.next = ne.next, ne.next = _), I.pending = _;
                    }
                  }
                  d.lanes |= l, _ = d.alternate, _ !== null && (_.lanes |= l), Od(
                    d.return,
                    l,
                    r
                  ), w.lanes |= l;
                  break;
                }
                _ = _.next;
              }
            } else if (d.tag === 10) y = d.type === r.type ? null : d.child;
            else if (d.tag === 18) {
              if (y = d.return, y === null) throw Error(E(341));
              y.lanes |= l, w = y.alternate, w !== null && (w.lanes |= l), Od(y, l, r), y = d.sibling;
            } else y = d.child;
            if (y !== null) y.return = d;
            else for (y = d; y !== null; ) {
              if (y === r) {
                y = null;
                break;
              }
              if (d = y.sibling, d !== null) {
                d.return = y.return, y = d;
                break;
              }
              y = y.return;
            }
            d = y;
          }
          cr(n, r, c.children, l), r = r.child;
        }
        return r;
      case 9:
        return c = r.type, o = r.pendingProps.children, Sn(r, l), c = Aa(c), o = o(c), r.flags |= 1, cr(n, r, o, l), r.child;
      case 14:
        return o = r.type, c = ii(o, r.pendingProps), c = ii(o.type, c), ku(n, r, o, c, l);
      case 15:
        return ot(n, r, r.type, r.pendingProps, l);
      case 17:
        return o = r.type, c = r.pendingProps, c = r.elementType === o ? c : ii(o, c), ja(n, r), r.tag = 1, zn(o) ? (n = !0, er(r)) : n = !1, Sn(r, l), lf(r, o, c), Ns(r, o, c, l), Ls(null, r, o, !0, n, l);
      case 19:
        return _i(n, r, l);
      case 22:
        return Os(n, r, l);
    }
    throw Error(E(156, r.tag));
  };
  function Th(n, r) {
    return Xa(n, r);
  }
  function Fy(n, r, l, o) {
    this.tag = n, this.key = l, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = r, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = o, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Pa(n, r, l, o) {
    return new Fy(n, r, l, o);
  }
  function rp(n) {
    return n = n.prototype, !(!n || !n.isReactComponent);
  }
  function Vy(n) {
    if (typeof n == "function") return rp(n) ? 1 : 0;
    if (n != null) {
      if (n = n.$$typeof, n === bt) return 11;
      if (n === Ut) return 14;
    }
    return 2;
  }
  function Bl(n, r) {
    var l = n.alternate;
    return l === null ? (l = Pa(n.tag, r, n.key, n.mode), l.elementType = n.elementType, l.type = n.type, l.stateNode = n.stateNode, l.alternate = n, n.alternate = l) : (l.pendingProps = r, l.type = n.type, l.flags = 0, l.subtreeFlags = 0, l.deletions = null), l.flags = n.flags & 14680064, l.childLanes = n.childLanes, l.lanes = n.lanes, l.child = n.child, l.memoizedProps = n.memoizedProps, l.memoizedState = n.memoizedState, l.updateQueue = n.updateQueue, r = n.dependencies, l.dependencies = r === null ? null : { lanes: r.lanes, firstContext: r.firstContext }, l.sibling = n.sibling, l.index = n.index, l.ref = n.ref, l;
  }
  function Ws(n, r, l, o, c, d) {
    var y = 2;
    if (o = n, typeof n == "function") rp(n) && (y = 1);
    else if (typeof n == "string") y = 5;
    else e: switch (n) {
      case Ne:
        return nl(l.children, c, d, r);
      case St:
        y = 8, c |= 8;
        break;
      case Et:
        return n = Pa(12, l, r, c | 2), n.elementType = Et, n.lanes = d, n;
      case je:
        return n = Pa(13, l, r, c), n.elementType = je, n.lanes = d, n;
      case At:
        return n = Pa(19, l, r, c), n.elementType = At, n.lanes = d, n;
      case ze:
        return Il(l, c, d, r);
      default:
        if (typeof n == "object" && n !== null) switch (n.$$typeof) {
          case wt:
            y = 10;
            break e;
          case Ot:
            y = 9;
            break e;
          case bt:
            y = 11;
            break e;
          case Ut:
            y = 14;
            break e;
          case jt:
            y = 16, o = null;
            break e;
        }
        throw Error(E(130, n == null ? n : typeof n, ""));
    }
    return r = Pa(y, l, r, c), r.elementType = n, r.type = o, r.lanes = d, r;
  }
  function nl(n, r, l, o) {
    return n = Pa(7, n, o, r), n.lanes = l, n;
  }
  function Il(n, r, l, o) {
    return n = Pa(22, n, o, r), n.elementType = ze, n.lanes = l, n.stateNode = { isHidden: !1 }, n;
  }
  function ap(n, r, l) {
    return n = Pa(6, n, null, r), n.lanes = l, n;
  }
  function yf(n, r, l) {
    return r = Pa(4, n.children !== null ? n.children : [], n.key, r), r.lanes = l, r.stateNode = { containerInfo: n.containerInfo, pendingChildren: null, implementation: n.implementation }, r;
  }
  function bh(n, r, l, o, c) {
    this.tag = r, this.containerInfo = n, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = to(0), this.expirationTimes = to(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = to(0), this.identifierPrefix = o, this.onRecoverableError = c, this.mutableSourceEagerHydrationData = null;
  }
  function gf(n, r, l, o, c, d, y, w, _) {
    return n = new bh(n, r, l, w, _), r === 1 ? (r = 1, d === !0 && (r |= 8)) : r = 0, d = Pa(3, null, null, r), n.current = d, d.stateNode = n, d.memoizedState = { element: o, isDehydrated: l, cache: null, transitions: null, pendingSuspenseBoundaries: null }, Ud(d), n;
  }
  function Py(n, r, l) {
    var o = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return { $$typeof: Ce, key: o == null ? null : "" + o, children: n, containerInfo: r, implementation: l };
  }
  function ip(n) {
    if (!n) return xr;
    n = n._reactInternals;
    e: {
      if (rt(n) !== n || n.tag !== 1) throw Error(E(170));
      var r = n;
      do {
        switch (r.tag) {
          case 3:
            r = r.stateNode.context;
            break e;
          case 1:
            if (zn(r.type)) {
              r = r.stateNode.__reactInternalMemoizedMergedChildContext;
              break e;
            }
        }
        r = r.return;
      } while (r !== null);
      throw Error(E(171));
    }
    if (n.tag === 1) {
      var l = n.type;
      if (zn(l)) return hs(n, l, r);
    }
    return r;
  }
  function xh(n, r, l, o, c, d, y, w, _) {
    return n = gf(l, o, !0, n, c, d, y, w, _), n.context = ip(null), l = n.current, o = Hn(), c = Oi(l), d = Xi(o, c), d.callback = r ?? null, zl(l, d, c), n.current.lanes = c, Hi(n, c, o), ua(n, o), n;
  }
  function Sf(n, r, l, o) {
    var c = r.current, d = Hn(), y = Oi(c);
    return l = ip(l), r.context === null ? r.context = l : r.pendingContext = l, r = Xi(d, y), r.payload = { element: n }, o = o === void 0 ? null : o, o !== null && (r.callback = o), n = zl(c, r, y), n !== null && (Fr(n, c, y, d), Fc(n, c, y)), y;
  }
  function Ef(n) {
    if (n = n.current, !n.child) return null;
    switch (n.child.tag) {
      case 5:
        return n.child.stateNode;
      default:
        return n.child.stateNode;
    }
  }
  function lp(n, r) {
    if (n = n.memoizedState, n !== null && n.dehydrated !== null) {
      var l = n.retryLane;
      n.retryLane = l !== 0 && l < r ? l : r;
    }
  }
  function Cf(n, r) {
    lp(n, r), (n = n.alternate) && lp(n, r);
  }
  function _h() {
    return null;
  }
  var Au = typeof reportError == "function" ? reportError : function(n) {
    console.error(n);
  };
  function up(n) {
    this._internalRoot = n;
  }
  Rf.prototype.render = up.prototype.render = function(n) {
    var r = this._internalRoot;
    if (r === null) throw Error(E(409));
    Sf(n, r, null, null);
  }, Rf.prototype.unmount = up.prototype.unmount = function() {
    var n = this._internalRoot;
    if (n !== null) {
      this._internalRoot = null;
      var r = n.containerInfo;
      Uu(function() {
        Sf(null, n, null, null);
      }), r[Qi] = null;
    }
  };
  function Rf(n) {
    this._internalRoot = n;
  }
  Rf.prototype.unstable_scheduleHydration = function(n) {
    if (n) {
      var r = it();
      n = { blockedOn: null, target: n, priority: r };
      for (var l = 0; l < Qn.length && r !== 0 && r < Qn[l].priority; l++) ;
      Qn.splice(l, 0, n), l === 0 && ts(n);
    }
  };
  function op(n) {
    return !(!n || n.nodeType !== 1 && n.nodeType !== 9 && n.nodeType !== 11);
  }
  function wf(n) {
    return !(!n || n.nodeType !== 1 && n.nodeType !== 9 && n.nodeType !== 11 && (n.nodeType !== 8 || n.nodeValue !== " react-mount-point-unstable "));
  }
  function Dh() {
  }
  function Hy(n, r, l, o, c) {
    if (c) {
      if (typeof o == "function") {
        var d = o;
        o = function() {
          var I = Ef(y);
          d.call(I);
        };
      }
      var y = xh(r, o, n, 0, null, !1, !1, "", Dh);
      return n._reactRootContainer = y, n[Qi] = y.current, po(n.nodeType === 8 ? n.parentNode : n), Uu(), y;
    }
    for (; c = n.lastChild; ) n.removeChild(c);
    if (typeof o == "function") {
      var w = o;
      o = function() {
        var I = Ef(_);
        w.call(I);
      };
    }
    var _ = gf(n, 0, !1, null, null, !1, !1, "", Dh);
    return n._reactRootContainer = _, n[Qi] = _.current, po(n.nodeType === 8 ? n.parentNode : n), Uu(function() {
      Sf(r, _, l, o);
    }), _;
  }
  function Qs(n, r, l, o, c) {
    var d = l._reactRootContainer;
    if (d) {
      var y = d;
      if (typeof c == "function") {
        var w = c;
        c = function() {
          var _ = Ef(y);
          w.call(_);
        };
      }
      Sf(r, y, n, c);
    } else y = Hy(l, r, n, c, o);
    return Ef(y);
  }
  Lt = function(n) {
    switch (n.tag) {
      case 3:
        var r = n.stateNode;
        if (r.current.memoizedState.isDehydrated) {
          var l = Ja(r.pendingLanes);
          l !== 0 && (Bi(r, l | 1), ua(r, Yt()), !(Dt & 6) && (_o = Yt() + 500, wi()));
        }
        break;
      case 13:
        Uu(function() {
          var o = ga(n, 1);
          if (o !== null) {
            var c = Hn();
            Fr(o, n, 1, c);
          }
        }), Cf(n, 1);
    }
  }, Zo = function(n) {
    if (n.tag === 13) {
      var r = ga(n, 134217728);
      if (r !== null) {
        var l = Hn();
        Fr(r, n, 134217728, l);
      }
      Cf(n, 134217728);
    }
  }, hi = function(n) {
    if (n.tag === 13) {
      var r = Oi(n), l = ga(n, r);
      if (l !== null) {
        var o = Hn();
        Fr(l, n, r, o);
      }
      Cf(n, r);
    }
  }, it = function() {
    return Ft;
  }, ro = function(n, r) {
    var l = Ft;
    try {
      return Ft = n, r();
    } finally {
      Ft = l;
    }
  }, pn = function(n, r, l) {
    switch (r) {
      case "input":
        if (Gr(n, l), r = l.name, l.type === "radio" && r != null) {
          for (l = n; l.parentNode; ) l = l.parentNode;
          for (l = l.querySelectorAll("input[name=" + JSON.stringify("" + r) + '][type="radio"]'), r = 0; r < l.length; r++) {
            var o = l[r];
            if (o !== n && o.form === n.form) {
              var c = gn(o);
              if (!c) throw Error(E(90));
              kr(o), Gr(o, c);
            }
          }
        }
        break;
      case "textarea":
        Ga(n, l);
        break;
      case "select":
        r = l.value, r != null && Tn(n, !!l.multiple, r, !1);
    }
  }, hl = ep, ru = Uu;
  var By = { usingClientEntryPoint: !1, Events: [Ie, ri, gn, pi, qu, ep] }, Gs = { findFiberByHostInstance: mu, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, Nh = { bundleType: Gs.bundleType, version: Gs.version, rendererPackageName: Gs.rendererPackageName, rendererConfig: Gs.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: he.ReactCurrentDispatcher, findHostInstanceByFiber: function(n) {
    return n = an(n), n === null ? null : n.stateNode;
  }, findFiberByHostInstance: Gs.findFiberByHostInstance || _h, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var $l = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!$l.isDisabled && $l.supportsFiber) try {
      Sl = $l.inject(Nh), qr = $l;
    } catch {
    }
  }
  return Wa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = By, Wa.createPortal = function(n, r) {
    var l = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!op(r)) throw Error(E(200));
    return Py(n, r, null, l);
  }, Wa.createRoot = function(n, r) {
    if (!op(n)) throw Error(E(299));
    var l = !1, o = "", c = Au;
    return r != null && (r.unstable_strictMode === !0 && (l = !0), r.identifierPrefix !== void 0 && (o = r.identifierPrefix), r.onRecoverableError !== void 0 && (c = r.onRecoverableError)), r = gf(n, 1, !1, null, null, l, !1, o, c), n[Qi] = r.current, po(n.nodeType === 8 ? n.parentNode : n), new up(r);
  }, Wa.findDOMNode = function(n) {
    if (n == null) return null;
    if (n.nodeType === 1) return n;
    var r = n._reactInternals;
    if (r === void 0)
      throw typeof n.render == "function" ? Error(E(188)) : (n = Object.keys(n).join(","), Error(E(268, n)));
    return n = an(r), n = n === null ? null : n.stateNode, n;
  }, Wa.flushSync = function(n) {
    return Uu(n);
  }, Wa.hydrate = function(n, r, l) {
    if (!wf(r)) throw Error(E(200));
    return Qs(null, n, r, !0, l);
  }, Wa.hydrateRoot = function(n, r, l) {
    if (!op(n)) throw Error(E(405));
    var o = l != null && l.hydratedSources || null, c = !1, d = "", y = Au;
    if (l != null && (l.unstable_strictMode === !0 && (c = !0), l.identifierPrefix !== void 0 && (d = l.identifierPrefix), l.onRecoverableError !== void 0 && (y = l.onRecoverableError)), r = xh(r, null, n, 1, l ?? null, c, !1, d, y), n[Qi] = r.current, po(n), o) for (n = 0; n < o.length; n++) l = o[n], c = l._getVersion, c = c(l._source), r.mutableSourceEagerHydrationData == null ? r.mutableSourceEagerHydrationData = [l, c] : r.mutableSourceEagerHydrationData.push(
      l,
      c
    );
    return new Rf(r);
  }, Wa.render = function(n, r, l) {
    if (!wf(r)) throw Error(E(200));
    return Qs(null, n, r, !1, l);
  }, Wa.unmountComponentAtNode = function(n) {
    if (!wf(n)) throw Error(E(40));
    return n._reactRootContainer ? (Uu(function() {
      Qs(null, null, n, !1, function() {
        n._reactRootContainer = null, n[Qi] = null;
      });
    }), !0) : !1;
  }, Wa.unstable_batchedUpdates = ep, Wa.unstable_renderSubtreeIntoContainer = function(n, r, l, o) {
    if (!wf(l)) throw Error(E(200));
    if (n == null || n._reactInternals === void 0) throw Error(E(38));
    return Qs(n, r, l, !1, o);
  }, Wa.version = "18.3.1-next-f1338f8080-20240426", Wa;
}
var Qa = {};
/**
 * @license React
 * react-dom.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Vw;
function uN() {
  return Vw || (Vw = 1, process.env.NODE_ENV !== "production" && function() {
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
    var m = J, C = Xw(), E = m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, x = !1;
    function N(e) {
      x = e;
    }
    function A(e) {
      if (!x) {
        for (var t = arguments.length, a = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++)
          a[i - 1] = arguments[i];
        q("warn", e, a);
      }
    }
    function g(e) {
      if (!x) {
        for (var t = arguments.length, a = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++)
          a[i - 1] = arguments[i];
        q("error", e, a);
      }
    }
    function q(e, t, a) {
      {
        var i = E.ReactDebugCurrentFrame, u = i.getStackAddendum();
        u !== "" && (t += "%s", a = a.concat([u]));
        var s = a.map(function(f) {
          return String(f);
        });
        s.unshift("Warning: " + t), Function.prototype.apply.call(console[e], console, s);
      }
    }
    var P = 0, F = 1, ie = 2, V = 3, X = 4, le = 5, ve = 6, be = 7, fe = 8, He = 9, ue = 10, ae = 11, he = 12, ge = 13, Ce = 14, Ne = 15, St = 16, Et = 17, wt = 18, Ot = 19, bt = 21, je = 22, At = 23, Ut = 24, jt = 25, ze = !0, de = !1, Fe = !1, Se = !1, L = !1, G = !0, et = !0, Je = !0, vt = !0, ct = /* @__PURE__ */ new Set(), st = {}, ft = {};
    function ht(e, t) {
      Gt(e, t), Gt(e + "Capture", t);
    }
    function Gt(e, t) {
      st[e] && g("EventRegistry: More than one plugin attempted to publish the same registration name, `%s`.", e), st[e] = t;
      {
        var a = e.toLowerCase();
        ft[a] = e, e === "onDoubleClick" && (ft.ondblclick = e);
      }
      for (var i = 0; i < t.length; i++)
        ct.add(t[i]);
    }
    var On = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", kr = Object.prototype.hasOwnProperty;
    function wn(e) {
      {
        var t = typeof Symbol == "function" && Symbol.toStringTag, a = t && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return a;
      }
    }
    function ir(e) {
      try {
        return In(e), !1;
      } catch {
        return !0;
      }
    }
    function In(e) {
      return "" + e;
    }
    function $n(e, t) {
      if (ir(e))
        return g("The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before before using it here.", t, wn(e)), In(e);
    }
    function Gr(e) {
      if (ir(e))
        return g("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", wn(e)), In(e);
    }
    function fi(e, t) {
      if (ir(e))
        return g("The provided `%s` prop is an unsupported type %s. This value must be coerced to a string before before using it here.", t, wn(e)), In(e);
    }
    function pa(e, t) {
      if (ir(e))
        return g("The provided `%s` CSS property is an unsupported type %s. This value must be coerced to a string before before using it here.", t, wn(e)), In(e);
    }
    function Jn(e) {
      if (ir(e))
        return g("The provided HTML markup uses a value of unsupported type %s. This value must be coerced to a string before before using it here.", wn(e)), In(e);
    }
    function Tn(e) {
      if (ir(e))
        return g("Form field values (value, checked, defaultValue, or defaultChecked props) must be strings, not %s. This value must be coerced to a string before before using it here.", wn(e)), In(e);
    }
    var Yn = 0, Cr = 1, Ga = 2, Ln = 3, Rr = 4, wr = 5, Ka = 6, di = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD", pe = di + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040", Ae = new RegExp("^[" + di + "][" + pe + "]*$"), dt = {}, $t = {};
    function rn(e) {
      return kr.call($t, e) ? !0 : kr.call(dt, e) ? !1 : Ae.test(e) ? ($t[e] = !0, !0) : (dt[e] = !0, g("Invalid attribute name: `%s`", e), !1);
    }
    function mn(e, t, a) {
      return t !== null ? t.type === Yn : a ? !1 : e.length > 2 && (e[0] === "o" || e[0] === "O") && (e[1] === "n" || e[1] === "N");
    }
    function on(e, t, a, i) {
      if (a !== null && a.type === Yn)
        return !1;
      switch (typeof t) {
        case "function":
        case "symbol":
          return !0;
        case "boolean": {
          if (i)
            return !1;
          if (a !== null)
            return !a.acceptsBooleans;
          var u = e.toLowerCase().slice(0, 5);
          return u !== "data-" && u !== "aria-";
        }
        default:
          return !1;
      }
    }
    function Zn(e, t, a, i) {
      if (t === null || typeof t > "u" || on(e, t, a, i))
        return !0;
      if (i)
        return !1;
      if (a !== null)
        switch (a.type) {
          case Ln:
            return !t;
          case Rr:
            return t === !1;
          case wr:
            return isNaN(t);
          case Ka:
            return isNaN(t) || t < 1;
        }
      return !1;
    }
    function dn(e) {
      return pn.hasOwnProperty(e) ? pn[e] : null;
    }
    function Kt(e, t, a, i, u, s, f) {
      this.acceptsBooleans = t === Ga || t === Ln || t === Rr, this.attributeName = i, this.attributeNamespace = u, this.mustUseProperty = a, this.propertyName = e, this.type = t, this.sanitizeURL = s, this.removeEmptyString = f;
    }
    var pn = {}, Tr = [
      "children",
      "dangerouslySetInnerHTML",
      // TODO: This prevents the assignment of defaultValue to regular
      // elements (not just inputs). Now that ReactDOMInput assigns to the
      // defaultValue property -- do we need this?
      "defaultValue",
      "defaultChecked",
      "innerHTML",
      "suppressContentEditableWarning",
      "suppressHydrationWarning",
      "style"
    ];
    Tr.forEach(function(e) {
      pn[e] = new Kt(
        e,
        Yn,
        !1,
        // mustUseProperty
        e,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(e) {
      var t = e[0], a = e[1];
      pn[t] = new Kt(
        t,
        Cr,
        !1,
        // mustUseProperty
        a,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
      pn[e] = new Kt(
        e,
        Ga,
        !1,
        // mustUseProperty
        e.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(e) {
      pn[e] = new Kt(
        e,
        Ga,
        !1,
        // mustUseProperty
        e,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "allowFullScreen",
      "async",
      // Note: there is a special case that prevents it from being written to the DOM
      // on the client side because the browsers are inconsistent. Instead we call focus().
      "autoFocus",
      "autoPlay",
      "controls",
      "default",
      "defer",
      "disabled",
      "disablePictureInPicture",
      "disableRemotePlayback",
      "formNoValidate",
      "hidden",
      "loop",
      "noModule",
      "noValidate",
      "open",
      "playsInline",
      "readOnly",
      "required",
      "reversed",
      "scoped",
      "seamless",
      // Microdata
      "itemScope"
    ].forEach(function(e) {
      pn[e] = new Kt(
        e,
        Ln,
        !1,
        // mustUseProperty
        e.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "checked",
      // Note: `option.selected` is not updated if `select.multiple` is
      // disabled with `removeAttribute`. We have special logic for handling this.
      "multiple",
      "muted",
      "selected"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      pn[e] = new Kt(
        e,
        Ln,
        !0,
        // mustUseProperty
        e,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "capture",
      "download"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      pn[e] = new Kt(
        e,
        Rr,
        !1,
        // mustUseProperty
        e,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "cols",
      "rows",
      "size",
      "span"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      pn[e] = new Kt(
        e,
        Ka,
        !1,
        // mustUseProperty
        e,
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), ["rowSpan", "start"].forEach(function(e) {
      pn[e] = new Kt(
        e,
        wr,
        !1,
        // mustUseProperty
        e.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    });
    var br = /[\-\:]([a-z])/g, va = function(e) {
      return e[1].toUpperCase();
    };
    [
      "accent-height",
      "alignment-baseline",
      "arabic-form",
      "baseline-shift",
      "cap-height",
      "clip-path",
      "clip-rule",
      "color-interpolation",
      "color-interpolation-filters",
      "color-profile",
      "color-rendering",
      "dominant-baseline",
      "enable-background",
      "fill-opacity",
      "fill-rule",
      "flood-color",
      "flood-opacity",
      "font-family",
      "font-size",
      "font-size-adjust",
      "font-stretch",
      "font-style",
      "font-variant",
      "font-weight",
      "glyph-name",
      "glyph-orientation-horizontal",
      "glyph-orientation-vertical",
      "horiz-adv-x",
      "horiz-origin-x",
      "image-rendering",
      "letter-spacing",
      "lighting-color",
      "marker-end",
      "marker-mid",
      "marker-start",
      "overline-position",
      "overline-thickness",
      "paint-order",
      "panose-1",
      "pointer-events",
      "rendering-intent",
      "shape-rendering",
      "stop-color",
      "stop-opacity",
      "strikethrough-position",
      "strikethrough-thickness",
      "stroke-dasharray",
      "stroke-dashoffset",
      "stroke-linecap",
      "stroke-linejoin",
      "stroke-miterlimit",
      "stroke-opacity",
      "stroke-width",
      "text-anchor",
      "text-decoration",
      "text-rendering",
      "underline-position",
      "underline-thickness",
      "unicode-bidi",
      "unicode-range",
      "units-per-em",
      "v-alphabetic",
      "v-hanging",
      "v-ideographic",
      "v-mathematical",
      "vector-effect",
      "vert-adv-y",
      "vert-origin-x",
      "vert-origin-y",
      "word-spacing",
      "writing-mode",
      "xmlns:xlink",
      "x-height"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      var t = e.replace(br, va);
      pn[t] = new Kt(
        t,
        Cr,
        !1,
        // mustUseProperty
        e,
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "xlink:actuate",
      "xlink:arcrole",
      "xlink:role",
      "xlink:show",
      "xlink:title",
      "xlink:type"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      var t = e.replace(br, va);
      pn[t] = new Kt(
        t,
        Cr,
        !1,
        // mustUseProperty
        e,
        "http://www.w3.org/1999/xlink",
        !1,
        // sanitizeURL
        !1
      );
    }), [
      "xml:base",
      "xml:lang",
      "xml:space"
      // NOTE: if you add a camelCased prop to this list,
      // you'll need to set attributeName to name.toLowerCase()
      // instead in the assignment below.
    ].forEach(function(e) {
      var t = e.replace(br, va);
      pn[t] = new Kt(
        t,
        Cr,
        !1,
        // mustUseProperty
        e,
        "http://www.w3.org/XML/1998/namespace",
        !1,
        // sanitizeURL
        !1
      );
    }), ["tabIndex", "crossOrigin"].forEach(function(e) {
      pn[e] = new Kt(
        e,
        Cr,
        !1,
        // mustUseProperty
        e.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !1,
        // sanitizeURL
        !1
      );
    });
    var pi = "xlinkHref";
    pn[pi] = new Kt(
      "xlinkHref",
      Cr,
      !1,
      // mustUseProperty
      "xlink:href",
      "http://www.w3.org/1999/xlink",
      !0,
      // sanitizeURL
      !1
    ), ["src", "href", "action", "formAction"].forEach(function(e) {
      pn[e] = new Kt(
        e,
        Cr,
        !1,
        // mustUseProperty
        e.toLowerCase(),
        // attributeName
        null,
        // attributeNamespace
        !0,
        // sanitizeURL
        !0
      );
    });
    var qu = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*\:/i, hl = !1;
    function ru(e) {
      !hl && qu.test(e) && (hl = !0, g("A future version of React will block javascript: URLs as a security precaution. Use event handlers instead if you can. If you need to generate unsafe HTML try using dangerouslySetInnerHTML instead. React was passed %s.", JSON.stringify(e)));
    }
    function ml(e, t, a, i) {
      if (i.mustUseProperty) {
        var u = i.propertyName;
        return e[u];
      } else {
        $n(a, t), i.sanitizeURL && ru("" + a);
        var s = i.attributeName, f = null;
        if (i.type === Rr) {
          if (e.hasAttribute(s)) {
            var p = e.getAttribute(s);
            return p === "" ? !0 : Zn(t, a, i, !1) ? p : p === "" + a ? a : p;
          }
        } else if (e.hasAttribute(s)) {
          if (Zn(t, a, i, !1))
            return e.getAttribute(s);
          if (i.type === Ln)
            return a;
          f = e.getAttribute(s);
        }
        return Zn(t, a, i, !1) ? f === null ? a : f : f === "" + a ? a : f;
      }
    }
    function yl(e, t, a, i) {
      {
        if (!rn(t))
          return;
        if (!e.hasAttribute(t))
          return a === void 0 ? void 0 : null;
        var u = e.getAttribute(t);
        return $n(a, t), u === "" + a ? a : u;
      }
    }
    function Or(e, t, a, i) {
      var u = dn(t);
      if (!mn(t, u, i)) {
        if (Zn(t, a, u, i) && (a = null), i || u === null) {
          if (rn(t)) {
            var s = t;
            a === null ? e.removeAttribute(s) : ($n(a, t), e.setAttribute(s, "" + a));
          }
          return;
        }
        var f = u.mustUseProperty;
        if (f) {
          var p = u.propertyName;
          if (a === null) {
            var v = u.type;
            e[p] = v === Ln ? !1 : "";
          } else
            e[p] = a;
          return;
        }
        var S = u.attributeName, R = u.attributeNamespace;
        if (a === null)
          e.removeAttribute(S);
        else {
          var O = u.type, D;
          O === Ln || O === Rr && a === !0 ? D = "" : ($n(a, S), D = "" + a, u.sanitizeURL && ru(D.toString())), R ? e.setAttributeNS(R, S, D) : e.setAttribute(S, D);
        }
      }
    }
    var Kr = Symbol.for("react.element"), lr = Symbol.for("react.portal"), vi = Symbol.for("react.fragment"), qa = Symbol.for("react.strict_mode"), b = Symbol.for("react.profiler"), ee = Symbol.for("react.provider"), me = Symbol.for("react.context"), Be = Symbol.for("react.forward_ref"), Rt = Symbol.for("react.suspense"), nt = Symbol.for("react.suspense_list"), rt = Symbol.for("react.memo"), Ye = Symbol.for("react.lazy"), Mn = Symbol.for("react.scope"), sn = Symbol.for("react.debug_trace_mode"), an = Symbol.for("react.offscreen"), ur = Symbol.for("react.legacy_hidden"), Xa = Symbol.for("react.cache"), _a = Symbol.for("react.tracing_marker"), Wn = Symbol.iterator, au = "@@iterator";
    function Yt(e) {
      if (e === null || typeof e != "object")
        return null;
      var t = Wn && e[Wn] || e[au];
      return typeof t == "function" ? t : null;
    }
    var mt = Object.assign, Pi = 0, Xo, iu, gl, Xu, Sl, qr, Jo;
    function Lr() {
    }
    Lr.__reactDisabledLog = !0;
    function vc() {
      {
        if (Pi === 0) {
          Xo = console.log, iu = console.info, gl = console.warn, Xu = console.error, Sl = console.group, qr = console.groupCollapsed, Jo = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: Lr,
            writable: !0
          };
          Object.defineProperties(console, {
            info: e,
            log: e,
            warn: e,
            error: e,
            group: e,
            groupCollapsed: e,
            groupEnd: e
          });
        }
        Pi++;
      }
    }
    function hc() {
      {
        if (Pi--, Pi === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: mt({}, e, {
              value: Xo
            }),
            info: mt({}, e, {
              value: iu
            }),
            warn: mt({}, e, {
              value: gl
            }),
            error: mt({}, e, {
              value: Xu
            }),
            group: mt({}, e, {
              value: Sl
            }),
            groupCollapsed: mt({}, e, {
              value: qr
            }),
            groupEnd: mt({}, e, {
              value: Jo
            })
          });
        }
        Pi < 0 && g("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var Ju = E.ReactCurrentDispatcher, El;
    function ha(e, t, a) {
      {
        if (El === void 0)
          try {
            throw Error();
          } catch (u) {
            var i = u.stack.trim().match(/\n( *(at )?)/);
            El = i && i[1] || "";
          }
        return `
` + El + e;
      }
    }
    var Ja = !1, Za;
    {
      var Zu = typeof WeakMap == "function" ? WeakMap : Map;
      Za = new Zu();
    }
    function lu(e, t) {
      if (!e || Ja)
        return "";
      {
        var a = Za.get(e);
        if (a !== void 0)
          return a;
      }
      var i;
      Ja = !0;
      var u = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var s;
      s = Ju.current, Ju.current = null, vc();
      try {
        if (t) {
          var f = function() {
            throw Error();
          };
          if (Object.defineProperty(f.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(f, []);
            } catch ($) {
              i = $;
            }
            Reflect.construct(e, [], f);
          } else {
            try {
              f.call();
            } catch ($) {
              i = $;
            }
            e.call(f.prototype);
          }
        } else {
          try {
            throw Error();
          } catch ($) {
            i = $;
          }
          e();
        }
      } catch ($) {
        if ($ && i && typeof $.stack == "string") {
          for (var p = $.stack.split(`
`), v = i.stack.split(`
`), S = p.length - 1, R = v.length - 1; S >= 1 && R >= 0 && p[S] !== v[R]; )
            R--;
          for (; S >= 1 && R >= 0; S--, R--)
            if (p[S] !== v[R]) {
              if (S !== 1 || R !== 1)
                do
                  if (S--, R--, R < 0 || p[S] !== v[R]) {
                    var O = `
` + p[S].replace(" at new ", " at ");
                    return e.displayName && O.includes("<anonymous>") && (O = O.replace("<anonymous>", e.displayName)), typeof e == "function" && Za.set(e, O), O;
                  }
                while (S >= 1 && R >= 0);
              break;
            }
        }
      } finally {
        Ja = !1, Ju.current = s, hc(), Error.prepareStackTrace = u;
      }
      var D = e ? e.displayName || e.name : "", H = D ? ha(D) : "";
      return typeof e == "function" && Za.set(e, H), H;
    }
    function Cl(e, t, a) {
      return lu(e, !0);
    }
    function eo(e, t, a) {
      return lu(e, !1);
    }
    function to(e) {
      var t = e.prototype;
      return !!(t && t.isReactComponent);
    }
    function Hi(e, t, a) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return lu(e, to(e));
      if (typeof e == "string")
        return ha(e);
      switch (e) {
        case Rt:
          return ha("Suspense");
        case nt:
          return ha("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case Be:
            return eo(e.render);
          case rt:
            return Hi(e.type, t, a);
          case Ye: {
            var i = e, u = i._payload, s = i._init;
            try {
              return Hi(s(u), t, a);
            } catch {
            }
          }
        }
      return "";
    }
    function rd(e) {
      switch (e._debugOwner && e._debugOwner.type, e._debugSource, e.tag) {
        case le:
          return ha(e.type);
        case St:
          return ha("Lazy");
        case ge:
          return ha("Suspense");
        case Ot:
          return ha("SuspenseList");
        case P:
        case ie:
        case Ne:
          return eo(e.type);
        case ae:
          return eo(e.type.render);
        case F:
          return Cl(e.type);
        default:
          return "";
      }
    }
    function Bi(e) {
      try {
        var t = "", a = e;
        do
          t += rd(a), a = a.return;
        while (a);
        return t;
      } catch (i) {
        return `
Error generating stack: ` + i.message + `
` + i.stack;
      }
    }
    function Ft(e, t, a) {
      var i = e.displayName;
      if (i)
        return i;
      var u = t.displayName || t.name || "";
      return u !== "" ? a + "(" + u + ")" : a;
    }
    function no(e) {
      return e.displayName || "Context";
    }
    function Lt(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && g("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case vi:
          return "Fragment";
        case lr:
          return "Portal";
        case b:
          return "Profiler";
        case qa:
          return "StrictMode";
        case Rt:
          return "Suspense";
        case nt:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case me:
            var t = e;
            return no(t) + ".Consumer";
          case ee:
            var a = e;
            return no(a._context) + ".Provider";
          case Be:
            return Ft(e, e.render, "ForwardRef");
          case rt:
            var i = e.displayName || null;
            return i !== null ? i : Lt(e.type) || "Memo";
          case Ye: {
            var u = e, s = u._payload, f = u._init;
            try {
              return Lt(f(s));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    function Zo(e, t, a) {
      var i = t.displayName || t.name || "";
      return e.displayName || (i !== "" ? a + "(" + i + ")" : a);
    }
    function hi(e) {
      return e.displayName || "Context";
    }
    function it(e) {
      var t = e.tag, a = e.type;
      switch (t) {
        case Ut:
          return "Cache";
        case He:
          var i = a;
          return hi(i) + ".Consumer";
        case ue:
          var u = a;
          return hi(u._context) + ".Provider";
        case wt:
          return "DehydratedFragment";
        case ae:
          return Zo(a, a.render, "ForwardRef");
        case be:
          return "Fragment";
        case le:
          return a;
        case X:
          return "Portal";
        case V:
          return "Root";
        case ve:
          return "Text";
        case St:
          return Lt(a);
        case fe:
          return a === qa ? "StrictMode" : "Mode";
        case je:
          return "Offscreen";
        case he:
          return "Profiler";
        case bt:
          return "Scope";
        case ge:
          return "Suspense";
        case Ot:
          return "SuspenseList";
        case jt:
          return "TracingMarker";
        case F:
        case P:
        case Et:
        case ie:
        case Ce:
        case Ne:
          if (typeof a == "function")
            return a.displayName || a.name || null;
          if (typeof a == "string")
            return a;
          break;
      }
      return null;
    }
    var ro = E.ReactDebugCurrentFrame, or = null, mi = !1;
    function Mr() {
      {
        if (or === null)
          return null;
        var e = or._debugOwner;
        if (e !== null && typeof e < "u")
          return it(e);
      }
      return null;
    }
    function yi() {
      return or === null ? "" : Bi(or);
    }
    function cn() {
      ro.getCurrentStack = null, or = null, mi = !1;
    }
    function qt(e) {
      ro.getCurrentStack = e === null ? null : yi, or = e, mi = !1;
    }
    function Rl() {
      return or;
    }
    function Qn(e) {
      mi = e;
    }
    function Ur(e) {
      return "" + e;
    }
    function Da(e) {
      switch (typeof e) {
        case "boolean":
        case "number":
        case "string":
        case "undefined":
          return e;
        case "object":
          return Tn(e), e;
        default:
          return "";
      }
    }
    var uu = {
      button: !0,
      checkbox: !0,
      image: !0,
      hidden: !0,
      radio: !0,
      reset: !0,
      submit: !0
    };
    function es(e, t) {
      uu[t.type] || t.onChange || t.onInput || t.readOnly || t.disabled || t.value == null || g("You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`."), t.onChange || t.readOnly || t.disabled || t.checked == null || g("You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.");
    }
    function ts(e) {
      var t = e.type, a = e.nodeName;
      return a && a.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
    }
    function wl(e) {
      return e._valueTracker;
    }
    function ou(e) {
      e._valueTracker = null;
    }
    function ad(e) {
      var t = "";
      return e && (ts(e) ? t = e.checked ? "true" : "false" : t = e.value), t;
    }
    function Na(e) {
      var t = ts(e) ? "checked" : "value", a = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
      Tn(e[t]);
      var i = "" + e[t];
      if (!(e.hasOwnProperty(t) || typeof a > "u" || typeof a.get != "function" || typeof a.set != "function")) {
        var u = a.get, s = a.set;
        Object.defineProperty(e, t, {
          configurable: !0,
          get: function() {
            return u.call(this);
          },
          set: function(p) {
            Tn(p), i = "" + p, s.call(this, p);
          }
        }), Object.defineProperty(e, t, {
          enumerable: a.enumerable
        });
        var f = {
          getValue: function() {
            return i;
          },
          setValue: function(p) {
            Tn(p), i = "" + p;
          },
          stopTracking: function() {
            ou(e), delete e[t];
          }
        };
        return f;
      }
    }
    function ei(e) {
      wl(e) || (e._valueTracker = Na(e));
    }
    function gi(e) {
      if (!e)
        return !1;
      var t = wl(e);
      if (!t)
        return !0;
      var a = t.getValue(), i = ad(e);
      return i !== a ? (t.setValue(i), !0) : !1;
    }
    function ka(e) {
      if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u")
        return null;
      try {
        return e.activeElement || e.body;
      } catch {
        return e.body;
      }
    }
    var ao = !1, io = !1, Tl = !1, su = !1;
    function lo(e) {
      var t = e.type === "checkbox" || e.type === "radio";
      return t ? e.checked != null : e.value != null;
    }
    function uo(e, t) {
      var a = e, i = t.checked, u = mt({}, t, {
        defaultChecked: void 0,
        defaultValue: void 0,
        value: void 0,
        checked: i ?? a._wrapperState.initialChecked
      });
      return u;
    }
    function ti(e, t) {
      es("input", t), t.checked !== void 0 && t.defaultChecked !== void 0 && !io && (g("%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", Mr() || "A component", t.type), io = !0), t.value !== void 0 && t.defaultValue !== void 0 && !ao && (g("%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", Mr() || "A component", t.type), ao = !0);
      var a = e, i = t.defaultValue == null ? "" : t.defaultValue;
      a._wrapperState = {
        initialChecked: t.checked != null ? t.checked : t.defaultChecked,
        initialValue: Da(t.value != null ? t.value : i),
        controlled: lo(t)
      };
    }
    function h(e, t) {
      var a = e, i = t.checked;
      i != null && Or(a, "checked", i, !1);
    }
    function T(e, t) {
      var a = e;
      {
        var i = lo(t);
        !a._wrapperState.controlled && i && !su && (g("A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), su = !0), a._wrapperState.controlled && !i && !Tl && (g("A component is changing a controlled input to be uncontrolled. This is likely caused by the value changing from a defined to undefined, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), Tl = !0);
      }
      h(e, t);
      var u = Da(t.value), s = t.type;
      if (u != null)
        s === "number" ? (u === 0 && a.value === "" || // We explicitly want to coerce to number here if possible.
        // eslint-disable-next-line
        a.value != u) && (a.value = Ur(u)) : a.value !== Ur(u) && (a.value = Ur(u));
      else if (s === "submit" || s === "reset") {
        a.removeAttribute("value");
        return;
      }
      t.hasOwnProperty("value") ? We(a, t.type, u) : t.hasOwnProperty("defaultValue") && We(a, t.type, Da(t.defaultValue)), t.checked == null && t.defaultChecked != null && (a.defaultChecked = !!t.defaultChecked);
    }
    function B(e, t, a) {
      var i = e;
      if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
        var u = t.type, s = u === "submit" || u === "reset";
        if (s && (t.value === void 0 || t.value === null))
          return;
        var f = Ur(i._wrapperState.initialValue);
        a || f !== i.value && (i.value = f), i.defaultValue = f;
      }
      var p = i.name;
      p !== "" && (i.name = ""), i.defaultChecked = !i.defaultChecked, i.defaultChecked = !!i._wrapperState.initialChecked, p !== "" && (i.name = p);
    }
    function Y(e, t) {
      var a = e;
      T(a, t), ce(a, t);
    }
    function ce(e, t) {
      var a = t.name;
      if (t.type === "radio" && a != null) {
        for (var i = e; i.parentNode; )
          i = i.parentNode;
        $n(a, "name");
        for (var u = i.querySelectorAll("input[name=" + JSON.stringify("" + a) + '][type="radio"]'), s = 0; s < u.length; s++) {
          var f = u[s];
          if (!(f === e || f.form !== e.form)) {
            var p = Qh(f);
            if (!p)
              throw new Error("ReactDOMInput: Mixing React and non-React radio inputs with the same `name` is not supported.");
            gi(f), T(f, p);
          }
        }
      }
    }
    function We(e, t, a) {
      // Focused number inputs synchronize on blur. See ChangeEventPlugin.js
      (t !== "number" || ka(e.ownerDocument) !== e) && (a == null ? e.defaultValue = Ur(e._wrapperState.initialValue) : e.defaultValue !== Ur(a) && (e.defaultValue = Ur(a)));
    }
    var Ee = !1, qe = !1, Ct = !1;
    function Mt(e, t) {
      t.value == null && (typeof t.children == "object" && t.children !== null ? m.Children.forEach(t.children, function(a) {
        a != null && (typeof a == "string" || typeof a == "number" || qe || (qe = !0, g("Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>.")));
      }) : t.dangerouslySetInnerHTML != null && (Ct || (Ct = !0, g("Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected.")))), t.selected != null && !Ee && (g("Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>."), Ee = !0);
    }
    function ln(e, t) {
      t.value != null && e.setAttribute("value", Ur(Da(t.value)));
    }
    var Xt = Array.isArray;
    function pt(e) {
      return Xt(e);
    }
    var Jt;
    Jt = !1;
    function yn() {
      var e = Mr();
      return e ? `

Check the render method of \`` + e + "`." : "";
    }
    var bl = ["value", "defaultValue"];
    function ns(e) {
      {
        es("select", e);
        for (var t = 0; t < bl.length; t++) {
          var a = bl[t];
          if (e[a] != null) {
            var i = pt(e[a]);
            e.multiple && !i ? g("The `%s` prop supplied to <select> must be an array if `multiple` is true.%s", a, yn()) : !e.multiple && i && g("The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.%s", a, yn());
          }
        }
      }
    }
    function Ii(e, t, a, i) {
      var u = e.options;
      if (t) {
        for (var s = a, f = {}, p = 0; p < s.length; p++)
          f["$" + s[p]] = !0;
        for (var v = 0; v < u.length; v++) {
          var S = f.hasOwnProperty("$" + u[v].value);
          u[v].selected !== S && (u[v].selected = S), S && i && (u[v].defaultSelected = !0);
        }
      } else {
        for (var R = Ur(Da(a)), O = null, D = 0; D < u.length; D++) {
          if (u[D].value === R) {
            u[D].selected = !0, i && (u[D].defaultSelected = !0);
            return;
          }
          O === null && !u[D].disabled && (O = u[D]);
        }
        O !== null && (O.selected = !0);
      }
    }
    function rs(e, t) {
      return mt({}, t, {
        value: void 0
      });
    }
    function cu(e, t) {
      var a = e;
      ns(t), a._wrapperState = {
        wasMultiple: !!t.multiple
      }, t.value !== void 0 && t.defaultValue !== void 0 && !Jt && (g("Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://reactjs.org/link/controlled-components"), Jt = !0);
    }
    function id(e, t) {
      var a = e;
      a.multiple = !!t.multiple;
      var i = t.value;
      i != null ? Ii(a, !!t.multiple, i, !1) : t.defaultValue != null && Ii(a, !!t.multiple, t.defaultValue, !0);
    }
    function mc(e, t) {
      var a = e, i = a._wrapperState.wasMultiple;
      a._wrapperState.wasMultiple = !!t.multiple;
      var u = t.value;
      u != null ? Ii(a, !!t.multiple, u, !1) : i !== !!t.multiple && (t.defaultValue != null ? Ii(a, !!t.multiple, t.defaultValue, !0) : Ii(a, !!t.multiple, t.multiple ? [] : "", !1));
    }
    function ld(e, t) {
      var a = e, i = t.value;
      i != null && Ii(a, !!t.multiple, i, !1);
    }
    var mv = !1;
    function ud(e, t) {
      var a = e;
      if (t.dangerouslySetInnerHTML != null)
        throw new Error("`dangerouslySetInnerHTML` does not make sense on <textarea>.");
      var i = mt({}, t, {
        value: void 0,
        defaultValue: void 0,
        children: Ur(a._wrapperState.initialValue)
      });
      return i;
    }
    function od(e, t) {
      var a = e;
      es("textarea", t), t.value !== void 0 && t.defaultValue !== void 0 && !mv && (g("%s contains a textarea with both value and defaultValue props. Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://reactjs.org/link/controlled-components", Mr() || "A component"), mv = !0);
      var i = t.value;
      if (i == null) {
        var u = t.children, s = t.defaultValue;
        if (u != null) {
          g("Use the `defaultValue` or `value` props instead of setting children on <textarea>.");
          {
            if (s != null)
              throw new Error("If you supply `defaultValue` on a <textarea>, do not pass children.");
            if (pt(u)) {
              if (u.length > 1)
                throw new Error("<textarea> can only have at most one child.");
              u = u[0];
            }
            s = u;
          }
        }
        s == null && (s = ""), i = s;
      }
      a._wrapperState = {
        initialValue: Da(i)
      };
    }
    function yv(e, t) {
      var a = e, i = Da(t.value), u = Da(t.defaultValue);
      if (i != null) {
        var s = Ur(i);
        s !== a.value && (a.value = s), t.defaultValue == null && a.defaultValue !== s && (a.defaultValue = s);
      }
      u != null && (a.defaultValue = Ur(u));
    }
    function gv(e, t) {
      var a = e, i = a.textContent;
      i === a._wrapperState.initialValue && i !== "" && i !== null && (a.value = i);
    }
    function yy(e, t) {
      yv(e, t);
    }
    var $i = "http://www.w3.org/1999/xhtml", sd = "http://www.w3.org/1998/Math/MathML", cd = "http://www.w3.org/2000/svg";
    function fd(e) {
      switch (e) {
        case "svg":
          return cd;
        case "math":
          return sd;
        default:
          return $i;
      }
    }
    function dd(e, t) {
      return e == null || e === $i ? fd(t) : e === cd && t === "foreignObject" ? $i : e;
    }
    var Sv = function(e) {
      return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, a, i, u) {
        MSApp.execUnsafeLocalFunction(function() {
          return e(t, a, i, u);
        });
      } : e;
    }, yc, Ev = Sv(function(e, t) {
      if (e.namespaceURI === cd && !("innerHTML" in e)) {
        yc = yc || document.createElement("div"), yc.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>";
        for (var a = yc.firstChild; e.firstChild; )
          e.removeChild(e.firstChild);
        for (; a.firstChild; )
          e.appendChild(a.firstChild);
        return;
      }
      e.innerHTML = t;
    }), Xr = 1, Yi = 3, Un = 8, Wi = 9, pd = 11, oo = function(e, t) {
      if (t) {
        var a = e.firstChild;
        if (a && a === e.lastChild && a.nodeType === Yi) {
          a.nodeValue = t;
          return;
        }
      }
      e.textContent = t;
    }, as = {
      animation: ["animationDelay", "animationDirection", "animationDuration", "animationFillMode", "animationIterationCount", "animationName", "animationPlayState", "animationTimingFunction"],
      background: ["backgroundAttachment", "backgroundClip", "backgroundColor", "backgroundImage", "backgroundOrigin", "backgroundPositionX", "backgroundPositionY", "backgroundRepeat", "backgroundSize"],
      backgroundPosition: ["backgroundPositionX", "backgroundPositionY"],
      border: ["borderBottomColor", "borderBottomStyle", "borderBottomWidth", "borderImageOutset", "borderImageRepeat", "borderImageSlice", "borderImageSource", "borderImageWidth", "borderLeftColor", "borderLeftStyle", "borderLeftWidth", "borderRightColor", "borderRightStyle", "borderRightWidth", "borderTopColor", "borderTopStyle", "borderTopWidth"],
      borderBlockEnd: ["borderBlockEndColor", "borderBlockEndStyle", "borderBlockEndWidth"],
      borderBlockStart: ["borderBlockStartColor", "borderBlockStartStyle", "borderBlockStartWidth"],
      borderBottom: ["borderBottomColor", "borderBottomStyle", "borderBottomWidth"],
      borderColor: ["borderBottomColor", "borderLeftColor", "borderRightColor", "borderTopColor"],
      borderImage: ["borderImageOutset", "borderImageRepeat", "borderImageSlice", "borderImageSource", "borderImageWidth"],
      borderInlineEnd: ["borderInlineEndColor", "borderInlineEndStyle", "borderInlineEndWidth"],
      borderInlineStart: ["borderInlineStartColor", "borderInlineStartStyle", "borderInlineStartWidth"],
      borderLeft: ["borderLeftColor", "borderLeftStyle", "borderLeftWidth"],
      borderRadius: ["borderBottomLeftRadius", "borderBottomRightRadius", "borderTopLeftRadius", "borderTopRightRadius"],
      borderRight: ["borderRightColor", "borderRightStyle", "borderRightWidth"],
      borderStyle: ["borderBottomStyle", "borderLeftStyle", "borderRightStyle", "borderTopStyle"],
      borderTop: ["borderTopColor", "borderTopStyle", "borderTopWidth"],
      borderWidth: ["borderBottomWidth", "borderLeftWidth", "borderRightWidth", "borderTopWidth"],
      columnRule: ["columnRuleColor", "columnRuleStyle", "columnRuleWidth"],
      columns: ["columnCount", "columnWidth"],
      flex: ["flexBasis", "flexGrow", "flexShrink"],
      flexFlow: ["flexDirection", "flexWrap"],
      font: ["fontFamily", "fontFeatureSettings", "fontKerning", "fontLanguageOverride", "fontSize", "fontSizeAdjust", "fontStretch", "fontStyle", "fontVariant", "fontVariantAlternates", "fontVariantCaps", "fontVariantEastAsian", "fontVariantLigatures", "fontVariantNumeric", "fontVariantPosition", "fontWeight", "lineHeight"],
      fontVariant: ["fontVariantAlternates", "fontVariantCaps", "fontVariantEastAsian", "fontVariantLigatures", "fontVariantNumeric", "fontVariantPosition"],
      gap: ["columnGap", "rowGap"],
      grid: ["gridAutoColumns", "gridAutoFlow", "gridAutoRows", "gridTemplateAreas", "gridTemplateColumns", "gridTemplateRows"],
      gridArea: ["gridColumnEnd", "gridColumnStart", "gridRowEnd", "gridRowStart"],
      gridColumn: ["gridColumnEnd", "gridColumnStart"],
      gridColumnGap: ["columnGap"],
      gridGap: ["columnGap", "rowGap"],
      gridRow: ["gridRowEnd", "gridRowStart"],
      gridRowGap: ["rowGap"],
      gridTemplate: ["gridTemplateAreas", "gridTemplateColumns", "gridTemplateRows"],
      listStyle: ["listStyleImage", "listStylePosition", "listStyleType"],
      margin: ["marginBottom", "marginLeft", "marginRight", "marginTop"],
      marker: ["markerEnd", "markerMid", "markerStart"],
      mask: ["maskClip", "maskComposite", "maskImage", "maskMode", "maskOrigin", "maskPositionX", "maskPositionY", "maskRepeat", "maskSize"],
      maskPosition: ["maskPositionX", "maskPositionY"],
      outline: ["outlineColor", "outlineStyle", "outlineWidth"],
      overflow: ["overflowX", "overflowY"],
      padding: ["paddingBottom", "paddingLeft", "paddingRight", "paddingTop"],
      placeContent: ["alignContent", "justifyContent"],
      placeItems: ["alignItems", "justifyItems"],
      placeSelf: ["alignSelf", "justifySelf"],
      textDecoration: ["textDecorationColor", "textDecorationLine", "textDecorationStyle"],
      textEmphasis: ["textEmphasisColor", "textEmphasisStyle"],
      transition: ["transitionDelay", "transitionDuration", "transitionProperty", "transitionTimingFunction"],
      wordWrap: ["overflowWrap"]
    }, is = {
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
      // SVG-related properties
      fillOpacity: !0,
      floodOpacity: !0,
      stopOpacity: !0,
      strokeDasharray: !0,
      strokeDashoffset: !0,
      strokeMiterlimit: !0,
      strokeOpacity: !0,
      strokeWidth: !0
    };
    function Cv(e, t) {
      return e + t.charAt(0).toUpperCase() + t.substring(1);
    }
    var Rv = ["Webkit", "ms", "Moz", "O"];
    Object.keys(is).forEach(function(e) {
      Rv.forEach(function(t) {
        is[Cv(t, e)] = is[e];
      });
    });
    function gc(e, t, a) {
      var i = t == null || typeof t == "boolean" || t === "";
      return i ? "" : !a && typeof t == "number" && t !== 0 && !(is.hasOwnProperty(e) && is[e]) ? t + "px" : (pa(t, e), ("" + t).trim());
    }
    var wv = /([A-Z])/g, Tv = /^ms-/;
    function so(e) {
      return e.replace(wv, "-$1").toLowerCase().replace(Tv, "-ms-");
    }
    var bv = function() {
    };
    {
      var gy = /^(?:webkit|moz|o)[A-Z]/, Sy = /^-ms-/, xv = /-(.)/g, vd = /;\s*$/, Si = {}, fu = {}, _v = !1, ls = !1, Ey = function(e) {
        return e.replace(xv, function(t, a) {
          return a.toUpperCase();
        });
      }, Dv = function(e) {
        Si.hasOwnProperty(e) && Si[e] || (Si[e] = !0, g(
          "Unsupported style property %s. Did you mean %s?",
          e,
          // As Andi Smith suggests
          // (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
          // is converted to lowercase `ms`.
          Ey(e.replace(Sy, "ms-"))
        ));
      }, hd = function(e) {
        Si.hasOwnProperty(e) && Si[e] || (Si[e] = !0, g("Unsupported vendor-prefixed style property %s. Did you mean %s?", e, e.charAt(0).toUpperCase() + e.slice(1)));
      }, md = function(e, t) {
        fu.hasOwnProperty(t) && fu[t] || (fu[t] = !0, g(`Style property values shouldn't contain a semicolon. Try "%s: %s" instead.`, e, t.replace(vd, "")));
      }, Nv = function(e, t) {
        _v || (_v = !0, g("`NaN` is an invalid value for the `%s` css style property.", e));
      }, kv = function(e, t) {
        ls || (ls = !0, g("`Infinity` is an invalid value for the `%s` css style property.", e));
      };
      bv = function(e, t) {
        e.indexOf("-") > -1 ? Dv(e) : gy.test(e) ? hd(e) : vd.test(t) && md(e, t), typeof t == "number" && (isNaN(t) ? Nv(e, t) : isFinite(t) || kv(e, t));
      };
    }
    var Ov = bv;
    function Cy(e) {
      {
        var t = "", a = "";
        for (var i in e)
          if (e.hasOwnProperty(i)) {
            var u = e[i];
            if (u != null) {
              var s = i.indexOf("--") === 0;
              t += a + (s ? i : so(i)) + ":", t += gc(i, u, s), a = ";";
            }
          }
        return t || null;
      }
    }
    function Lv(e, t) {
      var a = e.style;
      for (var i in t)
        if (t.hasOwnProperty(i)) {
          var u = i.indexOf("--") === 0;
          u || Ov(i, t[i]);
          var s = gc(i, t[i], u);
          i === "float" && (i = "cssFloat"), u ? a.setProperty(i, s) : a[i] = s;
        }
    }
    function Ry(e) {
      return e == null || typeof e == "boolean" || e === "";
    }
    function Mv(e) {
      var t = {};
      for (var a in e)
        for (var i = as[a] || [a], u = 0; u < i.length; u++)
          t[i[u]] = a;
      return t;
    }
    function wy(e, t) {
      {
        if (!t)
          return;
        var a = Mv(e), i = Mv(t), u = {};
        for (var s in a) {
          var f = a[s], p = i[s];
          if (p && f !== p) {
            var v = f + "," + p;
            if (u[v])
              continue;
            u[v] = !0, g("%s a style property during rerender (%s) when a conflicting property is set (%s) can lead to styling bugs. To avoid this, don't mix shorthand and non-shorthand properties for the same value; instead, replace the shorthand with separate values.", Ry(e[f]) ? "Removing" : "Updating", f, p);
          }
        }
      }
    }
    var ni = {
      area: !0,
      base: !0,
      br: !0,
      col: !0,
      embed: !0,
      hr: !0,
      img: !0,
      input: !0,
      keygen: !0,
      link: !0,
      meta: !0,
      param: !0,
      source: !0,
      track: !0,
      wbr: !0
      // NOTE: menuitem's close tag should be omitted, but that causes problems.
    }, us = mt({
      menuitem: !0
    }, ni), Uv = "__html";
    function Sc(e, t) {
      if (t) {
        if (us[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
          throw new Error(e + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
        if (t.dangerouslySetInnerHTML != null) {
          if (t.children != null)
            throw new Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
          if (typeof t.dangerouslySetInnerHTML != "object" || !(Uv in t.dangerouslySetInnerHTML))
            throw new Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information.");
        }
        if (!t.suppressContentEditableWarning && t.contentEditable && t.children != null && g("A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional."), t.style != null && typeof t.style != "object")
          throw new Error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.");
      }
    }
    function xl(e, t) {
      if (e.indexOf("-") === -1)
        return typeof t.is == "string";
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
    var os = {
      // HTML
      accept: "accept",
      acceptcharset: "acceptCharset",
      "accept-charset": "acceptCharset",
      accesskey: "accessKey",
      action: "action",
      allowfullscreen: "allowFullScreen",
      alt: "alt",
      as: "as",
      async: "async",
      autocapitalize: "autoCapitalize",
      autocomplete: "autoComplete",
      autocorrect: "autoCorrect",
      autofocus: "autoFocus",
      autoplay: "autoPlay",
      autosave: "autoSave",
      capture: "capture",
      cellpadding: "cellPadding",
      cellspacing: "cellSpacing",
      challenge: "challenge",
      charset: "charSet",
      checked: "checked",
      children: "children",
      cite: "cite",
      class: "className",
      classid: "classID",
      classname: "className",
      cols: "cols",
      colspan: "colSpan",
      content: "content",
      contenteditable: "contentEditable",
      contextmenu: "contextMenu",
      controls: "controls",
      controlslist: "controlsList",
      coords: "coords",
      crossorigin: "crossOrigin",
      dangerouslysetinnerhtml: "dangerouslySetInnerHTML",
      data: "data",
      datetime: "dateTime",
      default: "default",
      defaultchecked: "defaultChecked",
      defaultvalue: "defaultValue",
      defer: "defer",
      dir: "dir",
      disabled: "disabled",
      disablepictureinpicture: "disablePictureInPicture",
      disableremoteplayback: "disableRemotePlayback",
      download: "download",
      draggable: "draggable",
      enctype: "encType",
      enterkeyhint: "enterKeyHint",
      for: "htmlFor",
      form: "form",
      formmethod: "formMethod",
      formaction: "formAction",
      formenctype: "formEncType",
      formnovalidate: "formNoValidate",
      formtarget: "formTarget",
      frameborder: "frameBorder",
      headers: "headers",
      height: "height",
      hidden: "hidden",
      high: "high",
      href: "href",
      hreflang: "hrefLang",
      htmlfor: "htmlFor",
      httpequiv: "httpEquiv",
      "http-equiv": "httpEquiv",
      icon: "icon",
      id: "id",
      imagesizes: "imageSizes",
      imagesrcset: "imageSrcSet",
      innerhtml: "innerHTML",
      inputmode: "inputMode",
      integrity: "integrity",
      is: "is",
      itemid: "itemID",
      itemprop: "itemProp",
      itemref: "itemRef",
      itemscope: "itemScope",
      itemtype: "itemType",
      keyparams: "keyParams",
      keytype: "keyType",
      kind: "kind",
      label: "label",
      lang: "lang",
      list: "list",
      loop: "loop",
      low: "low",
      manifest: "manifest",
      marginwidth: "marginWidth",
      marginheight: "marginHeight",
      max: "max",
      maxlength: "maxLength",
      media: "media",
      mediagroup: "mediaGroup",
      method: "method",
      min: "min",
      minlength: "minLength",
      multiple: "multiple",
      muted: "muted",
      name: "name",
      nomodule: "noModule",
      nonce: "nonce",
      novalidate: "noValidate",
      open: "open",
      optimum: "optimum",
      pattern: "pattern",
      placeholder: "placeholder",
      playsinline: "playsInline",
      poster: "poster",
      preload: "preload",
      profile: "profile",
      radiogroup: "radioGroup",
      readonly: "readOnly",
      referrerpolicy: "referrerPolicy",
      rel: "rel",
      required: "required",
      reversed: "reversed",
      role: "role",
      rows: "rows",
      rowspan: "rowSpan",
      sandbox: "sandbox",
      scope: "scope",
      scoped: "scoped",
      scrolling: "scrolling",
      seamless: "seamless",
      selected: "selected",
      shape: "shape",
      size: "size",
      sizes: "sizes",
      span: "span",
      spellcheck: "spellCheck",
      src: "src",
      srcdoc: "srcDoc",
      srclang: "srcLang",
      srcset: "srcSet",
      start: "start",
      step: "step",
      style: "style",
      summary: "summary",
      tabindex: "tabIndex",
      target: "target",
      title: "title",
      type: "type",
      usemap: "useMap",
      value: "value",
      width: "width",
      wmode: "wmode",
      wrap: "wrap",
      // SVG
      about: "about",
      accentheight: "accentHeight",
      "accent-height": "accentHeight",
      accumulate: "accumulate",
      additive: "additive",
      alignmentbaseline: "alignmentBaseline",
      "alignment-baseline": "alignmentBaseline",
      allowreorder: "allowReorder",
      alphabetic: "alphabetic",
      amplitude: "amplitude",
      arabicform: "arabicForm",
      "arabic-form": "arabicForm",
      ascent: "ascent",
      attributename: "attributeName",
      attributetype: "attributeType",
      autoreverse: "autoReverse",
      azimuth: "azimuth",
      basefrequency: "baseFrequency",
      baselineshift: "baselineShift",
      "baseline-shift": "baselineShift",
      baseprofile: "baseProfile",
      bbox: "bbox",
      begin: "begin",
      bias: "bias",
      by: "by",
      calcmode: "calcMode",
      capheight: "capHeight",
      "cap-height": "capHeight",
      clip: "clip",
      clippath: "clipPath",
      "clip-path": "clipPath",
      clippathunits: "clipPathUnits",
      cliprule: "clipRule",
      "clip-rule": "clipRule",
      color: "color",
      colorinterpolation: "colorInterpolation",
      "color-interpolation": "colorInterpolation",
      colorinterpolationfilters: "colorInterpolationFilters",
      "color-interpolation-filters": "colorInterpolationFilters",
      colorprofile: "colorProfile",
      "color-profile": "colorProfile",
      colorrendering: "colorRendering",
      "color-rendering": "colorRendering",
      contentscripttype: "contentScriptType",
      contentstyletype: "contentStyleType",
      cursor: "cursor",
      cx: "cx",
      cy: "cy",
      d: "d",
      datatype: "datatype",
      decelerate: "decelerate",
      descent: "descent",
      diffuseconstant: "diffuseConstant",
      direction: "direction",
      display: "display",
      divisor: "divisor",
      dominantbaseline: "dominantBaseline",
      "dominant-baseline": "dominantBaseline",
      dur: "dur",
      dx: "dx",
      dy: "dy",
      edgemode: "edgeMode",
      elevation: "elevation",
      enablebackground: "enableBackground",
      "enable-background": "enableBackground",
      end: "end",
      exponent: "exponent",
      externalresourcesrequired: "externalResourcesRequired",
      fill: "fill",
      fillopacity: "fillOpacity",
      "fill-opacity": "fillOpacity",
      fillrule: "fillRule",
      "fill-rule": "fillRule",
      filter: "filter",
      filterres: "filterRes",
      filterunits: "filterUnits",
      floodopacity: "floodOpacity",
      "flood-opacity": "floodOpacity",
      floodcolor: "floodColor",
      "flood-color": "floodColor",
      focusable: "focusable",
      fontfamily: "fontFamily",
      "font-family": "fontFamily",
      fontsize: "fontSize",
      "font-size": "fontSize",
      fontsizeadjust: "fontSizeAdjust",
      "font-size-adjust": "fontSizeAdjust",
      fontstretch: "fontStretch",
      "font-stretch": "fontStretch",
      fontstyle: "fontStyle",
      "font-style": "fontStyle",
      fontvariant: "fontVariant",
      "font-variant": "fontVariant",
      fontweight: "fontWeight",
      "font-weight": "fontWeight",
      format: "format",
      from: "from",
      fx: "fx",
      fy: "fy",
      g1: "g1",
      g2: "g2",
      glyphname: "glyphName",
      "glyph-name": "glyphName",
      glyphorientationhorizontal: "glyphOrientationHorizontal",
      "glyph-orientation-horizontal": "glyphOrientationHorizontal",
      glyphorientationvertical: "glyphOrientationVertical",
      "glyph-orientation-vertical": "glyphOrientationVertical",
      glyphref: "glyphRef",
      gradienttransform: "gradientTransform",
      gradientunits: "gradientUnits",
      hanging: "hanging",
      horizadvx: "horizAdvX",
      "horiz-adv-x": "horizAdvX",
      horizoriginx: "horizOriginX",
      "horiz-origin-x": "horizOriginX",
      ideographic: "ideographic",
      imagerendering: "imageRendering",
      "image-rendering": "imageRendering",
      in2: "in2",
      in: "in",
      inlist: "inlist",
      intercept: "intercept",
      k1: "k1",
      k2: "k2",
      k3: "k3",
      k4: "k4",
      k: "k",
      kernelmatrix: "kernelMatrix",
      kernelunitlength: "kernelUnitLength",
      kerning: "kerning",
      keypoints: "keyPoints",
      keysplines: "keySplines",
      keytimes: "keyTimes",
      lengthadjust: "lengthAdjust",
      letterspacing: "letterSpacing",
      "letter-spacing": "letterSpacing",
      lightingcolor: "lightingColor",
      "lighting-color": "lightingColor",
      limitingconeangle: "limitingConeAngle",
      local: "local",
      markerend: "markerEnd",
      "marker-end": "markerEnd",
      markerheight: "markerHeight",
      markermid: "markerMid",
      "marker-mid": "markerMid",
      markerstart: "markerStart",
      "marker-start": "markerStart",
      markerunits: "markerUnits",
      markerwidth: "markerWidth",
      mask: "mask",
      maskcontentunits: "maskContentUnits",
      maskunits: "maskUnits",
      mathematical: "mathematical",
      mode: "mode",
      numoctaves: "numOctaves",
      offset: "offset",
      opacity: "opacity",
      operator: "operator",
      order: "order",
      orient: "orient",
      orientation: "orientation",
      origin: "origin",
      overflow: "overflow",
      overlineposition: "overlinePosition",
      "overline-position": "overlinePosition",
      overlinethickness: "overlineThickness",
      "overline-thickness": "overlineThickness",
      paintorder: "paintOrder",
      "paint-order": "paintOrder",
      panose1: "panose1",
      "panose-1": "panose1",
      pathlength: "pathLength",
      patterncontentunits: "patternContentUnits",
      patterntransform: "patternTransform",
      patternunits: "patternUnits",
      pointerevents: "pointerEvents",
      "pointer-events": "pointerEvents",
      points: "points",
      pointsatx: "pointsAtX",
      pointsaty: "pointsAtY",
      pointsatz: "pointsAtZ",
      prefix: "prefix",
      preservealpha: "preserveAlpha",
      preserveaspectratio: "preserveAspectRatio",
      primitiveunits: "primitiveUnits",
      property: "property",
      r: "r",
      radius: "radius",
      refx: "refX",
      refy: "refY",
      renderingintent: "renderingIntent",
      "rendering-intent": "renderingIntent",
      repeatcount: "repeatCount",
      repeatdur: "repeatDur",
      requiredextensions: "requiredExtensions",
      requiredfeatures: "requiredFeatures",
      resource: "resource",
      restart: "restart",
      result: "result",
      results: "results",
      rotate: "rotate",
      rx: "rx",
      ry: "ry",
      scale: "scale",
      security: "security",
      seed: "seed",
      shaperendering: "shapeRendering",
      "shape-rendering": "shapeRendering",
      slope: "slope",
      spacing: "spacing",
      specularconstant: "specularConstant",
      specularexponent: "specularExponent",
      speed: "speed",
      spreadmethod: "spreadMethod",
      startoffset: "startOffset",
      stddeviation: "stdDeviation",
      stemh: "stemh",
      stemv: "stemv",
      stitchtiles: "stitchTiles",
      stopcolor: "stopColor",
      "stop-color": "stopColor",
      stopopacity: "stopOpacity",
      "stop-opacity": "stopOpacity",
      strikethroughposition: "strikethroughPosition",
      "strikethrough-position": "strikethroughPosition",
      strikethroughthickness: "strikethroughThickness",
      "strikethrough-thickness": "strikethroughThickness",
      string: "string",
      stroke: "stroke",
      strokedasharray: "strokeDasharray",
      "stroke-dasharray": "strokeDasharray",
      strokedashoffset: "strokeDashoffset",
      "stroke-dashoffset": "strokeDashoffset",
      strokelinecap: "strokeLinecap",
      "stroke-linecap": "strokeLinecap",
      strokelinejoin: "strokeLinejoin",
      "stroke-linejoin": "strokeLinejoin",
      strokemiterlimit: "strokeMiterlimit",
      "stroke-miterlimit": "strokeMiterlimit",
      strokewidth: "strokeWidth",
      "stroke-width": "strokeWidth",
      strokeopacity: "strokeOpacity",
      "stroke-opacity": "strokeOpacity",
      suppresscontenteditablewarning: "suppressContentEditableWarning",
      suppresshydrationwarning: "suppressHydrationWarning",
      surfacescale: "surfaceScale",
      systemlanguage: "systemLanguage",
      tablevalues: "tableValues",
      targetx: "targetX",
      targety: "targetY",
      textanchor: "textAnchor",
      "text-anchor": "textAnchor",
      textdecoration: "textDecoration",
      "text-decoration": "textDecoration",
      textlength: "textLength",
      textrendering: "textRendering",
      "text-rendering": "textRendering",
      to: "to",
      transform: "transform",
      typeof: "typeof",
      u1: "u1",
      u2: "u2",
      underlineposition: "underlinePosition",
      "underline-position": "underlinePosition",
      underlinethickness: "underlineThickness",
      "underline-thickness": "underlineThickness",
      unicode: "unicode",
      unicodebidi: "unicodeBidi",
      "unicode-bidi": "unicodeBidi",
      unicoderange: "unicodeRange",
      "unicode-range": "unicodeRange",
      unitsperem: "unitsPerEm",
      "units-per-em": "unitsPerEm",
      unselectable: "unselectable",
      valphabetic: "vAlphabetic",
      "v-alphabetic": "vAlphabetic",
      values: "values",
      vectoreffect: "vectorEffect",
      "vector-effect": "vectorEffect",
      version: "version",
      vertadvy: "vertAdvY",
      "vert-adv-y": "vertAdvY",
      vertoriginx: "vertOriginX",
      "vert-origin-x": "vertOriginX",
      vertoriginy: "vertOriginY",
      "vert-origin-y": "vertOriginY",
      vhanging: "vHanging",
      "v-hanging": "vHanging",
      videographic: "vIdeographic",
      "v-ideographic": "vIdeographic",
      viewbox: "viewBox",
      viewtarget: "viewTarget",
      visibility: "visibility",
      vmathematical: "vMathematical",
      "v-mathematical": "vMathematical",
      vocab: "vocab",
      widths: "widths",
      wordspacing: "wordSpacing",
      "word-spacing": "wordSpacing",
      writingmode: "writingMode",
      "writing-mode": "writingMode",
      x1: "x1",
      x2: "x2",
      x: "x",
      xchannelselector: "xChannelSelector",
      xheight: "xHeight",
      "x-height": "xHeight",
      xlinkactuate: "xlinkActuate",
      "xlink:actuate": "xlinkActuate",
      xlinkarcrole: "xlinkArcrole",
      "xlink:arcrole": "xlinkArcrole",
      xlinkhref: "xlinkHref",
      "xlink:href": "xlinkHref",
      xlinkrole: "xlinkRole",
      "xlink:role": "xlinkRole",
      xlinkshow: "xlinkShow",
      "xlink:show": "xlinkShow",
      xlinktitle: "xlinkTitle",
      "xlink:title": "xlinkTitle",
      xlinktype: "xlinkType",
      "xlink:type": "xlinkType",
      xmlbase: "xmlBase",
      "xml:base": "xmlBase",
      xmllang: "xmlLang",
      "xml:lang": "xmlLang",
      xmlns: "xmlns",
      "xml:space": "xmlSpace",
      xmlnsxlink: "xmlnsXlink",
      "xmlns:xlink": "xmlnsXlink",
      xmlspace: "xmlSpace",
      y1: "y1",
      y2: "y2",
      y: "y",
      ychannelselector: "yChannelSelector",
      z: "z",
      zoomandpan: "zoomAndPan"
    }, Ec = {
      "aria-current": 0,
      // state
      "aria-description": 0,
      "aria-details": 0,
      "aria-disabled": 0,
      // state
      "aria-hidden": 0,
      // state
      "aria-invalid": 0,
      // state
      "aria-keyshortcuts": 0,
      "aria-label": 0,
      "aria-roledescription": 0,
      // Widget Attributes
      "aria-autocomplete": 0,
      "aria-checked": 0,
      "aria-expanded": 0,
      "aria-haspopup": 0,
      "aria-level": 0,
      "aria-modal": 0,
      "aria-multiline": 0,
      "aria-multiselectable": 0,
      "aria-orientation": 0,
      "aria-placeholder": 0,
      "aria-pressed": 0,
      "aria-readonly": 0,
      "aria-required": 0,
      "aria-selected": 0,
      "aria-sort": 0,
      "aria-valuemax": 0,
      "aria-valuemin": 0,
      "aria-valuenow": 0,
      "aria-valuetext": 0,
      // Live Region Attributes
      "aria-atomic": 0,
      "aria-busy": 0,
      "aria-live": 0,
      "aria-relevant": 0,
      // Drag-and-Drop Attributes
      "aria-dropeffect": 0,
      "aria-grabbed": 0,
      // Relationship Attributes
      "aria-activedescendant": 0,
      "aria-colcount": 0,
      "aria-colindex": 0,
      "aria-colspan": 0,
      "aria-controls": 0,
      "aria-describedby": 0,
      "aria-errormessage": 0,
      "aria-flowto": 0,
      "aria-labelledby": 0,
      "aria-owns": 0,
      "aria-posinset": 0,
      "aria-rowcount": 0,
      "aria-rowindex": 0,
      "aria-rowspan": 0,
      "aria-setsize": 0
    }, co = {}, Ty = new RegExp("^(aria)-[" + pe + "]*$"), fo = new RegExp("^(aria)[A-Z][" + pe + "]*$");
    function yd(e, t) {
      {
        if (kr.call(co, t) && co[t])
          return !0;
        if (fo.test(t)) {
          var a = "aria-" + t.slice(4).toLowerCase(), i = Ec.hasOwnProperty(a) ? a : null;
          if (i == null)
            return g("Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.", t), co[t] = !0, !0;
          if (t !== i)
            return g("Invalid ARIA attribute `%s`. Did you mean `%s`?", t, i), co[t] = !0, !0;
        }
        if (Ty.test(t)) {
          var u = t.toLowerCase(), s = Ec.hasOwnProperty(u) ? u : null;
          if (s == null)
            return co[t] = !0, !1;
          if (t !== s)
            return g("Unknown ARIA attribute `%s`. Did you mean `%s`?", t, s), co[t] = !0, !0;
        }
      }
      return !0;
    }
    function ss(e, t) {
      {
        var a = [];
        for (var i in t) {
          var u = yd(e, i);
          u || a.push(i);
        }
        var s = a.map(function(f) {
          return "`" + f + "`";
        }).join(", ");
        a.length === 1 ? g("Invalid aria prop %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", s, e) : a.length > 1 && g("Invalid aria props %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", s, e);
      }
    }
    function gd(e, t) {
      xl(e, t) || ss(e, t);
    }
    var Sd = !1;
    function Cc(e, t) {
      {
        if (e !== "input" && e !== "textarea" && e !== "select")
          return;
        t != null && t.value === null && !Sd && (Sd = !0, e === "select" && t.multiple ? g("`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.", e) : g("`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.", e));
      }
    }
    var du = function() {
    };
    {
      var sr = {}, Ed = /^on./, Rc = /^on[^A-Z]/, zv = new RegExp("^(aria)-[" + pe + "]*$"), Av = new RegExp("^(aria)[A-Z][" + pe + "]*$");
      du = function(e, t, a, i) {
        if (kr.call(sr, t) && sr[t])
          return !0;
        var u = t.toLowerCase();
        if (u === "onfocusin" || u === "onfocusout")
          return g("React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React."), sr[t] = !0, !0;
        if (i != null) {
          var s = i.registrationNameDependencies, f = i.possibleRegistrationNames;
          if (s.hasOwnProperty(t))
            return !0;
          var p = f.hasOwnProperty(u) ? f[u] : null;
          if (p != null)
            return g("Invalid event handler property `%s`. Did you mean `%s`?", t, p), sr[t] = !0, !0;
          if (Ed.test(t))
            return g("Unknown event handler property `%s`. It will be ignored.", t), sr[t] = !0, !0;
        } else if (Ed.test(t))
          return Rc.test(t) && g("Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.", t), sr[t] = !0, !0;
        if (zv.test(t) || Av.test(t))
          return !0;
        if (u === "innerhtml")
          return g("Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`."), sr[t] = !0, !0;
        if (u === "aria")
          return g("The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead."), sr[t] = !0, !0;
        if (u === "is" && a !== null && a !== void 0 && typeof a != "string")
          return g("Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.", typeof a), sr[t] = !0, !0;
        if (typeof a == "number" && isNaN(a))
          return g("Received NaN for the `%s` attribute. If this is expected, cast the value to a string.", t), sr[t] = !0, !0;
        var v = dn(t), S = v !== null && v.type === Yn;
        if (os.hasOwnProperty(u)) {
          var R = os[u];
          if (R !== t)
            return g("Invalid DOM property `%s`. Did you mean `%s`?", t, R), sr[t] = !0, !0;
        } else if (!S && t !== u)
          return g("React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.", t, u), sr[t] = !0, !0;
        return typeof a == "boolean" && on(t, a, v, !1) ? (a ? g('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.', a, t, t, a, t) : g('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.', a, t, t, a, t, t, t), sr[t] = !0, !0) : S ? !0 : on(t, a, v, !1) ? (sr[t] = !0, !1) : ((a === "false" || a === "true") && v !== null && v.type === Ln && (g("Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?", a, t, a === "false" ? "The browser will interpret it as a truthy value." : 'Although this works, it will not work as expected if you pass the string "false".', t, a), sr[t] = !0), !0);
      };
    }
    var jv = function(e, t, a) {
      {
        var i = [];
        for (var u in t) {
          var s = du(e, u, t[u], a);
          s || i.push(u);
        }
        var f = i.map(function(p) {
          return "`" + p + "`";
        }).join(", ");
        i.length === 1 ? g("Invalid value for prop %s on <%s> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", f, e) : i.length > 1 && g("Invalid values for props %s on <%s> tag. Either remove them from the element, or pass a string or number value to keep them in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", f, e);
      }
    };
    function Fv(e, t, a) {
      xl(e, t) || jv(e, t, a);
    }
    var Cd = 1, wc = 2, Oa = 4, Rd = Cd | wc | Oa, pu = null;
    function by(e) {
      pu !== null && g("Expected currently replaying event to be null. This error is likely caused by a bug in React. Please file an issue."), pu = e;
    }
    function xy() {
      pu === null && g("Expected currently replaying event to not be null. This error is likely caused by a bug in React. Please file an issue."), pu = null;
    }
    function cs(e) {
      return e === pu;
    }
    function wd(e) {
      var t = e.target || e.srcElement || window;
      return t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === Yi ? t.parentNode : t;
    }
    var Tc = null, vu = null, Wt = null;
    function bc(e) {
      var t = Mo(e);
      if (t) {
        if (typeof Tc != "function")
          throw new Error("setRestoreImplementation() needs to be called to handle a target for controlled events. This error is likely caused by a bug in React. Please file an issue.");
        var a = t.stateNode;
        if (a) {
          var i = Qh(a);
          Tc(t.stateNode, t.type, i);
        }
      }
    }
    function xc(e) {
      Tc = e;
    }
    function po(e) {
      vu ? Wt ? Wt.push(e) : Wt = [e] : vu = e;
    }
    function Vv() {
      return vu !== null || Wt !== null;
    }
    function _c() {
      if (vu) {
        var e = vu, t = Wt;
        if (vu = null, Wt = null, bc(e), t)
          for (var a = 0; a < t.length; a++)
            bc(t[a]);
      }
    }
    var vo = function(e, t) {
      return e(t);
    }, fs = function() {
    }, _l = !1;
    function Pv() {
      var e = Vv();
      e && (fs(), _c());
    }
    function Hv(e, t, a) {
      if (_l)
        return e(t, a);
      _l = !0;
      try {
        return vo(e, t, a);
      } finally {
        _l = !1, Pv();
      }
    }
    function _y(e, t, a) {
      vo = e, fs = a;
    }
    function Bv(e) {
      return e === "button" || e === "input" || e === "select" || e === "textarea";
    }
    function Dc(e, t, a) {
      switch (e) {
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
          return !!(a.disabled && Bv(t));
        default:
          return !1;
      }
    }
    function Dl(e, t) {
      var a = e.stateNode;
      if (a === null)
        return null;
      var i = Qh(a);
      if (i === null)
        return null;
      var u = i[t];
      if (Dc(t, e.type, i))
        return null;
      if (u && typeof u != "function")
        throw new Error("Expected `" + t + "` listener to be a function, instead got a value of `" + typeof u + "` type.");
      return u;
    }
    var ds = !1;
    if (On)
      try {
        var hu = {};
        Object.defineProperty(hu, "passive", {
          get: function() {
            ds = !0;
          }
        }), window.addEventListener("test", hu, hu), window.removeEventListener("test", hu, hu);
      } catch {
        ds = !1;
      }
    function Nc(e, t, a, i, u, s, f, p, v) {
      var S = Array.prototype.slice.call(arguments, 3);
      try {
        t.apply(a, S);
      } catch (R) {
        this.onError(R);
      }
    }
    var kc = Nc;
    if (typeof window < "u" && typeof window.dispatchEvent == "function" && typeof document < "u" && typeof document.createEvent == "function") {
      var Td = document.createElement("react");
      kc = function(t, a, i, u, s, f, p, v, S) {
        if (typeof document > "u" || document === null)
          throw new Error("The `document` global was defined when React was initialized, but is not defined anymore. This can happen in a test environment if a component schedules an update from an asynchronous callback, but the test has already finished running. To solve this, you can either unmount the component at the end of your test (and ensure that any asynchronous operations get canceled in `componentWillUnmount`), or you can change the test itself to be asynchronous.");
        var R = document.createEvent("Event"), O = !1, D = !0, H = window.event, $ = Object.getOwnPropertyDescriptor(window, "event");
        function W() {
          Td.removeEventListener(Q, Qe, !1), typeof window.event < "u" && window.hasOwnProperty("event") && (window.event = H);
        }
        var we = Array.prototype.slice.call(arguments, 3);
        function Qe() {
          O = !0, W(), a.apply(i, we), D = !1;
        }
        var Ve, kt = !1, Tt = !1;
        function U(z) {
          if (Ve = z.error, kt = !0, Ve === null && z.colno === 0 && z.lineno === 0 && (Tt = !0), z.defaultPrevented && Ve != null && typeof Ve == "object")
            try {
              Ve._suppressLogging = !0;
            } catch {
            }
        }
        var Q = "react-" + (t || "invokeguardedcallback");
        if (window.addEventListener("error", U), Td.addEventListener(Q, Qe, !1), R.initEvent(Q, !1, !1), Td.dispatchEvent(R), $ && Object.defineProperty(window, "event", $), O && D && (kt ? Tt && (Ve = new Error("A cross-origin error was thrown. React doesn't have access to the actual error object in development. See https://reactjs.org/link/crossorigin-error for more information.")) : Ve = new Error(`An error was thrown inside one of your components, but React doesn't know what it was. This is likely due to browser flakiness. React does its best to preserve the "Pause on exceptions" behavior of the DevTools, which requires some DEV-mode only tricks. It's possible that these don't work in your browser. Try triggering the error in production mode, or switching to a modern browser. If you suspect that this is actually an issue with React, please file an issue.`), this.onError(Ve)), window.removeEventListener("error", U), !O)
          return W(), Nc.apply(this, arguments);
      };
    }
    var Iv = kc, ho = !1, Oc = null, mo = !1, Ei = null, $v = {
      onError: function(e) {
        ho = !0, Oc = e;
      }
    };
    function Nl(e, t, a, i, u, s, f, p, v) {
      ho = !1, Oc = null, Iv.apply($v, arguments);
    }
    function Ci(e, t, a, i, u, s, f, p, v) {
      if (Nl.apply(this, arguments), ho) {
        var S = vs();
        mo || (mo = !0, Ei = S);
      }
    }
    function ps() {
      if (mo) {
        var e = Ei;
        throw mo = !1, Ei = null, e;
      }
    }
    function Qi() {
      return ho;
    }
    function vs() {
      if (ho) {
        var e = Oc;
        return ho = !1, Oc = null, e;
      } else
        throw new Error("clearCaughtError was called but no error was captured. This error is likely caused by a bug in React. Please file an issue.");
    }
    function yo(e) {
      return e._reactInternals;
    }
    function Dy(e) {
      return e._reactInternals !== void 0;
    }
    function mu(e, t) {
      e._reactInternals = t;
    }
    var Ie = (
      /*                      */
      0
    ), ri = (
      /*                */
      1
    ), gn = (
      /*                    */
      2
    ), _t = (
      /*                       */
      4
    ), La = (
      /*                */
      16
    ), Ma = (
      /*                 */
      32
    ), un = (
      /*                     */
      64
    ), Pe = (
      /*                   */
      128
    ), xr = (
      /*            */
      256
    ), Rn = (
      /*                          */
      512
    ), Gn = (
      /*                     */
      1024
    ), Jr = (
      /*                      */
      2048
    ), Zr = (
      /*                    */
      4096
    ), zn = (
      /*                   */
      8192
    ), go = (
      /*             */
      16384
    ), Yv = (
      /*               */
      32767
    ), hs = (
      /*                   */
      32768
    ), er = (
      /*                */
      65536
    ), Lc = (
      /* */
      131072
    ), Ri = (
      /*                       */
      1048576
    ), So = (
      /*                    */
      2097152
    ), Gi = (
      /*                 */
      4194304
    ), Mc = (
      /*                */
      8388608
    ), kl = (
      /*               */
      16777216
    ), wi = (
      /*              */
      33554432
    ), Ol = (
      // TODO: Remove Update flag from before mutation phase by re-landing Visibility
      // flag logic (see #20043)
      _t | Gn | 0
    ), Ll = gn | _t | La | Ma | Rn | Zr | zn, Ml = _t | un | Rn | zn, Ki = Jr | La, An = Gi | Mc | So, Ua = E.ReactCurrentOwner;
    function ma(e) {
      var t = e, a = e;
      if (e.alternate)
        for (; t.return; )
          t = t.return;
      else {
        var i = t;
        do
          t = i, (t.flags & (gn | Zr)) !== Ie && (a = t.return), i = t.return;
        while (i);
      }
      return t.tag === V ? a : null;
    }
    function Ti(e) {
      if (e.tag === ge) {
        var t = e.memoizedState;
        if (t === null) {
          var a = e.alternate;
          a !== null && (t = a.memoizedState);
        }
        if (t !== null)
          return t.dehydrated;
      }
      return null;
    }
    function bi(e) {
      return e.tag === V ? e.stateNode.containerInfo : null;
    }
    function yu(e) {
      return ma(e) === e;
    }
    function Wv(e) {
      {
        var t = Ua.current;
        if (t !== null && t.tag === F) {
          var a = t, i = a.stateNode;
          i._warnedAboutRefsInRender || g("%s is accessing isMounted inside its render() function. render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", it(a) || "A component"), i._warnedAboutRefsInRender = !0;
        }
      }
      var u = yo(e);
      return u ? ma(u) === u : !1;
    }
    function Uc(e) {
      if (ma(e) !== e)
        throw new Error("Unable to find node on an unmounted component.");
    }
    function zc(e) {
      var t = e.alternate;
      if (!t) {
        var a = ma(e);
        if (a === null)
          throw new Error("Unable to find node on an unmounted component.");
        return a !== e ? null : e;
      }
      for (var i = e, u = t; ; ) {
        var s = i.return;
        if (s === null)
          break;
        var f = s.alternate;
        if (f === null) {
          var p = s.return;
          if (p !== null) {
            i = u = p;
            continue;
          }
          break;
        }
        if (s.child === f.child) {
          for (var v = s.child; v; ) {
            if (v === i)
              return Uc(s), e;
            if (v === u)
              return Uc(s), t;
            v = v.sibling;
          }
          throw new Error("Unable to find node on an unmounted component.");
        }
        if (i.return !== u.return)
          i = s, u = f;
        else {
          for (var S = !1, R = s.child; R; ) {
            if (R === i) {
              S = !0, i = s, u = f;
              break;
            }
            if (R === u) {
              S = !0, u = s, i = f;
              break;
            }
            R = R.sibling;
          }
          if (!S) {
            for (R = f.child; R; ) {
              if (R === i) {
                S = !0, i = f, u = s;
                break;
              }
              if (R === u) {
                S = !0, u = f, i = s;
                break;
              }
              R = R.sibling;
            }
            if (!S)
              throw new Error("Child was not found in either parent set. This indicates a bug in React related to the return pointer. Please file an issue.");
          }
        }
        if (i.alternate !== u)
          throw new Error("Return fibers should always be each others' alternates. This error is likely caused by a bug in React. Please file an issue.");
      }
      if (i.tag !== V)
        throw new Error("Unable to find node on an unmounted component.");
      return i.stateNode.current === i ? e : t;
    }
    function ea(e) {
      var t = zc(e);
      return t !== null ? ta(t) : null;
    }
    function ta(e) {
      if (e.tag === le || e.tag === ve)
        return e;
      for (var t = e.child; t !== null; ) {
        var a = ta(t);
        if (a !== null)
          return a;
        t = t.sibling;
      }
      return null;
    }
    function vn(e) {
      var t = zc(e);
      return t !== null ? za(t) : null;
    }
    function za(e) {
      if (e.tag === le || e.tag === ve)
        return e;
      for (var t = e.child; t !== null; ) {
        if (t.tag !== X) {
          var a = za(t);
          if (a !== null)
            return a;
        }
        t = t.sibling;
      }
      return null;
    }
    var bd = C.unstable_scheduleCallback, Qv = C.unstable_cancelCallback, xd = C.unstable_shouldYield, _d = C.unstable_requestPaint, Kn = C.unstable_now, Ac = C.unstable_getCurrentPriorityLevel, ms = C.unstable_ImmediatePriority, Ul = C.unstable_UserBlockingPriority, qi = C.unstable_NormalPriority, Ny = C.unstable_LowPriority, gu = C.unstable_IdlePriority, jc = C.unstable_yieldValue, Gv = C.unstable_setDisableYieldValue, Su = null, bn = null, Re = null, ya = !1, na = typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u";
    function Eo(e) {
      if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u")
        return !1;
      var t = __REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (t.isDisabled)
        return !0;
      if (!t.supportsFiber)
        return g("The installed version of React DevTools is too old and will not work with the current version of React. Please update React DevTools. https://reactjs.org/link/react-devtools"), !0;
      try {
        et && (e = mt({}, e, {
          getLaneLabelMap: Eu,
          injectProfilingHooks: Aa
        })), Su = t.inject(e), bn = t;
      } catch (a) {
        g("React instrumentation encountered an error: %s.", a);
      }
      return !!t.checkDCE;
    }
    function Dd(e, t) {
      if (bn && typeof bn.onScheduleFiberRoot == "function")
        try {
          bn.onScheduleFiberRoot(Su, e, t);
        } catch (a) {
          ya || (ya = !0, g("React instrumentation encountered an error: %s", a));
        }
    }
    function Nd(e, t) {
      if (bn && typeof bn.onCommitFiberRoot == "function")
        try {
          var a = (e.current.flags & Pe) === Pe;
          if (Je) {
            var i;
            switch (t) {
              case zr:
                i = ms;
                break;
              case _i:
                i = Ul;
                break;
              case ja:
                i = qi;
                break;
              case Fa:
                i = gu;
                break;
              default:
                i = qi;
                break;
            }
            bn.onCommitFiberRoot(Su, e, i, a);
          }
        } catch (u) {
          ya || (ya = !0, g("React instrumentation encountered an error: %s", u));
        }
    }
    function kd(e) {
      if (bn && typeof bn.onPostCommitFiberRoot == "function")
        try {
          bn.onPostCommitFiberRoot(Su, e);
        } catch (t) {
          ya || (ya = !0, g("React instrumentation encountered an error: %s", t));
        }
    }
    function Od(e) {
      if (bn && typeof bn.onCommitFiberUnmount == "function")
        try {
          bn.onCommitFiberUnmount(Su, e);
        } catch (t) {
          ya || (ya = !0, g("React instrumentation encountered an error: %s", t));
        }
    }
    function Sn(e) {
      if (typeof jc == "function" && (Gv(e), N(e)), bn && typeof bn.setStrictMode == "function")
        try {
          bn.setStrictMode(Su, e);
        } catch (t) {
          ya || (ya = !0, g("React instrumentation encountered an error: %s", t));
        }
    }
    function Aa(e) {
      Re = e;
    }
    function Eu() {
      {
        for (var e = /* @__PURE__ */ new Map(), t = 1, a = 0; a < wu; a++) {
          var i = Jv(t);
          e.set(t, i), t *= 2;
        }
        return e;
      }
    }
    function Ld(e) {
      Re !== null && typeof Re.markCommitStarted == "function" && Re.markCommitStarted(e);
    }
    function Md() {
      Re !== null && typeof Re.markCommitStopped == "function" && Re.markCommitStopped();
    }
    function ga(e) {
      Re !== null && typeof Re.markComponentRenderStarted == "function" && Re.markComponentRenderStarted(e);
    }
    function Sa() {
      Re !== null && typeof Re.markComponentRenderStopped == "function" && Re.markComponentRenderStopped();
    }
    function Ud(e) {
      Re !== null && typeof Re.markComponentPassiveEffectMountStarted == "function" && Re.markComponentPassiveEffectMountStarted(e);
    }
    function Kv() {
      Re !== null && typeof Re.markComponentPassiveEffectMountStopped == "function" && Re.markComponentPassiveEffectMountStopped();
    }
    function Xi(e) {
      Re !== null && typeof Re.markComponentPassiveEffectUnmountStarted == "function" && Re.markComponentPassiveEffectUnmountStarted(e);
    }
    function zl() {
      Re !== null && typeof Re.markComponentPassiveEffectUnmountStopped == "function" && Re.markComponentPassiveEffectUnmountStopped();
    }
    function Fc(e) {
      Re !== null && typeof Re.markComponentLayoutEffectMountStarted == "function" && Re.markComponentLayoutEffectMountStarted(e);
    }
    function qv() {
      Re !== null && typeof Re.markComponentLayoutEffectMountStopped == "function" && Re.markComponentLayoutEffectMountStopped();
    }
    function ys(e) {
      Re !== null && typeof Re.markComponentLayoutEffectUnmountStarted == "function" && Re.markComponentLayoutEffectUnmountStarted(e);
    }
    function zd() {
      Re !== null && typeof Re.markComponentLayoutEffectUnmountStopped == "function" && Re.markComponentLayoutEffectUnmountStopped();
    }
    function gs(e, t, a) {
      Re !== null && typeof Re.markComponentErrored == "function" && Re.markComponentErrored(e, t, a);
    }
    function xi(e, t, a) {
      Re !== null && typeof Re.markComponentSuspended == "function" && Re.markComponentSuspended(e, t, a);
    }
    function Ss(e) {
      Re !== null && typeof Re.markLayoutEffectsStarted == "function" && Re.markLayoutEffectsStarted(e);
    }
    function Es() {
      Re !== null && typeof Re.markLayoutEffectsStopped == "function" && Re.markLayoutEffectsStopped();
    }
    function Cu(e) {
      Re !== null && typeof Re.markPassiveEffectsStarted == "function" && Re.markPassiveEffectsStarted(e);
    }
    function Ad() {
      Re !== null && typeof Re.markPassiveEffectsStopped == "function" && Re.markPassiveEffectsStopped();
    }
    function Ru(e) {
      Re !== null && typeof Re.markRenderStarted == "function" && Re.markRenderStarted(e);
    }
    function Xv() {
      Re !== null && typeof Re.markRenderYielded == "function" && Re.markRenderYielded();
    }
    function Vc() {
      Re !== null && typeof Re.markRenderStopped == "function" && Re.markRenderStopped();
    }
    function En(e) {
      Re !== null && typeof Re.markRenderScheduled == "function" && Re.markRenderScheduled(e);
    }
    function Pc(e, t) {
      Re !== null && typeof Re.markForceUpdateScheduled == "function" && Re.markForceUpdateScheduled(e, t);
    }
    function Cs(e, t) {
      Re !== null && typeof Re.markStateUpdateScheduled == "function" && Re.markStateUpdateScheduled(e, t);
    }
    var $e = (
      /*                         */
      0
    ), yt = (
      /*                 */
      1
    ), Vt = (
      /*                    */
      2
    ), Zt = (
      /*               */
      8
    ), Pt = (
      /*              */
      16
    ), jn = Math.clz32 ? Math.clz32 : Rs, tr = Math.log, Hc = Math.LN2;
    function Rs(e) {
      var t = e >>> 0;
      return t === 0 ? 32 : 31 - (tr(t) / Hc | 0) | 0;
    }
    var wu = 31, Z = (
      /*                        */
      0
    ), zt = (
      /*                          */
      0
    ), Ze = (
      /*                        */
      1
    ), Al = (
      /*    */
      2
    ), ai = (
      /*             */
      4
    ), _r = (
      /*            */
      8
    ), xn = (
      /*                     */
      16
    ), Ji = (
      /*                */
      32
    ), jl = (
      /*                       */
      4194240
    ), Tu = (
      /*                        */
      64
    ), Bc = (
      /*                        */
      128
    ), Ic = (
      /*                        */
      256
    ), $c = (
      /*                        */
      512
    ), Yc = (
      /*                        */
      1024
    ), Wc = (
      /*                        */
      2048
    ), Qc = (
      /*                        */
      4096
    ), Gc = (
      /*                        */
      8192
    ), Kc = (
      /*                        */
      16384
    ), bu = (
      /*                       */
      32768
    ), qc = (
      /*                       */
      65536
    ), Co = (
      /*                       */
      131072
    ), Ro = (
      /*                       */
      262144
    ), Xc = (
      /*                       */
      524288
    ), ws = (
      /*                       */
      1048576
    ), Jc = (
      /*                       */
      2097152
    ), Ts = (
      /*                            */
      130023424
    ), xu = (
      /*                             */
      4194304
    ), Zc = (
      /*                             */
      8388608
    ), bs = (
      /*                             */
      16777216
    ), ef = (
      /*                             */
      33554432
    ), tf = (
      /*                             */
      67108864
    ), jd = xu, xs = (
      /*          */
      134217728
    ), Fd = (
      /*                          */
      268435455
    ), _s = (
      /*               */
      268435456
    ), _u = (
      /*                        */
      536870912
    ), ra = (
      /*                   */
      1073741824
    );
    function Jv(e) {
      {
        if (e & Ze)
          return "Sync";
        if (e & Al)
          return "InputContinuousHydration";
        if (e & ai)
          return "InputContinuous";
        if (e & _r)
          return "DefaultHydration";
        if (e & xn)
          return "Default";
        if (e & Ji)
          return "TransitionHydration";
        if (e & jl)
          return "Transition";
        if (e & Ts)
          return "Retry";
        if (e & xs)
          return "SelectiveHydration";
        if (e & _s)
          return "IdleHydration";
        if (e & _u)
          return "Idle";
        if (e & ra)
          return "Offscreen";
      }
    }
    var nn = -1, Du = Tu, nf = xu;
    function Ds(e) {
      switch (Fl(e)) {
        case Ze:
          return Ze;
        case Al:
          return Al;
        case ai:
          return ai;
        case _r:
          return _r;
        case xn:
          return xn;
        case Ji:
          return Ji;
        case Tu:
        case Bc:
        case Ic:
        case $c:
        case Yc:
        case Wc:
        case Qc:
        case Gc:
        case Kc:
        case bu:
        case qc:
        case Co:
        case Ro:
        case Xc:
        case ws:
        case Jc:
          return e & jl;
        case xu:
        case Zc:
        case bs:
        case ef:
        case tf:
          return e & Ts;
        case xs:
          return xs;
        case _s:
          return _s;
        case _u:
          return _u;
        case ra:
          return ra;
        default:
          return g("Should have found matching lanes. This is a bug in React."), e;
      }
    }
    function rf(e, t) {
      var a = e.pendingLanes;
      if (a === Z)
        return Z;
      var i = Z, u = e.suspendedLanes, s = e.pingedLanes, f = a & Fd;
      if (f !== Z) {
        var p = f & ~u;
        if (p !== Z)
          i = Ds(p);
        else {
          var v = f & s;
          v !== Z && (i = Ds(v));
        }
      } else {
        var S = a & ~u;
        S !== Z ? i = Ds(S) : s !== Z && (i = Ds(s));
      }
      if (i === Z)
        return Z;
      if (t !== Z && t !== i && // If we already suspended with a delay, then interrupting is fine. Don't
      // bother waiting until the root is complete.
      (t & u) === Z) {
        var R = Fl(i), O = Fl(t);
        if (
          // Tests whether the next lane is equal or lower priority than the wip
          // one. This works because the bits decrease in priority as you go left.
          R >= O || // Default priority updates should not interrupt transition updates. The
          // only difference between default updates and transition updates is that
          // default updates do not support refresh transitions.
          R === xn && (O & jl) !== Z
        )
          return t;
      }
      (i & ai) !== Z && (i |= a & xn);
      var D = e.entangledLanes;
      if (D !== Z)
        for (var H = e.entanglements, $ = i & D; $ > 0; ) {
          var W = Fn($), we = 1 << W;
          i |= H[W], $ &= ~we;
        }
      return i;
    }
    function ii(e, t) {
      for (var a = e.eventTimes, i = nn; t > 0; ) {
        var u = Fn(t), s = 1 << u, f = a[u];
        f > i && (i = f), t &= ~s;
      }
      return i;
    }
    function Vd(e, t) {
      switch (e) {
        case Ze:
        case Al:
        case ai:
          return t + 250;
        case _r:
        case xn:
        case Ji:
        case Tu:
        case Bc:
        case Ic:
        case $c:
        case Yc:
        case Wc:
        case Qc:
        case Gc:
        case Kc:
        case bu:
        case qc:
        case Co:
        case Ro:
        case Xc:
        case ws:
        case Jc:
          return t + 5e3;
        case xu:
        case Zc:
        case bs:
        case ef:
        case tf:
          return nn;
        case xs:
        case _s:
        case _u:
        case ra:
          return nn;
        default:
          return g("Should have found matching lanes. This is a bug in React."), nn;
      }
    }
    function af(e, t) {
      for (var a = e.pendingLanes, i = e.suspendedLanes, u = e.pingedLanes, s = e.expirationTimes, f = a; f > 0; ) {
        var p = Fn(f), v = 1 << p, S = s[p];
        S === nn ? ((v & i) === Z || (v & u) !== Z) && (s[p] = Vd(v, t)) : S <= t && (e.expiredLanes |= v), f &= ~v;
      }
    }
    function Zv(e) {
      return Ds(e.pendingLanes);
    }
    function lf(e) {
      var t = e.pendingLanes & ~ra;
      return t !== Z ? t : t & ra ? ra : Z;
    }
    function eh(e) {
      return (e & Ze) !== Z;
    }
    function Ns(e) {
      return (e & Fd) !== Z;
    }
    function Nu(e) {
      return (e & Ts) === e;
    }
    function Pd(e) {
      var t = Ze | ai | xn;
      return (e & t) === Z;
    }
    function Hd(e) {
      return (e & jl) === e;
    }
    function uf(e, t) {
      var a = Al | ai | _r | xn;
      return (t & a) !== Z;
    }
    function th(e, t) {
      return (t & e.expiredLanes) !== Z;
    }
    function Bd(e) {
      return (e & jl) !== Z;
    }
    function Id() {
      var e = Du;
      return Du <<= 1, (Du & jl) === Z && (Du = Tu), e;
    }
    function nh() {
      var e = nf;
      return nf <<= 1, (nf & Ts) === Z && (nf = xu), e;
    }
    function Fl(e) {
      return e & -e;
    }
    function ks(e) {
      return Fl(e);
    }
    function Fn(e) {
      return 31 - jn(e);
    }
    function cr(e) {
      return Fn(e);
    }
    function aa(e, t) {
      return (e & t) !== Z;
    }
    function ku(e, t) {
      return (e & t) === t;
    }
    function ot(e, t) {
      return e | t;
    }
    function Os(e, t) {
      return e & ~t;
    }
    function $d(e, t) {
      return e & t;
    }
    function rh(e) {
      return e;
    }
    function ah(e, t) {
      return e !== zt && e < t ? e : t;
    }
    function Ls(e) {
      for (var t = [], a = 0; a < wu; a++)
        t.push(e);
      return t;
    }
    function wo(e, t, a) {
      e.pendingLanes |= t, t !== _u && (e.suspendedLanes = Z, e.pingedLanes = Z);
      var i = e.eventTimes, u = cr(t);
      i[u] = a;
    }
    function ih(e, t) {
      e.suspendedLanes |= t, e.pingedLanes &= ~t;
      for (var a = e.expirationTimes, i = t; i > 0; ) {
        var u = Fn(i), s = 1 << u;
        a[u] = nn, i &= ~s;
      }
    }
    function of(e, t, a) {
      e.pingedLanes |= e.suspendedLanes & t;
    }
    function Yd(e, t) {
      var a = e.pendingLanes & ~t;
      e.pendingLanes = t, e.suspendedLanes = Z, e.pingedLanes = Z, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t;
      for (var i = e.entanglements, u = e.eventTimes, s = e.expirationTimes, f = a; f > 0; ) {
        var p = Fn(f), v = 1 << p;
        i[p] = Z, u[p] = nn, s[p] = nn, f &= ~v;
      }
    }
    function sf(e, t) {
      for (var a = e.entangledLanes |= t, i = e.entanglements, u = a; u; ) {
        var s = Fn(u), f = 1 << s;
        // Is this one of the newly entangled lanes?
        f & t | // Is this lane transitively entangled with the newly entangled lanes?
        i[s] & t && (i[s] |= t), u &= ~f;
      }
    }
    function Wd(e, t) {
      var a = Fl(t), i;
      switch (a) {
        case ai:
          i = Al;
          break;
        case xn:
          i = _r;
          break;
        case Tu:
        case Bc:
        case Ic:
        case $c:
        case Yc:
        case Wc:
        case Qc:
        case Gc:
        case Kc:
        case bu:
        case qc:
        case Co:
        case Ro:
        case Xc:
        case ws:
        case Jc:
        case xu:
        case Zc:
        case bs:
        case ef:
        case tf:
          i = Ji;
          break;
        case _u:
          i = _s;
          break;
        default:
          i = zt;
          break;
      }
      return (i & (e.suspendedLanes | t)) !== zt ? zt : i;
    }
    function Ms(e, t, a) {
      if (na)
        for (var i = e.pendingUpdatersLaneMap; a > 0; ) {
          var u = cr(a), s = 1 << u, f = i[u];
          f.add(t), a &= ~s;
        }
    }
    function lh(e, t) {
      if (na)
        for (var a = e.pendingUpdatersLaneMap, i = e.memoizedUpdaters; t > 0; ) {
          var u = cr(t), s = 1 << u, f = a[u];
          f.size > 0 && (f.forEach(function(p) {
            var v = p.alternate;
            (v === null || !i.has(v)) && i.add(p);
          }), f.clear()), t &= ~s;
        }
    }
    function Qd(e, t) {
      return null;
    }
    var zr = Ze, _i = ai, ja = xn, Fa = _u, Us = zt;
    function Va() {
      return Us;
    }
    function Vn(e) {
      Us = e;
    }
    function uh(e, t) {
      var a = Us;
      try {
        return Us = e, t();
      } finally {
        Us = a;
      }
    }
    function oh(e, t) {
      return e !== 0 && e < t ? e : t;
    }
    function zs(e, t) {
      return e > t ? e : t;
    }
    function nr(e, t) {
      return e !== 0 && e < t;
    }
    function sh(e) {
      var t = Fl(e);
      return nr(zr, t) ? nr(_i, t) ? Ns(t) ? ja : Fa : _i : zr;
    }
    function cf(e) {
      var t = e.current.memoizedState;
      return t.isDehydrated;
    }
    var As;
    function Dr(e) {
      As = e;
    }
    function ky(e) {
      As(e);
    }
    var ke;
    function To(e) {
      ke = e;
    }
    var ff;
    function ch(e) {
      ff = e;
    }
    var fh;
    function js(e) {
      fh = e;
    }
    var Fs;
    function Gd(e) {
      Fs = e;
    }
    var df = !1, Vs = [], Zi = null, Di = null, Ni = null, _n = /* @__PURE__ */ new Map(), Ar = /* @__PURE__ */ new Map(), jr = [], dh = [
      "mousedown",
      "mouseup",
      "touchcancel",
      "touchend",
      "touchstart",
      "auxclick",
      "dblclick",
      "pointercancel",
      "pointerdown",
      "pointerup",
      "dragend",
      "dragstart",
      "drop",
      "compositionend",
      "compositionstart",
      "keydown",
      "keypress",
      "keyup",
      "input",
      "textInput",
      // Intentionally camelCase
      "copy",
      "cut",
      "paste",
      "click",
      "change",
      "contextmenu",
      "reset",
      "submit"
    ];
    function ph(e) {
      return dh.indexOf(e) > -1;
    }
    function li(e, t, a, i, u) {
      return {
        blockedOn: e,
        domEventName: t,
        eventSystemFlags: a,
        nativeEvent: u,
        targetContainers: [i]
      };
    }
    function Kd(e, t) {
      switch (e) {
        case "focusin":
        case "focusout":
          Zi = null;
          break;
        case "dragenter":
        case "dragleave":
          Di = null;
          break;
        case "mouseover":
        case "mouseout":
          Ni = null;
          break;
        case "pointerover":
        case "pointerout": {
          var a = t.pointerId;
          _n.delete(a);
          break;
        }
        case "gotpointercapture":
        case "lostpointercapture": {
          var i = t.pointerId;
          Ar.delete(i);
          break;
        }
      }
    }
    function ia(e, t, a, i, u, s) {
      if (e === null || e.nativeEvent !== s) {
        var f = li(t, a, i, u, s);
        if (t !== null) {
          var p = Mo(t);
          p !== null && ke(p);
        }
        return f;
      }
      e.eventSystemFlags |= i;
      var v = e.targetContainers;
      return u !== null && v.indexOf(u) === -1 && v.push(u), e;
    }
    function Oy(e, t, a, i, u) {
      switch (t) {
        case "focusin": {
          var s = u;
          return Zi = ia(Zi, e, t, a, i, s), !0;
        }
        case "dragenter": {
          var f = u;
          return Di = ia(Di, e, t, a, i, f), !0;
        }
        case "mouseover": {
          var p = u;
          return Ni = ia(Ni, e, t, a, i, p), !0;
        }
        case "pointerover": {
          var v = u, S = v.pointerId;
          return _n.set(S, ia(_n.get(S) || null, e, t, a, i, v)), !0;
        }
        case "gotpointercapture": {
          var R = u, O = R.pointerId;
          return Ar.set(O, ia(Ar.get(O) || null, e, t, a, i, R)), !0;
        }
      }
      return !1;
    }
    function qd(e) {
      var t = Xs(e.target);
      if (t !== null) {
        var a = ma(t);
        if (a !== null) {
          var i = a.tag;
          if (i === ge) {
            var u = Ti(a);
            if (u !== null) {
              e.blockedOn = u, Fs(e.priority, function() {
                ff(a);
              });
              return;
            }
          } else if (i === V) {
            var s = a.stateNode;
            if (cf(s)) {
              e.blockedOn = bi(a);
              return;
            }
          }
        }
      }
      e.blockedOn = null;
    }
    function vh(e) {
      for (var t = fh(), a = {
        blockedOn: null,
        target: e,
        priority: t
      }, i = 0; i < jr.length && nr(t, jr[i].priority); i++)
        ;
      jr.splice(i, 0, a), i === 0 && qd(a);
    }
    function Ps(e) {
      if (e.blockedOn !== null)
        return !1;
      for (var t = e.targetContainers; t.length > 0; ) {
        var a = t[0], i = xo(e.domEventName, e.eventSystemFlags, a, e.nativeEvent);
        if (i === null) {
          var u = e.nativeEvent, s = new u.constructor(u.type, u);
          by(s), u.target.dispatchEvent(s), xy();
        } else {
          var f = Mo(i);
          return f !== null && ke(f), e.blockedOn = i, !1;
        }
        t.shift();
      }
      return !0;
    }
    function Xd(e, t, a) {
      Ps(e) && a.delete(t);
    }
    function Ly() {
      df = !1, Zi !== null && Ps(Zi) && (Zi = null), Di !== null && Ps(Di) && (Di = null), Ni !== null && Ps(Ni) && (Ni = null), _n.forEach(Xd), Ar.forEach(Xd);
    }
    function Vl(e, t) {
      e.blockedOn === t && (e.blockedOn = null, df || (df = !0, C.unstable_scheduleCallback(C.unstable_NormalPriority, Ly)));
    }
    function Ou(e) {
      if (Vs.length > 0) {
        Vl(Vs[0], e);
        for (var t = 1; t < Vs.length; t++) {
          var a = Vs[t];
          a.blockedOn === e && (a.blockedOn = null);
        }
      }
      Zi !== null && Vl(Zi, e), Di !== null && Vl(Di, e), Ni !== null && Vl(Ni, e);
      var i = function(p) {
        return Vl(p, e);
      };
      _n.forEach(i), Ar.forEach(i);
      for (var u = 0; u < jr.length; u++) {
        var s = jr[u];
        s.blockedOn === e && (s.blockedOn = null);
      }
      for (; jr.length > 0; ) {
        var f = jr[0];
        if (f.blockedOn !== null)
          break;
        qd(f), f.blockedOn === null && jr.shift();
      }
    }
    var fr = E.ReactCurrentBatchConfig, Dt = !0;
    function qn(e) {
      Dt = !!e;
    }
    function Pn() {
      return Dt;
    }
    function dr(e, t, a) {
      var i = pf(t), u;
      switch (i) {
        case zr:
          u = Ea;
          break;
        case _i:
          u = bo;
          break;
        case ja:
        default:
          u = Dn;
          break;
      }
      return u.bind(null, t, a, e);
    }
    function Ea(e, t, a, i) {
      var u = Va(), s = fr.transition;
      fr.transition = null;
      try {
        Vn(zr), Dn(e, t, a, i);
      } finally {
        Vn(u), fr.transition = s;
      }
    }
    function bo(e, t, a, i) {
      var u = Va(), s = fr.transition;
      fr.transition = null;
      try {
        Vn(_i), Dn(e, t, a, i);
      } finally {
        Vn(u), fr.transition = s;
      }
    }
    function Dn(e, t, a, i) {
      Dt && Hs(e, t, a, i);
    }
    function Hs(e, t, a, i) {
      var u = xo(e, t, a, i);
      if (u === null) {
        Ky(e, t, i, ki, a), Kd(e, i);
        return;
      }
      if (Oy(u, e, t, a, i)) {
        i.stopPropagation();
        return;
      }
      if (Kd(e, i), t & Oa && ph(e)) {
        for (; u !== null; ) {
          var s = Mo(u);
          s !== null && ky(s);
          var f = xo(e, t, a, i);
          if (f === null && Ky(e, t, i, ki, a), f === u)
            break;
          u = f;
        }
        u !== null && i.stopPropagation();
        return;
      }
      Ky(e, t, i, null, a);
    }
    var ki = null;
    function xo(e, t, a, i) {
      ki = null;
      var u = wd(i), s = Xs(u);
      if (s !== null) {
        var f = ma(s);
        if (f === null)
          s = null;
        else {
          var p = f.tag;
          if (p === ge) {
            var v = Ti(f);
            if (v !== null)
              return v;
            s = null;
          } else if (p === V) {
            var S = f.stateNode;
            if (cf(S))
              return bi(f);
            s = null;
          } else f !== s && (s = null);
        }
      }
      return ki = s, null;
    }
    function pf(e) {
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
          return zr;
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
          return _i;
        case "message": {
          var t = Ac();
          switch (t) {
            case ms:
              return zr;
            case Ul:
              return _i;
            case qi:
            case Ny:
              return ja;
            case gu:
              return Fa;
            default:
              return ja;
          }
        }
        default:
          return ja;
      }
    }
    function Bs(e, t, a) {
      return e.addEventListener(t, a, !1), a;
    }
    function la(e, t, a) {
      return e.addEventListener(t, a, !0), a;
    }
    function Jd(e, t, a, i) {
      return e.addEventListener(t, a, {
        capture: !0,
        passive: i
      }), a;
    }
    function _o(e, t, a, i) {
      return e.addEventListener(t, a, {
        passive: i
      }), a;
    }
    var Ca = null, Do = null, Lu = null;
    function Pl(e) {
      return Ca = e, Do = Is(), !0;
    }
    function vf() {
      Ca = null, Do = null, Lu = null;
    }
    function el() {
      if (Lu)
        return Lu;
      var e, t = Do, a = t.length, i, u = Is(), s = u.length;
      for (e = 0; e < a && t[e] === u[e]; e++)
        ;
      var f = a - e;
      for (i = 1; i <= f && t[a - i] === u[s - i]; i++)
        ;
      var p = i > 1 ? 1 - i : void 0;
      return Lu = u.slice(e, p), Lu;
    }
    function Is() {
      return "value" in Ca ? Ca.value : Ca.textContent;
    }
    function Hl(e) {
      var t, a = e.keyCode;
      return "charCode" in e ? (t = e.charCode, t === 0 && a === 13 && (t = 13)) : t = a, t === 10 && (t = 13), t >= 32 || t === 13 ? t : 0;
    }
    function No() {
      return !0;
    }
    function $s() {
      return !1;
    }
    function Nr(e) {
      function t(a, i, u, s, f) {
        this._reactName = a, this._targetInst = u, this.type = i, this.nativeEvent = s, this.target = f, this.currentTarget = null;
        for (var p in e)
          if (e.hasOwnProperty(p)) {
            var v = e[p];
            v ? this[p] = v(s) : this[p] = s[p];
          }
        var S = s.defaultPrevented != null ? s.defaultPrevented : s.returnValue === !1;
        return S ? this.isDefaultPrevented = No : this.isDefaultPrevented = $s, this.isPropagationStopped = $s, this;
      }
      return mt(t.prototype, {
        preventDefault: function() {
          this.defaultPrevented = !0;
          var a = this.nativeEvent;
          a && (a.preventDefault ? a.preventDefault() : typeof a.returnValue != "unknown" && (a.returnValue = !1), this.isDefaultPrevented = No);
        },
        stopPropagation: function() {
          var a = this.nativeEvent;
          a && (a.stopPropagation ? a.stopPropagation() : typeof a.cancelBubble != "unknown" && (a.cancelBubble = !0), this.isPropagationStopped = No);
        },
        /**
         * We release all dispatched `SyntheticEvent`s after each event loop, adding
         * them back into the pool. This allows a way to hold onto a reference that
         * won't be added back into the pool.
         */
        persist: function() {
        },
        /**
         * Checks if this event should be released back into the pool.
         *
         * @return {boolean} True if this should not be released, false otherwise.
         */
        isPersistent: No
      }), t;
    }
    var Hn = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function(e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0
    }, Oi = Nr(Hn), Fr = mt({}, Hn, {
      view: 0,
      detail: 0
    }), ua = Nr(Fr), hf, Ys, Mu;
    function My(e) {
      e !== Mu && (Mu && e.type === "mousemove" ? (hf = e.screenX - Mu.screenX, Ys = e.screenY - Mu.screenY) : (hf = 0, Ys = 0), Mu = e);
    }
    var ui = mt({}, Fr, {
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      pageX: 0,
      pageY: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      getModifierState: hn,
      button: 0,
      buttons: 0,
      relatedTarget: function(e) {
        return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
      },
      movementX: function(e) {
        return "movementX" in e ? e.movementX : (My(e), hf);
      },
      movementY: function(e) {
        return "movementY" in e ? e.movementY : Ys;
      }
    }), Zd = Nr(ui), ep = mt({}, ui, {
      dataTransfer: 0
    }), Uu = Nr(ep), tp = mt({}, Fr, {
      relatedTarget: 0
    }), tl = Nr(tp), hh = mt({}, Hn, {
      animationName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), mh = Nr(hh), np = mt({}, Hn, {
      clipboardData: function(e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData;
      }
    }), mf = Nr(np), Uy = mt({}, Hn, {
      data: 0
    }), yh = Nr(Uy), gh = yh, Sh = {
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
    }, zu = {
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
    };
    function zy(e) {
      if (e.key) {
        var t = Sh[e.key] || e.key;
        if (t !== "Unidentified")
          return t;
      }
      if (e.type === "keypress") {
        var a = Hl(e);
        return a === 13 ? "Enter" : String.fromCharCode(a);
      }
      return e.type === "keydown" || e.type === "keyup" ? zu[e.keyCode] || "Unidentified" : "";
    }
    var ko = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey"
    };
    function Eh(e) {
      var t = this, a = t.nativeEvent;
      if (a.getModifierState)
        return a.getModifierState(e);
      var i = ko[e];
      return i ? !!a[i] : !1;
    }
    function hn(e) {
      return Eh;
    }
    var Ay = mt({}, Fr, {
      key: zy,
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: hn,
      // Legacy Interface
      charCode: function(e) {
        return e.type === "keypress" ? Hl(e) : 0;
      },
      keyCode: function(e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      },
      which: function(e) {
        return e.type === "keypress" ? Hl(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      }
    }), Ch = Nr(Ay), jy = mt({}, ui, {
      pointerId: 0,
      width: 0,
      height: 0,
      pressure: 0,
      tangentialPressure: 0,
      tiltX: 0,
      tiltY: 0,
      twist: 0,
      pointerType: 0,
      isPrimary: 0
    }), Rh = Nr(jy), wh = mt({}, Fr, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: hn
    }), Th = Nr(wh), Fy = mt({}, Hn, {
      propertyName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), Pa = Nr(Fy), rp = mt({}, ui, {
      deltaX: function(e) {
        return "deltaX" in e ? e.deltaX : (
          // Fallback to `wheelDeltaX` for Webkit and normalize (right is positive).
          "wheelDeltaX" in e ? -e.wheelDeltaX : 0
        );
      },
      deltaY: function(e) {
        return "deltaY" in e ? e.deltaY : (
          // Fallback to `wheelDeltaY` for Webkit and normalize (down is positive).
          "wheelDeltaY" in e ? -e.wheelDeltaY : (
            // Fallback to `wheelDelta` for IE<9 and normalize (down is positive).
            "wheelDelta" in e ? -e.wheelDelta : 0
          )
        );
      },
      deltaZ: 0,
      // Browsers without "deltaMode" is reporting in raw wheel delta where one
      // notch on the scroll is always +/- 120, roughly equivalent to pixels.
      // A good approximation of DOM_DELTA_LINE (1) is 5% of viewport size or
      // ~40 pixels, for DOM_DELTA_SCREEN (2) it is 87.5% of viewport size.
      deltaMode: 0
    }), Vy = Nr(rp), Bl = [9, 13, 27, 32], Ws = 229, nl = On && "CompositionEvent" in window, Il = null;
    On && "documentMode" in document && (Il = document.documentMode);
    var ap = On && "TextEvent" in window && !Il, yf = On && (!nl || Il && Il > 8 && Il <= 11), bh = 32, gf = String.fromCharCode(bh);
    function Py() {
      ht("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), ht("onCompositionEnd", ["compositionend", "focusout", "keydown", "keypress", "keyup", "mousedown"]), ht("onCompositionStart", ["compositionstart", "focusout", "keydown", "keypress", "keyup", "mousedown"]), ht("onCompositionUpdate", ["compositionupdate", "focusout", "keydown", "keypress", "keyup", "mousedown"]);
    }
    var ip = !1;
    function xh(e) {
      return (e.ctrlKey || e.altKey || e.metaKey) && // ctrlKey && altKey is equivalent to AltGr, and is not a command.
      !(e.ctrlKey && e.altKey);
    }
    function Sf(e) {
      switch (e) {
        case "compositionstart":
          return "onCompositionStart";
        case "compositionend":
          return "onCompositionEnd";
        case "compositionupdate":
          return "onCompositionUpdate";
      }
    }
    function Ef(e, t) {
      return e === "keydown" && t.keyCode === Ws;
    }
    function lp(e, t) {
      switch (e) {
        case "keyup":
          return Bl.indexOf(t.keyCode) !== -1;
        case "keydown":
          return t.keyCode !== Ws;
        case "keypress":
        case "mousedown":
        case "focusout":
          return !0;
        default:
          return !1;
      }
    }
    function Cf(e) {
      var t = e.detail;
      return typeof t == "object" && "data" in t ? t.data : null;
    }
    function _h(e) {
      return e.locale === "ko";
    }
    var Au = !1;
    function up(e, t, a, i, u) {
      var s, f;
      if (nl ? s = Sf(t) : Au ? lp(t, i) && (s = "onCompositionEnd") : Ef(t, i) && (s = "onCompositionStart"), !s)
        return null;
      yf && !_h(i) && (!Au && s === "onCompositionStart" ? Au = Pl(u) : s === "onCompositionEnd" && Au && (f = el()));
      var p = Uh(a, s);
      if (p.length > 0) {
        var v = new yh(s, t, null, i, u);
        if (e.push({
          event: v,
          listeners: p
        }), f)
          v.data = f;
        else {
          var S = Cf(i);
          S !== null && (v.data = S);
        }
      }
    }
    function Rf(e, t) {
      switch (e) {
        case "compositionend":
          return Cf(t);
        case "keypress":
          var a = t.which;
          return a !== bh ? null : (ip = !0, gf);
        case "textInput":
          var i = t.data;
          return i === gf && ip ? null : i;
        default:
          return null;
      }
    }
    function op(e, t) {
      if (Au) {
        if (e === "compositionend" || !nl && lp(e, t)) {
          var a = el();
          return vf(), Au = !1, a;
        }
        return null;
      }
      switch (e) {
        case "paste":
          return null;
        case "keypress":
          if (!xh(t)) {
            if (t.char && t.char.length > 1)
              return t.char;
            if (t.which)
              return String.fromCharCode(t.which);
          }
          return null;
        case "compositionend":
          return yf && !_h(t) ? null : t.data;
        default:
          return null;
      }
    }
    function wf(e, t, a, i, u) {
      var s;
      if (ap ? s = Rf(t, i) : s = op(t, i), !s)
        return null;
      var f = Uh(a, "onBeforeInput");
      if (f.length > 0) {
        var p = new gh("onBeforeInput", "beforeinput", null, i, u);
        e.push({
          event: p,
          listeners: f
        }), p.data = s;
      }
    }
    function Dh(e, t, a, i, u, s, f) {
      up(e, t, a, i, u), wf(e, t, a, i, u);
    }
    var Hy = {
      color: !0,
      date: !0,
      datetime: !0,
      "datetime-local": !0,
      email: !0,
      month: !0,
      number: !0,
      password: !0,
      range: !0,
      search: !0,
      tel: !0,
      text: !0,
      time: !0,
      url: !0,
      week: !0
    };
    function Qs(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t === "input" ? !!Hy[e.type] : t === "textarea";
    }
    /**
     * Checks if an event is supported in the current execution environment.
     *
     * NOTE: This will not work correctly for non-generic events such as `change`,
     * `reset`, `load`, `error`, and `select`.
     *
     * Borrows from Modernizr.
     *
     * @param {string} eventNameSuffix Event name, e.g. "click".
     * @return {boolean} True if the event is supported.
     * @internal
     * @license Modernizr 3.0.0pre (Custom Build) | MIT
     */
    function By(e) {
      if (!On)
        return !1;
      var t = "on" + e, a = t in document;
      if (!a) {
        var i = document.createElement("div");
        i.setAttribute(t, "return;"), a = typeof i[t] == "function";
      }
      return a;
    }
    function Gs() {
      ht("onChange", ["change", "click", "focusin", "focusout", "input", "keydown", "keyup", "selectionchange"]);
    }
    function Nh(e, t, a, i) {
      po(i);
      var u = Uh(t, "onChange");
      if (u.length > 0) {
        var s = new Oi("onChange", "change", null, a, i);
        e.push({
          event: s,
          listeners: u
        });
      }
    }
    var $l = null, n = null;
    function r(e) {
      var t = e.nodeName && e.nodeName.toLowerCase();
      return t === "select" || t === "input" && e.type === "file";
    }
    function l(e) {
      var t = [];
      Nh(t, n, e, wd(e)), Hv(o, t);
    }
    function o(e) {
      oC(e, 0);
    }
    function c(e) {
      var t = Nf(e);
      if (gi(t))
        return e;
    }
    function d(e, t) {
      if (e === "change")
        return t;
    }
    var y = !1;
    On && (y = By("input") && (!document.documentMode || document.documentMode > 9));
    function w(e, t) {
      $l = e, n = t, $l.attachEvent("onpropertychange", I);
    }
    function _() {
      $l && ($l.detachEvent("onpropertychange", I), $l = null, n = null);
    }
    function I(e) {
      e.propertyName === "value" && c(n) && l(e);
    }
    function ne(e, t, a) {
      e === "focusin" ? (_(), w(t, a)) : e === "focusout" && _();
    }
    function oe(e, t) {
      if (e === "selectionchange" || e === "keyup" || e === "keydown")
        return c(n);
    }
    function te(e) {
      var t = e.nodeName;
      return t && t.toLowerCase() === "input" && (e.type === "checkbox" || e.type === "radio");
    }
    function xe(e, t) {
      if (e === "click")
        return c(t);
    }
    function Oe(e, t) {
      if (e === "input" || e === "change")
        return c(t);
    }
    function Ue(e) {
      var t = e._wrapperState;
      !t || !t.controlled || e.type !== "number" || We(e, "number", e.value);
    }
    function Nn(e, t, a, i, u, s, f) {
      var p = a ? Nf(a) : window, v, S;
      if (r(p) ? v = d : Qs(p) ? y ? v = Oe : (v = oe, S = ne) : te(p) && (v = xe), v) {
        var R = v(t, a);
        if (R) {
          Nh(e, R, i, u);
          return;
        }
      }
      S && S(t, p, a), t === "focusout" && Ue(p);
    }
    function M() {
      Gt("onMouseEnter", ["mouseout", "mouseover"]), Gt("onMouseLeave", ["mouseout", "mouseover"]), Gt("onPointerEnter", ["pointerout", "pointerover"]), Gt("onPointerLeave", ["pointerout", "pointerover"]);
    }
    function k(e, t, a, i, u, s, f) {
      var p = t === "mouseover" || t === "pointerover", v = t === "mouseout" || t === "pointerout";
      if (p && !cs(i)) {
        var S = i.relatedTarget || i.fromElement;
        if (S && (Xs(S) || Rp(S)))
          return;
      }
      if (!(!v && !p)) {
        var R;
        if (u.window === u)
          R = u;
        else {
          var O = u.ownerDocument;
          O ? R = O.defaultView || O.parentWindow : R = window;
        }
        var D, H;
        if (v) {
          var $ = i.relatedTarget || i.toElement;
          if (D = a, H = $ ? Xs($) : null, H !== null) {
            var W = ma(H);
            (H !== W || H.tag !== le && H.tag !== ve) && (H = null);
          }
        } else
          D = null, H = a;
        if (D !== H) {
          var we = Zd, Qe = "onMouseLeave", Ve = "onMouseEnter", kt = "mouse";
          (t === "pointerout" || t === "pointerover") && (we = Rh, Qe = "onPointerLeave", Ve = "onPointerEnter", kt = "pointer");
          var Tt = D == null ? R : Nf(D), U = H == null ? R : Nf(H), Q = new we(Qe, kt + "leave", D, i, u);
          Q.target = Tt, Q.relatedTarget = U;
          var z = null, se = Xs(u);
          if (se === a) {
            var De = new we(Ve, kt + "enter", H, i, u);
            De.target = U, De.relatedTarget = Tt, z = De;
          }
          DT(e, Q, z, D, H);
        }
      }
    }
    function j(e, t) {
      return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
    }
    var re = typeof Object.is == "function" ? Object.is : j;
    function Le(e, t) {
      if (re(e, t))
        return !0;
      if (typeof e != "object" || e === null || typeof t != "object" || t === null)
        return !1;
      var a = Object.keys(e), i = Object.keys(t);
      if (a.length !== i.length)
        return !1;
      for (var u = 0; u < a.length; u++) {
        var s = a[u];
        if (!kr.call(t, s) || !re(e[s], t[s]))
          return !1;
      }
      return !0;
    }
    function Ke(e) {
      for (; e && e.firstChild; )
        e = e.firstChild;
      return e;
    }
    function Xe(e) {
      for (; e; ) {
        if (e.nextSibling)
          return e.nextSibling;
        e = e.parentNode;
      }
    }
    function at(e, t) {
      for (var a = Ke(e), i = 0, u = 0; a; ) {
        if (a.nodeType === Yi) {
          if (u = i + a.textContent.length, i <= t && u >= t)
            return {
              node: a,
              offset: t - i
            };
          i = u;
        }
        a = Ke(Xe(a));
      }
    }
    function rr(e) {
      var t = e.ownerDocument, a = t && t.defaultView || window, i = a.getSelection && a.getSelection();
      if (!i || i.rangeCount === 0)
        return null;
      var u = i.anchorNode, s = i.anchorOffset, f = i.focusNode, p = i.focusOffset;
      try {
        u.nodeType, f.nodeType;
      } catch {
        return null;
      }
      return Ht(e, u, s, f, p);
    }
    function Ht(e, t, a, i, u) {
      var s = 0, f = -1, p = -1, v = 0, S = 0, R = e, O = null;
      e: for (; ; ) {
        for (var D = null; R === t && (a === 0 || R.nodeType === Yi) && (f = s + a), R === i && (u === 0 || R.nodeType === Yi) && (p = s + u), R.nodeType === Yi && (s += R.nodeValue.length), (D = R.firstChild) !== null; )
          O = R, R = D;
        for (; ; ) {
          if (R === e)
            break e;
          if (O === t && ++v === a && (f = s), O === i && ++S === u && (p = s), (D = R.nextSibling) !== null)
            break;
          R = O, O = R.parentNode;
        }
        R = D;
      }
      return f === -1 || p === -1 ? null : {
        start: f,
        end: p
      };
    }
    function Yl(e, t) {
      var a = e.ownerDocument || document, i = a && a.defaultView || window;
      if (i.getSelection) {
        var u = i.getSelection(), s = e.textContent.length, f = Math.min(t.start, s), p = t.end === void 0 ? f : Math.min(t.end, s);
        if (!u.extend && f > p) {
          var v = p;
          p = f, f = v;
        }
        var S = at(e, f), R = at(e, p);
        if (S && R) {
          if (u.rangeCount === 1 && u.anchorNode === S.node && u.anchorOffset === S.offset && u.focusNode === R.node && u.focusOffset === R.offset)
            return;
          var O = a.createRange();
          O.setStart(S.node, S.offset), u.removeAllRanges(), f > p ? (u.addRange(O), u.extend(R.node, R.offset)) : (O.setEnd(R.node, R.offset), u.addRange(O));
        }
      }
    }
    function kh(e) {
      return e && e.nodeType === Yi;
    }
    function XE(e, t) {
      return !e || !t ? !1 : e === t ? !0 : kh(e) ? !1 : kh(t) ? XE(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1;
    }
    function cT(e) {
      return e && e.ownerDocument && XE(e.ownerDocument.documentElement, e);
    }
    function fT(e) {
      try {
        return typeof e.contentWindow.location.href == "string";
      } catch {
        return !1;
      }
    }
    function JE() {
      for (var e = window, t = ka(); t instanceof e.HTMLIFrameElement; ) {
        if (fT(t))
          e = t.contentWindow;
        else
          return t;
        t = ka(e.document);
      }
      return t;
    }
    function Iy(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
    }
    function dT() {
      var e = JE();
      return {
        focusedElem: e,
        selectionRange: Iy(e) ? vT(e) : null
      };
    }
    function pT(e) {
      var t = JE(), a = e.focusedElem, i = e.selectionRange;
      if (t !== a && cT(a)) {
        i !== null && Iy(a) && hT(a, i);
        for (var u = [], s = a; s = s.parentNode; )
          s.nodeType === Xr && u.push({
            element: s,
            left: s.scrollLeft,
            top: s.scrollTop
          });
        typeof a.focus == "function" && a.focus();
        for (var f = 0; f < u.length; f++) {
          var p = u[f];
          p.element.scrollLeft = p.left, p.element.scrollTop = p.top;
        }
      }
    }
    function vT(e) {
      var t;
      return "selectionStart" in e ? t = {
        start: e.selectionStart,
        end: e.selectionEnd
      } : t = rr(e), t || {
        start: 0,
        end: 0
      };
    }
    function hT(e, t) {
      var a = t.start, i = t.end;
      i === void 0 && (i = a), "selectionStart" in e ? (e.selectionStart = a, e.selectionEnd = Math.min(i, e.value.length)) : Yl(e, t);
    }
    var mT = On && "documentMode" in document && document.documentMode <= 11;
    function yT() {
      ht("onSelect", ["focusout", "contextmenu", "dragend", "focusin", "keydown", "keyup", "mousedown", "mouseup", "selectionchange"]);
    }
    var Tf = null, $y = null, sp = null, Yy = !1;
    function gT(e) {
      if ("selectionStart" in e && Iy(e))
        return {
          start: e.selectionStart,
          end: e.selectionEnd
        };
      var t = e.ownerDocument && e.ownerDocument.defaultView || window, a = t.getSelection();
      return {
        anchorNode: a.anchorNode,
        anchorOffset: a.anchorOffset,
        focusNode: a.focusNode,
        focusOffset: a.focusOffset
      };
    }
    function ST(e) {
      return e.window === e ? e.document : e.nodeType === Wi ? e : e.ownerDocument;
    }
    function ZE(e, t, a) {
      var i = ST(a);
      if (!(Yy || Tf == null || Tf !== ka(i))) {
        var u = gT(Tf);
        if (!sp || !Le(sp, u)) {
          sp = u;
          var s = Uh($y, "onSelect");
          if (s.length > 0) {
            var f = new Oi("onSelect", "select", null, t, a);
            e.push({
              event: f,
              listeners: s
            }), f.target = Tf;
          }
        }
      }
    }
    function ET(e, t, a, i, u, s, f) {
      var p = a ? Nf(a) : window;
      switch (t) {
        case "focusin":
          (Qs(p) || p.contentEditable === "true") && (Tf = p, $y = a, sp = null);
          break;
        case "focusout":
          Tf = null, $y = null, sp = null;
          break;
        case "mousedown":
          Yy = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Yy = !1, ZE(e, i, u);
          break;
        case "selectionchange":
          if (mT)
            break;
        case "keydown":
        case "keyup":
          ZE(e, i, u);
      }
    }
    function Oh(e, t) {
      var a = {};
      return a[e.toLowerCase()] = t.toLowerCase(), a["Webkit" + e] = "webkit" + t, a["Moz" + e] = "moz" + t, a;
    }
    var bf = {
      animationend: Oh("Animation", "AnimationEnd"),
      animationiteration: Oh("Animation", "AnimationIteration"),
      animationstart: Oh("Animation", "AnimationStart"),
      transitionend: Oh("Transition", "TransitionEnd")
    }, Wy = {}, eC = {};
    On && (eC = document.createElement("div").style, "AnimationEvent" in window || (delete bf.animationend.animation, delete bf.animationiteration.animation, delete bf.animationstart.animation), "TransitionEvent" in window || delete bf.transitionend.transition);
    function Lh(e) {
      if (Wy[e])
        return Wy[e];
      if (!bf[e])
        return e;
      var t = bf[e];
      for (var a in t)
        if (t.hasOwnProperty(a) && a in eC)
          return Wy[e] = t[a];
      return e;
    }
    var tC = Lh("animationend"), nC = Lh("animationiteration"), rC = Lh("animationstart"), aC = Lh("transitionend"), iC = /* @__PURE__ */ new Map(), lC = ["abort", "auxClick", "cancel", "canPlay", "canPlayThrough", "click", "close", "contextMenu", "copy", "cut", "drag", "dragEnd", "dragEnter", "dragExit", "dragLeave", "dragOver", "dragStart", "drop", "durationChange", "emptied", "encrypted", "ended", "error", "gotPointerCapture", "input", "invalid", "keyDown", "keyPress", "keyUp", "load", "loadedData", "loadedMetadata", "loadStart", "lostPointerCapture", "mouseDown", "mouseMove", "mouseOut", "mouseOver", "mouseUp", "paste", "pause", "play", "playing", "pointerCancel", "pointerDown", "pointerMove", "pointerOut", "pointerOver", "pointerUp", "progress", "rateChange", "reset", "resize", "seeked", "seeking", "stalled", "submit", "suspend", "timeUpdate", "touchCancel", "touchEnd", "touchStart", "volumeChange", "scroll", "toggle", "touchMove", "waiting", "wheel"];
    function Oo(e, t) {
      iC.set(e, t), ht(t, [e]);
    }
    function CT() {
      for (var e = 0; e < lC.length; e++) {
        var t = lC[e], a = t.toLowerCase(), i = t[0].toUpperCase() + t.slice(1);
        Oo(a, "on" + i);
      }
      Oo(tC, "onAnimationEnd"), Oo(nC, "onAnimationIteration"), Oo(rC, "onAnimationStart"), Oo("dblclick", "onDoubleClick"), Oo("focusin", "onFocus"), Oo("focusout", "onBlur"), Oo(aC, "onTransitionEnd");
    }
    function RT(e, t, a, i, u, s, f) {
      var p = iC.get(t);
      if (p !== void 0) {
        var v = Oi, S = t;
        switch (t) {
          case "keypress":
            if (Hl(i) === 0)
              return;
          case "keydown":
          case "keyup":
            v = Ch;
            break;
          case "focusin":
            S = "focus", v = tl;
            break;
          case "focusout":
            S = "blur", v = tl;
            break;
          case "beforeblur":
          case "afterblur":
            v = tl;
            break;
          case "click":
            if (i.button === 2)
              return;
          case "auxclick":
          case "dblclick":
          case "mousedown":
          case "mousemove":
          case "mouseup":
          case "mouseout":
          case "mouseover":
          case "contextmenu":
            v = Zd;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            v = Uu;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            v = Th;
            break;
          case tC:
          case nC:
          case rC:
            v = mh;
            break;
          case aC:
            v = Pa;
            break;
          case "scroll":
            v = ua;
            break;
          case "wheel":
            v = Vy;
            break;
          case "copy":
          case "cut":
          case "paste":
            v = mf;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            v = Rh;
            break;
        }
        var R = (s & Oa) !== 0;
        {
          var O = !R && // TODO: ideally, we'd eventually add all events from
          // nonDelegatedEvents list in DOMPluginEventSystem.
          // Then we can remove this special list.
          // This is a breaking change that can wait until React 18.
          t === "scroll", D = xT(a, p, i.type, R, O);
          if (D.length > 0) {
            var H = new v(p, S, null, i, u);
            e.push({
              event: H,
              listeners: D
            });
          }
        }
      }
    }
    CT(), M(), Gs(), yT(), Py();
    function wT(e, t, a, i, u, s, f) {
      RT(e, t, a, i, u, s);
      var p = (s & Rd) === 0;
      p && (k(e, t, a, i, u), Nn(e, t, a, i, u), ET(e, t, a, i, u), Dh(e, t, a, i, u));
    }
    var cp = ["abort", "canplay", "canplaythrough", "durationchange", "emptied", "encrypted", "ended", "error", "loadeddata", "loadedmetadata", "loadstart", "pause", "play", "playing", "progress", "ratechange", "resize", "seeked", "seeking", "stalled", "suspend", "timeupdate", "volumechange", "waiting"], Qy = new Set(["cancel", "close", "invalid", "load", "scroll", "toggle"].concat(cp));
    function uC(e, t, a) {
      var i = e.type || "unknown-event";
      e.currentTarget = a, Ci(i, t, void 0, e), e.currentTarget = null;
    }
    function TT(e, t, a) {
      var i;
      if (a)
        for (var u = t.length - 1; u >= 0; u--) {
          var s = t[u], f = s.instance, p = s.currentTarget, v = s.listener;
          if (f !== i && e.isPropagationStopped())
            return;
          uC(e, v, p), i = f;
        }
      else
        for (var S = 0; S < t.length; S++) {
          var R = t[S], O = R.instance, D = R.currentTarget, H = R.listener;
          if (O !== i && e.isPropagationStopped())
            return;
          uC(e, H, D), i = O;
        }
    }
    function oC(e, t) {
      for (var a = (t & Oa) !== 0, i = 0; i < e.length; i++) {
        var u = e[i], s = u.event, f = u.listeners;
        TT(s, f, a);
      }
      ps();
    }
    function bT(e, t, a, i, u) {
      var s = wd(a), f = [];
      wT(f, e, i, a, s, t), oC(f, t);
    }
    function Cn(e, t) {
      Qy.has(e) || g('Did not expect a listenToNonDelegatedEvent() call for "%s". This is a bug in React. Please file an issue.', e);
      var a = !1, i = tx(t), u = NT(e);
      i.has(u) || (sC(t, e, wc, a), i.add(u));
    }
    function Gy(e, t, a) {
      Qy.has(e) && !t && g('Did not expect a listenToNativeEvent() call for "%s" in the bubble phase. This is a bug in React. Please file an issue.', e);
      var i = 0;
      t && (i |= Oa), sC(a, e, i, t);
    }
    var Mh = "_reactListening" + Math.random().toString(36).slice(2);
    function fp(e) {
      if (!e[Mh]) {
        e[Mh] = !0, ct.forEach(function(a) {
          a !== "selectionchange" && (Qy.has(a) || Gy(a, !1, e), Gy(a, !0, e));
        });
        var t = e.nodeType === Wi ? e : e.ownerDocument;
        t !== null && (t[Mh] || (t[Mh] = !0, Gy("selectionchange", !1, t)));
      }
    }
    function sC(e, t, a, i, u) {
      var s = dr(e, t, a), f = void 0;
      ds && (t === "touchstart" || t === "touchmove" || t === "wheel") && (f = !0), e = e, i ? f !== void 0 ? Jd(e, t, s, f) : la(e, t, s) : f !== void 0 ? _o(e, t, s, f) : Bs(e, t, s);
    }
    function cC(e, t) {
      return e === t || e.nodeType === Un && e.parentNode === t;
    }
    function Ky(e, t, a, i, u) {
      var s = i;
      if (!(t & Cd) && !(t & wc)) {
        var f = u;
        if (i !== null) {
          var p = i;
          e: for (; ; ) {
            if (p === null)
              return;
            var v = p.tag;
            if (v === V || v === X) {
              var S = p.stateNode.containerInfo;
              if (cC(S, f))
                break;
              if (v === X)
                for (var R = p.return; R !== null; ) {
                  var O = R.tag;
                  if (O === V || O === X) {
                    var D = R.stateNode.containerInfo;
                    if (cC(D, f))
                      return;
                  }
                  R = R.return;
                }
              for (; S !== null; ) {
                var H = Xs(S);
                if (H === null)
                  return;
                var $ = H.tag;
                if ($ === le || $ === ve) {
                  p = s = H;
                  continue e;
                }
                S = S.parentNode;
              }
            }
            p = p.return;
          }
        }
      }
      Hv(function() {
        return bT(e, t, a, s);
      });
    }
    function dp(e, t, a) {
      return {
        instance: e,
        listener: t,
        currentTarget: a
      };
    }
    function xT(e, t, a, i, u, s) {
      for (var f = t !== null ? t + "Capture" : null, p = i ? f : t, v = [], S = e, R = null; S !== null; ) {
        var O = S, D = O.stateNode, H = O.tag;
        if (H === le && D !== null && (R = D, p !== null)) {
          var $ = Dl(S, p);
          $ != null && v.push(dp(S, $, R));
        }
        if (u)
          break;
        S = S.return;
      }
      return v;
    }
    function Uh(e, t) {
      for (var a = t + "Capture", i = [], u = e; u !== null; ) {
        var s = u, f = s.stateNode, p = s.tag;
        if (p === le && f !== null) {
          var v = f, S = Dl(u, a);
          S != null && i.unshift(dp(u, S, v));
          var R = Dl(u, t);
          R != null && i.push(dp(u, R, v));
        }
        u = u.return;
      }
      return i;
    }
    function xf(e) {
      if (e === null)
        return null;
      do
        e = e.return;
      while (e && e.tag !== le);
      return e || null;
    }
    function _T(e, t) {
      for (var a = e, i = t, u = 0, s = a; s; s = xf(s))
        u++;
      for (var f = 0, p = i; p; p = xf(p))
        f++;
      for (; u - f > 0; )
        a = xf(a), u--;
      for (; f - u > 0; )
        i = xf(i), f--;
      for (var v = u; v--; ) {
        if (a === i || i !== null && a === i.alternate)
          return a;
        a = xf(a), i = xf(i);
      }
      return null;
    }
    function fC(e, t, a, i, u) {
      for (var s = t._reactName, f = [], p = a; p !== null && p !== i; ) {
        var v = p, S = v.alternate, R = v.stateNode, O = v.tag;
        if (S !== null && S === i)
          break;
        if (O === le && R !== null) {
          var D = R;
          if (u) {
            var H = Dl(p, s);
            H != null && f.unshift(dp(p, H, D));
          } else if (!u) {
            var $ = Dl(p, s);
            $ != null && f.push(dp(p, $, D));
          }
        }
        p = p.return;
      }
      f.length !== 0 && e.push({
        event: t,
        listeners: f
      });
    }
    function DT(e, t, a, i, u) {
      var s = i && u ? _T(i, u) : null;
      i !== null && fC(e, t, i, s, !1), u !== null && a !== null && fC(e, a, u, s, !0);
    }
    function NT(e, t) {
      return e + "__bubble";
    }
    var Ha = !1, pp = "dangerouslySetInnerHTML", zh = "suppressContentEditableWarning", Lo = "suppressHydrationWarning", dC = "autoFocus", Ks = "children", qs = "style", Ah = "__html", qy, jh, vp, pC, Fh, vC, hC;
    qy = {
      // There are working polyfills for <dialog>. Let people use it.
      dialog: !0,
      // Electron ships a custom <webview> tag to display external web content in
      // an isolated frame and process.
      // This tag is not present in non Electron environments such as JSDom which
      // is often used for testing purposes.
      // @see https://electronjs.org/docs/api/webview-tag
      webview: !0
    }, jh = function(e, t) {
      gd(e, t), Cc(e, t), Fv(e, t, {
        registrationNameDependencies: st,
        possibleRegistrationNames: ft
      });
    }, vC = On && !document.documentMode, vp = function(e, t, a) {
      if (!Ha) {
        var i = Vh(a), u = Vh(t);
        u !== i && (Ha = !0, g("Prop `%s` did not match. Server: %s Client: %s", e, JSON.stringify(u), JSON.stringify(i)));
      }
    }, pC = function(e) {
      if (!Ha) {
        Ha = !0;
        var t = [];
        e.forEach(function(a) {
          t.push(a);
        }), g("Extra attributes from the server: %s", t);
      }
    }, Fh = function(e, t) {
      t === !1 ? g("Expected `%s` listener to be a function, instead got `false`.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.", e, e, e) : g("Expected `%s` listener to be a function, instead got a value of `%s` type.", e, typeof t);
    }, hC = function(e, t) {
      var a = e.namespaceURI === $i ? e.ownerDocument.createElement(e.tagName) : e.ownerDocument.createElementNS(e.namespaceURI, e.tagName);
      return a.innerHTML = t, a.innerHTML;
    };
    var kT = /\r\n?/g, OT = /\u0000|\uFFFD/g;
    function Vh(e) {
      Jn(e);
      var t = typeof e == "string" ? e : "" + e;
      return t.replace(kT, `
`).replace(OT, "");
    }
    function Ph(e, t, a, i) {
      var u = Vh(t), s = Vh(e);
      if (s !== u && (i && (Ha || (Ha = !0, g('Text content did not match. Server: "%s" Client: "%s"', s, u))), a && ze))
        throw new Error("Text content does not match server-rendered HTML.");
    }
    function mC(e) {
      return e.nodeType === Wi ? e : e.ownerDocument;
    }
    function LT() {
    }
    function Hh(e) {
      e.onclick = LT;
    }
    function MT(e, t, a, i, u) {
      for (var s in i)
        if (i.hasOwnProperty(s)) {
          var f = i[s];
          if (s === qs)
            f && Object.freeze(f), Lv(t, f);
          else if (s === pp) {
            var p = f ? f[Ah] : void 0;
            p != null && Ev(t, p);
          } else if (s === Ks)
            if (typeof f == "string") {
              var v = e !== "textarea" || f !== "";
              v && oo(t, f);
            } else typeof f == "number" && oo(t, "" + f);
          else s === zh || s === Lo || s === dC || (st.hasOwnProperty(s) ? f != null && (typeof f != "function" && Fh(s, f), s === "onScroll" && Cn("scroll", t)) : f != null && Or(t, s, f, u));
        }
    }
    function UT(e, t, a, i) {
      for (var u = 0; u < t.length; u += 2) {
        var s = t[u], f = t[u + 1];
        s === qs ? Lv(e, f) : s === pp ? Ev(e, f) : s === Ks ? oo(e, f) : Or(e, s, f, i);
      }
    }
    function zT(e, t, a, i) {
      var u, s = mC(a), f, p = i;
      if (p === $i && (p = fd(e)), p === $i) {
        if (u = xl(e, t), !u && e !== e.toLowerCase() && g("<%s /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.", e), e === "script") {
          var v = s.createElement("div");
          v.innerHTML = "<script><\/script>";
          var S = v.firstChild;
          f = v.removeChild(S);
        } else if (typeof t.is == "string")
          f = s.createElement(e, {
            is: t.is
          });
        else if (f = s.createElement(e), e === "select") {
          var R = f;
          t.multiple ? R.multiple = !0 : t.size && (R.size = t.size);
        }
      } else
        f = s.createElementNS(p, e);
      return p === $i && !u && Object.prototype.toString.call(f) === "[object HTMLUnknownElement]" && !kr.call(qy, e) && (qy[e] = !0, g("The tag <%s> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.", e)), f;
    }
    function AT(e, t) {
      return mC(t).createTextNode(e);
    }
    function jT(e, t, a, i) {
      var u = xl(t, a);
      jh(t, a);
      var s;
      switch (t) {
        case "dialog":
          Cn("cancel", e), Cn("close", e), s = a;
          break;
        case "iframe":
        case "object":
        case "embed":
          Cn("load", e), s = a;
          break;
        case "video":
        case "audio":
          for (var f = 0; f < cp.length; f++)
            Cn(cp[f], e);
          s = a;
          break;
        case "source":
          Cn("error", e), s = a;
          break;
        case "img":
        case "image":
        case "link":
          Cn("error", e), Cn("load", e), s = a;
          break;
        case "details":
          Cn("toggle", e), s = a;
          break;
        case "input":
          ti(e, a), s = uo(e, a), Cn("invalid", e);
          break;
        case "option":
          Mt(e, a), s = a;
          break;
        case "select":
          cu(e, a), s = rs(e, a), Cn("invalid", e);
          break;
        case "textarea":
          od(e, a), s = ud(e, a), Cn("invalid", e);
          break;
        default:
          s = a;
      }
      switch (Sc(t, s), MT(t, e, i, s, u), t) {
        case "input":
          ei(e), B(e, a, !1);
          break;
        case "textarea":
          ei(e), gv(e);
          break;
        case "option":
          ln(e, a);
          break;
        case "select":
          id(e, a);
          break;
        default:
          typeof s.onClick == "function" && Hh(e);
          break;
      }
    }
    function FT(e, t, a, i, u) {
      jh(t, i);
      var s = null, f, p;
      switch (t) {
        case "input":
          f = uo(e, a), p = uo(e, i), s = [];
          break;
        case "select":
          f = rs(e, a), p = rs(e, i), s = [];
          break;
        case "textarea":
          f = ud(e, a), p = ud(e, i), s = [];
          break;
        default:
          f = a, p = i, typeof f.onClick != "function" && typeof p.onClick == "function" && Hh(e);
          break;
      }
      Sc(t, p);
      var v, S, R = null;
      for (v in f)
        if (!(p.hasOwnProperty(v) || !f.hasOwnProperty(v) || f[v] == null))
          if (v === qs) {
            var O = f[v];
            for (S in O)
              O.hasOwnProperty(S) && (R || (R = {}), R[S] = "");
          } else v === pp || v === Ks || v === zh || v === Lo || v === dC || (st.hasOwnProperty(v) ? s || (s = []) : (s = s || []).push(v, null));
      for (v in p) {
        var D = p[v], H = f != null ? f[v] : void 0;
        if (!(!p.hasOwnProperty(v) || D === H || D == null && H == null))
          if (v === qs)
            if (D && Object.freeze(D), H) {
              for (S in H)
                H.hasOwnProperty(S) && (!D || !D.hasOwnProperty(S)) && (R || (R = {}), R[S] = "");
              for (S in D)
                D.hasOwnProperty(S) && H[S] !== D[S] && (R || (R = {}), R[S] = D[S]);
            } else
              R || (s || (s = []), s.push(v, R)), R = D;
          else if (v === pp) {
            var $ = D ? D[Ah] : void 0, W = H ? H[Ah] : void 0;
            $ != null && W !== $ && (s = s || []).push(v, $);
          } else v === Ks ? (typeof D == "string" || typeof D == "number") && (s = s || []).push(v, "" + D) : v === zh || v === Lo || (st.hasOwnProperty(v) ? (D != null && (typeof D != "function" && Fh(v, D), v === "onScroll" && Cn("scroll", e)), !s && H !== D && (s = [])) : (s = s || []).push(v, D));
      }
      return R && (wy(R, p[qs]), (s = s || []).push(qs, R)), s;
    }
    function VT(e, t, a, i, u) {
      a === "input" && u.type === "radio" && u.name != null && h(e, u);
      var s = xl(a, i), f = xl(a, u);
      switch (UT(e, t, s, f), a) {
        case "input":
          T(e, u);
          break;
        case "textarea":
          yv(e, u);
          break;
        case "select":
          mc(e, u);
          break;
      }
    }
    function PT(e) {
      {
        var t = e.toLowerCase();
        return os.hasOwnProperty(t) && os[t] || null;
      }
    }
    function HT(e, t, a, i, u, s, f) {
      var p, v;
      switch (p = xl(t, a), jh(t, a), t) {
        case "dialog":
          Cn("cancel", e), Cn("close", e);
          break;
        case "iframe":
        case "object":
        case "embed":
          Cn("load", e);
          break;
        case "video":
        case "audio":
          for (var S = 0; S < cp.length; S++)
            Cn(cp[S], e);
          break;
        case "source":
          Cn("error", e);
          break;
        case "img":
        case "image":
        case "link":
          Cn("error", e), Cn("load", e);
          break;
        case "details":
          Cn("toggle", e);
          break;
        case "input":
          ti(e, a), Cn("invalid", e);
          break;
        case "option":
          Mt(e, a);
          break;
        case "select":
          cu(e, a), Cn("invalid", e);
          break;
        case "textarea":
          od(e, a), Cn("invalid", e);
          break;
      }
      Sc(t, a);
      {
        v = /* @__PURE__ */ new Set();
        for (var R = e.attributes, O = 0; O < R.length; O++) {
          var D = R[O].name.toLowerCase();
          switch (D) {
            case "value":
              break;
            case "checked":
              break;
            case "selected":
              break;
            default:
              v.add(R[O].name);
          }
        }
      }
      var H = null;
      for (var $ in a)
        if (a.hasOwnProperty($)) {
          var W = a[$];
          if ($ === Ks)
            typeof W == "string" ? e.textContent !== W && (a[Lo] !== !0 && Ph(e.textContent, W, s, f), H = [Ks, W]) : typeof W == "number" && e.textContent !== "" + W && (a[Lo] !== !0 && Ph(e.textContent, W, s, f), H = [Ks, "" + W]);
          else if (st.hasOwnProperty($))
            W != null && (typeof W != "function" && Fh($, W), $ === "onScroll" && Cn("scroll", e));
          else if (f && // Convince Flow we've calculated it (it's DEV-only in this method.)
          typeof p == "boolean") {
            var we = void 0, Qe = dn($);
            if (a[Lo] !== !0) {
              if (!($ === zh || $ === Lo || // Controlled attributes are not validated
              // TODO: Only ignore them on controlled tags.
              $ === "value" || $ === "checked" || $ === "selected")) {
                if ($ === pp) {
                  var Ve = e.innerHTML, kt = W ? W[Ah] : void 0;
                  if (kt != null) {
                    var Tt = hC(e, kt);
                    Tt !== Ve && vp($, Ve, Tt);
                  }
                } else if ($ === qs) {
                  if (v.delete($), vC) {
                    var U = Cy(W);
                    we = e.getAttribute("style"), U !== we && vp($, we, U);
                  }
                } else if (p && !L)
                  v.delete($.toLowerCase()), we = yl(e, $, W), W !== we && vp($, we, W);
                else if (!mn($, Qe, p) && !Zn($, W, Qe, p)) {
                  var Q = !1;
                  if (Qe !== null)
                    v.delete(Qe.attributeName), we = ml(e, $, W, Qe);
                  else {
                    var z = i;
                    if (z === $i && (z = fd(t)), z === $i)
                      v.delete($.toLowerCase());
                    else {
                      var se = PT($);
                      se !== null && se !== $ && (Q = !0, v.delete(se)), v.delete($);
                    }
                    we = yl(e, $, W);
                  }
                  var De = L;
                  !De && W !== we && !Q && vp($, we, W);
                }
              }
            }
          }
        }
      switch (f && // $FlowFixMe - Should be inferred as not undefined.
      v.size > 0 && a[Lo] !== !0 && pC(v), t) {
        case "input":
          ei(e), B(e, a, !0);
          break;
        case "textarea":
          ei(e), gv(e);
          break;
        case "select":
        case "option":
          break;
        default:
          typeof a.onClick == "function" && Hh(e);
          break;
      }
      return H;
    }
    function BT(e, t, a) {
      var i = e.nodeValue !== t;
      return i;
    }
    function Xy(e, t) {
      {
        if (Ha)
          return;
        Ha = !0, g("Did not expect server HTML to contain a <%s> in <%s>.", t.nodeName.toLowerCase(), e.nodeName.toLowerCase());
      }
    }
    function Jy(e, t) {
      {
        if (Ha)
          return;
        Ha = !0, g('Did not expect server HTML to contain the text node "%s" in <%s>.', t.nodeValue, e.nodeName.toLowerCase());
      }
    }
    function Zy(e, t, a) {
      {
        if (Ha)
          return;
        Ha = !0, g("Expected server HTML to contain a matching <%s> in <%s>.", t, e.nodeName.toLowerCase());
      }
    }
    function eg(e, t) {
      {
        if (t === "" || Ha)
          return;
        Ha = !0, g('Expected server HTML to contain a matching text node for "%s" in <%s>.', t, e.nodeName.toLowerCase());
      }
    }
    function IT(e, t, a) {
      switch (t) {
        case "input":
          Y(e, a);
          return;
        case "textarea":
          yy(e, a);
          return;
        case "select":
          ld(e, a);
          return;
      }
    }
    var hp = function() {
    }, mp = function() {
    };
    {
      var $T = ["address", "applet", "area", "article", "aside", "base", "basefont", "bgsound", "blockquote", "body", "br", "button", "caption", "center", "col", "colgroup", "dd", "details", "dir", "div", "dl", "dt", "embed", "fieldset", "figcaption", "figure", "footer", "form", "frame", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "iframe", "img", "input", "isindex", "li", "link", "listing", "main", "marquee", "menu", "menuitem", "meta", "nav", "noembed", "noframes", "noscript", "object", "ol", "p", "param", "plaintext", "pre", "script", "section", "select", "source", "style", "summary", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "title", "tr", "track", "ul", "wbr", "xmp"], yC = [
        "applet",
        "caption",
        "html",
        "table",
        "td",
        "th",
        "marquee",
        "object",
        "template",
        // https://html.spec.whatwg.org/multipage/syntax.html#html-integration-point
        // TODO: Distinguish by namespace here -- for <title>, including it here
        // errs on the side of fewer warnings
        "foreignObject",
        "desc",
        "title"
      ], YT = yC.concat(["button"]), WT = ["dd", "dt", "li", "option", "optgroup", "p", "rp", "rt"], gC = {
        current: null,
        formTag: null,
        aTagInScope: null,
        buttonTagInScope: null,
        nobrTagInScope: null,
        pTagInButtonScope: null,
        listItemTagAutoclosing: null,
        dlItemTagAutoclosing: null
      };
      mp = function(e, t) {
        var a = mt({}, e || gC), i = {
          tag: t
        };
        return yC.indexOf(t) !== -1 && (a.aTagInScope = null, a.buttonTagInScope = null, a.nobrTagInScope = null), YT.indexOf(t) !== -1 && (a.pTagInButtonScope = null), $T.indexOf(t) !== -1 && t !== "address" && t !== "div" && t !== "p" && (a.listItemTagAutoclosing = null, a.dlItemTagAutoclosing = null), a.current = i, t === "form" && (a.formTag = i), t === "a" && (a.aTagInScope = i), t === "button" && (a.buttonTagInScope = i), t === "nobr" && (a.nobrTagInScope = i), t === "p" && (a.pTagInButtonScope = i), t === "li" && (a.listItemTagAutoclosing = i), (t === "dd" || t === "dt") && (a.dlItemTagAutoclosing = i), a;
      };
      var QT = function(e, t) {
        switch (t) {
          case "select":
            return e === "option" || e === "optgroup" || e === "#text";
          case "optgroup":
            return e === "option" || e === "#text";
          case "option":
            return e === "#text";
          case "tr":
            return e === "th" || e === "td" || e === "style" || e === "script" || e === "template";
          case "tbody":
          case "thead":
          case "tfoot":
            return e === "tr" || e === "style" || e === "script" || e === "template";
          case "colgroup":
            return e === "col" || e === "template";
          case "table":
            return e === "caption" || e === "colgroup" || e === "tbody" || e === "tfoot" || e === "thead" || e === "style" || e === "script" || e === "template";
          case "head":
            return e === "base" || e === "basefont" || e === "bgsound" || e === "link" || e === "meta" || e === "title" || e === "noscript" || e === "noframes" || e === "style" || e === "script" || e === "template";
          case "html":
            return e === "head" || e === "body" || e === "frameset";
          case "frameset":
            return e === "frame";
          case "#document":
            return e === "html";
        }
        switch (e) {
          case "h1":
          case "h2":
          case "h3":
          case "h4":
          case "h5":
          case "h6":
            return t !== "h1" && t !== "h2" && t !== "h3" && t !== "h4" && t !== "h5" && t !== "h6";
          case "rp":
          case "rt":
            return WT.indexOf(t) === -1;
          case "body":
          case "caption":
          case "col":
          case "colgroup":
          case "frameset":
          case "frame":
          case "head":
          case "html":
          case "tbody":
          case "td":
          case "tfoot":
          case "th":
          case "thead":
          case "tr":
            return t == null;
        }
        return !0;
      }, GT = function(e, t) {
        switch (e) {
          case "address":
          case "article":
          case "aside":
          case "blockquote":
          case "center":
          case "details":
          case "dialog":
          case "dir":
          case "div":
          case "dl":
          case "fieldset":
          case "figcaption":
          case "figure":
          case "footer":
          case "header":
          case "hgroup":
          case "main":
          case "menu":
          case "nav":
          case "ol":
          case "p":
          case "section":
          case "summary":
          case "ul":
          case "pre":
          case "listing":
          case "table":
          case "hr":
          case "xmp":
          case "h1":
          case "h2":
          case "h3":
          case "h4":
          case "h5":
          case "h6":
            return t.pTagInButtonScope;
          case "form":
            return t.formTag || t.pTagInButtonScope;
          case "li":
            return t.listItemTagAutoclosing;
          case "dd":
          case "dt":
            return t.dlItemTagAutoclosing;
          case "button":
            return t.buttonTagInScope;
          case "a":
            return t.aTagInScope;
          case "nobr":
            return t.nobrTagInScope;
        }
        return null;
      }, SC = {};
      hp = function(e, t, a) {
        a = a || gC;
        var i = a.current, u = i && i.tag;
        t != null && (e != null && g("validateDOMNesting: when childText is passed, childTag should be null"), e = "#text");
        var s = QT(e, u) ? null : i, f = s ? null : GT(e, a), p = s || f;
        if (p) {
          var v = p.tag, S = !!s + "|" + e + "|" + v;
          if (!SC[S]) {
            SC[S] = !0;
            var R = e, O = "";
            if (e === "#text" ? /\S/.test(t) ? R = "Text nodes" : (R = "Whitespace text nodes", O = " Make sure you don't have any extra whitespace between tags on each line of your source code.") : R = "<" + e + ">", s) {
              var D = "";
              v === "table" && e === "tr" && (D += " Add a <tbody>, <thead> or <tfoot> to your code to match the DOM tree generated by the browser."), g("validateDOMNesting(...): %s cannot appear as a child of <%s>.%s%s", R, v, O, D);
            } else
              g("validateDOMNesting(...): %s cannot appear as a descendant of <%s>.", R, v);
          }
        }
      };
    }
    var Bh = "suppressHydrationWarning", Ih = "$", $h = "/$", yp = "$?", gp = "$!", KT = "style", tg = null, ng = null;
    function qT(e) {
      var t, a, i = e.nodeType;
      switch (i) {
        case Wi:
        case pd: {
          t = i === Wi ? "#document" : "#fragment";
          var u = e.documentElement;
          a = u ? u.namespaceURI : dd(null, "");
          break;
        }
        default: {
          var s = i === Un ? e.parentNode : e, f = s.namespaceURI || null;
          t = s.tagName, a = dd(f, t);
          break;
        }
      }
      {
        var p = t.toLowerCase(), v = mp(null, p);
        return {
          namespace: a,
          ancestorInfo: v
        };
      }
    }
    function XT(e, t, a) {
      {
        var i = e, u = dd(i.namespace, t), s = mp(i.ancestorInfo, t);
        return {
          namespace: u,
          ancestorInfo: s
        };
      }
    }
    function Ok(e) {
      return e;
    }
    function JT(e) {
      tg = Pn(), ng = dT();
      var t = null;
      return qn(!1), t;
    }
    function ZT(e) {
      pT(ng), qn(tg), tg = null, ng = null;
    }
    function eb(e, t, a, i, u) {
      var s;
      {
        var f = i;
        if (hp(e, null, f.ancestorInfo), typeof t.children == "string" || typeof t.children == "number") {
          var p = "" + t.children, v = mp(f.ancestorInfo, e);
          hp(null, p, v);
        }
        s = f.namespace;
      }
      var S = zT(e, t, a, s);
      return Cp(u, S), cg(S, t), S;
    }
    function tb(e, t) {
      e.appendChild(t);
    }
    function nb(e, t, a, i, u) {
      switch (jT(e, t, a, i), t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          return !!a.autoFocus;
        case "img":
          return !0;
        default:
          return !1;
      }
    }
    function rb(e, t, a, i, u, s) {
      {
        var f = s;
        if (typeof i.children != typeof a.children && (typeof i.children == "string" || typeof i.children == "number")) {
          var p = "" + i.children, v = mp(f.ancestorInfo, t);
          hp(null, p, v);
        }
      }
      return FT(e, t, a, i);
    }
    function rg(e, t) {
      return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
    }
    function ab(e, t, a, i) {
      {
        var u = a;
        hp(null, e, u.ancestorInfo);
      }
      var s = AT(e, t);
      return Cp(i, s), s;
    }
    function ib() {
      var e = window.event;
      return e === void 0 ? ja : pf(e.type);
    }
    var ag = typeof setTimeout == "function" ? setTimeout : void 0, lb = typeof clearTimeout == "function" ? clearTimeout : void 0, ig = -1, EC = typeof Promise == "function" ? Promise : void 0, ub = typeof queueMicrotask == "function" ? queueMicrotask : typeof EC < "u" ? function(e) {
      return EC.resolve(null).then(e).catch(ob);
    } : ag;
    function ob(e) {
      setTimeout(function() {
        throw e;
      });
    }
    function sb(e, t, a, i) {
      switch (t) {
        case "button":
        case "input":
        case "select":
        case "textarea":
          a.autoFocus && e.focus();
          return;
        case "img": {
          a.src && (e.src = a.src);
          return;
        }
      }
    }
    function cb(e, t, a, i, u, s) {
      VT(e, t, a, i, u), cg(e, u);
    }
    function CC(e) {
      oo(e, "");
    }
    function fb(e, t, a) {
      e.nodeValue = a;
    }
    function db(e, t) {
      e.appendChild(t);
    }
    function pb(e, t) {
      var a;
      e.nodeType === Un ? (a = e.parentNode, a.insertBefore(t, e)) : (a = e, a.appendChild(t));
      var i = e._reactRootContainer;
      i == null && a.onclick === null && Hh(a);
    }
    function vb(e, t, a) {
      e.insertBefore(t, a);
    }
    function hb(e, t, a) {
      e.nodeType === Un ? e.parentNode.insertBefore(t, a) : e.insertBefore(t, a);
    }
    function mb(e, t) {
      e.removeChild(t);
    }
    function yb(e, t) {
      e.nodeType === Un ? e.parentNode.removeChild(t) : e.removeChild(t);
    }
    function lg(e, t) {
      var a = t, i = 0;
      do {
        var u = a.nextSibling;
        if (e.removeChild(a), u && u.nodeType === Un) {
          var s = u.data;
          if (s === $h)
            if (i === 0) {
              e.removeChild(u), Ou(t);
              return;
            } else
              i--;
          else (s === Ih || s === yp || s === gp) && i++;
        }
        a = u;
      } while (a);
      Ou(t);
    }
    function gb(e, t) {
      e.nodeType === Un ? lg(e.parentNode, t) : e.nodeType === Xr && lg(e, t), Ou(e);
    }
    function Sb(e) {
      e = e;
      var t = e.style;
      typeof t.setProperty == "function" ? t.setProperty("display", "none", "important") : t.display = "none";
    }
    function Eb(e) {
      e.nodeValue = "";
    }
    function Cb(e, t) {
      e = e;
      var a = t[KT], i = a != null && a.hasOwnProperty("display") ? a.display : null;
      e.style.display = gc("display", i);
    }
    function Rb(e, t) {
      e.nodeValue = t;
    }
    function wb(e) {
      e.nodeType === Xr ? e.textContent = "" : e.nodeType === Wi && e.documentElement && e.removeChild(e.documentElement);
    }
    function Tb(e, t, a) {
      return e.nodeType !== Xr || t.toLowerCase() !== e.nodeName.toLowerCase() ? null : e;
    }
    function bb(e, t) {
      return t === "" || e.nodeType !== Yi ? null : e;
    }
    function xb(e) {
      return e.nodeType !== Un ? null : e;
    }
    function RC(e) {
      return e.data === yp;
    }
    function ug(e) {
      return e.data === gp;
    }
    function _b(e) {
      var t = e.nextSibling && e.nextSibling.dataset, a, i, u;
      return t && (a = t.dgst, i = t.msg, u = t.stck), {
        message: i,
        digest: a,
        stack: u
      };
    }
    function Db(e, t) {
      e._reactRetry = t;
    }
    function Yh(e) {
      for (; e != null; e = e.nextSibling) {
        var t = e.nodeType;
        if (t === Xr || t === Yi)
          break;
        if (t === Un) {
          var a = e.data;
          if (a === Ih || a === gp || a === yp)
            break;
          if (a === $h)
            return null;
        }
      }
      return e;
    }
    function Sp(e) {
      return Yh(e.nextSibling);
    }
    function Nb(e) {
      return Yh(e.firstChild);
    }
    function kb(e) {
      return Yh(e.firstChild);
    }
    function Ob(e) {
      return Yh(e.nextSibling);
    }
    function Lb(e, t, a, i, u, s, f) {
      Cp(s, e), cg(e, a);
      var p;
      {
        var v = u;
        p = v.namespace;
      }
      var S = (s.mode & yt) !== $e;
      return HT(e, t, a, p, i, S, f);
    }
    function Mb(e, t, a, i) {
      return Cp(a, e), a.mode & yt, BT(e, t);
    }
    function Ub(e, t) {
      Cp(t, e);
    }
    function zb(e) {
      for (var t = e.nextSibling, a = 0; t; ) {
        if (t.nodeType === Un) {
          var i = t.data;
          if (i === $h) {
            if (a === 0)
              return Sp(t);
            a--;
          } else (i === Ih || i === gp || i === yp) && a++;
        }
        t = t.nextSibling;
      }
      return null;
    }
    function wC(e) {
      for (var t = e.previousSibling, a = 0; t; ) {
        if (t.nodeType === Un) {
          var i = t.data;
          if (i === Ih || i === gp || i === yp) {
            if (a === 0)
              return t;
            a--;
          } else i === $h && a++;
        }
        t = t.previousSibling;
      }
      return null;
    }
    function Ab(e) {
      Ou(e);
    }
    function jb(e) {
      Ou(e);
    }
    function Fb(e) {
      return e !== "head" && e !== "body";
    }
    function Vb(e, t, a, i) {
      var u = !0;
      Ph(t.nodeValue, a, i, u);
    }
    function Pb(e, t, a, i, u, s) {
      if (t[Bh] !== !0) {
        var f = !0;
        Ph(i.nodeValue, u, s, f);
      }
    }
    function Hb(e, t) {
      t.nodeType === Xr ? Xy(e, t) : t.nodeType === Un || Jy(e, t);
    }
    function Bb(e, t) {
      {
        var a = e.parentNode;
        a !== null && (t.nodeType === Xr ? Xy(a, t) : t.nodeType === Un || Jy(a, t));
      }
    }
    function Ib(e, t, a, i, u) {
      (u || t[Bh] !== !0) && (i.nodeType === Xr ? Xy(a, i) : i.nodeType === Un || Jy(a, i));
    }
    function $b(e, t, a) {
      Zy(e, t);
    }
    function Yb(e, t) {
      eg(e, t);
    }
    function Wb(e, t, a) {
      {
        var i = e.parentNode;
        i !== null && Zy(i, t);
      }
    }
    function Qb(e, t) {
      {
        var a = e.parentNode;
        a !== null && eg(a, t);
      }
    }
    function Gb(e, t, a, i, u, s) {
      (s || t[Bh] !== !0) && Zy(a, i);
    }
    function Kb(e, t, a, i, u) {
      (u || t[Bh] !== !0) && eg(a, i);
    }
    function qb(e) {
      g("An error occurred during hydration. The server HTML was replaced with client content in <%s>.", e.nodeName.toLowerCase());
    }
    function Xb(e) {
      fp(e);
    }
    var _f = Math.random().toString(36).slice(2), Df = "__reactFiber$" + _f, og = "__reactProps$" + _f, Ep = "__reactContainer$" + _f, sg = "__reactEvents$" + _f, Jb = "__reactListeners$" + _f, Zb = "__reactHandles$" + _f;
    function ex(e) {
      delete e[Df], delete e[og], delete e[sg], delete e[Jb], delete e[Zb];
    }
    function Cp(e, t) {
      t[Df] = e;
    }
    function Wh(e, t) {
      t[Ep] = e;
    }
    function TC(e) {
      e[Ep] = null;
    }
    function Rp(e) {
      return !!e[Ep];
    }
    function Xs(e) {
      var t = e[Df];
      if (t)
        return t;
      for (var a = e.parentNode; a; ) {
        if (t = a[Ep] || a[Df], t) {
          var i = t.alternate;
          if (t.child !== null || i !== null && i.child !== null)
            for (var u = wC(e); u !== null; ) {
              var s = u[Df];
              if (s)
                return s;
              u = wC(u);
            }
          return t;
        }
        e = a, a = e.parentNode;
      }
      return null;
    }
    function Mo(e) {
      var t = e[Df] || e[Ep];
      return t && (t.tag === le || t.tag === ve || t.tag === ge || t.tag === V) ? t : null;
    }
    function Nf(e) {
      if (e.tag === le || e.tag === ve)
        return e.stateNode;
      throw new Error("getNodeFromInstance: Invalid argument.");
    }
    function Qh(e) {
      return e[og] || null;
    }
    function cg(e, t) {
      e[og] = t;
    }
    function tx(e) {
      var t = e[sg];
      return t === void 0 && (t = e[sg] = /* @__PURE__ */ new Set()), t;
    }
    var bC = {}, xC = E.ReactDebugCurrentFrame;
    function Gh(e) {
      if (e) {
        var t = e._owner, a = Hi(e.type, e._source, t ? t.type : null);
        xC.setExtraStackFrame(a);
      } else
        xC.setExtraStackFrame(null);
    }
    function rl(e, t, a, i, u) {
      {
        var s = Function.call.bind(kr);
        for (var f in e)
          if (s(e, f)) {
            var p = void 0;
            try {
              if (typeof e[f] != "function") {
                var v = Error((i || "React class") + ": " + a + " type `" + f + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[f] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw v.name = "Invariant Violation", v;
              }
              p = e[f](t, f, i, a, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (S) {
              p = S;
            }
            p && !(p instanceof Error) && (Gh(u), g("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", i || "React class", a, f, typeof p), Gh(null)), p instanceof Error && !(p.message in bC) && (bC[p.message] = !0, Gh(u), g("Failed %s type: %s", a, p.message), Gh(null));
          }
      }
    }
    var fg = [], Kh;
    Kh = [];
    var ju = -1;
    function Uo(e) {
      return {
        current: e
      };
    }
    function oa(e, t) {
      if (ju < 0) {
        g("Unexpected pop.");
        return;
      }
      t !== Kh[ju] && g("Unexpected Fiber popped."), e.current = fg[ju], fg[ju] = null, Kh[ju] = null, ju--;
    }
    function sa(e, t, a) {
      ju++, fg[ju] = e.current, Kh[ju] = a, e.current = t;
    }
    var dg;
    dg = {};
    var oi = {};
    Object.freeze(oi);
    var Fu = Uo(oi), Wl = Uo(!1), pg = oi;
    function kf(e, t, a) {
      return a && Ql(t) ? pg : Fu.current;
    }
    function _C(e, t, a) {
      {
        var i = e.stateNode;
        i.__reactInternalMemoizedUnmaskedChildContext = t, i.__reactInternalMemoizedMaskedChildContext = a;
      }
    }
    function Of(e, t) {
      {
        var a = e.type, i = a.contextTypes;
        if (!i)
          return oi;
        var u = e.stateNode;
        if (u && u.__reactInternalMemoizedUnmaskedChildContext === t)
          return u.__reactInternalMemoizedMaskedChildContext;
        var s = {};
        for (var f in i)
          s[f] = t[f];
        {
          var p = it(e) || "Unknown";
          rl(i, s, "context", p);
        }
        return u && _C(e, t, s), s;
      }
    }
    function qh() {
      return Wl.current;
    }
    function Ql(e) {
      {
        var t = e.childContextTypes;
        return t != null;
      }
    }
    function Xh(e) {
      oa(Wl, e), oa(Fu, e);
    }
    function vg(e) {
      oa(Wl, e), oa(Fu, e);
    }
    function DC(e, t, a) {
      {
        if (Fu.current !== oi)
          throw new Error("Unexpected context found on stack. This error is likely caused by a bug in React. Please file an issue.");
        sa(Fu, t, e), sa(Wl, a, e);
      }
    }
    function NC(e, t, a) {
      {
        var i = e.stateNode, u = t.childContextTypes;
        if (typeof i.getChildContext != "function") {
          {
            var s = it(e) || "Unknown";
            dg[s] || (dg[s] = !0, g("%s.childContextTypes is specified but there is no getChildContext() method on the instance. You can either define getChildContext() on %s or remove childContextTypes from it.", s, s));
          }
          return a;
        }
        var f = i.getChildContext();
        for (var p in f)
          if (!(p in u))
            throw new Error((it(e) || "Unknown") + '.getChildContext(): key "' + p + '" is not defined in childContextTypes.');
        {
          var v = it(e) || "Unknown";
          rl(u, f, "child context", v);
        }
        return mt({}, a, f);
      }
    }
    function Jh(e) {
      {
        var t = e.stateNode, a = t && t.__reactInternalMemoizedMergedChildContext || oi;
        return pg = Fu.current, sa(Fu, a, e), sa(Wl, Wl.current, e), !0;
      }
    }
    function kC(e, t, a) {
      {
        var i = e.stateNode;
        if (!i)
          throw new Error("Expected to have an instance by this point. This error is likely caused by a bug in React. Please file an issue.");
        if (a) {
          var u = NC(e, t, pg);
          i.__reactInternalMemoizedMergedChildContext = u, oa(Wl, e), oa(Fu, e), sa(Fu, u, e), sa(Wl, a, e);
        } else
          oa(Wl, e), sa(Wl, a, e);
      }
    }
    function nx(e) {
      {
        if (!yu(e) || e.tag !== F)
          throw new Error("Expected subtree parent to be a mounted class component. This error is likely caused by a bug in React. Please file an issue.");
        var t = e;
        do {
          switch (t.tag) {
            case V:
              return t.stateNode.context;
            case F: {
              var a = t.type;
              if (Ql(a))
                return t.stateNode.__reactInternalMemoizedMergedChildContext;
              break;
            }
          }
          t = t.return;
        } while (t !== null);
        throw new Error("Found unexpected detached subtree parent. This error is likely caused by a bug in React. Please file an issue.");
      }
    }
    var zo = 0, Zh = 1, Vu = null, hg = !1, mg = !1;
    function OC(e) {
      Vu === null ? Vu = [e] : Vu.push(e);
    }
    function rx(e) {
      hg = !0, OC(e);
    }
    function LC() {
      hg && Ao();
    }
    function Ao() {
      if (!mg && Vu !== null) {
        mg = !0;
        var e = 0, t = Va();
        try {
          var a = !0, i = Vu;
          for (Vn(zr); e < i.length; e++) {
            var u = i[e];
            do
              u = u(a);
            while (u !== null);
          }
          Vu = null, hg = !1;
        } catch (s) {
          throw Vu !== null && (Vu = Vu.slice(e + 1)), bd(ms, Ao), s;
        } finally {
          Vn(t), mg = !1;
        }
      }
      return null;
    }
    var Lf = [], Mf = 0, em = null, tm = 0, Li = [], Mi = 0, Js = null, Pu = 1, Hu = "";
    function ax(e) {
      return ec(), (e.flags & Ri) !== Ie;
    }
    function ix(e) {
      return ec(), tm;
    }
    function lx() {
      var e = Hu, t = Pu, a = t & ~ux(t);
      return a.toString(32) + e;
    }
    function Zs(e, t) {
      ec(), Lf[Mf++] = tm, Lf[Mf++] = em, em = e, tm = t;
    }
    function MC(e, t, a) {
      ec(), Li[Mi++] = Pu, Li[Mi++] = Hu, Li[Mi++] = Js, Js = e;
      var i = Pu, u = Hu, s = nm(i) - 1, f = i & ~(1 << s), p = a + 1, v = nm(t) + s;
      if (v > 30) {
        var S = s - s % 5, R = (1 << S) - 1, O = (f & R).toString(32), D = f >> S, H = s - S, $ = nm(t) + H, W = p << H, we = W | D, Qe = O + u;
        Pu = 1 << $ | we, Hu = Qe;
      } else {
        var Ve = p << s, kt = Ve | f, Tt = u;
        Pu = 1 << v | kt, Hu = Tt;
      }
    }
    function yg(e) {
      ec();
      var t = e.return;
      if (t !== null) {
        var a = 1, i = 0;
        Zs(e, a), MC(e, a, i);
      }
    }
    function nm(e) {
      return 32 - jn(e);
    }
    function ux(e) {
      return 1 << nm(e) - 1;
    }
    function gg(e) {
      for (; e === em; )
        em = Lf[--Mf], Lf[Mf] = null, tm = Lf[--Mf], Lf[Mf] = null;
      for (; e === Js; )
        Js = Li[--Mi], Li[Mi] = null, Hu = Li[--Mi], Li[Mi] = null, Pu = Li[--Mi], Li[Mi] = null;
    }
    function ox() {
      return ec(), Js !== null ? {
        id: Pu,
        overflow: Hu
      } : null;
    }
    function sx(e, t) {
      ec(), Li[Mi++] = Pu, Li[Mi++] = Hu, Li[Mi++] = Js, Pu = t.id, Hu = t.overflow, Js = e;
    }
    function ec() {
      Pr() || g("Expected to be hydrating. This is a bug in React. Please file an issue.");
    }
    var Vr = null, Ui = null, al = !1, tc = !1, jo = null;
    function cx() {
      al && g("We should not be hydrating here. This is a bug in React. Please file a bug.");
    }
    function UC() {
      tc = !0;
    }
    function fx() {
      return tc;
    }
    function dx(e) {
      var t = e.stateNode.containerInfo;
      return Ui = kb(t), Vr = e, al = !0, jo = null, tc = !1, !0;
    }
    function px(e, t, a) {
      return Ui = Ob(t), Vr = e, al = !0, jo = null, tc = !1, a !== null && sx(e, a), !0;
    }
    function zC(e, t) {
      switch (e.tag) {
        case V: {
          Hb(e.stateNode.containerInfo, t);
          break;
        }
        case le: {
          var a = (e.mode & yt) !== $e;
          Ib(
            e.type,
            e.memoizedProps,
            e.stateNode,
            t,
            // TODO: Delete this argument when we remove the legacy root API.
            a
          );
          break;
        }
        case ge: {
          var i = e.memoizedState;
          i.dehydrated !== null && Bb(i.dehydrated, t);
          break;
        }
      }
    }
    function AC(e, t) {
      zC(e, t);
      var a = yD();
      a.stateNode = t, a.return = e;
      var i = e.deletions;
      i === null ? (e.deletions = [a], e.flags |= La) : i.push(a);
    }
    function Sg(e, t) {
      {
        if (tc)
          return;
        switch (e.tag) {
          case V: {
            var a = e.stateNode.containerInfo;
            switch (t.tag) {
              case le:
                var i = t.type;
                t.pendingProps, $b(a, i);
                break;
              case ve:
                var u = t.pendingProps;
                Yb(a, u);
                break;
            }
            break;
          }
          case le: {
            var s = e.type, f = e.memoizedProps, p = e.stateNode;
            switch (t.tag) {
              case le: {
                var v = t.type, S = t.pendingProps, R = (e.mode & yt) !== $e;
                Gb(
                  s,
                  f,
                  p,
                  v,
                  S,
                  // TODO: Delete this argument when we remove the legacy root API.
                  R
                );
                break;
              }
              case ve: {
                var O = t.pendingProps, D = (e.mode & yt) !== $e;
                Kb(
                  s,
                  f,
                  p,
                  O,
                  // TODO: Delete this argument when we remove the legacy root API.
                  D
                );
                break;
              }
            }
            break;
          }
          case ge: {
            var H = e.memoizedState, $ = H.dehydrated;
            if ($ !== null) switch (t.tag) {
              case le:
                var W = t.type;
                t.pendingProps, Wb($, W);
                break;
              case ve:
                var we = t.pendingProps;
                Qb($, we);
                break;
            }
            break;
          }
          default:
            return;
        }
      }
    }
    function jC(e, t) {
      t.flags = t.flags & ~Zr | gn, Sg(e, t);
    }
    function FC(e, t) {
      switch (e.tag) {
        case le: {
          var a = e.type;
          e.pendingProps;
          var i = Tb(t, a);
          return i !== null ? (e.stateNode = i, Vr = e, Ui = Nb(i), !0) : !1;
        }
        case ve: {
          var u = e.pendingProps, s = bb(t, u);
          return s !== null ? (e.stateNode = s, Vr = e, Ui = null, !0) : !1;
        }
        case ge: {
          var f = xb(t);
          if (f !== null) {
            var p = {
              dehydrated: f,
              treeContext: ox(),
              retryLane: ra
            };
            e.memoizedState = p;
            var v = gD(f);
            return v.return = e, e.child = v, Vr = e, Ui = null, !0;
          }
          return !1;
        }
        default:
          return !1;
      }
    }
    function Eg(e) {
      return (e.mode & yt) !== $e && (e.flags & Pe) === Ie;
    }
    function Cg(e) {
      throw new Error("Hydration failed because the initial UI does not match what was rendered on the server.");
    }
    function Rg(e) {
      if (al) {
        var t = Ui;
        if (!t) {
          Eg(e) && (Sg(Vr, e), Cg()), jC(Vr, e), al = !1, Vr = e;
          return;
        }
        var a = t;
        if (!FC(e, t)) {
          Eg(e) && (Sg(Vr, e), Cg()), t = Sp(a);
          var i = Vr;
          if (!t || !FC(e, t)) {
            jC(Vr, e), al = !1, Vr = e;
            return;
          }
          AC(i, a);
        }
      }
    }
    function vx(e, t, a) {
      var i = e.stateNode, u = !tc, s = Lb(i, e.type, e.memoizedProps, t, a, e, u);
      return e.updateQueue = s, s !== null;
    }
    function hx(e) {
      var t = e.stateNode, a = e.memoizedProps, i = Mb(t, a, e);
      if (i) {
        var u = Vr;
        if (u !== null)
          switch (u.tag) {
            case V: {
              var s = u.stateNode.containerInfo, f = (u.mode & yt) !== $e;
              Vb(
                s,
                t,
                a,
                // TODO: Delete this argument when we remove the legacy root API.
                f
              );
              break;
            }
            case le: {
              var p = u.type, v = u.memoizedProps, S = u.stateNode, R = (u.mode & yt) !== $e;
              Pb(
                p,
                v,
                S,
                t,
                a,
                // TODO: Delete this argument when we remove the legacy root API.
                R
              );
              break;
            }
          }
      }
      return i;
    }
    function mx(e) {
      var t = e.memoizedState, a = t !== null ? t.dehydrated : null;
      if (!a)
        throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
      Ub(a, e);
    }
    function yx(e) {
      var t = e.memoizedState, a = t !== null ? t.dehydrated : null;
      if (!a)
        throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
      return zb(a);
    }
    function VC(e) {
      for (var t = e.return; t !== null && t.tag !== le && t.tag !== V && t.tag !== ge; )
        t = t.return;
      Vr = t;
    }
    function rm(e) {
      if (e !== Vr)
        return !1;
      if (!al)
        return VC(e), al = !0, !1;
      if (e.tag !== V && (e.tag !== le || Fb(e.type) && !rg(e.type, e.memoizedProps))) {
        var t = Ui;
        if (t)
          if (Eg(e))
            PC(e), Cg();
          else
            for (; t; )
              AC(e, t), t = Sp(t);
      }
      return VC(e), e.tag === ge ? Ui = yx(e) : Ui = Vr ? Sp(e.stateNode) : null, !0;
    }
    function gx() {
      return al && Ui !== null;
    }
    function PC(e) {
      for (var t = Ui; t; )
        zC(e, t), t = Sp(t);
    }
    function Uf() {
      Vr = null, Ui = null, al = !1, tc = !1;
    }
    function HC() {
      jo !== null && (UR(jo), jo = null);
    }
    function Pr() {
      return al;
    }
    function wg(e) {
      jo === null ? jo = [e] : jo.push(e);
    }
    var Sx = E.ReactCurrentBatchConfig, Ex = null;
    function Cx() {
      return Sx.transition;
    }
    var il = {
      recordUnsafeLifecycleWarnings: function(e, t) {
      },
      flushPendingUnsafeLifecycleWarnings: function() {
      },
      recordLegacyContextWarning: function(e, t) {
      },
      flushLegacyContextWarning: function() {
      },
      discardPendingWarnings: function() {
      }
    };
    {
      var Rx = function(e) {
        for (var t = null, a = e; a !== null; )
          a.mode & Zt && (t = a), a = a.return;
        return t;
      }, nc = function(e) {
        var t = [];
        return e.forEach(function(a) {
          t.push(a);
        }), t.sort().join(", ");
      }, wp = [], Tp = [], bp = [], xp = [], _p = [], Dp = [], rc = /* @__PURE__ */ new Set();
      il.recordUnsafeLifecycleWarnings = function(e, t) {
        rc.has(e.type) || (typeof t.componentWillMount == "function" && // Don't warn about react-lifecycles-compat polyfilled components.
        t.componentWillMount.__suppressDeprecationWarning !== !0 && wp.push(e), e.mode & Zt && typeof t.UNSAFE_componentWillMount == "function" && Tp.push(e), typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps.__suppressDeprecationWarning !== !0 && bp.push(e), e.mode & Zt && typeof t.UNSAFE_componentWillReceiveProps == "function" && xp.push(e), typeof t.componentWillUpdate == "function" && t.componentWillUpdate.__suppressDeprecationWarning !== !0 && _p.push(e), e.mode & Zt && typeof t.UNSAFE_componentWillUpdate == "function" && Dp.push(e));
      }, il.flushPendingUnsafeLifecycleWarnings = function() {
        var e = /* @__PURE__ */ new Set();
        wp.length > 0 && (wp.forEach(function(D) {
          e.add(it(D) || "Component"), rc.add(D.type);
        }), wp = []);
        var t = /* @__PURE__ */ new Set();
        Tp.length > 0 && (Tp.forEach(function(D) {
          t.add(it(D) || "Component"), rc.add(D.type);
        }), Tp = []);
        var a = /* @__PURE__ */ new Set();
        bp.length > 0 && (bp.forEach(function(D) {
          a.add(it(D) || "Component"), rc.add(D.type);
        }), bp = []);
        var i = /* @__PURE__ */ new Set();
        xp.length > 0 && (xp.forEach(function(D) {
          i.add(it(D) || "Component"), rc.add(D.type);
        }), xp = []);
        var u = /* @__PURE__ */ new Set();
        _p.length > 0 && (_p.forEach(function(D) {
          u.add(it(D) || "Component"), rc.add(D.type);
        }), _p = []);
        var s = /* @__PURE__ */ new Set();
        if (Dp.length > 0 && (Dp.forEach(function(D) {
          s.add(it(D) || "Component"), rc.add(D.type);
        }), Dp = []), t.size > 0) {
          var f = nc(t);
          g(`Using UNSAFE_componentWillMount in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.

Please update the following components: %s`, f);
        }
        if (i.size > 0) {
          var p = nc(i);
          g(`Using UNSAFE_componentWillReceiveProps in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state

Please update the following components: %s`, p);
        }
        if (s.size > 0) {
          var v = nc(s);
          g(`Using UNSAFE_componentWillUpdate in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.

Please update the following components: %s`, v);
        }
        if (e.size > 0) {
          var S = nc(e);
          A(`componentWillMount has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.
* Rename componentWillMount to UNSAFE_componentWillMount to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, S);
        }
        if (a.size > 0) {
          var R = nc(a);
          A(`componentWillReceiveProps has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state
* Rename componentWillReceiveProps to UNSAFE_componentWillReceiveProps to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, R);
        }
        if (u.size > 0) {
          var O = nc(u);
          A(`componentWillUpdate has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* Rename componentWillUpdate to UNSAFE_componentWillUpdate to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, O);
        }
      };
      var am = /* @__PURE__ */ new Map(), BC = /* @__PURE__ */ new Set();
      il.recordLegacyContextWarning = function(e, t) {
        var a = Rx(e);
        if (a === null) {
          g("Expected to find a StrictMode component in a strict mode tree. This error is likely caused by a bug in React. Please file an issue.");
          return;
        }
        if (!BC.has(e.type)) {
          var i = am.get(a);
          (e.type.contextTypes != null || e.type.childContextTypes != null || t !== null && typeof t.getChildContext == "function") && (i === void 0 && (i = [], am.set(a, i)), i.push(e));
        }
      }, il.flushLegacyContextWarning = function() {
        am.forEach(function(e, t) {
          if (e.length !== 0) {
            var a = e[0], i = /* @__PURE__ */ new Set();
            e.forEach(function(s) {
              i.add(it(s) || "Component"), BC.add(s.type);
            });
            var u = nc(i);
            try {
              qt(a), g(`Legacy context API has been detected within a strict-mode tree.

The old API will be supported in all 16.x releases, but applications using it should migrate to the new version.

Please update the following components: %s

Learn more about this warning here: https://reactjs.org/link/legacy-context`, u);
            } finally {
              cn();
            }
          }
        });
      }, il.discardPendingWarnings = function() {
        wp = [], Tp = [], bp = [], xp = [], _p = [], Dp = [], am = /* @__PURE__ */ new Map();
      };
    }
    var Tg, bg, xg, _g, Dg, IC = function(e, t) {
    };
    Tg = !1, bg = !1, xg = {}, _g = {}, Dg = {}, IC = function(e, t) {
      if (!(e === null || typeof e != "object") && !(!e._store || e._store.validated || e.key != null)) {
        if (typeof e._store != "object")
          throw new Error("React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue.");
        e._store.validated = !0;
        var a = it(t) || "Component";
        _g[a] || (_g[a] = !0, g('Each child in a list should have a unique "key" prop. See https://reactjs.org/link/warning-keys for more information.'));
      }
    };
    function wx(e) {
      return e.prototype && e.prototype.isReactComponent;
    }
    function Np(e, t, a) {
      var i = a.ref;
      if (i !== null && typeof i != "function" && typeof i != "object") {
        if ((e.mode & Zt || G) && // We warn in ReactElement.js if owner and self are equal for string refs
        // because these cannot be automatically converted to an arrow function
        // using a codemod. Therefore, we don't have to warn about string refs again.
        !(a._owner && a._self && a._owner.stateNode !== a._self) && // Will already throw with "Function components cannot have string refs"
        !(a._owner && a._owner.tag !== F) && // Will already warn with "Function components cannot be given refs"
        !(typeof a.type == "function" && !wx(a.type)) && // Will already throw with "Element ref was specified as a string (someStringRef) but no owner was set"
        a._owner) {
          var u = it(e) || "Component";
          xg[u] || (g('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. We recommend using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', u, i), xg[u] = !0);
        }
        if (a._owner) {
          var s = a._owner, f;
          if (s) {
            var p = s;
            if (p.tag !== F)
              throw new Error("Function components cannot have string refs. We recommend using useRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref");
            f = p.stateNode;
          }
          if (!f)
            throw new Error("Missing owner for string ref " + i + ". This error is likely caused by a bug in React. Please file an issue.");
          var v = f;
          fi(i, "ref");
          var S = "" + i;
          if (t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === S)
            return t.ref;
          var R = function(O) {
            var D = v.refs;
            O === null ? delete D[S] : D[S] = O;
          };
          return R._stringRef = S, R;
        } else {
          if (typeof i != "string")
            throw new Error("Expected ref to be a function, a string, an object returned by React.createRef(), or null.");
          if (!a._owner)
            throw new Error("Element ref was specified as a string (" + i + `) but no owner was set. This could happen for one of the following reasons:
1. You may be adding a ref to a function component
2. You may be adding a ref to a component that was not created inside a component's render method
3. You have multiple copies of React loaded
See https://reactjs.org/link/refs-must-have-owner for more information.`);
        }
      }
      return i;
    }
    function im(e, t) {
      var a = Object.prototype.toString.call(t);
      throw new Error("Objects are not valid as a React child (found: " + (a === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : a) + "). If you meant to render a collection of children, use an array instead.");
    }
    function lm(e) {
      {
        var t = it(e) || "Component";
        if (Dg[t])
          return;
        Dg[t] = !0, g("Functions are not valid as a React child. This may happen if you return a Component instead of <Component /> from render. Or maybe you meant to call this function rather than return it.");
      }
    }
    function $C(e) {
      var t = e._payload, a = e._init;
      return a(t);
    }
    function YC(e) {
      function t(U, Q) {
        if (e) {
          var z = U.deletions;
          z === null ? (U.deletions = [Q], U.flags |= La) : z.push(Q);
        }
      }
      function a(U, Q) {
        if (!e)
          return null;
        for (var z = Q; z !== null; )
          t(U, z), z = z.sibling;
        return null;
      }
      function i(U, Q) {
        for (var z = /* @__PURE__ */ new Map(), se = Q; se !== null; )
          se.key !== null ? z.set(se.key, se) : z.set(se.index, se), se = se.sibling;
        return z;
      }
      function u(U, Q) {
        var z = dc(U, Q);
        return z.index = 0, z.sibling = null, z;
      }
      function s(U, Q, z) {
        if (U.index = z, !e)
          return U.flags |= Ri, Q;
        var se = U.alternate;
        if (se !== null) {
          var De = se.index;
          return De < Q ? (U.flags |= gn, Q) : De;
        } else
          return U.flags |= gn, Q;
      }
      function f(U) {
        return e && U.alternate === null && (U.flags |= gn), U;
      }
      function p(U, Q, z, se) {
        if (Q === null || Q.tag !== ve) {
          var De = wE(z, U.mode, se);
          return De.return = U, De;
        } else {
          var Te = u(Q, z);
          return Te.return = U, Te;
        }
      }
      function v(U, Q, z, se) {
        var De = z.type;
        if (De === vi)
          return R(U, Q, z.props.children, se, z.key);
        if (Q !== null && (Q.elementType === De || // Keep this check inline so it only runs on the false path:
        qR(Q, z) || // Lazy types should reconcile their resolved type.
        // We need to do this after the Hot Reloading check above,
        // because hot reloading has different semantics than prod because
        // it doesn't resuspend. So we can't let the call below suspend.
        typeof De == "object" && De !== null && De.$$typeof === Ye && $C(De) === Q.type)) {
          var Te = u(Q, z.props);
          return Te.ref = Np(U, Q, z), Te.return = U, Te._debugSource = z._source, Te._debugOwner = z._owner, Te;
        }
        var tt = RE(z, U.mode, se);
        return tt.ref = Np(U, Q, z), tt.return = U, tt;
      }
      function S(U, Q, z, se) {
        if (Q === null || Q.tag !== X || Q.stateNode.containerInfo !== z.containerInfo || Q.stateNode.implementation !== z.implementation) {
          var De = TE(z, U.mode, se);
          return De.return = U, De;
        } else {
          var Te = u(Q, z.children || []);
          return Te.return = U, Te;
        }
      }
      function R(U, Q, z, se, De) {
        if (Q === null || Q.tag !== be) {
          var Te = Go(z, U.mode, se, De);
          return Te.return = U, Te;
        } else {
          var tt = u(Q, z);
          return tt.return = U, tt;
        }
      }
      function O(U, Q, z) {
        if (typeof Q == "string" && Q !== "" || typeof Q == "number") {
          var se = wE("" + Q, U.mode, z);
          return se.return = U, se;
        }
        if (typeof Q == "object" && Q !== null) {
          switch (Q.$$typeof) {
            case Kr: {
              var De = RE(Q, U.mode, z);
              return De.ref = Np(U, null, Q), De.return = U, De;
            }
            case lr: {
              var Te = TE(Q, U.mode, z);
              return Te.return = U, Te;
            }
            case Ye: {
              var tt = Q._payload, ut = Q._init;
              return O(U, ut(tt), z);
            }
          }
          if (pt(Q) || Yt(Q)) {
            var tn = Go(Q, U.mode, z, null);
            return tn.return = U, tn;
          }
          im(U, Q);
        }
        return typeof Q == "function" && lm(U), null;
      }
      function D(U, Q, z, se) {
        var De = Q !== null ? Q.key : null;
        if (typeof z == "string" && z !== "" || typeof z == "number")
          return De !== null ? null : p(U, Q, "" + z, se);
        if (typeof z == "object" && z !== null) {
          switch (z.$$typeof) {
            case Kr:
              return z.key === De ? v(U, Q, z, se) : null;
            case lr:
              return z.key === De ? S(U, Q, z, se) : null;
            case Ye: {
              var Te = z._payload, tt = z._init;
              return D(U, Q, tt(Te), se);
            }
          }
          if (pt(z) || Yt(z))
            return De !== null ? null : R(U, Q, z, se, null);
          im(U, z);
        }
        return typeof z == "function" && lm(U), null;
      }
      function H(U, Q, z, se, De) {
        if (typeof se == "string" && se !== "" || typeof se == "number") {
          var Te = U.get(z) || null;
          return p(Q, Te, "" + se, De);
        }
        if (typeof se == "object" && se !== null) {
          switch (se.$$typeof) {
            case Kr: {
              var tt = U.get(se.key === null ? z : se.key) || null;
              return v(Q, tt, se, De);
            }
            case lr: {
              var ut = U.get(se.key === null ? z : se.key) || null;
              return S(Q, ut, se, De);
            }
            case Ye:
              var tn = se._payload, Bt = se._init;
              return H(U, Q, z, Bt(tn), De);
          }
          if (pt(se) || Yt(se)) {
            var Xn = U.get(z) || null;
            return R(Q, Xn, se, De, null);
          }
          im(Q, se);
        }
        return typeof se == "function" && lm(Q), null;
      }
      function $(U, Q, z) {
        {
          if (typeof U != "object" || U === null)
            return Q;
          switch (U.$$typeof) {
            case Kr:
            case lr:
              IC(U, z);
              var se = U.key;
              if (typeof se != "string")
                break;
              if (Q === null) {
                Q = /* @__PURE__ */ new Set(), Q.add(se);
                break;
              }
              if (!Q.has(se)) {
                Q.add(se);
                break;
              }
              g("Encountered two children with the same key, `%s`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.", se);
              break;
            case Ye:
              var De = U._payload, Te = U._init;
              $(Te(De), Q, z);
              break;
          }
        }
        return Q;
      }
      function W(U, Q, z, se) {
        for (var De = null, Te = 0; Te < z.length; Te++) {
          var tt = z[Te];
          De = $(tt, De, U);
        }
        for (var ut = null, tn = null, Bt = Q, Xn = 0, It = 0, Bn = null; Bt !== null && It < z.length; It++) {
          Bt.index > It ? (Bn = Bt, Bt = null) : Bn = Bt.sibling;
          var fa = D(U, Bt, z[It], se);
          if (fa === null) {
            Bt === null && (Bt = Bn);
            break;
          }
          e && Bt && fa.alternate === null && t(U, Bt), Xn = s(fa, Xn, It), tn === null ? ut = fa : tn.sibling = fa, tn = fa, Bt = Bn;
        }
        if (It === z.length) {
          if (a(U, Bt), Pr()) {
            var Qr = It;
            Zs(U, Qr);
          }
          return ut;
        }
        if (Bt === null) {
          for (; It < z.length; It++) {
            var ci = O(U, z[It], se);
            ci !== null && (Xn = s(ci, Xn, It), tn === null ? ut = ci : tn.sibling = ci, tn = ci);
          }
          if (Pr()) {
            var ba = It;
            Zs(U, ba);
          }
          return ut;
        }
        for (var xa = i(U, Bt); It < z.length; It++) {
          var da = H(xa, U, It, z[It], se);
          da !== null && (e && da.alternate !== null && xa.delete(da.key === null ? It : da.key), Xn = s(da, Xn, It), tn === null ? ut = da : tn.sibling = da, tn = da);
        }
        if (e && xa.forEach(function(Zf) {
          return t(U, Zf);
        }), Pr()) {
          var Gu = It;
          Zs(U, Gu);
        }
        return ut;
      }
      function we(U, Q, z, se) {
        var De = Yt(z);
        if (typeof De != "function")
          throw new Error("An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.");
        {
          typeof Symbol == "function" && // $FlowFixMe Flow doesn't know about toStringTag
          z[Symbol.toStringTag] === "Generator" && (bg || g("Using Generators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. Keep in mind you might need to polyfill these features for older browsers."), bg = !0), z.entries === De && (Tg || g("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), Tg = !0);
          var Te = De.call(z);
          if (Te)
            for (var tt = null, ut = Te.next(); !ut.done; ut = Te.next()) {
              var tn = ut.value;
              tt = $(tn, tt, U);
            }
        }
        var Bt = De.call(z);
        if (Bt == null)
          throw new Error("An iterable object provided no iterator.");
        for (var Xn = null, It = null, Bn = Q, fa = 0, Qr = 0, ci = null, ba = Bt.next(); Bn !== null && !ba.done; Qr++, ba = Bt.next()) {
          Bn.index > Qr ? (ci = Bn, Bn = null) : ci = Bn.sibling;
          var xa = D(U, Bn, ba.value, se);
          if (xa === null) {
            Bn === null && (Bn = ci);
            break;
          }
          e && Bn && xa.alternate === null && t(U, Bn), fa = s(xa, fa, Qr), It === null ? Xn = xa : It.sibling = xa, It = xa, Bn = ci;
        }
        if (ba.done) {
          if (a(U, Bn), Pr()) {
            var da = Qr;
            Zs(U, da);
          }
          return Xn;
        }
        if (Bn === null) {
          for (; !ba.done; Qr++, ba = Bt.next()) {
            var Gu = O(U, ba.value, se);
            Gu !== null && (fa = s(Gu, fa, Qr), It === null ? Xn = Gu : It.sibling = Gu, It = Gu);
          }
          if (Pr()) {
            var Zf = Qr;
            Zs(U, Zf);
          }
          return Xn;
        }
        for (var uv = i(U, Bn); !ba.done; Qr++, ba = Bt.next()) {
          var tu = H(uv, U, Qr, ba.value, se);
          tu !== null && (e && tu.alternate !== null && uv.delete(tu.key === null ? Qr : tu.key), fa = s(tu, fa, Qr), It === null ? Xn = tu : It.sibling = tu, It = tu);
        }
        if (e && uv.forEach(function(KD) {
          return t(U, KD);
        }), Pr()) {
          var GD = Qr;
          Zs(U, GD);
        }
        return Xn;
      }
      function Qe(U, Q, z, se) {
        if (Q !== null && Q.tag === ve) {
          a(U, Q.sibling);
          var De = u(Q, z);
          return De.return = U, De;
        }
        a(U, Q);
        var Te = wE(z, U.mode, se);
        return Te.return = U, Te;
      }
      function Ve(U, Q, z, se) {
        for (var De = z.key, Te = Q; Te !== null; ) {
          if (Te.key === De) {
            var tt = z.type;
            if (tt === vi) {
              if (Te.tag === be) {
                a(U, Te.sibling);
                var ut = u(Te, z.props.children);
                return ut.return = U, ut._debugSource = z._source, ut._debugOwner = z._owner, ut;
              }
            } else if (Te.elementType === tt || // Keep this check inline so it only runs on the false path:
            qR(Te, z) || // Lazy types should reconcile their resolved type.
            // We need to do this after the Hot Reloading check above,
            // because hot reloading has different semantics than prod because
            // it doesn't resuspend. So we can't let the call below suspend.
            typeof tt == "object" && tt !== null && tt.$$typeof === Ye && $C(tt) === Te.type) {
              a(U, Te.sibling);
              var tn = u(Te, z.props);
              return tn.ref = Np(U, Te, z), tn.return = U, tn._debugSource = z._source, tn._debugOwner = z._owner, tn;
            }
            a(U, Te);
            break;
          } else
            t(U, Te);
          Te = Te.sibling;
        }
        if (z.type === vi) {
          var Bt = Go(z.props.children, U.mode, se, z.key);
          return Bt.return = U, Bt;
        } else {
          var Xn = RE(z, U.mode, se);
          return Xn.ref = Np(U, Q, z), Xn.return = U, Xn;
        }
      }
      function kt(U, Q, z, se) {
        for (var De = z.key, Te = Q; Te !== null; ) {
          if (Te.key === De)
            if (Te.tag === X && Te.stateNode.containerInfo === z.containerInfo && Te.stateNode.implementation === z.implementation) {
              a(U, Te.sibling);
              var tt = u(Te, z.children || []);
              return tt.return = U, tt;
            } else {
              a(U, Te);
              break;
            }
          else
            t(U, Te);
          Te = Te.sibling;
        }
        var ut = TE(z, U.mode, se);
        return ut.return = U, ut;
      }
      function Tt(U, Q, z, se) {
        var De = typeof z == "object" && z !== null && z.type === vi && z.key === null;
        if (De && (z = z.props.children), typeof z == "object" && z !== null) {
          switch (z.$$typeof) {
            case Kr:
              return f(Ve(U, Q, z, se));
            case lr:
              return f(kt(U, Q, z, se));
            case Ye:
              var Te = z._payload, tt = z._init;
              return Tt(U, Q, tt(Te), se);
          }
          if (pt(z))
            return W(U, Q, z, se);
          if (Yt(z))
            return we(U, Q, z, se);
          im(U, z);
        }
        return typeof z == "string" && z !== "" || typeof z == "number" ? f(Qe(U, Q, "" + z, se)) : (typeof z == "function" && lm(U), a(U, Q));
      }
      return Tt;
    }
    var zf = YC(!0), WC = YC(!1);
    function Tx(e, t) {
      if (e !== null && t.child !== e.child)
        throw new Error("Resuming work not yet implemented.");
      if (t.child !== null) {
        var a = t.child, i = dc(a, a.pendingProps);
        for (t.child = i, i.return = t; a.sibling !== null; )
          a = a.sibling, i = i.sibling = dc(a, a.pendingProps), i.return = t;
        i.sibling = null;
      }
    }
    function bx(e, t) {
      for (var a = e.child; a !== null; )
        dD(a, t), a = a.sibling;
    }
    var Ng = Uo(null), kg;
    kg = {};
    var um = null, Af = null, Og = null, om = !1;
    function sm() {
      um = null, Af = null, Og = null, om = !1;
    }
    function QC() {
      om = !0;
    }
    function GC() {
      om = !1;
    }
    function KC(e, t, a) {
      sa(Ng, t._currentValue, e), t._currentValue = a, t._currentRenderer !== void 0 && t._currentRenderer !== null && t._currentRenderer !== kg && g("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."), t._currentRenderer = kg;
    }
    function Lg(e, t) {
      var a = Ng.current;
      oa(Ng, t), e._currentValue = a;
    }
    function Mg(e, t, a) {
      for (var i = e; i !== null; ) {
        var u = i.alternate;
        if (ku(i.childLanes, t) ? u !== null && !ku(u.childLanes, t) && (u.childLanes = ot(u.childLanes, t)) : (i.childLanes = ot(i.childLanes, t), u !== null && (u.childLanes = ot(u.childLanes, t))), i === a)
          break;
        i = i.return;
      }
      i !== a && g("Expected to find the propagation root when scheduling context work. This error is likely caused by a bug in React. Please file an issue.");
    }
    function xx(e, t, a) {
      _x(e, t, a);
    }
    function _x(e, t, a) {
      var i = e.child;
      for (i !== null && (i.return = e); i !== null; ) {
        var u = void 0, s = i.dependencies;
        if (s !== null) {
          u = i.child;
          for (var f = s.firstContext; f !== null; ) {
            if (f.context === t) {
              if (i.tag === F) {
                var p = ks(a), v = Bu(nn, p);
                v.tag = fm;
                var S = i.updateQueue;
                if (S !== null) {
                  var R = S.shared, O = R.pending;
                  O === null ? v.next = v : (v.next = O.next, O.next = v), R.pending = v;
                }
              }
              i.lanes = ot(i.lanes, a);
              var D = i.alternate;
              D !== null && (D.lanes = ot(D.lanes, a)), Mg(i.return, a, e), s.lanes = ot(s.lanes, a);
              break;
            }
            f = f.next;
          }
        } else if (i.tag === ue)
          u = i.type === e.type ? null : i.child;
        else if (i.tag === wt) {
          var H = i.return;
          if (H === null)
            throw new Error("We just came from a parent so we must have had a parent. This is a bug in React.");
          H.lanes = ot(H.lanes, a);
          var $ = H.alternate;
          $ !== null && ($.lanes = ot($.lanes, a)), Mg(H, a, e), u = i.sibling;
        } else
          u = i.child;
        if (u !== null)
          u.return = i;
        else
          for (u = i; u !== null; ) {
            if (u === e) {
              u = null;
              break;
            }
            var W = u.sibling;
            if (W !== null) {
              W.return = u.return, u = W;
              break;
            }
            u = u.return;
          }
        i = u;
      }
    }
    function jf(e, t) {
      um = e, Af = null, Og = null;
      var a = e.dependencies;
      if (a !== null) {
        var i = a.firstContext;
        i !== null && (aa(a.lanes, t) && $p(), a.firstContext = null);
      }
    }
    function ar(e) {
      om && g("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
      var t = e._currentValue;
      if (Og !== e) {
        var a = {
          context: e,
          memoizedValue: t,
          next: null
        };
        if (Af === null) {
          if (um === null)
            throw new Error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
          Af = a, um.dependencies = {
            lanes: Z,
            firstContext: a
          };
        } else
          Af = Af.next = a;
      }
      return t;
    }
    var ac = null;
    function Ug(e) {
      ac === null ? ac = [e] : ac.push(e);
    }
    function Dx() {
      if (ac !== null) {
        for (var e = 0; e < ac.length; e++) {
          var t = ac[e], a = t.interleaved;
          if (a !== null) {
            t.interleaved = null;
            var i = a.next, u = t.pending;
            if (u !== null) {
              var s = u.next;
              u.next = i, a.next = s;
            }
            t.pending = a;
          }
        }
        ac = null;
      }
    }
    function qC(e, t, a, i) {
      var u = t.interleaved;
      return u === null ? (a.next = a, Ug(t)) : (a.next = u.next, u.next = a), t.interleaved = a, cm(e, i);
    }
    function Nx(e, t, a, i) {
      var u = t.interleaved;
      u === null ? (a.next = a, Ug(t)) : (a.next = u.next, u.next = a), t.interleaved = a;
    }
    function kx(e, t, a, i) {
      var u = t.interleaved;
      return u === null ? (a.next = a, Ug(t)) : (a.next = u.next, u.next = a), t.interleaved = a, cm(e, i);
    }
    function Ba(e, t) {
      return cm(e, t);
    }
    var Ox = cm;
    function cm(e, t) {
      e.lanes = ot(e.lanes, t);
      var a = e.alternate;
      a !== null && (a.lanes = ot(a.lanes, t)), a === null && (e.flags & (gn | Zr)) !== Ie && WR(e);
      for (var i = e, u = e.return; u !== null; )
        u.childLanes = ot(u.childLanes, t), a = u.alternate, a !== null ? a.childLanes = ot(a.childLanes, t) : (u.flags & (gn | Zr)) !== Ie && WR(e), i = u, u = u.return;
      if (i.tag === V) {
        var s = i.stateNode;
        return s;
      } else
        return null;
    }
    var XC = 0, JC = 1, fm = 2, zg = 3, dm = !1, Ag, pm;
    Ag = !1, pm = null;
    function jg(e) {
      var t = {
        baseState: e.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: {
          pending: null,
          interleaved: null,
          lanes: Z
        },
        effects: null
      };
      e.updateQueue = t;
    }
    function ZC(e, t) {
      var a = t.updateQueue, i = e.updateQueue;
      if (a === i) {
        var u = {
          baseState: i.baseState,
          firstBaseUpdate: i.firstBaseUpdate,
          lastBaseUpdate: i.lastBaseUpdate,
          shared: i.shared,
          effects: i.effects
        };
        t.updateQueue = u;
      }
    }
    function Bu(e, t) {
      var a = {
        eventTime: e,
        lane: t,
        tag: XC,
        payload: null,
        callback: null,
        next: null
      };
      return a;
    }
    function Fo(e, t, a) {
      var i = e.updateQueue;
      if (i === null)
        return null;
      var u = i.shared;
      if (pm === u && !Ag && (g("An update (setState, replaceState, or forceUpdate) was scheduled from inside an update function. Update functions should be pure, with zero side-effects. Consider using componentDidUpdate or a callback."), Ag = !0), N_()) {
        var s = u.pending;
        return s === null ? t.next = t : (t.next = s.next, s.next = t), u.pending = t, Ox(e, a);
      } else
        return kx(e, u, t, a);
    }
    function vm(e, t, a) {
      var i = t.updateQueue;
      if (i !== null) {
        var u = i.shared;
        if (Bd(a)) {
          var s = u.lanes;
          s = $d(s, e.pendingLanes);
          var f = ot(s, a);
          u.lanes = f, sf(e, f);
        }
      }
    }
    function Fg(e, t) {
      var a = e.updateQueue, i = e.alternate;
      if (i !== null) {
        var u = i.updateQueue;
        if (a === u) {
          var s = null, f = null, p = a.firstBaseUpdate;
          if (p !== null) {
            var v = p;
            do {
              var S = {
                eventTime: v.eventTime,
                lane: v.lane,
                tag: v.tag,
                payload: v.payload,
                callback: v.callback,
                next: null
              };
              f === null ? s = f = S : (f.next = S, f = S), v = v.next;
            } while (v !== null);
            f === null ? s = f = t : (f.next = t, f = t);
          } else
            s = f = t;
          a = {
            baseState: u.baseState,
            firstBaseUpdate: s,
            lastBaseUpdate: f,
            shared: u.shared,
            effects: u.effects
          }, e.updateQueue = a;
          return;
        }
      }
      var R = a.lastBaseUpdate;
      R === null ? a.firstBaseUpdate = t : R.next = t, a.lastBaseUpdate = t;
    }
    function Lx(e, t, a, i, u, s) {
      switch (a.tag) {
        case JC: {
          var f = a.payload;
          if (typeof f == "function") {
            QC();
            var p = f.call(s, i, u);
            {
              if (e.mode & Zt) {
                Sn(!0);
                try {
                  f.call(s, i, u);
                } finally {
                  Sn(!1);
                }
              }
              GC();
            }
            return p;
          }
          return f;
        }
        case zg:
          e.flags = e.flags & ~er | Pe;
        case XC: {
          var v = a.payload, S;
          if (typeof v == "function") {
            QC(), S = v.call(s, i, u);
            {
              if (e.mode & Zt) {
                Sn(!0);
                try {
                  v.call(s, i, u);
                } finally {
                  Sn(!1);
                }
              }
              GC();
            }
          } else
            S = v;
          return S == null ? i : mt({}, i, S);
        }
        case fm:
          return dm = !0, i;
      }
      return i;
    }
    function hm(e, t, a, i) {
      var u = e.updateQueue;
      dm = !1, pm = u.shared;
      var s = u.firstBaseUpdate, f = u.lastBaseUpdate, p = u.shared.pending;
      if (p !== null) {
        u.shared.pending = null;
        var v = p, S = v.next;
        v.next = null, f === null ? s = S : f.next = S, f = v;
        var R = e.alternate;
        if (R !== null) {
          var O = R.updateQueue, D = O.lastBaseUpdate;
          D !== f && (D === null ? O.firstBaseUpdate = S : D.next = S, O.lastBaseUpdate = v);
        }
      }
      if (s !== null) {
        var H = u.baseState, $ = Z, W = null, we = null, Qe = null, Ve = s;
        do {
          var kt = Ve.lane, Tt = Ve.eventTime;
          if (ku(i, kt)) {
            if (Qe !== null) {
              var Q = {
                eventTime: Tt,
                // This update is going to be committed so we never want uncommit
                // it. Using NoLane works because 0 is a subset of all bitmasks, so
                // this will never be skipped by the check above.
                lane: zt,
                tag: Ve.tag,
                payload: Ve.payload,
                callback: Ve.callback,
                next: null
              };
              Qe = Qe.next = Q;
            }
            H = Lx(e, u, Ve, H, t, a);
            var z = Ve.callback;
            if (z !== null && // If the update was already committed, we should not queue its
            // callback again.
            Ve.lane !== zt) {
              e.flags |= un;
              var se = u.effects;
              se === null ? u.effects = [Ve] : se.push(Ve);
            }
          } else {
            var U = {
              eventTime: Tt,
              lane: kt,
              tag: Ve.tag,
              payload: Ve.payload,
              callback: Ve.callback,
              next: null
            };
            Qe === null ? (we = Qe = U, W = H) : Qe = Qe.next = U, $ = ot($, kt);
          }
          if (Ve = Ve.next, Ve === null) {
            if (p = u.shared.pending, p === null)
              break;
            var De = p, Te = De.next;
            De.next = null, Ve = Te, u.lastBaseUpdate = De, u.shared.pending = null;
          }
        } while (!0);
        Qe === null && (W = H), u.baseState = W, u.firstBaseUpdate = we, u.lastBaseUpdate = Qe;
        var tt = u.shared.interleaved;
        if (tt !== null) {
          var ut = tt;
          do
            $ = ot($, ut.lane), ut = ut.next;
          while (ut !== tt);
        } else s === null && (u.shared.lanes = Z);
        nv($), e.lanes = $, e.memoizedState = H;
      }
      pm = null;
    }
    function Mx(e, t) {
      if (typeof e != "function")
        throw new Error("Invalid argument passed as callback. Expected a function. Instead " + ("received: " + e));
      e.call(t);
    }
    function e0() {
      dm = !1;
    }
    function mm() {
      return dm;
    }
    function t0(e, t, a) {
      var i = t.effects;
      if (t.effects = null, i !== null)
        for (var u = 0; u < i.length; u++) {
          var s = i[u], f = s.callback;
          f !== null && (s.callback = null, Mx(f, a));
        }
    }
    var kp = {}, Vo = Uo(kp), Op = Uo(kp), ym = Uo(kp);
    function gm(e) {
      if (e === kp)
        throw new Error("Expected host context to exist. This error is likely caused by a bug in React. Please file an issue.");
      return e;
    }
    function n0() {
      var e = gm(ym.current);
      return e;
    }
    function Vg(e, t) {
      sa(ym, t, e), sa(Op, e, e), sa(Vo, kp, e);
      var a = qT(t);
      oa(Vo, e), sa(Vo, a, e);
    }
    function Ff(e) {
      oa(Vo, e), oa(Op, e), oa(ym, e);
    }
    function Pg() {
      var e = gm(Vo.current);
      return e;
    }
    function r0(e) {
      gm(ym.current);
      var t = gm(Vo.current), a = XT(t, e.type);
      t !== a && (sa(Op, e, e), sa(Vo, a, e));
    }
    function Hg(e) {
      Op.current === e && (oa(Vo, e), oa(Op, e));
    }
    var Ux = 0, a0 = 1, i0 = 1, Lp = 2, ll = Uo(Ux);
    function Bg(e, t) {
      return (e & t) !== 0;
    }
    function Vf(e) {
      return e & a0;
    }
    function Ig(e, t) {
      return e & a0 | t;
    }
    function zx(e, t) {
      return e | t;
    }
    function Po(e, t) {
      sa(ll, t, e);
    }
    function Pf(e) {
      oa(ll, e);
    }
    function Ax(e, t) {
      var a = e.memoizedState;
      return a !== null ? a.dehydrated !== null : (e.memoizedProps, !0);
    }
    function Sm(e) {
      for (var t = e; t !== null; ) {
        if (t.tag === ge) {
          var a = t.memoizedState;
          if (a !== null) {
            var i = a.dehydrated;
            if (i === null || RC(i) || ug(i))
              return t;
          }
        } else if (t.tag === Ot && // revealOrder undefined can't be trusted because it don't
        // keep track of whether it suspended or not.
        t.memoizedProps.revealOrder !== void 0) {
          var u = (t.flags & Pe) !== Ie;
          if (u)
            return t;
        } else if (t.child !== null) {
          t.child.return = t, t = t.child;
          continue;
        }
        if (t === e)
          return null;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e)
            return null;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
      return null;
    }
    var Ia = (
      /*   */
      0
    ), pr = (
      /* */
      1
    ), Gl = (
      /*  */
      2
    ), vr = (
      /*    */
      4
    ), Hr = (
      /*   */
      8
    ), $g = [];
    function Yg() {
      for (var e = 0; e < $g.length; e++) {
        var t = $g[e];
        t._workInProgressVersionPrimary = null;
      }
      $g.length = 0;
    }
    function jx(e, t) {
      var a = t._getVersion, i = a(t._source);
      e.mutableSourceEagerHydrationData == null ? e.mutableSourceEagerHydrationData = [t, i] : e.mutableSourceEagerHydrationData.push(t, i);
    }
    var _e = E.ReactCurrentDispatcher, Mp = E.ReactCurrentBatchConfig, Wg, Hf;
    Wg = /* @__PURE__ */ new Set();
    var ic = Z, en = null, hr = null, mr = null, Em = !1, Up = !1, zp = 0, Fx = 0, Vx = 25, K = null, zi = null, Ho = -1, Qg = !1;
    function Qt() {
      {
        var e = K;
        zi === null ? zi = [e] : zi.push(e);
      }
    }
    function ye() {
      {
        var e = K;
        zi !== null && (Ho++, zi[Ho] !== e && Px(e));
      }
    }
    function Bf(e) {
      e != null && !pt(e) && g("%s received a final argument that is not an array (instead, received `%s`). When specified, the final argument must be an array.", K, typeof e);
    }
    function Px(e) {
      {
        var t = it(en);
        if (!Wg.has(t) && (Wg.add(t), zi !== null)) {
          for (var a = "", i = 30, u = 0; u <= Ho; u++) {
            for (var s = zi[u], f = u === Ho ? e : s, p = u + 1 + ". " + s; p.length < i; )
              p += " ";
            p += f + `
`, a += p;
          }
          g(`React has detected a change in the order of Hooks called by %s. This will lead to bugs and errors if not fixed. For more information, read the Rules of Hooks: https://reactjs.org/link/rules-of-hooks

   Previous render            Next render
   ------------------------------------------------------
%s   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
`, t, a);
        }
      }
    }
    function ca() {
      throw new Error(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`);
    }
    function Gg(e, t) {
      if (Qg)
        return !1;
      if (t === null)
        return g("%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.", K), !1;
      e.length !== t.length && g(`The final argument passed to %s changed size between renders. The order and size of this array must remain constant.

Previous: %s
Incoming: %s`, K, "[" + t.join(", ") + "]", "[" + e.join(", ") + "]");
      for (var a = 0; a < t.length && a < e.length; a++)
        if (!re(e[a], t[a]))
          return !1;
      return !0;
    }
    function If(e, t, a, i, u, s) {
      ic = s, en = t, zi = e !== null ? e._debugHookTypes : null, Ho = -1, Qg = e !== null && e.type !== t.type, t.memoizedState = null, t.updateQueue = null, t.lanes = Z, e !== null && e.memoizedState !== null ? _e.current = _0 : zi !== null ? _e.current = x0 : _e.current = b0;
      var f = a(i, u);
      if (Up) {
        var p = 0;
        do {
          if (Up = !1, zp = 0, p >= Vx)
            throw new Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
          p += 1, Qg = !1, hr = null, mr = null, t.updateQueue = null, Ho = -1, _e.current = D0, f = a(i, u);
        } while (Up);
      }
      _e.current = Mm, t._debugHookTypes = zi;
      var v = hr !== null && hr.next !== null;
      if (ic = Z, en = null, hr = null, mr = null, K = null, zi = null, Ho = -1, e !== null && (e.flags & An) !== (t.flags & An) && // Disable this warning in legacy mode, because legacy Suspense is weird
      // and creates false positives. To make this work in legacy mode, we'd
      // need to mark fibers that commit in an incomplete state, somehow. For
      // now I'll disable the warning that most of the bugs that would trigger
      // it are either exclusive to concurrent mode or exist in both.
      (e.mode & yt) !== $e && g("Internal React error: Expected static flag was missing. Please notify the React team."), Em = !1, v)
        throw new Error("Rendered fewer hooks than expected. This may be caused by an accidental early return statement.");
      return f;
    }
    function $f() {
      var e = zp !== 0;
      return zp = 0, e;
    }
    function l0(e, t, a) {
      t.updateQueue = e.updateQueue, (t.mode & Pt) !== $e ? t.flags &= -50333701 : t.flags &= -2053, e.lanes = Os(e.lanes, a);
    }
    function u0() {
      if (_e.current = Mm, Em) {
        for (var e = en.memoizedState; e !== null; ) {
          var t = e.queue;
          t !== null && (t.pending = null), e = e.next;
        }
        Em = !1;
      }
      ic = Z, en = null, hr = null, mr = null, zi = null, Ho = -1, K = null, E0 = !1, Up = !1, zp = 0;
    }
    function Kl() {
      var e = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null
      };
      return mr === null ? en.memoizedState = mr = e : mr = mr.next = e, mr;
    }
    function Ai() {
      var e;
      if (hr === null) {
        var t = en.alternate;
        t !== null ? e = t.memoizedState : e = null;
      } else
        e = hr.next;
      var a;
      if (mr === null ? a = en.memoizedState : a = mr.next, a !== null)
        mr = a, a = mr.next, hr = e;
      else {
        if (e === null)
          throw new Error("Rendered more hooks than during the previous render.");
        hr = e;
        var i = {
          memoizedState: hr.memoizedState,
          baseState: hr.baseState,
          baseQueue: hr.baseQueue,
          queue: hr.queue,
          next: null
        };
        mr === null ? en.memoizedState = mr = i : mr = mr.next = i;
      }
      return mr;
    }
    function o0() {
      return {
        lastEffect: null,
        stores: null
      };
    }
    function Kg(e, t) {
      return typeof t == "function" ? t(e) : t;
    }
    function qg(e, t, a) {
      var i = Kl(), u;
      a !== void 0 ? u = a(t) : u = t, i.memoizedState = i.baseState = u;
      var s = {
        pending: null,
        interleaved: null,
        lanes: Z,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: u
      };
      i.queue = s;
      var f = s.dispatch = $x.bind(null, en, s);
      return [i.memoizedState, f];
    }
    function Xg(e, t, a) {
      var i = Ai(), u = i.queue;
      if (u === null)
        throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");
      u.lastRenderedReducer = e;
      var s = hr, f = s.baseQueue, p = u.pending;
      if (p !== null) {
        if (f !== null) {
          var v = f.next, S = p.next;
          f.next = S, p.next = v;
        }
        s.baseQueue !== f && g("Internal error: Expected work-in-progress queue to be a clone. This is a bug in React."), s.baseQueue = f = p, u.pending = null;
      }
      if (f !== null) {
        var R = f.next, O = s.baseState, D = null, H = null, $ = null, W = R;
        do {
          var we = W.lane;
          if (ku(ic, we)) {
            if ($ !== null) {
              var Ve = {
                // This update is going to be committed so we never want uncommit
                // it. Using NoLane works because 0 is a subset of all bitmasks, so
                // this will never be skipped by the check above.
                lane: zt,
                action: W.action,
                hasEagerState: W.hasEagerState,
                eagerState: W.eagerState,
                next: null
              };
              $ = $.next = Ve;
            }
            if (W.hasEagerState)
              O = W.eagerState;
            else {
              var kt = W.action;
              O = e(O, kt);
            }
          } else {
            var Qe = {
              lane: we,
              action: W.action,
              hasEagerState: W.hasEagerState,
              eagerState: W.eagerState,
              next: null
            };
            $ === null ? (H = $ = Qe, D = O) : $ = $.next = Qe, en.lanes = ot(en.lanes, we), nv(we);
          }
          W = W.next;
        } while (W !== null && W !== R);
        $ === null ? D = O : $.next = H, re(O, i.memoizedState) || $p(), i.memoizedState = O, i.baseState = D, i.baseQueue = $, u.lastRenderedState = O;
      }
      var Tt = u.interleaved;
      if (Tt !== null) {
        var U = Tt;
        do {
          var Q = U.lane;
          en.lanes = ot(en.lanes, Q), nv(Q), U = U.next;
        } while (U !== Tt);
      } else f === null && (u.lanes = Z);
      var z = u.dispatch;
      return [i.memoizedState, z];
    }
    function Jg(e, t, a) {
      var i = Ai(), u = i.queue;
      if (u === null)
        throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");
      u.lastRenderedReducer = e;
      var s = u.dispatch, f = u.pending, p = i.memoizedState;
      if (f !== null) {
        u.pending = null;
        var v = f.next, S = v;
        do {
          var R = S.action;
          p = e(p, R), S = S.next;
        } while (S !== v);
        re(p, i.memoizedState) || $p(), i.memoizedState = p, i.baseQueue === null && (i.baseState = p), u.lastRenderedState = p;
      }
      return [p, s];
    }
    function Lk(e, t, a) {
    }
    function Mk(e, t, a) {
    }
    function Zg(e, t, a) {
      var i = en, u = Kl(), s, f = Pr();
      if (f) {
        if (a === void 0)
          throw new Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
        s = a(), Hf || s !== a() && (g("The result of getServerSnapshot should be cached to avoid an infinite loop"), Hf = !0);
      } else {
        if (s = t(), !Hf) {
          var p = t();
          re(s, p) || (g("The result of getSnapshot should be cached to avoid an infinite loop"), Hf = !0);
        }
        var v = Jm();
        if (v === null)
          throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
        uf(v, ic) || s0(i, t, s);
      }
      u.memoizedState = s;
      var S = {
        value: s,
        getSnapshot: t
      };
      return u.queue = S, bm(f0.bind(null, i, S, e), [e]), i.flags |= Jr, Ap(pr | Hr, c0.bind(null, i, S, s, t), void 0, null), s;
    }
    function Cm(e, t, a) {
      var i = en, u = Ai(), s = t();
      if (!Hf) {
        var f = t();
        re(s, f) || (g("The result of getSnapshot should be cached to avoid an infinite loop"), Hf = !0);
      }
      var p = u.memoizedState, v = !re(p, s);
      v && (u.memoizedState = s, $p());
      var S = u.queue;
      if (Fp(f0.bind(null, i, S, e), [e]), S.getSnapshot !== t || v || // Check if the susbcribe function changed. We can save some memory by
      // checking whether we scheduled a subscription effect above.
      mr !== null && mr.memoizedState.tag & pr) {
        i.flags |= Jr, Ap(pr | Hr, c0.bind(null, i, S, s, t), void 0, null);
        var R = Jm();
        if (R === null)
          throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
        uf(R, ic) || s0(i, t, s);
      }
      return s;
    }
    function s0(e, t, a) {
      e.flags |= go;
      var i = {
        getSnapshot: t,
        value: a
      }, u = en.updateQueue;
      if (u === null)
        u = o0(), en.updateQueue = u, u.stores = [i];
      else {
        var s = u.stores;
        s === null ? u.stores = [i] : s.push(i);
      }
    }
    function c0(e, t, a, i) {
      t.value = a, t.getSnapshot = i, d0(t) && p0(e);
    }
    function f0(e, t, a) {
      var i = function() {
        d0(t) && p0(e);
      };
      return a(i);
    }
    function d0(e) {
      var t = e.getSnapshot, a = e.value;
      try {
        var i = t();
        return !re(a, i);
      } catch {
        return !0;
      }
    }
    function p0(e) {
      var t = Ba(e, Ze);
      t !== null && Er(t, e, Ze, nn);
    }
    function Rm(e) {
      var t = Kl();
      typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e;
      var a = {
        pending: null,
        interleaved: null,
        lanes: Z,
        dispatch: null,
        lastRenderedReducer: Kg,
        lastRenderedState: e
      };
      t.queue = a;
      var i = a.dispatch = Yx.bind(null, en, a);
      return [t.memoizedState, i];
    }
    function eS(e) {
      return Xg(Kg);
    }
    function tS(e) {
      return Jg(Kg);
    }
    function Ap(e, t, a, i) {
      var u = {
        tag: e,
        create: t,
        destroy: a,
        deps: i,
        // Circular
        next: null
      }, s = en.updateQueue;
      if (s === null)
        s = o0(), en.updateQueue = s, s.lastEffect = u.next = u;
      else {
        var f = s.lastEffect;
        if (f === null)
          s.lastEffect = u.next = u;
        else {
          var p = f.next;
          f.next = u, u.next = p, s.lastEffect = u;
        }
      }
      return u;
    }
    function nS(e) {
      var t = Kl();
      {
        var a = {
          current: e
        };
        return t.memoizedState = a, a;
      }
    }
    function wm(e) {
      var t = Ai();
      return t.memoizedState;
    }
    function jp(e, t, a, i) {
      var u = Kl(), s = i === void 0 ? null : i;
      en.flags |= e, u.memoizedState = Ap(pr | t, a, void 0, s);
    }
    function Tm(e, t, a, i) {
      var u = Ai(), s = i === void 0 ? null : i, f = void 0;
      if (hr !== null) {
        var p = hr.memoizedState;
        if (f = p.destroy, s !== null) {
          var v = p.deps;
          if (Gg(s, v)) {
            u.memoizedState = Ap(t, a, f, s);
            return;
          }
        }
      }
      en.flags |= e, u.memoizedState = Ap(pr | t, a, f, s);
    }
    function bm(e, t) {
      return (en.mode & Pt) !== $e ? jp(wi | Jr | Mc, Hr, e, t) : jp(Jr | Mc, Hr, e, t);
    }
    function Fp(e, t) {
      return Tm(Jr, Hr, e, t);
    }
    function rS(e, t) {
      return jp(_t, Gl, e, t);
    }
    function xm(e, t) {
      return Tm(_t, Gl, e, t);
    }
    function aS(e, t) {
      var a = _t;
      return a |= Gi, (en.mode & Pt) !== $e && (a |= kl), jp(a, vr, e, t);
    }
    function _m(e, t) {
      return Tm(_t, vr, e, t);
    }
    function v0(e, t) {
      if (typeof t == "function") {
        var a = t, i = e();
        return a(i), function() {
          a(null);
        };
      } else if (t != null) {
        var u = t;
        u.hasOwnProperty("current") || g("Expected useImperativeHandle() first argument to either be a ref callback or React.createRef() object. Instead received: %s.", "an object with keys {" + Object.keys(u).join(", ") + "}");
        var s = e();
        return u.current = s, function() {
          u.current = null;
        };
      }
    }
    function iS(e, t, a) {
      typeof t != "function" && g("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t !== null ? typeof t : "null");
      var i = a != null ? a.concat([e]) : null, u = _t;
      return u |= Gi, (en.mode & Pt) !== $e && (u |= kl), jp(u, vr, v0.bind(null, t, e), i);
    }
    function Dm(e, t, a) {
      typeof t != "function" && g("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t !== null ? typeof t : "null");
      var i = a != null ? a.concat([e]) : null;
      return Tm(_t, vr, v0.bind(null, t, e), i);
    }
    function Hx(e, t) {
    }
    var Nm = Hx;
    function lS(e, t) {
      var a = Kl(), i = t === void 0 ? null : t;
      return a.memoizedState = [e, i], e;
    }
    function km(e, t) {
      var a = Ai(), i = t === void 0 ? null : t, u = a.memoizedState;
      if (u !== null && i !== null) {
        var s = u[1];
        if (Gg(i, s))
          return u[0];
      }
      return a.memoizedState = [e, i], e;
    }
    function uS(e, t) {
      var a = Kl(), i = t === void 0 ? null : t, u = e();
      return a.memoizedState = [u, i], u;
    }
    function Om(e, t) {
      var a = Ai(), i = t === void 0 ? null : t, u = a.memoizedState;
      if (u !== null && i !== null) {
        var s = u[1];
        if (Gg(i, s))
          return u[0];
      }
      var f = e();
      return a.memoizedState = [f, i], f;
    }
    function oS(e) {
      var t = Kl();
      return t.memoizedState = e, e;
    }
    function h0(e) {
      var t = Ai(), a = hr, i = a.memoizedState;
      return y0(t, i, e);
    }
    function m0(e) {
      var t = Ai();
      if (hr === null)
        return t.memoizedState = e, e;
      var a = hr.memoizedState;
      return y0(t, a, e);
    }
    function y0(e, t, a) {
      var i = !Pd(ic);
      if (i) {
        if (!re(a, t)) {
          var u = Id();
          en.lanes = ot(en.lanes, u), nv(u), e.baseState = !0;
        }
        return t;
      } else
        return e.baseState && (e.baseState = !1, $p()), e.memoizedState = a, a;
    }
    function Bx(e, t, a) {
      var i = Va();
      Vn(oh(i, _i)), e(!0);
      var u = Mp.transition;
      Mp.transition = {};
      var s = Mp.transition;
      Mp.transition._updatedFibers = /* @__PURE__ */ new Set();
      try {
        e(!1), t();
      } finally {
        if (Vn(i), Mp.transition = u, u === null && s._updatedFibers) {
          var f = s._updatedFibers.size;
          f > 10 && A("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), s._updatedFibers.clear();
        }
      }
    }
    function sS() {
      var e = Rm(!1), t = e[0], a = e[1], i = Bx.bind(null, a), u = Kl();
      return u.memoizedState = i, [t, i];
    }
    function g0() {
      var e = eS(), t = e[0], a = Ai(), i = a.memoizedState;
      return [t, i];
    }
    function S0() {
      var e = tS(), t = e[0], a = Ai(), i = a.memoizedState;
      return [t, i];
    }
    var E0 = !1;
    function Ix() {
      return E0;
    }
    function cS() {
      var e = Kl(), t = Jm(), a = t.identifierPrefix, i;
      if (Pr()) {
        var u = lx();
        i = ":" + a + "R" + u;
        var s = zp++;
        s > 0 && (i += "H" + s.toString(32)), i += ":";
      } else {
        var f = Fx++;
        i = ":" + a + "r" + f.toString(32) + ":";
      }
      return e.memoizedState = i, i;
    }
    function Lm() {
      var e = Ai(), t = e.memoizedState;
      return t;
    }
    function $x(e, t, a) {
      typeof arguments[3] == "function" && g("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
      var i = Wo(e), u = {
        lane: i,
        action: a,
        hasEagerState: !1,
        eagerState: null,
        next: null
      };
      if (C0(e))
        R0(t, u);
      else {
        var s = qC(e, t, u, i);
        if (s !== null) {
          var f = Ta();
          Er(s, e, i, f), w0(s, t, i);
        }
      }
      T0(e, i);
    }
    function Yx(e, t, a) {
      typeof arguments[3] == "function" && g("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
      var i = Wo(e), u = {
        lane: i,
        action: a,
        hasEagerState: !1,
        eagerState: null,
        next: null
      };
      if (C0(e))
        R0(t, u);
      else {
        var s = e.alternate;
        if (e.lanes === Z && (s === null || s.lanes === Z)) {
          var f = t.lastRenderedReducer;
          if (f !== null) {
            var p;
            p = _e.current, _e.current = ul;
            try {
              var v = t.lastRenderedState, S = f(v, a);
              if (u.hasEagerState = !0, u.eagerState = S, re(S, v)) {
                Nx(e, t, u, i);
                return;
              }
            } catch {
            } finally {
              _e.current = p;
            }
          }
        }
        var R = qC(e, t, u, i);
        if (R !== null) {
          var O = Ta();
          Er(R, e, i, O), w0(R, t, i);
        }
      }
      T0(e, i);
    }
    function C0(e) {
      var t = e.alternate;
      return e === en || t !== null && t === en;
    }
    function R0(e, t) {
      Up = Em = !0;
      var a = e.pending;
      a === null ? t.next = t : (t.next = a.next, a.next = t), e.pending = t;
    }
    function w0(e, t, a) {
      if (Bd(a)) {
        var i = t.lanes;
        i = $d(i, e.pendingLanes);
        var u = ot(i, a);
        t.lanes = u, sf(e, u);
      }
    }
    function T0(e, t, a) {
      Cs(e, t);
    }
    var Mm = {
      readContext: ar,
      useCallback: ca,
      useContext: ca,
      useEffect: ca,
      useImperativeHandle: ca,
      useInsertionEffect: ca,
      useLayoutEffect: ca,
      useMemo: ca,
      useReducer: ca,
      useRef: ca,
      useState: ca,
      useDebugValue: ca,
      useDeferredValue: ca,
      useTransition: ca,
      useMutableSource: ca,
      useSyncExternalStore: ca,
      useId: ca,
      unstable_isNewReconciler: de
    }, b0 = null, x0 = null, _0 = null, D0 = null, ql = null, ul = null, Um = null;
    {
      var fS = function() {
        g("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
      }, lt = function() {
        g("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://reactjs.org/link/rules-of-hooks");
      };
      b0 = {
        readContext: function(e) {
          return ar(e);
        },
        useCallback: function(e, t) {
          return K = "useCallback", Qt(), Bf(t), lS(e, t);
        },
        useContext: function(e) {
          return K = "useContext", Qt(), ar(e);
        },
        useEffect: function(e, t) {
          return K = "useEffect", Qt(), Bf(t), bm(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return K = "useImperativeHandle", Qt(), Bf(a), iS(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return K = "useInsertionEffect", Qt(), Bf(t), rS(e, t);
        },
        useLayoutEffect: function(e, t) {
          return K = "useLayoutEffect", Qt(), Bf(t), aS(e, t);
        },
        useMemo: function(e, t) {
          K = "useMemo", Qt(), Bf(t);
          var a = _e.current;
          _e.current = ql;
          try {
            return uS(e, t);
          } finally {
            _e.current = a;
          }
        },
        useReducer: function(e, t, a) {
          K = "useReducer", Qt();
          var i = _e.current;
          _e.current = ql;
          try {
            return qg(e, t, a);
          } finally {
            _e.current = i;
          }
        },
        useRef: function(e) {
          return K = "useRef", Qt(), nS(e);
        },
        useState: function(e) {
          K = "useState", Qt();
          var t = _e.current;
          _e.current = ql;
          try {
            return Rm(e);
          } finally {
            _e.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return K = "useDebugValue", Qt(), void 0;
        },
        useDeferredValue: function(e) {
          return K = "useDeferredValue", Qt(), oS(e);
        },
        useTransition: function() {
          return K = "useTransition", Qt(), sS();
        },
        useMutableSource: function(e, t, a) {
          return K = "useMutableSource", Qt(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return K = "useSyncExternalStore", Qt(), Zg(e, t, a);
        },
        useId: function() {
          return K = "useId", Qt(), cS();
        },
        unstable_isNewReconciler: de
      }, x0 = {
        readContext: function(e) {
          return ar(e);
        },
        useCallback: function(e, t) {
          return K = "useCallback", ye(), lS(e, t);
        },
        useContext: function(e) {
          return K = "useContext", ye(), ar(e);
        },
        useEffect: function(e, t) {
          return K = "useEffect", ye(), bm(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return K = "useImperativeHandle", ye(), iS(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return K = "useInsertionEffect", ye(), rS(e, t);
        },
        useLayoutEffect: function(e, t) {
          return K = "useLayoutEffect", ye(), aS(e, t);
        },
        useMemo: function(e, t) {
          K = "useMemo", ye();
          var a = _e.current;
          _e.current = ql;
          try {
            return uS(e, t);
          } finally {
            _e.current = a;
          }
        },
        useReducer: function(e, t, a) {
          K = "useReducer", ye();
          var i = _e.current;
          _e.current = ql;
          try {
            return qg(e, t, a);
          } finally {
            _e.current = i;
          }
        },
        useRef: function(e) {
          return K = "useRef", ye(), nS(e);
        },
        useState: function(e) {
          K = "useState", ye();
          var t = _e.current;
          _e.current = ql;
          try {
            return Rm(e);
          } finally {
            _e.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return K = "useDebugValue", ye(), void 0;
        },
        useDeferredValue: function(e) {
          return K = "useDeferredValue", ye(), oS(e);
        },
        useTransition: function() {
          return K = "useTransition", ye(), sS();
        },
        useMutableSource: function(e, t, a) {
          return K = "useMutableSource", ye(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return K = "useSyncExternalStore", ye(), Zg(e, t, a);
        },
        useId: function() {
          return K = "useId", ye(), cS();
        },
        unstable_isNewReconciler: de
      }, _0 = {
        readContext: function(e) {
          return ar(e);
        },
        useCallback: function(e, t) {
          return K = "useCallback", ye(), km(e, t);
        },
        useContext: function(e) {
          return K = "useContext", ye(), ar(e);
        },
        useEffect: function(e, t) {
          return K = "useEffect", ye(), Fp(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return K = "useImperativeHandle", ye(), Dm(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return K = "useInsertionEffect", ye(), xm(e, t);
        },
        useLayoutEffect: function(e, t) {
          return K = "useLayoutEffect", ye(), _m(e, t);
        },
        useMemo: function(e, t) {
          K = "useMemo", ye();
          var a = _e.current;
          _e.current = ul;
          try {
            return Om(e, t);
          } finally {
            _e.current = a;
          }
        },
        useReducer: function(e, t, a) {
          K = "useReducer", ye();
          var i = _e.current;
          _e.current = ul;
          try {
            return Xg(e, t, a);
          } finally {
            _e.current = i;
          }
        },
        useRef: function(e) {
          return K = "useRef", ye(), wm();
        },
        useState: function(e) {
          K = "useState", ye();
          var t = _e.current;
          _e.current = ul;
          try {
            return eS(e);
          } finally {
            _e.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return K = "useDebugValue", ye(), Nm();
        },
        useDeferredValue: function(e) {
          return K = "useDeferredValue", ye(), h0(e);
        },
        useTransition: function() {
          return K = "useTransition", ye(), g0();
        },
        useMutableSource: function(e, t, a) {
          return K = "useMutableSource", ye(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return K = "useSyncExternalStore", ye(), Cm(e, t);
        },
        useId: function() {
          return K = "useId", ye(), Lm();
        },
        unstable_isNewReconciler: de
      }, D0 = {
        readContext: function(e) {
          return ar(e);
        },
        useCallback: function(e, t) {
          return K = "useCallback", ye(), km(e, t);
        },
        useContext: function(e) {
          return K = "useContext", ye(), ar(e);
        },
        useEffect: function(e, t) {
          return K = "useEffect", ye(), Fp(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return K = "useImperativeHandle", ye(), Dm(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return K = "useInsertionEffect", ye(), xm(e, t);
        },
        useLayoutEffect: function(e, t) {
          return K = "useLayoutEffect", ye(), _m(e, t);
        },
        useMemo: function(e, t) {
          K = "useMemo", ye();
          var a = _e.current;
          _e.current = Um;
          try {
            return Om(e, t);
          } finally {
            _e.current = a;
          }
        },
        useReducer: function(e, t, a) {
          K = "useReducer", ye();
          var i = _e.current;
          _e.current = Um;
          try {
            return Jg(e, t, a);
          } finally {
            _e.current = i;
          }
        },
        useRef: function(e) {
          return K = "useRef", ye(), wm();
        },
        useState: function(e) {
          K = "useState", ye();
          var t = _e.current;
          _e.current = Um;
          try {
            return tS(e);
          } finally {
            _e.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return K = "useDebugValue", ye(), Nm();
        },
        useDeferredValue: function(e) {
          return K = "useDeferredValue", ye(), m0(e);
        },
        useTransition: function() {
          return K = "useTransition", ye(), S0();
        },
        useMutableSource: function(e, t, a) {
          return K = "useMutableSource", ye(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return K = "useSyncExternalStore", ye(), Cm(e, t);
        },
        useId: function() {
          return K = "useId", ye(), Lm();
        },
        unstable_isNewReconciler: de
      }, ql = {
        readContext: function(e) {
          return fS(), ar(e);
        },
        useCallback: function(e, t) {
          return K = "useCallback", lt(), Qt(), lS(e, t);
        },
        useContext: function(e) {
          return K = "useContext", lt(), Qt(), ar(e);
        },
        useEffect: function(e, t) {
          return K = "useEffect", lt(), Qt(), bm(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return K = "useImperativeHandle", lt(), Qt(), iS(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return K = "useInsertionEffect", lt(), Qt(), rS(e, t);
        },
        useLayoutEffect: function(e, t) {
          return K = "useLayoutEffect", lt(), Qt(), aS(e, t);
        },
        useMemo: function(e, t) {
          K = "useMemo", lt(), Qt();
          var a = _e.current;
          _e.current = ql;
          try {
            return uS(e, t);
          } finally {
            _e.current = a;
          }
        },
        useReducer: function(e, t, a) {
          K = "useReducer", lt(), Qt();
          var i = _e.current;
          _e.current = ql;
          try {
            return qg(e, t, a);
          } finally {
            _e.current = i;
          }
        },
        useRef: function(e) {
          return K = "useRef", lt(), Qt(), nS(e);
        },
        useState: function(e) {
          K = "useState", lt(), Qt();
          var t = _e.current;
          _e.current = ql;
          try {
            return Rm(e);
          } finally {
            _e.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return K = "useDebugValue", lt(), Qt(), void 0;
        },
        useDeferredValue: function(e) {
          return K = "useDeferredValue", lt(), Qt(), oS(e);
        },
        useTransition: function() {
          return K = "useTransition", lt(), Qt(), sS();
        },
        useMutableSource: function(e, t, a) {
          return K = "useMutableSource", lt(), Qt(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return K = "useSyncExternalStore", lt(), Qt(), Zg(e, t, a);
        },
        useId: function() {
          return K = "useId", lt(), Qt(), cS();
        },
        unstable_isNewReconciler: de
      }, ul = {
        readContext: function(e) {
          return fS(), ar(e);
        },
        useCallback: function(e, t) {
          return K = "useCallback", lt(), ye(), km(e, t);
        },
        useContext: function(e) {
          return K = "useContext", lt(), ye(), ar(e);
        },
        useEffect: function(e, t) {
          return K = "useEffect", lt(), ye(), Fp(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return K = "useImperativeHandle", lt(), ye(), Dm(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return K = "useInsertionEffect", lt(), ye(), xm(e, t);
        },
        useLayoutEffect: function(e, t) {
          return K = "useLayoutEffect", lt(), ye(), _m(e, t);
        },
        useMemo: function(e, t) {
          K = "useMemo", lt(), ye();
          var a = _e.current;
          _e.current = ul;
          try {
            return Om(e, t);
          } finally {
            _e.current = a;
          }
        },
        useReducer: function(e, t, a) {
          K = "useReducer", lt(), ye();
          var i = _e.current;
          _e.current = ul;
          try {
            return Xg(e, t, a);
          } finally {
            _e.current = i;
          }
        },
        useRef: function(e) {
          return K = "useRef", lt(), ye(), wm();
        },
        useState: function(e) {
          K = "useState", lt(), ye();
          var t = _e.current;
          _e.current = ul;
          try {
            return eS(e);
          } finally {
            _e.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return K = "useDebugValue", lt(), ye(), Nm();
        },
        useDeferredValue: function(e) {
          return K = "useDeferredValue", lt(), ye(), h0(e);
        },
        useTransition: function() {
          return K = "useTransition", lt(), ye(), g0();
        },
        useMutableSource: function(e, t, a) {
          return K = "useMutableSource", lt(), ye(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return K = "useSyncExternalStore", lt(), ye(), Cm(e, t);
        },
        useId: function() {
          return K = "useId", lt(), ye(), Lm();
        },
        unstable_isNewReconciler: de
      }, Um = {
        readContext: function(e) {
          return fS(), ar(e);
        },
        useCallback: function(e, t) {
          return K = "useCallback", lt(), ye(), km(e, t);
        },
        useContext: function(e) {
          return K = "useContext", lt(), ye(), ar(e);
        },
        useEffect: function(e, t) {
          return K = "useEffect", lt(), ye(), Fp(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return K = "useImperativeHandle", lt(), ye(), Dm(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return K = "useInsertionEffect", lt(), ye(), xm(e, t);
        },
        useLayoutEffect: function(e, t) {
          return K = "useLayoutEffect", lt(), ye(), _m(e, t);
        },
        useMemo: function(e, t) {
          K = "useMemo", lt(), ye();
          var a = _e.current;
          _e.current = ul;
          try {
            return Om(e, t);
          } finally {
            _e.current = a;
          }
        },
        useReducer: function(e, t, a) {
          K = "useReducer", lt(), ye();
          var i = _e.current;
          _e.current = ul;
          try {
            return Jg(e, t, a);
          } finally {
            _e.current = i;
          }
        },
        useRef: function(e) {
          return K = "useRef", lt(), ye(), wm();
        },
        useState: function(e) {
          K = "useState", lt(), ye();
          var t = _e.current;
          _e.current = ul;
          try {
            return tS(e);
          } finally {
            _e.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return K = "useDebugValue", lt(), ye(), Nm();
        },
        useDeferredValue: function(e) {
          return K = "useDeferredValue", lt(), ye(), m0(e);
        },
        useTransition: function() {
          return K = "useTransition", lt(), ye(), S0();
        },
        useMutableSource: function(e, t, a) {
          return K = "useMutableSource", lt(), ye(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return K = "useSyncExternalStore", lt(), ye(), Cm(e, t);
        },
        useId: function() {
          return K = "useId", lt(), ye(), Lm();
        },
        unstable_isNewReconciler: de
      };
    }
    var Bo = C.unstable_now, N0 = 0, zm = -1, Vp = -1, Am = -1, dS = !1, jm = !1;
    function k0() {
      return dS;
    }
    function Wx() {
      jm = !0;
    }
    function Qx() {
      dS = !1, jm = !1;
    }
    function Gx() {
      dS = jm, jm = !1;
    }
    function O0() {
      return N0;
    }
    function L0() {
      N0 = Bo();
    }
    function pS(e) {
      Vp = Bo(), e.actualStartTime < 0 && (e.actualStartTime = Bo());
    }
    function M0(e) {
      Vp = -1;
    }
    function Fm(e, t) {
      if (Vp >= 0) {
        var a = Bo() - Vp;
        e.actualDuration += a, t && (e.selfBaseDuration = a), Vp = -1;
      }
    }
    function Xl(e) {
      if (zm >= 0) {
        var t = Bo() - zm;
        zm = -1;
        for (var a = e.return; a !== null; ) {
          switch (a.tag) {
            case V:
              var i = a.stateNode;
              i.effectDuration += t;
              return;
            case he:
              var u = a.stateNode;
              u.effectDuration += t;
              return;
          }
          a = a.return;
        }
      }
    }
    function vS(e) {
      if (Am >= 0) {
        var t = Bo() - Am;
        Am = -1;
        for (var a = e.return; a !== null; ) {
          switch (a.tag) {
            case V:
              var i = a.stateNode;
              i !== null && (i.passiveEffectDuration += t);
              return;
            case he:
              var u = a.stateNode;
              u !== null && (u.passiveEffectDuration += t);
              return;
          }
          a = a.return;
        }
      }
    }
    function Jl() {
      zm = Bo();
    }
    function hS() {
      Am = Bo();
    }
    function mS(e) {
      for (var t = e.child; t; )
        e.actualDuration += t.actualDuration, t = t.sibling;
    }
    function ol(e, t) {
      if (e && e.defaultProps) {
        var a = mt({}, t), i = e.defaultProps;
        for (var u in i)
          a[u] === void 0 && (a[u] = i[u]);
        return a;
      }
      return t;
    }
    var yS = {}, gS, SS, ES, CS, RS, U0, Vm, wS, TS, bS, Pp;
    {
      gS = /* @__PURE__ */ new Set(), SS = /* @__PURE__ */ new Set(), ES = /* @__PURE__ */ new Set(), CS = /* @__PURE__ */ new Set(), wS = /* @__PURE__ */ new Set(), RS = /* @__PURE__ */ new Set(), TS = /* @__PURE__ */ new Set(), bS = /* @__PURE__ */ new Set(), Pp = /* @__PURE__ */ new Set();
      var z0 = /* @__PURE__ */ new Set();
      Vm = function(e, t) {
        if (!(e === null || typeof e == "function")) {
          var a = t + "_" + e;
          z0.has(a) || (z0.add(a), g("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t, e));
        }
      }, U0 = function(e, t) {
        if (t === void 0) {
          var a = Lt(e) || "Component";
          RS.has(a) || (RS.add(a), g("%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.", a));
        }
      }, Object.defineProperty(yS, "_processChildContext", {
        enumerable: !1,
        value: function() {
          throw new Error("_processChildContext is not available in React 16+. This likely means you have multiple copies of React and are attempting to nest a React 15 tree inside a React 16 tree using unstable_renderSubtreeIntoContainer, which isn't supported. Try to make sure you have only one copy of React (and ideally, switch to ReactDOM.createPortal).");
        }
      }), Object.freeze(yS);
    }
    function xS(e, t, a, i) {
      var u = e.memoizedState, s = a(i, u);
      {
        if (e.mode & Zt) {
          Sn(!0);
          try {
            s = a(i, u);
          } finally {
            Sn(!1);
          }
        }
        U0(t, s);
      }
      var f = s == null ? u : mt({}, u, s);
      if (e.memoizedState = f, e.lanes === Z) {
        var p = e.updateQueue;
        p.baseState = f;
      }
    }
    var _S = {
      isMounted: Wv,
      enqueueSetState: function(e, t, a) {
        var i = yo(e), u = Ta(), s = Wo(i), f = Bu(u, s);
        f.payload = t, a != null && (Vm(a, "setState"), f.callback = a);
        var p = Fo(i, f, s);
        p !== null && (Er(p, i, s, u), vm(p, i, s)), Cs(i, s);
      },
      enqueueReplaceState: function(e, t, a) {
        var i = yo(e), u = Ta(), s = Wo(i), f = Bu(u, s);
        f.tag = JC, f.payload = t, a != null && (Vm(a, "replaceState"), f.callback = a);
        var p = Fo(i, f, s);
        p !== null && (Er(p, i, s, u), vm(p, i, s)), Cs(i, s);
      },
      enqueueForceUpdate: function(e, t) {
        var a = yo(e), i = Ta(), u = Wo(a), s = Bu(i, u);
        s.tag = fm, t != null && (Vm(t, "forceUpdate"), s.callback = t);
        var f = Fo(a, s, u);
        f !== null && (Er(f, a, u, i), vm(f, a, u)), Pc(a, u);
      }
    };
    function A0(e, t, a, i, u, s, f) {
      var p = e.stateNode;
      if (typeof p.shouldComponentUpdate == "function") {
        var v = p.shouldComponentUpdate(i, s, f);
        {
          if (e.mode & Zt) {
            Sn(!0);
            try {
              v = p.shouldComponentUpdate(i, s, f);
            } finally {
              Sn(!1);
            }
          }
          v === void 0 && g("%s.shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false.", Lt(t) || "Component");
        }
        return v;
      }
      return t.prototype && t.prototype.isPureReactComponent ? !Le(a, i) || !Le(u, s) : !0;
    }
    function Kx(e, t, a) {
      var i = e.stateNode;
      {
        var u = Lt(t) || "Component", s = i.render;
        s || (t.prototype && typeof t.prototype.render == "function" ? g("%s(...): No `render` method found on the returned component instance: did you accidentally return an object from the constructor?", u) : g("%s(...): No `render` method found on the returned component instance: you may have forgotten to define `render`.", u)), i.getInitialState && !i.getInitialState.isReactClassApproved && !i.state && g("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?", u), i.getDefaultProps && !i.getDefaultProps.isReactClassApproved && g("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.", u), i.propTypes && g("propTypes was defined as an instance property on %s. Use a static property to define propTypes instead.", u), i.contextType && g("contextType was defined as an instance property on %s. Use a static property to define contextType instead.", u), t.childContextTypes && !Pp.has(t) && // Strict Mode has its own warning for legacy context, so we can skip
        // this one.
        (e.mode & Zt) === $e && (Pp.add(t), g(`%s uses the legacy childContextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() instead

.Learn more about this warning here: https://reactjs.org/link/legacy-context`, u)), t.contextTypes && !Pp.has(t) && // Strict Mode has its own warning for legacy context, so we can skip
        // this one.
        (e.mode & Zt) === $e && (Pp.add(t), g(`%s uses the legacy contextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() with static contextType instead.

Learn more about this warning here: https://reactjs.org/link/legacy-context`, u)), i.contextTypes && g("contextTypes was defined as an instance property on %s. Use a static property to define contextTypes instead.", u), t.contextType && t.contextTypes && !TS.has(t) && (TS.add(t), g("%s declares both contextTypes and contextType static properties. The legacy contextTypes property will be ignored.", u)), typeof i.componentShouldUpdate == "function" && g("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.", u), t.prototype && t.prototype.isPureReactComponent && typeof i.shouldComponentUpdate < "u" && g("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.", Lt(t) || "A pure component"), typeof i.componentDidUnmount == "function" && g("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?", u), typeof i.componentDidReceiveProps == "function" && g("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().", u), typeof i.componentWillRecieveProps == "function" && g("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?", u), typeof i.UNSAFE_componentWillRecieveProps == "function" && g("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?", u);
        var f = i.props !== a;
        i.props !== void 0 && f && g("%s(...): When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.", u, u), i.defaultProps && g("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.", u, u), typeof i.getSnapshotBeforeUpdate == "function" && typeof i.componentDidUpdate != "function" && !ES.has(t) && (ES.add(t), g("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.", Lt(t))), typeof i.getDerivedStateFromProps == "function" && g("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.", u), typeof i.getDerivedStateFromError == "function" && g("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.", u), typeof t.getSnapshotBeforeUpdate == "function" && g("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.", u);
        var p = i.state;
        p && (typeof p != "object" || pt(p)) && g("%s.state: must be set to an object or null", u), typeof i.getChildContext == "function" && typeof t.childContextTypes != "object" && g("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().", u);
      }
    }
    function j0(e, t) {
      t.updater = _S, e.stateNode = t, mu(t, e), t._reactInternalInstance = yS;
    }
    function F0(e, t, a) {
      var i = !1, u = oi, s = oi, f = t.contextType;
      if ("contextType" in t) {
        var p = (
          // Allow null for conditional declaration
          f === null || f !== void 0 && f.$$typeof === me && f._context === void 0
        );
        if (!p && !bS.has(t)) {
          bS.add(t);
          var v = "";
          f === void 0 ? v = " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file." : typeof f != "object" ? v = " However, it is set to a " + typeof f + "." : f.$$typeof === ee ? v = " Did you accidentally pass the Context.Provider instead?" : f._context !== void 0 ? v = " Did you accidentally pass the Context.Consumer instead?" : v = " However, it is set to an object with keys {" + Object.keys(f).join(", ") + "}.", g("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s", Lt(t) || "Component", v);
        }
      }
      if (typeof f == "object" && f !== null)
        s = ar(f);
      else {
        u = kf(e, t, !0);
        var S = t.contextTypes;
        i = S != null, s = i ? Of(e, u) : oi;
      }
      var R = new t(a, s);
      if (e.mode & Zt) {
        Sn(!0);
        try {
          R = new t(a, s);
        } finally {
          Sn(!1);
        }
      }
      var O = e.memoizedState = R.state !== null && R.state !== void 0 ? R.state : null;
      j0(e, R);
      {
        if (typeof t.getDerivedStateFromProps == "function" && O === null) {
          var D = Lt(t) || "Component";
          SS.has(D) || (SS.add(D), g("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.", D, R.state === null ? "null" : "undefined", D));
        }
        if (typeof t.getDerivedStateFromProps == "function" || typeof R.getSnapshotBeforeUpdate == "function") {
          var H = null, $ = null, W = null;
          if (typeof R.componentWillMount == "function" && R.componentWillMount.__suppressDeprecationWarning !== !0 ? H = "componentWillMount" : typeof R.UNSAFE_componentWillMount == "function" && (H = "UNSAFE_componentWillMount"), typeof R.componentWillReceiveProps == "function" && R.componentWillReceiveProps.__suppressDeprecationWarning !== !0 ? $ = "componentWillReceiveProps" : typeof R.UNSAFE_componentWillReceiveProps == "function" && ($ = "UNSAFE_componentWillReceiveProps"), typeof R.componentWillUpdate == "function" && R.componentWillUpdate.__suppressDeprecationWarning !== !0 ? W = "componentWillUpdate" : typeof R.UNSAFE_componentWillUpdate == "function" && (W = "UNSAFE_componentWillUpdate"), H !== null || $ !== null || W !== null) {
            var we = Lt(t) || "Component", Qe = typeof t.getDerivedStateFromProps == "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
            CS.has(we) || (CS.add(we), g(`Unsafe legacy lifecycles will not be called for components using new component APIs.

%s uses %s but also contains the following legacy lifecycles:%s%s%s

The above lifecycles should be removed. Learn more about this warning here:
https://reactjs.org/link/unsafe-component-lifecycles`, we, Qe, H !== null ? `
  ` + H : "", $ !== null ? `
  ` + $ : "", W !== null ? `
  ` + W : ""));
          }
        }
      }
      return i && _C(e, u, s), R;
    }
    function qx(e, t) {
      var a = t.state;
      typeof t.componentWillMount == "function" && t.componentWillMount(), typeof t.UNSAFE_componentWillMount == "function" && t.UNSAFE_componentWillMount(), a !== t.state && (g("%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", it(e) || "Component"), _S.enqueueReplaceState(t, t.state, null));
    }
    function V0(e, t, a, i) {
      var u = t.state;
      if (typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(a, i), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(a, i), t.state !== u) {
        {
          var s = it(e) || "Component";
          gS.has(s) || (gS.add(s), g("%s.componentWillReceiveProps(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", s));
        }
        _S.enqueueReplaceState(t, t.state, null);
      }
    }
    function DS(e, t, a, i) {
      Kx(e, t, a);
      var u = e.stateNode;
      u.props = a, u.state = e.memoizedState, u.refs = {}, jg(e);
      var s = t.contextType;
      if (typeof s == "object" && s !== null)
        u.context = ar(s);
      else {
        var f = kf(e, t, !0);
        u.context = Of(e, f);
      }
      {
        if (u.state === a) {
          var p = Lt(t) || "Component";
          wS.has(p) || (wS.add(p), g("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.", p));
        }
        e.mode & Zt && il.recordLegacyContextWarning(e, u), il.recordUnsafeLifecycleWarnings(e, u);
      }
      u.state = e.memoizedState;
      var v = t.getDerivedStateFromProps;
      if (typeof v == "function" && (xS(e, t, v, a), u.state = e.memoizedState), typeof t.getDerivedStateFromProps != "function" && typeof u.getSnapshotBeforeUpdate != "function" && (typeof u.UNSAFE_componentWillMount == "function" || typeof u.componentWillMount == "function") && (qx(e, u), hm(e, a, u, i), u.state = e.memoizedState), typeof u.componentDidMount == "function") {
        var S = _t;
        S |= Gi, (e.mode & Pt) !== $e && (S |= kl), e.flags |= S;
      }
    }
    function Xx(e, t, a, i) {
      var u = e.stateNode, s = e.memoizedProps;
      u.props = s;
      var f = u.context, p = t.contextType, v = oi;
      if (typeof p == "object" && p !== null)
        v = ar(p);
      else {
        var S = kf(e, t, !0);
        v = Of(e, S);
      }
      var R = t.getDerivedStateFromProps, O = typeof R == "function" || typeof u.getSnapshotBeforeUpdate == "function";
      !O && (typeof u.UNSAFE_componentWillReceiveProps == "function" || typeof u.componentWillReceiveProps == "function") && (s !== a || f !== v) && V0(e, u, a, v), e0();
      var D = e.memoizedState, H = u.state = D;
      if (hm(e, a, u, i), H = e.memoizedState, s === a && D === H && !qh() && !mm()) {
        if (typeof u.componentDidMount == "function") {
          var $ = _t;
          $ |= Gi, (e.mode & Pt) !== $e && ($ |= kl), e.flags |= $;
        }
        return !1;
      }
      typeof R == "function" && (xS(e, t, R, a), H = e.memoizedState);
      var W = mm() || A0(e, t, s, a, D, H, v);
      if (W) {
        if (!O && (typeof u.UNSAFE_componentWillMount == "function" || typeof u.componentWillMount == "function") && (typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()), typeof u.componentDidMount == "function") {
          var we = _t;
          we |= Gi, (e.mode & Pt) !== $e && (we |= kl), e.flags |= we;
        }
      } else {
        if (typeof u.componentDidMount == "function") {
          var Qe = _t;
          Qe |= Gi, (e.mode & Pt) !== $e && (Qe |= kl), e.flags |= Qe;
        }
        e.memoizedProps = a, e.memoizedState = H;
      }
      return u.props = a, u.state = H, u.context = v, W;
    }
    function Jx(e, t, a, i, u) {
      var s = t.stateNode;
      ZC(e, t);
      var f = t.memoizedProps, p = t.type === t.elementType ? f : ol(t.type, f);
      s.props = p;
      var v = t.pendingProps, S = s.context, R = a.contextType, O = oi;
      if (typeof R == "object" && R !== null)
        O = ar(R);
      else {
        var D = kf(t, a, !0);
        O = Of(t, D);
      }
      var H = a.getDerivedStateFromProps, $ = typeof H == "function" || typeof s.getSnapshotBeforeUpdate == "function";
      !$ && (typeof s.UNSAFE_componentWillReceiveProps == "function" || typeof s.componentWillReceiveProps == "function") && (f !== v || S !== O) && V0(t, s, i, O), e0();
      var W = t.memoizedState, we = s.state = W;
      if (hm(t, i, s, u), we = t.memoizedState, f === v && W === we && !qh() && !mm() && !Fe)
        return typeof s.componentDidUpdate == "function" && (f !== e.memoizedProps || W !== e.memoizedState) && (t.flags |= _t), typeof s.getSnapshotBeforeUpdate == "function" && (f !== e.memoizedProps || W !== e.memoizedState) && (t.flags |= Gn), !1;
      typeof H == "function" && (xS(t, a, H, i), we = t.memoizedState);
      var Qe = mm() || A0(t, a, p, i, W, we, O) || // TODO: In some cases, we'll end up checking if context has changed twice,
      // both before and after `shouldComponentUpdate` has been called. Not ideal,
      // but I'm loath to refactor this function. This only happens for memoized
      // components so it's not that common.
      Fe;
      return Qe ? (!$ && (typeof s.UNSAFE_componentWillUpdate == "function" || typeof s.componentWillUpdate == "function") && (typeof s.componentWillUpdate == "function" && s.componentWillUpdate(i, we, O), typeof s.UNSAFE_componentWillUpdate == "function" && s.UNSAFE_componentWillUpdate(i, we, O)), typeof s.componentDidUpdate == "function" && (t.flags |= _t), typeof s.getSnapshotBeforeUpdate == "function" && (t.flags |= Gn)) : (typeof s.componentDidUpdate == "function" && (f !== e.memoizedProps || W !== e.memoizedState) && (t.flags |= _t), typeof s.getSnapshotBeforeUpdate == "function" && (f !== e.memoizedProps || W !== e.memoizedState) && (t.flags |= Gn), t.memoizedProps = i, t.memoizedState = we), s.props = i, s.state = we, s.context = O, Qe;
    }
    function lc(e, t) {
      return {
        value: e,
        source: t,
        stack: Bi(t),
        digest: null
      };
    }
    function NS(e, t, a) {
      return {
        value: e,
        source: null,
        stack: a ?? null,
        digest: t ?? null
      };
    }
    function Zx(e, t) {
      return !0;
    }
    function kS(e, t) {
      try {
        var a = Zx(e, t);
        if (a === !1)
          return;
        var i = t.value, u = t.source, s = t.stack, f = s !== null ? s : "";
        if (i != null && i._suppressLogging) {
          if (e.tag === F)
            return;
          console.error(i);
        }
        var p = u ? it(u) : null, v = p ? "The above error occurred in the <" + p + "> component:" : "The above error occurred in one of your React components:", S;
        if (e.tag === V)
          S = `Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.`;
        else {
          var R = it(e) || "Anonymous";
          S = "React will try to recreate this component tree from scratch " + ("using the error boundary you provided, " + R + ".");
        }
        var O = v + `
` + f + `

` + ("" + S);
        console.error(O);
      } catch (D) {
        setTimeout(function() {
          throw D;
        });
      }
    }
    var e1 = typeof WeakMap == "function" ? WeakMap : Map;
    function P0(e, t, a) {
      var i = Bu(nn, a);
      i.tag = zg, i.payload = {
        element: null
      };
      var u = t.value;
      return i.callback = function() {
        W_(u), kS(e, t);
      }, i;
    }
    function OS(e, t, a) {
      var i = Bu(nn, a);
      i.tag = zg;
      var u = e.type.getDerivedStateFromError;
      if (typeof u == "function") {
        var s = t.value;
        i.payload = function() {
          return u(s);
        }, i.callback = function() {
          XR(e), kS(e, t);
        };
      }
      var f = e.stateNode;
      return f !== null && typeof f.componentDidCatch == "function" && (i.callback = function() {
        XR(e), kS(e, t), typeof u != "function" && $_(this);
        var v = t.value, S = t.stack;
        this.componentDidCatch(v, {
          componentStack: S !== null ? S : ""
        }), typeof u != "function" && (aa(e.lanes, Ze) || g("%s: Error boundaries should implement getDerivedStateFromError(). In that method, return a state update to display an error message or fallback UI.", it(e) || "Unknown"));
      }), i;
    }
    function H0(e, t, a) {
      var i = e.pingCache, u;
      if (i === null ? (i = e.pingCache = new e1(), u = /* @__PURE__ */ new Set(), i.set(t, u)) : (u = i.get(t), u === void 0 && (u = /* @__PURE__ */ new Set(), i.set(t, u))), !u.has(a)) {
        u.add(a);
        var s = Q_.bind(null, e, t, a);
        na && rv(e, a), t.then(s, s);
      }
    }
    function t1(e, t, a, i) {
      var u = e.updateQueue;
      if (u === null) {
        var s = /* @__PURE__ */ new Set();
        s.add(a), e.updateQueue = s;
      } else
        u.add(a);
    }
    function n1(e, t) {
      var a = e.tag;
      if ((e.mode & yt) === $e && (a === P || a === ae || a === Ne)) {
        var i = e.alternate;
        i ? (e.updateQueue = i.updateQueue, e.memoizedState = i.memoizedState, e.lanes = i.lanes) : (e.updateQueue = null, e.memoizedState = null);
      }
    }
    function B0(e) {
      var t = e;
      do {
        if (t.tag === ge && Ax(t))
          return t;
        t = t.return;
      } while (t !== null);
      return null;
    }
    function I0(e, t, a, i, u) {
      if ((e.mode & yt) === $e) {
        if (e === t)
          e.flags |= er;
        else {
          if (e.flags |= Pe, a.flags |= Lc, a.flags &= -52805, a.tag === F) {
            var s = a.alternate;
            if (s === null)
              a.tag = Et;
            else {
              var f = Bu(nn, Ze);
              f.tag = fm, Fo(a, f, Ze);
            }
          }
          a.lanes = ot(a.lanes, Ze);
        }
        return e;
      }
      return e.flags |= er, e.lanes = u, e;
    }
    function r1(e, t, a, i, u) {
      if (a.flags |= hs, na && rv(e, u), i !== null && typeof i == "object" && typeof i.then == "function") {
        var s = i;
        n1(a), Pr() && a.mode & yt && UC();
        var f = B0(t);
        if (f !== null) {
          f.flags &= ~xr, I0(f, t, a, e, u), f.mode & yt && H0(e, s, u), t1(f, e, s);
          return;
        } else {
          if (!eh(u)) {
            H0(e, s, u), cE();
            return;
          }
          var p = new Error("A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator. To fix, updates that suspend should be wrapped with startTransition.");
          i = p;
        }
      } else if (Pr() && a.mode & yt) {
        UC();
        var v = B0(t);
        if (v !== null) {
          (v.flags & er) === Ie && (v.flags |= xr), I0(v, t, a, e, u), wg(lc(i, a));
          return;
        }
      }
      i = lc(i, a), A_(i);
      var S = t;
      do {
        switch (S.tag) {
          case V: {
            var R = i;
            S.flags |= er;
            var O = ks(u);
            S.lanes = ot(S.lanes, O);
            var D = P0(S, R, O);
            Fg(S, D);
            return;
          }
          case F:
            var H = i, $ = S.type, W = S.stateNode;
            if ((S.flags & Pe) === Ie && (typeof $.getDerivedStateFromError == "function" || W !== null && typeof W.componentDidCatch == "function" && !BR(W))) {
              S.flags |= er;
              var we = ks(u);
              S.lanes = ot(S.lanes, we);
              var Qe = OS(S, H, we);
              Fg(S, Qe);
              return;
            }
            break;
        }
        S = S.return;
      } while (S !== null);
    }
    function a1() {
      return null;
    }
    var Hp = E.ReactCurrentOwner, sl = !1, LS, Bp, MS, US, zS, uc, AS, Pm, Ip;
    LS = {}, Bp = {}, MS = {}, US = {}, zS = {}, uc = !1, AS = {}, Pm = {}, Ip = {};
    function Ra(e, t, a, i) {
      e === null ? t.child = WC(t, null, a, i) : t.child = zf(t, e.child, a, i);
    }
    function i1(e, t, a, i) {
      t.child = zf(t, e.child, null, i), t.child = zf(t, null, a, i);
    }
    function $0(e, t, a, i, u) {
      if (t.type !== t.elementType) {
        var s = a.propTypes;
        s && rl(
          s,
          i,
          // Resolved props
          "prop",
          Lt(a)
        );
      }
      var f = a.render, p = t.ref, v, S;
      jf(t, u), ga(t);
      {
        if (Hp.current = t, Qn(!0), v = If(e, t, f, i, p, u), S = $f(), t.mode & Zt) {
          Sn(!0);
          try {
            v = If(e, t, f, i, p, u), S = $f();
          } finally {
            Sn(!1);
          }
        }
        Qn(!1);
      }
      return Sa(), e !== null && !sl ? (l0(e, t, u), Iu(e, t, u)) : (Pr() && S && yg(t), t.flags |= ri, Ra(e, t, v, u), t.child);
    }
    function Y0(e, t, a, i, u) {
      if (e === null) {
        var s = a.type;
        if (cD(s) && a.compare === null && // SimpleMemoComponent codepath doesn't resolve outer props either.
        a.defaultProps === void 0) {
          var f = s;
          return f = Jf(s), t.tag = Ne, t.type = f, VS(t, s), W0(e, t, f, i, u);
        }
        {
          var p = s.propTypes;
          if (p && rl(
            p,
            i,
            // Resolved props
            "prop",
            Lt(s)
          ), a.defaultProps !== void 0) {
            var v = Lt(s) || "Unknown";
            Ip[v] || (g("%s: Support for defaultProps will be removed from memo components in a future major release. Use JavaScript default parameters instead.", v), Ip[v] = !0);
          }
        }
        var S = CE(a.type, null, i, t, t.mode, u);
        return S.ref = t.ref, S.return = t, t.child = S, S;
      }
      {
        var R = a.type, O = R.propTypes;
        O && rl(
          O,
          i,
          // Resolved props
          "prop",
          Lt(R)
        );
      }
      var D = e.child, H = YS(e, u);
      if (!H) {
        var $ = D.memoizedProps, W = a.compare;
        if (W = W !== null ? W : Le, W($, i) && e.ref === t.ref)
          return Iu(e, t, u);
      }
      t.flags |= ri;
      var we = dc(D, i);
      return we.ref = t.ref, we.return = t, t.child = we, we;
    }
    function W0(e, t, a, i, u) {
      if (t.type !== t.elementType) {
        var s = t.elementType;
        if (s.$$typeof === Ye) {
          var f = s, p = f._payload, v = f._init;
          try {
            s = v(p);
          } catch {
            s = null;
          }
          var S = s && s.propTypes;
          S && rl(
            S,
            i,
            // Resolved (SimpleMemoComponent has no defaultProps)
            "prop",
            Lt(s)
          );
        }
      }
      if (e !== null) {
        var R = e.memoizedProps;
        if (Le(R, i) && e.ref === t.ref && // Prevent bailout if the implementation changed due to hot reload.
        t.type === e.type)
          if (sl = !1, t.pendingProps = i = R, YS(e, u))
            (e.flags & Lc) !== Ie && (sl = !0);
          else return t.lanes = e.lanes, Iu(e, t, u);
      }
      return jS(e, t, a, i, u);
    }
    function Q0(e, t, a) {
      var i = t.pendingProps, u = i.children, s = e !== null ? e.memoizedState : null;
      if (i.mode === "hidden" || Se)
        if ((t.mode & yt) === $e) {
          var f = {
            baseLanes: Z,
            cachePool: null,
            transitions: null
          };
          t.memoizedState = f, Zm(t, a);
        } else if (aa(a, ra)) {
          var O = {
            baseLanes: Z,
            cachePool: null,
            transitions: null
          };
          t.memoizedState = O;
          var D = s !== null ? s.baseLanes : a;
          Zm(t, D);
        } else {
          var p = null, v;
          if (s !== null) {
            var S = s.baseLanes;
            v = ot(S, a);
          } else
            v = a;
          t.lanes = t.childLanes = ra;
          var R = {
            baseLanes: v,
            cachePool: p,
            transitions: null
          };
          return t.memoizedState = R, t.updateQueue = null, Zm(t, v), null;
        }
      else {
        var H;
        s !== null ? (H = ot(s.baseLanes, a), t.memoizedState = null) : H = a, Zm(t, H);
      }
      return Ra(e, t, u, a), t.child;
    }
    function l1(e, t, a) {
      var i = t.pendingProps;
      return Ra(e, t, i, a), t.child;
    }
    function u1(e, t, a) {
      var i = t.pendingProps.children;
      return Ra(e, t, i, a), t.child;
    }
    function o1(e, t, a) {
      {
        t.flags |= _t;
        {
          var i = t.stateNode;
          i.effectDuration = 0, i.passiveEffectDuration = 0;
        }
      }
      var u = t.pendingProps, s = u.children;
      return Ra(e, t, s, a), t.child;
    }
    function G0(e, t) {
      var a = t.ref;
      (e === null && a !== null || e !== null && e.ref !== a) && (t.flags |= Rn, t.flags |= So);
    }
    function jS(e, t, a, i, u) {
      if (t.type !== t.elementType) {
        var s = a.propTypes;
        s && rl(
          s,
          i,
          // Resolved props
          "prop",
          Lt(a)
        );
      }
      var f;
      {
        var p = kf(t, a, !0);
        f = Of(t, p);
      }
      var v, S;
      jf(t, u), ga(t);
      {
        if (Hp.current = t, Qn(!0), v = If(e, t, a, i, f, u), S = $f(), t.mode & Zt) {
          Sn(!0);
          try {
            v = If(e, t, a, i, f, u), S = $f();
          } finally {
            Sn(!1);
          }
        }
        Qn(!1);
      }
      return Sa(), e !== null && !sl ? (l0(e, t, u), Iu(e, t, u)) : (Pr() && S && yg(t), t.flags |= ri, Ra(e, t, v, u), t.child);
    }
    function K0(e, t, a, i, u) {
      {
        switch (bD(t)) {
          case !1: {
            var s = t.stateNode, f = t.type, p = new f(t.memoizedProps, s.context), v = p.state;
            s.updater.enqueueSetState(s, v, null);
            break;
          }
          case !0: {
            t.flags |= Pe, t.flags |= er;
            var S = new Error("Simulated error coming from DevTools"), R = ks(u);
            t.lanes = ot(t.lanes, R);
            var O = OS(t, lc(S, t), R);
            Fg(t, O);
            break;
          }
        }
        if (t.type !== t.elementType) {
          var D = a.propTypes;
          D && rl(
            D,
            i,
            // Resolved props
            "prop",
            Lt(a)
          );
        }
      }
      var H;
      Ql(a) ? (H = !0, Jh(t)) : H = !1, jf(t, u);
      var $ = t.stateNode, W;
      $ === null ? (Bm(e, t), F0(t, a, i), DS(t, a, i, u), W = !0) : e === null ? W = Xx(t, a, i, u) : W = Jx(e, t, a, i, u);
      var we = FS(e, t, a, W, H, u);
      {
        var Qe = t.stateNode;
        W && Qe.props !== i && (uc || g("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.", it(t) || "a component"), uc = !0);
      }
      return we;
    }
    function FS(e, t, a, i, u, s) {
      G0(e, t);
      var f = (t.flags & Pe) !== Ie;
      if (!i && !f)
        return u && kC(t, a, !1), Iu(e, t, s);
      var p = t.stateNode;
      Hp.current = t;
      var v;
      if (f && typeof a.getDerivedStateFromError != "function")
        v = null, M0();
      else {
        ga(t);
        {
          if (Qn(!0), v = p.render(), t.mode & Zt) {
            Sn(!0);
            try {
              p.render();
            } finally {
              Sn(!1);
            }
          }
          Qn(!1);
        }
        Sa();
      }
      return t.flags |= ri, e !== null && f ? i1(e, t, v, s) : Ra(e, t, v, s), t.memoizedState = p.state, u && kC(t, a, !0), t.child;
    }
    function q0(e) {
      var t = e.stateNode;
      t.pendingContext ? DC(e, t.pendingContext, t.pendingContext !== t.context) : t.context && DC(e, t.context, !1), Vg(e, t.containerInfo);
    }
    function s1(e, t, a) {
      if (q0(t), e === null)
        throw new Error("Should have a current fiber. This is a bug in React.");
      var i = t.pendingProps, u = t.memoizedState, s = u.element;
      ZC(e, t), hm(t, i, null, a);
      var f = t.memoizedState;
      t.stateNode;
      var p = f.element;
      if (u.isDehydrated) {
        var v = {
          element: p,
          isDehydrated: !1,
          cache: f.cache,
          pendingSuspenseBoundaries: f.pendingSuspenseBoundaries,
          transitions: f.transitions
        }, S = t.updateQueue;
        if (S.baseState = v, t.memoizedState = v, t.flags & xr) {
          var R = lc(new Error("There was an error while hydrating. Because the error happened outside of a Suspense boundary, the entire root will switch to client rendering."), t);
          return X0(e, t, p, a, R);
        } else if (p !== s) {
          var O = lc(new Error("This root received an early update, before anything was able hydrate. Switched the entire root to client rendering."), t);
          return X0(e, t, p, a, O);
        } else {
          dx(t);
          var D = WC(t, null, p, a);
          t.child = D;
          for (var H = D; H; )
            H.flags = H.flags & ~gn | Zr, H = H.sibling;
        }
      } else {
        if (Uf(), p === s)
          return Iu(e, t, a);
        Ra(e, t, p, a);
      }
      return t.child;
    }
    function X0(e, t, a, i, u) {
      return Uf(), wg(u), t.flags |= xr, Ra(e, t, a, i), t.child;
    }
    function c1(e, t, a) {
      r0(t), e === null && Rg(t);
      var i = t.type, u = t.pendingProps, s = e !== null ? e.memoizedProps : null, f = u.children, p = rg(i, u);
      return p ? f = null : s !== null && rg(i, s) && (t.flags |= Ma), G0(e, t), Ra(e, t, f, a), t.child;
    }
    function f1(e, t) {
      return e === null && Rg(t), null;
    }
    function d1(e, t, a, i) {
      Bm(e, t);
      var u = t.pendingProps, s = a, f = s._payload, p = s._init, v = p(f);
      t.type = v;
      var S = t.tag = fD(v), R = ol(v, u), O;
      switch (S) {
        case P:
          return VS(t, v), t.type = v = Jf(v), O = jS(null, t, v, R, i), O;
        case F:
          return t.type = v = hE(v), O = K0(null, t, v, R, i), O;
        case ae:
          return t.type = v = mE(v), O = $0(null, t, v, R, i), O;
        case Ce: {
          if (t.type !== t.elementType) {
            var D = v.propTypes;
            D && rl(
              D,
              R,
              // Resolved for outer only
              "prop",
              Lt(v)
            );
          }
          return O = Y0(
            null,
            t,
            v,
            ol(v.type, R),
            // The inner type can have defaults too
            i
          ), O;
        }
      }
      var H = "";
      throw v !== null && typeof v == "object" && v.$$typeof === Ye && (H = " Did you wrap a component in React.lazy() more than once?"), new Error("Element type is invalid. Received a promise that resolves to: " + v + ". " + ("Lazy element type must resolve to a class or function." + H));
    }
    function p1(e, t, a, i, u) {
      Bm(e, t), t.tag = F;
      var s;
      return Ql(a) ? (s = !0, Jh(t)) : s = !1, jf(t, u), F0(t, a, i), DS(t, a, i, u), FS(null, t, a, !0, s, u);
    }
    function v1(e, t, a, i) {
      Bm(e, t);
      var u = t.pendingProps, s;
      {
        var f = kf(t, a, !1);
        s = Of(t, f);
      }
      jf(t, i);
      var p, v;
      ga(t);
      {
        if (a.prototype && typeof a.prototype.render == "function") {
          var S = Lt(a) || "Unknown";
          LS[S] || (g("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.", S, S), LS[S] = !0);
        }
        t.mode & Zt && il.recordLegacyContextWarning(t, null), Qn(!0), Hp.current = t, p = If(null, t, a, u, s, i), v = $f(), Qn(!1);
      }
      if (Sa(), t.flags |= ri, typeof p == "object" && p !== null && typeof p.render == "function" && p.$$typeof === void 0) {
        var R = Lt(a) || "Unknown";
        Bp[R] || (g("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", R, R, R), Bp[R] = !0);
      }
      if (
        // Run these checks in production only if the flag is off.
        // Eventually we'll delete this branch altogether.
        typeof p == "object" && p !== null && typeof p.render == "function" && p.$$typeof === void 0
      ) {
        {
          var O = Lt(a) || "Unknown";
          Bp[O] || (g("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", O, O, O), Bp[O] = !0);
        }
        t.tag = F, t.memoizedState = null, t.updateQueue = null;
        var D = !1;
        return Ql(a) ? (D = !0, Jh(t)) : D = !1, t.memoizedState = p.state !== null && p.state !== void 0 ? p.state : null, jg(t), j0(t, p), DS(t, a, u, i), FS(null, t, a, !0, D, i);
      } else {
        if (t.tag = P, t.mode & Zt) {
          Sn(!0);
          try {
            p = If(null, t, a, u, s, i), v = $f();
          } finally {
            Sn(!1);
          }
        }
        return Pr() && v && yg(t), Ra(null, t, p, i), VS(t, a), t.child;
      }
    }
    function VS(e, t) {
      {
        if (t && t.childContextTypes && g("%s(...): childContextTypes cannot be defined on a function component.", t.displayName || t.name || "Component"), e.ref !== null) {
          var a = "", i = Mr();
          i && (a += `

Check the render method of \`` + i + "`.");
          var u = i || "", s = e._debugSource;
          s && (u = s.fileName + ":" + s.lineNumber), zS[u] || (zS[u] = !0, g("Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?%s", a));
        }
        if (t.defaultProps !== void 0) {
          var f = Lt(t) || "Unknown";
          Ip[f] || (g("%s: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.", f), Ip[f] = !0);
        }
        if (typeof t.getDerivedStateFromProps == "function") {
          var p = Lt(t) || "Unknown";
          US[p] || (g("%s: Function components do not support getDerivedStateFromProps.", p), US[p] = !0);
        }
        if (typeof t.contextType == "object" && t.contextType !== null) {
          var v = Lt(t) || "Unknown";
          MS[v] || (g("%s: Function components do not support contextType.", v), MS[v] = !0);
        }
      }
    }
    var PS = {
      dehydrated: null,
      treeContext: null,
      retryLane: zt
    };
    function HS(e) {
      return {
        baseLanes: e,
        cachePool: a1(),
        transitions: null
      };
    }
    function h1(e, t) {
      var a = null;
      return {
        baseLanes: ot(e.baseLanes, t),
        cachePool: a,
        transitions: e.transitions
      };
    }
    function m1(e, t, a, i) {
      if (t !== null) {
        var u = t.memoizedState;
        if (u === null)
          return !1;
      }
      return Bg(e, Lp);
    }
    function y1(e, t) {
      return Os(e.childLanes, t);
    }
    function J0(e, t, a) {
      var i = t.pendingProps;
      xD(t) && (t.flags |= Pe);
      var u = ll.current, s = !1, f = (t.flags & Pe) !== Ie;
      if (f || m1(u, e) ? (s = !0, t.flags &= ~Pe) : (e === null || e.memoizedState !== null) && (u = zx(u, i0)), u = Vf(u), Po(t, u), e === null) {
        Rg(t);
        var p = t.memoizedState;
        if (p !== null) {
          var v = p.dehydrated;
          if (v !== null)
            return R1(t, v);
        }
        var S = i.children, R = i.fallback;
        if (s) {
          var O = g1(t, S, R, a), D = t.child;
          return D.memoizedState = HS(a), t.memoizedState = PS, O;
        } else
          return BS(t, S);
      } else {
        var H = e.memoizedState;
        if (H !== null) {
          var $ = H.dehydrated;
          if ($ !== null)
            return w1(e, t, f, i, $, H, a);
        }
        if (s) {
          var W = i.fallback, we = i.children, Qe = E1(e, t, we, W, a), Ve = t.child, kt = e.child.memoizedState;
          return Ve.memoizedState = kt === null ? HS(a) : h1(kt, a), Ve.childLanes = y1(e, a), t.memoizedState = PS, Qe;
        } else {
          var Tt = i.children, U = S1(e, t, Tt, a);
          return t.memoizedState = null, U;
        }
      }
    }
    function BS(e, t, a) {
      var i = e.mode, u = {
        mode: "visible",
        children: t
      }, s = IS(u, i);
      return s.return = e, e.child = s, s;
    }
    function g1(e, t, a, i) {
      var u = e.mode, s = e.child, f = {
        mode: "hidden",
        children: t
      }, p, v;
      return (u & yt) === $e && s !== null ? (p = s, p.childLanes = Z, p.pendingProps = f, e.mode & Vt && (p.actualDuration = 0, p.actualStartTime = -1, p.selfBaseDuration = 0, p.treeBaseDuration = 0), v = Go(a, u, i, null)) : (p = IS(f, u), v = Go(a, u, i, null)), p.return = e, v.return = e, p.sibling = v, e.child = p, v;
    }
    function IS(e, t, a) {
      return ZR(e, t, Z, null);
    }
    function Z0(e, t) {
      return dc(e, t);
    }
    function S1(e, t, a, i) {
      var u = e.child, s = u.sibling, f = Z0(u, {
        mode: "visible",
        children: a
      });
      if ((t.mode & yt) === $e && (f.lanes = i), f.return = t, f.sibling = null, s !== null) {
        var p = t.deletions;
        p === null ? (t.deletions = [s], t.flags |= La) : p.push(s);
      }
      return t.child = f, f;
    }
    function E1(e, t, a, i, u) {
      var s = t.mode, f = e.child, p = f.sibling, v = {
        mode: "hidden",
        children: a
      }, S;
      if (
        // In legacy mode, we commit the primary tree as if it successfully
        // completed, even though it's in an inconsistent state.
        (s & yt) === $e && // Make sure we're on the second pass, i.e. the primary child fragment was
        // already cloned. In legacy mode, the only case where this isn't true is
        // when DevTools forces us to display a fallback; we skip the first render
        // pass entirely and go straight to rendering the fallback. (In Concurrent
        // Mode, SuspenseList can also trigger this scenario, but this is a legacy-
        // only codepath.)
        t.child !== f
      ) {
        var R = t.child;
        S = R, S.childLanes = Z, S.pendingProps = v, t.mode & Vt && (S.actualDuration = 0, S.actualStartTime = -1, S.selfBaseDuration = f.selfBaseDuration, S.treeBaseDuration = f.treeBaseDuration), t.deletions = null;
      } else
        S = Z0(f, v), S.subtreeFlags = f.subtreeFlags & An;
      var O;
      return p !== null ? O = dc(p, i) : (O = Go(i, s, u, null), O.flags |= gn), O.return = t, S.return = t, S.sibling = O, t.child = S, O;
    }
    function Hm(e, t, a, i) {
      i !== null && wg(i), zf(t, e.child, null, a);
      var u = t.pendingProps, s = u.children, f = BS(t, s);
      return f.flags |= gn, t.memoizedState = null, f;
    }
    function C1(e, t, a, i, u) {
      var s = t.mode, f = {
        mode: "visible",
        children: a
      }, p = IS(f, s), v = Go(i, s, u, null);
      return v.flags |= gn, p.return = t, v.return = t, p.sibling = v, t.child = p, (t.mode & yt) !== $e && zf(t, e.child, null, u), v;
    }
    function R1(e, t, a) {
      return (e.mode & yt) === $e ? (g("Cannot hydrate Suspense in legacy mode. Switch from ReactDOM.hydrate(element, container) to ReactDOMClient.hydrateRoot(container, <App />).render(element) or remove the Suspense components from the server rendered components."), e.lanes = Ze) : ug(t) ? e.lanes = _r : e.lanes = ra, null;
    }
    function w1(e, t, a, i, u, s, f) {
      if (a)
        if (t.flags & xr) {
          t.flags &= ~xr;
          var U = NS(new Error("There was an error while hydrating this Suspense boundary. Switched to client rendering."));
          return Hm(e, t, f, U);
        } else {
          if (t.memoizedState !== null)
            return t.child = e.child, t.flags |= Pe, null;
          var Q = i.children, z = i.fallback, se = C1(e, t, Q, z, f), De = t.child;
          return De.memoizedState = HS(f), t.memoizedState = PS, se;
        }
      else {
        if (cx(), (t.mode & yt) === $e)
          return Hm(
            e,
            t,
            f,
            // TODO: When we delete legacy mode, we should make this error argument
            // required — every concurrent mode path that causes hydration to
            // de-opt to client rendering should have an error message.
            null
          );
        if (ug(u)) {
          var p, v, S;
          {
            var R = _b(u);
            p = R.digest, v = R.message, S = R.stack;
          }
          var O;
          v ? O = new Error(v) : O = new Error("The server could not finish this Suspense boundary, likely due to an error during server rendering. Switched to client rendering.");
          var D = NS(O, p, S);
          return Hm(e, t, f, D);
        }
        var H = aa(f, e.childLanes);
        if (sl || H) {
          var $ = Jm();
          if ($ !== null) {
            var W = Wd($, f);
            if (W !== zt && W !== s.retryLane) {
              s.retryLane = W;
              var we = nn;
              Ba(e, W), Er($, e, W, we);
            }
          }
          cE();
          var Qe = NS(new Error("This Suspense boundary received an update before it finished hydrating. This caused the boundary to switch to client rendering. The usual way to fix this is to wrap the original update in startTransition."));
          return Hm(e, t, f, Qe);
        } else if (RC(u)) {
          t.flags |= Pe, t.child = e.child;
          var Ve = G_.bind(null, e);
          return Db(u, Ve), null;
        } else {
          px(t, u, s.treeContext);
          var kt = i.children, Tt = BS(t, kt);
          return Tt.flags |= Zr, Tt;
        }
      }
    }
    function eR(e, t, a) {
      e.lanes = ot(e.lanes, t);
      var i = e.alternate;
      i !== null && (i.lanes = ot(i.lanes, t)), Mg(e.return, t, a);
    }
    function T1(e, t, a) {
      for (var i = t; i !== null; ) {
        if (i.tag === ge) {
          var u = i.memoizedState;
          u !== null && eR(i, a, e);
        } else if (i.tag === Ot)
          eR(i, a, e);
        else if (i.child !== null) {
          i.child.return = i, i = i.child;
          continue;
        }
        if (i === e)
          return;
        for (; i.sibling === null; ) {
          if (i.return === null || i.return === e)
            return;
          i = i.return;
        }
        i.sibling.return = i.return, i = i.sibling;
      }
    }
    function b1(e) {
      for (var t = e, a = null; t !== null; ) {
        var i = t.alternate;
        i !== null && Sm(i) === null && (a = t), t = t.sibling;
      }
      return a;
    }
    function x1(e) {
      if (e !== void 0 && e !== "forwards" && e !== "backwards" && e !== "together" && !AS[e])
        if (AS[e] = !0, typeof e == "string")
          switch (e.toLowerCase()) {
            case "together":
            case "forwards":
            case "backwards": {
              g('"%s" is not a valid value for revealOrder on <SuspenseList />. Use lowercase "%s" instead.', e, e.toLowerCase());
              break;
            }
            case "forward":
            case "backward": {
              g('"%s" is not a valid value for revealOrder on <SuspenseList />. React uses the -s suffix in the spelling. Use "%ss" instead.', e, e.toLowerCase());
              break;
            }
            default:
              g('"%s" is not a supported revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?', e);
              break;
          }
        else
          g('%s is not a supported value for revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?', e);
    }
    function _1(e, t) {
      e !== void 0 && !Pm[e] && (e !== "collapsed" && e !== "hidden" ? (Pm[e] = !0, g('"%s" is not a supported value for tail on <SuspenseList />. Did you mean "collapsed" or "hidden"?', e)) : t !== "forwards" && t !== "backwards" && (Pm[e] = !0, g('<SuspenseList tail="%s" /> is only valid if revealOrder is "forwards" or "backwards". Did you mean to specify revealOrder="forwards"?', e)));
    }
    function tR(e, t) {
      {
        var a = pt(e), i = !a && typeof Yt(e) == "function";
        if (a || i) {
          var u = a ? "array" : "iterable";
          return g("A nested %s was passed to row #%s in <SuspenseList />. Wrap it in an additional SuspenseList to configure its revealOrder: <SuspenseList revealOrder=...> ... <SuspenseList revealOrder=...>{%s}</SuspenseList> ... </SuspenseList>", u, t, u), !1;
        }
      }
      return !0;
    }
    function D1(e, t) {
      if ((t === "forwards" || t === "backwards") && e !== void 0 && e !== null && e !== !1)
        if (pt(e)) {
          for (var a = 0; a < e.length; a++)
            if (!tR(e[a], a))
              return;
        } else {
          var i = Yt(e);
          if (typeof i == "function") {
            var u = i.call(e);
            if (u)
              for (var s = u.next(), f = 0; !s.done; s = u.next()) {
                if (!tR(s.value, f))
                  return;
                f++;
              }
          } else
            g('A single row was passed to a <SuspenseList revealOrder="%s" />. This is not useful since it needs multiple rows. Did you mean to pass multiple children or an array?', t);
        }
    }
    function $S(e, t, a, i, u) {
      var s = e.memoizedState;
      s === null ? e.memoizedState = {
        isBackwards: t,
        rendering: null,
        renderingStartTime: 0,
        last: i,
        tail: a,
        tailMode: u
      } : (s.isBackwards = t, s.rendering = null, s.renderingStartTime = 0, s.last = i, s.tail = a, s.tailMode = u);
    }
    function nR(e, t, a) {
      var i = t.pendingProps, u = i.revealOrder, s = i.tail, f = i.children;
      x1(u), _1(s, u), D1(f, u), Ra(e, t, f, a);
      var p = ll.current, v = Bg(p, Lp);
      if (v)
        p = Ig(p, Lp), t.flags |= Pe;
      else {
        var S = e !== null && (e.flags & Pe) !== Ie;
        S && T1(t, t.child, a), p = Vf(p);
      }
      if (Po(t, p), (t.mode & yt) === $e)
        t.memoizedState = null;
      else
        switch (u) {
          case "forwards": {
            var R = b1(t.child), O;
            R === null ? (O = t.child, t.child = null) : (O = R.sibling, R.sibling = null), $S(
              t,
              !1,
              // isBackwards
              O,
              R,
              s
            );
            break;
          }
          case "backwards": {
            var D = null, H = t.child;
            for (t.child = null; H !== null; ) {
              var $ = H.alternate;
              if ($ !== null && Sm($) === null) {
                t.child = H;
                break;
              }
              var W = H.sibling;
              H.sibling = D, D = H, H = W;
            }
            $S(
              t,
              !0,
              // isBackwards
              D,
              null,
              // last
              s
            );
            break;
          }
          case "together": {
            $S(
              t,
              !1,
              // isBackwards
              null,
              // tail
              null,
              // last
              void 0
            );
            break;
          }
          default:
            t.memoizedState = null;
        }
      return t.child;
    }
    function N1(e, t, a) {
      Vg(t, t.stateNode.containerInfo);
      var i = t.pendingProps;
      return e === null ? t.child = zf(t, null, i, a) : Ra(e, t, i, a), t.child;
    }
    var rR = !1;
    function k1(e, t, a) {
      var i = t.type, u = i._context, s = t.pendingProps, f = t.memoizedProps, p = s.value;
      {
        "value" in s || rR || (rR = !0, g("The `value` prop is required for the `<Context.Provider>`. Did you misspell it or forget to pass it?"));
        var v = t.type.propTypes;
        v && rl(v, s, "prop", "Context.Provider");
      }
      if (KC(t, u, p), f !== null) {
        var S = f.value;
        if (re(S, p)) {
          if (f.children === s.children && !qh())
            return Iu(e, t, a);
        } else
          xx(t, u, a);
      }
      var R = s.children;
      return Ra(e, t, R, a), t.child;
    }
    var aR = !1;
    function O1(e, t, a) {
      var i = t.type;
      i._context === void 0 ? i !== i.Consumer && (aR || (aR = !0, g("Rendering <Context> directly is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?"))) : i = i._context;
      var u = t.pendingProps, s = u.children;
      typeof s != "function" && g("A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it."), jf(t, a);
      var f = ar(i);
      ga(t);
      var p;
      return Hp.current = t, Qn(!0), p = s(f), Qn(!1), Sa(), t.flags |= ri, Ra(e, t, p, a), t.child;
    }
    function $p() {
      sl = !0;
    }
    function Bm(e, t) {
      (t.mode & yt) === $e && e !== null && (e.alternate = null, t.alternate = null, t.flags |= gn);
    }
    function Iu(e, t, a) {
      return e !== null && (t.dependencies = e.dependencies), M0(), nv(t.lanes), aa(a, t.childLanes) ? (Tx(e, t), t.child) : null;
    }
    function L1(e, t, a) {
      {
        var i = t.return;
        if (i === null)
          throw new Error("Cannot swap the root fiber.");
        if (e.alternate = null, t.alternate = null, a.index = t.index, a.sibling = t.sibling, a.return = t.return, a.ref = t.ref, t === i.child)
          i.child = a;
        else {
          var u = i.child;
          if (u === null)
            throw new Error("Expected parent to have a child.");
          for (; u.sibling !== t; )
            if (u = u.sibling, u === null)
              throw new Error("Expected to find the previous sibling.");
          u.sibling = a;
        }
        var s = i.deletions;
        return s === null ? (i.deletions = [e], i.flags |= La) : s.push(e), a.flags |= gn, a;
      }
    }
    function YS(e, t) {
      var a = e.lanes;
      return !!aa(a, t);
    }
    function M1(e, t, a) {
      switch (t.tag) {
        case V:
          q0(t), t.stateNode, Uf();
          break;
        case le:
          r0(t);
          break;
        case F: {
          var i = t.type;
          Ql(i) && Jh(t);
          break;
        }
        case X:
          Vg(t, t.stateNode.containerInfo);
          break;
        case ue: {
          var u = t.memoizedProps.value, s = t.type._context;
          KC(t, s, u);
          break;
        }
        case he:
          {
            var f = aa(a, t.childLanes);
            f && (t.flags |= _t);
            {
              var p = t.stateNode;
              p.effectDuration = 0, p.passiveEffectDuration = 0;
            }
          }
          break;
        case ge: {
          var v = t.memoizedState;
          if (v !== null) {
            if (v.dehydrated !== null)
              return Po(t, Vf(ll.current)), t.flags |= Pe, null;
            var S = t.child, R = S.childLanes;
            if (aa(a, R))
              return J0(e, t, a);
            Po(t, Vf(ll.current));
            var O = Iu(e, t, a);
            return O !== null ? O.sibling : null;
          } else
            Po(t, Vf(ll.current));
          break;
        }
        case Ot: {
          var D = (e.flags & Pe) !== Ie, H = aa(a, t.childLanes);
          if (D) {
            if (H)
              return nR(e, t, a);
            t.flags |= Pe;
          }
          var $ = t.memoizedState;
          if ($ !== null && ($.rendering = null, $.tail = null, $.lastEffect = null), Po(t, ll.current), H)
            break;
          return null;
        }
        case je:
        case At:
          return t.lanes = Z, Q0(e, t, a);
      }
      return Iu(e, t, a);
    }
    function iR(e, t, a) {
      if (t._debugNeedsRemount && e !== null)
        return L1(e, t, CE(t.type, t.key, t.pendingProps, t._debugOwner || null, t.mode, t.lanes));
      if (e !== null) {
        var i = e.memoizedProps, u = t.pendingProps;
        if (i !== u || qh() || // Force a re-render if the implementation changed due to hot reload:
        t.type !== e.type)
          sl = !0;
        else {
          var s = YS(e, a);
          if (!s && // If this is the second pass of an error or suspense boundary, there
          // may not be work scheduled on `current`, so we check for this flag.
          (t.flags & Pe) === Ie)
            return sl = !1, M1(e, t, a);
          (e.flags & Lc) !== Ie ? sl = !0 : sl = !1;
        }
      } else if (sl = !1, Pr() && ax(t)) {
        var f = t.index, p = ix();
        MC(t, p, f);
      }
      switch (t.lanes = Z, t.tag) {
        case ie:
          return v1(e, t, t.type, a);
        case St: {
          var v = t.elementType;
          return d1(e, t, v, a);
        }
        case P: {
          var S = t.type, R = t.pendingProps, O = t.elementType === S ? R : ol(S, R);
          return jS(e, t, S, O, a);
        }
        case F: {
          var D = t.type, H = t.pendingProps, $ = t.elementType === D ? H : ol(D, H);
          return K0(e, t, D, $, a);
        }
        case V:
          return s1(e, t, a);
        case le:
          return c1(e, t, a);
        case ve:
          return f1(e, t);
        case ge:
          return J0(e, t, a);
        case X:
          return N1(e, t, a);
        case ae: {
          var W = t.type, we = t.pendingProps, Qe = t.elementType === W ? we : ol(W, we);
          return $0(e, t, W, Qe, a);
        }
        case be:
          return l1(e, t, a);
        case fe:
          return u1(e, t, a);
        case he:
          return o1(e, t, a);
        case ue:
          return k1(e, t, a);
        case He:
          return O1(e, t, a);
        case Ce: {
          var Ve = t.type, kt = t.pendingProps, Tt = ol(Ve, kt);
          if (t.type !== t.elementType) {
            var U = Ve.propTypes;
            U && rl(
              U,
              Tt,
              // Resolved for outer only
              "prop",
              Lt(Ve)
            );
          }
          return Tt = ol(Ve.type, Tt), Y0(e, t, Ve, Tt, a);
        }
        case Ne:
          return W0(e, t, t.type, t.pendingProps, a);
        case Et: {
          var Q = t.type, z = t.pendingProps, se = t.elementType === Q ? z : ol(Q, z);
          return p1(e, t, Q, se, a);
        }
        case Ot:
          return nR(e, t, a);
        case bt:
          break;
        case je:
          return Q0(e, t, a);
      }
      throw new Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
    }
    function Yf(e) {
      e.flags |= _t;
    }
    function lR(e) {
      e.flags |= Rn, e.flags |= So;
    }
    var uR, WS, oR, sR;
    uR = function(e, t, a, i) {
      for (var u = t.child; u !== null; ) {
        if (u.tag === le || u.tag === ve)
          tb(e, u.stateNode);
        else if (u.tag !== X) {
          if (u.child !== null) {
            u.child.return = u, u = u.child;
            continue;
          }
        }
        if (u === t)
          return;
        for (; u.sibling === null; ) {
          if (u.return === null || u.return === t)
            return;
          u = u.return;
        }
        u.sibling.return = u.return, u = u.sibling;
      }
    }, WS = function(e, t) {
    }, oR = function(e, t, a, i, u) {
      var s = e.memoizedProps;
      if (s !== i) {
        var f = t.stateNode, p = Pg(), v = rb(f, a, s, i, u, p);
        t.updateQueue = v, v && Yf(t);
      }
    }, sR = function(e, t, a, i) {
      a !== i && Yf(t);
    };
    function Yp(e, t) {
      if (!Pr())
        switch (e.tailMode) {
          case "hidden": {
            for (var a = e.tail, i = null; a !== null; )
              a.alternate !== null && (i = a), a = a.sibling;
            i === null ? e.tail = null : i.sibling = null;
            break;
          }
          case "collapsed": {
            for (var u = e.tail, s = null; u !== null; )
              u.alternate !== null && (s = u), u = u.sibling;
            s === null ? !t && e.tail !== null ? e.tail.sibling = null : e.tail = null : s.sibling = null;
            break;
          }
        }
    }
    function Br(e) {
      var t = e.alternate !== null && e.alternate.child === e.child, a = Z, i = Ie;
      if (t) {
        if ((e.mode & Vt) !== $e) {
          for (var v = e.selfBaseDuration, S = e.child; S !== null; )
            a = ot(a, ot(S.lanes, S.childLanes)), i |= S.subtreeFlags & An, i |= S.flags & An, v += S.treeBaseDuration, S = S.sibling;
          e.treeBaseDuration = v;
        } else
          for (var R = e.child; R !== null; )
            a = ot(a, ot(R.lanes, R.childLanes)), i |= R.subtreeFlags & An, i |= R.flags & An, R.return = e, R = R.sibling;
        e.subtreeFlags |= i;
      } else {
        if ((e.mode & Vt) !== $e) {
          for (var u = e.actualDuration, s = e.selfBaseDuration, f = e.child; f !== null; )
            a = ot(a, ot(f.lanes, f.childLanes)), i |= f.subtreeFlags, i |= f.flags, u += f.actualDuration, s += f.treeBaseDuration, f = f.sibling;
          e.actualDuration = u, e.treeBaseDuration = s;
        } else
          for (var p = e.child; p !== null; )
            a = ot(a, ot(p.lanes, p.childLanes)), i |= p.subtreeFlags, i |= p.flags, p.return = e, p = p.sibling;
        e.subtreeFlags |= i;
      }
      return e.childLanes = a, t;
    }
    function U1(e, t, a) {
      if (gx() && (t.mode & yt) !== $e && (t.flags & Pe) === Ie)
        return PC(t), Uf(), t.flags |= xr | hs | er, !1;
      var i = rm(t);
      if (a !== null && a.dehydrated !== null)
        if (e === null) {
          if (!i)
            throw new Error("A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.");
          if (mx(t), Br(t), (t.mode & Vt) !== $e) {
            var u = a !== null;
            if (u) {
              var s = t.child;
              s !== null && (t.treeBaseDuration -= s.treeBaseDuration);
            }
          }
          return !1;
        } else {
          if (Uf(), (t.flags & Pe) === Ie && (t.memoizedState = null), t.flags |= _t, Br(t), (t.mode & Vt) !== $e) {
            var f = a !== null;
            if (f) {
              var p = t.child;
              p !== null && (t.treeBaseDuration -= p.treeBaseDuration);
            }
          }
          return !1;
        }
      else
        return HC(), !0;
    }
    function cR(e, t, a) {
      var i = t.pendingProps;
      switch (gg(t), t.tag) {
        case ie:
        case St:
        case Ne:
        case P:
        case ae:
        case be:
        case fe:
        case he:
        case He:
        case Ce:
          return Br(t), null;
        case F: {
          var u = t.type;
          return Ql(u) && Xh(t), Br(t), null;
        }
        case V: {
          var s = t.stateNode;
          if (Ff(t), vg(t), Yg(), s.pendingContext && (s.context = s.pendingContext, s.pendingContext = null), e === null || e.child === null) {
            var f = rm(t);
            if (f)
              Yf(t);
            else if (e !== null) {
              var p = e.memoizedState;
              // Check if this is a client root
              (!p.isDehydrated || // Check if we reverted to client rendering (e.g. due to an error)
              (t.flags & xr) !== Ie) && (t.flags |= Gn, HC());
            }
          }
          return WS(e, t), Br(t), null;
        }
        case le: {
          Hg(t);
          var v = n0(), S = t.type;
          if (e !== null && t.stateNode != null)
            oR(e, t, S, i, v), e.ref !== t.ref && lR(t);
          else {
            if (!i) {
              if (t.stateNode === null)
                throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
              return Br(t), null;
            }
            var R = Pg(), O = rm(t);
            if (O)
              vx(t, v, R) && Yf(t);
            else {
              var D = eb(S, i, v, R, t);
              uR(D, t, !1, !1), t.stateNode = D, nb(D, S, i, v) && Yf(t);
            }
            t.ref !== null && lR(t);
          }
          return Br(t), null;
        }
        case ve: {
          var H = i;
          if (e && t.stateNode != null) {
            var $ = e.memoizedProps;
            sR(e, t, $, H);
          } else {
            if (typeof H != "string" && t.stateNode === null)
              throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
            var W = n0(), we = Pg(), Qe = rm(t);
            Qe ? hx(t) && Yf(t) : t.stateNode = ab(H, W, we, t);
          }
          return Br(t), null;
        }
        case ge: {
          Pf(t);
          var Ve = t.memoizedState;
          if (e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
            var kt = U1(e, t, Ve);
            if (!kt)
              return t.flags & er ? t : null;
          }
          if ((t.flags & Pe) !== Ie)
            return t.lanes = a, (t.mode & Vt) !== $e && mS(t), t;
          var Tt = Ve !== null, U = e !== null && e.memoizedState !== null;
          if (Tt !== U && Tt) {
            var Q = t.child;
            if (Q.flags |= zn, (t.mode & yt) !== $e) {
              var z = e === null && (t.memoizedProps.unstable_avoidThisFallback !== !0 || !0);
              z || Bg(ll.current, i0) ? z_() : cE();
            }
          }
          var se = t.updateQueue;
          if (se !== null && (t.flags |= _t), Br(t), (t.mode & Vt) !== $e && Tt) {
            var De = t.child;
            De !== null && (t.treeBaseDuration -= De.treeBaseDuration);
          }
          return null;
        }
        case X:
          return Ff(t), WS(e, t), e === null && Xb(t.stateNode.containerInfo), Br(t), null;
        case ue:
          var Te = t.type._context;
          return Lg(Te, t), Br(t), null;
        case Et: {
          var tt = t.type;
          return Ql(tt) && Xh(t), Br(t), null;
        }
        case Ot: {
          Pf(t);
          var ut = t.memoizedState;
          if (ut === null)
            return Br(t), null;
          var tn = (t.flags & Pe) !== Ie, Bt = ut.rendering;
          if (Bt === null)
            if (tn)
              Yp(ut, !1);
            else {
              var Xn = j_() && (e === null || (e.flags & Pe) === Ie);
              if (!Xn)
                for (var It = t.child; It !== null; ) {
                  var Bn = Sm(It);
                  if (Bn !== null) {
                    tn = !0, t.flags |= Pe, Yp(ut, !1);
                    var fa = Bn.updateQueue;
                    return fa !== null && (t.updateQueue = fa, t.flags |= _t), t.subtreeFlags = Ie, bx(t, a), Po(t, Ig(ll.current, Lp)), t.child;
                  }
                  It = It.sibling;
                }
              ut.tail !== null && Kn() > OR() && (t.flags |= Pe, tn = !0, Yp(ut, !1), t.lanes = jd);
            }
          else {
            if (!tn) {
              var Qr = Sm(Bt);
              if (Qr !== null) {
                t.flags |= Pe, tn = !0;
                var ci = Qr.updateQueue;
                if (ci !== null && (t.updateQueue = ci, t.flags |= _t), Yp(ut, !0), ut.tail === null && ut.tailMode === "hidden" && !Bt.alternate && !Pr())
                  return Br(t), null;
              } else // The time it took to render last row is greater than the remaining
              // time we have to render. So rendering one more row would likely
              // exceed it.
              Kn() * 2 - ut.renderingStartTime > OR() && a !== ra && (t.flags |= Pe, tn = !0, Yp(ut, !1), t.lanes = jd);
            }
            if (ut.isBackwards)
              Bt.sibling = t.child, t.child = Bt;
            else {
              var ba = ut.last;
              ba !== null ? ba.sibling = Bt : t.child = Bt, ut.last = Bt;
            }
          }
          if (ut.tail !== null) {
            var xa = ut.tail;
            ut.rendering = xa, ut.tail = xa.sibling, ut.renderingStartTime = Kn(), xa.sibling = null;
            var da = ll.current;
            return tn ? da = Ig(da, Lp) : da = Vf(da), Po(t, da), xa;
          }
          return Br(t), null;
        }
        case bt:
          break;
        case je:
        case At: {
          sE(t);
          var Gu = t.memoizedState, Zf = Gu !== null;
          if (e !== null) {
            var uv = e.memoizedState, tu = uv !== null;
            tu !== Zf && // LegacyHidden doesn't do any hiding — it only pre-renders.
            !Se && (t.flags |= zn);
          }
          return !Zf || (t.mode & yt) === $e ? Br(t) : aa(eu, ra) && (Br(t), t.subtreeFlags & (gn | _t) && (t.flags |= zn)), null;
        }
        case Ut:
          return null;
        case jt:
          return null;
      }
      throw new Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
    }
    function z1(e, t, a) {
      switch (gg(t), t.tag) {
        case F: {
          var i = t.type;
          Ql(i) && Xh(t);
          var u = t.flags;
          return u & er ? (t.flags = u & ~er | Pe, (t.mode & Vt) !== $e && mS(t), t) : null;
        }
        case V: {
          t.stateNode, Ff(t), vg(t), Yg();
          var s = t.flags;
          return (s & er) !== Ie && (s & Pe) === Ie ? (t.flags = s & ~er | Pe, t) : null;
        }
        case le:
          return Hg(t), null;
        case ge: {
          Pf(t);
          var f = t.memoizedState;
          if (f !== null && f.dehydrated !== null) {
            if (t.alternate === null)
              throw new Error("Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue.");
            Uf();
          }
          var p = t.flags;
          return p & er ? (t.flags = p & ~er | Pe, (t.mode & Vt) !== $e && mS(t), t) : null;
        }
        case Ot:
          return Pf(t), null;
        case X:
          return Ff(t), null;
        case ue:
          var v = t.type._context;
          return Lg(v, t), null;
        case je:
        case At:
          return sE(t), null;
        case Ut:
          return null;
        default:
          return null;
      }
    }
    function fR(e, t, a) {
      switch (gg(t), t.tag) {
        case F: {
          var i = t.type.childContextTypes;
          i != null && Xh(t);
          break;
        }
        case V: {
          t.stateNode, Ff(t), vg(t), Yg();
          break;
        }
        case le: {
          Hg(t);
          break;
        }
        case X:
          Ff(t);
          break;
        case ge:
          Pf(t);
          break;
        case Ot:
          Pf(t);
          break;
        case ue:
          var u = t.type._context;
          Lg(u, t);
          break;
        case je:
        case At:
          sE(t);
          break;
      }
    }
    var dR = null;
    dR = /* @__PURE__ */ new Set();
    var Im = !1, Ir = !1, A1 = typeof WeakSet == "function" ? WeakSet : Set, Me = null, Wf = null, Qf = null;
    function j1(e) {
      Nl(null, function() {
        throw e;
      }), vs();
    }
    var F1 = function(e, t) {
      if (t.props = e.memoizedProps, t.state = e.memoizedState, e.mode & Vt)
        try {
          Jl(), t.componentWillUnmount();
        } finally {
          Xl(e);
        }
      else
        t.componentWillUnmount();
    };
    function pR(e, t) {
      try {
        Io(vr, e);
      } catch (a) {
        fn(e, t, a);
      }
    }
    function QS(e, t, a) {
      try {
        F1(e, a);
      } catch (i) {
        fn(e, t, i);
      }
    }
    function V1(e, t, a) {
      try {
        a.componentDidMount();
      } catch (i) {
        fn(e, t, i);
      }
    }
    function vR(e, t) {
      try {
        mR(e);
      } catch (a) {
        fn(e, t, a);
      }
    }
    function Gf(e, t) {
      var a = e.ref;
      if (a !== null)
        if (typeof a == "function") {
          var i;
          try {
            if (Je && vt && e.mode & Vt)
              try {
                Jl(), i = a(null);
              } finally {
                Xl(e);
              }
            else
              i = a(null);
          } catch (u) {
            fn(e, t, u);
          }
          typeof i == "function" && g("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", it(e));
        } else
          a.current = null;
    }
    function $m(e, t, a) {
      try {
        a();
      } catch (i) {
        fn(e, t, i);
      }
    }
    var hR = !1;
    function P1(e, t) {
      JT(e.containerInfo), Me = t, H1();
      var a = hR;
      return hR = !1, a;
    }
    function H1() {
      for (; Me !== null; ) {
        var e = Me, t = e.child;
        (e.subtreeFlags & Ol) !== Ie && t !== null ? (t.return = e, Me = t) : B1();
      }
    }
    function B1() {
      for (; Me !== null; ) {
        var e = Me;
        qt(e);
        try {
          I1(e);
        } catch (a) {
          fn(e, e.return, a);
        }
        cn();
        var t = e.sibling;
        if (t !== null) {
          t.return = e.return, Me = t;
          return;
        }
        Me = e.return;
      }
    }
    function I1(e) {
      var t = e.alternate, a = e.flags;
      if ((a & Gn) !== Ie) {
        switch (qt(e), e.tag) {
          case P:
          case ae:
          case Ne:
            break;
          case F: {
            if (t !== null) {
              var i = t.memoizedProps, u = t.memoizedState, s = e.stateNode;
              e.type === e.elementType && !uc && (s.props !== e.memoizedProps && g("Expected %s props to match memoized props before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", it(e) || "instance"), s.state !== e.memoizedState && g("Expected %s state to match memoized state before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", it(e) || "instance"));
              var f = s.getSnapshotBeforeUpdate(e.elementType === e.type ? i : ol(e.type, i), u);
              {
                var p = dR;
                f === void 0 && !p.has(e.type) && (p.add(e.type), g("%s.getSnapshotBeforeUpdate(): A snapshot value (or null) must be returned. You have returned undefined.", it(e)));
              }
              s.__reactInternalSnapshotBeforeUpdate = f;
            }
            break;
          }
          case V: {
            {
              var v = e.stateNode;
              wb(v.containerInfo);
            }
            break;
          }
          case le:
          case ve:
          case X:
          case Et:
            break;
          default:
            throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
        }
        cn();
      }
    }
    function cl(e, t, a) {
      var i = t.updateQueue, u = i !== null ? i.lastEffect : null;
      if (u !== null) {
        var s = u.next, f = s;
        do {
          if ((f.tag & e) === e) {
            var p = f.destroy;
            f.destroy = void 0, p !== void 0 && ((e & Hr) !== Ia ? Xi(t) : (e & vr) !== Ia && ys(t), (e & Gl) !== Ia && av(!0), $m(t, a, p), (e & Gl) !== Ia && av(!1), (e & Hr) !== Ia ? zl() : (e & vr) !== Ia && zd());
          }
          f = f.next;
        } while (f !== s);
      }
    }
    function Io(e, t) {
      var a = t.updateQueue, i = a !== null ? a.lastEffect : null;
      if (i !== null) {
        var u = i.next, s = u;
        do {
          if ((s.tag & e) === e) {
            (e & Hr) !== Ia ? Ud(t) : (e & vr) !== Ia && Fc(t);
            var f = s.create;
            (e & Gl) !== Ia && av(!0), s.destroy = f(), (e & Gl) !== Ia && av(!1), (e & Hr) !== Ia ? Kv() : (e & vr) !== Ia && qv();
            {
              var p = s.destroy;
              if (p !== void 0 && typeof p != "function") {
                var v = void 0;
                (s.tag & vr) !== Ie ? v = "useLayoutEffect" : (s.tag & Gl) !== Ie ? v = "useInsertionEffect" : v = "useEffect";
                var S = void 0;
                p === null ? S = " You returned null. If your effect does not require clean up, return undefined (or nothing)." : typeof p.then == "function" ? S = `

It looks like you wrote ` + v + `(async () => ...) or returned a Promise. Instead, write the async function inside your effect and call it immediately:

` + v + `(() => {
  async function fetchData() {
    // You can await here
    const response = await MyAPI.getData(someId);
    // ...
  }
  fetchData();
}, [someId]); // Or [] if effect doesn't need props or state

Learn more about data fetching with Hooks: https://reactjs.org/link/hooks-data-fetching` : S = " You returned: " + p, g("%s must not return anything besides a function, which is used for clean-up.%s", v, S);
              }
            }
          }
          s = s.next;
        } while (s !== u);
      }
    }
    function $1(e, t) {
      if ((t.flags & _t) !== Ie)
        switch (t.tag) {
          case he: {
            var a = t.stateNode.passiveEffectDuration, i = t.memoizedProps, u = i.id, s = i.onPostCommit, f = O0(), p = t.alternate === null ? "mount" : "update";
            k0() && (p = "nested-update"), typeof s == "function" && s(u, p, a, f);
            var v = t.return;
            e: for (; v !== null; ) {
              switch (v.tag) {
                case V:
                  var S = v.stateNode;
                  S.passiveEffectDuration += a;
                  break e;
                case he:
                  var R = v.stateNode;
                  R.passiveEffectDuration += a;
                  break e;
              }
              v = v.return;
            }
            break;
          }
        }
    }
    function Y1(e, t, a, i) {
      if ((a.flags & Ml) !== Ie)
        switch (a.tag) {
          case P:
          case ae:
          case Ne: {
            if (!Ir)
              if (a.mode & Vt)
                try {
                  Jl(), Io(vr | pr, a);
                } finally {
                  Xl(a);
                }
              else
                Io(vr | pr, a);
            break;
          }
          case F: {
            var u = a.stateNode;
            if (a.flags & _t && !Ir)
              if (t === null)
                if (a.type === a.elementType && !uc && (u.props !== a.memoizedProps && g("Expected %s props to match memoized props before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", it(a) || "instance"), u.state !== a.memoizedState && g("Expected %s state to match memoized state before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", it(a) || "instance")), a.mode & Vt)
                  try {
                    Jl(), u.componentDidMount();
                  } finally {
                    Xl(a);
                  }
                else
                  u.componentDidMount();
              else {
                var s = a.elementType === a.type ? t.memoizedProps : ol(a.type, t.memoizedProps), f = t.memoizedState;
                if (a.type === a.elementType && !uc && (u.props !== a.memoizedProps && g("Expected %s props to match memoized props before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", it(a) || "instance"), u.state !== a.memoizedState && g("Expected %s state to match memoized state before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", it(a) || "instance")), a.mode & Vt)
                  try {
                    Jl(), u.componentDidUpdate(s, f, u.__reactInternalSnapshotBeforeUpdate);
                  } finally {
                    Xl(a);
                  }
                else
                  u.componentDidUpdate(s, f, u.__reactInternalSnapshotBeforeUpdate);
              }
            var p = a.updateQueue;
            p !== null && (a.type === a.elementType && !uc && (u.props !== a.memoizedProps && g("Expected %s props to match memoized props before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", it(a) || "instance"), u.state !== a.memoizedState && g("Expected %s state to match memoized state before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", it(a) || "instance")), t0(a, p, u));
            break;
          }
          case V: {
            var v = a.updateQueue;
            if (v !== null) {
              var S = null;
              if (a.child !== null)
                switch (a.child.tag) {
                  case le:
                    S = a.child.stateNode;
                    break;
                  case F:
                    S = a.child.stateNode;
                    break;
                }
              t0(a, v, S);
            }
            break;
          }
          case le: {
            var R = a.stateNode;
            if (t === null && a.flags & _t) {
              var O = a.type, D = a.memoizedProps;
              sb(R, O, D);
            }
            break;
          }
          case ve:
            break;
          case X:
            break;
          case he: {
            {
              var H = a.memoizedProps, $ = H.onCommit, W = H.onRender, we = a.stateNode.effectDuration, Qe = O0(), Ve = t === null ? "mount" : "update";
              k0() && (Ve = "nested-update"), typeof W == "function" && W(a.memoizedProps.id, Ve, a.actualDuration, a.treeBaseDuration, a.actualStartTime, Qe);
              {
                typeof $ == "function" && $(a.memoizedProps.id, Ve, we, Qe), B_(a);
                var kt = a.return;
                e: for (; kt !== null; ) {
                  switch (kt.tag) {
                    case V:
                      var Tt = kt.stateNode;
                      Tt.effectDuration += we;
                      break e;
                    case he:
                      var U = kt.stateNode;
                      U.effectDuration += we;
                      break e;
                  }
                  kt = kt.return;
                }
              }
            }
            break;
          }
          case ge: {
            Z1(e, a);
            break;
          }
          case Ot:
          case Et:
          case bt:
          case je:
          case At:
          case jt:
            break;
          default:
            throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
        }
      Ir || a.flags & Rn && mR(a);
    }
    function W1(e) {
      switch (e.tag) {
        case P:
        case ae:
        case Ne: {
          if (e.mode & Vt)
            try {
              Jl(), pR(e, e.return);
            } finally {
              Xl(e);
            }
          else
            pR(e, e.return);
          break;
        }
        case F: {
          var t = e.stateNode;
          typeof t.componentDidMount == "function" && V1(e, e.return, t), vR(e, e.return);
          break;
        }
        case le: {
          vR(e, e.return);
          break;
        }
      }
    }
    function Q1(e, t) {
      for (var a = null, i = e; ; ) {
        if (i.tag === le) {
          if (a === null) {
            a = i;
            try {
              var u = i.stateNode;
              t ? Sb(u) : Cb(i.stateNode, i.memoizedProps);
            } catch (f) {
              fn(e, e.return, f);
            }
          }
        } else if (i.tag === ve) {
          if (a === null)
            try {
              var s = i.stateNode;
              t ? Eb(s) : Rb(s, i.memoizedProps);
            } catch (f) {
              fn(e, e.return, f);
            }
        } else if (!((i.tag === je || i.tag === At) && i.memoizedState !== null && i !== e)) {
          if (i.child !== null) {
            i.child.return = i, i = i.child;
            continue;
          }
        }
        if (i === e)
          return;
        for (; i.sibling === null; ) {
          if (i.return === null || i.return === e)
            return;
          a === i && (a = null), i = i.return;
        }
        a === i && (a = null), i.sibling.return = i.return, i = i.sibling;
      }
    }
    function mR(e) {
      var t = e.ref;
      if (t !== null) {
        var a = e.stateNode, i;
        switch (e.tag) {
          case le:
            i = a;
            break;
          default:
            i = a;
        }
        if (typeof t == "function") {
          var u;
          if (e.mode & Vt)
            try {
              Jl(), u = t(i);
            } finally {
              Xl(e);
            }
          else
            u = t(i);
          typeof u == "function" && g("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", it(e));
        } else
          t.hasOwnProperty("current") || g("Unexpected ref object provided for %s. Use either a ref-setter function or React.createRef().", it(e)), t.current = i;
      }
    }
    function G1(e) {
      var t = e.alternate;
      t !== null && (t.return = null), e.return = null;
    }
    function yR(e) {
      var t = e.alternate;
      t !== null && (e.alternate = null, yR(t));
      {
        if (e.child = null, e.deletions = null, e.sibling = null, e.tag === le) {
          var a = e.stateNode;
          a !== null && ex(a);
        }
        e.stateNode = null, e._debugOwner = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
      }
    }
    function K1(e) {
      for (var t = e.return; t !== null; ) {
        if (gR(t))
          return t;
        t = t.return;
      }
      throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
    }
    function gR(e) {
      return e.tag === le || e.tag === V || e.tag === X;
    }
    function SR(e) {
      var t = e;
      e: for (; ; ) {
        for (; t.sibling === null; ) {
          if (t.return === null || gR(t.return))
            return null;
          t = t.return;
        }
        for (t.sibling.return = t.return, t = t.sibling; t.tag !== le && t.tag !== ve && t.tag !== wt; ) {
          if (t.flags & gn || t.child === null || t.tag === X)
            continue e;
          t.child.return = t, t = t.child;
        }
        if (!(t.flags & gn))
          return t.stateNode;
      }
    }
    function q1(e) {
      var t = K1(e);
      switch (t.tag) {
        case le: {
          var a = t.stateNode;
          t.flags & Ma && (CC(a), t.flags &= ~Ma);
          var i = SR(e);
          KS(e, i, a);
          break;
        }
        case V:
        case X: {
          var u = t.stateNode.containerInfo, s = SR(e);
          GS(e, s, u);
          break;
        }
        default:
          throw new Error("Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue.");
      }
    }
    function GS(e, t, a) {
      var i = e.tag, u = i === le || i === ve;
      if (u) {
        var s = e.stateNode;
        t ? hb(a, s, t) : pb(a, s);
      } else if (i !== X) {
        var f = e.child;
        if (f !== null) {
          GS(f, t, a);
          for (var p = f.sibling; p !== null; )
            GS(p, t, a), p = p.sibling;
        }
      }
    }
    function KS(e, t, a) {
      var i = e.tag, u = i === le || i === ve;
      if (u) {
        var s = e.stateNode;
        t ? vb(a, s, t) : db(a, s);
      } else if (i !== X) {
        var f = e.child;
        if (f !== null) {
          KS(f, t, a);
          for (var p = f.sibling; p !== null; )
            KS(p, t, a), p = p.sibling;
        }
      }
    }
    var $r = null, fl = !1;
    function X1(e, t, a) {
      {
        var i = t;
        e: for (; i !== null; ) {
          switch (i.tag) {
            case le: {
              $r = i.stateNode, fl = !1;
              break e;
            }
            case V: {
              $r = i.stateNode.containerInfo, fl = !0;
              break e;
            }
            case X: {
              $r = i.stateNode.containerInfo, fl = !0;
              break e;
            }
          }
          i = i.return;
        }
        if ($r === null)
          throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
        ER(e, t, a), $r = null, fl = !1;
      }
      G1(a);
    }
    function $o(e, t, a) {
      for (var i = a.child; i !== null; )
        ER(e, t, i), i = i.sibling;
    }
    function ER(e, t, a) {
      switch (Od(a), a.tag) {
        case le:
          Ir || Gf(a, t);
        case ve: {
          {
            var i = $r, u = fl;
            $r = null, $o(e, t, a), $r = i, fl = u, $r !== null && (fl ? yb($r, a.stateNode) : mb($r, a.stateNode));
          }
          return;
        }
        case wt: {
          $r !== null && (fl ? gb($r, a.stateNode) : lg($r, a.stateNode));
          return;
        }
        case X: {
          {
            var s = $r, f = fl;
            $r = a.stateNode.containerInfo, fl = !0, $o(e, t, a), $r = s, fl = f;
          }
          return;
        }
        case P:
        case ae:
        case Ce:
        case Ne: {
          if (!Ir) {
            var p = a.updateQueue;
            if (p !== null) {
              var v = p.lastEffect;
              if (v !== null) {
                var S = v.next, R = S;
                do {
                  var O = R, D = O.destroy, H = O.tag;
                  D !== void 0 && ((H & Gl) !== Ia ? $m(a, t, D) : (H & vr) !== Ia && (ys(a), a.mode & Vt ? (Jl(), $m(a, t, D), Xl(a)) : $m(a, t, D), zd())), R = R.next;
                } while (R !== S);
              }
            }
          }
          $o(e, t, a);
          return;
        }
        case F: {
          if (!Ir) {
            Gf(a, t);
            var $ = a.stateNode;
            typeof $.componentWillUnmount == "function" && QS(a, t, $);
          }
          $o(e, t, a);
          return;
        }
        case bt: {
          $o(e, t, a);
          return;
        }
        case je: {
          if (
            // TODO: Remove this dead flag
            a.mode & yt
          ) {
            var W = Ir;
            Ir = W || a.memoizedState !== null, $o(e, t, a), Ir = W;
          } else
            $o(e, t, a);
          break;
        }
        default: {
          $o(e, t, a);
          return;
        }
      }
    }
    function J1(e) {
      e.memoizedState;
    }
    function Z1(e, t) {
      var a = t.memoizedState;
      if (a === null) {
        var i = t.alternate;
        if (i !== null) {
          var u = i.memoizedState;
          if (u !== null) {
            var s = u.dehydrated;
            s !== null && jb(s);
          }
        }
      }
    }
    function CR(e) {
      var t = e.updateQueue;
      if (t !== null) {
        e.updateQueue = null;
        var a = e.stateNode;
        a === null && (a = e.stateNode = new A1()), t.forEach(function(i) {
          var u = K_.bind(null, e, i);
          if (!a.has(i)) {
            if (a.add(i), na)
              if (Wf !== null && Qf !== null)
                rv(Qf, Wf);
              else
                throw Error("Expected finished root and lanes to be set. This is a bug in React.");
            i.then(u, u);
          }
        });
      }
    }
    function e_(e, t, a) {
      Wf = a, Qf = e, qt(t), RR(t, e), qt(t), Wf = null, Qf = null;
    }
    function dl(e, t, a) {
      var i = t.deletions;
      if (i !== null)
        for (var u = 0; u < i.length; u++) {
          var s = i[u];
          try {
            X1(e, t, s);
          } catch (v) {
            fn(s, t, v);
          }
        }
      var f = Rl();
      if (t.subtreeFlags & Ll)
        for (var p = t.child; p !== null; )
          qt(p), RR(p, e), p = p.sibling;
      qt(f);
    }
    function RR(e, t, a) {
      var i = e.alternate, u = e.flags;
      switch (e.tag) {
        case P:
        case ae:
        case Ce:
        case Ne: {
          if (dl(t, e), Zl(e), u & _t) {
            try {
              cl(Gl | pr, e, e.return), Io(Gl | pr, e);
            } catch (tt) {
              fn(e, e.return, tt);
            }
            if (e.mode & Vt) {
              try {
                Jl(), cl(vr | pr, e, e.return);
              } catch (tt) {
                fn(e, e.return, tt);
              }
              Xl(e);
            } else
              try {
                cl(vr | pr, e, e.return);
              } catch (tt) {
                fn(e, e.return, tt);
              }
          }
          return;
        }
        case F: {
          dl(t, e), Zl(e), u & Rn && i !== null && Gf(i, i.return);
          return;
        }
        case le: {
          dl(t, e), Zl(e), u & Rn && i !== null && Gf(i, i.return);
          {
            if (e.flags & Ma) {
              var s = e.stateNode;
              try {
                CC(s);
              } catch (tt) {
                fn(e, e.return, tt);
              }
            }
            if (u & _t) {
              var f = e.stateNode;
              if (f != null) {
                var p = e.memoizedProps, v = i !== null ? i.memoizedProps : p, S = e.type, R = e.updateQueue;
                if (e.updateQueue = null, R !== null)
                  try {
                    cb(f, R, S, v, p, e);
                  } catch (tt) {
                    fn(e, e.return, tt);
                  }
              }
            }
          }
          return;
        }
        case ve: {
          if (dl(t, e), Zl(e), u & _t) {
            if (e.stateNode === null)
              throw new Error("This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.");
            var O = e.stateNode, D = e.memoizedProps, H = i !== null ? i.memoizedProps : D;
            try {
              fb(O, H, D);
            } catch (tt) {
              fn(e, e.return, tt);
            }
          }
          return;
        }
        case V: {
          if (dl(t, e), Zl(e), u & _t && i !== null) {
            var $ = i.memoizedState;
            if ($.isDehydrated)
              try {
                Ab(t.containerInfo);
              } catch (tt) {
                fn(e, e.return, tt);
              }
          }
          return;
        }
        case X: {
          dl(t, e), Zl(e);
          return;
        }
        case ge: {
          dl(t, e), Zl(e);
          var W = e.child;
          if (W.flags & zn) {
            var we = W.stateNode, Qe = W.memoizedState, Ve = Qe !== null;
            if (we.isHidden = Ve, Ve) {
              var kt = W.alternate !== null && W.alternate.memoizedState !== null;
              kt || U_();
            }
          }
          if (u & _t) {
            try {
              J1(e);
            } catch (tt) {
              fn(e, e.return, tt);
            }
            CR(e);
          }
          return;
        }
        case je: {
          var Tt = i !== null && i.memoizedState !== null;
          if (
            // TODO: Remove this dead flag
            e.mode & yt
          ) {
            var U = Ir;
            Ir = U || Tt, dl(t, e), Ir = U;
          } else
            dl(t, e);
          if (Zl(e), u & zn) {
            var Q = e.stateNode, z = e.memoizedState, se = z !== null, De = e;
            if (Q.isHidden = se, se && !Tt && (De.mode & yt) !== $e) {
              Me = De;
              for (var Te = De.child; Te !== null; )
                Me = Te, n_(Te), Te = Te.sibling;
            }
            Q1(De, se);
          }
          return;
        }
        case Ot: {
          dl(t, e), Zl(e), u & _t && CR(e);
          return;
        }
        case bt:
          return;
        default: {
          dl(t, e), Zl(e);
          return;
        }
      }
    }
    function Zl(e) {
      var t = e.flags;
      if (t & gn) {
        try {
          q1(e);
        } catch (a) {
          fn(e, e.return, a);
        }
        e.flags &= ~gn;
      }
      t & Zr && (e.flags &= ~Zr);
    }
    function t_(e, t, a) {
      Wf = a, Qf = t, Me = e, wR(e, t, a), Wf = null, Qf = null;
    }
    function wR(e, t, a) {
      for (var i = (e.mode & yt) !== $e; Me !== null; ) {
        var u = Me, s = u.child;
        if (u.tag === je && i) {
          var f = u.memoizedState !== null, p = f || Im;
          if (p) {
            qS(e, t, a);
            continue;
          } else {
            var v = u.alternate, S = v !== null && v.memoizedState !== null, R = S || Ir, O = Im, D = Ir;
            Im = p, Ir = R, Ir && !D && (Me = u, r_(u));
            for (var H = s; H !== null; )
              Me = H, wR(
                H,
                // New root; bubble back up to here and stop.
                t,
                a
              ), H = H.sibling;
            Me = u, Im = O, Ir = D, qS(e, t, a);
            continue;
          }
        }
        (u.subtreeFlags & Ml) !== Ie && s !== null ? (s.return = u, Me = s) : qS(e, t, a);
      }
    }
    function qS(e, t, a) {
      for (; Me !== null; ) {
        var i = Me;
        if ((i.flags & Ml) !== Ie) {
          var u = i.alternate;
          qt(i);
          try {
            Y1(t, u, i, a);
          } catch (f) {
            fn(i, i.return, f);
          }
          cn();
        }
        if (i === e) {
          Me = null;
          return;
        }
        var s = i.sibling;
        if (s !== null) {
          s.return = i.return, Me = s;
          return;
        }
        Me = i.return;
      }
    }
    function n_(e) {
      for (; Me !== null; ) {
        var t = Me, a = t.child;
        switch (t.tag) {
          case P:
          case ae:
          case Ce:
          case Ne: {
            if (t.mode & Vt)
              try {
                Jl(), cl(vr, t, t.return);
              } finally {
                Xl(t);
              }
            else
              cl(vr, t, t.return);
            break;
          }
          case F: {
            Gf(t, t.return);
            var i = t.stateNode;
            typeof i.componentWillUnmount == "function" && QS(t, t.return, i);
            break;
          }
          case le: {
            Gf(t, t.return);
            break;
          }
          case je: {
            var u = t.memoizedState !== null;
            if (u) {
              TR(e);
              continue;
            }
            break;
          }
        }
        a !== null ? (a.return = t, Me = a) : TR(e);
      }
    }
    function TR(e) {
      for (; Me !== null; ) {
        var t = Me;
        if (t === e) {
          Me = null;
          return;
        }
        var a = t.sibling;
        if (a !== null) {
          a.return = t.return, Me = a;
          return;
        }
        Me = t.return;
      }
    }
    function r_(e) {
      for (; Me !== null; ) {
        var t = Me, a = t.child;
        if (t.tag === je) {
          var i = t.memoizedState !== null;
          if (i) {
            bR(e);
            continue;
          }
        }
        a !== null ? (a.return = t, Me = a) : bR(e);
      }
    }
    function bR(e) {
      for (; Me !== null; ) {
        var t = Me;
        qt(t);
        try {
          W1(t);
        } catch (i) {
          fn(t, t.return, i);
        }
        if (cn(), t === e) {
          Me = null;
          return;
        }
        var a = t.sibling;
        if (a !== null) {
          a.return = t.return, Me = a;
          return;
        }
        Me = t.return;
      }
    }
    function a_(e, t, a, i) {
      Me = t, i_(t, e, a, i);
    }
    function i_(e, t, a, i) {
      for (; Me !== null; ) {
        var u = Me, s = u.child;
        (u.subtreeFlags & Ki) !== Ie && s !== null ? (s.return = u, Me = s) : l_(e, t, a, i);
      }
    }
    function l_(e, t, a, i) {
      for (; Me !== null; ) {
        var u = Me;
        if ((u.flags & Jr) !== Ie) {
          qt(u);
          try {
            u_(t, u, a, i);
          } catch (f) {
            fn(u, u.return, f);
          }
          cn();
        }
        if (u === e) {
          Me = null;
          return;
        }
        var s = u.sibling;
        if (s !== null) {
          s.return = u.return, Me = s;
          return;
        }
        Me = u.return;
      }
    }
    function u_(e, t, a, i) {
      switch (t.tag) {
        case P:
        case ae:
        case Ne: {
          if (t.mode & Vt) {
            hS();
            try {
              Io(Hr | pr, t);
            } finally {
              vS(t);
            }
          } else
            Io(Hr | pr, t);
          break;
        }
      }
    }
    function o_(e) {
      Me = e, s_();
    }
    function s_() {
      for (; Me !== null; ) {
        var e = Me, t = e.child;
        if ((Me.flags & La) !== Ie) {
          var a = e.deletions;
          if (a !== null) {
            for (var i = 0; i < a.length; i++) {
              var u = a[i];
              Me = u, d_(u, e);
            }
            {
              var s = e.alternate;
              if (s !== null) {
                var f = s.child;
                if (f !== null) {
                  s.child = null;
                  do {
                    var p = f.sibling;
                    f.sibling = null, f = p;
                  } while (f !== null);
                }
              }
            }
            Me = e;
          }
        }
        (e.subtreeFlags & Ki) !== Ie && t !== null ? (t.return = e, Me = t) : c_();
      }
    }
    function c_() {
      for (; Me !== null; ) {
        var e = Me;
        (e.flags & Jr) !== Ie && (qt(e), f_(e), cn());
        var t = e.sibling;
        if (t !== null) {
          t.return = e.return, Me = t;
          return;
        }
        Me = e.return;
      }
    }
    function f_(e) {
      switch (e.tag) {
        case P:
        case ae:
        case Ne: {
          e.mode & Vt ? (hS(), cl(Hr | pr, e, e.return), vS(e)) : cl(Hr | pr, e, e.return);
          break;
        }
      }
    }
    function d_(e, t) {
      for (; Me !== null; ) {
        var a = Me;
        qt(a), v_(a, t), cn();
        var i = a.child;
        i !== null ? (i.return = a, Me = i) : p_(e);
      }
    }
    function p_(e) {
      for (; Me !== null; ) {
        var t = Me, a = t.sibling, i = t.return;
        if (yR(t), t === e) {
          Me = null;
          return;
        }
        if (a !== null) {
          a.return = i, Me = a;
          return;
        }
        Me = i;
      }
    }
    function v_(e, t) {
      switch (e.tag) {
        case P:
        case ae:
        case Ne: {
          e.mode & Vt ? (hS(), cl(Hr, e, t), vS(e)) : cl(Hr, e, t);
          break;
        }
      }
    }
    function h_(e) {
      switch (e.tag) {
        case P:
        case ae:
        case Ne: {
          try {
            Io(vr | pr, e);
          } catch (a) {
            fn(e, e.return, a);
          }
          break;
        }
        case F: {
          var t = e.stateNode;
          try {
            t.componentDidMount();
          } catch (a) {
            fn(e, e.return, a);
          }
          break;
        }
      }
    }
    function m_(e) {
      switch (e.tag) {
        case P:
        case ae:
        case Ne: {
          try {
            Io(Hr | pr, e);
          } catch (t) {
            fn(e, e.return, t);
          }
          break;
        }
      }
    }
    function y_(e) {
      switch (e.tag) {
        case P:
        case ae:
        case Ne: {
          try {
            cl(vr | pr, e, e.return);
          } catch (a) {
            fn(e, e.return, a);
          }
          break;
        }
        case F: {
          var t = e.stateNode;
          typeof t.componentWillUnmount == "function" && QS(e, e.return, t);
          break;
        }
      }
    }
    function g_(e) {
      switch (e.tag) {
        case P:
        case ae:
        case Ne:
          try {
            cl(Hr | pr, e, e.return);
          } catch (t) {
            fn(e, e.return, t);
          }
      }
    }
    if (typeof Symbol == "function" && Symbol.for) {
      var Wp = Symbol.for;
      Wp("selector.component"), Wp("selector.has_pseudo_class"), Wp("selector.role"), Wp("selector.test_id"), Wp("selector.text");
    }
    var S_ = [];
    function E_() {
      S_.forEach(function(e) {
        return e();
      });
    }
    var C_ = E.ReactCurrentActQueue;
    function R_(e) {
      {
        var t = (
          // $FlowExpectedError – Flow doesn't know about IS_REACT_ACT_ENVIRONMENT global
          typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0
        ), a = typeof jest < "u";
        return a && t !== !1;
      }
    }
    function xR() {
      {
        var e = (
          // $FlowExpectedError – Flow doesn't know about IS_REACT_ACT_ENVIRONMENT global
          typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0
        );
        return !e && C_.current !== null && g("The current testing environment is not configured to support act(...)"), e;
      }
    }
    var w_ = Math.ceil, XS = E.ReactCurrentDispatcher, JS = E.ReactCurrentOwner, Yr = E.ReactCurrentBatchConfig, pl = E.ReactCurrentActQueue, yr = (
      /*             */
      0
    ), _R = (
      /*               */
      1
    ), Wr = (
      /*                */
      2
    ), ji = (
      /*                */
      4
    ), $u = 0, Qp = 1, oc = 2, Ym = 3, Gp = 4, DR = 5, ZS = 6, Nt = yr, wa = null, kn = null, gr = Z, eu = Z, eE = Uo(Z), Sr = $u, Kp = null, Wm = Z, qp = Z, Qm = Z, Xp = null, $a = null, tE = 0, NR = 500, kR = 1 / 0, T_ = 500, Yu = null;
    function Jp() {
      kR = Kn() + T_;
    }
    function OR() {
      return kR;
    }
    var Gm = !1, nE = null, Kf = null, sc = !1, Yo = null, Zp = Z, rE = [], aE = null, b_ = 50, ev = 0, iE = null, lE = !1, Km = !1, x_ = 50, qf = 0, qm = null, tv = nn, Xm = Z, LR = !1;
    function Jm() {
      return wa;
    }
    function Ta() {
      return (Nt & (Wr | ji)) !== yr ? Kn() : (tv !== nn || (tv = Kn()), tv);
    }
    function Wo(e) {
      var t = e.mode;
      if ((t & yt) === $e)
        return Ze;
      if ((Nt & Wr) !== yr && gr !== Z)
        return ks(gr);
      var a = Cx() !== Ex;
      if (a) {
        if (Yr.transition !== null) {
          var i = Yr.transition;
          i._updatedFibers || (i._updatedFibers = /* @__PURE__ */ new Set()), i._updatedFibers.add(e);
        }
        return Xm === zt && (Xm = Id()), Xm;
      }
      var u = Va();
      if (u !== zt)
        return u;
      var s = ib();
      return s;
    }
    function __(e) {
      var t = e.mode;
      return (t & yt) === $e ? Ze : nh();
    }
    function Er(e, t, a, i) {
      X_(), LR && g("useInsertionEffect must not schedule updates."), lE && (Km = !0), wo(e, a, i), (Nt & Wr) !== Z && e === wa ? eD(t) : (na && Ms(e, t, a), tD(t), e === wa && ((Nt & Wr) === yr && (qp = ot(qp, a)), Sr === Gp && Qo(e, gr)), Ya(e, i), a === Ze && Nt === yr && (t.mode & yt) === $e && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
      !pl.isBatchingLegacy && (Jp(), LC()));
    }
    function D_(e, t, a) {
      var i = e.current;
      i.lanes = t, wo(e, t, a), Ya(e, a);
    }
    function N_(e) {
      return (
        // TODO: Remove outdated deferRenderPhaseUpdateToNextBatch experiment. We
        // decided not to enable it.
        (Nt & Wr) !== yr
      );
    }
    function Ya(e, t) {
      var a = e.callbackNode;
      af(e, t);
      var i = rf(e, e === wa ? gr : Z);
      if (i === Z) {
        a !== null && GR(a), e.callbackNode = null, e.callbackPriority = zt;
        return;
      }
      var u = Fl(i), s = e.callbackPriority;
      if (s === u && // Special case related to `act`. If the currently scheduled task is a
      // Scheduler task, rather than an `act` task, cancel it and re-scheduled
      // on the `act` queue.
      !(pl.current !== null && a !== pE)) {
        a == null && s !== Ze && g("Expected scheduled callback to exist. This error is likely caused by a bug in React. Please file an issue.");
        return;
      }
      a != null && GR(a);
      var f;
      if (u === Ze)
        e.tag === zo ? (pl.isBatchingLegacy !== null && (pl.didScheduleLegacyUpdate = !0), rx(zR.bind(null, e))) : OC(zR.bind(null, e)), pl.current !== null ? pl.current.push(Ao) : ub(function() {
          (Nt & (Wr | ji)) === yr && Ao();
        }), f = null;
      else {
        var p;
        switch (sh(i)) {
          case zr:
            p = ms;
            break;
          case _i:
            p = Ul;
            break;
          case ja:
            p = qi;
            break;
          case Fa:
            p = gu;
            break;
          default:
            p = qi;
            break;
        }
        f = vE(p, MR.bind(null, e));
      }
      e.callbackPriority = u, e.callbackNode = f;
    }
    function MR(e, t) {
      if (Qx(), tv = nn, Xm = Z, (Nt & (Wr | ji)) !== yr)
        throw new Error("Should not already be working.");
      var a = e.callbackNode, i = Qu();
      if (i && e.callbackNode !== a)
        return null;
      var u = rf(e, e === wa ? gr : Z);
      if (u === Z)
        return null;
      var s = !uf(e, u) && !th(e, u) && !t, f = s ? V_(e, u) : ey(e, u);
      if (f !== $u) {
        if (f === oc) {
          var p = lf(e);
          p !== Z && (u = p, f = uE(e, p));
        }
        if (f === Qp) {
          var v = Kp;
          throw cc(e, Z), Qo(e, u), Ya(e, Kn()), v;
        }
        if (f === ZS)
          Qo(e, u);
        else {
          var S = !uf(e, u), R = e.current.alternate;
          if (S && !O_(R)) {
            if (f = ey(e, u), f === oc) {
              var O = lf(e);
              O !== Z && (u = O, f = uE(e, O));
            }
            if (f === Qp) {
              var D = Kp;
              throw cc(e, Z), Qo(e, u), Ya(e, Kn()), D;
            }
          }
          e.finishedWork = R, e.finishedLanes = u, k_(e, f, u);
        }
      }
      return Ya(e, Kn()), e.callbackNode === a ? MR.bind(null, e) : null;
    }
    function uE(e, t) {
      var a = Xp;
      if (cf(e)) {
        var i = cc(e, t);
        i.flags |= xr, qb(e.containerInfo);
      }
      var u = ey(e, t);
      if (u !== oc) {
        var s = $a;
        $a = a, s !== null && UR(s);
      }
      return u;
    }
    function UR(e) {
      $a === null ? $a = e : $a.push.apply($a, e);
    }
    function k_(e, t, a) {
      switch (t) {
        case $u:
        case Qp:
          throw new Error("Root did not complete. This is a bug in React.");
        case oc: {
          fc(e, $a, Yu);
          break;
        }
        case Ym: {
          if (Qo(e, a), Nu(a) && // do not delay if we're inside an act() scope
          !KR()) {
            var i = tE + NR - Kn();
            if (i > 10) {
              var u = rf(e, Z);
              if (u !== Z)
                break;
              var s = e.suspendedLanes;
              if (!ku(s, a)) {
                Ta(), of(e, s);
                break;
              }
              e.timeoutHandle = ag(fc.bind(null, e, $a, Yu), i);
              break;
            }
          }
          fc(e, $a, Yu);
          break;
        }
        case Gp: {
          if (Qo(e, a), Hd(a))
            break;
          if (!KR()) {
            var f = ii(e, a), p = f, v = Kn() - p, S = q_(v) - v;
            if (S > 10) {
              e.timeoutHandle = ag(fc.bind(null, e, $a, Yu), S);
              break;
            }
          }
          fc(e, $a, Yu);
          break;
        }
        case DR: {
          fc(e, $a, Yu);
          break;
        }
        default:
          throw new Error("Unknown root exit status.");
      }
    }
    function O_(e) {
      for (var t = e; ; ) {
        if (t.flags & go) {
          var a = t.updateQueue;
          if (a !== null) {
            var i = a.stores;
            if (i !== null)
              for (var u = 0; u < i.length; u++) {
                var s = i[u], f = s.getSnapshot, p = s.value;
                try {
                  if (!re(f(), p))
                    return !1;
                } catch {
                  return !1;
                }
              }
          }
        }
        var v = t.child;
        if (t.subtreeFlags & go && v !== null) {
          v.return = t, t = v;
          continue;
        }
        if (t === e)
          return !0;
        for (; t.sibling === null; ) {
          if (t.return === null || t.return === e)
            return !0;
          t = t.return;
        }
        t.sibling.return = t.return, t = t.sibling;
      }
      return !0;
    }
    function Qo(e, t) {
      t = Os(t, Qm), t = Os(t, qp), ih(e, t);
    }
    function zR(e) {
      if (Gx(), (Nt & (Wr | ji)) !== yr)
        throw new Error("Should not already be working.");
      Qu();
      var t = rf(e, Z);
      if (!aa(t, Ze))
        return Ya(e, Kn()), null;
      var a = ey(e, t);
      if (e.tag !== zo && a === oc) {
        var i = lf(e);
        i !== Z && (t = i, a = uE(e, i));
      }
      if (a === Qp) {
        var u = Kp;
        throw cc(e, Z), Qo(e, t), Ya(e, Kn()), u;
      }
      if (a === ZS)
        throw new Error("Root did not complete. This is a bug in React.");
      var s = e.current.alternate;
      return e.finishedWork = s, e.finishedLanes = t, fc(e, $a, Yu), Ya(e, Kn()), null;
    }
    function L_(e, t) {
      t !== Z && (sf(e, ot(t, Ze)), Ya(e, Kn()), (Nt & (Wr | ji)) === yr && (Jp(), Ao()));
    }
    function oE(e, t) {
      var a = Nt;
      Nt |= _R;
      try {
        return e(t);
      } finally {
        Nt = a, Nt === yr && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
        !pl.isBatchingLegacy && (Jp(), LC());
      }
    }
    function M_(e, t, a, i, u) {
      var s = Va(), f = Yr.transition;
      try {
        return Yr.transition = null, Vn(zr), e(t, a, i, u);
      } finally {
        Vn(s), Yr.transition = f, Nt === yr && Jp();
      }
    }
    function Wu(e) {
      Yo !== null && Yo.tag === zo && (Nt & (Wr | ji)) === yr && Qu();
      var t = Nt;
      Nt |= _R;
      var a = Yr.transition, i = Va();
      try {
        return Yr.transition = null, Vn(zr), e ? e() : void 0;
      } finally {
        Vn(i), Yr.transition = a, Nt = t, (Nt & (Wr | ji)) === yr && Ao();
      }
    }
    function AR() {
      return (Nt & (Wr | ji)) !== yr;
    }
    function Zm(e, t) {
      sa(eE, eu, e), eu = ot(eu, t);
    }
    function sE(e) {
      eu = eE.current, oa(eE, e);
    }
    function cc(e, t) {
      e.finishedWork = null, e.finishedLanes = Z;
      var a = e.timeoutHandle;
      if (a !== ig && (e.timeoutHandle = ig, lb(a)), kn !== null)
        for (var i = kn.return; i !== null; ) {
          var u = i.alternate;
          fR(u, i), i = i.return;
        }
      wa = e;
      var s = dc(e.current, null);
      return kn = s, gr = eu = t, Sr = $u, Kp = null, Wm = Z, qp = Z, Qm = Z, Xp = null, $a = null, Dx(), il.discardPendingWarnings(), s;
    }
    function jR(e, t) {
      do {
        var a = kn;
        try {
          if (sm(), u0(), cn(), JS.current = null, a === null || a.return === null) {
            Sr = Qp, Kp = t, kn = null;
            return;
          }
          if (Je && a.mode & Vt && Fm(a, !0), et)
            if (Sa(), t !== null && typeof t == "object" && typeof t.then == "function") {
              var i = t;
              xi(a, i, gr);
            } else
              gs(a, t, gr);
          r1(e, a.return, a, t, gr), HR(a);
        } catch (u) {
          t = u, kn === a && a !== null ? (a = a.return, kn = a) : a = kn;
          continue;
        }
        return;
      } while (!0);
    }
    function FR() {
      var e = XS.current;
      return XS.current = Mm, e === null ? Mm : e;
    }
    function VR(e) {
      XS.current = e;
    }
    function U_() {
      tE = Kn();
    }
    function nv(e) {
      Wm = ot(e, Wm);
    }
    function z_() {
      Sr === $u && (Sr = Ym);
    }
    function cE() {
      (Sr === $u || Sr === Ym || Sr === oc) && (Sr = Gp), wa !== null && (Ns(Wm) || Ns(qp)) && Qo(wa, gr);
    }
    function A_(e) {
      Sr !== Gp && (Sr = oc), Xp === null ? Xp = [e] : Xp.push(e);
    }
    function j_() {
      return Sr === $u;
    }
    function ey(e, t) {
      var a = Nt;
      Nt |= Wr;
      var i = FR();
      if (wa !== e || gr !== t) {
        if (na) {
          var u = e.memoizedUpdaters;
          u.size > 0 && (rv(e, gr), u.clear()), lh(e, t);
        }
        Yu = Qd(), cc(e, t);
      }
      Ru(t);
      do
        try {
          F_();
          break;
        } catch (s) {
          jR(e, s);
        }
      while (!0);
      if (sm(), Nt = a, VR(i), kn !== null)
        throw new Error("Cannot commit an incomplete root. This error is likely caused by a bug in React. Please file an issue.");
      return Vc(), wa = null, gr = Z, Sr;
    }
    function F_() {
      for (; kn !== null; )
        PR(kn);
    }
    function V_(e, t) {
      var a = Nt;
      Nt |= Wr;
      var i = FR();
      if (wa !== e || gr !== t) {
        if (na) {
          var u = e.memoizedUpdaters;
          u.size > 0 && (rv(e, gr), u.clear()), lh(e, t);
        }
        Yu = Qd(), Jp(), cc(e, t);
      }
      Ru(t);
      do
        try {
          P_();
          break;
        } catch (s) {
          jR(e, s);
        }
      while (!0);
      return sm(), VR(i), Nt = a, kn !== null ? (Xv(), $u) : (Vc(), wa = null, gr = Z, Sr);
    }
    function P_() {
      for (; kn !== null && !xd(); )
        PR(kn);
    }
    function PR(e) {
      var t = e.alternate;
      qt(e);
      var a;
      (e.mode & Vt) !== $e ? (pS(e), a = fE(t, e, eu), Fm(e, !0)) : a = fE(t, e, eu), cn(), e.memoizedProps = e.pendingProps, a === null ? HR(e) : kn = a, JS.current = null;
    }
    function HR(e) {
      var t = e;
      do {
        var a = t.alternate, i = t.return;
        if ((t.flags & hs) === Ie) {
          qt(t);
          var u = void 0;
          if ((t.mode & Vt) === $e ? u = cR(a, t, eu) : (pS(t), u = cR(a, t, eu), Fm(t, !1)), cn(), u !== null) {
            kn = u;
            return;
          }
        } else {
          var s = z1(a, t);
          if (s !== null) {
            s.flags &= Yv, kn = s;
            return;
          }
          if ((t.mode & Vt) !== $e) {
            Fm(t, !1);
            for (var f = t.actualDuration, p = t.child; p !== null; )
              f += p.actualDuration, p = p.sibling;
            t.actualDuration = f;
          }
          if (i !== null)
            i.flags |= hs, i.subtreeFlags = Ie, i.deletions = null;
          else {
            Sr = ZS, kn = null;
            return;
          }
        }
        var v = t.sibling;
        if (v !== null) {
          kn = v;
          return;
        }
        t = i, kn = t;
      } while (t !== null);
      Sr === $u && (Sr = DR);
    }
    function fc(e, t, a) {
      var i = Va(), u = Yr.transition;
      try {
        Yr.transition = null, Vn(zr), H_(e, t, a, i);
      } finally {
        Yr.transition = u, Vn(i);
      }
      return null;
    }
    function H_(e, t, a, i) {
      do
        Qu();
      while (Yo !== null);
      if (J_(), (Nt & (Wr | ji)) !== yr)
        throw new Error("Should not already be working.");
      var u = e.finishedWork, s = e.finishedLanes;
      if (Ld(s), u === null)
        return Md(), null;
      if (s === Z && g("root.finishedLanes should not be empty during a commit. This is a bug in React."), e.finishedWork = null, e.finishedLanes = Z, u === e.current)
        throw new Error("Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue.");
      e.callbackNode = null, e.callbackPriority = zt;
      var f = ot(u.lanes, u.childLanes);
      Yd(e, f), e === wa && (wa = null, kn = null, gr = Z), ((u.subtreeFlags & Ki) !== Ie || (u.flags & Ki) !== Ie) && (sc || (sc = !0, aE = a, vE(qi, function() {
        return Qu(), null;
      })));
      var p = (u.subtreeFlags & (Ol | Ll | Ml | Ki)) !== Ie, v = (u.flags & (Ol | Ll | Ml | Ki)) !== Ie;
      if (p || v) {
        var S = Yr.transition;
        Yr.transition = null;
        var R = Va();
        Vn(zr);
        var O = Nt;
        Nt |= ji, JS.current = null, P1(e, u), L0(), e_(e, u, s), ZT(e.containerInfo), e.current = u, Ss(s), t_(u, e, s), Es(), _d(), Nt = O, Vn(R), Yr.transition = S;
      } else
        e.current = u, L0();
      var D = sc;
      if (sc ? (sc = !1, Yo = e, Zp = s) : (qf = 0, qm = null), f = e.pendingLanes, f === Z && (Kf = null), D || YR(e.current, !1), Nd(u.stateNode, i), na && e.memoizedUpdaters.clear(), E_(), Ya(e, Kn()), t !== null)
        for (var H = e.onRecoverableError, $ = 0; $ < t.length; $++) {
          var W = t[$], we = W.stack, Qe = W.digest;
          H(W.value, {
            componentStack: we,
            digest: Qe
          });
        }
      if (Gm) {
        Gm = !1;
        var Ve = nE;
        throw nE = null, Ve;
      }
      return aa(Zp, Ze) && e.tag !== zo && Qu(), f = e.pendingLanes, aa(f, Ze) ? (Wx(), e === iE ? ev++ : (ev = 0, iE = e)) : ev = 0, Ao(), Md(), null;
    }
    function Qu() {
      if (Yo !== null) {
        var e = sh(Zp), t = zs(ja, e), a = Yr.transition, i = Va();
        try {
          return Yr.transition = null, Vn(t), I_();
        } finally {
          Vn(i), Yr.transition = a;
        }
      }
      return !1;
    }
    function B_(e) {
      rE.push(e), sc || (sc = !0, vE(qi, function() {
        return Qu(), null;
      }));
    }
    function I_() {
      if (Yo === null)
        return !1;
      var e = aE;
      aE = null;
      var t = Yo, a = Zp;
      if (Yo = null, Zp = Z, (Nt & (Wr | ji)) !== yr)
        throw new Error("Cannot flush passive effects while already rendering.");
      lE = !0, Km = !1, Cu(a);
      var i = Nt;
      Nt |= ji, o_(t.current), a_(t, t.current, a, e);
      {
        var u = rE;
        rE = [];
        for (var s = 0; s < u.length; s++) {
          var f = u[s];
          $1(t, f);
        }
      }
      Ad(), YR(t.current, !0), Nt = i, Ao(), Km ? t === qm ? qf++ : (qf = 0, qm = t) : qf = 0, lE = !1, Km = !1, kd(t);
      {
        var p = t.current.stateNode;
        p.effectDuration = 0, p.passiveEffectDuration = 0;
      }
      return !0;
    }
    function BR(e) {
      return Kf !== null && Kf.has(e);
    }
    function $_(e) {
      Kf === null ? Kf = /* @__PURE__ */ new Set([e]) : Kf.add(e);
    }
    function Y_(e) {
      Gm || (Gm = !0, nE = e);
    }
    var W_ = Y_;
    function IR(e, t, a) {
      var i = lc(a, t), u = P0(e, i, Ze), s = Fo(e, u, Ze), f = Ta();
      s !== null && (wo(s, Ze, f), Ya(s, f));
    }
    function fn(e, t, a) {
      if (j1(a), av(!1), e.tag === V) {
        IR(e, e, a);
        return;
      }
      var i = null;
      for (i = t; i !== null; ) {
        if (i.tag === V) {
          IR(i, e, a);
          return;
        } else if (i.tag === F) {
          var u = i.type, s = i.stateNode;
          if (typeof u.getDerivedStateFromError == "function" || typeof s.componentDidCatch == "function" && !BR(s)) {
            var f = lc(a, e), p = OS(i, f, Ze), v = Fo(i, p, Ze), S = Ta();
            v !== null && (wo(v, Ze, S), Ya(v, S));
            return;
          }
        }
        i = i.return;
      }
      g(`Internal React error: Attempted to capture a commit phase error inside a detached tree. This indicates a bug in React. Likely causes include deleting the same fiber more than once, committing an already-finished tree, or an inconsistent return pointer.

Error message:

%s`, a);
    }
    function Q_(e, t, a) {
      var i = e.pingCache;
      i !== null && i.delete(t);
      var u = Ta();
      of(e, a), nD(e), wa === e && ku(gr, a) && (Sr === Gp || Sr === Ym && Nu(gr) && Kn() - tE < NR ? cc(e, Z) : Qm = ot(Qm, a)), Ya(e, u);
    }
    function $R(e, t) {
      t === zt && (t = __(e));
      var a = Ta(), i = Ba(e, t);
      i !== null && (wo(i, t, a), Ya(i, a));
    }
    function G_(e) {
      var t = e.memoizedState, a = zt;
      t !== null && (a = t.retryLane), $R(e, a);
    }
    function K_(e, t) {
      var a = zt, i;
      switch (e.tag) {
        case ge:
          i = e.stateNode;
          var u = e.memoizedState;
          u !== null && (a = u.retryLane);
          break;
        case Ot:
          i = e.stateNode;
          break;
        default:
          throw new Error("Pinged unknown suspense boundary type. This is probably a bug in React.");
      }
      i !== null && i.delete(t), $R(e, a);
    }
    function q_(e) {
      return e < 120 ? 120 : e < 480 ? 480 : e < 1080 ? 1080 : e < 1920 ? 1920 : e < 3e3 ? 3e3 : e < 4320 ? 4320 : w_(e / 1960) * 1960;
    }
    function X_() {
      if (ev > b_)
        throw ev = 0, iE = null, new Error("Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.");
      qf > x_ && (qf = 0, qm = null, g("Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render."));
    }
    function J_() {
      il.flushLegacyContextWarning(), il.flushPendingUnsafeLifecycleWarnings();
    }
    function YR(e, t) {
      qt(e), ty(e, kl, y_), t && ty(e, wi, g_), ty(e, kl, h_), t && ty(e, wi, m_), cn();
    }
    function ty(e, t, a) {
      for (var i = e, u = null; i !== null; ) {
        var s = i.subtreeFlags & t;
        i !== u && i.child !== null && s !== Ie ? i = i.child : ((i.flags & t) !== Ie && a(i), i.sibling !== null ? i = i.sibling : i = u = i.return);
      }
    }
    var ny = null;
    function WR(e) {
      {
        if ((Nt & Wr) !== yr || !(e.mode & yt))
          return;
        var t = e.tag;
        if (t !== ie && t !== V && t !== F && t !== P && t !== ae && t !== Ce && t !== Ne)
          return;
        var a = it(e) || "ReactComponent";
        if (ny !== null) {
          if (ny.has(a))
            return;
          ny.add(a);
        } else
          ny = /* @__PURE__ */ new Set([a]);
        var i = or;
        try {
          qt(e), g("Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously later calls tries to update the component. Move this work to useEffect instead.");
        } finally {
          i ? qt(e) : cn();
        }
      }
    }
    var fE;
    {
      var Z_ = null;
      fE = function(e, t, a) {
        var i = ew(Z_, t);
        try {
          return iR(e, t, a);
        } catch (s) {
          if (fx() || s !== null && typeof s == "object" && typeof s.then == "function")
            throw s;
          if (sm(), u0(), fR(e, t), ew(t, i), t.mode & Vt && pS(t), Nl(null, iR, null, e, t, a), Qi()) {
            var u = vs();
            typeof u == "object" && u !== null && u._suppressLogging && typeof s == "object" && s !== null && !s._suppressLogging && (s._suppressLogging = !0);
          }
          throw s;
        }
      };
    }
    var QR = !1, dE;
    dE = /* @__PURE__ */ new Set();
    function eD(e) {
      if (mi && !Ix())
        switch (e.tag) {
          case P:
          case ae:
          case Ne: {
            var t = kn && it(kn) || "Unknown", a = t;
            if (!dE.has(a)) {
              dE.add(a);
              var i = it(e) || "Unknown";
              g("Cannot update a component (`%s`) while rendering a different component (`%s`). To locate the bad setState() call inside `%s`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render", i, t, t);
            }
            break;
          }
          case F: {
            QR || (g("Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state."), QR = !0);
            break;
          }
        }
    }
    function rv(e, t) {
      if (na) {
        var a = e.memoizedUpdaters;
        a.forEach(function(i) {
          Ms(e, i, t);
        });
      }
    }
    var pE = {};
    function vE(e, t) {
      {
        var a = pl.current;
        return a !== null ? (a.push(t), pE) : bd(e, t);
      }
    }
    function GR(e) {
      if (e !== pE)
        return Qv(e);
    }
    function KR() {
      return pl.current !== null;
    }
    function tD(e) {
      {
        if (e.mode & yt) {
          if (!xR())
            return;
        } else if (!R_() || Nt !== yr || e.tag !== P && e.tag !== ae && e.tag !== Ne)
          return;
        if (pl.current === null) {
          var t = or;
          try {
            qt(e), g(`An update to %s inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`, it(e));
          } finally {
            t ? qt(e) : cn();
          }
        }
      }
    }
    function nD(e) {
      e.tag !== zo && xR() && pl.current === null && g(`A suspended resource finished loading inside a test, but the event was not wrapped in act(...).

When testing, code that resolves suspended data should be wrapped into act(...):

act(() => {
  /* finish loading suspended data */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`);
    }
    function av(e) {
      LR = e;
    }
    var Fi = null, Xf = null, rD = function(e) {
      Fi = e;
    };
    function Jf(e) {
      {
        if (Fi === null)
          return e;
        var t = Fi(e);
        return t === void 0 ? e : t.current;
      }
    }
    function hE(e) {
      return Jf(e);
    }
    function mE(e) {
      {
        if (Fi === null)
          return e;
        var t = Fi(e);
        if (t === void 0) {
          if (e != null && typeof e.render == "function") {
            var a = Jf(e.render);
            if (e.render !== a) {
              var i = {
                $$typeof: Be,
                render: a
              };
              return e.displayName !== void 0 && (i.displayName = e.displayName), i;
            }
          }
          return e;
        }
        return t.current;
      }
    }
    function qR(e, t) {
      {
        if (Fi === null)
          return !1;
        var a = e.elementType, i = t.type, u = !1, s = typeof i == "object" && i !== null ? i.$$typeof : null;
        switch (e.tag) {
          case F: {
            typeof i == "function" && (u = !0);
            break;
          }
          case P: {
            (typeof i == "function" || s === Ye) && (u = !0);
            break;
          }
          case ae: {
            (s === Be || s === Ye) && (u = !0);
            break;
          }
          case Ce:
          case Ne: {
            (s === rt || s === Ye) && (u = !0);
            break;
          }
          default:
            return !1;
        }
        if (u) {
          var f = Fi(a);
          if (f !== void 0 && f === Fi(i))
            return !0;
        }
        return !1;
      }
    }
    function XR(e) {
      {
        if (Fi === null || typeof WeakSet != "function")
          return;
        Xf === null && (Xf = /* @__PURE__ */ new WeakSet()), Xf.add(e);
      }
    }
    var aD = function(e, t) {
      {
        if (Fi === null)
          return;
        var a = t.staleFamilies, i = t.updatedFamilies;
        Qu(), Wu(function() {
          yE(e.current, i, a);
        });
      }
    }, iD = function(e, t) {
      {
        if (e.context !== oi)
          return;
        Qu(), Wu(function() {
          iv(t, e, null, null);
        });
      }
    };
    function yE(e, t, a) {
      {
        var i = e.alternate, u = e.child, s = e.sibling, f = e.tag, p = e.type, v = null;
        switch (f) {
          case P:
          case Ne:
          case F:
            v = p;
            break;
          case ae:
            v = p.render;
            break;
        }
        if (Fi === null)
          throw new Error("Expected resolveFamily to be set during hot reload.");
        var S = !1, R = !1;
        if (v !== null) {
          var O = Fi(v);
          O !== void 0 && (a.has(O) ? R = !0 : t.has(O) && (f === F ? R = !0 : S = !0));
        }
        if (Xf !== null && (Xf.has(e) || i !== null && Xf.has(i)) && (R = !0), R && (e._debugNeedsRemount = !0), R || S) {
          var D = Ba(e, Ze);
          D !== null && Er(D, e, Ze, nn);
        }
        u !== null && !R && yE(u, t, a), s !== null && yE(s, t, a);
      }
    }
    var lD = function(e, t) {
      {
        var a = /* @__PURE__ */ new Set(), i = new Set(t.map(function(u) {
          return u.current;
        }));
        return gE(e.current, i, a), a;
      }
    };
    function gE(e, t, a) {
      {
        var i = e.child, u = e.sibling, s = e.tag, f = e.type, p = null;
        switch (s) {
          case P:
          case Ne:
          case F:
            p = f;
            break;
          case ae:
            p = f.render;
            break;
        }
        var v = !1;
        p !== null && t.has(p) && (v = !0), v ? uD(e, a) : i !== null && gE(i, t, a), u !== null && gE(u, t, a);
      }
    }
    function uD(e, t) {
      {
        var a = oD(e, t);
        if (a)
          return;
        for (var i = e; ; ) {
          switch (i.tag) {
            case le:
              t.add(i.stateNode);
              return;
            case X:
              t.add(i.stateNode.containerInfo);
              return;
            case V:
              t.add(i.stateNode.containerInfo);
              return;
          }
          if (i.return === null)
            throw new Error("Expected to reach root first.");
          i = i.return;
        }
      }
    }
    function oD(e, t) {
      for (var a = e, i = !1; ; ) {
        if (a.tag === le)
          i = !0, t.add(a.stateNode);
        else if (a.child !== null) {
          a.child.return = a, a = a.child;
          continue;
        }
        if (a === e)
          return i;
        for (; a.sibling === null; ) {
          if (a.return === null || a.return === e)
            return i;
          a = a.return;
        }
        a.sibling.return = a.return, a = a.sibling;
      }
      return !1;
    }
    var SE;
    {
      SE = !1;
      try {
        var JR = Object.preventExtensions({});
      } catch {
        SE = !0;
      }
    }
    function sD(e, t, a, i) {
      this.tag = e, this.key = a, this.elementType = null, this.type = null, this.stateNode = null, this.return = null, this.child = null, this.sibling = null, this.index = 0, this.ref = null, this.pendingProps = t, this.memoizedProps = null, this.updateQueue = null, this.memoizedState = null, this.dependencies = null, this.mode = i, this.flags = Ie, this.subtreeFlags = Ie, this.deletions = null, this.lanes = Z, this.childLanes = Z, this.alternate = null, this.actualDuration = Number.NaN, this.actualStartTime = Number.NaN, this.selfBaseDuration = Number.NaN, this.treeBaseDuration = Number.NaN, this.actualDuration = 0, this.actualStartTime = -1, this.selfBaseDuration = 0, this.treeBaseDuration = 0, this._debugSource = null, this._debugOwner = null, this._debugNeedsRemount = !1, this._debugHookTypes = null, !SE && typeof Object.preventExtensions == "function" && Object.preventExtensions(this);
    }
    var si = function(e, t, a, i) {
      return new sD(e, t, a, i);
    };
    function EE(e) {
      var t = e.prototype;
      return !!(t && t.isReactComponent);
    }
    function cD(e) {
      return typeof e == "function" && !EE(e) && e.defaultProps === void 0;
    }
    function fD(e) {
      if (typeof e == "function")
        return EE(e) ? F : P;
      if (e != null) {
        var t = e.$$typeof;
        if (t === Be)
          return ae;
        if (t === rt)
          return Ce;
      }
      return ie;
    }
    function dc(e, t) {
      var a = e.alternate;
      a === null ? (a = si(e.tag, t, e.key, e.mode), a.elementType = e.elementType, a.type = e.type, a.stateNode = e.stateNode, a._debugSource = e._debugSource, a._debugOwner = e._debugOwner, a._debugHookTypes = e._debugHookTypes, a.alternate = e, e.alternate = a) : (a.pendingProps = t, a.type = e.type, a.flags = Ie, a.subtreeFlags = Ie, a.deletions = null, a.actualDuration = 0, a.actualStartTime = -1), a.flags = e.flags & An, a.childLanes = e.childLanes, a.lanes = e.lanes, a.child = e.child, a.memoizedProps = e.memoizedProps, a.memoizedState = e.memoizedState, a.updateQueue = e.updateQueue;
      var i = e.dependencies;
      switch (a.dependencies = i === null ? null : {
        lanes: i.lanes,
        firstContext: i.firstContext
      }, a.sibling = e.sibling, a.index = e.index, a.ref = e.ref, a.selfBaseDuration = e.selfBaseDuration, a.treeBaseDuration = e.treeBaseDuration, a._debugNeedsRemount = e._debugNeedsRemount, a.tag) {
        case ie:
        case P:
        case Ne:
          a.type = Jf(e.type);
          break;
        case F:
          a.type = hE(e.type);
          break;
        case ae:
          a.type = mE(e.type);
          break;
      }
      return a;
    }
    function dD(e, t) {
      e.flags &= An | gn;
      var a = e.alternate;
      if (a === null)
        e.childLanes = Z, e.lanes = t, e.child = null, e.subtreeFlags = Ie, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null, e.selfBaseDuration = 0, e.treeBaseDuration = 0;
      else {
        e.childLanes = a.childLanes, e.lanes = a.lanes, e.child = a.child, e.subtreeFlags = Ie, e.deletions = null, e.memoizedProps = a.memoizedProps, e.memoizedState = a.memoizedState, e.updateQueue = a.updateQueue, e.type = a.type;
        var i = a.dependencies;
        e.dependencies = i === null ? null : {
          lanes: i.lanes,
          firstContext: i.firstContext
        }, e.selfBaseDuration = a.selfBaseDuration, e.treeBaseDuration = a.treeBaseDuration;
      }
      return e;
    }
    function pD(e, t, a) {
      var i;
      return e === Zh ? (i = yt, t === !0 && (i |= Zt, i |= Pt)) : i = $e, na && (i |= Vt), si(V, null, null, i);
    }
    function CE(e, t, a, i, u, s) {
      var f = ie, p = e;
      if (typeof e == "function")
        EE(e) ? (f = F, p = hE(p)) : p = Jf(p);
      else if (typeof e == "string")
        f = le;
      else
        e: switch (e) {
          case vi:
            return Go(a.children, u, s, t);
          case qa:
            f = fe, u |= Zt, (u & yt) !== $e && (u |= Pt);
            break;
          case b:
            return vD(a, u, s, t);
          case Rt:
            return hD(a, u, s, t);
          case nt:
            return mD(a, u, s, t);
          case an:
            return ZR(a, u, s, t);
          case ur:
          case Mn:
          case Xa:
          case _a:
          case sn:
          default: {
            if (typeof e == "object" && e !== null)
              switch (e.$$typeof) {
                case ee:
                  f = ue;
                  break e;
                case me:
                  f = He;
                  break e;
                case Be:
                  f = ae, p = mE(p);
                  break e;
                case rt:
                  f = Ce;
                  break e;
                case Ye:
                  f = St, p = null;
                  break e;
              }
            var v = "";
            {
              (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (v += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
              var S = i ? it(i) : null;
              S && (v += `

Check the render method of \`` + S + "`.");
            }
            throw new Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) " + ("but got: " + (e == null ? e : typeof e) + "." + v));
          }
        }
      var R = si(f, a, t, u);
      return R.elementType = e, R.type = p, R.lanes = s, R._debugOwner = i, R;
    }
    function RE(e, t, a) {
      var i = null;
      i = e._owner;
      var u = e.type, s = e.key, f = e.props, p = CE(u, s, f, i, t, a);
      return p._debugSource = e._source, p._debugOwner = e._owner, p;
    }
    function Go(e, t, a, i) {
      var u = si(be, e, i, t);
      return u.lanes = a, u;
    }
    function vD(e, t, a, i) {
      typeof e.id != "string" && g('Profiler must specify an "id" of type `string` as a prop. Received the type `%s` instead.', typeof e.id);
      var u = si(he, e, i, t | Vt);
      return u.elementType = b, u.lanes = a, u.stateNode = {
        effectDuration: 0,
        passiveEffectDuration: 0
      }, u;
    }
    function hD(e, t, a, i) {
      var u = si(ge, e, i, t);
      return u.elementType = Rt, u.lanes = a, u;
    }
    function mD(e, t, a, i) {
      var u = si(Ot, e, i, t);
      return u.elementType = nt, u.lanes = a, u;
    }
    function ZR(e, t, a, i) {
      var u = si(je, e, i, t);
      u.elementType = an, u.lanes = a;
      var s = {
        isHidden: !1
      };
      return u.stateNode = s, u;
    }
    function wE(e, t, a) {
      var i = si(ve, e, null, t);
      return i.lanes = a, i;
    }
    function yD() {
      var e = si(le, null, null, $e);
      return e.elementType = "DELETED", e;
    }
    function gD(e) {
      var t = si(wt, null, null, $e);
      return t.stateNode = e, t;
    }
    function TE(e, t, a) {
      var i = e.children !== null ? e.children : [], u = si(X, i, e.key, t);
      return u.lanes = a, u.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        // Used by persistent updates
        implementation: e.implementation
      }, u;
    }
    function ew(e, t) {
      return e === null && (e = si(ie, null, null, $e)), e.tag = t.tag, e.key = t.key, e.elementType = t.elementType, e.type = t.type, e.stateNode = t.stateNode, e.return = t.return, e.child = t.child, e.sibling = t.sibling, e.index = t.index, e.ref = t.ref, e.pendingProps = t.pendingProps, e.memoizedProps = t.memoizedProps, e.updateQueue = t.updateQueue, e.memoizedState = t.memoizedState, e.dependencies = t.dependencies, e.mode = t.mode, e.flags = t.flags, e.subtreeFlags = t.subtreeFlags, e.deletions = t.deletions, e.lanes = t.lanes, e.childLanes = t.childLanes, e.alternate = t.alternate, e.actualDuration = t.actualDuration, e.actualStartTime = t.actualStartTime, e.selfBaseDuration = t.selfBaseDuration, e.treeBaseDuration = t.treeBaseDuration, e._debugSource = t._debugSource, e._debugOwner = t._debugOwner, e._debugNeedsRemount = t._debugNeedsRemount, e._debugHookTypes = t._debugHookTypes, e;
    }
    function SD(e, t, a, i, u) {
      this.tag = t, this.containerInfo = e, this.pendingChildren = null, this.current = null, this.pingCache = null, this.finishedWork = null, this.timeoutHandle = ig, this.context = null, this.pendingContext = null, this.callbackNode = null, this.callbackPriority = zt, this.eventTimes = Ls(Z), this.expirationTimes = Ls(nn), this.pendingLanes = Z, this.suspendedLanes = Z, this.pingedLanes = Z, this.expiredLanes = Z, this.mutableReadLanes = Z, this.finishedLanes = Z, this.entangledLanes = Z, this.entanglements = Ls(Z), this.identifierPrefix = i, this.onRecoverableError = u, this.mutableSourceEagerHydrationData = null, this.effectDuration = 0, this.passiveEffectDuration = 0;
      {
        this.memoizedUpdaters = /* @__PURE__ */ new Set();
        for (var s = this.pendingUpdatersLaneMap = [], f = 0; f < wu; f++)
          s.push(/* @__PURE__ */ new Set());
      }
      switch (t) {
        case Zh:
          this._debugRootType = a ? "hydrateRoot()" : "createRoot()";
          break;
        case zo:
          this._debugRootType = a ? "hydrate()" : "render()";
          break;
      }
    }
    function tw(e, t, a, i, u, s, f, p, v, S) {
      var R = new SD(e, t, a, p, v), O = pD(t, s);
      R.current = O, O.stateNode = R;
      {
        var D = {
          element: i,
          isDehydrated: a,
          cache: null,
          // not enabled yet
          transitions: null,
          pendingSuspenseBoundaries: null
        };
        O.memoizedState = D;
      }
      return jg(O), R;
    }
    var bE = "18.3.1";
    function ED(e, t, a) {
      var i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
      return Gr(i), {
        // This tag allow us to uniquely identify this as a React Portal
        $$typeof: lr,
        key: i == null ? null : "" + i,
        children: e,
        containerInfo: t,
        implementation: a
      };
    }
    var xE, _E;
    xE = !1, _E = {};
    function nw(e) {
      if (!e)
        return oi;
      var t = yo(e), a = nx(t);
      if (t.tag === F) {
        var i = t.type;
        if (Ql(i))
          return NC(t, i, a);
      }
      return a;
    }
    function CD(e, t) {
      {
        var a = yo(e);
        if (a === void 0) {
          if (typeof e.render == "function")
            throw new Error("Unable to find node on an unmounted component.");
          var i = Object.keys(e).join(",");
          throw new Error("Argument appears to not be a ReactComponent. Keys: " + i);
        }
        var u = ea(a);
        if (u === null)
          return null;
        if (u.mode & Zt) {
          var s = it(a) || "Component";
          if (!_E[s]) {
            _E[s] = !0;
            var f = or;
            try {
              qt(u), a.mode & Zt ? g("%s is deprecated in StrictMode. %s was passed an instance of %s which is inside StrictMode. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", t, t, s) : g("%s is deprecated in StrictMode. %s was passed an instance of %s which renders StrictMode children. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", t, t, s);
            } finally {
              f ? qt(f) : cn();
            }
          }
        }
        return u.stateNode;
      }
    }
    function rw(e, t, a, i, u, s, f, p) {
      var v = !1, S = null;
      return tw(e, t, v, S, a, i, u, s, f);
    }
    function aw(e, t, a, i, u, s, f, p, v, S) {
      var R = !0, O = tw(a, i, R, e, u, s, f, p, v);
      O.context = nw(null);
      var D = O.current, H = Ta(), $ = Wo(D), W = Bu(H, $);
      return W.callback = t ?? null, Fo(D, W, $), D_(O, $, H), O;
    }
    function iv(e, t, a, i) {
      Dd(t, e);
      var u = t.current, s = Ta(), f = Wo(u);
      En(f);
      var p = nw(a);
      t.context === null ? t.context = p : t.pendingContext = p, mi && or !== null && !xE && (xE = !0, g(`Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.

Check the render method of %s.`, it(or) || "Unknown"));
      var v = Bu(s, f);
      v.payload = {
        element: e
      }, i = i === void 0 ? null : i, i !== null && (typeof i != "function" && g("render(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", i), v.callback = i);
      var S = Fo(u, v, f);
      return S !== null && (Er(S, u, f, s), vm(S, u, f)), f;
    }
    function ry(e) {
      var t = e.current;
      if (!t.child)
        return null;
      switch (t.child.tag) {
        case le:
          return t.child.stateNode;
        default:
          return t.child.stateNode;
      }
    }
    function RD(e) {
      switch (e.tag) {
        case V: {
          var t = e.stateNode;
          if (cf(t)) {
            var a = Zv(t);
            L_(t, a);
          }
          break;
        }
        case ge: {
          Wu(function() {
            var u = Ba(e, Ze);
            if (u !== null) {
              var s = Ta();
              Er(u, e, Ze, s);
            }
          });
          var i = Ze;
          DE(e, i);
          break;
        }
      }
    }
    function iw(e, t) {
      var a = e.memoizedState;
      a !== null && a.dehydrated !== null && (a.retryLane = ah(a.retryLane, t));
    }
    function DE(e, t) {
      iw(e, t);
      var a = e.alternate;
      a && iw(a, t);
    }
    function wD(e) {
      if (e.tag === ge) {
        var t = xs, a = Ba(e, t);
        if (a !== null) {
          var i = Ta();
          Er(a, e, t, i);
        }
        DE(e, t);
      }
    }
    function TD(e) {
      if (e.tag === ge) {
        var t = Wo(e), a = Ba(e, t);
        if (a !== null) {
          var i = Ta();
          Er(a, e, t, i);
        }
        DE(e, t);
      }
    }
    function lw(e) {
      var t = vn(e);
      return t === null ? null : t.stateNode;
    }
    var uw = function(e) {
      return null;
    };
    function bD(e) {
      return uw(e);
    }
    var ow = function(e) {
      return !1;
    };
    function xD(e) {
      return ow(e);
    }
    var sw = null, cw = null, fw = null, dw = null, pw = null, vw = null, hw = null, mw = null, yw = null;
    {
      var gw = function(e, t, a) {
        var i = t[a], u = pt(e) ? e.slice() : mt({}, e);
        return a + 1 === t.length ? (pt(u) ? u.splice(i, 1) : delete u[i], u) : (u[i] = gw(e[i], t, a + 1), u);
      }, Sw = function(e, t) {
        return gw(e, t, 0);
      }, Ew = function(e, t, a, i) {
        var u = t[i], s = pt(e) ? e.slice() : mt({}, e);
        if (i + 1 === t.length) {
          var f = a[i];
          s[f] = s[u], pt(s) ? s.splice(u, 1) : delete s[u];
        } else
          s[u] = Ew(
            // $FlowFixMe number or string is fine here
            e[u],
            t,
            a,
            i + 1
          );
        return s;
      }, Cw = function(e, t, a) {
        if (t.length !== a.length) {
          A("copyWithRename() expects paths of the same length");
          return;
        } else
          for (var i = 0; i < a.length - 1; i++)
            if (t[i] !== a[i]) {
              A("copyWithRename() expects paths to be the same except for the deepest key");
              return;
            }
        return Ew(e, t, a, 0);
      }, Rw = function(e, t, a, i) {
        if (a >= t.length)
          return i;
        var u = t[a], s = pt(e) ? e.slice() : mt({}, e);
        return s[u] = Rw(e[u], t, a + 1, i), s;
      }, ww = function(e, t, a) {
        return Rw(e, t, 0, a);
      }, NE = function(e, t) {
        for (var a = e.memoizedState; a !== null && t > 0; )
          a = a.next, t--;
        return a;
      };
      sw = function(e, t, a, i) {
        var u = NE(e, t);
        if (u !== null) {
          var s = ww(u.memoizedState, a, i);
          u.memoizedState = s, u.baseState = s, e.memoizedProps = mt({}, e.memoizedProps);
          var f = Ba(e, Ze);
          f !== null && Er(f, e, Ze, nn);
        }
      }, cw = function(e, t, a) {
        var i = NE(e, t);
        if (i !== null) {
          var u = Sw(i.memoizedState, a);
          i.memoizedState = u, i.baseState = u, e.memoizedProps = mt({}, e.memoizedProps);
          var s = Ba(e, Ze);
          s !== null && Er(s, e, Ze, nn);
        }
      }, fw = function(e, t, a, i) {
        var u = NE(e, t);
        if (u !== null) {
          var s = Cw(u.memoizedState, a, i);
          u.memoizedState = s, u.baseState = s, e.memoizedProps = mt({}, e.memoizedProps);
          var f = Ba(e, Ze);
          f !== null && Er(f, e, Ze, nn);
        }
      }, dw = function(e, t, a) {
        e.pendingProps = ww(e.memoizedProps, t, a), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var i = Ba(e, Ze);
        i !== null && Er(i, e, Ze, nn);
      }, pw = function(e, t) {
        e.pendingProps = Sw(e.memoizedProps, t), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var a = Ba(e, Ze);
        a !== null && Er(a, e, Ze, nn);
      }, vw = function(e, t, a) {
        e.pendingProps = Cw(e.memoizedProps, t, a), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var i = Ba(e, Ze);
        i !== null && Er(i, e, Ze, nn);
      }, hw = function(e) {
        var t = Ba(e, Ze);
        t !== null && Er(t, e, Ze, nn);
      }, mw = function(e) {
        uw = e;
      }, yw = function(e) {
        ow = e;
      };
    }
    function _D(e) {
      var t = ea(e);
      return t === null ? null : t.stateNode;
    }
    function DD(e) {
      return null;
    }
    function ND() {
      return or;
    }
    function kD(e) {
      var t = e.findFiberByHostInstance, a = E.ReactCurrentDispatcher;
      return Eo({
        bundleType: e.bundleType,
        version: e.version,
        rendererPackageName: e.rendererPackageName,
        rendererConfig: e.rendererConfig,
        overrideHookState: sw,
        overrideHookStateDeletePath: cw,
        overrideHookStateRenamePath: fw,
        overrideProps: dw,
        overridePropsDeletePath: pw,
        overridePropsRenamePath: vw,
        setErrorHandler: mw,
        setSuspenseHandler: yw,
        scheduleUpdate: hw,
        currentDispatcherRef: a,
        findHostInstanceByFiber: _D,
        findFiberByHostInstance: t || DD,
        // React Refresh
        findHostInstancesForRefresh: lD,
        scheduleRefresh: aD,
        scheduleRoot: iD,
        setRefreshHandler: rD,
        // Enables DevTools to append owner stacks to error messages in DEV mode.
        getCurrentFiber: ND,
        // Enables DevTools to detect reconciler version rather than renderer version
        // which may not match for third party renderers.
        reconcilerVersion: bE
      });
    }
    var Tw = typeof reportError == "function" ? (
      // In modern browsers, reportError will dispatch an error event,
      // emulating an uncaught JavaScript error.
      reportError
    ) : function(e) {
      console.error(e);
    };
    function kE(e) {
      this._internalRoot = e;
    }
    ay.prototype.render = kE.prototype.render = function(e) {
      var t = this._internalRoot;
      if (t === null)
        throw new Error("Cannot update an unmounted root.");
      {
        typeof arguments[1] == "function" ? g("render(...): does not support the second callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().") : iy(arguments[1]) ? g("You passed a container to the second argument of root.render(...). You don't need to pass it again since you already passed it to create the root.") : typeof arguments[1] < "u" && g("You passed a second argument to root.render(...) but it only accepts one argument.");
        var a = t.containerInfo;
        if (a.nodeType !== Un) {
          var i = lw(t.current);
          i && i.parentNode !== a && g("render(...): It looks like the React-rendered content of the root container was removed without using React. This is not supported and will cause errors. Instead, call root.unmount() to empty a root's container.");
        }
      }
      iv(e, t, null, null);
    }, ay.prototype.unmount = kE.prototype.unmount = function() {
      typeof arguments[0] == "function" && g("unmount(...): does not support a callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().");
      var e = this._internalRoot;
      if (e !== null) {
        this._internalRoot = null;
        var t = e.containerInfo;
        AR() && g("Attempted to synchronously unmount a root while React was already rendering. React cannot finish unmounting the root until the current render has completed, which may lead to a race condition."), Wu(function() {
          iv(null, e, null, null);
        }), TC(t);
      }
    };
    function OD(e, t) {
      if (!iy(e))
        throw new Error("createRoot(...): Target container is not a DOM element.");
      bw(e);
      var a = !1, i = !1, u = "", s = Tw;
      t != null && (t.hydrate ? A("hydrate through createRoot is deprecated. Use ReactDOMClient.hydrateRoot(container, <App />) instead.") : typeof t == "object" && t !== null && t.$$typeof === Kr && g(`You passed a JSX element to createRoot. You probably meant to call root.render instead. Example usage:

  let root = createRoot(domContainer);
  root.render(<App />);`), t.unstable_strictMode === !0 && (a = !0), t.identifierPrefix !== void 0 && (u = t.identifierPrefix), t.onRecoverableError !== void 0 && (s = t.onRecoverableError), t.transitionCallbacks !== void 0 && t.transitionCallbacks);
      var f = rw(e, Zh, null, a, i, u, s);
      Wh(f.current, e);
      var p = e.nodeType === Un ? e.parentNode : e;
      return fp(p), new kE(f);
    }
    function ay(e) {
      this._internalRoot = e;
    }
    function LD(e) {
      e && vh(e);
    }
    ay.prototype.unstable_scheduleHydration = LD;
    function MD(e, t, a) {
      if (!iy(e))
        throw new Error("hydrateRoot(...): Target container is not a DOM element.");
      bw(e), t === void 0 && g("Must provide initial children as second argument to hydrateRoot. Example usage: hydrateRoot(domContainer, <App />)");
      var i = a ?? null, u = a != null && a.hydratedSources || null, s = !1, f = !1, p = "", v = Tw;
      a != null && (a.unstable_strictMode === !0 && (s = !0), a.identifierPrefix !== void 0 && (p = a.identifierPrefix), a.onRecoverableError !== void 0 && (v = a.onRecoverableError));
      var S = aw(t, null, e, Zh, i, s, f, p, v);
      if (Wh(S.current, e), fp(e), u)
        for (var R = 0; R < u.length; R++) {
          var O = u[R];
          jx(S, O);
        }
      return new ay(S);
    }
    function iy(e) {
      return !!(e && (e.nodeType === Xr || e.nodeType === Wi || e.nodeType === pd));
    }
    function lv(e) {
      return !!(e && (e.nodeType === Xr || e.nodeType === Wi || e.nodeType === pd || e.nodeType === Un && e.nodeValue === " react-mount-point-unstable "));
    }
    function bw(e) {
      e.nodeType === Xr && e.tagName && e.tagName.toUpperCase() === "BODY" && g("createRoot(): Creating roots directly with document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try using a container element created for your app."), Rp(e) && (e._reactRootContainer ? g("You are calling ReactDOMClient.createRoot() on a container that was previously passed to ReactDOM.render(). This is not supported.") : g("You are calling ReactDOMClient.createRoot() on a container that has already been passed to createRoot() before. Instead, call root.render() on the existing root instead if you want to update it."));
    }
    var UD = E.ReactCurrentOwner, xw;
    xw = function(e) {
      if (e._reactRootContainer && e.nodeType !== Un) {
        var t = lw(e._reactRootContainer.current);
        t && t.parentNode !== e && g("render(...): It looks like the React-rendered content of this container was removed without using React. This is not supported and will cause errors. Instead, call ReactDOM.unmountComponentAtNode to empty a container.");
      }
      var a = !!e._reactRootContainer, i = OE(e), u = !!(i && Mo(i));
      u && !a && g("render(...): Replacing React-rendered children with a new root component. If you intended to update the children of this node, you should instead have the existing children update their state and render the new components instead of calling ReactDOM.render."), e.nodeType === Xr && e.tagName && e.tagName.toUpperCase() === "BODY" && g("render(): Rendering components directly into document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try rendering into a container element created for your app.");
    };
    function OE(e) {
      return e ? e.nodeType === Wi ? e.documentElement : e.firstChild : null;
    }
    function _w() {
    }
    function zD(e, t, a, i, u) {
      if (u) {
        if (typeof i == "function") {
          var s = i;
          i = function() {
            var D = ry(f);
            s.call(D);
          };
        }
        var f = aw(
          t,
          i,
          e,
          zo,
          null,
          // hydrationCallbacks
          !1,
          // isStrictMode
          !1,
          // concurrentUpdatesByDefaultOverride,
          "",
          // identifierPrefix
          _w
        );
        e._reactRootContainer = f, Wh(f.current, e);
        var p = e.nodeType === Un ? e.parentNode : e;
        return fp(p), Wu(), f;
      } else {
        for (var v; v = e.lastChild; )
          e.removeChild(v);
        if (typeof i == "function") {
          var S = i;
          i = function() {
            var D = ry(R);
            S.call(D);
          };
        }
        var R = rw(
          e,
          zo,
          null,
          // hydrationCallbacks
          !1,
          // isStrictMode
          !1,
          // concurrentUpdatesByDefaultOverride,
          "",
          // identifierPrefix
          _w
        );
        e._reactRootContainer = R, Wh(R.current, e);
        var O = e.nodeType === Un ? e.parentNode : e;
        return fp(O), Wu(function() {
          iv(t, R, a, i);
        }), R;
      }
    }
    function AD(e, t) {
      e !== null && typeof e != "function" && g("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t, e);
    }
    function ly(e, t, a, i, u) {
      xw(a), AD(u === void 0 ? null : u, "render");
      var s = a._reactRootContainer, f;
      if (!s)
        f = zD(a, t, e, u, i);
      else {
        if (f = s, typeof u == "function") {
          var p = u;
          u = function() {
            var v = ry(f);
            p.call(v);
          };
        }
        iv(t, f, e, u);
      }
      return ry(f);
    }
    var Dw = !1;
    function jD(e) {
      {
        Dw || (Dw = !0, g("findDOMNode is deprecated and will be removed in the next major release. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node"));
        var t = UD.current;
        if (t !== null && t.stateNode !== null) {
          var a = t.stateNode._warnedAboutRefsInRender;
          a || g("%s is accessing findDOMNode inside its render(). render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", Lt(t.type) || "A component"), t.stateNode._warnedAboutRefsInRender = !0;
        }
      }
      return e == null ? null : e.nodeType === Xr ? e : CD(e, "findDOMNode");
    }
    function FD(e, t, a) {
      if (g("ReactDOM.hydrate is no longer supported in React 18. Use hydrateRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !lv(t))
        throw new Error("Target container is not a DOM element.");
      {
        var i = Rp(t) && t._reactRootContainer === void 0;
        i && g("You are calling ReactDOM.hydrate() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call hydrateRoot(container, element)?");
      }
      return ly(null, e, t, !0, a);
    }
    function VD(e, t, a) {
      if (g("ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !lv(t))
        throw new Error("Target container is not a DOM element.");
      {
        var i = Rp(t) && t._reactRootContainer === void 0;
        i && g("You are calling ReactDOM.render() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.render(element)?");
      }
      return ly(null, e, t, !1, a);
    }
    function PD(e, t, a, i) {
      if (g("ReactDOM.unstable_renderSubtreeIntoContainer() is no longer supported in React 18. Consider using a portal instead. Until you switch to the createRoot API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !lv(a))
        throw new Error("Target container is not a DOM element.");
      if (e == null || !Dy(e))
        throw new Error("parentComponent must be a valid React Component");
      return ly(e, t, a, !1, i);
    }
    var Nw = !1;
    function HD(e) {
      if (Nw || (Nw = !0, g("unmountComponentAtNode is deprecated and will be removed in the next major release. Switch to the createRoot API. Learn more: https://reactjs.org/link/switch-to-createroot")), !lv(e))
        throw new Error("unmountComponentAtNode(...): Target container is not a DOM element.");
      {
        var t = Rp(e) && e._reactRootContainer === void 0;
        t && g("You are calling ReactDOM.unmountComponentAtNode() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.unmount()?");
      }
      if (e._reactRootContainer) {
        {
          var a = OE(e), i = a && !Mo(a);
          i && g("unmountComponentAtNode(): The node you're attempting to unmount was rendered by another copy of React.");
        }
        return Wu(function() {
          ly(null, null, e, !1, function() {
            e._reactRootContainer = null, TC(e);
          });
        }), !0;
      } else {
        {
          var u = OE(e), s = !!(u && Mo(u)), f = e.nodeType === Xr && lv(e.parentNode) && !!e.parentNode._reactRootContainer;
          s && g("unmountComponentAtNode(): The node you're attempting to unmount was rendered by React and is not a top-level container. %s", f ? "You may have accidentally passed in a React root node instead of its container." : "Instead, have the parent component update its state and rerender in order to remove this component.");
        }
        return !1;
      }
    }
    Dr(RD), To(wD), ch(TD), js(Va), Gd(uh), (typeof Map != "function" || // $FlowIssue Flow incorrectly thinks Map has no prototype
    Map.prototype == null || typeof Map.prototype.forEach != "function" || typeof Set != "function" || // $FlowIssue Flow incorrectly thinks Set has no prototype
    Set.prototype == null || typeof Set.prototype.clear != "function" || typeof Set.prototype.forEach != "function") && g("React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"), xc(IT), _y(oE, M_, Wu);
    function BD(e, t) {
      var a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
      if (!iy(t))
        throw new Error("Target container is not a DOM element.");
      return ED(e, t, null, a);
    }
    function ID(e, t, a, i) {
      return PD(e, t, a, i);
    }
    var LE = {
      usingClientEntryPoint: !1,
      // Keep in sync with ReactTestUtils.js.
      // This is an array for better minification.
      Events: [Mo, Nf, Qh, po, _c, oE]
    };
    function $D(e, t) {
      return LE.usingClientEntryPoint || g('You are importing createRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), OD(e, t);
    }
    function YD(e, t, a) {
      return LE.usingClientEntryPoint || g('You are importing hydrateRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), MD(e, t, a);
    }
    function WD(e) {
      return AR() && g("flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task."), Wu(e);
    }
    var QD = kD({
      findFiberByHostInstance: Xs,
      bundleType: 1,
      version: bE,
      rendererPackageName: "react-dom"
    });
    if (!QD && On && window.top === window.self && (navigator.userAgent.indexOf("Chrome") > -1 && navigator.userAgent.indexOf("Edge") === -1 || navigator.userAgent.indexOf("Firefox") > -1)) {
      var kw = window.location.protocol;
      /^(https?|file):$/.test(kw) && console.info("%cDownload the React DevTools for a better development experience: https://reactjs.org/link/react-devtools" + (kw === "file:" ? `
You might need to use a local HTTP server (instead of file://): https://reactjs.org/link/react-devtools-faq` : ""), "font-weight:bold");
    }
    Qa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = LE, Qa.createPortal = BD, Qa.createRoot = $D, Qa.findDOMNode = jD, Qa.flushSync = WD, Qa.hydrate = FD, Qa.hydrateRoot = YD, Qa.render = VD, Qa.unmountComponentAtNode = HD, Qa.unstable_batchedUpdates = oE, Qa.unstable_renderSubtreeIntoContainer = ID, Qa.version = bE, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  }()), Qa;
}
function Jw() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) {
    if (process.env.NODE_ENV !== "production")
      throw new Error("^_^");
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(Jw);
    } catch (m) {
      console.error(m);
    }
  }
}
process.env.NODE_ENV === "production" ? (Jw(), VE.exports = lN()) : VE.exports = uN();
var oN = VE.exports, PE, cy = oN;
if (process.env.NODE_ENV === "production")
  PE = cy.createRoot, cy.hydrateRoot;
else {
  var Pw = cy.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  PE = function(m, C) {
    Pw.usingClientEntryPoint = !0;
    try {
      return cy.createRoot(m, C);
    } finally {
      Pw.usingClientEntryPoint = !1;
    }
  };
}
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
function sv() {
  return sv = Object.assign ? Object.assign.bind() : function(m) {
    for (var C = 1; C < arguments.length; C++) {
      var E = arguments[C];
      for (var x in E)
        Object.prototype.hasOwnProperty.call(E, x) && (m[x] = E[x]);
    }
    return m;
  }, sv.apply(this, arguments);
}
var Ko;
(function(m) {
  m.Pop = "POP", m.Push = "PUSH", m.Replace = "REPLACE";
})(Ko || (Ko = {}));
const Hw = "popstate";
function sN(m) {
  m === void 0 && (m = {});
  function C(x, N) {
    let {
      pathname: A,
      search: g,
      hash: q
    } = x.location;
    return HE(
      "",
      {
        pathname: A,
        search: g,
        hash: q
      },
      // state defaults to `null` because `window.history.state` does
      N.state && N.state.usr || null,
      N.state && N.state.key || "default"
    );
  }
  function E(x, N) {
    return typeof N == "string" ? N : cv(N);
  }
  return fN(C, E, null, m);
}
function gt(m, C) {
  if (m === !1 || m === null || typeof m > "u")
    throw new Error(C);
}
function vl(m, C) {
  if (!m) {
    typeof console < "u" && console.warn(C);
    try {
      throw new Error(C);
    } catch {
    }
  }
}
function cN() {
  return Math.random().toString(36).substr(2, 8);
}
function Bw(m, C) {
  return {
    usr: m.state,
    key: m.key,
    idx: C
  };
}
function HE(m, C, E, x) {
  return E === void 0 && (E = null), sv({
    pathname: typeof m == "string" ? m : m.pathname,
    search: "",
    hash: ""
  }, typeof C == "string" ? td(C) : C, {
    state: E,
    // TODO: This could be cleaned up.  push/replace should probably just take
    // full Locations now and avoid the need to run through this flow at all
    // But that's a pretty big refactor to the current test suite so going to
    // keep as is for the time being and just let any incoming keys take precedence
    key: C && C.key || x || cN()
  });
}
function cv(m) {
  let {
    pathname: C = "/",
    search: E = "",
    hash: x = ""
  } = m;
  return E && E !== "?" && (C += E.charAt(0) === "?" ? E : "?" + E), x && x !== "#" && (C += x.charAt(0) === "#" ? x : "#" + x), C;
}
function td(m) {
  let C = {};
  if (m) {
    let E = m.indexOf("#");
    E >= 0 && (C.hash = m.substr(E), m = m.substr(0, E));
    let x = m.indexOf("?");
    x >= 0 && (C.search = m.substr(x), m = m.substr(0, x)), m && (C.pathname = m);
  }
  return C;
}
function fN(m, C, E, x) {
  x === void 0 && (x = {});
  let {
    window: N = document.defaultView,
    v5Compat: A = !1
  } = x, g = N.history, q = Ko.Pop, P = null, F = ie();
  F == null && (F = 0, g.replaceState(sv({}, g.state, {
    idx: F
  }), ""));
  function ie() {
    return (g.state || {
      idx: null
    }).idx;
  }
  function V() {
    q = Ko.Pop;
    let fe = ie(), He = fe == null ? null : fe - F;
    F = fe, P && P({
      action: q,
      location: be.location,
      delta: He
    });
  }
  function X(fe, He) {
    q = Ko.Push;
    let ue = HE(be.location, fe, He);
    F = ie() + 1;
    let ae = Bw(ue, F), he = be.createHref(ue);
    try {
      g.pushState(ae, "", he);
    } catch (ge) {
      if (ge instanceof DOMException && ge.name === "DataCloneError")
        throw ge;
      N.location.assign(he);
    }
    A && P && P({
      action: q,
      location: be.location,
      delta: 1
    });
  }
  function le(fe, He) {
    q = Ko.Replace;
    let ue = HE(be.location, fe, He);
    F = ie();
    let ae = Bw(ue, F), he = be.createHref(ue);
    g.replaceState(ae, "", he), A && P && P({
      action: q,
      location: be.location,
      delta: 0
    });
  }
  function ve(fe) {
    let He = N.location.origin !== "null" ? N.location.origin : N.location.href, ue = typeof fe == "string" ? fe : cv(fe);
    return ue = ue.replace(/ $/, "%20"), gt(He, "No window.location.(origin|href) available to create URL for href: " + ue), new URL(ue, He);
  }
  let be = {
    get action() {
      return q;
    },
    get location() {
      return m(N, g);
    },
    listen(fe) {
      if (P)
        throw new Error("A history only accepts one active listener");
      return N.addEventListener(Hw, V), P = fe, () => {
        N.removeEventListener(Hw, V), P = null;
      };
    },
    createHref(fe) {
      return C(N, fe);
    },
    createURL: ve,
    encodeLocation(fe) {
      let He = ve(fe);
      return {
        pathname: He.pathname,
        search: He.search,
        hash: He.hash
      };
    },
    push: X,
    replace: le,
    go(fe) {
      return g.go(fe);
    }
  };
  return be;
}
var Iw;
(function(m) {
  m.data = "data", m.deferred = "deferred", m.redirect = "redirect", m.error = "error";
})(Iw || (Iw = {}));
function dN(m, C, E) {
  return E === void 0 && (E = "/"), pN(m, C, E);
}
function pN(m, C, E, x) {
  let N = typeof C == "string" ? td(C) : C, A = qo(N.pathname || "/", E);
  if (A == null)
    return null;
  let g = Zw(m);
  vN(g);
  let q = null;
  for (let P = 0; q == null && P < g.length; ++P) {
    let F = bN(A);
    q = wN(g[P], F);
  }
  return q;
}
function Zw(m, C, E, x) {
  C === void 0 && (C = []), E === void 0 && (E = []), x === void 0 && (x = "");
  let N = (A, g, q) => {
    let P = {
      relativePath: q === void 0 ? A.path || "" : q,
      caseSensitive: A.caseSensitive === !0,
      childrenIndex: g,
      route: A
    };
    P.relativePath.startsWith("/") && (gt(P.relativePath.startsWith(x), 'Absolute route path "' + P.relativePath + '" nested under path ' + ('"' + x + '" is not valid. An absolute child route path ') + "must start with the combined path of all its parent routes."), P.relativePath = P.relativePath.slice(x.length));
    let F = Ku([x, P.relativePath]), ie = E.concat(P);
    A.children && A.children.length > 0 && (gt(
      // Our types know better, but runtime JS may not!
      // @ts-expect-error
      A.index !== !0,
      "Index routes must not have child routes. Please remove " + ('all child routes from route path "' + F + '".')
    ), Zw(A.children, C, ie, F)), !(A.path == null && !A.index) && C.push({
      path: F,
      score: CN(F, A.index),
      routesMeta: ie
    });
  };
  return m.forEach((A, g) => {
    var q;
    if (A.path === "" || !((q = A.path) != null && q.includes("?")))
      N(A, g);
    else
      for (let P of eT(A.path))
        N(A, g, P);
  }), C;
}
function eT(m) {
  let C = m.split("/");
  if (C.length === 0) return [];
  let [E, ...x] = C, N = E.endsWith("?"), A = E.replace(/\?$/, "");
  if (x.length === 0)
    return N ? [A, ""] : [A];
  let g = eT(x.join("/")), q = [];
  return q.push(...g.map((P) => P === "" ? A : [A, P].join("/"))), N && q.push(...g), q.map((P) => m.startsWith("/") && P === "" ? "/" : P);
}
function vN(m) {
  m.sort((C, E) => C.score !== E.score ? E.score - C.score : RN(C.routesMeta.map((x) => x.childrenIndex), E.routesMeta.map((x) => x.childrenIndex)));
}
const hN = /^:[\w-]+$/, mN = 3, yN = 2, gN = 1, SN = 10, EN = -2, $w = (m) => m === "*";
function CN(m, C) {
  let E = m.split("/"), x = E.length;
  return E.some($w) && (x += EN), C && (x += yN), E.filter((N) => !$w(N)).reduce((N, A) => N + (hN.test(A) ? mN : A === "" ? gN : SN), x);
}
function RN(m, C) {
  return m.length === C.length && m.slice(0, -1).every((x, N) => x === C[N]) ? (
    // If two routes are siblings, we should try to match the earlier sibling
    // first. This allows people to have fine-grained control over the matching
    // behavior by simply putting routes with identical paths in the order they
    // want them tried.
    m[m.length - 1] - C[C.length - 1]
  ) : (
    // Otherwise, it doesn't really make sense to rank non-siblings by index,
    // so they sort equally.
    0
  );
}
function wN(m, C, E) {
  let {
    routesMeta: x
  } = m, N = {}, A = "/", g = [];
  for (let q = 0; q < x.length; ++q) {
    let P = x[q], F = q === x.length - 1, ie = A === "/" ? C : C.slice(A.length) || "/", V = BE({
      path: P.relativePath,
      caseSensitive: P.caseSensitive,
      end: F
    }, ie), X = P.route;
    if (!V)
      return null;
    Object.assign(N, V.params), g.push({
      // TODO: Can this as be avoided?
      params: N,
      pathname: Ku([A, V.pathname]),
      pathnameBase: NN(Ku([A, V.pathnameBase])),
      route: X
    }), V.pathnameBase !== "/" && (A = Ku([A, V.pathnameBase]));
  }
  return g;
}
function BE(m, C) {
  typeof m == "string" && (m = {
    path: m,
    caseSensitive: !1,
    end: !0
  });
  let [E, x] = TN(m.path, m.caseSensitive, m.end), N = C.match(E);
  if (!N) return null;
  let A = N[0], g = A.replace(/(.)\/+$/, "$1"), q = N.slice(1);
  return {
    params: x.reduce((F, ie, V) => {
      let {
        paramName: X,
        isOptional: le
      } = ie;
      if (X === "*") {
        let be = q[V] || "";
        g = A.slice(0, A.length - be.length).replace(/(.)\/+$/, "$1");
      }
      const ve = q[V];
      return le && !ve ? F[X] = void 0 : F[X] = (ve || "").replace(/%2F/g, "/"), F;
    }, {}),
    pathname: A,
    pathnameBase: g,
    pattern: m
  };
}
function TN(m, C, E) {
  C === void 0 && (C = !1), E === void 0 && (E = !0), vl(m === "*" || !m.endsWith("*") || m.endsWith("/*"), 'Route path "' + m + '" will be treated as if it were ' + ('"' + m.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + m.replace(/\*$/, "/*") + '".'));
  let x = [], N = "^" + m.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(/\/:([\w-]+)(\?)?/g, (g, q, P) => (x.push({
    paramName: q,
    isOptional: P != null
  }), P ? "/?([^\\/]+)?" : "/([^\\/]+)"));
  return m.endsWith("*") ? (x.push({
    paramName: "*"
  }), N += m === "*" || m === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : E ? N += "\\/*$" : m !== "" && m !== "/" && (N += "(?:(?=\\/|$))"), [new RegExp(N, C ? void 0 : "i"), x];
}
function bN(m) {
  try {
    return m.split("/").map((C) => decodeURIComponent(C).replace(/\//g, "%2F")).join("/");
  } catch (C) {
    return vl(!1, 'The URL path "' + m + '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' + ("encoding (" + C + ").")), m;
  }
}
function qo(m, C) {
  if (C === "/") return m;
  if (!m.toLowerCase().startsWith(C.toLowerCase()))
    return null;
  let E = C.endsWith("/") ? C.length - 1 : C.length, x = m.charAt(E);
  return x && x !== "/" ? null : m.slice(E) || "/";
}
function xN(m, C) {
  C === void 0 && (C = "/");
  let {
    pathname: E,
    search: x = "",
    hash: N = ""
  } = typeof m == "string" ? td(m) : m;
  return {
    pathname: E ? E.startsWith("/") ? E : _N(E, C) : C,
    search: kN(x),
    hash: ON(N)
  };
}
function _N(m, C) {
  let E = C.replace(/\/+$/, "").split("/");
  return m.split("/").forEach((N) => {
    N === ".." ? E.length > 1 && E.pop() : N !== "." && E.push(N);
  }), E.length > 1 ? E.join("/") : "/";
}
function zE(m, C, E, x) {
  return "Cannot include a '" + m + "' character in a manually specified " + ("`to." + C + "` field [" + JSON.stringify(x) + "].  Please separate it out to the ") + ("`to." + E + "` field. Alternatively you may provide the full path as ") + 'a string in <Link to="..."> and the router will parse it for you.';
}
function DN(m) {
  return m.filter((C, E) => E === 0 || C.route.path && C.route.path.length > 0);
}
function $E(m, C) {
  let E = DN(m);
  return C ? E.map((x, N) => N === E.length - 1 ? x.pathname : x.pathnameBase) : E.map((x) => x.pathnameBase);
}
function YE(m, C, E, x) {
  x === void 0 && (x = !1);
  let N;
  typeof m == "string" ? N = td(m) : (N = sv({}, m), gt(!N.pathname || !N.pathname.includes("?"), zE("?", "pathname", "search", N)), gt(!N.pathname || !N.pathname.includes("#"), zE("#", "pathname", "hash", N)), gt(!N.search || !N.search.includes("#"), zE("#", "search", "hash", N)));
  let A = m === "" || N.pathname === "", g = A ? "/" : N.pathname, q;
  if (g == null)
    q = E;
  else {
    let V = C.length - 1;
    if (!x && g.startsWith("..")) {
      let X = g.split("/");
      for (; X[0] === ".."; )
        X.shift(), V -= 1;
      N.pathname = X.join("/");
    }
    q = V >= 0 ? C[V] : "/";
  }
  let P = xN(N, q), F = g && g !== "/" && g.endsWith("/"), ie = (A || g === ".") && E.endsWith("/");
  return !P.pathname.endsWith("/") && (F || ie) && (P.pathname += "/"), P;
}
const Ku = (m) => m.join("/").replace(/\/\/+/g, "/"), NN = (m) => m.replace(/\/+$/, "").replace(/^\/*/, "/"), kN = (m) => !m || m === "?" ? "" : m.startsWith("?") ? m : "?" + m, ON = (m) => !m || m === "#" ? "" : m.startsWith("#") ? m : "#" + m;
function LN(m) {
  return m != null && typeof m.status == "number" && typeof m.statusText == "string" && typeof m.internal == "boolean" && "data" in m;
}
const tT = ["post", "put", "patch", "delete"];
new Set(tT);
const MN = ["get", ...tT];
new Set(MN);
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
function fv() {
  return fv = Object.assign ? Object.assign.bind() : function(m) {
    for (var C = 1; C < arguments.length; C++) {
      var E = arguments[C];
      for (var x in E)
        Object.prototype.hasOwnProperty.call(E, x) && (m[x] = E[x]);
    }
    return m;
  }, fv.apply(this, arguments);
}
const pv = /* @__PURE__ */ J.createContext(null);
process.env.NODE_ENV !== "production" && (pv.displayName = "DataRouter");
const WE = /* @__PURE__ */ J.createContext(null);
process.env.NODE_ENV !== "production" && (WE.displayName = "DataRouterState");
const UN = /* @__PURE__ */ J.createContext(null);
process.env.NODE_ENV !== "production" && (UN.displayName = "Await");
const Vi = /* @__PURE__ */ J.createContext(null);
process.env.NODE_ENV !== "production" && (Vi.displayName = "Navigation");
const vv = /* @__PURE__ */ J.createContext(null);
process.env.NODE_ENV !== "production" && (vv.displayName = "Location");
const nu = /* @__PURE__ */ J.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
process.env.NODE_ENV !== "production" && (nu.displayName = "Route");
const QE = /* @__PURE__ */ J.createContext(null);
process.env.NODE_ENV !== "production" && (QE.displayName = "RouteError");
function zN(m, C) {
  let {
    relative: E
  } = C === void 0 ? {} : C;
  nd() || (process.env.NODE_ENV !== "production" ? gt(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  ) : gt(!1));
  let {
    basename: x,
    navigator: N
  } = J.useContext(Vi), {
    hash: A,
    pathname: g,
    search: q
  } = hv(m, {
    relative: E
  }), P = g;
  return x !== "/" && (P = g === "/" ? x : Ku([x, g])), N.createHref({
    pathname: P,
    search: q,
    hash: A
  });
}
function nd() {
  return J.useContext(vv) != null;
}
function pc() {
  return nd() || (process.env.NODE_ENV !== "production" ? gt(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ) : gt(!1)), J.useContext(vv).location;
}
const nT = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function rT(m) {
  J.useContext(Vi).static || J.useLayoutEffect(m);
}
function aT() {
  let {
    isDataRoute: m
  } = J.useContext(nu);
  return m ? KN() : AN();
}
function AN() {
  nd() || (process.env.NODE_ENV !== "production" ? gt(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  ) : gt(!1));
  let m = J.useContext(pv), {
    basename: C,
    future: E,
    navigator: x
  } = J.useContext(Vi), {
    matches: N
  } = J.useContext(nu), {
    pathname: A
  } = pc(), g = JSON.stringify($E(N, E.v7_relativeSplatPath)), q = J.useRef(!1);
  return rT(() => {
    q.current = !0;
  }), J.useCallback(function(F, ie) {
    if (ie === void 0 && (ie = {}), process.env.NODE_ENV !== "production" && vl(q.current, nT), !q.current) return;
    if (typeof F == "number") {
      x.go(F);
      return;
    }
    let V = YE(F, JSON.parse(g), A, ie.relative === "path");
    m == null && C !== "/" && (V.pathname = V.pathname === "/" ? C : Ku([C, V.pathname])), (ie.replace ? x.replace : x.push)(V, ie.state, ie);
  }, [C, x, g, A, m]);
}
function hv(m, C) {
  let {
    relative: E
  } = C === void 0 ? {} : C, {
    future: x
  } = J.useContext(Vi), {
    matches: N
  } = J.useContext(nu), {
    pathname: A
  } = pc(), g = JSON.stringify($E(N, x.v7_relativeSplatPath));
  return J.useMemo(() => YE(m, JSON.parse(g), A, E === "path"), [m, g, A, E]);
}
function jN(m, C) {
  return FN(m, C);
}
function FN(m, C, E, x) {
  nd() || (process.env.NODE_ENV !== "production" ? gt(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component."
  ) : gt(!1));
  let {
    navigator: N
  } = J.useContext(Vi), {
    matches: A
  } = J.useContext(nu), g = A[A.length - 1], q = g ? g.params : {}, P = g ? g.pathname : "/", F = g ? g.pathnameBase : "/", ie = g && g.route;
  if (process.env.NODE_ENV !== "production") {
    let ue = ie && ie.path || "";
    lT(P, !ie || ue.endsWith("*"), "You rendered descendant <Routes> (or called `useRoutes()`) at " + ('"' + P + '" (under <Route path="' + ue + '">) but the ') + `parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

` + ('Please change the parent <Route path="' + ue + '"> to <Route ') + ('path="' + (ue === "/" ? "*" : ue + "/*") + '">.'));
  }
  let V = pc(), X;
  if (C) {
    var le;
    let ue = typeof C == "string" ? td(C) : C;
    F === "/" || (le = ue.pathname) != null && le.startsWith(F) || (process.env.NODE_ENV !== "production" ? gt(!1, "When overriding the location using `<Routes location>` or `useRoutes(routes, location)`, the location pathname must begin with the portion of the URL pathname that was " + ('matched by all parent routes. The current pathname base is "' + F + '" ') + ('but pathname "' + ue.pathname + '" was given in the `location` prop.')) : gt(!1)), X = ue;
  } else
    X = V;
  let ve = X.pathname || "/", be = ve;
  if (F !== "/") {
    let ue = F.replace(/^\//, "").split("/");
    be = "/" + ve.replace(/^\//, "").split("/").slice(ue.length).join("/");
  }
  let fe = dN(m, {
    pathname: be
  });
  process.env.NODE_ENV !== "production" && (process.env.NODE_ENV !== "production" && vl(ie || fe != null, 'No routes matched location "' + X.pathname + X.search + X.hash + '" '), process.env.NODE_ENV !== "production" && vl(fe == null || fe[fe.length - 1].route.element !== void 0 || fe[fe.length - 1].route.Component !== void 0 || fe[fe.length - 1].route.lazy !== void 0, 'Matched leaf route at location "' + X.pathname + X.search + X.hash + '" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.'));
  let He = IN(fe && fe.map((ue) => Object.assign({}, ue, {
    params: Object.assign({}, q, ue.params),
    pathname: Ku([
      F,
      // Re-encode pathnames that were decoded inside matchRoutes
      N.encodeLocation ? N.encodeLocation(ue.pathname).pathname : ue.pathname
    ]),
    pathnameBase: ue.pathnameBase === "/" ? F : Ku([
      F,
      // Re-encode pathnames that were decoded inside matchRoutes
      N.encodeLocation ? N.encodeLocation(ue.pathnameBase).pathname : ue.pathnameBase
    ])
  })), A, E, x);
  return C && He ? /* @__PURE__ */ J.createElement(vv.Provider, {
    value: {
      location: fv({
        pathname: "/",
        search: "",
        hash: "",
        state: null,
        key: "default"
      }, X),
      navigationType: Ko.Pop
    }
  }, He) : He;
}
function VN() {
  let m = GN(), C = LN(m) ? m.status + " " + m.statusText : m instanceof Error ? m.message : JSON.stringify(m), E = m instanceof Error ? m.stack : null, x = "rgba(200,200,200, 0.5)", N = {
    padding: "0.5rem",
    backgroundColor: x
  }, A = {
    padding: "2px 4px",
    backgroundColor: x
  }, g = null;
  return process.env.NODE_ENV !== "production" && (console.error("Error handled by React Router default ErrorBoundary:", m), g = /* @__PURE__ */ J.createElement(J.Fragment, null, /* @__PURE__ */ J.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ J.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ J.createElement("code", {
    style: A
  }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ J.createElement("code", {
    style: A
  }, "errorElement"), " prop on your route."))), /* @__PURE__ */ J.createElement(J.Fragment, null, /* @__PURE__ */ J.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ J.createElement("h3", {
    style: {
      fontStyle: "italic"
    }
  }, C), E ? /* @__PURE__ */ J.createElement("pre", {
    style: N
  }, E) : null, g);
}
const PN = /* @__PURE__ */ J.createElement(VN, null);
class HN extends J.Component {
  constructor(C) {
    super(C), this.state = {
      location: C.location,
      revalidation: C.revalidation,
      error: C.error
    };
  }
  static getDerivedStateFromError(C) {
    return {
      error: C
    };
  }
  static getDerivedStateFromProps(C, E) {
    return E.location !== C.location || E.revalidation !== "idle" && C.revalidation === "idle" ? {
      error: C.error,
      location: C.location,
      revalidation: C.revalidation
    } : {
      error: C.error !== void 0 ? C.error : E.error,
      location: E.location,
      revalidation: C.revalidation || E.revalidation
    };
  }
  componentDidCatch(C, E) {
    console.error("React Router caught the following error during render", C, E);
  }
  render() {
    return this.state.error !== void 0 ? /* @__PURE__ */ J.createElement(nu.Provider, {
      value: this.props.routeContext
    }, /* @__PURE__ */ J.createElement(QE.Provider, {
      value: this.state.error,
      children: this.props.component
    })) : this.props.children;
  }
}
function BN(m) {
  let {
    routeContext: C,
    match: E,
    children: x
  } = m, N = J.useContext(pv);
  return N && N.static && N.staticContext && (E.route.errorElement || E.route.ErrorBoundary) && (N.staticContext._deepestRenderedBoundaryId = E.route.id), /* @__PURE__ */ J.createElement(nu.Provider, {
    value: C
  }, x);
}
function IN(m, C, E, x) {
  var N;
  if (C === void 0 && (C = []), E === void 0 && (E = null), x === void 0 && (x = null), m == null) {
    var A;
    if (!E)
      return null;
    if (E.errors)
      m = E.matches;
    else if ((A = x) != null && A.v7_partialHydration && C.length === 0 && !E.initialized && E.matches.length > 0)
      m = E.matches;
    else
      return null;
  }
  let g = m, q = (N = E) == null ? void 0 : N.errors;
  if (q != null) {
    let ie = g.findIndex((V) => V.route.id && (q == null ? void 0 : q[V.route.id]) !== void 0);
    ie >= 0 || (process.env.NODE_ENV !== "production" ? gt(!1, "Could not find a matching route for errors on route IDs: " + Object.keys(q).join(",")) : gt(!1)), g = g.slice(0, Math.min(g.length, ie + 1));
  }
  let P = !1, F = -1;
  if (E && x && x.v7_partialHydration)
    for (let ie = 0; ie < g.length; ie++) {
      let V = g[ie];
      if ((V.route.HydrateFallback || V.route.hydrateFallbackElement) && (F = ie), V.route.id) {
        let {
          loaderData: X,
          errors: le
        } = E, ve = V.route.loader && X[V.route.id] === void 0 && (!le || le[V.route.id] === void 0);
        if (V.route.lazy || ve) {
          P = !0, F >= 0 ? g = g.slice(0, F + 1) : g = [g[0]];
          break;
        }
      }
    }
  return g.reduceRight((ie, V, X) => {
    let le, ve = !1, be = null, fe = null;
    E && (le = q && V.route.id ? q[V.route.id] : void 0, be = V.route.errorElement || PN, P && (F < 0 && X === 0 ? (lT("route-fallback", !1, "No `HydrateFallback` element provided to render during initial hydration"), ve = !0, fe = null) : F === X && (ve = !0, fe = V.route.hydrateFallbackElement || null)));
    let He = C.concat(g.slice(0, X + 1)), ue = () => {
      let ae;
      return le ? ae = be : ve ? ae = fe : V.route.Component ? ae = /* @__PURE__ */ J.createElement(V.route.Component, null) : V.route.element ? ae = V.route.element : ae = ie, /* @__PURE__ */ J.createElement(BN, {
        match: V,
        routeContext: {
          outlet: ie,
          matches: He,
          isDataRoute: E != null
        },
        children: ae
      });
    };
    return E && (V.route.ErrorBoundary || V.route.errorElement || X === 0) ? /* @__PURE__ */ J.createElement(HN, {
      location: E.location,
      revalidation: E.revalidation,
      component: be,
      error: le,
      children: ue(),
      routeContext: {
        outlet: null,
        matches: He,
        isDataRoute: !0
      }
    }) : ue();
  }, null);
}
var iT = /* @__PURE__ */ function(m) {
  return m.UseBlocker = "useBlocker", m.UseRevalidator = "useRevalidator", m.UseNavigateStable = "useNavigate", m;
}(iT || {}), dv = /* @__PURE__ */ function(m) {
  return m.UseBlocker = "useBlocker", m.UseLoaderData = "useLoaderData", m.UseActionData = "useActionData", m.UseRouteError = "useRouteError", m.UseNavigation = "useNavigation", m.UseRouteLoaderData = "useRouteLoaderData", m.UseMatches = "useMatches", m.UseRevalidator = "useRevalidator", m.UseNavigateStable = "useNavigate", m.UseRouteId = "useRouteId", m;
}(dv || {});
function GE(m) {
  return m + " must be used within a data router.  See https://reactrouter.com/v6/routers/picking-a-router.";
}
function $N(m) {
  let C = J.useContext(pv);
  return C || (process.env.NODE_ENV !== "production" ? gt(!1, GE(m)) : gt(!1)), C;
}
function YN(m) {
  let C = J.useContext(WE);
  return C || (process.env.NODE_ENV !== "production" ? gt(!1, GE(m)) : gt(!1)), C;
}
function WN(m) {
  let C = J.useContext(nu);
  return C || (process.env.NODE_ENV !== "production" ? gt(!1, GE(m)) : gt(!1)), C;
}
function KE(m) {
  let C = WN(m), E = C.matches[C.matches.length - 1];
  return E.route.id || (process.env.NODE_ENV !== "production" ? gt(!1, m + ' can only be used on routes that contain a unique "id"') : gt(!1)), E.route.id;
}
function QN() {
  return KE(dv.UseRouteId);
}
function GN() {
  var m;
  let C = J.useContext(QE), E = YN(dv.UseRouteError), x = KE(dv.UseRouteError);
  return C !== void 0 ? C : (m = E.errors) == null ? void 0 : m[x];
}
function KN() {
  let {
    router: m
  } = $N(iT.UseNavigateStable), C = KE(dv.UseNavigateStable), E = J.useRef(!1);
  return rT(() => {
    E.current = !0;
  }), J.useCallback(function(N, A) {
    A === void 0 && (A = {}), process.env.NODE_ENV !== "production" && vl(E.current, nT), E.current && (typeof N == "number" ? m.navigate(N) : m.navigate(N, fv({
      fromRouteId: C
    }, A)));
  }, [m, C]);
}
const Yw = {};
function lT(m, C, E) {
  !C && !Yw[m] && (Yw[m] = !0, process.env.NODE_ENV !== "production" && vl(!1, E));
}
const Ww = {};
function qN(m, C) {
  process.env.NODE_ENV !== "production" && !Ww[C] && (Ww[C] = !0, console.warn(C));
}
const Qw = (m, C, E) => qN(m, "⚠️ React Router Future Flag Warning: " + C + ". " + ("You can use the `" + m + "` future flag to opt-in early. ") + ("For more information, see " + E + "."));
function XN(m, C) {
  (m == null ? void 0 : m.v7_startTransition) === void 0 && Qw("v7_startTransition", "React Router will begin wrapping state updates in `React.startTransition` in v7", "https://reactrouter.com/v6/upgrading/future#v7_starttransition"), (m == null ? void 0 : m.v7_relativeSplatPath) === void 0 && Qw("v7_relativeSplatPath", "Relative route resolution within Splat routes is changing in v7", "https://reactrouter.com/v6/upgrading/future#v7_relativesplatpath");
}
function JN(m) {
  let {
    to: C,
    replace: E,
    state: x,
    relative: N
  } = m;
  nd() || (process.env.NODE_ENV !== "production" ? gt(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of
    // the router loaded. We can help them understand how to avoid that.
    "<Navigate> may be used only in the context of a <Router> component."
  ) : gt(!1));
  let {
    future: A,
    static: g
  } = J.useContext(Vi);
  process.env.NODE_ENV !== "production" && vl(!g, "<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.");
  let {
    matches: q
  } = J.useContext(nu), {
    pathname: P
  } = pc(), F = aT(), ie = YE(C, $E(q, A.v7_relativeSplatPath), P, N === "path"), V = JSON.stringify(ie);
  return J.useEffect(() => F(JSON.parse(V), {
    replace: E,
    state: x,
    relative: N
  }), [F, V, N, E, x]), null;
}
function dy(m) {
  process.env.NODE_ENV !== "production" ? gt(!1, "A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.") : gt(!1);
}
function ZN(m) {
  let {
    basename: C = "/",
    children: E = null,
    location: x,
    navigationType: N = Ko.Pop,
    navigator: A,
    static: g = !1,
    future: q
  } = m;
  nd() && (process.env.NODE_ENV !== "production" ? gt(!1, "You cannot render a <Router> inside another <Router>. You should never have more than one in your app.") : gt(!1));
  let P = C.replace(/^\/*/, "/"), F = J.useMemo(() => ({
    basename: P,
    navigator: A,
    static: g,
    future: fv({
      v7_relativeSplatPath: !1
    }, q)
  }), [P, q, A, g]);
  typeof x == "string" && (x = td(x));
  let {
    pathname: ie = "/",
    search: V = "",
    hash: X = "",
    state: le = null,
    key: ve = "default"
  } = x, be = J.useMemo(() => {
    let fe = qo(ie, P);
    return fe == null ? null : {
      location: {
        pathname: fe,
        search: V,
        hash: X,
        state: le,
        key: ve
      },
      navigationType: N
    };
  }, [P, ie, V, X, le, ve, N]);
  return process.env.NODE_ENV !== "production" && vl(be != null, '<Router basename="' + P + '"> is not able to match the URL ' + ('"' + ie + V + X + '" because it does not start with the ') + "basename, so the <Router> won't render anything."), be == null ? null : /* @__PURE__ */ J.createElement(Vi.Provider, {
    value: F
  }, /* @__PURE__ */ J.createElement(vv.Provider, {
    children: E,
    value: be
  }));
}
function ek(m) {
  let {
    children: C,
    location: E
  } = m;
  return jN(IE(C), E);
}
new Promise(() => {
});
function IE(m, C) {
  C === void 0 && (C = []);
  let E = [];
  return J.Children.forEach(m, (x, N) => {
    if (!/* @__PURE__ */ J.isValidElement(x))
      return;
    let A = [...C, N];
    if (x.type === J.Fragment) {
      E.push.apply(E, IE(x.props.children, A));
      return;
    }
    x.type !== dy && (process.env.NODE_ENV !== "production" ? gt(!1, "[" + (typeof x.type == "string" ? x.type : x.type.name) + "] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>") : gt(!1)), !x.props.index || !x.props.children || (process.env.NODE_ENV !== "production" ? gt(!1, "An index route cannot have child routes.") : gt(!1));
    let g = {
      id: x.props.id || A.join("-"),
      caseSensitive: x.props.caseSensitive,
      element: x.props.element,
      Component: x.props.Component,
      index: x.props.index,
      path: x.props.path,
      loader: x.props.loader,
      action: x.props.action,
      errorElement: x.props.errorElement,
      ErrorBoundary: x.props.ErrorBoundary,
      hasErrorBoundary: x.props.ErrorBoundary != null || x.props.errorElement != null,
      shouldRevalidate: x.props.shouldRevalidate,
      handle: x.props.handle,
      lazy: x.props.lazy
    };
    x.props.children && (g.children = IE(x.props.children, A)), E.push(g);
  }), E;
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
function ed() {
  return ed = Object.assign ? Object.assign.bind() : function(m) {
    for (var C = 1; C < arguments.length; C++) {
      var E = arguments[C];
      for (var x in E)
        Object.prototype.hasOwnProperty.call(E, x) && (m[x] = E[x]);
    }
    return m;
  }, ed.apply(this, arguments);
}
function qE(m, C) {
  if (m == null) return {};
  var E = {}, x = Object.keys(m), N, A;
  for (A = 0; A < x.length; A++)
    N = x[A], !(C.indexOf(N) >= 0) && (E[N] = m[N]);
  return E;
}
const py = "get", vy = "application/x-www-form-urlencoded";
function my(m) {
  return m != null && typeof m.tagName == "string";
}
function tk(m) {
  return my(m) && m.tagName.toLowerCase() === "button";
}
function nk(m) {
  return my(m) && m.tagName.toLowerCase() === "form";
}
function rk(m) {
  return my(m) && m.tagName.toLowerCase() === "input";
}
function ak(m) {
  return !!(m.metaKey || m.altKey || m.ctrlKey || m.shiftKey);
}
function ik(m, C) {
  return m.button === 0 && // Ignore everything but left clicks
  (!C || C === "_self") && // Let browser handle "target=_blank" etc.
  !ak(m);
}
let fy = null;
function lk() {
  if (fy === null)
    try {
      new FormData(
        document.createElement("form"),
        // @ts-expect-error if FormData supports the submitter parameter, this will throw
        0
      ), fy = !1;
    } catch {
      fy = !0;
    }
  return fy;
}
const uk = /* @__PURE__ */ new Set(["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"]);
function AE(m) {
  return m != null && !uk.has(m) ? (process.env.NODE_ENV !== "production" && vl(!1, '"' + m + '" is not a valid `encType` for `<Form>`/`<fetcher.Form>` ' + ('and will default to "' + vy + '"')), null) : m;
}
function ok(m, C) {
  let E, x, N, A, g;
  if (nk(m)) {
    let q = m.getAttribute("action");
    x = q ? qo(q, C) : null, E = m.getAttribute("method") || py, N = AE(m.getAttribute("enctype")) || vy, A = new FormData(m);
  } else if (tk(m) || rk(m) && (m.type === "submit" || m.type === "image")) {
    let q = m.form;
    if (q == null)
      throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
    let P = m.getAttribute("formaction") || q.getAttribute("action");
    if (x = P ? qo(P, C) : null, E = m.getAttribute("formmethod") || q.getAttribute("method") || py, N = AE(m.getAttribute("formenctype")) || AE(q.getAttribute("enctype")) || vy, A = new FormData(q, m), !lk()) {
      let {
        name: F,
        type: ie,
        value: V
      } = m;
      if (ie === "image") {
        let X = F ? F + "." : "";
        A.append(X + "x", "0"), A.append(X + "y", "0");
      } else F && A.append(F, V);
    }
  } else {
    if (my(m))
      throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');
    E = py, x = null, N = vy, g = m;
  }
  return A && N === "text/plain" && (g = A, A = void 0), {
    action: x,
    method: E.toLowerCase(),
    encType: N,
    formData: A,
    body: g
  };
}
const sk = ["onClick", "relative", "reloadDocument", "replace", "state", "target", "to", "preventScrollReset", "viewTransition"], ck = ["aria-current", "caseSensitive", "className", "end", "style", "to", "viewTransition", "children"], fk = ["fetcherKey", "navigate", "reloadDocument", "replace", "state", "method", "action", "onSubmit", "relative", "preventScrollReset", "viewTransition"], dk = "6";
try {
  window.__reactRouterVersion = dk;
} catch {
}
const uT = /* @__PURE__ */ J.createContext({
  isTransitioning: !1
});
process.env.NODE_ENV !== "production" && (uT.displayName = "ViewTransition");
const pk = /* @__PURE__ */ J.createContext(/* @__PURE__ */ new Map());
process.env.NODE_ENV !== "production" && (pk.displayName = "Fetchers");
const vk = "startTransition", Gw = nN[vk];
function hk(m) {
  let {
    basename: C,
    children: E,
    future: x,
    window: N
  } = m, A = J.useRef();
  A.current == null && (A.current = sN({
    window: N,
    v5Compat: !0
  }));
  let g = A.current, [q, P] = J.useState({
    action: g.action,
    location: g.location
  }), {
    v7_startTransition: F
  } = x || {}, ie = J.useCallback((V) => {
    F && Gw ? Gw(() => P(V)) : P(V);
  }, [P, F]);
  return J.useLayoutEffect(() => g.listen(ie), [g, ie]), J.useEffect(() => XN(x), [x]), /* @__PURE__ */ J.createElement(ZN, {
    basename: C,
    children: E,
    location: q.location,
    navigationType: q.action,
    navigator: g,
    future: x
  });
}
process.env.NODE_ENV;
const mk = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", yk = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, oT = /* @__PURE__ */ J.forwardRef(function(C, E) {
  let {
    onClick: x,
    relative: N,
    reloadDocument: A,
    replace: g,
    state: q,
    target: P,
    to: F,
    preventScrollReset: ie,
    viewTransition: V
  } = C, X = qE(C, sk), {
    basename: le
  } = J.useContext(Vi), ve, be = !1;
  if (typeof F == "string" && yk.test(F) && (ve = F, mk))
    try {
      let ae = new URL(window.location.href), he = F.startsWith("//") ? new URL(ae.protocol + F) : new URL(F), ge = qo(he.pathname, le);
      he.origin === ae.origin && ge != null ? F = ge + he.search + he.hash : be = !0;
    } catch {
      process.env.NODE_ENV !== "production" && vl(!1, '<Link to="' + F + '"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.');
    }
  let fe = zN(F, {
    relative: N
  }), He = Ck(F, {
    replace: g,
    state: q,
    target: P,
    preventScrollReset: ie,
    relative: N,
    viewTransition: V
  });
  function ue(ae) {
    x && x(ae), ae.defaultPrevented || He(ae);
  }
  return (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    /* @__PURE__ */ J.createElement("a", ed({}, X, {
      href: ve || fe,
      onClick: be || A ? x : ue,
      ref: E,
      target: P
    }))
  );
});
process.env.NODE_ENV !== "production" && (oT.displayName = "Link");
const gk = /* @__PURE__ */ J.forwardRef(function(C, E) {
  let {
    "aria-current": x = "page",
    caseSensitive: N = !1,
    className: A = "",
    end: g = !1,
    style: q,
    to: P,
    viewTransition: F,
    children: ie
  } = C, V = qE(C, ck), X = hv(P, {
    relative: V.relative
  }), le = pc(), ve = J.useContext(WE), {
    navigator: be,
    basename: fe
  } = J.useContext(Vi), He = ve != null && // Conditional usage is OK here because the usage of a data router is static
  // eslint-disable-next-line react-hooks/rules-of-hooks
  _k(X) && F === !0, ue = be.encodeLocation ? be.encodeLocation(X).pathname : X.pathname, ae = le.pathname, he = ve && ve.navigation && ve.navigation.location ? ve.navigation.location.pathname : null;
  N || (ae = ae.toLowerCase(), he = he ? he.toLowerCase() : null, ue = ue.toLowerCase()), he && fe && (he = qo(he, fe) || he);
  const ge = ue !== "/" && ue.endsWith("/") ? ue.length - 1 : ue.length;
  let Ce = ae === ue || !g && ae.startsWith(ue) && ae.charAt(ge) === "/", Ne = he != null && (he === ue || !g && he.startsWith(ue) && he.charAt(ue.length) === "/"), St = {
    isActive: Ce,
    isPending: Ne,
    isTransitioning: He
  }, Et = Ce ? x : void 0, wt;
  typeof A == "function" ? wt = A(St) : wt = [A, Ce ? "active" : null, Ne ? "pending" : null, He ? "transitioning" : null].filter(Boolean).join(" ");
  let Ot = typeof q == "function" ? q(St) : q;
  return /* @__PURE__ */ J.createElement(oT, ed({}, V, {
    "aria-current": Et,
    className: wt,
    ref: E,
    style: Ot,
    to: P,
    viewTransition: F
  }), typeof ie == "function" ? ie(St) : ie);
});
process.env.NODE_ENV !== "production" && (gk.displayName = "NavLink");
const Sk = /* @__PURE__ */ J.forwardRef((m, C) => {
  let {
    fetcherKey: E,
    navigate: x,
    reloadDocument: N,
    replace: A,
    state: g,
    method: q = py,
    action: P,
    onSubmit: F,
    relative: ie,
    preventScrollReset: V,
    viewTransition: X
  } = m, le = qE(m, fk), ve = bk(), be = xk(P, {
    relative: ie
  }), fe = q.toLowerCase() === "get" ? "get" : "post", He = (ue) => {
    if (F && F(ue), ue.defaultPrevented) return;
    ue.preventDefault();
    let ae = ue.nativeEvent.submitter, he = (ae == null ? void 0 : ae.getAttribute("formmethod")) || q;
    ve(ae || ue.currentTarget, {
      fetcherKey: E,
      method: he,
      navigate: x,
      replace: A,
      state: g,
      relative: ie,
      preventScrollReset: V,
      viewTransition: X
    });
  };
  return /* @__PURE__ */ J.createElement("form", ed({
    ref: C,
    method: fe,
    action: be,
    onSubmit: N ? F : He
  }, le));
});
process.env.NODE_ENV !== "production" && (Sk.displayName = "Form");
process.env.NODE_ENV;
var hy;
(function(m) {
  m.UseScrollRestoration = "useScrollRestoration", m.UseSubmit = "useSubmit", m.UseSubmitFetcher = "useSubmitFetcher", m.UseFetcher = "useFetcher", m.useViewTransitionState = "useViewTransitionState";
})(hy || (hy = {}));
var Kw;
(function(m) {
  m.UseFetcher = "useFetcher", m.UseFetchers = "useFetchers", m.UseScrollRestoration = "useScrollRestoration";
})(Kw || (Kw = {}));
function Ek(m) {
  return m + " must be used within a data router.  See https://reactrouter.com/v6/routers/picking-a-router.";
}
function sT(m) {
  let C = J.useContext(pv);
  return C || (process.env.NODE_ENV !== "production" ? gt(!1, Ek(m)) : gt(!1)), C;
}
function Ck(m, C) {
  let {
    target: E,
    replace: x,
    state: N,
    preventScrollReset: A,
    relative: g,
    viewTransition: q
  } = C === void 0 ? {} : C, P = aT(), F = pc(), ie = hv(m, {
    relative: g
  });
  return J.useCallback((V) => {
    if (ik(V, E)) {
      V.preventDefault();
      let X = x !== void 0 ? x : cv(F) === cv(ie);
      P(m, {
        replace: X,
        state: N,
        preventScrollReset: A,
        relative: g,
        viewTransition: q
      });
    }
  }, [F, P, ie, x, N, E, m, A, g, q]);
}
function Rk() {
  if (typeof document > "u")
    throw new Error("You are calling submit during the server render. Try calling submit within a `useEffect` or callback instead.");
}
let wk = 0, Tk = () => "__" + String(++wk) + "__";
function bk() {
  let {
    router: m
  } = sT(hy.UseSubmit), {
    basename: C
  } = J.useContext(Vi), E = QN();
  return J.useCallback(function(x, N) {
    N === void 0 && (N = {}), Rk();
    let {
      action: A,
      method: g,
      encType: q,
      formData: P,
      body: F
    } = ok(x, C);
    if (N.navigate === !1) {
      let ie = N.fetcherKey || Tk();
      m.fetch(ie, E, N.action || A, {
        preventScrollReset: N.preventScrollReset,
        formData: P,
        body: F,
        formMethod: N.method || g,
        formEncType: N.encType || q,
        flushSync: N.flushSync
      });
    } else
      m.navigate(N.action || A, {
        preventScrollReset: N.preventScrollReset,
        formData: P,
        body: F,
        formMethod: N.method || g,
        formEncType: N.encType || q,
        replace: N.replace,
        state: N.state,
        fromRouteId: E,
        flushSync: N.flushSync,
        viewTransition: N.viewTransition
      });
  }, [m, C, E]);
}
function xk(m, C) {
  let {
    relative: E
  } = C === void 0 ? {} : C, {
    basename: x
  } = J.useContext(Vi), N = J.useContext(nu);
  N || (process.env.NODE_ENV !== "production" ? gt(!1, "useFormAction must be used inside a RouteContext") : gt(!1));
  let [A] = N.matches.slice(-1), g = ed({}, hv(m || ".", {
    relative: E
  })), q = pc();
  if (m == null) {
    g.search = q.search;
    let P = new URLSearchParams(g.search), F = P.getAll("index");
    if (F.some((V) => V === "")) {
      P.delete("index"), F.filter((X) => X).forEach((X) => P.append("index", X));
      let V = P.toString();
      g.search = V ? "?" + V : "";
    }
  }
  return (!m || m === ".") && A.route.index && (g.search = g.search ? g.search.replace(/^\?/, "?index&") : "?index"), x !== "/" && (g.pathname = g.pathname === "/" ? x : Ku([x, g.pathname])), cv(g);
}
function _k(m, C) {
  C === void 0 && (C = {});
  let E = J.useContext(uT);
  E == null && (process.env.NODE_ENV !== "production" ? gt(!1, "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?") : gt(!1));
  let {
    basename: x
  } = sT(hy.useViewTransitionState), N = hv(m, {
    relative: C.relative
  });
  if (!E.isTransitioning)
    return !1;
  let A = qo(E.currentLocation.pathname, x) || E.currentLocation.pathname, g = qo(E.nextLocation.pathname, x) || E.nextLocation.pathname;
  return BE(N.pathname, g) != null || BE(N.pathname, A) != null;
}
function Dk() {
  const [m, C] = J.useState(null), [E, x] = J.useState(""), [N, A] = J.useState(""), [g, q] = J.useState(!0), [P, F] = J.useState(""), [ie, V] = J.useState(""), [X, le] = J.useState(!1), [ve, be] = J.useState(!1);
  J.useEffect(() => {
    var ae, he, ge, Ce, Ne, St;
    C({
      apiKey: (ae = window.__FIREBASE__) == null ? void 0 : ae.apiKey,
      authDomain: (he = window.__FIREBASE__) == null ? void 0 : he.authDomain,
      projectId: (ge = window.__FIREBASE__) == null ? void 0 : ge.projectId,
      appId: (Ce = window.__FIREBASE__) == null ? void 0 : Ce.appId,
      messagingSenderId: (Ne = window.__FIREBASE__) == null ? void 0 : Ne.messagingSenderId,
      measurementId: (St = window.__FIREBASE__) == null ? void 0 : St.measurementId
    });
  }, []);
  function fe(ae) {
    const he = (ae == null ? void 0 : ae.code) || "", ge = (ae == null ? void 0 : ae.message) || "";
    return he.includes("invalid-email") ? "Please enter a valid email address." : he.includes("user-not-found") ? "No account found with that email." : he.includes("wrong-password") || he.includes("invalid-credential") || ge.includes("INVALID_LOGIN_CREDENTIALS") ? "Incorrect email or password." : he.includes("too-many-requests") ? "Too many attempts. Please wait and try again." : he.includes("network-request-failed") ? "Network error. Check your connection and try again." : ge || "Something went wrong.";
  }
  async function He(ae) {
    ae.preventDefault(), F(""), V(""), le(!0);
    try {
      if (!(m != null && m.apiKey)) throw new Error("Firebase not configured");
      const he = (await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js")).initializeApp(m), ge = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js"), { getAuth: Ce, setPersistence: Ne, browserLocalPersistence: St, browserSessionPersistence: Et, signInWithEmailAndPassword: wt } = ge, Ot = Ce();
      await Ne(Ot, g ? St : Et);
      const je = await (await wt(Ot, E.trim(), N)).user.getIdToken();
      if (!(await fetch("/auth/session", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify({ idToken: je }) })).ok) throw new Error("Session creation failed");
      V("Signed in successfully. Redirecting..."), setTimeout(() => window.location.href = "/riders", 600);
    } catch (he) {
      F(fe(he));
    } finally {
      le(!1);
    }
  }
  async function ue() {
    F(""), V("");
    try {
      if (!(m != null && m.apiKey)) throw new Error("Firebase not configured");
      const ae = (await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js")).initializeApp(m), { getAuth: he, sendPasswordResetEmail: ge } = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js"), Ce = he();
      await ge(Ce, E.trim()), V("If an account exists for that email, a reset link has been sent.");
    } catch (ae) {
      F(fe(ae));
    }
  }
  return /* @__PURE__ */ Ge.jsxDEV("section", { className: "auth-layout", children: [
    /* @__PURE__ */ Ge.jsxDEV("div", { className: "auth-hero", children: [
      /* @__PURE__ */ Ge.jsxDEV("img", { className: "hero-logo", src: "https://cdn.builder.io/api/v1/image/assets%2Fa5647e4ccf094d4d939a079b9f892c1c%2F240094ac7d6b4725b685503d97c9d9a3?format=webp&width=96", alt: "FreshBasket logo" }, void 0, !1, {
        fileName: "/app/code/client/pages/Login.jsx",
        lineNumber: 71,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ Ge.jsxDEV("h2", { className: "hero-heading", children: "Welcome back" }, void 0, !1, {
        fileName: "/app/code/client/pages/Login.jsx",
        lineNumber: 72,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ Ge.jsxDEV("p", { className: "hero-sub", children: "Sign in to manage orders, riders and deliveries." }, void 0, !1, {
        fileName: "/app/code/client/pages/Login.jsx",
        lineNumber: 73,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ Ge.jsxDEV("ul", { className: "hero-points", children: [
        /* @__PURE__ */ Ge.jsxDEV("li", { children: "Secure account access" }, void 0, !1, {
          fileName: "/app/code/client/pages/Login.jsx",
          lineNumber: 74,
          columnNumber: 37
        }, this),
        /* @__PURE__ */ Ge.jsxDEV("li", { children: "Real-time dashboards" }, void 0, !1, {
          fileName: "/app/code/client/pages/Login.jsx",
          lineNumber: 74,
          columnNumber: 67
        }, this),
        /* @__PURE__ */ Ge.jsxDEV("li", { children: "Faster operations" }, void 0, !1, {
          fileName: "/app/code/client/pages/Login.jsx",
          lineNumber: 74,
          columnNumber: 96
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Login.jsx",
        lineNumber: 74,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Login.jsx",
      lineNumber: 70,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ Ge.jsxDEV("div", { className: "auth-panel auth-panel-card", children: [
      /* @__PURE__ */ Ge.jsxDEV("h2", { className: "auth-title", children: "Sign in to FreshBasket" }, void 0, !1, {
        fileName: "/app/code/client/pages/Login.jsx",
        lineNumber: 78,
        columnNumber: 9
      }, this),
      P && /* @__PURE__ */ Ge.jsxDEV("div", { className: "auth-error", children: P }, void 0, !1, {
        fileName: "/app/code/client/pages/Login.jsx",
        lineNumber: 79,
        columnNumber: 19
      }, this),
      ie && /* @__PURE__ */ Ge.jsxDEV("div", { className: "auth-success", children: ie }, void 0, !1, {
        fileName: "/app/code/client/pages/Login.jsx",
        lineNumber: 80,
        columnNumber: 16
      }, this),
      /* @__PURE__ */ Ge.jsxDEV("form", { className: "auth-form", onSubmit: He, children: [
        /* @__PURE__ */ Ge.jsxDEV("label", { className: "auth-label", children: [
          "Email",
          /* @__PURE__ */ Ge.jsxDEV("input", { className: "auth-input", type: "email", value: E, onChange: (ae) => x(ae.target.value), required: !0 }, void 0, !1, {
            fileName: "/app/code/client/pages/Login.jsx",
            lineNumber: 83,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Login.jsx",
          lineNumber: 82,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ Ge.jsxDEV("label", { className: "auth-label", children: [
          "Password",
          /* @__PURE__ */ Ge.jsxDEV("span", { className: "password-field", children: [
            /* @__PURE__ */ Ge.jsxDEV("input", { className: "auth-input", type: ve ? "text" : "password", value: N, onChange: (ae) => A(ae.target.value), required: !0 }, void 0, !1, {
              fileName: "/app/code/client/pages/Login.jsx",
              lineNumber: 87,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ Ge.jsxDEV("button", { type: "button", id: "togglePwd", className: "toggle-password", "aria-label": ve ? "Hide password" : "Show password", onClick: () => be((ae) => !ae), children: "👁️" }, void 0, !1, {
              fileName: "/app/code/client/pages/Login.jsx",
              lineNumber: 88,
              columnNumber: 15
            }, this)
          ] }, void 0, !0, {
            fileName: "/app/code/client/pages/Login.jsx",
            lineNumber: 86,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Login.jsx",
          lineNumber: 85,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ Ge.jsxDEV("div", { className: "auth-actions", children: [
          /* @__PURE__ */ Ge.jsxDEV("label", { className: "remember", children: [
            /* @__PURE__ */ Ge.jsxDEV("input", { type: "checkbox", checked: g, onChange: (ae) => q(ae.target.checked) }, void 0, !1, {
              fileName: "/app/code/client/pages/Login.jsx",
              lineNumber: 92,
              columnNumber: 41
            }, this),
            " Remember me"
          ] }, void 0, !0, {
            fileName: "/app/code/client/pages/Login.jsx",
            lineNumber: 92,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ Ge.jsxDEV("button", { className: "link-button", type: "button", onClick: ue, children: "Forgot password?" }, void 0, !1, {
            fileName: "/app/code/client/pages/Login.jsx",
            lineNumber: 93,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Login.jsx",
          lineNumber: 91,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ Ge.jsxDEV("button", { className: "auth-button auth-button-wide", disabled: X, type: "submit", children: X ? "Signing in…" : "Sign in" }, void 0, !1, {
          fileName: "/app/code/client/pages/Login.jsx",
          lineNumber: 95,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Login.jsx",
        lineNumber: 81,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ Ge.jsxDEV("p", { className: "auth-alt", children: [
        "No account? ",
        /* @__PURE__ */ Ge.jsxDEV("a", { href: "/auth/register", children: "Register" }, void 0, !1, {
          fileName: "/app/code/client/pages/Login.jsx",
          lineNumber: 97,
          columnNumber: 45
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Login.jsx",
        lineNumber: 97,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Login.jsx",
      lineNumber: 77,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "/app/code/client/pages/Login.jsx",
    lineNumber: 69,
    columnNumber: 5
  }, this);
}
function Nk() {
  const [m, C] = J.useState(null), [E, x] = J.useState(""), [N, A] = J.useState(""), [g, q] = J.useState(""), [P, F] = J.useState(""), [ie, V] = J.useState(""), [X, le] = J.useState(""), [ve, be] = J.useState(""), [fe, He] = J.useState(!1), [ue, ae] = J.useState(!1);
  J.useEffect(() => {
    var Ce, Ne, St, Et, wt, Ot;
    C({
      apiKey: (Ce = window.__FIREBASE__) == null ? void 0 : Ce.apiKey,
      authDomain: (Ne = window.__FIREBASE__) == null ? void 0 : Ne.authDomain,
      projectId: (St = window.__FIREBASE__) == null ? void 0 : St.projectId,
      appId: (Et = window.__FIREBASE__) == null ? void 0 : Et.appId,
      messagingSenderId: (wt = window.__FIREBASE__) == null ? void 0 : wt.messagingSenderId,
      measurementId: (Ot = window.__FIREBASE__) == null ? void 0 : Ot.measurementId
    });
  }, []);
  function he(Ce) {
    const Ne = (Ce == null ? void 0 : Ce.code) || "";
    return Ne.includes("email-already-in-use") ? "An account with this email already exists." : Ne.includes("weak-password") ? "Password should be at least 6 characters." : Ne.includes("invalid-email") ? "Please enter a valid email address." : Ne.includes("network-request-failed") ? "Network error. Check your connection and try again." : (Ce == null ? void 0 : Ce.message) || "Something went wrong.";
  }
  async function ge(Ce) {
    Ce.preventDefault(), le(""), be(""), He(!0);
    try {
      if (P !== ie) throw new Error("Passwords do not match");
      if (!(m != null && m.apiKey)) throw new Error("Firebase not configured");
      const Ne = (await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js")).initializeApp(m), { getAuth: St, createUserWithEmailAndPassword: Et } = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js"), wt = St(), bt = await (await Et(wt, g.trim(), P)).user.getIdToken();
      if (!(await fetch("/auth/session", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify({ idToken: bt, profile: { fullName: E, contactNumber: N } }) })).ok) throw new Error("Session creation failed");
      be("Account created successfully. Redirecting..."), setTimeout(() => window.location.href = "/riders", 700);
    } catch (Ne) {
      le(he(Ne));
    } finally {
      He(!1);
    }
  }
  return /* @__PURE__ */ Ge.jsxDEV("section", { className: "auth-panel", style: { maxWidth: 520, margin: "40px auto" }, children: [
    /* @__PURE__ */ Ge.jsxDEV("h2", { className: "auth-title", children: "Register" }, void 0, !1, {
      fileName: "/app/code/client/pages/Register.jsx",
      lineNumber: 55,
      columnNumber: 7
    }, this),
    X && /* @__PURE__ */ Ge.jsxDEV("div", { className: "auth-error", children: X }, void 0, !1, {
      fileName: "/app/code/client/pages/Register.jsx",
      lineNumber: 56,
      columnNumber: 17
    }, this),
    ve && /* @__PURE__ */ Ge.jsxDEV("div", { className: "auth-success", children: ve }, void 0, !1, {
      fileName: "/app/code/client/pages/Register.jsx",
      lineNumber: 57,
      columnNumber: 14
    }, this),
    /* @__PURE__ */ Ge.jsxDEV("form", { className: "auth-form", onSubmit: ge, children: [
      /* @__PURE__ */ Ge.jsxDEV("label", { className: "auth-label", children: [
        "Full name",
        /* @__PURE__ */ Ge.jsxDEV("input", { className: "auth-input", value: E, onChange: (Ce) => x(Ce.target.value), required: !0 }, void 0, !1, {
          fileName: "/app/code/client/pages/Register.jsx",
          lineNumber: 60,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Register.jsx",
        lineNumber: 59,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ Ge.jsxDEV("label", { className: "auth-label", children: [
        "Contact number",
        /* @__PURE__ */ Ge.jsxDEV("input", { className: "auth-input", value: N, onChange: (Ce) => A(Ce.target.value), inputMode: "tel", placeholder: "e.g. +1 555 123 4567" }, void 0, !1, {
          fileName: "/app/code/client/pages/Register.jsx",
          lineNumber: 63,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Register.jsx",
        lineNumber: 62,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ Ge.jsxDEV("label", { className: "auth-label", children: [
        "Email",
        /* @__PURE__ */ Ge.jsxDEV("input", { className: "auth-input", type: "email", value: g, onChange: (Ce) => q(Ce.target.value), required: !0 }, void 0, !1, {
          fileName: "/app/code/client/pages/Register.jsx",
          lineNumber: 66,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Register.jsx",
        lineNumber: 65,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ Ge.jsxDEV("label", { className: "auth-label", children: [
        "Password",
        /* @__PURE__ */ Ge.jsxDEV("span", { className: "password-field", children: [
          /* @__PURE__ */ Ge.jsxDEV("input", { className: "auth-input", type: ue ? "text" : "password", value: P, onChange: (Ce) => F(Ce.target.value), minLength: 6, required: !0 }, void 0, !1, {
            fileName: "/app/code/client/pages/Register.jsx",
            lineNumber: 70,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ Ge.jsxDEV("button", { type: "button", className: "toggle-password", "aria-label": ue ? "Hide password" : "Show password", onClick: () => ae((Ce) => !Ce), children: "👁️" }, void 0, !1, {
            fileName: "/app/code/client/pages/Register.jsx",
            lineNumber: 71,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Register.jsx",
          lineNumber: 69,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Register.jsx",
        lineNumber: 68,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ Ge.jsxDEV("label", { className: "auth-label", children: [
        "Confirm Password",
        /* @__PURE__ */ Ge.jsxDEV("input", { className: "auth-input", type: "password", value: ie, onChange: (Ce) => V(Ce.target.value), minLength: 6, required: !0 }, void 0, !1, {
          fileName: "/app/code/client/pages/Register.jsx",
          lineNumber: 75,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Register.jsx",
        lineNumber: 74,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ Ge.jsxDEV("button", { className: "auth-button", disabled: fe, type: "submit", children: fe ? "Creating account…" : "Create account" }, void 0, !1, {
        fileName: "/app/code/client/pages/Register.jsx",
        lineNumber: 77,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Register.jsx",
      lineNumber: 58,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ Ge.jsxDEV("p", { className: "auth-alt", children: [
      "Have an account? ",
      /* @__PURE__ */ Ge.jsxDEV("a", { href: "/auth/login", children: "Login" }, void 0, !1, {
        fileName: "/app/code/client/pages/Register.jsx",
        lineNumber: 79,
        columnNumber: 48
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Register.jsx",
      lineNumber: 79,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "/app/code/client/pages/Register.jsx",
    lineNumber: 54,
    columnNumber: 5
  }, this);
}
function kk() {
  return /* @__PURE__ */ Ge.jsxDEV(hk, { children: /* @__PURE__ */ Ge.jsxDEV(ek, { children: [
    /* @__PURE__ */ Ge.jsxDEV(dy, { path: "/auth/login", element: /* @__PURE__ */ Ge.jsxDEV(Dk, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 10,
      columnNumber: 44
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 10,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ Ge.jsxDEV(dy, { path: "/auth/register", element: /* @__PURE__ */ Ge.jsxDEV(Nk, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 11,
      columnNumber: 47
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 11,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ Ge.jsxDEV(dy, { path: "*", element: /* @__PURE__ */ Ge.jsxDEV(JN, { to: "/auth/login", replace: !0 }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 12,
      columnNumber: 34
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 12,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "/app/code/client/App.jsx",
    lineNumber: 9,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "/app/code/client/App.jsx",
    lineNumber: 8,
    columnNumber: 5
  }, this);
}
function qw() {
  const m = document.getElementById("react-root");
  if (!m) return;
  PE(m).render(/* @__PURE__ */ Ge.jsxDEV(kk, {}, void 0, !1, {
    fileName: "/app/code/client/main.jsx",
    lineNumber: 9,
    columnNumber: 15
  }, this));
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", qw) : qw();
