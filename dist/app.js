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
    var p = "18.3.1", g = Symbol.for("react.element"), b = Symbol.for("react.portal"), S = Symbol.for("react.fragment"), d = Symbol.for("react.strict_mode"), w = Symbol.for("react.profiler"), R = Symbol.for("react.provider"), j = Symbol.for("react.context"), F = Symbol.for("react.forward_ref"), x = Symbol.for("react.suspense"), T = Symbol.for("react.suspense_list"), k = Symbol.for("react.memo"), te = Symbol.for("react.lazy"), fe = Symbol.for("react.offscreen"), le = Symbol.iterator, oe = "@@iterator";
    function W(m) {
      if (m === null || typeof m != "object")
        return null;
      var N = le && m[le] || m[oe];
      return typeof N == "function" ? N : null;
    }
    var P = {
      /**
       * @internal
       * @type {ReactComponent}
       */
      current: null
    }, Y = {
      transition: null
    }, Z = {
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
    }, U = {}, re = null;
    function Q(m) {
      re = m;
    }
    U.setExtraStackFrame = function(m) {
      re = m;
    }, U.getCurrentStack = null, U.getStackAddendum = function() {
      var m = "";
      re && (m += re);
      var N = U.getCurrentStack;
      return N && (m += N() || ""), m;
    };
    var M = !1, ee = !1, Ne = !1, I = !1, ve = !1, de = {
      ReactCurrentDispatcher: P,
      ReactCurrentBatchConfig: Y,
      ReactCurrentOwner: z
    };
    de.ReactDebugCurrentFrame = U, de.ReactCurrentActQueue = Z;
    function G(m) {
      {
        for (var N = arguments.length, A = new Array(N > 1 ? N - 1 : 0), H = 1; H < N; H++)
          A[H - 1] = arguments[H];
        se("warn", m, A);
      }
    }
    function K(m) {
      {
        for (var N = arguments.length, A = new Array(N > 1 ? N - 1 : 0), H = 1; H < N; H++)
          A[H - 1] = arguments[H];
        se("error", m, A);
      }
    }
    function se(m, N, A) {
      {
        var H = de.ReactDebugCurrentFrame, ie = H.getStackAddendum();
        ie !== "" && (N += "%s", A = A.concat([ie]));
        var _e = A.map(function(Ee) {
          return String(Ee);
        });
        _e.unshift("Warning: " + N), Function.prototype.apply.call(console[m], console, _e);
      }
    }
    var je = {};
    function Pe(m, N) {
      {
        var A = m.constructor, H = A && (A.displayName || A.name) || "ReactClass", ie = H + "." + N;
        if (je[ie])
          return;
        K("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", N, H), je[ie] = !0;
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
      enqueueForceUpdate: function(m, N, A) {
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
      enqueueReplaceState: function(m, N, A, H) {
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
      enqueueSetState: function(m, N, A, H) {
        Pe(m, "setState");
      }
    }, Ve = Object.assign, Ie = {};
    Object.freeze(Ie);
    function st(m, N, A) {
      this.props = m, this.context = N, this.refs = Ie, this.updater = A || et;
    }
    st.prototype.isReactComponent = {}, st.prototype.setState = function(m, N) {
      if (typeof m != "object" && typeof m != "function" && m != null)
        throw new Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
      this.updater.enqueueSetState(this, m, N, "setState");
    }, st.prototype.forceUpdate = function(m) {
      this.updater.enqueueForceUpdate(this, m, "forceUpdate");
    };
    {
      var fn = {
        isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
        replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
      }, Ht = function(m, N) {
        Object.defineProperty(st.prototype, m, {
          get: function() {
            G("%s(...) is deprecated in plain JavaScript React classes. %s", N[0], N[1]);
          }
        });
      };
      for (var Mt in fn)
        fn.hasOwnProperty(Mt) && Ht(Mt, fn[Mt]);
    }
    function An() {
    }
    An.prototype = st.prototype;
    function qt(m, N, A) {
      this.props = m, this.context = N, this.refs = Ie, this.updater = A || et;
    }
    var Gt = qt.prototype = new An();
    Gt.constructor = qt, Ve(Gt, st.prototype), Gt.isPureReactComponent = !0;
    function J() {
      var m = {
        current: null
      };
      return Object.seal(m), m;
    }
    var We = Array.isArray;
    function ut(m) {
      return We(m);
    }
    function vt(m) {
      {
        var N = typeof Symbol == "function" && Symbol.toStringTag, A = N && m[Symbol.toStringTag] || m.constructor.name || "Object";
        return A;
      }
    }
    function ht(m) {
      try {
        return lt(m), !1;
      } catch {
        return !0;
      }
    }
    function lt(m) {
      return "" + m;
    }
    function Ut(m) {
      if (ht(m))
        return K("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", vt(m)), lt(m);
    }
    function Ft(m, N, A) {
      var H = m.displayName;
      if (H)
        return H;
      var ie = N.displayName || N.name || "";
      return ie !== "" ? A + "(" + ie + ")" : A;
    }
    function Ln(m) {
      return m.displayName || "Context";
    }
    function Dn(m) {
      if (m == null)
        return null;
      if (typeof m.tag == "number" && K("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof m == "function")
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
            var A = m;
            return Ln(A._context) + ".Provider";
          case F:
            return Ft(m, m.render, "ForwardRef");
          case k:
            var H = m.displayName || null;
            return H !== null ? H : Dn(m.type) || "Memo";
          case te: {
            var ie = m, _e = ie._payload, Ee = ie._init;
            try {
              return Dn(Ee(_e));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var ln = Object.prototype.hasOwnProperty, Wt = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, mn, sa, zt;
    zt = {};
    function pn(m) {
      if (ln.call(m, "ref")) {
        var N = Object.getOwnPropertyDescriptor(m, "ref").get;
        if (N && N.isReactWarning)
          return !1;
      }
      return m.ref !== void 0;
    }
    function hn(m) {
      if (ln.call(m, "key")) {
        var N = Object.getOwnPropertyDescriptor(m, "key").get;
        if (N && N.isReactWarning)
          return !1;
      }
      return m.key !== void 0;
    }
    function xa(m, N) {
      var A = function() {
        mn || (mn = !0, K("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", N));
      };
      A.isReactWarning = !0, Object.defineProperty(m, "key", {
        get: A,
        configurable: !0
      });
    }
    function ua(m, N) {
      var A = function() {
        sa || (sa = !0, K("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", N));
      };
      A.isReactWarning = !0, Object.defineProperty(m, "ref", {
        get: A,
        configurable: !0
      });
    }
    function ue(m) {
      if (typeof m.ref == "string" && z.current && m.__self && z.current.stateNode !== m.__self) {
        var N = Dn(z.current.type);
        zt[N] || (K('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', N, m.ref), zt[N] = !0);
      }
    }
    var Re = function(m, N, A, H, ie, _e, Ee) {
      var Ue = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: g,
        // Built-in properties that belong on the element
        type: m,
        key: N,
        ref: A,
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
        value: ie
      }), Object.freeze && (Object.freeze(Ue.props), Object.freeze(Ue)), Ue;
    };
    function $e(m, N, A) {
      var H, ie = {}, _e = null, Ee = null, Ue = null, Qe = null;
      if (N != null) {
        pn(N) && (Ee = N.ref, ue(N)), hn(N) && (Ut(N.key), _e = "" + N.key), Ue = N.__self === void 0 ? null : N.__self, Qe = N.__source === void 0 ? null : N.__source;
        for (H in N)
          ln.call(N, H) && !Wt.hasOwnProperty(H) && (ie[H] = N[H]);
      }
      var dt = arguments.length - 2;
      if (dt === 1)
        ie.children = A;
      else if (dt > 1) {
        for (var yt = Array(dt), Nt = 0; Nt < dt; Nt++)
          yt[Nt] = arguments[Nt + 2];
        Object.freeze && Object.freeze(yt), ie.children = yt;
      }
      if (m && m.defaultProps) {
        var qe = m.defaultProps;
        for (H in qe)
          ie[H] === void 0 && (ie[H] = qe[H]);
      }
      if (_e || Ee) {
        var jt = typeof m == "function" ? m.displayName || m.name || "Unknown" : m;
        _e && xa(ie, jt), Ee && ua(ie, jt);
      }
      return Re(m, _e, Ee, Ue, Qe, z.current, ie);
    }
    function ct(m, N) {
      var A = Re(m.type, N, m.ref, m._self, m._source, m._owner, m.props);
      return A;
    }
    function Et(m, N, A) {
      if (m == null)
        throw new Error("React.cloneElement(...): The argument must be a React element, but you passed " + m + ".");
      var H, ie = Ve({}, m.props), _e = m.key, Ee = m.ref, Ue = m._self, Qe = m._source, dt = m._owner;
      if (N != null) {
        pn(N) && (Ee = N.ref, dt = z.current), hn(N) && (Ut(N.key), _e = "" + N.key);
        var yt;
        m.type && m.type.defaultProps && (yt = m.type.defaultProps);
        for (H in N)
          ln.call(N, H) && !Wt.hasOwnProperty(H) && (N[H] === void 0 && yt !== void 0 ? ie[H] = yt[H] : ie[H] = N[H]);
      }
      var Nt = arguments.length - 2;
      if (Nt === 1)
        ie.children = A;
      else if (Nt > 1) {
        for (var qe = Array(Nt), jt = 0; jt < Nt; jt++)
          qe[jt] = arguments[jt + 2];
        ie.children = qe;
      }
      return Re(m.type, _e, Ee, Ue, Qe, dt, ie);
    }
    function wt(m) {
      return typeof m == "object" && m !== null && m.$$typeof === g;
    }
    var _t = ".", Cn = ":";
    function Vt(m) {
      var N = /[=:]/g, A = {
        "=": "=0",
        ":": "=2"
      }, H = m.replace(N, function(ie) {
        return A[ie];
      });
      return "$" + H;
    }
    var gt = !1, At = /\/+/g;
    function Ea(m) {
      return m.replace(At, "$&/");
    }
    function Sa(m, N) {
      return typeof m == "object" && m !== null && m.key != null ? (Ut(m.key), Vt("" + m.key)) : N.toString(36);
    }
    function ca(m, N, A, H, ie) {
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
        var Ue = m, Qe = ie(Ue), dt = H === "" ? _t + Sa(Ue, 0) : H;
        if (ut(Qe)) {
          var yt = "";
          dt != null && (yt = Ea(dt) + "/"), ca(Qe, N, yt, "", function(wd) {
            return wd;
          });
        } else Qe != null && (wt(Qe) && (Qe.key && (!Ue || Ue.key !== Qe.key) && Ut(Qe.key), Qe = ct(
          Qe,
          // Keep both the (mapped) and old keys if they differ, just as
          // traverseAllChildren used to do for objects as children
          A + // $FlowFixMe Flow incorrectly thinks React.Portal doesn't have a key
          (Qe.key && (!Ue || Ue.key !== Qe.key) ? (
            // $FlowFixMe Flow incorrectly thinks existing element's key can be a number
            // eslint-disable-next-line react-internal/safe-string-coercion
            Ea("" + Qe.key) + "/"
          ) : "") + dt
        )), N.push(Qe));
        return 1;
      }
      var Nt, qe, jt = 0, Bt = H === "" ? _t : H + Cn;
      if (ut(m))
        for (var xi = 0; xi < m.length; xi++)
          Nt = m[xi], qe = Bt + Sa(Nt, xi), jt += ca(Nt, N, A, qe, ie);
      else {
        var xo = W(m);
        if (typeof xo == "function") {
          var cr = m;
          xo === cr.entries && (gt || G("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), gt = !0);
          for (var Eo = xo.call(cr), So, Td = 0; !(So = Eo.next()).done; )
            Nt = So.value, qe = Bt + Sa(Nt, Td++), jt += ca(Nt, N, A, qe, ie);
        } else if (_e === "object") {
          var vu = String(m);
          throw new Error("Objects are not valid as a React child (found: " + (vu === "[object Object]" ? "object with keys {" + Object.keys(m).join(", ") + "}" : vu) + "). If you meant to render a collection of children, use an array instead.");
        }
      }
      return jt;
    }
    function or(m, N, A) {
      if (m == null)
        return m;
      var H = [], ie = 0;
      return ca(m, H, "", "", function(_e) {
        return N.call(A, _e, ie++);
      }), H;
    }
    function io(m) {
      var N = 0;
      return or(m, function() {
        N++;
      }), N;
    }
    function di(m, N, A) {
      or(m, function() {
        N.apply(this, arguments);
      }, A);
    }
    function Zi(m) {
      return or(m, function(N) {
        return N;
      }) || [];
    }
    function el(m) {
      if (!wt(m))
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
      var A = !1, H = !1, ie = !1;
      {
        var _e = {
          $$typeof: j,
          _context: N
        };
        Object.defineProperties(_e, {
          Provider: {
            get: function() {
              return H || (H = !0, K("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?")), N.Provider;
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
              return A || (A = !0, K("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?")), N.Consumer;
            }
          },
          displayName: {
            get: function() {
              return N.displayName;
            },
            set: function(Ee) {
              ie || (G("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.", Ee), ie = !0);
            }
          }
        }), N.Consumer = _e;
      }
      return N._currentRenderer = null, N._currentRenderer2 = null, N;
    }
    var Ra = -1, da = 0, Jn = 1, Ia = 2;
    function mi(m) {
      if (m._status === Ra) {
        var N = m._result, A = N();
        if (A.then(function(_e) {
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
          H._status = da, H._result = A;
        }
      }
      if (m._status === Jn) {
        var ie = m._result;
        return ie === void 0 && K(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))

Did you accidentally put curly braces around the import?`, ie), "default" in ie || K(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))`, ie), ie.default;
      } else
        throw m._result;
    }
    function E(m) {
      var N = {
        // We use these fields to store the result.
        _status: Ra,
        _result: m
      }, A = {
        $$typeof: te,
        _payload: N,
        _init: mi
      };
      {
        var H, ie;
        Object.defineProperties(A, {
          defaultProps: {
            configurable: !0,
            get: function() {
              return H;
            },
            set: function(_e) {
              K("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), H = _e, Object.defineProperty(A, "defaultProps", {
                enumerable: !0
              });
            }
          },
          propTypes: {
            configurable: !0,
            get: function() {
              return ie;
            },
            set: function(_e) {
              K("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), ie = _e, Object.defineProperty(A, "propTypes", {
                enumerable: !0
              });
            }
          }
        });
      }
      return A;
    }
    function ne(m) {
      m != null && m.$$typeof === k ? K("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).") : typeof m != "function" ? K("forwardRef requires a render function but was given %s.", m === null ? "null" : typeof m) : m.length !== 0 && m.length !== 2 && K("forwardRef render functions accept exactly two parameters: props and ref. %s", m.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."), m != null && (m.defaultProps != null || m.propTypes != null) && K("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
      var N = {
        $$typeof: F,
        render: m
      };
      {
        var A;
        Object.defineProperty(N, "displayName", {
          enumerable: !1,
          configurable: !0,
          get: function() {
            return A;
          },
          set: function(H) {
            A = H, !m.name && !m.displayName && (m.displayName = H);
          }
        });
      }
      return N;
    }
    var me;
    me = Symbol.for("react.module.reference");
    function De(m) {
      return !!(typeof m == "string" || typeof m == "function" || m === S || m === w || ve || m === d || m === x || m === T || I || m === fe || M || ee || Ne || typeof m == "object" && m !== null && (m.$$typeof === te || m.$$typeof === k || m.$$typeof === R || m.$$typeof === j || m.$$typeof === F || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      m.$$typeof === me || m.getModuleId !== void 0));
    }
    function Ke(m, N) {
      De(m) || K("memo: The first argument must be a component. Instead received: %s", m === null ? "null" : typeof m);
      var A = {
        $$typeof: k,
        type: m,
        compare: N === void 0 ? null : N
      };
      {
        var H;
        Object.defineProperty(A, "displayName", {
          enumerable: !1,
          configurable: !0,
          get: function() {
            return H;
          },
          set: function(ie) {
            H = ie, !m.name && !m.displayName && (m.displayName = ie);
          }
        });
      }
      return A;
    }
    function Ae() {
      var m = P.current;
      return m === null && K(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`), m;
    }
    function He(m) {
      var N = Ae();
      if (m._context !== void 0) {
        var A = m._context;
        A.Consumer === m ? K("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?") : A.Provider === m && K("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
      }
      return N.useContext(m);
    }
    function Te(m) {
      var N = Ae();
      return N.useState(m);
    }
    function Kt(m, N, A) {
      var H = Ae();
      return H.useReducer(m, N, A);
    }
    function St(m) {
      var N = Ae();
      return N.useRef(m);
    }
    function Rt(m, N) {
      var A = Ae();
      return A.useEffect(m, N);
    }
    function jn(m, N) {
      var A = Ae();
      return A.useInsertionEffect(m, N);
    }
    function Ya(m, N) {
      var A = Ae();
      return A.useLayoutEffect(m, N);
    }
    function Da(m, N) {
      var A = Ae();
      return A.useCallback(m, N);
    }
    function Qt(m, N) {
      var A = Ae();
      return A.useMemo(m, N);
    }
    function pi(m, N, A) {
      var H = Ae();
      return H.useImperativeHandle(m, N, A);
    }
    function Ca(m, N) {
      {
        var A = Ae();
        return A.useDebugValue(m, N);
      }
    }
    function Ye() {
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
    function lu(m, N, A) {
      var H = Ae();
      return H.useSyncExternalStore(m, N, A);
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
        Ar < 0 && K("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var vi = de.ReactCurrentDispatcher, Lr;
    function nl(m, N, A) {
      {
        if (Lr === void 0)
          try {
            throw Error();
          } catch (ie) {
            var H = ie.stack.trim().match(/\n( *(at )?)/);
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
        var A = al.get(m);
        if (A !== void 0)
          return A;
      }
      var H;
      gi = !0;
      var ie = Error.prepareStackTrace;
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
            } catch (Bt) {
              H = Bt;
            }
            Reflect.construct(m, [], Ee);
          } else {
            try {
              Ee.call();
            } catch (Bt) {
              H = Bt;
            }
            m.call(Ee.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (Bt) {
            H = Bt;
          }
          m();
        }
      } catch (Bt) {
        if (Bt && H && typeof Bt.stack == "string") {
          for (var Ue = Bt.stack.split(`
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
        gi = !1, vi.current = _e, qa(), Error.prepareStackTrace = ie;
      }
      var qe = m ? m.displayName || m.name : "", jt = qe ? nl(qe) : "";
      return typeof m == "function" && al.set(m, jt), jt;
    }
    function po(m, N, A) {
      return uu(m, !1);
    }
    function Sd(m) {
      var N = m.prototype;
      return !!(N && N.isReactComponent);
    }
    function bi(m, N, A) {
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
          case k:
            return bi(m.type, N, A);
          case te: {
            var H = m, ie = H._payload, _e = H._init;
            try {
              return bi(_e(ie), N, A);
            } catch {
            }
          }
        }
      return "";
    }
    var cu = {}, ho = de.ReactDebugCurrentFrame;
    function at(m) {
      if (m) {
        var N = m._owner, A = bi(m.type, m._source, N ? N.type : null);
        ho.setExtraStackFrame(A);
      } else
        ho.setExtraStackFrame(null);
    }
    function Rd(m, N, A, H, ie) {
      {
        var _e = Function.call.bind(ln);
        for (var Ee in m)
          if (_e(m, Ee)) {
            var Ue = void 0;
            try {
              if (typeof m[Ee] != "function") {
                var Qe = Error((H || "React class") + ": " + A + " type `" + Ee + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof m[Ee] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw Qe.name = "Invariant Violation", Qe;
              }
              Ue = m[Ee](N, Ee, H, A, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (dt) {
              Ue = dt;
            }
            Ue && !(Ue instanceof Error) && (at(ie), K("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", H || "React class", A, Ee, typeof Ue), at(null)), Ue instanceof Error && !(Ue.message in cu) && (cu[Ue.message] = !0, at(ie), K("Failed %s type: %s", A, Ue.message), at(null));
          }
      }
    }
    function sr(m) {
      if (m) {
        var N = m._owner, A = bi(m.type, m._source, N ? N.type : null);
        Q(A);
      } else
        Q(null);
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
        var N = m.fileName.replace(/^.*[\\\/]/, ""), A = m.lineNumber;
        return `

Check your code at ` + N + ":" + A + ".";
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
        var A = typeof m == "string" ? m : m.displayName || m.name;
        A && (N = `

Check the top-level render call using <` + A + ">.");
      }
      return N;
    }
    function on(m, N) {
      if (!(!m._store || m._store.validated || m.key != null)) {
        m._store.validated = !0;
        var A = Dd(N);
        if (!kr[A]) {
          kr[A] = !0;
          var H = "";
          m && m._owner && m._owner !== z.current && (H = " It was passed a child from " + Dn(m._owner.type) + "."), sr(m), K('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', A, H), sr(null);
        }
      }
    }
    function Ct(m, N) {
      if (typeof m == "object") {
        if (ut(m))
          for (var A = 0; A < m.length; A++) {
            var H = m[A];
            wt(H) && on(H, N);
          }
        else if (wt(m))
          m._store && (m._store.validated = !0);
        else if (m) {
          var ie = W(m);
          if (typeof ie == "function" && ie !== m.entries)
            for (var _e = ie.call(m), Ee; !(Ee = _e.next()).done; )
              wt(Ee.value) && on(Ee.value, N);
        }
      }
    }
    function du(m) {
      {
        var N = m.type;
        if (N == null || typeof N == "string")
          return;
        var A;
        if (typeof N == "function")
          A = N.propTypes;
        else if (typeof N == "object" && (N.$$typeof === F || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        N.$$typeof === k))
          A = N.propTypes;
        else
          return;
        if (A) {
          var H = Dn(N);
          Rd(A, m.props, "prop", H, m);
        } else if (N.PropTypes !== void 0 && !ze) {
          ze = !0;
          var ie = Dn(N);
          K("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", ie || "Unknown");
        }
        typeof N.getDefaultProps == "function" && !N.getDefaultProps.isReactClassApproved && K("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function fa(m) {
      {
        for (var N = Object.keys(m.props), A = 0; A < N.length; A++) {
          var H = N[A];
          if (H !== "children" && H !== "key") {
            sr(m), K("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", H), sr(null);
            break;
          }
        }
        m.ref !== null && (sr(m), K("Invalid attribute `ref` supplied to `React.Fragment`."), sr(null));
      }
    }
    function Un(m, N, A) {
      var H = De(m);
      if (!H) {
        var ie = "";
        (m === void 0 || typeof m == "object" && m !== null && Object.keys(m).length === 0) && (ie += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
        var _e = yi(N);
        _e ? ie += _e : ie += vo();
        var Ee;
        m === null ? Ee = "null" : ut(m) ? Ee = "array" : m !== void 0 && m.$$typeof === g ? (Ee = "<" + (Dn(m.type) || "Unknown") + " />", ie = " Did you accidentally export a JSX literal instead of a component?") : Ee = typeof m, K("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", Ee, ie);
      }
      var Ue = $e.apply(this, arguments);
      if (Ue == null)
        return Ue;
      if (H)
        for (var Qe = 2; Qe < arguments.length; Qe++)
          Ct(arguments[Qe], m);
      return m === S ? fa(Ue) : du(Ue), Ue;
    }
    var ja = !1;
    function Cd(m) {
      var N = Un.bind(null, m);
      return N.type = m, ja || (ja = !0, G("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.")), Object.defineProperty(N, "type", {
        enumerable: !1,
        get: function() {
          return G("Factory.type is deprecated. Access the class directly before passing it to createFactory."), Object.defineProperty(this, "type", {
            value: m
          }), m;
        }
      }), N;
    }
    function go(m, N, A) {
      for (var H = Et.apply(this, arguments), ie = 2; ie < arguments.length; ie++)
        Ct(arguments[ie], H.type);
      return du(H), H;
    }
    function fu(m, N) {
      var A = Y.transition;
      Y.transition = {};
      var H = Y.transition;
      Y.transition._updatedFibers = /* @__PURE__ */ new Set();
      try {
        m();
      } finally {
        if (Y.transition = A, A === null && H._updatedFibers) {
          var ie = H._updatedFibers.size;
          ie > 10 && G("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), H._updatedFibers.clear();
        }
      }
    }
    var bo = !1, rl = null;
    function jd(m) {
      if (rl === null)
        try {
          var N = ("require" + Math.random()).slice(0, 7), A = o && o[N];
          rl = A.call(o, "timers").setImmediate;
        } catch {
          rl = function(ie) {
            bo === !1 && (bo = !0, typeof MessageChannel > "u" && K("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));
            var _e = new MessageChannel();
            _e.port1.onmessage = ie, _e.port2.postMessage(void 0);
          };
        }
      return rl(m);
    }
    var Ur = 0, Ni = !1;
    function yo(m) {
      {
        var N = Ur;
        Ur++, Z.current === null && (Z.current = []);
        var A = Z.isBatchingLegacy, H;
        try {
          if (Z.isBatchingLegacy = !0, H = m(), !A && Z.didScheduleLegacyUpdate) {
            var ie = Z.current;
            ie !== null && (Z.didScheduleLegacyUpdate = !1, ol(ie));
          }
        } catch (qe) {
          throw ur(N), qe;
        } finally {
          Z.isBatchingLegacy = A;
        }
        if (H !== null && typeof H == "object" && typeof H.then == "function") {
          var _e = H, Ee = !1, Ue = {
            then: function(qe, jt) {
              Ee = !0, _e.then(function(Bt) {
                ur(N), Ur === 0 ? il(Bt, qe, jt) : qe(Bt);
              }, function(Bt) {
                ur(N), jt(Bt);
              });
            }
          };
          return !Ni && typeof Promise < "u" && Promise.resolve().then(function() {
          }).then(function() {
            Ee || (Ni = !0, K("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"));
          }), Ue;
        } else {
          var Qe = H;
          if (ur(N), Ur === 0) {
            var dt = Z.current;
            dt !== null && (ol(dt), Z.current = null);
            var yt = {
              then: function(qe, jt) {
                Z.current === null ? (Z.current = [], il(Qe, qe, jt)) : qe(Qe);
              }
            };
            return yt;
          } else {
            var Nt = {
              then: function(qe, jt) {
                qe(Qe);
              }
            };
            return Nt;
          }
        }
      }
    }
    function ur(m) {
      m !== Ur - 1 && K("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "), Ur = m;
    }
    function il(m, N, A) {
      {
        var H = Z.current;
        if (H !== null)
          try {
            ol(H), jd(function() {
              H.length === 0 ? (Z.current = null, N(m)) : il(m, N, A);
            });
          } catch (ie) {
            A(ie);
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
            var A = m[N];
            do
              A = A(!0);
            while (A !== null);
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
    f.Children = hu, f.Component = st, f.Fragment = S, f.Profiler = w, f.PureComponent = qt, f.StrictMode = d, f.Suspense = x, f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = de, f.act = yo, f.cloneElement = pu, f.createContext = fi, f.createElement = mu, f.createFactory = No, f.createRef = J, f.forwardRef = ne, f.isValidElement = wt, f.lazy = E, f.memo = Ke, f.startTransition = fu, f.unstable_act = yo, f.useCallback = Da, f.useContext = He, f.useDebugValue = Ca, f.useDeferredValue = hi, f.useEffect = Rt, f.useId = iu, f.useImperativeHandle = pi, f.useInsertionEffect = jn, f.useLayoutEffect = Ya, f.useMemo = Qt, f.useReducer = Kt, f.useRef = St, f.useState = Te, f.useSyncExternalStore = lu, f.useTransition = Ye, f.version = p, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
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
  var o = y, f = Symbol.for("react.element"), p = Symbol.for("react.portal"), g = Symbol.for("react.fragment"), b = Symbol.for("react.strict_mode"), S = Symbol.for("react.profiler"), d = Symbol.for("react.provider"), w = Symbol.for("react.context"), R = Symbol.for("react.forward_ref"), j = Symbol.for("react.suspense"), F = Symbol.for("react.suspense_list"), x = Symbol.for("react.memo"), T = Symbol.for("react.lazy"), k = Symbol.for("react.offscreen"), te = Symbol.iterator, fe = "@@iterator";
  function le(E) {
    if (E === null || typeof E != "object")
      return null;
    var ne = te && E[te] || E[fe];
    return typeof ne == "function" ? ne : null;
  }
  var oe = o.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  function W(E) {
    {
      for (var ne = arguments.length, me = new Array(ne > 1 ? ne - 1 : 0), De = 1; De < ne; De++)
        me[De - 1] = arguments[De];
      P("error", E, me);
    }
  }
  function P(E, ne, me) {
    {
      var De = oe.ReactDebugCurrentFrame, Ke = De.getStackAddendum();
      Ke !== "" && (ne += "%s", me = me.concat([Ke]));
      var Ae = me.map(function(He) {
        return String(He);
      });
      Ae.unshift("Warning: " + ne), Function.prototype.apply.call(console[E], console, Ae);
    }
  }
  var Y = !1, Z = !1, z = !1, U = !1, re = !1, Q;
  Q = Symbol.for("react.module.reference");
  function M(E) {
    return !!(typeof E == "string" || typeof E == "function" || E === g || E === S || re || E === b || E === j || E === F || U || E === k || Y || Z || z || typeof E == "object" && E !== null && (E.$$typeof === T || E.$$typeof === x || E.$$typeof === d || E.$$typeof === w || E.$$typeof === R || // This needs to include all possible module reference object
    // types supported by any Flight configuration anywhere since
    // we don't know which Flight build this will end up being used
    // with.
    E.$$typeof === Q || E.getModuleId !== void 0));
  }
  function ee(E, ne, me) {
    var De = E.displayName;
    if (De)
      return De;
    var Ke = ne.displayName || ne.name || "";
    return Ke !== "" ? me + "(" + Ke + ")" : me;
  }
  function Ne(E) {
    return E.displayName || "Context";
  }
  function I(E) {
    if (E == null)
      return null;
    if (typeof E.tag == "number" && W("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof E == "function")
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
          return Ne(ne) + ".Consumer";
        case d:
          var me = E;
          return Ne(me._context) + ".Provider";
        case R:
          return ee(E, E.render, "ForwardRef");
        case x:
          var De = E.displayName || null;
          return De !== null ? De : I(E.type) || "Memo";
        case T: {
          var Ke = E, Ae = Ke._payload, He = Ke._init;
          try {
            return I(He(Ae));
          } catch {
            return null;
          }
        }
      }
    return null;
  }
  var ve = Object.assign, de = 0, G, K, se, je, Pe, et, Ve;
  function Ie() {
  }
  Ie.__reactDisabledLog = !0;
  function st() {
    {
      if (de === 0) {
        G = console.log, K = console.info, se = console.warn, je = console.error, Pe = console.group, et = console.groupCollapsed, Ve = console.groupEnd;
        var E = {
          configurable: !0,
          enumerable: !0,
          value: Ie,
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
  function fn() {
    {
      if (de--, de === 0) {
        var E = {
          configurable: !0,
          enumerable: !0,
          writable: !0
        };
        Object.defineProperties(console, {
          log: ve({}, E, {
            value: G
          }),
          info: ve({}, E, {
            value: K
          }),
          warn: ve({}, E, {
            value: se
          }),
          error: ve({}, E, {
            value: je
          }),
          group: ve({}, E, {
            value: Pe
          }),
          groupCollapsed: ve({}, E, {
            value: et
          }),
          groupEnd: ve({}, E, {
            value: Ve
          })
        });
      }
      de < 0 && W("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
    }
  }
  var Ht = oe.ReactCurrentDispatcher, Mt;
  function An(E, ne, me) {
    {
      if (Mt === void 0)
        try {
          throw Error();
        } catch (Ke) {
          var De = Ke.stack.trim().match(/\n( *(at )?)/);
          Mt = De && De[1] || "";
        }
      return `
` + Mt + E;
    }
  }
  var qt = !1, Gt;
  {
    var J = typeof WeakMap == "function" ? WeakMap : Map;
    Gt = new J();
  }
  function We(E, ne) {
    if (!E || qt)
      return "";
    {
      var me = Gt.get(E);
      if (me !== void 0)
        return me;
    }
    var De;
    qt = !0;
    var Ke = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    var Ae;
    Ae = Ht.current, Ht.current = null, st();
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
          } catch (Qt) {
            De = Qt;
          }
          Reflect.construct(E, [], He);
        } else {
          try {
            He.call();
          } catch (Qt) {
            De = Qt;
          }
          E.call(He.prototype);
        }
      } else {
        try {
          throw Error();
        } catch (Qt) {
          De = Qt;
        }
        E();
      }
    } catch (Qt) {
      if (Qt && De && typeof Qt.stack == "string") {
        for (var Te = Qt.stack.split(`
`), Kt = De.stack.split(`
`), St = Te.length - 1, Rt = Kt.length - 1; St >= 1 && Rt >= 0 && Te[St] !== Kt[Rt]; )
          Rt--;
        for (; St >= 1 && Rt >= 0; St--, Rt--)
          if (Te[St] !== Kt[Rt]) {
            if (St !== 1 || Rt !== 1)
              do
                if (St--, Rt--, Rt < 0 || Te[St] !== Kt[Rt]) {
                  var jn = `
` + Te[St].replace(" at new ", " at ");
                  return E.displayName && jn.includes("<anonymous>") && (jn = jn.replace("<anonymous>", E.displayName)), typeof E == "function" && Gt.set(E, jn), jn;
                }
              while (St >= 1 && Rt >= 0);
            break;
          }
      }
    } finally {
      qt = !1, Ht.current = Ae, fn(), Error.prepareStackTrace = Ke;
    }
    var Ya = E ? E.displayName || E.name : "", Da = Ya ? An(Ya) : "";
    return typeof E == "function" && Gt.set(E, Da), Da;
  }
  function ut(E, ne, me) {
    return We(E, !1);
  }
  function vt(E) {
    var ne = E.prototype;
    return !!(ne && ne.isReactComponent);
  }
  function ht(E, ne, me) {
    if (E == null)
      return "";
    if (typeof E == "function")
      return We(E, vt(E));
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
          return ht(E.type, ne, me);
        case T: {
          var De = E, Ke = De._payload, Ae = De._init;
          try {
            return ht(Ae(Ke), ne, me);
          } catch {
          }
        }
      }
    return "";
  }
  var lt = Object.prototype.hasOwnProperty, Ut = {}, Ft = oe.ReactDebugCurrentFrame;
  function Ln(E) {
    if (E) {
      var ne = E._owner, me = ht(E.type, E._source, ne ? ne.type : null);
      Ft.setExtraStackFrame(me);
    } else
      Ft.setExtraStackFrame(null);
  }
  function Dn(E, ne, me, De, Ke) {
    {
      var Ae = Function.call.bind(lt);
      for (var He in E)
        if (Ae(E, He)) {
          var Te = void 0;
          try {
            if (typeof E[He] != "function") {
              var Kt = Error((De || "React class") + ": " + me + " type `" + He + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof E[He] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
              throw Kt.name = "Invariant Violation", Kt;
            }
            Te = E[He](ne, He, De, me, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
          } catch (St) {
            Te = St;
          }
          Te && !(Te instanceof Error) && (Ln(Ke), W("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", De || "React class", me, He, typeof Te), Ln(null)), Te instanceof Error && !(Te.message in Ut) && (Ut[Te.message] = !0, Ln(Ke), W("Failed %s type: %s", me, Te.message), Ln(null));
        }
    }
  }
  var ln = Array.isArray;
  function Wt(E) {
    return ln(E);
  }
  function mn(E) {
    {
      var ne = typeof Symbol == "function" && Symbol.toStringTag, me = ne && E[Symbol.toStringTag] || E.constructor.name || "Object";
      return me;
    }
  }
  function sa(E) {
    try {
      return zt(E), !1;
    } catch {
      return !0;
    }
  }
  function zt(E) {
    return "" + E;
  }
  function pn(E) {
    if (sa(E))
      return W("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", mn(E)), zt(E);
  }
  var hn = oe.ReactCurrentOwner, xa = {
    key: !0,
    ref: !0,
    __self: !0,
    __source: !0
  }, ua, ue, Re;
  Re = {};
  function $e(E) {
    if (lt.call(E, "ref")) {
      var ne = Object.getOwnPropertyDescriptor(E, "ref").get;
      if (ne && ne.isReactWarning)
        return !1;
    }
    return E.ref !== void 0;
  }
  function ct(E) {
    if (lt.call(E, "key")) {
      var ne = Object.getOwnPropertyDescriptor(E, "key").get;
      if (ne && ne.isReactWarning)
        return !1;
    }
    return E.key !== void 0;
  }
  function Et(E, ne) {
    if (typeof E.ref == "string" && hn.current && ne && hn.current.stateNode !== ne) {
      var me = I(hn.current.type);
      Re[me] || (W('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', I(hn.current.type), E.ref), Re[me] = !0);
    }
  }
  function wt(E, ne) {
    {
      var me = function() {
        ua || (ua = !0, W("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", ne));
      };
      me.isReactWarning = !0, Object.defineProperty(E, "key", {
        get: me,
        configurable: !0
      });
    }
  }
  function _t(E, ne) {
    {
      var me = function() {
        ue || (ue = !0, W("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", ne));
      };
      me.isReactWarning = !0, Object.defineProperty(E, "ref", {
        get: me,
        configurable: !0
      });
    }
  }
  var Cn = function(E, ne, me, De, Ke, Ae, He) {
    var Te = {
      // This tag allows us to uniquely identify this as a React Element
      $$typeof: f,
      // Built-in properties that belong on the element
      type: E,
      key: ne,
      ref: me,
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
      value: De
    }), Object.defineProperty(Te, "_source", {
      configurable: !1,
      enumerable: !1,
      writable: !1,
      value: Ke
    }), Object.freeze && (Object.freeze(Te.props), Object.freeze(Te)), Te;
  };
  function Vt(E, ne, me, De, Ke) {
    {
      var Ae, He = {}, Te = null, Kt = null;
      me !== void 0 && (pn(me), Te = "" + me), ct(ne) && (pn(ne.key), Te = "" + ne.key), $e(ne) && (Kt = ne.ref, Et(ne, Ke));
      for (Ae in ne)
        lt.call(ne, Ae) && !xa.hasOwnProperty(Ae) && (He[Ae] = ne[Ae]);
      if (E && E.defaultProps) {
        var St = E.defaultProps;
        for (Ae in St)
          He[Ae] === void 0 && (He[Ae] = St[Ae]);
      }
      if (Te || Kt) {
        var Rt = typeof E == "function" ? E.displayName || E.name || "Unknown" : E;
        Te && wt(He, Rt), Kt && _t(He, Rt);
      }
      return Cn(E, Te, Kt, Ke, De, hn.current, He);
    }
  }
  var gt = oe.ReactCurrentOwner, At = oe.ReactDebugCurrentFrame;
  function Ea(E) {
    if (E) {
      var ne = E._owner, me = ht(E.type, E._source, ne ? ne.type : null);
      At.setExtraStackFrame(me);
    } else
      At.setExtraStackFrame(null);
  }
  var Sa;
  Sa = !1;
  function ca(E) {
    return typeof E == "object" && E !== null && E.$$typeof === f;
  }
  function or() {
    {
      if (gt.current) {
        var E = I(gt.current.type);
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
        var ne = E.fileName.replace(/^.*[\\\/]/, ""), me = E.lineNumber;
        return `

Check your code at ` + ne + ":" + me + ".";
      }
      return "";
    }
  }
  var di = {};
  function Zi(E) {
    {
      var ne = or();
      if (!ne) {
        var me = typeof E == "string" ? E : E.displayName || E.name;
        me && (ne = `

Check the top-level render call using <` + me + ">.");
      }
      return ne;
    }
  }
  function el(E, ne) {
    {
      if (!E._store || E._store.validated || E.key != null)
        return;
      E._store.validated = !0;
      var me = Zi(ne);
      if (di[me])
        return;
      di[me] = !0;
      var De = "";
      E && E._owner && E._owner !== gt.current && (De = " It was passed a child from " + I(E._owner.type) + "."), Ea(E), W('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', me, De), Ea(null);
    }
  }
  function fi(E, ne) {
    {
      if (typeof E != "object")
        return;
      if (Wt(E))
        for (var me = 0; me < E.length; me++) {
          var De = E[me];
          ca(De) && el(De, ne);
        }
      else if (ca(E))
        E._store && (E._store.validated = !0);
      else if (E) {
        var Ke = le(E);
        if (typeof Ke == "function" && Ke !== E.entries)
          for (var Ae = Ke.call(E), He; !(He = Ae.next()).done; )
            ca(He.value) && el(He.value, ne);
      }
    }
  }
  function Ra(E) {
    {
      var ne = E.type;
      if (ne == null || typeof ne == "string")
        return;
      var me;
      if (typeof ne == "function")
        me = ne.propTypes;
      else if (typeof ne == "object" && (ne.$$typeof === R || // Note: Memo only checks outer props here.
      // Inner props are checked in the reconciler.
      ne.$$typeof === x))
        me = ne.propTypes;
      else
        return;
      if (me) {
        var De = I(ne);
        Dn(me, E.props, "prop", De, E);
      } else if (ne.PropTypes !== void 0 && !Sa) {
        Sa = !0;
        var Ke = I(ne);
        W("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", Ke || "Unknown");
      }
      typeof ne.getDefaultProps == "function" && !ne.getDefaultProps.isReactClassApproved && W("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
    }
  }
  function da(E) {
    {
      for (var ne = Object.keys(E.props), me = 0; me < ne.length; me++) {
        var De = ne[me];
        if (De !== "children" && De !== "key") {
          Ea(E), W("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", De), Ea(null);
          break;
        }
      }
      E.ref !== null && (Ea(E), W("Invalid attribute `ref` supplied to `React.Fragment`."), Ea(null));
    }
  }
  var Jn = {};
  function Ia(E, ne, me, De, Ke, Ae) {
    {
      var He = M(E);
      if (!He) {
        var Te = "";
        (E === void 0 || typeof E == "object" && E !== null && Object.keys(E).length === 0) && (Te += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
        var Kt = io(Ke);
        Kt ? Te += Kt : Te += or();
        var St;
        E === null ? St = "null" : Wt(E) ? St = "array" : E !== void 0 && E.$$typeof === f ? (St = "<" + (I(E.type) || "Unknown") + " />", Te = " Did you accidentally export a JSX literal instead of a component?") : St = typeof E, W("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", St, Te);
      }
      var Rt = Vt(E, ne, me, Ke, Ae);
      if (Rt == null)
        return Rt;
      if (He) {
        var jn = ne.children;
        if (jn !== void 0)
          if (De)
            if (Wt(jn)) {
              for (var Ya = 0; Ya < jn.length; Ya++)
                fi(jn[Ya], E);
              Object.freeze && Object.freeze(jn);
            } else
              W("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
          else
            fi(jn, E);
      }
      if (lt.call(ne, "key")) {
        var Da = I(E), Qt = Object.keys(ne).filter(function(Ye) {
          return Ye !== "key";
        }), pi = Qt.length > 0 ? "{key: someKey, " + Qt.join(": ..., ") + ": ...}" : "{key: someKey}";
        if (!Jn[Da + pi]) {
          var Ca = Qt.length > 0 ? "{" + Qt.join(": ..., ") + ": ...}" : "{}";
          W(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, pi, Da, Ca, Da), Jn[Da + pi] = !0;
        }
      }
      return E === g ? da(Rt) : Ra(Rt), Rt;
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
    function g(ue, Re) {
      var $e = ue.length;
      ue.push(Re), d(ue, Re, $e);
    }
    function b(ue) {
      return ue.length === 0 ? null : ue[0];
    }
    function S(ue) {
      if (ue.length === 0)
        return null;
      var Re = ue[0], $e = ue.pop();
      return $e !== Re && (ue[0] = $e, w(ue, $e, 0)), Re;
    }
    function d(ue, Re, $e) {
      for (var ct = $e; ct > 0; ) {
        var Et = ct - 1 >>> 1, wt = ue[Et];
        if (R(wt, Re) > 0)
          ue[Et] = Re, ue[ct] = wt, ct = Et;
        else
          return;
      }
    }
    function w(ue, Re, $e) {
      for (var ct = $e, Et = ue.length, wt = Et >>> 1; ct < wt; ) {
        var _t = (ct + 1) * 2 - 1, Cn = ue[_t], Vt = _t + 1, gt = ue[Vt];
        if (R(Cn, Re) < 0)
          Vt < Et && R(gt, Cn) < 0 ? (ue[ct] = gt, ue[Vt] = Re, ct = Vt) : (ue[ct] = Cn, ue[_t] = Re, ct = _t);
        else if (Vt < Et && R(gt, Re) < 0)
          ue[ct] = gt, ue[Vt] = Re, ct = Vt;
        else
          return;
      }
    }
    function R(ue, Re) {
      var $e = ue.sortIndex - Re.sortIndex;
      return $e !== 0 ? $e : ue.id - Re.id;
    }
    var j = 1, F = 2, x = 3, T = 4, k = 5;
    function te(ue, Re) {
    }
    var fe = typeof performance == "object" && typeof performance.now == "function";
    if (fe) {
      var le = performance;
      o.unstable_now = function() {
        return le.now();
      };
    } else {
      var oe = Date, W = oe.now();
      o.unstable_now = function() {
        return oe.now() - W;
      };
    }
    var P = 1073741823, Y = -1, Z = 250, z = 5e3, U = 1e4, re = P, Q = [], M = [], ee = 1, Ne = null, I = x, ve = !1, de = !1, G = !1, K = typeof setTimeout == "function" ? setTimeout : null, se = typeof clearTimeout == "function" ? clearTimeout : null, je = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function Pe(ue) {
      for (var Re = b(M); Re !== null; ) {
        if (Re.callback === null)
          S(M);
        else if (Re.startTime <= ue)
          S(M), Re.sortIndex = Re.expirationTime, g(Q, Re);
        else
          return;
        Re = b(M);
      }
    }
    function et(ue) {
      if (G = !1, Pe(ue), !de)
        if (b(Q) !== null)
          de = !0, zt(Ve);
        else {
          var Re = b(M);
          Re !== null && pn(et, Re.startTime - ue);
        }
    }
    function Ve(ue, Re) {
      de = !1, G && (G = !1, hn()), ve = !0;
      var $e = I;
      try {
        var ct;
        if (!f) return Ie(ue, Re);
      } finally {
        Ne = null, I = $e, ve = !1;
      }
    }
    function Ie(ue, Re) {
      var $e = Re;
      for (Pe($e), Ne = b(Q); Ne !== null && !(Ne.expirationTime > $e && (!ue || Ft())); ) {
        var ct = Ne.callback;
        if (typeof ct == "function") {
          Ne.callback = null, I = Ne.priorityLevel;
          var Et = Ne.expirationTime <= $e, wt = ct(Et);
          $e = o.unstable_now(), typeof wt == "function" ? Ne.callback = wt : Ne === b(Q) && S(Q), Pe($e);
        } else
          S(Q);
        Ne = b(Q);
      }
      if (Ne !== null)
        return !0;
      var _t = b(M);
      return _t !== null && pn(et, _t.startTime - $e), !1;
    }
    function st(ue, Re) {
      switch (ue) {
        case j:
        case F:
        case x:
        case T:
        case k:
          break;
        default:
          ue = x;
      }
      var $e = I;
      I = ue;
      try {
        return Re();
      } finally {
        I = $e;
      }
    }
    function fn(ue) {
      var Re;
      switch (I) {
        case j:
        case F:
        case x:
          Re = x;
          break;
        default:
          Re = I;
          break;
      }
      var $e = I;
      I = Re;
      try {
        return ue();
      } finally {
        I = $e;
      }
    }
    function Ht(ue) {
      var Re = I;
      return function() {
        var $e = I;
        I = Re;
        try {
          return ue.apply(this, arguments);
        } finally {
          I = $e;
        }
      };
    }
    function Mt(ue, Re, $e) {
      var ct = o.unstable_now(), Et;
      if (typeof $e == "object" && $e !== null) {
        var wt = $e.delay;
        typeof wt == "number" && wt > 0 ? Et = ct + wt : Et = ct;
      } else
        Et = ct;
      var _t;
      switch (ue) {
        case j:
          _t = Y;
          break;
        case F:
          _t = Z;
          break;
        case k:
          _t = re;
          break;
        case T:
          _t = U;
          break;
        case x:
        default:
          _t = z;
          break;
      }
      var Cn = Et + _t, Vt = {
        id: ee++,
        callback: Re,
        priorityLevel: ue,
        startTime: Et,
        expirationTime: Cn,
        sortIndex: -1
      };
      return Et > ct ? (Vt.sortIndex = Et, g(M, Vt), b(Q) === null && Vt === b(M) && (G ? hn() : G = !0, pn(et, Et - ct))) : (Vt.sortIndex = Cn, g(Q, Vt), !de && !ve && (de = !0, zt(Ve))), Vt;
    }
    function An() {
    }
    function qt() {
      !de && !ve && (de = !0, zt(Ve));
    }
    function Gt() {
      return b(Q);
    }
    function J(ue) {
      ue.callback = null;
    }
    function We() {
      return I;
    }
    var ut = !1, vt = null, ht = -1, lt = p, Ut = -1;
    function Ft() {
      var ue = o.unstable_now() - Ut;
      return !(ue < lt);
    }
    function Ln() {
    }
    function Dn(ue) {
      if (ue < 0 || ue > 125) {
        console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported");
        return;
      }
      ue > 0 ? lt = Math.floor(1e3 / ue) : lt = p;
    }
    var ln = function() {
      if (vt !== null) {
        var ue = o.unstable_now();
        Ut = ue;
        var Re = !0, $e = !0;
        try {
          $e = vt(Re, ue);
        } finally {
          $e ? Wt() : (ut = !1, vt = null);
        }
      } else
        ut = !1;
    }, Wt;
    if (typeof je == "function")
      Wt = function() {
        je(ln);
      };
    else if (typeof MessageChannel < "u") {
      var mn = new MessageChannel(), sa = mn.port2;
      mn.port1.onmessage = ln, Wt = function() {
        sa.postMessage(null);
      };
    } else
      Wt = function() {
        K(ln, 0);
      };
    function zt(ue) {
      vt = ue, ut || (ut = !0, Wt());
    }
    function pn(ue, Re) {
      ht = K(function() {
        ue(o.unstable_now());
      }, Re);
    }
    function hn() {
      se(ht), ht = -1;
    }
    var xa = Ln, ua = null;
    o.unstable_IdlePriority = k, o.unstable_ImmediatePriority = j, o.unstable_LowPriority = T, o.unstable_NormalPriority = x, o.unstable_Profiling = ua, o.unstable_UserBlockingPriority = F, o.unstable_cancelCallback = J, o.unstable_continueExecution = qt, o.unstable_forceFrameRate = Dn, o.unstable_getCurrentPriorityLevel = We, o.unstable_getFirstCallbackNode = Gt, o.unstable_next = fn, o.unstable_pauseExecution = An, o.unstable_requestPaint = xa, o.unstable_runWithPriority = st, o.unstable_scheduleCallback = Mt, o.unstable_shouldYield = Ft, o.unstable_wrapCallback = Ht, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
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
  var R = 0, j = 1, F = 2, x = 3, T = 4, k = 5, te = 6, fe = 7, le = 8, oe = 9, W = 10, P = 11, Y = 12, Z = 13, z = 14, U = 15, re = 16, Q = 17, M = 18, ee = 19, Ne = 21, I = 22, ve = 23, de = 24, G = 25, K = !0, se = !1, je = !1, Pe = !1, et = !1, Ve = !0, Ie = !0, st = !0, fn = !0, Ht = /* @__PURE__ */ new Set(), Mt = {}, An = {};
  function qt(e, t) {
    Gt(e, t), Gt(e + "Capture", t);
  }
  function Gt(e, t) {
    Mt[e] && d("EventRegistry: More than one plugin attempted to publish the same registration name, `%s`.", e), Mt[e] = t;
    {
      var n = e.toLowerCase();
      An[n] = e, e === "onDoubleClick" && (An.ondblclick = e);
    }
    for (var a = 0; a < t.length; a++)
      Ht.add(t[a]);
  }
  var J = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", We = Object.prototype.hasOwnProperty;
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
  function lt(e, t) {
    if (vt(e))
      return d("The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before before using it here.", t, ut(e)), ht(e);
  }
  function Ut(e) {
    if (vt(e))
      return d("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", ut(e)), ht(e);
  }
  function Ft(e, t) {
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
  function ln(e) {
    if (vt(e))
      return d("Form field values (value, checked, defaultValue, or defaultChecked props) must be strings, not %s. This value must be coerced to a string before before using it here.", ut(e)), ht(e);
  }
  var Wt = 0, mn = 1, sa = 2, zt = 3, pn = 4, hn = 5, xa = 6, ua = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD", ue = ua + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040", Re = new RegExp("^[" + ua + "][" + ue + "]*$"), $e = {}, ct = {};
  function Et(e) {
    return We.call(ct, e) ? !0 : We.call($e, e) ? !1 : Re.test(e) ? (ct[e] = !0, !0) : ($e[e] = !0, d("Invalid attribute name: `%s`", e), !1);
  }
  function wt(e, t, n) {
    return t !== null ? t.type === Wt : n ? !1 : e.length > 2 && (e[0] === "o" || e[0] === "O") && (e[1] === "n" || e[1] === "N");
  }
  function _t(e, t, n, a) {
    if (n !== null && n.type === Wt)
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
    if (t === null || typeof t > "u" || _t(e, t, n, a))
      return !0;
    if (a)
      return !1;
    if (n !== null)
      switch (n.type) {
        case zt:
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
  function Vt(e) {
    return At.hasOwnProperty(e) ? At[e] : null;
  }
  function gt(e, t, n, a, r, i, l) {
    this.acceptsBooleans = t === sa || t === zt || t === pn, this.attributeName = a, this.attributeNamespace = r, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = i, this.removeEmptyString = l;
  }
  var At = {}, Ea = [
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
    At[e] = new gt(
      e,
      Wt,
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
    At[t] = new gt(
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
    At[e] = new gt(
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
    At[e] = new gt(
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
    At[e] = new gt(
      e,
      zt,
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
    At[e] = new gt(
      e,
      zt,
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
    At[e] = new gt(
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
    At[e] = new gt(
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
    At[e] = new gt(
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
    At[t] = new gt(
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
    At[t] = new gt(
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
    At[t] = new gt(
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
    At[e] = new gt(
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
  At[or] = new gt(
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
    At[e] = new gt(
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
      lt(n, t), a.sanitizeURL && Zi("" + n);
      var i = a.attributeName, l = null;
      if (a.type === pn) {
        if (e.hasAttribute(i)) {
          var u = e.getAttribute(i);
          return u === "" ? !0 : Cn(t, n, a, !1) ? u : u === "" + n ? n : u;
        }
      } else if (e.hasAttribute(i)) {
        if (Cn(t, n, a, !1))
          return e.getAttribute(i);
        if (a.type === zt)
          return n;
        l = e.getAttribute(i);
      }
      return Cn(t, n, a, !1) ? l === null ? n : l : l === "" + n ? n : l;
    }
  }
  function fi(e, t, n, a) {
    {
      if (!Et(t))
        return;
      if (!e.hasAttribute(t))
        return n === void 0 ? void 0 : null;
      var r = e.getAttribute(t);
      return lt(n, t), r === "" + n ? n : r;
    }
  }
  function Ra(e, t, n, a) {
    var r = Vt(t);
    if (!wt(t, r, a)) {
      if (Cn(t, n, r, a) && (n = null), a || r === null) {
        if (Et(t)) {
          var i = t;
          n === null ? e.removeAttribute(i) : (lt(n, t), e.setAttribute(i, "" + n));
        }
        return;
      }
      var l = r.mustUseProperty;
      if (l) {
        var u = r.propertyName;
        if (n === null) {
          var c = r.type;
          e[u] = c === zt ? !1 : "";
        } else
          e[u] = n;
        return;
      }
      var h = r.attributeName, v = r.attributeNamespace;
      if (n === null)
        e.removeAttribute(h);
      else {
        var C = r.type, D;
        C === zt || C === pn && n === !0 ? D = "" : (lt(n, h), D = "" + n, r.sanitizeURL && Zi(D.toString())), v ? e.setAttributeNS(v, h, D) : e.setAttribute(h, D);
      }
    }
  }
  var da = Symbol.for("react.element"), Jn = Symbol.for("react.portal"), Ia = Symbol.for("react.fragment"), mi = Symbol.for("react.strict_mode"), E = Symbol.for("react.profiler"), ne = Symbol.for("react.provider"), me = Symbol.for("react.context"), De = Symbol.for("react.forward_ref"), Ke = Symbol.for("react.suspense"), Ae = Symbol.for("react.suspense_list"), He = Symbol.for("react.memo"), Te = Symbol.for("react.lazy"), Kt = Symbol.for("react.scope"), St = Symbol.for("react.debug_trace_mode"), Rt = Symbol.for("react.offscreen"), jn = Symbol.for("react.legacy_hidden"), Ya = Symbol.for("react.cache"), Da = Symbol.for("react.tracing_marker"), Qt = Symbol.iterator, pi = "@@iterator";
  function Ca(e) {
    if (e === null || typeof e != "object")
      return null;
    var t = Qt && e[Qt] || e[pi];
    return typeof t == "function" ? t : null;
  }
  var Ye = Object.assign, hi = 0, iu, lu, Ar, lo, oo, so, uo;
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
          log: Ye({}, e, {
            value: iu
          }),
          info: Ye({}, e, {
            value: lu
          }),
          warn: Ye({}, e, {
            value: Ar
          }),
          error: Ye({}, e, {
            value: lo
          }),
          group: Ye({}, e, {
            value: oo
          }),
          groupCollapsed: Ye({}, e, {
            value: so
          }),
          groupEnd: Ye({}, e, {
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
          } catch (L) {
            a = L;
          }
          Reflect.construct(e, [], l);
        } else {
          try {
            l.call();
          } catch (L) {
            a = L;
          }
          e.call(l.prototype);
        }
      } else {
        try {
          throw Error();
        } catch (L) {
          a = L;
        }
        e();
      }
    } catch (L) {
      if (L && a && typeof L.stack == "string") {
        for (var u = L.stack.split(`
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
    var D = e ? e.displayName || e.name : "", V = D ? qa(D) : "";
    return typeof e == "function" && Lr.set(e, V), V;
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
      case Ke:
        return qa("Suspense");
      case Ae:
        return qa("SuspenseList");
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case De:
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
      case k:
        return qa(e.type);
      case re:
        return qa("Lazy");
      case Z:
        return qa("Suspense");
      case ee:
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
  function at(e) {
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
      case Ke:
        return "Suspense";
      case Ae:
        return "SuspenseList";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case me:
          var t = e;
          return ho(t) + ".Consumer";
        case ne:
          var n = e;
          return ho(n._context) + ".Provider";
        case De:
          return cu(e, e.render, "ForwardRef");
        case He:
          var a = e.displayName || null;
          return a !== null ? a : at(e.type) || "Memo";
        case Te: {
          var r = e, i = r._payload, l = r._init;
          try {
            return at(l(i));
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
      case oe:
        var a = n;
        return sr(a) + ".Consumer";
      case W:
        var r = n;
        return sr(r._context) + ".Provider";
      case M:
        return "DehydratedFragment";
      case P:
        return Rd(n, n.render, "ForwardRef");
      case fe:
        return "Fragment";
      case k:
        return n;
      case T:
        return "Portal";
      case x:
        return "Root";
      case te:
        return "Text";
      case re:
        return at(n);
      case le:
        return n === mi ? "StrictMode" : "Mode";
      case I:
        return "Offscreen";
      case Y:
        return "Profiler";
      case Ne:
        return "Scope";
      case Z:
        return "Suspense";
      case ee:
        return "SuspenseList";
      case G:
        return "TracingMarker";
      case j:
      case R:
      case Q:
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
  function on() {
    vo.getCurrentStack = null, kn = null, yi = !1;
  }
  function Ct(e) {
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
        return ln(e), e;
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
    ln(e[t]);
    var a = "" + e[t];
    if (!(e.hasOwnProperty(t) || typeof n > "u" || typeof n.get != "function" || typeof n.set != "function")) {
      var r = n.get, i = n.set;
      Object.defineProperty(e, t, {
        configurable: !0,
        get: function() {
          return r.call(this);
        },
        set: function(u) {
          ln(u), a = "" + u, i.call(this, u);
        }
      }), Object.defineProperty(e, t, {
        enumerable: n.enumerable
      });
      var l = {
        getValue: function() {
          return a;
        },
        setValue: function(u) {
          ln(u), a = "" + u;
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
    var n = e, a = t.checked, r = Ye({}, t, {
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
  function A(e, t, n) {
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
    N(n, t), ie(n, t);
  }
  function ie(e, t) {
    var n = t.name;
    if (t.type === "radio" && n != null) {
      for (var a = e; a.parentNode; )
        a = a.parentNode;
      lt(n, "name");
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
  function qe(e) {
    return Nt(e);
  }
  var jt;
  jt = !1;
  function Bt() {
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
          var a = qe(e[n]);
          e.multiple && !a ? d("The `%s` prop supplied to <select> must be an array if `multiple` is true.%s", n, Bt()) : !e.multiple && a && d("The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.%s", n, Bt());
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
    return Ye({}, t, {
      value: void 0
    });
  }
  function So(e, t) {
    var n = e;
    xo(t), n._wrapperState = {
      wasMultiple: !!t.multiple
    }, t.value !== void 0 && t.defaultValue !== void 0 && !jt && (d("Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://reactjs.org/link/controlled-components"), jt = !0);
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
    var a = Ye({}, t, {
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
          if (qe(r)) {
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
  }), Yn = 1, fr = 3, $t = 8, mr = 9, Ad = 11, bu = function(e, t) {
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
  }, mE = Ye({
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
  }, ul = {}, hE = new RegExp("^(aria)-[" + ue + "]*$"), vE = new RegExp("^(aria)[A-Z][" + ue + "]*$");
  function gE(e, t) {
    {
      if (We.call(ul, t) && ul[t])
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
    var Fn = {}, uv = /^on./, xE = /^on[^A-Z]/, EE = new RegExp("^(aria)-[" + ue + "]*$"), SE = new RegExp("^(aria)[A-Z][" + ue + "]*$");
    sv = function(e, t, n, a) {
      if (We.call(Fn, t) && Fn[t])
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
      var c = Vt(t), h = c !== null && c.type === Wt;
      if (yu.hasOwnProperty(r)) {
        var v = yu[r];
        if (v !== t)
          return d("Invalid DOM property `%s`. Did you mean `%s`?", t, v), Fn[t] = !0, !0;
      } else if (!h && t !== r)
        return d("React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.", t, r), Fn[t] = !0, !0;
      return typeof n == "boolean" && _t(t, n, c, !1) ? (n ? d('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.', n, t, t, n, t) : d('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.', n, t, t, n, t, t, t), Fn[t] = !0, !0) : h ? !0 : _t(t, n, c, !1) ? (Fn[t] = !0, !1) : ((n === "false" || n === "true") && c !== null && c.type === zt && (d("Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?", n, t, n === "false" ? "The browser will interpret it as a truthy value." : 'Although this works, it will not work as expected if you pass the string "false".', t, n), Fn[t] = !0), !0);
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
  if (J)
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
      var v = document.createEvent("Event"), C = !1, D = !0, V = window.event, L = Object.getOwnPropertyDescriptor(window, "event");
      function B() {
        $d.removeEventListener($, Ce, !1), typeof window.event < "u" && window.hasOwnProperty("event") && (window.event = V);
      }
      var pe = Array.prototype.slice.call(arguments, 3);
      function Ce() {
        C = !0, B(), n.apply(a, pe), D = !1;
      }
      var Se, Ze = !1, Ge = !1;
      function _(O) {
        if (Se = O.error, Ze = !0, Se === null && O.colno === 0 && O.lineno === 0 && (Ge = !0), O.defaultPrevented && Se != null && typeof Se == "object")
          try {
            Se._suppressLogging = !0;
          } catch {
          }
      }
      var $ = "react-" + (t || "invokeguardedcallback");
      if (window.addEventListener("error", _), $d.addEventListener($, Ce, !1), v.initEvent($, !1, !1), $d.dispatchEvent(v), L && Object.defineProperty(window, "event", L), C && D && (Ze ? Ge && (Se = new Error("A cross-origin error was thrown. React doesn't have access to the actual error object in development. See https://reactjs.org/link/crossorigin-error for more information.")) : Se = new Error(`An error was thrown inside one of your components, but React doesn't know what it was. This is likely due to browser flakiness. React does its best to preserve the "Pause on exceptions" behavior of the DevTools, which requires some DEV-mode only tricks. It's possible that these don't work in your browser. Try triggering the error in production mode, or switching to a modern browser. If you suspect that this is actually an issue with React, please file an issue.`), this.onError(Se)), window.removeEventListener("error", _), !C)
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
  ), It = (
    /*                    */
    2
  ), rt = (
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
  ), it = (
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
    rt | hl | 0
  ), Zd = It | rt | Si | wo | Ri | hr | Di, _o = rt | yv | Ri | Di, vl = Fr | Si, vr = Ci | Qd | Kd, IE = p.ReactCurrentOwner;
  function ji(e) {
    var t = e, n = e;
    if (e.alternate)
      for (; t.return; )
        t = t.return;
    else {
      var a = t;
      do
        t = a, (t.flags & (It | hr)) !== Oe && (n = t.return), a = t.return;
      while (a);
    }
    return t.tag === x ? n : null;
  }
  function xv(e) {
    if (e.tag === Z) {
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
    if (e.tag === k || e.tag === te)
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
    if (e.tag === k || e.tag === te)
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
  var Tv = f.unstable_scheduleCallback, WE = f.unstable_cancelCallback, KE = f.unstable_shouldYield, QE = f.unstable_requestPaint, sn = f.unstable_now, XE = f.unstable_getCurrentPriorityLevel, Su = f.unstable_ImmediatePriority, ef = f.unstable_UserBlockingPriority, Ti = f.unstable_NormalPriority, JE = f.unstable_LowPriority, tf = f.unstable_IdlePriority, ZE = f.unstable_yieldValue, eS = f.unstable_setDisableYieldValue, gl = null, Tn = null, ge = null, Ga = !1, Ta = typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u";
  function tS(e) {
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u")
      return !1;
    var t = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (t.isDisabled)
      return !0;
    if (!t.supportsFiber)
      return d("The installed version of React DevTools is too old and will not work with the current version of React. Please update React DevTools. https://reactjs.org/link/react-devtools"), !0;
    try {
      Ie && (e = Ye({}, e, {
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
        var n = (e.current.flags & it) === it;
        if (st) {
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
  function un(e) {
    if (typeof ZE == "function" && (eS(e), b(e)), Tn && typeof Tn.setStrictMode == "function")
      try {
        Tn.setStrictMode(gl, e);
      } catch (t) {
        Ga || (Ga = !0, d("React instrumentation encountered an error: %s", t));
      }
  }
  function lS(e) {
    ge = e;
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
    ge !== null && typeof ge.markCommitStarted == "function" && ge.markCommitStarted(e);
  }
  function wv() {
    ge !== null && typeof ge.markCommitStopped == "function" && ge.markCommitStopped();
  }
  function Oo(e) {
    ge !== null && typeof ge.markComponentRenderStarted == "function" && ge.markComponentRenderStarted(e);
  }
  function bl() {
    ge !== null && typeof ge.markComponentRenderStopped == "function" && ge.markComponentRenderStopped();
  }
  function uS(e) {
    ge !== null && typeof ge.markComponentPassiveEffectMountStarted == "function" && ge.markComponentPassiveEffectMountStarted(e);
  }
  function cS() {
    ge !== null && typeof ge.markComponentPassiveEffectMountStopped == "function" && ge.markComponentPassiveEffectMountStopped();
  }
  function dS(e) {
    ge !== null && typeof ge.markComponentPassiveEffectUnmountStarted == "function" && ge.markComponentPassiveEffectUnmountStarted(e);
  }
  function fS() {
    ge !== null && typeof ge.markComponentPassiveEffectUnmountStopped == "function" && ge.markComponentPassiveEffectUnmountStopped();
  }
  function mS(e) {
    ge !== null && typeof ge.markComponentLayoutEffectMountStarted == "function" && ge.markComponentLayoutEffectMountStarted(e);
  }
  function pS() {
    ge !== null && typeof ge.markComponentLayoutEffectMountStopped == "function" && ge.markComponentLayoutEffectMountStopped();
  }
  function _v(e) {
    ge !== null && typeof ge.markComponentLayoutEffectUnmountStarted == "function" && ge.markComponentLayoutEffectUnmountStarted(e);
  }
  function Ov() {
    ge !== null && typeof ge.markComponentLayoutEffectUnmountStopped == "function" && ge.markComponentLayoutEffectUnmountStopped();
  }
  function hS(e, t, n) {
    ge !== null && typeof ge.markComponentErrored == "function" && ge.markComponentErrored(e, t, n);
  }
  function vS(e, t, n) {
    ge !== null && typeof ge.markComponentSuspended == "function" && ge.markComponentSuspended(e, t, n);
  }
  function gS(e) {
    ge !== null && typeof ge.markLayoutEffectsStarted == "function" && ge.markLayoutEffectsStarted(e);
  }
  function bS() {
    ge !== null && typeof ge.markLayoutEffectsStopped == "function" && ge.markLayoutEffectsStopped();
  }
  function yS(e) {
    ge !== null && typeof ge.markPassiveEffectsStarted == "function" && ge.markPassiveEffectsStarted(e);
  }
  function NS() {
    ge !== null && typeof ge.markPassiveEffectsStopped == "function" && ge.markPassiveEffectsStopped();
  }
  function Mv(e) {
    ge !== null && typeof ge.markRenderStarted == "function" && ge.markRenderStarted(e);
  }
  function xS() {
    ge !== null && typeof ge.markRenderYielded == "function" && ge.markRenderYielded();
  }
  function Vv() {
    ge !== null && typeof ge.markRenderStopped == "function" && ge.markRenderStopped();
  }
  function ES(e) {
    ge !== null && typeof ge.markRenderScheduled == "function" && ge.markRenderScheduled(e);
  }
  function SS(e, t) {
    ge !== null && typeof ge.markForceUpdateScheduled == "function" && ge.markForceUpdateScheduled(e, t);
  }
  function nf(e, t) {
    ge !== null && typeof ge.markStateUpdateScheduled == "function" && ge.markStateUpdateScheduled(e, t);
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
  ), Lt = (
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
  var af = 31, X = (
    /*                        */
    0
  ), cn = (
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
    if (n === X)
      return X;
    var a = X, r = e.suspendedLanes, i = e.pingedLanes, l = n & kv;
    if (l !== X) {
      var u = l & ~r;
      if (u !== X)
        a = ko(u);
      else {
        var c = l & i;
        c !== X && (a = ko(c));
      }
    } else {
      var h = n & ~r;
      h !== X ? a = ko(h) : i !== X && (a = ko(i));
    }
    if (a === X)
      return X;
    if (t !== X && t !== a && // If we already suspended with a delay, then interrupting is fine. Don't
    // bother waiting until the root is complete.
    (t & r) === X) {
      var v = Oi(a), C = Oi(t);
      if (
        // Tests whether the next lane is equal or lower priority than the wip
        // one. This works because the bits decrease in priority as you go left.
        v >= C || // Default priority updates should not interrupt transition updates. The
        // only difference between default updates and transition updates is that
        // default updates do not support refresh transitions.
        v === Ka && (C & Nl) !== X
      )
        return t;
    }
    (a & gr) !== X && (a |= n & Ka);
    var D = e.entangledLanes;
    if (D !== X)
      for (var V = e.entanglements, L = a & D; L > 0; ) {
        var B = Mi(L), pe = 1 << B;
        a |= V[B], L &= ~pe;
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
      h === xt ? ((c & a) === X || (c & r) !== X) && (i[u] = wS(c, t)) : h <= t && (e.expiredLanes |= c), l &= ~c;
    }
  }
  function OS(e) {
    return ko(e.pendingLanes);
  }
  function Rf(e) {
    var t = e.pendingLanes & ~Zn;
    return t !== X ? t : t & Zn ? Zn : X;
  }
  function MS(e) {
    return (e & Le) !== X;
  }
  function Df(e) {
    return (e & kv) !== X;
  }
  function Uv(e) {
    return (e & Ru) === e;
  }
  function VS(e) {
    var t = Le | gr | Ka;
    return (e & t) === X;
  }
  function AS(e) {
    return (e & Nl) === e;
  }
  function Tu(e, t) {
    var n = yl | gr | wi | Ka;
    return (t & n) !== X;
  }
  function LS(e, t) {
    return (t & e.expiredLanes) !== X;
  }
  function Fv(e) {
    return (e & Nl) !== X;
  }
  function zv() {
    var e = Du;
    return Du <<= 1, (Du & Nl) === X && (Du = Vo), e;
  }
  function kS() {
    var e = Cu;
    return Cu <<= 1, (Cu & Ru) === X && (Cu = xl), e;
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
    return (e & t) !== X;
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
    return e !== cn && e < t ? e : t;
  }
  function jf(e) {
    for (var t = [], n = 0; n < af; n++)
      t.push(e);
    return t;
  }
  function Fo(e, t, n) {
    e.pendingLanes |= t, t !== _i && (e.suspendedLanes = X, e.pingedLanes = X);
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
    e.pendingLanes = t, e.suspendedLanes = X, e.pingedLanes = X, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t;
    for (var a = e.entanglements, r = e.eventTimes, i = e.expirationTimes, l = n; l > 0; ) {
      var u = Mi(l), c = 1 << u;
      a[u] = X, r[u] = xt, i[u] = xt, l &= ~c;
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
        a = cn;
        break;
    }
    return (a & (e.suspendedLanes | t)) !== cn ? cn : a;
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
  var ta = Le, br = gr, yr = Ka, _u = _i, zo = cn;
  function wa() {
    return zo;
  }
  function dn(e) {
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
        if (a === Z) {
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
      dn(ta), Vf(e, t, n, a);
    } finally {
      dn(r), Sl.transition = i;
    }
  }
  function i0(e, t, n, a) {
    var r = wa(), i = Sl.transition;
    Sl.transition = null;
    try {
      dn(br), Vf(e, t, n, a);
    } finally {
      dn(r), Sl.transition = i;
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
        if (u === Z) {
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
    return Ye(t.prototype, {
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
  }, kf = na(Rl), Go = Ye({}, Rl, {
    view: 0,
    detail: 0
  }), m0 = na(Go), Uf, Ff, Wo;
  function p0(e) {
    e !== Wo && (Wo && e.type === "mousemove" ? (Uf = e.screenX - Wo.screenX, Ff = e.screenY - Wo.screenY) : (Uf = 0, Ff = 0), Wo = e);
  }
  var Uu = Ye({}, Go, {
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
  }), rg = na(Uu), h0 = Ye({}, Uu, {
    dataTransfer: 0
  }), v0 = na(h0), g0 = Ye({}, Go, {
    relatedTarget: 0
  }), zf = na(g0), b0 = Ye({}, Rl, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), y0 = na(b0), N0 = Ye({}, Rl, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), x0 = na(N0), E0 = Ye({}, Rl, {
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
  var w0 = Ye({}, Go, {
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
  }), _0 = na(w0), O0 = Ye({}, Uu, {
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
  }), lg = na(O0), M0 = Ye({}, Go, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Pf
  }), V0 = na(M0), A0 = Ye({}, Rl, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), L0 = na(A0), k0 = Ye({}, Uu, {
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
  }), U0 = na(k0), F0 = [9, 13, 27, 32], og = 229, Hf = J && "CompositionEvent" in window, Ko = null;
  J && "documentMode" in document && (Ko = document.documentMode);
  var z0 = J && "TextEvent" in window && !Ko, sg = J && (!Hf || Ko && Ko > 8 && Ko <= 11), ug = 32, cg = String.fromCharCode(ug);
  function P0() {
    qt("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), qt("onCompositionEnd", ["compositionend", "focusout", "keydown", "keypress", "keyup", "mousedown"]), qt("onCompositionStart", ["compositionstart", "focusout", "keydown", "keypress", "keyup", "mousedown"]), qt("onCompositionUpdate", ["compositionupdate", "focusout", "keydown", "keypress", "keyup", "mousedown"]);
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
    if (!J)
      return !1;
    var t = "on" + e, n = t in document;
    if (!n) {
      var a = document.createElement("div");
      a.setAttribute(t, "return;"), n = typeof a[t] == "function";
    }
    return n;
  }
  function X0() {
    qt("onChange", ["change", "click", "focusin", "focusout", "input", "keydown", "keyup", "selectionchange"]);
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
  J && (gg = Q0("input") && (!document.documentMode || document.documentMode > 9));
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
    Gt("onMouseEnter", ["mouseout", "mouseover"]), Gt("onMouseLeave", ["mouseout", "mouseover"]), Gt("onPointerEnter", ["pointerout", "pointerover"]), Gt("onPointerLeave", ["pointerout", "pointerover"]);
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
      var D, V;
      if (c) {
        var L = a.relatedTarget || a.toElement;
        if (D = n, V = L ? Li(L) : null, V !== null) {
          var B = ji(V);
          (V !== B || V.tag !== k && V.tag !== te) && (V = null);
        }
      } else
        D = null, V = n;
      if (D !== V) {
        var pe = rg, Ce = "onMouseLeave", Se = "onMouseEnter", Ze = "mouse";
        (t === "pointerout" || t === "pointerover") && (pe = lg, Ce = "onPointerLeave", Se = "onPointerEnter", Ze = "pointer");
        var Ge = D == null ? v : Ol(D), _ = V == null ? v : Ol(V), $ = new pe(Ce, Ze + "leave", D, a, r);
        $.target = Ge, $.relatedTarget = _;
        var O = null, ae = Li(r);
        if (ae === n) {
          var ye = new pe(Se, Ze + "enter", V, a, r);
          ye.target = _, ye.relatedTarget = Ge, O = ye;
        }
        LR(e, $, O, D, V);
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
      if (!We.call(t, i) || !aa(e[i], t[i]))
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
  var SR = J && "documentMode" in document && document.documentMode <= 11;
  function RR() {
    qt("onSelect", ["focusout", "contextmenu", "dragend", "focusin", "keydown", "keyup", "mousedown", "mouseup", "selectionchange"]);
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
  J && (Cg = document.createElement("div").style, "AnimationEvent" in window || (delete jl.animationend.animation, delete jl.animationiteration.animation, delete jl.animationstart.animation), "TransitionEvent" in window || delete jl.transitionend.transition);
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
    Og.set(e, t), qt(t, [e]);
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
          var V = new c(u, h, null, a, r);
          e.push({
            event: V,
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
        var v = t[h], C = v.instance, D = v.currentTarget, V = v.listener;
        if (C !== a && e.isPropagationStopped())
          return;
        Vg(e, V, D), a = C;
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
  function Dt(e, t) {
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
      e[Hu] = !0, Ht.forEach(function(n) {
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
    return e === t || e.nodeType === $t && e.parentNode === t;
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
              var V = Li(h);
              if (V === null)
                return;
              var L = V.tag;
              if (L === k || L === te) {
                u = i = V;
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
      var C = h, D = C.stateNode, V = C.tag;
      if (V === k && D !== null && (v = D, u !== null)) {
        var L = jo(h, u);
        L != null && c.push(ns(h, L, v));
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
      if (u === k && l !== null) {
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
    while (e && e.tag !== k);
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
      if (C === k && v !== null) {
        var D = v;
        if (r) {
          var V = jo(u, i);
          V != null && l.unshift(ns(u, V, D));
        } else if (!r) {
          var L = jo(u, i);
          L != null && l.push(ns(u, L, D));
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
      registrationNameDependencies: Mt,
      possibleRegistrationNames: An
    });
  }, Pg = J && !document.documentMode, rs = function(e, t, n) {
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
    if (i !== r && (a && (qn || (qn = !0, d('Text content did not match. Server: "%s" Client: "%s"', i, r))), n && K))
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
        else i === $u || i === Yr || i === Fg || (Mt.hasOwnProperty(i) ? l != null && (typeof l != "function" && qu(i, l), i === "onScroll" && Dt("scroll", t)) : l != null && Ra(t, i, l, r));
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
    return u === dr && !r && Object.prototype.toString.call(l) === "[object HTMLUnknownElement]" && !We.call(Kf, e) && (Kf[e] = !0, d("The tag <%s> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.", e)), l;
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
        Dt("cancel", e), Dt("close", e), i = n;
        break;
      case "iframe":
      case "object":
      case "embed":
        Dt("load", e), i = n;
        break;
      case "video":
      case "audio":
        for (var l = 0; l < es.length; l++)
          Dt(es[l], e);
        i = n;
        break;
      case "source":
        Dt("error", e), i = n;
        break;
      case "img":
      case "image":
      case "link":
        Dt("error", e), Dt("load", e), i = n;
        break;
      case "details":
        Dt("toggle", e), i = n;
        break;
      case "input":
        hu(e, n), i = No(e, n), Dt("invalid", e);
        break;
      case "option":
        dt(e, n), i = n;
        break;
      case "select":
        So(e, n), i = Eo(e, n), Dt("invalid", e);
        break;
      case "textarea":
        Qh(e, n), i = _d(e, n), Dt("invalid", e);
        break;
      default:
        i = n;
    }
    switch (Ud(t, i), PR(t, e, a, i, r), t) {
      case "input":
        Ni(e), A(e, n, !1);
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
        } else c === as || c === Vi || c === $u || c === Yr || c === Fg || (Mt.hasOwnProperty(c) ? i || (i = []) : (i = i || []).push(c, null));
    for (c in u) {
      var D = u[c], V = l != null ? l[c] : void 0;
      if (!(!u.hasOwnProperty(c) || D === V || D == null && V == null))
        if (c === Ai)
          if (D && Object.freeze(D), V) {
            for (h in V)
              V.hasOwnProperty(h) && (!D || !D.hasOwnProperty(h)) && (v || (v = {}), v[h] = "");
            for (h in D)
              D.hasOwnProperty(h) && V[h] !== D[h] && (v || (v = {}), v[h] = D[h]);
          } else
            v || (i || (i = []), i.push(c, v)), v = D;
        else if (c === as) {
          var L = D ? D[Iu] : void 0, B = V ? V[Iu] : void 0;
          L != null && B !== L && (i = i || []).push(c, L);
        } else c === Vi ? (typeof D == "string" || typeof D == "number") && (i = i || []).push(c, "" + D) : c === $u || c === Yr || (Mt.hasOwnProperty(c) ? (D != null && (typeof D != "function" && qu(c, D), c === "onScroll" && Dt("scroll", e)), !i && V !== D && (i = [])) : (i = i || []).push(c, D));
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
        Dt("cancel", e), Dt("close", e);
        break;
      case "iframe":
      case "object":
      case "embed":
        Dt("load", e);
        break;
      case "video":
      case "audio":
        for (var h = 0; h < es.length; h++)
          Dt(es[h], e);
        break;
      case "source":
        Dt("error", e);
        break;
      case "img":
      case "image":
      case "link":
        Dt("error", e), Dt("load", e);
        break;
      case "details":
        Dt("toggle", e);
        break;
      case "input":
        hu(e, n), Dt("invalid", e);
        break;
      case "option":
        dt(e, n);
        break;
      case "select":
        So(e, n), Dt("invalid", e);
        break;
      case "textarea":
        Qh(e, n), Dt("invalid", e);
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
    var V = null;
    for (var L in n)
      if (n.hasOwnProperty(L)) {
        var B = n[L];
        if (L === Vi)
          typeof B == "string" ? e.textContent !== B && (n[Yr] !== !0 && Wu(e.textContent, B, i, l), V = [Vi, B]) : typeof B == "number" && e.textContent !== "" + B && (n[Yr] !== !0 && Wu(e.textContent, B, i, l), V = [Vi, "" + B]);
        else if (Mt.hasOwnProperty(L))
          B != null && (typeof B != "function" && qu(L, B), L === "onScroll" && Dt("scroll", e));
        else if (l && // Convince Flow we've calculated it (it's DEV-only in this method.)
        typeof u == "boolean") {
          var pe = void 0, Ce = Vt(L);
          if (n[Yr] !== !0) {
            if (!(L === $u || L === Yr || // Controlled attributes are not validated
            // TODO: Only ignore them on controlled tags.
            L === "value" || L === "checked" || L === "selected")) {
              if (L === as) {
                var Se = e.innerHTML, Ze = B ? B[Iu] : void 0;
                if (Ze != null) {
                  var Ge = Hg(e, Ze);
                  Ge !== Se && rs(L, Se, Ge);
                }
              } else if (L === Ai) {
                if (c.delete(L), Pg) {
                  var _ = uE(B);
                  pe = e.getAttribute("style"), _ !== pe && rs(L, pe, _);
                }
              } else if (u && !et)
                c.delete(L.toLowerCase()), pe = fi(e, L, B), B !== pe && rs(L, pe, B);
              else if (!wt(L, Ce, u) && !Cn(L, B, Ce, u)) {
                var $ = !1;
                if (Ce !== null)
                  c.delete(Ce.attributeName), pe = el(e, L, B, Ce);
                else {
                  var O = a;
                  if (O === dr && (O = Md(t)), O === dr)
                    c.delete(L.toLowerCase());
                  else {
                    var ae = GR(L);
                    ae !== null && ae !== L && ($ = !0, c.delete(ae)), c.delete(L);
                  }
                  pe = fi(e, L, B);
                }
                var ye = et;
                !ye && B !== pe && !$ && rs(L, pe, B);
              }
            }
          }
        }
      }
    switch (l && // $FlowFixMe - Should be inferred as not undefined.
    c.size > 0 && n[Yr] !== !0 && zg(c), t) {
      case "input":
        Ni(e), A(e, n, !0);
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
    return V;
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
      var n = Ye({}, e || Ig), a = {
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
        var i = a === $t ? e.parentNode : e, l = i.namespaceURI || null;
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
    e.nodeType === $t ? (n = e.parentNode, n.insertBefore(t, e)) : (n = e, n.appendChild(t));
    var a = e._reactRootContainer;
    a == null && n.onclick === null && Ku(n);
  }
  function xD(e, t, n) {
    e.insertBefore(t, n);
  }
  function ED(e, t, n) {
    e.nodeType === $t ? e.parentNode.insertBefore(t, n) : e.insertBefore(t, n);
  }
  function SD(e, t) {
    e.removeChild(t);
  }
  function RD(e, t) {
    e.nodeType === $t ? e.parentNode.removeChild(t) : e.removeChild(t);
  }
  function im(e, t) {
    var n = t, a = 0;
    do {
      var r = n.nextSibling;
      if (e.removeChild(n), r && r.nodeType === $t) {
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
    e.nodeType === $t ? im(e.parentNode, t) : e.nodeType === Yn && im(e, t), Io(e);
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
    return e.nodeType !== $t ? null : e;
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
      if (t === $t) {
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
      if (t.nodeType === $t) {
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
      if (t.nodeType === $t) {
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
    t.nodeType === Yn ? Qf(e, t) : t.nodeType === $t || Xf(e, t);
  }
  function KD(e, t) {
    {
      var n = e.parentNode;
      n !== null && (t.nodeType === Yn ? Qf(n, t) : t.nodeType === $t || Xf(n, t));
    }
  }
  function QD(e, t, n, a, r) {
    (r || t[Qu] !== !0) && (a.nodeType === Yn ? Qf(n, a) : a.nodeType === $t || Xf(n, a));
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
    return t && (t.tag === k || t.tag === te || t.tag === Z || t.tag === x) ? t : null;
  }
  function Ol(e) {
    if (e.tag === k || e.tag === te)
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
      var i = Function.call.bind(We);
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
      return Ye({}, n, l);
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
        for (dn(ta); e < a.length; e++) {
          var r = a[e];
          do
            r = r(n);
          while (r !== null);
        }
        Er = null, pm = !1;
      } catch (i) {
        throw Er !== null && (Er = Er.slice(e + 1)), Tv(Su, Kr), i;
      } finally {
        dn(t), hm = !1;
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
      var h = i - i % 5, v = (1 << h) - 1, C = (l & v).toString(32), D = l >> h, V = i - h, L = cc(t) + V, B = u << V, pe = B | D, Ce = C + r;
      Sr = 1 << L | pe, Rr = Ce;
    } else {
      var Se = u << i, Ze = Se | l, Ge = r;
      Sr = 1 << c | Ze, Rr = Ge;
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
      case k: {
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
      case Z: {
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
            case k:
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
        case k: {
          var i = e.type, l = e.memoizedProps, u = e.stateNode;
          switch (t.tag) {
            case k: {
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
        case Z: {
          var V = e.memoizedState, L = V.dehydrated;
          if (L !== null) switch (t.tag) {
            case k:
              var B = t.type;
              t.pendingProps, ZD(L, B);
              break;
            case te:
              var pe = t.pendingProps;
              eC(L, pe);
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
    t.flags = t.flags & ~hr | It, bm(e, t);
  }
  function cb(e, t) {
    switch (e.tag) {
      case k: {
        var n = e.type;
        e.pendingProps;
        var a = OD(t, n);
        return a !== null ? (e.stateNode = a, vn = e, ha = kD(a), !0) : !1;
      }
      case te: {
        var r = e.pendingProps, i = MD(t, r);
        return i !== null ? (e.stateNode = i, vn = e, ha = null, !0) : !1;
      }
      case Z: {
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
    return (e.mode & Xe) !== we && (e.flags & it) === Oe;
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
          case k: {
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
    for (var t = e.return; t !== null && t.tag !== k && t.tag !== x && t.tag !== Z; )
      t = t.return;
    vn = t;
  }
  function dc(e) {
    if (e !== vn)
      return !1;
    if (!Oa)
      return db(e), Oa = !0, !1;
    if (e.tag !== x && (e.tag !== k || YD(e.type) && !nm(e.type, e.memoizedProps))) {
      var t = ha;
      if (t)
        if (ym(e))
          fb(e), Nm();
        else
          for (; t; )
            sb(e, t), t = us(t);
    }
    return db(e), e.tag === Z ? ha = RC(e) : ha = vn ? us(e.stateNode) : null, !0;
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
        n.mode & Lt && (t = n), n = n.return;
      return t;
    }, Pi = function(e) {
      var t = [];
      return e.forEach(function(n) {
        t.push(n);
      }), t.sort().join(", ");
    }, ms = [], ps = [], hs = [], vs = [], gs = [], bs = [], Hi = /* @__PURE__ */ new Set();
    Ma.recordUnsafeLifecycleWarnings = function(e, t) {
      Hi.has(e.type) || (typeof t.componentWillMount == "function" && // Don't warn about react-lifecycles-compat polyfilled components.
      t.componentWillMount.__suppressDeprecationWarning !== !0 && ms.push(e), e.mode & Lt && typeof t.UNSAFE_componentWillMount == "function" && ps.push(e), typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps.__suppressDeprecationWarning !== !0 && hs.push(e), e.mode & Lt && typeof t.UNSAFE_componentWillReceiveProps == "function" && vs.push(e), typeof t.componentWillUpdate == "function" && t.componentWillUpdate.__suppressDeprecationWarning !== !0 && gs.push(e), e.mode & Lt && typeof t.UNSAFE_componentWillUpdate == "function" && bs.push(e));
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
            Ct(n), d(`Legacy context API has been detected within a strict-mode tree.

The old API will be supported in all 16.x releases, but applications using it should migrate to the new version.

Please update the following components: %s

Learn more about this warning here: https://reactjs.org/link/legacy-context`, r);
          } finally {
            on();
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
      if ((e.mode & Lt || Ve) && // We warn in ReactElement.js if owner and self are equal for string refs
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
        Ft(a, "ref");
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
        var ye = ae.index;
        return ye < $ ? (_.flags |= It, $) : ye;
      } else
        return _.flags |= It, $;
    }
    function l(_) {
      return e && _.alternate === null && (_.flags |= It), _;
    }
    function u(_, $, O, ae) {
      if ($ === null || $.tag !== te) {
        var ye = Eh(O, _.mode, ae);
        return ye.return = _, ye;
      } else {
        var he = r($, O);
        return he.return = _, he;
      }
    }
    function c(_, $, O, ae) {
      var ye = O.type;
      if (ye === Ia)
        return v(_, $, O.props.children, ae, O.key);
      if ($ !== null && ($.elementType === ye || // Keep this check inline so it only runs on the false path:
      EN($, O) || // Lazy types should reconcile their resolved type.
      // We need to do this after the Hot Reloading check above,
      // because hot reloading has different semantics than prod because
      // it doesn't resuspend. So we can't let the call below suspend.
      typeof ye == "object" && ye !== null && ye.$$typeof === Te && vb(ye) === $.type)) {
        var he = r($, O.props);
        return he.ref = ys(_, $, O), he.return = _, he._debugSource = O._source, he._debugOwner = O._owner, he;
      }
      var Me = xh(O, _.mode, ae);
      return Me.ref = ys(_, $, O), Me.return = _, Me;
    }
    function h(_, $, O, ae) {
      if ($ === null || $.tag !== T || $.stateNode.containerInfo !== O.containerInfo || $.stateNode.implementation !== O.implementation) {
        var ye = Sh(O, _.mode, ae);
        return ye.return = _, ye;
      } else {
        var he = r($, O.children || []);
        return he.return = _, he;
      }
    }
    function v(_, $, O, ae, ye) {
      if ($ === null || $.tag !== fe) {
        var he = oi(O, _.mode, ae, ye);
        return he.return = _, he;
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
            var ye = xh($, _.mode, O);
            return ye.ref = ys(_, null, $), ye.return = _, ye;
          }
          case Jn: {
            var he = Sh($, _.mode, O);
            return he.return = _, he;
          }
          case Te: {
            var Me = $._payload, Fe = $._init;
            return C(_, Fe(Me), O);
          }
        }
        if (qe($) || Ca($)) {
          var pt = oi($, _.mode, O, null);
          return pt.return = _, pt;
        }
        mc(_, $);
      }
      return typeof $ == "function" && pc(_), null;
    }
    function D(_, $, O, ae) {
      var ye = $ !== null ? $.key : null;
      if (typeof O == "string" && O !== "" || typeof O == "number")
        return ye !== null ? null : u(_, $, "" + O, ae);
      if (typeof O == "object" && O !== null) {
        switch (O.$$typeof) {
          case da:
            return O.key === ye ? c(_, $, O, ae) : null;
          case Jn:
            return O.key === ye ? h(_, $, O, ae) : null;
          case Te: {
            var he = O._payload, Me = O._init;
            return D(_, $, Me(he), ae);
          }
        }
        if (qe(O) || Ca(O))
          return ye !== null ? null : v(_, $, O, ae, null);
        mc(_, O);
      }
      return typeof O == "function" && pc(_), null;
    }
    function V(_, $, O, ae, ye) {
      if (typeof ae == "string" && ae !== "" || typeof ae == "number") {
        var he = _.get(O) || null;
        return u($, he, "" + ae, ye);
      }
      if (typeof ae == "object" && ae !== null) {
        switch (ae.$$typeof) {
          case da: {
            var Me = _.get(ae.key === null ? O : ae.key) || null;
            return c($, Me, ae, ye);
          }
          case Jn: {
            var Fe = _.get(ae.key === null ? O : ae.key) || null;
            return h($, Fe, ae, ye);
          }
          case Te:
            var pt = ae._payload, tt = ae._init;
            return V(_, $, O, tt(pt), ye);
        }
        if (qe(ae) || Ca(ae)) {
          var Pt = _.get(O) || null;
          return v($, Pt, ae, ye, null);
        }
        mc($, ae);
      }
      return typeof ae == "function" && pc($), null;
    }
    function L(_, $, O) {
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
            var ye = _._payload, he = _._init;
            L(he(ye), $, O);
            break;
        }
      }
      return $;
    }
    function B(_, $, O, ae) {
      for (var ye = null, he = 0; he < O.length; he++) {
        var Me = O[he];
        ye = L(Me, ye, _);
      }
      for (var Fe = null, pt = null, tt = $, Pt = 0, nt = 0, kt = null; tt !== null && nt < O.length; nt++) {
        tt.index > nt ? (kt = tt, tt = null) : kt = tt.sibling;
        var Mn = D(_, tt, O[nt], ae);
        if (Mn === null) {
          tt === null && (tt = kt);
          break;
        }
        e && tt && Mn.alternate === null && t(_, tt), Pt = i(Mn, Pt, nt), pt === null ? Fe = Mn : pt.sibling = Mn, pt = Mn, tt = kt;
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
          la !== null && (Pt = i(la, Pt, nt), pt === null ? Fe = la : pt.sibling = la, pt = la);
        }
        if (gn()) {
          var $n = nt;
          Ui(_, $n);
        }
        return Fe;
      }
      for (var In = a(_, tt); nt < O.length; nt++) {
        var Vn = V(In, _, nt, O[nt], ae);
        Vn !== null && (e && Vn.alternate !== null && In.delete(Vn.key === null ? nt : Vn.key), Pt = i(Vn, Pt, nt), pt === null ? Fe = Vn : pt.sibling = Vn, pt = Vn);
      }
      if (e && In.forEach(function(to) {
        return t(_, to);
      }), gn()) {
        var Or = nt;
        Ui(_, Or);
      }
      return Fe;
    }
    function pe(_, $, O, ae) {
      var ye = Ca(O);
      if (typeof ye != "function")
        throw new Error("An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.");
      {
        typeof Symbol == "function" && // $FlowFixMe Flow doesn't know about toStringTag
        O[Symbol.toStringTag] === "Generator" && (Rm || d("Using Generators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. Keep in mind you might need to polyfill these features for older browsers."), Rm = !0), O.entries === ye && (Sm || d("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), Sm = !0);
        var he = ye.call(O);
        if (he)
          for (var Me = null, Fe = he.next(); !Fe.done; Fe = he.next()) {
            var pt = Fe.value;
            Me = L(pt, Me, _);
          }
      }
      var tt = ye.call(O);
      if (tt == null)
        throw new Error("An iterable object provided no iterator.");
      for (var Pt = null, nt = null, kt = $, Mn = 0, Rn = 0, la = null, $n = tt.next(); kt !== null && !$n.done; Rn++, $n = tt.next()) {
        kt.index > Rn ? (la = kt, kt = null) : la = kt.sibling;
        var In = D(_, kt, $n.value, ae);
        if (In === null) {
          kt === null && (kt = la);
          break;
        }
        e && kt && In.alternate === null && t(_, kt), Mn = i(In, Mn, Rn), nt === null ? Pt = In : nt.sibling = In, nt = In, kt = la;
      }
      if ($n.done) {
        if (n(_, kt), gn()) {
          var Vn = Rn;
          Ui(_, Vn);
        }
        return Pt;
      }
      if (kt === null) {
        for (; !$n.done; Rn++, $n = tt.next()) {
          var Or = C(_, $n.value, ae);
          Or !== null && (Mn = i(Or, Mn, Rn), nt === null ? Pt = Or : nt.sibling = Or, nt = Or);
        }
        if (gn()) {
          var to = Rn;
          Ui(_, to);
        }
        return Pt;
      }
      for (var Xs = a(_, kt); !$n.done; Rn++, $n = tt.next()) {
        var ir = V(Xs, _, Rn, $n.value, ae);
        ir !== null && (e && ir.alternate !== null && Xs.delete(ir.key === null ? Rn : ir.key), Mn = i(ir, Mn, Rn), nt === null ? Pt = ir : nt.sibling = ir, nt = ir);
      }
      if (e && Xs.forEach(function(nw) {
        return t(_, nw);
      }), gn()) {
        var tw = Rn;
        Ui(_, tw);
      }
      return Pt;
    }
    function Ce(_, $, O, ae) {
      if ($ !== null && $.tag === te) {
        n(_, $.sibling);
        var ye = r($, O);
        return ye.return = _, ye;
      }
      n(_, $);
      var he = Eh(O, _.mode, ae);
      return he.return = _, he;
    }
    function Se(_, $, O, ae) {
      for (var ye = O.key, he = $; he !== null; ) {
        if (he.key === ye) {
          var Me = O.type;
          if (Me === Ia) {
            if (he.tag === fe) {
              n(_, he.sibling);
              var Fe = r(he, O.props.children);
              return Fe.return = _, Fe._debugSource = O._source, Fe._debugOwner = O._owner, Fe;
            }
          } else if (he.elementType === Me || // Keep this check inline so it only runs on the false path:
          EN(he, O) || // Lazy types should reconcile their resolved type.
          // We need to do this after the Hot Reloading check above,
          // because hot reloading has different semantics than prod because
          // it doesn't resuspend. So we can't let the call below suspend.
          typeof Me == "object" && Me !== null && Me.$$typeof === Te && vb(Me) === he.type) {
            n(_, he.sibling);
            var pt = r(he, O.props);
            return pt.ref = ys(_, he, O), pt.return = _, pt._debugSource = O._source, pt._debugOwner = O._owner, pt;
          }
          n(_, he);
          break;
        } else
          t(_, he);
        he = he.sibling;
      }
      if (O.type === Ia) {
        var tt = oi(O.props.children, _.mode, ae, O.key);
        return tt.return = _, tt;
      } else {
        var Pt = xh(O, _.mode, ae);
        return Pt.ref = ys(_, $, O), Pt.return = _, Pt;
      }
    }
    function Ze(_, $, O, ae) {
      for (var ye = O.key, he = $; he !== null; ) {
        if (he.key === ye)
          if (he.tag === T && he.stateNode.containerInfo === O.containerInfo && he.stateNode.implementation === O.implementation) {
            n(_, he.sibling);
            var Me = r(he, O.children || []);
            return Me.return = _, Me;
          } else {
            n(_, he);
            break;
          }
        else
          t(_, he);
        he = he.sibling;
      }
      var Fe = Sh(O, _.mode, ae);
      return Fe.return = _, Fe;
    }
    function Ge(_, $, O, ae) {
      var ye = typeof O == "object" && O !== null && O.type === Ia && O.key === null;
      if (ye && (O = O.props.children), typeof O == "object" && O !== null) {
        switch (O.$$typeof) {
          case da:
            return l(Se(_, $, O, ae));
          case Jn:
            return l(Ze(_, $, O, ae));
          case Te:
            var he = O._payload, Me = O._init;
            return Ge(_, $, Me(he), ae);
        }
        if (qe(O))
          return B(_, $, O, ae);
        if (Ca(O))
          return pe(_, $, O, ae);
        mc(_, O);
      }
      return typeof O == "string" && O !== "" || typeof O == "number" ? l(Ce(_, $, "" + O, ae)) : (typeof O == "function" && pc(_), n(_, $));
    }
    return Ge;
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
      } else if (a.tag === W)
        r = a.type === e.type ? null : a.child;
      else if (a.tag === M) {
        var V = a.return;
        if (V === null)
          throw new Error("We just came from a parent so we must have had a parent. This is a bug in React.");
        V.lanes = Be(V.lanes, n);
        var L = V.alternate;
        L !== null && (L.lanes = Be(L.lanes, n)), Mm(V, n, e), r = a.sibling;
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
  function Yt(e) {
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
          lanes: X,
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
    n !== null && (n.lanes = Be(n.lanes, t)), n === null && (e.flags & (It | hr)) !== Oe && bN(e);
    for (var a = e, r = e.return; r !== null; )
      r.childLanes = Be(r.childLanes, t), n = r.alternate, n !== null ? n.childLanes = Be(n.childLanes, t) : (r.flags & (It | hr)) !== Oe && bN(e), a = r, r = r.return;
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
        lanes: X
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
            if (e.mode & Lt) {
              un(!0);
              try {
                l.call(i, a, r);
              } finally {
                un(!1);
              }
            }
            Nb();
          }
          return u;
        }
        return l;
      }
      case Am:
        e.flags = e.flags & ~zn | it;
      case Sb: {
        var c = n.payload, h;
        if (typeof c == "function") {
          yb(), h = c.call(i, a, r);
          {
            if (e.mode & Lt) {
              un(!0);
              try {
                c.call(i, a, r);
              } finally {
                un(!1);
              }
            }
            Nb();
          }
        } else
          h = c;
        return h == null ? a : Ye({}, a, h);
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
      var V = r.baseState, L = X, B = null, pe = null, Ce = null, Se = i;
      do {
        var Ze = Se.lane, Ge = Se.eventTime;
        if (El(a, Ze)) {
          if (Ce !== null) {
            var $ = {
              eventTime: Ge,
              // This update is going to be committed so we never want uncommit
              // it. Using NoLane works because 0 is a subset of all bitmasks, so
              // this will never be skipped by the check above.
              lane: cn,
              tag: Se.tag,
              payload: Se.payload,
              callback: Se.callback,
              next: null
            };
            Ce = Ce.next = $;
          }
          V = zC(e, r, Se, V, t, n);
          var O = Se.callback;
          if (O !== null && // If the update was already committed, we should not queue its
          // callback again.
          Se.lane !== cn) {
            e.flags |= yv;
            var ae = r.effects;
            ae === null ? r.effects = [Se] : ae.push(Se);
          }
        } else {
          var _ = {
            eventTime: Ge,
            lane: Ze,
            tag: Se.tag,
            payload: Se.payload,
            callback: Se.callback,
            next: null
          };
          Ce === null ? (pe = Ce = _, B = V) : Ce = Ce.next = _, L = Be(L, Ze);
        }
        if (Se = Se.next, Se === null) {
          if (u = r.shared.pending, u === null)
            break;
          var ye = u, he = ye.next;
          ye.next = null, Se = he, r.lastBaseUpdate = ye, r.shared.pending = null;
        }
      } while (!0);
      Ce === null && (B = V), r.baseState = B, r.firstBaseUpdate = pe, r.lastBaseUpdate = Ce;
      var Me = r.shared.interleaved;
      if (Me !== null) {
        var Fe = Me;
        do
          L = Be(L, Fe.lane), Fe = Fe.next;
        while (Fe !== Me);
      } else i === null && (r.shared.lanes = X);
      qs(L), e.lanes = L, e.memoizedState = V;
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
      if (t.tag === Z) {
        var n = t.memoizedState;
        if (n !== null) {
          var a = n.dehydrated;
          if (a === null || Wg(a) || lm(a))
            return t;
        }
      } else if (t.tag === ee && // revealOrder undefined can't be trusted because it don't
      // keep track of whether it suspended or not.
      t.memoizedProps.revealOrder !== void 0) {
        var r = (t.flags & it) !== Oe;
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
  ), Xt = (
    /* */
    1
  ), Ja = (
    /*  */
    2
  ), Jt = (
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
  var be = p.ReactCurrentDispatcher, Ss = p.ReactCurrentBatchConfig, Ym, $l;
  Ym = /* @__PURE__ */ new Set();
  var $i = X, mt = null, Zt = null, en = null, Tc = !1, Rs = !1, Ds = 0, YC = 0, qC = 25, q = null, va = null, ei = -1, qm = !1;
  function ot() {
    {
      var e = q;
      va === null ? va = [e] : va.push(e);
    }
  }
  function ce() {
    {
      var e = q;
      va !== null && (ei++, va[ei] !== e && GC(e));
    }
  }
  function Il(e) {
    e != null && !qe(e) && d("%s received a final argument that is not an array (instead, received `%s`). When specified, the final argument must be an array.", q, typeof e);
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
      return d("%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.", q), !1;
    e.length !== t.length && d(`The final argument passed to %s changed size between renders. The order and size of this array must remain constant.

Previous: %s
Incoming: %s`, q, "[" + t.join(", ") + "]", "[" + e.join(", ") + "]");
    for (var n = 0; n < t.length && n < e.length; n++)
      if (!aa(e[n], t[n]))
        return !1;
    return !0;
  }
  function Yl(e, t, n, a, r, i) {
    $i = i, mt = t, va = e !== null ? e._debugHookTypes : null, ei = -1, qm = e !== null && e.type !== t.type, t.memoizedState = null, t.updateQueue = null, t.lanes = X, e !== null && e.memoizedState !== null ? be.current = Zb : va !== null ? be.current = Jb : be.current = Xb;
    var l = n(a, r);
    if (Rs) {
      var u = 0;
      do {
        if (Rs = !1, Ds = 0, u >= qC)
          throw new Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
        u += 1, qm = !1, Zt = null, en = null, t.updateQueue = null, ei = -1, be.current = ey, l = n(a, r);
      } while (Rs);
    }
    be.current = Hc, t._debugHookTypes = va;
    var c = Zt !== null && Zt.next !== null;
    if ($i = X, mt = null, Zt = null, en = null, q = null, va = null, ei = -1, e !== null && (e.flags & vr) !== (t.flags & vr) && // Disable this warning in legacy mode, because legacy Suspense is weird
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
    if (be.current = Hc, Tc) {
      for (var e = mt.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      Tc = !1;
    }
    $i = X, mt = null, Zt = null, en = null, va = null, ei = -1, q = null, qb = !1, Rs = !1, Ds = 0;
  }
  function Za() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return en === null ? mt.memoizedState = en = e : en = en.next = e, en;
  }
  function ga() {
    var e;
    if (Zt === null) {
      var t = mt.alternate;
      t !== null ? e = t.memoizedState : e = null;
    } else
      e = Zt.next;
    var n;
    if (en === null ? n = mt.memoizedState : n = en.next, n !== null)
      en = n, n = en.next, Zt = e;
    else {
      if (e === null)
        throw new Error("Rendered more hooks than during the previous render.");
      Zt = e;
      var a = {
        memoizedState: Zt.memoizedState,
        baseState: Zt.baseState,
        baseQueue: Zt.baseQueue,
        queue: Zt.queue,
        next: null
      };
      en === null ? mt.memoizedState = en = a : en = en.next = a;
    }
    return en;
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
      lanes: X,
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
    var i = Zt, l = i.baseQueue, u = r.pending;
    if (u !== null) {
      if (l !== null) {
        var c = l.next, h = u.next;
        l.next = h, u.next = c;
      }
      i.baseQueue !== l && d("Internal error: Expected work-in-progress queue to be a clone. This is a bug in React."), i.baseQueue = l = u, r.pending = null;
    }
    if (l !== null) {
      var v = l.next, C = i.baseState, D = null, V = null, L = null, B = v;
      do {
        var pe = B.lane;
        if (El($i, pe)) {
          if (L !== null) {
            var Se = {
              // This update is going to be committed so we never want uncommit
              // it. Using NoLane works because 0 is a subset of all bitmasks, so
              // this will never be skipped by the check above.
              lane: cn,
              action: B.action,
              hasEagerState: B.hasEagerState,
              eagerState: B.eagerState,
              next: null
            };
            L = L.next = Se;
          }
          if (B.hasEagerState)
            C = B.eagerState;
          else {
            var Ze = B.action;
            C = e(C, Ze);
          }
        } else {
          var Ce = {
            lane: pe,
            action: B.action,
            hasEagerState: B.hasEagerState,
            eagerState: B.eagerState,
            next: null
          };
          L === null ? (V = L = Ce, D = C) : L = L.next = Ce, mt.lanes = Be(mt.lanes, pe), qs(pe);
        }
        B = B.next;
      } while (B !== null && B !== v);
      L === null ? D = C : L.next = V, aa(C, a.memoizedState) || As(), a.memoizedState = C, a.baseState = D, a.baseQueue = L, r.lastRenderedState = C;
    }
    var Ge = r.interleaved;
    if (Ge !== null) {
      var _ = Ge;
      do {
        var $ = _.lane;
        mt.lanes = Be(mt.lanes, $), qs($), _ = _.next;
      } while (_ !== Ge);
    } else l === null && (r.lanes = X);
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
    return r.queue = h, Vc(Ub.bind(null, a, h, e), [e]), a.flags |= Fr, Cs(Xt | bn, kb.bind(null, a, h, i, t), void 0, null), i;
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
    en !== null && en.memoizedState.tag & Xt) {
      a.flags |= Fr, Cs(Xt | bn, kb.bind(null, a, h, i, t), void 0, null);
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
    t !== null && rn(t, e, Le, xt);
  }
  function _c(e) {
    var t = Za();
    typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e;
    var n = {
      pending: null,
      interleaved: null,
      lanes: X,
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
    mt.flags |= e, r.memoizedState = Cs(Xt | t, n, void 0, i);
  }
  function Mc(e, t, n, a) {
    var r = ga(), i = a === void 0 ? null : a, l = void 0;
    if (Zt !== null) {
      var u = Zt.memoizedState;
      if (l = u.destroy, i !== null) {
        var c = u.deps;
        if (Gm(i, c)) {
          r.memoizedState = Cs(t, n, l, i);
          return;
        }
      }
    }
    mt.flags |= e, r.memoizedState = Cs(Xt | t, n, l, i);
  }
  function Vc(e, t) {
    return (mt.mode & Wa) !== we ? js(Xd | Fr | Qd, bn, e, t) : js(Fr | Qd, bn, e, t);
  }
  function Ts(e, t) {
    return Mc(Fr, bn, e, t);
  }
  function np(e, t) {
    return js(rt, Ja, e, t);
  }
  function Ac(e, t) {
    return Mc(rt, Ja, e, t);
  }
  function ap(e, t) {
    var n = rt;
    return n |= Ci, (mt.mode & Wa) !== we && (n |= zr), js(n, Jt, e, t);
  }
  function Lc(e, t) {
    return Mc(rt, Jt, e, t);
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
    var a = n != null ? n.concat([e]) : null, r = rt;
    return r |= Ci, (mt.mode & Wa) !== we && (r |= zr), js(r, Jt, Pb.bind(null, t, e), a);
  }
  function kc(e, t, n) {
    typeof t != "function" && d("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t !== null ? typeof t : "null");
    var a = n != null ? n.concat([e]) : null;
    return Mc(rt, Jt, Pb.bind(null, t, e), a);
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
    var t = ga(), n = Zt, a = n.memoizedState;
    return $b(t, a, e);
  }
  function Bb(e) {
    var t = ga();
    if (Zt === null)
      return t.memoizedState = e, e;
    var n = Zt.memoizedState;
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
    dn(BS(a, br)), e(!0);
    var r = Ss.transition;
    Ss.transition = {};
    var i = Ss.transition;
    Ss.transition._updatedFibers = /* @__PURE__ */ new Set();
    try {
      e(!1), t();
    } finally {
      if (dn(a), Ss.transition = r, r === null && i._updatedFibers) {
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
        rn(i, e, a, l), Kb(i, t, a);
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
      if (e.lanes === X && (i === null || i.lanes === X)) {
        var l = t.lastRenderedReducer;
        if (l !== null) {
          var u;
          u = be.current, be.current = Aa;
          try {
            var c = t.lastRenderedState, h = l(c, n);
            if (r.hasEagerState = !0, r.eagerState = h, aa(h, c)) {
              kC(e, t, r, a);
              return;
            }
          } catch {
          } finally {
            be.current = u;
          }
        }
      }
      var v = Eb(e, t, r, a);
      if (v !== null) {
        var C = Bn();
        rn(v, e, a, C), Kb(v, t, a);
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
    readContext: Yt,
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
    unstable_isNewReconciler: se
  }, Xb = null, Jb = null, Zb = null, ey = null, er = null, Aa = null, Bc = null;
  {
    var cp = function() {
      d("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
    }, ke = function() {
      d("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://reactjs.org/link/rules-of-hooks");
    };
    Xb = {
      readContext: function(e) {
        return Yt(e);
      },
      useCallback: function(e, t) {
        return q = "useCallback", ot(), Il(t), ip(e, t);
      },
      useContext: function(e) {
        return q = "useContext", ot(), Yt(e);
      },
      useEffect: function(e, t) {
        return q = "useEffect", ot(), Il(t), Vc(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return q = "useImperativeHandle", ot(), Il(n), rp(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return q = "useInsertionEffect", ot(), Il(t), np(e, t);
      },
      useLayoutEffect: function(e, t) {
        return q = "useLayoutEffect", ot(), Il(t), ap(e, t);
      },
      useMemo: function(e, t) {
        q = "useMemo", ot(), Il(t);
        var n = be.current;
        be.current = er;
        try {
          return lp(e, t);
        } finally {
          be.current = n;
        }
      },
      useReducer: function(e, t, n) {
        q = "useReducer", ot();
        var a = be.current;
        be.current = er;
        try {
          return Km(e, t, n);
        } finally {
          be.current = a;
        }
      },
      useRef: function(e) {
        return q = "useRef", ot(), tp(e);
      },
      useState: function(e) {
        q = "useState", ot();
        var t = be.current;
        be.current = er;
        try {
          return _c(e);
        } finally {
          be.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return q = "useDebugValue", ot(), void 0;
      },
      useDeferredValue: function(e) {
        return q = "useDeferredValue", ot(), op(e);
      },
      useTransition: function() {
        return q = "useTransition", ot(), sp();
      },
      useMutableSource: function(e, t, n) {
        return q = "useMutableSource", ot(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return q = "useSyncExternalStore", ot(), Jm(e, t, n);
      },
      useId: function() {
        return q = "useId", ot(), up();
      },
      unstable_isNewReconciler: se
    }, Jb = {
      readContext: function(e) {
        return Yt(e);
      },
      useCallback: function(e, t) {
        return q = "useCallback", ce(), ip(e, t);
      },
      useContext: function(e) {
        return q = "useContext", ce(), Yt(e);
      },
      useEffect: function(e, t) {
        return q = "useEffect", ce(), Vc(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return q = "useImperativeHandle", ce(), rp(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return q = "useInsertionEffect", ce(), np(e, t);
      },
      useLayoutEffect: function(e, t) {
        return q = "useLayoutEffect", ce(), ap(e, t);
      },
      useMemo: function(e, t) {
        q = "useMemo", ce();
        var n = be.current;
        be.current = er;
        try {
          return lp(e, t);
        } finally {
          be.current = n;
        }
      },
      useReducer: function(e, t, n) {
        q = "useReducer", ce();
        var a = be.current;
        be.current = er;
        try {
          return Km(e, t, n);
        } finally {
          be.current = a;
        }
      },
      useRef: function(e) {
        return q = "useRef", ce(), tp(e);
      },
      useState: function(e) {
        q = "useState", ce();
        var t = be.current;
        be.current = er;
        try {
          return _c(e);
        } finally {
          be.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return q = "useDebugValue", ce(), void 0;
      },
      useDeferredValue: function(e) {
        return q = "useDeferredValue", ce(), op(e);
      },
      useTransition: function() {
        return q = "useTransition", ce(), sp();
      },
      useMutableSource: function(e, t, n) {
        return q = "useMutableSource", ce(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return q = "useSyncExternalStore", ce(), Jm(e, t, n);
      },
      useId: function() {
        return q = "useId", ce(), up();
      },
      unstable_isNewReconciler: se
    }, Zb = {
      readContext: function(e) {
        return Yt(e);
      },
      useCallback: function(e, t) {
        return q = "useCallback", ce(), Fc(e, t);
      },
      useContext: function(e) {
        return q = "useContext", ce(), Yt(e);
      },
      useEffect: function(e, t) {
        return q = "useEffect", ce(), Ts(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return q = "useImperativeHandle", ce(), kc(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return q = "useInsertionEffect", ce(), Ac(e, t);
      },
      useLayoutEffect: function(e, t) {
        return q = "useLayoutEffect", ce(), Lc(e, t);
      },
      useMemo: function(e, t) {
        q = "useMemo", ce();
        var n = be.current;
        be.current = Aa;
        try {
          return zc(e, t);
        } finally {
          be.current = n;
        }
      },
      useReducer: function(e, t, n) {
        q = "useReducer", ce();
        var a = be.current;
        be.current = Aa;
        try {
          return Qm(e, t, n);
        } finally {
          be.current = a;
        }
      },
      useRef: function(e) {
        return q = "useRef", ce(), Oc();
      },
      useState: function(e) {
        q = "useState", ce();
        var t = be.current;
        be.current = Aa;
        try {
          return Zm(e);
        } finally {
          be.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return q = "useDebugValue", ce(), Uc();
      },
      useDeferredValue: function(e) {
        return q = "useDeferredValue", ce(), Hb(e);
      },
      useTransition: function() {
        return q = "useTransition", ce(), Ib();
      },
      useMutableSource: function(e, t, n) {
        return q = "useMutableSource", ce(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return q = "useSyncExternalStore", ce(), wc(e, t);
      },
      useId: function() {
        return q = "useId", ce(), Pc();
      },
      unstable_isNewReconciler: se
    }, ey = {
      readContext: function(e) {
        return Yt(e);
      },
      useCallback: function(e, t) {
        return q = "useCallback", ce(), Fc(e, t);
      },
      useContext: function(e) {
        return q = "useContext", ce(), Yt(e);
      },
      useEffect: function(e, t) {
        return q = "useEffect", ce(), Ts(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return q = "useImperativeHandle", ce(), kc(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return q = "useInsertionEffect", ce(), Ac(e, t);
      },
      useLayoutEffect: function(e, t) {
        return q = "useLayoutEffect", ce(), Lc(e, t);
      },
      useMemo: function(e, t) {
        q = "useMemo", ce();
        var n = be.current;
        be.current = Bc;
        try {
          return zc(e, t);
        } finally {
          be.current = n;
        }
      },
      useReducer: function(e, t, n) {
        q = "useReducer", ce();
        var a = be.current;
        be.current = Bc;
        try {
          return Xm(e, t, n);
        } finally {
          be.current = a;
        }
      },
      useRef: function(e) {
        return q = "useRef", ce(), Oc();
      },
      useState: function(e) {
        q = "useState", ce();
        var t = be.current;
        be.current = Bc;
        try {
          return ep(e);
        } finally {
          be.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return q = "useDebugValue", ce(), Uc();
      },
      useDeferredValue: function(e) {
        return q = "useDeferredValue", ce(), Bb(e);
      },
      useTransition: function() {
        return q = "useTransition", ce(), Yb();
      },
      useMutableSource: function(e, t, n) {
        return q = "useMutableSource", ce(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return q = "useSyncExternalStore", ce(), wc(e, t);
      },
      useId: function() {
        return q = "useId", ce(), Pc();
      },
      unstable_isNewReconciler: se
    }, er = {
      readContext: function(e) {
        return cp(), Yt(e);
      },
      useCallback: function(e, t) {
        return q = "useCallback", ke(), ot(), ip(e, t);
      },
      useContext: function(e) {
        return q = "useContext", ke(), ot(), Yt(e);
      },
      useEffect: function(e, t) {
        return q = "useEffect", ke(), ot(), Vc(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return q = "useImperativeHandle", ke(), ot(), rp(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return q = "useInsertionEffect", ke(), ot(), np(e, t);
      },
      useLayoutEffect: function(e, t) {
        return q = "useLayoutEffect", ke(), ot(), ap(e, t);
      },
      useMemo: function(e, t) {
        q = "useMemo", ke(), ot();
        var n = be.current;
        be.current = er;
        try {
          return lp(e, t);
        } finally {
          be.current = n;
        }
      },
      useReducer: function(e, t, n) {
        q = "useReducer", ke(), ot();
        var a = be.current;
        be.current = er;
        try {
          return Km(e, t, n);
        } finally {
          be.current = a;
        }
      },
      useRef: function(e) {
        return q = "useRef", ke(), ot(), tp(e);
      },
      useState: function(e) {
        q = "useState", ke(), ot();
        var t = be.current;
        be.current = er;
        try {
          return _c(e);
        } finally {
          be.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return q = "useDebugValue", ke(), ot(), void 0;
      },
      useDeferredValue: function(e) {
        return q = "useDeferredValue", ke(), ot(), op(e);
      },
      useTransition: function() {
        return q = "useTransition", ke(), ot(), sp();
      },
      useMutableSource: function(e, t, n) {
        return q = "useMutableSource", ke(), ot(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return q = "useSyncExternalStore", ke(), ot(), Jm(e, t, n);
      },
      useId: function() {
        return q = "useId", ke(), ot(), up();
      },
      unstable_isNewReconciler: se
    }, Aa = {
      readContext: function(e) {
        return cp(), Yt(e);
      },
      useCallback: function(e, t) {
        return q = "useCallback", ke(), ce(), Fc(e, t);
      },
      useContext: function(e) {
        return q = "useContext", ke(), ce(), Yt(e);
      },
      useEffect: function(e, t) {
        return q = "useEffect", ke(), ce(), Ts(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return q = "useImperativeHandle", ke(), ce(), kc(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return q = "useInsertionEffect", ke(), ce(), Ac(e, t);
      },
      useLayoutEffect: function(e, t) {
        return q = "useLayoutEffect", ke(), ce(), Lc(e, t);
      },
      useMemo: function(e, t) {
        q = "useMemo", ke(), ce();
        var n = be.current;
        be.current = Aa;
        try {
          return zc(e, t);
        } finally {
          be.current = n;
        }
      },
      useReducer: function(e, t, n) {
        q = "useReducer", ke(), ce();
        var a = be.current;
        be.current = Aa;
        try {
          return Qm(e, t, n);
        } finally {
          be.current = a;
        }
      },
      useRef: function(e) {
        return q = "useRef", ke(), ce(), Oc();
      },
      useState: function(e) {
        q = "useState", ke(), ce();
        var t = be.current;
        be.current = Aa;
        try {
          return Zm(e);
        } finally {
          be.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return q = "useDebugValue", ke(), ce(), Uc();
      },
      useDeferredValue: function(e) {
        return q = "useDeferredValue", ke(), ce(), Hb(e);
      },
      useTransition: function() {
        return q = "useTransition", ke(), ce(), Ib();
      },
      useMutableSource: function(e, t, n) {
        return q = "useMutableSource", ke(), ce(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return q = "useSyncExternalStore", ke(), ce(), wc(e, t);
      },
      useId: function() {
        return q = "useId", ke(), ce(), Pc();
      },
      unstable_isNewReconciler: se
    }, Bc = {
      readContext: function(e) {
        return cp(), Yt(e);
      },
      useCallback: function(e, t) {
        return q = "useCallback", ke(), ce(), Fc(e, t);
      },
      useContext: function(e) {
        return q = "useContext", ke(), ce(), Yt(e);
      },
      useEffect: function(e, t) {
        return q = "useEffect", ke(), ce(), Ts(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return q = "useImperativeHandle", ke(), ce(), kc(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return q = "useInsertionEffect", ke(), ce(), Ac(e, t);
      },
      useLayoutEffect: function(e, t) {
        return q = "useLayoutEffect", ke(), ce(), Lc(e, t);
      },
      useMemo: function(e, t) {
        q = "useMemo", ke(), ce();
        var n = be.current;
        be.current = Aa;
        try {
          return zc(e, t);
        } finally {
          be.current = n;
        }
      },
      useReducer: function(e, t, n) {
        q = "useReducer", ke(), ce();
        var a = be.current;
        be.current = Aa;
        try {
          return Xm(e, t, n);
        } finally {
          be.current = a;
        }
      },
      useRef: function(e) {
        return q = "useRef", ke(), ce(), Oc();
      },
      useState: function(e) {
        q = "useState", ke(), ce();
        var t = be.current;
        be.current = Aa;
        try {
          return ep(e);
        } finally {
          be.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return q = "useDebugValue", ke(), ce(), Uc();
      },
      useDeferredValue: function(e) {
        return q = "useDeferredValue", ke(), ce(), Bb(e);
      },
      useTransition: function() {
        return q = "useTransition", ke(), ce(), Yb();
      },
      useMutableSource: function(e, t, n) {
        return q = "useMutableSource", ke(), ce(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return q = "useSyncExternalStore", ke(), ce(), wc(e, t);
      },
      useId: function() {
        return q = "useId", ke(), ce(), Pc();
      },
      unstable_isNewReconciler: se
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
          case Y:
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
          case Y:
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
      var n = Ye({}, t), a = e.defaultProps;
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
        var n = at(e) || "Component";
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
      if (e.mode & Lt) {
        un(!0);
        try {
          i = n(a, r);
        } finally {
          un(!1);
        }
      }
      ly(t, i);
    }
    var l = i == null ? r : Ye({}, r, i);
    if (e.memoizedState = l, e.lanes === X) {
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
      u !== null && (rn(u, a, i, r), Ec(u, a, i)), nf(a, i);
    },
    enqueueReplaceState: function(e, t, n) {
      var a = ml(e), r = Bn(), i = ii(a), l = Dr(r, i);
      l.tag = Rb, l.payload = t, n != null && (Gc(n, "replaceState"), l.callback = n);
      var u = Xr(a, l, i);
      u !== null && (rn(u, a, i, r), Ec(u, a, i)), nf(a, i);
    },
    enqueueForceUpdate: function(e, t) {
      var n = ml(e), a = Bn(), r = ii(n), i = Dr(a, r);
      i.tag = yc, t != null && (Gc(t, "forceUpdate"), i.callback = t);
      var l = Xr(n, i, r);
      l !== null && (rn(l, n, r, a), Ec(l, n, r)), SS(n, r);
    }
  };
  function sy(e, t, n, a, r, i, l) {
    var u = e.stateNode;
    if (typeof u.shouldComponentUpdate == "function") {
      var c = u.shouldComponentUpdate(a, i, l);
      {
        if (e.mode & Lt) {
          un(!0);
          try {
            c = u.shouldComponentUpdate(a, i, l);
          } finally {
            un(!1);
          }
        }
        c === void 0 && d("%s.shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false.", at(t) || "Component");
      }
      return c;
    }
    return t.prototype && t.prototype.isPureReactComponent ? !Jo(n, a) || !Jo(r, i) : !0;
  }
  function n1(e, t, n) {
    var a = e.stateNode;
    {
      var r = at(t) || "Component", i = a.render;
      i || (t.prototype && typeof t.prototype.render == "function" ? d("%s(...): No `render` method found on the returned component instance: did you accidentally return an object from the constructor?", r) : d("%s(...): No `render` method found on the returned component instance: you may have forgotten to define `render`.", r)), a.getInitialState && !a.getInitialState.isReactClassApproved && !a.state && d("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?", r), a.getDefaultProps && !a.getDefaultProps.isReactClassApproved && d("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.", r), a.propTypes && d("propTypes was defined as an instance property on %s. Use a static property to define propTypes instead.", r), a.contextType && d("contextType was defined as an instance property on %s. Use a static property to define contextType instead.", r), t.childContextTypes && !_s.has(t) && // Strict Mode has its own warning for legacy context, so we can skip
      // this one.
      (e.mode & Lt) === we && (_s.add(t), d(`%s uses the legacy childContextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() instead

.Learn more about this warning here: https://reactjs.org/link/legacy-context`, r)), t.contextTypes && !_s.has(t) && // Strict Mode has its own warning for legacy context, so we can skip
      // this one.
      (e.mode & Lt) === we && (_s.add(t), d(`%s uses the legacy contextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() with static contextType instead.

Learn more about this warning here: https://reactjs.org/link/legacy-context`, r)), a.contextTypes && d("contextTypes was defined as an instance property on %s. Use a static property to define contextTypes instead.", r), t.contextType && t.contextTypes && !Sp.has(t) && (Sp.add(t), d("%s declares both contextTypes and contextType static properties. The legacy contextTypes property will be ignored.", r)), typeof a.componentShouldUpdate == "function" && d("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.", r), t.prototype && t.prototype.isPureReactComponent && typeof a.shouldComponentUpdate < "u" && d("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.", at(t) || "A pure component"), typeof a.componentDidUnmount == "function" && d("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?", r), typeof a.componentDidReceiveProps == "function" && d("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().", r), typeof a.componentWillRecieveProps == "function" && d("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?", r), typeof a.UNSAFE_componentWillRecieveProps == "function" && d("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?", r);
      var l = a.props !== n;
      a.props !== void 0 && l && d("%s(...): When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.", r, r), a.defaultProps && d("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.", r, r), typeof a.getSnapshotBeforeUpdate == "function" && typeof a.componentDidUpdate != "function" && !yp.has(t) && (yp.add(t), d("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.", at(t))), typeof a.getDerivedStateFromProps == "function" && d("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.", r), typeof a.getDerivedStateFromError == "function" && d("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.", r), typeof t.getSnapshotBeforeUpdate == "function" && d("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.", r);
      var u = a.state;
      u && (typeof u != "object" || qe(u)) && d("%s.state: must be set to an object or null", r), typeof a.getChildContext == "function" && typeof t.childContextTypes != "object" && d("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().", r);
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
        l === null || l !== void 0 && l.$$typeof === me && l._context === void 0
      );
      if (!u && !Rp.has(t)) {
        Rp.add(t);
        var c = "";
        l === void 0 ? c = " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file." : typeof l != "object" ? c = " However, it is set to a " + typeof l + "." : l.$$typeof === ne ? c = " Did you accidentally pass the Context.Provider instead?" : l._context !== void 0 ? c = " Did you accidentally pass the Context.Consumer instead?" : c = " However, it is set to an object with keys {" + Object.keys(l).join(", ") + "}.", d("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s", at(t) || "Component", c);
      }
    }
    if (typeof l == "object" && l !== null)
      i = Yt(l);
    else {
      r = Ml(e, t, !0);
      var h = t.contextTypes;
      a = h != null, i = a ? Vl(e, r) : ra;
    }
    var v = new t(n, i);
    if (e.mode & Lt) {
      un(!0);
      try {
        v = new t(n, i);
      } finally {
        un(!1);
      }
    }
    var C = e.memoizedState = v.state !== null && v.state !== void 0 ? v.state : null;
    uy(e, v);
    {
      if (typeof t.getDerivedStateFromProps == "function" && C === null) {
        var D = at(t) || "Component";
        bp.has(D) || (bp.add(D), d("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.", D, v.state === null ? "null" : "undefined", D));
      }
      if (typeof t.getDerivedStateFromProps == "function" || typeof v.getSnapshotBeforeUpdate == "function") {
        var V = null, L = null, B = null;
        if (typeof v.componentWillMount == "function" && v.componentWillMount.__suppressDeprecationWarning !== !0 ? V = "componentWillMount" : typeof v.UNSAFE_componentWillMount == "function" && (V = "UNSAFE_componentWillMount"), typeof v.componentWillReceiveProps == "function" && v.componentWillReceiveProps.__suppressDeprecationWarning !== !0 ? L = "componentWillReceiveProps" : typeof v.UNSAFE_componentWillReceiveProps == "function" && (L = "UNSAFE_componentWillReceiveProps"), typeof v.componentWillUpdate == "function" && v.componentWillUpdate.__suppressDeprecationWarning !== !0 ? B = "componentWillUpdate" : typeof v.UNSAFE_componentWillUpdate == "function" && (B = "UNSAFE_componentWillUpdate"), V !== null || L !== null || B !== null) {
          var pe = at(t) || "Component", Ce = typeof t.getDerivedStateFromProps == "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
          Np.has(pe) || (Np.add(pe), d(`Unsafe legacy lifecycles will not be called for components using new component APIs.

%s uses %s but also contains the following legacy lifecycles:%s%s%s

The above lifecycles should be removed. Learn more about this warning here:
https://reactjs.org/link/unsafe-component-lifecycles`, pe, Ce, V !== null ? `
  ` + V : "", L !== null ? `
  ` + L : "", B !== null ? `
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
      r.context = Yt(i);
    else {
      var l = Ml(e, t, !0);
      r.context = Vl(e, l);
    }
    {
      if (r.state === n) {
        var u = at(t) || "Component";
        Ep.has(u) || (Ep.add(u), d("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.", u));
      }
      e.mode & Lt && Ma.recordLegacyContextWarning(e, r), Ma.recordUnsafeLifecycleWarnings(e, r);
    }
    r.state = e.memoizedState;
    var c = t.getDerivedStateFromProps;
    if (typeof c == "function" && (Dp(e, t, c, n), r.state = e.memoizedState), typeof t.getDerivedStateFromProps != "function" && typeof r.getSnapshotBeforeUpdate != "function" && (typeof r.UNSAFE_componentWillMount == "function" || typeof r.componentWillMount == "function") && (a1(e, r), Sc(e, n, r, a), r.state = e.memoizedState), typeof r.componentDidMount == "function") {
      var h = rt;
      h |= Ci, (e.mode & Wa) !== we && (h |= zr), e.flags |= h;
    }
  }
  function r1(e, t, n, a) {
    var r = e.stateNode, i = e.memoizedProps;
    r.props = i;
    var l = r.context, u = t.contextType, c = ra;
    if (typeof u == "object" && u !== null)
      c = Yt(u);
    else {
      var h = Ml(e, t, !0);
      c = Vl(e, h);
    }
    var v = t.getDerivedStateFromProps, C = typeof v == "function" || typeof r.getSnapshotBeforeUpdate == "function";
    !C && (typeof r.UNSAFE_componentWillReceiveProps == "function" || typeof r.componentWillReceiveProps == "function") && (i !== n || l !== c) && dy(e, r, n, c), Cb();
    var D = e.memoizedState, V = r.state = D;
    if (Sc(e, n, r, a), V = e.memoizedState, i === n && D === V && !rc() && !Rc()) {
      if (typeof r.componentDidMount == "function") {
        var L = rt;
        L |= Ci, (e.mode & Wa) !== we && (L |= zr), e.flags |= L;
      }
      return !1;
    }
    typeof v == "function" && (Dp(e, t, v, n), V = e.memoizedState);
    var B = Rc() || sy(e, t, i, n, D, V, c);
    if (B) {
      if (!C && (typeof r.UNSAFE_componentWillMount == "function" || typeof r.componentWillMount == "function") && (typeof r.componentWillMount == "function" && r.componentWillMount(), typeof r.UNSAFE_componentWillMount == "function" && r.UNSAFE_componentWillMount()), typeof r.componentDidMount == "function") {
        var pe = rt;
        pe |= Ci, (e.mode & Wa) !== we && (pe |= zr), e.flags |= pe;
      }
    } else {
      if (typeof r.componentDidMount == "function") {
        var Ce = rt;
        Ce |= Ci, (e.mode & Wa) !== we && (Ce |= zr), e.flags |= Ce;
      }
      e.memoizedProps = n, e.memoizedState = V;
    }
    return r.props = n, r.state = V, r.context = c, B;
  }
  function i1(e, t, n, a, r) {
    var i = t.stateNode;
    Db(e, t);
    var l = t.memoizedProps, u = t.type === t.elementType ? l : La(t.type, l);
    i.props = u;
    var c = t.pendingProps, h = i.context, v = n.contextType, C = ra;
    if (typeof v == "object" && v !== null)
      C = Yt(v);
    else {
      var D = Ml(t, n, !0);
      C = Vl(t, D);
    }
    var V = n.getDerivedStateFromProps, L = typeof V == "function" || typeof i.getSnapshotBeforeUpdate == "function";
    !L && (typeof i.UNSAFE_componentWillReceiveProps == "function" || typeof i.componentWillReceiveProps == "function") && (l !== c || h !== C) && dy(t, i, a, C), Cb();
    var B = t.memoizedState, pe = i.state = B;
    if (Sc(t, a, i, r), pe = t.memoizedState, l === c && B === pe && !rc() && !Rc() && !je)
      return typeof i.componentDidUpdate == "function" && (l !== e.memoizedProps || B !== e.memoizedState) && (t.flags |= rt), typeof i.getSnapshotBeforeUpdate == "function" && (l !== e.memoizedProps || B !== e.memoizedState) && (t.flags |= hl), !1;
    typeof V == "function" && (Dp(t, n, V, a), pe = t.memoizedState);
    var Ce = Rc() || sy(t, n, u, a, B, pe, C) || // TODO: In some cases, we'll end up checking if context has changed twice,
    // both before and after `shouldComponentUpdate` has been called. Not ideal,
    // but I'm loath to refactor this function. This only happens for memoized
    // components so it's not that common.
    je;
    return Ce ? (!L && (typeof i.UNSAFE_componentWillUpdate == "function" || typeof i.componentWillUpdate == "function") && (typeof i.componentWillUpdate == "function" && i.componentWillUpdate(a, pe, C), typeof i.UNSAFE_componentWillUpdate == "function" && i.UNSAFE_componentWillUpdate(a, pe, C)), typeof i.componentDidUpdate == "function" && (t.flags |= rt), typeof i.getSnapshotBeforeUpdate == "function" && (t.flags |= hl)) : (typeof i.componentDidUpdate == "function" && (l !== e.memoizedProps || B !== e.memoizedState) && (t.flags |= rt), typeof i.getSnapshotBeforeUpdate == "function" && (l !== e.memoizedProps || B !== e.memoizedState) && (t.flags |= hl), t.memoizedProps = a, t.memoizedState = pe), i.props = a, i.state = pe, i.context = C, Ce;
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
      if (t.tag === Z && $C(t))
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
        if (e.flags |= it, n.flags |= Wd, n.flags &= -52805, n.tag === j) {
          var i = n.alternate;
          if (i === null)
            n.tag = Q;
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
          var V = a, L = h.type, B = h.stateNode;
          if ((h.flags & it) === Oe && (typeof L.getDerivedStateFromError == "function" || B !== null && typeof B.componentDidCatch == "function" && !pN(B))) {
            h.flags |= zn;
            var pe = Uo(r);
            h.lanes = Be(h.lanes, pe);
            var Ce = _p(h, V, pe);
            Um(h, Ce);
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
        at(n)
      );
    }
    var l = n.render, u = t.ref, c, h;
    zl(t, r), Oo(t);
    {
      if (Os.current = t, fa(!0), c = Yl(e, t, l, a, u, r), h = ql(), t.mode & Lt) {
        un(!0);
        try {
          c = Yl(e, t, l, a, u, r), h = ql();
        } finally {
          un(!1);
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
          at(i)
        ), n.defaultProps !== void 0) {
          var c = at(i) || "Unknown";
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
        at(v)
      );
    }
    var D = e.child, V = Ip(e, r);
    if (!V) {
      var L = D.memoizedProps, B = n.compare;
      if (B = B !== null ? B : Jo, B(L, a) && e.ref === t.ref)
        return Cr(e, t, r);
    }
    t.flags |= pl;
    var pe = Qi(D, a);
    return pe.ref = t.ref, pe.return = t, t.child = pe, pe;
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
          at(i)
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
          baseLanes: X,
          cachePool: null,
          transitions: null
        };
        t.memoizedState = l, od(t, n);
      } else if (ea(n, Zn)) {
        var C = {
          baseLanes: X,
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
      var V;
      i !== null ? (V = Be(i.baseLanes, n), t.memoizedState = null) : V = n, od(t, V);
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
      t.flags |= rt;
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
        at(n)
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
      if (Os.current = t, fa(!0), c = Yl(e, t, n, a, l, r), h = ql(), t.mode & Lt) {
        un(!0);
        try {
          c = Yl(e, t, n, a, l, r), h = ql();
        } finally {
          un(!1);
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
          t.flags |= it, t.flags |= zn;
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
          at(n)
        );
      }
    }
    var V;
    Xa(n) ? (V = !0, lc(t)) : V = !1, zl(t, r);
    var L = t.stateNode, B;
    L === null ? (Qc(e, t), cy(t, n, a), jp(t, n, a, r), B = !0) : e === null ? B = r1(t, n, a, r) : B = i1(e, t, n, a, r);
    var pe = Up(e, t, n, B, V, r);
    {
      var Ce = t.stateNode;
      B && Ce.props !== a && (Yi || d("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.", ze(t) || "a component"), Yi = !0);
    }
    return pe;
  }
  function Up(e, t, n, a, r, i) {
    Ny(e, t);
    var l = (t.flags & it) !== Oe;
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
        if (fa(!0), c = u.render(), t.mode & Lt) {
          un(!0);
          try {
            u.render();
          } finally {
            un(!1);
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
        for (var V = D; V; )
          V.flags = V.flags & ~It | hr, V = V.sibling;
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
            at(c)
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
    var V = "";
    throw c !== null && typeof c == "object" && c.$$typeof === Te && (V = " Did you wrap a component in React.lazy() more than once?"), new Error("Element type is invalid. Received a promise that resolves to: " + c + ". " + ("Lazy element type must resolve to a class or function." + V));
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
        var h = at(n) || "Unknown";
        Op[h] || (d("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.", h, h), Op[h] = !0);
      }
      t.mode & Lt && Ma.recordLegacyContextWarning(t, null), fa(!0), Os.current = t, u = Yl(null, t, n, r, i, a), c = ql(), fa(!1);
    }
    if (bl(), t.flags |= pl, typeof u == "object" && u !== null && typeof u.render == "function" && u.$$typeof === void 0) {
      var v = at(n) || "Unknown";
      Ms[v] || (d("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", v, v, v), Ms[v] = !0);
    }
    if (
      // Run these checks in production only if the flag is off.
      // Eventually we'll delete this branch altogether.
      typeof u == "object" && u !== null && typeof u.render == "function" && u.$$typeof === void 0
    ) {
      {
        var C = at(n) || "Unknown";
        Ms[C] || (d("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", C, C, C), Ms[C] = !0);
      }
      t.tag = j, t.memoizedState = null, t.updateQueue = null;
      var D = !1;
      return Xa(n) ? (D = !0, lc(t)) : D = !1, t.memoizedState = u.state !== null && u.state !== void 0 ? u.state : null, km(t), uy(t, u), jp(t, n, r, a), Up(null, t, n, !0, D, a);
    } else {
      if (t.tag = R, t.mode & Lt) {
        un(!0);
        try {
          u = Yl(null, t, n, r, i, a), c = ql();
        } finally {
          un(!1);
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
        var l = at(t) || "Unknown";
        Vs[l] || (d("%s: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.", l), Vs[l] = !0);
      }
      if (typeof t.getDerivedStateFromProps == "function") {
        var u = at(t) || "Unknown";
        Vp[u] || (d("%s: Function components do not support getDerivedStateFromProps.", u), Vp[u] = !0);
      }
      if (typeof t.contextType == "object" && t.contextType !== null) {
        var c = at(t) || "Unknown";
        Mp[c] || (d("%s: Function components do not support contextType.", c), Mp[c] = !0);
      }
    }
  }
  var zp = {
    dehydrated: null,
    treeContext: null,
    retryLane: cn
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
    VT(t) && (t.flags |= it);
    var r = Va.current, i = !1, l = (t.flags & it) !== Oe;
    if (l || S1(r, e) ? (i = !0, t.flags &= ~it) : (e === null || e.memoizedState !== null) && (r = BC(r, Ob)), r = Hl(r), Zr(t, r), e === null) {
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
      var V = e.memoizedState;
      if (V !== null) {
        var L = V.dehydrated;
        if (L !== null)
          return _1(e, t, l, a, L, V, n);
      }
      if (i) {
        var B = a.fallback, pe = a.children, Ce = j1(e, t, pe, B, n), Se = t.child, Ze = e.child.memoizedState;
        return Se.memoizedState = Ze === null ? Pp(n) : E1(Ze, n), Se.childLanes = R1(e, n), t.memoizedState = zp, Ce;
      } else {
        var Ge = a.children, _ = C1(e, t, Ge, n);
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
    return (r & Xe) === we && i !== null ? (u = i, u.childLanes = X, u.pendingProps = l, e.mode & ft && (u.actualDuration = 0, u.actualStartTime = -1, u.selfBaseDuration = 0, u.treeBaseDuration = 0), c = oi(n, r, a, null)) : (u = Bp(l, r), c = oi(n, r, a, null)), u.return = e, c.return = e, u.sibling = c, e.child = u, c;
  }
  function Bp(e, t, n) {
    return DN(e, t, X, null);
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
      h = v, h.childLanes = X, h.pendingProps = c, t.mode & ft && (h.actualDuration = 0, h.actualStartTime = -1, h.selfBaseDuration = l.selfBaseDuration, h.treeBaseDuration = l.treeBaseDuration), t.deletions = null;
    } else
      h = Dy(l, c), h.subtreeFlags = l.subtreeFlags & vr;
    var C;
    return u !== null ? C = Qi(u, a) : (C = oi(a, i, r, null), C.flags |= It), C.return = t, h.return = t, h.sibling = C, t.child = h, C;
  }
  function Kc(e, t, n, a) {
    a !== null && Em(a), Ul(t, e.child, null, n);
    var r = t.pendingProps, i = r.children, l = Hp(t, i);
    return l.flags |= It, t.memoizedState = null, l;
  }
  function T1(e, t, n, a, r) {
    var i = t.mode, l = {
      mode: "visible",
      children: n
    }, u = Bp(l, i), c = oi(a, i, r, null);
    return c.flags |= It, u.return = t, c.return = t, u.sibling = c, t.child = u, (t.mode & Xe) !== we && Ul(t, e.child, null, r), c;
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
          return t.child = e.child, t.flags |= it, null;
        var $ = a.children, O = a.fallback, ae = T1(e, t, $, O, l), ye = t.child;
        return ye.memoizedState = Pp(l), t.memoizedState = zp, ae;
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
      var V = ea(l, e.childLanes);
      if (ka || V) {
        var L = ld();
        if (L !== null) {
          var B = PS(L, l);
          if (B !== cn && B !== i.retryLane) {
            i.retryLane = B;
            var pe = xt;
            Gn(e, B), rn(L, e, B, pe);
          }
        }
        uh();
        var Ce = Tp(new Error("This Suspense boundary received an update before it finished hydrating. This caused the boundary to switch to client rendering. The usual way to fix this is to wrap the original update in startTransition."));
        return Kc(e, t, l, Ce);
      } else if (Wg(r)) {
        t.flags |= it, t.child = e.child;
        var Se = tT.bind(null, e);
        return LD(r, Se), null;
      } else {
        NC(t, r, i.treeContext);
        var Ze = a.children, Ge = Hp(t, Ze);
        return Ge.flags |= hr, Ge;
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
      if (a.tag === Z) {
        var r = a.memoizedState;
        r !== null && Cy(a, n, e);
      } else if (a.tag === ee)
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
      var n = qe(e), a = !n && typeof Ca(e) == "function";
      if (n || a) {
        var r = n ? "array" : "iterable";
        return d("A nested %s was passed to row #%s in <SuspenseList />. Wrap it in an additional SuspenseList to configure its revealOrder: <SuspenseList revealOrder=...> ... <SuspenseList revealOrder=...>{%s}</SuspenseList> ... </SuspenseList>", r, t, r), !1;
      }
    }
    return !0;
  }
  function L1(e, t) {
    if ((t === "forwards" || t === "backwards") && e !== void 0 && e !== null && e !== !1)
      if (qe(e)) {
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
      u = Bm(u, Es), t.flags |= it;
    else {
      var h = e !== null && (e.flags & it) !== Oe;
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
          var D = null, V = t.child;
          for (t.child = null; V !== null; ) {
            var L = V.alternate;
            if (L !== null && jc(L) === null) {
              t.child = V;
              break;
            }
            var B = V.sibling;
            V.sibling = D, D = V, V = B;
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
    var l = Yt(a);
    Oo(t);
    var u;
    return Os.current = t, fa(!0), u = i(l), fa(!1), bl(), t.flags |= pl, Pn(e, t, u, n), t.child;
  }
  function As() {
    ka = !0;
  }
  function Qc(e, t) {
    (t.mode & Xe) === we && e !== null && (e.alternate = null, t.alternate = null, t.flags |= It);
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
      return i === null ? (a.deletions = [e], a.flags |= Si) : i.push(e), n.flags |= It, n;
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
      case k:
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
      case W: {
        var r = t.memoizedProps.value, i = t.type._context;
        xb(t, i, r);
        break;
      }
      case Y:
        {
          var l = ea(n, t.childLanes);
          l && (t.flags |= rt);
          {
            var u = t.stateNode;
            u.effectDuration = 0, u.passiveEffectDuration = 0;
          }
        }
        break;
      case Z: {
        var c = t.memoizedState;
        if (c !== null) {
          if (c.dehydrated !== null)
            return Zr(t, Hl(Va.current)), t.flags |= it, null;
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
      case ee: {
        var D = (e.flags & it) !== Oe, V = ea(n, t.childLanes);
        if (D) {
          if (V)
            return Ty(e, t, n);
          t.flags |= it;
        }
        var L = t.memoizedState;
        if (L !== null && (L.rendering = null, L.tail = null, L.lastEffect = null), Zr(t, Va.current), V)
          break;
        return null;
      }
      case I:
      case ve:
        return t.lanes = X, yy(e, t, n);
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
        (t.flags & it) === Oe)
          return ka = !1, P1(e, t, n);
        (e.flags & Wd) !== Oe ? ka = !0 : ka = !1;
      }
    } else if (ka = !1, gn() && dC(t)) {
      var l = t.index, u = fC();
      ib(t, u, l);
    }
    switch (t.lanes = X, t.tag) {
      case F:
        return x1(e, t, t.type, n);
      case re: {
        var c = t.elementType;
        return y1(e, t, c, n);
      }
      case R: {
        var h = t.type, v = t.pendingProps, C = t.elementType === h ? v : La(h, v);
        return kp(e, t, h, C, n);
      }
      case j: {
        var D = t.type, V = t.pendingProps, L = t.elementType === D ? V : La(D, V);
        return xy(e, t, D, L, n);
      }
      case x:
        return v1(e, t, n);
      case k:
        return g1(e, t, n);
      case te:
        return b1(e, t);
      case Z:
        return Ry(e, t, n);
      case T:
        return k1(e, t, n);
      case P: {
        var B = t.type, pe = t.pendingProps, Ce = t.elementType === B ? pe : La(B, pe);
        return vy(e, t, B, Ce, n);
      }
      case fe:
        return m1(e, t, n);
      case le:
        return p1(e, t, n);
      case Y:
        return h1(e, t, n);
      case W:
        return U1(e, t, n);
      case oe:
        return F1(e, t, n);
      case z: {
        var Se = t.type, Ze = t.pendingProps, Ge = La(Se, Ze);
        if (t.type !== t.elementType) {
          var _ = Se.propTypes;
          _ && _a(
            _,
            Ge,
            // Resolved for outer only
            "prop",
            at(Se)
          );
        }
        return Ge = La(Se.type, Ge), gy(e, t, Se, Ge, n);
      }
      case U:
        return by(e, t, t.type, t.pendingProps, n);
      case Q: {
        var $ = t.type, O = t.pendingProps, ae = t.elementType === $ ? O : La($, O);
        return N1(e, t, $, ae, n);
      }
      case ee:
        return Ty(e, t, n);
      case Ne:
        break;
      case I:
        return yy(e, t, n);
    }
    throw new Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
  }
  function Gl(e) {
    e.flags |= rt;
  }
  function My(e) {
    e.flags |= Ri, e.flags |= Kd;
  }
  var Vy, Yp, Ay, Ly;
  Vy = function(e, t, n, a) {
    for (var r = t.child; r !== null; ) {
      if (r.tag === k || r.tag === te)
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
    var t = e.alternate !== null && e.alternate.child === e.child, n = X, a = Oe;
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
    if (DC() && (t.mode & Xe) !== we && (t.flags & it) === Oe)
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
        if (kl(), (t.flags & it) === Oe && (t.memoizedState = null), t.flags |= rt, yn(t), (t.mode & ft) !== we) {
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
      case re:
      case U:
      case R:
      case P:
      case fe:
      case le:
      case Y:
      case oe:
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
      case k: {
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
        var V = a;
        if (e && t.stateNode != null) {
          var L = e.memoizedProps;
          Ly(e, t, L, V);
        } else {
          if (typeof V != "string" && t.stateNode === null)
            throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
          var B = Tb(), pe = zm(), Ce = dc(t);
          Ce ? EC(t) && Gl(t) : t.stateNode = dD(V, B, pe, t);
        }
        return yn(t), null;
      }
      case Z: {
        Bl(t);
        var Se = t.memoizedState;
        if (e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          var Ze = H1(e, t, Se);
          if (!Ze)
            return t.flags & zn ? t : null;
        }
        if ((t.flags & it) !== Oe)
          return t.lanes = n, (t.mode & ft) !== we && hp(t), t;
        var Ge = Se !== null, _ = e !== null && e.memoizedState !== null;
        if (Ge !== _ && Ge) {
          var $ = t.child;
          if ($.flags |= Di, (t.mode & Xe) !== we) {
            var O = e === null && (t.memoizedProps.unstable_avoidThisFallback !== !0 || !0);
            O || Hm(Va.current, Ob) ? Bj() : uh();
          }
        }
        var ae = t.updateQueue;
        if (ae !== null && (t.flags |= rt), yn(t), (t.mode & ft) !== we && Ge) {
          var ye = t.child;
          ye !== null && (t.treeBaseDuration -= ye.treeBaseDuration);
        }
        return null;
      }
      case T:
        return Pl(t), Yp(e, t), e === null && rC(t.stateNode.containerInfo), yn(t), null;
      case W:
        var he = t.type._context;
        return Om(he, t), yn(t), null;
      case Q: {
        var Me = t.type;
        return Xa(Me) && ic(t), yn(t), null;
      }
      case ee: {
        Bl(t);
        var Fe = t.memoizedState;
        if (Fe === null)
          return yn(t), null;
        var pt = (t.flags & it) !== Oe, tt = Fe.rendering;
        if (tt === null)
          if (pt)
            Ls(Fe, !1);
          else {
            var Pt = Ij() && (e === null || (e.flags & it) === Oe);
            if (!Pt)
              for (var nt = t.child; nt !== null; ) {
                var kt = jc(nt);
                if (kt !== null) {
                  pt = !0, t.flags |= it, Ls(Fe, !1);
                  var Mn = kt.updateQueue;
                  return Mn !== null && (t.updateQueue = Mn, t.flags |= rt), t.subtreeFlags = Oe, MC(t, n), Zr(t, Bm(Va.current, Es)), t.child;
                }
                nt = nt.sibling;
              }
            Fe.tail !== null && sn() > aN() && (t.flags |= it, pt = !0, Ls(Fe, !1), t.lanes = Lv);
          }
        else {
          if (!pt) {
            var Rn = jc(tt);
            if (Rn !== null) {
              t.flags |= it, pt = !0;
              var la = Rn.updateQueue;
              if (la !== null && (t.updateQueue = la, t.flags |= rt), Ls(Fe, !0), Fe.tail === null && Fe.tailMode === "hidden" && !tt.alternate && !gn())
                return yn(t), null;
            } else // The time it took to render last row is greater than the remaining
            // time we have to render. So rendering one more row would likely
            // exceed it.
            sn() * 2 - Fe.renderingStartTime > aN() && n !== Zn && (t.flags |= it, pt = !0, Ls(Fe, !1), t.lanes = Lv);
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
          Fe.rendering = In, Fe.tail = In.sibling, Fe.renderingStartTime = sn(), In.sibling = null;
          var Vn = Va.current;
          return pt ? Vn = Bm(Vn, Es) : Vn = Hl(Vn), Zr(t, Vn), In;
        }
        return yn(t), null;
      }
      case Ne:
        break;
      case I:
      case ve: {
        sh(t);
        var Or = t.memoizedState, to = Or !== null;
        if (e !== null) {
          var Xs = e.memoizedState, ir = Xs !== null;
          ir !== to && // LegacyHidden doesn't do any hiding — it only pre-renders.
          !Pe && (t.flags |= Di);
        }
        return !to || (t.mode & Xe) === we ? yn(t) : ea(rr, Zn) && (yn(t), t.subtreeFlags & (It | rt) && (t.flags |= Di)), null;
      }
      case de:
        return null;
      case G:
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
        return r & zn ? (t.flags = r & ~zn | it, (t.mode & ft) !== we && hp(t), t) : null;
      }
      case x: {
        t.stateNode, Pl(t), mm(t), Im();
        var i = t.flags;
        return (i & zn) !== Oe && (i & it) === Oe ? (t.flags = i & ~zn | it, t) : null;
      }
      case k:
        return Pm(t), null;
      case Z: {
        Bl(t);
        var l = t.memoizedState;
        if (l !== null && l.dehydrated !== null) {
          if (t.alternate === null)
            throw new Error("Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue.");
          kl();
        }
        var u = t.flags;
        return u & zn ? (t.flags = u & ~zn | it, (t.mode & ft) !== we && hp(t), t) : null;
      }
      case ee:
        return Bl(t), null;
      case T:
        return Pl(t), null;
      case W:
        var c = t.type._context;
        return Om(c, t), null;
      case I:
      case ve:
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
      case k: {
        Pm(t);
        break;
      }
      case T:
        Pl(t);
        break;
      case Z:
        Bl(t);
        break;
      case ee:
        Bl(t);
        break;
      case W:
        var r = t.type._context;
        Om(r, t);
        break;
      case I:
      case ve:
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
      ni(Jt, e);
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
          if (st && fn && e.mode & ft)
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
      Ct(e);
      try {
        Q1(e);
      } catch (n) {
        bt(e, e.return, n);
      }
      on();
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
      switch (Ct(e), e.tag) {
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
        case k:
        case te:
        case T:
        case Q:
          break;
        default:
          throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
      }
      on();
    }
  }
  function Ua(e, t, n) {
    var a = t.updateQueue, r = a !== null ? a.lastEffect : null;
    if (r !== null) {
      var i = r.next, l = i;
      do {
        if ((l.tag & e) === e) {
          var u = l.destroy;
          l.destroy = void 0, u !== void 0 && ((e & bn) !== Wn ? dS(t) : (e & Jt) !== Wn && _v(t), (e & Ja) !== Wn && Ws(!0), Jc(t, n, u), (e & Ja) !== Wn && Ws(!1), (e & bn) !== Wn ? fS() : (e & Jt) !== Wn && Ov());
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
          (e & bn) !== Wn ? uS(t) : (e & Jt) !== Wn && mS(t);
          var l = i.create;
          (e & Ja) !== Wn && Ws(!0), i.destroy = l(), (e & Ja) !== Wn && Ws(!1), (e & bn) !== Wn ? cS() : (e & Jt) !== Wn && pS();
          {
            var u = i.destroy;
            if (u !== void 0 && typeof u != "function") {
              var c = void 0;
              (i.tag & Jt) !== Oe ? c = "useLayoutEffect" : (i.tag & Ja) !== Oe ? c = "useInsertionEffect" : c = "useEffect";
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
    if ((t.flags & rt) !== Oe)
      switch (t.tag) {
        case Y: {
          var n = t.stateNode.passiveEffectDuration, a = t.memoizedProps, r = a.id, i = a.onPostCommit, l = ay(), u = t.alternate === null ? "mount" : "update";
          ny() && (u = "nested-update"), typeof i == "function" && i(r, u, n, l);
          var c = t.return;
          e: for (; c !== null; ) {
            switch (c.tag) {
              case x:
                var h = c.stateNode;
                h.passiveEffectDuration += n;
                break e;
              case Y:
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
                nr(), ni(Jt | Xt, n);
              } finally {
                tr(n);
              }
            else
              ni(Jt | Xt, n);
          break;
        }
        case j: {
          var r = n.stateNode;
          if (n.flags & rt && !Nn)
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
                case k:
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
        case k: {
          var v = n.stateNode;
          if (t === null && n.flags & rt) {
            var C = n.type, D = n.memoizedProps;
            vD(v, C, D);
          }
          break;
        }
        case te:
          break;
        case T:
          break;
        case Y: {
          {
            var V = n.memoizedProps, L = V.onCommit, B = V.onRender, pe = n.stateNode.effectDuration, Ce = ay(), Se = t === null ? "mount" : "update";
            ny() && (Se = "nested-update"), typeof B == "function" && B(n.memoizedProps.id, Se, n.actualDuration, n.treeBaseDuration, n.actualStartTime, Ce);
            {
              typeof L == "function" && L(n.memoizedProps.id, Se, pe, Ce), Kj(n);
              var Ze = n.return;
              e: for (; Ze !== null; ) {
                switch (Ze.tag) {
                  case x:
                    var Ge = Ze.stateNode;
                    Ge.effectDuration += pe;
                    break e;
                  case Y:
                    var _ = Ze.stateNode;
                    _.effectDuration += pe;
                    break e;
                }
                Ze = Ze.return;
              }
            }
          }
          break;
        }
        case Z: {
          lj(e, n);
          break;
        }
        case ee:
        case Q:
        case Ne:
        case I:
        case ve:
        case G:
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
      case k: {
        Py(e, e.return);
        break;
      }
    }
  }
  function ej(e, t) {
    for (var n = null, a = e; ; ) {
      if (a.tag === k) {
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
      } else if (!((a.tag === I || a.tag === ve) && a.memoizedState !== null && a !== e)) {
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
        case k:
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
      if (e.child = null, e.deletions = null, e.sibling = null, e.tag === k) {
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
    return e.tag === k || e.tag === x || e.tag === T;
  }
  function Yy(e) {
    var t = e;
    e: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || Iy(t.return))
          return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== k && t.tag !== te && t.tag !== M; ) {
        if (t.flags & It || t.child === null || t.tag === T)
          continue e;
        t.child.return = t, t = t.child;
      }
      if (!(t.flags & It))
        return t.stateNode;
    }
  }
  function aj(e) {
    var t = nj(e);
    switch (t.tag) {
      case k: {
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
    var a = e.tag, r = a === k || a === te;
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
    var a = e.tag, r = a === k || a === te;
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
          case k: {
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
      case k:
        Nn || Ql(n, t);
      case te: {
        {
          var a = xn, r = Fa;
          xn = null, ai(e, t, n), xn = a, Fa = r, xn !== null && (Fa ? RD(xn, n.stateNode) : SD(xn, n.stateNode));
        }
        return;
      }
      case M: {
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
                var C = v, D = C.destroy, V = C.tag;
                D !== void 0 && ((V & Ja) !== Wn ? Jc(n, t, D) : (V & Jt) !== Wn && (_v(n), n.mode & ft ? (nr(), Jc(n, t, D), tr(n)) : Jc(n, t, D), Ov())), v = v.next;
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
          var L = n.stateNode;
          typeof L.componentWillUnmount == "function" && qp(n, t, L);
        }
        ai(e, t, n);
        return;
      }
      case Ne: {
        ai(e, t, n);
        return;
      }
      case I: {
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
    Wl = n, Kl = e, Ct(t), Wy(t, e), Ct(t), Wl = null, Kl = null;
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
        Ct(u), Wy(u, e), u = u.sibling;
    Ct(l);
  }
  function Wy(e, t, n) {
    var a = e.alternate, r = e.flags;
    switch (e.tag) {
      case R:
      case P:
      case z:
      case U: {
        if (za(t, e), ar(e), r & rt) {
          try {
            Ua(Ja | Xt, e, e.return), ni(Ja | Xt, e);
          } catch (Me) {
            bt(e, e.return, Me);
          }
          if (e.mode & ft) {
            try {
              nr(), Ua(Jt | Xt, e, e.return);
            } catch (Me) {
              bt(e, e.return, Me);
            }
            tr(e);
          } else
            try {
              Ua(Jt | Xt, e, e.return);
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
      case k: {
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
          if (r & rt) {
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
        if (za(t, e), ar(e), r & rt) {
          if (e.stateNode === null)
            throw new Error("This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.");
          var C = e.stateNode, D = e.memoizedProps, V = a !== null ? a.memoizedProps : D;
          try {
            bD(C, V, D);
          } catch (Me) {
            bt(e, e.return, Me);
          }
        }
        return;
      }
      case x: {
        if (za(t, e), ar(e), r & rt && a !== null) {
          var L = a.memoizedState;
          if (L.isDehydrated)
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
      case Z: {
        za(t, e), ar(e);
        var B = e.child;
        if (B.flags & Di) {
          var pe = B.stateNode, Ce = B.memoizedState, Se = Ce !== null;
          if (pe.isHidden = Se, Se) {
            var Ze = B.alternate !== null && B.alternate.memoizedState !== null;
            Ze || Hj();
          }
        }
        if (r & rt) {
          try {
            ij(e);
          } catch (Me) {
            bt(e, e.return, Me);
          }
          Gy(e);
        }
        return;
      }
      case I: {
        var Ge = a !== null && a.memoizedState !== null;
        if (
          // TODO: Remove this dead flag
          e.mode & Xe
        ) {
          var _ = Nn;
          Nn = _ || Ge, za(t, e), Nn = _;
        } else
          za(t, e);
        if (ar(e), r & Di) {
          var $ = e.stateNode, O = e.memoizedState, ae = O !== null, ye = e;
          if ($.isHidden = ae, ae && !Ge && (ye.mode & Xe) !== we) {
            xe = ye;
            for (var he = ye.child; he !== null; )
              xe = he, uj(he), he = he.sibling;
          }
          ej(ye, ae);
        }
        return;
      }
      case ee: {
        za(t, e), ar(e), r & rt && Gy(e);
        return;
      }
      case Ne:
        return;
      default: {
        za(t, e), ar(e);
        return;
      }
    }
  }
  function ar(e) {
    var t = e.flags;
    if (t & It) {
      try {
        aj(e);
      } catch (n) {
        bt(e, e.return, n);
      }
      e.flags &= ~It;
    }
    t & hr && (e.flags &= ~hr);
  }
  function sj(e, t, n) {
    Wl = n, Kl = t, xe = e, Ky(e, t, n), Wl = null, Kl = null;
  }
  function Ky(e, t, n) {
    for (var a = (e.mode & Xe) !== we; xe !== null; ) {
      var r = xe, i = r.child;
      if (r.tag === I && a) {
        var l = r.memoizedState !== null, u = l || Xc;
        if (u) {
          Kp(e, t, n);
          continue;
        } else {
          var c = r.alternate, h = c !== null && c.memoizedState !== null, v = h || Nn, C = Xc, D = Nn;
          Xc = u, Nn = v, Nn && !D && (xe = r, cj(r));
          for (var V = i; V !== null; )
            xe = V, Ky(
              V,
              // New root; bubble back up to here and stop.
              t,
              n
            ), V = V.sibling;
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
        Ct(a);
        try {
          J1(t, r, a, n);
        } catch (l) {
          bt(a, a.return, l);
        }
        on();
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
              nr(), Ua(Jt, t, t.return);
            } finally {
              tr(t);
            }
          else
            Ua(Jt, t, t.return);
          break;
        }
        case j: {
          Ql(t, t.return);
          var a = t.stateNode;
          typeof a.componentWillUnmount == "function" && qp(t, t.return, a);
          break;
        }
        case k: {
          Ql(t, t.return);
          break;
        }
        case I: {
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
      if (t.tag === I) {
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
      Ct(t);
      try {
        Z1(t);
      } catch (a) {
        bt(t, t.return, a);
      }
      if (on(), t === e) {
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
        Ct(r);
        try {
          pj(t, r, n, a);
        } catch (l) {
          bt(r, r.return, l);
        }
        on();
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
            ni(bn | Xt, t);
          } finally {
            mp(t);
          }
        } else
          ni(bn | Xt, t);
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
      (e.flags & Fr) !== Oe && (Ct(e), bj(e), on());
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
        e.mode & ft ? (pp(), Ua(bn | Xt, e, e.return), mp(e)) : Ua(bn | Xt, e, e.return);
        break;
      }
    }
  }
  function yj(e, t) {
    for (; xe !== null; ) {
      var n = xe;
      Ct(n), xj(n, t), on();
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
          ni(Jt | Xt, e);
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
          ni(bn | Xt, e);
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
          Ua(Jt | Xt, e, e.return);
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
          Ua(bn | Xt, e, e.return);
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
  var _j = Math.ceil, Qp = p.ReactCurrentDispatcher, Xp = p.ReactCurrentOwner, En = p.ReactCurrentBatchConfig, Pa = p.ReactCurrentActQueue, tn = (
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
  ), jr = 0, Us = 1, qi = 2, Zc = 3, Fs = 4, eN = 5, Jp = 6, Je = tn, Hn = null, Ot = null, nn = X, rr = X, Zp = Gr(X), an = jr, zs = null, ed = X, Ps = X, td = X, Hs = null, Kn = null, eh = 0, tN = 500, nN = 1 / 0, Oj = 500, Tr = null;
  function Bs() {
    nN = sn() + Oj;
  }
  function aN() {
    return nN;
  }
  var nd = !1, th = null, Xl = null, Gi = !1, ri = null, $s = X, nh = [], ah = null, Mj = 50, Is = 0, rh = null, ih = !1, ad = !1, Vj = 50, Jl = 0, rd = null, Ys = xt, id = X, rN = !1;
  function ld() {
    return Hn;
  }
  function Bn() {
    return (Je & (Sn | ba)) !== tn ? sn() : (Ys !== xt || (Ys = sn()), Ys);
  }
  function ii(e) {
    var t = e.mode;
    if ((t & Xe) === we)
      return Le;
    if ((Je & Sn) !== tn && nn !== X)
      return Uo(nn);
    var n = TC() !== jC;
    if (n) {
      if (En.transition !== null) {
        var a = En.transition;
        a._updatedFibers || (a._updatedFibers = /* @__PURE__ */ new Set()), a._updatedFibers.add(e);
      }
      return id === cn && (id = zv()), id;
    }
    var r = wa();
    if (r !== cn)
      return r;
    var i = fD();
    return i;
  }
  function Aj(e) {
    var t = e.mode;
    return (t & Xe) === we ? Le : kS();
  }
  function rn(e, t, n, a) {
    rT(), rN && d("useInsertionEffect must not schedule updates."), ih && (ad = !0), Fo(e, n, a), (Je & Sn) !== X && e === Hn ? oT(t) : (Ta && Bv(e, t, n), sT(t), e === Hn && ((Je & Sn) === tn && (Ps = Be(Ps, n)), an === Fs && li(e, nn)), Qn(e, a), n === Le && Je === tn && (t.mode & Xe) === we && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
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
      (Je & Sn) !== tn
    );
  }
  function Qn(e, t) {
    var n = e.callbackNode;
    _S(e, t);
    var a = ju(e, e === Hn ? nn : X);
    if (a === X) {
      n !== null && NN(n), e.callbackNode = null, e.callbackPriority = cn;
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
        (Je & (Sn | ba)) === tn && Kr();
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
    if (e1(), Ys = xt, id = X, (Je & (Sn | ba)) !== tn)
      throw new Error("Should not already be working.");
    var n = e.callbackNode, a = _r();
    if (a && e.callbackNode !== n)
      return null;
    var r = ju(e, e === Hn ? nn : X);
    if (r === X)
      return null;
    var i = !Tu(e, r) && !LS(e, r) && !t, l = i ? qj(e, r) : sd(e, r);
    if (l !== jr) {
      if (l === qi) {
        var u = Rf(e);
        u !== X && (r = u, l = lh(e, u));
      }
      if (l === Us) {
        var c = zs;
        throw Wi(e, X), li(e, r), Qn(e, sn()), c;
      }
      if (l === Jp)
        li(e, r);
      else {
        var h = !Tu(e, r), v = e.current.alternate;
        if (h && !Fj(v)) {
          if (l = sd(e, r), l === qi) {
            var C = Rf(e);
            C !== X && (r = C, l = lh(e, C));
          }
          if (l === Us) {
            var D = zs;
            throw Wi(e, X), li(e, r), Qn(e, sn()), D;
          }
        }
        e.finishedWork = v, e.finishedLanes = r, Uj(e, l, r);
      }
    }
    return Qn(e, sn()), e.callbackNode === n ? iN.bind(null, e) : null;
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
          var a = eh + tN - sn();
          if (a > 10) {
            var r = ju(e, X);
            if (r !== X)
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
          var l = TS(e, n), u = l, c = sn() - u, h = aT(c) - c;
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
    if (t1(), (Je & (Sn | ba)) !== tn)
      throw new Error("Should not already be working.");
    _r();
    var t = ju(e, X);
    if (!ea(t, Le))
      return Qn(e, sn()), null;
    var n = sd(e, t);
    if (e.tag !== Wr && n === qi) {
      var a = Rf(e);
      a !== X && (t = a, n = lh(e, a));
    }
    if (n === Us) {
      var r = zs;
      throw Wi(e, X), li(e, t), Qn(e, sn()), r;
    }
    if (n === Jp)
      throw new Error("Root did not complete. This is a bug in React.");
    var i = e.current.alternate;
    return e.finishedWork = i, e.finishedLanes = t, Ki(e, Kn, Tr), Qn(e, sn()), null;
  }
  function zj(e, t) {
    t !== X && (Tf(e, Be(t, Le)), Qn(e, sn()), (Je & (Sn | ba)) === tn && (Bs(), Kr()));
  }
  function oh(e, t) {
    var n = Je;
    Je |= Zy;
    try {
      return e(t);
    } finally {
      Je = n, Je === tn && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
      !Pa.isBatchingLegacy && (Bs(), rb());
    }
  }
  function Pj(e, t, n, a, r) {
    var i = wa(), l = En.transition;
    try {
      return En.transition = null, dn(ta), e(t, n, a, r);
    } finally {
      dn(i), En.transition = l, Je === tn && Bs();
    }
  }
  function wr(e) {
    ri !== null && ri.tag === Wr && (Je & (Sn | ba)) === tn && _r();
    var t = Je;
    Je |= Zy;
    var n = En.transition, a = wa();
    try {
      return En.transition = null, dn(ta), e ? e() : void 0;
    } finally {
      dn(a), En.transition = n, Je = t, (Je & (Sn | ba)) === tn && Kr();
    }
  }
  function sN() {
    return (Je & (Sn | ba)) !== tn;
  }
  function od(e, t) {
    _n(Zp, rr, e), rr = Be(rr, t);
  }
  function sh(e) {
    rr = Zp.current, wn(Zp, e);
  }
  function Wi(e, t) {
    e.finishedWork = null, e.finishedLanes = X;
    var n = e.timeoutHandle;
    if (n !== rm && (e.timeoutHandle = rm, mD(n)), Ot !== null)
      for (var a = Ot.return; a !== null; ) {
        var r = a.alternate;
        Uy(r, a), a = a.return;
      }
    Hn = e;
    var i = Qi(e.current, null);
    return Ot = i, nn = rr = t, an = jr, zs = null, ed = X, Ps = X, td = X, Hs = null, Kn = null, LC(), Ma.discardPendingWarnings(), i;
  }
  function uN(e, t) {
    do {
      var n = Ot;
      try {
        if (gc(), Vb(), on(), Xp.current = null, n === null || n.return === null) {
          an = Us, zs = t, Ot = null;
          return;
        }
        if (st && n.mode & ft && qc(n, !0), Ie)
          if (bl(), t !== null && typeof t == "object" && typeof t.then == "function") {
            var a = t;
            vS(n, a, nn);
          } else
            hS(n, t, nn);
        c1(e, n.return, n, t, nn), mN(n);
      } catch (r) {
        t = r, Ot === n && n !== null ? (n = n.return, Ot = n) : n = Ot;
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
    eh = sn();
  }
  function qs(e) {
    ed = Be(e, ed);
  }
  function Bj() {
    an === jr && (an = Zc);
  }
  function uh() {
    (an === jr || an === Zc || an === qi) && (an = Fs), Hn !== null && (Df(ed) || Df(Ps)) && li(Hn, nn);
  }
  function $j(e) {
    an !== Fs && (an = qi), Hs === null ? Hs = [e] : Hs.push(e);
  }
  function Ij() {
    return an === jr;
  }
  function sd(e, t) {
    var n = Je;
    Je |= Sn;
    var a = cN();
    if (Hn !== e || nn !== t) {
      if (Ta) {
        var r = e.memoizedUpdaters;
        r.size > 0 && (Gs(e, nn), r.clear()), $v(e, t);
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
    if (gc(), Je = n, dN(a), Ot !== null)
      throw new Error("Cannot commit an incomplete root. This error is likely caused by a bug in React. Please file an issue.");
    return Vv(), Hn = null, nn = X, an;
  }
  function Yj() {
    for (; Ot !== null; )
      fN(Ot);
  }
  function qj(e, t) {
    var n = Je;
    Je |= Sn;
    var a = cN();
    if (Hn !== e || nn !== t) {
      if (Ta) {
        var r = e.memoizedUpdaters;
        r.size > 0 && (Gs(e, nn), r.clear()), $v(e, t);
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
    return gc(), dN(a), Je = n, Ot !== null ? (xS(), jr) : (Vv(), Hn = null, nn = X, an);
  }
  function Gj() {
    for (; Ot !== null && !KE(); )
      fN(Ot);
  }
  function fN(e) {
    var t = e.alternate;
    Ct(e);
    var n;
    (e.mode & ft) !== we ? (fp(e), n = ch(t, e, rr), qc(e, !0)) : n = ch(t, e, rr), on(), e.memoizedProps = e.pendingProps, n === null ? mN(e) : Ot = n, Xp.current = null;
  }
  function mN(e) {
    var t = e;
    do {
      var n = t.alternate, a = t.return;
      if ((t.flags & Eu) === Oe) {
        Ct(t);
        var r = void 0;
        if ((t.mode & ft) === we ? r = ky(n, t, rr) : (fp(t), r = ky(n, t, rr), qc(t, !1)), on(), r !== null) {
          Ot = r;
          return;
        }
      } else {
        var i = B1(n, t);
        if (i !== null) {
          i.flags &= $E, Ot = i;
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
          an = Jp, Ot = null;
          return;
        }
      }
      var c = t.sibling;
      if (c !== null) {
        Ot = c;
        return;
      }
      t = a, Ot = t;
    } while (t !== null);
    an === jr && (an = eN);
  }
  function Ki(e, t, n) {
    var a = wa(), r = En.transition;
    try {
      En.transition = null, dn(ta), Wj(e, t, n, a);
    } finally {
      En.transition = r, dn(a);
    }
    return null;
  }
  function Wj(e, t, n, a) {
    do
      _r();
    while (ri !== null);
    if (iT(), (Je & (Sn | ba)) !== tn)
      throw new Error("Should not already be working.");
    var r = e.finishedWork, i = e.finishedLanes;
    if (sS(i), r === null)
      return wv(), null;
    if (i === X && d("root.finishedLanes should not be empty during a commit. This is a bug in React."), e.finishedWork = null, e.finishedLanes = X, r === e.current)
      throw new Error("Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue.");
    e.callbackNode = null, e.callbackPriority = cn;
    var l = Be(r.lanes, r.childLanes);
    zS(e, l), e === Hn && (Hn = null, Ot = null, nn = X), ((r.subtreeFlags & vl) !== Oe || (r.flags & vl) !== Oe) && (Gi || (Gi = !0, ah = n, mh(Ti, function() {
      return _r(), null;
    })));
    var u = (r.subtreeFlags & (Jd | Zd | _o | vl)) !== Oe, c = (r.flags & (Jd | Zd | _o | vl)) !== Oe;
    if (u || c) {
      var h = En.transition;
      En.transition = null;
      var v = wa();
      dn(ta);
      var C = Je;
      Je |= ba, Xp.current = null, G1(e, r), ry(), oj(e, r, i), lD(e.containerInfo), e.current = r, gS(i), sj(r, e, i), bS(), QE(), Je = C, dn(v), En.transition = h;
    } else
      e.current = r, ry();
    var D = Gi;
    if (Gi ? (Gi = !1, ri = e, $s = i) : (Jl = 0, rd = null), l = e.pendingLanes, l === X && (Xl = null), D || gN(e.current, !1), aS(r.stateNode, a), Ta && e.memoizedUpdaters.clear(), jj(), Qn(e, sn()), t !== null)
      for (var V = e.onRecoverableError, L = 0; L < t.length; L++) {
        var B = t[L], pe = B.stack, Ce = B.digest;
        V(B.value, {
          componentStack: pe,
          digest: Ce
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
        return En.transition = null, dn(t), Qj();
      } finally {
        dn(a), En.transition = n;
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
    if (ri = null, $s = X, (Je & (Sn | ba)) !== tn)
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
    Hv(e, n), uT(e), Hn === e && El(nn, n) && (an === Fs || an === Zc && Uv(nn) && sn() - eh < tN ? Wi(e, X) : td = Be(td, n)), Qn(e, r);
  }
  function vN(e, t) {
    t === cn && (t = Aj(e));
    var n = Bn(), a = Gn(e, t);
    a !== null && (Fo(a, t, n), Qn(a, n));
  }
  function tT(e) {
    var t = e.memoizedState, n = cn;
    t !== null && (n = t.retryLane), vN(e, n);
  }
  function nT(e, t) {
    var n = cn, a;
    switch (e.tag) {
      case Z:
        a = e.stateNode;
        var r = e.memoizedState;
        r !== null && (n = r.retryLane);
        break;
      case ee:
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
    Ct(e), ud(e, zr, Rj), t && ud(e, Xd, Dj), ud(e, zr, Ej), t && ud(e, Xd, Sj), on();
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
      if ((Je & Sn) !== tn || !(e.mode & Xe))
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
        Ct(e), d("Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously later calls tries to update the component. Move this work to useEffect instead.");
      } finally {
        a ? Ct(e) : on();
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
          var t = Ot && ze(Ot) || "Unknown", n = t;
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
      } else if (!wj() || Je !== tn || e.tag !== R && e.tag !== P && e.tag !== U)
        return;
      if (Pa.current === null) {
        var t = kn;
        try {
          Ct(e), d(`An update to %s inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`, ze(e));
        } finally {
          t ? Ct(e) : on();
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
              $$typeof: De,
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
          (i === De || i === Te) && (r = !0);
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
        D !== null && rn(D, e, Le, xt);
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
          case k:
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
      if (n.tag === k)
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
    this.tag = e, this.key = n, this.elementType = null, this.type = null, this.stateNode = null, this.return = null, this.child = null, this.sibling = null, this.index = 0, this.ref = null, this.pendingProps = t, this.memoizedProps = null, this.updateQueue = null, this.memoizedState = null, this.dependencies = null, this.mode = a, this.flags = Oe, this.subtreeFlags = Oe, this.deletions = null, this.lanes = X, this.childLanes = X, this.alternate = null, this.actualDuration = Number.NaN, this.actualStartTime = Number.NaN, this.selfBaseDuration = Number.NaN, this.treeBaseDuration = Number.NaN, this.actualDuration = 0, this.actualStartTime = -1, this.selfBaseDuration = 0, this.treeBaseDuration = 0, this._debugSource = null, this._debugOwner = null, this._debugNeedsRemount = !1, this._debugHookTypes = null, !bh && typeof Object.preventExtensions == "function" && Object.preventExtensions(this);
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
      if (t === De)
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
    e.flags &= vr | It;
    var n = e.alternate;
    if (n === null)
      e.childLanes = X, e.lanes = t, e.child = null, e.subtreeFlags = Oe, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null, e.selfBaseDuration = 0, e.treeBaseDuration = 0;
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
    return e === oc ? (a = Xe, t === !0 && (a |= Lt, a |= Wa)) : a = we, Ta && (a |= ft), ia(x, null, null, a);
  }
  function Nh(e, t, n, a, r, i) {
    var l = F, u = e;
    if (typeof e == "function")
      yh(e) ? (l = j, u = ph(u)) : u = eo(u);
    else if (typeof e == "string")
      l = k;
    else
      e: switch (e) {
        case Ia:
          return oi(n.children, r, i, t);
        case mi:
          l = le, r |= Lt, (r & Xe) !== we && (r |= Wa);
          break;
        case E:
          return xT(n, r, i, t);
        case Ke:
          return ET(n, r, i, t);
        case Ae:
          return ST(n, r, i, t);
        case Rt:
          return DN(n, r, i, t);
        case jn:
        case Kt:
        case Ya:
        case Da:
        case St:
        default: {
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case ne:
                l = W;
                break e;
              case me:
                l = oe;
                break e;
              case De:
                l = P, u = hh(u);
                break e;
              case He:
                l = z;
                break e;
              case Te:
                l = re, u = null;
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
    var r = ia(fe, e, a, t);
    return r.lanes = n, r;
  }
  function xT(e, t, n, a) {
    typeof e.id != "string" && d('Profiler must specify an "id" of type `string` as a prop. Received the type `%s` instead.', typeof e.id);
    var r = ia(Y, e, a, t | ft);
    return r.elementType = E, r.lanes = n, r.stateNode = {
      effectDuration: 0,
      passiveEffectDuration: 0
    }, r;
  }
  function ET(e, t, n, a) {
    var r = ia(Z, e, a, t);
    return r.elementType = Ke, r.lanes = n, r;
  }
  function ST(e, t, n, a) {
    var r = ia(ee, e, a, t);
    return r.elementType = Ae, r.lanes = n, r;
  }
  function DN(e, t, n, a) {
    var r = ia(I, e, a, t);
    r.elementType = Rt, r.lanes = n;
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
    var e = ia(k, null, null, we);
    return e.elementType = "DELETED", e;
  }
  function DT(e) {
    var t = ia(M, null, null, we);
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
    this.tag = t, this.containerInfo = e, this.pendingChildren = null, this.current = null, this.pingCache = null, this.finishedWork = null, this.timeoutHandle = rm, this.context = null, this.pendingContext = null, this.callbackNode = null, this.callbackPriority = cn, this.eventTimes = jf(X), this.expirationTimes = jf(xt), this.pendingLanes = X, this.suspendedLanes = X, this.pingedLanes = X, this.expiredLanes = X, this.mutableReadLanes = X, this.finishedLanes = X, this.entangledLanes = X, this.entanglements = jf(X), this.identifierPrefix = a, this.onRecoverableError = r, this.mutableSourceEagerHydrationData = null, this.effectDuration = 0, this.passiveEffectDuration = 0;
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
    return Ut(a), {
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
      if (r.mode & Lt) {
        var i = ze(n) || "Component";
        if (!Ch[i]) {
          Ch[i] = !0;
          var l = kn;
          try {
            Ct(r), n.mode & Lt ? d("%s is deprecated in StrictMode. %s was passed an instance of %s which is inside StrictMode. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", t, t, i) : d("%s is deprecated in StrictMode. %s was passed an instance of %s which renders StrictMode children. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", t, t, i);
          } finally {
            l ? Ct(l) : on();
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
    var D = C.current, V = Bn(), L = ii(D), B = Dr(V, L);
    return B.callback = t ?? null, Xr(D, B, L), Lj(C, L, V), C;
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
    return h !== null && (rn(h, r, l, i), Ec(h, r, l)), l;
  }
  function dd(e) {
    var t = e.current;
    if (!t.child)
      return null;
    switch (t.child.tag) {
      case k:
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
      case Z: {
        wr(function() {
          var r = Gn(e, Le);
          if (r !== null) {
            var i = Bn();
            rn(r, e, Le, i);
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
    if (e.tag === Z) {
      var t = Ao, n = Gn(e, t);
      if (n !== null) {
        var a = Bn();
        rn(n, e, t, a);
      }
      jh(e, t);
    }
  }
  function OT(e) {
    if (e.tag === Z) {
      var t = ii(e), n = Gn(e, t);
      if (n !== null) {
        var a = Bn();
        rn(n, e, t, a);
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
      var a = t[n], r = qe(e) ? e.slice() : Ye({}, e);
      return n + 1 === t.length ? (qe(r) ? r.splice(a, 1) : delete r[a], r) : (r[a] = IN(e[a], t, n + 1), r);
    }, YN = function(e, t) {
      return IN(e, t, 0);
    }, qN = function(e, t, n, a) {
      var r = t[a], i = qe(e) ? e.slice() : Ye({}, e);
      if (a + 1 === t.length) {
        var l = n[a];
        i[l] = i[r], qe(i) ? i.splice(r, 1) : delete i[r];
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
      var r = t[n], i = qe(e) ? e.slice() : Ye({}, e);
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
        r.memoizedState = i, r.baseState = i, e.memoizedProps = Ye({}, e.memoizedProps);
        var l = Gn(e, Le);
        l !== null && rn(l, e, Le, xt);
      }
    }, kN = function(e, t, n) {
      var a = Th(e, t);
      if (a !== null) {
        var r = YN(a.memoizedState, n);
        a.memoizedState = r, a.baseState = r, e.memoizedProps = Ye({}, e.memoizedProps);
        var i = Gn(e, Le);
        i !== null && rn(i, e, Le, xt);
      }
    }, UN = function(e, t, n, a) {
      var r = Th(e, t);
      if (r !== null) {
        var i = GN(r.memoizedState, n, a);
        r.memoizedState = i, r.baseState = i, e.memoizedProps = Ye({}, e.memoizedProps);
        var l = Gn(e, Le);
        l !== null && rn(l, e, Le, xt);
      }
    }, FN = function(e, t, n) {
      e.pendingProps = KN(e.memoizedProps, t, n), e.alternate && (e.alternate.pendingProps = e.pendingProps);
      var a = Gn(e, Le);
      a !== null && rn(a, e, Le, xt);
    }, zN = function(e, t) {
      e.pendingProps = YN(e.memoizedProps, t), e.alternate && (e.alternate.pendingProps = e.pendingProps);
      var n = Gn(e, Le);
      n !== null && rn(n, e, Le, xt);
    }, PN = function(e, t, n) {
      e.pendingProps = GN(e.memoizedProps, t, n), e.alternate && (e.alternate.pendingProps = e.pendingProps);
      var a = Gn(e, Le);
      a !== null && rn(a, e, Le, xt);
    }, HN = function(e) {
      var t = Gn(e, Le);
      t !== null && rn(t, e, Le, xt);
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
      if (n.nodeType !== $t) {
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
    var u = e.nodeType === $t ? e.parentNode : e;
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
    return !!(e && (e.nodeType === Yn || e.nodeType === mr || e.nodeType === Ad || e.nodeType === $t && e.nodeValue === " react-mount-point-unstable "));
  }
  function XN(e) {
    e.nodeType === Yn && e.tagName && e.tagName.toUpperCase() === "BODY" && d("createRoot(): Creating roots directly with document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try using a container element created for your app."), fs(e) && (e._reactRootContainer ? d("You are calling ReactDOMClient.createRoot() on a container that was previously passed to ReactDOM.render(). This is not supported.") : d("You are calling ReactDOMClient.createRoot() on a container that has already been passed to createRoot() before. Instead, call root.render() on the existing root instead if you want to update it."));
  }
  var HT = p.ReactCurrentOwner, JN;
  JN = function(e) {
    if (e._reactRootContainer && e.nodeType !== $t) {
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
      var u = e.nodeType === $t ? e.parentNode : e;
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
      var C = e.nodeType === $t ? e.parentNode : e;
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
        n || d("%s is accessing findDOMNode inside its render(). render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", at(t.type) || "A component"), t.stateNode._warnedAboutRefsInRender = !0;
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
  if (!ew && J && window.top === window.self && (navigator.userAgent.indexOf("Chrome") > -1 && navigator.userAgent.indexOf("Edge") === -1 || navigator.userAgent.indexOf("Firefox") > -1)) {
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
function Tt(o, f) {
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
    let le = F(), oe = le == null ? null : le - j;
    j = le, R && R({
      action: w,
      location: fe.location,
      delta: oe
    });
  }
  function T(le, oe) {
    w = si.Push;
    let W = Lh(fe.location, le, oe);
    j = F() + 1;
    let P = lx(W, j), Y = fe.createHref(W);
    try {
      d.pushState(P, "", Y);
    } catch (Z) {
      if (Z instanceof DOMException && Z.name === "DataCloneError")
        throw Z;
      b.location.assign(Y);
    }
    S && R && R({
      action: w,
      location: fe.location,
      delta: 1
    });
  }
  function k(le, oe) {
    w = si.Replace;
    let W = Lh(fe.location, le, oe);
    j = F();
    let P = lx(W, j), Y = fe.createHref(W);
    d.replaceState(P, "", Y), S && R && R({
      action: w,
      location: fe.location,
      delta: 0
    });
  }
  function te(le) {
    let oe = b.location.origin !== "null" ? b.location.origin : b.location.href, W = typeof le == "string" ? le : Zs(le);
    return W = W.replace(/ $/, "%20"), Tt(oe, "No window.location.(origin|href) available to create URL for href: " + W), new URL(W, oe);
  }
  let fe = {
    get action() {
      return w;
    },
    get location() {
      return o(b, d);
    },
    listen(le) {
      if (R)
        throw new Error("A history only accepts one active listener");
      return b.addEventListener(ix, x), R = le, () => {
        b.removeEventListener(ix, x), R = null;
      };
    },
    createHref(le) {
      return f(b, le);
    },
    createURL: te,
    encodeLocation(le) {
      let oe = te(le);
      return {
        pathname: oe.pathname,
        search: oe.search,
        hash: oe.hash
      };
    },
    push: T,
    replace: k,
    go(le) {
      return d.go(le);
    }
  };
  return fe;
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
    R.relativePath.startsWith("/") && (Tt(R.relativePath.startsWith(g), 'Absolute route path "' + R.relativePath + '" nested under path ' + ('"' + g + '" is not valid. An absolute child route path ') + "must start with the combined path of all its parent routes."), R.relativePath = R.relativePath.slice(g.length));
    let j = Vr([g, R.relativePath]), F = p.concat(R);
    S.children && S.children.length > 0 && (Tt(
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
        isOptional: k
      } = F;
      if (T === "*") {
        let fe = w[x] || "";
        d = S.slice(0, S.length - fe.length).replace(/(.)\/+$/, "$1");
      }
      const te = w[x];
      return k && !te ? j[T] = void 0 : j[T] = (te || "").replace(/%2F/g, "/"), j;
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
  typeof o == "string" ? b = ao(o) : (b = Js({}, o), Tt(!b.pathname || !b.pathname.includes("?"), Mh("?", "pathname", "search", b)), Tt(!b.pathname || !b.pathname.includes("#"), Mh("#", "pathname", "hash", b)), Tt(!b.search || !b.search.includes("#"), Mh("#", "search", "hash", b)));
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
  ro() || Tt(
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
  return ro() || Tt(
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
  ro() || Tt(
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
  ro() || Tt(
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
    let W = F && F.path || "";
    Ox(R, !F || W.endsWith("*"), "You rendered descendant <Routes> (or called `useRoutes()`) at " + ('"' + R + '" (under <Route path="' + W + '">) but the ') + `parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

` + ('Please change the parent <Route path="' + W + '"> to <Route ') + ('path="' + (W === "/" ? "*" : W + "/*") + '">.'));
  }
  let x = Ji(), T;
  if (f) {
    var k;
    let W = typeof f == "string" ? ao(f) : f;
    j === "/" || (k = W.pathname) != null && k.startsWith(j) || Tt(!1, "When overriding the location using `<Routes location>` or `useRoutes(routes, location)`, the location pathname must begin with the portion of the URL pathname that was " + ('matched by all parent routes. The current pathname base is "' + j + '" ') + ('but pathname "' + W.pathname + '" was given in the `location` prop.')), T = W;
  } else
    T = x;
  let te = T.pathname || "/", fe = te;
  if (j !== "/") {
    let W = j.replace(/^\//, "").split("/");
    fe = "/" + te.replace(/^\//, "").split("/").slice(W.length).join("/");
  }
  let le = fw(o, {
    pathname: fe
  });
  Ha(F || le != null, 'No routes matched location "' + T.pathname + T.search + T.hash + '" '), Ha(le == null || le[le.length - 1].route.element !== void 0 || le[le.length - 1].route.Component !== void 0 || le[le.length - 1].route.lazy !== void 0, 'Matched leaf route at location "' + T.pathname + T.search + T.hash + '" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.');
  let oe = Iw(le && le.map((W) => Object.assign({}, W, {
    params: Object.assign({}, w, W.params),
    pathname: Vr([
      j,
      // Re-encode pathnames that were decoded inside matchRoutes
      b.encodeLocation ? b.encodeLocation(W.pathname).pathname : W.pathname
    ]),
    pathnameBase: W.pathnameBase === "/" ? j : Vr([
      j,
      // Re-encode pathnames that were decoded inside matchRoutes
      b.encodeLocation ? b.encodeLocation(W.pathnameBase).pathname : W.pathnameBase
    ])
  })), S, p, g);
  return f && oe ? /* @__PURE__ */ y.createElement(au.Provider, {
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
  }, oe) : oe;
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
    F >= 0 || Tt(!1, "Could not find a matching route for errors on route IDs: " + Object.keys(w).join(",")), d = d.slice(0, Math.min(d.length, F + 1));
  }
  let R = !1, j = -1;
  if (p && g && g.v7_partialHydration)
    for (let F = 0; F < d.length; F++) {
      let x = d[F];
      if ((x.route.HydrateFallback || x.route.hydrateFallbackElement) && (j = F), x.route.id) {
        let {
          loaderData: T,
          errors: k
        } = p, te = x.route.loader && T[x.route.id] === void 0 && (!k || k[x.route.id] === void 0);
        if (x.route.lazy || te) {
          R = !0, j >= 0 ? d = d.slice(0, j + 1) : d = [d[0]];
          break;
        }
      }
    }
  return d.reduceRight((F, x, T) => {
    let k, te = !1, fe = null, le = null;
    p && (k = w && x.route.id ? w[x.route.id] : void 0, fe = x.route.errorElement || Hw, R && (j < 0 && T === 0 ? (Ox("route-fallback", !1, "No `HydrateFallback` element provided to render during initial hydration"), te = !0, le = null) : j === T && (te = !0, le = x.route.hydrateFallbackElement || null)));
    let oe = f.concat(d.slice(0, T + 1)), W = () => {
      let P;
      return k ? P = fe : te ? P = le : x.route.Component ? P = /* @__PURE__ */ y.createElement(x.route.Component, null) : x.route.element ? P = x.route.element : P = F, /* @__PURE__ */ y.createElement($w, {
        match: x,
        routeContext: {
          outlet: F,
          matches: oe,
          isDataRoute: p != null
        },
        children: P
      });
    };
    return p && (x.route.ErrorBoundary || x.route.errorElement || T === 0) ? /* @__PURE__ */ y.createElement(Bw, {
      location: p.location,
      revalidation: p.revalidation,
      component: fe,
      error: k,
      children: W(),
      routeContext: {
        outlet: null,
        matches: oe,
        isDataRoute: !0
      }
    }) : W();
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
  return f || Tt(!1, Yh(o)), f;
}
function qw(o) {
  let f = y.useContext(Bh);
  return f || Tt(!1, Yh(o)), f;
}
function Gw(o) {
  let f = y.useContext($a);
  return f || Tt(!1, Yh(o)), f;
}
function qh(o) {
  let f = Gw(o), p = f.matches[f.matches.length - 1];
  return p.route.id || Tt(!1, o + ' can only be used on routes that contain a unique "id"'), p.route.id;
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
  ro() || Tt(
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
  Tt(!1, "A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.");
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
  ro() && Tt(!1, "You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");
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
    state: k = null,
    key: te = "default"
  } = g, fe = y.useMemo(() => {
    let le = ci(F, R);
    return le == null ? null : {
      location: {
        pathname: le,
        search: x,
        hash: T,
        state: k,
        key: te
      },
      navigationType: b
    };
  }, [R, F, x, T, k, te, b]);
  return Ha(fe != null, '<Router basename="' + R + '"> is not able to match the URL ' + ('"' + F + x + T + '" because it does not start with the ') + "basename, so the <Router> won't render anything."), fe == null ? null : /* @__PURE__ */ y.createElement(Na.Provider, {
    value: j
  }, /* @__PURE__ */ y.createElement(au.Provider, {
    children: p,
    value: fe
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
    g.type !== lr && Tt(!1, "[" + (typeof g.type == "string" ? g.type : g.type.name) + "] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>"), !g.props.index || !g.props.children || Tt(!1, "An index route cannot have child routes.");
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
    basename: k
  } = y.useContext(Na), te, fe = !1;
  if (typeof j == "string" && b_.test(j) && (te = j, g_))
    try {
      let P = new URL(window.location.href), Y = j.startsWith("//") ? new URL(P.protocol + j) : new URL(j), Z = ci(Y.pathname, k);
      Y.origin === P.origin && Z != null ? j = Z + Y.search + Y.hash : fe = !0;
    } catch {
      Ha(!1, '<Link to="' + j + '"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.');
    }
  let le = Lw(j, {
    relative: b
  }), oe = E_(j, {
    replace: d,
    state: w,
    target: R,
    preventScrollReset: F,
    relative: b,
    viewTransition: x
  });
  function W(P) {
    g && g(P), P.defaultPrevented || oe(P);
  }
  return (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    /* @__PURE__ */ y.createElement("a", no({}, T, {
      href: te || le,
      onClick: fe || S ? g : W,
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
  }), k = Ji(), te = y.useContext(Bh), {
    navigator: fe,
    basename: le
  } = y.useContext(Na), oe = te != null && // Conditional usage is OK here because the usage of a data router is static
  // eslint-disable-next-line react-hooks/rules-of-hooks
  T_(T) && j === !0, W = fe.encodeLocation ? fe.encodeLocation(T).pathname : T.pathname, P = k.pathname, Y = te && te.navigation && te.navigation.location ? te.navigation.location.pathname : null;
  b || (P = P.toLowerCase(), Y = Y ? Y.toLowerCase() : null, W = W.toLowerCase()), Y && le && (Y = ci(Y, le) || Y);
  const Z = W !== "/" && W.endsWith("/") ? W.length - 1 : W.length;
  let z = P === W || !d && P.startsWith(W) && P.charAt(Z) === "/", U = Y != null && (Y === W || !d && Y.startsWith(W) && Y.charAt(W.length) === "/"), re = {
    isActive: z,
    isPending: U,
    isTransitioning: oe
  }, Q = z ? g : void 0, M;
  typeof S == "function" ? M = S(re) : M = [S, z ? "active" : null, U ? "pending" : null, oe ? "transitioning" : null].filter(Boolean).join(" ");
  let ee = typeof w == "function" ? w(re) : w;
  return /* @__PURE__ */ y.createElement(Xi, no({}, x, {
    "aria-current": Q,
    className: M,
    ref: p,
    style: ee,
    to: R,
    viewTransition: j
  }), typeof F == "function" ? F(re) : F);
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
  } = o, k = Gh(o, f_), te = C_(), fe = j_(R, {
    relative: F
  }), le = w.toLowerCase() === "get" ? "get" : "post", oe = (W) => {
    if (j && j(W), W.defaultPrevented) return;
    W.preventDefault();
    let P = W.nativeEvent.submitter, Y = (P == null ? void 0 : P.getAttribute("formmethod")) || w;
    te(P || W.currentTarget, {
      fetcherKey: p,
      method: Y,
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
    method: le,
    action: fe,
    onSubmit: b ? j : oe
  }, k));
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
  return f || Tt(!1, x_(o)), f;
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
  b || Tt(!1, "useFormAction must be used inside a RouteContext");
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
  p == null && Tt(!1, "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");
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
  const [o, f] = y.useState(null), [p, g] = y.useState(""), [b, S] = y.useState(""), [d, w] = y.useState(!0), [R, j] = y.useState(""), [F, x] = y.useState(""), [T, k] = y.useState(!1), [te, fe] = y.useState(!1);
  y.useEffect(() => {
    const P = typeof window < "u" ? window : void 0, Y = P && P.__FIREBASE__ ? P.__FIREBASE__ : null;
    f({
      apiKey: Y && Y.apiKey || void 0 || "AIzaSyD-zBSQk_OIyIDzRG0wBNlQCloBqu25ijo",
      authDomain: Y && Y.authDomain || void 0 || "fresh-basket-a8933.firebaseapp.com",
      projectId: Y && Y.projectId || void 0 || "fresh-basket-a8933",
      appId: Y && Y.appId || void 0 || "1:163656027399:web:7bbd739740ec13453489a2",
      messagingSenderId: Y && Y.messagingSenderId || void 0 || "163656027399",
      measurementId: Y && Y.measurementId || void 0 || "G-7M8H5YJF18"
    });
  }, []);
  function le(P) {
    const Y = (P == null ? void 0 : P.code) || "", Z = (P == null ? void 0 : P.message) || "";
    return Y.includes("invalid-email") ? "Please enter a valid email address." : Y.includes("user-not-found") ? "No account found with that email." : Y.includes("wrong-password") || Y.includes("invalid-credential") || Z.includes("INVALID_LOGIN_CREDENTIALS") ? "Incorrect email or password." : Y.includes("too-many-requests") ? "Too many attempts. Please wait and try again." : Y.includes("network-request-failed") ? "Network error. Check your connection and try again." : Z || "Something went wrong.";
  }
  async function oe(P) {
    P.preventDefault(), j(""), x(""), k(!0);
    try {
      if (!(o != null && o.apiKey)) throw new Error("Firebase not configured");
      const Y = (await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js")).initializeApp(o), Z = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js"), { getAuth: z, setPersistence: U, browserLocalPersistence: re, browserSessionPersistence: Q, signInWithEmailAndPassword: M } = Z, ee = z();
      await U(ee, d ? re : Q);
      const I = await (await M(ee, p.trim(), b)).user.getIdToken();
      if (!(await fetch("/auth/session", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify({ idToken: I }) })).ok) throw new Error("Session creation failed");
      x("Signed in successfully."), setTimeout(() => window.location.href = "/dashboard", 600);
    } catch (Y) {
      j(le(Y));
    } finally {
      k(!1);
    }
  }
  async function W() {
    j(""), x("");
    try {
      if (!(o != null && o.apiKey)) throw new Error("Firebase not configured");
      const P = (await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js")).initializeApp(o), { getAuth: Y, sendPasswordResetEmail: Z } = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js"), z = Y();
      await Z(z, p.trim()), x("If an account exists for that email, a reset link has been sent.");
    } catch (P) {
      j(le(P));
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
      /* @__PURE__ */ s.jsxDEV("form", { className: "auth-form", onSubmit: oe, children: [
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
            /* @__PURE__ */ s.jsxDEV("button", { type: "button", id: "togglePwd", className: "toggle-password", "aria-label": te ? "Hide password" : "Show password", onClick: () => fe((P) => !P), children: "👁️" }, void 0, !1, {
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
          /* @__PURE__ */ s.jsxDEV("button", { className: "link-button", type: "button", onClick: W, children: "Forgot password?" }, void 0, !1, {
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
  const [o, f] = y.useState(null), [p, g] = y.useState(""), [b, S] = y.useState(""), [d, w] = y.useState(""), [R, j] = y.useState(""), [F, x] = y.useState(""), [T, k] = y.useState(""), [te, fe] = y.useState(""), [le, oe] = y.useState(!1), [W, P] = y.useState(!1), [Y, Z] = y.useState(!1), [z, U] = y.useState(!1);
  y.useEffect(() => {
    const M = typeof window < "u" ? window : void 0, ee = M && M.__FIREBASE__ ? M.__FIREBASE__ : null;
    f({
      apiKey: ee && ee.apiKey || void 0 || "AIzaSyD-zBSQk_OIyIDzRG0wBNlQCloBqu25ijo",
      authDomain: ee && ee.authDomain || void 0 || "fresh-basket-a8933.firebaseapp.com",
      projectId: ee && ee.projectId || void 0 || "fresh-basket-a8933",
      appId: ee && ee.appId || void 0 || "1:163656027399:web:7bbd739740ec13453489a2",
      messagingSenderId: ee && ee.messagingSenderId || void 0 || "163656027399",
      measurementId: ee && ee.measurementId || void 0 || "G-7M8H5YJF18"
    });
  }, []);
  function re(M) {
    const ee = (M == null ? void 0 : M.code) || "";
    return ee.includes("email-already-in-use") ? "An account with this email already exists." : ee.includes("weak-password") ? "Password should be at least 6 characters." : ee.includes("invalid-email") ? "Please enter a valid email address." : ee.includes("network-request-failed") ? "Network error. Check your connection and try again." : (M == null ? void 0 : M.message) || "Something went wrong.";
  }
  async function Q(M) {
    M.preventDefault(), k(""), fe(""), oe(!0);
    try {
      const ee = String(p).trim(), Ne = String(b).trim(), I = Ne.replace(/\D+/g, ""), ve = { fn: !ee, cn: !Ne };
      if (Z(ve.fn), U(ve.cn || I.length < 7), ve.fn || ve.cn) {
        k("Please fill in required fields");
        return;
      }
      if (I.length < 7) {
        k("Please enter a valid mobile number");
        return;
      }
      if (R !== F) throw new Error("Passwords do not match");
      if (!(o != null && o.apiKey)) throw new Error("Firebase not configured");
      const de = (await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js")).initializeApp(o), { getAuth: G, createUserWithEmailAndPassword: K } = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js"), se = G(), Pe = await (await K(se, d.trim(), R)).user.getIdToken();
      if (!(await fetch("/auth/session", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify({ idToken: Pe, profile: { fullName: ee, contactNumber: Ne } }) })).ok) throw new Error("Session creation failed");
      fe("Account created successfully. Redirecting..."), setTimeout(() => window.location.href = "/riders", 700);
    } catch (ee) {
      k(re(ee));
    } finally {
      oe(!1);
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
    /* @__PURE__ */ s.jsxDEV("form", { className: "auth-form", onSubmit: Q, children: [
      /* @__PURE__ */ s.jsxDEV("label", { className: "auth-label", children: [
        "Full name",
        /* @__PURE__ */ s.jsxDEV("input", { className: "auth-input" + (Y && !String(p).trim() ? " input-error" : ""), value: p, onChange: (M) => {
          g(M.target.value), Y && Z(!String(M.target.value).trim());
        }, onBlur: () => Z(!String(p).trim()), required: !0 }, void 0, !1, {
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
        /* @__PURE__ */ s.jsxDEV("input", { className: "auth-input" + (z ? " input-error" : ""), type: "tel", inputMode: "tel", pattern: "[0-9+()\\-\\s]{7,}", value: b, onChange: (M) => {
          if (S(M.target.value), z) {
            const ee = String(M.target.value).trim().replace(/\D+/g, "");
            U(!(ee.length >= 7));
          }
        }, onBlur: () => {
          const M = String(b).trim().replace(/\D+/g, "");
          U(!(M.length >= 7));
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
        /* @__PURE__ */ s.jsxDEV("input", { className: "auth-input", type: "email", value: d, onChange: (M) => w(M.target.value), required: !0 }, void 0, !1, {
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
          /* @__PURE__ */ s.jsxDEV("input", { className: "auth-input", type: W ? "text" : "password", value: R, onChange: (M) => j(M.target.value), minLength: 6, required: !0 }, void 0, !1, {
            fileName: "/app/code/client/pages/Register.jsx",
            lineNumber: 82,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ s.jsxDEV("button", { type: "button", className: "toggle-password", "aria-label": W ? "Hide password" : "Show password", onClick: () => P((M) => !M), children: "👁️" }, void 0, !1, {
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
        /* @__PURE__ */ s.jsxDEV("input", { className: "auth-input", type: "password", value: F, onChange: (M) => x(M.target.value), minLength: 6, required: !0 }, void 0, !1, {
          fileName: "/app/code/client/pages/Register.jsx",
          lineNumber: 87,
          columnNumber: 11
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Register.jsx",
        lineNumber: 86,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ s.jsxDEV("button", { className: "auth-button", disabled: le, type: "submit", children: le ? "Creating account…" : "Create account" }, void 0, !1, {
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
    function d(x, T, k) {
      x && (x.classList.toggle("hidden", !k), x.setAttribute("aria-hidden", k ? "false" : "true"), T && T.setAttribute("aria-expanded", k ? "true" : "false"));
    }
    function w() {
      d(g, p, !1), d(S, b, !1);
    }
    function R(x) {
      const T = (k) => k && (k === x.target || k.contains(x.target));
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
  const [p, g] = y.useState(""), [b, S] = y.useState(""), [d, w] = y.useState(""), [R, j] = y.useState(!1), [F, x] = y.useState(""), [T, k] = y.useState(""), [te, fe] = y.useState(!1), [le, oe] = y.useState(!1), [W, P] = y.useState(!1), [Y, Z] = y.useState(!1), z = "+92";
  function U(Q) {
    const M = String(Q || "").replace(/\D+/g, "");
    return M.length === 0 ? "" : M.startsWith("92") ? z + M.slice(2) : z + M;
  }
  U(d);
  async function re() {
    x(""), k(""), Z(!0);
    const Q = String(p), M = String(b).trim(), ee = String(d).trim(), Ne = ee.replace(/\D+/g, ""), I = { fn: !M, cn: !ee, pw: !Q };
    if (fe(I.fn), oe(I.cn || Ne.length < 7), P(I.pw), I.fn || I.cn || I.pw) {
      x("Full name, mobile and password are required");
      return;
    }
    if (Ne.length !== 10) {
      x("numbers should be 10 digit"), oe(!0);
      return;
    }
    if (Q.length < 6) {
      P(!0), x("Password must be at least 6 characters");
      return;
    }
    j(!0);
    try {
      const ve = U(ee), de = await fetch("/api/mobile/register", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: Q, fullName: M, contactNumber: ve })
      }), G = await de.json().catch(() => null);
      if (!de.ok) {
        const K = String(G && (G.error || G.message) || ""), se = K.toUpperCase();
        /MISSING\s*FULLNAME\/CONTACTNUMBER/i.test(K) || /MISSING\s*PASSWORD/i.test(K) ? (x("Full name, mobile and password are required"), fe(!M), oe(!ee || Ne.length !== 10), P(!Q)) : se.includes("WEAK_PASSWORD") || /AT LEAST 6 CHARACTERS/i.test(K) ? (P(!0), x("Password must be at least 6 characters")) : /INVALID CONTACT NUMBER|MUST BE EXACTLY 10 DIGITS|NUMBERS SHOULD BE 10 DIGIT/i.test(K) ? (oe(!0), x("numbers should be 10 digit")) : /FIREBASE NOT CONFIGURED/i.test(K) ? x("Service temporarily unavailable. Please try again later.") : x(K || "Failed to create rider");
        return;
      }
      k("Rider created successfully"), f && f(), setTimeout(() => {
        o && o();
      }, 600);
    } catch (ve) {
      const de = String((ve == null ? void 0 : ve.message) || "");
      /Missing\s*(fullName\/contactNumber|password)/i.test(de) ? x("Full name, mobile and password are required") : /WEAK_PASSWORD/i.test(de) || /AT LEAST 6 CHARACTERS/i.test(de) ? (P(!0), x("Password must be at least 6 characters")) : /INVALID CONTACT NUMBER|MUST BE EXACTLY 10 DIGITS|NUMBERS SHOULD BE 10 DIGIT/i.test(de) ? (oe(!0), x("numbers should be 10 digit")) : x(de || "Failed to create rider");
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
        /* @__PURE__ */ s.jsxDEV("input", { className: "field-input" + (Y && !String(b).trim() ? " input-error" : ""), value: b, onChange: (Q) => {
          S(Q.target.value), Y && fe(!String(Q.target.value).trim());
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
        /* @__PURE__ */ s.jsxDEV("input", { className: "field-input" + (Y && !String(p) ? " input-error" : ""), type: "password", value: p, onChange: (Q) => {
          g(Q.target.value), Y && P(!String(Q.target.value));
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
              className: "field-input phone-input-field" + (Y && String(d).trim().replace(/\D+/g, "").length !== 10 ? " input-error" : ""),
              type: "tel",
              inputMode: "tel",
              pattern: "[0-9]{10}",
              placeholder: "3001234567",
              value: d,
              onChange: (Q) => {
                const M = Q.target.value.replace(/\D+/g, "").slice(0, 10);
                w(M), Y && oe(M.length !== 10);
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
        /* @__PURE__ */ s.jsxDEV("button", { className: "btn-primary", onClick: re, disabled: R, children: R ? "Creating…" : "Create" }, void 0, !1, {
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
    const Z = String((o == null ? void 0 : o.contactNumber) || "").trim().replace(/\D+/g, "");
    return Z.length >= 10 ? Z.slice(-10) : Z;
  }, [o]), [S, d] = y.useState(g), [w, R] = y.useState(b), [j, F] = y.useState(!1), [x, T] = y.useState(""), [k, te] = y.useState(""), [fe, le] = y.useState(!1), oe = "+92";
  function W(Y) {
    const Z = String(Y || "").replace(/\D+/g, "");
    return Z.length === 0 ? "" : Z.startsWith("92") ? oe + Z.slice(2) : oe + Z;
  }
  Nx.useEffect(() => {
    let Y = !0;
    return (async () => {
      try {
        const Z = await fetch(`/api/riders/${encodeURIComponent(o.id)}`, { credentials: "include" });
        if (Z.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        const z = await Z.json().catch(() => null), U = z && (z.data || z) || {}, re = U.rider || U || {};
        if (!Y) return;
        const Q = String(re.displayName || re.name || "").trim(), M = String(re.contactNumber || "").replace(/\D+/g, "");
        Q && d(Q), M && R(M.slice(-10));
      } catch {
      }
    })(), () => {
      Y = !1;
    };
  }, [o == null ? void 0 : o.id]);
  async function P() {
    le(!0), T(""), te("");
    const Y = String(S).trim(), z = String(w).trim().replace(/\D+/g, "");
    if (!Y && z.length === 0) {
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
      Y && (U.displayName = Y), z && (U.contactNumber = W(z));
      const re = await fetch(`/api/riders/${encodeURIComponent(o.id)}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(U)
      }), Q = await re.json().catch(() => ({}));
      if (re.status === 401) {
        window.location.href = "/auth/login";
        return;
      }
      if (!re.ok) {
        T(String(Q && (Q.error || Q.message) || "Failed to update rider"));
        return;
      }
      te("Saved"), p && p(Q.data && Q.data.rider ? Q.data.rider : null), setTimeout(() => {
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
      k && /* @__PURE__ */ s.jsxDEV("div", { className: "auth-success", children: k }, void 0, !1, {
        fileName: "/app/code/client/components/EditRiderModal.jsx",
        lineNumber: 81,
        columnNumber: 18
      }, this),
      /* @__PURE__ */ s.jsxDEV("label", { className: "field-label", children: [
        "Full name",
        /* @__PURE__ */ s.jsxDEV("input", { className: "field-input", value: S, onChange: (Y) => d(Y.target.value) }, void 0, !1, {
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
              className: "field-input phone-input-field" + (fe && (w && w.replace(/\D+/g, "").length !== 10 ? " input-error" : "")),
              type: "tel",
              inputMode: "tel",
              pattern: "[0-9]{10}",
              placeholder: "3001234567",
              value: w,
              onChange: (Y) => {
                const Z = Y.target.value.replace(/\D+/g, "").slice(0, 10);
                R(Z);
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
    const G = /* @__PURE__ */ new Date(), K = new Date(G.getFullYear(), G.getMonth(), 1), se = `${K.getFullYear()}-${String(K.getMonth() + 1).padStart(2, "0")}-${String(K.getDate()).padStart(2, "0")}`, je = `${G.getFullYear()}-${String(G.getMonth() + 1).padStart(2, "0")}-${String(G.getDate()).padStart(2, "0")}`;
    return { from: se, to: je };
  }, f = y.useMemo(() => o(), []), [p, g] = y.useState([]), [b, S] = y.useState(""), [d, w] = y.useState(!0), [R, j] = y.useState(""), [F, x] = y.useState(1), [T, k] = y.useState(20), [te, fe] = y.useState({ total: 0, page: 1, limit: 20, pages: 1 }), [le, oe] = y.useState(!1), [W, P] = y.useState(null), [Y, Z] = y.useState(Xn), [z, U] = y.useState(f.from), [re, Q] = y.useState(f.to), [M, ee] = y.useState(/* @__PURE__ */ new Map());
  y.useEffect(() => {
    function G() {
      Z(Wh());
    }
    G();
    function K(se) {
      se.key === Nd && G();
    }
    return typeof window < "u" && (window.addEventListener("storage", K), window.addEventListener("fare-settings-changed", G)), () => {
      typeof window < "u" && (window.removeEventListener("storage", K), window.removeEventListener("fare-settings-changed", G));
    };
  }, []), y.useEffect(() => {
    let G = !0;
    return (async () => {
      var K, se, je, Pe;
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
        const Ie = await Ve.json();
        G && (g(Array.isArray(Ie.riders) ? Ie.riders : []), fe({ total: ((K = Ie.meta) == null ? void 0 : K.total) || 0, page: ((se = Ie.meta) == null ? void 0 : se.page) || 1, limit: ((je = Ie.meta) == null ? void 0 : je.limit) || T, pages: ((Pe = Ie.meta) == null ? void 0 : Pe.pages) || 1 }));
      } catch (et) {
        G && j(et.message || "Failed to load riders");
      } finally {
        G && w(!1);
      }
    })(), () => {
      G = !1;
    };
  }, [b, F, T]), y.useEffect(() => {
    if (!z || !re || !p.length) {
      ee(/* @__PURE__ */ new Map());
      return;
    }
    const G = new AbortController(), K = G.signal;
    let se = !1;
    const je = (() => {
      const Ve = typeof navigator < "u" && Number.isFinite(Number(navigator.hardwareConcurrency)) ? Number(navigator.hardwareConcurrency) : 8;
      return Math.max(2, Math.min(8, Math.floor(Ve / 2)));
    })();
    ee(/* @__PURE__ */ new Map());
    const Pe = p.map((Ve) => async () => {
      const Ie = `${Ve.id}:${z}:${re}`;
      try {
        const st = await fetch(`/api/riders/${Ve.id}/km-in-range?fromDate=${z}&toDate=${re}`, { credentials: "include", signal: K });
        if (st.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!st.ok) {
          const Ht = await st.text().catch(() => String(st.status));
          console.error(`km-in-range error for ${Ve.id}:`, st.status, Ht);
          return;
        }
        const fn = await st.json();
        if (se || K.aborted) return;
        ee((Ht) => {
          const Mt = new Map(Ht);
          return Mt.set(Ie, {
            km: fn.totalKm || 0,
            rideCount: fn.rideCount || 0,
            performancePct: fn.performancePct || 0
          }), Mt;
        });
      } catch (st) {
        if (st && st.name === "AbortError") return;
        console.error(`km-in-range fetch error for ${Ve.id}:`, st);
      }
    });
    async function et(Ve, Ie) {
      let st = 0;
      const fn = new Array(Math.min(Ie, Ve.length)).fill(0).map(async () => {
        for (; !se && !K.aborted; ) {
          const Ht = st++;
          if (Ht >= Ve.length) break;
          await Ve[Ht]();
        }
      });
      await Promise.all(fn);
    }
    return et(Pe, je), () => {
      se = !0, G.abort();
    };
  }, [z, re, p]);
  const Ne = y.useMemo(() => p.filter((G) => {
    if (b && !String(G.name || "").toLowerCase().includes(b.toLowerCase().trim())) return !1;
    if (z || re) {
      const K = Number(G.lastActiveDays ?? 0), se = z ? new Date(z) : null, je = re ? new Date(re) : null;
      if (se && je) {
        const Pe = Math.floor((Date.now() - se.getTime()) / 864e5), et = Math.floor((Date.now() - je.getTime()) / (1e3 * 60 * 60 * 24));
        if (K < et || K > Pe) return !1;
      } else if (se) {
        const Pe = Math.floor((Date.now() - se.getTime()) / 864e5);
        if (K > Pe) return !1;
      } else if (je) {
        const Pe = Math.floor((Date.now() - je.getTime()) / 864e5);
        if (K < Pe) return !1;
      }
    }
    return !0;
  }), [p, b, z, re]), I = y.useMemo(() => {
    const G = Number(Y.farePerKm);
    return Number.isFinite(G) ? G : Xn.farePerKm;
  }, [Y]), ve = y.useMemo(() => {
    const G = Number(Y.baseFare);
    return Number.isFinite(G) ? G : Xn.baseFare;
  }, [Y]);
  y.useEffect(() => {
    if (!Array.isArray(p) || p.length === 0) return;
    const G = {};
    for (const K of p) {
      if (!K || K.id === void 0 || K.id === null) continue;
      const se = Number(K.performancePct);
      Number.isFinite(se) && (G[K.id] = Math.round(se));
    }
    Object.keys(G).length !== 0 && L_(G);
  }, [p]);
  const de = y.useMemo(() => {
    const G = /* @__PURE__ */ new Date(), K = [], se = [];
    for (let je = 2; je >= 0; je--) {
      const Pe = new Date(G.getFullYear(), G.getMonth() - je, 1), et = `${Pe.getFullYear()}-${String(Pe.getMonth() + 1).padStart(2, "0")}`, Ve = Pe.toLocaleString(void 0, { month: "short", year: "numeric" });
      K.push(et), se.push(Ve);
    }
    return { keys: K, labels: se };
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
      /* @__PURE__ */ s.jsxDEV("div", { className: "riders-header-right", children: /* @__PURE__ */ s.jsxDEV("button", { className: "btn-secondary btn-create-rider", onClick: () => oe(!0), children: "Create Rider" }, void 0, !1, {
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
        /* @__PURE__ */ s.jsxDEV("input", { className: "rc-search-input", type: "search", placeholder: "Search", value: b, onChange: (G) => {
          S(G.target.value), x(1);
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
        /* @__PURE__ */ s.jsxDEV("input", { type: "date", className: "date-range-input", value: z, onChange: (G) => {
          U(G.target.value), x(1);
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
        /* @__PURE__ */ s.jsxDEV("input", { type: "date", className: "date-range-input", value: re, onChange: (G) => {
          Q(G.target.value), x(1);
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
      le && /* @__PURE__ */ s.jsxDEV(M_, { onClose: () => oe(!1), onCreated: () => {
        window.location.reload();
      } }, void 0, !1, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 289,
        columnNumber: 13
      }, this),
      W && /* @__PURE__ */ s.jsxDEV(
        V_,
        {
          rider: W,
          onClose: () => P(null),
          onUpdated: (G) => {
            if (!G) {
              P(null);
              return;
            }
            g((K) => K.map((se) => String(se.id) === String(G.id) ? { ...se, name: G.displayName || G.name || se.name, contactNumber: G.contactNumber ?? se.contactNumber } : se)), P(null);
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
            const G = de.keys[de.keys.length - 2], K = String(G).split("-"), se = parseInt(K[0], 10), je = parseInt(K[1], 10);
            return `Earnings (${new Date(Number.isFinite(se) ? se : (/* @__PURE__ */ new Date()).getFullYear(), Number.isFinite(je) ? je - 1 : (/* @__PURE__ */ new Date()).getMonth() - 1, 1).toLocaleString(void 0, { month: "short" })}, Rs)`;
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
          !d && !R && Ne.map((G) => /* @__PURE__ */ s.jsxDEV("tr", { "data-rider-id": G.id, "data-status": G.status, "data-last-days": G.lastActiveDays, children: [
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-name", children: /* @__PURE__ */ s.jsxDEV("a", { className: "rider-name-link", href: `/riders/${G.id}`, children: G.name }, void 0, !1, {
              fileName: "/app/code/client/pages/Riders.jsx",
              lineNumber: 322,
              columnNumber: 47
            }, this) }, void 0, !1, {
              fileName: "/app/code/client/pages/Riders.jsx",
              lineNumber: 322,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-month", children: (() => {
              var K;
              if (z && re) {
                const se = `${G.id}:${z}:${re}`, je = M.get(se);
                if (!je) return /* @__PURE__ */ s.jsxDEV("span", { className: "cell-loader loader-sm", "aria-busy": "true", "aria-label": "Loading range" }, void 0, !1, {
                  fileName: "/app/code/client/pages/Riders.jsx",
                  lineNumber: 327,
                  columnNumber: 42
                }, this);
                const Pe = (je == null ? void 0 : je.km) ?? 0;
                return `${Number(Pe).toFixed(2)} km`;
              }
              return `${Number(((K = G.monthlyCounts) == null ? void 0 : K[de.keys[de.keys.length - 1]]) || 0).toFixed(2)} km`;
            })() }, void 0, !1, {
              fileName: "/app/code/client/pages/Riders.jsx",
              lineNumber: 323,
              columnNumber: 19
            }, this),
            (() => {
              var Pe, et;
              if (z && re) {
                const Ve = `${G.id}:${z}:${re}`;
                if (!M.get(Ve)) return /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-earnings", children: /* @__PURE__ */ s.jsxDEV("span", { className: "cell-loader loader-md", "aria-busy": "true", "aria-label": "Loading earnings" }, void 0, !1, {
                  fileName: "/app/code/client/pages/Riders.jsx",
                  lineNumber: 337,
                  columnNumber: 74
                }, this) }, void 0, !1, {
                  fileName: "/app/code/client/pages/Riders.jsx",
                  lineNumber: 337,
                  columnNumber: 42
                }, this);
              }
              let K = 0, se = 0;
              if (z && re) {
                const Ve = `${G.id}:${z}:${re}`, Ie = M.get(Ve);
                K = (Ie == null ? void 0 : Ie.km) ?? 0, se = (Ie == null ? void 0 : Ie.rideCount) ?? 0;
              } else {
                const Ve = de.keys[de.keys.length - 2];
                K = Number(((Pe = G.monthlyCounts) == null ? void 0 : Pe[Ve]) || 0);
                const Ie = Array.isArray(G.orders) ? G.orders : [];
                se = Number(((et = G.monthlyRideCounts) == null ? void 0 : et[Ve]) ?? P_(Ie, Ve) ?? 0);
              }
              const je = K * I + se * ve;
              return /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-earnings", children: Number.isFinite(je) ? `${je.toFixed(2)} Rs.` : "0 Rs." }, void 0, !1, {
                fileName: "/app/code/client/pages/Riders.jsx",
                lineNumber: 356,
                columnNumber: 29
              }, this);
            })(),
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-performance", children: (() => {
              if (z && re) {
                const K = `${G.id}:${z}:${re}`, se = M.get(K);
                if (!se) return /* @__PURE__ */ s.jsxDEV("span", { className: "cell-loader loader-sm", "aria-busy": "true", "aria-label": "Loading performance" }, void 0, !1, {
                  fileName: "/app/code/client/pages/Riders.jsx",
                  lineNumber: 362,
                  columnNumber: 42
                }, this);
                const je = (se == null ? void 0 : se.performancePct) ?? 0;
                return `${Number(je)}%`;
              }
              return Number.isFinite(Number(G.performancePct)) ? `${Math.round(Number(G.performancePct))}%` : "0%";
            })() }, void 0, !1, {
              fileName: "/app/code/client/pages/Riders.jsx",
              lineNumber: 358,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-total", children: typeof G.totalDistance == "string" && G.totalDistance.trim() ? G.totalDistance : `${Number(G.totalKm || 0).toFixed(2)} km` }, void 0, !1, {
              fileName: "/app/code/client/pages/Riders.jsx",
              lineNumber: 368,
              columnNumber: 19
            }, this),
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-actions", children: /* @__PURE__ */ s.jsxDEV("div", { className: "actions-container", children: [
              /* @__PURE__ */ s.jsxDEV("button", { className: "rc-select rc-chip btn-edit-rider", "aria-label": "Edit rider", title: "Edit rider", onClick: () => P(G), children: /* @__PURE__ */ s.jsxDEV("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ s.jsxDEV("path", { d: "M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zm2.92 2.33H5v-.92l9.06-9.06.92.92L5.92 19.58zM20.71 7.04a1.003 1.003 0 0 0 0-1.42l-2.34-2.34a1.003 1.003 0 0 0-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.82z" }, void 0, !1, {
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
                    const se = await fetch(`/api/riders/${encodeURIComponent(G.id)}`, { method: "DELETE", credentials: "include" });
                    if (se.status === 401) {
                      window.location.href = "/auth/login";
                      return;
                    }
                    if (!se.ok) {
                      const je = await se.text().catch(() => "");
                      alert(je || "Failed to delete");
                      return;
                    }
                    g((je) => je.filter((Pe) => String(Pe.id) !== String(G.id))), fe((je) => ({ ...je, total: Math.max(0, (je.total || 1) - 1) }));
                  } catch (se) {
                    alert(String((se == null ? void 0 : se.message) || "Failed to delete"));
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
          ] }, G.id, !0, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 321,
            columnNumber: 17
          }, this)),
          !d && !R && Ne.length === 0 && /* @__PURE__ */ s.jsxDEV("tr", { children: /* @__PURE__ */ s.jsxDEV("td", { colSpan: 7, className: "section-note", children: "No riders found." }, void 0, !1, {
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
      /* @__PURE__ */ s.jsxDEV("button", { className: "rc-select rc-chip", disabled: te.page <= 1 || d, onClick: () => x((G) => Math.max(1, G - 1)), children: "Prev" }, void 0, !1, {
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
      /* @__PURE__ */ s.jsxDEV("button", { className: "rc-select rc-chip", disabled: te.page >= te.pages || d, onClick: () => x((G) => Math.min(te.pages, G + 1)), children: "Next" }, void 0, !1, {
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
      const k = typeof T.type == "string" ? T.type.toLowerCase().trim() : "";
      if (!(k !== "eta" && k !== "expected")) {
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
        const k = await fetch(`/api/riders/${o}`, { credentials: "include" });
        if (k.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!k.ok) throw new Error("Failed to load rider");
        const te = await k.json();
        T && p(te);
      } catch (k) {
        T && d(k.message || "Failed to load rider");
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
        (f.riderOrders || []).map((T, k) => {
          const te = T.name || T.orderId, fe = ui(T.created_at), le = fe instanceof Date && !Number.isNaN(fe.getTime()) ? fe.toISOString().slice(0, 10) : "-", oe = Fx(T.deliveryStartTime), W = Px(T), P = zx(W), Y = Ux(T), Z = Hx(Y), z = Number(T.distance_km), U = Number.isFinite(z) ? `${z.toFixed(2)} km` : typeof T.distance_km == "string" && T.distance_km.trim() ? T.distance_km : "-";
          return /* @__PURE__ */ s.jsxDEV("tr", { children: [
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-name order-cell", children: te }, void 0, !1, {
              fileName: "/app/code/client/pages/RiderProfile.jsx",
              lineNumber: 95,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-km date-cell", children: le }, void 0, !1, {
              fileName: "/app/code/client/pages/RiderProfile.jsx",
              lineNumber: 96,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-start-time start-cell", children: oe }, void 0, !1, {
              fileName: "/app/code/client/pages/RiderProfile.jsx",
              lineNumber: 97,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-expected expected-cell", children: P }, void 0, !1, {
              fileName: "/app/code/client/pages/RiderProfile.jsx",
              lineNumber: 98,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-actual actual-time-cell", children: Z }, void 0, !1, {
              fileName: "/app/code/client/pages/RiderProfile.jsx",
              lineNumber: 99,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-commission distance-cell", children: U }, void 0, !1, {
              fileName: "/app/code/client/pages/RiderProfile.jsx",
              lineNumber: 100,
              columnNumber: 21
            }, this)
          ] }, T.orderId || k, !0, {
            fileName: "/app/code/client/pages/RiderProfile.jsx",
            lineNumber: 94,
            columnNumber: 19
          }, this);
        }),
        !((x = f.riderOrders) != null && x.length) && (j || []).map((T, k) => /* @__PURE__ */ s.jsxDEV("tr", { children: [
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
        ] }, `h-${k}`, !0, {
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
  const [g, b] = y.useState([]), [S, d] = y.useState([]), [w, R] = y.useState(""), [j, F] = y.useState(""), [x, T] = y.useState(""), [k, te] = y.useState(""), [fe, le] = y.useState(!0), [oe, W] = y.useState(!0), [P, Y] = y.useState(""), [Z, z] = y.useState(""), [U, re] = y.useState(!1);
  y.useEffect(() => {
    let I = !0;
    return (async () => {
      le(!0), Y("");
      try {
        const ve = await fetch("/api/riders?limit=200", { credentials: "include" });
        if (ve.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!ve.ok) throw new Error("Failed to load riders");
        const de = await ve.json();
        I && b(Array.isArray(de.riders) ? de.riders : []);
      } catch (ve) {
        I && Y(ve.message || "Failed to load riders");
      } finally {
        I && le(!1);
      }
    })(), () => {
      I = !1;
    };
  }, []), y.useEffect(() => {
    let I = !0;
    return (async () => {
      W(!0), z("");
      try {
        const ve = await fetch("/api/packers?limit=200", { credentials: "include" });
        if (ve.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!ve.ok) throw new Error("Failed to load packers");
        const de = await ve.json();
        I && d(Array.isArray(de.packers) ? de.packers : []);
      } catch (ve) {
        I && z(ve.message || "Failed to load packers");
      } finally {
        I && W(!1);
      }
    })(), () => {
      I = !1;
    };
  }, []);
  async function Q() {
    if (!w || !j) {
      alert("Please select both a rider and a packer");
      return;
    }
    if (!x.trim()) {
      alert("Please enter a payment method");
      return;
    }
    if (!k.trim()) {
      alert("Please enter an amount");
      return;
    }
    re(!0);
    try {
      const I = await fetch(`/api/orders/${encodeURIComponent(o)}/assign`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ riderId: w, paymentMethod: x.trim(), amount: k.trim() })
      });
      if (I.status === 401) {
        window.location.href = "/auth/login";
        return;
      }
      const ve = await I.json().catch(() => null);
      if (!I.ok) throw new Error(ve && ve.error ? ve.error : "Assign failed");
      const de = await fetch(`/api/orders/${encodeURIComponent(o)}/assign-packer`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packerId: j, paymentMethod: x.trim(), amount: k.trim() })
      });
      if (de.status === 401) {
        window.location.href = "/auth/login";
        return;
      }
      const G = await de.json().catch(() => null);
      if (!de.ok) throw new Error(G && G.error ? G.error : "Assign failed");
      p && p({ orderId: o, riderId: w, packerId: j, paymentMethod: x.trim(), amount: k.trim() });
      try {
        window && typeof window.showToast == "function" && window.showToast("Order assigned successfully", { type: "success" });
      } catch {
      }
      f();
    } catch (I) {
      alert(I.message || "Failed to assign");
    } finally {
      re(!1);
    }
  }
  const M = P || "", ee = Z || "", Ne = fe || oe;
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
    /* @__PURE__ */ s.jsxDEV("div", { className: "assign-modal-body", children: Ne ? /* @__PURE__ */ s.jsxDEV("div", { className: "section-note", children: "Loading…" }, void 0, !1, {
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
                onChange: (I) => R(I.target.value),
                disabled: U,
                children: [
                  /* @__PURE__ */ s.jsxDEV("option", { value: "", children: "-- Choose a rider --" }, void 0, !1, {
                    fileName: "/app/code/client/components/AssignModal.jsx",
                    lineNumber: 118,
                    columnNumber: 23
                  }, this),
                  [...g].sort((I, ve) => I.name.localeCompare(ve.name)).map((I) => /* @__PURE__ */ s.jsxDEV("option", { value: I.id, children: I.name }, I.id, !1, {
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
          M && /* @__PURE__ */ s.jsxDEV("div", { className: "auth-error", children: M }, void 0, !1, {
            fileName: "/app/code/client/components/AssignModal.jsx",
            lineNumber: 124,
            columnNumber: 34
          }, this),
          g.length === 0 && !M && /* @__PURE__ */ s.jsxDEV("div", { className: "section-note", children: "No riders available" }, void 0, !1, {
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
                onChange: (I) => F(I.target.value),
                disabled: U,
                children: [
                  /* @__PURE__ */ s.jsxDEV("option", { value: "", children: "-- Choose a packer --" }, void 0, !1, {
                    fileName: "/app/code/client/components/AssignModal.jsx",
                    lineNumber: 136,
                    columnNumber: 23
                  }, this),
                  [...S].sort((I, ve) => I.name.localeCompare(ve.name)).map((I) => /* @__PURE__ */ s.jsxDEV("option", { value: I.id, children: I.name }, I.id, !1, {
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
          ee && /* @__PURE__ */ s.jsxDEV("div", { className: "auth-error", children: ee }, void 0, !1, {
            fileName: "/app/code/client/components/AssignModal.jsx",
            lineNumber: 142,
            columnNumber: 35
          }, this),
          S.length === 0 && !ee && /* @__PURE__ */ s.jsxDEV("div", { className: "section-note", children: "No packers available" }, void 0, !1, {
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
              onChange: (I) => T(I.target.value),
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
              value: k,
              onChange: (I) => te(I.target.value),
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
        /* @__PURE__ */ s.jsxDEV("button", { className: "btn-primary", onClick: Q, disabled: U || !w || !j, children: U ? "Assigning…" : "Assign" }, void 0, !1, {
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
  const [g, b] = y.useState([]), [S, d] = y.useState([]), [w, R] = y.useState(""), [j, F] = y.useState(""), [x, T] = y.useState(""), [k, te] = y.useState(""), [fe, le] = y.useState(!0), [oe, W] = y.useState(""), [P, Y] = y.useState(!1);
  y.useEffect(() => {
    let z = !0;
    return (async () => {
      var U;
      le(!0), W("");
      try {
        const re = await fetch("/api/riders?limit=200", { credentials: "include" });
        if (re.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!re.ok) throw new Error("Failed to load riders");
        const Q = await re.json();
        if (z) {
          b(Array.isArray(Q.riders) ? Q.riders : []);
          const M = ((U = o.assignment) == null ? void 0 : U.riderId) || o.riderId || o.rider_id || "";
          R(String(M));
        }
      } catch (re) {
        z && W(re.message || "Failed to load riders");
      } finally {
        z && le(!1);
      }
    })(), () => {
      z = !1;
    };
  }, [o]), y.useEffect(() => {
    let z = !0;
    return (async () => {
      var U;
      try {
        const re = await fetch("/api/packers?limit=200", { credentials: "include" });
        if (re.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!re.ok) throw new Error("Failed to load packers");
        const Q = await re.json();
        if (z) {
          d(Array.isArray(Q.packers) ? Q.packers : []);
          const M = ((U = o.assignment) == null ? void 0 : U.packerId) || o.packed_by || o.packer_id || "";
          F(String(M));
        }
      } catch (re) {
        z && W(re.message || "Failed to load packers");
      }
    })(), () => {
      z = !1;
    };
  }, [o]), y.useEffect(() => {
    var re, Q;
    const z = ((re = o.assignment) == null ? void 0 : re.paymentMethod) || o.paymentMethod || "", U = ((Q = o.assignment) == null ? void 0 : Q.amount) || o.amount || "";
    T(String(z)), te(String(U));
  }, [o]);
  async function Z() {
    if (!w || !j) {
      alert("Please select both a rider and a packer");
      return;
    }
    if (!x.trim()) {
      alert("Please enter a payment method");
      return;
    }
    if (!k.trim()) {
      alert("Please enter an amount");
      return;
    }
    Y(!0);
    try {
      const z = o.name || o.order_number || o.id, U = await fetch(`/api/orders/${encodeURIComponent(z)}/assign`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ riderId: w, paymentMethod: x.trim(), amount: k.trim() })
      });
      if (U.status === 401) {
        window.location.href = "/auth/login";
        return;
      }
      const re = await U.json().catch(() => null);
      if (!U.ok) throw new Error(re && re.error ? re.error : "Update failed");
      const Q = await fetch(`/api/orders/${encodeURIComponent(z)}/assign-packer`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packerId: j, paymentMethod: x.trim(), amount: k.trim() })
      });
      if (Q.status === 401) {
        window.location.href = "/auth/login";
        return;
      }
      const M = await Q.json().catch(() => null);
      if (!Q.ok) throw new Error(M && M.error ? M.error : "Update failed");
      try {
        window && typeof window.showToast == "function" && window.showToast("Order updated successfully", { type: "success" });
      } catch {
      }
      p && p(), f();
    } catch (z) {
      alert(z.message || "Failed to update order");
    } finally {
      Y(!1);
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
    /* @__PURE__ */ s.jsxDEV("div", { className: "edit-modal-body", children: fe ? /* @__PURE__ */ s.jsxDEV("div", { className: "section-note", children: "Loading…" }, void 0, !1, {
      fileName: "/app/code/client/components/EditOrderModal.jsx",
      lineNumber: 113,
      columnNumber: 13
    }, this) : /* @__PURE__ */ s.jsxDEV(s.Fragment, { children: [
      oe && /* @__PURE__ */ s.jsxDEV("div", { className: "auth-error", children: oe }, void 0, !1, {
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
          g.length === 0 && !oe && /* @__PURE__ */ s.jsxDEV("div", { className: "section-note", children: "No riders available" }, void 0, !1, {
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
          S.length === 0 && !oe && /* @__PURE__ */ s.jsxDEV("div", { className: "section-note", children: "No packers available" }, void 0, !1, {
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
              value: k,
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
        /* @__PURE__ */ s.jsxDEV("button", { className: "btn-primary", onClick: Z, disabled: P || !w || !j, children: P ? "Updating…" : "Update" }, void 0, !1, {
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
  const [o, f] = y.useState([]), [p, g] = y.useState(""), [b, S] = y.useState("all"), [d, w] = y.useState(1), [R, j] = y.useState(20), [F, x] = y.useState({ total: 0, page: 1, limit: 20, pages: 1 }), [T, k] = y.useState(!0), [te, fe] = y.useState(""), [le, oe] = y.useState(""), [W, P] = y.useState(!0), [Y, Z] = y.useState(0), [z, U] = y.useState(!1), [re, Q] = y.useState(null), [M, ee] = y.useState(!1), [Ne, I] = y.useState(null), [ve, de] = y.useState(!1), [G, K] = y.useState(null), [se, je] = y.useState(""), [Pe, et] = y.useState("");
  y.useEffect(() => {
    let J = !0;
    return (async () => {
      var We, ut, vt, ht;
      k(!0), fe(""), oe("");
      try {
        const lt = new URLSearchParams();
        if (p && lt.set("q", p), b && b !== "all") {
          const Ln = vx[b] || b;
          lt.set("status", zh(Ln));
        }
        lt.set("page", String(d)), lt.set("limit", String(R));
        const Ut = await fetch(`/api/orders?${lt.toString()}`, { credentials: "include" });
        if (Ut.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!Ut.ok) throw new Error("Failed to load orders");
        const Ft = await Ut.json();
        J && (f(Array.isArray(Ft.orders) ? Ft.orders : []), oe(Ft.shopifyError || ""), P(!!Ft.shopifyConfigured), x({ total: ((We = Ft.meta) == null ? void 0 : We.total) || 0, page: ((ut = Ft.meta) == null ? void 0 : ut.page) || 1, limit: ((vt = Ft.meta) == null ? void 0 : vt.limit) || R, pages: ((ht = Ft.meta) == null ? void 0 : ht.pages) || 1 }));
      } catch (lt) {
        J && fe(lt.message || "Failed to load orders");
      } finally {
        J && k(!1);
      }
    })(), () => {
      J = !1;
    };
  }, [p, b, d, R, Y]);
  async function Ve() {
    try {
      const J = new URLSearchParams();
      se && J.set("from", se), Pe && J.set("to", Pe), p && J.set("q", p), b && b !== "all" && J.set("status", b);
      const We = await fetch(`/api/orders/export?${J.toString()}`, { credentials: "include" });
      if (We.status === 401) {
        window.location.href = "/auth/login";
        return;
      }
      if (!We.ok) throw new Error("Failed to generate export");
      const ut = await We.blob(), vt = URL.createObjectURL(ut), ht = document.createElement("a");
      ht.href = vt, ht.download = `orders_${se || "all"}_${Pe || "all"}.csv`, document.body.appendChild(ht), ht.click(), ht.remove(), URL.revokeObjectURL(vt);
    } catch (J) {
      try {
        window && typeof window.showToast == "function" && window.showToast(J.message || "Failed to download CSV", { type: "error" });
      } catch {
      }
    }
  }
  y.useMemo(() => o, [o]);
  const Ie = y.useMemo(() => {
    if (!Array.isArray(o)) return [];
    if (b === "all") return o.slice();
    const J = zh(vx[b] || b);
    return o.filter((We) => hx(We) === J);
  }, [o, b]);
  function st() {
    Q(null), U(!1);
  }
  function fn(J) {
    I(J), ee(!0);
  }
  function Ht() {
    I(null), ee(!1);
  }
  function Mt(J) {
    K(J), de(!0);
  }
  function An() {
    K(null), de(!1);
  }
  function qt(J) {
    try {
      const { orderId: We } = J || {};
      if (!We) return;
      const ut = String(We).replace(/^#+/, "");
      w(1);
      try {
        window && typeof window.showToast == "function" && window.showToast(`Order assigned: ${We}`, { type: "success" });
      } catch {
      }
    } catch {
    }
  }
  async function Gt(J) {
    if (J)
      try {
        const We = await fetch(`/api/orders/${encodeURIComponent(J)}/unassign`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" }
        });
        if (We.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!We.ok) throw new Error("Failed to unassign order");
        try {
          window && typeof window.showToast == "function" && window.showToast(`Order unassigned: ${J}`, { type: "success" });
        } catch {
        }
        w(1), Z((ut) => ut + 1);
      } catch (We) {
        try {
          window && typeof window.showToast == "function" && window.showToast(We.message || "Failed to unassign order", { type: "error" });
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
          /* @__PURE__ */ s.jsxDEV("input", { "aria-label": "From date", className: "date-input", type: "date", value: se, onChange: (J) => je(J.target.value) }, void 0, !1, {
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
          /* @__PURE__ */ s.jsxDEV("input", { "aria-label": "To date", className: "date-input", type: "date", value: Pe, onChange: (J) => et(J.target.value) }, void 0, !1, {
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
        /* @__PURE__ */ s.jsxDEV("input", { className: "rc-search-input", type: "search", placeholder: "Search", value: p, onChange: (J) => {
          g(J.target.value), w(1);
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
      /* @__PURE__ */ s.jsxDEV("div", { className: "rc-filters", children: W_.map(({ key: J, label: We }) => /* @__PURE__ */ s.jsxDEV("button", { className: `rc-select rc-chip${b === J ? " active" : ""}`, onClick: () => {
        S(J), w(1);
      }, "data-filter": J, children: We }, J, !1, {
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
    !W && /* @__PURE__ */ s.jsxDEV("div", { className: "section-note", children: "Shopify is not configured. Set SHOPIFY_SHOP and SHOPIFY_ADMIN_TOKEN to enable orders sync." }, void 0, !1, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 202,
      columnNumber: 11
    }, this),
    le && /* @__PURE__ */ s.jsxDEV("div", { className: "auth-error", children: le }, void 0, !1, {
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
        !T && !te && Ie.map((J, We) => {
          var hn, xa, ua;
          const ut = $x(J), vt = hx(J), ht = J.full_name || (J.customer && J.customer.full_name ? J.customer.full_name : "");
          let lt = "-";
          typeof J.shipping_address == "string" && String(J.shipping_address).trim() ? lt = String(J.shipping_address).trim() : J.shipping_address && typeof J.shipping_address == "object" ? lt = [J.shipping_address.address1 || "", J.shipping_address.city || "", J.shipping_address.province || "", J.shipping_address.country || ""].map((ue) => String(ue || "").trim()).filter(Boolean).join(", ") || "-" : typeof J.billing_address == "string" && String(J.billing_address).trim() ? lt = String(J.billing_address).trim() : J.billing_address && typeof J.billing_address == "object" && (lt = [J.billing_address.address1 || "", J.billing_address.city || "", J.billing_address.province || "", J.billing_address.country || ""].map((ue) => String(ue || "").trim()).filter(Boolean).join(", ") || "-");
          const Ut = J.name || J.order_number || J.id, Ft = Ut != null ? String(Ut).replace(/^#+/, "").trim() : "", Ln = Ft || "-", Dn = I_(J), ln = Fx(Dn), Wt = Px(J), mn = zx(Wt), sa = Ux(J), zt = Hx(sa), pn = J.rider ? String(J.rider) : (hn = J.assignment) != null && hn.riderId ? String(J.assignment.riderId) : "Unassigned";
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
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-perf address-cell", children: lt }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 262,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-rider rider-cell", children: pn }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 263,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-packer packer-cell", children: J.packerName || (J.packed_by ? String(J.packed_by) : "-") }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 264,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-start-time start-cell", children: ln }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 265,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-expected expected-cell", children: mn }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 266,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-actual actual-time-cell", children: zt }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 267,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-amount amount-cell", children: J.amount || ((xa = J.assignment) == null ? void 0 : xa.amount) || "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 268,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-payment payment-cell", children: J.paymentMethod || ((ua = J.assignment) == null ? void 0 : ua.paymentMethod) || "-" }, void 0, !1, {
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
                  onClick: () => Gt(Ft),
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
                  onClick: () => vt === "delivered" && Mt(J),
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
                  onClick: () => fn(J),
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
          ] }, Ut || We, !0, {
            fileName: "/app/code/client/pages/Orders.jsx",
            lineNumber: 259,
            columnNumber: 19
          }, this);
        }),
        !T && !te && Ie.length === 0 && /* @__PURE__ */ s.jsxDEV("tr", { children: /* @__PURE__ */ s.jsxDEV("td", { colSpan: 12, className: "section-note", children: "No orders to display." }, void 0, !1, {
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
      z && re && /* @__PURE__ */ s.jsxDEV(Bx, { orderId: re, onClose: st, onAssigned: qt }, void 0, !1, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 315,
        columnNumber: 11
      }, this),
      M && Ne && /* @__PURE__ */ s.jsxDEV(q_, { order: Ne, onClose: Ht, onUpdated: () => {
        Z((J) => J + 1), Ht();
      } }, void 0, !1, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 318,
        columnNumber: 11
      }, this),
      ve && G && /* @__PURE__ */ s.jsxDEV(G_, { order: G, onClose: An }, void 0, !1, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 321,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ s.jsxDEV("div", { className: "rc-filters", children: [
        /* @__PURE__ */ s.jsxDEV("button", { className: "rc-select rc-chip", disabled: F.page <= 1 || T, onClick: () => w((J) => Math.max(1, J - 1)), children: "Prev" }, void 0, !1, {
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
        /* @__PURE__ */ s.jsxDEV("button", { className: "rc-select rc-chip", disabled: F.page >= F.pages || T, onClick: () => w((J) => Math.min(F.pages, J + 1)), children: "Next" }, void 0, !1, {
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
    const M = /* @__PURE__ */ new Date(), ee = M.getFullYear(), Ne = String(M.getMonth() + 1).padStart(2, "0");
    return `${ee}-${Ne}-01`;
  }, f = () => {
    const M = /* @__PURE__ */ new Date(), ee = M.getFullYear(), Ne = String(M.getMonth() + 1).padStart(2, "0"), I = String(M.getDate()).padStart(2, "0");
    return `${ee}-${Ne}-${I}`;
  }, [p, g] = y.useState(o()), [b, S] = y.useState(f()), [d, w] = y.useState([]), [R, j] = y.useState([]), [F, x] = y.useState(!1), [T, k] = y.useState(!0), [te, fe] = y.useState(""), [le, oe] = y.useState([]), [W, P] = y.useState(!1), [Y, Z] = y.useState("");
  y.useEffect(() => {
    (async () => {
      var ee;
      try {
        const Ne = await fetch("/api/riders", { credentials: "include" });
        if (Ne.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!Ne.ok) throw new Error("Failed to load riders");
        const I = await Ne.json(), ve = Array.isArray(I.riders) ? I.riders : Array.isArray((ee = I.data) == null ? void 0 : ee.riders) ? I.data.riders : Array.isArray(I.data) ? I.data : [];
        w(ve), j(ve.map((de) => de.id || de._id || ""));
      } catch (Ne) {
        fe(Ne.message || "Failed to load riders");
      } finally {
        k(!1);
      }
    })();
  }, []);
  const z = () => {
    R.length === d.length ? j([]) : j(d.map((M) => M.id || M._id || ""));
  }, U = (M) => {
    j(
      (ee) => ee.includes(M) ? ee.filter((Ne) => Ne !== M) : [...ee, M]
    );
  }, re = () => {
    x(!0);
  };
  async function Q() {
    Z(""), P(!0);
    try {
      const M = Wh(), ee = Number(M == null ? void 0 : M.baseFare) || Xn.baseFare, Ne = Number(M == null ? void 0 : M.farePerKm) || Xn.farePerKm, I = R.length ? d.filter((de) => R.includes(de.id || de._id || "")) : d, ve = await Promise.all(I.map(async (de, G) => {
        const K = de.id || de._id || "";
        let se = 0, je = 0;
        try {
          const et = new URLSearchParams({ fromDate: p, toDate: b }), Ve = await fetch(`/api/riders/${encodeURIComponent(K)}/km?${et.toString()}`, { credentials: "include" });
          if (Ve.status === 401)
            return window.location.href = "/auth/login", null;
          const Ie = await Ve.json().catch(() => null);
          Ve.ok && Ie && Ie.ok && (se = Number(Ie.totalKm) || 0, je = Number(Ie.rideCount) || 0);
        } catch {
        }
        const Pe = se * Ne + je * ee;
        return {
          serial: G + 1,
          riderName: de.name || de.firstName || "Unknown",
          totalShopifyRides: je,
          extraRides: 0,
          distanceKm: se,
          perKmRate: Ne,
          totalCommission: Pe
        };
      }));
      oe(ve.filter(Boolean));
    } catch (M) {
      Z((M == null ? void 0 : M.message) || "Failed to generate report");
    } finally {
      P(!1), x(!1);
    }
  }
  return /* @__PURE__ */ s.jsxDEV(Mr, { children: /* @__PURE__ */ s.jsxDEV("section", { className: "rider-commissions", children: /* @__PURE__ */ s.jsxDEV("div", { id: "tab-overview", children: [
    /* @__PURE__ */ s.jsxDEV("h3", { className: "rc-section-title", children: "Rider Commission Report" }, void 0, !1, {
      fileName: "/app/code/client/pages/Reports.jsx",
      lineNumber: 117,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ s.jsxDEV("div", { className: "rc-toolbar report-filter-bar", children: /* @__PURE__ */ s.jsxDEV("div", { className: "date-range-filters", children: [
      /* @__PURE__ */ s.jsxDEV("div", { className: "date-filter", children: [
        /* @__PURE__ */ s.jsxDEV("label", { htmlFor: "fromDate", className: "date-label", children: "From Date:" }, void 0, !1, {
          fileName: "/app/code/client/pages/Reports.jsx",
          lineNumber: 122,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ s.jsxDEV(
          "input",
          {
            id: "fromDate",
            type: "date",
            className: "date-input",
            value: p,
            onChange: (M) => g(M.target.value)
          },
          void 0,
          !1,
          {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 123,
            columnNumber: 17
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Reports.jsx",
        lineNumber: 121,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ s.jsxDEV("div", { className: "date-filter", children: [
        /* @__PURE__ */ s.jsxDEV("label", { htmlFor: "toDate", className: "date-label", children: "To Date:" }, void 0, !1, {
          fileName: "/app/code/client/pages/Reports.jsx",
          lineNumber: 133,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ s.jsxDEV(
          "input",
          {
            id: "toDate",
            type: "date",
            className: "date-input",
            value: b,
            onChange: (M) => S(M.target.value)
          },
          void 0,
          !1,
          {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 134,
            columnNumber: 17
          },
          this
        )
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Reports.jsx",
        lineNumber: 132,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ s.jsxDEV("button", { className: "rc-button report-button", onClick: re, children: "Create Report" }, void 0, !1, {
        fileName: "/app/code/client/pages/Reports.jsx",
        lineNumber: 143,
        columnNumber: 15
      }, this),
      /* @__PURE__ */ s.jsxDEV("button", { className: "rc-button download-button", onClick: () => console.log("Download report:", { fromDate: p, toDate: b }), children: "Download" }, void 0, !1, {
        fileName: "/app/code/client/pages/Reports.jsx",
        lineNumber: 147,
        columnNumber: 15
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Reports.jsx",
      lineNumber: 120,
      columnNumber: 13
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/pages/Reports.jsx",
      lineNumber: 119,
      columnNumber: 11
    }, this),
    F && /* @__PURE__ */ s.jsxDEV("div", { className: "rider-selection-modal-overlay", onClick: () => x(!1), children: /* @__PURE__ */ s.jsxDEV("div", { className: "rider-selection-modal", onClick: (M) => M.stopPropagation(), children: [
      /* @__PURE__ */ s.jsxDEV("h4", { className: "modal-title", children: "Select Riders for Report" }, void 0, !1, {
        fileName: "/app/code/client/pages/Reports.jsx",
        lineNumber: 156,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ s.jsxDEV("div", { className: "modal-content", children: [
        /* @__PURE__ */ s.jsxDEV("button", { className: "select-all-button", onClick: z, children: R.length === d.length ? "Deselect All" : "Select All" }, void 0, !1, {
          fileName: "/app/code/client/pages/Reports.jsx",
          lineNumber: 159,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ s.jsxDEV("div", { className: "riders-list", children: d.map((M) => /* @__PURE__ */ s.jsxDEV("label", { className: "rider-checkbox-label", children: [
          /* @__PURE__ */ s.jsxDEV(
            "input",
            {
              type: "checkbox",
              className: "rider-checkbox",
              checked: R.includes(M.id || M._id || ""),
              onChange: () => U(M.id || M._id || "")
            },
            void 0,
            !1,
            {
              fileName: "/app/code/client/pages/Reports.jsx",
              lineNumber: 166,
              columnNumber: 25
            },
            this
          ),
          /* @__PURE__ */ s.jsxDEV("span", { className: "rider-name", children: M.name || M.firstName || "Unknown" }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 172,
            columnNumber: 25
          }, this)
        ] }, M.id || M._id, !0, {
          fileName: "/app/code/client/pages/Reports.jsx",
          lineNumber: 165,
          columnNumber: 23
        }, this)) }, void 0, !1, {
          fileName: "/app/code/client/pages/Reports.jsx",
          lineNumber: 163,
          columnNumber: 19
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Reports.jsx",
        lineNumber: 158,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ s.jsxDEV("div", { className: "modal-actions", children: [
        /* @__PURE__ */ s.jsxDEV("button", { className: "cancel-button", onClick: () => x(!1), children: "Cancel" }, void 0, !1, {
          fileName: "/app/code/client/pages/Reports.jsx",
          lineNumber: 179,
          columnNumber: 19
        }, this),
        /* @__PURE__ */ s.jsxDEV("button", { className: "confirm-button", onClick: Q, children: "Generate Report" }, void 0, !1, {
          fileName: "/app/code/client/pages/Reports.jsx",
          lineNumber: 180,
          columnNumber: 19
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Reports.jsx",
        lineNumber: 178,
        columnNumber: 17
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Reports.jsx",
      lineNumber: 155,
      columnNumber: 15
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/pages/Reports.jsx",
      lineNumber: 154,
      columnNumber: 13
    }, this),
    Y && /* @__PURE__ */ s.jsxDEV("div", { className: "auth-error", children: Y }, void 0, !1, {
      fileName: "/app/code/client/pages/Reports.jsx",
      lineNumber: 186,
      columnNumber: 27
    }, this),
    W && /* @__PURE__ */ s.jsxDEV("div", { className: "section-note", children: "Generating…" }, void 0, !1, {
      fileName: "/app/code/client/pages/Reports.jsx",
      lineNumber: 187,
      columnNumber: 29
    }, this),
    !W && le.length > 0 && /* @__PURE__ */ s.jsxDEV("div", { className: "report-table-wrap", children: /* @__PURE__ */ s.jsxDEV("table", { className: "report-table", children: [
      /* @__PURE__ */ s.jsxDEV("thead", { children: /* @__PURE__ */ s.jsxDEV("tr", { children: [
        /* @__PURE__ */ s.jsxDEV("th", { children: "#" }, void 0, !1, {
          fileName: "/app/code/client/pages/Reports.jsx",
          lineNumber: 193,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ s.jsxDEV("th", { children: "Rider Name" }, void 0, !1, {
          fileName: "/app/code/client/pages/Reports.jsx",
          lineNumber: 194,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ s.jsxDEV("th", { children: "Total Shopify Rides" }, void 0, !1, {
          fileName: "/app/code/client/pages/Reports.jsx",
          lineNumber: 195,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ s.jsxDEV("th", { children: "Extra Rides" }, void 0, !1, {
          fileName: "/app/code/client/pages/Reports.jsx",
          lineNumber: 196,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ s.jsxDEV("th", { children: "Distance travelled" }, void 0, !1, {
          fileName: "/app/code/client/pages/Reports.jsx",
          lineNumber: 197,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ s.jsxDEV("th", { children: "Per km Rate" }, void 0, !1, {
          fileName: "/app/code/client/pages/Reports.jsx",
          lineNumber: 198,
          columnNumber: 21
        }, this),
        /* @__PURE__ */ s.jsxDEV("th", { children: "Total Commission" }, void 0, !1, {
          fileName: "/app/code/client/pages/Reports.jsx",
          lineNumber: 199,
          columnNumber: 21
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Reports.jsx",
        lineNumber: 192,
        columnNumber: 19
      }, this) }, void 0, !1, {
        fileName: "/app/code/client/pages/Reports.jsx",
        lineNumber: 191,
        columnNumber: 17
      }, this),
      /* @__PURE__ */ s.jsxDEV("tbody", { children: le.map((M, ee) => /* @__PURE__ */ s.jsxDEV("tr", { children: [
        /* @__PURE__ */ s.jsxDEV("td", { children: M.serial }, void 0, !1, {
          fileName: "/app/code/client/pages/Reports.jsx",
          lineNumber: 205,
          columnNumber: 23
        }, this),
        /* @__PURE__ */ s.jsxDEV("td", { children: M.riderName }, void 0, !1, {
          fileName: "/app/code/client/pages/Reports.jsx",
          lineNumber: 206,
          columnNumber: 23
        }, this),
        /* @__PURE__ */ s.jsxDEV("td", { children: M.totalShopifyRides }, void 0, !1, {
          fileName: "/app/code/client/pages/Reports.jsx",
          lineNumber: 207,
          columnNumber: 23
        }, this),
        /* @__PURE__ */ s.jsxDEV("td", { children: M.extraRides }, void 0, !1, {
          fileName: "/app/code/client/pages/Reports.jsx",
          lineNumber: 208,
          columnNumber: 23
        }, this),
        /* @__PURE__ */ s.jsxDEV("td", { children: [
          Number(M.distanceKm).toFixed(2),
          " km"
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Reports.jsx",
          lineNumber: 209,
          columnNumber: 23
        }, this),
        /* @__PURE__ */ s.jsxDEV("td", { children: Number(M.perKmRate).toFixed(2) }, void 0, !1, {
          fileName: "/app/code/client/pages/Reports.jsx",
          lineNumber: 210,
          columnNumber: 23
        }, this),
        /* @__PURE__ */ s.jsxDEV("td", { children: [
          Number(M.totalCommission).toFixed(2),
          " Rs."
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Reports.jsx",
          lineNumber: 211,
          columnNumber: 23
        }, this)
      ] }, ee, !0, {
        fileName: "/app/code/client/pages/Reports.jsx",
        lineNumber: 204,
        columnNumber: 21
      }, this)) }, void 0, !1, {
        fileName: "/app/code/client/pages/Reports.jsx",
        lineNumber: 202,
        columnNumber: 17
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Reports.jsx",
      lineNumber: 190,
      columnNumber: 15
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/pages/Reports.jsx",
      lineNumber: 189,
      columnNumber: 13
    }, this)
  ] }, void 0, !0, {
    fileName: "/app/code/client/pages/Reports.jsx",
    lineNumber: 116,
    columnNumber: 9
  }, this) }, void 0, !1, {
    fileName: "/app/code/client/pages/Reports.jsx",
    lineNumber: 115,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "/app/code/client/pages/Reports.jsx",
    lineNumber: 114,
    columnNumber: 5
  }, this);
}
function X_({ onClose: o, onCreated: f }) {
  const [p, g] = y.useState(""), [b, S] = y.useState(""), [d, w] = y.useState(""), [R, j] = y.useState(!1), [F, x] = y.useState(""), [T, k] = y.useState(""), [te, fe] = y.useState(!1), [le, oe] = y.useState(!1), [W, P] = y.useState(!1), [Y, Z] = y.useState(!1), z = "+92";
  function U(Q) {
    const M = String(Q || "").replace(/\D+/g, "");
    return M.length === 0 ? "" : M.startsWith("92") ? z + M.slice(2) : z + M;
  }
  async function re() {
    x(""), k(""), Z(!0);
    const Q = String(p), M = String(b).trim(), ee = String(d).trim(), Ne = ee.replace(/\D+/g, ""), I = { fn: !M, cn: !ee, pw: !Q };
    if (fe(I.fn), oe(I.cn || Ne.length !== 10), P(I.pw), I.fn || I.cn || I.pw) {
      x("Full name, mobile and password are required");
      return;
    }
    if (Ne.length !== 10) {
      x("numbers should be 10 digit"), oe(!0);
      return;
    }
    if (Q.length < 6) {
      P(!0), x("Password must be at least 6 characters");
      return;
    }
    j(!0);
    try {
      const ve = U(ee), de = await fetch("/api/packers", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: Q, fullName: M, contactNumber: ve })
      }), G = await de.json().catch(() => null);
      if (!de.ok) {
        const K = String(G && (G.error || G.message) || ""), se = K.toUpperCase();
        if (/MISSING\s*FULLNAME\/CONTACTNUMBER/i.test(K) || /MISSING\s*PASSWORD/i.test(K))
          x("Full name, mobile and password are required"), fe(!M), oe(!ee || Ne.length !== 10), P(!Q);
        else if (se.includes("WEAK_PASSWORD") || /AT LEAST 6 CHARACTERS/i.test(K))
          P(!0), x("Password must be at least 6 characters");
        else if (/INVALID CONTACT NUMBER|MUST BE EXACTLY 10 DIGITS|NUMBERS SHOULD BE 10 DIGIT/i.test(K))
          oe(!0), x("numbers should be 10 digit");
        else if (/FIREBASE NOT CONFIGURED/i.test(K))
          x("Service temporarily unavailable. Please try again later.");
        else
          throw new Error(K || "Failed to create packer");
        return;
      }
      k("Packer created successfully"), f && f(), setTimeout(() => {
        o && o();
      }, 600);
    } catch (ve) {
      const de = String((ve == null ? void 0 : ve.message) || "");
      /Missing\s*(fullName\/contactNumber|password)/i.test(de) ? x("Full name, mobile and password are required") : /WEAK_PASSWORD/i.test(de) || /AT LEAST 6 CHARACTERS/i.test(de) ? (P(!0), x("Password must be at least 6 characters")) : /INVALID CONTACT NUMBER|MUST BE EXACTLY 10 DIGITS|NUMBERS SHOULD BE 10 DIGIT/i.test(de) ? (oe(!0), x("numbers should be 10 digit")) : x(de || "Failed to create packer");
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
        /* @__PURE__ */ s.jsxDEV("input", { className: "field-input" + (Y && !String(b).trim() ? " input-error" : ""), value: b, onChange: (Q) => {
          S(Q.target.value), Y && fe(!String(Q.target.value).trim());
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
        /* @__PURE__ */ s.jsxDEV("input", { className: "field-input" + (Y && !String(p) ? " input-error" : ""), type: "password", value: p, onChange: (Q) => {
          g(Q.target.value), Y && P(!String(Q.target.value));
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
              className: "field-input phone-input-field" + (Y && String(d).trim().replace(/\D+/g, "").length !== 10 ? " input-error" : ""),
              type: "tel",
              inputMode: "tel",
              pattern: "[0-9]{10}",
              placeholder: "3001234567",
              value: d,
              onChange: (Q) => {
                const M = Q.target.value.replace(/\D+/g, "").slice(0, 10);
                w(M), Y && oe(M.length !== 10);
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
        /* @__PURE__ */ s.jsxDEV("button", { className: "btn-primary", onClick: re, disabled: R, children: R ? "Creating…" : "Create" }, void 0, !1, {
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
      var U, re, Q, M;
      g(!0), S("");
      try {
        const ee = new URLSearchParams();
        ee.set("limit", String(R)), ee.set("page", String(d)), ee.set("status", "new");
        const Ne = await fetch(`/api/orders?${ee.toString()}`, { credentials: "include" });
        if (Ne.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!Ne.ok) throw new Error("Failed to load orders");
        const I = await Ne.json();
        z && (f(Array.isArray(I.orders) ? I.orders : []), x({ total: ((U = I.meta) == null ? void 0 : U.total) || 0, page: ((re = I.meta) == null ? void 0 : re.page) || d, limit: ((Q = I.meta) == null ? void 0 : Q.limit) || R, pages: ((M = I.meta) == null ? void 0 : M.pages) || 1 }));
      } catch (ee) {
        z && S(ee.message || "Failed to load orders");
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
  const [k, te] = y.useState(!1), [fe, le] = y.useState(null), [oe, W] = y.useState(!1);
  function P(z) {
    le(z), te(!0);
  }
  function Y() {
    le(null), te(!1);
  }
  function Z(z) {
    try {
      const { orderId: U } = z || {};
      if (!U) return;
      const re = String(U).replace(/^#+/, "");
      f((Q) => Q.filter((M, ee) => {
        const Ne = String(M.id || M.name || M.order_number || ee).replace(/^#+/, "");
        return String(Ne) !== String(re);
      })), x((Q) => ({ ...Q || {}, total: Math.max(0, ((Q == null ? void 0 : Q.total) || 0) - 1) }));
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
        /* @__PURE__ */ s.jsxDEV("button", { className: "btn-secondary btn-create-packer", onClick: () => W(!0), children: "Create Packer" }, void 0, !1, {
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
        !p && !b && (Array.isArray(o) ? o.filter((U) => T(U) === "new") : []).map((U, re) => {
          const Q = T(U), M = U.full_name || (U.customer && U.customer.full_name ? U.customer.full_name : "");
          let ee = "-";
          typeof U.shipping_address == "string" && String(U.shipping_address).trim() ? ee = String(U.shipping_address).trim() : U.shipping_address && typeof U.shipping_address == "object" ? ee = [U.shipping_address.address1 || "", U.shipping_address.city || "", U.shipping_address.province || "", U.shipping_address.country || ""].map((K) => String(K || "").trim()).filter(Boolean).join(", ") || "-" : typeof U.billing_address == "string" && String(U.billing_address).trim() ? ee = String(U.billing_address).trim() : U.billing_address && typeof U.billing_address == "object" && (ee = [U.billing_address.address1 || "", U.billing_address.city || "", U.billing_address.province || "", U.billing_address.country || ""].map((K) => String(K || "").trim()).filter(Boolean).join(", ") || "-");
          const Ne = U.name || U.order_number || U.id || re, I = String(U.id || U.name || U.order_number || re).replace(/^#+/, ""), ve = U.created_at ? new Date(U.created_at) : null, de = ve ? ve.toLocaleDateString() : "-", G = ve ? ve.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "-";
          return /* @__PURE__ */ s.jsxDEV("tr", { "data-status": Q, children: [
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-order", children: Ne }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 126,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-customer", children: M || "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 127,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-address", children: ee }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 128,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-status", children: /* @__PURE__ */ s.jsxDEV("span", { className: `status-chip status-${Q}`, children: Q.replace("-", " ") }, void 0, !1, {
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
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-time", children: G }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 131,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-action", children: /* @__PURE__ */ s.jsxDEV("button", { className: "order-action btn-manage", onClick: () => P(String(U.id || U.name || U.order_number || re)), children: "Assign" }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 132,
              columnNumber: 53
            }, this) }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 132,
              columnNumber: 23
            }, this)
          ] }, I, !0, {
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
    k && fe && /* @__PURE__ */ s.jsxDEV(Bx, { orderId: fe, onClose: Y, onAssigned: Z }, void 0, !1, {
      fileName: "/app/code/client/pages/Dashboard.jsx",
      lineNumber: 151,
      columnNumber: 11
    }, this),
    oe && /* @__PURE__ */ s.jsxDEV(X_, { onClose: () => W(!1), onCreated: () => {
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
