function aw(o, f) {
  for (var p = 0; p < f.length; p++) {
    const g = f[p];
    if (typeof g != "string" && !Array.isArray(g)) {
      for (const b in g)
        if (b !== "default" && !(b in o)) {
          const S = Object.getOwnPropertyDescriptor(g, b);
          S && Object.defineProperty(o, b, S.get ? S : {
            enumerable: !0,
            get: () => g[b]
          });
        }
    }
  }
  return Object.freeze(Object.defineProperty(o, Symbol.toStringTag, { value: "Module" }));
}
function rw(o) {
  return o && o.__esModule && Object.prototype.hasOwnProperty.call(o, "default") ? o.default : o;
}
var bx = { exports: {} }, Ah = {}, yx = { exports: {} }, bd = { exports: {} };
bd.exports;
(function(o, f) {
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
    var p = "18.3.1", g = Symbol.for("react.element"), b = Symbol.for("react.portal"), S = Symbol.for("react.fragment"), d = Symbol.for("react.strict_mode"), w = Symbol.for("react.profiler"), R = Symbol.for("react.provider"), j = Symbol.for("react.context"), F = Symbol.for("react.forward_ref"), x = Symbol.for("react.suspense"), T = Symbol.for("react.suspense_list"), L = Symbol.for("react.memo"), te = Symbol.for("react.lazy"), pe = Symbol.for("react.offscreen"), ie = Symbol.iterator, ce = "@@iterator";
    function K(m) {
      if (m === null || typeof m != "object")
        return null;
      var N = ie && m[ie] || m[ce];
      return typeof N == "function" ? N : null;
    }
    var P = {
      /**
       * @internal
       * @type {ReactComponent}
       */
      current: null
    }, I = {
      transition: null
    }, ee = {
      current: null,
      // Used to reproduce behavior of `batchedUpdates` in legacy mode.
      isBatchingLegacy: !1,
      didScheduleLegacyUpdate: !1
    }, z = {
      /**
       * @internal
       * @type {ReactComponent}
       */
      current: null
    }, U = {}, le = null;
    function X(m) {
      le = m;
    }
    U.setExtraStackFrame = function(m) {
      le = m;
    }, U.getCurrentStack = null, U.getStackAddendum = function() {
      var m = "";
      le && (m += le);
      var N = U.getCurrentStack;
      return N && (m += N() || ""), m;
    };
    var W = !1, oe = !1, Q = !1, k = !1, ue = !1, de = {
      ReactCurrentDispatcher: P,
      ReactCurrentBatchConfig: I,
      ReactCurrentOwner: z
    };
    de.ReactDebugCurrentFrame = U, de.ReactCurrentActQueue = ee;
    function Y(m) {
      {
        for (var N = arguments.length, V = new Array(N > 1 ? N - 1 : 0), H = 1; H < N; H++)
          V[H - 1] = arguments[H];
        re("warn", m, V);
      }
    }
    function q(m) {
      {
        for (var N = arguments.length, V = new Array(N > 1 ? N - 1 : 0), H = 1; H < N; H++)
          V[H - 1] = arguments[H];
        re("error", m, V);
      }
    }
    function re(m, N, V) {
      {
        var H = de.ReactDebugCurrentFrame, se = H.getStackAddendum();
        se !== "" && (N += "%s", V = V.concat([se]));
        var _e = V.map(function(Ee) {
          return String(Ee);
        });
        _e.unshift("Warning: " + N), Function.prototype.apply.call(console[m], console, _e);
      }
    }
    var Re = {};
    function Pe(m, N) {
      {
        var V = m.constructor, H = V && (V.displayName || V.name) || "ReactClass", se = H + "." + N;
        if (Re[se])
          return;
        q("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", N, H), Re[se] = !0;
      }
    }
    var et = {
      /**
       * Checks whether or not this composite component is mounted.
       * @param {ReactClass} publicInstance The instance we want to test.
       * @return {boolean} True if mounted, false otherwise.
       * @protected
       * @final
       */
      isMounted: function(m) {
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
      enqueueForceUpdate: function(m, N, V) {
        Pe(m, "forceUpdate");
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
      enqueueReplaceState: function(m, N, V, H) {
        Pe(m, "replaceState");
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
      enqueueSetState: function(m, N, V, H) {
        Pe(m, "setState");
      }
    }, Ve = Object.assign, Ke = {};
    Object.freeze(Ke);
    function at(m, N, V) {
      this.props = m, this.context = N, this.refs = Ke, this.updater = V || et;
    }
    at.prototype.isReactComponent = {}, at.prototype.setState = function(m, N) {
      if (typeof m != "object" && typeof m != "function" && m != null)
        throw new Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
      this.updater.enqueueSetState(this, m, N, "setState");
    }, at.prototype.forceUpdate = function(m) {
      this.updater.enqueueForceUpdate(this, m, "forceUpdate");
    };
    {
      var Ft = {
        isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
        replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
      }, Et = function(m, N) {
        Object.defineProperty(at.prototype, m, {
          get: function() {
            Y("%s(...) is deprecated in plain JavaScript React classes. %s", N[0], N[1]);
          }
        });
      };
      for (var Vt in Ft)
        Ft.hasOwnProperty(Vt) && Et(Vt, Ft[Vt]);
    }
    function An() {
    }
    An.prototype = at.prototype;
    function Gt(m, N, V) {
      this.props = m, this.context = N, this.refs = Ke, this.updater = V || et;
    }
    var Wt = Gt.prototype = new An();
    Wt.constructor = Gt, Ve(Wt, at.prototype), Wt.isPureReactComponent = !0;
    function Z() {
      var m = {
        current: null
      };
      return Object.seal(m), m;
    }
    var Ge = Array.isArray;
    function ut(m) {
      return Ge(m);
    }
    function vt(m) {
      {
        var N = typeof Symbol == "function" && Symbol.toStringTag, V = N && m[Symbol.toStringTag] || m.constructor.name || "Object";
        return V;
      }
    }
    function ht(m) {
      try {
        return ot(m), !1;
      } catch {
        return !0;
      }
    }
    function ot(m) {
      return "" + m;
    }
    function zt(m) {
      if (ht(m))
        return q("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", vt(m)), ot(m);
    }
    function Pt(m, N, V) {
      var H = m.displayName;
      if (H)
        return H;
      var se = N.displayName || N.name || "";
      return se !== "" ? V + "(" + se + ")" : V;
    }
    function Ln(m) {
      return m.displayName || "Context";
    }
    function Dn(m) {
      if (m == null)
        return null;
      if (typeof m.tag == "number" && q("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof m == "function")
        return m.displayName || m.name || null;
      if (typeof m == "string")
        return m;
      switch (m) {
        case S:
          return "Fragment";
        case b:
          return "Portal";
        case w:
          return "Profiler";
        case d:
          return "StrictMode";
        case x:
          return "Suspense";
        case T:
          return "SuspenseList";
      }
      if (typeof m == "object")
        switch (m.$$typeof) {
          case j:
            var N = m;
            return Ln(N) + ".Consumer";
          case R:
            var V = m;
            return Ln(V._context) + ".Provider";
          case F:
            return Pt(m, m.render, "ForwardRef");
          case L:
            var H = m.displayName || null;
            return H !== null ? H : Dn(m.type) || "Memo";
          case te: {
            var se = m, _e = se._payload, Ee = se._init;
            try {
              return Dn(Ee(_e));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var on = Object.prototype.hasOwnProperty, Kt = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, mn, sa, Ht;
    Ht = {};
    function pn(m) {
      if (on.call(m, "ref")) {
        var N = Object.getOwnPropertyDescriptor(m, "ref").get;
        if (N && N.isReactWarning)
          return !1;
      }
      return m.ref !== void 0;
    }
    function hn(m) {
      if (on.call(m, "key")) {
        var N = Object.getOwnPropertyDescriptor(m, "key").get;
        if (N && N.isReactWarning)
          return !1;
      }
      return m.key !== void 0;
    }
    function xa(m, N) {
      var V = function() {
        mn || (mn = !0, q("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", N));
      };
      V.isReactWarning = !0, Object.defineProperty(m, "key", {
        get: V,
        configurable: !0
      });
    }
    function ua(m, N) {
      var V = function() {
        sa || (sa = !0, q("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", N));
      };
      V.isReactWarning = !0, Object.defineProperty(m, "ref", {
        get: V,
        configurable: !0
      });
    }
    function fe(m) {
      if (typeof m.ref == "string" && z.current && m.__self && z.current.stateNode !== m.__self) {
        var N = Dn(z.current.type);
        Ht[N] || (q('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', N, m.ref), Ht[N] = !0);
      }
    }
    var De = function(m, N, V, H, se, _e, Ee) {
      var Ue = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: g,
        // Built-in properties that belong on the element
        type: m,
        key: N,
        ref: V,
        props: Ee,
        // Record the component responsible for creating this element.
        _owner: _e
      };
      return Ue._store = {}, Object.defineProperty(Ue._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(Ue, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: H
      }), Object.defineProperty(Ue, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: se
      }), Object.freeze && (Object.freeze(Ue.props), Object.freeze(Ue)), Ue;
    };
    function $e(m, N, V) {
      var H, se = {}, _e = null, Ee = null, Ue = null, Qe = null;
      if (N != null) {
        pn(N) && (Ee = N.ref, fe(N)), hn(N) && (zt(N.key), _e = "" + N.key), Ue = N.__self === void 0 ? null : N.__self, Qe = N.__source === void 0 ? null : N.__source;
        for (H in N)
          on.call(N, H) && !Kt.hasOwnProperty(H) && (se[H] = N[H]);
      }
      var dt = arguments.length - 2;
      if (dt === 1)
        se.children = V;
      else if (dt > 1) {
        for (var yt = Array(dt), Nt = 0; Nt < dt; Nt++)
          yt[Nt] = arguments[Nt + 2];
        Object.freeze && Object.freeze(yt), se.children = yt;
      }
      if (m && m.defaultProps) {
        var Ye = m.defaultProps;
        for (H in Ye)
          se[H] === void 0 && (se[H] = Ye[H]);
      }
      if (_e || Ee) {
        var Tt = typeof m == "function" ? m.displayName || m.name || "Unknown" : m;
        _e && xa(se, Tt), Ee && ua(se, Tt);
      }
      return De(m, _e, Ee, Ue, Qe, z.current, se);
    }
    function ct(m, N) {
      var V = De(m.type, N, m.ref, m._self, m._source, m._owner, m.props);
      return V;
    }
    function St(m, N, V) {
      if (m == null)
        throw new Error("React.cloneElement(...): The argument must be a React element, but you passed " + m + ".");
      var H, se = Ve({}, m.props), _e = m.key, Ee = m.ref, Ue = m._self, Qe = m._source, dt = m._owner;
      if (N != null) {
        pn(N) && (Ee = N.ref, dt = z.current), hn(N) && (zt(N.key), _e = "" + N.key);
        var yt;
        m.type && m.type.defaultProps && (yt = m.type.defaultProps);
        for (H in N)
          on.call(N, H) && !Kt.hasOwnProperty(H) && (N[H] === void 0 && yt !== void 0 ? se[H] = yt[H] : se[H] = N[H]);
      }
      var Nt = arguments.length - 2;
      if (Nt === 1)
        se.children = V;
      else if (Nt > 1) {
        for (var Ye = Array(Nt), Tt = 0; Tt < Nt; Tt++)
          Ye[Tt] = arguments[Tt + 2];
        se.children = Ye;
      }
      return De(m.type, _e, Ee, Ue, Qe, dt, se);
    }
    function _t(m) {
      return typeof m == "object" && m !== null && m.$$typeof === g;
    }
    var Ot = ".", Cn = ":";
    function At(m) {
      var N = /[=:]/g, V = {
        "=": "=0",
        ":": "=2"
      }, H = m.replace(N, function(se) {
        return V[se];
      });
      return "$" + H;
    }
    var gt = !1, Lt = /\/+/g;
    function Ea(m) {
      return m.replace(Lt, "$&/");
    }
    function Sa(m, N) {
      return typeof m == "object" && m !== null && m.key != null ? (zt(m.key), At("" + m.key)) : N.toString(36);
    }
    function ca(m, N, V, H, se) {
      var _e = typeof m;
      (_e === "undefined" || _e === "boolean") && (m = null);
      var Ee = !1;
      if (m === null)
        Ee = !0;
      else
        switch (_e) {
          case "string":
          case "number":
            Ee = !0;
            break;
          case "object":
            switch (m.$$typeof) {
              case g:
              case b:
                Ee = !0;
            }
        }
      if (Ee) {
        var Ue = m, Qe = se(Ue), dt = H === "" ? Ot + Sa(Ue, 0) : H;
        if (ut(Qe)) {
          var yt = "";
          dt != null && (yt = Ea(dt) + "/"), ca(Qe, N, yt, "", function(wd) {
            return wd;
          });
        } else Qe != null && (_t(Qe) && (Qe.key && (!Ue || Ue.key !== Qe.key) && zt(Qe.key), Qe = ct(
          Qe,
          // Keep both the (mapped) and old keys if they differ, just as
          // traverseAllChildren used to do for objects as children
          V + // $FlowFixMe Flow incorrectly thinks React.Portal doesn't have a key
          (Qe.key && (!Ue || Ue.key !== Qe.key) ? (
            // $FlowFixMe Flow incorrectly thinks existing element's key can be a number
            // eslint-disable-next-line react-internal/safe-string-coercion
            Ea("" + Qe.key) + "/"
          ) : "") + dt
        )), N.push(Qe));
        return 1;
      }
      var Nt, Ye, Tt = 0, $t = H === "" ? Ot : H + Cn;
      if (ut(m))
        for (var xi = 0; xi < m.length; xi++)
          Nt = m[xi], Ye = $t + Sa(Nt, xi), Tt += ca(Nt, N, V, Ye, se);
      else {
        var xo = K(m);
        if (typeof xo == "function") {
          var cr = m;
          xo === cr.entries && (gt || Y("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), gt = !0);
          for (var Eo = xo.call(cr), So, Td = 0; !(So = Eo.next()).done; )
            Nt = So.value, Ye = $t + Sa(Nt, Td++), Tt += ca(Nt, N, V, Ye, se);
        } else if (_e === "object") {
          var vu = String(m);
          throw new Error("Objects are not valid as a React child (found: " + (vu === "[object Object]" ? "object with keys {" + Object.keys(m).join(", ") + "}" : vu) + "). If you meant to render a collection of children, use an array instead.");
        }
      }
      return Tt;
    }
    function or(m, N, V) {
      if (m == null)
        return m;
      var H = [], se = 0;
      return ca(m, H, "", "", function(_e) {
        return N.call(V, _e, se++);
      }), H;
    }
    function io(m) {
      var N = 0;
      return or(m, function() {
        N++;
      }), N;
    }
    function di(m, N, V) {
      or(m, function() {
        N.apply(this, arguments);
      }, V);
    }
    function Zi(m) {
      return or(m, function(N) {
        return N;
      }) || [];
    }
    function el(m) {
      if (!_t(m))
        throw new Error("React.Children.only expected to receive a single React element child.");
      return m;
    }
    function fi(m) {
      var N = {
        $$typeof: j,
        // As a workaround to support multiple concurrent renderers, we categorize
        // some renderers as primary and others as secondary. We only expect
        // there to be two concurrent renderers at most: React Native (primary) and
        // Fabric (secondary); React DOM (primary) and React ART (secondary).
        // Secondary renderers store their context values on separate fields.
        _currentValue: m,
        _currentValue2: m,
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
      N.Provider = {
        $$typeof: R,
        _context: N
      };
      var V = !1, H = !1, se = !1;
      {
        var _e = {
          $$typeof: j,
          _context: N
        };
        Object.defineProperties(_e, {
          Provider: {
            get: function() {
              return H || (H = !0, q("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?")), N.Provider;
            },
            set: function(Ee) {
              N.Provider = Ee;
            }
          },
          _currentValue: {
            get: function() {
              return N._currentValue;
            },
            set: function(Ee) {
              N._currentValue = Ee;
            }
          },
          _currentValue2: {
            get: function() {
              return N._currentValue2;
            },
            set: function(Ee) {
              N._currentValue2 = Ee;
            }
          },
          _threadCount: {
            get: function() {
              return N._threadCount;
            },
            set: function(Ee) {
              N._threadCount = Ee;
            }
          },
          Consumer: {
            get: function() {
              return V || (V = !0, q("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?")), N.Consumer;
            }
          },
          displayName: {
            get: function() {
              return N.displayName;
            },
            set: function(Ee) {
              se || (Y("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.", Ee), se = !0);
            }
          }
        }), N.Consumer = _e;
      }
      return N._currentRenderer = null, N._currentRenderer2 = null, N;
    }
    var Ra = -1, da = 0, Jn = 1, Ia = 2;
    function mi(m) {
      if (m._status === Ra) {
        var N = m._result, V = N();
        if (V.then(function(_e) {
          if (m._status === da || m._status === Ra) {
            var Ee = m;
            Ee._status = Jn, Ee._result = _e;
          }
        }, function(_e) {
          if (m._status === da || m._status === Ra) {
            var Ee = m;
            Ee._status = Ia, Ee._result = _e;
          }
        }), m._status === Ra) {
          var H = m;
          H._status = da, H._result = V;
        }
      }
      if (m._status === Jn) {
        var se = m._result;
        return se === void 0 && q(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))

Did you accidentally put curly braces around the import?`, se), "default" in se || q(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))`, se), se.default;
      } else
        throw m._result;
    }
    function E(m) {
      var N = {
        // We use these fields to store the result.
        _status: Ra,
        _result: m
      }, V = {
        $$typeof: te,
        _payload: N,
        _init: mi
      };
      {
        var H, se;
        Object.defineProperties(V, {
          defaultProps: {
            configurable: !0,
            get: function() {
              return H;
            },
            set: function(_e) {
              q("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), H = _e, Object.defineProperty(V, "defaultProps", {
                enumerable: !0
              });
            }
          },
          propTypes: {
            configurable: !0,
            get: function() {
              return se;
            },
            set: function(_e) {
              q("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), se = _e, Object.defineProperty(V, "propTypes", {
                enumerable: !0
              });
            }
          }
        });
      }
      return V;
    }
    function ne(m) {
      m != null && m.$$typeof === L ? q("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).") : typeof m != "function" ? q("forwardRef requires a render function but was given %s.", m === null ? "null" : typeof m) : m.length !== 0 && m.length !== 2 && q("forwardRef render functions accept exactly two parameters: props and ref. %s", m.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."), m != null && (m.defaultProps != null || m.propTypes != null) && q("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
      var N = {
        $$typeof: F,
        render: m
      };
      {
        var V;
        Object.defineProperty(N, "displayName", {
          enumerable: !1,
          configurable: !0,
          get: function() {
            return V;
          },
          set: function(H) {
            V = H, !m.name && !m.displayName && (m.displayName = H);
          }
        });
      }
      return N;
    }
    var he;
    he = Symbol.for("react.module.reference");
    function Ce(m) {
      return !!(typeof m == "string" || typeof m == "function" || m === S || m === w || ue || m === d || m === x || m === T || k || m === pe || W || oe || Q || typeof m == "object" && m !== null && (m.$$typeof === te || m.$$typeof === L || m.$$typeof === R || m.$$typeof === j || m.$$typeof === F || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      m.$$typeof === he || m.getModuleId !== void 0));
    }
    function We(m, N) {
      Ce(m) || q("memo: The first argument must be a component. Instead received: %s", m === null ? "null" : typeof m);
      var V = {
        $$typeof: L,
        type: m,
        compare: N === void 0 ? null : N
      };
      {
        var H;
        Object.defineProperty(V, "displayName", {
          enumerable: !1,
          configurable: !0,
          get: function() {
            return H;
          },
          set: function(se) {
            H = se, !m.name && !m.displayName && (m.displayName = se);
          }
        });
      }
      return V;
    }
    function Ae() {
      var m = P.current;
      return m === null && q(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`), m;
    }
    function He(m) {
      var N = Ae();
      if (m._context !== void 0) {
        var V = m._context;
        V.Consumer === m ? q("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?") : V.Provider === m && q("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
      }
      return N.useContext(m);
    }
    function Te(m) {
      var N = Ae();
      return N.useState(m);
    }
    function Qt(m, N, V) {
      var H = Ae();
      return H.useReducer(m, N, V);
    }
    function Rt(m) {
      var N = Ae();
      return N.useRef(m);
    }
    function Dt(m, N) {
      var V = Ae();
      return V.useEffect(m, N);
    }
    function jn(m, N) {
      var V = Ae();
      return V.useInsertionEffect(m, N);
    }
    function Ya(m, N) {
      var V = Ae();
      return V.useLayoutEffect(m, N);
    }
    function Da(m, N) {
      var V = Ae();
      return V.useCallback(m, N);
    }
    function Xt(m, N) {
      var V = Ae();
      return V.useMemo(m, N);
    }
    function pi(m, N, V) {
      var H = Ae();
      return H.useImperativeHandle(m, N, V);
    }
    function Ca(m, N) {
      {
        var V = Ae();
        return V.useDebugValue(m, N);
      }
    }
    function Ie() {
      var m = Ae();
      return m.useTransition();
    }
    function hi(m) {
      var N = Ae();
      return N.useDeferredValue(m);
    }
    function iu() {
      var m = Ae();
      return m.useId();
    }
    function lu(m, N, V) {
      var H = Ae();
      return H.useSyncExternalStore(m, N, V);
    }
    var Ar = 0, lo, oo, so, uo, co, ou, su;
    function tl() {
    }
    tl.__reactDisabledLog = !0;
    function fo() {
      {
        if (Ar === 0) {
          lo = console.log, oo = console.info, so = console.warn, uo = console.error, co = console.group, ou = console.groupCollapsed, su = console.groupEnd;
          var m = {
            configurable: !0,
            enumerable: !0,
            value: tl,
            writable: !0
          };
          Object.defineProperties(console, {
            info: m,
            log: m,
            warn: m,
            error: m,
            group: m,
            groupCollapsed: m,
            groupEnd: m
          });
        }
        Ar++;
      }
    }
    function qa() {
      {
        if (Ar--, Ar === 0) {
          var m = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: Ve({}, m, {
              value: lo
            }),
            info: Ve({}, m, {
              value: oo
            }),
            warn: Ve({}, m, {
              value: so
            }),
            error: Ve({}, m, {
              value: uo
            }),
            group: Ve({}, m, {
              value: co
            }),
            groupCollapsed: Ve({}, m, {
              value: ou
            }),
            groupEnd: Ve({}, m, {
              value: su
            })
          });
        }
        Ar < 0 && q("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var vi = de.ReactCurrentDispatcher, Lr;
    function nl(m, N, V) {
      {
        if (Lr === void 0)
          try {
            throw Error();
          } catch (se) {
            var H = se.stack.trim().match(/\n( *(at )?)/);
            Lr = H && H[1] || "";
          }
        return `
` + Lr + m;
      }
    }
    var gi = !1, al;
    {
      var mo = typeof WeakMap == "function" ? WeakMap : Map;
      al = new mo();
    }
    function uu(m, N) {
      if (!m || gi)
        return "";
      {
        var V = al.get(m);
        if (V !== void 0)
          return V;
      }
      var H;
      gi = !0;
      var se = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var _e;
      _e = vi.current, vi.current = null, fo();
      try {
        if (N) {
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
            } catch ($t) {
              H = $t;
            }
            Reflect.construct(m, [], Ee);
          } else {
            try {
              Ee.call();
            } catch ($t) {
              H = $t;
            }
            m.call(Ee.prototype);
          }
        } else {
          try {
            throw Error();
          } catch ($t) {
            H = $t;
          }
          m();
        }
      } catch ($t) {
        if ($t && H && typeof $t.stack == "string") {
          for (var Ue = $t.stack.split(`
`), Qe = H.stack.split(`
`), dt = Ue.length - 1, yt = Qe.length - 1; dt >= 1 && yt >= 0 && Ue[dt] !== Qe[yt]; )
            yt--;
          for (; dt >= 1 && yt >= 0; dt--, yt--)
            if (Ue[dt] !== Qe[yt]) {
              if (dt !== 1 || yt !== 1)
                do
                  if (dt--, yt--, yt < 0 || Ue[dt] !== Qe[yt]) {
                    var Nt = `
` + Ue[dt].replace(" at new ", " at ");
                    return m.displayName && Nt.includes("<anonymous>") && (Nt = Nt.replace("<anonymous>", m.displayName)), typeof m == "function" && al.set(m, Nt), Nt;
                  }
                while (dt >= 1 && yt >= 0);
              break;
            }
        }
      } finally {
        gi = !1, vi.current = _e, qa(), Error.prepareStackTrace = se;
      }
      var Ye = m ? m.displayName || m.name : "", Tt = Ye ? nl(Ye) : "";
      return typeof m == "function" && al.set(m, Tt), Tt;
    }
    function po(m, N, V) {
      return uu(m, !1);
    }
    function Sd(m) {
      var N = m.prototype;
      return !!(N && N.isReactComponent);
    }
    function bi(m, N, V) {
      if (m == null)
        return "";
      if (typeof m == "function")
        return uu(m, Sd(m));
      if (typeof m == "string")
        return nl(m);
      switch (m) {
        case x:
          return nl("Suspense");
        case T:
          return nl("SuspenseList");
      }
      if (typeof m == "object")
        switch (m.$$typeof) {
          case F:
            return po(m.render);
          case L:
            return bi(m.type, N, V);
          case te: {
            var H = m, se = H._payload, _e = H._init;
            try {
              return bi(_e(se), N, V);
            } catch {
            }
          }
        }
      return "";
    }
    var cu = {}, ho = de.ReactDebugCurrentFrame;
    function rt(m) {
      if (m) {
        var N = m._owner, V = bi(m.type, m._source, N ? N.type : null);
        ho.setExtraStackFrame(V);
      } else
        ho.setExtraStackFrame(null);
    }
    function Rd(m, N, V, H, se) {
      {
        var _e = Function.call.bind(on);
        for (var Ee in m)
          if (_e(m, Ee)) {
            var Ue = void 0;
            try {
              if (typeof m[Ee] != "function") {
                var Qe = Error((H || "React class") + ": " + V + " type `" + Ee + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof m[Ee] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw Qe.name = "Invariant Violation", Qe;
              }
              Ue = m[Ee](N, Ee, H, V, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (dt) {
              Ue = dt;
            }
            Ue && !(Ue instanceof Error) && (rt(se), q("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", H || "React class", V, Ee, typeof Ue), rt(null)), Ue instanceof Error && !(Ue.message in cu) && (cu[Ue.message] = !0, rt(se), q("Failed %s type: %s", V, Ue.message), rt(null));
          }
      }
    }
    function sr(m) {
      if (m) {
        var N = m._owner, V = bi(m.type, m._source, N ? N.type : null);
        X(V);
      } else
        X(null);
    }
    var ze;
    ze = !1;
    function vo() {
      if (z.current) {
        var m = Dn(z.current.type);
        if (m)
          return `

Check the render method of \`` + m + "`.";
      }
      return "";
    }
    function kn(m) {
      if (m !== void 0) {
        var N = m.fileName.replace(/^.*[\\\/]/, ""), V = m.lineNumber;
        return `

Check your code at ` + N + ":" + V + ".";
      }
      return "";
    }
    function yi(m) {
      return m != null ? kn(m.__source) : "";
    }
    var kr = {};
    function Dd(m) {
      var N = vo();
      if (!N) {
        var V = typeof m == "string" ? m : m.displayName || m.name;
        V && (N = `

Check the top-level render call using <` + V + ">.");
      }
      return N;
    }
    function sn(m, N) {
      if (!(!m._store || m._store.validated || m.key != null)) {
        m._store.validated = !0;
        var V = Dd(N);
        if (!kr[V]) {
          kr[V] = !0;
          var H = "";
          m && m._owner && m._owner !== z.current && (H = " It was passed a child from " + Dn(m._owner.type) + "."), sr(m), q('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', V, H), sr(null);
        }
      }
    }
    function jt(m, N) {
      if (typeof m == "object") {
        if (ut(m))
          for (var V = 0; V < m.length; V++) {
            var H = m[V];
            _t(H) && sn(H, N);
          }
        else if (_t(m))
          m._store && (m._store.validated = !0);
        else if (m) {
          var se = K(m);
          if (typeof se == "function" && se !== m.entries)
            for (var _e = se.call(m), Ee; !(Ee = _e.next()).done; )
              _t(Ee.value) && sn(Ee.value, N);
        }
      }
    }
    function du(m) {
      {
        var N = m.type;
        if (N == null || typeof N == "string")
          return;
        var V;
        if (typeof N == "function")
          V = N.propTypes;
        else if (typeof N == "object" && (N.$$typeof === F || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        N.$$typeof === L))
          V = N.propTypes;
        else
          return;
        if (V) {
          var H = Dn(N);
          Rd(V, m.props, "prop", H, m);
        } else if (N.PropTypes !== void 0 && !ze) {
          ze = !0;
          var se = Dn(N);
          q("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", se || "Unknown");
        }
        typeof N.getDefaultProps == "function" && !N.getDefaultProps.isReactClassApproved && q("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function fa(m) {
      {
        for (var N = Object.keys(m.props), V = 0; V < N.length; V++) {
          var H = N[V];
          if (H !== "children" && H !== "key") {
            sr(m), q("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", H), sr(null);
            break;
          }
        }
        m.ref !== null && (sr(m), q("Invalid attribute `ref` supplied to `React.Fragment`."), sr(null));
      }
    }
    function Un(m, N, V) {
      var H = Ce(m);
      if (!H) {
        var se = "";
        (m === void 0 || typeof m == "object" && m !== null && Object.keys(m).length === 0) && (se += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
        var _e = yi(N);
        _e ? se += _e : se += vo();
        var Ee;
        m === null ? Ee = "null" : ut(m) ? Ee = "array" : m !== void 0 && m.$$typeof === g ? (Ee = "<" + (Dn(m.type) || "Unknown") + " />", se = " Did you accidentally export a JSX literal instead of a component?") : Ee = typeof m, q("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", Ee, se);
      }
      var Ue = $e.apply(this, arguments);
      if (Ue == null)
        return Ue;
      if (H)
        for (var Qe = 2; Qe < arguments.length; Qe++)
          jt(arguments[Qe], m);
      return m === S ? fa(Ue) : du(Ue), Ue;
    }
    var ja = !1;
    function Cd(m) {
      var N = Un.bind(null, m);
      return N.type = m, ja || (ja = !0, Y("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.")), Object.defineProperty(N, "type", {
        enumerable: !1,
        get: function() {
          return Y("Factory.type is deprecated. Access the class directly before passing it to createFactory."), Object.defineProperty(this, "type", {
            value: m
          }), m;
        }
      }), N;
    }
    function go(m, N, V) {
      for (var H = St.apply(this, arguments), se = 2; se < arguments.length; se++)
        jt(arguments[se], H.type);
      return du(H), H;
    }
    function fu(m, N) {
      var V = I.transition;
      I.transition = {};
      var H = I.transition;
      I.transition._updatedFibers = /* @__PURE__ */ new Set();
      try {
        m();
      } finally {
        if (I.transition = V, V === null && H._updatedFibers) {
          var se = H._updatedFibers.size;
          se > 10 && Y("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), H._updatedFibers.clear();
        }
      }
    }
    var bo = !1, rl = null;
    function jd(m) {
      if (rl === null)
        try {
          var N = ("require" + Math.random()).slice(0, 7), V = o && o[N];
          rl = V.call(o, "timers").setImmediate;
        } catch {
          rl = function(se) {
            bo === !1 && (bo = !0, typeof MessageChannel > "u" && q("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));
            var _e = new MessageChannel();
            _e.port1.onmessage = se, _e.port2.postMessage(void 0);
          };
        }
      return rl(m);
    }
    var Ur = 0, Ni = !1;
    function yo(m) {
      {
        var N = Ur;
        Ur++, ee.current === null && (ee.current = []);
        var V = ee.isBatchingLegacy, H;
        try {
          if (ee.isBatchingLegacy = !0, H = m(), !V && ee.didScheduleLegacyUpdate) {
            var se = ee.current;
            se !== null && (ee.didScheduleLegacyUpdate = !1, ol(se));
          }
        } catch (Ye) {
          throw ur(N), Ye;
        } finally {
          ee.isBatchingLegacy = V;
        }
        if (H !== null && typeof H == "object" && typeof H.then == "function") {
          var _e = H, Ee = !1, Ue = {
            then: function(Ye, Tt) {
              Ee = !0, _e.then(function($t) {
                ur(N), Ur === 0 ? il($t, Ye, Tt) : Ye($t);
              }, function($t) {
                ur(N), Tt($t);
              });
            }
          };
          return !Ni && typeof Promise < "u" && Promise.resolve().then(function() {
          }).then(function() {
            Ee || (Ni = !0, q("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"));
          }), Ue;
        } else {
          var Qe = H;
          if (ur(N), Ur === 0) {
            var dt = ee.current;
            dt !== null && (ol(dt), ee.current = null);
            var yt = {
              then: function(Ye, Tt) {
                ee.current === null ? (ee.current = [], il(Qe, Ye, Tt)) : Ye(Qe);
              }
            };
            return yt;
          } else {
            var Nt = {
              then: function(Ye, Tt) {
                Ye(Qe);
              }
            };
            return Nt;
          }
        }
      }
    }
    function ur(m) {
      m !== Ur - 1 && q("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "), Ur = m;
    }
    function il(m, N, V) {
      {
        var H = ee.current;
        if (H !== null)
          try {
            ol(H), jd(function() {
              H.length === 0 ? (ee.current = null, N(m)) : il(m, N, V);
            });
          } catch (se) {
            V(se);
          }
        else
          N(m);
      }
    }
    var ll = !1;
    function ol(m) {
      if (!ll) {
        ll = !0;
        var N = 0;
        try {
          for (; N < m.length; N++) {
            var V = m[N];
            do
              V = V(!0);
            while (V !== null);
          }
          m.length = 0;
        } catch (H) {
          throw m = m.slice(N + 1), H;
        } finally {
          ll = !1;
        }
      }
    }
    var mu = Un, pu = go, No = Cd, hu = {
      map: or,
      forEach: di,
      count: io,
      toArray: Zi,
      only: el
    };
    f.Children = hu, f.Component = at, f.Fragment = S, f.Profiler = w, f.PureComponent = Gt, f.StrictMode = d, f.Suspense = x, f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = de, f.act = yo, f.cloneElement = pu, f.createContext = fi, f.createElement = mu, f.createFactory = No, f.createRef = Z, f.forwardRef = ne, f.isValidElement = _t, f.lazy = E, f.memo = We, f.startTransition = fu, f.unstable_act = yo, f.useCallback = Da, f.useContext = He, f.useDebugValue = Ca, f.useDeferredValue = hi, f.useEffect = Dt, f.useId = iu, f.useImperativeHandle = pi, f.useInsertionEffect = jn, f.useLayoutEffect = Ya, f.useMemo = Xt, f.useReducer = Qt, f.useRef = Rt, f.useState = Te, f.useSyncExternalStore = lu, f.useTransition = Ie, f.version = p, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  })();
})(bd, bd.exports);
var iw = bd.exports;
yx.exports = iw;
var y = yx.exports;
const Nx = /* @__PURE__ */ rw(y), lw = /* @__PURE__ */ aw({
  __proto__: null,
  default: Nx
}, [y]);
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
  var o = y, f = Symbol.for("react.element"), p = Symbol.for("react.portal"), g = Symbol.for("react.fragment"), b = Symbol.for("react.strict_mode"), S = Symbol.for("react.profiler"), d = Symbol.for("react.provider"), w = Symbol.for("react.context"), R = Symbol.for("react.forward_ref"), j = Symbol.for("react.suspense"), F = Symbol.for("react.suspense_list"), x = Symbol.for("react.memo"), T = Symbol.for("react.lazy"), L = Symbol.for("react.offscreen"), te = Symbol.iterator, pe = "@@iterator";
  function ie(E) {
    if (E === null || typeof E != "object")
      return null;
    var ne = te && E[te] || E[pe];
    return typeof ne == "function" ? ne : null;
  }
  var ce = o.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  function K(E) {
    {
      for (var ne = arguments.length, he = new Array(ne > 1 ? ne - 1 : 0), Ce = 1; Ce < ne; Ce++)
        he[Ce - 1] = arguments[Ce];
      P("error", E, he);
    }
  }
  function P(E, ne, he) {
    {
      var Ce = ce.ReactDebugCurrentFrame, We = Ce.getStackAddendum();
      We !== "" && (ne += "%s", he = he.concat([We]));
      var Ae = he.map(function(He) {
        return String(He);
      });
      Ae.unshift("Warning: " + ne), Function.prototype.apply.call(console[E], console, Ae);
    }
  }
  var I = !1, ee = !1, z = !1, U = !1, le = !1, X;
  X = Symbol.for("react.module.reference");
  function W(E) {
    return !!(typeof E == "string" || typeof E == "function" || E === g || E === S || le || E === b || E === j || E === F || U || E === L || I || ee || z || typeof E == "object" && E !== null && (E.$$typeof === T || E.$$typeof === x || E.$$typeof === d || E.$$typeof === w || E.$$typeof === R || // This needs to include all possible module reference object
    // types supported by any Flight configuration anywhere since
    // we don't know which Flight build this will end up being used
    // with.
    E.$$typeof === X || E.getModuleId !== void 0));
  }
  function oe(E, ne, he) {
    var Ce = E.displayName;
    if (Ce)
      return Ce;
    var We = ne.displayName || ne.name || "";
    return We !== "" ? he + "(" + We + ")" : he;
  }
  function Q(E) {
    return E.displayName || "Context";
  }
  function k(E) {
    if (E == null)
      return null;
    if (typeof E.tag == "number" && K("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof E == "function")
      return E.displayName || E.name || null;
    if (typeof E == "string")
      return E;
    switch (E) {
      case g:
        return "Fragment";
      case p:
        return "Portal";
      case S:
        return "Profiler";
      case b:
        return "StrictMode";
      case j:
        return "Suspense";
      case F:
        return "SuspenseList";
    }
    if (typeof E == "object")
      switch (E.$$typeof) {
        case w:
          var ne = E;
          return Q(ne) + ".Consumer";
        case d:
          var he = E;
          return Q(he._context) + ".Provider";
        case R:
          return oe(E, E.render, "ForwardRef");
        case x:
          var Ce = E.displayName || null;
          return Ce !== null ? Ce : k(E.type) || "Memo";
        case T: {
          var We = E, Ae = We._payload, He = We._init;
          try {
            return k(He(Ae));
          } catch {
            return null;
          }
        }
      }
    return null;
  }
  var ue = Object.assign, de = 0, Y, q, re, Re, Pe, et, Ve;
  function Ke() {
  }
  Ke.__reactDisabledLog = !0;
  function at() {
    {
      if (de === 0) {
        Y = console.log, q = console.info, re = console.warn, Re = console.error, Pe = console.group, et = console.groupCollapsed, Ve = console.groupEnd;
        var E = {
          configurable: !0,
          enumerable: !0,
          value: Ke,
          writable: !0
        };
        Object.defineProperties(console, {
          info: E,
          log: E,
          warn: E,
          error: E,
          group: E,
          groupCollapsed: E,
          groupEnd: E
        });
      }
      de++;
    }
  }
  function Ft() {
    {
      if (de--, de === 0) {
        var E = {
          configurable: !0,
          enumerable: !0,
          writable: !0
        };
        Object.defineProperties(console, {
          log: ue({}, E, {
            value: Y
          }),
          info: ue({}, E, {
            value: q
          }),
          warn: ue({}, E, {
            value: re
          }),
          error: ue({}, E, {
            value: Re
          }),
          group: ue({}, E, {
            value: Pe
          }),
          groupCollapsed: ue({}, E, {
            value: et
          }),
          groupEnd: ue({}, E, {
            value: Ve
          })
        });
      }
      de < 0 && K("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
    }
  }
  var Et = ce.ReactCurrentDispatcher, Vt;
  function An(E, ne, he) {
    {
      if (Vt === void 0)
        try {
          throw Error();
        } catch (We) {
          var Ce = We.stack.trim().match(/\n( *(at )?)/);
          Vt = Ce && Ce[1] || "";
        }
      return `
` + Vt + E;
    }
  }
  var Gt = !1, Wt;
  {
    var Z = typeof WeakMap == "function" ? WeakMap : Map;
    Wt = new Z();
  }
  function Ge(E, ne) {
    if (!E || Gt)
      return "";
    {
      var he = Wt.get(E);
      if (he !== void 0)
        return he;
    }
    var Ce;
    Gt = !0;
    var We = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    var Ae;
    Ae = Et.current, Et.current = null, at();
    try {
      if (ne) {
        var He = function() {
          throw Error();
        };
        if (Object.defineProperty(He.prototype, "props", {
          set: function() {
            throw Error();
          }
        }), typeof Reflect == "object" && Reflect.construct) {
          try {
            Reflect.construct(He, []);
          } catch (Xt) {
            Ce = Xt;
          }
          Reflect.construct(E, [], He);
        } else {
          try {
            He.call();
          } catch (Xt) {
            Ce = Xt;
          }
          E.call(He.prototype);
        }
      } else {
        try {
          throw Error();
        } catch (Xt) {
          Ce = Xt;
        }
        E();
      }
    } catch (Xt) {
      if (Xt && Ce && typeof Xt.stack == "string") {
        for (var Te = Xt.stack.split(`
`), Qt = Ce.stack.split(`
`), Rt = Te.length - 1, Dt = Qt.length - 1; Rt >= 1 && Dt >= 0 && Te[Rt] !== Qt[Dt]; )
          Dt--;
        for (; Rt >= 1 && Dt >= 0; Rt--, Dt--)
          if (Te[Rt] !== Qt[Dt]) {
            if (Rt !== 1 || Dt !== 1)
              do
                if (Rt--, Dt--, Dt < 0 || Te[Rt] !== Qt[Dt]) {
                  var jn = `
` + Te[Rt].replace(" at new ", " at ");
                  return E.displayName && jn.includes("<anonymous>") && (jn = jn.replace("<anonymous>", E.displayName)), typeof E == "function" && Wt.set(E, jn), jn;
                }
              while (Rt >= 1 && Dt >= 0);
            break;
          }
      }
    } finally {
      Gt = !1, Et.current = Ae, Ft(), Error.prepareStackTrace = We;
    }
    var Ya = E ? E.displayName || E.name : "", Da = Ya ? An(Ya) : "";
    return typeof E == "function" && Wt.set(E, Da), Da;
  }
  function ut(E, ne, he) {
    return Ge(E, !1);
  }
  function vt(E) {
    var ne = E.prototype;
    return !!(ne && ne.isReactComponent);
  }
  function ht(E, ne, he) {
    if (E == null)
      return "";
    if (typeof E == "function")
      return Ge(E, vt(E));
    if (typeof E == "string")
      return An(E);
    switch (E) {
      case j:
        return An("Suspense");
      case F:
        return An("SuspenseList");
    }
    if (typeof E == "object")
      switch (E.$$typeof) {
        case R:
          return ut(E.render);
        case x:
          return ht(E.type, ne, he);
        case T: {
          var Ce = E, We = Ce._payload, Ae = Ce._init;
          try {
            return ht(Ae(We), ne, he);
          } catch {
          }
        }
      }
    return "";
  }
  var ot = Object.prototype.hasOwnProperty, zt = {}, Pt = ce.ReactDebugCurrentFrame;
  function Ln(E) {
    if (E) {
      var ne = E._owner, he = ht(E.type, E._source, ne ? ne.type : null);
      Pt.setExtraStackFrame(he);
    } else
      Pt.setExtraStackFrame(null);
  }
  function Dn(E, ne, he, Ce, We) {
    {
      var Ae = Function.call.bind(ot);
      for (var He in E)
        if (Ae(E, He)) {
          var Te = void 0;
          try {
            if (typeof E[He] != "function") {
              var Qt = Error((Ce || "React class") + ": " + he + " type `" + He + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof E[He] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
              throw Qt.name = "Invariant Violation", Qt;
            }
            Te = E[He](ne, He, Ce, he, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
          } catch (Rt) {
            Te = Rt;
          }
          Te && !(Te instanceof Error) && (Ln(We), K("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", Ce || "React class", he, He, typeof Te), Ln(null)), Te instanceof Error && !(Te.message in zt) && (zt[Te.message] = !0, Ln(We), K("Failed %s type: %s", he, Te.message), Ln(null));
        }
    }
  }
  var on = Array.isArray;
  function Kt(E) {
    return on(E);
  }
  function mn(E) {
    {
      var ne = typeof Symbol == "function" && Symbol.toStringTag, he = ne && E[Symbol.toStringTag] || E.constructor.name || "Object";
      return he;
    }
  }
  function sa(E) {
    try {
      return Ht(E), !1;
    } catch {
      return !0;
    }
  }
  function Ht(E) {
    return "" + E;
  }
  function pn(E) {
    if (sa(E))
      return K("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", mn(E)), Ht(E);
  }
  var hn = ce.ReactCurrentOwner, xa = {
    key: !0,
    ref: !0,
    __self: !0,
    __source: !0
  }, ua, fe, De;
  De = {};
  function $e(E) {
    if (ot.call(E, "ref")) {
      var ne = Object.getOwnPropertyDescriptor(E, "ref").get;
      if (ne && ne.isReactWarning)
        return !1;
    }
    return E.ref !== void 0;
  }
  function ct(E) {
    if (ot.call(E, "key")) {
      var ne = Object.getOwnPropertyDescriptor(E, "key").get;
      if (ne && ne.isReactWarning)
        return !1;
    }
    return E.key !== void 0;
  }
  function St(E, ne) {
    if (typeof E.ref == "string" && hn.current && ne && hn.current.stateNode !== ne) {
      var he = k(hn.current.type);
      De[he] || (K('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', k(hn.current.type), E.ref), De[he] = !0);
    }
  }
  function _t(E, ne) {
    {
      var he = function() {
        ua || (ua = !0, K("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", ne));
      };
      he.isReactWarning = !0, Object.defineProperty(E, "key", {
        get: he,
        configurable: !0
      });
    }
  }
  function Ot(E, ne) {
    {
      var he = function() {
        fe || (fe = !0, K("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", ne));
      };
      he.isReactWarning = !0, Object.defineProperty(E, "ref", {
        get: he,
        configurable: !0
      });
    }
  }
  var Cn = function(E, ne, he, Ce, We, Ae, He) {
    var Te = {
      // This tag allows us to uniquely identify this as a React Element
      $$typeof: f,
      // Built-in properties that belong on the element
      type: E,
      key: ne,
      ref: he,
      props: He,
      // Record the component responsible for creating this element.
      _owner: Ae
    };
    return Te._store = {}, Object.defineProperty(Te._store, "validated", {
      configurable: !1,
      enumerable: !1,
      writable: !0,
      value: !1
    }), Object.defineProperty(Te, "_self", {
      configurable: !1,
      enumerable: !1,
      writable: !1,
      value: Ce
    }), Object.defineProperty(Te, "_source", {
      configurable: !1,
      enumerable: !1,
      writable: !1,
      value: We
    }), Object.freeze && (Object.freeze(Te.props), Object.freeze(Te)), Te;
  };
  function At(E, ne, he, Ce, We) {
    {
      var Ae, He = {}, Te = null, Qt = null;
      he !== void 0 && (pn(he), Te = "" + he), ct(ne) && (pn(ne.key), Te = "" + ne.key), $e(ne) && (Qt = ne.ref, St(ne, We));
      for (Ae in ne)
        ot.call(ne, Ae) && !xa.hasOwnProperty(Ae) && (He[Ae] = ne[Ae]);
      if (E && E.defaultProps) {
        var Rt = E.defaultProps;
        for (Ae in Rt)
          He[Ae] === void 0 && (He[Ae] = Rt[Ae]);
      }
      if (Te || Qt) {
        var Dt = typeof E == "function" ? E.displayName || E.name || "Unknown" : E;
        Te && _t(He, Dt), Qt && Ot(He, Dt);
      }
      return Cn(E, Te, Qt, We, Ce, hn.current, He);
    }
  }
  var gt = ce.ReactCurrentOwner, Lt = ce.ReactDebugCurrentFrame;
  function Ea(E) {
    if (E) {
      var ne = E._owner, he = ht(E.type, E._source, ne ? ne.type : null);
      Lt.setExtraStackFrame(he);
    } else
      Lt.setExtraStackFrame(null);
  }
  var Sa;
  Sa = !1;
  function ca(E) {
    return typeof E == "object" && E !== null && E.$$typeof === f;
  }
  function or() {
    {
      if (gt.current) {
        var E = k(gt.current.type);
        if (E)
          return `

Check the render method of \`` + E + "`.";
      }
      return "";
    }
  }
  function io(E) {
    {
      if (E !== void 0) {
        var ne = E.fileName.replace(/^.*[\\\/]/, ""), he = E.lineNumber;
        return `

Check your code at ` + ne + ":" + he + ".";
      }
      return "";
    }
  }
  var di = {};
  function Zi(E) {
    {
      var ne = or();
      if (!ne) {
        var he = typeof E == "string" ? E : E.displayName || E.name;
        he && (ne = `

Check the top-level render call using <` + he + ">.");
      }
      return ne;
    }
  }
  function el(E, ne) {
    {
      if (!E._store || E._store.validated || E.key != null)
        return;
      E._store.validated = !0;
      var he = Zi(ne);
      if (di[he])
        return;
      di[he] = !0;
      var Ce = "";
      E && E._owner && E._owner !== gt.current && (Ce = " It was passed a child from " + k(E._owner.type) + "."), Ea(E), K('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', he, Ce), Ea(null);
    }
  }
  function fi(E, ne) {
    {
      if (typeof E != "object")
        return;
      if (Kt(E))
        for (var he = 0; he < E.length; he++) {
          var Ce = E[he];
          ca(Ce) && el(Ce, ne);
        }
      else if (ca(E))
        E._store && (E._store.validated = !0);
      else if (E) {
        var We = ie(E);
        if (typeof We == "function" && We !== E.entries)
          for (var Ae = We.call(E), He; !(He = Ae.next()).done; )
            ca(He.value) && el(He.value, ne);
      }
    }
  }
  function Ra(E) {
    {
      var ne = E.type;
      if (ne == null || typeof ne == "string")
        return;
      var he;
      if (typeof ne == "function")
        he = ne.propTypes;
      else if (typeof ne == "object" && (ne.$$typeof === R || // Note: Memo only checks outer props here.
      // Inner props are checked in the reconciler.
      ne.$$typeof === x))
        he = ne.propTypes;
      else
        return;
      if (he) {
        var Ce = k(ne);
        Dn(he, E.props, "prop", Ce, E);
      } else if (ne.PropTypes !== void 0 && !Sa) {
        Sa = !0;
        var We = k(ne);
        K("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", We || "Unknown");
      }
      typeof ne.getDefaultProps == "function" && !ne.getDefaultProps.isReactClassApproved && K("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
    }
  }
  function da(E) {
    {
      for (var ne = Object.keys(E.props), he = 0; he < ne.length; he++) {
        var Ce = ne[he];
        if (Ce !== "children" && Ce !== "key") {
          Ea(E), K("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", Ce), Ea(null);
          break;
        }
      }
      E.ref !== null && (Ea(E), K("Invalid attribute `ref` supplied to `React.Fragment`."), Ea(null));
    }
  }
  var Jn = {};
  function Ia(E, ne, he, Ce, We, Ae) {
    {
      var He = W(E);
      if (!He) {
        var Te = "";
        (E === void 0 || typeof E == "object" && E !== null && Object.keys(E).length === 0) && (Te += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
        var Qt = io(We);
        Qt ? Te += Qt : Te += or();
        var Rt;
        E === null ? Rt = "null" : Kt(E) ? Rt = "array" : E !== void 0 && E.$$typeof === f ? (Rt = "<" + (k(E.type) || "Unknown") + " />", Te = " Did you accidentally export a JSX literal instead of a component?") : Rt = typeof E, K("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", Rt, Te);
      }
      var Dt = At(E, ne, he, We, Ae);
      if (Dt == null)
        return Dt;
      if (He) {
        var jn = ne.children;
        if (jn !== void 0)
          if (Ce)
            if (Kt(jn)) {
              for (var Ya = 0; Ya < jn.length; Ya++)
                fi(jn[Ya], E);
              Object.freeze && Object.freeze(jn);
            } else
              K("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
          else
            fi(jn, E);
      }
      if (ot.call(ne, "key")) {
        var Da = k(E), Xt = Object.keys(ne).filter(function(Ie) {
          return Ie !== "key";
        }), pi = Xt.length > 0 ? "{key: someKey, " + Xt.join(": ..., ") + ": ...}" : "{key: someKey}";
        if (!Jn[Da + pi]) {
          var Ca = Xt.length > 0 ? "{" + Xt.join(": ..., ") + ": ...}" : "{}";
          K(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, pi, Da, Ca, Da), Jn[Da + pi] = !0;
        }
      }
      return E === g ? da(Dt) : Ra(Dt), Dt;
    }
  }
  var mi = Ia;
  Ah.Fragment = g, Ah.jsxDEV = mi;
})();
bx.exports = Ah;
var s = bx.exports, xx = { exports: {} }, oa = {}, Ex = { exports: {} }, Sx = {};
(function(o) {
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
    var f = !1, p = 5;
    function g(fe, De) {
      var $e = fe.length;
      fe.push(De), d(fe, De, $e);
    }
    function b(fe) {
      return fe.length === 0 ? null : fe[0];
    }
    function S(fe) {
      if (fe.length === 0)
        return null;
      var De = fe[0], $e = fe.pop();
      return $e !== De && (fe[0] = $e, w(fe, $e, 0)), De;
    }
    function d(fe, De, $e) {
      for (var ct = $e; ct > 0; ) {
        var St = ct - 1 >>> 1, _t = fe[St];
        if (R(_t, De) > 0)
          fe[St] = De, fe[ct] = _t, ct = St;
        else
          return;
      }
    }
    function w(fe, De, $e) {
      for (var ct = $e, St = fe.length, _t = St >>> 1; ct < _t; ) {
        var Ot = (ct + 1) * 2 - 1, Cn = fe[Ot], At = Ot + 1, gt = fe[At];
        if (R(Cn, De) < 0)
          At < St && R(gt, Cn) < 0 ? (fe[ct] = gt, fe[At] = De, ct = At) : (fe[ct] = Cn, fe[Ot] = De, ct = Ot);
        else if (At < St && R(gt, De) < 0)
          fe[ct] = gt, fe[At] = De, ct = At;
        else
          return;
      }
    }
    function R(fe, De) {
      var $e = fe.sortIndex - De.sortIndex;
      return $e !== 0 ? $e : fe.id - De.id;
    }
    var j = 1, F = 2, x = 3, T = 4, L = 5;
    function te(fe, De) {
    }
    var pe = typeof performance == "object" && typeof performance.now == "function";
    if (pe) {
      var ie = performance;
      o.unstable_now = function() {
        return ie.now();
      };
    } else {
      var ce = Date, K = ce.now();
      o.unstable_now = function() {
        return ce.now() - K;
      };
    }
    var P = 1073741823, I = -1, ee = 250, z = 5e3, U = 1e4, le = P, X = [], W = [], oe = 1, Q = null, k = x, ue = !1, de = !1, Y = !1, q = typeof setTimeout == "function" ? setTimeout : null, re = typeof clearTimeout == "function" ? clearTimeout : null, Re = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function Pe(fe) {
      for (var De = b(W); De !== null; ) {
        if (De.callback === null)
          S(W);
        else if (De.startTime <= fe)
          S(W), De.sortIndex = De.expirationTime, g(X, De);
        else
          return;
        De = b(W);
      }
    }
    function et(fe) {
      if (Y = !1, Pe(fe), !de)
        if (b(X) !== null)
          de = !0, Ht(Ve);
        else {
          var De = b(W);
          De !== null && pn(et, De.startTime - fe);
        }
    }
    function Ve(fe, De) {
      de = !1, Y && (Y = !1, hn()), ue = !0;
      var $e = k;
      try {
        var ct;
        if (!f) return Ke(fe, De);
      } finally {
        Q = null, k = $e, ue = !1;
      }
    }
    function Ke(fe, De) {
      var $e = De;
      for (Pe($e), Q = b(X); Q !== null && !(Q.expirationTime > $e && (!fe || Pt())); ) {
        var ct = Q.callback;
        if (typeof ct == "function") {
          Q.callback = null, k = Q.priorityLevel;
          var St = Q.expirationTime <= $e, _t = ct(St);
          $e = o.unstable_now(), typeof _t == "function" ? Q.callback = _t : Q === b(X) && S(X), Pe($e);
        } else
          S(X);
        Q = b(X);
      }
      if (Q !== null)
        return !0;
      var Ot = b(W);
      return Ot !== null && pn(et, Ot.startTime - $e), !1;
    }
    function at(fe, De) {
      switch (fe) {
        case j:
        case F:
        case x:
        case T:
        case L:
          break;
        default:
          fe = x;
      }
      var $e = k;
      k = fe;
      try {
        return De();
      } finally {
        k = $e;
      }
    }
    function Ft(fe) {
      var De;
      switch (k) {
        case j:
        case F:
        case x:
          De = x;
          break;
        default:
          De = k;
          break;
      }
      var $e = k;
      k = De;
      try {
        return fe();
      } finally {
        k = $e;
      }
    }
    function Et(fe) {
      var De = k;
      return function() {
        var $e = k;
        k = De;
        try {
          return fe.apply(this, arguments);
        } finally {
          k = $e;
        }
      };
    }
    function Vt(fe, De, $e) {
      var ct = o.unstable_now(), St;
      if (typeof $e == "object" && $e !== null) {
        var _t = $e.delay;
        typeof _t == "number" && _t > 0 ? St = ct + _t : St = ct;
      } else
        St = ct;
      var Ot;
      switch (fe) {
        case j:
          Ot = I;
          break;
        case F:
          Ot = ee;
          break;
        case L:
          Ot = le;
          break;
        case T:
          Ot = U;
          break;
        case x:
        default:
          Ot = z;
          break;
      }
      var Cn = St + Ot, At = {
        id: oe++,
        callback: De,
        priorityLevel: fe,
        startTime: St,
        expirationTime: Cn,
        sortIndex: -1
      };
      return St > ct ? (At.sortIndex = St, g(W, At), b(X) === null && At === b(W) && (Y ? hn() : Y = !0, pn(et, St - ct))) : (At.sortIndex = Cn, g(X, At), !de && !ue && (de = !0, Ht(Ve))), At;
    }
    function An() {
    }
    function Gt() {
      !de && !ue && (de = !0, Ht(Ve));
    }
    function Wt() {
      return b(X);
    }
    function Z(fe) {
      fe.callback = null;
    }
    function Ge() {
      return k;
    }
    var ut = !1, vt = null, ht = -1, ot = p, zt = -1;
    function Pt() {
      var fe = o.unstable_now() - zt;
      return !(fe < ot);
    }
    function Ln() {
    }
    function Dn(fe) {
      if (fe < 0 || fe > 125) {
        console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported");
        return;
      }
      fe > 0 ? ot = Math.floor(1e3 / fe) : ot = p;
    }
    var on = function() {
      if (vt !== null) {
        var fe = o.unstable_now();
        zt = fe;
        var De = !0, $e = !0;
        try {
          $e = vt(De, fe);
        } finally {
          $e ? Kt() : (ut = !1, vt = null);
        }
      } else
        ut = !1;
    }, Kt;
    if (typeof Re == "function")
      Kt = function() {
        Re(on);
      };
    else if (typeof MessageChannel < "u") {
      var mn = new MessageChannel(), sa = mn.port2;
      mn.port1.onmessage = on, Kt = function() {
        sa.postMessage(null);
      };
    } else
      Kt = function() {
        q(on, 0);
      };
    function Ht(fe) {
      vt = fe, ut || (ut = !0, Kt());
    }
    function pn(fe, De) {
      ht = q(function() {
        fe(o.unstable_now());
      }, De);
    }
    function hn() {
      re(ht), ht = -1;
    }
    var xa = Ln, ua = null;
    o.unstable_IdlePriority = L, o.unstable_ImmediatePriority = j, o.unstable_LowPriority = T, o.unstable_NormalPriority = x, o.unstable_Profiling = ua, o.unstable_UserBlockingPriority = F, o.unstable_cancelCallback = Z, o.unstable_continueExecution = Gt, o.unstable_forceFrameRate = Dn, o.unstable_getCurrentPriorityLevel = Ge, o.unstable_getFirstCallbackNode = Wt, o.unstable_next = Ft, o.unstable_pauseExecution = An, o.unstable_requestPaint = xa, o.unstable_runWithPriority = at, o.unstable_scheduleCallback = Vt, o.unstable_shouldYield = Pt, o.unstable_wrapCallback = Et, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  })();
})(Sx);
Ex.exports = Sx;
var ow = Ex.exports;
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
  var o = y, f = ow, p = o.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, g = !1;
  function b(e) {
    g = e;
  }
  function S(e) {
    if (!g) {
      for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), a = 1; a < t; a++)
        n[a - 1] = arguments[a];
      w("warn", e, n);
    }
  }
  function d(e) {
    if (!g) {
      for (var t = arguments.length, n = new Array(t > 1 ? t - 1 : 0), a = 1; a < t; a++)
        n[a - 1] = arguments[a];
      w("error", e, n);
    }
  }
  function w(e, t, n) {
    {
      var a = p.ReactDebugCurrentFrame, r = a.getStackAddendum();
      r !== "" && (t += "%s", n = n.concat([r]));
      var i = n.map(function(l) {
        return String(l);
      });
      i.unshift("Warning: " + t), Function.prototype.apply.call(console[e], console, i);
    }
  }
  var R = 0, j = 1, F = 2, x = 3, T = 4, L = 5, te = 6, pe = 7, ie = 8, ce = 9, K = 10, P = 11, I = 12, ee = 13, z = 14, U = 15, le = 16, X = 17, W = 18, oe = 19, Q = 21, k = 22, ue = 23, de = 24, Y = 25, q = !0, re = !1, Re = !1, Pe = !1, et = !1, Ve = !0, Ke = !0, at = !0, Ft = !0, Et = /* @__PURE__ */ new Set(), Vt = {}, An = {};
  function Gt(e, t) {
    Wt(e, t), Wt(e + "Capture", t);
  }
  function Wt(e, t) {
    Vt[e] && d("EventRegistry: More than one plugin attempted to publish the same registration name, `%s`.", e), Vt[e] = t;
    {
      var n = e.toLowerCase();
      An[n] = e, e === "onDoubleClick" && (An.ondblclick = e);
    }
    for (var a = 0; a < t.length; a++)
      Et.add(t[a]);
  }
  var Z = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", Ge = Object.prototype.hasOwnProperty;
  function ut(e) {
    {
      var t = typeof Symbol == "function" && Symbol.toStringTag, n = t && e[Symbol.toStringTag] || e.constructor.name || "Object";
      return n;
    }
  }
  function vt(e) {
    try {
      return ht(e), !1;
    } catch {
      return !0;
    }
  }
  function ht(e) {
    return "" + e;
  }
  function ot(e, t) {
    if (vt(e))
      return d("The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before before using it here.", t, ut(e)), ht(e);
  }
  function zt(e) {
    if (vt(e))
      return d("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", ut(e)), ht(e);
  }
  function Pt(e, t) {
    if (vt(e))
      return d("The provided `%s` prop is an unsupported type %s. This value must be coerced to a string before before using it here.", t, ut(e)), ht(e);
  }
  function Ln(e, t) {
    if (vt(e))
      return d("The provided `%s` CSS property is an unsupported type %s. This value must be coerced to a string before before using it here.", t, ut(e)), ht(e);
  }
  function Dn(e) {
    if (vt(e))
      return d("The provided HTML markup uses a value of unsupported type %s. This value must be coerced to a string before before using it here.", ut(e)), ht(e);
  }
  function on(e) {
    if (vt(e))
      return d("Form field values (value, checked, defaultValue, or defaultChecked props) must be strings, not %s. This value must be coerced to a string before before using it here.", ut(e)), ht(e);
  }
  var Kt = 0, mn = 1, sa = 2, Ht = 3, pn = 4, hn = 5, xa = 6, ua = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD", fe = ua + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040", De = new RegExp("^[" + ua + "][" + fe + "]*$"), $e = {}, ct = {};
  function St(e) {
    return Ge.call(ct, e) ? !0 : Ge.call($e, e) ? !1 : De.test(e) ? (ct[e] = !0, !0) : ($e[e] = !0, d("Invalid attribute name: `%s`", e), !1);
  }
  function _t(e, t, n) {
    return t !== null ? t.type === Kt : n ? !1 : e.length > 2 && (e[0] === "o" || e[0] === "O") && (e[1] === "n" || e[1] === "N");
  }
  function Ot(e, t, n, a) {
    if (n !== null && n.type === Kt)
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
  function Cn(e, t, n, a) {
    if (t === null || typeof t > "u" || Ot(e, t, n, a))
      return !0;
    if (a)
      return !1;
    if (n !== null)
      switch (n.type) {
        case Ht:
          return !t;
        case pn:
          return t === !1;
        case hn:
          return isNaN(t);
        case xa:
          return isNaN(t) || t < 1;
      }
    return !1;
  }
  function At(e) {
    return Lt.hasOwnProperty(e) ? Lt[e] : null;
  }
  function gt(e, t, n, a, r, i, l) {
    this.acceptsBooleans = t === sa || t === Ht || t === pn, this.attributeName = a, this.attributeNamespace = r, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = i, this.removeEmptyString = l;
  }
  var Lt = {}, Ea = [
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
  Ea.forEach(function(e) {
    Lt[e] = new gt(
      e,
      Kt,
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
    Lt[t] = new gt(
      t,
      mn,
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
    Lt[e] = new gt(
      e,
      sa,
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
    Lt[e] = new gt(
      e,
      sa,
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
    Lt[e] = new gt(
      e,
      Ht,
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
    Lt[e] = new gt(
      e,
      Ht,
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
    Lt[e] = new gt(
      e,
      pn,
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
    Lt[e] = new gt(
      e,
      xa,
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
    Lt[e] = new gt(
      e,
      hn,
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
  var Sa = /[\-\:]([a-z])/g, ca = function(e) {
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
    var t = e.replace(Sa, ca);
    Lt[t] = new gt(
      t,
      mn,
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
    var t = e.replace(Sa, ca);
    Lt[t] = new gt(
      t,
      mn,
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
    var t = e.replace(Sa, ca);
    Lt[t] = new gt(
      t,
      mn,
      !1,
      // mustUseProperty
      e,
      "http://www.w3.org/XML/1998/namespace",
      !1,
      // sanitizeURL
      !1
    );
  }), ["tabIndex", "crossOrigin"].forEach(function(e) {
    Lt[e] = new gt(
      e,
      mn,
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
  var or = "xlinkHref";
  Lt[or] = new gt(
    "xlinkHref",
    mn,
    !1,
    // mustUseProperty
    "xlink:href",
    "http://www.w3.org/1999/xlink",
    !0,
    // sanitizeURL
    !1
  ), ["src", "href", "action", "formAction"].forEach(function(e) {
    Lt[e] = new gt(
      e,
      mn,
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
  var io = /^[\u0000-\u001F ]*j[\r\n\t]*a[\r\n\t]*v[\r\n\t]*a[\r\n\t]*s[\r\n\t]*c[\r\n\t]*r[\r\n\t]*i[\r\n\t]*p[\r\n\t]*t[\r\n\t]*\:/i, di = !1;
  function Zi(e) {
    !di && io.test(e) && (di = !0, d("A future version of React will block javascript: URLs as a security precaution. Use event handlers instead if you can. If you need to generate unsafe HTML try using dangerouslySetInnerHTML instead. React was passed %s.", JSON.stringify(e)));
  }
  function el(e, t, n, a) {
    if (a.mustUseProperty) {
      var r = a.propertyName;
      return e[r];
    } else {
      ot(n, t), a.sanitizeURL && Zi("" + n);
      var i = a.attributeName, l = null;
      if (a.type === pn) {
        if (e.hasAttribute(i)) {
          var u = e.getAttribute(i);
          return u === "" ? !0 : Cn(t, n, a, !1) ? u : u === "" + n ? n : u;
        }
      } else if (e.hasAttribute(i)) {
        if (Cn(t, n, a, !1))
          return e.getAttribute(i);
        if (a.type === Ht)
          return n;
        l = e.getAttribute(i);
      }
      return Cn(t, n, a, !1) ? l === null ? n : l : l === "" + n ? n : l;
    }
  }
  function fi(e, t, n, a) {
    {
      if (!St(t))
        return;
      if (!e.hasAttribute(t))
        return n === void 0 ? void 0 : null;
      var r = e.getAttribute(t);
      return ot(n, t), r === "" + n ? n : r;
    }
  }
  function Ra(e, t, n, a) {
    var r = At(t);
    if (!_t(t, r, a)) {
      if (Cn(t, n, r, a) && (n = null), a || r === null) {
        if (St(t)) {
          var i = t;
          n === null ? e.removeAttribute(i) : (ot(n, t), e.setAttribute(i, "" + n));
        }
        return;
      }
      var l = r.mustUseProperty;
      if (l) {
        var u = r.propertyName;
        if (n === null) {
          var c = r.type;
          e[u] = c === Ht ? !1 : "";
        } else
          e[u] = n;
        return;
      }
      var h = r.attributeName, v = r.attributeNamespace;
      if (n === null)
        e.removeAttribute(h);
      else {
        var C = r.type, D;
        C === Ht || C === pn && n === !0 ? D = "" : (ot(n, h), D = "" + n, r.sanitizeURL && Zi(D.toString())), v ? e.setAttributeNS(v, h, D) : e.setAttribute(h, D);
      }
    }
  }
  var da = Symbol.for("react.element"), Jn = Symbol.for("react.portal"), Ia = Symbol.for("react.fragment"), mi = Symbol.for("react.strict_mode"), E = Symbol.for("react.profiler"), ne = Symbol.for("react.provider"), he = Symbol.for("react.context"), Ce = Symbol.for("react.forward_ref"), We = Symbol.for("react.suspense"), Ae = Symbol.for("react.suspense_list"), He = Symbol.for("react.memo"), Te = Symbol.for("react.lazy"), Qt = Symbol.for("react.scope"), Rt = Symbol.for("react.debug_trace_mode"), Dt = Symbol.for("react.offscreen"), jn = Symbol.for("react.legacy_hidden"), Ya = Symbol.for("react.cache"), Da = Symbol.for("react.tracing_marker"), Xt = Symbol.iterator, pi = "@@iterator";
  function Ca(e) {
    if (e === null || typeof e != "object")
      return null;
    var t = Xt && e[Xt] || e[pi];
    return typeof t == "function" ? t : null;
  }
  var Ie = Object.assign, hi = 0, iu, lu, Ar, lo, oo, so, uo;
  function co() {
  }
  co.__reactDisabledLog = !0;
  function ou() {
    {
      if (hi === 0) {
        iu = console.log, lu = console.info, Ar = console.warn, lo = console.error, oo = console.group, so = console.groupCollapsed, uo = console.groupEnd;
        var e = {
          configurable: !0,
          enumerable: !0,
          value: co,
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
      hi++;
    }
  }
  function su() {
    {
      if (hi--, hi === 0) {
        var e = {
          configurable: !0,
          enumerable: !0,
          writable: !0
        };
        Object.defineProperties(console, {
          log: Ie({}, e, {
            value: iu
          }),
          info: Ie({}, e, {
            value: lu
          }),
          warn: Ie({}, e, {
            value: Ar
          }),
          error: Ie({}, e, {
            value: lo
          }),
          group: Ie({}, e, {
            value: oo
          }),
          groupCollapsed: Ie({}, e, {
            value: so
          }),
          groupEnd: Ie({}, e, {
            value: uo
          })
        });
      }
      hi < 0 && d("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
    }
  }
  var tl = p.ReactCurrentDispatcher, fo;
  function qa(e, t, n) {
    {
      if (fo === void 0)
        try {
          throw Error();
        } catch (r) {
          var a = r.stack.trim().match(/\n( *(at )?)/);
          fo = a && a[1] || "";
        }
      return `
` + fo + e;
    }
  }
  var vi = !1, Lr;
  {
    var nl = typeof WeakMap == "function" ? WeakMap : Map;
    Lr = new nl();
  }
  function gi(e, t) {
    if (!e || vi)
      return "";
    {
      var n = Lr.get(e);
      if (n !== void 0)
        return n;
    }
    var a;
    vi = !0;
    var r = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    var i;
    i = tl.current, tl.current = null, ou();
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
          } catch (A) {
            a = A;
          }
          Reflect.construct(e, [], l);
        } else {
          try {
            l.call();
          } catch (A) {
            a = A;
          }
          e.call(l.prototype);
        }
      } else {
        try {
          throw Error();
        } catch (A) {
          a = A;
        }
        e();
      }
    } catch (A) {
      if (A && a && typeof A.stack == "string") {
        for (var u = A.stack.split(`
`), c = a.stack.split(`
`), h = u.length - 1, v = c.length - 1; h >= 1 && v >= 0 && u[h] !== c[v]; )
          v--;
        for (; h >= 1 && v >= 0; h--, v--)
          if (u[h] !== c[v]) {
            if (h !== 1 || v !== 1)
              do
                if (h--, v--, v < 0 || u[h] !== c[v]) {
                  var C = `
` + u[h].replace(" at new ", " at ");
                  return e.displayName && C.includes("<anonymous>") && (C = C.replace("<anonymous>", e.displayName)), typeof e == "function" && Lr.set(e, C), C;
                }
              while (h >= 1 && v >= 0);
            break;
          }
      }
    } finally {
      vi = !1, tl.current = i, su(), Error.prepareStackTrace = r;
    }
    var D = e ? e.displayName || e.name : "", M = D ? qa(D) : "";
    return typeof e == "function" && Lr.set(e, M), M;
  }
  function al(e, t, n) {
    return gi(e, !0);
  }
  function mo(e, t, n) {
    return gi(e, !1);
  }
  function uu(e) {
    var t = e.prototype;
    return !!(t && t.isReactComponent);
  }
  function po(e, t, n) {
    if (e == null)
      return "";
    if (typeof e == "function")
      return gi(e, uu(e));
    if (typeof e == "string")
      return qa(e);
    switch (e) {
      case We:
        return qa("Suspense");
      case Ae:
        return qa("SuspenseList");
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case Ce:
          return mo(e.render);
        case He:
          return po(e.type, t, n);
        case Te: {
          var a = e, r = a._payload, i = a._init;
          try {
            return po(i(r), t, n);
          } catch {
          }
        }
      }
    return "";
  }
  function Sd(e) {
    switch (e._debugOwner && e._debugOwner.type, e._debugSource, e.tag) {
      case L:
        return qa(e.type);
      case le:
        return qa("Lazy");
      case ee:
        return qa("Suspense");
      case oe:
        return qa("SuspenseList");
      case R:
      case F:
      case U:
        return mo(e.type);
      case P:
        return mo(e.type.render);
      case j:
        return al(e.type);
      default:
        return "";
    }
  }
  function bi(e) {
    try {
      var t = "", n = e;
      do
        t += Sd(n), n = n.return;
      while (n);
      return t;
    } catch (a) {
      return `
Error generating stack: ` + a.message + `
` + a.stack;
    }
  }
  function cu(e, t, n) {
    var a = e.displayName;
    if (a)
      return a;
    var r = t.displayName || t.name || "";
    return r !== "" ? n + "(" + r + ")" : n;
  }
  function ho(e) {
    return e.displayName || "Context";
  }
  function rt(e) {
    if (e == null)
      return null;
    if (typeof e.tag == "number" && d("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
      return e.displayName || e.name || null;
    if (typeof e == "string")
      return e;
    switch (e) {
      case Ia:
        return "Fragment";
      case Jn:
        return "Portal";
      case E:
        return "Profiler";
      case mi:
        return "StrictMode";
      case We:
        return "Suspense";
      case Ae:
        return "SuspenseList";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case he:
          var t = e;
          return ho(t) + ".Consumer";
        case ne:
          var n = e;
          return ho(n._context) + ".Provider";
        case Ce:
          return cu(e, e.render, "ForwardRef");
        case He:
          var a = e.displayName || null;
          return a !== null ? a : rt(e.type) || "Memo";
        case Te: {
          var r = e, i = r._payload, l = r._init;
          try {
            return rt(l(i));
          } catch {
            return null;
          }
        }
      }
    return null;
  }
  function Rd(e, t, n) {
    var a = t.displayName || t.name || "";
    return e.displayName || (a !== "" ? n + "(" + a + ")" : n);
  }
  function sr(e) {
    return e.displayName || "Context";
  }
  function ze(e) {
    var t = e.tag, n = e.type;
    switch (t) {
      case de:
        return "Cache";
      case ce:
        var a = n;
        return sr(a) + ".Consumer";
      case K:
        var r = n;
        return sr(r._context) + ".Provider";
      case W:
        return "DehydratedFragment";
      case P:
        return Rd(n, n.render, "ForwardRef");
      case pe:
        return "Fragment";
      case L:
        return n;
      case T:
        return "Portal";
      case x:
        return "Root";
      case te:
        return "Text";
      case le:
        return rt(n);
      case ie:
        return n === mi ? "StrictMode" : "Mode";
      case k:
        return "Offscreen";
      case I:
        return "Profiler";
      case Q:
        return "Scope";
      case ee:
        return "Suspense";
      case oe:
        return "SuspenseList";
      case Y:
        return "TracingMarker";
      case j:
      case R:
      case X:
      case F:
      case z:
      case U:
        if (typeof n == "function")
          return n.displayName || n.name || null;
        if (typeof n == "string")
          return n;
        break;
    }
    return null;
  }
  var vo = p.ReactDebugCurrentFrame, kn = null, yi = !1;
  function kr() {
    {
      if (kn === null)
        return null;
      var e = kn._debugOwner;
      if (e !== null && typeof e < "u")
        return ze(e);
    }
    return null;
  }
  function Dd() {
    return kn === null ? "" : bi(kn);
  }
  function sn() {
    vo.getCurrentStack = null, kn = null, yi = !1;
  }
  function jt(e) {
    vo.getCurrentStack = e === null ? null : Dd, kn = e, yi = !1;
  }
  function du() {
    return kn;
  }
  function fa(e) {
    yi = e;
  }
  function Un(e) {
    return "" + e;
  }
  function ja(e) {
    switch (typeof e) {
      case "boolean":
      case "number":
      case "string":
      case "undefined":
        return e;
      case "object":
        return on(e), e;
      default:
        return "";
    }
  }
  var Cd = {
    button: !0,
    checkbox: !0,
    image: !0,
    hidden: !0,
    radio: !0,
    reset: !0,
    submit: !0
  };
  function go(e, t) {
    Cd[t.type] || t.onChange || t.onInput || t.readOnly || t.disabled || t.value == null || d("You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`."), t.onChange || t.readOnly || t.disabled || t.checked == null || d("You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.");
  }
  function fu(e) {
    var t = e.type, n = e.nodeName;
    return n && n.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function bo(e) {
    return e._valueTracker;
  }
  function rl(e) {
    e._valueTracker = null;
  }
  function jd(e) {
    var t = "";
    return e && (fu(e) ? t = e.checked ? "true" : "false" : t = e.value), t;
  }
  function Ur(e) {
    var t = fu(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
    on(e[t]);
    var a = "" + e[t];
    if (!(e.hasOwnProperty(t) || typeof n > "u" || typeof n.get != "function" || typeof n.set != "function")) {
      var r = n.get, i = n.set;
      Object.defineProperty(e, t, {
        configurable: !0,
        get: function() {
          return r.call(this);
        },
        set: function(u) {
          on(u), a = "" + u, i.call(this, u);
        }
      }), Object.defineProperty(e, t, {
        enumerable: n.enumerable
      });
      var l = {
        getValue: function() {
          return a;
        },
        setValue: function(u) {
          on(u), a = "" + u;
        },
        stopTracking: function() {
          rl(e), delete e[t];
        }
      };
      return l;
    }
  }
  function Ni(e) {
    bo(e) || (e._valueTracker = Ur(e));
  }
  function yo(e) {
    if (!e)
      return !1;
    var t = bo(e);
    if (!t)
      return !0;
    var n = t.getValue(), a = jd(e);
    return a !== n ? (t.setValue(a), !0) : !1;
  }
  function ur(e) {
    if (e = e || (typeof document < "u" ? document : void 0), typeof e > "u")
      return null;
    try {
      return e.activeElement || e.body;
    } catch {
      return e.body;
    }
  }
  var il = !1, ll = !1, ol = !1, mu = !1;
  function pu(e) {
    var t = e.type === "checkbox" || e.type === "radio";
    return t ? e.checked != null : e.value != null;
  }
  function No(e, t) {
    var n = e, a = t.checked, r = Ie({}, t, {
      defaultChecked: void 0,
      defaultValue: void 0,
      value: void 0,
      checked: a ?? n._wrapperState.initialChecked
    });
    return r;
  }
  function hu(e, t) {
    go("input", t), t.checked !== void 0 && t.defaultChecked !== void 0 && !ll && (d("%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", kr() || "A component", t.type), ll = !0), t.value !== void 0 && t.defaultValue !== void 0 && !il && (d("%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", kr() || "A component", t.type), il = !0);
    var n = e, a = t.defaultValue == null ? "" : t.defaultValue;
    n._wrapperState = {
      initialChecked: t.checked != null ? t.checked : t.defaultChecked,
      initialValue: ja(t.value != null ? t.value : a),
      controlled: pu(t)
    };
  }
  function m(e, t) {
    var n = e, a = t.checked;
    a != null && Ra(n, "checked", a, !1);
  }
  function N(e, t) {
    var n = e;
    {
      var a = pu(t);
      !n._wrapperState.controlled && a && !mu && (d("A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), mu = !0), n._wrapperState.controlled && !a && !ol && (d("A component is changing a controlled input to be uncontrolled. This is likely caused by the value changing from a defined to undefined, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), ol = !0);
    }
    m(e, t);
    var r = ja(t.value), i = t.type;
    if (r != null)
      i === "number" ? (r === 0 && n.value === "" || // We explicitly want to coerce to number here if possible.
      // eslint-disable-next-line
      n.value != r) && (n.value = Un(r)) : n.value !== Un(r) && (n.value = Un(r));
    else if (i === "submit" || i === "reset") {
      n.removeAttribute("value");
      return;
    }
    t.hasOwnProperty("value") ? _e(n, t.type, r) : t.hasOwnProperty("defaultValue") && _e(n, t.type, ja(t.defaultValue)), t.checked == null && t.defaultChecked != null && (n.defaultChecked = !!t.defaultChecked);
  }
  function V(e, t, n) {
    var a = e;
    if (t.hasOwnProperty("value") || t.hasOwnProperty("defaultValue")) {
      var r = t.type, i = r === "submit" || r === "reset";
      if (i && (t.value === void 0 || t.value === null))
        return;
      var l = Un(a._wrapperState.initialValue);
      n || l !== a.value && (a.value = l), a.defaultValue = l;
    }
    var u = a.name;
    u !== "" && (a.name = ""), a.defaultChecked = !a.defaultChecked, a.defaultChecked = !!a._wrapperState.initialChecked, u !== "" && (a.name = u);
  }
  function H(e, t) {
    var n = e;
    N(n, t), se(n, t);
  }
  function se(e, t) {
    var n = t.name;
    if (t.type === "radio" && n != null) {
      for (var a = e; a.parentNode; )
        a = a.parentNode;
      ot(n, "name");
      for (var r = a.querySelectorAll("input[name=" + JSON.stringify("" + n) + '][type="radio"]'), i = 0; i < r.length; i++) {
        var l = r[i];
        if (!(l === e || l.form !== e.form)) {
          var u = tc(l);
          if (!u)
            throw new Error("ReactDOMInput: Mixing React and non-React radio inputs with the same `name` is not supported.");
          yo(l), N(l, u);
        }
      }
    }
  }
  function _e(e, t, n) {
    // Focused number inputs synchronize on blur. See ChangeEventPlugin.js
    (t !== "number" || ur(e.ownerDocument) !== e) && (n == null ? e.defaultValue = Un(e._wrapperState.initialValue) : e.defaultValue !== Un(n) && (e.defaultValue = Un(n)));
  }
  var Ee = !1, Ue = !1, Qe = !1;
  function dt(e, t) {
    t.value == null && (typeof t.children == "object" && t.children !== null ? o.Children.forEach(t.children, function(n) {
      n != null && (typeof n == "string" || typeof n == "number" || Ue || (Ue = !0, d("Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>.")));
    }) : t.dangerouslySetInnerHTML != null && (Qe || (Qe = !0, d("Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected.")))), t.selected != null && !Ee && (d("Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>."), Ee = !0);
  }
  function yt(e, t) {
    t.value != null && e.setAttribute("value", Un(ja(t.value)));
  }
  var Nt = Array.isArray;
  function Ye(e) {
    return Nt(e);
  }
  var Tt;
  Tt = !1;
  function $t() {
    var e = kr();
    return e ? `

Check the render method of \`` + e + "`." : "";
  }
  var xi = ["value", "defaultValue"];
  function xo(e) {
    {
      go("select", e);
      for (var t = 0; t < xi.length; t++) {
        var n = xi[t];
        if (e[n] != null) {
          var a = Ye(e[n]);
          e.multiple && !a ? d("The `%s` prop supplied to <select> must be an array if `multiple` is true.%s", n, $t()) : !e.multiple && a && d("The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.%s", n, $t());
        }
      }
    }
  }
  function cr(e, t, n, a) {
    var r = e.options;
    if (t) {
      for (var i = n, l = {}, u = 0; u < i.length; u++)
        l["$" + i[u]] = !0;
      for (var c = 0; c < r.length; c++) {
        var h = l.hasOwnProperty("$" + r[c].value);
        r[c].selected !== h && (r[c].selected = h), h && a && (r[c].defaultSelected = !0);
      }
    } else {
      for (var v = Un(ja(n)), C = null, D = 0; D < r.length; D++) {
        if (r[D].value === v) {
          r[D].selected = !0, a && (r[D].defaultSelected = !0);
          return;
        }
        C === null && !r[D].disabled && (C = r[D]);
      }
      C !== null && (C.selected = !0);
    }
  }
  function Eo(e, t) {
    return Ie({}, t, {
      value: void 0
    });
  }
  function So(e, t) {
    var n = e;
    xo(t), n._wrapperState = {
      wasMultiple: !!t.multiple
    }, t.value !== void 0 && t.defaultValue !== void 0 && !Tt && (d("Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://reactjs.org/link/controlled-components"), Tt = !0);
  }
  function Td(e, t) {
    var n = e;
    n.multiple = !!t.multiple;
    var a = t.value;
    a != null ? cr(n, !!t.multiple, a, !1) : t.defaultValue != null && cr(n, !!t.multiple, t.defaultValue, !0);
  }
  function vu(e, t) {
    var n = e, a = n._wrapperState.wasMultiple;
    n._wrapperState.wasMultiple = !!t.multiple;
    var r = t.value;
    r != null ? cr(n, !!t.multiple, r, !1) : a !== !!t.multiple && (t.defaultValue != null ? cr(n, !!t.multiple, t.defaultValue, !0) : cr(n, !!t.multiple, t.multiple ? [] : "", !1));
  }
  function wd(e, t) {
    var n = e, a = t.value;
    a != null && cr(n, !!t.multiple, a, !1);
  }
  var Kh = !1;
  function _d(e, t) {
    var n = e;
    if (t.dangerouslySetInnerHTML != null)
      throw new Error("`dangerouslySetInnerHTML` does not make sense on <textarea>.");
    var a = Ie({}, t, {
      value: void 0,
      defaultValue: void 0,
      children: Un(n._wrapperState.initialValue)
    });
    return a;
  }
  function Qh(e, t) {
    var n = e;
    go("textarea", t), t.value !== void 0 && t.defaultValue !== void 0 && !Kh && (d("%s contains a textarea with both value and defaultValue props. Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://reactjs.org/link/controlled-components", kr() || "A component"), Kh = !0);
    var a = t.value;
    if (a == null) {
      var r = t.children, i = t.defaultValue;
      if (r != null) {
        d("Use the `defaultValue` or `value` props instead of setting children on <textarea>.");
        {
          if (i != null)
            throw new Error("If you supply `defaultValue` on a <textarea>, do not pass children.");
          if (Ye(r)) {
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
      initialValue: ja(a)
    };
  }
  function Xh(e, t) {
    var n = e, a = ja(t.value), r = ja(t.defaultValue);
    if (a != null) {
      var i = Un(a);
      i !== n.value && (n.value = i), t.defaultValue == null && n.defaultValue !== i && (n.defaultValue = i);
    }
    r != null && (n.defaultValue = Un(r));
  }
  function Jh(e, t) {
    var n = e, a = n.textContent;
    a === n._wrapperState.initialValue && a !== "" && a !== null && (n.value = a);
  }
  function Ix(e, t) {
    Xh(e, t);
  }
  var dr = "http://www.w3.org/1999/xhtml", Yx = "http://www.w3.org/1998/Math/MathML", Od = "http://www.w3.org/2000/svg";
  function Md(e) {
    switch (e) {
      case "svg":
        return Od;
      case "math":
        return Yx;
      default:
        return dr;
    }
  }
  function Vd(e, t) {
    return e == null || e === dr ? Md(t) : e === Od && t === "foreignObject" ? dr : e;
  }
  var qx = function(e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, a, r) {
      MSApp.execUnsafeLocalFunction(function() {
        return e(t, n, a, r);
      });
    } : e;
  }, gu, Zh = qx(function(e, t) {
    if (e.namespaceURI === Od && !("innerHTML" in e)) {
      gu = gu || document.createElement("div"), gu.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>";
      for (var n = gu.firstChild; e.firstChild; )
        e.removeChild(e.firstChild);
      for (; n.firstChild; )
        e.appendChild(n.firstChild);
      return;
    }
    e.innerHTML = t;
  }), Yn = 1, fr = 3, It = 8, mr = 9, Ad = 11, bu = function(e, t) {
    if (t) {
      var n = e.firstChild;
      if (n && n === e.lastChild && n.nodeType === fr) {
        n.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }, Gx = {
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
  }, Ro = {
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
  function Wx(e, t) {
    return e + t.charAt(0).toUpperCase() + t.substring(1);
  }
  var Kx = ["Webkit", "ms", "Moz", "O"];
  Object.keys(Ro).forEach(function(e) {
    Kx.forEach(function(t) {
      Ro[Wx(t, e)] = Ro[e];
    });
  });
  function Ld(e, t, n) {
    var a = t == null || typeof t == "boolean" || t === "";
    return a ? "" : !n && typeof t == "number" && t !== 0 && !(Ro.hasOwnProperty(e) && Ro[e]) ? t + "px" : (Ln(t, e), ("" + t).trim());
  }
  var Qx = /([A-Z])/g, Xx = /^ms-/;
  function Jx(e) {
    return e.replace(Qx, "-$1").toLowerCase().replace(Xx, "-ms-");
  }
  var ev = function() {
  };
  {
    var Zx = /^(?:webkit|moz|o)[A-Z]/, eE = /^-ms-/, tE = /-(.)/g, tv = /;\s*$/, sl = {}, kd = {}, nv = !1, av = !1, nE = function(e) {
      return e.replace(tE, function(t, n) {
        return n.toUpperCase();
      });
    }, aE = function(e) {
      sl.hasOwnProperty(e) && sl[e] || (sl[e] = !0, d(
        "Unsupported style property %s. Did you mean %s?",
        e,
        // As Andi Smith suggests
        // (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
        // is converted to lowercase `ms`.
        nE(e.replace(eE, "ms-"))
      ));
    }, rE = function(e) {
      sl.hasOwnProperty(e) && sl[e] || (sl[e] = !0, d("Unsupported vendor-prefixed style property %s. Did you mean %s?", e, e.charAt(0).toUpperCase() + e.slice(1)));
    }, iE = function(e, t) {
      kd.hasOwnProperty(t) && kd[t] || (kd[t] = !0, d(`Style property values shouldn't contain a semicolon. Try "%s: %s" instead.`, e, t.replace(tv, "")));
    }, lE = function(e, t) {
      nv || (nv = !0, d("`NaN` is an invalid value for the `%s` css style property.", e));
    }, oE = function(e, t) {
      av || (av = !0, d("`Infinity` is an invalid value for the `%s` css style property.", e));
    };
    ev = function(e, t) {
      e.indexOf("-") > -1 ? aE(e) : Zx.test(e) ? rE(e) : tv.test(t) && iE(e, t), typeof t == "number" && (isNaN(t) ? lE(e, t) : isFinite(t) || oE(e, t));
    };
  }
  var sE = ev;
  function uE(e) {
    {
      var t = "", n = "";
      for (var a in e)
        if (e.hasOwnProperty(a)) {
          var r = e[a];
          if (r != null) {
            var i = a.indexOf("--") === 0;
            t += n + (i ? a : Jx(a)) + ":", t += Ld(a, r, i), n = ";";
          }
        }
      return t || null;
    }
  }
  function rv(e, t) {
    var n = e.style;
    for (var a in t)
      if (t.hasOwnProperty(a)) {
        var r = a.indexOf("--") === 0;
        r || sE(a, t[a]);
        var i = Ld(a, t[a], r);
        a === "float" && (a = "cssFloat"), r ? n.setProperty(a, i) : n[a] = i;
      }
  }
  function cE(e) {
    return e == null || typeof e == "boolean" || e === "";
  }
  function iv(e) {
    var t = {};
    for (var n in e)
      for (var a = Gx[n] || [n], r = 0; r < a.length; r++)
        t[a[r]] = n;
    return t;
  }
  function dE(e, t) {
    {
      if (!t)
        return;
      var n = iv(e), a = iv(t), r = {};
      for (var i in n) {
        var l = n[i], u = a[i];
        if (u && l !== u) {
          var c = l + "," + u;
          if (r[c])
            continue;
          r[c] = !0, d("%s a style property during rerender (%s) when a conflicting property is set (%s) can lead to styling bugs. To avoid this, don't mix shorthand and non-shorthand properties for the same value; instead, replace the shorthand with separate values.", cE(e[l]) ? "Removing" : "Updating", l, u);
        }
      }
    }
  }
  var fE = {
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
  }, mE = Ie({
    menuitem: !0
  }, fE), pE = "__html";
  function Ud(e, t) {
    if (t) {
      if (mE[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
        throw new Error(e + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
      if (t.dangerouslySetInnerHTML != null) {
        if (t.children != null)
          throw new Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
        if (typeof t.dangerouslySetInnerHTML != "object" || !(pE in t.dangerouslySetInnerHTML))
          throw new Error("`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information.");
      }
      if (!t.suppressContentEditableWarning && t.contentEditable && t.children != null && d("A component is `contentEditable` and contains `children` managed by React. It is now your responsibility to guarantee that none of those nodes are unexpectedly modified or duplicated. This is probably not intentional."), t.style != null && typeof t.style != "object")
        throw new Error("The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX.");
    }
  }
  function Ei(e, t) {
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
  var yu = {
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
  }, lv = {
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
  }, ul = {}, hE = new RegExp("^(aria)-[" + fe + "]*$"), vE = new RegExp("^(aria)[A-Z][" + fe + "]*$");
  function gE(e, t) {
    {
      if (Ge.call(ul, t) && ul[t])
        return !0;
      if (vE.test(t)) {
        var n = "aria-" + t.slice(4).toLowerCase(), a = lv.hasOwnProperty(n) ? n : null;
        if (a == null)
          return d("Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.", t), ul[t] = !0, !0;
        if (t !== a)
          return d("Invalid ARIA attribute `%s`. Did you mean `%s`?", t, a), ul[t] = !0, !0;
      }
      if (hE.test(t)) {
        var r = t.toLowerCase(), i = lv.hasOwnProperty(r) ? r : null;
        if (i == null)
          return ul[t] = !0, !1;
        if (t !== i)
          return d("Unknown ARIA attribute `%s`. Did you mean `%s`?", t, i), ul[t] = !0, !0;
      }
    }
    return !0;
  }
  function bE(e, t) {
    {
      var n = [];
      for (var a in t) {
        var r = gE(e, a);
        r || n.push(a);
      }
      var i = n.map(function(l) {
        return "`" + l + "`";
      }).join(", ");
      n.length === 1 ? d("Invalid aria prop %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", i, e) : n.length > 1 && d("Invalid aria props %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", i, e);
    }
  }
  function yE(e, t) {
    Ei(e, t) || bE(e, t);
  }
  var ov = !1;
  function NE(e, t) {
    {
      if (e !== "input" && e !== "textarea" && e !== "select")
        return;
      t != null && t.value === null && !ov && (ov = !0, e === "select" && t.multiple ? d("`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.", e) : d("`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.", e));
    }
  }
  var sv = function() {
  };
  {
    var Fn = {}, uv = /^on./, xE = /^on[^A-Z]/, EE = new RegExp("^(aria)-[" + fe + "]*$"), SE = new RegExp("^(aria)[A-Z][" + fe + "]*$");
    sv = function(e, t, n, a) {
      if (Ge.call(Fn, t) && Fn[t])
        return !0;
      var r = t.toLowerCase();
      if (r === "onfocusin" || r === "onfocusout")
        return d("React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React."), Fn[t] = !0, !0;
      if (a != null) {
        var i = a.registrationNameDependencies, l = a.possibleRegistrationNames;
        if (i.hasOwnProperty(t))
          return !0;
        var u = l.hasOwnProperty(r) ? l[r] : null;
        if (u != null)
          return d("Invalid event handler property `%s`. Did you mean `%s`?", t, u), Fn[t] = !0, !0;
        if (uv.test(t))
          return d("Unknown event handler property `%s`. It will be ignored.", t), Fn[t] = !0, !0;
      } else if (uv.test(t))
        return xE.test(t) && d("Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.", t), Fn[t] = !0, !0;
      if (EE.test(t) || SE.test(t))
        return !0;
      if (r === "innerhtml")
        return d("Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`."), Fn[t] = !0, !0;
      if (r === "aria")
        return d("The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead."), Fn[t] = !0, !0;
      if (r === "is" && n !== null && n !== void 0 && typeof n != "string")
        return d("Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.", typeof n), Fn[t] = !0, !0;
      if (typeof n == "number" && isNaN(n))
        return d("Received NaN for the `%s` attribute. If this is expected, cast the value to a string.", t), Fn[t] = !0, !0;
      var c = At(t), h = c !== null && c.type === Kt;
      if (yu.hasOwnProperty(r)) {
        var v = yu[r];
        if (v !== t)
          return d("Invalid DOM property `%s`. Did you mean `%s`?", t, v), Fn[t] = !0, !0;
      } else if (!h && t !== r)
        return d("React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.", t, r), Fn[t] = !0, !0;
      return typeof n == "boolean" && Ot(t, n, c, !1) ? (n ? d('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.', n, t, t, n, t) : d('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.', n, t, t, n, t, t, t), Fn[t] = !0, !0) : h ? !0 : Ot(t, n, c, !1) ? (Fn[t] = !0, !1) : ((n === "false" || n === "true") && c !== null && c.type === Ht && (d("Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?", n, t, n === "false" ? "The browser will interpret it as a truthy value." : 'Although this works, it will not work as expected if you pass the string "false".', t, n), Fn[t] = !0), !0);
    };
  }
  var RE = function(e, t, n) {
    {
      var a = [];
      for (var r in t) {
        var i = sv(e, r, t[r], n);
        i || a.push(r);
      }
      var l = a.map(function(u) {
        return "`" + u + "`";
      }).join(", ");
      a.length === 1 ? d("Invalid value for prop %s on <%s> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", l, e) : a.length > 1 && d("Invalid values for props %s on <%s> tag. Either remove them from the element, or pass a string or number value to keep them in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", l, e);
    }
  };
  function DE(e, t, n) {
    Ei(e, t) || RE(e, t, n);
  }
  var cv = 1, Fd = 2, Do = 4, CE = cv | Fd | Do, Co = null;
  function jE(e) {
    Co !== null && d("Expected currently replaying event to be null. This error is likely caused by a bug in React. Please file an issue."), Co = e;
  }
  function TE() {
    Co === null && d("Expected currently replaying event to not be null. This error is likely caused by a bug in React. Please file an issue."), Co = null;
  }
  function wE(e) {
    return e === Co;
  }
  function zd(e) {
    var t = e.target || e.srcElement || window;
    return t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === fr ? t.parentNode : t;
  }
  var Pd = null, cl = null, dl = null;
  function dv(e) {
    var t = qr(e);
    if (t) {
      if (typeof Pd != "function")
        throw new Error("setRestoreImplementation() needs to be called to handle a target for controlled events. This error is likely caused by a bug in React. Please file an issue.");
      var n = t.stateNode;
      if (n) {
        var a = tc(n);
        Pd(t.stateNode, t.type, a);
      }
    }
  }
  function _E(e) {
    Pd = e;
  }
  function fv(e) {
    cl ? dl ? dl.push(e) : dl = [e] : cl = e;
  }
  function OE() {
    return cl !== null || dl !== null;
  }
  function mv() {
    if (cl) {
      var e = cl, t = dl;
      if (cl = null, dl = null, dv(e), t)
        for (var n = 0; n < t.length; n++)
          dv(t[n]);
    }
  }
  var pv = function(e, t) {
    return e(t);
  }, hv = function() {
  }, Hd = !1;
  function ME() {
    var e = OE();
    e && (hv(), mv());
  }
  function vv(e, t, n) {
    if (Hd)
      return e(t, n);
    Hd = !0;
    try {
      return pv(e, t, n);
    } finally {
      Hd = !1, ME();
    }
  }
  function VE(e, t, n) {
    pv = e, hv = n;
  }
  function AE(e) {
    return e === "button" || e === "input" || e === "select" || e === "textarea";
  }
  function LE(e, t, n) {
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
        return !!(n.disabled && AE(t));
      default:
        return !1;
    }
  }
  function jo(e, t) {
    var n = e.stateNode;
    if (n === null)
      return null;
    var a = tc(n);
    if (a === null)
      return null;
    var r = a[t];
    if (LE(t, e.type, a))
      return null;
    if (r && typeof r != "function")
      throw new Error("Expected `" + t + "` listener to be a function, instead got a value of `" + typeof r + "` type.");
    return r;
  }
  var Bd = !1;
  if (Z)
    try {
      var To = {};
      Object.defineProperty(To, "passive", {
        get: function() {
          Bd = !0;
        }
      }), window.addEventListener("test", To, To), window.removeEventListener("test", To, To);
    } catch {
      Bd = !1;
    }
  function gv(e, t, n, a, r, i, l, u, c) {
    var h = Array.prototype.slice.call(arguments, 3);
    try {
      t.apply(n, h);
    } catch (v) {
      this.onError(v);
    }
  }
  var bv = gv;
  if (typeof window < "u" && typeof window.dispatchEvent == "function" && typeof document < "u" && typeof document.createEvent == "function") {
    var $d = document.createElement("react");
    bv = function(t, n, a, r, i, l, u, c, h) {
      if (typeof document > "u" || document === null)
        throw new Error("The `document` global was defined when React was initialized, but is not defined anymore. This can happen in a test environment if a component schedules an update from an asynchronous callback, but the test has already finished running. To solve this, you can either unmount the component at the end of your test (and ensure that any asynchronous operations get canceled in `componentWillUnmount`), or you can change the test itself to be asynchronous.");
      var v = document.createEvent("Event"), C = !1, D = !0, M = window.event, A = Object.getOwnPropertyDescriptor(window, "event");
      function B() {
        $d.removeEventListener($, je, !1), typeof window.event < "u" && window.hasOwnProperty("event") && (window.event = M);
      }
      var ve = Array.prototype.slice.call(arguments, 3);
      function je() {
        C = !0, B(), n.apply(a, ve), D = !1;
      }
      var Se, Ze = !1, qe = !1;
      function _(O) {
        if (Se = O.error, Ze = !0, Se === null && O.colno === 0 && O.lineno === 0 && (qe = !0), O.defaultPrevented && Se != null && typeof Se == "object")
          try {
            Se._suppressLogging = !0;
          } catch {
          }
      }
      var $ = "react-" + (t || "invokeguardedcallback");
      if (window.addEventListener("error", _), $d.addEventListener($, je, !1), v.initEvent($, !1, !1), $d.dispatchEvent(v), A && Object.defineProperty(window, "event", A), C && D && (Ze ? qe && (Se = new Error("A cross-origin error was thrown. React doesn't have access to the actual error object in development. See https://reactjs.org/link/crossorigin-error for more information.")) : Se = new Error(`An error was thrown inside one of your components, but React doesn't know what it was. This is likely due to browser flakiness. React does its best to preserve the "Pause on exceptions" behavior of the DevTools, which requires some DEV-mode only tricks. It's possible that these don't work in your browser. Try triggering the error in production mode, or switching to a modern browser. If you suspect that this is actually an issue with React, please file an issue.`), this.onError(Se)), window.removeEventListener("error", _), !C)
        return B(), gv.apply(this, arguments);
    };
  }
  var kE = bv, fl = !1, Nu = null, xu = !1, Id = null, UE = {
    onError: function(e) {
      fl = !0, Nu = e;
    }
  };
  function Yd(e, t, n, a, r, i, l, u, c) {
    fl = !1, Nu = null, kE.apply(UE, arguments);
  }
  function FE(e, t, n, a, r, i, l, u, c) {
    if (Yd.apply(this, arguments), fl) {
      var h = qd();
      xu || (xu = !0, Id = h);
    }
  }
  function zE() {
    if (xu) {
      var e = Id;
      throw xu = !1, Id = null, e;
    }
  }
  function PE() {
    return fl;
  }
  function qd() {
    if (fl) {
      var e = Nu;
      return fl = !1, Nu = null, e;
    } else
      throw new Error("clearCaughtError was called but no error was captured. This error is likely caused by a bug in React. Please file an issue.");
  }
  function ml(e) {
    return e._reactInternals;
  }
  function HE(e) {
    return e._reactInternals !== void 0;
  }
  function BE(e, t) {
    e._reactInternals = t;
  }
  var Oe = (
    /*                      */
    0
  ), pl = (
    /*                */
    1
  ), Yt = (
    /*                    */
    2
  ), it = (
    /*                       */
    4
  ), Si = (
    /*                */
    16
  ), wo = (
    /*                 */
    32
  ), yv = (
    /*                     */
    64
  ), lt = (
    /*                   */
    128
  ), pr = (
    /*            */
    256
  ), Ri = (
    /*                          */
    512
  ), hl = (
    /*                     */
    1024
  ), Fr = (
    /*                      */
    2048
  ), hr = (
    /*                    */
    4096
  ), Di = (
    /*                   */
    8192
  ), Gd = (
    /*             */
    16384
  ), $E = (
    /*               */
    32767
  ), Eu = (
    /*                   */
    32768
  ), zn = (
    /*                */
    65536
  ), Wd = (
    /* */
    131072
  ), Nv = (
    /*                       */
    1048576
  ), Kd = (
    /*                    */
    2097152
  ), Ci = (
    /*                 */
    4194304
  ), Qd = (
    /*                */
    8388608
  ), zr = (
    /*               */
    16777216
  ), Xd = (
    /*              */
    33554432
  ), Jd = (
    // TODO: Remove Update flag from before mutation phase by re-landing Visibility
    // flag logic (see #20043)
    it | hl | 0
  ), Zd = Yt | it | Si | wo | Ri | hr | Di, _o = it | yv | Ri | Di, vl = Fr | Si, vr = Ci | Qd | Kd, IE = p.ReactCurrentOwner;
  function ji(e) {
    var t = e, n = e;
    if (e.alternate)
      for (; t.return; )
        t = t.return;
    else {
      var a = t;
      do
        t = a, (t.flags & (Yt | hr)) !== Oe && (n = t.return), a = t.return;
      while (a);
    }
    return t.tag === x ? n : null;
  }
  function xv(e) {
    if (e.tag === ee) {
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
  function Ev(e) {
    return e.tag === x ? e.stateNode.containerInfo : null;
  }
  function YE(e) {
    return ji(e) === e;
  }
  function qE(e) {
    {
      var t = IE.current;
      if (t !== null && t.tag === j) {
        var n = t, a = n.stateNode;
        a._warnedAboutRefsInRender || d("%s is accessing isMounted inside its render() function. render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", ze(n) || "A component"), a._warnedAboutRefsInRender = !0;
      }
    }
    var r = ml(e);
    return r ? ji(r) === r : !1;
  }
  function Sv(e) {
    if (ji(e) !== e)
      throw new Error("Unable to find node on an unmounted component.");
  }
  function Rv(e) {
    var t = e.alternate;
    if (!t) {
      var n = ji(e);
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
        var u = i.return;
        if (u !== null) {
          a = r = u;
          continue;
        }
        break;
      }
      if (i.child === l.child) {
        for (var c = i.child; c; ) {
          if (c === a)
            return Sv(i), e;
          if (c === r)
            return Sv(i), t;
          c = c.sibling;
        }
        throw new Error("Unable to find node on an unmounted component.");
      }
      if (a.return !== r.return)
        a = i, r = l;
      else {
        for (var h = !1, v = i.child; v; ) {
          if (v === a) {
            h = !0, a = i, r = l;
            break;
          }
          if (v === r) {
            h = !0, r = i, a = l;
            break;
          }
          v = v.sibling;
        }
        if (!h) {
          for (v = l.child; v; ) {
            if (v === a) {
              h = !0, a = l, r = i;
              break;
            }
            if (v === r) {
              h = !0, r = l, a = i;
              break;
            }
            v = v.sibling;
          }
          if (!h)
            throw new Error("Child was not found in either parent set. This indicates a bug in React related to the return pointer. Please file an issue.");
        }
      }
      if (a.alternate !== r)
        throw new Error("Return fibers should always be each others' alternates. This error is likely caused by a bug in React. Please file an issue.");
    }
    if (a.tag !== x)
      throw new Error("Unable to find node on an unmounted component.");
    return a.stateNode.current === a ? e : t;
  }
  function Dv(e) {
    var t = Rv(e);
    return t !== null ? Cv(t) : null;
  }
  function Cv(e) {
    if (e.tag === L || e.tag === te)
      return e;
    for (var t = e.child; t !== null; ) {
      var n = Cv(t);
      if (n !== null)
        return n;
      t = t.sibling;
    }
    return null;
  }
  function GE(e) {
    var t = Rv(e);
    return t !== null ? jv(t) : null;
  }
  function jv(e) {
    if (e.tag === L || e.tag === te)
      return e;
    for (var t = e.child; t !== null; ) {
      if (t.tag !== T) {
        var n = jv(t);
        if (n !== null)
          return n;
      }
      t = t.sibling;
    }
    return null;
  }
  var Tv = f.unstable_scheduleCallback, WE = f.unstable_cancelCallback, KE = f.unstable_shouldYield, QE = f.unstable_requestPaint, un = f.unstable_now, XE = f.unstable_getCurrentPriorityLevel, Su = f.unstable_ImmediatePriority, ef = f.unstable_UserBlockingPriority, Ti = f.unstable_NormalPriority, JE = f.unstable_LowPriority, tf = f.unstable_IdlePriority, ZE = f.unstable_yieldValue, eS = f.unstable_setDisableYieldValue, gl = null, Tn = null, be = null, Ga = !1, Ta = typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u";
  function tS(e) {
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u")
      return !1;
    var t = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (t.isDisabled)
      return !0;
    if (!t.supportsFiber)
      return d("The installed version of React DevTools is too old and will not work with the current version of React. Please update React DevTools. https://reactjs.org/link/react-devtools"), !0;
    try {
      Ke && (e = Ie({}, e, {
        getLaneLabelMap: oS,
        injectProfilingHooks: lS
      })), gl = t.inject(e), Tn = t;
    } catch (n) {
      d("React instrumentation encountered an error: %s.", n);
    }
    return !!t.checkDCE;
  }
  function nS(e, t) {
    if (Tn && typeof Tn.onScheduleFiberRoot == "function")
      try {
        Tn.onScheduleFiberRoot(gl, e, t);
      } catch (n) {
        Ga || (Ga = !0, d("React instrumentation encountered an error: %s", n));
      }
  }
  function aS(e, t) {
    if (Tn && typeof Tn.onCommitFiberRoot == "function")
      try {
        var n = (e.current.flags & lt) === lt;
        if (at) {
          var a;
          switch (t) {
            case ta:
              a = Su;
              break;
            case br:
              a = ef;
              break;
            case yr:
              a = Ti;
              break;
            case _u:
              a = tf;
              break;
            default:
              a = Ti;
              break;
          }
          Tn.onCommitFiberRoot(gl, e, a, n);
        }
      } catch (r) {
        Ga || (Ga = !0, d("React instrumentation encountered an error: %s", r));
      }
  }
  function rS(e) {
    if (Tn && typeof Tn.onPostCommitFiberRoot == "function")
      try {
        Tn.onPostCommitFiberRoot(gl, e);
      } catch (t) {
        Ga || (Ga = !0, d("React instrumentation encountered an error: %s", t));
      }
  }
  function iS(e) {
    if (Tn && typeof Tn.onCommitFiberUnmount == "function")
      try {
        Tn.onCommitFiberUnmount(gl, e);
      } catch (t) {
        Ga || (Ga = !0, d("React instrumentation encountered an error: %s", t));
      }
  }
  function cn(e) {
    if (typeof ZE == "function" && (eS(e), b(e)), Tn && typeof Tn.setStrictMode == "function")
      try {
        Tn.setStrictMode(gl, e);
      } catch (t) {
        Ga || (Ga = !0, d("React instrumentation encountered an error: %s", t));
      }
  }
  function lS(e) {
    be = e;
  }
  function oS() {
    {
      for (var e = /* @__PURE__ */ new Map(), t = 1, n = 0; n < af; n++) {
        var a = jS(t);
        e.set(t, a), t *= 2;
      }
      return e;
    }
  }
  function sS(e) {
    be !== null && typeof be.markCommitStarted == "function" && be.markCommitStarted(e);
  }
  function wv() {
    be !== null && typeof be.markCommitStopped == "function" && be.markCommitStopped();
  }
  function Oo(e) {
    be !== null && typeof be.markComponentRenderStarted == "function" && be.markComponentRenderStarted(e);
  }
  function bl() {
    be !== null && typeof be.markComponentRenderStopped == "function" && be.markComponentRenderStopped();
  }
  function uS(e) {
    be !== null && typeof be.markComponentPassiveEffectMountStarted == "function" && be.markComponentPassiveEffectMountStarted(e);
  }
  function cS() {
    be !== null && typeof be.markComponentPassiveEffectMountStopped == "function" && be.markComponentPassiveEffectMountStopped();
  }
  function dS(e) {
    be !== null && typeof be.markComponentPassiveEffectUnmountStarted == "function" && be.markComponentPassiveEffectUnmountStarted(e);
  }
  function fS() {
    be !== null && typeof be.markComponentPassiveEffectUnmountStopped == "function" && be.markComponentPassiveEffectUnmountStopped();
  }
  function mS(e) {
    be !== null && typeof be.markComponentLayoutEffectMountStarted == "function" && be.markComponentLayoutEffectMountStarted(e);
  }
  function pS() {
    be !== null && typeof be.markComponentLayoutEffectMountStopped == "function" && be.markComponentLayoutEffectMountStopped();
  }
  function _v(e) {
    be !== null && typeof be.markComponentLayoutEffectUnmountStarted == "function" && be.markComponentLayoutEffectUnmountStarted(e);
  }
  function Ov() {
    be !== null && typeof be.markComponentLayoutEffectUnmountStopped == "function" && be.markComponentLayoutEffectUnmountStopped();
  }
  function hS(e, t, n) {
    be !== null && typeof be.markComponentErrored == "function" && be.markComponentErrored(e, t, n);
  }
  function vS(e, t, n) {
    be !== null && typeof be.markComponentSuspended == "function" && be.markComponentSuspended(e, t, n);
  }
  function gS(e) {
    be !== null && typeof be.markLayoutEffectsStarted == "function" && be.markLayoutEffectsStarted(e);
  }
  function bS() {
    be !== null && typeof be.markLayoutEffectsStopped == "function" && be.markLayoutEffectsStopped();
  }
  function yS(e) {
    be !== null && typeof be.markPassiveEffectsStarted == "function" && be.markPassiveEffectsStarted(e);
  }
  function NS() {
    be !== null && typeof be.markPassiveEffectsStopped == "function" && be.markPassiveEffectsStopped();
  }
  function Mv(e) {
    be !== null && typeof be.markRenderStarted == "function" && be.markRenderStarted(e);
  }
  function xS() {
    be !== null && typeof be.markRenderYielded == "function" && be.markRenderYielded();
  }
  function Vv() {
    be !== null && typeof be.markRenderStopped == "function" && be.markRenderStopped();
  }
  function ES(e) {
    be !== null && typeof be.markRenderScheduled == "function" && be.markRenderScheduled(e);
  }
  function SS(e, t) {
    be !== null && typeof be.markForceUpdateScheduled == "function" && be.markForceUpdateScheduled(e, t);
  }
  function nf(e, t) {
    be !== null && typeof be.markStateUpdateScheduled == "function" && be.markStateUpdateScheduled(e, t);
  }
  var we = (
    /*                         */
    0
  ), Xe = (
    /*                 */
    1
  ), ft = (
    /*                    */
    2
  ), kt = (
    /*               */
    8
  ), Wa = (
    /*              */
    16
  ), Av = Math.clz32 ? Math.clz32 : CS, RS = Math.log, DS = Math.LN2;
  function CS(e) {
    var t = e >>> 0;
    return t === 0 ? 32 : 31 - (RS(t) / DS | 0) | 0;
  }
  var af = 31, J = (
    /*                        */
    0
  ), dn = (
    /*                          */
    0
  ), Le = (
    /*                        */
    1
  ), yl = (
    /*    */
    2
  ), gr = (
    /*             */
    4
  ), wi = (
    /*            */
    8
  ), Ka = (
    /*                     */
    16
  ), Mo = (
    /*                */
    32
  ), Nl = (
    /*                       */
    4194240
  ), Vo = (
    /*                        */
    64
  ), rf = (
    /*                        */
    128
  ), lf = (
    /*                        */
    256
  ), of = (
    /*                        */
    512
  ), sf = (
    /*                        */
    1024
  ), uf = (
    /*                        */
    2048
  ), cf = (
    /*                        */
    4096
  ), df = (
    /*                        */
    8192
  ), ff = (
    /*                        */
    16384
  ), mf = (
    /*                       */
    32768
  ), pf = (
    /*                       */
    65536
  ), hf = (
    /*                       */
    131072
  ), vf = (
    /*                       */
    262144
  ), gf = (
    /*                       */
    524288
  ), bf = (
    /*                       */
    1048576
  ), yf = (
    /*                       */
    2097152
  ), Ru = (
    /*                            */
    130023424
  ), xl = (
    /*                             */
    4194304
  ), Nf = (
    /*                             */
    8388608
  ), xf = (
    /*                             */
    16777216
  ), Ef = (
    /*                             */
    33554432
  ), Sf = (
    /*                             */
    67108864
  ), Lv = xl, Ao = (
    /*          */
    134217728
  ), kv = (
    /*                          */
    268435455
  ), Lo = (
    /*               */
    268435456
  ), _i = (
    /*                        */
    536870912
  ), Zn = (
    /*                   */
    1073741824
  );
  function jS(e) {
    {
      if (e & Le)
        return "Sync";
      if (e & yl)
        return "InputContinuousHydration";
      if (e & gr)
        return "InputContinuous";
      if (e & wi)
        return "DefaultHydration";
      if (e & Ka)
        return "Default";
      if (e & Mo)
        return "TransitionHydration";
      if (e & Nl)
        return "Transition";
      if (e & Ru)
        return "Retry";
      if (e & Ao)
        return "SelectiveHydration";
      if (e & Lo)
        return "IdleHydration";
      if (e & _i)
        return "Idle";
      if (e & Zn)
        return "Offscreen";
    }
  }
  var xt = -1, Du = Vo, Cu = xl;
  function ko(e) {
    switch (Oi(e)) {
      case Le:
        return Le;
      case yl:
        return yl;
      case gr:
        return gr;
      case wi:
        return wi;
      case Ka:
        return Ka;
      case Mo:
        return Mo;
      case Vo:
      case rf:
      case lf:
      case of:
      case sf:
      case uf:
      case cf:
      case df:
      case ff:
      case mf:
      case pf:
      case hf:
      case vf:
      case gf:
      case bf:
      case yf:
        return e & Nl;
      case xl:
      case Nf:
      case xf:
      case Ef:
      case Sf:
        return e & Ru;
      case Ao:
        return Ao;
      case Lo:
        return Lo;
      case _i:
        return _i;
      case Zn:
        return Zn;
      default:
        return d("Should have found matching lanes. This is a bug in React."), e;
    }
  }
  function ju(e, t) {
    var n = e.pendingLanes;
    if (n === J)
      return J;
    var a = J, r = e.suspendedLanes, i = e.pingedLanes, l = n & kv;
    if (l !== J) {
      var u = l & ~r;
      if (u !== J)
        a = ko(u);
      else {
        var c = l & i;
        c !== J && (a = ko(c));
      }
    } else {
      var h = n & ~r;
      h !== J ? a = ko(h) : i !== J && (a = ko(i));
    }
    if (a === J)
      return J;
    if (t !== J && t !== a && // If we already suspended with a delay, then interrupting is fine. Don't
    // bother waiting until the root is complete.
    (t & r) === J) {
      var v = Oi(a), C = Oi(t);
      if (
        // Tests whether the next lane is equal or lower priority than the wip
        // one. This works because the bits decrease in priority as you go left.
        v >= C || // Default priority updates should not interrupt transition updates. The
        // only difference between default updates and transition updates is that
        // default updates do not support refresh transitions.
        v === Ka && (C & Nl) !== J
      )
        return t;
    }
    (a & gr) !== J && (a |= n & Ka);
    var D = e.entangledLanes;
    if (D !== J)
      for (var M = e.entanglements, A = a & D; A > 0; ) {
        var B = Mi(A), ve = 1 << B;
        a |= M[B], A &= ~ve;
      }
    return a;
  }
  function TS(e, t) {
    for (var n = e.eventTimes, a = xt; t > 0; ) {
      var r = Mi(t), i = 1 << r, l = n[r];
      l > a && (a = l), t &= ~i;
    }
    return a;
  }
  function wS(e, t) {
    switch (e) {
      case Le:
      case yl:
      case gr:
        return t + 250;
      case wi:
      case Ka:
      case Mo:
      case Vo:
      case rf:
      case lf:
      case of:
      case sf:
      case uf:
      case cf:
      case df:
      case ff:
      case mf:
      case pf:
      case hf:
      case vf:
      case gf:
      case bf:
      case yf:
        return t + 5e3;
      case xl:
      case Nf:
      case xf:
      case Ef:
      case Sf:
        return xt;
      case Ao:
      case Lo:
      case _i:
      case Zn:
        return xt;
      default:
        return d("Should have found matching lanes. This is a bug in React."), xt;
    }
  }
  function _S(e, t) {
    for (var n = e.pendingLanes, a = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, l = n; l > 0; ) {
      var u = Mi(l), c = 1 << u, h = i[u];
      h === xt ? ((c & a) === J || (c & r) !== J) && (i[u] = wS(c, t)) : h <= t && (e.expiredLanes |= c), l &= ~c;
    }
  }
  function OS(e) {
    return ko(e.pendingLanes);
  }
  function Rf(e) {
    var t = e.pendingLanes & ~Zn;
    return t !== J ? t : t & Zn ? Zn : J;
  }
  function MS(e) {
    return (e & Le) !== J;
  }
  function Df(e) {
    return (e & kv) !== J;
  }
  function Uv(e) {
    return (e & Ru) === e;
  }
  function VS(e) {
    var t = Le | gr | Ka;
    return (e & t) === J;
  }
  function AS(e) {
    return (e & Nl) === e;
  }
  function Tu(e, t) {
    var n = yl | gr | wi | Ka;
    return (t & n) !== J;
  }
  function LS(e, t) {
    return (t & e.expiredLanes) !== J;
  }
  function Fv(e) {
    return (e & Nl) !== J;
  }
  function zv() {
    var e = Du;
    return Du <<= 1, (Du & Nl) === J && (Du = Vo), e;
  }
  function kS() {
    var e = Cu;
    return Cu <<= 1, (Cu & Ru) === J && (Cu = xl), e;
  }
  function Oi(e) {
    return e & -e;
  }
  function Uo(e) {
    return Oi(e);
  }
  function Mi(e) {
    return 31 - Av(e);
  }
  function Cf(e) {
    return Mi(e);
  }
  function ea(e, t) {
    return (e & t) !== J;
  }
  function El(e, t) {
    return (e & t) === t;
  }
  function Be(e, t) {
    return e | t;
  }
  function wu(e, t) {
    return e & ~t;
  }
  function Pv(e, t) {
    return e & t;
  }
  function tO(e) {
    return e;
  }
  function US(e, t) {
    return e !== dn && e < t ? e : t;
  }
  function jf(e) {
    for (var t = [], n = 0; n < af; n++)
      t.push(e);
    return t;
  }
  function Fo(e, t, n) {
    e.pendingLanes |= t, t !== _i && (e.suspendedLanes = J, e.pingedLanes = J);
    var a = e.eventTimes, r = Cf(t);
    a[r] = n;
  }
  function FS(e, t) {
    e.suspendedLanes |= t, e.pingedLanes &= ~t;
    for (var n = e.expirationTimes, a = t; a > 0; ) {
      var r = Mi(a), i = 1 << r;
      n[r] = xt, a &= ~i;
    }
  }
  function Hv(e, t, n) {
    e.pingedLanes |= e.suspendedLanes & t;
  }
  function zS(e, t) {
    var n = e.pendingLanes & ~t;
    e.pendingLanes = t, e.suspendedLanes = J, e.pingedLanes = J, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t;
    for (var a = e.entanglements, r = e.eventTimes, i = e.expirationTimes, l = n; l > 0; ) {
      var u = Mi(l), c = 1 << u;
      a[u] = J, r[u] = xt, i[u] = xt, l &= ~c;
    }
  }
  function Tf(e, t) {
    for (var n = e.entangledLanes |= t, a = e.entanglements, r = n; r; ) {
      var i = Mi(r), l = 1 << i;
      // Is this one of the newly entangled lanes?
      l & t | // Is this lane transitively entangled with the newly entangled lanes?
      a[i] & t && (a[i] |= t), r &= ~l;
    }
  }
  function PS(e, t) {
    var n = Oi(t), a;
    switch (n) {
      case gr:
        a = yl;
        break;
      case Ka:
        a = wi;
        break;
      case Vo:
      case rf:
      case lf:
      case of:
      case sf:
      case uf:
      case cf:
      case df:
      case ff:
      case mf:
      case pf:
      case hf:
      case vf:
      case gf:
      case bf:
      case yf:
      case xl:
      case Nf:
      case xf:
      case Ef:
      case Sf:
        a = Mo;
        break;
      case _i:
        a = Lo;
        break;
      default:
        a = dn;
        break;
    }
    return (a & (e.suspendedLanes | t)) !== dn ? dn : a;
  }
  function Bv(e, t, n) {
    if (Ta)
      for (var a = e.pendingUpdatersLaneMap; n > 0; ) {
        var r = Cf(n), i = 1 << r, l = a[r];
        l.add(t), n &= ~i;
      }
  }
  function $v(e, t) {
    if (Ta)
      for (var n = e.pendingUpdatersLaneMap, a = e.memoizedUpdaters; t > 0; ) {
        var r = Cf(t), i = 1 << r, l = n[r];
        l.size > 0 && (l.forEach(function(u) {
          var c = u.alternate;
          (c === null || !a.has(c)) && a.add(u);
        }), l.clear()), t &= ~i;
      }
  }
  function Iv(e, t) {
    return null;
  }
  var ta = Le, br = gr, yr = Ka, _u = _i, zo = dn;
  function wa() {
    return zo;
  }
  function fn(e) {
    zo = e;
  }
  function HS(e, t) {
    var n = zo;
    try {
      return zo = e, t();
    } finally {
      zo = n;
    }
  }
  function BS(e, t) {
    return e !== 0 && e < t ? e : t;
  }
  function $S(e, t) {
    return e > t ? e : t;
  }
  function wf(e, t) {
    return e !== 0 && e < t;
  }
  function Yv(e) {
    var t = Oi(e);
    return wf(ta, t) ? wf(br, t) ? Df(t) ? yr : _u : br : ta;
  }
  function Ou(e) {
    var t = e.current.memoizedState;
    return t.isDehydrated;
  }
  var qv;
  function IS(e) {
    qv = e;
  }
  function YS(e) {
    qv(e);
  }
  var _f;
  function qS(e) {
    _f = e;
  }
  var Gv;
  function GS(e) {
    Gv = e;
  }
  var Wv;
  function WS(e) {
    Wv = e;
  }
  var Kv;
  function KS(e) {
    Kv = e;
  }
  var Of = !1, Mu = [], Pr = null, Hr = null, Br = null, Po = /* @__PURE__ */ new Map(), Ho = /* @__PURE__ */ new Map(), $r = [], QS = [
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
  function XS(e) {
    return QS.indexOf(e) > -1;
  }
  function JS(e, t, n, a, r) {
    return {
      blockedOn: e,
      domEventName: t,
      eventSystemFlags: n,
      nativeEvent: r,
      targetContainers: [a]
    };
  }
  function Qv(e, t) {
    switch (e) {
      case "focusin":
      case "focusout":
        Pr = null;
        break;
      case "dragenter":
      case "dragleave":
        Hr = null;
        break;
      case "mouseover":
      case "mouseout":
        Br = null;
        break;
      case "pointerover":
      case "pointerout": {
        var n = t.pointerId;
        Po.delete(n);
        break;
      }
      case "gotpointercapture":
      case "lostpointercapture": {
        var a = t.pointerId;
        Ho.delete(a);
        break;
      }
    }
  }
  function Bo(e, t, n, a, r, i) {
    if (e === null || e.nativeEvent !== i) {
      var l = JS(t, n, a, r, i);
      if (t !== null) {
        var u = qr(t);
        u !== null && _f(u);
      }
      return l;
    }
    e.eventSystemFlags |= a;
    var c = e.targetContainers;
    return r !== null && c.indexOf(r) === -1 && c.push(r), e;
  }
  function ZS(e, t, n, a, r) {
    switch (t) {
      case "focusin": {
        var i = r;
        return Pr = Bo(Pr, e, t, n, a, i), !0;
      }
      case "dragenter": {
        var l = r;
        return Hr = Bo(Hr, e, t, n, a, l), !0;
      }
      case "mouseover": {
        var u = r;
        return Br = Bo(Br, e, t, n, a, u), !0;
      }
      case "pointerover": {
        var c = r, h = c.pointerId;
        return Po.set(h, Bo(Po.get(h) || null, e, t, n, a, c)), !0;
      }
      case "gotpointercapture": {
        var v = r, C = v.pointerId;
        return Ho.set(C, Bo(Ho.get(C) || null, e, t, n, a, v)), !0;
      }
    }
    return !1;
  }
  function Xv(e) {
    var t = Li(e.target);
    if (t !== null) {
      var n = ji(t);
      if (n !== null) {
        var a = n.tag;
        if (a === ee) {
          var r = xv(n);
          if (r !== null) {
            e.blockedOn = r, Kv(e.priority, function() {
              Gv(n);
            });
            return;
          }
        } else if (a === x) {
          var i = n.stateNode;
          if (Ou(i)) {
            e.blockedOn = Ev(n);
            return;
          }
        }
      }
    }
    e.blockedOn = null;
  }
  function e0(e) {
    for (var t = Wv(), n = {
      blockedOn: null,
      target: e,
      priority: t
    }, a = 0; a < $r.length && wf(t, $r[a].priority); a++)
      ;
    $r.splice(a, 0, n), a === 0 && Xv(n);
  }
  function Vu(e) {
    if (e.blockedOn !== null)
      return !1;
    for (var t = e.targetContainers; t.length > 0; ) {
      var n = t[0], a = Af(e.domEventName, e.eventSystemFlags, n, e.nativeEvent);
      if (a === null) {
        var r = e.nativeEvent, i = new r.constructor(r.type, r);
        jE(i), r.target.dispatchEvent(i), TE();
      } else {
        var l = qr(a);
        return l !== null && _f(l), e.blockedOn = a, !1;
      }
      t.shift();
    }
    return !0;
  }
  function Jv(e, t, n) {
    Vu(e) && n.delete(t);
  }
  function t0() {
    Of = !1, Pr !== null && Vu(Pr) && (Pr = null), Hr !== null && Vu(Hr) && (Hr = null), Br !== null && Vu(Br) && (Br = null), Po.forEach(Jv), Ho.forEach(Jv);
  }
  function $o(e, t) {
    e.blockedOn === t && (e.blockedOn = null, Of || (Of = !0, f.unstable_scheduleCallback(f.unstable_NormalPriority, t0)));
  }
  function Io(e) {
    if (Mu.length > 0) {
      $o(Mu[0], e);
      for (var t = 1; t < Mu.length; t++) {
        var n = Mu[t];
        n.blockedOn === e && (n.blockedOn = null);
      }
    }
    Pr !== null && $o(Pr, e), Hr !== null && $o(Hr, e), Br !== null && $o(Br, e);
    var a = function(u) {
      return $o(u, e);
    };
    Po.forEach(a), Ho.forEach(a);
    for (var r = 0; r < $r.length; r++) {
      var i = $r[r];
      i.blockedOn === e && (i.blockedOn = null);
    }
    for (; $r.length > 0; ) {
      var l = $r[0];
      if (l.blockedOn !== null)
        break;
      Xv(l), l.blockedOn === null && $r.shift();
    }
  }
  var Sl = p.ReactCurrentBatchConfig, Mf = !0;
  function Zv(e) {
    Mf = !!e;
  }
  function n0() {
    return Mf;
  }
  function a0(e, t, n) {
    var a = eg(t), r;
    switch (a) {
      case ta:
        r = r0;
        break;
      case br:
        r = i0;
        break;
      case yr:
      default:
        r = Vf;
        break;
    }
    return r.bind(null, t, n, e);
  }
  function r0(e, t, n, a) {
    var r = wa(), i = Sl.transition;
    Sl.transition = null;
    try {
      fn(ta), Vf(e, t, n, a);
    } finally {
      fn(r), Sl.transition = i;
    }
  }
  function i0(e, t, n, a) {
    var r = wa(), i = Sl.transition;
    Sl.transition = null;
    try {
      fn(br), Vf(e, t, n, a);
    } finally {
      fn(r), Sl.transition = i;
    }
  }
  function Vf(e, t, n, a) {
    Mf && l0(e, t, n, a);
  }
  function l0(e, t, n, a) {
    var r = Af(e, t, n, a);
    if (r === null) {
      Wf(e, t, a, Au, n), Qv(e, a);
      return;
    }
    if (ZS(r, e, t, n, a)) {
      a.stopPropagation();
      return;
    }
    if (Qv(e, a), t & Do && XS(e)) {
      for (; r !== null; ) {
        var i = qr(r);
        i !== null && YS(i);
        var l = Af(e, t, n, a);
        if (l === null && Wf(e, t, a, Au, n), l === r)
          break;
        r = l;
      }
      r !== null && a.stopPropagation();
      return;
    }
    Wf(e, t, a, null, n);
  }
  var Au = null;
  function Af(e, t, n, a) {
    Au = null;
    var r = zd(a), i = Li(r);
    if (i !== null) {
      var l = ji(i);
      if (l === null)
        i = null;
      else {
        var u = l.tag;
        if (u === ee) {
          var c = xv(l);
          if (c !== null)
            return c;
          i = null;
        } else if (u === x) {
          var h = l.stateNode;
          if (Ou(h))
            return Ev(l);
          i = null;
        } else l !== i && (i = null);
      }
    }
    return Au = i, null;
  }
  function eg(e) {
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
        return ta;
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
        return br;
      case "message": {
        var t = XE();
        switch (t) {
          case Su:
            return ta;
          case ef:
            return br;
          case Ti:
          case JE:
            return yr;
          case tf:
            return _u;
          default:
            return yr;
        }
      }
      default:
        return yr;
    }
  }
  function o0(e, t, n) {
    return e.addEventListener(t, n, !1), n;
  }
  function s0(e, t, n) {
    return e.addEventListener(t, n, !0), n;
  }
  function u0(e, t, n, a) {
    return e.addEventListener(t, n, {
      capture: !0,
      passive: a
    }), n;
  }
  function c0(e, t, n, a) {
    return e.addEventListener(t, n, {
      passive: a
    }), n;
  }
  var Yo = null, Lf = null, qo = null;
  function d0(e) {
    return Yo = e, Lf = ng(), !0;
  }
  function f0() {
    Yo = null, Lf = null, qo = null;
  }
  function tg() {
    if (qo)
      return qo;
    var e, t = Lf, n = t.length, a, r = ng(), i = r.length;
    for (e = 0; e < n && t[e] === r[e]; e++)
      ;
    var l = n - e;
    for (a = 1; a <= l && t[n - a] === r[i - a]; a++)
      ;
    var u = a > 1 ? 1 - a : void 0;
    return qo = r.slice(e, u), qo;
  }
  function ng() {
    return "value" in Yo ? Yo.value : Yo.textContent;
  }
  function Lu(e) {
    var t, n = e.keyCode;
    return "charCode" in e ? (t = e.charCode, t === 0 && n === 13 && (t = 13)) : t = n, t === 10 && (t = 13), t >= 32 || t === 13 ? t : 0;
  }
  function ku() {
    return !0;
  }
  function ag() {
    return !1;
  }
  function na(e) {
    function t(n, a, r, i, l) {
      this._reactName = n, this._targetInst = r, this.type = a, this.nativeEvent = i, this.target = l, this.currentTarget = null;
      for (var u in e)
        if (e.hasOwnProperty(u)) {
          var c = e[u];
          c ? this[u] = c(i) : this[u] = i[u];
        }
      var h = i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1;
      return h ? this.isDefaultPrevented = ku : this.isDefaultPrevented = ag, this.isPropagationStopped = ag, this;
    }
    return Ie(t.prototype, {
      preventDefault: function() {
        this.defaultPrevented = !0;
        var n = this.nativeEvent;
        n && (n.preventDefault ? n.preventDefault() : typeof n.returnValue != "unknown" && (n.returnValue = !1), this.isDefaultPrevented = ku);
      },
      stopPropagation: function() {
        var n = this.nativeEvent;
        n && (n.stopPropagation ? n.stopPropagation() : typeof n.cancelBubble != "unknown" && (n.cancelBubble = !0), this.isPropagationStopped = ku);
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
      isPersistent: ku
    }), t;
  }
  var Rl = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, kf = na(Rl), Go = Ie({}, Rl, {
    view: 0,
    detail: 0
  }), m0 = na(Go), Uf, Ff, Wo;
  function p0(e) {
    e !== Wo && (Wo && e.type === "mousemove" ? (Uf = e.screenX - Wo.screenX, Ff = e.screenY - Wo.screenY) : (Uf = 0, Ff = 0), Wo = e);
  }
  var Uu = Ie({}, Go, {
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
    getModifierState: Pf,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (p0(e), Uf);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : Ff;
    }
  }), rg = na(Uu), h0 = Ie({}, Uu, {
    dataTransfer: 0
  }), v0 = na(h0), g0 = Ie({}, Go, {
    relatedTarget: 0
  }), zf = na(g0), b0 = Ie({}, Rl, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), y0 = na(b0), N0 = Ie({}, Rl, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), x0 = na(N0), E0 = Ie({}, Rl, {
    data: 0
  }), ig = na(E0), S0 = ig, R0 = {
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
  }, D0 = {
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
  function C0(e) {
    if (e.key) {
      var t = R0[e.key] || e.key;
      if (t !== "Unidentified")
        return t;
    }
    if (e.type === "keypress") {
      var n = Lu(e);
      return n === 13 ? "Enter" : String.fromCharCode(n);
    }
    return e.type === "keydown" || e.type === "keyup" ? D0[e.keyCode] || "Unidentified" : "";
  }
  var j0 = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function T0(e) {
    var t = this, n = t.nativeEvent;
    if (n.getModifierState)
      return n.getModifierState(e);
    var a = j0[e];
    return a ? !!n[a] : !1;
  }
  function Pf(e) {
    return T0;
  }
  var w0 = Ie({}, Go, {
    key: C0,
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Pf,
    // Legacy Interface
    charCode: function(e) {
      return e.type === "keypress" ? Lu(e) : 0;
    },
    keyCode: function(e) {
      return e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    },
    which: function(e) {
      return e.type === "keypress" ? Lu(e) : e.type === "keydown" || e.type === "keyup" ? e.keyCode : 0;
    }
  }), _0 = na(w0), O0 = Ie({}, Uu, {
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
  }), lg = na(O0), M0 = Ie({}, Go, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Pf
  }), V0 = na(M0), A0 = Ie({}, Rl, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), L0 = na(A0), k0 = Ie({}, Uu, {
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
  }), U0 = na(k0), F0 = [9, 13, 27, 32], og = 229, Hf = Z && "CompositionEvent" in window, Ko = null;
  Z && "documentMode" in document && (Ko = document.documentMode);
  var z0 = Z && "TextEvent" in window && !Ko, sg = Z && (!Hf || Ko && Ko > 8 && Ko <= 11), ug = 32, cg = String.fromCharCode(ug);
  function P0() {
    Gt("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), Gt("onCompositionEnd", ["compositionend", "focusout", "keydown", "keypress", "keyup", "mousedown"]), Gt("onCompositionStart", ["compositionstart", "focusout", "keydown", "keypress", "keyup", "mousedown"]), Gt("onCompositionUpdate", ["compositionupdate", "focusout", "keydown", "keypress", "keyup", "mousedown"]);
  }
  var dg = !1;
  function H0(e) {
    return (e.ctrlKey || e.altKey || e.metaKey) && // ctrlKey && altKey is equivalent to AltGr, and is not a command.
    !(e.ctrlKey && e.altKey);
  }
  function B0(e) {
    switch (e) {
      case "compositionstart":
        return "onCompositionStart";
      case "compositionend":
        return "onCompositionEnd";
      case "compositionupdate":
        return "onCompositionUpdate";
    }
  }
  function $0(e, t) {
    return e === "keydown" && t.keyCode === og;
  }
  function fg(e, t) {
    switch (e) {
      case "keyup":
        return F0.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== og;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function mg(e) {
    var t = e.detail;
    return typeof t == "object" && "data" in t ? t.data : null;
  }
  function pg(e) {
    return e.locale === "ko";
  }
  var Dl = !1;
  function I0(e, t, n, a, r) {
    var i, l;
    if (Hf ? i = B0(t) : Dl ? fg(t, a) && (i = "onCompositionEnd") : $0(t, a) && (i = "onCompositionStart"), !i)
      return null;
    sg && !pg(a) && (!Dl && i === "onCompositionStart" ? Dl = d0(r) : i === "onCompositionEnd" && Dl && (l = tg()));
    var u = Bu(n, i);
    if (u.length > 0) {
      var c = new ig(i, t, null, a, r);
      if (e.push({
        event: c,
        listeners: u
      }), l)
        c.data = l;
      else {
        var h = mg(a);
        h !== null && (c.data = h);
      }
    }
  }
  function Y0(e, t) {
    switch (e) {
      case "compositionend":
        return mg(t);
      case "keypress":
        var n = t.which;
        return n !== ug ? null : (dg = !0, cg);
      case "textInput":
        var a = t.data;
        return a === cg && dg ? null : a;
      default:
        return null;
    }
  }
  function q0(e, t) {
    if (Dl) {
      if (e === "compositionend" || !Hf && fg(e, t)) {
        var n = tg();
        return f0(), Dl = !1, n;
      }
      return null;
    }
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!H0(t)) {
          if (t.char && t.char.length > 1)
            return t.char;
          if (t.which)
            return String.fromCharCode(t.which);
        }
        return null;
      case "compositionend":
        return sg && !pg(t) ? null : t.data;
      default:
        return null;
    }
  }
  function G0(e, t, n, a, r) {
    var i;
    if (z0 ? i = Y0(t, a) : i = q0(t, a), !i)
      return null;
    var l = Bu(n, "onBeforeInput");
    if (l.length > 0) {
      var u = new S0("onBeforeInput", "beforeinput", null, a, r);
      e.push({
        event: u,
        listeners: l
      }), u.data = i;
    }
  }
  function W0(e, t, n, a, r, i, l) {
    I0(e, t, n, a, r), G0(e, t, n, a, r);
  }
  var K0 = {
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
  function hg(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!K0[e.type] : t === "textarea";
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
  function Q0(e) {
    if (!Z)
      return !1;
    var t = "on" + e, n = t in document;
    if (!n) {
      var a = document.createElement("div");
      a.setAttribute(t, "return;"), n = typeof a[t] == "function";
    }
    return n;
  }
  function X0() {
    Gt("onChange", ["change", "click", "focusin", "focusout", "input", "keydown", "keyup", "selectionchange"]);
  }
  function vg(e, t, n, a) {
    fv(a);
    var r = Bu(t, "onChange");
    if (r.length > 0) {
      var i = new kf("onChange", "change", null, n, a);
      e.push({
        event: i,
        listeners: r
      });
    }
  }
  var Qo = null, Xo = null;
  function J0(e) {
    var t = e.nodeName && e.nodeName.toLowerCase();
    return t === "select" || t === "input" && e.type === "file";
  }
  function Z0(e) {
    var t = [];
    vg(t, Xo, e, zd(e)), vv(eR, t);
  }
  function eR(e) {
    Ag(e, 0);
  }
  function Fu(e) {
    var t = Ol(e);
    if (yo(t))
      return e;
  }
  function tR(e, t) {
    if (e === "change")
      return t;
  }
  var gg = !1;
  Z && (gg = Q0("input") && (!document.documentMode || document.documentMode > 9));
  function nR(e, t) {
    Qo = e, Xo = t, Qo.attachEvent("onpropertychange", yg);
  }
  function bg() {
    Qo && (Qo.detachEvent("onpropertychange", yg), Qo = null, Xo = null);
  }
  function yg(e) {
    e.propertyName === "value" && Fu(Xo) && Z0(e);
  }
  function aR(e, t, n) {
    e === "focusin" ? (bg(), nR(t, n)) : e === "focusout" && bg();
  }
  function rR(e, t) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return Fu(Xo);
  }
  function iR(e) {
    var t = e.nodeName;
    return t && t.toLowerCase() === "input" && (e.type === "checkbox" || e.type === "radio");
  }
  function lR(e, t) {
    if (e === "click")
      return Fu(t);
  }
  function oR(e, t) {
    if (e === "input" || e === "change")
      return Fu(t);
  }
  function sR(e) {
    var t = e._wrapperState;
    !t || !t.controlled || e.type !== "number" || _e(e, "number", e.value);
  }
  function uR(e, t, n, a, r, i, l) {
    var u = n ? Ol(n) : window, c, h;
    if (J0(u) ? c = tR : hg(u) ? gg ? c = oR : (c = rR, h = aR) : iR(u) && (c = lR), c) {
      var v = c(t, n);
      if (v) {
        vg(e, v, a, r);
        return;
      }
    }
    h && h(t, u, n), t === "focusout" && sR(u);
  }
  function cR() {
    Wt("onMouseEnter", ["mouseout", "mouseover"]), Wt("onMouseLeave", ["mouseout", "mouseover"]), Wt("onPointerEnter", ["pointerout", "pointerover"]), Wt("onPointerLeave", ["pointerout", "pointerover"]);
  }
  function dR(e, t, n, a, r, i, l) {
    var u = t === "mouseover" || t === "pointerover", c = t === "mouseout" || t === "pointerout";
    if (u && !wE(a)) {
      var h = a.relatedTarget || a.fromElement;
      if (h && (Li(h) || fs(h)))
        return;
    }
    if (!(!c && !u)) {
      var v;
      if (r.window === r)
        v = r;
      else {
        var C = r.ownerDocument;
        C ? v = C.defaultView || C.parentWindow : v = window;
      }
      var D, M;
      if (c) {
        var A = a.relatedTarget || a.toElement;
        if (D = n, M = A ? Li(A) : null, M !== null) {
          var B = ji(M);
          (M !== B || M.tag !== L && M.tag !== te) && (M = null);
        }
      } else
        D = null, M = n;
      if (D !== M) {
        var ve = rg, je = "onMouseLeave", Se = "onMouseEnter", Ze = "mouse";
        (t === "pointerout" || t === "pointerover") && (ve = lg, je = "onPointerLeave", Se = "onPointerEnter", Ze = "pointer");
        var qe = D == null ? v : Ol(D), _ = M == null ? v : Ol(M), $ = new ve(je, Ze + "leave", D, a, r);
        $.target = qe, $.relatedTarget = _;
        var O = null, ae = Li(r);
        if (ae === n) {
          var Ne = new ve(Se, Ze + "enter", M, a, r);
          Ne.target = _, Ne.relatedTarget = qe, O = Ne;
        }
        LR(e, $, O, D, M);
      }
    }
  }
  function fR(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var aa = typeof Object.is == "function" ? Object.is : fR;
  function Jo(e, t) {
    if (aa(e, t))
      return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
      return !1;
    var n = Object.keys(e), a = Object.keys(t);
    if (n.length !== a.length)
      return !1;
    for (var r = 0; r < n.length; r++) {
      var i = n[r];
      if (!Ge.call(t, i) || !aa(e[i], t[i]))
        return !1;
    }
    return !0;
  }
  function Ng(e) {
    for (; e && e.firstChild; )
      e = e.firstChild;
    return e;
  }
  function mR(e) {
    for (; e; ) {
      if (e.nextSibling)
        return e.nextSibling;
      e = e.parentNode;
    }
  }
  function xg(e, t) {
    for (var n = Ng(e), a = 0, r = 0; n; ) {
      if (n.nodeType === fr) {
        if (r = a + n.textContent.length, a <= t && r >= t)
          return {
            node: n,
            offset: t - a
          };
        a = r;
      }
      n = Ng(mR(n));
    }
  }
  function pR(e) {
    var t = e.ownerDocument, n = t && t.defaultView || window, a = n.getSelection && n.getSelection();
    if (!a || a.rangeCount === 0)
      return null;
    var r = a.anchorNode, i = a.anchorOffset, l = a.focusNode, u = a.focusOffset;
    try {
      r.nodeType, l.nodeType;
    } catch {
      return null;
    }
    return hR(e, r, i, l, u);
  }
  function hR(e, t, n, a, r) {
    var i = 0, l = -1, u = -1, c = 0, h = 0, v = e, C = null;
    e: for (; ; ) {
      for (var D = null; v === t && (n === 0 || v.nodeType === fr) && (l = i + n), v === a && (r === 0 || v.nodeType === fr) && (u = i + r), v.nodeType === fr && (i += v.nodeValue.length), (D = v.firstChild) !== null; )
        C = v, v = D;
      for (; ; ) {
        if (v === e)
          break e;
        if (C === t && ++c === n && (l = i), C === a && ++h === r && (u = i), (D = v.nextSibling) !== null)
          break;
        v = C, C = v.parentNode;
      }
      v = D;
    }
    return l === -1 || u === -1 ? null : {
      start: l,
      end: u
    };
  }
  function vR(e, t) {
    var n = e.ownerDocument || document, a = n && n.defaultView || window;
    if (a.getSelection) {
      var r = a.getSelection(), i = e.textContent.length, l = Math.min(t.start, i), u = t.end === void 0 ? l : Math.min(t.end, i);
      if (!r.extend && l > u) {
        var c = u;
        u = l, l = c;
      }
      var h = xg(e, l), v = xg(e, u);
      if (h && v) {
        if (r.rangeCount === 1 && r.anchorNode === h.node && r.anchorOffset === h.offset && r.focusNode === v.node && r.focusOffset === v.offset)
          return;
        var C = n.createRange();
        C.setStart(h.node, h.offset), r.removeAllRanges(), l > u ? (r.addRange(C), r.extend(v.node, v.offset)) : (C.setEnd(v.node, v.offset), r.addRange(C));
      }
    }
  }
  function Eg(e) {
    return e && e.nodeType === fr;
  }
  function Sg(e, t) {
    return !e || !t ? !1 : e === t ? !0 : Eg(e) ? !1 : Eg(t) ? Sg(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1;
  }
  function gR(e) {
    return e && e.ownerDocument && Sg(e.ownerDocument.documentElement, e);
  }
  function bR(e) {
    try {
      return typeof e.contentWindow.location.href == "string";
    } catch {
      return !1;
    }
  }
  function Rg() {
    for (var e = window, t = ur(); t instanceof e.HTMLIFrameElement; ) {
      if (bR(t))
        e = t.contentWindow;
      else
        return t;
      t = ur(e.document);
    }
    return t;
  }
  function Bf(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  function yR() {
    var e = Rg();
    return {
      focusedElem: e,
      selectionRange: Bf(e) ? xR(e) : null
    };
  }
  function NR(e) {
    var t = Rg(), n = e.focusedElem, a = e.selectionRange;
    if (t !== n && gR(n)) {
      a !== null && Bf(n) && ER(n, a);
      for (var r = [], i = n; i = i.parentNode; )
        i.nodeType === Yn && r.push({
          element: i,
          left: i.scrollLeft,
          top: i.scrollTop
        });
      typeof n.focus == "function" && n.focus();
      for (var l = 0; l < r.length; l++) {
        var u = r[l];
        u.element.scrollLeft = u.left, u.element.scrollTop = u.top;
      }
    }
  }
  function xR(e) {
    var t;
    return "selectionStart" in e ? t = {
      start: e.selectionStart,
      end: e.selectionEnd
    } : t = pR(e), t || {
      start: 0,
      end: 0
    };
  }
  function ER(e, t) {
    var n = t.start, a = t.end;
    a === void 0 && (a = n), "selectionStart" in e ? (e.selectionStart = n, e.selectionEnd = Math.min(a, e.value.length)) : vR(e, t);
  }
  var SR = Z && "documentMode" in document && document.documentMode <= 11;
  function RR() {
    Gt("onSelect", ["focusout", "contextmenu", "dragend", "focusin", "keydown", "keyup", "mousedown", "mouseup", "selectionchange"]);
  }
  var Cl = null, $f = null, Zo = null, If = !1;
  function DR(e) {
    if ("selectionStart" in e && Bf(e))
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
  function CR(e) {
    return e.window === e ? e.document : e.nodeType === mr ? e : e.ownerDocument;
  }
  function Dg(e, t, n) {
    var a = CR(n);
    if (!(If || Cl == null || Cl !== ur(a))) {
      var r = DR(Cl);
      if (!Zo || !Jo(Zo, r)) {
        Zo = r;
        var i = Bu($f, "onSelect");
        if (i.length > 0) {
          var l = new kf("onSelect", "select", null, t, n);
          e.push({
            event: l,
            listeners: i
          }), l.target = Cl;
        }
      }
    }
  }
  function jR(e, t, n, a, r, i, l) {
    var u = n ? Ol(n) : window;
    switch (t) {
      case "focusin":
        (hg(u) || u.contentEditable === "true") && (Cl = u, $f = n, Zo = null);
        break;
      case "focusout":
        Cl = null, $f = null, Zo = null;
        break;
      case "mousedown":
        If = !0;
        break;
      case "contextmenu":
      case "mouseup":
      case "dragend":
        If = !1, Dg(e, a, r);
        break;
      case "selectionchange":
        if (SR)
          break;
      case "keydown":
      case "keyup":
        Dg(e, a, r);
    }
  }
  function zu(e, t) {
    var n = {};
    return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
  }
  var jl = {
    animationend: zu("Animation", "AnimationEnd"),
    animationiteration: zu("Animation", "AnimationIteration"),
    animationstart: zu("Animation", "AnimationStart"),
    transitionend: zu("Transition", "TransitionEnd")
  }, Yf = {}, Cg = {};
  Z && (Cg = document.createElement("div").style, "AnimationEvent" in window || (delete jl.animationend.animation, delete jl.animationiteration.animation, delete jl.animationstart.animation), "TransitionEvent" in window || delete jl.transitionend.transition);
  function Pu(e) {
    if (Yf[e])
      return Yf[e];
    if (!jl[e])
      return e;
    var t = jl[e];
    for (var n in t)
      if (t.hasOwnProperty(n) && n in Cg)
        return Yf[e] = t[n];
    return e;
  }
  var jg = Pu("animationend"), Tg = Pu("animationiteration"), wg = Pu("animationstart"), _g = Pu("transitionend"), Og = /* @__PURE__ */ new Map(), Mg = ["abort", "auxClick", "cancel", "canPlay", "canPlayThrough", "click", "close", "contextMenu", "copy", "cut", "drag", "dragEnd", "dragEnter", "dragExit", "dragLeave", "dragOver", "dragStart", "drop", "durationChange", "emptied", "encrypted", "ended", "error", "gotPointerCapture", "input", "invalid", "keyDown", "keyPress", "keyUp", "load", "loadedData", "loadedMetadata", "loadStart", "lostPointerCapture", "mouseDown", "mouseMove", "mouseOut", "mouseOver", "mouseUp", "paste", "pause", "play", "playing", "pointerCancel", "pointerDown", "pointerMove", "pointerOut", "pointerOver", "pointerUp", "progress", "rateChange", "reset", "resize", "seeked", "seeking", "stalled", "submit", "suspend", "timeUpdate", "touchCancel", "touchEnd", "touchStart", "volumeChange", "scroll", "toggle", "touchMove", "waiting", "wheel"];
  function Ir(e, t) {
    Og.set(e, t), Gt(t, [e]);
  }
  function TR() {
    for (var e = 0; e < Mg.length; e++) {
      var t = Mg[e], n = t.toLowerCase(), a = t[0].toUpperCase() + t.slice(1);
      Ir(n, "on" + a);
    }
    Ir(jg, "onAnimationEnd"), Ir(Tg, "onAnimationIteration"), Ir(wg, "onAnimationStart"), Ir("dblclick", "onDoubleClick"), Ir("focusin", "onFocus"), Ir("focusout", "onBlur"), Ir(_g, "onTransitionEnd");
  }
  function wR(e, t, n, a, r, i, l) {
    var u = Og.get(t);
    if (u !== void 0) {
      var c = kf, h = t;
      switch (t) {
        case "keypress":
          if (Lu(a) === 0)
            return;
        case "keydown":
        case "keyup":
          c = _0;
          break;
        case "focusin":
          h = "focus", c = zf;
          break;
        case "focusout":
          h = "blur", c = zf;
          break;
        case "beforeblur":
        case "afterblur":
          c = zf;
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
          c = rg;
          break;
        case "drag":
        case "dragend":
        case "dragenter":
        case "dragexit":
        case "dragleave":
        case "dragover":
        case "dragstart":
        case "drop":
          c = v0;
          break;
        case "touchcancel":
        case "touchend":
        case "touchmove":
        case "touchstart":
          c = V0;
          break;
        case jg:
        case Tg:
        case wg:
          c = y0;
          break;
        case _g:
          c = L0;
          break;
        case "scroll":
          c = m0;
          break;
        case "wheel":
          c = U0;
          break;
        case "copy":
        case "cut":
        case "paste":
          c = x0;
          break;
        case "gotpointercapture":
        case "lostpointercapture":
        case "pointercancel":
        case "pointerdown":
        case "pointermove":
        case "pointerout":
        case "pointerover":
        case "pointerup":
          c = lg;
          break;
      }
      var v = (i & Do) !== 0;
      {
        var C = !v && // TODO: ideally, we'd eventually add all events from
        // nonDelegatedEvents list in DOMPluginEventSystem.
        // Then we can remove this special list.
        // This is a breaking change that can wait until React 18.
        t === "scroll", D = VR(n, u, a.type, v, C);
        if (D.length > 0) {
          var M = new c(u, h, null, a, r);
          e.push({
            event: M,
            listeners: D
          });
        }
      }
    }
  }
  TR(), cR(), X0(), RR(), P0();
  function _R(e, t, n, a, r, i, l) {
    wR(e, t, n, a, r, i);
    var u = (i & CE) === 0;
    u && (dR(e, t, n, a, r), uR(e, t, n, a, r), jR(e, t, n, a, r), W0(e, t, n, a, r));
  }
  var es = ["abort", "canplay", "canplaythrough", "durationchange", "emptied", "encrypted", "ended", "error", "loadeddata", "loadedmetadata", "loadstart", "pause", "play", "playing", "progress", "ratechange", "resize", "seeked", "seeking", "stalled", "suspend", "timeupdate", "volumechange", "waiting"], qf = new Set(["cancel", "close", "invalid", "load", "scroll", "toggle"].concat(es));
  function Vg(e, t, n) {
    var a = e.type || "unknown-event";
    e.currentTarget = n, FE(a, t, void 0, e), e.currentTarget = null;
  }
  function OR(e, t, n) {
    var a;
    if (n)
      for (var r = t.length - 1; r >= 0; r--) {
        var i = t[r], l = i.instance, u = i.currentTarget, c = i.listener;
        if (l !== a && e.isPropagationStopped())
          return;
        Vg(e, c, u), a = l;
      }
    else
      for (var h = 0; h < t.length; h++) {
        var v = t[h], C = v.instance, D = v.currentTarget, M = v.listener;
        if (C !== a && e.isPropagationStopped())
          return;
        Vg(e, M, D), a = C;
      }
  }
  function Ag(e, t) {
    for (var n = (t & Do) !== 0, a = 0; a < e.length; a++) {
      var r = e[a], i = r.event, l = r.listeners;
      OR(i, l, n);
    }
    zE();
  }
  function MR(e, t, n, a, r) {
    var i = zd(n), l = [];
    _R(l, e, a, n, i, t), Ag(l, t);
  }
  function Ct(e, t) {
    qf.has(e) || d('Did not expect a listenToNonDelegatedEvent() call for "%s". This is a bug in React. Please file an issue.', e);
    var n = !1, a = sC(t), r = kR(e);
    a.has(r) || (Lg(t, e, Fd, n), a.add(r));
  }
  function Gf(e, t, n) {
    qf.has(e) && !t && d('Did not expect a listenToNativeEvent() call for "%s" in the bubble phase. This is a bug in React. Please file an issue.', e);
    var a = 0;
    t && (a |= Do), Lg(n, e, a, t);
  }
  var Hu = "_reactListening" + Math.random().toString(36).slice(2);
  function ts(e) {
    if (!e[Hu]) {
      e[Hu] = !0, Et.forEach(function(n) {
        n !== "selectionchange" && (qf.has(n) || Gf(n, !1, e), Gf(n, !0, e));
      });
      var t = e.nodeType === mr ? e : e.ownerDocument;
      t !== null && (t[Hu] || (t[Hu] = !0, Gf("selectionchange", !1, t)));
    }
  }
  function Lg(e, t, n, a, r) {
    var i = a0(e, t, n), l = void 0;
    Bd && (t === "touchstart" || t === "touchmove" || t === "wheel") && (l = !0), e = e, a ? l !== void 0 ? u0(e, t, i, l) : s0(e, t, i) : l !== void 0 ? c0(e, t, i, l) : o0(e, t, i);
  }
  function kg(e, t) {
    return e === t || e.nodeType === It && e.parentNode === t;
  }
  function Wf(e, t, n, a, r) {
    var i = a;
    if (!(t & cv) && !(t & Fd)) {
      var l = r;
      if (a !== null) {
        var u = a;
        e: for (; ; ) {
          if (u === null)
            return;
          var c = u.tag;
          if (c === x || c === T) {
            var h = u.stateNode.containerInfo;
            if (kg(h, l))
              break;
            if (c === T)
              for (var v = u.return; v !== null; ) {
                var C = v.tag;
                if (C === x || C === T) {
                  var D = v.stateNode.containerInfo;
                  if (kg(D, l))
                    return;
                }
                v = v.return;
              }
            for (; h !== null; ) {
              var M = Li(h);
              if (M === null)
                return;
              var A = M.tag;
              if (A === L || A === te) {
                u = i = M;
                continue e;
              }
              h = h.parentNode;
            }
          }
          u = u.return;
        }
      }
    }
    vv(function() {
      return MR(e, t, n, i);
    });
  }
  function ns(e, t, n) {
    return {
      instance: e,
      listener: t,
      currentTarget: n
    };
  }
  function VR(e, t, n, a, r, i) {
    for (var l = t !== null ? t + "Capture" : null, u = a ? l : t, c = [], h = e, v = null; h !== null; ) {
      var C = h, D = C.stateNode, M = C.tag;
      if (M === L && D !== null && (v = D, u !== null)) {
        var A = jo(h, u);
        A != null && c.push(ns(h, A, v));
      }
      if (r)
        break;
      h = h.return;
    }
    return c;
  }
  function Bu(e, t) {
    for (var n = t + "Capture", a = [], r = e; r !== null; ) {
      var i = r, l = i.stateNode, u = i.tag;
      if (u === L && l !== null) {
        var c = l, h = jo(r, n);
        h != null && a.unshift(ns(r, h, c));
        var v = jo(r, t);
        v != null && a.push(ns(r, v, c));
      }
      r = r.return;
    }
    return a;
  }
  function Tl(e) {
    if (e === null)
      return null;
    do
      e = e.return;
    while (e && e.tag !== L);
    return e || null;
  }
  function AR(e, t) {
    for (var n = e, a = t, r = 0, i = n; i; i = Tl(i))
      r++;
    for (var l = 0, u = a; u; u = Tl(u))
      l++;
    for (; r - l > 0; )
      n = Tl(n), r--;
    for (; l - r > 0; )
      a = Tl(a), l--;
    for (var c = r; c--; ) {
      if (n === a || a !== null && n === a.alternate)
        return n;
      n = Tl(n), a = Tl(a);
    }
    return null;
  }
  function Ug(e, t, n, a, r) {
    for (var i = t._reactName, l = [], u = n; u !== null && u !== a; ) {
      var c = u, h = c.alternate, v = c.stateNode, C = c.tag;
      if (h !== null && h === a)
        break;
      if (C === L && v !== null) {
        var D = v;
        if (r) {
          var M = jo(u, i);
          M != null && l.unshift(ns(u, M, D));
        } else if (!r) {
          var A = jo(u, i);
          A != null && l.push(ns(u, A, D));
        }
      }
      u = u.return;
    }
    l.length !== 0 && e.push({
      event: t,
      listeners: l
    });
  }
  function LR(e, t, n, a, r) {
    var i = a && r ? AR(a, r) : null;
    a !== null && Ug(e, t, a, i, !1), r !== null && n !== null && Ug(e, n, r, i, !0);
  }
  function kR(e, t) {
    return e + "__bubble";
  }
  var qn = !1, as = "dangerouslySetInnerHTML", $u = "suppressContentEditableWarning", Yr = "suppressHydrationWarning", Fg = "autoFocus", Vi = "children", Ai = "style", Iu = "__html", Kf, Yu, rs, zg, qu, Pg, Hg;
  Kf = {
    // There are working polyfills for <dialog>. Let people use it.
    dialog: !0,
    // Electron ships a custom <webview> tag to display external web content in
    // an isolated frame and process.
    // This tag is not present in non Electron environments such as JSDom which
    // is often used for testing purposes.
    // @see https://electronjs.org/docs/api/webview-tag
    webview: !0
  }, Yu = function(e, t) {
    yE(e, t), NE(e, t), DE(e, t, {
      registrationNameDependencies: Vt,
      possibleRegistrationNames: An
    });
  }, Pg = Z && !document.documentMode, rs = function(e, t, n) {
    if (!qn) {
      var a = Gu(n), r = Gu(t);
      r !== a && (qn = !0, d("Prop `%s` did not match. Server: %s Client: %s", e, JSON.stringify(r), JSON.stringify(a)));
    }
  }, zg = function(e) {
    if (!qn) {
      qn = !0;
      var t = [];
      e.forEach(function(n) {
        t.push(n);
      }), d("Extra attributes from the server: %s", t);
    }
  }, qu = function(e, t) {
    t === !1 ? d("Expected `%s` listener to be a function, instead got `false`.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.", e, e, e) : d("Expected `%s` listener to be a function, instead got a value of `%s` type.", e, typeof t);
  }, Hg = function(e, t) {
    var n = e.namespaceURI === dr ? e.ownerDocument.createElement(e.tagName) : e.ownerDocument.createElementNS(e.namespaceURI, e.tagName);
    return n.innerHTML = t, n.innerHTML;
  };
  var UR = /\r\n?/g, FR = /\u0000|\uFFFD/g;
  function Gu(e) {
    Dn(e);
    var t = typeof e == "string" ? e : "" + e;
    return t.replace(UR, `
`).replace(FR, "");
  }
  function Wu(e, t, n, a) {
    var r = Gu(t), i = Gu(e);
    if (i !== r && (a && (qn || (qn = !0, d('Text content did not match. Server: "%s" Client: "%s"', i, r))), n && q))
      throw new Error("Text content does not match server-rendered HTML.");
  }
  function Bg(e) {
    return e.nodeType === mr ? e : e.ownerDocument;
  }
  function zR() {
  }
  function Ku(e) {
    e.onclick = zR;
  }
  function PR(e, t, n, a, r) {
    for (var i in a)
      if (a.hasOwnProperty(i)) {
        var l = a[i];
        if (i === Ai)
          l && Object.freeze(l), rv(t, l);
        else if (i === as) {
          var u = l ? l[Iu] : void 0;
          u != null && Zh(t, u);
        } else if (i === Vi)
          if (typeof l == "string") {
            var c = e !== "textarea" || l !== "";
            c && bu(t, l);
          } else typeof l == "number" && bu(t, "" + l);
        else i === $u || i === Yr || i === Fg || (Vt.hasOwnProperty(i) ? l != null && (typeof l != "function" && qu(i, l), i === "onScroll" && Ct("scroll", t)) : l != null && Ra(t, i, l, r));
      }
  }
  function HR(e, t, n, a) {
    for (var r = 0; r < t.length; r += 2) {
      var i = t[r], l = t[r + 1];
      i === Ai ? rv(e, l) : i === as ? Zh(e, l) : i === Vi ? bu(e, l) : Ra(e, i, l, a);
    }
  }
  function BR(e, t, n, a) {
    var r, i = Bg(n), l, u = a;
    if (u === dr && (u = Md(e)), u === dr) {
      if (r = Ei(e, t), !r && e !== e.toLowerCase() && d("<%s /> is using incorrect casing. Use PascalCase for React components, or lowercase for HTML elements.", e), e === "script") {
        var c = i.createElement("div");
        c.innerHTML = "<script><\/script>";
        var h = c.firstChild;
        l = c.removeChild(h);
      } else if (typeof t.is == "string")
        l = i.createElement(e, {
          is: t.is
        });
      else if (l = i.createElement(e), e === "select") {
        var v = l;
        t.multiple ? v.multiple = !0 : t.size && (v.size = t.size);
      }
    } else
      l = i.createElementNS(u, e);
    return u === dr && !r && Object.prototype.toString.call(l) === "[object HTMLUnknownElement]" && !Ge.call(Kf, e) && (Kf[e] = !0, d("The tag <%s> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.", e)), l;
  }
  function $R(e, t) {
    return Bg(t).createTextNode(e);
  }
  function IR(e, t, n, a) {
    var r = Ei(t, n);
    Yu(t, n);
    var i;
    switch (t) {
      case "dialog":
        Ct("cancel", e), Ct("close", e), i = n;
        break;
      case "iframe":
      case "object":
      case "embed":
        Ct("load", e), i = n;
        break;
      case "video":
      case "audio":
        for (var l = 0; l < es.length; l++)
          Ct(es[l], e);
        i = n;
        break;
      case "source":
        Ct("error", e), i = n;
        break;
      case "img":
      case "image":
      case "link":
        Ct("error", e), Ct("load", e), i = n;
        break;
      case "details":
        Ct("toggle", e), i = n;
        break;
      case "input":
        hu(e, n), i = No(e, n), Ct("invalid", e);
        break;
      case "option":
        dt(e, n), i = n;
        break;
      case "select":
        So(e, n), i = Eo(e, n), Ct("invalid", e);
        break;
      case "textarea":
        Qh(e, n), i = _d(e, n), Ct("invalid", e);
        break;
      default:
        i = n;
    }
    switch (Ud(t, i), PR(t, e, a, i, r), t) {
      case "input":
        Ni(e), V(e, n, !1);
        break;
      case "textarea":
        Ni(e), Jh(e);
        break;
      case "option":
        yt(e, n);
        break;
      case "select":
        Td(e, n);
        break;
      default:
        typeof i.onClick == "function" && Ku(e);
        break;
    }
  }
  function YR(e, t, n, a, r) {
    Yu(t, a);
    var i = null, l, u;
    switch (t) {
      case "input":
        l = No(e, n), u = No(e, a), i = [];
        break;
      case "select":
        l = Eo(e, n), u = Eo(e, a), i = [];
        break;
      case "textarea":
        l = _d(e, n), u = _d(e, a), i = [];
        break;
      default:
        l = n, u = a, typeof l.onClick != "function" && typeof u.onClick == "function" && Ku(e);
        break;
    }
    Ud(t, u);
    var c, h, v = null;
    for (c in l)
      if (!(u.hasOwnProperty(c) || !l.hasOwnProperty(c) || l[c] == null))
        if (c === Ai) {
          var C = l[c];
          for (h in C)
            C.hasOwnProperty(h) && (v || (v = {}), v[h] = "");
        } else c === as || c === Vi || c === $u || c === Yr || c === Fg || (Vt.hasOwnProperty(c) ? i || (i = []) : (i = i || []).push(c, null));
    for (c in u) {
      var D = u[c], M = l != null ? l[c] : void 0;
      if (!(!u.hasOwnProperty(c) || D === M || D == null && M == null))
        if (c === Ai)
          if (D && Object.freeze(D), M) {
            for (h in M)
              M.hasOwnProperty(h) && (!D || !D.hasOwnProperty(h)) && (v || (v = {}), v[h] = "");
            for (h in D)
              D.hasOwnProperty(h) && M[h] !== D[h] && (v || (v = {}), v[h] = D[h]);
          } else
            v || (i || (i = []), i.push(c, v)), v = D;
        else if (c === as) {
          var A = D ? D[Iu] : void 0, B = M ? M[Iu] : void 0;
          A != null && B !== A && (i = i || []).push(c, A);
        } else c === Vi ? (typeof D == "string" || typeof D == "number") && (i = i || []).push(c, "" + D) : c === $u || c === Yr || (Vt.hasOwnProperty(c) ? (D != null && (typeof D != "function" && qu(c, D), c === "onScroll" && Ct("scroll", e)), !i && M !== D && (i = [])) : (i = i || []).push(c, D));
    }
    return v && (dE(v, u[Ai]), (i = i || []).push(Ai, v)), i;
  }
  function qR(e, t, n, a, r) {
    n === "input" && r.type === "radio" && r.name != null && m(e, r);
    var i = Ei(n, a), l = Ei(n, r);
    switch (HR(e, t, i, l), n) {
      case "input":
        N(e, r);
        break;
      case "textarea":
        Xh(e, r);
        break;
      case "select":
        vu(e, r);
        break;
    }
  }
  function GR(e) {
    {
      var t = e.toLowerCase();
      return yu.hasOwnProperty(t) && yu[t] || null;
    }
  }
  function WR(e, t, n, a, r, i, l) {
    var u, c;
    switch (u = Ei(t, n), Yu(t, n), t) {
      case "dialog":
        Ct("cancel", e), Ct("close", e);
        break;
      case "iframe":
      case "object":
      case "embed":
        Ct("load", e);
        break;
      case "video":
      case "audio":
        for (var h = 0; h < es.length; h++)
          Ct(es[h], e);
        break;
      case "source":
        Ct("error", e);
        break;
      case "img":
      case "image":
      case "link":
        Ct("error", e), Ct("load", e);
        break;
      case "details":
        Ct("toggle", e);
        break;
      case "input":
        hu(e, n), Ct("invalid", e);
        break;
      case "option":
        dt(e, n);
        break;
      case "select":
        So(e, n), Ct("invalid", e);
        break;
      case "textarea":
        Qh(e, n), Ct("invalid", e);
        break;
    }
    Ud(t, n);
    {
      c = /* @__PURE__ */ new Set();
      for (var v = e.attributes, C = 0; C < v.length; C++) {
        var D = v[C].name.toLowerCase();
        switch (D) {
          case "value":
            break;
          case "checked":
            break;
          case "selected":
            break;
          default:
            c.add(v[C].name);
        }
      }
    }
    var M = null;
    for (var A in n)
      if (n.hasOwnProperty(A)) {
        var B = n[A];
        if (A === Vi)
          typeof B == "string" ? e.textContent !== B && (n[Yr] !== !0 && Wu(e.textContent, B, i, l), M = [Vi, B]) : typeof B == "number" && e.textContent !== "" + B && (n[Yr] !== !0 && Wu(e.textContent, B, i, l), M = [Vi, "" + B]);
        else if (Vt.hasOwnProperty(A))
          B != null && (typeof B != "function" && qu(A, B), A === "onScroll" && Ct("scroll", e));
        else if (l && // Convince Flow we've calculated it (it's DEV-only in this method.)
        typeof u == "boolean") {
          var ve = void 0, je = At(A);
          if (n[Yr] !== !0) {
            if (!(A === $u || A === Yr || // Controlled attributes are not validated
            // TODO: Only ignore them on controlled tags.
            A === "value" || A === "checked" || A === "selected")) {
              if (A === as) {
                var Se = e.innerHTML, Ze = B ? B[Iu] : void 0;
                if (Ze != null) {
                  var qe = Hg(e, Ze);
                  qe !== Se && rs(A, Se, qe);
                }
              } else if (A === Ai) {
                if (c.delete(A), Pg) {
                  var _ = uE(B);
                  ve = e.getAttribute("style"), _ !== ve && rs(A, ve, _);
                }
              } else if (u && !et)
                c.delete(A.toLowerCase()), ve = fi(e, A, B), B !== ve && rs(A, ve, B);
              else if (!_t(A, je, u) && !Cn(A, B, je, u)) {
                var $ = !1;
                if (je !== null)
                  c.delete(je.attributeName), ve = el(e, A, B, je);
                else {
                  var O = a;
                  if (O === dr && (O = Md(t)), O === dr)
                    c.delete(A.toLowerCase());
                  else {
                    var ae = GR(A);
                    ae !== null && ae !== A && ($ = !0, c.delete(ae)), c.delete(A);
                  }
                  ve = fi(e, A, B);
                }
                var Ne = et;
                !Ne && B !== ve && !$ && rs(A, ve, B);
              }
            }
          }
        }
      }
    switch (l && // $FlowFixMe - Should be inferred as not undefined.
    c.size > 0 && n[Yr] !== !0 && zg(c), t) {
      case "input":
        Ni(e), V(e, n, !0);
        break;
      case "textarea":
        Ni(e), Jh(e);
        break;
      case "select":
      case "option":
        break;
      default:
        typeof n.onClick == "function" && Ku(e);
        break;
    }
    return M;
  }
  function KR(e, t, n) {
    var a = e.nodeValue !== t;
    return a;
  }
  function Qf(e, t) {
    {
      if (qn)
        return;
      qn = !0, d("Did not expect server HTML to contain a <%s> in <%s>.", t.nodeName.toLowerCase(), e.nodeName.toLowerCase());
    }
  }
  function Xf(e, t) {
    {
      if (qn)
        return;
      qn = !0, d('Did not expect server HTML to contain the text node "%s" in <%s>.', t.nodeValue, e.nodeName.toLowerCase());
    }
  }
  function Jf(e, t, n) {
    {
      if (qn)
        return;
      qn = !0, d("Expected server HTML to contain a matching <%s> in <%s>.", t, e.nodeName.toLowerCase());
    }
  }
  function Zf(e, t) {
    {
      if (t === "" || qn)
        return;
      qn = !0, d('Expected server HTML to contain a matching text node for "%s" in <%s>.', t, e.nodeName.toLowerCase());
    }
  }
  function QR(e, t, n) {
    switch (t) {
      case "input":
        H(e, n);
        return;
      case "textarea":
        Ix(e, n);
        return;
      case "select":
        wd(e, n);
        return;
    }
  }
  var is = function() {
  }, ls = function() {
  };
  {
    var XR = ["address", "applet", "area", "article", "aside", "base", "basefont", "bgsound", "blockquote", "body", "br", "button", "caption", "center", "col", "colgroup", "dd", "details", "dir", "div", "dl", "dt", "embed", "fieldset", "figcaption", "figure", "footer", "form", "frame", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "iframe", "img", "input", "isindex", "li", "link", "listing", "main", "marquee", "menu", "menuitem", "meta", "nav", "noembed", "noframes", "noscript", "object", "ol", "p", "param", "plaintext", "pre", "script", "section", "select", "source", "style", "summary", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "title", "tr", "track", "ul", "wbr", "xmp"], $g = [
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
    ], JR = $g.concat(["button"]), ZR = ["dd", "dt", "li", "option", "optgroup", "p", "rp", "rt"], Ig = {
      current: null,
      formTag: null,
      aTagInScope: null,
      buttonTagInScope: null,
      nobrTagInScope: null,
      pTagInButtonScope: null,
      listItemTagAutoclosing: null,
      dlItemTagAutoclosing: null
    };
    ls = function(e, t) {
      var n = Ie({}, e || Ig), a = {
        tag: t
      };
      return $g.indexOf(t) !== -1 && (n.aTagInScope = null, n.buttonTagInScope = null, n.nobrTagInScope = null), JR.indexOf(t) !== -1 && (n.pTagInButtonScope = null), XR.indexOf(t) !== -1 && t !== "address" && t !== "div" && t !== "p" && (n.listItemTagAutoclosing = null, n.dlItemTagAutoclosing = null), n.current = a, t === "form" && (n.formTag = a), t === "a" && (n.aTagInScope = a), t === "button" && (n.buttonTagInScope = a), t === "nobr" && (n.nobrTagInScope = a), t === "p" && (n.pTagInButtonScope = a), t === "li" && (n.listItemTagAutoclosing = a), (t === "dd" || t === "dt") && (n.dlItemTagAutoclosing = a), n;
    };
    var eD = function(e, t) {
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
          return ZR.indexOf(t) === -1;
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
    }, tD = function(e, t) {
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
    }, Yg = {};
    is = function(e, t, n) {
      n = n || Ig;
      var a = n.current, r = a && a.tag;
      t != null && (e != null && d("validateDOMNesting: when childText is passed, childTag should be null"), e = "#text");
      var i = eD(e, r) ? null : a, l = i ? null : tD(e, n), u = i || l;
      if (u) {
        var c = u.tag, h = !!i + "|" + e + "|" + c;
        if (!Yg[h]) {
          Yg[h] = !0;
          var v = e, C = "";
          if (e === "#text" ? /\S/.test(t) ? v = "Text nodes" : (v = "Whitespace text nodes", C = " Make sure you don't have any extra whitespace between tags on each line of your source code.") : v = "<" + e + ">", i) {
            var D = "";
            c === "table" && e === "tr" && (D += " Add a <tbody>, <thead> or <tfoot> to your code to match the DOM tree generated by the browser."), d("validateDOMNesting(...): %s cannot appear as a child of <%s>.%s%s", v, c, C, D);
          } else
            d("validateDOMNesting(...): %s cannot appear as a descendant of <%s>.", v, c);
        }
      }
    };
  }
  var Qu = "suppressHydrationWarning", Xu = "$", Ju = "/$", os = "$?", ss = "$!", nD = "style", em = null, tm = null;
  function aD(e) {
    var t, n, a = e.nodeType;
    switch (a) {
      case mr:
      case Ad: {
        t = a === mr ? "#document" : "#fragment";
        var r = e.documentElement;
        n = r ? r.namespaceURI : Vd(null, "");
        break;
      }
      default: {
        var i = a === It ? e.parentNode : e, l = i.namespaceURI || null;
        t = i.tagName, n = Vd(l, t);
        break;
      }
    }
    {
      var u = t.toLowerCase(), c = ls(null, u);
      return {
        namespace: n,
        ancestorInfo: c
      };
    }
  }
  function rD(e, t, n) {
    {
      var a = e, r = Vd(a.namespace, t), i = ls(a.ancestorInfo, t);
      return {
        namespace: r,
        ancestorInfo: i
      };
    }
  }
  function nO(e) {
    return e;
  }
  function iD(e) {
    em = n0(), tm = yR();
    var t = null;
    return Zv(!1), t;
  }
  function lD(e) {
    NR(tm), Zv(em), em = null, tm = null;
  }
  function oD(e, t, n, a, r) {
    var i;
    {
      var l = a;
      if (is(e, null, l.ancestorInfo), typeof t.children == "string" || typeof t.children == "number") {
        var u = "" + t.children, c = ls(l.ancestorInfo, e);
        is(null, u, c);
      }
      i = l.namespace;
    }
    var h = BR(e, t, n, i);
    return ds(r, h), um(h, t), h;
  }
  function sD(e, t) {
    e.appendChild(t);
  }
  function uD(e, t, n, a, r) {
    switch (IR(e, t, n, a), t) {
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
  function cD(e, t, n, a, r, i) {
    {
      var l = i;
      if (typeof a.children != typeof n.children && (typeof a.children == "string" || typeof a.children == "number")) {
        var u = "" + a.children, c = ls(l.ancestorInfo, t);
        is(null, u, c);
      }
    }
    return YR(e, t, n, a);
  }
  function nm(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  function dD(e, t, n, a) {
    {
      var r = n;
      is(null, e, r.ancestorInfo);
    }
    var i = $R(e, t);
    return ds(a, i), i;
  }
  function fD() {
    var e = window.event;
    return e === void 0 ? yr : eg(e.type);
  }
  var am = typeof setTimeout == "function" ? setTimeout : void 0, mD = typeof clearTimeout == "function" ? clearTimeout : void 0, rm = -1, qg = typeof Promise == "function" ? Promise : void 0, pD = typeof queueMicrotask == "function" ? queueMicrotask : typeof qg < "u" ? function(e) {
    return qg.resolve(null).then(e).catch(hD);
  } : am;
  function hD(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function vD(e, t, n, a) {
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
  function gD(e, t, n, a, r, i) {
    qR(e, t, n, a, r), um(e, r);
  }
  function Gg(e) {
    bu(e, "");
  }
  function bD(e, t, n) {
    e.nodeValue = n;
  }
  function yD(e, t) {
    e.appendChild(t);
  }
  function ND(e, t) {
    var n;
    e.nodeType === It ? (n = e.parentNode, n.insertBefore(t, e)) : (n = e, n.appendChild(t));
    var a = e._reactRootContainer;
    a == null && n.onclick === null && Ku(n);
  }
  function xD(e, t, n) {
    e.insertBefore(t, n);
  }
  function ED(e, t, n) {
    e.nodeType === It ? e.parentNode.insertBefore(t, n) : e.insertBefore(t, n);
  }
  function SD(e, t) {
    e.removeChild(t);
  }
  function RD(e, t) {
    e.nodeType === It ? e.parentNode.removeChild(t) : e.removeChild(t);
  }
  function im(e, t) {
    var n = t, a = 0;
    do {
      var r = n.nextSibling;
      if (e.removeChild(n), r && r.nodeType === It) {
        var i = r.data;
        if (i === Ju)
          if (a === 0) {
            e.removeChild(r), Io(t);
            return;
          } else
            a--;
        else (i === Xu || i === os || i === ss) && a++;
      }
      n = r;
    } while (n);
    Io(t);
  }
  function DD(e, t) {
    e.nodeType === It ? im(e.parentNode, t) : e.nodeType === Yn && im(e, t), Io(e);
  }
  function CD(e) {
    e = e;
    var t = e.style;
    typeof t.setProperty == "function" ? t.setProperty("display", "none", "important") : t.display = "none";
  }
  function jD(e) {
    e.nodeValue = "";
  }
  function TD(e, t) {
    e = e;
    var n = t[nD], a = n != null && n.hasOwnProperty("display") ? n.display : null;
    e.style.display = Ld("display", a);
  }
  function wD(e, t) {
    e.nodeValue = t;
  }
  function _D(e) {
    e.nodeType === Yn ? e.textContent = "" : e.nodeType === mr && e.documentElement && e.removeChild(e.documentElement);
  }
  function OD(e, t, n) {
    return e.nodeType !== Yn || t.toLowerCase() !== e.nodeName.toLowerCase() ? null : e;
  }
  function MD(e, t) {
    return t === "" || e.nodeType !== fr ? null : e;
  }
  function VD(e) {
    return e.nodeType !== It ? null : e;
  }
  function Wg(e) {
    return e.data === os;
  }
  function lm(e) {
    return e.data === ss;
  }
  function AD(e) {
    var t = e.nextSibling && e.nextSibling.dataset, n, a, r;
    return t && (n = t.dgst, a = t.msg, r = t.stck), {
      message: a,
      digest: n,
      stack: r
    };
  }
  function LD(e, t) {
    e._reactRetry = t;
  }
  function Zu(e) {
    for (; e != null; e = e.nextSibling) {
      var t = e.nodeType;
      if (t === Yn || t === fr)
        break;
      if (t === It) {
        var n = e.data;
        if (n === Xu || n === ss || n === os)
          break;
        if (n === Ju)
          return null;
      }
    }
    return e;
  }
  function us(e) {
    return Zu(e.nextSibling);
  }
  function kD(e) {
    return Zu(e.firstChild);
  }
  function UD(e) {
    return Zu(e.firstChild);
  }
  function FD(e) {
    return Zu(e.nextSibling);
  }
  function zD(e, t, n, a, r, i, l) {
    ds(i, e), um(e, n);
    var u;
    {
      var c = r;
      u = c.namespace;
    }
    var h = (i.mode & Xe) !== we;
    return WR(e, t, n, u, a, h, l);
  }
  function PD(e, t, n, a) {
    return ds(n, e), n.mode & Xe, KR(e, t);
  }
  function HD(e, t) {
    ds(t, e);
  }
  function BD(e) {
    for (var t = e.nextSibling, n = 0; t; ) {
      if (t.nodeType === It) {
        var a = t.data;
        if (a === Ju) {
          if (n === 0)
            return us(t);
          n--;
        } else (a === Xu || a === ss || a === os) && n++;
      }
      t = t.nextSibling;
    }
    return null;
  }
  function Kg(e) {
    for (var t = e.previousSibling, n = 0; t; ) {
      if (t.nodeType === It) {
        var a = t.data;
        if (a === Xu || a === ss || a === os) {
          if (n === 0)
            return t;
          n--;
        } else a === Ju && n++;
      }
      t = t.previousSibling;
    }
    return null;
  }
  function $D(e) {
    Io(e);
  }
  function ID(e) {
    Io(e);
  }
  function YD(e) {
    return e !== "head" && e !== "body";
  }
  function qD(e, t, n, a) {
    var r = !0;
    Wu(t.nodeValue, n, a, r);
  }
  function GD(e, t, n, a, r, i) {
    if (t[Qu] !== !0) {
      var l = !0;
      Wu(a.nodeValue, r, i, l);
    }
  }
  function WD(e, t) {
    t.nodeType === Yn ? Qf(e, t) : t.nodeType === It || Xf(e, t);
  }
  function KD(e, t) {
    {
      var n = e.parentNode;
      n !== null && (t.nodeType === Yn ? Qf(n, t) : t.nodeType === It || Xf(n, t));
    }
  }
  function QD(e, t, n, a, r) {
    (r || t[Qu] !== !0) && (a.nodeType === Yn ? Qf(n, a) : a.nodeType === It || Xf(n, a));
  }
  function XD(e, t, n) {
    Jf(e, t);
  }
  function JD(e, t) {
    Zf(e, t);
  }
  function ZD(e, t, n) {
    {
      var a = e.parentNode;
      a !== null && Jf(a, t);
    }
  }
  function eC(e, t) {
    {
      var n = e.parentNode;
      n !== null && Zf(n, t);
    }
  }
  function tC(e, t, n, a, r, i) {
    (i || t[Qu] !== !0) && Jf(n, a);
  }
  function nC(e, t, n, a, r) {
    (r || t[Qu] !== !0) && Zf(n, a);
  }
  function aC(e) {
    d("An error occurred during hydration. The server HTML was replaced with client content in <%s>.", e.nodeName.toLowerCase());
  }
  function rC(e) {
    ts(e);
  }
  var wl = Math.random().toString(36).slice(2), _l = "__reactFiber$" + wl, om = "__reactProps$" + wl, cs = "__reactContainer$" + wl, sm = "__reactEvents$" + wl, iC = "__reactListeners$" + wl, lC = "__reactHandles$" + wl;
  function oC(e) {
    delete e[_l], delete e[om], delete e[sm], delete e[iC], delete e[lC];
  }
  function ds(e, t) {
    t[_l] = e;
  }
  function ec(e, t) {
    t[cs] = e;
  }
  function Qg(e) {
    e[cs] = null;
  }
  function fs(e) {
    return !!e[cs];
  }
  function Li(e) {
    var t = e[_l];
    if (t)
      return t;
    for (var n = e.parentNode; n; ) {
      if (t = n[cs] || n[_l], t) {
        var a = t.alternate;
        if (t.child !== null || a !== null && a.child !== null)
          for (var r = Kg(e); r !== null; ) {
            var i = r[_l];
            if (i)
              return i;
            r = Kg(r);
          }
        return t;
      }
      e = n, n = e.parentNode;
    }
    return null;
  }
  function qr(e) {
    var t = e[_l] || e[cs];
    return t && (t.tag === L || t.tag === te || t.tag === ee || t.tag === x) ? t : null;
  }
  function Ol(e) {
    if (e.tag === L || e.tag === te)
      return e.stateNode;
    throw new Error("getNodeFromInstance: Invalid argument.");
  }
  function tc(e) {
    return e[om] || null;
  }
  function um(e, t) {
    e[om] = t;
  }
  function sC(e) {
    var t = e[sm];
    return t === void 0 && (t = e[sm] = /* @__PURE__ */ new Set()), t;
  }
  var Xg = {}, Jg = p.ReactDebugCurrentFrame;
  function nc(e) {
    if (e) {
      var t = e._owner, n = po(e.type, e._source, t ? t.type : null);
      Jg.setExtraStackFrame(n);
    } else
      Jg.setExtraStackFrame(null);
  }
  function _a(e, t, n, a, r) {
    {
      var i = Function.call.bind(Ge);
      for (var l in e)
        if (i(e, l)) {
          var u = void 0;
          try {
            if (typeof e[l] != "function") {
              var c = Error((a || "React class") + ": " + n + " type `" + l + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof e[l] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
              throw c.name = "Invariant Violation", c;
            }
            u = e[l](t, l, a, n, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
          } catch (h) {
            u = h;
          }
          u && !(u instanceof Error) && (nc(r), d("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", a || "React class", n, l, typeof u), nc(null)), u instanceof Error && !(u.message in Xg) && (Xg[u.message] = !0, nc(r), d("Failed %s type: %s", n, u.message), nc(null));
        }
    }
  }
  var cm = [], ac;
  ac = [];
  var Nr = -1;
  function Gr(e) {
    return {
      current: e
    };
  }
  function wn(e, t) {
    if (Nr < 0) {
      d("Unexpected pop.");
      return;
    }
    t !== ac[Nr] && d("Unexpected Fiber popped."), e.current = cm[Nr], cm[Nr] = null, ac[Nr] = null, Nr--;
  }
  function _n(e, t, n) {
    Nr++, cm[Nr] = e.current, ac[Nr] = n, e.current = t;
  }
  var dm;
  dm = {};
  var ra = {};
  Object.freeze(ra);
  var xr = Gr(ra), Qa = Gr(!1), fm = ra;
  function Ml(e, t, n) {
    return n && Xa(t) ? fm : xr.current;
  }
  function Zg(e, t, n) {
    {
      var a = e.stateNode;
      a.__reactInternalMemoizedUnmaskedChildContext = t, a.__reactInternalMemoizedMaskedChildContext = n;
    }
  }
  function Vl(e, t) {
    {
      var n = e.type, a = n.contextTypes;
      if (!a)
        return ra;
      var r = e.stateNode;
      if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
        return r.__reactInternalMemoizedMaskedChildContext;
      var i = {};
      for (var l in a)
        i[l] = t[l];
      {
        var u = ze(e) || "Unknown";
        _a(a, i, "context", u);
      }
      return r && Zg(e, t, i), i;
    }
  }
  function rc() {
    return Qa.current;
  }
  function Xa(e) {
    {
      var t = e.childContextTypes;
      return t != null;
    }
  }
  function ic(e) {
    wn(Qa, e), wn(xr, e);
  }
  function mm(e) {
    wn(Qa, e), wn(xr, e);
  }
  function eb(e, t, n) {
    {
      if (xr.current !== ra)
        throw new Error("Unexpected context found on stack. This error is likely caused by a bug in React. Please file an issue.");
      _n(xr, t, e), _n(Qa, n, e);
    }
  }
  function tb(e, t, n) {
    {
      var a = e.stateNode, r = t.childContextTypes;
      if (typeof a.getChildContext != "function") {
        {
          var i = ze(e) || "Unknown";
          dm[i] || (dm[i] = !0, d("%s.childContextTypes is specified but there is no getChildContext() method on the instance. You can either define getChildContext() on %s or remove childContextTypes from it.", i, i));
        }
        return n;
      }
      var l = a.getChildContext();
      for (var u in l)
        if (!(u in r))
          throw new Error((ze(e) || "Unknown") + '.getChildContext(): key "' + u + '" is not defined in childContextTypes.');
      {
        var c = ze(e) || "Unknown";
        _a(r, l, "child context", c);
      }
      return Ie({}, n, l);
    }
  }
  function lc(e) {
    {
      var t = e.stateNode, n = t && t.__reactInternalMemoizedMergedChildContext || ra;
      return fm = xr.current, _n(xr, n, e), _n(Qa, Qa.current, e), !0;
    }
  }
  function nb(e, t, n) {
    {
      var a = e.stateNode;
      if (!a)
        throw new Error("Expected to have an instance by this point. This error is likely caused by a bug in React. Please file an issue.");
      if (n) {
        var r = tb(e, t, fm);
        a.__reactInternalMemoizedMergedChildContext = r, wn(Qa, e), wn(xr, e), _n(xr, r, e), _n(Qa, n, e);
      } else
        wn(Qa, e), _n(Qa, n, e);
    }
  }
  function uC(e) {
    {
      if (!YE(e) || e.tag !== j)
        throw new Error("Expected subtree parent to be a mounted class component. This error is likely caused by a bug in React. Please file an issue.");
      var t = e;
      do {
        switch (t.tag) {
          case x:
            return t.stateNode.context;
          case j: {
            var n = t.type;
            if (Xa(n))
              return t.stateNode.__reactInternalMemoizedMergedChildContext;
            break;
          }
        }
        t = t.return;
      } while (t !== null);
      throw new Error("Found unexpected detached subtree parent. This error is likely caused by a bug in React. Please file an issue.");
    }
  }
  var Wr = 0, oc = 1, Er = null, pm = !1, hm = !1;
  function ab(e) {
    Er === null ? Er = [e] : Er.push(e);
  }
  function cC(e) {
    pm = !0, ab(e);
  }
  function rb() {
    pm && Kr();
  }
  function Kr() {
    if (!hm && Er !== null) {
      hm = !0;
      var e = 0, t = wa();
      try {
        var n = !0, a = Er;
        for (fn(ta); e < a.length; e++) {
          var r = a[e];
          do
            r = r(n);
          while (r !== null);
        }
        Er = null, pm = !1;
      } catch (i) {
        throw Er !== null && (Er = Er.slice(e + 1)), Tv(Su, Kr), i;
      } finally {
        fn(t), hm = !1;
      }
    }
    return null;
  }
  var Al = [], Ll = 0, sc = null, uc = 0, ma = [], pa = 0, ki = null, Sr = 1, Rr = "";
  function dC(e) {
    return Fi(), (e.flags & Nv) !== Oe;
  }
  function fC(e) {
    return Fi(), uc;
  }
  function mC() {
    var e = Rr, t = Sr, n = t & ~pC(t);
    return n.toString(32) + e;
  }
  function Ui(e, t) {
    Fi(), Al[Ll++] = uc, Al[Ll++] = sc, sc = e, uc = t;
  }
  function ib(e, t, n) {
    Fi(), ma[pa++] = Sr, ma[pa++] = Rr, ma[pa++] = ki, ki = e;
    var a = Sr, r = Rr, i = cc(a) - 1, l = a & ~(1 << i), u = n + 1, c = cc(t) + i;
    if (c > 30) {
      var h = i - i % 5, v = (1 << h) - 1, C = (l & v).toString(32), D = l >> h, M = i - h, A = cc(t) + M, B = u << M, ve = B | D, je = C + r;
      Sr = 1 << A | ve, Rr = je;
    } else {
      var Se = u << i, Ze = Se | l, qe = r;
      Sr = 1 << c | Ze, Rr = qe;
    }
  }
  function vm(e) {
    Fi();
    var t = e.return;
    if (t !== null) {
      var n = 1, a = 0;
      Ui(e, n), ib(e, n, a);
    }
  }
  function cc(e) {
    return 32 - Av(e);
  }
  function pC(e) {
    return 1 << cc(e) - 1;
  }
  function gm(e) {
    for (; e === sc; )
      sc = Al[--Ll], Al[Ll] = null, uc = Al[--Ll], Al[Ll] = null;
    for (; e === ki; )
      ki = ma[--pa], ma[pa] = null, Rr = ma[--pa], ma[pa] = null, Sr = ma[--pa], ma[pa] = null;
  }
  function hC() {
    return Fi(), ki !== null ? {
      id: Sr,
      overflow: Rr
    } : null;
  }
  function vC(e, t) {
    Fi(), ma[pa++] = Sr, ma[pa++] = Rr, ma[pa++] = ki, Sr = t.id, Rr = t.overflow, ki = e;
  }
  function Fi() {
    gn() || d("Expected to be hydrating. This is a bug in React. Please file an issue.");
  }
  var vn = null, ha = null, Oa = !1, zi = !1, Qr = null;
  function gC() {
    Oa && d("We should not be hydrating here. This is a bug in React. Please file a bug.");
  }
  function lb() {
    zi = !0;
  }
  function bC() {
    return zi;
  }
  function yC(e) {
    var t = e.stateNode.containerInfo;
    return ha = UD(t), vn = e, Oa = !0, Qr = null, zi = !1, !0;
  }
  function NC(e, t, n) {
    return ha = FD(t), vn = e, Oa = !0, Qr = null, zi = !1, n !== null && vC(e, n), !0;
  }
  function ob(e, t) {
    switch (e.tag) {
      case x: {
        WD(e.stateNode.containerInfo, t);
        break;
      }
      case L: {
        var n = (e.mode & Xe) !== we;
        QD(
          e.type,
          e.memoizedProps,
          e.stateNode,
          t,
          // TODO: Delete this argument when we remove the legacy root API.
          n
        );
        break;
      }
      case ee: {
        var a = e.memoizedState;
        a.dehydrated !== null && KD(a.dehydrated, t);
        break;
      }
    }
  }
  function sb(e, t) {
    ob(e, t);
    var n = RT();
    n.stateNode = t, n.return = e;
    var a = e.deletions;
    a === null ? (e.deletions = [n], e.flags |= Si) : a.push(n);
  }
  function bm(e, t) {
    {
      if (zi)
        return;
      switch (e.tag) {
        case x: {
          var n = e.stateNode.containerInfo;
          switch (t.tag) {
            case L:
              var a = t.type;
              t.pendingProps, XD(n, a);
              break;
            case te:
              var r = t.pendingProps;
              JD(n, r);
              break;
          }
          break;
        }
        case L: {
          var i = e.type, l = e.memoizedProps, u = e.stateNode;
          switch (t.tag) {
            case L: {
              var c = t.type, h = t.pendingProps, v = (e.mode & Xe) !== we;
              tC(
                i,
                l,
                u,
                c,
                h,
                // TODO: Delete this argument when we remove the legacy root API.
                v
              );
              break;
            }
            case te: {
              var C = t.pendingProps, D = (e.mode & Xe) !== we;
              nC(
                i,
                l,
                u,
                C,
                // TODO: Delete this argument when we remove the legacy root API.
                D
              );
              break;
            }
          }
          break;
        }
        case ee: {
          var M = e.memoizedState, A = M.dehydrated;
          if (A !== null) switch (t.tag) {
            case L:
              var B = t.type;
              t.pendingProps, ZD(A, B);
              break;
            case te:
              var ve = t.pendingProps;
              eC(A, ve);
              break;
          }
          break;
        }
        default:
          return;
      }
    }
  }
  function ub(e, t) {
    t.flags = t.flags & ~hr | Yt, bm(e, t);
  }
  function cb(e, t) {
    switch (e.tag) {
      case L: {
        var n = e.type;
        e.pendingProps;
        var a = OD(t, n);
        return a !== null ? (e.stateNode = a, vn = e, ha = kD(a), !0) : !1;
      }
      case te: {
        var r = e.pendingProps, i = MD(t, r);
        return i !== null ? (e.stateNode = i, vn = e, ha = null, !0) : !1;
      }
      case ee: {
        var l = VD(t);
        if (l !== null) {
          var u = {
            dehydrated: l,
            treeContext: hC(),
            retryLane: Zn
          };
          e.memoizedState = u;
          var c = DT(l);
          return c.return = e, e.child = c, vn = e, ha = null, !0;
        }
        return !1;
      }
      default:
        return !1;
    }
  }
  function ym(e) {
    return (e.mode & Xe) !== we && (e.flags & lt) === Oe;
  }
  function Nm(e) {
    throw new Error("Hydration failed because the initial UI does not match what was rendered on the server.");
  }
  function xm(e) {
    if (Oa) {
      var t = ha;
      if (!t) {
        ym(e) && (bm(vn, e), Nm()), ub(vn, e), Oa = !1, vn = e;
        return;
      }
      var n = t;
      if (!cb(e, t)) {
        ym(e) && (bm(vn, e), Nm()), t = us(n);
        var a = vn;
        if (!t || !cb(e, t)) {
          ub(vn, e), Oa = !1, vn = e;
          return;
        }
        sb(a, n);
      }
    }
  }
  function xC(e, t, n) {
    var a = e.stateNode, r = !zi, i = zD(a, e.type, e.memoizedProps, t, n, e, r);
    return e.updateQueue = i, i !== null;
  }
  function EC(e) {
    var t = e.stateNode, n = e.memoizedProps, a = PD(t, n, e);
    if (a) {
      var r = vn;
      if (r !== null)
        switch (r.tag) {
          case x: {
            var i = r.stateNode.containerInfo, l = (r.mode & Xe) !== we;
            qD(
              i,
              t,
              n,
              // TODO: Delete this argument when we remove the legacy root API.
              l
            );
            break;
          }
          case L: {
            var u = r.type, c = r.memoizedProps, h = r.stateNode, v = (r.mode & Xe) !== we;
            GD(
              u,
              c,
              h,
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
  function SC(e) {
    var t = e.memoizedState, n = t !== null ? t.dehydrated : null;
    if (!n)
      throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
    HD(n, e);
  }
  function RC(e) {
    var t = e.memoizedState, n = t !== null ? t.dehydrated : null;
    if (!n)
      throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
    return BD(n);
  }
  function db(e) {
    for (var t = e.return; t !== null && t.tag !== L && t.tag !== x && t.tag !== ee; )
      t = t.return;
    vn = t;
  }
  function dc(e) {
    if (e !== vn)
      return !1;
    if (!Oa)
      return db(e), Oa = !0, !1;
    if (e.tag !== x && (e.tag !== L || YD(e.type) && !nm(e.type, e.memoizedProps))) {
      var t = ha;
      if (t)
        if (ym(e))
          fb(e), Nm();
        else
          for (; t; )
            sb(e, t), t = us(t);
    }
    return db(e), e.tag === ee ? ha = RC(e) : ha = vn ? us(e.stateNode) : null, !0;
  }
  function DC() {
    return Oa && ha !== null;
  }
  function fb(e) {
    for (var t = ha; t; )
      ob(e, t), t = us(t);
  }
  function kl() {
    vn = null, ha = null, Oa = !1, zi = !1;
  }
  function mb() {
    Qr !== null && (lN(Qr), Qr = null);
  }
  function gn() {
    return Oa;
  }
  function Em(e) {
    Qr === null ? Qr = [e] : Qr.push(e);
  }
  var CC = p.ReactCurrentBatchConfig, jC = null;
  function TC() {
    return CC.transition;
  }
  var Ma = {
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
    var wC = function(e) {
      for (var t = null, n = e; n !== null; )
        n.mode & kt && (t = n), n = n.return;
      return t;
    }, Pi = function(e) {
      var t = [];
      return e.forEach(function(n) {
        t.push(n);
      }), t.sort().join(", ");
    }, ms = [], ps = [], hs = [], vs = [], gs = [], bs = [], Hi = /* @__PURE__ */ new Set();
    Ma.recordUnsafeLifecycleWarnings = function(e, t) {
      Hi.has(e.type) || (typeof t.componentWillMount == "function" && // Don't warn about react-lifecycles-compat polyfilled components.
      t.componentWillMount.__suppressDeprecationWarning !== !0 && ms.push(e), e.mode & kt && typeof t.UNSAFE_componentWillMount == "function" && ps.push(e), typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps.__suppressDeprecationWarning !== !0 && hs.push(e), e.mode & kt && typeof t.UNSAFE_componentWillReceiveProps == "function" && vs.push(e), typeof t.componentWillUpdate == "function" && t.componentWillUpdate.__suppressDeprecationWarning !== !0 && gs.push(e), e.mode & kt && typeof t.UNSAFE_componentWillUpdate == "function" && bs.push(e));
    }, Ma.flushPendingUnsafeLifecycleWarnings = function() {
      var e = /* @__PURE__ */ new Set();
      ms.length > 0 && (ms.forEach(function(D) {
        e.add(ze(D) || "Component"), Hi.add(D.type);
      }), ms = []);
      var t = /* @__PURE__ */ new Set();
      ps.length > 0 && (ps.forEach(function(D) {
        t.add(ze(D) || "Component"), Hi.add(D.type);
      }), ps = []);
      var n = /* @__PURE__ */ new Set();
      hs.length > 0 && (hs.forEach(function(D) {
        n.add(ze(D) || "Component"), Hi.add(D.type);
      }), hs = []);
      var a = /* @__PURE__ */ new Set();
      vs.length > 0 && (vs.forEach(function(D) {
        a.add(ze(D) || "Component"), Hi.add(D.type);
      }), vs = []);
      var r = /* @__PURE__ */ new Set();
      gs.length > 0 && (gs.forEach(function(D) {
        r.add(ze(D) || "Component"), Hi.add(D.type);
      }), gs = []);
      var i = /* @__PURE__ */ new Set();
      if (bs.length > 0 && (bs.forEach(function(D) {
        i.add(ze(D) || "Component"), Hi.add(D.type);
      }), bs = []), t.size > 0) {
        var l = Pi(t);
        d(`Using UNSAFE_componentWillMount in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.

Please update the following components: %s`, l);
      }
      if (a.size > 0) {
        var u = Pi(a);
        d(`Using UNSAFE_componentWillReceiveProps in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state

Please update the following components: %s`, u);
      }
      if (i.size > 0) {
        var c = Pi(i);
        d(`Using UNSAFE_componentWillUpdate in strict mode is not recommended and may indicate bugs in your code. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.

Please update the following components: %s`, c);
      }
      if (e.size > 0) {
        var h = Pi(e);
        S(`componentWillMount has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move code with side effects to componentDidMount, and set initial state in the constructor.
* Rename componentWillMount to UNSAFE_componentWillMount to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, h);
      }
      if (n.size > 0) {
        var v = Pi(n);
        S(`componentWillReceiveProps has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* If you're updating state whenever props change, refactor your code to use memoization techniques or move it to static getDerivedStateFromProps. Learn more at: https://reactjs.org/link/derived-state
* Rename componentWillReceiveProps to UNSAFE_componentWillReceiveProps to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, v);
      }
      if (r.size > 0) {
        var C = Pi(r);
        S(`componentWillUpdate has been renamed, and is not recommended for use. See https://reactjs.org/link/unsafe-component-lifecycles for details.

* Move data fetching code or side effects to componentDidUpdate.
* Rename componentWillUpdate to UNSAFE_componentWillUpdate to suppress this warning in non-strict mode. In React 18.x, only the UNSAFE_ name will work. To rename all deprecated lifecycles to their new names, you can run \`npx react-codemod rename-unsafe-lifecycles\` in your project source folder.

Please update the following components: %s`, C);
      }
    };
    var fc = /* @__PURE__ */ new Map(), pb = /* @__PURE__ */ new Set();
    Ma.recordLegacyContextWarning = function(e, t) {
      var n = wC(e);
      if (n === null) {
        d("Expected to find a StrictMode component in a strict mode tree. This error is likely caused by a bug in React. Please file an issue.");
        return;
      }
      if (!pb.has(e.type)) {
        var a = fc.get(n);
        (e.type.contextTypes != null || e.type.childContextTypes != null || t !== null && typeof t.getChildContext == "function") && (a === void 0 && (a = [], fc.set(n, a)), a.push(e));
      }
    }, Ma.flushLegacyContextWarning = function() {
      fc.forEach(function(e, t) {
        if (e.length !== 0) {
          var n = e[0], a = /* @__PURE__ */ new Set();
          e.forEach(function(i) {
            a.add(ze(i) || "Component"), pb.add(i.type);
          });
          var r = Pi(a);
          try {
            jt(n), d(`Legacy context API has been detected within a strict-mode tree.

The old API will be supported in all 16.x releases, but applications using it should migrate to the new version.

Please update the following components: %s

Learn more about this warning here: https://reactjs.org/link/legacy-context`, r);
          } finally {
            sn();
          }
        }
      });
    }, Ma.discardPendingWarnings = function() {
      ms = [], ps = [], hs = [], vs = [], gs = [], bs = [], fc = /* @__PURE__ */ new Map();
    };
  }
  var Sm, Rm, Dm, Cm, jm, hb = function(e, t) {
  };
  Sm = !1, Rm = !1, Dm = {}, Cm = {}, jm = {}, hb = function(e, t) {
    if (!(e === null || typeof e != "object") && !(!e._store || e._store.validated || e.key != null)) {
      if (typeof e._store != "object")
        throw new Error("React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue.");
      e._store.validated = !0;
      var n = ze(t) || "Component";
      Cm[n] || (Cm[n] = !0, d('Each child in a list should have a unique "key" prop. See https://reactjs.org/link/warning-keys for more information.'));
    }
  };
  function _C(e) {
    return e.prototype && e.prototype.isReactComponent;
  }
  function ys(e, t, n) {
    var a = n.ref;
    if (a !== null && typeof a != "function" && typeof a != "object") {
      if ((e.mode & kt || Ve) && // We warn in ReactElement.js if owner and self are equal for string refs
      // because these cannot be automatically converted to an arrow function
      // using a codemod. Therefore, we don't have to warn about string refs again.
      !(n._owner && n._self && n._owner.stateNode !== n._self) && // Will already throw with "Function components cannot have string refs"
      !(n._owner && n._owner.tag !== j) && // Will already warn with "Function components cannot be given refs"
      !(typeof n.type == "function" && !_C(n.type)) && // Will already throw with "Element ref was specified as a string (someStringRef) but no owner was set"
      n._owner) {
        var r = ze(e) || "Component";
        Dm[r] || (d('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. We recommend using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', r, a), Dm[r] = !0);
      }
      if (n._owner) {
        var i = n._owner, l;
        if (i) {
          var u = i;
          if (u.tag !== j)
            throw new Error("Function components cannot have string refs. We recommend using useRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref");
          l = u.stateNode;
        }
        if (!l)
          throw new Error("Missing owner for string ref " + a + ". This error is likely caused by a bug in React. Please file an issue.");
        var c = l;
        Pt(a, "ref");
        var h = "" + a;
        if (t !== null && t.ref !== null && typeof t.ref == "function" && t.ref._stringRef === h)
          return t.ref;
        var v = function(C) {
          var D = c.refs;
          C === null ? delete D[h] : D[h] = C;
        };
        return v._stringRef = h, v;
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
  function mc(e, t) {
    var n = Object.prototype.toString.call(t);
    throw new Error("Objects are not valid as a React child (found: " + (n === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : n) + "). If you meant to render a collection of children, use an array instead.");
  }
  function pc(e) {
    {
      var t = ze(e) || "Component";
      if (jm[t])
        return;
      jm[t] = !0, d("Functions are not valid as a React child. This may happen if you return a Component instead of <Component /> from render. Or maybe you meant to call this function rather than return it.");
    }
  }
  function vb(e) {
    var t = e._payload, n = e._init;
    return n(t);
  }
  function gb(e) {
    function t(_, $) {
      if (e) {
        var O = _.deletions;
        O === null ? (_.deletions = [$], _.flags |= Si) : O.push($);
      }
    }
    function n(_, $) {
      if (!e)
        return null;
      for (var O = $; O !== null; )
        t(_, O), O = O.sibling;
      return null;
    }
    function a(_, $) {
      for (var O = /* @__PURE__ */ new Map(), ae = $; ae !== null; )
        ae.key !== null ? O.set(ae.key, ae) : O.set(ae.index, ae), ae = ae.sibling;
      return O;
    }
    function r(_, $) {
      var O = Qi(_, $);
      return O.index = 0, O.sibling = null, O;
    }
    function i(_, $, O) {
      if (_.index = O, !e)
        return _.flags |= Nv, $;
      var ae = _.alternate;
      if (ae !== null) {
        var Ne = ae.index;
        return Ne < $ ? (_.flags |= Yt, $) : Ne;
      } else
        return _.flags |= Yt, $;
    }
    function l(_) {
      return e && _.alternate === null && (_.flags |= Yt), _;
    }
    function u(_, $, O, ae) {
      if ($ === null || $.tag !== te) {
        var Ne = Eh(O, _.mode, ae);
        return Ne.return = _, Ne;
      } else {
        var ge = r($, O);
        return ge.return = _, ge;
      }
    }
    function c(_, $, O, ae) {
      var Ne = O.type;
      if (Ne === Ia)
        return v(_, $, O.props.children, ae, O.key);
      if ($ !== null && ($.elementType === Ne || // Keep this check inline so it only runs on the false path:
      EN($, O) || // Lazy types should reconcile their resolved type.
      // We need to do this after the Hot Reloading check above,
      // because hot reloading has different semantics than prod because
      // it doesn't resuspend. So we can't let the call below suspend.
      typeof Ne == "object" && Ne !== null && Ne.$$typeof === Te && vb(Ne) === $.type)) {
        var ge = r($, O.props);
        return ge.ref = ys(_, $, O), ge.return = _, ge._debugSource = O._source, ge._debugOwner = O._owner, ge;
      }
      var Me = xh(O, _.mode, ae);
      return Me.ref = ys(_, $, O), Me.return = _, Me;
    }
    function h(_, $, O, ae) {
      if ($ === null || $.tag !== T || $.stateNode.containerInfo !== O.containerInfo || $.stateNode.implementation !== O.implementation) {
        var Ne = Sh(O, _.mode, ae);
        return Ne.return = _, Ne;
      } else {
        var ge = r($, O.children || []);
        return ge.return = _, ge;
      }
    }
    function v(_, $, O, ae, Ne) {
      if ($ === null || $.tag !== pe) {
        var ge = oi(O, _.mode, ae, Ne);
        return ge.return = _, ge;
      } else {
        var Me = r($, O);
        return Me.return = _, Me;
      }
    }
    function C(_, $, O) {
      if (typeof $ == "string" && $ !== "" || typeof $ == "number") {
        var ae = Eh("" + $, _.mode, O);
        return ae.return = _, ae;
      }
      if (typeof $ == "object" && $ !== null) {
        switch ($.$$typeof) {
          case da: {
            var Ne = xh($, _.mode, O);
            return Ne.ref = ys(_, null, $), Ne.return = _, Ne;
          }
          case Jn: {
            var ge = Sh($, _.mode, O);
            return ge.return = _, ge;
          }
          case Te: {
            var Me = $._payload, Fe = $._init;
            return C(_, Fe(Me), O);
          }
        }
        if (Ye($) || Ca($)) {
          var pt = oi($, _.mode, O, null);
          return pt.return = _, pt;
        }
        mc(_, $);
      }
      return typeof $ == "function" && pc(_), null;
    }
    function D(_, $, O, ae) {
      var Ne = $ !== null ? $.key : null;
      if (typeof O == "string" && O !== "" || typeof O == "number")
        return Ne !== null ? null : u(_, $, "" + O, ae);
      if (typeof O == "object" && O !== null) {
        switch (O.$$typeof) {
          case da:
            return O.key === Ne ? c(_, $, O, ae) : null;
          case Jn:
            return O.key === Ne ? h(_, $, O, ae) : null;
          case Te: {
            var ge = O._payload, Me = O._init;
            return D(_, $, Me(ge), ae);
          }
        }
        if (Ye(O) || Ca(O))
          return Ne !== null ? null : v(_, $, O, ae, null);
        mc(_, O);
      }
      return typeof O == "function" && pc(_), null;
    }
    function M(_, $, O, ae, Ne) {
      if (typeof ae == "string" && ae !== "" || typeof ae == "number") {
        var ge = _.get(O) || null;
        return u($, ge, "" + ae, Ne);
      }
      if (typeof ae == "object" && ae !== null) {
        switch (ae.$$typeof) {
          case da: {
            var Me = _.get(ae.key === null ? O : ae.key) || null;
            return c($, Me, ae, Ne);
          }
          case Jn: {
            var Fe = _.get(ae.key === null ? O : ae.key) || null;
            return h($, Fe, ae, Ne);
          }
          case Te:
            var pt = ae._payload, tt = ae._init;
            return M(_, $, O, tt(pt), Ne);
        }
        if (Ye(ae) || Ca(ae)) {
          var Bt = _.get(O) || null;
          return v($, Bt, ae, Ne, null);
        }
        mc($, ae);
      }
      return typeof ae == "function" && pc($), null;
    }
    function A(_, $, O) {
      {
        if (typeof _ != "object" || _ === null)
          return $;
        switch (_.$$typeof) {
          case da:
          case Jn:
            hb(_, O);
            var ae = _.key;
            if (typeof ae != "string")
              break;
            if ($ === null) {
              $ = /* @__PURE__ */ new Set(), $.add(ae);
              break;
            }
            if (!$.has(ae)) {
              $.add(ae);
              break;
            }
            d("Encountered two children with the same key, `%s`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.", ae);
            break;
          case Te:
            var Ne = _._payload, ge = _._init;
            A(ge(Ne), $, O);
            break;
        }
      }
      return $;
    }
    function B(_, $, O, ae) {
      for (var Ne = null, ge = 0; ge < O.length; ge++) {
        var Me = O[ge];
        Ne = A(Me, Ne, _);
      }
      for (var Fe = null, pt = null, tt = $, Bt = 0, nt = 0, Ut = null; tt !== null && nt < O.length; nt++) {
        tt.index > nt ? (Ut = tt, tt = null) : Ut = tt.sibling;
        var Mn = D(_, tt, O[nt], ae);
        if (Mn === null) {
          tt === null && (tt = Ut);
          break;
        }
        e && tt && Mn.alternate === null && t(_, tt), Bt = i(Mn, Bt, nt), pt === null ? Fe = Mn : pt.sibling = Mn, pt = Mn, tt = Ut;
      }
      if (nt === O.length) {
        if (n(_, tt), gn()) {
          var Rn = nt;
          Ui(_, Rn);
        }
        return Fe;
      }
      if (tt === null) {
        for (; nt < O.length; nt++) {
          var la = C(_, O[nt], ae);
          la !== null && (Bt = i(la, Bt, nt), pt === null ? Fe = la : pt.sibling = la, pt = la);
        }
        if (gn()) {
          var $n = nt;
          Ui(_, $n);
        }
        return Fe;
      }
      for (var In = a(_, tt); nt < O.length; nt++) {
        var Vn = M(In, _, nt, O[nt], ae);
        Vn !== null && (e && Vn.alternate !== null && In.delete(Vn.key === null ? nt : Vn.key), Bt = i(Vn, Bt, nt), pt === null ? Fe = Vn : pt.sibling = Vn, pt = Vn);
      }
      if (e && In.forEach(function(to) {
        return t(_, to);
      }), gn()) {
        var Or = nt;
        Ui(_, Or);
      }
      return Fe;
    }
    function ve(_, $, O, ae) {
      var Ne = Ca(O);
      if (typeof Ne != "function")
        throw new Error("An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.");
      {
        typeof Symbol == "function" && // $FlowFixMe Flow doesn't know about toStringTag
        O[Symbol.toStringTag] === "Generator" && (Rm || d("Using Generators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. Keep in mind you might need to polyfill these features for older browsers."), Rm = !0), O.entries === Ne && (Sm || d("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), Sm = !0);
        var ge = Ne.call(O);
        if (ge)
          for (var Me = null, Fe = ge.next(); !Fe.done; Fe = ge.next()) {
            var pt = Fe.value;
            Me = A(pt, Me, _);
          }
      }
      var tt = Ne.call(O);
      if (tt == null)
        throw new Error("An iterable object provided no iterator.");
      for (var Bt = null, nt = null, Ut = $, Mn = 0, Rn = 0, la = null, $n = tt.next(); Ut !== null && !$n.done; Rn++, $n = tt.next()) {
        Ut.index > Rn ? (la = Ut, Ut = null) : la = Ut.sibling;
        var In = D(_, Ut, $n.value, ae);
        if (In === null) {
          Ut === null && (Ut = la);
          break;
        }
        e && Ut && In.alternate === null && t(_, Ut), Mn = i(In, Mn, Rn), nt === null ? Bt = In : nt.sibling = In, nt = In, Ut = la;
      }
      if ($n.done) {
        if (n(_, Ut), gn()) {
          var Vn = Rn;
          Ui(_, Vn);
        }
        return Bt;
      }
      if (Ut === null) {
        for (; !$n.done; Rn++, $n = tt.next()) {
          var Or = C(_, $n.value, ae);
          Or !== null && (Mn = i(Or, Mn, Rn), nt === null ? Bt = Or : nt.sibling = Or, nt = Or);
        }
        if (gn()) {
          var to = Rn;
          Ui(_, to);
        }
        return Bt;
      }
      for (var Xs = a(_, Ut); !$n.done; Rn++, $n = tt.next()) {
        var ir = M(Xs, _, Rn, $n.value, ae);
        ir !== null && (e && ir.alternate !== null && Xs.delete(ir.key === null ? Rn : ir.key), Mn = i(ir, Mn, Rn), nt === null ? Bt = ir : nt.sibling = ir, nt = ir);
      }
      if (e && Xs.forEach(function(nw) {
        return t(_, nw);
      }), gn()) {
        var tw = Rn;
        Ui(_, tw);
      }
      return Bt;
    }
    function je(_, $, O, ae) {
      if ($ !== null && $.tag === te) {
        n(_, $.sibling);
        var Ne = r($, O);
        return Ne.return = _, Ne;
      }
      n(_, $);
      var ge = Eh(O, _.mode, ae);
      return ge.return = _, ge;
    }
    function Se(_, $, O, ae) {
      for (var Ne = O.key, ge = $; ge !== null; ) {
        if (ge.key === Ne) {
          var Me = O.type;
          if (Me === Ia) {
            if (ge.tag === pe) {
              n(_, ge.sibling);
              var Fe = r(ge, O.props.children);
              return Fe.return = _, Fe._debugSource = O._source, Fe._debugOwner = O._owner, Fe;
            }
          } else if (ge.elementType === Me || // Keep this check inline so it only runs on the false path:
          EN(ge, O) || // Lazy types should reconcile their resolved type.
          // We need to do this after the Hot Reloading check above,
          // because hot reloading has different semantics than prod because
          // it doesn't resuspend. So we can't let the call below suspend.
          typeof Me == "object" && Me !== null && Me.$$typeof === Te && vb(Me) === ge.type) {
            n(_, ge.sibling);
            var pt = r(ge, O.props);
            return pt.ref = ys(_, ge, O), pt.return = _, pt._debugSource = O._source, pt._debugOwner = O._owner, pt;
          }
          n(_, ge);
          break;
        } else
          t(_, ge);
        ge = ge.sibling;
      }
      if (O.type === Ia) {
        var tt = oi(O.props.children, _.mode, ae, O.key);
        return tt.return = _, tt;
      } else {
        var Bt = xh(O, _.mode, ae);
        return Bt.ref = ys(_, $, O), Bt.return = _, Bt;
      }
    }
    function Ze(_, $, O, ae) {
      for (var Ne = O.key, ge = $; ge !== null; ) {
        if (ge.key === Ne)
          if (ge.tag === T && ge.stateNode.containerInfo === O.containerInfo && ge.stateNode.implementation === O.implementation) {
            n(_, ge.sibling);
            var Me = r(ge, O.children || []);
            return Me.return = _, Me;
          } else {
            n(_, ge);
            break;
          }
        else
          t(_, ge);
        ge = ge.sibling;
      }
      var Fe = Sh(O, _.mode, ae);
      return Fe.return = _, Fe;
    }
    function qe(_, $, O, ae) {
      var Ne = typeof O == "object" && O !== null && O.type === Ia && O.key === null;
      if (Ne && (O = O.props.children), typeof O == "object" && O !== null) {
        switch (O.$$typeof) {
          case da:
            return l(Se(_, $, O, ae));
          case Jn:
            return l(Ze(_, $, O, ae));
          case Te:
            var ge = O._payload, Me = O._init;
            return qe(_, $, Me(ge), ae);
        }
        if (Ye(O))
          return B(_, $, O, ae);
        if (Ca(O))
          return ve(_, $, O, ae);
        mc(_, O);
      }
      return typeof O == "string" && O !== "" || typeof O == "number" ? l(je(_, $, "" + O, ae)) : (typeof O == "function" && pc(_), n(_, $));
    }
    return qe;
  }
  var Ul = gb(!0), bb = gb(!1);
  function OC(e, t) {
    if (e !== null && t.child !== e.child)
      throw new Error("Resuming work not yet implemented.");
    if (t.child !== null) {
      var n = t.child, a = Qi(n, n.pendingProps);
      for (t.child = a, a.return = t; n.sibling !== null; )
        n = n.sibling, a = a.sibling = Qi(n, n.pendingProps), a.return = t;
      a.sibling = null;
    }
  }
  function MC(e, t) {
    for (var n = e.child; n !== null; )
      yT(n, t), n = n.sibling;
  }
  var Tm = Gr(null), wm;
  wm = {};
  var hc = null, Fl = null, _m = null, vc = !1;
  function gc() {
    hc = null, Fl = null, _m = null, vc = !1;
  }
  function yb() {
    vc = !0;
  }
  function Nb() {
    vc = !1;
  }
  function xb(e, t, n) {
    _n(Tm, t._currentValue, e), t._currentValue = n, t._currentRenderer !== void 0 && t._currentRenderer !== null && t._currentRenderer !== wm && d("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."), t._currentRenderer = wm;
  }
  function Om(e, t) {
    var n = Tm.current;
    wn(Tm, t), e._currentValue = n;
  }
  function Mm(e, t, n) {
    for (var a = e; a !== null; ) {
      var r = a.alternate;
      if (El(a.childLanes, t) ? r !== null && !El(r.childLanes, t) && (r.childLanes = Be(r.childLanes, t)) : (a.childLanes = Be(a.childLanes, t), r !== null && (r.childLanes = Be(r.childLanes, t))), a === n)
        break;
      a = a.return;
    }
    a !== n && d("Expected to find the propagation root when scheduling context work. This error is likely caused by a bug in React. Please file an issue.");
  }
  function VC(e, t, n) {
    AC(e, t, n);
  }
  function AC(e, t, n) {
    var a = e.child;
    for (a !== null && (a.return = e); a !== null; ) {
      var r = void 0, i = a.dependencies;
      if (i !== null) {
        r = a.child;
        for (var l = i.firstContext; l !== null; ) {
          if (l.context === t) {
            if (a.tag === j) {
              var u = Uo(n), c = Dr(xt, u);
              c.tag = yc;
              var h = a.updateQueue;
              if (h !== null) {
                var v = h.shared, C = v.pending;
                C === null ? c.next = c : (c.next = C.next, C.next = c), v.pending = c;
              }
            }
            a.lanes = Be(a.lanes, n);
            var D = a.alternate;
            D !== null && (D.lanes = Be(D.lanes, n)), Mm(a.return, n, e), i.lanes = Be(i.lanes, n);
            break;
          }
          l = l.next;
        }
      } else if (a.tag === K)
        r = a.type === e.type ? null : a.child;
      else if (a.tag === W) {
        var M = a.return;
        if (M === null)
          throw new Error("We just came from a parent so we must have had a parent. This is a bug in React.");
        M.lanes = Be(M.lanes, n);
        var A = M.alternate;
        A !== null && (A.lanes = Be(A.lanes, n)), Mm(M, n, e), r = a.sibling;
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
          var B = r.sibling;
          if (B !== null) {
            B.return = r.return, r = B;
            break;
          }
          r = r.return;
        }
      a = r;
    }
  }
  function zl(e, t) {
    hc = e, Fl = null, _m = null;
    var n = e.dependencies;
    if (n !== null) {
      var a = n.firstContext;
      a !== null && (ea(n.lanes, t) && As(), n.firstContext = null);
    }
  }
  function qt(e) {
    vc && d("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
    var t = e._currentValue;
    if (_m !== e) {
      var n = {
        context: e,
        memoizedValue: t,
        next: null
      };
      if (Fl === null) {
        if (hc === null)
          throw new Error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
        Fl = n, hc.dependencies = {
          lanes: J,
          firstContext: n
        };
      } else
        Fl = Fl.next = n;
    }
    return t;
  }
  var Bi = null;
  function Vm(e) {
    Bi === null ? Bi = [e] : Bi.push(e);
  }
  function LC() {
    if (Bi !== null) {
      for (var e = 0; e < Bi.length; e++) {
        var t = Bi[e], n = t.interleaved;
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
      Bi = null;
    }
  }
  function Eb(e, t, n, a) {
    var r = t.interleaved;
    return r === null ? (n.next = n, Vm(t)) : (n.next = r.next, r.next = n), t.interleaved = n, bc(e, a);
  }
  function kC(e, t, n, a) {
    var r = t.interleaved;
    r === null ? (n.next = n, Vm(t)) : (n.next = r.next, r.next = n), t.interleaved = n;
  }
  function UC(e, t, n, a) {
    var r = t.interleaved;
    return r === null ? (n.next = n, Vm(t)) : (n.next = r.next, r.next = n), t.interleaved = n, bc(e, a);
  }
  function Gn(e, t) {
    return bc(e, t);
  }
  var FC = bc;
  function bc(e, t) {
    e.lanes = Be(e.lanes, t);
    var n = e.alternate;
    n !== null && (n.lanes = Be(n.lanes, t)), n === null && (e.flags & (Yt | hr)) !== Oe && bN(e);
    for (var a = e, r = e.return; r !== null; )
      r.childLanes = Be(r.childLanes, t), n = r.alternate, n !== null ? n.childLanes = Be(n.childLanes, t) : (r.flags & (Yt | hr)) !== Oe && bN(e), a = r, r = r.return;
    if (a.tag === x) {
      var i = a.stateNode;
      return i;
    } else
      return null;
  }
  var Sb = 0, Rb = 1, yc = 2, Am = 3, Nc = !1, Lm, xc;
  Lm = !1, xc = null;
  function km(e) {
    var t = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: {
        pending: null,
        interleaved: null,
        lanes: J
      },
      effects: null
    };
    e.updateQueue = t;
  }
  function Db(e, t) {
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
  function Dr(e, t) {
    var n = {
      eventTime: e,
      lane: t,
      tag: Sb,
      payload: null,
      callback: null,
      next: null
    };
    return n;
  }
  function Xr(e, t, n) {
    var a = e.updateQueue;
    if (a === null)
      return null;
    var r = a.shared;
    if (xc === r && !Lm && (d("An update (setState, replaceState, or forceUpdate) was scheduled from inside an update function. Update functions should be pure, with zero side-effects. Consider using componentDidUpdate or a callback."), Lm = !0), kj()) {
      var i = r.pending;
      return i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, FC(e, n);
    } else
      return UC(e, r, t, n);
  }
  function Ec(e, t, n) {
    var a = t.updateQueue;
    if (a !== null) {
      var r = a.shared;
      if (Fv(n)) {
        var i = r.lanes;
        i = Pv(i, e.pendingLanes);
        var l = Be(i, n);
        r.lanes = l, Tf(e, l);
      }
    }
  }
  function Um(e, t) {
    var n = e.updateQueue, a = e.alternate;
    if (a !== null) {
      var r = a.updateQueue;
      if (n === r) {
        var i = null, l = null, u = n.firstBaseUpdate;
        if (u !== null) {
          var c = u;
          do {
            var h = {
              eventTime: c.eventTime,
              lane: c.lane,
              tag: c.tag,
              payload: c.payload,
              callback: c.callback,
              next: null
            };
            l === null ? i = l = h : (l.next = h, l = h), c = c.next;
          } while (c !== null);
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
  function zC(e, t, n, a, r, i) {
    switch (n.tag) {
      case Rb: {
        var l = n.payload;
        if (typeof l == "function") {
          yb();
          var u = l.call(i, a, r);
          {
            if (e.mode & kt) {
              cn(!0);
              try {
                l.call(i, a, r);
              } finally {
                cn(!1);
              }
            }
            Nb();
          }
          return u;
        }
        return l;
      }
      case Am:
        e.flags = e.flags & ~zn | lt;
      case Sb: {
        var c = n.payload, h;
        if (typeof c == "function") {
          yb(), h = c.call(i, a, r);
          {
            if (e.mode & kt) {
              cn(!0);
              try {
                c.call(i, a, r);
              } finally {
                cn(!1);
              }
            }
            Nb();
          }
        } else
          h = c;
        return h == null ? a : Ie({}, a, h);
      }
      case yc:
        return Nc = !0, a;
    }
    return a;
  }
  function Sc(e, t, n, a) {
    var r = e.updateQueue;
    Nc = !1, xc = r.shared;
    var i = r.firstBaseUpdate, l = r.lastBaseUpdate, u = r.shared.pending;
    if (u !== null) {
      r.shared.pending = null;
      var c = u, h = c.next;
      c.next = null, l === null ? i = h : l.next = h, l = c;
      var v = e.alternate;
      if (v !== null) {
        var C = v.updateQueue, D = C.lastBaseUpdate;
        D !== l && (D === null ? C.firstBaseUpdate = h : D.next = h, C.lastBaseUpdate = c);
      }
    }
    if (i !== null) {
      var M = r.baseState, A = J, B = null, ve = null, je = null, Se = i;
      do {
        var Ze = Se.lane, qe = Se.eventTime;
        if (El(a, Ze)) {
          if (je !== null) {
            var $ = {
              eventTime: qe,
              // This update is going to be committed so we never want uncommit
              // it. Using NoLane works because 0 is a subset of all bitmasks, so
              // this will never be skipped by the check above.
              lane: dn,
              tag: Se.tag,
              payload: Se.payload,
              callback: Se.callback,
              next: null
            };
            je = je.next = $;
          }
          M = zC(e, r, Se, M, t, n);
          var O = Se.callback;
          if (O !== null && // If the update was already committed, we should not queue its
          // callback again.
          Se.lane !== dn) {
            e.flags |= yv;
            var ae = r.effects;
            ae === null ? r.effects = [Se] : ae.push(Se);
          }
        } else {
          var _ = {
            eventTime: qe,
            lane: Ze,
            tag: Se.tag,
            payload: Se.payload,
            callback: Se.callback,
            next: null
          };
          je === null ? (ve = je = _, B = M) : je = je.next = _, A = Be(A, Ze);
        }
        if (Se = Se.next, Se === null) {
          if (u = r.shared.pending, u === null)
            break;
          var Ne = u, ge = Ne.next;
          Ne.next = null, Se = ge, r.lastBaseUpdate = Ne, r.shared.pending = null;
        }
      } while (!0);
      je === null && (B = M), r.baseState = B, r.firstBaseUpdate = ve, r.lastBaseUpdate = je;
      var Me = r.shared.interleaved;
      if (Me !== null) {
        var Fe = Me;
        do
          A = Be(A, Fe.lane), Fe = Fe.next;
        while (Fe !== Me);
      } else i === null && (r.shared.lanes = J);
      qs(A), e.lanes = A, e.memoizedState = M;
    }
    xc = null;
  }
  function PC(e, t) {
    if (typeof e != "function")
      throw new Error("Invalid argument passed as callback. Expected a function. Instead " + ("received: " + e));
    e.call(t);
  }
  function Cb() {
    Nc = !1;
  }
  function Rc() {
    return Nc;
  }
  function jb(e, t, n) {
    var a = t.effects;
    if (t.effects = null, a !== null)
      for (var r = 0; r < a.length; r++) {
        var i = a[r], l = i.callback;
        l !== null && (i.callback = null, PC(l, n));
      }
  }
  var Ns = {}, Jr = Gr(Ns), xs = Gr(Ns), Dc = Gr(Ns);
  function Cc(e) {
    if (e === Ns)
      throw new Error("Expected host context to exist. This error is likely caused by a bug in React. Please file an issue.");
    return e;
  }
  function Tb() {
    var e = Cc(Dc.current);
    return e;
  }
  function Fm(e, t) {
    _n(Dc, t, e), _n(xs, e, e), _n(Jr, Ns, e);
    var n = aD(t);
    wn(Jr, e), _n(Jr, n, e);
  }
  function Pl(e) {
    wn(Jr, e), wn(xs, e), wn(Dc, e);
  }
  function zm() {
    var e = Cc(Jr.current);
    return e;
  }
  function wb(e) {
    Cc(Dc.current);
    var t = Cc(Jr.current), n = rD(t, e.type);
    t !== n && (_n(xs, e, e), _n(Jr, n, e));
  }
  function Pm(e) {
    xs.current === e && (wn(Jr, e), wn(xs, e));
  }
  var HC = 0, _b = 1, Ob = 1, Es = 2, Va = Gr(HC);
  function Hm(e, t) {
    return (e & t) !== 0;
  }
  function Hl(e) {
    return e & _b;
  }
  function Bm(e, t) {
    return e & _b | t;
  }
  function BC(e, t) {
    return e | t;
  }
  function Zr(e, t) {
    _n(Va, t, e);
  }
  function Bl(e) {
    wn(Va, e);
  }
  function $C(e, t) {
    var n = e.memoizedState;
    return n !== null ? n.dehydrated !== null : (e.memoizedProps, !0);
  }
  function jc(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === ee) {
        var n = t.memoizedState;
        if (n !== null) {
          var a = n.dehydrated;
          if (a === null || Wg(a) || lm(a))
            return t;
        }
      } else if (t.tag === oe && // revealOrder undefined can't be trusted because it don't
      // keep track of whether it suspended or not.
      t.memoizedProps.revealOrder !== void 0) {
        var r = (t.flags & lt) !== Oe;
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
  var Wn = (
    /*   */
    0
  ), Jt = (
    /* */
    1
  ), Ja = (
    /*  */
    2
  ), Zt = (
    /*    */
    4
  ), bn = (
    /*   */
    8
  ), $m = [];
  function Im() {
    for (var e = 0; e < $m.length; e++) {
      var t = $m[e];
      t._workInProgressVersionPrimary = null;
    }
    $m.length = 0;
  }
  function IC(e, t) {
    var n = t._getVersion, a = n(t._source);
    e.mutableSourceEagerHydrationData == null ? e.mutableSourceEagerHydrationData = [t, a] : e.mutableSourceEagerHydrationData.push(t, a);
  }
  var ye = p.ReactCurrentDispatcher, Ss = p.ReactCurrentBatchConfig, Ym, $l;
  Ym = /* @__PURE__ */ new Set();
  var $i = J, mt = null, en = null, tn = null, Tc = !1, Rs = !1, Ds = 0, YC = 0, qC = 25, G = null, va = null, ei = -1, qm = !1;
  function st() {
    {
      var e = G;
      va === null ? va = [e] : va.push(e);
    }
  }
  function me() {
    {
      var e = G;
      va !== null && (ei++, va[ei] !== e && GC(e));
    }
  }
  function Il(e) {
    e != null && !Ye(e) && d("%s received a final argument that is not an array (instead, received `%s`). When specified, the final argument must be an array.", G, typeof e);
  }
  function GC(e) {
    {
      var t = ze(mt);
      if (!Ym.has(t) && (Ym.add(t), va !== null)) {
        for (var n = "", a = 30, r = 0; r <= ei; r++) {
          for (var i = va[r], l = r === ei ? e : i, u = r + 1 + ". " + i; u.length < a; )
            u += " ";
          u += l + `
`, n += u;
        }
        d(`React has detected a change in the order of Hooks called by %s. This will lead to bugs and errors if not fixed. For more information, read the Rules of Hooks: https://reactjs.org/link/rules-of-hooks

   Previous render            Next render
   ------------------------------------------------------
%s   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
`, t, n);
      }
    }
  }
  function On() {
    throw new Error(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`);
  }
  function Gm(e, t) {
    if (qm)
      return !1;
    if (t === null)
      return d("%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.", G), !1;
    e.length !== t.length && d(`The final argument passed to %s changed size between renders. The order and size of this array must remain constant.

Previous: %s
Incoming: %s`, G, "[" + t.join(", ") + "]", "[" + e.join(", ") + "]");
    for (var n = 0; n < t.length && n < e.length; n++)
      if (!aa(e[n], t[n]))
        return !1;
    return !0;
  }
  function Yl(e, t, n, a, r, i) {
    $i = i, mt = t, va = e !== null ? e._debugHookTypes : null, ei = -1, qm = e !== null && e.type !== t.type, t.memoizedState = null, t.updateQueue = null, t.lanes = J, e !== null && e.memoizedState !== null ? ye.current = Zb : va !== null ? ye.current = Jb : ye.current = Xb;
    var l = n(a, r);
    if (Rs) {
      var u = 0;
      do {
        if (Rs = !1, Ds = 0, u >= qC)
          throw new Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
        u += 1, qm = !1, en = null, tn = null, t.updateQueue = null, ei = -1, ye.current = ey, l = n(a, r);
      } while (Rs);
    }
    ye.current = Hc, t._debugHookTypes = va;
    var c = en !== null && en.next !== null;
    if ($i = J, mt = null, en = null, tn = null, G = null, va = null, ei = -1, e !== null && (e.flags & vr) !== (t.flags & vr) && // Disable this warning in legacy mode, because legacy Suspense is weird
    // and creates false positives. To make this work in legacy mode, we'd
    // need to mark fibers that commit in an incomplete state, somehow. For
    // now I'll disable the warning that most of the bugs that would trigger
    // it are either exclusive to concurrent mode or exist in both.
    (e.mode & Xe) !== we && d("Internal React error: Expected static flag was missing. Please notify the React team."), Tc = !1, c)
      throw new Error("Rendered fewer hooks than expected. This may be caused by an accidental early return statement.");
    return l;
  }
  function ql() {
    var e = Ds !== 0;
    return Ds = 0, e;
  }
  function Mb(e, t, n) {
    t.updateQueue = e.updateQueue, (t.mode & Wa) !== we ? t.flags &= -50333701 : t.flags &= -2053, e.lanes = wu(e.lanes, n);
  }
  function Vb() {
    if (ye.current = Hc, Tc) {
      for (var e = mt.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      Tc = !1;
    }
    $i = J, mt = null, en = null, tn = null, va = null, ei = -1, G = null, qb = !1, Rs = !1, Ds = 0;
  }
  function Za() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return tn === null ? mt.memoizedState = tn = e : tn = tn.next = e, tn;
  }
  function ga() {
    var e;
    if (en === null) {
      var t = mt.alternate;
      t !== null ? e = t.memoizedState : e = null;
    } else
      e = en.next;
    var n;
    if (tn === null ? n = mt.memoizedState : n = tn.next, n !== null)
      tn = n, n = tn.next, en = e;
    else {
      if (e === null)
        throw new Error("Rendered more hooks than during the previous render.");
      en = e;
      var a = {
        memoizedState: en.memoizedState,
        baseState: en.baseState,
        baseQueue: en.baseQueue,
        queue: en.queue,
        next: null
      };
      tn === null ? mt.memoizedState = tn = a : tn = tn.next = a;
    }
    return tn;
  }
  function Ab() {
    return {
      lastEffect: null,
      stores: null
    };
  }
  function Wm(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function Km(e, t, n) {
    var a = Za(), r;
    n !== void 0 ? r = n(t) : r = t, a.memoizedState = a.baseState = r;
    var i = {
      pending: null,
      interleaved: null,
      lanes: J,
      dispatch: null,
      lastRenderedReducer: e,
      lastRenderedState: r
    };
    a.queue = i;
    var l = i.dispatch = XC.bind(null, mt, i);
    return [a.memoizedState, l];
  }
  function Qm(e, t, n) {
    var a = ga(), r = a.queue;
    if (r === null)
      throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");
    r.lastRenderedReducer = e;
    var i = en, l = i.baseQueue, u = r.pending;
    if (u !== null) {
      if (l !== null) {
        var c = l.next, h = u.next;
        l.next = h, u.next = c;
      }
      i.baseQueue !== l && d("Internal error: Expected work-in-progress queue to be a clone. This is a bug in React."), i.baseQueue = l = u, r.pending = null;
    }
    if (l !== null) {
      var v = l.next, C = i.baseState, D = null, M = null, A = null, B = v;
      do {
        var ve = B.lane;
        if (El($i, ve)) {
          if (A !== null) {
            var Se = {
              // This update is going to be committed so we never want uncommit
              // it. Using NoLane works because 0 is a subset of all bitmasks, so
              // this will never be skipped by the check above.
              lane: dn,
              action: B.action,
              hasEagerState: B.hasEagerState,
              eagerState: B.eagerState,
              next: null
            };
            A = A.next = Se;
          }
          if (B.hasEagerState)
            C = B.eagerState;
          else {
            var Ze = B.action;
            C = e(C, Ze);
          }
        } else {
          var je = {
            lane: ve,
            action: B.action,
            hasEagerState: B.hasEagerState,
            eagerState: B.eagerState,
            next: null
          };
          A === null ? (M = A = je, D = C) : A = A.next = je, mt.lanes = Be(mt.lanes, ve), qs(ve);
        }
        B = B.next;
      } while (B !== null && B !== v);
      A === null ? D = C : A.next = M, aa(C, a.memoizedState) || As(), a.memoizedState = C, a.baseState = D, a.baseQueue = A, r.lastRenderedState = C;
    }
    var qe = r.interleaved;
    if (qe !== null) {
      var _ = qe;
      do {
        var $ = _.lane;
        mt.lanes = Be(mt.lanes, $), qs($), _ = _.next;
      } while (_ !== qe);
    } else l === null && (r.lanes = J);
    var O = r.dispatch;
    return [a.memoizedState, O];
  }
  function Xm(e, t, n) {
    var a = ga(), r = a.queue;
    if (r === null)
      throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");
    r.lastRenderedReducer = e;
    var i = r.dispatch, l = r.pending, u = a.memoizedState;
    if (l !== null) {
      r.pending = null;
      var c = l.next, h = c;
      do {
        var v = h.action;
        u = e(u, v), h = h.next;
      } while (h !== c);
      aa(u, a.memoizedState) || As(), a.memoizedState = u, a.baseQueue === null && (a.baseState = u), r.lastRenderedState = u;
    }
    return [u, i];
  }
  function aO(e, t, n) {
  }
  function rO(e, t, n) {
  }
  function Jm(e, t, n) {
    var a = mt, r = Za(), i, l = gn();
    if (l) {
      if (n === void 0)
        throw new Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
      i = n(), $l || i !== n() && (d("The result of getServerSnapshot should be cached to avoid an infinite loop"), $l = !0);
    } else {
      if (i = t(), !$l) {
        var u = t();
        aa(i, u) || (d("The result of getSnapshot should be cached to avoid an infinite loop"), $l = !0);
      }
      var c = ld();
      if (c === null)
        throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
      Tu(c, $i) || Lb(a, t, i);
    }
    r.memoizedState = i;
    var h = {
      value: i,
      getSnapshot: t
    };
    return r.queue = h, Vc(Ub.bind(null, a, h, e), [e]), a.flags |= Fr, Cs(Jt | bn, kb.bind(null, a, h, i, t), void 0, null), i;
  }
  function wc(e, t, n) {
    var a = mt, r = ga(), i = t();
    if (!$l) {
      var l = t();
      aa(i, l) || (d("The result of getSnapshot should be cached to avoid an infinite loop"), $l = !0);
    }
    var u = r.memoizedState, c = !aa(u, i);
    c && (r.memoizedState = i, As());
    var h = r.queue;
    if (Ts(Ub.bind(null, a, h, e), [e]), h.getSnapshot !== t || c || // Check if the susbcribe function changed. We can save some memory by
    // checking whether we scheduled a subscription effect above.
    tn !== null && tn.memoizedState.tag & Jt) {
      a.flags |= Fr, Cs(Jt | bn, kb.bind(null, a, h, i, t), void 0, null);
      var v = ld();
      if (v === null)
        throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
      Tu(v, $i) || Lb(a, t, i);
    }
    return i;
  }
  function Lb(e, t, n) {
    e.flags |= Gd;
    var a = {
      getSnapshot: t,
      value: n
    }, r = mt.updateQueue;
    if (r === null)
      r = Ab(), mt.updateQueue = r, r.stores = [a];
    else {
      var i = r.stores;
      i === null ? r.stores = [a] : i.push(a);
    }
  }
  function kb(e, t, n, a) {
    t.value = n, t.getSnapshot = a, Fb(t) && zb(e);
  }
  function Ub(e, t, n) {
    var a = function() {
      Fb(t) && zb(e);
    };
    return n(a);
  }
  function Fb(e) {
    var t = e.getSnapshot, n = e.value;
    try {
      var a = t();
      return !aa(n, a);
    } catch {
      return !0;
    }
  }
  function zb(e) {
    var t = Gn(e, Le);
    t !== null && ln(t, e, Le, xt);
  }
  function _c(e) {
    var t = Za();
    typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e;
    var n = {
      pending: null,
      interleaved: null,
      lanes: J,
      dispatch: null,
      lastRenderedReducer: Wm,
      lastRenderedState: e
    };
    t.queue = n;
    var a = n.dispatch = JC.bind(null, mt, n);
    return [t.memoizedState, a];
  }
  function Zm(e) {
    return Qm(Wm);
  }
  function ep(e) {
    return Xm(Wm);
  }
  function Cs(e, t, n, a) {
    var r = {
      tag: e,
      create: t,
      destroy: n,
      deps: a,
      // Circular
      next: null
    }, i = mt.updateQueue;
    if (i === null)
      i = Ab(), mt.updateQueue = i, i.lastEffect = r.next = r;
    else {
      var l = i.lastEffect;
      if (l === null)
        i.lastEffect = r.next = r;
      else {
        var u = l.next;
        l.next = r, r.next = u, i.lastEffect = r;
      }
    }
    return r;
  }
  function tp(e) {
    var t = Za();
    {
      var n = {
        current: e
      };
      return t.memoizedState = n, n;
    }
  }
  function Oc(e) {
    var t = ga();
    return t.memoizedState;
  }
  function js(e, t, n, a) {
    var r = Za(), i = a === void 0 ? null : a;
    mt.flags |= e, r.memoizedState = Cs(Jt | t, n, void 0, i);
  }
  function Mc(e, t, n, a) {
    var r = ga(), i = a === void 0 ? null : a, l = void 0;
    if (en !== null) {
      var u = en.memoizedState;
      if (l = u.destroy, i !== null) {
        var c = u.deps;
        if (Gm(i, c)) {
          r.memoizedState = Cs(t, n, l, i);
          return;
        }
      }
    }
    mt.flags |= e, r.memoizedState = Cs(Jt | t, n, l, i);
  }
  function Vc(e, t) {
    return (mt.mode & Wa) !== we ? js(Xd | Fr | Qd, bn, e, t) : js(Fr | Qd, bn, e, t);
  }
  function Ts(e, t) {
    return Mc(Fr, bn, e, t);
  }
  function np(e, t) {
    return js(it, Ja, e, t);
  }
  function Ac(e, t) {
    return Mc(it, Ja, e, t);
  }
  function ap(e, t) {
    var n = it;
    return n |= Ci, (mt.mode & Wa) !== we && (n |= zr), js(n, Zt, e, t);
  }
  function Lc(e, t) {
    return Mc(it, Zt, e, t);
  }
  function Pb(e, t) {
    if (typeof t == "function") {
      var n = t, a = e();
      return n(a), function() {
        n(null);
      };
    } else if (t != null) {
      var r = t;
      r.hasOwnProperty("current") || d("Expected useImperativeHandle() first argument to either be a ref callback or React.createRef() object. Instead received: %s.", "an object with keys {" + Object.keys(r).join(", ") + "}");
      var i = e();
      return r.current = i, function() {
        r.current = null;
      };
    }
  }
  function rp(e, t, n) {
    typeof t != "function" && d("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t !== null ? typeof t : "null");
    var a = n != null ? n.concat([e]) : null, r = it;
    return r |= Ci, (mt.mode & Wa) !== we && (r |= zr), js(r, Zt, Pb.bind(null, t, e), a);
  }
  function kc(e, t, n) {
    typeof t != "function" && d("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t !== null ? typeof t : "null");
    var a = n != null ? n.concat([e]) : null;
    return Mc(it, Zt, Pb.bind(null, t, e), a);
  }
  function WC(e, t) {
  }
  var Uc = WC;
  function ip(e, t) {
    var n = Za(), a = t === void 0 ? null : t;
    return n.memoizedState = [e, a], e;
  }
  function Fc(e, t) {
    var n = ga(), a = t === void 0 ? null : t, r = n.memoizedState;
    if (r !== null && a !== null) {
      var i = r[1];
      if (Gm(a, i))
        return r[0];
    }
    return n.memoizedState = [e, a], e;
  }
  function lp(e, t) {
    var n = Za(), a = t === void 0 ? null : t, r = e();
    return n.memoizedState = [r, a], r;
  }
  function zc(e, t) {
    var n = ga(), a = t === void 0 ? null : t, r = n.memoizedState;
    if (r !== null && a !== null) {
      var i = r[1];
      if (Gm(a, i))
        return r[0];
    }
    var l = e();
    return n.memoizedState = [l, a], l;
  }
  function op(e) {
    var t = Za();
    return t.memoizedState = e, e;
  }
  function Hb(e) {
    var t = ga(), n = en, a = n.memoizedState;
    return $b(t, a, e);
  }
  function Bb(e) {
    var t = ga();
    if (en === null)
      return t.memoizedState = e, e;
    var n = en.memoizedState;
    return $b(t, n, e);
  }
  function $b(e, t, n) {
    var a = !VS($i);
    if (a) {
      if (!aa(n, t)) {
        var r = zv();
        mt.lanes = Be(mt.lanes, r), qs(r), e.baseState = !0;
      }
      return t;
    } else
      return e.baseState && (e.baseState = !1, As()), e.memoizedState = n, n;
  }
  function KC(e, t, n) {
    var a = wa();
    fn(BS(a, br)), e(!0);
    var r = Ss.transition;
    Ss.transition = {};
    var i = Ss.transition;
    Ss.transition._updatedFibers = /* @__PURE__ */ new Set();
    try {
      e(!1), t();
    } finally {
      if (fn(a), Ss.transition = r, r === null && i._updatedFibers) {
        var l = i._updatedFibers.size;
        l > 10 && S("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), i._updatedFibers.clear();
      }
    }
  }
  function sp() {
    var e = _c(!1), t = e[0], n = e[1], a = KC.bind(null, n), r = Za();
    return r.memoizedState = a, [t, a];
  }
  function Ib() {
    var e = Zm(), t = e[0], n = ga(), a = n.memoizedState;
    return [t, a];
  }
  function Yb() {
    var e = ep(), t = e[0], n = ga(), a = n.memoizedState;
    return [t, a];
  }
  var qb = !1;
  function QC() {
    return qb;
  }
  function up() {
    var e = Za(), t = ld(), n = t.identifierPrefix, a;
    if (gn()) {
      var r = mC();
      a = ":" + n + "R" + r;
      var i = Ds++;
      i > 0 && (a += "H" + i.toString(32)), a += ":";
    } else {
      var l = YC++;
      a = ":" + n + "r" + l.toString(32) + ":";
    }
    return e.memoizedState = a, a;
  }
  function Pc() {
    var e = ga(), t = e.memoizedState;
    return t;
  }
  function XC(e, t, n) {
    typeof arguments[3] == "function" && d("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
    var a = ii(e), r = {
      lane: a,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Gb(e))
      Wb(t, r);
    else {
      var i = Eb(e, t, r, a);
      if (i !== null) {
        var l = Bn();
        ln(i, e, a, l), Kb(i, t, a);
      }
    }
    Qb(e, a);
  }
  function JC(e, t, n) {
    typeof arguments[3] == "function" && d("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
    var a = ii(e), r = {
      lane: a,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Gb(e))
      Wb(t, r);
    else {
      var i = e.alternate;
      if (e.lanes === J && (i === null || i.lanes === J)) {
        var l = t.lastRenderedReducer;
        if (l !== null) {
          var u;
          u = ye.current, ye.current = Aa;
          try {
            var c = t.lastRenderedState, h = l(c, n);
            if (r.hasEagerState = !0, r.eagerState = h, aa(h, c)) {
              kC(e, t, r, a);
              return;
            }
          } catch {
          } finally {
            ye.current = u;
          }
        }
      }
      var v = Eb(e, t, r, a);
      if (v !== null) {
        var C = Bn();
        ln(v, e, a, C), Kb(v, t, a);
      }
    }
    Qb(e, a);
  }
  function Gb(e) {
    var t = e.alternate;
    return e === mt || t !== null && t === mt;
  }
  function Wb(e, t) {
    Rs = Tc = !0;
    var n = e.pending;
    n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
  }
  function Kb(e, t, n) {
    if (Fv(n)) {
      var a = t.lanes;
      a = Pv(a, e.pendingLanes);
      var r = Be(a, n);
      t.lanes = r, Tf(e, r);
    }
  }
  function Qb(e, t, n) {
    nf(e, t);
  }
  var Hc = {
    readContext: qt,
    useCallback: On,
    useContext: On,
    useEffect: On,
    useImperativeHandle: On,
    useInsertionEffect: On,
    useLayoutEffect: On,
    useMemo: On,
    useReducer: On,
    useRef: On,
    useState: On,
    useDebugValue: On,
    useDeferredValue: On,
    useTransition: On,
    useMutableSource: On,
    useSyncExternalStore: On,
    useId: On,
    unstable_isNewReconciler: re
  }, Xb = null, Jb = null, Zb = null, ey = null, er = null, Aa = null, Bc = null;
  {
    var cp = function() {
      d("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
    }, ke = function() {
      d("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://reactjs.org/link/rules-of-hooks");
    };
    Xb = {
      readContext: function(e) {
        return qt(e);
      },
      useCallback: function(e, t) {
        return G = "useCallback", st(), Il(t), ip(e, t);
      },
      useContext: function(e) {
        return G = "useContext", st(), qt(e);
      },
      useEffect: function(e, t) {
        return G = "useEffect", st(), Il(t), Vc(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return G = "useImperativeHandle", st(), Il(n), rp(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return G = "useInsertionEffect", st(), Il(t), np(e, t);
      },
      useLayoutEffect: function(e, t) {
        return G = "useLayoutEffect", st(), Il(t), ap(e, t);
      },
      useMemo: function(e, t) {
        G = "useMemo", st(), Il(t);
        var n = ye.current;
        ye.current = er;
        try {
          return lp(e, t);
        } finally {
          ye.current = n;
        }
      },
      useReducer: function(e, t, n) {
        G = "useReducer", st();
        var a = ye.current;
        ye.current = er;
        try {
          return Km(e, t, n);
        } finally {
          ye.current = a;
        }
      },
      useRef: function(e) {
        return G = "useRef", st(), tp(e);
      },
      useState: function(e) {
        G = "useState", st();
        var t = ye.current;
        ye.current = er;
        try {
          return _c(e);
        } finally {
          ye.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return G = "useDebugValue", st(), void 0;
      },
      useDeferredValue: function(e) {
        return G = "useDeferredValue", st(), op(e);
      },
      useTransition: function() {
        return G = "useTransition", st(), sp();
      },
      useMutableSource: function(e, t, n) {
        return G = "useMutableSource", st(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return G = "useSyncExternalStore", st(), Jm(e, t, n);
      },
      useId: function() {
        return G = "useId", st(), up();
      },
      unstable_isNewReconciler: re
    }, Jb = {
      readContext: function(e) {
        return qt(e);
      },
      useCallback: function(e, t) {
        return G = "useCallback", me(), ip(e, t);
      },
      useContext: function(e) {
        return G = "useContext", me(), qt(e);
      },
      useEffect: function(e, t) {
        return G = "useEffect", me(), Vc(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return G = "useImperativeHandle", me(), rp(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return G = "useInsertionEffect", me(), np(e, t);
      },
      useLayoutEffect: function(e, t) {
        return G = "useLayoutEffect", me(), ap(e, t);
      },
      useMemo: function(e, t) {
        G = "useMemo", me();
        var n = ye.current;
        ye.current = er;
        try {
          return lp(e, t);
        } finally {
          ye.current = n;
        }
      },
      useReducer: function(e, t, n) {
        G = "useReducer", me();
        var a = ye.current;
        ye.current = er;
        try {
          return Km(e, t, n);
        } finally {
          ye.current = a;
        }
      },
      useRef: function(e) {
        return G = "useRef", me(), tp(e);
      },
      useState: function(e) {
        G = "useState", me();
        var t = ye.current;
        ye.current = er;
        try {
          return _c(e);
        } finally {
          ye.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return G = "useDebugValue", me(), void 0;
      },
      useDeferredValue: function(e) {
        return G = "useDeferredValue", me(), op(e);
      },
      useTransition: function() {
        return G = "useTransition", me(), sp();
      },
      useMutableSource: function(e, t, n) {
        return G = "useMutableSource", me(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return G = "useSyncExternalStore", me(), Jm(e, t, n);
      },
      useId: function() {
        return G = "useId", me(), up();
      },
      unstable_isNewReconciler: re
    }, Zb = {
      readContext: function(e) {
        return qt(e);
      },
      useCallback: function(e, t) {
        return G = "useCallback", me(), Fc(e, t);
      },
      useContext: function(e) {
        return G = "useContext", me(), qt(e);
      },
      useEffect: function(e, t) {
        return G = "useEffect", me(), Ts(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return G = "useImperativeHandle", me(), kc(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return G = "useInsertionEffect", me(), Ac(e, t);
      },
      useLayoutEffect: function(e, t) {
        return G = "useLayoutEffect", me(), Lc(e, t);
      },
      useMemo: function(e, t) {
        G = "useMemo", me();
        var n = ye.current;
        ye.current = Aa;
        try {
          return zc(e, t);
        } finally {
          ye.current = n;
        }
      },
      useReducer: function(e, t, n) {
        G = "useReducer", me();
        var a = ye.current;
        ye.current = Aa;
        try {
          return Qm(e, t, n);
        } finally {
          ye.current = a;
        }
      },
      useRef: function(e) {
        return G = "useRef", me(), Oc();
      },
      useState: function(e) {
        G = "useState", me();
        var t = ye.current;
        ye.current = Aa;
        try {
          return Zm(e);
        } finally {
          ye.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return G = "useDebugValue", me(), Uc();
      },
      useDeferredValue: function(e) {
        return G = "useDeferredValue", me(), Hb(e);
      },
      useTransition: function() {
        return G = "useTransition", me(), Ib();
      },
      useMutableSource: function(e, t, n) {
        return G = "useMutableSource", me(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return G = "useSyncExternalStore", me(), wc(e, t);
      },
      useId: function() {
        return G = "useId", me(), Pc();
      },
      unstable_isNewReconciler: re
    }, ey = {
      readContext: function(e) {
        return qt(e);
      },
      useCallback: function(e, t) {
        return G = "useCallback", me(), Fc(e, t);
      },
      useContext: function(e) {
        return G = "useContext", me(), qt(e);
      },
      useEffect: function(e, t) {
        return G = "useEffect", me(), Ts(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return G = "useImperativeHandle", me(), kc(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return G = "useInsertionEffect", me(), Ac(e, t);
      },
      useLayoutEffect: function(e, t) {
        return G = "useLayoutEffect", me(), Lc(e, t);
      },
      useMemo: function(e, t) {
        G = "useMemo", me();
        var n = ye.current;
        ye.current = Bc;
        try {
          return zc(e, t);
        } finally {
          ye.current = n;
        }
      },
      useReducer: function(e, t, n) {
        G = "useReducer", me();
        var a = ye.current;
        ye.current = Bc;
        try {
          return Xm(e, t, n);
        } finally {
          ye.current = a;
        }
      },
      useRef: function(e) {
        return G = "useRef", me(), Oc();
      },
      useState: function(e) {
        G = "useState", me();
        var t = ye.current;
        ye.current = Bc;
        try {
          return ep(e);
        } finally {
          ye.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return G = "useDebugValue", me(), Uc();
      },
      useDeferredValue: function(e) {
        return G = "useDeferredValue", me(), Bb(e);
      },
      useTransition: function() {
        return G = "useTransition", me(), Yb();
      },
      useMutableSource: function(e, t, n) {
        return G = "useMutableSource", me(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return G = "useSyncExternalStore", me(), wc(e, t);
      },
      useId: function() {
        return G = "useId", me(), Pc();
      },
      unstable_isNewReconciler: re
    }, er = {
      readContext: function(e) {
        return cp(), qt(e);
      },
      useCallback: function(e, t) {
        return G = "useCallback", ke(), st(), ip(e, t);
      },
      useContext: function(e) {
        return G = "useContext", ke(), st(), qt(e);
      },
      useEffect: function(e, t) {
        return G = "useEffect", ke(), st(), Vc(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return G = "useImperativeHandle", ke(), st(), rp(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return G = "useInsertionEffect", ke(), st(), np(e, t);
      },
      useLayoutEffect: function(e, t) {
        return G = "useLayoutEffect", ke(), st(), ap(e, t);
      },
      useMemo: function(e, t) {
        G = "useMemo", ke(), st();
        var n = ye.current;
        ye.current = er;
        try {
          return lp(e, t);
        } finally {
          ye.current = n;
        }
      },
      useReducer: function(e, t, n) {
        G = "useReducer", ke(), st();
        var a = ye.current;
        ye.current = er;
        try {
          return Km(e, t, n);
        } finally {
          ye.current = a;
        }
      },
      useRef: function(e) {
        return G = "useRef", ke(), st(), tp(e);
      },
      useState: function(e) {
        G = "useState", ke(), st();
        var t = ye.current;
        ye.current = er;
        try {
          return _c(e);
        } finally {
          ye.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return G = "useDebugValue", ke(), st(), void 0;
      },
      useDeferredValue: function(e) {
        return G = "useDeferredValue", ke(), st(), op(e);
      },
      useTransition: function() {
        return G = "useTransition", ke(), st(), sp();
      },
      useMutableSource: function(e, t, n) {
        return G = "useMutableSource", ke(), st(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return G = "useSyncExternalStore", ke(), st(), Jm(e, t, n);
      },
      useId: function() {
        return G = "useId", ke(), st(), up();
      },
      unstable_isNewReconciler: re
    }, Aa = {
      readContext: function(e) {
        return cp(), qt(e);
      },
      useCallback: function(e, t) {
        return G = "useCallback", ke(), me(), Fc(e, t);
      },
      useContext: function(e) {
        return G = "useContext", ke(), me(), qt(e);
      },
      useEffect: function(e, t) {
        return G = "useEffect", ke(), me(), Ts(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return G = "useImperativeHandle", ke(), me(), kc(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return G = "useInsertionEffect", ke(), me(), Ac(e, t);
      },
      useLayoutEffect: function(e, t) {
        return G = "useLayoutEffect", ke(), me(), Lc(e, t);
      },
      useMemo: function(e, t) {
        G = "useMemo", ke(), me();
        var n = ye.current;
        ye.current = Aa;
        try {
          return zc(e, t);
        } finally {
          ye.current = n;
        }
      },
      useReducer: function(e, t, n) {
        G = "useReducer", ke(), me();
        var a = ye.current;
        ye.current = Aa;
        try {
          return Qm(e, t, n);
        } finally {
          ye.current = a;
        }
      },
      useRef: function(e) {
        return G = "useRef", ke(), me(), Oc();
      },
      useState: function(e) {
        G = "useState", ke(), me();
        var t = ye.current;
        ye.current = Aa;
        try {
          return Zm(e);
        } finally {
          ye.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return G = "useDebugValue", ke(), me(), Uc();
      },
      useDeferredValue: function(e) {
        return G = "useDeferredValue", ke(), me(), Hb(e);
      },
      useTransition: function() {
        return G = "useTransition", ke(), me(), Ib();
      },
      useMutableSource: function(e, t, n) {
        return G = "useMutableSource", ke(), me(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return G = "useSyncExternalStore", ke(), me(), wc(e, t);
      },
      useId: function() {
        return G = "useId", ke(), me(), Pc();
      },
      unstable_isNewReconciler: re
    }, Bc = {
      readContext: function(e) {
        return cp(), qt(e);
      },
      useCallback: function(e, t) {
        return G = "useCallback", ke(), me(), Fc(e, t);
      },
      useContext: function(e) {
        return G = "useContext", ke(), me(), qt(e);
      },
      useEffect: function(e, t) {
        return G = "useEffect", ke(), me(), Ts(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return G = "useImperativeHandle", ke(), me(), kc(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return G = "useInsertionEffect", ke(), me(), Ac(e, t);
      },
      useLayoutEffect: function(e, t) {
        return G = "useLayoutEffect", ke(), me(), Lc(e, t);
      },
      useMemo: function(e, t) {
        G = "useMemo", ke(), me();
        var n = ye.current;
        ye.current = Aa;
        try {
          return zc(e, t);
        } finally {
          ye.current = n;
        }
      },
      useReducer: function(e, t, n) {
        G = "useReducer", ke(), me();
        var a = ye.current;
        ye.current = Aa;
        try {
          return Xm(e, t, n);
        } finally {
          ye.current = a;
        }
      },
      useRef: function(e) {
        return G = "useRef", ke(), me(), Oc();
      },
      useState: function(e) {
        G = "useState", ke(), me();
        var t = ye.current;
        ye.current = Aa;
        try {
          return ep(e);
        } finally {
          ye.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return G = "useDebugValue", ke(), me(), Uc();
      },
      useDeferredValue: function(e) {
        return G = "useDeferredValue", ke(), me(), Bb(e);
      },
      useTransition: function() {
        return G = "useTransition", ke(), me(), Yb();
      },
      useMutableSource: function(e, t, n) {
        return G = "useMutableSource", ke(), me(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return G = "useSyncExternalStore", ke(), me(), wc(e, t);
      },
      useId: function() {
        return G = "useId", ke(), me(), Pc();
      },
      unstable_isNewReconciler: re
    };
  }
  var ti = f.unstable_now, ty = 0, $c = -1, ws = -1, Ic = -1, dp = !1, Yc = !1;
  function ny() {
    return dp;
  }
  function ZC() {
    Yc = !0;
  }
  function e1() {
    dp = !1, Yc = !1;
  }
  function t1() {
    dp = Yc, Yc = !1;
  }
  function ay() {
    return ty;
  }
  function ry() {
    ty = ti();
  }
  function fp(e) {
    ws = ti(), e.actualStartTime < 0 && (e.actualStartTime = ti());
  }
  function iy(e) {
    ws = -1;
  }
  function qc(e, t) {
    if (ws >= 0) {
      var n = ti() - ws;
      e.actualDuration += n, t && (e.selfBaseDuration = n), ws = -1;
    }
  }
  function tr(e) {
    if ($c >= 0) {
      var t = ti() - $c;
      $c = -1;
      for (var n = e.return; n !== null; ) {
        switch (n.tag) {
          case x:
            var a = n.stateNode;
            a.effectDuration += t;
            return;
          case I:
            var r = n.stateNode;
            r.effectDuration += t;
            return;
        }
        n = n.return;
      }
    }
  }
  function mp(e) {
    if (Ic >= 0) {
      var t = ti() - Ic;
      Ic = -1;
      for (var n = e.return; n !== null; ) {
        switch (n.tag) {
          case x:
            var a = n.stateNode;
            a !== null && (a.passiveEffectDuration += t);
            return;
          case I:
            var r = n.stateNode;
            r !== null && (r.passiveEffectDuration += t);
            return;
        }
        n = n.return;
      }
    }
  }
  function nr() {
    $c = ti();
  }
  function pp() {
    Ic = ti();
  }
  function hp(e) {
    for (var t = e.child; t; )
      e.actualDuration += t.actualDuration, t = t.sibling;
  }
  function La(e, t) {
    if (e && e.defaultProps) {
      var n = Ie({}, t), a = e.defaultProps;
      for (var r in a)
        n[r] === void 0 && (n[r] = a[r]);
      return n;
    }
    return t;
  }
  var vp = {}, gp, bp, yp, Np, xp, ly, Gc, Ep, Sp, Rp, _s;
  {
    gp = /* @__PURE__ */ new Set(), bp = /* @__PURE__ */ new Set(), yp = /* @__PURE__ */ new Set(), Np = /* @__PURE__ */ new Set(), Ep = /* @__PURE__ */ new Set(), xp = /* @__PURE__ */ new Set(), Sp = /* @__PURE__ */ new Set(), Rp = /* @__PURE__ */ new Set(), _s = /* @__PURE__ */ new Set();
    var oy = /* @__PURE__ */ new Set();
    Gc = function(e, t) {
      if (!(e === null || typeof e == "function")) {
        var n = t + "_" + e;
        oy.has(n) || (oy.add(n), d("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t, e));
      }
    }, ly = function(e, t) {
      if (t === void 0) {
        var n = rt(e) || "Component";
        xp.has(n) || (xp.add(n), d("%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.", n));
      }
    }, Object.defineProperty(vp, "_processChildContext", {
      enumerable: !1,
      value: function() {
        throw new Error("_processChildContext is not available in React 16+. This likely means you have multiple copies of React and are attempting to nest a React 15 tree inside a React 16 tree using unstable_renderSubtreeIntoContainer, which isn't supported. Try to make sure you have only one copy of React (and ideally, switch to ReactDOM.createPortal).");
      }
    }), Object.freeze(vp);
  }
  function Dp(e, t, n, a) {
    var r = e.memoizedState, i = n(a, r);
    {
      if (e.mode & kt) {
        cn(!0);
        try {
          i = n(a, r);
        } finally {
          cn(!1);
        }
      }
      ly(t, i);
    }
    var l = i == null ? r : Ie({}, r, i);
    if (e.memoizedState = l, e.lanes === J) {
      var u = e.updateQueue;
      u.baseState = l;
    }
  }
  var Cp = {
    isMounted: qE,
    enqueueSetState: function(e, t, n) {
      var a = ml(e), r = Bn(), i = ii(a), l = Dr(r, i);
      l.payload = t, n != null && (Gc(n, "setState"), l.callback = n);
      var u = Xr(a, l, i);
      u !== null && (ln(u, a, i, r), Ec(u, a, i)), nf(a, i);
    },
    enqueueReplaceState: function(e, t, n) {
      var a = ml(e), r = Bn(), i = ii(a), l = Dr(r, i);
      l.tag = Rb, l.payload = t, n != null && (Gc(n, "replaceState"), l.callback = n);
      var u = Xr(a, l, i);
      u !== null && (ln(u, a, i, r), Ec(u, a, i)), nf(a, i);
    },
    enqueueForceUpdate: function(e, t) {
      var n = ml(e), a = Bn(), r = ii(n), i = Dr(a, r);
      i.tag = yc, t != null && (Gc(t, "forceUpdate"), i.callback = t);
      var l = Xr(n, i, r);
      l !== null && (ln(l, n, r, a), Ec(l, n, r)), SS(n, r);
    }
  };
  function sy(e, t, n, a, r, i, l) {
    var u = e.stateNode;
    if (typeof u.shouldComponentUpdate == "function") {
      var c = u.shouldComponentUpdate(a, i, l);
      {
        if (e.mode & kt) {
          cn(!0);
          try {
            c = u.shouldComponentUpdate(a, i, l);
          } finally {
            cn(!1);
          }
        }
        c === void 0 && d("%s.shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false.", rt(t) || "Component");
      }
      return c;
    }
    return t.prototype && t.prototype.isPureReactComponent ? !Jo(n, a) || !Jo(r, i) : !0;
  }
  function n1(e, t, n) {
    var a = e.stateNode;
    {
      var r = rt(t) || "Component", i = a.render;
      i || (t.prototype && typeof t.prototype.render == "function" ? d("%s(...): No `render` method found on the returned component instance: did you accidentally return an object from the constructor?", r) : d("%s(...): No `render` method found on the returned component instance: you may have forgotten to define `render`.", r)), a.getInitialState && !a.getInitialState.isReactClassApproved && !a.state && d("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?", r), a.getDefaultProps && !a.getDefaultProps.isReactClassApproved && d("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.", r), a.propTypes && d("propTypes was defined as an instance property on %s. Use a static property to define propTypes instead.", r), a.contextType && d("contextType was defined as an instance property on %s. Use a static property to define contextType instead.", r), t.childContextTypes && !_s.has(t) && // Strict Mode has its own warning for legacy context, so we can skip
      // this one.
      (e.mode & kt) === we && (_s.add(t), d(`%s uses the legacy childContextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() instead

.Learn more about this warning here: https://reactjs.org/link/legacy-context`, r)), t.contextTypes && !_s.has(t) && // Strict Mode has its own warning for legacy context, so we can skip
      // this one.
      (e.mode & kt) === we && (_s.add(t), d(`%s uses the legacy contextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() with static contextType instead.

Learn more about this warning here: https://reactjs.org/link/legacy-context`, r)), a.contextTypes && d("contextTypes was defined as an instance property on %s. Use a static property to define contextTypes instead.", r), t.contextType && t.contextTypes && !Sp.has(t) && (Sp.add(t), d("%s declares both contextTypes and contextType static properties. The legacy contextTypes property will be ignored.", r)), typeof a.componentShouldUpdate == "function" && d("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.", r), t.prototype && t.prototype.isPureReactComponent && typeof a.shouldComponentUpdate < "u" && d("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.", rt(t) || "A pure component"), typeof a.componentDidUnmount == "function" && d("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?", r), typeof a.componentDidReceiveProps == "function" && d("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().", r), typeof a.componentWillRecieveProps == "function" && d("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?", r), typeof a.UNSAFE_componentWillRecieveProps == "function" && d("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?", r);
      var l = a.props !== n;
      a.props !== void 0 && l && d("%s(...): When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.", r, r), a.defaultProps && d("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.", r, r), typeof a.getSnapshotBeforeUpdate == "function" && typeof a.componentDidUpdate != "function" && !yp.has(t) && (yp.add(t), d("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.", rt(t))), typeof a.getDerivedStateFromProps == "function" && d("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.", r), typeof a.getDerivedStateFromError == "function" && d("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.", r), typeof t.getSnapshotBeforeUpdate == "function" && d("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.", r);
      var u = a.state;
      u && (typeof u != "object" || Ye(u)) && d("%s.state: must be set to an object or null", r), typeof a.getChildContext == "function" && typeof t.childContextTypes != "object" && d("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().", r);
    }
  }
  function uy(e, t) {
    t.updater = Cp, e.stateNode = t, BE(t, e), t._reactInternalInstance = vp;
  }
  function cy(e, t, n) {
    var a = !1, r = ra, i = ra, l = t.contextType;
    if ("contextType" in t) {
      var u = (
        // Allow null for conditional declaration
        l === null || l !== void 0 && l.$$typeof === he && l._context === void 0
      );
      if (!u && !Rp.has(t)) {
        Rp.add(t);
        var c = "";
        l === void 0 ? c = " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file." : typeof l != "object" ? c = " However, it is set to a " + typeof l + "." : l.$$typeof === ne ? c = " Did you accidentally pass the Context.Provider instead?" : l._context !== void 0 ? c = " Did you accidentally pass the Context.Consumer instead?" : c = " However, it is set to an object with keys {" + Object.keys(l).join(", ") + "}.", d("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s", rt(t) || "Component", c);
      }
    }
    if (typeof l == "object" && l !== null)
      i = qt(l);
    else {
      r = Ml(e, t, !0);
      var h = t.contextTypes;
      a = h != null, i = a ? Vl(e, r) : ra;
    }
    var v = new t(n, i);
    if (e.mode & kt) {
      cn(!0);
      try {
        v = new t(n, i);
      } finally {
        cn(!1);
      }
    }
    var C = e.memoizedState = v.state !== null && v.state !== void 0 ? v.state : null;
    uy(e, v);
    {
      if (typeof t.getDerivedStateFromProps == "function" && C === null) {
        var D = rt(t) || "Component";
        bp.has(D) || (bp.add(D), d("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.", D, v.state === null ? "null" : "undefined", D));
      }
      if (typeof t.getDerivedStateFromProps == "function" || typeof v.getSnapshotBeforeUpdate == "function") {
        var M = null, A = null, B = null;
        if (typeof v.componentWillMount == "function" && v.componentWillMount.__suppressDeprecationWarning !== !0 ? M = "componentWillMount" : typeof v.UNSAFE_componentWillMount == "function" && (M = "UNSAFE_componentWillMount"), typeof v.componentWillReceiveProps == "function" && v.componentWillReceiveProps.__suppressDeprecationWarning !== !0 ? A = "componentWillReceiveProps" : typeof v.UNSAFE_componentWillReceiveProps == "function" && (A = "UNSAFE_componentWillReceiveProps"), typeof v.componentWillUpdate == "function" && v.componentWillUpdate.__suppressDeprecationWarning !== !0 ? B = "componentWillUpdate" : typeof v.UNSAFE_componentWillUpdate == "function" && (B = "UNSAFE_componentWillUpdate"), M !== null || A !== null || B !== null) {
          var ve = rt(t) || "Component", je = typeof t.getDerivedStateFromProps == "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
          Np.has(ve) || (Np.add(ve), d(`Unsafe legacy lifecycles will not be called for components using new component APIs.

%s uses %s but also contains the following legacy lifecycles:%s%s%s

The above lifecycles should be removed. Learn more about this warning here:
https://reactjs.org/link/unsafe-component-lifecycles`, ve, je, M !== null ? `
  ` + M : "", A !== null ? `
  ` + A : "", B !== null ? `
  ` + B : ""));
        }
      }
    }
    return a && Zg(e, r, i), v;
  }
  function a1(e, t) {
    var n = t.state;
    typeof t.componentWillMount == "function" && t.componentWillMount(), typeof t.UNSAFE_componentWillMount == "function" && t.UNSAFE_componentWillMount(), n !== t.state && (d("%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", ze(e) || "Component"), Cp.enqueueReplaceState(t, t.state, null));
  }
  function dy(e, t, n, a) {
    var r = t.state;
    if (typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, a), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, a), t.state !== r) {
      {
        var i = ze(e) || "Component";
        gp.has(i) || (gp.add(i), d("%s.componentWillReceiveProps(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", i));
      }
      Cp.enqueueReplaceState(t, t.state, null);
    }
  }
  function jp(e, t, n, a) {
    n1(e, t, n);
    var r = e.stateNode;
    r.props = n, r.state = e.memoizedState, r.refs = {}, km(e);
    var i = t.contextType;
    if (typeof i == "object" && i !== null)
      r.context = qt(i);
    else {
      var l = Ml(e, t, !0);
      r.context = Vl(e, l);
    }
    {
      if (r.state === n) {
        var u = rt(t) || "Component";
        Ep.has(u) || (Ep.add(u), d("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.", u));
      }
      e.mode & kt && Ma.recordLegacyContextWarning(e, r), Ma.recordUnsafeLifecycleWarnings(e, r);
    }
    r.state = e.memoizedState;
    var c = t.getDerivedStateFromProps;
    if (typeof c == "function" && (Dp(e, t, c, n), r.state = e.memoizedState), typeof t.getDerivedStateFromProps != "function" && typeof r.getSnapshotBeforeUpdate != "function" && (typeof r.UNSAFE_componentWillMount == "function" || typeof r.componentWillMount == "function") && (a1(e, r), Sc(e, n, r, a), r.state = e.memoizedState), typeof r.componentDidMount == "function") {
      var h = it;
      h |= Ci, (e.mode & Wa) !== we && (h |= zr), e.flags |= h;
    }
  }
  function r1(e, t, n, a) {
    var r = e.stateNode, i = e.memoizedProps;
    r.props = i;
    var l = r.context, u = t.contextType, c = ra;
    if (typeof u == "object" && u !== null)
      c = qt(u);
    else {
      var h = Ml(e, t, !0);
      c = Vl(e, h);
    }
    var v = t.getDerivedStateFromProps, C = typeof v == "function" || typeof r.getSnapshotBeforeUpdate == "function";
    !C && (typeof r.UNSAFE_componentWillReceiveProps == "function" || typeof r.componentWillReceiveProps == "function") && (i !== n || l !== c) && dy(e, r, n, c), Cb();
    var D = e.memoizedState, M = r.state = D;
    if (Sc(e, n, r, a), M = e.memoizedState, i === n && D === M && !rc() && !Rc()) {
      if (typeof r.componentDidMount == "function") {
        var A = it;
        A |= Ci, (e.mode & Wa) !== we && (A |= zr), e.flags |= A;
      }
      return !1;
    }
    typeof v == "function" && (Dp(e, t, v, n), M = e.memoizedState);
    var B = Rc() || sy(e, t, i, n, D, M, c);
    if (B) {
      if (!C && (typeof r.UNSAFE_componentWillMount == "function" || typeof r.componentWillMount == "function") && (typeof r.componentWillMount == "function" && r.componentWillMount(), typeof r.UNSAFE_componentWillMount == "function" && r.UNSAFE_componentWillMount()), typeof r.componentDidMount == "function") {
        var ve = it;
        ve |= Ci, (e.mode & Wa) !== we && (ve |= zr), e.flags |= ve;
      }
    } else {
      if (typeof r.componentDidMount == "function") {
        var je = it;
        je |= Ci, (e.mode & Wa) !== we && (je |= zr), e.flags |= je;
      }
      e.memoizedProps = n, e.memoizedState = M;
    }
    return r.props = n, r.state = M, r.context = c, B;
  }
  function i1(e, t, n, a, r) {
    var i = t.stateNode;
    Db(e, t);
    var l = t.memoizedProps, u = t.type === t.elementType ? l : La(t.type, l);
    i.props = u;
    var c = t.pendingProps, h = i.context, v = n.contextType, C = ra;
    if (typeof v == "object" && v !== null)
      C = qt(v);
    else {
      var D = Ml(t, n, !0);
      C = Vl(t, D);
    }
    var M = n.getDerivedStateFromProps, A = typeof M == "function" || typeof i.getSnapshotBeforeUpdate == "function";
    !A && (typeof i.UNSAFE_componentWillReceiveProps == "function" || typeof i.componentWillReceiveProps == "function") && (l !== c || h !== C) && dy(t, i, a, C), Cb();
    var B = t.memoizedState, ve = i.state = B;
    if (Sc(t, a, i, r), ve = t.memoizedState, l === c && B === ve && !rc() && !Rc() && !Re)
      return typeof i.componentDidUpdate == "function" && (l !== e.memoizedProps || B !== e.memoizedState) && (t.flags |= it), typeof i.getSnapshotBeforeUpdate == "function" && (l !== e.memoizedProps || B !== e.memoizedState) && (t.flags |= hl), !1;
    typeof M == "function" && (Dp(t, n, M, a), ve = t.memoizedState);
    var je = Rc() || sy(t, n, u, a, B, ve, C) || // TODO: In some cases, we'll end up checking if context has changed twice,
    // both before and after `shouldComponentUpdate` has been called. Not ideal,
    // but I'm loath to refactor this function. This only happens for memoized
    // components so it's not that common.
    Re;
    return je ? (!A && (typeof i.UNSAFE_componentWillUpdate == "function" || typeof i.componentWillUpdate == "function") && (typeof i.componentWillUpdate == "function" && i.componentWillUpdate(a, ve, C), typeof i.UNSAFE_componentWillUpdate == "function" && i.UNSAFE_componentWillUpdate(a, ve, C)), typeof i.componentDidUpdate == "function" && (t.flags |= it), typeof i.getSnapshotBeforeUpdate == "function" && (t.flags |= hl)) : (typeof i.componentDidUpdate == "function" && (l !== e.memoizedProps || B !== e.memoizedState) && (t.flags |= it), typeof i.getSnapshotBeforeUpdate == "function" && (l !== e.memoizedProps || B !== e.memoizedState) && (t.flags |= hl), t.memoizedProps = a, t.memoizedState = ve), i.props = a, i.state = ve, i.context = C, je;
  }
  function Ii(e, t) {
    return {
      value: e,
      source: t,
      stack: bi(t),
      digest: null
    };
  }
  function Tp(e, t, n) {
    return {
      value: e,
      source: null,
      stack: n ?? null,
      digest: t ?? null
    };
  }
  function l1(e, t) {
    return !0;
  }
  function wp(e, t) {
    try {
      var n = l1(e, t);
      if (n === !1)
        return;
      var a = t.value, r = t.source, i = t.stack, l = i !== null ? i : "";
      if (a != null && a._suppressLogging) {
        if (e.tag === j)
          return;
        console.error(a);
      }
      var u = r ? ze(r) : null, c = u ? "The above error occurred in the <" + u + "> component:" : "The above error occurred in one of your React components:", h;
      if (e.tag === x)
        h = `Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.`;
      else {
        var v = ze(e) || "Anonymous";
        h = "React will try to recreate this component tree from scratch " + ("using the error boundary you provided, " + v + ".");
      }
      var C = c + `
` + l + `

` + ("" + h);
      console.error(C);
    } catch (D) {
      setTimeout(function() {
        throw D;
      });
    }
  }
  var o1 = typeof WeakMap == "function" ? WeakMap : Map;
  function fy(e, t, n) {
    var a = Dr(xt, n);
    a.tag = Am, a.payload = {
      element: null
    };
    var r = t.value;
    return a.callback = function() {
      Zj(r), wp(e, t);
    }, a;
  }
  function _p(e, t, n) {
    var a = Dr(xt, n);
    a.tag = Am;
    var r = e.type.getDerivedStateFromError;
    if (typeof r == "function") {
      var i = t.value;
      a.payload = function() {
        return r(i);
      }, a.callback = function() {
        SN(e), wp(e, t);
      };
    }
    var l = e.stateNode;
    return l !== null && typeof l.componentDidCatch == "function" && (a.callback = function() {
      SN(e), wp(e, t), typeof r != "function" && Xj(this);
      var c = t.value, h = t.stack;
      this.componentDidCatch(c, {
        componentStack: h !== null ? h : ""
      }), typeof r != "function" && (ea(e.lanes, Le) || d("%s: Error boundaries should implement getDerivedStateFromError(). In that method, return a state update to display an error message or fallback UI.", ze(e) || "Unknown"));
    }), a;
  }
  function my(e, t, n) {
    var a = e.pingCache, r;
    if (a === null ? (a = e.pingCache = new o1(), r = /* @__PURE__ */ new Set(), a.set(t, r)) : (r = a.get(t), r === void 0 && (r = /* @__PURE__ */ new Set(), a.set(t, r))), !r.has(n)) {
      r.add(n);
      var i = eT.bind(null, e, t, n);
      Ta && Gs(e, n), t.then(i, i);
    }
  }
  function s1(e, t, n, a) {
    var r = e.updateQueue;
    if (r === null) {
      var i = /* @__PURE__ */ new Set();
      i.add(n), e.updateQueue = i;
    } else
      r.add(n);
  }
  function u1(e, t) {
    var n = e.tag;
    if ((e.mode & Xe) === we && (n === R || n === P || n === U)) {
      var a = e.alternate;
      a ? (e.updateQueue = a.updateQueue, e.memoizedState = a.memoizedState, e.lanes = a.lanes) : (e.updateQueue = null, e.memoizedState = null);
    }
  }
  function py(e) {
    var t = e;
    do {
      if (t.tag === ee && $C(t))
        return t;
      t = t.return;
    } while (t !== null);
    return null;
  }
  function hy(e, t, n, a, r) {
    if ((e.mode & Xe) === we) {
      if (e === t)
        e.flags |= zn;
      else {
        if (e.flags |= lt, n.flags |= Wd, n.flags &= -52805, n.tag === j) {
          var i = n.alternate;
          if (i === null)
            n.tag = X;
          else {
            var l = Dr(xt, Le);
            l.tag = yc, Xr(n, l, Le);
          }
        }
        n.lanes = Be(n.lanes, Le);
      }
      return e;
    }
    return e.flags |= zn, e.lanes = r, e;
  }
  function c1(e, t, n, a, r) {
    if (n.flags |= Eu, Ta && Gs(e, r), a !== null && typeof a == "object" && typeof a.then == "function") {
      var i = a;
      u1(n), gn() && n.mode & Xe && lb();
      var l = py(t);
      if (l !== null) {
        l.flags &= ~pr, hy(l, t, n, e, r), l.mode & Xe && my(e, i, r), s1(l, e, i);
        return;
      } else {
        if (!MS(r)) {
          my(e, i, r), uh();
          return;
        }
        var u = new Error("A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator. To fix, updates that suspend should be wrapped with startTransition.");
        a = u;
      }
    } else if (gn() && n.mode & Xe) {
      lb();
      var c = py(t);
      if (c !== null) {
        (c.flags & zn) === Oe && (c.flags |= pr), hy(c, t, n, e, r), Em(Ii(a, n));
        return;
      }
    }
    a = Ii(a, n), $j(a);
    var h = t;
    do {
      switch (h.tag) {
        case x: {
          var v = a;
          h.flags |= zn;
          var C = Uo(r);
          h.lanes = Be(h.lanes, C);
          var D = fy(h, v, C);
          Um(h, D);
          return;
        }
        case j:
          var M = a, A = h.type, B = h.stateNode;
          if ((h.flags & lt) === Oe && (typeof A.getDerivedStateFromError == "function" || B !== null && typeof B.componentDidCatch == "function" && !pN(B))) {
            h.flags |= zn;
            var ve = Uo(r);
            h.lanes = Be(h.lanes, ve);
            var je = _p(h, M, ve);
            Um(h, je);
            return;
          }
          break;
      }
      h = h.return;
    } while (h !== null);
  }
  function d1() {
    return null;
  }
  var Os = p.ReactCurrentOwner, ka = !1, Op, Ms, Mp, Vp, Ap, Yi, Lp, Wc, Vs;
  Op = {}, Ms = {}, Mp = {}, Vp = {}, Ap = {}, Yi = !1, Lp = {}, Wc = {}, Vs = {};
  function Pn(e, t, n, a) {
    e === null ? t.child = bb(t, null, n, a) : t.child = Ul(t, e.child, n, a);
  }
  function f1(e, t, n, a) {
    t.child = Ul(t, e.child, null, a), t.child = Ul(t, null, n, a);
  }
  function vy(e, t, n, a, r) {
    if (t.type !== t.elementType) {
      var i = n.propTypes;
      i && _a(
        i,
        a,
        // Resolved props
        "prop",
        rt(n)
      );
    }
    var l = n.render, u = t.ref, c, h;
    zl(t, r), Oo(t);
    {
      if (Os.current = t, fa(!0), c = Yl(e, t, l, a, u, r), h = ql(), t.mode & kt) {
        cn(!0);
        try {
          c = Yl(e, t, l, a, u, r), h = ql();
        } finally {
          cn(!1);
        }
      }
      fa(!1);
    }
    return bl(), e !== null && !ka ? (Mb(e, t, r), Cr(e, t, r)) : (gn() && h && vm(t), t.flags |= pl, Pn(e, t, c, r), t.child);
  }
  function gy(e, t, n, a, r) {
    if (e === null) {
      var i = n.type;
      if (gT(i) && n.compare === null && // SimpleMemoComponent codepath doesn't resolve outer props either.
      n.defaultProps === void 0) {
        var l = i;
        return l = eo(i), t.tag = U, t.type = l, Fp(t, i), by(e, t, l, a, r);
      }
      {
        var u = i.propTypes;
        if (u && _a(
          u,
          a,
          // Resolved props
          "prop",
          rt(i)
        ), n.defaultProps !== void 0) {
          var c = rt(i) || "Unknown";
          Vs[c] || (d("%s: Support for defaultProps will be removed from memo components in a future major release. Use JavaScript default parameters instead.", c), Vs[c] = !0);
        }
      }
      var h = Nh(n.type, null, a, t, t.mode, r);
      return h.ref = t.ref, h.return = t, t.child = h, h;
    }
    {
      var v = n.type, C = v.propTypes;
      C && _a(
        C,
        a,
        // Resolved props
        "prop",
        rt(v)
      );
    }
    var D = e.child, M = Ip(e, r);
    if (!M) {
      var A = D.memoizedProps, B = n.compare;
      if (B = B !== null ? B : Jo, B(A, a) && e.ref === t.ref)
        return Cr(e, t, r);
    }
    t.flags |= pl;
    var ve = Qi(D, a);
    return ve.ref = t.ref, ve.return = t, t.child = ve, ve;
  }
  function by(e, t, n, a, r) {
    if (t.type !== t.elementType) {
      var i = t.elementType;
      if (i.$$typeof === Te) {
        var l = i, u = l._payload, c = l._init;
        try {
          i = c(u);
        } catch {
          i = null;
        }
        var h = i && i.propTypes;
        h && _a(
          h,
          a,
          // Resolved (SimpleMemoComponent has no defaultProps)
          "prop",
          rt(i)
        );
      }
    }
    if (e !== null) {
      var v = e.memoizedProps;
      if (Jo(v, a) && e.ref === t.ref && // Prevent bailout if the implementation changed due to hot reload.
      t.type === e.type)
        if (ka = !1, t.pendingProps = a = v, Ip(e, r))
          (e.flags & Wd) !== Oe && (ka = !0);
        else return t.lanes = e.lanes, Cr(e, t, r);
    }
    return kp(e, t, n, a, r);
  }
  function yy(e, t, n) {
    var a = t.pendingProps, r = a.children, i = e !== null ? e.memoizedState : null;
    if (a.mode === "hidden" || Pe)
      if ((t.mode & Xe) === we) {
        var l = {
          baseLanes: J,
          cachePool: null,
          transitions: null
        };
        t.memoizedState = l, od(t, n);
      } else if (ea(n, Zn)) {
        var C = {
          baseLanes: J,
          cachePool: null,
          transitions: null
        };
        t.memoizedState = C;
        var D = i !== null ? i.baseLanes : n;
        od(t, D);
      } else {
        var u = null, c;
        if (i !== null) {
          var h = i.baseLanes;
          c = Be(h, n);
        } else
          c = n;
        t.lanes = t.childLanes = Zn;
        var v = {
          baseLanes: c,
          cachePool: u,
          transitions: null
        };
        return t.memoizedState = v, t.updateQueue = null, od(t, c), null;
      }
    else {
      var M;
      i !== null ? (M = Be(i.baseLanes, n), t.memoizedState = null) : M = n, od(t, M);
    }
    return Pn(e, t, r, n), t.child;
  }
  function m1(e, t, n) {
    var a = t.pendingProps;
    return Pn(e, t, a, n), t.child;
  }
  function p1(e, t, n) {
    var a = t.pendingProps.children;
    return Pn(e, t, a, n), t.child;
  }
  function h1(e, t, n) {
    {
      t.flags |= it;
      {
        var a = t.stateNode;
        a.effectDuration = 0, a.passiveEffectDuration = 0;
      }
    }
    var r = t.pendingProps, i = r.children;
    return Pn(e, t, i, n), t.child;
  }
  function Ny(e, t) {
    var n = t.ref;
    (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= Ri, t.flags |= Kd);
  }
  function kp(e, t, n, a, r) {
    if (t.type !== t.elementType) {
      var i = n.propTypes;
      i && _a(
        i,
        a,
        // Resolved props
        "prop",
        rt(n)
      );
    }
    var l;
    {
      var u = Ml(t, n, !0);
      l = Vl(t, u);
    }
    var c, h;
    zl(t, r), Oo(t);
    {
      if (Os.current = t, fa(!0), c = Yl(e, t, n, a, l, r), h = ql(), t.mode & kt) {
        cn(!0);
        try {
          c = Yl(e, t, n, a, l, r), h = ql();
        } finally {
          cn(!1);
        }
      }
      fa(!1);
    }
    return bl(), e !== null && !ka ? (Mb(e, t, r), Cr(e, t, r)) : (gn() && h && vm(t), t.flags |= pl, Pn(e, t, c, r), t.child);
  }
  function xy(e, t, n, a, r) {
    {
      switch (MT(t)) {
        case !1: {
          var i = t.stateNode, l = t.type, u = new l(t.memoizedProps, i.context), c = u.state;
          i.updater.enqueueSetState(i, c, null);
          break;
        }
        case !0: {
          t.flags |= lt, t.flags |= zn;
          var h = new Error("Simulated error coming from DevTools"), v = Uo(r);
          t.lanes = Be(t.lanes, v);
          var C = _p(t, Ii(h, t), v);
          Um(t, C);
          break;
        }
      }
      if (t.type !== t.elementType) {
        var D = n.propTypes;
        D && _a(
          D,
          a,
          // Resolved props
          "prop",
          rt(n)
        );
      }
    }
    var M;
    Xa(n) ? (M = !0, lc(t)) : M = !1, zl(t, r);
    var A = t.stateNode, B;
    A === null ? (Qc(e, t), cy(t, n, a), jp(t, n, a, r), B = !0) : e === null ? B = r1(t, n, a, r) : B = i1(e, t, n, a, r);
    var ve = Up(e, t, n, B, M, r);
    {
      var je = t.stateNode;
      B && je.props !== a && (Yi || d("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.", ze(t) || "a component"), Yi = !0);
    }
    return ve;
  }
  function Up(e, t, n, a, r, i) {
    Ny(e, t);
    var l = (t.flags & lt) !== Oe;
    if (!a && !l)
      return r && nb(t, n, !1), Cr(e, t, i);
    var u = t.stateNode;
    Os.current = t;
    var c;
    if (l && typeof n.getDerivedStateFromError != "function")
      c = null, iy();
    else {
      Oo(t);
      {
        if (fa(!0), c = u.render(), t.mode & kt) {
          cn(!0);
          try {
            u.render();
          } finally {
            cn(!1);
          }
        }
        fa(!1);
      }
      bl();
    }
    return t.flags |= pl, e !== null && l ? f1(e, t, c, i) : Pn(e, t, c, i), t.memoizedState = u.state, r && nb(t, n, !0), t.child;
  }
  function Ey(e) {
    var t = e.stateNode;
    t.pendingContext ? eb(e, t.pendingContext, t.pendingContext !== t.context) : t.context && eb(e, t.context, !1), Fm(e, t.containerInfo);
  }
  function v1(e, t, n) {
    if (Ey(t), e === null)
      throw new Error("Should have a current fiber. This is a bug in React.");
    var a = t.pendingProps, r = t.memoizedState, i = r.element;
    Db(e, t), Sc(t, a, null, n);
    var l = t.memoizedState;
    t.stateNode;
    var u = l.element;
    if (r.isDehydrated) {
      var c = {
        element: u,
        isDehydrated: !1,
        cache: l.cache,
        pendingSuspenseBoundaries: l.pendingSuspenseBoundaries,
        transitions: l.transitions
      }, h = t.updateQueue;
      if (h.baseState = c, t.memoizedState = c, t.flags & pr) {
        var v = Ii(new Error("There was an error while hydrating. Because the error happened outside of a Suspense boundary, the entire root will switch to client rendering."), t);
        return Sy(e, t, u, n, v);
      } else if (u !== i) {
        var C = Ii(new Error("This root received an early update, before anything was able hydrate. Switched the entire root to client rendering."), t);
        return Sy(e, t, u, n, C);
      } else {
        yC(t);
        var D = bb(t, null, u, n);
        t.child = D;
        for (var M = D; M; )
          M.flags = M.flags & ~Yt | hr, M = M.sibling;
      }
    } else {
      if (kl(), u === i)
        return Cr(e, t, n);
      Pn(e, t, u, n);
    }
    return t.child;
  }
  function Sy(e, t, n, a, r) {
    return kl(), Em(r), t.flags |= pr, Pn(e, t, n, a), t.child;
  }
  function g1(e, t, n) {
    wb(t), e === null && xm(t);
    var a = t.type, r = t.pendingProps, i = e !== null ? e.memoizedProps : null, l = r.children, u = nm(a, r);
    return u ? l = null : i !== null && nm(a, i) && (t.flags |= wo), Ny(e, t), Pn(e, t, l, n), t.child;
  }
  function b1(e, t) {
    return e === null && xm(t), null;
  }
  function y1(e, t, n, a) {
    Qc(e, t);
    var r = t.pendingProps, i = n, l = i._payload, u = i._init, c = u(l);
    t.type = c;
    var h = t.tag = bT(c), v = La(c, r), C;
    switch (h) {
      case R:
        return Fp(t, c), t.type = c = eo(c), C = kp(null, t, c, v, a), C;
      case j:
        return t.type = c = ph(c), C = xy(null, t, c, v, a), C;
      case P:
        return t.type = c = hh(c), C = vy(null, t, c, v, a), C;
      case z: {
        if (t.type !== t.elementType) {
          var D = c.propTypes;
          D && _a(
            D,
            v,
            // Resolved for outer only
            "prop",
            rt(c)
          );
        }
        return C = gy(
          null,
          t,
          c,
          La(c.type, v),
          // The inner type can have defaults too
          a
        ), C;
      }
    }
    var M = "";
    throw c !== null && typeof c == "object" && c.$$typeof === Te && (M = " Did you wrap a component in React.lazy() more than once?"), new Error("Element type is invalid. Received a promise that resolves to: " + c + ". " + ("Lazy element type must resolve to a class or function." + M));
  }
  function N1(e, t, n, a, r) {
    Qc(e, t), t.tag = j;
    var i;
    return Xa(n) ? (i = !0, lc(t)) : i = !1, zl(t, r), cy(t, n, a), jp(t, n, a, r), Up(null, t, n, !0, i, r);
  }
  function x1(e, t, n, a) {
    Qc(e, t);
    var r = t.pendingProps, i;
    {
      var l = Ml(t, n, !1);
      i = Vl(t, l);
    }
    zl(t, a);
    var u, c;
    Oo(t);
    {
      if (n.prototype && typeof n.prototype.render == "function") {
        var h = rt(n) || "Unknown";
        Op[h] || (d("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.", h, h), Op[h] = !0);
      }
      t.mode & kt && Ma.recordLegacyContextWarning(t, null), fa(!0), Os.current = t, u = Yl(null, t, n, r, i, a), c = ql(), fa(!1);
    }
    if (bl(), t.flags |= pl, typeof u == "object" && u !== null && typeof u.render == "function" && u.$$typeof === void 0) {
      var v = rt(n) || "Unknown";
      Ms[v] || (d("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", v, v, v), Ms[v] = !0);
    }
    if (
      // Run these checks in production only if the flag is off.
      // Eventually we'll delete this branch altogether.
      typeof u == "object" && u !== null && typeof u.render == "function" && u.$$typeof === void 0
    ) {
      {
        var C = rt(n) || "Unknown";
        Ms[C] || (d("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", C, C, C), Ms[C] = !0);
      }
      t.tag = j, t.memoizedState = null, t.updateQueue = null;
      var D = !1;
      return Xa(n) ? (D = !0, lc(t)) : D = !1, t.memoizedState = u.state !== null && u.state !== void 0 ? u.state : null, km(t), uy(t, u), jp(t, n, r, a), Up(null, t, n, !0, D, a);
    } else {
      if (t.tag = R, t.mode & kt) {
        cn(!0);
        try {
          u = Yl(null, t, n, r, i, a), c = ql();
        } finally {
          cn(!1);
        }
      }
      return gn() && c && vm(t), Pn(null, t, u, a), Fp(t, n), t.child;
    }
  }
  function Fp(e, t) {
    {
      if (t && t.childContextTypes && d("%s(...): childContextTypes cannot be defined on a function component.", t.displayName || t.name || "Component"), e.ref !== null) {
        var n = "", a = kr();
        a && (n += `

Check the render method of \`` + a + "`.");
        var r = a || "", i = e._debugSource;
        i && (r = i.fileName + ":" + i.lineNumber), Ap[r] || (Ap[r] = !0, d("Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?%s", n));
      }
      if (t.defaultProps !== void 0) {
        var l = rt(t) || "Unknown";
        Vs[l] || (d("%s: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.", l), Vs[l] = !0);
      }
      if (typeof t.getDerivedStateFromProps == "function") {
        var u = rt(t) || "Unknown";
        Vp[u] || (d("%s: Function components do not support getDerivedStateFromProps.", u), Vp[u] = !0);
      }
      if (typeof t.contextType == "object" && t.contextType !== null) {
        var c = rt(t) || "Unknown";
        Mp[c] || (d("%s: Function components do not support contextType.", c), Mp[c] = !0);
      }
    }
  }
  var zp = {
    dehydrated: null,
    treeContext: null,
    retryLane: dn
  };
  function Pp(e) {
    return {
      baseLanes: e,
      cachePool: d1(),
      transitions: null
    };
  }
  function E1(e, t) {
    var n = null;
    return {
      baseLanes: Be(e.baseLanes, t),
      cachePool: n,
      transitions: e.transitions
    };
  }
  function S1(e, t, n, a) {
    if (t !== null) {
      var r = t.memoizedState;
      if (r === null)
        return !1;
    }
    return Hm(e, Es);
  }
  function R1(e, t) {
    return wu(e.childLanes, t);
  }
  function Ry(e, t, n) {
    var a = t.pendingProps;
    VT(t) && (t.flags |= lt);
    var r = Va.current, i = !1, l = (t.flags & lt) !== Oe;
    if (l || S1(r, e) ? (i = !0, t.flags &= ~lt) : (e === null || e.memoizedState !== null) && (r = BC(r, Ob)), r = Hl(r), Zr(t, r), e === null) {
      xm(t);
      var u = t.memoizedState;
      if (u !== null) {
        var c = u.dehydrated;
        if (c !== null)
          return w1(t, c);
      }
      var h = a.children, v = a.fallback;
      if (i) {
        var C = D1(t, h, v, n), D = t.child;
        return D.memoizedState = Pp(n), t.memoizedState = zp, C;
      } else
        return Hp(t, h);
    } else {
      var M = e.memoizedState;
      if (M !== null) {
        var A = M.dehydrated;
        if (A !== null)
          return _1(e, t, l, a, A, M, n);
      }
      if (i) {
        var B = a.fallback, ve = a.children, je = j1(e, t, ve, B, n), Se = t.child, Ze = e.child.memoizedState;
        return Se.memoizedState = Ze === null ? Pp(n) : E1(Ze, n), Se.childLanes = R1(e, n), t.memoizedState = zp, je;
      } else {
        var qe = a.children, _ = C1(e, t, qe, n);
        return t.memoizedState = null, _;
      }
    }
  }
  function Hp(e, t, n) {
    var a = e.mode, r = {
      mode: "visible",
      children: t
    }, i = Bp(r, a);
    return i.return = e, e.child = i, i;
  }
  function D1(e, t, n, a) {
    var r = e.mode, i = e.child, l = {
      mode: "hidden",
      children: t
    }, u, c;
    return (r & Xe) === we && i !== null ? (u = i, u.childLanes = J, u.pendingProps = l, e.mode & ft && (u.actualDuration = 0, u.actualStartTime = -1, u.selfBaseDuration = 0, u.treeBaseDuration = 0), c = oi(n, r, a, null)) : (u = Bp(l, r), c = oi(n, r, a, null)), u.return = e, c.return = e, u.sibling = c, e.child = u, c;
  }
  function Bp(e, t, n) {
    return DN(e, t, J, null);
  }
  function Dy(e, t) {
    return Qi(e, t);
  }
  function C1(e, t, n, a) {
    var r = e.child, i = r.sibling, l = Dy(r, {
      mode: "visible",
      children: n
    });
    if ((t.mode & Xe) === we && (l.lanes = a), l.return = t, l.sibling = null, i !== null) {
      var u = t.deletions;
      u === null ? (t.deletions = [i], t.flags |= Si) : u.push(i);
    }
    return t.child = l, l;
  }
  function j1(e, t, n, a, r) {
    var i = t.mode, l = e.child, u = l.sibling, c = {
      mode: "hidden",
      children: n
    }, h;
    if (
      // In legacy mode, we commit the primary tree as if it successfully
      // completed, even though it's in an inconsistent state.
      (i & Xe) === we && // Make sure we're on the second pass, i.e. the primary child fragment was
      // already cloned. In legacy mode, the only case where this isn't true is
      // when DevTools forces us to display a fallback; we skip the first render
      // pass entirely and go straight to rendering the fallback. (In Concurrent
      // Mode, SuspenseList can also trigger this scenario, but this is a legacy-
      // only codepath.)
      t.child !== l
    ) {
      var v = t.child;
      h = v, h.childLanes = J, h.pendingProps = c, t.mode & ft && (h.actualDuration = 0, h.actualStartTime = -1, h.selfBaseDuration = l.selfBaseDuration, h.treeBaseDuration = l.treeBaseDuration), t.deletions = null;
    } else
      h = Dy(l, c), h.subtreeFlags = l.subtreeFlags & vr;
    var C;
    return u !== null ? C = Qi(u, a) : (C = oi(a, i, r, null), C.flags |= Yt), C.return = t, h.return = t, h.sibling = C, t.child = h, C;
  }
  function Kc(e, t, n, a) {
    a !== null && Em(a), Ul(t, e.child, null, n);
    var r = t.pendingProps, i = r.children, l = Hp(t, i);
    return l.flags |= Yt, t.memoizedState = null, l;
  }
  function T1(e, t, n, a, r) {
    var i = t.mode, l = {
      mode: "visible",
      children: n
    }, u = Bp(l, i), c = oi(a, i, r, null);
    return c.flags |= Yt, u.return = t, c.return = t, u.sibling = c, t.child = u, (t.mode & Xe) !== we && Ul(t, e.child, null, r), c;
  }
  function w1(e, t, n) {
    return (e.mode & Xe) === we ? (d("Cannot hydrate Suspense in legacy mode. Switch from ReactDOM.hydrate(element, container) to ReactDOMClient.hydrateRoot(container, <App />).render(element) or remove the Suspense components from the server rendered components."), e.lanes = Le) : lm(t) ? e.lanes = wi : e.lanes = Zn, null;
  }
  function _1(e, t, n, a, r, i, l) {
    if (n)
      if (t.flags & pr) {
        t.flags &= ~pr;
        var _ = Tp(new Error("There was an error while hydrating this Suspense boundary. Switched to client rendering."));
        return Kc(e, t, l, _);
      } else {
        if (t.memoizedState !== null)
          return t.child = e.child, t.flags |= lt, null;
        var $ = a.children, O = a.fallback, ae = T1(e, t, $, O, l), Ne = t.child;
        return Ne.memoizedState = Pp(l), t.memoizedState = zp, ae;
      }
    else {
      if (gC(), (t.mode & Xe) === we)
        return Kc(
          e,
          t,
          l,
          // TODO: When we delete legacy mode, we should make this error argument
          // required — every concurrent mode path that causes hydration to
          // de-opt to client rendering should have an error message.
          null
        );
      if (lm(r)) {
        var u, c, h;
        {
          var v = AD(r);
          u = v.digest, c = v.message, h = v.stack;
        }
        var C;
        c ? C = new Error(c) : C = new Error("The server could not finish this Suspense boundary, likely due to an error during server rendering. Switched to client rendering.");
        var D = Tp(C, u, h);
        return Kc(e, t, l, D);
      }
      var M = ea(l, e.childLanes);
      if (ka || M) {
        var A = ld();
        if (A !== null) {
          var B = PS(A, l);
          if (B !== dn && B !== i.retryLane) {
            i.retryLane = B;
            var ve = xt;
            Gn(e, B), ln(A, e, B, ve);
          }
        }
        uh();
        var je = Tp(new Error("This Suspense boundary received an update before it finished hydrating. This caused the boundary to switch to client rendering. The usual way to fix this is to wrap the original update in startTransition."));
        return Kc(e, t, l, je);
      } else if (Wg(r)) {
        t.flags |= lt, t.child = e.child;
        var Se = tT.bind(null, e);
        return LD(r, Se), null;
      } else {
        NC(t, r, i.treeContext);
        var Ze = a.children, qe = Hp(t, Ze);
        return qe.flags |= hr, qe;
      }
    }
  }
  function Cy(e, t, n) {
    e.lanes = Be(e.lanes, t);
    var a = e.alternate;
    a !== null && (a.lanes = Be(a.lanes, t)), Mm(e.return, t, n);
  }
  function O1(e, t, n) {
    for (var a = t; a !== null; ) {
      if (a.tag === ee) {
        var r = a.memoizedState;
        r !== null && Cy(a, n, e);
      } else if (a.tag === oe)
        Cy(a, n, e);
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
  function M1(e) {
    for (var t = e, n = null; t !== null; ) {
      var a = t.alternate;
      a !== null && jc(a) === null && (n = t), t = t.sibling;
    }
    return n;
  }
  function V1(e) {
    if (e !== void 0 && e !== "forwards" && e !== "backwards" && e !== "together" && !Lp[e])
      if (Lp[e] = !0, typeof e == "string")
        switch (e.toLowerCase()) {
          case "together":
          case "forwards":
          case "backwards": {
            d('"%s" is not a valid value for revealOrder on <SuspenseList />. Use lowercase "%s" instead.', e, e.toLowerCase());
            break;
          }
          case "forward":
          case "backward": {
            d('"%s" is not a valid value for revealOrder on <SuspenseList />. React uses the -s suffix in the spelling. Use "%ss" instead.', e, e.toLowerCase());
            break;
          }
          default:
            d('"%s" is not a supported revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?', e);
            break;
        }
      else
        d('%s is not a supported value for revealOrder on <SuspenseList />. Did you mean "together", "forwards" or "backwards"?', e);
  }
  function A1(e, t) {
    e !== void 0 && !Wc[e] && (e !== "collapsed" && e !== "hidden" ? (Wc[e] = !0, d('"%s" is not a supported value for tail on <SuspenseList />. Did you mean "collapsed" or "hidden"?', e)) : t !== "forwards" && t !== "backwards" && (Wc[e] = !0, d('<SuspenseList tail="%s" /> is only valid if revealOrder is "forwards" or "backwards". Did you mean to specify revealOrder="forwards"?', e)));
  }
  function jy(e, t) {
    {
      var n = Ye(e), a = !n && typeof Ca(e) == "function";
      if (n || a) {
        var r = n ? "array" : "iterable";
        return d("A nested %s was passed to row #%s in <SuspenseList />. Wrap it in an additional SuspenseList to configure its revealOrder: <SuspenseList revealOrder=...> ... <SuspenseList revealOrder=...>{%s}</SuspenseList> ... </SuspenseList>", r, t, r), !1;
      }
    }
    return !0;
  }
  function L1(e, t) {
    if ((t === "forwards" || t === "backwards") && e !== void 0 && e !== null && e !== !1)
      if (Ye(e)) {
        for (var n = 0; n < e.length; n++)
          if (!jy(e[n], n))
            return;
      } else {
        var a = Ca(e);
        if (typeof a == "function") {
          var r = a.call(e);
          if (r)
            for (var i = r.next(), l = 0; !i.done; i = r.next()) {
              if (!jy(i.value, l))
                return;
              l++;
            }
        } else
          d('A single row was passed to a <SuspenseList revealOrder="%s" />. This is not useful since it needs multiple rows. Did you mean to pass multiple children or an array?', t);
      }
  }
  function $p(e, t, n, a, r) {
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
  function Ty(e, t, n) {
    var a = t.pendingProps, r = a.revealOrder, i = a.tail, l = a.children;
    V1(r), A1(i, r), L1(l, r), Pn(e, t, l, n);
    var u = Va.current, c = Hm(u, Es);
    if (c)
      u = Bm(u, Es), t.flags |= lt;
    else {
      var h = e !== null && (e.flags & lt) !== Oe;
      h && O1(t, t.child, n), u = Hl(u);
    }
    if (Zr(t, u), (t.mode & Xe) === we)
      t.memoizedState = null;
    else
      switch (r) {
        case "forwards": {
          var v = M1(t.child), C;
          v === null ? (C = t.child, t.child = null) : (C = v.sibling, v.sibling = null), $p(
            t,
            !1,
            // isBackwards
            C,
            v,
            i
          );
          break;
        }
        case "backwards": {
          var D = null, M = t.child;
          for (t.child = null; M !== null; ) {
            var A = M.alternate;
            if (A !== null && jc(A) === null) {
              t.child = M;
              break;
            }
            var B = M.sibling;
            M.sibling = D, D = M, M = B;
          }
          $p(
            t,
            !0,
            // isBackwards
            D,
            null,
            // last
            i
          );
          break;
        }
        case "together": {
          $p(
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
  function k1(e, t, n) {
    Fm(t, t.stateNode.containerInfo);
    var a = t.pendingProps;
    return e === null ? t.child = Ul(t, null, a, n) : Pn(e, t, a, n), t.child;
  }
  var wy = !1;
  function U1(e, t, n) {
    var a = t.type, r = a._context, i = t.pendingProps, l = t.memoizedProps, u = i.value;
    {
      "value" in i || wy || (wy = !0, d("The `value` prop is required for the `<Context.Provider>`. Did you misspell it or forget to pass it?"));
      var c = t.type.propTypes;
      c && _a(c, i, "prop", "Context.Provider");
    }
    if (xb(t, r, u), l !== null) {
      var h = l.value;
      if (aa(h, u)) {
        if (l.children === i.children && !rc())
          return Cr(e, t, n);
      } else
        VC(t, r, n);
    }
    var v = i.children;
    return Pn(e, t, v, n), t.child;
  }
  var _y = !1;
  function F1(e, t, n) {
    var a = t.type;
    a._context === void 0 ? a !== a.Consumer && (_y || (_y = !0, d("Rendering <Context> directly is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?"))) : a = a._context;
    var r = t.pendingProps, i = r.children;
    typeof i != "function" && d("A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it."), zl(t, n);
    var l = qt(a);
    Oo(t);
    var u;
    return Os.current = t, fa(!0), u = i(l), fa(!1), bl(), t.flags |= pl, Pn(e, t, u, n), t.child;
  }
  function As() {
    ka = !0;
  }
  function Qc(e, t) {
    (t.mode & Xe) === we && e !== null && (e.alternate = null, t.alternate = null, t.flags |= Yt);
  }
  function Cr(e, t, n) {
    return e !== null && (t.dependencies = e.dependencies), iy(), qs(t.lanes), ea(n, t.childLanes) ? (OC(e, t), t.child) : null;
  }
  function z1(e, t, n) {
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
      return i === null ? (a.deletions = [e], a.flags |= Si) : i.push(e), n.flags |= Yt, n;
    }
  }
  function Ip(e, t) {
    var n = e.lanes;
    return !!ea(n, t);
  }
  function P1(e, t, n) {
    switch (t.tag) {
      case x:
        Ey(t), t.stateNode, kl();
        break;
      case L:
        wb(t);
        break;
      case j: {
        var a = t.type;
        Xa(a) && lc(t);
        break;
      }
      case T:
        Fm(t, t.stateNode.containerInfo);
        break;
      case K: {
        var r = t.memoizedProps.value, i = t.type._context;
        xb(t, i, r);
        break;
      }
      case I:
        {
          var l = ea(n, t.childLanes);
          l && (t.flags |= it);
          {
            var u = t.stateNode;
            u.effectDuration = 0, u.passiveEffectDuration = 0;
          }
        }
        break;
      case ee: {
        var c = t.memoizedState;
        if (c !== null) {
          if (c.dehydrated !== null)
            return Zr(t, Hl(Va.current)), t.flags |= lt, null;
          var h = t.child, v = h.childLanes;
          if (ea(n, v))
            return Ry(e, t, n);
          Zr(t, Hl(Va.current));
          var C = Cr(e, t, n);
          return C !== null ? C.sibling : null;
        } else
          Zr(t, Hl(Va.current));
        break;
      }
      case oe: {
        var D = (e.flags & lt) !== Oe, M = ea(n, t.childLanes);
        if (D) {
          if (M)
            return Ty(e, t, n);
          t.flags |= lt;
        }
        var A = t.memoizedState;
        if (A !== null && (A.rendering = null, A.tail = null, A.lastEffect = null), Zr(t, Va.current), M)
          break;
        return null;
      }
      case k:
      case ue:
        return t.lanes = J, yy(e, t, n);
    }
    return Cr(e, t, n);
  }
  function Oy(e, t, n) {
    if (t._debugNeedsRemount && e !== null)
      return z1(e, t, Nh(t.type, t.key, t.pendingProps, t._debugOwner || null, t.mode, t.lanes));
    if (e !== null) {
      var a = e.memoizedProps, r = t.pendingProps;
      if (a !== r || rc() || // Force a re-render if the implementation changed due to hot reload:
      t.type !== e.type)
        ka = !0;
      else {
        var i = Ip(e, n);
        if (!i && // If this is the second pass of an error or suspense boundary, there
        // may not be work scheduled on `current`, so we check for this flag.
        (t.flags & lt) === Oe)
          return ka = !1, P1(e, t, n);
        (e.flags & Wd) !== Oe ? ka = !0 : ka = !1;
      }
    } else if (ka = !1, gn() && dC(t)) {
      var l = t.index, u = fC();
      ib(t, u, l);
    }
    switch (t.lanes = J, t.tag) {
      case F:
        return x1(e, t, t.type, n);
      case le: {
        var c = t.elementType;
        return y1(e, t, c, n);
      }
      case R: {
        var h = t.type, v = t.pendingProps, C = t.elementType === h ? v : La(h, v);
        return kp(e, t, h, C, n);
      }
      case j: {
        var D = t.type, M = t.pendingProps, A = t.elementType === D ? M : La(D, M);
        return xy(e, t, D, A, n);
      }
      case x:
        return v1(e, t, n);
      case L:
        return g1(e, t, n);
      case te:
        return b1(e, t);
      case ee:
        return Ry(e, t, n);
      case T:
        return k1(e, t, n);
      case P: {
        var B = t.type, ve = t.pendingProps, je = t.elementType === B ? ve : La(B, ve);
        return vy(e, t, B, je, n);
      }
      case pe:
        return m1(e, t, n);
      case ie:
        return p1(e, t, n);
      case I:
        return h1(e, t, n);
      case K:
        return U1(e, t, n);
      case ce:
        return F1(e, t, n);
      case z: {
        var Se = t.type, Ze = t.pendingProps, qe = La(Se, Ze);
        if (t.type !== t.elementType) {
          var _ = Se.propTypes;
          _ && _a(
            _,
            qe,
            // Resolved for outer only
            "prop",
            rt(Se)
          );
        }
        return qe = La(Se.type, qe), gy(e, t, Se, qe, n);
      }
      case U:
        return by(e, t, t.type, t.pendingProps, n);
      case X: {
        var $ = t.type, O = t.pendingProps, ae = t.elementType === $ ? O : La($, O);
        return N1(e, t, $, ae, n);
      }
      case oe:
        return Ty(e, t, n);
      case Q:
        break;
      case k:
        return yy(e, t, n);
    }
    throw new Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
  }
  function Gl(e) {
    e.flags |= it;
  }
  function My(e) {
    e.flags |= Ri, e.flags |= Kd;
  }
  var Vy, Yp, Ay, Ly;
  Vy = function(e, t, n, a) {
    for (var r = t.child; r !== null; ) {
      if (r.tag === L || r.tag === te)
        sD(e, r.stateNode);
      else if (r.tag !== T) {
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
  }, Yp = function(e, t) {
  }, Ay = function(e, t, n, a, r) {
    var i = e.memoizedProps;
    if (i !== a) {
      var l = t.stateNode, u = zm(), c = cD(l, n, i, a, r, u);
      t.updateQueue = c, c && Gl(t);
    }
  }, Ly = function(e, t, n, a) {
    n !== a && Gl(t);
  };
  function Ls(e, t) {
    if (!gn())
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
  function yn(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, n = J, a = Oe;
    if (t) {
      if ((e.mode & ft) !== we) {
        for (var c = e.selfBaseDuration, h = e.child; h !== null; )
          n = Be(n, Be(h.lanes, h.childLanes)), a |= h.subtreeFlags & vr, a |= h.flags & vr, c += h.treeBaseDuration, h = h.sibling;
        e.treeBaseDuration = c;
      } else
        for (var v = e.child; v !== null; )
          n = Be(n, Be(v.lanes, v.childLanes)), a |= v.subtreeFlags & vr, a |= v.flags & vr, v.return = e, v = v.sibling;
      e.subtreeFlags |= a;
    } else {
      if ((e.mode & ft) !== we) {
        for (var r = e.actualDuration, i = e.selfBaseDuration, l = e.child; l !== null; )
          n = Be(n, Be(l.lanes, l.childLanes)), a |= l.subtreeFlags, a |= l.flags, r += l.actualDuration, i += l.treeBaseDuration, l = l.sibling;
        e.actualDuration = r, e.treeBaseDuration = i;
      } else
        for (var u = e.child; u !== null; )
          n = Be(n, Be(u.lanes, u.childLanes)), a |= u.subtreeFlags, a |= u.flags, u.return = e, u = u.sibling;
      e.subtreeFlags |= a;
    }
    return e.childLanes = n, t;
  }
  function H1(e, t, n) {
    if (DC() && (t.mode & Xe) !== we && (t.flags & lt) === Oe)
      return fb(t), kl(), t.flags |= pr | Eu | zn, !1;
    var a = dc(t);
    if (n !== null && n.dehydrated !== null)
      if (e === null) {
        if (!a)
          throw new Error("A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.");
        if (SC(t), yn(t), (t.mode & ft) !== we) {
          var r = n !== null;
          if (r) {
            var i = t.child;
            i !== null && (t.treeBaseDuration -= i.treeBaseDuration);
          }
        }
        return !1;
      } else {
        if (kl(), (t.flags & lt) === Oe && (t.memoizedState = null), t.flags |= it, yn(t), (t.mode & ft) !== we) {
          var l = n !== null;
          if (l) {
            var u = t.child;
            u !== null && (t.treeBaseDuration -= u.treeBaseDuration);
          }
        }
        return !1;
      }
    else
      return mb(), !0;
  }
  function ky(e, t, n) {
    var a = t.pendingProps;
    switch (gm(t), t.tag) {
      case F:
      case le:
      case U:
      case R:
      case P:
      case pe:
      case ie:
      case I:
      case ce:
      case z:
        return yn(t), null;
      case j: {
        var r = t.type;
        return Xa(r) && ic(t), yn(t), null;
      }
      case x: {
        var i = t.stateNode;
        if (Pl(t), mm(t), Im(), i.pendingContext && (i.context = i.pendingContext, i.pendingContext = null), e === null || e.child === null) {
          var l = dc(t);
          if (l)
            Gl(t);
          else if (e !== null) {
            var u = e.memoizedState;
            // Check if this is a client root
            (!u.isDehydrated || // Check if we reverted to client rendering (e.g. due to an error)
            (t.flags & pr) !== Oe) && (t.flags |= hl, mb());
          }
        }
        return Yp(e, t), yn(t), null;
      }
      case L: {
        Pm(t);
        var c = Tb(), h = t.type;
        if (e !== null && t.stateNode != null)
          Ay(e, t, h, a, c), e.ref !== t.ref && My(t);
        else {
          if (!a) {
            if (t.stateNode === null)
              throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
            return yn(t), null;
          }
          var v = zm(), C = dc(t);
          if (C)
            xC(t, c, v) && Gl(t);
          else {
            var D = oD(h, a, c, v, t);
            Vy(D, t, !1, !1), t.stateNode = D, uD(D, h, a, c) && Gl(t);
          }
          t.ref !== null && My(t);
        }
        return yn(t), null;
      }
      case te: {
        var M = a;
        if (e && t.stateNode != null) {
          var A = e.memoizedProps;
          Ly(e, t, A, M);
        } else {
          if (typeof M != "string" && t.stateNode === null)
            throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
          var B = Tb(), ve = zm(), je = dc(t);
          je ? EC(t) && Gl(t) : t.stateNode = dD(M, B, ve, t);
        }
        return yn(t), null;
      }
      case ee: {
        Bl(t);
        var Se = t.memoizedState;
        if (e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          var Ze = H1(e, t, Se);
          if (!Ze)
            return t.flags & zn ? t : null;
        }
        if ((t.flags & lt) !== Oe)
          return t.lanes = n, (t.mode & ft) !== we && hp(t), t;
        var qe = Se !== null, _ = e !== null && e.memoizedState !== null;
        if (qe !== _ && qe) {
          var $ = t.child;
          if ($.flags |= Di, (t.mode & Xe) !== we) {
            var O = e === null && (t.memoizedProps.unstable_avoidThisFallback !== !0 || !0);
            O || Hm(Va.current, Ob) ? Bj() : uh();
          }
        }
        var ae = t.updateQueue;
        if (ae !== null && (t.flags |= it), yn(t), (t.mode & ft) !== we && qe) {
          var Ne = t.child;
          Ne !== null && (t.treeBaseDuration -= Ne.treeBaseDuration);
        }
        return null;
      }
      case T:
        return Pl(t), Yp(e, t), e === null && rC(t.stateNode.containerInfo), yn(t), null;
      case K:
        var ge = t.type._context;
        return Om(ge, t), yn(t), null;
      case X: {
        var Me = t.type;
        return Xa(Me) && ic(t), yn(t), null;
      }
      case oe: {
        Bl(t);
        var Fe = t.memoizedState;
        if (Fe === null)
          return yn(t), null;
        var pt = (t.flags & lt) !== Oe, tt = Fe.rendering;
        if (tt === null)
          if (pt)
            Ls(Fe, !1);
          else {
            var Bt = Ij() && (e === null || (e.flags & lt) === Oe);
            if (!Bt)
              for (var nt = t.child; nt !== null; ) {
                var Ut = jc(nt);
                if (Ut !== null) {
                  pt = !0, t.flags |= lt, Ls(Fe, !1);
                  var Mn = Ut.updateQueue;
                  return Mn !== null && (t.updateQueue = Mn, t.flags |= it), t.subtreeFlags = Oe, MC(t, n), Zr(t, Bm(Va.current, Es)), t.child;
                }
                nt = nt.sibling;
              }
            Fe.tail !== null && un() > aN() && (t.flags |= lt, pt = !0, Ls(Fe, !1), t.lanes = Lv);
          }
        else {
          if (!pt) {
            var Rn = jc(tt);
            if (Rn !== null) {
              t.flags |= lt, pt = !0;
              var la = Rn.updateQueue;
              if (la !== null && (t.updateQueue = la, t.flags |= it), Ls(Fe, !0), Fe.tail === null && Fe.tailMode === "hidden" && !tt.alternate && !gn())
                return yn(t), null;
            } else // The time it took to render last row is greater than the remaining
            // time we have to render. So rendering one more row would likely
            // exceed it.
            un() * 2 - Fe.renderingStartTime > aN() && n !== Zn && (t.flags |= lt, pt = !0, Ls(Fe, !1), t.lanes = Lv);
          }
          if (Fe.isBackwards)
            tt.sibling = t.child, t.child = tt;
          else {
            var $n = Fe.last;
            $n !== null ? $n.sibling = tt : t.child = tt, Fe.last = tt;
          }
        }
        if (Fe.tail !== null) {
          var In = Fe.tail;
          Fe.rendering = In, Fe.tail = In.sibling, Fe.renderingStartTime = un(), In.sibling = null;
          var Vn = Va.current;
          return pt ? Vn = Bm(Vn, Es) : Vn = Hl(Vn), Zr(t, Vn), In;
        }
        return yn(t), null;
      }
      case Q:
        break;
      case k:
      case ue: {
        sh(t);
        var Or = t.memoizedState, to = Or !== null;
        if (e !== null) {
          var Xs = e.memoizedState, ir = Xs !== null;
          ir !== to && // LegacyHidden doesn't do any hiding — it only pre-renders.
          !Pe && (t.flags |= Di);
        }
        return !to || (t.mode & Xe) === we ? yn(t) : ea(rr, Zn) && (yn(t), t.subtreeFlags & (Yt | it) && (t.flags |= Di)), null;
      }
      case de:
        return null;
      case Y:
        return null;
    }
    throw new Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
  }
  function B1(e, t, n) {
    switch (gm(t), t.tag) {
      case j: {
        var a = t.type;
        Xa(a) && ic(t);
        var r = t.flags;
        return r & zn ? (t.flags = r & ~zn | lt, (t.mode & ft) !== we && hp(t), t) : null;
      }
      case x: {
        t.stateNode, Pl(t), mm(t), Im();
        var i = t.flags;
        return (i & zn) !== Oe && (i & lt) === Oe ? (t.flags = i & ~zn | lt, t) : null;
      }
      case L:
        return Pm(t), null;
      case ee: {
        Bl(t);
        var l = t.memoizedState;
        if (l !== null && l.dehydrated !== null) {
          if (t.alternate === null)
            throw new Error("Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue.");
          kl();
        }
        var u = t.flags;
        return u & zn ? (t.flags = u & ~zn | lt, (t.mode & ft) !== we && hp(t), t) : null;
      }
      case oe:
        return Bl(t), null;
      case T:
        return Pl(t), null;
      case K:
        var c = t.type._context;
        return Om(c, t), null;
      case k:
      case ue:
        return sh(t), null;
      case de:
        return null;
      default:
        return null;
    }
  }
  function Uy(e, t, n) {
    switch (gm(t), t.tag) {
      case j: {
        var a = t.type.childContextTypes;
        a != null && ic(t);
        break;
      }
      case x: {
        t.stateNode, Pl(t), mm(t), Im();
        break;
      }
      case L: {
        Pm(t);
        break;
      }
      case T:
        Pl(t);
        break;
      case ee:
        Bl(t);
        break;
      case oe:
        Bl(t);
        break;
      case K:
        var r = t.type._context;
        Om(r, t);
        break;
      case k:
      case ue:
        sh(t);
        break;
    }
  }
  var Fy = null;
  Fy = /* @__PURE__ */ new Set();
  var Xc = !1, Nn = !1, $1 = typeof WeakSet == "function" ? WeakSet : Set, xe = null, Wl = null, Kl = null;
  function I1(e) {
    Yd(null, function() {
      throw e;
    }), qd();
  }
  var Y1 = function(e, t) {
    if (t.props = e.memoizedProps, t.state = e.memoizedState, e.mode & ft)
      try {
        nr(), t.componentWillUnmount();
      } finally {
        tr(e);
      }
    else
      t.componentWillUnmount();
  };
  function zy(e, t) {
    try {
      ni(Zt, e);
    } catch (n) {
      bt(e, t, n);
    }
  }
  function qp(e, t, n) {
    try {
      Y1(e, n);
    } catch (a) {
      bt(e, t, a);
    }
  }
  function q1(e, t, n) {
    try {
      n.componentDidMount();
    } catch (a) {
      bt(e, t, a);
    }
  }
  function Py(e, t) {
    try {
      By(e);
    } catch (n) {
      bt(e, t, n);
    }
  }
  function Ql(e, t) {
    var n = e.ref;
    if (n !== null)
      if (typeof n == "function") {
        var a;
        try {
          if (at && Ft && e.mode & ft)
            try {
              nr(), a = n(null);
            } finally {
              tr(e);
            }
          else
            a = n(null);
        } catch (r) {
          bt(e, t, r);
        }
        typeof a == "function" && d("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", ze(e));
      } else
        n.current = null;
  }
  function Jc(e, t, n) {
    try {
      n();
    } catch (a) {
      bt(e, t, a);
    }
  }
  var Hy = !1;
  function G1(e, t) {
    iD(e.containerInfo), xe = t, W1();
    var n = Hy;
    return Hy = !1, n;
  }
  function W1() {
    for (; xe !== null; ) {
      var e = xe, t = e.child;
      (e.subtreeFlags & Jd) !== Oe && t !== null ? (t.return = e, xe = t) : K1();
    }
  }
  function K1() {
    for (; xe !== null; ) {
      var e = xe;
      jt(e);
      try {
        Q1(e);
      } catch (n) {
        bt(e, e.return, n);
      }
      sn();
      var t = e.sibling;
      if (t !== null) {
        t.return = e.return, xe = t;
        return;
      }
      xe = e.return;
    }
  }
  function Q1(e) {
    var t = e.alternate, n = e.flags;
    if ((n & hl) !== Oe) {
      switch (jt(e), e.tag) {
        case R:
        case P:
        case U:
          break;
        case j: {
          if (t !== null) {
            var a = t.memoizedProps, r = t.memoizedState, i = e.stateNode;
            e.type === e.elementType && !Yi && (i.props !== e.memoizedProps && d("Expected %s props to match memoized props before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", ze(e) || "instance"), i.state !== e.memoizedState && d("Expected %s state to match memoized state before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", ze(e) || "instance"));
            var l = i.getSnapshotBeforeUpdate(e.elementType === e.type ? a : La(e.type, a), r);
            {
              var u = Fy;
              l === void 0 && !u.has(e.type) && (u.add(e.type), d("%s.getSnapshotBeforeUpdate(): A snapshot value (or null) must be returned. You have returned undefined.", ze(e)));
            }
            i.__reactInternalSnapshotBeforeUpdate = l;
          }
          break;
        }
        case x: {
          {
            var c = e.stateNode;
            _D(c.containerInfo);
          }
          break;
        }
        case L:
        case te:
        case T:
        case X:
          break;
        default:
          throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
      }
      sn();
    }
  }
  function Ua(e, t, n) {
    var a = t.updateQueue, r = a !== null ? a.lastEffect : null;
    if (r !== null) {
      var i = r.next, l = i;
      do {
        if ((l.tag & e) === e) {
          var u = l.destroy;
          l.destroy = void 0, u !== void 0 && ((e & bn) !== Wn ? dS(t) : (e & Zt) !== Wn && _v(t), (e & Ja) !== Wn && Ws(!0), Jc(t, n, u), (e & Ja) !== Wn && Ws(!1), (e & bn) !== Wn ? fS() : (e & Zt) !== Wn && Ov());
        }
        l = l.next;
      } while (l !== i);
    }
  }
  function ni(e, t) {
    var n = t.updateQueue, a = n !== null ? n.lastEffect : null;
    if (a !== null) {
      var r = a.next, i = r;
      do {
        if ((i.tag & e) === e) {
          (e & bn) !== Wn ? uS(t) : (e & Zt) !== Wn && mS(t);
          var l = i.create;
          (e & Ja) !== Wn && Ws(!0), i.destroy = l(), (e & Ja) !== Wn && Ws(!1), (e & bn) !== Wn ? cS() : (e & Zt) !== Wn && pS();
          {
            var u = i.destroy;
            if (u !== void 0 && typeof u != "function") {
              var c = void 0;
              (i.tag & Zt) !== Oe ? c = "useLayoutEffect" : (i.tag & Ja) !== Oe ? c = "useInsertionEffect" : c = "useEffect";
              var h = void 0;
              u === null ? h = " You returned null. If your effect does not require clean up, return undefined (or nothing)." : typeof u.then == "function" ? h = `

It looks like you wrote ` + c + `(async () => ...) or returned a Promise. Instead, write the async function inside your effect and call it immediately:

` + c + `(() => {
  async function fetchData() {
    // You can await here
    const response = await MyAPI.getData(someId);
    // ...
  }
  fetchData();
}, [someId]); // Or [] if effect doesn't need props or state

Learn more about data fetching with Hooks: https://reactjs.org/link/hooks-data-fetching` : h = " You returned: " + u, d("%s must not return anything besides a function, which is used for clean-up.%s", c, h);
            }
          }
        }
        i = i.next;
      } while (i !== r);
    }
  }
  function X1(e, t) {
    if ((t.flags & it) !== Oe)
      switch (t.tag) {
        case I: {
          var n = t.stateNode.passiveEffectDuration, a = t.memoizedProps, r = a.id, i = a.onPostCommit, l = ay(), u = t.alternate === null ? "mount" : "update";
          ny() && (u = "nested-update"), typeof i == "function" && i(r, u, n, l);
          var c = t.return;
          e: for (; c !== null; ) {
            switch (c.tag) {
              case x:
                var h = c.stateNode;
                h.passiveEffectDuration += n;
                break e;
              case I:
                var v = c.stateNode;
                v.passiveEffectDuration += n;
                break e;
            }
            c = c.return;
          }
          break;
        }
      }
  }
  function J1(e, t, n, a) {
    if ((n.flags & _o) !== Oe)
      switch (n.tag) {
        case R:
        case P:
        case U: {
          if (!Nn)
            if (n.mode & ft)
              try {
                nr(), ni(Zt | Jt, n);
              } finally {
                tr(n);
              }
            else
              ni(Zt | Jt, n);
          break;
        }
        case j: {
          var r = n.stateNode;
          if (n.flags & it && !Nn)
            if (t === null)
              if (n.type === n.elementType && !Yi && (r.props !== n.memoizedProps && d("Expected %s props to match memoized props before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", ze(n) || "instance"), r.state !== n.memoizedState && d("Expected %s state to match memoized state before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", ze(n) || "instance")), n.mode & ft)
                try {
                  nr(), r.componentDidMount();
                } finally {
                  tr(n);
                }
              else
                r.componentDidMount();
            else {
              var i = n.elementType === n.type ? t.memoizedProps : La(n.type, t.memoizedProps), l = t.memoizedState;
              if (n.type === n.elementType && !Yi && (r.props !== n.memoizedProps && d("Expected %s props to match memoized props before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", ze(n) || "instance"), r.state !== n.memoizedState && d("Expected %s state to match memoized state before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", ze(n) || "instance")), n.mode & ft)
                try {
                  nr(), r.componentDidUpdate(i, l, r.__reactInternalSnapshotBeforeUpdate);
                } finally {
                  tr(n);
                }
              else
                r.componentDidUpdate(i, l, r.__reactInternalSnapshotBeforeUpdate);
            }
          var u = n.updateQueue;
          u !== null && (n.type === n.elementType && !Yi && (r.props !== n.memoizedProps && d("Expected %s props to match memoized props before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", ze(n) || "instance"), r.state !== n.memoizedState && d("Expected %s state to match memoized state before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", ze(n) || "instance")), jb(n, u, r));
          break;
        }
        case x: {
          var c = n.updateQueue;
          if (c !== null) {
            var h = null;
            if (n.child !== null)
              switch (n.child.tag) {
                case L:
                  h = n.child.stateNode;
                  break;
                case j:
                  h = n.child.stateNode;
                  break;
              }
            jb(n, c, h);
          }
          break;
        }
        case L: {
          var v = n.stateNode;
          if (t === null && n.flags & it) {
            var C = n.type, D = n.memoizedProps;
            vD(v, C, D);
          }
          break;
        }
        case te:
          break;
        case T:
          break;
        case I: {
          {
            var M = n.memoizedProps, A = M.onCommit, B = M.onRender, ve = n.stateNode.effectDuration, je = ay(), Se = t === null ? "mount" : "update";
            ny() && (Se = "nested-update"), typeof B == "function" && B(n.memoizedProps.id, Se, n.actualDuration, n.treeBaseDuration, n.actualStartTime, je);
            {
              typeof A == "function" && A(n.memoizedProps.id, Se, ve, je), Kj(n);
              var Ze = n.return;
              e: for (; Ze !== null; ) {
                switch (Ze.tag) {
                  case x:
                    var qe = Ze.stateNode;
                    qe.effectDuration += ve;
                    break e;
                  case I:
                    var _ = Ze.stateNode;
                    _.effectDuration += ve;
                    break e;
                }
                Ze = Ze.return;
              }
            }
          }
          break;
        }
        case ee: {
          lj(e, n);
          break;
        }
        case oe:
        case X:
        case Q:
        case k:
        case ue:
        case Y:
          break;
        default:
          throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
      }
    Nn || n.flags & Ri && By(n);
  }
  function Z1(e) {
    switch (e.tag) {
      case R:
      case P:
      case U: {
        if (e.mode & ft)
          try {
            nr(), zy(e, e.return);
          } finally {
            tr(e);
          }
        else
          zy(e, e.return);
        break;
      }
      case j: {
        var t = e.stateNode;
        typeof t.componentDidMount == "function" && q1(e, e.return, t), Py(e, e.return);
        break;
      }
      case L: {
        Py(e, e.return);
        break;
      }
    }
  }
  function ej(e, t) {
    for (var n = null, a = e; ; ) {
      if (a.tag === L) {
        if (n === null) {
          n = a;
          try {
            var r = a.stateNode;
            t ? CD(r) : TD(a.stateNode, a.memoizedProps);
          } catch (l) {
            bt(e, e.return, l);
          }
        }
      } else if (a.tag === te) {
        if (n === null)
          try {
            var i = a.stateNode;
            t ? jD(i) : wD(i, a.memoizedProps);
          } catch (l) {
            bt(e, e.return, l);
          }
      } else if (!((a.tag === k || a.tag === ue) && a.memoizedState !== null && a !== e)) {
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
  function By(e) {
    var t = e.ref;
    if (t !== null) {
      var n = e.stateNode, a;
      switch (e.tag) {
        case L:
          a = n;
          break;
        default:
          a = n;
      }
      if (typeof t == "function") {
        var r;
        if (e.mode & ft)
          try {
            nr(), r = t(a);
          } finally {
            tr(e);
          }
        else
          r = t(a);
        typeof r == "function" && d("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", ze(e));
      } else
        t.hasOwnProperty("current") || d("Unexpected ref object provided for %s. Use either a ref-setter function or React.createRef().", ze(e)), t.current = a;
    }
  }
  function tj(e) {
    var t = e.alternate;
    t !== null && (t.return = null), e.return = null;
  }
  function $y(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, $y(t));
    {
      if (e.child = null, e.deletions = null, e.sibling = null, e.tag === L) {
        var n = e.stateNode;
        n !== null && oC(n);
      }
      e.stateNode = null, e._debugOwner = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
    }
  }
  function nj(e) {
    for (var t = e.return; t !== null; ) {
      if (Iy(t))
        return t;
      t = t.return;
    }
    throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
  }
  function Iy(e) {
    return e.tag === L || e.tag === x || e.tag === T;
  }
  function Yy(e) {
    var t = e;
    e: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || Iy(t.return))
          return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== L && t.tag !== te && t.tag !== W; ) {
        if (t.flags & Yt || t.child === null || t.tag === T)
          continue e;
        t.child.return = t, t = t.child;
      }
      if (!(t.flags & Yt))
        return t.stateNode;
    }
  }
  function aj(e) {
    var t = nj(e);
    switch (t.tag) {
      case L: {
        var n = t.stateNode;
        t.flags & wo && (Gg(n), t.flags &= ~wo);
        var a = Yy(e);
        Wp(e, a, n);
        break;
      }
      case x:
      case T: {
        var r = t.stateNode.containerInfo, i = Yy(e);
        Gp(e, i, r);
        break;
      }
      default:
        throw new Error("Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue.");
    }
  }
  function Gp(e, t, n) {
    var a = e.tag, r = a === L || a === te;
    if (r) {
      var i = e.stateNode;
      t ? ED(n, i, t) : ND(n, i);
    } else if (a !== T) {
      var l = e.child;
      if (l !== null) {
        Gp(l, t, n);
        for (var u = l.sibling; u !== null; )
          Gp(u, t, n), u = u.sibling;
      }
    }
  }
  function Wp(e, t, n) {
    var a = e.tag, r = a === L || a === te;
    if (r) {
      var i = e.stateNode;
      t ? xD(n, i, t) : yD(n, i);
    } else if (a !== T) {
      var l = e.child;
      if (l !== null) {
        Wp(l, t, n);
        for (var u = l.sibling; u !== null; )
          Wp(u, t, n), u = u.sibling;
      }
    }
  }
  var xn = null, Fa = !1;
  function rj(e, t, n) {
    {
      var a = t;
      e: for (; a !== null; ) {
        switch (a.tag) {
          case L: {
            xn = a.stateNode, Fa = !1;
            break e;
          }
          case x: {
            xn = a.stateNode.containerInfo, Fa = !0;
            break e;
          }
          case T: {
            xn = a.stateNode.containerInfo, Fa = !0;
            break e;
          }
        }
        a = a.return;
      }
      if (xn === null)
        throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
      qy(e, t, n), xn = null, Fa = !1;
    }
    tj(n);
  }
  function ai(e, t, n) {
    for (var a = n.child; a !== null; )
      qy(e, t, a), a = a.sibling;
  }
  function qy(e, t, n) {
    switch (iS(n), n.tag) {
      case L:
        Nn || Ql(n, t);
      case te: {
        {
          var a = xn, r = Fa;
          xn = null, ai(e, t, n), xn = a, Fa = r, xn !== null && (Fa ? RD(xn, n.stateNode) : SD(xn, n.stateNode));
        }
        return;
      }
      case W: {
        xn !== null && (Fa ? DD(xn, n.stateNode) : im(xn, n.stateNode));
        return;
      }
      case T: {
        {
          var i = xn, l = Fa;
          xn = n.stateNode.containerInfo, Fa = !0, ai(e, t, n), xn = i, Fa = l;
        }
        return;
      }
      case R:
      case P:
      case z:
      case U: {
        if (!Nn) {
          var u = n.updateQueue;
          if (u !== null) {
            var c = u.lastEffect;
            if (c !== null) {
              var h = c.next, v = h;
              do {
                var C = v, D = C.destroy, M = C.tag;
                D !== void 0 && ((M & Ja) !== Wn ? Jc(n, t, D) : (M & Zt) !== Wn && (_v(n), n.mode & ft ? (nr(), Jc(n, t, D), tr(n)) : Jc(n, t, D), Ov())), v = v.next;
              } while (v !== h);
            }
          }
        }
        ai(e, t, n);
        return;
      }
      case j: {
        if (!Nn) {
          Ql(n, t);
          var A = n.stateNode;
          typeof A.componentWillUnmount == "function" && qp(n, t, A);
        }
        ai(e, t, n);
        return;
      }
      case Q: {
        ai(e, t, n);
        return;
      }
      case k: {
        if (
          // TODO: Remove this dead flag
          n.mode & Xe
        ) {
          var B = Nn;
          Nn = B || n.memoizedState !== null, ai(e, t, n), Nn = B;
        } else
          ai(e, t, n);
        break;
      }
      default: {
        ai(e, t, n);
        return;
      }
    }
  }
  function ij(e) {
    e.memoizedState;
  }
  function lj(e, t) {
    var n = t.memoizedState;
    if (n === null) {
      var a = t.alternate;
      if (a !== null) {
        var r = a.memoizedState;
        if (r !== null) {
          var i = r.dehydrated;
          i !== null && ID(i);
        }
      }
    }
  }
  function Gy(e) {
    var t = e.updateQueue;
    if (t !== null) {
      e.updateQueue = null;
      var n = e.stateNode;
      n === null && (n = e.stateNode = new $1()), t.forEach(function(a) {
        var r = nT.bind(null, e, a);
        if (!n.has(a)) {
          if (n.add(a), Ta)
            if (Wl !== null && Kl !== null)
              Gs(Kl, Wl);
            else
              throw Error("Expected finished root and lanes to be set. This is a bug in React.");
          a.then(r, r);
        }
      });
    }
  }
  function oj(e, t, n) {
    Wl = n, Kl = e, jt(t), Wy(t, e), jt(t), Wl = null, Kl = null;
  }
  function za(e, t, n) {
    var a = t.deletions;
    if (a !== null)
      for (var r = 0; r < a.length; r++) {
        var i = a[r];
        try {
          rj(e, t, i);
        } catch (c) {
          bt(i, t, c);
        }
      }
    var l = du();
    if (t.subtreeFlags & Zd)
      for (var u = t.child; u !== null; )
        jt(u), Wy(u, e), u = u.sibling;
    jt(l);
  }
  function Wy(e, t, n) {
    var a = e.alternate, r = e.flags;
    switch (e.tag) {
      case R:
      case P:
      case z:
      case U: {
        if (za(t, e), ar(e), r & it) {
          try {
            Ua(Ja | Jt, e, e.return), ni(Ja | Jt, e);
          } catch (Me) {
            bt(e, e.return, Me);
          }
          if (e.mode & ft) {
            try {
              nr(), Ua(Zt | Jt, e, e.return);
            } catch (Me) {
              bt(e, e.return, Me);
            }
            tr(e);
          } else
            try {
              Ua(Zt | Jt, e, e.return);
            } catch (Me) {
              bt(e, e.return, Me);
            }
        }
        return;
      }
      case j: {
        za(t, e), ar(e), r & Ri && a !== null && Ql(a, a.return);
        return;
      }
      case L: {
        za(t, e), ar(e), r & Ri && a !== null && Ql(a, a.return);
        {
          if (e.flags & wo) {
            var i = e.stateNode;
            try {
              Gg(i);
            } catch (Me) {
              bt(e, e.return, Me);
            }
          }
          if (r & it) {
            var l = e.stateNode;
            if (l != null) {
              var u = e.memoizedProps, c = a !== null ? a.memoizedProps : u, h = e.type, v = e.updateQueue;
              if (e.updateQueue = null, v !== null)
                try {
                  gD(l, v, h, c, u, e);
                } catch (Me) {
                  bt(e, e.return, Me);
                }
            }
          }
        }
        return;
      }
      case te: {
        if (za(t, e), ar(e), r & it) {
          if (e.stateNode === null)
            throw new Error("This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.");
          var C = e.stateNode, D = e.memoizedProps, M = a !== null ? a.memoizedProps : D;
          try {
            bD(C, M, D);
          } catch (Me) {
            bt(e, e.return, Me);
          }
        }
        return;
      }
      case x: {
        if (za(t, e), ar(e), r & it && a !== null) {
          var A = a.memoizedState;
          if (A.isDehydrated)
            try {
              $D(t.containerInfo);
            } catch (Me) {
              bt(e, e.return, Me);
            }
        }
        return;
      }
      case T: {
        za(t, e), ar(e);
        return;
      }
      case ee: {
        za(t, e), ar(e);
        var B = e.child;
        if (B.flags & Di) {
          var ve = B.stateNode, je = B.memoizedState, Se = je !== null;
          if (ve.isHidden = Se, Se) {
            var Ze = B.alternate !== null && B.alternate.memoizedState !== null;
            Ze || Hj();
          }
        }
        if (r & it) {
          try {
            ij(e);
          } catch (Me) {
            bt(e, e.return, Me);
          }
          Gy(e);
        }
        return;
      }
      case k: {
        var qe = a !== null && a.memoizedState !== null;
        if (
          // TODO: Remove this dead flag
          e.mode & Xe
        ) {
          var _ = Nn;
          Nn = _ || qe, za(t, e), Nn = _;
        } else
          za(t, e);
        if (ar(e), r & Di) {
          var $ = e.stateNode, O = e.memoizedState, ae = O !== null, Ne = e;
          if ($.isHidden = ae, ae && !qe && (Ne.mode & Xe) !== we) {
            xe = Ne;
            for (var ge = Ne.child; ge !== null; )
              xe = ge, uj(ge), ge = ge.sibling;
          }
          ej(Ne, ae);
        }
        return;
      }
      case oe: {
        za(t, e), ar(e), r & it && Gy(e);
        return;
      }
      case Q:
        return;
      default: {
        za(t, e), ar(e);
        return;
      }
    }
  }
  function ar(e) {
    var t = e.flags;
    if (t & Yt) {
      try {
        aj(e);
      } catch (n) {
        bt(e, e.return, n);
      }
      e.flags &= ~Yt;
    }
    t & hr && (e.flags &= ~hr);
  }
  function sj(e, t, n) {
    Wl = n, Kl = t, xe = e, Ky(e, t, n), Wl = null, Kl = null;
  }
  function Ky(e, t, n) {
    for (var a = (e.mode & Xe) !== we; xe !== null; ) {
      var r = xe, i = r.child;
      if (r.tag === k && a) {
        var l = r.memoizedState !== null, u = l || Xc;
        if (u) {
          Kp(e, t, n);
          continue;
        } else {
          var c = r.alternate, h = c !== null && c.memoizedState !== null, v = h || Nn, C = Xc, D = Nn;
          Xc = u, Nn = v, Nn && !D && (xe = r, cj(r));
          for (var M = i; M !== null; )
            xe = M, Ky(
              M,
              // New root; bubble back up to here and stop.
              t,
              n
            ), M = M.sibling;
          xe = r, Xc = C, Nn = D, Kp(e, t, n);
          continue;
        }
      }
      (r.subtreeFlags & _o) !== Oe && i !== null ? (i.return = r, xe = i) : Kp(e, t, n);
    }
  }
  function Kp(e, t, n) {
    for (; xe !== null; ) {
      var a = xe;
      if ((a.flags & _o) !== Oe) {
        var r = a.alternate;
        jt(a);
        try {
          J1(t, r, a, n);
        } catch (l) {
          bt(a, a.return, l);
        }
        sn();
      }
      if (a === e) {
        xe = null;
        return;
      }
      var i = a.sibling;
      if (i !== null) {
        i.return = a.return, xe = i;
        return;
      }
      xe = a.return;
    }
  }
  function uj(e) {
    for (; xe !== null; ) {
      var t = xe, n = t.child;
      switch (t.tag) {
        case R:
        case P:
        case z:
        case U: {
          if (t.mode & ft)
            try {
              nr(), Ua(Zt, t, t.return);
            } finally {
              tr(t);
            }
          else
            Ua(Zt, t, t.return);
          break;
        }
        case j: {
          Ql(t, t.return);
          var a = t.stateNode;
          typeof a.componentWillUnmount == "function" && qp(t, t.return, a);
          break;
        }
        case L: {
          Ql(t, t.return);
          break;
        }
        case k: {
          var r = t.memoizedState !== null;
          if (r) {
            Qy(e);
            continue;
          }
          break;
        }
      }
      n !== null ? (n.return = t, xe = n) : Qy(e);
    }
  }
  function Qy(e) {
    for (; xe !== null; ) {
      var t = xe;
      if (t === e) {
        xe = null;
        return;
      }
      var n = t.sibling;
      if (n !== null) {
        n.return = t.return, xe = n;
        return;
      }
      xe = t.return;
    }
  }
  function cj(e) {
    for (; xe !== null; ) {
      var t = xe, n = t.child;
      if (t.tag === k) {
        var a = t.memoizedState !== null;
        if (a) {
          Xy(e);
          continue;
        }
      }
      n !== null ? (n.return = t, xe = n) : Xy(e);
    }
  }
  function Xy(e) {
    for (; xe !== null; ) {
      var t = xe;
      jt(t);
      try {
        Z1(t);
      } catch (a) {
        bt(t, t.return, a);
      }
      if (sn(), t === e) {
        xe = null;
        return;
      }
      var n = t.sibling;
      if (n !== null) {
        n.return = t.return, xe = n;
        return;
      }
      xe = t.return;
    }
  }
  function dj(e, t, n, a) {
    xe = t, fj(t, e, n, a);
  }
  function fj(e, t, n, a) {
    for (; xe !== null; ) {
      var r = xe, i = r.child;
      (r.subtreeFlags & vl) !== Oe && i !== null ? (i.return = r, xe = i) : mj(e, t, n, a);
    }
  }
  function mj(e, t, n, a) {
    for (; xe !== null; ) {
      var r = xe;
      if ((r.flags & Fr) !== Oe) {
        jt(r);
        try {
          pj(t, r, n, a);
        } catch (l) {
          bt(r, r.return, l);
        }
        sn();
      }
      if (r === e) {
        xe = null;
        return;
      }
      var i = r.sibling;
      if (i !== null) {
        i.return = r.return, xe = i;
        return;
      }
      xe = r.return;
    }
  }
  function pj(e, t, n, a) {
    switch (t.tag) {
      case R:
      case P:
      case U: {
        if (t.mode & ft) {
          pp();
          try {
            ni(bn | Jt, t);
          } finally {
            mp(t);
          }
        } else
          ni(bn | Jt, t);
        break;
      }
    }
  }
  function hj(e) {
    xe = e, vj();
  }
  function vj() {
    for (; xe !== null; ) {
      var e = xe, t = e.child;
      if ((xe.flags & Si) !== Oe) {
        var n = e.deletions;
        if (n !== null) {
          for (var a = 0; a < n.length; a++) {
            var r = n[a];
            xe = r, yj(r, e);
          }
          {
            var i = e.alternate;
            if (i !== null) {
              var l = i.child;
              if (l !== null) {
                i.child = null;
                do {
                  var u = l.sibling;
                  l.sibling = null, l = u;
                } while (l !== null);
              }
            }
          }
          xe = e;
        }
      }
      (e.subtreeFlags & vl) !== Oe && t !== null ? (t.return = e, xe = t) : gj();
    }
  }
  function gj() {
    for (; xe !== null; ) {
      var e = xe;
      (e.flags & Fr) !== Oe && (jt(e), bj(e), sn());
      var t = e.sibling;
      if (t !== null) {
        t.return = e.return, xe = t;
        return;
      }
      xe = e.return;
    }
  }
  function bj(e) {
    switch (e.tag) {
      case R:
      case P:
      case U: {
        e.mode & ft ? (pp(), Ua(bn | Jt, e, e.return), mp(e)) : Ua(bn | Jt, e, e.return);
        break;
      }
    }
  }
  function yj(e, t) {
    for (; xe !== null; ) {
      var n = xe;
      jt(n), xj(n, t), sn();
      var a = n.child;
      a !== null ? (a.return = n, xe = a) : Nj(e);
    }
  }
  function Nj(e) {
    for (; xe !== null; ) {
      var t = xe, n = t.sibling, a = t.return;
      if ($y(t), t === e) {
        xe = null;
        return;
      }
      if (n !== null) {
        n.return = a, xe = n;
        return;
      }
      xe = a;
    }
  }
  function xj(e, t) {
    switch (e.tag) {
      case R:
      case P:
      case U: {
        e.mode & ft ? (pp(), Ua(bn, e, t), mp(e)) : Ua(bn, e, t);
        break;
      }
    }
  }
  function Ej(e) {
    switch (e.tag) {
      case R:
      case P:
      case U: {
        try {
          ni(Zt | Jt, e);
        } catch (n) {
          bt(e, e.return, n);
        }
        break;
      }
      case j: {
        var t = e.stateNode;
        try {
          t.componentDidMount();
        } catch (n) {
          bt(e, e.return, n);
        }
        break;
      }
    }
  }
  function Sj(e) {
    switch (e.tag) {
      case R:
      case P:
      case U: {
        try {
          ni(bn | Jt, e);
        } catch (t) {
          bt(e, e.return, t);
        }
        break;
      }
    }
  }
  function Rj(e) {
    switch (e.tag) {
      case R:
      case P:
      case U: {
        try {
          Ua(Zt | Jt, e, e.return);
        } catch (n) {
          bt(e, e.return, n);
        }
        break;
      }
      case j: {
        var t = e.stateNode;
        typeof t.componentWillUnmount == "function" && qp(e, e.return, t);
        break;
      }
    }
  }
  function Dj(e) {
    switch (e.tag) {
      case R:
      case P:
      case U:
        try {
          Ua(bn | Jt, e, e.return);
        } catch (t) {
          bt(e, e.return, t);
        }
    }
  }
  if (typeof Symbol == "function" && Symbol.for) {
    var ks = Symbol.for;
    ks("selector.component"), ks("selector.has_pseudo_class"), ks("selector.role"), ks("selector.test_id"), ks("selector.text");
  }
  var Cj = [];
  function jj() {
    Cj.forEach(function(e) {
      return e();
    });
  }
  var Tj = p.ReactCurrentActQueue;
  function wj(e) {
    {
      var t = (
        // $FlowExpectedError – Flow doesn't know about IS_REACT_ACT_ENVIRONMENT global
        typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0
      ), n = typeof jest < "u";
      return n && t !== !1;
    }
  }
  function Jy() {
    {
      var e = (
        // $FlowExpectedError – Flow doesn't know about IS_REACT_ACT_ENVIRONMENT global
        typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0
      );
      return !e && Tj.current !== null && d("The current testing environment is not configured to support act(...)"), e;
    }
  }
  var _j = Math.ceil, Qp = p.ReactCurrentDispatcher, Xp = p.ReactCurrentOwner, En = p.ReactCurrentBatchConfig, Pa = p.ReactCurrentActQueue, nn = (
    /*             */
    0
  ), Zy = (
    /*               */
    1
  ), Sn = (
    /*                */
    2
  ), ba = (
    /*                */
    4
  ), jr = 0, Us = 1, qi = 2, Zc = 3, Fs = 4, eN = 5, Jp = 6, Je = nn, Hn = null, Mt = null, an = J, rr = J, Zp = Gr(J), rn = jr, zs = null, ed = J, Ps = J, td = J, Hs = null, Kn = null, eh = 0, tN = 500, nN = 1 / 0, Oj = 500, Tr = null;
  function Bs() {
    nN = un() + Oj;
  }
  function aN() {
    return nN;
  }
  var nd = !1, th = null, Xl = null, Gi = !1, ri = null, $s = J, nh = [], ah = null, Mj = 50, Is = 0, rh = null, ih = !1, ad = !1, Vj = 50, Jl = 0, rd = null, Ys = xt, id = J, rN = !1;
  function ld() {
    return Hn;
  }
  function Bn() {
    return (Je & (Sn | ba)) !== nn ? un() : (Ys !== xt || (Ys = un()), Ys);
  }
  function ii(e) {
    var t = e.mode;
    if ((t & Xe) === we)
      return Le;
    if ((Je & Sn) !== nn && an !== J)
      return Uo(an);
    var n = TC() !== jC;
    if (n) {
      if (En.transition !== null) {
        var a = En.transition;
        a._updatedFibers || (a._updatedFibers = /* @__PURE__ */ new Set()), a._updatedFibers.add(e);
      }
      return id === dn && (id = zv()), id;
    }
    var r = wa();
    if (r !== dn)
      return r;
    var i = fD();
    return i;
  }
  function Aj(e) {
    var t = e.mode;
    return (t & Xe) === we ? Le : kS();
  }
  function ln(e, t, n, a) {
    rT(), rN && d("useInsertionEffect must not schedule updates."), ih && (ad = !0), Fo(e, n, a), (Je & Sn) !== J && e === Hn ? oT(t) : (Ta && Bv(e, t, n), sT(t), e === Hn && ((Je & Sn) === nn && (Ps = Be(Ps, n)), rn === Fs && li(e, an)), Qn(e, a), n === Le && Je === nn && (t.mode & Xe) === we && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
    !Pa.isBatchingLegacy && (Bs(), rb()));
  }
  function Lj(e, t, n) {
    var a = e.current;
    a.lanes = t, Fo(e, t, n), Qn(e, n);
  }
  function kj(e) {
    return (
      // TODO: Remove outdated deferRenderPhaseUpdateToNextBatch experiment. We
      // decided not to enable it.
      (Je & Sn) !== nn
    );
  }
  function Qn(e, t) {
    var n = e.callbackNode;
    _S(e, t);
    var a = ju(e, e === Hn ? an : J);
    if (a === J) {
      n !== null && NN(n), e.callbackNode = null, e.callbackPriority = dn;
      return;
    }
    var r = Oi(a), i = e.callbackPriority;
    if (i === r && // Special case related to `act`. If the currently scheduled task is a
    // Scheduler task, rather than an `act` task, cancel it and re-scheduled
    // on the `act` queue.
    !(Pa.current !== null && n !== fh)) {
      n == null && i !== Le && d("Expected scheduled callback to exist. This error is likely caused by a bug in React. Please file an issue.");
      return;
    }
    n != null && NN(n);
    var l;
    if (r === Le)
      e.tag === Wr ? (Pa.isBatchingLegacy !== null && (Pa.didScheduleLegacyUpdate = !0), cC(oN.bind(null, e))) : ab(oN.bind(null, e)), Pa.current !== null ? Pa.current.push(Kr) : pD(function() {
        (Je & (Sn | ba)) === nn && Kr();
      }), l = null;
    else {
      var u;
      switch (Yv(a)) {
        case ta:
          u = Su;
          break;
        case br:
          u = ef;
          break;
        case yr:
          u = Ti;
          break;
        case _u:
          u = tf;
          break;
        default:
          u = Ti;
          break;
      }
      l = mh(u, iN.bind(null, e));
    }
    e.callbackPriority = r, e.callbackNode = l;
  }
  function iN(e, t) {
    if (e1(), Ys = xt, id = J, (Je & (Sn | ba)) !== nn)
      throw new Error("Should not already be working.");
    var n = e.callbackNode, a = _r();
    if (a && e.callbackNode !== n)
      return null;
    var r = ju(e, e === Hn ? an : J);
    if (r === J)
      return null;
    var i = !Tu(e, r) && !LS(e, r) && !t, l = i ? qj(e, r) : sd(e, r);
    if (l !== jr) {
      if (l === qi) {
        var u = Rf(e);
        u !== J && (r = u, l = lh(e, u));
      }
      if (l === Us) {
        var c = zs;
        throw Wi(e, J), li(e, r), Qn(e, un()), c;
      }
      if (l === Jp)
        li(e, r);
      else {
        var h = !Tu(e, r), v = e.current.alternate;
        if (h && !Fj(v)) {
          if (l = sd(e, r), l === qi) {
            var C = Rf(e);
            C !== J && (r = C, l = lh(e, C));
          }
          if (l === Us) {
            var D = zs;
            throw Wi(e, J), li(e, r), Qn(e, un()), D;
          }
        }
        e.finishedWork = v, e.finishedLanes = r, Uj(e, l, r);
      }
    }
    return Qn(e, un()), e.callbackNode === n ? iN.bind(null, e) : null;
  }
  function lh(e, t) {
    var n = Hs;
    if (Ou(e)) {
      var a = Wi(e, t);
      a.flags |= pr, aC(e.containerInfo);
    }
    var r = sd(e, t);
    if (r !== qi) {
      var i = Kn;
      Kn = n, i !== null && lN(i);
    }
    return r;
  }
  function lN(e) {
    Kn === null ? Kn = e : Kn.push.apply(Kn, e);
  }
  function Uj(e, t, n) {
    switch (t) {
      case jr:
      case Us:
        throw new Error("Root did not complete. This is a bug in React.");
      case qi: {
        Ki(e, Kn, Tr);
        break;
      }
      case Zc: {
        if (li(e, n), Uv(n) && // do not delay if we're inside an act() scope
        !xN()) {
          var a = eh + tN - un();
          if (a > 10) {
            var r = ju(e, J);
            if (r !== J)
              break;
            var i = e.suspendedLanes;
            if (!El(i, n)) {
              Bn(), Hv(e, i);
              break;
            }
            e.timeoutHandle = am(Ki.bind(null, e, Kn, Tr), a);
            break;
          }
        }
        Ki(e, Kn, Tr);
        break;
      }
      case Fs: {
        if (li(e, n), AS(n))
          break;
        if (!xN()) {
          var l = TS(e, n), u = l, c = un() - u, h = aT(c) - c;
          if (h > 10) {
            e.timeoutHandle = am(Ki.bind(null, e, Kn, Tr), h);
            break;
          }
        }
        Ki(e, Kn, Tr);
        break;
      }
      case eN: {
        Ki(e, Kn, Tr);
        break;
      }
      default:
        throw new Error("Unknown root exit status.");
    }
  }
  function Fj(e) {
    for (var t = e; ; ) {
      if (t.flags & Gd) {
        var n = t.updateQueue;
        if (n !== null) {
          var a = n.stores;
          if (a !== null)
            for (var r = 0; r < a.length; r++) {
              var i = a[r], l = i.getSnapshot, u = i.value;
              try {
                if (!aa(l(), u))
                  return !1;
              } catch {
                return !1;
              }
            }
        }
      }
      var c = t.child;
      if (t.subtreeFlags & Gd && c !== null) {
        c.return = t, t = c;
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
  function li(e, t) {
    t = wu(t, td), t = wu(t, Ps), FS(e, t);
  }
  function oN(e) {
    if (t1(), (Je & (Sn | ba)) !== nn)
      throw new Error("Should not already be working.");
    _r();
    var t = ju(e, J);
    if (!ea(t, Le))
      return Qn(e, un()), null;
    var n = sd(e, t);
    if (e.tag !== Wr && n === qi) {
      var a = Rf(e);
      a !== J && (t = a, n = lh(e, a));
    }
    if (n === Us) {
      var r = zs;
      throw Wi(e, J), li(e, t), Qn(e, un()), r;
    }
    if (n === Jp)
      throw new Error("Root did not complete. This is a bug in React.");
    var i = e.current.alternate;
    return e.finishedWork = i, e.finishedLanes = t, Ki(e, Kn, Tr), Qn(e, un()), null;
  }
  function zj(e, t) {
    t !== J && (Tf(e, Be(t, Le)), Qn(e, un()), (Je & (Sn | ba)) === nn && (Bs(), Kr()));
  }
  function oh(e, t) {
    var n = Je;
    Je |= Zy;
    try {
      return e(t);
    } finally {
      Je = n, Je === nn && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
      !Pa.isBatchingLegacy && (Bs(), rb());
    }
  }
  function Pj(e, t, n, a, r) {
    var i = wa(), l = En.transition;
    try {
      return En.transition = null, fn(ta), e(t, n, a, r);
    } finally {
      fn(i), En.transition = l, Je === nn && Bs();
    }
  }
  function wr(e) {
    ri !== null && ri.tag === Wr && (Je & (Sn | ba)) === nn && _r();
    var t = Je;
    Je |= Zy;
    var n = En.transition, a = wa();
    try {
      return En.transition = null, fn(ta), e ? e() : void 0;
    } finally {
      fn(a), En.transition = n, Je = t, (Je & (Sn | ba)) === nn && Kr();
    }
  }
  function sN() {
    return (Je & (Sn | ba)) !== nn;
  }
  function od(e, t) {
    _n(Zp, rr, e), rr = Be(rr, t);
  }
  function sh(e) {
    rr = Zp.current, wn(Zp, e);
  }
  function Wi(e, t) {
    e.finishedWork = null, e.finishedLanes = J;
    var n = e.timeoutHandle;
    if (n !== rm && (e.timeoutHandle = rm, mD(n)), Mt !== null)
      for (var a = Mt.return; a !== null; ) {
        var r = a.alternate;
        Uy(r, a), a = a.return;
      }
    Hn = e;
    var i = Qi(e.current, null);
    return Mt = i, an = rr = t, rn = jr, zs = null, ed = J, Ps = J, td = J, Hs = null, Kn = null, LC(), Ma.discardPendingWarnings(), i;
  }
  function uN(e, t) {
    do {
      var n = Mt;
      try {
        if (gc(), Vb(), sn(), Xp.current = null, n === null || n.return === null) {
          rn = Us, zs = t, Mt = null;
          return;
        }
        if (at && n.mode & ft && qc(n, !0), Ke)
          if (bl(), t !== null && typeof t == "object" && typeof t.then == "function") {
            var a = t;
            vS(n, a, an);
          } else
            hS(n, t, an);
        c1(e, n.return, n, t, an), mN(n);
      } catch (r) {
        t = r, Mt === n && n !== null ? (n = n.return, Mt = n) : n = Mt;
        continue;
      }
      return;
    } while (!0);
  }
  function cN() {
    var e = Qp.current;
    return Qp.current = Hc, e === null ? Hc : e;
  }
  function dN(e) {
    Qp.current = e;
  }
  function Hj() {
    eh = un();
  }
  function qs(e) {
    ed = Be(e, ed);
  }
  function Bj() {
    rn === jr && (rn = Zc);
  }
  function uh() {
    (rn === jr || rn === Zc || rn === qi) && (rn = Fs), Hn !== null && (Df(ed) || Df(Ps)) && li(Hn, an);
  }
  function $j(e) {
    rn !== Fs && (rn = qi), Hs === null ? Hs = [e] : Hs.push(e);
  }
  function Ij() {
    return rn === jr;
  }
  function sd(e, t) {
    var n = Je;
    Je |= Sn;
    var a = cN();
    if (Hn !== e || an !== t) {
      if (Ta) {
        var r = e.memoizedUpdaters;
        r.size > 0 && (Gs(e, an), r.clear()), $v(e, t);
      }
      Tr = Iv(), Wi(e, t);
    }
    Mv(t);
    do
      try {
        Yj();
        break;
      } catch (i) {
        uN(e, i);
      }
    while (!0);
    if (gc(), Je = n, dN(a), Mt !== null)
      throw new Error("Cannot commit an incomplete root. This error is likely caused by a bug in React. Please file an issue.");
    return Vv(), Hn = null, an = J, rn;
  }
  function Yj() {
    for (; Mt !== null; )
      fN(Mt);
  }
  function qj(e, t) {
    var n = Je;
    Je |= Sn;
    var a = cN();
    if (Hn !== e || an !== t) {
      if (Ta) {
        var r = e.memoizedUpdaters;
        r.size > 0 && (Gs(e, an), r.clear()), $v(e, t);
      }
      Tr = Iv(), Bs(), Wi(e, t);
    }
    Mv(t);
    do
      try {
        Gj();
        break;
      } catch (i) {
        uN(e, i);
      }
    while (!0);
    return gc(), dN(a), Je = n, Mt !== null ? (xS(), jr) : (Vv(), Hn = null, an = J, rn);
  }
  function Gj() {
    for (; Mt !== null && !KE(); )
      fN(Mt);
  }
  function fN(e) {
    var t = e.alternate;
    jt(e);
    var n;
    (e.mode & ft) !== we ? (fp(e), n = ch(t, e, rr), qc(e, !0)) : n = ch(t, e, rr), sn(), e.memoizedProps = e.pendingProps, n === null ? mN(e) : Mt = n, Xp.current = null;
  }
  function mN(e) {
    var t = e;
    do {
      var n = t.alternate, a = t.return;
      if ((t.flags & Eu) === Oe) {
        jt(t);
        var r = void 0;
        if ((t.mode & ft) === we ? r = ky(n, t, rr) : (fp(t), r = ky(n, t, rr), qc(t, !1)), sn(), r !== null) {
          Mt = r;
          return;
        }
      } else {
        var i = B1(n, t);
        if (i !== null) {
          i.flags &= $E, Mt = i;
          return;
        }
        if ((t.mode & ft) !== we) {
          qc(t, !1);
          for (var l = t.actualDuration, u = t.child; u !== null; )
            l += u.actualDuration, u = u.sibling;
          t.actualDuration = l;
        }
        if (a !== null)
          a.flags |= Eu, a.subtreeFlags = Oe, a.deletions = null;
        else {
          rn = Jp, Mt = null;
          return;
        }
      }
      var c = t.sibling;
      if (c !== null) {
        Mt = c;
        return;
      }
      t = a, Mt = t;
    } while (t !== null);
    rn === jr && (rn = eN);
  }
  function Ki(e, t, n) {
    var a = wa(), r = En.transition;
    try {
      En.transition = null, fn(ta), Wj(e, t, n, a);
    } finally {
      En.transition = r, fn(a);
    }
    return null;
  }
  function Wj(e, t, n, a) {
    do
      _r();
    while (ri !== null);
    if (iT(), (Je & (Sn | ba)) !== nn)
      throw new Error("Should not already be working.");
    var r = e.finishedWork, i = e.finishedLanes;
    if (sS(i), r === null)
      return wv(), null;
    if (i === J && d("root.finishedLanes should not be empty during a commit. This is a bug in React."), e.finishedWork = null, e.finishedLanes = J, r === e.current)
      throw new Error("Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue.");
    e.callbackNode = null, e.callbackPriority = dn;
    var l = Be(r.lanes, r.childLanes);
    zS(e, l), e === Hn && (Hn = null, Mt = null, an = J), ((r.subtreeFlags & vl) !== Oe || (r.flags & vl) !== Oe) && (Gi || (Gi = !0, ah = n, mh(Ti, function() {
      return _r(), null;
    })));
    var u = (r.subtreeFlags & (Jd | Zd | _o | vl)) !== Oe, c = (r.flags & (Jd | Zd | _o | vl)) !== Oe;
    if (u || c) {
      var h = En.transition;
      En.transition = null;
      var v = wa();
      fn(ta);
      var C = Je;
      Je |= ba, Xp.current = null, G1(e, r), ry(), oj(e, r, i), lD(e.containerInfo), e.current = r, gS(i), sj(r, e, i), bS(), QE(), Je = C, fn(v), En.transition = h;
    } else
      e.current = r, ry();
    var D = Gi;
    if (Gi ? (Gi = !1, ri = e, $s = i) : (Jl = 0, rd = null), l = e.pendingLanes, l === J && (Xl = null), D || gN(e.current, !1), aS(r.stateNode, a), Ta && e.memoizedUpdaters.clear(), jj(), Qn(e, un()), t !== null)
      for (var M = e.onRecoverableError, A = 0; A < t.length; A++) {
        var B = t[A], ve = B.stack, je = B.digest;
        M(B.value, {
          componentStack: ve,
          digest: je
        });
      }
    if (nd) {
      nd = !1;
      var Se = th;
      throw th = null, Se;
    }
    return ea($s, Le) && e.tag !== Wr && _r(), l = e.pendingLanes, ea(l, Le) ? (ZC(), e === rh ? Is++ : (Is = 0, rh = e)) : Is = 0, Kr(), wv(), null;
  }
  function _r() {
    if (ri !== null) {
      var e = Yv($s), t = $S(yr, e), n = En.transition, a = wa();
      try {
        return En.transition = null, fn(t), Qj();
      } finally {
        fn(a), En.transition = n;
      }
    }
    return !1;
  }
  function Kj(e) {
    nh.push(e), Gi || (Gi = !0, mh(Ti, function() {
      return _r(), null;
    }));
  }
  function Qj() {
    if (ri === null)
      return !1;
    var e = ah;
    ah = null;
    var t = ri, n = $s;
    if (ri = null, $s = J, (Je & (Sn | ba)) !== nn)
      throw new Error("Cannot flush passive effects while already rendering.");
    ih = !0, ad = !1, yS(n);
    var a = Je;
    Je |= ba, hj(t.current), dj(t, t.current, n, e);
    {
      var r = nh;
      nh = [];
      for (var i = 0; i < r.length; i++) {
        var l = r[i];
        X1(t, l);
      }
    }
    NS(), gN(t.current, !0), Je = a, Kr(), ad ? t === rd ? Jl++ : (Jl = 0, rd = t) : Jl = 0, ih = !1, ad = !1, rS(t);
    {
      var u = t.current.stateNode;
      u.effectDuration = 0, u.passiveEffectDuration = 0;
    }
    return !0;
  }
  function pN(e) {
    return Xl !== null && Xl.has(e);
  }
  function Xj(e) {
    Xl === null ? Xl = /* @__PURE__ */ new Set([e]) : Xl.add(e);
  }
  function Jj(e) {
    nd || (nd = !0, th = e);
  }
  var Zj = Jj;
  function hN(e, t, n) {
    var a = Ii(n, t), r = fy(e, a, Le), i = Xr(e, r, Le), l = Bn();
    i !== null && (Fo(i, Le, l), Qn(i, l));
  }
  function bt(e, t, n) {
    if (I1(n), Ws(!1), e.tag === x) {
      hN(e, e, n);
      return;
    }
    var a = null;
    for (a = t; a !== null; ) {
      if (a.tag === x) {
        hN(a, e, n);
        return;
      } else if (a.tag === j) {
        var r = a.type, i = a.stateNode;
        if (typeof r.getDerivedStateFromError == "function" || typeof i.componentDidCatch == "function" && !pN(i)) {
          var l = Ii(n, e), u = _p(a, l, Le), c = Xr(a, u, Le), h = Bn();
          c !== null && (Fo(c, Le, h), Qn(c, h));
          return;
        }
      }
      a = a.return;
    }
    d(`Internal React error: Attempted to capture a commit phase error inside a detached tree. This indicates a bug in React. Likely causes include deleting the same fiber more than once, committing an already-finished tree, or an inconsistent return pointer.

Error message:

%s`, n);
  }
  function eT(e, t, n) {
    var a = e.pingCache;
    a !== null && a.delete(t);
    var r = Bn();
    Hv(e, n), uT(e), Hn === e && El(an, n) && (rn === Fs || rn === Zc && Uv(an) && un() - eh < tN ? Wi(e, J) : td = Be(td, n)), Qn(e, r);
  }
  function vN(e, t) {
    t === dn && (t = Aj(e));
    var n = Bn(), a = Gn(e, t);
    a !== null && (Fo(a, t, n), Qn(a, n));
  }
  function tT(e) {
    var t = e.memoizedState, n = dn;
    t !== null && (n = t.retryLane), vN(e, n);
  }
  function nT(e, t) {
    var n = dn, a;
    switch (e.tag) {
      case ee:
        a = e.stateNode;
        var r = e.memoizedState;
        r !== null && (n = r.retryLane);
        break;
      case oe:
        a = e.stateNode;
        break;
      default:
        throw new Error("Pinged unknown suspense boundary type. This is probably a bug in React.");
    }
    a !== null && a.delete(t), vN(e, n);
  }
  function aT(e) {
    return e < 120 ? 120 : e < 480 ? 480 : e < 1080 ? 1080 : e < 1920 ? 1920 : e < 3e3 ? 3e3 : e < 4320 ? 4320 : _j(e / 1960) * 1960;
  }
  function rT() {
    if (Is > Mj)
      throw Is = 0, rh = null, new Error("Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.");
    Jl > Vj && (Jl = 0, rd = null, d("Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render."));
  }
  function iT() {
    Ma.flushLegacyContextWarning(), Ma.flushPendingUnsafeLifecycleWarnings();
  }
  function gN(e, t) {
    jt(e), ud(e, zr, Rj), t && ud(e, Xd, Dj), ud(e, zr, Ej), t && ud(e, Xd, Sj), sn();
  }
  function ud(e, t, n) {
    for (var a = e, r = null; a !== null; ) {
      var i = a.subtreeFlags & t;
      a !== r && a.child !== null && i !== Oe ? a = a.child : ((a.flags & t) !== Oe && n(a), a.sibling !== null ? a = a.sibling : a = r = a.return);
    }
  }
  var cd = null;
  function bN(e) {
    {
      if ((Je & Sn) !== nn || !(e.mode & Xe))
        return;
      var t = e.tag;
      if (t !== F && t !== x && t !== j && t !== R && t !== P && t !== z && t !== U)
        return;
      var n = ze(e) || "ReactComponent";
      if (cd !== null) {
        if (cd.has(n))
          return;
        cd.add(n);
      } else
        cd = /* @__PURE__ */ new Set([n]);
      var a = kn;
      try {
        jt(e), d("Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously later calls tries to update the component. Move this work to useEffect instead.");
      } finally {
        a ? jt(e) : sn();
      }
    }
  }
  var ch;
  {
    var lT = null;
    ch = function(e, t, n) {
      var a = CN(lT, t);
      try {
        return Oy(e, t, n);
      } catch (i) {
        if (bC() || i !== null && typeof i == "object" && typeof i.then == "function")
          throw i;
        if (gc(), Vb(), Uy(e, t), CN(t, a), t.mode & ft && fp(t), Yd(null, Oy, null, e, t, n), PE()) {
          var r = qd();
          typeof r == "object" && r !== null && r._suppressLogging && typeof i == "object" && i !== null && !i._suppressLogging && (i._suppressLogging = !0);
        }
        throw i;
      }
    };
  }
  var yN = !1, dh;
  dh = /* @__PURE__ */ new Set();
  function oT(e) {
    if (yi && !QC())
      switch (e.tag) {
        case R:
        case P:
        case U: {
          var t = Mt && ze(Mt) || "Unknown", n = t;
          if (!dh.has(n)) {
            dh.add(n);
            var a = ze(e) || "Unknown";
            d("Cannot update a component (`%s`) while rendering a different component (`%s`). To locate the bad setState() call inside `%s`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render", a, t, t);
          }
          break;
        }
        case j: {
          yN || (d("Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state."), yN = !0);
          break;
        }
      }
  }
  function Gs(e, t) {
    if (Ta) {
      var n = e.memoizedUpdaters;
      n.forEach(function(a) {
        Bv(e, a, t);
      });
    }
  }
  var fh = {};
  function mh(e, t) {
    {
      var n = Pa.current;
      return n !== null ? (n.push(t), fh) : Tv(e, t);
    }
  }
  function NN(e) {
    if (e !== fh)
      return WE(e);
  }
  function xN() {
    return Pa.current !== null;
  }
  function sT(e) {
    {
      if (e.mode & Xe) {
        if (!Jy())
          return;
      } else if (!wj() || Je !== nn || e.tag !== R && e.tag !== P && e.tag !== U)
        return;
      if (Pa.current === null) {
        var t = kn;
        try {
          jt(e), d(`An update to %s inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`, ze(e));
        } finally {
          t ? jt(e) : sn();
        }
      }
    }
  }
  function uT(e) {
    e.tag !== Wr && Jy() && Pa.current === null && d(`A suspended resource finished loading inside a test, but the event was not wrapped in act(...).

When testing, code that resolves suspended data should be wrapped into act(...):

act(() => {
  /* finish loading suspended data */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`);
  }
  function Ws(e) {
    rN = e;
  }
  var ya = null, Zl = null, cT = function(e) {
    ya = e;
  };
  function eo(e) {
    {
      if (ya === null)
        return e;
      var t = ya(e);
      return t === void 0 ? e : t.current;
    }
  }
  function ph(e) {
    return eo(e);
  }
  function hh(e) {
    {
      if (ya === null)
        return e;
      var t = ya(e);
      if (t === void 0) {
        if (e != null && typeof e.render == "function") {
          var n = eo(e.render);
          if (e.render !== n) {
            var a = {
              $$typeof: Ce,
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
  function EN(e, t) {
    {
      if (ya === null)
        return !1;
      var n = e.elementType, a = t.type, r = !1, i = typeof a == "object" && a !== null ? a.$$typeof : null;
      switch (e.tag) {
        case j: {
          typeof a == "function" && (r = !0);
          break;
        }
        case R: {
          (typeof a == "function" || i === Te) && (r = !0);
          break;
        }
        case P: {
          (i === Ce || i === Te) && (r = !0);
          break;
        }
        case z:
        case U: {
          (i === He || i === Te) && (r = !0);
          break;
        }
        default:
          return !1;
      }
      if (r) {
        var l = ya(n);
        if (l !== void 0 && l === ya(a))
          return !0;
      }
      return !1;
    }
  }
  function SN(e) {
    {
      if (ya === null || typeof WeakSet != "function")
        return;
      Zl === null && (Zl = /* @__PURE__ */ new WeakSet()), Zl.add(e);
    }
  }
  var dT = function(e, t) {
    {
      if (ya === null)
        return;
      var n = t.staleFamilies, a = t.updatedFamilies;
      _r(), wr(function() {
        vh(e.current, a, n);
      });
    }
  }, fT = function(e, t) {
    {
      if (e.context !== ra)
        return;
      _r(), wr(function() {
        Ks(t, e, null, null);
      });
    }
  };
  function vh(e, t, n) {
    {
      var a = e.alternate, r = e.child, i = e.sibling, l = e.tag, u = e.type, c = null;
      switch (l) {
        case R:
        case U:
        case j:
          c = u;
          break;
        case P:
          c = u.render;
          break;
      }
      if (ya === null)
        throw new Error("Expected resolveFamily to be set during hot reload.");
      var h = !1, v = !1;
      if (c !== null) {
        var C = ya(c);
        C !== void 0 && (n.has(C) ? v = !0 : t.has(C) && (l === j ? v = !0 : h = !0));
      }
      if (Zl !== null && (Zl.has(e) || a !== null && Zl.has(a)) && (v = !0), v && (e._debugNeedsRemount = !0), v || h) {
        var D = Gn(e, Le);
        D !== null && ln(D, e, Le, xt);
      }
      r !== null && !v && vh(r, t, n), i !== null && vh(i, t, n);
    }
  }
  var mT = function(e, t) {
    {
      var n = /* @__PURE__ */ new Set(), a = new Set(t.map(function(r) {
        return r.current;
      }));
      return gh(e.current, a, n), n;
    }
  };
  function gh(e, t, n) {
    {
      var a = e.child, r = e.sibling, i = e.tag, l = e.type, u = null;
      switch (i) {
        case R:
        case U:
        case j:
          u = l;
          break;
        case P:
          u = l.render;
          break;
      }
      var c = !1;
      u !== null && t.has(u) && (c = !0), c ? pT(e, n) : a !== null && gh(a, t, n), r !== null && gh(r, t, n);
    }
  }
  function pT(e, t) {
    {
      var n = hT(e, t);
      if (n)
        return;
      for (var a = e; ; ) {
        switch (a.tag) {
          case L:
            t.add(a.stateNode);
            return;
          case T:
            t.add(a.stateNode.containerInfo);
            return;
          case x:
            t.add(a.stateNode.containerInfo);
            return;
        }
        if (a.return === null)
          throw new Error("Expected to reach root first.");
        a = a.return;
      }
    }
  }
  function hT(e, t) {
    for (var n = e, a = !1; ; ) {
      if (n.tag === L)
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
  var bh;
  {
    bh = !1;
    try {
      var RN = Object.preventExtensions({});
    } catch {
      bh = !0;
    }
  }
  function vT(e, t, n, a) {
    this.tag = e, this.key = n, this.elementType = null, this.type = null, this.stateNode = null, this.return = null, this.child = null, this.sibling = null, this.index = 0, this.ref = null, this.pendingProps = t, this.memoizedProps = null, this.updateQueue = null, this.memoizedState = null, this.dependencies = null, this.mode = a, this.flags = Oe, this.subtreeFlags = Oe, this.deletions = null, this.lanes = J, this.childLanes = J, this.alternate = null, this.actualDuration = Number.NaN, this.actualStartTime = Number.NaN, this.selfBaseDuration = Number.NaN, this.treeBaseDuration = Number.NaN, this.actualDuration = 0, this.actualStartTime = -1, this.selfBaseDuration = 0, this.treeBaseDuration = 0, this._debugSource = null, this._debugOwner = null, this._debugNeedsRemount = !1, this._debugHookTypes = null, !bh && typeof Object.preventExtensions == "function" && Object.preventExtensions(this);
  }
  var ia = function(e, t, n, a) {
    return new vT(e, t, n, a);
  };
  function yh(e) {
    var t = e.prototype;
    return !!(t && t.isReactComponent);
  }
  function gT(e) {
    return typeof e == "function" && !yh(e) && e.defaultProps === void 0;
  }
  function bT(e) {
    if (typeof e == "function")
      return yh(e) ? j : R;
    if (e != null) {
      var t = e.$$typeof;
      if (t === Ce)
        return P;
      if (t === He)
        return z;
    }
    return F;
  }
  function Qi(e, t) {
    var n = e.alternate;
    n === null ? (n = ia(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n._debugSource = e._debugSource, n._debugOwner = e._debugOwner, n._debugHookTypes = e._debugHookTypes, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = Oe, n.subtreeFlags = Oe, n.deletions = null, n.actualDuration = 0, n.actualStartTime = -1), n.flags = e.flags & vr, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue;
    var a = e.dependencies;
    switch (n.dependencies = a === null ? null : {
      lanes: a.lanes,
      firstContext: a.firstContext
    }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.selfBaseDuration = e.selfBaseDuration, n.treeBaseDuration = e.treeBaseDuration, n._debugNeedsRemount = e._debugNeedsRemount, n.tag) {
      case F:
      case R:
      case U:
        n.type = eo(e.type);
        break;
      case j:
        n.type = ph(e.type);
        break;
      case P:
        n.type = hh(e.type);
        break;
    }
    return n;
  }
  function yT(e, t) {
    e.flags &= vr | Yt;
    var n = e.alternate;
    if (n === null)
      e.childLanes = J, e.lanes = t, e.child = null, e.subtreeFlags = Oe, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null, e.selfBaseDuration = 0, e.treeBaseDuration = 0;
    else {
      e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = Oe, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type;
      var a = n.dependencies;
      e.dependencies = a === null ? null : {
        lanes: a.lanes,
        firstContext: a.firstContext
      }, e.selfBaseDuration = n.selfBaseDuration, e.treeBaseDuration = n.treeBaseDuration;
    }
    return e;
  }
  function NT(e, t, n) {
    var a;
    return e === oc ? (a = Xe, t === !0 && (a |= kt, a |= Wa)) : a = we, Ta && (a |= ft), ia(x, null, null, a);
  }
  function Nh(e, t, n, a, r, i) {
    var l = F, u = e;
    if (typeof e == "function")
      yh(e) ? (l = j, u = ph(u)) : u = eo(u);
    else if (typeof e == "string")
      l = L;
    else
      e: switch (e) {
        case Ia:
          return oi(n.children, r, i, t);
        case mi:
          l = ie, r |= kt, (r & Xe) !== we && (r |= Wa);
          break;
        case E:
          return xT(n, r, i, t);
        case We:
          return ET(n, r, i, t);
        case Ae:
          return ST(n, r, i, t);
        case Dt:
          return DN(n, r, i, t);
        case jn:
        case Qt:
        case Ya:
        case Da:
        case Rt:
        default: {
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case ne:
                l = K;
                break e;
              case he:
                l = ce;
                break e;
              case Ce:
                l = P, u = hh(u);
                break e;
              case He:
                l = z;
                break e;
              case Te:
                l = le, u = null;
                break e;
            }
          var c = "";
          {
            (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (c += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
            var h = a ? ze(a) : null;
            h && (c += `

Check the render method of \`` + h + "`.");
          }
          throw new Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) " + ("but got: " + (e == null ? e : typeof e) + "." + c));
        }
      }
    var v = ia(l, n, t, r);
    return v.elementType = e, v.type = u, v.lanes = i, v._debugOwner = a, v;
  }
  function xh(e, t, n) {
    var a = null;
    a = e._owner;
    var r = e.type, i = e.key, l = e.props, u = Nh(r, i, l, a, t, n);
    return u._debugSource = e._source, u._debugOwner = e._owner, u;
  }
  function oi(e, t, n, a) {
    var r = ia(pe, e, a, t);
    return r.lanes = n, r;
  }
  function xT(e, t, n, a) {
    typeof e.id != "string" && d('Profiler must specify an "id" of type `string` as a prop. Received the type `%s` instead.', typeof e.id);
    var r = ia(I, e, a, t | ft);
    return r.elementType = E, r.lanes = n, r.stateNode = {
      effectDuration: 0,
      passiveEffectDuration: 0
    }, r;
  }
  function ET(e, t, n, a) {
    var r = ia(ee, e, a, t);
    return r.elementType = We, r.lanes = n, r;
  }
  function ST(e, t, n, a) {
    var r = ia(oe, e, a, t);
    return r.elementType = Ae, r.lanes = n, r;
  }
  function DN(e, t, n, a) {
    var r = ia(k, e, a, t);
    r.elementType = Dt, r.lanes = n;
    var i = {
      isHidden: !1
    };
    return r.stateNode = i, r;
  }
  function Eh(e, t, n) {
    var a = ia(te, e, null, t);
    return a.lanes = n, a;
  }
  function RT() {
    var e = ia(L, null, null, we);
    return e.elementType = "DELETED", e;
  }
  function DT(e) {
    var t = ia(W, null, null, we);
    return t.stateNode = e, t;
  }
  function Sh(e, t, n) {
    var a = e.children !== null ? e.children : [], r = ia(T, a, e.key, t);
    return r.lanes = n, r.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      // Used by persistent updates
      implementation: e.implementation
    }, r;
  }
  function CN(e, t) {
    return e === null && (e = ia(F, null, null, we)), e.tag = t.tag, e.key = t.key, e.elementType = t.elementType, e.type = t.type, e.stateNode = t.stateNode, e.return = t.return, e.child = t.child, e.sibling = t.sibling, e.index = t.index, e.ref = t.ref, e.pendingProps = t.pendingProps, e.memoizedProps = t.memoizedProps, e.updateQueue = t.updateQueue, e.memoizedState = t.memoizedState, e.dependencies = t.dependencies, e.mode = t.mode, e.flags = t.flags, e.subtreeFlags = t.subtreeFlags, e.deletions = t.deletions, e.lanes = t.lanes, e.childLanes = t.childLanes, e.alternate = t.alternate, e.actualDuration = t.actualDuration, e.actualStartTime = t.actualStartTime, e.selfBaseDuration = t.selfBaseDuration, e.treeBaseDuration = t.treeBaseDuration, e._debugSource = t._debugSource, e._debugOwner = t._debugOwner, e._debugNeedsRemount = t._debugNeedsRemount, e._debugHookTypes = t._debugHookTypes, e;
  }
  function CT(e, t, n, a, r) {
    this.tag = t, this.containerInfo = e, this.pendingChildren = null, this.current = null, this.pingCache = null, this.finishedWork = null, this.timeoutHandle = rm, this.context = null, this.pendingContext = null, this.callbackNode = null, this.callbackPriority = dn, this.eventTimes = jf(J), this.expirationTimes = jf(xt), this.pendingLanes = J, this.suspendedLanes = J, this.pingedLanes = J, this.expiredLanes = J, this.mutableReadLanes = J, this.finishedLanes = J, this.entangledLanes = J, this.entanglements = jf(J), this.identifierPrefix = a, this.onRecoverableError = r, this.mutableSourceEagerHydrationData = null, this.effectDuration = 0, this.passiveEffectDuration = 0;
    {
      this.memoizedUpdaters = /* @__PURE__ */ new Set();
      for (var i = this.pendingUpdatersLaneMap = [], l = 0; l < af; l++)
        i.push(/* @__PURE__ */ new Set());
    }
    switch (t) {
      case oc:
        this._debugRootType = n ? "hydrateRoot()" : "createRoot()";
        break;
      case Wr:
        this._debugRootType = n ? "hydrate()" : "render()";
        break;
    }
  }
  function jN(e, t, n, a, r, i, l, u, c, h) {
    var v = new CT(e, t, n, u, c), C = NT(t, i);
    v.current = C, C.stateNode = v;
    {
      var D = {
        element: a,
        isDehydrated: n,
        cache: null,
        // not enabled yet
        transitions: null,
        pendingSuspenseBoundaries: null
      };
      C.memoizedState = D;
    }
    return km(C), v;
  }
  var Rh = "18.3.1";
  function jT(e, t, n) {
    var a = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
    return zt(a), {
      // This tag allow us to uniquely identify this as a React Portal
      $$typeof: Jn,
      key: a == null ? null : "" + a,
      children: e,
      containerInfo: t,
      implementation: n
    };
  }
  var Dh, Ch;
  Dh = !1, Ch = {};
  function TN(e) {
    if (!e)
      return ra;
    var t = ml(e), n = uC(t);
    if (t.tag === j) {
      var a = t.type;
      if (Xa(a))
        return tb(t, a, n);
    }
    return n;
  }
  function TT(e, t) {
    {
      var n = ml(e);
      if (n === void 0) {
        if (typeof e.render == "function")
          throw new Error("Unable to find node on an unmounted component.");
        var a = Object.keys(e).join(",");
        throw new Error("Argument appears to not be a ReactComponent. Keys: " + a);
      }
      var r = Dv(n);
      if (r === null)
        return null;
      if (r.mode & kt) {
        var i = ze(n) || "Component";
        if (!Ch[i]) {
          Ch[i] = !0;
          var l = kn;
          try {
            jt(r), n.mode & kt ? d("%s is deprecated in StrictMode. %s was passed an instance of %s which is inside StrictMode. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", t, t, i) : d("%s is deprecated in StrictMode. %s was passed an instance of %s which renders StrictMode children. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", t, t, i);
          } finally {
            l ? jt(l) : sn();
          }
        }
      }
      return r.stateNode;
    }
  }
  function wN(e, t, n, a, r, i, l, u) {
    var c = !1, h = null;
    return jN(e, t, c, h, n, a, r, i, l);
  }
  function _N(e, t, n, a, r, i, l, u, c, h) {
    var v = !0, C = jN(n, a, v, e, r, i, l, u, c);
    C.context = TN(null);
    var D = C.current, M = Bn(), A = ii(D), B = Dr(M, A);
    return B.callback = t ?? null, Xr(D, B, A), Lj(C, A, M), C;
  }
  function Ks(e, t, n, a) {
    nS(t, e);
    var r = t.current, i = Bn(), l = ii(r);
    ES(l);
    var u = TN(n);
    t.context === null ? t.context = u : t.pendingContext = u, yi && kn !== null && !Dh && (Dh = !0, d(`Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.

Check the render method of %s.`, ze(kn) || "Unknown"));
    var c = Dr(i, l);
    c.payload = {
      element: e
    }, a = a === void 0 ? null : a, a !== null && (typeof a != "function" && d("render(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", a), c.callback = a);
    var h = Xr(r, c, l);
    return h !== null && (ln(h, r, l, i), Ec(h, r, l)), l;
  }
  function dd(e) {
    var t = e.current;
    if (!t.child)
      return null;
    switch (t.child.tag) {
      case L:
        return t.child.stateNode;
      default:
        return t.child.stateNode;
    }
  }
  function wT(e) {
    switch (e.tag) {
      case x: {
        var t = e.stateNode;
        if (Ou(t)) {
          var n = OS(t);
          zj(t, n);
        }
        break;
      }
      case ee: {
        wr(function() {
          var r = Gn(e, Le);
          if (r !== null) {
            var i = Bn();
            ln(r, e, Le, i);
          }
        });
        var a = Le;
        jh(e, a);
        break;
      }
    }
  }
  function ON(e, t) {
    var n = e.memoizedState;
    n !== null && n.dehydrated !== null && (n.retryLane = US(n.retryLane, t));
  }
  function jh(e, t) {
    ON(e, t);
    var n = e.alternate;
    n && ON(n, t);
  }
  function _T(e) {
    if (e.tag === ee) {
      var t = Ao, n = Gn(e, t);
      if (n !== null) {
        var a = Bn();
        ln(n, e, t, a);
      }
      jh(e, t);
    }
  }
  function OT(e) {
    if (e.tag === ee) {
      var t = ii(e), n = Gn(e, t);
      if (n !== null) {
        var a = Bn();
        ln(n, e, t, a);
      }
      jh(e, t);
    }
  }
  function MN(e) {
    var t = GE(e);
    return t === null ? null : t.stateNode;
  }
  var VN = function(e) {
    return null;
  };
  function MT(e) {
    return VN(e);
  }
  var AN = function(e) {
    return !1;
  };
  function VT(e) {
    return AN(e);
  }
  var LN = null, kN = null, UN = null, FN = null, zN = null, PN = null, HN = null, BN = null, $N = null;
  {
    var IN = function(e, t, n) {
      var a = t[n], r = Ye(e) ? e.slice() : Ie({}, e);
      return n + 1 === t.length ? (Ye(r) ? r.splice(a, 1) : delete r[a], r) : (r[a] = IN(e[a], t, n + 1), r);
    }, YN = function(e, t) {
      return IN(e, t, 0);
    }, qN = function(e, t, n, a) {
      var r = t[a], i = Ye(e) ? e.slice() : Ie({}, e);
      if (a + 1 === t.length) {
        var l = n[a];
        i[l] = i[r], Ye(i) ? i.splice(r, 1) : delete i[r];
      } else
        i[r] = qN(
          // $FlowFixMe number or string is fine here
          e[r],
          t,
          n,
          a + 1
        );
      return i;
    }, GN = function(e, t, n) {
      if (t.length !== n.length) {
        S("copyWithRename() expects paths of the same length");
        return;
      } else
        for (var a = 0; a < n.length - 1; a++)
          if (t[a] !== n[a]) {
            S("copyWithRename() expects paths to be the same except for the deepest key");
            return;
          }
      return qN(e, t, n, 0);
    }, WN = function(e, t, n, a) {
      if (n >= t.length)
        return a;
      var r = t[n], i = Ye(e) ? e.slice() : Ie({}, e);
      return i[r] = WN(e[r], t, n + 1, a), i;
    }, KN = function(e, t, n) {
      return WN(e, t, 0, n);
    }, Th = function(e, t) {
      for (var n = e.memoizedState; n !== null && t > 0; )
        n = n.next, t--;
      return n;
    };
    LN = function(e, t, n, a) {
      var r = Th(e, t);
      if (r !== null) {
        var i = KN(r.memoizedState, n, a);
        r.memoizedState = i, r.baseState = i, e.memoizedProps = Ie({}, e.memoizedProps);
        var l = Gn(e, Le);
        l !== null && ln(l, e, Le, xt);
      }
    }, kN = function(e, t, n) {
      var a = Th(e, t);
      if (a !== null) {
        var r = YN(a.memoizedState, n);
        a.memoizedState = r, a.baseState = r, e.memoizedProps = Ie({}, e.memoizedProps);
        var i = Gn(e, Le);
        i !== null && ln(i, e, Le, xt);
      }
    }, UN = function(e, t, n, a) {
      var r = Th(e, t);
      if (r !== null) {
        var i = GN(r.memoizedState, n, a);
        r.memoizedState = i, r.baseState = i, e.memoizedProps = Ie({}, e.memoizedProps);
        var l = Gn(e, Le);
        l !== null && ln(l, e, Le, xt);
      }
    }, FN = function(e, t, n) {
      e.pendingProps = KN(e.memoizedProps, t, n), e.alternate && (e.alternate.pendingProps = e.pendingProps);
      var a = Gn(e, Le);
      a !== null && ln(a, e, Le, xt);
    }, zN = function(e, t) {
      e.pendingProps = YN(e.memoizedProps, t), e.alternate && (e.alternate.pendingProps = e.pendingProps);
      var n = Gn(e, Le);
      n !== null && ln(n, e, Le, xt);
    }, PN = function(e, t, n) {
      e.pendingProps = GN(e.memoizedProps, t, n), e.alternate && (e.alternate.pendingProps = e.pendingProps);
      var a = Gn(e, Le);
      a !== null && ln(a, e, Le, xt);
    }, HN = function(e) {
      var t = Gn(e, Le);
      t !== null && ln(t, e, Le, xt);
    }, BN = function(e) {
      VN = e;
    }, $N = function(e) {
      AN = e;
    };
  }
  function AT(e) {
    var t = Dv(e);
    return t === null ? null : t.stateNode;
  }
  function LT(e) {
    return null;
  }
  function kT() {
    return kn;
  }
  function UT(e) {
    var t = e.findFiberByHostInstance, n = p.ReactCurrentDispatcher;
    return tS({
      bundleType: e.bundleType,
      version: e.version,
      rendererPackageName: e.rendererPackageName,
      rendererConfig: e.rendererConfig,
      overrideHookState: LN,
      overrideHookStateDeletePath: kN,
      overrideHookStateRenamePath: UN,
      overrideProps: FN,
      overridePropsDeletePath: zN,
      overridePropsRenamePath: PN,
      setErrorHandler: BN,
      setSuspenseHandler: $N,
      scheduleUpdate: HN,
      currentDispatcherRef: n,
      findHostInstanceByFiber: AT,
      findFiberByHostInstance: t || LT,
      // React Refresh
      findHostInstancesForRefresh: mT,
      scheduleRefresh: dT,
      scheduleRoot: fT,
      setRefreshHandler: cT,
      // Enables DevTools to append owner stacks to error messages in DEV mode.
      getCurrentFiber: kT,
      // Enables DevTools to detect reconciler version rather than renderer version
      // which may not match for third party renderers.
      reconcilerVersion: Rh
    });
  }
  var QN = typeof reportError == "function" ? (
    // In modern browsers, reportError will dispatch an error event,
    // emulating an uncaught JavaScript error.
    reportError
  ) : function(e) {
    console.error(e);
  };
  function wh(e) {
    this._internalRoot = e;
  }
  fd.prototype.render = wh.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null)
      throw new Error("Cannot update an unmounted root.");
    {
      typeof arguments[1] == "function" ? d("render(...): does not support the second callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().") : md(arguments[1]) ? d("You passed a container to the second argument of root.render(...). You don't need to pass it again since you already passed it to create the root.") : typeof arguments[1] < "u" && d("You passed a second argument to root.render(...) but it only accepts one argument.");
      var n = t.containerInfo;
      if (n.nodeType !== It) {
        var a = MN(t.current);
        a && a.parentNode !== n && d("render(...): It looks like the React-rendered content of the root container was removed without using React. This is not supported and will cause errors. Instead, call root.unmount() to empty a root's container.");
      }
    }
    Ks(e, t, null, null);
  }, fd.prototype.unmount = wh.prototype.unmount = function() {
    typeof arguments[0] == "function" && d("unmount(...): does not support a callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().");
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      sN() && d("Attempted to synchronously unmount a root while React was already rendering. React cannot finish unmounting the root until the current render has completed, which may lead to a race condition."), wr(function() {
        Ks(null, e, null, null);
      }), Qg(t);
    }
  };
  function FT(e, t) {
    if (!md(e))
      throw new Error("createRoot(...): Target container is not a DOM element.");
    XN(e);
    var n = !1, a = !1, r = "", i = QN;
    t != null && (t.hydrate ? S("hydrate through createRoot is deprecated. Use ReactDOMClient.hydrateRoot(container, <App />) instead.") : typeof t == "object" && t !== null && t.$$typeof === da && d(`You passed a JSX element to createRoot. You probably meant to call root.render instead. Example usage:

  let root = createRoot(domContainer);
  root.render(<App />);`), t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (i = t.onRecoverableError), t.transitionCallbacks !== void 0 && t.transitionCallbacks);
    var l = wN(e, oc, null, n, a, r, i);
    ec(l.current, e);
    var u = e.nodeType === It ? e.parentNode : e;
    return ts(u), new wh(l);
  }
  function fd(e) {
    this._internalRoot = e;
  }
  function zT(e) {
    e && e0(e);
  }
  fd.prototype.unstable_scheduleHydration = zT;
  function PT(e, t, n) {
    if (!md(e))
      throw new Error("hydrateRoot(...): Target container is not a DOM element.");
    XN(e), t === void 0 && d("Must provide initial children as second argument to hydrateRoot. Example usage: hydrateRoot(domContainer, <App />)");
    var a = n ?? null, r = n != null && n.hydratedSources || null, i = !1, l = !1, u = "", c = QN;
    n != null && (n.unstable_strictMode === !0 && (i = !0), n.identifierPrefix !== void 0 && (u = n.identifierPrefix), n.onRecoverableError !== void 0 && (c = n.onRecoverableError));
    var h = _N(t, null, e, oc, a, i, l, u, c);
    if (ec(h.current, e), ts(e), r)
      for (var v = 0; v < r.length; v++) {
        var C = r[v];
        IC(h, C);
      }
    return new fd(h);
  }
  function md(e) {
    return !!(e && (e.nodeType === Yn || e.nodeType === mr || e.nodeType === Ad));
  }
  function Qs(e) {
    return !!(e && (e.nodeType === Yn || e.nodeType === mr || e.nodeType === Ad || e.nodeType === It && e.nodeValue === " react-mount-point-unstable "));
  }
  function XN(e) {
    e.nodeType === Yn && e.tagName && e.tagName.toUpperCase() === "BODY" && d("createRoot(): Creating roots directly with document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try using a container element created for your app."), fs(e) && (e._reactRootContainer ? d("You are calling ReactDOMClient.createRoot() on a container that was previously passed to ReactDOM.render(). This is not supported.") : d("You are calling ReactDOMClient.createRoot() on a container that has already been passed to createRoot() before. Instead, call root.render() on the existing root instead if you want to update it."));
  }
  var HT = p.ReactCurrentOwner, JN;
  JN = function(e) {
    if (e._reactRootContainer && e.nodeType !== It) {
      var t = MN(e._reactRootContainer.current);
      t && t.parentNode !== e && d("render(...): It looks like the React-rendered content of this container was removed without using React. This is not supported and will cause errors. Instead, call ReactDOM.unmountComponentAtNode to empty a container.");
    }
    var n = !!e._reactRootContainer, a = _h(e), r = !!(a && qr(a));
    r && !n && d("render(...): Replacing React-rendered children with a new root component. If you intended to update the children of this node, you should instead have the existing children update their state and render the new components instead of calling ReactDOM.render."), e.nodeType === Yn && e.tagName && e.tagName.toUpperCase() === "BODY" && d("render(): Rendering components directly into document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try rendering into a container element created for your app.");
  };
  function _h(e) {
    return e ? e.nodeType === mr ? e.documentElement : e.firstChild : null;
  }
  function ZN() {
  }
  function BT(e, t, n, a, r) {
    if (r) {
      if (typeof a == "function") {
        var i = a;
        a = function() {
          var D = dd(l);
          i.call(D);
        };
      }
      var l = _N(
        t,
        a,
        e,
        Wr,
        null,
        // hydrationCallbacks
        !1,
        // isStrictMode
        !1,
        // concurrentUpdatesByDefaultOverride,
        "",
        // identifierPrefix
        ZN
      );
      e._reactRootContainer = l, ec(l.current, e);
      var u = e.nodeType === It ? e.parentNode : e;
      return ts(u), wr(), l;
    } else {
      for (var c; c = e.lastChild; )
        e.removeChild(c);
      if (typeof a == "function") {
        var h = a;
        a = function() {
          var D = dd(v);
          h.call(D);
        };
      }
      var v = wN(
        e,
        Wr,
        null,
        // hydrationCallbacks
        !1,
        // isStrictMode
        !1,
        // concurrentUpdatesByDefaultOverride,
        "",
        // identifierPrefix
        ZN
      );
      e._reactRootContainer = v, ec(v.current, e);
      var C = e.nodeType === It ? e.parentNode : e;
      return ts(C), wr(function() {
        Ks(t, v, n, a);
      }), v;
    }
  }
  function $T(e, t) {
    e !== null && typeof e != "function" && d("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t, e);
  }
  function pd(e, t, n, a, r) {
    JN(n), $T(r === void 0 ? null : r, "render");
    var i = n._reactRootContainer, l;
    if (!i)
      l = BT(n, t, e, r, a);
    else {
      if (l = i, typeof r == "function") {
        var u = r;
        r = function() {
          var c = dd(l);
          u.call(c);
        };
      }
      Ks(t, l, e, r);
    }
    return dd(l);
  }
  var ex = !1;
  function IT(e) {
    {
      ex || (ex = !0, d("findDOMNode is deprecated and will be removed in the next major release. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node"));
      var t = HT.current;
      if (t !== null && t.stateNode !== null) {
        var n = t.stateNode._warnedAboutRefsInRender;
        n || d("%s is accessing findDOMNode inside its render(). render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", rt(t.type) || "A component"), t.stateNode._warnedAboutRefsInRender = !0;
      }
    }
    return e == null ? null : e.nodeType === Yn ? e : TT(e, "findDOMNode");
  }
  function YT(e, t, n) {
    if (d("ReactDOM.hydrate is no longer supported in React 18. Use hydrateRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !Qs(t))
      throw new Error("Target container is not a DOM element.");
    {
      var a = fs(t) && t._reactRootContainer === void 0;
      a && d("You are calling ReactDOM.hydrate() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call hydrateRoot(container, element)?");
    }
    return pd(null, e, t, !0, n);
  }
  function qT(e, t, n) {
    if (d("ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !Qs(t))
      throw new Error("Target container is not a DOM element.");
    {
      var a = fs(t) && t._reactRootContainer === void 0;
      a && d("You are calling ReactDOM.render() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.render(element)?");
    }
    return pd(null, e, t, !1, n);
  }
  function GT(e, t, n, a) {
    if (d("ReactDOM.unstable_renderSubtreeIntoContainer() is no longer supported in React 18. Consider using a portal instead. Until you switch to the createRoot API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !Qs(n))
      throw new Error("Target container is not a DOM element.");
    if (e == null || !HE(e))
      throw new Error("parentComponent must be a valid React Component");
    return pd(e, t, n, !1, a);
  }
  var tx = !1;
  function WT(e) {
    if (tx || (tx = !0, d("unmountComponentAtNode is deprecated and will be removed in the next major release. Switch to the createRoot API. Learn more: https://reactjs.org/link/switch-to-createroot")), !Qs(e))
      throw new Error("unmountComponentAtNode(...): Target container is not a DOM element.");
    {
      var t = fs(e) && e._reactRootContainer === void 0;
      t && d("You are calling ReactDOM.unmountComponentAtNode() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.unmount()?");
    }
    if (e._reactRootContainer) {
      {
        var n = _h(e), a = n && !qr(n);
        a && d("unmountComponentAtNode(): The node you're attempting to unmount was rendered by another copy of React.");
      }
      return wr(function() {
        pd(null, null, e, !1, function() {
          e._reactRootContainer = null, Qg(e);
        });
      }), !0;
    } else {
      {
        var r = _h(e), i = !!(r && qr(r)), l = e.nodeType === Yn && Qs(e.parentNode) && !!e.parentNode._reactRootContainer;
        i && d("unmountComponentAtNode(): The node you're attempting to unmount was rendered by React and is not a top-level container. %s", l ? "You may have accidentally passed in a React root node instead of its container." : "Instead, have the parent component update its state and rerender in order to remove this component.");
      }
      return !1;
    }
  }
  IS(wT), qS(_T), GS(OT), WS(wa), KS(HS), (typeof Map != "function" || // $FlowIssue Flow incorrectly thinks Map has no prototype
  Map.prototype == null || typeof Map.prototype.forEach != "function" || typeof Set != "function" || // $FlowIssue Flow incorrectly thinks Set has no prototype
  Set.prototype == null || typeof Set.prototype.clear != "function" || typeof Set.prototype.forEach != "function") && d("React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"), _E(QR), VE(oh, Pj, wr);
  function KT(e, t) {
    var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
    if (!md(t))
      throw new Error("Target container is not a DOM element.");
    return jT(e, t, null, n);
  }
  function QT(e, t, n, a) {
    return GT(e, t, n, a);
  }
  var Oh = {
    usingClientEntryPoint: !1,
    // Keep in sync with ReactTestUtils.js.
    // This is an array for better minification.
    Events: [qr, Ol, tc, fv, mv, oh]
  };
  function XT(e, t) {
    return Oh.usingClientEntryPoint || d('You are importing createRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), FT(e, t);
  }
  function JT(e, t, n) {
    return Oh.usingClientEntryPoint || d('You are importing hydrateRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), PT(e, t, n);
  }
  function ZT(e) {
    return sN() && d("flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task."), wr(e);
  }
  var ew = UT({
    findFiberByHostInstance: Li,
    bundleType: 1,
    version: Rh,
    rendererPackageName: "react-dom"
  });
  if (!ew && Z && window.top === window.self && (navigator.userAgent.indexOf("Chrome") > -1 && navigator.userAgent.indexOf("Edge") === -1 || navigator.userAgent.indexOf("Firefox") > -1)) {
    var nx = window.location.protocol;
    /^(https?|file):$/.test(nx) && console.info("%cDownload the React DevTools for a better development experience: https://reactjs.org/link/react-devtools" + (nx === "file:" ? `
You might need to use a local HTTP server (instead of file://): https://reactjs.org/link/react-devtools-faq` : ""), "font-weight:bold");
  }
  oa.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Oh, oa.createPortal = KT, oa.createRoot = XT, oa.findDOMNode = IT, oa.flushSync = ZT, oa.hydrate = YT, oa.hydrateRoot = JT, oa.render = qT, oa.unmountComponentAtNode = WT, oa.unstable_batchedUpdates = oh, oa.unstable_renderSubtreeIntoContainer = QT, oa.version = Rh, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
})();
xx.exports = oa;
var sw = xx.exports, Rx, ax = sw;
{
  var rx = ax.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  Rx = function(o, f) {
    rx.usingClientEntryPoint = !0;
    try {
      return ax.createRoot(o, f);
    } finally {
      rx.usingClientEntryPoint = !1;
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
function Js() {
  return Js = Object.assign ? Object.assign.bind() : function(o) {
    for (var f = 1; f < arguments.length; f++) {
      var p = arguments[f];
      for (var g in p)
        Object.prototype.hasOwnProperty.call(p, g) && (o[g] = p[g]);
    }
    return o;
  }, Js.apply(this, arguments);
}
var si;
(function(o) {
  o.Pop = "POP", o.Push = "PUSH", o.Replace = "REPLACE";
})(si || (si = {}));
const ix = "popstate";
function uw(o) {
  o === void 0 && (o = {});
  function f(g, b) {
    let {
      pathname: S,
      search: d,
      hash: w
    } = g.location;
    return Lh(
      "",
      {
        pathname: S,
        search: d,
        hash: w
      },
      // state defaults to `null` because `window.history.state` does
      b.state && b.state.usr || null,
      b.state && b.state.key || "default"
    );
  }
  function p(g, b) {
    return typeof b == "string" ? b : Zs(b);
  }
  return dw(f, p, null, o);
}
function wt(o, f) {
  if (o === !1 || o === null || typeof o > "u")
    throw new Error(f);
}
function Ha(o, f) {
  if (!o) {
    typeof console < "u" && console.warn(f);
    try {
      throw new Error(f);
    } catch {
    }
  }
}
function cw() {
  return Math.random().toString(36).substr(2, 8);
}
function lx(o, f) {
  return {
    usr: o.state,
    key: o.key,
    idx: f
  };
}
function Lh(o, f, p, g) {
  return p === void 0 && (p = null), Js({
    pathname: typeof o == "string" ? o : o.pathname,
    search: "",
    hash: ""
  }, typeof f == "string" ? ao(f) : f, {
    state: p,
    // TODO: This could be cleaned up.  push/replace should probably just take
    // full Locations now and avoid the need to run through this flow at all
    // But that's a pretty big refactor to the current test suite so going to
    // keep as is for the time being and just let any incoming keys take precedence
    key: f && f.key || g || cw()
  });
}
function Zs(o) {
  let {
    pathname: f = "/",
    search: p = "",
    hash: g = ""
  } = o;
  return p && p !== "?" && (f += p.charAt(0) === "?" ? p : "?" + p), g && g !== "#" && (f += g.charAt(0) === "#" ? g : "#" + g), f;
}
function ao(o) {
  let f = {};
  if (o) {
    let p = o.indexOf("#");
    p >= 0 && (f.hash = o.substr(p), o = o.substr(0, p));
    let g = o.indexOf("?");
    g >= 0 && (f.search = o.substr(g), o = o.substr(0, g)), o && (f.pathname = o);
  }
  return f;
}
function dw(o, f, p, g) {
  g === void 0 && (g = {});
  let {
    window: b = document.defaultView,
    v5Compat: S = !1
  } = g, d = b.history, w = si.Pop, R = null, j = F();
  j == null && (j = 0, d.replaceState(Js({}, d.state, {
    idx: j
  }), ""));
  function F() {
    return (d.state || {
      idx: null
    }).idx;
  }
  function x() {
    w = si.Pop;
    let ie = F(), ce = ie == null ? null : ie - j;
    j = ie, R && R({
      action: w,
      location: pe.location,
      delta: ce
    });
  }
  function T(ie, ce) {
    w = si.Push;
    let K = Lh(pe.location, ie, ce);
    j = F() + 1;
    let P = lx(K, j), I = pe.createHref(K);
    try {
      d.pushState(P, "", I);
    } catch (ee) {
      if (ee instanceof DOMException && ee.name === "DataCloneError")
        throw ee;
      b.location.assign(I);
    }
    S && R && R({
      action: w,
      location: pe.location,
      delta: 1
    });
  }
  function L(ie, ce) {
    w = si.Replace;
    let K = Lh(pe.location, ie, ce);
    j = F();
    let P = lx(K, j), I = pe.createHref(K);
    d.replaceState(P, "", I), S && R && R({
      action: w,
      location: pe.location,
      delta: 0
    });
  }
  function te(ie) {
    let ce = b.location.origin !== "null" ? b.location.origin : b.location.href, K = typeof ie == "string" ? ie : Zs(ie);
    return K = K.replace(/ $/, "%20"), wt(ce, "No window.location.(origin|href) available to create URL for href: " + K), new URL(K, ce);
  }
  let pe = {
    get action() {
      return w;
    },
    get location() {
      return o(b, d);
    },
    listen(ie) {
      if (R)
        throw new Error("A history only accepts one active listener");
      return b.addEventListener(ix, x), R = ie, () => {
        b.removeEventListener(ix, x), R = null;
      };
    },
    createHref(ie) {
      return f(b, ie);
    },
    createURL: te,
    encodeLocation(ie) {
      let ce = te(ie);
      return {
        pathname: ce.pathname,
        search: ce.search,
        hash: ce.hash
      };
    },
    push: T,
    replace: L,
    go(ie) {
      return d.go(ie);
    }
  };
  return pe;
}
var ox;
(function(o) {
  o.data = "data", o.deferred = "deferred", o.redirect = "redirect", o.error = "error";
})(ox || (ox = {}));
function fw(o, f, p) {
  return p === void 0 && (p = "/"), mw(o, f, p);
}
function mw(o, f, p, g) {
  let b = typeof f == "string" ? ao(f) : f, S = ci(b.pathname || "/", p);
  if (S == null)
    return null;
  let d = Dx(o);
  pw(d);
  let w = null;
  for (let R = 0; w == null && R < d.length; ++R) {
    let j = Dw(S);
    w = Sw(d[R], j);
  }
  return w;
}
function Dx(o, f, p, g) {
  f === void 0 && (f = []), p === void 0 && (p = []), g === void 0 && (g = "");
  let b = (S, d, w) => {
    let R = {
      relativePath: w === void 0 ? S.path || "" : w,
      caseSensitive: S.caseSensitive === !0,
      childrenIndex: d,
      route: S
    };
    R.relativePath.startsWith("/") && (wt(R.relativePath.startsWith(g), 'Absolute route path "' + R.relativePath + '" nested under path ' + ('"' + g + '" is not valid. An absolute child route path ') + "must start with the combined path of all its parent routes."), R.relativePath = R.relativePath.slice(g.length));
    let j = Vr([g, R.relativePath]), F = p.concat(R);
    S.children && S.children.length > 0 && (wt(
      // Our types know better, but runtime JS may not!
      // @ts-expect-error
      S.index !== !0,
      "Index routes must not have child routes. Please remove " + ('all child routes from route path "' + j + '".')
    ), Dx(S.children, f, F, j)), !(S.path == null && !S.index) && f.push({
      path: j,
      score: xw(j, S.index),
      routesMeta: F
    });
  };
  return o.forEach((S, d) => {
    var w;
    if (S.path === "" || !((w = S.path) != null && w.includes("?")))
      b(S, d);
    else
      for (let R of Cx(S.path))
        b(S, d, R);
  }), f;
}
function Cx(o) {
  let f = o.split("/");
  if (f.length === 0) return [];
  let [p, ...g] = f, b = p.endsWith("?"), S = p.replace(/\?$/, "");
  if (g.length === 0)
    return b ? [S, ""] : [S];
  let d = Cx(g.join("/")), w = [];
  return w.push(...d.map((R) => R === "" ? S : [S, R].join("/"))), b && w.push(...d), w.map((R) => o.startsWith("/") && R === "" ? "/" : R);
}
function pw(o) {
  o.sort((f, p) => f.score !== p.score ? p.score - f.score : Ew(f.routesMeta.map((g) => g.childrenIndex), p.routesMeta.map((g) => g.childrenIndex)));
}
const hw = /^:[\w-]+$/, vw = 3, gw = 2, bw = 1, yw = 10, Nw = -2, sx = (o) => o === "*";
function xw(o, f) {
  let p = o.split("/"), g = p.length;
  return p.some(sx) && (g += Nw), f && (g += gw), p.filter((b) => !sx(b)).reduce((b, S) => b + (hw.test(S) ? vw : S === "" ? bw : yw), g);
}
function Ew(o, f) {
  return o.length === f.length && o.slice(0, -1).every((g, b) => g === f[b]) ? (
    // If two routes are siblings, we should try to match the earlier sibling
    // first. This allows people to have fine-grained control over the matching
    // behavior by simply putting routes with identical paths in the order they
    // want them tried.
    o[o.length - 1] - f[f.length - 1]
  ) : (
    // Otherwise, it doesn't really make sense to rank non-siblings by index,
    // so they sort equally.
    0
  );
}
function Sw(o, f, p) {
  let {
    routesMeta: g
  } = o, b = {}, S = "/", d = [];
  for (let w = 0; w < g.length; ++w) {
    let R = g[w], j = w === g.length - 1, F = S === "/" ? f : f.slice(S.length) || "/", x = kh({
      path: R.relativePath,
      caseSensitive: R.caseSensitive,
      end: j
    }, F), T = R.route;
    if (!x)
      return null;
    Object.assign(b, x.params), d.push({
      // TODO: Can this as be avoided?
      params: b,
      pathname: Vr([S, x.pathname]),
      pathnameBase: ww(Vr([S, x.pathnameBase])),
      route: T
    }), x.pathnameBase !== "/" && (S = Vr([S, x.pathnameBase]));
  }
  return d;
}
function kh(o, f) {
  typeof o == "string" && (o = {
    path: o,
    caseSensitive: !1,
    end: !0
  });
  let [p, g] = Rw(o.path, o.caseSensitive, o.end), b = f.match(p);
  if (!b) return null;
  let S = b[0], d = S.replace(/(.)\/+$/, "$1"), w = b.slice(1);
  return {
    params: g.reduce((j, F, x) => {
      let {
        paramName: T,
        isOptional: L
      } = F;
      if (T === "*") {
        let pe = w[x] || "";
        d = S.slice(0, S.length - pe.length).replace(/(.)\/+$/, "$1");
      }
      const te = w[x];
      return L && !te ? j[T] = void 0 : j[T] = (te || "").replace(/%2F/g, "/"), j;
    }, {}),
    pathname: S,
    pathnameBase: d,
    pattern: o
  };
}
function Rw(o, f, p) {
  f === void 0 && (f = !1), p === void 0 && (p = !0), Ha(o === "*" || !o.endsWith("*") || o.endsWith("/*"), 'Route path "' + o + '" will be treated as if it were ' + ('"' + o.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + o.replace(/\*$/, "/*") + '".'));
  let g = [], b = "^" + o.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(/\/:([\w-]+)(\?)?/g, (d, w, R) => (g.push({
    paramName: w,
    isOptional: R != null
  }), R ? "/?([^\\/]+)?" : "/([^\\/]+)"));
  return o.endsWith("*") ? (g.push({
    paramName: "*"
  }), b += o === "*" || o === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : p ? b += "\\/*$" : o !== "" && o !== "/" && (b += "(?:(?=\\/|$))"), [new RegExp(b, f ? void 0 : "i"), g];
}
function Dw(o) {
  try {
    return o.split("/").map((f) => decodeURIComponent(f).replace(/\//g, "%2F")).join("/");
  } catch (f) {
    return Ha(!1, 'The URL path "' + o + '" could not be decoded because it is is a malformed URL segment. This is probably due to a bad percent ' + ("encoding (" + f + ").")), o;
  }
}
function ci(o, f) {
  if (f === "/") return o;
  if (!o.toLowerCase().startsWith(f.toLowerCase()))
    return null;
  let p = f.endsWith("/") ? f.length - 1 : f.length, g = o.charAt(p);
  return g && g !== "/" ? null : o.slice(p) || "/";
}
function Cw(o, f) {
  f === void 0 && (f = "/");
  let {
    pathname: p,
    search: g = "",
    hash: b = ""
  } = typeof o == "string" ? ao(o) : o;
  return {
    pathname: p ? p.startsWith("/") ? p : jw(p, f) : f,
    search: _w(g),
    hash: Ow(b)
  };
}
function jw(o, f) {
  let p = f.replace(/\/+$/, "").split("/");
  return o.split("/").forEach((b) => {
    b === ".." ? p.length > 1 && p.pop() : b !== "." && p.push(b);
  }), p.length > 1 ? p.join("/") : "/";
}
function Mh(o, f, p, g) {
  return "Cannot include a '" + o + "' character in a manually specified " + ("`to." + f + "` field [" + JSON.stringify(g) + "].  Please separate it out to the ") + ("`to." + p + "` field. Alternatively you may provide the full path as ") + 'a string in <Link to="..."> and the router will parse it for you.';
}
function Tw(o) {
  return o.filter((f, p) => p === 0 || f.route.path && f.route.path.length > 0);
}
function Ph(o, f) {
  let p = Tw(o);
  return f ? p.map((g, b) => b === p.length - 1 ? g.pathname : g.pathnameBase) : p.map((g) => g.pathnameBase);
}
function Hh(o, f, p, g) {
  g === void 0 && (g = !1);
  let b;
  typeof o == "string" ? b = ao(o) : (b = Js({}, o), wt(!b.pathname || !b.pathname.includes("?"), Mh("?", "pathname", "search", b)), wt(!b.pathname || !b.pathname.includes("#"), Mh("#", "pathname", "hash", b)), wt(!b.search || !b.search.includes("#"), Mh("#", "search", "hash", b)));
  let S = o === "" || b.pathname === "", d = S ? "/" : b.pathname, w;
  if (d == null)
    w = p;
  else {
    let x = f.length - 1;
    if (!g && d.startsWith("..")) {
      let T = d.split("/");
      for (; T[0] === ".."; )
        T.shift(), x -= 1;
      b.pathname = T.join("/");
    }
    w = x >= 0 ? f[x] : "/";
  }
  let R = Cw(b, w), j = d && d !== "/" && d.endsWith("/"), F = (S || d === ".") && p.endsWith("/");
  return !R.pathname.endsWith("/") && (j || F) && (R.pathname += "/"), R;
}
const Vr = (o) => o.join("/").replace(/\/\/+/g, "/"), ww = (o) => o.replace(/\/+$/, "").replace(/^\/*/, "/"), _w = (o) => !o || o === "?" ? "" : o.startsWith("?") ? o : "?" + o, Ow = (o) => !o || o === "#" ? "" : o.startsWith("#") ? o : "#" + o;
function Mw(o) {
  return o != null && typeof o.status == "number" && typeof o.statusText == "string" && typeof o.internal == "boolean" && "data" in o;
}
const jx = ["post", "put", "patch", "delete"];
new Set(jx);
const Vw = ["get", ...jx];
new Set(Vw);
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
function eu() {
  return eu = Object.assign ? Object.assign.bind() : function(o) {
    for (var f = 1; f < arguments.length; f++) {
      var p = arguments[f];
      for (var g in p)
        Object.prototype.hasOwnProperty.call(p, g) && (o[g] = p[g]);
    }
    return o;
  }, eu.apply(this, arguments);
}
const nu = /* @__PURE__ */ y.createContext(null);
nu.displayName = "DataRouter";
const Bh = /* @__PURE__ */ y.createContext(null);
Bh.displayName = "DataRouterState";
const Aw = /* @__PURE__ */ y.createContext(null);
Aw.displayName = "Await";
const Na = /* @__PURE__ */ y.createContext(null);
Na.displayName = "Navigation";
const au = /* @__PURE__ */ y.createContext(null);
au.displayName = "Location";
const $a = /* @__PURE__ */ y.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
$a.displayName = "Route";
const $h = /* @__PURE__ */ y.createContext(null);
$h.displayName = "RouteError";
function Lw(o, f) {
  let {
    relative: p
  } = f === void 0 ? {} : f;
  ro() || wt(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  );
  let {
    basename: g,
    navigator: b
  } = y.useContext(Na), {
    hash: S,
    pathname: d,
    search: w
  } = ru(o, {
    relative: p
  }), R = d;
  return g !== "/" && (R = d === "/" ? g : Vr([g, d])), b.createHref({
    pathname: R,
    search: w,
    hash: S
  });
}
function ro() {
  return y.useContext(au) != null;
}
function Ji() {
  return ro() || wt(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ), y.useContext(au).location;
}
const Tx = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function wx(o) {
  y.useContext(Na).static || y.useLayoutEffect(o);
}
function Ih() {
  let {
    isDataRoute: o
  } = y.useContext($a);
  return o ? Qw() : kw();
}
function kw() {
  ro() || wt(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let o = y.useContext(nu), {
    basename: f,
    future: p,
    navigator: g
  } = y.useContext(Na), {
    matches: b
  } = y.useContext($a), {
    pathname: S
  } = Ji(), d = JSON.stringify(Ph(b, p.v7_relativeSplatPath)), w = y.useRef(!1);
  return wx(() => {
    w.current = !0;
  }), y.useCallback(function(j, F) {
    if (F === void 0 && (F = {}), Ha(w.current, Tx), !w.current) return;
    if (typeof j == "number") {
      g.go(j);
      return;
    }
    let x = Hh(j, JSON.parse(d), S, F.relative === "path");
    o == null && f !== "/" && (x.pathname = x.pathname === "/" ? f : Vr([f, x.pathname])), (F.replace ? g.replace : g.push)(x, F.state, F);
  }, [f, g, d, S, o]);
}
function Uw() {
  let {
    matches: o
  } = y.useContext($a), f = o[o.length - 1];
  return f ? f.params : {};
}
function ru(o, f) {
  let {
    relative: p
  } = f === void 0 ? {} : f, {
    future: g
  } = y.useContext(Na), {
    matches: b
  } = y.useContext($a), {
    pathname: S
  } = Ji(), d = JSON.stringify(Ph(b, g.v7_relativeSplatPath));
  return y.useMemo(() => Hh(o, JSON.parse(d), S, p === "path"), [o, d, S, p]);
}
function Fw(o, f) {
  return zw(o, f);
}
function zw(o, f, p, g) {
  ro() || wt(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let {
    navigator: b
  } = y.useContext(Na), {
    matches: S
  } = y.useContext($a), d = S[S.length - 1], w = d ? d.params : {}, R = d ? d.pathname : "/", j = d ? d.pathnameBase : "/", F = d && d.route;
  {
    let K = F && F.path || "";
    Ox(R, !F || K.endsWith("*"), "You rendered descendant <Routes> (or called `useRoutes()`) at " + ('"' + R + '" (under <Route path="' + K + '">) but the ') + `parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

` + ('Please change the parent <Route path="' + K + '"> to <Route ') + ('path="' + (K === "/" ? "*" : K + "/*") + '">.'));
  }
  let x = Ji(), T;
  if (f) {
    var L;
    let K = typeof f == "string" ? ao(f) : f;
    j === "/" || (L = K.pathname) != null && L.startsWith(j) || wt(!1, "When overriding the location using `<Routes location>` or `useRoutes(routes, location)`, the location pathname must begin with the portion of the URL pathname that was " + ('matched by all parent routes. The current pathname base is "' + j + '" ') + ('but pathname "' + K.pathname + '" was given in the `location` prop.')), T = K;
  } else
    T = x;
  let te = T.pathname || "/", pe = te;
  if (j !== "/") {
    let K = j.replace(/^\//, "").split("/");
    pe = "/" + te.replace(/^\//, "").split("/").slice(K.length).join("/");
  }
  let ie = fw(o, {
    pathname: pe
  });
  Ha(F || ie != null, 'No routes matched location "' + T.pathname + T.search + T.hash + '" '), Ha(ie == null || ie[ie.length - 1].route.element !== void 0 || ie[ie.length - 1].route.Component !== void 0 || ie[ie.length - 1].route.lazy !== void 0, 'Matched leaf route at location "' + T.pathname + T.search + T.hash + '" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.');
  let ce = Iw(ie && ie.map((K) => Object.assign({}, K, {
    params: Object.assign({}, w, K.params),
    pathname: Vr([
      j,
      // Re-encode pathnames that were decoded inside matchRoutes
      b.encodeLocation ? b.encodeLocation(K.pathname).pathname : K.pathname
    ]),
    pathnameBase: K.pathnameBase === "/" ? j : Vr([
      j,
      // Re-encode pathnames that were decoded inside matchRoutes
      b.encodeLocation ? b.encodeLocation(K.pathnameBase).pathname : K.pathnameBase
    ])
  })), S, p, g);
  return f && ce ? /* @__PURE__ */ y.createElement(au.Provider, {
    value: {
      location: eu({
        pathname: "/",
        search: "",
        hash: "",
        state: null,
        key: "default"
      }, T),
      navigationType: si.Pop
    }
  }, ce) : ce;
}
function Pw() {
  let o = Kw(), f = Mw(o) ? o.status + " " + o.statusText : o instanceof Error ? o.message : JSON.stringify(o), p = o instanceof Error ? o.stack : null, g = "rgba(200,200,200, 0.5)", b = {
    padding: "0.5rem",
    backgroundColor: g
  }, S = {
    padding: "2px 4px",
    backgroundColor: g
  }, d = null;
  return console.error("Error handled by React Router default ErrorBoundary:", o), d = /* @__PURE__ */ y.createElement(y.Fragment, null, /* @__PURE__ */ y.createElement("p", null, "💿 Hey developer 👋"), /* @__PURE__ */ y.createElement("p", null, "You can provide a way better UX than this when your app throws errors by providing your own ", /* @__PURE__ */ y.createElement("code", {
    style: S
  }, "ErrorBoundary"), " or", " ", /* @__PURE__ */ y.createElement("code", {
    style: S
  }, "errorElement"), " prop on your route.")), /* @__PURE__ */ y.createElement(y.Fragment, null, /* @__PURE__ */ y.createElement("h2", null, "Unexpected Application Error!"), /* @__PURE__ */ y.createElement("h3", {
    style: {
      fontStyle: "italic"
    }
  }, f), p ? /* @__PURE__ */ y.createElement("pre", {
    style: b
  }, p) : null, d);
}
const Hw = /* @__PURE__ */ y.createElement(Pw, null);
class Bw extends y.Component {
  constructor(f) {
    super(f), this.state = {
      location: f.location,
      revalidation: f.revalidation,
      error: f.error
    };
  }
  static getDerivedStateFromError(f) {
    return {
      error: f
    };
  }
  static getDerivedStateFromProps(f, p) {
    return p.location !== f.location || p.revalidation !== "idle" && f.revalidation === "idle" ? {
      error: f.error,
      location: f.location,
      revalidation: f.revalidation
    } : {
      error: f.error !== void 0 ? f.error : p.error,
      location: p.location,
      revalidation: f.revalidation || p.revalidation
    };
  }
  componentDidCatch(f, p) {
    console.error("React Router caught the following error during render", f, p);
  }
  render() {
    return this.state.error !== void 0 ? /* @__PURE__ */ y.createElement($a.Provider, {
      value: this.props.routeContext
    }, /* @__PURE__ */ y.createElement($h.Provider, {
      value: this.state.error,
      children: this.props.component
    })) : this.props.children;
  }
}
function $w(o) {
  let {
    routeContext: f,
    match: p,
    children: g
  } = o, b = y.useContext(nu);
  return b && b.static && b.staticContext && (p.route.errorElement || p.route.ErrorBoundary) && (b.staticContext._deepestRenderedBoundaryId = p.route.id), /* @__PURE__ */ y.createElement($a.Provider, {
    value: f
  }, g);
}
function Iw(o, f, p, g) {
  var b;
  if (f === void 0 && (f = []), p === void 0 && (p = null), g === void 0 && (g = null), o == null) {
    var S;
    if (!p)
      return null;
    if (p.errors)
      o = p.matches;
    else if ((S = g) != null && S.v7_partialHydration && f.length === 0 && !p.initialized && p.matches.length > 0)
      o = p.matches;
    else
      return null;
  }
  let d = o, w = (b = p) == null ? void 0 : b.errors;
  if (w != null) {
    let F = d.findIndex((x) => x.route.id && (w == null ? void 0 : w[x.route.id]) !== void 0);
    F >= 0 || wt(!1, "Could not find a matching route for errors on route IDs: " + Object.keys(w).join(",")), d = d.slice(0, Math.min(d.length, F + 1));
  }
  let R = !1, j = -1;
  if (p && g && g.v7_partialHydration)
    for (let F = 0; F < d.length; F++) {
      let x = d[F];
      if ((x.route.HydrateFallback || x.route.hydrateFallbackElement) && (j = F), x.route.id) {
        let {
          loaderData: T,
          errors: L
        } = p, te = x.route.loader && T[x.route.id] === void 0 && (!L || L[x.route.id] === void 0);
        if (x.route.lazy || te) {
          R = !0, j >= 0 ? d = d.slice(0, j + 1) : d = [d[0]];
          break;
        }
      }
    }
  return d.reduceRight((F, x, T) => {
    let L, te = !1, pe = null, ie = null;
    p && (L = w && x.route.id ? w[x.route.id] : void 0, pe = x.route.errorElement || Hw, R && (j < 0 && T === 0 ? (Ox("route-fallback", !1, "No `HydrateFallback` element provided to render during initial hydration"), te = !0, ie = null) : j === T && (te = !0, ie = x.route.hydrateFallbackElement || null)));
    let ce = f.concat(d.slice(0, T + 1)), K = () => {
      let P;
      return L ? P = pe : te ? P = ie : x.route.Component ? P = /* @__PURE__ */ y.createElement(x.route.Component, null) : x.route.element ? P = x.route.element : P = F, /* @__PURE__ */ y.createElement($w, {
        match: x,
        routeContext: {
          outlet: F,
          matches: ce,
          isDataRoute: p != null
        },
        children: P
      });
    };
    return p && (x.route.ErrorBoundary || x.route.errorElement || T === 0) ? /* @__PURE__ */ y.createElement(Bw, {
      location: p.location,
      revalidation: p.revalidation,
      component: pe,
      error: L,
      children: K(),
      routeContext: {
        outlet: null,
        matches: ce,
        isDataRoute: !0
      }
    }) : K();
  }, null);
}
var _x = /* @__PURE__ */ function(o) {
  return o.UseBlocker = "useBlocker", o.UseRevalidator = "useRevalidator", o.UseNavigateStable = "useNavigate", o;
}(_x || {}), tu = /* @__PURE__ */ function(o) {
  return o.UseBlocker = "useBlocker", o.UseLoaderData = "useLoaderData", o.UseActionData = "useActionData", o.UseRouteError = "useRouteError", o.UseNavigation = "useNavigation", o.UseRouteLoaderData = "useRouteLoaderData", o.UseMatches = "useMatches", o.UseRevalidator = "useRevalidator", o.UseNavigateStable = "useNavigate", o.UseRouteId = "useRouteId", o;
}(tu || {});
function Yh(o) {
  return o + " must be used within a data router.  See https://reactrouter.com/v6/routers/picking-a-router.";
}
function Yw(o) {
  let f = y.useContext(nu);
  return f || wt(!1, Yh(o)), f;
}
function qw(o) {
  let f = y.useContext(Bh);
  return f || wt(!1, Yh(o)), f;
}
function Gw(o) {
  let f = y.useContext($a);
  return f || wt(!1, Yh(o)), f;
}
function qh(o) {
  let f = Gw(o), p = f.matches[f.matches.length - 1];
  return p.route.id || wt(!1, o + ' can only be used on routes that contain a unique "id"'), p.route.id;
}
function Ww() {
  return qh(tu.UseRouteId);
}
function Kw() {
  var o;
  let f = y.useContext($h), p = qw(tu.UseRouteError), g = qh(tu.UseRouteError);
  return f !== void 0 ? f : (o = p.errors) == null ? void 0 : o[g];
}
function Qw() {
  let {
    router: o
  } = Yw(_x.UseNavigateStable), f = qh(tu.UseNavigateStable), p = y.useRef(!1);
  return wx(() => {
    p.current = !0;
  }), y.useCallback(function(b, S) {
    S === void 0 && (S = {}), Ha(p.current, Tx), p.current && (typeof b == "number" ? o.navigate(b) : o.navigate(b, eu({
      fromRouteId: f
    }, S)));
  }, [o, f]);
}
const ux = {};
function Ox(o, f, p) {
  !f && !ux[o] && (ux[o] = !0, Ha(!1, p));
}
const cx = {};
function Xw(o, f) {
  cx[f] || (cx[f] = !0, console.warn(f));
}
const dx = (o, f, p) => Xw(o, "⚠️ React Router Future Flag Warning: " + f + ". " + ("You can use the `" + o + "` future flag to opt-in early. ") + ("For more information, see " + p + "."));
function Jw(o, f) {
  (o == null ? void 0 : o.v7_startTransition) === void 0 && dx("v7_startTransition", "React Router will begin wrapping state updates in `React.startTransition` in v7", "https://reactrouter.com/v6/upgrading/future#v7_starttransition"), (o == null ? void 0 : o.v7_relativeSplatPath) === void 0 && dx("v7_relativeSplatPath", "Relative route resolution within Splat routes is changing in v7", "https://reactrouter.com/v6/upgrading/future#v7_relativesplatpath");
}
function Zw(o) {
  let {
    to: f,
    replace: p,
    state: g,
    relative: b
  } = o;
  ro() || wt(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of
    // the router loaded. We can help them understand how to avoid that.
    "<Navigate> may be used only in the context of a <Router> component."
  );
  let {
    future: S,
    static: d
  } = y.useContext(Na);
  Ha(!d, "<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.");
  let {
    matches: w
  } = y.useContext($a), {
    pathname: R
  } = Ji(), j = Ih(), F = Hh(f, Ph(w, S.v7_relativeSplatPath), R, b === "path"), x = JSON.stringify(F);
  return y.useEffect(() => j(JSON.parse(x), {
    replace: p,
    state: g,
    relative: b
  }), [j, x, b, p, g]), null;
}
function lr(o) {
  wt(!1, "A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.");
}
function e_(o) {
  let {
    basename: f = "/",
    children: p = null,
    location: g,
    navigationType: b = si.Pop,
    navigator: S,
    static: d = !1,
    future: w
  } = o;
  ro() && wt(!1, "You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");
  let R = f.replace(/^\/*/, "/"), j = y.useMemo(() => ({
    basename: R,
    navigator: S,
    static: d,
    future: eu({
      v7_relativeSplatPath: !1
    }, w)
  }), [R, w, S, d]);
  typeof g == "string" && (g = ao(g));
  let {
    pathname: F = "/",
    search: x = "",
    hash: T = "",
    state: L = null,
    key: te = "default"
  } = g, pe = y.useMemo(() => {
    let ie = ci(F, R);
    return ie == null ? null : {
      location: {
        pathname: ie,
        search: x,
        hash: T,
        state: L,
        key: te
      },
      navigationType: b
    };
  }, [R, F, x, T, L, te, b]);
  return Ha(pe != null, '<Router basename="' + R + '"> is not able to match the URL ' + ('"' + F + x + T + '" because it does not start with the ') + "basename, so the <Router> won't render anything."), pe == null ? null : /* @__PURE__ */ y.createElement(Na.Provider, {
    value: j
  }, /* @__PURE__ */ y.createElement(au.Provider, {
    children: p,
    value: pe
  }));
}
function t_(o) {
  let {
    children: f,
    location: p
  } = o;
  return Fw(Uh(f), p);
}
new Promise(() => {
});
function Uh(o, f) {
  f === void 0 && (f = []);
  let p = [];
  return y.Children.forEach(o, (g, b) => {
    if (!/* @__PURE__ */ y.isValidElement(g))
      return;
    let S = [...f, b];
    if (g.type === y.Fragment) {
      p.push.apply(p, Uh(g.props.children, S));
      return;
    }
    g.type !== lr && wt(!1, "[" + (typeof g.type == "string" ? g.type : g.type.name) + "] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>"), !g.props.index || !g.props.children || wt(!1, "An index route cannot have child routes.");
    let d = {
      id: g.props.id || S.join("-"),
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
    g.props.children && (d.children = Uh(g.props.children, S)), p.push(d);
  }), p;
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
function no() {
  return no = Object.assign ? Object.assign.bind() : function(o) {
    for (var f = 1; f < arguments.length; f++) {
      var p = arguments[f];
      for (var g in p)
        Object.prototype.hasOwnProperty.call(p, g) && (o[g] = p[g]);
    }
    return o;
  }, no.apply(this, arguments);
}
function Gh(o, f) {
  if (o == null) return {};
  var p = {}, g = Object.keys(o), b, S;
  for (S = 0; S < g.length; S++)
    b = g[S], !(f.indexOf(b) >= 0) && (p[b] = o[b]);
  return p;
}
const vd = "get", gd = "application/x-www-form-urlencoded";
function Ed(o) {
  return o != null && typeof o.tagName == "string";
}
function n_(o) {
  return Ed(o) && o.tagName.toLowerCase() === "button";
}
function a_(o) {
  return Ed(o) && o.tagName.toLowerCase() === "form";
}
function r_(o) {
  return Ed(o) && o.tagName.toLowerCase() === "input";
}
function i_(o) {
  return !!(o.metaKey || o.altKey || o.ctrlKey || o.shiftKey);
}
function l_(o, f) {
  return o.button === 0 && // Ignore everything but left clicks
  (!f || f === "_self") && // Let browser handle "target=_blank" etc.
  !i_(o);
}
let hd = null;
function o_() {
  if (hd === null)
    try {
      new FormData(
        document.createElement("form"),
        // @ts-expect-error if FormData supports the submitter parameter, this will throw
        0
      ), hd = !1;
    } catch {
      hd = !0;
    }
  return hd;
}
const s_ = /* @__PURE__ */ new Set(["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"]);
function Vh(o) {
  return o != null && !s_.has(o) ? (Ha(!1, '"' + o + '" is not a valid `encType` for `<Form>`/`<fetcher.Form>` ' + ('and will default to "' + gd + '"')), null) : o;
}
function u_(o, f) {
  let p, g, b, S, d;
  if (a_(o)) {
    let w = o.getAttribute("action");
    g = w ? ci(w, f) : null, p = o.getAttribute("method") || vd, b = Vh(o.getAttribute("enctype")) || gd, S = new FormData(o);
  } else if (n_(o) || r_(o) && (o.type === "submit" || o.type === "image")) {
    let w = o.form;
    if (w == null)
      throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
    let R = o.getAttribute("formaction") || w.getAttribute("action");
    if (g = R ? ci(R, f) : null, p = o.getAttribute("formmethod") || w.getAttribute("method") || vd, b = Vh(o.getAttribute("formenctype")) || Vh(w.getAttribute("enctype")) || gd, S = new FormData(w, o), !o_()) {
      let {
        name: j,
        type: F,
        value: x
      } = o;
      if (F === "image") {
        let T = j ? j + "." : "";
        S.append(T + "x", "0"), S.append(T + "y", "0");
      } else j && S.append(j, x);
    }
  } else {
    if (Ed(o))
      throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');
    p = vd, g = null, b = gd, d = o;
  }
  return S && b === "text/plain" && (d = S, S = void 0), {
    action: g,
    method: p.toLowerCase(),
    encType: b,
    formData: S,
    body: d
  };
}
const c_ = ["onClick", "relative", "reloadDocument", "replace", "state", "target", "to", "preventScrollReset", "viewTransition"], d_ = ["aria-current", "caseSensitive", "className", "end", "style", "to", "viewTransition", "children"], f_ = ["fetcherKey", "navigate", "reloadDocument", "replace", "state", "method", "action", "onSubmit", "relative", "preventScrollReset", "viewTransition"], m_ = "6";
try {
  window.__reactRouterVersion = m_;
} catch {
}
const Mx = /* @__PURE__ */ y.createContext({
  isTransitioning: !1
});
Mx.displayName = "ViewTransition";
const p_ = /* @__PURE__ */ y.createContext(/* @__PURE__ */ new Map());
p_.displayName = "Fetchers";
const h_ = "startTransition", fx = lw[h_];
function v_(o) {
  let {
    basename: f,
    children: p,
    future: g,
    window: b
  } = o, S = y.useRef();
  S.current == null && (S.current = uw({
    window: b,
    v5Compat: !0
  }));
  let d = S.current, [w, R] = y.useState({
    action: d.action,
    location: d.location
  }), {
    v7_startTransition: j
  } = g || {}, F = y.useCallback((x) => {
    j && fx ? fx(() => R(x)) : R(x);
  }, [R, j]);
  return y.useLayoutEffect(() => d.listen(F), [d, F]), y.useEffect(() => Jw(g), [g]), /* @__PURE__ */ y.createElement(e_, {
    basename: f,
    children: p,
    location: w.location,
    navigationType: w.action,
    navigator: d,
    future: g
  });
}
const g_ = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", b_ = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, Xi = /* @__PURE__ */ y.forwardRef(function(f, p) {
  let {
    onClick: g,
    relative: b,
    reloadDocument: S,
    replace: d,
    state: w,
    target: R,
    to: j,
    preventScrollReset: F,
    viewTransition: x
  } = f, T = Gh(f, c_), {
    basename: L
  } = y.useContext(Na), te, pe = !1;
  if (typeof j == "string" && b_.test(j) && (te = j, g_))
    try {
      let P = new URL(window.location.href), I = j.startsWith("//") ? new URL(P.protocol + j) : new URL(j), ee = ci(I.pathname, L);
      I.origin === P.origin && ee != null ? j = ee + I.search + I.hash : pe = !0;
    } catch {
      Ha(!1, '<Link to="' + j + '"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.');
    }
  let ie = Lw(j, {
    relative: b
  }), ce = E_(j, {
    replace: d,
    state: w,
    target: R,
    preventScrollReset: F,
    relative: b,
    viewTransition: x
  });
  function K(P) {
    g && g(P), P.defaultPrevented || ce(P);
  }
  return (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    /* @__PURE__ */ y.createElement("a", no({}, T, {
      href: te || ie,
      onClick: pe || S ? g : K,
      ref: p,
      target: R
    }))
  );
});
Xi.displayName = "Link";
const y_ = /* @__PURE__ */ y.forwardRef(function(f, p) {
  let {
    "aria-current": g = "page",
    caseSensitive: b = !1,
    className: S = "",
    end: d = !1,
    style: w,
    to: R,
    viewTransition: j,
    children: F
  } = f, x = Gh(f, d_), T = ru(R, {
    relative: x.relative
  }), L = Ji(), te = y.useContext(Bh), {
    navigator: pe,
    basename: ie
  } = y.useContext(Na), ce = te != null && // Conditional usage is OK here because the usage of a data router is static
  // eslint-disable-next-line react-hooks/rules-of-hooks
  T_(T) && j === !0, K = pe.encodeLocation ? pe.encodeLocation(T).pathname : T.pathname, P = L.pathname, I = te && te.navigation && te.navigation.location ? te.navigation.location.pathname : null;
  b || (P = P.toLowerCase(), I = I ? I.toLowerCase() : null, K = K.toLowerCase()), I && ie && (I = ci(I, ie) || I);
  const ee = K !== "/" && K.endsWith("/") ? K.length - 1 : K.length;
  let z = P === K || !d && P.startsWith(K) && P.charAt(ee) === "/", U = I != null && (I === K || !d && I.startsWith(K) && I.charAt(K.length) === "/"), le = {
    isActive: z,
    isPending: U,
    isTransitioning: ce
  }, X = z ? g : void 0, W;
  typeof S == "function" ? W = S(le) : W = [S, z ? "active" : null, U ? "pending" : null, ce ? "transitioning" : null].filter(Boolean).join(" ");
  let oe = typeof w == "function" ? w(le) : w;
  return /* @__PURE__ */ y.createElement(Xi, no({}, x, {
    "aria-current": X,
    className: W,
    ref: p,
    style: oe,
    to: R,
    viewTransition: j
  }), typeof F == "function" ? F(le) : F);
});
y_.displayName = "NavLink";
const N_ = /* @__PURE__ */ y.forwardRef((o, f) => {
  let {
    fetcherKey: p,
    navigate: g,
    reloadDocument: b,
    replace: S,
    state: d,
    method: w = vd,
    action: R,
    onSubmit: j,
    relative: F,
    preventScrollReset: x,
    viewTransition: T
  } = o, L = Gh(o, f_), te = C_(), pe = j_(R, {
    relative: F
  }), ie = w.toLowerCase() === "get" ? "get" : "post", ce = (K) => {
    if (j && j(K), K.defaultPrevented) return;
    K.preventDefault();
    let P = K.nativeEvent.submitter, I = (P == null ? void 0 : P.getAttribute("formmethod")) || w;
    te(P || K.currentTarget, {
      fetcherKey: p,
      method: I,
      navigate: g,
      replace: S,
      state: d,
      relative: F,
      preventScrollReset: x,
      viewTransition: T
    });
  };
  return /* @__PURE__ */ y.createElement("form", no({
    ref: f,
    method: ie,
    action: pe,
    onSubmit: b ? j : ce
  }, L));
});
N_.displayName = "Form";
var yd;
(function(o) {
  o.UseScrollRestoration = "useScrollRestoration", o.UseSubmit = "useSubmit", o.UseSubmitFetcher = "useSubmitFetcher", o.UseFetcher = "useFetcher", o.useViewTransitionState = "useViewTransitionState";
})(yd || (yd = {}));
var mx;
(function(o) {
  o.UseFetcher = "useFetcher", o.UseFetchers = "useFetchers", o.UseScrollRestoration = "useScrollRestoration";
})(mx || (mx = {}));
function x_(o) {
  return o + " must be used within a data router.  See https://reactrouter.com/v6/routers/picking-a-router.";
}
function Vx(o) {
  let f = y.useContext(nu);
  return f || wt(!1, x_(o)), f;
}
function E_(o, f) {
  let {
    target: p,
    replace: g,
    state: b,
    preventScrollReset: S,
    relative: d,
    viewTransition: w
  } = f === void 0 ? {} : f, R = Ih(), j = Ji(), F = ru(o, {
    relative: d
  });
  return y.useCallback((x) => {
    if (l_(x, p)) {
      x.preventDefault();
      let T = g !== void 0 ? g : Zs(j) === Zs(F);
      R(o, {
        replace: T,
        state: b,
        preventScrollReset: S,
        relative: d,
        viewTransition: w
      });
    }
  }, [j, R, F, g, b, p, o, S, d, w]);
}
function S_() {
  if (typeof document > "u")
    throw new Error("You are calling submit during the server render. Try calling submit within a `useEffect` or callback instead.");
}
let R_ = 0, D_ = () => "__" + String(++R_) + "__";
function C_() {
  let {
    router: o
  } = Vx(yd.UseSubmit), {
    basename: f
  } = y.useContext(Na), p = Ww();
  return y.useCallback(function(g, b) {
    b === void 0 && (b = {}), S_();
    let {
      action: S,
      method: d,
      encType: w,
      formData: R,
      body: j
    } = u_(g, f);
    if (b.navigate === !1) {
      let F = b.fetcherKey || D_();
      o.fetch(F, p, b.action || S, {
        preventScrollReset: b.preventScrollReset,
        formData: R,
        body: j,
        formMethod: b.method || d,
        formEncType: b.encType || w,
        flushSync: b.flushSync
      });
    } else
      o.navigate(b.action || S, {
        preventScrollReset: b.preventScrollReset,
        formData: R,
        body: j,
        formMethod: b.method || d,
        formEncType: b.encType || w,
        replace: b.replace,
        state: b.state,
        fromRouteId: p,
        flushSync: b.flushSync,
        viewTransition: b.viewTransition
      });
  }, [o, f, p]);
}
function j_(o, f) {
  let {
    relative: p
  } = f === void 0 ? {} : f, {
    basename: g
  } = y.useContext(Na), b = y.useContext($a);
  b || wt(!1, "useFormAction must be used inside a RouteContext");
  let [S] = b.matches.slice(-1), d = no({}, ru(o || ".", {
    relative: p
  })), w = Ji();
  if (o == null) {
    d.search = w.search;
    let R = new URLSearchParams(d.search), j = R.getAll("index");
    if (j.some((x) => x === "")) {
      R.delete("index"), j.filter((T) => T).forEach((T) => R.append("index", T));
      let x = R.toString();
      d.search = x ? "?" + x : "";
    }
  }
  return (!o || o === ".") && S.route.index && (d.search = d.search ? d.search.replace(/^\?/, "?index&") : "?index"), g !== "/" && (d.pathname = d.pathname === "/" ? g : Vr([g, d.pathname])), Zs(d);
}
function T_(o, f) {
  f === void 0 && (f = {});
  let p = y.useContext(Mx);
  p == null && wt(!1, "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");
  let {
    basename: g
  } = Vx(yd.useViewTransitionState), b = ru(o, {
    relative: f.relative
  });
  if (!p.isTransitioning)
    return !1;
  let S = ci(p.currentLocation.pathname, g) || p.currentLocation.pathname, d = ci(p.nextLocation.pathname, g) || p.nextLocation.pathname;
  return kh(b.pathname, d) != null || kh(b.pathname, S) != null;
}
function w_() {
  const [o, f] = y.useState(null), [p, g] = y.useState(""), [b, S] = y.useState(""), [d, w] = y.useState(!0), [R, j] = y.useState(""), [F, x] = y.useState(""), [T, L] = y.useState(!1), [te, pe] = y.useState(!1);
  y.useEffect(() => {
    const P = typeof window < "u" ? window : void 0, I = P && P.__FIREBASE__ ? P.__FIREBASE__ : null;
    f({
      apiKey: I && I.apiKey || void 0 || "AIzaSyD-zBSQk_OIyIDzRG0wBNlQCloBqu25ijo",
      authDomain: I && I.authDomain || void 0 || "fresh-basket-a8933.firebaseapp.com",
      projectId: I && I.projectId || void 0 || "fresh-basket-a8933",
      appId: I && I.appId || void 0 || "1:163656027399:web:7bbd739740ec13453489a2",
      messagingSenderId: I && I.messagingSenderId || void 0 || "163656027399",
      measurementId: I && I.measurementId || void 0 || "G-7M8H5YJF18"
    });
  }, []);
  function ie(P) {
    const I = (P == null ? void 0 : P.code) || "", ee = (P == null ? void 0 : P.message) || "";
    return I.includes("invalid-email") ? "Please enter a valid email address." : I.includes("user-not-found") ? "No account found with that email." : I.includes("wrong-password") || I.includes("invalid-credential") || ee.includes("INVALID_LOGIN_CREDENTIALS") ? "Incorrect email or password." : I.includes("too-many-requests") ? "Too many attempts. Please wait and try again." : I.includes("network-request-failed") ? "Network error. Check your connection and try again." : ee || "Something went wrong.";
  }
  async function ce(P) {
    P.preventDefault(), j(""), x(""), L(!0);
    try {
      if (!(o != null && o.apiKey)) throw new Error("Firebase not configured");
      const I = (await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js")).initializeApp(o), ee = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js"), { getAuth: z, setPersistence: U, browserLocalPersistence: le, browserSessionPersistence: X, signInWithEmailAndPassword: W } = ee, oe = z();
      await U(oe, d ? le : X);
      const k = await (await W(oe, p.trim(), b)).user.getIdToken();
      if (!(await fetch("/auth/session", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify({ idToken: k }) })).ok) throw new Error("Session creation failed");
      x("Signed in successfully."), setTimeout(() => window.location.href = "/dashboard", 600);
    } catch (I) {
      j(ie(I));
    } finally {
      L(!1);
    }
  }
  async function K() {
    j(""), x("");
    try {
      if (!(o != null && o.apiKey)) throw new Error("Firebase not configured");
      const P = (await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js")).initializeApp(o), { getAuth: I, sendPasswordResetEmail: ee } = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js"), z = I();
      await ee(z, p.trim()), x("If an account exists for that email, a reset link has been sent.");
    } catch (P) {
      j(ie(P));
    }
  }
  return /* @__PURE__ */ s.jsxDEV("section", { className: "auth-layout", children: [
    /* @__PURE__ */ s.jsxDEV("div", { className: "auth-hero", children: [
      /* @__PURE__ */ s.jsxDEV("img", { className: "hero-logo", src: "https://cdn.builder.io/api/v1/image/assets%2Fa5647e4ccf094d4d939a079b9f892c1c%2F240094ac7d6b4725b685503d97c9d9a3?format=webp&width=96", alt: "FreshBasket logo" }, void 0, !1, {
        fileName: "/app/code/client/pages/Login.jsx",
        lineNumber: 73,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ s.jsxDEV("h2", { className: "hero-heading", children: "Welcome back" }, void 0, !1, {
        fileName: "/app/code/client/pages/Login.jsx",
        lineNumber: 74,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ s.jsxDEV("p", { className: "hero-sub", children: "Sign in to manage orders, riders and deliveries." }, void 0, !1, {
        fileName: "/app/code/client/pages/Login.jsx",
        lineNumber: 75,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ s.jsxDEV("ul", { className: "hero-points", children: [
        /* @__PURE__ */ s.jsxDEV("li", { children: "Secure account access" }, void 0, !1, {
          fileName: "/app/code/client/pages/Login.jsx",
          lineNumber: 76,
          columnNumber: 37
        }, this),
        /* @__PURE__ */ s.jsxDEV("li", { children: "Real-time dashboards" }, void 0, !1, {
          fileName: "/app/code/client/pages/Login.jsx",
          lineNumber: 76,
          columnNumber: 67
        }, this),
        /* @__PURE__ */ s.jsxDEV("li", { children: "Faster operations" }, void 0, !1, {
          fileName: "/app/code/client/pages/Login.jsx",
          lineNumber: 76,
          columnNumber: 96
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Login.jsx",
        lineNumber: 76,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Login.jsx",
      lineNumber: 72,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ s.jsxDEV("div", { className: "auth-panel auth-panel-card", children: [
      /* @__PURE__ */ s.jsxDEV("h2", { className: "auth-title", children: "Sign in to FreshBasket" }, void 0, !1, {
        fileName: "/app/code/client/pages/Login.jsx",
        lineNumber: 80,
        columnNumber: 9
      }, this),
      R && /* @__PURE__ */ s.jsxDEV("div", { className: "auth-error", children: R }, void 0, !1, {
        fileName: "/app/code/client/pages/Login.jsx",
        lineNumber: 81,
        columnNumber: 19
      }, this),
      F && /* @__PURE__ */ s.jsxDEV("div", { className: "auth-success", children: F }, void 0, !1, {
        fileName: "/app/code/client/pages/Login.jsx",
        lineNumber: 82,
        columnNumber: 16
      }, this),
      /* @__PURE__ */ s.jsxDEV("form", { className: "auth-form", onSubmit: ce, children: [
        /* @__PURE__ */ s.jsxDEV("label", { className: "auth-label", children: [
          "Email",
          /* @__PURE__ */ s.jsxDEV("input", { className: "auth-input", type: "email", value: p, onChange: (P) => g(P.target.value), required: !0 }, void 0, !1, {
            fileName: "/app/code/client/pages/Login.jsx",
            lineNumber: 85,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Login.jsx",
          lineNumber: 84,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ s.jsxDEV("label", { className: "auth-label", children: [
          "Password",
          /* @__PURE__ */ s.jsxDEV("span", { className: "password-field", children: [
            /* @__PURE__ */ s.jsxDEV("input", { className: "auth-input", type: te ? "text" : "password", value: b, onChange: (P) => S(P.target.value), required: !0 }, void 0, !1, {
              fileName: "/app/code/client/pages/Login.jsx",
              lineNumber: 89,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ s.jsxDEV("button", { type: "button", id: "togglePwd", className: "toggle-password", "aria-label": te ? "Hide password" : "Show password", onClick: () => pe((P) => !P), children: "👁️" }, void 0, !1, {
              fileName: "/app/code/client/pages/Login.jsx",
              lineNumber: 90,
              columnNumber: 15
            }, this)
          ] }, void 0, !0, {
            fileName: "/app/code/client/pages/Login.jsx",
            lineNumber: 88,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Login.jsx",
          lineNumber: 87,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ s.jsxDEV("div", { className: "auth-actions", children: [
          /* @__PURE__ */ s.jsxDEV("label", { className: "remember", children: [
            /* @__PURE__ */ s.jsxDEV("input", { type: "checkbox", checked: d, onChange: (P) => w(P.target.checked) }, void 0, !1, {
              fileName: "/app/code/client/pages/Login.jsx",
              lineNumber: 94,
              columnNumber: 41
            }, this),
            " Remember me"
          ] }, void 0, !0, {
            fileName: "/app/code/client/pages/Login.jsx",
            lineNumber: 94,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ s.jsxDEV("button", { className: "link-button", type: "button", onClick: K, children: "Forgot password?" }, void 0, !1, {
            fileName: "/app/code/client/pages/Login.jsx",
            lineNumber: 95,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Login.jsx",
          lineNumber: 93,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ s.jsxDEV("button", { className: "auth-button auth-button-wide", disabled: T, type: "submit", children: T ? "Signing in…" : "Sign in" }, void 0, !1, {
          fileName: "/app/code/client/pages/Login.jsx",
          lineNumber: 97,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Login.jsx",
        lineNumber: 83,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ s.jsxDEV("p", { className: "auth-alt", children: [
        "No account? ",
        /* @__PURE__ */ s.jsxDEV("a", { href: "/auth/register", children: "Register" }, void 0, !1, {
          fileName: "/app/code/client/pages/Login.jsx",
          lineNumber: 99,
          columnNumber: 45
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Login.jsx",
        lineNumber: 99,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Login.jsx",
      lineNumber: 79,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "/app/code/client/pages/Login.jsx",
    lineNumber: 71,
    columnNumber: 5
  }, this);
}
function __() {
  const [o, f] = y.useState(null), [p, g] = y.useState(""), [b, S] = y.useState(""), [d, w] = y.useState(""), [R, j] = y.useState(""), [F, x] = y.useState(""), [T, L] = y.useState(""), [te, pe] = y.useState(""), [ie, ce] = y.useState(!1), [K, P] = y.useState(!1), [I, ee] = y.useState(!1), [z, U] = y.useState(!1);
  y.useEffect(() => {
    const W = typeof window < "u" ? window : void 0, oe = W && W.__FIREBASE__ ? W.__FIREBASE__ : null;
    f({
      apiKey: oe && oe.apiKey || void 0 || "AIzaSyD-zBSQk_OIyIDzRG0wBNlQCloBqu25ijo",
      authDomain: oe && oe.authDomain || void 0 || "fresh-basket-a8933.firebaseapp.com",
      projectId: oe && oe.projectId || void 0 || "fresh-basket-a8933",
      appId: oe && oe.appId || void 0 || "1:163656027399:web:7bbd739740ec13453489a2",
      messagingSenderId: oe && oe.messagingSenderId || void 0 || "163656027399",
      measurementId: oe && oe.measurementId || void 0 || "G-7M8H5YJF18"
    });
  }, []);
  function le(W) {
    const oe = (W == null ? void 0 : W.code) || "";
    return oe.includes("email-already-in-use") ? "An account with this email already exists." : oe.includes("weak-password") ? "Password should be at least 6 characters." : oe.includes("invalid-email") ? "Please enter a valid email address." : oe.includes("network-request-failed") ? "Network error. Check your connection and try again." : (W == null ? void 0 : W.message) || "Something went wrong.";
  }
  async function X(W) {
    W.preventDefault(), L(""), pe(""), ce(!0);
    try {
      const oe = String(p).trim(), Q = String(b).trim(), k = Q.replace(/\D+/g, ""), ue = { fn: !oe, cn: !Q };
      if (ee(ue.fn), U(ue.cn || k.length < 7), ue.fn || ue.cn) {
        L("Please fill in required fields");
        return;
      }
      if (k.length < 7) {
        L("Please enter a valid mobile number");
        return;
      }
      if (R !== F) throw new Error("Passwords do not match");
      if (!(o != null && o.apiKey)) throw new Error("Firebase not configured");
      const de = (await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js")).initializeApp(o), { getAuth: Y, createUserWithEmailAndPassword: q } = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js"), re = Y(), Pe = await (await q(re, d.trim(), R)).user.getIdToken();
      if (!(await fetch("/auth/session", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify({ idToken: Pe, profile: { fullName: oe, contactNumber: Q } }) })).ok) throw new Error("Session creation failed");
      pe("Account created successfully. Redirecting..."), setTimeout(() => window.location.href = "/riders", 700);
    } catch (oe) {
      L(le(oe));
    } finally {
      ce(!1);
    }
  }
  return /* @__PURE__ */ s.jsxDEV("section", { className: "auth-panel", style: { maxWidth: 520, margin: "40px auto" }, children: [
    /* @__PURE__ */ s.jsxDEV("h2", { className: "auth-title", children: "Register" }, void 0, !1, {
      fileName: "/app/code/client/pages/Register.jsx",
      lineNumber: 67,
      columnNumber: 7
    }, this),
    T && /* @__PURE__ */ s.jsxDEV("div", { className: "auth-error", children: T }, void 0, !1, {
      fileName: "/app/code/client/pages/Register.jsx",
      lineNumber: 68,
      columnNumber: 17
    }, this),
    te && /* @__PURE__ */ s.jsxDEV("div", { className: "auth-success", children: te }, void 0, !1, {
      fileName: "/app/code/client/pages/Register.jsx",
      lineNumber: 69,
      columnNumber: 14
    }, this),
    /* @__PURE__ */ s.jsxDEV("form", { className: "auth-form", onSubmit: X, children: [
      /* @__PURE__ */ s.jsxDEV("label", { className: "auth-label", children: [
        "Full name",
        /* @__PURE__ */ s.jsxDEV("input", { className: "auth-input" + (I && !String(p).trim() ? " input-error" : ""), value: p, onChange: (W) => {
          g(W.target.value), I && ee(!String(W.target.value).trim());
        }, onBlur: () => ee(!String(p).trim()), required: !0 }, void 0, !1, {
          fileName: "/app/code/client/pages/Register.jsx",
          lineNumber: 72,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Register.jsx",
        lineNumber: 71,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ s.jsxDEV("label", { className: "auth-label", children: [
        "Contact number",
        /* @__PURE__ */ s.jsxDEV("input", { className: "auth-input" + (z ? " input-error" : ""), type: "tel", inputMode: "tel", pattern: "[0-9+()\\-\\s]{7,}", value: b, onChange: (W) => {
          if (S(W.target.value), z) {
            const oe = String(W.target.value).trim().replace(/\D+/g, "");
            U(!(oe.length >= 7));
          }
        }, onBlur: () => {
          const W = String(b).trim().replace(/\D+/g, "");
          U(!(W.length >= 7));
        }, placeholder: "e.g. +1 555 123 4567", required: !0 }, void 0, !1, {
          fileName: "/app/code/client/pages/Register.jsx",
          lineNumber: 75,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Register.jsx",
        lineNumber: 74,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ s.jsxDEV("label", { className: "auth-label", children: [
        "Email",
        /* @__PURE__ */ s.jsxDEV("input", { className: "auth-input", type: "email", value: d, onChange: (W) => w(W.target.value), required: !0 }, void 0, !1, {
          fileName: "/app/code/client/pages/Register.jsx",
          lineNumber: 78,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Register.jsx",
        lineNumber: 77,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ s.jsxDEV("label", { className: "auth-label", children: [
        "Password",
        /* @__PURE__ */ s.jsxDEV("span", { className: "password-field", children: [
          /* @__PURE__ */ s.jsxDEV("input", { className: "auth-input", type: K ? "text" : "password", value: R, onChange: (W) => j(W.target.value), minLength: 6, required: !0 }, void 0, !1, {
            fileName: "/app/code/client/pages/Register.jsx",
            lineNumber: 82,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ s.jsxDEV("button", { type: "button", className: "toggle-password", "aria-label": K ? "Hide password" : "Show password", onClick: () => P((W) => !W), children: "👁️" }, void 0, !1, {
            fileName: "/app/code/client/pages/Register.jsx",
            lineNumber: 83,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Register.jsx",
          lineNumber: 81,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Register.jsx",
        lineNumber: 80,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ s.jsxDEV("label", { className: "auth-label", children: [
        "Confirm Password",
        /* @__PURE__ */ s.jsxDEV("input", { className: "auth-input", type: "password", value: F, onChange: (W) => x(W.target.value), minLength: 6, required: !0 }, void 0, !1, {
          fileName: "/app/code/client/pages/Register.jsx",
          lineNumber: 87,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Register.jsx",
        lineNumber: 86,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ s.jsxDEV("button", { className: "auth-button", disabled: ie, type: "submit", children: ie ? "Creating account…" : "Create account" }, void 0, !1, {
        fileName: "/app/code/client/pages/Register.jsx",
        lineNumber: 89,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Register.jsx",
      lineNumber: 70,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ s.jsxDEV("p", { className: "auth-alt", children: [
      "Have an account? ",
      /* @__PURE__ */ s.jsxDEV("a", { href: "/auth/login", children: "Login" }, void 0, !1, {
        fileName: "/app/code/client/pages/Register.jsx",
        lineNumber: 91,
        columnNumber: 48
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Register.jsx",
      lineNumber: 91,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "/app/code/client/pages/Register.jsx",
    lineNumber: 66,
    columnNumber: 5
  }, this);
}
function O_() {
  const [o, f] = y.useState([]);
  return y.useEffect(() => {
    const p = Array.isArray(window.__pendingToasts) ? window.__pendingToasts.slice() : [];
    if (p.length) {
      const g = p.map((b) => ({
        id: String(Date.now()) + Math.random().toString(36).slice(2, 8),
        message: String(b.message || ""),
        type: b.opts && b.opts.type || "success",
        ttl: b.opts && typeof b.opts.ttl == "number" ? b.opts.ttl : 4e3
      }));
      f((b) => [...g, ...b]);
      try {
        delete window.__pendingToasts;
      } catch {
        window.__pendingToasts = [];
      }
    }
    return window.showToast = function(g, b = {}) {
      const S = String(Date.now()) + Math.random().toString(36).slice(2, 8), d = { id: S, message: String(g || ""), type: b.type || "success", ttl: typeof b.ttl == "number" ? b.ttl : 4e3 };
      return f((w) => [d, ...w]), S;
    }, window.hideToast = function(g) {
      f((b) => b.filter((S) => S.id !== g));
    }, () => {
      try {
        window && typeof window.showToast == "function" && delete window.showToast, window && typeof window.hideToast == "function" && delete window.hideToast;
      } catch {
      }
    };
  }, []), y.useEffect(() => {
    if (!o.length) return;
    const p = o.map((g) => setTimeout(() => {
      f((b) => b.filter((S) => S.id !== g.id));
    }, g.ttl));
    return () => {
      p.forEach(clearTimeout);
    };
  }, [o]), o.length ? /* @__PURE__ */ s.jsxDEV("div", { className: "toaster-container", "aria-live": "polite", "aria-atomic": "true", children: o.map((p) => /* @__PURE__ */ s.jsxDEV("div", { className: `toast ${p.type === "success" ? "toast-success" : "toast-info"}`, role: "status", children: [
    /* @__PURE__ */ s.jsxDEV("div", { className: "toast-message", children: p.message }, void 0, !1, {
      fileName: "/app/code/client/components/Toaster.jsx",
      lineNumber: 46,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ s.jsxDEV("button", { className: "toast-close", onClick: () => f((g) => g.filter((b) => b.id !== p.id)), "aria-label": "Dismiss", children: "✕" }, void 0, !1, {
      fileName: "/app/code/client/components/Toaster.jsx",
      lineNumber: 47,
      columnNumber: 11
    }, this)
  ] }, p.id, !0, {
    fileName: "/app/code/client/components/Toaster.jsx",
    lineNumber: 45,
    columnNumber: 9
  }, this)) }, void 0, !1, {
    fileName: "/app/code/client/components/Toaster.jsx",
    lineNumber: 43,
    columnNumber: 5
  }, this) : null;
}
function Mr({ children: o }) {
  y.useEffect(() => {
    typeof window > "u" || (window.__pendingToasts = window.__pendingToasts || [], typeof window.showToast != "function" && (window.showToast = function(p, g) {
      return window.__pendingToasts.push({ message: p, opts: g || {} }), null;
    }), typeof window.hideToast != "function" && (window.hideToast = function(p) {
      try {
        window.__pendingToasts && (window.__pendingToasts = window.__pendingToasts.filter((g) => g.id !== p));
      } catch {
      }
    }));
  }, []);
  const f = Ih();
  return y.useEffect(() => {
    const p = document.getElementById("notifBtn"), g = document.getElementById("notifMenu"), b = document.getElementById("profileBtn"), S = document.getElementById("profileMenu");
    function d(x, T, L) {
      x && (x.classList.toggle("hidden", !L), x.setAttribute("aria-hidden", L ? "false" : "true"), T && T.setAttribute("aria-expanded", L ? "true" : "false"));
    }
    function w() {
      d(g, p, !1), d(S, b, !1);
    }
    function R(x) {
      const T = (L) => L && (L === x.target || L.contains(x.target));
      !T(g) && !T(p) && !T(S) && !T(b) && w();
    }
    function j(x) {
      x.key === "Escape" && w();
    }
    function F(x) {
      x && x.querySelectorAll(".dropdown-item").forEach((T) => {
        T.addEventListener("click", () => w());
      });
    }
    return p && g && (p.addEventListener("click", (x) => {
      x.stopPropagation(), d(S, b, !1), d(g, p, g.classList.contains("hidden"));
    }), F(g)), b && S && (b.addEventListener("click", (x) => {
      x.stopPropagation(), d(g, p, !1), d(S, b, S.classList.contains("hidden"));
    }), F(S)), document.addEventListener("click", R), document.addEventListener("keydown", j), () => {
      document.removeEventListener("click", R), document.removeEventListener("keydown", j);
    };
  }, []), /* @__PURE__ */ s.jsxDEV(s.Fragment, { children: [
    /* @__PURE__ */ s.jsxDEV("header", { className: "site-header", children: [
      /* @__PURE__ */ s.jsxDEV("h1", { className: "site-title", children: /* @__PURE__ */ s.jsxDEV("span", { className: "brand", children: [
        /* @__PURE__ */ s.jsxDEV("img", { className: "brand-logo", src: "https://cdn.builder.io/api/v1/image/assets%2Fa5647e4ccf094d4d939a079b9f892c1c%2F240094ac7d6b4725b685503d97c9d9a3?format=webp&width=64", alt: "FreshBasket logo" }, void 0, !1, {
          fileName: "/app/code/client/components/SiteLayout.jsx",
          lineNumber: 75,
          columnNumber: 60
        }, this),
        /* @__PURE__ */ s.jsxDEV("span", { className: "brand-name", children: "FreshBasket" }, void 0, !1, {
          fileName: "/app/code/client/components/SiteLayout.jsx",
          lineNumber: 75,
          columnNumber: 253
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/components/SiteLayout.jsx",
        lineNumber: 75,
        columnNumber: 36
      }, this) }, void 0, !1, {
        fileName: "/app/code/client/components/SiteLayout.jsx",
        lineNumber: 75,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ s.jsxDEV("nav", { className: "site-nav", children: [
        /* @__PURE__ */ s.jsxDEV(Xi, { to: "/dashboard", onClick: (p) => {
          p.preventDefault(), f("/dashboard");
        }, children: "Dashboard" }, void 0, !1, {
          fileName: "/app/code/client/components/SiteLayout.jsx",
          lineNumber: 77,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ s.jsxDEV(Xi, { to: "/orders", onClick: (p) => {
          p.preventDefault(), f("/orders");
        }, children: "Orders" }, void 0, !1, {
          fileName: "/app/code/client/components/SiteLayout.jsx",
          lineNumber: 78,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ s.jsxDEV(Xi, { to: "/riders", onClick: (p) => {
          p.preventDefault(), f("/riders");
        }, children: "Riders" }, void 0, !1, {
          fileName: "/app/code/client/components/SiteLayout.jsx",
          lineNumber: 79,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ s.jsxDEV(Xi, { to: "/reports", onClick: (p) => {
          p.preventDefault(), f("/reports");
        }, children: "Reports" }, void 0, !1, {
          fileName: "/app/code/client/components/SiteLayout.jsx",
          lineNumber: 80,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ s.jsxDEV("span", { className: "site-nav-spacer" }, void 0, !1, {
          fileName: "/app/code/client/components/SiteLayout.jsx",
          lineNumber: 81,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ s.jsxDEV("div", { className: "nav-dropdown", children: [
          /* @__PURE__ */ s.jsxDEV("button", { id: "notifBtn", className: "icon-btn", "aria-haspopup": "true", "aria-expanded": "false", "aria-controls": "notifMenu", "aria-label": "Notifications", title: "Notifications", children: /* @__PURE__ */ s.jsxDEV("svg", { className: "bell-icon", width: "29", height: "29", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true", children: [
            /* @__PURE__ */ s.jsxDEV("defs", { children: /* @__PURE__ */ s.jsxDEV("linearGradient", { id: "bellGold", x1: "0", y1: "0", x2: "0", y2: "1", children: [
              /* @__PURE__ */ s.jsxDEV("stop", { offset: "0%", stopColor: "#C08B3E" }, void 0, !1, {
                fileName: "/app/code/client/components/SiteLayout.jsx",
                lineNumber: 87,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ s.jsxDEV("stop", { offset: "50%", stopColor: "#D4AF37" }, void 0, !1, {
                fileName: "/app/code/client/components/SiteLayout.jsx",
                lineNumber: 88,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ s.jsxDEV("stop", { offset: "100%", stopColor: "#FFD700" }, void 0, !1, {
                fileName: "/app/code/client/components/SiteLayout.jsx",
                lineNumber: 89,
                columnNumber: 21
              }, this)
            ] }, void 0, !0, {
              fileName: "/app/code/client/components/SiteLayout.jsx",
              lineNumber: 86,
              columnNumber: 19
            }, this) }, void 0, !1, {
              fileName: "/app/code/client/components/SiteLayout.jsx",
              lineNumber: 85,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ s.jsxDEV("path", { fill: "url(#bellGold)", d: "M12 22a2 2 0 0 0 1.995-1.85L14 20h-4a2 2 0 0 0 1.85 1.995L12 22Zm8-5h-1a1 1 0 0 1-.707-.293l-.147-.147A3.99 3.99 0 0 1 17 14.172V11a5 5 0 1 0-10 0v3.172a3.99 3.99 0 0 1-1.146 2.388l-.147.147A1 1 0 0 1 5 17H4a1 1 0 1 0 0 2h16a1 1 0 1 0 0-2Z" }, void 0, !1, {
              fileName: "/app/code/client/components/SiteLayout.jsx",
              lineNumber: 92,
              columnNumber: 17
            }, this)
          ] }, void 0, !0, {
            fileName: "/app/code/client/components/SiteLayout.jsx",
            lineNumber: 84,
            columnNumber: 15
          }, this) }, void 0, !1, {
            fileName: "/app/code/client/components/SiteLayout.jsx",
            lineNumber: 83,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ s.jsxDEV("div", { id: "notifMenu", className: "dropdown-menu hidden", role: "menu", "aria-labelledby": "notifBtn", "aria-hidden": "true", children: [
            /* @__PURE__ */ s.jsxDEV("div", { className: "dropdown-header", children: "Notifications" }, void 0, !1, {
              fileName: "/app/code/client/components/SiteLayout.jsx",
              lineNumber: 96,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ s.jsxDEV("div", { className: "dropdown-item", children: "No new notifications" }, void 0, !1, {
              fileName: "/app/code/client/components/SiteLayout.jsx",
              lineNumber: 97,
              columnNumber: 15
            }, this)
          ] }, void 0, !0, {
            fileName: "/app/code/client/components/SiteLayout.jsx",
            lineNumber: 95,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/components/SiteLayout.jsx",
          lineNumber: 82,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ s.jsxDEV("div", { className: "nav-dropdown", children: [
          /* @__PURE__ */ s.jsxDEV("button", { id: "profileBtn", className: "icon-btn", "aria-haspopup": "true", "aria-expanded": "false", "aria-controls": "profileMenu", title: "Profile", children: /* @__PURE__ */ s.jsxDEV("svg", { className: "avatar", width: "28", height: "28", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
            /* @__PURE__ */ s.jsxDEV("circle", { cx: "12", cy: "7.5", r: "3.5", stroke: "currentColor", strokeWidth: "1.5" }, void 0, !1, {
              fileName: "/app/code/client/components/SiteLayout.jsx",
              lineNumber: 103,
              columnNumber: 129
            }, this),
            /* @__PURE__ */ s.jsxDEV("path", { d: "M4 20c0-3.314 3.582-6 8-6s8 2.686 8 6", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" }, void 0, !1, {
              fileName: "/app/code/client/components/SiteLayout.jsx",
              lineNumber: 103,
              columnNumber: 203
            }, this)
          ] }, void 0, !0, {
            fileName: "/app/code/client/components/SiteLayout.jsx",
            lineNumber: 103,
            columnNumber: 15
          }, this) }, void 0, !1, {
            fileName: "/app/code/client/components/SiteLayout.jsx",
            lineNumber: 102,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ s.jsxDEV("div", { id: "profileMenu", className: "dropdown-menu hidden", role: "menu", "aria-labelledby": "profileBtn", "aria-hidden": "true", children: [
            /* @__PURE__ */ s.jsxDEV("div", { className: "dropdown-header", children: "Signed in" }, void 0, !1, {
              fileName: "/app/code/client/components/SiteLayout.jsx",
              lineNumber: 106,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ s.jsxDEV(Xi, { className: "dropdown-item", to: "/settings", onClick: (p) => {
              p.preventDefault(), f("/settings");
            }, children: "Settings" }, void 0, !1, {
              fileName: "/app/code/client/components/SiteLayout.jsx",
              lineNumber: 107,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ s.jsxDEV("form", { method: "POST", action: "/auth/logout", children: /* @__PURE__ */ s.jsxDEV("button", { className: "dropdown-item", type: "submit", children: "Logout" }, void 0, !1, {
              fileName: "/app/code/client/components/SiteLayout.jsx",
              lineNumber: 108,
              columnNumber: 57
            }, this) }, void 0, !1, {
              fileName: "/app/code/client/components/SiteLayout.jsx",
              lineNumber: 108,
              columnNumber: 15
            }, this)
          ] }, void 0, !0, {
            fileName: "/app/code/client/components/SiteLayout.jsx",
            lineNumber: 105,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/components/SiteLayout.jsx",
          lineNumber: 101,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/components/SiteLayout.jsx",
        lineNumber: 76,
        columnNumber: 9
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/components/SiteLayout.jsx",
      lineNumber: 74,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ s.jsxDEV("main", { className: "content", children: o }, void 0, !1, {
      fileName: "/app/code/client/components/SiteLayout.jsx",
      lineNumber: 114,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ s.jsxDEV("footer", { className: "site-footer", children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " FreshBasket"
    ] }, void 0, !0, {
      fileName: "/app/code/client/components/SiteLayout.jsx",
      lineNumber: 115,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ s.jsxDEV(O_, {}, void 0, !1, {
      fileName: "/app/code/client/components/SiteLayout.jsx",
      lineNumber: 116,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "/app/code/client/components/SiteLayout.jsx",
    lineNumber: 73,
    columnNumber: 5
  }, this);
}
function M_({ onClose: o, onCreated: f }) {
  const [p, g] = y.useState(""), [b, S] = y.useState(""), [d, w] = y.useState(""), [R, j] = y.useState(!1), [F, x] = y.useState(""), [T, L] = y.useState(""), [te, pe] = y.useState(!1), [ie, ce] = y.useState(!1), [K, P] = y.useState(!1), [I, ee] = y.useState(!1), z = "+92";
  function U(X) {
    const W = String(X || "").replace(/\D+/g, "");
    return W.length === 0 ? "" : W.startsWith("92") ? z + W.slice(2) : z + W;
  }
  U(d);
  async function le() {
    x(""), L(""), ee(!0);
    const X = String(p), W = String(b).trim(), oe = String(d).trim(), Q = oe.replace(/\D+/g, ""), k = { fn: !W, cn: !oe, pw: !X };
    if (pe(k.fn), ce(k.cn || Q.length < 7), P(k.pw), k.fn || k.cn || k.pw) {
      x("Full name, mobile and password are required");
      return;
    }
    if (Q.length !== 10) {
      x("numbers should be 10 digit"), ce(!0);
      return;
    }
    if (X.length < 6) {
      P(!0), x("Password must be at least 6 characters");
      return;
    }
    j(!0);
    try {
      const ue = U(oe), de = await fetch("/api/mobile/register", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: X, fullName: W, contactNumber: ue })
      }), Y = await de.json().catch(() => null);
      if (!de.ok) {
        const q = String(Y && (Y.error || Y.message) || ""), re = q.toUpperCase();
        /MISSING\s*FULLNAME\/CONTACTNUMBER/i.test(q) || /MISSING\s*PASSWORD/i.test(q) ? (x("Full name, mobile and password are required"), pe(!W), ce(!oe || Q.length !== 10), P(!X)) : re.includes("WEAK_PASSWORD") || /AT LEAST 6 CHARACTERS/i.test(q) ? (P(!0), x("Password must be at least 6 characters")) : /INVALID CONTACT NUMBER|MUST BE EXACTLY 10 DIGITS|NUMBERS SHOULD BE 10 DIGIT/i.test(q) ? (ce(!0), x("numbers should be 10 digit")) : /FIREBASE NOT CONFIGURED/i.test(q) ? x("Service temporarily unavailable. Please try again later.") : x(q || "Failed to create rider");
        return;
      }
      L("Rider created successfully"), f && f(), setTimeout(() => {
        o && o();
      }, 600);
    } catch (ue) {
      const de = String((ue == null ? void 0 : ue.message) || "");
      /Missing\s*(fullName\/contactNumber|password)/i.test(de) ? x("Full name, mobile and password are required") : /WEAK_PASSWORD/i.test(de) || /AT LEAST 6 CHARACTERS/i.test(de) ? (P(!0), x("Password must be at least 6 characters")) : /INVALID CONTACT NUMBER|MUST BE EXACTLY 10 DIGITS|NUMBERS SHOULD BE 10 DIGIT/i.test(de) ? (ce(!0), x("numbers should be 10 digit")) : x(de || "Failed to create rider");
    } finally {
      j(!1);
    }
  }
  return /* @__PURE__ */ s.jsxDEV("div", { className: "create-rider-backdrop", role: "dialog", "aria-modal": "true", children: /* @__PURE__ */ s.jsxDEV("div", { className: "create-rider-modal", children: [
    /* @__PURE__ */ s.jsxDEV("header", { className: "create-rider-header", children: [
      /* @__PURE__ */ s.jsxDEV("h3", { className: "create-rider-title", children: "Create Rider" }, void 0, !1, {
        fileName: "/app/code/client/components/CreateRiderModal.jsx",
        lineNumber: 100,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ s.jsxDEV("button", { className: "create-rider-close", onClick: o, "aria-label": "Close", children: "✕" }, void 0, !1, {
        fileName: "/app/code/client/components/CreateRiderModal.jsx",
        lineNumber: 101,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/components/CreateRiderModal.jsx",
      lineNumber: 99,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ s.jsxDEV("div", { className: "create-rider-body", children: [
      T && /* @__PURE__ */ s.jsxDEV("div", { className: "auth-success", children: T }, void 0, !1, {
        fileName: "/app/code/client/components/CreateRiderModal.jsx",
        lineNumber: 104,
        columnNumber: 18
      }, this),
      /* @__PURE__ */ s.jsxDEV("label", { className: "field-label", children: [
        "Full name",
        /* @__PURE__ */ s.jsxDEV("input", { className: "field-input" + (I && !String(b).trim() ? " input-error" : ""), value: b, onChange: (X) => {
          S(X.target.value), I && pe(!String(X.target.value).trim());
        }, required: !0 }, void 0, !1, {
          fileName: "/app/code/client/components/CreateRiderModal.jsx",
          lineNumber: 106,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/components/CreateRiderModal.jsx",
        lineNumber: 105,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ s.jsxDEV("label", { className: "field-label", children: [
        "Password",
        /* @__PURE__ */ s.jsxDEV("input", { className: "field-input" + (I && !String(p) ? " input-error" : ""), type: "password", value: p, onChange: (X) => {
          g(X.target.value), I && P(!String(X.target.value));
        }, required: !0 }, void 0, !1, {
          fileName: "/app/code/client/components/CreateRiderModal.jsx",
          lineNumber: 109,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/components/CreateRiderModal.jsx",
        lineNumber: 108,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ s.jsxDEV("label", { className: "field-label", children: [
        "Contact number",
        /* @__PURE__ */ s.jsxDEV("div", { className: "phone-input-wrapper", children: [
          /* @__PURE__ */ s.jsxDEV("span", { className: "phone-prefix", children: "+92" }, void 0, !1, {
            fileName: "/app/code/client/components/CreateRiderModal.jsx",
            lineNumber: 113,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ s.jsxDEV(
            "input",
            {
              className: "field-input phone-input-field" + (I && String(d).trim().replace(/\D+/g, "").length !== 10 ? " input-error" : ""),
              type: "tel",
              inputMode: "tel",
              pattern: "[0-9]{10}",
              placeholder: "3001234567",
              value: d,
              onChange: (X) => {
                const W = X.target.value.replace(/\D+/g, "").slice(0, 10);
                w(W), I && ce(W.length !== 10);
              },
              required: !0
            },
            void 0,
            !1,
            {
              fileName: "/app/code/client/components/CreateRiderModal.jsx",
              lineNumber: 114,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "/app/code/client/components/CreateRiderModal.jsx",
          lineNumber: 112,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/components/CreateRiderModal.jsx",
        lineNumber: 111,
        columnNumber: 11
      }, this),
      F && /* @__PURE__ */ s.jsxDEV("div", { className: "auth-error", children: F }, void 0, !1, {
        fileName: "/app/code/client/components/CreateRiderModal.jsx",
        lineNumber: 132,
        columnNumber: 21
      }, this),
      /* @__PURE__ */ s.jsxDEV("div", { className: "create-rider-actions", children: [
        /* @__PURE__ */ s.jsxDEV("button", { className: "btn-secondary", onClick: o, disabled: R, children: "Cancel" }, void 0, !1, {
          fileName: "/app/code/client/components/CreateRiderModal.jsx",
          lineNumber: 134,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ s.jsxDEV("button", { className: "btn-primary", onClick: le, disabled: R, children: R ? "Creating…" : "Create" }, void 0, !1, {
          fileName: "/app/code/client/components/CreateRiderModal.jsx",
          lineNumber: 135,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/components/CreateRiderModal.jsx",
        lineNumber: 133,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/components/CreateRiderModal.jsx",
      lineNumber: 103,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "/app/code/client/components/CreateRiderModal.jsx",
    lineNumber: 98,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "/app/code/client/components/CreateRiderModal.jsx",
    lineNumber: 97,
    columnNumber: 5
  }, this);
}
function V_({ rider: o, onClose: f, onUpdated: p }) {
  const g = y.useMemo(() => String((o == null ? void 0 : o.name) || (o == null ? void 0 : o.displayName) || ""), [o]), b = y.useMemo(() => {
    const ee = String((o == null ? void 0 : o.contactNumber) || "").trim().replace(/\D+/g, "");
    return ee.length >= 10 ? ee.slice(-10) : ee;
  }, [o]), [S, d] = y.useState(g), [w, R] = y.useState(b), [j, F] = y.useState(!1), [x, T] = y.useState(""), [L, te] = y.useState(""), [pe, ie] = y.useState(!1), ce = "+92";
  function K(I) {
    const ee = String(I || "").replace(/\D+/g, "");
    return ee.length === 0 ? "" : ee.startsWith("92") ? ce + ee.slice(2) : ce + ee;
  }
  Nx.useEffect(() => {
    let I = !0;
    return (async () => {
      try {
        const ee = await fetch(`/api/riders/${encodeURIComponent(o.id)}`, { credentials: "include" });
        if (ee.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        const z = await ee.json().catch(() => null), U = z && (z.data || z) || {}, le = U.rider || U || {};
        if (!I) return;
        const X = String(le.displayName || le.name || "").trim(), W = String(le.contactNumber || "").replace(/\D+/g, "");
        X && d(X), W && R(W.slice(-10));
      } catch {
      }
    })(), () => {
      I = !1;
    };
  }, [o == null ? void 0 : o.id]);
  async function P() {
    ie(!0), T(""), te("");
    const I = String(S).trim(), z = String(w).trim().replace(/\D+/g, "");
    if (!I && z.length === 0) {
      T("Enter a name or mobile");
      return;
    }
    if (z && z.length !== 10) {
      T("numbers should be 10 digit");
      return;
    }
    F(!0);
    try {
      const U = {};
      I && (U.displayName = I), z && (U.contactNumber = K(z));
      const le = await fetch(`/api/riders/${encodeURIComponent(o.id)}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(U)
      }), X = await le.json().catch(() => ({}));
      if (le.status === 401) {
        window.location.href = "/auth/login";
        return;
      }
      if (!le.ok) {
        T(String(X && (X.error || X.message) || "Failed to update rider"));
        return;
      }
      te("Saved"), p && p(X.data && X.data.rider ? X.data.rider : null), setTimeout(() => {
        f && f();
      }, 450);
    } catch (U) {
      T(String((U == null ? void 0 : U.message) || "Failed to update rider"));
    } finally {
      F(!1);
    }
  }
  return /* @__PURE__ */ s.jsxDEV("div", { className: "edit-modal-backdrop", role: "dialog", "aria-modal": "true", children: /* @__PURE__ */ s.jsxDEV("div", { className: "edit-modal", children: [
    /* @__PURE__ */ s.jsxDEV("header", { className: "edit-modal-header", children: [
      /* @__PURE__ */ s.jsxDEV("h3", { className: "edit-modal-title", children: "Edit Rider" }, void 0, !1, {
        fileName: "/app/code/client/components/EditRiderModal.jsx",
        lineNumber: 77,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ s.jsxDEV("button", { className: "edit-modal-close", onClick: f, "aria-label": "Close", children: "✕" }, void 0, !1, {
        fileName: "/app/code/client/components/EditRiderModal.jsx",
        lineNumber: 78,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/components/EditRiderModal.jsx",
      lineNumber: 76,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ s.jsxDEV("div", { className: "edit-modal-body", children: [
      L && /* @__PURE__ */ s.jsxDEV("div", { className: "auth-success", children: L }, void 0, !1, {
        fileName: "/app/code/client/components/EditRiderModal.jsx",
        lineNumber: 81,
        columnNumber: 18
      }, this),
      /* @__PURE__ */ s.jsxDEV("label", { className: "field-label", children: [
        "Full name",
        /* @__PURE__ */ s.jsxDEV("input", { className: "field-input", value: S, onChange: (I) => d(I.target.value) }, void 0, !1, {
          fileName: "/app/code/client/components/EditRiderModal.jsx",
          lineNumber: 83,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/components/EditRiderModal.jsx",
        lineNumber: 82,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ s.jsxDEV("label", { className: "field-label", children: [
        "Contact number",
        /* @__PURE__ */ s.jsxDEV("div", { className: "phone-input-wrapper", children: [
          /* @__PURE__ */ s.jsxDEV("span", { className: "phone-prefix", children: "+92" }, void 0, !1, {
            fileName: "/app/code/client/components/EditRiderModal.jsx",
            lineNumber: 87,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ s.jsxDEV(
            "input",
            {
              className: "field-input phone-input-field" + (pe && (w && w.replace(/\D+/g, "").length !== 10 ? " input-error" : "")),
              type: "tel",
              inputMode: "tel",
              pattern: "[0-9]{10}",
              placeholder: "3001234567",
              value: w,
              onChange: (I) => {
                const ee = I.target.value.replace(/\D+/g, "").slice(0, 10);
                R(ee);
              }
            },
            void 0,
            !1,
            {
              fileName: "/app/code/client/components/EditRiderModal.jsx",
              lineNumber: 88,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "/app/code/client/components/EditRiderModal.jsx",
          lineNumber: 86,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/components/EditRiderModal.jsx",
        lineNumber: 85,
        columnNumber: 11
      }, this),
      x && /* @__PURE__ */ s.jsxDEV("div", { className: "auth-error", children: x }, void 0, !1, {
        fileName: "/app/code/client/components/EditRiderModal.jsx",
        lineNumber: 102,
        columnNumber: 21
      }, this),
      /* @__PURE__ */ s.jsxDEV("div", { className: "edit-modal-actions", children: [
        /* @__PURE__ */ s.jsxDEV("button", { className: "btn-secondary", onClick: f, disabled: j, children: "Cancel" }, void 0, !1, {
          fileName: "/app/code/client/components/EditRiderModal.jsx",
          lineNumber: 104,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ s.jsxDEV("button", { className: "btn-primary", onClick: P, disabled: j, children: j ? "Saving…" : "Save" }, void 0, !1, {
          fileName: "/app/code/client/components/EditRiderModal.jsx",
          lineNumber: 105,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/components/EditRiderModal.jsx",
        lineNumber: 103,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/components/EditRiderModal.jsx",
      lineNumber: 80,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "/app/code/client/components/EditRiderModal.jsx",
    lineNumber: 75,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "/app/code/client/components/EditRiderModal.jsx",
    lineNumber: 74,
    columnNumber: 5
  }, this);
}
const Nd = "app.settings.fares", Xn = {
  baseFare: 0,
  farePerKm: 2
};
function Wh() {
  if (typeof window > "u" || !window.localStorage)
    return { ...Xn };
  try {
    const o = window.localStorage.getItem(Nd);
    if (!o)
      return { ...Xn };
    const f = JSON.parse(o), p = Number(f == null ? void 0 : f.baseFare), g = Number(f == null ? void 0 : f.farePerKm);
    return {
      baseFare: Number.isFinite(p) ? p : Xn.baseFare,
      farePerKm: Number.isFinite(g) ? g : Xn.farePerKm
    };
  } catch {
    return { ...Xn };
  }
}
const Ax = "riderPerformancePct";
function Lx() {
  if (typeof window > "u") return null;
  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
}
function A_() {
  const o = Lx();
  if (!o) return {};
  try {
    const f = o.getItem(Ax);
    if (!f) return {};
    const p = JSON.parse(f);
    if (p && typeof p == "object" && !Array.isArray(p))
      return p;
  } catch {
  }
  return {};
}
function L_(o) {
  if (!o || typeof o != "object") return;
  const f = Lx();
  if (!f) return;
  const p = Object.entries(o);
  if (p.length === 0) return;
  const g = A_();
  let b = !1;
  const S = { ...g };
  for (const [d, w] of p) {
    const R = String(d);
    let j;
    if (typeof w == "number")
      j = w;
    else if (typeof w == "string")
      j = Number(w);
    else
      continue;
    Number.isFinite(j) && S[R] !== j && (S[R] = j, b = !0);
  }
  if (b)
    try {
      f.setItem(Ax, JSON.stringify(S));
    } catch {
    }
}
function k_(o) {
  if (!o) return null;
  if (o instanceof Date)
    return Number.isFinite(o.getTime()) ? o : null;
  if (typeof o == "string") {
    const f = Date.parse(o);
    return Number.isFinite(f) ? new Date(f) : null;
  }
  if (typeof o == "number") {
    const f = new Date(o);
    return Number.isFinite(f.getTime()) ? f : null;
  }
  if (typeof o == "object") {
    if (typeof o.toDate == "function")
      try {
        const f = o.toDate();
        if (f instanceof Date && Number.isFinite(f.getTime())) return f;
      } catch {
      }
    if (typeof o.seconds == "number") {
      const f = o.seconds * 1e3 + (typeof o.nanoseconds == "number" ? Math.floor(o.nanoseconds / 1e6) : 0), p = new Date(f);
      if (Number.isFinite(p.getTime())) return p;
    }
  }
  return null;
}
function U_(o) {
  return !(o instanceof Date) || !Number.isFinite(o.getTime()) ? "" : `${o.getFullYear()}-${String(o.getMonth() + 1).padStart(2, "0")}`;
}
const F_ = [
  "completedAt",
  "completed_at",
  "deliveredAt",
  "delivered_at",
  "createdAt",
  "created_at",
  "created",
  "assignedAt",
  "assigned_at",
  "timestamp",
  "orderedAt",
  "ordered_at",
  "updatedAt",
  "updated_at"
];
function z_(o) {
  if (!o || typeof o != "object") return "";
  for (const f of F_) {
    const p = o[f], g = k_(p);
    if (g) return U_(g);
  }
  return "";
}
function P_(o, f) {
  if (!Array.isArray(o) || !f) return 0;
  let p = 0;
  for (const g of o)
    z_(g) === f && (p += 1);
  return p;
}
function H_() {
  const o = () => {
    const Y = /* @__PURE__ */ new Date(), q = new Date(Y.getFullYear(), Y.getMonth(), 1), re = `${q.getFullYear()}-${String(q.getMonth() + 1).padStart(2, "0")}-${String(q.getDate()).padStart(2, "0")}`, Re = `${Y.getFullYear()}-${String(Y.getMonth() + 1).padStart(2, "0")}-${String(Y.getDate()).padStart(2, "0")}`;
    return { from: re, to: Re };
  }, f = y.useMemo(() => o(), []), [p, g] = y.useState([]), [b, S] = y.useState(""), [d, w] = y.useState(!0), [R, j] = y.useState(""), [F, x] = y.useState(1), [T, L] = y.useState(20), [te, pe] = y.useState({ total: 0, page: 1, limit: 20, pages: 1 }), [ie, ce] = y.useState(!1), [K, P] = y.useState(null), [I, ee] = y.useState(Xn), [z, U] = y.useState(f.from), [le, X] = y.useState(f.to), [W, oe] = y.useState(/* @__PURE__ */ new Map());
  y.useEffect(() => {
    function Y() {
      ee(Wh());
    }
    Y();
    function q(re) {
      re.key === Nd && Y();
    }
    return typeof window < "u" && (window.addEventListener("storage", q), window.addEventListener("fare-settings-changed", Y)), () => {
      typeof window < "u" && (window.removeEventListener("storage", q), window.removeEventListener("fare-settings-changed", Y));
    };
  }, []), y.useEffect(() => {
    let Y = !0;
    return (async () => {
      var q, re, Re, Pe;
      w(!0), j("");
      try {
        const et = new URLSearchParams();
        b && et.set("q", b), et.set("page", String(F)), et.set("limit", String(T));
        const Ve = await fetch(`/api/riders?${et.toString()}`, { credentials: "include" });
        if (Ve.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!Ve.ok) throw new Error("Failed to load riders");
        const Ke = await Ve.json();
        Y && (g(Array.isArray(Ke.riders) ? Ke.riders : []), pe({ total: ((q = Ke.meta) == null ? void 0 : q.total) || 0, page: ((re = Ke.meta) == null ? void 0 : re.page) || 1, limit: ((Re = Ke.meta) == null ? void 0 : Re.limit) || T, pages: ((Pe = Ke.meta) == null ? void 0 : Pe.pages) || 1 }));
      } catch (et) {
        Y && j(et.message || "Failed to load riders");
      } finally {
        Y && w(!1);
      }
    })(), () => {
      Y = !1;
    };
  }, [b, F, T]), y.useEffect(() => {
    if (!z || !le || !p.length) {
      oe(/* @__PURE__ */ new Map());
      return;
    }
    const Y = new AbortController(), q = Y.signal;
    let re = !1;
    const Re = (() => {
      const Ve = typeof navigator < "u" && Number.isFinite(Number(navigator.hardwareConcurrency)) ? Number(navigator.hardwareConcurrency) : 8;
      return Math.max(2, Math.min(8, Math.floor(Ve / 2)));
    })();
    oe(/* @__PURE__ */ new Map());
    const Pe = p.map((Ve) => async () => {
      const Ke = `${Ve.id}:${z}:${le}`;
      try {
        const at = await fetch(`/api/riders/${Ve.id}/km-in-range?fromDate=${z}&toDate=${le}`, { credentials: "include", signal: q });
        if (at.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!at.ok) {
          const Et = await at.text().catch(() => String(at.status));
          console.error(`km-in-range error for ${Ve.id}:`, at.status, Et);
          return;
        }
        const Ft = await at.json();
        if (re || q.aborted) return;
        oe((Et) => {
          const Vt = new Map(Et);
          return Vt.set(Ke, {
            km: Ft.totalKm || 0,
            rideCount: Ft.rideCount || 0,
            performancePct: Ft.performancePct || 0
          }), Vt;
        });
      } catch (at) {
        if (at && at.name === "AbortError") return;
        console.error(`km-in-range fetch error for ${Ve.id}:`, at);
      }
    });
    async function et(Ve, Ke) {
      let at = 0;
      const Ft = new Array(Math.min(Ke, Ve.length)).fill(0).map(async () => {
        for (; !re && !q.aborted; ) {
          const Et = at++;
          if (Et >= Ve.length) break;
          await Ve[Et]();
        }
      });
      await Promise.all(Ft);
    }
    return et(Pe, Re), () => {
      re = !0, Y.abort();
    };
  }, [z, le, p]);
  const Q = y.useMemo(() => p.filter((Y) => {
    if (b && !String(Y.name || "").toLowerCase().includes(b.toLowerCase().trim())) return !1;
    if (z || le) {
      const q = Number(Y.lastActiveDays ?? 0), re = z ? new Date(z) : null, Re = le ? new Date(le) : null;
      if (re && Re) {
        const Pe = Math.floor((Date.now() - re.getTime()) / 864e5), et = Math.floor((Date.now() - Re.getTime()) / (1e3 * 60 * 60 * 24));
        if (q < et || q > Pe) return !1;
      } else if (re) {
        const Pe = Math.floor((Date.now() - re.getTime()) / 864e5);
        if (q > Pe) return !1;
      } else if (Re) {
        const Pe = Math.floor((Date.now() - Re.getTime()) / 864e5);
        if (q < Pe) return !1;
      }
    }
    return !0;
  }), [p, b, z, le]), k = y.useMemo(() => {
    const Y = Number(I.farePerKm);
    return Number.isFinite(Y) ? Y : Xn.farePerKm;
  }, [I]), ue = y.useMemo(() => {
    const Y = Number(I.baseFare);
    return Number.isFinite(Y) ? Y : Xn.baseFare;
  }, [I]);
  y.useEffect(() => {
    if (!Array.isArray(p) || p.length === 0) return;
    const Y = {};
    for (const q of p) {
      if (!q || q.id === void 0 || q.id === null) continue;
      const re = Number(q.performancePct);
      Number.isFinite(re) && (Y[q.id] = Math.round(re));
    }
    Object.keys(Y).length !== 0 && L_(Y);
  }, [p]);
  const de = y.useMemo(() => {
    const Y = /* @__PURE__ */ new Date(), q = [], re = [];
    for (let Re = 2; Re >= 0; Re--) {
      const Pe = new Date(Y.getFullYear(), Y.getMonth() - Re, 1), et = `${Pe.getFullYear()}-${String(Pe.getMonth() + 1).padStart(2, "0")}`, Ve = Pe.toLocaleString(void 0, { month: "short", year: "numeric" });
      q.push(et), re.push(Ve);
    }
    return { keys: q, labels: re };
  }, []);
  return /* @__PURE__ */ s.jsxDEV(Mr, { children: /* @__PURE__ */ s.jsxDEV("section", { className: "rider-management", children: [
    /* @__PURE__ */ s.jsxDEV("header", { className: "rc-header riders-header", children: [
      /* @__PURE__ */ s.jsxDEV("div", { className: "riders-header-left", children: [
        /* @__PURE__ */ s.jsxDEV("h2", { className: "rc-title", children: "Rider Management" }, void 0, !1, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 265,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ s.jsxDEV("p", { className: "rc-subtitle", children: "View and manage riders based on performance." }, void 0, !1, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 266,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 264,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ s.jsxDEV("div", { className: "riders-header-right", children: /* @__PURE__ */ s.jsxDEV("button", { className: "btn-secondary btn-create-rider", onClick: () => ce(!0), children: "Create Rider" }, void 0, !1, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 269,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 268,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Riders.jsx",
      lineNumber: 263,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ s.jsxDEV("div", { className: "rc-toolbar", children: [
      /* @__PURE__ */ s.jsxDEV("div", { className: "rc-search", children: [
        /* @__PURE__ */ s.jsxDEV("span", { className: "rc-search-icon", "aria-hidden": "true" }, void 0, !1, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 275,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ s.jsxDEV("input", { className: "rc-search-input", type: "search", placeholder: "Search", value: b, onChange: (Y) => {
          S(Y.target.value), x(1);
        } }, void 0, !1, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 276,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 274,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ s.jsxDEV("div", { className: "rc-filters", children: /* @__PURE__ */ s.jsxDEV("div", { className: "date-range-filter", children: [
        /* @__PURE__ */ s.jsxDEV("input", { type: "date", className: "date-range-input", value: z, onChange: (Y) => {
          U(Y.target.value), x(1);
        }, placeholder: "From", title: "Filter from date" }, void 0, !1, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 280,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ s.jsxDEV("span", { className: "date-range-separator", children: "to" }, void 0, !1, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 281,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ s.jsxDEV("input", { type: "date", className: "date-range-input", value: le, onChange: (Y) => {
          X(Y.target.value), x(1);
        }, placeholder: "To", title: "Filter to date" }, void 0, !1, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 282,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 279,
        columnNumber: 13
      }, this) }, void 0, !1, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 278,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Riders.jsx",
      lineNumber: 273,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ s.jsxDEV("div", { className: "rc-table-wrapper", children: [
      ie && /* @__PURE__ */ s.jsxDEV(M_, { onClose: () => ce(!1), onCreated: () => {
        window.location.reload();
      } }, void 0, !1, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 289,
        columnNumber: 13
      }, this),
      K && /* @__PURE__ */ s.jsxDEV(
        V_,
        {
          rider: K,
          onClose: () => P(null),
          onUpdated: (Y) => {
            if (!Y) {
              P(null);
              return;
            }
            g((q) => q.map((re) => String(re.id) === String(Y.id) ? { ...re, name: Y.displayName || Y.name || re.name, contactNumber: Y.contactNumber ?? re.contactNumber } : re)), P(null);
          }
        },
        void 0,
        !1,
        {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 292,
          columnNumber: 13
        },
        this
      ),
      /* @__PURE__ */ s.jsxDEV("table", { className: "rc-table", children: [
        /* @__PURE__ */ s.jsxDEV("thead", { children: /* @__PURE__ */ s.jsxDEV("tr", { children: [
          /* @__PURE__ */ s.jsxDEV("th", { className: "col-name", children: "Rider Name" }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 305,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ s.jsxDEV("th", { className: "col-month", children: "Range" }, de.keys[de.keys.length - 1], !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 306,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ s.jsxDEV("th", { className: "col-earnings", children: (() => {
            const Y = de.keys[de.keys.length - 2], q = String(Y).split("-"), re = parseInt(q[0], 10), Re = parseInt(q[1], 10);
            return `Earnings (${new Date(Number.isFinite(re) ? re : (/* @__PURE__ */ new Date()).getFullYear(), Number.isFinite(Re) ? Re - 1 : (/* @__PURE__ */ new Date()).getMonth() - 1, 1).toLocaleString(void 0, { month: "short" })}, Rs)`;
          })() }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 307,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ s.jsxDEV("th", { className: "col-perf", children: "Performance" }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 308,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ s.jsxDEV("th", { className: "col-total", children: "Total" }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 309,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ s.jsxDEV("th", { className: "col-action", children: "Actions" }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 310,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 304,
          columnNumber: 15
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 303,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ s.jsxDEV("tbody", { children: [
          d && /* @__PURE__ */ s.jsxDEV("tr", { children: /* @__PURE__ */ s.jsxDEV("td", { colSpan: 7, className: "section-note", children: "Loading…" }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 315,
            columnNumber: 21
          }, this) }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 315,
            columnNumber: 17
          }, this),
          !d && R && /* @__PURE__ */ s.jsxDEV("tr", { children: /* @__PURE__ */ s.jsxDEV("td", { colSpan: 7, className: "auth-error", children: R }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 318,
            columnNumber: 21
          }, this) }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 318,
            columnNumber: 17
          }, this),
          !d && !R && Q.map((Y) => /* @__PURE__ */ s.jsxDEV("tr", { "data-rider-id": Y.id, "data-status": Y.status, "data-last-days": Y.lastActiveDays, children: [
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-name", children: /* @__PURE__ */ s.jsxDEV("a", { className: "rider-name-link", href: `/riders/${Y.id}`, children: Y.name }, void 0, !1, {
              fileName: "/app/code/client/pages/Riders.jsx",
              lineNumber: 322,
              columnNumber: 47
            }, this) }, void 0, !1, {
              fileName: "/app/code/client/pages/Riders.jsx",
              lineNumber: 322,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-month", children: (() => {
              var q;
              if (z && le) {
                const re = `${Y.id}:${z}:${le}`, Re = W.get(re);
                if (!Re) return /* @__PURE__ */ s.jsxDEV("span", { className: "cell-loader loader-sm", "aria-busy": "true", "aria-label": "Loading range" }, void 0, !1, {
                  fileName: "/app/code/client/pages/Riders.jsx",
                  lineNumber: 327,
                  columnNumber: 42
                }, this);
                const Pe = (Re == null ? void 0 : Re.km) ?? 0;
                return `${Number(Pe).toFixed(2)} km`;
              }
              return `${Number(((q = Y.monthlyCounts) == null ? void 0 : q[de.keys[de.keys.length - 1]]) || 0).toFixed(2)} km`;
            })() }, void 0, !1, {
              fileName: "/app/code/client/pages/Riders.jsx",
              lineNumber: 323,
              columnNumber: 19
            }, this),
            (() => {
              var Pe, et;
              if (z && le) {
                const Ve = `${Y.id}:${z}:${le}`;
                if (!W.get(Ve)) return /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-earnings", children: /* @__PURE__ */ s.jsxDEV("span", { className: "cell-loader loader-md", "aria-busy": "true", "aria-label": "Loading earnings" }, void 0, !1, {
                  fileName: "/app/code/client/pages/Riders.jsx",
                  lineNumber: 337,
                  columnNumber: 74
                }, this) }, void 0, !1, {
                  fileName: "/app/code/client/pages/Riders.jsx",
                  lineNumber: 337,
                  columnNumber: 42
                }, this);
              }
              let q = 0, re = 0;
              if (z && le) {
                const Ve = `${Y.id}:${z}:${le}`, Ke = W.get(Ve);
                q = (Ke == null ? void 0 : Ke.km) ?? 0, re = (Ke == null ? void 0 : Ke.rideCount) ?? 0;
              } else {
                const Ve = de.keys[de.keys.length - 2];
                q = Number(((Pe = Y.monthlyCounts) == null ? void 0 : Pe[Ve]) || 0);
                const Ke = Array.isArray(Y.orders) ? Y.orders : [];
                re = Number(((et = Y.monthlyRideCounts) == null ? void 0 : et[Ve]) ?? P_(Ke, Ve) ?? 0);
              }
              const Re = q * k + re * ue;
              return /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-earnings", children: Number.isFinite(Re) ? `${Re.toFixed(2)} Rs.` : "0 Rs." }, void 0, !1, {
                fileName: "/app/code/client/pages/Riders.jsx",
                lineNumber: 356,
                columnNumber: 29
              }, this);
            })(),
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-performance", children: (() => {
              if (z && le) {
                const q = `${Y.id}:${z}:${le}`, re = W.get(q);
                if (!re) return /* @__PURE__ */ s.jsxDEV("span", { className: "cell-loader loader-sm", "aria-busy": "true", "aria-label": "Loading performance" }, void 0, !1, {
                  fileName: "/app/code/client/pages/Riders.jsx",
                  lineNumber: 362,
                  columnNumber: 42
                }, this);
                const Re = (re == null ? void 0 : re.performancePct) ?? 0;
                return `${Number(Re)}%`;
              }
              return Number.isFinite(Number(Y.performancePct)) ? `${Math.round(Number(Y.performancePct))}%` : "0%";
            })() }, void 0, !1, {
              fileName: "/app/code/client/pages/Riders.jsx",
              lineNumber: 358,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-total", children: typeof Y.totalDistance == "string" && Y.totalDistance.trim() ? Y.totalDistance : `${Number(Y.totalKm || 0).toFixed(2)} km` }, void 0, !1, {
              fileName: "/app/code/client/pages/Riders.jsx",
              lineNumber: 368,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-actions", children: /* @__PURE__ */ s.jsxDEV("div", { className: "actions-container", children: [
              /* @__PURE__ */ s.jsxDEV("button", { className: "rc-select rc-chip btn-edit-rider", "aria-label": "Edit rider", title: "Edit rider", onClick: () => P(Y), children: /* @__PURE__ */ s.jsxDEV("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ s.jsxDEV("path", { d: "M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zm2.92 2.33H5v-.92l9.06-9.06.92.92L5.92 19.58zM20.71 7.04a1.003 1.003 0 0 0 0-1.42l-2.34-2.34a1.003 1.003 0 0 0-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.82z" }, void 0, !1, {
                fileName: "/app/code/client/pages/Riders.jsx",
                lineNumber: 372,
                columnNumber: 147
              }, this) }, void 0, !1, {
                fileName: "/app/code/client/pages/Riders.jsx",
                lineNumber: 372,
                columnNumber: 25
              }, this) }, void 0, !1, {
                fileName: "/app/code/client/pages/Riders.jsx",
                lineNumber: 371,
                columnNumber: 23
              }, this),
              /* @__PURE__ */ s.jsxDEV("button", { className: "rc-select rc-chip btn-delete-rider", "aria-label": "Delete rider", title: "Delete rider", onClick: async () => {
                if (window.confirm("Delete this rider?"))
                  try {
                    const re = await fetch(`/api/riders/${encodeURIComponent(Y.id)}`, { method: "DELETE", credentials: "include" });
                    if (re.status === 401) {
                      window.location.href = "/auth/login";
                      return;
                    }
                    if (!re.ok) {
                      const Re = await re.text().catch(() => "");
                      alert(Re || "Failed to delete");
                      return;
                    }
                    g((Re) => Re.filter((Pe) => String(Pe.id) !== String(Y.id))), pe((Re) => ({ ...Re, total: Math.max(0, (Re.total || 1) - 1) }));
                  } catch (re) {
                    alert(String((re == null ? void 0 : re.message) || "Failed to delete"));
                  }
              }, children: /* @__PURE__ */ s.jsxDEV("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ s.jsxDEV("path", { d: "M6 7h12v2H6V7zm2 3h8l-.8 9.6c-.06.75-.69 1.32-1.44 1.32H10.24c-.75 0-1.38-.57-1.44-1.32L8 10zM9 4h6l1 2H8l1-2z" }, void 0, !1, {
                fileName: "/app/code/client/pages/Riders.jsx",
                lineNumber: 385,
                columnNumber: 147
              }, this) }, void 0, !1, {
                fileName: "/app/code/client/pages/Riders.jsx",
                lineNumber: 385,
                columnNumber: 25
              }, this) }, void 0, !1, {
                fileName: "/app/code/client/pages/Riders.jsx",
                lineNumber: 374,
                columnNumber: 23
              }, this)
            ] }, void 0, !0, {
              fileName: "/app/code/client/pages/Riders.jsx",
              lineNumber: 370,
              columnNumber: 21
            }, this) }, void 0, !1, {
              fileName: "/app/code/client/pages/Riders.jsx",
              lineNumber: 369,
              columnNumber: 19
            }, this)
          ] }, Y.id, !0, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 321,
            columnNumber: 17
          }, this)),
          !d && !R && Q.length === 0 && /* @__PURE__ */ s.jsxDEV("tr", { children: /* @__PURE__ */ s.jsxDEV("td", { colSpan: 7, className: "section-note", children: "No riders found." }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 392,
            columnNumber: 21
          }, this) }, void 0, !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 392,
            columnNumber: 17
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Riders.jsx",
          lineNumber: 313,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 302,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Riders.jsx",
      lineNumber: 287,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ s.jsxDEV("div", { className: "rc-toolbar", "aria-label": "pagination", children: /* @__PURE__ */ s.jsxDEV("div", { className: "rc-filters", children: [
      /* @__PURE__ */ s.jsxDEV("button", { className: "rc-select rc-chip", disabled: te.page <= 1 || d, onClick: () => x((Y) => Math.max(1, Y - 1)), children: "Prev" }, void 0, !1, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 400,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ s.jsxDEV("span", { className: "section-note", children: [
        "Page ",
        te.page,
        " of ",
        te.pages,
        " • ",
        te.total,
        " total"
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 401,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ s.jsxDEV("button", { className: "rc-select rc-chip", disabled: te.page >= te.pages || d, onClick: () => x((Y) => Math.min(te.pages, Y + 1)), children: "Next" }, void 0, !1, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 402,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Riders.jsx",
      lineNumber: 399,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/pages/Riders.jsx",
      lineNumber: 398,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "/app/code/client/pages/Riders.jsx",
    lineNumber: 262,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "/app/code/client/pages/Riders.jsx",
    lineNumber: 261,
    columnNumber: 5
  }, this);
}
const Fh = /^(-?\d+(?:\.\d+)?)\s*(m|min|mins|minutes)$/i, px = /^(-?\d+(?:\.\d+)?)\s*(s|sec|secs|seconds)$/i;
function Ba(o) {
  return o !== null && typeof o == "object";
}
function ui(o) {
  if (o == null) return null;
  if (o instanceof Date) return o;
  if (typeof (o == null ? void 0 : o.toDate) == "function")
    try {
      const f = o.toDate();
      if (f instanceof Date && !Number.isNaN(f.getTime())) return f;
    } catch {
      return null;
    }
  if (Ba(o) && o.seconds !== void 0) {
    const f = Number(o.seconds);
    if (Number.isFinite(f)) {
      const p = f * 1e3;
      return new Date(p);
    }
  }
  if (typeof o == "number") {
    if (!Number.isFinite(o)) return null;
    if (o > 1e12) return new Date(o);
    if (o > 1e9) return new Date(o * 1e3);
  }
  if (typeof o == "string") {
    const f = o.trim();
    if (!f) return null;
    let p = f;
    const g = p.match(/^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2})\.(\d+)(.*)$/);
    g && g[2].length > 3 && (p = `${g[1]}.${g[2].slice(0, 3)}${g[3]}`);
    const b = Date.parse(p);
    if (Number.isFinite(b)) return new Date(b);
  }
  if (Ba(o)) {
    if (o.at) return ui(o.at);
    if (o.value && o.value !== o) return ui(o.value);
    if (o.expectedAt) return ui(o.expectedAt);
  }
  return null;
}
function xd(o) {
  if (o == null || o === "") return null;
  if (typeof o == "number")
    return Number.isFinite(o) ? o : null;
  if (o instanceof Date) return null;
  if (typeof o == "string") {
    const f = o.trim();
    if (!f) return null;
    if (Fh.test(f)) return parseFloat(f.replace(Fh, "$1"));
    if (px.test(f)) return parseFloat(f.replace(px, "$1")) / 60;
    const p = Number(f);
    return Number.isFinite(p) ? p : null;
  }
  if (Ba(o)) {
    if (Number.isFinite(o.minutes)) return Number(o.minutes);
    if (Number.isFinite(o.expectedMinutes)) return Number(o.expectedMinutes);
    if (Number.isFinite(o.seconds)) return Number(o.seconds) / 60;
    if (o.duration !== void 0 && o.duration !== o) {
      const f = xd(o.duration);
      if (f !== null) return f;
    }
    if (o.value !== void 0 && o.value !== o) {
      const f = xd(o.value);
      if (f !== null) return f;
    }
  }
  return null;
}
function B_(o) {
  var p, g, b, S, d, w;
  if (!Ba(o)) return null;
  const f = [
    o.durationMins,
    o.duration_minutes,
    o.deliveryDuration,
    o.delivery_duration,
    o.actualDuration,
    o.actual_duration,
    o.actualDurationMinutes,
    (p = o.orders) == null ? void 0 : p.deliveryDuration,
    (g = o.orders) == null ? void 0 : g.delivery_duration,
    (b = o.orders) == null ? void 0 : b.durationMins,
    (S = o.orders) == null ? void 0 : S.duration_minutes,
    (d = o.orders) == null ? void 0 : d.actualDuration,
    (w = o.orders) == null ? void 0 : w.actualDurationMinutes
  ];
  for (const R of f) {
    const j = xd(R);
    if (j !== null) return j;
  }
  return null;
}
function $_(o) {
  var p, g, b, S;
  if (!Ba(o)) return null;
  const f = [
    o.deliveredAt,
    o.actual_delivery_time,
    o.actualDeliveryTime,
    o.deliveryEndTime,
    o.delivery_end_time,
    (p = o.orders) == null ? void 0 : p.deliveredAt,
    (g = o.orders) == null ? void 0 : g.actual_delivery_time,
    (b = o.orders) == null ? void 0 : b.actualDeliveryTime,
    (S = o.orders) == null ? void 0 : S.deliveryEndTime
  ];
  for (const d of f)
    if (d != null) return d;
  return null;
}
function kx(o) {
  var p, g, b, S, d, w;
  if (!Ba(o)) return null;
  const f = [
    o.deliveryStartTime,
    o.delivery_start_time,
    o.start_time,
    o.startTime,
    o.started_at,
    o.startedAt,
    (p = o.orders) == null ? void 0 : p.deliveryStartTime,
    (g = o.orders) == null ? void 0 : g.delivery_start_time,
    (b = o.orders) == null ? void 0 : b.start_time,
    (S = o.orders) == null ? void 0 : S.startTime,
    (d = o.orders) == null ? void 0 : d.started_at,
    (w = o.orders) == null ? void 0 : w.startedAt
  ];
  for (const R of f)
    if (R != null) return R;
  return null;
}
function I_(o) {
  if (!Ba(o)) return null;
  const f = kx(o);
  return f ?? null;
}
function Ux(o) {
  if (!Ba(o)) return null;
  const f = B_(o);
  if (Number.isFinite(f)) return f;
  const p = ui($_(o)), g = ui(kx(o));
  if (p instanceof Date && g instanceof Date) {
    const b = p.getTime() - g.getTime();
    if (b >= 0)
      return Math.round(b / 6e4);
  }
  return null;
}
function Fx(o) {
  const f = ui(o);
  if (!(f instanceof Date) || Number.isNaN(f.getTime())) return "-";
  try {
    return f.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } catch {
    return "-";
  }
}
function zx(o) {
  if (o == null) return "-";
  if (Ba(o) && o.minutes !== void 0) {
    const p = Number(o.minutes);
    if (Number.isFinite(p)) return `${p} min`;
  }
  const f = ui(o);
  if (f instanceof Date && !Number.isNaN(f.getTime()))
    try {
      return f.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    } catch {
      return "-";
    }
  if (typeof o == "number")
    return Number.isFinite(o) ? `${Math.round(o)} min` : "-";
  if (typeof o == "string") {
    const p = o.trim();
    if (!p) return "-";
    const g = p.match(Fh);
    return g ? `${g[1].replace(/\.0+$/, "").replace(/(\.\d*[1-9])0+$/, "$1")} min` : p;
  }
  if (Ba(o) && o.expectedMinutes !== void 0) {
    const p = Number(o.expectedMinutes);
    if (Number.isFinite(p)) return `${p} min`;
  }
  return String(o);
}
function Px(o) {
  var g, b, S, d, w, R, j, F;
  if (!Ba(o)) return null;
  const f = [
    o.expected_delivery_time,
    o.expectedDeliveryTime,
    (g = o.order) == null ? void 0 : g.expected_delivery_time,
    (b = o.order) == null ? void 0 : b.expectedDeliveryTime,
    (S = o.orders) == null ? void 0 : S.expected_delivery_time,
    (d = o.orders) == null ? void 0 : d.expectedDeliveryTime,
    (w = o.delivery) == null ? void 0 : w.expected_delivery_time,
    (R = o.delivery) == null ? void 0 : R.expectedDeliveryTime,
    (j = o.expected_delivery) == null ? void 0 : j.time,
    (F = o.expected_delivery) == null ? void 0 : F.minutes,
    o.expected_time,
    o.expectedTime,
    o.expectedMinutes
  ];
  for (const x of f)
    if (x != null && !(typeof x == "string" && !x.trim()))
      return x;
  const p = o.delivery_events || o.deliveryEvents || o.events || null;
  if (Array.isArray(p))
    for (let x = p.length - 1; x >= 0; x -= 1) {
      const T = p[x];
      if (!T) continue;
      const L = typeof T.type == "string" ? T.type.toLowerCase().trim() : "";
      if (!(L !== "eta" && L !== "expected")) {
        if (T.expectedMinutes !== void 0 && T.expectedMinutes !== null) return { minutes: T.expectedMinutes };
        if (T.minutes !== void 0 && T.minutes !== null) return { minutes: T.minutes };
        if (T.expectedAt) return T.expectedAt;
      }
    }
  return null;
}
function Hx(o) {
  const f = xd(o);
  if (f === null || !Number.isFinite(f)) return "-";
  const p = Math.round(f);
  if (p < 60) return `${p} min`;
  const g = Math.floor(p / 60), b = p % 60;
  return `${g}h ${b}m`;
}
function Y_() {
  var x;
  const { id: o } = Uw(), [f, p] = y.useState(null), [g, b] = y.useState(!0), [S, d] = y.useState("");
  if (y.useEffect(() => {
    let T = !0;
    return (async () => {
      b(!0), d("");
      try {
        const L = await fetch(`/api/riders/${o}`, { credentials: "include" });
        if (L.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!L.ok) throw new Error("Failed to load rider");
        const te = await L.json();
        T && p(te);
      } catch (L) {
        T && d(L.message || "Failed to load rider");
      } finally {
        T && b(!1);
      }
    })(), () => {
      T = !1;
    };
  }, [o]), g)
    return /* @__PURE__ */ s.jsxDEV(Mr, { children: /* @__PURE__ */ s.jsxDEV("section", { className: "section-page", children: /* @__PURE__ */ s.jsxDEV("div", { className: "section-note", children: "Loading…" }, void 0, !1, {
      fileName: "/app/code/client/pages/RiderProfile.jsx",
      lineNumber: 29,
      columnNumber: 58
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/pages/RiderProfile.jsx",
      lineNumber: 29,
      columnNumber: 24
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/pages/RiderProfile.jsx",
      lineNumber: 29,
      columnNumber: 12
    }, this);
  if (S)
    return /* @__PURE__ */ s.jsxDEV(Mr, { children: /* @__PURE__ */ s.jsxDEV("section", { className: "section-page", children: /* @__PURE__ */ s.jsxDEV("div", { className: "auth-error", children: S }, void 0, !1, {
      fileName: "/app/code/client/pages/RiderProfile.jsx",
      lineNumber: 32,
      columnNumber: 58
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/pages/RiderProfile.jsx",
      lineNumber: 32,
      columnNumber: 24
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/pages/RiderProfile.jsx",
      lineNumber: 32,
      columnNumber: 12
    }, this);
  if (!f)
    return /* @__PURE__ */ s.jsxDEV(Mr, { children: /* @__PURE__ */ s.jsxDEV("section", { className: "section-page", children: /* @__PURE__ */ s.jsxDEV("div", { className: "section-note", children: "Not found" }, void 0, !1, {
      fileName: "/app/code/client/pages/RiderProfile.jsx",
      lineNumber: 35,
      columnNumber: 58
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/pages/RiderProfile.jsx",
      lineNumber: 35,
      columnNumber: 24
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/pages/RiderProfile.jsx",
      lineNumber: 35,
      columnNumber: 12
    }, this);
  const { rider: w, metrics: R, history: j } = f, F = Number.isFinite(Number(R == null ? void 0 : R.onTimeRate)) ? Math.round(Number(R.onTimeRate)) : 0;
  return /* @__PURE__ */ s.jsxDEV(Mr, { children: /* @__PURE__ */ s.jsxDEV("section", { className: "rider-commissions", children: [
    /* @__PURE__ */ s.jsxDEV("header", { className: "rc-header", children: [
      /* @__PURE__ */ s.jsxDEV("h2", { className: "rc-title", children: "Rider Profile" }, void 0, !1, {
        fileName: "/app/code/client/pages/RiderProfile.jsx",
        lineNumber: 45,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ s.jsxDEV("p", { className: "rc-subtitle", children: "View detailed performance metrics for individual riders." }, void 0, !1, {
        fileName: "/app/code/client/pages/RiderProfile.jsx",
        lineNumber: 46,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/RiderProfile.jsx",
      lineNumber: 44,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ s.jsxDEV("div", { className: "rc-table-wrapper rp-card", children: /* @__PURE__ */ s.jsxDEV("div", { className: "rp-details", children: [
      /* @__PURE__ */ s.jsxDEV("img", { src: "https://cdn.builder.io/api/v1/image/assets%2Fa5647e4ccf094d4d939a079b9f892c1c%2Ff54e0df2f0fb4bff9c894340e2efe67a?format=webp&width=72", alt: "avatar", className: "rp-avatar" }, void 0, !1, {
        fileName: "/app/code/client/pages/RiderProfile.jsx",
        lineNumber: 51,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ s.jsxDEV("div", { children: [
        /* @__PURE__ */ s.jsxDEV("h3", { className: "rp-name", children: w.name }, void 0, !1, {
          fileName: "/app/code/client/pages/RiderProfile.jsx",
          lineNumber: 53,
          columnNumber: 15
        }, this),
        /* @__PURE__ */ s.jsxDEV("div", { className: "section-note", children: [
          "Rider ID: ",
          w.id
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/RiderProfile.jsx",
          lineNumber: 54,
          columnNumber: 15
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/RiderProfile.jsx",
        lineNumber: 52,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/RiderProfile.jsx",
      lineNumber: 50,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/pages/RiderProfile.jsx",
      lineNumber: 49,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ s.jsxDEV("div", { className: "rc-toolbar rp-stats", children: /* @__PURE__ */ s.jsxDEV("div", { className: "rc-filters rp-stats-wrap", children: [
      /* @__PURE__ */ s.jsxDEV("div", { className: "rc-select rc-chip", children: [
        "Total Deliveries ",
        /* @__PURE__ */ s.jsxDEV("strong", { children: Array.isArray(w.orders) ? w.orders.length : 0 }, void 0, !1, {
          fileName: "/app/code/client/pages/RiderProfile.jsx",
          lineNumber: 61,
          columnNumber: 70
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/RiderProfile.jsx",
        lineNumber: 61,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ s.jsxDEV("div", { className: "rc-select rc-chip", children: [
        "On-Time Rate ",
        /* @__PURE__ */ s.jsxDEV("strong", { children: [
          F,
          "%"
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/RiderProfile.jsx",
          lineNumber: 62,
          columnNumber: 66
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/RiderProfile.jsx",
        lineNumber: 62,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ s.jsxDEV("div", { className: "rc-select rc-chip", children: [
        "Total KM Traveled ",
        /* @__PURE__ */ s.jsxDEV("strong", { children: [
          Number((R == null ? void 0 : R.totalKm) || 0),
          " km"
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/RiderProfile.jsx",
          lineNumber: 63,
          columnNumber: 71
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/RiderProfile.jsx",
        lineNumber: 63,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/RiderProfile.jsx",
      lineNumber: 60,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/pages/RiderProfile.jsx",
      lineNumber: 59,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ s.jsxDEV("div", { className: "rc-table-wrapper", children: /* @__PURE__ */ s.jsxDEV("table", { className: "rc-table", children: [
      /* @__PURE__ */ s.jsxDEV("thead", { children: /* @__PURE__ */ s.jsxDEV("tr", { children: [
        /* @__PURE__ */ s.jsxDEV("th", { className: "col-name order-heading", children: "Order" }, void 0, !1, {
          fileName: "/app/code/client/pages/RiderProfile.jsx",
          lineNumber: 71,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ s.jsxDEV("th", { className: "col-km date-heading", children: "Date" }, void 0, !1, {
          fileName: "/app/code/client/pages/RiderProfile.jsx",
          lineNumber: 72,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ s.jsxDEV("th", { className: "col-start-time start-heading", children: "Start" }, void 0, !1, {
          fileName: "/app/code/client/pages/RiderProfile.jsx",
          lineNumber: 73,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ s.jsxDEV("th", { className: "col-expected expected-heading", children: "Expected" }, void 0, !1, {
          fileName: "/app/code/client/pages/RiderProfile.jsx",
          lineNumber: 74,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ s.jsxDEV("th", { className: "col-actual actual-heading", children: "Actual" }, void 0, !1, {
          fileName: "/app/code/client/pages/RiderProfile.jsx",
          lineNumber: 75,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ s.jsxDEV("th", { className: "col-comm distance-heading", children: "Distance (KM)" }, void 0, !1, {
          fileName: "/app/code/client/pages/RiderProfile.jsx",
          lineNumber: 76,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/RiderProfile.jsx",
        lineNumber: 70,
        columnNumber: 15
      }, this) }, void 0, !1, {
        fileName: "/app/code/client/pages/RiderProfile.jsx",
        lineNumber: 69,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ s.jsxDEV("tbody", { children: [
        (f.riderOrders || []).map((T, L) => {
          const te = T.name || T.orderId, pe = ui(T.created_at), ie = pe instanceof Date && !Number.isNaN(pe.getTime()) ? pe.toISOString().slice(0, 10) : "-", ce = Fx(T.deliveryStartTime), K = Px(T), P = zx(K), I = Ux(T), ee = Hx(I), z = Number(T.distance_km), U = Number.isFinite(z) ? `${z.toFixed(2)} km` : typeof T.distance_km == "string" && T.distance_km.trim() ? T.distance_km : "-";
          return /* @__PURE__ */ s.jsxDEV("tr", { children: [
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-name order-cell", children: te }, void 0, !1, {
              fileName: "/app/code/client/pages/RiderProfile.jsx",
              lineNumber: 95,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-km date-cell", children: ie }, void 0, !1, {
              fileName: "/app/code/client/pages/RiderProfile.jsx",
              lineNumber: 96,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-start-time start-cell", children: ce }, void 0, !1, {
              fileName: "/app/code/client/pages/RiderProfile.jsx",
              lineNumber: 97,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-expected expected-cell", children: P }, void 0, !1, {
              fileName: "/app/code/client/pages/RiderProfile.jsx",
              lineNumber: 98,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-actual actual-time-cell", children: ee }, void 0, !1, {
              fileName: "/app/code/client/pages/RiderProfile.jsx",
              lineNumber: 99,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-commission distance-cell", children: U }, void 0, !1, {
              fileName: "/app/code/client/pages/RiderProfile.jsx",
              lineNumber: 100,
              columnNumber: 21
            }, this)
          ] }, T.orderId || L, !0, {
            fileName: "/app/code/client/pages/RiderProfile.jsx",
            lineNumber: 94,
            columnNumber: 19
          }, this);
        }),
        !((x = f.riderOrders) != null && x.length) && (j || []).map((T, L) => /* @__PURE__ */ s.jsxDEV("tr", { children: [
          /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-name order-cell", children: T.date }, void 0, !1, {
            fileName: "/app/code/client/pages/RiderProfile.jsx",
            lineNumber: 106,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-km date-cell", children: T.deliveries }, void 0, !1, {
            fileName: "/app/code/client/pages/RiderProfile.jsx",
            lineNumber: 107,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-start-time start-cell", children: "-" }, void 0, !1, {
            fileName: "/app/code/client/pages/RiderProfile.jsx",
            lineNumber: 108,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-expected expected-cell", children: T.avgTime ? `${T.avgTime} min` : "-" }, void 0, !1, {
            fileName: "/app/code/client/pages/RiderProfile.jsx",
            lineNumber: 109,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-actual actual-time-cell", children: "-" }, void 0, !1, {
            fileName: "/app/code/client/pages/RiderProfile.jsx",
            lineNumber: 110,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-commission distance-cell", children: Number.isFinite(Number(T.distanceKm)) ? `${Number(T.distanceKm).toFixed(2)} km` : T.distanceKm || "-" }, void 0, !1, {
            fileName: "/app/code/client/pages/RiderProfile.jsx",
            lineNumber: 111,
            columnNumber: 19
          }, this)
        ] }, `h-${L}`, !0, {
          fileName: "/app/code/client/pages/RiderProfile.jsx",
          lineNumber: 105,
          columnNumber: 17
        }, this))
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/RiderProfile.jsx",
        lineNumber: 79,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/RiderProfile.jsx",
      lineNumber: 68,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/pages/RiderProfile.jsx",
      lineNumber: 67,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "/app/code/client/pages/RiderProfile.jsx",
    lineNumber: 43,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "/app/code/client/pages/RiderProfile.jsx",
    lineNumber: 42,
    columnNumber: 5
  }, this);
}
function Bx({ orderId: o, onClose: f, onAssigned: p }) {
  const [g, b] = y.useState([]), [S, d] = y.useState([]), [w, R] = y.useState(""), [j, F] = y.useState(""), [x, T] = y.useState(""), [L, te] = y.useState(""), [pe, ie] = y.useState(!0), [ce, K] = y.useState(!0), [P, I] = y.useState(""), [ee, z] = y.useState(""), [U, le] = y.useState(!1);
  y.useEffect(() => {
    let k = !0;
    return (async () => {
      ie(!0), I("");
      try {
        const ue = await fetch("/api/riders?limit=200", { credentials: "include" });
        if (ue.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!ue.ok) throw new Error("Failed to load riders");
        const de = await ue.json();
        k && b(Array.isArray(de.riders) ? de.riders : []);
      } catch (ue) {
        k && I(ue.message || "Failed to load riders");
      } finally {
        k && ie(!1);
      }
    })(), () => {
      k = !1;
    };
  }, []), y.useEffect(() => {
    let k = !0;
    return (async () => {
      K(!0), z("");
      try {
        const ue = await fetch("/api/packers?limit=200", { credentials: "include" });
        if (ue.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!ue.ok) throw new Error("Failed to load packers");
        const de = await ue.json();
        k && d(Array.isArray(de.packers) ? de.packers : []);
      } catch (ue) {
        k && z(ue.message || "Failed to load packers");
      } finally {
        k && K(!1);
      }
    })(), () => {
      k = !1;
    };
  }, []);
  async function X() {
    if (!w || !j) {
      alert("Please select both a rider and a packer");
      return;
    }
    if (!x.trim()) {
      alert("Please enter a payment method");
      return;
    }
    if (!L.trim()) {
      alert("Please enter an amount");
      return;
    }
    le(!0);
    try {
      const k = await fetch(`/api/orders/${encodeURIComponent(o)}/assign`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ riderId: w, paymentMethod: x.trim(), amount: L.trim() })
      });
      if (k.status === 401) {
        window.location.href = "/auth/login";
        return;
      }
      const ue = await k.json().catch(() => null);
      if (!k.ok) throw new Error(ue && ue.error ? ue.error : "Assign failed");
      const de = await fetch(`/api/orders/${encodeURIComponent(o)}/assign-packer`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packerId: j, paymentMethod: x.trim(), amount: L.trim() })
      });
      if (de.status === 401) {
        window.location.href = "/auth/login";
        return;
      }
      const Y = await de.json().catch(() => null);
      if (!de.ok) throw new Error(Y && Y.error ? Y.error : "Assign failed");
      p && p({ orderId: o, riderId: w, packerId: j, paymentMethod: x.trim(), amount: L.trim() });
      try {
        window && typeof window.showToast == "function" && window.showToast("Order assigned successfully", { type: "success" });
      } catch {
      }
      f();
    } catch (k) {
      alert(k.message || "Failed to assign");
    } finally {
      le(!1);
    }
  }
  const W = P || "", oe = ee || "", Q = pe || ce;
  return /* @__PURE__ */ s.jsxDEV("div", { className: "assign-modal-backdrop", role: "dialog", "aria-modal": "true", children: /* @__PURE__ */ s.jsxDEV("div", { className: "assign-modal", children: [
    /* @__PURE__ */ s.jsxDEV("header", { className: "assign-modal-header", children: [
      /* @__PURE__ */ s.jsxDEV("h3", { className: "assign-modal-title", children: "Assign Rider & Packer" }, void 0, !1, {
        fileName: "/app/code/client/components/AssignModal.jsx",
        lineNumber: 101,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ s.jsxDEV("button", { className: "assign-modal-close", onClick: f, "aria-label": "Close", children: "✕" }, void 0, !1, {
        fileName: "/app/code/client/components/AssignModal.jsx",
        lineNumber: 102,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/components/AssignModal.jsx",
      lineNumber: 100,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ s.jsxDEV("div", { className: "assign-modal-body", children: Q ? /* @__PURE__ */ s.jsxDEV("div", { className: "section-note", children: "Loading…" }, void 0, !1, {
      fileName: "/app/code/client/components/AssignModal.jsx",
      lineNumber: 106,
      columnNumber: 13
    }, this) : /* @__PURE__ */ s.jsxDEV(s.Fragment, { children: [
      /* @__PURE__ */ s.jsxDEV("div", { className: "assign-form", children: [
        /* @__PURE__ */ s.jsxDEV("div", { className: "form-group", children: [
          /* @__PURE__ */ s.jsxDEV("label", { className: "field-label", children: [
            "Select Rider",
            /* @__PURE__ */ s.jsxDEV(
              "select",
              {
                className: "field-input assign-dropdown",
                value: w,
                onChange: (k) => R(k.target.value),
                disabled: U,
                children: [
                  /* @__PURE__ */ s.jsxDEV("option", { value: "", children: "-- Choose a rider --" }, void 0, !1, {
                    fileName: "/app/code/client/components/AssignModal.jsx",
                    lineNumber: 118,
                    columnNumber: 23
                  }, this),
                  [...g].sort((k, ue) => k.name.localeCompare(ue.name)).map((k) => /* @__PURE__ */ s.jsxDEV("option", { value: k.id, children: k.name }, k.id, !1, {
                    fileName: "/app/code/client/components/AssignModal.jsx",
                    lineNumber: 120,
                    columnNumber: 25
                  }, this))
                ]
              },
              void 0,
              !0,
              {
                fileName: "/app/code/client/components/AssignModal.jsx",
                lineNumber: 112,
                columnNumber: 21
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "/app/code/client/components/AssignModal.jsx",
            lineNumber: 111,
            columnNumber: 19
          }, this),
          W && /* @__PURE__ */ s.jsxDEV("div", { className: "auth-error", children: W }, void 0, !1, {
            fileName: "/app/code/client/components/AssignModal.jsx",
            lineNumber: 124,
            columnNumber: 34
          }, this),
          g.length === 0 && !W && /* @__PURE__ */ s.jsxDEV("div", { className: "section-note", children: "No riders available" }, void 0, !1, {
            fileName: "/app/code/client/components/AssignModal.jsx",
            lineNumber: 125,
            columnNumber: 58
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/components/AssignModal.jsx",
          lineNumber: 110,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ s.jsxDEV("div", { className: "form-group", children: [
          /* @__PURE__ */ s.jsxDEV("label", { className: "field-label", children: [
            "Select Packer",
            /* @__PURE__ */ s.jsxDEV(
              "select",
              {
                className: "field-input assign-dropdown",
                value: j,
                onChange: (k) => F(k.target.value),
                disabled: U,
                children: [
                  /* @__PURE__ */ s.jsxDEV("option", { value: "", children: "-- Choose a packer --" }, void 0, !1, {
                    fileName: "/app/code/client/components/AssignModal.jsx",
                    lineNumber: 136,
                    columnNumber: 23
                  }, this),
                  [...S].sort((k, ue) => k.name.localeCompare(ue.name)).map((k) => /* @__PURE__ */ s.jsxDEV("option", { value: k.id, children: k.name }, k.id, !1, {
                    fileName: "/app/code/client/components/AssignModal.jsx",
                    lineNumber: 138,
                    columnNumber: 25
                  }, this))
                ]
              },
              void 0,
              !0,
              {
                fileName: "/app/code/client/components/AssignModal.jsx",
                lineNumber: 130,
                columnNumber: 21
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "/app/code/client/components/AssignModal.jsx",
            lineNumber: 129,
            columnNumber: 19
          }, this),
          oe && /* @__PURE__ */ s.jsxDEV("div", { className: "auth-error", children: oe }, void 0, !1, {
            fileName: "/app/code/client/components/AssignModal.jsx",
            lineNumber: 142,
            columnNumber: 35
          }, this),
          S.length === 0 && !oe && /* @__PURE__ */ s.jsxDEV("div", { className: "section-note", children: "No packers available" }, void 0, !1, {
            fileName: "/app/code/client/components/AssignModal.jsx",
            lineNumber: 143,
            columnNumber: 60
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/components/AssignModal.jsx",
          lineNumber: 128,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ s.jsxDEV("div", { className: "form-group", children: /* @__PURE__ */ s.jsxDEV("label", { className: "field-label", children: [
          "Payment Method",
          /* @__PURE__ */ s.jsxDEV(
            "input",
            {
              type: "text",
              className: "field-input assign-dropdown",
              placeholder: "e.g., Cash, Card, Online",
              value: x,
              onChange: (k) => T(k.target.value),
              disabled: U
            },
            void 0,
            !1,
            {
              fileName: "/app/code/client/components/AssignModal.jsx",
              lineNumber: 148,
              columnNumber: 21
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "/app/code/client/components/AssignModal.jsx",
          lineNumber: 147,
          columnNumber: 19
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/components/AssignModal.jsx",
          lineNumber: 146,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ s.jsxDEV("div", { className: "form-group", children: /* @__PURE__ */ s.jsxDEV("label", { className: "field-label", children: [
          "Amount",
          /* @__PURE__ */ s.jsxDEV(
            "input",
            {
              type: "text",
              className: "field-input assign-dropdown",
              placeholder: "e.g., 500",
              value: L,
              onChange: (k) => te(k.target.value),
              disabled: U
            },
            void 0,
            !1,
            {
              fileName: "/app/code/client/components/AssignModal.jsx",
              lineNumber: 161,
              columnNumber: 21
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "/app/code/client/components/AssignModal.jsx",
          lineNumber: 160,
          columnNumber: 19
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/components/AssignModal.jsx",
          lineNumber: 159,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/components/AssignModal.jsx",
        lineNumber: 109,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ s.jsxDEV("div", { className: "assign-modal-actions", children: [
        /* @__PURE__ */ s.jsxDEV("button", { className: "btn-secondary", onClick: f, disabled: U, children: "Cancel" }, void 0, !1, {
          fileName: "/app/code/client/components/AssignModal.jsx",
          lineNumber: 174,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ s.jsxDEV("button", { className: "btn-primary", onClick: X, disabled: U || !w || !j, children: U ? "Assigning…" : "Assign" }, void 0, !1, {
          fileName: "/app/code/client/components/AssignModal.jsx",
          lineNumber: 175,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/components/AssignModal.jsx",
        lineNumber: 173,
        columnNumber: 15
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/components/AssignModal.jsx",
      lineNumber: 108,
      columnNumber: 13
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/components/AssignModal.jsx",
      lineNumber: 104,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "/app/code/client/components/AssignModal.jsx",
    lineNumber: 99,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "/app/code/client/components/AssignModal.jsx",
    lineNumber: 98,
    columnNumber: 5
  }, this);
}
function q_({ order: o, onClose: f, onUpdated: p }) {
  const [g, b] = y.useState([]), [S, d] = y.useState([]), [w, R] = y.useState(""), [j, F] = y.useState(""), [x, T] = y.useState(""), [L, te] = y.useState(""), [pe, ie] = y.useState(!0), [ce, K] = y.useState(""), [P, I] = y.useState(!1);
  y.useEffect(() => {
    let z = !0;
    return (async () => {
      var U;
      ie(!0), K("");
      try {
        const le = await fetch("/api/riders?limit=200", { credentials: "include" });
        if (le.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!le.ok) throw new Error("Failed to load riders");
        const X = await le.json();
        if (z) {
          b(Array.isArray(X.riders) ? X.riders : []);
          const W = ((U = o.assignment) == null ? void 0 : U.riderId) || o.riderId || o.rider_id || "";
          R(String(W));
        }
      } catch (le) {
        z && K(le.message || "Failed to load riders");
      } finally {
        z && ie(!1);
      }
    })(), () => {
      z = !1;
    };
  }, [o]), y.useEffect(() => {
    let z = !0;
    return (async () => {
      var U;
      try {
        const le = await fetch("/api/packers?limit=200", { credentials: "include" });
        if (le.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!le.ok) throw new Error("Failed to load packers");
        const X = await le.json();
        if (z) {
          d(Array.isArray(X.packers) ? X.packers : []);
          const W = ((U = o.assignment) == null ? void 0 : U.packerId) || o.packed_by || o.packer_id || "";
          F(String(W));
        }
      } catch (le) {
        z && K(le.message || "Failed to load packers");
      }
    })(), () => {
      z = !1;
    };
  }, [o]), y.useEffect(() => {
    var le, X;
    const z = ((le = o.assignment) == null ? void 0 : le.paymentMethod) || o.paymentMethod || "", U = ((X = o.assignment) == null ? void 0 : X.amount) || o.amount || "";
    T(String(z)), te(String(U));
  }, [o]);
  async function ee() {
    if (!w || !j) {
      alert("Please select both a rider and a packer");
      return;
    }
    if (!x.trim()) {
      alert("Please enter a payment method");
      return;
    }
    if (!L.trim()) {
      alert("Please enter an amount");
      return;
    }
    I(!0);
    try {
      const z = o.name || o.order_number || o.id, U = await fetch(`/api/orders/${encodeURIComponent(z)}/assign`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ riderId: w, paymentMethod: x.trim(), amount: L.trim() })
      });
      if (U.status === 401) {
        window.location.href = "/auth/login";
        return;
      }
      const le = await U.json().catch(() => null);
      if (!U.ok) throw new Error(le && le.error ? le.error : "Update failed");
      const X = await fetch(`/api/orders/${encodeURIComponent(z)}/assign-packer`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packerId: j, paymentMethod: x.trim(), amount: L.trim() })
      });
      if (X.status === 401) {
        window.location.href = "/auth/login";
        return;
      }
      const W = await X.json().catch(() => null);
      if (!X.ok) throw new Error(W && W.error ? W.error : "Update failed");
      try {
        window && typeof window.showToast == "function" && window.showToast("Order updated successfully", { type: "success" });
      } catch {
      }
      p && p(), f();
    } catch (z) {
      alert(z.message || "Failed to update order");
    } finally {
      I(!1);
    }
  }
  return /* @__PURE__ */ s.jsxDEV("div", { className: "edit-modal-backdrop", role: "dialog", "aria-modal": "true", children: /* @__PURE__ */ s.jsxDEV("div", { className: "edit-modal", children: [
    /* @__PURE__ */ s.jsxDEV("header", { className: "edit-modal-header", children: [
      /* @__PURE__ */ s.jsxDEV("h3", { className: "edit-modal-title", children: "Edit Order Assignment" }, void 0, !1, {
        fileName: "/app/code/client/components/EditOrderModal.jsx",
        lineNumber: 108,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ s.jsxDEV("button", { className: "edit-modal-close", onClick: f, "aria-label": "Close", children: "✕" }, void 0, !1, {
        fileName: "/app/code/client/components/EditOrderModal.jsx",
        lineNumber: 109,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/components/EditOrderModal.jsx",
      lineNumber: 107,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ s.jsxDEV("div", { className: "edit-modal-body", children: pe ? /* @__PURE__ */ s.jsxDEV("div", { className: "section-note", children: "Loading…" }, void 0, !1, {
      fileName: "/app/code/client/components/EditOrderModal.jsx",
      lineNumber: 113,
      columnNumber: 13
    }, this) : /* @__PURE__ */ s.jsxDEV(s.Fragment, { children: [
      ce && /* @__PURE__ */ s.jsxDEV("div", { className: "auth-error", children: ce }, void 0, !1, {
        fileName: "/app/code/client/components/EditOrderModal.jsx",
        lineNumber: 116,
        columnNumber: 25
      }, this),
      /* @__PURE__ */ s.jsxDEV("div", { className: "edit-form", children: [
        /* @__PURE__ */ s.jsxDEV("div", { className: "form-group", children: [
          /* @__PURE__ */ s.jsxDEV("label", { className: "field-label", children: [
            "Select Rider",
            /* @__PURE__ */ s.jsxDEV(
              "select",
              {
                className: "field-input edit-dropdown",
                value: w,
                onChange: (z) => R(z.target.value),
                disabled: P,
                children: [
                  /* @__PURE__ */ s.jsxDEV("option", { value: "", children: "-- Choose a rider --" }, void 0, !1, {
                    fileName: "/app/code/client/components/EditOrderModal.jsx",
                    lineNumber: 126,
                    columnNumber: 23
                  }, this),
                  [...g].sort((z, U) => z.name.localeCompare(U.name)).map((z) => /* @__PURE__ */ s.jsxDEV("option", { value: z.id, children: z.name }, z.id, !1, {
                    fileName: "/app/code/client/components/EditOrderModal.jsx",
                    lineNumber: 128,
                    columnNumber: 25
                  }, this))
                ]
              },
              void 0,
              !0,
              {
                fileName: "/app/code/client/components/EditOrderModal.jsx",
                lineNumber: 120,
                columnNumber: 21
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "/app/code/client/components/EditOrderModal.jsx",
            lineNumber: 119,
            columnNumber: 19
          }, this),
          g.length === 0 && !ce && /* @__PURE__ */ s.jsxDEV("div", { className: "section-note", children: "No riders available" }, void 0, !1, {
            fileName: "/app/code/client/components/EditOrderModal.jsx",
            lineNumber: 132,
            columnNumber: 53
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/components/EditOrderModal.jsx",
          lineNumber: 118,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ s.jsxDEV("div", { className: "form-group", children: [
          /* @__PURE__ */ s.jsxDEV("label", { className: "field-label", children: [
            "Select Packer",
            /* @__PURE__ */ s.jsxDEV(
              "select",
              {
                className: "field-input edit-dropdown",
                value: j,
                onChange: (z) => F(z.target.value),
                disabled: P,
                children: [
                  /* @__PURE__ */ s.jsxDEV("option", { value: "", children: "-- Choose a packer --" }, void 0, !1, {
                    fileName: "/app/code/client/components/EditOrderModal.jsx",
                    lineNumber: 143,
                    columnNumber: 23
                  }, this),
                  [...S].sort((z, U) => z.name.localeCompare(U.name)).map((z) => /* @__PURE__ */ s.jsxDEV("option", { value: z.id, children: z.name }, z.id, !1, {
                    fileName: "/app/code/client/components/EditOrderModal.jsx",
                    lineNumber: 145,
                    columnNumber: 25
                  }, this))
                ]
              },
              void 0,
              !0,
              {
                fileName: "/app/code/client/components/EditOrderModal.jsx",
                lineNumber: 137,
                columnNumber: 21
              },
              this
            )
          ] }, void 0, !0, {
            fileName: "/app/code/client/components/EditOrderModal.jsx",
            lineNumber: 136,
            columnNumber: 19
          }, this),
          S.length === 0 && !ce && /* @__PURE__ */ s.jsxDEV("div", { className: "section-note", children: "No packers available" }, void 0, !1, {
            fileName: "/app/code/client/components/EditOrderModal.jsx",
            lineNumber: 149,
            columnNumber: 54
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/components/EditOrderModal.jsx",
          lineNumber: 135,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ s.jsxDEV("div", { className: "form-group", children: /* @__PURE__ */ s.jsxDEV("label", { className: "field-label", children: [
          "Payment Method",
          /* @__PURE__ */ s.jsxDEV(
            "input",
            {
              type: "text",
              className: "field-input edit-dropdown",
              placeholder: "e.g., Cash, Card, Online",
              value: x,
              onChange: (z) => T(z.target.value),
              disabled: P
            },
            void 0,
            !1,
            {
              fileName: "/app/code/client/components/EditOrderModal.jsx",
              lineNumber: 154,
              columnNumber: 21
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "/app/code/client/components/EditOrderModal.jsx",
          lineNumber: 153,
          columnNumber: 19
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/components/EditOrderModal.jsx",
          lineNumber: 152,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ s.jsxDEV("div", { className: "form-group", children: /* @__PURE__ */ s.jsxDEV("label", { className: "field-label", children: [
          "Amount",
          /* @__PURE__ */ s.jsxDEV(
            "input",
            {
              type: "text",
              className: "field-input edit-dropdown",
              placeholder: "e.g., 500",
              value: L,
              onChange: (z) => te(z.target.value),
              disabled: P
            },
            void 0,
            !1,
            {
              fileName: "/app/code/client/components/EditOrderModal.jsx",
              lineNumber: 167,
              columnNumber: 21
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "/app/code/client/components/EditOrderModal.jsx",
          lineNumber: 166,
          columnNumber: 19
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/components/EditOrderModal.jsx",
          lineNumber: 165,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/components/EditOrderModal.jsx",
        lineNumber: 117,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ s.jsxDEV("div", { className: "edit-modal-actions", children: [
        /* @__PURE__ */ s.jsxDEV("button", { className: "btn-secondary", onClick: f, disabled: P, children: "Cancel" }, void 0, !1, {
          fileName: "/app/code/client/components/EditOrderModal.jsx",
          lineNumber: 180,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ s.jsxDEV("button", { className: "btn-primary", onClick: ee, disabled: P || !w || !j, children: P ? "Updating…" : "Update" }, void 0, !1, {
          fileName: "/app/code/client/components/EditOrderModal.jsx",
          lineNumber: 181,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/components/EditOrderModal.jsx",
        lineNumber: 179,
        columnNumber: 15
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/components/EditOrderModal.jsx",
      lineNumber: 115,
      columnNumber: 13
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/components/EditOrderModal.jsx",
      lineNumber: 111,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "/app/code/client/components/EditOrderModal.jsx",
    lineNumber: 106,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "/app/code/client/components/EditOrderModal.jsx",
    lineNumber: 105,
    columnNumber: 5
  }, this);
}
function G_({ order: o, onClose: f }) {
  const p = (o == null ? void 0 : o.image) || null;
  return /* @__PURE__ */ s.jsxDEV("div", { className: "image-modal-backdrop", role: "dialog", "aria-modal": "true", onClick: f, children: /* @__PURE__ */ s.jsxDEV("div", { className: "image-modal", onClick: (g) => g.stopPropagation(), children: [
    /* @__PURE__ */ s.jsxDEV("header", { className: "image-modal-header", children: [
      /* @__PURE__ */ s.jsxDEV("h3", { className: "image-modal-title", children: "Order Image" }, void 0, !1, {
        fileName: "/app/code/client/components/ImageModal.jsx",
        lineNumber: 10,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ s.jsxDEV("button", { className: "image-modal-close", onClick: f, "aria-label": "Close", children: "✕" }, void 0, !1, {
        fileName: "/app/code/client/components/ImageModal.jsx",
        lineNumber: 11,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/components/ImageModal.jsx",
      lineNumber: 9,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ s.jsxDEV("div", { className: "image-modal-body", children: p ? /* @__PURE__ */ s.jsxDEV("img", { src: p, alt: "Order delivery proof", className: "image-modal-img" }, void 0, !1, {
      fileName: "/app/code/client/components/ImageModal.jsx",
      lineNumber: 15,
      columnNumber: 13
    }, this) : /* @__PURE__ */ s.jsxDEV("div", { className: "section-note", children: "No image available" }, void 0, !1, {
      fileName: "/app/code/client/components/ImageModal.jsx",
      lineNumber: 17,
      columnNumber: 13
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/components/ImageModal.jsx",
      lineNumber: 13,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "/app/code/client/components/ImageModal.jsx",
    lineNumber: 8,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "/app/code/client/components/ImageModal.jsx",
    lineNumber: 7,
    columnNumber: 5
  }, this);
}
function zh(o) {
  if (typeof o != "string") return "";
  const f = o.toLowerCase().trim().replace(/[\s-]+/g, "_");
  return f === "in_transit" ? "in_progress" : f;
}
function $x(o) {
  return o && typeof o.current_status == "string" ? o.current_status : "";
}
function hx(o) {
  return zh($x(o));
}
const W_ = [
  { key: "all", label: "All" },
  { key: "new", label: "New" },
  { key: "assigned", label: "Assigned" },
  { key: "pending", label: "Pending" },
  { key: "in-progress", label: "In-Progress" },
  { key: "completed", label: "delivered" }
], vx = {
  completed: "delivered",
  "in-progress": "in_progress",
  "in-transit": "in_progress"
};
function K_() {
  const [o, f] = y.useState([]), [p, g] = y.useState(""), [b, S] = y.useState("all"), [d, w] = y.useState(1), [R, j] = y.useState(20), [F, x] = y.useState({ total: 0, page: 1, limit: 20, pages: 1 }), [T, L] = y.useState(!0), [te, pe] = y.useState(""), [ie, ce] = y.useState(""), [K, P] = y.useState(!0), [I, ee] = y.useState(0), [z, U] = y.useState(!1), [le, X] = y.useState(null), [W, oe] = y.useState(!1), [Q, k] = y.useState(null), [ue, de] = y.useState(!1), [Y, q] = y.useState(null), [re, Re] = y.useState(""), [Pe, et] = y.useState("");
  y.useEffect(() => {
    let Z = !0;
    return (async () => {
      var Ge, ut, vt, ht;
      L(!0), pe(""), ce("");
      try {
        const ot = new URLSearchParams();
        if (p && ot.set("q", p), b && b !== "all") {
          const Ln = vx[b] || b;
          ot.set("status", zh(Ln));
        }
        ot.set("page", String(d)), ot.set("limit", String(R));
        const zt = await fetch(`/api/orders?${ot.toString()}`, { credentials: "include" });
        if (zt.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!zt.ok) throw new Error("Failed to load orders");
        const Pt = await zt.json();
        Z && (f(Array.isArray(Pt.orders) ? Pt.orders : []), ce(Pt.shopifyError || ""), P(!!Pt.shopifyConfigured), x({ total: ((Ge = Pt.meta) == null ? void 0 : Ge.total) || 0, page: ((ut = Pt.meta) == null ? void 0 : ut.page) || 1, limit: ((vt = Pt.meta) == null ? void 0 : vt.limit) || R, pages: ((ht = Pt.meta) == null ? void 0 : ht.pages) || 1 }));
      } catch (ot) {
        Z && pe(ot.message || "Failed to load orders");
      } finally {
        Z && L(!1);
      }
    })(), () => {
      Z = !1;
    };
  }, [p, b, d, R, I]);
  async function Ve() {
    try {
      const Z = new URLSearchParams();
      re && Z.set("from", re), Pe && Z.set("to", Pe), p && Z.set("q", p), b && b !== "all" && Z.set("status", b);
      const Ge = await fetch(`/api/orders/export?${Z.toString()}`, { credentials: "include" });
      if (Ge.status === 401) {
        window.location.href = "/auth/login";
        return;
      }
      if (!Ge.ok) throw new Error("Failed to generate export");
      const ut = await Ge.blob(), vt = URL.createObjectURL(ut), ht = document.createElement("a");
      ht.href = vt, ht.download = `orders_${re || "all"}_${Pe || "all"}.csv`, document.body.appendChild(ht), ht.click(), ht.remove(), URL.revokeObjectURL(vt);
    } catch (Z) {
      try {
        window && typeof window.showToast == "function" && window.showToast(Z.message || "Failed to download CSV", { type: "error" });
      } catch {
      }
    }
  }
  y.useMemo(() => o, [o]);
  const Ke = y.useMemo(() => {
    if (!Array.isArray(o)) return [];
    if (b === "all") return o.slice();
    const Z = zh(vx[b] || b);
    return o.filter((Ge) => hx(Ge) === Z);
  }, [o, b]);
  function at() {
    X(null), U(!1);
  }
  function Ft(Z) {
    k(Z), oe(!0);
  }
  function Et() {
    k(null), oe(!1);
  }
  function Vt(Z) {
    q(Z), de(!0);
  }
  function An() {
    q(null), de(!1);
  }
  function Gt(Z) {
    try {
      const { orderId: Ge } = Z || {};
      if (!Ge) return;
      const ut = String(Ge).replace(/^#+/, "");
      w(1);
      try {
        window && typeof window.showToast == "function" && window.showToast(`Order assigned: ${Ge}`, { type: "success" });
      } catch {
      }
    } catch {
    }
  }
  async function Wt(Z) {
    if (Z)
      try {
        const Ge = await fetch(`/api/orders/${encodeURIComponent(Z)}/unassign`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" }
        });
        if (Ge.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!Ge.ok) throw new Error("Failed to unassign order");
        try {
          window && typeof window.showToast == "function" && window.showToast(`Order unassigned: ${Z}`, { type: "success" });
        } catch {
        }
        w(1), ee((ut) => ut + 1);
      } catch (Ge) {
        try {
          window && typeof window.showToast == "function" && window.showToast(Ge.message || "Failed to unassign order", { type: "error" });
        } catch {
        }
      }
  }
  return /* @__PURE__ */ s.jsxDEV(Mr, { children: /* @__PURE__ */ s.jsxDEV("section", { className: "rider-commissions", children: [
    /* @__PURE__ */ s.jsxDEV("header", { className: "rc-header", children: [
      /* @__PURE__ */ s.jsxDEV("div", { className: "rc-header-left", children: [
        /* @__PURE__ */ s.jsxDEV("h2", { className: "rc-title", children: "Order Management" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 170,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ s.jsxDEV("p", { className: "rc-subtitle", children: "Manage orders synced from Shopify." }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 171,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 169,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ s.jsxDEV("div", { className: "rc-date-range", children: [
        /* @__PURE__ */ s.jsxDEV("label", { className: "date-field", children: [
          /* @__PURE__ */ s.jsxDEV("span", { className: "sr-only", children: "From date" }, void 0, !1, {
            fileName: "/app/code/client/pages/Orders.jsx",
            lineNumber: 176,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ s.jsxDEV("input", { "aria-label": "From date", className: "date-input", type: "date", value: re, onChange: (Z) => Re(Z.target.value) }, void 0, !1, {
            fileName: "/app/code/client/pages/Orders.jsx",
            lineNumber: 177,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 175,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ s.jsxDEV("label", { className: "date-field", children: [
          /* @__PURE__ */ s.jsxDEV("span", { className: "sr-only", children: "To date" }, void 0, !1, {
            fileName: "/app/code/client/pages/Orders.jsx",
            lineNumber: 180,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ s.jsxDEV("input", { "aria-label": "To date", className: "date-input", type: "date", value: Pe, onChange: (Z) => et(Z.target.value) }, void 0, !1, {
            fileName: "/app/code/client/pages/Orders.jsx",
            lineNumber: 181,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 179,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ s.jsxDEV("button", { className: "rc-select rc-chip download-csv-btn", onClick: Ve, children: "Download CSV" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 183,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 174,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 168,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ s.jsxDEV("div", { className: "rc-toolbar", children: [
      /* @__PURE__ */ s.jsxDEV("div", { className: "rc-search", children: [
        /* @__PURE__ */ s.jsxDEV("span", { className: "rc-search-icon", "aria-hidden": "true" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 189,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ s.jsxDEV("input", { className: "rc-search-input", type: "search", placeholder: "Search", value: p, onChange: (Z) => {
          g(Z.target.value), w(1);
        } }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 190,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 188,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ s.jsxDEV("div", { className: "rc-filters", children: W_.map(({ key: Z, label: Ge }) => /* @__PURE__ */ s.jsxDEV("button", { className: `rc-select rc-chip${b === Z ? " active" : ""}`, onClick: () => {
        S(Z), w(1);
      }, "data-filter": Z, children: Ge }, Z, !1, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 194,
        columnNumber: 15
      }, this)) }, void 0, !1, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 192,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 187,
      columnNumber: 9
    }, this),
    !K && /* @__PURE__ */ s.jsxDEV("div", { className: "section-note", children: "Shopify is not configured. Set SHOPIFY_SHOP and SHOPIFY_ADMIN_TOKEN to enable orders sync." }, void 0, !1, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 202,
      columnNumber: 11
    }, this),
    ie && /* @__PURE__ */ s.jsxDEV("div", { className: "auth-error", children: ie }, void 0, !1, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 204,
      columnNumber: 25
    }, this),
    /* @__PURE__ */ s.jsxDEV("div", { className: "rc-table-wrapper orders-table-scroll", children: /* @__PURE__ */ s.jsxDEV("table", { className: "rc-table", children: [
      /* @__PURE__ */ s.jsxDEV("thead", { children: /* @__PURE__ */ s.jsxDEV("tr", { children: [
        /* @__PURE__ */ s.jsxDEV("th", { className: "col-name order-id-heading", children: "Order" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 210,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ s.jsxDEV("th", { className: "col-km customer-heading", children: "Customer" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 211,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ s.jsxDEV("th", { className: "col-perf address-heading", children: "Address" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 212,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ s.jsxDEV("th", { className: "col-rider rider-heading", children: "Rider" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 213,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ s.jsxDEV("th", { className: "col-packer packer-heading", children: "Packer" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 214,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ s.jsxDEV("th", { className: "col-start-time start-heading", children: "Start" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 215,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ s.jsxDEV("th", { className: "col-expected expected-heading", children: "Expected" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 216,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ s.jsxDEV("th", { className: "col-actual actual-heading", children: "Actual" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 217,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ s.jsxDEV("th", { className: "col-amount amount-heading", children: "Amount" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 218,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ s.jsxDEV("th", { className: "col-payment payment-heading", children: "Payment Method" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 219,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ s.jsxDEV("th", { className: "col-status status-heading", children: "Status" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 220,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ s.jsxDEV("th", { className: "col-actions actions-heading", children: "Actions" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 221,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 209,
        columnNumber: 15
      }, this) }, void 0, !1, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 208,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ s.jsxDEV("tbody", { children: [
        T && /* @__PURE__ */ s.jsxDEV("tr", { children: /* @__PURE__ */ s.jsxDEV("td", { colSpan: 12, className: "section-note", children: "Loading…" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 226,
          columnNumber: 21
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 226,
          columnNumber: 17
        }, this),
        !T && te && /* @__PURE__ */ s.jsxDEV("tr", { children: /* @__PURE__ */ s.jsxDEV("td", { colSpan: 12, className: "auth-error", children: te }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 229,
          columnNumber: 21
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 229,
          columnNumber: 17
        }, this),
        !T && !te && Ke.map((Z, Ge) => {
          var hn, xa, ua;
          const ut = $x(Z), vt = hx(Z), ht = Z.full_name || (Z.customer && Z.customer.full_name ? Z.customer.full_name : "");
          let ot = "-";
          typeof Z.shipping_address == "string" && String(Z.shipping_address).trim() ? ot = String(Z.shipping_address).trim() : Z.shipping_address && typeof Z.shipping_address == "object" ? ot = [Z.shipping_address.address1 || "", Z.shipping_address.city || "", Z.shipping_address.province || "", Z.shipping_address.country || ""].map((fe) => String(fe || "").trim()).filter(Boolean).join(", ") || "-" : typeof Z.billing_address == "string" && String(Z.billing_address).trim() ? ot = String(Z.billing_address).trim() : Z.billing_address && typeof Z.billing_address == "object" && (ot = [Z.billing_address.address1 || "", Z.billing_address.city || "", Z.billing_address.province || "", Z.billing_address.country || ""].map((fe) => String(fe || "").trim()).filter(Boolean).join(", ") || "-");
          const zt = Z.name || Z.order_number || Z.id, Pt = zt != null ? String(zt).replace(/^#+/, "").trim() : "", Ln = Pt || "-", Dn = I_(Z), on = Fx(Dn), Kt = Px(Z), mn = zx(Kt), sa = Ux(Z), Ht = Hx(sa), pn = Z.rider ? String(Z.rider) : (hn = Z.assignment) != null && hn.riderId ? String(Z.assignment.riderId) : "Unassigned";
          return /* @__PURE__ */ s.jsxDEV("tr", { "data-status": vt, children: [
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-name order-id-cell", children: Ln }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 260,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-km customer-cell", children: ht || "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 261,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-perf address-cell", children: ot }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 262,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-rider rider-cell", children: pn }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 263,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-packer packer-cell", children: Z.packerName || (Z.packed_by ? String(Z.packed_by) : "-") }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 264,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-start-time start-cell", children: on }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 265,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-expected expected-cell", children: mn }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 266,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-actual actual-time-cell", children: Ht }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 267,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-amount amount-cell", children: Z.amount || ((xa = Z.assignment) == null ? void 0 : xa.amount) || "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 268,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-payment payment-cell", children: Z.paymentMethod || ((ua = Z.assignment) == null ? void 0 : ua.paymentMethod) || "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 269,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-status status-cell", children: /* @__PURE__ */ s.jsxDEV("span", { className: `status-chip status-${vt}`, children: ut }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 271,
              columnNumber: 23
            }, this) }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 270,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-actions actions-cell", children: /* @__PURE__ */ s.jsxDEV("div", { className: "actions-container", children: [
              vt === "assigned" && /* @__PURE__ */ s.jsxDEV(
                "button",
                {
                  className: "status-unassign-btn icon-black",
                  onClick: () => Wt(Pt),
                  "aria-label": "Unassign order",
                  title: "Unassign order",
                  children: /* @__PURE__ */ s.jsxDEV("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ s.jsxDEV("path", { d: "M18.3 5.71a1 1 0 0 0-1.41 0L12 10.59 7.11 5.7A1 1 0 0 0 5.7 7.11L10.59 12l-4.9 4.89a1 1 0 1 0 1.41 1.41L12 13.41l4.89 4.9a1 1 0 0 0 1.41-1.41L13.41 12l4.9-4.89a1 1 0 0 0-.01-1.4z" }, void 0, !1, {
                    fileName: "/app/code/client/pages/Orders.jsx",
                    lineNumber: 282,
                    columnNumber: 151
                  }, this) }, void 0, !1, {
                    fileName: "/app/code/client/pages/Orders.jsx",
                    lineNumber: 282,
                    columnNumber: 29
                  }, this)
                },
                void 0,
                !1,
                {
                  fileName: "/app/code/client/pages/Orders.jsx",
                  lineNumber: 276,
                  columnNumber: 27
                },
                this
              ),
              /* @__PURE__ */ s.jsxDEV(
                "button",
                {
                  className: "status-photo-btn icon-black",
                  "aria-label": "View photo",
                  title: "View photo",
                  disabled: vt !== "delivered",
                  onClick: () => vt === "delivered" && Vt(Z),
                  children: /* @__PURE__ */ s.jsxDEV("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": "true", children: [
                    /* @__PURE__ */ s.jsxDEV("path", { d: "M21 5h-3.17l-1.41-1.41A2 2 0 0 0 15 3H9a2 2 0 0 0-1.41.59L6.17 5H3a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm0 13H3V7h4.05l1.41-1.41.01-.01L9 5h6l.53.58L17.95 7H21v11z" }, void 0, !1, {
                      fileName: "/app/code/client/pages/Orders.jsx",
                      lineNumber: 292,
                      columnNumber: 149
                    }, this),
                    /* @__PURE__ */ s.jsxDEV("path", { d: "M12 8a5 5 0 1 0 .001 10.001A5 5 0 0 0 12 8zm0 8a3 3 0 1 1 .001-6.001A3 3 0 0 1 12 16z" }, void 0, !1, {
                      fileName: "/app/code/client/pages/Orders.jsx",
                      lineNumber: 292,
                      columnNumber: 351
                    }, this)
                  ] }, void 0, !0, {
                    fileName: "/app/code/client/pages/Orders.jsx",
                    lineNumber: 292,
                    columnNumber: 27
                  }, this)
                },
                void 0,
                !1,
                {
                  fileName: "/app/code/client/pages/Orders.jsx",
                  lineNumber: 285,
                  columnNumber: 25
                },
                this
              ),
              /* @__PURE__ */ s.jsxDEV(
                "button",
                {
                  className: "status-edit-btn icon-black",
                  onClick: () => Ft(Z),
                  "aria-label": "Edit order",
                  title: "Edit order",
                  children: /* @__PURE__ */ s.jsxDEV("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ s.jsxDEV("path", { d: "M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zm2.92 2.33H5v-.92l9.06-9.06.92.92L5.92 19.58zM20.71 7.04a1.003 1.003 0 0 0 0-1.42l-2.34-2.34a1.003 1.003 0 0 0-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.82z" }, void 0, !1, {
                    fileName: "/app/code/client/pages/Orders.jsx",
                    lineNumber: 300,
                    columnNumber: 149
                  }, this) }, void 0, !1, {
                    fileName: "/app/code/client/pages/Orders.jsx",
                    lineNumber: 300,
                    columnNumber: 27
                  }, this)
                },
                void 0,
                !1,
                {
                  fileName: "/app/code/client/pages/Orders.jsx",
                  lineNumber: 294,
                  columnNumber: 25
                },
                this
              )
            ] }, void 0, !0, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 274,
              columnNumber: 23
            }, this) }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 273,
              columnNumber: 21
            }, this)
          ] }, zt || Ge, !0, {
            fileName: "/app/code/client/pages/Orders.jsx",
            lineNumber: 259,
            columnNumber: 19
          }, this);
        }),
        !T && !te && Ke.length === 0 && /* @__PURE__ */ s.jsxDEV("tr", { children: /* @__PURE__ */ s.jsxDEV("td", { colSpan: 12, className: "section-note", children: "No orders to display." }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 308,
          columnNumber: 21
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 308,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 224,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 207,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 206,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ s.jsxDEV("div", { className: "rc-toolbar", "aria-label": "pagination", children: [
      z && le && /* @__PURE__ */ s.jsxDEV(Bx, { orderId: le, onClose: at, onAssigned: Gt }, void 0, !1, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 315,
        columnNumber: 11
      }, this),
      W && Q && /* @__PURE__ */ s.jsxDEV(q_, { order: Q, onClose: Et, onUpdated: () => {
        ee((Z) => Z + 1), Et();
      } }, void 0, !1, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 318,
        columnNumber: 11
      }, this),
      ue && Y && /* @__PURE__ */ s.jsxDEV(G_, { order: Y, onClose: An }, void 0, !1, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 321,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ s.jsxDEV("div", { className: "rc-filters", children: [
        /* @__PURE__ */ s.jsxDEV("button", { className: "rc-select rc-chip", disabled: F.page <= 1 || T, onClick: () => w((Z) => Math.max(1, Z - 1)), children: "Prev" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 324,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ s.jsxDEV("span", { className: "section-note", children: [
          "Page ",
          F.page,
          " of ",
          F.pages,
          " • ",
          F.total,
          " total"
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 325,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ s.jsxDEV("button", { className: "rc-select rc-chip", disabled: F.page >= F.pages || T, onClick: () => w((Z) => Math.min(F.pages, Z + 1)), children: "Next" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 326,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 323,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 313,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "/app/code/client/pages/Orders.jsx",
    lineNumber: 167,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "/app/code/client/pages/Orders.jsx",
    lineNumber: 166,
    columnNumber: 5
  }, this);
}
function Q_() {
  const o = () => {
    const Q = /* @__PURE__ */ new Date(), k = Q.getFullYear(), ue = String(Q.getMonth() + 1).padStart(2, "0");
    return `${k}-${ue}-01`;
  }, f = () => {
    const Q = /* @__PURE__ */ new Date(), k = Q.getFullYear(), ue = String(Q.getMonth() + 1).padStart(2, "0"), de = String(Q.getDate()).padStart(2, "0");
    return `${k}-${ue}-${de}`;
  }, [p, g] = y.useState(o()), [b, S] = y.useState(f()), [d, w] = y.useState([]), [R, j] = y.useState([]), [F, x] = y.useState(!1), [T, L] = y.useState(!0), [te, pe] = y.useState(""), [ie, ce] = y.useState([]), [K, P] = y.useState(!1), [I, ee] = y.useState("");
  y.useEffect(() => {
    (async () => {
      var k;
      try {
        const ue = await fetch("/api/riders", { credentials: "include" });
        if (ue.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!ue.ok) throw new Error("Failed to load riders");
        const de = await ue.json(), Y = Array.isArray(de.riders) ? de.riders : Array.isArray((k = de.data) == null ? void 0 : k.riders) ? de.data.riders : Array.isArray(de.data) ? de.data : [];
        w(Y), j(Y.map((q) => q.id || q._id || ""));
      } catch (ue) {
        pe(ue.message || "Failed to load riders");
      } finally {
        L(!1);
      }
    })();
  }, []);
  const z = () => {
    R.length === d.length ? j([]) : j(d.map((Q) => Q.id || Q._id || ""));
  }, U = (Q) => {
    j(
      (k) => k.includes(Q) ? k.filter((ue) => ue !== Q) : [...k, Q]
    );
  }, le = () => {
    x(!0);
  };
  async function X() {
    ee(""), P(!0);
    try {
      const Q = Wh(), k = Number(Q == null ? void 0 : Q.baseFare) || Xn.baseFare, ue = Number(Q == null ? void 0 : Q.farePerKm) || Xn.farePerKm, de = R.length ? d.filter((re) => R.includes(re.id || re._id || "")) : d, q = (await Promise.all(de.map(async (re, Re) => {
        const Pe = re.id || re._id || "";
        let et = 0, Ve = 0;
        try {
          const at = new URLSearchParams({ fromDate: p, toDate: b }), Ft = await fetch(`/api/riders/${encodeURIComponent(Pe)}/km-in-range?${at.toString()}`, { credentials: "include" });
          if (Ft.status === 401)
            return window.location.href = "/auth/login", null;
          const Et = await Ft.json().catch(() => null);
          Ft.ok && Et && Et.ok && (et = Number(Et.totalKm) || 0, Ve = Number(Et.rideCount) || 0);
        } catch {
        }
        const Ke = et * ue + Ve * k;
        return {
          serial: Re + 1,
          riderName: re.name || re.firstName || "Unknown",
          totalShopifyRides: Ve,
          extraRides: 0,
          distanceKm: et,
          perKmRate: ue,
          totalCommission: Ke
        };
      }))).filter(Boolean);
      return ce(q), q;
    } catch (Q) {
      return ee((Q == null ? void 0 : Q.message) || "Failed to generate report"), [];
    } finally {
      P(!1), x(!1);
    }
  }
  function W(Q) {
    return Q.map((k) => `"${String(k ?? "").replace(/"/g, '""')}"`).join(",");
  }
  async function oe() {
    const Q = ie.length ? ie : await X();
    if (!Q || !Q.length) return;
    const k = [];
    k.push(W(["Rider Commission Report"])), k.push(""), k.push(W(["To Date:", b])), k.push(W(["From Date:", p])), k.push("");
    const ue = ["Rider Name", "Total Shopify Rides", "Total Extra Rides", "Total Distance Travelled", "per km rate", "Total Commission"];
    k.push(W(ue));
    for (const Re of Q)
      k.push(W([
        Re.riderName,
        Re.totalShopifyRides,
        Re.extraRides,
        Number(Re.distanceKm).toFixed(2),
        Number(Re.perKmRate).toFixed(2),
        Number(Re.totalCommission).toFixed(2)
      ]));
    const de = "\uFEFF" + k.join(`
`), Y = new Blob([de], { type: "text/csv;charset=utf-8;" }), q = URL.createObjectURL(Y), re = document.createElement("a");
    re.href = q, re.download = `rider-commission-${p}_to_${b}.csv`, document.body.appendChild(re), re.click(), document.body.removeChild(re), URL.revokeObjectURL(q);
  }
  return /* @__PURE__ */ s.jsxDEV(Mr, { children: /* @__PURE__ */ s.jsxDEV("section", { className: "rider-commissions", children: /* @__PURE__ */ s.jsxDEV("div", { id: "tab-overview", children: [
    /* @__PURE__ */ s.jsxDEV("h3", { className: "rc-section-title", children: "Rider Commission Report" }, void 0, !1, {
      fileName: "/app/code/client/pages/Reports.jsx",
      lineNumber: 160,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ s.jsxDEV("div", { className: "rc-toolbar report-filter-bar", children: /* @__PURE__ */ s.jsxDEV("div", { className: "date-range-filters", children: [
      /* @__PURE__ */ s.jsxDEV("div", { className: "date-filter", children: [
        /* @__PURE__ */ s.jsxDEV("label", { htmlFor: "fromDate", className: "date-label", children: "From Date:" }, void 0, !1, {
          fileName: "/app/code/client/pages/Reports.jsx",
          lineNumber: 165,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ s.jsxDEV(
          "input",
          {
            id: "fromDate",
            type: "date",
            className: "date-input",
            value: p,
            onChange: (Q) => g(Q.target.value)
          },
          void 0,
          !1,
          {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 166,
            columnNumber: 17
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Reports.jsx",
        lineNumber: 164,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ s.jsxDEV("div", { className: "date-filter", children: [
        /* @__PURE__ */ s.jsxDEV("label", { htmlFor: "toDate", className: "date-label", children: "To Date:" }, void 0, !1, {
          fileName: "/app/code/client/pages/Reports.jsx",
          lineNumber: 176,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ s.jsxDEV(
          "input",
          {
            id: "toDate",
            type: "date",
            className: "date-input",
            value: b,
            onChange: (Q) => S(Q.target.value)
          },
          void 0,
          !1,
          {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 177,
            columnNumber: 17
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Reports.jsx",
        lineNumber: 175,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ s.jsxDEV("button", { className: "rc-button report-button", onClick: le, children: "Create Report" }, void 0, !1, {
        fileName: "/app/code/client/pages/Reports.jsx",
        lineNumber: 186,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ s.jsxDEV("button", { className: "rc-button download-button", onClick: oe, children: "Download" }, void 0, !1, {
        fileName: "/app/code/client/pages/Reports.jsx",
        lineNumber: 190,
        columnNumber: 15
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Reports.jsx",
      lineNumber: 163,
      columnNumber: 13
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/pages/Reports.jsx",
      lineNumber: 162,
      columnNumber: 11
    }, this),
    F && /* @__PURE__ */ s.jsxDEV("div", { className: "rider-selection-modal-overlay", onClick: () => x(!1), children: /* @__PURE__ */ s.jsxDEV("div", { className: "rider-selection-modal", onClick: (Q) => Q.stopPropagation(), children: [
      /* @__PURE__ */ s.jsxDEV("h4", { className: "modal-title", children: "Select Riders for Report" }, void 0, !1, {
        fileName: "/app/code/client/pages/Reports.jsx",
        lineNumber: 199,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ s.jsxDEV("div", { className: "modal-content", children: [
        /* @__PURE__ */ s.jsxDEV("button", { className: "select-all-button", onClick: z, children: R.length === d.length ? "Deselect All" : "Select All" }, void 0, !1, {
          fileName: "/app/code/client/pages/Reports.jsx",
          lineNumber: 202,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ s.jsxDEV("div", { className: "riders-list", children: d.map((Q) => /* @__PURE__ */ s.jsxDEV("label", { className: "rider-checkbox-label", children: [
          /* @__PURE__ */ s.jsxDEV(
            "input",
            {
              type: "checkbox",
              className: "rider-checkbox",
              checked: R.includes(Q.id || Q._id || ""),
              onChange: () => U(Q.id || Q._id || "")
            },
            void 0,
            !1,
            {
              fileName: "/app/code/client/pages/Reports.jsx",
              lineNumber: 209,
              columnNumber: 25
            },
            this
          ),
          /* @__PURE__ */ s.jsxDEV("span", { className: "rider-name", children: Q.name || Q.firstName || "Unknown" }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 215,
            columnNumber: 25
          }, this)
        ] }, Q.id || Q._id, !0, {
          fileName: "/app/code/client/pages/Reports.jsx",
          lineNumber: 208,
          columnNumber: 23
        }, this)) }, void 0, !1, {
          fileName: "/app/code/client/pages/Reports.jsx",
          lineNumber: 206,
          columnNumber: 19
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Reports.jsx",
        lineNumber: 201,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ s.jsxDEV("div", { className: "modal-actions", children: [
        /* @__PURE__ */ s.jsxDEV("button", { className: "cancel-button", onClick: () => x(!1), children: "Cancel" }, void 0, !1, {
          fileName: "/app/code/client/pages/Reports.jsx",
          lineNumber: 222,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ s.jsxDEV("button", { className: "confirm-button", onClick: X, children: "Generate Report" }, void 0, !1, {
          fileName: "/app/code/client/pages/Reports.jsx",
          lineNumber: 223,
          columnNumber: 19
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Reports.jsx",
        lineNumber: 221,
        columnNumber: 17
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Reports.jsx",
      lineNumber: 198,
      columnNumber: 15
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/pages/Reports.jsx",
      lineNumber: 197,
      columnNumber: 13
    }, this),
    I && /* @__PURE__ */ s.jsxDEV("div", { className: "auth-error", children: I }, void 0, !1, {
      fileName: "/app/code/client/pages/Reports.jsx",
      lineNumber: 229,
      columnNumber: 27
    }, this),
    K && /* @__PURE__ */ s.jsxDEV("div", { className: "section-note", children: "Generating…" }, void 0, !1, {
      fileName: "/app/code/client/pages/Reports.jsx",
      lineNumber: 230,
      columnNumber: 29
    }, this),
    !K && ie.length > 0 && /* @__PURE__ */ s.jsxDEV("div", { className: "report-table-wrap", children: [
      /* @__PURE__ */ s.jsxDEV("div", { className: "report-meta", children: [
        /* @__PURE__ */ s.jsxDEV("div", { children: [
          "To Date: ",
          b
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Reports.jsx",
          lineNumber: 234,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ s.jsxDEV("div", { children: [
          "From Date: ",
          p
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Reports.jsx",
          lineNumber: 235,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Reports.jsx",
        lineNumber: 233,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ s.jsxDEV("table", { className: "report-table", children: [
        /* @__PURE__ */ s.jsxDEV("thead", { children: /* @__PURE__ */ s.jsxDEV("tr", { children: [
          /* @__PURE__ */ s.jsxDEV("th", { children: "Rider Name" }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 240,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ s.jsxDEV("th", { children: "Total Shopify Rides" }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 241,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ s.jsxDEV("th", { children: "Total Extra Rides" }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 242,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ s.jsxDEV("th", { children: "Total Distance Travelled" }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 243,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ s.jsxDEV("th", { children: "per km rate" }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 244,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ s.jsxDEV("th", { children: "Total Commission" }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 245,
            columnNumber: 21
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Reports.jsx",
          lineNumber: 239,
          columnNumber: 19
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Reports.jsx",
          lineNumber: 238,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ s.jsxDEV("tbody", { children: ie.map((Q, k) => /* @__PURE__ */ s.jsxDEV("tr", { children: [
          /* @__PURE__ */ s.jsxDEV("td", { children: Q.riderName }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 251,
            columnNumber: 23
          }, this),
          /* @__PURE__ */ s.jsxDEV("td", { children: Q.totalShopifyRides }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 252,
            columnNumber: 23
          }, this),
          /* @__PURE__ */ s.jsxDEV("td", { children: Q.extraRides }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 253,
            columnNumber: 23
          }, this),
          /* @__PURE__ */ s.jsxDEV("td", { children: Number(Q.distanceKm).toFixed(2) }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 254,
            columnNumber: 23
          }, this),
          /* @__PURE__ */ s.jsxDEV("td", { children: Number(Q.perKmRate).toFixed(2) }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 255,
            columnNumber: 23
          }, this),
          /* @__PURE__ */ s.jsxDEV("td", { children: [
            Number(Q.totalCommission).toFixed(2),
            " Rs."
          ] }, void 0, !0, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 256,
            columnNumber: 23
          }, this)
        ] }, k, !0, {
          fileName: "/app/code/client/pages/Reports.jsx",
          lineNumber: 250,
          columnNumber: 21
        }, this)) }, void 0, !1, {
          fileName: "/app/code/client/pages/Reports.jsx",
          lineNumber: 248,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Reports.jsx",
        lineNumber: 237,
        columnNumber: 15
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Reports.jsx",
      lineNumber: 232,
      columnNumber: 13
    }, this)
  ] }, void 0, !0, {
    fileName: "/app/code/client/pages/Reports.jsx",
    lineNumber: 159,
    columnNumber: 9
  }, this) }, void 0, !1, {
    fileName: "/app/code/client/pages/Reports.jsx",
    lineNumber: 158,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "/app/code/client/pages/Reports.jsx",
    lineNumber: 157,
    columnNumber: 5
  }, this);
}
function X_({ onClose: o, onCreated: f }) {
  const [p, g] = y.useState(""), [b, S] = y.useState(""), [d, w] = y.useState(""), [R, j] = y.useState(!1), [F, x] = y.useState(""), [T, L] = y.useState(""), [te, pe] = y.useState(!1), [ie, ce] = y.useState(!1), [K, P] = y.useState(!1), [I, ee] = y.useState(!1), z = "+92";
  function U(X) {
    const W = String(X || "").replace(/\D+/g, "");
    return W.length === 0 ? "" : W.startsWith("92") ? z + W.slice(2) : z + W;
  }
  async function le() {
    x(""), L(""), ee(!0);
    const X = String(p), W = String(b).trim(), oe = String(d).trim(), Q = oe.replace(/\D+/g, ""), k = { fn: !W, cn: !oe, pw: !X };
    if (pe(k.fn), ce(k.cn || Q.length !== 10), P(k.pw), k.fn || k.cn || k.pw) {
      x("Full name, mobile and password are required");
      return;
    }
    if (Q.length !== 10) {
      x("numbers should be 10 digit"), ce(!0);
      return;
    }
    if (X.length < 6) {
      P(!0), x("Password must be at least 6 characters");
      return;
    }
    j(!0);
    try {
      const ue = U(oe), de = await fetch("/api/packers", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: X, fullName: W, contactNumber: ue })
      }), Y = await de.json().catch(() => null);
      if (!de.ok) {
        const q = String(Y && (Y.error || Y.message) || ""), re = q.toUpperCase();
        if (/MISSING\s*FULLNAME\/CONTACTNUMBER/i.test(q) || /MISSING\s*PASSWORD/i.test(q))
          x("Full name, mobile and password are required"), pe(!W), ce(!oe || Q.length !== 10), P(!X);
        else if (re.includes("WEAK_PASSWORD") || /AT LEAST 6 CHARACTERS/i.test(q))
          P(!0), x("Password must be at least 6 characters");
        else if (/INVALID CONTACT NUMBER|MUST BE EXACTLY 10 DIGITS|NUMBERS SHOULD BE 10 DIGIT/i.test(q))
          ce(!0), x("numbers should be 10 digit");
        else if (/FIREBASE NOT CONFIGURED/i.test(q))
          x("Service temporarily unavailable. Please try again later.");
        else
          throw new Error(q || "Failed to create packer");
        return;
      }
      L("Packer created successfully"), f && f(), setTimeout(() => {
        o && o();
      }, 600);
    } catch (ue) {
      const de = String((ue == null ? void 0 : ue.message) || "");
      /Missing\s*(fullName\/contactNumber|password)/i.test(de) ? x("Full name, mobile and password are required") : /WEAK_PASSWORD/i.test(de) || /AT LEAST 6 CHARACTERS/i.test(de) ? (P(!0), x("Password must be at least 6 characters")) : /INVALID CONTACT NUMBER|MUST BE EXACTLY 10 DIGITS|NUMBERS SHOULD BE 10 DIGIT/i.test(de) ? (ce(!0), x("numbers should be 10 digit")) : x(de || "Failed to create packer");
    } finally {
      j(!1);
    }
  }
  return /* @__PURE__ */ s.jsxDEV("div", { className: "create-rider-backdrop", role: "dialog", "aria-modal": "true", children: /* @__PURE__ */ s.jsxDEV("div", { className: "create-rider-modal", children: [
    /* @__PURE__ */ s.jsxDEV("header", { className: "create-rider-header", children: [
      /* @__PURE__ */ s.jsxDEV("h3", { className: "create-rider-title", children: "Create Packer" }, void 0, !1, {
        fileName: "/app/code/client/components/CreatePackerModal.jsx",
        lineNumber: 95,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ s.jsxDEV("button", { className: "create-rider-close", onClick: o, "aria-label": "Close", children: "✕" }, void 0, !1, {
        fileName: "/app/code/client/components/CreatePackerModal.jsx",
        lineNumber: 96,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/components/CreatePackerModal.jsx",
      lineNumber: 94,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ s.jsxDEV("div", { className: "create-rider-body", children: [
      T && /* @__PURE__ */ s.jsxDEV("div", { className: "auth-success", children: T }, void 0, !1, {
        fileName: "/app/code/client/components/CreatePackerModal.jsx",
        lineNumber: 99,
        columnNumber: 18
      }, this),
      /* @__PURE__ */ s.jsxDEV("label", { className: "field-label", children: [
        "Full name",
        /* @__PURE__ */ s.jsxDEV("input", { className: "field-input" + (I && !String(b).trim() ? " input-error" : ""), value: b, onChange: (X) => {
          S(X.target.value), I && pe(!String(X.target.value).trim());
        }, required: !0 }, void 0, !1, {
          fileName: "/app/code/client/components/CreatePackerModal.jsx",
          lineNumber: 101,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/components/CreatePackerModal.jsx",
        lineNumber: 100,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ s.jsxDEV("label", { className: "field-label", children: [
        "Password",
        /* @__PURE__ */ s.jsxDEV("input", { className: "field-input" + (I && !String(p) ? " input-error" : ""), type: "password", value: p, onChange: (X) => {
          g(X.target.value), I && P(!String(X.target.value));
        }, required: !0 }, void 0, !1, {
          fileName: "/app/code/client/components/CreatePackerModal.jsx",
          lineNumber: 104,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/components/CreatePackerModal.jsx",
        lineNumber: 103,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ s.jsxDEV("label", { className: "field-label", children: [
        "Contact number",
        /* @__PURE__ */ s.jsxDEV("div", { className: "phone-input-wrapper", children: [
          /* @__PURE__ */ s.jsxDEV("span", { className: "phone-prefix", children: "+92" }, void 0, !1, {
            fileName: "/app/code/client/components/CreatePackerModal.jsx",
            lineNumber: 108,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ s.jsxDEV(
            "input",
            {
              className: "field-input phone-input-field" + (I && String(d).trim().replace(/\D+/g, "").length !== 10 ? " input-error" : ""),
              type: "tel",
              inputMode: "tel",
              pattern: "[0-9]{10}",
              placeholder: "3001234567",
              value: d,
              onChange: (X) => {
                const W = X.target.value.replace(/\D+/g, "").slice(0, 10);
                w(W), I && ce(W.length !== 10);
              },
              required: !0
            },
            void 0,
            !1,
            {
              fileName: "/app/code/client/components/CreatePackerModal.jsx",
              lineNumber: 109,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "/app/code/client/components/CreatePackerModal.jsx",
          lineNumber: 107,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/components/CreatePackerModal.jsx",
        lineNumber: 106,
        columnNumber: 11
      }, this),
      F && /* @__PURE__ */ s.jsxDEV("div", { className: "auth-error", children: F }, void 0, !1, {
        fileName: "/app/code/client/components/CreatePackerModal.jsx",
        lineNumber: 127,
        columnNumber: 21
      }, this),
      /* @__PURE__ */ s.jsxDEV("div", { className: "create-rider-actions", children: [
        /* @__PURE__ */ s.jsxDEV("button", { className: "btn-secondary", onClick: o, disabled: R, children: "Cancel" }, void 0, !1, {
          fileName: "/app/code/client/components/CreatePackerModal.jsx",
          lineNumber: 129,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ s.jsxDEV("button", { className: "btn-primary", onClick: le, disabled: R, children: R ? "Creating…" : "Create" }, void 0, !1, {
          fileName: "/app/code/client/components/CreatePackerModal.jsx",
          lineNumber: 130,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/components/CreatePackerModal.jsx",
        lineNumber: 128,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/components/CreatePackerModal.jsx",
      lineNumber: 98,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "/app/code/client/components/CreatePackerModal.jsx",
    lineNumber: 93,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "/app/code/client/components/CreatePackerModal.jsx",
    lineNumber: 92,
    columnNumber: 5
  }, this);
}
function J_() {
  const [o, f] = y.useState([]), [p, g] = y.useState(!0), [b, S] = y.useState(""), [d, w] = y.useState(1), [R, j] = y.useState(25), [F, x] = y.useState({ total: 0, page: 1, limit: 25, pages: 1 });
  y.useEffect(() => {
    let z = !0;
    return (async () => {
      var U, le, X, W;
      g(!0), S("");
      try {
        const oe = new URLSearchParams();
        oe.set("limit", String(R)), oe.set("page", String(d)), oe.set("status", "new");
        const Q = await fetch(`/api/orders?${oe.toString()}`, { credentials: "include" });
        if (Q.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!Q.ok) throw new Error("Failed to load orders");
        const k = await Q.json();
        z && (f(Array.isArray(k.orders) ? k.orders : []), x({ total: ((U = k.meta) == null ? void 0 : U.total) || 0, page: ((le = k.meta) == null ? void 0 : le.page) || d, limit: ((X = k.meta) == null ? void 0 : X.limit) || R, pages: ((W = k.meta) == null ? void 0 : W.pages) || 1 }));
      } catch (oe) {
        z && S(oe.message || "Failed to load orders");
      } finally {
        z && g(!1);
      }
    })(), () => {
      z = !1;
    };
  }, [d]);
  function T(z) {
    return !z || typeof z != "object" ? "new" : typeof z.current_status == "string" && String(z.current_status).trim() ? String(z.current_status).toLowerCase().trim() : "new";
  }
  const [L, te] = y.useState(!1), [pe, ie] = y.useState(null), [ce, K] = y.useState(!1);
  function P(z) {
    ie(z), te(!0);
  }
  function I() {
    ie(null), te(!1);
  }
  function ee(z) {
    try {
      const { orderId: U } = z || {};
      if (!U) return;
      const le = String(U).replace(/^#+/, "");
      f((X) => X.filter((W, oe) => {
        const Q = String(W.id || W.name || W.order_number || oe).replace(/^#+/, "");
        return String(Q) !== String(le);
      })), x((X) => ({ ...X || {}, total: Math.max(0, ((X == null ? void 0 : X.total) || 0) - 1) }));
      try {
        window && typeof window.showToast == "function" && window.showToast(`Order assigned: ${U}`, { type: "success" });
      } catch {
      }
    } catch {
    }
  }
  return /* @__PURE__ */ s.jsxDEV(Mr, { children: /* @__PURE__ */ s.jsxDEV("section", { className: "dashboard-orders", children: [
    /* @__PURE__ */ s.jsxDEV("header", { className: "rc-header dashboard-header", children: [
      /* @__PURE__ */ s.jsxDEV("div", { className: "dashboard-header-left", children: [
        /* @__PURE__ */ s.jsxDEV("h2", { className: "rc-title", children: "Recent Orders" }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 73,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ s.jsxDEV("p", { className: "rc-subtitle", children: "Latest orders synced from Shopify." }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 74,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Dashboard.jsx",
        lineNumber: 72,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ s.jsxDEV("div", { className: "dashboard-header-right", children: [
        /* @__PURE__ */ s.jsxDEV("div", { className: "stat-card", children: [
          /* @__PURE__ */ s.jsxDEV("div", { className: "stat-value", children: p ? "…" : F.total || o.length }, void 0, !1, {
            fileName: "/app/code/client/pages/Dashboard.jsx",
            lineNumber: 78,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ s.jsxDEV("div", { className: "stat-label", children: "Orders" }, void 0, !1, {
            fileName: "/app/code/client/pages/Dashboard.jsx",
            lineNumber: 79,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 77,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ s.jsxDEV("button", { className: "btn-secondary btn-create-packer", onClick: () => K(!0), children: "Create Packer" }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 81,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ s.jsxDEV("button", { className: "btn-primary", onClick: () => window.location.reload(), children: "Refresh" }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 82,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Dashboard.jsx",
        lineNumber: 76,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Dashboard.jsx",
      lineNumber: 71,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ s.jsxDEV("div", { className: "rc-table-wrapper", children: /* @__PURE__ */ s.jsxDEV("table", { className: "rc-table dashboard-table", children: [
      /* @__PURE__ */ s.jsxDEV("thead", { children: /* @__PURE__ */ s.jsxDEV("tr", { children: [
        /* @__PURE__ */ s.jsxDEV("th", { className: "col-order", children: "Order #" }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 90,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ s.jsxDEV("th", { className: "col-customer", children: "Customer" }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 91,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ s.jsxDEV("th", { className: "col-address", children: "Address" }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 92,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ s.jsxDEV("th", { className: "col-status", children: "Status" }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 93,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ s.jsxDEV("th", { className: "col-date", children: "Date" }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 94,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ s.jsxDEV("th", { className: "col-time", children: "Time" }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 95,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ s.jsxDEV("th", { className: "col-action", children: "Action" }, void 0, !1, {
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
      /* @__PURE__ */ s.jsxDEV("tbody", { children: [
        p && /* @__PURE__ */ s.jsxDEV("tr", { children: /* @__PURE__ */ s.jsxDEV("td", { colSpan: 7, className: "section-note", children: "Loading…" }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 100,
          columnNumber: 32
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 100,
          columnNumber: 28
        }, this),
        !p && b && /* @__PURE__ */ s.jsxDEV("tr", { children: /* @__PURE__ */ s.jsxDEV("td", { colSpan: 7, className: "auth-error", children: b }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 101,
          columnNumber: 32
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 101,
          columnNumber: 28
        }, this),
        !p && !b && (Array.isArray(o) ? o.filter((U) => T(U) === "new") : []).map((U, le) => {
          const X = T(U), W = U.full_name || (U.customer && U.customer.full_name ? U.customer.full_name : "");
          let oe = "-";
          typeof U.shipping_address == "string" && String(U.shipping_address).trim() ? oe = String(U.shipping_address).trim() : U.shipping_address && typeof U.shipping_address == "object" ? oe = [U.shipping_address.address1 || "", U.shipping_address.city || "", U.shipping_address.province || "", U.shipping_address.country || ""].map((q) => String(q || "").trim()).filter(Boolean).join(", ") || "-" : typeof U.billing_address == "string" && String(U.billing_address).trim() ? oe = String(U.billing_address).trim() : U.billing_address && typeof U.billing_address == "object" && (oe = [U.billing_address.address1 || "", U.billing_address.city || "", U.billing_address.province || "", U.billing_address.country || ""].map((q) => String(q || "").trim()).filter(Boolean).join(", ") || "-");
          const Q = U.name || U.order_number || U.id || le, k = String(U.id || U.name || U.order_number || le).replace(/^#+/, ""), ue = U.created_at ? new Date(U.created_at) : null, de = ue ? ue.toLocaleDateString() : "-", Y = ue ? ue.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "-";
          return /* @__PURE__ */ s.jsxDEV("tr", { "data-status": X, children: [
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-order", children: Q }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 126,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-customer", children: W || "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 127,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-address", children: oe }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 128,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-status", children: /* @__PURE__ */ s.jsxDEV("span", { className: `status-chip status-${X}`, children: X.replace("-", " ") }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 129,
              columnNumber: 53
            }, this) }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 129,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-date", children: de }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 130,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-time", children: Y }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 131,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-action", children: /* @__PURE__ */ s.jsxDEV("button", { className: "order-action btn-manage", onClick: () => P(String(U.id || U.name || U.order_number || le)), children: "Assign" }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 132,
              columnNumber: 53
            }, this) }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 132,
              columnNumber: 23
            }, this)
          ] }, k, !0, {
            fileName: "/app/code/client/pages/Dashboard.jsx",
            lineNumber: 125,
            columnNumber: 21
          }, this);
        }),
        !p && !b && o.length === 0 && /* @__PURE__ */ s.jsxDEV("tr", { children: /* @__PURE__ */ s.jsxDEV("td", { colSpan: 7, className: "section-note", children: "No recent orders." }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 137,
          columnNumber: 66
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 137,
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
    /* @__PURE__ */ s.jsxDEV("div", { className: "rc-toolbar", "aria-label": "pagination", children: /* @__PURE__ */ s.jsxDEV("div", { className: "rc-filters", children: [
      /* @__PURE__ */ s.jsxDEV("button", { className: "rc-select rc-chip", disabled: F.page <= 1 || p, onClick: () => w((z) => Math.max(1, z - 1)), children: "Prev" }, void 0, !1, {
        fileName: "/app/code/client/pages/Dashboard.jsx",
        lineNumber: 144,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ s.jsxDEV("span", { className: "section-note", children: [
        "Page ",
        F.page,
        " of ",
        F.pages,
        " • ",
        F.total,
        " total"
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Dashboard.jsx",
        lineNumber: 145,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ s.jsxDEV("button", { className: "rc-select rc-chip", disabled: F.page >= F.pages || p, onClick: () => w((z) => Math.min(F.pages, z + 1)), children: "Next" }, void 0, !1, {
        fileName: "/app/code/client/pages/Dashboard.jsx",
        lineNumber: 146,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Dashboard.jsx",
      lineNumber: 143,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/pages/Dashboard.jsx",
      lineNumber: 142,
      columnNumber: 9
    }, this),
    L && pe && /* @__PURE__ */ s.jsxDEV(Bx, { orderId: pe, onClose: I, onAssigned: ee }, void 0, !1, {
      fileName: "/app/code/client/pages/Dashboard.jsx",
      lineNumber: 151,
      columnNumber: 11
    }, this),
    ce && /* @__PURE__ */ s.jsxDEV(X_, { onClose: () => K(!1), onCreated: () => {
      try {
        window && typeof window.showToast == "function" && window.showToast("Packer created", { type: "success" });
      } catch {
      }
    } }, void 0, !1, {
      fileName: "/app/code/client/pages/Dashboard.jsx",
      lineNumber: 154,
      columnNumber: 11
    }, this)
  ] }, void 0, !0, {
    fileName: "/app/code/client/pages/Dashboard.jsx",
    lineNumber: 70,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "/app/code/client/pages/Dashboard.jsx",
    lineNumber: 69,
    columnNumber: 5
  }, this);
}
function Z_() {
  const [o, f] = y.useState(Xn.baseFare), [p, g] = y.useState(Xn.farePerKm), [b, S] = y.useState(!1);
  y.useEffect(() => {
    const R = Wh();
    f(R.baseFare), g(R.farePerKm);
  }, []);
  function d() {
    S(!0);
    try {
      const R = { baseFare: Number(o) || 0, farePerKm: Number(p) || 0 };
      if (typeof window < "u" && window.localStorage) {
        window.localStorage.setItem(Nd, JSON.stringify(R));
        try {
          window.dispatchEvent(new Event("fare-settings-changed"));
        } catch {
        }
      }
      try {
        typeof window < "u" && typeof window.showToast == "function" && window.showToast("Settings saved", { type: "success" });
      } catch {
      }
    } finally {
      S(!1);
    }
  }
  function w() {
    f(Xn.baseFare), g(Xn.farePerKm);
    try {
      if (typeof window < "u" && window.localStorage) {
        window.localStorage.removeItem(Nd);
        try {
          window.dispatchEvent(new Event("fare-settings-changed"));
        } catch {
        }
      }
    } catch {
    }
  }
  return /* @__PURE__ */ s.jsxDEV(Mr, { children: /* @__PURE__ */ s.jsxDEV("section", { className: "rider-commissions", children: [
    /* @__PURE__ */ s.jsxDEV("header", { className: "rc-header", children: [
      /* @__PURE__ */ s.jsxDEV("h2", { className: "rc-title", children: "Settings" }, void 0, !1, {
        fileName: "/app/code/client/pages/Settings.jsx",
        lineNumber: 43,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ s.jsxDEV("p", { className: "rc-subtitle", children: "Manage fares for earnings calculations." }, void 0, !1, {
        fileName: "/app/code/client/pages/Settings.jsx",
        lineNumber: 44,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Settings.jsx",
      lineNumber: 42,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ s.jsxDEV("div", { className: "fare-settings-card", children: [
      /* @__PURE__ */ s.jsxDEV("div", { className: "fare-fields", children: [
        /* @__PURE__ */ s.jsxDEV("label", { className: "fare-field", children: [
          /* @__PURE__ */ s.jsxDEV("span", { className: "fare-field-label", children: "Base Fare" }, void 0, !1, {
            fileName: "/app/code/client/pages/Settings.jsx",
            lineNumber: 50,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ s.jsxDEV(
            "input",
            {
              type: "number",
              className: "fare-field-input",
              value: Number.isFinite(o) ? String(o) : "",
              min: "0",
              step: "0.01",
              onChange: (R) => f(R.target.value === "" ? 0 : Number(R.target.value)),
              "aria-label": "Base Fare"
            },
            void 0,
            !1,
            {
              fileName: "/app/code/client/pages/Settings.jsx",
              lineNumber: 51,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Settings.jsx",
          lineNumber: 49,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ s.jsxDEV("label", { className: "fare-field", children: [
          /* @__PURE__ */ s.jsxDEV("span", { className: "fare-field-label", children: "Fare per Km" }, void 0, !1, {
            fileName: "/app/code/client/pages/Settings.jsx",
            lineNumber: 62,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ s.jsxDEV(
            "input",
            {
              type: "number",
              className: "fare-field-input",
              value: Number.isFinite(p) ? String(p) : "",
              min: "0",
              step: "0.01",
              onChange: (R) => g(R.target.value === "" ? 0 : Number(R.target.value)),
              "aria-label": "Fare per Km"
            },
            void 0,
            !1,
            {
              fileName: "/app/code/client/pages/Settings.jsx",
              lineNumber: 63,
              columnNumber: 15
            },
            this
          )
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Settings.jsx",
          lineNumber: 61,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Settings.jsx",
        lineNumber: 48,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ s.jsxDEV("div", { className: "fare-actions", children: [
        /* @__PURE__ */ s.jsxDEV("button", { className: "btn-primary", onClick: d, disabled: b, children: "Save" }, void 0, !1, {
          fileName: "/app/code/client/pages/Settings.jsx",
          lineNumber: 75,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ s.jsxDEV("button", { className: "btn-secondary", onClick: w, disabled: b, children: "Reset" }, void 0, !1, {
          fileName: "/app/code/client/pages/Settings.jsx",
          lineNumber: 76,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Settings.jsx",
        lineNumber: 74,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Settings.jsx",
      lineNumber: 47,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "/app/code/client/pages/Settings.jsx",
    lineNumber: 41,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "/app/code/client/pages/Settings.jsx",
    lineNumber: 40,
    columnNumber: 5
  }, this);
}
function eO() {
  return /* @__PURE__ */ s.jsxDEV(v_, { children: /* @__PURE__ */ s.jsxDEV(t_, { children: [
    /* @__PURE__ */ s.jsxDEV(lr, { path: "/auth/login", element: /* @__PURE__ */ s.jsxDEV(w_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 16,
      columnNumber: 44
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 16,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ s.jsxDEV(lr, { path: "/auth/register", element: /* @__PURE__ */ s.jsxDEV(__, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 17,
      columnNumber: 47
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 17,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ s.jsxDEV(lr, { path: "/riders", element: /* @__PURE__ */ s.jsxDEV(H_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 18,
      columnNumber: 40
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 18,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ s.jsxDEV(lr, { path: "/riders/:id", element: /* @__PURE__ */ s.jsxDEV(Y_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 19,
      columnNumber: 44
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 19,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ s.jsxDEV(lr, { path: "/orders", element: /* @__PURE__ */ s.jsxDEV(K_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 20,
      columnNumber: 40
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 20,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ s.jsxDEV(lr, { path: "/reports", element: /* @__PURE__ */ s.jsxDEV(Q_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 21,
      columnNumber: 41
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 21,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ s.jsxDEV(lr, { path: "/dashboard", element: /* @__PURE__ */ s.jsxDEV(J_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 22,
      columnNumber: 43
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 22,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ s.jsxDEV(lr, { path: "/settings", element: /* @__PURE__ */ s.jsxDEV(Z_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 23,
      columnNumber: 42
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 23,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ s.jsxDEV(lr, { path: "*", element: /* @__PURE__ */ s.jsxDEV(Zw, { to: "/auth/login", replace: !0 }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 24,
      columnNumber: 34
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 24,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "/app/code/client/App.jsx",
    lineNumber: 15,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "/app/code/client/App.jsx",
    lineNumber: 14,
    columnNumber: 5
  }, this);
}
function gx() {
  const o = document.getElementById("react-root");
  if (!o) return;
  Rx(o).render(/* @__PURE__ */ s.jsxDEV(eO, {}, void 0, !1, {
    fileName: "/app/code/client/main.jsx",
    lineNumber: 9,
    columnNumber: 15
  }, this));
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", gx) : gx();
