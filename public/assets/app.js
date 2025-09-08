function A1(c, m) {
  for (var h = 0; h < m.length; h++) {
    const g = m[h];
    if (typeof g != "string" && !Array.isArray(g)) {
      for (const N in g)
        if (N !== "default" && !(N in c)) {
          const R = Object.getOwnPropertyDescriptor(g, N);
          R && Object.defineProperty(c, N, R.get ? R : {
            enumerable: !0,
            get: () => g[N]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(c, Symbol.toStringTag, { value: "Module" }));
}
function k1(c) {
  return c && c.__esModule && Object.prototype.hasOwnProperty.call(c, "default") ? c.default : c;
}
var oE = { exports: {} }, wv = {}, uE = { exports: {} }, hf = { exports: {} };
hf.exports;
(function(c, m) {
  /**
   * @license React
   * react.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  (function() {
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
    var h = "18.3.1", g = Symbol.for("react.element"), N = Symbol.for("react.portal"), R = Symbol.for("react.fragment"), f = Symbol.for("react.strict_mode"), A = Symbol.for("react.profiler"), C = Symbol.for("react.provider"), T = Symbol.for("react.context"), _ = Symbol.for("react.forward_ref"), S = Symbol.for("react.suspense"), M = Symbol.for("react.suspense_list"), z = Symbol.for("react.memo"), W = Symbol.for("react.lazy"), fe = Symbol.for("react.offscreen"), J = Symbol.iterator, ue = "@@iterator";
    function B(s) {
      if (s === null || typeof s != "object")
        return null;
      var y = J && s[J] || s[ue];
      return typeof y == "function" ? y : null;
    }
    var G = {
      /**
       * @internal
       * @type {ReactComponent}
       */
      current: null
    }, P = {
      transition: null
    }, X = {
      current: null,
      // Used to reproduce behavior of `batchedUpdates` in legacy mode.
      isBatchingLegacy: !1,
      didScheduleLegacyUpdate: !1
    }, te = {
      /**
       * @internal
       * @type {ReactComponent}
       */
      current: null
    }, $ = {}, xe = null;
    function Q(s) {
      xe = s;
    }
    $.setExtraStackFrame = function(s) {
      xe = s;
    }, $.getCurrentStack = null, $.getStackAddendum = function() {
      var s = "";
      xe && (s += xe);
      var y = $.getCurrentStack;
      return y && (s += y() || ""), s;
    };
    var Re = !1, ye = !1, Ce = !1, de = !1, we = !1, Ie = {
      ReactCurrentDispatcher: G,
      ReactCurrentBatchConfig: P,
      ReactCurrentOwner: te
    };
    Ie.ReactDebugCurrentFrame = $, Ie.ReactCurrentActQueue = X;
    function qe(s) {
      {
        for (var y = arguments.length, L = new Array(y > 1 ? y - 1 : 0), k = 1; k < y; k++)
          L[k - 1] = arguments[k];
        jt("warn", s, L);
      }
    }
    function Ve(s) {
      {
        for (var y = arguments.length, L = new Array(y > 1 ? y - 1 : 0), k = 1; k < y; k++)
          L[k - 1] = arguments[k];
        jt("error", s, L);
      }
    }
    function jt(s, y, L) {
      {
        var k = Ie.ReactDebugCurrentFrame, K = k.getStackAddendum();
        K !== "" && (y += "%s", L = L.concat([K]));
        var Ne = L.map(function(ce) {
          return String(ce);
        });
        Ne.unshift("Warning: " + y), Function.prototype.apply.call(console[s], console, Ne);
      }
    }
    var da = {};
    function Bn(s, y) {
      {
        var L = s.constructor, k = L && (L.displayName || L.name) || "ReactClass", K = k + "." + y;
        if (da[K])
          return;
        Ve("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", y, k), da[K] = !0;
      }
    }
    var Zn = {
      /**
       * Checks whether or not this composite component is mounted.
       * @param {ReactClass} publicInstance The instance we want to test.
       * @return {boolean} True if mounted, false otherwise.
       * @protected
       * @final
       */
      isMounted: function(s) {
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
      enqueueForceUpdate: function(s, y, L) {
        Bn(s, "forceUpdate");
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
      enqueueReplaceState: function(s, y, L, k) {
        Bn(s, "replaceState");
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
      enqueueSetState: function(s, y, L, k) {
        Bn(s, "setState");
      }
    }, Ht = Object.assign, pa = {};
    Object.freeze(pa);
    function bn(s, y, L) {
      this.props = s, this.context = y, this.refs = pa, this.updater = L || Zn;
    }
    bn.prototype.isReactComponent = {}, bn.prototype.setState = function(s, y) {
      if (typeof s != "object" && typeof s != "function" && s != null)
        throw new Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
      this.updater.enqueueSetState(this, s, y, "setState");
    }, bn.prototype.forceUpdate = function(s) {
      this.updater.enqueueForceUpdate(this, s, "forceUpdate");
    };
    {
      var er = {
        isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
        replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
      }, ka = function(s, y) {
        Object.defineProperty(bn.prototype, s, {
          get: function() {
            qe("%s(...) is deprecated in plain JavaScript React classes. %s", y[0], y[1]);
          }
        });
      };
      for (var Qt in er)
        er.hasOwnProperty(Qt) && ka(Qt, er[Qt]);
    }
    function Pn() {
    }
    Pn.prototype = bn.prototype;
    function Kt(s, y, L) {
      this.props = s, this.context = y, this.refs = pa, this.updater = L || Zn;
    }
    var Xt = Kt.prototype = new Pn();
    Xt.constructor = Kt, Ht(Xt, bn.prototype), Xt.isPureReactComponent = !0;
    function Jt() {
      var s = {
        current: null
      };
      return Object.seal(s), s;
    }
    var Ln = Array.isArray;
    function Bt(s) {
      return Ln(s);
    }
    function Nn(s) {
      {
        var y = typeof Symbol == "function" && Symbol.toStringTag, L = y && s[Symbol.toStringTag] || s.constructor.name || "Object";
        return L;
      }
    }
    function Pt(s) {
      try {
        return $t(s), !1;
      } catch {
        return !0;
      }
    }
    function $t(s) {
      return "" + s;
    }
    function ea(s) {
      if (Pt(s))
        return Ve("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Nn(s)), $t(s);
    }
    function tr(s, y, L) {
      var k = s.displayName;
      if (k)
        return k;
      var K = y.displayName || y.name || "";
      return K !== "" ? L + "(" + K + ")" : L;
    }
    function ma(s) {
      return s.displayName || "Context";
    }
    function Vn(s) {
      if (s == null)
        return null;
      if (typeof s.tag == "number" && Ve("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof s == "function")
        return s.displayName || s.name || null;
      if (typeof s == "string")
        return s;
      switch (s) {
        case R:
          return "Fragment";
        case N:
          return "Portal";
        case A:
          return "Profiler";
        case f:
          return "StrictMode";
        case S:
          return "Suspense";
        case M:
          return "SuspenseList";
      }
      if (typeof s == "object")
        switch (s.$$typeof) {
          case T:
            var y = s;
            return ma(y) + ".Consumer";
          case C:
            var L = s;
            return ma(L._context) + ".Provider";
          case _:
            return tr(s, s.render, "ForwardRef");
          case z:
            var k = s.displayName || null;
            return k !== null ? k : Vn(s.type) || "Memo";
          case W: {
            var K = s, Ne = K._payload, ce = K._init;
            try {
              return Vn(ce(Ne));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var cn = Object.prototype.hasOwnProperty, Zt = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, En, Ua, wt;
    wt = {};
    function xn(s) {
      if (cn.call(s, "ref")) {
        var y = Object.getOwnPropertyDescriptor(s, "ref").get;
        if (y && y.isReactWarning)
          return !1;
      }
      return s.ref !== void 0;
    }
    function Mn(s) {
      if (cn.call(s, "key")) {
        var y = Object.getOwnPropertyDescriptor(s, "key").get;
        if (y && y.isReactWarning)
          return !1;
      }
      return s.key !== void 0;
    }
    function _r(s, y) {
      var L = function() {
        En || (En = !0, Ve("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", y));
      };
      L.isReactWarning = !0, Object.defineProperty(s, "key", {
        get: L,
        configurable: !0
      });
    }
    function nr(s, y) {
      var L = function() {
        Ua || (Ua = !0, Ve("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", y));
      };
      L.isReactWarning = !0, Object.defineProperty(s, "ref", {
        get: L,
        configurable: !0
      });
    }
    function ee(s) {
      if (typeof s.ref == "string" && te.current && s.__self && te.current.stateNode !== s.__self) {
        var y = Vn(te.current.type);
        wt[y] || (Ve('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', y, s.ref), wt[y] = !0);
      }
    }
    var me = function(s, y, L, k, K, Ne, ce) {
      var _e = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: g,
        // Built-in properties that belong on the element
        type: s,
        key: y,
        ref: L,
        props: ce,
        // Record the component responsible for creating this element.
        _owner: Ne
      };
      return _e._store = {}, Object.defineProperty(_e._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(_e, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: k
      }), Object.defineProperty(_e, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: K
      }), Object.freeze && (Object.freeze(_e.props), Object.freeze(_e)), _e;
    };
    function ke(s, y, L) {
      var k, K = {}, Ne = null, ce = null, _e = null, Be = null;
      if (y != null) {
        xn(y) && (ce = y.ref, ee(y)), Mn(y) && (ea(y.key), Ne = "" + y.key), _e = y.__self === void 0 ? null : y.__self, Be = y.__source === void 0 ? null : y.__source;
        for (k in y)
          cn.call(y, k) && !Zt.hasOwnProperty(k) && (K[k] = y[k]);
      }
      var et = arguments.length - 2;
      if (et === 1)
        K.children = L;
      else if (et > 1) {
        for (var lt = Array(et), ot = 0; ot < et; ot++)
          lt[ot] = arguments[ot + 2];
        Object.freeze && Object.freeze(lt), K.children = lt;
      }
      if (s && s.defaultProps) {
        var Fe = s.defaultProps;
        for (k in Fe)
          K[k] === void 0 && (K[k] = Fe[k]);
      }
      if (Ne || ce) {
        var mt = typeof s == "function" ? s.displayName || s.name || "Unknown" : s;
        Ne && _r(K, mt), ce && nr(K, mt);
      }
      return me(s, Ne, ce, _e, Be, te.current, K);
    }
    function Ze(s, y) {
      var L = me(s.type, y, s.ref, s._self, s._source, s._owner, s.props);
      return L;
    }
    function st(s, y, L) {
      if (s == null)
        throw new Error("React.cloneElement(...): The argument must be a React element, but you passed " + s + ".");
      var k, K = Ht({}, s.props), Ne = s.key, ce = s.ref, _e = s._self, Be = s._source, et = s._owner;
      if (y != null) {
        xn(y) && (ce = y.ref, et = te.current), Mn(y) && (ea(y.key), Ne = "" + y.key);
        var lt;
        s.type && s.type.defaultProps && (lt = s.type.defaultProps);
        for (k in y)
          cn.call(y, k) && !Zt.hasOwnProperty(k) && (y[k] === void 0 && lt !== void 0 ? K[k] = lt[k] : K[k] = y[k]);
      }
      var ot = arguments.length - 2;
      if (ot === 1)
        K.children = L;
      else if (ot > 1) {
        for (var Fe = Array(ot), mt = 0; mt < ot; mt++)
          Fe[mt] = arguments[mt + 2];
        K.children = Fe;
      }
      return me(s.type, Ne, ce, _e, Be, et, K);
    }
    function ht(s) {
      return typeof s == "object" && s !== null && s.$$typeof === g;
    }
    var yt = ".", fn = ":";
    function bt(s) {
      var y = /[=:]/g, L = {
        "=": "=0",
        ":": "=2"
      }, k = s.replace(y, function(K) {
        return L[K];
      });
      return "$" + k;
    }
    var rt = !1, Nt = /\/+/g;
    function va(s) {
      return s.replace(Nt, "$&/");
    }
    function ha(s, y) {
      return typeof s == "object" && s !== null && s.key != null ? (ea(s.key), bt("" + s.key)) : y.toString(36);
    }
    function ta(s, y, L, k, K) {
      var Ne = typeof s;
      (Ne === "undefined" || Ne === "boolean") && (s = null);
      var ce = !1;
      if (s === null)
        ce = !0;
      else
        switch (Ne) {
          case "string":
          case "number":
            ce = !0;
            break;
          case "object":
            switch (s.$$typeof) {
              case g:
              case N:
                ce = !0;
            }
        }
      if (ce) {
        var _e = s, Be = K(_e), et = k === "" ? yt + ha(_e, 0) : k;
        if (Bt(Be)) {
          var lt = "";
          et != null && (lt = va(et) + "/"), ta(Be, y, lt, "", function(Cf) {
            return Cf;
          });
        } else Be != null && (ht(Be) && (Be.key && (!_e || _e.key !== Be.key) && ea(Be.key), Be = Ze(
          Be,
          // Keep both the (mapped) and old keys if they differ, just as
          // traverseAllChildren used to do for objects as children
          L + // $FlowFixMe Flow incorrectly thinks React.Portal doesn't have a key
          (Be.key && (!_e || _e.key !== Be.key) ? (
            // $FlowFixMe Flow incorrectly thinks existing element's key can be a number
            // eslint-disable-next-line react-internal/safe-string-coercion
            va("" + Be.key) + "/"
          ) : "") + et
        )), y.push(Be));
        return 1;
      }
      var ot, Fe, mt = 0, Rt = k === "" ? yt : k + fn;
      if (Bt(s))
        for (var bi = 0; bi < s.length; bi++)
          ot = s[bi], Fe = Rt + ha(ot, bi), mt += ta(ot, y, L, Fe, K);
      else {
        var go = B(s);
        if (typeof go == "function") {
          var lr = s;
          go === lr.entries && (rt || qe("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), rt = !0);
          for (var bo = go.call(lr), No, Rf = 0; !(No = bo.next()).done; )
            ot = No.value, Fe = Rt + ha(ot, Rf++), mt += ta(ot, y, L, Fe, K);
        } else if (Ne === "object") {
          var ps = String(s);
          throw new Error("Objects are not valid as a React child (found: " + (ps === "[object Object]" ? "object with keys {" + Object.keys(s).join(", ") + "}" : ps) + "). If you meant to render a collection of children, use an array instead.");
        }
      }
      return mt;
    }
    function ar(s, y, L) {
      if (s == null)
        return s;
      var k = [], K = 0;
      return ta(s, k, "", "", function(Ne) {
        return y.call(L, Ne, K++);
      }), k;
    }
    function no(s) {
      var y = 0;
      return ar(s, function() {
        y++;
      }), y;
    }
    function si(s, y, L) {
      ar(s, function() {
        y.apply(this, arguments);
      }, L);
    }
    function Ki(s) {
      return ar(s, function(y) {
        return y;
      }) || [];
    }
    function Xi(s) {
      if (!ht(s))
        throw new Error("React.Children.only expected to receive a single React element child.");
      return s;
    }
    function ci(s) {
      var y = {
        $$typeof: T,
        // As a workaround to support multiple concurrent renderers, we categorize
        // some renderers as primary and others as secondary. We only expect
        // there to be two concurrent renderers at most: React Native (primary) and
        // Fabric (secondary); React DOM (primary) and React ART (secondary).
        // Secondary renderers store their context values on separate fields.
        _currentValue: s,
        _currentValue2: s,
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
      y.Provider = {
        $$typeof: C,
        _context: y
      };
      var L = !1, k = !1, K = !1;
      {
        var Ne = {
          $$typeof: T,
          _context: y
        };
        Object.defineProperties(Ne, {
          Provider: {
            get: function() {
              return k || (k = !0, Ve("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?")), y.Provider;
            },
            set: function(ce) {
              y.Provider = ce;
            }
          },
          _currentValue: {
            get: function() {
              return y._currentValue;
            },
            set: function(ce) {
              y._currentValue = ce;
            }
          },
          _currentValue2: {
            get: function() {
              return y._currentValue2;
            },
            set: function(ce) {
              y._currentValue2 = ce;
            }
          },
          _threadCount: {
            get: function() {
              return y._threadCount;
            },
            set: function(ce) {
              y._threadCount = ce;
            }
          },
          Consumer: {
            get: function() {
              return L || (L = !0, Ve("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?")), y.Consumer;
            }
          },
          displayName: {
            get: function() {
              return y.displayName;
            },
            set: function(ce) {
              K || (qe("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.", ce), K = !0);
            }
          }
        }), y.Consumer = Ne;
      }
      return y._currentRenderer = null, y._currentRenderer2 = null, y;
    }
    var ya = -1, na = 0, $n = 1, Fa = 2;
    function fi(s) {
      if (s._status === ya) {
        var y = s._result, L = y();
        if (L.then(function(Ne) {
          if (s._status === na || s._status === ya) {
            var ce = s;
            ce._status = $n, ce._result = Ne;
          }
        }, function(Ne) {
          if (s._status === na || s._status === ya) {
            var ce = s;
            ce._status = Fa, ce._result = Ne;
          }
        }), s._status === ya) {
          var k = s;
          k._status = na, k._result = L;
        }
      }
      if (s._status === $n) {
        var K = s._result;
        return K === void 0 && Ve(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))

Did you accidentally put curly braces around the import?`, K), "default" in K || Ve(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))`, K), K.default;
      } else
        throw s._result;
    }
    function b(s) {
      var y = {
        // We use these fields to store the result.
        _status: ya,
        _result: s
      }, L = {
        $$typeof: W,
        _payload: y,
        _init: fi
      };
      {
        var k, K;
        Object.defineProperties(L, {
          defaultProps: {
            configurable: !0,
            get: function() {
              return k;
            },
            set: function(Ne) {
              Ve("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), k = Ne, Object.defineProperty(L, "defaultProps", {
                enumerable: !0
              });
            }
          },
          propTypes: {
            configurable: !0,
            get: function() {
              return K;
            },
            set: function(Ne) {
              Ve("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), K = Ne, Object.defineProperty(L, "propTypes", {
                enumerable: !0
              });
            }
          }
        });
      }
      return L;
    }
    function I(s) {
      s != null && s.$$typeof === z ? Ve("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).") : typeof s != "function" ? Ve("forwardRef requires a render function but was given %s.", s === null ? "null" : typeof s) : s.length !== 0 && s.length !== 2 && Ve("forwardRef render functions accept exactly two parameters: props and ref. %s", s.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."), s != null && (s.defaultProps != null || s.propTypes != null) && Ve("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
      var y = {
        $$typeof: _,
        render: s
      };
      {
        var L;
        Object.defineProperty(y, "displayName", {
          enumerable: !1,
          configurable: !0,
          get: function() {
            return L;
          },
          set: function(k) {
            L = k, !s.name && !s.displayName && (s.displayName = k);
          }
        });
      }
      return y;
    }
    var ne;
    ne = Symbol.for("react.module.reference");
    function ve(s) {
      return !!(typeof s == "string" || typeof s == "function" || s === R || s === A || we || s === f || s === S || s === M || de || s === fe || Re || ye || Ce || typeof s == "object" && s !== null && (s.$$typeof === W || s.$$typeof === z || s.$$typeof === C || s.$$typeof === T || s.$$typeof === _ || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      s.$$typeof === ne || s.getModuleId !== void 0));
    }
    function He(s, y) {
      ve(s) || Ve("memo: The first argument must be a component. Instead received: %s", s === null ? "null" : typeof s);
      var L = {
        $$typeof: z,
        type: s,
        compare: y === void 0 ? null : y
      };
      {
        var k;
        Object.defineProperty(L, "displayName", {
          enumerable: !1,
          configurable: !0,
          get: function() {
            return k;
          },
          set: function(K) {
            k = K, !s.name && !s.displayName && (s.displayName = K);
          }
        });
      }
      return L;
    }
    function De() {
      var s = G.current;
      return s === null && Ve(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`), s;
    }
    function Me(s) {
      var y = De();
      if (s._context !== void 0) {
        var L = s._context;
        L.Consumer === s ? Ve("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?") : L.Provider === s && Ve("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
      }
      return y.useContext(s);
    }
    function ge(s) {
      var y = De();
      return y.useState(s);
    }
    function _t(s, y, L) {
      var k = De();
      return k.useReducer(s, y, L);
    }
    function ct(s) {
      var y = De();
      return y.useRef(s);
    }
    function ft(s, y) {
      var L = De();
      return L.useEffect(s, y);
    }
    function dn(s, y) {
      var L = De();
      return L.useInsertionEffect(s, y);
    }
    function za(s, y) {
      var L = De();
      return L.useLayoutEffect(s, y);
    }
    function ga(s, y) {
      var L = De();
      return L.useCallback(s, y);
    }
    function Ot(s, y) {
      var L = De();
      return L.useMemo(s, y);
    }
    function di(s, y, L) {
      var k = De();
      return k.useImperativeHandle(s, y, L);
    }
    function ba(s, y) {
      {
        var L = De();
        return L.useDebugValue(s, y);
      }
    }
    function Ue() {
      var s = De();
      return s.useTransition();
    }
    function pi(s) {
      var y = De();
      return y.useDeferredValue(s);
    }
    function ns() {
      var s = De();
      return s.useId();
    }
    function as(s, y, L) {
      var k = De();
      return k.useSyncExternalStore(s, y, L);
    }
    var Or = 0, ao, ro, io, lo, oo, rs, is;
    function Ji() {
    }
    Ji.__reactDisabledLog = !0;
    function uo() {
      {
        if (Or === 0) {
          ao = console.log, ro = console.info, io = console.warn, lo = console.error, oo = console.group, rs = console.groupCollapsed, is = console.groupEnd;
          var s = {
            configurable: !0,
            enumerable: !0,
            value: Ji,
            writable: !0
          };
          Object.defineProperties(console, {
            info: s,
            log: s,
            warn: s,
            error: s,
            group: s,
            groupCollapsed: s,
            groupEnd: s
          });
        }
        Or++;
      }
    }
    function Ha() {
      {
        if (Or--, Or === 0) {
          var s = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: Ht({}, s, {
              value: ao
            }),
            info: Ht({}, s, {
              value: ro
            }),
            warn: Ht({}, s, {
              value: io
            }),
            error: Ht({}, s, {
              value: lo
            }),
            group: Ht({}, s, {
              value: oo
            }),
            groupCollapsed: Ht({}, s, {
              value: rs
            }),
            groupEnd: Ht({}, s, {
              value: is
            })
          });
        }
        Or < 0 && Ve("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var mi = Ie.ReactCurrentDispatcher, Lr;
    function Zi(s, y, L) {
      {
        if (Lr === void 0)
          try {
            throw Error();
          } catch (K) {
            var k = K.stack.trim().match(/\n( *(at )?)/);
            Lr = k && k[1] || "";
          }
        return `
` + Lr + s;
      }
    }
    var vi = !1, el;
    {
      var so = typeof WeakMap == "function" ? WeakMap : Map;
      el = new so();
    }
    function ls(s, y) {
      if (!s || vi)
        return "";
      {
        var L = el.get(s);
        if (L !== void 0)
          return L;
      }
      var k;
      vi = !0;
      var K = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var Ne;
      Ne = mi.current, mi.current = null, uo();
      try {
        if (y) {
          var ce = function() {
            throw Error();
          };
          if (Object.defineProperty(ce.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(ce, []);
            } catch (Rt) {
              k = Rt;
            }
            Reflect.construct(s, [], ce);
          } else {
            try {
              ce.call();
            } catch (Rt) {
              k = Rt;
            }
            s.call(ce.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (Rt) {
            k = Rt;
          }
          s();
        }
      } catch (Rt) {
        if (Rt && k && typeof Rt.stack == "string") {
          for (var _e = Rt.stack.split(`
`), Be = k.stack.split(`
`), et = _e.length - 1, lt = Be.length - 1; et >= 1 && lt >= 0 && _e[et] !== Be[lt]; )
            lt--;
          for (; et >= 1 && lt >= 0; et--, lt--)
            if (_e[et] !== Be[lt]) {
              if (et !== 1 || lt !== 1)
                do
                  if (et--, lt--, lt < 0 || _e[et] !== Be[lt]) {
                    var ot = `
` + _e[et].replace(" at new ", " at ");
                    return s.displayName && ot.includes("<anonymous>") && (ot = ot.replace("<anonymous>", s.displayName)), typeof s == "function" && el.set(s, ot), ot;
                  }
                while (et >= 1 && lt >= 0);
              break;
            }
        }
      } finally {
        vi = !1, mi.current = Ne, Ha(), Error.prepareStackTrace = K;
      }
      var Fe = s ? s.displayName || s.name : "", mt = Fe ? Zi(Fe) : "";
      return typeof s == "function" && el.set(s, mt), mt;
    }
    function co(s, y, L) {
      return ls(s, !1);
    }
    function bf(s) {
      var y = s.prototype;
      return !!(y && y.isReactComponent);
    }
    function hi(s, y, L) {
      if (s == null)
        return "";
      if (typeof s == "function")
        return ls(s, bf(s));
      if (typeof s == "string")
        return Zi(s);
      switch (s) {
        case S:
          return Zi("Suspense");
        case M:
          return Zi("SuspenseList");
      }
      if (typeof s == "object")
        switch (s.$$typeof) {
          case _:
            return co(s.render);
          case z:
            return hi(s.type, y, L);
          case W: {
            var k = s, K = k._payload, Ne = k._init;
            try {
              return hi(Ne(K), y, L);
            } catch {
            }
          }
        }
      return "";
    }
    var os = {}, fo = Ie.ReactDebugCurrentFrame;
    function Qe(s) {
      if (s) {
        var y = s._owner, L = hi(s.type, s._source, y ? y.type : null);
        fo.setExtraStackFrame(L);
      } else
        fo.setExtraStackFrame(null);
    }
    function Nf(s, y, L, k, K) {
      {
        var Ne = Function.call.bind(cn);
        for (var ce in s)
          if (Ne(s, ce)) {
            var _e = void 0;
            try {
              if (typeof s[ce] != "function") {
                var Be = Error((k || "React class") + ": " + L + " type `" + ce + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof s[ce] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw Be.name = "Invariant Violation", Be;
              }
              _e = s[ce](y, ce, k, L, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (et) {
              _e = et;
            }
            _e && !(_e instanceof Error) && (Qe(K), Ve("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", k || "React class", L, ce, typeof _e), Qe(null)), _e instanceof Error && !(_e.message in os) && (os[_e.message] = !0, Qe(K), Ve("Failed %s type: %s", L, _e.message), Qe(null));
          }
      }
    }
    function rr(s) {
      if (s) {
        var y = s._owner, L = hi(s.type, s._source, y ? y.type : null);
        Q(L);
      } else
        Q(null);
    }
    var Le;
    Le = !1;
    function po() {
      if (te.current) {
        var s = Vn(te.current.type);
        if (s)
          return `

Check the render method of \`` + s + "`.";
      }
      return "";
    }
    function Sn(s) {
      if (s !== void 0) {
        var y = s.fileName.replace(/^.*[\\\/]/, ""), L = s.lineNumber;
        return `

Check your code at ` + y + ":" + L + ".";
      }
      return "";
    }
    function yi(s) {
      return s != null ? Sn(s.__source) : "";
    }
    var Vr = {};
    function Ef(s) {
      var y = po();
      if (!y) {
        var L = typeof s == "string" ? s : s.displayName || s.name;
        L && (y = `

Check the top-level render call using <` + L + ">.");
      }
      return y;
    }
    function Yt(s, y) {
      if (!(!s._store || s._store.validated || s.key != null)) {
        s._store.validated = !0;
        var L = Ef(y);
        if (!Vr[L]) {
          Vr[L] = !0;
          var k = "";
          s && s._owner && s._owner !== te.current && (k = " It was passed a child from " + Vn(s._owner.type) + "."), rr(s), Ve('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', L, k), rr(null);
        }
      }
    }
    function pt(s, y) {
      if (typeof s == "object") {
        if (Bt(s))
          for (var L = 0; L < s.length; L++) {
            var k = s[L];
            ht(k) && Yt(k, y);
          }
        else if (ht(s))
          s._store && (s._store.validated = !0);
        else if (s) {
          var K = B(s);
          if (typeof K == "function" && K !== s.entries)
            for (var Ne = K.call(s), ce; !(ce = Ne.next()).done; )
              ht(ce.value) && Yt(ce.value, y);
        }
      }
    }
    function us(s) {
      {
        var y = s.type;
        if (y == null || typeof y == "string")
          return;
        var L;
        if (typeof y == "function")
          L = y.propTypes;
        else if (typeof y == "object" && (y.$$typeof === _ || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        y.$$typeof === z))
          L = y.propTypes;
        else
          return;
        if (L) {
          var k = Vn(y);
          Nf(L, s.props, "prop", k, s);
        } else if (y.PropTypes !== void 0 && !Le) {
          Le = !0;
          var K = Vn(y);
          Ve("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", K || "Unknown");
        }
        typeof y.getDefaultProps == "function" && !y.getDefaultProps.isReactClassApproved && Ve("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function aa(s) {
      {
        for (var y = Object.keys(s.props), L = 0; L < y.length; L++) {
          var k = y[L];
          if (k !== "children" && k !== "key") {
            rr(s), Ve("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", k), rr(null);
            break;
          }
        }
        s.ref !== null && (rr(s), Ve("Invalid attribute `ref` supplied to `React.Fragment`."), rr(null));
      }
    }
    function Rn(s, y, L) {
      var k = ve(s);
      if (!k) {
        var K = "";
        (s === void 0 || typeof s == "object" && s !== null && Object.keys(s).length === 0) && (K += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
        var Ne = yi(y);
        Ne ? K += Ne : K += po();
        var ce;
        s === null ? ce = "null" : Bt(s) ? ce = "array" : s !== void 0 && s.$$typeof === g ? (ce = "<" + (Vn(s.type) || "Unknown") + " />", K = " Did you accidentally export a JSX literal instead of a component?") : ce = typeof s, Ve("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", ce, K);
      }
      var _e = ke.apply(this, arguments);
      if (_e == null)
        return _e;
      if (k)
        for (var Be = 2; Be < arguments.length; Be++)
          pt(arguments[Be], s);
      return s === R ? aa(_e) : us(_e), _e;
    }
    var Na = !1;
    function xf(s) {
      var y = Rn.bind(null, s);
      return y.type = s, Na || (Na = !0, qe("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.")), Object.defineProperty(y, "type", {
        enumerable: !1,
        get: function() {
          return qe("Factory.type is deprecated. Access the class directly before passing it to createFactory."), Object.defineProperty(this, "type", {
            value: s
          }), s;
        }
      }), y;
    }
    function mo(s, y, L) {
      for (var k = st.apply(this, arguments), K = 2; K < arguments.length; K++)
        pt(arguments[K], k.type);
      return us(k), k;
    }
    function ss(s, y) {
      var L = P.transition;
      P.transition = {};
      var k = P.transition;
      P.transition._updatedFibers = /* @__PURE__ */ new Set();
      try {
        s();
      } finally {
        if (P.transition = L, L === null && k._updatedFibers) {
          var K = k._updatedFibers.size;
          K > 10 && qe("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), k._updatedFibers.clear();
        }
      }
    }
    var vo = !1, tl = null;
    function Sf(s) {
      if (tl === null)
        try {
          var y = ("require" + Math.random()).slice(0, 7), L = c && c[y];
          tl = L.call(c, "timers").setImmediate;
        } catch {
          tl = function(K) {
            vo === !1 && (vo = !0, typeof MessageChannel > "u" && Ve("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));
            var Ne = new MessageChannel();
            Ne.port1.onmessage = K, Ne.port2.postMessage(void 0);
          };
        }
      return tl(s);
    }
    var Mr = 0, gi = !1;
    function ho(s) {
      {
        var y = Mr;
        Mr++, X.current === null && (X.current = []);
        var L = X.isBatchingLegacy, k;
        try {
          if (X.isBatchingLegacy = !0, k = s(), !L && X.didScheduleLegacyUpdate) {
            var K = X.current;
            K !== null && (X.didScheduleLegacyUpdate = !1, rl(K));
          }
        } catch (Fe) {
          throw ir(y), Fe;
        } finally {
          X.isBatchingLegacy = L;
        }
        if (k !== null && typeof k == "object" && typeof k.then == "function") {
          var Ne = k, ce = !1, _e = {
            then: function(Fe, mt) {
              ce = !0, Ne.then(function(Rt) {
                ir(y), Mr === 0 ? nl(Rt, Fe, mt) : Fe(Rt);
              }, function(Rt) {
                ir(y), mt(Rt);
              });
            }
          };
          return !gi && typeof Promise < "u" && Promise.resolve().then(function() {
          }).then(function() {
            ce || (gi = !0, Ve("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"));
          }), _e;
        } else {
          var Be = k;
          if (ir(y), Mr === 0) {
            var et = X.current;
            et !== null && (rl(et), X.current = null);
            var lt = {
              then: function(Fe, mt) {
                X.current === null ? (X.current = [], nl(Be, Fe, mt)) : Fe(Be);
              }
            };
            return lt;
          } else {
            var ot = {
              then: function(Fe, mt) {
                Fe(Be);
              }
            };
            return ot;
          }
        }
      }
    }
    function ir(s) {
      s !== Mr - 1 && Ve("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "), Mr = s;
    }
    function nl(s, y, L) {
      {
        var k = X.current;
        if (k !== null)
          try {
            rl(k), Sf(function() {
              k.length === 0 ? (X.current = null, y(s)) : nl(s, y, L);
            });
          } catch (K) {
            L(K);
          }
        else
          y(s);
      }
    }
    var al = !1;
    function rl(s) {
      if (!al) {
        al = !0;
        var y = 0;
        try {
          for (; y < s.length; y++) {
            var L = s[y];
            do
              L = L(!0);
            while (L !== null);
          }
          s.length = 0;
        } catch (k) {
          throw s = s.slice(y + 1), k;
        } finally {
          al = !1;
        }
      }
    }
    var cs = Rn, fs = mo, yo = xf, ds = {
      map: ar,
      forEach: si,
      count: no,
      toArray: Ki,
      only: Xi
    };
    m.Children = ds, m.Component = bn, m.Fragment = R, m.Profiler = A, m.PureComponent = Kt, m.StrictMode = f, m.Suspense = S, m.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Ie, m.act = ho, m.cloneElement = fs, m.createContext = ci, m.createElement = cs, m.createFactory = yo, m.createRef = Jt, m.forwardRef = I, m.isValidElement = ht, m.lazy = b, m.memo = He, m.startTransition = ss, m.unstable_act = ho, m.useCallback = ga, m.useContext = Me, m.useDebugValue = ba, m.useDeferredValue = pi, m.useEffect = ft, m.useId = ns, m.useImperativeHandle = di, m.useInsertionEffect = dn, m.useLayoutEffect = za, m.useMemo = Ot, m.useReducer = _t, m.useRef = ct, m.useState = ge, m.useSyncExternalStore = as, m.useTransition = Ue, m.version = h, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  })();
})(hf, hf.exports);
var U1 = hf.exports;
uE.exports = U1;
var D = uE.exports;
const F1 = /* @__PURE__ */ k1(D), z1 = /* @__PURE__ */ A1({
  __proto__: null,
  default: F1
}, [D]);
/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function() {
  var c = D, m = Symbol.for("react.element"), h = Symbol.for("react.portal"), g = Symbol.for("react.fragment"), N = Symbol.for("react.strict_mode"), R = Symbol.for("react.profiler"), f = Symbol.for("react.provider"), A = Symbol.for("react.context"), C = Symbol.for("react.forward_ref"), T = Symbol.for("react.suspense"), _ = Symbol.for("react.suspense_list"), S = Symbol.for("react.memo"), M = Symbol.for("react.lazy"), z = Symbol.for("react.offscreen"), W = Symbol.iterator, fe = "@@iterator";
  function J(b) {
    if (b === null || typeof b != "object")
      return null;
    var I = W && b[W] || b[fe];
    return typeof I == "function" ? I : null;
  }
  var ue = c.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  function B(b) {
    {
      for (var I = arguments.length, ne = new Array(I > 1 ? I - 1 : 0), ve = 1; ve < I; ve++)
        ne[ve - 1] = arguments[ve];
      G("error", b, ne);
    }
  }
  function G(b, I, ne) {
    {
      var ve = ue.ReactDebugCurrentFrame, He = ve.getStackAddendum();
      He !== "" && (I += "%s", ne = ne.concat([He]));
      var De = ne.map(function(Me) {
        return String(Me);
      });
      De.unshift("Warning: " + I), Function.prototype.apply.call(console[b], console, De);
    }
  }
  var P = !1, X = !1, te = !1, $ = !1, xe = !1, Q;
  Q = Symbol.for("react.module.reference");
  function Re(b) {
    return !!(typeof b == "string" || typeof b == "function" || b === g || b === R || xe || b === N || b === T || b === _ || $ || b === z || P || X || te || typeof b == "object" && b !== null && (b.$$typeof === M || b.$$typeof === S || b.$$typeof === f || b.$$typeof === A || b.$$typeof === C || // This needs to include all possible module reference object
    // types supported by any Flight configuration anywhere since
    // we don't know which Flight build this will end up being used
    // with.
    b.$$typeof === Q || b.getModuleId !== void 0));
  }
  function ye(b, I, ne) {
    var ve = b.displayName;
    if (ve)
      return ve;
    var He = I.displayName || I.name || "";
    return He !== "" ? ne + "(" + He + ")" : ne;
  }
  function Ce(b) {
    return b.displayName || "Context";
  }
  function de(b) {
    if (b == null)
      return null;
    if (typeof b.tag == "number" && B("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof b == "function")
      return b.displayName || b.name || null;
    if (typeof b == "string")
      return b;
    switch (b) {
      case g:
        return "Fragment";
      case h:
        return "Portal";
      case R:
        return "Profiler";
      case N:
        return "StrictMode";
      case T:
        return "Suspense";
      case _:
        return "SuspenseList";
    }
    if (typeof b == "object")
      switch (b.$$typeof) {
        case A:
          var I = b;
          return Ce(I) + ".Consumer";
        case f:
          var ne = b;
          return Ce(ne._context) + ".Provider";
        case C:
          return ye(b, b.render, "ForwardRef");
        case S:
          var ve = b.displayName || null;
          return ve !== null ? ve : de(b.type) || "Memo";
        case M: {
          var He = b, De = He._payload, Me = He._init;
          try {
            return de(Me(De));
          } catch {
            return null;
          }
        }
      }
    return null;
  }
  var we = Object.assign, Ie = 0, qe, Ve, jt, da, Bn, Zn, Ht;
  function pa() {
  }
  pa.__reactDisabledLog = !0;
  function bn() {
    {
      if (Ie === 0) {
        qe = console.log, Ve = console.info, jt = console.warn, da = console.error, Bn = console.group, Zn = console.groupCollapsed, Ht = console.groupEnd;
        var b = {
          configurable: !0,
          enumerable: !0,
          value: pa,
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
      Ie++;
    }
  }
  function er() {
    {
      if (Ie--, Ie === 0) {
        var b = {
          configurable: !0,
          enumerable: !0,
          writable: !0
        };
        Object.defineProperties(console, {
          log: we({}, b, {
            value: qe
          }),
          info: we({}, b, {
            value: Ve
          }),
          warn: we({}, b, {
            value: jt
          }),
          error: we({}, b, {
            value: da
          }),
          group: we({}, b, {
            value: Bn
          }),
          groupCollapsed: we({}, b, {
            value: Zn
          }),
          groupEnd: we({}, b, {
            value: Ht
          })
        });
      }
      Ie < 0 && B("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
    }
  }
  var ka = ue.ReactCurrentDispatcher, Qt;
  function Pn(b, I, ne) {
    {
      if (Qt === void 0)
        try {
          throw Error();
        } catch (He) {
          var ve = He.stack.trim().match(/\n( *(at )?)/);
          Qt = ve && ve[1] || "";
        }
      return `
` + Qt + b;
    }
  }
  var Kt = !1, Xt;
  {
    var Jt = typeof WeakMap == "function" ? WeakMap : Map;
    Xt = new Jt();
  }
  function Ln(b, I) {
    if (!b || Kt)
      return "";
    {
      var ne = Xt.get(b);
      if (ne !== void 0)
        return ne;
    }
    var ve;
    Kt = !0;
    var He = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    var De;
    De = ka.current, ka.current = null, bn();
    try {
      if (I) {
        var Me = function() {
          throw Error();
        };
        if (Object.defineProperty(Me.prototype, "props", {
          set: function() {
            throw Error();
          }
        }), typeof Reflect == "object" && Reflect.construct) {
          try {
            Reflect.construct(Me, []);
          } catch (Ot) {
            ve = Ot;
          }
          Reflect.construct(b, [], Me);
        } else {
          try {
            Me.call();
          } catch (Ot) {
            ve = Ot;
          }
          b.call(Me.prototype);
        }
      } else {
        try {
          throw Error();
        } catch (Ot) {
          ve = Ot;
        }
        b();
      }
    } catch (Ot) {
      if (Ot && ve && typeof Ot.stack == "string") {
        for (var ge = Ot.stack.split(`
`), _t = ve.stack.split(`
`), ct = ge.length - 1, ft = _t.length - 1; ct >= 1 && ft >= 0 && ge[ct] !== _t[ft]; )
          ft--;
        for (; ct >= 1 && ft >= 0; ct--, ft--)
          if (ge[ct] !== _t[ft]) {
            if (ct !== 1 || ft !== 1)
              do
                if (ct--, ft--, ft < 0 || ge[ct] !== _t[ft]) {
                  var dn = `
` + ge[ct].replace(" at new ", " at ");
                  return b.displayName && dn.includes("<anonymous>") && (dn = dn.replace("<anonymous>", b.displayName)), typeof b == "function" && Xt.set(b, dn), dn;
                }
              while (ct >= 1 && ft >= 0);
            break;
          }
      }
    } finally {
      Kt = !1, ka.current = De, er(), Error.prepareStackTrace = He;
    }
    var za = b ? b.displayName || b.name : "", ga = za ? Pn(za) : "";
    return typeof b == "function" && Xt.set(b, ga), ga;
  }
  function Bt(b, I, ne) {
    return Ln(b, !1);
  }
  function Nn(b) {
    var I = b.prototype;
    return !!(I && I.isReactComponent);
  }
  function Pt(b, I, ne) {
    if (b == null)
      return "";
    if (typeof b == "function")
      return Ln(b, Nn(b));
    if (typeof b == "string")
      return Pn(b);
    switch (b) {
      case T:
        return Pn("Suspense");
      case _:
        return Pn("SuspenseList");
    }
    if (typeof b == "object")
      switch (b.$$typeof) {
        case C:
          return Bt(b.render);
        case S:
          return Pt(b.type, I, ne);
        case M: {
          var ve = b, He = ve._payload, De = ve._init;
          try {
            return Pt(De(He), I, ne);
          } catch {
          }
        }
      }
    return "";
  }
  var $t = Object.prototype.hasOwnProperty, ea = {}, tr = ue.ReactDebugCurrentFrame;
  function ma(b) {
    if (b) {
      var I = b._owner, ne = Pt(b.type, b._source, I ? I.type : null);
      tr.setExtraStackFrame(ne);
    } else
      tr.setExtraStackFrame(null);
  }
  function Vn(b, I, ne, ve, He) {
    {
      var De = Function.call.bind($t);
      for (var Me in b)
        if (De(b, Me)) {
          var ge = void 0;
          try {
            if (typeof b[Me] != "function") {
              var _t = Error((ve || "React class") + ": " + ne + " type `" + Me + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof b[Me] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
              throw _t.name = "Invariant Violation", _t;
            }
            ge = b[Me](I, Me, ve, ne, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
          } catch (ct) {
            ge = ct;
          }
          ge && !(ge instanceof Error) && (ma(He), B("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", ve || "React class", ne, Me, typeof ge), ma(null)), ge instanceof Error && !(ge.message in ea) && (ea[ge.message] = !0, ma(He), B("Failed %s type: %s", ne, ge.message), ma(null));
        }
    }
  }
  var cn = Array.isArray;
  function Zt(b) {
    return cn(b);
  }
  function En(b) {
    {
      var I = typeof Symbol == "function" && Symbol.toStringTag, ne = I && b[Symbol.toStringTag] || b.constructor.name || "Object";
      return ne;
    }
  }
  function Ua(b) {
    try {
      return wt(b), !1;
    } catch {
      return !0;
    }
  }
  function wt(b) {
    return "" + b;
  }
  function xn(b) {
    if (Ua(b))
      return B("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", En(b)), wt(b);
  }
  var Mn = ue.ReactCurrentOwner, _r = {
    key: !0,
    ref: !0,
    __self: !0,
    __source: !0
  }, nr, ee, me;
  me = {};
  function ke(b) {
    if ($t.call(b, "ref")) {
      var I = Object.getOwnPropertyDescriptor(b, "ref").get;
      if (I && I.isReactWarning)
        return !1;
    }
    return b.ref !== void 0;
  }
  function Ze(b) {
    if ($t.call(b, "key")) {
      var I = Object.getOwnPropertyDescriptor(b, "key").get;
      if (I && I.isReactWarning)
        return !1;
    }
    return b.key !== void 0;
  }
  function st(b, I) {
    if (typeof b.ref == "string" && Mn.current && I && Mn.current.stateNode !== I) {
      var ne = de(Mn.current.type);
      me[ne] || (B('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', de(Mn.current.type), b.ref), me[ne] = !0);
    }
  }
  function ht(b, I) {
    {
      var ne = function() {
        nr || (nr = !0, B("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", I));
      };
      ne.isReactWarning = !0, Object.defineProperty(b, "key", {
        get: ne,
        configurable: !0
      });
    }
  }
  function yt(b, I) {
    {
      var ne = function() {
        ee || (ee = !0, B("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", I));
      };
      ne.isReactWarning = !0, Object.defineProperty(b, "ref", {
        get: ne,
        configurable: !0
      });
    }
  }
  var fn = function(b, I, ne, ve, He, De, Me) {
    var ge = {
      // This tag allows us to uniquely identify this as a React Element
      $$typeof: m,
      // Built-in properties that belong on the element
      type: b,
      key: I,
      ref: ne,
      props: Me,
      // Record the component responsible for creating this element.
      _owner: De
    };
    return ge._store = {}, Object.defineProperty(ge._store, "validated", {
      configurable: !1,
      enumerable: !1,
      writable: !0,
      value: !1
    }), Object.defineProperty(ge, "_self", {
      configurable: !1,
      enumerable: !1,
      writable: !1,
      value: ve
    }), Object.defineProperty(ge, "_source", {
      configurable: !1,
      enumerable: !1,
      writable: !1,
      value: He
    }), Object.freeze && (Object.freeze(ge.props), Object.freeze(ge)), ge;
  };
  function bt(b, I, ne, ve, He) {
    {
      var De, Me = {}, ge = null, _t = null;
      ne !== void 0 && (xn(ne), ge = "" + ne), Ze(I) && (xn(I.key), ge = "" + I.key), ke(I) && (_t = I.ref, st(I, He));
      for (De in I)
        $t.call(I, De) && !_r.hasOwnProperty(De) && (Me[De] = I[De]);
      if (b && b.defaultProps) {
        var ct = b.defaultProps;
        for (De in ct)
          Me[De] === void 0 && (Me[De] = ct[De]);
      }
      if (ge || _t) {
        var ft = typeof b == "function" ? b.displayName || b.name || "Unknown" : b;
        ge && ht(Me, ft), _t && yt(Me, ft);
      }
      return fn(b, ge, _t, He, ve, Mn.current, Me);
    }
  }
  var rt = ue.ReactCurrentOwner, Nt = ue.ReactDebugCurrentFrame;
  function va(b) {
    if (b) {
      var I = b._owner, ne = Pt(b.type, b._source, I ? I.type : null);
      Nt.setExtraStackFrame(ne);
    } else
      Nt.setExtraStackFrame(null);
  }
  var ha;
  ha = !1;
  function ta(b) {
    return typeof b == "object" && b !== null && b.$$typeof === m;
  }
  function ar() {
    {
      if (rt.current) {
        var b = de(rt.current.type);
        if (b)
          return `

Check the render method of \`` + b + "`.";
      }
      return "";
    }
  }
  function no(b) {
    {
      if (b !== void 0) {
        var I = b.fileName.replace(/^.*[\\\/]/, ""), ne = b.lineNumber;
        return `

Check your code at ` + I + ":" + ne + ".";
      }
      return "";
    }
  }
  var si = {};
  function Ki(b) {
    {
      var I = ar();
      if (!I) {
        var ne = typeof b == "string" ? b : b.displayName || b.name;
        ne && (I = `

Check the top-level render call using <` + ne + ">.");
      }
      return I;
    }
  }
  function Xi(b, I) {
    {
      if (!b._store || b._store.validated || b.key != null)
        return;
      b._store.validated = !0;
      var ne = Ki(I);
      if (si[ne])
        return;
      si[ne] = !0;
      var ve = "";
      b && b._owner && b._owner !== rt.current && (ve = " It was passed a child from " + de(b._owner.type) + "."), va(b), B('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', ne, ve), va(null);
    }
  }
  function ci(b, I) {
    {
      if (typeof b != "object")
        return;
      if (Zt(b))
        for (var ne = 0; ne < b.length; ne++) {
          var ve = b[ne];
          ta(ve) && Xi(ve, I);
        }
      else if (ta(b))
        b._store && (b._store.validated = !0);
      else if (b) {
        var He = J(b);
        if (typeof He == "function" && He !== b.entries)
          for (var De = He.call(b), Me; !(Me = De.next()).done; )
            ta(Me.value) && Xi(Me.value, I);
      }
    }
  }
  function ya(b) {
    {
      var I = b.type;
      if (I == null || typeof I == "string")
        return;
      var ne;
      if (typeof I == "function")
        ne = I.propTypes;
      else if (typeof I == "object" && (I.$$typeof === C || // Note: Memo only checks outer props here.
      // Inner props are checked in the reconciler.
      I.$$typeof === S))
        ne = I.propTypes;
      else
        return;
      if (ne) {
        var ve = de(I);
        Vn(ne, b.props, "prop", ve, b);
      } else if (I.PropTypes !== void 0 && !ha) {
        ha = !0;
        var He = de(I);
        B("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", He || "Unknown");
      }
      typeof I.getDefaultProps == "function" && !I.getDefaultProps.isReactClassApproved && B("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
    }
  }
  function na(b) {
    {
      for (var I = Object.keys(b.props), ne = 0; ne < I.length; ne++) {
        var ve = I[ne];
        if (ve !== "children" && ve !== "key") {
          va(b), B("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", ve), va(null);
          break;
        }
      }
      b.ref !== null && (va(b), B("Invalid attribute `ref` supplied to `React.Fragment`."), va(null));
    }
  }
  var $n = {};
  function Fa(b, I, ne, ve, He, De) {
    {
      var Me = Re(b);
      if (!Me) {
        var ge = "";
        (b === void 0 || typeof b == "object" && b !== null && Object.keys(b).length === 0) && (ge += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
        var _t = no(He);
        _t ? ge += _t : ge += ar();
        var ct;
        b === null ? ct = "null" : Zt(b) ? ct = "array" : b !== void 0 && b.$$typeof === m ? (ct = "<" + (de(b.type) || "Unknown") + " />", ge = " Did you accidentally export a JSX literal instead of a component?") : ct = typeof b, B("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", ct, ge);
      }
      var ft = bt(b, I, ne, He, De);
      if (ft == null)
        return ft;
      if (Me) {
        var dn = I.children;
        if (dn !== void 0)
          if (ve)
            if (Zt(dn)) {
              for (var za = 0; za < dn.length; za++)
                ci(dn[za], b);
              Object.freeze && Object.freeze(dn);
            } else
              B("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
          else
            ci(dn, b);
      }
      if ($t.call(I, "key")) {
        var ga = de(b), Ot = Object.keys(I).filter(function(Ue) {
          return Ue !== "key";
        }), di = Ot.length > 0 ? "{key: someKey, " + Ot.join(": ..., ") + ": ...}" : "{key: someKey}";
        if (!$n[ga + di]) {
          var ba = Ot.length > 0 ? "{" + Ot.join(": ..., ") + ": ...}" : "{}";
          B(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, di, ga, ba, ga), $n[ga + di] = !0;
        }
      }
      return b === g ? na(ft) : ya(ft), ft;
    }
  }
  var fi = Fa;
  wv.Fragment = g, wv.jsxDEV = fi;
})();
oE.exports = wv;
var d = oE.exports, sE = { exports: {} }, Jn = {}, cE = { exports: {} }, fE = {};
(function(c) {
  /**
   * @license React
   * scheduler.development.js
   *
   * Copyright (c) Facebook, Inc. and its affiliates.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  (function() {
    typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
    var m = !1, h = 5;
    function g(ee, me) {
      var ke = ee.length;
      ee.push(me), f(ee, me, ke);
    }
    function N(ee) {
      return ee.length === 0 ? null : ee[0];
    }
    function R(ee) {
      if (ee.length === 0)
        return null;
      var me = ee[0], ke = ee.pop();
      return ke !== me && (ee[0] = ke, A(ee, ke, 0)), me;
    }
    function f(ee, me, ke) {
      for (var Ze = ke; Ze > 0; ) {
        var st = Ze - 1 >>> 1, ht = ee[st];
        if (C(ht, me) > 0)
          ee[st] = me, ee[Ze] = ht, Ze = st;
        else
          return;
      }
    }
    function A(ee, me, ke) {
      for (var Ze = ke, st = ee.length, ht = st >>> 1; Ze < ht; ) {
        var yt = (Ze + 1) * 2 - 1, fn = ee[yt], bt = yt + 1, rt = ee[bt];
        if (C(fn, me) < 0)
          bt < st && C(rt, fn) < 0 ? (ee[Ze] = rt, ee[bt] = me, Ze = bt) : (ee[Ze] = fn, ee[yt] = me, Ze = yt);
        else if (bt < st && C(rt, me) < 0)
          ee[Ze] = rt, ee[bt] = me, Ze = bt;
        else
          return;
      }
    }
    function C(ee, me) {
      var ke = ee.sortIndex - me.sortIndex;
      return ke !== 0 ? ke : ee.id - me.id;
    }
    var T = 1, _ = 2, S = 3, M = 4, z = 5;
    function W(ee, me) {
    }
    var fe = typeof performance == "object" && typeof performance.now == "function";
    if (fe) {
      var J = performance;
      c.unstable_now = function() {
        return J.now();
      };
    } else {
      var ue = Date, B = ue.now();
      c.unstable_now = function() {
        return ue.now() - B;
      };
    }
    var G = 1073741823, P = -1, X = 250, te = 5e3, $ = 1e4, xe = G, Q = [], Re = [], ye = 1, Ce = null, de = S, we = !1, Ie = !1, qe = !1, Ve = typeof setTimeout == "function" ? setTimeout : null, jt = typeof clearTimeout == "function" ? clearTimeout : null, da = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function Bn(ee) {
      for (var me = N(Re); me !== null; ) {
        if (me.callback === null)
          R(Re);
        else if (me.startTime <= ee)
          R(Re), me.sortIndex = me.expirationTime, g(Q, me);
        else
          return;
        me = N(Re);
      }
    }
    function Zn(ee) {
      if (qe = !1, Bn(ee), !Ie)
        if (N(Q) !== null)
          Ie = !0, wt(Ht);
        else {
          var me = N(Re);
          me !== null && xn(Zn, me.startTime - ee);
        }
    }
    function Ht(ee, me) {
      Ie = !1, qe && (qe = !1, Mn()), we = !0;
      var ke = de;
      try {
        var Ze;
        if (!m) return pa(ee, me);
      } finally {
        Ce = null, de = ke, we = !1;
      }
    }
    function pa(ee, me) {
      var ke = me;
      for (Bn(ke), Ce = N(Q); Ce !== null && !(Ce.expirationTime > ke && (!ee || tr())); ) {
        var Ze = Ce.callback;
        if (typeof Ze == "function") {
          Ce.callback = null, de = Ce.priorityLevel;
          var st = Ce.expirationTime <= ke, ht = Ze(st);
          ke = c.unstable_now(), typeof ht == "function" ? Ce.callback = ht : Ce === N(Q) && R(Q), Bn(ke);
        } else
          R(Q);
        Ce = N(Q);
      }
      if (Ce !== null)
        return !0;
      var yt = N(Re);
      return yt !== null && xn(Zn, yt.startTime - ke), !1;
    }
    function bn(ee, me) {
      switch (ee) {
        case T:
        case _:
        case S:
        case M:
        case z:
          break;
        default:
          ee = S;
      }
      var ke = de;
      de = ee;
      try {
        return me();
      } finally {
        de = ke;
      }
    }
    function er(ee) {
      var me;
      switch (de) {
        case T:
        case _:
        case S:
          me = S;
          break;
        default:
          me = de;
          break;
      }
      var ke = de;
      de = me;
      try {
        return ee();
      } finally {
        de = ke;
      }
    }
    function ka(ee) {
      var me = de;
      return function() {
        var ke = de;
        de = me;
        try {
          return ee.apply(this, arguments);
        } finally {
          de = ke;
        }
      };
    }
    function Qt(ee, me, ke) {
      var Ze = c.unstable_now(), st;
      if (typeof ke == "object" && ke !== null) {
        var ht = ke.delay;
        typeof ht == "number" && ht > 0 ? st = Ze + ht : st = Ze;
      } else
        st = Ze;
      var yt;
      switch (ee) {
        case T:
          yt = P;
          break;
        case _:
          yt = X;
          break;
        case z:
          yt = xe;
          break;
        case M:
          yt = $;
          break;
        case S:
        default:
          yt = te;
          break;
      }
      var fn = st + yt, bt = {
        id: ye++,
        callback: me,
        priorityLevel: ee,
        startTime: st,
        expirationTime: fn,
        sortIndex: -1
      };
      return st > Ze ? (bt.sortIndex = st, g(Re, bt), N(Q) === null && bt === N(Re) && (qe ? Mn() : qe = !0, xn(Zn, st - Ze))) : (bt.sortIndex = fn, g(Q, bt), !Ie && !we && (Ie = !0, wt(Ht))), bt;
    }
    function Pn() {
    }
    function Kt() {
      !Ie && !we && (Ie = !0, wt(Ht));
    }
    function Xt() {
      return N(Q);
    }
    function Jt(ee) {
      ee.callback = null;
    }
    function Ln() {
      return de;
    }
    var Bt = !1, Nn = null, Pt = -1, $t = h, ea = -1;
    function tr() {
      var ee = c.unstable_now() - ea;
      return !(ee < $t);
    }
    function ma() {
    }
    function Vn(ee) {
      if (ee < 0 || ee > 125) {
        console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported");
        return;
      }
      ee > 0 ? $t = Math.floor(1e3 / ee) : $t = h;
    }
    var cn = function() {
      if (Nn !== null) {
        var ee = c.unstable_now();
        ea = ee;
        var me = !0, ke = !0;
        try {
          ke = Nn(me, ee);
        } finally {
          ke ? Zt() : (Bt = !1, Nn = null);
        }
      } else
        Bt = !1;
    }, Zt;
    if (typeof da == "function")
      Zt = function() {
        da(cn);
      };
    else if (typeof MessageChannel < "u") {
      var En = new MessageChannel(), Ua = En.port2;
      En.port1.onmessage = cn, Zt = function() {
        Ua.postMessage(null);
      };
    } else
      Zt = function() {
        Ve(cn, 0);
      };
    function wt(ee) {
      Nn = ee, Bt || (Bt = !0, Zt());
    }
    function xn(ee, me) {
      Pt = Ve(function() {
        ee(c.unstable_now());
      }, me);
    }
    function Mn() {
      jt(Pt), Pt = -1;
    }
    var _r = ma, nr = null;
    c.unstable_IdlePriority = z, c.unstable_ImmediatePriority = T, c.unstable_LowPriority = M, c.unstable_NormalPriority = S, c.unstable_Profiling = nr, c.unstable_UserBlockingPriority = _, c.unstable_cancelCallback = Jt, c.unstable_continueExecution = Kt, c.unstable_forceFrameRate = Vn, c.unstable_getCurrentPriorityLevel = Ln, c.unstable_getFirstCallbackNode = Xt, c.unstable_next = er, c.unstable_pauseExecution = Pn, c.unstable_requestPaint = _r, c.unstable_runWithPriority = bn, c.unstable_scheduleCallback = Qt, c.unstable_shouldYield = tr, c.unstable_wrapCallback = ka, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  })();
})(fE);
cE.exports = fE;
var H1 = cE.exports;
/**
 * @license React
 * react-dom.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
(function() {
  typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStart(new Error());
  var c = D, m = H1, h = c.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, g = !1;
  function N(e) {
    g = e;
  }
  function R(e) {
    if (!g) {
      for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), a = 1; a < t; a++)
        n[a - 1] = arguments[a];
      A("warn", e, n);
    }
  }
  function f(e) {
    if (!g) {
      for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), a = 1; a < t; a++)
        n[a - 1] = arguments[a];
      A("error", e, n);
    }
  }
  function A(e, t, n) {
    {
      var a = h.ReactDebugCurrentFrame, r = a.getStackAddendum();
      r !== "" && (t += "%s", n = n.concat([r]));
      var i = n.map(function(l) {
        return String(l);
      });
      i.unshift("Warning: " + t), Function.prototype.apply.call(console[e], console, i);
    }
  }
  var C = 0, T = 1, _ = 2, S = 3, M = 4, z = 5, W = 6, fe = 7, J = 8, ue = 9, B = 10, G = 11, P = 12, X = 13, te = 14, $ = 15, xe = 16, Q = 17, Re = 18, ye = 19, Ce = 21, de = 22, we = 23, Ie = 24, qe = 25, Ve = !0, jt = !1, da = !1, Bn = !1, Zn = !1, Ht = !0, pa = !0, bn = !0, er = !0, ka = /* @__PURE__ */ new Set(), Qt = {}, Pn = {};
  function Kt(e, t) {
    Xt(e, t), Xt(e + "Capture", t);
  }
  function Xt(e, t) {
    Qt[e] && f("EventRegistry: More than one plugin attempted to publish the same registration name, `%s`.", e), Qt[e] = t;
    {
      var n = e.toLowerCase();
      Pn[n] = e, e === "onDoubleClick" && (Pn.ondblclick = e);
    }
    for (var a = 0; a < t.length; a++)
      ka.add(t[a]);
  }
  var Jt = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", Ln = Object.prototype.hasOwnProperty;
  function Bt(e) {
    {
      var t = typeof Symbol == "function" && Symbol.toStringTag, n = t && e[Symbol.toStringTag] || e.constructor.name || "Object";
      return n;
    }
  }
  function Nn(e) {
    try {
      return Pt(e), !1;
    } catch {
      return !0;
    }
  }
  function Pt(e) {
    return "" + e;
  }
  function $t(e, t) {
    if (Nn(e))
      return f("The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before before using it here.", t, Bt(e)), Pt(e);
  }
  function ea(e) {
    if (Nn(e))
      return f("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", Bt(e)), Pt(e);
  }
  function tr(e, t) {
    if (Nn(e))
      return f("The provided `%s` prop is an unsupported type %s. This value must be coerced to a string before before using it here.", t, Bt(e)), Pt(e);
  }
  function ma(e, t) {
    if (Nn(e))
      return f("The provided `%s` CSS property is an unsupported type %s. This value must be coerced to a string before before using it here.", t, Bt(e)), Pt(e);
  }
  function Vn(e) {
    if (Nn(e))
      return f("The provided HTML markup uses a value of unsupported type %s. This value must be coerced to a string before before using it here.", Bt(e)), Pt(e);
  }
  function cn(e) {
    if (Nn(e))
      return f("Form field values (value, checked, defaultValue, or defaultChecked props) must be strings, not %s. This value must be coerced to a string before before using it here.", Bt(e)), Pt(e);
  }
  var Zt = 0, En = 1, Ua = 2, wt = 3, xn = 4, Mn = 5, _r = 6, nr = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD", ee = nr + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040", me = new RegExp("^[" + nr + "][" + ee + "]*$"), ke = {}, Ze = {};
  function st(e) {
    return Ln.call(Ze, e) ? !0 : Ln.call(ke, e) ? !1 : me.test(e) ? (Ze[e] = !0, !0) : (ke[e] = !0, f("Invalid attribute name: `%s`", e), !1);
  }
  function ht(e, t, n) {
    return t !== null ? t.type === Zt : n ? !1 : e.length > 2 && (e[0] === "o" || e[0] === "O") && (e[1] === "n" || e[1] === "N");
  }
  function yt(e, t, n, a) {
    if (n !== null && n.type === Zt)
      return !1;
    switch (typeof t) {
      case "function":
      case "symbol":
        return !0;
      case "boolean": {
        if (a)
          return !1;
        if (n !== null)
          return !n.acceptsBooleans;
        var r = e.toLowerCase().slice(0, 5);
        return r !== "data-" && r !== "aria-";
      }
      default:
        return !1;
    }
  }
  function fn(e, t, n, a) {
    if (t === null || typeof t > "u" || yt(e, t, n, a))
      return !0;
    if (a)
      return !1;
    if (n !== null)
      switch (n.type) {
        case wt:
          return !t;
        case xn:
          return t === !1;
        case Mn:
          return isNaN(t);
        case _r:
          return isNaN(t) || t < 1;
      }
    return !1;
  }
  function bt(e) {
    return Nt.hasOwnProperty(e) ? Nt[e] : null;
  }
  function rt(e, t, n, a, r, i, l) {
    this.acceptsBooleans = t === Ua || t === wt || t === xn, this.attributeName = a, this.attributeNamespace = r, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = i, this.removeEmptyString = l;
  }
  var Nt = {}, va = [
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
  va.forEach(function(e) {
    Nt[e] = new rt(
      e,
      Zt,
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
    var t = e[0], n = e[1];
    Nt[t] = new rt(
      t,
      En,
      !1,
      // mustUseProperty
      n,
      // attributeName
      null,
      // attributeNamespace
      !1,
      // sanitizeURL
      !1
    );
  }), ["contentEditable", "draggable", "spellCheck", "value"].forEach(function(e) {
    Nt[e] = new rt(
      e,
      Ua,
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
    Nt[e] = new rt(
      e,
      Ua,
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
    Nt[e] = new rt(
      e,
      wt,
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
    Nt[e] = new rt(
      e,
      wt,
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
    Nt[e] = new rt(
      e,
      xn,
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
    Nt[e] = new rt(
      e,
      _r,
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
    Nt[e] = new rt(
      e,
      Mn,
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
  var ha = /[\-\:]([a-z])/g, ta = function(e) {
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
    var t = e.replace(ha, ta);
    Nt[t] = new rt(
      t,
      En,
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
    var t = e.replace(ha, ta);
    Nt[t] = new rt(
      t,
      En,
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
    var t = e.replace(ha, ta);
    Nt[t] = new rt(
      t,
      En,
      !1,
      // mustUseProperty
      e,
      "http://www.w3.org/XML/1998/namespace",
      !1,
      // sanitizeURL
      !1
    );
  }), ["tabIndex", "crossOrigin"].forEach(function(e) {
    Nt[e] = new rt(
      e,
      En,
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
  var ar = "xlinkHref";
  Nt[ar] = new rt(
    "xlinkHref",
    En,
    !1,
    // mustUseProperty
    "xlink:href",
    "http://www.w3.org/1999/xlink",
    !0,
    // sanitizeURL
    !1
  ), ["src", "href", "action", "formAction"].forEach(function(e) {
    Nt[e] = new rt(
      e,
      En,
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
  var no = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*\:/i, si = !1;
  function Ki(e) {
    !si && no.test(e) && (si = !0, f("A future version of React will block javascript: URLs as a security precaution. Use event handlers instead if you can. If you need to generate unsafe HTML try using dangerouslySetInnerHTML instead. React was passed %s.", JSON.stringify(e)));
  }
  function Xi(e, t, n, a) {
    if (a.mustUseProperty) {
      var r = a.propertyName;
      return e[r];
    } else {
      $t(n, t), a.sanitizeURL && Ki("" + n);
      var i = a.attributeName, l = null;
      if (a.type === xn) {
        if (e.hasAttribute(i)) {
          var o = e.getAttribute(i);
          return o === "" ? !0 : fn(t, n, a, !1) ? o : o === "" + n ? n : o;
        }
      } else if (e.hasAttribute(i)) {
        if (fn(t, n, a, !1))
          return e.getAttribute(i);
        if (a.type === wt)
          return n;
        l = e.getAttribute(i);
      }
      return fn(t, n, a, !1) ? l === null ? n : l : l === "" + n ? n : l;
    }
  }
  function ci(e, t, n, a) {
    {
      if (!st(t))
        return;
      if (!e.hasAttribute(t))
        return n === void 0 ? void 0 : null;
      var r = e.getAttribute(t);
      return $t(n, t), r === "" + n ? n : r;
    }
  }
  function ya(e, t, n, a) {
    var r = bt(t);
    if (!ht(t, r, a)) {
      if (fn(t, n, r, a) && (n = null), a || r === null) {
        if (st(t)) {
          var i = t;
          n === null ? e.removeAttribute(i) : ($t(n, t), e.setAttribute(i, "" + n));
        }
        return;
      }
      var l = r.mustUseProperty;
      if (l) {
        var o = r.propertyName;
        if (n === null) {
          var u = r.type;
          e[o] = u === wt ? !1 : "";
        } else
          e[o] = n;
        return;
      }
      var p = r.attributeName, v = r.attributeNamespace;
      if (n === null)
        e.removeAttribute(p);
      else {
        var x = r.type, E;
        x === wt || x === xn && n === !0 ? E = "" : ($t(n, p), E = "" + n, r.sanitizeURL && Ki(E.toString())), v ? e.setAttributeNS(v, p, E) : e.setAttribute(p, E);
      }
    }
  }
  var na = Symbol.for("react.element"), $n = Symbol.for("react.portal"), Fa = Symbol.for("react.fragment"), fi = Symbol.for("react.strict_mode"), b = Symbol.for("react.profiler"), I = Symbol.for("react.provider"), ne = Symbol.for("react.context"), ve = Symbol.for("react.forward_ref"), He = Symbol.for("react.suspense"), De = Symbol.for("react.suspense_list"), Me = Symbol.for("react.memo"), ge = Symbol.for("react.lazy"), _t = Symbol.for("react.scope"), ct = Symbol.for("react.debug_trace_mode"), ft = Symbol.for("react.offscreen"), dn = Symbol.for("react.legacy_hidden"), za = Symbol.for("react.cache"), ga = Symbol.for("react.tracing_marker"), Ot = Symbol.iterator, di = "@@iterator";
  function ba(e) {
    if (e === null || typeof e != "object")
      return null;
    var t = Ot && e[Ot] || e[di];
    return typeof t == "function" ? t : null;
  }
  var Ue = Object.assign, pi = 0, ns, as, Or, ao, ro, io, lo;
  function oo() {
  }
  oo.__reactDisabledLog = !0;
  function rs() {
    {
      if (pi === 0) {
        ns = console.log, as = console.info, Or = console.warn, ao = console.error, ro = console.group, io = console.groupCollapsed, lo = console.groupEnd;
        var e = {
          configurable: !0,
          enumerable: !0,
          value: oo,
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
      pi++;
    }
  }
  function is() {
    {
      if (pi--, pi === 0) {
        var e = {
          configurable: !0,
          enumerable: !0,
          writable: !0
        };
        Object.defineProperties(console, {
          log: Ue({}, e, {
            value: ns
          }),
          info: Ue({}, e, {
            value: as
          }),
          warn: Ue({}, e, {
            value: Or
          }),
          error: Ue({}, e, {
            value: ao
          }),
          group: Ue({}, e, {
            value: ro
          }),
          groupCollapsed: Ue({}, e, {
            value: io
          }),
          groupEnd: Ue({}, e, {
            value: lo
          })
        });
      }
      pi < 0 && f("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
    }
  }
  var Ji = h.ReactCurrentDispatcher, uo;
  function Ha(e, t, n) {
    {
      if (uo === void 0)
        try {
          throw Error();
        } catch (r) {
          var a = r.stack.trim().match(/\n( *(at )?)/);
          uo = a && a[1] || "";
        }
      return `
` + uo + e;
    }
  }
  var mi = !1, Lr;
  {
    var Zi = typeof WeakMap == "function" ? WeakMap : Map;
    Lr = new Zi();
  }
  function vi(e, t) {
    if (!e || mi)
      return "";
    {
      var n = Lr.get(e);
      if (n !== void 0)
        return n;
    }
    var a;
    mi = !0;
    var r = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    var i;
    i = Ji.current, Ji.current = null, rs();
    try {
      if (t) {
        var l = function() {
          throw Error();
        };
        if (Object.defineProperty(l.prototype, "props", {
          set: function() {
            throw Error();
          }
        }), typeof Reflect == "object" && Reflect.construct) {
          try {
            Reflect.construct(l, []);
          } catch (V) {
            a = V;
          }
          Reflect.construct(e, [], l);
        } else {
          try {
            l.call();
          } catch (V) {
            a = V;
          }
          e.call(l.prototype);
        }
      } else {
        try {
          throw Error();
        } catch (V) {
          a = V;
        }
        e();
      }
    } catch (V) {
      if (V && a && typeof V.stack == "string") {
        for (var o = V.stack.split(`
`), u = a.stack.split(`
`), p = o.length - 1, v = u.length - 1; p >= 1 && v >= 0 && o[p] !== u[v]; )
          v--;
        for (; p >= 1 && v >= 0; p--, v--)
          if (o[p] !== u[v]) {
            if (p !== 1 || v !== 1)
              do
                if (p--, v--, v < 0 || o[p] !== u[v]) {
                  var x = `
` + o[p].replace(" at new ", " at ");
                  return e.displayName && x.includes("<anonymous>") && (x = x.replace("<anonymous>", e.displayName)), typeof e == "function" && Lr.set(e, x), x;
                }
              while (p >= 1 && v >= 0);
            break;
          }
      }
    } finally {
      mi = !1, Ji.current = i, is(), Error.prepareStackTrace = r;
    }
    var E = e ? e.displayName || e.name : "", O = E ? Ha(E) : "";
    return typeof e == "function" && Lr.set(e, O), O;
  }
  function el(e, t, n) {
    return vi(e, !0);
  }
  function so(e, t, n) {
    return vi(e, !1);
  }
  function ls(e) {
    var t = e.prototype;
    return !!(t && t.isReactComponent);
  }
  function co(e, t, n) {
    if (e == null)
      return "";
    if (typeof e == "function")
      return vi(e, ls(e));
    if (typeof e == "string")
      return Ha(e);
    switch (e) {
      case He:
        return Ha("Suspense");
      case De:
        return Ha("SuspenseList");
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case ve:
          return so(e.render);
        case Me:
          return co(e.type, t, n);
        case ge: {
          var a = e, r = a._payload, i = a._init;
          try {
            return co(i(r), t, n);
          } catch {
          }
        }
      }
    return "";
  }
  function bf(e) {
    switch (e._debugOwner && e._debugOwner.type, e._debugSource, e.tag) {
      case z:
        return Ha(e.type);
      case xe:
        return Ha("Lazy");
      case X:
        return Ha("Suspense");
      case ye:
        return Ha("SuspenseList");
      case C:
      case _:
      case $:
        return so(e.type);
      case G:
        return so(e.type.render);
      case T:
        return el(e.type);
      default:
        return "";
    }
  }
  function hi(e) {
    try {
      var t = "", n = e;
      do
        t += bf(n), n = n.return;
      while (n);
      return t;
    } catch (a) {
      return `
Error generating stack: ` + a.message + `
` + a.stack;
    }
  }
  function os(e, t, n) {
    var a = e.displayName;
    if (a)
      return a;
    var r = t.displayName || t.name || "";
    return r !== "" ? n + "(" + r + ")" : n;
  }
  function fo(e) {
    return e.displayName || "Context";
  }
  function Qe(e) {
    if (e == null)
      return null;
    if (typeof e.tag == "number" && f("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
      return e.displayName || e.name || null;
    if (typeof e == "string")
      return e;
    switch (e) {
      case Fa:
        return "Fragment";
      case $n:
        return "Portal";
      case b:
        return "Profiler";
      case fi:
        return "StrictMode";
      case He:
        return "Suspense";
      case De:
        return "SuspenseList";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case ne:
          var t = e;
          return fo(t) + ".Consumer";
        case I:
          var n = e;
          return fo(n._context) + ".Provider";
        case ve:
          return os(e, e.render, "ForwardRef");
        case Me:
          var a = e.displayName || null;
          return a !== null ? a : Qe(e.type) || "Memo";
        case ge: {
          var r = e, i = r._payload, l = r._init;
          try {
            return Qe(l(i));
          } catch {
            return null;
          }
        }
      }
    return null;
  }
  function Nf(e, t, n) {
    var a = t.displayName || t.name || "";
    return e.displayName || (a !== "" ? n + "(" + a + ")" : n);
  }
  function rr(e) {
    return e.displayName || "Context";
  }
  function Le(e) {
    var t = e.tag, n = e.type;
    switch (t) {
      case Ie:
        return "Cache";
      case ue:
        var a = n;
        return rr(a) + ".Consumer";
      case B:
        var r = n;
        return rr(r._context) + ".Provider";
      case Re:
        return "DehydratedFragment";
      case G:
        return Nf(n, n.render, "ForwardRef");
      case fe:
        return "Fragment";
      case z:
        return n;
      case M:
        return "Portal";
      case S:
        return "Root";
      case W:
        return "Text";
      case xe:
        return Qe(n);
      case J:
        return n === fi ? "StrictMode" : "Mode";
      case de:
        return "Offscreen";
      case P:
        return "Profiler";
      case Ce:
        return "Scope";
      case X:
        return "Suspense";
      case ye:
        return "SuspenseList";
      case qe:
        return "TracingMarker";
      case T:
      case C:
      case Q:
      case _:
      case te:
      case $:
        if (typeof n == "function")
          return n.displayName || n.name || null;
        if (typeof n == "string")
          return n;
        break;
    }
    return null;
  }
  var po = h.ReactDebugCurrentFrame, Sn = null, yi = !1;
  function Vr() {
    {
      if (Sn === null)
        return null;
      var e = Sn._debugOwner;
      if (e !== null && typeof e < "u")
        return Le(e);
    }
    return null;
  }
  function Ef() {
    return Sn === null ? "" : hi(Sn);
  }
  function Yt() {
    po.getCurrentStack = null, Sn = null, yi = !1;
  }
  function pt(e) {
    po.getCurrentStack = e === null ? null : Ef, Sn = e, yi = !1;
  }
  function us() {
    return Sn;
  }
  function aa(e) {
    yi = e;
  }
  function Rn(e) {
    return "" + e;
  }
  function Na(e) {
    switch (typeof e) {
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return e;
      case "object":
        return cn(e), e;
      default:
        return "";
    }
  }
  var xf = {
    button: !0,
    checkbox: !0,
    image: !0,
    hidden: !0,
    radio: !0,
    reset: !0,
    submit: !0
  };
  function mo(e, t) {
    xf[t.type] || t.onChange || t.onInput || t.readOnly || t.disabled || t.value == null || f("You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`."), t.onChange || t.readOnly || t.disabled || t.checked == null || f("You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.");
  }
  function ss(e) {
    var t = e.type, n = e.nodeName;
    return n && n.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function vo(e) {
    return e._valueTracker;
  }
  function tl(e) {
    e._valueTracker = null;
  }
  function Sf(e) {
    var t = "";
    return e && (ss(e) ? t = e.checked ? "true" : "false" : t = e.value), t;
  }
  function Mr(e) {
    var t = ss(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
    cn(e[t]);
    var a = "" + e[t];
    if (!(e.hasOwnProperty(t) || typeof n > "u" || typeof n.get != "function" || typeof n.set != "function")) {
      var r = n.get, i = n.set;
      Object.defineProperty(e, t, {
        configurable: !0,
        get: function() {
          return r.call(this);
        },
        set: function(o) {
          cn(o), a = "" + o, i.call(this, o);
        }
      }), Object.defineProperty(e, t, {
        enumerable: n.enumerable
      });
      var l = {
        getValue: function() {
          return a;
        },
        setValue: function(o) {
          cn(o), a = "" + o;
        },
        stopTracking: function() {
          tl(e), delete e[t];
        }
      };
      return l;
    }
  }
  function gi(e) {
    vo(e) || (e._valueTracker = Mr(e));
  }
  function ho(e) {
    if (!e)
      return !1;
    var t = vo(e);
    if (!t)
      return !0;
    var n = t.getValue(), a = Sf(e);
    return a !== n ? (t.setValue(a), !0) : !1;
  }
  function ir(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u")
      return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var nl = !1, al = !1, rl = !1, cs = !1;
  function fs(e) {
    var t = e.type === "checkbox" || e.type === "radio";
    return t ? e.checked != null : e.value != null;
  }
  function yo(e, t) {
    var n = e, a = t.checked, r = Ue({}, t, {
      defaultChecked: void 0,
      defaultValue: void 0,
      value: void 0,
      checked: a ?? n._wrapperState.initialChecked
    });
    return r;
  }
  function ds(e, t) {
    mo("input", t), t.checked !== void 0 && t.defaultChecked !== void 0 && !al && (f("%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", Vr() || "A component", t.type), al = !0), t.value !== void 0 && t.defaultValue !== void 0 && !nl && (f("%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", Vr() || "A component", t.type), nl = !0);
    var n = e, a = t.defaultValue == null ? "" : t.defaultValue;
    n._wrapperState = {
      initialChecked: t.checked != null ? t.checked : t.defaultChecked,
      initialValue: Na(t.value != null ? t.value : a),
      controlled: fs(t)
    };
  }
  function s(e, t) {
    var n = e, a = t.checked;
    a != null && ya(n, "checked", a, !1);
  }
  function y(e, t) {
    var n = e;
    {
      var a = fs(t);
      !n._wrapperState.controlled && a && !cs && (f("A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), cs = !0), n._wrapperState.controlled && !a && !rl && (f("A component is changing a controlled input to be uncontrolled. This is likely caused by the value changing from a defined to undefined, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), rl = !0);
    }
    s(e, t);
    var r = Na(t.value), i = t.type;
    if (r != null)
      i === "number" ? (r === 0 && n.value === "" || // We explicitly want to coerce to number here if possible.
      // eslint-disable-next-line
      n.value != r) && (n.value = Rn(r)) : n.value !== Rn(r) && (n.value = Rn(r));
    else if (i === "submit" || i === "reset") {
      n.removeAttribute("value");
      return;
    }
    t.hasOwnProperty("value") ? Ne(n, t.type, r) : t.hasOwnProperty("defaultValue") && Ne(n, t.type, Na(t.defaultValue)), t.checked == null && t.defaultChecked != null && (n.defaultChecked = !!t.defaultChecked);
  }
  function L(e, t, n) {
    var a = e;
    if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
      var r = t.type, i = r === "submit" || r === "reset";
      if (i && (t.value === void 0 || t.value === null))
        return;
      var l = Rn(a._wrapperState.initialValue);
      n || l !== a.value && (a.value = l), a.defaultValue = l;
    }
    var o = a.name;
    o !== "" && (a.name = ""), a.defaultChecked = !a.defaultChecked, a.defaultChecked = !!a._wrapperState.initialChecked, o !== "" && (a.name = o);
  }
  function k(e, t) {
    var n = e;
    y(n, t), K(n, t);
  }
  function K(e, t) {
    var n = t.name;
    if (t.type === "radio" && n != null) {
      for (var a = e; a.parentNode; )
        a = a.parentNode;
      $t(n, "name");
      for (var r = a.querySelectorAll("input[name=" + JSON.stringify("" + n) + '][type="radio"]'), i = 0; i < r.length; i++) {
        var l = r[i];
        if (!(l === e || l.form !== e.form)) {
          var o = Js(l);
          if (!o)
            throw new Error("ReactDOMInput: Mixing React and non-React radio inputs with the same `name` is not supported.");
          ho(l), y(l, o);
        }
      }
    }
  }
  function Ne(e, t, n) {
    // Focused number inputs synchronize on blur. See ChangeEventPlugin.js
    (t !== "number" || ir(e.ownerDocument) !== e) && (n == null ? e.defaultValue = Rn(e._wrapperState.initialValue) : e.defaultValue !== Rn(n) && (e.defaultValue = Rn(n)));
  }
  var ce = !1, _e = !1, Be = !1;
  function et(e, t) {
    t.value == null && (typeof t.children == "object" && t.children !== null ? c.Children.forEach(t.children, function(n) {
      n != null && (typeof n == "string" || typeof n == "number" || _e || (_e = !0, f("Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>.")));
    }) : t.dangerouslySetInnerHTML != null && (Be || (Be = !0, f("Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected.")))), t.selected != null && !ce && (f("Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>."), ce = !0);
  }
  function lt(e, t) {
    t.value != null && e.setAttribute("value", Rn(Na(t.value)));
  }
  var ot = Array.isArray;
  function Fe(e) {
    return ot(e);
  }
  var mt;
  mt = !1;
  function Rt() {
    var e = Vr();
    return e ? `

Check the render method of \`` + e + "`." : "";
  }
  var bi = ["value", "defaultValue"];
  function go(e) {
    {
      mo("select", e);
      for (var t = 0; t < bi.length; t++) {
        var n = bi[t];
        if (e[n] != null) {
          var a = Fe(e[n]);
          e.multiple && !a ? f("The `%s` prop supplied to <select> must be an array if `multiple` is true.%s", n, Rt()) : !e.multiple && a && f("The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.%s", n, Rt());
        }
      }
    }
  }
  function lr(e, t, n, a) {
    var r = e.options;
    if (t) {
      for (var i = n, l = {}, o = 0; o < i.length; o++)
        l["$" + i[o]] = !0;
      for (var u = 0; u < r.length; u++) {
        var p = l.hasOwnProperty("$" + r[u].value);
        r[u].selected !== p && (r[u].selected = p), p && a && (r[u].defaultSelected = !0);
      }
    } else {
      for (var v = Rn(Na(n)), x = null, E = 0; E < r.length; E++) {
        if (r[E].value === v) {
          r[E].selected = !0, a && (r[E].defaultSelected = !0);
          return;
        }
        x === null && !r[E].disabled && (x = r[E]);
      }
      x !== null && (x.selected = !0);
    }
  }
  function bo(e, t) {
    return Ue({}, t, {
      value: void 0
    });
  }
  function No(e, t) {
    var n = e;
    go(t), n._wrapperState = {
      wasMultiple: !!t.multiple
    }, t.value !== void 0 && t.defaultValue !== void 0 && !mt && (f("Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://reactjs.org/link/controlled-components"), mt = !0);
  }
  function Rf(e, t) {
    var n = e;
    n.multiple = !!t.multiple;
    var a = t.value;
    a != null ? lr(n, !!t.multiple, a, !1) : t.defaultValue != null && lr(n, !!t.multiple, t.defaultValue, !0);
  }
  function ps(e, t) {
    var n = e, a = n._wrapperState.wasMultiple;
    n._wrapperState.wasMultiple = !!t.multiple;
    var r = t.value;
    r != null ? lr(n, !!t.multiple, r, !1) : a !== !!t.multiple && (t.defaultValue != null ? lr(n, !!t.multiple, t.defaultValue, !0) : lr(n, !!t.multiple, t.multiple ? [] : "", !1));
  }
  function Cf(e, t) {
    var n = e, a = t.value;
    a != null && lr(n, !!t.multiple, a, !1);
  }
  var Bv = !1;
  function Df(e, t) {
    var n = e;
    if (t.dangerouslySetInnerHTML != null)
      throw new Error("`dangerouslySetInnerHTML` does not make sense on <textarea>.");
    var a = Ue({}, t, {
      value: void 0,
      defaultValue: void 0,
      children: Rn(n._wrapperState.initialValue)
    });
    return a;
  }
  function Pv(e, t) {
    var n = e;
    mo("textarea", t), t.value !== void 0 && t.defaultValue !== void 0 && !Bv && (f("%s contains a textarea with both value and defaultValue props. Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://reactjs.org/link/controlled-components", Vr() || "A component"), Bv = !0);
    var a = t.value;
    if (a == null) {
      var r = t.children, i = t.defaultValue;
      if (r != null) {
        f("Use the `defaultValue` or `value` props instead of setting children on <textarea>.");
        {
          if (i != null)
            throw new Error("If you supply `defaultValue` on a <textarea>, do not pass children.");
          if (Fe(r)) {
            if (r.length > 1)
              throw new Error("<textarea> can only have at most one child.");
            r = r[0];
          }
          i = r;
        }
      }
      i == null && (i = ""), a = i;
    }
    n._wrapperState = {
      initialValue: Na(a)
    };
  }
  function $v(e, t) {
    var n = e, a = Na(t.value), r = Na(t.defaultValue);
    if (a != null) {
      var i = Rn(a);
      i !== n.value && (n.value = i), t.defaultValue == null && n.defaultValue !== i && (n.defaultValue = i);
    }
    r != null && (n.defaultValue = Rn(r));
  }
  function Yv(e, t) {
    var n = e, a = n.textContent;
    a === n._wrapperState.initialValue && a !== "" && a !== null && (n.value = a);
  }
  function xE(e, t) {
    $v(e, t);
  }
  var or = "http://www.w3.org/1999/xhtml", SE = "http://www.w3.org/1998/Math/MathML", Tf = "http://www.w3.org/2000/svg";
  function jf(e) {
    switch (e) {
      case "svg":
        return Tf;
      case "math":
        return SE;
      default:
        return or;
    }
  }
  function wf(e, t) {
    return e == null || e === or ? jf(t) : e === Tf && t === "foreignObject" ? or : e;
  }
  var RE = function(e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, a, r) {
      MSApp.execUnsafeLocalFunction(function() {
        return e(t, n, a, r);
      });
    } : e;
  }, ms, Iv = RE(function(e, t) {
    if (e.namespaceURI === Tf && !("innerHTML" in e)) {
      ms = ms || document.createElement("div"), ms.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>";
      for (var n = ms.firstChild; e.firstChild; )
        e.removeChild(e.firstChild);
      for (; n.firstChild; )
        e.appendChild(n.firstChild);
      return;
    }
    e.innerHTML = t;
  }), An = 1, ur = 3, Ct = 8, sr = 9, _f = 11, vs = function(e, t) {
    if (t) {
      var n = e.firstChild;
      if (n && n === e.lastChild && n.nodeType === ur) {
        n.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }, CE = {
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
  }, Eo = {
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
  function DE(e, t) {
    return e + t.charAt(0).toUpperCase() + t.substring(1);
  }
  var TE = ["Webkit", "ms", "Moz", "O"];
  Object.keys(Eo).forEach(function(e) {
    TE.forEach(function(t) {
      Eo[DE(t, e)] = Eo[e];
    });
  });
  function Of(e, t, n) {
    var a = t == null || typeof t == "boolean" || t === "";
    return a ? "" : !n && typeof t == "number" && t !== 0 && !(Eo.hasOwnProperty(e) && Eo[e]) ? t + "px" : (ma(t, e), ("" + t).trim());
  }
  var jE = /([A-Z])/g, wE = /^ms-/;
  function _E(e) {
    return e.replace(jE, "-$1").toLowerCase().replace(wE, "-ms-");
  }
  var qv = function() {
  };
  {
    var OE = /^(?:webkit|moz|o)[A-Z]/, LE = /^-ms-/, VE = /-(.)/g, Gv = /;\s*$/, il = {}, Lf = {}, Wv = !1, Qv = !1, ME = function(e) {
      return e.replace(VE, function(t, n) {
        return n.toUpperCase();
      });
    }, AE = function(e) {
      il.hasOwnProperty(e) && il[e] || (il[e] = !0, f(
        "Unsupported style property %s. Did you mean %s?",
        e,
        // As Andi Smith suggests
        // (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
        // is converted to lowercase `ms`.
        ME(e.replace(LE, "ms-"))
      ));
    }, kE = function(e) {
      il.hasOwnProperty(e) && il[e] || (il[e] = !0, f("Unsupported vendor-prefixed style property %s. Did you mean %s?", e, e.charAt(0).toUpperCase() + e.slice(1)));
    }, UE = function(e, t) {
      Lf.hasOwnProperty(t) && Lf[t] || (Lf[t] = !0, f(`Style property values shouldn't contain a semicolon. Try "%s: %s" instead.`, e, t.replace(Gv, "")));
    }, FE = function(e, t) {
      Wv || (Wv = !0, f("`NaN` is an invalid value for the `%s` css style property.", e));
    }, zE = function(e, t) {
      Qv || (Qv = !0, f("`Infinity` is an invalid value for the `%s` css style property.", e));
    };
    qv = function(e, t) {
      e.indexOf("-") > -1 ? AE(e) : OE.test(e) ? kE(e) : Gv.test(t) && UE(e, t), typeof t == "number" && (isNaN(t) ? FE(e, t) : isFinite(t) || zE(e, t));
    };
  }
  var HE = qv;
  function BE(e) {
    {
      var t = "", n = "";
      for (var a in e)
        if (e.hasOwnProperty(a)) {
          var r = e[a];
          if (r != null) {
            var i = a.indexOf("--") === 0;
            t += n + (i ? a : _E(a)) + ":", t += Of(a, r, i), n = ";";
          }
        }
      return t || null;
    }
  }
  function Kv(e, t) {
    var n = e.style;
    for (var a in t)
      if (t.hasOwnProperty(a)) {
        var r = a.indexOf("--") === 0;
        r || HE(a, t[a]);
        var i = Of(a, t[a], r);
        a === "float" && (a = "cssFloat"), r ? n.setProperty(a, i) : n[a] = i;
      }
  }
  function PE(e) {
    return e == null || typeof e == "boolean" || e === "";
  }
  function Xv(e) {
    var t = {};
    for (var n in e)
      for (var a = CE[n] || [n], r = 0; r < a.length; r++)
        t[a[r]] = n;
    return t;
  }
  function $E(e, t) {
    {
      if (!t)
        return;
      var n = Xv(e), a = Xv(t), r = {};
      for (var i in n) {
        var l = n[i], o = a[i];
        if (o && l !== o) {
          var u = l + "," + o;
          if (r[u])
            continue;
          r[u] = !0, f("%s a style property during rerender (%s) when a conflicting property is set (%s) can lead to styling bugs. To avoid this, don't mix shorthand and non-shorthand properties for the same value; instead, replace the shorthand with separate values.", PE(e[l]) ? "Removing" : "Updating", l, o);
        }
      }
    }
  }
  var YE = {
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
  }, IE = Ue({
    menuitem: !0
  }, YE), qE = "__html";
  function Vf(e, t) {
    if (t) {
      if (IE[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
        throw new Error(e + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
      if (t.dangerouslySetInnerHTML != null) {
        if (t.children != null)
          throw new Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
        if (typeof t.dangerouslySetInnerHTML != "object" || !(qE in t.dangerouslySetInnerHTML))
          throw new Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information.");
      }
      if (!t.suppressContentEditableWarning && t.contentEditable && t.children != null && f("A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional."), t.style != null && typeof t.style != "object")
        throw new Error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.");
    }
  }
  function Ni(e, t) {
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
  var hs = {
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
  }, Jv = {
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
  }, ll = {}, GE = new RegExp("^(aria)-[" + ee + "]*$"), WE = new RegExp("^(aria)[A-Z][" + ee + "]*$");
  function QE(e, t) {
    {
      if (Ln.call(ll, t) && ll[t])
        return !0;
      if (WE.test(t)) {
        var n = "aria-" + t.slice(4).toLowerCase(), a = Jv.hasOwnProperty(n) ? n : null;
        if (a == null)
          return f("Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.", t), ll[t] = !0, !0;
        if (t !== a)
          return f("Invalid ARIA attribute `%s`. Did you mean `%s`?", t, a), ll[t] = !0, !0;
      }
      if (GE.test(t)) {
        var r = t.toLowerCase(), i = Jv.hasOwnProperty(r) ? r : null;
        if (i == null)
          return ll[t] = !0, !1;
        if (t !== i)
          return f("Unknown ARIA attribute `%s`. Did you mean `%s`?", t, i), ll[t] = !0, !0;
      }
    }
    return !0;
  }
  function KE(e, t) {
    {
      var n = [];
      for (var a in t) {
        var r = QE(e, a);
        r || n.push(a);
      }
      var i = n.map(function(l) {
        return "`" + l + "`";
      }).join(", ");
      n.length === 1 ? f("Invalid aria prop %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", i, e) : n.length > 1 && f("Invalid aria props %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", i, e);
    }
  }
  function XE(e, t) {
    Ni(e, t) || KE(e, t);
  }
  var Zv = !1;
  function JE(e, t) {
    {
      if (e !== "input" && e !== "textarea" && e !== "select")
        return;
      t != null && t.value === null && !Zv && (Zv = !0, e === "select" && t.multiple ? f("`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.", e) : f("`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.", e));
    }
  }
  var eh = function() {
  };
  {
    var Cn = {}, th = /^on./, ZE = /^on[^A-Z]/, ex = new RegExp("^(aria)-[" + ee + "]*$"), tx = new RegExp("^(aria)[A-Z][" + ee + "]*$");
    eh = function(e, t, n, a) {
      if (Ln.call(Cn, t) && Cn[t])
        return !0;
      var r = t.toLowerCase();
      if (r === "onfocusin" || r === "onfocusout")
        return f("React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React."), Cn[t] = !0, !0;
      if (a != null) {
        var i = a.registrationNameDependencies, l = a.possibleRegistrationNames;
        if (i.hasOwnProperty(t))
          return !0;
        var o = l.hasOwnProperty(r) ? l[r] : null;
        if (o != null)
          return f("Invalid event handler property `%s`. Did you mean `%s`?", t, o), Cn[t] = !0, !0;
        if (th.test(t))
          return f("Unknown event handler property `%s`. It will be ignored.", t), Cn[t] = !0, !0;
      } else if (th.test(t))
        return ZE.test(t) && f("Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.", t), Cn[t] = !0, !0;
      if (ex.test(t) || tx.test(t))
        return !0;
      if (r === "innerhtml")
        return f("Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`."), Cn[t] = !0, !0;
      if (r === "aria")
        return f("The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead."), Cn[t] = !0, !0;
      if (r === "is" && n !== null && n !== void 0 && typeof n != "string")
        return f("Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.", typeof n), Cn[t] = !0, !0;
      if (typeof n == "number" && isNaN(n))
        return f("Received NaN for the `%s` attribute. If this is expected, cast the value to a string.", t), Cn[t] = !0, !0;
      var u = bt(t), p = u !== null && u.type === Zt;
      if (hs.hasOwnProperty(r)) {
        var v = hs[r];
        if (v !== t)
          return f("Invalid DOM property `%s`. Did you mean `%s`?", t, v), Cn[t] = !0, !0;
      } else if (!p && t !== r)
        return f("React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.", t, r), Cn[t] = !0, !0;
      return typeof n == "boolean" && yt(t, n, u, !1) ? (n ? f('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.', n, t, t, n, t) : f('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.', n, t, t, n, t, t, t), Cn[t] = !0, !0) : p ? !0 : yt(t, n, u, !1) ? (Cn[t] = !0, !1) : ((n === "false" || n === "true") && u !== null && u.type === wt && (f("Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?", n, t, n === "false" ? "The browser will interpret it as a truthy value." : 'Although this works, it will not work as expected if you pass the string "false".', t, n), Cn[t] = !0), !0);
    };
  }
  var nx = function(e, t, n) {
    {
      var a = [];
      for (var r in t) {
        var i = eh(e, r, t[r], n);
        i || a.push(r);
      }
      var l = a.map(function(o) {
        return "`" + o + "`";
      }).join(", ");
      a.length === 1 ? f("Invalid value for prop %s on <%s> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", l, e) : a.length > 1 && f("Invalid values for props %s on <%s> tag. Either remove them from the element, or pass a string or number value to keep them in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", l, e);
    }
  };
  function ax(e, t, n) {
    Ni(e, t) || nx(e, t, n);
  }
  var nh = 1, Mf = 2, xo = 4, rx = nh | Mf | xo, So = null;
  function ix(e) {
    So !== null && f("Expected currently replaying event to be null. This error is likely caused by a bug in React. Please file an issue."), So = e;
  }
  function lx() {
    So === null && f("Expected currently replaying event to not be null. This error is likely caused by a bug in React. Please file an issue."), So = null;
  }
  function ox(e) {
    return e === So;
  }
  function Af(e) {
    var t = e.target || e.srcElement || window;
    return t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === ur ? t.parentNode : t;
  }
  var kf = null, ol = null, ul = null;
  function ah(e) {
    var t = $r(e);
    if (t) {
      if (typeof kf != "function")
        throw new Error("setRestoreImplementation() needs to be called to handle a target for controlled events. This error is likely caused by a bug in React. Please file an issue.");
      var n = t.stateNode;
      if (n) {
        var a = Js(n);
        kf(t.stateNode, t.type, a);
      }
    }
  }
  function ux(e) {
    kf = e;
  }
  function rh(e) {
    ol ? ul ? ul.push(e) : ul = [e] : ol = e;
  }
  function sx() {
    return ol !== null || ul !== null;
  }
  function ih() {
    if (ol) {
      var e = ol, t = ul;
      if (ol = null, ul = null, ah(e), t)
        for (var n = 0; n < t.length; n++)
          ah(t[n]);
    }
  }
  var lh = function(e, t) {
    return e(t);
  }, oh = function() {
  }, Uf = !1;
  function cx() {
    var e = sx();
    e && (oh(), ih());
  }
  function uh(e, t, n) {
    if (Uf)
      return e(t, n);
    Uf = !0;
    try {
      return lh(e, t, n);
    } finally {
      Uf = !1, cx();
    }
  }
  function fx(e, t, n) {
    lh = e, oh = n;
  }
  function dx(e) {
    return e === "button" || e === "input" || e === "select" || e === "textarea";
  }
  function px(e, t, n) {
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
        return !!(n.disabled && dx(t));
      default:
        return !1;
    }
  }
  function Ro(e, t) {
    var n = e.stateNode;
    if (n === null)
      return null;
    var a = Js(n);
    if (a === null)
      return null;
    var r = a[t];
    if (px(t, e.type, a))
      return null;
    if (r && typeof r != "function")
      throw new Error("Expected `" + t + "` listener to be a function, instead got a value of `" + typeof r + "` type.");
    return r;
  }
  var Ff = !1;
  if (Jt)
    try {
      var Co = {};
      Object.defineProperty(Co, "passive", {
        get: function() {
          Ff = !0;
        }
      }), window.addEventListener("test", Co, Co), window.removeEventListener("test", Co, Co);
    } catch {
      Ff = !1;
    }
  function sh(e, t, n, a, r, i, l, o, u) {
    var p = Array.prototype.slice.call(arguments, 3);
    try {
      t.apply(n, p);
    } catch (v) {
      this.onError(v);
    }
  }
  var ch = sh;
  if (typeof window < "u" && typeof window.dispatchEvent == "function" && typeof document < "u" && typeof document.createEvent == "function") {
    var zf = document.createElement("react");
    ch = function(t, n, a, r, i, l, o, u, p) {
      if (typeof document > "u" || document === null)
        throw new Error("The `document` global was defined when React was initialized, but is not defined anymore. This can happen in a test environment if a component schedules an update from an asynchronous callback, but the test has already finished running. To solve this, you can either unmount the component at the end of your test (and ensure that any asynchronous operations get canceled in `componentWillUnmount`), or you can change the test itself to be asynchronous.");
      var v = document.createEvent("Event"), x = !1, E = !0, O = window.event, V = Object.getOwnPropertyDescriptor(window, "event");
      function U() {
        zf.removeEventListener(F, he, !1), typeof window.event < "u" && window.hasOwnProperty("event") && (window.event = O);
      }
      var ae = Array.prototype.slice.call(arguments, 3);
      function he() {
        x = !0, U(), n.apply(a, ae), E = !1;
      }
      var pe, Ye = !1, ze = !1;
      function j(w) {
        if (pe = w.error, Ye = !0, pe === null && w.colno === 0 && w.lineno === 0 && (ze = !0), w.defaultPrevented && pe != null && typeof pe == "object")
          try {
            pe._suppressLogging = !0;
          } catch {
          }
      }
      var F = "react-" + (t || "invokeguardedcallback");
      if (window.addEventListener("error", j), zf.addEventListener(F, he, !1), v.initEvent(F, !1, !1), zf.dispatchEvent(v), V && Object.defineProperty(window, "event", V), x && E && (Ye ? ze && (pe = new Error("A cross-origin error was thrown. React doesn't have access to the actual error object in development. See https://reactjs.org/link/crossorigin-error for more information.")) : pe = new Error(`An error was thrown inside one of your components, but React doesn't know what it was. This is likely due to browser flakiness. React does its best to preserve the "Pause on exceptions" behavior of the DevTools, which requires some DEV-mode only tricks. It's possible that these don't work in your browser. Try triggering the error in production mode, or switching to a modern browser. If you suspect that this is actually an issue with React, please file an issue.`), this.onError(pe)), window.removeEventListener("error", j), !x)
        return U(), sh.apply(this, arguments);
    };
  }
  var mx = ch, sl = !1, ys = null, gs = !1, Hf = null, vx = {
    onError: function(e) {
      sl = !0, ys = e;
    }
  };
  function Bf(e, t, n, a, r, i, l, o, u) {
    sl = !1, ys = null, mx.apply(vx, arguments);
  }
  function hx(e, t, n, a, r, i, l, o, u) {
    if (Bf.apply(this, arguments), sl) {
      var p = Pf();
      gs || (gs = !0, Hf = p);
    }
  }
  function yx() {
    if (gs) {
      var e = Hf;
      throw gs = !1, Hf = null, e;
    }
  }
  function gx() {
    return sl;
  }
  function Pf() {
    if (sl) {
      var e = ys;
      return sl = !1, ys = null, e;
    } else
      throw new Error("clearCaughtError was called but no error was captured. This error is likely caused by a bug in React. Please file an issue.");
  }
  function cl(e) {
    return e._reactInternals;
  }
  function bx(e) {
    return e._reactInternals !== void 0;
  }
  function Nx(e, t) {
    e._reactInternals = t;
  }
  var Ee = (
    /*                      */
    0
  ), fl = (
    /*                */
    1
  ), Dt = (
    /*                    */
    2
  ), Ke = (
    /*                       */
    4
  ), Ei = (
    /*                */
    16
  ), Do = (
    /*                 */
    32
  ), fh = (
    /*                     */
    64
  ), Xe = (
    /*                   */
    128
  ), cr = (
    /*            */
    256
  ), xi = (
    /*                          */
    512
  ), dl = (
    /*                     */
    1024
  ), Ar = (
    /*                      */
    2048
  ), fr = (
    /*                    */
    4096
  ), Si = (
    /*                   */
    8192
  ), $f = (
    /*             */
    16384
  ), Ex = (
    /*               */
    32767
  ), bs = (
    /*                   */
    32768
  ), Dn = (
    /*                */
    65536
  ), Yf = (
    /* */
    131072
  ), dh = (
    /*                       */
    1048576
  ), If = (
    /*                    */
    2097152
  ), Ri = (
    /*                 */
    4194304
  ), qf = (
    /*                */
    8388608
  ), kr = (
    /*               */
    16777216
  ), Gf = (
    /*              */
    33554432
  ), Wf = (
    // TODO: Remove Update flag from before mutation phase by re-landing Visibility
    // flag logic (see #20043)
    Ke | dl | 0
  ), Qf = Dt | Ke | Ei | Do | xi | fr | Si, To = Ke | fh | xi | Si, pl = Ar | Ei, dr = Ri | qf | If, xx = h.ReactCurrentOwner;
  function Ci(e) {
    var t = e, n = e;
    if (e.alternate)
      for (; t.return; )
        t = t.return;
    else {
      var a = t;
      do
        t = a, (t.flags & (Dt | fr)) !== Ee && (n = t.return), a = t.return;
      while (a);
    }
    return t.tag === S ? n : null;
  }
  function ph(e) {
    if (e.tag === X) {
      var t = e.memoizedState;
      if (t === null) {
        var n = e.alternate;
        n !== null && (t = n.memoizedState);
      }
      if (t !== null)
        return t.dehydrated;
    }
    return null;
  }
  function mh(e) {
    return e.tag === S ? e.stateNode.containerInfo : null;
  }
  function Sx(e) {
    return Ci(e) === e;
  }
  function Rx(e) {
    {
      var t = xx.current;
      if (t !== null && t.tag === T) {
        var n = t, a = n.stateNode;
        a._warnedAboutRefsInRender || f("%s is accessing isMounted inside its render() function. render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", Le(n) || "A component"), a._warnedAboutRefsInRender = !0;
      }
    }
    var r = cl(e);
    return r ? Ci(r) === r : !1;
  }
  function vh(e) {
    if (Ci(e) !== e)
      throw new Error("Unable to find node on an unmounted component.");
  }
  function hh(e) {
    var t = e.alternate;
    if (!t) {
      var n = Ci(e);
      if (n === null)
        throw new Error("Unable to find node on an unmounted component.");
      return n !== e ? null : e;
    }
    for (var a = e, r = t; ; ) {
      var i = a.return;
      if (i === null)
        break;
      var l = i.alternate;
      if (l === null) {
        var o = i.return;
        if (o !== null) {
          a = r = o;
          continue;
        }
        break;
      }
      if (i.child === l.child) {
        for (var u = i.child; u; ) {
          if (u === a)
            return vh(i), e;
          if (u === r)
            return vh(i), t;
          u = u.sibling;
        }
        throw new Error("Unable to find node on an unmounted component.");
      }
      if (a.return !== r.return)
        a = i, r = l;
      else {
        for (var p = !1, v = i.child; v; ) {
          if (v === a) {
            p = !0, a = i, r = l;
            break;
          }
          if (v === r) {
            p = !0, r = i, a = l;
            break;
          }
          v = v.sibling;
        }
        if (!p) {
          for (v = l.child; v; ) {
            if (v === a) {
              p = !0, a = l, r = i;
              break;
            }
            if (v === r) {
              p = !0, r = l, a = i;
              break;
            }
            v = v.sibling;
          }
          if (!p)
            throw new Error("Child was not found in either parent set. This indicates a bug in React related to the return pointer. Please file an issue.");
        }
      }
      if (a.alternate !== r)
        throw new Error("Return fibers should always be each others' alternates. This error is likely caused by a bug in React. Please file an issue.");
    }
    if (a.tag !== S)
      throw new Error("Unable to find node on an unmounted component.");
    return a.stateNode.current === a ? e : t;
  }
  function yh(e) {
    var t = hh(e);
    return t !== null ? gh(t) : null;
  }
  function gh(e) {
    if (e.tag === z || e.tag === W)
      return e;
    for (var t = e.child; t !== null; ) {
      var n = gh(t);
      if (n !== null)
        return n;
      t = t.sibling;
    }
    return null;
  }
  function Cx(e) {
    var t = hh(e);
    return t !== null ? bh(t) : null;
  }
  function bh(e) {
    if (e.tag === z || e.tag === W)
      return e;
    for (var t = e.child; t !== null; ) {
      if (t.tag !== M) {
        var n = bh(t);
        if (n !== null)
          return n;
      }
      t = t.sibling;
    }
    return null;
  }
  var Nh = m.unstable_scheduleCallback, Dx = m.unstable_cancelCallback, Tx = m.unstable_shouldYield, jx = m.unstable_requestPaint, It = m.unstable_now, wx = m.unstable_getCurrentPriorityLevel, Ns = m.unstable_ImmediatePriority, Kf = m.unstable_UserBlockingPriority, Di = m.unstable_NormalPriority, _x = m.unstable_LowPriority, Xf = m.unstable_IdlePriority, Ox = m.unstable_yieldValue, Lx = m.unstable_setDisableYieldValue, ml = null, pn = null, ie = null, Ba = !1, Ea = typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u";
  function Vx(e) {
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u")
      return !1;
    var t = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (t.isDisabled)
      return !0;
    if (!t.supportsFiber)
      return f("The installed version of React DevTools is too old and will not work with the current version of React. Please update React DevTools. https://reactjs.org/link/react-devtools"), !0;
    try {
      pa && (e = Ue({}, e, {
        getLaneLabelMap: zx,
        injectProfilingHooks: Fx
      })), ml = t.inject(e), pn = t;
    } catch (n) {
      f("React instrumentation encountered an error: %s.", n);
    }
    return !!t.checkDCE;
  }
  function Mx(e, t) {
    if (pn && typeof pn.onScheduleFiberRoot == "function")
      try {
        pn.onScheduleFiberRoot(ml, e, t);
      } catch (n) {
        Ba || (Ba = !0, f("React instrumentation encountered an error: %s", n));
      }
  }
  function Ax(e, t) {
    if (pn && typeof pn.onCommitFiberRoot == "function")
      try {
        var n = (e.current.flags & Xe) === Xe;
        if (bn) {
          var a;
          switch (t) {
            case qn:
              a = Ns;
              break;
            case mr:
              a = Kf;
              break;
            case vr:
              a = Di;
              break;
            case Ts:
              a = Xf;
              break;
            default:
              a = Di;
              break;
          }
          pn.onCommitFiberRoot(ml, e, a, n);
        }
      } catch (r) {
        Ba || (Ba = !0, f("React instrumentation encountered an error: %s", r));
      }
  }
  function kx(e) {
    if (pn && typeof pn.onPostCommitFiberRoot == "function")
      try {
        pn.onPostCommitFiberRoot(ml, e);
      } catch (t) {
        Ba || (Ba = !0, f("React instrumentation encountered an error: %s", t));
      }
  }
  function Ux(e) {
    if (pn && typeof pn.onCommitFiberUnmount == "function")
      try {
        pn.onCommitFiberUnmount(ml, e);
      } catch (t) {
        Ba || (Ba = !0, f("React instrumentation encountered an error: %s", t));
      }
  }
  function qt(e) {
    if (typeof Ox == "function" && (Lx(e), N(e)), pn && typeof pn.setStrictMode == "function")
      try {
        pn.setStrictMode(ml, e);
      } catch (t) {
        Ba || (Ba = !0, f("React instrumentation encountered an error: %s", t));
      }
  }
  function Fx(e) {
    ie = e;
  }
  function zx() {
    {
      for (var e = /* @__PURE__ */ new Map(), t = 1, n = 0; n < Zf; n++) {
        var a = iS(t);
        e.set(t, a), t *= 2;
      }
      return e;
    }
  }
  function Hx(e) {
    ie !== null && typeof ie.markCommitStarted == "function" && ie.markCommitStarted(e);
  }
  function Eh() {
    ie !== null && typeof ie.markCommitStopped == "function" && ie.markCommitStopped();
  }
  function jo(e) {
    ie !== null && typeof ie.markComponentRenderStarted == "function" && ie.markComponentRenderStarted(e);
  }
  function vl() {
    ie !== null && typeof ie.markComponentRenderStopped == "function" && ie.markComponentRenderStopped();
  }
  function Bx(e) {
    ie !== null && typeof ie.markComponentPassiveEffectMountStarted == "function" && ie.markComponentPassiveEffectMountStarted(e);
  }
  function Px() {
    ie !== null && typeof ie.markComponentPassiveEffectMountStopped == "function" && ie.markComponentPassiveEffectMountStopped();
  }
  function $x(e) {
    ie !== null && typeof ie.markComponentPassiveEffectUnmountStarted == "function" && ie.markComponentPassiveEffectUnmountStarted(e);
  }
  function Yx() {
    ie !== null && typeof ie.markComponentPassiveEffectUnmountStopped == "function" && ie.markComponentPassiveEffectUnmountStopped();
  }
  function Ix(e) {
    ie !== null && typeof ie.markComponentLayoutEffectMountStarted == "function" && ie.markComponentLayoutEffectMountStarted(e);
  }
  function qx() {
    ie !== null && typeof ie.markComponentLayoutEffectMountStopped == "function" && ie.markComponentLayoutEffectMountStopped();
  }
  function xh(e) {
    ie !== null && typeof ie.markComponentLayoutEffectUnmountStarted == "function" && ie.markComponentLayoutEffectUnmountStarted(e);
  }
  function Sh() {
    ie !== null && typeof ie.markComponentLayoutEffectUnmountStopped == "function" && ie.markComponentLayoutEffectUnmountStopped();
  }
  function Gx(e, t, n) {
    ie !== null && typeof ie.markComponentErrored == "function" && ie.markComponentErrored(e, t, n);
  }
  function Wx(e, t, n) {
    ie !== null && typeof ie.markComponentSuspended == "function" && ie.markComponentSuspended(e, t, n);
  }
  function Qx(e) {
    ie !== null && typeof ie.markLayoutEffectsStarted == "function" && ie.markLayoutEffectsStarted(e);
  }
  function Kx() {
    ie !== null && typeof ie.markLayoutEffectsStopped == "function" && ie.markLayoutEffectsStopped();
  }
  function Xx(e) {
    ie !== null && typeof ie.markPassiveEffectsStarted == "function" && ie.markPassiveEffectsStarted(e);
  }
  function Jx() {
    ie !== null && typeof ie.markPassiveEffectsStopped == "function" && ie.markPassiveEffectsStopped();
  }
  function Rh(e) {
    ie !== null && typeof ie.markRenderStarted == "function" && ie.markRenderStarted(e);
  }
  function Zx() {
    ie !== null && typeof ie.markRenderYielded == "function" && ie.markRenderYielded();
  }
  function Ch() {
    ie !== null && typeof ie.markRenderStopped == "function" && ie.markRenderStopped();
  }
  function eS(e) {
    ie !== null && typeof ie.markRenderScheduled == "function" && ie.markRenderScheduled(e);
  }
  function tS(e, t) {
    ie !== null && typeof ie.markForceUpdateScheduled == "function" && ie.markForceUpdateScheduled(e, t);
  }
  function Jf(e, t) {
    ie !== null && typeof ie.markStateUpdateScheduled == "function" && ie.markStateUpdateScheduled(e, t);
  }
  var be = (
    /*                         */
    0
  ), Pe = (
    /*                 */
    1
  ), tt = (
    /*                    */
    2
  ), Et = (
    /*               */
    8
  ), Pa = (
    /*              */
    16
  ), Dh = Math.clz32 ? Math.clz32 : rS, nS = Math.log, aS = Math.LN2;
  function rS(e) {
    var t = e >>> 0;
    return t === 0 ? 32 : 31 - (nS(t) / aS | 0) | 0;
  }
  var Zf = 31, Y = (
    /*                        */
    0
  ), Gt = (
    /*                          */
    0
  ), Te = (
    /*                        */
    1
  ), hl = (
    /*    */
    2
  ), pr = (
    /*             */
    4
  ), Ti = (
    /*            */
    8
  ), $a = (
    /*                     */
    16
  ), wo = (
    /*                */
    32
  ), yl = (
    /*                       */
    4194240
  ), _o = (
    /*                        */
    64
  ), ed = (
    /*                        */
    128
  ), td = (
    /*                        */
    256
  ), nd = (
    /*                        */
    512
  ), ad = (
    /*                        */
    1024
  ), rd = (
    /*                        */
    2048
  ), id = (
    /*                        */
    4096
  ), ld = (
    /*                        */
    8192
  ), od = (
    /*                        */
    16384
  ), ud = (
    /*                       */
    32768
  ), sd = (
    /*                       */
    65536
  ), cd = (
    /*                       */
    131072
  ), fd = (
    /*                       */
    262144
  ), dd = (
    /*                       */
    524288
  ), pd = (
    /*                       */
    1048576
  ), md = (
    /*                       */
    2097152
  ), Es = (
    /*                            */
    130023424
  ), gl = (
    /*                             */
    4194304
  ), vd = (
    /*                             */
    8388608
  ), hd = (
    /*                             */
    16777216
  ), yd = (
    /*                             */
    33554432
  ), gd = (
    /*                             */
    67108864
  ), Th = gl, Oo = (
    /*          */
    134217728
  ), jh = (
    /*                          */
    268435455
  ), Lo = (
    /*               */
    268435456
  ), ji = (
    /*                        */
    536870912
  ), Yn = (
    /*                   */
    1073741824
  );
  function iS(e) {
    {
      if (e & Te)
        return "Sync";
      if (e & hl)
        return "InputContinuousHydration";
      if (e & pr)
        return "InputContinuous";
      if (e & Ti)
        return "DefaultHydration";
      if (e & $a)
        return "Default";
      if (e & wo)
        return "TransitionHydration";
      if (e & yl)
        return "Transition";
      if (e & Es)
        return "Retry";
      if (e & Oo)
        return "SelectiveHydration";
      if (e & Lo)
        return "IdleHydration";
      if (e & ji)
        return "Idle";
      if (e & Yn)
        return "Offscreen";
    }
  }
  var ut = -1, xs = _o, Ss = gl;
  function Vo(e) {
    switch (wi(e)) {
      case Te:
        return Te;
      case hl:
        return hl;
      case pr:
        return pr;
      case Ti:
        return Ti;
      case $a:
        return $a;
      case wo:
        return wo;
      case _o:
      case ed:
      case td:
      case nd:
      case ad:
      case rd:
      case id:
      case ld:
      case od:
      case ud:
      case sd:
      case cd:
      case fd:
      case dd:
      case pd:
      case md:
        return e & yl;
      case gl:
      case vd:
      case hd:
      case yd:
      case gd:
        return e & Es;
      case Oo:
        return Oo;
      case Lo:
        return Lo;
      case ji:
        return ji;
      case Yn:
        return Yn;
      default:
        return f("Should have found matching lanes. This is a bug in React."), e;
    }
  }
  function Rs(e, t) {
    var n = e.pendingLanes;
    if (n === Y)
      return Y;
    var a = Y, r = e.suspendedLanes, i = e.pingedLanes, l = n & jh;
    if (l !== Y) {
      var o = l & ~r;
      if (o !== Y)
        a = Vo(o);
      else {
        var u = l & i;
        u !== Y && (a = Vo(u));
      }
    } else {
      var p = n & ~r;
      p !== Y ? a = Vo(p) : i !== Y && (a = Vo(i));
    }
    if (a === Y)
      return Y;
    if (t !== Y && t !== a && // If we already suspended with a delay, then interrupting is fine. Don't
    // bother waiting until the root is complete.
    (t & r) === Y) {
      var v = wi(a), x = wi(t);
      if (
        // Tests whether the next lane is equal or lower priority than the wip
        // one. This works because the bits decrease in priority as you go left.
        v >= x || // Default priority updates should not interrupt transition updates. The
        // only difference between default updates and transition updates is that
        // default updates do not support refresh transitions.
        v === $a && (x & yl) !== Y
      )
        return t;
    }
    (a & pr) !== Y && (a |= n & $a);
    var E = e.entangledLanes;
    if (E !== Y)
      for (var O = e.entanglements, V = a & E; V > 0; ) {
        var U = _i(V), ae = 1 << U;
        a |= O[U], V &= ~ae;
      }
    return a;
  }
  function lS(e, t) {
    for (var n = e.eventTimes, a = ut; t > 0; ) {
      var r = _i(t), i = 1 << r, l = n[r];
      l > a && (a = l), t &= ~i;
    }
    return a;
  }
  function oS(e, t) {
    switch (e) {
      case Te:
      case hl:
      case pr:
        return t + 250;
      case Ti:
      case $a:
      case wo:
      case _o:
      case ed:
      case td:
      case nd:
      case ad:
      case rd:
      case id:
      case ld:
      case od:
      case ud:
      case sd:
      case cd:
      case fd:
      case dd:
      case pd:
      case md:
        return t + 5e3;
      case gl:
      case vd:
      case hd:
      case yd:
      case gd:
        return ut;
      case Oo:
      case Lo:
      case ji:
      case Yn:
        return ut;
      default:
        return f("Should have found matching lanes. This is a bug in React."), ut;
    }
  }
  function uS(e, t) {
    for (var n = e.pendingLanes, a = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, l = n; l > 0; ) {
      var o = _i(l), u = 1 << o, p = i[o];
      p === ut ? ((u & a) === Y || (u & r) !== Y) && (i[o] = oS(u, t)) : p <= t && (e.expiredLanes |= u), l &= ~u;
    }
  }
  function sS(e) {
    return Vo(e.pendingLanes);
  }
  function bd(e) {
    var t = e.pendingLanes & ~Yn;
    return t !== Y ? t : t & Yn ? Yn : Y;
  }
  function cS(e) {
    return (e & Te) !== Y;
  }
  function Nd(e) {
    return (e & jh) !== Y;
  }
  function wh(e) {
    return (e & Es) === e;
  }
  function fS(e) {
    var t = Te | pr | $a;
    return (e & t) === Y;
  }
  function dS(e) {
    return (e & yl) === e;
  }
  function Cs(e, t) {
    var n = hl | pr | Ti | $a;
    return (t & n) !== Y;
  }
  function pS(e, t) {
    return (t & e.expiredLanes) !== Y;
  }
  function _h(e) {
    return (e & yl) !== Y;
  }
  function Oh() {
    var e = xs;
    return xs <<= 1, (xs & yl) === Y && (xs = _o), e;
  }
  function mS() {
    var e = Ss;
    return Ss <<= 1, (Ss & Es) === Y && (Ss = gl), e;
  }
  function wi(e) {
    return e & -e;
  }
  function Mo(e) {
    return wi(e);
  }
  function _i(e) {
    return 31 - Dh(e);
  }
  function Ed(e) {
    return _i(e);
  }
  function In(e, t) {
    return (e & t) !== Y;
  }
  function bl(e, t) {
    return (e & t) === t;
  }
  function Ae(e, t) {
    return e | t;
  }
  function Ds(e, t) {
    return e & ~t;
  }
  function Lh(e, t) {
    return e & t;
  }
  function b_(e) {
    return e;
  }
  function vS(e, t) {
    return e !== Gt && e < t ? e : t;
  }
  function xd(e) {
    for (var t = [], n = 0; n < Zf; n++)
      t.push(e);
    return t;
  }
  function Ao(e, t, n) {
    e.pendingLanes |= t, t !== ji && (e.suspendedLanes = Y, e.pingedLanes = Y);
    var a = e.eventTimes, r = Ed(t);
    a[r] = n;
  }
  function hS(e, t) {
    e.suspendedLanes |= t, e.pingedLanes &= ~t;
    for (var n = e.expirationTimes, a = t; a > 0; ) {
      var r = _i(a), i = 1 << r;
      n[r] = ut, a &= ~i;
    }
  }
  function Vh(e, t, n) {
    e.pingedLanes |= e.suspendedLanes & t;
  }
  function yS(e, t) {
    var n = e.pendingLanes & ~t;
    e.pendingLanes = t, e.suspendedLanes = Y, e.pingedLanes = Y, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t;
    for (var a = e.entanglements, r = e.eventTimes, i = e.expirationTimes, l = n; l > 0; ) {
      var o = _i(l), u = 1 << o;
      a[o] = Y, r[o] = ut, i[o] = ut, l &= ~u;
    }
  }
  function Sd(e, t) {
    for (var n = e.entangledLanes |= t, a = e.entanglements, r = n; r; ) {
      var i = _i(r), l = 1 << i;
      // Is this one of the newly entangled lanes?
      l & t | // Is this lane transitively entangled with the newly entangled lanes?
      a[i] & t && (a[i] |= t), r &= ~l;
    }
  }
  function gS(e, t) {
    var n = wi(t), a;
    switch (n) {
      case pr:
        a = hl;
        break;
      case $a:
        a = Ti;
        break;
      case _o:
      case ed:
      case td:
      case nd:
      case ad:
      case rd:
      case id:
      case ld:
      case od:
      case ud:
      case sd:
      case cd:
      case fd:
      case dd:
      case pd:
      case md:
      case gl:
      case vd:
      case hd:
      case yd:
      case gd:
        a = wo;
        break;
      case ji:
        a = Lo;
        break;
      default:
        a = Gt;
        break;
    }
    return (a & (e.suspendedLanes | t)) !== Gt ? Gt : a;
  }
  function Mh(e, t, n) {
    if (Ea)
      for (var a = e.pendingUpdatersLaneMap; n > 0; ) {
        var r = Ed(n), i = 1 << r, l = a[r];
        l.add(t), n &= ~i;
      }
  }
  function Ah(e, t) {
    if (Ea)
      for (var n = e.pendingUpdatersLaneMap, a = e.memoizedUpdaters; t > 0; ) {
        var r = Ed(t), i = 1 << r, l = n[r];
        l.size > 0 && (l.forEach(function(o) {
          var u = o.alternate;
          (u === null || !a.has(u)) && a.add(o);
        }), l.clear()), t &= ~i;
      }
  }
  function kh(e, t) {
    return null;
  }
  var qn = Te, mr = pr, vr = $a, Ts = ji, ko = Gt;
  function xa() {
    return ko;
  }
  function Wt(e) {
    ko = e;
  }
  function bS(e, t) {
    var n = ko;
    try {
      return ko = e, t();
    } finally {
      ko = n;
    }
  }
  function NS(e, t) {
    return e !== 0 && e < t ? e : t;
  }
  function ES(e, t) {
    return e > t ? e : t;
  }
  function Rd(e, t) {
    return e !== 0 && e < t;
  }
  function Uh(e) {
    var t = wi(e);
    return Rd(qn, t) ? Rd(mr, t) ? Nd(t) ? vr : Ts : mr : qn;
  }
  function js(e) {
    var t = e.current.memoizedState;
    return t.isDehydrated;
  }
  var Fh;
  function xS(e) {
    Fh = e;
  }
  function SS(e) {
    Fh(e);
  }
  var Cd;
  function RS(e) {
    Cd = e;
  }
  var zh;
  function CS(e) {
    zh = e;
  }
  var Hh;
  function DS(e) {
    Hh = e;
  }
  var Bh;
  function TS(e) {
    Bh = e;
  }
  var Dd = !1, ws = [], Ur = null, Fr = null, zr = null, Uo = /* @__PURE__ */ new Map(), Fo = /* @__PURE__ */ new Map(), Hr = [], jS = [
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
  function wS(e) {
    return jS.indexOf(e) > -1;
  }
  function _S(e, t, n, a, r) {
    return {
      blockedOn: e,
      domEventName: t,
      eventSystemFlags: n,
      nativeEvent: r,
      targetContainers: [a]
    };
  }
  function Ph(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        Ur = null;
        break;
      case "dragenter":
      case "dragleave":
        Fr = null;
        break;
      case "mouseover":
      case "mouseout":
        zr = null;
        break;
      case "pointerover":
      case "pointerout": {
        var n = t.pointerId;
        Uo.delete(n);
        break;
      }
      case "gotpointercapture":
      case "lostpointercapture": {
        var a = t.pointerId;
        Fo.delete(a);
        break;
      }
    }
  }
  function zo(e, t, n, a, r, i) {
    if (e === null || e.nativeEvent !== i) {
      var l = _S(t, n, a, r, i);
      if (t !== null) {
        var o = $r(t);
        o !== null && Cd(o);
      }
      return l;
    }
    e.eventSystemFlags |= a;
    var u = e.targetContainers;
    return r !== null && u.indexOf(r) === -1 && u.push(r), e;
  }
  function OS(e, t, n, a, r) {
    switch (t) {
      case "focusin": {
        var i = r;
        return Ur = zo(Ur, e, t, n, a, i), !0;
      }
      case "dragenter": {
        var l = r;
        return Fr = zo(Fr, e, t, n, a, l), !0;
      }
      case "mouseover": {
        var o = r;
        return zr = zo(zr, e, t, n, a, o), !0;
      }
      case "pointerover": {
        var u = r, p = u.pointerId;
        return Uo.set(p, zo(Uo.get(p) || null, e, t, n, a, u)), !0;
      }
      case "gotpointercapture": {
        var v = r, x = v.pointerId;
        return Fo.set(x, zo(Fo.get(x) || null, e, t, n, a, v)), !0;
      }
    }
    return !1;
  }
  function $h(e) {
    var t = Vi(e.target);
    if (t !== null) {
      var n = Ci(t);
      if (n !== null) {
        var a = n.tag;
        if (a === X) {
          var r = ph(n);
          if (r !== null) {
            e.blockedOn = r, Bh(e.priority, function() {
              zh(n);
            });
            return;
          }
        } else if (a === S) {
          var i = n.stateNode;
          if (js(i)) {
            e.blockedOn = mh(n);
            return;
          }
        }
      }
    }
    e.blockedOn = null;
  }
  function LS(e) {
    for (var t = Hh(), n = {
      blockedOn: null,
      target: e,
      priority: t
    }, a = 0; a < Hr.length && Rd(t, Hr[a].priority); a++)
      ;
    Hr.splice(a, 0, n), a === 0 && $h(n);
  }
  function _s(e) {
    if (e.blockedOn !== null)
      return !1;
    for (var t = e.targetContainers; t.length > 0; ) {
      var n = t[0], a = wd(e.domEventName, e.eventSystemFlags, n, e.nativeEvent);
      if (a === null) {
        var r = e.nativeEvent, i = new r.constructor(r.type, r);
        ix(i), r.target.dispatchEvent(i), lx();
      } else {
        var l = $r(a);
        return l !== null && Cd(l), e.blockedOn = a, !1;
      }
      t.shift();
    }
    return !0;
  }
  function Yh(e, t, n) {
    _s(e) && n.delete(t);
  }
  function VS() {
    Dd = !1, Ur !== null && _s(Ur) && (Ur = null), Fr !== null && _s(Fr) && (Fr = null), zr !== null && _s(zr) && (zr = null), Uo.forEach(Yh), Fo.forEach(Yh);
  }
  function Ho(e, t) {
    e.blockedOn === t && (e.blockedOn = null, Dd || (Dd = !0, m.unstable_scheduleCallback(m.unstable_NormalPriority, VS)));
  }
  function Bo(e) {
    if (ws.length > 0) {
      Ho(ws[0], e);
      for (var t = 1; t < ws.length; t++) {
        var n = ws[t];
        n.blockedOn === e && (n.blockedOn = null);
      }
    }
    Ur !== null && Ho(Ur, e), Fr !== null && Ho(Fr, e), zr !== null && Ho(zr, e);
    var a = function(o) {
      return Ho(o, e);
    };
    Uo.forEach(a), Fo.forEach(a);
    for (var r = 0; r < Hr.length; r++) {
      var i = Hr[r];
      i.blockedOn === e && (i.blockedOn = null);
    }
    for (; Hr.length > 0; ) {
      var l = Hr[0];
      if (l.blockedOn !== null)
        break;
      $h(l), l.blockedOn === null && Hr.shift();
    }
  }
  var Nl = h.ReactCurrentBatchConfig, Td = !0;
  function Ih(e) {
    Td = !!e;
  }
  function MS() {
    return Td;
  }
  function AS(e, t, n) {
    var a = qh(t), r;
    switch (a) {
      case qn:
        r = kS;
        break;
      case mr:
        r = US;
        break;
      case vr:
      default:
        r = jd;
        break;
    }
    return r.bind(null, t, n, e);
  }
  function kS(e, t, n, a) {
    var r = xa(), i = Nl.transition;
    Nl.transition = null;
    try {
      Wt(qn), jd(e, t, n, a);
    } finally {
      Wt(r), Nl.transition = i;
    }
  }
  function US(e, t, n, a) {
    var r = xa(), i = Nl.transition;
    Nl.transition = null;
    try {
      Wt(mr), jd(e, t, n, a);
    } finally {
      Wt(r), Nl.transition = i;
    }
  }
  function jd(e, t, n, a) {
    Td && FS(e, t, n, a);
  }
  function FS(e, t, n, a) {
    var r = wd(e, t, n, a);
    if (r === null) {
      $d(e, t, a, Os, n), Ph(e, a);
      return;
    }
    if (OS(r, e, t, n, a)) {
      a.stopPropagation();
      return;
    }
    if (Ph(e, a), t & xo && wS(e)) {
      for (; r !== null; ) {
        var i = $r(r);
        i !== null && SS(i);
        var l = wd(e, t, n, a);
        if (l === null && $d(e, t, a, Os, n), l === r)
          break;
        r = l;
      }
      r !== null && a.stopPropagation();
      return;
    }
    $d(e, t, a, null, n);
  }
  var Os = null;
  function wd(e, t, n, a) {
    Os = null;
    var r = Af(a), i = Vi(r);
    if (i !== null) {
      var l = Ci(i);
      if (l === null)
        i = null;
      else {
        var o = l.tag;
        if (o === X) {
          var u = ph(l);
          if (u !== null)
            return u;
          i = null;
        } else if (o === S) {
          var p = l.stateNode;
          if (js(p))
            return mh(l);
          i = null;
        } else l !== i && (i = null);
      }
    }
    return Os = i, null;
  }
  function qh(e) {
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
        return qn;
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
        return mr;
      case "message": {
        var t = wx();
        switch (t) {
          case Ns:
            return qn;
          case Kf:
            return mr;
          case Di:
          case _x:
            return vr;
          case Xf:
            return Ts;
          default:
            return vr;
        }
      }
      default:
        return vr;
    }
  }
  function zS(e, t, n) {
    return e.addEventListener(t, n, !1), n;
  }
  function HS(e, t, n) {
    return e.addEventListener(t, n, !0), n;
  }
  function BS(e, t, n, a) {
    return e.addEventListener(t, n, {
      capture: !0,
      passive: a
    }), n;
  }
  function PS(e, t, n, a) {
    return e.addEventListener(t, n, {
      passive: a
    }), n;
  }
  var Po = null, _d = null, $o = null;
  function $S(e) {
    return Po = e, _d = Wh(), !0;
  }
  function YS() {
    Po = null, _d = null, $o = null;
  }
  function Gh() {
    if ($o)
      return $o;
    var e, t = _d, n = t.length, a, r = Wh(), i = r.length;
    for (e = 0; e < n && t[e] === r[e]; e++)
      ;
    var l = n - e;
    for (a = 1; a <= l && t[n - a] === r[i - a]; a++)
      ;
    var o = a > 1 ? 1 - a : void 0;
    return $o = r.slice(e, o), $o;
  }
  function Wh() {
    return "value" in Po ? Po.value : Po.textContent;
  }
  function Ls(e) {
    var t, n = e.keyCode;
    return "charCode" in e ? (t = e.charCode, t === 0 && n === 13 && (t = 13)) : t = n, t === 10 && (t = 13), t >= 32 || t === 13 ? t : 0;
  }
  function Vs() {
    return !0;
  }
  function Qh() {
    return !1;
  }
  function Gn(e) {
    function t(n, a, r, i, l) {
      this._reactName = n, this._targetInst = r, this.type = a, this.nativeEvent = i, this.target = l, this.currentTarget = null;
      for (var o in e)
        if (e.hasOwnProperty(o)) {
          var u = e[o];
          u ? this[o] = u(i) : this[o] = i[o];
        }
      var p = i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1;
      return p ? this.isDefaultPrevented = Vs : this.isDefaultPrevented = Qh, this.isPropagationStopped = Qh, this;
    }
    return Ue(t.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = Vs);
      },
      stopPropagation: function() {
        var n = this.nativeEvent;
        n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = Vs);
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
      isPersistent: Vs
    }), t;
  }
  var El = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, Od = Gn(El), Yo = Ue({}, El, {
    view: 0,
    detail: 0
  }), IS = Gn(Yo), Ld, Vd, Io;
  function qS(e) {
    e !== Io && (Io && e.type === "mousemove" ? (Ld = e.screenX - Io.screenX, Vd = e.screenY - Io.screenY) : (Ld = 0, Vd = 0), Io = e);
  }
  var Ms = Ue({}, Yo, {
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
    getModifierState: Ad,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (qS(e), Ld);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : Vd;
    }
  }), Kh = Gn(Ms), GS = Ue({}, Ms, {
    dataTransfer: 0
  }), WS = Gn(GS), QS = Ue({}, Yo, {
    relatedTarget: 0
  }), Md = Gn(QS), KS = Ue({}, El, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), XS = Gn(KS), JS = Ue({}, El, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), ZS = Gn(JS), eR = Ue({}, El, {
    data: 0
  }), Xh = Gn(eR), tR = Xh, nR = {
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
  }, aR = {
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
  function rR(e) {
    if (e.key) {
      var t = nR[e.key] || e.key;
      if (t !== "Unidentified")
        return t;
    }
    if (e.type === "keypress") {
      var n = Ls(e);
      return n === 13 ? "Enter" : String.fromCharCode(n);
    }
    return e.type === "keydown" || e.type === "keyup" ? aR[e.keyCode] || "Unidentified" : "";
  }
  var iR = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function lR(e) {
    var t = this, n = t.nativeEvent;
    if (n.getModifierState)
      return n.getModifierState(e);
    var a = iR[e];
    return a ? !!n[a] : !1;
  }
  function Ad(e) {
    return lR;
  }
  var oR = Ue({}, Yo, {
    key: rR,
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Ad,
    // Legacy Interface
    charCode: function(e) {
      return e.type === "keypress" ? Ls(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? Ls(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), uR = Gn(oR), sR = Ue({}, Ms, {
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
  }), Jh = Gn(sR), cR = Ue({}, Yo, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Ad
  }), fR = Gn(cR), dR = Ue({}, El, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), pR = Gn(dR), mR = Ue({}, Ms, {
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
  }), vR = Gn(mR), hR = [9, 13, 27, 32], Zh = 229, kd = Jt && "CompositionEvent" in window, qo = null;
  Jt && "documentMode" in document && (qo = document.documentMode);
  var yR = Jt && "TextEvent" in window && !qo, ey = Jt && (!kd || qo && qo > 8 && qo <= 11), ty = 32, ny = String.fromCharCode(ty);
  function gR() {
    Kt("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), Kt("onCompositionEnd", ["compositionend", "focusout", "keydown", "keypress", "keyup", "mousedown"]), Kt("onCompositionStart", ["compositionstart", "focusout", "keydown", "keypress", "keyup", "mousedown"]), Kt("onCompositionUpdate", ["compositionupdate", "focusout", "keydown", "keypress", "keyup", "mousedown"]);
  }
  var ay = !1;
  function bR(e) {
    return (e.ctrlKey || e.altKey || e.metaKey) && // ctrlKey && altKey is equivalent to AltGr, and is not a command.
    !(e.ctrlKey && e.altKey);
  }
  function NR(e) {
    switch (e) {
      case "compositionstart":
        return "onCompositionStart";
      case "compositionend":
        return "onCompositionEnd";
      case "compositionupdate":
        return "onCompositionUpdate";
    }
  }
  function ER(e, t) {
    return e === "keydown" && t.keyCode === Zh;
  }
  function ry(e, t) {
    switch (e) {
      case "keyup":
        return hR.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== Zh;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function iy(e) {
    var t = e.detail;
    return typeof t == "object" && "data" in t ? t.data : null;
  }
  function ly(e) {
    return e.locale === "ko";
  }
  var xl = !1;
  function xR(e, t, n, a, r) {
    var i, l;
    if (kd ? i = NR(t) : xl ? ry(t, a) && (i = "onCompositionEnd") : ER(t, a) && (i = "onCompositionStart"), !i)
      return null;
    ey && !ly(a) && (!xl && i === "onCompositionStart" ? xl = $S(r) : i === "onCompositionEnd" && xl && (l = Gh()));
    var o = zs(n, i);
    if (o.length > 0) {
      var u = new Xh(i, t, null, a, r);
      if (e.push({
        event: u,
        listeners: o
      }), l)
        u.data = l;
      else {
        var p = iy(a);
        p !== null && (u.data = p);
      }
    }
  }
  function SR(e, t) {
    switch (e) {
      case "compositionend":
        return iy(t);
      case "keypress":
        var n = t.which;
        return n !== ty ? null : (ay = !0, ny);
      case "textInput":
        var a = t.data;
        return a === ny && ay ? null : a;
      default:
        return null;
    }
  }
  function RR(e, t) {
    if (xl) {
      if (e === "compositionend" || !kd && ry(e, t)) {
        var n = Gh();
        return YS(), xl = !1, n;
      }
      return null;
    }
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!bR(t)) {
          if (t.char && t.char.length > 1)
            return t.char;
          if (t.which)
            return String.fromCharCode(t.which);
        }
        return null;
      case "compositionend":
        return ey && !ly(t) ? null : t.data;
      default:
        return null;
    }
  }
  function CR(e, t, n, a, r) {
    var i;
    if (yR ? i = SR(t, a) : i = RR(t, a), !i)
      return null;
    var l = zs(n, "onBeforeInput");
    if (l.length > 0) {
      var o = new tR("onBeforeInput", "beforeinput", null, a, r);
      e.push({
        event: o,
        listeners: l
      }), o.data = i;
    }
  }
  function DR(e, t, n, a, r, i, l) {
    xR(e, t, n, a, r), CR(e, t, n, a, r);
  }
  var TR = {
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
  function oy(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!TR[e.type] : t === "textarea";
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
  function jR(e) {
    if (!Jt)
      return !1;
    var t = "on" + e, n = t in document;
    if (!n) {
      var a = document.createElement("div");
      a.setAttribute(t, "return;"), n = typeof a[t] == "function";
    }
    return n;
  }
  function wR() {
    Kt("onChange", ["change", "click", "focusin", "focusout", "input", "keydown", "keyup", "selectionchange"]);
  }
  function uy(e, t, n, a) {
    rh(a);
    var r = zs(t, "onChange");
    if (r.length > 0) {
      var i = new Od("onChange", "change", null, n, a);
      e.push({
        event: i,
        listeners: r
      });
    }
  }
  var Go = null, Wo = null;
  function _R(e) {
    var t = e.nodeName && e.nodeName.toLowerCase();
    return t === "select" || t === "input" && e.type === "file";
  }
  function OR(e) {
    var t = [];
    uy(t, Wo, e, Af(e)), uh(LR, t);
  }
  function LR(e) {
    Dy(e, 0);
  }
  function As(e) {
    var t = jl(e);
    if (ho(t))
      return e;
  }
  function VR(e, t) {
    if (e === "change")
      return t;
  }
  var sy = !1;
  Jt && (sy = jR("input") && (!document.documentMode || document.documentMode > 9));
  function MR(e, t) {
    Go = e, Wo = t, Go.attachEvent("onpropertychange", fy);
  }
  function cy() {
    Go && (Go.detachEvent("onpropertychange", fy), Go = null, Wo = null);
  }
  function fy(e) {
    e.propertyName === "value" && As(Wo) && OR(e);
  }
  function AR(e, t, n) {
    e === "focusin" ? (cy(), MR(t, n)) : e === "focusout" && cy();
  }
  function kR(e, t) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return As(Wo);
  }
  function UR(e) {
    var t = e.nodeName;
    return t && t.toLowerCase() === "input" && (e.type === "checkbox" || e.type === "radio");
  }
  function FR(e, t) {
    if (e === "click")
      return As(t);
  }
  function zR(e, t) {
    if (e === "input" || e === "change")
      return As(t);
  }
  function HR(e) {
    var t = e._wrapperState;
    !t || !t.controlled || e.type !== "number" || Ne(e, "number", e.value);
  }
  function BR(e, t, n, a, r, i, l) {
    var o = n ? jl(n) : window, u, p;
    if (_R(o) ? u = VR : oy(o) ? sy ? u = zR : (u = kR, p = AR) : UR(o) && (u = FR), u) {
      var v = u(t, n);
      if (v) {
        uy(e, v, a, r);
        return;
      }
    }
    p && p(t, o, n), t === "focusout" && HR(o);
  }
  function PR() {
    Xt("onMouseEnter", ["mouseout", "mouseover"]), Xt("onMouseLeave", ["mouseout", "mouseover"]), Xt("onPointerEnter", ["pointerout", "pointerover"]), Xt("onPointerLeave", ["pointerout", "pointerover"]);
  }
  function $R(e, t, n, a, r, i, l) {
    var o = t === "mouseover" || t === "pointerover", u = t === "mouseout" || t === "pointerout";
    if (o && !ox(a)) {
      var p = a.relatedTarget || a.fromElement;
      if (p && (Vi(p) || su(p)))
        return;
    }
    if (!(!u && !o)) {
      var v;
      if (r.window === r)
        v = r;
      else {
        var x = r.ownerDocument;
        x ? v = x.defaultView || x.parentWindow : v = window;
      }
      var E, O;
      if (u) {
        var V = a.relatedTarget || a.toElement;
        if (E = n, O = V ? Vi(V) : null, O !== null) {
          var U = Ci(O);
          (O !== U || O.tag !== z && O.tag !== W) && (O = null);
        }
      } else
        E = null, O = n;
      if (E !== O) {
        var ae = Kh, he = "onMouseLeave", pe = "onMouseEnter", Ye = "mouse";
        (t === "pointerout" || t === "pointerover") && (ae = Jh, he = "onPointerLeave", pe = "onPointerEnter", Ye = "pointer");
        var ze = E == null ? v : jl(E), j = O == null ? v : jl(O), F = new ae(he, Ye + "leave", E, a, r);
        F.target = ze, F.relatedTarget = j;
        var w = null, q = Vi(r);
        if (q === n) {
          var oe = new ae(pe, Ye + "enter", O, a, r);
          oe.target = j, oe.relatedTarget = ze, w = oe;
        }
        pC(e, F, w, E, O);
      }
    }
  }
  function YR(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var Wn = typeof Object.is == "function" ? Object.is : YR;
  function Qo(e, t) {
    if (Wn(e, t))
      return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
      return !1;
    var n = Object.keys(e), a = Object.keys(t);
    if (n.length !== a.length)
      return !1;
    for (var r = 0; r < n.length; r++) {
      var i = n[r];
      if (!Ln.call(t, i) || !Wn(e[i], t[i]))
        return !1;
    }
    return !0;
  }
  function dy(e) {
    for (; e && e.firstChild; )
      e = e.firstChild;
    return e;
  }
  function IR(e) {
    for (; e; ) {
      if (e.nextSibling)
        return e.nextSibling;
      e = e.parentNode;
    }
  }
  function py(e, t) {
    for (var n = dy(e), a = 0, r = 0; n; ) {
      if (n.nodeType === ur) {
        if (r = a + n.textContent.length, a <= t && r >= t)
          return {
            node: n,
            offset: t - a
          };
        a = r;
      }
      n = dy(IR(n));
    }
  }
  function qR(e) {
    var t = e.ownerDocument, n = t && t.defaultView || window, a = n.getSelection && n.getSelection();
    if (!a || a.rangeCount === 0)
      return null;
    var r = a.anchorNode, i = a.anchorOffset, l = a.focusNode, o = a.focusOffset;
    try {
      r.nodeType, l.nodeType;
    } catch {
      return null;
    }
    return GR(e, r, i, l, o);
  }
  function GR(e, t, n, a, r) {
    var i = 0, l = -1, o = -1, u = 0, p = 0, v = e, x = null;
    e: for (; ; ) {
      for (var E = null; v === t && (n === 0 || v.nodeType === ur) && (l = i + n), v === a && (r === 0 || v.nodeType === ur) && (o = i + r), v.nodeType === ur && (i += v.nodeValue.length), (E = v.firstChild) !== null; )
        x = v, v = E;
      for (; ; ) {
        if (v === e)
          break e;
        if (x === t && ++u === n && (l = i), x === a && ++p === r && (o = i), (E = v.nextSibling) !== null)
          break;
        v = x, x = v.parentNode;
      }
      v = E;
    }
    return l === -1 || o === -1 ? null : {
      start: l,
      end: o
    };
  }
  function WR(e, t) {
    var n = e.ownerDocument || document, a = n && n.defaultView || window;
    if (a.getSelection) {
      var r = a.getSelection(), i = e.textContent.length, l = Math.min(t.start, i), o = t.end === void 0 ? l : Math.min(t.end, i);
      if (!r.extend && l > o) {
        var u = o;
        o = l, l = u;
      }
      var p = py(e, l), v = py(e, o);
      if (p && v) {
        if (r.rangeCount === 1 && r.anchorNode === p.node && r.anchorOffset === p.offset && r.focusNode === v.node && r.focusOffset === v.offset)
          return;
        var x = n.createRange();
        x.setStart(p.node, p.offset), r.removeAllRanges(), l > o ? (r.addRange(x), r.extend(v.node, v.offset)) : (x.setEnd(v.node, v.offset), r.addRange(x));
      }
    }
  }
  function my(e) {
    return e && e.nodeType === ur;
  }
  function vy(e, t) {
    return !e || !t ? !1 : e === t ? !0 : my(e) ? !1 : my(t) ? vy(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1;
  }
  function QR(e) {
    return e && e.ownerDocument && vy(e.ownerDocument.documentElement, e);
  }
  function KR(e) {
    try {
      return typeof e.contentWindow.location.href == "string";
    } catch {
      return !1;
    }
  }
  function hy() {
    for (var e = window, t = ir(); t instanceof e.HTMLIFrameElement; ) {
      if (KR(t))
        e = t.contentWindow;
      else
        return t;
      t = ir(e.document);
    }
    return t;
  }
  function Ud(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  function XR() {
    var e = hy();
    return {
      focusedElem: e,
      selectionRange: Ud(e) ? ZR(e) : null
    };
  }
  function JR(e) {
    var t = hy(), n = e.focusedElem, a = e.selectionRange;
    if (t !== n && QR(n)) {
      a !== null && Ud(n) && eC(n, a);
      for (var r = [], i = n; i = i.parentNode; )
        i.nodeType === An && r.push({
          element: i,
          left: i.scrollLeft,
          top: i.scrollTop
        });
      typeof n.focus == "function" && n.focus();
      for (var l = 0; l < r.length; l++) {
        var o = r[l];
        o.element.scrollLeft = o.left, o.element.scrollTop = o.top;
      }
    }
  }
  function ZR(e) {
    var t;
    return "selectionStart" in e ? t = {
      start: e.selectionStart,
      end: e.selectionEnd
    } : t = qR(e), t || {
      start: 0,
      end: 0
    };
  }
  function eC(e, t) {
    var n = t.start, a = t.end;
    a === void 0 && (a = n), "selectionStart" in e ? (e.selectionStart = n, e.selectionEnd = Math.min(a, e.value.length)) : WR(e, t);
  }
  var tC = Jt && "documentMode" in document && document.documentMode <= 11;
  function nC() {
    Kt("onSelect", ["focusout", "contextmenu", "dragend", "focusin", "keydown", "keyup", "mousedown", "mouseup", "selectionchange"]);
  }
  var Sl = null, Fd = null, Ko = null, zd = !1;
  function aC(e) {
    if ("selectionStart" in e && Ud(e))
      return {
        start: e.selectionStart,
        end: e.selectionEnd
      };
    var t = e.ownerDocument && e.ownerDocument.defaultView || window, n = t.getSelection();
    return {
      anchorNode: n.anchorNode,
      anchorOffset: n.anchorOffset,
      focusNode: n.focusNode,
      focusOffset: n.focusOffset
    };
  }
  function rC(e) {
    return e.window === e ? e.document : e.nodeType === sr ? e : e.ownerDocument;
  }
  function yy(e, t, n) {
    var a = rC(n);
    if (!(zd || Sl == null || Sl !== ir(a))) {
      var r = aC(Sl);
      if (!Ko || !Qo(Ko, r)) {
        Ko = r;
        var i = zs(Fd, "onSelect");
        if (i.length > 0) {
          var l = new Od("onSelect", "select", null, t, n);
          e.push({
            event: l,
            listeners: i
          }), l.target = Sl;
        }
      }
    }
  }
  function iC(e, t, n, a, r, i, l) {
    var o = n ? jl(n) : window;
    switch (t) {
      case "focusin":
        (oy(o) || o.contentEditable === "true") && (Sl = o, Fd = n, Ko = null);
        break;
      case "focusout":
        Sl = null, Fd = null, Ko = null;
        break;
      case "mousedown":
        zd = !0;
        break;
      case "contextmenu":
      case "mouseup":
      case "dragend":
        zd = !1, yy(e, a, r);
        break;
      case "selectionchange":
        if (tC)
          break;
      case "keydown":
      case "keyup":
        yy(e, a, r);
    }
  }
  function ks(e, t) {
    var n = {};
    return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
  }
  var Rl = {
    animationend: ks("Animation", "AnimationEnd"),
    animationiteration: ks("Animation", "AnimationIteration"),
    animationstart: ks("Animation", "AnimationStart"),
    transitionend: ks("Transition", "TransitionEnd")
  }, Hd = {}, gy = {};
  Jt && (gy = document.createElement("div").style, "AnimationEvent" in window || (delete Rl.animationend.animation, delete Rl.animationiteration.animation, delete Rl.animationstart.animation), "TransitionEvent" in window || delete Rl.transitionend.transition);
  function Us(e) {
    if (Hd[e])
      return Hd[e];
    if (!Rl[e])
      return e;
    var t = Rl[e];
    for (var n in t)
      if (t.hasOwnProperty(n) && n in gy)
        return Hd[e] = t[n];
    return e;
  }
  var by = Us("animationend"), Ny = Us("animationiteration"), Ey = Us("animationstart"), xy = Us("transitionend"), Sy = /* @__PURE__ */ new Map(), Ry = ["abort", "auxClick", "cancel", "canPlay", "canPlayThrough", "click", "close", "contextMenu", "copy", "cut", "drag", "dragEnd", "dragEnter", "dragExit", "dragLeave", "dragOver", "dragStart", "drop", "durationChange", "emptied", "encrypted", "ended", "error", "gotPointerCapture", "input", "invalid", "keyDown", "keyPress", "keyUp", "load", "loadedData", "loadedMetadata", "loadStart", "lostPointerCapture", "mouseDown", "mouseMove", "mouseOut", "mouseOver", "mouseUp", "paste", "pause", "play", "playing", "pointerCancel", "pointerDown", "pointerMove", "pointerOut", "pointerOver", "pointerUp", "progress", "rateChange", "reset", "resize", "seeked", "seeking", "stalled", "submit", "suspend", "timeUpdate", "touchCancel", "touchEnd", "touchStart", "volumeChange", "scroll", "toggle", "touchMove", "waiting", "wheel"];
  function Br(e, t) {
    Sy.set(e, t), Kt(t, [e]);
  }
  function lC() {
    for (var e = 0; e < Ry.length; e++) {
      var t = Ry[e], n = t.toLowerCase(), a = t[0].toUpperCase() + t.slice(1);
      Br(n, "on" + a);
    }
    Br(by, "onAnimationEnd"), Br(Ny, "onAnimationIteration"), Br(Ey, "onAnimationStart"), Br("dblclick", "onDoubleClick"), Br("focusin", "onFocus"), Br("focusout", "onBlur"), Br(xy, "onTransitionEnd");
  }
  function oC(e, t, n, a, r, i, l) {
    var o = Sy.get(t);
    if (o !== void 0) {
      var u = Od, p = t;
      switch (t) {
        case "keypress":
          if (Ls(a) === 0)
            return;
        case "keydown":
        case "keyup":
          u = uR;
          break;
        case "focusin":
          p = "focus", u = Md;
          break;
        case "focusout":
          p = "blur", u = Md;
          break;
        case "beforeblur":
        case "afterblur":
          u = Md;
          break;
        case "click":
          if (a.button === 2)
            return;
        case "auxclick":
        case "dblclick":
        case "mousedown":
        case "mousemove":
        case "mouseup":
        case "mouseout":
        case "mouseover":
        case "contextmenu":
          u = Kh;
          break;
        case "drag":
        case "dragend":
        case "dragenter":
        case "dragexit":
        case "dragleave":
        case "dragover":
        case "dragstart":
        case "drop":
          u = WS;
          break;
        case "touchcancel":
        case "touchend":
        case "touchmove":
        case "touchstart":
          u = fR;
          break;
        case by:
        case Ny:
        case Ey:
          u = XS;
          break;
        case xy:
          u = pR;
          break;
        case "scroll":
          u = IS;
          break;
        case "wheel":
          u = vR;
          break;
        case "copy":
        case "cut":
        case "paste":
          u = ZS;
          break;
        case "gotpointercapture":
        case "lostpointercapture":
        case "pointercancel":
        case "pointerdown":
        case "pointermove":
        case "pointerout":
        case "pointerover":
        case "pointerup":
          u = Jh;
          break;
      }
      var v = (i & xo) !== 0;
      {
        var x = !v && // TODO: ideally, we'd eventually add all events from
        // nonDelegatedEvents list in DOMPluginEventSystem.
        // Then we can remove this special list.
        // This is a breaking change that can wait until React 18.
        t === "scroll", E = fC(n, o, a.type, v, x);
        if (E.length > 0) {
          var O = new u(o, p, null, a, r);
          e.push({
            event: O,
            listeners: E
          });
        }
      }
    }
  }
  lC(), PR(), wR(), nC(), gR();
  function uC(e, t, n, a, r, i, l) {
    oC(e, t, n, a, r, i);
    var o = (i & rx) === 0;
    o && ($R(e, t, n, a, r), BR(e, t, n, a, r), iC(e, t, n, a, r), DR(e, t, n, a, r));
  }
  var Xo = ["abort", "canplay", "canplaythrough", "durationchange", "emptied", "encrypted", "ended", "error", "loadeddata", "loadedmetadata", "loadstart", "pause", "play", "playing", "progress", "ratechange", "resize", "seeked", "seeking", "stalled", "suspend", "timeupdate", "volumechange", "waiting"], Bd = new Set(["cancel", "close", "invalid", "load", "scroll", "toggle"].concat(Xo));
  function Cy(e, t, n) {
    var a = e.type || "unknown-event";
    e.currentTarget = n, hx(a, t, void 0, e), e.currentTarget = null;
  }
  function sC(e, t, n) {
    var a;
    if (n)
      for (var r = t.length - 1; r >= 0; r--) {
        var i = t[r], l = i.instance, o = i.currentTarget, u = i.listener;
        if (l !== a && e.isPropagationStopped())
          return;
        Cy(e, u, o), a = l;
      }
    else
      for (var p = 0; p < t.length; p++) {
        var v = t[p], x = v.instance, E = v.currentTarget, O = v.listener;
        if (x !== a && e.isPropagationStopped())
          return;
        Cy(e, O, E), a = x;
      }
  }
  function Dy(e, t) {
    for (var n = (t & xo) !== 0, a = 0; a < e.length; a++) {
      var r = e[a], i = r.event, l = r.listeners;
      sC(i, l, n);
    }
    yx();
  }
  function cC(e, t, n, a, r) {
    var i = Af(n), l = [];
    uC(l, e, a, n, i, t), Dy(l, t);
  }
  function dt(e, t) {
    Bd.has(e) || f('Did not expect a listenToNonDelegatedEvent() call for "%s". This is a bug in React. Please file an issue.', e);
    var n = !1, a = H0(t), r = mC(e);
    a.has(r) || (Ty(t, e, Mf, n), a.add(r));
  }
  function Pd(e, t, n) {
    Bd.has(e) && !t && f('Did not expect a listenToNativeEvent() call for "%s" in the bubble phase. This is a bug in React. Please file an issue.', e);
    var a = 0;
    t && (a |= xo), Ty(n, e, a, t);
  }
  var Fs = "_reactListening" + Math.random().toString(36).slice(2);
  function Jo(e) {
    if (!e[Fs]) {
      e[Fs] = !0, ka.forEach(function(n) {
        n !== "selectionchange" && (Bd.has(n) || Pd(n, !1, e), Pd(n, !0, e));
      });
      var t = e.nodeType === sr ? e : e.ownerDocument;
      t !== null && (t[Fs] || (t[Fs] = !0, Pd("selectionchange", !1, t)));
    }
  }
  function Ty(e, t, n, a, r) {
    var i = AS(e, t, n), l = void 0;
    Ff && (t === "touchstart" || t === "touchmove" || t === "wheel") && (l = !0), e = e, a ? l !== void 0 ? BS(e, t, i, l) : HS(e, t, i) : l !== void 0 ? PS(e, t, i, l) : zS(e, t, i);
  }
  function jy(e, t) {
    return e === t || e.nodeType === Ct && e.parentNode === t;
  }
  function $d(e, t, n, a, r) {
    var i = a;
    if (!(t & nh) && !(t & Mf)) {
      var l = r;
      if (a !== null) {
        var o = a;
        e: for (; ; ) {
          if (o === null)
            return;
          var u = o.tag;
          if (u === S || u === M) {
            var p = o.stateNode.containerInfo;
            if (jy(p, l))
              break;
            if (u === M)
              for (var v = o.return; v !== null; ) {
                var x = v.tag;
                if (x === S || x === M) {
                  var E = v.stateNode.containerInfo;
                  if (jy(E, l))
                    return;
                }
                v = v.return;
              }
            for (; p !== null; ) {
              var O = Vi(p);
              if (O === null)
                return;
              var V = O.tag;
              if (V === z || V === W) {
                o = i = O;
                continue e;
              }
              p = p.parentNode;
            }
          }
          o = o.return;
        }
      }
    }
    uh(function() {
      return cC(e, t, n, i);
    });
  }
  function Zo(e, t, n) {
    return {
      instance: e,
      listener: t,
      currentTarget: n
    };
  }
  function fC(e, t, n, a, r, i) {
    for (var l = t !== null ? t + "Capture" : null, o = a ? l : t, u = [], p = e, v = null; p !== null; ) {
      var x = p, E = x.stateNode, O = x.tag;
      if (O === z && E !== null && (v = E, o !== null)) {
        var V = Ro(p, o);
        V != null && u.push(Zo(p, V, v));
      }
      if (r)
        break;
      p = p.return;
    }
    return u;
  }
  function zs(e, t) {
    for (var n = t + "Capture", a = [], r = e; r !== null; ) {
      var i = r, l = i.stateNode, o = i.tag;
      if (o === z && l !== null) {
        var u = l, p = Ro(r, n);
        p != null && a.unshift(Zo(r, p, u));
        var v = Ro(r, t);
        v != null && a.push(Zo(r, v, u));
      }
      r = r.return;
    }
    return a;
  }
  function Cl(e) {
    if (e === null)
      return null;
    do
      e = e.return;
    while (e && e.tag !== z);
    return e || null;
  }
  function dC(e, t) {
    for (var n = e, a = t, r = 0, i = n; i; i = Cl(i))
      r++;
    for (var l = 0, o = a; o; o = Cl(o))
      l++;
    for (; r - l > 0; )
      n = Cl(n), r--;
    for (; l - r > 0; )
      a = Cl(a), l--;
    for (var u = r; u--; ) {
      if (n === a || a !== null && n === a.alternate)
        return n;
      n = Cl(n), a = Cl(a);
    }
    return null;
  }
  function wy(e, t, n, a, r) {
    for (var i = t._reactName, l = [], o = n; o !== null && o !== a; ) {
      var u = o, p = u.alternate, v = u.stateNode, x = u.tag;
      if (p !== null && p === a)
        break;
      if (x === z && v !== null) {
        var E = v;
        if (r) {
          var O = Ro(o, i);
          O != null && l.unshift(Zo(o, O, E));
        } else if (!r) {
          var V = Ro(o, i);
          V != null && l.push(Zo(o, V, E));
        }
      }
      o = o.return;
    }
    l.length !== 0 && e.push({
      event: t,
      listeners: l
    });
  }
  function pC(e, t, n, a, r) {
    var i = a && r ? dC(a, r) : null;
    a !== null && wy(e, t, a, i, !1), r !== null && n !== null && wy(e, n, r, i, !0);
  }
  function mC(e, t) {
    return e + "__bubble";
  }
  var kn = !1, eu = "dangerouslySetInnerHTML", Hs = "suppressContentEditableWarning", Pr = "suppressHydrationWarning", _y = "autoFocus", Oi = "children", Li = "style", Bs = "__html", Yd, Ps, tu, Oy, $s, Ly, Vy;
  Yd = {
    // There are working polyfills for <dialog>. Let people use it.
    dialog: !0,
    // Electron ships a custom <webview> tag to display external web content in
    // an isolated frame and process.
    // This tag is not present in non Electron environments such as JSDom which
    // is often used for testing purposes.
    // @see https://electronjs.org/docs/api/webview-tag
    webview: !0
  }, Ps = function(e, t) {
    XE(e, t), JE(e, t), ax(e, t, {
      registrationNameDependencies: Qt,
      possibleRegistrationNames: Pn
    });
  }, Ly = Jt && !document.documentMode, tu = function(e, t, n) {
    if (!kn) {
      var a = Ys(n), r = Ys(t);
      r !== a && (kn = !0, f("Prop `%s` did not match. Server: %s Client: %s", e, JSON.stringify(r), JSON.stringify(a)));
    }
  }, Oy = function(e) {
    if (!kn) {
      kn = !0;
      var t = [];
      e.forEach(function(n) {
        t.push(n);
      }), f("Extra attributes from the server: %s", t);
    }
  }, $s = function(e, t) {
    t === !1 ? f("Expected `%s` listener to be a function, instead got `false`.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.", e, e, e) : f("Expected `%s` listener to be a function, instead got a value of `%s` type.", e, typeof t);
  }, Vy = function(e, t) {
    var n = e.namespaceURI === or ? e.ownerDocument.createElement(e.tagName) : e.ownerDocument.createElementNS(e.namespaceURI, e.tagName);
    return n.innerHTML = t, n.innerHTML;
  };
  var vC = /\r\n?/g, hC = /\u0000|\uFFFD/g;
  function Ys(e) {
    Vn(e);
    var t = typeof e == "string" ? e : "" + e;
    return t.replace(vC, `
`).replace(hC, "");
  }
  function Is(e, t, n, a) {
    var r = Ys(t), i = Ys(e);
    if (i !== r && (a && (kn || (kn = !0, f('Text content did not match. Server: "%s" Client: "%s"', i, r))), n && Ve))
      throw new Error("Text content does not match server-rendered HTML.");
  }
  function My(e) {
    return e.nodeType === sr ? e : e.ownerDocument;
  }
  function yC() {
  }
  function qs(e) {
    e.onclick = yC;
  }
  function gC(e, t, n, a, r) {
    for (var i in a)
      if (a.hasOwnProperty(i)) {
        var l = a[i];
        if (i === Li)
          l && Object.freeze(l), Kv(t, l);
        else if (i === eu) {
          var o = l ? l[Bs] : void 0;
          o != null && Iv(t, o);
        } else if (i === Oi)
          if (typeof l == "string") {
            var u = e !== "textarea" || l !== "";
            u && vs(t, l);
          } else typeof l == "number" && vs(t, "" + l);
        else i === Hs || i === Pr || i === _y || (Qt.hasOwnProperty(i) ? l != null && (typeof l != "function" && $s(i, l), i === "onScroll" && dt("scroll", t)) : l != null && ya(t, i, l, r));
      }
  }
  function bC(e, t, n, a) {
    for (var r = 0; r < t.length; r += 2) {
      var i = t[r], l = t[r + 1];
      i === Li ? Kv(e, l) : i === eu ? Iv(e, l) : i === Oi ? vs(e, l) : ya(e, i, l, a);
    }
  }
  function NC(e, t, n, a) {
    var r, i = My(n), l, o = a;
    if (o === or && (o = jf(e)), o === or) {
      if (r = Ni(e, t), !r && e !== e.toLowerCase() && f("<%s /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.", e), e === "script") {
        var u = i.createElement("div");
        u.innerHTML = "<script><\/script>";
        var p = u.firstChild;
        l = u.removeChild(p);
      } else if (typeof t.is == "string")
        l = i.createElement(e, {
          is: t.is
        });
      else if (l = i.createElement(e), e === "select") {
        var v = l;
        t.multiple ? v.multiple = !0 : t.size && (v.size = t.size);
      }
    } else
      l = i.createElementNS(o, e);
    return o === or && !r && Object.prototype.toString.call(l) === "[object HTMLUnknownElement]" && !Ln.call(Yd, e) && (Yd[e] = !0, f("The tag <%s> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.", e)), l;
  }
  function EC(e, t) {
    return My(t).createTextNode(e);
  }
  function xC(e, t, n, a) {
    var r = Ni(t, n);
    Ps(t, n);
    var i;
    switch (t) {
      case "dialog":
        dt("cancel", e), dt("close", e), i = n;
        break;
      case "iframe":
      case "object":
      case "embed":
        dt("load", e), i = n;
        break;
      case "video":
      case "audio":
        for (var l = 0; l < Xo.length; l++)
          dt(Xo[l], e);
        i = n;
        break;
      case "source":
        dt("error", e), i = n;
        break;
      case "img":
      case "image":
      case "link":
        dt("error", e), dt("load", e), i = n;
        break;
      case "details":
        dt("toggle", e), i = n;
        break;
      case "input":
        ds(e, n), i = yo(e, n), dt("invalid", e);
        break;
      case "option":
        et(e, n), i = n;
        break;
      case "select":
        No(e, n), i = bo(e, n), dt("invalid", e);
        break;
      case "textarea":
        Pv(e, n), i = Df(e, n), dt("invalid", e);
        break;
      default:
        i = n;
    }
    switch (Vf(t, i), gC(t, e, a, i, r), t) {
      case "input":
        gi(e), L(e, n, !1);
        break;
      case "textarea":
        gi(e), Yv(e);
        break;
      case "option":
        lt(e, n);
        break;
      case "select":
        Rf(e, n);
        break;
      default:
        typeof i.onClick == "function" && qs(e);
        break;
    }
  }
  function SC(e, t, n, a, r) {
    Ps(t, a);
    var i = null, l, o;
    switch (t) {
      case "input":
        l = yo(e, n), o = yo(e, a), i = [];
        break;
      case "select":
        l = bo(e, n), o = bo(e, a), i = [];
        break;
      case "textarea":
        l = Df(e, n), o = Df(e, a), i = [];
        break;
      default:
        l = n, o = a, typeof l.onClick != "function" && typeof o.onClick == "function" && qs(e);
        break;
    }
    Vf(t, o);
    var u, p, v = null;
    for (u in l)
      if (!(o.hasOwnProperty(u) || !l.hasOwnProperty(u) || l[u] == null))
        if (u === Li) {
          var x = l[u];
          for (p in x)
            x.hasOwnProperty(p) && (v || (v = {}), v[p] = "");
        } else u === eu || u === Oi || u === Hs || u === Pr || u === _y || (Qt.hasOwnProperty(u) ? i || (i = []) : (i = i || []).push(u, null));
    for (u in o) {
      var E = o[u], O = l != null ? l[u] : void 0;
      if (!(!o.hasOwnProperty(u) || E === O || E == null && O == null))
        if (u === Li)
          if (E && Object.freeze(E), O) {
            for (p in O)
              O.hasOwnProperty(p) && (!E || !E.hasOwnProperty(p)) && (v || (v = {}), v[p] = "");
            for (p in E)
              E.hasOwnProperty(p) && O[p] !== E[p] && (v || (v = {}), v[p] = E[p]);
          } else
            v || (i || (i = []), i.push(u, v)), v = E;
        else if (u === eu) {
          var V = E ? E[Bs] : void 0, U = O ? O[Bs] : void 0;
          V != null && U !== V && (i = i || []).push(u, V);
        } else u === Oi ? (typeof E == "string" || typeof E == "number") && (i = i || []).push(u, "" + E) : u === Hs || u === Pr || (Qt.hasOwnProperty(u) ? (E != null && (typeof E != "function" && $s(u, E), u === "onScroll" && dt("scroll", e)), !i && O !== E && (i = [])) : (i = i || []).push(u, E));
    }
    return v && ($E(v, o[Li]), (i = i || []).push(Li, v)), i;
  }
  function RC(e, t, n, a, r) {
    n === "input" && r.type === "radio" && r.name != null && s(e, r);
    var i = Ni(n, a), l = Ni(n, r);
    switch (bC(e, t, i, l), n) {
      case "input":
        y(e, r);
        break;
      case "textarea":
        $v(e, r);
        break;
      case "select":
        ps(e, r);
        break;
    }
  }
  function CC(e) {
    {
      var t = e.toLowerCase();
      return hs.hasOwnProperty(t) && hs[t] || null;
    }
  }
  function DC(e, t, n, a, r, i, l) {
    var o, u;
    switch (o = Ni(t, n), Ps(t, n), t) {
      case "dialog":
        dt("cancel", e), dt("close", e);
        break;
      case "iframe":
      case "object":
      case "embed":
        dt("load", e);
        break;
      case "video":
      case "audio":
        for (var p = 0; p < Xo.length; p++)
          dt(Xo[p], e);
        break;
      case "source":
        dt("error", e);
        break;
      case "img":
      case "image":
      case "link":
        dt("error", e), dt("load", e);
        break;
      case "details":
        dt("toggle", e);
        break;
      case "input":
        ds(e, n), dt("invalid", e);
        break;
      case "option":
        et(e, n);
        break;
      case "select":
        No(e, n), dt("invalid", e);
        break;
      case "textarea":
        Pv(e, n), dt("invalid", e);
        break;
    }
    Vf(t, n);
    {
      u = /* @__PURE__ */ new Set();
      for (var v = e.attributes, x = 0; x < v.length; x++) {
        var E = v[x].name.toLowerCase();
        switch (E) {
          case "value":
            break;
          case "checked":
            break;
          case "selected":
            break;
          default:
            u.add(v[x].name);
        }
      }
    }
    var O = null;
    for (var V in n)
      if (n.hasOwnProperty(V)) {
        var U = n[V];
        if (V === Oi)
          typeof U == "string" ? e.textContent !== U && (n[Pr] !== !0 && Is(e.textContent, U, i, l), O = [Oi, U]) : typeof U == "number" && e.textContent !== "" + U && (n[Pr] !== !0 && Is(e.textContent, U, i, l), O = [Oi, "" + U]);
        else if (Qt.hasOwnProperty(V))
          U != null && (typeof U != "function" && $s(V, U), V === "onScroll" && dt("scroll", e));
        else if (l && // Convince Flow we've calculated it (it's DEV-only in this method.)
        typeof o == "boolean") {
          var ae = void 0, he = bt(V);
          if (n[Pr] !== !0) {
            if (!(V === Hs || V === Pr || // Controlled attributes are not validated
            // TODO: Only ignore them on controlled tags.
            V === "value" || V === "checked" || V === "selected")) {
              if (V === eu) {
                var pe = e.innerHTML, Ye = U ? U[Bs] : void 0;
                if (Ye != null) {
                  var ze = Vy(e, Ye);
                  ze !== pe && tu(V, pe, ze);
                }
              } else if (V === Li) {
                if (u.delete(V), Ly) {
                  var j = BE(U);
                  ae = e.getAttribute("style"), j !== ae && tu(V, ae, j);
                }
              } else if (o && !Zn)
                u.delete(V.toLowerCase()), ae = ci(e, V, U), U !== ae && tu(V, ae, U);
              else if (!ht(V, he, o) && !fn(V, U, he, o)) {
                var F = !1;
                if (he !== null)
                  u.delete(he.attributeName), ae = Xi(e, V, U, he);
                else {
                  var w = a;
                  if (w === or && (w = jf(t)), w === or)
                    u.delete(V.toLowerCase());
                  else {
                    var q = CC(V);
                    q !== null && q !== V && (F = !0, u.delete(q)), u.delete(V);
                  }
                  ae = ci(e, V, U);
                }
                var oe = Zn;
                !oe && U !== ae && !F && tu(V, ae, U);
              }
            }
          }
        }
      }
    switch (l && // $FlowFixMe - Should be inferred as not undefined.
    u.size > 0 && n[Pr] !== !0 && Oy(u), t) {
      case "input":
        gi(e), L(e, n, !0);
        break;
      case "textarea":
        gi(e), Yv(e);
        break;
      case "select":
      case "option":
        break;
      default:
        typeof n.onClick == "function" && qs(e);
        break;
    }
    return O;
  }
  function TC(e, t, n) {
    var a = e.nodeValue !== t;
    return a;
  }
  function Id(e, t) {
    {
      if (kn)
        return;
      kn = !0, f("Did not expect server HTML to contain a <%s> in <%s>.", t.nodeName.toLowerCase(), e.nodeName.toLowerCase());
    }
  }
  function qd(e, t) {
    {
      if (kn)
        return;
      kn = !0, f('Did not expect server HTML to contain the text node "%s" in <%s>.', t.nodeValue, e.nodeName.toLowerCase());
    }
  }
  function Gd(e, t, n) {
    {
      if (kn)
        return;
      kn = !0, f("Expected server HTML to contain a matching <%s> in <%s>.", t, e.nodeName.toLowerCase());
    }
  }
  function Wd(e, t) {
    {
      if (t === "" || kn)
        return;
      kn = !0, f('Expected server HTML to contain a matching text node for "%s" in <%s>.', t, e.nodeName.toLowerCase());
    }
  }
  function jC(e, t, n) {
    switch (t) {
      case "input":
        k(e, n);
        return;
      case "textarea":
        xE(e, n);
        return;
      case "select":
        Cf(e, n);
        return;
    }
  }
  var nu = function() {
  }, au = function() {
  };
  {
    var wC = ["address", "applet", "area", "article", "aside", "base", "basefont", "bgsound", "blockquote", "body", "br", "button", "caption", "center", "col", "colgroup", "dd", "details", "dir", "div", "dl", "dt", "embed", "fieldset", "figcaption", "figure", "footer", "form", "frame", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "iframe", "img", "input", "isindex", "li", "link", "listing", "main", "marquee", "menu", "menuitem", "meta", "nav", "noembed", "noframes", "noscript", "object", "ol", "p", "param", "plaintext", "pre", "script", "section", "select", "source", "style", "summary", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "title", "tr", "track", "ul", "wbr", "xmp"], Ay = [
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
    ], _C = Ay.concat(["button"]), OC = ["dd", "dt", "li", "option", "optgroup", "p", "rp", "rt"], ky = {
      current: null,
      formTag: null,
      aTagInScope: null,
      buttonTagInScope: null,
      nobrTagInScope: null,
      pTagInButtonScope: null,
      listItemTagAutoclosing: null,
      dlItemTagAutoclosing: null
    };
    au = function(e, t) {
      var n = Ue({}, e || ky), a = {
        tag: t
      };
      return Ay.indexOf(t) !== -1 && (n.aTagInScope = null, n.buttonTagInScope = null, n.nobrTagInScope = null), _C.indexOf(t) !== -1 && (n.pTagInButtonScope = null), wC.indexOf(t) !== -1 && t !== "address" && t !== "div" && t !== "p" && (n.listItemTagAutoclosing = null, n.dlItemTagAutoclosing = null), n.current = a, t === "form" && (n.formTag = a), t === "a" && (n.aTagInScope = a), t === "button" && (n.buttonTagInScope = a), t === "nobr" && (n.nobrTagInScope = a), t === "p" && (n.pTagInButtonScope = a), t === "li" && (n.listItemTagAutoclosing = a), (t === "dd" || t === "dt") && (n.dlItemTagAutoclosing = a), n;
    };
    var LC = function(e, t) {
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
          return OC.indexOf(t) === -1;
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
    }, VC = function(e, t) {
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
    }, Uy = {};
    nu = function(e, t, n) {
      n = n || ky;
      var a = n.current, r = a && a.tag;
      t != null && (e != null && f("validateDOMNesting: when childText is passed, childTag should be null"), e = "#text");
      var i = LC(e, r) ? null : a, l = i ? null : VC(e, n), o = i || l;
      if (o) {
        var u = o.tag, p = !!i + "|" + e + "|" + u;
        if (!Uy[p]) {
          Uy[p] = !0;
          var v = e, x = "";
          if (e === "#text" ? /\S/.test(t) ? v = "Text nodes" : (v = "Whitespace text nodes", x = " Make sure you don't have any extra whitespace between tags on each line of your source code.") : v = "<" + e + ">", i) {
            var E = "";
            u === "table" && e === "tr" && (E += " Add a <tbody>, <thead> or <tfoot> to your code to match the DOM tree generated by the browser."), f("validateDOMNesting(...): %s cannot appear as a child of <%s>.%s%s", v, u, x, E);
          } else
            f("validateDOMNesting(...): %s cannot appear as a descendant of <%s>.", v, u);
        }
      }
    };
  }
  var Gs = "suppressHydrationWarning", Ws = "$", Qs = "/$", ru = "$?", iu = "$!", MC = "style", Qd = null, Kd = null;
  function AC(e) {
    var t, n, a = e.nodeType;
    switch (a) {
      case sr:
      case _f: {
        t = a === sr ? "#document" : "#fragment";
        var r = e.documentElement;
        n = r ? r.namespaceURI : wf(null, "");
        break;
      }
      default: {
        var i = a === Ct ? e.parentNode : e, l = i.namespaceURI || null;
        t = i.tagName, n = wf(l, t);
        break;
      }
    }
    {
      var o = t.toLowerCase(), u = au(null, o);
      return {
        namespace: n,
        ancestorInfo: u
      };
    }
  }
  function kC(e, t, n) {
    {
      var a = e, r = wf(a.namespace, t), i = au(a.ancestorInfo, t);
      return {
        namespace: r,
        ancestorInfo: i
      };
    }
  }
  function N_(e) {
    return e;
  }
  function UC(e) {
    Qd = MS(), Kd = XR();
    var t = null;
    return Ih(!1), t;
  }
  function FC(e) {
    JR(Kd), Ih(Qd), Qd = null, Kd = null;
  }
  function zC(e, t, n, a, r) {
    var i;
    {
      var l = a;
      if (nu(e, null, l.ancestorInfo), typeof t.children == "string" || typeof t.children == "number") {
        var o = "" + t.children, u = au(l.ancestorInfo, e);
        nu(null, o, u);
      }
      i = l.namespace;
    }
    var p = NC(e, t, n, i);
    return uu(r, p), rp(p, t), p;
  }
  function HC(e, t) {
    e.appendChild(t);
  }
  function BC(e, t, n, a, r) {
    switch (xC(e, t, n, a), t) {
      case "button":
      case "input":
      case "select":
      case "textarea":
        return !!n.autoFocus;
      case "img":
        return !0;
      default:
        return !1;
    }
  }
  function PC(e, t, n, a, r, i) {
    {
      var l = i;
      if (typeof a.children != typeof n.children && (typeof a.children == "string" || typeof a.children == "number")) {
        var o = "" + a.children, u = au(l.ancestorInfo, t);
        nu(null, o, u);
      }
    }
    return SC(e, t, n, a);
  }
  function Xd(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  function $C(e, t, n, a) {
    {
      var r = n;
      nu(null, e, r.ancestorInfo);
    }
    var i = EC(e, t);
    return uu(a, i), i;
  }
  function YC() {
    var e = window.event;
    return e === void 0 ? vr : qh(e.type);
  }
  var Jd = typeof setTimeout == "function" ? setTimeout : void 0, IC = typeof clearTimeout == "function" ? clearTimeout : void 0, Zd = -1, Fy = typeof Promise == "function" ? Promise : void 0, qC = typeof queueMicrotask == "function" ? queueMicrotask : typeof Fy < "u" ? function(e) {
    return Fy.resolve(null).then(e).catch(GC);
  } : Jd;
  function GC(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function WC(e, t, n, a) {
    switch (t) {
      case "button":
      case "input":
      case "select":
      case "textarea":
        n.autoFocus && e.focus();
        return;
      case "img": {
        n.src && (e.src = n.src);
        return;
      }
    }
  }
  function QC(e, t, n, a, r, i) {
    RC(e, t, n, a, r), rp(e, r);
  }
  function zy(e) {
    vs(e, "");
  }
  function KC(e, t, n) {
    e.nodeValue = n;
  }
  function XC(e, t) {
    e.appendChild(t);
  }
  function JC(e, t) {
    var n;
    e.nodeType === Ct ? (n = e.parentNode, n.insertBefore(t, e)) : (n = e, n.appendChild(t));
    var a = e._reactRootContainer;
    a == null && n.onclick === null && qs(n);
  }
  function ZC(e, t, n) {
    e.insertBefore(t, n);
  }
  function e0(e, t, n) {
    e.nodeType === Ct ? e.parentNode.insertBefore(t, n) : e.insertBefore(t, n);
  }
  function t0(e, t) {
    e.removeChild(t);
  }
  function n0(e, t) {
    e.nodeType === Ct ? e.parentNode.removeChild(t) : e.removeChild(t);
  }
  function ep(e, t) {
    var n = t, a = 0;
    do {
      var r = n.nextSibling;
      if (e.removeChild(n), r && r.nodeType === Ct) {
        var i = r.data;
        if (i === Qs)
          if (a === 0) {
            e.removeChild(r), Bo(t);
            return;
          } else
            a--;
        else (i === Ws || i === ru || i === iu) && a++;
      }
      n = r;
    } while (n);
    Bo(t);
  }
  function a0(e, t) {
    e.nodeType === Ct ? ep(e.parentNode, t) : e.nodeType === An && ep(e, t), Bo(e);
  }
  function r0(e) {
    e = e;
    var t = e.style;
    typeof t.setProperty == "function" ? t.setProperty("display", "none", "important") : t.display = "none";
  }
  function i0(e) {
    e.nodeValue = "";
  }
  function l0(e, t) {
    e = e;
    var n = t[MC], a = n != null && n.hasOwnProperty("display") ? n.display : null;
    e.style.display = Of("display", a);
  }
  function o0(e, t) {
    e.nodeValue = t;
  }
  function u0(e) {
    e.nodeType === An ? e.textContent = "" : e.nodeType === sr && e.documentElement && e.removeChild(e.documentElement);
  }
  function s0(e, t, n) {
    return e.nodeType !== An || t.toLowerCase() !== e.nodeName.toLowerCase() ? null : e;
  }
  function c0(e, t) {
    return t === "" || e.nodeType !== ur ? null : e;
  }
  function f0(e) {
    return e.nodeType !== Ct ? null : e;
  }
  function Hy(e) {
    return e.data === ru;
  }
  function tp(e) {
    return e.data === iu;
  }
  function d0(e) {
    var t = e.nextSibling && e.nextSibling.dataset, n, a, r;
    return t && (n = t.dgst, a = t.msg, r = t.stck), {
      message: a,
      digest: n,
      stack: r
    };
  }
  function p0(e, t) {
    e._reactRetry = t;
  }
  function Ks(e) {
    for (; e != null; e = e.nextSibling) {
      var t = e.nodeType;
      if (t === An || t === ur)
        break;
      if (t === Ct) {
        var n = e.data;
        if (n === Ws || n === iu || n === ru)
          break;
        if (n === Qs)
          return null;
      }
    }
    return e;
  }
  function lu(e) {
    return Ks(e.nextSibling);
  }
  function m0(e) {
    return Ks(e.firstChild);
  }
  function v0(e) {
    return Ks(e.firstChild);
  }
  function h0(e) {
    return Ks(e.nextSibling);
  }
  function y0(e, t, n, a, r, i, l) {
    uu(i, e), rp(e, n);
    var o;
    {
      var u = r;
      o = u.namespace;
    }
    var p = (i.mode & Pe) !== be;
    return DC(e, t, n, o, a, p, l);
  }
  function g0(e, t, n, a) {
    return uu(n, e), n.mode & Pe, TC(e, t);
  }
  function b0(e, t) {
    uu(t, e);
  }
  function N0(e) {
    for (var t = e.nextSibling, n = 0; t; ) {
      if (t.nodeType === Ct) {
        var a = t.data;
        if (a === Qs) {
          if (n === 0)
            return lu(t);
          n--;
        } else (a === Ws || a === iu || a === ru) && n++;
      }
      t = t.nextSibling;
    }
    return null;
  }
  function By(e) {
    for (var t = e.previousSibling, n = 0; t; ) {
      if (t.nodeType === Ct) {
        var a = t.data;
        if (a === Ws || a === iu || a === ru) {
          if (n === 0)
            return t;
          n--;
        } else a === Qs && n++;
      }
      t = t.previousSibling;
    }
    return null;
  }
  function E0(e) {
    Bo(e);
  }
  function x0(e) {
    Bo(e);
  }
  function S0(e) {
    return e !== "head" && e !== "body";
  }
  function R0(e, t, n, a) {
    var r = !0;
    Is(t.nodeValue, n, a, r);
  }
  function C0(e, t, n, a, r, i) {
    if (t[Gs] !== !0) {
      var l = !0;
      Is(a.nodeValue, r, i, l);
    }
  }
  function D0(e, t) {
    t.nodeType === An ? Id(e, t) : t.nodeType === Ct || qd(e, t);
  }
  function T0(e, t) {
    {
      var n = e.parentNode;
      n !== null && (t.nodeType === An ? Id(n, t) : t.nodeType === Ct || qd(n, t));
    }
  }
  function j0(e, t, n, a, r) {
    (r || t[Gs] !== !0) && (a.nodeType === An ? Id(n, a) : a.nodeType === Ct || qd(n, a));
  }
  function w0(e, t, n) {
    Gd(e, t);
  }
  function _0(e, t) {
    Wd(e, t);
  }
  function O0(e, t, n) {
    {
      var a = e.parentNode;
      a !== null && Gd(a, t);
    }
  }
  function L0(e, t) {
    {
      var n = e.parentNode;
      n !== null && Wd(n, t);
    }
  }
  function V0(e, t, n, a, r, i) {
    (i || t[Gs] !== !0) && Gd(n, a);
  }
  function M0(e, t, n, a, r) {
    (r || t[Gs] !== !0) && Wd(n, a);
  }
  function A0(e) {
    f("An error occurred during hydration. The server HTML was replaced with client content in <%s>.", e.nodeName.toLowerCase());
  }
  function k0(e) {
    Jo(e);
  }
  var Dl = Math.random().toString(36).slice(2), Tl = "__reactFiber$" + Dl, np = "__reactProps$" + Dl, ou = "__reactContainer$" + Dl, ap = "__reactEvents$" + Dl, U0 = "__reactListeners$" + Dl, F0 = "__reactHandles$" + Dl;
  function z0(e) {
    delete e[Tl], delete e[np], delete e[ap], delete e[U0], delete e[F0];
  }
  function uu(e, t) {
    t[Tl] = e;
  }
  function Xs(e, t) {
    t[ou] = e;
  }
  function Py(e) {
    e[ou] = null;
  }
  function su(e) {
    return !!e[ou];
  }
  function Vi(e) {
    var t = e[Tl];
    if (t)
      return t;
    for (var n = e.parentNode; n; ) {
      if (t = n[ou] || n[Tl], t) {
        var a = t.alternate;
        if (t.child !== null || a !== null && a.child !== null)
          for (var r = By(e); r !== null; ) {
            var i = r[Tl];
            if (i)
              return i;
            r = By(r);
          }
        return t;
      }
      e = n, n = e.parentNode;
    }
    return null;
  }
  function $r(e) {
    var t = e[Tl] || e[ou];
    return t && (t.tag === z || t.tag === W || t.tag === X || t.tag === S) ? t : null;
  }
  function jl(e) {
    if (e.tag === z || e.tag === W)
      return e.stateNode;
    throw new Error("getNodeFromInstance: Invalid argument.");
  }
  function Js(e) {
    return e[np] || null;
  }
  function rp(e, t) {
    e[np] = t;
  }
  function H0(e) {
    var t = e[ap];
    return t === void 0 && (t = e[ap] = /* @__PURE__ */ new Set()), t;
  }
  var $y = {}, Yy = h.ReactDebugCurrentFrame;
  function Zs(e) {
    if (e) {
      var t = e._owner, n = co(e.type, e._source, t ? t.type : null);
      Yy.setExtraStackFrame(n);
    } else
      Yy.setExtraStackFrame(null);
  }
  function Sa(e, t, n, a, r) {
    {
      var i = Function.call.bind(Ln);
      for (var l in e)
        if (i(e, l)) {
          var o = void 0;
          try {
            if (typeof e[l] != "function") {
              var u = Error((a || "React class") + ": " + n + " type `" + l + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[l] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
              throw u.name = "Invariant Violation", u;
            }
            o = e[l](t, l, a, n, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
          } catch (p) {
            o = p;
          }
          o && !(o instanceof Error) && (Zs(r), f("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", a || "React class", n, l, typeof o), Zs(null)), o instanceof Error && !(o.message in $y) && ($y[o.message] = !0, Zs(r), f("Failed %s type: %s", n, o.message), Zs(null));
        }
    }
  }
  var ip = [], ec;
  ec = [];
  var hr = -1;
  function Yr(e) {
    return {
      current: e
    };
  }
  function mn(e, t) {
    if (hr < 0) {
      f("Unexpected pop.");
      return;
    }
    t !== ec[hr] && f("Unexpected Fiber popped."), e.current = ip[hr], ip[hr] = null, ec[hr] = null, hr--;
  }
  function vn(e, t, n) {
    hr++, ip[hr] = e.current, ec[hr] = n, e.current = t;
  }
  var lp;
  lp = {};
  var Qn = {};
  Object.freeze(Qn);
  var yr = Yr(Qn), Ya = Yr(!1), op = Qn;
  function wl(e, t, n) {
    return n && Ia(t) ? op : yr.current;
  }
  function Iy(e, t, n) {
    {
      var a = e.stateNode;
      a.__reactInternalMemoizedUnmaskedChildContext = t, a.__reactInternalMemoizedMaskedChildContext = n;
    }
  }
  function _l(e, t) {
    {
      var n = e.type, a = n.contextTypes;
      if (!a)
        return Qn;
      var r = e.stateNode;
      if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
        return r.__reactInternalMemoizedMaskedChildContext;
      var i = {};
      for (var l in a)
        i[l] = t[l];
      {
        var o = Le(e) || "Unknown";
        Sa(a, i, "context", o);
      }
      return r && Iy(e, t, i), i;
    }
  }
  function tc() {
    return Ya.current;
  }
  function Ia(e) {
    {
      var t = e.childContextTypes;
      return t != null;
    }
  }
  function nc(e) {
    mn(Ya, e), mn(yr, e);
  }
  function up(e) {
    mn(Ya, e), mn(yr, e);
  }
  function qy(e, t, n) {
    {
      if (yr.current !== Qn)
        throw new Error("Unexpected context found on stack. This error is likely caused by a bug in React. Please file an issue.");
      vn(yr, t, e), vn(Ya, n, e);
    }
  }
  function Gy(e, t, n) {
    {
      var a = e.stateNode, r = t.childContextTypes;
      if (typeof a.getChildContext != "function") {
        {
          var i = Le(e) || "Unknown";
          lp[i] || (lp[i] = !0, f("%s.childContextTypes is specified but there is no getChildContext() method on the instance. You can either define getChildContext() on %s or remove childContextTypes from it.", i, i));
        }
        return n;
      }
      var l = a.getChildContext();
      for (var o in l)
        if (!(o in r))
          throw new Error((Le(e) || "Unknown") + '.getChildContext(): key "' + o + '" is not defined in childContextTypes.');
      {
        var u = Le(e) || "Unknown";
        Sa(r, l, "child context", u);
      }
      return Ue({}, n, l);
    }
  }
  function ac(e) {
    {
      var t = e.stateNode, n = t && t.__reactInternalMemoizedMergedChildContext || Qn;
      return op = yr.current, vn(yr, n, e), vn(Ya, Ya.current, e), !0;
    }
  }
  function Wy(e, t, n) {
    {
      var a = e.stateNode;
      if (!a)
        throw new Error("Expected to have an instance by this point. This error is likely caused by a bug in React. Please file an issue.");
      if (n) {
        var r = Gy(e, t, op);
        a.__reactInternalMemoizedMergedChildContext = r, mn(Ya, e), mn(yr, e), vn(yr, r, e), vn(Ya, n, e);
      } else
        mn(Ya, e), vn(Ya, n, e);
    }
  }
  function B0(e) {
    {
      if (!Sx(e) || e.tag !== T)
        throw new Error("Expected subtree parent to be a mounted class component. This error is likely caused by a bug in React. Please file an issue.");
      var t = e;
      do {
        switch (t.tag) {
          case S:
            return t.stateNode.context;
          case T: {
            var n = t.type;
            if (Ia(n))
              return t.stateNode.__reactInternalMemoizedMergedChildContext;
            break;
          }
        }
        t = t.return;
      } while (t !== null);
      throw new Error("Found unexpected detached subtree parent. This error is likely caused by a bug in React. Please file an issue.");
    }
  }
  var Ir = 0, rc = 1, gr = null, sp = !1, cp = !1;
  function Qy(e) {
    gr === null ? gr = [e] : gr.push(e);
  }
  function P0(e) {
    sp = !0, Qy(e);
  }
  function Ky() {
    sp && qr();
  }
  function qr() {
    if (!cp && gr !== null) {
      cp = !0;
      var e = 0, t = xa();
      try {
        var n = !0, a = gr;
        for (Wt(qn); e < a.length; e++) {
          var r = a[e];
          do
            r = r(n);
          while (r !== null);
        }
        gr = null, sp = !1;
      } catch (i) {
        throw gr !== null && (gr = gr.slice(e + 1)), Nh(Ns, qr), i;
      } finally {
        Wt(t), cp = !1;
      }
    }
    return null;
  }
  var Ol = [], Ll = 0, ic = null, lc = 0, ra = [], ia = 0, Mi = null, br = 1, Nr = "";
  function $0(e) {
    return ki(), (e.flags & dh) !== Ee;
  }
  function Y0(e) {
    return ki(), lc;
  }
  function I0() {
    var e = Nr, t = br, n = t & ~q0(t);
    return n.toString(32) + e;
  }
  function Ai(e, t) {
    ki(), Ol[Ll++] = lc, Ol[Ll++] = ic, ic = e, lc = t;
  }
  function Xy(e, t, n) {
    ki(), ra[ia++] = br, ra[ia++] = Nr, ra[ia++] = Mi, Mi = e;
    var a = br, r = Nr, i = oc(a) - 1, l = a & ~(1 << i), o = n + 1, u = oc(t) + i;
    if (u > 30) {
      var p = i - i % 5, v = (1 << p) - 1, x = (l & v).toString(32), E = l >> p, O = i - p, V = oc(t) + O, U = o << O, ae = U | E, he = x + r;
      br = 1 << V | ae, Nr = he;
    } else {
      var pe = o << i, Ye = pe | l, ze = r;
      br = 1 << u | Ye, Nr = ze;
    }
  }
  function fp(e) {
    ki();
    var t = e.return;
    if (t !== null) {
      var n = 1, a = 0;
      Ai(e, n), Xy(e, n, a);
    }
  }
  function oc(e) {
    return 32 - Dh(e);
  }
  function q0(e) {
    return 1 << oc(e) - 1;
  }
  function dp(e) {
    for (; e === ic; )
      ic = Ol[--Ll], Ol[Ll] = null, lc = Ol[--Ll], Ol[Ll] = null;
    for (; e === Mi; )
      Mi = ra[--ia], ra[ia] = null, Nr = ra[--ia], ra[ia] = null, br = ra[--ia], ra[ia] = null;
  }
  function G0() {
    return ki(), Mi !== null ? {
      id: br,
      overflow: Nr
    } : null;
  }
  function W0(e, t) {
    ki(), ra[ia++] = br, ra[ia++] = Nr, ra[ia++] = Mi, br = t.id, Nr = t.overflow, Mi = e;
  }
  function ki() {
    tn() || f("Expected to be hydrating. This is a bug in React. Please file an issue.");
  }
  var en = null, la = null, Ra = !1, Ui = !1, Gr = null;
  function Q0() {
    Ra && f("We should not be hydrating here. This is a bug in React. Please file a bug.");
  }
  function Jy() {
    Ui = !0;
  }
  function K0() {
    return Ui;
  }
  function X0(e) {
    var t = e.stateNode.containerInfo;
    return la = v0(t), en = e, Ra = !0, Gr = null, Ui = !1, !0;
  }
  function J0(e, t, n) {
    return la = h0(t), en = e, Ra = !0, Gr = null, Ui = !1, n !== null && W0(e, n), !0;
  }
  function Zy(e, t) {
    switch (e.tag) {
      case S: {
        D0(e.stateNode.containerInfo, t);
        break;
      }
      case z: {
        var n = (e.mode & Pe) !== be;
        j0(
          e.type,
          e.memoizedProps,
          e.stateNode,
          t,
          // TODO: Delete this argument when we remove the legacy root API.
          n
        );
        break;
      }
      case X: {
        var a = e.memoizedState;
        a.dehydrated !== null && T0(a.dehydrated, t);
        break;
      }
    }
  }
  function eg(e, t) {
    Zy(e, t);
    var n = n1();
    n.stateNode = t, n.return = e;
    var a = e.deletions;
    a === null ? (e.deletions = [n], e.flags |= Ei) : a.push(n);
  }
  function pp(e, t) {
    {
      if (Ui)
        return;
      switch (e.tag) {
        case S: {
          var n = e.stateNode.containerInfo;
          switch (t.tag) {
            case z:
              var a = t.type;
              t.pendingProps, w0(n, a);
              break;
            case W:
              var r = t.pendingProps;
              _0(n, r);
              break;
          }
          break;
        }
        case z: {
          var i = e.type, l = e.memoizedProps, o = e.stateNode;
          switch (t.tag) {
            case z: {
              var u = t.type, p = t.pendingProps, v = (e.mode & Pe) !== be;
              V0(
                i,
                l,
                o,
                u,
                p,
                // TODO: Delete this argument when we remove the legacy root API.
                v
              );
              break;
            }
            case W: {
              var x = t.pendingProps, E = (e.mode & Pe) !== be;
              M0(
                i,
                l,
                o,
                x,
                // TODO: Delete this argument when we remove the legacy root API.
                E
              );
              break;
            }
          }
          break;
        }
        case X: {
          var O = e.memoizedState, V = O.dehydrated;
          if (V !== null) switch (t.tag) {
            case z:
              var U = t.type;
              t.pendingProps, O0(V, U);
              break;
            case W:
              var ae = t.pendingProps;
              L0(V, ae);
              break;
          }
          break;
        }
        default:
          return;
      }
    }
  }
  function tg(e, t) {
    t.flags = t.flags & ~fr | Dt, pp(e, t);
  }
  function ng(e, t) {
    switch (e.tag) {
      case z: {
        var n = e.type;
        e.pendingProps;
        var a = s0(t, n);
        return a !== null ? (e.stateNode = a, en = e, la = m0(a), !0) : !1;
      }
      case W: {
        var r = e.pendingProps, i = c0(t, r);
        return i !== null ? (e.stateNode = i, en = e, la = null, !0) : !1;
      }
      case X: {
        var l = f0(t);
        if (l !== null) {
          var o = {
            dehydrated: l,
            treeContext: G0(),
            retryLane: Yn
          };
          e.memoizedState = o;
          var u = a1(l);
          return u.return = e, e.child = u, en = e, la = null, !0;
        }
        return !1;
      }
      default:
        return !1;
    }
  }
  function mp(e) {
    return (e.mode & Pe) !== be && (e.flags & Xe) === Ee;
  }
  function vp(e) {
    throw new Error("Hydration failed because the initial UI does not match what was rendered on the server.");
  }
  function hp(e) {
    if (Ra) {
      var t = la;
      if (!t) {
        mp(e) && (pp(en, e), vp()), tg(en, e), Ra = !1, en = e;
        return;
      }
      var n = t;
      if (!ng(e, t)) {
        mp(e) && (pp(en, e), vp()), t = lu(n);
        var a = en;
        if (!t || !ng(e, t)) {
          tg(en, e), Ra = !1, en = e;
          return;
        }
        eg(a, n);
      }
    }
  }
  function Z0(e, t, n) {
    var a = e.stateNode, r = !Ui, i = y0(a, e.type, e.memoizedProps, t, n, e, r);
    return e.updateQueue = i, i !== null;
  }
  function eD(e) {
    var t = e.stateNode, n = e.memoizedProps, a = g0(t, n, e);
    if (a) {
      var r = en;
      if (r !== null)
        switch (r.tag) {
          case S: {
            var i = r.stateNode.containerInfo, l = (r.mode & Pe) !== be;
            R0(
              i,
              t,
              n,
              // TODO: Delete this argument when we remove the legacy root API.
              l
            );
            break;
          }
          case z: {
            var o = r.type, u = r.memoizedProps, p = r.stateNode, v = (r.mode & Pe) !== be;
            C0(
              o,
              u,
              p,
              t,
              n,
              // TODO: Delete this argument when we remove the legacy root API.
              v
            );
            break;
          }
        }
    }
    return a;
  }
  function tD(e) {
    var t = e.memoizedState, n = t !== null ? t.dehydrated : null;
    if (!n)
      throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
    b0(n, e);
  }
  function nD(e) {
    var t = e.memoizedState, n = t !== null ? t.dehydrated : null;
    if (!n)
      throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
    return N0(n);
  }
  function ag(e) {
    for (var t = e.return; t !== null && t.tag !== z && t.tag !== S && t.tag !== X; )
      t = t.return;
    en = t;
  }
  function uc(e) {
    if (e !== en)
      return !1;
    if (!Ra)
      return ag(e), Ra = !0, !1;
    if (e.tag !== S && (e.tag !== z || S0(e.type) && !Xd(e.type, e.memoizedProps))) {
      var t = la;
      if (t)
        if (mp(e))
          rg(e), vp();
        else
          for (; t; )
            eg(e, t), t = lu(t);
    }
    return ag(e), e.tag === X ? la = nD(e) : la = en ? lu(e.stateNode) : null, !0;
  }
  function aD() {
    return Ra && la !== null;
  }
  function rg(e) {
    for (var t = la; t; )
      Zy(e, t), t = lu(t);
  }
  function Vl() {
    en = null, la = null, Ra = !1, Ui = !1;
  }
  function ig() {
    Gr !== null && (Jb(Gr), Gr = null);
  }
  function tn() {
    return Ra;
  }
  function yp(e) {
    Gr === null ? Gr = [e] : Gr.push(e);
  }
  var rD = h.ReactCurrentBatchConfig, iD = null;
  function lD() {
    return rD.transition;
  }
  var Ca = {
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
    var oD = function(e) {
      for (var t = null, n = e; n !== null; )
        n.mode & Et && (t = n), n = n.return;
      return t;
    }, Fi = function(e) {
      var t = [];
      return e.forEach(function(n) {
        t.push(n);
      }), t.sort().join(", ");
    }, cu = [], fu = [], du = [], pu = [], mu = [], vu = [], zi = /* @__PURE__ */ new Set();
    Ca.recordUnsafeLifecycleWarnings = function(e, t) {
      zi.has(e.type) || (typeof t.componentWillMount == "function" && // Don't warn about react-lifecycles-compat polyfilled components.
      t.componentWillMount.__suppressDeprecationWarning !== !0 && cu.push(e), e.mode & Et && typeof t.UNSAFE_componentWillMount == "function" && fu.push(e), typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps.__suppressDeprecationWarning !== !0 && du.push(e), e.mode & Et && typeof t.UNSAFE_componentWillReceiveProps == "function" && pu.push(e), typeof t.componentWillUpdate == "function" && t.componentWillUpdate.__suppressDeprecationWarning !== !0 && mu.push(e), e.mode & Et && typeof t.UNSAFE_componentWillUpdate == "function" && vu.push(e));
    }, Ca.flushPendingUnsafeLifecycleWarnings = function() {
      var e = /* @__PURE__ */ new Set();
      cu.length > 0 && (cu.forEach(function(E) {
        e.add(Le(E) || "Component"), zi.add(E.type);
      }), cu = []);
      var t = /* @__PURE__ */ new Set();
      fu.length > 0 && (fu.forEach(function(E) {
        t.add(Le(E) || "Component"), zi.add(E.type);
      }), fu = []);
      var n = /* @__PURE__ */ new Set();
      du.length > 0 && (du.forEach(function(E) {
        n.add(Le(E) || "Component"), zi.add(E.type);
      }), du = []);
      var a = /* @__PURE__ */ new Set();
      pu.length > 0 && (pu.forEach(function(E) {
        a.add(Le(E) || "Component"), zi.add(E.type);
      }), pu = []);
      var r = /* @__PURE__ */ new Set();
      mu.length > 0 && (mu.forEach(function(E) {
        r.add(Le(E) || "Component"), zi.add(E.type);
      }), mu = []);
      var i = /* @__PURE__ */ new Set();
      if (vu.length > 0 && (vu.forEach(function(E) {
        i.add(Le(E) || "Component"), zi.add(E.type);
      }), vu = []), t.size > 0) {
        var l = Fi(t);
        f(`Using UNSAFE_componentWillMount in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.

Please update the following components: %s`, l);
      }
      if (a.size > 0) {
        var o = Fi(a);
        f(`Using UNSAFE_componentWillReceiveProps in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state

Please update the following components: %s`, o);
      }
      if (i.size > 0) {
        var u = Fi(i);
        f(`Using UNSAFE_componentWillUpdate in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.

Please update the following components: %s`, u);
      }
      if (e.size > 0) {
        var p = Fi(e);
        R(`componentWillMount has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.
* Rename componentWillMount to UNSAFE_componentWillMount to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, p);
      }
      if (n.size > 0) {
        var v = Fi(n);
        R(`componentWillReceiveProps has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state
* Rename componentWillReceiveProps to UNSAFE_componentWillReceiveProps to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, v);
      }
      if (r.size > 0) {
        var x = Fi(r);
        R(`componentWillUpdate has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* Rename componentWillUpdate to UNSAFE_componentWillUpdate to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, x);
      }
    };
    var sc = /* @__PURE__ */ new Map(), lg = /* @__PURE__ */ new Set();
    Ca.recordLegacyContextWarning = function(e, t) {
      var n = oD(e);
      if (n === null) {
        f("Expected to find a StrictMode component in a strict mode tree. This error is likely caused by a bug in React. Please file an issue.");
        return;
      }
      if (!lg.has(e.type)) {
        var a = sc.get(n);
        (e.type.contextTypes != null || e.type.childContextTypes != null || t !== null && typeof t.getChildContext == "function") && (a === void 0 && (a = [], sc.set(n, a)), a.push(e));
      }
    }, Ca.flushLegacyContextWarning = function() {
      sc.forEach(function(e, t) {
        if (e.length !== 0) {
          var n = e[0], a = /* @__PURE__ */ new Set();
          e.forEach(function(i) {
            a.add(Le(i) || "Component"), lg.add(i.type);
          });
          var r = Fi(a);
          try {
            pt(n), f(`Legacy context API has been detected within a strict-mode tree.

The old API will be supported in all 16.x releases, but applications using it should migrate to the new version.

Please update the following components: %s

Learn more about this warning here: https://reactjs.org/link/legacy-context`, r);
          } finally {
            Yt();
          }
        }
      });
    }, Ca.discardPendingWarnings = function() {
      cu = [], fu = [], du = [], pu = [], mu = [], vu = [], sc = /* @__PURE__ */ new Map();
    };
  }
  var gp, bp, Np, Ep, xp, og = function(e, t) {
  };
  gp = !1, bp = !1, Np = {}, Ep = {}, xp = {}, og = function(e, t) {
    if (!(e === null || typeof e != "object") && !(!e._store || e._store.validated || e.key != null)) {
      if (typeof e._store != "object")
        throw new Error("React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue.");
      e._store.validated = !0;
      var n = Le(t) || "Component";
      Ep[n] || (Ep[n] = !0, f('Each child in a list should have a unique "key" prop. See https://reactjs.org/link/warning-keys for more information.'));
    }
  };
  function uD(e) {
    return e.prototype && e.prototype.isReactComponent;
  }
  function hu(e, t, n) {
    var a = n.ref;
    if (a !== null && typeof a != "function" && typeof a != "object") {
      if ((e.mode & Et || Ht) && // We warn in ReactElement.js if owner and self are equal for string refs
      // because these cannot be automatically converted to an arrow function
      // using a codemod. Therefore, we don't have to warn about string refs again.
      !(n._owner && n._self && n._owner.stateNode !== n._self) && // Will already throw with "Function components cannot have string refs"
      !(n._owner && n._owner.tag !== T) && // Will already warn with "Function components cannot be given refs"
      !(typeof n.type == "function" && !uD(n.type)) && // Will already throw with "Element ref was specified as a string (someStringRef) but no owner was set"
      n._owner) {
        var r = Le(e) || "Component";
        Np[r] || (f('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. We recommend using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', r, a), Np[r] = !0);
      }
      if (n._owner) {
        var i = n._owner, l;
        if (i) {
          var o = i;
          if (o.tag !== T)
            throw new Error("Function components cannot have string refs. We recommend using useRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref");
          l = o.stateNode;
        }
        if (!l)
          throw new Error("Missing owner for string ref " + a + ". This error is likely caused by a bug in React. Please file an issue.");
        var u = l;
        tr(a, "ref");
        var p = "" + a;
        if (t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === p)
          return t.ref;
        var v = function(x) {
          var E = u.refs;
          x === null ? delete E[p] : E[p] = x;
        };
        return v._stringRef = p, v;
      } else {
        if (typeof a != "string")
          throw new Error("Expected ref to be a function, a string, an object returned by React.createRef(), or null.");
        if (!n._owner)
          throw new Error("Element ref was specified as a string (" + a + `) but no owner was set. This could happen for one of the following reasons:
1. You may be adding a ref to a function component
2. You may be adding a ref to a component that was not created inside a component's render method
3. You have multiple copies of React loaded
See https://reactjs.org/link/refs-must-have-owner for more information.`);
      }
    }
    return a;
  }
  function cc(e, t) {
    var n = Object.prototype.toString.call(t);
    throw new Error("Objects are not valid as a React child (found: " + (n === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : n) + "). If you meant to render a collection of children, use an array instead.");
  }
  function fc(e) {
    {
      var t = Le(e) || "Component";
      if (xp[t])
        return;
      xp[t] = !0, f("Functions are not valid as a React child. This may happen if you return a Component instead of <Component /> from render. Or maybe you meant to call this function rather than return it.");
    }
  }
  function ug(e) {
    var t = e._payload, n = e._init;
    return n(t);
  }
  function sg(e) {
    function t(j, F) {
      if (e) {
        var w = j.deletions;
        w === null ? (j.deletions = [F], j.flags |= Ei) : w.push(F);
      }
    }
    function n(j, F) {
      if (!e)
        return null;
      for (var w = F; w !== null; )
        t(j, w), w = w.sibling;
      return null;
    }
    function a(j, F) {
      for (var w = /* @__PURE__ */ new Map(), q = F; q !== null; )
        q.key !== null ? w.set(q.key, q) : w.set(q.index, q), q = q.sibling;
      return w;
    }
    function r(j, F) {
      var w = Wi(j, F);
      return w.index = 0, w.sibling = null, w;
    }
    function i(j, F, w) {
      if (j.index = w, !e)
        return j.flags |= dh, F;
      var q = j.alternate;
      if (q !== null) {
        var oe = q.index;
        return oe < F ? (j.flags |= Dt, F) : oe;
      } else
        return j.flags |= Dt, F;
    }
    function l(j) {
      return e && j.alternate === null && (j.flags |= Dt), j;
    }
    function o(j, F, w, q) {
      if (F === null || F.tag !== W) {
        var oe = yv(w, j.mode, q);
        return oe.return = j, oe;
      } else {
        var re = r(F, w);
        return re.return = j, re;
      }
    }
    function u(j, F, w, q) {
      var oe = w.type;
      if (oe === Fa)
        return v(j, F, w.props.children, q, w.key);
      if (F !== null && (F.elementType === oe || // Keep this check inline so it only runs on the false path:
      mN(F, w) || // Lazy types should reconcile their resolved type.
      // We need to do this after the Hot Reloading check above,
      // because hot reloading has different semantics than prod because
      // it doesn't resuspend. So we can't let the call below suspend.
      typeof oe == "object" && oe !== null && oe.$$typeof === ge && ug(oe) === F.type)) {
        var re = r(F, w.props);
        return re.ref = hu(j, F, w), re.return = j, re._debugSource = w._source, re._debugOwner = w._owner, re;
      }
      var Se = hv(w, j.mode, q);
      return Se.ref = hu(j, F, w), Se.return = j, Se;
    }
    function p(j, F, w, q) {
      if (F === null || F.tag !== M || F.stateNode.containerInfo !== w.containerInfo || F.stateNode.implementation !== w.implementation) {
        var oe = gv(w, j.mode, q);
        return oe.return = j, oe;
      } else {
        var re = r(F, w.children || []);
        return re.return = j, re;
      }
    }
    function v(j, F, w, q, oe) {
      if (F === null || F.tag !== fe) {
        var re = ri(w, j.mode, q, oe);
        return re.return = j, re;
      } else {
        var Se = r(F, w);
        return Se.return = j, Se;
      }
    }
    function x(j, F, w) {
      if (typeof F == "string" && F !== "" || typeof F == "number") {
        var q = yv("" + F, j.mode, w);
        return q.return = j, q;
      }
      if (typeof F == "object" && F !== null) {
        switch (F.$$typeof) {
          case na: {
            var oe = hv(F, j.mode, w);
            return oe.ref = hu(j, null, F), oe.return = j, oe;
          }
          case $n: {
            var re = gv(F, j.mode, w);
            return re.return = j, re;
          }
          case ge: {
            var Se = F._payload, Oe = F._init;
            return x(j, Oe(Se), w);
          }
        }
        if (Fe(F) || ba(F)) {
          var at = ri(F, j.mode, w, null);
          return at.return = j, at;
        }
        cc(j, F);
      }
      return typeof F == "function" && fc(j), null;
    }
    function E(j, F, w, q) {
      var oe = F !== null ? F.key : null;
      if (typeof w == "string" && w !== "" || typeof w == "number")
        return oe !== null ? null : o(j, F, "" + w, q);
      if (typeof w == "object" && w !== null) {
        switch (w.$$typeof) {
          case na:
            return w.key === oe ? u(j, F, w, q) : null;
          case $n:
            return w.key === oe ? p(j, F, w, q) : null;
          case ge: {
            var re = w._payload, Se = w._init;
            return E(j, F, Se(re), q);
          }
        }
        if (Fe(w) || ba(w))
          return oe !== null ? null : v(j, F, w, q, null);
        cc(j, w);
      }
      return typeof w == "function" && fc(j), null;
    }
    function O(j, F, w, q, oe) {
      if (typeof q == "string" && q !== "" || typeof q == "number") {
        var re = j.get(w) || null;
        return o(F, re, "" + q, oe);
      }
      if (typeof q == "object" && q !== null) {
        switch (q.$$typeof) {
          case na: {
            var Se = j.get(q.key === null ? w : q.key) || null;
            return u(F, Se, q, oe);
          }
          case $n: {
            var Oe = j.get(q.key === null ? w : q.key) || null;
            return p(F, Oe, q, oe);
          }
          case ge:
            var at = q._payload, Ge = q._init;
            return O(j, F, w, Ge(at), oe);
        }
        if (Fe(q) || ba(q)) {
          var St = j.get(w) || null;
          return v(F, St, q, oe, null);
        }
        cc(F, q);
      }
      return typeof q == "function" && fc(F), null;
    }
    function V(j, F, w) {
      {
        if (typeof j != "object" || j === null)
          return F;
        switch (j.$$typeof) {
          case na:
          case $n:
            og(j, w);
            var q = j.key;
            if (typeof q != "string")
              break;
            if (F === null) {
              F = /* @__PURE__ */ new Set(), F.add(q);
              break;
            }
            if (!F.has(q)) {
              F.add(q);
              break;
            }
            f("Encountered two children with the same key, `%s`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.", q);
            break;
          case ge:
            var oe = j._payload, re = j._init;
            V(re(oe), F, w);
            break;
        }
      }
      return F;
    }
    function U(j, F, w, q) {
      for (var oe = null, re = 0; re < w.length; re++) {
        var Se = w[re];
        oe = V(Se, oe, j);
      }
      for (var Oe = null, at = null, Ge = F, St = 0, We = 0, xt = null; Ge !== null && We < w.length; We++) {
        Ge.index > We ? (xt = Ge, Ge = null) : xt = Ge.sibling;
        var yn = E(j, Ge, w[We], q);
        if (yn === null) {
          Ge === null && (Ge = xt);
          break;
        }
        e && Ge && yn.alternate === null && t(j, Ge), St = i(yn, St, We), at === null ? Oe = yn : at.sibling = yn, at = yn, Ge = xt;
      }
      if (We === w.length) {
        if (n(j, Ge), tn()) {
          var sn = We;
          Ai(j, sn);
        }
        return Oe;
      }
      if (Ge === null) {
        for (; We < w.length; We++) {
          var Xn = x(j, w[We], q);
          Xn !== null && (St = i(Xn, St, We), at === null ? Oe = Xn : at.sibling = Xn, at = Xn);
        }
        if (tn()) {
          var _n = We;
          Ai(j, _n);
        }
        return Oe;
      }
      for (var On = a(j, Ge); We < w.length; We++) {
        var gn = O(On, j, We, w[We], q);
        gn !== null && (e && gn.alternate !== null && On.delete(gn.key === null ? We : gn.key), St = i(gn, St, We), at === null ? Oe = gn : at.sibling = gn, at = gn);
      }
      if (e && On.forEach(function(Jl) {
        return t(j, Jl);
      }), tn()) {
        var Tr = We;
        Ai(j, Tr);
      }
      return Oe;
    }
    function ae(j, F, w, q) {
      var oe = ba(w);
      if (typeof oe != "function")
        throw new Error("An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.");
      {
        typeof Symbol == "function" && // $FlowFixMe Flow doesn't know about toStringTag
        w[Symbol.toStringTag] === "Generator" && (bp || f("Using Generators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. Keep in mind you might need to polyfill these features for older browsers."), bp = !0), w.entries === oe && (gp || f("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), gp = !0);
        var re = oe.call(w);
        if (re)
          for (var Se = null, Oe = re.next(); !Oe.done; Oe = re.next()) {
            var at = Oe.value;
            Se = V(at, Se, j);
          }
      }
      var Ge = oe.call(w);
      if (Ge == null)
        throw new Error("An iterable object provided no iterator.");
      for (var St = null, We = null, xt = F, yn = 0, sn = 0, Xn = null, _n = Ge.next(); xt !== null && !_n.done; sn++, _n = Ge.next()) {
        xt.index > sn ? (Xn = xt, xt = null) : Xn = xt.sibling;
        var On = E(j, xt, _n.value, q);
        if (On === null) {
          xt === null && (xt = Xn);
          break;
        }
        e && xt && On.alternate === null && t(j, xt), yn = i(On, yn, sn), We === null ? St = On : We.sibling = On, We = On, xt = Xn;
      }
      if (_n.done) {
        if (n(j, xt), tn()) {
          var gn = sn;
          Ai(j, gn);
        }
        return St;
      }
      if (xt === null) {
        for (; !_n.done; sn++, _n = Ge.next()) {
          var Tr = x(j, _n.value, q);
          Tr !== null && (yn = i(Tr, yn, sn), We === null ? St = Tr : We.sibling = Tr, We = Tr);
        }
        if (tn()) {
          var Jl = sn;
          Ai(j, Jl);
        }
        return St;
      }
      for (var Wu = a(j, xt); !_n.done; sn++, _n = Ge.next()) {
        var Za = O(Wu, j, sn, _n.value, q);
        Za !== null && (e && Za.alternate !== null && Wu.delete(Za.key === null ? sn : Za.key), yn = i(Za, yn, sn), We === null ? St = Za : We.sibling = Za, We = Za);
      }
      if (e && Wu.forEach(function(M1) {
        return t(j, M1);
      }), tn()) {
        var V1 = sn;
        Ai(j, V1);
      }
      return St;
    }
    function he(j, F, w, q) {
      if (F !== null && F.tag === W) {
        n(j, F.sibling);
        var oe = r(F, w);
        return oe.return = j, oe;
      }
      n(j, F);
      var re = yv(w, j.mode, q);
      return re.return = j, re;
    }
    function pe(j, F, w, q) {
      for (var oe = w.key, re = F; re !== null; ) {
        if (re.key === oe) {
          var Se = w.type;
          if (Se === Fa) {
            if (re.tag === fe) {
              n(j, re.sibling);
              var Oe = r(re, w.props.children);
              return Oe.return = j, Oe._debugSource = w._source, Oe._debugOwner = w._owner, Oe;
            }
          } else if (re.elementType === Se || // Keep this check inline so it only runs on the false path:
          mN(re, w) || // Lazy types should reconcile their resolved type.
          // We need to do this after the Hot Reloading check above,
          // because hot reloading has different semantics than prod because
          // it doesn't resuspend. So we can't let the call below suspend.
          typeof Se == "object" && Se !== null && Se.$$typeof === ge && ug(Se) === re.type) {
            n(j, re.sibling);
            var at = r(re, w.props);
            return at.ref = hu(j, re, w), at.return = j, at._debugSource = w._source, at._debugOwner = w._owner, at;
          }
          n(j, re);
          break;
        } else
          t(j, re);
        re = re.sibling;
      }
      if (w.type === Fa) {
        var Ge = ri(w.props.children, j.mode, q, w.key);
        return Ge.return = j, Ge;
      } else {
        var St = hv(w, j.mode, q);
        return St.ref = hu(j, F, w), St.return = j, St;
      }
    }
    function Ye(j, F, w, q) {
      for (var oe = w.key, re = F; re !== null; ) {
        if (re.key === oe)
          if (re.tag === M && re.stateNode.containerInfo === w.containerInfo && re.stateNode.implementation === w.implementation) {
            n(j, re.sibling);
            var Se = r(re, w.children || []);
            return Se.return = j, Se;
          } else {
            n(j, re);
            break;
          }
        else
          t(j, re);
        re = re.sibling;
      }
      var Oe = gv(w, j.mode, q);
      return Oe.return = j, Oe;
    }
    function ze(j, F, w, q) {
      var oe = typeof w == "object" && w !== null && w.type === Fa && w.key === null;
      if (oe && (w = w.props.children), typeof w == "object" && w !== null) {
        switch (w.$$typeof) {
          case na:
            return l(pe(j, F, w, q));
          case $n:
            return l(Ye(j, F, w, q));
          case ge:
            var re = w._payload, Se = w._init;
            return ze(j, F, Se(re), q);
        }
        if (Fe(w))
          return U(j, F, w, q);
        if (ba(w))
          return ae(j, F, w, q);
        cc(j, w);
      }
      return typeof w == "string" && w !== "" || typeof w == "number" ? l(he(j, F, "" + w, q)) : (typeof w == "function" && fc(j), n(j, F));
    }
    return ze;
  }
  var Ml = sg(!0), cg = sg(!1);
  function sD(e, t) {
    if (e !== null && t.child !== e.child)
      throw new Error("Resuming work not yet implemented.");
    if (t.child !== null) {
      var n = t.child, a = Wi(n, n.pendingProps);
      for (t.child = a, a.return = t; n.sibling !== null; )
        n = n.sibling, a = a.sibling = Wi(n, n.pendingProps), a.return = t;
      a.sibling = null;
    }
  }
  function cD(e, t) {
    for (var n = e.child; n !== null; )
      Xj(n, t), n = n.sibling;
  }
  var Sp = Yr(null), Rp;
  Rp = {};
  var dc = null, Al = null, Cp = null, pc = !1;
  function mc() {
    dc = null, Al = null, Cp = null, pc = !1;
  }
  function fg() {
    pc = !0;
  }
  function dg() {
    pc = !1;
  }
  function pg(e, t, n) {
    vn(Sp, t._currentValue, e), t._currentValue = n, t._currentRenderer !== void 0 && t._currentRenderer !== null && t._currentRenderer !== Rp && f("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."), t._currentRenderer = Rp;
  }
  function Dp(e, t) {
    var n = Sp.current;
    mn(Sp, t), e._currentValue = n;
  }
  function Tp(e, t, n) {
    for (var a = e; a !== null; ) {
      var r = a.alternate;
      if (bl(a.childLanes, t) ? r !== null && !bl(r.childLanes, t) && (r.childLanes = Ae(r.childLanes, t)) : (a.childLanes = Ae(a.childLanes, t), r !== null && (r.childLanes = Ae(r.childLanes, t))), a === n)
        break;
      a = a.return;
    }
    a !== n && f("Expected to find the propagation root when scheduling context work. This error is likely caused by a bug in React. Please file an issue.");
  }
  function fD(e, t, n) {
    dD(e, t, n);
  }
  function dD(e, t, n) {
    var a = e.child;
    for (a !== null && (a.return = e); a !== null; ) {
      var r = void 0, i = a.dependencies;
      if (i !== null) {
        r = a.child;
        for (var l = i.firstContext; l !== null; ) {
          if (l.context === t) {
            if (a.tag === T) {
              var o = Mo(n), u = Er(ut, o);
              u.tag = hc;
              var p = a.updateQueue;
              if (p !== null) {
                var v = p.shared, x = v.pending;
                x === null ? u.next = u : (u.next = x.next, x.next = u), v.pending = u;
              }
            }
            a.lanes = Ae(a.lanes, n);
            var E = a.alternate;
            E !== null && (E.lanes = Ae(E.lanes, n)), Tp(a.return, n, e), i.lanes = Ae(i.lanes, n);
            break;
          }
          l = l.next;
        }
      } else if (a.tag === B)
        r = a.type === e.type ? null : a.child;
      else if (a.tag === Re) {
        var O = a.return;
        if (O === null)
          throw new Error("We just came from a parent so we must have had a parent. This is a bug in React.");
        O.lanes = Ae(O.lanes, n);
        var V = O.alternate;
        V !== null && (V.lanes = Ae(V.lanes, n)), Tp(O, n, e), r = a.sibling;
      } else
        r = a.child;
      if (r !== null)
        r.return = a;
      else
        for (r = a; r !== null; ) {
          if (r === e) {
            r = null;
            break;
          }
          var U = r.sibling;
          if (U !== null) {
            U.return = r.return, r = U;
            break;
          }
          r = r.return;
        }
      a = r;
    }
  }
  function kl(e, t) {
    dc = e, Al = null, Cp = null;
    var n = e.dependencies;
    if (n !== null) {
      var a = n.firstContext;
      a !== null && (In(n.lanes, t) && Ou(), n.firstContext = null);
    }
  }
  function Tt(e) {
    pc && f("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
    var t = e._currentValue;
    if (Cp !== e) {
      var n = {
        context: e,
        memoizedValue: t,
        next: null
      };
      if (Al === null) {
        if (dc === null)
          throw new Error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
        Al = n, dc.dependencies = {
          lanes: Y,
          firstContext: n
        };
      } else
        Al = Al.next = n;
    }
    return t;
  }
  var Hi = null;
  function jp(e) {
    Hi === null ? Hi = [e] : Hi.push(e);
  }
  function pD() {
    if (Hi !== null) {
      for (var e = 0; e < Hi.length; e++) {
        var t = Hi[e], n = t.interleaved;
        if (n !== null) {
          t.interleaved = null;
          var a = n.next, r = t.pending;
          if (r !== null) {
            var i = r.next;
            r.next = a, n.next = i;
          }
          t.pending = n;
        }
      }
      Hi = null;
    }
  }
  function mg(e, t, n, a) {
    var r = t.interleaved;
    return r === null ? (n.next = n, jp(t)) : (n.next = r.next, r.next = n), t.interleaved = n, vc(e, a);
  }
  function mD(e, t, n, a) {
    var r = t.interleaved;
    r === null ? (n.next = n, jp(t)) : (n.next = r.next, r.next = n), t.interleaved = n;
  }
  function vD(e, t, n, a) {
    var r = t.interleaved;
    return r === null ? (n.next = n, jp(t)) : (n.next = r.next, r.next = n), t.interleaved = n, vc(e, a);
  }
  function Un(e, t) {
    return vc(e, t);
  }
  var hD = vc;
  function vc(e, t) {
    e.lanes = Ae(e.lanes, t);
    var n = e.alternate;
    n !== null && (n.lanes = Ae(n.lanes, t)), n === null && (e.flags & (Dt | fr)) !== Ee && cN(e);
    for (var a = e, r = e.return; r !== null; )
      r.childLanes = Ae(r.childLanes, t), n = r.alternate, n !== null ? n.childLanes = Ae(n.childLanes, t) : (r.flags & (Dt | fr)) !== Ee && cN(e), a = r, r = r.return;
    if (a.tag === S) {
      var i = a.stateNode;
      return i;
    } else
      return null;
  }
  var vg = 0, hg = 1, hc = 2, wp = 3, yc = !1, _p, gc;
  _p = !1, gc = null;
  function Op(e) {
    var t = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: {
        pending: null,
        interleaved: null,
        lanes: Y
      },
      effects: null
    };
    e.updateQueue = t;
  }
  function yg(e, t) {
    var n = t.updateQueue, a = e.updateQueue;
    if (n === a) {
      var r = {
        baseState: a.baseState,
        firstBaseUpdate: a.firstBaseUpdate,
        lastBaseUpdate: a.lastBaseUpdate,
        shared: a.shared,
        effects: a.effects
      };
      t.updateQueue = r;
    }
  }
  function Er(e, t) {
    var n = {
      eventTime: e,
      lane: t,
      tag: vg,
      payload: null,
      callback: null,
      next: null
    };
    return n;
  }
  function Wr(e, t, n) {
    var a = e.updateQueue;
    if (a === null)
      return null;
    var r = a.shared;
    if (gc === r && !_p && (f("An update (setState, replaceState, or forceUpdate) was scheduled from inside an update function. Update functions should be pure, with zero side-effects. Consider using componentDidUpdate or a callback."), _p = !0), mj()) {
      var i = r.pending;
      return i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, hD(e, n);
    } else
      return vD(e, r, t, n);
  }
  function bc(e, t, n) {
    var a = t.updateQueue;
    if (a !== null) {
      var r = a.shared;
      if (_h(n)) {
        var i = r.lanes;
        i = Lh(i, e.pendingLanes);
        var l = Ae(i, n);
        r.lanes = l, Sd(e, l);
      }
    }
  }
  function Lp(e, t) {
    var n = e.updateQueue, a = e.alternate;
    if (a !== null) {
      var r = a.updateQueue;
      if (n === r) {
        var i = null, l = null, o = n.firstBaseUpdate;
        if (o !== null) {
          var u = o;
          do {
            var p = {
              eventTime: u.eventTime,
              lane: u.lane,
              tag: u.tag,
              payload: u.payload,
              callback: u.callback,
              next: null
            };
            l === null ? i = l = p : (l.next = p, l = p), u = u.next;
          } while (u !== null);
          l === null ? i = l = t : (l.next = t, l = t);
        } else
          i = l = t;
        n = {
          baseState: r.baseState,
          firstBaseUpdate: i,
          lastBaseUpdate: l,
          shared: r.shared,
          effects: r.effects
        }, e.updateQueue = n;
        return;
      }
    }
    var v = n.lastBaseUpdate;
    v === null ? n.firstBaseUpdate = t : v.next = t, n.lastBaseUpdate = t;
  }
  function yD(e, t, n, a, r, i) {
    switch (n.tag) {
      case hg: {
        var l = n.payload;
        if (typeof l == "function") {
          fg();
          var o = l.call(i, a, r);
          {
            if (e.mode & Et) {
              qt(!0);
              try {
                l.call(i, a, r);
              } finally {
                qt(!1);
              }
            }
            dg();
          }
          return o;
        }
        return l;
      }
      case wp:
        e.flags = e.flags & ~Dn | Xe;
      case vg: {
        var u = n.payload, p;
        if (typeof u == "function") {
          fg(), p = u.call(i, a, r);
          {
            if (e.mode & Et) {
              qt(!0);
              try {
                u.call(i, a, r);
              } finally {
                qt(!1);
              }
            }
            dg();
          }
        } else
          p = u;
        return p == null ? a : Ue({}, a, p);
      }
      case hc:
        return yc = !0, a;
    }
    return a;
  }
  function Nc(e, t, n, a) {
    var r = e.updateQueue;
    yc = !1, gc = r.shared;
    var i = r.firstBaseUpdate, l = r.lastBaseUpdate, o = r.shared.pending;
    if (o !== null) {
      r.shared.pending = null;
      var u = o, p = u.next;
      u.next = null, l === null ? i = p : l.next = p, l = u;
      var v = e.alternate;
      if (v !== null) {
        var x = v.updateQueue, E = x.lastBaseUpdate;
        E !== l && (E === null ? x.firstBaseUpdate = p : E.next = p, x.lastBaseUpdate = u);
      }
    }
    if (i !== null) {
      var O = r.baseState, V = Y, U = null, ae = null, he = null, pe = i;
      do {
        var Ye = pe.lane, ze = pe.eventTime;
        if (bl(a, Ye)) {
          if (he !== null) {
            var F = {
              eventTime: ze,
              // This update is going to be committed so we never want uncommit
              // it. Using NoLane works because 0 is a subset of all bitmasks, so
              // this will never be skipped by the check above.
              lane: Gt,
              tag: pe.tag,
              payload: pe.payload,
              callback: pe.callback,
              next: null
            };
            he = he.next = F;
          }
          O = yD(e, r, pe, O, t, n);
          var w = pe.callback;
          if (w !== null && // If the update was already committed, we should not queue its
          // callback again.
          pe.lane !== Gt) {
            e.flags |= fh;
            var q = r.effects;
            q === null ? r.effects = [pe] : q.push(pe);
          }
        } else {
          var j = {
            eventTime: ze,
            lane: Ye,
            tag: pe.tag,
            payload: pe.payload,
            callback: pe.callback,
            next: null
          };
          he === null ? (ae = he = j, U = O) : he = he.next = j, V = Ae(V, Ye);
        }
        if (pe = pe.next, pe === null) {
          if (o = r.shared.pending, o === null)
            break;
          var oe = o, re = oe.next;
          oe.next = null, pe = re, r.lastBaseUpdate = oe, r.shared.pending = null;
        }
      } while (!0);
      he === null && (U = O), r.baseState = U, r.firstBaseUpdate = ae, r.lastBaseUpdate = he;
      var Se = r.shared.interleaved;
      if (Se !== null) {
        var Oe = Se;
        do
          V = Ae(V, Oe.lane), Oe = Oe.next;
        while (Oe !== Se);
      } else i === null && (r.shared.lanes = Y);
      $u(V), e.lanes = V, e.memoizedState = O;
    }
    gc = null;
  }
  function gD(e, t) {
    if (typeof e != "function")
      throw new Error("Invalid argument passed as callback. Expected a function. Instead " + ("received: " + e));
    e.call(t);
  }
  function gg() {
    yc = !1;
  }
  function Ec() {
    return yc;
  }
  function bg(e, t, n) {
    var a = t.effects;
    if (t.effects = null, a !== null)
      for (var r = 0; r < a.length; r++) {
        var i = a[r], l = i.callback;
        l !== null && (i.callback = null, gD(l, n));
      }
  }
  var yu = {}, Qr = Yr(yu), gu = Yr(yu), xc = Yr(yu);
  function Sc(e) {
    if (e === yu)
      throw new Error("Expected host context to exist. This error is likely caused by a bug in React. Please file an issue.");
    return e;
  }
  function Ng() {
    var e = Sc(xc.current);
    return e;
  }
  function Vp(e, t) {
    vn(xc, t, e), vn(gu, e, e), vn(Qr, yu, e);
    var n = AC(t);
    mn(Qr, e), vn(Qr, n, e);
  }
  function Ul(e) {
    mn(Qr, e), mn(gu, e), mn(xc, e);
  }
  function Mp() {
    var e = Sc(Qr.current);
    return e;
  }
  function Eg(e) {
    Sc(xc.current);
    var t = Sc(Qr.current), n = kC(t, e.type);
    t !== n && (vn(gu, e, e), vn(Qr, n, e));
  }
  function Ap(e) {
    gu.current === e && (mn(Qr, e), mn(gu, e));
  }
  var bD = 0, xg = 1, Sg = 1, bu = 2, Da = Yr(bD);
  function kp(e, t) {
    return (e & t) !== 0;
  }
  function Fl(e) {
    return e & xg;
  }
  function Up(e, t) {
    return e & xg | t;
  }
  function ND(e, t) {
    return e | t;
  }
  function Kr(e, t) {
    vn(Da, t, e);
  }
  function zl(e) {
    mn(Da, e);
  }
  function ED(e, t) {
    var n = e.memoizedState;
    return n !== null ? n.dehydrated !== null : (e.memoizedProps, !0);
  }
  function Rc(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === X) {
        var n = t.memoizedState;
        if (n !== null) {
          var a = n.dehydrated;
          if (a === null || Hy(a) || tp(a))
            return t;
        }
      } else if (t.tag === ye && // revealOrder undefined can't be trusted because it don't
      // keep track of whether it suspended or not.
      t.memoizedProps.revealOrder !== void 0) {
        var r = (t.flags & Xe) !== Ee;
        if (r)
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
  var Fn = (
    /*   */
    0
  ), Lt = (
    /* */
    1
  ), qa = (
    /*  */
    2
  ), Vt = (
    /*    */
    4
  ), nn = (
    /*   */
    8
  ), Fp = [];
  function zp() {
    for (var e = 0; e < Fp.length; e++) {
      var t = Fp[e];
      t._workInProgressVersionPrimary = null;
    }
    Fp.length = 0;
  }
  function xD(e, t) {
    var n = t._getVersion, a = n(t._source);
    e.mutableSourceEagerHydrationData == null ? e.mutableSourceEagerHydrationData = [t, a] : e.mutableSourceEagerHydrationData.push(t, a);
  }
  var le = h.ReactCurrentDispatcher, Nu = h.ReactCurrentBatchConfig, Hp, Hl;
  Hp = /* @__PURE__ */ new Set();
  var Bi = Y, nt = null, Mt = null, At = null, Cc = !1, Eu = !1, xu = 0, SD = 0, RD = 25, H = null, oa = null, Xr = -1, Bp = !1;
  function Je() {
    {
      var e = H;
      oa === null ? oa = [e] : oa.push(e);
    }
  }
  function Z() {
    {
      var e = H;
      oa !== null && (Xr++, oa[Xr] !== e && CD(e));
    }
  }
  function Bl(e) {
    e != null && !Fe(e) && f("%s received a final argument that is not an array (instead, received `%s`). When specified, the final argument must be an array.", H, typeof e);
  }
  function CD(e) {
    {
      var t = Le(nt);
      if (!Hp.has(t) && (Hp.add(t), oa !== null)) {
        for (var n = "", a = 30, r = 0; r <= Xr; r++) {
          for (var i = oa[r], l = r === Xr ? e : i, o = r + 1 + ". " + i; o.length < a; )
            o += " ";
          o += l + `
`, n += o;
        }
        f(`React has detected a change in the order of Hooks called by %s. This will lead to bugs and errors if not fixed. For more information, read the Rules of Hooks: https://reactjs.org/link/rules-of-hooks

   Previous render            Next render
   ------------------------------------------------------
%s   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
`, t, n);
      }
    }
  }
  function hn() {
    throw new Error(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`);
  }
  function Pp(e, t) {
    if (Bp)
      return !1;
    if (t === null)
      return f("%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.", H), !1;
    e.length !== t.length && f(`The final argument passed to %s changed size between renders. The order and size of this array must remain constant.

Previous: %s
Incoming: %s`, H, "[" + t.join(", ") + "]", "[" + e.join(", ") + "]");
    for (var n = 0; n < t.length && n < e.length; n++)
      if (!Wn(e[n], t[n]))
        return !1;
    return !0;
  }
  function Pl(e, t, n, a, r, i) {
    Bi = i, nt = t, oa = e !== null ? e._debugHookTypes : null, Xr = -1, Bp = e !== null && e.type !== t.type, t.memoizedState = null, t.updateQueue = null, t.lanes = Y, e !== null && e.memoizedState !== null ? le.current = Ig : oa !== null ? le.current = Yg : le.current = $g;
    var l = n(a, r);
    if (Eu) {
      var o = 0;
      do {
        if (Eu = !1, xu = 0, o >= RD)
          throw new Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
        o += 1, Bp = !1, Mt = null, At = null, t.updateQueue = null, Xr = -1, le.current = qg, l = n(a, r);
      } while (Eu);
    }
    le.current = Fc, t._debugHookTypes = oa;
    var u = Mt !== null && Mt.next !== null;
    if (Bi = Y, nt = null, Mt = null, At = null, H = null, oa = null, Xr = -1, e !== null && (e.flags & dr) !== (t.flags & dr) && // Disable this warning in legacy mode, because legacy Suspense is weird
    // and creates false positives. To make this work in legacy mode, we'd
    // need to mark fibers that commit in an incomplete state, somehow. For
    // now I'll disable the warning that most of the bugs that would trigger
    // it are either exclusive to concurrent mode or exist in both.
    (e.mode & Pe) !== be && f("Internal React error: Expected static flag was missing. Please notify the React team."), Cc = !1, u)
      throw new Error("Rendered fewer hooks than expected. This may be caused by an accidental early return statement.");
    return l;
  }
  function $l() {
    var e = xu !== 0;
    return xu = 0, e;
  }
  function Rg(e, t, n) {
    t.updateQueue = e.updateQueue, (t.mode & Pa) !== be ? t.flags &= -50333701 : t.flags &= -2053, e.lanes = Ds(e.lanes, n);
  }
  function Cg() {
    if (le.current = Fc, Cc) {
      for (var e = nt.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      Cc = !1;
    }
    Bi = Y, nt = null, Mt = null, At = null, oa = null, Xr = -1, H = null, Fg = !1, Eu = !1, xu = 0;
  }
  function Ga() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return At === null ? nt.memoizedState = At = e : At = At.next = e, At;
  }
  function ua() {
    var e;
    if (Mt === null) {
      var t = nt.alternate;
      t !== null ? e = t.memoizedState : e = null;
    } else
      e = Mt.next;
    var n;
    if (At === null ? n = nt.memoizedState : n = At.next, n !== null)
      At = n, n = At.next, Mt = e;
    else {
      if (e === null)
        throw new Error("Rendered more hooks than during the previous render.");
      Mt = e;
      var a = {
        memoizedState: Mt.memoizedState,
        baseState: Mt.baseState,
        baseQueue: Mt.baseQueue,
        queue: Mt.queue,
        next: null
      };
      At === null ? nt.memoizedState = At = a : At = At.next = a;
    }
    return At;
  }
  function Dg() {
    return {
      lastEffect: null,
      stores: null
    };
  }
  function $p(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function Yp(e, t, n) {
    var a = Ga(), r;
    n !== void 0 ? r = n(t) : r = t, a.memoizedState = a.baseState = r;
    var i = {
      pending: null,
      interleaved: null,
      lanes: Y,
      dispatch: null,
      lastRenderedReducer: e,
      lastRenderedState: r
    };
    a.queue = i;
    var l = i.dispatch = wD.bind(null, nt, i);
    return [a.memoizedState, l];
  }
  function Ip(e, t, n) {
    var a = ua(), r = a.queue;
    if (r === null)
      throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");
    r.lastRenderedReducer = e;
    var i = Mt, l = i.baseQueue, o = r.pending;
    if (o !== null) {
      if (l !== null) {
        var u = l.next, p = o.next;
        l.next = p, o.next = u;
      }
      i.baseQueue !== l && f("Internal error: Expected work-in-progress queue to be a clone. This is a bug in React."), i.baseQueue = l = o, r.pending = null;
    }
    if (l !== null) {
      var v = l.next, x = i.baseState, E = null, O = null, V = null, U = v;
      do {
        var ae = U.lane;
        if (bl(Bi, ae)) {
          if (V !== null) {
            var pe = {
              // This update is going to be committed so we never want uncommit
              // it. Using NoLane works because 0 is a subset of all bitmasks, so
              // this will never be skipped by the check above.
              lane: Gt,
              action: U.action,
              hasEagerState: U.hasEagerState,
              eagerState: U.eagerState,
              next: null
            };
            V = V.next = pe;
          }
          if (U.hasEagerState)
            x = U.eagerState;
          else {
            var Ye = U.action;
            x = e(x, Ye);
          }
        } else {
          var he = {
            lane: ae,
            action: U.action,
            hasEagerState: U.hasEagerState,
            eagerState: U.eagerState,
            next: null
          };
          V === null ? (O = V = he, E = x) : V = V.next = he, nt.lanes = Ae(nt.lanes, ae), $u(ae);
        }
        U = U.next;
      } while (U !== null && U !== v);
      V === null ? E = x : V.next = O, Wn(x, a.memoizedState) || Ou(), a.memoizedState = x, a.baseState = E, a.baseQueue = V, r.lastRenderedState = x;
    }
    var ze = r.interleaved;
    if (ze !== null) {
      var j = ze;
      do {
        var F = j.lane;
        nt.lanes = Ae(nt.lanes, F), $u(F), j = j.next;
      } while (j !== ze);
    } else l === null && (r.lanes = Y);
    var w = r.dispatch;
    return [a.memoizedState, w];
  }
  function qp(e, t, n) {
    var a = ua(), r = a.queue;
    if (r === null)
      throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");
    r.lastRenderedReducer = e;
    var i = r.dispatch, l = r.pending, o = a.memoizedState;
    if (l !== null) {
      r.pending = null;
      var u = l.next, p = u;
      do {
        var v = p.action;
        o = e(o, v), p = p.next;
      } while (p !== u);
      Wn(o, a.memoizedState) || Ou(), a.memoizedState = o, a.baseQueue === null && (a.baseState = o), r.lastRenderedState = o;
    }
    return [o, i];
  }
  function E_(e, t, n) {
  }
  function x_(e, t, n) {
  }
  function Gp(e, t, n) {
    var a = nt, r = Ga(), i, l = tn();
    if (l) {
      if (n === void 0)
        throw new Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
      i = n(), Hl || i !== n() && (f("The result of getServerSnapshot should be cached to avoid an infinite loop"), Hl = !0);
    } else {
      if (i = t(), !Hl) {
        var o = t();
        Wn(i, o) || (f("The result of getSnapshot should be cached to avoid an infinite loop"), Hl = !0);
      }
      var u = af();
      if (u === null)
        throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
      Cs(u, Bi) || Tg(a, t, i);
    }
    r.memoizedState = i;
    var p = {
      value: i,
      getSnapshot: t
    };
    return r.queue = p, _c(wg.bind(null, a, p, e), [e]), a.flags |= Ar, Su(Lt | nn, jg.bind(null, a, p, i, t), void 0, null), i;
  }
  function Dc(e, t, n) {
    var a = nt, r = ua(), i = t();
    if (!Hl) {
      var l = t();
      Wn(i, l) || (f("The result of getSnapshot should be cached to avoid an infinite loop"), Hl = !0);
    }
    var o = r.memoizedState, u = !Wn(o, i);
    u && (r.memoizedState = i, Ou());
    var p = r.queue;
    if (Cu(wg.bind(null, a, p, e), [e]), p.getSnapshot !== t || u || // Check if the susbcribe function changed. We can save some memory by
    // checking whether we scheduled a subscription effect above.
    At !== null && At.memoizedState.tag & Lt) {
      a.flags |= Ar, Su(Lt | nn, jg.bind(null, a, p, i, t), void 0, null);
      var v = af();
      if (v === null)
        throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
      Cs(v, Bi) || Tg(a, t, i);
    }
    return i;
  }
  function Tg(e, t, n) {
    e.flags |= $f;
    var a = {
      getSnapshot: t,
      value: n
    }, r = nt.updateQueue;
    if (r === null)
      r = Dg(), nt.updateQueue = r, r.stores = [a];
    else {
      var i = r.stores;
      i === null ? r.stores = [a] : i.push(a);
    }
  }
  function jg(e, t, n, a) {
    t.value = n, t.getSnapshot = a, _g(t) && Og(e);
  }
  function wg(e, t, n) {
    var a = function() {
      _g(t) && Og(e);
    };
    return n(a);
  }
  function _g(e) {
    var t = e.getSnapshot, n = e.value;
    try {
      var a = t();
      return !Wn(n, a);
    } catch {
      return !0;
    }
  }
  function Og(e) {
    var t = Un(e, Te);
    t !== null && zt(t, e, Te, ut);
  }
  function Tc(e) {
    var t = Ga();
    typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e;
    var n = {
      pending: null,
      interleaved: null,
      lanes: Y,
      dispatch: null,
      lastRenderedReducer: $p,
      lastRenderedState: e
    };
    t.queue = n;
    var a = n.dispatch = _D.bind(null, nt, n);
    return [t.memoizedState, a];
  }
  function Wp(e) {
    return Ip($p);
  }
  function Qp(e) {
    return qp($p);
  }
  function Su(e, t, n, a) {
    var r = {
      tag: e,
      create: t,
      destroy: n,
      deps: a,
      // Circular
      next: null
    }, i = nt.updateQueue;
    if (i === null)
      i = Dg(), nt.updateQueue = i, i.lastEffect = r.next = r;
    else {
      var l = i.lastEffect;
      if (l === null)
        i.lastEffect = r.next = r;
      else {
        var o = l.next;
        l.next = r, r.next = o, i.lastEffect = r;
      }
    }
    return r;
  }
  function Kp(e) {
    var t = Ga();
    {
      var n = {
        current: e
      };
      return t.memoizedState = n, n;
    }
  }
  function jc(e) {
    var t = ua();
    return t.memoizedState;
  }
  function Ru(e, t, n, a) {
    var r = Ga(), i = a === void 0 ? null : a;
    nt.flags |= e, r.memoizedState = Su(Lt | t, n, void 0, i);
  }
  function wc(e, t, n, a) {
    var r = ua(), i = a === void 0 ? null : a, l = void 0;
    if (Mt !== null) {
      var o = Mt.memoizedState;
      if (l = o.destroy, i !== null) {
        var u = o.deps;
        if (Pp(i, u)) {
          r.memoizedState = Su(t, n, l, i);
          return;
        }
      }
    }
    nt.flags |= e, r.memoizedState = Su(Lt | t, n, l, i);
  }
  function _c(e, t) {
    return (nt.mode & Pa) !== be ? Ru(Gf | Ar | qf, nn, e, t) : Ru(Ar | qf, nn, e, t);
  }
  function Cu(e, t) {
    return wc(Ar, nn, e, t);
  }
  function Xp(e, t) {
    return Ru(Ke, qa, e, t);
  }
  function Oc(e, t) {
    return wc(Ke, qa, e, t);
  }
  function Jp(e, t) {
    var n = Ke;
    return n |= Ri, (nt.mode & Pa) !== be && (n |= kr), Ru(n, Vt, e, t);
  }
  function Lc(e, t) {
    return wc(Ke, Vt, e, t);
  }
  function Lg(e, t) {
    if (typeof t == "function") {
      var n = t, a = e();
      return n(a), function() {
        n(null);
      };
    } else if (t != null) {
      var r = t;
      r.hasOwnProperty("current") || f("Expected useImperativeHandle() first argument to either be a ref callback or React.createRef() object. Instead received: %s.", "an object with keys {" + Object.keys(r).join(", ") + "}");
      var i = e();
      return r.current = i, function() {
        r.current = null;
      };
    }
  }
  function Zp(e, t, n) {
    typeof t != "function" && f("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t !== null ? typeof t : "null");
    var a = n != null ? n.concat([e]) : null, r = Ke;
    return r |= Ri, (nt.mode & Pa) !== be && (r |= kr), Ru(r, Vt, Lg.bind(null, t, e), a);
  }
  function Vc(e, t, n) {
    typeof t != "function" && f("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t !== null ? typeof t : "null");
    var a = n != null ? n.concat([e]) : null;
    return wc(Ke, Vt, Lg.bind(null, t, e), a);
  }
  function DD(e, t) {
  }
  var Mc = DD;
  function em(e, t) {
    var n = Ga(), a = t === void 0 ? null : t;
    return n.memoizedState = [e, a], e;
  }
  function Ac(e, t) {
    var n = ua(), a = t === void 0 ? null : t, r = n.memoizedState;
    if (r !== null && a !== null) {
      var i = r[1];
      if (Pp(a, i))
        return r[0];
    }
    return n.memoizedState = [e, a], e;
  }
  function tm(e, t) {
    var n = Ga(), a = t === void 0 ? null : t, r = e();
    return n.memoizedState = [r, a], r;
  }
  function kc(e, t) {
    var n = ua(), a = t === void 0 ? null : t, r = n.memoizedState;
    if (r !== null && a !== null) {
      var i = r[1];
      if (Pp(a, i))
        return r[0];
    }
    var l = e();
    return n.memoizedState = [l, a], l;
  }
  function nm(e) {
    var t = Ga();
    return t.memoizedState = e, e;
  }
  function Vg(e) {
    var t = ua(), n = Mt, a = n.memoizedState;
    return Ag(t, a, e);
  }
  function Mg(e) {
    var t = ua();
    if (Mt === null)
      return t.memoizedState = e, e;
    var n = Mt.memoizedState;
    return Ag(t, n, e);
  }
  function Ag(e, t, n) {
    var a = !fS(Bi);
    if (a) {
      if (!Wn(n, t)) {
        var r = Oh();
        nt.lanes = Ae(nt.lanes, r), $u(r), e.baseState = !0;
      }
      return t;
    } else
      return e.baseState && (e.baseState = !1, Ou()), e.memoizedState = n, n;
  }
  function TD(e, t, n) {
    var a = xa();
    Wt(NS(a, mr)), e(!0);
    var r = Nu.transition;
    Nu.transition = {};
    var i = Nu.transition;
    Nu.transition._updatedFibers = /* @__PURE__ */ new Set();
    try {
      e(!1), t();
    } finally {
      if (Wt(a), Nu.transition = r, r === null && i._updatedFibers) {
        var l = i._updatedFibers.size;
        l > 10 && R("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), i._updatedFibers.clear();
      }
    }
  }
  function am() {
    var e = Tc(!1), t = e[0], n = e[1], a = TD.bind(null, n), r = Ga();
    return r.memoizedState = a, [t, a];
  }
  function kg() {
    var e = Wp(), t = e[0], n = ua(), a = n.memoizedState;
    return [t, a];
  }
  function Ug() {
    var e = Qp(), t = e[0], n = ua(), a = n.memoizedState;
    return [t, a];
  }
  var Fg = !1;
  function jD() {
    return Fg;
  }
  function rm() {
    var e = Ga(), t = af(), n = t.identifierPrefix, a;
    if (tn()) {
      var r = I0();
      a = ":" + n + "R" + r;
      var i = xu++;
      i > 0 && (a += "H" + i.toString(32)), a += ":";
    } else {
      var l = SD++;
      a = ":" + n + "r" + l.toString(32) + ":";
    }
    return e.memoizedState = a, a;
  }
  function Uc() {
    var e = ua(), t = e.memoizedState;
    return t;
  }
  function wD(e, t, n) {
    typeof arguments[3] == "function" && f("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
    var a = ni(e), r = {
      lane: a,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (zg(e))
      Hg(t, r);
    else {
      var i = mg(e, t, r, a);
      if (i !== null) {
        var l = wn();
        zt(i, e, a, l), Bg(i, t, a);
      }
    }
    Pg(e, a);
  }
  function _D(e, t, n) {
    typeof arguments[3] == "function" && f("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
    var a = ni(e), r = {
      lane: a,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (zg(e))
      Hg(t, r);
    else {
      var i = e.alternate;
      if (e.lanes === Y && (i === null || i.lanes === Y)) {
        var l = t.lastRenderedReducer;
        if (l !== null) {
          var o;
          o = le.current, le.current = Ta;
          try {
            var u = t.lastRenderedState, p = l(u, n);
            if (r.hasEagerState = !0, r.eagerState = p, Wn(p, u)) {
              mD(e, t, r, a);
              return;
            }
          } catch {
          } finally {
            le.current = o;
          }
        }
      }
      var v = mg(e, t, r, a);
      if (v !== null) {
        var x = wn();
        zt(v, e, a, x), Bg(v, t, a);
      }
    }
    Pg(e, a);
  }
  function zg(e) {
    var t = e.alternate;
    return e === nt || t !== null && t === nt;
  }
  function Hg(e, t) {
    Eu = Cc = !0;
    var n = e.pending;
    n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
  }
  function Bg(e, t, n) {
    if (_h(n)) {
      var a = t.lanes;
      a = Lh(a, e.pendingLanes);
      var r = Ae(a, n);
      t.lanes = r, Sd(e, r);
    }
  }
  function Pg(e, t, n) {
    Jf(e, t);
  }
  var Fc = {
    readContext: Tt,
    useCallback: hn,
    useContext: hn,
    useEffect: hn,
    useImperativeHandle: hn,
    useInsertionEffect: hn,
    useLayoutEffect: hn,
    useMemo: hn,
    useReducer: hn,
    useRef: hn,
    useState: hn,
    useDebugValue: hn,
    useDeferredValue: hn,
    useTransition: hn,
    useMutableSource: hn,
    useSyncExternalStore: hn,
    useId: hn,
    unstable_isNewReconciler: jt
  }, $g = null, Yg = null, Ig = null, qg = null, Wa = null, Ta = null, zc = null;
  {
    var im = function() {
      f("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
    }, je = function() {
      f("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://reactjs.org/link/rules-of-hooks");
    };
    $g = {
      readContext: function(e) {
        return Tt(e);
      },
      useCallback: function(e, t) {
        return H = "useCallback", Je(), Bl(t), em(e, t);
      },
      useContext: function(e) {
        return H = "useContext", Je(), Tt(e);
      },
      useEffect: function(e, t) {
        return H = "useEffect", Je(), Bl(t), _c(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return H = "useImperativeHandle", Je(), Bl(n), Zp(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return H = "useInsertionEffect", Je(), Bl(t), Xp(e, t);
      },
      useLayoutEffect: function(e, t) {
        return H = "useLayoutEffect", Je(), Bl(t), Jp(e, t);
      },
      useMemo: function(e, t) {
        H = "useMemo", Je(), Bl(t);
        var n = le.current;
        le.current = Wa;
        try {
          return tm(e, t);
        } finally {
          le.current = n;
        }
      },
      useReducer: function(e, t, n) {
        H = "useReducer", Je();
        var a = le.current;
        le.current = Wa;
        try {
          return Yp(e, t, n);
        } finally {
          le.current = a;
        }
      },
      useRef: function(e) {
        return H = "useRef", Je(), Kp(e);
      },
      useState: function(e) {
        H = "useState", Je();
        var t = le.current;
        le.current = Wa;
        try {
          return Tc(e);
        } finally {
          le.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return H = "useDebugValue", Je(), void 0;
      },
      useDeferredValue: function(e) {
        return H = "useDeferredValue", Je(), nm(e);
      },
      useTransition: function() {
        return H = "useTransition", Je(), am();
      },
      useMutableSource: function(e, t, n) {
        return H = "useMutableSource", Je(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return H = "useSyncExternalStore", Je(), Gp(e, t, n);
      },
      useId: function() {
        return H = "useId", Je(), rm();
      },
      unstable_isNewReconciler: jt
    }, Yg = {
      readContext: function(e) {
        return Tt(e);
      },
      useCallback: function(e, t) {
        return H = "useCallback", Z(), em(e, t);
      },
      useContext: function(e) {
        return H = "useContext", Z(), Tt(e);
      },
      useEffect: function(e, t) {
        return H = "useEffect", Z(), _c(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return H = "useImperativeHandle", Z(), Zp(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return H = "useInsertionEffect", Z(), Xp(e, t);
      },
      useLayoutEffect: function(e, t) {
        return H = "useLayoutEffect", Z(), Jp(e, t);
      },
      useMemo: function(e, t) {
        H = "useMemo", Z();
        var n = le.current;
        le.current = Wa;
        try {
          return tm(e, t);
        } finally {
          le.current = n;
        }
      },
      useReducer: function(e, t, n) {
        H = "useReducer", Z();
        var a = le.current;
        le.current = Wa;
        try {
          return Yp(e, t, n);
        } finally {
          le.current = a;
        }
      },
      useRef: function(e) {
        return H = "useRef", Z(), Kp(e);
      },
      useState: function(e) {
        H = "useState", Z();
        var t = le.current;
        le.current = Wa;
        try {
          return Tc(e);
        } finally {
          le.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return H = "useDebugValue", Z(), void 0;
      },
      useDeferredValue: function(e) {
        return H = "useDeferredValue", Z(), nm(e);
      },
      useTransition: function() {
        return H = "useTransition", Z(), am();
      },
      useMutableSource: function(e, t, n) {
        return H = "useMutableSource", Z(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return H = "useSyncExternalStore", Z(), Gp(e, t, n);
      },
      useId: function() {
        return H = "useId", Z(), rm();
      },
      unstable_isNewReconciler: jt
    }, Ig = {
      readContext: function(e) {
        return Tt(e);
      },
      useCallback: function(e, t) {
        return H = "useCallback", Z(), Ac(e, t);
      },
      useContext: function(e) {
        return H = "useContext", Z(), Tt(e);
      },
      useEffect: function(e, t) {
        return H = "useEffect", Z(), Cu(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return H = "useImperativeHandle", Z(), Vc(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return H = "useInsertionEffect", Z(), Oc(e, t);
      },
      useLayoutEffect: function(e, t) {
        return H = "useLayoutEffect", Z(), Lc(e, t);
      },
      useMemo: function(e, t) {
        H = "useMemo", Z();
        var n = le.current;
        le.current = Ta;
        try {
          return kc(e, t);
        } finally {
          le.current = n;
        }
      },
      useReducer: function(e, t, n) {
        H = "useReducer", Z();
        var a = le.current;
        le.current = Ta;
        try {
          return Ip(e, t, n);
        } finally {
          le.current = a;
        }
      },
      useRef: function(e) {
        return H = "useRef", Z(), jc();
      },
      useState: function(e) {
        H = "useState", Z();
        var t = le.current;
        le.current = Ta;
        try {
          return Wp(e);
        } finally {
          le.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return H = "useDebugValue", Z(), Mc();
      },
      useDeferredValue: function(e) {
        return H = "useDeferredValue", Z(), Vg(e);
      },
      useTransition: function() {
        return H = "useTransition", Z(), kg();
      },
      useMutableSource: function(e, t, n) {
        return H = "useMutableSource", Z(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return H = "useSyncExternalStore", Z(), Dc(e, t);
      },
      useId: function() {
        return H = "useId", Z(), Uc();
      },
      unstable_isNewReconciler: jt
    }, qg = {
      readContext: function(e) {
        return Tt(e);
      },
      useCallback: function(e, t) {
        return H = "useCallback", Z(), Ac(e, t);
      },
      useContext: function(e) {
        return H = "useContext", Z(), Tt(e);
      },
      useEffect: function(e, t) {
        return H = "useEffect", Z(), Cu(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return H = "useImperativeHandle", Z(), Vc(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return H = "useInsertionEffect", Z(), Oc(e, t);
      },
      useLayoutEffect: function(e, t) {
        return H = "useLayoutEffect", Z(), Lc(e, t);
      },
      useMemo: function(e, t) {
        H = "useMemo", Z();
        var n = le.current;
        le.current = zc;
        try {
          return kc(e, t);
        } finally {
          le.current = n;
        }
      },
      useReducer: function(e, t, n) {
        H = "useReducer", Z();
        var a = le.current;
        le.current = zc;
        try {
          return qp(e, t, n);
        } finally {
          le.current = a;
        }
      },
      useRef: function(e) {
        return H = "useRef", Z(), jc();
      },
      useState: function(e) {
        H = "useState", Z();
        var t = le.current;
        le.current = zc;
        try {
          return Qp(e);
        } finally {
          le.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return H = "useDebugValue", Z(), Mc();
      },
      useDeferredValue: function(e) {
        return H = "useDeferredValue", Z(), Mg(e);
      },
      useTransition: function() {
        return H = "useTransition", Z(), Ug();
      },
      useMutableSource: function(e, t, n) {
        return H = "useMutableSource", Z(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return H = "useSyncExternalStore", Z(), Dc(e, t);
      },
      useId: function() {
        return H = "useId", Z(), Uc();
      },
      unstable_isNewReconciler: jt
    }, Wa = {
      readContext: function(e) {
        return im(), Tt(e);
      },
      useCallback: function(e, t) {
        return H = "useCallback", je(), Je(), em(e, t);
      },
      useContext: function(e) {
        return H = "useContext", je(), Je(), Tt(e);
      },
      useEffect: function(e, t) {
        return H = "useEffect", je(), Je(), _c(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return H = "useImperativeHandle", je(), Je(), Zp(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return H = "useInsertionEffect", je(), Je(), Xp(e, t);
      },
      useLayoutEffect: function(e, t) {
        return H = "useLayoutEffect", je(), Je(), Jp(e, t);
      },
      useMemo: function(e, t) {
        H = "useMemo", je(), Je();
        var n = le.current;
        le.current = Wa;
        try {
          return tm(e, t);
        } finally {
          le.current = n;
        }
      },
      useReducer: function(e, t, n) {
        H = "useReducer", je(), Je();
        var a = le.current;
        le.current = Wa;
        try {
          return Yp(e, t, n);
        } finally {
          le.current = a;
        }
      },
      useRef: function(e) {
        return H = "useRef", je(), Je(), Kp(e);
      },
      useState: function(e) {
        H = "useState", je(), Je();
        var t = le.current;
        le.current = Wa;
        try {
          return Tc(e);
        } finally {
          le.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return H = "useDebugValue", je(), Je(), void 0;
      },
      useDeferredValue: function(e) {
        return H = "useDeferredValue", je(), Je(), nm(e);
      },
      useTransition: function() {
        return H = "useTransition", je(), Je(), am();
      },
      useMutableSource: function(e, t, n) {
        return H = "useMutableSource", je(), Je(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return H = "useSyncExternalStore", je(), Je(), Gp(e, t, n);
      },
      useId: function() {
        return H = "useId", je(), Je(), rm();
      },
      unstable_isNewReconciler: jt
    }, Ta = {
      readContext: function(e) {
        return im(), Tt(e);
      },
      useCallback: function(e, t) {
        return H = "useCallback", je(), Z(), Ac(e, t);
      },
      useContext: function(e) {
        return H = "useContext", je(), Z(), Tt(e);
      },
      useEffect: function(e, t) {
        return H = "useEffect", je(), Z(), Cu(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return H = "useImperativeHandle", je(), Z(), Vc(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return H = "useInsertionEffect", je(), Z(), Oc(e, t);
      },
      useLayoutEffect: function(e, t) {
        return H = "useLayoutEffect", je(), Z(), Lc(e, t);
      },
      useMemo: function(e, t) {
        H = "useMemo", je(), Z();
        var n = le.current;
        le.current = Ta;
        try {
          return kc(e, t);
        } finally {
          le.current = n;
        }
      },
      useReducer: function(e, t, n) {
        H = "useReducer", je(), Z();
        var a = le.current;
        le.current = Ta;
        try {
          return Ip(e, t, n);
        } finally {
          le.current = a;
        }
      },
      useRef: function(e) {
        return H = "useRef", je(), Z(), jc();
      },
      useState: function(e) {
        H = "useState", je(), Z();
        var t = le.current;
        le.current = Ta;
        try {
          return Wp(e);
        } finally {
          le.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return H = "useDebugValue", je(), Z(), Mc();
      },
      useDeferredValue: function(e) {
        return H = "useDeferredValue", je(), Z(), Vg(e);
      },
      useTransition: function() {
        return H = "useTransition", je(), Z(), kg();
      },
      useMutableSource: function(e, t, n) {
        return H = "useMutableSource", je(), Z(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return H = "useSyncExternalStore", je(), Z(), Dc(e, t);
      },
      useId: function() {
        return H = "useId", je(), Z(), Uc();
      },
      unstable_isNewReconciler: jt
    }, zc = {
      readContext: function(e) {
        return im(), Tt(e);
      },
      useCallback: function(e, t) {
        return H = "useCallback", je(), Z(), Ac(e, t);
      },
      useContext: function(e) {
        return H = "useContext", je(), Z(), Tt(e);
      },
      useEffect: function(e, t) {
        return H = "useEffect", je(), Z(), Cu(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return H = "useImperativeHandle", je(), Z(), Vc(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return H = "useInsertionEffect", je(), Z(), Oc(e, t);
      },
      useLayoutEffect: function(e, t) {
        return H = "useLayoutEffect", je(), Z(), Lc(e, t);
      },
      useMemo: function(e, t) {
        H = "useMemo", je(), Z();
        var n = le.current;
        le.current = Ta;
        try {
          return kc(e, t);
        } finally {
          le.current = n;
        }
      },
      useReducer: function(e, t, n) {
        H = "useReducer", je(), Z();
        var a = le.current;
        le.current = Ta;
        try {
          return qp(e, t, n);
        } finally {
          le.current = a;
        }
      },
      useRef: function(e) {
        return H = "useRef", je(), Z(), jc();
      },
      useState: function(e) {
        H = "useState", je(), Z();
        var t = le.current;
        le.current = Ta;
        try {
          return Qp(e);
        } finally {
          le.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return H = "useDebugValue", je(), Z(), Mc();
      },
      useDeferredValue: function(e) {
        return H = "useDeferredValue", je(), Z(), Mg(e);
      },
      useTransition: function() {
        return H = "useTransition", je(), Z(), Ug();
      },
      useMutableSource: function(e, t, n) {
        return H = "useMutableSource", je(), Z(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return H = "useSyncExternalStore", je(), Z(), Dc(e, t);
      },
      useId: function() {
        return H = "useId", je(), Z(), Uc();
      },
      unstable_isNewReconciler: jt
    };
  }
  var Jr = m.unstable_now, Gg = 0, Hc = -1, Du = -1, Bc = -1, lm = !1, Pc = !1;
  function Wg() {
    return lm;
  }
  function OD() {
    Pc = !0;
  }
  function LD() {
    lm = !1, Pc = !1;
  }
  function VD() {
    lm = Pc, Pc = !1;
  }
  function Qg() {
    return Gg;
  }
  function Kg() {
    Gg = Jr();
  }
  function om(e) {
    Du = Jr(), e.actualStartTime < 0 && (e.actualStartTime = Jr());
  }
  function Xg(e) {
    Du = -1;
  }
  function $c(e, t) {
    if (Du >= 0) {
      var n = Jr() - Du;
      e.actualDuration += n, t && (e.selfBaseDuration = n), Du = -1;
    }
  }
  function Qa(e) {
    if (Hc >= 0) {
      var t = Jr() - Hc;
      Hc = -1;
      for (var n = e.return; n !== null; ) {
        switch (n.tag) {
          case S:
            var a = n.stateNode;
            a.effectDuration += t;
            return;
          case P:
            var r = n.stateNode;
            r.effectDuration += t;
            return;
        }
        n = n.return;
      }
    }
  }
  function um(e) {
    if (Bc >= 0) {
      var t = Jr() - Bc;
      Bc = -1;
      for (var n = e.return; n !== null; ) {
        switch (n.tag) {
          case S:
            var a = n.stateNode;
            a !== null && (a.passiveEffectDuration += t);
            return;
          case P:
            var r = n.stateNode;
            r !== null && (r.passiveEffectDuration += t);
            return;
        }
        n = n.return;
      }
    }
  }
  function Ka() {
    Hc = Jr();
  }
  function sm() {
    Bc = Jr();
  }
  function cm(e) {
    for (var t = e.child; t; )
      e.actualDuration += t.actualDuration, t = t.sibling;
  }
  function ja(e, t) {
    if (e && e.defaultProps) {
      var n = Ue({}, t), a = e.defaultProps;
      for (var r in a)
        n[r] === void 0 && (n[r] = a[r]);
      return n;
    }
    return t;
  }
  var fm = {}, dm, pm, mm, vm, hm, Jg, Yc, ym, gm, bm, Tu;
  {
    dm = /* @__PURE__ */ new Set(), pm = /* @__PURE__ */ new Set(), mm = /* @__PURE__ */ new Set(), vm = /* @__PURE__ */ new Set(), ym = /* @__PURE__ */ new Set(), hm = /* @__PURE__ */ new Set(), gm = /* @__PURE__ */ new Set(), bm = /* @__PURE__ */ new Set(), Tu = /* @__PURE__ */ new Set();
    var Zg = /* @__PURE__ */ new Set();
    Yc = function(e, t) {
      if (!(e === null || typeof e == "function")) {
        var n = t + "_" + e;
        Zg.has(n) || (Zg.add(n), f("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t, e));
      }
    }, Jg = function(e, t) {
      if (t === void 0) {
        var n = Qe(e) || "Component";
        hm.has(n) || (hm.add(n), f("%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.", n));
      }
    }, Object.defineProperty(fm, "_processChildContext", {
      enumerable: !1,
      value: function() {
        throw new Error("_processChildContext is not available in React 16+. This likely means you have multiple copies of React and are attempting to nest a React 15 tree inside a React 16 tree using unstable_renderSubtreeIntoContainer, which isn't supported. Try to make sure you have only one copy of React (and ideally, switch to ReactDOM.createPortal).");
      }
    }), Object.freeze(fm);
  }
  function Nm(e, t, n, a) {
    var r = e.memoizedState, i = n(a, r);
    {
      if (e.mode & Et) {
        qt(!0);
        try {
          i = n(a, r);
        } finally {
          qt(!1);
        }
      }
      Jg(t, i);
    }
    var l = i == null ? r : Ue({}, r, i);
    if (e.memoizedState = l, e.lanes === Y) {
      var o = e.updateQueue;
      o.baseState = l;
    }
  }
  var Em = {
    isMounted: Rx,
    enqueueSetState: function(e, t, n) {
      var a = cl(e), r = wn(), i = ni(a), l = Er(r, i);
      l.payload = t, n != null && (Yc(n, "setState"), l.callback = n);
      var o = Wr(a, l, i);
      o !== null && (zt(o, a, i, r), bc(o, a, i)), Jf(a, i);
    },
    enqueueReplaceState: function(e, t, n) {
      var a = cl(e), r = wn(), i = ni(a), l = Er(r, i);
      l.tag = hg, l.payload = t, n != null && (Yc(n, "replaceState"), l.callback = n);
      var o = Wr(a, l, i);
      o !== null && (zt(o, a, i, r), bc(o, a, i)), Jf(a, i);
    },
    enqueueForceUpdate: function(e, t) {
      var n = cl(e), a = wn(), r = ni(n), i = Er(a, r);
      i.tag = hc, t != null && (Yc(t, "forceUpdate"), i.callback = t);
      var l = Wr(n, i, r);
      l !== null && (zt(l, n, r, a), bc(l, n, r)), tS(n, r);
    }
  };
  function eb(e, t, n, a, r, i, l) {
    var o = e.stateNode;
    if (typeof o.shouldComponentUpdate == "function") {
      var u = o.shouldComponentUpdate(a, i, l);
      {
        if (e.mode & Et) {
          qt(!0);
          try {
            u = o.shouldComponentUpdate(a, i, l);
          } finally {
            qt(!1);
          }
        }
        u === void 0 && f("%s.shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false.", Qe(t) || "Component");
      }
      return u;
    }
    return t.prototype && t.prototype.isPureReactComponent ? !Qo(n, a) || !Qo(r, i) : !0;
  }
  function MD(e, t, n) {
    var a = e.stateNode;
    {
      var r = Qe(t) || "Component", i = a.render;
      i || (t.prototype && typeof t.prototype.render == "function" ? f("%s(...): No `render` method found on the returned component instance: did you accidentally return an object from the constructor?", r) : f("%s(...): No `render` method found on the returned component instance: you may have forgotten to define `render`.", r)), a.getInitialState && !a.getInitialState.isReactClassApproved && !a.state && f("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?", r), a.getDefaultProps && !a.getDefaultProps.isReactClassApproved && f("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.", r), a.propTypes && f("propTypes was defined as an instance property on %s. Use a static property to define propTypes instead.", r), a.contextType && f("contextType was defined as an instance property on %s. Use a static property to define contextType instead.", r), t.childContextTypes && !Tu.has(t) && // Strict Mode has its own warning for legacy context, so we can skip
      // this one.
      (e.mode & Et) === be && (Tu.add(t), f(`%s uses the legacy childContextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() instead

.Learn more about this warning here: https://reactjs.org/link/legacy-context`, r)), t.contextTypes && !Tu.has(t) && // Strict Mode has its own warning for legacy context, so we can skip
      // this one.
      (e.mode & Et) === be && (Tu.add(t), f(`%s uses the legacy contextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() with static contextType instead.

Learn more about this warning here: https://reactjs.org/link/legacy-context`, r)), a.contextTypes && f("contextTypes was defined as an instance property on %s. Use a static property to define contextTypes instead.", r), t.contextType && t.contextTypes && !gm.has(t) && (gm.add(t), f("%s declares both contextTypes and contextType static properties. The legacy contextTypes property will be ignored.", r)), typeof a.componentShouldUpdate == "function" && f("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.", r), t.prototype && t.prototype.isPureReactComponent && typeof a.shouldComponentUpdate < "u" && f("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.", Qe(t) || "A pure component"), typeof a.componentDidUnmount == "function" && f("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?", r), typeof a.componentDidReceiveProps == "function" && f("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().", r), typeof a.componentWillRecieveProps == "function" && f("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?", r), typeof a.UNSAFE_componentWillRecieveProps == "function" && f("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?", r);
      var l = a.props !== n;
      a.props !== void 0 && l && f("%s(...): When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.", r, r), a.defaultProps && f("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.", r, r), typeof a.getSnapshotBeforeUpdate == "function" && typeof a.componentDidUpdate != "function" && !mm.has(t) && (mm.add(t), f("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.", Qe(t))), typeof a.getDerivedStateFromProps == "function" && f("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.", r), typeof a.getDerivedStateFromError == "function" && f("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.", r), typeof t.getSnapshotBeforeUpdate == "function" && f("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.", r);
      var o = a.state;
      o && (typeof o != "object" || Fe(o)) && f("%s.state: must be set to an object or null", r), typeof a.getChildContext == "function" && typeof t.childContextTypes != "object" && f("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().", r);
    }
  }
  function tb(e, t) {
    t.updater = Em, e.stateNode = t, Nx(t, e), t._reactInternalInstance = fm;
  }
  function nb(e, t, n) {
    var a = !1, r = Qn, i = Qn, l = t.contextType;
    if ("contextType" in t) {
      var o = (
        // Allow null for conditional declaration
        l === null || l !== void 0 && l.$$typeof === ne && l._context === void 0
      );
      if (!o && !bm.has(t)) {
        bm.add(t);
        var u = "";
        l === void 0 ? u = " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file." : typeof l != "object" ? u = " However, it is set to a " + typeof l + "." : l.$$typeof === I ? u = " Did you accidentally pass the Context.Provider instead?" : l._context !== void 0 ? u = " Did you accidentally pass the Context.Consumer instead?" : u = " However, it is set to an object with keys {" + Object.keys(l).join(", ") + "}.", f("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s", Qe(t) || "Component", u);
      }
    }
    if (typeof l == "object" && l !== null)
      i = Tt(l);
    else {
      r = wl(e, t, !0);
      var p = t.contextTypes;
      a = p != null, i = a ? _l(e, r) : Qn;
    }
    var v = new t(n, i);
    if (e.mode & Et) {
      qt(!0);
      try {
        v = new t(n, i);
      } finally {
        qt(!1);
      }
    }
    var x = e.memoizedState = v.state !== null && v.state !== void 0 ? v.state : null;
    tb(e, v);
    {
      if (typeof t.getDerivedStateFromProps == "function" && x === null) {
        var E = Qe(t) || "Component";
        pm.has(E) || (pm.add(E), f("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.", E, v.state === null ? "null" : "undefined", E));
      }
      if (typeof t.getDerivedStateFromProps == "function" || typeof v.getSnapshotBeforeUpdate == "function") {
        var O = null, V = null, U = null;
        if (typeof v.componentWillMount == "function" && v.componentWillMount.__suppressDeprecationWarning !== !0 ? O = "componentWillMount" : typeof v.UNSAFE_componentWillMount == "function" && (O = "UNSAFE_componentWillMount"), typeof v.componentWillReceiveProps == "function" && v.componentWillReceiveProps.__suppressDeprecationWarning !== !0 ? V = "componentWillReceiveProps" : typeof v.UNSAFE_componentWillReceiveProps == "function" && (V = "UNSAFE_componentWillReceiveProps"), typeof v.componentWillUpdate == "function" && v.componentWillUpdate.__suppressDeprecationWarning !== !0 ? U = "componentWillUpdate" : typeof v.UNSAFE_componentWillUpdate == "function" && (U = "UNSAFE_componentWillUpdate"), O !== null || V !== null || U !== null) {
          var ae = Qe(t) || "Component", he = typeof t.getDerivedStateFromProps == "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
          vm.has(ae) || (vm.add(ae), f(`Unsafe legacy lifecycles will not be called for components using new component APIs.

%s uses %s but also contains the following legacy lifecycles:%s%s%s

The above lifecycles should be removed. Learn more about this warning here:
https://reactjs.org/link/unsafe-component-lifecycles`, ae, he, O !== null ? `
  ` + O : "", V !== null ? `
  ` + V : "", U !== null ? `
  ` + U : ""));
        }
      }
    }
    return a && Iy(e, r, i), v;
  }
  function AD(e, t) {
    var n = t.state;
    typeof t.componentWillMount == "function" && t.componentWillMount(), typeof t.UNSAFE_componentWillMount == "function" && t.UNSAFE_componentWillMount(), n !== t.state && (f("%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", Le(e) || "Component"), Em.enqueueReplaceState(t, t.state, null));
  }
  function ab(e, t, n, a) {
    var r = t.state;
    if (typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, a), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, a), t.state !== r) {
      {
        var i = Le(e) || "Component";
        dm.has(i) || (dm.add(i), f("%s.componentWillReceiveProps(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", i));
      }
      Em.enqueueReplaceState(t, t.state, null);
    }
  }
  function xm(e, t, n, a) {
    MD(e, t, n);
    var r = e.stateNode;
    r.props = n, r.state = e.memoizedState, r.refs = {}, Op(e);
    var i = t.contextType;
    if (typeof i == "object" && i !== null)
      r.context = Tt(i);
    else {
      var l = wl(e, t, !0);
      r.context = _l(e, l);
    }
    {
      if (r.state === n) {
        var o = Qe(t) || "Component";
        ym.has(o) || (ym.add(o), f("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.", o));
      }
      e.mode & Et && Ca.recordLegacyContextWarning(e, r), Ca.recordUnsafeLifecycleWarnings(e, r);
    }
    r.state = e.memoizedState;
    var u = t.getDerivedStateFromProps;
    if (typeof u == "function" && (Nm(e, t, u, n), r.state = e.memoizedState), typeof t.getDerivedStateFromProps != "function" && typeof r.getSnapshotBeforeUpdate != "function" && (typeof r.UNSAFE_componentWillMount == "function" || typeof r.componentWillMount == "function") && (AD(e, r), Nc(e, n, r, a), r.state = e.memoizedState), typeof r.componentDidMount == "function") {
      var p = Ke;
      p |= Ri, (e.mode & Pa) !== be && (p |= kr), e.flags |= p;
    }
  }
  function kD(e, t, n, a) {
    var r = e.stateNode, i = e.memoizedProps;
    r.props = i;
    var l = r.context, o = t.contextType, u = Qn;
    if (typeof o == "object" && o !== null)
      u = Tt(o);
    else {
      var p = wl(e, t, !0);
      u = _l(e, p);
    }
    var v = t.getDerivedStateFromProps, x = typeof v == "function" || typeof r.getSnapshotBeforeUpdate == "function";
    !x && (typeof r.UNSAFE_componentWillReceiveProps == "function" || typeof r.componentWillReceiveProps == "function") && (i !== n || l !== u) && ab(e, r, n, u), gg();
    var E = e.memoizedState, O = r.state = E;
    if (Nc(e, n, r, a), O = e.memoizedState, i === n && E === O && !tc() && !Ec()) {
      if (typeof r.componentDidMount == "function") {
        var V = Ke;
        V |= Ri, (e.mode & Pa) !== be && (V |= kr), e.flags |= V;
      }
      return !1;
    }
    typeof v == "function" && (Nm(e, t, v, n), O = e.memoizedState);
    var U = Ec() || eb(e, t, i, n, E, O, u);
    if (U) {
      if (!x && (typeof r.UNSAFE_componentWillMount == "function" || typeof r.componentWillMount == "function") && (typeof r.componentWillMount == "function" && r.componentWillMount(), typeof r.UNSAFE_componentWillMount == "function" && r.UNSAFE_componentWillMount()), typeof r.componentDidMount == "function") {
        var ae = Ke;
        ae |= Ri, (e.mode & Pa) !== be && (ae |= kr), e.flags |= ae;
      }
    } else {
      if (typeof r.componentDidMount == "function") {
        var he = Ke;
        he |= Ri, (e.mode & Pa) !== be && (he |= kr), e.flags |= he;
      }
      e.memoizedProps = n, e.memoizedState = O;
    }
    return r.props = n, r.state = O, r.context = u, U;
  }
  function UD(e, t, n, a, r) {
    var i = t.stateNode;
    yg(e, t);
    var l = t.memoizedProps, o = t.type === t.elementType ? l : ja(t.type, l);
    i.props = o;
    var u = t.pendingProps, p = i.context, v = n.contextType, x = Qn;
    if (typeof v == "object" && v !== null)
      x = Tt(v);
    else {
      var E = wl(t, n, !0);
      x = _l(t, E);
    }
    var O = n.getDerivedStateFromProps, V = typeof O == "function" || typeof i.getSnapshotBeforeUpdate == "function";
    !V && (typeof i.UNSAFE_componentWillReceiveProps == "function" || typeof i.componentWillReceiveProps == "function") && (l !== u || p !== x) && ab(t, i, a, x), gg();
    var U = t.memoizedState, ae = i.state = U;
    if (Nc(t, a, i, r), ae = t.memoizedState, l === u && U === ae && !tc() && !Ec() && !da)
      return typeof i.componentDidUpdate == "function" && (l !== e.memoizedProps || U !== e.memoizedState) && (t.flags |= Ke), typeof i.getSnapshotBeforeUpdate == "function" && (l !== e.memoizedProps || U !== e.memoizedState) && (t.flags |= dl), !1;
    typeof O == "function" && (Nm(t, n, O, a), ae = t.memoizedState);
    var he = Ec() || eb(t, n, o, a, U, ae, x) || // TODO: In some cases, we'll end up checking if context has changed twice,
    // both before and after `shouldComponentUpdate` has been called. Not ideal,
    // but I'm loath to refactor this function. This only happens for memoized
    // components so it's not that common.
    da;
    return he ? (!V && (typeof i.UNSAFE_componentWillUpdate == "function" || typeof i.componentWillUpdate == "function") && (typeof i.componentWillUpdate == "function" && i.componentWillUpdate(a, ae, x), typeof i.UNSAFE_componentWillUpdate == "function" && i.UNSAFE_componentWillUpdate(a, ae, x)), typeof i.componentDidUpdate == "function" && (t.flags |= Ke), typeof i.getSnapshotBeforeUpdate == "function" && (t.flags |= dl)) : (typeof i.componentDidUpdate == "function" && (l !== e.memoizedProps || U !== e.memoizedState) && (t.flags |= Ke), typeof i.getSnapshotBeforeUpdate == "function" && (l !== e.memoizedProps || U !== e.memoizedState) && (t.flags |= dl), t.memoizedProps = a, t.memoizedState = ae), i.props = a, i.state = ae, i.context = x, he;
  }
  function Pi(e, t) {
    return {
      value: e,
      source: t,
      stack: hi(t),
      digest: null
    };
  }
  function Sm(e, t, n) {
    return {
      value: e,
      source: null,
      stack: n ?? null,
      digest: t ?? null
    };
  }
  function FD(e, t) {
    return !0;
  }
  function Rm(e, t) {
    try {
      var n = FD(e, t);
      if (n === !1)
        return;
      var a = t.value, r = t.source, i = t.stack, l = i !== null ? i : "";
      if (a != null && a._suppressLogging) {
        if (e.tag === T)
          return;
        console.error(a);
      }
      var o = r ? Le(r) : null, u = o ? "The above error occurred in the <" + o + "> component:" : "The above error occurred in one of your React components:", p;
      if (e.tag === S)
        p = `Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.`;
      else {
        var v = Le(e) || "Anonymous";
        p = "React will try to recreate this component tree from scratch " + ("using the error boundary you provided, " + v + ".");
      }
      var x = u + `
` + l + `

` + ("" + p);
      console.error(x);
    } catch (E) {
      setTimeout(function() {
        throw E;
      });
    }
  }
  var zD = typeof WeakMap == "function" ? WeakMap : Map;
  function rb(e, t, n) {
    var a = Er(ut, n);
    a.tag = wp, a.payload = {
      element: null
    };
    var r = t.value;
    return a.callback = function() {
      Oj(r), Rm(e, t);
    }, a;
  }
  function Cm(e, t, n) {
    var a = Er(ut, n);
    a.tag = wp;
    var r = e.type.getDerivedStateFromError;
    if (typeof r == "function") {
      var i = t.value;
      a.payload = function() {
        return r(i);
      }, a.callback = function() {
        vN(e), Rm(e, t);
      };
    }
    var l = e.stateNode;
    return l !== null && typeof l.componentDidCatch == "function" && (a.callback = function() {
      vN(e), Rm(e, t), typeof r != "function" && wj(this);
      var u = t.value, p = t.stack;
      this.componentDidCatch(u, {
        componentStack: p !== null ? p : ""
      }), typeof r != "function" && (In(e.lanes, Te) || f("%s: Error boundaries should implement getDerivedStateFromError(). In that method, return a state update to display an error message or fallback UI.", Le(e) || "Unknown"));
    }), a;
  }
  function ib(e, t, n) {
    var a = e.pingCache, r;
    if (a === null ? (a = e.pingCache = new zD(), r = /* @__PURE__ */ new Set(), a.set(t, r)) : (r = a.get(t), r === void 0 && (r = /* @__PURE__ */ new Set(), a.set(t, r))), !r.has(n)) {
      r.add(n);
      var i = Lj.bind(null, e, t, n);
      Ea && Yu(e, n), t.then(i, i);
    }
  }
  function HD(e, t, n, a) {
    var r = e.updateQueue;
    if (r === null) {
      var i = /* @__PURE__ */ new Set();
      i.add(n), e.updateQueue = i;
    } else
      r.add(n);
  }
  function BD(e, t) {
    var n = e.tag;
    if ((e.mode & Pe) === be && (n === C || n === G || n === $)) {
      var a = e.alternate;
      a ? (e.updateQueue = a.updateQueue, e.memoizedState = a.memoizedState, e.lanes = a.lanes) : (e.updateQueue = null, e.memoizedState = null);
    }
  }
  function lb(e) {
    var t = e;
    do {
      if (t.tag === X && ED(t))
        return t;
      t = t.return;
    } while (t !== null);
    return null;
  }
  function ob(e, t, n, a, r) {
    if ((e.mode & Pe) === be) {
      if (e === t)
        e.flags |= Dn;
      else {
        if (e.flags |= Xe, n.flags |= Yf, n.flags &= -52805, n.tag === T) {
          var i = n.alternate;
          if (i === null)
            n.tag = Q;
          else {
            var l = Er(ut, Te);
            l.tag = hc, Wr(n, l, Te);
          }
        }
        n.lanes = Ae(n.lanes, Te);
      }
      return e;
    }
    return e.flags |= Dn, e.lanes = r, e;
  }
  function PD(e, t, n, a, r) {
    if (n.flags |= bs, Ea && Yu(e, r), a !== null && typeof a == "object" && typeof a.then == "function") {
      var i = a;
      BD(n), tn() && n.mode & Pe && Jy();
      var l = lb(t);
      if (l !== null) {
        l.flags &= ~cr, ob(l, t, n, e, r), l.mode & Pe && ib(e, i, r), HD(l, e, i);
        return;
      } else {
        if (!cS(r)) {
          ib(e, i, r), rv();
          return;
        }
        var o = new Error("A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator. To fix, updates that suspend should be wrapped with startTransition.");
        a = o;
      }
    } else if (tn() && n.mode & Pe) {
      Jy();
      var u = lb(t);
      if (u !== null) {
        (u.flags & Dn) === Ee && (u.flags |= cr), ob(u, t, n, e, r), yp(Pi(a, n));
        return;
      }
    }
    a = Pi(a, n), Ej(a);
    var p = t;
    do {
      switch (p.tag) {
        case S: {
          var v = a;
          p.flags |= Dn;
          var x = Mo(r);
          p.lanes = Ae(p.lanes, x);
          var E = rb(p, v, x);
          Lp(p, E);
          return;
        }
        case T:
          var O = a, V = p.type, U = p.stateNode;
          if ((p.flags & Xe) === Ee && (typeof V.getDerivedStateFromError == "function" || U !== null && typeof U.componentDidCatch == "function" && !lN(U))) {
            p.flags |= Dn;
            var ae = Mo(r);
            p.lanes = Ae(p.lanes, ae);
            var he = Cm(p, O, ae);
            Lp(p, he);
            return;
          }
          break;
      }
      p = p.return;
    } while (p !== null);
  }
  function $D() {
    return null;
  }
  var ju = h.ReactCurrentOwner, wa = !1, Dm, wu, Tm, jm, wm, $i, _m, Ic, _u;
  Dm = {}, wu = {}, Tm = {}, jm = {}, wm = {}, $i = !1, _m = {}, Ic = {}, _u = {};
  function Tn(e, t, n, a) {
    e === null ? t.child = cg(t, null, n, a) : t.child = Ml(t, e.child, n, a);
  }
  function YD(e, t, n, a) {
    t.child = Ml(t, e.child, null, a), t.child = Ml(t, null, n, a);
  }
  function ub(e, t, n, a, r) {
    if (t.type !== t.elementType) {
      var i = n.propTypes;
      i && Sa(
        i,
        a,
        // Resolved props
        "prop",
        Qe(n)
      );
    }
    var l = n.render, o = t.ref, u, p;
    kl(t, r), jo(t);
    {
      if (ju.current = t, aa(!0), u = Pl(e, t, l, a, o, r), p = $l(), t.mode & Et) {
        qt(!0);
        try {
          u = Pl(e, t, l, a, o, r), p = $l();
        } finally {
          qt(!1);
        }
      }
      aa(!1);
    }
    return vl(), e !== null && !wa ? (Rg(e, t, r), xr(e, t, r)) : (tn() && p && fp(t), t.flags |= fl, Tn(e, t, u, r), t.child);
  }
  function sb(e, t, n, a, r) {
    if (e === null) {
      var i = n.type;
      if (Qj(i) && n.compare === null && // SimpleMemoComponent codepath doesn't resolve outer props either.
      n.defaultProps === void 0) {
        var l = i;
        return l = Xl(i), t.tag = $, t.type = l, Vm(t, i), cb(e, t, l, a, r);
      }
      {
        var o = i.propTypes;
        if (o && Sa(
          o,
          a,
          // Resolved props
          "prop",
          Qe(i)
        ), n.defaultProps !== void 0) {
          var u = Qe(i) || "Unknown";
          _u[u] || (f("%s: Support for defaultProps will be removed from memo components in a future major release. Use JavaScript default parameters instead.", u), _u[u] = !0);
        }
      }
      var p = vv(n.type, null, a, t, t.mode, r);
      return p.ref = t.ref, p.return = t, t.child = p, p;
    }
    {
      var v = n.type, x = v.propTypes;
      x && Sa(
        x,
        a,
        // Resolved props
        "prop",
        Qe(v)
      );
    }
    var E = e.child, O = zm(e, r);
    if (!O) {
      var V = E.memoizedProps, U = n.compare;
      if (U = U !== null ? U : Qo, U(V, a) && e.ref === t.ref)
        return xr(e, t, r);
    }
    t.flags |= fl;
    var ae = Wi(E, a);
    return ae.ref = t.ref, ae.return = t, t.child = ae, ae;
  }
  function cb(e, t, n, a, r) {
    if (t.type !== t.elementType) {
      var i = t.elementType;
      if (i.$$typeof === ge) {
        var l = i, o = l._payload, u = l._init;
        try {
          i = u(o);
        } catch {
          i = null;
        }
        var p = i && i.propTypes;
        p && Sa(
          p,
          a,
          // Resolved (SimpleMemoComponent has no defaultProps)
          "prop",
          Qe(i)
        );
      }
    }
    if (e !== null) {
      var v = e.memoizedProps;
      if (Qo(v, a) && e.ref === t.ref && // Prevent bailout if the implementation changed due to hot reload.
      t.type === e.type)
        if (wa = !1, t.pendingProps = a = v, zm(e, r))
          (e.flags & Yf) !== Ee && (wa = !0);
        else return t.lanes = e.lanes, xr(e, t, r);
    }
    return Om(e, t, n, a, r);
  }
  function fb(e, t, n) {
    var a = t.pendingProps, r = a.children, i = e !== null ? e.memoizedState : null;
    if (a.mode === "hidden" || Bn)
      if ((t.mode & Pe) === be) {
        var l = {
          baseLanes: Y,
          cachePool: null,
          transitions: null
        };
        t.memoizedState = l, rf(t, n);
      } else if (In(n, Yn)) {
        var x = {
          baseLanes: Y,
          cachePool: null,
          transitions: null
        };
        t.memoizedState = x;
        var E = i !== null ? i.baseLanes : n;
        rf(t, E);
      } else {
        var o = null, u;
        if (i !== null) {
          var p = i.baseLanes;
          u = Ae(p, n);
        } else
          u = n;
        t.lanes = t.childLanes = Yn;
        var v = {
          baseLanes: u,
          cachePool: o,
          transitions: null
        };
        return t.memoizedState = v, t.updateQueue = null, rf(t, u), null;
      }
    else {
      var O;
      i !== null ? (O = Ae(i.baseLanes, n), t.memoizedState = null) : O = n, rf(t, O);
    }
    return Tn(e, t, r, n), t.child;
  }
  function ID(e, t, n) {
    var a = t.pendingProps;
    return Tn(e, t, a, n), t.child;
  }
  function qD(e, t, n) {
    var a = t.pendingProps.children;
    return Tn(e, t, a, n), t.child;
  }
  function GD(e, t, n) {
    {
      t.flags |= Ke;
      {
        var a = t.stateNode;
        a.effectDuration = 0, a.passiveEffectDuration = 0;
      }
    }
    var r = t.pendingProps, i = r.children;
    return Tn(e, t, i, n), t.child;
  }
  function db(e, t) {
    var n = t.ref;
    (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= xi, t.flags |= If);
  }
  function Om(e, t, n, a, r) {
    if (t.type !== t.elementType) {
      var i = n.propTypes;
      i && Sa(
        i,
        a,
        // Resolved props
        "prop",
        Qe(n)
      );
    }
    var l;
    {
      var o = wl(t, n, !0);
      l = _l(t, o);
    }
    var u, p;
    kl(t, r), jo(t);
    {
      if (ju.current = t, aa(!0), u = Pl(e, t, n, a, l, r), p = $l(), t.mode & Et) {
        qt(!0);
        try {
          u = Pl(e, t, n, a, l, r), p = $l();
        } finally {
          qt(!1);
        }
      }
      aa(!1);
    }
    return vl(), e !== null && !wa ? (Rg(e, t, r), xr(e, t, r)) : (tn() && p && fp(t), t.flags |= fl, Tn(e, t, u, r), t.child);
  }
  function pb(e, t, n, a, r) {
    {
      switch (c1(t)) {
        case !1: {
          var i = t.stateNode, l = t.type, o = new l(t.memoizedProps, i.context), u = o.state;
          i.updater.enqueueSetState(i, u, null);
          break;
        }
        case !0: {
          t.flags |= Xe, t.flags |= Dn;
          var p = new Error("Simulated error coming from DevTools"), v = Mo(r);
          t.lanes = Ae(t.lanes, v);
          var x = Cm(t, Pi(p, t), v);
          Lp(t, x);
          break;
        }
      }
      if (t.type !== t.elementType) {
        var E = n.propTypes;
        E && Sa(
          E,
          a,
          // Resolved props
          "prop",
          Qe(n)
        );
      }
    }
    var O;
    Ia(n) ? (O = !0, ac(t)) : O = !1, kl(t, r);
    var V = t.stateNode, U;
    V === null ? (Gc(e, t), nb(t, n, a), xm(t, n, a, r), U = !0) : e === null ? U = kD(t, n, a, r) : U = UD(e, t, n, a, r);
    var ae = Lm(e, t, n, U, O, r);
    {
      var he = t.stateNode;
      U && he.props !== a && ($i || f("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.", Le(t) || "a component"), $i = !0);
    }
    return ae;
  }
  function Lm(e, t, n, a, r, i) {
    db(e, t);
    var l = (t.flags & Xe) !== Ee;
    if (!a && !l)
      return r && Wy(t, n, !1), xr(e, t, i);
    var o = t.stateNode;
    ju.current = t;
    var u;
    if (l && typeof n.getDerivedStateFromError != "function")
      u = null, Xg();
    else {
      jo(t);
      {
        if (aa(!0), u = o.render(), t.mode & Et) {
          qt(!0);
          try {
            o.render();
          } finally {
            qt(!1);
          }
        }
        aa(!1);
      }
      vl();
    }
    return t.flags |= fl, e !== null && l ? YD(e, t, u, i) : Tn(e, t, u, i), t.memoizedState = o.state, r && Wy(t, n, !0), t.child;
  }
  function mb(e) {
    var t = e.stateNode;
    t.pendingContext ? qy(e, t.pendingContext, t.pendingContext !== t.context) : t.context && qy(e, t.context, !1), Vp(e, t.containerInfo);
  }
  function WD(e, t, n) {
    if (mb(t), e === null)
      throw new Error("Should have a current fiber. This is a bug in React.");
    var a = t.pendingProps, r = t.memoizedState, i = r.element;
    yg(e, t), Nc(t, a, null, n);
    var l = t.memoizedState;
    t.stateNode;
    var o = l.element;
    if (r.isDehydrated) {
      var u = {
        element: o,
        isDehydrated: !1,
        cache: l.cache,
        pendingSuspenseBoundaries: l.pendingSuspenseBoundaries,
        transitions: l.transitions
      }, p = t.updateQueue;
      if (p.baseState = u, t.memoizedState = u, t.flags & cr) {
        var v = Pi(new Error("There was an error while hydrating. Because the error happened outside of a Suspense boundary, the entire root will switch to client rendering."), t);
        return vb(e, t, o, n, v);
      } else if (o !== i) {
        var x = Pi(new Error("This root received an early update, before anything was able hydrate. Switched the entire root to client rendering."), t);
        return vb(e, t, o, n, x);
      } else {
        X0(t);
        var E = cg(t, null, o, n);
        t.child = E;
        for (var O = E; O; )
          O.flags = O.flags & ~Dt | fr, O = O.sibling;
      }
    } else {
      if (Vl(), o === i)
        return xr(e, t, n);
      Tn(e, t, o, n);
    }
    return t.child;
  }
  function vb(e, t, n, a, r) {
    return Vl(), yp(r), t.flags |= cr, Tn(e, t, n, a), t.child;
  }
  function QD(e, t, n) {
    Eg(t), e === null && hp(t);
    var a = t.type, r = t.pendingProps, i = e !== null ? e.memoizedProps : null, l = r.children, o = Xd(a, r);
    return o ? l = null : i !== null && Xd(a, i) && (t.flags |= Do), db(e, t), Tn(e, t, l, n), t.child;
  }
  function KD(e, t) {
    return e === null && hp(t), null;
  }
  function XD(e, t, n, a) {
    Gc(e, t);
    var r = t.pendingProps, i = n, l = i._payload, o = i._init, u = o(l);
    t.type = u;
    var p = t.tag = Kj(u), v = ja(u, r), x;
    switch (p) {
      case C:
        return Vm(t, u), t.type = u = Xl(u), x = Om(null, t, u, v, a), x;
      case T:
        return t.type = u = sv(u), x = pb(null, t, u, v, a), x;
      case G:
        return t.type = u = cv(u), x = ub(null, t, u, v, a), x;
      case te: {
        if (t.type !== t.elementType) {
          var E = u.propTypes;
          E && Sa(
            E,
            v,
            // Resolved for outer only
            "prop",
            Qe(u)
          );
        }
        return x = sb(
          null,
          t,
          u,
          ja(u.type, v),
          // The inner type can have defaults too
          a
        ), x;
      }
    }
    var O = "";
    throw u !== null && typeof u == "object" && u.$$typeof === ge && (O = " Did you wrap a component in React.lazy() more than once?"), new Error("Element type is invalid. Received a promise that resolves to: " + u + ". " + ("Lazy element type must resolve to a class or function." + O));
  }
  function JD(e, t, n, a, r) {
    Gc(e, t), t.tag = T;
    var i;
    return Ia(n) ? (i = !0, ac(t)) : i = !1, kl(t, r), nb(t, n, a), xm(t, n, a, r), Lm(null, t, n, !0, i, r);
  }
  function ZD(e, t, n, a) {
    Gc(e, t);
    var r = t.pendingProps, i;
    {
      var l = wl(t, n, !1);
      i = _l(t, l);
    }
    kl(t, a);
    var o, u;
    jo(t);
    {
      if (n.prototype && typeof n.prototype.render == "function") {
        var p = Qe(n) || "Unknown";
        Dm[p] || (f("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.", p, p), Dm[p] = !0);
      }
      t.mode & Et && Ca.recordLegacyContextWarning(t, null), aa(!0), ju.current = t, o = Pl(null, t, n, r, i, a), u = $l(), aa(!1);
    }
    if (vl(), t.flags |= fl, typeof o == "object" && o !== null && typeof o.render == "function" && o.$$typeof === void 0) {
      var v = Qe(n) || "Unknown";
      wu[v] || (f("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", v, v, v), wu[v] = !0);
    }
    if (
      // Run these checks in production only if the flag is off.
      // Eventually we'll delete this branch altogether.
      typeof o == "object" && o !== null && typeof o.render == "function" && o.$$typeof === void 0
    ) {
      {
        var x = Qe(n) || "Unknown";
        wu[x] || (f("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", x, x, x), wu[x] = !0);
      }
      t.tag = T, t.memoizedState = null, t.updateQueue = null;
      var E = !1;
      return Ia(n) ? (E = !0, ac(t)) : E = !1, t.memoizedState = o.state !== null && o.state !== void 0 ? o.state : null, Op(t), tb(t, o), xm(t, n, r, a), Lm(null, t, n, !0, E, a);
    } else {
      if (t.tag = C, t.mode & Et) {
        qt(!0);
        try {
          o = Pl(null, t, n, r, i, a), u = $l();
        } finally {
          qt(!1);
        }
      }
      return tn() && u && fp(t), Tn(null, t, o, a), Vm(t, n), t.child;
    }
  }
  function Vm(e, t) {
    {
      if (t && t.childContextTypes && f("%s(...): childContextTypes cannot be defined on a function component.", t.displayName || t.name || "Component"), e.ref !== null) {
        var n = "", a = Vr();
        a && (n += `

Check the render method of \`` + a + "`.");
        var r = a || "", i = e._debugSource;
        i && (r = i.fileName + ":" + i.lineNumber), wm[r] || (wm[r] = !0, f("Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?%s", n));
      }
      if (t.defaultProps !== void 0) {
        var l = Qe(t) || "Unknown";
        _u[l] || (f("%s: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.", l), _u[l] = !0);
      }
      if (typeof t.getDerivedStateFromProps == "function") {
        var o = Qe(t) || "Unknown";
        jm[o] || (f("%s: Function components do not support getDerivedStateFromProps.", o), jm[o] = !0);
      }
      if (typeof t.contextType == "object" && t.contextType !== null) {
        var u = Qe(t) || "Unknown";
        Tm[u] || (f("%s: Function components do not support contextType.", u), Tm[u] = !0);
      }
    }
  }
  var Mm = {
    dehydrated: null,
    treeContext: null,
    retryLane: Gt
  };
  function Am(e) {
    return {
      baseLanes: e,
      cachePool: $D(),
      transitions: null
    };
  }
  function eT(e, t) {
    var n = null;
    return {
      baseLanes: Ae(e.baseLanes, t),
      cachePool: n,
      transitions: e.transitions
    };
  }
  function tT(e, t, n, a) {
    if (t !== null) {
      var r = t.memoizedState;
      if (r === null)
        return !1;
    }
    return kp(e, bu);
  }
  function nT(e, t) {
    return Ds(e.childLanes, t);
  }
  function hb(e, t, n) {
    var a = t.pendingProps;
    f1(t) && (t.flags |= Xe);
    var r = Da.current, i = !1, l = (t.flags & Xe) !== Ee;
    if (l || tT(r, e) ? (i = !0, t.flags &= ~Xe) : (e === null || e.memoizedState !== null) && (r = ND(r, Sg)), r = Fl(r), Kr(t, r), e === null) {
      hp(t);
      var o = t.memoizedState;
      if (o !== null) {
        var u = o.dehydrated;
        if (u !== null)
          return oT(t, u);
      }
      var p = a.children, v = a.fallback;
      if (i) {
        var x = aT(t, p, v, n), E = t.child;
        return E.memoizedState = Am(n), t.memoizedState = Mm, x;
      } else
        return km(t, p);
    } else {
      var O = e.memoizedState;
      if (O !== null) {
        var V = O.dehydrated;
        if (V !== null)
          return uT(e, t, l, a, V, O, n);
      }
      if (i) {
        var U = a.fallback, ae = a.children, he = iT(e, t, ae, U, n), pe = t.child, Ye = e.child.memoizedState;
        return pe.memoizedState = Ye === null ? Am(n) : eT(Ye, n), pe.childLanes = nT(e, n), t.memoizedState = Mm, he;
      } else {
        var ze = a.children, j = rT(e, t, ze, n);
        return t.memoizedState = null, j;
      }
    }
  }
  function km(e, t, n) {
    var a = e.mode, r = {
      mode: "visible",
      children: t
    }, i = Um(r, a);
    return i.return = e, e.child = i, i;
  }
  function aT(e, t, n, a) {
    var r = e.mode, i = e.child, l = {
      mode: "hidden",
      children: t
    }, o, u;
    return (r & Pe) === be && i !== null ? (o = i, o.childLanes = Y, o.pendingProps = l, e.mode & tt && (o.actualDuration = 0, o.actualStartTime = -1, o.selfBaseDuration = 0, o.treeBaseDuration = 0), u = ri(n, r, a, null)) : (o = Um(l, r), u = ri(n, r, a, null)), o.return = e, u.return = e, o.sibling = u, e.child = o, u;
  }
  function Um(e, t, n) {
    return yN(e, t, Y, null);
  }
  function yb(e, t) {
    return Wi(e, t);
  }
  function rT(e, t, n, a) {
    var r = e.child, i = r.sibling, l = yb(r, {
      mode: "visible",
      children: n
    });
    if ((t.mode & Pe) === be && (l.lanes = a), l.return = t, l.sibling = null, i !== null) {
      var o = t.deletions;
      o === null ? (t.deletions = [i], t.flags |= Ei) : o.push(i);
    }
    return t.child = l, l;
  }
  function iT(e, t, n, a, r) {
    var i = t.mode, l = e.child, o = l.sibling, u = {
      mode: "hidden",
      children: n
    }, p;
    if (
      // In legacy mode, we commit the primary tree as if it successfully
      // completed, even though it's in an inconsistent state.
      (i & Pe) === be && // Make sure we're on the second pass, i.e. the primary child fragment was
      // already cloned. In legacy mode, the only case where this isn't true is
      // when DevTools forces us to display a fallback; we skip the first render
      // pass entirely and go straight to rendering the fallback. (In Concurrent
      // Mode, SuspenseList can also trigger this scenario, but this is a legacy-
      // only codepath.)
      t.child !== l
    ) {
      var v = t.child;
      p = v, p.childLanes = Y, p.pendingProps = u, t.mode & tt && (p.actualDuration = 0, p.actualStartTime = -1, p.selfBaseDuration = l.selfBaseDuration, p.treeBaseDuration = l.treeBaseDuration), t.deletions = null;
    } else
      p = yb(l, u), p.subtreeFlags = l.subtreeFlags & dr;
    var x;
    return o !== null ? x = Wi(o, a) : (x = ri(a, i, r, null), x.flags |= Dt), x.return = t, p.return = t, p.sibling = x, t.child = p, x;
  }
  function qc(e, t, n, a) {
    a !== null && yp(a), Ml(t, e.child, null, n);
    var r = t.pendingProps, i = r.children, l = km(t, i);
    return l.flags |= Dt, t.memoizedState = null, l;
  }
  function lT(e, t, n, a, r) {
    var i = t.mode, l = {
      mode: "visible",
      children: n
    }, o = Um(l, i), u = ri(a, i, r, null);
    return u.flags |= Dt, o.return = t, u.return = t, o.sibling = u, t.child = o, (t.mode & Pe) !== be && Ml(t, e.child, null, r), u;
  }
  function oT(e, t, n) {
    return (e.mode & Pe) === be ? (f("Cannot hydrate Suspense in legacy mode. Switch from ReactDOM.hydrate(element, container) to ReactDOMClient.hydrateRoot(container, <App />).render(element) or remove the Suspense components from the server rendered components."), e.lanes = Te) : tp(t) ? e.lanes = Ti : e.lanes = Yn, null;
  }
  function uT(e, t, n, a, r, i, l) {
    if (n)
      if (t.flags & cr) {
        t.flags &= ~cr;
        var j = Sm(new Error("There was an error while hydrating this Suspense boundary. Switched to client rendering."));
        return qc(e, t, l, j);
      } else {
        if (t.memoizedState !== null)
          return t.child = e.child, t.flags |= Xe, null;
        var F = a.children, w = a.fallback, q = lT(e, t, F, w, l), oe = t.child;
        return oe.memoizedState = Am(l), t.memoizedState = Mm, q;
      }
    else {
      if (Q0(), (t.mode & Pe) === be)
        return qc(
          e,
          t,
          l,
          // TODO: When we delete legacy mode, we should make this error argument
          // required — every concurrent mode path that causes hydration to
          // de-opt to client rendering should have an error message.
          null
        );
      if (tp(r)) {
        var o, u, p;
        {
          var v = d0(r);
          o = v.digest, u = v.message, p = v.stack;
        }
        var x;
        u ? x = new Error(u) : x = new Error("The server could not finish this Suspense boundary, likely due to an error during server rendering. Switched to client rendering.");
        var E = Sm(x, o, p);
        return qc(e, t, l, E);
      }
      var O = In(l, e.childLanes);
      if (wa || O) {
        var V = af();
        if (V !== null) {
          var U = gS(V, l);
          if (U !== Gt && U !== i.retryLane) {
            i.retryLane = U;
            var ae = ut;
            Un(e, U), zt(V, e, U, ae);
          }
        }
        rv();
        var he = Sm(new Error("This Suspense boundary received an update before it finished hydrating. This caused the boundary to switch to client rendering. The usual way to fix this is to wrap the original update in startTransition."));
        return qc(e, t, l, he);
      } else if (Hy(r)) {
        t.flags |= Xe, t.child = e.child;
        var pe = Vj.bind(null, e);
        return p0(r, pe), null;
      } else {
        J0(t, r, i.treeContext);
        var Ye = a.children, ze = km(t, Ye);
        return ze.flags |= fr, ze;
      }
    }
  }
  function gb(e, t, n) {
    e.lanes = Ae(e.lanes, t);
    var a = e.alternate;
    a !== null && (a.lanes = Ae(a.lanes, t)), Tp(e.return, t, n);
  }
  function sT(e, t, n) {
    for (var a = t; a !== null; ) {
      if (a.tag === X) {
        var r = a.memoizedState;
        r !== null && gb(a, n, e);
      } else if (a.tag === ye)
        gb(a, n, e);
      else if (a.child !== null) {
        a.child.return = a, a = a.child;
        continue;
      }
      if (a === e)
        return;
      for (; a.sibling === null; ) {
        if (a.return === null || a.return === e)
          return;
        a = a.return;
      }
      a.sibling.return = a.return, a = a.sibling;
    }
  }
  function cT(e) {
    for (var t = e, n = null; t !== null; ) {
      var a = t.alternate;
      a !== null && Rc(a) === null && (n = t), t = t.sibling;
    }
    return n;
  }
  function fT(e) {
    if (e !== void 0 && e !== "forwards" && e !== "backwards" && e !== "together" && !_m[e])
      if (_m[e] = !0, typeof e == "string")
        switch (e.toLowerCase()) {
          case "together":
          case "forwards":
          case "backwards": {
            f('"%s" is not a valid value for revealOrder on <SuspenseList />. Use lowercase "%s" instead.', e, e.toLowerCase());
            break;
          }
          case "forward":
          case "backward": {
            f('"%s" is not a valid value for revealOrder on <SuspenseList />. React uses the -s suffix in the spelling. Use "%ss" instead.', e, e.toLowerCase());
            break;
          }
          default:
            f('"%s" is not a supported revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?', e);
            break;
        }
      else
        f('%s is not a supported value for revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?', e);
  }
  function dT(e, t) {
    e !== void 0 && !Ic[e] && (e !== "collapsed" && e !== "hidden" ? (Ic[e] = !0, f('"%s" is not a supported value for tail on <SuspenseList />. Did you mean "collapsed" or "hidden"?', e)) : t !== "forwards" && t !== "backwards" && (Ic[e] = !0, f('<SuspenseList tail="%s" /> is only valid if revealOrder is "forwards" or "backwards". Did you mean to specify revealOrder="forwards"?', e)));
  }
  function bb(e, t) {
    {
      var n = Fe(e), a = !n && typeof ba(e) == "function";
      if (n || a) {
        var r = n ? "array" : "iterable";
        return f("A nested %s was passed to row #%s in <SuspenseList />. Wrap it in an additional SuspenseList to configure its revealOrder: <SuspenseList revealOrder=...> ... <SuspenseList revealOrder=...>{%s}</SuspenseList> ... </SuspenseList>", r, t, r), !1;
      }
    }
    return !0;
  }
  function pT(e, t) {
    if ((t === "forwards" || t === "backwards") && e !== void 0 && e !== null && e !== !1)
      if (Fe(e)) {
        for (var n = 0; n < e.length; n++)
          if (!bb(e[n], n))
            return;
      } else {
        var a = ba(e);
        if (typeof a == "function") {
          var r = a.call(e);
          if (r)
            for (var i = r.next(), l = 0; !i.done; i = r.next()) {
              if (!bb(i.value, l))
                return;
              l++;
            }
        } else
          f('A single row was passed to a <SuspenseList revealOrder="%s" />. This is not useful since it needs multiple rows. Did you mean to pass multiple children or an array?', t);
      }
  }
  function Fm(e, t, n, a, r) {
    var i = e.memoizedState;
    i === null ? e.memoizedState = {
      isBackwards: t,
      rendering: null,
      renderingStartTime: 0,
      last: a,
      tail: n,
      tailMode: r
    } : (i.isBackwards = t, i.rendering = null, i.renderingStartTime = 0, i.last = a, i.tail = n, i.tailMode = r);
  }
  function Nb(e, t, n) {
    var a = t.pendingProps, r = a.revealOrder, i = a.tail, l = a.children;
    fT(r), dT(i, r), pT(l, r), Tn(e, t, l, n);
    var o = Da.current, u = kp(o, bu);
    if (u)
      o = Up(o, bu), t.flags |= Xe;
    else {
      var p = e !== null && (e.flags & Xe) !== Ee;
      p && sT(t, t.child, n), o = Fl(o);
    }
    if (Kr(t, o), (t.mode & Pe) === be)
      t.memoizedState = null;
    else
      switch (r) {
        case "forwards": {
          var v = cT(t.child), x;
          v === null ? (x = t.child, t.child = null) : (x = v.sibling, v.sibling = null), Fm(
            t,
            !1,
            // isBackwards
            x,
            v,
            i
          );
          break;
        }
        case "backwards": {
          var E = null, O = t.child;
          for (t.child = null; O !== null; ) {
            var V = O.alternate;
            if (V !== null && Rc(V) === null) {
              t.child = O;
              break;
            }
            var U = O.sibling;
            O.sibling = E, E = O, O = U;
          }
          Fm(
            t,
            !0,
            // isBackwards
            E,
            null,
            // last
            i
          );
          break;
        }
        case "together": {
          Fm(
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
  function mT(e, t, n) {
    Vp(t, t.stateNode.containerInfo);
    var a = t.pendingProps;
    return e === null ? t.child = Ml(t, null, a, n) : Tn(e, t, a, n), t.child;
  }
  var Eb = !1;
  function vT(e, t, n) {
    var a = t.type, r = a._context, i = t.pendingProps, l = t.memoizedProps, o = i.value;
    {
      "value" in i || Eb || (Eb = !0, f("The `value` prop is required for the `<Context.Provider>`. Did you misspell it or forget to pass it?"));
      var u = t.type.propTypes;
      u && Sa(u, i, "prop", "Context.Provider");
    }
    if (pg(t, r, o), l !== null) {
      var p = l.value;
      if (Wn(p, o)) {
        if (l.children === i.children && !tc())
          return xr(e, t, n);
      } else
        fD(t, r, n);
    }
    var v = i.children;
    return Tn(e, t, v, n), t.child;
  }
  var xb = !1;
  function hT(e, t, n) {
    var a = t.type;
    a._context === void 0 ? a !== a.Consumer && (xb || (xb = !0, f("Rendering <Context> directly is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?"))) : a = a._context;
    var r = t.pendingProps, i = r.children;
    typeof i != "function" && f("A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it."), kl(t, n);
    var l = Tt(a);
    jo(t);
    var o;
    return ju.current = t, aa(!0), o = i(l), aa(!1), vl(), t.flags |= fl, Tn(e, t, o, n), t.child;
  }
  function Ou() {
    wa = !0;
  }
  function Gc(e, t) {
    (t.mode & Pe) === be && e !== null && (e.alternate = null, t.alternate = null, t.flags |= Dt);
  }
  function xr(e, t, n) {
    return e !== null && (t.dependencies = e.dependencies), Xg(), $u(t.lanes), In(n, t.childLanes) ? (sD(e, t), t.child) : null;
  }
  function yT(e, t, n) {
    {
      var a = t.return;
      if (a === null)
        throw new Error("Cannot swap the root fiber.");
      if (e.alternate = null, t.alternate = null, n.index = t.index, n.sibling = t.sibling, n.return = t.return, n.ref = t.ref, t === a.child)
        a.child = n;
      else {
        var r = a.child;
        if (r === null)
          throw new Error("Expected parent to have a child.");
        for (; r.sibling !== t; )
          if (r = r.sibling, r === null)
            throw new Error("Expected to find the previous sibling.");
        r.sibling = n;
      }
      var i = a.deletions;
      return i === null ? (a.deletions = [e], a.flags |= Ei) : i.push(e), n.flags |= Dt, n;
    }
  }
  function zm(e, t) {
    var n = e.lanes;
    return !!In(n, t);
  }
  function gT(e, t, n) {
    switch (t.tag) {
      case S:
        mb(t), t.stateNode, Vl();
        break;
      case z:
        Eg(t);
        break;
      case T: {
        var a = t.type;
        Ia(a) && ac(t);
        break;
      }
      case M:
        Vp(t, t.stateNode.containerInfo);
        break;
      case B: {
        var r = t.memoizedProps.value, i = t.type._context;
        pg(t, i, r);
        break;
      }
      case P:
        {
          var l = In(n, t.childLanes);
          l && (t.flags |= Ke);
          {
            var o = t.stateNode;
            o.effectDuration = 0, o.passiveEffectDuration = 0;
          }
        }
        break;
      case X: {
        var u = t.memoizedState;
        if (u !== null) {
          if (u.dehydrated !== null)
            return Kr(t, Fl(Da.current)), t.flags |= Xe, null;
          var p = t.child, v = p.childLanes;
          if (In(n, v))
            return hb(e, t, n);
          Kr(t, Fl(Da.current));
          var x = xr(e, t, n);
          return x !== null ? x.sibling : null;
        } else
          Kr(t, Fl(Da.current));
        break;
      }
      case ye: {
        var E = (e.flags & Xe) !== Ee, O = In(n, t.childLanes);
        if (E) {
          if (O)
            return Nb(e, t, n);
          t.flags |= Xe;
        }
        var V = t.memoizedState;
        if (V !== null && (V.rendering = null, V.tail = null, V.lastEffect = null), Kr(t, Da.current), O)
          break;
        return null;
      }
      case de:
      case we:
        return t.lanes = Y, fb(e, t, n);
    }
    return xr(e, t, n);
  }
  function Sb(e, t, n) {
    if (t._debugNeedsRemount && e !== null)
      return yT(e, t, vv(t.type, t.key, t.pendingProps, t._debugOwner || null, t.mode, t.lanes));
    if (e !== null) {
      var a = e.memoizedProps, r = t.pendingProps;
      if (a !== r || tc() || // Force a re-render if the implementation changed due to hot reload:
      t.type !== e.type)
        wa = !0;
      else {
        var i = zm(e, n);
        if (!i && // If this is the second pass of an error or suspense boundary, there
        // may not be work scheduled on `current`, so we check for this flag.
        (t.flags & Xe) === Ee)
          return wa = !1, gT(e, t, n);
        (e.flags & Yf) !== Ee ? wa = !0 : wa = !1;
      }
    } else if (wa = !1, tn() && $0(t)) {
      var l = t.index, o = Y0();
      Xy(t, o, l);
    }
    switch (t.lanes = Y, t.tag) {
      case _:
        return ZD(e, t, t.type, n);
      case xe: {
        var u = t.elementType;
        return XD(e, t, u, n);
      }
      case C: {
        var p = t.type, v = t.pendingProps, x = t.elementType === p ? v : ja(p, v);
        return Om(e, t, p, x, n);
      }
      case T: {
        var E = t.type, O = t.pendingProps, V = t.elementType === E ? O : ja(E, O);
        return pb(e, t, E, V, n);
      }
      case S:
        return WD(e, t, n);
      case z:
        return QD(e, t, n);
      case W:
        return KD(e, t);
      case X:
        return hb(e, t, n);
      case M:
        return mT(e, t, n);
      case G: {
        var U = t.type, ae = t.pendingProps, he = t.elementType === U ? ae : ja(U, ae);
        return ub(e, t, U, he, n);
      }
      case fe:
        return ID(e, t, n);
      case J:
        return qD(e, t, n);
      case P:
        return GD(e, t, n);
      case B:
        return vT(e, t, n);
      case ue:
        return hT(e, t, n);
      case te: {
        var pe = t.type, Ye = t.pendingProps, ze = ja(pe, Ye);
        if (t.type !== t.elementType) {
          var j = pe.propTypes;
          j && Sa(
            j,
            ze,
            // Resolved for outer only
            "prop",
            Qe(pe)
          );
        }
        return ze = ja(pe.type, ze), sb(e, t, pe, ze, n);
      }
      case $:
        return cb(e, t, t.type, t.pendingProps, n);
      case Q: {
        var F = t.type, w = t.pendingProps, q = t.elementType === F ? w : ja(F, w);
        return JD(e, t, F, q, n);
      }
      case ye:
        return Nb(e, t, n);
      case Ce:
        break;
      case de:
        return fb(e, t, n);
    }
    throw new Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
  }
  function Yl(e) {
    e.flags |= Ke;
  }
  function Rb(e) {
    e.flags |= xi, e.flags |= If;
  }
  var Cb, Hm, Db, Tb;
  Cb = function(e, t, n, a) {
    for (var r = t.child; r !== null; ) {
      if (r.tag === z || r.tag === W)
        HC(e, r.stateNode);
      else if (r.tag !== M) {
        if (r.child !== null) {
          r.child.return = r, r = r.child;
          continue;
        }
      }
      if (r === t)
        return;
      for (; r.sibling === null; ) {
        if (r.return === null || r.return === t)
          return;
        r = r.return;
      }
      r.sibling.return = r.return, r = r.sibling;
    }
  }, Hm = function(e, t) {
  }, Db = function(e, t, n, a, r) {
    var i = e.memoizedProps;
    if (i !== a) {
      var l = t.stateNode, o = Mp(), u = PC(l, n, i, a, r, o);
      t.updateQueue = u, u && Yl(t);
    }
  }, Tb = function(e, t, n, a) {
    n !== a && Yl(t);
  };
  function Lu(e, t) {
    if (!tn())
      switch (e.tailMode) {
        case "hidden": {
          for (var n = e.tail, a = null; n !== null; )
            n.alternate !== null && (a = n), n = n.sibling;
          a === null ? e.tail = null : a.sibling = null;
          break;
        }
        case "collapsed": {
          for (var r = e.tail, i = null; r !== null; )
            r.alternate !== null && (i = r), r = r.sibling;
          i === null ? !t && e.tail !== null ? e.tail.sibling = null : e.tail = null : i.sibling = null;
          break;
        }
      }
  }
  function an(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, n = Y, a = Ee;
    if (t) {
      if ((e.mode & tt) !== be) {
        for (var u = e.selfBaseDuration, p = e.child; p !== null; )
          n = Ae(n, Ae(p.lanes, p.childLanes)), a |= p.subtreeFlags & dr, a |= p.flags & dr, u += p.treeBaseDuration, p = p.sibling;
        e.treeBaseDuration = u;
      } else
        for (var v = e.child; v !== null; )
          n = Ae(n, Ae(v.lanes, v.childLanes)), a |= v.subtreeFlags & dr, a |= v.flags & dr, v.return = e, v = v.sibling;
      e.subtreeFlags |= a;
    } else {
      if ((e.mode & tt) !== be) {
        for (var r = e.actualDuration, i = e.selfBaseDuration, l = e.child; l !== null; )
          n = Ae(n, Ae(l.lanes, l.childLanes)), a |= l.subtreeFlags, a |= l.flags, r += l.actualDuration, i += l.treeBaseDuration, l = l.sibling;
        e.actualDuration = r, e.treeBaseDuration = i;
      } else
        for (var o = e.child; o !== null; )
          n = Ae(n, Ae(o.lanes, o.childLanes)), a |= o.subtreeFlags, a |= o.flags, o.return = e, o = o.sibling;
      e.subtreeFlags |= a;
    }
    return e.childLanes = n, t;
  }
  function bT(e, t, n) {
    if (aD() && (t.mode & Pe) !== be && (t.flags & Xe) === Ee)
      return rg(t), Vl(), t.flags |= cr | bs | Dn, !1;
    var a = uc(t);
    if (n !== null && n.dehydrated !== null)
      if (e === null) {
        if (!a)
          throw new Error("A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.");
        if (tD(t), an(t), (t.mode & tt) !== be) {
          var r = n !== null;
          if (r) {
            var i = t.child;
            i !== null && (t.treeBaseDuration -= i.treeBaseDuration);
          }
        }
        return !1;
      } else {
        if (Vl(), (t.flags & Xe) === Ee && (t.memoizedState = null), t.flags |= Ke, an(t), (t.mode & tt) !== be) {
          var l = n !== null;
          if (l) {
            var o = t.child;
            o !== null && (t.treeBaseDuration -= o.treeBaseDuration);
          }
        }
        return !1;
      }
    else
      return ig(), !0;
  }
  function jb(e, t, n) {
    var a = t.pendingProps;
    switch (dp(t), t.tag) {
      case _:
      case xe:
      case $:
      case C:
      case G:
      case fe:
      case J:
      case P:
      case ue:
      case te:
        return an(t), null;
      case T: {
        var r = t.type;
        return Ia(r) && nc(t), an(t), null;
      }
      case S: {
        var i = t.stateNode;
        if (Ul(t), up(t), zp(), i.pendingContext && (i.context = i.pendingContext, i.pendingContext = null), e === null || e.child === null) {
          var l = uc(t);
          if (l)
            Yl(t);
          else if (e !== null) {
            var o = e.memoizedState;
            // Check if this is a client root
            (!o.isDehydrated || // Check if we reverted to client rendering (e.g. due to an error)
            (t.flags & cr) !== Ee) && (t.flags |= dl, ig());
          }
        }
        return Hm(e, t), an(t), null;
      }
      case z: {
        Ap(t);
        var u = Ng(), p = t.type;
        if (e !== null && t.stateNode != null)
          Db(e, t, p, a, u), e.ref !== t.ref && Rb(t);
        else {
          if (!a) {
            if (t.stateNode === null)
              throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
            return an(t), null;
          }
          var v = Mp(), x = uc(t);
          if (x)
            Z0(t, u, v) && Yl(t);
          else {
            var E = zC(p, a, u, v, t);
            Cb(E, t, !1, !1), t.stateNode = E, BC(E, p, a, u) && Yl(t);
          }
          t.ref !== null && Rb(t);
        }
        return an(t), null;
      }
      case W: {
        var O = a;
        if (e && t.stateNode != null) {
          var V = e.memoizedProps;
          Tb(e, t, V, O);
        } else {
          if (typeof O != "string" && t.stateNode === null)
            throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
          var U = Ng(), ae = Mp(), he = uc(t);
          he ? eD(t) && Yl(t) : t.stateNode = $C(O, U, ae, t);
        }
        return an(t), null;
      }
      case X: {
        zl(t);
        var pe = t.memoizedState;
        if (e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          var Ye = bT(e, t, pe);
          if (!Ye)
            return t.flags & Dn ? t : null;
        }
        if ((t.flags & Xe) !== Ee)
          return t.lanes = n, (t.mode & tt) !== be && cm(t), t;
        var ze = pe !== null, j = e !== null && e.memoizedState !== null;
        if (ze !== j && ze) {
          var F = t.child;
          if (F.flags |= Si, (t.mode & Pe) !== be) {
            var w = e === null && (t.memoizedProps.unstable_avoidThisFallback !== !0 || !0);
            w || kp(Da.current, Sg) ? Nj() : rv();
          }
        }
        var q = t.updateQueue;
        if (q !== null && (t.flags |= Ke), an(t), (t.mode & tt) !== be && ze) {
          var oe = t.child;
          oe !== null && (t.treeBaseDuration -= oe.treeBaseDuration);
        }
        return null;
      }
      case M:
        return Ul(t), Hm(e, t), e === null && k0(t.stateNode.containerInfo), an(t), null;
      case B:
        var re = t.type._context;
        return Dp(re, t), an(t), null;
      case Q: {
        var Se = t.type;
        return Ia(Se) && nc(t), an(t), null;
      }
      case ye: {
        zl(t);
        var Oe = t.memoizedState;
        if (Oe === null)
          return an(t), null;
        var at = (t.flags & Xe) !== Ee, Ge = Oe.rendering;
        if (Ge === null)
          if (at)
            Lu(Oe, !1);
          else {
            var St = xj() && (e === null || (e.flags & Xe) === Ee);
            if (!St)
              for (var We = t.child; We !== null; ) {
                var xt = Rc(We);
                if (xt !== null) {
                  at = !0, t.flags |= Xe, Lu(Oe, !1);
                  var yn = xt.updateQueue;
                  return yn !== null && (t.updateQueue = yn, t.flags |= Ke), t.subtreeFlags = Ee, cD(t, n), Kr(t, Up(Da.current, bu)), t.child;
                }
                We = We.sibling;
              }
            Oe.tail !== null && It() > Qb() && (t.flags |= Xe, at = !0, Lu(Oe, !1), t.lanes = Th);
          }
        else {
          if (!at) {
            var sn = Rc(Ge);
            if (sn !== null) {
              t.flags |= Xe, at = !0;
              var Xn = sn.updateQueue;
              if (Xn !== null && (t.updateQueue = Xn, t.flags |= Ke), Lu(Oe, !0), Oe.tail === null && Oe.tailMode === "hidden" && !Ge.alternate && !tn())
                return an(t), null;
            } else // The time it took to render last row is greater than the remaining
            // time we have to render. So rendering one more row would likely
            // exceed it.
            It() * 2 - Oe.renderingStartTime > Qb() && n !== Yn && (t.flags |= Xe, at = !0, Lu(Oe, !1), t.lanes = Th);
          }
          if (Oe.isBackwards)
            Ge.sibling = t.child, t.child = Ge;
          else {
            var _n = Oe.last;
            _n !== null ? _n.sibling = Ge : t.child = Ge, Oe.last = Ge;
          }
        }
        if (Oe.tail !== null) {
          var On = Oe.tail;
          Oe.rendering = On, Oe.tail = On.sibling, Oe.renderingStartTime = It(), On.sibling = null;
          var gn = Da.current;
          return at ? gn = Up(gn, bu) : gn = Fl(gn), Kr(t, gn), On;
        }
        return an(t), null;
      }
      case Ce:
        break;
      case de:
      case we: {
        av(t);
        var Tr = t.memoizedState, Jl = Tr !== null;
        if (e !== null) {
          var Wu = e.memoizedState, Za = Wu !== null;
          Za !== Jl && // LegacyHidden doesn't do any hiding — it only pre-renders.
          !Bn && (t.flags |= Si);
        }
        return !Jl || (t.mode & Pe) === be ? an(t) : In(Ja, Yn) && (an(t), t.subtreeFlags & (Dt | Ke) && (t.flags |= Si)), null;
      }
      case Ie:
        return null;
      case qe:
        return null;
    }
    throw new Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
  }
  function NT(e, t, n) {
    switch (dp(t), t.tag) {
      case T: {
        var a = t.type;
        Ia(a) && nc(t);
        var r = t.flags;
        return r & Dn ? (t.flags = r & ~Dn | Xe, (t.mode & tt) !== be && cm(t), t) : null;
      }
      case S: {
        t.stateNode, Ul(t), up(t), zp();
        var i = t.flags;
        return (i & Dn) !== Ee && (i & Xe) === Ee ? (t.flags = i & ~Dn | Xe, t) : null;
      }
      case z:
        return Ap(t), null;
      case X: {
        zl(t);
        var l = t.memoizedState;
        if (l !== null && l.dehydrated !== null) {
          if (t.alternate === null)
            throw new Error("Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue.");
          Vl();
        }
        var o = t.flags;
        return o & Dn ? (t.flags = o & ~Dn | Xe, (t.mode & tt) !== be && cm(t), t) : null;
      }
      case ye:
        return zl(t), null;
      case M:
        return Ul(t), null;
      case B:
        var u = t.type._context;
        return Dp(u, t), null;
      case de:
      case we:
        return av(t), null;
      case Ie:
        return null;
      default:
        return null;
    }
  }
  function wb(e, t, n) {
    switch (dp(t), t.tag) {
      case T: {
        var a = t.type.childContextTypes;
        a != null && nc(t);
        break;
      }
      case S: {
        t.stateNode, Ul(t), up(t), zp();
        break;
      }
      case z: {
        Ap(t);
        break;
      }
      case M:
        Ul(t);
        break;
      case X:
        zl(t);
        break;
      case ye:
        zl(t);
        break;
      case B:
        var r = t.type._context;
        Dp(r, t);
        break;
      case de:
      case we:
        av(t);
        break;
    }
  }
  var _b = null;
  _b = /* @__PURE__ */ new Set();
  var Wc = !1, rn = !1, ET = typeof WeakSet == "function" ? WeakSet : Set, se = null, Il = null, ql = null;
  function xT(e) {
    Bf(null, function() {
      throw e;
    }), Pf();
  }
  var ST = function(e, t) {
    if (t.props = e.memoizedProps, t.state = e.memoizedState, e.mode & tt)
      try {
        Ka(), t.componentWillUnmount();
      } finally {
        Qa(e);
      }
    else
      t.componentWillUnmount();
  };
  function Ob(e, t) {
    try {
      Zr(Vt, e);
    } catch (n) {
      it(e, t, n);
    }
  }
  function Bm(e, t, n) {
    try {
      ST(e, n);
    } catch (a) {
      it(e, t, a);
    }
  }
  function RT(e, t, n) {
    try {
      n.componentDidMount();
    } catch (a) {
      it(e, t, a);
    }
  }
  function Lb(e, t) {
    try {
      Mb(e);
    } catch (n) {
      it(e, t, n);
    }
  }
  function Gl(e, t) {
    var n = e.ref;
    if (n !== null)
      if (typeof n == "function") {
        var a;
        try {
          if (bn && er && e.mode & tt)
            try {
              Ka(), a = n(null);
            } finally {
              Qa(e);
            }
          else
            a = n(null);
        } catch (r) {
          it(e, t, r);
        }
        typeof a == "function" && f("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", Le(e));
      } else
        n.current = null;
  }
  function Qc(e, t, n) {
    try {
      n();
    } catch (a) {
      it(e, t, a);
    }
  }
  var Vb = !1;
  function CT(e, t) {
    UC(e.containerInfo), se = t, DT();
    var n = Vb;
    return Vb = !1, n;
  }
  function DT() {
    for (; se !== null; ) {
      var e = se, t = e.child;
      (e.subtreeFlags & Wf) !== Ee && t !== null ? (t.return = e, se = t) : TT();
    }
  }
  function TT() {
    for (; se !== null; ) {
      var e = se;
      pt(e);
      try {
        jT(e);
      } catch (n) {
        it(e, e.return, n);
      }
      Yt();
      var t = e.sibling;
      if (t !== null) {
        t.return = e.return, se = t;
        return;
      }
      se = e.return;
    }
  }
  function jT(e) {
    var t = e.alternate, n = e.flags;
    if ((n & dl) !== Ee) {
      switch (pt(e), e.tag) {
        case C:
        case G:
        case $:
          break;
        case T: {
          if (t !== null) {
            var a = t.memoizedProps, r = t.memoizedState, i = e.stateNode;
            e.type === e.elementType && !$i && (i.props !== e.memoizedProps && f("Expected %s props to match memoized props before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Le(e) || "instance"), i.state !== e.memoizedState && f("Expected %s state to match memoized state before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Le(e) || "instance"));
            var l = i.getSnapshotBeforeUpdate(e.elementType === e.type ? a : ja(e.type, a), r);
            {
              var o = _b;
              l === void 0 && !o.has(e.type) && (o.add(e.type), f("%s.getSnapshotBeforeUpdate(): A snapshot value (or null) must be returned. You have returned undefined.", Le(e)));
            }
            i.__reactInternalSnapshotBeforeUpdate = l;
          }
          break;
        }
        case S: {
          {
            var u = e.stateNode;
            u0(u.containerInfo);
          }
          break;
        }
        case z:
        case W:
        case M:
        case Q:
          break;
        default:
          throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
      }
      Yt();
    }
  }
  function _a(e, t, n) {
    var a = t.updateQueue, r = a !== null ? a.lastEffect : null;
    if (r !== null) {
      var i = r.next, l = i;
      do {
        if ((l.tag & e) === e) {
          var o = l.destroy;
          l.destroy = void 0, o !== void 0 && ((e & nn) !== Fn ? $x(t) : (e & Vt) !== Fn && xh(t), (e & qa) !== Fn && Iu(!0), Qc(t, n, o), (e & qa) !== Fn && Iu(!1), (e & nn) !== Fn ? Yx() : (e & Vt) !== Fn && Sh());
        }
        l = l.next;
      } while (l !== i);
    }
  }
  function Zr(e, t) {
    var n = t.updateQueue, a = n !== null ? n.lastEffect : null;
    if (a !== null) {
      var r = a.next, i = r;
      do {
        if ((i.tag & e) === e) {
          (e & nn) !== Fn ? Bx(t) : (e & Vt) !== Fn && Ix(t);
          var l = i.create;
          (e & qa) !== Fn && Iu(!0), i.destroy = l(), (e & qa) !== Fn && Iu(!1), (e & nn) !== Fn ? Px() : (e & Vt) !== Fn && qx();
          {
            var o = i.destroy;
            if (o !== void 0 && typeof o != "function") {
              var u = void 0;
              (i.tag & Vt) !== Ee ? u = "useLayoutEffect" : (i.tag & qa) !== Ee ? u = "useInsertionEffect" : u = "useEffect";
              var p = void 0;
              o === null ? p = " You returned null. If your effect does not require clean up, return undefined (or nothing)." : typeof o.then == "function" ? p = `

It looks like you wrote ` + u + `(async () => ...) or returned a Promise. Instead, write the async function inside your effect and call it immediately:

` + u + `(() => {
  async function fetchData() {
    // You can await here
    const response = await MyAPI.getData(someId);
    // ...
  }
  fetchData();
}, [someId]); // Or [] if effect doesn't need props or state

Learn more about data fetching with Hooks: https://reactjs.org/link/hooks-data-fetching` : p = " You returned: " + o, f("%s must not return anything besides a function, which is used for clean-up.%s", u, p);
            }
          }
        }
        i = i.next;
      } while (i !== r);
    }
  }
  function wT(e, t) {
    if ((t.flags & Ke) !== Ee)
      switch (t.tag) {
        case P: {
          var n = t.stateNode.passiveEffectDuration, a = t.memoizedProps, r = a.id, i = a.onPostCommit, l = Qg(), o = t.alternate === null ? "mount" : "update";
          Wg() && (o = "nested-update"), typeof i == "function" && i(r, o, n, l);
          var u = t.return;
          e: for (; u !== null; ) {
            switch (u.tag) {
              case S:
                var p = u.stateNode;
                p.passiveEffectDuration += n;
                break e;
              case P:
                var v = u.stateNode;
                v.passiveEffectDuration += n;
                break e;
            }
            u = u.return;
          }
          break;
        }
      }
  }
  function _T(e, t, n, a) {
    if ((n.flags & To) !== Ee)
      switch (n.tag) {
        case C:
        case G:
        case $: {
          if (!rn)
            if (n.mode & tt)
              try {
                Ka(), Zr(Vt | Lt, n);
              } finally {
                Qa(n);
              }
            else
              Zr(Vt | Lt, n);
          break;
        }
        case T: {
          var r = n.stateNode;
          if (n.flags & Ke && !rn)
            if (t === null)
              if (n.type === n.elementType && !$i && (r.props !== n.memoizedProps && f("Expected %s props to match memoized props before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Le(n) || "instance"), r.state !== n.memoizedState && f("Expected %s state to match memoized state before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Le(n) || "instance")), n.mode & tt)
                try {
                  Ka(), r.componentDidMount();
                } finally {
                  Qa(n);
                }
              else
                r.componentDidMount();
            else {
              var i = n.elementType === n.type ? t.memoizedProps : ja(n.type, t.memoizedProps), l = t.memoizedState;
              if (n.type === n.elementType && !$i && (r.props !== n.memoizedProps && f("Expected %s props to match memoized props before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Le(n) || "instance"), r.state !== n.memoizedState && f("Expected %s state to match memoized state before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Le(n) || "instance")), n.mode & tt)
                try {
                  Ka(), r.componentDidUpdate(i, l, r.__reactInternalSnapshotBeforeUpdate);
                } finally {
                  Qa(n);
                }
              else
                r.componentDidUpdate(i, l, r.__reactInternalSnapshotBeforeUpdate);
            }
          var o = n.updateQueue;
          o !== null && (n.type === n.elementType && !$i && (r.props !== n.memoizedProps && f("Expected %s props to match memoized props before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Le(n) || "instance"), r.state !== n.memoizedState && f("Expected %s state to match memoized state before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Le(n) || "instance")), bg(n, o, r));
          break;
        }
        case S: {
          var u = n.updateQueue;
          if (u !== null) {
            var p = null;
            if (n.child !== null)
              switch (n.child.tag) {
                case z:
                  p = n.child.stateNode;
                  break;
                case T:
                  p = n.child.stateNode;
                  break;
              }
            bg(n, u, p);
          }
          break;
        }
        case z: {
          var v = n.stateNode;
          if (t === null && n.flags & Ke) {
            var x = n.type, E = n.memoizedProps;
            WC(v, x, E);
          }
          break;
        }
        case W:
          break;
        case M:
          break;
        case P: {
          {
            var O = n.memoizedProps, V = O.onCommit, U = O.onRender, ae = n.stateNode.effectDuration, he = Qg(), pe = t === null ? "mount" : "update";
            Wg() && (pe = "nested-update"), typeof U == "function" && U(n.memoizedProps.id, pe, n.actualDuration, n.treeBaseDuration, n.actualStartTime, he);
            {
              typeof V == "function" && V(n.memoizedProps.id, pe, ae, he), Tj(n);
              var Ye = n.return;
              e: for (; Ye !== null; ) {
                switch (Ye.tag) {
                  case S:
                    var ze = Ye.stateNode;
                    ze.effectDuration += ae;
                    break e;
                  case P:
                    var j = Ye.stateNode;
                    j.effectDuration += ae;
                    break e;
                }
                Ye = Ye.return;
              }
            }
          }
          break;
        }
        case X: {
          FT(e, n);
          break;
        }
        case ye:
        case Q:
        case Ce:
        case de:
        case we:
        case qe:
          break;
        default:
          throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
      }
    rn || n.flags & xi && Mb(n);
  }
  function OT(e) {
    switch (e.tag) {
      case C:
      case G:
      case $: {
        if (e.mode & tt)
          try {
            Ka(), Ob(e, e.return);
          } finally {
            Qa(e);
          }
        else
          Ob(e, e.return);
        break;
      }
      case T: {
        var t = e.stateNode;
        typeof t.componentDidMount == "function" && RT(e, e.return, t), Lb(e, e.return);
        break;
      }
      case z: {
        Lb(e, e.return);
        break;
      }
    }
  }
  function LT(e, t) {
    for (var n = null, a = e; ; ) {
      if (a.tag === z) {
        if (n === null) {
          n = a;
          try {
            var r = a.stateNode;
            t ? r0(r) : l0(a.stateNode, a.memoizedProps);
          } catch (l) {
            it(e, e.return, l);
          }
        }
      } else if (a.tag === W) {
        if (n === null)
          try {
            var i = a.stateNode;
            t ? i0(i) : o0(i, a.memoizedProps);
          } catch (l) {
            it(e, e.return, l);
          }
      } else if (!((a.tag === de || a.tag === we) && a.memoizedState !== null && a !== e)) {
        if (a.child !== null) {
          a.child.return = a, a = a.child;
          continue;
        }
      }
      if (a === e)
        return;
      for (; a.sibling === null; ) {
        if (a.return === null || a.return === e)
          return;
        n === a && (n = null), a = a.return;
      }
      n === a && (n = null), a.sibling.return = a.return, a = a.sibling;
    }
  }
  function Mb(e) {
    var t = e.ref;
    if (t !== null) {
      var n = e.stateNode, a;
      switch (e.tag) {
        case z:
          a = n;
          break;
        default:
          a = n;
      }
      if (typeof t == "function") {
        var r;
        if (e.mode & tt)
          try {
            Ka(), r = t(a);
          } finally {
            Qa(e);
          }
        else
          r = t(a);
        typeof r == "function" && f("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", Le(e));
      } else
        t.hasOwnProperty("current") || f("Unexpected ref object provided for %s. Use either a ref-setter function or React.createRef().", Le(e)), t.current = a;
    }
  }
  function VT(e) {
    var t = e.alternate;
    t !== null && (t.return = null), e.return = null;
  }
  function Ab(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, Ab(t));
    {
      if (e.child = null, e.deletions = null, e.sibling = null, e.tag === z) {
        var n = e.stateNode;
        n !== null && z0(n);
      }
      e.stateNode = null, e._debugOwner = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
    }
  }
  function MT(e) {
    for (var t = e.return; t !== null; ) {
      if (kb(t))
        return t;
      t = t.return;
    }
    throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
  }
  function kb(e) {
    return e.tag === z || e.tag === S || e.tag === M;
  }
  function Ub(e) {
    var t = e;
    e: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || kb(t.return))
          return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== z && t.tag !== W && t.tag !== Re; ) {
        if (t.flags & Dt || t.child === null || t.tag === M)
          continue e;
        t.child.return = t, t = t.child;
      }
      if (!(t.flags & Dt))
        return t.stateNode;
    }
  }
  function AT(e) {
    var t = MT(e);
    switch (t.tag) {
      case z: {
        var n = t.stateNode;
        t.flags & Do && (zy(n), t.flags &= ~Do);
        var a = Ub(e);
        $m(e, a, n);
        break;
      }
      case S:
      case M: {
        var r = t.stateNode.containerInfo, i = Ub(e);
        Pm(e, i, r);
        break;
      }
      default:
        throw new Error("Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue.");
    }
  }
  function Pm(e, t, n) {
    var a = e.tag, r = a === z || a === W;
    if (r) {
      var i = e.stateNode;
      t ? e0(n, i, t) : JC(n, i);
    } else if (a !== M) {
      var l = e.child;
      if (l !== null) {
        Pm(l, t, n);
        for (var o = l.sibling; o !== null; )
          Pm(o, t, n), o = o.sibling;
      }
    }
  }
  function $m(e, t, n) {
    var a = e.tag, r = a === z || a === W;
    if (r) {
      var i = e.stateNode;
      t ? ZC(n, i, t) : XC(n, i);
    } else if (a !== M) {
      var l = e.child;
      if (l !== null) {
        $m(l, t, n);
        for (var o = l.sibling; o !== null; )
          $m(o, t, n), o = o.sibling;
      }
    }
  }
  var ln = null, Oa = !1;
  function kT(e, t, n) {
    {
      var a = t;
      e: for (; a !== null; ) {
        switch (a.tag) {
          case z: {
            ln = a.stateNode, Oa = !1;
            break e;
          }
          case S: {
            ln = a.stateNode.containerInfo, Oa = !0;
            break e;
          }
          case M: {
            ln = a.stateNode.containerInfo, Oa = !0;
            break e;
          }
        }
        a = a.return;
      }
      if (ln === null)
        throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
      Fb(e, t, n), ln = null, Oa = !1;
    }
    VT(n);
  }
  function ei(e, t, n) {
    for (var a = n.child; a !== null; )
      Fb(e, t, a), a = a.sibling;
  }
  function Fb(e, t, n) {
    switch (Ux(n), n.tag) {
      case z:
        rn || Gl(n, t);
      case W: {
        {
          var a = ln, r = Oa;
          ln = null, ei(e, t, n), ln = a, Oa = r, ln !== null && (Oa ? n0(ln, n.stateNode) : t0(ln, n.stateNode));
        }
        return;
      }
      case Re: {
        ln !== null && (Oa ? a0(ln, n.stateNode) : ep(ln, n.stateNode));
        return;
      }
      case M: {
        {
          var i = ln, l = Oa;
          ln = n.stateNode.containerInfo, Oa = !0, ei(e, t, n), ln = i, Oa = l;
        }
        return;
      }
      case C:
      case G:
      case te:
      case $: {
        if (!rn) {
          var o = n.updateQueue;
          if (o !== null) {
            var u = o.lastEffect;
            if (u !== null) {
              var p = u.next, v = p;
              do {
                var x = v, E = x.destroy, O = x.tag;
                E !== void 0 && ((O & qa) !== Fn ? Qc(n, t, E) : (O & Vt) !== Fn && (xh(n), n.mode & tt ? (Ka(), Qc(n, t, E), Qa(n)) : Qc(n, t, E), Sh())), v = v.next;
              } while (v !== p);
            }
          }
        }
        ei(e, t, n);
        return;
      }
      case T: {
        if (!rn) {
          Gl(n, t);
          var V = n.stateNode;
          typeof V.componentWillUnmount == "function" && Bm(n, t, V);
        }
        ei(e, t, n);
        return;
      }
      case Ce: {
        ei(e, t, n);
        return;
      }
      case de: {
        if (
          // TODO: Remove this dead flag
          n.mode & Pe
        ) {
          var U = rn;
          rn = U || n.memoizedState !== null, ei(e, t, n), rn = U;
        } else
          ei(e, t, n);
        break;
      }
      default: {
        ei(e, t, n);
        return;
      }
    }
  }
  function UT(e) {
    e.memoizedState;
  }
  function FT(e, t) {
    var n = t.memoizedState;
    if (n === null) {
      var a = t.alternate;
      if (a !== null) {
        var r = a.memoizedState;
        if (r !== null) {
          var i = r.dehydrated;
          i !== null && x0(i);
        }
      }
    }
  }
  function zb(e) {
    var t = e.updateQueue;
    if (t !== null) {
      e.updateQueue = null;
      var n = e.stateNode;
      n === null && (n = e.stateNode = new ET()), t.forEach(function(a) {
        var r = Mj.bind(null, e, a);
        if (!n.has(a)) {
          if (n.add(a), Ea)
            if (Il !== null && ql !== null)
              Yu(ql, Il);
            else
              throw Error("Expected finished root and lanes to be set. This is a bug in React.");
          a.then(r, r);
        }
      });
    }
  }
  function zT(e, t, n) {
    Il = n, ql = e, pt(t), Hb(t, e), pt(t), Il = null, ql = null;
  }
  function La(e, t, n) {
    var a = t.deletions;
    if (a !== null)
      for (var r = 0; r < a.length; r++) {
        var i = a[r];
        try {
          kT(e, t, i);
        } catch (u) {
          it(i, t, u);
        }
      }
    var l = us();
    if (t.subtreeFlags & Qf)
      for (var o = t.child; o !== null; )
        pt(o), Hb(o, e), o = o.sibling;
    pt(l);
  }
  function Hb(e, t, n) {
    var a = e.alternate, r = e.flags;
    switch (e.tag) {
      case C:
      case G:
      case te:
      case $: {
        if (La(t, e), Xa(e), r & Ke) {
          try {
            _a(qa | Lt, e, e.return), Zr(qa | Lt, e);
          } catch (Se) {
            it(e, e.return, Se);
          }
          if (e.mode & tt) {
            try {
              Ka(), _a(Vt | Lt, e, e.return);
            } catch (Se) {
              it(e, e.return, Se);
            }
            Qa(e);
          } else
            try {
              _a(Vt | Lt, e, e.return);
            } catch (Se) {
              it(e, e.return, Se);
            }
        }
        return;
      }
      case T: {
        La(t, e), Xa(e), r & xi && a !== null && Gl(a, a.return);
        return;
      }
      case z: {
        La(t, e), Xa(e), r & xi && a !== null && Gl(a, a.return);
        {
          if (e.flags & Do) {
            var i = e.stateNode;
            try {
              zy(i);
            } catch (Se) {
              it(e, e.return, Se);
            }
          }
          if (r & Ke) {
            var l = e.stateNode;
            if (l != null) {
              var o = e.memoizedProps, u = a !== null ? a.memoizedProps : o, p = e.type, v = e.updateQueue;
              if (e.updateQueue = null, v !== null)
                try {
                  QC(l, v, p, u, o, e);
                } catch (Se) {
                  it(e, e.return, Se);
                }
            }
          }
        }
        return;
      }
      case W: {
        if (La(t, e), Xa(e), r & Ke) {
          if (e.stateNode === null)
            throw new Error("This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.");
          var x = e.stateNode, E = e.memoizedProps, O = a !== null ? a.memoizedProps : E;
          try {
            KC(x, O, E);
          } catch (Se) {
            it(e, e.return, Se);
          }
        }
        return;
      }
      case S: {
        if (La(t, e), Xa(e), r & Ke && a !== null) {
          var V = a.memoizedState;
          if (V.isDehydrated)
            try {
              E0(t.containerInfo);
            } catch (Se) {
              it(e, e.return, Se);
            }
        }
        return;
      }
      case M: {
        La(t, e), Xa(e);
        return;
      }
      case X: {
        La(t, e), Xa(e);
        var U = e.child;
        if (U.flags & Si) {
          var ae = U.stateNode, he = U.memoizedState, pe = he !== null;
          if (ae.isHidden = pe, pe) {
            var Ye = U.alternate !== null && U.alternate.memoizedState !== null;
            Ye || bj();
          }
        }
        if (r & Ke) {
          try {
            UT(e);
          } catch (Se) {
            it(e, e.return, Se);
          }
          zb(e);
        }
        return;
      }
      case de: {
        var ze = a !== null && a.memoizedState !== null;
        if (
          // TODO: Remove this dead flag
          e.mode & Pe
        ) {
          var j = rn;
          rn = j || ze, La(t, e), rn = j;
        } else
          La(t, e);
        if (Xa(e), r & Si) {
          var F = e.stateNode, w = e.memoizedState, q = w !== null, oe = e;
          if (F.isHidden = q, q && !ze && (oe.mode & Pe) !== be) {
            se = oe;
            for (var re = oe.child; re !== null; )
              se = re, BT(re), re = re.sibling;
          }
          LT(oe, q);
        }
        return;
      }
      case ye: {
        La(t, e), Xa(e), r & Ke && zb(e);
        return;
      }
      case Ce:
        return;
      default: {
        La(t, e), Xa(e);
        return;
      }
    }
  }
  function Xa(e) {
    var t = e.flags;
    if (t & Dt) {
      try {
        AT(e);
      } catch (n) {
        it(e, e.return, n);
      }
      e.flags &= ~Dt;
    }
    t & fr && (e.flags &= ~fr);
  }
  function HT(e, t, n) {
    Il = n, ql = t, se = e, Bb(e, t, n), Il = null, ql = null;
  }
  function Bb(e, t, n) {
    for (var a = (e.mode & Pe) !== be; se !== null; ) {
      var r = se, i = r.child;
      if (r.tag === de && a) {
        var l = r.memoizedState !== null, o = l || Wc;
        if (o) {
          Ym(e, t, n);
          continue;
        } else {
          var u = r.alternate, p = u !== null && u.memoizedState !== null, v = p || rn, x = Wc, E = rn;
          Wc = o, rn = v, rn && !E && (se = r, PT(r));
          for (var O = i; O !== null; )
            se = O, Bb(
              O,
              // New root; bubble back up to here and stop.
              t,
              n
            ), O = O.sibling;
          se = r, Wc = x, rn = E, Ym(e, t, n);
          continue;
        }
      }
      (r.subtreeFlags & To) !== Ee && i !== null ? (i.return = r, se = i) : Ym(e, t, n);
    }
  }
  function Ym(e, t, n) {
    for (; se !== null; ) {
      var a = se;
      if ((a.flags & To) !== Ee) {
        var r = a.alternate;
        pt(a);
        try {
          _T(t, r, a, n);
        } catch (l) {
          it(a, a.return, l);
        }
        Yt();
      }
      if (a === e) {
        se = null;
        return;
      }
      var i = a.sibling;
      if (i !== null) {
        i.return = a.return, se = i;
        return;
      }
      se = a.return;
    }
  }
  function BT(e) {
    for (; se !== null; ) {
      var t = se, n = t.child;
      switch (t.tag) {
        case C:
        case G:
        case te:
        case $: {
          if (t.mode & tt)
            try {
              Ka(), _a(Vt, t, t.return);
            } finally {
              Qa(t);
            }
          else
            _a(Vt, t, t.return);
          break;
        }
        case T: {
          Gl(t, t.return);
          var a = t.stateNode;
          typeof a.componentWillUnmount == "function" && Bm(t, t.return, a);
          break;
        }
        case z: {
          Gl(t, t.return);
          break;
        }
        case de: {
          var r = t.memoizedState !== null;
          if (r) {
            Pb(e);
            continue;
          }
          break;
        }
      }
      n !== null ? (n.return = t, se = n) : Pb(e);
    }
  }
  function Pb(e) {
    for (; se !== null; ) {
      var t = se;
      if (t === e) {
        se = null;
        return;
      }
      var n = t.sibling;
      if (n !== null) {
        n.return = t.return, se = n;
        return;
      }
      se = t.return;
    }
  }
  function PT(e) {
    for (; se !== null; ) {
      var t = se, n = t.child;
      if (t.tag === de) {
        var a = t.memoizedState !== null;
        if (a) {
          $b(e);
          continue;
        }
      }
      n !== null ? (n.return = t, se = n) : $b(e);
    }
  }
  function $b(e) {
    for (; se !== null; ) {
      var t = se;
      pt(t);
      try {
        OT(t);
      } catch (a) {
        it(t, t.return, a);
      }
      if (Yt(), t === e) {
        se = null;
        return;
      }
      var n = t.sibling;
      if (n !== null) {
        n.return = t.return, se = n;
        return;
      }
      se = t.return;
    }
  }
  function $T(e, t, n, a) {
    se = t, YT(t, e, n, a);
  }
  function YT(e, t, n, a) {
    for (; se !== null; ) {
      var r = se, i = r.child;
      (r.subtreeFlags & pl) !== Ee && i !== null ? (i.return = r, se = i) : IT(e, t, n, a);
    }
  }
  function IT(e, t, n, a) {
    for (; se !== null; ) {
      var r = se;
      if ((r.flags & Ar) !== Ee) {
        pt(r);
        try {
          qT(t, r, n, a);
        } catch (l) {
          it(r, r.return, l);
        }
        Yt();
      }
      if (r === e) {
        se = null;
        return;
      }
      var i = r.sibling;
      if (i !== null) {
        i.return = r.return, se = i;
        return;
      }
      se = r.return;
    }
  }
  function qT(e, t, n, a) {
    switch (t.tag) {
      case C:
      case G:
      case $: {
        if (t.mode & tt) {
          sm();
          try {
            Zr(nn | Lt, t);
          } finally {
            um(t);
          }
        } else
          Zr(nn | Lt, t);
        break;
      }
    }
  }
  function GT(e) {
    se = e, WT();
  }
  function WT() {
    for (; se !== null; ) {
      var e = se, t = e.child;
      if ((se.flags & Ei) !== Ee) {
        var n = e.deletions;
        if (n !== null) {
          for (var a = 0; a < n.length; a++) {
            var r = n[a];
            se = r, XT(r, e);
          }
          {
            var i = e.alternate;
            if (i !== null) {
              var l = i.child;
              if (l !== null) {
                i.child = null;
                do {
                  var o = l.sibling;
                  l.sibling = null, l = o;
                } while (l !== null);
              }
            }
          }
          se = e;
        }
      }
      (e.subtreeFlags & pl) !== Ee && t !== null ? (t.return = e, se = t) : QT();
    }
  }
  function QT() {
    for (; se !== null; ) {
      var e = se;
      (e.flags & Ar) !== Ee && (pt(e), KT(e), Yt());
      var t = e.sibling;
      if (t !== null) {
        t.return = e.return, se = t;
        return;
      }
      se = e.return;
    }
  }
  function KT(e) {
    switch (e.tag) {
      case C:
      case G:
      case $: {
        e.mode & tt ? (sm(), _a(nn | Lt, e, e.return), um(e)) : _a(nn | Lt, e, e.return);
        break;
      }
    }
  }
  function XT(e, t) {
    for (; se !== null; ) {
      var n = se;
      pt(n), ZT(n, t), Yt();
      var a = n.child;
      a !== null ? (a.return = n, se = a) : JT(e);
    }
  }
  function JT(e) {
    for (; se !== null; ) {
      var t = se, n = t.sibling, a = t.return;
      if (Ab(t), t === e) {
        se = null;
        return;
      }
      if (n !== null) {
        n.return = a, se = n;
        return;
      }
      se = a;
    }
  }
  function ZT(e, t) {
    switch (e.tag) {
      case C:
      case G:
      case $: {
        e.mode & tt ? (sm(), _a(nn, e, t), um(e)) : _a(nn, e, t);
        break;
      }
    }
  }
  function ej(e) {
    switch (e.tag) {
      case C:
      case G:
      case $: {
        try {
          Zr(Vt | Lt, e);
        } catch (n) {
          it(e, e.return, n);
        }
        break;
      }
      case T: {
        var t = e.stateNode;
        try {
          t.componentDidMount();
        } catch (n) {
          it(e, e.return, n);
        }
        break;
      }
    }
  }
  function tj(e) {
    switch (e.tag) {
      case C:
      case G:
      case $: {
        try {
          Zr(nn | Lt, e);
        } catch (t) {
          it(e, e.return, t);
        }
        break;
      }
    }
  }
  function nj(e) {
    switch (e.tag) {
      case C:
      case G:
      case $: {
        try {
          _a(Vt | Lt, e, e.return);
        } catch (n) {
          it(e, e.return, n);
        }
        break;
      }
      case T: {
        var t = e.stateNode;
        typeof t.componentWillUnmount == "function" && Bm(e, e.return, t);
        break;
      }
    }
  }
  function aj(e) {
    switch (e.tag) {
      case C:
      case G:
      case $:
        try {
          _a(nn | Lt, e, e.return);
        } catch (t) {
          it(e, e.return, t);
        }
    }
  }
  if (typeof Symbol == "function" && Symbol.for) {
    var Vu = Symbol.for;
    Vu("selector.component"), Vu("selector.has_pseudo_class"), Vu("selector.role"), Vu("selector.test_id"), Vu("selector.text");
  }
  var rj = [];
  function ij() {
    rj.forEach(function(e) {
      return e();
    });
  }
  var lj = h.ReactCurrentActQueue;
  function oj(e) {
    {
      var t = (
        // $FlowExpectedError – Flow doesn't know about IS_REACT_ACT_ENVIRONMENT global
        typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0
      ), n = typeof jest < "u";
      return n && t !== !1;
    }
  }
  function Yb() {
    {
      var e = (
        // $FlowExpectedError – Flow doesn't know about IS_REACT_ACT_ENVIRONMENT global
        typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0
      );
      return !e && lj.current !== null && f("The current testing environment is not configured to support act(...)"), e;
    }
  }
  var uj = Math.ceil, Im = h.ReactCurrentDispatcher, qm = h.ReactCurrentOwner, on = h.ReactCurrentBatchConfig, Va = h.ReactCurrentActQueue, kt = (
    /*             */
    0
  ), Ib = (
    /*               */
    1
  ), un = (
    /*                */
    2
  ), sa = (
    /*                */
    4
  ), Sr = 0, Mu = 1, Yi = 2, Kc = 3, Au = 4, qb = 5, Gm = 6, $e = kt, jn = null, gt = null, Ut = Y, Ja = Y, Wm = Yr(Y), Ft = Sr, ku = null, Xc = Y, Uu = Y, Jc = Y, Fu = null, zn = null, Qm = 0, Gb = 500, Wb = 1 / 0, sj = 500, Rr = null;
  function zu() {
    Wb = It() + sj;
  }
  function Qb() {
    return Wb;
  }
  var Zc = !1, Km = null, Wl = null, Ii = !1, ti = null, Hu = Y, Xm = [], Jm = null, cj = 50, Bu = 0, Zm = null, ev = !1, ef = !1, fj = 50, Ql = 0, tf = null, Pu = ut, nf = Y, Kb = !1;
  function af() {
    return jn;
  }
  function wn() {
    return ($e & (un | sa)) !== kt ? It() : (Pu !== ut || (Pu = It()), Pu);
  }
  function ni(e) {
    var t = e.mode;
    if ((t & Pe) === be)
      return Te;
    if (($e & un) !== kt && Ut !== Y)
      return Mo(Ut);
    var n = lD() !== iD;
    if (n) {
      if (on.transition !== null) {
        var a = on.transition;
        a._updatedFibers || (a._updatedFibers = /* @__PURE__ */ new Set()), a._updatedFibers.add(e);
      }
      return nf === Gt && (nf = Oh()), nf;
    }
    var r = xa();
    if (r !== Gt)
      return r;
    var i = YC();
    return i;
  }
  function dj(e) {
    var t = e.mode;
    return (t & Pe) === be ? Te : mS();
  }
  function zt(e, t, n, a) {
    kj(), Kb && f("useInsertionEffect must not schedule updates."), ev && (ef = !0), Ao(e, n, a), ($e & un) !== Y && e === jn ? zj(t) : (Ea && Mh(e, t, n), Hj(t), e === jn && (($e & un) === kt && (Uu = Ae(Uu, n)), Ft === Au && ai(e, Ut)), Hn(e, a), n === Te && $e === kt && (t.mode & Pe) === be && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
    !Va.isBatchingLegacy && (zu(), Ky()));
  }
  function pj(e, t, n) {
    var a = e.current;
    a.lanes = t, Ao(e, t, n), Hn(e, n);
  }
  function mj(e) {
    return (
      // TODO: Remove outdated deferRenderPhaseUpdateToNextBatch experiment. We
      // decided not to enable it.
      ($e & un) !== kt
    );
  }
  function Hn(e, t) {
    var n = e.callbackNode;
    uS(e, t);
    var a = Rs(e, e === jn ? Ut : Y);
    if (a === Y) {
      n !== null && dN(n), e.callbackNode = null, e.callbackPriority = Gt;
      return;
    }
    var r = wi(a), i = e.callbackPriority;
    if (i === r && // Special case related to `act`. If the currently scheduled task is a
    // Scheduler task, rather than an `act` task, cancel it and re-scheduled
    // on the `act` queue.
    !(Va.current !== null && n !== ov)) {
      n == null && i !== Te && f("Expected scheduled callback to exist. This error is likely caused by a bug in React. Please file an issue.");
      return;
    }
    n != null && dN(n);
    var l;
    if (r === Te)
      e.tag === Ir ? (Va.isBatchingLegacy !== null && (Va.didScheduleLegacyUpdate = !0), P0(Zb.bind(null, e))) : Qy(Zb.bind(null, e)), Va.current !== null ? Va.current.push(qr) : qC(function() {
        ($e & (un | sa)) === kt && qr();
      }), l = null;
    else {
      var o;
      switch (Uh(a)) {
        case qn:
          o = Ns;
          break;
        case mr:
          o = Kf;
          break;
        case vr:
          o = Di;
          break;
        case Ts:
          o = Xf;
          break;
        default:
          o = Di;
          break;
      }
      l = uv(o, Xb.bind(null, e));
    }
    e.callbackPriority = r, e.callbackNode = l;
  }
  function Xb(e, t) {
    if (LD(), Pu = ut, nf = Y, ($e & (un | sa)) !== kt)
      throw new Error("Should not already be working.");
    var n = e.callbackNode, a = Dr();
    if (a && e.callbackNode !== n)
      return null;
    var r = Rs(e, e === jn ? Ut : Y);
    if (r === Y)
      return null;
    var i = !Cs(e, r) && !pS(e, r) && !t, l = i ? Rj(e, r) : lf(e, r);
    if (l !== Sr) {
      if (l === Yi) {
        var o = bd(e);
        o !== Y && (r = o, l = tv(e, o));
      }
      if (l === Mu) {
        var u = ku;
        throw qi(e, Y), ai(e, r), Hn(e, It()), u;
      }
      if (l === Gm)
        ai(e, r);
      else {
        var p = !Cs(e, r), v = e.current.alternate;
        if (p && !hj(v)) {
          if (l = lf(e, r), l === Yi) {
            var x = bd(e);
            x !== Y && (r = x, l = tv(e, x));
          }
          if (l === Mu) {
            var E = ku;
            throw qi(e, Y), ai(e, r), Hn(e, It()), E;
          }
        }
        e.finishedWork = v, e.finishedLanes = r, vj(e, l, r);
      }
    }
    return Hn(e, It()), e.callbackNode === n ? Xb.bind(null, e) : null;
  }
  function tv(e, t) {
    var n = Fu;
    if (js(e)) {
      var a = qi(e, t);
      a.flags |= cr, A0(e.containerInfo);
    }
    var r = lf(e, t);
    if (r !== Yi) {
      var i = zn;
      zn = n, i !== null && Jb(i);
    }
    return r;
  }
  function Jb(e) {
    zn === null ? zn = e : zn.push.apply(zn, e);
  }
  function vj(e, t, n) {
    switch (t) {
      case Sr:
      case Mu:
        throw new Error("Root did not complete. This is a bug in React.");
      case Yi: {
        Gi(e, zn, Rr);
        break;
      }
      case Kc: {
        if (ai(e, n), wh(n) && // do not delay if we're inside an act() scope
        !pN()) {
          var a = Qm + Gb - It();
          if (a > 10) {
            var r = Rs(e, Y);
            if (r !== Y)
              break;
            var i = e.suspendedLanes;
            if (!bl(i, n)) {
              wn(), Vh(e, i);
              break;
            }
            e.timeoutHandle = Jd(Gi.bind(null, e, zn, Rr), a);
            break;
          }
        }
        Gi(e, zn, Rr);
        break;
      }
      case Au: {
        if (ai(e, n), dS(n))
          break;
        if (!pN()) {
          var l = lS(e, n), o = l, u = It() - o, p = Aj(u) - u;
          if (p > 10) {
            e.timeoutHandle = Jd(Gi.bind(null, e, zn, Rr), p);
            break;
          }
        }
        Gi(e, zn, Rr);
        break;
      }
      case qb: {
        Gi(e, zn, Rr);
        break;
      }
      default:
        throw new Error("Unknown root exit status.");
    }
  }
  function hj(e) {
    for (var t = e; ; ) {
      if (t.flags & $f) {
        var n = t.updateQueue;
        if (n !== null) {
          var a = n.stores;
          if (a !== null)
            for (var r = 0; r < a.length; r++) {
              var i = a[r], l = i.getSnapshot, o = i.value;
              try {
                if (!Wn(l(), o))
                  return !1;
              } catch {
                return !1;
              }
            }
        }
      }
      var u = t.child;
      if (t.subtreeFlags & $f && u !== null) {
        u.return = t, t = u;
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
  function ai(e, t) {
    t = Ds(t, Jc), t = Ds(t, Uu), hS(e, t);
  }
  function Zb(e) {
    if (VD(), ($e & (un | sa)) !== kt)
      throw new Error("Should not already be working.");
    Dr();
    var t = Rs(e, Y);
    if (!In(t, Te))
      return Hn(e, It()), null;
    var n = lf(e, t);
    if (e.tag !== Ir && n === Yi) {
      var a = bd(e);
      a !== Y && (t = a, n = tv(e, a));
    }
    if (n === Mu) {
      var r = ku;
      throw qi(e, Y), ai(e, t), Hn(e, It()), r;
    }
    if (n === Gm)
      throw new Error("Root did not complete. This is a bug in React.");
    var i = e.current.alternate;
    return e.finishedWork = i, e.finishedLanes = t, Gi(e, zn, Rr), Hn(e, It()), null;
  }
  function yj(e, t) {
    t !== Y && (Sd(e, Ae(t, Te)), Hn(e, It()), ($e & (un | sa)) === kt && (zu(), qr()));
  }
  function nv(e, t) {
    var n = $e;
    $e |= Ib;
    try {
      return e(t);
    } finally {
      $e = n, $e === kt && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
      !Va.isBatchingLegacy && (zu(), Ky());
    }
  }
  function gj(e, t, n, a, r) {
    var i = xa(), l = on.transition;
    try {
      return on.transition = null, Wt(qn), e(t, n, a, r);
    } finally {
      Wt(i), on.transition = l, $e === kt && zu();
    }
  }
  function Cr(e) {
    ti !== null && ti.tag === Ir && ($e & (un | sa)) === kt && Dr();
    var t = $e;
    $e |= Ib;
    var n = on.transition, a = xa();
    try {
      return on.transition = null, Wt(qn), e ? e() : void 0;
    } finally {
      Wt(a), on.transition = n, $e = t, ($e & (un | sa)) === kt && qr();
    }
  }
  function eN() {
    return ($e & (un | sa)) !== kt;
  }
  function rf(e, t) {
    vn(Wm, Ja, e), Ja = Ae(Ja, t);
  }
  function av(e) {
    Ja = Wm.current, mn(Wm, e);
  }
  function qi(e, t) {
    e.finishedWork = null, e.finishedLanes = Y;
    var n = e.timeoutHandle;
    if (n !== Zd && (e.timeoutHandle = Zd, IC(n)), gt !== null)
      for (var a = gt.return; a !== null; ) {
        var r = a.alternate;
        wb(r, a), a = a.return;
      }
    jn = e;
    var i = Wi(e.current, null);
    return gt = i, Ut = Ja = t, Ft = Sr, ku = null, Xc = Y, Uu = Y, Jc = Y, Fu = null, zn = null, pD(), Ca.discardPendingWarnings(), i;
  }
  function tN(e, t) {
    do {
      var n = gt;
      try {
        if (mc(), Cg(), Yt(), qm.current = null, n === null || n.return === null) {
          Ft = Mu, ku = t, gt = null;
          return;
        }
        if (bn && n.mode & tt && $c(n, !0), pa)
          if (vl(), t !== null && typeof t == "object" && typeof t.then == "function") {
            var a = t;
            Wx(n, a, Ut);
          } else
            Gx(n, t, Ut);
        PD(e, n.return, n, t, Ut), iN(n);
      } catch (r) {
        t = r, gt === n && n !== null ? (n = n.return, gt = n) : n = gt;
        continue;
      }
      return;
    } while (!0);
  }
  function nN() {
    var e = Im.current;
    return Im.current = Fc, e === null ? Fc : e;
  }
  function aN(e) {
    Im.current = e;
  }
  function bj() {
    Qm = It();
  }
  function $u(e) {
    Xc = Ae(e, Xc);
  }
  function Nj() {
    Ft === Sr && (Ft = Kc);
  }
  function rv() {
    (Ft === Sr || Ft === Kc || Ft === Yi) && (Ft = Au), jn !== null && (Nd(Xc) || Nd(Uu)) && ai(jn, Ut);
  }
  function Ej(e) {
    Ft !== Au && (Ft = Yi), Fu === null ? Fu = [e] : Fu.push(e);
  }
  function xj() {
    return Ft === Sr;
  }
  function lf(e, t) {
    var n = $e;
    $e |= un;
    var a = nN();
    if (jn !== e || Ut !== t) {
      if (Ea) {
        var r = e.memoizedUpdaters;
        r.size > 0 && (Yu(e, Ut), r.clear()), Ah(e, t);
      }
      Rr = kh(), qi(e, t);
    }
    Rh(t);
    do
      try {
        Sj();
        break;
      } catch (i) {
        tN(e, i);
      }
    while (!0);
    if (mc(), $e = n, aN(a), gt !== null)
      throw new Error("Cannot commit an incomplete root. This error is likely caused by a bug in React. Please file an issue.");
    return Ch(), jn = null, Ut = Y, Ft;
  }
  function Sj() {
    for (; gt !== null; )
      rN(gt);
  }
  function Rj(e, t) {
    var n = $e;
    $e |= un;
    var a = nN();
    if (jn !== e || Ut !== t) {
      if (Ea) {
        var r = e.memoizedUpdaters;
        r.size > 0 && (Yu(e, Ut), r.clear()), Ah(e, t);
      }
      Rr = kh(), zu(), qi(e, t);
    }
    Rh(t);
    do
      try {
        Cj();
        break;
      } catch (i) {
        tN(e, i);
      }
    while (!0);
    return mc(), aN(a), $e = n, gt !== null ? (Zx(), Sr) : (Ch(), jn = null, Ut = Y, Ft);
  }
  function Cj() {
    for (; gt !== null && !Tx(); )
      rN(gt);
  }
  function rN(e) {
    var t = e.alternate;
    pt(e);
    var n;
    (e.mode & tt) !== be ? (om(e), n = iv(t, e, Ja), $c(e, !0)) : n = iv(t, e, Ja), Yt(), e.memoizedProps = e.pendingProps, n === null ? iN(e) : gt = n, qm.current = null;
  }
  function iN(e) {
    var t = e;
    do {
      var n = t.alternate, a = t.return;
      if ((t.flags & bs) === Ee) {
        pt(t);
        var r = void 0;
        if ((t.mode & tt) === be ? r = jb(n, t, Ja) : (om(t), r = jb(n, t, Ja), $c(t, !1)), Yt(), r !== null) {
          gt = r;
          return;
        }
      } else {
        var i = NT(n, t);
        if (i !== null) {
          i.flags &= Ex, gt = i;
          return;
        }
        if ((t.mode & tt) !== be) {
          $c(t, !1);
          for (var l = t.actualDuration, o = t.child; o !== null; )
            l += o.actualDuration, o = o.sibling;
          t.actualDuration = l;
        }
        if (a !== null)
          a.flags |= bs, a.subtreeFlags = Ee, a.deletions = null;
        else {
          Ft = Gm, gt = null;
          return;
        }
      }
      var u = t.sibling;
      if (u !== null) {
        gt = u;
        return;
      }
      t = a, gt = t;
    } while (t !== null);
    Ft === Sr && (Ft = qb);
  }
  function Gi(e, t, n) {
    var a = xa(), r = on.transition;
    try {
      on.transition = null, Wt(qn), Dj(e, t, n, a);
    } finally {
      on.transition = r, Wt(a);
    }
    return null;
  }
  function Dj(e, t, n, a) {
    do
      Dr();
    while (ti !== null);
    if (Uj(), ($e & (un | sa)) !== kt)
      throw new Error("Should not already be working.");
    var r = e.finishedWork, i = e.finishedLanes;
    if (Hx(i), r === null)
      return Eh(), null;
    if (i === Y && f("root.finishedLanes should not be empty during a commit. This is a bug in React."), e.finishedWork = null, e.finishedLanes = Y, r === e.current)
      throw new Error("Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue.");
    e.callbackNode = null, e.callbackPriority = Gt;
    var l = Ae(r.lanes, r.childLanes);
    yS(e, l), e === jn && (jn = null, gt = null, Ut = Y), ((r.subtreeFlags & pl) !== Ee || (r.flags & pl) !== Ee) && (Ii || (Ii = !0, Jm = n, uv(Di, function() {
      return Dr(), null;
    })));
    var o = (r.subtreeFlags & (Wf | Qf | To | pl)) !== Ee, u = (r.flags & (Wf | Qf | To | pl)) !== Ee;
    if (o || u) {
      var p = on.transition;
      on.transition = null;
      var v = xa();
      Wt(qn);
      var x = $e;
      $e |= sa, qm.current = null, CT(e, r), Kg(), zT(e, r, i), FC(e.containerInfo), e.current = r, Qx(i), HT(r, e, i), Kx(), jx(), $e = x, Wt(v), on.transition = p;
    } else
      e.current = r, Kg();
    var E = Ii;
    if (Ii ? (Ii = !1, ti = e, Hu = i) : (Ql = 0, tf = null), l = e.pendingLanes, l === Y && (Wl = null), E || sN(e.current, !1), Ax(r.stateNode, a), Ea && e.memoizedUpdaters.clear(), ij(), Hn(e, It()), t !== null)
      for (var O = e.onRecoverableError, V = 0; V < t.length; V++) {
        var U = t[V], ae = U.stack, he = U.digest;
        O(U.value, {
          componentStack: ae,
          digest: he
        });
      }
    if (Zc) {
      Zc = !1;
      var pe = Km;
      throw Km = null, pe;
    }
    return In(Hu, Te) && e.tag !== Ir && Dr(), l = e.pendingLanes, In(l, Te) ? (OD(), e === Zm ? Bu++ : (Bu = 0, Zm = e)) : Bu = 0, qr(), Eh(), null;
  }
  function Dr() {
    if (ti !== null) {
      var e = Uh(Hu), t = ES(vr, e), n = on.transition, a = xa();
      try {
        return on.transition = null, Wt(t), jj();
      } finally {
        Wt(a), on.transition = n;
      }
    }
    return !1;
  }
  function Tj(e) {
    Xm.push(e), Ii || (Ii = !0, uv(Di, function() {
      return Dr(), null;
    }));
  }
  function jj() {
    if (ti === null)
      return !1;
    var e = Jm;
    Jm = null;
    var t = ti, n = Hu;
    if (ti = null, Hu = Y, ($e & (un | sa)) !== kt)
      throw new Error("Cannot flush passive effects while already rendering.");
    ev = !0, ef = !1, Xx(n);
    var a = $e;
    $e |= sa, GT(t.current), $T(t, t.current, n, e);
    {
      var r = Xm;
      Xm = [];
      for (var i = 0; i < r.length; i++) {
        var l = r[i];
        wT(t, l);
      }
    }
    Jx(), sN(t.current, !0), $e = a, qr(), ef ? t === tf ? Ql++ : (Ql = 0, tf = t) : Ql = 0, ev = !1, ef = !1, kx(t);
    {
      var o = t.current.stateNode;
      o.effectDuration = 0, o.passiveEffectDuration = 0;
    }
    return !0;
  }
  function lN(e) {
    return Wl !== null && Wl.has(e);
  }
  function wj(e) {
    Wl === null ? Wl = /* @__PURE__ */ new Set([e]) : Wl.add(e);
  }
  function _j(e) {
    Zc || (Zc = !0, Km = e);
  }
  var Oj = _j;
  function oN(e, t, n) {
    var a = Pi(n, t), r = rb(e, a, Te), i = Wr(e, r, Te), l = wn();
    i !== null && (Ao(i, Te, l), Hn(i, l));
  }
  function it(e, t, n) {
    if (xT(n), Iu(!1), e.tag === S) {
      oN(e, e, n);
      return;
    }
    var a = null;
    for (a = t; a !== null; ) {
      if (a.tag === S) {
        oN(a, e, n);
        return;
      } else if (a.tag === T) {
        var r = a.type, i = a.stateNode;
        if (typeof r.getDerivedStateFromError == "function" || typeof i.componentDidCatch == "function" && !lN(i)) {
          var l = Pi(n, e), o = Cm(a, l, Te), u = Wr(a, o, Te), p = wn();
          u !== null && (Ao(u, Te, p), Hn(u, p));
          return;
        }
      }
      a = a.return;
    }
    f(`Internal React error: Attempted to capture a commit phase error inside a detached tree. This indicates a bug in React. Likely causes include deleting the same fiber more than once, committing an already-finished tree, or an inconsistent return pointer.

Error message:

%s`, n);
  }
  function Lj(e, t, n) {
    var a = e.pingCache;
    a !== null && a.delete(t);
    var r = wn();
    Vh(e, n), Bj(e), jn === e && bl(Ut, n) && (Ft === Au || Ft === Kc && wh(Ut) && It() - Qm < Gb ? qi(e, Y) : Jc = Ae(Jc, n)), Hn(e, r);
  }
  function uN(e, t) {
    t === Gt && (t = dj(e));
    var n = wn(), a = Un(e, t);
    a !== null && (Ao(a, t, n), Hn(a, n));
  }
  function Vj(e) {
    var t = e.memoizedState, n = Gt;
    t !== null && (n = t.retryLane), uN(e, n);
  }
  function Mj(e, t) {
    var n = Gt, a;
    switch (e.tag) {
      case X:
        a = e.stateNode;
        var r = e.memoizedState;
        r !== null && (n = r.retryLane);
        break;
      case ye:
        a = e.stateNode;
        break;
      default:
        throw new Error("Pinged unknown suspense boundary type. This is probably a bug in React.");
    }
    a !== null && a.delete(t), uN(e, n);
  }
  function Aj(e) {
    return e < 120 ? 120 : e < 480 ? 480 : e < 1080 ? 1080 : e < 1920 ? 1920 : e < 3e3 ? 3e3 : e < 4320 ? 4320 : uj(e / 1960) * 1960;
  }
  function kj() {
    if (Bu > cj)
      throw Bu = 0, Zm = null, new Error("Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.");
    Ql > fj && (Ql = 0, tf = null, f("Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render."));
  }
  function Uj() {
    Ca.flushLegacyContextWarning(), Ca.flushPendingUnsafeLifecycleWarnings();
  }
  function sN(e, t) {
    pt(e), of(e, kr, nj), t && of(e, Gf, aj), of(e, kr, ej), t && of(e, Gf, tj), Yt();
  }
  function of(e, t, n) {
    for (var a = e, r = null; a !== null; ) {
      var i = a.subtreeFlags & t;
      a !== r && a.child !== null && i !== Ee ? a = a.child : ((a.flags & t) !== Ee && n(a), a.sibling !== null ? a = a.sibling : a = r = a.return);
    }
  }
  var uf = null;
  function cN(e) {
    {
      if (($e & un) !== kt || !(e.mode & Pe))
        return;
      var t = e.tag;
      if (t !== _ && t !== S && t !== T && t !== C && t !== G && t !== te && t !== $)
        return;
      var n = Le(e) || "ReactComponent";
      if (uf !== null) {
        if (uf.has(n))
          return;
        uf.add(n);
      } else
        uf = /* @__PURE__ */ new Set([n]);
      var a = Sn;
      try {
        pt(e), f("Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously later calls tries to update the component. Move this work to useEffect instead.");
      } finally {
        a ? pt(e) : Yt();
      }
    }
  }
  var iv;
  {
    var Fj = null;
    iv = function(e, t, n) {
      var a = gN(Fj, t);
      try {
        return Sb(e, t, n);
      } catch (i) {
        if (K0() || i !== null && typeof i == "object" && typeof i.then == "function")
          throw i;
        if (mc(), Cg(), wb(e, t), gN(t, a), t.mode & tt && om(t), Bf(null, Sb, null, e, t, n), gx()) {
          var r = Pf();
          typeof r == "object" && r !== null && r._suppressLogging && typeof i == "object" && i !== null && !i._suppressLogging && (i._suppressLogging = !0);
        }
        throw i;
      }
    };
  }
  var fN = !1, lv;
  lv = /* @__PURE__ */ new Set();
  function zj(e) {
    if (yi && !jD())
      switch (e.tag) {
        case C:
        case G:
        case $: {
          var t = gt && Le(gt) || "Unknown", n = t;
          if (!lv.has(n)) {
            lv.add(n);
            var a = Le(e) || "Unknown";
            f("Cannot update a component (`%s`) while rendering a different component (`%s`). To locate the bad setState() call inside `%s`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render", a, t, t);
          }
          break;
        }
        case T: {
          fN || (f("Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state."), fN = !0);
          break;
        }
      }
  }
  function Yu(e, t) {
    if (Ea) {
      var n = e.memoizedUpdaters;
      n.forEach(function(a) {
        Mh(e, a, t);
      });
    }
  }
  var ov = {};
  function uv(e, t) {
    {
      var n = Va.current;
      return n !== null ? (n.push(t), ov) : Nh(e, t);
    }
  }
  function dN(e) {
    if (e !== ov)
      return Dx(e);
  }
  function pN() {
    return Va.current !== null;
  }
  function Hj(e) {
    {
      if (e.mode & Pe) {
        if (!Yb())
          return;
      } else if (!oj() || $e !== kt || e.tag !== C && e.tag !== G && e.tag !== $)
        return;
      if (Va.current === null) {
        var t = Sn;
        try {
          pt(e), f(`An update to %s inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`, Le(e));
        } finally {
          t ? pt(e) : Yt();
        }
      }
    }
  }
  function Bj(e) {
    e.tag !== Ir && Yb() && Va.current === null && f(`A suspended resource finished loading inside a test, but the event was not wrapped in act(...).

When testing, code that resolves suspended data should be wrapped into act(...):

act(() => {
  /* finish loading suspended data */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`);
  }
  function Iu(e) {
    Kb = e;
  }
  var ca = null, Kl = null, Pj = function(e) {
    ca = e;
  };
  function Xl(e) {
    {
      if (ca === null)
        return e;
      var t = ca(e);
      return t === void 0 ? e : t.current;
    }
  }
  function sv(e) {
    return Xl(e);
  }
  function cv(e) {
    {
      if (ca === null)
        return e;
      var t = ca(e);
      if (t === void 0) {
        if (e != null && typeof e.render == "function") {
          var n = Xl(e.render);
          if (e.render !== n) {
            var a = {
              $$typeof: ve,
              render: n
            };
            return e.displayName !== void 0 && (a.displayName = e.displayName), a;
          }
        }
        return e;
      }
      return t.current;
    }
  }
  function mN(e, t) {
    {
      if (ca === null)
        return !1;
      var n = e.elementType, a = t.type, r = !1, i = typeof a == "object" && a !== null ? a.$$typeof : null;
      switch (e.tag) {
        case T: {
          typeof a == "function" && (r = !0);
          break;
        }
        case C: {
          (typeof a == "function" || i === ge) && (r = !0);
          break;
        }
        case G: {
          (i === ve || i === ge) && (r = !0);
          break;
        }
        case te:
        case $: {
          (i === Me || i === ge) && (r = !0);
          break;
        }
        default:
          return !1;
      }
      if (r) {
        var l = ca(n);
        if (l !== void 0 && l === ca(a))
          return !0;
      }
      return !1;
    }
  }
  function vN(e) {
    {
      if (ca === null || typeof WeakSet != "function")
        return;
      Kl === null && (Kl = /* @__PURE__ */ new WeakSet()), Kl.add(e);
    }
  }
  var $j = function(e, t) {
    {
      if (ca === null)
        return;
      var n = t.staleFamilies, a = t.updatedFamilies;
      Dr(), Cr(function() {
        fv(e.current, a, n);
      });
    }
  }, Yj = function(e, t) {
    {
      if (e.context !== Qn)
        return;
      Dr(), Cr(function() {
        qu(t, e, null, null);
      });
    }
  };
  function fv(e, t, n) {
    {
      var a = e.alternate, r = e.child, i = e.sibling, l = e.tag, o = e.type, u = null;
      switch (l) {
        case C:
        case $:
        case T:
          u = o;
          break;
        case G:
          u = o.render;
          break;
      }
      if (ca === null)
        throw new Error("Expected resolveFamily to be set during hot reload.");
      var p = !1, v = !1;
      if (u !== null) {
        var x = ca(u);
        x !== void 0 && (n.has(x) ? v = !0 : t.has(x) && (l === T ? v = !0 : p = !0));
      }
      if (Kl !== null && (Kl.has(e) || a !== null && Kl.has(a)) && (v = !0), v && (e._debugNeedsRemount = !0), v || p) {
        var E = Un(e, Te);
        E !== null && zt(E, e, Te, ut);
      }
      r !== null && !v && fv(r, t, n), i !== null && fv(i, t, n);
    }
  }
  var Ij = function(e, t) {
    {
      var n = /* @__PURE__ */ new Set(), a = new Set(t.map(function(r) {
        return r.current;
      }));
      return dv(e.current, a, n), n;
    }
  };
  function dv(e, t, n) {
    {
      var a = e.child, r = e.sibling, i = e.tag, l = e.type, o = null;
      switch (i) {
        case C:
        case $:
        case T:
          o = l;
          break;
        case G:
          o = l.render;
          break;
      }
      var u = !1;
      o !== null && t.has(o) && (u = !0), u ? qj(e, n) : a !== null && dv(a, t, n), r !== null && dv(r, t, n);
    }
  }
  function qj(e, t) {
    {
      var n = Gj(e, t);
      if (n)
        return;
      for (var a = e; ; ) {
        switch (a.tag) {
          case z:
            t.add(a.stateNode);
            return;
          case M:
            t.add(a.stateNode.containerInfo);
            return;
          case S:
            t.add(a.stateNode.containerInfo);
            return;
        }
        if (a.return === null)
          throw new Error("Expected to reach root first.");
        a = a.return;
      }
    }
  }
  function Gj(e, t) {
    for (var n = e, a = !1; ; ) {
      if (n.tag === z)
        a = !0, t.add(n.stateNode);
      else if (n.child !== null) {
        n.child.return = n, n = n.child;
        continue;
      }
      if (n === e)
        return a;
      for (; n.sibling === null; ) {
        if (n.return === null || n.return === e)
          return a;
        n = n.return;
      }
      n.sibling.return = n.return, n = n.sibling;
    }
    return !1;
  }
  var pv;
  {
    pv = !1;
    try {
      var hN = Object.preventExtensions({});
    } catch {
      pv = !0;
    }
  }
  function Wj(e, t, n, a) {
    this.tag = e, this.key = n, this.elementType = null, this.type = null, this.stateNode = null, this.return = null, this.child = null, this.sibling = null, this.index = 0, this.ref = null, this.pendingProps = t, this.memoizedProps = null, this.updateQueue = null, this.memoizedState = null, this.dependencies = null, this.mode = a, this.flags = Ee, this.subtreeFlags = Ee, this.deletions = null, this.lanes = Y, this.childLanes = Y, this.alternate = null, this.actualDuration = Number.NaN, this.actualStartTime = Number.NaN, this.selfBaseDuration = Number.NaN, this.treeBaseDuration = Number.NaN, this.actualDuration = 0, this.actualStartTime = -1, this.selfBaseDuration = 0, this.treeBaseDuration = 0, this._debugSource = null, this._debugOwner = null, this._debugNeedsRemount = !1, this._debugHookTypes = null, !pv && typeof Object.preventExtensions == "function" && Object.preventExtensions(this);
  }
  var Kn = function(e, t, n, a) {
    return new Wj(e, t, n, a);
  };
  function mv(e) {
    var t = e.prototype;
    return !!(t && t.isReactComponent);
  }
  function Qj(e) {
    return typeof e == "function" && !mv(e) && e.defaultProps === void 0;
  }
  function Kj(e) {
    if (typeof e == "function")
      return mv(e) ? T : C;
    if (e != null) {
      var t = e.$$typeof;
      if (t === ve)
        return G;
      if (t === Me)
        return te;
    }
    return _;
  }
  function Wi(e, t) {
    var n = e.alternate;
    n === null ? (n = Kn(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n._debugSource = e._debugSource, n._debugOwner = e._debugOwner, n._debugHookTypes = e._debugHookTypes, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = Ee, n.subtreeFlags = Ee, n.deletions = null, n.actualDuration = 0, n.actualStartTime = -1), n.flags = e.flags & dr, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue;
    var a = e.dependencies;
    switch (n.dependencies = a === null ? null : {
      lanes: a.lanes,
      firstContext: a.firstContext
    }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.selfBaseDuration = e.selfBaseDuration, n.treeBaseDuration = e.treeBaseDuration, n._debugNeedsRemount = e._debugNeedsRemount, n.tag) {
      case _:
      case C:
      case $:
        n.type = Xl(e.type);
        break;
      case T:
        n.type = sv(e.type);
        break;
      case G:
        n.type = cv(e.type);
        break;
    }
    return n;
  }
  function Xj(e, t) {
    e.flags &= dr | Dt;
    var n = e.alternate;
    if (n === null)
      e.childLanes = Y, e.lanes = t, e.child = null, e.subtreeFlags = Ee, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null, e.selfBaseDuration = 0, e.treeBaseDuration = 0;
    else {
      e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = Ee, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type;
      var a = n.dependencies;
      e.dependencies = a === null ? null : {
        lanes: a.lanes,
        firstContext: a.firstContext
      }, e.selfBaseDuration = n.selfBaseDuration, e.treeBaseDuration = n.treeBaseDuration;
    }
    return e;
  }
  function Jj(e, t, n) {
    var a;
    return e === rc ? (a = Pe, t === !0 && (a |= Et, a |= Pa)) : a = be, Ea && (a |= tt), Kn(S, null, null, a);
  }
  function vv(e, t, n, a, r, i) {
    var l = _, o = e;
    if (typeof e == "function")
      mv(e) ? (l = T, o = sv(o)) : o = Xl(o);
    else if (typeof e == "string")
      l = z;
    else
      e: switch (e) {
        case Fa:
          return ri(n.children, r, i, t);
        case fi:
          l = J, r |= Et, (r & Pe) !== be && (r |= Pa);
          break;
        case b:
          return Zj(n, r, i, t);
        case He:
          return e1(n, r, i, t);
        case De:
          return t1(n, r, i, t);
        case ft:
          return yN(n, r, i, t);
        case dn:
        case _t:
        case za:
        case ga:
        case ct:
        default: {
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case I:
                l = B;
                break e;
              case ne:
                l = ue;
                break e;
              case ve:
                l = G, o = cv(o);
                break e;
              case Me:
                l = te;
                break e;
              case ge:
                l = xe, o = null;
                break e;
            }
          var u = "";
          {
            (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (u += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
            var p = a ? Le(a) : null;
            p && (u += `

Check the render method of \`` + p + "`.");
          }
          throw new Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) " + ("but got: " + (e == null ? e : typeof e) + "." + u));
        }
      }
    var v = Kn(l, n, t, r);
    return v.elementType = e, v.type = o, v.lanes = i, v._debugOwner = a, v;
  }
  function hv(e, t, n) {
    var a = null;
    a = e._owner;
    var r = e.type, i = e.key, l = e.props, o = vv(r, i, l, a, t, n);
    return o._debugSource = e._source, o._debugOwner = e._owner, o;
  }
  function ri(e, t, n, a) {
    var r = Kn(fe, e, a, t);
    return r.lanes = n, r;
  }
  function Zj(e, t, n, a) {
    typeof e.id != "string" && f('Profiler must specify an "id" of type `string` as a prop. Received the type `%s` instead.', typeof e.id);
    var r = Kn(P, e, a, t | tt);
    return r.elementType = b, r.lanes = n, r.stateNode = {
      effectDuration: 0,
      passiveEffectDuration: 0
    }, r;
  }
  function e1(e, t, n, a) {
    var r = Kn(X, e, a, t);
    return r.elementType = He, r.lanes = n, r;
  }
  function t1(e, t, n, a) {
    var r = Kn(ye, e, a, t);
    return r.elementType = De, r.lanes = n, r;
  }
  function yN(e, t, n, a) {
    var r = Kn(de, e, a, t);
    r.elementType = ft, r.lanes = n;
    var i = {
      isHidden: !1
    };
    return r.stateNode = i, r;
  }
  function yv(e, t, n) {
    var a = Kn(W, e, null, t);
    return a.lanes = n, a;
  }
  function n1() {
    var e = Kn(z, null, null, be);
    return e.elementType = "DELETED", e;
  }
  function a1(e) {
    var t = Kn(Re, null, null, be);
    return t.stateNode = e, t;
  }
  function gv(e, t, n) {
    var a = e.children !== null ? e.children : [], r = Kn(M, a, e.key, t);
    return r.lanes = n, r.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      // Used by persistent updates
      implementation: e.implementation
    }, r;
  }
  function gN(e, t) {
    return e === null && (e = Kn(_, null, null, be)), e.tag = t.tag, e.key = t.key, e.elementType = t.elementType, e.type = t.type, e.stateNode = t.stateNode, e.return = t.return, e.child = t.child, e.sibling = t.sibling, e.index = t.index, e.ref = t.ref, e.pendingProps = t.pendingProps, e.memoizedProps = t.memoizedProps, e.updateQueue = t.updateQueue, e.memoizedState = t.memoizedState, e.dependencies = t.dependencies, e.mode = t.mode, e.flags = t.flags, e.subtreeFlags = t.subtreeFlags, e.deletions = t.deletions, e.lanes = t.lanes, e.childLanes = t.childLanes, e.alternate = t.alternate, e.actualDuration = t.actualDuration, e.actualStartTime = t.actualStartTime, e.selfBaseDuration = t.selfBaseDuration, e.treeBaseDuration = t.treeBaseDuration, e._debugSource = t._debugSource, e._debugOwner = t._debugOwner, e._debugNeedsRemount = t._debugNeedsRemount, e._debugHookTypes = t._debugHookTypes, e;
  }
  function r1(e, t, n, a, r) {
    this.tag = t, this.containerInfo = e, this.pendingChildren = null, this.current = null, this.pingCache = null, this.finishedWork = null, this.timeoutHandle = Zd, this.context = null, this.pendingContext = null, this.callbackNode = null, this.callbackPriority = Gt, this.eventTimes = xd(Y), this.expirationTimes = xd(ut), this.pendingLanes = Y, this.suspendedLanes = Y, this.pingedLanes = Y, this.expiredLanes = Y, this.mutableReadLanes = Y, this.finishedLanes = Y, this.entangledLanes = Y, this.entanglements = xd(Y), this.identifierPrefix = a, this.onRecoverableError = r, this.mutableSourceEagerHydrationData = null, this.effectDuration = 0, this.passiveEffectDuration = 0;
    {
      this.memoizedUpdaters = /* @__PURE__ */ new Set();
      for (var i = this.pendingUpdatersLaneMap = [], l = 0; l < Zf; l++)
        i.push(/* @__PURE__ */ new Set());
    }
    switch (t) {
      case rc:
        this._debugRootType = n ? "hydrateRoot()" : "createRoot()";
        break;
      case Ir:
        this._debugRootType = n ? "hydrate()" : "render()";
        break;
    }
  }
  function bN(e, t, n, a, r, i, l, o, u, p) {
    var v = new r1(e, t, n, o, u), x = Jj(t, i);
    v.current = x, x.stateNode = v;
    {
      var E = {
        element: a,
        isDehydrated: n,
        cache: null,
        // not enabled yet
        transitions: null,
        pendingSuspenseBoundaries: null
      };
      x.memoizedState = E;
    }
    return Op(x), v;
  }
  var bv = "18.3.1";
  function i1(e, t, n) {
    var a = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
    return ea(a), {
      // This tag allow us to uniquely identify this as a React Portal
      $$typeof: $n,
      key: a == null ? null : "" + a,
      children: e,
      containerInfo: t,
      implementation: n
    };
  }
  var Nv, Ev;
  Nv = !1, Ev = {};
  function NN(e) {
    if (!e)
      return Qn;
    var t = cl(e), n = B0(t);
    if (t.tag === T) {
      var a = t.type;
      if (Ia(a))
        return Gy(t, a, n);
    }
    return n;
  }
  function l1(e, t) {
    {
      var n = cl(e);
      if (n === void 0) {
        if (typeof e.render == "function")
          throw new Error("Unable to find node on an unmounted component.");
        var a = Object.keys(e).join(",");
        throw new Error("Argument appears to not be a ReactComponent. Keys: " + a);
      }
      var r = yh(n);
      if (r === null)
        return null;
      if (r.mode & Et) {
        var i = Le(n) || "Component";
        if (!Ev[i]) {
          Ev[i] = !0;
          var l = Sn;
          try {
            pt(r), n.mode & Et ? f("%s is deprecated in StrictMode. %s was passed an instance of %s which is inside StrictMode. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", t, t, i) : f("%s is deprecated in StrictMode. %s was passed an instance of %s which renders StrictMode children. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", t, t, i);
          } finally {
            l ? pt(l) : Yt();
          }
        }
      }
      return r.stateNode;
    }
  }
  function EN(e, t, n, a, r, i, l, o) {
    var u = !1, p = null;
    return bN(e, t, u, p, n, a, r, i, l);
  }
  function xN(e, t, n, a, r, i, l, o, u, p) {
    var v = !0, x = bN(n, a, v, e, r, i, l, o, u);
    x.context = NN(null);
    var E = x.current, O = wn(), V = ni(E), U = Er(O, V);
    return U.callback = t ?? null, Wr(E, U, V), pj(x, V, O), x;
  }
  function qu(e, t, n, a) {
    Mx(t, e);
    var r = t.current, i = wn(), l = ni(r);
    eS(l);
    var o = NN(n);
    t.context === null ? t.context = o : t.pendingContext = o, yi && Sn !== null && !Nv && (Nv = !0, f(`Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.

Check the render method of %s.`, Le(Sn) || "Unknown"));
    var u = Er(i, l);
    u.payload = {
      element: e
    }, a = a === void 0 ? null : a, a !== null && (typeof a != "function" && f("render(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", a), u.callback = a);
    var p = Wr(r, u, l);
    return p !== null && (zt(p, r, l, i), bc(p, r, l)), l;
  }
  function sf(e) {
    var t = e.current;
    if (!t.child)
      return null;
    switch (t.child.tag) {
      case z:
        return t.child.stateNode;
      default:
        return t.child.stateNode;
    }
  }
  function o1(e) {
    switch (e.tag) {
      case S: {
        var t = e.stateNode;
        if (js(t)) {
          var n = sS(t);
          yj(t, n);
        }
        break;
      }
      case X: {
        Cr(function() {
          var r = Un(e, Te);
          if (r !== null) {
            var i = wn();
            zt(r, e, Te, i);
          }
        });
        var a = Te;
        xv(e, a);
        break;
      }
    }
  }
  function SN(e, t) {
    var n = e.memoizedState;
    n !== null && n.dehydrated !== null && (n.retryLane = vS(n.retryLane, t));
  }
  function xv(e, t) {
    SN(e, t);
    var n = e.alternate;
    n && SN(n, t);
  }
  function u1(e) {
    if (e.tag === X) {
      var t = Oo, n = Un(e, t);
      if (n !== null) {
        var a = wn();
        zt(n, e, t, a);
      }
      xv(e, t);
    }
  }
  function s1(e) {
    if (e.tag === X) {
      var t = ni(e), n = Un(e, t);
      if (n !== null) {
        var a = wn();
        zt(n, e, t, a);
      }
      xv(e, t);
    }
  }
  function RN(e) {
    var t = Cx(e);
    return t === null ? null : t.stateNode;
  }
  var CN = function(e) {
    return null;
  };
  function c1(e) {
    return CN(e);
  }
  var DN = function(e) {
    return !1;
  };
  function f1(e) {
    return DN(e);
  }
  var TN = null, jN = null, wN = null, _N = null, ON = null, LN = null, VN = null, MN = null, AN = null;
  {
    var kN = function(e, t, n) {
      var a = t[n], r = Fe(e) ? e.slice() : Ue({}, e);
      return n + 1 === t.length ? (Fe(r) ? r.splice(a, 1) : delete r[a], r) : (r[a] = kN(e[a], t, n + 1), r);
    }, UN = function(e, t) {
      return kN(e, t, 0);
    }, FN = function(e, t, n, a) {
      var r = t[a], i = Fe(e) ? e.slice() : Ue({}, e);
      if (a + 1 === t.length) {
        var l = n[a];
        i[l] = i[r], Fe(i) ? i.splice(r, 1) : delete i[r];
      } else
        i[r] = FN(
          // $FlowFixMe number or string is fine here
          e[r],
          t,
          n,
          a + 1
        );
      return i;
    }, zN = function(e, t, n) {
      if (t.length !== n.length) {
        R("copyWithRename() expects paths of the same length");
        return;
      } else
        for (var a = 0; a < n.length - 1; a++)
          if (t[a] !== n[a]) {
            R("copyWithRename() expects paths to be the same except for the deepest key");
            return;
          }
      return FN(e, t, n, 0);
    }, HN = function(e, t, n, a) {
      if (n >= t.length)
        return a;
      var r = t[n], i = Fe(e) ? e.slice() : Ue({}, e);
      return i[r] = HN(e[r], t, n + 1, a), i;
    }, BN = function(e, t, n) {
      return HN(e, t, 0, n);
    }, Sv = function(e, t) {
      for (var n = e.memoizedState; n !== null && t > 0; )
        n = n.next, t--;
      return n;
    };
    TN = function(e, t, n, a) {
      var r = Sv(e, t);
      if (r !== null) {
        var i = BN(r.memoizedState, n, a);
        r.memoizedState = i, r.baseState = i, e.memoizedProps = Ue({}, e.memoizedProps);
        var l = Un(e, Te);
        l !== null && zt(l, e, Te, ut);
      }
    }, jN = function(e, t, n) {
      var a = Sv(e, t);
      if (a !== null) {
        var r = UN(a.memoizedState, n);
        a.memoizedState = r, a.baseState = r, e.memoizedProps = Ue({}, e.memoizedProps);
        var i = Un(e, Te);
        i !== null && zt(i, e, Te, ut);
      }
    }, wN = function(e, t, n, a) {
      var r = Sv(e, t);
      if (r !== null) {
        var i = zN(r.memoizedState, n, a);
        r.memoizedState = i, r.baseState = i, e.memoizedProps = Ue({}, e.memoizedProps);
        var l = Un(e, Te);
        l !== null && zt(l, e, Te, ut);
      }
    }, _N = function(e, t, n) {
      e.pendingProps = BN(e.memoizedProps, t, n), e.alternate && (e.alternate.pendingProps = e.pendingProps);
      var a = Un(e, Te);
      a !== null && zt(a, e, Te, ut);
    }, ON = function(e, t) {
      e.pendingProps = UN(e.memoizedProps, t), e.alternate && (e.alternate.pendingProps = e.pendingProps);
      var n = Un(e, Te);
      n !== null && zt(n, e, Te, ut);
    }, LN = function(e, t, n) {
      e.pendingProps = zN(e.memoizedProps, t, n), e.alternate && (e.alternate.pendingProps = e.pendingProps);
      var a = Un(e, Te);
      a !== null && zt(a, e, Te, ut);
    }, VN = function(e) {
      var t = Un(e, Te);
      t !== null && zt(t, e, Te, ut);
    }, MN = function(e) {
      CN = e;
    }, AN = function(e) {
      DN = e;
    };
  }
  function d1(e) {
    var t = yh(e);
    return t === null ? null : t.stateNode;
  }
  function p1(e) {
    return null;
  }
  function m1() {
    return Sn;
  }
  function v1(e) {
    var t = e.findFiberByHostInstance, n = h.ReactCurrentDispatcher;
    return Vx({
      bundleType: e.bundleType,
      version: e.version,
      rendererPackageName: e.rendererPackageName,
      rendererConfig: e.rendererConfig,
      overrideHookState: TN,
      overrideHookStateDeletePath: jN,
      overrideHookStateRenamePath: wN,
      overrideProps: _N,
      overridePropsDeletePath: ON,
      overridePropsRenamePath: LN,
      setErrorHandler: MN,
      setSuspenseHandler: AN,
      scheduleUpdate: VN,
      currentDispatcherRef: n,
      findHostInstanceByFiber: d1,
      findFiberByHostInstance: t || p1,
      // React Refresh
      findHostInstancesForRefresh: Ij,
      scheduleRefresh: $j,
      scheduleRoot: Yj,
      setRefreshHandler: Pj,
      // Enables DevTools to append owner stacks to error messages in DEV mode.
      getCurrentFiber: m1,
      // Enables DevTools to detect reconciler version rather than renderer version
      // which may not match for third party renderers.
      reconcilerVersion: bv
    });
  }
  var PN = typeof reportError == "function" ? (
    // In modern browsers, reportError will dispatch an error event,
    // emulating an uncaught JavaScript error.
    reportError
  ) : function(e) {
    console.error(e);
  };
  function Rv(e) {
    this._internalRoot = e;
  }
  cf.prototype.render = Rv.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null)
      throw new Error("Cannot update an unmounted root.");
    {
      typeof arguments[1] == "function" ? f("render(...): does not support the second callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().") : ff(arguments[1]) ? f("You passed a container to the second argument of root.render(...). You don't need to pass it again since you already passed it to create the root.") : typeof arguments[1] < "u" && f("You passed a second argument to root.render(...) but it only accepts one argument.");
      var n = t.containerInfo;
      if (n.nodeType !== Ct) {
        var a = RN(t.current);
        a && a.parentNode !== n && f("render(...): It looks like the React-rendered content of the root container was removed without using React. This is not supported and will cause errors. Instead, call root.unmount() to empty a root's container.");
      }
    }
    qu(e, t, null, null);
  }, cf.prototype.unmount = Rv.prototype.unmount = function() {
    typeof arguments[0] == "function" && f("unmount(...): does not support a callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().");
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      eN() && f("Attempted to synchronously unmount a root while React was already rendering. React cannot finish unmounting the root until the current render has completed, which may lead to a race condition."), Cr(function() {
        qu(null, e, null, null);
      }), Py(t);
    }
  };
  function h1(e, t) {
    if (!ff(e))
      throw new Error("createRoot(...): Target container is not a DOM element.");
    $N(e);
    var n = !1, a = !1, r = "", i = PN;
    t != null && (t.hydrate ? R("hydrate through createRoot is deprecated. Use ReactDOMClient.hydrateRoot(container, <App />) instead.") : typeof t == "object" && t !== null && t.$$typeof === na && f(`You passed a JSX element to createRoot. You probably meant to call root.render instead. Example usage:

  let root = createRoot(domContainer);
  root.render(<App />);`), t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (i = t.onRecoverableError), t.transitionCallbacks !== void 0 && t.transitionCallbacks);
    var l = EN(e, rc, null, n, a, r, i);
    Xs(l.current, e);
    var o = e.nodeType === Ct ? e.parentNode : e;
    return Jo(o), new Rv(l);
  }
  function cf(e) {
    this._internalRoot = e;
  }
  function y1(e) {
    e && LS(e);
  }
  cf.prototype.unstable_scheduleHydration = y1;
  function g1(e, t, n) {
    if (!ff(e))
      throw new Error("hydrateRoot(...): Target container is not a DOM element.");
    $N(e), t === void 0 && f("Must provide initial children as second argument to hydrateRoot. Example usage: hydrateRoot(domContainer, <App />)");
    var a = n ?? null, r = n != null && n.hydratedSources || null, i = !1, l = !1, o = "", u = PN;
    n != null && (n.unstable_strictMode === !0 && (i = !0), n.identifierPrefix !== void 0 && (o = n.identifierPrefix), n.onRecoverableError !== void 0 && (u = n.onRecoverableError));
    var p = xN(t, null, e, rc, a, i, l, o, u);
    if (Xs(p.current, e), Jo(e), r)
      for (var v = 0; v < r.length; v++) {
        var x = r[v];
        xD(p, x);
      }
    return new cf(p);
  }
  function ff(e) {
    return !!(e && (e.nodeType === An || e.nodeType === sr || e.nodeType === _f));
  }
  function Gu(e) {
    return !!(e && (e.nodeType === An || e.nodeType === sr || e.nodeType === _f || e.nodeType === Ct && e.nodeValue === " react-mount-point-unstable "));
  }
  function $N(e) {
    e.nodeType === An && e.tagName && e.tagName.toUpperCase() === "BODY" && f("createRoot(): Creating roots directly with document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try using a container element created for your app."), su(e) && (e._reactRootContainer ? f("You are calling ReactDOMClient.createRoot() on a container that was previously passed to ReactDOM.render(). This is not supported.") : f("You are calling ReactDOMClient.createRoot() on a container that has already been passed to createRoot() before. Instead, call root.render() on the existing root instead if you want to update it."));
  }
  var b1 = h.ReactCurrentOwner, YN;
  YN = function(e) {
    if (e._reactRootContainer && e.nodeType !== Ct) {
      var t = RN(e._reactRootContainer.current);
      t && t.parentNode !== e && f("render(...): It looks like the React-rendered content of this container was removed without using React. This is not supported and will cause errors. Instead, call ReactDOM.unmountComponentAtNode to empty a container.");
    }
    var n = !!e._reactRootContainer, a = Cv(e), r = !!(a && $r(a));
    r && !n && f("render(...): Replacing React-rendered children with a new root component. If you intended to update the children of this node, you should instead have the existing children update their state and render the new components instead of calling ReactDOM.render."), e.nodeType === An && e.tagName && e.tagName.toUpperCase() === "BODY" && f("render(): Rendering components directly into document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try rendering into a container element created for your app.");
  };
  function Cv(e) {
    return e ? e.nodeType === sr ? e.documentElement : e.firstChild : null;
  }
  function IN() {
  }
  function N1(e, t, n, a, r) {
    if (r) {
      if (typeof a == "function") {
        var i = a;
        a = function() {
          var E = sf(l);
          i.call(E);
        };
      }
      var l = xN(
        t,
        a,
        e,
        Ir,
        null,
        // hydrationCallbacks
        !1,
        // isStrictMode
        !1,
        // concurrentUpdatesByDefaultOverride,
        "",
        // identifierPrefix
        IN
      );
      e._reactRootContainer = l, Xs(l.current, e);
      var o = e.nodeType === Ct ? e.parentNode : e;
      return Jo(o), Cr(), l;
    } else {
      for (var u; u = e.lastChild; )
        e.removeChild(u);
      if (typeof a == "function") {
        var p = a;
        a = function() {
          var E = sf(v);
          p.call(E);
        };
      }
      var v = EN(
        e,
        Ir,
        null,
        // hydrationCallbacks
        !1,
        // isStrictMode
        !1,
        // concurrentUpdatesByDefaultOverride,
        "",
        // identifierPrefix
        IN
      );
      e._reactRootContainer = v, Xs(v.current, e);
      var x = e.nodeType === Ct ? e.parentNode : e;
      return Jo(x), Cr(function() {
        qu(t, v, n, a);
      }), v;
    }
  }
  function E1(e, t) {
    e !== null && typeof e != "function" && f("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t, e);
  }
  function df(e, t, n, a, r) {
    YN(n), E1(r === void 0 ? null : r, "render");
    var i = n._reactRootContainer, l;
    if (!i)
      l = N1(n, t, e, r, a);
    else {
      if (l = i, typeof r == "function") {
        var o = r;
        r = function() {
          var u = sf(l);
          o.call(u);
        };
      }
      qu(t, l, e, r);
    }
    return sf(l);
  }
  var qN = !1;
  function x1(e) {
    {
      qN || (qN = !0, f("findDOMNode is deprecated and will be removed in the next major release. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node"));
      var t = b1.current;
      if (t !== null && t.stateNode !== null) {
        var n = t.stateNode._warnedAboutRefsInRender;
        n || f("%s is accessing findDOMNode inside its render(). render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", Qe(t.type) || "A component"), t.stateNode._warnedAboutRefsInRender = !0;
      }
    }
    return e == null ? null : e.nodeType === An ? e : l1(e, "findDOMNode");
  }
  function S1(e, t, n) {
    if (f("ReactDOM.hydrate is no longer supported in React 18. Use hydrateRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !Gu(t))
      throw new Error("Target container is not a DOM element.");
    {
      var a = su(t) && t._reactRootContainer === void 0;
      a && f("You are calling ReactDOM.hydrate() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call hydrateRoot(container, element)?");
    }
    return df(null, e, t, !0, n);
  }
  function R1(e, t, n) {
    if (f("ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !Gu(t))
      throw new Error("Target container is not a DOM element.");
    {
      var a = su(t) && t._reactRootContainer === void 0;
      a && f("You are calling ReactDOM.render() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.render(element)?");
    }
    return df(null, e, t, !1, n);
  }
  function C1(e, t, n, a) {
    if (f("ReactDOM.unstable_renderSubtreeIntoContainer() is no longer supported in React 18. Consider using a portal instead. Until you switch to the createRoot API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !Gu(n))
      throw new Error("Target container is not a DOM element.");
    if (e == null || !bx(e))
      throw new Error("parentComponent must be a valid React Component");
    return df(e, t, n, !1, a);
  }
  var GN = !1;
  function D1(e) {
    if (GN || (GN = !0, f("unmountComponentAtNode is deprecated and will be removed in the next major release. Switch to the createRoot API. Learn more: https://reactjs.org/link/switch-to-createroot")), !Gu(e))
      throw new Error("unmountComponentAtNode(...): Target container is not a DOM element.");
    {
      var t = su(e) && e._reactRootContainer === void 0;
      t && f("You are calling ReactDOM.unmountComponentAtNode() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.unmount()?");
    }
    if (e._reactRootContainer) {
      {
        var n = Cv(e), a = n && !$r(n);
        a && f("unmountComponentAtNode(): The node you're attempting to unmount was rendered by another copy of React.");
      }
      return Cr(function() {
        df(null, null, e, !1, function() {
          e._reactRootContainer = null, Py(e);
        });
      }), !0;
    } else {
      {
        var r = Cv(e), i = !!(r && $r(r)), l = e.nodeType === An && Gu(e.parentNode) && !!e.parentNode._reactRootContainer;
        i && f("unmountComponentAtNode(): The node you're attempting to unmount was rendered by React and is not a top-level container. %s", l ? "You may have accidentally passed in a React root node instead of its container." : "Instead, have the parent component update its state and rerender in order to remove this component.");
      }
      return !1;
    }
  }
  xS(o1), RS(u1), CS(s1), DS(xa), TS(bS), (typeof Map != "function" || // $FlowIssue Flow incorrectly thinks Map has no prototype
  Map.prototype == null || typeof Map.prototype.forEach != "function" || typeof Set != "function" || // $FlowIssue Flow incorrectly thinks Set has no prototype
  Set.prototype == null || typeof Set.prototype.clear != "function" || typeof Set.prototype.forEach != "function") && f("React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"), ux(jC), fx(nv, gj, Cr);
  function T1(e, t) {
    var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
    if (!ff(t))
      throw new Error("Target container is not a DOM element.");
    return i1(e, t, null, n);
  }
  function j1(e, t, n, a) {
    return C1(e, t, n, a);
  }
  var Dv = {
    usingClientEntryPoint: !1,
    // Keep in sync with ReactTestUtils.js.
    // This is an array for better minification.
    Events: [$r, jl, Js, rh, ih, nv]
  };
  function w1(e, t) {
    return Dv.usingClientEntryPoint || f('You are importing createRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), h1(e, t);
  }
  function _1(e, t, n) {
    return Dv.usingClientEntryPoint || f('You are importing hydrateRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), g1(e, t, n);
  }
  function O1(e) {
    return eN() && f("flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task."), Cr(e);
  }
  var L1 = v1({
    findFiberByHostInstance: Vi,
    bundleType: 1,
    version: bv,
    rendererPackageName: "react-dom"
  });
  if (!L1 && Jt && window.top === window.self && (navigator.userAgent.indexOf("Chrome") > -1 && navigator.userAgent.indexOf("Edge") === -1 || navigator.userAgent.indexOf("Firefox") > -1)) {
    var WN = window.location.protocol;
    /^(https?|file):$/.test(WN) && console.info("%cDownload the React DevTools for a better development experience: https://reactjs.org/link/react-devtools" + (WN === "file:" ? `
You might need to use a local HTTP server (instead of file://): https://reactjs.org/link/react-devtools-faq` : ""), "font-weight:bold");
  }
  Jn.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Dv, Jn.createPortal = T1, Jn.createRoot = w1, Jn.findDOMNode = x1, Jn.flushSync = O1, Jn.hydrate = S1, Jn.hydrateRoot = _1, Jn.render = R1, Jn.unmountComponentAtNode = D1, Jn.unstable_batchedUpdates = nv, Jn.unstable_renderSubtreeIntoContainer = j1, Jn.version = bv, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
})();
sE.exports = Jn;
var B1 = sE.exports, dE, QN = B1;
{
  var KN = QN.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  dE = function(c, m) {
    KN.usingClientEntryPoint = !0;
    try {
      return QN.createRoot(c, m);
    } finally {
      KN.usingClientEntryPoint = !1;
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
function Qu() {
  return Qu = Object.assign ? Object.assign.bind() : function(c) {
    for (var m = 1; m < arguments.length; m++) {
      var h = arguments[m];
      for (var g in h)
        Object.prototype.hasOwnProperty.call(h, g) && (c[g] = h[g]);
    }
    return c;
  }, Qu.apply(this, arguments);
}
var li;
(function(c) {
  c.Pop = "POP", c.Push = "PUSH", c.Replace = "REPLACE";
})(li || (li = {}));
const XN = "popstate";
function P1(c) {
  c === void 0 && (c = {});
  function m(g, N) {
    let {
      pathname: R,
      search: f,
      hash: A
    } = g.location;
    return _v(
      "",
      {
        pathname: R,
        search: f,
        hash: A
      },
      // state defaults to `null` because `window.history.state` does
      N.state && N.state.usr || null,
      N.state && N.state.key || "default"
    );
  }
  function h(g, N) {
    return typeof N == "string" ? N : Ku(N);
  }
  return Y1(m, h, null, c);
}
function vt(c, m) {
  if (c === !1 || c === null || typeof c > "u")
    throw new Error(m);
}
function Ma(c, m) {
  if (!c) {
    typeof console < "u" && console.warn(m);
    try {
      throw new Error(m);
    } catch {
    }
  }
}
function $1() {
  return Math.random().toString(36).substr(2, 8);
}
function JN(c, m) {
  return {
    usr: c.state,
    key: c.key,
    idx: m
  };
}
function _v(c, m, h, g) {
  return h === void 0 && (h = null), Qu({
    pathname: typeof c == "string" ? c : c.pathname,
    search: "",
    hash: ""
  }, typeof m == "string" ? eo(m) : m, {
    state: h,
    // TODO: This could be cleaned up.  push/replace should probably just take
    // full Locations now and avoid the need to run through this flow at all
    // But that's a pretty big refactor to the current test suite so going to
    // keep as is for the time being and just let any incoming keys take precedence
    key: m && m.key || g || $1()
  });
}
function Ku(c) {
  let {
    pathname: m = "/",
    search: h = "",
    hash: g = ""
  } = c;
  return h && h !== "?" && (m += h.charAt(0) === "?" ? h : "?" + h), g && g !== "#" && (m += g.charAt(0) === "#" ? g : "#" + g), m;
}
function eo(c) {
  let m = {};
  if (c) {
    let h = c.indexOf("#");
    h >= 0 && (m.hash = c.substr(h), c = c.substr(0, h));
    let g = c.indexOf("?");
    g >= 0 && (m.search = c.substr(g), c = c.substr(0, g)), c && (m.pathname = c);
  }
  return m;
}
function Y1(c, m, h, g) {
  g === void 0 && (g = {});
  let {
    window: N = document.defaultView,
    v5Compat: R = !1
  } = g, f = N.history, A = li.Pop, C = null, T = _();
  T == null && (T = 0, f.replaceState(Qu({}, f.state, {
    idx: T
  }), ""));
  function _() {
    return (f.state || {
      idx: null
    }).idx;
  }
  function S() {
    A = li.Pop;
    let J = _(), ue = J == null ? null : J - T;
    T = J, C && C({
      action: A,
      location: fe.location,
      delta: ue
    });
  }
  function M(J, ue) {
    A = li.Push;
    let B = _v(fe.location, J, ue);
    T = _() + 1;
    let G = JN(B, T), P = fe.createHref(B);
    try {
      f.pushState(G, "", P);
    } catch (X) {
      if (X instanceof DOMException && X.name === "DataCloneError")
        throw X;
      N.location.assign(P);
    }
    R && C && C({
      action: A,
      location: fe.location,
      delta: 1
    });
  }
  function z(J, ue) {
    A = li.Replace;
    let B = _v(fe.location, J, ue);
    T = _();
    let G = JN(B, T), P = fe.createHref(B);
    f.replaceState(G, "", P), R && C && C({
      action: A,
      location: fe.location,
      delta: 0
    });
  }
  function W(J) {
    let ue = N.location.origin !== "null" ? N.location.origin : N.location.href, B = typeof J == "string" ? J : Ku(J);
    return B = B.replace(/ $/, "%20"), vt(ue, "No window.location.(origin|href) available to create URL for href: " + B), new URL(B, ue);
  }
  let fe = {
    get action() {
      return A;
    },
    get location() {
      return c(N, f);
    },
    listen(J) {
      if (C)
        throw new Error("A history only accepts one active listener");
      return N.addEventListener(XN, S), C = J, () => {
        N.removeEventListener(XN, S), C = null;
      };
    },
    createHref(J) {
      return m(N, J);
    },
    createURL: W,
    encodeLocation(J) {
      let ue = W(J);
      return {
        pathname: ue.pathname,
        search: ue.search,
        hash: ue.hash
      };
    },
    push: M,
    replace: z,
    go(J) {
      return f.go(J);
    }
  };
  return fe;
}
var ZN;
(function(c) {
  c.data = "data", c.deferred = "deferred", c.redirect = "redirect", c.error = "error";
})(ZN || (ZN = {}));
function I1(c, m, h) {
  return h === void 0 && (h = "/"), q1(c, m, h);
}
function q1(c, m, h, g) {
  let N = typeof m == "string" ? eo(m) : m, R = ui(N.pathname || "/", h);
  if (R == null)
    return null;
  let f = pE(c);
  G1(f);
  let A = null;
  for (let C = 0; A == null && C < f.length; ++C) {
    let T = rw(R);
    A = nw(f[C], T);
  }
  return A;
}
function pE(c, m, h, g) {
  m === void 0 && (m = []), h === void 0 && (h = []), g === void 0 && (g = "");
  let N = (R, f, A) => {
    let C = {
      relativePath: A === void 0 ? R.path || "" : A,
      caseSensitive: R.caseSensitive === !0,
      childrenIndex: f,
      route: R
    };
    C.relativePath.startsWith("/") && (vt(C.relativePath.startsWith(g), 'Absolute route path "' + C.relativePath + '" nested under path ' + ('"' + g + '" is not valid. An absolute child route path ') + "must start with the combined path of all its parent routes."), C.relativePath = C.relativePath.slice(g.length));
    let T = wr([g, C.relativePath]), _ = h.concat(C);
    R.children && R.children.length > 0 && (vt(
      // Our types know better, but runtime JS may not!
      // @ts-expect-error
      R.index !== !0,
      "Index routes must not have child routes. Please remove " + ('all child routes from route path "' + T + '".')
    ), pE(R.children, m, _, T)), !(R.path == null && !R.index) && m.push({
      path: T,
      score: ew(T, R.index),
      routesMeta: _
    });
  };
  return c.forEach((R, f) => {
    var A;
    if (R.path === "" || !((A = R.path) != null && A.includes("?")))
      N(R, f);
    else
      for (let C of mE(R.path))
        N(R, f, C);
  }), m;
}
function mE(c) {
  let m = c.split("/");
  if (m.length === 0) return [];
  let [h, ...g] = m, N = h.endsWith("?"), R = h.replace(/\?$/, "");
  if (g.length === 0)
    return N ? [R, ""] : [R];
  let f = mE(g.join("/")), A = [];
  return A.push(...f.map((C) => C === "" ? R : [R, C].join("/"))), N && A.push(...f), A.map((C) => c.startsWith("/") && C === "" ? "/" : C);
}
function G1(c) {
  c.sort((m, h) => m.score !== h.score ? h.score - m.score : tw(m.routesMeta.map((g) => g.childrenIndex), h.routesMeta.map((g) => g.childrenIndex)));
}
const W1 = /^:[\w-]+$/, Q1 = 3, K1 = 2, X1 = 1, J1 = 10, Z1 = -2, eE = (c) => c === "*";
function ew(c, m) {
  let h = c.split("/"), g = h.length;
  return h.some(eE) && (g += Z1), m && (g += K1), h.filter((N) => !eE(N)).reduce((N, R) => N + (W1.test(R) ? Q1 : R === "" ? X1 : J1), g);
}
function tw(c, m) {
  return c.length === m.length && c.slice(0, -1).every((g, N) => g === m[N]) ? (
    // If two routes are siblings, we should try to match the earlier sibling
    // first. This allows people to have fine-grained control over the matching
    // behavior by simply putting routes with identical paths in the order they
    // want them tried.
    c[c.length - 1] - m[m.length - 1]
  ) : (
    // Otherwise, it doesn't really make sense to rank non-siblings by index,
    // so they sort equally.
    0
  );
}
function nw(c, m, h) {
  let {
    routesMeta: g
  } = c, N = {}, R = "/", f = [];
  for (let A = 0; A < g.length; ++A) {
    let C = g[A], T = A === g.length - 1, _ = R === "/" ? m : m.slice(R.length) || "/", S = Ov({
      path: C.relativePath,
      caseSensitive: C.caseSensitive,
      end: T
    }, _), M = C.route;
    if (!S)
      return null;
    Object.assign(N, S.params), f.push({
      // TODO: Can this as be avoided?
      params: N,
      pathname: wr([R, S.pathname]),
      pathnameBase: uw(wr([R, S.pathnameBase])),
      route: M
    }), S.pathnameBase !== "/" && (R = wr([R, S.pathnameBase]));
  }
  return f;
}
function Ov(c, m) {
  typeof c == "string" && (c = {
    path: c,
    caseSensitive: !1,
    end: !0
  });
  let [h, g] = aw(c.path, c.caseSensitive, c.end), N = m.match(h);
  if (!N) return null;
  let R = N[0], f = R.replace(/(.)\/+$/, "$1"), A = N.slice(1);
  return {
    params: g.reduce((T, _, S) => {
      let {
        paramName: M,
        isOptional: z
      } = _;
      if (M === "*") {
        let fe = A[S] || "";
        f = R.slice(0, R.length - fe.length).replace(/(.)\/+$/, "$1");
      }
      const W = A[S];
      return z && !W ? T[M] = void 0 : T[M] = (W || "").replace(/%2F/g, "/"), T;
    }, {}),
    pathname: R,
    pathnameBase: f,
    pattern: c
  };
}
function aw(c, m, h) {
  m === void 0 && (m = !1), h === void 0 && (h = !0), Ma(c === "*" || !c.endsWith("*") || c.endsWith("/*"), 'Route path "' + c + '" will be treated as if it were ' + ('"' + c.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + c.replace(/\*$/, "/*") + '".'));
  let g = [], N = "^" + c.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(/\/:([\w-]+)(\?)?/g, (f, A, C) => (g.push({
    paramName: A,
    isOptional: C != null
  }), C ? "/?([^\\/]+)?" : "/([^\\/]+)"));
  return c.endsWith("*") ? (g.push({
    paramName: "*"
  }), N += c === "*" || c === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : h ? N += "\\/*$" : c !== "" && c !== "/" && (N += "(?:(?=\\/|$))"), [new RegExp(N, m ? void 0 : "i"), g];
}
function rw(c) {
  try {
    return c.split("/").map((m) => decodeURIComponent(m).replace(/\//g, "%2F")).join("/");
  } catch (m) {
    return Ma(!1, 'The URL path "' + c + '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' + ("encoding (" + m + ").")), c;
  }
}
function ui(c, m) {
  if (m === "/") return c;
  if (!c.toLowerCase().startsWith(m.toLowerCase()))
    return null;
  let h = m.endsWith("/") ? m.length - 1 : m.length, g = c.charAt(h);
  return g && g !== "/" ? null : c.slice(h) || "/";
}
function iw(c, m) {
  m === void 0 && (m = "/");
  let {
    pathname: h,
    search: g = "",
    hash: N = ""
  } = typeof c == "string" ? eo(c) : c;
  return {
    pathname: h ? h.startsWith("/") ? h : lw(h, m) : m,
    search: sw(g),
    hash: cw(N)
  };
}
function lw(c, m) {
  let h = m.replace(/\/+$/, "").split("/");
  return c.split("/").forEach((N) => {
    N === ".." ? h.length > 1 && h.pop() : N !== "." && h.push(N);
  }), h.length > 1 ? h.join("/") : "/";
}
function Tv(c, m, h, g) {
  return "Cannot include a '" + c + "' character in a manually specified " + ("`to." + m + "` field [" + JSON.stringify(g) + "].  Please separate it out to the ") + ("`to." + h + "` field. Alternatively you may provide the full path as ") + 'a string in <Link to="..."> and the router will parse it for you.';
}
function ow(c) {
  return c.filter((m, h) => h === 0 || m.route.path && m.route.path.length > 0);
}
function Vv(c, m) {
  let h = ow(c);
  return m ? h.map((g, N) => N === h.length - 1 ? g.pathname : g.pathnameBase) : h.map((g) => g.pathnameBase);
}
function Mv(c, m, h, g) {
  g === void 0 && (g = !1);
  let N;
  typeof c == "string" ? N = eo(c) : (N = Qu({}, c), vt(!N.pathname || !N.pathname.includes("?"), Tv("?", "pathname", "search", N)), vt(!N.pathname || !N.pathname.includes("#"), Tv("#", "pathname", "hash", N)), vt(!N.search || !N.search.includes("#"), Tv("#", "search", "hash", N)));
  let R = c === "" || N.pathname === "", f = R ? "/" : N.pathname, A;
  if (f == null)
    A = h;
  else {
    let S = m.length - 1;
    if (!g && f.startsWith("..")) {
      let M = f.split("/");
      for (; M[0] === ".."; )
        M.shift(), S -= 1;
      N.pathname = M.join("/");
    }
    A = S >= 0 ? m[S] : "/";
  }
  let C = iw(N, A), T = f && f !== "/" && f.endsWith("/"), _ = (R || f === ".") && h.endsWith("/");
  return !C.pathname.endsWith("/") && (T || _) && (C.pathname += "/"), C;
}
const wr = (c) => c.join("/").replace(/\/\/+/g, "/"), uw = (c) => c.replace(/\/+$/, "").replace(/^\/*/, "/"), sw = (c) => !c || c === "?" ? "" : c.startsWith("?") ? c : "?" + c, cw = (c) => !c || c === "#" ? "" : c.startsWith("#") ? c : "#" + c;
function fw(c) {
  return c != null && typeof c.status == "number" && typeof c.statusText == "string" && typeof c.internal == "boolean" && "data" in c;
}
const vE = ["post", "put", "patch", "delete"];
new Set(vE);
const dw = ["get", ...vE];
new Set(dw);
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
function Xu() {
  return Xu = Object.assign ? Object.assign.bind() : function(c) {
    for (var m = 1; m < arguments.length; m++) {
      var h = arguments[m];
      for (var g in h)
        Object.prototype.hasOwnProperty.call(h, g) && (c[g] = h[g]);
    }
    return c;
  }, Xu.apply(this, arguments);
}
const Zu = /* @__PURE__ */ D.createContext(null);
Zu.displayName = "DataRouter";
const Av = /* @__PURE__ */ D.createContext(null);
Av.displayName = "DataRouterState";
const pw = /* @__PURE__ */ D.createContext(null);
pw.displayName = "Await";
const fa = /* @__PURE__ */ D.createContext(null);
fa.displayName = "Navigation";
const es = /* @__PURE__ */ D.createContext(null);
es.displayName = "Location";
const Aa = /* @__PURE__ */ D.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
Aa.displayName = "Route";
const kv = /* @__PURE__ */ D.createContext(null);
kv.displayName = "RouteError";
function mw(c, m) {
  let {
    relative: h
  } = m === void 0 ? {} : m;
  to() || vt(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  );
  let {
    basename: g,
    navigator: N
  } = D.useContext(fa), {
    hash: R,
    pathname: f,
    search: A
  } = ts(c, {
    relative: h
  }), C = f;
  return g !== "/" && (C = f === "/" ? g : wr([g, f])), N.createHref({
    pathname: C,
    search: A,
    hash: R
  });
}
function to() {
  return D.useContext(es) != null;
}
function Qi() {
  return to() || vt(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ), D.useContext(es).location;
}
const hE = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function yE(c) {
  D.useContext(fa).static || D.useLayoutEffect(c);
}
function Uv() {
  let {
    isDataRoute: c
  } = D.useContext(Aa);
  return c ? ww() : vw();
}
function vw() {
  to() || vt(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let c = D.useContext(Zu), {
    basename: m,
    future: h,
    navigator: g
  } = D.useContext(fa), {
    matches: N
  } = D.useContext(Aa), {
    pathname: R
  } = Qi(), f = JSON.stringify(Vv(N, h.v7_relativeSplatPath)), A = D.useRef(!1);
  return yE(() => {
    A.current = !0;
  }), D.useCallback(function(T, _) {
    if (_ === void 0 && (_ = {}), Ma(A.current, hE), !A.current) return;
    if (typeof T == "number") {
      g.go(T);
      return;
    }
    let S = Mv(T, JSON.parse(f), R, _.relative === "path");
    c == null && m !== "/" && (S.pathname = S.pathname === "/" ? m : wr([m, S.pathname])), (_.replace ? g.replace : g.push)(S, _.state, _);
  }, [m, g, f, R, c]);
}
function hw() {
  let {
    matches: c
  } = D.useContext(Aa), m = c[c.length - 1];
  return m ? m.params : {};
}
function ts(c, m) {
  let {
    relative: h
  } = m === void 0 ? {} : m, {
    future: g
  } = D.useContext(fa), {
    matches: N
  } = D.useContext(Aa), {
    pathname: R
  } = Qi(), f = JSON.stringify(Vv(N, g.v7_relativeSplatPath));
  return D.useMemo(() => Mv(c, JSON.parse(f), R, h === "path"), [c, f, R, h]);
}
function yw(c, m) {
  return gw(c, m);
}
function gw(c, m, h, g) {
  to() || vt(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let {
    navigator: N
  } = D.useContext(fa), {
    matches: R
  } = D.useContext(Aa), f = R[R.length - 1], A = f ? f.params : {}, C = f ? f.pathname : "/", T = f ? f.pathnameBase : "/", _ = f && f.route;
  {
    let B = _ && _.path || "";
    bE(C, !_ || B.endsWith("*"), "You rendered descendant <Routes> (or called `useRoutes()`) at " + ('"' + C + '" (under <Route path="' + B + '">) but the ') + `parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

` + ('Please change the parent <Route path="' + B + '"> to <Route ') + ('path="' + (B === "/" ? "*" : B + "/*") + '">.'));
  }
  let S = Qi(), M;
  if (m) {
    var z;
    let B = typeof m == "string" ? eo(m) : m;
    T === "/" || (z = B.pathname) != null && z.startsWith(T) || vt(!1, "When overriding the location using `<Routes location>` or `useRoutes(routes, location)`, the location pathname must begin with the portion of the URL pathname that was " + ('matched by all parent routes. The current pathname base is "' + T + '" ') + ('but pathname "' + B.pathname + '" was given in the `location` prop.')), M = B;
  } else
    M = S;
  let W = M.pathname || "/", fe = W;
  if (T !== "/") {
    let B = T.replace(/^\//, "").split("/");
    fe = "/" + W.replace(/^\//, "").split("/").slice(B.length).join("/");
  }
  let J = I1(c, {
    pathname: fe
  });
  Ma(_ || J != null, 'No routes matched location "' + M.pathname + M.search + M.hash + '" '), Ma(J == null || J[J.length - 1].route.element !== void 0 || J[J.length - 1].route.Component !== void 0 || J[J.length - 1].route.lazy !== void 0, 'Matched leaf route at location "' + M.pathname + M.search + M.hash + '" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.');
  let ue = Sw(J && J.map((B) => Object.assign({}, B, {
    params: Object.assign({}, A, B.params),
    pathname: wr([
      T,
      // Re-encode pathnames that were decoded inside matchRoutes
      N.encodeLocation ? N.encodeLocation(B.pathname).pathname : B.pathname
    ]),
    pathnameBase: B.pathnameBase === "/" ? T : wr([
      T,
      // Re-encode pathnames that were decoded inside matchRoutes
      N.encodeLocation ? N.encodeLocation(B.pathnameBase).pathname : B.pathnameBase
    ])
  })), R, h, g);
  return m && ue ? /* @__PURE__ */ D.createElement(es.Provider, {
    value: {
      location: Xu({
        pathname: "/",
        search: "",
        hash: "",
        state: null,
        key: "default"
      }, M),
      navigationType: li.Pop
    }
  }, ue) : ue;
}
function bw() {
  let c = jw(), m = fw(c) ? c.status + " " + c.statusText : c instanceof Error ? c.message : JSON.stringify(c), h = c instanceof Error ? c.stack : null, g = "rgba(200,200,200, 0.5)", N = {
    padding: "0.5rem",
    backgroundColor: g
  }, R = {
    padding: "2px 4px",
    backgroundColor: g
  }, f = null;
  return console.error("Error handled by React Router default ErrorBoundary:", c), f = /* @__PURE__ */ D.createElement(D.Fragment, null, /* @__PURE__ */ D.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ D.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ D.createElement("code", {
    style: R
  }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ D.createElement("code", {
    style: R
  }, "errorElement"), " prop on your route.")), /* @__PURE__ */ D.createElement(D.Fragment, null, /* @__PURE__ */ D.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ D.createElement("h3", {
    style: {
      fontStyle: "italic"
    }
  }, m), h ? /* @__PURE__ */ D.createElement("pre", {
    style: N
  }, h) : null, f);
}
const Nw = /* @__PURE__ */ D.createElement(bw, null);
class Ew extends D.Component {
  constructor(m) {
    super(m), this.state = {
      location: m.location,
      revalidation: m.revalidation,
      error: m.error
    };
  }
  static getDerivedStateFromError(m) {
    return {
      error: m
    };
  }
  static getDerivedStateFromProps(m, h) {
    return h.location !== m.location || h.revalidation !== "idle" && m.revalidation === "idle" ? {
      error: m.error,
      location: m.location,
      revalidation: m.revalidation
    } : {
      error: m.error !== void 0 ? m.error : h.error,
      location: h.location,
      revalidation: m.revalidation || h.revalidation
    };
  }
  componentDidCatch(m, h) {
    console.error("React Router caught the following error during render", m, h);
  }
  render() {
    return this.state.error !== void 0 ? /* @__PURE__ */ D.createElement(Aa.Provider, {
      value: this.props.routeContext
    }, /* @__PURE__ */ D.createElement(kv.Provider, {
      value: this.state.error,
      children: this.props.component
    })) : this.props.children;
  }
}
function xw(c) {
  let {
    routeContext: m,
    match: h,
    children: g
  } = c, N = D.useContext(Zu);
  return N && N.static && N.staticContext && (h.route.errorElement || h.route.ErrorBoundary) && (N.staticContext._deepestRenderedBoundaryId = h.route.id), /* @__PURE__ */ D.createElement(Aa.Provider, {
    value: m
  }, g);
}
function Sw(c, m, h, g) {
  var N;
  if (m === void 0 && (m = []), h === void 0 && (h = null), g === void 0 && (g = null), c == null) {
    var R;
    if (!h)
      return null;
    if (h.errors)
      c = h.matches;
    else if ((R = g) != null && R.v7_partialHydration && m.length === 0 && !h.initialized && h.matches.length > 0)
      c = h.matches;
    else
      return null;
  }
  let f = c, A = (N = h) == null ? void 0 : N.errors;
  if (A != null) {
    let _ = f.findIndex((S) => S.route.id && (A == null ? void 0 : A[S.route.id]) !== void 0);
    _ >= 0 || vt(!1, "Could not find a matching route for errors on route IDs: " + Object.keys(A).join(",")), f = f.slice(0, Math.min(f.length, _ + 1));
  }
  let C = !1, T = -1;
  if (h && g && g.v7_partialHydration)
    for (let _ = 0; _ < f.length; _++) {
      let S = f[_];
      if ((S.route.HydrateFallback || S.route.hydrateFallbackElement) && (T = _), S.route.id) {
        let {
          loaderData: M,
          errors: z
        } = h, W = S.route.loader && M[S.route.id] === void 0 && (!z || z[S.route.id] === void 0);
        if (S.route.lazy || W) {
          C = !0, T >= 0 ? f = f.slice(0, T + 1) : f = [f[0]];
          break;
        }
      }
    }
  return f.reduceRight((_, S, M) => {
    let z, W = !1, fe = null, J = null;
    h && (z = A && S.route.id ? A[S.route.id] : void 0, fe = S.route.errorElement || Nw, C && (T < 0 && M === 0 ? (bE("route-fallback", !1, "No `HydrateFallback` element provided to render during initial hydration"), W = !0, J = null) : T === M && (W = !0, J = S.route.hydrateFallbackElement || null)));
    let ue = m.concat(f.slice(0, M + 1)), B = () => {
      let G;
      return z ? G = fe : W ? G = J : S.route.Component ? G = /* @__PURE__ */ D.createElement(S.route.Component, null) : S.route.element ? G = S.route.element : G = _, /* @__PURE__ */ D.createElement(xw, {
        match: S,
        routeContext: {
          outlet: _,
          matches: ue,
          isDataRoute: h != null
        },
        children: G
      });
    };
    return h && (S.route.ErrorBoundary || S.route.errorElement || M === 0) ? /* @__PURE__ */ D.createElement(Ew, {
      location: h.location,
      revalidation: h.revalidation,
      component: fe,
      error: z,
      children: B(),
      routeContext: {
        outlet: null,
        matches: ue,
        isDataRoute: !0
      }
    }) : B();
  }, null);
}
var gE = /* @__PURE__ */ function(c) {
  return c.UseBlocker = "useBlocker", c.UseRevalidator = "useRevalidator", c.UseNavigateStable = "useNavigate", c;
}(gE || {}), Ju = /* @__PURE__ */ function(c) {
  return c.UseBlocker = "useBlocker", c.UseLoaderData = "useLoaderData", c.UseActionData = "useActionData", c.UseRouteError = "useRouteError", c.UseNavigation = "useNavigation", c.UseRouteLoaderData = "useRouteLoaderData", c.UseMatches = "useMatches", c.UseRevalidator = "useRevalidator", c.UseNavigateStable = "useNavigate", c.UseRouteId = "useRouteId", c;
}(Ju || {});
function Fv(c) {
  return c + " must be used within a data router.  See https://reactrouter.com/v6/routers/picking-a-router.";
}
function Rw(c) {
  let m = D.useContext(Zu);
  return m || vt(!1, Fv(c)), m;
}
function Cw(c) {
  let m = D.useContext(Av);
  return m || vt(!1, Fv(c)), m;
}
function Dw(c) {
  let m = D.useContext(Aa);
  return m || vt(!1, Fv(c)), m;
}
function zv(c) {
  let m = Dw(c), h = m.matches[m.matches.length - 1];
  return h.route.id || vt(!1, c + ' can only be used on routes that contain a unique "id"'), h.route.id;
}
function Tw() {
  return zv(Ju.UseRouteId);
}
function jw() {
  var c;
  let m = D.useContext(kv), h = Cw(Ju.UseRouteError), g = zv(Ju.UseRouteError);
  return m !== void 0 ? m : (c = h.errors) == null ? void 0 : c[g];
}
function ww() {
  let {
    router: c
  } = Rw(gE.UseNavigateStable), m = zv(Ju.UseNavigateStable), h = D.useRef(!1);
  return yE(() => {
    h.current = !0;
  }), D.useCallback(function(N, R) {
    R === void 0 && (R = {}), Ma(h.current, hE), h.current && (typeof N == "number" ? c.navigate(N) : c.navigate(N, Xu({
      fromRouteId: m
    }, R)));
  }, [c, m]);
}
const tE = {};
function bE(c, m, h) {
  !m && !tE[c] && (tE[c] = !0, Ma(!1, h));
}
const nE = {};
function _w(c, m) {
  nE[m] || (nE[m] = !0, console.warn(m));
}
const aE = (c, m, h) => _w(c, "⚠️ React Router Future Flag Warning: " + m + ". " + ("You can use the `" + c + "` future flag to opt-in early. ") + ("For more information, see " + h + "."));
function Ow(c, m) {
  (c == null ? void 0 : c.v7_startTransition) === void 0 && aE("v7_startTransition", "React Router will begin wrapping state updates in `React.startTransition` in v7", "https://reactrouter.com/v6/upgrading/future#v7_starttransition"), (c == null ? void 0 : c.v7_relativeSplatPath) === void 0 && aE("v7_relativeSplatPath", "Relative route resolution within Splat routes is changing in v7", "https://reactrouter.com/v6/upgrading/future#v7_relativesplatpath");
}
function Lw(c) {
  let {
    to: m,
    replace: h,
    state: g,
    relative: N
  } = c;
  to() || vt(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of
    // the router loaded. We can help them understand how to avoid that.
    "<Navigate> may be used only in the context of a <Router> component."
  );
  let {
    future: R,
    static: f
  } = D.useContext(fa);
  Ma(!f, "<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.");
  let {
    matches: A
  } = D.useContext(Aa), {
    pathname: C
  } = Qi(), T = Uv(), _ = Mv(m, Vv(A, R.v7_relativeSplatPath), C, N === "path"), S = JSON.stringify(_);
  return D.useEffect(() => T(JSON.parse(S), {
    replace: h,
    state: g,
    relative: N
  }), [T, S, N, h, g]), null;
}
function jr(c) {
  vt(!1, "A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.");
}
function Vw(c) {
  let {
    basename: m = "/",
    children: h = null,
    location: g,
    navigationType: N = li.Pop,
    navigator: R,
    static: f = !1,
    future: A
  } = c;
  to() && vt(!1, "You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");
  let C = m.replace(/^\/*/, "/"), T = D.useMemo(() => ({
    basename: C,
    navigator: R,
    static: f,
    future: Xu({
      v7_relativeSplatPath: !1
    }, A)
  }), [C, A, R, f]);
  typeof g == "string" && (g = eo(g));
  let {
    pathname: _ = "/",
    search: S = "",
    hash: M = "",
    state: z = null,
    key: W = "default"
  } = g, fe = D.useMemo(() => {
    let J = ui(_, C);
    return J == null ? null : {
      location: {
        pathname: J,
        search: S,
        hash: M,
        state: z,
        key: W
      },
      navigationType: N
    };
  }, [C, _, S, M, z, W, N]);
  return Ma(fe != null, '<Router basename="' + C + '"> is not able to match the URL ' + ('"' + _ + S + M + '" because it does not start with the ') + "basename, so the <Router> won't render anything."), fe == null ? null : /* @__PURE__ */ D.createElement(fa.Provider, {
    value: T
  }, /* @__PURE__ */ D.createElement(es.Provider, {
    children: h,
    value: fe
  }));
}
function Mw(c) {
  let {
    children: m,
    location: h
  } = c;
  return yw(Lv(m), h);
}
new Promise(() => {
});
function Lv(c, m) {
  m === void 0 && (m = []);
  let h = [];
  return D.Children.forEach(c, (g, N) => {
    if (!/* @__PURE__ */ D.isValidElement(g))
      return;
    let R = [...m, N];
    if (g.type === D.Fragment) {
      h.push.apply(h, Lv(g.props.children, R));
      return;
    }
    g.type !== jr && vt(!1, "[" + (typeof g.type == "string" ? g.type : g.type.name) + "] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>"), !g.props.index || !g.props.children || vt(!1, "An index route cannot have child routes.");
    let f = {
      id: g.props.id || R.join("-"),
      caseSensitive: g.props.caseSensitive,
      element: g.props.element,
      Component: g.props.Component,
      index: g.props.index,
      path: g.props.path,
      loader: g.props.loader,
      action: g.props.action,
      errorElement: g.props.errorElement,
      ErrorBoundary: g.props.ErrorBoundary,
      hasErrorBoundary: g.props.ErrorBoundary != null || g.props.errorElement != null,
      shouldRevalidate: g.props.shouldRevalidate,
      handle: g.props.handle,
      lazy: g.props.lazy
    };
    g.props.children && (f.children = Lv(g.props.children, R)), h.push(f);
  }), h;
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
function Zl() {
  return Zl = Object.assign ? Object.assign.bind() : function(c) {
    for (var m = 1; m < arguments.length; m++) {
      var h = arguments[m];
      for (var g in h)
        Object.prototype.hasOwnProperty.call(h, g) && (c[g] = h[g]);
    }
    return c;
  }, Zl.apply(this, arguments);
}
function Hv(c, m) {
  if (c == null) return {};
  var h = {}, g = Object.keys(c), N, R;
  for (R = 0; R < g.length; R++)
    N = g[R], !(m.indexOf(N) >= 0) && (h[N] = c[N]);
  return h;
}
const mf = "get", vf = "application/x-www-form-urlencoded";
function gf(c) {
  return c != null && typeof c.tagName == "string";
}
function Aw(c) {
  return gf(c) && c.tagName.toLowerCase() === "button";
}
function kw(c) {
  return gf(c) && c.tagName.toLowerCase() === "form";
}
function Uw(c) {
  return gf(c) && c.tagName.toLowerCase() === "input";
}
function Fw(c) {
  return !!(c.metaKey || c.altKey || c.ctrlKey || c.shiftKey);
}
function zw(c, m) {
  return c.button === 0 && // Ignore everything but left clicks
  (!m || m === "_self") && // Let browser handle "target=_blank" etc.
  !Fw(c);
}
let pf = null;
function Hw() {
  if (pf === null)
    try {
      new FormData(
        document.createElement("form"),
        // @ts-expect-error if FormData supports the submitter parameter, this will throw
        0
      ), pf = !1;
    } catch {
      pf = !0;
    }
  return pf;
}
const Bw = /* @__PURE__ */ new Set(["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"]);
function jv(c) {
  return c != null && !Bw.has(c) ? (Ma(!1, '"' + c + '" is not a valid `encType` for `<Form>`/`<fetcher.Form>` ' + ('and will default to "' + vf + '"')), null) : c;
}
function Pw(c, m) {
  let h, g, N, R, f;
  if (kw(c)) {
    let A = c.getAttribute("action");
    g = A ? ui(A, m) : null, h = c.getAttribute("method") || mf, N = jv(c.getAttribute("enctype")) || vf, R = new FormData(c);
  } else if (Aw(c) || Uw(c) && (c.type === "submit" || c.type === "image")) {
    let A = c.form;
    if (A == null)
      throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
    let C = c.getAttribute("formaction") || A.getAttribute("action");
    if (g = C ? ui(C, m) : null, h = c.getAttribute("formmethod") || A.getAttribute("method") || mf, N = jv(c.getAttribute("formenctype")) || jv(A.getAttribute("enctype")) || vf, R = new FormData(A, c), !Hw()) {
      let {
        name: T,
        type: _,
        value: S
      } = c;
      if (_ === "image") {
        let M = T ? T + "." : "";
        R.append(M + "x", "0"), R.append(M + "y", "0");
      } else T && R.append(T, S);
    }
  } else {
    if (gf(c))
      throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');
    h = mf, g = null, N = vf, f = c;
  }
  return R && N === "text/plain" && (f = R, R = void 0), {
    action: g,
    method: h.toLowerCase(),
    encType: N,
    formData: R,
    body: f
  };
}
const $w = ["onClick", "relative", "reloadDocument", "replace", "state", "target", "to", "preventScrollReset", "viewTransition"], Yw = ["aria-current", "caseSensitive", "className", "end", "style", "to", "viewTransition", "children"], Iw = ["fetcherKey", "navigate", "reloadDocument", "replace", "state", "method", "action", "onSubmit", "relative", "preventScrollReset", "viewTransition"], qw = "6";
try {
  window.__reactRouterVersion = qw;
} catch {
}
const NE = /* @__PURE__ */ D.createContext({
  isTransitioning: !1
});
NE.displayName = "ViewTransition";
const Gw = /* @__PURE__ */ D.createContext(/* @__PURE__ */ new Map());
Gw.displayName = "Fetchers";
const Ww = "startTransition", rE = z1[Ww];
function Qw(c) {
  let {
    basename: m,
    children: h,
    future: g,
    window: N
  } = c, R = D.useRef();
  R.current == null && (R.current = P1({
    window: N,
    v5Compat: !0
  }));
  let f = R.current, [A, C] = D.useState({
    action: f.action,
    location: f.location
  }), {
    v7_startTransition: T
  } = g || {}, _ = D.useCallback((S) => {
    T && rE ? rE(() => C(S)) : C(S);
  }, [C, T]);
  return D.useLayoutEffect(() => f.listen(_), [f, _]), D.useEffect(() => Ow(g), [g]), /* @__PURE__ */ D.createElement(Vw, {
    basename: m,
    children: h,
    location: A.location,
    navigationType: A.action,
    navigator: f,
    future: g
  });
}
const Kw = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", Xw = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, ii = /* @__PURE__ */ D.forwardRef(function(m, h) {
  let {
    onClick: g,
    relative: N,
    reloadDocument: R,
    replace: f,
    state: A,
    target: C,
    to: T,
    preventScrollReset: _,
    viewTransition: S
  } = m, M = Hv(m, $w), {
    basename: z
  } = D.useContext(fa), W, fe = !1;
  if (typeof T == "string" && Xw.test(T) && (W = T, Kw))
    try {
      let G = new URL(window.location.href), P = T.startsWith("//") ? new URL(G.protocol + T) : new URL(T), X = ui(P.pathname, z);
      P.origin === G.origin && X != null ? T = X + P.search + P.hash : fe = !0;
    } catch {
      Ma(!1, '<Link to="' + T + '"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.');
    }
  let J = mw(T, {
    relative: N
  }), ue = t_(T, {
    replace: f,
    state: A,
    target: C,
    preventScrollReset: _,
    relative: N,
    viewTransition: S
  });
  function B(G) {
    g && g(G), G.defaultPrevented || ue(G);
  }
  return (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    /* @__PURE__ */ D.createElement("a", Zl({}, M, {
      href: W || J,
      onClick: fe || R ? g : B,
      ref: h,
      target: C
    }))
  );
});
ii.displayName = "Link";
const Jw = /* @__PURE__ */ D.forwardRef(function(m, h) {
  let {
    "aria-current": g = "page",
    caseSensitive: N = !1,
    className: R = "",
    end: f = !1,
    style: A,
    to: C,
    viewTransition: T,
    children: _
  } = m, S = Hv(m, Yw), M = ts(C, {
    relative: S.relative
  }), z = Qi(), W = D.useContext(Av), {
    navigator: fe,
    basename: J
  } = D.useContext(fa), ue = W != null && // Conditional usage is OK here because the usage of a data router is static
  // eslint-disable-next-line react-hooks/rules-of-hooks
  o_(M) && T === !0, B = fe.encodeLocation ? fe.encodeLocation(M).pathname : M.pathname, G = z.pathname, P = W && W.navigation && W.navigation.location ? W.navigation.location.pathname : null;
  N || (G = G.toLowerCase(), P = P ? P.toLowerCase() : null, B = B.toLowerCase()), P && J && (P = ui(P, J) || P);
  const X = B !== "/" && B.endsWith("/") ? B.length - 1 : B.length;
  let te = G === B || !f && G.startsWith(B) && G.charAt(X) === "/", $ = P != null && (P === B || !f && P.startsWith(B) && P.charAt(B.length) === "/"), xe = {
    isActive: te,
    isPending: $,
    isTransitioning: ue
  }, Q = te ? g : void 0, Re;
  typeof R == "function" ? Re = R(xe) : Re = [R, te ? "active" : null, $ ? "pending" : null, ue ? "transitioning" : null].filter(Boolean).join(" ");
  let ye = typeof A == "function" ? A(xe) : A;
  return /* @__PURE__ */ D.createElement(ii, Zl({}, S, {
    "aria-current": Q,
    className: Re,
    ref: h,
    style: ye,
    to: C,
    viewTransition: T
  }), typeof _ == "function" ? _(xe) : _);
});
Jw.displayName = "NavLink";
const Zw = /* @__PURE__ */ D.forwardRef((c, m) => {
  let {
    fetcherKey: h,
    navigate: g,
    reloadDocument: N,
    replace: R,
    state: f,
    method: A = mf,
    action: C,
    onSubmit: T,
    relative: _,
    preventScrollReset: S,
    viewTransition: M
  } = c, z = Hv(c, Iw), W = i_(), fe = l_(C, {
    relative: _
  }), J = A.toLowerCase() === "get" ? "get" : "post", ue = (B) => {
    if (T && T(B), B.defaultPrevented) return;
    B.preventDefault();
    let G = B.nativeEvent.submitter, P = (G == null ? void 0 : G.getAttribute("formmethod")) || A;
    W(G || B.currentTarget, {
      fetcherKey: h,
      method: P,
      navigate: g,
      replace: R,
      state: f,
      relative: _,
      preventScrollReset: S,
      viewTransition: M
    });
  };
  return /* @__PURE__ */ D.createElement("form", Zl({
    ref: m,
    method: J,
    action: fe,
    onSubmit: N ? T : ue
  }, z));
});
Zw.displayName = "Form";
var yf;
(function(c) {
  c.UseScrollRestoration = "useScrollRestoration", c.UseSubmit = "useSubmit", c.UseSubmitFetcher = "useSubmitFetcher", c.UseFetcher = "useFetcher", c.useViewTransitionState = "useViewTransitionState";
})(yf || (yf = {}));
var iE;
(function(c) {
  c.UseFetcher = "useFetcher", c.UseFetchers = "useFetchers", c.UseScrollRestoration = "useScrollRestoration";
})(iE || (iE = {}));
function e_(c) {
  return c + " must be used within a data router.  See https://reactrouter.com/v6/routers/picking-a-router.";
}
function EE(c) {
  let m = D.useContext(Zu);
  return m || vt(!1, e_(c)), m;
}
function t_(c, m) {
  let {
    target: h,
    replace: g,
    state: N,
    preventScrollReset: R,
    relative: f,
    viewTransition: A
  } = m === void 0 ? {} : m, C = Uv(), T = Qi(), _ = ts(c, {
    relative: f
  });
  return D.useCallback((S) => {
    if (zw(S, h)) {
      S.preventDefault();
      let M = g !== void 0 ? g : Ku(T) === Ku(_);
      C(c, {
        replace: M,
        state: N,
        preventScrollReset: R,
        relative: f,
        viewTransition: A
      });
    }
  }, [T, C, _, g, N, h, c, R, f, A]);
}
function n_() {
  if (typeof document > "u")
    throw new Error("You are calling submit during the server render. Try calling submit within a `useEffect` or callback instead.");
}
let a_ = 0, r_ = () => "__" + String(++a_) + "__";
function i_() {
  let {
    router: c
  } = EE(yf.UseSubmit), {
    basename: m
  } = D.useContext(fa), h = Tw();
  return D.useCallback(function(g, N) {
    N === void 0 && (N = {}), n_();
    let {
      action: R,
      method: f,
      encType: A,
      formData: C,
      body: T
    } = Pw(g, m);
    if (N.navigate === !1) {
      let _ = N.fetcherKey || r_();
      c.fetch(_, h, N.action || R, {
        preventScrollReset: N.preventScrollReset,
        formData: C,
        body: T,
        formMethod: N.method || f,
        formEncType: N.encType || A,
        flushSync: N.flushSync
      });
    } else
      c.navigate(N.action || R, {
        preventScrollReset: N.preventScrollReset,
        formData: C,
        body: T,
        formMethod: N.method || f,
        formEncType: N.encType || A,
        replace: N.replace,
        state: N.state,
        fromRouteId: h,
        flushSync: N.flushSync,
        viewTransition: N.viewTransition
      });
  }, [c, m, h]);
}
function l_(c, m) {
  let {
    relative: h
  } = m === void 0 ? {} : m, {
    basename: g
  } = D.useContext(fa), N = D.useContext(Aa);
  N || vt(!1, "useFormAction must be used inside a RouteContext");
  let [R] = N.matches.slice(-1), f = Zl({}, ts(c || ".", {
    relative: h
  })), A = Qi();
  if (c == null) {
    f.search = A.search;
    let C = new URLSearchParams(f.search), T = C.getAll("index");
    if (T.some((S) => S === "")) {
      C.delete("index"), T.filter((M) => M).forEach((M) => C.append("index", M));
      let S = C.toString();
      f.search = S ? "?" + S : "";
    }
  }
  return (!c || c === ".") && R.route.index && (f.search = f.search ? f.search.replace(/^\?/, "?index&") : "?index"), g !== "/" && (f.pathname = f.pathname === "/" ? g : wr([g, f.pathname])), Ku(f);
}
function o_(c, m) {
  m === void 0 && (m = {});
  let h = D.useContext(NE);
  h == null && vt(!1, "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");
  let {
    basename: g
  } = EE(yf.useViewTransitionState), N = ts(c, {
    relative: m.relative
  });
  if (!h.isTransitioning)
    return !1;
  let R = ui(h.currentLocation.pathname, g) || h.currentLocation.pathname, f = ui(h.nextLocation.pathname, g) || h.nextLocation.pathname;
  return Ov(N.pathname, f) != null || Ov(N.pathname, R) != null;
}
function u_() {
  const [c, m] = D.useState(null), [h, g] = D.useState(""), [N, R] = D.useState(""), [f, A] = D.useState(!0), [C, T] = D.useState(""), [_, S] = D.useState(""), [M, z] = D.useState(!1), [W, fe] = D.useState(!1);
  D.useEffect(() => {
    var G, P, X, te, $, xe;
    m({
      apiKey: (G = window.__FIREBASE__) == null ? void 0 : G.apiKey,
      authDomain: (P = window.__FIREBASE__) == null ? void 0 : P.authDomain,
      projectId: (X = window.__FIREBASE__) == null ? void 0 : X.projectId,
      appId: (te = window.__FIREBASE__) == null ? void 0 : te.appId,
      messagingSenderId: ($ = window.__FIREBASE__) == null ? void 0 : $.messagingSenderId,
      measurementId: (xe = window.__FIREBASE__) == null ? void 0 : xe.measurementId
    });
  }, []);
  function J(G) {
    const P = (G == null ? void 0 : G.code) || "", X = (G == null ? void 0 : G.message) || "";
    return P.includes("invalid-email") ? "Please enter a valid email address." : P.includes("user-not-found") ? "No account found with that email." : P.includes("wrong-password") || P.includes("invalid-credential") || X.includes("INVALID_LOGIN_CREDENTIALS") ? "Incorrect email or password." : P.includes("too-many-requests") ? "Too many attempts. Please wait and try again." : P.includes("network-request-failed") ? "Network error. Check your connection and try again." : X || "Something went wrong.";
  }
  async function ue(G) {
    G.preventDefault(), T(""), S(""), z(!0);
    try {
      if (!(c != null && c.apiKey)) throw new Error("Firebase not configured");
      const P = (await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js")).initializeApp(c), X = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js"), { getAuth: te, setPersistence: $, browserLocalPersistence: xe, browserSessionPersistence: Q, signInWithEmailAndPassword: Re } = X, ye = te();
      await $(ye, f ? xe : Q);
      const de = await (await Re(ye, h.trim(), N)).user.getIdToken();
      if (!(await fetch("/auth/session", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify({ idToken: de }) })).ok) throw new Error("Session creation failed");
      S("Signed in successfully. Redirecting..."), setTimeout(() => window.location.href = "/dashboard", 600);
    } catch (P) {
      T(J(P));
    } finally {
      z(!1);
    }
  }
  async function B() {
    T(""), S("");
    try {
      if (!(c != null && c.apiKey)) throw new Error("Firebase not configured");
      const G = (await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js")).initializeApp(c), { getAuth: P, sendPasswordResetEmail: X } = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js"), te = P();
      await X(te, h.trim()), S("If an account exists for that email, a reset link has been sent.");
    } catch (G) {
      T(J(G));
    }
  }
  return /* @__PURE__ */ d.jsxDEV("section", { className: "auth-layout", children: [
    /* @__PURE__ */ d.jsxDEV("div", { className: "auth-hero", children: [
      /* @__PURE__ */ d.jsxDEV("img", { className: "hero-logo", src: "https://cdn.builder.io/api/v1/image/assets%2Fa5647e4ccf094d4d939a079b9f892c1c%2F240094ac7d6b4725b685503d97c9d9a3?format=webp&width=96", alt: "FreshBasket logo" }, void 0, !1, {
        fileName: "/app/code/client/pages/Login.jsx",
        lineNumber: 71,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ d.jsxDEV("h2", { className: "hero-heading", children: "Welcome back" }, void 0, !1, {
        fileName: "/app/code/client/pages/Login.jsx",
        lineNumber: 72,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ d.jsxDEV("p", { className: "hero-sub", children: "Sign in to manage orders, riders and deliveries." }, void 0, !1, {
        fileName: "/app/code/client/pages/Login.jsx",
        lineNumber: 73,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ d.jsxDEV("ul", { className: "hero-points", children: [
        /* @__PURE__ */ d.jsxDEV("li", { children: "Secure account access" }, void 0, !1, {
          fileName: "/app/code/client/pages/Login.jsx",
          lineNumber: 74,
          columnNumber: 37
        }, this),
        /* @__PURE__ */ d.jsxDEV("li", { children: "Real-time dashboards" }, void 0, !1, {
          fileName: "/app/code/client/pages/Login.jsx",
          lineNumber: 74,
          columnNumber: 67
        }, this),
        /* @__PURE__ */ d.jsxDEV("li", { children: "Faster operations" }, void 0, !1, {
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
    /* @__PURE__ */ d.jsxDEV("div", { className: "auth-panel auth-panel-card", children: [
      /* @__PURE__ */ d.jsxDEV("h2", { className: "auth-title", children: "Sign in to FreshBasket" }, void 0, !1, {
        fileName: "/app/code/client/pages/Login.jsx",
        lineNumber: 78,
        columnNumber: 9
      }, this),
      C && /* @__PURE__ */ d.jsxDEV("div", { className: "auth-error", children: C }, void 0, !1, {
        fileName: "/app/code/client/pages/Login.jsx",
        lineNumber: 79,
        columnNumber: 19
      }, this),
      _ && /* @__PURE__ */ d.jsxDEV("div", { className: "auth-success", children: _ }, void 0, !1, {
        fileName: "/app/code/client/pages/Login.jsx",
        lineNumber: 80,
        columnNumber: 16
      }, this),
      /* @__PURE__ */ d.jsxDEV("form", { className: "auth-form", onSubmit: ue, children: [
        /* @__PURE__ */ d.jsxDEV("label", { className: "auth-label", children: [
          "Email",
          /* @__PURE__ */ d.jsxDEV("input", { className: "auth-input", type: "email", value: h, onChange: (G) => g(G.target.value), required: !0 }, void 0, !1, {
            fileName: "/app/code/client/pages/Login.jsx",
            lineNumber: 83,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Login.jsx",
          lineNumber: 82,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ d.jsxDEV("label", { className: "auth-label", children: [
          "Password",
          /* @__PURE__ */ d.jsxDEV("span", { className: "password-field", children: [
            /* @__PURE__ */ d.jsxDEV("input", { className: "auth-input", type: W ? "text" : "password", value: N, onChange: (G) => R(G.target.value), required: !0 }, void 0, !1, {
              fileName: "/app/code/client/pages/Login.jsx",
              lineNumber: 87,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ d.jsxDEV("button", { type: "button", id: "togglePwd", className: "toggle-password", "aria-label": W ? "Hide password" : "Show password", onClick: () => fe((G) => !G), children: "👁️" }, void 0, !1, {
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
        /* @__PURE__ */ d.jsxDEV("div", { className: "auth-actions", children: [
          /* @__PURE__ */ d.jsxDEV("label", { className: "remember", children: [
            /* @__PURE__ */ d.jsxDEV("input", { type: "checkbox", checked: f, onChange: (G) => A(G.target.checked) }, void 0, !1, {
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
          /* @__PURE__ */ d.jsxDEV("button", { className: "link-button", type: "button", onClick: B, children: "Forgot password?" }, void 0, !1, {
            fileName: "/app/code/client/pages/Login.jsx",
            lineNumber: 93,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Login.jsx",
          lineNumber: 91,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ d.jsxDEV("button", { className: "auth-button auth-button-wide", disabled: M, type: "submit", children: M ? "Signing in…" : "Sign in" }, void 0, !1, {
          fileName: "/app/code/client/pages/Login.jsx",
          lineNumber: 95,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Login.jsx",
        lineNumber: 81,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ d.jsxDEV("p", { className: "auth-alt", children: [
        "No account? ",
        /* @__PURE__ */ d.jsxDEV("a", { href: "/auth/register", children: "Register" }, void 0, !1, {
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
function s_() {
  const [c, m] = D.useState(null), [h, g] = D.useState(""), [N, R] = D.useState(""), [f, A] = D.useState(""), [C, T] = D.useState(""), [_, S] = D.useState(""), [M, z] = D.useState(""), [W, fe] = D.useState(""), [J, ue] = D.useState(!1), [B, G] = D.useState(!1);
  D.useEffect(() => {
    var te, $, xe, Q, Re, ye;
    m({
      apiKey: (te = window.__FIREBASE__) == null ? void 0 : te.apiKey,
      authDomain: ($ = window.__FIREBASE__) == null ? void 0 : $.authDomain,
      projectId: (xe = window.__FIREBASE__) == null ? void 0 : xe.projectId,
      appId: (Q = window.__FIREBASE__) == null ? void 0 : Q.appId,
      messagingSenderId: (Re = window.__FIREBASE__) == null ? void 0 : Re.messagingSenderId,
      measurementId: (ye = window.__FIREBASE__) == null ? void 0 : ye.measurementId
    });
  }, []);
  function P(te) {
    const $ = (te == null ? void 0 : te.code) || "";
    return $.includes("email-already-in-use") ? "An account with this email already exists." : $.includes("weak-password") ? "Password should be at least 6 characters." : $.includes("invalid-email") ? "Please enter a valid email address." : $.includes("network-request-failed") ? "Network error. Check your connection and try again." : (te == null ? void 0 : te.message) || "Something went wrong.";
  }
  async function X(te) {
    te.preventDefault(), z(""), fe(""), ue(!0);
    try {
      if (C !== _) throw new Error("Passwords do not match");
      if (!(c != null && c.apiKey)) throw new Error("Firebase not configured");
      const $ = (await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js")).initializeApp(c), { getAuth: xe, createUserWithEmailAndPassword: Q } = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js"), Re = xe(), Ce = await (await Q(Re, f.trim(), C)).user.getIdToken();
      if (!(await fetch("/auth/session", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify({ idToken: Ce, profile: { fullName: h, contactNumber: N } }) })).ok) throw new Error("Session creation failed");
      fe("Account created successfully. Redirecting..."), setTimeout(() => window.location.href = "/riders", 700);
    } catch ($) {
      z(P($));
    } finally {
      ue(!1);
    }
  }
  return /* @__PURE__ */ d.jsxDEV("section", { className: "auth-panel", style: { maxWidth: 520, margin: "40px auto" }, children: [
    /* @__PURE__ */ d.jsxDEV("h2", { className: "auth-title", children: "Register" }, void 0, !1, {
      fileName: "/app/code/client/pages/Register.jsx",
      lineNumber: 55,
      columnNumber: 7
    }, this),
    M && /* @__PURE__ */ d.jsxDEV("div", { className: "auth-error", children: M }, void 0, !1, {
      fileName: "/app/code/client/pages/Register.jsx",
      lineNumber: 56,
      columnNumber: 17
    }, this),
    W && /* @__PURE__ */ d.jsxDEV("div", { className: "auth-success", children: W }, void 0, !1, {
      fileName: "/app/code/client/pages/Register.jsx",
      lineNumber: 57,
      columnNumber: 14
    }, this),
    /* @__PURE__ */ d.jsxDEV("form", { className: "auth-form", onSubmit: X, children: [
      /* @__PURE__ */ d.jsxDEV("label", { className: "auth-label", children: [
        "Full name",
        /* @__PURE__ */ d.jsxDEV("input", { className: "auth-input", value: h, onChange: (te) => g(te.target.value), required: !0 }, void 0, !1, {
          fileName: "/app/code/client/pages/Register.jsx",
          lineNumber: 60,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Register.jsx",
        lineNumber: 59,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ d.jsxDEV("label", { className: "auth-label", children: [
        "Contact number",
        /* @__PURE__ */ d.jsxDEV("input", { className: "auth-input", value: N, onChange: (te) => R(te.target.value), inputMode: "tel", placeholder: "e.g. +1 555 123 4567" }, void 0, !1, {
          fileName: "/app/code/client/pages/Register.jsx",
          lineNumber: 63,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Register.jsx",
        lineNumber: 62,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ d.jsxDEV("label", { className: "auth-label", children: [
        "Email",
        /* @__PURE__ */ d.jsxDEV("input", { className: "auth-input", type: "email", value: f, onChange: (te) => A(te.target.value), required: !0 }, void 0, !1, {
          fileName: "/app/code/client/pages/Register.jsx",
          lineNumber: 66,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Register.jsx",
        lineNumber: 65,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ d.jsxDEV("label", { className: "auth-label", children: [
        "Password",
        /* @__PURE__ */ d.jsxDEV("span", { className: "password-field", children: [
          /* @__PURE__ */ d.jsxDEV("input", { className: "auth-input", type: B ? "text" : "password", value: C, onChange: (te) => T(te.target.value), minLength: 6, required: !0 }, void 0, !1, {
            fileName: "/app/code/client/pages/Register.jsx",
            lineNumber: 70,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ d.jsxDEV("button", { type: "button", className: "toggle-password", "aria-label": B ? "Hide password" : "Show password", onClick: () => G((te) => !te), children: "👁️" }, void 0, !1, {
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
      /* @__PURE__ */ d.jsxDEV("label", { className: "auth-label", children: [
        "Confirm Password",
        /* @__PURE__ */ d.jsxDEV("input", { className: "auth-input", type: "password", value: _, onChange: (te) => S(te.target.value), minLength: 6, required: !0 }, void 0, !1, {
          fileName: "/app/code/client/pages/Register.jsx",
          lineNumber: 75,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Register.jsx",
        lineNumber: 74,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ d.jsxDEV("button", { className: "auth-button", disabled: J, type: "submit", children: J ? "Creating account…" : "Create account" }, void 0, !1, {
        fileName: "/app/code/client/pages/Register.jsx",
        lineNumber: 77,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Register.jsx",
      lineNumber: 58,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ d.jsxDEV("p", { className: "auth-alt", children: [
      "Have an account? ",
      /* @__PURE__ */ d.jsxDEV("a", { href: "/auth/login", children: "Login" }, void 0, !1, {
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
function oi({ children: c }) {
  const m = Uv();
  return D.useEffect(() => {
    const h = document.getElementById("notifBtn"), g = document.getElementById("notifMenu"), N = document.getElementById("profileBtn"), R = document.getElementById("profileMenu");
    function f(S, M, z) {
      S && (S.classList.toggle("hidden", !z), S.setAttribute("aria-hidden", z ? "false" : "true"), M && M.setAttribute("aria-expanded", z ? "true" : "false"));
    }
    function A() {
      f(g, h, !1), f(R, N, !1);
    }
    function C(S) {
      const M = (z) => z && (z === S.target || z.contains(S.target));
      !M(g) && !M(h) && !M(R) && !M(N) && A();
    }
    function T(S) {
      S.key === "Escape" && A();
    }
    function _(S) {
      S && S.querySelectorAll(".dropdown-item").forEach((M) => {
        M.addEventListener("click", () => A());
      });
    }
    return h && g && (h.addEventListener("click", (S) => {
      S.stopPropagation(), f(R, N, !1), f(g, h, g.classList.contains("hidden"));
    }), _(g)), N && R && (N.addEventListener("click", (S) => {
      S.stopPropagation(), f(g, h, !1), f(R, N, R.classList.contains("hidden"));
    }), _(R)), document.addEventListener("click", C), document.addEventListener("keydown", T), () => {
      document.removeEventListener("click", C), document.removeEventListener("keydown", T);
    };
  }, []), /* @__PURE__ */ d.jsxDEV(d.Fragment, { children: [
    /* @__PURE__ */ d.jsxDEV("header", { className: "site-header", children: [
      /* @__PURE__ */ d.jsxDEV("h1", { className: "site-title", children: /* @__PURE__ */ d.jsxDEV("span", { className: "brand", children: [
        /* @__PURE__ */ d.jsxDEV("img", { className: "brand-logo", src: "https://cdn.builder.io/api/v1/image/assets%2Fa5647e4ccf094d4d939a079b9f892c1c%2F240094ac7d6b4725b685503d97c9d9a3?format=webp&width=64", alt: "FreshBasket logo" }, void 0, !1, {
          fileName: "/app/code/client/components/SiteLayout.jsx",
          lineNumber: 57,
          columnNumber: 60
        }, this),
        /* @__PURE__ */ d.jsxDEV("span", { className: "brand-name", children: "FreshBasket" }, void 0, !1, {
          fileName: "/app/code/client/components/SiteLayout.jsx",
          lineNumber: 57,
          columnNumber: 253
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/components/SiteLayout.jsx",
        lineNumber: 57,
        columnNumber: 36
      }, this) }, void 0, !1, {
        fileName: "/app/code/client/components/SiteLayout.jsx",
        lineNumber: 57,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ d.jsxDEV("nav", { className: "site-nav", children: [
        /* @__PURE__ */ d.jsxDEV(ii, { to: "/dashboard", onClick: (h) => {
          h.preventDefault(), m("/dashboard");
        }, children: "Dashboard" }, void 0, !1, {
          fileName: "/app/code/client/components/SiteLayout.jsx",
          lineNumber: 59,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ d.jsxDEV(ii, { to: "/orders", onClick: (h) => {
          h.preventDefault(), m("/orders");
        }, children: "Orders" }, void 0, !1, {
          fileName: "/app/code/client/components/SiteLayout.jsx",
          lineNumber: 60,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ d.jsxDEV(ii, { to: "/riders", onClick: (h) => {
          h.preventDefault(), m("/riders");
        }, children: "Riders" }, void 0, !1, {
          fileName: "/app/code/client/components/SiteLayout.jsx",
          lineNumber: 61,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ d.jsxDEV(ii, { to: "/reports", onClick: (h) => {
          h.preventDefault(), m("/reports");
        }, children: "Reports" }, void 0, !1, {
          fileName: "/app/code/client/components/SiteLayout.jsx",
          lineNumber: 62,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ d.jsxDEV("span", { className: "site-nav-spacer" }, void 0, !1, {
          fileName: "/app/code/client/components/SiteLayout.jsx",
          lineNumber: 63,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ d.jsxDEV("div", { className: "nav-dropdown", children: [
          /* @__PURE__ */ d.jsxDEV("button", { id: "notifBtn", className: "icon-btn", "aria-haspopup": "true", "aria-expanded": "false", "aria-controls": "notifMenu", "aria-label": "Notifications", title: "Notifications", children: /* @__PURE__ */ d.jsxDEV("svg", { className: "bell-icon", width: "29", height: "29", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true", children: [
            /* @__PURE__ */ d.jsxDEV("defs", { children: /* @__PURE__ */ d.jsxDEV("linearGradient", { id: "bellGold", x1: "0", y1: "0", x2: "0", y2: "1", children: [
              /* @__PURE__ */ d.jsxDEV("stop", { offset: "0%", stopColor: "#C08B3E" }, void 0, !1, {
                fileName: "/app/code/client/components/SiteLayout.jsx",
                lineNumber: 69,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ d.jsxDEV("stop", { offset: "50%", stopColor: "#D4AF37" }, void 0, !1, {
                fileName: "/app/code/client/components/SiteLayout.jsx",
                lineNumber: 70,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ d.jsxDEV("stop", { offset: "100%", stopColor: "#FFD700" }, void 0, !1, {
                fileName: "/app/code/client/components/SiteLayout.jsx",
                lineNumber: 71,
                columnNumber: 21
              }, this)
            ] }, void 0, !0, {
              fileName: "/app/code/client/components/SiteLayout.jsx",
              lineNumber: 68,
              columnNumber: 19
            }, this) }, void 0, !1, {
              fileName: "/app/code/client/components/SiteLayout.jsx",
              lineNumber: 67,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ d.jsxDEV("path", { fill: "url(#bellGold)", d: "M12 22a2 2 0 0 0 1.995-1.85L14 20h-4a2 2 0 0 0 1.85 1.995L12 22Zm8-5h-1a1 1 0 0 1-.707-.293l-.147-.147A3.99 3.99 0 0 1 17 14.172V11a5 5 0 1 0-10 0v3.172a3.99 3.99 0 0 1-1.146 2.388l-.147.147A1 1 0 0 1 5 17H4a1 1 0 1 0 0 2h16a1 1 0 1 0 0-2Z" }, void 0, !1, {
              fileName: "/app/code/client/components/SiteLayout.jsx",
              lineNumber: 74,
              columnNumber: 17
            }, this)
          ] }, void 0, !0, {
            fileName: "/app/code/client/components/SiteLayout.jsx",
            lineNumber: 66,
            columnNumber: 15
          }, this) }, void 0, !1, {
            fileName: "/app/code/client/components/SiteLayout.jsx",
            lineNumber: 65,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ d.jsxDEV("div", { id: "notifMenu", className: "dropdown-menu hidden", role: "menu", "aria-labelledby": "notifBtn", "aria-hidden": "true", children: [
            /* @__PURE__ */ d.jsxDEV("div", { className: "dropdown-header", children: "Notifications" }, void 0, !1, {
              fileName: "/app/code/client/components/SiteLayout.jsx",
              lineNumber: 78,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ d.jsxDEV("div", { className: "dropdown-item", children: "No new notifications" }, void 0, !1, {
              fileName: "/app/code/client/components/SiteLayout.jsx",
              lineNumber: 79,
              columnNumber: 15
            }, this)
          ] }, void 0, !0, {
            fileName: "/app/code/client/components/SiteLayout.jsx",
            lineNumber: 77,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/components/SiteLayout.jsx",
          lineNumber: 64,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ d.jsxDEV("div", { className: "nav-dropdown", children: [
          /* @__PURE__ */ d.jsxDEV("button", { id: "profileBtn", className: "icon-btn", "aria-haspopup": "true", "aria-expanded": "false", "aria-controls": "profileMenu", title: "Profile", children: /* @__PURE__ */ d.jsxDEV("svg", { className: "avatar", width: "28", height: "28", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
            /* @__PURE__ */ d.jsxDEV("circle", { cx: "12", cy: "7.5", r: "3.5", stroke: "currentColor", strokeWidth: "1.5" }, void 0, !1, {
              fileName: "/app/code/client/components/SiteLayout.jsx",
              lineNumber: 85,
              columnNumber: 129
            }, this),
            /* @__PURE__ */ d.jsxDEV("path", { d: "M4 20c0-3.314 3.582-6 8-6s8 2.686 8 6", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" }, void 0, !1, {
              fileName: "/app/code/client/components/SiteLayout.jsx",
              lineNumber: 85,
              columnNumber: 203
            }, this)
          ] }, void 0, !0, {
            fileName: "/app/code/client/components/SiteLayout.jsx",
            lineNumber: 85,
            columnNumber: 15
          }, this) }, void 0, !1, {
            fileName: "/app/code/client/components/SiteLayout.jsx",
            lineNumber: 84,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ d.jsxDEV("div", { id: "profileMenu", className: "dropdown-menu hidden", role: "menu", "aria-labelledby": "profileBtn", "aria-hidden": "true", children: [
            /* @__PURE__ */ d.jsxDEV("div", { className: "dropdown-header", children: "Signed in" }, void 0, !1, {
              fileName: "/app/code/client/components/SiteLayout.jsx",
              lineNumber: 88,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ d.jsxDEV(ii, { className: "dropdown-item", to: "/riders", onClick: (h) => {
              h.preventDefault(), m("/riders");
            }, children: "Riders" }, void 0, !1, {
              fileName: "/app/code/client/components/SiteLayout.jsx",
              lineNumber: 89,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ d.jsxDEV(ii, { className: "dropdown-item", to: "/orders", onClick: (h) => {
              h.preventDefault(), m("/orders");
            }, children: "Orders" }, void 0, !1, {
              fileName: "/app/code/client/components/SiteLayout.jsx",
              lineNumber: 90,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ d.jsxDEV("form", { method: "POST", action: "/auth/logout", children: /* @__PURE__ */ d.jsxDEV("button", { className: "dropdown-item", type: "submit", children: "Logout" }, void 0, !1, {
              fileName: "/app/code/client/components/SiteLayout.jsx",
              lineNumber: 91,
              columnNumber: 57
            }, this) }, void 0, !1, {
              fileName: "/app/code/client/components/SiteLayout.jsx",
              lineNumber: 91,
              columnNumber: 15
            }, this)
          ] }, void 0, !0, {
            fileName: "/app/code/client/components/SiteLayout.jsx",
            lineNumber: 87,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/components/SiteLayout.jsx",
          lineNumber: 83,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/components/SiteLayout.jsx",
        lineNumber: 58,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/components/SiteLayout.jsx",
      lineNumber: 56,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ d.jsxDEV("main", { className: "content", children: c }, void 0, !1, {
      fileName: "/app/code/client/components/SiteLayout.jsx",
      lineNumber: 97,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ d.jsxDEV("footer", { className: "site-footer", children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " FreshBasket"
    ] }, void 0, !0, {
      fileName: "/app/code/client/components/SiteLayout.jsx",
      lineNumber: 98,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "/app/code/client/components/SiteLayout.jsx",
    lineNumber: 55,
    columnNumber: 5
  }, this);
}
function c_({ onClose: c, onCreated: m }) {
  const [h, g] = D.useState(""), [N, R] = D.useState(""), [f, A] = D.useState(""), [C, T] = D.useState(""), [_, S] = D.useState(!1), [M, z] = D.useState(""), [W, fe] = D.useState("");
  async function J() {
    if (z(""), fe(""), !h || !N) {
      z("Email and password are required");
      return;
    }
    S(!0);
    try {
      const ue = await fetch("/api/mobile/register", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: String(h).trim(), password: String(N), fullName: String(f).trim() || null, contactNumber: String(C).trim() || null })
      }), B = await ue.json().catch(() => null);
      if (!ue.ok) throw new Error(B && B.error ? B.error : B && B.message ? B.message : "Failed to create rider");
      fe("Rider created successfully"), m && m(), setTimeout(() => {
        c && c();
      }, 600);
    } catch (ue) {
      z(ue.message || "Failed to create rider");
    } finally {
      S(!1);
    }
  }
  return /* @__PURE__ */ d.jsxDEV("div", { className: "create-rider-backdrop", role: "dialog", "aria-modal": "true", children: /* @__PURE__ */ d.jsxDEV("div", { className: "create-rider-modal", children: [
    /* @__PURE__ */ d.jsxDEV("header", { className: "create-rider-header", children: [
      /* @__PURE__ */ d.jsxDEV("h3", { className: "create-rider-title", children: "Create Rider" }, void 0, !1, {
        fileName: "/app/code/client/components/CreateRiderModal.jsx",
        lineNumber: 36,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ d.jsxDEV("button", { className: "create-rider-close", onClick: c, "aria-label": "Close", children: "✕" }, void 0, !1, {
        fileName: "/app/code/client/components/CreateRiderModal.jsx",
        lineNumber: 37,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/components/CreateRiderModal.jsx",
      lineNumber: 35,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV("div", { className: "create-rider-body", children: [
      M && /* @__PURE__ */ d.jsxDEV("div", { className: "auth-error", children: M }, void 0, !1, {
        fileName: "/app/code/client/components/CreateRiderModal.jsx",
        lineNumber: 40,
        columnNumber: 21
      }, this),
      W && /* @__PURE__ */ d.jsxDEV("div", { className: "auth-success", children: W }, void 0, !1, {
        fileName: "/app/code/client/components/CreateRiderModal.jsx",
        lineNumber: 41,
        columnNumber: 18
      }, this),
      /* @__PURE__ */ d.jsxDEV("label", { className: "field-label", children: [
        "Full name",
        /* @__PURE__ */ d.jsxDEV("input", { className: "field-input", value: f, onChange: (ue) => A(ue.target.value), placeholder: "Optional" }, void 0, !1, {
          fileName: "/app/code/client/components/CreateRiderModal.jsx",
          lineNumber: 43,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/components/CreateRiderModal.jsx",
        lineNumber: 42,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ d.jsxDEV("label", { className: "field-label", children: [
        "Email",
        /* @__PURE__ */ d.jsxDEV("input", { className: "field-input", type: "email", value: h, onChange: (ue) => g(ue.target.value), required: !0 }, void 0, !1, {
          fileName: "/app/code/client/components/CreateRiderModal.jsx",
          lineNumber: 46,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/components/CreateRiderModal.jsx",
        lineNumber: 45,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ d.jsxDEV("label", { className: "field-label", children: [
        "Password",
        /* @__PURE__ */ d.jsxDEV("input", { className: "field-input", type: "password", value: N, onChange: (ue) => R(ue.target.value), required: !0 }, void 0, !1, {
          fileName: "/app/code/client/components/CreateRiderModal.jsx",
          lineNumber: 49,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/components/CreateRiderModal.jsx",
        lineNumber: 48,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ d.jsxDEV("label", { className: "field-label", children: [
        "Contact number",
        /* @__PURE__ */ d.jsxDEV("input", { className: "field-input", value: C, onChange: (ue) => T(ue.target.value), placeholder: "Optional" }, void 0, !1, {
          fileName: "/app/code/client/components/CreateRiderModal.jsx",
          lineNumber: 52,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/components/CreateRiderModal.jsx",
        lineNumber: 51,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ d.jsxDEV("div", { className: "create-rider-actions", children: [
        /* @__PURE__ */ d.jsxDEV("button", { className: "btn-secondary", onClick: c, disabled: _, children: "Cancel" }, void 0, !1, {
          fileName: "/app/code/client/components/CreateRiderModal.jsx",
          lineNumber: 55,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ d.jsxDEV("button", { className: "btn-primary", onClick: J, disabled: _, children: _ ? "Creating…" : "Create" }, void 0, !1, {
          fileName: "/app/code/client/components/CreateRiderModal.jsx",
          lineNumber: 56,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/components/CreateRiderModal.jsx",
        lineNumber: 54,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/components/CreateRiderModal.jsx",
      lineNumber: 39,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "/app/code/client/components/CreateRiderModal.jsx",
    lineNumber: 34,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "/app/code/client/components/CreateRiderModal.jsx",
    lineNumber: 33,
    columnNumber: 5
  }, this);
}
function f_() {
  const [c, m] = D.useState([]), [h, g] = D.useState(""), [N, R] = D.useState("all"), [f, A] = D.useState("all"), [C, T] = D.useState("all"), [_, S] = D.useState(!0), [M, z] = D.useState(""), [W, fe] = D.useState(1), [J, ue] = D.useState(20), [B, G] = D.useState({ total: 0, page: 1, limit: 20, pages: 1 }), [P, X] = D.useState(!1);
  D.useEffect(() => {
    let $ = !0;
    return (async () => {
      var xe, Q, Re, ye;
      S(!0), z("");
      try {
        const Ce = new URLSearchParams();
        h && Ce.set("q", h), C !== "all" && Ce.set("status", C), N !== "all" && Ce.set("lastDays", N), Ce.set("page", String(W)), Ce.set("limit", String(J));
        const de = await fetch(`/api/riders?${Ce.toString()}`, { credentials: "include" });
        if (de.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!de.ok) throw new Error("Failed to load riders");
        const we = await de.json();
        $ && (m(Array.isArray(we.riders) ? we.riders : []), G({ total: ((xe = we.meta) == null ? void 0 : xe.total) || 0, page: ((Q = we.meta) == null ? void 0 : Q.page) || 1, limit: ((Re = we.meta) == null ? void 0 : Re.limit) || J, pages: ((ye = we.meta) == null ? void 0 : ye.pages) || 1 }));
      } catch (Ce) {
        $ && z(Ce.message || "Failed to load riders");
      } finally {
        $ && S(!1);
      }
    })(), () => {
      $ = !1;
    };
  }, [h, C, N, W, J]);
  const te = D.useMemo(() => c.filter(($) => {
    if (h && !$.name.toLowerCase().includes(h.toLowerCase().trim()) || C !== "all" && $.status !== C || f !== "all" && String($.id) !== String(f)) return !1;
    if (N !== "all") {
      const xe = parseInt($.lastActiveDays, 10) || 9999, Q = parseInt(N, 10);
      if (!(xe <= Q)) return !1;
    }
    return !0;
  }), [c, h, C, f, N]);
  return /* @__PURE__ */ d.jsxDEV(oi, { children: /* @__PURE__ */ d.jsxDEV("section", { className: "rider-commissions", children: [
    /* @__PURE__ */ d.jsxDEV("header", { className: "rc-header riders-header", children: [
      /* @__PURE__ */ d.jsxDEV("div", { className: "riders-header-left", children: [
        /* @__PURE__ */ d.jsxDEV("h2", { className: "rc-title", children: "Rider Commissions" }, void 0, !1, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 62,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ d.jsxDEV("p", { className: "rc-subtitle", children: "View and manage rider commissions based on performance and distance traveled." }, void 0, !1, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 63,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 61,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ d.jsxDEV("div", { className: "riders-header-right", children: /* @__PURE__ */ d.jsxDEV("button", { className: "btn-secondary btn-create-rider", onClick: () => X(!0), children: "Create Rider" }, void 0, !1, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 66,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 65,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Riders.jsx",
      lineNumber: 60,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV("div", { className: "rc-toolbar", children: [
      /* @__PURE__ */ d.jsxDEV("div", { className: "rc-search", children: [
        /* @__PURE__ */ d.jsxDEV("span", { className: "rc-search-icon", "aria-hidden": "true" }, void 0, !1, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 72,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ d.jsxDEV("input", { className: "rc-search-input", type: "search", placeholder: "Search", value: h, onChange: ($) => {
          g($.target.value), fe(1);
        } }, void 0, !1, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 73,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 71,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ d.jsxDEV("div", { className: "rc-filters", children: [
        /* @__PURE__ */ d.jsxDEV("select", { className: "rc-select rc-chip", value: N, onChange: ($) => {
          R($.target.value), fe(1);
        }, children: [
          /* @__PURE__ */ d.jsxDEV("option", { value: "all", children: "Date Range" }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 77,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ d.jsxDEV("option", { value: "7", children: "Last 7 days" }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 78,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ d.jsxDEV("option", { value: "30", children: "Last 30 days" }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 79,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 76,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ d.jsxDEV("select", { className: "rc-select rc-chip", value: f, onChange: ($) => A($.target.value), children: [
          /* @__PURE__ */ d.jsxDEV("option", { value: "all", children: "Rider" }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 82,
            columnNumber: 15
          }, this),
          c.map(($) => /* @__PURE__ */ d.jsxDEV("option", { value: $.id, children: $.name }, $.id, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 83,
            columnNumber: 33
          }, this))
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 81,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ d.jsxDEV("select", { className: "rc-select rc-chip", value: C, onChange: ($) => {
          T($.target.value), fe(1);
        }, children: [
          /* @__PURE__ */ d.jsxDEV("option", { value: "all", children: "Status" }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 86,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ d.jsxDEV("option", { value: "Active", children: "Active" }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 87,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ d.jsxDEV("option", { value: "Inactive", children: "Inactive" }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 88,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 85,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 75,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ d.jsxDEV("select", { className: "rc-select rc-chip", value: J, onChange: ($) => {
        ue(parseInt($.target.value, 10)), fe(1);
      }, children: [10, 20, 50, 100].map(($) => /* @__PURE__ */ d.jsxDEV("option", { value: $, children: [
        $,
        "/page"
      ] }, $, !0, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 92,
        columnNumber: 39
      }, this)) }, void 0, !1, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 91,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Riders.jsx",
      lineNumber: 70,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV("div", { className: "rc-table-wrapper", children: [
      P && /* @__PURE__ */ d.jsxDEV(c_, { onClose: () => X(!1), onCreated: () => {
        window.location.reload();
      } }, void 0, !1, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 98,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ d.jsxDEV("table", { className: "rc-table", children: [
        /* @__PURE__ */ d.jsxDEV("thead", { children: /* @__PURE__ */ d.jsxDEV("tr", { children: [
          /* @__PURE__ */ d.jsxDEV("th", { className: "col-name", children: "Rider Name" }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 103,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ d.jsxDEV("th", { className: "col-km", children: "Total KM Traveled" }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 104,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ d.jsxDEV("th", { className: "col-perf", children: "Delivery Performance" }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 105,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ d.jsxDEV("th", { className: "col-comm", children: "Commission Earned" }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 106,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 102,
          columnNumber: 15
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 101,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ d.jsxDEV("tbody", { children: [
          _ && /* @__PURE__ */ d.jsxDEV("tr", { children: /* @__PURE__ */ d.jsxDEV("td", { colSpan: 4, className: "section-note", children: "Loading…" }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 111,
            columnNumber: 21
          }, this) }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 111,
            columnNumber: 17
          }, this),
          !_ && M && /* @__PURE__ */ d.jsxDEV("tr", { children: /* @__PURE__ */ d.jsxDEV("td", { colSpan: 4, className: "auth-error", children: M }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 114,
            columnNumber: 21
          }, this) }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 114,
            columnNumber: 17
          }, this),
          !_ && !M && te.map(($) => /* @__PURE__ */ d.jsxDEV("tr", { "data-rider-id": $.id, "data-status": $.status, "data-last-days": $.lastActiveDays, children: [
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-name", children: /* @__PURE__ */ d.jsxDEV("a", { href: `/riders/${$.id}`, children: $.name }, void 0, !1, {
              fileName: "/app/code/client/pages/Riders.jsx",
              lineNumber: 118,
              columnNumber: 47
            }, this) }, void 0, !1, {
              fileName: "/app/code/client/pages/Riders.jsx",
              lineNumber: 118,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-km", children: [
              $.totalKm,
              " ",
              /* @__PURE__ */ d.jsxDEV("span", { className: "rc-km-unit", children: "km" }, void 0, !1, {
                fileName: "/app/code/client/pages/Riders.jsx",
                lineNumber: 119,
                columnNumber: 57
              }, this)
            ] }, void 0, !0, {
              fileName: "/app/code/client/pages/Riders.jsx",
              lineNumber: 119,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-perf", children: /* @__PURE__ */ d.jsxDEV("div", { className: "rc-progress", children: [
              /* @__PURE__ */ d.jsxDEV("progress", { max: "100", value: $.performance, className: "rc-progress-bar" }, void 0, !1, {
                fileName: "/app/code/client/pages/Riders.jsx",
                lineNumber: 122,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ d.jsxDEV("span", { className: "rc-progress-value", children: $.performance }, void 0, !1, {
                fileName: "/app/code/client/pages/Riders.jsx",
                lineNumber: 123,
                columnNumber: 23
              }, this)
            ] }, void 0, !0, {
              fileName: "/app/code/client/pages/Riders.jsx",
              lineNumber: 121,
              columnNumber: 21
            }, this) }, void 0, !1, {
              fileName: "/app/code/client/pages/Riders.jsx",
              lineNumber: 120,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-commission", children: [
              "$",
              $.commissionUsd
            ] }, void 0, !0, {
              fileName: "/app/code/client/pages/Riders.jsx",
              lineNumber: 126,
              columnNumber: 19
            }, this)
          ] }, $.id, !0, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 117,
            columnNumber: 17
          }, this)),
          !_ && !M && te.length === 0 && /* @__PURE__ */ d.jsxDEV("tr", { children: /* @__PURE__ */ d.jsxDEV("td", { colSpan: 4, className: "section-note", children: "No riders found." }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 130,
            columnNumber: 21
          }, this) }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 130,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 109,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 100,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Riders.jsx",
      lineNumber: 96,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV("div", { className: "rc-toolbar", "aria-label": "pagination", children: /* @__PURE__ */ d.jsxDEV("div", { className: "rc-filters", children: [
      /* @__PURE__ */ d.jsxDEV("button", { className: "rc-select rc-chip", disabled: B.page <= 1 || _, onClick: () => fe(($) => Math.max(1, $ - 1)), children: "Prev" }, void 0, !1, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 138,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ d.jsxDEV("span", { className: "section-note", children: [
        "Page ",
        B.page,
        " of ",
        B.pages,
        " • ",
        B.total,
        " total"
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 139,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ d.jsxDEV("button", { className: "rc-select rc-chip", disabled: B.page >= B.pages || _, onClick: () => fe(($) => Math.min(B.pages, $ + 1)), children: "Next" }, void 0, !1, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 140,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Riders.jsx",
      lineNumber: 137,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/pages/Riders.jsx",
      lineNumber: 136,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "/app/code/client/pages/Riders.jsx",
    lineNumber: 59,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "/app/code/client/pages/Riders.jsx",
    lineNumber: 58,
    columnNumber: 5
  }, this);
}
function d_() {
  const { id: c } = hw(), [m, h] = D.useState(null), [g, N] = D.useState(!0), [R, f] = D.useState("");
  if (D.useEffect(() => {
    let _ = !0;
    return (async () => {
      N(!0), f("");
      try {
        const S = await fetch(`/api/riders/${c}`, { credentials: "include" });
        if (S.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!S.ok) throw new Error("Failed to load rider");
        const M = await S.json();
        _ && h(M);
      } catch (S) {
        _ && f(S.message || "Failed to load rider");
      } finally {
        _ && N(!1);
      }
    })(), () => {
      _ = !1;
    };
  }, [c]), g)
    return /* @__PURE__ */ d.jsxDEV(oi, { children: /* @__PURE__ */ d.jsxDEV("section", { className: "section-page", children: /* @__PURE__ */ d.jsxDEV("div", { className: "section-note", children: "Loading…" }, void 0, !1, {
      fileName: "/app/code/client/pages/RiderProfile.jsx",
      lineNumber: 28,
      columnNumber: 58
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/pages/RiderProfile.jsx",
      lineNumber: 28,
      columnNumber: 24
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/pages/RiderProfile.jsx",
      lineNumber: 28,
      columnNumber: 12
    }, this);
  if (R)
    return /* @__PURE__ */ d.jsxDEV(oi, { children: /* @__PURE__ */ d.jsxDEV("section", { className: "section-page", children: /* @__PURE__ */ d.jsxDEV("div", { className: "auth-error", children: R }, void 0, !1, {
      fileName: "/app/code/client/pages/RiderProfile.jsx",
      lineNumber: 31,
      columnNumber: 58
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/pages/RiderProfile.jsx",
      lineNumber: 31,
      columnNumber: 24
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/pages/RiderProfile.jsx",
      lineNumber: 31,
      columnNumber: 12
    }, this);
  if (!m)
    return /* @__PURE__ */ d.jsxDEV(oi, { children: /* @__PURE__ */ d.jsxDEV("section", { className: "section-page", children: /* @__PURE__ */ d.jsxDEV("div", { className: "section-note", children: "Not found" }, void 0, !1, {
      fileName: "/app/code/client/pages/RiderProfile.jsx",
      lineNumber: 34,
      columnNumber: 58
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/pages/RiderProfile.jsx",
      lineNumber: 34,
      columnNumber: 24
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/pages/RiderProfile.jsx",
      lineNumber: 34,
      columnNumber: 12
    }, this);
  const { rider: A, metrics: C, history: T } = m;
  return /* @__PURE__ */ d.jsxDEV(oi, { children: /* @__PURE__ */ d.jsxDEV("section", { className: "rider-commissions", children: [
    /* @__PURE__ */ d.jsxDEV("header", { className: "rc-header", children: [
      /* @__PURE__ */ d.jsxDEV("h2", { className: "rc-title", children: "Rider Profile" }, void 0, !1, {
        fileName: "/app/code/client/pages/RiderProfile.jsx",
        lineNumber: 43,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ d.jsxDEV("p", { className: "rc-subtitle", children: "View detailed performance metrics for individual riders." }, void 0, !1, {
        fileName: "/app/code/client/pages/RiderProfile.jsx",
        lineNumber: 44,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/RiderProfile.jsx",
      lineNumber: 42,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV("div", { className: "rc-table-wrapper rp-card", children: /* @__PURE__ */ d.jsxDEV("div", { className: "rp-details", children: [
      /* @__PURE__ */ d.jsxDEV("img", { src: "https://cdn.builder.io/api/v1/image/assets%2Fa5647e4ccf094d4d939a079b9f892c1c%2Ff54e0df2f0fb4bff9c894340e2efe67a?format=webp&width=72", alt: "avatar", className: "rp-avatar" }, void 0, !1, {
        fileName: "/app/code/client/pages/RiderProfile.jsx",
        lineNumber: 49,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ d.jsxDEV("div", { children: [
        /* @__PURE__ */ d.jsxDEV("h3", { className: "rp-name", children: A.name }, void 0, !1, {
          fileName: "/app/code/client/pages/RiderProfile.jsx",
          lineNumber: 51,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ d.jsxDEV("div", { className: "section-note", children: [
          "Rider ID: ",
          A.id
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/RiderProfile.jsx",
          lineNumber: 52,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/RiderProfile.jsx",
        lineNumber: 50,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/RiderProfile.jsx",
      lineNumber: 48,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/pages/RiderProfile.jsx",
      lineNumber: 47,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV("div", { className: "rc-toolbar rp-stats", children: /* @__PURE__ */ d.jsxDEV("div", { className: "rc-filters rp-stats-wrap", children: [
      /* @__PURE__ */ d.jsxDEV("div", { className: "rc-select rc-chip", children: [
        "Total Deliveries ",
        /* @__PURE__ */ d.jsxDEV("strong", { children: C.totalDeliveries }, void 0, !1, {
          fileName: "/app/code/client/pages/RiderProfile.jsx",
          lineNumber: 59,
          columnNumber: 70
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/RiderProfile.jsx",
        lineNumber: 59,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ d.jsxDEV("div", { className: "rc-select rc-chip", children: [
        "Avg. Delivery Time ",
        /* @__PURE__ */ d.jsxDEV("strong", { children: [
          C.avgDeliveryMins,
          " mins"
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/RiderProfile.jsx",
          lineNumber: 60,
          columnNumber: 72
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/RiderProfile.jsx",
        lineNumber: 60,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ d.jsxDEV("div", { className: "rc-select rc-chip", children: [
        "On-Time Rate ",
        /* @__PURE__ */ d.jsxDEV("strong", { children: [
          C.onTimeRate,
          "%"
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/RiderProfile.jsx",
          lineNumber: 61,
          columnNumber: 66
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/RiderProfile.jsx",
        lineNumber: 61,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ d.jsxDEV("div", { className: "rc-select rc-chip", children: [
        "Total KM Traveled ",
        /* @__PURE__ */ d.jsxDEV("strong", { children: [
          C.totalKm,
          " km"
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/RiderProfile.jsx",
          lineNumber: 62,
          columnNumber: 71
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/RiderProfile.jsx",
        lineNumber: 62,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/RiderProfile.jsx",
      lineNumber: 58,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/pages/RiderProfile.jsx",
      lineNumber: 57,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV("div", { className: "rc-table-wrapper", children: /* @__PURE__ */ d.jsxDEV("table", { className: "rc-table", children: [
      /* @__PURE__ */ d.jsxDEV("thead", { children: /* @__PURE__ */ d.jsxDEV("tr", { children: [
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-name", children: "Date" }, void 0, !1, {
          fileName: "/app/code/client/pages/RiderProfile.jsx",
          lineNumber: 70,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-km", children: "Deliveries" }, void 0, !1, {
          fileName: "/app/code/client/pages/RiderProfile.jsx",
          lineNumber: 71,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-perf", children: "Avg. Delivery Time" }, void 0, !1, {
          fileName: "/app/code/client/pages/RiderProfile.jsx",
          lineNumber: 72,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-comm", children: "Distance (KM)" }, void 0, !1, {
          fileName: "/app/code/client/pages/RiderProfile.jsx",
          lineNumber: 73,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/RiderProfile.jsx",
        lineNumber: 69,
        columnNumber: 15
      }, this) }, void 0, !1, {
        fileName: "/app/code/client/pages/RiderProfile.jsx",
        lineNumber: 68,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ d.jsxDEV("tbody", { children: (T || []).map((_, S) => /* @__PURE__ */ d.jsxDEV("tr", { children: [
        /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-name", children: _.date }, void 0, !1, {
          fileName: "/app/code/client/pages/RiderProfile.jsx",
          lineNumber: 79,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-km", children: _.deliveries }, void 0, !1, {
          fileName: "/app/code/client/pages/RiderProfile.jsx",
          lineNumber: 80,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-perf", children: [
          _.avgTime,
          " mins"
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/RiderProfile.jsx",
          lineNumber: 81,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-commission", children: [
          _.distanceKm,
          " km"
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/RiderProfile.jsx",
          lineNumber: 82,
          columnNumber: 19
        }, this)
      ] }, S, !0, {
        fileName: "/app/code/client/pages/RiderProfile.jsx",
        lineNumber: 78,
        columnNumber: 17
      }, this)) }, void 0, !1, {
        fileName: "/app/code/client/pages/RiderProfile.jsx",
        lineNumber: 76,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/RiderProfile.jsx",
      lineNumber: 67,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/pages/RiderProfile.jsx",
      lineNumber: 66,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "/app/code/client/pages/RiderProfile.jsx",
    lineNumber: 41,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "/app/code/client/pages/RiderProfile.jsx",
    lineNumber: 40,
    columnNumber: 5
  }, this);
}
function p_(c) {
  return (Array.isArray(c.tags) ? c.tags : typeof c.tags == "string" ? c.tags.split(",") : []).join(",").toLowerCase().includes("assigned") ? "assigned" : c.fulfillment_status === "fulfilled" ? "delivered" : c.fulfillment_status === "partial" ? "in-transit" : "new";
}
function m_() {
  const [c, m] = D.useState([]), [h, g] = D.useState(""), [N, R] = D.useState("all"), [f, A] = D.useState(1), [C, T] = D.useState(20), [_, S] = D.useState({ total: 0, page: 1, limit: 20, pages: 1 }), [M, z] = D.useState(""), [W, fe] = D.useState(""), [J, ue] = D.useState(!0), [B, G] = D.useState(""), [P, X] = D.useState(""), [te, $] = D.useState(!0);
  D.useEffect(() => {
    let Q = !0;
    return (async () => {
      var Re, ye, Ce, de;
      ue(!0), G(""), X("");
      try {
        const we = new URLSearchParams();
        h && we.set("q", h), N && N !== "all" && we.set("status", N), M && we.set("created_at_min", M), W && we.set("created_at_max", W), we.set("page", String(f)), we.set("limit", String(C));
        const Ie = await fetch(`/api/orders?${we.toString()}`, { credentials: "include" });
        if (Ie.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!Ie.ok) throw new Error("Failed to load orders");
        const qe = await Ie.json();
        Q && (m(Array.isArray(qe.orders) ? qe.orders : []), X(qe.shopifyError || ""), $(!!qe.shopifyConfigured), S({ total: ((Re = qe.meta) == null ? void 0 : Re.total) || 0, page: ((ye = qe.meta) == null ? void 0 : ye.page) || 1, limit: ((Ce = qe.meta) == null ? void 0 : Ce.limit) || C, pages: ((de = qe.meta) == null ? void 0 : de.pages) || 1 }));
      } catch (we) {
        Q && G(we.message || "Failed to load orders");
      } finally {
        Q && ue(!1);
      }
    })(), () => {
      Q = !1;
    };
  }, [h, N, f, C, M, W]);
  const xe = D.useMemo(() => c, [c]);
  return /* @__PURE__ */ d.jsxDEV(oi, { children: /* @__PURE__ */ d.jsxDEV("section", { className: "rider-commissions", children: [
    /* @__PURE__ */ d.jsxDEV("header", { className: "rc-header", children: [
      /* @__PURE__ */ d.jsxDEV("h2", { className: "rc-title", children: "Order Management" }, void 0, !1, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 61,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ d.jsxDEV("p", { className: "rc-subtitle", children: "Manage orders synced from Shopify." }, void 0, !1, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 62,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 60,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV("div", { className: "rc-toolbar", children: [
      /* @__PURE__ */ d.jsxDEV("div", { className: "rc-search", children: [
        /* @__PURE__ */ d.jsxDEV("span", { className: "rc-search-icon", "aria-hidden": "true" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 67,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ d.jsxDEV("input", { className: "rc-search-input", type: "search", placeholder: "Search", value: h, onChange: (Q) => {
          g(Q.target.value), A(1);
        } }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 68,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 66,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ d.jsxDEV("div", { className: "rc-filters", children: [
        ["all", "new", "assigned", "in-transit", "delivered"].map((Q) => /* @__PURE__ */ d.jsxDEV("button", { className: `rc-select rc-chip${N === Q ? " active" : ""}`, onClick: () => {
          R(Q), A(1);
        }, "data-filter": Q, children: Q === "all" ? "All" : Q.replace("-", " ") }, Q, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 72,
          columnNumber: 15
        }, this)),
        /* @__PURE__ */ d.jsxDEV("input", { className: "rc-select rc-chip", type: "date", value: M, onChange: (Q) => {
          z(Q.target.value), A(1);
        } }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 76,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ d.jsxDEV("input", { className: "rc-select rc-chip", type: "date", value: W, onChange: (Q) => {
          fe(Q.target.value), A(1);
        } }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 77,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ d.jsxDEV("select", { className: "rc-select rc-chip", value: C, onChange: (Q) => {
          T(parseInt(Q.target.value, 10)), A(1);
        }, children: [10, 20, 50, 100].map((Q) => /* @__PURE__ */ d.jsxDEV("option", { value: Q, children: [
          Q,
          "/page"
        ] }, Q, !0, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 79,
          columnNumber: 39
        }, this)) }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 78,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 70,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 65,
      columnNumber: 9
    }, this),
    !te && /* @__PURE__ */ d.jsxDEV("div", { className: "section-note", children: "Shopify is not configured. Set SHOPIFY_SHOP and SHOPIFY_ADMIN_TOKEN to enable orders sync." }, void 0, !1, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 85,
      columnNumber: 11
    }, this),
    P && /* @__PURE__ */ d.jsxDEV("div", { className: "auth-error", children: P }, void 0, !1, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 87,
      columnNumber: 25
    }, this),
    /* @__PURE__ */ d.jsxDEV("div", { className: "rc-table-wrapper", children: /* @__PURE__ */ d.jsxDEV("table", { className: "rc-table", children: [
      /* @__PURE__ */ d.jsxDEV("thead", { children: /* @__PURE__ */ d.jsxDEV("tr", { children: [
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-name", children: "Order #" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 93,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-km", children: "Customer" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 94,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-perf", children: "Address" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 95,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-comm", children: "Status" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 96,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-comm", children: "Time Placed" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 97,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-comm", children: "Action" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 98,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 92,
        columnNumber: 15
      }, this) }, void 0, !1, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 91,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ d.jsxDEV("tbody", { children: [
        J && /* @__PURE__ */ d.jsxDEV("tr", { children: /* @__PURE__ */ d.jsxDEV("td", { colSpan: 6, className: "section-note", children: "Loading…" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 103,
          columnNumber: 21
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 103,
          columnNumber: 17
        }, this),
        !J && B && /* @__PURE__ */ d.jsxDEV("tr", { children: /* @__PURE__ */ d.jsxDEV("td", { colSpan: 6, className: "auth-error", children: B }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 106,
          columnNumber: 21
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 106,
          columnNumber: 17
        }, this),
        !J && !B && xe.map((Q, Re) => {
          var Ve, jt;
          const ye = p_(Q), Ce = ((Ve = Q.customer) == null ? void 0 : Ve.first_name) || "", de = ((jt = Q.customer) == null ? void 0 : jt.last_name) || "", we = Q.shipping_address && `${Q.shipping_address.address1 || ""} ${Q.shipping_address.city || ""}${Q.shipping_address.province ? `, ${Q.shipping_address.province}` : ""}${Q.shipping_address.country ? `, ${Q.shipping_address.country}` : ""}` || "-", Ie = ye === "new" ? "Assign" : ye === "assigned" ? "View" : ye === "in-transit" ? "Track" : "Details", qe = Q.name || Q.order_number || Q.id;
          return /* @__PURE__ */ d.jsxDEV("tr", { "data-status": ye, children: [
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-name", children: [
              "#",
              qe
            ] }, void 0, !0, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 117,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-km", children: [
              Ce,
              " ",
              de
            ] }, void 0, !0, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 118,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-perf", children: we }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 119,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-commission", children: /* @__PURE__ */ d.jsxDEV("span", { className: `status-chip status-${ye}`, children: ye.replace("-", " ") }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 120,
              columnNumber: 55
            }, this) }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 120,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-commission", children: Q.created_at ? new Date(Q.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 121,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-commission", children: /* @__PURE__ */ d.jsxDEV("a", { href: "#", className: "order-action", "data-action": Ie.toLowerCase(), children: Ie }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 122,
              columnNumber: 55
            }, this) }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 122,
              columnNumber: 21
            }, this)
          ] }, qe || Re, !0, {
            fileName: "/app/code/client/pages/Orders.jsx",
            lineNumber: 116,
            columnNumber: 19
          }, this);
        }),
        !J && !B && xe.length === 0 && /* @__PURE__ */ d.jsxDEV("tr", { children: /* @__PURE__ */ d.jsxDEV("td", { colSpan: 6, className: "section-note", children: "No orders to display." }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 127,
          columnNumber: 21
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 127,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 101,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 90,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 89,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV("div", { className: "rc-toolbar", "aria-label": "pagination", children: /* @__PURE__ */ d.jsxDEV("div", { className: "rc-filters", children: [
      /* @__PURE__ */ d.jsxDEV("button", { className: "rc-select rc-chip", disabled: _.page <= 1 || J, onClick: () => A((Q) => Math.max(1, Q - 1)), children: "Prev" }, void 0, !1, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 134,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ d.jsxDEV("span", { className: "section-note", children: [
        "Page ",
        _.page,
        " of ",
        _.pages,
        " • ",
        _.total,
        " total"
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 135,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ d.jsxDEV("button", { className: "rc-select rc-chip", disabled: _.page >= _.pages || J, onClick: () => A((Q) => Math.min(_.pages, Q + 1)), children: "Next" }, void 0, !1, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 136,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 133,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 132,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "/app/code/client/pages/Orders.jsx",
    lineNumber: 59,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "/app/code/client/pages/Orders.jsx",
    lineNumber: 58,
    columnNumber: 5
  }, this);
}
function v_() {
  const [c, m] = D.useState({ totalDeliveries: 0, avgDeliveryMins: 0 }), [h, g] = D.useState([]), [N, R] = D.useState(!1), [f, A] = D.useState(!0), [C, T] = D.useState("");
  return D.useEffect(() => {
    let _ = !0;
    return (async () => {
      A(!0), T("");
      try {
        const S = await fetch("/api/reports", { credentials: "include" });
        if (S.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!S.ok) throw new Error("Failed to load reports");
        const M = await S.json();
        _ && (m(M.metrics || { totalDeliveries: 0, avgDeliveryMins: 0 }), g(Array.isArray(M.deliveries) ? M.deliveries : []));
      } catch (S) {
        _ && T(S.message || "Failed to load reports");
      } finally {
        _ && A(!1);
      }
    })(), () => {
      _ = !1;
    };
  }, []), /* @__PURE__ */ d.jsxDEV(oi, { children: /* @__PURE__ */ d.jsxDEV("section", { className: "rider-commissions", children: [
    /* @__PURE__ */ d.jsxDEV("header", { className: "rc-header", children: [
      /* @__PURE__ */ d.jsxDEV("h2", { className: "rc-title", children: "Reporting & Analytics" }, void 0, !1, {
        fileName: "/app/code/client/pages/Reports.jsx",
        lineNumber: 34,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ d.jsxDEV("p", { className: "rc-subtitle", children: "Gain insights into your delivery operations with detailed reports and visualizations." }, void 0, !1, {
        fileName: "/app/code/client/pages/Reports.jsx",
        lineNumber: 35,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Reports.jsx",
      lineNumber: 33,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV("div", { className: "rc-toolbar", children: /* @__PURE__ */ d.jsxDEV("div", { className: "rc-filters", children: [
      /* @__PURE__ */ d.jsxDEV("button", { className: "rc-select rc-chip", "data-tab": "overview", children: "Overview" }, void 0, !1, {
        fileName: "/app/code/client/pages/Reports.jsx",
        lineNumber: 40,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ d.jsxDEV("button", { className: "rc-select rc-chip", "data-tab": "performance", children: "Performance" }, void 0, !1, {
        fileName: "/app/code/client/pages/Reports.jsx",
        lineNumber: 41,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ d.jsxDEV("button", { className: "rc-select rc-chip", "data-tab": "custom", children: "Custom Reports" }, void 0, !1, {
        fileName: "/app/code/client/pages/Reports.jsx",
        lineNumber: 42,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Reports.jsx",
      lineNumber: 39,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/pages/Reports.jsx",
      lineNumber: 38,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV("div", { id: "tab-overview", children: [
      /* @__PURE__ */ d.jsxDEV("div", { className: "rc-table-wrapper reports-overview", children: [
        /* @__PURE__ */ d.jsxDEV("div", { className: "rc-select rc-chip block-chip", children: [
          /* @__PURE__ */ d.jsxDEV("div", { className: "section-title reports-stat-title", children: "Total Deliveries" }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 49,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ d.jsxDEV("div", { className: "reports-stat-value", children: c.totalDeliveries }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 50,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Reports.jsx",
          lineNumber: 48,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ d.jsxDEV("div", { className: "rc-select rc-chip block-chip", children: [
          /* @__PURE__ */ d.jsxDEV("div", { className: "section-title reports-stat-title", children: "Average Delivery Time" }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 53,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ d.jsxDEV("div", { className: "reports-stat-value", children: [
            c.avgDeliveryMins,
            " mins"
          ] }, void 0, !0, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 54,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Reports.jsx",
          lineNumber: 52,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Reports.jsx",
        lineNumber: 47,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ d.jsxDEV("div", { className: "rc-toolbar reports-toolbar-center", children: [
        /* @__PURE__ */ d.jsxDEV("div", { className: "section-title reports-stat-title", children: "Delivery Data" }, void 0, !1, {
          fileName: "/app/code/client/pages/Reports.jsx",
          lineNumber: 59,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ d.jsxDEV("label", { className: "rc-select rc-chip toggle-data-label", children: [
          /* @__PURE__ */ d.jsxDEV("input", { type: "checkbox", checked: N, onChange: (_) => R(_.target.checked) }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 61,
            columnNumber: 15
          }, this),
          " Show Delivery Data Table"
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Reports.jsx",
          lineNumber: 60,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Reports.jsx",
        lineNumber: 58,
        columnNumber: 11
      }, this),
      N && /* @__PURE__ */ d.jsxDEV("div", { className: "rc-table-wrapper", children: /* @__PURE__ */ d.jsxDEV("table", { className: "rc-table", children: [
        /* @__PURE__ */ d.jsxDEV("thead", { children: /* @__PURE__ */ d.jsxDEV("tr", { children: [
          /* @__PURE__ */ d.jsxDEV("th", { className: "col-name", children: "Order Number" }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 70,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ d.jsxDEV("th", { className: "col-km", children: "Rider Assigned" }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 71,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ d.jsxDEV("th", { className: "col-perf", children: "Expected Time" }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 72,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ d.jsxDEV("th", { className: "col-perf", children: "Actual Delivery Time" }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 73,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ d.jsxDEV("th", { className: "col-perf", children: "Distance Traveled" }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 74,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ d.jsxDEV("th", { className: "col-comm", children: "Status" }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 75,
            columnNumber: 21
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Reports.jsx",
          lineNumber: 69,
          columnNumber: 19
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Reports.jsx",
          lineNumber: 68,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ d.jsxDEV("tbody", { children: [
          !f && !C && h.map((_, S) => /* @__PURE__ */ d.jsxDEV("tr", { children: [
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-name", children: [
              "#",
              _.orderNumber || _.orderId
            ] }, void 0, !0, {
              fileName: "/app/code/client/pages/Reports.jsx",
              lineNumber: 81,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-km", children: _.riderId || "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Reports.jsx",
              lineNumber: 82,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-perf", children: _.expectedMinutes != null ? `${_.expectedMinutes} mins` : "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Reports.jsx",
              lineNumber: 83,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-perf", children: _.durationMins != null ? `${_.durationMins} mins` : "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Reports.jsx",
              lineNumber: 84,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-perf", children: "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Reports.jsx",
              lineNumber: 85,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-commission", children: _.status || "new" }, void 0, !1, {
              fileName: "/app/code/client/pages/Reports.jsx",
              lineNumber: 86,
              columnNumber: 23
            }, this)
          ] }, _.orderId || S, !0, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 80,
            columnNumber: 21
          }, this)),
          !f && !C && h.length === 0 && /* @__PURE__ */ d.jsxDEV("tr", { children: /* @__PURE__ */ d.jsxDEV("td", { colSpan: 6, className: "section-note", children: "No data." }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 90,
            columnNumber: 25
          }, this) }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 90,
            columnNumber: 21
          }, this),
          f && /* @__PURE__ */ d.jsxDEV("tr", { children: /* @__PURE__ */ d.jsxDEV("td", { colSpan: 6, className: "section-note", children: "Loading…" }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 93,
            columnNumber: 25
          }, this) }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 93,
            columnNumber: 21
          }, this),
          C && /* @__PURE__ */ d.jsxDEV("tr", { children: /* @__PURE__ */ d.jsxDEV("td", { colSpan: 6, className: "auth-error", children: C }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 96,
            columnNumber: 25
          }, this) }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 96,
            columnNumber: 21
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Reports.jsx",
          lineNumber: 78,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Reports.jsx",
        lineNumber: 67,
        columnNumber: 15
      }, this) }, void 0, !1, {
        fileName: "/app/code/client/pages/Reports.jsx",
        lineNumber: 66,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Reports.jsx",
      lineNumber: 46,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "/app/code/client/pages/Reports.jsx",
    lineNumber: 32,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "/app/code/client/pages/Reports.jsx",
    lineNumber: 31,
    columnNumber: 5
  }, this);
}
function h_({ orderId: c, onClose: m, onAssigned: h }) {
  const [g, N] = D.useState([]), [R, f] = D.useState(!0), [A, C] = D.useState(""), [T, _] = D.useState(null);
  D.useEffect(() => {
    let M = !0;
    return (async () => {
      f(!0), C("");
      try {
        const z = await fetch("/api/riders?limit=200", { credentials: "include" });
        if (z.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!z.ok) throw new Error("Failed to load riders");
        const W = await z.json();
        M && N(Array.isArray(W.riders) ? W.riders : W.riders || []);
      } catch (z) {
        M && C(z.message || "Failed to load riders");
      } finally {
        M && f(!1);
      }
    })(), () => {
      M = !1;
    };
  }, []);
  async function S(M) {
    if (!(!c || !M)) {
      _(M);
      try {
        const z = await fetch(`/api/orders/${encodeURIComponent(c)}/assign`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ riderId: M })
        });
        if (z.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        const W = await z.json().catch(() => null);
        if (!z.ok) throw new Error(W && W.error ? W.error : "Assign failed");
        h && h({ orderId: c, riderId: M }), m();
      } catch (z) {
        alert(z.message || "Failed to assign rider");
      } finally {
        _(null);
      }
    }
  }
  return /* @__PURE__ */ d.jsxDEV("div", { className: "assign-modal-backdrop", role: "dialog", "aria-modal": "true", children: /* @__PURE__ */ d.jsxDEV("div", { className: "assign-modal", children: [
    /* @__PURE__ */ d.jsxDEV("header", { className: "assign-modal-header", children: [
      /* @__PURE__ */ d.jsxDEV("h3", { className: "assign-modal-title", children: "Assign Rider" }, void 0, !1, {
        fileName: "/app/code/client/components/AssignModal.jsx",
        lineNumber: 48,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ d.jsxDEV("button", { className: "assign-modal-close", onClick: m, "aria-label": "Close", children: "✕" }, void 0, !1, {
        fileName: "/app/code/client/components/AssignModal.jsx",
        lineNumber: 49,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/components/AssignModal.jsx",
      lineNumber: 47,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV("div", { className: "assign-modal-body", children: [
      R && /* @__PURE__ */ d.jsxDEV("div", { className: "section-note", children: "Loading riders…" }, void 0, !1, {
        fileName: "/app/code/client/components/AssignModal.jsx",
        lineNumber: 52,
        columnNumber: 23
      }, this),
      A && /* @__PURE__ */ d.jsxDEV("div", { className: "auth-error", children: A }, void 0, !1, {
        fileName: "/app/code/client/components/AssignModal.jsx",
        lineNumber: 53,
        columnNumber: 21
      }, this),
      !R && !A && /* @__PURE__ */ d.jsxDEV("table", { className: "assign-table", children: [
        /* @__PURE__ */ d.jsxDEV("thead", { children: /* @__PURE__ */ d.jsxDEV("tr", { children: [
          /* @__PURE__ */ d.jsxDEV("th", { children: "Name" }, void 0, !1, {
            fileName: "/app/code/client/components/AssignModal.jsx",
            lineNumber: 57,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ d.jsxDEV("th", { children: "Last Active (days)" }, void 0, !1, {
            fileName: "/app/code/client/components/AssignModal.jsx",
            lineNumber: 57,
            columnNumber: 34
          }, this),
          /* @__PURE__ */ d.jsxDEV("th", { children: "Action" }, void 0, !1, {
            fileName: "/app/code/client/components/AssignModal.jsx",
            lineNumber: 57,
            columnNumber: 61
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/components/AssignModal.jsx",
          lineNumber: 57,
          columnNumber: 17
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/components/AssignModal.jsx",
          lineNumber: 56,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ d.jsxDEV("tbody", { children: [
          g.map((M) => /* @__PURE__ */ d.jsxDEV("tr", { children: [
            /* @__PURE__ */ d.jsxDEV("td", { children: M.name }, void 0, !1, {
              fileName: "/app/code/client/components/AssignModal.jsx",
              lineNumber: 62,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { children: M.lastActiveDays ?? "-" }, void 0, !1, {
              fileName: "/app/code/client/components/AssignModal.jsx",
              lineNumber: 63,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { children: /* @__PURE__ */ d.jsxDEV("button", { className: "btn-assign", onClick: () => S(M.id), disabled: T && T !== M.id, children: T === M.id ? "Assigning…" : "Assign" }, void 0, !1, {
              fileName: "/app/code/client/components/AssignModal.jsx",
              lineNumber: 65,
              columnNumber: 23
            }, this) }, void 0, !1, {
              fileName: "/app/code/client/components/AssignModal.jsx",
              lineNumber: 64,
              columnNumber: 21
            }, this)
          ] }, M.id, !0, {
            fileName: "/app/code/client/components/AssignModal.jsx",
            lineNumber: 61,
            columnNumber: 19
          }, this)),
          g.length === 0 && /* @__PURE__ */ d.jsxDEV("tr", { children: /* @__PURE__ */ d.jsxDEV("td", { colSpan: 3, className: "section-note", children: "No riders found." }, void 0, !1, {
            fileName: "/app/code/client/components/AssignModal.jsx",
            lineNumber: 71,
            columnNumber: 46
          }, this) }, void 0, !1, {
            fileName: "/app/code/client/components/AssignModal.jsx",
            lineNumber: 71,
            columnNumber: 42
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/components/AssignModal.jsx",
          lineNumber: 59,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/components/AssignModal.jsx",
        lineNumber: 55,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/components/AssignModal.jsx",
      lineNumber: 51,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "/app/code/client/components/AssignModal.jsx",
    lineNumber: 46,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "/app/code/client/components/AssignModal.jsx",
    lineNumber: 45,
    columnNumber: 5
  }, this);
}
function y_() {
  const [c, m] = D.useState([]), [h, g] = D.useState(!0), [N, R] = D.useState(""), [f, A] = D.useState(1), [C, T] = D.useState(25), [_, S] = D.useState({ total: 0, page: 1, limit: 25, pages: 1 });
  D.useEffect(() => {
    let P = !0;
    return (async () => {
      var X, te, $, xe;
      g(!0), R("");
      try {
        const Q = new URLSearchParams();
        Q.set("limit", String(C)), Q.set("page", String(f));
        const Re = await fetch(`/api/orders?${Q.toString()}`, { credentials: "include" });
        if (Re.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!Re.ok) throw new Error("Failed to load orders");
        const ye = await Re.json();
        P && (m(Array.isArray(ye.orders) ? ye.orders : []), S({ total: ((X = ye.meta) == null ? void 0 : X.total) || 0, page: ((te = ye.meta) == null ? void 0 : te.page) || f, limit: (($ = ye.meta) == null ? void 0 : $.limit) || C, pages: ((xe = ye.meta) == null ? void 0 : xe.pages) || 1 }));
      } catch (Q) {
        P && R(Q.message || "Failed to load orders");
      } finally {
        P && g(!1);
      }
    })(), () => {
      P = !1;
    };
  }, [f]);
  function M(P) {
    return P && P.assignment || (Array.isArray(P.tags) ? P.tags : typeof P.tags == "string" ? P.tags.split(",") : []).join(",").toLowerCase().includes("assigned") ? "assigned" : P.fulfillment_status === "fulfilled" ? "delivered" : P.fulfillment_status === "partial" ? "in-transit" : "new";
  }
  const [z, W] = D.useState(!1), [fe, J] = D.useState(null);
  function ue(P) {
    J(P), W(!0);
  }
  function B() {
    J(null), W(!1);
  }
  function G(P) {
    try {
      const { orderId: X, riderId: te } = P || {};
      if (!X) return;
      m(($) => $.map((xe, Q) => {
        const Re = String(xe.id || xe.name || xe.order_number || Q).replace(/^#+/, "");
        if (String(Re) !== String(X)) return xe;
        const ye = (/* @__PURE__ */ new Date()).toISOString(), Ce = { riderId: String(te), assignedAt: ye, status: "assigned" }, de = Array.isArray(xe.tags) ? xe.tags.slice() : typeof xe.tags == "string" ? xe.tags.split(",").map((we) => we.trim()).filter(Boolean) : [];
        return de.map((we) => we.toLowerCase()).includes("assigned") || de.push("assigned"), { ...xe, assignment: Ce, tags: de, riderId: String(te), assignedAt: ye };
      }));
    } catch {
    }
  }
  return /* @__PURE__ */ d.jsxDEV(oi, { children: /* @__PURE__ */ d.jsxDEV("section", { className: "dashboard-orders", children: [
    /* @__PURE__ */ d.jsxDEV("header", { className: "rc-header dashboard-header", children: [
      /* @__PURE__ */ d.jsxDEV("div", { className: "dashboard-header-left", children: [
        /* @__PURE__ */ d.jsxDEV("h2", { className: "rc-title", children: "Recent Orders" }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 74,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ d.jsxDEV("p", { className: "rc-subtitle", children: "Latest orders synced from Shopify." }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 75,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Dashboard.jsx",
        lineNumber: 73,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ d.jsxDEV("div", { className: "dashboard-header-right", children: [
        /* @__PURE__ */ d.jsxDEV("div", { className: "stat-card", children: [
          /* @__PURE__ */ d.jsxDEV("div", { className: "stat-value", children: h ? "…" : _.total || c.length }, void 0, !1, {
            fileName: "/app/code/client/pages/Dashboard.jsx",
            lineNumber: 79,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ d.jsxDEV("div", { className: "stat-label", children: "Orders" }, void 0, !1, {
            fileName: "/app/code/client/pages/Dashboard.jsx",
            lineNumber: 80,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 78,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ d.jsxDEV("button", { className: "btn-primary", onClick: () => window.location.reload(), children: "Refresh" }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 82,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Dashboard.jsx",
        lineNumber: 77,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Dashboard.jsx",
      lineNumber: 72,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV("div", { className: "rc-table-wrapper", children: /* @__PURE__ */ d.jsxDEV("table", { className: "rc-table dashboard-table", children: [
      /* @__PURE__ */ d.jsxDEV("thead", { children: /* @__PURE__ */ d.jsxDEV("tr", { children: [
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-order", children: "Order #" }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 90,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-customer", children: "Customer" }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 91,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-address", children: "Address" }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 92,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-status", children: "Status" }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 93,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-date", children: "Date" }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 94,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-time", children: "Time" }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 95,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ d.jsxDEV("th", { className: "col-action", children: "Action" }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 96,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Dashboard.jsx",
        lineNumber: 89,
        columnNumber: 15
      }, this) }, void 0, !1, {
        fileName: "/app/code/client/pages/Dashboard.jsx",
        lineNumber: 88,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ d.jsxDEV("tbody", { children: [
        h && /* @__PURE__ */ d.jsxDEV("tr", { children: /* @__PURE__ */ d.jsxDEV("td", { colSpan: 7, className: "section-note", children: "Loading…" }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 100,
          columnNumber: 32
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 100,
          columnNumber: 28
        }, this),
        !h && N && /* @__PURE__ */ d.jsxDEV("tr", { children: /* @__PURE__ */ d.jsxDEV("td", { colSpan: 7, className: "auth-error", children: N }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 101,
          columnNumber: 42
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 101,
          columnNumber: 38
        }, this),
        !h && !N && c.map((P, X) => {
          var Ie, qe;
          const te = M(P), $ = ((Ie = P.customer) == null ? void 0 : Ie.first_name) || "", xe = ((qe = P.customer) == null ? void 0 : qe.last_name) || "", Q = P.shipping_address && `${P.shipping_address.address1 || ""} ${P.shipping_address.city || ""}${P.shipping_address.province ? `, ${P.shipping_address.province}` : ""}${P.shipping_address.country ? `, ${P.shipping_address.country}` : ""}` || "-", Re = P.name || P.order_number || P.id || X, ye = String(P.id || P.name || P.order_number || X).replace(/^#+/, ""), Ce = P.created_at ? new Date(P.created_at) : null, de = Ce ? Ce.toLocaleDateString() : "-", we = Ce ? Ce.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "-";
          return /* @__PURE__ */ d.jsxDEV("tr", { "data-status": te, children: [
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-order", children: Re && String(Re).startsWith("#") ? Re : `#${Re}` }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 114,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-customer", children: [
              $,
              " ",
              xe
            ] }, void 0, !0, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 115,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-address", children: Q }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 116,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-status", children: /* @__PURE__ */ d.jsxDEV("span", { className: `status-chip status-${te}`, children: te.replace("-", " ") }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 117,
              columnNumber: 51
            }, this) }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 117,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-date", children: de }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 118,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-time", children: we }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 119,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ d.jsxDEV("td", { className: "rc-col-action", children: /* @__PURE__ */ d.jsxDEV("button", { className: "order-action btn-manage", onClick: () => ue(ye), children: "Manage" }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 120,
              columnNumber: 51
            }, this) }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 120,
              columnNumber: 21
            }, this)
          ] }, ye, !0, {
            fileName: "/app/code/client/pages/Dashboard.jsx",
            lineNumber: 113,
            columnNumber: 19
          }, this);
        }),
        !h && !N && c.length === 0 && /* @__PURE__ */ d.jsxDEV("tr", { children: /* @__PURE__ */ d.jsxDEV("td", { colSpan: 7, className: "section-note", children: "No recent orders." }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 124,
          columnNumber: 66
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 124,
          columnNumber: 62
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Dashboard.jsx",
        lineNumber: 99,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Dashboard.jsx",
      lineNumber: 87,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/pages/Dashboard.jsx",
      lineNumber: 86,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV("div", { className: "rc-toolbar", "aria-label": "pagination", children: /* @__PURE__ */ d.jsxDEV("div", { className: "rc-filters", children: [
      /* @__PURE__ */ d.jsxDEV("button", { className: "rc-select rc-chip", disabled: _.page <= 1 || h, onClick: () => A((P) => Math.max(1, P - 1)), children: "Prev" }, void 0, !1, {
        fileName: "/app/code/client/pages/Dashboard.jsx",
        lineNumber: 131,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ d.jsxDEV("span", { className: "section-note", children: [
        "Page ",
        _.page,
        " of ",
        _.pages,
        " • ",
        _.total,
        " total"
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Dashboard.jsx",
        lineNumber: 132,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ d.jsxDEV("button", { className: "rc-select rc-chip", disabled: _.page >= _.pages || h, onClick: () => A((P) => Math.min(_.pages, P + 1)), children: "Next" }, void 0, !1, {
        fileName: "/app/code/client/pages/Dashboard.jsx",
        lineNumber: 133,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Dashboard.jsx",
      lineNumber: 130,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/pages/Dashboard.jsx",
      lineNumber: 129,
      columnNumber: 9
    }, this),
    z && fe && /* @__PURE__ */ d.jsxDEV(h_, { orderId: fe, onClose: B, onAssigned: G }, void 0, !1, {
      fileName: "/app/code/client/pages/Dashboard.jsx",
      lineNumber: 138,
      columnNumber: 11
    }, this)
  ] }, void 0, !0, {
    fileName: "/app/code/client/pages/Dashboard.jsx",
    lineNumber: 71,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "/app/code/client/pages/Dashboard.jsx",
    lineNumber: 70,
    columnNumber: 5
  }, this);
}
function g_() {
  return /* @__PURE__ */ d.jsxDEV(Qw, { children: /* @__PURE__ */ d.jsxDEV(Mw, { children: [
    /* @__PURE__ */ d.jsxDEV(jr, { path: "/auth/login", element: /* @__PURE__ */ d.jsxDEV(u_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 15,
      columnNumber: 44
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 15,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV(jr, { path: "/auth/register", element: /* @__PURE__ */ d.jsxDEV(s_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 16,
      columnNumber: 47
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 16,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV(jr, { path: "/riders", element: /* @__PURE__ */ d.jsxDEV(f_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 17,
      columnNumber: 40
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 17,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV(jr, { path: "/riders/:id", element: /* @__PURE__ */ d.jsxDEV(d_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 18,
      columnNumber: 44
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 18,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV(jr, { path: "/orders", element: /* @__PURE__ */ d.jsxDEV(m_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 19,
      columnNumber: 40
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 19,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV(jr, { path: "/reports", element: /* @__PURE__ */ d.jsxDEV(v_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 20,
      columnNumber: 41
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 20,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV(jr, { path: "/dashboard", element: /* @__PURE__ */ d.jsxDEV(y_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 21,
      columnNumber: 43
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 21,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ d.jsxDEV(jr, { path: "*", element: /* @__PURE__ */ d.jsxDEV(Lw, { to: "/auth/login", replace: !0 }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 22,
      columnNumber: 34
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 22,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "/app/code/client/App.jsx",
    lineNumber: 14,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "/app/code/client/App.jsx",
    lineNumber: 13,
    columnNumber: 5
  }, this);
}
function lE() {
  const c = document.getElementById("react-root");
  if (!c) return;
  dE(c).render(/* @__PURE__ */ d.jsxDEV(g_, {}, void 0, !1, {
    fileName: "/app/code/client/main.jsx",
    lineNumber: 9,
    columnNumber: 15
  }, this));
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", lE) : lE();
