var sE = { exports: {} }, Pm = {};
/**
 * @license React
 * react-jsx-dev-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var qR;
function G_() {
  if (qR) return Pm;
  qR = 1;
  var te = Symbol.for("react.fragment");
  return Pm.Fragment = te, Pm.jsxDEV = void 0, Pm;
}
var Bm = {}, cE = { exports: {} }, dt = {};
/**
 * @license React
 * react.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var XR;
function q_() {
  if (XR) return dt;
  XR = 1;
  var te = Symbol.for("react.element"), Z = Symbol.for("react.portal"), F = Symbol.for("react.fragment"), Jt = Symbol.for("react.strict_mode"), Nt = Symbol.for("react.profiler"), zt = Symbol.for("react.provider"), S = Symbol.for("react.context"), dn = Symbol.for("react.forward_ref"), Te = Symbol.for("react.suspense"), pe = Symbol.for("react.memo"), jt = Symbol.for("react.lazy"), ae = Symbol.iterator;
  function we(_) {
    return _ === null || typeof _ != "object" ? null : (_ = ae && _[ae] || _["@@iterator"], typeof _ == "function" ? _ : null);
  }
  var ce = { isMounted: function() {
    return !1;
  }, enqueueForceUpdate: function() {
  }, enqueueReplaceState: function() {
  }, enqueueSetState: function() {
  } }, Qe = Object.assign, pt = {};
  function st(_, V, He) {
    this.props = _, this.context = V, this.refs = pt, this.updater = He || ce;
  }
  st.prototype.isReactComponent = {}, st.prototype.setState = function(_, V) {
    if (typeof _ != "object" && typeof _ != "function" && _ != null) throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
    this.updater.enqueueSetState(this, _, V, "setState");
  }, st.prototype.forceUpdate = function(_) {
    this.updater.enqueueForceUpdate(this, _, "forceUpdate");
  };
  function un() {
  }
  un.prototype = st.prototype;
  function it(_, V, He) {
    this.props = _, this.context = V, this.refs = pt, this.updater = He || ce;
  }
  var We = it.prototype = new un();
  We.constructor = it, Qe(We, st.prototype), We.isPureReactComponent = !0;
  var ct = Array.isArray, xe = Object.prototype.hasOwnProperty, lt = { current: null }, je = { key: !0, ref: !0, __self: !0, __source: !0 };
  function en(_, V, He) {
    var Ae, tt = {}, Ke = null, Xe = null;
    if (V != null) for (Ae in V.ref !== void 0 && (Xe = V.ref), V.key !== void 0 && (Ke = "" + V.key), V) xe.call(V, Ae) && !je.hasOwnProperty(Ae) && (tt[Ae] = V[Ae]);
    var Ze = arguments.length - 2;
    if (Ze === 1) tt.children = He;
    else if (1 < Ze) {
      for (var nt = Array(Ze), Ht = 0; Ht < Ze; Ht++) nt[Ht] = arguments[Ht + 2];
      tt.children = nt;
    }
    if (_ && _.defaultProps) for (Ae in Ze = _.defaultProps, Ze) tt[Ae] === void 0 && (tt[Ae] = Ze[Ae]);
    return { $$typeof: te, type: _, key: Ke, ref: Xe, props: tt, _owner: lt.current };
  }
  function Ut(_, V) {
    return { $$typeof: te, type: _.type, key: V, ref: _.ref, props: _.props, _owner: _._owner };
  }
  function Gt(_) {
    return typeof _ == "object" && _ !== null && _.$$typeof === te;
  }
  function tn(_) {
    var V = { "=": "=0", ":": "=2" };
    return "$" + _.replace(/[=:]/g, function(He) {
      return V[He];
    });
  }
  var Et = /\/+/g;
  function be(_, V) {
    return typeof _ == "object" && _ !== null && _.key != null ? tn("" + _.key) : V.toString(36);
  }
  function Ot(_, V, He, Ae, tt) {
    var Ke = typeof _;
    (Ke === "undefined" || Ke === "boolean") && (_ = null);
    var Xe = !1;
    if (_ === null) Xe = !0;
    else switch (Ke) {
      case "string":
      case "number":
        Xe = !0;
        break;
      case "object":
        switch (_.$$typeof) {
          case te:
          case Z:
            Xe = !0;
        }
    }
    if (Xe) return Xe = _, tt = tt(Xe), _ = Ae === "" ? "." + be(Xe, 0) : Ae, ct(tt) ? (He = "", _ != null && (He = _.replace(Et, "$&/") + "/"), Ot(tt, V, He, "", function(Ht) {
      return Ht;
    })) : tt != null && (Gt(tt) && (tt = Ut(tt, He + (!tt.key || Xe && Xe.key === tt.key ? "" : ("" + tt.key).replace(Et, "$&/") + "/") + _)), V.push(tt)), 1;
    if (Xe = 0, Ae = Ae === "" ? "." : Ae + ":", ct(_)) for (var Ze = 0; Ze < _.length; Ze++) {
      Ke = _[Ze];
      var nt = Ae + be(Ke, Ze);
      Xe += Ot(Ke, V, He, nt, tt);
    }
    else if (nt = we(_), typeof nt == "function") for (_ = nt.call(_), Ze = 0; !(Ke = _.next()).done; ) Ke = Ke.value, nt = Ae + be(Ke, Ze++), Xe += Ot(Ke, V, He, nt, tt);
    else if (Ke === "object") throw V = String(_), Error("Objects are not valid as a React child (found: " + (V === "[object Object]" ? "object with keys {" + Object.keys(_).join(", ") + "}" : V) + "). If you meant to render a collection of children, use an array instead.");
    return Xe;
  }
  function Ct(_, V, He) {
    if (_ == null) return _;
    var Ae = [], tt = 0;
    return Ot(_, Ae, "", "", function(Ke) {
      return V.call(He, Ke, tt++);
    }), Ae;
  }
  function Tt(_) {
    if (_._status === -1) {
      var V = _._result;
      V = V(), V.then(function(He) {
        (_._status === 0 || _._status === -1) && (_._status = 1, _._result = He);
      }, function(He) {
        (_._status === 0 || _._status === -1) && (_._status = 2, _._result = He);
      }), _._status === -1 && (_._status = 0, _._result = V);
    }
    if (_._status === 1) return _._result.default;
    throw _._result;
  }
  var ge = { current: null }, X = { transition: null }, Ee = { ReactCurrentDispatcher: ge, ReactCurrentBatchConfig: X, ReactCurrentOwner: lt };
  function ne() {
    throw Error("act(...) is not supported in production builds of React.");
  }
  return dt.Children = { map: Ct, forEach: function(_, V, He) {
    Ct(_, function() {
      V.apply(this, arguments);
    }, He);
  }, count: function(_) {
    var V = 0;
    return Ct(_, function() {
      V++;
    }), V;
  }, toArray: function(_) {
    return Ct(_, function(V) {
      return V;
    }) || [];
  }, only: function(_) {
    if (!Gt(_)) throw Error("React.Children.only expected to receive a single React element child.");
    return _;
  } }, dt.Component = st, dt.Fragment = F, dt.Profiler = Nt, dt.PureComponent = it, dt.StrictMode = Jt, dt.Suspense = Te, dt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Ee, dt.act = ne, dt.cloneElement = function(_, V, He) {
    if (_ == null) throw Error("React.cloneElement(...): The argument must be a React element, but you passed " + _ + ".");
    var Ae = Qe({}, _.props), tt = _.key, Ke = _.ref, Xe = _._owner;
    if (V != null) {
      if (V.ref !== void 0 && (Ke = V.ref, Xe = lt.current), V.key !== void 0 && (tt = "" + V.key), _.type && _.type.defaultProps) var Ze = _.type.defaultProps;
      for (nt in V) xe.call(V, nt) && !je.hasOwnProperty(nt) && (Ae[nt] = V[nt] === void 0 && Ze !== void 0 ? Ze[nt] : V[nt]);
    }
    var nt = arguments.length - 2;
    if (nt === 1) Ae.children = He;
    else if (1 < nt) {
      Ze = Array(nt);
      for (var Ht = 0; Ht < nt; Ht++) Ze[Ht] = arguments[Ht + 2];
      Ae.children = Ze;
    }
    return { $$typeof: te, type: _.type, key: tt, ref: Ke, props: Ae, _owner: Xe };
  }, dt.createContext = function(_) {
    return _ = { $$typeof: S, _currentValue: _, _currentValue2: _, _threadCount: 0, Provider: null, Consumer: null, _defaultValue: null, _globalName: null }, _.Provider = { $$typeof: zt, _context: _ }, _.Consumer = _;
  }, dt.createElement = en, dt.createFactory = function(_) {
    var V = en.bind(null, _);
    return V.type = _, V;
  }, dt.createRef = function() {
    return { current: null };
  }, dt.forwardRef = function(_) {
    return { $$typeof: dn, render: _ };
  }, dt.isValidElement = Gt, dt.lazy = function(_) {
    return { $$typeof: jt, _payload: { _status: -1, _result: _ }, _init: Tt };
  }, dt.memo = function(_, V) {
    return { $$typeof: pe, type: _, compare: V === void 0 ? null : V };
  }, dt.startTransition = function(_) {
    var V = X.transition;
    X.transition = {};
    try {
      _();
    } finally {
      X.transition = V;
    }
  }, dt.unstable_act = ne, dt.useCallback = function(_, V) {
    return ge.current.useCallback(_, V);
  }, dt.useContext = function(_) {
    return ge.current.useContext(_);
  }, dt.useDebugValue = function() {
  }, dt.useDeferredValue = function(_) {
    return ge.current.useDeferredValue(_);
  }, dt.useEffect = function(_, V) {
    return ge.current.useEffect(_, V);
  }, dt.useId = function() {
    return ge.current.useId();
  }, dt.useImperativeHandle = function(_, V, He) {
    return ge.current.useImperativeHandle(_, V, He);
  }, dt.useInsertionEffect = function(_, V) {
    return ge.current.useInsertionEffect(_, V);
  }, dt.useLayoutEffect = function(_, V) {
    return ge.current.useLayoutEffect(_, V);
  }, dt.useMemo = function(_, V) {
    return ge.current.useMemo(_, V);
  }, dt.useReducer = function(_, V, He) {
    return ge.current.useReducer(_, V, He);
  }, dt.useRef = function(_) {
    return ge.current.useRef(_);
  }, dt.useState = function(_) {
    return ge.current.useState(_);
  }, dt.useSyncExternalStore = function(_, V, He) {
    return ge.current.useSyncExternalStore(_, V, He);
  }, dt.useTransition = function() {
    return ge.current.useTransition();
  }, dt.version = "18.3.1", dt;
}
var qp = { exports: {} };
/**
 * @license React
 * react.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
qp.exports;
var KR;
function X_() {
  return KR || (KR = 1, function(te, Z) {
    process.env.NODE_ENV !== "production" && function() {
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
      var F = "18.3.1", Jt = Symbol.for("react.element"), Nt = Symbol.for("react.portal"), zt = Symbol.for("react.fragment"), S = Symbol.for("react.strict_mode"), dn = Symbol.for("react.profiler"), Te = Symbol.for("react.provider"), pe = Symbol.for("react.context"), jt = Symbol.for("react.forward_ref"), ae = Symbol.for("react.suspense"), we = Symbol.for("react.suspense_list"), ce = Symbol.for("react.memo"), Qe = Symbol.for("react.lazy"), pt = Symbol.for("react.offscreen"), st = Symbol.iterator, un = "@@iterator";
      function it(h) {
        if (h === null || typeof h != "object")
          return null;
        var C = st && h[st] || h[un];
        return typeof C == "function" ? C : null;
      }
      var We = {
        /**
         * @internal
         * @type {ReactComponent}
         */
        current: null
      }, ct = {
        transition: null
      }, xe = {
        current: null,
        // Used to reproduce behavior of `batchedUpdates` in legacy mode.
        isBatchingLegacy: !1,
        didScheduleLegacyUpdate: !1
      }, lt = {
        /**
         * @internal
         * @type {ReactComponent}
         */
        current: null
      }, je = {}, en = null;
      function Ut(h) {
        en = h;
      }
      je.setExtraStackFrame = function(h) {
        en = h;
      }, je.getCurrentStack = null, je.getStackAddendum = function() {
        var h = "";
        en && (h += en);
        var C = je.getCurrentStack;
        return C && (h += C() || ""), h;
      };
      var Gt = !1, tn = !1, Et = !1, be = !1, Ot = !1, Ct = {
        ReactCurrentDispatcher: We,
        ReactCurrentBatchConfig: ct,
        ReactCurrentOwner: lt
      };
      Ct.ReactDebugCurrentFrame = je, Ct.ReactCurrentActQueue = xe;
      function Tt(h) {
        {
          for (var C = arguments.length, N = new Array(C > 1 ? C - 1 : 0), A = 1; A < C; A++)
            N[A - 1] = arguments[A];
          X("warn", h, N);
        }
      }
      function ge(h) {
        {
          for (var C = arguments.length, N = new Array(C > 1 ? C - 1 : 0), A = 1; A < C; A++)
            N[A - 1] = arguments[A];
          X("error", h, N);
        }
      }
      function X(h, C, N) {
        {
          var A = Ct.ReactDebugCurrentFrame, q = A.getStackAddendum();
          q !== "" && (C += "%s", N = N.concat([q]));
          var Le = N.map(function(re) {
            return String(re);
          });
          Le.unshift("Warning: " + C), Function.prototype.apply.call(console[h], console, Le);
        }
      }
      var Ee = {};
      function ne(h, C) {
        {
          var N = h.constructor, A = N && (N.displayName || N.name) || "ReactClass", q = A + "." + C;
          if (Ee[q])
            return;
          ge("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", C, A), Ee[q] = !0;
        }
      }
      var _ = {
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
        enqueueForceUpdate: function(h, C, N) {
          ne(h, "forceUpdate");
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
        enqueueReplaceState: function(h, C, N, A) {
          ne(h, "replaceState");
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
        enqueueSetState: function(h, C, N, A) {
          ne(h, "setState");
        }
      }, V = Object.assign, He = {};
      Object.freeze(He);
      function Ae(h, C, N) {
        this.props = h, this.context = C, this.refs = He, this.updater = N || _;
      }
      Ae.prototype.isReactComponent = {}, Ae.prototype.setState = function(h, C) {
        if (typeof h != "object" && typeof h != "function" && h != null)
          throw new Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
        this.updater.enqueueSetState(this, h, C, "setState");
      }, Ae.prototype.forceUpdate = function(h) {
        this.updater.enqueueForceUpdate(this, h, "forceUpdate");
      };
      {
        var tt = {
          isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
          replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
        }, Ke = function(h, C) {
          Object.defineProperty(Ae.prototype, h, {
            get: function() {
              Tt("%s(...) is deprecated in plain JavaScript React classes. %s", C[0], C[1]);
            }
          });
        };
        for (var Xe in tt)
          tt.hasOwnProperty(Xe) && Ke(Xe, tt[Xe]);
      }
      function Ze() {
      }
      Ze.prototype = Ae.prototype;
      function nt(h, C, N) {
        this.props = h, this.context = C, this.refs = He, this.updater = N || _;
      }
      var Ht = nt.prototype = new Ze();
      Ht.constructor = nt, V(Ht, Ae.prototype), Ht.isPureReactComponent = !0;
      function Dn() {
        var h = {
          current: null
        };
        return Object.seal(h), h;
      }
      var _r = Array.isArray;
      function En(h) {
        return _r(h);
      }
      function nr(h) {
        {
          var C = typeof Symbol == "function" && Symbol.toStringTag, N = C && h[Symbol.toStringTag] || h.constructor.name || "Object";
          return N;
        }
      }
      function Vn(h) {
        try {
          return Pn(h), !1;
        } catch {
          return !0;
        }
      }
      function Pn(h) {
        return "" + h;
      }
      function Ir(h) {
        if (Vn(h))
          return ge("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", nr(h)), Pn(h);
      }
      function oi(h, C, N) {
        var A = h.displayName;
        if (A)
          return A;
        var q = C.displayName || C.name || "";
        return q !== "" ? N + "(" + q + ")" : N;
      }
      function ca(h) {
        return h.displayName || "Context";
      }
      function qn(h) {
        if (h == null)
          return null;
        if (typeof h.tag == "number" && ge("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof h == "function")
          return h.displayName || h.name || null;
        if (typeof h == "string")
          return h;
        switch (h) {
          case zt:
            return "Fragment";
          case Nt:
            return "Portal";
          case dn:
            return "Profiler";
          case S:
            return "StrictMode";
          case ae:
            return "Suspense";
          case we:
            return "SuspenseList";
        }
        if (typeof h == "object")
          switch (h.$$typeof) {
            case pe:
              var C = h;
              return ca(C) + ".Consumer";
            case Te:
              var N = h;
              return ca(N._context) + ".Provider";
            case jt:
              return oi(h, h.render, "ForwardRef");
            case ce:
              var A = h.displayName || null;
              return A !== null ? A : qn(h.type) || "Memo";
            case Qe: {
              var q = h, Le = q._payload, re = q._init;
              try {
                return qn(re(Le));
              } catch {
                return null;
              }
            }
          }
        return null;
      }
      var Cn = Object.prototype.hasOwnProperty, Bn = {
        key: !0,
        ref: !0,
        __self: !0,
        __source: !0
      }, gr, Ia, kn;
      kn = {};
      function Sr(h) {
        if (Cn.call(h, "ref")) {
          var C = Object.getOwnPropertyDescriptor(h, "ref").get;
          if (C && C.isReactWarning)
            return !1;
        }
        return h.ref !== void 0;
      }
      function Er(h) {
        if (Cn.call(h, "key")) {
          var C = Object.getOwnPropertyDescriptor(h, "key").get;
          if (C && C.isReactWarning)
            return !1;
        }
        return h.key !== void 0;
      }
      function Qa(h, C) {
        var N = function() {
          gr || (gr = !0, ge("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", C));
        };
        N.isReactWarning = !0, Object.defineProperty(h, "key", {
          get: N,
          configurable: !0
        });
      }
      function si(h, C) {
        var N = function() {
          Ia || (Ia = !0, ge("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", C));
        };
        N.isReactWarning = !0, Object.defineProperty(h, "ref", {
          get: N,
          configurable: !0
        });
      }
      function K(h) {
        if (typeof h.ref == "string" && lt.current && h.__self && lt.current.stateNode !== h.__self) {
          var C = qn(lt.current.type);
          kn[C] || (ge('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', C, h.ref), kn[C] = !0);
        }
      }
      var Se = function(h, C, N, A, q, Le, re) {
        var ze = {
          // This tag allows us to uniquely identify this as a React Element
          $$typeof: Jt,
          // Built-in properties that belong on the element
          type: h,
          key: C,
          ref: N,
          props: re,
          // Record the component responsible for creating this element.
          _owner: Le
        };
        return ze._store = {}, Object.defineProperty(ze._store, "validated", {
          configurable: !1,
          enumerable: !1,
          writable: !0,
          value: !1
        }), Object.defineProperty(ze, "_self", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: A
        }), Object.defineProperty(ze, "_source", {
          configurable: !1,
          enumerable: !1,
          writable: !1,
          value: q
        }), Object.freeze && (Object.freeze(ze.props), Object.freeze(ze)), ze;
      };
      function Je(h, C, N) {
        var A, q = {}, Le = null, re = null, ze = null, ut = null;
        if (C != null) {
          Sr(C) && (re = C.ref, K(C)), Er(C) && (Ir(C.key), Le = "" + C.key), ze = C.__self === void 0 ? null : C.__self, ut = C.__source === void 0 ? null : C.__source;
          for (A in C)
            Cn.call(C, A) && !Bn.hasOwnProperty(A) && (q[A] = C[A]);
        }
        var St = arguments.length - 2;
        if (St === 1)
          q.children = N;
        else if (St > 1) {
          for (var Kt = Array(St), Bt = 0; Bt < St; Bt++)
            Kt[Bt] = arguments[Bt + 2];
          Object.freeze && Object.freeze(Kt), q.children = Kt;
        }
        if (h && h.defaultProps) {
          var et = h.defaultProps;
          for (A in et)
            q[A] === void 0 && (q[A] = et[A]);
        }
        if (Le || re) {
          var $t = typeof h == "function" ? h.displayName || h.name || "Unknown" : h;
          Le && Qa(q, $t), re && si(q, $t);
        }
        return Se(h, Le, re, ze, ut, lt.current, q);
      }
      function Lt(h, C) {
        var N = Se(h.type, C, h.ref, h._self, h._source, h._owner, h.props);
        return N;
      }
      function qt(h, C, N) {
        if (h == null)
          throw new Error("React.cloneElement(...): The argument must be a React element, but you passed " + h + ".");
        var A, q = V({}, h.props), Le = h.key, re = h.ref, ze = h._self, ut = h._source, St = h._owner;
        if (C != null) {
          Sr(C) && (re = C.ref, St = lt.current), Er(C) && (Ir(C.key), Le = "" + C.key);
          var Kt;
          h.type && h.type.defaultProps && (Kt = h.type.defaultProps);
          for (A in C)
            Cn.call(C, A) && !Bn.hasOwnProperty(A) && (C[A] === void 0 && Kt !== void 0 ? q[A] = Kt[A] : q[A] = C[A]);
        }
        var Bt = arguments.length - 2;
        if (Bt === 1)
          q.children = N;
        else if (Bt > 1) {
          for (var et = Array(Bt), $t = 0; $t < Bt; $t++)
            et[$t] = arguments[$t + 2];
          q.children = et;
        }
        return Se(h.type, Le, re, ze, ut, St, q);
      }
      function pn(h) {
        return typeof h == "object" && h !== null && h.$$typeof === Jt;
      }
      var nn = ".", Xn = ":";
      function on(h) {
        var C = /[=:]/g, N = {
          "=": "=0",
          ":": "=2"
        }, A = h.replace(C, function(q) {
          return N[q];
        });
        return "$" + A;
      }
      var Vt = !1, sn = /\/+/g;
      function Cr(h) {
        return h.replace(sn, "$&/");
      }
      function Rr(h, C) {
        return typeof h == "object" && h !== null && h.key != null ? (Ir(h.key), on("" + h.key)) : C.toString(36);
      }
      function fa(h, C, N, A, q) {
        var Le = typeof h;
        (Le === "undefined" || Le === "boolean") && (h = null);
        var re = !1;
        if (h === null)
          re = !0;
        else
          switch (Le) {
            case "string":
            case "number":
              re = !0;
              break;
            case "object":
              switch (h.$$typeof) {
                case Jt:
                case Nt:
                  re = !0;
              }
          }
        if (re) {
          var ze = h, ut = q(ze), St = A === "" ? nn + Rr(ze, 0) : A;
          if (En(ut)) {
            var Kt = "";
            St != null && (Kt = Cr(St) + "/"), fa(ut, C, Kt, "", function(Wf) {
              return Wf;
            });
          } else ut != null && (pn(ut) && (ut.key && (!ze || ze.key !== ut.key) && Ir(ut.key), ut = Lt(
            ut,
            // Keep both the (mapped) and old keys if they differ, just as
            // traverseAllChildren used to do for objects as children
            N + // $FlowFixMe Flow incorrectly thinks React.Portal doesn't have a key
            (ut.key && (!ze || ze.key !== ut.key) ? (
              // $FlowFixMe Flow incorrectly thinks existing element's key can be a number
              // eslint-disable-next-line react-internal/safe-string-coercion
              Cr("" + ut.key) + "/"
            ) : "") + St
          )), C.push(ut));
          return 1;
        }
        var Bt, et, $t = 0, vn = A === "" ? nn : A + Xn;
        if (En(h))
          for (var El = 0; El < h.length; El++)
            Bt = h[El], et = vn + Rr(Bt, El), $t += fa(Bt, C, N, et, q);
        else {
          var Wo = it(h);
          if (typeof Wo == "function") {
            var Hi = h;
            Wo === Hi.entries && (Vt || Tt("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), Vt = !0);
            for (var Go = Wo.call(Hi), au, Qf = 0; !(au = Go.next()).done; )
              Bt = au.value, et = vn + Rr(Bt, Qf++), $t += fa(Bt, C, N, et, q);
          } else if (Le === "object") {
            var lc = String(h);
            throw new Error("Objects are not valid as a React child (found: " + (lc === "[object Object]" ? "object with keys {" + Object.keys(h).join(", ") + "}" : lc) + "). If you meant to render a collection of children, use an array instead.");
          }
        }
        return $t;
      }
      function ci(h, C, N) {
        if (h == null)
          return h;
        var A = [], q = 0;
        return fa(h, A, "", "", function(Le) {
          return C.call(N, Le, q++);
        }), A;
      }
      function $u(h) {
        var C = 0;
        return ci(h, function() {
          C++;
        }), C;
      }
      function cl(h, C, N) {
        ci(h, function() {
          C.apply(this, arguments);
        }, N);
      }
      function Kl(h) {
        return ci(h, function(C) {
          return C;
        }) || [];
      }
      function fl(h) {
        if (!pn(h))
          throw new Error("React.Children.only expected to receive a single React element child.");
        return h;
      }
      function dl(h) {
        var C = {
          $$typeof: pe,
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
        C.Provider = {
          $$typeof: Te,
          _context: C
        };
        var N = !1, A = !1, q = !1;
        {
          var Le = {
            $$typeof: pe,
            _context: C
          };
          Object.defineProperties(Le, {
            Provider: {
              get: function() {
                return A || (A = !0, ge("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?")), C.Provider;
              },
              set: function(re) {
                C.Provider = re;
              }
            },
            _currentValue: {
              get: function() {
                return C._currentValue;
              },
              set: function(re) {
                C._currentValue = re;
              }
            },
            _currentValue2: {
              get: function() {
                return C._currentValue2;
              },
              set: function(re) {
                C._currentValue2 = re;
              }
            },
            _threadCount: {
              get: function() {
                return C._threadCount;
              },
              set: function(re) {
                C._threadCount = re;
              }
            },
            Consumer: {
              get: function() {
                return N || (N = !0, ge("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?")), C.Consumer;
              }
            },
            displayName: {
              get: function() {
                return C.displayName;
              },
              set: function(re) {
                q || (Tt("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.", re), q = !0);
              }
            }
          }), C.Consumer = Le;
        }
        return C._currentRenderer = null, C._currentRenderer2 = null, C;
      }
      var Dr = -1, Qr = 0, rr = 1, fi = 2;
      function Wa(h) {
        if (h._status === Dr) {
          var C = h._result, N = C();
          if (N.then(function(Le) {
            if (h._status === Qr || h._status === Dr) {
              var re = h;
              re._status = rr, re._result = Le;
            }
          }, function(Le) {
            if (h._status === Qr || h._status === Dr) {
              var re = h;
              re._status = fi, re._result = Le;
            }
          }), h._status === Dr) {
            var A = h;
            A._status = Qr, A._result = N;
          }
        }
        if (h._status === rr) {
          var q = h._result;
          return q === void 0 && ge(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))

Did you accidentally put curly braces around the import?`, q), "default" in q || ge(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))`, q), q.default;
        } else
          throw h._result;
      }
      function R(h) {
        var C = {
          // We use these fields to store the result.
          _status: Dr,
          _result: h
        }, N = {
          $$typeof: Qe,
          _payload: C,
          _init: Wa
        };
        {
          var A, q;
          Object.defineProperties(N, {
            defaultProps: {
              configurable: !0,
              get: function() {
                return A;
              },
              set: function(Le) {
                ge("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), A = Le, Object.defineProperty(N, "defaultProps", {
                  enumerable: !0
                });
              }
            },
            propTypes: {
              configurable: !0,
              get: function() {
                return q;
              },
              set: function(Le) {
                ge("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), q = Le, Object.defineProperty(N, "propTypes", {
                  enumerable: !0
                });
              }
            }
          });
        }
        return N;
      }
      function $(h) {
        h != null && h.$$typeof === ce ? ge("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).") : typeof h != "function" ? ge("forwardRef requires a render function but was given %s.", h === null ? "null" : typeof h) : h.length !== 0 && h.length !== 2 && ge("forwardRef render functions accept exactly two parameters: props and ref. %s", h.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."), h != null && (h.defaultProps != null || h.propTypes != null) && ge("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
        var C = {
          $$typeof: jt,
          render: h
        };
        {
          var N;
          Object.defineProperty(C, "displayName", {
            enumerable: !1,
            configurable: !0,
            get: function() {
              return N;
            },
            set: function(A) {
              N = A, !h.name && !h.displayName && (h.displayName = A);
            }
          });
        }
        return C;
      }
      var J;
      J = Symbol.for("react.module.reference");
      function _e(h) {
        return !!(typeof h == "string" || typeof h == "function" || h === zt || h === dn || Ot || h === S || h === ae || h === we || be || h === pt || Gt || tn || Et || typeof h == "object" && h !== null && (h.$$typeof === Qe || h.$$typeof === ce || h.$$typeof === Te || h.$$typeof === pe || h.$$typeof === jt || // This needs to include all possible module reference object
        // types supported by any Flight configuration anywhere since
        // we don't know which Flight build this will end up being used
        // with.
        h.$$typeof === J || h.getModuleId !== void 0));
      }
      function ot(h, C) {
        _e(h) || ge("memo: The first argument must be a component. Instead received: %s", h === null ? "null" : typeof h);
        var N = {
          $$typeof: ce,
          type: h,
          compare: C === void 0 ? null : C
        };
        {
          var A;
          Object.defineProperty(N, "displayName", {
            enumerable: !1,
            configurable: !0,
            get: function() {
              return A;
            },
            set: function(q) {
              A = q, !h.name && !h.displayName && (h.displayName = q);
            }
          });
        }
        return N;
      }
      function Pe() {
        var h = We.current;
        return h === null && ge(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`), h;
      }
      function Be(h) {
        var C = Pe();
        if (h._context !== void 0) {
          var N = h._context;
          N.Consumer === h ? ge("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?") : N.Provider === h && ge("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
        }
        return C.useContext(h);
      }
      function Oe(h) {
        var C = Pe();
        return C.useState(h);
      }
      function On(h, C, N) {
        var A = Pe();
        return A.useReducer(h, C, N);
      }
      function rn(h) {
        var C = Pe();
        return C.useRef(h);
      }
      function Xt(h, C) {
        var N = Pe();
        return N.useEffect(h, C);
      }
      function ar(h, C) {
        var N = Pe();
        return N.useInsertionEffect(h, C);
      }
      function Ga(h, C) {
        var N = Pe();
        return N.useLayoutEffect(h, C);
      }
      function wa(h, C) {
        var N = Pe();
        return N.useCallback(h, C);
      }
      function $n(h, C) {
        var N = Pe();
        return N.useMemo(h, C);
      }
      function Zl(h, C, N) {
        var A = Pe();
        return A.useImperativeHandle(h, C, N);
      }
      function Mt(h, C) {
        {
          var N = Pe();
          return N.useDebugValue(h, C);
        }
      }
      function rt() {
        var h = Pe();
        return h.useTransition();
      }
      function Ai(h) {
        var C = Pe();
        return C.useDeferredValue(h);
      }
      function Bo() {
        var h = Pe();
        return h.useId();
      }
      function Jl(h, C, N) {
        var A = Pe();
        return A.useSyncExternalStore(h, C, N);
      }
      var pl = 0, Yu, vl, Wr, $o, kr, ac, ic;
      function Iu() {
      }
      Iu.__reactDisabledLog = !0;
      function hl() {
        {
          if (pl === 0) {
            Yu = console.log, vl = console.info, Wr = console.warn, $o = console.error, kr = console.group, ac = console.groupCollapsed, ic = console.groupEnd;
            var h = {
              configurable: !0,
              enumerable: !0,
              value: Iu,
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
          pl++;
        }
      }
      function da() {
        {
          if (pl--, pl === 0) {
            var h = {
              configurable: !0,
              enumerable: !0,
              writable: !0
            };
            Object.defineProperties(console, {
              log: V({}, h, {
                value: Yu
              }),
              info: V({}, h, {
                value: vl
              }),
              warn: V({}, h, {
                value: Wr
              }),
              error: V({}, h, {
                value: $o
              }),
              group: V({}, h, {
                value: kr
              }),
              groupCollapsed: V({}, h, {
                value: ac
              }),
              groupEnd: V({}, h, {
                value: ic
              })
            });
          }
          pl < 0 && ge("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
        }
      }
      var qa = Ct.ReactCurrentDispatcher, Xa;
      function Qu(h, C, N) {
        {
          if (Xa === void 0)
            try {
              throw Error();
            } catch (q) {
              var A = q.stack.trim().match(/\n( *(at )?)/);
              Xa = A && A[1] || "";
            }
          return `
` + Xa + h;
        }
      }
      var eu = !1, ml;
      {
        var Wu = typeof WeakMap == "function" ? WeakMap : Map;
        ml = new Wu();
      }
      function Gu(h, C) {
        if (!h || eu)
          return "";
        {
          var N = ml.get(h);
          if (N !== void 0)
            return N;
        }
        var A;
        eu = !0;
        var q = Error.prepareStackTrace;
        Error.prepareStackTrace = void 0;
        var Le;
        Le = qa.current, qa.current = null, hl();
        try {
          if (C) {
            var re = function() {
              throw Error();
            };
            if (Object.defineProperty(re.prototype, "props", {
              set: function() {
                throw Error();
              }
            }), typeof Reflect == "object" && Reflect.construct) {
              try {
                Reflect.construct(re, []);
              } catch (vn) {
                A = vn;
              }
              Reflect.construct(h, [], re);
            } else {
              try {
                re.call();
              } catch (vn) {
                A = vn;
              }
              h.call(re.prototype);
            }
          } else {
            try {
              throw Error();
            } catch (vn) {
              A = vn;
            }
            h();
          }
        } catch (vn) {
          if (vn && A && typeof vn.stack == "string") {
            for (var ze = vn.stack.split(`
`), ut = A.stack.split(`
`), St = ze.length - 1, Kt = ut.length - 1; St >= 1 && Kt >= 0 && ze[St] !== ut[Kt]; )
              Kt--;
            for (; St >= 1 && Kt >= 0; St--, Kt--)
              if (ze[St] !== ut[Kt]) {
                if (St !== 1 || Kt !== 1)
                  do
                    if (St--, Kt--, Kt < 0 || ze[St] !== ut[Kt]) {
                      var Bt = `
` + ze[St].replace(" at new ", " at ");
                      return h.displayName && Bt.includes("<anonymous>") && (Bt = Bt.replace("<anonymous>", h.displayName)), typeof h == "function" && ml.set(h, Bt), Bt;
                    }
                  while (St >= 1 && Kt >= 0);
                break;
              }
          }
        } finally {
          eu = !1, qa.current = Le, da(), Error.prepareStackTrace = q;
        }
        var et = h ? h.displayName || h.name : "", $t = et ? Qu(et) : "";
        return typeof h == "function" && ml.set(h, $t), $t;
      }
      function Fi(h, C, N) {
        return Gu(h, !1);
      }
      function Yf(h) {
        var C = h.prototype;
        return !!(C && C.isReactComponent);
      }
      function ji(h, C, N) {
        if (h == null)
          return "";
        if (typeof h == "function")
          return Gu(h, Yf(h));
        if (typeof h == "string")
          return Qu(h);
        switch (h) {
          case ae:
            return Qu("Suspense");
          case we:
            return Qu("SuspenseList");
        }
        if (typeof h == "object")
          switch (h.$$typeof) {
            case jt:
              return Fi(h.render);
            case ce:
              return ji(h.type, C, N);
            case Qe: {
              var A = h, q = A._payload, Le = A._init;
              try {
                return ji(Le(q), C, N);
              } catch {
              }
            }
          }
        return "";
      }
      var wt = {}, qu = Ct.ReactDebugCurrentFrame;
      function gt(h) {
        if (h) {
          var C = h._owner, N = ji(h.type, h._source, C ? C.type : null);
          qu.setExtraStackFrame(N);
        } else
          qu.setExtraStackFrame(null);
      }
      function Yo(h, C, N, A, q) {
        {
          var Le = Function.call.bind(Cn);
          for (var re in h)
            if (Le(h, re)) {
              var ze = void 0;
              try {
                if (typeof h[re] != "function") {
                  var ut = Error((A || "React class") + ": " + N + " type `" + re + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof h[re] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                  throw ut.name = "Invariant Violation", ut;
                }
                ze = h[re](C, re, A, N, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
              } catch (St) {
                ze = St;
              }
              ze && !(ze instanceof Error) && (gt(q), ge("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", A || "React class", N, re, typeof ze), gt(null)), ze instanceof Error && !(ze.message in wt) && (wt[ze.message] = !0, gt(q), ge("Failed %s type: %s", N, ze.message), gt(null));
            }
        }
      }
      function di(h) {
        if (h) {
          var C = h._owner, N = ji(h.type, h._source, C ? C.type : null);
          Ut(N);
        } else
          Ut(null);
      }
      var Ye;
      Ye = !1;
      function Xu() {
        if (lt.current) {
          var h = qn(lt.current.type);
          if (h)
            return `

Check the render method of \`` + h + "`.";
        }
        return "";
      }
      function ir(h) {
        if (h !== void 0) {
          var C = h.fileName.replace(/^.*[\\\/]/, ""), N = h.lineNumber;
          return `

Check your code at ` + C + ":" + N + ".";
        }
        return "";
      }
      function pi(h) {
        return h != null ? ir(h.__source) : "";
      }
      var Or = {};
      function vi(h) {
        var C = Xu();
        if (!C) {
          var N = typeof h == "string" ? h : h.displayName || h.name;
          N && (C = `

Check the top-level render call using <` + N + ">.");
        }
        return C;
      }
      function an(h, C) {
        if (!(!h._store || h._store.validated || h.key != null)) {
          h._store.validated = !0;
          var N = vi(C);
          if (!Or[N]) {
            Or[N] = !0;
            var A = "";
            h && h._owner && h._owner !== lt.current && (A = " It was passed a child from " + qn(h._owner.type) + "."), di(h), ge('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', N, A), di(null);
          }
        }
      }
      function Pt(h, C) {
        if (typeof h == "object") {
          if (En(h))
            for (var N = 0; N < h.length; N++) {
              var A = h[N];
              pn(A) && an(A, C);
            }
          else if (pn(h))
            h._store && (h._store.validated = !0);
          else if (h) {
            var q = it(h);
            if (typeof q == "function" && q !== h.entries)
              for (var Le = q.call(h), re; !(re = Le.next()).done; )
                pn(re.value) && an(re.value, C);
          }
        }
      }
      function yl(h) {
        {
          var C = h.type;
          if (C == null || typeof C == "string")
            return;
          var N;
          if (typeof C == "function")
            N = C.propTypes;
          else if (typeof C == "object" && (C.$$typeof === jt || // Note: Memo only checks outer props here.
          // Inner props are checked in the reconciler.
          C.$$typeof === ce))
            N = C.propTypes;
          else
            return;
          if (N) {
            var A = qn(C);
            Yo(N, h.props, "prop", A, h);
          } else if (C.PropTypes !== void 0 && !Ye) {
            Ye = !0;
            var q = qn(C);
            ge("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", q || "Unknown");
          }
          typeof C.getDefaultProps == "function" && !C.getDefaultProps.isReactClassApproved && ge("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
        }
      }
      function Yn(h) {
        {
          for (var C = Object.keys(h.props), N = 0; N < C.length; N++) {
            var A = C[N];
            if (A !== "children" && A !== "key") {
              di(h), ge("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", A), di(null);
              break;
            }
          }
          h.ref !== null && (di(h), ge("Invalid attribute `ref` supplied to `React.Fragment`."), di(null));
        }
      }
      function Lr(h, C, N) {
        var A = _e(h);
        if (!A) {
          var q = "";
          (h === void 0 || typeof h == "object" && h !== null && Object.keys(h).length === 0) && (q += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var Le = pi(C);
          Le ? q += Le : q += Xu();
          var re;
          h === null ? re = "null" : En(h) ? re = "array" : h !== void 0 && h.$$typeof === Jt ? (re = "<" + (qn(h.type) || "Unknown") + " />", q = " Did you accidentally export a JSX literal instead of a component?") : re = typeof h, ge("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", re, q);
        }
        var ze = Je.apply(this, arguments);
        if (ze == null)
          return ze;
        if (A)
          for (var ut = 2; ut < arguments.length; ut++)
            Pt(arguments[ut], h);
        return h === zt ? Yn(ze) : yl(ze), ze;
      }
      var xa = !1;
      function tu(h) {
        var C = Lr.bind(null, h);
        return C.type = h, xa || (xa = !0, Tt("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.")), Object.defineProperty(C, "type", {
          enumerable: !1,
          get: function() {
            return Tt("Factory.type is deprecated. Access the class directly before passing it to createFactory."), Object.defineProperty(this, "type", {
              value: h
            }), h;
          }
        }), C;
      }
      function Io(h, C, N) {
        for (var A = qt.apply(this, arguments), q = 2; q < arguments.length; q++)
          Pt(arguments[q], A.type);
        return yl(A), A;
      }
      function Qo(h, C) {
        var N = ct.transition;
        ct.transition = {};
        var A = ct.transition;
        ct.transition._updatedFibers = /* @__PURE__ */ new Set();
        try {
          h();
        } finally {
          if (ct.transition = N, N === null && A._updatedFibers) {
            var q = A._updatedFibers.size;
            q > 10 && Tt("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), A._updatedFibers.clear();
          }
        }
      }
      var gl = !1, nu = null;
      function If(h) {
        if (nu === null)
          try {
            var C = ("require" + Math.random()).slice(0, 7), N = te && te[C];
            nu = N.call(te, "timers").setImmediate;
          } catch {
            nu = function(q) {
              gl === !1 && (gl = !0, typeof MessageChannel > "u" && ge("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));
              var Le = new MessageChannel();
              Le.port1.onmessage = q, Le.port2.postMessage(void 0);
            };
          }
        return nu(h);
      }
      var ba = 0, Ka = !1;
      function hi(h) {
        {
          var C = ba;
          ba++, xe.current === null && (xe.current = []);
          var N = xe.isBatchingLegacy, A;
          try {
            if (xe.isBatchingLegacy = !0, A = h(), !N && xe.didScheduleLegacyUpdate) {
              var q = xe.current;
              q !== null && (xe.didScheduleLegacyUpdate = !1, Sl(q));
            }
          } catch (et) {
            throw _a(C), et;
          } finally {
            xe.isBatchingLegacy = N;
          }
          if (A !== null && typeof A == "object" && typeof A.then == "function") {
            var Le = A, re = !1, ze = {
              then: function(et, $t) {
                re = !0, Le.then(function(vn) {
                  _a(C), ba === 0 ? Ku(vn, et, $t) : et(vn);
                }, function(vn) {
                  _a(C), $t(vn);
                });
              }
            };
            return !Ka && typeof Promise < "u" && Promise.resolve().then(function() {
            }).then(function() {
              re || (Ka = !0, ge("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"));
            }), ze;
          } else {
            var ut = A;
            if (_a(C), ba === 0) {
              var St = xe.current;
              St !== null && (Sl(St), xe.current = null);
              var Kt = {
                then: function(et, $t) {
                  xe.current === null ? (xe.current = [], Ku(ut, et, $t)) : et(ut);
                }
              };
              return Kt;
            } else {
              var Bt = {
                then: function(et, $t) {
                  et(ut);
                }
              };
              return Bt;
            }
          }
        }
      }
      function _a(h) {
        h !== ba - 1 && ge("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "), ba = h;
      }
      function Ku(h, C, N) {
        {
          var A = xe.current;
          if (A !== null)
            try {
              Sl(A), If(function() {
                A.length === 0 ? (xe.current = null, C(h)) : Ku(h, C, N);
              });
            } catch (q) {
              N(q);
            }
          else
            C(h);
        }
      }
      var Zu = !1;
      function Sl(h) {
        if (!Zu) {
          Zu = !0;
          var C = 0;
          try {
            for (; C < h.length; C++) {
              var N = h[C];
              do
                N = N(!0);
              while (N !== null);
            }
            h.length = 0;
          } catch (A) {
            throw h = h.slice(C + 1), A;
          } finally {
            Zu = !1;
          }
        }
      }
      var ru = Lr, Ju = Io, eo = tu, Za = {
        map: ci,
        forEach: cl,
        count: $u,
        toArray: Kl,
        only: fl
      };
      Z.Children = Za, Z.Component = Ae, Z.Fragment = zt, Z.Profiler = dn, Z.PureComponent = nt, Z.StrictMode = S, Z.Suspense = ae, Z.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Ct, Z.act = hi, Z.cloneElement = Ju, Z.createContext = dl, Z.createElement = ru, Z.createFactory = eo, Z.createRef = Dn, Z.forwardRef = $, Z.isValidElement = pn, Z.lazy = R, Z.memo = ot, Z.startTransition = Qo, Z.unstable_act = hi, Z.useCallback = wa, Z.useContext = Be, Z.useDebugValue = Mt, Z.useDeferredValue = Ai, Z.useEffect = Xt, Z.useId = Bo, Z.useImperativeHandle = Zl, Z.useInsertionEffect = ar, Z.useLayoutEffect = Ga, Z.useMemo = $n, Z.useReducer = On, Z.useRef = rn, Z.useState = Oe, Z.useSyncExternalStore = Jl, Z.useTransition = rt, Z.version = F, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
    }();
  }(qp, qp.exports)), qp.exports;
}
process.env.NODE_ENV === "production" ? cE.exports = q_() : cE.exports = X_();
var vE = cE.exports;
/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var ZR;
function K_() {
  return ZR || (ZR = 1, process.env.NODE_ENV !== "production" && function() {
    var te = vE, Z = Symbol.for("react.element"), F = Symbol.for("react.portal"), Jt = Symbol.for("react.fragment"), Nt = Symbol.for("react.strict_mode"), zt = Symbol.for("react.profiler"), S = Symbol.for("react.provider"), dn = Symbol.for("react.context"), Te = Symbol.for("react.forward_ref"), pe = Symbol.for("react.suspense"), jt = Symbol.for("react.suspense_list"), ae = Symbol.for("react.memo"), we = Symbol.for("react.lazy"), ce = Symbol.for("react.offscreen"), Qe = Symbol.iterator, pt = "@@iterator";
    function st(R) {
      if (R === null || typeof R != "object")
        return null;
      var $ = Qe && R[Qe] || R[pt];
      return typeof $ == "function" ? $ : null;
    }
    var un = te.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function it(R) {
      {
        for (var $ = arguments.length, J = new Array($ > 1 ? $ - 1 : 0), _e = 1; _e < $; _e++)
          J[_e - 1] = arguments[_e];
        We("error", R, J);
      }
    }
    function We(R, $, J) {
      {
        var _e = un.ReactDebugCurrentFrame, ot = _e.getStackAddendum();
        ot !== "" && ($ += "%s", J = J.concat([ot]));
        var Pe = J.map(function(Be) {
          return String(Be);
        });
        Pe.unshift("Warning: " + $), Function.prototype.apply.call(console[R], console, Pe);
      }
    }
    var ct = !1, xe = !1, lt = !1, je = !1, en = !1, Ut;
    Ut = Symbol.for("react.module.reference");
    function Gt(R) {
      return !!(typeof R == "string" || typeof R == "function" || R === Jt || R === zt || en || R === Nt || R === pe || R === jt || je || R === ce || ct || xe || lt || typeof R == "object" && R !== null && (R.$$typeof === we || R.$$typeof === ae || R.$$typeof === S || R.$$typeof === dn || R.$$typeof === Te || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      R.$$typeof === Ut || R.getModuleId !== void 0));
    }
    function tn(R, $, J) {
      var _e = R.displayName;
      if (_e)
        return _e;
      var ot = $.displayName || $.name || "";
      return ot !== "" ? J + "(" + ot + ")" : J;
    }
    function Et(R) {
      return R.displayName || "Context";
    }
    function be(R) {
      if (R == null)
        return null;
      if (typeof R.tag == "number" && it("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof R == "function")
        return R.displayName || R.name || null;
      if (typeof R == "string")
        return R;
      switch (R) {
        case Jt:
          return "Fragment";
        case F:
          return "Portal";
        case zt:
          return "Profiler";
        case Nt:
          return "StrictMode";
        case pe:
          return "Suspense";
        case jt:
          return "SuspenseList";
      }
      if (typeof R == "object")
        switch (R.$$typeof) {
          case dn:
            var $ = R;
            return Et($) + ".Consumer";
          case S:
            var J = R;
            return Et(J._context) + ".Provider";
          case Te:
            return tn(R, R.render, "ForwardRef");
          case ae:
            var _e = R.displayName || null;
            return _e !== null ? _e : be(R.type) || "Memo";
          case we: {
            var ot = R, Pe = ot._payload, Be = ot._init;
            try {
              return be(Be(Pe));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var Ot = Object.assign, Ct = 0, Tt, ge, X, Ee, ne, _, V;
    function He() {
    }
    He.__reactDisabledLog = !0;
    function Ae() {
      {
        if (Ct === 0) {
          Tt = console.log, ge = console.info, X = console.warn, Ee = console.error, ne = console.group, _ = console.groupCollapsed, V = console.groupEnd;
          var R = {
            configurable: !0,
            enumerable: !0,
            value: He,
            writable: !0
          };
          Object.defineProperties(console, {
            info: R,
            log: R,
            warn: R,
            error: R,
            group: R,
            groupCollapsed: R,
            groupEnd: R
          });
        }
        Ct++;
      }
    }
    function tt() {
      {
        if (Ct--, Ct === 0) {
          var R = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: Ot({}, R, {
              value: Tt
            }),
            info: Ot({}, R, {
              value: ge
            }),
            warn: Ot({}, R, {
              value: X
            }),
            error: Ot({}, R, {
              value: Ee
            }),
            group: Ot({}, R, {
              value: ne
            }),
            groupCollapsed: Ot({}, R, {
              value: _
            }),
            groupEnd: Ot({}, R, {
              value: V
            })
          });
        }
        Ct < 0 && it("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var Ke = un.ReactCurrentDispatcher, Xe;
    function Ze(R, $, J) {
      {
        if (Xe === void 0)
          try {
            throw Error();
          } catch (ot) {
            var _e = ot.stack.trim().match(/\n( *(at )?)/);
            Xe = _e && _e[1] || "";
          }
        return `
` + Xe + R;
      }
    }
    var nt = !1, Ht;
    {
      var Dn = typeof WeakMap == "function" ? WeakMap : Map;
      Ht = new Dn();
    }
    function _r(R, $) {
      if (!R || nt)
        return "";
      {
        var J = Ht.get(R);
        if (J !== void 0)
          return J;
      }
      var _e;
      nt = !0;
      var ot = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var Pe;
      Pe = Ke.current, Ke.current = null, Ae();
      try {
        if ($) {
          var Be = function() {
            throw Error();
          };
          if (Object.defineProperty(Be.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(Be, []);
            } catch ($n) {
              _e = $n;
            }
            Reflect.construct(R, [], Be);
          } else {
            try {
              Be.call();
            } catch ($n) {
              _e = $n;
            }
            R.call(Be.prototype);
          }
        } else {
          try {
            throw Error();
          } catch ($n) {
            _e = $n;
          }
          R();
        }
      } catch ($n) {
        if ($n && _e && typeof $n.stack == "string") {
          for (var Oe = $n.stack.split(`
`), On = _e.stack.split(`
`), rn = Oe.length - 1, Xt = On.length - 1; rn >= 1 && Xt >= 0 && Oe[rn] !== On[Xt]; )
            Xt--;
          for (; rn >= 1 && Xt >= 0; rn--, Xt--)
            if (Oe[rn] !== On[Xt]) {
              if (rn !== 1 || Xt !== 1)
                do
                  if (rn--, Xt--, Xt < 0 || Oe[rn] !== On[Xt]) {
                    var ar = `
` + Oe[rn].replace(" at new ", " at ");
                    return R.displayName && ar.includes("<anonymous>") && (ar = ar.replace("<anonymous>", R.displayName)), typeof R == "function" && Ht.set(R, ar), ar;
                  }
                while (rn >= 1 && Xt >= 0);
              break;
            }
        }
      } finally {
        nt = !1, Ke.current = Pe, tt(), Error.prepareStackTrace = ot;
      }
      var Ga = R ? R.displayName || R.name : "", wa = Ga ? Ze(Ga) : "";
      return typeof R == "function" && Ht.set(R, wa), wa;
    }
    function En(R, $, J) {
      return _r(R, !1);
    }
    function nr(R) {
      var $ = R.prototype;
      return !!($ && $.isReactComponent);
    }
    function Vn(R, $, J) {
      if (R == null)
        return "";
      if (typeof R == "function")
        return _r(R, nr(R));
      if (typeof R == "string")
        return Ze(R);
      switch (R) {
        case pe:
          return Ze("Suspense");
        case jt:
          return Ze("SuspenseList");
      }
      if (typeof R == "object")
        switch (R.$$typeof) {
          case Te:
            return En(R.render);
          case ae:
            return Vn(R.type, $, J);
          case we: {
            var _e = R, ot = _e._payload, Pe = _e._init;
            try {
              return Vn(Pe(ot), $, J);
            } catch {
            }
          }
        }
      return "";
    }
    var Pn = Object.prototype.hasOwnProperty, Ir = {}, oi = un.ReactDebugCurrentFrame;
    function ca(R) {
      if (R) {
        var $ = R._owner, J = Vn(R.type, R._source, $ ? $.type : null);
        oi.setExtraStackFrame(J);
      } else
        oi.setExtraStackFrame(null);
    }
    function qn(R, $, J, _e, ot) {
      {
        var Pe = Function.call.bind(Pn);
        for (var Be in R)
          if (Pe(R, Be)) {
            var Oe = void 0;
            try {
              if (typeof R[Be] != "function") {
                var On = Error((_e || "React class") + ": " + J + " type `" + Be + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof R[Be] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw On.name = "Invariant Violation", On;
              }
              Oe = R[Be]($, Be, _e, J, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (rn) {
              Oe = rn;
            }
            Oe && !(Oe instanceof Error) && (ca(ot), it("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", _e || "React class", J, Be, typeof Oe), ca(null)), Oe instanceof Error && !(Oe.message in Ir) && (Ir[Oe.message] = !0, ca(ot), it("Failed %s type: %s", J, Oe.message), ca(null));
          }
      }
    }
    var Cn = Array.isArray;
    function Bn(R) {
      return Cn(R);
    }
    function gr(R) {
      {
        var $ = typeof Symbol == "function" && Symbol.toStringTag, J = $ && R[Symbol.toStringTag] || R.constructor.name || "Object";
        return J;
      }
    }
    function Ia(R) {
      try {
        return kn(R), !1;
      } catch {
        return !0;
      }
    }
    function kn(R) {
      return "" + R;
    }
    function Sr(R) {
      if (Ia(R))
        return it("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", gr(R)), kn(R);
    }
    var Er = un.ReactCurrentOwner, Qa = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, si, K, Se;
    Se = {};
    function Je(R) {
      if (Pn.call(R, "ref")) {
        var $ = Object.getOwnPropertyDescriptor(R, "ref").get;
        if ($ && $.isReactWarning)
          return !1;
      }
      return R.ref !== void 0;
    }
    function Lt(R) {
      if (Pn.call(R, "key")) {
        var $ = Object.getOwnPropertyDescriptor(R, "key").get;
        if ($ && $.isReactWarning)
          return !1;
      }
      return R.key !== void 0;
    }
    function qt(R, $) {
      if (typeof R.ref == "string" && Er.current && $ && Er.current.stateNode !== $) {
        var J = be(Er.current.type);
        Se[J] || (it('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', be(Er.current.type), R.ref), Se[J] = !0);
      }
    }
    function pn(R, $) {
      {
        var J = function() {
          si || (si = !0, it("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", $));
        };
        J.isReactWarning = !0, Object.defineProperty(R, "key", {
          get: J,
          configurable: !0
        });
      }
    }
    function nn(R, $) {
      {
        var J = function() {
          K || (K = !0, it("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", $));
        };
        J.isReactWarning = !0, Object.defineProperty(R, "ref", {
          get: J,
          configurable: !0
        });
      }
    }
    var Xn = function(R, $, J, _e, ot, Pe, Be) {
      var Oe = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: Z,
        // Built-in properties that belong on the element
        type: R,
        key: $,
        ref: J,
        props: Be,
        // Record the component responsible for creating this element.
        _owner: Pe
      };
      return Oe._store = {}, Object.defineProperty(Oe._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(Oe, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: _e
      }), Object.defineProperty(Oe, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: ot
      }), Object.freeze && (Object.freeze(Oe.props), Object.freeze(Oe)), Oe;
    };
    function on(R, $, J, _e, ot) {
      {
        var Pe, Be = {}, Oe = null, On = null;
        J !== void 0 && (Sr(J), Oe = "" + J), Lt($) && (Sr($.key), Oe = "" + $.key), Je($) && (On = $.ref, qt($, ot));
        for (Pe in $)
          Pn.call($, Pe) && !Qa.hasOwnProperty(Pe) && (Be[Pe] = $[Pe]);
        if (R && R.defaultProps) {
          var rn = R.defaultProps;
          for (Pe in rn)
            Be[Pe] === void 0 && (Be[Pe] = rn[Pe]);
        }
        if (Oe || On) {
          var Xt = typeof R == "function" ? R.displayName || R.name || "Unknown" : R;
          Oe && pn(Be, Xt), On && nn(Be, Xt);
        }
        return Xn(R, Oe, On, ot, _e, Er.current, Be);
      }
    }
    var Vt = un.ReactCurrentOwner, sn = un.ReactDebugCurrentFrame;
    function Cr(R) {
      if (R) {
        var $ = R._owner, J = Vn(R.type, R._source, $ ? $.type : null);
        sn.setExtraStackFrame(J);
      } else
        sn.setExtraStackFrame(null);
    }
    var Rr;
    Rr = !1;
    function fa(R) {
      return typeof R == "object" && R !== null && R.$$typeof === Z;
    }
    function ci() {
      {
        if (Vt.current) {
          var R = be(Vt.current.type);
          if (R)
            return `

Check the render method of \`` + R + "`.";
        }
        return "";
      }
    }
    function $u(R) {
      {
        if (R !== void 0) {
          var $ = R.fileName.replace(/^.*[\\\/]/, ""), J = R.lineNumber;
          return `

Check your code at ` + $ + ":" + J + ".";
        }
        return "";
      }
    }
    var cl = {};
    function Kl(R) {
      {
        var $ = ci();
        if (!$) {
          var J = typeof R == "string" ? R : R.displayName || R.name;
          J && ($ = `

Check the top-level render call using <` + J + ">.");
        }
        return $;
      }
    }
    function fl(R, $) {
      {
        if (!R._store || R._store.validated || R.key != null)
          return;
        R._store.validated = !0;
        var J = Kl($);
        if (cl[J])
          return;
        cl[J] = !0;
        var _e = "";
        R && R._owner && R._owner !== Vt.current && (_e = " It was passed a child from " + be(R._owner.type) + "."), Cr(R), it('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', J, _e), Cr(null);
      }
    }
    function dl(R, $) {
      {
        if (typeof R != "object")
          return;
        if (Bn(R))
          for (var J = 0; J < R.length; J++) {
            var _e = R[J];
            fa(_e) && fl(_e, $);
          }
        else if (fa(R))
          R._store && (R._store.validated = !0);
        else if (R) {
          var ot = st(R);
          if (typeof ot == "function" && ot !== R.entries)
            for (var Pe = ot.call(R), Be; !(Be = Pe.next()).done; )
              fa(Be.value) && fl(Be.value, $);
        }
      }
    }
    function Dr(R) {
      {
        var $ = R.type;
        if ($ == null || typeof $ == "string")
          return;
        var J;
        if (typeof $ == "function")
          J = $.propTypes;
        else if (typeof $ == "object" && ($.$$typeof === Te || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        $.$$typeof === ae))
          J = $.propTypes;
        else
          return;
        if (J) {
          var _e = be($);
          qn(J, R.props, "prop", _e, R);
        } else if ($.PropTypes !== void 0 && !Rr) {
          Rr = !0;
          var ot = be($);
          it("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", ot || "Unknown");
        }
        typeof $.getDefaultProps == "function" && !$.getDefaultProps.isReactClassApproved && it("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function Qr(R) {
      {
        for (var $ = Object.keys(R.props), J = 0; J < $.length; J++) {
          var _e = $[J];
          if (_e !== "children" && _e !== "key") {
            Cr(R), it("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", _e), Cr(null);
            break;
          }
        }
        R.ref !== null && (Cr(R), it("Invalid attribute `ref` supplied to `React.Fragment`."), Cr(null));
      }
    }
    var rr = {};
    function fi(R, $, J, _e, ot, Pe) {
      {
        var Be = Gt(R);
        if (!Be) {
          var Oe = "";
          (R === void 0 || typeof R == "object" && R !== null && Object.keys(R).length === 0) && (Oe += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var On = $u(ot);
          On ? Oe += On : Oe += ci();
          var rn;
          R === null ? rn = "null" : Bn(R) ? rn = "array" : R !== void 0 && R.$$typeof === Z ? (rn = "<" + (be(R.type) || "Unknown") + " />", Oe = " Did you accidentally export a JSX literal instead of a component?") : rn = typeof R, it("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", rn, Oe);
        }
        var Xt = on(R, $, J, ot, Pe);
        if (Xt == null)
          return Xt;
        if (Be) {
          var ar = $.children;
          if (ar !== void 0)
            if (_e)
              if (Bn(ar)) {
                for (var Ga = 0; Ga < ar.length; Ga++)
                  dl(ar[Ga], R);
                Object.freeze && Object.freeze(ar);
              } else
                it("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              dl(ar, R);
        }
        if (Pn.call($, "key")) {
          var wa = be(R), $n = Object.keys($).filter(function(rt) {
            return rt !== "key";
          }), Zl = $n.length > 0 ? "{key: someKey, " + $n.join(": ..., ") + ": ...}" : "{key: someKey}";
          if (!rr[wa + Zl]) {
            var Mt = $n.length > 0 ? "{" + $n.join(": ..., ") + ": ...}" : "{}";
            it(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, Zl, wa, Mt, wa), rr[wa + Zl] = !0;
          }
        }
        return R === Jt ? Qr(Xt) : Dr(Xt), Xt;
      }
    }
    var Wa = fi;
    Bm.Fragment = Jt, Bm.jsxDEV = Wa;
  }()), Bm;
}
process.env.NODE_ENV === "production" ? sE.exports = G_() : sE.exports = K_();
var fE = sE.exports, dE = { exports: {} }, $a = {}, $m = { exports: {} }, uE = {};
/**
 * @license React
 * scheduler.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var JR;
function Z_() {
  return JR || (JR = 1, function(te) {
    function Z(X, Ee) {
      var ne = X.length;
      X.push(Ee);
      e: for (; 0 < ne; ) {
        var _ = ne - 1 >>> 1, V = X[_];
        if (0 < Nt(V, Ee)) X[_] = Ee, X[ne] = V, ne = _;
        else break e;
      }
    }
    function F(X) {
      return X.length === 0 ? null : X[0];
    }
    function Jt(X) {
      if (X.length === 0) return null;
      var Ee = X[0], ne = X.pop();
      if (ne !== Ee) {
        X[0] = ne;
        e: for (var _ = 0, V = X.length, He = V >>> 1; _ < He; ) {
          var Ae = 2 * (_ + 1) - 1, tt = X[Ae], Ke = Ae + 1, Xe = X[Ke];
          if (0 > Nt(tt, ne)) Ke < V && 0 > Nt(Xe, tt) ? (X[_] = Xe, X[Ke] = ne, _ = Ke) : (X[_] = tt, X[Ae] = ne, _ = Ae);
          else if (Ke < V && 0 > Nt(Xe, ne)) X[_] = Xe, X[Ke] = ne, _ = Ke;
          else break e;
        }
      }
      return Ee;
    }
    function Nt(X, Ee) {
      var ne = X.sortIndex - Ee.sortIndex;
      return ne !== 0 ? ne : X.id - Ee.id;
    }
    if (typeof performance == "object" && typeof performance.now == "function") {
      var zt = performance;
      te.unstable_now = function() {
        return zt.now();
      };
    } else {
      var S = Date, dn = S.now();
      te.unstable_now = function() {
        return S.now() - dn;
      };
    }
    var Te = [], pe = [], jt = 1, ae = null, we = 3, ce = !1, Qe = !1, pt = !1, st = typeof setTimeout == "function" ? setTimeout : null, un = typeof clearTimeout == "function" ? clearTimeout : null, it = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function We(X) {
      for (var Ee = F(pe); Ee !== null; ) {
        if (Ee.callback === null) Jt(pe);
        else if (Ee.startTime <= X) Jt(pe), Ee.sortIndex = Ee.expirationTime, Z(Te, Ee);
        else break;
        Ee = F(pe);
      }
    }
    function ct(X) {
      if (pt = !1, We(X), !Qe) if (F(Te) !== null) Qe = !0, Tt(xe);
      else {
        var Ee = F(pe);
        Ee !== null && ge(ct, Ee.startTime - X);
      }
    }
    function xe(X, Ee) {
      Qe = !1, pt && (pt = !1, un(en), en = -1), ce = !0;
      var ne = we;
      try {
        for (We(Ee), ae = F(Te); ae !== null && (!(ae.expirationTime > Ee) || X && !tn()); ) {
          var _ = ae.callback;
          if (typeof _ == "function") {
            ae.callback = null, we = ae.priorityLevel;
            var V = _(ae.expirationTime <= Ee);
            Ee = te.unstable_now(), typeof V == "function" ? ae.callback = V : ae === F(Te) && Jt(Te), We(Ee);
          } else Jt(Te);
          ae = F(Te);
        }
        if (ae !== null) var He = !0;
        else {
          var Ae = F(pe);
          Ae !== null && ge(ct, Ae.startTime - Ee), He = !1;
        }
        return He;
      } finally {
        ae = null, we = ne, ce = !1;
      }
    }
    var lt = !1, je = null, en = -1, Ut = 5, Gt = -1;
    function tn() {
      return !(te.unstable_now() - Gt < Ut);
    }
    function Et() {
      if (je !== null) {
        var X = te.unstable_now();
        Gt = X;
        var Ee = !0;
        try {
          Ee = je(!0, X);
        } finally {
          Ee ? be() : (lt = !1, je = null);
        }
      } else lt = !1;
    }
    var be;
    if (typeof it == "function") be = function() {
      it(Et);
    };
    else if (typeof MessageChannel < "u") {
      var Ot = new MessageChannel(), Ct = Ot.port2;
      Ot.port1.onmessage = Et, be = function() {
        Ct.postMessage(null);
      };
    } else be = function() {
      st(Et, 0);
    };
    function Tt(X) {
      je = X, lt || (lt = !0, be());
    }
    function ge(X, Ee) {
      en = st(function() {
        X(te.unstable_now());
      }, Ee);
    }
    te.unstable_IdlePriority = 5, te.unstable_ImmediatePriority = 1, te.unstable_LowPriority = 4, te.unstable_NormalPriority = 3, te.unstable_Profiling = null, te.unstable_UserBlockingPriority = 2, te.unstable_cancelCallback = function(X) {
      X.callback = null;
    }, te.unstable_continueExecution = function() {
      Qe || ce || (Qe = !0, Tt(xe));
    }, te.unstable_forceFrameRate = function(X) {
      0 > X || 125 < X ? console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported") : Ut = 0 < X ? Math.floor(1e3 / X) : 5;
    }, te.unstable_getCurrentPriorityLevel = function() {
      return we;
    }, te.unstable_getFirstCallbackNode = function() {
      return F(Te);
    }, te.unstable_next = function(X) {
      switch (we) {
        case 1:
        case 2:
        case 3:
          var Ee = 3;
          break;
        default:
          Ee = we;
      }
      var ne = we;
      we = Ee;
      try {
        return X();
      } finally {
        we = ne;
      }
    }, te.unstable_pauseExecution = function() {
    }, te.unstable_requestPaint = function() {
    }, te.unstable_runWithPriority = function(X, Ee) {
      switch (X) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5:
          break;
        default:
          X = 3;
      }
      var ne = we;
      we = X;
      try {
        return Ee();
      } finally {
        we = ne;
      }
    }, te.unstable_scheduleCallback = function(X, Ee, ne) {
      var _ = te.unstable_now();
      switch (typeof ne == "object" && ne !== null ? (ne = ne.delay, ne = typeof ne == "number" && 0 < ne ? _ + ne : _) : ne = _, X) {
        case 1:
          var V = -1;
          break;
        case 2:
          V = 250;
          break;
        case 5:
          V = 1073741823;
          break;
        case 4:
          V = 1e4;
          break;
        default:
          V = 5e3;
      }
      return V = ne + V, X = { id: jt++, callback: Ee, priorityLevel: X, startTime: ne, expirationTime: V, sortIndex: -1 }, ne > _ ? (X.sortIndex = ne, Z(pe, X), F(Te) === null && X === F(pe) && (pt ? (un(en), en = -1) : pt = !0, ge(ct, ne - _))) : (X.sortIndex = V, Z(Te, X), Qe || ce || (Qe = !0, Tt(xe))), X;
    }, te.unstable_shouldYield = tn, te.unstable_wrapCallback = function(X) {
      var Ee = we;
      return function() {
        var ne = we;
        we = Ee;
        try {
          return X.apply(this, arguments);
        } finally {
          we = ne;
        }
      };
    };
  }(uE)), uE;
}
var oE = {};
/**
 * @license React
 * scheduler.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var eT;
function J_() {
  return eT || (eT = 1, function(te) {
    process.env.NODE_ENV !== "production" && function() {
      typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
      var Z = !1, F = 5;
      function Jt(K, Se) {
        var Je = K.length;
        K.push(Se), S(K, Se, Je);
      }
      function Nt(K) {
        return K.length === 0 ? null : K[0];
      }
      function zt(K) {
        if (K.length === 0)
          return null;
        var Se = K[0], Je = K.pop();
        return Je !== Se && (K[0] = Je, dn(K, Je, 0)), Se;
      }
      function S(K, Se, Je) {
        for (var Lt = Je; Lt > 0; ) {
          var qt = Lt - 1 >>> 1, pn = K[qt];
          if (Te(pn, Se) > 0)
            K[qt] = Se, K[Lt] = pn, Lt = qt;
          else
            return;
        }
      }
      function dn(K, Se, Je) {
        for (var Lt = Je, qt = K.length, pn = qt >>> 1; Lt < pn; ) {
          var nn = (Lt + 1) * 2 - 1, Xn = K[nn], on = nn + 1, Vt = K[on];
          if (Te(Xn, Se) < 0)
            on < qt && Te(Vt, Xn) < 0 ? (K[Lt] = Vt, K[on] = Se, Lt = on) : (K[Lt] = Xn, K[nn] = Se, Lt = nn);
          else if (on < qt && Te(Vt, Se) < 0)
            K[Lt] = Vt, K[on] = Se, Lt = on;
          else
            return;
        }
      }
      function Te(K, Se) {
        var Je = K.sortIndex - Se.sortIndex;
        return Je !== 0 ? Je : K.id - Se.id;
      }
      var pe = 1, jt = 2, ae = 3, we = 4, ce = 5;
      function Qe(K, Se) {
      }
      var pt = typeof performance == "object" && typeof performance.now == "function";
      if (pt) {
        var st = performance;
        te.unstable_now = function() {
          return st.now();
        };
      } else {
        var un = Date, it = un.now();
        te.unstable_now = function() {
          return un.now() - it;
        };
      }
      var We = 1073741823, ct = -1, xe = 250, lt = 5e3, je = 1e4, en = We, Ut = [], Gt = [], tn = 1, Et = null, be = ae, Ot = !1, Ct = !1, Tt = !1, ge = typeof setTimeout == "function" ? setTimeout : null, X = typeof clearTimeout == "function" ? clearTimeout : null, Ee = typeof setImmediate < "u" ? setImmediate : null;
      typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
      function ne(K) {
        for (var Se = Nt(Gt); Se !== null; ) {
          if (Se.callback === null)
            zt(Gt);
          else if (Se.startTime <= K)
            zt(Gt), Se.sortIndex = Se.expirationTime, Jt(Ut, Se);
          else
            return;
          Se = Nt(Gt);
        }
      }
      function _(K) {
        if (Tt = !1, ne(K), !Ct)
          if (Nt(Ut) !== null)
            Ct = !0, kn(V);
          else {
            var Se = Nt(Gt);
            Se !== null && Sr(_, Se.startTime - K);
          }
      }
      function V(K, Se) {
        Ct = !1, Tt && (Tt = !1, Er()), Ot = !0;
        var Je = be;
        try {
          var Lt;
          if (!Z) return He(K, Se);
        } finally {
          Et = null, be = Je, Ot = !1;
        }
      }
      function He(K, Se) {
        var Je = Se;
        for (ne(Je), Et = Nt(Ut); Et !== null && !(Et.expirationTime > Je && (!K || oi())); ) {
          var Lt = Et.callback;
          if (typeof Lt == "function") {
            Et.callback = null, be = Et.priorityLevel;
            var qt = Et.expirationTime <= Je, pn = Lt(qt);
            Je = te.unstable_now(), typeof pn == "function" ? Et.callback = pn : Et === Nt(Ut) && zt(Ut), ne(Je);
          } else
            zt(Ut);
          Et = Nt(Ut);
        }
        if (Et !== null)
          return !0;
        var nn = Nt(Gt);
        return nn !== null && Sr(_, nn.startTime - Je), !1;
      }
      function Ae(K, Se) {
        switch (K) {
          case pe:
          case jt:
          case ae:
          case we:
          case ce:
            break;
          default:
            K = ae;
        }
        var Je = be;
        be = K;
        try {
          return Se();
        } finally {
          be = Je;
        }
      }
      function tt(K) {
        var Se;
        switch (be) {
          case pe:
          case jt:
          case ae:
            Se = ae;
            break;
          default:
            Se = be;
            break;
        }
        var Je = be;
        be = Se;
        try {
          return K();
        } finally {
          be = Je;
        }
      }
      function Ke(K) {
        var Se = be;
        return function() {
          var Je = be;
          be = Se;
          try {
            return K.apply(this, arguments);
          } finally {
            be = Je;
          }
        };
      }
      function Xe(K, Se, Je) {
        var Lt = te.unstable_now(), qt;
        if (typeof Je == "object" && Je !== null) {
          var pn = Je.delay;
          typeof pn == "number" && pn > 0 ? qt = Lt + pn : qt = Lt;
        } else
          qt = Lt;
        var nn;
        switch (K) {
          case pe:
            nn = ct;
            break;
          case jt:
            nn = xe;
            break;
          case ce:
            nn = en;
            break;
          case we:
            nn = je;
            break;
          case ae:
          default:
            nn = lt;
            break;
        }
        var Xn = qt + nn, on = {
          id: tn++,
          callback: Se,
          priorityLevel: K,
          startTime: qt,
          expirationTime: Xn,
          sortIndex: -1
        };
        return qt > Lt ? (on.sortIndex = qt, Jt(Gt, on), Nt(Ut) === null && on === Nt(Gt) && (Tt ? Er() : Tt = !0, Sr(_, qt - Lt))) : (on.sortIndex = Xn, Jt(Ut, on), !Ct && !Ot && (Ct = !0, kn(V))), on;
      }
      function Ze() {
      }
      function nt() {
        !Ct && !Ot && (Ct = !0, kn(V));
      }
      function Ht() {
        return Nt(Ut);
      }
      function Dn(K) {
        K.callback = null;
      }
      function _r() {
        return be;
      }
      var En = !1, nr = null, Vn = -1, Pn = F, Ir = -1;
      function oi() {
        var K = te.unstable_now() - Ir;
        return !(K < Pn);
      }
      function ca() {
      }
      function qn(K) {
        if (K < 0 || K > 125) {
          console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported");
          return;
        }
        K > 0 ? Pn = Math.floor(1e3 / K) : Pn = F;
      }
      var Cn = function() {
        if (nr !== null) {
          var K = te.unstable_now();
          Ir = K;
          var Se = !0, Je = !0;
          try {
            Je = nr(Se, K);
          } finally {
            Je ? Bn() : (En = !1, nr = null);
          }
        } else
          En = !1;
      }, Bn;
      if (typeof Ee == "function")
        Bn = function() {
          Ee(Cn);
        };
      else if (typeof MessageChannel < "u") {
        var gr = new MessageChannel(), Ia = gr.port2;
        gr.port1.onmessage = Cn, Bn = function() {
          Ia.postMessage(null);
        };
      } else
        Bn = function() {
          ge(Cn, 0);
        };
      function kn(K) {
        nr = K, En || (En = !0, Bn());
      }
      function Sr(K, Se) {
        Vn = ge(function() {
          K(te.unstable_now());
        }, Se);
      }
      function Er() {
        X(Vn), Vn = -1;
      }
      var Qa = ca, si = null;
      te.unstable_IdlePriority = ce, te.unstable_ImmediatePriority = pe, te.unstable_LowPriority = we, te.unstable_NormalPriority = ae, te.unstable_Profiling = si, te.unstable_UserBlockingPriority = jt, te.unstable_cancelCallback = Dn, te.unstable_continueExecution = nt, te.unstable_forceFrameRate = qn, te.unstable_getCurrentPriorityLevel = _r, te.unstable_getFirstCallbackNode = Ht, te.unstable_next = tt, te.unstable_pauseExecution = Ze, te.unstable_requestPaint = Qa, te.unstable_runWithPriority = Ae, te.unstable_scheduleCallback = Xe, te.unstable_shouldYield = oi, te.unstable_wrapCallback = Ke, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
    }();
  }(oE)), oE;
}
var tT;
function lT() {
  return tT || (tT = 1, process.env.NODE_ENV === "production" ? $m.exports = Z_() : $m.exports = J_()), $m.exports;
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
var nT;
function eD() {
  if (nT) return $a;
  nT = 1;
  var te = vE, Z = lT();
  function F(n) {
    for (var r = "https://reactjs.org/docs/error-decoder.html?invariant=" + n, l = 1; l < arguments.length; l++) r += "&args[]=" + encodeURIComponent(arguments[l]);
    return "Minified React error #" + n + "; visit " + r + " for the full message or use the non-minified dev environment for full errors and additional helpful warnings.";
  }
  var Jt = /* @__PURE__ */ new Set(), Nt = {};
  function zt(n, r) {
    S(n, r), S(n + "Capture", r);
  }
  function S(n, r) {
    for (Nt[n] = r, n = 0; n < r.length; n++) Jt.add(r[n]);
  }
  var dn = !(typeof window > "u" || typeof window.document > "u" || typeof window.document.createElement > "u"), Te = Object.prototype.hasOwnProperty, pe = /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/, jt = {}, ae = {};
  function we(n) {
    return Te.call(ae, n) ? !0 : Te.call(jt, n) ? !1 : pe.test(n) ? ae[n] = !0 : (jt[n] = !0, !1);
  }
  function ce(n, r, l, o) {
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
  function Qe(n, r, l, o) {
    if (r === null || typeof r > "u" || ce(n, r, l, o)) return !0;
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
  function pt(n, r, l, o, c, d, m) {
    this.acceptsBooleans = r === 2 || r === 3 || r === 4, this.attributeName = o, this.attributeNamespace = c, this.mustUseProperty = l, this.propertyName = n, this.type = r, this.sanitizeURL = d, this.removeEmptyString = m;
  }
  var st = {};
  "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(n) {
    st[n] = new pt(n, 0, !1, n, null, !1, !1);
  }), [["acceptCharset", "accept-charset"], ["className", "class"], ["htmlFor", "for"], ["httpEquiv", "http-equiv"]].forEach(function(n) {
    var r = n[0];
    st[r] = new pt(r, 1, !1, n[1], null, !1, !1);
  }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(n) {
    st[n] = new pt(n, 2, !1, n.toLowerCase(), null, !1, !1);
  }), ["autoReverse", "externalResourcesRequired", "focusable", "preserveAlpha"].forEach(function(n) {
    st[n] = new pt(n, 2, !1, n, null, !1, !1);
  }), "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(n) {
    st[n] = new pt(n, 3, !1, n.toLowerCase(), null, !1, !1);
  }), ["checked", "multiple", "muted", "selected"].forEach(function(n) {
    st[n] = new pt(n, 3, !0, n, null, !1, !1);
  }), ["capture", "download"].forEach(function(n) {
    st[n] = new pt(n, 4, !1, n, null, !1, !1);
  }), ["cols", "rows", "size", "span"].forEach(function(n) {
    st[n] = new pt(n, 6, !1, n, null, !1, !1);
  }), ["rowSpan", "start"].forEach(function(n) {
    st[n] = new pt(n, 5, !1, n.toLowerCase(), null, !1, !1);
  });
  var un = /[\-:]([a-z])/g;
  function it(n) {
    return n[1].toUpperCase();
  }
  "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(n) {
    var r = n.replace(
      un,
      it
    );
    st[r] = new pt(r, 1, !1, n, null, !1, !1);
  }), "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(n) {
    var r = n.replace(un, it);
    st[r] = new pt(r, 1, !1, n, "http://www.w3.org/1999/xlink", !1, !1);
  }), ["xml:base", "xml:lang", "xml:space"].forEach(function(n) {
    var r = n.replace(un, it);
    st[r] = new pt(r, 1, !1, n, "http://www.w3.org/XML/1998/namespace", !1, !1);
  }), ["tabIndex", "crossOrigin"].forEach(function(n) {
    st[n] = new pt(n, 1, !1, n.toLowerCase(), null, !1, !1);
  }), st.xlinkHref = new pt("xlinkHref", 1, !1, "xlink:href", "http://www.w3.org/1999/xlink", !0, !1), ["src", "href", "action", "formAction"].forEach(function(n) {
    st[n] = new pt(n, 1, !1, n.toLowerCase(), null, !0, !0);
  });
  function We(n, r, l, o) {
    var c = st.hasOwnProperty(r) ? st[r] : null;
    (c !== null ? c.type !== 0 : o || !(2 < r.length) || r[0] !== "o" && r[0] !== "O" || r[1] !== "n" && r[1] !== "N") && (Qe(r, l, c, o) && (l = null), o || c === null ? we(r) && (l === null ? n.removeAttribute(r) : n.setAttribute(r, "" + l)) : c.mustUseProperty ? n[c.propertyName] = l === null ? c.type === 3 ? !1 : "" : l : (r = c.attributeName, o = c.attributeNamespace, l === null ? n.removeAttribute(r) : (c = c.type, l = c === 3 || c === 4 && l === !0 ? "" : "" + l, o ? n.setAttributeNS(o, r, l) : n.setAttribute(r, l))));
  }
  var ct = te.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, xe = Symbol.for("react.element"), lt = Symbol.for("react.portal"), je = Symbol.for("react.fragment"), en = Symbol.for("react.strict_mode"), Ut = Symbol.for("react.profiler"), Gt = Symbol.for("react.provider"), tn = Symbol.for("react.context"), Et = Symbol.for("react.forward_ref"), be = Symbol.for("react.suspense"), Ot = Symbol.for("react.suspense_list"), Ct = Symbol.for("react.memo"), Tt = Symbol.for("react.lazy"), ge = Symbol.for("react.offscreen"), X = Symbol.iterator;
  function Ee(n) {
    return n === null || typeof n != "object" ? null : (n = X && n[X] || n["@@iterator"], typeof n == "function" ? n : null);
  }
  var ne = Object.assign, _;
  function V(n) {
    if (_ === void 0) try {
      throw Error();
    } catch (l) {
      var r = l.stack.trim().match(/\n( *(at )?)/);
      _ = r && r[1] || "";
    }
    return `
` + _ + n;
  }
  var He = !1;
  function Ae(n, r) {
    if (!n || He) return "";
    He = !0;
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
        } catch (z) {
          var o = z;
        }
        Reflect.construct(n, [], r);
      } else {
        try {
          r.call();
        } catch (z) {
          o = z;
        }
        n.call(r.prototype);
      }
      else {
        try {
          throw Error();
        } catch (z) {
          o = z;
        }
        n();
      }
    } catch (z) {
      if (z && o && typeof z.stack == "string") {
        for (var c = z.stack.split(`
`), d = o.stack.split(`
`), m = c.length - 1, E = d.length - 1; 1 <= m && 0 <= E && c[m] !== d[E]; ) E--;
        for (; 1 <= m && 0 <= E; m--, E--) if (c[m] !== d[E]) {
          if (m !== 1 || E !== 1)
            do
              if (m--, E--, 0 > E || c[m] !== d[E]) {
                var T = `
` + c[m].replace(" at new ", " at ");
                return n.displayName && T.includes("<anonymous>") && (T = T.replace("<anonymous>", n.displayName)), T;
              }
            while (1 <= m && 0 <= E);
          break;
        }
      }
    } finally {
      He = !1, Error.prepareStackTrace = l;
    }
    return (n = n ? n.displayName || n.name : "") ? V(n) : "";
  }
  function tt(n) {
    switch (n.tag) {
      case 5:
        return V(n.type);
      case 16:
        return V("Lazy");
      case 13:
        return V("Suspense");
      case 19:
        return V("SuspenseList");
      case 0:
      case 2:
      case 15:
        return n = Ae(n.type, !1), n;
      case 11:
        return n = Ae(n.type.render, !1), n;
      case 1:
        return n = Ae(n.type, !0), n;
      default:
        return "";
    }
  }
  function Ke(n) {
    if (n == null) return null;
    if (typeof n == "function") return n.displayName || n.name || null;
    if (typeof n == "string") return n;
    switch (n) {
      case je:
        return "Fragment";
      case lt:
        return "Portal";
      case Ut:
        return "Profiler";
      case en:
        return "StrictMode";
      case be:
        return "Suspense";
      case Ot:
        return "SuspenseList";
    }
    if (typeof n == "object") switch (n.$$typeof) {
      case tn:
        return (n.displayName || "Context") + ".Consumer";
      case Gt:
        return (n._context.displayName || "Context") + ".Provider";
      case Et:
        var r = n.render;
        return n = n.displayName, n || (n = r.displayName || r.name || "", n = n !== "" ? "ForwardRef(" + n + ")" : "ForwardRef"), n;
      case Ct:
        return r = n.displayName || null, r !== null ? r : Ke(n.type) || "Memo";
      case Tt:
        r = n._payload, n = n._init;
        try {
          return Ke(n(r));
        } catch {
        }
    }
    return null;
  }
  function Xe(n) {
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
        return Ke(r);
      case 8:
        return r === en ? "StrictMode" : "Mode";
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
  function Ze(n) {
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
  function nt(n) {
    var r = n.type;
    return (n = n.nodeName) && n.toLowerCase() === "input" && (r === "checkbox" || r === "radio");
  }
  function Ht(n) {
    var r = nt(n) ? "checked" : "value", l = Object.getOwnPropertyDescriptor(n.constructor.prototype, r), o = "" + n[r];
    if (!n.hasOwnProperty(r) && typeof l < "u" && typeof l.get == "function" && typeof l.set == "function") {
      var c = l.get, d = l.set;
      return Object.defineProperty(n, r, { configurable: !0, get: function() {
        return c.call(this);
      }, set: function(m) {
        o = "" + m, d.call(this, m);
      } }), Object.defineProperty(n, r, { enumerable: l.enumerable }), { getValue: function() {
        return o;
      }, setValue: function(m) {
        o = "" + m;
      }, stopTracking: function() {
        n._valueTracker = null, delete n[r];
      } };
    }
  }
  function Dn(n) {
    n._valueTracker || (n._valueTracker = Ht(n));
  }
  function _r(n) {
    if (!n) return !1;
    var r = n._valueTracker;
    if (!r) return !0;
    var l = r.getValue(), o = "";
    return n && (o = nt(n) ? n.checked ? "true" : "false" : n.value), n = o, n !== l ? (r.setValue(n), !0) : !1;
  }
  function En(n) {
    if (n = n || (typeof document < "u" ? document : void 0), typeof n > "u") return null;
    try {
      return n.activeElement || n.body;
    } catch {
      return n.body;
    }
  }
  function nr(n, r) {
    var l = r.checked;
    return ne({}, r, { defaultChecked: void 0, defaultValue: void 0, value: void 0, checked: l ?? n._wrapperState.initialChecked });
  }
  function Vn(n, r) {
    var l = r.defaultValue == null ? "" : r.defaultValue, o = r.checked != null ? r.checked : r.defaultChecked;
    l = Ze(r.value != null ? r.value : l), n._wrapperState = { initialChecked: o, initialValue: l, controlled: r.type === "checkbox" || r.type === "radio" ? r.checked != null : r.value != null };
  }
  function Pn(n, r) {
    r = r.checked, r != null && We(n, "checked", r, !1);
  }
  function Ir(n, r) {
    Pn(n, r);
    var l = Ze(r.value), o = r.type;
    if (l != null) o === "number" ? (l === 0 && n.value === "" || n.value != l) && (n.value = "" + l) : n.value !== "" + l && (n.value = "" + l);
    else if (o === "submit" || o === "reset") {
      n.removeAttribute("value");
      return;
    }
    r.hasOwnProperty("value") ? ca(n, r.type, l) : r.hasOwnProperty("defaultValue") && ca(n, r.type, Ze(r.defaultValue)), r.checked == null && r.defaultChecked != null && (n.defaultChecked = !!r.defaultChecked);
  }
  function oi(n, r, l) {
    if (r.hasOwnProperty("value") || r.hasOwnProperty("defaultValue")) {
      var o = r.type;
      if (!(o !== "submit" && o !== "reset" || r.value !== void 0 && r.value !== null)) return;
      r = "" + n._wrapperState.initialValue, l || r === n.value || (n.value = r), n.defaultValue = r;
    }
    l = n.name, l !== "" && (n.name = ""), n.defaultChecked = !!n._wrapperState.initialChecked, l !== "" && (n.name = l);
  }
  function ca(n, r, l) {
    (r !== "number" || En(n.ownerDocument) !== n) && (l == null ? n.defaultValue = "" + n._wrapperState.initialValue : n.defaultValue !== "" + l && (n.defaultValue = "" + l));
  }
  var qn = Array.isArray;
  function Cn(n, r, l, o) {
    if (n = n.options, r) {
      r = {};
      for (var c = 0; c < l.length; c++) r["$" + l[c]] = !0;
      for (l = 0; l < n.length; l++) c = r.hasOwnProperty("$" + n[l].value), n[l].selected !== c && (n[l].selected = c), c && o && (n[l].defaultSelected = !0);
    } else {
      for (l = "" + Ze(l), r = null, c = 0; c < n.length; c++) {
        if (n[c].value === l) {
          n[c].selected = !0, o && (n[c].defaultSelected = !0);
          return;
        }
        r !== null || n[c].disabled || (r = n[c]);
      }
      r !== null && (r.selected = !0);
    }
  }
  function Bn(n, r) {
    if (r.dangerouslySetInnerHTML != null) throw Error(F(91));
    return ne({}, r, { value: void 0, defaultValue: void 0, children: "" + n._wrapperState.initialValue });
  }
  function gr(n, r) {
    var l = r.value;
    if (l == null) {
      if (l = r.children, r = r.defaultValue, l != null) {
        if (r != null) throw Error(F(92));
        if (qn(l)) {
          if (1 < l.length) throw Error(F(93));
          l = l[0];
        }
        r = l;
      }
      r == null && (r = ""), l = r;
    }
    n._wrapperState = { initialValue: Ze(l) };
  }
  function Ia(n, r) {
    var l = Ze(r.value), o = Ze(r.defaultValue);
    l != null && (l = "" + l, l !== n.value && (n.value = l), r.defaultValue == null && n.defaultValue !== l && (n.defaultValue = l)), o != null && (n.defaultValue = "" + o);
  }
  function kn(n) {
    var r = n.textContent;
    r === n._wrapperState.initialValue && r !== "" && r !== null && (n.value = r);
  }
  function Sr(n) {
    switch (n) {
      case "svg":
        return "http://www.w3.org/2000/svg";
      case "math":
        return "http://www.w3.org/1998/Math/MathML";
      default:
        return "http://www.w3.org/1999/xhtml";
    }
  }
  function Er(n, r) {
    return n == null || n === "http://www.w3.org/1999/xhtml" ? Sr(r) : n === "http://www.w3.org/2000/svg" && r === "foreignObject" ? "http://www.w3.org/1999/xhtml" : n;
  }
  var Qa, si = function(n) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(r, l, o, c) {
      MSApp.execUnsafeLocalFunction(function() {
        return n(r, l, o, c);
      });
    } : n;
  }(function(n, r) {
    if (n.namespaceURI !== "http://www.w3.org/2000/svg" || "innerHTML" in n) n.innerHTML = r;
    else {
      for (Qa = Qa || document.createElement("div"), Qa.innerHTML = "<svg>" + r.valueOf().toString() + "</svg>", r = Qa.firstChild; n.firstChild; ) n.removeChild(n.firstChild);
      for (; r.firstChild; ) n.appendChild(r.firstChild);
    }
  });
  function K(n, r) {
    if (r) {
      var l = n.firstChild;
      if (l && l === n.lastChild && l.nodeType === 3) {
        l.nodeValue = r;
        return;
      }
    }
    n.textContent = r;
  }
  var Se = {
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
  }, Je = ["Webkit", "ms", "Moz", "O"];
  Object.keys(Se).forEach(function(n) {
    Je.forEach(function(r) {
      r = r + n.charAt(0).toUpperCase() + n.substring(1), Se[r] = Se[n];
    });
  });
  function Lt(n, r, l) {
    return r == null || typeof r == "boolean" || r === "" ? "" : l || typeof r != "number" || r === 0 || Se.hasOwnProperty(n) && Se[n] ? ("" + r).trim() : r + "px";
  }
  function qt(n, r) {
    n = n.style;
    for (var l in r) if (r.hasOwnProperty(l)) {
      var o = l.indexOf("--") === 0, c = Lt(l, r[l], o);
      l === "float" && (l = "cssFloat"), o ? n.setProperty(l, c) : n[l] = c;
    }
  }
  var pn = ne({ menuitem: !0 }, { area: !0, base: !0, br: !0, col: !0, embed: !0, hr: !0, img: !0, input: !0, keygen: !0, link: !0, meta: !0, param: !0, source: !0, track: !0, wbr: !0 });
  function nn(n, r) {
    if (r) {
      if (pn[n] && (r.children != null || r.dangerouslySetInnerHTML != null)) throw Error(F(137, n));
      if (r.dangerouslySetInnerHTML != null) {
        if (r.children != null) throw Error(F(60));
        if (typeof r.dangerouslySetInnerHTML != "object" || !("__html" in r.dangerouslySetInnerHTML)) throw Error(F(61));
      }
      if (r.style != null && typeof r.style != "object") throw Error(F(62));
    }
  }
  function Xn(n, r) {
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
  var on = null;
  function Vt(n) {
    return n = n.target || n.srcElement || window, n.correspondingUseElement && (n = n.correspondingUseElement), n.nodeType === 3 ? n.parentNode : n;
  }
  var sn = null, Cr = null, Rr = null;
  function fa(n) {
    if (n = De(n)) {
      if (typeof sn != "function") throw Error(F(280));
      var r = n.stateNode;
      r && (r = hn(r), sn(n.stateNode, n.type, r));
    }
  }
  function ci(n) {
    Cr ? Rr ? Rr.push(n) : Rr = [n] : Cr = n;
  }
  function $u() {
    if (Cr) {
      var n = Cr, r = Rr;
      if (Rr = Cr = null, fa(n), r) for (n = 0; n < r.length; n++) fa(r[n]);
    }
  }
  function cl(n, r) {
    return n(r);
  }
  function Kl() {
  }
  var fl = !1;
  function dl(n, r, l) {
    if (fl) return n(r, l);
    fl = !0;
    try {
      return cl(n, r, l);
    } finally {
      fl = !1, (Cr !== null || Rr !== null) && (Kl(), $u());
    }
  }
  function Dr(n, r) {
    var l = n.stateNode;
    if (l === null) return null;
    var o = hn(l);
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
    if (l && typeof l != "function") throw Error(F(231, r, typeof l));
    return l;
  }
  var Qr = !1;
  if (dn) try {
    var rr = {};
    Object.defineProperty(rr, "passive", { get: function() {
      Qr = !0;
    } }), window.addEventListener("test", rr, rr), window.removeEventListener("test", rr, rr);
  } catch {
    Qr = !1;
  }
  function fi(n, r, l, o, c, d, m, E, T) {
    var z = Array.prototype.slice.call(arguments, 3);
    try {
      r.apply(l, z);
    } catch (I) {
      this.onError(I);
    }
  }
  var Wa = !1, R = null, $ = !1, J = null, _e = { onError: function(n) {
    Wa = !0, R = n;
  } };
  function ot(n, r, l, o, c, d, m, E, T) {
    Wa = !1, R = null, fi.apply(_e, arguments);
  }
  function Pe(n, r, l, o, c, d, m, E, T) {
    if (ot.apply(this, arguments), Wa) {
      if (Wa) {
        var z = R;
        Wa = !1, R = null;
      } else throw Error(F(198));
      $ || ($ = !0, J = z);
    }
  }
  function Be(n) {
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
  function Oe(n) {
    if (n.tag === 13) {
      var r = n.memoizedState;
      if (r === null && (n = n.alternate, n !== null && (r = n.memoizedState)), r !== null) return r.dehydrated;
    }
    return null;
  }
  function On(n) {
    if (Be(n) !== n) throw Error(F(188));
  }
  function rn(n) {
    var r = n.alternate;
    if (!r) {
      if (r = Be(n), r === null) throw Error(F(188));
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
          if (d === l) return On(c), n;
          if (d === o) return On(c), r;
          d = d.sibling;
        }
        throw Error(F(188));
      }
      if (l.return !== o.return) l = c, o = d;
      else {
        for (var m = !1, E = c.child; E; ) {
          if (E === l) {
            m = !0, l = c, o = d;
            break;
          }
          if (E === o) {
            m = !0, o = c, l = d;
            break;
          }
          E = E.sibling;
        }
        if (!m) {
          for (E = d.child; E; ) {
            if (E === l) {
              m = !0, l = d, o = c;
              break;
            }
            if (E === o) {
              m = !0, o = d, l = c;
              break;
            }
            E = E.sibling;
          }
          if (!m) throw Error(F(189));
        }
      }
      if (l.alternate !== o) throw Error(F(190));
    }
    if (l.tag !== 3) throw Error(F(188));
    return l.stateNode.current === l ? n : r;
  }
  function Xt(n) {
    return n = rn(n), n !== null ? ar(n) : null;
  }
  function ar(n) {
    if (n.tag === 5 || n.tag === 6) return n;
    for (n = n.child; n !== null; ) {
      var r = ar(n);
      if (r !== null) return r;
      n = n.sibling;
    }
    return null;
  }
  var Ga = Z.unstable_scheduleCallback, wa = Z.unstable_cancelCallback, $n = Z.unstable_shouldYield, Zl = Z.unstable_requestPaint, Mt = Z.unstable_now, rt = Z.unstable_getCurrentPriorityLevel, Ai = Z.unstable_ImmediatePriority, Bo = Z.unstable_UserBlockingPriority, Jl = Z.unstable_NormalPriority, pl = Z.unstable_LowPriority, Yu = Z.unstable_IdlePriority, vl = null, Wr = null;
  function $o(n) {
    if (Wr && typeof Wr.onCommitFiberRoot == "function") try {
      Wr.onCommitFiberRoot(vl, n, void 0, (n.current.flags & 128) === 128);
    } catch {
    }
  }
  var kr = Math.clz32 ? Math.clz32 : Iu, ac = Math.log, ic = Math.LN2;
  function Iu(n) {
    return n >>>= 0, n === 0 ? 32 : 31 - (ac(n) / ic | 0) | 0;
  }
  var hl = 64, da = 4194304;
  function qa(n) {
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
  function Xa(n, r) {
    var l = n.pendingLanes;
    if (l === 0) return 0;
    var o = 0, c = n.suspendedLanes, d = n.pingedLanes, m = l & 268435455;
    if (m !== 0) {
      var E = m & ~c;
      E !== 0 ? o = qa(E) : (d &= m, d !== 0 && (o = qa(d)));
    } else m = l & ~c, m !== 0 ? o = qa(m) : d !== 0 && (o = qa(d));
    if (o === 0) return 0;
    if (r !== 0 && r !== o && !(r & c) && (c = o & -o, d = r & -r, c >= d || c === 16 && (d & 4194240) !== 0)) return r;
    if (o & 4 && (o |= l & 16), r = n.entangledLanes, r !== 0) for (n = n.entanglements, r &= o; 0 < r; ) l = 31 - kr(r), c = 1 << l, o |= n[l], r &= ~c;
    return o;
  }
  function Qu(n, r) {
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
  function eu(n, r) {
    for (var l = n.suspendedLanes, o = n.pingedLanes, c = n.expirationTimes, d = n.pendingLanes; 0 < d; ) {
      var m = 31 - kr(d), E = 1 << m, T = c[m];
      T === -1 ? (!(E & l) || E & o) && (c[m] = Qu(E, r)) : T <= r && (n.expiredLanes |= E), d &= ~E;
    }
  }
  function ml(n) {
    return n = n.pendingLanes & -1073741825, n !== 0 ? n : n & 1073741824 ? 1073741824 : 0;
  }
  function Wu() {
    var n = hl;
    return hl <<= 1, !(hl & 4194240) && (hl = 64), n;
  }
  function Gu(n) {
    for (var r = [], l = 0; 31 > l; l++) r.push(n);
    return r;
  }
  function Fi(n, r, l) {
    n.pendingLanes |= r, r !== 536870912 && (n.suspendedLanes = 0, n.pingedLanes = 0), n = n.eventTimes, r = 31 - kr(r), n[r] = l;
  }
  function Yf(n, r) {
    var l = n.pendingLanes & ~r;
    n.pendingLanes = r, n.suspendedLanes = 0, n.pingedLanes = 0, n.expiredLanes &= r, n.mutableReadLanes &= r, n.entangledLanes &= r, r = n.entanglements;
    var o = n.eventTimes;
    for (n = n.expirationTimes; 0 < l; ) {
      var c = 31 - kr(l), d = 1 << c;
      r[c] = 0, o[c] = -1, n[c] = -1, l &= ~d;
    }
  }
  function ji(n, r) {
    var l = n.entangledLanes |= r;
    for (n = n.entanglements; l; ) {
      var o = 31 - kr(l), c = 1 << o;
      c & r | n[o] & r && (n[o] |= r), l &= ~c;
    }
  }
  var wt = 0;
  function qu(n) {
    return n &= -n, 1 < n ? 4 < n ? n & 268435455 ? 16 : 536870912 : 4 : 1;
  }
  var gt, Yo, di, Ye, Xu, ir = !1, pi = [], Or = null, vi = null, an = null, Pt = /* @__PURE__ */ new Map(), yl = /* @__PURE__ */ new Map(), Yn = [], Lr = "mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");
  function xa(n, r) {
    switch (n) {
      case "focusin":
      case "focusout":
        Or = null;
        break;
      case "dragenter":
      case "dragleave":
        vi = null;
        break;
      case "mouseover":
      case "mouseout":
        an = null;
        break;
      case "pointerover":
      case "pointerout":
        Pt.delete(r.pointerId);
        break;
      case "gotpointercapture":
      case "lostpointercapture":
        yl.delete(r.pointerId);
    }
  }
  function tu(n, r, l, o, c, d) {
    return n === null || n.nativeEvent !== d ? (n = { blockedOn: r, domEventName: l, eventSystemFlags: o, nativeEvent: d, targetContainers: [c] }, r !== null && (r = De(r), r !== null && Yo(r)), n) : (n.eventSystemFlags |= o, r = n.targetContainers, c !== null && r.indexOf(c) === -1 && r.push(c), n);
  }
  function Io(n, r, l, o, c) {
    switch (r) {
      case "focusin":
        return Or = tu(Or, n, r, l, o, c), !0;
      case "dragenter":
        return vi = tu(vi, n, r, l, o, c), !0;
      case "mouseover":
        return an = tu(an, n, r, l, o, c), !0;
      case "pointerover":
        var d = c.pointerId;
        return Pt.set(d, tu(Pt.get(d) || null, n, r, l, o, c)), !0;
      case "gotpointercapture":
        return d = c.pointerId, yl.set(d, tu(yl.get(d) || null, n, r, l, o, c)), !0;
    }
    return !1;
  }
  function Qo(n) {
    var r = cu(n.target);
    if (r !== null) {
      var l = Be(r);
      if (l !== null) {
        if (r = l.tag, r === 13) {
          if (r = Oe(l), r !== null) {
            n.blockedOn = r, Xu(n.priority, function() {
              di(l);
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
  function gl(n) {
    if (n.blockedOn !== null) return !1;
    for (var r = n.targetContainers; 0 < r.length; ) {
      var l = Ju(n.domEventName, n.eventSystemFlags, r[0], n.nativeEvent);
      if (l === null) {
        l = n.nativeEvent;
        var o = new l.constructor(l.type, l);
        on = o, l.target.dispatchEvent(o), on = null;
      } else return r = De(l), r !== null && Yo(r), n.blockedOn = l, !1;
      r.shift();
    }
    return !0;
  }
  function nu(n, r, l) {
    gl(n) && l.delete(r);
  }
  function If() {
    ir = !1, Or !== null && gl(Or) && (Or = null), vi !== null && gl(vi) && (vi = null), an !== null && gl(an) && (an = null), Pt.forEach(nu), yl.forEach(nu);
  }
  function ba(n, r) {
    n.blockedOn === r && (n.blockedOn = null, ir || (ir = !0, Z.unstable_scheduleCallback(Z.unstable_NormalPriority, If)));
  }
  function Ka(n) {
    function r(c) {
      return ba(c, n);
    }
    if (0 < pi.length) {
      ba(pi[0], n);
      for (var l = 1; l < pi.length; l++) {
        var o = pi[l];
        o.blockedOn === n && (o.blockedOn = null);
      }
    }
    for (Or !== null && ba(Or, n), vi !== null && ba(vi, n), an !== null && ba(an, n), Pt.forEach(r), yl.forEach(r), l = 0; l < Yn.length; l++) o = Yn[l], o.blockedOn === n && (o.blockedOn = null);
    for (; 0 < Yn.length && (l = Yn[0], l.blockedOn === null); ) Qo(l), l.blockedOn === null && Yn.shift();
  }
  var hi = ct.ReactCurrentBatchConfig, _a = !0;
  function Ku(n, r, l, o) {
    var c = wt, d = hi.transition;
    hi.transition = null;
    try {
      wt = 1, Sl(n, r, l, o);
    } finally {
      wt = c, hi.transition = d;
    }
  }
  function Zu(n, r, l, o) {
    var c = wt, d = hi.transition;
    hi.transition = null;
    try {
      wt = 4, Sl(n, r, l, o);
    } finally {
      wt = c, hi.transition = d;
    }
  }
  function Sl(n, r, l, o) {
    if (_a) {
      var c = Ju(n, r, l, o);
      if (c === null) yc(n, r, o, ru, l), xa(n, o);
      else if (Io(c, n, r, l, o)) o.stopPropagation();
      else if (xa(n, o), r & 4 && -1 < Lr.indexOf(n)) {
        for (; c !== null; ) {
          var d = De(c);
          if (d !== null && gt(d), d = Ju(n, r, l, o), d === null && yc(n, r, o, ru, l), d === c) break;
          c = d;
        }
        c !== null && o.stopPropagation();
      } else yc(n, r, o, null, l);
    }
  }
  var ru = null;
  function Ju(n, r, l, o) {
    if (ru = null, n = Vt(o), n = cu(n), n !== null) if (r = Be(n), r === null) n = null;
    else if (l = r.tag, l === 13) {
      if (n = Oe(r), n !== null) return n;
      n = null;
    } else if (l === 3) {
      if (r.stateNode.current.memoizedState.isDehydrated) return r.tag === 3 ? r.stateNode.containerInfo : null;
      n = null;
    } else r !== n && (n = null);
    return ru = n, null;
  }
  function eo(n) {
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
        switch (rt()) {
          case Ai:
            return 1;
          case Bo:
            return 4;
          case Jl:
          case pl:
            return 16;
          case Yu:
            return 536870912;
          default:
            return 16;
        }
      default:
        return 16;
    }
  }
  var Za = null, h = null, C = null;
  function N() {
    if (C) return C;
    var n, r = h, l = r.length, o, c = "value" in Za ? Za.value : Za.textContent, d = c.length;
    for (n = 0; n < l && r[n] === c[n]; n++) ;
    var m = l - n;
    for (o = 1; o <= m && r[l - o] === c[d - o]; o++) ;
    return C = c.slice(n, 1 < o ? 1 - o : void 0);
  }
  function A(n) {
    var r = n.keyCode;
    return "charCode" in n ? (n = n.charCode, n === 0 && r === 13 && (n = 13)) : n = r, n === 10 && (n = 13), 32 <= n || n === 13 ? n : 0;
  }
  function q() {
    return !0;
  }
  function Le() {
    return !1;
  }
  function re(n) {
    function r(l, o, c, d, m) {
      this._reactName = l, this._targetInst = c, this.type = o, this.nativeEvent = d, this.target = m, this.currentTarget = null;
      for (var E in n) n.hasOwnProperty(E) && (l = n[E], this[E] = l ? l(d) : d[E]);
      return this.isDefaultPrevented = (d.defaultPrevented != null ? d.defaultPrevented : d.returnValue === !1) ? q : Le, this.isPropagationStopped = Le, this;
    }
    return ne(r.prototype, { preventDefault: function() {
      this.defaultPrevented = !0;
      var l = this.nativeEvent;
      l && (l.preventDefault ? l.preventDefault() : typeof l.returnValue != "unknown" && (l.returnValue = !1), this.isDefaultPrevented = q);
    }, stopPropagation: function() {
      var l = this.nativeEvent;
      l && (l.stopPropagation ? l.stopPropagation() : typeof l.cancelBubble != "unknown" && (l.cancelBubble = !0), this.isPropagationStopped = q);
    }, persist: function() {
    }, isPersistent: q }), r;
  }
  var ze = { eventPhase: 0, bubbles: 0, cancelable: 0, timeStamp: function(n) {
    return n.timeStamp || Date.now();
  }, defaultPrevented: 0, isTrusted: 0 }, ut = re(ze), St = ne({}, ze, { view: 0, detail: 0 }), Kt = re(St), Bt, et, $t, vn = ne({}, St, { screenX: 0, screenY: 0, clientX: 0, clientY: 0, pageX: 0, pageY: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, getModifierState: Xf, button: 0, buttons: 0, relatedTarget: function(n) {
    return n.relatedTarget === void 0 ? n.fromElement === n.srcElement ? n.toElement : n.fromElement : n.relatedTarget;
  }, movementX: function(n) {
    return "movementX" in n ? n.movementX : (n !== $t && ($t && n.type === "mousemove" ? (Bt = n.screenX - $t.screenX, et = n.screenY - $t.screenY) : et = Bt = 0, $t = n), Bt);
  }, movementY: function(n) {
    return "movementY" in n ? n.movementY : et;
  } }), El = re(vn), Wo = ne({}, vn, { dataTransfer: 0 }), Hi = re(Wo), Go = ne({}, St, { relatedTarget: 0 }), au = re(Go), Qf = ne({}, ze, { animationName: 0, elapsedTime: 0, pseudoElement: 0 }), lc = re(Qf), Wf = ne({}, ze, { clipboardData: function(n) {
    return "clipboardData" in n ? n.clipboardData : window.clipboardData;
  } }), Xp = re(Wf), Gf = ne({}, ze, { data: 0 }), qf = re(Gf), Kp = {
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
  }, Zp = {
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
  }, Im = { Alt: "altKey", Control: "ctrlKey", Meta: "metaKey", Shift: "shiftKey" };
  function Vi(n) {
    var r = this.nativeEvent;
    return r.getModifierState ? r.getModifierState(n) : (n = Im[n]) ? !!r[n] : !1;
  }
  function Xf() {
    return Vi;
  }
  var Kf = ne({}, St, { key: function(n) {
    if (n.key) {
      var r = Kp[n.key] || n.key;
      if (r !== "Unidentified") return r;
    }
    return n.type === "keypress" ? (n = A(n), n === 13 ? "Enter" : String.fromCharCode(n)) : n.type === "keydown" || n.type === "keyup" ? Zp[n.keyCode] || "Unidentified" : "";
  }, code: 0, location: 0, ctrlKey: 0, shiftKey: 0, altKey: 0, metaKey: 0, repeat: 0, locale: 0, getModifierState: Xf, charCode: function(n) {
    return n.type === "keypress" ? A(n) : 0;
  }, keyCode: function(n) {
    return n.type === "keydown" || n.type === "keyup" ? n.keyCode : 0;
  }, which: function(n) {
    return n.type === "keypress" ? A(n) : n.type === "keydown" || n.type === "keyup" ? n.keyCode : 0;
  } }), Zf = re(Kf), Jf = ne({}, vn, { pointerId: 0, width: 0, height: 0, pressure: 0, tangentialPressure: 0, tiltX: 0, tiltY: 0, twist: 0, pointerType: 0, isPrimary: 0 }), Jp = re(Jf), uc = ne({}, St, { touches: 0, targetTouches: 0, changedTouches: 0, altKey: 0, metaKey: 0, ctrlKey: 0, shiftKey: 0, getModifierState: Xf }), ev = re(uc), Gr = ne({}, ze, { propertyName: 0, elapsedTime: 0, pseudoElement: 0 }), Pi = re(Gr), Ln = ne({}, vn, {
    deltaX: function(n) {
      return "deltaX" in n ? n.deltaX : "wheelDeltaX" in n ? -n.wheelDeltaX : 0;
    },
    deltaY: function(n) {
      return "deltaY" in n ? n.deltaY : "wheelDeltaY" in n ? -n.wheelDeltaY : "wheelDelta" in n ? -n.wheelDelta : 0;
    },
    deltaZ: 0,
    deltaMode: 0
  }), Bi = re(Ln), ed = [9, 13, 27, 32], to = dn && "CompositionEvent" in window, qo = null;
  dn && "documentMode" in document && (qo = document.documentMode);
  var Xo = dn && "TextEvent" in window && !qo, tv = dn && (!to || qo && 8 < qo && 11 >= qo), nv = " ", oc = !1;
  function rv(n, r) {
    switch (n) {
      case "keyup":
        return ed.indexOf(r.keyCode) !== -1;
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
  function av(n) {
    return n = n.detail, typeof n == "object" && "data" in n ? n.data : null;
  }
  var no = !1;
  function iv(n, r) {
    switch (n) {
      case "compositionend":
        return av(r);
      case "keypress":
        return r.which !== 32 ? null : (oc = !0, nv);
      case "textInput":
        return n = r.data, n === nv && oc ? null : n;
      default:
        return null;
    }
  }
  function Qm(n, r) {
    if (no) return n === "compositionend" || !to && rv(n, r) ? (n = N(), C = h = Za = null, no = !1, n) : null;
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
        return tv && r.locale !== "ko" ? null : r.data;
      default:
        return null;
    }
  }
  var Wm = { color: !0, date: !0, datetime: !0, "datetime-local": !0, email: !0, month: !0, number: !0, password: !0, range: !0, search: !0, tel: !0, text: !0, time: !0, url: !0, week: !0 };
  function lv(n) {
    var r = n && n.nodeName && n.nodeName.toLowerCase();
    return r === "input" ? !!Wm[n.type] : r === "textarea";
  }
  function td(n, r, l, o) {
    ci(o), r = ns(r, "onChange"), 0 < r.length && (l = new ut("onChange", "change", null, l, o), n.push({ event: l, listeners: r }));
  }
  var mi = null, iu = null;
  function uv(n) {
    ou(n, 0);
  }
  function Ko(n) {
    var r = ei(n);
    if (_r(r)) return n;
  }
  function Gm(n, r) {
    if (n === "change") return r;
  }
  var ov = !1;
  if (dn) {
    var nd;
    if (dn) {
      var rd = "oninput" in document;
      if (!rd) {
        var sv = document.createElement("div");
        sv.setAttribute("oninput", "return;"), rd = typeof sv.oninput == "function";
      }
      nd = rd;
    } else nd = !1;
    ov = nd && (!document.documentMode || 9 < document.documentMode);
  }
  function cv() {
    mi && (mi.detachEvent("onpropertychange", fv), iu = mi = null);
  }
  function fv(n) {
    if (n.propertyName === "value" && Ko(iu)) {
      var r = [];
      td(r, iu, n, Vt(n)), dl(uv, r);
    }
  }
  function qm(n, r, l) {
    n === "focusin" ? (cv(), mi = r, iu = l, mi.attachEvent("onpropertychange", fv)) : n === "focusout" && cv();
  }
  function dv(n) {
    if (n === "selectionchange" || n === "keyup" || n === "keydown") return Ko(iu);
  }
  function Xm(n, r) {
    if (n === "click") return Ko(r);
  }
  function pv(n, r) {
    if (n === "input" || n === "change") return Ko(r);
  }
  function Km(n, r) {
    return n === r && (n !== 0 || 1 / n === 1 / r) || n !== n && r !== r;
  }
  var Ja = typeof Object.is == "function" ? Object.is : Km;
  function Zo(n, r) {
    if (Ja(n, r)) return !0;
    if (typeof n != "object" || n === null || typeof r != "object" || r === null) return !1;
    var l = Object.keys(n), o = Object.keys(r);
    if (l.length !== o.length) return !1;
    for (o = 0; o < l.length; o++) {
      var c = l[o];
      if (!Te.call(r, c) || !Ja(n[c], r[c])) return !1;
    }
    return !0;
  }
  function vv(n) {
    for (; n && n.firstChild; ) n = n.firstChild;
    return n;
  }
  function sc(n, r) {
    var l = vv(n);
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
      l = vv(l);
    }
  }
  function Cl(n, r) {
    return n && r ? n === r ? !0 : n && n.nodeType === 3 ? !1 : r && r.nodeType === 3 ? Cl(n, r.parentNode) : "contains" in n ? n.contains(r) : n.compareDocumentPosition ? !!(n.compareDocumentPosition(r) & 16) : !1 : !1;
  }
  function Jo() {
    for (var n = window, r = En(); r instanceof n.HTMLIFrameElement; ) {
      try {
        var l = typeof r.contentWindow.location.href == "string";
      } catch {
        l = !1;
      }
      if (l) n = r.contentWindow;
      else break;
      r = En(n.document);
    }
    return r;
  }
  function cc(n) {
    var r = n && n.nodeName && n.nodeName.toLowerCase();
    return r && (r === "input" && (n.type === "text" || n.type === "search" || n.type === "tel" || n.type === "url" || n.type === "password") || r === "textarea" || n.contentEditable === "true");
  }
  function ro(n) {
    var r = Jo(), l = n.focusedElem, o = n.selectionRange;
    if (r !== l && l && l.ownerDocument && Cl(l.ownerDocument.documentElement, l)) {
      if (o !== null && cc(l)) {
        if (r = o.start, n = o.end, n === void 0 && (n = r), "selectionStart" in l) l.selectionStart = r, l.selectionEnd = Math.min(n, l.value.length);
        else if (n = (r = l.ownerDocument || document) && r.defaultView || window, n.getSelection) {
          n = n.getSelection();
          var c = l.textContent.length, d = Math.min(o.start, c);
          o = o.end === void 0 ? d : Math.min(o.end, c), !n.extend && d > o && (c = o, o = d, d = c), c = sc(l, d);
          var m = sc(
            l,
            o
          );
          c && m && (n.rangeCount !== 1 || n.anchorNode !== c.node || n.anchorOffset !== c.offset || n.focusNode !== m.node || n.focusOffset !== m.offset) && (r = r.createRange(), r.setStart(c.node, c.offset), n.removeAllRanges(), d > o ? (n.addRange(r), n.extend(m.node, m.offset)) : (r.setEnd(m.node, m.offset), n.addRange(r)));
        }
      }
      for (r = [], n = l; n = n.parentNode; ) n.nodeType === 1 && r.push({ element: n, left: n.scrollLeft, top: n.scrollTop });
      for (typeof l.focus == "function" && l.focus(), l = 0; l < r.length; l++) n = r[l], n.element.scrollLeft = n.left, n.element.scrollTop = n.top;
    }
  }
  var Zm = dn && "documentMode" in document && 11 >= document.documentMode, ao = null, ad = null, es = null, id = !1;
  function ld(n, r, l) {
    var o = l.window === l ? l.document : l.nodeType === 9 ? l : l.ownerDocument;
    id || ao == null || ao !== En(o) || (o = ao, "selectionStart" in o && cc(o) ? o = { start: o.selectionStart, end: o.selectionEnd } : (o = (o.ownerDocument && o.ownerDocument.defaultView || window).getSelection(), o = { anchorNode: o.anchorNode, anchorOffset: o.anchorOffset, focusNode: o.focusNode, focusOffset: o.focusOffset }), es && Zo(es, o) || (es = o, o = ns(ad, "onSelect"), 0 < o.length && (r = new ut("onSelect", "select", null, r, l), n.push({ event: r, listeners: o }), r.target = ao)));
  }
  function fc(n, r) {
    var l = {};
    return l[n.toLowerCase()] = r.toLowerCase(), l["Webkit" + n] = "webkit" + r, l["Moz" + n] = "moz" + r, l;
  }
  var lu = { animationend: fc("Animation", "AnimationEnd"), animationiteration: fc("Animation", "AnimationIteration"), animationstart: fc("Animation", "AnimationStart"), transitionend: fc("Transition", "TransitionEnd") }, lr = {}, ud = {};
  dn && (ud = document.createElement("div").style, "AnimationEvent" in window || (delete lu.animationend.animation, delete lu.animationiteration.animation, delete lu.animationstart.animation), "TransitionEvent" in window || delete lu.transitionend.transition);
  function dc(n) {
    if (lr[n]) return lr[n];
    if (!lu[n]) return n;
    var r = lu[n], l;
    for (l in r) if (r.hasOwnProperty(l) && l in ud) return lr[n] = r[l];
    return n;
  }
  var hv = dc("animationend"), mv = dc("animationiteration"), yv = dc("animationstart"), gv = dc("transitionend"), od = /* @__PURE__ */ new Map(), pc = "abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");
  function Da(n, r) {
    od.set(n, r), zt(r, [n]);
  }
  for (var sd = 0; sd < pc.length; sd++) {
    var uu = pc[sd], Jm = uu.toLowerCase(), ey = uu[0].toUpperCase() + uu.slice(1);
    Da(Jm, "on" + ey);
  }
  Da(hv, "onAnimationEnd"), Da(mv, "onAnimationIteration"), Da(yv, "onAnimationStart"), Da("dblclick", "onDoubleClick"), Da("focusin", "onFocus"), Da("focusout", "onBlur"), Da(gv, "onTransitionEnd"), S("onMouseEnter", ["mouseout", "mouseover"]), S("onMouseLeave", ["mouseout", "mouseover"]), S("onPointerEnter", ["pointerout", "pointerover"]), S("onPointerLeave", ["pointerout", "pointerover"]), zt("onChange", "change click focusin focusout input keydown keyup selectionchange".split(" ")), zt("onSelect", "focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")), zt("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), zt("onCompositionEnd", "compositionend focusout keydown keypress keyup mousedown".split(" ")), zt("onCompositionStart", "compositionstart focusout keydown keypress keyup mousedown".split(" ")), zt("onCompositionUpdate", "compositionupdate focusout keydown keypress keyup mousedown".split(" "));
  var ts = "abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "), cd = new Set("cancel close invalid load scroll toggle".split(" ").concat(ts));
  function vc(n, r, l) {
    var o = n.type || "unknown-event";
    n.currentTarget = l, Pe(o, r, void 0, n), n.currentTarget = null;
  }
  function ou(n, r) {
    r = (r & 4) !== 0;
    for (var l = 0; l < n.length; l++) {
      var o = n[l], c = o.event;
      o = o.listeners;
      e: {
        var d = void 0;
        if (r) for (var m = o.length - 1; 0 <= m; m--) {
          var E = o[m], T = E.instance, z = E.currentTarget;
          if (E = E.listener, T !== d && c.isPropagationStopped()) break e;
          vc(c, E, z), d = T;
        }
        else for (m = 0; m < o.length; m++) {
          if (E = o[m], T = E.instance, z = E.currentTarget, E = E.listener, T !== d && c.isPropagationStopped()) break e;
          vc(c, E, z), d = T;
        }
      }
    }
    if ($) throw n = J, $ = !1, J = null, n;
  }
  function At(n, r) {
    var l = r[is];
    l === void 0 && (l = r[is] = /* @__PURE__ */ new Set());
    var o = n + "__bubble";
    l.has(o) || (Sv(r, n, 2, !1), l.add(o));
  }
  function hc(n, r, l) {
    var o = 0;
    r && (o |= 4), Sv(l, n, o, r);
  }
  var mc = "_reactListening" + Math.random().toString(36).slice(2);
  function io(n) {
    if (!n[mc]) {
      n[mc] = !0, Jt.forEach(function(l) {
        l !== "selectionchange" && (cd.has(l) || hc(l, !1, n), hc(l, !0, n));
      });
      var r = n.nodeType === 9 ? n : n.ownerDocument;
      r === null || r[mc] || (r[mc] = !0, hc("selectionchange", !1, r));
    }
  }
  function Sv(n, r, l, o) {
    switch (eo(r)) {
      case 1:
        var c = Ku;
        break;
      case 4:
        c = Zu;
        break;
      default:
        c = Sl;
    }
    l = c.bind(null, r, l, n), c = void 0, !Qr || r !== "touchstart" && r !== "touchmove" && r !== "wheel" || (c = !0), o ? c !== void 0 ? n.addEventListener(r, l, { capture: !0, passive: c }) : n.addEventListener(r, l, !0) : c !== void 0 ? n.addEventListener(r, l, { passive: c }) : n.addEventListener(r, l, !1);
  }
  function yc(n, r, l, o, c) {
    var d = o;
    if (!(r & 1) && !(r & 2) && o !== null) e: for (; ; ) {
      if (o === null) return;
      var m = o.tag;
      if (m === 3 || m === 4) {
        var E = o.stateNode.containerInfo;
        if (E === c || E.nodeType === 8 && E.parentNode === c) break;
        if (m === 4) for (m = o.return; m !== null; ) {
          var T = m.tag;
          if ((T === 3 || T === 4) && (T = m.stateNode.containerInfo, T === c || T.nodeType === 8 && T.parentNode === c)) return;
          m = m.return;
        }
        for (; E !== null; ) {
          if (m = cu(E), m === null) return;
          if (T = m.tag, T === 5 || T === 6) {
            o = d = m;
            continue e;
          }
          E = E.parentNode;
        }
      }
      o = o.return;
    }
    dl(function() {
      var z = d, I = Vt(l), W = [];
      e: {
        var Y = od.get(n);
        if (Y !== void 0) {
          var oe = ut, ve = n;
          switch (n) {
            case "keypress":
              if (A(l) === 0) break e;
            case "keydown":
            case "keyup":
              oe = Zf;
              break;
            case "focusin":
              ve = "focus", oe = au;
              break;
            case "focusout":
              ve = "blur", oe = au;
              break;
            case "beforeblur":
            case "afterblur":
              oe = au;
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
              oe = El;
              break;
            case "drag":
            case "dragend":
            case "dragenter":
            case "dragexit":
            case "dragleave":
            case "dragover":
            case "dragstart":
            case "drop":
              oe = Hi;
              break;
            case "touchcancel":
            case "touchend":
            case "touchmove":
            case "touchstart":
              oe = ev;
              break;
            case hv:
            case mv:
            case yv:
              oe = lc;
              break;
            case gv:
              oe = Pi;
              break;
            case "scroll":
              oe = Kt;
              break;
            case "wheel":
              oe = Bi;
              break;
            case "copy":
            case "cut":
            case "paste":
              oe = Xp;
              break;
            case "gotpointercapture":
            case "lostpointercapture":
            case "pointercancel":
            case "pointerdown":
            case "pointermove":
            case "pointerout":
            case "pointerover":
            case "pointerup":
              oe = Jp;
          }
          var ye = (r & 4) !== 0, bn = !ye && n === "scroll", D = ye ? Y !== null ? Y + "Capture" : null : Y;
          ye = [];
          for (var x = z, L; x !== null; ) {
            L = x;
            var Q = L.stateNode;
            if (L.tag === 5 && Q !== null && (L = Q, D !== null && (Q = Dr(x, D), Q != null && ye.push(lo(x, Q, L)))), bn) break;
            x = x.return;
          }
          0 < ye.length && (Y = new oe(Y, ve, null, l, I), W.push({ event: Y, listeners: ye }));
        }
      }
      if (!(r & 7)) {
        e: {
          if (Y = n === "mouseover" || n === "pointerover", oe = n === "mouseout" || n === "pointerout", Y && l !== on && (ve = l.relatedTarget || l.fromElement) && (cu(ve) || ve[$i])) break e;
          if ((oe || Y) && (Y = I.window === I ? I : (Y = I.ownerDocument) ? Y.defaultView || Y.parentWindow : window, oe ? (ve = l.relatedTarget || l.toElement, oe = z, ve = ve ? cu(ve) : null, ve !== null && (bn = Be(ve), ve !== bn || ve.tag !== 5 && ve.tag !== 6) && (ve = null)) : (oe = null, ve = z), oe !== ve)) {
            if (ye = El, Q = "onMouseLeave", D = "onMouseEnter", x = "mouse", (n === "pointerout" || n === "pointerover") && (ye = Jp, Q = "onPointerLeave", D = "onPointerEnter", x = "pointer"), bn = oe == null ? Y : ei(oe), L = ve == null ? Y : ei(ve), Y = new ye(Q, x + "leave", oe, l, I), Y.target = bn, Y.relatedTarget = L, Q = null, cu(I) === z && (ye = new ye(D, x + "enter", ve, l, I), ye.target = L, ye.relatedTarget = bn, Q = ye), bn = Q, oe && ve) t: {
              for (ye = oe, D = ve, x = 0, L = ye; L; L = Rl(L)) x++;
              for (L = 0, Q = D; Q; Q = Rl(Q)) L++;
              for (; 0 < x - L; ) ye = Rl(ye), x--;
              for (; 0 < L - x; ) D = Rl(D), L--;
              for (; x--; ) {
                if (ye === D || D !== null && ye === D.alternate) break t;
                ye = Rl(ye), D = Rl(D);
              }
              ye = null;
            }
            else ye = null;
            oe !== null && Ev(W, Y, oe, ye, !1), ve !== null && bn !== null && Ev(W, bn, ve, ye, !0);
          }
        }
        e: {
          if (Y = z ? ei(z) : window, oe = Y.nodeName && Y.nodeName.toLowerCase(), oe === "select" || oe === "input" && Y.type === "file") var he = Gm;
          else if (lv(Y)) if (ov) he = pv;
          else {
            he = dv;
            var Ne = qm;
          }
          else (oe = Y.nodeName) && oe.toLowerCase() === "input" && (Y.type === "checkbox" || Y.type === "radio") && (he = Xm);
          if (he && (he = he(n, z))) {
            td(W, he, l, I);
            break e;
          }
          Ne && Ne(n, Y, z), n === "focusout" && (Ne = Y._wrapperState) && Ne.controlled && Y.type === "number" && ca(Y, "number", Y.value);
        }
        switch (Ne = z ? ei(z) : window, n) {
          case "focusin":
            (lv(Ne) || Ne.contentEditable === "true") && (ao = Ne, ad = z, es = null);
            break;
          case "focusout":
            es = ad = ao = null;
            break;
          case "mousedown":
            id = !0;
            break;
          case "contextmenu":
          case "mouseup":
          case "dragend":
            id = !1, ld(W, l, I);
            break;
          case "selectionchange":
            if (Zm) break;
          case "keydown":
          case "keyup":
            ld(W, l, I);
        }
        var Ue;
        if (to) e: {
          switch (n) {
            case "compositionstart":
              var $e = "onCompositionStart";
              break e;
            case "compositionend":
              $e = "onCompositionEnd";
              break e;
            case "compositionupdate":
              $e = "onCompositionUpdate";
              break e;
          }
          $e = void 0;
        }
        else no ? rv(n, l) && ($e = "onCompositionEnd") : n === "keydown" && l.keyCode === 229 && ($e = "onCompositionStart");
        $e && (tv && l.locale !== "ko" && (no || $e !== "onCompositionStart" ? $e === "onCompositionEnd" && no && (Ue = N()) : (Za = I, h = "value" in Za ? Za.value : Za.textContent, no = !0)), Ne = ns(z, $e), 0 < Ne.length && ($e = new qf($e, n, null, l, I), W.push({ event: $e, listeners: Ne }), Ue ? $e.data = Ue : (Ue = av(l), Ue !== null && ($e.data = Ue)))), (Ue = Xo ? iv(n, l) : Qm(n, l)) && (z = ns(z, "onBeforeInput"), 0 < z.length && (I = new qf("onBeforeInput", "beforeinput", null, l, I), W.push({ event: I, listeners: z }), I.data = Ue));
      }
      ou(W, r);
    });
  }
  function lo(n, r, l) {
    return { instance: n, listener: r, currentTarget: l };
  }
  function ns(n, r) {
    for (var l = r + "Capture", o = []; n !== null; ) {
      var c = n, d = c.stateNode;
      c.tag === 5 && d !== null && (c = d, d = Dr(n, l), d != null && o.unshift(lo(n, d, c)), d = Dr(n, r), d != null && o.push(lo(n, d, c))), n = n.return;
    }
    return o;
  }
  function Rl(n) {
    if (n === null) return null;
    do
      n = n.return;
    while (n && n.tag !== 5);
    return n || null;
  }
  function Ev(n, r, l, o, c) {
    for (var d = r._reactName, m = []; l !== null && l !== o; ) {
      var E = l, T = E.alternate, z = E.stateNode;
      if (T !== null && T === o) break;
      E.tag === 5 && z !== null && (E = z, c ? (T = Dr(l, d), T != null && m.unshift(lo(l, T, E))) : c || (T = Dr(l, d), T != null && m.push(lo(l, T, E)))), l = l.return;
    }
    m.length !== 0 && n.push({ event: r, listeners: m });
  }
  var Cv = /\r\n?/g, ty = /\u0000|\uFFFD/g;
  function Rv(n) {
    return (typeof n == "string" ? n : "" + n).replace(Cv, `
`).replace(ty, "");
  }
  function gc(n, r, l) {
    if (r = Rv(r), Rv(n) !== r && l) throw Error(F(425));
  }
  function Tl() {
  }
  var rs = null, su = null;
  function Sc(n, r) {
    return n === "textarea" || n === "noscript" || typeof r.children == "string" || typeof r.children == "number" || typeof r.dangerouslySetInnerHTML == "object" && r.dangerouslySetInnerHTML !== null && r.dangerouslySetInnerHTML.__html != null;
  }
  var Ec = typeof setTimeout == "function" ? setTimeout : void 0, fd = typeof clearTimeout == "function" ? clearTimeout : void 0, Tv = typeof Promise == "function" ? Promise : void 0, uo = typeof queueMicrotask == "function" ? queueMicrotask : typeof Tv < "u" ? function(n) {
    return Tv.resolve(null).then(n).catch(Cc);
  } : Ec;
  function Cc(n) {
    setTimeout(function() {
      throw n;
    });
  }
  function oo(n, r) {
    var l = r, o = 0;
    do {
      var c = l.nextSibling;
      if (n.removeChild(l), c && c.nodeType === 8) if (l = c.data, l === "/$") {
        if (o === 0) {
          n.removeChild(c), Ka(r);
          return;
        }
        o--;
      } else l !== "$" && l !== "$?" && l !== "$!" || o++;
      l = c;
    } while (l);
    Ka(r);
  }
  function yi(n) {
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
  function wv(n) {
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
  var wl = Math.random().toString(36).slice(2), gi = "__reactFiber$" + wl, as = "__reactProps$" + wl, $i = "__reactContainer$" + wl, is = "__reactEvents$" + wl, so = "__reactListeners$" + wl, ny = "__reactHandles$" + wl;
  function cu(n) {
    var r = n[gi];
    if (r) return r;
    for (var l = n.parentNode; l; ) {
      if (r = l[$i] || l[gi]) {
        if (l = r.alternate, r.child !== null || l !== null && l.child !== null) for (n = wv(n); n !== null; ) {
          if (l = n[gi]) return l;
          n = wv(n);
        }
        return r;
      }
      n = l, l = n.parentNode;
    }
    return null;
  }
  function De(n) {
    return n = n[gi] || n[$i], !n || n.tag !== 5 && n.tag !== 6 && n.tag !== 13 && n.tag !== 3 ? null : n;
  }
  function ei(n) {
    if (n.tag === 5 || n.tag === 6) return n.stateNode;
    throw Error(F(33));
  }
  function hn(n) {
    return n[as] || null;
  }
  var vt = [], ka = -1;
  function Oa(n) {
    return { current: n };
  }
  function Zt(n) {
    0 > ka || (n.current = vt[ka], vt[ka] = null, ka--);
  }
  function Re(n, r) {
    ka++, vt[ka] = n.current, n.current = r;
  }
  var Tr = {}, Sn = Oa(Tr), In = Oa(!1), qr = Tr;
  function Xr(n, r) {
    var l = n.type.contextTypes;
    if (!l) return Tr;
    var o = n.stateNode;
    if (o && o.__reactInternalMemoizedUnmaskedChildContext === r) return o.__reactInternalMemoizedMaskedChildContext;
    var c = {}, d;
    for (d in l) c[d] = r[d];
    return o && (n = n.stateNode, n.__reactInternalMemoizedUnmaskedChildContext = r, n.__reactInternalMemoizedMaskedChildContext = c), c;
  }
  function Mn(n) {
    return n = n.childContextTypes, n != null;
  }
  function co() {
    Zt(In), Zt(Sn);
  }
  function xv(n, r, l) {
    if (Sn.current !== Tr) throw Error(F(168));
    Re(Sn, r), Re(In, l);
  }
  function ls(n, r, l) {
    var o = n.stateNode;
    if (r = r.childContextTypes, typeof o.getChildContext != "function") return l;
    o = o.getChildContext();
    for (var c in o) if (!(c in r)) throw Error(F(108, Xe(n) || "Unknown", c));
    return ne({}, l, o);
  }
  function Kn(n) {
    return n = (n = n.stateNode) && n.__reactInternalMemoizedMergedChildContext || Tr, qr = Sn.current, Re(Sn, n), Re(In, In.current), !0;
  }
  function Rc(n, r, l) {
    var o = n.stateNode;
    if (!o) throw Error(F(169));
    l ? (n = ls(n, r, qr), o.__reactInternalMemoizedMergedChildContext = n, Zt(In), Zt(Sn), Re(Sn, n)) : Zt(In), Re(In, l);
  }
  var Si = null, fo = !1, Yi = !1;
  function Tc(n) {
    Si === null ? Si = [n] : Si.push(n);
  }
  function xl(n) {
    fo = !0, Tc(n);
  }
  function Ei() {
    if (!Yi && Si !== null) {
      Yi = !0;
      var n = 0, r = wt;
      try {
        var l = Si;
        for (wt = 1; n < l.length; n++) {
          var o = l[n];
          do
            o = o(!0);
          while (o !== null);
        }
        Si = null, fo = !1;
      } catch (c) {
        throw Si !== null && (Si = Si.slice(n + 1)), Ga(Ai, Ei), c;
      } finally {
        wt = r, Yi = !1;
      }
    }
    return null;
  }
  var bl = [], _l = 0, Dl = null, Ii = 0, Nn = [], La = 0, pa = null, Ci = 1, Ri = "";
  function fu(n, r) {
    bl[_l++] = Ii, bl[_l++] = Dl, Dl = n, Ii = r;
  }
  function bv(n, r, l) {
    Nn[La++] = Ci, Nn[La++] = Ri, Nn[La++] = pa, pa = n;
    var o = Ci;
    n = Ri;
    var c = 32 - kr(o) - 1;
    o &= ~(1 << c), l += 1;
    var d = 32 - kr(r) + c;
    if (30 < d) {
      var m = c - c % 5;
      d = (o & (1 << m) - 1).toString(32), o >>= m, c -= m, Ci = 1 << 32 - kr(r) + c | l << c | o, Ri = d + n;
    } else Ci = 1 << d | l << c | o, Ri = n;
  }
  function wc(n) {
    n.return !== null && (fu(n, 1), bv(n, 1, 0));
  }
  function xc(n) {
    for (; n === Dl; ) Dl = bl[--_l], bl[_l] = null, Ii = bl[--_l], bl[_l] = null;
    for (; n === pa; ) pa = Nn[--La], Nn[La] = null, Ri = Nn[--La], Nn[La] = null, Ci = Nn[--La], Nn[La] = null;
  }
  var Kr = null, Zr = null, cn = !1, Ma = null;
  function dd(n, r) {
    var l = Fa(5, null, null, 0);
    l.elementType = "DELETED", l.stateNode = r, l.return = n, r = n.deletions, r === null ? (n.deletions = [l], n.flags |= 16) : r.push(l);
  }
  function _v(n, r) {
    switch (n.tag) {
      case 5:
        var l = n.type;
        return r = r.nodeType !== 1 || l.toLowerCase() !== r.nodeName.toLowerCase() ? null : r, r !== null ? (n.stateNode = r, Kr = n, Zr = yi(r.firstChild), !0) : !1;
      case 6:
        return r = n.pendingProps === "" || r.nodeType !== 3 ? null : r, r !== null ? (n.stateNode = r, Kr = n, Zr = null, !0) : !1;
      case 13:
        return r = r.nodeType !== 8 ? null : r, r !== null ? (l = pa !== null ? { id: Ci, overflow: Ri } : null, n.memoizedState = { dehydrated: r, treeContext: l, retryLane: 1073741824 }, l = Fa(18, null, null, 0), l.stateNode = r, l.return = n, n.child = l, Kr = n, Zr = null, !0) : !1;
      default:
        return !1;
    }
  }
  function pd(n) {
    return (n.mode & 1) !== 0 && (n.flags & 128) === 0;
  }
  function vd(n) {
    if (cn) {
      var r = Zr;
      if (r) {
        var l = r;
        if (!_v(n, r)) {
          if (pd(n)) throw Error(F(418));
          r = yi(l.nextSibling);
          var o = Kr;
          r && _v(n, r) ? dd(o, l) : (n.flags = n.flags & -4097 | 2, cn = !1, Kr = n);
        }
      } else {
        if (pd(n)) throw Error(F(418));
        n.flags = n.flags & -4097 | 2, cn = !1, Kr = n;
      }
    }
  }
  function Qn(n) {
    for (n = n.return; n !== null && n.tag !== 5 && n.tag !== 3 && n.tag !== 13; ) n = n.return;
    Kr = n;
  }
  function bc(n) {
    if (n !== Kr) return !1;
    if (!cn) return Qn(n), cn = !0, !1;
    var r;
    if ((r = n.tag !== 3) && !(r = n.tag !== 5) && (r = n.type, r = r !== "head" && r !== "body" && !Sc(n.type, n.memoizedProps)), r && (r = Zr)) {
      if (pd(n)) throw us(), Error(F(418));
      for (; r; ) dd(n, r), r = yi(r.nextSibling);
    }
    if (Qn(n), n.tag === 13) {
      if (n = n.memoizedState, n = n !== null ? n.dehydrated : null, !n) throw Error(F(317));
      e: {
        for (n = n.nextSibling, r = 0; n; ) {
          if (n.nodeType === 8) {
            var l = n.data;
            if (l === "/$") {
              if (r === 0) {
                Zr = yi(n.nextSibling);
                break e;
              }
              r--;
            } else l !== "$" && l !== "$!" && l !== "$?" || r++;
          }
          n = n.nextSibling;
        }
        Zr = null;
      }
    } else Zr = Kr ? yi(n.stateNode.nextSibling) : null;
    return !0;
  }
  function us() {
    for (var n = Zr; n; ) n = yi(n.nextSibling);
  }
  function kl() {
    Zr = Kr = null, cn = !1;
  }
  function Qi(n) {
    Ma === null ? Ma = [n] : Ma.push(n);
  }
  var ry = ct.ReactCurrentBatchConfig;
  function du(n, r, l) {
    if (n = l.ref, n !== null && typeof n != "function" && typeof n != "object") {
      if (l._owner) {
        if (l = l._owner, l) {
          if (l.tag !== 1) throw Error(F(309));
          var o = l.stateNode;
        }
        if (!o) throw Error(F(147, n));
        var c = o, d = "" + n;
        return r !== null && r.ref !== null && typeof r.ref == "function" && r.ref._stringRef === d ? r.ref : (r = function(m) {
          var E = c.refs;
          m === null ? delete E[d] : E[d] = m;
        }, r._stringRef = d, r);
      }
      if (typeof n != "string") throw Error(F(284));
      if (!l._owner) throw Error(F(290, n));
    }
    return n;
  }
  function _c(n, r) {
    throw n = Object.prototype.toString.call(r), Error(F(31, n === "[object Object]" ? "object with keys {" + Object.keys(r).join(", ") + "}" : n));
  }
  function Dv(n) {
    var r = n._init;
    return r(n._payload);
  }
  function pu(n) {
    function r(D, x) {
      if (n) {
        var L = D.deletions;
        L === null ? (D.deletions = [x], D.flags |= 16) : L.push(x);
      }
    }
    function l(D, x) {
      if (!n) return null;
      for (; x !== null; ) r(D, x), x = x.sibling;
      return null;
    }
    function o(D, x) {
      for (D = /* @__PURE__ */ new Map(); x !== null; ) x.key !== null ? D.set(x.key, x) : D.set(x.index, x), x = x.sibling;
      return D;
    }
    function c(D, x) {
      return D = Fl(D, x), D.index = 0, D.sibling = null, D;
    }
    function d(D, x, L) {
      return D.index = L, n ? (L = D.alternate, L !== null ? (L = L.index, L < x ? (D.flags |= 2, x) : L) : (D.flags |= 2, x)) : (D.flags |= 1048576, x);
    }
    function m(D) {
      return n && D.alternate === null && (D.flags |= 2), D;
    }
    function E(D, x, L, Q) {
      return x === null || x.tag !== 6 ? (x = Id(L, D.mode, Q), x.return = D, x) : (x = c(x, L), x.return = D, x);
    }
    function T(D, x, L, Q) {
      var he = L.type;
      return he === je ? I(D, x, L.props.children, Q, L.key) : x !== null && (x.elementType === he || typeof he == "object" && he !== null && he.$$typeof === Tt && Dv(he) === x.type) ? (Q = c(x, L.props), Q.ref = du(D, x, L), Q.return = D, Q) : (Q = Fs(L.type, L.key, L.props, null, D.mode, Q), Q.ref = du(D, x, L), Q.return = D, Q);
    }
    function z(D, x, L, Q) {
      return x === null || x.tag !== 4 || x.stateNode.containerInfo !== L.containerInfo || x.stateNode.implementation !== L.implementation ? (x = uf(L, D.mode, Q), x.return = D, x) : (x = c(x, L.children || []), x.return = D, x);
    }
    function I(D, x, L, Q, he) {
      return x === null || x.tag !== 7 ? (x = Zi(L, D.mode, Q, he), x.return = D, x) : (x = c(x, L), x.return = D, x);
    }
    function W(D, x, L) {
      if (typeof x == "string" && x !== "" || typeof x == "number") return x = Id("" + x, D.mode, L), x.return = D, x;
      if (typeof x == "object" && x !== null) {
        switch (x.$$typeof) {
          case xe:
            return L = Fs(x.type, x.key, x.props, null, D.mode, L), L.ref = du(D, null, x), L.return = D, L;
          case lt:
            return x = uf(x, D.mode, L), x.return = D, x;
          case Tt:
            var Q = x._init;
            return W(D, Q(x._payload), L);
        }
        if (qn(x) || Ee(x)) return x = Zi(x, D.mode, L, null), x.return = D, x;
        _c(D, x);
      }
      return null;
    }
    function Y(D, x, L, Q) {
      var he = x !== null ? x.key : null;
      if (typeof L == "string" && L !== "" || typeof L == "number") return he !== null ? null : E(D, x, "" + L, Q);
      if (typeof L == "object" && L !== null) {
        switch (L.$$typeof) {
          case xe:
            return L.key === he ? T(D, x, L, Q) : null;
          case lt:
            return L.key === he ? z(D, x, L, Q) : null;
          case Tt:
            return he = L._init, Y(
              D,
              x,
              he(L._payload),
              Q
            );
        }
        if (qn(L) || Ee(L)) return he !== null ? null : I(D, x, L, Q, null);
        _c(D, L);
      }
      return null;
    }
    function oe(D, x, L, Q, he) {
      if (typeof Q == "string" && Q !== "" || typeof Q == "number") return D = D.get(L) || null, E(x, D, "" + Q, he);
      if (typeof Q == "object" && Q !== null) {
        switch (Q.$$typeof) {
          case xe:
            return D = D.get(Q.key === null ? L : Q.key) || null, T(x, D, Q, he);
          case lt:
            return D = D.get(Q.key === null ? L : Q.key) || null, z(x, D, Q, he);
          case Tt:
            var Ne = Q._init;
            return oe(D, x, L, Ne(Q._payload), he);
        }
        if (qn(Q) || Ee(Q)) return D = D.get(L) || null, I(x, D, Q, he, null);
        _c(x, Q);
      }
      return null;
    }
    function ve(D, x, L, Q) {
      for (var he = null, Ne = null, Ue = x, $e = x = 0, er = null; Ue !== null && $e < L.length; $e++) {
        Ue.index > $e ? (er = Ue, Ue = null) : er = Ue.sibling;
        var _t = Y(D, Ue, L[$e], Q);
        if (_t === null) {
          Ue === null && (Ue = er);
          break;
        }
        n && Ue && _t.alternate === null && r(D, Ue), x = d(_t, x, $e), Ne === null ? he = _t : Ne.sibling = _t, Ne = _t, Ue = er;
      }
      if ($e === L.length) return l(D, Ue), cn && fu(D, $e), he;
      if (Ue === null) {
        for (; $e < L.length; $e++) Ue = W(D, L[$e], Q), Ue !== null && (x = d(Ue, x, $e), Ne === null ? he = Ue : Ne.sibling = Ue, Ne = Ue);
        return cn && fu(D, $e), he;
      }
      for (Ue = o(D, Ue); $e < L.length; $e++) er = oe(Ue, D, $e, L[$e], Q), er !== null && (n && er.alternate !== null && Ue.delete(er.key === null ? $e : er.key), x = d(er, x, $e), Ne === null ? he = er : Ne.sibling = er, Ne = er);
      return n && Ue.forEach(function(Vl) {
        return r(D, Vl);
      }), cn && fu(D, $e), he;
    }
    function ye(D, x, L, Q) {
      var he = Ee(L);
      if (typeof he != "function") throw Error(F(150));
      if (L = he.call(L), L == null) throw Error(F(151));
      for (var Ne = he = null, Ue = x, $e = x = 0, er = null, _t = L.next(); Ue !== null && !_t.done; $e++, _t = L.next()) {
        Ue.index > $e ? (er = Ue, Ue = null) : er = Ue.sibling;
        var Vl = Y(D, Ue, _t.value, Q);
        if (Vl === null) {
          Ue === null && (Ue = er);
          break;
        }
        n && Ue && Vl.alternate === null && r(D, Ue), x = d(Vl, x, $e), Ne === null ? he = Vl : Ne.sibling = Vl, Ne = Vl, Ue = er;
      }
      if (_t.done) return l(
        D,
        Ue
      ), cn && fu(D, $e), he;
      if (Ue === null) {
        for (; !_t.done; $e++, _t = L.next()) _t = W(D, _t.value, Q), _t !== null && (x = d(_t, x, $e), Ne === null ? he = _t : Ne.sibling = _t, Ne = _t);
        return cn && fu(D, $e), he;
      }
      for (Ue = o(D, Ue); !_t.done; $e++, _t = L.next()) _t = oe(Ue, D, $e, _t.value, Q), _t !== null && (n && _t.alternate !== null && Ue.delete(_t.key === null ? $e : _t.key), x = d(_t, x, $e), Ne === null ? he = _t : Ne.sibling = _t, Ne = _t);
      return n && Ue.forEach(function(ch) {
        return r(D, ch);
      }), cn && fu(D, $e), he;
    }
    function bn(D, x, L, Q) {
      if (typeof L == "object" && L !== null && L.type === je && L.key === null && (L = L.props.children), typeof L == "object" && L !== null) {
        switch (L.$$typeof) {
          case xe:
            e: {
              for (var he = L.key, Ne = x; Ne !== null; ) {
                if (Ne.key === he) {
                  if (he = L.type, he === je) {
                    if (Ne.tag === 7) {
                      l(D, Ne.sibling), x = c(Ne, L.props.children), x.return = D, D = x;
                      break e;
                    }
                  } else if (Ne.elementType === he || typeof he == "object" && he !== null && he.$$typeof === Tt && Dv(he) === Ne.type) {
                    l(D, Ne.sibling), x = c(Ne, L.props), x.ref = du(D, Ne, L), x.return = D, D = x;
                    break e;
                  }
                  l(D, Ne);
                  break;
                } else r(D, Ne);
                Ne = Ne.sibling;
              }
              L.type === je ? (x = Zi(L.props.children, D.mode, Q, L.key), x.return = D, D = x) : (Q = Fs(L.type, L.key, L.props, null, D.mode, Q), Q.ref = du(D, x, L), Q.return = D, D = Q);
            }
            return m(D);
          case lt:
            e: {
              for (Ne = L.key; x !== null; ) {
                if (x.key === Ne) if (x.tag === 4 && x.stateNode.containerInfo === L.containerInfo && x.stateNode.implementation === L.implementation) {
                  l(D, x.sibling), x = c(x, L.children || []), x.return = D, D = x;
                  break e;
                } else {
                  l(D, x);
                  break;
                }
                else r(D, x);
                x = x.sibling;
              }
              x = uf(L, D.mode, Q), x.return = D, D = x;
            }
            return m(D);
          case Tt:
            return Ne = L._init, bn(D, x, Ne(L._payload), Q);
        }
        if (qn(L)) return ve(D, x, L, Q);
        if (Ee(L)) return ye(D, x, L, Q);
        _c(D, L);
      }
      return typeof L == "string" && L !== "" || typeof L == "number" ? (L = "" + L, x !== null && x.tag === 6 ? (l(D, x.sibling), x = c(x, L), x.return = D, D = x) : (l(D, x), x = Id(L, D.mode, Q), x.return = D, D = x), m(D)) : l(D, x);
    }
    return bn;
  }
  var Rn = pu(!0), ie = pu(!1), va = Oa(null), Jr = null, po = null, hd = null;
  function md() {
    hd = po = Jr = null;
  }
  function yd(n) {
    var r = va.current;
    Zt(va), n._currentValue = r;
  }
  function gd(n, r, l) {
    for (; n !== null; ) {
      var o = n.alternate;
      if ((n.childLanes & r) !== r ? (n.childLanes |= r, o !== null && (o.childLanes |= r)) : o !== null && (o.childLanes & r) !== r && (o.childLanes |= r), n === l) break;
      n = n.return;
    }
  }
  function mn(n, r) {
    Jr = n, hd = po = null, n = n.dependencies, n !== null && n.firstContext !== null && (n.lanes & r && (Un = !0), n.firstContext = null);
  }
  function Na(n) {
    var r = n._currentValue;
    if (hd !== n) if (n = { context: n, memoizedValue: r, next: null }, po === null) {
      if (Jr === null) throw Error(F(308));
      po = n, Jr.dependencies = { lanes: 0, firstContext: n };
    } else po = po.next = n;
    return r;
  }
  var vu = null;
  function Sd(n) {
    vu === null ? vu = [n] : vu.push(n);
  }
  function Ed(n, r, l, o) {
    var c = r.interleaved;
    return c === null ? (l.next = l, Sd(r)) : (l.next = c.next, c.next = l), r.interleaved = l, ha(n, o);
  }
  function ha(n, r) {
    n.lanes |= r;
    var l = n.alternate;
    for (l !== null && (l.lanes |= r), l = n, n = n.return; n !== null; ) n.childLanes |= r, l = n.alternate, l !== null && (l.childLanes |= r), l = n, n = n.return;
    return l.tag === 3 ? l.stateNode : null;
  }
  var ma = !1;
  function Cd(n) {
    n.updateQueue = { baseState: n.memoizedState, firstBaseUpdate: null, lastBaseUpdate: null, shared: { pending: null, interleaved: null, lanes: 0 }, effects: null };
  }
  function kv(n, r) {
    n = n.updateQueue, r.updateQueue === n && (r.updateQueue = { baseState: n.baseState, firstBaseUpdate: n.firstBaseUpdate, lastBaseUpdate: n.lastBaseUpdate, shared: n.shared, effects: n.effects });
  }
  function Wi(n, r) {
    return { eventTime: n, lane: r, tag: 0, payload: null, callback: null, next: null };
  }
  function Ol(n, r, l) {
    var o = n.updateQueue;
    if (o === null) return null;
    if (o = o.shared, ht & 2) {
      var c = o.pending;
      return c === null ? r.next = r : (r.next = c.next, c.next = r), o.pending = r, ha(n, l);
    }
    return c = o.interleaved, c === null ? (r.next = r, Sd(o)) : (r.next = c.next, c.next = r), o.interleaved = r, ha(n, l);
  }
  function Dc(n, r, l) {
    if (r = r.updateQueue, r !== null && (r = r.shared, (l & 4194240) !== 0)) {
      var o = r.lanes;
      o &= n.pendingLanes, l |= o, r.lanes = l, ji(n, l);
    }
  }
  function Ov(n, r) {
    var l = n.updateQueue, o = n.alternate;
    if (o !== null && (o = o.updateQueue, l === o)) {
      var c = null, d = null;
      if (l = l.firstBaseUpdate, l !== null) {
        do {
          var m = { eventTime: l.eventTime, lane: l.lane, tag: l.tag, payload: l.payload, callback: l.callback, next: null };
          d === null ? c = d = m : d = d.next = m, l = l.next;
        } while (l !== null);
        d === null ? c = d = r : d = d.next = r;
      } else c = d = r;
      l = { baseState: o.baseState, firstBaseUpdate: c, lastBaseUpdate: d, shared: o.shared, effects: o.effects }, n.updateQueue = l;
      return;
    }
    n = l.lastBaseUpdate, n === null ? l.firstBaseUpdate = r : n.next = r, l.lastBaseUpdate = r;
  }
  function os(n, r, l, o) {
    var c = n.updateQueue;
    ma = !1;
    var d = c.firstBaseUpdate, m = c.lastBaseUpdate, E = c.shared.pending;
    if (E !== null) {
      c.shared.pending = null;
      var T = E, z = T.next;
      T.next = null, m === null ? d = z : m.next = z, m = T;
      var I = n.alternate;
      I !== null && (I = I.updateQueue, E = I.lastBaseUpdate, E !== m && (E === null ? I.firstBaseUpdate = z : E.next = z, I.lastBaseUpdate = T));
    }
    if (d !== null) {
      var W = c.baseState;
      m = 0, I = z = T = null, E = d;
      do {
        var Y = E.lane, oe = E.eventTime;
        if ((o & Y) === Y) {
          I !== null && (I = I.next = {
            eventTime: oe,
            lane: 0,
            tag: E.tag,
            payload: E.payload,
            callback: E.callback,
            next: null
          });
          e: {
            var ve = n, ye = E;
            switch (Y = r, oe = l, ye.tag) {
              case 1:
                if (ve = ye.payload, typeof ve == "function") {
                  W = ve.call(oe, W, Y);
                  break e;
                }
                W = ve;
                break e;
              case 3:
                ve.flags = ve.flags & -65537 | 128;
              case 0:
                if (ve = ye.payload, Y = typeof ve == "function" ? ve.call(oe, W, Y) : ve, Y == null) break e;
                W = ne({}, W, Y);
                break e;
              case 2:
                ma = !0;
            }
          }
          E.callback !== null && E.lane !== 0 && (n.flags |= 64, Y = c.effects, Y === null ? c.effects = [E] : Y.push(E));
        } else oe = { eventTime: oe, lane: Y, tag: E.tag, payload: E.payload, callback: E.callback, next: null }, I === null ? (z = I = oe, T = W) : I = I.next = oe, m |= Y;
        if (E = E.next, E === null) {
          if (E = c.shared.pending, E === null) break;
          Y = E, E = Y.next, Y.next = null, c.lastBaseUpdate = Y, c.shared.pending = null;
        }
      } while (!0);
      if (I === null && (T = W), c.baseState = T, c.firstBaseUpdate = z, c.lastBaseUpdate = I, r = c.shared.interleaved, r !== null) {
        c = r;
        do
          m |= c.lane, c = c.next;
        while (c !== r);
      } else d === null && (c.shared.lanes = 0);
      _i |= m, n.lanes = m, n.memoizedState = W;
    }
  }
  function Rd(n, r, l) {
    if (n = r.effects, r.effects = null, n !== null) for (r = 0; r < n.length; r++) {
      var o = n[r], c = o.callback;
      if (c !== null) {
        if (o.callback = null, o = l, typeof c != "function") throw Error(F(191, c));
        c.call(o);
      }
    }
  }
  var ss = {}, Ti = Oa(ss), cs = Oa(ss), fs = Oa(ss);
  function hu(n) {
    if (n === ss) throw Error(F(174));
    return n;
  }
  function Td(n, r) {
    switch (Re(fs, r), Re(cs, n), Re(Ti, ss), n = r.nodeType, n) {
      case 9:
      case 11:
        r = (r = r.documentElement) ? r.namespaceURI : Er(null, "");
        break;
      default:
        n = n === 8 ? r.parentNode : r, r = n.namespaceURI || null, n = n.tagName, r = Er(r, n);
    }
    Zt(Ti), Re(Ti, r);
  }
  function mu() {
    Zt(Ti), Zt(cs), Zt(fs);
  }
  function Lv(n) {
    hu(fs.current);
    var r = hu(Ti.current), l = Er(r, n.type);
    r !== l && (Re(cs, n), Re(Ti, l));
  }
  function kc(n) {
    cs.current === n && (Zt(Ti), Zt(cs));
  }
  var yn = Oa(0);
  function Oc(n) {
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
  var ds = [];
  function ke() {
    for (var n = 0; n < ds.length; n++) ds[n]._workInProgressVersionPrimary = null;
    ds.length = 0;
  }
  var at = ct.ReactCurrentDispatcher, xt = ct.ReactCurrentBatchConfig, Yt = 0, bt = null, zn = null, Zn = null, Lc = !1, ps = !1, yu = 0, B = 0;
  function Rt() {
    throw Error(F(321));
  }
  function Fe(n, r) {
    if (r === null) return !1;
    for (var l = 0; l < r.length && l < n.length; l++) if (!Ja(n[l], r[l])) return !1;
    return !0;
  }
  function Ll(n, r, l, o, c, d) {
    if (Yt = d, bt = r, r.memoizedState = null, r.updateQueue = null, r.lanes = 0, at.current = n === null || n.memoizedState === null ? Qc : Ss, n = l(o, c), ps) {
      d = 0;
      do {
        if (ps = !1, yu = 0, 25 <= d) throw Error(F(301));
        d += 1, Zn = zn = null, r.updateQueue = null, at.current = Wc, n = l(o, c);
      } while (ps);
    }
    if (at.current = Ru, r = zn !== null && zn.next !== null, Yt = 0, Zn = zn = bt = null, Lc = !1, r) throw Error(F(300));
    return n;
  }
  function ti() {
    var n = yu !== 0;
    return yu = 0, n;
  }
  function wr() {
    var n = { memoizedState: null, baseState: null, baseQueue: null, queue: null, next: null };
    return Zn === null ? bt.memoizedState = Zn = n : Zn = Zn.next = n, Zn;
  }
  function Tn() {
    if (zn === null) {
      var n = bt.alternate;
      n = n !== null ? n.memoizedState : null;
    } else n = zn.next;
    var r = Zn === null ? bt.memoizedState : Zn.next;
    if (r !== null) Zn = r, zn = n;
    else {
      if (n === null) throw Error(F(310));
      zn = n, n = { memoizedState: zn.memoizedState, baseState: zn.baseState, baseQueue: zn.baseQueue, queue: zn.queue, next: null }, Zn === null ? bt.memoizedState = Zn = n : Zn = Zn.next = n;
    }
    return Zn;
  }
  function Gi(n, r) {
    return typeof r == "function" ? r(n) : r;
  }
  function Ml(n) {
    var r = Tn(), l = r.queue;
    if (l === null) throw Error(F(311));
    l.lastRenderedReducer = n;
    var o = zn, c = o.baseQueue, d = l.pending;
    if (d !== null) {
      if (c !== null) {
        var m = c.next;
        c.next = d.next, d.next = m;
      }
      o.baseQueue = c = d, l.pending = null;
    }
    if (c !== null) {
      d = c.next, o = o.baseState;
      var E = m = null, T = null, z = d;
      do {
        var I = z.lane;
        if ((Yt & I) === I) T !== null && (T = T.next = { lane: 0, action: z.action, hasEagerState: z.hasEagerState, eagerState: z.eagerState, next: null }), o = z.hasEagerState ? z.eagerState : n(o, z.action);
        else {
          var W = {
            lane: I,
            action: z.action,
            hasEagerState: z.hasEagerState,
            eagerState: z.eagerState,
            next: null
          };
          T === null ? (E = T = W, m = o) : T = T.next = W, bt.lanes |= I, _i |= I;
        }
        z = z.next;
      } while (z !== null && z !== d);
      T === null ? m = o : T.next = E, Ja(o, r.memoizedState) || (Un = !0), r.memoizedState = o, r.baseState = m, r.baseQueue = T, l.lastRenderedState = o;
    }
    if (n = l.interleaved, n !== null) {
      c = n;
      do
        d = c.lane, bt.lanes |= d, _i |= d, c = c.next;
      while (c !== n);
    } else c === null && (l.lanes = 0);
    return [r.memoizedState, l.dispatch];
  }
  function gu(n) {
    var r = Tn(), l = r.queue;
    if (l === null) throw Error(F(311));
    l.lastRenderedReducer = n;
    var o = l.dispatch, c = l.pending, d = r.memoizedState;
    if (c !== null) {
      l.pending = null;
      var m = c = c.next;
      do
        d = n(d, m.action), m = m.next;
      while (m !== c);
      Ja(d, r.memoizedState) || (Un = !0), r.memoizedState = d, r.baseQueue === null && (r.baseState = d), l.lastRenderedState = d;
    }
    return [d, o];
  }
  function Mc() {
  }
  function Nc(n, r) {
    var l = bt, o = Tn(), c = r(), d = !Ja(o.memoizedState, c);
    if (d && (o.memoizedState = c, Un = !0), o = o.queue, vs(Ac.bind(null, l, o, n), [n]), o.getSnapshot !== r || d || Zn !== null && Zn.memoizedState.tag & 1) {
      if (l.flags |= 2048, Su(9, Uc.bind(null, l, o, c, r), void 0, null), Wn === null) throw Error(F(349));
      Yt & 30 || zc(l, r, c);
    }
    return c;
  }
  function zc(n, r, l) {
    n.flags |= 16384, n = { getSnapshot: r, value: l }, r = bt.updateQueue, r === null ? (r = { lastEffect: null, stores: null }, bt.updateQueue = r, r.stores = [n]) : (l = r.stores, l === null ? r.stores = [n] : l.push(n));
  }
  function Uc(n, r, l, o) {
    r.value = l, r.getSnapshot = o, Fc(r) && jc(n);
  }
  function Ac(n, r, l) {
    return l(function() {
      Fc(r) && jc(n);
    });
  }
  function Fc(n) {
    var r = n.getSnapshot;
    n = n.value;
    try {
      var l = r();
      return !Ja(n, l);
    } catch {
      return !0;
    }
  }
  function jc(n) {
    var r = ha(n, 1);
    r !== null && Ur(r, n, 1, -1);
  }
  function Hc(n) {
    var r = wr();
    return typeof n == "function" && (n = n()), r.memoizedState = r.baseState = n, n = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: Gi, lastRenderedState: n }, r.queue = n, n = n.dispatch = Cu.bind(null, bt, n), [r.memoizedState, n];
  }
  function Su(n, r, l, o) {
    return n = { tag: n, create: r, destroy: l, deps: o, next: null }, r = bt.updateQueue, r === null ? (r = { lastEffect: null, stores: null }, bt.updateQueue = r, r.lastEffect = n.next = n) : (l = r.lastEffect, l === null ? r.lastEffect = n.next = n : (o = l.next, l.next = n, n.next = o, r.lastEffect = n)), n;
  }
  function Vc() {
    return Tn().memoizedState;
  }
  function vo(n, r, l, o) {
    var c = wr();
    bt.flags |= n, c.memoizedState = Su(1 | r, l, void 0, o === void 0 ? null : o);
  }
  function ho(n, r, l, o) {
    var c = Tn();
    o = o === void 0 ? null : o;
    var d = void 0;
    if (zn !== null) {
      var m = zn.memoizedState;
      if (d = m.destroy, o !== null && Fe(o, m.deps)) {
        c.memoizedState = Su(r, l, d, o);
        return;
      }
    }
    bt.flags |= n, c.memoizedState = Su(1 | r, l, d, o);
  }
  function Pc(n, r) {
    return vo(8390656, 8, n, r);
  }
  function vs(n, r) {
    return ho(2048, 8, n, r);
  }
  function Bc(n, r) {
    return ho(4, 2, n, r);
  }
  function hs(n, r) {
    return ho(4, 4, n, r);
  }
  function Eu(n, r) {
    if (typeof r == "function") return n = n(), r(n), function() {
      r(null);
    };
    if (r != null) return n = n(), r.current = n, function() {
      r.current = null;
    };
  }
  function $c(n, r, l) {
    return l = l != null ? l.concat([n]) : null, ho(4, 4, Eu.bind(null, r, n), l);
  }
  function ms() {
  }
  function Yc(n, r) {
    var l = Tn();
    r = r === void 0 ? null : r;
    var o = l.memoizedState;
    return o !== null && r !== null && Fe(r, o[1]) ? o[0] : (l.memoizedState = [n, r], n);
  }
  function Ic(n, r) {
    var l = Tn();
    r = r === void 0 ? null : r;
    var o = l.memoizedState;
    return o !== null && r !== null && Fe(r, o[1]) ? o[0] : (n = n(), l.memoizedState = [n, r], n);
  }
  function wd(n, r, l) {
    return Yt & 21 ? (Ja(l, r) || (l = Wu(), bt.lanes |= l, _i |= l, n.baseState = !0), r) : (n.baseState && (n.baseState = !1, Un = !0), n.memoizedState = l);
  }
  function ys(n, r) {
    var l = wt;
    wt = l !== 0 && 4 > l ? l : 4, n(!0);
    var o = xt.transition;
    xt.transition = {};
    try {
      n(!1), r();
    } finally {
      wt = l, xt.transition = o;
    }
  }
  function xd() {
    return Tn().memoizedState;
  }
  function gs(n, r, l) {
    var o = Di(n);
    if (l = { lane: o, action: l, hasEagerState: !1, eagerState: null, next: null }, ea(n)) Mv(r, l);
    else if (l = Ed(n, r, l, o), l !== null) {
      var c = jn();
      Ur(l, n, o, c), Wt(l, r, o);
    }
  }
  function Cu(n, r, l) {
    var o = Di(n), c = { lane: o, action: l, hasEagerState: !1, eagerState: null, next: null };
    if (ea(n)) Mv(r, c);
    else {
      var d = n.alternate;
      if (n.lanes === 0 && (d === null || d.lanes === 0) && (d = r.lastRenderedReducer, d !== null)) try {
        var m = r.lastRenderedState, E = d(m, l);
        if (c.hasEagerState = !0, c.eagerState = E, Ja(E, m)) {
          var T = r.interleaved;
          T === null ? (c.next = c, Sd(r)) : (c.next = T.next, T.next = c), r.interleaved = c;
          return;
        }
      } catch {
      } finally {
      }
      l = Ed(n, r, c, o), l !== null && (c = jn(), Ur(l, n, o, c), Wt(l, r, o));
    }
  }
  function ea(n) {
    var r = n.alternate;
    return n === bt || r !== null && r === bt;
  }
  function Mv(n, r) {
    ps = Lc = !0;
    var l = n.pending;
    l === null ? r.next = r : (r.next = l.next, l.next = r), n.pending = r;
  }
  function Wt(n, r, l) {
    if (l & 4194240) {
      var o = r.lanes;
      o &= n.pendingLanes, l |= o, r.lanes = l, ji(n, l);
    }
  }
  var Ru = { readContext: Na, useCallback: Rt, useContext: Rt, useEffect: Rt, useImperativeHandle: Rt, useInsertionEffect: Rt, useLayoutEffect: Rt, useMemo: Rt, useReducer: Rt, useRef: Rt, useState: Rt, useDebugValue: Rt, useDeferredValue: Rt, useTransition: Rt, useMutableSource: Rt, useSyncExternalStore: Rt, useId: Rt, unstable_isNewReconciler: !1 }, Qc = { readContext: Na, useCallback: function(n, r) {
    return wr().memoizedState = [n, r === void 0 ? null : r], n;
  }, useContext: Na, useEffect: Pc, useImperativeHandle: function(n, r, l) {
    return l = l != null ? l.concat([n]) : null, vo(
      4194308,
      4,
      Eu.bind(null, r, n),
      l
    );
  }, useLayoutEffect: function(n, r) {
    return vo(4194308, 4, n, r);
  }, useInsertionEffect: function(n, r) {
    return vo(4, 2, n, r);
  }, useMemo: function(n, r) {
    var l = wr();
    return r = r === void 0 ? null : r, n = n(), l.memoizedState = [n, r], n;
  }, useReducer: function(n, r, l) {
    var o = wr();
    return r = l !== void 0 ? l(r) : r, o.memoizedState = o.baseState = r, n = { pending: null, interleaved: null, lanes: 0, dispatch: null, lastRenderedReducer: n, lastRenderedState: r }, o.queue = n, n = n.dispatch = gs.bind(null, bt, n), [o.memoizedState, n];
  }, useRef: function(n) {
    var r = wr();
    return n = { current: n }, r.memoizedState = n;
  }, useState: Hc, useDebugValue: ms, useDeferredValue: function(n) {
    return wr().memoizedState = n;
  }, useTransition: function() {
    var n = Hc(!1), r = n[0];
    return n = ys.bind(null, n[1]), wr().memoizedState = n, [r, n];
  }, useMutableSource: function() {
  }, useSyncExternalStore: function(n, r, l) {
    var o = bt, c = wr();
    if (cn) {
      if (l === void 0) throw Error(F(407));
      l = l();
    } else {
      if (l = r(), Wn === null) throw Error(F(349));
      Yt & 30 || zc(o, r, l);
    }
    c.memoizedState = l;
    var d = { value: l, getSnapshot: r };
    return c.queue = d, Pc(Ac.bind(
      null,
      o,
      d,
      n
    ), [n]), o.flags |= 2048, Su(9, Uc.bind(null, o, d, l, r), void 0, null), l;
  }, useId: function() {
    var n = wr(), r = Wn.identifierPrefix;
    if (cn) {
      var l = Ri, o = Ci;
      l = (o & ~(1 << 32 - kr(o) - 1)).toString(32) + l, r = ":" + r + "R" + l, l = yu++, 0 < l && (r += "H" + l.toString(32)), r += ":";
    } else l = B++, r = ":" + r + "r" + l.toString(32) + ":";
    return n.memoizedState = r;
  }, unstable_isNewReconciler: !1 }, Ss = {
    readContext: Na,
    useCallback: Yc,
    useContext: Na,
    useEffect: vs,
    useImperativeHandle: $c,
    useInsertionEffect: Bc,
    useLayoutEffect: hs,
    useMemo: Ic,
    useReducer: Ml,
    useRef: Vc,
    useState: function() {
      return Ml(Gi);
    },
    useDebugValue: ms,
    useDeferredValue: function(n) {
      var r = Tn();
      return wd(r, zn.memoizedState, n);
    },
    useTransition: function() {
      var n = Ml(Gi)[0], r = Tn().memoizedState;
      return [n, r];
    },
    useMutableSource: Mc,
    useSyncExternalStore: Nc,
    useId: xd,
    unstable_isNewReconciler: !1
  }, Wc = { readContext: Na, useCallback: Yc, useContext: Na, useEffect: vs, useImperativeHandle: $c, useInsertionEffect: Bc, useLayoutEffect: hs, useMemo: Ic, useReducer: gu, useRef: Vc, useState: function() {
    return gu(Gi);
  }, useDebugValue: ms, useDeferredValue: function(n) {
    var r = Tn();
    return zn === null ? r.memoizedState = n : wd(r, zn.memoizedState, n);
  }, useTransition: function() {
    var n = gu(Gi)[0], r = Tn().memoizedState;
    return [n, r];
  }, useMutableSource: Mc, useSyncExternalStore: Nc, useId: xd, unstable_isNewReconciler: !1 };
  function ni(n, r) {
    if (n && n.defaultProps) {
      r = ne({}, r), n = n.defaultProps;
      for (var l in n) r[l] === void 0 && (r[l] = n[l]);
      return r;
    }
    return r;
  }
  function bd(n, r, l, o) {
    r = n.memoizedState, l = l(o, r), l = l == null ? r : ne({}, r, l), n.memoizedState = l, n.lanes === 0 && (n.updateQueue.baseState = l);
  }
  var Gc = { isMounted: function(n) {
    return (n = n._reactInternals) ? Be(n) === n : !1;
  }, enqueueSetState: function(n, r, l) {
    n = n._reactInternals;
    var o = jn(), c = Di(n), d = Wi(o, c);
    d.payload = r, l != null && (d.callback = l), r = Ol(n, d, c), r !== null && (Ur(r, n, c, o), Dc(r, n, c));
  }, enqueueReplaceState: function(n, r, l) {
    n = n._reactInternals;
    var o = jn(), c = Di(n), d = Wi(o, c);
    d.tag = 1, d.payload = r, l != null && (d.callback = l), r = Ol(n, d, c), r !== null && (Ur(r, n, c, o), Dc(r, n, c));
  }, enqueueForceUpdate: function(n, r) {
    n = n._reactInternals;
    var l = jn(), o = Di(n), c = Wi(l, o);
    c.tag = 2, r != null && (c.callback = r), r = Ol(n, c, o), r !== null && (Ur(r, n, o, l), Dc(r, n, o));
  } };
  function Nv(n, r, l, o, c, d, m) {
    return n = n.stateNode, typeof n.shouldComponentUpdate == "function" ? n.shouldComponentUpdate(o, d, m) : r.prototype && r.prototype.isPureReactComponent ? !Zo(l, o) || !Zo(c, d) : !0;
  }
  function qc(n, r, l) {
    var o = !1, c = Tr, d = r.contextType;
    return typeof d == "object" && d !== null ? d = Na(d) : (c = Mn(r) ? qr : Sn.current, o = r.contextTypes, d = (o = o != null) ? Xr(n, c) : Tr), r = new r(l, d), n.memoizedState = r.state !== null && r.state !== void 0 ? r.state : null, r.updater = Gc, n.stateNode = r, r._reactInternals = n, o && (n = n.stateNode, n.__reactInternalMemoizedUnmaskedChildContext = c, n.__reactInternalMemoizedMaskedChildContext = d), r;
  }
  function zv(n, r, l, o) {
    n = r.state, typeof r.componentWillReceiveProps == "function" && r.componentWillReceiveProps(l, o), typeof r.UNSAFE_componentWillReceiveProps == "function" && r.UNSAFE_componentWillReceiveProps(l, o), r.state !== n && Gc.enqueueReplaceState(r, r.state, null);
  }
  function Es(n, r, l, o) {
    var c = n.stateNode;
    c.props = l, c.state = n.memoizedState, c.refs = {}, Cd(n);
    var d = r.contextType;
    typeof d == "object" && d !== null ? c.context = Na(d) : (d = Mn(r) ? qr : Sn.current, c.context = Xr(n, d)), c.state = n.memoizedState, d = r.getDerivedStateFromProps, typeof d == "function" && (bd(n, r, d, l), c.state = n.memoizedState), typeof r.getDerivedStateFromProps == "function" || typeof c.getSnapshotBeforeUpdate == "function" || typeof c.UNSAFE_componentWillMount != "function" && typeof c.componentWillMount != "function" || (r = c.state, typeof c.componentWillMount == "function" && c.componentWillMount(), typeof c.UNSAFE_componentWillMount == "function" && c.UNSAFE_componentWillMount(), r !== c.state && Gc.enqueueReplaceState(c, c.state, null), os(n, l, c, o), c.state = n.memoizedState), typeof c.componentDidMount == "function" && (n.flags |= 4194308);
  }
  function Tu(n, r) {
    try {
      var l = "", o = r;
      do
        l += tt(o), o = o.return;
      while (o);
      var c = l;
    } catch (d) {
      c = `
Error generating stack: ` + d.message + `
` + d.stack;
    }
    return { value: n, source: r, stack: c, digest: null };
  }
  function _d(n, r, l) {
    return { value: n, source: null, stack: l ?? null, digest: r ?? null };
  }
  function Dd(n, r) {
    try {
      console.error(r.value);
    } catch (l) {
      setTimeout(function() {
        throw l;
      });
    }
  }
  var Xc = typeof WeakMap == "function" ? WeakMap : Map;
  function Uv(n, r, l) {
    l = Wi(-1, l), l.tag = 3, l.payload = { element: null };
    var o = r.value;
    return l.callback = function() {
      Co || (Co = !0, bu = o), Dd(n, r);
    }, l;
  }
  function kd(n, r, l) {
    l = Wi(-1, l), l.tag = 3;
    var o = n.type.getDerivedStateFromError;
    if (typeof o == "function") {
      var c = r.value;
      l.payload = function() {
        return o(c);
      }, l.callback = function() {
        Dd(n, r);
      };
    }
    var d = n.stateNode;
    return d !== null && typeof d.componentDidCatch == "function" && (l.callback = function() {
      Dd(n, r), typeof o != "function" && (Ul === null ? Ul = /* @__PURE__ */ new Set([this]) : Ul.add(this));
      var m = r.stack;
      this.componentDidCatch(r.value, { componentStack: m !== null ? m : "" });
    }), l;
  }
  function Od(n, r, l) {
    var o = n.pingCache;
    if (o === null) {
      o = n.pingCache = new Xc();
      var c = /* @__PURE__ */ new Set();
      o.set(r, c);
    } else c = o.get(r), c === void 0 && (c = /* @__PURE__ */ new Set(), o.set(r, c));
    c.has(l) || (c.add(l), n = cy.bind(null, n, r, l), r.then(n, n));
  }
  function Av(n) {
    do {
      var r;
      if ((r = n.tag === 13) && (r = n.memoizedState, r = r !== null ? r.dehydrated !== null : !0), r) return n;
      n = n.return;
    } while (n !== null);
    return null;
  }
  function Nl(n, r, l, o, c) {
    return n.mode & 1 ? (n.flags |= 65536, n.lanes = c, n) : (n === r ? n.flags |= 65536 : (n.flags |= 128, l.flags |= 131072, l.flags &= -52805, l.tag === 1 && (l.alternate === null ? l.tag = 17 : (r = Wi(-1, 1), r.tag = 2, Ol(l, r, 1))), l.lanes |= 1), n);
  }
  var Cs = ct.ReactCurrentOwner, Un = !1;
  function ur(n, r, l, o) {
    r.child = n === null ? ie(r, null, l, o) : Rn(r, n.child, l, o);
  }
  function ta(n, r, l, o, c) {
    l = l.render;
    var d = r.ref;
    return mn(r, c), o = Ll(n, r, l, o, d, c), l = ti(), n !== null && !Un ? (r.updateQueue = n.updateQueue, r.flags &= -2053, n.lanes &= ~c, Ua(n, r, c)) : (cn && l && wc(r), r.flags |= 1, ur(n, r, o, c), r.child);
  }
  function wu(n, r, l, o, c) {
    if (n === null) {
      var d = l.type;
      return typeof d == "function" && !Yd(d) && d.defaultProps === void 0 && l.compare === null && l.defaultProps === void 0 ? (r.tag = 15, r.type = d, qe(n, r, d, o, c)) : (n = Fs(l.type, null, o, r, r.mode, c), n.ref = r.ref, n.return = r, r.child = n);
    }
    if (d = n.child, !(n.lanes & c)) {
      var m = d.memoizedProps;
      if (l = l.compare, l = l !== null ? l : Zo, l(m, o) && n.ref === r.ref) return Ua(n, r, c);
    }
    return r.flags |= 1, n = Fl(d, o), n.ref = r.ref, n.return = r, r.child = n;
  }
  function qe(n, r, l, o, c) {
    if (n !== null) {
      var d = n.memoizedProps;
      if (Zo(d, o) && n.ref === r.ref) if (Un = !1, r.pendingProps = o = d, (n.lanes & c) !== 0) n.flags & 131072 && (Un = !0);
      else return r.lanes = n.lanes, Ua(n, r, c);
    }
    return Fv(n, r, l, o, c);
  }
  function Rs(n, r, l) {
    var o = r.pendingProps, c = o.children, d = n !== null ? n.memoizedState : null;
    if (o.mode === "hidden") if (!(r.mode & 1)) r.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, Re(go, ya), ya |= l;
    else {
      if (!(l & 1073741824)) return n = d !== null ? d.baseLanes | l : l, r.lanes = r.childLanes = 1073741824, r.memoizedState = { baseLanes: n, cachePool: null, transitions: null }, r.updateQueue = null, Re(go, ya), ya |= n, null;
      r.memoizedState = { baseLanes: 0, cachePool: null, transitions: null }, o = d !== null ? d.baseLanes : l, Re(go, ya), ya |= o;
    }
    else d !== null ? (o = d.baseLanes | l, r.memoizedState = null) : o = l, Re(go, ya), ya |= o;
    return ur(n, r, c, l), r.child;
  }
  function Ld(n, r) {
    var l = r.ref;
    (n === null && l !== null || n !== null && n.ref !== l) && (r.flags |= 512, r.flags |= 2097152);
  }
  function Fv(n, r, l, o, c) {
    var d = Mn(l) ? qr : Sn.current;
    return d = Xr(r, d), mn(r, c), l = Ll(n, r, l, o, d, c), o = ti(), n !== null && !Un ? (r.updateQueue = n.updateQueue, r.flags &= -2053, n.lanes &= ~c, Ua(n, r, c)) : (cn && o && wc(r), r.flags |= 1, ur(n, r, l, c), r.child);
  }
  function jv(n, r, l, o, c) {
    if (Mn(l)) {
      var d = !0;
      Kn(r);
    } else d = !1;
    if (mn(r, c), r.stateNode === null) za(n, r), qc(r, l, o), Es(r, l, o, c), o = !0;
    else if (n === null) {
      var m = r.stateNode, E = r.memoizedProps;
      m.props = E;
      var T = m.context, z = l.contextType;
      typeof z == "object" && z !== null ? z = Na(z) : (z = Mn(l) ? qr : Sn.current, z = Xr(r, z));
      var I = l.getDerivedStateFromProps, W = typeof I == "function" || typeof m.getSnapshotBeforeUpdate == "function";
      W || typeof m.UNSAFE_componentWillReceiveProps != "function" && typeof m.componentWillReceiveProps != "function" || (E !== o || T !== z) && zv(r, m, o, z), ma = !1;
      var Y = r.memoizedState;
      m.state = Y, os(r, o, m, c), T = r.memoizedState, E !== o || Y !== T || In.current || ma ? (typeof I == "function" && (bd(r, l, I, o), T = r.memoizedState), (E = ma || Nv(r, l, E, o, Y, T, z)) ? (W || typeof m.UNSAFE_componentWillMount != "function" && typeof m.componentWillMount != "function" || (typeof m.componentWillMount == "function" && m.componentWillMount(), typeof m.UNSAFE_componentWillMount == "function" && m.UNSAFE_componentWillMount()), typeof m.componentDidMount == "function" && (r.flags |= 4194308)) : (typeof m.componentDidMount == "function" && (r.flags |= 4194308), r.memoizedProps = o, r.memoizedState = T), m.props = o, m.state = T, m.context = z, o = E) : (typeof m.componentDidMount == "function" && (r.flags |= 4194308), o = !1);
    } else {
      m = r.stateNode, kv(n, r), E = r.memoizedProps, z = r.type === r.elementType ? E : ni(r.type, E), m.props = z, W = r.pendingProps, Y = m.context, T = l.contextType, typeof T == "object" && T !== null ? T = Na(T) : (T = Mn(l) ? qr : Sn.current, T = Xr(r, T));
      var oe = l.getDerivedStateFromProps;
      (I = typeof oe == "function" || typeof m.getSnapshotBeforeUpdate == "function") || typeof m.UNSAFE_componentWillReceiveProps != "function" && typeof m.componentWillReceiveProps != "function" || (E !== W || Y !== T) && zv(r, m, o, T), ma = !1, Y = r.memoizedState, m.state = Y, os(r, o, m, c);
      var ve = r.memoizedState;
      E !== W || Y !== ve || In.current || ma ? (typeof oe == "function" && (bd(r, l, oe, o), ve = r.memoizedState), (z = ma || Nv(r, l, z, o, Y, ve, T) || !1) ? (I || typeof m.UNSAFE_componentWillUpdate != "function" && typeof m.componentWillUpdate != "function" || (typeof m.componentWillUpdate == "function" && m.componentWillUpdate(o, ve, T), typeof m.UNSAFE_componentWillUpdate == "function" && m.UNSAFE_componentWillUpdate(o, ve, T)), typeof m.componentDidUpdate == "function" && (r.flags |= 4), typeof m.getSnapshotBeforeUpdate == "function" && (r.flags |= 1024)) : (typeof m.componentDidUpdate != "function" || E === n.memoizedProps && Y === n.memoizedState || (r.flags |= 4), typeof m.getSnapshotBeforeUpdate != "function" || E === n.memoizedProps && Y === n.memoizedState || (r.flags |= 1024), r.memoizedProps = o, r.memoizedState = ve), m.props = o, m.state = ve, m.context = T, o = z) : (typeof m.componentDidUpdate != "function" || E === n.memoizedProps && Y === n.memoizedState || (r.flags |= 4), typeof m.getSnapshotBeforeUpdate != "function" || E === n.memoizedProps && Y === n.memoizedState || (r.flags |= 1024), o = !1);
    }
    return Ts(n, r, l, o, d, c);
  }
  function Ts(n, r, l, o, c, d) {
    Ld(n, r);
    var m = (r.flags & 128) !== 0;
    if (!o && !m) return c && Rc(r, l, !1), Ua(n, r, d);
    o = r.stateNode, Cs.current = r;
    var E = m && typeof l.getDerivedStateFromError != "function" ? null : o.render();
    return r.flags |= 1, n !== null && m ? (r.child = Rn(r, n.child, null, d), r.child = Rn(r, null, E, d)) : ur(n, r, E, d), r.memoizedState = o.state, c && Rc(r, l, !0), r.child;
  }
  function mo(n) {
    var r = n.stateNode;
    r.pendingContext ? xv(n, r.pendingContext, r.pendingContext !== r.context) : r.context && xv(n, r.context, !1), Td(n, r.containerInfo);
  }
  function Hv(n, r, l, o, c) {
    return kl(), Qi(c), r.flags |= 256, ur(n, r, l, o), r.child;
  }
  var Kc = { dehydrated: null, treeContext: null, retryLane: 0 };
  function Md(n) {
    return { baseLanes: n, cachePool: null, transitions: null };
  }
  function Zc(n, r, l) {
    var o = r.pendingProps, c = yn.current, d = !1, m = (r.flags & 128) !== 0, E;
    if ((E = m) || (E = n !== null && n.memoizedState === null ? !1 : (c & 2) !== 0), E ? (d = !0, r.flags &= -129) : (n === null || n.memoizedState !== null) && (c |= 1), Re(yn, c & 1), n === null)
      return vd(r), n = r.memoizedState, n !== null && (n = n.dehydrated, n !== null) ? (r.mode & 1 ? n.data === "$!" ? r.lanes = 8 : r.lanes = 1073741824 : r.lanes = 1, null) : (m = o.children, n = o.fallback, d ? (o = r.mode, d = r.child, m = { mode: "hidden", children: m }, !(o & 1) && d !== null ? (d.childLanes = 0, d.pendingProps = m) : d = jl(m, o, 0, null), n = Zi(n, o, l, null), d.return = r, n.return = r, d.sibling = n, r.child = d, r.child.memoizedState = Md(l), r.memoizedState = Kc, n) : Nd(r, m));
    if (c = n.memoizedState, c !== null && (E = c.dehydrated, E !== null)) return Vv(n, r, m, o, E, c, l);
    if (d) {
      d = o.fallback, m = r.mode, c = n.child, E = c.sibling;
      var T = { mode: "hidden", children: o.children };
      return !(m & 1) && r.child !== c ? (o = r.child, o.childLanes = 0, o.pendingProps = T, r.deletions = null) : (o = Fl(c, T), o.subtreeFlags = c.subtreeFlags & 14680064), E !== null ? d = Fl(E, d) : (d = Zi(d, m, l, null), d.flags |= 2), d.return = r, o.return = r, o.sibling = d, r.child = o, o = d, d = r.child, m = n.child.memoizedState, m = m === null ? Md(l) : { baseLanes: m.baseLanes | l, cachePool: null, transitions: m.transitions }, d.memoizedState = m, d.childLanes = n.childLanes & ~l, r.memoizedState = Kc, o;
    }
    return d = n.child, n = d.sibling, o = Fl(d, { mode: "visible", children: o.children }), !(r.mode & 1) && (o.lanes = l), o.return = r, o.sibling = null, n !== null && (l = r.deletions, l === null ? (r.deletions = [n], r.flags |= 16) : l.push(n)), r.child = o, r.memoizedState = null, o;
  }
  function Nd(n, r) {
    return r = jl({ mode: "visible", children: r }, n.mode, 0, null), r.return = n, n.child = r;
  }
  function ws(n, r, l, o) {
    return o !== null && Qi(o), Rn(r, n.child, null, l), n = Nd(r, r.pendingProps.children), n.flags |= 2, r.memoizedState = null, n;
  }
  function Vv(n, r, l, o, c, d, m) {
    if (l)
      return r.flags & 256 ? (r.flags &= -257, o = _d(Error(F(422))), ws(n, r, m, o)) : r.memoizedState !== null ? (r.child = n.child, r.flags |= 128, null) : (d = o.fallback, c = r.mode, o = jl({ mode: "visible", children: o.children }, c, 0, null), d = Zi(d, c, m, null), d.flags |= 2, o.return = r, d.return = r, o.sibling = d, r.child = o, r.mode & 1 && Rn(r, n.child, null, m), r.child.memoizedState = Md(m), r.memoizedState = Kc, d);
    if (!(r.mode & 1)) return ws(n, r, m, null);
    if (c.data === "$!") {
      if (o = c.nextSibling && c.nextSibling.dataset, o) var E = o.dgst;
      return o = E, d = Error(F(419)), o = _d(d, o, void 0), ws(n, r, m, o);
    }
    if (E = (m & n.childLanes) !== 0, Un || E) {
      if (o = Wn, o !== null) {
        switch (m & -m) {
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
        c = c & (o.suspendedLanes | m) ? 0 : c, c !== 0 && c !== d.retryLane && (d.retryLane = c, ha(n, c), Ur(o, n, c, -1));
      }
      return $d(), o = _d(Error(F(421))), ws(n, r, m, o);
    }
    return c.data === "$?" ? (r.flags |= 128, r.child = n.child, r = fy.bind(null, n), c._reactRetry = r, null) : (n = d.treeContext, Zr = yi(c.nextSibling), Kr = r, cn = !0, Ma = null, n !== null && (Nn[La++] = Ci, Nn[La++] = Ri, Nn[La++] = pa, Ci = n.id, Ri = n.overflow, pa = r), r = Nd(r, o.children), r.flags |= 4096, r);
  }
  function zd(n, r, l) {
    n.lanes |= r;
    var o = n.alternate;
    o !== null && (o.lanes |= r), gd(n.return, r, l);
  }
  function Mr(n, r, l, o, c) {
    var d = n.memoizedState;
    d === null ? n.memoizedState = { isBackwards: r, rendering: null, renderingStartTime: 0, last: o, tail: l, tailMode: c } : (d.isBackwards = r, d.rendering = null, d.renderingStartTime = 0, d.last = o, d.tail = l, d.tailMode = c);
  }
  function wi(n, r, l) {
    var o = r.pendingProps, c = o.revealOrder, d = o.tail;
    if (ur(n, r, o.children, l), o = yn.current, o & 2) o = o & 1 | 2, r.flags |= 128;
    else {
      if (n !== null && n.flags & 128) e: for (n = r.child; n !== null; ) {
        if (n.tag === 13) n.memoizedState !== null && zd(n, l, r);
        else if (n.tag === 19) zd(n, l, r);
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
    if (Re(yn, o), !(r.mode & 1)) r.memoizedState = null;
    else switch (c) {
      case "forwards":
        for (l = r.child, c = null; l !== null; ) n = l.alternate, n !== null && Oc(n) === null && (c = l), l = l.sibling;
        l = c, l === null ? (c = r.child, r.child = null) : (c = l.sibling, l.sibling = null), Mr(r, !1, c, l, d);
        break;
      case "backwards":
        for (l = null, c = r.child, r.child = null; c !== null; ) {
          if (n = c.alternate, n !== null && Oc(n) === null) {
            r.child = c;
            break;
          }
          n = c.sibling, c.sibling = l, l = c, c = n;
        }
        Mr(r, !0, l, null, d);
        break;
      case "together":
        Mr(r, !1, null, null, void 0);
        break;
      default:
        r.memoizedState = null;
    }
    return r.child;
  }
  function za(n, r) {
    !(r.mode & 1) && n !== null && (n.alternate = null, r.alternate = null, r.flags |= 2);
  }
  function Ua(n, r, l) {
    if (n !== null && (r.dependencies = n.dependencies), _i |= r.lanes, !(l & r.childLanes)) return null;
    if (n !== null && r.child !== n.child) throw Error(F(153));
    if (r.child !== null) {
      for (n = r.child, l = Fl(n, n.pendingProps), r.child = l, l.return = r; n.sibling !== null; ) n = n.sibling, l = l.sibling = Fl(n, n.pendingProps), l.return = r;
      l.sibling = null;
    }
    return r.child;
  }
  function xs(n, r, l) {
    switch (r.tag) {
      case 3:
        mo(r), kl();
        break;
      case 5:
        Lv(r);
        break;
      case 1:
        Mn(r.type) && Kn(r);
        break;
      case 4:
        Td(r, r.stateNode.containerInfo);
        break;
      case 10:
        var o = r.type._context, c = r.memoizedProps.value;
        Re(va, o._currentValue), o._currentValue = c;
        break;
      case 13:
        if (o = r.memoizedState, o !== null)
          return o.dehydrated !== null ? (Re(yn, yn.current & 1), r.flags |= 128, null) : l & r.child.childLanes ? Zc(n, r, l) : (Re(yn, yn.current & 1), n = Ua(n, r, l), n !== null ? n.sibling : null);
        Re(yn, yn.current & 1);
        break;
      case 19:
        if (o = (l & r.childLanes) !== 0, n.flags & 128) {
          if (o) return wi(n, r, l);
          r.flags |= 128;
        }
        if (c = r.memoizedState, c !== null && (c.rendering = null, c.tail = null, c.lastEffect = null), Re(yn, yn.current), o) break;
        return null;
      case 22:
      case 23:
        return r.lanes = 0, Rs(n, r, l);
    }
    return Ua(n, r, l);
  }
  var Aa, An, Pv, Bv;
  Aa = function(n, r) {
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
  }, An = function() {
  }, Pv = function(n, r, l, o) {
    var c = n.memoizedProps;
    if (c !== o) {
      n = r.stateNode, hu(Ti.current);
      var d = null;
      switch (l) {
        case "input":
          c = nr(n, c), o = nr(n, o), d = [];
          break;
        case "select":
          c = ne({}, c, { value: void 0 }), o = ne({}, o, { value: void 0 }), d = [];
          break;
        case "textarea":
          c = Bn(n, c), o = Bn(n, o), d = [];
          break;
        default:
          typeof c.onClick != "function" && typeof o.onClick == "function" && (n.onclick = Tl);
      }
      nn(l, o);
      var m;
      l = null;
      for (z in c) if (!o.hasOwnProperty(z) && c.hasOwnProperty(z) && c[z] != null) if (z === "style") {
        var E = c[z];
        for (m in E) E.hasOwnProperty(m) && (l || (l = {}), l[m] = "");
      } else z !== "dangerouslySetInnerHTML" && z !== "children" && z !== "suppressContentEditableWarning" && z !== "suppressHydrationWarning" && z !== "autoFocus" && (Nt.hasOwnProperty(z) ? d || (d = []) : (d = d || []).push(z, null));
      for (z in o) {
        var T = o[z];
        if (E = c != null ? c[z] : void 0, o.hasOwnProperty(z) && T !== E && (T != null || E != null)) if (z === "style") if (E) {
          for (m in E) !E.hasOwnProperty(m) || T && T.hasOwnProperty(m) || (l || (l = {}), l[m] = "");
          for (m in T) T.hasOwnProperty(m) && E[m] !== T[m] && (l || (l = {}), l[m] = T[m]);
        } else l || (d || (d = []), d.push(
          z,
          l
        )), l = T;
        else z === "dangerouslySetInnerHTML" ? (T = T ? T.__html : void 0, E = E ? E.__html : void 0, T != null && E !== T && (d = d || []).push(z, T)) : z === "children" ? typeof T != "string" && typeof T != "number" || (d = d || []).push(z, "" + T) : z !== "suppressContentEditableWarning" && z !== "suppressHydrationWarning" && (Nt.hasOwnProperty(z) ? (T != null && z === "onScroll" && At("scroll", n), d || E === T || (d = [])) : (d = d || []).push(z, T));
      }
      l && (d = d || []).push("style", l);
      var z = d;
      (r.updateQueue = z) && (r.flags |= 4);
    }
  }, Bv = function(n, r, l, o) {
    l !== o && (r.flags |= 4);
  };
  function bs(n, r) {
    if (!cn) switch (n.tailMode) {
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
  function Jn(n) {
    var r = n.alternate !== null && n.alternate.child === n.child, l = 0, o = 0;
    if (r) for (var c = n.child; c !== null; ) l |= c.lanes | c.childLanes, o |= c.subtreeFlags & 14680064, o |= c.flags & 14680064, c.return = n, c = c.sibling;
    else for (c = n.child; c !== null; ) l |= c.lanes | c.childLanes, o |= c.subtreeFlags, o |= c.flags, c.return = n, c = c.sibling;
    return n.subtreeFlags |= o, n.childLanes = l, r;
  }
  function $v(n, r, l) {
    var o = r.pendingProps;
    switch (xc(r), r.tag) {
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
        return Jn(r), null;
      case 1:
        return Mn(r.type) && co(), Jn(r), null;
      case 3:
        return o = r.stateNode, mu(), Zt(In), Zt(Sn), ke(), o.pendingContext && (o.context = o.pendingContext, o.pendingContext = null), (n === null || n.child === null) && (bc(r) ? r.flags |= 4 : n === null || n.memoizedState.isDehydrated && !(r.flags & 256) || (r.flags |= 1024, Ma !== null && (_u(Ma), Ma = null))), An(n, r), Jn(r), null;
      case 5:
        kc(r);
        var c = hu(fs.current);
        if (l = r.type, n !== null && r.stateNode != null) Pv(n, r, l, o, c), n.ref !== r.ref && (r.flags |= 512, r.flags |= 2097152);
        else {
          if (!o) {
            if (r.stateNode === null) throw Error(F(166));
            return Jn(r), null;
          }
          if (n = hu(Ti.current), bc(r)) {
            o = r.stateNode, l = r.type;
            var d = r.memoizedProps;
            switch (o[gi] = r, o[as] = d, n = (r.mode & 1) !== 0, l) {
              case "dialog":
                At("cancel", o), At("close", o);
                break;
              case "iframe":
              case "object":
              case "embed":
                At("load", o);
                break;
              case "video":
              case "audio":
                for (c = 0; c < ts.length; c++) At(ts[c], o);
                break;
              case "source":
                At("error", o);
                break;
              case "img":
              case "image":
              case "link":
                At(
                  "error",
                  o
                ), At("load", o);
                break;
              case "details":
                At("toggle", o);
                break;
              case "input":
                Vn(o, d), At("invalid", o);
                break;
              case "select":
                o._wrapperState = { wasMultiple: !!d.multiple }, At("invalid", o);
                break;
              case "textarea":
                gr(o, d), At("invalid", o);
            }
            nn(l, d), c = null;
            for (var m in d) if (d.hasOwnProperty(m)) {
              var E = d[m];
              m === "children" ? typeof E == "string" ? o.textContent !== E && (d.suppressHydrationWarning !== !0 && gc(o.textContent, E, n), c = ["children", E]) : typeof E == "number" && o.textContent !== "" + E && (d.suppressHydrationWarning !== !0 && gc(
                o.textContent,
                E,
                n
              ), c = ["children", "" + E]) : Nt.hasOwnProperty(m) && E != null && m === "onScroll" && At("scroll", o);
            }
            switch (l) {
              case "input":
                Dn(o), oi(o, d, !0);
                break;
              case "textarea":
                Dn(o), kn(o);
                break;
              case "select":
              case "option":
                break;
              default:
                typeof d.onClick == "function" && (o.onclick = Tl);
            }
            o = c, r.updateQueue = o, o !== null && (r.flags |= 4);
          } else {
            m = c.nodeType === 9 ? c : c.ownerDocument, n === "http://www.w3.org/1999/xhtml" && (n = Sr(l)), n === "http://www.w3.org/1999/xhtml" ? l === "script" ? (n = m.createElement("div"), n.innerHTML = "<script><\/script>", n = n.removeChild(n.firstChild)) : typeof o.is == "string" ? n = m.createElement(l, { is: o.is }) : (n = m.createElement(l), l === "select" && (m = n, o.multiple ? m.multiple = !0 : o.size && (m.size = o.size))) : n = m.createElementNS(n, l), n[gi] = r, n[as] = o, Aa(n, r, !1, !1), r.stateNode = n;
            e: {
              switch (m = Xn(l, o), l) {
                case "dialog":
                  At("cancel", n), At("close", n), c = o;
                  break;
                case "iframe":
                case "object":
                case "embed":
                  At("load", n), c = o;
                  break;
                case "video":
                case "audio":
                  for (c = 0; c < ts.length; c++) At(ts[c], n);
                  c = o;
                  break;
                case "source":
                  At("error", n), c = o;
                  break;
                case "img":
                case "image":
                case "link":
                  At(
                    "error",
                    n
                  ), At("load", n), c = o;
                  break;
                case "details":
                  At("toggle", n), c = o;
                  break;
                case "input":
                  Vn(n, o), c = nr(n, o), At("invalid", n);
                  break;
                case "option":
                  c = o;
                  break;
                case "select":
                  n._wrapperState = { wasMultiple: !!o.multiple }, c = ne({}, o, { value: void 0 }), At("invalid", n);
                  break;
                case "textarea":
                  gr(n, o), c = Bn(n, o), At("invalid", n);
                  break;
                default:
                  c = o;
              }
              nn(l, c), E = c;
              for (d in E) if (E.hasOwnProperty(d)) {
                var T = E[d];
                d === "style" ? qt(n, T) : d === "dangerouslySetInnerHTML" ? (T = T ? T.__html : void 0, T != null && si(n, T)) : d === "children" ? typeof T == "string" ? (l !== "textarea" || T !== "") && K(n, T) : typeof T == "number" && K(n, "" + T) : d !== "suppressContentEditableWarning" && d !== "suppressHydrationWarning" && d !== "autoFocus" && (Nt.hasOwnProperty(d) ? T != null && d === "onScroll" && At("scroll", n) : T != null && We(n, d, T, m));
              }
              switch (l) {
                case "input":
                  Dn(n), oi(n, o, !1);
                  break;
                case "textarea":
                  Dn(n), kn(n);
                  break;
                case "option":
                  o.value != null && n.setAttribute("value", "" + Ze(o.value));
                  break;
                case "select":
                  n.multiple = !!o.multiple, d = o.value, d != null ? Cn(n, !!o.multiple, d, !1) : o.defaultValue != null && Cn(
                    n,
                    !!o.multiple,
                    o.defaultValue,
                    !0
                  );
                  break;
                default:
                  typeof c.onClick == "function" && (n.onclick = Tl);
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
        return Jn(r), null;
      case 6:
        if (n && r.stateNode != null) Bv(n, r, n.memoizedProps, o);
        else {
          if (typeof o != "string" && r.stateNode === null) throw Error(F(166));
          if (l = hu(fs.current), hu(Ti.current), bc(r)) {
            if (o = r.stateNode, l = r.memoizedProps, o[gi] = r, (d = o.nodeValue !== l) && (n = Kr, n !== null)) switch (n.tag) {
              case 3:
                gc(o.nodeValue, l, (n.mode & 1) !== 0);
                break;
              case 5:
                n.memoizedProps.suppressHydrationWarning !== !0 && gc(o.nodeValue, l, (n.mode & 1) !== 0);
            }
            d && (r.flags |= 4);
          } else o = (l.nodeType === 9 ? l : l.ownerDocument).createTextNode(o), o[gi] = r, r.stateNode = o;
        }
        return Jn(r), null;
      case 13:
        if (Zt(yn), o = r.memoizedState, n === null || n.memoizedState !== null && n.memoizedState.dehydrated !== null) {
          if (cn && Zr !== null && r.mode & 1 && !(r.flags & 128)) us(), kl(), r.flags |= 98560, d = !1;
          else if (d = bc(r), o !== null && o.dehydrated !== null) {
            if (n === null) {
              if (!d) throw Error(F(318));
              if (d = r.memoizedState, d = d !== null ? d.dehydrated : null, !d) throw Error(F(317));
              d[gi] = r;
            } else kl(), !(r.flags & 128) && (r.memoizedState = null), r.flags |= 4;
            Jn(r), d = !1;
          } else Ma !== null && (_u(Ma), Ma = null), d = !0;
          if (!d) return r.flags & 65536 ? r : null;
        }
        return r.flags & 128 ? (r.lanes = l, r) : (o = o !== null, o !== (n !== null && n.memoizedState !== null) && o && (r.child.flags |= 8192, r.mode & 1 && (n === null || yn.current & 1 ? xn === 0 && (xn = 3) : $d())), r.updateQueue !== null && (r.flags |= 4), Jn(r), null);
      case 4:
        return mu(), An(n, r), n === null && io(r.stateNode.containerInfo), Jn(r), null;
      case 10:
        return yd(r.type._context), Jn(r), null;
      case 17:
        return Mn(r.type) && co(), Jn(r), null;
      case 19:
        if (Zt(yn), d = r.memoizedState, d === null) return Jn(r), null;
        if (o = (r.flags & 128) !== 0, m = d.rendering, m === null) if (o) bs(d, !1);
        else {
          if (xn !== 0 || n !== null && n.flags & 128) for (n = r.child; n !== null; ) {
            if (m = Oc(n), m !== null) {
              for (r.flags |= 128, bs(d, !1), o = m.updateQueue, o !== null && (r.updateQueue = o, r.flags |= 4), r.subtreeFlags = 0, o = l, l = r.child; l !== null; ) d = l, n = o, d.flags &= 14680066, m = d.alternate, m === null ? (d.childLanes = 0, d.lanes = n, d.child = null, d.subtreeFlags = 0, d.memoizedProps = null, d.memoizedState = null, d.updateQueue = null, d.dependencies = null, d.stateNode = null) : (d.childLanes = m.childLanes, d.lanes = m.lanes, d.child = m.child, d.subtreeFlags = 0, d.deletions = null, d.memoizedProps = m.memoizedProps, d.memoizedState = m.memoizedState, d.updateQueue = m.updateQueue, d.type = m.type, n = m.dependencies, d.dependencies = n === null ? null : { lanes: n.lanes, firstContext: n.firstContext }), l = l.sibling;
              return Re(yn, yn.current & 1 | 2), r.child;
            }
            n = n.sibling;
          }
          d.tail !== null && Mt() > Eo && (r.flags |= 128, o = !0, bs(d, !1), r.lanes = 4194304);
        }
        else {
          if (!o) if (n = Oc(m), n !== null) {
            if (r.flags |= 128, o = !0, l = n.updateQueue, l !== null && (r.updateQueue = l, r.flags |= 4), bs(d, !0), d.tail === null && d.tailMode === "hidden" && !m.alternate && !cn) return Jn(r), null;
          } else 2 * Mt() - d.renderingStartTime > Eo && l !== 1073741824 && (r.flags |= 128, o = !0, bs(d, !1), r.lanes = 4194304);
          d.isBackwards ? (m.sibling = r.child, r.child = m) : (l = d.last, l !== null ? l.sibling = m : r.child = m, d.last = m);
        }
        return d.tail !== null ? (r = d.tail, d.rendering = r, d.tail = r.sibling, d.renderingStartTime = Mt(), r.sibling = null, l = yn.current, Re(yn, o ? l & 1 | 2 : l & 1), r) : (Jn(r), null);
      case 22:
      case 23:
        return Bd(), o = r.memoizedState !== null, n !== null && n.memoizedState !== null !== o && (r.flags |= 8192), o && r.mode & 1 ? ya & 1073741824 && (Jn(r), r.subtreeFlags & 6 && (r.flags |= 8192)) : Jn(r), null;
      case 24:
        return null;
      case 25:
        return null;
    }
    throw Error(F(156, r.tag));
  }
  function Jc(n, r) {
    switch (xc(r), r.tag) {
      case 1:
        return Mn(r.type) && co(), n = r.flags, n & 65536 ? (r.flags = n & -65537 | 128, r) : null;
      case 3:
        return mu(), Zt(In), Zt(Sn), ke(), n = r.flags, n & 65536 && !(n & 128) ? (r.flags = n & -65537 | 128, r) : null;
      case 5:
        return kc(r), null;
      case 13:
        if (Zt(yn), n = r.memoizedState, n !== null && n.dehydrated !== null) {
          if (r.alternate === null) throw Error(F(340));
          kl();
        }
        return n = r.flags, n & 65536 ? (r.flags = n & -65537 | 128, r) : null;
      case 19:
        return Zt(yn), null;
      case 4:
        return mu(), null;
      case 10:
        return yd(r.type._context), null;
      case 22:
      case 23:
        return Bd(), null;
      case 24:
        return null;
      default:
        return null;
    }
  }
  var _s = !1, xr = !1, ay = typeof WeakSet == "function" ? WeakSet : Set, de = null;
  function yo(n, r) {
    var l = n.ref;
    if (l !== null) if (typeof l == "function") try {
      l(null);
    } catch (o) {
      fn(n, r, o);
    }
    else l.current = null;
  }
  function ef(n, r, l) {
    try {
      l();
    } catch (o) {
      fn(n, r, o);
    }
  }
  var Yv = !1;
  function Iv(n, r) {
    if (rs = _a, n = Jo(), cc(n)) {
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
          var m = 0, E = -1, T = -1, z = 0, I = 0, W = n, Y = null;
          t: for (; ; ) {
            for (var oe; W !== l || c !== 0 && W.nodeType !== 3 || (E = m + c), W !== d || o !== 0 && W.nodeType !== 3 || (T = m + o), W.nodeType === 3 && (m += W.nodeValue.length), (oe = W.firstChild) !== null; )
              Y = W, W = oe;
            for (; ; ) {
              if (W === n) break t;
              if (Y === l && ++z === c && (E = m), Y === d && ++I === o && (T = m), (oe = W.nextSibling) !== null) break;
              W = Y, Y = W.parentNode;
            }
            W = oe;
          }
          l = E === -1 || T === -1 ? null : { start: E, end: T };
        } else l = null;
      }
      l = l || { start: 0, end: 0 };
    } else l = null;
    for (su = { focusedElem: n, selectionRange: l }, _a = !1, de = r; de !== null; ) if (r = de, n = r.child, (r.subtreeFlags & 1028) !== 0 && n !== null) n.return = r, de = n;
    else for (; de !== null; ) {
      r = de;
      try {
        var ve = r.alternate;
        if (r.flags & 1024) switch (r.tag) {
          case 0:
          case 11:
          case 15:
            break;
          case 1:
            if (ve !== null) {
              var ye = ve.memoizedProps, bn = ve.memoizedState, D = r.stateNode, x = D.getSnapshotBeforeUpdate(r.elementType === r.type ? ye : ni(r.type, ye), bn);
              D.__reactInternalSnapshotBeforeUpdate = x;
            }
            break;
          case 3:
            var L = r.stateNode.containerInfo;
            L.nodeType === 1 ? L.textContent = "" : L.nodeType === 9 && L.documentElement && L.removeChild(L.documentElement);
            break;
          case 5:
          case 6:
          case 4:
          case 17:
            break;
          default:
            throw Error(F(163));
        }
      } catch (Q) {
        fn(r, r.return, Q);
      }
      if (n = r.sibling, n !== null) {
        n.return = r.return, de = n;
        break;
      }
      de = r.return;
    }
    return ve = Yv, Yv = !1, ve;
  }
  function Ds(n, r, l) {
    var o = r.updateQueue;
    if (o = o !== null ? o.lastEffect : null, o !== null) {
      var c = o = o.next;
      do {
        if ((c.tag & n) === n) {
          var d = c.destroy;
          c.destroy = void 0, d !== void 0 && ef(r, l, d);
        }
        c = c.next;
      } while (c !== o);
    }
  }
  function ks(n, r) {
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
  function Ud(n) {
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
  function tf(n) {
    var r = n.alternate;
    r !== null && (n.alternate = null, tf(r)), n.child = null, n.deletions = null, n.sibling = null, n.tag === 5 && (r = n.stateNode, r !== null && (delete r[gi], delete r[as], delete r[is], delete r[so], delete r[ny])), n.stateNode = null, n.return = null, n.dependencies = null, n.memoizedProps = null, n.memoizedState = null, n.pendingProps = null, n.stateNode = null, n.updateQueue = null;
  }
  function Os(n) {
    return n.tag === 5 || n.tag === 3 || n.tag === 4;
  }
  function qi(n) {
    e: for (; ; ) {
      for (; n.sibling === null; ) {
        if (n.return === null || Os(n.return)) return null;
        n = n.return;
      }
      for (n.sibling.return = n.return, n = n.sibling; n.tag !== 5 && n.tag !== 6 && n.tag !== 18; ) {
        if (n.flags & 2 || n.child === null || n.tag === 4) continue e;
        n.child.return = n, n = n.child;
      }
      if (!(n.flags & 2)) return n.stateNode;
    }
  }
  function xi(n, r, l) {
    var o = n.tag;
    if (o === 5 || o === 6) n = n.stateNode, r ? l.nodeType === 8 ? l.parentNode.insertBefore(n, r) : l.insertBefore(n, r) : (l.nodeType === 8 ? (r = l.parentNode, r.insertBefore(n, l)) : (r = l, r.appendChild(n)), l = l._reactRootContainer, l != null || r.onclick !== null || (r.onclick = Tl));
    else if (o !== 4 && (n = n.child, n !== null)) for (xi(n, r, l), n = n.sibling; n !== null; ) xi(n, r, l), n = n.sibling;
  }
  function bi(n, r, l) {
    var o = n.tag;
    if (o === 5 || o === 6) n = n.stateNode, r ? l.insertBefore(n, r) : l.appendChild(n);
    else if (o !== 4 && (n = n.child, n !== null)) for (bi(n, r, l), n = n.sibling; n !== null; ) bi(n, r, l), n = n.sibling;
  }
  var wn = null, Nr = !1;
  function zr(n, r, l) {
    for (l = l.child; l !== null; ) Qv(n, r, l), l = l.sibling;
  }
  function Qv(n, r, l) {
    if (Wr && typeof Wr.onCommitFiberUnmount == "function") try {
      Wr.onCommitFiberUnmount(vl, l);
    } catch {
    }
    switch (l.tag) {
      case 5:
        xr || yo(l, r);
      case 6:
        var o = wn, c = Nr;
        wn = null, zr(n, r, l), wn = o, Nr = c, wn !== null && (Nr ? (n = wn, l = l.stateNode, n.nodeType === 8 ? n.parentNode.removeChild(l) : n.removeChild(l)) : wn.removeChild(l.stateNode));
        break;
      case 18:
        wn !== null && (Nr ? (n = wn, l = l.stateNode, n.nodeType === 8 ? oo(n.parentNode, l) : n.nodeType === 1 && oo(n, l), Ka(n)) : oo(wn, l.stateNode));
        break;
      case 4:
        o = wn, c = Nr, wn = l.stateNode.containerInfo, Nr = !0, zr(n, r, l), wn = o, Nr = c;
        break;
      case 0:
      case 11:
      case 14:
      case 15:
        if (!xr && (o = l.updateQueue, o !== null && (o = o.lastEffect, o !== null))) {
          c = o = o.next;
          do {
            var d = c, m = d.destroy;
            d = d.tag, m !== void 0 && (d & 2 || d & 4) && ef(l, r, m), c = c.next;
          } while (c !== o);
        }
        zr(n, r, l);
        break;
      case 1:
        if (!xr && (yo(l, r), o = l.stateNode, typeof o.componentWillUnmount == "function")) try {
          o.props = l.memoizedProps, o.state = l.memoizedState, o.componentWillUnmount();
        } catch (E) {
          fn(l, r, E);
        }
        zr(n, r, l);
        break;
      case 21:
        zr(n, r, l);
        break;
      case 22:
        l.mode & 1 ? (xr = (o = xr) || l.memoizedState !== null, zr(n, r, l), xr = o) : zr(n, r, l);
        break;
      default:
        zr(n, r, l);
    }
  }
  function Wv(n) {
    var r = n.updateQueue;
    if (r !== null) {
      n.updateQueue = null;
      var l = n.stateNode;
      l === null && (l = n.stateNode = new ay()), r.forEach(function(o) {
        var c = nh.bind(null, n, o);
        l.has(o) || (l.add(o), o.then(c, c));
      });
    }
  }
  function ri(n, r) {
    var l = r.deletions;
    if (l !== null) for (var o = 0; o < l.length; o++) {
      var c = l[o];
      try {
        var d = n, m = r, E = m;
        e: for (; E !== null; ) {
          switch (E.tag) {
            case 5:
              wn = E.stateNode, Nr = !1;
              break e;
            case 3:
              wn = E.stateNode.containerInfo, Nr = !0;
              break e;
            case 4:
              wn = E.stateNode.containerInfo, Nr = !0;
              break e;
          }
          E = E.return;
        }
        if (wn === null) throw Error(F(160));
        Qv(d, m, c), wn = null, Nr = !1;
        var T = c.alternate;
        T !== null && (T.return = null), c.return = null;
      } catch (z) {
        fn(c, r, z);
      }
    }
    if (r.subtreeFlags & 12854) for (r = r.child; r !== null; ) Ad(r, n), r = r.sibling;
  }
  function Ad(n, r) {
    var l = n.alternate, o = n.flags;
    switch (n.tag) {
      case 0:
      case 11:
      case 14:
      case 15:
        if (ri(r, n), na(n), o & 4) {
          try {
            Ds(3, n, n.return), ks(3, n);
          } catch (ye) {
            fn(n, n.return, ye);
          }
          try {
            Ds(5, n, n.return);
          } catch (ye) {
            fn(n, n.return, ye);
          }
        }
        break;
      case 1:
        ri(r, n), na(n), o & 512 && l !== null && yo(l, l.return);
        break;
      case 5:
        if (ri(r, n), na(n), o & 512 && l !== null && yo(l, l.return), n.flags & 32) {
          var c = n.stateNode;
          try {
            K(c, "");
          } catch (ye) {
            fn(n, n.return, ye);
          }
        }
        if (o & 4 && (c = n.stateNode, c != null)) {
          var d = n.memoizedProps, m = l !== null ? l.memoizedProps : d, E = n.type, T = n.updateQueue;
          if (n.updateQueue = null, T !== null) try {
            E === "input" && d.type === "radio" && d.name != null && Pn(c, d), Xn(E, m);
            var z = Xn(E, d);
            for (m = 0; m < T.length; m += 2) {
              var I = T[m], W = T[m + 1];
              I === "style" ? qt(c, W) : I === "dangerouslySetInnerHTML" ? si(c, W) : I === "children" ? K(c, W) : We(c, I, W, z);
            }
            switch (E) {
              case "input":
                Ir(c, d);
                break;
              case "textarea":
                Ia(c, d);
                break;
              case "select":
                var Y = c._wrapperState.wasMultiple;
                c._wrapperState.wasMultiple = !!d.multiple;
                var oe = d.value;
                oe != null ? Cn(c, !!d.multiple, oe, !1) : Y !== !!d.multiple && (d.defaultValue != null ? Cn(
                  c,
                  !!d.multiple,
                  d.defaultValue,
                  !0
                ) : Cn(c, !!d.multiple, d.multiple ? [] : "", !1));
            }
            c[as] = d;
          } catch (ye) {
            fn(n, n.return, ye);
          }
        }
        break;
      case 6:
        if (ri(r, n), na(n), o & 4) {
          if (n.stateNode === null) throw Error(F(162));
          c = n.stateNode, d = n.memoizedProps;
          try {
            c.nodeValue = d;
          } catch (ye) {
            fn(n, n.return, ye);
          }
        }
        break;
      case 3:
        if (ri(r, n), na(n), o & 4 && l !== null && l.memoizedState.isDehydrated) try {
          Ka(r.containerInfo);
        } catch (ye) {
          fn(n, n.return, ye);
        }
        break;
      case 4:
        ri(r, n), na(n);
        break;
      case 13:
        ri(r, n), na(n), c = n.child, c.flags & 8192 && (d = c.memoizedState !== null, c.stateNode.isHidden = d, !d || c.alternate !== null && c.alternate.memoizedState !== null || (Hd = Mt())), o & 4 && Wv(n);
        break;
      case 22:
        if (I = l !== null && l.memoizedState !== null, n.mode & 1 ? (xr = (z = xr) || I, ri(r, n), xr = z) : ri(r, n), na(n), o & 8192) {
          if (z = n.memoizedState !== null, (n.stateNode.isHidden = z) && !I && n.mode & 1) for (de = n, I = n.child; I !== null; ) {
            for (W = de = I; de !== null; ) {
              switch (Y = de, oe = Y.child, Y.tag) {
                case 0:
                case 11:
                case 14:
                case 15:
                  Ds(4, Y, Y.return);
                  break;
                case 1:
                  yo(Y, Y.return);
                  var ve = Y.stateNode;
                  if (typeof ve.componentWillUnmount == "function") {
                    o = Y, l = Y.return;
                    try {
                      r = o, ve.props = r.memoizedProps, ve.state = r.memoizedState, ve.componentWillUnmount();
                    } catch (ye) {
                      fn(o, l, ye);
                    }
                  }
                  break;
                case 5:
                  yo(Y, Y.return);
                  break;
                case 22:
                  if (Y.memoizedState !== null) {
                    Ls(W);
                    continue;
                  }
              }
              oe !== null ? (oe.return = Y, de = oe) : Ls(W);
            }
            I = I.sibling;
          }
          e: for (I = null, W = n; ; ) {
            if (W.tag === 5) {
              if (I === null) {
                I = W;
                try {
                  c = W.stateNode, z ? (d = c.style, typeof d.setProperty == "function" ? d.setProperty("display", "none", "important") : d.display = "none") : (E = W.stateNode, T = W.memoizedProps.style, m = T != null && T.hasOwnProperty("display") ? T.display : null, E.style.display = Lt("display", m));
                } catch (ye) {
                  fn(n, n.return, ye);
                }
              }
            } else if (W.tag === 6) {
              if (I === null) try {
                W.stateNode.nodeValue = z ? "" : W.memoizedProps;
              } catch (ye) {
                fn(n, n.return, ye);
              }
            } else if ((W.tag !== 22 && W.tag !== 23 || W.memoizedState === null || W === n) && W.child !== null) {
              W.child.return = W, W = W.child;
              continue;
            }
            if (W === n) break e;
            for (; W.sibling === null; ) {
              if (W.return === null || W.return === n) break e;
              I === W && (I = null), W = W.return;
            }
            I === W && (I = null), W.sibling.return = W.return, W = W.sibling;
          }
        }
        break;
      case 19:
        ri(r, n), na(n), o & 4 && Wv(n);
        break;
      case 21:
        break;
      default:
        ri(
          r,
          n
        ), na(n);
    }
  }
  function na(n) {
    var r = n.flags;
    if (r & 2) {
      try {
        e: {
          for (var l = n.return; l !== null; ) {
            if (Os(l)) {
              var o = l;
              break e;
            }
            l = l.return;
          }
          throw Error(F(160));
        }
        switch (o.tag) {
          case 5:
            var c = o.stateNode;
            o.flags & 32 && (K(c, ""), o.flags &= -33);
            var d = qi(n);
            bi(n, d, c);
            break;
          case 3:
          case 4:
            var m = o.stateNode.containerInfo, E = qi(n);
            xi(n, E, m);
            break;
          default:
            throw Error(F(161));
        }
      } catch (T) {
        fn(n, n.return, T);
      }
      n.flags &= -3;
    }
    r & 4096 && (n.flags &= -4097);
  }
  function iy(n, r, l) {
    de = n, Fd(n);
  }
  function Fd(n, r, l) {
    for (var o = (n.mode & 1) !== 0; de !== null; ) {
      var c = de, d = c.child;
      if (c.tag === 22 && o) {
        var m = c.memoizedState !== null || _s;
        if (!m) {
          var E = c.alternate, T = E !== null && E.memoizedState !== null || xr;
          E = _s;
          var z = xr;
          if (_s = m, (xr = T) && !z) for (de = c; de !== null; ) m = de, T = m.child, m.tag === 22 && m.memoizedState !== null ? jd(c) : T !== null ? (T.return = m, de = T) : jd(c);
          for (; d !== null; ) de = d, Fd(d), d = d.sibling;
          de = c, _s = E, xr = z;
        }
        Gv(n);
      } else c.subtreeFlags & 8772 && d !== null ? (d.return = c, de = d) : Gv(n);
    }
  }
  function Gv(n) {
    for (; de !== null; ) {
      var r = de;
      if (r.flags & 8772) {
        var l = r.alternate;
        try {
          if (r.flags & 8772) switch (r.tag) {
            case 0:
            case 11:
            case 15:
              xr || ks(5, r);
              break;
            case 1:
              var o = r.stateNode;
              if (r.flags & 4 && !xr) if (l === null) o.componentDidMount();
              else {
                var c = r.elementType === r.type ? l.memoizedProps : ni(r.type, l.memoizedProps);
                o.componentDidUpdate(c, l.memoizedState, o.__reactInternalSnapshotBeforeUpdate);
              }
              var d = r.updateQueue;
              d !== null && Rd(r, d, o);
              break;
            case 3:
              var m = r.updateQueue;
              if (m !== null) {
                if (l = null, r.child !== null) switch (r.child.tag) {
                  case 5:
                    l = r.child.stateNode;
                    break;
                  case 1:
                    l = r.child.stateNode;
                }
                Rd(r, m, l);
              }
              break;
            case 5:
              var E = r.stateNode;
              if (l === null && r.flags & 4) {
                l = E;
                var T = r.memoizedProps;
                switch (r.type) {
                  case "button":
                  case "input":
                  case "select":
                  case "textarea":
                    T.autoFocus && l.focus();
                    break;
                  case "img":
                    T.src && (l.src = T.src);
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
                var z = r.alternate;
                if (z !== null) {
                  var I = z.memoizedState;
                  if (I !== null) {
                    var W = I.dehydrated;
                    W !== null && Ka(W);
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
              throw Error(F(163));
          }
          xr || r.flags & 512 && Ud(r);
        } catch (Y) {
          fn(r, r.return, Y);
        }
      }
      if (r === n) {
        de = null;
        break;
      }
      if (l = r.sibling, l !== null) {
        l.return = r.return, de = l;
        break;
      }
      de = r.return;
    }
  }
  function Ls(n) {
    for (; de !== null; ) {
      var r = de;
      if (r === n) {
        de = null;
        break;
      }
      var l = r.sibling;
      if (l !== null) {
        l.return = r.return, de = l;
        break;
      }
      de = r.return;
    }
  }
  function jd(n) {
    for (; de !== null; ) {
      var r = de;
      try {
        switch (r.tag) {
          case 0:
          case 11:
          case 15:
            var l = r.return;
            try {
              ks(4, r);
            } catch (T) {
              fn(r, l, T);
            }
            break;
          case 1:
            var o = r.stateNode;
            if (typeof o.componentDidMount == "function") {
              var c = r.return;
              try {
                o.componentDidMount();
              } catch (T) {
                fn(r, c, T);
              }
            }
            var d = r.return;
            try {
              Ud(r);
            } catch (T) {
              fn(r, d, T);
            }
            break;
          case 5:
            var m = r.return;
            try {
              Ud(r);
            } catch (T) {
              fn(r, m, T);
            }
        }
      } catch (T) {
        fn(r, r.return, T);
      }
      if (r === n) {
        de = null;
        break;
      }
      var E = r.sibling;
      if (E !== null) {
        E.return = r.return, de = E;
        break;
      }
      de = r.return;
    }
  }
  var ly = Math.ceil, zl = ct.ReactCurrentDispatcher, xu = ct.ReactCurrentOwner, or = ct.ReactCurrentBatchConfig, ht = 0, Wn = null, Fn = null, sr = 0, ya = 0, go = Oa(0), xn = 0, Ms = null, _i = 0, So = 0, nf = 0, Ns = null, ra = null, Hd = 0, Eo = 1 / 0, ga = null, Co = !1, bu = null, Ul = null, rf = !1, Xi = null, zs = 0, Al = 0, Ro = null, Us = -1, br = 0;
  function jn() {
    return ht & 6 ? Mt() : Us !== -1 ? Us : Us = Mt();
  }
  function Di(n) {
    return n.mode & 1 ? ht & 2 && sr !== 0 ? sr & -sr : ry.transition !== null ? (br === 0 && (br = Wu()), br) : (n = wt, n !== 0 || (n = window.event, n = n === void 0 ? 16 : eo(n.type)), n) : 1;
  }
  function Ur(n, r, l, o) {
    if (50 < Al) throw Al = 0, Ro = null, Error(F(185));
    Fi(n, l, o), (!(ht & 2) || n !== Wn) && (n === Wn && (!(ht & 2) && (So |= l), xn === 4 && ai(n, sr)), aa(n, o), l === 1 && ht === 0 && !(r.mode & 1) && (Eo = Mt() + 500, fo && Ei()));
  }
  function aa(n, r) {
    var l = n.callbackNode;
    eu(n, r);
    var o = Xa(n, n === Wn ? sr : 0);
    if (o === 0) l !== null && wa(l), n.callbackNode = null, n.callbackPriority = 0;
    else if (r = o & -o, n.callbackPriority !== r) {
      if (l != null && wa(l), r === 1) n.tag === 0 ? xl(Vd.bind(null, n)) : Tc(Vd.bind(null, n)), uo(function() {
        !(ht & 6) && Ei();
      }), l = null;
      else {
        switch (qu(o)) {
          case 1:
            l = Ai;
            break;
          case 4:
            l = Bo;
            break;
          case 16:
            l = Jl;
            break;
          case 536870912:
            l = Yu;
            break;
          default:
            l = Jl;
        }
        l = ah(l, af.bind(null, n));
      }
      n.callbackPriority = r, n.callbackNode = l;
    }
  }
  function af(n, r) {
    if (Us = -1, br = 0, ht & 6) throw Error(F(327));
    var l = n.callbackNode;
    if (To() && n.callbackNode !== l) return null;
    var o = Xa(n, n === Wn ? sr : 0);
    if (o === 0) return null;
    if (o & 30 || o & n.expiredLanes || r) r = lf(n, o);
    else {
      r = o;
      var c = ht;
      ht |= 2;
      var d = Xv();
      (Wn !== n || sr !== r) && (ga = null, Eo = Mt() + 500, Ki(n, r));
      do
        try {
          Kv();
          break;
        } catch (E) {
          qv(n, E);
        }
      while (!0);
      md(), zl.current = d, ht = c, Fn !== null ? r = 0 : (Wn = null, sr = 0, r = xn);
    }
    if (r !== 0) {
      if (r === 2 && (c = ml(n), c !== 0 && (o = c, r = As(n, c))), r === 1) throw l = Ms, Ki(n, 0), ai(n, o), aa(n, Mt()), l;
      if (r === 6) ai(n, o);
      else {
        if (c = n.current.alternate, !(o & 30) && !uy(c) && (r = lf(n, o), r === 2 && (d = ml(n), d !== 0 && (o = d, r = As(n, d))), r === 1)) throw l = Ms, Ki(n, 0), ai(n, o), aa(n, Mt()), l;
        switch (n.finishedWork = c, n.finishedLanes = o, r) {
          case 0:
          case 1:
            throw Error(F(345));
          case 2:
            ku(n, ra, ga);
            break;
          case 3:
            if (ai(n, o), (o & 130023424) === o && (r = Hd + 500 - Mt(), 10 < r)) {
              if (Xa(n, 0) !== 0) break;
              if (c = n.suspendedLanes, (c & o) !== o) {
                jn(), n.pingedLanes |= n.suspendedLanes & c;
                break;
              }
              n.timeoutHandle = Ec(ku.bind(null, n, ra, ga), r);
              break;
            }
            ku(n, ra, ga);
            break;
          case 4:
            if (ai(n, o), (o & 4194240) === o) break;
            for (r = n.eventTimes, c = -1; 0 < o; ) {
              var m = 31 - kr(o);
              d = 1 << m, m = r[m], m > c && (c = m), o &= ~d;
            }
            if (o = c, o = Mt() - o, o = (120 > o ? 120 : 480 > o ? 480 : 1080 > o ? 1080 : 1920 > o ? 1920 : 3e3 > o ? 3e3 : 4320 > o ? 4320 : 1960 * ly(o / 1960)) - o, 10 < o) {
              n.timeoutHandle = Ec(ku.bind(null, n, ra, ga), o);
              break;
            }
            ku(n, ra, ga);
            break;
          case 5:
            ku(n, ra, ga);
            break;
          default:
            throw Error(F(329));
        }
      }
    }
    return aa(n, Mt()), n.callbackNode === l ? af.bind(null, n) : null;
  }
  function As(n, r) {
    var l = Ns;
    return n.current.memoizedState.isDehydrated && (Ki(n, r).flags |= 256), n = lf(n, r), n !== 2 && (r = ra, ra = l, r !== null && _u(r)), n;
  }
  function _u(n) {
    ra === null ? ra = n : ra.push.apply(ra, n);
  }
  function uy(n) {
    for (var r = n; ; ) {
      if (r.flags & 16384) {
        var l = r.updateQueue;
        if (l !== null && (l = l.stores, l !== null)) for (var o = 0; o < l.length; o++) {
          var c = l[o], d = c.getSnapshot;
          c = c.value;
          try {
            if (!Ja(d(), c)) return !1;
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
  function ai(n, r) {
    for (r &= ~nf, r &= ~So, n.suspendedLanes |= r, n.pingedLanes &= ~r, n = n.expirationTimes; 0 < r; ) {
      var l = 31 - kr(r), o = 1 << l;
      n[l] = -1, r &= ~o;
    }
  }
  function Vd(n) {
    if (ht & 6) throw Error(F(327));
    To();
    var r = Xa(n, 0);
    if (!(r & 1)) return aa(n, Mt()), null;
    var l = lf(n, r);
    if (n.tag !== 0 && l === 2) {
      var o = ml(n);
      o !== 0 && (r = o, l = As(n, o));
    }
    if (l === 1) throw l = Ms, Ki(n, 0), ai(n, r), aa(n, Mt()), l;
    if (l === 6) throw Error(F(345));
    return n.finishedWork = n.current.alternate, n.finishedLanes = r, ku(n, ra, ga), aa(n, Mt()), null;
  }
  function Pd(n, r) {
    var l = ht;
    ht |= 1;
    try {
      return n(r);
    } finally {
      ht = l, ht === 0 && (Eo = Mt() + 500, fo && Ei());
    }
  }
  function Du(n) {
    Xi !== null && Xi.tag === 0 && !(ht & 6) && To();
    var r = ht;
    ht |= 1;
    var l = or.transition, o = wt;
    try {
      if (or.transition = null, wt = 1, n) return n();
    } finally {
      wt = o, or.transition = l, ht = r, !(ht & 6) && Ei();
    }
  }
  function Bd() {
    ya = go.current, Zt(go);
  }
  function Ki(n, r) {
    n.finishedWork = null, n.finishedLanes = 0;
    var l = n.timeoutHandle;
    if (l !== -1 && (n.timeoutHandle = -1, fd(l)), Fn !== null) for (l = Fn.return; l !== null; ) {
      var o = l;
      switch (xc(o), o.tag) {
        case 1:
          o = o.type.childContextTypes, o != null && co();
          break;
        case 3:
          mu(), Zt(In), Zt(Sn), ke();
          break;
        case 5:
          kc(o);
          break;
        case 4:
          mu();
          break;
        case 13:
          Zt(yn);
          break;
        case 19:
          Zt(yn);
          break;
        case 10:
          yd(o.type._context);
          break;
        case 22:
        case 23:
          Bd();
      }
      l = l.return;
    }
    if (Wn = n, Fn = n = Fl(n.current, null), sr = ya = r, xn = 0, Ms = null, nf = So = _i = 0, ra = Ns = null, vu !== null) {
      for (r = 0; r < vu.length; r++) if (l = vu[r], o = l.interleaved, o !== null) {
        l.interleaved = null;
        var c = o.next, d = l.pending;
        if (d !== null) {
          var m = d.next;
          d.next = c, o.next = m;
        }
        l.pending = o;
      }
      vu = null;
    }
    return n;
  }
  function qv(n, r) {
    do {
      var l = Fn;
      try {
        if (md(), at.current = Ru, Lc) {
          for (var o = bt.memoizedState; o !== null; ) {
            var c = o.queue;
            c !== null && (c.pending = null), o = o.next;
          }
          Lc = !1;
        }
        if (Yt = 0, Zn = zn = bt = null, ps = !1, yu = 0, xu.current = null, l === null || l.return === null) {
          xn = 1, Ms = r, Fn = null;
          break;
        }
        e: {
          var d = n, m = l.return, E = l, T = r;
          if (r = sr, E.flags |= 32768, T !== null && typeof T == "object" && typeof T.then == "function") {
            var z = T, I = E, W = I.tag;
            if (!(I.mode & 1) && (W === 0 || W === 11 || W === 15)) {
              var Y = I.alternate;
              Y ? (I.updateQueue = Y.updateQueue, I.memoizedState = Y.memoizedState, I.lanes = Y.lanes) : (I.updateQueue = null, I.memoizedState = null);
            }
            var oe = Av(m);
            if (oe !== null) {
              oe.flags &= -257, Nl(oe, m, E, d, r), oe.mode & 1 && Od(d, z, r), r = oe, T = z;
              var ve = r.updateQueue;
              if (ve === null) {
                var ye = /* @__PURE__ */ new Set();
                ye.add(T), r.updateQueue = ye;
              } else ve.add(T);
              break e;
            } else {
              if (!(r & 1)) {
                Od(d, z, r), $d();
                break e;
              }
              T = Error(F(426));
            }
          } else if (cn && E.mode & 1) {
            var bn = Av(m);
            if (bn !== null) {
              !(bn.flags & 65536) && (bn.flags |= 256), Nl(bn, m, E, d, r), Qi(Tu(T, E));
              break e;
            }
          }
          d = T = Tu(T, E), xn !== 4 && (xn = 2), Ns === null ? Ns = [d] : Ns.push(d), d = m;
          do {
            switch (d.tag) {
              case 3:
                d.flags |= 65536, r &= -r, d.lanes |= r;
                var D = Uv(d, T, r);
                Ov(d, D);
                break e;
              case 1:
                E = T;
                var x = d.type, L = d.stateNode;
                if (!(d.flags & 128) && (typeof x.getDerivedStateFromError == "function" || L !== null && typeof L.componentDidCatch == "function" && (Ul === null || !Ul.has(L)))) {
                  d.flags |= 65536, r &= -r, d.lanes |= r;
                  var Q = kd(d, E, r);
                  Ov(d, Q);
                  break e;
                }
            }
            d = d.return;
          } while (d !== null);
        }
        Jv(l);
      } catch (he) {
        r = he, Fn === l && l !== null && (Fn = l = l.return);
        continue;
      }
      break;
    } while (!0);
  }
  function Xv() {
    var n = zl.current;
    return zl.current = Ru, n === null ? Ru : n;
  }
  function $d() {
    (xn === 0 || xn === 3 || xn === 2) && (xn = 4), Wn === null || !(_i & 268435455) && !(So & 268435455) || ai(Wn, sr);
  }
  function lf(n, r) {
    var l = ht;
    ht |= 2;
    var o = Xv();
    (Wn !== n || sr !== r) && (ga = null, Ki(n, r));
    do
      try {
        oy();
        break;
      } catch (c) {
        qv(n, c);
      }
    while (!0);
    if (md(), ht = l, zl.current = o, Fn !== null) throw Error(F(261));
    return Wn = null, sr = 0, xn;
  }
  function oy() {
    for (; Fn !== null; ) Zv(Fn);
  }
  function Kv() {
    for (; Fn !== null && !$n(); ) Zv(Fn);
  }
  function Zv(n) {
    var r = rh(n.alternate, n, ya);
    n.memoizedProps = n.pendingProps, r === null ? Jv(n) : Fn = r, xu.current = null;
  }
  function Jv(n) {
    var r = n;
    do {
      var l = r.alternate;
      if (n = r.return, r.flags & 32768) {
        if (l = Jc(l, r), l !== null) {
          l.flags &= 32767, Fn = l;
          return;
        }
        if (n !== null) n.flags |= 32768, n.subtreeFlags = 0, n.deletions = null;
        else {
          xn = 6, Fn = null;
          return;
        }
      } else if (l = $v(l, r, ya), l !== null) {
        Fn = l;
        return;
      }
      if (r = r.sibling, r !== null) {
        Fn = r;
        return;
      }
      Fn = r = n;
    } while (r !== null);
    xn === 0 && (xn = 5);
  }
  function ku(n, r, l) {
    var o = wt, c = or.transition;
    try {
      or.transition = null, wt = 1, sy(n, r, l, o);
    } finally {
      or.transition = c, wt = o;
    }
    return null;
  }
  function sy(n, r, l, o) {
    do
      To();
    while (Xi !== null);
    if (ht & 6) throw Error(F(327));
    l = n.finishedWork;
    var c = n.finishedLanes;
    if (l === null) return null;
    if (n.finishedWork = null, n.finishedLanes = 0, l === n.current) throw Error(F(177));
    n.callbackNode = null, n.callbackPriority = 0;
    var d = l.lanes | l.childLanes;
    if (Yf(n, d), n === Wn && (Fn = Wn = null, sr = 0), !(l.subtreeFlags & 2064) && !(l.flags & 2064) || rf || (rf = !0, ah(Jl, function() {
      return To(), null;
    })), d = (l.flags & 15990) !== 0, l.subtreeFlags & 15990 || d) {
      d = or.transition, or.transition = null;
      var m = wt;
      wt = 1;
      var E = ht;
      ht |= 4, xu.current = null, Iv(n, l), Ad(l, n), ro(su), _a = !!rs, su = rs = null, n.current = l, iy(l), Zl(), ht = E, wt = m, or.transition = d;
    } else n.current = l;
    if (rf && (rf = !1, Xi = n, zs = c), d = n.pendingLanes, d === 0 && (Ul = null), $o(l.stateNode), aa(n, Mt()), r !== null) for (o = n.onRecoverableError, l = 0; l < r.length; l++) c = r[l], o(c.value, { componentStack: c.stack, digest: c.digest });
    if (Co) throw Co = !1, n = bu, bu = null, n;
    return zs & 1 && n.tag !== 0 && To(), d = n.pendingLanes, d & 1 ? n === Ro ? Al++ : (Al = 0, Ro = n) : Al = 0, Ei(), null;
  }
  function To() {
    if (Xi !== null) {
      var n = qu(zs), r = or.transition, l = wt;
      try {
        if (or.transition = null, wt = 16 > n ? 16 : n, Xi === null) var o = !1;
        else {
          if (n = Xi, Xi = null, zs = 0, ht & 6) throw Error(F(331));
          var c = ht;
          for (ht |= 4, de = n.current; de !== null; ) {
            var d = de, m = d.child;
            if (de.flags & 16) {
              var E = d.deletions;
              if (E !== null) {
                for (var T = 0; T < E.length; T++) {
                  var z = E[T];
                  for (de = z; de !== null; ) {
                    var I = de;
                    switch (I.tag) {
                      case 0:
                      case 11:
                      case 15:
                        Ds(8, I, d);
                    }
                    var W = I.child;
                    if (W !== null) W.return = I, de = W;
                    else for (; de !== null; ) {
                      I = de;
                      var Y = I.sibling, oe = I.return;
                      if (tf(I), I === z) {
                        de = null;
                        break;
                      }
                      if (Y !== null) {
                        Y.return = oe, de = Y;
                        break;
                      }
                      de = oe;
                    }
                  }
                }
                var ve = d.alternate;
                if (ve !== null) {
                  var ye = ve.child;
                  if (ye !== null) {
                    ve.child = null;
                    do {
                      var bn = ye.sibling;
                      ye.sibling = null, ye = bn;
                    } while (ye !== null);
                  }
                }
                de = d;
              }
            }
            if (d.subtreeFlags & 2064 && m !== null) m.return = d, de = m;
            else e: for (; de !== null; ) {
              if (d = de, d.flags & 2048) switch (d.tag) {
                case 0:
                case 11:
                case 15:
                  Ds(9, d, d.return);
              }
              var D = d.sibling;
              if (D !== null) {
                D.return = d.return, de = D;
                break e;
              }
              de = d.return;
            }
          }
          var x = n.current;
          for (de = x; de !== null; ) {
            m = de;
            var L = m.child;
            if (m.subtreeFlags & 2064 && L !== null) L.return = m, de = L;
            else e: for (m = x; de !== null; ) {
              if (E = de, E.flags & 2048) try {
                switch (E.tag) {
                  case 0:
                  case 11:
                  case 15:
                    ks(9, E);
                }
              } catch (he) {
                fn(E, E.return, he);
              }
              if (E === m) {
                de = null;
                break e;
              }
              var Q = E.sibling;
              if (Q !== null) {
                Q.return = E.return, de = Q;
                break e;
              }
              de = E.return;
            }
          }
          if (ht = c, Ei(), Wr && typeof Wr.onPostCommitFiberRoot == "function") try {
            Wr.onPostCommitFiberRoot(vl, n);
          } catch {
          }
          o = !0;
        }
        return o;
      } finally {
        wt = l, or.transition = r;
      }
    }
    return !1;
  }
  function eh(n, r, l) {
    r = Tu(l, r), r = Uv(n, r, 1), n = Ol(n, r, 1), r = jn(), n !== null && (Fi(n, 1, r), aa(n, r));
  }
  function fn(n, r, l) {
    if (n.tag === 3) eh(n, n, l);
    else for (; r !== null; ) {
      if (r.tag === 3) {
        eh(r, n, l);
        break;
      } else if (r.tag === 1) {
        var o = r.stateNode;
        if (typeof r.type.getDerivedStateFromError == "function" || typeof o.componentDidCatch == "function" && (Ul === null || !Ul.has(o))) {
          n = Tu(l, n), n = kd(r, n, 1), r = Ol(r, n, 1), n = jn(), r !== null && (Fi(r, 1, n), aa(r, n));
          break;
        }
      }
      r = r.return;
    }
  }
  function cy(n, r, l) {
    var o = n.pingCache;
    o !== null && o.delete(r), r = jn(), n.pingedLanes |= n.suspendedLanes & l, Wn === n && (sr & l) === l && (xn === 4 || xn === 3 && (sr & 130023424) === sr && 500 > Mt() - Hd ? Ki(n, 0) : nf |= l), aa(n, r);
  }
  function th(n, r) {
    r === 0 && (n.mode & 1 ? (r = da, da <<= 1, !(da & 130023424) && (da = 4194304)) : r = 1);
    var l = jn();
    n = ha(n, r), n !== null && (Fi(n, r, l), aa(n, l));
  }
  function fy(n) {
    var r = n.memoizedState, l = 0;
    r !== null && (l = r.retryLane), th(n, l);
  }
  function nh(n, r) {
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
        throw Error(F(314));
    }
    o !== null && o.delete(r), th(n, l);
  }
  var rh;
  rh = function(n, r, l) {
    if (n !== null) if (n.memoizedProps !== r.pendingProps || In.current) Un = !0;
    else {
      if (!(n.lanes & l) && !(r.flags & 128)) return Un = !1, xs(n, r, l);
      Un = !!(n.flags & 131072);
    }
    else Un = !1, cn && r.flags & 1048576 && bv(r, Ii, r.index);
    switch (r.lanes = 0, r.tag) {
      case 2:
        var o = r.type;
        za(n, r), n = r.pendingProps;
        var c = Xr(r, Sn.current);
        mn(r, l), c = Ll(null, r, o, n, c, l);
        var d = ti();
        return r.flags |= 1, typeof c == "object" && c !== null && typeof c.render == "function" && c.$$typeof === void 0 ? (r.tag = 1, r.memoizedState = null, r.updateQueue = null, Mn(o) ? (d = !0, Kn(r)) : d = !1, r.memoizedState = c.state !== null && c.state !== void 0 ? c.state : null, Cd(r), c.updater = Gc, r.stateNode = c, c._reactInternals = r, Es(r, o, n, l), r = Ts(null, r, o, !0, d, l)) : (r.tag = 0, cn && d && wc(r), ur(null, r, c, l), r = r.child), r;
      case 16:
        o = r.elementType;
        e: {
          switch (za(n, r), n = r.pendingProps, c = o._init, o = c(o._payload), r.type = o, c = r.tag = py(o), n = ni(o, n), c) {
            case 0:
              r = Fv(null, r, o, n, l);
              break e;
            case 1:
              r = jv(null, r, o, n, l);
              break e;
            case 11:
              r = ta(null, r, o, n, l);
              break e;
            case 14:
              r = wu(null, r, o, ni(o.type, n), l);
              break e;
          }
          throw Error(F(
            306,
            o,
            ""
          ));
        }
        return r;
      case 0:
        return o = r.type, c = r.pendingProps, c = r.elementType === o ? c : ni(o, c), Fv(n, r, o, c, l);
      case 1:
        return o = r.type, c = r.pendingProps, c = r.elementType === o ? c : ni(o, c), jv(n, r, o, c, l);
      case 3:
        e: {
          if (mo(r), n === null) throw Error(F(387));
          o = r.pendingProps, d = r.memoizedState, c = d.element, kv(n, r), os(r, o, null, l);
          var m = r.memoizedState;
          if (o = m.element, d.isDehydrated) if (d = { element: o, isDehydrated: !1, cache: m.cache, pendingSuspenseBoundaries: m.pendingSuspenseBoundaries, transitions: m.transitions }, r.updateQueue.baseState = d, r.memoizedState = d, r.flags & 256) {
            c = Tu(Error(F(423)), r), r = Hv(n, r, o, l, c);
            break e;
          } else if (o !== c) {
            c = Tu(Error(F(424)), r), r = Hv(n, r, o, l, c);
            break e;
          } else for (Zr = yi(r.stateNode.containerInfo.firstChild), Kr = r, cn = !0, Ma = null, l = ie(r, null, o, l), r.child = l; l; ) l.flags = l.flags & -3 | 4096, l = l.sibling;
          else {
            if (kl(), o === c) {
              r = Ua(n, r, l);
              break e;
            }
            ur(n, r, o, l);
          }
          r = r.child;
        }
        return r;
      case 5:
        return Lv(r), n === null && vd(r), o = r.type, c = r.pendingProps, d = n !== null ? n.memoizedProps : null, m = c.children, Sc(o, c) ? m = null : d !== null && Sc(o, d) && (r.flags |= 32), Ld(n, r), ur(n, r, m, l), r.child;
      case 6:
        return n === null && vd(r), null;
      case 13:
        return Zc(n, r, l);
      case 4:
        return Td(r, r.stateNode.containerInfo), o = r.pendingProps, n === null ? r.child = Rn(r, null, o, l) : ur(n, r, o, l), r.child;
      case 11:
        return o = r.type, c = r.pendingProps, c = r.elementType === o ? c : ni(o, c), ta(n, r, o, c, l);
      case 7:
        return ur(n, r, r.pendingProps, l), r.child;
      case 8:
        return ur(n, r, r.pendingProps.children, l), r.child;
      case 12:
        return ur(n, r, r.pendingProps.children, l), r.child;
      case 10:
        e: {
          if (o = r.type._context, c = r.pendingProps, d = r.memoizedProps, m = c.value, Re(va, o._currentValue), o._currentValue = m, d !== null) if (Ja(d.value, m)) {
            if (d.children === c.children && !In.current) {
              r = Ua(n, r, l);
              break e;
            }
          } else for (d = r.child, d !== null && (d.return = r); d !== null; ) {
            var E = d.dependencies;
            if (E !== null) {
              m = d.child;
              for (var T = E.firstContext; T !== null; ) {
                if (T.context === o) {
                  if (d.tag === 1) {
                    T = Wi(-1, l & -l), T.tag = 2;
                    var z = d.updateQueue;
                    if (z !== null) {
                      z = z.shared;
                      var I = z.pending;
                      I === null ? T.next = T : (T.next = I.next, I.next = T), z.pending = T;
                    }
                  }
                  d.lanes |= l, T = d.alternate, T !== null && (T.lanes |= l), gd(
                    d.return,
                    l,
                    r
                  ), E.lanes |= l;
                  break;
                }
                T = T.next;
              }
            } else if (d.tag === 10) m = d.type === r.type ? null : d.child;
            else if (d.tag === 18) {
              if (m = d.return, m === null) throw Error(F(341));
              m.lanes |= l, E = m.alternate, E !== null && (E.lanes |= l), gd(m, l, r), m = d.sibling;
            } else m = d.child;
            if (m !== null) m.return = d;
            else for (m = d; m !== null; ) {
              if (m === r) {
                m = null;
                break;
              }
              if (d = m.sibling, d !== null) {
                d.return = m.return, m = d;
                break;
              }
              m = m.return;
            }
            d = m;
          }
          ur(n, r, c.children, l), r = r.child;
        }
        return r;
      case 9:
        return c = r.type, o = r.pendingProps.children, mn(r, l), c = Na(c), o = o(c), r.flags |= 1, ur(n, r, o, l), r.child;
      case 14:
        return o = r.type, c = ni(o, r.pendingProps), c = ni(o.type, c), wu(n, r, o, c, l);
      case 15:
        return qe(n, r, r.type, r.pendingProps, l);
      case 17:
        return o = r.type, c = r.pendingProps, c = r.elementType === o ? c : ni(o, c), za(n, r), r.tag = 1, Mn(o) ? (n = !0, Kn(r)) : n = !1, mn(r, l), qc(r, o, c), Es(r, o, c, l), Ts(null, r, o, !0, n, l);
      case 19:
        return wi(n, r, l);
      case 22:
        return Rs(n, r, l);
    }
    throw Error(F(156, r.tag));
  };
  function ah(n, r) {
    return Ga(n, r);
  }
  function dy(n, r, l, o) {
    this.tag = n, this.key = l, this.sibling = this.child = this.return = this.stateNode = this.type = this.elementType = null, this.index = 0, this.ref = null, this.pendingProps = r, this.dependencies = this.memoizedState = this.updateQueue = this.memoizedProps = null, this.mode = o, this.subtreeFlags = this.flags = 0, this.deletions = null, this.childLanes = this.lanes = 0, this.alternate = null;
  }
  function Fa(n, r, l, o) {
    return new dy(n, r, l, o);
  }
  function Yd(n) {
    return n = n.prototype, !(!n || !n.isReactComponent);
  }
  function py(n) {
    if (typeof n == "function") return Yd(n) ? 1 : 0;
    if (n != null) {
      if (n = n.$$typeof, n === Et) return 11;
      if (n === Ct) return 14;
    }
    return 2;
  }
  function Fl(n, r) {
    var l = n.alternate;
    return l === null ? (l = Fa(n.tag, r, n.key, n.mode), l.elementType = n.elementType, l.type = n.type, l.stateNode = n.stateNode, l.alternate = n, n.alternate = l) : (l.pendingProps = r, l.type = n.type, l.flags = 0, l.subtreeFlags = 0, l.deletions = null), l.flags = n.flags & 14680064, l.childLanes = n.childLanes, l.lanes = n.lanes, l.child = n.child, l.memoizedProps = n.memoizedProps, l.memoizedState = n.memoizedState, l.updateQueue = n.updateQueue, r = n.dependencies, l.dependencies = r === null ? null : { lanes: r.lanes, firstContext: r.firstContext }, l.sibling = n.sibling, l.index = n.index, l.ref = n.ref, l;
  }
  function Fs(n, r, l, o, c, d) {
    var m = 2;
    if (o = n, typeof n == "function") Yd(n) && (m = 1);
    else if (typeof n == "string") m = 5;
    else e: switch (n) {
      case je:
        return Zi(l.children, c, d, r);
      case en:
        m = 8, c |= 8;
        break;
      case Ut:
        return n = Fa(12, l, r, c | 2), n.elementType = Ut, n.lanes = d, n;
      case be:
        return n = Fa(13, l, r, c), n.elementType = be, n.lanes = d, n;
      case Ot:
        return n = Fa(19, l, r, c), n.elementType = Ot, n.lanes = d, n;
      case ge:
        return jl(l, c, d, r);
      default:
        if (typeof n == "object" && n !== null) switch (n.$$typeof) {
          case Gt:
            m = 10;
            break e;
          case tn:
            m = 9;
            break e;
          case Et:
            m = 11;
            break e;
          case Ct:
            m = 14;
            break e;
          case Tt:
            m = 16, o = null;
            break e;
        }
        throw Error(F(130, n == null ? n : typeof n, ""));
    }
    return r = Fa(m, l, r, c), r.elementType = n, r.type = o, r.lanes = d, r;
  }
  function Zi(n, r, l, o) {
    return n = Fa(7, n, o, r), n.lanes = l, n;
  }
  function jl(n, r, l, o) {
    return n = Fa(22, n, o, r), n.elementType = ge, n.lanes = l, n.stateNode = { isHidden: !1 }, n;
  }
  function Id(n, r, l) {
    return n = Fa(6, n, null, r), n.lanes = l, n;
  }
  function uf(n, r, l) {
    return r = Fa(4, n.children !== null ? n.children : [], n.key, r), r.lanes = l, r.stateNode = { containerInfo: n.containerInfo, pendingChildren: null, implementation: n.implementation }, r;
  }
  function ih(n, r, l, o, c) {
    this.tag = r, this.containerInfo = n, this.finishedWork = this.pingCache = this.current = this.pendingChildren = null, this.timeoutHandle = -1, this.callbackNode = this.pendingContext = this.context = null, this.callbackPriority = 0, this.eventTimes = Gu(0), this.expirationTimes = Gu(-1), this.entangledLanes = this.finishedLanes = this.mutableReadLanes = this.expiredLanes = this.pingedLanes = this.suspendedLanes = this.pendingLanes = 0, this.entanglements = Gu(0), this.identifierPrefix = o, this.onRecoverableError = c, this.mutableSourceEagerHydrationData = null;
  }
  function of(n, r, l, o, c, d, m, E, T) {
    return n = new ih(n, r, l, E, T), r === 1 ? (r = 1, d === !0 && (r |= 8)) : r = 0, d = Fa(3, null, null, r), n.current = d, d.stateNode = n, d.memoizedState = { element: o, isDehydrated: l, cache: null, transitions: null, pendingSuspenseBoundaries: null }, Cd(d), n;
  }
  function vy(n, r, l) {
    var o = 3 < arguments.length && arguments[3] !== void 0 ? arguments[3] : null;
    return { $$typeof: lt, key: o == null ? null : "" + o, children: n, containerInfo: r, implementation: l };
  }
  function Qd(n) {
    if (!n) return Tr;
    n = n._reactInternals;
    e: {
      if (Be(n) !== n || n.tag !== 1) throw Error(F(170));
      var r = n;
      do {
        switch (r.tag) {
          case 3:
            r = r.stateNode.context;
            break e;
          case 1:
            if (Mn(r.type)) {
              r = r.stateNode.__reactInternalMemoizedMergedChildContext;
              break e;
            }
        }
        r = r.return;
      } while (r !== null);
      throw Error(F(171));
    }
    if (n.tag === 1) {
      var l = n.type;
      if (Mn(l)) return ls(n, l, r);
    }
    return r;
  }
  function lh(n, r, l, o, c, d, m, E, T) {
    return n = of(l, o, !0, n, c, d, m, E, T), n.context = Qd(null), l = n.current, o = jn(), c = Di(l), d = Wi(o, c), d.callback = r ?? null, Ol(l, d, c), n.current.lanes = c, Fi(n, c, o), aa(n, o), n;
  }
  function sf(n, r, l, o) {
    var c = r.current, d = jn(), m = Di(c);
    return l = Qd(l), r.context === null ? r.context = l : r.pendingContext = l, r = Wi(d, m), r.payload = { element: n }, o = o === void 0 ? null : o, o !== null && (r.callback = o), n = Ol(c, r, m), n !== null && (Ur(n, c, m, d), Dc(n, c, m)), m;
  }
  function cf(n) {
    if (n = n.current, !n.child) return null;
    switch (n.child.tag) {
      case 5:
        return n.child.stateNode;
      default:
        return n.child.stateNode;
    }
  }
  function Wd(n, r) {
    if (n = n.memoizedState, n !== null && n.dehydrated !== null) {
      var l = n.retryLane;
      n.retryLane = l !== 0 && l < r ? l : r;
    }
  }
  function ff(n, r) {
    Wd(n, r), (n = n.alternate) && Wd(n, r);
  }
  function uh() {
    return null;
  }
  var Ou = typeof reportError == "function" ? reportError : function(n) {
    console.error(n);
  };
  function Gd(n) {
    this._internalRoot = n;
  }
  df.prototype.render = Gd.prototype.render = function(n) {
    var r = this._internalRoot;
    if (r === null) throw Error(F(409));
    sf(n, r, null, null);
  }, df.prototype.unmount = Gd.prototype.unmount = function() {
    var n = this._internalRoot;
    if (n !== null) {
      this._internalRoot = null;
      var r = n.containerInfo;
      Du(function() {
        sf(null, n, null, null);
      }), r[$i] = null;
    }
  };
  function df(n) {
    this._internalRoot = n;
  }
  df.prototype.unstable_scheduleHydration = function(n) {
    if (n) {
      var r = Ye();
      n = { blockedOn: null, target: n, priority: r };
      for (var l = 0; l < Yn.length && r !== 0 && r < Yn[l].priority; l++) ;
      Yn.splice(l, 0, n), l === 0 && Qo(n);
    }
  };
  function qd(n) {
    return !(!n || n.nodeType !== 1 && n.nodeType !== 9 && n.nodeType !== 11);
  }
  function pf(n) {
    return !(!n || n.nodeType !== 1 && n.nodeType !== 9 && n.nodeType !== 11 && (n.nodeType !== 8 || n.nodeValue !== " react-mount-point-unstable "));
  }
  function oh() {
  }
  function hy(n, r, l, o, c) {
    if (c) {
      if (typeof o == "function") {
        var d = o;
        o = function() {
          var z = cf(m);
          d.call(z);
        };
      }
      var m = lh(r, o, n, 0, null, !1, !1, "", oh);
      return n._reactRootContainer = m, n[$i] = m.current, io(n.nodeType === 8 ? n.parentNode : n), Du(), m;
    }
    for (; c = n.lastChild; ) n.removeChild(c);
    if (typeof o == "function") {
      var E = o;
      o = function() {
        var z = cf(T);
        E.call(z);
      };
    }
    var T = of(n, 0, !1, null, null, !1, !1, "", oh);
    return n._reactRootContainer = T, n[$i] = T.current, io(n.nodeType === 8 ? n.parentNode : n), Du(function() {
      sf(r, T, l, o);
    }), T;
  }
  function js(n, r, l, o, c) {
    var d = l._reactRootContainer;
    if (d) {
      var m = d;
      if (typeof c == "function") {
        var E = c;
        c = function() {
          var T = cf(m);
          E.call(T);
        };
      }
      sf(r, m, n, c);
    } else m = hy(l, r, n, c, o);
    return cf(m);
  }
  gt = function(n) {
    switch (n.tag) {
      case 3:
        var r = n.stateNode;
        if (r.current.memoizedState.isDehydrated) {
          var l = qa(r.pendingLanes);
          l !== 0 && (ji(r, l | 1), aa(r, Mt()), !(ht & 6) && (Eo = Mt() + 500, Ei()));
        }
        break;
      case 13:
        Du(function() {
          var o = ha(n, 1);
          if (o !== null) {
            var c = jn();
            Ur(o, n, 1, c);
          }
        }), ff(n, 1);
    }
  }, Yo = function(n) {
    if (n.tag === 13) {
      var r = ha(n, 134217728);
      if (r !== null) {
        var l = jn();
        Ur(r, n, 134217728, l);
      }
      ff(n, 134217728);
    }
  }, di = function(n) {
    if (n.tag === 13) {
      var r = Di(n), l = ha(n, r);
      if (l !== null) {
        var o = jn();
        Ur(l, n, r, o);
      }
      ff(n, r);
    }
  }, Ye = function() {
    return wt;
  }, Xu = function(n, r) {
    var l = wt;
    try {
      return wt = n, r();
    } finally {
      wt = l;
    }
  }, sn = function(n, r, l) {
    switch (r) {
      case "input":
        if (Ir(n, l), r = l.name, l.type === "radio" && r != null) {
          for (l = n; l.parentNode; ) l = l.parentNode;
          for (l = l.querySelectorAll("input[name=" + JSON.stringify("" + r) + '][type="radio"]'), r = 0; r < l.length; r++) {
            var o = l[r];
            if (o !== n && o.form === n.form) {
              var c = hn(o);
              if (!c) throw Error(F(90));
              _r(o), Ir(o, c);
            }
          }
        }
        break;
      case "textarea":
        Ia(n, l);
        break;
      case "select":
        r = l.value, r != null && Cn(n, !!l.multiple, r, !1);
    }
  }, cl = Pd, Kl = Du;
  var my = { usingClientEntryPoint: !1, Events: [De, ei, hn, ci, $u, Pd] }, Hs = { findFiberByHostInstance: cu, bundleType: 0, version: "18.3.1", rendererPackageName: "react-dom" }, sh = { bundleType: Hs.bundleType, version: Hs.version, rendererPackageName: Hs.rendererPackageName, rendererConfig: Hs.rendererConfig, overrideHookState: null, overrideHookStateDeletePath: null, overrideHookStateRenamePath: null, overrideProps: null, overridePropsDeletePath: null, overridePropsRenamePath: null, setErrorHandler: null, setSuspenseHandler: null, scheduleUpdate: null, currentDispatcherRef: ct.ReactCurrentDispatcher, findHostInstanceByFiber: function(n) {
    return n = Xt(n), n === null ? null : n.stateNode;
  }, findFiberByHostInstance: Hs.findFiberByHostInstance || uh, findHostInstancesForRefresh: null, scheduleRefresh: null, scheduleRoot: null, setRefreshHandler: null, getCurrentFiber: null, reconcilerVersion: "18.3.1-next-f1338f8080-20240426" };
  if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u") {
    var Hl = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (!Hl.isDisabled && Hl.supportsFiber) try {
      vl = Hl.inject(sh), Wr = Hl;
    } catch {
    }
  }
  return $a.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = my, $a.createPortal = function(n, r) {
    var l = 2 < arguments.length && arguments[2] !== void 0 ? arguments[2] : null;
    if (!qd(r)) throw Error(F(200));
    return vy(n, r, null, l);
  }, $a.createRoot = function(n, r) {
    if (!qd(n)) throw Error(F(299));
    var l = !1, o = "", c = Ou;
    return r != null && (r.unstable_strictMode === !0 && (l = !0), r.identifierPrefix !== void 0 && (o = r.identifierPrefix), r.onRecoverableError !== void 0 && (c = r.onRecoverableError)), r = of(n, 1, !1, null, null, l, !1, o, c), n[$i] = r.current, io(n.nodeType === 8 ? n.parentNode : n), new Gd(r);
  }, $a.findDOMNode = function(n) {
    if (n == null) return null;
    if (n.nodeType === 1) return n;
    var r = n._reactInternals;
    if (r === void 0)
      throw typeof n.render == "function" ? Error(F(188)) : (n = Object.keys(n).join(","), Error(F(268, n)));
    return n = Xt(r), n = n === null ? null : n.stateNode, n;
  }, $a.flushSync = function(n) {
    return Du(n);
  }, $a.hydrate = function(n, r, l) {
    if (!pf(r)) throw Error(F(200));
    return js(null, n, r, !0, l);
  }, $a.hydrateRoot = function(n, r, l) {
    if (!qd(n)) throw Error(F(405));
    var o = l != null && l.hydratedSources || null, c = !1, d = "", m = Ou;
    if (l != null && (l.unstable_strictMode === !0 && (c = !0), l.identifierPrefix !== void 0 && (d = l.identifierPrefix), l.onRecoverableError !== void 0 && (m = l.onRecoverableError)), r = lh(r, null, n, 1, l ?? null, c, !1, d, m), n[$i] = r.current, io(n), o) for (n = 0; n < o.length; n++) l = o[n], c = l._getVersion, c = c(l._source), r.mutableSourceEagerHydrationData == null ? r.mutableSourceEagerHydrationData = [l, c] : r.mutableSourceEagerHydrationData.push(
      l,
      c
    );
    return new df(r);
  }, $a.render = function(n, r, l) {
    if (!pf(r)) throw Error(F(200));
    return js(null, n, r, !1, l);
  }, $a.unmountComponentAtNode = function(n) {
    if (!pf(n)) throw Error(F(40));
    return n._reactRootContainer ? (Du(function() {
      js(null, null, n, !1, function() {
        n._reactRootContainer = null, n[$i] = null;
      });
    }), !0) : !1;
  }, $a.unstable_batchedUpdates = Pd, $a.unstable_renderSubtreeIntoContainer = function(n, r, l, o) {
    if (!pf(l)) throw Error(F(200));
    if (n == null || n._reactInternals === void 0) throw Error(F(38));
    return js(n, r, l, !1, o);
  }, $a.version = "18.3.1-next-f1338f8080-20240426", $a;
}
var Ya = {};
/**
 * @license React
 * react-dom.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var rT;
function tD() {
  return rT || (rT = 1, process.env.NODE_ENV !== "production" && function() {
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
    var te = vE, Z = lT(), F = te.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, Jt = !1;
    function Nt(e) {
      Jt = e;
    }
    function zt(e) {
      if (!Jt) {
        for (var t = arguments.length, a = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++)
          a[i - 1] = arguments[i];
        dn("warn", e, a);
      }
    }
    function S(e) {
      if (!Jt) {
        for (var t = arguments.length, a = new Array(t > 1 ? t - 1 : 0), i = 1; i < t; i++)
          a[i - 1] = arguments[i];
        dn("error", e, a);
      }
    }
    function dn(e, t, a) {
      {
        var i = F.ReactDebugCurrentFrame, u = i.getStackAddendum();
        u !== "" && (t += "%s", a = a.concat([u]));
        var s = a.map(function(f) {
          return String(f);
        });
        s.unshift("Warning: " + t), Function.prototype.apply.call(console[e], console, s);
      }
    }
    var Te = 0, pe = 1, jt = 2, ae = 3, we = 4, ce = 5, Qe = 6, pt = 7, st = 8, un = 9, it = 10, We = 11, ct = 12, xe = 13, lt = 14, je = 15, en = 16, Ut = 17, Gt = 18, tn = 19, Et = 21, be = 22, Ot = 23, Ct = 24, Tt = 25, ge = !0, X = !1, Ee = !1, ne = !1, _ = !1, V = !0, He = !0, Ae = !0, tt = !0, Ke = /* @__PURE__ */ new Set(), Xe = {}, Ze = {};
    function nt(e, t) {
      Ht(e, t), Ht(e + "Capture", t);
    }
    function Ht(e, t) {
      Xe[e] && S("EventRegistry: More than one plugin attempted to publish the same registration name, `%s`.", e), Xe[e] = t;
      {
        var a = e.toLowerCase();
        Ze[a] = e, e === "onDoubleClick" && (Ze.ondblclick = e);
      }
      for (var i = 0; i < t.length; i++)
        Ke.add(t[i]);
    }
    var Dn = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", _r = Object.prototype.hasOwnProperty;
    function En(e) {
      {
        var t = typeof Symbol == "function" && Symbol.toStringTag, a = t && e[Symbol.toStringTag] || e.constructor.name || "Object";
        return a;
      }
    }
    function nr(e) {
      try {
        return Vn(e), !1;
      } catch {
        return !0;
      }
    }
    function Vn(e) {
      return "" + e;
    }
    function Pn(e, t) {
      if (nr(e))
        return S("The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before before using it here.", t, En(e)), Vn(e);
    }
    function Ir(e) {
      if (nr(e))
        return S("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", En(e)), Vn(e);
    }
    function oi(e, t) {
      if (nr(e))
        return S("The provided `%s` prop is an unsupported type %s. This value must be coerced to a string before before using it here.", t, En(e)), Vn(e);
    }
    function ca(e, t) {
      if (nr(e))
        return S("The provided `%s` CSS property is an unsupported type %s. This value must be coerced to a string before before using it here.", t, En(e)), Vn(e);
    }
    function qn(e) {
      if (nr(e))
        return S("The provided HTML markup uses a value of unsupported type %s. This value must be coerced to a string before before using it here.", En(e)), Vn(e);
    }
    function Cn(e) {
      if (nr(e))
        return S("Form field values (value, checked, defaultValue, or defaultChecked props) must be strings, not %s. This value must be coerced to a string before before using it here.", En(e)), Vn(e);
    }
    var Bn = 0, gr = 1, Ia = 2, kn = 3, Sr = 4, Er = 5, Qa = 6, si = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD", K = si + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040", Se = new RegExp("^[" + si + "][" + K + "]*$"), Je = {}, Lt = {};
    function qt(e) {
      return _r.call(Lt, e) ? !0 : _r.call(Je, e) ? !1 : Se.test(e) ? (Lt[e] = !0, !0) : (Je[e] = !0, S("Invalid attribute name: `%s`", e), !1);
    }
    function pn(e, t, a) {
      return t !== null ? t.type === Bn : a ? !1 : e.length > 2 && (e[0] === "o" || e[0] === "O") && (e[1] === "n" || e[1] === "N");
    }
    function nn(e, t, a, i) {
      if (a !== null && a.type === Bn)
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
    function Xn(e, t, a, i) {
      if (t === null || typeof t > "u" || nn(e, t, a, i))
        return !0;
      if (i)
        return !1;
      if (a !== null)
        switch (a.type) {
          case kn:
            return !t;
          case Sr:
            return t === !1;
          case Er:
            return isNaN(t);
          case Qa:
            return isNaN(t) || t < 1;
        }
      return !1;
    }
    function on(e) {
      return sn.hasOwnProperty(e) ? sn[e] : null;
    }
    function Vt(e, t, a, i, u, s, f) {
      this.acceptsBooleans = t === Ia || t === kn || t === Sr, this.attributeName = i, this.attributeNamespace = u, this.mustUseProperty = a, this.propertyName = e, this.type = t, this.sanitizeURL = s, this.removeEmptyString = f;
    }
    var sn = {}, Cr = [
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
    Cr.forEach(function(e) {
      sn[e] = new Vt(
        e,
        Bn,
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
      sn[t] = new Vt(
        t,
        gr,
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
      sn[e] = new Vt(
        e,
        Ia,
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
      sn[e] = new Vt(
        e,
        Ia,
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
      sn[e] = new Vt(
        e,
        kn,
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
      sn[e] = new Vt(
        e,
        kn,
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
      sn[e] = new Vt(
        e,
        Sr,
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
      sn[e] = new Vt(
        e,
        Qa,
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
      sn[e] = new Vt(
        e,
        Er,
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
    var Rr = /[\-\:]([a-z])/g, fa = function(e) {
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
      var t = e.replace(Rr, fa);
      sn[t] = new Vt(
        t,
        gr,
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
      var t = e.replace(Rr, fa);
      sn[t] = new Vt(
        t,
        gr,
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
      var t = e.replace(Rr, fa);
      sn[t] = new Vt(
        t,
        gr,
        !1,
        // mustUseProperty
        e,
        "http://www.w3.org/XML/1998/namespace",
        !1,
        // sanitizeURL
        !1
      );
    }), ["tabIndex", "crossOrigin"].forEach(function(e) {
      sn[e] = new Vt(
        e,
        gr,
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
    var ci = "xlinkHref";
    sn[ci] = new Vt(
      "xlinkHref",
      gr,
      !1,
      // mustUseProperty
      "xlink:href",
      "http://www.w3.org/1999/xlink",
      !0,
      // sanitizeURL
      !1
    ), ["src", "href", "action", "formAction"].forEach(function(e) {
      sn[e] = new Vt(
        e,
        gr,
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
    var $u = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*\:/i, cl = !1;
    function Kl(e) {
      !cl && $u.test(e) && (cl = !0, S("A future version of React will block javascript: URLs as a security precaution. Use event handlers instead if you can. If you need to generate unsafe HTML try using dangerouslySetInnerHTML instead. React was passed %s.", JSON.stringify(e)));
    }
    function fl(e, t, a, i) {
      if (i.mustUseProperty) {
        var u = i.propertyName;
        return e[u];
      } else {
        Pn(a, t), i.sanitizeURL && Kl("" + a);
        var s = i.attributeName, f = null;
        if (i.type === Sr) {
          if (e.hasAttribute(s)) {
            var p = e.getAttribute(s);
            return p === "" ? !0 : Xn(t, a, i, !1) ? p : p === "" + a ? a : p;
          }
        } else if (e.hasAttribute(s)) {
          if (Xn(t, a, i, !1))
            return e.getAttribute(s);
          if (i.type === kn)
            return a;
          f = e.getAttribute(s);
        }
        return Xn(t, a, i, !1) ? f === null ? a : f : f === "" + a ? a : f;
      }
    }
    function dl(e, t, a, i) {
      {
        if (!qt(t))
          return;
        if (!e.hasAttribute(t))
          return a === void 0 ? void 0 : null;
        var u = e.getAttribute(t);
        return Pn(a, t), u === "" + a ? a : u;
      }
    }
    function Dr(e, t, a, i) {
      var u = on(t);
      if (!pn(t, u, i)) {
        if (Xn(t, a, u, i) && (a = null), i || u === null) {
          if (qt(t)) {
            var s = t;
            a === null ? e.removeAttribute(s) : (Pn(a, t), e.setAttribute(s, "" + a));
          }
          return;
        }
        var f = u.mustUseProperty;
        if (f) {
          var p = u.propertyName;
          if (a === null) {
            var v = u.type;
            e[p] = v === kn ? !1 : "";
          } else
            e[p] = a;
          return;
        }
        var y = u.attributeName, g = u.attributeNamespace;
        if (a === null)
          e.removeAttribute(y);
        else {
          var b = u.type, w;
          b === kn || b === Sr && a === !0 ? w = "" : (Pn(a, y), w = "" + a, u.sanitizeURL && Kl(w.toString())), g ? e.setAttributeNS(g, y, w) : e.setAttribute(y, w);
        }
      }
    }
    var Qr = Symbol.for("react.element"), rr = Symbol.for("react.portal"), fi = Symbol.for("react.fragment"), Wa = Symbol.for("react.strict_mode"), R = Symbol.for("react.profiler"), $ = Symbol.for("react.provider"), J = Symbol.for("react.context"), _e = Symbol.for("react.forward_ref"), ot = Symbol.for("react.suspense"), Pe = Symbol.for("react.suspense_list"), Be = Symbol.for("react.memo"), Oe = Symbol.for("react.lazy"), On = Symbol.for("react.scope"), rn = Symbol.for("react.debug_trace_mode"), Xt = Symbol.for("react.offscreen"), ar = Symbol.for("react.legacy_hidden"), Ga = Symbol.for("react.cache"), wa = Symbol.for("react.tracing_marker"), $n = Symbol.iterator, Zl = "@@iterator";
    function Mt(e) {
      if (e === null || typeof e != "object")
        return null;
      var t = $n && e[$n] || e[Zl];
      return typeof t == "function" ? t : null;
    }
    var rt = Object.assign, Ai = 0, Bo, Jl, pl, Yu, vl, Wr, $o;
    function kr() {
    }
    kr.__reactDisabledLog = !0;
    function ac() {
      {
        if (Ai === 0) {
          Bo = console.log, Jl = console.info, pl = console.warn, Yu = console.error, vl = console.group, Wr = console.groupCollapsed, $o = console.groupEnd;
          var e = {
            configurable: !0,
            enumerable: !0,
            value: kr,
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
        Ai++;
      }
    }
    function ic() {
      {
        if (Ai--, Ai === 0) {
          var e = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: rt({}, e, {
              value: Bo
            }),
            info: rt({}, e, {
              value: Jl
            }),
            warn: rt({}, e, {
              value: pl
            }),
            error: rt({}, e, {
              value: Yu
            }),
            group: rt({}, e, {
              value: vl
            }),
            groupCollapsed: rt({}, e, {
              value: Wr
            }),
            groupEnd: rt({}, e, {
              value: $o
            })
          });
        }
        Ai < 0 && S("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var Iu = F.ReactCurrentDispatcher, hl;
    function da(e, t, a) {
      {
        if (hl === void 0)
          try {
            throw Error();
          } catch (u) {
            var i = u.stack.trim().match(/\n( *(at )?)/);
            hl = i && i[1] || "";
          }
        return `
` + hl + e;
      }
    }
    var qa = !1, Xa;
    {
      var Qu = typeof WeakMap == "function" ? WeakMap : Map;
      Xa = new Qu();
    }
    function eu(e, t) {
      if (!e || qa)
        return "";
      {
        var a = Xa.get(e);
        if (a !== void 0)
          return a;
      }
      var i;
      qa = !0;
      var u = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var s;
      s = Iu.current, Iu.current = null, ac();
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
            } catch (U) {
              i = U;
            }
            Reflect.construct(e, [], f);
          } else {
            try {
              f.call();
            } catch (U) {
              i = U;
            }
            e.call(f.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (U) {
            i = U;
          }
          e();
        }
      } catch (U) {
        if (U && i && typeof U.stack == "string") {
          for (var p = U.stack.split(`
`), v = i.stack.split(`
`), y = p.length - 1, g = v.length - 1; y >= 1 && g >= 0 && p[y] !== v[g]; )
            g--;
          for (; y >= 1 && g >= 0; y--, g--)
            if (p[y] !== v[g]) {
              if (y !== 1 || g !== 1)
                do
                  if (y--, g--, g < 0 || p[y] !== v[g]) {
                    var b = `
` + p[y].replace(" at new ", " at ");
                    return e.displayName && b.includes("<anonymous>") && (b = b.replace("<anonymous>", e.displayName)), typeof e == "function" && Xa.set(e, b), b;
                  }
                while (y >= 1 && g >= 0);
              break;
            }
        }
      } finally {
        qa = !1, Iu.current = s, ic(), Error.prepareStackTrace = u;
      }
      var w = e ? e.displayName || e.name : "", M = w ? da(w) : "";
      return typeof e == "function" && Xa.set(e, M), M;
    }
    function ml(e, t, a) {
      return eu(e, !0);
    }
    function Wu(e, t, a) {
      return eu(e, !1);
    }
    function Gu(e) {
      var t = e.prototype;
      return !!(t && t.isReactComponent);
    }
    function Fi(e, t, a) {
      if (e == null)
        return "";
      if (typeof e == "function")
        return eu(e, Gu(e));
      if (typeof e == "string")
        return da(e);
      switch (e) {
        case ot:
          return da("Suspense");
        case Pe:
          return da("SuspenseList");
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case _e:
            return Wu(e.render);
          case Be:
            return Fi(e.type, t, a);
          case Oe: {
            var i = e, u = i._payload, s = i._init;
            try {
              return Fi(s(u), t, a);
            } catch {
            }
          }
        }
      return "";
    }
    function Yf(e) {
      switch (e._debugOwner && e._debugOwner.type, e._debugSource, e.tag) {
        case ce:
          return da(e.type);
        case en:
          return da("Lazy");
        case xe:
          return da("Suspense");
        case tn:
          return da("SuspenseList");
        case Te:
        case jt:
        case je:
          return Wu(e.type);
        case We:
          return Wu(e.type.render);
        case pe:
          return ml(e.type);
        default:
          return "";
      }
    }
    function ji(e) {
      try {
        var t = "", a = e;
        do
          t += Yf(a), a = a.return;
        while (a);
        return t;
      } catch (i) {
        return `
Error generating stack: ` + i.message + `
` + i.stack;
      }
    }
    function wt(e, t, a) {
      var i = e.displayName;
      if (i)
        return i;
      var u = t.displayName || t.name || "";
      return u !== "" ? a + "(" + u + ")" : a;
    }
    function qu(e) {
      return e.displayName || "Context";
    }
    function gt(e) {
      if (e == null)
        return null;
      if (typeof e.tag == "number" && S("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
        return e.displayName || e.name || null;
      if (typeof e == "string")
        return e;
      switch (e) {
        case fi:
          return "Fragment";
        case rr:
          return "Portal";
        case R:
          return "Profiler";
        case Wa:
          return "StrictMode";
        case ot:
          return "Suspense";
        case Pe:
          return "SuspenseList";
      }
      if (typeof e == "object")
        switch (e.$$typeof) {
          case J:
            var t = e;
            return qu(t) + ".Consumer";
          case $:
            var a = e;
            return qu(a._context) + ".Provider";
          case _e:
            return wt(e, e.render, "ForwardRef");
          case Be:
            var i = e.displayName || null;
            return i !== null ? i : gt(e.type) || "Memo";
          case Oe: {
            var u = e, s = u._payload, f = u._init;
            try {
              return gt(f(s));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    function Yo(e, t, a) {
      var i = t.displayName || t.name || "";
      return e.displayName || (i !== "" ? a + "(" + i + ")" : a);
    }
    function di(e) {
      return e.displayName || "Context";
    }
    function Ye(e) {
      var t = e.tag, a = e.type;
      switch (t) {
        case Ct:
          return "Cache";
        case un:
          var i = a;
          return di(i) + ".Consumer";
        case it:
          var u = a;
          return di(u._context) + ".Provider";
        case Gt:
          return "DehydratedFragment";
        case We:
          return Yo(a, a.render, "ForwardRef");
        case pt:
          return "Fragment";
        case ce:
          return a;
        case we:
          return "Portal";
        case ae:
          return "Root";
        case Qe:
          return "Text";
        case en:
          return gt(a);
        case st:
          return a === Wa ? "StrictMode" : "Mode";
        case be:
          return "Offscreen";
        case ct:
          return "Profiler";
        case Et:
          return "Scope";
        case xe:
          return "Suspense";
        case tn:
          return "SuspenseList";
        case Tt:
          return "TracingMarker";
        case pe:
        case Te:
        case Ut:
        case jt:
        case lt:
        case je:
          if (typeof a == "function")
            return a.displayName || a.name || null;
          if (typeof a == "string")
            return a;
          break;
      }
      return null;
    }
    var Xu = F.ReactDebugCurrentFrame, ir = null, pi = !1;
    function Or() {
      {
        if (ir === null)
          return null;
        var e = ir._debugOwner;
        if (e !== null && typeof e < "u")
          return Ye(e);
      }
      return null;
    }
    function vi() {
      return ir === null ? "" : ji(ir);
    }
    function an() {
      Xu.getCurrentStack = null, ir = null, pi = !1;
    }
    function Pt(e) {
      Xu.getCurrentStack = e === null ? null : vi, ir = e, pi = !1;
    }
    function yl() {
      return ir;
    }
    function Yn(e) {
      pi = e;
    }
    function Lr(e) {
      return "" + e;
    }
    function xa(e) {
      switch (typeof e) {
        case "boolean":
        case "number":
        case "string":
        case "undefined":
          return e;
        case "object":
          return Cn(e), e;
        default:
          return "";
      }
    }
    var tu = {
      button: !0,
      checkbox: !0,
      image: !0,
      hidden: !0,
      radio: !0,
      reset: !0,
      submit: !0
    };
    function Io(e, t) {
      tu[t.type] || t.onChange || t.onInput || t.readOnly || t.disabled || t.value == null || S("You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`."), t.onChange || t.readOnly || t.disabled || t.checked == null || S("You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.");
    }
    function Qo(e) {
      var t = e.type, a = e.nodeName;
      return a && a.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
    }
    function gl(e) {
      return e._valueTracker;
    }
    function nu(e) {
      e._valueTracker = null;
    }
    function If(e) {
      var t = "";
      return e && (Qo(e) ? t = e.checked ? "true" : "false" : t = e.value), t;
    }
    function ba(e) {
      var t = Qo(e) ? "checked" : "value", a = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
      Cn(e[t]);
      var i = "" + e[t];
      if (!(e.hasOwnProperty(t) || typeof a > "u" || typeof a.get != "function" || typeof a.set != "function")) {
        var u = a.get, s = a.set;
        Object.defineProperty(e, t, {
          configurable: !0,
          get: function() {
            return u.call(this);
          },
          set: function(p) {
            Cn(p), i = "" + p, s.call(this, p);
          }
        }), Object.defineProperty(e, t, {
          enumerable: a.enumerable
        });
        var f = {
          getValue: function() {
            return i;
          },
          setValue: function(p) {
            Cn(p), i = "" + p;
          },
          stopTracking: function() {
            nu(e), delete e[t];
          }
        };
        return f;
      }
    }
    function Ka(e) {
      gl(e) || (e._valueTracker = ba(e));
    }
    function hi(e) {
      if (!e)
        return !1;
      var t = gl(e);
      if (!t)
        return !0;
      var a = t.getValue(), i = If(e);
      return i !== a ? (t.setValue(i), !0) : !1;
    }
    function _a(e) {
      if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u")
        return null;
      try {
        return e.activeElement || e.body;
      } catch {
        return e.body;
      }
    }
    var Ku = !1, Zu = !1, Sl = !1, ru = !1;
    function Ju(e) {
      var t = e.type === "checkbox" || e.type === "radio";
      return t ? e.checked != null : e.value != null;
    }
    function eo(e, t) {
      var a = e, i = t.checked, u = rt({}, t, {
        defaultChecked: void 0,
        defaultValue: void 0,
        value: void 0,
        checked: i ?? a._wrapperState.initialChecked
      });
      return u;
    }
    function Za(e, t) {
      Io("input", t), t.checked !== void 0 && t.defaultChecked !== void 0 && !Zu && (S("%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", Or() || "A component", t.type), Zu = !0), t.value !== void 0 && t.defaultValue !== void 0 && !Ku && (S("%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", Or() || "A component", t.type), Ku = !0);
      var a = e, i = t.defaultValue == null ? "" : t.defaultValue;
      a._wrapperState = {
        initialChecked: t.checked != null ? t.checked : t.defaultChecked,
        initialValue: xa(t.value != null ? t.value : i),
        controlled: Ju(t)
      };
    }
    function h(e, t) {
      var a = e, i = t.checked;
      i != null && Dr(a, "checked", i, !1);
    }
    function C(e, t) {
      var a = e;
      {
        var i = Ju(t);
        !a._wrapperState.controlled && i && !ru && (S("A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), ru = !0), a._wrapperState.controlled && !i && !Sl && (S("A component is changing a controlled input to be uncontrolled. This is likely caused by the value changing from a defined to undefined, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), Sl = !0);
      }
      h(e, t);
      var u = xa(t.value), s = t.type;
      if (u != null)
        s === "number" ? (u === 0 && a.value === "" || // We explicitly want to coerce to number here if possible.
        // eslint-disable-next-line
        a.value != u) && (a.value = Lr(u)) : a.value !== Lr(u) && (a.value = Lr(u));
      else if (s === "submit" || s === "reset") {
        a.removeAttribute("value");
        return;
      }
      t.hasOwnProperty("value") ? Le(a, t.type, u) : t.hasOwnProperty("defaultValue") && Le(a, t.type, xa(t.defaultValue)), t.checked == null && t.defaultChecked != null && (a.defaultChecked = !!t.defaultChecked);
    }
    function N(e, t, a) {
      var i = e;
      if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
        var u = t.type, s = u === "submit" || u === "reset";
        if (s && (t.value === void 0 || t.value === null))
          return;
        var f = Lr(i._wrapperState.initialValue);
        a || f !== i.value && (i.value = f), i.defaultValue = f;
      }
      var p = i.name;
      p !== "" && (i.name = ""), i.defaultChecked = !i.defaultChecked, i.defaultChecked = !!i._wrapperState.initialChecked, p !== "" && (i.name = p);
    }
    function A(e, t) {
      var a = e;
      C(a, t), q(a, t);
    }
    function q(e, t) {
      var a = t.name;
      if (t.type === "radio" && a != null) {
        for (var i = e; i.parentNode; )
          i = i.parentNode;
        Pn(a, "name");
        for (var u = i.querySelectorAll("input[name=" + JSON.stringify("" + a) + '][type="radio"]'), s = 0; s < u.length; s++) {
          var f = u[s];
          if (!(f === e || f.form !== e.form)) {
            var p = _h(f);
            if (!p)
              throw new Error("ReactDOMInput: Mixing React and non-React radio inputs with the same `name` is not supported.");
            hi(f), C(f, p);
          }
        }
      }
    }
    function Le(e, t, a) {
      // Focused number inputs synchronize on blur. See ChangeEventPlugin.js
      (t !== "number" || _a(e.ownerDocument) !== e) && (a == null ? e.defaultValue = Lr(e._wrapperState.initialValue) : e.defaultValue !== Lr(a) && (e.defaultValue = Lr(a)));
    }
    var re = !1, ze = !1, ut = !1;
    function St(e, t) {
      t.value == null && (typeof t.children == "object" && t.children !== null ? te.Children.forEach(t.children, function(a) {
        a != null && (typeof a == "string" || typeof a == "number" || ze || (ze = !0, S("Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>.")));
      }) : t.dangerouslySetInnerHTML != null && (ut || (ut = !0, S("Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected.")))), t.selected != null && !re && (S("Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>."), re = !0);
    }
    function Kt(e, t) {
      t.value != null && e.setAttribute("value", Lr(xa(t.value)));
    }
    var Bt = Array.isArray;
    function et(e) {
      return Bt(e);
    }
    var $t;
    $t = !1;
    function vn() {
      var e = Or();
      return e ? `

Check the render method of \`` + e + "`." : "";
    }
    var El = ["value", "defaultValue"];
    function Wo(e) {
      {
        Io("select", e);
        for (var t = 0; t < El.length; t++) {
          var a = El[t];
          if (e[a] != null) {
            var i = et(e[a]);
            e.multiple && !i ? S("The `%s` prop supplied to <select> must be an array if `multiple` is true.%s", a, vn()) : !e.multiple && i && S("The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.%s", a, vn());
          }
        }
      }
    }
    function Hi(e, t, a, i) {
      var u = e.options;
      if (t) {
        for (var s = a, f = {}, p = 0; p < s.length; p++)
          f["$" + s[p]] = !0;
        for (var v = 0; v < u.length; v++) {
          var y = f.hasOwnProperty("$" + u[v].value);
          u[v].selected !== y && (u[v].selected = y), y && i && (u[v].defaultSelected = !0);
        }
      } else {
        for (var g = Lr(xa(a)), b = null, w = 0; w < u.length; w++) {
          if (u[w].value === g) {
            u[w].selected = !0, i && (u[w].defaultSelected = !0);
            return;
          }
          b === null && !u[w].disabled && (b = u[w]);
        }
        b !== null && (b.selected = !0);
      }
    }
    function Go(e, t) {
      return rt({}, t, {
        value: void 0
      });
    }
    function au(e, t) {
      var a = e;
      Wo(t), a._wrapperState = {
        wasMultiple: !!t.multiple
      }, t.value !== void 0 && t.defaultValue !== void 0 && !$t && (S("Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://reactjs.org/link/controlled-components"), $t = !0);
    }
    function Qf(e, t) {
      var a = e;
      a.multiple = !!t.multiple;
      var i = t.value;
      i != null ? Hi(a, !!t.multiple, i, !1) : t.defaultValue != null && Hi(a, !!t.multiple, t.defaultValue, !0);
    }
    function lc(e, t) {
      var a = e, i = a._wrapperState.wasMultiple;
      a._wrapperState.wasMultiple = !!t.multiple;
      var u = t.value;
      u != null ? Hi(a, !!t.multiple, u, !1) : i !== !!t.multiple && (t.defaultValue != null ? Hi(a, !!t.multiple, t.defaultValue, !0) : Hi(a, !!t.multiple, t.multiple ? [] : "", !1));
    }
    function Wf(e, t) {
      var a = e, i = t.value;
      i != null && Hi(a, !!t.multiple, i, !1);
    }
    var Xp = !1;
    function Gf(e, t) {
      var a = e;
      if (t.dangerouslySetInnerHTML != null)
        throw new Error("`dangerouslySetInnerHTML` does not make sense on <textarea>.");
      var i = rt({}, t, {
        value: void 0,
        defaultValue: void 0,
        children: Lr(a._wrapperState.initialValue)
      });
      return i;
    }
    function qf(e, t) {
      var a = e;
      Io("textarea", t), t.value !== void 0 && t.defaultValue !== void 0 && !Xp && (S("%s contains a textarea with both value and defaultValue props. Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://reactjs.org/link/controlled-components", Or() || "A component"), Xp = !0);
      var i = t.value;
      if (i == null) {
        var u = t.children, s = t.defaultValue;
        if (u != null) {
          S("Use the `defaultValue` or `value` props instead of setting children on <textarea>.");
          {
            if (s != null)
              throw new Error("If you supply `defaultValue` on a <textarea>, do not pass children.");
            if (et(u)) {
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
        initialValue: xa(i)
      };
    }
    function Kp(e, t) {
      var a = e, i = xa(t.value), u = xa(t.defaultValue);
      if (i != null) {
        var s = Lr(i);
        s !== a.value && (a.value = s), t.defaultValue == null && a.defaultValue !== s && (a.defaultValue = s);
      }
      u != null && (a.defaultValue = Lr(u));
    }
    function Zp(e, t) {
      var a = e, i = a.textContent;
      i === a._wrapperState.initialValue && i !== "" && i !== null && (a.value = i);
    }
    function Im(e, t) {
      Kp(e, t);
    }
    var Vi = "http://www.w3.org/1999/xhtml", Xf = "http://www.w3.org/1998/Math/MathML", Kf = "http://www.w3.org/2000/svg";
    function Zf(e) {
      switch (e) {
        case "svg":
          return Kf;
        case "math":
          return Xf;
        default:
          return Vi;
      }
    }
    function Jf(e, t) {
      return e == null || e === Vi ? Zf(t) : e === Kf && t === "foreignObject" ? Vi : e;
    }
    var Jp = function(e) {
      return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, a, i, u) {
        MSApp.execUnsafeLocalFunction(function() {
          return e(t, a, i, u);
        });
      } : e;
    }, uc, ev = Jp(function(e, t) {
      if (e.namespaceURI === Kf && !("innerHTML" in e)) {
        uc = uc || document.createElement("div"), uc.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>";
        for (var a = uc.firstChild; e.firstChild; )
          e.removeChild(e.firstChild);
        for (; a.firstChild; )
          e.appendChild(a.firstChild);
        return;
      }
      e.innerHTML = t;
    }), Gr = 1, Pi = 3, Ln = 8, Bi = 9, ed = 11, to = function(e, t) {
      if (t) {
        var a = e.firstChild;
        if (a && a === e.lastChild && a.nodeType === Pi) {
          a.nodeValue = t;
          return;
        }
      }
      e.textContent = t;
    }, qo = {
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
    }, Xo = {
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
    function tv(e, t) {
      return e + t.charAt(0).toUpperCase() + t.substring(1);
    }
    var nv = ["Webkit", "ms", "Moz", "O"];
    Object.keys(Xo).forEach(function(e) {
      nv.forEach(function(t) {
        Xo[tv(t, e)] = Xo[e];
      });
    });
    function oc(e, t, a) {
      var i = t == null || typeof t == "boolean" || t === "";
      return i ? "" : !a && typeof t == "number" && t !== 0 && !(Xo.hasOwnProperty(e) && Xo[e]) ? t + "px" : (ca(t, e), ("" + t).trim());
    }
    var rv = /([A-Z])/g, av = /^ms-/;
    function no(e) {
      return e.replace(rv, "-$1").toLowerCase().replace(av, "-ms-");
    }
    var iv = function() {
    };
    {
      var Qm = /^(?:webkit|moz|o)[A-Z]/, Wm = /^-ms-/, lv = /-(.)/g, td = /;\s*$/, mi = {}, iu = {}, uv = !1, Ko = !1, Gm = function(e) {
        return e.replace(lv, function(t, a) {
          return a.toUpperCase();
        });
      }, ov = function(e) {
        mi.hasOwnProperty(e) && mi[e] || (mi[e] = !0, S(
          "Unsupported style property %s. Did you mean %s?",
          e,
          // As Andi Smith suggests
          // (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
          // is converted to lowercase `ms`.
          Gm(e.replace(Wm, "ms-"))
        ));
      }, nd = function(e) {
        mi.hasOwnProperty(e) && mi[e] || (mi[e] = !0, S("Unsupported vendor-prefixed style property %s. Did you mean %s?", e, e.charAt(0).toUpperCase() + e.slice(1)));
      }, rd = function(e, t) {
        iu.hasOwnProperty(t) && iu[t] || (iu[t] = !0, S(`Style property values shouldn't contain a semicolon. Try "%s: %s" instead.`, e, t.replace(td, "")));
      }, sv = function(e, t) {
        uv || (uv = !0, S("`NaN` is an invalid value for the `%s` css style property.", e));
      }, cv = function(e, t) {
        Ko || (Ko = !0, S("`Infinity` is an invalid value for the `%s` css style property.", e));
      };
      iv = function(e, t) {
        e.indexOf("-") > -1 ? ov(e) : Qm.test(e) ? nd(e) : td.test(t) && rd(e, t), typeof t == "number" && (isNaN(t) ? sv(e, t) : isFinite(t) || cv(e, t));
      };
    }
    var fv = iv;
    function qm(e) {
      {
        var t = "", a = "";
        for (var i in e)
          if (e.hasOwnProperty(i)) {
            var u = e[i];
            if (u != null) {
              var s = i.indexOf("--") === 0;
              t += a + (s ? i : no(i)) + ":", t += oc(i, u, s), a = ";";
            }
          }
        return t || null;
      }
    }
    function dv(e, t) {
      var a = e.style;
      for (var i in t)
        if (t.hasOwnProperty(i)) {
          var u = i.indexOf("--") === 0;
          u || fv(i, t[i]);
          var s = oc(i, t[i], u);
          i === "float" && (i = "cssFloat"), u ? a.setProperty(i, s) : a[i] = s;
        }
    }
    function Xm(e) {
      return e == null || typeof e == "boolean" || e === "";
    }
    function pv(e) {
      var t = {};
      for (var a in e)
        for (var i = qo[a] || [a], u = 0; u < i.length; u++)
          t[i[u]] = a;
      return t;
    }
    function Km(e, t) {
      {
        if (!t)
          return;
        var a = pv(e), i = pv(t), u = {};
        for (var s in a) {
          var f = a[s], p = i[s];
          if (p && f !== p) {
            var v = f + "," + p;
            if (u[v])
              continue;
            u[v] = !0, S("%s a style property during rerender (%s) when a conflicting property is set (%s) can lead to styling bugs. To avoid this, don't mix shorthand and non-shorthand properties for the same value; instead, replace the shorthand with separate values.", Xm(e[f]) ? "Removing" : "Updating", f, p);
          }
        }
      }
    }
    var Ja = {
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
    }, Zo = rt({
      menuitem: !0
    }, Ja), vv = "__html";
    function sc(e, t) {
      if (t) {
        if (Zo[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
          throw new Error(e + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
        if (t.dangerouslySetInnerHTML != null) {
          if (t.children != null)
            throw new Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
          if (typeof t.dangerouslySetInnerHTML != "object" || !(vv in t.dangerouslySetInnerHTML))
            throw new Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information.");
        }
        if (!t.suppressContentEditableWarning && t.contentEditable && t.children != null && S("A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional."), t.style != null && typeof t.style != "object")
          throw new Error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.");
      }
    }
    function Cl(e, t) {
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
    var Jo = {
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
    }, cc = {
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
    }, ro = {}, Zm = new RegExp("^(aria)-[" + K + "]*$"), ao = new RegExp("^(aria)[A-Z][" + K + "]*$");
    function ad(e, t) {
      {
        if (_r.call(ro, t) && ro[t])
          return !0;
        if (ao.test(t)) {
          var a = "aria-" + t.slice(4).toLowerCase(), i = cc.hasOwnProperty(a) ? a : null;
          if (i == null)
            return S("Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.", t), ro[t] = !0, !0;
          if (t !== i)
            return S("Invalid ARIA attribute `%s`. Did you mean `%s`?", t, i), ro[t] = !0, !0;
        }
        if (Zm.test(t)) {
          var u = t.toLowerCase(), s = cc.hasOwnProperty(u) ? u : null;
          if (s == null)
            return ro[t] = !0, !1;
          if (t !== s)
            return S("Unknown ARIA attribute `%s`. Did you mean `%s`?", t, s), ro[t] = !0, !0;
        }
      }
      return !0;
    }
    function es(e, t) {
      {
        var a = [];
        for (var i in t) {
          var u = ad(e, i);
          u || a.push(i);
        }
        var s = a.map(function(f) {
          return "`" + f + "`";
        }).join(", ");
        a.length === 1 ? S("Invalid aria prop %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", s, e) : a.length > 1 && S("Invalid aria props %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", s, e);
      }
    }
    function id(e, t) {
      Cl(e, t) || es(e, t);
    }
    var ld = !1;
    function fc(e, t) {
      {
        if (e !== "input" && e !== "textarea" && e !== "select")
          return;
        t != null && t.value === null && !ld && (ld = !0, e === "select" && t.multiple ? S("`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.", e) : S("`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.", e));
      }
    }
    var lu = function() {
    };
    {
      var lr = {}, ud = /^on./, dc = /^on[^A-Z]/, hv = new RegExp("^(aria)-[" + K + "]*$"), mv = new RegExp("^(aria)[A-Z][" + K + "]*$");
      lu = function(e, t, a, i) {
        if (_r.call(lr, t) && lr[t])
          return !0;
        var u = t.toLowerCase();
        if (u === "onfocusin" || u === "onfocusout")
          return S("React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React."), lr[t] = !0, !0;
        if (i != null) {
          var s = i.registrationNameDependencies, f = i.possibleRegistrationNames;
          if (s.hasOwnProperty(t))
            return !0;
          var p = f.hasOwnProperty(u) ? f[u] : null;
          if (p != null)
            return S("Invalid event handler property `%s`. Did you mean `%s`?", t, p), lr[t] = !0, !0;
          if (ud.test(t))
            return S("Unknown event handler property `%s`. It will be ignored.", t), lr[t] = !0, !0;
        } else if (ud.test(t))
          return dc.test(t) && S("Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.", t), lr[t] = !0, !0;
        if (hv.test(t) || mv.test(t))
          return !0;
        if (u === "innerhtml")
          return S("Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`."), lr[t] = !0, !0;
        if (u === "aria")
          return S("The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead."), lr[t] = !0, !0;
        if (u === "is" && a !== null && a !== void 0 && typeof a != "string")
          return S("Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.", typeof a), lr[t] = !0, !0;
        if (typeof a == "number" && isNaN(a))
          return S("Received NaN for the `%s` attribute. If this is expected, cast the value to a string.", t), lr[t] = !0, !0;
        var v = on(t), y = v !== null && v.type === Bn;
        if (Jo.hasOwnProperty(u)) {
          var g = Jo[u];
          if (g !== t)
            return S("Invalid DOM property `%s`. Did you mean `%s`?", t, g), lr[t] = !0, !0;
        } else if (!y && t !== u)
          return S("React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.", t, u), lr[t] = !0, !0;
        return typeof a == "boolean" && nn(t, a, v, !1) ? (a ? S('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.', a, t, t, a, t) : S('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.', a, t, t, a, t, t, t), lr[t] = !0, !0) : y ? !0 : nn(t, a, v, !1) ? (lr[t] = !0, !1) : ((a === "false" || a === "true") && v !== null && v.type === kn && (S("Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?", a, t, a === "false" ? "The browser will interpret it as a truthy value." : 'Although this works, it will not work as expected if you pass the string "false".', t, a), lr[t] = !0), !0);
      };
    }
    var yv = function(e, t, a) {
      {
        var i = [];
        for (var u in t) {
          var s = lu(e, u, t[u], a);
          s || i.push(u);
        }
        var f = i.map(function(p) {
          return "`" + p + "`";
        }).join(", ");
        i.length === 1 ? S("Invalid value for prop %s on <%s> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", f, e) : i.length > 1 && S("Invalid values for props %s on <%s> tag. Either remove them from the element, or pass a string or number value to keep them in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", f, e);
      }
    };
    function gv(e, t, a) {
      Cl(e, t) || yv(e, t, a);
    }
    var od = 1, pc = 2, Da = 4, sd = od | pc | Da, uu = null;
    function Jm(e) {
      uu !== null && S("Expected currently replaying event to be null. This error is likely caused by a bug in React. Please file an issue."), uu = e;
    }
    function ey() {
      uu === null && S("Expected currently replaying event to not be null. This error is likely caused by a bug in React. Please file an issue."), uu = null;
    }
    function ts(e) {
      return e === uu;
    }
    function cd(e) {
      var t = e.target || e.srcElement || window;
      return t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === Pi ? t.parentNode : t;
    }
    var vc = null, ou = null, At = null;
    function hc(e) {
      var t = bo(e);
      if (t) {
        if (typeof vc != "function")
          throw new Error("setRestoreImplementation() needs to be called to handle a target for controlled events. This error is likely caused by a bug in React. Please file an issue.");
        var a = t.stateNode;
        if (a) {
          var i = _h(a);
          vc(t.stateNode, t.type, i);
        }
      }
    }
    function mc(e) {
      vc = e;
    }
    function io(e) {
      ou ? At ? At.push(e) : At = [e] : ou = e;
    }
    function Sv() {
      return ou !== null || At !== null;
    }
    function yc() {
      if (ou) {
        var e = ou, t = At;
        if (ou = null, At = null, hc(e), t)
          for (var a = 0; a < t.length; a++)
            hc(t[a]);
      }
    }
    var lo = function(e, t) {
      return e(t);
    }, ns = function() {
    }, Rl = !1;
    function Ev() {
      var e = Sv();
      e && (ns(), yc());
    }
    function Cv(e, t, a) {
      if (Rl)
        return e(t, a);
      Rl = !0;
      try {
        return lo(e, t, a);
      } finally {
        Rl = !1, Ev();
      }
    }
    function ty(e, t, a) {
      lo = e, ns = a;
    }
    function Rv(e) {
      return e === "button" || e === "input" || e === "select" || e === "textarea";
    }
    function gc(e, t, a) {
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
          return !!(a.disabled && Rv(t));
        default:
          return !1;
      }
    }
    function Tl(e, t) {
      var a = e.stateNode;
      if (a === null)
        return null;
      var i = _h(a);
      if (i === null)
        return null;
      var u = i[t];
      if (gc(t, e.type, i))
        return null;
      if (u && typeof u != "function")
        throw new Error("Expected `" + t + "` listener to be a function, instead got a value of `" + typeof u + "` type.");
      return u;
    }
    var rs = !1;
    if (Dn)
      try {
        var su = {};
        Object.defineProperty(su, "passive", {
          get: function() {
            rs = !0;
          }
        }), window.addEventListener("test", su, su), window.removeEventListener("test", su, su);
      } catch {
        rs = !1;
      }
    function Sc(e, t, a, i, u, s, f, p, v) {
      var y = Array.prototype.slice.call(arguments, 3);
      try {
        t.apply(a, y);
      } catch (g) {
        this.onError(g);
      }
    }
    var Ec = Sc;
    if (typeof window < "u" && typeof window.dispatchEvent == "function" && typeof document < "u" && typeof document.createEvent == "function") {
      var fd = document.createElement("react");
      Ec = function(t, a, i, u, s, f, p, v, y) {
        if (typeof document > "u" || document === null)
          throw new Error("The `document` global was defined when React was initialized, but is not defined anymore. This can happen in a test environment if a component schedules an update from an asynchronous callback, but the test has already finished running. To solve this, you can either unmount the component at the end of your test (and ensure that any asynchronous operations get canceled in `componentWillUnmount`), or you can change the test itself to be asynchronous.");
        var g = document.createEvent("Event"), b = !1, w = !0, M = window.event, U = Object.getOwnPropertyDescriptor(window, "event");
        function j() {
          fd.removeEventListener(H, Me, !1), typeof window.event < "u" && window.hasOwnProperty("event") && (window.event = M);
        }
        var le = Array.prototype.slice.call(arguments, 3);
        function Me() {
          b = !0, j(), a.apply(i, le), w = !1;
        }
        var Ce, yt = !1, ft = !1;
        function k(O) {
          if (Ce = O.error, yt = !0, Ce === null && O.colno === 0 && O.lineno === 0 && (ft = !0), O.defaultPrevented && Ce != null && typeof Ce == "object")
            try {
              Ce._suppressLogging = !0;
            } catch {
            }
        }
        var H = "react-" + (t || "invokeguardedcallback");
        if (window.addEventListener("error", k), fd.addEventListener(H, Me, !1), g.initEvent(H, !1, !1), fd.dispatchEvent(g), U && Object.defineProperty(window, "event", U), b && w && (yt ? ft && (Ce = new Error("A cross-origin error was thrown. React doesn't have access to the actual error object in development. See https://reactjs.org/link/crossorigin-error for more information.")) : Ce = new Error(`An error was thrown inside one of your components, but React doesn't know what it was. This is likely due to browser flakiness. React does its best to preserve the "Pause on exceptions" behavior of the DevTools, which requires some DEV-mode only tricks. It's possible that these don't work in your browser. Try triggering the error in production mode, or switching to a modern browser. If you suspect that this is actually an issue with React, please file an issue.`), this.onError(Ce)), window.removeEventListener("error", k), !b)
          return j(), Sc.apply(this, arguments);
      };
    }
    var Tv = Ec, uo = !1, Cc = null, oo = !1, yi = null, wv = {
      onError: function(e) {
        uo = !0, Cc = e;
      }
    };
    function wl(e, t, a, i, u, s, f, p, v) {
      uo = !1, Cc = null, Tv.apply(wv, arguments);
    }
    function gi(e, t, a, i, u, s, f, p, v) {
      if (wl.apply(this, arguments), uo) {
        var y = is();
        oo || (oo = !0, yi = y);
      }
    }
    function as() {
      if (oo) {
        var e = yi;
        throw oo = !1, yi = null, e;
      }
    }
    function $i() {
      return uo;
    }
    function is() {
      if (uo) {
        var e = Cc;
        return uo = !1, Cc = null, e;
      } else
        throw new Error("clearCaughtError was called but no error was captured. This error is likely caused by a bug in React. Please file an issue.");
    }
    function so(e) {
      return e._reactInternals;
    }
    function ny(e) {
      return e._reactInternals !== void 0;
    }
    function cu(e, t) {
      e._reactInternals = t;
    }
    var De = (
      /*                      */
      0
    ), ei = (
      /*                */
      1
    ), hn = (
      /*                    */
      2
    ), vt = (
      /*                       */
      4
    ), ka = (
      /*                */
      16
    ), Oa = (
      /*                 */
      32
    ), Zt = (
      /*                     */
      64
    ), Re = (
      /*                   */
      128
    ), Tr = (
      /*            */
      256
    ), Sn = (
      /*                          */
      512
    ), In = (
      /*                     */
      1024
    ), qr = (
      /*                      */
      2048
    ), Xr = (
      /*                    */
      4096
    ), Mn = (
      /*                   */
      8192
    ), co = (
      /*             */
      16384
    ), xv = (
      /*               */
      32767
    ), ls = (
      /*                   */
      32768
    ), Kn = (
      /*                */
      65536
    ), Rc = (
      /* */
      131072
    ), Si = (
      /*                       */
      1048576
    ), fo = (
      /*                    */
      2097152
    ), Yi = (
      /*                 */
      4194304
    ), Tc = (
      /*                */
      8388608
    ), xl = (
      /*               */
      16777216
    ), Ei = (
      /*              */
      33554432
    ), bl = (
      // TODO: Remove Update flag from before mutation phase by re-landing Visibility
      // flag logic (see #20043)
      vt | In | 0
    ), _l = hn | vt | ka | Oa | Sn | Xr | Mn, Dl = vt | Zt | Sn | Mn, Ii = qr | ka, Nn = Yi | Tc | fo, La = F.ReactCurrentOwner;
    function pa(e) {
      var t = e, a = e;
      if (e.alternate)
        for (; t.return; )
          t = t.return;
      else {
        var i = t;
        do
          t = i, (t.flags & (hn | Xr)) !== De && (a = t.return), i = t.return;
        while (i);
      }
      return t.tag === ae ? a : null;
    }
    function Ci(e) {
      if (e.tag === xe) {
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
    function Ri(e) {
      return e.tag === ae ? e.stateNode.containerInfo : null;
    }
    function fu(e) {
      return pa(e) === e;
    }
    function bv(e) {
      {
        var t = La.current;
        if (t !== null && t.tag === pe) {
          var a = t, i = a.stateNode;
          i._warnedAboutRefsInRender || S("%s is accessing isMounted inside its render() function. render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", Ye(a) || "A component"), i._warnedAboutRefsInRender = !0;
        }
      }
      var u = so(e);
      return u ? pa(u) === u : !1;
    }
    function wc(e) {
      if (pa(e) !== e)
        throw new Error("Unable to find node on an unmounted component.");
    }
    function xc(e) {
      var t = e.alternate;
      if (!t) {
        var a = pa(e);
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
              return wc(s), e;
            if (v === u)
              return wc(s), t;
            v = v.sibling;
          }
          throw new Error("Unable to find node on an unmounted component.");
        }
        if (i.return !== u.return)
          i = s, u = f;
        else {
          for (var y = !1, g = s.child; g; ) {
            if (g === i) {
              y = !0, i = s, u = f;
              break;
            }
            if (g === u) {
              y = !0, u = s, i = f;
              break;
            }
            g = g.sibling;
          }
          if (!y) {
            for (g = f.child; g; ) {
              if (g === i) {
                y = !0, i = f, u = s;
                break;
              }
              if (g === u) {
                y = !0, u = f, i = s;
                break;
              }
              g = g.sibling;
            }
            if (!y)
              throw new Error("Child was not found in either parent set. This indicates a bug in React related to the return pointer. Please file an issue.");
          }
        }
        if (i.alternate !== u)
          throw new Error("Return fibers should always be each others' alternates. This error is likely caused by a bug in React. Please file an issue.");
      }
      if (i.tag !== ae)
        throw new Error("Unable to find node on an unmounted component.");
      return i.stateNode.current === i ? e : t;
    }
    function Kr(e) {
      var t = xc(e);
      return t !== null ? Zr(t) : null;
    }
    function Zr(e) {
      if (e.tag === ce || e.tag === Qe)
        return e;
      for (var t = e.child; t !== null; ) {
        var a = Zr(t);
        if (a !== null)
          return a;
        t = t.sibling;
      }
      return null;
    }
    function cn(e) {
      var t = xc(e);
      return t !== null ? Ma(t) : null;
    }
    function Ma(e) {
      if (e.tag === ce || e.tag === Qe)
        return e;
      for (var t = e.child; t !== null; ) {
        if (t.tag !== we) {
          var a = Ma(t);
          if (a !== null)
            return a;
        }
        t = t.sibling;
      }
      return null;
    }
    var dd = Z.unstable_scheduleCallback, _v = Z.unstable_cancelCallback, pd = Z.unstable_shouldYield, vd = Z.unstable_requestPaint, Qn = Z.unstable_now, bc = Z.unstable_getCurrentPriorityLevel, us = Z.unstable_ImmediatePriority, kl = Z.unstable_UserBlockingPriority, Qi = Z.unstable_NormalPriority, ry = Z.unstable_LowPriority, du = Z.unstable_IdlePriority, _c = Z.unstable_yieldValue, Dv = Z.unstable_setDisableYieldValue, pu = null, Rn = null, ie = null, va = !1, Jr = typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u";
    function po(e) {
      if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u")
        return !1;
      var t = __REACT_DEVTOOLS_GLOBAL_HOOK__;
      if (t.isDisabled)
        return !0;
      if (!t.supportsFiber)
        return S("The installed version of React DevTools is too old and will not work with the current version of React. Please update React DevTools. https://reactjs.org/link/react-devtools"), !0;
      try {
        He && (e = rt({}, e, {
          getLaneLabelMap: vu,
          injectProfilingHooks: Na
        })), pu = t.inject(e), Rn = t;
      } catch (a) {
        S("React instrumentation encountered an error: %s.", a);
      }
      return !!t.checkDCE;
    }
    function hd(e, t) {
      if (Rn && typeof Rn.onScheduleFiberRoot == "function")
        try {
          Rn.onScheduleFiberRoot(pu, e, t);
        } catch (a) {
          va || (va = !0, S("React instrumentation encountered an error: %s", a));
        }
    }
    function md(e, t) {
      if (Rn && typeof Rn.onCommitFiberRoot == "function")
        try {
          var a = (e.current.flags & Re) === Re;
          if (Ae) {
            var i;
            switch (t) {
              case Mr:
                i = us;
                break;
              case wi:
                i = kl;
                break;
              case za:
                i = Qi;
                break;
              case Ua:
                i = du;
                break;
              default:
                i = Qi;
                break;
            }
            Rn.onCommitFiberRoot(pu, e, i, a);
          }
        } catch (u) {
          va || (va = !0, S("React instrumentation encountered an error: %s", u));
        }
    }
    function yd(e) {
      if (Rn && typeof Rn.onPostCommitFiberRoot == "function")
        try {
          Rn.onPostCommitFiberRoot(pu, e);
        } catch (t) {
          va || (va = !0, S("React instrumentation encountered an error: %s", t));
        }
    }
    function gd(e) {
      if (Rn && typeof Rn.onCommitFiberUnmount == "function")
        try {
          Rn.onCommitFiberUnmount(pu, e);
        } catch (t) {
          va || (va = !0, S("React instrumentation encountered an error: %s", t));
        }
    }
    function mn(e) {
      if (typeof _c == "function" && (Dv(e), Nt(e)), Rn && typeof Rn.setStrictMode == "function")
        try {
          Rn.setStrictMode(pu, e);
        } catch (t) {
          va || (va = !0, S("React instrumentation encountered an error: %s", t));
        }
    }
    function Na(e) {
      ie = e;
    }
    function vu() {
      {
        for (var e = /* @__PURE__ */ new Map(), t = 1, a = 0; a < yu; a++) {
          var i = Mv(t);
          e.set(t, i), t *= 2;
        }
        return e;
      }
    }
    function Sd(e) {
      ie !== null && typeof ie.markCommitStarted == "function" && ie.markCommitStarted(e);
    }
    function Ed() {
      ie !== null && typeof ie.markCommitStopped == "function" && ie.markCommitStopped();
    }
    function ha(e) {
      ie !== null && typeof ie.markComponentRenderStarted == "function" && ie.markComponentRenderStarted(e);
    }
    function ma() {
      ie !== null && typeof ie.markComponentRenderStopped == "function" && ie.markComponentRenderStopped();
    }
    function Cd(e) {
      ie !== null && typeof ie.markComponentPassiveEffectMountStarted == "function" && ie.markComponentPassiveEffectMountStarted(e);
    }
    function kv() {
      ie !== null && typeof ie.markComponentPassiveEffectMountStopped == "function" && ie.markComponentPassiveEffectMountStopped();
    }
    function Wi(e) {
      ie !== null && typeof ie.markComponentPassiveEffectUnmountStarted == "function" && ie.markComponentPassiveEffectUnmountStarted(e);
    }
    function Ol() {
      ie !== null && typeof ie.markComponentPassiveEffectUnmountStopped == "function" && ie.markComponentPassiveEffectUnmountStopped();
    }
    function Dc(e) {
      ie !== null && typeof ie.markComponentLayoutEffectMountStarted == "function" && ie.markComponentLayoutEffectMountStarted(e);
    }
    function Ov() {
      ie !== null && typeof ie.markComponentLayoutEffectMountStopped == "function" && ie.markComponentLayoutEffectMountStopped();
    }
    function os(e) {
      ie !== null && typeof ie.markComponentLayoutEffectUnmountStarted == "function" && ie.markComponentLayoutEffectUnmountStarted(e);
    }
    function Rd() {
      ie !== null && typeof ie.markComponentLayoutEffectUnmountStopped == "function" && ie.markComponentLayoutEffectUnmountStopped();
    }
    function ss(e, t, a) {
      ie !== null && typeof ie.markComponentErrored == "function" && ie.markComponentErrored(e, t, a);
    }
    function Ti(e, t, a) {
      ie !== null && typeof ie.markComponentSuspended == "function" && ie.markComponentSuspended(e, t, a);
    }
    function cs(e) {
      ie !== null && typeof ie.markLayoutEffectsStarted == "function" && ie.markLayoutEffectsStarted(e);
    }
    function fs() {
      ie !== null && typeof ie.markLayoutEffectsStopped == "function" && ie.markLayoutEffectsStopped();
    }
    function hu(e) {
      ie !== null && typeof ie.markPassiveEffectsStarted == "function" && ie.markPassiveEffectsStarted(e);
    }
    function Td() {
      ie !== null && typeof ie.markPassiveEffectsStopped == "function" && ie.markPassiveEffectsStopped();
    }
    function mu(e) {
      ie !== null && typeof ie.markRenderStarted == "function" && ie.markRenderStarted(e);
    }
    function Lv() {
      ie !== null && typeof ie.markRenderYielded == "function" && ie.markRenderYielded();
    }
    function kc() {
      ie !== null && typeof ie.markRenderStopped == "function" && ie.markRenderStopped();
    }
    function yn(e) {
      ie !== null && typeof ie.markRenderScheduled == "function" && ie.markRenderScheduled(e);
    }
    function Oc(e, t) {
      ie !== null && typeof ie.markForceUpdateScheduled == "function" && ie.markForceUpdateScheduled(e, t);
    }
    function ds(e, t) {
      ie !== null && typeof ie.markStateUpdateScheduled == "function" && ie.markStateUpdateScheduled(e, t);
    }
    var ke = (
      /*                         */
      0
    ), at = (
      /*                 */
      1
    ), xt = (
      /*                    */
      2
    ), Yt = (
      /*               */
      8
    ), bt = (
      /*              */
      16
    ), zn = Math.clz32 ? Math.clz32 : ps, Zn = Math.log, Lc = Math.LN2;
    function ps(e) {
      var t = e >>> 0;
      return t === 0 ? 32 : 31 - (Zn(t) / Lc | 0) | 0;
    }
    var yu = 31, B = (
      /*                        */
      0
    ), Rt = (
      /*                          */
      0
    ), Fe = (
      /*                        */
      1
    ), Ll = (
      /*    */
      2
    ), ti = (
      /*             */
      4
    ), wr = (
      /*            */
      8
    ), Tn = (
      /*                     */
      16
    ), Gi = (
      /*                */
      32
    ), Ml = (
      /*                       */
      4194240
    ), gu = (
      /*                        */
      64
    ), Mc = (
      /*                        */
      128
    ), Nc = (
      /*                        */
      256
    ), zc = (
      /*                        */
      512
    ), Uc = (
      /*                        */
      1024
    ), Ac = (
      /*                        */
      2048
    ), Fc = (
      /*                        */
      4096
    ), jc = (
      /*                        */
      8192
    ), Hc = (
      /*                        */
      16384
    ), Su = (
      /*                       */
      32768
    ), Vc = (
      /*                       */
      65536
    ), vo = (
      /*                       */
      131072
    ), ho = (
      /*                       */
      262144
    ), Pc = (
      /*                       */
      524288
    ), vs = (
      /*                       */
      1048576
    ), Bc = (
      /*                       */
      2097152
    ), hs = (
      /*                            */
      130023424
    ), Eu = (
      /*                             */
      4194304
    ), $c = (
      /*                             */
      8388608
    ), ms = (
      /*                             */
      16777216
    ), Yc = (
      /*                             */
      33554432
    ), Ic = (
      /*                             */
      67108864
    ), wd = Eu, ys = (
      /*          */
      134217728
    ), xd = (
      /*                          */
      268435455
    ), gs = (
      /*               */
      268435456
    ), Cu = (
      /*                        */
      536870912
    ), ea = (
      /*                   */
      1073741824
    );
    function Mv(e) {
      {
        if (e & Fe)
          return "Sync";
        if (e & Ll)
          return "InputContinuousHydration";
        if (e & ti)
          return "InputContinuous";
        if (e & wr)
          return "DefaultHydration";
        if (e & Tn)
          return "Default";
        if (e & Gi)
          return "TransitionHydration";
        if (e & Ml)
          return "Transition";
        if (e & hs)
          return "Retry";
        if (e & ys)
          return "SelectiveHydration";
        if (e & gs)
          return "IdleHydration";
        if (e & Cu)
          return "Idle";
        if (e & ea)
          return "Offscreen";
      }
    }
    var Wt = -1, Ru = gu, Qc = Eu;
    function Ss(e) {
      switch (Nl(e)) {
        case Fe:
          return Fe;
        case Ll:
          return Ll;
        case ti:
          return ti;
        case wr:
          return wr;
        case Tn:
          return Tn;
        case Gi:
          return Gi;
        case gu:
        case Mc:
        case Nc:
        case zc:
        case Uc:
        case Ac:
        case Fc:
        case jc:
        case Hc:
        case Su:
        case Vc:
        case vo:
        case ho:
        case Pc:
        case vs:
        case Bc:
          return e & Ml;
        case Eu:
        case $c:
        case ms:
        case Yc:
        case Ic:
          return e & hs;
        case ys:
          return ys;
        case gs:
          return gs;
        case Cu:
          return Cu;
        case ea:
          return ea;
        default:
          return S("Should have found matching lanes. This is a bug in React."), e;
      }
    }
    function Wc(e, t) {
      var a = e.pendingLanes;
      if (a === B)
        return B;
      var i = B, u = e.suspendedLanes, s = e.pingedLanes, f = a & xd;
      if (f !== B) {
        var p = f & ~u;
        if (p !== B)
          i = Ss(p);
        else {
          var v = f & s;
          v !== B && (i = Ss(v));
        }
      } else {
        var y = a & ~u;
        y !== B ? i = Ss(y) : s !== B && (i = Ss(s));
      }
      if (i === B)
        return B;
      if (t !== B && t !== i && // If we already suspended with a delay, then interrupting is fine. Don't
      // bother waiting until the root is complete.
      (t & u) === B) {
        var g = Nl(i), b = Nl(t);
        if (
          // Tests whether the next lane is equal or lower priority than the wip
          // one. This works because the bits decrease in priority as you go left.
          g >= b || // Default priority updates should not interrupt transition updates. The
          // only difference between default updates and transition updates is that
          // default updates do not support refresh transitions.
          g === Tn && (b & Ml) !== B
        )
          return t;
      }
      (i & ti) !== B && (i |= a & Tn);
      var w = e.entangledLanes;
      if (w !== B)
        for (var M = e.entanglements, U = i & w; U > 0; ) {
          var j = Un(U), le = 1 << j;
          i |= M[j], U &= ~le;
        }
      return i;
    }
    function ni(e, t) {
      for (var a = e.eventTimes, i = Wt; t > 0; ) {
        var u = Un(t), s = 1 << u, f = a[u];
        f > i && (i = f), t &= ~s;
      }
      return i;
    }
    function bd(e, t) {
      switch (e) {
        case Fe:
        case Ll:
        case ti:
          return t + 250;
        case wr:
        case Tn:
        case Gi:
        case gu:
        case Mc:
        case Nc:
        case zc:
        case Uc:
        case Ac:
        case Fc:
        case jc:
        case Hc:
        case Su:
        case Vc:
        case vo:
        case ho:
        case Pc:
        case vs:
        case Bc:
          return t + 5e3;
        case Eu:
        case $c:
        case ms:
        case Yc:
        case Ic:
          return Wt;
        case ys:
        case gs:
        case Cu:
        case ea:
          return Wt;
        default:
          return S("Should have found matching lanes. This is a bug in React."), Wt;
      }
    }
    function Gc(e, t) {
      for (var a = e.pendingLanes, i = e.suspendedLanes, u = e.pingedLanes, s = e.expirationTimes, f = a; f > 0; ) {
        var p = Un(f), v = 1 << p, y = s[p];
        y === Wt ? ((v & i) === B || (v & u) !== B) && (s[p] = bd(v, t)) : y <= t && (e.expiredLanes |= v), f &= ~v;
      }
    }
    function Nv(e) {
      return Ss(e.pendingLanes);
    }
    function qc(e) {
      var t = e.pendingLanes & ~ea;
      return t !== B ? t : t & ea ? ea : B;
    }
    function zv(e) {
      return (e & Fe) !== B;
    }
    function Es(e) {
      return (e & xd) !== B;
    }
    function Tu(e) {
      return (e & hs) === e;
    }
    function _d(e) {
      var t = Fe | ti | Tn;
      return (e & t) === B;
    }
    function Dd(e) {
      return (e & Ml) === e;
    }
    function Xc(e, t) {
      var a = Ll | ti | wr | Tn;
      return (t & a) !== B;
    }
    function Uv(e, t) {
      return (t & e.expiredLanes) !== B;
    }
    function kd(e) {
      return (e & Ml) !== B;
    }
    function Od() {
      var e = Ru;
      return Ru <<= 1, (Ru & Ml) === B && (Ru = gu), e;
    }
    function Av() {
      var e = Qc;
      return Qc <<= 1, (Qc & hs) === B && (Qc = Eu), e;
    }
    function Nl(e) {
      return e & -e;
    }
    function Cs(e) {
      return Nl(e);
    }
    function Un(e) {
      return 31 - zn(e);
    }
    function ur(e) {
      return Un(e);
    }
    function ta(e, t) {
      return (e & t) !== B;
    }
    function wu(e, t) {
      return (e & t) === t;
    }
    function qe(e, t) {
      return e | t;
    }
    function Rs(e, t) {
      return e & ~t;
    }
    function Ld(e, t) {
      return e & t;
    }
    function Fv(e) {
      return e;
    }
    function jv(e, t) {
      return e !== Rt && e < t ? e : t;
    }
    function Ts(e) {
      for (var t = [], a = 0; a < yu; a++)
        t.push(e);
      return t;
    }
    function mo(e, t, a) {
      e.pendingLanes |= t, t !== Cu && (e.suspendedLanes = B, e.pingedLanes = B);
      var i = e.eventTimes, u = ur(t);
      i[u] = a;
    }
    function Hv(e, t) {
      e.suspendedLanes |= t, e.pingedLanes &= ~t;
      for (var a = e.expirationTimes, i = t; i > 0; ) {
        var u = Un(i), s = 1 << u;
        a[u] = Wt, i &= ~s;
      }
    }
    function Kc(e, t, a) {
      e.pingedLanes |= e.suspendedLanes & t;
    }
    function Md(e, t) {
      var a = e.pendingLanes & ~t;
      e.pendingLanes = t, e.suspendedLanes = B, e.pingedLanes = B, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t;
      for (var i = e.entanglements, u = e.eventTimes, s = e.expirationTimes, f = a; f > 0; ) {
        var p = Un(f), v = 1 << p;
        i[p] = B, u[p] = Wt, s[p] = Wt, f &= ~v;
      }
    }
    function Zc(e, t) {
      for (var a = e.entangledLanes |= t, i = e.entanglements, u = a; u; ) {
        var s = Un(u), f = 1 << s;
        // Is this one of the newly entangled lanes?
        f & t | // Is this lane transitively entangled with the newly entangled lanes?
        i[s] & t && (i[s] |= t), u &= ~f;
      }
    }
    function Nd(e, t) {
      var a = Nl(t), i;
      switch (a) {
        case ti:
          i = Ll;
          break;
        case Tn:
          i = wr;
          break;
        case gu:
        case Mc:
        case Nc:
        case zc:
        case Uc:
        case Ac:
        case Fc:
        case jc:
        case Hc:
        case Su:
        case Vc:
        case vo:
        case ho:
        case Pc:
        case vs:
        case Bc:
        case Eu:
        case $c:
        case ms:
        case Yc:
        case Ic:
          i = Gi;
          break;
        case Cu:
          i = gs;
          break;
        default:
          i = Rt;
          break;
      }
      return (i & (e.suspendedLanes | t)) !== Rt ? Rt : i;
    }
    function ws(e, t, a) {
      if (Jr)
        for (var i = e.pendingUpdatersLaneMap; a > 0; ) {
          var u = ur(a), s = 1 << u, f = i[u];
          f.add(t), a &= ~s;
        }
    }
    function Vv(e, t) {
      if (Jr)
        for (var a = e.pendingUpdatersLaneMap, i = e.memoizedUpdaters; t > 0; ) {
          var u = ur(t), s = 1 << u, f = a[u];
          f.size > 0 && (f.forEach(function(p) {
            var v = p.alternate;
            (v === null || !i.has(v)) && i.add(p);
          }), f.clear()), t &= ~s;
        }
    }
    function zd(e, t) {
      return null;
    }
    var Mr = Fe, wi = ti, za = Tn, Ua = Cu, xs = Rt;
    function Aa() {
      return xs;
    }
    function An(e) {
      xs = e;
    }
    function Pv(e, t) {
      var a = xs;
      try {
        return xs = e, t();
      } finally {
        xs = a;
      }
    }
    function Bv(e, t) {
      return e !== 0 && e < t ? e : t;
    }
    function bs(e, t) {
      return e > t ? e : t;
    }
    function Jn(e, t) {
      return e !== 0 && e < t;
    }
    function $v(e) {
      var t = Nl(e);
      return Jn(Mr, t) ? Jn(wi, t) ? Es(t) ? za : Ua : wi : Mr;
    }
    function Jc(e) {
      var t = e.current.memoizedState;
      return t.isDehydrated;
    }
    var _s;
    function xr(e) {
      _s = e;
    }
    function ay(e) {
      _s(e);
    }
    var de;
    function yo(e) {
      de = e;
    }
    var ef;
    function Yv(e) {
      ef = e;
    }
    var Iv;
    function Ds(e) {
      Iv = e;
    }
    var ks;
    function Ud(e) {
      ks = e;
    }
    var tf = !1, Os = [], qi = null, xi = null, bi = null, wn = /* @__PURE__ */ new Map(), Nr = /* @__PURE__ */ new Map(), zr = [], Qv = [
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
    function Wv(e) {
      return Qv.indexOf(e) > -1;
    }
    function ri(e, t, a, i, u) {
      return {
        blockedOn: e,
        domEventName: t,
        eventSystemFlags: a,
        nativeEvent: u,
        targetContainers: [i]
      };
    }
    function Ad(e, t) {
      switch (e) {
        case "focusin":
        case "focusout":
          qi = null;
          break;
        case "dragenter":
        case "dragleave":
          xi = null;
          break;
        case "mouseover":
        case "mouseout":
          bi = null;
          break;
        case "pointerover":
        case "pointerout": {
          var a = t.pointerId;
          wn.delete(a);
          break;
        }
        case "gotpointercapture":
        case "lostpointercapture": {
          var i = t.pointerId;
          Nr.delete(i);
          break;
        }
      }
    }
    function na(e, t, a, i, u, s) {
      if (e === null || e.nativeEvent !== s) {
        var f = ri(t, a, i, u, s);
        if (t !== null) {
          var p = bo(t);
          p !== null && de(p);
        }
        return f;
      }
      e.eventSystemFlags |= i;
      var v = e.targetContainers;
      return u !== null && v.indexOf(u) === -1 && v.push(u), e;
    }
    function iy(e, t, a, i, u) {
      switch (t) {
        case "focusin": {
          var s = u;
          return qi = na(qi, e, t, a, i, s), !0;
        }
        case "dragenter": {
          var f = u;
          return xi = na(xi, e, t, a, i, f), !0;
        }
        case "mouseover": {
          var p = u;
          return bi = na(bi, e, t, a, i, p), !0;
        }
        case "pointerover": {
          var v = u, y = v.pointerId;
          return wn.set(y, na(wn.get(y) || null, e, t, a, i, v)), !0;
        }
        case "gotpointercapture": {
          var g = u, b = g.pointerId;
          return Nr.set(b, na(Nr.get(b) || null, e, t, a, i, g)), !0;
        }
      }
      return !1;
    }
    function Fd(e) {
      var t = Bs(e.target);
      if (t !== null) {
        var a = pa(t);
        if (a !== null) {
          var i = a.tag;
          if (i === xe) {
            var u = Ci(a);
            if (u !== null) {
              e.blockedOn = u, ks(e.priority, function() {
                ef(a);
              });
              return;
            }
          } else if (i === ae) {
            var s = a.stateNode;
            if (Jc(s)) {
              e.blockedOn = Ri(a);
              return;
            }
          }
        }
      }
      e.blockedOn = null;
    }
    function Gv(e) {
      for (var t = Iv(), a = {
        blockedOn: null,
        target: e,
        priority: t
      }, i = 0; i < zr.length && Jn(t, zr[i].priority); i++)
        ;
      zr.splice(i, 0, a), i === 0 && Fd(a);
    }
    function Ls(e) {
      if (e.blockedOn !== null)
        return !1;
      for (var t = e.targetContainers; t.length > 0; ) {
        var a = t[0], i = So(e.domEventName, e.eventSystemFlags, a, e.nativeEvent);
        if (i === null) {
          var u = e.nativeEvent, s = new u.constructor(u.type, u);
          Jm(s), u.target.dispatchEvent(s), ey();
        } else {
          var f = bo(i);
          return f !== null && de(f), e.blockedOn = i, !1;
        }
        t.shift();
      }
      return !0;
    }
    function jd(e, t, a) {
      Ls(e) && a.delete(t);
    }
    function ly() {
      tf = !1, qi !== null && Ls(qi) && (qi = null), xi !== null && Ls(xi) && (xi = null), bi !== null && Ls(bi) && (bi = null), wn.forEach(jd), Nr.forEach(jd);
    }
    function zl(e, t) {
      e.blockedOn === t && (e.blockedOn = null, tf || (tf = !0, Z.unstable_scheduleCallback(Z.unstable_NormalPriority, ly)));
    }
    function xu(e) {
      if (Os.length > 0) {
        zl(Os[0], e);
        for (var t = 1; t < Os.length; t++) {
          var a = Os[t];
          a.blockedOn === e && (a.blockedOn = null);
        }
      }
      qi !== null && zl(qi, e), xi !== null && zl(xi, e), bi !== null && zl(bi, e);
      var i = function(p) {
        return zl(p, e);
      };
      wn.forEach(i), Nr.forEach(i);
      for (var u = 0; u < zr.length; u++) {
        var s = zr[u];
        s.blockedOn === e && (s.blockedOn = null);
      }
      for (; zr.length > 0; ) {
        var f = zr[0];
        if (f.blockedOn !== null)
          break;
        Fd(f), f.blockedOn === null && zr.shift();
      }
    }
    var or = F.ReactCurrentBatchConfig, ht = !0;
    function Wn(e) {
      ht = !!e;
    }
    function Fn() {
      return ht;
    }
    function sr(e, t, a) {
      var i = nf(t), u;
      switch (i) {
        case Mr:
          u = ya;
          break;
        case wi:
          u = go;
          break;
        case za:
        default:
          u = xn;
          break;
      }
      return u.bind(null, t, a, e);
    }
    function ya(e, t, a, i) {
      var u = Aa(), s = or.transition;
      or.transition = null;
      try {
        An(Mr), xn(e, t, a, i);
      } finally {
        An(u), or.transition = s;
      }
    }
    function go(e, t, a, i) {
      var u = Aa(), s = or.transition;
      or.transition = null;
      try {
        An(wi), xn(e, t, a, i);
      } finally {
        An(u), or.transition = s;
      }
    }
    function xn(e, t, a, i) {
      ht && Ms(e, t, a, i);
    }
    function Ms(e, t, a, i) {
      var u = So(e, t, a, i);
      if (u === null) {
        Ty(e, t, i, _i, a), Ad(e, i);
        return;
      }
      if (iy(u, e, t, a, i)) {
        i.stopPropagation();
        return;
      }
      if (Ad(e, i), t & Da && Wv(e)) {
        for (; u !== null; ) {
          var s = bo(u);
          s !== null && ay(s);
          var f = So(e, t, a, i);
          if (f === null && Ty(e, t, i, _i, a), f === u)
            break;
          u = f;
        }
        u !== null && i.stopPropagation();
        return;
      }
      Ty(e, t, i, null, a);
    }
    var _i = null;
    function So(e, t, a, i) {
      _i = null;
      var u = cd(i), s = Bs(u);
      if (s !== null) {
        var f = pa(s);
        if (f === null)
          s = null;
        else {
          var p = f.tag;
          if (p === xe) {
            var v = Ci(f);
            if (v !== null)
              return v;
            s = null;
          } else if (p === ae) {
            var y = f.stateNode;
            if (Jc(y))
              return Ri(f);
            s = null;
          } else f !== s && (s = null);
        }
      }
      return _i = s, null;
    }
    function nf(e) {
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
          return Mr;
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
          return wi;
        case "message": {
          var t = bc();
          switch (t) {
            case us:
              return Mr;
            case kl:
              return wi;
            case Qi:
            case ry:
              return za;
            case du:
              return Ua;
            default:
              return za;
          }
        }
        default:
          return za;
      }
    }
    function Ns(e, t, a) {
      return e.addEventListener(t, a, !1), a;
    }
    function ra(e, t, a) {
      return e.addEventListener(t, a, !0), a;
    }
    function Hd(e, t, a, i) {
      return e.addEventListener(t, a, {
        capture: !0,
        passive: i
      }), a;
    }
    function Eo(e, t, a, i) {
      return e.addEventListener(t, a, {
        passive: i
      }), a;
    }
    var ga = null, Co = null, bu = null;
    function Ul(e) {
      return ga = e, Co = zs(), !0;
    }
    function rf() {
      ga = null, Co = null, bu = null;
    }
    function Xi() {
      if (bu)
        return bu;
      var e, t = Co, a = t.length, i, u = zs(), s = u.length;
      for (e = 0; e < a && t[e] === u[e]; e++)
        ;
      var f = a - e;
      for (i = 1; i <= f && t[a - i] === u[s - i]; i++)
        ;
      var p = i > 1 ? 1 - i : void 0;
      return bu = u.slice(e, p), bu;
    }
    function zs() {
      return "value" in ga ? ga.value : ga.textContent;
    }
    function Al(e) {
      var t, a = e.keyCode;
      return "charCode" in e ? (t = e.charCode, t === 0 && a === 13 && (t = 13)) : t = a, t === 10 && (t = 13), t >= 32 || t === 13 ? t : 0;
    }
    function Ro() {
      return !0;
    }
    function Us() {
      return !1;
    }
    function br(e) {
      function t(a, i, u, s, f) {
        this._reactName = a, this._targetInst = u, this.type = i, this.nativeEvent = s, this.target = f, this.currentTarget = null;
        for (var p in e)
          if (e.hasOwnProperty(p)) {
            var v = e[p];
            v ? this[p] = v(s) : this[p] = s[p];
          }
        var y = s.defaultPrevented != null ? s.defaultPrevented : s.returnValue === !1;
        return y ? this.isDefaultPrevented = Ro : this.isDefaultPrevented = Us, this.isPropagationStopped = Us, this;
      }
      return rt(t.prototype, {
        preventDefault: function() {
          this.defaultPrevented = !0;
          var a = this.nativeEvent;
          a && (a.preventDefault ? a.preventDefault() : typeof a.returnValue != "unknown" && (a.returnValue = !1), this.isDefaultPrevented = Ro);
        },
        stopPropagation: function() {
          var a = this.nativeEvent;
          a && (a.stopPropagation ? a.stopPropagation() : typeof a.cancelBubble != "unknown" && (a.cancelBubble = !0), this.isPropagationStopped = Ro);
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
        isPersistent: Ro
      }), t;
    }
    var jn = {
      eventPhase: 0,
      bubbles: 0,
      cancelable: 0,
      timeStamp: function(e) {
        return e.timeStamp || Date.now();
      },
      defaultPrevented: 0,
      isTrusted: 0
    }, Di = br(jn), Ur = rt({}, jn, {
      view: 0,
      detail: 0
    }), aa = br(Ur), af, As, _u;
    function uy(e) {
      e !== _u && (_u && e.type === "mousemove" ? (af = e.screenX - _u.screenX, As = e.screenY - _u.screenY) : (af = 0, As = 0), _u = e);
    }
    var ai = rt({}, Ur, {
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
      getModifierState: fn,
      button: 0,
      buttons: 0,
      relatedTarget: function(e) {
        return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
      },
      movementX: function(e) {
        return "movementX" in e ? e.movementX : (uy(e), af);
      },
      movementY: function(e) {
        return "movementY" in e ? e.movementY : As;
      }
    }), Vd = br(ai), Pd = rt({}, ai, {
      dataTransfer: 0
    }), Du = br(Pd), Bd = rt({}, Ur, {
      relatedTarget: 0
    }), Ki = br(Bd), qv = rt({}, jn, {
      animationName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), Xv = br(qv), $d = rt({}, jn, {
      clipboardData: function(e) {
        return "clipboardData" in e ? e.clipboardData : window.clipboardData;
      }
    }), lf = br($d), oy = rt({}, jn, {
      data: 0
    }), Kv = br(oy), Zv = Kv, Jv = {
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
    }, ku = {
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
    function sy(e) {
      if (e.key) {
        var t = Jv[e.key] || e.key;
        if (t !== "Unidentified")
          return t;
      }
      if (e.type === "keypress") {
        var a = Al(e);
        return a === 13 ? "Enter" : String.fromCharCode(a);
      }
      return e.type === "keydown" || e.type === "keyup" ? ku[e.keyCode] || "Unidentified" : "";
    }
    var To = {
      Alt: "altKey",
      Control: "ctrlKey",
      Meta: "metaKey",
      Shift: "shiftKey"
    };
    function eh(e) {
      var t = this, a = t.nativeEvent;
      if (a.getModifierState)
        return a.getModifierState(e);
      var i = To[e];
      return i ? !!a[i] : !1;
    }
    function fn(e) {
      return eh;
    }
    var cy = rt({}, Ur, {
      key: sy,
      code: 0,
      location: 0,
      ctrlKey: 0,
      shiftKey: 0,
      altKey: 0,
      metaKey: 0,
      repeat: 0,
      locale: 0,
      getModifierState: fn,
      // Legacy Interface
      charCode: function(e) {
        return e.type === "keypress" ? Al(e) : 0;
      },
      keyCode: function(e) {
        return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      },
      which: function(e) {
        return e.type === "keypress" ? Al(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
      }
    }), th = br(cy), fy = rt({}, ai, {
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
    }), nh = br(fy), rh = rt({}, Ur, {
      touches: 0,
      targetTouches: 0,
      changedTouches: 0,
      altKey: 0,
      metaKey: 0,
      ctrlKey: 0,
      shiftKey: 0,
      getModifierState: fn
    }), ah = br(rh), dy = rt({}, jn, {
      propertyName: 0,
      elapsedTime: 0,
      pseudoElement: 0
    }), Fa = br(dy), Yd = rt({}, ai, {
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
    }), py = br(Yd), Fl = [9, 13, 27, 32], Fs = 229, Zi = Dn && "CompositionEvent" in window, jl = null;
    Dn && "documentMode" in document && (jl = document.documentMode);
    var Id = Dn && "TextEvent" in window && !jl, uf = Dn && (!Zi || jl && jl > 8 && jl <= 11), ih = 32, of = String.fromCharCode(ih);
    function vy() {
      nt("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), nt("onCompositionEnd", ["compositionend", "focusout", "keydown", "keypress", "keyup", "mousedown"]), nt("onCompositionStart", ["compositionstart", "focusout", "keydown", "keypress", "keyup", "mousedown"]), nt("onCompositionUpdate", ["compositionupdate", "focusout", "keydown", "keypress", "keyup", "mousedown"]);
    }
    var Qd = !1;
    function lh(e) {
      return (e.ctrlKey || e.altKey || e.metaKey) && // ctrlKey && altKey is equivalent to AltGr, and is not a command.
      !(e.ctrlKey && e.altKey);
    }
    function sf(e) {
      switch (e) {
        case "compositionstart":
          return "onCompositionStart";
        case "compositionend":
          return "onCompositionEnd";
        case "compositionupdate":
          return "onCompositionUpdate";
      }
    }
    function cf(e, t) {
      return e === "keydown" && t.keyCode === Fs;
    }
    function Wd(e, t) {
      switch (e) {
        case "keyup":
          return Fl.indexOf(t.keyCode) !== -1;
        case "keydown":
          return t.keyCode !== Fs;
        case "keypress":
        case "mousedown":
        case "focusout":
          return !0;
        default:
          return !1;
      }
    }
    function ff(e) {
      var t = e.detail;
      return typeof t == "object" && "data" in t ? t.data : null;
    }
    function uh(e) {
      return e.locale === "ko";
    }
    var Ou = !1;
    function Gd(e, t, a, i, u) {
      var s, f;
      if (Zi ? s = sf(t) : Ou ? Wd(t, i) && (s = "onCompositionEnd") : cf(t, i) && (s = "onCompositionStart"), !s)
        return null;
      uf && !uh(i) && (!Ou && s === "onCompositionStart" ? Ou = Ul(u) : s === "onCompositionEnd" && Ou && (f = Xi()));
      var p = vh(a, s);
      if (p.length > 0) {
        var v = new Kv(s, t, null, i, u);
        if (e.push({
          event: v,
          listeners: p
        }), f)
          v.data = f;
        else {
          var y = ff(i);
          y !== null && (v.data = y);
        }
      }
    }
    function df(e, t) {
      switch (e) {
        case "compositionend":
          return ff(t);
        case "keypress":
          var a = t.which;
          return a !== ih ? null : (Qd = !0, of);
        case "textInput":
          var i = t.data;
          return i === of && Qd ? null : i;
        default:
          return null;
      }
    }
    function qd(e, t) {
      if (Ou) {
        if (e === "compositionend" || !Zi && Wd(e, t)) {
          var a = Xi();
          return rf(), Ou = !1, a;
        }
        return null;
      }
      switch (e) {
        case "paste":
          return null;
        case "keypress":
          if (!lh(t)) {
            if (t.char && t.char.length > 1)
              return t.char;
            if (t.which)
              return String.fromCharCode(t.which);
          }
          return null;
        case "compositionend":
          return uf && !uh(t) ? null : t.data;
        default:
          return null;
      }
    }
    function pf(e, t, a, i, u) {
      var s;
      if (Id ? s = df(t, i) : s = qd(t, i), !s)
        return null;
      var f = vh(a, "onBeforeInput");
      if (f.length > 0) {
        var p = new Zv("onBeforeInput", "beforeinput", null, i, u);
        e.push({
          event: p,
          listeners: f
        }), p.data = s;
      }
    }
    function oh(e, t, a, i, u, s, f) {
      Gd(e, t, a, i, u), pf(e, t, a, i, u);
    }
    var hy = {
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
    function js(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t === "input" ? !!hy[e.type] : t === "textarea";
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
    function my(e) {
      if (!Dn)
        return !1;
      var t = "on" + e, a = t in document;
      if (!a) {
        var i = document.createElement("div");
        i.setAttribute(t, "return;"), a = typeof i[t] == "function";
      }
      return a;
    }
    function Hs() {
      nt("onChange", ["change", "click", "focusin", "focusout", "input", "keydown", "keyup", "selectionchange"]);
    }
    function sh(e, t, a, i) {
      io(i);
      var u = vh(t, "onChange");
      if (u.length > 0) {
        var s = new Di("onChange", "change", null, a, i);
        e.push({
          event: s,
          listeners: u
        });
      }
    }
    var Hl = null, n = null;
    function r(e) {
      var t = e.nodeName && e.nodeName.toLowerCase();
      return t === "select" || t === "input" && e.type === "file";
    }
    function l(e) {
      var t = [];
      sh(t, n, e, cd(e)), Cv(o, t);
    }
    function o(e) {
      bE(e, 0);
    }
    function c(e) {
      var t = Sf(e);
      if (hi(t))
        return e;
    }
    function d(e, t) {
      if (e === "change")
        return t;
    }
    var m = !1;
    Dn && (m = my("input") && (!document.documentMode || document.documentMode > 9));
    function E(e, t) {
      Hl = e, n = t, Hl.attachEvent("onpropertychange", z);
    }
    function T() {
      Hl && (Hl.detachEvent("onpropertychange", z), Hl = null, n = null);
    }
    function z(e) {
      e.propertyName === "value" && c(n) && l(e);
    }
    function I(e, t, a) {
      e === "focusin" ? (T(), E(t, a)) : e === "focusout" && T();
    }
    function W(e, t) {
      if (e === "selectionchange" || e === "keyup" || e === "keydown")
        return c(n);
    }
    function Y(e) {
      var t = e.nodeName;
      return t && t.toLowerCase() === "input" && (e.type === "checkbox" || e.type === "radio");
    }
    function oe(e, t) {
      if (e === "click")
        return c(t);
    }
    function ve(e, t) {
      if (e === "input" || e === "change")
        return c(t);
    }
    function ye(e) {
      var t = e._wrapperState;
      !t || !t.controlled || e.type !== "number" || Le(e, "number", e.value);
    }
    function bn(e, t, a, i, u, s, f) {
      var p = a ? Sf(a) : window, v, y;
      if (r(p) ? v = d : js(p) ? m ? v = ve : (v = W, y = I) : Y(p) && (v = oe), v) {
        var g = v(t, a);
        if (g) {
          sh(e, g, i, u);
          return;
        }
      }
      y && y(t, p, a), t === "focusout" && ye(p);
    }
    function D() {
      Ht("onMouseEnter", ["mouseout", "mouseover"]), Ht("onMouseLeave", ["mouseout", "mouseover"]), Ht("onPointerEnter", ["pointerout", "pointerover"]), Ht("onPointerLeave", ["pointerout", "pointerover"]);
    }
    function x(e, t, a, i, u, s, f) {
      var p = t === "mouseover" || t === "pointerover", v = t === "mouseout" || t === "pointerout";
      if (p && !ts(i)) {
        var y = i.relatedTarget || i.fromElement;
        if (y && (Bs(y) || sp(y)))
          return;
      }
      if (!(!v && !p)) {
        var g;
        if (u.window === u)
          g = u;
        else {
          var b = u.ownerDocument;
          b ? g = b.defaultView || b.parentWindow : g = window;
        }
        var w, M;
        if (v) {
          var U = i.relatedTarget || i.toElement;
          if (w = a, M = U ? Bs(U) : null, M !== null) {
            var j = pa(M);
            (M !== j || M.tag !== ce && M.tag !== Qe) && (M = null);
          }
        } else
          w = null, M = a;
        if (w !== M) {
          var le = Vd, Me = "onMouseLeave", Ce = "onMouseEnter", yt = "mouse";
          (t === "pointerout" || t === "pointerover") && (le = nh, Me = "onPointerLeave", Ce = "onPointerEnter", yt = "pointer");
          var ft = w == null ? g : Sf(w), k = M == null ? g : Sf(M), H = new le(Me, yt + "leave", w, i, u);
          H.target = ft, H.relatedTarget = k;
          var O = null, G = Bs(u);
          if (G === a) {
            var fe = new le(Ce, yt + "enter", M, i, u);
            fe.target = k, fe.relatedTarget = ft, O = fe;
          }
          bT(e, H, O, w, M);
        }
      }
    }
    function L(e, t) {
      return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
    }
    var Q = typeof Object.is == "function" ? Object.is : L;
    function he(e, t) {
      if (Q(e, t))
        return !0;
      if (typeof e != "object" || e === null || typeof t != "object" || t === null)
        return !1;
      var a = Object.keys(e), i = Object.keys(t);
      if (a.length !== i.length)
        return !1;
      for (var u = 0; u < a.length; u++) {
        var s = a[u];
        if (!_r.call(t, s) || !Q(e[s], t[s]))
          return !1;
      }
      return !0;
    }
    function Ne(e) {
      for (; e && e.firstChild; )
        e = e.firstChild;
      return e;
    }
    function Ue(e) {
      for (; e; ) {
        if (e.nextSibling)
          return e.nextSibling;
        e = e.parentNode;
      }
    }
    function $e(e, t) {
      for (var a = Ne(e), i = 0, u = 0; a; ) {
        if (a.nodeType === Pi) {
          if (u = i + a.textContent.length, i <= t && u >= t)
            return {
              node: a,
              offset: t - i
            };
          i = u;
        }
        a = Ne(Ue(a));
      }
    }
    function er(e) {
      var t = e.ownerDocument, a = t && t.defaultView || window, i = a.getSelection && a.getSelection();
      if (!i || i.rangeCount === 0)
        return null;
      var u = i.anchorNode, s = i.anchorOffset, f = i.focusNode, p = i.focusOffset;
      try {
        u.nodeType, f.nodeType;
      } catch {
        return null;
      }
      return _t(e, u, s, f, p);
    }
    function _t(e, t, a, i, u) {
      var s = 0, f = -1, p = -1, v = 0, y = 0, g = e, b = null;
      e: for (; ; ) {
        for (var w = null; g === t && (a === 0 || g.nodeType === Pi) && (f = s + a), g === i && (u === 0 || g.nodeType === Pi) && (p = s + u), g.nodeType === Pi && (s += g.nodeValue.length), (w = g.firstChild) !== null; )
          b = g, g = w;
        for (; ; ) {
          if (g === e)
            break e;
          if (b === t && ++v === a && (f = s), b === i && ++y === u && (p = s), (w = g.nextSibling) !== null)
            break;
          g = b, b = g.parentNode;
        }
        g = w;
      }
      return f === -1 || p === -1 ? null : {
        start: f,
        end: p
      };
    }
    function Vl(e, t) {
      var a = e.ownerDocument || document, i = a && a.defaultView || window;
      if (i.getSelection) {
        var u = i.getSelection(), s = e.textContent.length, f = Math.min(t.start, s), p = t.end === void 0 ? f : Math.min(t.end, s);
        if (!u.extend && f > p) {
          var v = p;
          p = f, f = v;
        }
        var y = $e(e, f), g = $e(e, p);
        if (y && g) {
          if (u.rangeCount === 1 && u.anchorNode === y.node && u.anchorOffset === y.offset && u.focusNode === g.node && u.focusOffset === g.offset)
            return;
          var b = a.createRange();
          b.setStart(y.node, y.offset), u.removeAllRanges(), f > p ? (u.addRange(b), u.extend(g.node, g.offset)) : (b.setEnd(g.node, g.offset), u.addRange(b));
        }
      }
    }
    function ch(e) {
      return e && e.nodeType === Pi;
    }
    function hE(e, t) {
      return !e || !t ? !1 : e === t ? !0 : ch(e) ? !1 : ch(t) ? hE(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1;
    }
    function oT(e) {
      return e && e.ownerDocument && hE(e.ownerDocument.documentElement, e);
    }
    function sT(e) {
      try {
        return typeof e.contentWindow.location.href == "string";
      } catch {
        return !1;
      }
    }
    function mE() {
      for (var e = window, t = _a(); t instanceof e.HTMLIFrameElement; ) {
        if (sT(t))
          e = t.contentWindow;
        else
          return t;
        t = _a(e.document);
      }
      return t;
    }
    function yy(e) {
      var t = e && e.nodeName && e.nodeName.toLowerCase();
      return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
    }
    function cT() {
      var e = mE();
      return {
        focusedElem: e,
        selectionRange: yy(e) ? dT(e) : null
      };
    }
    function fT(e) {
      var t = mE(), a = e.focusedElem, i = e.selectionRange;
      if (t !== a && oT(a)) {
        i !== null && yy(a) && pT(a, i);
        for (var u = [], s = a; s = s.parentNode; )
          s.nodeType === Gr && u.push({
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
    function dT(e) {
      var t;
      return "selectionStart" in e ? t = {
        start: e.selectionStart,
        end: e.selectionEnd
      } : t = er(e), t || {
        start: 0,
        end: 0
      };
    }
    function pT(e, t) {
      var a = t.start, i = t.end;
      i === void 0 && (i = a), "selectionStart" in e ? (e.selectionStart = a, e.selectionEnd = Math.min(i, e.value.length)) : Vl(e, t);
    }
    var vT = Dn && "documentMode" in document && document.documentMode <= 11;
    function hT() {
      nt("onSelect", ["focusout", "contextmenu", "dragend", "focusin", "keydown", "keyup", "mousedown", "mouseup", "selectionchange"]);
    }
    var vf = null, gy = null, Xd = null, Sy = !1;
    function mT(e) {
      if ("selectionStart" in e && yy(e))
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
    function yT(e) {
      return e.window === e ? e.document : e.nodeType === Bi ? e : e.ownerDocument;
    }
    function yE(e, t, a) {
      var i = yT(a);
      if (!(Sy || vf == null || vf !== _a(i))) {
        var u = mT(vf);
        if (!Xd || !he(Xd, u)) {
          Xd = u;
          var s = vh(gy, "onSelect");
          if (s.length > 0) {
            var f = new Di("onSelect", "select", null, t, a);
            e.push({
              event: f,
              listeners: s
            }), f.target = vf;
          }
        }
      }
    }
    function gT(e, t, a, i, u, s, f) {
      var p = a ? Sf(a) : window;
      switch (t) {
        case "focusin":
          (js(p) || p.contentEditable === "true") && (vf = p, gy = a, Xd = null);
          break;
        case "focusout":
          vf = null, gy = null, Xd = null;
          break;
        case "mousedown":
          Sy = !0;
          break;
        case "contextmenu":
        case "mouseup":
        case "dragend":
          Sy = !1, yE(e, i, u);
          break;
        case "selectionchange":
          if (vT)
            break;
        case "keydown":
        case "keyup":
          yE(e, i, u);
      }
    }
    function fh(e, t) {
      var a = {};
      return a[e.toLowerCase()] = t.toLowerCase(), a["Webkit" + e] = "webkit" + t, a["Moz" + e] = "moz" + t, a;
    }
    var hf = {
      animationend: fh("Animation", "AnimationEnd"),
      animationiteration: fh("Animation", "AnimationIteration"),
      animationstart: fh("Animation", "AnimationStart"),
      transitionend: fh("Transition", "TransitionEnd")
    }, Ey = {}, gE = {};
    Dn && (gE = document.createElement("div").style, "AnimationEvent" in window || (delete hf.animationend.animation, delete hf.animationiteration.animation, delete hf.animationstart.animation), "TransitionEvent" in window || delete hf.transitionend.transition);
    function dh(e) {
      if (Ey[e])
        return Ey[e];
      if (!hf[e])
        return e;
      var t = hf[e];
      for (var a in t)
        if (t.hasOwnProperty(a) && a in gE)
          return Ey[e] = t[a];
      return e;
    }
    var SE = dh("animationend"), EE = dh("animationiteration"), CE = dh("animationstart"), RE = dh("transitionend"), TE = /* @__PURE__ */ new Map(), wE = ["abort", "auxClick", "cancel", "canPlay", "canPlayThrough", "click", "close", "contextMenu", "copy", "cut", "drag", "dragEnd", "dragEnter", "dragExit", "dragLeave", "dragOver", "dragStart", "drop", "durationChange", "emptied", "encrypted", "ended", "error", "gotPointerCapture", "input", "invalid", "keyDown", "keyPress", "keyUp", "load", "loadedData", "loadedMetadata", "loadStart", "lostPointerCapture", "mouseDown", "mouseMove", "mouseOut", "mouseOver", "mouseUp", "paste", "pause", "play", "playing", "pointerCancel", "pointerDown", "pointerMove", "pointerOut", "pointerOver", "pointerUp", "progress", "rateChange", "reset", "resize", "seeked", "seeking", "stalled", "submit", "suspend", "timeUpdate", "touchCancel", "touchEnd", "touchStart", "volumeChange", "scroll", "toggle", "touchMove", "waiting", "wheel"];
    function wo(e, t) {
      TE.set(e, t), nt(t, [e]);
    }
    function ST() {
      for (var e = 0; e < wE.length; e++) {
        var t = wE[e], a = t.toLowerCase(), i = t[0].toUpperCase() + t.slice(1);
        wo(a, "on" + i);
      }
      wo(SE, "onAnimationEnd"), wo(EE, "onAnimationIteration"), wo(CE, "onAnimationStart"), wo("dblclick", "onDoubleClick"), wo("focusin", "onFocus"), wo("focusout", "onBlur"), wo(RE, "onTransitionEnd");
    }
    function ET(e, t, a, i, u, s, f) {
      var p = TE.get(t);
      if (p !== void 0) {
        var v = Di, y = t;
        switch (t) {
          case "keypress":
            if (Al(i) === 0)
              return;
          case "keydown":
          case "keyup":
            v = th;
            break;
          case "focusin":
            y = "focus", v = Ki;
            break;
          case "focusout":
            y = "blur", v = Ki;
            break;
          case "beforeblur":
          case "afterblur":
            v = Ki;
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
            v = Vd;
            break;
          case "drag":
          case "dragend":
          case "dragenter":
          case "dragexit":
          case "dragleave":
          case "dragover":
          case "dragstart":
          case "drop":
            v = Du;
            break;
          case "touchcancel":
          case "touchend":
          case "touchmove":
          case "touchstart":
            v = ah;
            break;
          case SE:
          case EE:
          case CE:
            v = Xv;
            break;
          case RE:
            v = Fa;
            break;
          case "scroll":
            v = aa;
            break;
          case "wheel":
            v = py;
            break;
          case "copy":
          case "cut":
          case "paste":
            v = lf;
            break;
          case "gotpointercapture":
          case "lostpointercapture":
          case "pointercancel":
          case "pointerdown":
          case "pointermove":
          case "pointerout":
          case "pointerover":
          case "pointerup":
            v = nh;
            break;
        }
        var g = (s & Da) !== 0;
        {
          var b = !g && // TODO: ideally, we'd eventually add all events from
          // nonDelegatedEvents list in DOMPluginEventSystem.
          // Then we can remove this special list.
          // This is a breaking change that can wait until React 18.
          t === "scroll", w = wT(a, p, i.type, g, b);
          if (w.length > 0) {
            var M = new v(p, y, null, i, u);
            e.push({
              event: M,
              listeners: w
            });
          }
        }
      }
    }
    ST(), D(), Hs(), hT(), vy();
    function CT(e, t, a, i, u, s, f) {
      ET(e, t, a, i, u, s);
      var p = (s & sd) === 0;
      p && (x(e, t, a, i, u), bn(e, t, a, i, u), gT(e, t, a, i, u), oh(e, t, a, i, u));
    }
    var Kd = ["abort", "canplay", "canplaythrough", "durationchange", "emptied", "encrypted", "ended", "error", "loadeddata", "loadedmetadata", "loadstart", "pause", "play", "playing", "progress", "ratechange", "resize", "seeked", "seeking", "stalled", "suspend", "timeupdate", "volumechange", "waiting"], Cy = new Set(["cancel", "close", "invalid", "load", "scroll", "toggle"].concat(Kd));
    function xE(e, t, a) {
      var i = e.type || "unknown-event";
      e.currentTarget = a, gi(i, t, void 0, e), e.currentTarget = null;
    }
    function RT(e, t, a) {
      var i;
      if (a)
        for (var u = t.length - 1; u >= 0; u--) {
          var s = t[u], f = s.instance, p = s.currentTarget, v = s.listener;
          if (f !== i && e.isPropagationStopped())
            return;
          xE(e, v, p), i = f;
        }
      else
        for (var y = 0; y < t.length; y++) {
          var g = t[y], b = g.instance, w = g.currentTarget, M = g.listener;
          if (b !== i && e.isPropagationStopped())
            return;
          xE(e, M, w), i = b;
        }
    }
    function bE(e, t) {
      for (var a = (t & Da) !== 0, i = 0; i < e.length; i++) {
        var u = e[i], s = u.event, f = u.listeners;
        RT(s, f, a);
      }
      as();
    }
    function TT(e, t, a, i, u) {
      var s = cd(a), f = [];
      CT(f, e, i, a, s, t), bE(f, t);
    }
    function gn(e, t) {
      Cy.has(e) || S('Did not expect a listenToNonDelegatedEvent() call for "%s". This is a bug in React. Please file an issue.', e);
      var a = !1, i = J1(t), u = _T(e);
      i.has(u) || (_E(t, e, pc, a), i.add(u));
    }
    function Ry(e, t, a) {
      Cy.has(e) && !t && S('Did not expect a listenToNativeEvent() call for "%s" in the bubble phase. This is a bug in React. Please file an issue.', e);
      var i = 0;
      t && (i |= Da), _E(a, e, i, t);
    }
    var ph = "_reactListening" + Math.random().toString(36).slice(2);
    function Zd(e) {
      if (!e[ph]) {
        e[ph] = !0, Ke.forEach(function(a) {
          a !== "selectionchange" && (Cy.has(a) || Ry(a, !1, e), Ry(a, !0, e));
        });
        var t = e.nodeType === Bi ? e : e.ownerDocument;
        t !== null && (t[ph] || (t[ph] = !0, Ry("selectionchange", !1, t)));
      }
    }
    function _E(e, t, a, i, u) {
      var s = sr(e, t, a), f = void 0;
      rs && (t === "touchstart" || t === "touchmove" || t === "wheel") && (f = !0), e = e, i ? f !== void 0 ? Hd(e, t, s, f) : ra(e, t, s) : f !== void 0 ? Eo(e, t, s, f) : Ns(e, t, s);
    }
    function DE(e, t) {
      return e === t || e.nodeType === Ln && e.parentNode === t;
    }
    function Ty(e, t, a, i, u) {
      var s = i;
      if (!(t & od) && !(t & pc)) {
        var f = u;
        if (i !== null) {
          var p = i;
          e: for (; ; ) {
            if (p === null)
              return;
            var v = p.tag;
            if (v === ae || v === we) {
              var y = p.stateNode.containerInfo;
              if (DE(y, f))
                break;
              if (v === we)
                for (var g = p.return; g !== null; ) {
                  var b = g.tag;
                  if (b === ae || b === we) {
                    var w = g.stateNode.containerInfo;
                    if (DE(w, f))
                      return;
                  }
                  g = g.return;
                }
              for (; y !== null; ) {
                var M = Bs(y);
                if (M === null)
                  return;
                var U = M.tag;
                if (U === ce || U === Qe) {
                  p = s = M;
                  continue e;
                }
                y = y.parentNode;
              }
            }
            p = p.return;
          }
        }
      }
      Cv(function() {
        return TT(e, t, a, s);
      });
    }
    function Jd(e, t, a) {
      return {
        instance: e,
        listener: t,
        currentTarget: a
      };
    }
    function wT(e, t, a, i, u, s) {
      for (var f = t !== null ? t + "Capture" : null, p = i ? f : t, v = [], y = e, g = null; y !== null; ) {
        var b = y, w = b.stateNode, M = b.tag;
        if (M === ce && w !== null && (g = w, p !== null)) {
          var U = Tl(y, p);
          U != null && v.push(Jd(y, U, g));
        }
        if (u)
          break;
        y = y.return;
      }
      return v;
    }
    function vh(e, t) {
      for (var a = t + "Capture", i = [], u = e; u !== null; ) {
        var s = u, f = s.stateNode, p = s.tag;
        if (p === ce && f !== null) {
          var v = f, y = Tl(u, a);
          y != null && i.unshift(Jd(u, y, v));
          var g = Tl(u, t);
          g != null && i.push(Jd(u, g, v));
        }
        u = u.return;
      }
      return i;
    }
    function mf(e) {
      if (e === null)
        return null;
      do
        e = e.return;
      while (e && e.tag !== ce);
      return e || null;
    }
    function xT(e, t) {
      for (var a = e, i = t, u = 0, s = a; s; s = mf(s))
        u++;
      for (var f = 0, p = i; p; p = mf(p))
        f++;
      for (; u - f > 0; )
        a = mf(a), u--;
      for (; f - u > 0; )
        i = mf(i), f--;
      for (var v = u; v--; ) {
        if (a === i || i !== null && a === i.alternate)
          return a;
        a = mf(a), i = mf(i);
      }
      return null;
    }
    function kE(e, t, a, i, u) {
      for (var s = t._reactName, f = [], p = a; p !== null && p !== i; ) {
        var v = p, y = v.alternate, g = v.stateNode, b = v.tag;
        if (y !== null && y === i)
          break;
        if (b === ce && g !== null) {
          var w = g;
          if (u) {
            var M = Tl(p, s);
            M != null && f.unshift(Jd(p, M, w));
          } else if (!u) {
            var U = Tl(p, s);
            U != null && f.push(Jd(p, U, w));
          }
        }
        p = p.return;
      }
      f.length !== 0 && e.push({
        event: t,
        listeners: f
      });
    }
    function bT(e, t, a, i, u) {
      var s = i && u ? xT(i, u) : null;
      i !== null && kE(e, t, i, s, !1), u !== null && a !== null && kE(e, a, u, s, !0);
    }
    function _T(e, t) {
      return e + "__bubble";
    }
    var ja = !1, ep = "dangerouslySetInnerHTML", hh = "suppressContentEditableWarning", xo = "suppressHydrationWarning", OE = "autoFocus", Vs = "children", Ps = "style", mh = "__html", wy, yh, tp, LE, gh, ME, NE;
    wy = {
      // There are working polyfills for <dialog>. Let people use it.
      dialog: !0,
      // Electron ships a custom <webview> tag to display external web content in
      // an isolated frame and process.
      // This tag is not present in non Electron environments such as JSDom which
      // is often used for testing purposes.
      // @see https://electronjs.org/docs/api/webview-tag
      webview: !0
    }, yh = function(e, t) {
      id(e, t), fc(e, t), gv(e, t, {
        registrationNameDependencies: Xe,
        possibleRegistrationNames: Ze
      });
    }, ME = Dn && !document.documentMode, tp = function(e, t, a) {
      if (!ja) {
        var i = Sh(a), u = Sh(t);
        u !== i && (ja = !0, S("Prop `%s` did not match. Server: %s Client: %s", e, JSON.stringify(u), JSON.stringify(i)));
      }
    }, LE = function(e) {
      if (!ja) {
        ja = !0;
        var t = [];
        e.forEach(function(a) {
          t.push(a);
        }), S("Extra attributes from the server: %s", t);
      }
    }, gh = function(e, t) {
      t === !1 ? S("Expected `%s` listener to be a function, instead got `false`.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.", e, e, e) : S("Expected `%s` listener to be a function, instead got a value of `%s` type.", e, typeof t);
    }, NE = function(e, t) {
      var a = e.namespaceURI === Vi ? e.ownerDocument.createElement(e.tagName) : e.ownerDocument.createElementNS(e.namespaceURI, e.tagName);
      return a.innerHTML = t, a.innerHTML;
    };
    var DT = /\r\n?/g, kT = /\u0000|\uFFFD/g;
    function Sh(e) {
      qn(e);
      var t = typeof e == "string" ? e : "" + e;
      return t.replace(DT, `
`).replace(kT, "");
    }
    function Eh(e, t, a, i) {
      var u = Sh(t), s = Sh(e);
      if (s !== u && (i && (ja || (ja = !0, S('Text content did not match. Server: "%s" Client: "%s"', s, u))), a && ge))
        throw new Error("Text content does not match server-rendered HTML.");
    }
    function zE(e) {
      return e.nodeType === Bi ? e : e.ownerDocument;
    }
    function OT() {
    }
    function Ch(e) {
      e.onclick = OT;
    }
    function LT(e, t, a, i, u) {
      for (var s in i)
        if (i.hasOwnProperty(s)) {
          var f = i[s];
          if (s === Ps)
            f && Object.freeze(f), dv(t, f);
          else if (s === ep) {
            var p = f ? f[mh] : void 0;
            p != null && ev(t, p);
          } else if (s === Vs)
            if (typeof f == "string") {
              var v = e !== "textarea" || f !== "";
              v && to(t, f);
            } else typeof f == "number" && to(t, "" + f);
          else s === hh || s === xo || s === OE || (Xe.hasOwnProperty(s) ? f != null && (typeof f != "function" && gh(s, f), s === "onScroll" && gn("scroll", t)) : f != null && Dr(t, s, f, u));
        }
    }
    function MT(e, t, a, i) {
      for (var u = 0; u < t.length; u += 2) {
        var s = t[u], f = t[u + 1];
        s === Ps ? dv(e, f) : s === ep ? ev(e, f) : s === Vs ? to(e, f) : Dr(e, s, f, i);
      }
    }
    function NT(e, t, a, i) {
      var u, s = zE(a), f, p = i;
      if (p === Vi && (p = Zf(e)), p === Vi) {
        if (u = Cl(e, t), !u && e !== e.toLowerCase() && S("<%s /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.", e), e === "script") {
          var v = s.createElement("div");
          v.innerHTML = "<script><\/script>";
          var y = v.firstChild;
          f = v.removeChild(y);
        } else if (typeof t.is == "string")
          f = s.createElement(e, {
            is: t.is
          });
        else if (f = s.createElement(e), e === "select") {
          var g = f;
          t.multiple ? g.multiple = !0 : t.size && (g.size = t.size);
        }
      } else
        f = s.createElementNS(p, e);
      return p === Vi && !u && Object.prototype.toString.call(f) === "[object HTMLUnknownElement]" && !_r.call(wy, e) && (wy[e] = !0, S("The tag <%s> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.", e)), f;
    }
    function zT(e, t) {
      return zE(t).createTextNode(e);
    }
    function UT(e, t, a, i) {
      var u = Cl(t, a);
      yh(t, a);
      var s;
      switch (t) {
        case "dialog":
          gn("cancel", e), gn("close", e), s = a;
          break;
        case "iframe":
        case "object":
        case "embed":
          gn("load", e), s = a;
          break;
        case "video":
        case "audio":
          for (var f = 0; f < Kd.length; f++)
            gn(Kd[f], e);
          s = a;
          break;
        case "source":
          gn("error", e), s = a;
          break;
        case "img":
        case "image":
        case "link":
          gn("error", e), gn("load", e), s = a;
          break;
        case "details":
          gn("toggle", e), s = a;
          break;
        case "input":
          Za(e, a), s = eo(e, a), gn("invalid", e);
          break;
        case "option":
          St(e, a), s = a;
          break;
        case "select":
          au(e, a), s = Go(e, a), gn("invalid", e);
          break;
        case "textarea":
          qf(e, a), s = Gf(e, a), gn("invalid", e);
          break;
        default:
          s = a;
      }
      switch (sc(t, s), LT(t, e, i, s, u), t) {
        case "input":
          Ka(e), N(e, a, !1);
          break;
        case "textarea":
          Ka(e), Zp(e);
          break;
        case "option":
          Kt(e, a);
          break;
        case "select":
          Qf(e, a);
          break;
        default:
          typeof s.onClick == "function" && Ch(e);
          break;
      }
    }
    function AT(e, t, a, i, u) {
      yh(t, i);
      var s = null, f, p;
      switch (t) {
        case "input":
          f = eo(e, a), p = eo(e, i), s = [];
          break;
        case "select":
          f = Go(e, a), p = Go(e, i), s = [];
          break;
        case "textarea":
          f = Gf(e, a), p = Gf(e, i), s = [];
          break;
        default:
          f = a, p = i, typeof f.onClick != "function" && typeof p.onClick == "function" && Ch(e);
          break;
      }
      sc(t, p);
      var v, y, g = null;
      for (v in f)
        if (!(p.hasOwnProperty(v) || !f.hasOwnProperty(v) || f[v] == null))
          if (v === Ps) {
            var b = f[v];
            for (y in b)
              b.hasOwnProperty(y) && (g || (g = {}), g[y] = "");
          } else v === ep || v === Vs || v === hh || v === xo || v === OE || (Xe.hasOwnProperty(v) ? s || (s = []) : (s = s || []).push(v, null));
      for (v in p) {
        var w = p[v], M = f != null ? f[v] : void 0;
        if (!(!p.hasOwnProperty(v) || w === M || w == null && M == null))
          if (v === Ps)
            if (w && Object.freeze(w), M) {
              for (y in M)
                M.hasOwnProperty(y) && (!w || !w.hasOwnProperty(y)) && (g || (g = {}), g[y] = "");
              for (y in w)
                w.hasOwnProperty(y) && M[y] !== w[y] && (g || (g = {}), g[y] = w[y]);
            } else
              g || (s || (s = []), s.push(v, g)), g = w;
          else if (v === ep) {
            var U = w ? w[mh] : void 0, j = M ? M[mh] : void 0;
            U != null && j !== U && (s = s || []).push(v, U);
          } else v === Vs ? (typeof w == "string" || typeof w == "number") && (s = s || []).push(v, "" + w) : v === hh || v === xo || (Xe.hasOwnProperty(v) ? (w != null && (typeof w != "function" && gh(v, w), v === "onScroll" && gn("scroll", e)), !s && M !== w && (s = [])) : (s = s || []).push(v, w));
      }
      return g && (Km(g, p[Ps]), (s = s || []).push(Ps, g)), s;
    }
    function FT(e, t, a, i, u) {
      a === "input" && u.type === "radio" && u.name != null && h(e, u);
      var s = Cl(a, i), f = Cl(a, u);
      switch (MT(e, t, s, f), a) {
        case "input":
          C(e, u);
          break;
        case "textarea":
          Kp(e, u);
          break;
        case "select":
          lc(e, u);
          break;
      }
    }
    function jT(e) {
      {
        var t = e.toLowerCase();
        return Jo.hasOwnProperty(t) && Jo[t] || null;
      }
    }
    function HT(e, t, a, i, u, s, f) {
      var p, v;
      switch (p = Cl(t, a), yh(t, a), t) {
        case "dialog":
          gn("cancel", e), gn("close", e);
          break;
        case "iframe":
        case "object":
        case "embed":
          gn("load", e);
          break;
        case "video":
        case "audio":
          for (var y = 0; y < Kd.length; y++)
            gn(Kd[y], e);
          break;
        case "source":
          gn("error", e);
          break;
        case "img":
        case "image":
        case "link":
          gn("error", e), gn("load", e);
          break;
        case "details":
          gn("toggle", e);
          break;
        case "input":
          Za(e, a), gn("invalid", e);
          break;
        case "option":
          St(e, a);
          break;
        case "select":
          au(e, a), gn("invalid", e);
          break;
        case "textarea":
          qf(e, a), gn("invalid", e);
          break;
      }
      sc(t, a);
      {
        v = /* @__PURE__ */ new Set();
        for (var g = e.attributes, b = 0; b < g.length; b++) {
          var w = g[b].name.toLowerCase();
          switch (w) {
            case "value":
              break;
            case "checked":
              break;
            case "selected":
              break;
            default:
              v.add(g[b].name);
          }
        }
      }
      var M = null;
      for (var U in a)
        if (a.hasOwnProperty(U)) {
          var j = a[U];
          if (U === Vs)
            typeof j == "string" ? e.textContent !== j && (a[xo] !== !0 && Eh(e.textContent, j, s, f), M = [Vs, j]) : typeof j == "number" && e.textContent !== "" + j && (a[xo] !== !0 && Eh(e.textContent, j, s, f), M = [Vs, "" + j]);
          else if (Xe.hasOwnProperty(U))
            j != null && (typeof j != "function" && gh(U, j), U === "onScroll" && gn("scroll", e));
          else if (f && // Convince Flow we've calculated it (it's DEV-only in this method.)
          typeof p == "boolean") {
            var le = void 0, Me = on(U);
            if (a[xo] !== !0) {
              if (!(U === hh || U === xo || // Controlled attributes are not validated
              // TODO: Only ignore them on controlled tags.
              U === "value" || U === "checked" || U === "selected")) {
                if (U === ep) {
                  var Ce = e.innerHTML, yt = j ? j[mh] : void 0;
                  if (yt != null) {
                    var ft = NE(e, yt);
                    ft !== Ce && tp(U, Ce, ft);
                  }
                } else if (U === Ps) {
                  if (v.delete(U), ME) {
                    var k = qm(j);
                    le = e.getAttribute("style"), k !== le && tp(U, le, k);
                  }
                } else if (p && !_)
                  v.delete(U.toLowerCase()), le = dl(e, U, j), j !== le && tp(U, le, j);
                else if (!pn(U, Me, p) && !Xn(U, j, Me, p)) {
                  var H = !1;
                  if (Me !== null)
                    v.delete(Me.attributeName), le = fl(e, U, j, Me);
                  else {
                    var O = i;
                    if (O === Vi && (O = Zf(t)), O === Vi)
                      v.delete(U.toLowerCase());
                    else {
                      var G = jT(U);
                      G !== null && G !== U && (H = !0, v.delete(G)), v.delete(U);
                    }
                    le = dl(e, U, j);
                  }
                  var fe = _;
                  !fe && j !== le && !H && tp(U, le, j);
                }
              }
            }
          }
        }
      switch (f && // $FlowFixMe - Should be inferred as not undefined.
      v.size > 0 && a[xo] !== !0 && LE(v), t) {
        case "input":
          Ka(e), N(e, a, !0);
          break;
        case "textarea":
          Ka(e), Zp(e);
          break;
        case "select":
        case "option":
          break;
        default:
          typeof a.onClick == "function" && Ch(e);
          break;
      }
      return M;
    }
    function VT(e, t, a) {
      var i = e.nodeValue !== t;
      return i;
    }
    function xy(e, t) {
      {
        if (ja)
          return;
        ja = !0, S("Did not expect server HTML to contain a <%s> in <%s>.", t.nodeName.toLowerCase(), e.nodeName.toLowerCase());
      }
    }
    function by(e, t) {
      {
        if (ja)
          return;
        ja = !0, S('Did not expect server HTML to contain the text node "%s" in <%s>.', t.nodeValue, e.nodeName.toLowerCase());
      }
    }
    function _y(e, t, a) {
      {
        if (ja)
          return;
        ja = !0, S("Expected server HTML to contain a matching <%s> in <%s>.", t, e.nodeName.toLowerCase());
      }
    }
    function Dy(e, t) {
      {
        if (t === "" || ja)
          return;
        ja = !0, S('Expected server HTML to contain a matching text node for "%s" in <%s>.', t, e.nodeName.toLowerCase());
      }
    }
    function PT(e, t, a) {
      switch (t) {
        case "input":
          A(e, a);
          return;
        case "textarea":
          Im(e, a);
          return;
        case "select":
          Wf(e, a);
          return;
      }
    }
    var np = function() {
    }, rp = function() {
    };
    {
      var BT = ["address", "applet", "area", "article", "aside", "base", "basefont", "bgsound", "blockquote", "body", "br", "button", "caption", "center", "col", "colgroup", "dd", "details", "dir", "div", "dl", "dt", "embed", "fieldset", "figcaption", "figure", "footer", "form", "frame", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "iframe", "img", "input", "isindex", "li", "link", "listing", "main", "marquee", "menu", "menuitem", "meta", "nav", "noembed", "noframes", "noscript", "object", "ol", "p", "param", "plaintext", "pre", "script", "section", "select", "source", "style", "summary", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "title", "tr", "track", "ul", "wbr", "xmp"], UE = [
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
      ], $T = UE.concat(["button"]), YT = ["dd", "dt", "li", "option", "optgroup", "p", "rp", "rt"], AE = {
        current: null,
        formTag: null,
        aTagInScope: null,
        buttonTagInScope: null,
        nobrTagInScope: null,
        pTagInButtonScope: null,
        listItemTagAutoclosing: null,
        dlItemTagAutoclosing: null
      };
      rp = function(e, t) {
        var a = rt({}, e || AE), i = {
          tag: t
        };
        return UE.indexOf(t) !== -1 && (a.aTagInScope = null, a.buttonTagInScope = null, a.nobrTagInScope = null), $T.indexOf(t) !== -1 && (a.pTagInButtonScope = null), BT.indexOf(t) !== -1 && t !== "address" && t !== "div" && t !== "p" && (a.listItemTagAutoclosing = null, a.dlItemTagAutoclosing = null), a.current = i, t === "form" && (a.formTag = i), t === "a" && (a.aTagInScope = i), t === "button" && (a.buttonTagInScope = i), t === "nobr" && (a.nobrTagInScope = i), t === "p" && (a.pTagInButtonScope = i), t === "li" && (a.listItemTagAutoclosing = i), (t === "dd" || t === "dt") && (a.dlItemTagAutoclosing = i), a;
      };
      var IT = function(e, t) {
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
            return YT.indexOf(t) === -1;
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
      }, QT = function(e, t) {
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
      }, FE = {};
      np = function(e, t, a) {
        a = a || AE;
        var i = a.current, u = i && i.tag;
        t != null && (e != null && S("validateDOMNesting: when childText is passed, childTag should be null"), e = "#text");
        var s = IT(e, u) ? null : i, f = s ? null : QT(e, a), p = s || f;
        if (p) {
          var v = p.tag, y = !!s + "|" + e + "|" + v;
          if (!FE[y]) {
            FE[y] = !0;
            var g = e, b = "";
            if (e === "#text" ? /\S/.test(t) ? g = "Text nodes" : (g = "Whitespace text nodes", b = " Make sure you don't have any extra whitespace between tags on each line of your source code.") : g = "<" + e + ">", s) {
              var w = "";
              v === "table" && e === "tr" && (w += " Add a <tbody>, <thead> or <tfoot> to your code to match the DOM tree generated by the browser."), S("validateDOMNesting(...): %s cannot appear as a child of <%s>.%s%s", g, v, b, w);
            } else
              S("validateDOMNesting(...): %s cannot appear as a descendant of <%s>.", g, v);
          }
        }
      };
    }
    var Rh = "suppressHydrationWarning", Th = "$", wh = "/$", ap = "$?", ip = "$!", WT = "style", ky = null, Oy = null;
    function GT(e) {
      var t, a, i = e.nodeType;
      switch (i) {
        case Bi:
        case ed: {
          t = i === Bi ? "#document" : "#fragment";
          var u = e.documentElement;
          a = u ? u.namespaceURI : Jf(null, "");
          break;
        }
        default: {
          var s = i === Ln ? e.parentNode : e, f = s.namespaceURI || null;
          t = s.tagName, a = Jf(f, t);
          break;
        }
      }
      {
        var p = t.toLowerCase(), v = rp(null, p);
        return {
          namespace: a,
          ancestorInfo: v
        };
      }
    }
    function qT(e, t, a) {
      {
        var i = e, u = Jf(i.namespace, t), s = rp(i.ancestorInfo, t);
        return {
          namespace: u,
          ancestorInfo: s
        };
      }
    }
    function aD(e) {
      return e;
    }
    function XT(e) {
      ky = Fn(), Oy = cT();
      var t = null;
      return Wn(!1), t;
    }
    function KT(e) {
      fT(Oy), Wn(ky), ky = null, Oy = null;
    }
    function ZT(e, t, a, i, u) {
      var s;
      {
        var f = i;
        if (np(e, null, f.ancestorInfo), typeof t.children == "string" || typeof t.children == "number") {
          var p = "" + t.children, v = rp(f.ancestorInfo, e);
          np(null, p, v);
        }
        s = f.namespace;
      }
      var y = NT(e, t, a, s);
      return op(u, y), jy(y, t), y;
    }
    function JT(e, t) {
      e.appendChild(t);
    }
    function e1(e, t, a, i, u) {
      switch (UT(e, t, a, i), t) {
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
    function t1(e, t, a, i, u, s) {
      {
        var f = s;
        if (typeof i.children != typeof a.children && (typeof i.children == "string" || typeof i.children == "number")) {
          var p = "" + i.children, v = rp(f.ancestorInfo, t);
          np(null, p, v);
        }
      }
      return AT(e, t, a, i);
    }
    function Ly(e, t) {
      return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
    }
    function n1(e, t, a, i) {
      {
        var u = a;
        np(null, e, u.ancestorInfo);
      }
      var s = zT(e, t);
      return op(i, s), s;
    }
    function r1() {
      var e = window.event;
      return e === void 0 ? za : nf(e.type);
    }
    var My = typeof setTimeout == "function" ? setTimeout : void 0, a1 = typeof clearTimeout == "function" ? clearTimeout : void 0, Ny = -1, jE = typeof Promise == "function" ? Promise : void 0, i1 = typeof queueMicrotask == "function" ? queueMicrotask : typeof jE < "u" ? function(e) {
      return jE.resolve(null).then(e).catch(l1);
    } : My;
    function l1(e) {
      setTimeout(function() {
        throw e;
      });
    }
    function u1(e, t, a, i) {
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
    function o1(e, t, a, i, u, s) {
      FT(e, t, a, i, u), jy(e, u);
    }
    function HE(e) {
      to(e, "");
    }
    function s1(e, t, a) {
      e.nodeValue = a;
    }
    function c1(e, t) {
      e.appendChild(t);
    }
    function f1(e, t) {
      var a;
      e.nodeType === Ln ? (a = e.parentNode, a.insertBefore(t, e)) : (a = e, a.appendChild(t));
      var i = e._reactRootContainer;
      i == null && a.onclick === null && Ch(a);
    }
    function d1(e, t, a) {
      e.insertBefore(t, a);
    }
    function p1(e, t, a) {
      e.nodeType === Ln ? e.parentNode.insertBefore(t, a) : e.insertBefore(t, a);
    }
    function v1(e, t) {
      e.removeChild(t);
    }
    function h1(e, t) {
      e.nodeType === Ln ? e.parentNode.removeChild(t) : e.removeChild(t);
    }
    function zy(e, t) {
      var a = t, i = 0;
      do {
        var u = a.nextSibling;
        if (e.removeChild(a), u && u.nodeType === Ln) {
          var s = u.data;
          if (s === wh)
            if (i === 0) {
              e.removeChild(u), xu(t);
              return;
            } else
              i--;
          else (s === Th || s === ap || s === ip) && i++;
        }
        a = u;
      } while (a);
      xu(t);
    }
    function m1(e, t) {
      e.nodeType === Ln ? zy(e.parentNode, t) : e.nodeType === Gr && zy(e, t), xu(e);
    }
    function y1(e) {
      e = e;
      var t = e.style;
      typeof t.setProperty == "function" ? t.setProperty("display", "none", "important") : t.display = "none";
    }
    function g1(e) {
      e.nodeValue = "";
    }
    function S1(e, t) {
      e = e;
      var a = t[WT], i = a != null && a.hasOwnProperty("display") ? a.display : null;
      e.style.display = oc("display", i);
    }
    function E1(e, t) {
      e.nodeValue = t;
    }
    function C1(e) {
      e.nodeType === Gr ? e.textContent = "" : e.nodeType === Bi && e.documentElement && e.removeChild(e.documentElement);
    }
    function R1(e, t, a) {
      return e.nodeType !== Gr || t.toLowerCase() !== e.nodeName.toLowerCase() ? null : e;
    }
    function T1(e, t) {
      return t === "" || e.nodeType !== Pi ? null : e;
    }
    function w1(e) {
      return e.nodeType !== Ln ? null : e;
    }
    function VE(e) {
      return e.data === ap;
    }
    function Uy(e) {
      return e.data === ip;
    }
    function x1(e) {
      var t = e.nextSibling && e.nextSibling.dataset, a, i, u;
      return t && (a = t.dgst, i = t.msg, u = t.stck), {
        message: i,
        digest: a,
        stack: u
      };
    }
    function b1(e, t) {
      e._reactRetry = t;
    }
    function xh(e) {
      for (; e != null; e = e.nextSibling) {
        var t = e.nodeType;
        if (t === Gr || t === Pi)
          break;
        if (t === Ln) {
          var a = e.data;
          if (a === Th || a === ip || a === ap)
            break;
          if (a === wh)
            return null;
        }
      }
      return e;
    }
    function lp(e) {
      return xh(e.nextSibling);
    }
    function _1(e) {
      return xh(e.firstChild);
    }
    function D1(e) {
      return xh(e.firstChild);
    }
    function k1(e) {
      return xh(e.nextSibling);
    }
    function O1(e, t, a, i, u, s, f) {
      op(s, e), jy(e, a);
      var p;
      {
        var v = u;
        p = v.namespace;
      }
      var y = (s.mode & at) !== ke;
      return HT(e, t, a, p, i, y, f);
    }
    function L1(e, t, a, i) {
      return op(a, e), a.mode & at, VT(e, t);
    }
    function M1(e, t) {
      op(t, e);
    }
    function N1(e) {
      for (var t = e.nextSibling, a = 0; t; ) {
        if (t.nodeType === Ln) {
          var i = t.data;
          if (i === wh) {
            if (a === 0)
              return lp(t);
            a--;
          } else (i === Th || i === ip || i === ap) && a++;
        }
        t = t.nextSibling;
      }
      return null;
    }
    function PE(e) {
      for (var t = e.previousSibling, a = 0; t; ) {
        if (t.nodeType === Ln) {
          var i = t.data;
          if (i === Th || i === ip || i === ap) {
            if (a === 0)
              return t;
            a--;
          } else i === wh && a++;
        }
        t = t.previousSibling;
      }
      return null;
    }
    function z1(e) {
      xu(e);
    }
    function U1(e) {
      xu(e);
    }
    function A1(e) {
      return e !== "head" && e !== "body";
    }
    function F1(e, t, a, i) {
      var u = !0;
      Eh(t.nodeValue, a, i, u);
    }
    function j1(e, t, a, i, u, s) {
      if (t[Rh] !== !0) {
        var f = !0;
        Eh(i.nodeValue, u, s, f);
      }
    }
    function H1(e, t) {
      t.nodeType === Gr ? xy(e, t) : t.nodeType === Ln || by(e, t);
    }
    function V1(e, t) {
      {
        var a = e.parentNode;
        a !== null && (t.nodeType === Gr ? xy(a, t) : t.nodeType === Ln || by(a, t));
      }
    }
    function P1(e, t, a, i, u) {
      (u || t[Rh] !== !0) && (i.nodeType === Gr ? xy(a, i) : i.nodeType === Ln || by(a, i));
    }
    function B1(e, t, a) {
      _y(e, t);
    }
    function $1(e, t) {
      Dy(e, t);
    }
    function Y1(e, t, a) {
      {
        var i = e.parentNode;
        i !== null && _y(i, t);
      }
    }
    function I1(e, t) {
      {
        var a = e.parentNode;
        a !== null && Dy(a, t);
      }
    }
    function Q1(e, t, a, i, u, s) {
      (s || t[Rh] !== !0) && _y(a, i);
    }
    function W1(e, t, a, i, u) {
      (u || t[Rh] !== !0) && Dy(a, i);
    }
    function G1(e) {
      S("An error occurred during hydration. The server HTML was replaced with client content in <%s>.", e.nodeName.toLowerCase());
    }
    function q1(e) {
      Zd(e);
    }
    var yf = Math.random().toString(36).slice(2), gf = "__reactFiber$" + yf, Ay = "__reactProps$" + yf, up = "__reactContainer$" + yf, Fy = "__reactEvents$" + yf, X1 = "__reactListeners$" + yf, K1 = "__reactHandles$" + yf;
    function Z1(e) {
      delete e[gf], delete e[Ay], delete e[Fy], delete e[X1], delete e[K1];
    }
    function op(e, t) {
      t[gf] = e;
    }
    function bh(e, t) {
      t[up] = e;
    }
    function BE(e) {
      e[up] = null;
    }
    function sp(e) {
      return !!e[up];
    }
    function Bs(e) {
      var t = e[gf];
      if (t)
        return t;
      for (var a = e.parentNode; a; ) {
        if (t = a[up] || a[gf], t) {
          var i = t.alternate;
          if (t.child !== null || i !== null && i.child !== null)
            for (var u = PE(e); u !== null; ) {
              var s = u[gf];
              if (s)
                return s;
              u = PE(u);
            }
          return t;
        }
        e = a, a = e.parentNode;
      }
      return null;
    }
    function bo(e) {
      var t = e[gf] || e[up];
      return t && (t.tag === ce || t.tag === Qe || t.tag === xe || t.tag === ae) ? t : null;
    }
    function Sf(e) {
      if (e.tag === ce || e.tag === Qe)
        return e.stateNode;
      throw new Error("getNodeFromInstance: Invalid argument.");
    }
    function _h(e) {
      return e[Ay] || null;
    }
    function jy(e, t) {
      e[Ay] = t;
    }
    function J1(e) {
      var t = e[Fy];
      return t === void 0 && (t = e[Fy] = /* @__PURE__ */ new Set()), t;
    }
    var $E = {}, YE = F.ReactDebugCurrentFrame;
    function Dh(e) {
      if (e) {
        var t = e._owner, a = Fi(e.type, e._source, t ? t.type : null);
        YE.setExtraStackFrame(a);
      } else
        YE.setExtraStackFrame(null);
    }
    function Ji(e, t, a, i, u) {
      {
        var s = Function.call.bind(_r);
        for (var f in e)
          if (s(e, f)) {
            var p = void 0;
            try {
              if (typeof e[f] != "function") {
                var v = Error((i || "React class") + ": " + a + " type `" + f + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[f] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw v.name = "Invariant Violation", v;
              }
              p = e[f](t, f, i, a, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (y) {
              p = y;
            }
            p && !(p instanceof Error) && (Dh(u), S("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", i || "React class", a, f, typeof p), Dh(null)), p instanceof Error && !(p.message in $E) && ($E[p.message] = !0, Dh(u), S("Failed %s type: %s", a, p.message), Dh(null));
          }
      }
    }
    var Hy = [], kh;
    kh = [];
    var Lu = -1;
    function _o(e) {
      return {
        current: e
      };
    }
    function ia(e, t) {
      if (Lu < 0) {
        S("Unexpected pop.");
        return;
      }
      t !== kh[Lu] && S("Unexpected Fiber popped."), e.current = Hy[Lu], Hy[Lu] = null, kh[Lu] = null, Lu--;
    }
    function la(e, t, a) {
      Lu++, Hy[Lu] = e.current, kh[Lu] = a, e.current = t;
    }
    var Vy;
    Vy = {};
    var ii = {};
    Object.freeze(ii);
    var Mu = _o(ii), Pl = _o(!1), Py = ii;
    function Ef(e, t, a) {
      return a && Bl(t) ? Py : Mu.current;
    }
    function IE(e, t, a) {
      {
        var i = e.stateNode;
        i.__reactInternalMemoizedUnmaskedChildContext = t, i.__reactInternalMemoizedMaskedChildContext = a;
      }
    }
    function Cf(e, t) {
      {
        var a = e.type, i = a.contextTypes;
        if (!i)
          return ii;
        var u = e.stateNode;
        if (u && u.__reactInternalMemoizedUnmaskedChildContext === t)
          return u.__reactInternalMemoizedMaskedChildContext;
        var s = {};
        for (var f in i)
          s[f] = t[f];
        {
          var p = Ye(e) || "Unknown";
          Ji(i, s, "context", p);
        }
        return u && IE(e, t, s), s;
      }
    }
    function Oh() {
      return Pl.current;
    }
    function Bl(e) {
      {
        var t = e.childContextTypes;
        return t != null;
      }
    }
    function Lh(e) {
      ia(Pl, e), ia(Mu, e);
    }
    function By(e) {
      ia(Pl, e), ia(Mu, e);
    }
    function QE(e, t, a) {
      {
        if (Mu.current !== ii)
          throw new Error("Unexpected context found on stack. This error is likely caused by a bug in React. Please file an issue.");
        la(Mu, t, e), la(Pl, a, e);
      }
    }
    function WE(e, t, a) {
      {
        var i = e.stateNode, u = t.childContextTypes;
        if (typeof i.getChildContext != "function") {
          {
            var s = Ye(e) || "Unknown";
            Vy[s] || (Vy[s] = !0, S("%s.childContextTypes is specified but there is no getChildContext() method on the instance. You can either define getChildContext() on %s or remove childContextTypes from it.", s, s));
          }
          return a;
        }
        var f = i.getChildContext();
        for (var p in f)
          if (!(p in u))
            throw new Error((Ye(e) || "Unknown") + '.getChildContext(): key "' + p + '" is not defined in childContextTypes.');
        {
          var v = Ye(e) || "Unknown";
          Ji(u, f, "child context", v);
        }
        return rt({}, a, f);
      }
    }
    function Mh(e) {
      {
        var t = e.stateNode, a = t && t.__reactInternalMemoizedMergedChildContext || ii;
        return Py = Mu.current, la(Mu, a, e), la(Pl, Pl.current, e), !0;
      }
    }
    function GE(e, t, a) {
      {
        var i = e.stateNode;
        if (!i)
          throw new Error("Expected to have an instance by this point. This error is likely caused by a bug in React. Please file an issue.");
        if (a) {
          var u = WE(e, t, Py);
          i.__reactInternalMemoizedMergedChildContext = u, ia(Pl, e), ia(Mu, e), la(Mu, u, e), la(Pl, a, e);
        } else
          ia(Pl, e), la(Pl, a, e);
      }
    }
    function ew(e) {
      {
        if (!fu(e) || e.tag !== pe)
          throw new Error("Expected subtree parent to be a mounted class component. This error is likely caused by a bug in React. Please file an issue.");
        var t = e;
        do {
          switch (t.tag) {
            case ae:
              return t.stateNode.context;
            case pe: {
              var a = t.type;
              if (Bl(a))
                return t.stateNode.__reactInternalMemoizedMergedChildContext;
              break;
            }
          }
          t = t.return;
        } while (t !== null);
        throw new Error("Found unexpected detached subtree parent. This error is likely caused by a bug in React. Please file an issue.");
      }
    }
    var Do = 0, Nh = 1, Nu = null, $y = !1, Yy = !1;
    function qE(e) {
      Nu === null ? Nu = [e] : Nu.push(e);
    }
    function tw(e) {
      $y = !0, qE(e);
    }
    function XE() {
      $y && ko();
    }
    function ko() {
      if (!Yy && Nu !== null) {
        Yy = !0;
        var e = 0, t = Aa();
        try {
          var a = !0, i = Nu;
          for (An(Mr); e < i.length; e++) {
            var u = i[e];
            do
              u = u(a);
            while (u !== null);
          }
          Nu = null, $y = !1;
        } catch (s) {
          throw Nu !== null && (Nu = Nu.slice(e + 1)), dd(us, ko), s;
        } finally {
          An(t), Yy = !1;
        }
      }
      return null;
    }
    var Rf = [], Tf = 0, zh = null, Uh = 0, ki = [], Oi = 0, $s = null, zu = 1, Uu = "";
    function nw(e) {
      return Is(), (e.flags & Si) !== De;
    }
    function rw(e) {
      return Is(), Uh;
    }
    function aw() {
      var e = Uu, t = zu, a = t & ~iw(t);
      return a.toString(32) + e;
    }
    function Ys(e, t) {
      Is(), Rf[Tf++] = Uh, Rf[Tf++] = zh, zh = e, Uh = t;
    }
    function KE(e, t, a) {
      Is(), ki[Oi++] = zu, ki[Oi++] = Uu, ki[Oi++] = $s, $s = e;
      var i = zu, u = Uu, s = Ah(i) - 1, f = i & ~(1 << s), p = a + 1, v = Ah(t) + s;
      if (v > 30) {
        var y = s - s % 5, g = (1 << y) - 1, b = (f & g).toString(32), w = f >> y, M = s - y, U = Ah(t) + M, j = p << M, le = j | w, Me = b + u;
        zu = 1 << U | le, Uu = Me;
      } else {
        var Ce = p << s, yt = Ce | f, ft = u;
        zu = 1 << v | yt, Uu = ft;
      }
    }
    function Iy(e) {
      Is();
      var t = e.return;
      if (t !== null) {
        var a = 1, i = 0;
        Ys(e, a), KE(e, a, i);
      }
    }
    function Ah(e) {
      return 32 - zn(e);
    }
    function iw(e) {
      return 1 << Ah(e) - 1;
    }
    function Qy(e) {
      for (; e === zh; )
        zh = Rf[--Tf], Rf[Tf] = null, Uh = Rf[--Tf], Rf[Tf] = null;
      for (; e === $s; )
        $s = ki[--Oi], ki[Oi] = null, Uu = ki[--Oi], ki[Oi] = null, zu = ki[--Oi], ki[Oi] = null;
    }
    function lw() {
      return Is(), $s !== null ? {
        id: zu,
        overflow: Uu
      } : null;
    }
    function uw(e, t) {
      Is(), ki[Oi++] = zu, ki[Oi++] = Uu, ki[Oi++] = $s, zu = t.id, Uu = t.overflow, $s = e;
    }
    function Is() {
      Fr() || S("Expected to be hydrating. This is a bug in React. Please file an issue.");
    }
    var Ar = null, Li = null, el = !1, Qs = !1, Oo = null;
    function ow() {
      el && S("We should not be hydrating here. This is a bug in React. Please file a bug.");
    }
    function ZE() {
      Qs = !0;
    }
    function sw() {
      return Qs;
    }
    function cw(e) {
      var t = e.stateNode.containerInfo;
      return Li = D1(t), Ar = e, el = !0, Oo = null, Qs = !1, !0;
    }
    function fw(e, t, a) {
      return Li = k1(t), Ar = e, el = !0, Oo = null, Qs = !1, a !== null && uw(e, a), !0;
    }
    function JE(e, t) {
      switch (e.tag) {
        case ae: {
          H1(e.stateNode.containerInfo, t);
          break;
        }
        case ce: {
          var a = (e.mode & at) !== ke;
          P1(
            e.type,
            e.memoizedProps,
            e.stateNode,
            t,
            // TODO: Delete this argument when we remove the legacy root API.
            a
          );
          break;
        }
        case xe: {
          var i = e.memoizedState;
          i.dehydrated !== null && V1(i.dehydrated, t);
          break;
        }
      }
    }
    function eC(e, t) {
      JE(e, t);
      var a = h_();
      a.stateNode = t, a.return = e;
      var i = e.deletions;
      i === null ? (e.deletions = [a], e.flags |= ka) : i.push(a);
    }
    function Wy(e, t) {
      {
        if (Qs)
          return;
        switch (e.tag) {
          case ae: {
            var a = e.stateNode.containerInfo;
            switch (t.tag) {
              case ce:
                var i = t.type;
                t.pendingProps, B1(a, i);
                break;
              case Qe:
                var u = t.pendingProps;
                $1(a, u);
                break;
            }
            break;
          }
          case ce: {
            var s = e.type, f = e.memoizedProps, p = e.stateNode;
            switch (t.tag) {
              case ce: {
                var v = t.type, y = t.pendingProps, g = (e.mode & at) !== ke;
                Q1(
                  s,
                  f,
                  p,
                  v,
                  y,
                  // TODO: Delete this argument when we remove the legacy root API.
                  g
                );
                break;
              }
              case Qe: {
                var b = t.pendingProps, w = (e.mode & at) !== ke;
                W1(
                  s,
                  f,
                  p,
                  b,
                  // TODO: Delete this argument when we remove the legacy root API.
                  w
                );
                break;
              }
            }
            break;
          }
          case xe: {
            var M = e.memoizedState, U = M.dehydrated;
            if (U !== null) switch (t.tag) {
              case ce:
                var j = t.type;
                t.pendingProps, Y1(U, j);
                break;
              case Qe:
                var le = t.pendingProps;
                I1(U, le);
                break;
            }
            break;
          }
          default:
            return;
        }
      }
    }
    function tC(e, t) {
      t.flags = t.flags & ~Xr | hn, Wy(e, t);
    }
    function nC(e, t) {
      switch (e.tag) {
        case ce: {
          var a = e.type;
          e.pendingProps;
          var i = R1(t, a);
          return i !== null ? (e.stateNode = i, Ar = e, Li = _1(i), !0) : !1;
        }
        case Qe: {
          var u = e.pendingProps, s = T1(t, u);
          return s !== null ? (e.stateNode = s, Ar = e, Li = null, !0) : !1;
        }
        case xe: {
          var f = w1(t);
          if (f !== null) {
            var p = {
              dehydrated: f,
              treeContext: lw(),
              retryLane: ea
            };
            e.memoizedState = p;
            var v = m_(f);
            return v.return = e, e.child = v, Ar = e, Li = null, !0;
          }
          return !1;
        }
        default:
          return !1;
      }
    }
    function Gy(e) {
      return (e.mode & at) !== ke && (e.flags & Re) === De;
    }
    function qy(e) {
      throw new Error("Hydration failed because the initial UI does not match what was rendered on the server.");
    }
    function Xy(e) {
      if (el) {
        var t = Li;
        if (!t) {
          Gy(e) && (Wy(Ar, e), qy()), tC(Ar, e), el = !1, Ar = e;
          return;
        }
        var a = t;
        if (!nC(e, t)) {
          Gy(e) && (Wy(Ar, e), qy()), t = lp(a);
          var i = Ar;
          if (!t || !nC(e, t)) {
            tC(Ar, e), el = !1, Ar = e;
            return;
          }
          eC(i, a);
        }
      }
    }
    function dw(e, t, a) {
      var i = e.stateNode, u = !Qs, s = O1(i, e.type, e.memoizedProps, t, a, e, u);
      return e.updateQueue = s, s !== null;
    }
    function pw(e) {
      var t = e.stateNode, a = e.memoizedProps, i = L1(t, a, e);
      if (i) {
        var u = Ar;
        if (u !== null)
          switch (u.tag) {
            case ae: {
              var s = u.stateNode.containerInfo, f = (u.mode & at) !== ke;
              F1(
                s,
                t,
                a,
                // TODO: Delete this argument when we remove the legacy root API.
                f
              );
              break;
            }
            case ce: {
              var p = u.type, v = u.memoizedProps, y = u.stateNode, g = (u.mode & at) !== ke;
              j1(
                p,
                v,
                y,
                t,
                a,
                // TODO: Delete this argument when we remove the legacy root API.
                g
              );
              break;
            }
          }
      }
      return i;
    }
    function vw(e) {
      var t = e.memoizedState, a = t !== null ? t.dehydrated : null;
      if (!a)
        throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
      M1(a, e);
    }
    function hw(e) {
      var t = e.memoizedState, a = t !== null ? t.dehydrated : null;
      if (!a)
        throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
      return N1(a);
    }
    function rC(e) {
      for (var t = e.return; t !== null && t.tag !== ce && t.tag !== ae && t.tag !== xe; )
        t = t.return;
      Ar = t;
    }
    function Fh(e) {
      if (e !== Ar)
        return !1;
      if (!el)
        return rC(e), el = !0, !1;
      if (e.tag !== ae && (e.tag !== ce || A1(e.type) && !Ly(e.type, e.memoizedProps))) {
        var t = Li;
        if (t)
          if (Gy(e))
            aC(e), qy();
          else
            for (; t; )
              eC(e, t), t = lp(t);
      }
      return rC(e), e.tag === xe ? Li = hw(e) : Li = Ar ? lp(e.stateNode) : null, !0;
    }
    function mw() {
      return el && Li !== null;
    }
    function aC(e) {
      for (var t = Li; t; )
        JE(e, t), t = lp(t);
    }
    function wf() {
      Ar = null, Li = null, el = !1, Qs = !1;
    }
    function iC() {
      Oo !== null && (Z0(Oo), Oo = null);
    }
    function Fr() {
      return el;
    }
    function Ky(e) {
      Oo === null ? Oo = [e] : Oo.push(e);
    }
    var yw = F.ReactCurrentBatchConfig, gw = null;
    function Sw() {
      return yw.transition;
    }
    var tl = {
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
      var Ew = function(e) {
        for (var t = null, a = e; a !== null; )
          a.mode & Yt && (t = a), a = a.return;
        return t;
      }, Ws = function(e) {
        var t = [];
        return e.forEach(function(a) {
          t.push(a);
        }), t.sort().join(", ");
      }, cp = [], fp = [], dp = [], pp = [], vp = [], hp = [], Gs = /* @__PURE__ */ new Set();
      tl.recordUnsafeLifecycleWarnings = function(e, t) {
        Gs.has(e.type) || (typeof t.componentWillMount == "function" && // Don't warn about react-lifecycles-compat polyfilled components.
        t.componentWillMount.__suppressDeprecationWarning !== !0 && cp.push(e), e.mode & Yt && typeof t.UNSAFE_componentWillMount == "function" && fp.push(e), typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps.__suppressDeprecationWarning !== !0 && dp.push(e), e.mode & Yt && typeof t.UNSAFE_componentWillReceiveProps == "function" && pp.push(e), typeof t.componentWillUpdate == "function" && t.componentWillUpdate.__suppressDeprecationWarning !== !0 && vp.push(e), e.mode & Yt && typeof t.UNSAFE_componentWillUpdate == "function" && hp.push(e));
      }, tl.flushPendingUnsafeLifecycleWarnings = function() {
        var e = /* @__PURE__ */ new Set();
        cp.length > 0 && (cp.forEach(function(w) {
          e.add(Ye(w) || "Component"), Gs.add(w.type);
        }), cp = []);
        var t = /* @__PURE__ */ new Set();
        fp.length > 0 && (fp.forEach(function(w) {
          t.add(Ye(w) || "Component"), Gs.add(w.type);
        }), fp = []);
        var a = /* @__PURE__ */ new Set();
        dp.length > 0 && (dp.forEach(function(w) {
          a.add(Ye(w) || "Component"), Gs.add(w.type);
        }), dp = []);
        var i = /* @__PURE__ */ new Set();
        pp.length > 0 && (pp.forEach(function(w) {
          i.add(Ye(w) || "Component"), Gs.add(w.type);
        }), pp = []);
        var u = /* @__PURE__ */ new Set();
        vp.length > 0 && (vp.forEach(function(w) {
          u.add(Ye(w) || "Component"), Gs.add(w.type);
        }), vp = []);
        var s = /* @__PURE__ */ new Set();
        if (hp.length > 0 && (hp.forEach(function(w) {
          s.add(Ye(w) || "Component"), Gs.add(w.type);
        }), hp = []), t.size > 0) {
          var f = Ws(t);
          S(`Using UNSAFE_componentWillMount in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.

Please update the following components: %s`, f);
        }
        if (i.size > 0) {
          var p = Ws(i);
          S(`Using UNSAFE_componentWillReceiveProps in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state

Please update the following components: %s`, p);
        }
        if (s.size > 0) {
          var v = Ws(s);
          S(`Using UNSAFE_componentWillUpdate in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.

Please update the following components: %s`, v);
        }
        if (e.size > 0) {
          var y = Ws(e);
          zt(`componentWillMount has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.
* Rename componentWillMount to UNSAFE_componentWillMount to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, y);
        }
        if (a.size > 0) {
          var g = Ws(a);
          zt(`componentWillReceiveProps has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state
* Rename componentWillReceiveProps to UNSAFE_componentWillReceiveProps to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, g);
        }
        if (u.size > 0) {
          var b = Ws(u);
          zt(`componentWillUpdate has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* Rename componentWillUpdate to UNSAFE_componentWillUpdate to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, b);
        }
      };
      var jh = /* @__PURE__ */ new Map(), lC = /* @__PURE__ */ new Set();
      tl.recordLegacyContextWarning = function(e, t) {
        var a = Ew(e);
        if (a === null) {
          S("Expected to find a StrictMode component in a strict mode tree. This error is likely caused by a bug in React. Please file an issue.");
          return;
        }
        if (!lC.has(e.type)) {
          var i = jh.get(a);
          (e.type.contextTypes != null || e.type.childContextTypes != null || t !== null && typeof t.getChildContext == "function") && (i === void 0 && (i = [], jh.set(a, i)), i.push(e));
        }
      }, tl.flushLegacyContextWarning = function() {
        jh.forEach(function(e, t) {
          if (e.length !== 0) {
            var a = e[0], i = /* @__PURE__ */ new Set();
            e.forEach(function(s) {
              i.add(Ye(s) || "Component"), lC.add(s.type);
            });
            var u = Ws(i);
            try {
              Pt(a), S(`Legacy context API has been detected within a strict-mode tree.

The old API will be supported in all 16.x releases, but applications using it should migrate to the new version.

Please update the following components: %s

Learn more about this warning here: https://reactjs.org/link/legacy-context`, u);
            } finally {
              an();
            }
          }
        });
      }, tl.discardPendingWarnings = function() {
        cp = [], fp = [], dp = [], pp = [], vp = [], hp = [], jh = /* @__PURE__ */ new Map();
      };
    }
    var Zy, Jy, eg, tg, ng, uC = function(e, t) {
    };
    Zy = !1, Jy = !1, eg = {}, tg = {}, ng = {}, uC = function(e, t) {
      if (!(e === null || typeof e != "object") && !(!e._store || e._store.validated || e.key != null)) {
        if (typeof e._store != "object")
          throw new Error("React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue.");
        e._store.validated = !0;
        var a = Ye(t) || "Component";
        tg[a] || (tg[a] = !0, S('Each child in a list should have a unique "key" prop. See https://reactjs.org/link/warning-keys for more information.'));
      }
    };
    function Cw(e) {
      return e.prototype && e.prototype.isReactComponent;
    }
    function mp(e, t, a) {
      var i = a.ref;
      if (i !== null && typeof i != "function" && typeof i != "object") {
        if ((e.mode & Yt || V) && // We warn in ReactElement.js if owner and self are equal for string refs
        // because these cannot be automatically converted to an arrow function
        // using a codemod. Therefore, we don't have to warn about string refs again.
        !(a._owner && a._self && a._owner.stateNode !== a._self) && // Will already throw with "Function components cannot have string refs"
        !(a._owner && a._owner.tag !== pe) && // Will already warn with "Function components cannot be given refs"
        !(typeof a.type == "function" && !Cw(a.type)) && // Will already throw with "Element ref was specified as a string (someStringRef) but no owner was set"
        a._owner) {
          var u = Ye(e) || "Component";
          eg[u] || (S('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. We recommend using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', u, i), eg[u] = !0);
        }
        if (a._owner) {
          var s = a._owner, f;
          if (s) {
            var p = s;
            if (p.tag !== pe)
              throw new Error("Function components cannot have string refs. We recommend using useRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref");
            f = p.stateNode;
          }
          if (!f)
            throw new Error("Missing owner for string ref " + i + ". This error is likely caused by a bug in React. Please file an issue.");
          var v = f;
          oi(i, "ref");
          var y = "" + i;
          if (t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === y)
            return t.ref;
          var g = function(b) {
            var w = v.refs;
            b === null ? delete w[y] : w[y] = b;
          };
          return g._stringRef = y, g;
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
    function Hh(e, t) {
      var a = Object.prototype.toString.call(t);
      throw new Error("Objects are not valid as a React child (found: " + (a === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : a) + "). If you meant to render a collection of children, use an array instead.");
    }
    function Vh(e) {
      {
        var t = Ye(e) || "Component";
        if (ng[t])
          return;
        ng[t] = !0, S("Functions are not valid as a React child. This may happen if you return a Component instead of <Component /> from render. Or maybe you meant to call this function rather than return it.");
      }
    }
    function oC(e) {
      var t = e._payload, a = e._init;
      return a(t);
    }
    function sC(e) {
      function t(k, H) {
        if (e) {
          var O = k.deletions;
          O === null ? (k.deletions = [H], k.flags |= ka) : O.push(H);
        }
      }
      function a(k, H) {
        if (!e)
          return null;
        for (var O = H; O !== null; )
          t(k, O), O = O.sibling;
        return null;
      }
      function i(k, H) {
        for (var O = /* @__PURE__ */ new Map(), G = H; G !== null; )
          G.key !== null ? O.set(G.key, G) : O.set(G.index, G), G = G.sibling;
        return O;
      }
      function u(k, H) {
        var O = rc(k, H);
        return O.index = 0, O.sibling = null, O;
      }
      function s(k, H, O) {
        if (k.index = O, !e)
          return k.flags |= Si, H;
        var G = k.alternate;
        if (G !== null) {
          var fe = G.index;
          return fe < H ? (k.flags |= hn, H) : fe;
        } else
          return k.flags |= hn, H;
      }
      function f(k) {
        return e && k.alternate === null && (k.flags |= hn), k;
      }
      function p(k, H, O, G) {
        if (H === null || H.tag !== Qe) {
          var fe = KS(O, k.mode, G);
          return fe.return = k, fe;
        } else {
          var ue = u(H, O);
          return ue.return = k, ue;
        }
      }
      function v(k, H, O, G) {
        var fe = O.type;
        if (fe === fi)
          return g(k, H, O.props.children, G, O.key);
        if (H !== null && (H.elementType === fe || // Keep this check inline so it only runs on the false path:
        vR(H, O) || // Lazy types should reconcile their resolved type.
        // We need to do this after the Hot Reloading check above,
        // because hot reloading has different semantics than prod because
        // it doesn't resuspend. So we can't let the call below suspend.
        typeof fe == "object" && fe !== null && fe.$$typeof === Oe && oC(fe) === H.type)) {
          var ue = u(H, O.props);
          return ue.ref = mp(k, H, O), ue.return = k, ue._debugSource = O._source, ue._debugOwner = O._owner, ue;
        }
        var Ve = XS(O, k.mode, G);
        return Ve.ref = mp(k, H, O), Ve.return = k, Ve;
      }
      function y(k, H, O, G) {
        if (H === null || H.tag !== we || H.stateNode.containerInfo !== O.containerInfo || H.stateNode.implementation !== O.implementation) {
          var fe = ZS(O, k.mode, G);
          return fe.return = k, fe;
        } else {
          var ue = u(H, O.children || []);
          return ue.return = k, ue;
        }
      }
      function g(k, H, O, G, fe) {
        if (H === null || H.tag !== pt) {
          var ue = Po(O, k.mode, G, fe);
          return ue.return = k, ue;
        } else {
          var Ve = u(H, O);
          return Ve.return = k, Ve;
        }
      }
      function b(k, H, O) {
        if (typeof H == "string" && H !== "" || typeof H == "number") {
          var G = KS("" + H, k.mode, O);
          return G.return = k, G;
        }
        if (typeof H == "object" && H !== null) {
          switch (H.$$typeof) {
            case Qr: {
              var fe = XS(H, k.mode, O);
              return fe.ref = mp(k, null, H), fe.return = k, fe;
            }
            case rr: {
              var ue = ZS(H, k.mode, O);
              return ue.return = k, ue;
            }
            case Oe: {
              var Ve = H._payload, Ge = H._init;
              return b(k, Ge(Ve), O);
            }
          }
          if (et(H) || Mt(H)) {
            var Qt = Po(H, k.mode, O, null);
            return Qt.return = k, Qt;
          }
          Hh(k, H);
        }
        return typeof H == "function" && Vh(k), null;
      }
      function w(k, H, O, G) {
        var fe = H !== null ? H.key : null;
        if (typeof O == "string" && O !== "" || typeof O == "number")
          return fe !== null ? null : p(k, H, "" + O, G);
        if (typeof O == "object" && O !== null) {
          switch (O.$$typeof) {
            case Qr:
              return O.key === fe ? v(k, H, O, G) : null;
            case rr:
              return O.key === fe ? y(k, H, O, G) : null;
            case Oe: {
              var ue = O._payload, Ve = O._init;
              return w(k, H, Ve(ue), G);
            }
          }
          if (et(O) || Mt(O))
            return fe !== null ? null : g(k, H, O, G, null);
          Hh(k, O);
        }
        return typeof O == "function" && Vh(k), null;
      }
      function M(k, H, O, G, fe) {
        if (typeof G == "string" && G !== "" || typeof G == "number") {
          var ue = k.get(O) || null;
          return p(H, ue, "" + G, fe);
        }
        if (typeof G == "object" && G !== null) {
          switch (G.$$typeof) {
            case Qr: {
              var Ve = k.get(G.key === null ? O : G.key) || null;
              return v(H, Ve, G, fe);
            }
            case rr: {
              var Ge = k.get(G.key === null ? O : G.key) || null;
              return y(H, Ge, G, fe);
            }
            case Oe:
              var Qt = G._payload, Dt = G._init;
              return M(k, H, O, Dt(Qt), fe);
          }
          if (et(G) || Mt(G)) {
            var Gn = k.get(O) || null;
            return g(H, Gn, G, fe, null);
          }
          Hh(H, G);
        }
        return typeof G == "function" && Vh(H), null;
      }
      function U(k, H, O) {
        {
          if (typeof k != "object" || k === null)
            return H;
          switch (k.$$typeof) {
            case Qr:
            case rr:
              uC(k, O);
              var G = k.key;
              if (typeof G != "string")
                break;
              if (H === null) {
                H = /* @__PURE__ */ new Set(), H.add(G);
                break;
              }
              if (!H.has(G)) {
                H.add(G);
                break;
              }
              S("Encountered two children with the same key, `%s`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.", G);
              break;
            case Oe:
              var fe = k._payload, ue = k._init;
              U(ue(fe), H, O);
              break;
          }
        }
        return H;
      }
      function j(k, H, O, G) {
        for (var fe = null, ue = 0; ue < O.length; ue++) {
          var Ve = O[ue];
          fe = U(Ve, fe, k);
        }
        for (var Ge = null, Qt = null, Dt = H, Gn = 0, kt = 0, Hn = null; Dt !== null && kt < O.length; kt++) {
          Dt.index > kt ? (Hn = Dt, Dt = null) : Hn = Dt.sibling;
          var oa = w(k, Dt, O[kt], G);
          if (oa === null) {
            Dt === null && (Dt = Hn);
            break;
          }
          e && Dt && oa.alternate === null && t(k, Dt), Gn = s(oa, Gn, kt), Qt === null ? Ge = oa : Qt.sibling = oa, Qt = oa, Dt = Hn;
        }
        if (kt === O.length) {
          if (a(k, Dt), Fr()) {
            var Yr = kt;
            Ys(k, Yr);
          }
          return Ge;
        }
        if (Dt === null) {
          for (; kt < O.length; kt++) {
            var ui = b(k, O[kt], G);
            ui !== null && (Gn = s(ui, Gn, kt), Qt === null ? Ge = ui : Qt.sibling = ui, Qt = ui);
          }
          if (Fr()) {
            var Ra = kt;
            Ys(k, Ra);
          }
          return Ge;
        }
        for (var Ta = i(k, Dt); kt < O.length; kt++) {
          var sa = M(Ta, k, kt, O[kt], G);
          sa !== null && (e && sa.alternate !== null && Ta.delete(sa.key === null ? kt : sa.key), Gn = s(sa, Gn, kt), Qt === null ? Ge = sa : Qt.sibling = sa, Qt = sa);
        }
        if (e && Ta.forEach(function($f) {
          return t(k, $f);
        }), Fr()) {
          var Bu = kt;
          Ys(k, Bu);
        }
        return Ge;
      }
      function le(k, H, O, G) {
        var fe = Mt(O);
        if (typeof fe != "function")
          throw new Error("An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.");
        {
          typeof Symbol == "function" && // $FlowFixMe Flow doesn't know about toStringTag
          O[Symbol.toStringTag] === "Generator" && (Jy || S("Using Generators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. Keep in mind you might need to polyfill these features for older browsers."), Jy = !0), O.entries === fe && (Zy || S("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), Zy = !0);
          var ue = fe.call(O);
          if (ue)
            for (var Ve = null, Ge = ue.next(); !Ge.done; Ge = ue.next()) {
              var Qt = Ge.value;
              Ve = U(Qt, Ve, k);
            }
        }
        var Dt = fe.call(O);
        if (Dt == null)
          throw new Error("An iterable object provided no iterator.");
        for (var Gn = null, kt = null, Hn = H, oa = 0, Yr = 0, ui = null, Ra = Dt.next(); Hn !== null && !Ra.done; Yr++, Ra = Dt.next()) {
          Hn.index > Yr ? (ui = Hn, Hn = null) : ui = Hn.sibling;
          var Ta = w(k, Hn, Ra.value, G);
          if (Ta === null) {
            Hn === null && (Hn = ui);
            break;
          }
          e && Hn && Ta.alternate === null && t(k, Hn), oa = s(Ta, oa, Yr), kt === null ? Gn = Ta : kt.sibling = Ta, kt = Ta, Hn = ui;
        }
        if (Ra.done) {
          if (a(k, Hn), Fr()) {
            var sa = Yr;
            Ys(k, sa);
          }
          return Gn;
        }
        if (Hn === null) {
          for (; !Ra.done; Yr++, Ra = Dt.next()) {
            var Bu = b(k, Ra.value, G);
            Bu !== null && (oa = s(Bu, oa, Yr), kt === null ? Gn = Bu : kt.sibling = Bu, kt = Bu);
          }
          if (Fr()) {
            var $f = Yr;
            Ys(k, $f);
          }
          return Gn;
        }
        for (var Gp = i(k, Hn); !Ra.done; Yr++, Ra = Dt.next()) {
          var Xl = M(Gp, k, Yr, Ra.value, G);
          Xl !== null && (e && Xl.alternate !== null && Gp.delete(Xl.key === null ? Yr : Xl.key), oa = s(Xl, oa, Yr), kt === null ? Gn = Xl : kt.sibling = Xl, kt = Xl);
        }
        if (e && Gp.forEach(function(W_) {
          return t(k, W_);
        }), Fr()) {
          var Q_ = Yr;
          Ys(k, Q_);
        }
        return Gn;
      }
      function Me(k, H, O, G) {
        if (H !== null && H.tag === Qe) {
          a(k, H.sibling);
          var fe = u(H, O);
          return fe.return = k, fe;
        }
        a(k, H);
        var ue = KS(O, k.mode, G);
        return ue.return = k, ue;
      }
      function Ce(k, H, O, G) {
        for (var fe = O.key, ue = H; ue !== null; ) {
          if (ue.key === fe) {
            var Ve = O.type;
            if (Ve === fi) {
              if (ue.tag === pt) {
                a(k, ue.sibling);
                var Ge = u(ue, O.props.children);
                return Ge.return = k, Ge._debugSource = O._source, Ge._debugOwner = O._owner, Ge;
              }
            } else if (ue.elementType === Ve || // Keep this check inline so it only runs on the false path:
            vR(ue, O) || // Lazy types should reconcile their resolved type.
            // We need to do this after the Hot Reloading check above,
            // because hot reloading has different semantics than prod because
            // it doesn't resuspend. So we can't let the call below suspend.
            typeof Ve == "object" && Ve !== null && Ve.$$typeof === Oe && oC(Ve) === ue.type) {
              a(k, ue.sibling);
              var Qt = u(ue, O.props);
              return Qt.ref = mp(k, ue, O), Qt.return = k, Qt._debugSource = O._source, Qt._debugOwner = O._owner, Qt;
            }
            a(k, ue);
            break;
          } else
            t(k, ue);
          ue = ue.sibling;
        }
        if (O.type === fi) {
          var Dt = Po(O.props.children, k.mode, G, O.key);
          return Dt.return = k, Dt;
        } else {
          var Gn = XS(O, k.mode, G);
          return Gn.ref = mp(k, H, O), Gn.return = k, Gn;
        }
      }
      function yt(k, H, O, G) {
        for (var fe = O.key, ue = H; ue !== null; ) {
          if (ue.key === fe)
            if (ue.tag === we && ue.stateNode.containerInfo === O.containerInfo && ue.stateNode.implementation === O.implementation) {
              a(k, ue.sibling);
              var Ve = u(ue, O.children || []);
              return Ve.return = k, Ve;
            } else {
              a(k, ue);
              break;
            }
          else
            t(k, ue);
          ue = ue.sibling;
        }
        var Ge = ZS(O, k.mode, G);
        return Ge.return = k, Ge;
      }
      function ft(k, H, O, G) {
        var fe = typeof O == "object" && O !== null && O.type === fi && O.key === null;
        if (fe && (O = O.props.children), typeof O == "object" && O !== null) {
          switch (O.$$typeof) {
            case Qr:
              return f(Ce(k, H, O, G));
            case rr:
              return f(yt(k, H, O, G));
            case Oe:
              var ue = O._payload, Ve = O._init;
              return ft(k, H, Ve(ue), G);
          }
          if (et(O))
            return j(k, H, O, G);
          if (Mt(O))
            return le(k, H, O, G);
          Hh(k, O);
        }
        return typeof O == "string" && O !== "" || typeof O == "number" ? f(Me(k, H, "" + O, G)) : (typeof O == "function" && Vh(k), a(k, H));
      }
      return ft;
    }
    var xf = sC(!0), cC = sC(!1);
    function Rw(e, t) {
      if (e !== null && t.child !== e.child)
        throw new Error("Resuming work not yet implemented.");
      if (t.child !== null) {
        var a = t.child, i = rc(a, a.pendingProps);
        for (t.child = i, i.return = t; a.sibling !== null; )
          a = a.sibling, i = i.sibling = rc(a, a.pendingProps), i.return = t;
        i.sibling = null;
      }
    }
    function Tw(e, t) {
      for (var a = e.child; a !== null; )
        c_(a, t), a = a.sibling;
    }
    var rg = _o(null), ag;
    ag = {};
    var Ph = null, bf = null, ig = null, Bh = !1;
    function $h() {
      Ph = null, bf = null, ig = null, Bh = !1;
    }
    function fC() {
      Bh = !0;
    }
    function dC() {
      Bh = !1;
    }
    function pC(e, t, a) {
      la(rg, t._currentValue, e), t._currentValue = a, t._currentRenderer !== void 0 && t._currentRenderer !== null && t._currentRenderer !== ag && S("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."), t._currentRenderer = ag;
    }
    function lg(e, t) {
      var a = rg.current;
      ia(rg, t), e._currentValue = a;
    }
    function ug(e, t, a) {
      for (var i = e; i !== null; ) {
        var u = i.alternate;
        if (wu(i.childLanes, t) ? u !== null && !wu(u.childLanes, t) && (u.childLanes = qe(u.childLanes, t)) : (i.childLanes = qe(i.childLanes, t), u !== null && (u.childLanes = qe(u.childLanes, t))), i === a)
          break;
        i = i.return;
      }
      i !== a && S("Expected to find the propagation root when scheduling context work. This error is likely caused by a bug in React. Please file an issue.");
    }
    function ww(e, t, a) {
      xw(e, t, a);
    }
    function xw(e, t, a) {
      var i = e.child;
      for (i !== null && (i.return = e); i !== null; ) {
        var u = void 0, s = i.dependencies;
        if (s !== null) {
          u = i.child;
          for (var f = s.firstContext; f !== null; ) {
            if (f.context === t) {
              if (i.tag === pe) {
                var p = Cs(a), v = Au(Wt, p);
                v.tag = Ih;
                var y = i.updateQueue;
                if (y !== null) {
                  var g = y.shared, b = g.pending;
                  b === null ? v.next = v : (v.next = b.next, b.next = v), g.pending = v;
                }
              }
              i.lanes = qe(i.lanes, a);
              var w = i.alternate;
              w !== null && (w.lanes = qe(w.lanes, a)), ug(i.return, a, e), s.lanes = qe(s.lanes, a);
              break;
            }
            f = f.next;
          }
        } else if (i.tag === it)
          u = i.type === e.type ? null : i.child;
        else if (i.tag === Gt) {
          var M = i.return;
          if (M === null)
            throw new Error("We just came from a parent so we must have had a parent. This is a bug in React.");
          M.lanes = qe(M.lanes, a);
          var U = M.alternate;
          U !== null && (U.lanes = qe(U.lanes, a)), ug(M, a, e), u = i.sibling;
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
            var j = u.sibling;
            if (j !== null) {
              j.return = u.return, u = j;
              break;
            }
            u = u.return;
          }
        i = u;
      }
    }
    function _f(e, t) {
      Ph = e, bf = null, ig = null;
      var a = e.dependencies;
      if (a !== null) {
        var i = a.firstContext;
        i !== null && (ta(a.lanes, t) && Lp(), a.firstContext = null);
      }
    }
    function tr(e) {
      Bh && S("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
      var t = e._currentValue;
      if (ig !== e) {
        var a = {
          context: e,
          memoizedValue: t,
          next: null
        };
        if (bf === null) {
          if (Ph === null)
            throw new Error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
          bf = a, Ph.dependencies = {
            lanes: B,
            firstContext: a
          };
        } else
          bf = bf.next = a;
      }
      return t;
    }
    var qs = null;
    function og(e) {
      qs === null ? qs = [e] : qs.push(e);
    }
    function bw() {
      if (qs !== null) {
        for (var e = 0; e < qs.length; e++) {
          var t = qs[e], a = t.interleaved;
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
        qs = null;
      }
    }
    function vC(e, t, a, i) {
      var u = t.interleaved;
      return u === null ? (a.next = a, og(t)) : (a.next = u.next, u.next = a), t.interleaved = a, Yh(e, i);
    }
    function _w(e, t, a, i) {
      var u = t.interleaved;
      u === null ? (a.next = a, og(t)) : (a.next = u.next, u.next = a), t.interleaved = a;
    }
    function Dw(e, t, a, i) {
      var u = t.interleaved;
      return u === null ? (a.next = a, og(t)) : (a.next = u.next, u.next = a), t.interleaved = a, Yh(e, i);
    }
    function Ha(e, t) {
      return Yh(e, t);
    }
    var kw = Yh;
    function Yh(e, t) {
      e.lanes = qe(e.lanes, t);
      var a = e.alternate;
      a !== null && (a.lanes = qe(a.lanes, t)), a === null && (e.flags & (hn | Xr)) !== De && cR(e);
      for (var i = e, u = e.return; u !== null; )
        u.childLanes = qe(u.childLanes, t), a = u.alternate, a !== null ? a.childLanes = qe(a.childLanes, t) : (u.flags & (hn | Xr)) !== De && cR(e), i = u, u = u.return;
      if (i.tag === ae) {
        var s = i.stateNode;
        return s;
      } else
        return null;
    }
    var hC = 0, mC = 1, Ih = 2, sg = 3, Qh = !1, cg, Wh;
    cg = !1, Wh = null;
    function fg(e) {
      var t = {
        baseState: e.memoizedState,
        firstBaseUpdate: null,
        lastBaseUpdate: null,
        shared: {
          pending: null,
          interleaved: null,
          lanes: B
        },
        effects: null
      };
      e.updateQueue = t;
    }
    function yC(e, t) {
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
    function Au(e, t) {
      var a = {
        eventTime: e,
        lane: t,
        tag: hC,
        payload: null,
        callback: null,
        next: null
      };
      return a;
    }
    function Lo(e, t, a) {
      var i = e.updateQueue;
      if (i === null)
        return null;
      var u = i.shared;
      if (Wh === u && !cg && (S("An update (setState, replaceState, or forceUpdate) was scheduled from inside an update function. Update functions should be pure, with zero side-effects. Consider using componentDidUpdate or a callback."), cg = !0), _b()) {
        var s = u.pending;
        return s === null ? t.next = t : (t.next = s.next, s.next = t), u.pending = t, kw(e, a);
      } else
        return Dw(e, u, t, a);
    }
    function Gh(e, t, a) {
      var i = t.updateQueue;
      if (i !== null) {
        var u = i.shared;
        if (kd(a)) {
          var s = u.lanes;
          s = Ld(s, e.pendingLanes);
          var f = qe(s, a);
          u.lanes = f, Zc(e, f);
        }
      }
    }
    function dg(e, t) {
      var a = e.updateQueue, i = e.alternate;
      if (i !== null) {
        var u = i.updateQueue;
        if (a === u) {
          var s = null, f = null, p = a.firstBaseUpdate;
          if (p !== null) {
            var v = p;
            do {
              var y = {
                eventTime: v.eventTime,
                lane: v.lane,
                tag: v.tag,
                payload: v.payload,
                callback: v.callback,
                next: null
              };
              f === null ? s = f = y : (f.next = y, f = y), v = v.next;
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
      var g = a.lastBaseUpdate;
      g === null ? a.firstBaseUpdate = t : g.next = t, a.lastBaseUpdate = t;
    }
    function Ow(e, t, a, i, u, s) {
      switch (a.tag) {
        case mC: {
          var f = a.payload;
          if (typeof f == "function") {
            fC();
            var p = f.call(s, i, u);
            {
              if (e.mode & Yt) {
                mn(!0);
                try {
                  f.call(s, i, u);
                } finally {
                  mn(!1);
                }
              }
              dC();
            }
            return p;
          }
          return f;
        }
        case sg:
          e.flags = e.flags & ~Kn | Re;
        case hC: {
          var v = a.payload, y;
          if (typeof v == "function") {
            fC(), y = v.call(s, i, u);
            {
              if (e.mode & Yt) {
                mn(!0);
                try {
                  v.call(s, i, u);
                } finally {
                  mn(!1);
                }
              }
              dC();
            }
          } else
            y = v;
          return y == null ? i : rt({}, i, y);
        }
        case Ih:
          return Qh = !0, i;
      }
      return i;
    }
    function qh(e, t, a, i) {
      var u = e.updateQueue;
      Qh = !1, Wh = u.shared;
      var s = u.firstBaseUpdate, f = u.lastBaseUpdate, p = u.shared.pending;
      if (p !== null) {
        u.shared.pending = null;
        var v = p, y = v.next;
        v.next = null, f === null ? s = y : f.next = y, f = v;
        var g = e.alternate;
        if (g !== null) {
          var b = g.updateQueue, w = b.lastBaseUpdate;
          w !== f && (w === null ? b.firstBaseUpdate = y : w.next = y, b.lastBaseUpdate = v);
        }
      }
      if (s !== null) {
        var M = u.baseState, U = B, j = null, le = null, Me = null, Ce = s;
        do {
          var yt = Ce.lane, ft = Ce.eventTime;
          if (wu(i, yt)) {
            if (Me !== null) {
              var H = {
                eventTime: ft,
                // This update is going to be committed so we never want uncommit
                // it. Using NoLane works because 0 is a subset of all bitmasks, so
                // this will never be skipped by the check above.
                lane: Rt,
                tag: Ce.tag,
                payload: Ce.payload,
                callback: Ce.callback,
                next: null
              };
              Me = Me.next = H;
            }
            M = Ow(e, u, Ce, M, t, a);
            var O = Ce.callback;
            if (O !== null && // If the update was already committed, we should not queue its
            // callback again.
            Ce.lane !== Rt) {
              e.flags |= Zt;
              var G = u.effects;
              G === null ? u.effects = [Ce] : G.push(Ce);
            }
          } else {
            var k = {
              eventTime: ft,
              lane: yt,
              tag: Ce.tag,
              payload: Ce.payload,
              callback: Ce.callback,
              next: null
            };
            Me === null ? (le = Me = k, j = M) : Me = Me.next = k, U = qe(U, yt);
          }
          if (Ce = Ce.next, Ce === null) {
            if (p = u.shared.pending, p === null)
              break;
            var fe = p, ue = fe.next;
            fe.next = null, Ce = ue, u.lastBaseUpdate = fe, u.shared.pending = null;
          }
        } while (!0);
        Me === null && (j = M), u.baseState = j, u.firstBaseUpdate = le, u.lastBaseUpdate = Me;
        var Ve = u.shared.interleaved;
        if (Ve !== null) {
          var Ge = Ve;
          do
            U = qe(U, Ge.lane), Ge = Ge.next;
          while (Ge !== Ve);
        } else s === null && (u.shared.lanes = B);
        $p(U), e.lanes = U, e.memoizedState = M;
      }
      Wh = null;
    }
    function Lw(e, t) {
      if (typeof e != "function")
        throw new Error("Invalid argument passed as callback. Expected a function. Instead " + ("received: " + e));
      e.call(t);
    }
    function gC() {
      Qh = !1;
    }
    function Xh() {
      return Qh;
    }
    function SC(e, t, a) {
      var i = t.effects;
      if (t.effects = null, i !== null)
        for (var u = 0; u < i.length; u++) {
          var s = i[u], f = s.callback;
          f !== null && (s.callback = null, Lw(f, a));
        }
    }
    var yp = {}, Mo = _o(yp), gp = _o(yp), Kh = _o(yp);
    function Zh(e) {
      if (e === yp)
        throw new Error("Expected host context to exist. This error is likely caused by a bug in React. Please file an issue.");
      return e;
    }
    function EC() {
      var e = Zh(Kh.current);
      return e;
    }
    function pg(e, t) {
      la(Kh, t, e), la(gp, e, e), la(Mo, yp, e);
      var a = GT(t);
      ia(Mo, e), la(Mo, a, e);
    }
    function Df(e) {
      ia(Mo, e), ia(gp, e), ia(Kh, e);
    }
    function vg() {
      var e = Zh(Mo.current);
      return e;
    }
    function CC(e) {
      Zh(Kh.current);
      var t = Zh(Mo.current), a = qT(t, e.type);
      t !== a && (la(gp, e, e), la(Mo, a, e));
    }
    function hg(e) {
      gp.current === e && (ia(Mo, e), ia(gp, e));
    }
    var Mw = 0, RC = 1, TC = 1, Sp = 2, nl = _o(Mw);
    function mg(e, t) {
      return (e & t) !== 0;
    }
    function kf(e) {
      return e & RC;
    }
    function yg(e, t) {
      return e & RC | t;
    }
    function Nw(e, t) {
      return e | t;
    }
    function No(e, t) {
      la(nl, t, e);
    }
    function Of(e) {
      ia(nl, e);
    }
    function zw(e, t) {
      var a = e.memoizedState;
      return a !== null ? a.dehydrated !== null : (e.memoizedProps, !0);
    }
    function Jh(e) {
      for (var t = e; t !== null; ) {
        if (t.tag === xe) {
          var a = t.memoizedState;
          if (a !== null) {
            var i = a.dehydrated;
            if (i === null || VE(i) || Uy(i))
              return t;
          }
        } else if (t.tag === tn && // revealOrder undefined can't be trusted because it don't
        // keep track of whether it suspended or not.
        t.memoizedProps.revealOrder !== void 0) {
          var u = (t.flags & Re) !== De;
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
    var Va = (
      /*   */
      0
    ), cr = (
      /* */
      1
    ), $l = (
      /*  */
      2
    ), fr = (
      /*    */
      4
    ), jr = (
      /*   */
      8
    ), gg = [];
    function Sg() {
      for (var e = 0; e < gg.length; e++) {
        var t = gg[e];
        t._workInProgressVersionPrimary = null;
      }
      gg.length = 0;
    }
    function Uw(e, t) {
      var a = t._getVersion, i = a(t._source);
      e.mutableSourceEagerHydrationData == null ? e.mutableSourceEagerHydrationData = [t, i] : e.mutableSourceEagerHydrationData.push(t, i);
    }
    var se = F.ReactCurrentDispatcher, Ep = F.ReactCurrentBatchConfig, Eg, Lf;
    Eg = /* @__PURE__ */ new Set();
    var Xs = B, It = null, dr = null, pr = null, em = !1, Cp = !1, Rp = 0, Aw = 0, Fw = 25, P = null, Mi = null, zo = -1, Cg = !1;
    function Ft() {
      {
        var e = P;
        Mi === null ? Mi = [e] : Mi.push(e);
      }
    }
    function ee() {
      {
        var e = P;
        Mi !== null && (zo++, Mi[zo] !== e && jw(e));
      }
    }
    function Mf(e) {
      e != null && !et(e) && S("%s received a final argument that is not an array (instead, received `%s`). When specified, the final argument must be an array.", P, typeof e);
    }
    function jw(e) {
      {
        var t = Ye(It);
        if (!Eg.has(t) && (Eg.add(t), Mi !== null)) {
          for (var a = "", i = 30, u = 0; u <= zo; u++) {
            for (var s = Mi[u], f = u === zo ? e : s, p = u + 1 + ". " + s; p.length < i; )
              p += " ";
            p += f + `
`, a += p;
          }
          S(`React has detected a change in the order of Hooks called by %s. This will lead to bugs and errors if not fixed. For more information, read the Rules of Hooks: https://reactjs.org/link/rules-of-hooks

   Previous render            Next render
   ------------------------------------------------------
%s   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
`, t, a);
        }
      }
    }
    function ua() {
      throw new Error(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`);
    }
    function Rg(e, t) {
      if (Cg)
        return !1;
      if (t === null)
        return S("%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.", P), !1;
      e.length !== t.length && S(`The final argument passed to %s changed size between renders. The order and size of this array must remain constant.

Previous: %s
Incoming: %s`, P, "[" + t.join(", ") + "]", "[" + e.join(", ") + "]");
      for (var a = 0; a < t.length && a < e.length; a++)
        if (!Q(e[a], t[a]))
          return !1;
      return !0;
    }
    function Nf(e, t, a, i, u, s) {
      Xs = s, It = t, Mi = e !== null ? e._debugHookTypes : null, zo = -1, Cg = e !== null && e.type !== t.type, t.memoizedState = null, t.updateQueue = null, t.lanes = B, e !== null && e.memoizedState !== null ? se.current = IC : Mi !== null ? se.current = YC : se.current = $C;
      var f = a(i, u);
      if (Cp) {
        var p = 0;
        do {
          if (Cp = !1, Rp = 0, p >= Fw)
            throw new Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
          p += 1, Cg = !1, dr = null, pr = null, t.updateQueue = null, zo = -1, se.current = QC, f = a(i, u);
        } while (Cp);
      }
      se.current = pm, t._debugHookTypes = Mi;
      var v = dr !== null && dr.next !== null;
      if (Xs = B, It = null, dr = null, pr = null, P = null, Mi = null, zo = -1, e !== null && (e.flags & Nn) !== (t.flags & Nn) && // Disable this warning in legacy mode, because legacy Suspense is weird
      // and creates false positives. To make this work in legacy mode, we'd
      // need to mark fibers that commit in an incomplete state, somehow. For
      // now I'll disable the warning that most of the bugs that would trigger
      // it are either exclusive to concurrent mode or exist in both.
      (e.mode & at) !== ke && S("Internal React error: Expected static flag was missing. Please notify the React team."), em = !1, v)
        throw new Error("Rendered fewer hooks than expected. This may be caused by an accidental early return statement.");
      return f;
    }
    function zf() {
      var e = Rp !== 0;
      return Rp = 0, e;
    }
    function wC(e, t, a) {
      t.updateQueue = e.updateQueue, (t.mode & bt) !== ke ? t.flags &= -50333701 : t.flags &= -2053, e.lanes = Rs(e.lanes, a);
    }
    function xC() {
      if (se.current = pm, em) {
        for (var e = It.memoizedState; e !== null; ) {
          var t = e.queue;
          t !== null && (t.pending = null), e = e.next;
        }
        em = !1;
      }
      Xs = B, It = null, dr = null, pr = null, Mi = null, zo = -1, P = null, jC = !1, Cp = !1, Rp = 0;
    }
    function Yl() {
      var e = {
        memoizedState: null,
        baseState: null,
        baseQueue: null,
        queue: null,
        next: null
      };
      return pr === null ? It.memoizedState = pr = e : pr = pr.next = e, pr;
    }
    function Ni() {
      var e;
      if (dr === null) {
        var t = It.alternate;
        t !== null ? e = t.memoizedState : e = null;
      } else
        e = dr.next;
      var a;
      if (pr === null ? a = It.memoizedState : a = pr.next, a !== null)
        pr = a, a = pr.next, dr = e;
      else {
        if (e === null)
          throw new Error("Rendered more hooks than during the previous render.");
        dr = e;
        var i = {
          memoizedState: dr.memoizedState,
          baseState: dr.baseState,
          baseQueue: dr.baseQueue,
          queue: dr.queue,
          next: null
        };
        pr === null ? It.memoizedState = pr = i : pr = pr.next = i;
      }
      return pr;
    }
    function bC() {
      return {
        lastEffect: null,
        stores: null
      };
    }
    function Tg(e, t) {
      return typeof t == "function" ? t(e) : t;
    }
    function wg(e, t, a) {
      var i = Yl(), u;
      a !== void 0 ? u = a(t) : u = t, i.memoizedState = i.baseState = u;
      var s = {
        pending: null,
        interleaved: null,
        lanes: B,
        dispatch: null,
        lastRenderedReducer: e,
        lastRenderedState: u
      };
      i.queue = s;
      var f = s.dispatch = Bw.bind(null, It, s);
      return [i.memoizedState, f];
    }
    function xg(e, t, a) {
      var i = Ni(), u = i.queue;
      if (u === null)
        throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");
      u.lastRenderedReducer = e;
      var s = dr, f = s.baseQueue, p = u.pending;
      if (p !== null) {
        if (f !== null) {
          var v = f.next, y = p.next;
          f.next = y, p.next = v;
        }
        s.baseQueue !== f && S("Internal error: Expected work-in-progress queue to be a clone. This is a bug in React."), s.baseQueue = f = p, u.pending = null;
      }
      if (f !== null) {
        var g = f.next, b = s.baseState, w = null, M = null, U = null, j = g;
        do {
          var le = j.lane;
          if (wu(Xs, le)) {
            if (U !== null) {
              var Ce = {
                // This update is going to be committed so we never want uncommit
                // it. Using NoLane works because 0 is a subset of all bitmasks, so
                // this will never be skipped by the check above.
                lane: Rt,
                action: j.action,
                hasEagerState: j.hasEagerState,
                eagerState: j.eagerState,
                next: null
              };
              U = U.next = Ce;
            }
            if (j.hasEagerState)
              b = j.eagerState;
            else {
              var yt = j.action;
              b = e(b, yt);
            }
          } else {
            var Me = {
              lane: le,
              action: j.action,
              hasEagerState: j.hasEagerState,
              eagerState: j.eagerState,
              next: null
            };
            U === null ? (M = U = Me, w = b) : U = U.next = Me, It.lanes = qe(It.lanes, le), $p(le);
          }
          j = j.next;
        } while (j !== null && j !== g);
        U === null ? w = b : U.next = M, Q(b, i.memoizedState) || Lp(), i.memoizedState = b, i.baseState = w, i.baseQueue = U, u.lastRenderedState = b;
      }
      var ft = u.interleaved;
      if (ft !== null) {
        var k = ft;
        do {
          var H = k.lane;
          It.lanes = qe(It.lanes, H), $p(H), k = k.next;
        } while (k !== ft);
      } else f === null && (u.lanes = B);
      var O = u.dispatch;
      return [i.memoizedState, O];
    }
    function bg(e, t, a) {
      var i = Ni(), u = i.queue;
      if (u === null)
        throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");
      u.lastRenderedReducer = e;
      var s = u.dispatch, f = u.pending, p = i.memoizedState;
      if (f !== null) {
        u.pending = null;
        var v = f.next, y = v;
        do {
          var g = y.action;
          p = e(p, g), y = y.next;
        } while (y !== v);
        Q(p, i.memoizedState) || Lp(), i.memoizedState = p, i.baseQueue === null && (i.baseState = p), u.lastRenderedState = p;
      }
      return [p, s];
    }
    function iD(e, t, a) {
    }
    function lD(e, t, a) {
    }
    function _g(e, t, a) {
      var i = It, u = Yl(), s, f = Fr();
      if (f) {
        if (a === void 0)
          throw new Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
        s = a(), Lf || s !== a() && (S("The result of getServerSnapshot should be cached to avoid an infinite loop"), Lf = !0);
      } else {
        if (s = t(), !Lf) {
          var p = t();
          Q(s, p) || (S("The result of getSnapshot should be cached to avoid an infinite loop"), Lf = !0);
        }
        var v = Mm();
        if (v === null)
          throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
        Xc(v, Xs) || _C(i, t, s);
      }
      u.memoizedState = s;
      var y = {
        value: s,
        getSnapshot: t
      };
      return u.queue = y, im(kC.bind(null, i, y, e), [e]), i.flags |= qr, Tp(cr | jr, DC.bind(null, i, y, s, t), void 0, null), s;
    }
    function tm(e, t, a) {
      var i = It, u = Ni(), s = t();
      if (!Lf) {
        var f = t();
        Q(s, f) || (S("The result of getSnapshot should be cached to avoid an infinite loop"), Lf = !0);
      }
      var p = u.memoizedState, v = !Q(p, s);
      v && (u.memoizedState = s, Lp());
      var y = u.queue;
      if (xp(kC.bind(null, i, y, e), [e]), y.getSnapshot !== t || v || // Check if the susbcribe function changed. We can save some memory by
      // checking whether we scheduled a subscription effect above.
      pr !== null && pr.memoizedState.tag & cr) {
        i.flags |= qr, Tp(cr | jr, DC.bind(null, i, y, s, t), void 0, null);
        var g = Mm();
        if (g === null)
          throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
        Xc(g, Xs) || _C(i, t, s);
      }
      return s;
    }
    function _C(e, t, a) {
      e.flags |= co;
      var i = {
        getSnapshot: t,
        value: a
      }, u = It.updateQueue;
      if (u === null)
        u = bC(), It.updateQueue = u, u.stores = [i];
      else {
        var s = u.stores;
        s === null ? u.stores = [i] : s.push(i);
      }
    }
    function DC(e, t, a, i) {
      t.value = a, t.getSnapshot = i, OC(t) && LC(e);
    }
    function kC(e, t, a) {
      var i = function() {
        OC(t) && LC(e);
      };
      return a(i);
    }
    function OC(e) {
      var t = e.getSnapshot, a = e.value;
      try {
        var i = t();
        return !Q(a, i);
      } catch {
        return !0;
      }
    }
    function LC(e) {
      var t = Ha(e, Fe);
      t !== null && yr(t, e, Fe, Wt);
    }
    function nm(e) {
      var t = Yl();
      typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e;
      var a = {
        pending: null,
        interleaved: null,
        lanes: B,
        dispatch: null,
        lastRenderedReducer: Tg,
        lastRenderedState: e
      };
      t.queue = a;
      var i = a.dispatch = $w.bind(null, It, a);
      return [t.memoizedState, i];
    }
    function Dg(e) {
      return xg(Tg);
    }
    function kg(e) {
      return bg(Tg);
    }
    function Tp(e, t, a, i) {
      var u = {
        tag: e,
        create: t,
        destroy: a,
        deps: i,
        // Circular
        next: null
      }, s = It.updateQueue;
      if (s === null)
        s = bC(), It.updateQueue = s, s.lastEffect = u.next = u;
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
    function Og(e) {
      var t = Yl();
      {
        var a = {
          current: e
        };
        return t.memoizedState = a, a;
      }
    }
    function rm(e) {
      var t = Ni();
      return t.memoizedState;
    }
    function wp(e, t, a, i) {
      var u = Yl(), s = i === void 0 ? null : i;
      It.flags |= e, u.memoizedState = Tp(cr | t, a, void 0, s);
    }
    function am(e, t, a, i) {
      var u = Ni(), s = i === void 0 ? null : i, f = void 0;
      if (dr !== null) {
        var p = dr.memoizedState;
        if (f = p.destroy, s !== null) {
          var v = p.deps;
          if (Rg(s, v)) {
            u.memoizedState = Tp(t, a, f, s);
            return;
          }
        }
      }
      It.flags |= e, u.memoizedState = Tp(cr | t, a, f, s);
    }
    function im(e, t) {
      return (It.mode & bt) !== ke ? wp(Ei | qr | Tc, jr, e, t) : wp(qr | Tc, jr, e, t);
    }
    function xp(e, t) {
      return am(qr, jr, e, t);
    }
    function Lg(e, t) {
      return wp(vt, $l, e, t);
    }
    function lm(e, t) {
      return am(vt, $l, e, t);
    }
    function Mg(e, t) {
      var a = vt;
      return a |= Yi, (It.mode & bt) !== ke && (a |= xl), wp(a, fr, e, t);
    }
    function um(e, t) {
      return am(vt, fr, e, t);
    }
    function MC(e, t) {
      if (typeof t == "function") {
        var a = t, i = e();
        return a(i), function() {
          a(null);
        };
      } else if (t != null) {
        var u = t;
        u.hasOwnProperty("current") || S("Expected useImperativeHandle() first argument to either be a ref callback or React.createRef() object. Instead received: %s.", "an object with keys {" + Object.keys(u).join(", ") + "}");
        var s = e();
        return u.current = s, function() {
          u.current = null;
        };
      }
    }
    function Ng(e, t, a) {
      typeof t != "function" && S("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t !== null ? typeof t : "null");
      var i = a != null ? a.concat([e]) : null, u = vt;
      return u |= Yi, (It.mode & bt) !== ke && (u |= xl), wp(u, fr, MC.bind(null, t, e), i);
    }
    function om(e, t, a) {
      typeof t != "function" && S("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t !== null ? typeof t : "null");
      var i = a != null ? a.concat([e]) : null;
      return am(vt, fr, MC.bind(null, t, e), i);
    }
    function Hw(e, t) {
    }
    var sm = Hw;
    function zg(e, t) {
      var a = Yl(), i = t === void 0 ? null : t;
      return a.memoizedState = [e, i], e;
    }
    function cm(e, t) {
      var a = Ni(), i = t === void 0 ? null : t, u = a.memoizedState;
      if (u !== null && i !== null) {
        var s = u[1];
        if (Rg(i, s))
          return u[0];
      }
      return a.memoizedState = [e, i], e;
    }
    function Ug(e, t) {
      var a = Yl(), i = t === void 0 ? null : t, u = e();
      return a.memoizedState = [u, i], u;
    }
    function fm(e, t) {
      var a = Ni(), i = t === void 0 ? null : t, u = a.memoizedState;
      if (u !== null && i !== null) {
        var s = u[1];
        if (Rg(i, s))
          return u[0];
      }
      var f = e();
      return a.memoizedState = [f, i], f;
    }
    function Ag(e) {
      var t = Yl();
      return t.memoizedState = e, e;
    }
    function NC(e) {
      var t = Ni(), a = dr, i = a.memoizedState;
      return UC(t, i, e);
    }
    function zC(e) {
      var t = Ni();
      if (dr === null)
        return t.memoizedState = e, e;
      var a = dr.memoizedState;
      return UC(t, a, e);
    }
    function UC(e, t, a) {
      var i = !_d(Xs);
      if (i) {
        if (!Q(a, t)) {
          var u = Od();
          It.lanes = qe(It.lanes, u), $p(u), e.baseState = !0;
        }
        return t;
      } else
        return e.baseState && (e.baseState = !1, Lp()), e.memoizedState = a, a;
    }
    function Vw(e, t, a) {
      var i = Aa();
      An(Bv(i, wi)), e(!0);
      var u = Ep.transition;
      Ep.transition = {};
      var s = Ep.transition;
      Ep.transition._updatedFibers = /* @__PURE__ */ new Set();
      try {
        e(!1), t();
      } finally {
        if (An(i), Ep.transition = u, u === null && s._updatedFibers) {
          var f = s._updatedFibers.size;
          f > 10 && zt("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), s._updatedFibers.clear();
        }
      }
    }
    function Fg() {
      var e = nm(!1), t = e[0], a = e[1], i = Vw.bind(null, a), u = Yl();
      return u.memoizedState = i, [t, i];
    }
    function AC() {
      var e = Dg(), t = e[0], a = Ni(), i = a.memoizedState;
      return [t, i];
    }
    function FC() {
      var e = kg(), t = e[0], a = Ni(), i = a.memoizedState;
      return [t, i];
    }
    var jC = !1;
    function Pw() {
      return jC;
    }
    function jg() {
      var e = Yl(), t = Mm(), a = t.identifierPrefix, i;
      if (Fr()) {
        var u = aw();
        i = ":" + a + "R" + u;
        var s = Rp++;
        s > 0 && (i += "H" + s.toString(32)), i += ":";
      } else {
        var f = Aw++;
        i = ":" + a + "r" + f.toString(32) + ":";
      }
      return e.memoizedState = i, i;
    }
    function dm() {
      var e = Ni(), t = e.memoizedState;
      return t;
    }
    function Bw(e, t, a) {
      typeof arguments[3] == "function" && S("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
      var i = Ho(e), u = {
        lane: i,
        action: a,
        hasEagerState: !1,
        eagerState: null,
        next: null
      };
      if (HC(e))
        VC(t, u);
      else {
        var s = vC(e, t, u, i);
        if (s !== null) {
          var f = Ca();
          yr(s, e, i, f), PC(s, t, i);
        }
      }
      BC(e, i);
    }
    function $w(e, t, a) {
      typeof arguments[3] == "function" && S("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
      var i = Ho(e), u = {
        lane: i,
        action: a,
        hasEagerState: !1,
        eagerState: null,
        next: null
      };
      if (HC(e))
        VC(t, u);
      else {
        var s = e.alternate;
        if (e.lanes === B && (s === null || s.lanes === B)) {
          var f = t.lastRenderedReducer;
          if (f !== null) {
            var p;
            p = se.current, se.current = rl;
            try {
              var v = t.lastRenderedState, y = f(v, a);
              if (u.hasEagerState = !0, u.eagerState = y, Q(y, v)) {
                _w(e, t, u, i);
                return;
              }
            } catch {
            } finally {
              se.current = p;
            }
          }
        }
        var g = vC(e, t, u, i);
        if (g !== null) {
          var b = Ca();
          yr(g, e, i, b), PC(g, t, i);
        }
      }
      BC(e, i);
    }
    function HC(e) {
      var t = e.alternate;
      return e === It || t !== null && t === It;
    }
    function VC(e, t) {
      Cp = em = !0;
      var a = e.pending;
      a === null ? t.next = t : (t.next = a.next, a.next = t), e.pending = t;
    }
    function PC(e, t, a) {
      if (kd(a)) {
        var i = t.lanes;
        i = Ld(i, e.pendingLanes);
        var u = qe(i, a);
        t.lanes = u, Zc(e, u);
      }
    }
    function BC(e, t, a) {
      ds(e, t);
    }
    var pm = {
      readContext: tr,
      useCallback: ua,
      useContext: ua,
      useEffect: ua,
      useImperativeHandle: ua,
      useInsertionEffect: ua,
      useLayoutEffect: ua,
      useMemo: ua,
      useReducer: ua,
      useRef: ua,
      useState: ua,
      useDebugValue: ua,
      useDeferredValue: ua,
      useTransition: ua,
      useMutableSource: ua,
      useSyncExternalStore: ua,
      useId: ua,
      unstable_isNewReconciler: X
    }, $C = null, YC = null, IC = null, QC = null, Il = null, rl = null, vm = null;
    {
      var Hg = function() {
        S("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
      }, Ie = function() {
        S("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://reactjs.org/link/rules-of-hooks");
      };
      $C = {
        readContext: function(e) {
          return tr(e);
        },
        useCallback: function(e, t) {
          return P = "useCallback", Ft(), Mf(t), zg(e, t);
        },
        useContext: function(e) {
          return P = "useContext", Ft(), tr(e);
        },
        useEffect: function(e, t) {
          return P = "useEffect", Ft(), Mf(t), im(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return P = "useImperativeHandle", Ft(), Mf(a), Ng(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return P = "useInsertionEffect", Ft(), Mf(t), Lg(e, t);
        },
        useLayoutEffect: function(e, t) {
          return P = "useLayoutEffect", Ft(), Mf(t), Mg(e, t);
        },
        useMemo: function(e, t) {
          P = "useMemo", Ft(), Mf(t);
          var a = se.current;
          se.current = Il;
          try {
            return Ug(e, t);
          } finally {
            se.current = a;
          }
        },
        useReducer: function(e, t, a) {
          P = "useReducer", Ft();
          var i = se.current;
          se.current = Il;
          try {
            return wg(e, t, a);
          } finally {
            se.current = i;
          }
        },
        useRef: function(e) {
          return P = "useRef", Ft(), Og(e);
        },
        useState: function(e) {
          P = "useState", Ft();
          var t = se.current;
          se.current = Il;
          try {
            return nm(e);
          } finally {
            se.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return P = "useDebugValue", Ft(), void 0;
        },
        useDeferredValue: function(e) {
          return P = "useDeferredValue", Ft(), Ag(e);
        },
        useTransition: function() {
          return P = "useTransition", Ft(), Fg();
        },
        useMutableSource: function(e, t, a) {
          return P = "useMutableSource", Ft(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return P = "useSyncExternalStore", Ft(), _g(e, t, a);
        },
        useId: function() {
          return P = "useId", Ft(), jg();
        },
        unstable_isNewReconciler: X
      }, YC = {
        readContext: function(e) {
          return tr(e);
        },
        useCallback: function(e, t) {
          return P = "useCallback", ee(), zg(e, t);
        },
        useContext: function(e) {
          return P = "useContext", ee(), tr(e);
        },
        useEffect: function(e, t) {
          return P = "useEffect", ee(), im(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return P = "useImperativeHandle", ee(), Ng(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return P = "useInsertionEffect", ee(), Lg(e, t);
        },
        useLayoutEffect: function(e, t) {
          return P = "useLayoutEffect", ee(), Mg(e, t);
        },
        useMemo: function(e, t) {
          P = "useMemo", ee();
          var a = se.current;
          se.current = Il;
          try {
            return Ug(e, t);
          } finally {
            se.current = a;
          }
        },
        useReducer: function(e, t, a) {
          P = "useReducer", ee();
          var i = se.current;
          se.current = Il;
          try {
            return wg(e, t, a);
          } finally {
            se.current = i;
          }
        },
        useRef: function(e) {
          return P = "useRef", ee(), Og(e);
        },
        useState: function(e) {
          P = "useState", ee();
          var t = se.current;
          se.current = Il;
          try {
            return nm(e);
          } finally {
            se.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return P = "useDebugValue", ee(), void 0;
        },
        useDeferredValue: function(e) {
          return P = "useDeferredValue", ee(), Ag(e);
        },
        useTransition: function() {
          return P = "useTransition", ee(), Fg();
        },
        useMutableSource: function(e, t, a) {
          return P = "useMutableSource", ee(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return P = "useSyncExternalStore", ee(), _g(e, t, a);
        },
        useId: function() {
          return P = "useId", ee(), jg();
        },
        unstable_isNewReconciler: X
      }, IC = {
        readContext: function(e) {
          return tr(e);
        },
        useCallback: function(e, t) {
          return P = "useCallback", ee(), cm(e, t);
        },
        useContext: function(e) {
          return P = "useContext", ee(), tr(e);
        },
        useEffect: function(e, t) {
          return P = "useEffect", ee(), xp(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return P = "useImperativeHandle", ee(), om(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return P = "useInsertionEffect", ee(), lm(e, t);
        },
        useLayoutEffect: function(e, t) {
          return P = "useLayoutEffect", ee(), um(e, t);
        },
        useMemo: function(e, t) {
          P = "useMemo", ee();
          var a = se.current;
          se.current = rl;
          try {
            return fm(e, t);
          } finally {
            se.current = a;
          }
        },
        useReducer: function(e, t, a) {
          P = "useReducer", ee();
          var i = se.current;
          se.current = rl;
          try {
            return xg(e, t, a);
          } finally {
            se.current = i;
          }
        },
        useRef: function(e) {
          return P = "useRef", ee(), rm();
        },
        useState: function(e) {
          P = "useState", ee();
          var t = se.current;
          se.current = rl;
          try {
            return Dg(e);
          } finally {
            se.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return P = "useDebugValue", ee(), sm();
        },
        useDeferredValue: function(e) {
          return P = "useDeferredValue", ee(), NC(e);
        },
        useTransition: function() {
          return P = "useTransition", ee(), AC();
        },
        useMutableSource: function(e, t, a) {
          return P = "useMutableSource", ee(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return P = "useSyncExternalStore", ee(), tm(e, t);
        },
        useId: function() {
          return P = "useId", ee(), dm();
        },
        unstable_isNewReconciler: X
      }, QC = {
        readContext: function(e) {
          return tr(e);
        },
        useCallback: function(e, t) {
          return P = "useCallback", ee(), cm(e, t);
        },
        useContext: function(e) {
          return P = "useContext", ee(), tr(e);
        },
        useEffect: function(e, t) {
          return P = "useEffect", ee(), xp(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return P = "useImperativeHandle", ee(), om(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return P = "useInsertionEffect", ee(), lm(e, t);
        },
        useLayoutEffect: function(e, t) {
          return P = "useLayoutEffect", ee(), um(e, t);
        },
        useMemo: function(e, t) {
          P = "useMemo", ee();
          var a = se.current;
          se.current = vm;
          try {
            return fm(e, t);
          } finally {
            se.current = a;
          }
        },
        useReducer: function(e, t, a) {
          P = "useReducer", ee();
          var i = se.current;
          se.current = vm;
          try {
            return bg(e, t, a);
          } finally {
            se.current = i;
          }
        },
        useRef: function(e) {
          return P = "useRef", ee(), rm();
        },
        useState: function(e) {
          P = "useState", ee();
          var t = se.current;
          se.current = vm;
          try {
            return kg(e);
          } finally {
            se.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return P = "useDebugValue", ee(), sm();
        },
        useDeferredValue: function(e) {
          return P = "useDeferredValue", ee(), zC(e);
        },
        useTransition: function() {
          return P = "useTransition", ee(), FC();
        },
        useMutableSource: function(e, t, a) {
          return P = "useMutableSource", ee(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return P = "useSyncExternalStore", ee(), tm(e, t);
        },
        useId: function() {
          return P = "useId", ee(), dm();
        },
        unstable_isNewReconciler: X
      }, Il = {
        readContext: function(e) {
          return Hg(), tr(e);
        },
        useCallback: function(e, t) {
          return P = "useCallback", Ie(), Ft(), zg(e, t);
        },
        useContext: function(e) {
          return P = "useContext", Ie(), Ft(), tr(e);
        },
        useEffect: function(e, t) {
          return P = "useEffect", Ie(), Ft(), im(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return P = "useImperativeHandle", Ie(), Ft(), Ng(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return P = "useInsertionEffect", Ie(), Ft(), Lg(e, t);
        },
        useLayoutEffect: function(e, t) {
          return P = "useLayoutEffect", Ie(), Ft(), Mg(e, t);
        },
        useMemo: function(e, t) {
          P = "useMemo", Ie(), Ft();
          var a = se.current;
          se.current = Il;
          try {
            return Ug(e, t);
          } finally {
            se.current = a;
          }
        },
        useReducer: function(e, t, a) {
          P = "useReducer", Ie(), Ft();
          var i = se.current;
          se.current = Il;
          try {
            return wg(e, t, a);
          } finally {
            se.current = i;
          }
        },
        useRef: function(e) {
          return P = "useRef", Ie(), Ft(), Og(e);
        },
        useState: function(e) {
          P = "useState", Ie(), Ft();
          var t = se.current;
          se.current = Il;
          try {
            return nm(e);
          } finally {
            se.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return P = "useDebugValue", Ie(), Ft(), void 0;
        },
        useDeferredValue: function(e) {
          return P = "useDeferredValue", Ie(), Ft(), Ag(e);
        },
        useTransition: function() {
          return P = "useTransition", Ie(), Ft(), Fg();
        },
        useMutableSource: function(e, t, a) {
          return P = "useMutableSource", Ie(), Ft(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return P = "useSyncExternalStore", Ie(), Ft(), _g(e, t, a);
        },
        useId: function() {
          return P = "useId", Ie(), Ft(), jg();
        },
        unstable_isNewReconciler: X
      }, rl = {
        readContext: function(e) {
          return Hg(), tr(e);
        },
        useCallback: function(e, t) {
          return P = "useCallback", Ie(), ee(), cm(e, t);
        },
        useContext: function(e) {
          return P = "useContext", Ie(), ee(), tr(e);
        },
        useEffect: function(e, t) {
          return P = "useEffect", Ie(), ee(), xp(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return P = "useImperativeHandle", Ie(), ee(), om(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return P = "useInsertionEffect", Ie(), ee(), lm(e, t);
        },
        useLayoutEffect: function(e, t) {
          return P = "useLayoutEffect", Ie(), ee(), um(e, t);
        },
        useMemo: function(e, t) {
          P = "useMemo", Ie(), ee();
          var a = se.current;
          se.current = rl;
          try {
            return fm(e, t);
          } finally {
            se.current = a;
          }
        },
        useReducer: function(e, t, a) {
          P = "useReducer", Ie(), ee();
          var i = se.current;
          se.current = rl;
          try {
            return xg(e, t, a);
          } finally {
            se.current = i;
          }
        },
        useRef: function(e) {
          return P = "useRef", Ie(), ee(), rm();
        },
        useState: function(e) {
          P = "useState", Ie(), ee();
          var t = se.current;
          se.current = rl;
          try {
            return Dg(e);
          } finally {
            se.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return P = "useDebugValue", Ie(), ee(), sm();
        },
        useDeferredValue: function(e) {
          return P = "useDeferredValue", Ie(), ee(), NC(e);
        },
        useTransition: function() {
          return P = "useTransition", Ie(), ee(), AC();
        },
        useMutableSource: function(e, t, a) {
          return P = "useMutableSource", Ie(), ee(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return P = "useSyncExternalStore", Ie(), ee(), tm(e, t);
        },
        useId: function() {
          return P = "useId", Ie(), ee(), dm();
        },
        unstable_isNewReconciler: X
      }, vm = {
        readContext: function(e) {
          return Hg(), tr(e);
        },
        useCallback: function(e, t) {
          return P = "useCallback", Ie(), ee(), cm(e, t);
        },
        useContext: function(e) {
          return P = "useContext", Ie(), ee(), tr(e);
        },
        useEffect: function(e, t) {
          return P = "useEffect", Ie(), ee(), xp(e, t);
        },
        useImperativeHandle: function(e, t, a) {
          return P = "useImperativeHandle", Ie(), ee(), om(e, t, a);
        },
        useInsertionEffect: function(e, t) {
          return P = "useInsertionEffect", Ie(), ee(), lm(e, t);
        },
        useLayoutEffect: function(e, t) {
          return P = "useLayoutEffect", Ie(), ee(), um(e, t);
        },
        useMemo: function(e, t) {
          P = "useMemo", Ie(), ee();
          var a = se.current;
          se.current = rl;
          try {
            return fm(e, t);
          } finally {
            se.current = a;
          }
        },
        useReducer: function(e, t, a) {
          P = "useReducer", Ie(), ee();
          var i = se.current;
          se.current = rl;
          try {
            return bg(e, t, a);
          } finally {
            se.current = i;
          }
        },
        useRef: function(e) {
          return P = "useRef", Ie(), ee(), rm();
        },
        useState: function(e) {
          P = "useState", Ie(), ee();
          var t = se.current;
          se.current = rl;
          try {
            return kg(e);
          } finally {
            se.current = t;
          }
        },
        useDebugValue: function(e, t) {
          return P = "useDebugValue", Ie(), ee(), sm();
        },
        useDeferredValue: function(e) {
          return P = "useDeferredValue", Ie(), ee(), zC(e);
        },
        useTransition: function() {
          return P = "useTransition", Ie(), ee(), FC();
        },
        useMutableSource: function(e, t, a) {
          return P = "useMutableSource", Ie(), ee(), void 0;
        },
        useSyncExternalStore: function(e, t, a) {
          return P = "useSyncExternalStore", Ie(), ee(), tm(e, t);
        },
        useId: function() {
          return P = "useId", Ie(), ee(), dm();
        },
        unstable_isNewReconciler: X
      };
    }
    var Uo = Z.unstable_now, WC = 0, hm = -1, bp = -1, mm = -1, Vg = !1, ym = !1;
    function GC() {
      return Vg;
    }
    function Yw() {
      ym = !0;
    }
    function Iw() {
      Vg = !1, ym = !1;
    }
    function Qw() {
      Vg = ym, ym = !1;
    }
    function qC() {
      return WC;
    }
    function XC() {
      WC = Uo();
    }
    function Pg(e) {
      bp = Uo(), e.actualStartTime < 0 && (e.actualStartTime = Uo());
    }
    function KC(e) {
      bp = -1;
    }
    function gm(e, t) {
      if (bp >= 0) {
        var a = Uo() - bp;
        e.actualDuration += a, t && (e.selfBaseDuration = a), bp = -1;
      }
    }
    function Ql(e) {
      if (hm >= 0) {
        var t = Uo() - hm;
        hm = -1;
        for (var a = e.return; a !== null; ) {
          switch (a.tag) {
            case ae:
              var i = a.stateNode;
              i.effectDuration += t;
              return;
            case ct:
              var u = a.stateNode;
              u.effectDuration += t;
              return;
          }
          a = a.return;
        }
      }
    }
    function Bg(e) {
      if (mm >= 0) {
        var t = Uo() - mm;
        mm = -1;
        for (var a = e.return; a !== null; ) {
          switch (a.tag) {
            case ae:
              var i = a.stateNode;
              i !== null && (i.passiveEffectDuration += t);
              return;
            case ct:
              var u = a.stateNode;
              u !== null && (u.passiveEffectDuration += t);
              return;
          }
          a = a.return;
        }
      }
    }
    function Wl() {
      hm = Uo();
    }
    function $g() {
      mm = Uo();
    }
    function Yg(e) {
      for (var t = e.child; t; )
        e.actualDuration += t.actualDuration, t = t.sibling;
    }
    function al(e, t) {
      if (e && e.defaultProps) {
        var a = rt({}, t), i = e.defaultProps;
        for (var u in i)
          a[u] === void 0 && (a[u] = i[u]);
        return a;
      }
      return t;
    }
    var Ig = {}, Qg, Wg, Gg, qg, Xg, ZC, Sm, Kg, Zg, Jg, _p;
    {
      Qg = /* @__PURE__ */ new Set(), Wg = /* @__PURE__ */ new Set(), Gg = /* @__PURE__ */ new Set(), qg = /* @__PURE__ */ new Set(), Kg = /* @__PURE__ */ new Set(), Xg = /* @__PURE__ */ new Set(), Zg = /* @__PURE__ */ new Set(), Jg = /* @__PURE__ */ new Set(), _p = /* @__PURE__ */ new Set();
      var JC = /* @__PURE__ */ new Set();
      Sm = function(e, t) {
        if (!(e === null || typeof e == "function")) {
          var a = t + "_" + e;
          JC.has(a) || (JC.add(a), S("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t, e));
        }
      }, ZC = function(e, t) {
        if (t === void 0) {
          var a = gt(e) || "Component";
          Xg.has(a) || (Xg.add(a), S("%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.", a));
        }
      }, Object.defineProperty(Ig, "_processChildContext", {
        enumerable: !1,
        value: function() {
          throw new Error("_processChildContext is not available in React 16+. This likely means you have multiple copies of React and are attempting to nest a React 15 tree inside a React 16 tree using unstable_renderSubtreeIntoContainer, which isn't supported. Try to make sure you have only one copy of React (and ideally, switch to ReactDOM.createPortal).");
        }
      }), Object.freeze(Ig);
    }
    function eS(e, t, a, i) {
      var u = e.memoizedState, s = a(i, u);
      {
        if (e.mode & Yt) {
          mn(!0);
          try {
            s = a(i, u);
          } finally {
            mn(!1);
          }
        }
        ZC(t, s);
      }
      var f = s == null ? u : rt({}, u, s);
      if (e.memoizedState = f, e.lanes === B) {
        var p = e.updateQueue;
        p.baseState = f;
      }
    }
    var tS = {
      isMounted: bv,
      enqueueSetState: function(e, t, a) {
        var i = so(e), u = Ca(), s = Ho(i), f = Au(u, s);
        f.payload = t, a != null && (Sm(a, "setState"), f.callback = a);
        var p = Lo(i, f, s);
        p !== null && (yr(p, i, s, u), Gh(p, i, s)), ds(i, s);
      },
      enqueueReplaceState: function(e, t, a) {
        var i = so(e), u = Ca(), s = Ho(i), f = Au(u, s);
        f.tag = mC, f.payload = t, a != null && (Sm(a, "replaceState"), f.callback = a);
        var p = Lo(i, f, s);
        p !== null && (yr(p, i, s, u), Gh(p, i, s)), ds(i, s);
      },
      enqueueForceUpdate: function(e, t) {
        var a = so(e), i = Ca(), u = Ho(a), s = Au(i, u);
        s.tag = Ih, t != null && (Sm(t, "forceUpdate"), s.callback = t);
        var f = Lo(a, s, u);
        f !== null && (yr(f, a, u, i), Gh(f, a, u)), Oc(a, u);
      }
    };
    function e0(e, t, a, i, u, s, f) {
      var p = e.stateNode;
      if (typeof p.shouldComponentUpdate == "function") {
        var v = p.shouldComponentUpdate(i, s, f);
        {
          if (e.mode & Yt) {
            mn(!0);
            try {
              v = p.shouldComponentUpdate(i, s, f);
            } finally {
              mn(!1);
            }
          }
          v === void 0 && S("%s.shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false.", gt(t) || "Component");
        }
        return v;
      }
      return t.prototype && t.prototype.isPureReactComponent ? !he(a, i) || !he(u, s) : !0;
    }
    function Ww(e, t, a) {
      var i = e.stateNode;
      {
        var u = gt(t) || "Component", s = i.render;
        s || (t.prototype && typeof t.prototype.render == "function" ? S("%s(...): No `render` method found on the returned component instance: did you accidentally return an object from the constructor?", u) : S("%s(...): No `render` method found on the returned component instance: you may have forgotten to define `render`.", u)), i.getInitialState && !i.getInitialState.isReactClassApproved && !i.state && S("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?", u), i.getDefaultProps && !i.getDefaultProps.isReactClassApproved && S("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.", u), i.propTypes && S("propTypes was defined as an instance property on %s. Use a static property to define propTypes instead.", u), i.contextType && S("contextType was defined as an instance property on %s. Use a static property to define contextType instead.", u), t.childContextTypes && !_p.has(t) && // Strict Mode has its own warning for legacy context, so we can skip
        // this one.
        (e.mode & Yt) === ke && (_p.add(t), S(`%s uses the legacy childContextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() instead

.Learn more about this warning here: https://reactjs.org/link/legacy-context`, u)), t.contextTypes && !_p.has(t) && // Strict Mode has its own warning for legacy context, so we can skip
        // this one.
        (e.mode & Yt) === ke && (_p.add(t), S(`%s uses the legacy contextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() with static contextType instead.

Learn more about this warning here: https://reactjs.org/link/legacy-context`, u)), i.contextTypes && S("contextTypes was defined as an instance property on %s. Use a static property to define contextTypes instead.", u), t.contextType && t.contextTypes && !Zg.has(t) && (Zg.add(t), S("%s declares both contextTypes and contextType static properties. The legacy contextTypes property will be ignored.", u)), typeof i.componentShouldUpdate == "function" && S("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.", u), t.prototype && t.prototype.isPureReactComponent && typeof i.shouldComponentUpdate < "u" && S("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.", gt(t) || "A pure component"), typeof i.componentDidUnmount == "function" && S("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?", u), typeof i.componentDidReceiveProps == "function" && S("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().", u), typeof i.componentWillRecieveProps == "function" && S("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?", u), typeof i.UNSAFE_componentWillRecieveProps == "function" && S("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?", u);
        var f = i.props !== a;
        i.props !== void 0 && f && S("%s(...): When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.", u, u), i.defaultProps && S("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.", u, u), typeof i.getSnapshotBeforeUpdate == "function" && typeof i.componentDidUpdate != "function" && !Gg.has(t) && (Gg.add(t), S("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.", gt(t))), typeof i.getDerivedStateFromProps == "function" && S("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.", u), typeof i.getDerivedStateFromError == "function" && S("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.", u), typeof t.getSnapshotBeforeUpdate == "function" && S("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.", u);
        var p = i.state;
        p && (typeof p != "object" || et(p)) && S("%s.state: must be set to an object or null", u), typeof i.getChildContext == "function" && typeof t.childContextTypes != "object" && S("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().", u);
      }
    }
    function t0(e, t) {
      t.updater = tS, e.stateNode = t, cu(t, e), t._reactInternalInstance = Ig;
    }
    function n0(e, t, a) {
      var i = !1, u = ii, s = ii, f = t.contextType;
      if ("contextType" in t) {
        var p = (
          // Allow null for conditional declaration
          f === null || f !== void 0 && f.$$typeof === J && f._context === void 0
        );
        if (!p && !Jg.has(t)) {
          Jg.add(t);
          var v = "";
          f === void 0 ? v = " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file." : typeof f != "object" ? v = " However, it is set to a " + typeof f + "." : f.$$typeof === $ ? v = " Did you accidentally pass the Context.Provider instead?" : f._context !== void 0 ? v = " Did you accidentally pass the Context.Consumer instead?" : v = " However, it is set to an object with keys {" + Object.keys(f).join(", ") + "}.", S("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s", gt(t) || "Component", v);
        }
      }
      if (typeof f == "object" && f !== null)
        s = tr(f);
      else {
        u = Ef(e, t, !0);
        var y = t.contextTypes;
        i = y != null, s = i ? Cf(e, u) : ii;
      }
      var g = new t(a, s);
      if (e.mode & Yt) {
        mn(!0);
        try {
          g = new t(a, s);
        } finally {
          mn(!1);
        }
      }
      var b = e.memoizedState = g.state !== null && g.state !== void 0 ? g.state : null;
      t0(e, g);
      {
        if (typeof t.getDerivedStateFromProps == "function" && b === null) {
          var w = gt(t) || "Component";
          Wg.has(w) || (Wg.add(w), S("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.", w, g.state === null ? "null" : "undefined", w));
        }
        if (typeof t.getDerivedStateFromProps == "function" || typeof g.getSnapshotBeforeUpdate == "function") {
          var M = null, U = null, j = null;
          if (typeof g.componentWillMount == "function" && g.componentWillMount.__suppressDeprecationWarning !== !0 ? M = "componentWillMount" : typeof g.UNSAFE_componentWillMount == "function" && (M = "UNSAFE_componentWillMount"), typeof g.componentWillReceiveProps == "function" && g.componentWillReceiveProps.__suppressDeprecationWarning !== !0 ? U = "componentWillReceiveProps" : typeof g.UNSAFE_componentWillReceiveProps == "function" && (U = "UNSAFE_componentWillReceiveProps"), typeof g.componentWillUpdate == "function" && g.componentWillUpdate.__suppressDeprecationWarning !== !0 ? j = "componentWillUpdate" : typeof g.UNSAFE_componentWillUpdate == "function" && (j = "UNSAFE_componentWillUpdate"), M !== null || U !== null || j !== null) {
            var le = gt(t) || "Component", Me = typeof t.getDerivedStateFromProps == "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
            qg.has(le) || (qg.add(le), S(`Unsafe legacy lifecycles will not be called for components using new component APIs.

%s uses %s but also contains the following legacy lifecycles:%s%s%s

The above lifecycles should be removed. Learn more about this warning here:
https://reactjs.org/link/unsafe-component-lifecycles`, le, Me, M !== null ? `
  ` + M : "", U !== null ? `
  ` + U : "", j !== null ? `
  ` + j : ""));
          }
        }
      }
      return i && IE(e, u, s), g;
    }
    function Gw(e, t) {
      var a = t.state;
      typeof t.componentWillMount == "function" && t.componentWillMount(), typeof t.UNSAFE_componentWillMount == "function" && t.UNSAFE_componentWillMount(), a !== t.state && (S("%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", Ye(e) || "Component"), tS.enqueueReplaceState(t, t.state, null));
    }
    function r0(e, t, a, i) {
      var u = t.state;
      if (typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(a, i), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(a, i), t.state !== u) {
        {
          var s = Ye(e) || "Component";
          Qg.has(s) || (Qg.add(s), S("%s.componentWillReceiveProps(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", s));
        }
        tS.enqueueReplaceState(t, t.state, null);
      }
    }
    function nS(e, t, a, i) {
      Ww(e, t, a);
      var u = e.stateNode;
      u.props = a, u.state = e.memoizedState, u.refs = {}, fg(e);
      var s = t.contextType;
      if (typeof s == "object" && s !== null)
        u.context = tr(s);
      else {
        var f = Ef(e, t, !0);
        u.context = Cf(e, f);
      }
      {
        if (u.state === a) {
          var p = gt(t) || "Component";
          Kg.has(p) || (Kg.add(p), S("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.", p));
        }
        e.mode & Yt && tl.recordLegacyContextWarning(e, u), tl.recordUnsafeLifecycleWarnings(e, u);
      }
      u.state = e.memoizedState;
      var v = t.getDerivedStateFromProps;
      if (typeof v == "function" && (eS(e, t, v, a), u.state = e.memoizedState), typeof t.getDerivedStateFromProps != "function" && typeof u.getSnapshotBeforeUpdate != "function" && (typeof u.UNSAFE_componentWillMount == "function" || typeof u.componentWillMount == "function") && (Gw(e, u), qh(e, a, u, i), u.state = e.memoizedState), typeof u.componentDidMount == "function") {
        var y = vt;
        y |= Yi, (e.mode & bt) !== ke && (y |= xl), e.flags |= y;
      }
    }
    function qw(e, t, a, i) {
      var u = e.stateNode, s = e.memoizedProps;
      u.props = s;
      var f = u.context, p = t.contextType, v = ii;
      if (typeof p == "object" && p !== null)
        v = tr(p);
      else {
        var y = Ef(e, t, !0);
        v = Cf(e, y);
      }
      var g = t.getDerivedStateFromProps, b = typeof g == "function" || typeof u.getSnapshotBeforeUpdate == "function";
      !b && (typeof u.UNSAFE_componentWillReceiveProps == "function" || typeof u.componentWillReceiveProps == "function") && (s !== a || f !== v) && r0(e, u, a, v), gC();
      var w = e.memoizedState, M = u.state = w;
      if (qh(e, a, u, i), M = e.memoizedState, s === a && w === M && !Oh() && !Xh()) {
        if (typeof u.componentDidMount == "function") {
          var U = vt;
          U |= Yi, (e.mode & bt) !== ke && (U |= xl), e.flags |= U;
        }
        return !1;
      }
      typeof g == "function" && (eS(e, t, g, a), M = e.memoizedState);
      var j = Xh() || e0(e, t, s, a, w, M, v);
      if (j) {
        if (!b && (typeof u.UNSAFE_componentWillMount == "function" || typeof u.componentWillMount == "function") && (typeof u.componentWillMount == "function" && u.componentWillMount(), typeof u.UNSAFE_componentWillMount == "function" && u.UNSAFE_componentWillMount()), typeof u.componentDidMount == "function") {
          var le = vt;
          le |= Yi, (e.mode & bt) !== ke && (le |= xl), e.flags |= le;
        }
      } else {
        if (typeof u.componentDidMount == "function") {
          var Me = vt;
          Me |= Yi, (e.mode & bt) !== ke && (Me |= xl), e.flags |= Me;
        }
        e.memoizedProps = a, e.memoizedState = M;
      }
      return u.props = a, u.state = M, u.context = v, j;
    }
    function Xw(e, t, a, i, u) {
      var s = t.stateNode;
      yC(e, t);
      var f = t.memoizedProps, p = t.type === t.elementType ? f : al(t.type, f);
      s.props = p;
      var v = t.pendingProps, y = s.context, g = a.contextType, b = ii;
      if (typeof g == "object" && g !== null)
        b = tr(g);
      else {
        var w = Ef(t, a, !0);
        b = Cf(t, w);
      }
      var M = a.getDerivedStateFromProps, U = typeof M == "function" || typeof s.getSnapshotBeforeUpdate == "function";
      !U && (typeof s.UNSAFE_componentWillReceiveProps == "function" || typeof s.componentWillReceiveProps == "function") && (f !== v || y !== b) && r0(t, s, i, b), gC();
      var j = t.memoizedState, le = s.state = j;
      if (qh(t, i, s, u), le = t.memoizedState, f === v && j === le && !Oh() && !Xh() && !Ee)
        return typeof s.componentDidUpdate == "function" && (f !== e.memoizedProps || j !== e.memoizedState) && (t.flags |= vt), typeof s.getSnapshotBeforeUpdate == "function" && (f !== e.memoizedProps || j !== e.memoizedState) && (t.flags |= In), !1;
      typeof M == "function" && (eS(t, a, M, i), le = t.memoizedState);
      var Me = Xh() || e0(t, a, p, i, j, le, b) || // TODO: In some cases, we'll end up checking if context has changed twice,
      // both before and after `shouldComponentUpdate` has been called. Not ideal,
      // but I'm loath to refactor this function. This only happens for memoized
      // components so it's not that common.
      Ee;
      return Me ? (!U && (typeof s.UNSAFE_componentWillUpdate == "function" || typeof s.componentWillUpdate == "function") && (typeof s.componentWillUpdate == "function" && s.componentWillUpdate(i, le, b), typeof s.UNSAFE_componentWillUpdate == "function" && s.UNSAFE_componentWillUpdate(i, le, b)), typeof s.componentDidUpdate == "function" && (t.flags |= vt), typeof s.getSnapshotBeforeUpdate == "function" && (t.flags |= In)) : (typeof s.componentDidUpdate == "function" && (f !== e.memoizedProps || j !== e.memoizedState) && (t.flags |= vt), typeof s.getSnapshotBeforeUpdate == "function" && (f !== e.memoizedProps || j !== e.memoizedState) && (t.flags |= In), t.memoizedProps = i, t.memoizedState = le), s.props = i, s.state = le, s.context = b, Me;
    }
    function Ks(e, t) {
      return {
        value: e,
        source: t,
        stack: ji(t),
        digest: null
      };
    }
    function rS(e, t, a) {
      return {
        value: e,
        source: null,
        stack: a ?? null,
        digest: t ?? null
      };
    }
    function Kw(e, t) {
      return !0;
    }
    function aS(e, t) {
      try {
        var a = Kw(e, t);
        if (a === !1)
          return;
        var i = t.value, u = t.source, s = t.stack, f = s !== null ? s : "";
        if (i != null && i._suppressLogging) {
          if (e.tag === pe)
            return;
          console.error(i);
        }
        var p = u ? Ye(u) : null, v = p ? "The above error occurred in the <" + p + "> component:" : "The above error occurred in one of your React components:", y;
        if (e.tag === ae)
          y = `Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.`;
        else {
          var g = Ye(e) || "Anonymous";
          y = "React will try to recreate this component tree from scratch " + ("using the error boundary you provided, " + g + ".");
        }
        var b = v + `
` + f + `

` + ("" + y);
        console.error(b);
      } catch (w) {
        setTimeout(function() {
          throw w;
        });
      }
    }
    var Zw = typeof WeakMap == "function" ? WeakMap : Map;
    function a0(e, t, a) {
      var i = Au(Wt, a);
      i.tag = sg, i.payload = {
        element: null
      };
      var u = t.value;
      return i.callback = function() {
        Yb(u), aS(e, t);
      }, i;
    }
    function iS(e, t, a) {
      var i = Au(Wt, a);
      i.tag = sg;
      var u = e.type.getDerivedStateFromError;
      if (typeof u == "function") {
        var s = t.value;
        i.payload = function() {
          return u(s);
        }, i.callback = function() {
          hR(e), aS(e, t);
        };
      }
      var f = e.stateNode;
      return f !== null && typeof f.componentDidCatch == "function" && (i.callback = function() {
        hR(e), aS(e, t), typeof u != "function" && Bb(this);
        var v = t.value, y = t.stack;
        this.componentDidCatch(v, {
          componentStack: y !== null ? y : ""
        }), typeof u != "function" && (ta(e.lanes, Fe) || S("%s: Error boundaries should implement getDerivedStateFromError(). In that method, return a state update to display an error message or fallback UI.", Ye(e) || "Unknown"));
      }), i;
    }
    function i0(e, t, a) {
      var i = e.pingCache, u;
      if (i === null ? (i = e.pingCache = new Zw(), u = /* @__PURE__ */ new Set(), i.set(t, u)) : (u = i.get(t), u === void 0 && (u = /* @__PURE__ */ new Set(), i.set(t, u))), !u.has(a)) {
        u.add(a);
        var s = Ib.bind(null, e, t, a);
        Jr && Yp(e, a), t.then(s, s);
      }
    }
    function Jw(e, t, a, i) {
      var u = e.updateQueue;
      if (u === null) {
        var s = /* @__PURE__ */ new Set();
        s.add(a), e.updateQueue = s;
      } else
        u.add(a);
    }
    function ex(e, t) {
      var a = e.tag;
      if ((e.mode & at) === ke && (a === Te || a === We || a === je)) {
        var i = e.alternate;
        i ? (e.updateQueue = i.updateQueue, e.memoizedState = i.memoizedState, e.lanes = i.lanes) : (e.updateQueue = null, e.memoizedState = null);
      }
    }
    function l0(e) {
      var t = e;
      do {
        if (t.tag === xe && zw(t))
          return t;
        t = t.return;
      } while (t !== null);
      return null;
    }
    function u0(e, t, a, i, u) {
      if ((e.mode & at) === ke) {
        if (e === t)
          e.flags |= Kn;
        else {
          if (e.flags |= Re, a.flags |= Rc, a.flags &= -52805, a.tag === pe) {
            var s = a.alternate;
            if (s === null)
              a.tag = Ut;
            else {
              var f = Au(Wt, Fe);
              f.tag = Ih, Lo(a, f, Fe);
            }
          }
          a.lanes = qe(a.lanes, Fe);
        }
        return e;
      }
      return e.flags |= Kn, e.lanes = u, e;
    }
    function tx(e, t, a, i, u) {
      if (a.flags |= ls, Jr && Yp(e, u), i !== null && typeof i == "object" && typeof i.then == "function") {
        var s = i;
        ex(a), Fr() && a.mode & at && ZE();
        var f = l0(t);
        if (f !== null) {
          f.flags &= ~Tr, u0(f, t, a, e, u), f.mode & at && i0(e, s, u), Jw(f, e, s);
          return;
        } else {
          if (!zv(u)) {
            i0(e, s, u), jS();
            return;
          }
          var p = new Error("A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator. To fix, updates that suspend should be wrapped with startTransition.");
          i = p;
        }
      } else if (Fr() && a.mode & at) {
        ZE();
        var v = l0(t);
        if (v !== null) {
          (v.flags & Kn) === De && (v.flags |= Tr), u0(v, t, a, e, u), Ky(Ks(i, a));
          return;
        }
      }
      i = Ks(i, a), zb(i);
      var y = t;
      do {
        switch (y.tag) {
          case ae: {
            var g = i;
            y.flags |= Kn;
            var b = Cs(u);
            y.lanes = qe(y.lanes, b);
            var w = a0(y, g, b);
            dg(y, w);
            return;
          }
          case pe:
            var M = i, U = y.type, j = y.stateNode;
            if ((y.flags & Re) === De && (typeof U.getDerivedStateFromError == "function" || j !== null && typeof j.componentDidCatch == "function" && !lR(j))) {
              y.flags |= Kn;
              var le = Cs(u);
              y.lanes = qe(y.lanes, le);
              var Me = iS(y, M, le);
              dg(y, Me);
              return;
            }
            break;
        }
        y = y.return;
      } while (y !== null);
    }
    function nx() {
      return null;
    }
    var Dp = F.ReactCurrentOwner, il = !1, lS, kp, uS, oS, sS, Zs, cS, Em, Op;
    lS = {}, kp = {}, uS = {}, oS = {}, sS = {}, Zs = !1, cS = {}, Em = {}, Op = {};
    function Sa(e, t, a, i) {
      e === null ? t.child = cC(t, null, a, i) : t.child = xf(t, e.child, a, i);
    }
    function rx(e, t, a, i) {
      t.child = xf(t, e.child, null, i), t.child = xf(t, null, a, i);
    }
    function o0(e, t, a, i, u) {
      if (t.type !== t.elementType) {
        var s = a.propTypes;
        s && Ji(
          s,
          i,
          // Resolved props
          "prop",
          gt(a)
        );
      }
      var f = a.render, p = t.ref, v, y;
      _f(t, u), ha(t);
      {
        if (Dp.current = t, Yn(!0), v = Nf(e, t, f, i, p, u), y = zf(), t.mode & Yt) {
          mn(!0);
          try {
            v = Nf(e, t, f, i, p, u), y = zf();
          } finally {
            mn(!1);
          }
        }
        Yn(!1);
      }
      return ma(), e !== null && !il ? (wC(e, t, u), Fu(e, t, u)) : (Fr() && y && Iy(t), t.flags |= ei, Sa(e, t, v, u), t.child);
    }
    function s0(e, t, a, i, u) {
      if (e === null) {
        var s = a.type;
        if (o_(s) && a.compare === null && // SimpleMemoComponent codepath doesn't resolve outer props either.
        a.defaultProps === void 0) {
          var f = s;
          return f = Bf(s), t.tag = je, t.type = f, pS(t, s), c0(e, t, f, i, u);
        }
        {
          var p = s.propTypes;
          if (p && Ji(
            p,
            i,
            // Resolved props
            "prop",
            gt(s)
          ), a.defaultProps !== void 0) {
            var v = gt(s) || "Unknown";
            Op[v] || (S("%s: Support for defaultProps will be removed from memo components in a future major release. Use JavaScript default parameters instead.", v), Op[v] = !0);
          }
        }
        var y = qS(a.type, null, i, t, t.mode, u);
        return y.ref = t.ref, y.return = t, t.child = y, y;
      }
      {
        var g = a.type, b = g.propTypes;
        b && Ji(
          b,
          i,
          // Resolved props
          "prop",
          gt(g)
        );
      }
      var w = e.child, M = SS(e, u);
      if (!M) {
        var U = w.memoizedProps, j = a.compare;
        if (j = j !== null ? j : he, j(U, i) && e.ref === t.ref)
          return Fu(e, t, u);
      }
      t.flags |= ei;
      var le = rc(w, i);
      return le.ref = t.ref, le.return = t, t.child = le, le;
    }
    function c0(e, t, a, i, u) {
      if (t.type !== t.elementType) {
        var s = t.elementType;
        if (s.$$typeof === Oe) {
          var f = s, p = f._payload, v = f._init;
          try {
            s = v(p);
          } catch {
            s = null;
          }
          var y = s && s.propTypes;
          y && Ji(
            y,
            i,
            // Resolved (SimpleMemoComponent has no defaultProps)
            "prop",
            gt(s)
          );
        }
      }
      if (e !== null) {
        var g = e.memoizedProps;
        if (he(g, i) && e.ref === t.ref && // Prevent bailout if the implementation changed due to hot reload.
        t.type === e.type)
          if (il = !1, t.pendingProps = i = g, SS(e, u))
            (e.flags & Rc) !== De && (il = !0);
          else return t.lanes = e.lanes, Fu(e, t, u);
      }
      return fS(e, t, a, i, u);
    }
    function f0(e, t, a) {
      var i = t.pendingProps, u = i.children, s = e !== null ? e.memoizedState : null;
      if (i.mode === "hidden" || ne)
        if ((t.mode & at) === ke) {
          var f = {
            baseLanes: B,
            cachePool: null,
            transitions: null
          };
          t.memoizedState = f, Nm(t, a);
        } else if (ta(a, ea)) {
          var b = {
            baseLanes: B,
            cachePool: null,
            transitions: null
          };
          t.memoizedState = b;
          var w = s !== null ? s.baseLanes : a;
          Nm(t, w);
        } else {
          var p = null, v;
          if (s !== null) {
            var y = s.baseLanes;
            v = qe(y, a);
          } else
            v = a;
          t.lanes = t.childLanes = ea;
          var g = {
            baseLanes: v,
            cachePool: p,
            transitions: null
          };
          return t.memoizedState = g, t.updateQueue = null, Nm(t, v), null;
        }
      else {
        var M;
        s !== null ? (M = qe(s.baseLanes, a), t.memoizedState = null) : M = a, Nm(t, M);
      }
      return Sa(e, t, u, a), t.child;
    }
    function ax(e, t, a) {
      var i = t.pendingProps;
      return Sa(e, t, i, a), t.child;
    }
    function ix(e, t, a) {
      var i = t.pendingProps.children;
      return Sa(e, t, i, a), t.child;
    }
    function lx(e, t, a) {
      {
        t.flags |= vt;
        {
          var i = t.stateNode;
          i.effectDuration = 0, i.passiveEffectDuration = 0;
        }
      }
      var u = t.pendingProps, s = u.children;
      return Sa(e, t, s, a), t.child;
    }
    function d0(e, t) {
      var a = t.ref;
      (e === null && a !== null || e !== null && e.ref !== a) && (t.flags |= Sn, t.flags |= fo);
    }
    function fS(e, t, a, i, u) {
      if (t.type !== t.elementType) {
        var s = a.propTypes;
        s && Ji(
          s,
          i,
          // Resolved props
          "prop",
          gt(a)
        );
      }
      var f;
      {
        var p = Ef(t, a, !0);
        f = Cf(t, p);
      }
      var v, y;
      _f(t, u), ha(t);
      {
        if (Dp.current = t, Yn(!0), v = Nf(e, t, a, i, f, u), y = zf(), t.mode & Yt) {
          mn(!0);
          try {
            v = Nf(e, t, a, i, f, u), y = zf();
          } finally {
            mn(!1);
          }
        }
        Yn(!1);
      }
      return ma(), e !== null && !il ? (wC(e, t, u), Fu(e, t, u)) : (Fr() && y && Iy(t), t.flags |= ei, Sa(e, t, v, u), t.child);
    }
    function p0(e, t, a, i, u) {
      {
        switch (T_(t)) {
          case !1: {
            var s = t.stateNode, f = t.type, p = new f(t.memoizedProps, s.context), v = p.state;
            s.updater.enqueueSetState(s, v, null);
            break;
          }
          case !0: {
            t.flags |= Re, t.flags |= Kn;
            var y = new Error("Simulated error coming from DevTools"), g = Cs(u);
            t.lanes = qe(t.lanes, g);
            var b = iS(t, Ks(y, t), g);
            dg(t, b);
            break;
          }
        }
        if (t.type !== t.elementType) {
          var w = a.propTypes;
          w && Ji(
            w,
            i,
            // Resolved props
            "prop",
            gt(a)
          );
        }
      }
      var M;
      Bl(a) ? (M = !0, Mh(t)) : M = !1, _f(t, u);
      var U = t.stateNode, j;
      U === null ? (Rm(e, t), n0(t, a, i), nS(t, a, i, u), j = !0) : e === null ? j = qw(t, a, i, u) : j = Xw(e, t, a, i, u);
      var le = dS(e, t, a, j, M, u);
      {
        var Me = t.stateNode;
        j && Me.props !== i && (Zs || S("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.", Ye(t) || "a component"), Zs = !0);
      }
      return le;
    }
    function dS(e, t, a, i, u, s) {
      d0(e, t);
      var f = (t.flags & Re) !== De;
      if (!i && !f)
        return u && GE(t, a, !1), Fu(e, t, s);
      var p = t.stateNode;
      Dp.current = t;
      var v;
      if (f && typeof a.getDerivedStateFromError != "function")
        v = null, KC();
      else {
        ha(t);
        {
          if (Yn(!0), v = p.render(), t.mode & Yt) {
            mn(!0);
            try {
              p.render();
            } finally {
              mn(!1);
            }
          }
          Yn(!1);
        }
        ma();
      }
      return t.flags |= ei, e !== null && f ? rx(e, t, v, s) : Sa(e, t, v, s), t.memoizedState = p.state, u && GE(t, a, !0), t.child;
    }
    function v0(e) {
      var t = e.stateNode;
      t.pendingContext ? QE(e, t.pendingContext, t.pendingContext !== t.context) : t.context && QE(e, t.context, !1), pg(e, t.containerInfo);
    }
    function ux(e, t, a) {
      if (v0(t), e === null)
        throw new Error("Should have a current fiber. This is a bug in React.");
      var i = t.pendingProps, u = t.memoizedState, s = u.element;
      yC(e, t), qh(t, i, null, a);
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
        }, y = t.updateQueue;
        if (y.baseState = v, t.memoizedState = v, t.flags & Tr) {
          var g = Ks(new Error("There was an error while hydrating. Because the error happened outside of a Suspense boundary, the entire root will switch to client rendering."), t);
          return h0(e, t, p, a, g);
        } else if (p !== s) {
          var b = Ks(new Error("This root received an early update, before anything was able hydrate. Switched the entire root to client rendering."), t);
          return h0(e, t, p, a, b);
        } else {
          cw(t);
          var w = cC(t, null, p, a);
          t.child = w;
          for (var M = w; M; )
            M.flags = M.flags & ~hn | Xr, M = M.sibling;
        }
      } else {
        if (wf(), p === s)
          return Fu(e, t, a);
        Sa(e, t, p, a);
      }
      return t.child;
    }
    function h0(e, t, a, i, u) {
      return wf(), Ky(u), t.flags |= Tr, Sa(e, t, a, i), t.child;
    }
    function ox(e, t, a) {
      CC(t), e === null && Xy(t);
      var i = t.type, u = t.pendingProps, s = e !== null ? e.memoizedProps : null, f = u.children, p = Ly(i, u);
      return p ? f = null : s !== null && Ly(i, s) && (t.flags |= Oa), d0(e, t), Sa(e, t, f, a), t.child;
    }
    function sx(e, t) {
      return e === null && Xy(t), null;
    }
    function cx(e, t, a, i) {
      Rm(e, t);
      var u = t.pendingProps, s = a, f = s._payload, p = s._init, v = p(f);
      t.type = v;
      var y = t.tag = s_(v), g = al(v, u), b;
      switch (y) {
        case Te:
          return pS(t, v), t.type = v = Bf(v), b = fS(null, t, v, g, i), b;
        case pe:
          return t.type = v = $S(v), b = p0(null, t, v, g, i), b;
        case We:
          return t.type = v = YS(v), b = o0(null, t, v, g, i), b;
        case lt: {
          if (t.type !== t.elementType) {
            var w = v.propTypes;
            w && Ji(
              w,
              g,
              // Resolved for outer only
              "prop",
              gt(v)
            );
          }
          return b = s0(
            null,
            t,
            v,
            al(v.type, g),
            // The inner type can have defaults too
            i
          ), b;
        }
      }
      var M = "";
      throw v !== null && typeof v == "object" && v.$$typeof === Oe && (M = " Did you wrap a component in React.lazy() more than once?"), new Error("Element type is invalid. Received a promise that resolves to: " + v + ". " + ("Lazy element type must resolve to a class or function." + M));
    }
    function fx(e, t, a, i, u) {
      Rm(e, t), t.tag = pe;
      var s;
      return Bl(a) ? (s = !0, Mh(t)) : s = !1, _f(t, u), n0(t, a, i), nS(t, a, i, u), dS(null, t, a, !0, s, u);
    }
    function dx(e, t, a, i) {
      Rm(e, t);
      var u = t.pendingProps, s;
      {
        var f = Ef(t, a, !1);
        s = Cf(t, f);
      }
      _f(t, i);
      var p, v;
      ha(t);
      {
        if (a.prototype && typeof a.prototype.render == "function") {
          var y = gt(a) || "Unknown";
          lS[y] || (S("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.", y, y), lS[y] = !0);
        }
        t.mode & Yt && tl.recordLegacyContextWarning(t, null), Yn(!0), Dp.current = t, p = Nf(null, t, a, u, s, i), v = zf(), Yn(!1);
      }
      if (ma(), t.flags |= ei, typeof p == "object" && p !== null && typeof p.render == "function" && p.$$typeof === void 0) {
        var g = gt(a) || "Unknown";
        kp[g] || (S("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", g, g, g), kp[g] = !0);
      }
      if (
        // Run these checks in production only if the flag is off.
        // Eventually we'll delete this branch altogether.
        typeof p == "object" && p !== null && typeof p.render == "function" && p.$$typeof === void 0
      ) {
        {
          var b = gt(a) || "Unknown";
          kp[b] || (S("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", b, b, b), kp[b] = !0);
        }
        t.tag = pe, t.memoizedState = null, t.updateQueue = null;
        var w = !1;
        return Bl(a) ? (w = !0, Mh(t)) : w = !1, t.memoizedState = p.state !== null && p.state !== void 0 ? p.state : null, fg(t), t0(t, p), nS(t, a, u, i), dS(null, t, a, !0, w, i);
      } else {
        if (t.tag = Te, t.mode & Yt) {
          mn(!0);
          try {
            p = Nf(null, t, a, u, s, i), v = zf();
          } finally {
            mn(!1);
          }
        }
        return Fr() && v && Iy(t), Sa(null, t, p, i), pS(t, a), t.child;
      }
    }
    function pS(e, t) {
      {
        if (t && t.childContextTypes && S("%s(...): childContextTypes cannot be defined on a function component.", t.displayName || t.name || "Component"), e.ref !== null) {
          var a = "", i = Or();
          i && (a += `

Check the render method of \`` + i + "`.");
          var u = i || "", s = e._debugSource;
          s && (u = s.fileName + ":" + s.lineNumber), sS[u] || (sS[u] = !0, S("Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?%s", a));
        }
        if (t.defaultProps !== void 0) {
          var f = gt(t) || "Unknown";
          Op[f] || (S("%s: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.", f), Op[f] = !0);
        }
        if (typeof t.getDerivedStateFromProps == "function") {
          var p = gt(t) || "Unknown";
          oS[p] || (S("%s: Function components do not support getDerivedStateFromProps.", p), oS[p] = !0);
        }
        if (typeof t.contextType == "object" && t.contextType !== null) {
          var v = gt(t) || "Unknown";
          uS[v] || (S("%s: Function components do not support contextType.", v), uS[v] = !0);
        }
      }
    }
    var vS = {
      dehydrated: null,
      treeContext: null,
      retryLane: Rt
    };
    function hS(e) {
      return {
        baseLanes: e,
        cachePool: nx(),
        transitions: null
      };
    }
    function px(e, t) {
      var a = null;
      return {
        baseLanes: qe(e.baseLanes, t),
        cachePool: a,
        transitions: e.transitions
      };
    }
    function vx(e, t, a, i) {
      if (t !== null) {
        var u = t.memoizedState;
        if (u === null)
          return !1;
      }
      return mg(e, Sp);
    }
    function hx(e, t) {
      return Rs(e.childLanes, t);
    }
    function m0(e, t, a) {
      var i = t.pendingProps;
      w_(t) && (t.flags |= Re);
      var u = nl.current, s = !1, f = (t.flags & Re) !== De;
      if (f || vx(u, e) ? (s = !0, t.flags &= ~Re) : (e === null || e.memoizedState !== null) && (u = Nw(u, TC)), u = kf(u), No(t, u), e === null) {
        Xy(t);
        var p = t.memoizedState;
        if (p !== null) {
          var v = p.dehydrated;
          if (v !== null)
            return Ex(t, v);
        }
        var y = i.children, g = i.fallback;
        if (s) {
          var b = mx(t, y, g, a), w = t.child;
          return w.memoizedState = hS(a), t.memoizedState = vS, b;
        } else
          return mS(t, y);
      } else {
        var M = e.memoizedState;
        if (M !== null) {
          var U = M.dehydrated;
          if (U !== null)
            return Cx(e, t, f, i, U, M, a);
        }
        if (s) {
          var j = i.fallback, le = i.children, Me = gx(e, t, le, j, a), Ce = t.child, yt = e.child.memoizedState;
          return Ce.memoizedState = yt === null ? hS(a) : px(yt, a), Ce.childLanes = hx(e, a), t.memoizedState = vS, Me;
        } else {
          var ft = i.children, k = yx(e, t, ft, a);
          return t.memoizedState = null, k;
        }
      }
    }
    function mS(e, t, a) {
      var i = e.mode, u = {
        mode: "visible",
        children: t
      }, s = yS(u, i);
      return s.return = e, e.child = s, s;
    }
    function mx(e, t, a, i) {
      var u = e.mode, s = e.child, f = {
        mode: "hidden",
        children: t
      }, p, v;
      return (u & at) === ke && s !== null ? (p = s, p.childLanes = B, p.pendingProps = f, e.mode & xt && (p.actualDuration = 0, p.actualStartTime = -1, p.selfBaseDuration = 0, p.treeBaseDuration = 0), v = Po(a, u, i, null)) : (p = yS(f, u), v = Po(a, u, i, null)), p.return = e, v.return = e, p.sibling = v, e.child = p, v;
    }
    function yS(e, t, a) {
      return yR(e, t, B, null);
    }
    function y0(e, t) {
      return rc(e, t);
    }
    function yx(e, t, a, i) {
      var u = e.child, s = u.sibling, f = y0(u, {
        mode: "visible",
        children: a
      });
      if ((t.mode & at) === ke && (f.lanes = i), f.return = t, f.sibling = null, s !== null) {
        var p = t.deletions;
        p === null ? (t.deletions = [s], t.flags |= ka) : p.push(s);
      }
      return t.child = f, f;
    }
    function gx(e, t, a, i, u) {
      var s = t.mode, f = e.child, p = f.sibling, v = {
        mode: "hidden",
        children: a
      }, y;
      if (
        // In legacy mode, we commit the primary tree as if it successfully
        // completed, even though it's in an inconsistent state.
        (s & at) === ke && // Make sure we're on the second pass, i.e. the primary child fragment was
        // already cloned. In legacy mode, the only case where this isn't true is
        // when DevTools forces us to display a fallback; we skip the first render
        // pass entirely and go straight to rendering the fallback. (In Concurrent
        // Mode, SuspenseList can also trigger this scenario, but this is a legacy-
        // only codepath.)
        t.child !== f
      ) {
        var g = t.child;
        y = g, y.childLanes = B, y.pendingProps = v, t.mode & xt && (y.actualDuration = 0, y.actualStartTime = -1, y.selfBaseDuration = f.selfBaseDuration, y.treeBaseDuration = f.treeBaseDuration), t.deletions = null;
      } else
        y = y0(f, v), y.subtreeFlags = f.subtreeFlags & Nn;
      var b;
      return p !== null ? b = rc(p, i) : (b = Po(i, s, u, null), b.flags |= hn), b.return = t, y.return = t, y.sibling = b, t.child = y, b;
    }
    function Cm(e, t, a, i) {
      i !== null && Ky(i), xf(t, e.child, null, a);
      var u = t.pendingProps, s = u.children, f = mS(t, s);
      return f.flags |= hn, t.memoizedState = null, f;
    }
    function Sx(e, t, a, i, u) {
      var s = t.mode, f = {
        mode: "visible",
        children: a
      }, p = yS(f, s), v = Po(i, s, u, null);
      return v.flags |= hn, p.return = t, v.return = t, p.sibling = v, t.child = p, (t.mode & at) !== ke && xf(t, e.child, null, u), v;
    }
    function Ex(e, t, a) {
      return (e.mode & at) === ke ? (S("Cannot hydrate Suspense in legacy mode. Switch from ReactDOM.hydrate(element, container) to ReactDOMClient.hydrateRoot(container, <App />).render(element) or remove the Suspense components from the server rendered components."), e.lanes = Fe) : Uy(t) ? e.lanes = wr : e.lanes = ea, null;
    }
    function Cx(e, t, a, i, u, s, f) {
      if (a)
        if (t.flags & Tr) {
          t.flags &= ~Tr;
          var k = rS(new Error("There was an error while hydrating this Suspense boundary. Switched to client rendering."));
          return Cm(e, t, f, k);
        } else {
          if (t.memoizedState !== null)
            return t.child = e.child, t.flags |= Re, null;
          var H = i.children, O = i.fallback, G = Sx(e, t, H, O, f), fe = t.child;
          return fe.memoizedState = hS(f), t.memoizedState = vS, G;
        }
      else {
        if (ow(), (t.mode & at) === ke)
          return Cm(
            e,
            t,
            f,
            // TODO: When we delete legacy mode, we should make this error argument
            // required — every concurrent mode path that causes hydration to
            // de-opt to client rendering should have an error message.
            null
          );
        if (Uy(u)) {
          var p, v, y;
          {
            var g = x1(u);
            p = g.digest, v = g.message, y = g.stack;
          }
          var b;
          v ? b = new Error(v) : b = new Error("The server could not finish this Suspense boundary, likely due to an error during server rendering. Switched to client rendering.");
          var w = rS(b, p, y);
          return Cm(e, t, f, w);
        }
        var M = ta(f, e.childLanes);
        if (il || M) {
          var U = Mm();
          if (U !== null) {
            var j = Nd(U, f);
            if (j !== Rt && j !== s.retryLane) {
              s.retryLane = j;
              var le = Wt;
              Ha(e, j), yr(U, e, j, le);
            }
          }
          jS();
          var Me = rS(new Error("This Suspense boundary received an update before it finished hydrating. This caused the boundary to switch to client rendering. The usual way to fix this is to wrap the original update in startTransition."));
          return Cm(e, t, f, Me);
        } else if (VE(u)) {
          t.flags |= Re, t.child = e.child;
          var Ce = Qb.bind(null, e);
          return b1(u, Ce), null;
        } else {
          fw(t, u, s.treeContext);
          var yt = i.children, ft = mS(t, yt);
          return ft.flags |= Xr, ft;
        }
      }
    }
    function g0(e, t, a) {
      e.lanes = qe(e.lanes, t);
      var i = e.alternate;
      i !== null && (i.lanes = qe(i.lanes, t)), ug(e.return, t, a);
    }
    function Rx(e, t, a) {
      for (var i = t; i !== null; ) {
        if (i.tag === xe) {
          var u = i.memoizedState;
          u !== null && g0(i, a, e);
        } else if (i.tag === tn)
          g0(i, a, e);
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
    function Tx(e) {
      for (var t = e, a = null; t !== null; ) {
        var i = t.alternate;
        i !== null && Jh(i) === null && (a = t), t = t.sibling;
      }
      return a;
    }
    function wx(e) {
      if (e !== void 0 && e !== "forwards" && e !== "backwards" && e !== "together" && !cS[e])
        if (cS[e] = !0, typeof e == "string")
          switch (e.toLowerCase()) {
            case "together":
            case "forwards":
            case "backwards": {
              S('"%s" is not a valid value for revealOrder on <SuspenseList />. Use lowercase "%s" instead.', e, e.toLowerCase());
              break;
            }
            case "forward":
            case "backward": {
              S('"%s" is not a valid value for revealOrder on <SuspenseList />. React uses the -s suffix in the spelling. Use "%ss" instead.', e, e.toLowerCase());
              break;
            }
            default:
              S('"%s" is not a supported revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?', e);
              break;
          }
        else
          S('%s is not a supported value for revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?', e);
    }
    function xx(e, t) {
      e !== void 0 && !Em[e] && (e !== "collapsed" && e !== "hidden" ? (Em[e] = !0, S('"%s" is not a supported value for tail on <SuspenseList />. Did you mean "collapsed" or "hidden"?', e)) : t !== "forwards" && t !== "backwards" && (Em[e] = !0, S('<SuspenseList tail="%s" /> is only valid if revealOrder is "forwards" or "backwards". Did you mean to specify revealOrder="forwards"?', e)));
    }
    function S0(e, t) {
      {
        var a = et(e), i = !a && typeof Mt(e) == "function";
        if (a || i) {
          var u = a ? "array" : "iterable";
          return S("A nested %s was passed to row #%s in <SuspenseList />. Wrap it in an additional SuspenseList to configure its revealOrder: <SuspenseList revealOrder=...> ... <SuspenseList revealOrder=...>{%s}</SuspenseList> ... </SuspenseList>", u, t, u), !1;
        }
      }
      return !0;
    }
    function bx(e, t) {
      if ((t === "forwards" || t === "backwards") && e !== void 0 && e !== null && e !== !1)
        if (et(e)) {
          for (var a = 0; a < e.length; a++)
            if (!S0(e[a], a))
              return;
        } else {
          var i = Mt(e);
          if (typeof i == "function") {
            var u = i.call(e);
            if (u)
              for (var s = u.next(), f = 0; !s.done; s = u.next()) {
                if (!S0(s.value, f))
                  return;
                f++;
              }
          } else
            S('A single row was passed to a <SuspenseList revealOrder="%s" />. This is not useful since it needs multiple rows. Did you mean to pass multiple children or an array?', t);
        }
    }
    function gS(e, t, a, i, u) {
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
    function E0(e, t, a) {
      var i = t.pendingProps, u = i.revealOrder, s = i.tail, f = i.children;
      wx(u), xx(s, u), bx(f, u), Sa(e, t, f, a);
      var p = nl.current, v = mg(p, Sp);
      if (v)
        p = yg(p, Sp), t.flags |= Re;
      else {
        var y = e !== null && (e.flags & Re) !== De;
        y && Rx(t, t.child, a), p = kf(p);
      }
      if (No(t, p), (t.mode & at) === ke)
        t.memoizedState = null;
      else
        switch (u) {
          case "forwards": {
            var g = Tx(t.child), b;
            g === null ? (b = t.child, t.child = null) : (b = g.sibling, g.sibling = null), gS(
              t,
              !1,
              // isBackwards
              b,
              g,
              s
            );
            break;
          }
          case "backwards": {
            var w = null, M = t.child;
            for (t.child = null; M !== null; ) {
              var U = M.alternate;
              if (U !== null && Jh(U) === null) {
                t.child = M;
                break;
              }
              var j = M.sibling;
              M.sibling = w, w = M, M = j;
            }
            gS(
              t,
              !0,
              // isBackwards
              w,
              null,
              // last
              s
            );
            break;
          }
          case "together": {
            gS(
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
    function _x(e, t, a) {
      pg(t, t.stateNode.containerInfo);
      var i = t.pendingProps;
      return e === null ? t.child = xf(t, null, i, a) : Sa(e, t, i, a), t.child;
    }
    var C0 = !1;
    function Dx(e, t, a) {
      var i = t.type, u = i._context, s = t.pendingProps, f = t.memoizedProps, p = s.value;
      {
        "value" in s || C0 || (C0 = !0, S("The `value` prop is required for the `<Context.Provider>`. Did you misspell it or forget to pass it?"));
        var v = t.type.propTypes;
        v && Ji(v, s, "prop", "Context.Provider");
      }
      if (pC(t, u, p), f !== null) {
        var y = f.value;
        if (Q(y, p)) {
          if (f.children === s.children && !Oh())
            return Fu(e, t, a);
        } else
          ww(t, u, a);
      }
      var g = s.children;
      return Sa(e, t, g, a), t.child;
    }
    var R0 = !1;
    function kx(e, t, a) {
      var i = t.type;
      i._context === void 0 ? i !== i.Consumer && (R0 || (R0 = !0, S("Rendering <Context> directly is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?"))) : i = i._context;
      var u = t.pendingProps, s = u.children;
      typeof s != "function" && S("A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it."), _f(t, a);
      var f = tr(i);
      ha(t);
      var p;
      return Dp.current = t, Yn(!0), p = s(f), Yn(!1), ma(), t.flags |= ei, Sa(e, t, p, a), t.child;
    }
    function Lp() {
      il = !0;
    }
    function Rm(e, t) {
      (t.mode & at) === ke && e !== null && (e.alternate = null, t.alternate = null, t.flags |= hn);
    }
    function Fu(e, t, a) {
      return e !== null && (t.dependencies = e.dependencies), KC(), $p(t.lanes), ta(a, t.childLanes) ? (Rw(e, t), t.child) : null;
    }
    function Ox(e, t, a) {
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
        return s === null ? (i.deletions = [e], i.flags |= ka) : s.push(e), a.flags |= hn, a;
      }
    }
    function SS(e, t) {
      var a = e.lanes;
      return !!ta(a, t);
    }
    function Lx(e, t, a) {
      switch (t.tag) {
        case ae:
          v0(t), t.stateNode, wf();
          break;
        case ce:
          CC(t);
          break;
        case pe: {
          var i = t.type;
          Bl(i) && Mh(t);
          break;
        }
        case we:
          pg(t, t.stateNode.containerInfo);
          break;
        case it: {
          var u = t.memoizedProps.value, s = t.type._context;
          pC(t, s, u);
          break;
        }
        case ct:
          {
            var f = ta(a, t.childLanes);
            f && (t.flags |= vt);
            {
              var p = t.stateNode;
              p.effectDuration = 0, p.passiveEffectDuration = 0;
            }
          }
          break;
        case xe: {
          var v = t.memoizedState;
          if (v !== null) {
            if (v.dehydrated !== null)
              return No(t, kf(nl.current)), t.flags |= Re, null;
            var y = t.child, g = y.childLanes;
            if (ta(a, g))
              return m0(e, t, a);
            No(t, kf(nl.current));
            var b = Fu(e, t, a);
            return b !== null ? b.sibling : null;
          } else
            No(t, kf(nl.current));
          break;
        }
        case tn: {
          var w = (e.flags & Re) !== De, M = ta(a, t.childLanes);
          if (w) {
            if (M)
              return E0(e, t, a);
            t.flags |= Re;
          }
          var U = t.memoizedState;
          if (U !== null && (U.rendering = null, U.tail = null, U.lastEffect = null), No(t, nl.current), M)
            break;
          return null;
        }
        case be:
        case Ot:
          return t.lanes = B, f0(e, t, a);
      }
      return Fu(e, t, a);
    }
    function T0(e, t, a) {
      if (t._debugNeedsRemount && e !== null)
        return Ox(e, t, qS(t.type, t.key, t.pendingProps, t._debugOwner || null, t.mode, t.lanes));
      if (e !== null) {
        var i = e.memoizedProps, u = t.pendingProps;
        if (i !== u || Oh() || // Force a re-render if the implementation changed due to hot reload:
        t.type !== e.type)
          il = !0;
        else {
          var s = SS(e, a);
          if (!s && // If this is the second pass of an error or suspense boundary, there
          // may not be work scheduled on `current`, so we check for this flag.
          (t.flags & Re) === De)
            return il = !1, Lx(e, t, a);
          (e.flags & Rc) !== De ? il = !0 : il = !1;
        }
      } else if (il = !1, Fr() && nw(t)) {
        var f = t.index, p = rw();
        KE(t, p, f);
      }
      switch (t.lanes = B, t.tag) {
        case jt:
          return dx(e, t, t.type, a);
        case en: {
          var v = t.elementType;
          return cx(e, t, v, a);
        }
        case Te: {
          var y = t.type, g = t.pendingProps, b = t.elementType === y ? g : al(y, g);
          return fS(e, t, y, b, a);
        }
        case pe: {
          var w = t.type, M = t.pendingProps, U = t.elementType === w ? M : al(w, M);
          return p0(e, t, w, U, a);
        }
        case ae:
          return ux(e, t, a);
        case ce:
          return ox(e, t, a);
        case Qe:
          return sx(e, t);
        case xe:
          return m0(e, t, a);
        case we:
          return _x(e, t, a);
        case We: {
          var j = t.type, le = t.pendingProps, Me = t.elementType === j ? le : al(j, le);
          return o0(e, t, j, Me, a);
        }
        case pt:
          return ax(e, t, a);
        case st:
          return ix(e, t, a);
        case ct:
          return lx(e, t, a);
        case it:
          return Dx(e, t, a);
        case un:
          return kx(e, t, a);
        case lt: {
          var Ce = t.type, yt = t.pendingProps, ft = al(Ce, yt);
          if (t.type !== t.elementType) {
            var k = Ce.propTypes;
            k && Ji(
              k,
              ft,
              // Resolved for outer only
              "prop",
              gt(Ce)
            );
          }
          return ft = al(Ce.type, ft), s0(e, t, Ce, ft, a);
        }
        case je:
          return c0(e, t, t.type, t.pendingProps, a);
        case Ut: {
          var H = t.type, O = t.pendingProps, G = t.elementType === H ? O : al(H, O);
          return fx(e, t, H, G, a);
        }
        case tn:
          return E0(e, t, a);
        case Et:
          break;
        case be:
          return f0(e, t, a);
      }
      throw new Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
    }
    function Uf(e) {
      e.flags |= vt;
    }
    function w0(e) {
      e.flags |= Sn, e.flags |= fo;
    }
    var x0, ES, b0, _0;
    x0 = function(e, t, a, i) {
      for (var u = t.child; u !== null; ) {
        if (u.tag === ce || u.tag === Qe)
          JT(e, u.stateNode);
        else if (u.tag !== we) {
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
    }, ES = function(e, t) {
    }, b0 = function(e, t, a, i, u) {
      var s = e.memoizedProps;
      if (s !== i) {
        var f = t.stateNode, p = vg(), v = t1(f, a, s, i, u, p);
        t.updateQueue = v, v && Uf(t);
      }
    }, _0 = function(e, t, a, i) {
      a !== i && Uf(t);
    };
    function Mp(e, t) {
      if (!Fr())
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
    function Hr(e) {
      var t = e.alternate !== null && e.alternate.child === e.child, a = B, i = De;
      if (t) {
        if ((e.mode & xt) !== ke) {
          for (var v = e.selfBaseDuration, y = e.child; y !== null; )
            a = qe(a, qe(y.lanes, y.childLanes)), i |= y.subtreeFlags & Nn, i |= y.flags & Nn, v += y.treeBaseDuration, y = y.sibling;
          e.treeBaseDuration = v;
        } else
          for (var g = e.child; g !== null; )
            a = qe(a, qe(g.lanes, g.childLanes)), i |= g.subtreeFlags & Nn, i |= g.flags & Nn, g.return = e, g = g.sibling;
        e.subtreeFlags |= i;
      } else {
        if ((e.mode & xt) !== ke) {
          for (var u = e.actualDuration, s = e.selfBaseDuration, f = e.child; f !== null; )
            a = qe(a, qe(f.lanes, f.childLanes)), i |= f.subtreeFlags, i |= f.flags, u += f.actualDuration, s += f.treeBaseDuration, f = f.sibling;
          e.actualDuration = u, e.treeBaseDuration = s;
        } else
          for (var p = e.child; p !== null; )
            a = qe(a, qe(p.lanes, p.childLanes)), i |= p.subtreeFlags, i |= p.flags, p.return = e, p = p.sibling;
        e.subtreeFlags |= i;
      }
      return e.childLanes = a, t;
    }
    function Mx(e, t, a) {
      if (mw() && (t.mode & at) !== ke && (t.flags & Re) === De)
        return aC(t), wf(), t.flags |= Tr | ls | Kn, !1;
      var i = Fh(t);
      if (a !== null && a.dehydrated !== null)
        if (e === null) {
          if (!i)
            throw new Error("A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.");
          if (vw(t), Hr(t), (t.mode & xt) !== ke) {
            var u = a !== null;
            if (u) {
              var s = t.child;
              s !== null && (t.treeBaseDuration -= s.treeBaseDuration);
            }
          }
          return !1;
        } else {
          if (wf(), (t.flags & Re) === De && (t.memoizedState = null), t.flags |= vt, Hr(t), (t.mode & xt) !== ke) {
            var f = a !== null;
            if (f) {
              var p = t.child;
              p !== null && (t.treeBaseDuration -= p.treeBaseDuration);
            }
          }
          return !1;
        }
      else
        return iC(), !0;
    }
    function D0(e, t, a) {
      var i = t.pendingProps;
      switch (Qy(t), t.tag) {
        case jt:
        case en:
        case je:
        case Te:
        case We:
        case pt:
        case st:
        case ct:
        case un:
        case lt:
          return Hr(t), null;
        case pe: {
          var u = t.type;
          return Bl(u) && Lh(t), Hr(t), null;
        }
        case ae: {
          var s = t.stateNode;
          if (Df(t), By(t), Sg(), s.pendingContext && (s.context = s.pendingContext, s.pendingContext = null), e === null || e.child === null) {
            var f = Fh(t);
            if (f)
              Uf(t);
            else if (e !== null) {
              var p = e.memoizedState;
              // Check if this is a client root
              (!p.isDehydrated || // Check if we reverted to client rendering (e.g. due to an error)
              (t.flags & Tr) !== De) && (t.flags |= In, iC());
            }
          }
          return ES(e, t), Hr(t), null;
        }
        case ce: {
          hg(t);
          var v = EC(), y = t.type;
          if (e !== null && t.stateNode != null)
            b0(e, t, y, i, v), e.ref !== t.ref && w0(t);
          else {
            if (!i) {
              if (t.stateNode === null)
                throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
              return Hr(t), null;
            }
            var g = vg(), b = Fh(t);
            if (b)
              dw(t, v, g) && Uf(t);
            else {
              var w = ZT(y, i, v, g, t);
              x0(w, t, !1, !1), t.stateNode = w, e1(w, y, i, v) && Uf(t);
            }
            t.ref !== null && w0(t);
          }
          return Hr(t), null;
        }
        case Qe: {
          var M = i;
          if (e && t.stateNode != null) {
            var U = e.memoizedProps;
            _0(e, t, U, M);
          } else {
            if (typeof M != "string" && t.stateNode === null)
              throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
            var j = EC(), le = vg(), Me = Fh(t);
            Me ? pw(t) && Uf(t) : t.stateNode = n1(M, j, le, t);
          }
          return Hr(t), null;
        }
        case xe: {
          Of(t);
          var Ce = t.memoizedState;
          if (e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
            var yt = Mx(e, t, Ce);
            if (!yt)
              return t.flags & Kn ? t : null;
          }
          if ((t.flags & Re) !== De)
            return t.lanes = a, (t.mode & xt) !== ke && Yg(t), t;
          var ft = Ce !== null, k = e !== null && e.memoizedState !== null;
          if (ft !== k && ft) {
            var H = t.child;
            if (H.flags |= Mn, (t.mode & at) !== ke) {
              var O = e === null && (t.memoizedProps.unstable_avoidThisFallback !== !0 || !0);
              O || mg(nl.current, TC) ? Nb() : jS();
            }
          }
          var G = t.updateQueue;
          if (G !== null && (t.flags |= vt), Hr(t), (t.mode & xt) !== ke && ft) {
            var fe = t.child;
            fe !== null && (t.treeBaseDuration -= fe.treeBaseDuration);
          }
          return null;
        }
        case we:
          return Df(t), ES(e, t), e === null && q1(t.stateNode.containerInfo), Hr(t), null;
        case it:
          var ue = t.type._context;
          return lg(ue, t), Hr(t), null;
        case Ut: {
          var Ve = t.type;
          return Bl(Ve) && Lh(t), Hr(t), null;
        }
        case tn: {
          Of(t);
          var Ge = t.memoizedState;
          if (Ge === null)
            return Hr(t), null;
          var Qt = (t.flags & Re) !== De, Dt = Ge.rendering;
          if (Dt === null)
            if (Qt)
              Mp(Ge, !1);
            else {
              var Gn = Ub() && (e === null || (e.flags & Re) === De);
              if (!Gn)
                for (var kt = t.child; kt !== null; ) {
                  var Hn = Jh(kt);
                  if (Hn !== null) {
                    Qt = !0, t.flags |= Re, Mp(Ge, !1);
                    var oa = Hn.updateQueue;
                    return oa !== null && (t.updateQueue = oa, t.flags |= vt), t.subtreeFlags = De, Tw(t, a), No(t, yg(nl.current, Sp)), t.child;
                  }
                  kt = kt.sibling;
                }
              Ge.tail !== null && Qn() > q0() && (t.flags |= Re, Qt = !0, Mp(Ge, !1), t.lanes = wd);
            }
          else {
            if (!Qt) {
              var Yr = Jh(Dt);
              if (Yr !== null) {
                t.flags |= Re, Qt = !0;
                var ui = Yr.updateQueue;
                if (ui !== null && (t.updateQueue = ui, t.flags |= vt), Mp(Ge, !0), Ge.tail === null && Ge.tailMode === "hidden" && !Dt.alternate && !Fr())
                  return Hr(t), null;
              } else // The time it took to render last row is greater than the remaining
              // time we have to render. So rendering one more row would likely
              // exceed it.
              Qn() * 2 - Ge.renderingStartTime > q0() && a !== ea && (t.flags |= Re, Qt = !0, Mp(Ge, !1), t.lanes = wd);
            }
            if (Ge.isBackwards)
              Dt.sibling = t.child, t.child = Dt;
            else {
              var Ra = Ge.last;
              Ra !== null ? Ra.sibling = Dt : t.child = Dt, Ge.last = Dt;
            }
          }
          if (Ge.tail !== null) {
            var Ta = Ge.tail;
            Ge.rendering = Ta, Ge.tail = Ta.sibling, Ge.renderingStartTime = Qn(), Ta.sibling = null;
            var sa = nl.current;
            return Qt ? sa = yg(sa, Sp) : sa = kf(sa), No(t, sa), Ta;
          }
          return Hr(t), null;
        }
        case Et:
          break;
        case be:
        case Ot: {
          FS(t);
          var Bu = t.memoizedState, $f = Bu !== null;
          if (e !== null) {
            var Gp = e.memoizedState, Xl = Gp !== null;
            Xl !== $f && // LegacyHidden doesn't do any hiding — it only pre-renders.
            !ne && (t.flags |= Mn);
          }
          return !$f || (t.mode & at) === ke ? Hr(t) : ta(ql, ea) && (Hr(t), t.subtreeFlags & (hn | vt) && (t.flags |= Mn)), null;
        }
        case Ct:
          return null;
        case Tt:
          return null;
      }
      throw new Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
    }
    function Nx(e, t, a) {
      switch (Qy(t), t.tag) {
        case pe: {
          var i = t.type;
          Bl(i) && Lh(t);
          var u = t.flags;
          return u & Kn ? (t.flags = u & ~Kn | Re, (t.mode & xt) !== ke && Yg(t), t) : null;
        }
        case ae: {
          t.stateNode, Df(t), By(t), Sg();
          var s = t.flags;
          return (s & Kn) !== De && (s & Re) === De ? (t.flags = s & ~Kn | Re, t) : null;
        }
        case ce:
          return hg(t), null;
        case xe: {
          Of(t);
          var f = t.memoizedState;
          if (f !== null && f.dehydrated !== null) {
            if (t.alternate === null)
              throw new Error("Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue.");
            wf();
          }
          var p = t.flags;
          return p & Kn ? (t.flags = p & ~Kn | Re, (t.mode & xt) !== ke && Yg(t), t) : null;
        }
        case tn:
          return Of(t), null;
        case we:
          return Df(t), null;
        case it:
          var v = t.type._context;
          return lg(v, t), null;
        case be:
        case Ot:
          return FS(t), null;
        case Ct:
          return null;
        default:
          return null;
      }
    }
    function k0(e, t, a) {
      switch (Qy(t), t.tag) {
        case pe: {
          var i = t.type.childContextTypes;
          i != null && Lh(t);
          break;
        }
        case ae: {
          t.stateNode, Df(t), By(t), Sg();
          break;
        }
        case ce: {
          hg(t);
          break;
        }
        case we:
          Df(t);
          break;
        case xe:
          Of(t);
          break;
        case tn:
          Of(t);
          break;
        case it:
          var u = t.type._context;
          lg(u, t);
          break;
        case be:
        case Ot:
          FS(t);
          break;
      }
    }
    var O0 = null;
    O0 = /* @__PURE__ */ new Set();
    var Tm = !1, Vr = !1, zx = typeof WeakSet == "function" ? WeakSet : Set, me = null, Af = null, Ff = null;
    function Ux(e) {
      wl(null, function() {
        throw e;
      }), is();
    }
    var Ax = function(e, t) {
      if (t.props = e.memoizedProps, t.state = e.memoizedState, e.mode & xt)
        try {
          Wl(), t.componentWillUnmount();
        } finally {
          Ql(e);
        }
      else
        t.componentWillUnmount();
    };
    function L0(e, t) {
      try {
        Ao(fr, e);
      } catch (a) {
        ln(e, t, a);
      }
    }
    function CS(e, t, a) {
      try {
        Ax(e, a);
      } catch (i) {
        ln(e, t, i);
      }
    }
    function Fx(e, t, a) {
      try {
        a.componentDidMount();
      } catch (i) {
        ln(e, t, i);
      }
    }
    function M0(e, t) {
      try {
        z0(e);
      } catch (a) {
        ln(e, t, a);
      }
    }
    function jf(e, t) {
      var a = e.ref;
      if (a !== null)
        if (typeof a == "function") {
          var i;
          try {
            if (Ae && tt && e.mode & xt)
              try {
                Wl(), i = a(null);
              } finally {
                Ql(e);
              }
            else
              i = a(null);
          } catch (u) {
            ln(e, t, u);
          }
          typeof i == "function" && S("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", Ye(e));
        } else
          a.current = null;
    }
    function wm(e, t, a) {
      try {
        a();
      } catch (i) {
        ln(e, t, i);
      }
    }
    var N0 = !1;
    function jx(e, t) {
      XT(e.containerInfo), me = t, Hx();
      var a = N0;
      return N0 = !1, a;
    }
    function Hx() {
      for (; me !== null; ) {
        var e = me, t = e.child;
        (e.subtreeFlags & bl) !== De && t !== null ? (t.return = e, me = t) : Vx();
      }
    }
    function Vx() {
      for (; me !== null; ) {
        var e = me;
        Pt(e);
        try {
          Px(e);
        } catch (a) {
          ln(e, e.return, a);
        }
        an();
        var t = e.sibling;
        if (t !== null) {
          t.return = e.return, me = t;
          return;
        }
        me = e.return;
      }
    }
    function Px(e) {
      var t = e.alternate, a = e.flags;
      if ((a & In) !== De) {
        switch (Pt(e), e.tag) {
          case Te:
          case We:
          case je:
            break;
          case pe: {
            if (t !== null) {
              var i = t.memoizedProps, u = t.memoizedState, s = e.stateNode;
              e.type === e.elementType && !Zs && (s.props !== e.memoizedProps && S("Expected %s props to match memoized props before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Ye(e) || "instance"), s.state !== e.memoizedState && S("Expected %s state to match memoized state before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Ye(e) || "instance"));
              var f = s.getSnapshotBeforeUpdate(e.elementType === e.type ? i : al(e.type, i), u);
              {
                var p = O0;
                f === void 0 && !p.has(e.type) && (p.add(e.type), S("%s.getSnapshotBeforeUpdate(): A snapshot value (or null) must be returned. You have returned undefined.", Ye(e)));
              }
              s.__reactInternalSnapshotBeforeUpdate = f;
            }
            break;
          }
          case ae: {
            {
              var v = e.stateNode;
              C1(v.containerInfo);
            }
            break;
          }
          case ce:
          case Qe:
          case we:
          case Ut:
            break;
          default:
            throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
        }
        an();
      }
    }
    function ll(e, t, a) {
      var i = t.updateQueue, u = i !== null ? i.lastEffect : null;
      if (u !== null) {
        var s = u.next, f = s;
        do {
          if ((f.tag & e) === e) {
            var p = f.destroy;
            f.destroy = void 0, p !== void 0 && ((e & jr) !== Va ? Wi(t) : (e & fr) !== Va && os(t), (e & $l) !== Va && Ip(!0), wm(t, a, p), (e & $l) !== Va && Ip(!1), (e & jr) !== Va ? Ol() : (e & fr) !== Va && Rd());
          }
          f = f.next;
        } while (f !== s);
      }
    }
    function Ao(e, t) {
      var a = t.updateQueue, i = a !== null ? a.lastEffect : null;
      if (i !== null) {
        var u = i.next, s = u;
        do {
          if ((s.tag & e) === e) {
            (e & jr) !== Va ? Cd(t) : (e & fr) !== Va && Dc(t);
            var f = s.create;
            (e & $l) !== Va && Ip(!0), s.destroy = f(), (e & $l) !== Va && Ip(!1), (e & jr) !== Va ? kv() : (e & fr) !== Va && Ov();
            {
              var p = s.destroy;
              if (p !== void 0 && typeof p != "function") {
                var v = void 0;
                (s.tag & fr) !== De ? v = "useLayoutEffect" : (s.tag & $l) !== De ? v = "useInsertionEffect" : v = "useEffect";
                var y = void 0;
                p === null ? y = " You returned null. If your effect does not require clean up, return undefined (or nothing)." : typeof p.then == "function" ? y = `

It looks like you wrote ` + v + `(async () => ...) or returned a Promise. Instead, write the async function inside your effect and call it immediately:

` + v + `(() => {
  async function fetchData() {
    // You can await here
    const response = await MyAPI.getData(someId);
    // ...
  }
  fetchData();
}, [someId]); // Or [] if effect doesn't need props or state

Learn more about data fetching with Hooks: https://reactjs.org/link/hooks-data-fetching` : y = " You returned: " + p, S("%s must not return anything besides a function, which is used for clean-up.%s", v, y);
              }
            }
          }
          s = s.next;
        } while (s !== u);
      }
    }
    function Bx(e, t) {
      if ((t.flags & vt) !== De)
        switch (t.tag) {
          case ct: {
            var a = t.stateNode.passiveEffectDuration, i = t.memoizedProps, u = i.id, s = i.onPostCommit, f = qC(), p = t.alternate === null ? "mount" : "update";
            GC() && (p = "nested-update"), typeof s == "function" && s(u, p, a, f);
            var v = t.return;
            e: for (; v !== null; ) {
              switch (v.tag) {
                case ae:
                  var y = v.stateNode;
                  y.passiveEffectDuration += a;
                  break e;
                case ct:
                  var g = v.stateNode;
                  g.passiveEffectDuration += a;
                  break e;
              }
              v = v.return;
            }
            break;
          }
        }
    }
    function $x(e, t, a, i) {
      if ((a.flags & Dl) !== De)
        switch (a.tag) {
          case Te:
          case We:
          case je: {
            if (!Vr)
              if (a.mode & xt)
                try {
                  Wl(), Ao(fr | cr, a);
                } finally {
                  Ql(a);
                }
              else
                Ao(fr | cr, a);
            break;
          }
          case pe: {
            var u = a.stateNode;
            if (a.flags & vt && !Vr)
              if (t === null)
                if (a.type === a.elementType && !Zs && (u.props !== a.memoizedProps && S("Expected %s props to match memoized props before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Ye(a) || "instance"), u.state !== a.memoizedState && S("Expected %s state to match memoized state before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Ye(a) || "instance")), a.mode & xt)
                  try {
                    Wl(), u.componentDidMount();
                  } finally {
                    Ql(a);
                  }
                else
                  u.componentDidMount();
              else {
                var s = a.elementType === a.type ? t.memoizedProps : al(a.type, t.memoizedProps), f = t.memoizedState;
                if (a.type === a.elementType && !Zs && (u.props !== a.memoizedProps && S("Expected %s props to match memoized props before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Ye(a) || "instance"), u.state !== a.memoizedState && S("Expected %s state to match memoized state before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Ye(a) || "instance")), a.mode & xt)
                  try {
                    Wl(), u.componentDidUpdate(s, f, u.__reactInternalSnapshotBeforeUpdate);
                  } finally {
                    Ql(a);
                  }
                else
                  u.componentDidUpdate(s, f, u.__reactInternalSnapshotBeforeUpdate);
              }
            var p = a.updateQueue;
            p !== null && (a.type === a.elementType && !Zs && (u.props !== a.memoizedProps && S("Expected %s props to match memoized props before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Ye(a) || "instance"), u.state !== a.memoizedState && S("Expected %s state to match memoized state before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Ye(a) || "instance")), SC(a, p, u));
            break;
          }
          case ae: {
            var v = a.updateQueue;
            if (v !== null) {
              var y = null;
              if (a.child !== null)
                switch (a.child.tag) {
                  case ce:
                    y = a.child.stateNode;
                    break;
                  case pe:
                    y = a.child.stateNode;
                    break;
                }
              SC(a, v, y);
            }
            break;
          }
          case ce: {
            var g = a.stateNode;
            if (t === null && a.flags & vt) {
              var b = a.type, w = a.memoizedProps;
              u1(g, b, w);
            }
            break;
          }
          case Qe:
            break;
          case we:
            break;
          case ct: {
            {
              var M = a.memoizedProps, U = M.onCommit, j = M.onRender, le = a.stateNode.effectDuration, Me = qC(), Ce = t === null ? "mount" : "update";
              GC() && (Ce = "nested-update"), typeof j == "function" && j(a.memoizedProps.id, Ce, a.actualDuration, a.treeBaseDuration, a.actualStartTime, Me);
              {
                typeof U == "function" && U(a.memoizedProps.id, Ce, le, Me), Vb(a);
                var yt = a.return;
                e: for (; yt !== null; ) {
                  switch (yt.tag) {
                    case ae:
                      var ft = yt.stateNode;
                      ft.effectDuration += le;
                      break e;
                    case ct:
                      var k = yt.stateNode;
                      k.effectDuration += le;
                      break e;
                  }
                  yt = yt.return;
                }
              }
            }
            break;
          }
          case xe: {
            Kx(e, a);
            break;
          }
          case tn:
          case Ut:
          case Et:
          case be:
          case Ot:
          case Tt:
            break;
          default:
            throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
        }
      Vr || a.flags & Sn && z0(a);
    }
    function Yx(e) {
      switch (e.tag) {
        case Te:
        case We:
        case je: {
          if (e.mode & xt)
            try {
              Wl(), L0(e, e.return);
            } finally {
              Ql(e);
            }
          else
            L0(e, e.return);
          break;
        }
        case pe: {
          var t = e.stateNode;
          typeof t.componentDidMount == "function" && Fx(e, e.return, t), M0(e, e.return);
          break;
        }
        case ce: {
          M0(e, e.return);
          break;
        }
      }
    }
    function Ix(e, t) {
      for (var a = null, i = e; ; ) {
        if (i.tag === ce) {
          if (a === null) {
            a = i;
            try {
              var u = i.stateNode;
              t ? y1(u) : S1(i.stateNode, i.memoizedProps);
            } catch (f) {
              ln(e, e.return, f);
            }
          }
        } else if (i.tag === Qe) {
          if (a === null)
            try {
              var s = i.stateNode;
              t ? g1(s) : E1(s, i.memoizedProps);
            } catch (f) {
              ln(e, e.return, f);
            }
        } else if (!((i.tag === be || i.tag === Ot) && i.memoizedState !== null && i !== e)) {
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
    function z0(e) {
      var t = e.ref;
      if (t !== null) {
        var a = e.stateNode, i;
        switch (e.tag) {
          case ce:
            i = a;
            break;
          default:
            i = a;
        }
        if (typeof t == "function") {
          var u;
          if (e.mode & xt)
            try {
              Wl(), u = t(i);
            } finally {
              Ql(e);
            }
          else
            u = t(i);
          typeof u == "function" && S("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", Ye(e));
        } else
          t.hasOwnProperty("current") || S("Unexpected ref object provided for %s. Use either a ref-setter function or React.createRef().", Ye(e)), t.current = i;
      }
    }
    function Qx(e) {
      var t = e.alternate;
      t !== null && (t.return = null), e.return = null;
    }
    function U0(e) {
      var t = e.alternate;
      t !== null && (e.alternate = null, U0(t));
      {
        if (e.child = null, e.deletions = null, e.sibling = null, e.tag === ce) {
          var a = e.stateNode;
          a !== null && Z1(a);
        }
        e.stateNode = null, e._debugOwner = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
      }
    }
    function Wx(e) {
      for (var t = e.return; t !== null; ) {
        if (A0(t))
          return t;
        t = t.return;
      }
      throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
    }
    function A0(e) {
      return e.tag === ce || e.tag === ae || e.tag === we;
    }
    function F0(e) {
      var t = e;
      e: for (; ; ) {
        for (; t.sibling === null; ) {
          if (t.return === null || A0(t.return))
            return null;
          t = t.return;
        }
        for (t.sibling.return = t.return, t = t.sibling; t.tag !== ce && t.tag !== Qe && t.tag !== Gt; ) {
          if (t.flags & hn || t.child === null || t.tag === we)
            continue e;
          t.child.return = t, t = t.child;
        }
        if (!(t.flags & hn))
          return t.stateNode;
      }
    }
    function Gx(e) {
      var t = Wx(e);
      switch (t.tag) {
        case ce: {
          var a = t.stateNode;
          t.flags & Oa && (HE(a), t.flags &= ~Oa);
          var i = F0(e);
          TS(e, i, a);
          break;
        }
        case ae:
        case we: {
          var u = t.stateNode.containerInfo, s = F0(e);
          RS(e, s, u);
          break;
        }
        default:
          throw new Error("Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue.");
      }
    }
    function RS(e, t, a) {
      var i = e.tag, u = i === ce || i === Qe;
      if (u) {
        var s = e.stateNode;
        t ? p1(a, s, t) : f1(a, s);
      } else if (i !== we) {
        var f = e.child;
        if (f !== null) {
          RS(f, t, a);
          for (var p = f.sibling; p !== null; )
            RS(p, t, a), p = p.sibling;
        }
      }
    }
    function TS(e, t, a) {
      var i = e.tag, u = i === ce || i === Qe;
      if (u) {
        var s = e.stateNode;
        t ? d1(a, s, t) : c1(a, s);
      } else if (i !== we) {
        var f = e.child;
        if (f !== null) {
          TS(f, t, a);
          for (var p = f.sibling; p !== null; )
            TS(p, t, a), p = p.sibling;
        }
      }
    }
    var Pr = null, ul = !1;
    function qx(e, t, a) {
      {
        var i = t;
        e: for (; i !== null; ) {
          switch (i.tag) {
            case ce: {
              Pr = i.stateNode, ul = !1;
              break e;
            }
            case ae: {
              Pr = i.stateNode.containerInfo, ul = !0;
              break e;
            }
            case we: {
              Pr = i.stateNode.containerInfo, ul = !0;
              break e;
            }
          }
          i = i.return;
        }
        if (Pr === null)
          throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
        j0(e, t, a), Pr = null, ul = !1;
      }
      Qx(a);
    }
    function Fo(e, t, a) {
      for (var i = a.child; i !== null; )
        j0(e, t, i), i = i.sibling;
    }
    function j0(e, t, a) {
      switch (gd(a), a.tag) {
        case ce:
          Vr || jf(a, t);
        case Qe: {
          {
            var i = Pr, u = ul;
            Pr = null, Fo(e, t, a), Pr = i, ul = u, Pr !== null && (ul ? h1(Pr, a.stateNode) : v1(Pr, a.stateNode));
          }
          return;
        }
        case Gt: {
          Pr !== null && (ul ? m1(Pr, a.stateNode) : zy(Pr, a.stateNode));
          return;
        }
        case we: {
          {
            var s = Pr, f = ul;
            Pr = a.stateNode.containerInfo, ul = !0, Fo(e, t, a), Pr = s, ul = f;
          }
          return;
        }
        case Te:
        case We:
        case lt:
        case je: {
          if (!Vr) {
            var p = a.updateQueue;
            if (p !== null) {
              var v = p.lastEffect;
              if (v !== null) {
                var y = v.next, g = y;
                do {
                  var b = g, w = b.destroy, M = b.tag;
                  w !== void 0 && ((M & $l) !== Va ? wm(a, t, w) : (M & fr) !== Va && (os(a), a.mode & xt ? (Wl(), wm(a, t, w), Ql(a)) : wm(a, t, w), Rd())), g = g.next;
                } while (g !== y);
              }
            }
          }
          Fo(e, t, a);
          return;
        }
        case pe: {
          if (!Vr) {
            jf(a, t);
            var U = a.stateNode;
            typeof U.componentWillUnmount == "function" && CS(a, t, U);
          }
          Fo(e, t, a);
          return;
        }
        case Et: {
          Fo(e, t, a);
          return;
        }
        case be: {
          if (
            // TODO: Remove this dead flag
            a.mode & at
          ) {
            var j = Vr;
            Vr = j || a.memoizedState !== null, Fo(e, t, a), Vr = j;
          } else
            Fo(e, t, a);
          break;
        }
        default: {
          Fo(e, t, a);
          return;
        }
      }
    }
    function Xx(e) {
      e.memoizedState;
    }
    function Kx(e, t) {
      var a = t.memoizedState;
      if (a === null) {
        var i = t.alternate;
        if (i !== null) {
          var u = i.memoizedState;
          if (u !== null) {
            var s = u.dehydrated;
            s !== null && U1(s);
          }
        }
      }
    }
    function H0(e) {
      var t = e.updateQueue;
      if (t !== null) {
        e.updateQueue = null;
        var a = e.stateNode;
        a === null && (a = e.stateNode = new zx()), t.forEach(function(i) {
          var u = Wb.bind(null, e, i);
          if (!a.has(i)) {
            if (a.add(i), Jr)
              if (Af !== null && Ff !== null)
                Yp(Ff, Af);
              else
                throw Error("Expected finished root and lanes to be set. This is a bug in React.");
            i.then(u, u);
          }
        });
      }
    }
    function Zx(e, t, a) {
      Af = a, Ff = e, Pt(t), V0(t, e), Pt(t), Af = null, Ff = null;
    }
    function ol(e, t, a) {
      var i = t.deletions;
      if (i !== null)
        for (var u = 0; u < i.length; u++) {
          var s = i[u];
          try {
            qx(e, t, s);
          } catch (v) {
            ln(s, t, v);
          }
        }
      var f = yl();
      if (t.subtreeFlags & _l)
        for (var p = t.child; p !== null; )
          Pt(p), V0(p, e), p = p.sibling;
      Pt(f);
    }
    function V0(e, t, a) {
      var i = e.alternate, u = e.flags;
      switch (e.tag) {
        case Te:
        case We:
        case lt:
        case je: {
          if (ol(t, e), Gl(e), u & vt) {
            try {
              ll($l | cr, e, e.return), Ao($l | cr, e);
            } catch (Ve) {
              ln(e, e.return, Ve);
            }
            if (e.mode & xt) {
              try {
                Wl(), ll(fr | cr, e, e.return);
              } catch (Ve) {
                ln(e, e.return, Ve);
              }
              Ql(e);
            } else
              try {
                ll(fr | cr, e, e.return);
              } catch (Ve) {
                ln(e, e.return, Ve);
              }
          }
          return;
        }
        case pe: {
          ol(t, e), Gl(e), u & Sn && i !== null && jf(i, i.return);
          return;
        }
        case ce: {
          ol(t, e), Gl(e), u & Sn && i !== null && jf(i, i.return);
          {
            if (e.flags & Oa) {
              var s = e.stateNode;
              try {
                HE(s);
              } catch (Ve) {
                ln(e, e.return, Ve);
              }
            }
            if (u & vt) {
              var f = e.stateNode;
              if (f != null) {
                var p = e.memoizedProps, v = i !== null ? i.memoizedProps : p, y = e.type, g = e.updateQueue;
                if (e.updateQueue = null, g !== null)
                  try {
                    o1(f, g, y, v, p, e);
                  } catch (Ve) {
                    ln(e, e.return, Ve);
                  }
              }
            }
          }
          return;
        }
        case Qe: {
          if (ol(t, e), Gl(e), u & vt) {
            if (e.stateNode === null)
              throw new Error("This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.");
            var b = e.stateNode, w = e.memoizedProps, M = i !== null ? i.memoizedProps : w;
            try {
              s1(b, M, w);
            } catch (Ve) {
              ln(e, e.return, Ve);
            }
          }
          return;
        }
        case ae: {
          if (ol(t, e), Gl(e), u & vt && i !== null) {
            var U = i.memoizedState;
            if (U.isDehydrated)
              try {
                z1(t.containerInfo);
              } catch (Ve) {
                ln(e, e.return, Ve);
              }
          }
          return;
        }
        case we: {
          ol(t, e), Gl(e);
          return;
        }
        case xe: {
          ol(t, e), Gl(e);
          var j = e.child;
          if (j.flags & Mn) {
            var le = j.stateNode, Me = j.memoizedState, Ce = Me !== null;
            if (le.isHidden = Ce, Ce) {
              var yt = j.alternate !== null && j.alternate.memoizedState !== null;
              yt || Mb();
            }
          }
          if (u & vt) {
            try {
              Xx(e);
            } catch (Ve) {
              ln(e, e.return, Ve);
            }
            H0(e);
          }
          return;
        }
        case be: {
          var ft = i !== null && i.memoizedState !== null;
          if (
            // TODO: Remove this dead flag
            e.mode & at
          ) {
            var k = Vr;
            Vr = k || ft, ol(t, e), Vr = k;
          } else
            ol(t, e);
          if (Gl(e), u & Mn) {
            var H = e.stateNode, O = e.memoizedState, G = O !== null, fe = e;
            if (H.isHidden = G, G && !ft && (fe.mode & at) !== ke) {
              me = fe;
              for (var ue = fe.child; ue !== null; )
                me = ue, eb(ue), ue = ue.sibling;
            }
            Ix(fe, G);
          }
          return;
        }
        case tn: {
          ol(t, e), Gl(e), u & vt && H0(e);
          return;
        }
        case Et:
          return;
        default: {
          ol(t, e), Gl(e);
          return;
        }
      }
    }
    function Gl(e) {
      var t = e.flags;
      if (t & hn) {
        try {
          Gx(e);
        } catch (a) {
          ln(e, e.return, a);
        }
        e.flags &= ~hn;
      }
      t & Xr && (e.flags &= ~Xr);
    }
    function Jx(e, t, a) {
      Af = a, Ff = t, me = e, P0(e, t, a), Af = null, Ff = null;
    }
    function P0(e, t, a) {
      for (var i = (e.mode & at) !== ke; me !== null; ) {
        var u = me, s = u.child;
        if (u.tag === be && i) {
          var f = u.memoizedState !== null, p = f || Tm;
          if (p) {
            wS(e, t, a);
            continue;
          } else {
            var v = u.alternate, y = v !== null && v.memoizedState !== null, g = y || Vr, b = Tm, w = Vr;
            Tm = p, Vr = g, Vr && !w && (me = u, tb(u));
            for (var M = s; M !== null; )
              me = M, P0(
                M,
                // New root; bubble back up to here and stop.
                t,
                a
              ), M = M.sibling;
            me = u, Tm = b, Vr = w, wS(e, t, a);
            continue;
          }
        }
        (u.subtreeFlags & Dl) !== De && s !== null ? (s.return = u, me = s) : wS(e, t, a);
      }
    }
    function wS(e, t, a) {
      for (; me !== null; ) {
        var i = me;
        if ((i.flags & Dl) !== De) {
          var u = i.alternate;
          Pt(i);
          try {
            $x(t, u, i, a);
          } catch (f) {
            ln(i, i.return, f);
          }
          an();
        }
        if (i === e) {
          me = null;
          return;
        }
        var s = i.sibling;
        if (s !== null) {
          s.return = i.return, me = s;
          return;
        }
        me = i.return;
      }
    }
    function eb(e) {
      for (; me !== null; ) {
        var t = me, a = t.child;
        switch (t.tag) {
          case Te:
          case We:
          case lt:
          case je: {
            if (t.mode & xt)
              try {
                Wl(), ll(fr, t, t.return);
              } finally {
                Ql(t);
              }
            else
              ll(fr, t, t.return);
            break;
          }
          case pe: {
            jf(t, t.return);
            var i = t.stateNode;
            typeof i.componentWillUnmount == "function" && CS(t, t.return, i);
            break;
          }
          case ce: {
            jf(t, t.return);
            break;
          }
          case be: {
            var u = t.memoizedState !== null;
            if (u) {
              B0(e);
              continue;
            }
            break;
          }
        }
        a !== null ? (a.return = t, me = a) : B0(e);
      }
    }
    function B0(e) {
      for (; me !== null; ) {
        var t = me;
        if (t === e) {
          me = null;
          return;
        }
        var a = t.sibling;
        if (a !== null) {
          a.return = t.return, me = a;
          return;
        }
        me = t.return;
      }
    }
    function tb(e) {
      for (; me !== null; ) {
        var t = me, a = t.child;
        if (t.tag === be) {
          var i = t.memoizedState !== null;
          if (i) {
            $0(e);
            continue;
          }
        }
        a !== null ? (a.return = t, me = a) : $0(e);
      }
    }
    function $0(e) {
      for (; me !== null; ) {
        var t = me;
        Pt(t);
        try {
          Yx(t);
        } catch (i) {
          ln(t, t.return, i);
        }
        if (an(), t === e) {
          me = null;
          return;
        }
        var a = t.sibling;
        if (a !== null) {
          a.return = t.return, me = a;
          return;
        }
        me = t.return;
      }
    }
    function nb(e, t, a, i) {
      me = t, rb(t, e, a, i);
    }
    function rb(e, t, a, i) {
      for (; me !== null; ) {
        var u = me, s = u.child;
        (u.subtreeFlags & Ii) !== De && s !== null ? (s.return = u, me = s) : ab(e, t, a, i);
      }
    }
    function ab(e, t, a, i) {
      for (; me !== null; ) {
        var u = me;
        if ((u.flags & qr) !== De) {
          Pt(u);
          try {
            ib(t, u, a, i);
          } catch (f) {
            ln(u, u.return, f);
          }
          an();
        }
        if (u === e) {
          me = null;
          return;
        }
        var s = u.sibling;
        if (s !== null) {
          s.return = u.return, me = s;
          return;
        }
        me = u.return;
      }
    }
    function ib(e, t, a, i) {
      switch (t.tag) {
        case Te:
        case We:
        case je: {
          if (t.mode & xt) {
            $g();
            try {
              Ao(jr | cr, t);
            } finally {
              Bg(t);
            }
          } else
            Ao(jr | cr, t);
          break;
        }
      }
    }
    function lb(e) {
      me = e, ub();
    }
    function ub() {
      for (; me !== null; ) {
        var e = me, t = e.child;
        if ((me.flags & ka) !== De) {
          var a = e.deletions;
          if (a !== null) {
            for (var i = 0; i < a.length; i++) {
              var u = a[i];
              me = u, cb(u, e);
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
            me = e;
          }
        }
        (e.subtreeFlags & Ii) !== De && t !== null ? (t.return = e, me = t) : ob();
      }
    }
    function ob() {
      for (; me !== null; ) {
        var e = me;
        (e.flags & qr) !== De && (Pt(e), sb(e), an());
        var t = e.sibling;
        if (t !== null) {
          t.return = e.return, me = t;
          return;
        }
        me = e.return;
      }
    }
    function sb(e) {
      switch (e.tag) {
        case Te:
        case We:
        case je: {
          e.mode & xt ? ($g(), ll(jr | cr, e, e.return), Bg(e)) : ll(jr | cr, e, e.return);
          break;
        }
      }
    }
    function cb(e, t) {
      for (; me !== null; ) {
        var a = me;
        Pt(a), db(a, t), an();
        var i = a.child;
        i !== null ? (i.return = a, me = i) : fb(e);
      }
    }
    function fb(e) {
      for (; me !== null; ) {
        var t = me, a = t.sibling, i = t.return;
        if (U0(t), t === e) {
          me = null;
          return;
        }
        if (a !== null) {
          a.return = i, me = a;
          return;
        }
        me = i;
      }
    }
    function db(e, t) {
      switch (e.tag) {
        case Te:
        case We:
        case je: {
          e.mode & xt ? ($g(), ll(jr, e, t), Bg(e)) : ll(jr, e, t);
          break;
        }
      }
    }
    function pb(e) {
      switch (e.tag) {
        case Te:
        case We:
        case je: {
          try {
            Ao(fr | cr, e);
          } catch (a) {
            ln(e, e.return, a);
          }
          break;
        }
        case pe: {
          var t = e.stateNode;
          try {
            t.componentDidMount();
          } catch (a) {
            ln(e, e.return, a);
          }
          break;
        }
      }
    }
    function vb(e) {
      switch (e.tag) {
        case Te:
        case We:
        case je: {
          try {
            Ao(jr | cr, e);
          } catch (t) {
            ln(e, e.return, t);
          }
          break;
        }
      }
    }
    function hb(e) {
      switch (e.tag) {
        case Te:
        case We:
        case je: {
          try {
            ll(fr | cr, e, e.return);
          } catch (a) {
            ln(e, e.return, a);
          }
          break;
        }
        case pe: {
          var t = e.stateNode;
          typeof t.componentWillUnmount == "function" && CS(e, e.return, t);
          break;
        }
      }
    }
    function mb(e) {
      switch (e.tag) {
        case Te:
        case We:
        case je:
          try {
            ll(jr | cr, e, e.return);
          } catch (t) {
            ln(e, e.return, t);
          }
      }
    }
    if (typeof Symbol == "function" && Symbol.for) {
      var Np = Symbol.for;
      Np("selector.component"), Np("selector.has_pseudo_class"), Np("selector.role"), Np("selector.test_id"), Np("selector.text");
    }
    var yb = [];
    function gb() {
      yb.forEach(function(e) {
        return e();
      });
    }
    var Sb = F.ReactCurrentActQueue;
    function Eb(e) {
      {
        var t = (
          // $FlowExpectedError – Flow doesn't know about IS_REACT_ACT_ENVIRONMENT global
          typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0
        ), a = typeof jest < "u";
        return a && t !== !1;
      }
    }
    function Y0() {
      {
        var e = (
          // $FlowExpectedError – Flow doesn't know about IS_REACT_ACT_ENVIRONMENT global
          typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0
        );
        return !e && Sb.current !== null && S("The current testing environment is not configured to support act(...)"), e;
      }
    }
    var Cb = Math.ceil, xS = F.ReactCurrentDispatcher, bS = F.ReactCurrentOwner, Br = F.ReactCurrentBatchConfig, sl = F.ReactCurrentActQueue, vr = (
      /*             */
      0
    ), I0 = (
      /*               */
      1
    ), $r = (
      /*                */
      2
    ), zi = (
      /*                */
      4
    ), ju = 0, zp = 1, Js = 2, xm = 3, Up = 4, Q0 = 5, _S = 6, mt = vr, Ea = null, _n = null, hr = B, ql = B, DS = _o(B), mr = ju, Ap = null, bm = B, Fp = B, _m = B, jp = null, Pa = null, kS = 0, W0 = 500, G0 = 1 / 0, Rb = 500, Hu = null;
    function Hp() {
      G0 = Qn() + Rb;
    }
    function q0() {
      return G0;
    }
    var Dm = !1, OS = null, Hf = null, ec = !1, jo = null, Vp = B, LS = [], MS = null, Tb = 50, Pp = 0, NS = null, zS = !1, km = !1, wb = 50, Vf = 0, Om = null, Bp = Wt, Lm = B, X0 = !1;
    function Mm() {
      return Ea;
    }
    function Ca() {
      return (mt & ($r | zi)) !== vr ? Qn() : (Bp !== Wt || (Bp = Qn()), Bp);
    }
    function Ho(e) {
      var t = e.mode;
      if ((t & at) === ke)
        return Fe;
      if ((mt & $r) !== vr && hr !== B)
        return Cs(hr);
      var a = Sw() !== gw;
      if (a) {
        if (Br.transition !== null) {
          var i = Br.transition;
          i._updatedFibers || (i._updatedFibers = /* @__PURE__ */ new Set()), i._updatedFibers.add(e);
        }
        return Lm === Rt && (Lm = Od()), Lm;
      }
      var u = Aa();
      if (u !== Rt)
        return u;
      var s = r1();
      return s;
    }
    function xb(e) {
      var t = e.mode;
      return (t & at) === ke ? Fe : Av();
    }
    function yr(e, t, a, i) {
      qb(), X0 && S("useInsertionEffect must not schedule updates."), zS && (km = !0), mo(e, a, i), (mt & $r) !== B && e === Ea ? Zb(t) : (Jr && ws(e, t, a), Jb(t), e === Ea && ((mt & $r) === vr && (Fp = qe(Fp, a)), mr === Up && Vo(e, hr)), Ba(e, i), a === Fe && mt === vr && (t.mode & at) === ke && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
      !sl.isBatchingLegacy && (Hp(), XE()));
    }
    function bb(e, t, a) {
      var i = e.current;
      i.lanes = t, mo(e, t, a), Ba(e, a);
    }
    function _b(e) {
      return (
        // TODO: Remove outdated deferRenderPhaseUpdateToNextBatch experiment. We
        // decided not to enable it.
        (mt & $r) !== vr
      );
    }
    function Ba(e, t) {
      var a = e.callbackNode;
      Gc(e, t);
      var i = Wc(e, e === Ea ? hr : B);
      if (i === B) {
        a !== null && dR(a), e.callbackNode = null, e.callbackPriority = Rt;
        return;
      }
      var u = Nl(i), s = e.callbackPriority;
      if (s === u && // Special case related to `act`. If the currently scheduled task is a
      // Scheduler task, rather than an `act` task, cancel it and re-scheduled
      // on the `act` queue.
      !(sl.current !== null && a !== PS)) {
        a == null && s !== Fe && S("Expected scheduled callback to exist. This error is likely caused by a bug in React. Please file an issue.");
        return;
      }
      a != null && dR(a);
      var f;
      if (u === Fe)
        e.tag === Do ? (sl.isBatchingLegacy !== null && (sl.didScheduleLegacyUpdate = !0), tw(J0.bind(null, e))) : qE(J0.bind(null, e)), sl.current !== null ? sl.current.push(ko) : i1(function() {
          (mt & ($r | zi)) === vr && ko();
        }), f = null;
      else {
        var p;
        switch ($v(i)) {
          case Mr:
            p = us;
            break;
          case wi:
            p = kl;
            break;
          case za:
            p = Qi;
            break;
          case Ua:
            p = du;
            break;
          default:
            p = Qi;
            break;
        }
        f = BS(p, K0.bind(null, e));
      }
      e.callbackPriority = u, e.callbackNode = f;
    }
    function K0(e, t) {
      if (Iw(), Bp = Wt, Lm = B, (mt & ($r | zi)) !== vr)
        throw new Error("Should not already be working.");
      var a = e.callbackNode, i = Pu();
      if (i && e.callbackNode !== a)
        return null;
      var u = Wc(e, e === Ea ? hr : B);
      if (u === B)
        return null;
      var s = !Xc(e, u) && !Uv(e, u) && !t, f = s ? Fb(e, u) : zm(e, u);
      if (f !== ju) {
        if (f === Js) {
          var p = qc(e);
          p !== B && (u = p, f = US(e, p));
        }
        if (f === zp) {
          var v = Ap;
          throw tc(e, B), Vo(e, u), Ba(e, Qn()), v;
        }
        if (f === _S)
          Vo(e, u);
        else {
          var y = !Xc(e, u), g = e.current.alternate;
          if (y && !kb(g)) {
            if (f = zm(e, u), f === Js) {
              var b = qc(e);
              b !== B && (u = b, f = US(e, b));
            }
            if (f === zp) {
              var w = Ap;
              throw tc(e, B), Vo(e, u), Ba(e, Qn()), w;
            }
          }
          e.finishedWork = g, e.finishedLanes = u, Db(e, f, u);
        }
      }
      return Ba(e, Qn()), e.callbackNode === a ? K0.bind(null, e) : null;
    }
    function US(e, t) {
      var a = jp;
      if (Jc(e)) {
        var i = tc(e, t);
        i.flags |= Tr, G1(e.containerInfo);
      }
      var u = zm(e, t);
      if (u !== Js) {
        var s = Pa;
        Pa = a, s !== null && Z0(s);
      }
      return u;
    }
    function Z0(e) {
      Pa === null ? Pa = e : Pa.push.apply(Pa, e);
    }
    function Db(e, t, a) {
      switch (t) {
        case ju:
        case zp:
          throw new Error("Root did not complete. This is a bug in React.");
        case Js: {
          nc(e, Pa, Hu);
          break;
        }
        case xm: {
          if (Vo(e, a), Tu(a) && // do not delay if we're inside an act() scope
          !pR()) {
            var i = kS + W0 - Qn();
            if (i > 10) {
              var u = Wc(e, B);
              if (u !== B)
                break;
              var s = e.suspendedLanes;
              if (!wu(s, a)) {
                Ca(), Kc(e, s);
                break;
              }
              e.timeoutHandle = My(nc.bind(null, e, Pa, Hu), i);
              break;
            }
          }
          nc(e, Pa, Hu);
          break;
        }
        case Up: {
          if (Vo(e, a), Dd(a))
            break;
          if (!pR()) {
            var f = ni(e, a), p = f, v = Qn() - p, y = Gb(v) - v;
            if (y > 10) {
              e.timeoutHandle = My(nc.bind(null, e, Pa, Hu), y);
              break;
            }
          }
          nc(e, Pa, Hu);
          break;
        }
        case Q0: {
          nc(e, Pa, Hu);
          break;
        }
        default:
          throw new Error("Unknown root exit status.");
      }
    }
    function kb(e) {
      for (var t = e; ; ) {
        if (t.flags & co) {
          var a = t.updateQueue;
          if (a !== null) {
            var i = a.stores;
            if (i !== null)
              for (var u = 0; u < i.length; u++) {
                var s = i[u], f = s.getSnapshot, p = s.value;
                try {
                  if (!Q(f(), p))
                    return !1;
                } catch {
                  return !1;
                }
              }
          }
        }
        var v = t.child;
        if (t.subtreeFlags & co && v !== null) {
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
    function Vo(e, t) {
      t = Rs(t, _m), t = Rs(t, Fp), Hv(e, t);
    }
    function J0(e) {
      if (Qw(), (mt & ($r | zi)) !== vr)
        throw new Error("Should not already be working.");
      Pu();
      var t = Wc(e, B);
      if (!ta(t, Fe))
        return Ba(e, Qn()), null;
      var a = zm(e, t);
      if (e.tag !== Do && a === Js) {
        var i = qc(e);
        i !== B && (t = i, a = US(e, i));
      }
      if (a === zp) {
        var u = Ap;
        throw tc(e, B), Vo(e, t), Ba(e, Qn()), u;
      }
      if (a === _S)
        throw new Error("Root did not complete. This is a bug in React.");
      var s = e.current.alternate;
      return e.finishedWork = s, e.finishedLanes = t, nc(e, Pa, Hu), Ba(e, Qn()), null;
    }
    function Ob(e, t) {
      t !== B && (Zc(e, qe(t, Fe)), Ba(e, Qn()), (mt & ($r | zi)) === vr && (Hp(), ko()));
    }
    function AS(e, t) {
      var a = mt;
      mt |= I0;
      try {
        return e(t);
      } finally {
        mt = a, mt === vr && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
        !sl.isBatchingLegacy && (Hp(), XE());
      }
    }
    function Lb(e, t, a, i, u) {
      var s = Aa(), f = Br.transition;
      try {
        return Br.transition = null, An(Mr), e(t, a, i, u);
      } finally {
        An(s), Br.transition = f, mt === vr && Hp();
      }
    }
    function Vu(e) {
      jo !== null && jo.tag === Do && (mt & ($r | zi)) === vr && Pu();
      var t = mt;
      mt |= I0;
      var a = Br.transition, i = Aa();
      try {
        return Br.transition = null, An(Mr), e ? e() : void 0;
      } finally {
        An(i), Br.transition = a, mt = t, (mt & ($r | zi)) === vr && ko();
      }
    }
    function eR() {
      return (mt & ($r | zi)) !== vr;
    }
    function Nm(e, t) {
      la(DS, ql, e), ql = qe(ql, t);
    }
    function FS(e) {
      ql = DS.current, ia(DS, e);
    }
    function tc(e, t) {
      e.finishedWork = null, e.finishedLanes = B;
      var a = e.timeoutHandle;
      if (a !== Ny && (e.timeoutHandle = Ny, a1(a)), _n !== null)
        for (var i = _n.return; i !== null; ) {
          var u = i.alternate;
          k0(u, i), i = i.return;
        }
      Ea = e;
      var s = rc(e.current, null);
      return _n = s, hr = ql = t, mr = ju, Ap = null, bm = B, Fp = B, _m = B, jp = null, Pa = null, bw(), tl.discardPendingWarnings(), s;
    }
    function tR(e, t) {
      do {
        var a = _n;
        try {
          if ($h(), xC(), an(), bS.current = null, a === null || a.return === null) {
            mr = zp, Ap = t, _n = null;
            return;
          }
          if (Ae && a.mode & xt && gm(a, !0), He)
            if (ma(), t !== null && typeof t == "object" && typeof t.then == "function") {
              var i = t;
              Ti(a, i, hr);
            } else
              ss(a, t, hr);
          tx(e, a.return, a, t, hr), iR(a);
        } catch (u) {
          t = u, _n === a && a !== null ? (a = a.return, _n = a) : a = _n;
          continue;
        }
        return;
      } while (!0);
    }
    function nR() {
      var e = xS.current;
      return xS.current = pm, e === null ? pm : e;
    }
    function rR(e) {
      xS.current = e;
    }
    function Mb() {
      kS = Qn();
    }
    function $p(e) {
      bm = qe(e, bm);
    }
    function Nb() {
      mr === ju && (mr = xm);
    }
    function jS() {
      (mr === ju || mr === xm || mr === Js) && (mr = Up), Ea !== null && (Es(bm) || Es(Fp)) && Vo(Ea, hr);
    }
    function zb(e) {
      mr !== Up && (mr = Js), jp === null ? jp = [e] : jp.push(e);
    }
    function Ub() {
      return mr === ju;
    }
    function zm(e, t) {
      var a = mt;
      mt |= $r;
      var i = nR();
      if (Ea !== e || hr !== t) {
        if (Jr) {
          var u = e.memoizedUpdaters;
          u.size > 0 && (Yp(e, hr), u.clear()), Vv(e, t);
        }
        Hu = zd(), tc(e, t);
      }
      mu(t);
      do
        try {
          Ab();
          break;
        } catch (s) {
          tR(e, s);
        }
      while (!0);
      if ($h(), mt = a, rR(i), _n !== null)
        throw new Error("Cannot commit an incomplete root. This error is likely caused by a bug in React. Please file an issue.");
      return kc(), Ea = null, hr = B, mr;
    }
    function Ab() {
      for (; _n !== null; )
        aR(_n);
    }
    function Fb(e, t) {
      var a = mt;
      mt |= $r;
      var i = nR();
      if (Ea !== e || hr !== t) {
        if (Jr) {
          var u = e.memoizedUpdaters;
          u.size > 0 && (Yp(e, hr), u.clear()), Vv(e, t);
        }
        Hu = zd(), Hp(), tc(e, t);
      }
      mu(t);
      do
        try {
          jb();
          break;
        } catch (s) {
          tR(e, s);
        }
      while (!0);
      return $h(), rR(i), mt = a, _n !== null ? (Lv(), ju) : (kc(), Ea = null, hr = B, mr);
    }
    function jb() {
      for (; _n !== null && !pd(); )
        aR(_n);
    }
    function aR(e) {
      var t = e.alternate;
      Pt(e);
      var a;
      (e.mode & xt) !== ke ? (Pg(e), a = HS(t, e, ql), gm(e, !0)) : a = HS(t, e, ql), an(), e.memoizedProps = e.pendingProps, a === null ? iR(e) : _n = a, bS.current = null;
    }
    function iR(e) {
      var t = e;
      do {
        var a = t.alternate, i = t.return;
        if ((t.flags & ls) === De) {
          Pt(t);
          var u = void 0;
          if ((t.mode & xt) === ke ? u = D0(a, t, ql) : (Pg(t), u = D0(a, t, ql), gm(t, !1)), an(), u !== null) {
            _n = u;
            return;
          }
        } else {
          var s = Nx(a, t);
          if (s !== null) {
            s.flags &= xv, _n = s;
            return;
          }
          if ((t.mode & xt) !== ke) {
            gm(t, !1);
            for (var f = t.actualDuration, p = t.child; p !== null; )
              f += p.actualDuration, p = p.sibling;
            t.actualDuration = f;
          }
          if (i !== null)
            i.flags |= ls, i.subtreeFlags = De, i.deletions = null;
          else {
            mr = _S, _n = null;
            return;
          }
        }
        var v = t.sibling;
        if (v !== null) {
          _n = v;
          return;
        }
        t = i, _n = t;
      } while (t !== null);
      mr === ju && (mr = Q0);
    }
    function nc(e, t, a) {
      var i = Aa(), u = Br.transition;
      try {
        Br.transition = null, An(Mr), Hb(e, t, a, i);
      } finally {
        Br.transition = u, An(i);
      }
      return null;
    }
    function Hb(e, t, a, i) {
      do
        Pu();
      while (jo !== null);
      if (Xb(), (mt & ($r | zi)) !== vr)
        throw new Error("Should not already be working.");
      var u = e.finishedWork, s = e.finishedLanes;
      if (Sd(s), u === null)
        return Ed(), null;
      if (s === B && S("root.finishedLanes should not be empty during a commit. This is a bug in React."), e.finishedWork = null, e.finishedLanes = B, u === e.current)
        throw new Error("Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue.");
      e.callbackNode = null, e.callbackPriority = Rt;
      var f = qe(u.lanes, u.childLanes);
      Md(e, f), e === Ea && (Ea = null, _n = null, hr = B), ((u.subtreeFlags & Ii) !== De || (u.flags & Ii) !== De) && (ec || (ec = !0, MS = a, BS(Qi, function() {
        return Pu(), null;
      })));
      var p = (u.subtreeFlags & (bl | _l | Dl | Ii)) !== De, v = (u.flags & (bl | _l | Dl | Ii)) !== De;
      if (p || v) {
        var y = Br.transition;
        Br.transition = null;
        var g = Aa();
        An(Mr);
        var b = mt;
        mt |= zi, bS.current = null, jx(e, u), XC(), Zx(e, u, s), KT(e.containerInfo), e.current = u, cs(s), Jx(u, e, s), fs(), vd(), mt = b, An(g), Br.transition = y;
      } else
        e.current = u, XC();
      var w = ec;
      if (ec ? (ec = !1, jo = e, Vp = s) : (Vf = 0, Om = null), f = e.pendingLanes, f === B && (Hf = null), w || sR(e.current, !1), md(u.stateNode, i), Jr && e.memoizedUpdaters.clear(), gb(), Ba(e, Qn()), t !== null)
        for (var M = e.onRecoverableError, U = 0; U < t.length; U++) {
          var j = t[U], le = j.stack, Me = j.digest;
          M(j.value, {
            componentStack: le,
            digest: Me
          });
        }
      if (Dm) {
        Dm = !1;
        var Ce = OS;
        throw OS = null, Ce;
      }
      return ta(Vp, Fe) && e.tag !== Do && Pu(), f = e.pendingLanes, ta(f, Fe) ? (Yw(), e === NS ? Pp++ : (Pp = 0, NS = e)) : Pp = 0, ko(), Ed(), null;
    }
    function Pu() {
      if (jo !== null) {
        var e = $v(Vp), t = bs(za, e), a = Br.transition, i = Aa();
        try {
          return Br.transition = null, An(t), Pb();
        } finally {
          An(i), Br.transition = a;
        }
      }
      return !1;
    }
    function Vb(e) {
      LS.push(e), ec || (ec = !0, BS(Qi, function() {
        return Pu(), null;
      }));
    }
    function Pb() {
      if (jo === null)
        return !1;
      var e = MS;
      MS = null;
      var t = jo, a = Vp;
      if (jo = null, Vp = B, (mt & ($r | zi)) !== vr)
        throw new Error("Cannot flush passive effects while already rendering.");
      zS = !0, km = !1, hu(a);
      var i = mt;
      mt |= zi, lb(t.current), nb(t, t.current, a, e);
      {
        var u = LS;
        LS = [];
        for (var s = 0; s < u.length; s++) {
          var f = u[s];
          Bx(t, f);
        }
      }
      Td(), sR(t.current, !0), mt = i, ko(), km ? t === Om ? Vf++ : (Vf = 0, Om = t) : Vf = 0, zS = !1, km = !1, yd(t);
      {
        var p = t.current.stateNode;
        p.effectDuration = 0, p.passiveEffectDuration = 0;
      }
      return !0;
    }
    function lR(e) {
      return Hf !== null && Hf.has(e);
    }
    function Bb(e) {
      Hf === null ? Hf = /* @__PURE__ */ new Set([e]) : Hf.add(e);
    }
    function $b(e) {
      Dm || (Dm = !0, OS = e);
    }
    var Yb = $b;
    function uR(e, t, a) {
      var i = Ks(a, t), u = a0(e, i, Fe), s = Lo(e, u, Fe), f = Ca();
      s !== null && (mo(s, Fe, f), Ba(s, f));
    }
    function ln(e, t, a) {
      if (Ux(a), Ip(!1), e.tag === ae) {
        uR(e, e, a);
        return;
      }
      var i = null;
      for (i = t; i !== null; ) {
        if (i.tag === ae) {
          uR(i, e, a);
          return;
        } else if (i.tag === pe) {
          var u = i.type, s = i.stateNode;
          if (typeof u.getDerivedStateFromError == "function" || typeof s.componentDidCatch == "function" && !lR(s)) {
            var f = Ks(a, e), p = iS(i, f, Fe), v = Lo(i, p, Fe), y = Ca();
            v !== null && (mo(v, Fe, y), Ba(v, y));
            return;
          }
        }
        i = i.return;
      }
      S(`Internal React error: Attempted to capture a commit phase error inside a detached tree. This indicates a bug in React. Likely causes include deleting the same fiber more than once, committing an already-finished tree, or an inconsistent return pointer.

Error message:

%s`, a);
    }
    function Ib(e, t, a) {
      var i = e.pingCache;
      i !== null && i.delete(t);
      var u = Ca();
      Kc(e, a), e_(e), Ea === e && wu(hr, a) && (mr === Up || mr === xm && Tu(hr) && Qn() - kS < W0 ? tc(e, B) : _m = qe(_m, a)), Ba(e, u);
    }
    function oR(e, t) {
      t === Rt && (t = xb(e));
      var a = Ca(), i = Ha(e, t);
      i !== null && (mo(i, t, a), Ba(i, a));
    }
    function Qb(e) {
      var t = e.memoizedState, a = Rt;
      t !== null && (a = t.retryLane), oR(e, a);
    }
    function Wb(e, t) {
      var a = Rt, i;
      switch (e.tag) {
        case xe:
          i = e.stateNode;
          var u = e.memoizedState;
          u !== null && (a = u.retryLane);
          break;
        case tn:
          i = e.stateNode;
          break;
        default:
          throw new Error("Pinged unknown suspense boundary type. This is probably a bug in React.");
      }
      i !== null && i.delete(t), oR(e, a);
    }
    function Gb(e) {
      return e < 120 ? 120 : e < 480 ? 480 : e < 1080 ? 1080 : e < 1920 ? 1920 : e < 3e3 ? 3e3 : e < 4320 ? 4320 : Cb(e / 1960) * 1960;
    }
    function qb() {
      if (Pp > Tb)
        throw Pp = 0, NS = null, new Error("Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.");
      Vf > wb && (Vf = 0, Om = null, S("Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render."));
    }
    function Xb() {
      tl.flushLegacyContextWarning(), tl.flushPendingUnsafeLifecycleWarnings();
    }
    function sR(e, t) {
      Pt(e), Um(e, xl, hb), t && Um(e, Ei, mb), Um(e, xl, pb), t && Um(e, Ei, vb), an();
    }
    function Um(e, t, a) {
      for (var i = e, u = null; i !== null; ) {
        var s = i.subtreeFlags & t;
        i !== u && i.child !== null && s !== De ? i = i.child : ((i.flags & t) !== De && a(i), i.sibling !== null ? i = i.sibling : i = u = i.return);
      }
    }
    var Am = null;
    function cR(e) {
      {
        if ((mt & $r) !== vr || !(e.mode & at))
          return;
        var t = e.tag;
        if (t !== jt && t !== ae && t !== pe && t !== Te && t !== We && t !== lt && t !== je)
          return;
        var a = Ye(e) || "ReactComponent";
        if (Am !== null) {
          if (Am.has(a))
            return;
          Am.add(a);
        } else
          Am = /* @__PURE__ */ new Set([a]);
        var i = ir;
        try {
          Pt(e), S("Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously later calls tries to update the component. Move this work to useEffect instead.");
        } finally {
          i ? Pt(e) : an();
        }
      }
    }
    var HS;
    {
      var Kb = null;
      HS = function(e, t, a) {
        var i = gR(Kb, t);
        try {
          return T0(e, t, a);
        } catch (s) {
          if (sw() || s !== null && typeof s == "object" && typeof s.then == "function")
            throw s;
          if ($h(), xC(), k0(e, t), gR(t, i), t.mode & xt && Pg(t), wl(null, T0, null, e, t, a), $i()) {
            var u = is();
            typeof u == "object" && u !== null && u._suppressLogging && typeof s == "object" && s !== null && !s._suppressLogging && (s._suppressLogging = !0);
          }
          throw s;
        }
      };
    }
    var fR = !1, VS;
    VS = /* @__PURE__ */ new Set();
    function Zb(e) {
      if (pi && !Pw())
        switch (e.tag) {
          case Te:
          case We:
          case je: {
            var t = _n && Ye(_n) || "Unknown", a = t;
            if (!VS.has(a)) {
              VS.add(a);
              var i = Ye(e) || "Unknown";
              S("Cannot update a component (`%s`) while rendering a different component (`%s`). To locate the bad setState() call inside `%s`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render", i, t, t);
            }
            break;
          }
          case pe: {
            fR || (S("Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state."), fR = !0);
            break;
          }
        }
    }
    function Yp(e, t) {
      if (Jr) {
        var a = e.memoizedUpdaters;
        a.forEach(function(i) {
          ws(e, i, t);
        });
      }
    }
    var PS = {};
    function BS(e, t) {
      {
        var a = sl.current;
        return a !== null ? (a.push(t), PS) : dd(e, t);
      }
    }
    function dR(e) {
      if (e !== PS)
        return _v(e);
    }
    function pR() {
      return sl.current !== null;
    }
    function Jb(e) {
      {
        if (e.mode & at) {
          if (!Y0())
            return;
        } else if (!Eb() || mt !== vr || e.tag !== Te && e.tag !== We && e.tag !== je)
          return;
        if (sl.current === null) {
          var t = ir;
          try {
            Pt(e), S(`An update to %s inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`, Ye(e));
          } finally {
            t ? Pt(e) : an();
          }
        }
      }
    }
    function e_(e) {
      e.tag !== Do && Y0() && sl.current === null && S(`A suspended resource finished loading inside a test, but the event was not wrapped in act(...).

When testing, code that resolves suspended data should be wrapped into act(...):

act(() => {
  /* finish loading suspended data */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`);
    }
    function Ip(e) {
      X0 = e;
    }
    var Ui = null, Pf = null, t_ = function(e) {
      Ui = e;
    };
    function Bf(e) {
      {
        if (Ui === null)
          return e;
        var t = Ui(e);
        return t === void 0 ? e : t.current;
      }
    }
    function $S(e) {
      return Bf(e);
    }
    function YS(e) {
      {
        if (Ui === null)
          return e;
        var t = Ui(e);
        if (t === void 0) {
          if (e != null && typeof e.render == "function") {
            var a = Bf(e.render);
            if (e.render !== a) {
              var i = {
                $$typeof: _e,
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
    function vR(e, t) {
      {
        if (Ui === null)
          return !1;
        var a = e.elementType, i = t.type, u = !1, s = typeof i == "object" && i !== null ? i.$$typeof : null;
        switch (e.tag) {
          case pe: {
            typeof i == "function" && (u = !0);
            break;
          }
          case Te: {
            (typeof i == "function" || s === Oe) && (u = !0);
            break;
          }
          case We: {
            (s === _e || s === Oe) && (u = !0);
            break;
          }
          case lt:
          case je: {
            (s === Be || s === Oe) && (u = !0);
            break;
          }
          default:
            return !1;
        }
        if (u) {
          var f = Ui(a);
          if (f !== void 0 && f === Ui(i))
            return !0;
        }
        return !1;
      }
    }
    function hR(e) {
      {
        if (Ui === null || typeof WeakSet != "function")
          return;
        Pf === null && (Pf = /* @__PURE__ */ new WeakSet()), Pf.add(e);
      }
    }
    var n_ = function(e, t) {
      {
        if (Ui === null)
          return;
        var a = t.staleFamilies, i = t.updatedFamilies;
        Pu(), Vu(function() {
          IS(e.current, i, a);
        });
      }
    }, r_ = function(e, t) {
      {
        if (e.context !== ii)
          return;
        Pu(), Vu(function() {
          Qp(t, e, null, null);
        });
      }
    };
    function IS(e, t, a) {
      {
        var i = e.alternate, u = e.child, s = e.sibling, f = e.tag, p = e.type, v = null;
        switch (f) {
          case Te:
          case je:
          case pe:
            v = p;
            break;
          case We:
            v = p.render;
            break;
        }
        if (Ui === null)
          throw new Error("Expected resolveFamily to be set during hot reload.");
        var y = !1, g = !1;
        if (v !== null) {
          var b = Ui(v);
          b !== void 0 && (a.has(b) ? g = !0 : t.has(b) && (f === pe ? g = !0 : y = !0));
        }
        if (Pf !== null && (Pf.has(e) || i !== null && Pf.has(i)) && (g = !0), g && (e._debugNeedsRemount = !0), g || y) {
          var w = Ha(e, Fe);
          w !== null && yr(w, e, Fe, Wt);
        }
        u !== null && !g && IS(u, t, a), s !== null && IS(s, t, a);
      }
    }
    var a_ = function(e, t) {
      {
        var a = /* @__PURE__ */ new Set(), i = new Set(t.map(function(u) {
          return u.current;
        }));
        return QS(e.current, i, a), a;
      }
    };
    function QS(e, t, a) {
      {
        var i = e.child, u = e.sibling, s = e.tag, f = e.type, p = null;
        switch (s) {
          case Te:
          case je:
          case pe:
            p = f;
            break;
          case We:
            p = f.render;
            break;
        }
        var v = !1;
        p !== null && t.has(p) && (v = !0), v ? i_(e, a) : i !== null && QS(i, t, a), u !== null && QS(u, t, a);
      }
    }
    function i_(e, t) {
      {
        var a = l_(e, t);
        if (a)
          return;
        for (var i = e; ; ) {
          switch (i.tag) {
            case ce:
              t.add(i.stateNode);
              return;
            case we:
              t.add(i.stateNode.containerInfo);
              return;
            case ae:
              t.add(i.stateNode.containerInfo);
              return;
          }
          if (i.return === null)
            throw new Error("Expected to reach root first.");
          i = i.return;
        }
      }
    }
    function l_(e, t) {
      for (var a = e, i = !1; ; ) {
        if (a.tag === ce)
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
    var WS;
    {
      WS = !1;
      try {
        var mR = Object.preventExtensions({});
      } catch {
        WS = !0;
      }
    }
    function u_(e, t, a, i) {
      this.tag = e, this.key = a, this.elementType = null, this.type = null, this.stateNode = null, this.return = null, this.child = null, this.sibling = null, this.index = 0, this.ref = null, this.pendingProps = t, this.memoizedProps = null, this.updateQueue = null, this.memoizedState = null, this.dependencies = null, this.mode = i, this.flags = De, this.subtreeFlags = De, this.deletions = null, this.lanes = B, this.childLanes = B, this.alternate = null, this.actualDuration = Number.NaN, this.actualStartTime = Number.NaN, this.selfBaseDuration = Number.NaN, this.treeBaseDuration = Number.NaN, this.actualDuration = 0, this.actualStartTime = -1, this.selfBaseDuration = 0, this.treeBaseDuration = 0, this._debugSource = null, this._debugOwner = null, this._debugNeedsRemount = !1, this._debugHookTypes = null, !WS && typeof Object.preventExtensions == "function" && Object.preventExtensions(this);
    }
    var li = function(e, t, a, i) {
      return new u_(e, t, a, i);
    };
    function GS(e) {
      var t = e.prototype;
      return !!(t && t.isReactComponent);
    }
    function o_(e) {
      return typeof e == "function" && !GS(e) && e.defaultProps === void 0;
    }
    function s_(e) {
      if (typeof e == "function")
        return GS(e) ? pe : Te;
      if (e != null) {
        var t = e.$$typeof;
        if (t === _e)
          return We;
        if (t === Be)
          return lt;
      }
      return jt;
    }
    function rc(e, t) {
      var a = e.alternate;
      a === null ? (a = li(e.tag, t, e.key, e.mode), a.elementType = e.elementType, a.type = e.type, a.stateNode = e.stateNode, a._debugSource = e._debugSource, a._debugOwner = e._debugOwner, a._debugHookTypes = e._debugHookTypes, a.alternate = e, e.alternate = a) : (a.pendingProps = t, a.type = e.type, a.flags = De, a.subtreeFlags = De, a.deletions = null, a.actualDuration = 0, a.actualStartTime = -1), a.flags = e.flags & Nn, a.childLanes = e.childLanes, a.lanes = e.lanes, a.child = e.child, a.memoizedProps = e.memoizedProps, a.memoizedState = e.memoizedState, a.updateQueue = e.updateQueue;
      var i = e.dependencies;
      switch (a.dependencies = i === null ? null : {
        lanes: i.lanes,
        firstContext: i.firstContext
      }, a.sibling = e.sibling, a.index = e.index, a.ref = e.ref, a.selfBaseDuration = e.selfBaseDuration, a.treeBaseDuration = e.treeBaseDuration, a._debugNeedsRemount = e._debugNeedsRemount, a.tag) {
        case jt:
        case Te:
        case je:
          a.type = Bf(e.type);
          break;
        case pe:
          a.type = $S(e.type);
          break;
        case We:
          a.type = YS(e.type);
          break;
      }
      return a;
    }
    function c_(e, t) {
      e.flags &= Nn | hn;
      var a = e.alternate;
      if (a === null)
        e.childLanes = B, e.lanes = t, e.child = null, e.subtreeFlags = De, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null, e.selfBaseDuration = 0, e.treeBaseDuration = 0;
      else {
        e.childLanes = a.childLanes, e.lanes = a.lanes, e.child = a.child, e.subtreeFlags = De, e.deletions = null, e.memoizedProps = a.memoizedProps, e.memoizedState = a.memoizedState, e.updateQueue = a.updateQueue, e.type = a.type;
        var i = a.dependencies;
        e.dependencies = i === null ? null : {
          lanes: i.lanes,
          firstContext: i.firstContext
        }, e.selfBaseDuration = a.selfBaseDuration, e.treeBaseDuration = a.treeBaseDuration;
      }
      return e;
    }
    function f_(e, t, a) {
      var i;
      return e === Nh ? (i = at, t === !0 && (i |= Yt, i |= bt)) : i = ke, Jr && (i |= xt), li(ae, null, null, i);
    }
    function qS(e, t, a, i, u, s) {
      var f = jt, p = e;
      if (typeof e == "function")
        GS(e) ? (f = pe, p = $S(p)) : p = Bf(p);
      else if (typeof e == "string")
        f = ce;
      else
        e: switch (e) {
          case fi:
            return Po(a.children, u, s, t);
          case Wa:
            f = st, u |= Yt, (u & at) !== ke && (u |= bt);
            break;
          case R:
            return d_(a, u, s, t);
          case ot:
            return p_(a, u, s, t);
          case Pe:
            return v_(a, u, s, t);
          case Xt:
            return yR(a, u, s, t);
          case ar:
          case On:
          case Ga:
          case wa:
          case rn:
          default: {
            if (typeof e == "object" && e !== null)
              switch (e.$$typeof) {
                case $:
                  f = it;
                  break e;
                case J:
                  f = un;
                  break e;
                case _e:
                  f = We, p = YS(p);
                  break e;
                case Be:
                  f = lt;
                  break e;
                case Oe:
                  f = en, p = null;
                  break e;
              }
            var v = "";
            {
              (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (v += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
              var y = i ? Ye(i) : null;
              y && (v += `

Check the render method of \`` + y + "`.");
            }
            throw new Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) " + ("but got: " + (e == null ? e : typeof e) + "." + v));
          }
        }
      var g = li(f, a, t, u);
      return g.elementType = e, g.type = p, g.lanes = s, g._debugOwner = i, g;
    }
    function XS(e, t, a) {
      var i = null;
      i = e._owner;
      var u = e.type, s = e.key, f = e.props, p = qS(u, s, f, i, t, a);
      return p._debugSource = e._source, p._debugOwner = e._owner, p;
    }
    function Po(e, t, a, i) {
      var u = li(pt, e, i, t);
      return u.lanes = a, u;
    }
    function d_(e, t, a, i) {
      typeof e.id != "string" && S('Profiler must specify an "id" of type `string` as a prop. Received the type `%s` instead.', typeof e.id);
      var u = li(ct, e, i, t | xt);
      return u.elementType = R, u.lanes = a, u.stateNode = {
        effectDuration: 0,
        passiveEffectDuration: 0
      }, u;
    }
    function p_(e, t, a, i) {
      var u = li(xe, e, i, t);
      return u.elementType = ot, u.lanes = a, u;
    }
    function v_(e, t, a, i) {
      var u = li(tn, e, i, t);
      return u.elementType = Pe, u.lanes = a, u;
    }
    function yR(e, t, a, i) {
      var u = li(be, e, i, t);
      u.elementType = Xt, u.lanes = a;
      var s = {
        isHidden: !1
      };
      return u.stateNode = s, u;
    }
    function KS(e, t, a) {
      var i = li(Qe, e, null, t);
      return i.lanes = a, i;
    }
    function h_() {
      var e = li(ce, null, null, ke);
      return e.elementType = "DELETED", e;
    }
    function m_(e) {
      var t = li(Gt, null, null, ke);
      return t.stateNode = e, t;
    }
    function ZS(e, t, a) {
      var i = e.children !== null ? e.children : [], u = li(we, i, e.key, t);
      return u.lanes = a, u.stateNode = {
        containerInfo: e.containerInfo,
        pendingChildren: null,
        // Used by persistent updates
        implementation: e.implementation
      }, u;
    }
    function gR(e, t) {
      return e === null && (e = li(jt, null, null, ke)), e.tag = t.tag, e.key = t.key, e.elementType = t.elementType, e.type = t.type, e.stateNode = t.stateNode, e.return = t.return, e.child = t.child, e.sibling = t.sibling, e.index = t.index, e.ref = t.ref, e.pendingProps = t.pendingProps, e.memoizedProps = t.memoizedProps, e.updateQueue = t.updateQueue, e.memoizedState = t.memoizedState, e.dependencies = t.dependencies, e.mode = t.mode, e.flags = t.flags, e.subtreeFlags = t.subtreeFlags, e.deletions = t.deletions, e.lanes = t.lanes, e.childLanes = t.childLanes, e.alternate = t.alternate, e.actualDuration = t.actualDuration, e.actualStartTime = t.actualStartTime, e.selfBaseDuration = t.selfBaseDuration, e.treeBaseDuration = t.treeBaseDuration, e._debugSource = t._debugSource, e._debugOwner = t._debugOwner, e._debugNeedsRemount = t._debugNeedsRemount, e._debugHookTypes = t._debugHookTypes, e;
    }
    function y_(e, t, a, i, u) {
      this.tag = t, this.containerInfo = e, this.pendingChildren = null, this.current = null, this.pingCache = null, this.finishedWork = null, this.timeoutHandle = Ny, this.context = null, this.pendingContext = null, this.callbackNode = null, this.callbackPriority = Rt, this.eventTimes = Ts(B), this.expirationTimes = Ts(Wt), this.pendingLanes = B, this.suspendedLanes = B, this.pingedLanes = B, this.expiredLanes = B, this.mutableReadLanes = B, this.finishedLanes = B, this.entangledLanes = B, this.entanglements = Ts(B), this.identifierPrefix = i, this.onRecoverableError = u, this.mutableSourceEagerHydrationData = null, this.effectDuration = 0, this.passiveEffectDuration = 0;
      {
        this.memoizedUpdaters = /* @__PURE__ */ new Set();
        for (var s = this.pendingUpdatersLaneMap = [], f = 0; f < yu; f++)
          s.push(/* @__PURE__ */ new Set());
      }
      switch (t) {
        case Nh:
          this._debugRootType = a ? "hydrateRoot()" : "createRoot()";
          break;
        case Do:
          this._debugRootType = a ? "hydrate()" : "render()";
          break;
      }
    }
    function SR(e, t, a, i, u, s, f, p, v, y) {
      var g = new y_(e, t, a, p, v), b = f_(t, s);
      g.current = b, b.stateNode = g;
      {
        var w = {
          element: i,
          isDehydrated: a,
          cache: null,
          // not enabled yet
          transitions: null,
          pendingSuspenseBoundaries: null
        };
        b.memoizedState = w;
      }
      return fg(b), g;
    }
    var JS = "18.3.1";
    function g_(e, t, a) {
      var i = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
      return Ir(i), {
        // This tag allow us to uniquely identify this as a React Portal
        $$typeof: rr,
        key: i == null ? null : "" + i,
        children: e,
        containerInfo: t,
        implementation: a
      };
    }
    var eE, tE;
    eE = !1, tE = {};
    function ER(e) {
      if (!e)
        return ii;
      var t = so(e), a = ew(t);
      if (t.tag === pe) {
        var i = t.type;
        if (Bl(i))
          return WE(t, i, a);
      }
      return a;
    }
    function S_(e, t) {
      {
        var a = so(e);
        if (a === void 0) {
          if (typeof e.render == "function")
            throw new Error("Unable to find node on an unmounted component.");
          var i = Object.keys(e).join(",");
          throw new Error("Argument appears to not be a ReactComponent. Keys: " + i);
        }
        var u = Kr(a);
        if (u === null)
          return null;
        if (u.mode & Yt) {
          var s = Ye(a) || "Component";
          if (!tE[s]) {
            tE[s] = !0;
            var f = ir;
            try {
              Pt(u), a.mode & Yt ? S("%s is deprecated in StrictMode. %s was passed an instance of %s which is inside StrictMode. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", t, t, s) : S("%s is deprecated in StrictMode. %s was passed an instance of %s which renders StrictMode children. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", t, t, s);
            } finally {
              f ? Pt(f) : an();
            }
          }
        }
        return u.stateNode;
      }
    }
    function CR(e, t, a, i, u, s, f, p) {
      var v = !1, y = null;
      return SR(e, t, v, y, a, i, u, s, f);
    }
    function RR(e, t, a, i, u, s, f, p, v, y) {
      var g = !0, b = SR(a, i, g, e, u, s, f, p, v);
      b.context = ER(null);
      var w = b.current, M = Ca(), U = Ho(w), j = Au(M, U);
      return j.callback = t ?? null, Lo(w, j, U), bb(b, U, M), b;
    }
    function Qp(e, t, a, i) {
      hd(t, e);
      var u = t.current, s = Ca(), f = Ho(u);
      yn(f);
      var p = ER(a);
      t.context === null ? t.context = p : t.pendingContext = p, pi && ir !== null && !eE && (eE = !0, S(`Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.

Check the render method of %s.`, Ye(ir) || "Unknown"));
      var v = Au(s, f);
      v.payload = {
        element: e
      }, i = i === void 0 ? null : i, i !== null && (typeof i != "function" && S("render(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", i), v.callback = i);
      var y = Lo(u, v, f);
      return y !== null && (yr(y, u, f, s), Gh(y, u, f)), f;
    }
    function Fm(e) {
      var t = e.current;
      if (!t.child)
        return null;
      switch (t.child.tag) {
        case ce:
          return t.child.stateNode;
        default:
          return t.child.stateNode;
      }
    }
    function E_(e) {
      switch (e.tag) {
        case ae: {
          var t = e.stateNode;
          if (Jc(t)) {
            var a = Nv(t);
            Ob(t, a);
          }
          break;
        }
        case xe: {
          Vu(function() {
            var u = Ha(e, Fe);
            if (u !== null) {
              var s = Ca();
              yr(u, e, Fe, s);
            }
          });
          var i = Fe;
          nE(e, i);
          break;
        }
      }
    }
    function TR(e, t) {
      var a = e.memoizedState;
      a !== null && a.dehydrated !== null && (a.retryLane = jv(a.retryLane, t));
    }
    function nE(e, t) {
      TR(e, t);
      var a = e.alternate;
      a && TR(a, t);
    }
    function C_(e) {
      if (e.tag === xe) {
        var t = ys, a = Ha(e, t);
        if (a !== null) {
          var i = Ca();
          yr(a, e, t, i);
        }
        nE(e, t);
      }
    }
    function R_(e) {
      if (e.tag === xe) {
        var t = Ho(e), a = Ha(e, t);
        if (a !== null) {
          var i = Ca();
          yr(a, e, t, i);
        }
        nE(e, t);
      }
    }
    function wR(e) {
      var t = cn(e);
      return t === null ? null : t.stateNode;
    }
    var xR = function(e) {
      return null;
    };
    function T_(e) {
      return xR(e);
    }
    var bR = function(e) {
      return !1;
    };
    function w_(e) {
      return bR(e);
    }
    var _R = null, DR = null, kR = null, OR = null, LR = null, MR = null, NR = null, zR = null, UR = null;
    {
      var AR = function(e, t, a) {
        var i = t[a], u = et(e) ? e.slice() : rt({}, e);
        return a + 1 === t.length ? (et(u) ? u.splice(i, 1) : delete u[i], u) : (u[i] = AR(e[i], t, a + 1), u);
      }, FR = function(e, t) {
        return AR(e, t, 0);
      }, jR = function(e, t, a, i) {
        var u = t[i], s = et(e) ? e.slice() : rt({}, e);
        if (i + 1 === t.length) {
          var f = a[i];
          s[f] = s[u], et(s) ? s.splice(u, 1) : delete s[u];
        } else
          s[u] = jR(
            // $FlowFixMe number or string is fine here
            e[u],
            t,
            a,
            i + 1
          );
        return s;
      }, HR = function(e, t, a) {
        if (t.length !== a.length) {
          zt("copyWithRename() expects paths of the same length");
          return;
        } else
          for (var i = 0; i < a.length - 1; i++)
            if (t[i] !== a[i]) {
              zt("copyWithRename() expects paths to be the same except for the deepest key");
              return;
            }
        return jR(e, t, a, 0);
      }, VR = function(e, t, a, i) {
        if (a >= t.length)
          return i;
        var u = t[a], s = et(e) ? e.slice() : rt({}, e);
        return s[u] = VR(e[u], t, a + 1, i), s;
      }, PR = function(e, t, a) {
        return VR(e, t, 0, a);
      }, rE = function(e, t) {
        for (var a = e.memoizedState; a !== null && t > 0; )
          a = a.next, t--;
        return a;
      };
      _R = function(e, t, a, i) {
        var u = rE(e, t);
        if (u !== null) {
          var s = PR(u.memoizedState, a, i);
          u.memoizedState = s, u.baseState = s, e.memoizedProps = rt({}, e.memoizedProps);
          var f = Ha(e, Fe);
          f !== null && yr(f, e, Fe, Wt);
        }
      }, DR = function(e, t, a) {
        var i = rE(e, t);
        if (i !== null) {
          var u = FR(i.memoizedState, a);
          i.memoizedState = u, i.baseState = u, e.memoizedProps = rt({}, e.memoizedProps);
          var s = Ha(e, Fe);
          s !== null && yr(s, e, Fe, Wt);
        }
      }, kR = function(e, t, a, i) {
        var u = rE(e, t);
        if (u !== null) {
          var s = HR(u.memoizedState, a, i);
          u.memoizedState = s, u.baseState = s, e.memoizedProps = rt({}, e.memoizedProps);
          var f = Ha(e, Fe);
          f !== null && yr(f, e, Fe, Wt);
        }
      }, OR = function(e, t, a) {
        e.pendingProps = PR(e.memoizedProps, t, a), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var i = Ha(e, Fe);
        i !== null && yr(i, e, Fe, Wt);
      }, LR = function(e, t) {
        e.pendingProps = FR(e.memoizedProps, t), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var a = Ha(e, Fe);
        a !== null && yr(a, e, Fe, Wt);
      }, MR = function(e, t, a) {
        e.pendingProps = HR(e.memoizedProps, t, a), e.alternate && (e.alternate.pendingProps = e.pendingProps);
        var i = Ha(e, Fe);
        i !== null && yr(i, e, Fe, Wt);
      }, NR = function(e) {
        var t = Ha(e, Fe);
        t !== null && yr(t, e, Fe, Wt);
      }, zR = function(e) {
        xR = e;
      }, UR = function(e) {
        bR = e;
      };
    }
    function x_(e) {
      var t = Kr(e);
      return t === null ? null : t.stateNode;
    }
    function b_(e) {
      return null;
    }
    function __() {
      return ir;
    }
    function D_(e) {
      var t = e.findFiberByHostInstance, a = F.ReactCurrentDispatcher;
      return po({
        bundleType: e.bundleType,
        version: e.version,
        rendererPackageName: e.rendererPackageName,
        rendererConfig: e.rendererConfig,
        overrideHookState: _R,
        overrideHookStateDeletePath: DR,
        overrideHookStateRenamePath: kR,
        overrideProps: OR,
        overridePropsDeletePath: LR,
        overridePropsRenamePath: MR,
        setErrorHandler: zR,
        setSuspenseHandler: UR,
        scheduleUpdate: NR,
        currentDispatcherRef: a,
        findHostInstanceByFiber: x_,
        findFiberByHostInstance: t || b_,
        // React Refresh
        findHostInstancesForRefresh: a_,
        scheduleRefresh: n_,
        scheduleRoot: r_,
        setRefreshHandler: t_,
        // Enables DevTools to append owner stacks to error messages in DEV mode.
        getCurrentFiber: __,
        // Enables DevTools to detect reconciler version rather than renderer version
        // which may not match for third party renderers.
        reconcilerVersion: JS
      });
    }
    var BR = typeof reportError == "function" ? (
      // In modern browsers, reportError will dispatch an error event,
      // emulating an uncaught JavaScript error.
      reportError
    ) : function(e) {
      console.error(e);
    };
    function aE(e) {
      this._internalRoot = e;
    }
    jm.prototype.render = aE.prototype.render = function(e) {
      var t = this._internalRoot;
      if (t === null)
        throw new Error("Cannot update an unmounted root.");
      {
        typeof arguments[1] == "function" ? S("render(...): does not support the second callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().") : Hm(arguments[1]) ? S("You passed a container to the second argument of root.render(...). You don't need to pass it again since you already passed it to create the root.") : typeof arguments[1] < "u" && S("You passed a second argument to root.render(...) but it only accepts one argument.");
        var a = t.containerInfo;
        if (a.nodeType !== Ln) {
          var i = wR(t.current);
          i && i.parentNode !== a && S("render(...): It looks like the React-rendered content of the root container was removed without using React. This is not supported and will cause errors. Instead, call root.unmount() to empty a root's container.");
        }
      }
      Qp(e, t, null, null);
    }, jm.prototype.unmount = aE.prototype.unmount = function() {
      typeof arguments[0] == "function" && S("unmount(...): does not support a callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().");
      var e = this._internalRoot;
      if (e !== null) {
        this._internalRoot = null;
        var t = e.containerInfo;
        eR() && S("Attempted to synchronously unmount a root while React was already rendering. React cannot finish unmounting the root until the current render has completed, which may lead to a race condition."), Vu(function() {
          Qp(null, e, null, null);
        }), BE(t);
      }
    };
    function k_(e, t) {
      if (!Hm(e))
        throw new Error("createRoot(...): Target container is not a DOM element.");
      $R(e);
      var a = !1, i = !1, u = "", s = BR;
      t != null && (t.hydrate ? zt("hydrate through createRoot is deprecated. Use ReactDOMClient.hydrateRoot(container, <App />) instead.") : typeof t == "object" && t !== null && t.$$typeof === Qr && S(`You passed a JSX element to createRoot. You probably meant to call root.render instead. Example usage:

  let root = createRoot(domContainer);
  root.render(<App />);`), t.unstable_strictMode === !0 && (a = !0), t.identifierPrefix !== void 0 && (u = t.identifierPrefix), t.onRecoverableError !== void 0 && (s = t.onRecoverableError), t.transitionCallbacks !== void 0 && t.transitionCallbacks);
      var f = CR(e, Nh, null, a, i, u, s);
      bh(f.current, e);
      var p = e.nodeType === Ln ? e.parentNode : e;
      return Zd(p), new aE(f);
    }
    function jm(e) {
      this._internalRoot = e;
    }
    function O_(e) {
      e && Gv(e);
    }
    jm.prototype.unstable_scheduleHydration = O_;
    function L_(e, t, a) {
      if (!Hm(e))
        throw new Error("hydrateRoot(...): Target container is not a DOM element.");
      $R(e), t === void 0 && S("Must provide initial children as second argument to hydrateRoot. Example usage: hydrateRoot(domContainer, <App />)");
      var i = a ?? null, u = a != null && a.hydratedSources || null, s = !1, f = !1, p = "", v = BR;
      a != null && (a.unstable_strictMode === !0 && (s = !0), a.identifierPrefix !== void 0 && (p = a.identifierPrefix), a.onRecoverableError !== void 0 && (v = a.onRecoverableError));
      var y = RR(t, null, e, Nh, i, s, f, p, v);
      if (bh(y.current, e), Zd(e), u)
        for (var g = 0; g < u.length; g++) {
          var b = u[g];
          Uw(y, b);
        }
      return new jm(y);
    }
    function Hm(e) {
      return !!(e && (e.nodeType === Gr || e.nodeType === Bi || e.nodeType === ed));
    }
    function Wp(e) {
      return !!(e && (e.nodeType === Gr || e.nodeType === Bi || e.nodeType === ed || e.nodeType === Ln && e.nodeValue === " react-mount-point-unstable "));
    }
    function $R(e) {
      e.nodeType === Gr && e.tagName && e.tagName.toUpperCase() === "BODY" && S("createRoot(): Creating roots directly with document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try using a container element created for your app."), sp(e) && (e._reactRootContainer ? S("You are calling ReactDOMClient.createRoot() on a container that was previously passed to ReactDOM.render(). This is not supported.") : S("You are calling ReactDOMClient.createRoot() on a container that has already been passed to createRoot() before. Instead, call root.render() on the existing root instead if you want to update it."));
    }
    var M_ = F.ReactCurrentOwner, YR;
    YR = function(e) {
      if (e._reactRootContainer && e.nodeType !== Ln) {
        var t = wR(e._reactRootContainer.current);
        t && t.parentNode !== e && S("render(...): It looks like the React-rendered content of this container was removed without using React. This is not supported and will cause errors. Instead, call ReactDOM.unmountComponentAtNode to empty a container.");
      }
      var a = !!e._reactRootContainer, i = iE(e), u = !!(i && bo(i));
      u && !a && S("render(...): Replacing React-rendered children with a new root component. If you intended to update the children of this node, you should instead have the existing children update their state and render the new components instead of calling ReactDOM.render."), e.nodeType === Gr && e.tagName && e.tagName.toUpperCase() === "BODY" && S("render(): Rendering components directly into document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try rendering into a container element created for your app.");
    };
    function iE(e) {
      return e ? e.nodeType === Bi ? e.documentElement : e.firstChild : null;
    }
    function IR() {
    }
    function N_(e, t, a, i, u) {
      if (u) {
        if (typeof i == "function") {
          var s = i;
          i = function() {
            var w = Fm(f);
            s.call(w);
          };
        }
        var f = RR(
          t,
          i,
          e,
          Do,
          null,
          // hydrationCallbacks
          !1,
          // isStrictMode
          !1,
          // concurrentUpdatesByDefaultOverride,
          "",
          // identifierPrefix
          IR
        );
        e._reactRootContainer = f, bh(f.current, e);
        var p = e.nodeType === Ln ? e.parentNode : e;
        return Zd(p), Vu(), f;
      } else {
        for (var v; v = e.lastChild; )
          e.removeChild(v);
        if (typeof i == "function") {
          var y = i;
          i = function() {
            var w = Fm(g);
            y.call(w);
          };
        }
        var g = CR(
          e,
          Do,
          null,
          // hydrationCallbacks
          !1,
          // isStrictMode
          !1,
          // concurrentUpdatesByDefaultOverride,
          "",
          // identifierPrefix
          IR
        );
        e._reactRootContainer = g, bh(g.current, e);
        var b = e.nodeType === Ln ? e.parentNode : e;
        return Zd(b), Vu(function() {
          Qp(t, g, a, i);
        }), g;
      }
    }
    function z_(e, t) {
      e !== null && typeof e != "function" && S("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t, e);
    }
    function Vm(e, t, a, i, u) {
      YR(a), z_(u === void 0 ? null : u, "render");
      var s = a._reactRootContainer, f;
      if (!s)
        f = N_(a, t, e, u, i);
      else {
        if (f = s, typeof u == "function") {
          var p = u;
          u = function() {
            var v = Fm(f);
            p.call(v);
          };
        }
        Qp(t, f, e, u);
      }
      return Fm(f);
    }
    var QR = !1;
    function U_(e) {
      {
        QR || (QR = !0, S("findDOMNode is deprecated and will be removed in the next major release. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node"));
        var t = M_.current;
        if (t !== null && t.stateNode !== null) {
          var a = t.stateNode._warnedAboutRefsInRender;
          a || S("%s is accessing findDOMNode inside its render(). render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", gt(t.type) || "A component"), t.stateNode._warnedAboutRefsInRender = !0;
        }
      }
      return e == null ? null : e.nodeType === Gr ? e : S_(e, "findDOMNode");
    }
    function A_(e, t, a) {
      if (S("ReactDOM.hydrate is no longer supported in React 18. Use hydrateRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !Wp(t))
        throw new Error("Target container is not a DOM element.");
      {
        var i = sp(t) && t._reactRootContainer === void 0;
        i && S("You are calling ReactDOM.hydrate() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call hydrateRoot(container, element)?");
      }
      return Vm(null, e, t, !0, a);
    }
    function F_(e, t, a) {
      if (S("ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !Wp(t))
        throw new Error("Target container is not a DOM element.");
      {
        var i = sp(t) && t._reactRootContainer === void 0;
        i && S("You are calling ReactDOM.render() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.render(element)?");
      }
      return Vm(null, e, t, !1, a);
    }
    function j_(e, t, a, i) {
      if (S("ReactDOM.unstable_renderSubtreeIntoContainer() is no longer supported in React 18. Consider using a portal instead. Until you switch to the createRoot API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !Wp(a))
        throw new Error("Target container is not a DOM element.");
      if (e == null || !ny(e))
        throw new Error("parentComponent must be a valid React Component");
      return Vm(e, t, a, !1, i);
    }
    var WR = !1;
    function H_(e) {
      if (WR || (WR = !0, S("unmountComponentAtNode is deprecated and will be removed in the next major release. Switch to the createRoot API. Learn more: https://reactjs.org/link/switch-to-createroot")), !Wp(e))
        throw new Error("unmountComponentAtNode(...): Target container is not a DOM element.");
      {
        var t = sp(e) && e._reactRootContainer === void 0;
        t && S("You are calling ReactDOM.unmountComponentAtNode() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.unmount()?");
      }
      if (e._reactRootContainer) {
        {
          var a = iE(e), i = a && !bo(a);
          i && S("unmountComponentAtNode(): The node you're attempting to unmount was rendered by another copy of React.");
        }
        return Vu(function() {
          Vm(null, null, e, !1, function() {
            e._reactRootContainer = null, BE(e);
          });
        }), !0;
      } else {
        {
          var u = iE(e), s = !!(u && bo(u)), f = e.nodeType === Gr && Wp(e.parentNode) && !!e.parentNode._reactRootContainer;
          s && S("unmountComponentAtNode(): The node you're attempting to unmount was rendered by React and is not a top-level container. %s", f ? "You may have accidentally passed in a React root node instead of its container." : "Instead, have the parent component update its state and rerender in order to remove this component.");
        }
        return !1;
      }
    }
    xr(E_), yo(C_), Yv(R_), Ds(Aa), Ud(Pv), (typeof Map != "function" || // $FlowIssue Flow incorrectly thinks Map has no prototype
    Map.prototype == null || typeof Map.prototype.forEach != "function" || typeof Set != "function" || // $FlowIssue Flow incorrectly thinks Set has no prototype
    Set.prototype == null || typeof Set.prototype.clear != "function" || typeof Set.prototype.forEach != "function") && S("React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"), mc(PT), ty(AS, Lb, Vu);
    function V_(e, t) {
      var a = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
      if (!Hm(t))
        throw new Error("Target container is not a DOM element.");
      return g_(e, t, null, a);
    }
    function P_(e, t, a, i) {
      return j_(e, t, a, i);
    }
    var lE = {
      usingClientEntryPoint: !1,
      // Keep in sync with ReactTestUtils.js.
      // This is an array for better minification.
      Events: [bo, Sf, _h, io, yc, AS]
    };
    function B_(e, t) {
      return lE.usingClientEntryPoint || S('You are importing createRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), k_(e, t);
    }
    function $_(e, t, a) {
      return lE.usingClientEntryPoint || S('You are importing hydrateRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), L_(e, t, a);
    }
    function Y_(e) {
      return eR() && S("flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task."), Vu(e);
    }
    var I_ = D_({
      findFiberByHostInstance: Bs,
      bundleType: 1,
      version: JS,
      rendererPackageName: "react-dom"
    });
    if (!I_ && Dn && window.top === window.self && (navigator.userAgent.indexOf("Chrome") > -1 && navigator.userAgent.indexOf("Edge") === -1 || navigator.userAgent.indexOf("Firefox") > -1)) {
      var GR = window.location.protocol;
      /^(https?|file):$/.test(GR) && console.info("%cDownload the React DevTools for a better development experience: https://reactjs.org/link/react-devtools" + (GR === "file:" ? `
You might need to use a local HTTP server (instead of file://): https://reactjs.org/link/react-devtools-faq` : ""), "font-weight:bold");
    }
    Ya.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = lE, Ya.createPortal = V_, Ya.createRoot = B_, Ya.findDOMNode = U_, Ya.flushSync = Y_, Ya.hydrate = A_, Ya.hydrateRoot = $_, Ya.render = F_, Ya.unmountComponentAtNode = H_, Ya.unstable_batchedUpdates = AS, Ya.unstable_renderSubtreeIntoContainer = P_, Ya.version = JS, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  }()), Ya;
}
function uT() {
  if (!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u" || typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE != "function")) {
    if (process.env.NODE_ENV !== "production")
      throw new Error("^_^");
    try {
      __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(uT);
    } catch (te) {
      console.error(te);
    }
  }
}
process.env.NODE_ENV === "production" ? (uT(), dE.exports = eD()) : dE.exports = tD();
var nD = dE.exports, pE, Ym = nD;
if (process.env.NODE_ENV === "production")
  pE = Ym.createRoot, Ym.hydrateRoot;
else {
  var aT = Ym.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  pE = function(te, Z) {
    aT.usingClientEntryPoint = !0;
    try {
      return Ym.createRoot(te, Z);
    } finally {
      aT.usingClientEntryPoint = !1;
    }
  };
}
function rD() {
  const te = window.location.pathname;
  return /* @__PURE__ */ fE.jsxDEV("div", { style: { padding: "8px 0" }, children: /* @__PURE__ */ fE.jsxDEV("span", { style: { display: "inline-block", padding: "6px 10px", border: "1px solid #e5e7eb", borderRadius: 8, background: "#F7FAFC", color: "#374151" }, children: [
    "React active on ",
    te
  ] }, void 0, !0, {
    fileName: "/app/code/client/App.jsx",
    lineNumber: 7,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "/app/code/client/App.jsx",
    lineNumber: 6,
    columnNumber: 5
  }, this);
}
function iT() {
  const te = document.getElementById("react-root");
  if (!te) return;
  pE(te).render(/* @__PURE__ */ fE.jsxDEV(rD, {}, void 0, !1, {
    fileName: "/app/code/client/main.jsx",
    lineNumber: 9,
    columnNumber: 15
  }, this));
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", iT) : iT();
