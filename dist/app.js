function aw(o, f) {
  for (var m = 0; m < f.length; m++) {
    const g = f[m];
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
var gx = { exports: {} }, Ah = {}, bx = { exports: {} }, bd = { exports: {} };
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
    var m = "18.3.1", g = Symbol.for("react.element"), b = Symbol.for("react.portal"), S = Symbol.for("react.fragment"), d = Symbol.for("react.strict_mode"), w = Symbol.for("react.profiler"), R = Symbol.for("react.provider"), j = Symbol.for("react.context"), M = Symbol.for("react.forward_ref"), x = Symbol.for("react.suspense"), T = Symbol.for("react.suspense_list"), k = Symbol.for("react.memo"), ee = Symbol.for("react.lazy"), pe = Symbol.for("react.offscreen"), le = Symbol.iterator, oe = "@@iterator";
    function G(p) {
      if (p === null || typeof p != "object")
        return null;
      var N = le && p[le] || p[oe];
      return typeof N == "function" ? N : null;
    }
    var P = {
      /**
       * @internal
       * @type {ReactComponent}
       */
      current: null
    }, $ = {
      transition: null
    }, te = {
      current: null,
      // Used to reproduce behavior of `batchedUpdates` in legacy mode.
      isBatchingLegacy: !1,
      didScheduleLegacyUpdate: !1
    }, F = {
      /**
       * @internal
       * @type {ReactComponent}
       */
      current: null
    }, U = {}, re = null;
    function X(p) {
      re = p;
    }
    U.setExtraStackFrame = function(p) {
      re = p;
    }, U.getCurrentStack = null, U.getStackAddendum = function() {
      var p = "";
      re && (p += re);
      var N = U.getCurrentStack;
      return N && (p += N() || ""), p;
    };
    var K = !1, ie = !1, Te = !1, q = !1, be = !1, ye = {
      ReactCurrentDispatcher: P,
      ReactCurrentBatchConfig: $,
      ReactCurrentOwner: F
    };
    ye.ReactDebugCurrentFrame = U, ye.ReactCurrentActQueue = te;
    function Y(p) {
      {
        for (var N = arguments.length, A = new Array(N > 1 ? N - 1 : 0), z = 1; z < N; z++)
          A[z - 1] = arguments[z];
        ce("warn", p, A);
      }
    }
    function W(p) {
      {
        for (var N = arguments.length, A = new Array(N > 1 ? N - 1 : 0), z = 1; z < N; z++)
          A[z - 1] = arguments[z];
        ce("error", p, A);
      }
    }
    function ce(p, N, A) {
      {
        var z = ye.ReactDebugCurrentFrame, ae = z.getStackAddendum();
        ae !== "" && (N += "%s", A = A.concat([ae]));
        var we = A.map(function(xe) {
          return String(xe);
        });
        we.unshift("Warning: " + N), Function.prototype.apply.call(console[p], console, we);
      }
    }
    var Me = {};
    function Pe(p, N) {
      {
        var A = p.constructor, z = A && (A.displayName || A.name) || "ReactClass", ae = z + "." + N;
        if (Me[ae])
          return;
        W("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", N, z), Me[ae] = !0;
      }
    }
    var it = {
      /**
       * Checks whether or not this composite component is mounted.
       * @param {ReactClass} publicInstance The instance we want to test.
       * @return {boolean} True if mounted, false otherwise.
       * @protected
       * @final
       */
      isMounted: function(p) {
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
      enqueueForceUpdate: function(p, N, A) {
        Pe(p, "forceUpdate");
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
      enqueueReplaceState: function(p, N, A, z) {
        Pe(p, "replaceState");
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
      enqueueSetState: function(p, N, A, z) {
        Pe(p, "setState");
      }
    }, ze = Object.assign, Ze = {};
    Object.freeze(Ze);
    function st(p, N, A) {
      this.props = p, this.context = N, this.refs = Ze, this.updater = A || it;
    }
    st.prototype.isReactComponent = {}, st.prototype.setState = function(p, N) {
      if (typeof p != "object" && typeof p != "function" && p != null)
        throw new Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
      this.updater.enqueueSetState(this, p, N, "setState");
    }, st.prototype.forceUpdate = function(p) {
      this.updater.enqueueForceUpdate(this, p, "forceUpdate");
    };
    {
      var fn = {
        isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
        replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
      }, Ht = function(p, N) {
        Object.defineProperty(st.prototype, p, {
          get: function() {
            Y("%s(...) is deprecated in plain JavaScript React classes. %s", N[0], N[1]);
          }
        });
      };
      for (var Mt in fn)
        fn.hasOwnProperty(Mt) && Ht(Mt, fn[Mt]);
    }
    function An() {
    }
    An.prototype = st.prototype;
    function qt(p, N, A) {
      this.props = p, this.context = N, this.refs = Ze, this.updater = A || it;
    }
    var Gt = qt.prototype = new An();
    Gt.constructor = qt, ze(Gt, st.prototype), Gt.isPureReactComponent = !0;
    function J() {
      var p = {
        current: null
      };
      return Object.seal(p), p;
    }
    var Ge = Array.isArray;
    function ut(p) {
      return Ge(p);
    }
    function vt(p) {
      {
        var N = typeof Symbol == "function" && Symbol.toStringTag, A = N && p[Symbol.toStringTag] || p.constructor.name || "Object";
        return A;
      }
    }
    function ht(p) {
      try {
        return lt(p), !1;
      } catch {
        return !0;
      }
    }
    function lt(p) {
      return "" + p;
    }
    function Ut(p) {
      if (ht(p))
        return W("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", vt(p)), lt(p);
    }
    function Ft(p, N, A) {
      var z = p.displayName;
      if (z)
        return z;
      var ae = N.displayName || N.name || "";
      return ae !== "" ? A + "(" + ae + ")" : A;
    }
    function Ln(p) {
      return p.displayName || "Context";
    }
    function Dn(p) {
      if (p == null)
        return null;
      if (typeof p.tag == "number" && W("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof p == "function")
        return p.displayName || p.name || null;
      if (typeof p == "string")
        return p;
      switch (p) {
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
      if (typeof p == "object")
        switch (p.$$typeof) {
          case j:
            var N = p;
            return Ln(N) + ".Consumer";
          case R:
            var A = p;
            return Ln(A._context) + ".Provider";
          case M:
            return Ft(p, p.render, "ForwardRef");
          case k:
            var z = p.displayName || null;
            return z !== null ? z : Dn(p.type) || "Memo";
          case ee: {
            var ae = p, we = ae._payload, xe = ae._init;
            try {
              return Dn(xe(we));
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
    }, pn, oa, zt;
    zt = {};
    function mn(p) {
      if (ln.call(p, "ref")) {
        var N = Object.getOwnPropertyDescriptor(p, "ref").get;
        if (N && N.isReactWarning)
          return !1;
      }
      return p.ref !== void 0;
    }
    function hn(p) {
      if (ln.call(p, "key")) {
        var N = Object.getOwnPropertyDescriptor(p, "key").get;
        if (N && N.isReactWarning)
          return !1;
      }
      return p.key !== void 0;
    }
    function xa(p, N) {
      var A = function() {
        pn || (pn = !0, W("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", N));
      };
      A.isReactWarning = !0, Object.defineProperty(p, "key", {
        get: A,
        configurable: !0
      });
    }
    function sa(p, N) {
      var A = function() {
        oa || (oa = !0, W("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", N));
      };
      A.isReactWarning = !0, Object.defineProperty(p, "ref", {
        get: A,
        configurable: !0
      });
    }
    function se(p) {
      if (typeof p.ref == "string" && F.current && p.__self && F.current.stateNode !== p.__self) {
        var N = Dn(F.current.type);
        zt[N] || (W('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', N, p.ref), zt[N] = !0);
      }
    }
    var Se = function(p, N, A, z, ae, we, xe) {
      var ke = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: g,
        // Built-in properties that belong on the element
        type: p,
        key: N,
        ref: A,
        props: xe,
        // Record the component responsible for creating this element.
        _owner: we
      };
      return ke._store = {}, Object.defineProperty(ke._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(ke, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: z
      }), Object.defineProperty(ke, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: ae
      }), Object.freeze && (Object.freeze(ke.props), Object.freeze(ke)), ke;
    };
    function $e(p, N, A) {
      var z, ae = {}, we = null, xe = null, ke = null, Ke = null;
      if (N != null) {
        mn(N) && (xe = N.ref, se(N)), hn(N) && (Ut(N.key), we = "" + N.key), ke = N.__self === void 0 ? null : N.__self, Ke = N.__source === void 0 ? null : N.__source;
        for (z in N)
          ln.call(N, z) && !Wt.hasOwnProperty(z) && (ae[z] = N[z]);
      }
      var dt = arguments.length - 2;
      if (dt === 1)
        ae.children = A;
      else if (dt > 1) {
        for (var yt = Array(dt), Nt = 0; Nt < dt; Nt++)
          yt[Nt] = arguments[Nt + 2];
        Object.freeze && Object.freeze(yt), ae.children = yt;
      }
      if (p && p.defaultProps) {
        var Ye = p.defaultProps;
        for (z in Ye)
          ae[z] === void 0 && (ae[z] = Ye[z]);
      }
      if (we || xe) {
        var jt = typeof p == "function" ? p.displayName || p.name || "Unknown" : p;
        we && xa(ae, jt), xe && sa(ae, jt);
      }
      return Se(p, we, xe, ke, Ke, F.current, ae);
    }
    function ct(p, N) {
      var A = Se(p.type, N, p.ref, p._self, p._source, p._owner, p.props);
      return A;
    }
    function Et(p, N, A) {
      if (p == null)
        throw new Error("React.cloneElement(...): The argument must be a React element, but you passed " + p + ".");
      var z, ae = ze({}, p.props), we = p.key, xe = p.ref, ke = p._self, Ke = p._source, dt = p._owner;
      if (N != null) {
        mn(N) && (xe = N.ref, dt = F.current), hn(N) && (Ut(N.key), we = "" + N.key);
        var yt;
        p.type && p.type.defaultProps && (yt = p.type.defaultProps);
        for (z in N)
          ln.call(N, z) && !Wt.hasOwnProperty(z) && (N[z] === void 0 && yt !== void 0 ? ae[z] = yt[z] : ae[z] = N[z]);
      }
      var Nt = arguments.length - 2;
      if (Nt === 1)
        ae.children = A;
      else if (Nt > 1) {
        for (var Ye = Array(Nt), jt = 0; jt < Nt; jt++)
          Ye[jt] = arguments[jt + 2];
        ae.children = Ye;
      }
      return Se(p.type, we, xe, ke, Ke, dt, ae);
    }
    function wt(p) {
      return typeof p == "object" && p !== null && p.$$typeof === g;
    }
    var _t = ".", Cn = ":";
    function Vt(p) {
      var N = /[=:]/g, A = {
        "=": "=0",
        ":": "=2"
      }, z = p.replace(N, function(ae) {
        return A[ae];
      });
      return "$" + z;
    }
    var gt = !1, At = /\/+/g;
    function Ea(p) {
      return p.replace(At, "$&/");
    }
    function Sa(p, N) {
      return typeof p == "object" && p !== null && p.key != null ? (Ut(p.key), Vt("" + p.key)) : N.toString(36);
    }
    function ua(p, N, A, z, ae) {
      var we = typeof p;
      (we === "undefined" || we === "boolean") && (p = null);
      var xe = !1;
      if (p === null)
        xe = !0;
      else
        switch (we) {
          case "string":
          case "number":
            xe = !0;
            break;
          case "object":
            switch (p.$$typeof) {
              case g:
              case b:
                xe = !0;
            }
        }
      if (xe) {
        var ke = p, Ke = ae(ke), dt = z === "" ? _t + Sa(ke, 0) : z;
        if (ut(Ke)) {
          var yt = "";
          dt != null && (yt = Ea(dt) + "/"), ua(Ke, N, yt, "", function(wd) {
            return wd;
          });
        } else Ke != null && (wt(Ke) && (Ke.key && (!ke || ke.key !== Ke.key) && Ut(Ke.key), Ke = ct(
          Ke,
          // Keep both the (mapped) and old keys if they differ, just as
          // traverseAllChildren used to do for objects as children
          A + // $FlowFixMe Flow incorrectly thinks React.Portal doesn't have a key
          (Ke.key && (!ke || ke.key !== Ke.key) ? (
            // $FlowFixMe Flow incorrectly thinks existing element's key can be a number
            // eslint-disable-next-line react-internal/safe-string-coercion
            Ea("" + Ke.key) + "/"
          ) : "") + dt
        )), N.push(Ke));
        return 1;
      }
      var Nt, Ye, jt = 0, Bt = z === "" ? _t : z + Cn;
      if (ut(p))
        for (var xi = 0; xi < p.length; xi++)
          Nt = p[xi], Ye = Bt + Sa(Nt, xi), jt += ua(Nt, N, A, Ye, ae);
      else {
        var xo = G(p);
        if (typeof xo == "function") {
          var cr = p;
          xo === cr.entries && (gt || Y("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), gt = !0);
          for (var Eo = xo.call(cr), So, Td = 0; !(So = Eo.next()).done; )
            Nt = So.value, Ye = Bt + Sa(Nt, Td++), jt += ua(Nt, N, A, Ye, ae);
        } else if (we === "object") {
          var vu = String(p);
          throw new Error("Objects are not valid as a React child (found: " + (vu === "[object Object]" ? "object with keys {" + Object.keys(p).join(", ") + "}" : vu) + "). If you meant to render a collection of children, use an array instead.");
        }
      }
      return jt;
    }
    function or(p, N, A) {
      if (p == null)
        return p;
      var z = [], ae = 0;
      return ua(p, z, "", "", function(we) {
        return N.call(A, we, ae++);
      }), z;
    }
    function io(p) {
      var N = 0;
      return or(p, function() {
        N++;
      }), N;
    }
    function di(p, N, A) {
      or(p, function() {
        N.apply(this, arguments);
      }, A);
    }
    function Zi(p) {
      return or(p, function(N) {
        return N;
      }) || [];
    }
    function el(p) {
      if (!wt(p))
        throw new Error("React.Children.only expected to receive a single React element child.");
      return p;
    }
    function fi(p) {
      var N = {
        $$typeof: j,
        // As a workaround to support multiple concurrent renderers, we categorize
        // some renderers as primary and others as secondary. We only expect
        // there to be two concurrent renderers at most: React Native (primary) and
        // Fabric (secondary); React DOM (primary) and React ART (secondary).
        // Secondary renderers store their context values on separate fields.
        _currentValue: p,
        _currentValue2: p,
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
      var A = !1, z = !1, ae = !1;
      {
        var we = {
          $$typeof: j,
          _context: N
        };
        Object.defineProperties(we, {
          Provider: {
            get: function() {
              return z || (z = !0, W("Rendering <Context.Consumer.Provider> is not supported and will be removed in a future major release. Did you mean to render <Context.Provider> instead?")), N.Provider;
            },
            set: function(xe) {
              N.Provider = xe;
            }
          },
          _currentValue: {
            get: function() {
              return N._currentValue;
            },
            set: function(xe) {
              N._currentValue = xe;
            }
          },
          _currentValue2: {
            get: function() {
              return N._currentValue2;
            },
            set: function(xe) {
              N._currentValue2 = xe;
            }
          },
          _threadCount: {
            get: function() {
              return N._threadCount;
            },
            set: function(xe) {
              N._threadCount = xe;
            }
          },
          Consumer: {
            get: function() {
              return A || (A = !0, W("Rendering <Context.Consumer.Consumer> is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?")), N.Consumer;
            }
          },
          displayName: {
            get: function() {
              return N.displayName;
            },
            set: function(xe) {
              ae || (Y("Setting `displayName` on Context.Consumer has no effect. You should set it directly on the context with Context.displayName = '%s'.", xe), ae = !0);
            }
          }
        }), N.Consumer = we;
      }
      return N._currentRenderer = null, N._currentRenderer2 = null, N;
    }
    var Ra = -1, ca = 0, Xn = 1, Ia = 2;
    function pi(p) {
      if (p._status === Ra) {
        var N = p._result, A = N();
        if (A.then(function(we) {
          if (p._status === ca || p._status === Ra) {
            var xe = p;
            xe._status = Xn, xe._result = we;
          }
        }, function(we) {
          if (p._status === ca || p._status === Ra) {
            var xe = p;
            xe._status = Ia, xe._result = we;
          }
        }), p._status === Ra) {
          var z = p;
          z._status = ca, z._result = A;
        }
      }
      if (p._status === Xn) {
        var ae = p._result;
        return ae === void 0 && W(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))

Did you accidentally put curly braces around the import?`, ae), "default" in ae || W(`lazy: Expected the result of a dynamic import() call. Instead received: %s

Your code should look like: 
  const MyComponent = lazy(() => import('./MyComponent'))`, ae), ae.default;
      } else
        throw p._result;
    }
    function E(p) {
      var N = {
        // We use these fields to store the result.
        _status: Ra,
        _result: p
      }, A = {
        $$typeof: ee,
        _payload: N,
        _init: pi
      };
      {
        var z, ae;
        Object.defineProperties(A, {
          defaultProps: {
            configurable: !0,
            get: function() {
              return z;
            },
            set: function(we) {
              W("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), z = we, Object.defineProperty(A, "defaultProps", {
                enumerable: !0
              });
            }
          },
          propTypes: {
            configurable: !0,
            get: function() {
              return ae;
            },
            set: function(we) {
              W("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), ae = we, Object.defineProperty(A, "propTypes", {
                enumerable: !0
              });
            }
          }
        });
      }
      return A;
    }
    function Z(p) {
      p != null && p.$$typeof === k ? W("forwardRef requires a render function but received a `memo` component. Instead of forwardRef(memo(...)), use memo(forwardRef(...)).") : typeof p != "function" ? W("forwardRef requires a render function but was given %s.", p === null ? "null" : typeof p) : p.length !== 0 && p.length !== 2 && W("forwardRef render functions accept exactly two parameters: props and ref. %s", p.length === 1 ? "Did you forget to use the ref parameter?" : "Any additional parameter will be undefined."), p != null && (p.defaultProps != null || p.propTypes != null) && W("forwardRef render functions do not support propTypes or defaultProps. Did you accidentally pass a React component?");
      var N = {
        $$typeof: M,
        render: p
      };
      {
        var A;
        Object.defineProperty(N, "displayName", {
          enumerable: !1,
          configurable: !0,
          get: function() {
            return A;
          },
          set: function(z) {
            A = z, !p.name && !p.displayName && (p.displayName = z);
          }
        });
      }
      return N;
    }
    var de;
    de = Symbol.for("react.module.reference");
    function Re(p) {
      return !!(typeof p == "string" || typeof p == "function" || p === S || p === w || be || p === d || p === x || p === T || q || p === pe || K || ie || Te || typeof p == "object" && p !== null && (p.$$typeof === ee || p.$$typeof === k || p.$$typeof === R || p.$$typeof === j || p.$$typeof === M || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      p.$$typeof === de || p.getModuleId !== void 0));
    }
    function We(p, N) {
      Re(p) || W("memo: The first argument must be a component. Instead received: %s", p === null ? "null" : typeof p);
      var A = {
        $$typeof: k,
        type: p,
        compare: N === void 0 ? null : N
      };
      {
        var z;
        Object.defineProperty(A, "displayName", {
          enumerable: !1,
          configurable: !0,
          get: function() {
            return z;
          },
          set: function(ae) {
            z = ae, !p.name && !p.displayName && (p.displayName = ae);
          }
        });
      }
      return A;
    }
    function Ve() {
      var p = P.current;
      return p === null && W(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`), p;
    }
    function He(p) {
      var N = Ve();
      if (p._context !== void 0) {
        var A = p._context;
        A.Consumer === p ? W("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?") : A.Provider === p && W("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
      }
      return N.useContext(p);
    }
    function Ce(p) {
      var N = Ve();
      return N.useState(p);
    }
    function Kt(p, N, A) {
      var z = Ve();
      return z.useReducer(p, N, A);
    }
    function St(p) {
      var N = Ve();
      return N.useRef(p);
    }
    function Rt(p, N) {
      var A = Ve();
      return A.useEffect(p, N);
    }
    function jn(p, N) {
      var A = Ve();
      return A.useInsertionEffect(p, N);
    }
    function Ya(p, N) {
      var A = Ve();
      return A.useLayoutEffect(p, N);
    }
    function Da(p, N) {
      var A = Ve();
      return A.useCallback(p, N);
    }
    function Qt(p, N) {
      var A = Ve();
      return A.useMemo(p, N);
    }
    function mi(p, N, A) {
      var z = Ve();
      return z.useImperativeHandle(p, N, A);
    }
    function Ca(p, N) {
      {
        var A = Ve();
        return A.useDebugValue(p, N);
      }
    }
    function Ie() {
      var p = Ve();
      return p.useTransition();
    }
    function hi(p) {
      var N = Ve();
      return N.useDeferredValue(p);
    }
    function iu() {
      var p = Ve();
      return p.useId();
    }
    function lu(p, N, A) {
      var z = Ve();
      return z.useSyncExternalStore(p, N, A);
    }
    var Ar = 0, lo, oo, so, uo, co, ou, su;
    function tl() {
    }
    tl.__reactDisabledLog = !0;
    function fo() {
      {
        if (Ar === 0) {
          lo = console.log, oo = console.info, so = console.warn, uo = console.error, co = console.group, ou = console.groupCollapsed, su = console.groupEnd;
          var p = {
            configurable: !0,
            enumerable: !0,
            value: tl,
            writable: !0
          };
          Object.defineProperties(console, {
            info: p,
            log: p,
            warn: p,
            error: p,
            group: p,
            groupCollapsed: p,
            groupEnd: p
          });
        }
        Ar++;
      }
    }
    function qa() {
      {
        if (Ar--, Ar === 0) {
          var p = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: ze({}, p, {
              value: lo
            }),
            info: ze({}, p, {
              value: oo
            }),
            warn: ze({}, p, {
              value: so
            }),
            error: ze({}, p, {
              value: uo
            }),
            group: ze({}, p, {
              value: co
            }),
            groupCollapsed: ze({}, p, {
              value: ou
            }),
            groupEnd: ze({}, p, {
              value: su
            })
          });
        }
        Ar < 0 && W("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var vi = ye.ReactCurrentDispatcher, Lr;
    function nl(p, N, A) {
      {
        if (Lr === void 0)
          try {
            throw Error();
          } catch (ae) {
            var z = ae.stack.trim().match(/\n( *(at )?)/);
            Lr = z && z[1] || "";
          }
        return `
` + Lr + p;
      }
    }
    var gi = !1, al;
    {
      var po = typeof WeakMap == "function" ? WeakMap : Map;
      al = new po();
    }
    function uu(p, N) {
      if (!p || gi)
        return "";
      {
        var A = al.get(p);
        if (A !== void 0)
          return A;
      }
      var z;
      gi = !0;
      var ae = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var we;
      we = vi.current, vi.current = null, fo();
      try {
        if (N) {
          var xe = function() {
            throw Error();
          };
          if (Object.defineProperty(xe.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(xe, []);
            } catch (Bt) {
              z = Bt;
            }
            Reflect.construct(p, [], xe);
          } else {
            try {
              xe.call();
            } catch (Bt) {
              z = Bt;
            }
            p.call(xe.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (Bt) {
            z = Bt;
          }
          p();
        }
      } catch (Bt) {
        if (Bt && z && typeof Bt.stack == "string") {
          for (var ke = Bt.stack.split(`
`), Ke = z.stack.split(`
`), dt = ke.length - 1, yt = Ke.length - 1; dt >= 1 && yt >= 0 && ke[dt] !== Ke[yt]; )
            yt--;
          for (; dt >= 1 && yt >= 0; dt--, yt--)
            if (ke[dt] !== Ke[yt]) {
              if (dt !== 1 || yt !== 1)
                do
                  if (dt--, yt--, yt < 0 || ke[dt] !== Ke[yt]) {
                    var Nt = `
` + ke[dt].replace(" at new ", " at ");
                    return p.displayName && Nt.includes("<anonymous>") && (Nt = Nt.replace("<anonymous>", p.displayName)), typeof p == "function" && al.set(p, Nt), Nt;
                  }
                while (dt >= 1 && yt >= 0);
              break;
            }
        }
      } finally {
        gi = !1, vi.current = we, qa(), Error.prepareStackTrace = ae;
      }
      var Ye = p ? p.displayName || p.name : "", jt = Ye ? nl(Ye) : "";
      return typeof p == "function" && al.set(p, jt), jt;
    }
    function mo(p, N, A) {
      return uu(p, !1);
    }
    function Sd(p) {
      var N = p.prototype;
      return !!(N && N.isReactComponent);
    }
    function bi(p, N, A) {
      if (p == null)
        return "";
      if (typeof p == "function")
        return uu(p, Sd(p));
      if (typeof p == "string")
        return nl(p);
      switch (p) {
        case x:
          return nl("Suspense");
        case T:
          return nl("SuspenseList");
      }
      if (typeof p == "object")
        switch (p.$$typeof) {
          case M:
            return mo(p.render);
          case k:
            return bi(p.type, N, A);
          case ee: {
            var z = p, ae = z._payload, we = z._init;
            try {
              return bi(we(ae), N, A);
            } catch {
            }
          }
        }
      return "";
    }
    var cu = {}, ho = ye.ReactDebugCurrentFrame;
    function nt(p) {
      if (p) {
        var N = p._owner, A = bi(p.type, p._source, N ? N.type : null);
        ho.setExtraStackFrame(A);
      } else
        ho.setExtraStackFrame(null);
    }
    function Rd(p, N, A, z, ae) {
      {
        var we = Function.call.bind(ln);
        for (var xe in p)
          if (we(p, xe)) {
            var ke = void 0;
            try {
              if (typeof p[xe] != "function") {
                var Ke = Error((z || "React class") + ": " + A + " type `" + xe + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof p[xe] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw Ke.name = "Invariant Violation", Ke;
              }
              ke = p[xe](N, xe, z, A, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (dt) {
              ke = dt;
            }
            ke && !(ke instanceof Error) && (nt(ae), W("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", z || "React class", A, xe, typeof ke), nt(null)), ke instanceof Error && !(ke.message in cu) && (cu[ke.message] = !0, nt(ae), W("Failed %s type: %s", A, ke.message), nt(null));
          }
      }
    }
    function sr(p) {
      if (p) {
        var N = p._owner, A = bi(p.type, p._source, N ? N.type : null);
        X(A);
      } else
        X(null);
    }
    var Fe;
    Fe = !1;
    function vo() {
      if (F.current) {
        var p = Dn(F.current.type);
        if (p)
          return `

Check the render method of \`` + p + "`.";
      }
      return "";
    }
    function kn(p) {
      if (p !== void 0) {
        var N = p.fileName.replace(/^.*[\\\/]/, ""), A = p.lineNumber;
        return `

Check your code at ` + N + ":" + A + ".";
      }
      return "";
    }
    function yi(p) {
      return p != null ? kn(p.__source) : "";
    }
    var kr = {};
    function Dd(p) {
      var N = vo();
      if (!N) {
        var A = typeof p == "string" ? p : p.displayName || p.name;
        A && (N = `

Check the top-level render call using <` + A + ">.");
      }
      return N;
    }
    function on(p, N) {
      if (!(!p._store || p._store.validated || p.key != null)) {
        p._store.validated = !0;
        var A = Dd(N);
        if (!kr[A]) {
          kr[A] = !0;
          var z = "";
          p && p._owner && p._owner !== F.current && (z = " It was passed a child from " + Dn(p._owner.type) + "."), sr(p), W('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', A, z), sr(null);
        }
      }
    }
    function Ct(p, N) {
      if (typeof p == "object") {
        if (ut(p))
          for (var A = 0; A < p.length; A++) {
            var z = p[A];
            wt(z) && on(z, N);
          }
        else if (wt(p))
          p._store && (p._store.validated = !0);
        else if (p) {
          var ae = G(p);
          if (typeof ae == "function" && ae !== p.entries)
            for (var we = ae.call(p), xe; !(xe = we.next()).done; )
              wt(xe.value) && on(xe.value, N);
        }
      }
    }
    function du(p) {
      {
        var N = p.type;
        if (N == null || typeof N == "string")
          return;
        var A;
        if (typeof N == "function")
          A = N.propTypes;
        else if (typeof N == "object" && (N.$$typeof === M || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        N.$$typeof === k))
          A = N.propTypes;
        else
          return;
        if (A) {
          var z = Dn(N);
          Rd(A, p.props, "prop", z, p);
        } else if (N.PropTypes !== void 0 && !Fe) {
          Fe = !0;
          var ae = Dn(N);
          W("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", ae || "Unknown");
        }
        typeof N.getDefaultProps == "function" && !N.getDefaultProps.isReactClassApproved && W("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function da(p) {
      {
        for (var N = Object.keys(p.props), A = 0; A < N.length; A++) {
          var z = N[A];
          if (z !== "children" && z !== "key") {
            sr(p), W("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", z), sr(null);
            break;
          }
        }
        p.ref !== null && (sr(p), W("Invalid attribute `ref` supplied to `React.Fragment`."), sr(null));
      }
    }
    function Un(p, N, A) {
      var z = Re(p);
      if (!z) {
        var ae = "";
        (p === void 0 || typeof p == "object" && p !== null && Object.keys(p).length === 0) && (ae += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
        var we = yi(N);
        we ? ae += we : ae += vo();
        var xe;
        p === null ? xe = "null" : ut(p) ? xe = "array" : p !== void 0 && p.$$typeof === g ? (xe = "<" + (Dn(p.type) || "Unknown") + " />", ae = " Did you accidentally export a JSX literal instead of a component?") : xe = typeof p, W("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", xe, ae);
      }
      var ke = $e.apply(this, arguments);
      if (ke == null)
        return ke;
      if (z)
        for (var Ke = 2; Ke < arguments.length; Ke++)
          Ct(arguments[Ke], p);
      return p === S ? da(ke) : du(ke), ke;
    }
    var ja = !1;
    function Cd(p) {
      var N = Un.bind(null, p);
      return N.type = p, ja || (ja = !0, Y("React.createFactory() is deprecated and will be removed in a future major release. Consider using JSX or use React.createElement() directly instead.")), Object.defineProperty(N, "type", {
        enumerable: !1,
        get: function() {
          return Y("Factory.type is deprecated. Access the class directly before passing it to createFactory."), Object.defineProperty(this, "type", {
            value: p
          }), p;
        }
      }), N;
    }
    function go(p, N, A) {
      for (var z = Et.apply(this, arguments), ae = 2; ae < arguments.length; ae++)
        Ct(arguments[ae], z.type);
      return du(z), z;
    }
    function fu(p, N) {
      var A = $.transition;
      $.transition = {};
      var z = $.transition;
      $.transition._updatedFibers = /* @__PURE__ */ new Set();
      try {
        p();
      } finally {
        if ($.transition = A, A === null && z._updatedFibers) {
          var ae = z._updatedFibers.size;
          ae > 10 && Y("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), z._updatedFibers.clear();
        }
      }
    }
    var bo = !1, rl = null;
    function jd(p) {
      if (rl === null)
        try {
          var N = ("require" + Math.random()).slice(0, 7), A = o && o[N];
          rl = A.call(o, "timers").setImmediate;
        } catch {
          rl = function(ae) {
            bo === !1 && (bo = !0, typeof MessageChannel > "u" && W("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));
            var we = new MessageChannel();
            we.port1.onmessage = ae, we.port2.postMessage(void 0);
          };
        }
      return rl(p);
    }
    var Ur = 0, Ni = !1;
    function yo(p) {
      {
        var N = Ur;
        Ur++, te.current === null && (te.current = []);
        var A = te.isBatchingLegacy, z;
        try {
          if (te.isBatchingLegacy = !0, z = p(), !A && te.didScheduleLegacyUpdate) {
            var ae = te.current;
            ae !== null && (te.didScheduleLegacyUpdate = !1, ol(ae));
          }
        } catch (Ye) {
          throw ur(N), Ye;
        } finally {
          te.isBatchingLegacy = A;
        }
        if (z !== null && typeof z == "object" && typeof z.then == "function") {
          var we = z, xe = !1, ke = {
            then: function(Ye, jt) {
              xe = !0, we.then(function(Bt) {
                ur(N), Ur === 0 ? il(Bt, Ye, jt) : Ye(Bt);
              }, function(Bt) {
                ur(N), jt(Bt);
              });
            }
          };
          return !Ni && typeof Promise < "u" && Promise.resolve().then(function() {
          }).then(function() {
            xe || (Ni = !0, W("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"));
          }), ke;
        } else {
          var Ke = z;
          if (ur(N), Ur === 0) {
            var dt = te.current;
            dt !== null && (ol(dt), te.current = null);
            var yt = {
              then: function(Ye, jt) {
                te.current === null ? (te.current = [], il(Ke, Ye, jt)) : Ye(Ke);
              }
            };
            return yt;
          } else {
            var Nt = {
              then: function(Ye, jt) {
                Ye(Ke);
              }
            };
            return Nt;
          }
        }
      }
    }
    function ur(p) {
      p !== Ur - 1 && W("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "), Ur = p;
    }
    function il(p, N, A) {
      {
        var z = te.current;
        if (z !== null)
          try {
            ol(z), jd(function() {
              z.length === 0 ? (te.current = null, N(p)) : il(p, N, A);
            });
          } catch (ae) {
            A(ae);
          }
        else
          N(p);
      }
    }
    var ll = !1;
    function ol(p) {
      if (!ll) {
        ll = !0;
        var N = 0;
        try {
          for (; N < p.length; N++) {
            var A = p[N];
            do
              A = A(!0);
            while (A !== null);
          }
          p.length = 0;
        } catch (z) {
          throw p = p.slice(N + 1), z;
        } finally {
          ll = !1;
        }
      }
    }
    var pu = Un, mu = go, No = Cd, hu = {
      map: or,
      forEach: di,
      count: io,
      toArray: Zi,
      only: el
    };
    f.Children = hu, f.Component = st, f.Fragment = S, f.Profiler = w, f.PureComponent = qt, f.StrictMode = d, f.Suspense = x, f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ye, f.act = yo, f.cloneElement = mu, f.createContext = fi, f.createElement = pu, f.createFactory = No, f.createRef = J, f.forwardRef = Z, f.isValidElement = wt, f.lazy = E, f.memo = We, f.startTransition = fu, f.unstable_act = yo, f.useCallback = Da, f.useContext = He, f.useDebugValue = Ca, f.useDeferredValue = hi, f.useEffect = Rt, f.useId = iu, f.useImperativeHandle = mi, f.useInsertionEffect = jn, f.useLayoutEffect = Ya, f.useMemo = Qt, f.useReducer = Kt, f.useRef = St, f.useState = Ce, f.useSyncExternalStore = lu, f.useTransition = Ie, f.version = m, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  })();
})(bd, bd.exports);
var iw = bd.exports;
bx.exports = iw;
var y = bx.exports;
const yx = /* @__PURE__ */ rw(y), lw = /* @__PURE__ */ aw({
  __proto__: null,
  default: yx
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
  var o = y, f = Symbol.for("react.element"), m = Symbol.for("react.portal"), g = Symbol.for("react.fragment"), b = Symbol.for("react.strict_mode"), S = Symbol.for("react.profiler"), d = Symbol.for("react.provider"), w = Symbol.for("react.context"), R = Symbol.for("react.forward_ref"), j = Symbol.for("react.suspense"), M = Symbol.for("react.suspense_list"), x = Symbol.for("react.memo"), T = Symbol.for("react.lazy"), k = Symbol.for("react.offscreen"), ee = Symbol.iterator, pe = "@@iterator";
  function le(E) {
    if (E === null || typeof E != "object")
      return null;
    var Z = ee && E[ee] || E[pe];
    return typeof Z == "function" ? Z : null;
  }
  var oe = o.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  function G(E) {
    {
      for (var Z = arguments.length, de = new Array(Z > 1 ? Z - 1 : 0), Re = 1; Re < Z; Re++)
        de[Re - 1] = arguments[Re];
      P("error", E, de);
    }
  }
  function P(E, Z, de) {
    {
      var Re = oe.ReactDebugCurrentFrame, We = Re.getStackAddendum();
      We !== "" && (Z += "%s", de = de.concat([We]));
      var Ve = de.map(function(He) {
        return String(He);
      });
      Ve.unshift("Warning: " + Z), Function.prototype.apply.call(console[E], console, Ve);
    }
  }
  var $ = !1, te = !1, F = !1, U = !1, re = !1, X;
  X = Symbol.for("react.module.reference");
  function K(E) {
    return !!(typeof E == "string" || typeof E == "function" || E === g || E === S || re || E === b || E === j || E === M || U || E === k || $ || te || F || typeof E == "object" && E !== null && (E.$$typeof === T || E.$$typeof === x || E.$$typeof === d || E.$$typeof === w || E.$$typeof === R || // This needs to include all possible module reference object
    // types supported by any Flight configuration anywhere since
    // we don't know which Flight build this will end up being used
    // with.
    E.$$typeof === X || E.getModuleId !== void 0));
  }
  function ie(E, Z, de) {
    var Re = E.displayName;
    if (Re)
      return Re;
    var We = Z.displayName || Z.name || "";
    return We !== "" ? de + "(" + We + ")" : de;
  }
  function Te(E) {
    return E.displayName || "Context";
  }
  function q(E) {
    if (E == null)
      return null;
    if (typeof E.tag == "number" && G("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof E == "function")
      return E.displayName || E.name || null;
    if (typeof E == "string")
      return E;
    switch (E) {
      case g:
        return "Fragment";
      case m:
        return "Portal";
      case S:
        return "Profiler";
      case b:
        return "StrictMode";
      case j:
        return "Suspense";
      case M:
        return "SuspenseList";
    }
    if (typeof E == "object")
      switch (E.$$typeof) {
        case w:
          var Z = E;
          return Te(Z) + ".Consumer";
        case d:
          var de = E;
          return Te(de._context) + ".Provider";
        case R:
          return ie(E, E.render, "ForwardRef");
        case x:
          var Re = E.displayName || null;
          return Re !== null ? Re : q(E.type) || "Memo";
        case T: {
          var We = E, Ve = We._payload, He = We._init;
          try {
            return q(He(Ve));
          } catch {
            return null;
          }
        }
      }
    return null;
  }
  var be = Object.assign, ye = 0, Y, W, ce, Me, Pe, it, ze;
  function Ze() {
  }
  Ze.__reactDisabledLog = !0;
  function st() {
    {
      if (ye === 0) {
        Y = console.log, W = console.info, ce = console.warn, Me = console.error, Pe = console.group, it = console.groupCollapsed, ze = console.groupEnd;
        var E = {
          configurable: !0,
          enumerable: !0,
          value: Ze,
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
      ye++;
    }
  }
  function fn() {
    {
      if (ye--, ye === 0) {
        var E = {
          configurable: !0,
          enumerable: !0,
          writable: !0
        };
        Object.defineProperties(console, {
          log: be({}, E, {
            value: Y
          }),
          info: be({}, E, {
            value: W
          }),
          warn: be({}, E, {
            value: ce
          }),
          error: be({}, E, {
            value: Me
          }),
          group: be({}, E, {
            value: Pe
          }),
          groupCollapsed: be({}, E, {
            value: it
          }),
          groupEnd: be({}, E, {
            value: ze
          })
        });
      }
      ye < 0 && G("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
    }
  }
  var Ht = oe.ReactCurrentDispatcher, Mt;
  function An(E, Z, de) {
    {
      if (Mt === void 0)
        try {
          throw Error();
        } catch (We) {
          var Re = We.stack.trim().match(/\n( *(at )?)/);
          Mt = Re && Re[1] || "";
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
  function Ge(E, Z) {
    if (!E || qt)
      return "";
    {
      var de = Gt.get(E);
      if (de !== void 0)
        return de;
    }
    var Re;
    qt = !0;
    var We = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    var Ve;
    Ve = Ht.current, Ht.current = null, st();
    try {
      if (Z) {
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
            Re = Qt;
          }
          Reflect.construct(E, [], He);
        } else {
          try {
            He.call();
          } catch (Qt) {
            Re = Qt;
          }
          E.call(He.prototype);
        }
      } else {
        try {
          throw Error();
        } catch (Qt) {
          Re = Qt;
        }
        E();
      }
    } catch (Qt) {
      if (Qt && Re && typeof Qt.stack == "string") {
        for (var Ce = Qt.stack.split(`
`), Kt = Re.stack.split(`
`), St = Ce.length - 1, Rt = Kt.length - 1; St >= 1 && Rt >= 0 && Ce[St] !== Kt[Rt]; )
          Rt--;
        for (; St >= 1 && Rt >= 0; St--, Rt--)
          if (Ce[St] !== Kt[Rt]) {
            if (St !== 1 || Rt !== 1)
              do
                if (St--, Rt--, Rt < 0 || Ce[St] !== Kt[Rt]) {
                  var jn = `
` + Ce[St].replace(" at new ", " at ");
                  return E.displayName && jn.includes("<anonymous>") && (jn = jn.replace("<anonymous>", E.displayName)), typeof E == "function" && Gt.set(E, jn), jn;
                }
              while (St >= 1 && Rt >= 0);
            break;
          }
      }
    } finally {
      qt = !1, Ht.current = Ve, fn(), Error.prepareStackTrace = We;
    }
    var Ya = E ? E.displayName || E.name : "", Da = Ya ? An(Ya) : "";
    return typeof E == "function" && Gt.set(E, Da), Da;
  }
  function ut(E, Z, de) {
    return Ge(E, !1);
  }
  function vt(E) {
    var Z = E.prototype;
    return !!(Z && Z.isReactComponent);
  }
  function ht(E, Z, de) {
    if (E == null)
      return "";
    if (typeof E == "function")
      return Ge(E, vt(E));
    if (typeof E == "string")
      return An(E);
    switch (E) {
      case j:
        return An("Suspense");
      case M:
        return An("SuspenseList");
    }
    if (typeof E == "object")
      switch (E.$$typeof) {
        case R:
          return ut(E.render);
        case x:
          return ht(E.type, Z, de);
        case T: {
          var Re = E, We = Re._payload, Ve = Re._init;
          try {
            return ht(Ve(We), Z, de);
          } catch {
          }
        }
      }
    return "";
  }
  var lt = Object.prototype.hasOwnProperty, Ut = {}, Ft = oe.ReactDebugCurrentFrame;
  function Ln(E) {
    if (E) {
      var Z = E._owner, de = ht(E.type, E._source, Z ? Z.type : null);
      Ft.setExtraStackFrame(de);
    } else
      Ft.setExtraStackFrame(null);
  }
  function Dn(E, Z, de, Re, We) {
    {
      var Ve = Function.call.bind(lt);
      for (var He in E)
        if (Ve(E, He)) {
          var Ce = void 0;
          try {
            if (typeof E[He] != "function") {
              var Kt = Error((Re || "React class") + ": " + de + " type `" + He + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof E[He] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
              throw Kt.name = "Invariant Violation", Kt;
            }
            Ce = E[He](Z, He, Re, de, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
          } catch (St) {
            Ce = St;
          }
          Ce && !(Ce instanceof Error) && (Ln(We), G("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", Re || "React class", de, He, typeof Ce), Ln(null)), Ce instanceof Error && !(Ce.message in Ut) && (Ut[Ce.message] = !0, Ln(We), G("Failed %s type: %s", de, Ce.message), Ln(null));
        }
    }
  }
  var ln = Array.isArray;
  function Wt(E) {
    return ln(E);
  }
  function pn(E) {
    {
      var Z = typeof Symbol == "function" && Symbol.toStringTag, de = Z && E[Symbol.toStringTag] || E.constructor.name || "Object";
      return de;
    }
  }
  function oa(E) {
    try {
      return zt(E), !1;
    } catch {
      return !0;
    }
  }
  function zt(E) {
    return "" + E;
  }
  function mn(E) {
    if (oa(E))
      return G("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", pn(E)), zt(E);
  }
  var hn = oe.ReactCurrentOwner, xa = {
    key: !0,
    ref: !0,
    __self: !0,
    __source: !0
  }, sa, se, Se;
  Se = {};
  function $e(E) {
    if (lt.call(E, "ref")) {
      var Z = Object.getOwnPropertyDescriptor(E, "ref").get;
      if (Z && Z.isReactWarning)
        return !1;
    }
    return E.ref !== void 0;
  }
  function ct(E) {
    if (lt.call(E, "key")) {
      var Z = Object.getOwnPropertyDescriptor(E, "key").get;
      if (Z && Z.isReactWarning)
        return !1;
    }
    return E.key !== void 0;
  }
  function Et(E, Z) {
    if (typeof E.ref == "string" && hn.current && Z && hn.current.stateNode !== Z) {
      var de = q(hn.current.type);
      Se[de] || (G('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', q(hn.current.type), E.ref), Se[de] = !0);
    }
  }
  function wt(E, Z) {
    {
      var de = function() {
        sa || (sa = !0, G("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", Z));
      };
      de.isReactWarning = !0, Object.defineProperty(E, "key", {
        get: de,
        configurable: !0
      });
    }
  }
  function _t(E, Z) {
    {
      var de = function() {
        se || (se = !0, G("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", Z));
      };
      de.isReactWarning = !0, Object.defineProperty(E, "ref", {
        get: de,
        configurable: !0
      });
    }
  }
  var Cn = function(E, Z, de, Re, We, Ve, He) {
    var Ce = {
      // This tag allows us to uniquely identify this as a React Element
      $$typeof: f,
      // Built-in properties that belong on the element
      type: E,
      key: Z,
      ref: de,
      props: He,
      // Record the component responsible for creating this element.
      _owner: Ve
    };
    return Ce._store = {}, Object.defineProperty(Ce._store, "validated", {
      configurable: !1,
      enumerable: !1,
      writable: !0,
      value: !1
    }), Object.defineProperty(Ce, "_self", {
      configurable: !1,
      enumerable: !1,
      writable: !1,
      value: Re
    }), Object.defineProperty(Ce, "_source", {
      configurable: !1,
      enumerable: !1,
      writable: !1,
      value: We
    }), Object.freeze && (Object.freeze(Ce.props), Object.freeze(Ce)), Ce;
  };
  function Vt(E, Z, de, Re, We) {
    {
      var Ve, He = {}, Ce = null, Kt = null;
      de !== void 0 && (mn(de), Ce = "" + de), ct(Z) && (mn(Z.key), Ce = "" + Z.key), $e(Z) && (Kt = Z.ref, Et(Z, We));
      for (Ve in Z)
        lt.call(Z, Ve) && !xa.hasOwnProperty(Ve) && (He[Ve] = Z[Ve]);
      if (E && E.defaultProps) {
        var St = E.defaultProps;
        for (Ve in St)
          He[Ve] === void 0 && (He[Ve] = St[Ve]);
      }
      if (Ce || Kt) {
        var Rt = typeof E == "function" ? E.displayName || E.name || "Unknown" : E;
        Ce && wt(He, Rt), Kt && _t(He, Rt);
      }
      return Cn(E, Ce, Kt, We, Re, hn.current, He);
    }
  }
  var gt = oe.ReactCurrentOwner, At = oe.ReactDebugCurrentFrame;
  function Ea(E) {
    if (E) {
      var Z = E._owner, de = ht(E.type, E._source, Z ? Z.type : null);
      At.setExtraStackFrame(de);
    } else
      At.setExtraStackFrame(null);
  }
  var Sa;
  Sa = !1;
  function ua(E) {
    return typeof E == "object" && E !== null && E.$$typeof === f;
  }
  function or() {
    {
      if (gt.current) {
        var E = q(gt.current.type);
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
        var Z = E.fileName.replace(/^.*[\\\/]/, ""), de = E.lineNumber;
        return `

Check your code at ` + Z + ":" + de + ".";
      }
      return "";
    }
  }
  var di = {};
  function Zi(E) {
    {
      var Z = or();
      if (!Z) {
        var de = typeof E == "string" ? E : E.displayName || E.name;
        de && (Z = `

Check the top-level render call using <` + de + ">.");
      }
      return Z;
    }
  }
  function el(E, Z) {
    {
      if (!E._store || E._store.validated || E.key != null)
        return;
      E._store.validated = !0;
      var de = Zi(Z);
      if (di[de])
        return;
      di[de] = !0;
      var Re = "";
      E && E._owner && E._owner !== gt.current && (Re = " It was passed a child from " + q(E._owner.type) + "."), Ea(E), G('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', de, Re), Ea(null);
    }
  }
  function fi(E, Z) {
    {
      if (typeof E != "object")
        return;
      if (Wt(E))
        for (var de = 0; de < E.length; de++) {
          var Re = E[de];
          ua(Re) && el(Re, Z);
        }
      else if (ua(E))
        E._store && (E._store.validated = !0);
      else if (E) {
        var We = le(E);
        if (typeof We == "function" && We !== E.entries)
          for (var Ve = We.call(E), He; !(He = Ve.next()).done; )
            ua(He.value) && el(He.value, Z);
      }
    }
  }
  function Ra(E) {
    {
      var Z = E.type;
      if (Z == null || typeof Z == "string")
        return;
      var de;
      if (typeof Z == "function")
        de = Z.propTypes;
      else if (typeof Z == "object" && (Z.$$typeof === R || // Note: Memo only checks outer props here.
      // Inner props are checked in the reconciler.
      Z.$$typeof === x))
        de = Z.propTypes;
      else
        return;
      if (de) {
        var Re = q(Z);
        Dn(de, E.props, "prop", Re, E);
      } else if (Z.PropTypes !== void 0 && !Sa) {
        Sa = !0;
        var We = q(Z);
        G("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", We || "Unknown");
      }
      typeof Z.getDefaultProps == "function" && !Z.getDefaultProps.isReactClassApproved && G("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
    }
  }
  function ca(E) {
    {
      for (var Z = Object.keys(E.props), de = 0; de < Z.length; de++) {
        var Re = Z[de];
        if (Re !== "children" && Re !== "key") {
          Ea(E), G("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", Re), Ea(null);
          break;
        }
      }
      E.ref !== null && (Ea(E), G("Invalid attribute `ref` supplied to `React.Fragment`."), Ea(null));
    }
  }
  var Xn = {};
  function Ia(E, Z, de, Re, We, Ve) {
    {
      var He = K(E);
      if (!He) {
        var Ce = "";
        (E === void 0 || typeof E == "object" && E !== null && Object.keys(E).length === 0) && (Ce += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
        var Kt = io(We);
        Kt ? Ce += Kt : Ce += or();
        var St;
        E === null ? St = "null" : Wt(E) ? St = "array" : E !== void 0 && E.$$typeof === f ? (St = "<" + (q(E.type) || "Unknown") + " />", Ce = " Did you accidentally export a JSX literal instead of a component?") : St = typeof E, G("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", St, Ce);
      }
      var Rt = Vt(E, Z, de, We, Ve);
      if (Rt == null)
        return Rt;
      if (He) {
        var jn = Z.children;
        if (jn !== void 0)
          if (Re)
            if (Wt(jn)) {
              for (var Ya = 0; Ya < jn.length; Ya++)
                fi(jn[Ya], E);
              Object.freeze && Object.freeze(jn);
            } else
              G("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
          else
            fi(jn, E);
      }
      if (lt.call(Z, "key")) {
        var Da = q(E), Qt = Object.keys(Z).filter(function(Ie) {
          return Ie !== "key";
        }), mi = Qt.length > 0 ? "{key: someKey, " + Qt.join(": ..., ") + ": ...}" : "{key: someKey}";
        if (!Xn[Da + mi]) {
          var Ca = Qt.length > 0 ? "{" + Qt.join(": ..., ") + ": ...}" : "{}";
          G(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, mi, Da, Ca, Da), Xn[Da + mi] = !0;
        }
      }
      return E === g ? ca(Rt) : Ra(Rt), Rt;
    }
  }
  var pi = Ia;
  Ah.Fragment = g, Ah.jsxDEV = pi;
})();
gx.exports = Ah;
var s = gx.exports, Nx = { exports: {} }, la = {}, xx = { exports: {} }, Ex = {};
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
    var f = !1, m = 5;
    function g(se, Se) {
      var $e = se.length;
      se.push(Se), d(se, Se, $e);
    }
    function b(se) {
      return se.length === 0 ? null : se[0];
    }
    function S(se) {
      if (se.length === 0)
        return null;
      var Se = se[0], $e = se.pop();
      return $e !== Se && (se[0] = $e, w(se, $e, 0)), Se;
    }
    function d(se, Se, $e) {
      for (var ct = $e; ct > 0; ) {
        var Et = ct - 1 >>> 1, wt = se[Et];
        if (R(wt, Se) > 0)
          se[Et] = Se, se[ct] = wt, ct = Et;
        else
          return;
      }
    }
    function w(se, Se, $e) {
      for (var ct = $e, Et = se.length, wt = Et >>> 1; ct < wt; ) {
        var _t = (ct + 1) * 2 - 1, Cn = se[_t], Vt = _t + 1, gt = se[Vt];
        if (R(Cn, Se) < 0)
          Vt < Et && R(gt, Cn) < 0 ? (se[ct] = gt, se[Vt] = Se, ct = Vt) : (se[ct] = Cn, se[_t] = Se, ct = _t);
        else if (Vt < Et && R(gt, Se) < 0)
          se[ct] = gt, se[Vt] = Se, ct = Vt;
        else
          return;
      }
    }
    function R(se, Se) {
      var $e = se.sortIndex - Se.sortIndex;
      return $e !== 0 ? $e : se.id - Se.id;
    }
    var j = 1, M = 2, x = 3, T = 4, k = 5;
    function ee(se, Se) {
    }
    var pe = typeof performance == "object" && typeof performance.now == "function";
    if (pe) {
      var le = performance;
      o.unstable_now = function() {
        return le.now();
      };
    } else {
      var oe = Date, G = oe.now();
      o.unstable_now = function() {
        return oe.now() - G;
      };
    }
    var P = 1073741823, $ = -1, te = 250, F = 5e3, U = 1e4, re = P, X = [], K = [], ie = 1, Te = null, q = x, be = !1, ye = !1, Y = !1, W = typeof setTimeout == "function" ? setTimeout : null, ce = typeof clearTimeout == "function" ? clearTimeout : null, Me = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function Pe(se) {
      for (var Se = b(K); Se !== null; ) {
        if (Se.callback === null)
          S(K);
        else if (Se.startTime <= se)
          S(K), Se.sortIndex = Se.expirationTime, g(X, Se);
        else
          return;
        Se = b(K);
      }
    }
    function it(se) {
      if (Y = !1, Pe(se), !ye)
        if (b(X) !== null)
          ye = !0, zt(ze);
        else {
          var Se = b(K);
          Se !== null && mn(it, Se.startTime - se);
        }
    }
    function ze(se, Se) {
      ye = !1, Y && (Y = !1, hn()), be = !0;
      var $e = q;
      try {
        var ct;
        if (!f) return Ze(se, Se);
      } finally {
        Te = null, q = $e, be = !1;
      }
    }
    function Ze(se, Se) {
      var $e = Se;
      for (Pe($e), Te = b(X); Te !== null && !(Te.expirationTime > $e && (!se || Ft())); ) {
        var ct = Te.callback;
        if (typeof ct == "function") {
          Te.callback = null, q = Te.priorityLevel;
          var Et = Te.expirationTime <= $e, wt = ct(Et);
          $e = o.unstable_now(), typeof wt == "function" ? Te.callback = wt : Te === b(X) && S(X), Pe($e);
        } else
          S(X);
        Te = b(X);
      }
      if (Te !== null)
        return !0;
      var _t = b(K);
      return _t !== null && mn(it, _t.startTime - $e), !1;
    }
    function st(se, Se) {
      switch (se) {
        case j:
        case M:
        case x:
        case T:
        case k:
          break;
        default:
          se = x;
      }
      var $e = q;
      q = se;
      try {
        return Se();
      } finally {
        q = $e;
      }
    }
    function fn(se) {
      var Se;
      switch (q) {
        case j:
        case M:
        case x:
          Se = x;
          break;
        default:
          Se = q;
          break;
      }
      var $e = q;
      q = Se;
      try {
        return se();
      } finally {
        q = $e;
      }
    }
    function Ht(se) {
      var Se = q;
      return function() {
        var $e = q;
        q = Se;
        try {
          return se.apply(this, arguments);
        } finally {
          q = $e;
        }
      };
    }
    function Mt(se, Se, $e) {
      var ct = o.unstable_now(), Et;
      if (typeof $e == "object" && $e !== null) {
        var wt = $e.delay;
        typeof wt == "number" && wt > 0 ? Et = ct + wt : Et = ct;
      } else
        Et = ct;
      var _t;
      switch (se) {
        case j:
          _t = $;
          break;
        case M:
          _t = te;
          break;
        case k:
          _t = re;
          break;
        case T:
          _t = U;
          break;
        case x:
        default:
          _t = F;
          break;
      }
      var Cn = Et + _t, Vt = {
        id: ie++,
        callback: Se,
        priorityLevel: se,
        startTime: Et,
        expirationTime: Cn,
        sortIndex: -1
      };
      return Et > ct ? (Vt.sortIndex = Et, g(K, Vt), b(X) === null && Vt === b(K) && (Y ? hn() : Y = !0, mn(it, Et - ct))) : (Vt.sortIndex = Cn, g(X, Vt), !ye && !be && (ye = !0, zt(ze))), Vt;
    }
    function An() {
    }
    function qt() {
      !ye && !be && (ye = !0, zt(ze));
    }
    function Gt() {
      return b(X);
    }
    function J(se) {
      se.callback = null;
    }
    function Ge() {
      return q;
    }
    var ut = !1, vt = null, ht = -1, lt = m, Ut = -1;
    function Ft() {
      var se = o.unstable_now() - Ut;
      return !(se < lt);
    }
    function Ln() {
    }
    function Dn(se) {
      if (se < 0 || se > 125) {
        console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported");
        return;
      }
      se > 0 ? lt = Math.floor(1e3 / se) : lt = m;
    }
    var ln = function() {
      if (vt !== null) {
        var se = o.unstable_now();
        Ut = se;
        var Se = !0, $e = !0;
        try {
          $e = vt(Se, se);
        } finally {
          $e ? Wt() : (ut = !1, vt = null);
        }
      } else
        ut = !1;
    }, Wt;
    if (typeof Me == "function")
      Wt = function() {
        Me(ln);
      };
    else if (typeof MessageChannel < "u") {
      var pn = new MessageChannel(), oa = pn.port2;
      pn.port1.onmessage = ln, Wt = function() {
        oa.postMessage(null);
      };
    } else
      Wt = function() {
        W(ln, 0);
      };
    function zt(se) {
      vt = se, ut || (ut = !0, Wt());
    }
    function mn(se, Se) {
      ht = W(function() {
        se(o.unstable_now());
      }, Se);
    }
    function hn() {
      ce(ht), ht = -1;
    }
    var xa = Ln, sa = null;
    o.unstable_IdlePriority = k, o.unstable_ImmediatePriority = j, o.unstable_LowPriority = T, o.unstable_NormalPriority = x, o.unstable_Profiling = sa, o.unstable_UserBlockingPriority = M, o.unstable_cancelCallback = J, o.unstable_continueExecution = qt, o.unstable_forceFrameRate = Dn, o.unstable_getCurrentPriorityLevel = Ge, o.unstable_getFirstCallbackNode = Gt, o.unstable_next = fn, o.unstable_pauseExecution = An, o.unstable_requestPaint = xa, o.unstable_runWithPriority = st, o.unstable_scheduleCallback = Mt, o.unstable_shouldYield = Ft, o.unstable_wrapCallback = Ht, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  })();
})(Ex);
xx.exports = Ex;
var ow = xx.exports;
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
  var o = y, f = ow, m = o.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, g = !1;
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
      var a = m.ReactDebugCurrentFrame, r = a.getStackAddendum();
      r !== "" && (t += "%s", n = n.concat([r]));
      var i = n.map(function(l) {
        return String(l);
      });
      i.unshift("Warning: " + t), Function.prototype.apply.call(console[e], console, i);
    }
  }
  var R = 0, j = 1, M = 2, x = 3, T = 4, k = 5, ee = 6, pe = 7, le = 8, oe = 9, G = 10, P = 11, $ = 12, te = 13, F = 14, U = 15, re = 16, X = 17, K = 18, ie = 19, Te = 21, q = 22, be = 23, ye = 24, Y = 25, W = !0, ce = !1, Me = !1, Pe = !1, it = !1, ze = !0, Ze = !0, st = !0, fn = !0, Ht = /* @__PURE__ */ new Set(), Mt = {}, An = {};
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
  var J = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", Ge = Object.prototype.hasOwnProperty;
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
  var Wt = 0, pn = 1, oa = 2, zt = 3, mn = 4, hn = 5, xa = 6, sa = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD", se = sa + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040", Se = new RegExp("^[" + sa + "][" + se + "]*$"), $e = {}, ct = {};
  function Et(e) {
    return Ge.call(ct, e) ? !0 : Ge.call($e, e) ? !1 : Se.test(e) ? (ct[e] = !0, !0) : ($e[e] = !0, d("Invalid attribute name: `%s`", e), !1);
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
        case mn:
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
    this.acceptsBooleans = t === oa || t === zt || t === mn, this.attributeName = a, this.attributeNamespace = r, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = i, this.removeEmptyString = l;
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
      pn,
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
      oa,
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
      oa,
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
      mn,
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
  var Sa = /[\-\:]([a-z])/g, ua = function(e) {
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
    var t = e.replace(Sa, ua);
    At[t] = new gt(
      t,
      pn,
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
    var t = e.replace(Sa, ua);
    At[t] = new gt(
      t,
      pn,
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
    var t = e.replace(Sa, ua);
    At[t] = new gt(
      t,
      pn,
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
      pn,
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
    pn,
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
      pn,
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
      if (a.type === mn) {
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
        C === zt || C === mn && n === !0 ? D = "" : (lt(n, h), D = "" + n, r.sanitizeURL && Zi(D.toString())), v ? e.setAttributeNS(v, h, D) : e.setAttribute(h, D);
      }
    }
  }
  var ca = Symbol.for("react.element"), Xn = Symbol.for("react.portal"), Ia = Symbol.for("react.fragment"), pi = Symbol.for("react.strict_mode"), E = Symbol.for("react.profiler"), Z = Symbol.for("react.provider"), de = Symbol.for("react.context"), Re = Symbol.for("react.forward_ref"), We = Symbol.for("react.suspense"), Ve = Symbol.for("react.suspense_list"), He = Symbol.for("react.memo"), Ce = Symbol.for("react.lazy"), Kt = Symbol.for("react.scope"), St = Symbol.for("react.debug_trace_mode"), Rt = Symbol.for("react.offscreen"), jn = Symbol.for("react.legacy_hidden"), Ya = Symbol.for("react.cache"), Da = Symbol.for("react.tracing_marker"), Qt = Symbol.iterator, mi = "@@iterator";
  function Ca(e) {
    if (e === null || typeof e != "object")
      return null;
    var t = Qt && e[Qt] || e[mi];
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
  var tl = m.ReactCurrentDispatcher, fo;
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
  function po(e, t, n) {
    return gi(e, !1);
  }
  function uu(e) {
    var t = e.prototype;
    return !!(t && t.isReactComponent);
  }
  function mo(e, t, n) {
    if (e == null)
      return "";
    if (typeof e == "function")
      return gi(e, uu(e));
    if (typeof e == "string")
      return qa(e);
    switch (e) {
      case We:
        return qa("Suspense");
      case Ve:
        return qa("SuspenseList");
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case Re:
          return po(e.render);
        case He:
          return mo(e.type, t, n);
        case Ce: {
          var a = e, r = a._payload, i = a._init;
          try {
            return mo(i(r), t, n);
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
      case te:
        return qa("Suspense");
      case ie:
        return qa("SuspenseList");
      case R:
      case M:
      case U:
        return po(e.type);
      case P:
        return po(e.type.render);
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
  function nt(e) {
    if (e == null)
      return null;
    if (typeof e.tag == "number" && d("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
      return e.displayName || e.name || null;
    if (typeof e == "string")
      return e;
    switch (e) {
      case Ia:
        return "Fragment";
      case Xn:
        return "Portal";
      case E:
        return "Profiler";
      case pi:
        return "StrictMode";
      case We:
        return "Suspense";
      case Ve:
        return "SuspenseList";
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case de:
          var t = e;
          return ho(t) + ".Consumer";
        case Z:
          var n = e;
          return ho(n._context) + ".Provider";
        case Re:
          return cu(e, e.render, "ForwardRef");
        case He:
          var a = e.displayName || null;
          return a !== null ? a : nt(e.type) || "Memo";
        case Ce: {
          var r = e, i = r._payload, l = r._init;
          try {
            return nt(l(i));
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
  function Fe(e) {
    var t = e.tag, n = e.type;
    switch (t) {
      case ye:
        return "Cache";
      case oe:
        var a = n;
        return sr(a) + ".Consumer";
      case G:
        var r = n;
        return sr(r._context) + ".Provider";
      case K:
        return "DehydratedFragment";
      case P:
        return Rd(n, n.render, "ForwardRef");
      case pe:
        return "Fragment";
      case k:
        return n;
      case T:
        return "Portal";
      case x:
        return "Root";
      case ee:
        return "Text";
      case re:
        return nt(n);
      case le:
        return n === pi ? "StrictMode" : "Mode";
      case q:
        return "Offscreen";
      case $:
        return "Profiler";
      case Te:
        return "Scope";
      case te:
        return "Suspense";
      case ie:
        return "SuspenseList";
      case Y:
        return "TracingMarker";
      case j:
      case R:
      case X:
      case M:
      case F:
      case U:
        if (typeof n == "function")
          return n.displayName || n.name || null;
        if (typeof n == "string")
          return n;
        break;
    }
    return null;
  }
  var vo = m.ReactDebugCurrentFrame, kn = null, yi = !1;
  function kr() {
    {
      if (kn === null)
        return null;
      var e = kn._debugOwner;
      if (e !== null && typeof e < "u")
        return Fe(e);
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
  function da(e) {
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
  var il = !1, ll = !1, ol = !1, pu = !1;
  function mu(e) {
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
      controlled: mu(t)
    };
  }
  function p(e, t) {
    var n = e, a = t.checked;
    a != null && Ra(n, "checked", a, !1);
  }
  function N(e, t) {
    var n = e;
    {
      var a = mu(t);
      !n._wrapperState.controlled && a && !pu && (d("A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), pu = !0), n._wrapperState.controlled && !a && !ol && (d("A component is changing a controlled input to be uncontrolled. This is likely caused by the value changing from a defined to undefined, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), ol = !0);
    }
    p(e, t);
    var r = ja(t.value), i = t.type;
    if (r != null)
      i === "number" ? (r === 0 && n.value === "" || // We explicitly want to coerce to number here if possible.
      // eslint-disable-next-line
      n.value != r) && (n.value = Un(r)) : n.value !== Un(r) && (n.value = Un(r));
    else if (i === "submit" || i === "reset") {
      n.removeAttribute("value");
      return;
    }
    t.hasOwnProperty("value") ? we(n, t.type, r) : t.hasOwnProperty("defaultValue") && we(n, t.type, ja(t.defaultValue)), t.checked == null && t.defaultChecked != null && (n.defaultChecked = !!t.defaultChecked);
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
  function z(e, t) {
    var n = e;
    N(n, t), ae(n, t);
  }
  function ae(e, t) {
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
  function we(e, t, n) {
    // Focused number inputs synchronize on blur. See ChangeEventPlugin.js
    (t !== "number" || ur(e.ownerDocument) !== e) && (n == null ? e.defaultValue = Un(e._wrapperState.initialValue) : e.defaultValue !== Un(n) && (e.defaultValue = Un(n)));
  }
  var xe = !1, ke = !1, Ke = !1;
  function dt(e, t) {
    t.value == null && (typeof t.children == "object" && t.children !== null ? o.Children.forEach(t.children, function(n) {
      n != null && (typeof n == "string" || typeof n == "number" || ke || (ke = !0, d("Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>.")));
    }) : t.dangerouslySetInnerHTML != null && (Ke || (Ke = !0, d("Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected.")))), t.selected != null && !xe && (d("Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>."), xe = !0);
  }
  function yt(e, t) {
    t.value != null && e.setAttribute("value", Un(ja(t.value)));
  }
  var Nt = Array.isArray;
  function Ye(e) {
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
          var a = Ye(e[n]);
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
    return Ie({}, t, {
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
  var Wh = !1;
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
  function Kh(e, t) {
    var n = e;
    go("textarea", t), t.value !== void 0 && t.defaultValue !== void 0 && !Wh && (d("%s contains a textarea with both value and defaultValue props. Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://reactjs.org/link/controlled-components", kr() || "A component"), Wh = !0);
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
  function Qh(e, t) {
    var n = e, a = ja(t.value), r = ja(t.defaultValue);
    if (a != null) {
      var i = Un(a);
      i !== n.value && (n.value = i), t.defaultValue == null && n.defaultValue !== i && (n.defaultValue = i);
    }
    r != null && (n.defaultValue = Un(r));
  }
  function Xh(e, t) {
    var n = e, a = n.textContent;
    a === n._wrapperState.initialValue && a !== "" && a !== null && (n.value = a);
  }
  function Ix(e, t) {
    Qh(e, t);
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
  }, gu, Jh = qx(function(e, t) {
    if (e.namespaceURI === Od && !("innerHTML" in e)) {
      gu = gu || document.createElement("div"), gu.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>";
      for (var n = gu.firstChild; e.firstChild; )
        e.removeChild(e.firstChild);
      for (; n.firstChild; )
        e.appendChild(n.firstChild);
      return;
    }
    e.innerHTML = t;
  }), Yn = 1, fr = 3, $t = 8, pr = 9, Ad = 11, bu = function(e, t) {
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
  var Zh = function() {
  };
  {
    var Zx = /^(?:webkit|moz|o)[A-Z]/, eE = /^-ms-/, tE = /-(.)/g, ev = /;\s*$/, sl = {}, kd = {}, tv = !1, nv = !1, nE = function(e) {
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
      kd.hasOwnProperty(t) && kd[t] || (kd[t] = !0, d(`Style property values shouldn't contain a semicolon. Try "%s: %s" instead.`, e, t.replace(ev, "")));
    }, lE = function(e, t) {
      tv || (tv = !0, d("`NaN` is an invalid value for the `%s` css style property.", e));
    }, oE = function(e, t) {
      nv || (nv = !0, d("`Infinity` is an invalid value for the `%s` css style property.", e));
    };
    Zh = function(e, t) {
      e.indexOf("-") > -1 ? aE(e) : Zx.test(e) ? rE(e) : ev.test(t) && iE(e, t), typeof t == "number" && (isNaN(t) ? lE(e, t) : isFinite(t) || oE(e, t));
    };
  }
  var sE = Zh;
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
  function av(e, t) {
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
  function rv(e) {
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
      var n = rv(e), a = rv(t), r = {};
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
  }, pE = Ie({
    menuitem: !0
  }, fE), mE = "__html";
  function Ud(e, t) {
    if (t) {
      if (pE[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
        throw new Error(e + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
      if (t.dangerouslySetInnerHTML != null) {
        if (t.children != null)
          throw new Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
        if (typeof t.dangerouslySetInnerHTML != "object" || !(mE in t.dangerouslySetInnerHTML))
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
  }, iv = {
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
  }, ul = {}, hE = new RegExp("^(aria)-[" + se + "]*$"), vE = new RegExp("^(aria)[A-Z][" + se + "]*$");
  function gE(e, t) {
    {
      if (Ge.call(ul, t) && ul[t])
        return !0;
      if (vE.test(t)) {
        var n = "aria-" + t.slice(4).toLowerCase(), a = iv.hasOwnProperty(n) ? n : null;
        if (a == null)
          return d("Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.", t), ul[t] = !0, !0;
        if (t !== a)
          return d("Invalid ARIA attribute `%s`. Did you mean `%s`?", t, a), ul[t] = !0, !0;
      }
      if (hE.test(t)) {
        var r = t.toLowerCase(), i = iv.hasOwnProperty(r) ? r : null;
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
  var lv = !1;
  function NE(e, t) {
    {
      if (e !== "input" && e !== "textarea" && e !== "select")
        return;
      t != null && t.value === null && !lv && (lv = !0, e === "select" && t.multiple ? d("`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.", e) : d("`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.", e));
    }
  }
  var ov = function() {
  };
  {
    var Fn = {}, sv = /^on./, xE = /^on[^A-Z]/, EE = new RegExp("^(aria)-[" + se + "]*$"), SE = new RegExp("^(aria)[A-Z][" + se + "]*$");
    ov = function(e, t, n, a) {
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
        if (sv.test(t))
          return d("Unknown event handler property `%s`. It will be ignored.", t), Fn[t] = !0, !0;
      } else if (sv.test(t))
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
        var i = ov(e, r, t[r], n);
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
  var uv = 1, Fd = 2, Do = 4, CE = uv | Fd | Do, Co = null;
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
  function cv(e) {
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
  function dv(e) {
    cl ? dl ? dl.push(e) : dl = [e] : cl = e;
  }
  function OE() {
    return cl !== null || dl !== null;
  }
  function fv() {
    if (cl) {
      var e = cl, t = dl;
      if (cl = null, dl = null, cv(e), t)
        for (var n = 0; n < t.length; n++)
          cv(t[n]);
    }
  }
  var pv = function(e, t) {
    return e(t);
  }, mv = function() {
  }, Hd = !1;
  function ME() {
    var e = OE();
    e && (mv(), fv());
  }
  function hv(e, t, n) {
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
    pv = e, mv = n;
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
  function vv(e, t, n, a, r, i, l, u, c) {
    var h = Array.prototype.slice.call(arguments, 3);
    try {
      t.apply(n, h);
    } catch (v) {
      this.onError(v);
    }
  }
  var gv = vv;
  if (typeof window < "u" && typeof window.dispatchEvent == "function" && typeof document < "u" && typeof document.createEvent == "function") {
    var $d = document.createElement("react");
    gv = function(t, n, a, r, i, l, u, c, h) {
      if (typeof document > "u" || document === null)
        throw new Error("The `document` global was defined when React was initialized, but is not defined anymore. This can happen in a test environment if a component schedules an update from an asynchronous callback, but the test has already finished running. To solve this, you can either unmount the component at the end of your test (and ensure that any asynchronous operations get canceled in `componentWillUnmount`), or you can change the test itself to be asynchronous.");
      var v = document.createEvent("Event"), C = !1, D = !0, V = window.event, L = Object.getOwnPropertyDescriptor(window, "event");
      function H() {
        $d.removeEventListener(B, De, !1), typeof window.event < "u" && window.hasOwnProperty("event") && (window.event = V);
      }
      var fe = Array.prototype.slice.call(arguments, 3);
      function De() {
        C = !0, H(), n.apply(a, fe), D = !1;
      }
      var Ee, Je = !1, qe = !1;
      function _(O) {
        if (Ee = O.error, Je = !0, Ee === null && O.colno === 0 && O.lineno === 0 && (qe = !0), O.defaultPrevented && Ee != null && typeof Ee == "object")
          try {
            Ee._suppressLogging = !0;
          } catch {
          }
      }
      var B = "react-" + (t || "invokeguardedcallback");
      if (window.addEventListener("error", _), $d.addEventListener(B, De, !1), v.initEvent(B, !1, !1), $d.dispatchEvent(v), L && Object.defineProperty(window, "event", L), C && D && (Je ? qe && (Ee = new Error("A cross-origin error was thrown. React doesn't have access to the actual error object in development. See https://reactjs.org/link/crossorigin-error for more information.")) : Ee = new Error(`An error was thrown inside one of your components, but React doesn't know what it was. This is likely due to browser flakiness. React does its best to preserve the "Pause on exceptions" behavior of the DevTools, which requires some DEV-mode only tricks. It's possible that these don't work in your browser. Try triggering the error in production mode, or switching to a modern browser. If you suspect that this is actually an issue with React, please file an issue.`), this.onError(Ee)), window.removeEventListener("error", _), !C)
        return H(), vv.apply(this, arguments);
    };
  }
  var kE = gv, fl = !1, Nu = null, xu = !1, Id = null, UE = {
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
  function pl(e) {
    return e._reactInternals;
  }
  function HE(e) {
    return e._reactInternals !== void 0;
  }
  function BE(e, t) {
    e._reactInternals = t;
  }
  var _e = (
    /*                      */
    0
  ), ml = (
    /*                */
    1
  ), It = (
    /*                    */
    2
  ), at = (
    /*                       */
    4
  ), Si = (
    /*                */
    16
  ), wo = (
    /*                 */
    32
  ), bv = (
    /*                     */
    64
  ), rt = (
    /*                   */
    128
  ), mr = (
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
  ), yv = (
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
    at | hl | 0
  ), Zd = It | at | Si | wo | Ri | hr | Di, _o = at | bv | Ri | Di, vl = Fr | Si, vr = Ci | Qd | Kd, IE = m.ReactCurrentOwner;
  function ji(e) {
    var t = e, n = e;
    if (e.alternate)
      for (; t.return; )
        t = t.return;
    else {
      var a = t;
      do
        t = a, (t.flags & (It | hr)) !== _e && (n = t.return), a = t.return;
      while (a);
    }
    return t.tag === x ? n : null;
  }
  function Nv(e) {
    if (e.tag === te) {
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
  function xv(e) {
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
        a._warnedAboutRefsInRender || d("%s is accessing isMounted inside its render() function. render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", Fe(n) || "A component"), a._warnedAboutRefsInRender = !0;
      }
    }
    var r = pl(e);
    return r ? ji(r) === r : !1;
  }
  function Ev(e) {
    if (ji(e) !== e)
      throw new Error("Unable to find node on an unmounted component.");
  }
  function Sv(e) {
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
            return Ev(i), e;
          if (c === r)
            return Ev(i), t;
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
  function Rv(e) {
    var t = Sv(e);
    return t !== null ? Dv(t) : null;
  }
  function Dv(e) {
    if (e.tag === k || e.tag === ee)
      return e;
    for (var t = e.child; t !== null; ) {
      var n = Dv(t);
      if (n !== null)
        return n;
      t = t.sibling;
    }
    return null;
  }
  function GE(e) {
    var t = Sv(e);
    return t !== null ? Cv(t) : null;
  }
  function Cv(e) {
    if (e.tag === k || e.tag === ee)
      return e;
    for (var t = e.child; t !== null; ) {
      if (t.tag !== T) {
        var n = Cv(t);
        if (n !== null)
          return n;
      }
      t = t.sibling;
    }
    return null;
  }
  var jv = f.unstable_scheduleCallback, WE = f.unstable_cancelCallback, KE = f.unstable_shouldYield, QE = f.unstable_requestPaint, sn = f.unstable_now, XE = f.unstable_getCurrentPriorityLevel, Su = f.unstable_ImmediatePriority, ef = f.unstable_UserBlockingPriority, Ti = f.unstable_NormalPriority, JE = f.unstable_LowPriority, tf = f.unstable_IdlePriority, ZE = f.unstable_yieldValue, eS = f.unstable_setDisableYieldValue, gl = null, Tn = null, he = null, Ga = !1, Ta = typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u";
  function tS(e) {
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u")
      return !1;
    var t = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (t.isDisabled)
      return !0;
    if (!t.supportsFiber)
      return d("The installed version of React DevTools is too old and will not work with the current version of React. Please update React DevTools. https://reactjs.org/link/react-devtools"), !0;
    try {
      Ze && (e = Ie({}, e, {
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
        var n = (e.current.flags & rt) === rt;
        if (st) {
          var a;
          switch (t) {
            case ea:
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
    he = e;
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
    he !== null && typeof he.markCommitStarted == "function" && he.markCommitStarted(e);
  }
  function Tv() {
    he !== null && typeof he.markCommitStopped == "function" && he.markCommitStopped();
  }
  function Oo(e) {
    he !== null && typeof he.markComponentRenderStarted == "function" && he.markComponentRenderStarted(e);
  }
  function bl() {
    he !== null && typeof he.markComponentRenderStopped == "function" && he.markComponentRenderStopped();
  }
  function uS(e) {
    he !== null && typeof he.markComponentPassiveEffectMountStarted == "function" && he.markComponentPassiveEffectMountStarted(e);
  }
  function cS() {
    he !== null && typeof he.markComponentPassiveEffectMountStopped == "function" && he.markComponentPassiveEffectMountStopped();
  }
  function dS(e) {
    he !== null && typeof he.markComponentPassiveEffectUnmountStarted == "function" && he.markComponentPassiveEffectUnmountStarted(e);
  }
  function fS() {
    he !== null && typeof he.markComponentPassiveEffectUnmountStopped == "function" && he.markComponentPassiveEffectUnmountStopped();
  }
  function pS(e) {
    he !== null && typeof he.markComponentLayoutEffectMountStarted == "function" && he.markComponentLayoutEffectMountStarted(e);
  }
  function mS() {
    he !== null && typeof he.markComponentLayoutEffectMountStopped == "function" && he.markComponentLayoutEffectMountStopped();
  }
  function wv(e) {
    he !== null && typeof he.markComponentLayoutEffectUnmountStarted == "function" && he.markComponentLayoutEffectUnmountStarted(e);
  }
  function _v() {
    he !== null && typeof he.markComponentLayoutEffectUnmountStopped == "function" && he.markComponentLayoutEffectUnmountStopped();
  }
  function hS(e, t, n) {
    he !== null && typeof he.markComponentErrored == "function" && he.markComponentErrored(e, t, n);
  }
  function vS(e, t, n) {
    he !== null && typeof he.markComponentSuspended == "function" && he.markComponentSuspended(e, t, n);
  }
  function gS(e) {
    he !== null && typeof he.markLayoutEffectsStarted == "function" && he.markLayoutEffectsStarted(e);
  }
  function bS() {
    he !== null && typeof he.markLayoutEffectsStopped == "function" && he.markLayoutEffectsStopped();
  }
  function yS(e) {
    he !== null && typeof he.markPassiveEffectsStarted == "function" && he.markPassiveEffectsStarted(e);
  }
  function NS() {
    he !== null && typeof he.markPassiveEffectsStopped == "function" && he.markPassiveEffectsStopped();
  }
  function Ov(e) {
    he !== null && typeof he.markRenderStarted == "function" && he.markRenderStarted(e);
  }
  function xS() {
    he !== null && typeof he.markRenderYielded == "function" && he.markRenderYielded();
  }
  function Mv() {
    he !== null && typeof he.markRenderStopped == "function" && he.markRenderStopped();
  }
  function ES(e) {
    he !== null && typeof he.markRenderScheduled == "function" && he.markRenderScheduled(e);
  }
  function SS(e, t) {
    he !== null && typeof he.markForceUpdateScheduled == "function" && he.markForceUpdateScheduled(e, t);
  }
  function nf(e, t) {
    he !== null && typeof he.markStateUpdateScheduled == "function" && he.markStateUpdateScheduled(e, t);
  }
  var je = (
    /*                         */
    0
  ), Qe = (
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
  ), Vv = Math.clz32 ? Math.clz32 : CS, RS = Math.log, DS = Math.LN2;
  function CS(e) {
    var t = e >>> 0;
    return t === 0 ? 32 : 31 - (RS(t) / DS | 0) | 0;
  }
  var af = 31, Q = (
    /*                        */
    0
  ), cn = (
    /*                          */
    0
  ), Ae = (
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
  ), pf = (
    /*                       */
    32768
  ), mf = (
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
  ), Av = xl, Ao = (
    /*          */
    134217728
  ), Lv = (
    /*                          */
    268435455
  ), Lo = (
    /*               */
    268435456
  ), _i = (
    /*                        */
    536870912
  ), Jn = (
    /*                   */
    1073741824
  );
  function jS(e) {
    {
      if (e & Ae)
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
      if (e & Jn)
        return "Offscreen";
    }
  }
  var xt = -1, Du = Vo, Cu = xl;
  function ko(e) {
    switch (Oi(e)) {
      case Ae:
        return Ae;
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
      case pf:
      case mf:
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
      case Jn:
        return Jn;
      default:
        return d("Should have found matching lanes. This is a bug in React."), e;
    }
  }
  function ju(e, t) {
    var n = e.pendingLanes;
    if (n === Q)
      return Q;
    var a = Q, r = e.suspendedLanes, i = e.pingedLanes, l = n & Lv;
    if (l !== Q) {
      var u = l & ~r;
      if (u !== Q)
        a = ko(u);
      else {
        var c = l & i;
        c !== Q && (a = ko(c));
      }
    } else {
      var h = n & ~r;
      h !== Q ? a = ko(h) : i !== Q && (a = ko(i));
    }
    if (a === Q)
      return Q;
    if (t !== Q && t !== a && // If we already suspended with a delay, then interrupting is fine. Don't
    // bother waiting until the root is complete.
    (t & r) === Q) {
      var v = Oi(a), C = Oi(t);
      if (
        // Tests whether the next lane is equal or lower priority than the wip
        // one. This works because the bits decrease in priority as you go left.
        v >= C || // Default priority updates should not interrupt transition updates. The
        // only difference between default updates and transition updates is that
        // default updates do not support refresh transitions.
        v === Ka && (C & Nl) !== Q
      )
        return t;
    }
    (a & gr) !== Q && (a |= n & Ka);
    var D = e.entangledLanes;
    if (D !== Q)
      for (var V = e.entanglements, L = a & D; L > 0; ) {
        var H = Mi(L), fe = 1 << H;
        a |= V[H], L &= ~fe;
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
      case Ae:
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
      case pf:
      case mf:
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
      case Jn:
        return xt;
      default:
        return d("Should have found matching lanes. This is a bug in React."), xt;
    }
  }
  function _S(e, t) {
    for (var n = e.pendingLanes, a = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, l = n; l > 0; ) {
      var u = Mi(l), c = 1 << u, h = i[u];
      h === xt ? ((c & a) === Q || (c & r) !== Q) && (i[u] = wS(c, t)) : h <= t && (e.expiredLanes |= c), l &= ~c;
    }
  }
  function OS(e) {
    return ko(e.pendingLanes);
  }
  function Rf(e) {
    var t = e.pendingLanes & ~Jn;
    return t !== Q ? t : t & Jn ? Jn : Q;
  }
  function MS(e) {
    return (e & Ae) !== Q;
  }
  function Df(e) {
    return (e & Lv) !== Q;
  }
  function kv(e) {
    return (e & Ru) === e;
  }
  function VS(e) {
    var t = Ae | gr | Ka;
    return (e & t) === Q;
  }
  function AS(e) {
    return (e & Nl) === e;
  }
  function Tu(e, t) {
    var n = yl | gr | wi | Ka;
    return (t & n) !== Q;
  }
  function LS(e, t) {
    return (t & e.expiredLanes) !== Q;
  }
  function Uv(e) {
    return (e & Nl) !== Q;
  }
  function Fv() {
    var e = Du;
    return Du <<= 1, (Du & Nl) === Q && (Du = Vo), e;
  }
  function kS() {
    var e = Cu;
    return Cu <<= 1, (Cu & Ru) === Q && (Cu = xl), e;
  }
  function Oi(e) {
    return e & -e;
  }
  function Uo(e) {
    return Oi(e);
  }
  function Mi(e) {
    return 31 - Vv(e);
  }
  function Cf(e) {
    return Mi(e);
  }
  function Zn(e, t) {
    return (e & t) !== Q;
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
  function zv(e, t) {
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
    e.pendingLanes |= t, t !== _i && (e.suspendedLanes = Q, e.pingedLanes = Q);
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
  function Pv(e, t, n) {
    e.pingedLanes |= e.suspendedLanes & t;
  }
  function zS(e, t) {
    var n = e.pendingLanes & ~t;
    e.pendingLanes = t, e.suspendedLanes = Q, e.pingedLanes = Q, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t;
    for (var a = e.entanglements, r = e.eventTimes, i = e.expirationTimes, l = n; l > 0; ) {
      var u = Mi(l), c = 1 << u;
      a[u] = Q, r[u] = xt, i[u] = xt, l &= ~c;
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
      case pf:
      case mf:
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
  function Hv(e, t, n) {
    if (Ta)
      for (var a = e.pendingUpdatersLaneMap; n > 0; ) {
        var r = Cf(n), i = 1 << r, l = a[r];
        l.add(t), n &= ~i;
      }
  }
  function Bv(e, t) {
    if (Ta)
      for (var n = e.pendingUpdatersLaneMap, a = e.memoizedUpdaters; t > 0; ) {
        var r = Cf(t), i = 1 << r, l = n[r];
        l.size > 0 && (l.forEach(function(u) {
          var c = u.alternate;
          (c === null || !a.has(c)) && a.add(u);
        }), l.clear()), t &= ~i;
      }
  }
  function $v(e, t) {
    return null;
  }
  var ea = Ae, br = gr, yr = Ka, _u = _i, zo = cn;
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
  function Iv(e) {
    var t = Oi(e);
    return wf(ea, t) ? wf(br, t) ? Df(t) ? yr : _u : br : ea;
  }
  function Ou(e) {
    var t = e.current.memoizedState;
    return t.isDehydrated;
  }
  var Yv;
  function IS(e) {
    Yv = e;
  }
  function YS(e) {
    Yv(e);
  }
  var _f;
  function qS(e) {
    _f = e;
  }
  var qv;
  function GS(e) {
    qv = e;
  }
  var Gv;
  function WS(e) {
    Gv = e;
  }
  var Wv;
  function KS(e) {
    Wv = e;
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
  function Kv(e, t) {
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
  function Qv(e) {
    var t = Li(e.target);
    if (t !== null) {
      var n = ji(t);
      if (n !== null) {
        var a = n.tag;
        if (a === te) {
          var r = Nv(n);
          if (r !== null) {
            e.blockedOn = r, Wv(e.priority, function() {
              qv(n);
            });
            return;
          }
        } else if (a === x) {
          var i = n.stateNode;
          if (Ou(i)) {
            e.blockedOn = xv(n);
            return;
          }
        }
      }
    }
    e.blockedOn = null;
  }
  function e0(e) {
    for (var t = Gv(), n = {
      blockedOn: null,
      target: e,
      priority: t
    }, a = 0; a < $r.length && wf(t, $r[a].priority); a++)
      ;
    $r.splice(a, 0, n), a === 0 && Qv(n);
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
  function Xv(e, t, n) {
    Vu(e) && n.delete(t);
  }
  function t0() {
    Of = !1, Pr !== null && Vu(Pr) && (Pr = null), Hr !== null && Vu(Hr) && (Hr = null), Br !== null && Vu(Br) && (Br = null), Po.forEach(Xv), Ho.forEach(Xv);
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
      Qv(l), l.blockedOn === null && $r.shift();
    }
  }
  var Sl = m.ReactCurrentBatchConfig, Mf = !0;
  function Jv(e) {
    Mf = !!e;
  }
  function n0() {
    return Mf;
  }
  function a0(e, t, n) {
    var a = Zv(t), r;
    switch (a) {
      case ea:
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
      dn(ea), Vf(e, t, n, a);
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
      Wf(e, t, a, Au, n), Kv(e, a);
      return;
    }
    if (ZS(r, e, t, n, a)) {
      a.stopPropagation();
      return;
    }
    if (Kv(e, a), t & Do && XS(e)) {
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
        if (u === te) {
          var c = Nv(l);
          if (c !== null)
            return c;
          i = null;
        } else if (u === x) {
          var h = l.stateNode;
          if (Ou(h))
            return xv(l);
          i = null;
        } else l !== i && (i = null);
      }
    }
    return Au = i, null;
  }
  function Zv(e) {
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
        return ea;
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
            return ea;
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
    return Yo = e, Lf = tg(), !0;
  }
  function f0() {
    Yo = null, Lf = null, qo = null;
  }
  function eg() {
    if (qo)
      return qo;
    var e, t = Lf, n = t.length, a, r = tg(), i = r.length;
    for (e = 0; e < n && t[e] === r[e]; e++)
      ;
    var l = n - e;
    for (a = 1; a <= l && t[n - a] === r[i - a]; a++)
      ;
    var u = a > 1 ? 1 - a : void 0;
    return qo = r.slice(e, u), qo;
  }
  function tg() {
    return "value" in Yo ? Yo.value : Yo.textContent;
  }
  function Lu(e) {
    var t, n = e.keyCode;
    return "charCode" in e ? (t = e.charCode, t === 0 && n === 13 && (t = 13)) : t = n, t === 10 && (t = 13), t >= 32 || t === 13 ? t : 0;
  }
  function ku() {
    return !0;
  }
  function ng() {
    return !1;
  }
  function ta(e) {
    function t(n, a, r, i, l) {
      this._reactName = n, this._targetInst = r, this.type = a, this.nativeEvent = i, this.target = l, this.currentTarget = null;
      for (var u in e)
        if (e.hasOwnProperty(u)) {
          var c = e[u];
          c ? this[u] = c(i) : this[u] = i[u];
        }
      var h = i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1;
      return h ? this.isDefaultPrevented = ku : this.isDefaultPrevented = ng, this.isPropagationStopped = ng, this;
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
  }, kf = ta(Rl), Go = Ie({}, Rl, {
    view: 0,
    detail: 0
  }), p0 = ta(Go), Uf, Ff, Wo;
  function m0(e) {
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
      return "movementX" in e ? e.movementX : (m0(e), Uf);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : Ff;
    }
  }), ag = ta(Uu), h0 = Ie({}, Uu, {
    dataTransfer: 0
  }), v0 = ta(h0), g0 = Ie({}, Go, {
    relatedTarget: 0
  }), zf = ta(g0), b0 = Ie({}, Rl, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), y0 = ta(b0), N0 = Ie({}, Rl, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), x0 = ta(N0), E0 = Ie({}, Rl, {
    data: 0
  }), rg = ta(E0), S0 = rg, R0 = {
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
  }), _0 = ta(w0), O0 = Ie({}, Uu, {
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
  }), ig = ta(O0), M0 = Ie({}, Go, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Pf
  }), V0 = ta(M0), A0 = Ie({}, Rl, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), L0 = ta(A0), k0 = Ie({}, Uu, {
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
  }), U0 = ta(k0), F0 = [9, 13, 27, 32], lg = 229, Hf = J && "CompositionEvent" in window, Ko = null;
  J && "documentMode" in document && (Ko = document.documentMode);
  var z0 = J && "TextEvent" in window && !Ko, og = J && (!Hf || Ko && Ko > 8 && Ko <= 11), sg = 32, ug = String.fromCharCode(sg);
  function P0() {
    qt("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), qt("onCompositionEnd", ["compositionend", "focusout", "keydown", "keypress", "keyup", "mousedown"]), qt("onCompositionStart", ["compositionstart", "focusout", "keydown", "keypress", "keyup", "mousedown"]), qt("onCompositionUpdate", ["compositionupdate", "focusout", "keydown", "keypress", "keyup", "mousedown"]);
  }
  var cg = !1;
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
    return e === "keydown" && t.keyCode === lg;
  }
  function dg(e, t) {
    switch (e) {
      case "keyup":
        return F0.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== lg;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function fg(e) {
    var t = e.detail;
    return typeof t == "object" && "data" in t ? t.data : null;
  }
  function pg(e) {
    return e.locale === "ko";
  }
  var Dl = !1;
  function I0(e, t, n, a, r) {
    var i, l;
    if (Hf ? i = B0(t) : Dl ? dg(t, a) && (i = "onCompositionEnd") : $0(t, a) && (i = "onCompositionStart"), !i)
      return null;
    og && !pg(a) && (!Dl && i === "onCompositionStart" ? Dl = d0(r) : i === "onCompositionEnd" && Dl && (l = eg()));
    var u = Bu(n, i);
    if (u.length > 0) {
      var c = new rg(i, t, null, a, r);
      if (e.push({
        event: c,
        listeners: u
      }), l)
        c.data = l;
      else {
        var h = fg(a);
        h !== null && (c.data = h);
      }
    }
  }
  function Y0(e, t) {
    switch (e) {
      case "compositionend":
        return fg(t);
      case "keypress":
        var n = t.which;
        return n !== sg ? null : (cg = !0, ug);
      case "textInput":
        var a = t.data;
        return a === ug && cg ? null : a;
      default:
        return null;
    }
  }
  function q0(e, t) {
    if (Dl) {
      if (e === "compositionend" || !Hf && dg(e, t)) {
        var n = eg();
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
        return og && !pg(t) ? null : t.data;
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
  function mg(e) {
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
  function hg(e, t, n, a) {
    dv(a);
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
    hg(t, Xo, e, zd(e)), hv(eR, t);
  }
  function eR(e) {
    Vg(e, 0);
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
  var vg = !1;
  J && (vg = Q0("input") && (!document.documentMode || document.documentMode > 9));
  function nR(e, t) {
    Qo = e, Xo = t, Qo.attachEvent("onpropertychange", bg);
  }
  function gg() {
    Qo && (Qo.detachEvent("onpropertychange", bg), Qo = null, Xo = null);
  }
  function bg(e) {
    e.propertyName === "value" && Fu(Xo) && Z0(e);
  }
  function aR(e, t, n) {
    e === "focusin" ? (gg(), nR(t, n)) : e === "focusout" && gg();
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
    !t || !t.controlled || e.type !== "number" || we(e, "number", e.value);
  }
  function uR(e, t, n, a, r, i, l) {
    var u = n ? Ol(n) : window, c, h;
    if (J0(u) ? c = tR : mg(u) ? vg ? c = oR : (c = rR, h = aR) : iR(u) && (c = lR), c) {
      var v = c(t, n);
      if (v) {
        hg(e, v, a, r);
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
          var H = ji(V);
          (V !== H || V.tag !== k && V.tag !== ee) && (V = null);
        }
      } else
        D = null, V = n;
      if (D !== V) {
        var fe = ag, De = "onMouseLeave", Ee = "onMouseEnter", Je = "mouse";
        (t === "pointerout" || t === "pointerover") && (fe = ig, De = "onPointerLeave", Ee = "onPointerEnter", Je = "pointer");
        var qe = D == null ? v : Ol(D), _ = V == null ? v : Ol(V), B = new fe(De, Je + "leave", D, a, r);
        B.target = qe, B.relatedTarget = _;
        var O = null, ne = Li(r);
        if (ne === n) {
          var ge = new fe(Ee, Je + "enter", V, a, r);
          ge.target = _, ge.relatedTarget = qe, O = ge;
        }
        LR(e, B, O, D, V);
      }
    }
  }
  function fR(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var na = typeof Object.is == "function" ? Object.is : fR;
  function Jo(e, t) {
    if (na(e, t))
      return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
      return !1;
    var n = Object.keys(e), a = Object.keys(t);
    if (n.length !== a.length)
      return !1;
    for (var r = 0; r < n.length; r++) {
      var i = n[r];
      if (!Ge.call(t, i) || !na(e[i], t[i]))
        return !1;
    }
    return !0;
  }
  function yg(e) {
    for (; e && e.firstChild; )
      e = e.firstChild;
    return e;
  }
  function pR(e) {
    for (; e; ) {
      if (e.nextSibling)
        return e.nextSibling;
      e = e.parentNode;
    }
  }
  function Ng(e, t) {
    for (var n = yg(e), a = 0, r = 0; n; ) {
      if (n.nodeType === fr) {
        if (r = a + n.textContent.length, a <= t && r >= t)
          return {
            node: n,
            offset: t - a
          };
        a = r;
      }
      n = yg(pR(n));
    }
  }
  function mR(e) {
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
      var h = Ng(e, l), v = Ng(e, u);
      if (h && v) {
        if (r.rangeCount === 1 && r.anchorNode === h.node && r.anchorOffset === h.offset && r.focusNode === v.node && r.focusOffset === v.offset)
          return;
        var C = n.createRange();
        C.setStart(h.node, h.offset), r.removeAllRanges(), l > u ? (r.addRange(C), r.extend(v.node, v.offset)) : (C.setEnd(v.node, v.offset), r.addRange(C));
      }
    }
  }
  function xg(e) {
    return e && e.nodeType === fr;
  }
  function Eg(e, t) {
    return !e || !t ? !1 : e === t ? !0 : xg(e) ? !1 : xg(t) ? Eg(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1;
  }
  function gR(e) {
    return e && e.ownerDocument && Eg(e.ownerDocument.documentElement, e);
  }
  function bR(e) {
    try {
      return typeof e.contentWindow.location.href == "string";
    } catch {
      return !1;
    }
  }
  function Sg() {
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
    var e = Sg();
    return {
      focusedElem: e,
      selectionRange: Bf(e) ? xR(e) : null
    };
  }
  function NR(e) {
    var t = Sg(), n = e.focusedElem, a = e.selectionRange;
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
    } : t = mR(e), t || {
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
    return e.window === e ? e.document : e.nodeType === pr ? e : e.ownerDocument;
  }
  function Rg(e, t, n) {
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
        (mg(u) || u.contentEditable === "true") && (Cl = u, $f = n, Zo = null);
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
        If = !1, Rg(e, a, r);
        break;
      case "selectionchange":
        if (SR)
          break;
      case "keydown":
      case "keyup":
        Rg(e, a, r);
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
  }, Yf = {}, Dg = {};
  J && (Dg = document.createElement("div").style, "AnimationEvent" in window || (delete jl.animationend.animation, delete jl.animationiteration.animation, delete jl.animationstart.animation), "TransitionEvent" in window || delete jl.transitionend.transition);
  function Pu(e) {
    if (Yf[e])
      return Yf[e];
    if (!jl[e])
      return e;
    var t = jl[e];
    for (var n in t)
      if (t.hasOwnProperty(n) && n in Dg)
        return Yf[e] = t[n];
    return e;
  }
  var Cg = Pu("animationend"), jg = Pu("animationiteration"), Tg = Pu("animationstart"), wg = Pu("transitionend"), _g = /* @__PURE__ */ new Map(), Og = ["abort", "auxClick", "cancel", "canPlay", "canPlayThrough", "click", "close", "contextMenu", "copy", "cut", "drag", "dragEnd", "dragEnter", "dragExit", "dragLeave", "dragOver", "dragStart", "drop", "durationChange", "emptied", "encrypted", "ended", "error", "gotPointerCapture", "input", "invalid", "keyDown", "keyPress", "keyUp", "load", "loadedData", "loadedMetadata", "loadStart", "lostPointerCapture", "mouseDown", "mouseMove", "mouseOut", "mouseOver", "mouseUp", "paste", "pause", "play", "playing", "pointerCancel", "pointerDown", "pointerMove", "pointerOut", "pointerOver", "pointerUp", "progress", "rateChange", "reset", "resize", "seeked", "seeking", "stalled", "submit", "suspend", "timeUpdate", "touchCancel", "touchEnd", "touchStart", "volumeChange", "scroll", "toggle", "touchMove", "waiting", "wheel"];
  function Ir(e, t) {
    _g.set(e, t), qt(t, [e]);
  }
  function TR() {
    for (var e = 0; e < Og.length; e++) {
      var t = Og[e], n = t.toLowerCase(), a = t[0].toUpperCase() + t.slice(1);
      Ir(n, "on" + a);
    }
    Ir(Cg, "onAnimationEnd"), Ir(jg, "onAnimationIteration"), Ir(Tg, "onAnimationStart"), Ir("dblclick", "onDoubleClick"), Ir("focusin", "onFocus"), Ir("focusout", "onBlur"), Ir(wg, "onTransitionEnd");
  }
  function wR(e, t, n, a, r, i, l) {
    var u = _g.get(t);
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
          c = ag;
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
        case Cg:
        case jg:
        case Tg:
          c = y0;
          break;
        case wg:
          c = L0;
          break;
        case "scroll":
          c = p0;
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
          c = ig;
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
  function Mg(e, t, n) {
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
        Mg(e, c, u), a = l;
      }
    else
      for (var h = 0; h < t.length; h++) {
        var v = t[h], C = v.instance, D = v.currentTarget, V = v.listener;
        if (C !== a && e.isPropagationStopped())
          return;
        Mg(e, V, D), a = C;
      }
  }
  function Vg(e, t) {
    for (var n = (t & Do) !== 0, a = 0; a < e.length; a++) {
      var r = e[a], i = r.event, l = r.listeners;
      OR(i, l, n);
    }
    zE();
  }
  function MR(e, t, n, a, r) {
    var i = zd(n), l = [];
    _R(l, e, a, n, i, t), Vg(l, t);
  }
  function Dt(e, t) {
    qf.has(e) || d('Did not expect a listenToNonDelegatedEvent() call for "%s". This is a bug in React. Please file an issue.', e);
    var n = !1, a = sC(t), r = kR(e);
    a.has(r) || (Ag(t, e, Fd, n), a.add(r));
  }
  function Gf(e, t, n) {
    qf.has(e) && !t && d('Did not expect a listenToNativeEvent() call for "%s" in the bubble phase. This is a bug in React. Please file an issue.', e);
    var a = 0;
    t && (a |= Do), Ag(n, e, a, t);
  }
  var Hu = "_reactListening" + Math.random().toString(36).slice(2);
  function ts(e) {
    if (!e[Hu]) {
      e[Hu] = !0, Ht.forEach(function(n) {
        n !== "selectionchange" && (qf.has(n) || Gf(n, !1, e), Gf(n, !0, e));
      });
      var t = e.nodeType === pr ? e : e.ownerDocument;
      t !== null && (t[Hu] || (t[Hu] = !0, Gf("selectionchange", !1, t)));
    }
  }
  function Ag(e, t, n, a, r) {
    var i = a0(e, t, n), l = void 0;
    Bd && (t === "touchstart" || t === "touchmove" || t === "wheel") && (l = !0), e = e, a ? l !== void 0 ? u0(e, t, i, l) : s0(e, t, i) : l !== void 0 ? c0(e, t, i, l) : o0(e, t, i);
  }
  function Lg(e, t) {
    return e === t || e.nodeType === $t && e.parentNode === t;
  }
  function Wf(e, t, n, a, r) {
    var i = a;
    if (!(t & uv) && !(t & Fd)) {
      var l = r;
      if (a !== null) {
        var u = a;
        e: for (; ; ) {
          if (u === null)
            return;
          var c = u.tag;
          if (c === x || c === T) {
            var h = u.stateNode.containerInfo;
            if (Lg(h, l))
              break;
            if (c === T)
              for (var v = u.return; v !== null; ) {
                var C = v.tag;
                if (C === x || C === T) {
                  var D = v.stateNode.containerInfo;
                  if (Lg(D, l))
                    return;
                }
                v = v.return;
              }
            for (; h !== null; ) {
              var V = Li(h);
              if (V === null)
                return;
              var L = V.tag;
              if (L === k || L === ee) {
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
    hv(function() {
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
  function kg(e, t, n, a, r) {
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
    a !== null && kg(e, t, a, i, !1), r !== null && n !== null && kg(e, n, r, i, !0);
  }
  function kR(e, t) {
    return e + "__bubble";
  }
  var qn = !1, as = "dangerouslySetInnerHTML", $u = "suppressContentEditableWarning", Yr = "suppressHydrationWarning", Ug = "autoFocus", Vi = "children", Ai = "style", Iu = "__html", Kf, Yu, rs, Fg, qu, zg, Pg;
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
  }, zg = J && !document.documentMode, rs = function(e, t, n) {
    if (!qn) {
      var a = Gu(n), r = Gu(t);
      r !== a && (qn = !0, d("Prop `%s` did not match. Server: %s Client: %s", e, JSON.stringify(r), JSON.stringify(a)));
    }
  }, Fg = function(e) {
    if (!qn) {
      qn = !0;
      var t = [];
      e.forEach(function(n) {
        t.push(n);
      }), d("Extra attributes from the server: %s", t);
    }
  }, qu = function(e, t) {
    t === !1 ? d("Expected `%s` listener to be a function, instead got `false`.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.", e, e, e) : d("Expected `%s` listener to be a function, instead got a value of `%s` type.", e, typeof t);
  }, Pg = function(e, t) {
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
    if (i !== r && (a && (qn || (qn = !0, d('Text content did not match. Server: "%s" Client: "%s"', i, r))), n && W))
      throw new Error("Text content does not match server-rendered HTML.");
  }
  function Hg(e) {
    return e.nodeType === pr ? e : e.ownerDocument;
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
          l && Object.freeze(l), av(t, l);
        else if (i === as) {
          var u = l ? l[Iu] : void 0;
          u != null && Jh(t, u);
        } else if (i === Vi)
          if (typeof l == "string") {
            var c = e !== "textarea" || l !== "";
            c && bu(t, l);
          } else typeof l == "number" && bu(t, "" + l);
        else i === $u || i === Yr || i === Ug || (Mt.hasOwnProperty(i) ? l != null && (typeof l != "function" && qu(i, l), i === "onScroll" && Dt("scroll", t)) : l != null && Ra(t, i, l, r));
      }
  }
  function HR(e, t, n, a) {
    for (var r = 0; r < t.length; r += 2) {
      var i = t[r], l = t[r + 1];
      i === Ai ? av(e, l) : i === as ? Jh(e, l) : i === Vi ? bu(e, l) : Ra(e, i, l, a);
    }
  }
  function BR(e, t, n, a) {
    var r, i = Hg(n), l, u = a;
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
    return Hg(t).createTextNode(e);
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
        Kh(e, n), i = _d(e, n), Dt("invalid", e);
        break;
      default:
        i = n;
    }
    switch (Ud(t, i), PR(t, e, a, i, r), t) {
      case "input":
        Ni(e), A(e, n, !1);
        break;
      case "textarea":
        Ni(e), Xh(e);
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
        } else c === as || c === Vi || c === $u || c === Yr || c === Ug || (Mt.hasOwnProperty(c) ? i || (i = []) : (i = i || []).push(c, null));
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
          var L = D ? D[Iu] : void 0, H = V ? V[Iu] : void 0;
          L != null && H !== L && (i = i || []).push(c, L);
        } else c === Vi ? (typeof D == "string" || typeof D == "number") && (i = i || []).push(c, "" + D) : c === $u || c === Yr || (Mt.hasOwnProperty(c) ? (D != null && (typeof D != "function" && qu(c, D), c === "onScroll" && Dt("scroll", e)), !i && V !== D && (i = [])) : (i = i || []).push(c, D));
    }
    return v && (dE(v, u[Ai]), (i = i || []).push(Ai, v)), i;
  }
  function qR(e, t, n, a, r) {
    n === "input" && r.type === "radio" && r.name != null && p(e, r);
    var i = Ei(n, a), l = Ei(n, r);
    switch (HR(e, t, i, l), n) {
      case "input":
        N(e, r);
        break;
      case "textarea":
        Qh(e, r);
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
        Kh(e, n), Dt("invalid", e);
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
        var H = n[L];
        if (L === Vi)
          typeof H == "string" ? e.textContent !== H && (n[Yr] !== !0 && Wu(e.textContent, H, i, l), V = [Vi, H]) : typeof H == "number" && e.textContent !== "" + H && (n[Yr] !== !0 && Wu(e.textContent, H, i, l), V = [Vi, "" + H]);
        else if (Mt.hasOwnProperty(L))
          H != null && (typeof H != "function" && qu(L, H), L === "onScroll" && Dt("scroll", e));
        else if (l && // Convince Flow we've calculated it (it's DEV-only in this method.)
        typeof u == "boolean") {
          var fe = void 0, De = Vt(L);
          if (n[Yr] !== !0) {
            if (!(L === $u || L === Yr || // Controlled attributes are not validated
            // TODO: Only ignore them on controlled tags.
            L === "value" || L === "checked" || L === "selected")) {
              if (L === as) {
                var Ee = e.innerHTML, Je = H ? H[Iu] : void 0;
                if (Je != null) {
                  var qe = Pg(e, Je);
                  qe !== Ee && rs(L, Ee, qe);
                }
              } else if (L === Ai) {
                if (c.delete(L), zg) {
                  var _ = uE(H);
                  fe = e.getAttribute("style"), _ !== fe && rs(L, fe, _);
                }
              } else if (u && !it)
                c.delete(L.toLowerCase()), fe = fi(e, L, H), H !== fe && rs(L, fe, H);
              else if (!wt(L, De, u) && !Cn(L, H, De, u)) {
                var B = !1;
                if (De !== null)
                  c.delete(De.attributeName), fe = el(e, L, H, De);
                else {
                  var O = a;
                  if (O === dr && (O = Md(t)), O === dr)
                    c.delete(L.toLowerCase());
                  else {
                    var ne = GR(L);
                    ne !== null && ne !== L && (B = !0, c.delete(ne)), c.delete(L);
                  }
                  fe = fi(e, L, H);
                }
                var ge = it;
                !ge && H !== fe && !B && rs(L, fe, H);
              }
            }
          }
        }
      }
    switch (l && // $FlowFixMe - Should be inferred as not undefined.
    c.size > 0 && n[Yr] !== !0 && Fg(c), t) {
      case "input":
        Ni(e), A(e, n, !0);
        break;
      case "textarea":
        Ni(e), Xh(e);
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
        z(e, n);
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
    var XR = ["address", "applet", "area", "article", "aside", "base", "basefont", "bgsound", "blockquote", "body", "br", "button", "caption", "center", "col", "colgroup", "dd", "details", "dir", "div", "dl", "dt", "embed", "fieldset", "figcaption", "figure", "footer", "form", "frame", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "iframe", "img", "input", "isindex", "li", "link", "listing", "main", "marquee", "menu", "menuitem", "meta", "nav", "noembed", "noframes", "noscript", "object", "ol", "p", "param", "plaintext", "pre", "script", "section", "select", "source", "style", "summary", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "title", "tr", "track", "ul", "wbr", "xmp"], Bg = [
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
    ], JR = Bg.concat(["button"]), ZR = ["dd", "dt", "li", "option", "optgroup", "p", "rp", "rt"], $g = {
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
      var n = Ie({}, e || $g), a = {
        tag: t
      };
      return Bg.indexOf(t) !== -1 && (n.aTagInScope = null, n.buttonTagInScope = null, n.nobrTagInScope = null), JR.indexOf(t) !== -1 && (n.pTagInButtonScope = null), XR.indexOf(t) !== -1 && t !== "address" && t !== "div" && t !== "p" && (n.listItemTagAutoclosing = null, n.dlItemTagAutoclosing = null), n.current = a, t === "form" && (n.formTag = a), t === "a" && (n.aTagInScope = a), t === "button" && (n.buttonTagInScope = a), t === "nobr" && (n.nobrTagInScope = a), t === "p" && (n.pTagInButtonScope = a), t === "li" && (n.listItemTagAutoclosing = a), (t === "dd" || t === "dt") && (n.dlItemTagAutoclosing = a), n;
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
    }, Ig = {};
    is = function(e, t, n) {
      n = n || $g;
      var a = n.current, r = a && a.tag;
      t != null && (e != null && d("validateDOMNesting: when childText is passed, childTag should be null"), e = "#text");
      var i = eD(e, r) ? null : a, l = i ? null : tD(e, n), u = i || l;
      if (u) {
        var c = u.tag, h = !!i + "|" + e + "|" + c;
        if (!Ig[h]) {
          Ig[h] = !0;
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
  var Qu = "suppressHydrationWarning", Xu = "$", Ju = "/$", os = "$?", ss = "$!", nD = "style", ep = null, tp = null;
  function aD(e) {
    var t, n, a = e.nodeType;
    switch (a) {
      case pr:
      case Ad: {
        t = a === pr ? "#document" : "#fragment";
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
    ep = n0(), tp = yR();
    var t = null;
    return Jv(!1), t;
  }
  function lD(e) {
    NR(tp), Jv(ep), ep = null, tp = null;
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
    return ds(r, h), up(h, t), h;
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
  function np(e, t) {
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
    return e === void 0 ? yr : Zv(e.type);
  }
  var ap = typeof setTimeout == "function" ? setTimeout : void 0, pD = typeof clearTimeout == "function" ? clearTimeout : void 0, rp = -1, Yg = typeof Promise == "function" ? Promise : void 0, mD = typeof queueMicrotask == "function" ? queueMicrotask : typeof Yg < "u" ? function(e) {
    return Yg.resolve(null).then(e).catch(hD);
  } : ap;
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
    qR(e, t, n, a, r), up(e, r);
  }
  function qg(e) {
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
  function ip(e, t) {
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
    e.nodeType === $t ? ip(e.parentNode, t) : e.nodeType === Yn && ip(e, t), Io(e);
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
    e.nodeType === Yn ? e.textContent = "" : e.nodeType === pr && e.documentElement && e.removeChild(e.documentElement);
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
  function Gg(e) {
    return e.data === os;
  }
  function lp(e) {
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
    ds(i, e), up(e, n);
    var u;
    {
      var c = r;
      u = c.namespace;
    }
    var h = (i.mode & Qe) !== je;
    return WR(e, t, n, u, a, h, l);
  }
  function PD(e, t, n, a) {
    return ds(n, e), n.mode & Qe, KR(e, t);
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
  function Wg(e) {
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
  var wl = Math.random().toString(36).slice(2), _l = "__reactFiber$" + wl, op = "__reactProps$" + wl, cs = "__reactContainer$" + wl, sp = "__reactEvents$" + wl, iC = "__reactListeners$" + wl, lC = "__reactHandles$" + wl;
  function oC(e) {
    delete e[_l], delete e[op], delete e[sp], delete e[iC], delete e[lC];
  }
  function ds(e, t) {
    t[_l] = e;
  }
  function ec(e, t) {
    t[cs] = e;
  }
  function Kg(e) {
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
          for (var r = Wg(e); r !== null; ) {
            var i = r[_l];
            if (i)
              return i;
            r = Wg(r);
          }
        return t;
      }
      e = n, n = e.parentNode;
    }
    return null;
  }
  function qr(e) {
    var t = e[_l] || e[cs];
    return t && (t.tag === k || t.tag === ee || t.tag === te || t.tag === x) ? t : null;
  }
  function Ol(e) {
    if (e.tag === k || e.tag === ee)
      return e.stateNode;
    throw new Error("getNodeFromInstance: Invalid argument.");
  }
  function tc(e) {
    return e[op] || null;
  }
  function up(e, t) {
    e[op] = t;
  }
  function sC(e) {
    var t = e[sp];
    return t === void 0 && (t = e[sp] = /* @__PURE__ */ new Set()), t;
  }
  var Qg = {}, Xg = m.ReactDebugCurrentFrame;
  function nc(e) {
    if (e) {
      var t = e._owner, n = mo(e.type, e._source, t ? t.type : null);
      Xg.setExtraStackFrame(n);
    } else
      Xg.setExtraStackFrame(null);
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
          u && !(u instanceof Error) && (nc(r), d("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", a || "React class", n, l, typeof u), nc(null)), u instanceof Error && !(u.message in Qg) && (Qg[u.message] = !0, nc(r), d("Failed %s type: %s", n, u.message), nc(null));
        }
    }
  }
  var cp = [], ac;
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
    t !== ac[Nr] && d("Unexpected Fiber popped."), e.current = cp[Nr], cp[Nr] = null, ac[Nr] = null, Nr--;
  }
  function _n(e, t, n) {
    Nr++, cp[Nr] = e.current, ac[Nr] = n, e.current = t;
  }
  var dp;
  dp = {};
  var aa = {};
  Object.freeze(aa);
  var xr = Gr(aa), Qa = Gr(!1), fp = aa;
  function Ml(e, t, n) {
    return n && Xa(t) ? fp : xr.current;
  }
  function Jg(e, t, n) {
    {
      var a = e.stateNode;
      a.__reactInternalMemoizedUnmaskedChildContext = t, a.__reactInternalMemoizedMaskedChildContext = n;
    }
  }
  function Vl(e, t) {
    {
      var n = e.type, a = n.contextTypes;
      if (!a)
        return aa;
      var r = e.stateNode;
      if (r && r.__reactInternalMemoizedUnmaskedChildContext === t)
        return r.__reactInternalMemoizedMaskedChildContext;
      var i = {};
      for (var l in a)
        i[l] = t[l];
      {
        var u = Fe(e) || "Unknown";
        _a(a, i, "context", u);
      }
      return r && Jg(e, t, i), i;
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
  function pp(e) {
    wn(Qa, e), wn(xr, e);
  }
  function Zg(e, t, n) {
    {
      if (xr.current !== aa)
        throw new Error("Unexpected context found on stack. This error is likely caused by a bug in React. Please file an issue.");
      _n(xr, t, e), _n(Qa, n, e);
    }
  }
  function eb(e, t, n) {
    {
      var a = e.stateNode, r = t.childContextTypes;
      if (typeof a.getChildContext != "function") {
        {
          var i = Fe(e) || "Unknown";
          dp[i] || (dp[i] = !0, d("%s.childContextTypes is specified but there is no getChildContext() method on the instance. You can either define getChildContext() on %s or remove childContextTypes from it.", i, i));
        }
        return n;
      }
      var l = a.getChildContext();
      for (var u in l)
        if (!(u in r))
          throw new Error((Fe(e) || "Unknown") + '.getChildContext(): key "' + u + '" is not defined in childContextTypes.');
      {
        var c = Fe(e) || "Unknown";
        _a(r, l, "child context", c);
      }
      return Ie({}, n, l);
    }
  }
  function lc(e) {
    {
      var t = e.stateNode, n = t && t.__reactInternalMemoizedMergedChildContext || aa;
      return fp = xr.current, _n(xr, n, e), _n(Qa, Qa.current, e), !0;
    }
  }
  function tb(e, t, n) {
    {
      var a = e.stateNode;
      if (!a)
        throw new Error("Expected to have an instance by this point. This error is likely caused by a bug in React. Please file an issue.");
      if (n) {
        var r = eb(e, t, fp);
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
  var Wr = 0, oc = 1, Er = null, mp = !1, hp = !1;
  function nb(e) {
    Er === null ? Er = [e] : Er.push(e);
  }
  function cC(e) {
    mp = !0, nb(e);
  }
  function ab() {
    mp && Kr();
  }
  function Kr() {
    if (!hp && Er !== null) {
      hp = !0;
      var e = 0, t = wa();
      try {
        var n = !0, a = Er;
        for (dn(ea); e < a.length; e++) {
          var r = a[e];
          do
            r = r(n);
          while (r !== null);
        }
        Er = null, mp = !1;
      } catch (i) {
        throw Er !== null && (Er = Er.slice(e + 1)), jv(Su, Kr), i;
      } finally {
        dn(t), hp = !1;
      }
    }
    return null;
  }
  var Al = [], Ll = 0, sc = null, uc = 0, fa = [], pa = 0, ki = null, Sr = 1, Rr = "";
  function dC(e) {
    return Fi(), (e.flags & yv) !== _e;
  }
  function fC(e) {
    return Fi(), uc;
  }
  function pC() {
    var e = Rr, t = Sr, n = t & ~mC(t);
    return n.toString(32) + e;
  }
  function Ui(e, t) {
    Fi(), Al[Ll++] = uc, Al[Ll++] = sc, sc = e, uc = t;
  }
  function rb(e, t, n) {
    Fi(), fa[pa++] = Sr, fa[pa++] = Rr, fa[pa++] = ki, ki = e;
    var a = Sr, r = Rr, i = cc(a) - 1, l = a & ~(1 << i), u = n + 1, c = cc(t) + i;
    if (c > 30) {
      var h = i - i % 5, v = (1 << h) - 1, C = (l & v).toString(32), D = l >> h, V = i - h, L = cc(t) + V, H = u << V, fe = H | D, De = C + r;
      Sr = 1 << L | fe, Rr = De;
    } else {
      var Ee = u << i, Je = Ee | l, qe = r;
      Sr = 1 << c | Je, Rr = qe;
    }
  }
  function vp(e) {
    Fi();
    var t = e.return;
    if (t !== null) {
      var n = 1, a = 0;
      Ui(e, n), rb(e, n, a);
    }
  }
  function cc(e) {
    return 32 - Vv(e);
  }
  function mC(e) {
    return 1 << cc(e) - 1;
  }
  function gp(e) {
    for (; e === sc; )
      sc = Al[--Ll], Al[Ll] = null, uc = Al[--Ll], Al[Ll] = null;
    for (; e === ki; )
      ki = fa[--pa], fa[pa] = null, Rr = fa[--pa], fa[pa] = null, Sr = fa[--pa], fa[pa] = null;
  }
  function hC() {
    return Fi(), ki !== null ? {
      id: Sr,
      overflow: Rr
    } : null;
  }
  function vC(e, t) {
    Fi(), fa[pa++] = Sr, fa[pa++] = Rr, fa[pa++] = ki, Sr = t.id, Rr = t.overflow, ki = e;
  }
  function Fi() {
    gn() || d("Expected to be hydrating. This is a bug in React. Please file an issue.");
  }
  var vn = null, ma = null, Oa = !1, zi = !1, Qr = null;
  function gC() {
    Oa && d("We should not be hydrating here. This is a bug in React. Please file a bug.");
  }
  function ib() {
    zi = !0;
  }
  function bC() {
    return zi;
  }
  function yC(e) {
    var t = e.stateNode.containerInfo;
    return ma = UD(t), vn = e, Oa = !0, Qr = null, zi = !1, !0;
  }
  function NC(e, t, n) {
    return ma = FD(t), vn = e, Oa = !0, Qr = null, zi = !1, n !== null && vC(e, n), !0;
  }
  function lb(e, t) {
    switch (e.tag) {
      case x: {
        WD(e.stateNode.containerInfo, t);
        break;
      }
      case k: {
        var n = (e.mode & Qe) !== je;
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
      case te: {
        var a = e.memoizedState;
        a.dehydrated !== null && KD(a.dehydrated, t);
        break;
      }
    }
  }
  function ob(e, t) {
    lb(e, t);
    var n = RT();
    n.stateNode = t, n.return = e;
    var a = e.deletions;
    a === null ? (e.deletions = [n], e.flags |= Si) : a.push(n);
  }
  function bp(e, t) {
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
            case ee:
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
              var c = t.type, h = t.pendingProps, v = (e.mode & Qe) !== je;
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
            case ee: {
              var C = t.pendingProps, D = (e.mode & Qe) !== je;
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
        case te: {
          var V = e.memoizedState, L = V.dehydrated;
          if (L !== null) switch (t.tag) {
            case k:
              var H = t.type;
              t.pendingProps, ZD(L, H);
              break;
            case ee:
              var fe = t.pendingProps;
              eC(L, fe);
              break;
          }
          break;
        }
        default:
          return;
      }
    }
  }
  function sb(e, t) {
    t.flags = t.flags & ~hr | It, bp(e, t);
  }
  function ub(e, t) {
    switch (e.tag) {
      case k: {
        var n = e.type;
        e.pendingProps;
        var a = OD(t, n);
        return a !== null ? (e.stateNode = a, vn = e, ma = kD(a), !0) : !1;
      }
      case ee: {
        var r = e.pendingProps, i = MD(t, r);
        return i !== null ? (e.stateNode = i, vn = e, ma = null, !0) : !1;
      }
      case te: {
        var l = VD(t);
        if (l !== null) {
          var u = {
            dehydrated: l,
            treeContext: hC(),
            retryLane: Jn
          };
          e.memoizedState = u;
          var c = DT(l);
          return c.return = e, e.child = c, vn = e, ma = null, !0;
        }
        return !1;
      }
      default:
        return !1;
    }
  }
  function yp(e) {
    return (e.mode & Qe) !== je && (e.flags & rt) === _e;
  }
  function Np(e) {
    throw new Error("Hydration failed because the initial UI does not match what was rendered on the server.");
  }
  function xp(e) {
    if (Oa) {
      var t = ma;
      if (!t) {
        yp(e) && (bp(vn, e), Np()), sb(vn, e), Oa = !1, vn = e;
        return;
      }
      var n = t;
      if (!ub(e, t)) {
        yp(e) && (bp(vn, e), Np()), t = us(n);
        var a = vn;
        if (!t || !ub(e, t)) {
          sb(vn, e), Oa = !1, vn = e;
          return;
        }
        ob(a, n);
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
            var i = r.stateNode.containerInfo, l = (r.mode & Qe) !== je;
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
            var u = r.type, c = r.memoizedProps, h = r.stateNode, v = (r.mode & Qe) !== je;
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
  function cb(e) {
    for (var t = e.return; t !== null && t.tag !== k && t.tag !== x && t.tag !== te; )
      t = t.return;
    vn = t;
  }
  function dc(e) {
    if (e !== vn)
      return !1;
    if (!Oa)
      return cb(e), Oa = !0, !1;
    if (e.tag !== x && (e.tag !== k || YD(e.type) && !np(e.type, e.memoizedProps))) {
      var t = ma;
      if (t)
        if (yp(e))
          db(e), Np();
        else
          for (; t; )
            ob(e, t), t = us(t);
    }
    return cb(e), e.tag === te ? ma = RC(e) : ma = vn ? us(e.stateNode) : null, !0;
  }
  function DC() {
    return Oa && ma !== null;
  }
  function db(e) {
    for (var t = ma; t; )
      lb(e, t), t = us(t);
  }
  function kl() {
    vn = null, ma = null, Oa = !1, zi = !1;
  }
  function fb() {
    Qr !== null && (iN(Qr), Qr = null);
  }
  function gn() {
    return Oa;
  }
  function Ep(e) {
    Qr === null ? Qr = [e] : Qr.push(e);
  }
  var CC = m.ReactCurrentBatchConfig, jC = null;
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
    }, ps = [], ms = [], hs = [], vs = [], gs = [], bs = [], Hi = /* @__PURE__ */ new Set();
    Ma.recordUnsafeLifecycleWarnings = function(e, t) {
      Hi.has(e.type) || (typeof t.componentWillMount == "function" && // Don't warn about react-lifecycles-compat polyfilled components.
      t.componentWillMount.__suppressDeprecationWarning !== !0 && ps.push(e), e.mode & Lt && typeof t.UNSAFE_componentWillMount == "function" && ms.push(e), typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps.__suppressDeprecationWarning !== !0 && hs.push(e), e.mode & Lt && typeof t.UNSAFE_componentWillReceiveProps == "function" && vs.push(e), typeof t.componentWillUpdate == "function" && t.componentWillUpdate.__suppressDeprecationWarning !== !0 && gs.push(e), e.mode & Lt && typeof t.UNSAFE_componentWillUpdate == "function" && bs.push(e));
    }, Ma.flushPendingUnsafeLifecycleWarnings = function() {
      var e = /* @__PURE__ */ new Set();
      ps.length > 0 && (ps.forEach(function(D) {
        e.add(Fe(D) || "Component"), Hi.add(D.type);
      }), ps = []);
      var t = /* @__PURE__ */ new Set();
      ms.length > 0 && (ms.forEach(function(D) {
        t.add(Fe(D) || "Component"), Hi.add(D.type);
      }), ms = []);
      var n = /* @__PURE__ */ new Set();
      hs.length > 0 && (hs.forEach(function(D) {
        n.add(Fe(D) || "Component"), Hi.add(D.type);
      }), hs = []);
      var a = /* @__PURE__ */ new Set();
      vs.length > 0 && (vs.forEach(function(D) {
        a.add(Fe(D) || "Component"), Hi.add(D.type);
      }), vs = []);
      var r = /* @__PURE__ */ new Set();
      gs.length > 0 && (gs.forEach(function(D) {
        r.add(Fe(D) || "Component"), Hi.add(D.type);
      }), gs = []);
      var i = /* @__PURE__ */ new Set();
      if (bs.length > 0 && (bs.forEach(function(D) {
        i.add(Fe(D) || "Component"), Hi.add(D.type);
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
            a.add(Fe(i) || "Component"), pb.add(i.type);
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
      ps = [], ms = [], hs = [], vs = [], gs = [], bs = [], fc = /* @__PURE__ */ new Map();
    };
  }
  var Sp, Rp, Dp, Cp, jp, mb = function(e, t) {
  };
  Sp = !1, Rp = !1, Dp = {}, Cp = {}, jp = {}, mb = function(e, t) {
    if (!(e === null || typeof e != "object") && !(!e._store || e._store.validated || e.key != null)) {
      if (typeof e._store != "object")
        throw new Error("React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue.");
      e._store.validated = !0;
      var n = Fe(t) || "Component";
      Cp[n] || (Cp[n] = !0, d('Each child in a list should have a unique "key" prop. See https://reactjs.org/link/warning-keys for more information.'));
    }
  };
  function _C(e) {
    return e.prototype && e.prototype.isReactComponent;
  }
  function ys(e, t, n) {
    var a = n.ref;
    if (a !== null && typeof a != "function" && typeof a != "object") {
      if ((e.mode & Lt || ze) && // We warn in ReactElement.js if owner and self are equal for string refs
      // because these cannot be automatically converted to an arrow function
      // using a codemod. Therefore, we don't have to warn about string refs again.
      !(n._owner && n._self && n._owner.stateNode !== n._self) && // Will already throw with "Function components cannot have string refs"
      !(n._owner && n._owner.tag !== j) && // Will already warn with "Function components cannot be given refs"
      !(typeof n.type == "function" && !_C(n.type)) && // Will already throw with "Element ref was specified as a string (someStringRef) but no owner was set"
      n._owner) {
        var r = Fe(e) || "Component";
        Dp[r] || (d('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. We recommend using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', r, a), Dp[r] = !0);
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
  function pc(e, t) {
    var n = Object.prototype.toString.call(t);
    throw new Error("Objects are not valid as a React child (found: " + (n === "[object Object]" ? "object with keys {" + Object.keys(t).join(", ") + "}" : n) + "). If you meant to render a collection of children, use an array instead.");
  }
  function mc(e) {
    {
      var t = Fe(e) || "Component";
      if (jp[t])
        return;
      jp[t] = !0, d("Functions are not valid as a React child. This may happen if you return a Component instead of <Component /> from render. Or maybe you meant to call this function rather than return it.");
    }
  }
  function hb(e) {
    var t = e._payload, n = e._init;
    return n(t);
  }
  function vb(e) {
    function t(_, B) {
      if (e) {
        var O = _.deletions;
        O === null ? (_.deletions = [B], _.flags |= Si) : O.push(B);
      }
    }
    function n(_, B) {
      if (!e)
        return null;
      for (var O = B; O !== null; )
        t(_, O), O = O.sibling;
      return null;
    }
    function a(_, B) {
      for (var O = /* @__PURE__ */ new Map(), ne = B; ne !== null; )
        ne.key !== null ? O.set(ne.key, ne) : O.set(ne.index, ne), ne = ne.sibling;
      return O;
    }
    function r(_, B) {
      var O = Qi(_, B);
      return O.index = 0, O.sibling = null, O;
    }
    function i(_, B, O) {
      if (_.index = O, !e)
        return _.flags |= yv, B;
      var ne = _.alternate;
      if (ne !== null) {
        var ge = ne.index;
        return ge < B ? (_.flags |= It, B) : ge;
      } else
        return _.flags |= It, B;
    }
    function l(_) {
      return e && _.alternate === null && (_.flags |= It), _;
    }
    function u(_, B, O, ne) {
      if (B === null || B.tag !== ee) {
        var ge = Eh(O, _.mode, ne);
        return ge.return = _, ge;
      } else {
        var me = r(B, O);
        return me.return = _, me;
      }
    }
    function c(_, B, O, ne) {
      var ge = O.type;
      if (ge === Ia)
        return v(_, B, O.props.children, ne, O.key);
      if (B !== null && (B.elementType === ge || // Keep this check inline so it only runs on the false path:
      xN(B, O) || // Lazy types should reconcile their resolved type.
      // We need to do this after the Hot Reloading check above,
      // because hot reloading has different semantics than prod because
      // it doesn't resuspend. So we can't let the call below suspend.
      typeof ge == "object" && ge !== null && ge.$$typeof === Ce && hb(ge) === B.type)) {
        var me = r(B, O.props);
        return me.ref = ys(_, B, O), me.return = _, me._debugSource = O._source, me._debugOwner = O._owner, me;
      }
      var Oe = xh(O, _.mode, ne);
      return Oe.ref = ys(_, B, O), Oe.return = _, Oe;
    }
    function h(_, B, O, ne) {
      if (B === null || B.tag !== T || B.stateNode.containerInfo !== O.containerInfo || B.stateNode.implementation !== O.implementation) {
        var ge = Sh(O, _.mode, ne);
        return ge.return = _, ge;
      } else {
        var me = r(B, O.children || []);
        return me.return = _, me;
      }
    }
    function v(_, B, O, ne, ge) {
      if (B === null || B.tag !== pe) {
        var me = oi(O, _.mode, ne, ge);
        return me.return = _, me;
      } else {
        var Oe = r(B, O);
        return Oe.return = _, Oe;
      }
    }
    function C(_, B, O) {
      if (typeof B == "string" && B !== "" || typeof B == "number") {
        var ne = Eh("" + B, _.mode, O);
        return ne.return = _, ne;
      }
      if (typeof B == "object" && B !== null) {
        switch (B.$$typeof) {
          case ca: {
            var ge = xh(B, _.mode, O);
            return ge.ref = ys(_, null, B), ge.return = _, ge;
          }
          case Xn: {
            var me = Sh(B, _.mode, O);
            return me.return = _, me;
          }
          case Ce: {
            var Oe = B._payload, Ue = B._init;
            return C(_, Ue(Oe), O);
          }
        }
        if (Ye(B) || Ca(B)) {
          var mt = oi(B, _.mode, O, null);
          return mt.return = _, mt;
        }
        pc(_, B);
      }
      return typeof B == "function" && mc(_), null;
    }
    function D(_, B, O, ne) {
      var ge = B !== null ? B.key : null;
      if (typeof O == "string" && O !== "" || typeof O == "number")
        return ge !== null ? null : u(_, B, "" + O, ne);
      if (typeof O == "object" && O !== null) {
        switch (O.$$typeof) {
          case ca:
            return O.key === ge ? c(_, B, O, ne) : null;
          case Xn:
            return O.key === ge ? h(_, B, O, ne) : null;
          case Ce: {
            var me = O._payload, Oe = O._init;
            return D(_, B, Oe(me), ne);
          }
        }
        if (Ye(O) || Ca(O))
          return ge !== null ? null : v(_, B, O, ne, null);
        pc(_, O);
      }
      return typeof O == "function" && mc(_), null;
    }
    function V(_, B, O, ne, ge) {
      if (typeof ne == "string" && ne !== "" || typeof ne == "number") {
        var me = _.get(O) || null;
        return u(B, me, "" + ne, ge);
      }
      if (typeof ne == "object" && ne !== null) {
        switch (ne.$$typeof) {
          case ca: {
            var Oe = _.get(ne.key === null ? O : ne.key) || null;
            return c(B, Oe, ne, ge);
          }
          case Xn: {
            var Ue = _.get(ne.key === null ? O : ne.key) || null;
            return h(B, Ue, ne, ge);
          }
          case Ce:
            var mt = ne._payload, et = ne._init;
            return V(_, B, O, et(mt), ge);
        }
        if (Ye(ne) || Ca(ne)) {
          var Pt = _.get(O) || null;
          return v(B, Pt, ne, ge, null);
        }
        pc(B, ne);
      }
      return typeof ne == "function" && mc(B), null;
    }
    function L(_, B, O) {
      {
        if (typeof _ != "object" || _ === null)
          return B;
        switch (_.$$typeof) {
          case ca:
          case Xn:
            mb(_, O);
            var ne = _.key;
            if (typeof ne != "string")
              break;
            if (B === null) {
              B = /* @__PURE__ */ new Set(), B.add(ne);
              break;
            }
            if (!B.has(ne)) {
              B.add(ne);
              break;
            }
            d("Encountered two children with the same key, `%s`. Keys should be unique so that components maintain their identity across updates. Non-unique keys may cause children to be duplicated and/or omitted — the behavior is unsupported and could change in a future version.", ne);
            break;
          case Ce:
            var ge = _._payload, me = _._init;
            L(me(ge), B, O);
            break;
        }
      }
      return B;
    }
    function H(_, B, O, ne) {
      for (var ge = null, me = 0; me < O.length; me++) {
        var Oe = O[me];
        ge = L(Oe, ge, _);
      }
      for (var Ue = null, mt = null, et = B, Pt = 0, tt = 0, kt = null; et !== null && tt < O.length; tt++) {
        et.index > tt ? (kt = et, et = null) : kt = et.sibling;
        var Mn = D(_, et, O[tt], ne);
        if (Mn === null) {
          et === null && (et = kt);
          break;
        }
        e && et && Mn.alternate === null && t(_, et), Pt = i(Mn, Pt, tt), mt === null ? Ue = Mn : mt.sibling = Mn, mt = Mn, et = kt;
      }
      if (tt === O.length) {
        if (n(_, et), gn()) {
          var Rn = tt;
          Ui(_, Rn);
        }
        return Ue;
      }
      if (et === null) {
        for (; tt < O.length; tt++) {
          var ia = C(_, O[tt], ne);
          ia !== null && (Pt = i(ia, Pt, tt), mt === null ? Ue = ia : mt.sibling = ia, mt = ia);
        }
        if (gn()) {
          var $n = tt;
          Ui(_, $n);
        }
        return Ue;
      }
      for (var In = a(_, et); tt < O.length; tt++) {
        var Vn = V(In, _, tt, O[tt], ne);
        Vn !== null && (e && Vn.alternate !== null && In.delete(Vn.key === null ? tt : Vn.key), Pt = i(Vn, Pt, tt), mt === null ? Ue = Vn : mt.sibling = Vn, mt = Vn);
      }
      if (e && In.forEach(function(to) {
        return t(_, to);
      }), gn()) {
        var Or = tt;
        Ui(_, Or);
      }
      return Ue;
    }
    function fe(_, B, O, ne) {
      var ge = Ca(O);
      if (typeof ge != "function")
        throw new Error("An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.");
      {
        typeof Symbol == "function" && // $FlowFixMe Flow doesn't know about toStringTag
        O[Symbol.toStringTag] === "Generator" && (Rp || d("Using Generators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. Keep in mind you might need to polyfill these features for older browsers."), Rp = !0), O.entries === ge && (Sp || d("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), Sp = !0);
        var me = ge.call(O);
        if (me)
          for (var Oe = null, Ue = me.next(); !Ue.done; Ue = me.next()) {
            var mt = Ue.value;
            Oe = L(mt, Oe, _);
          }
      }
      var et = ge.call(O);
      if (et == null)
        throw new Error("An iterable object provided no iterator.");
      for (var Pt = null, tt = null, kt = B, Mn = 0, Rn = 0, ia = null, $n = et.next(); kt !== null && !$n.done; Rn++, $n = et.next()) {
        kt.index > Rn ? (ia = kt, kt = null) : ia = kt.sibling;
        var In = D(_, kt, $n.value, ne);
        if (In === null) {
          kt === null && (kt = ia);
          break;
        }
        e && kt && In.alternate === null && t(_, kt), Mn = i(In, Mn, Rn), tt === null ? Pt = In : tt.sibling = In, tt = In, kt = ia;
      }
      if ($n.done) {
        if (n(_, kt), gn()) {
          var Vn = Rn;
          Ui(_, Vn);
        }
        return Pt;
      }
      if (kt === null) {
        for (; !$n.done; Rn++, $n = et.next()) {
          var Or = C(_, $n.value, ne);
          Or !== null && (Mn = i(Or, Mn, Rn), tt === null ? Pt = Or : tt.sibling = Or, tt = Or);
        }
        if (gn()) {
          var to = Rn;
          Ui(_, to);
        }
        return Pt;
      }
      for (var Xs = a(_, kt); !$n.done; Rn++, $n = et.next()) {
        var ir = V(Xs, _, Rn, $n.value, ne);
        ir !== null && (e && ir.alternate !== null && Xs.delete(ir.key === null ? Rn : ir.key), Mn = i(ir, Mn, Rn), tt === null ? Pt = ir : tt.sibling = ir, tt = ir);
      }
      if (e && Xs.forEach(function(nw) {
        return t(_, nw);
      }), gn()) {
        var tw = Rn;
        Ui(_, tw);
      }
      return Pt;
    }
    function De(_, B, O, ne) {
      if (B !== null && B.tag === ee) {
        n(_, B.sibling);
        var ge = r(B, O);
        return ge.return = _, ge;
      }
      n(_, B);
      var me = Eh(O, _.mode, ne);
      return me.return = _, me;
    }
    function Ee(_, B, O, ne) {
      for (var ge = O.key, me = B; me !== null; ) {
        if (me.key === ge) {
          var Oe = O.type;
          if (Oe === Ia) {
            if (me.tag === pe) {
              n(_, me.sibling);
              var Ue = r(me, O.props.children);
              return Ue.return = _, Ue._debugSource = O._source, Ue._debugOwner = O._owner, Ue;
            }
          } else if (me.elementType === Oe || // Keep this check inline so it only runs on the false path:
          xN(me, O) || // Lazy types should reconcile their resolved type.
          // We need to do this after the Hot Reloading check above,
          // because hot reloading has different semantics than prod because
          // it doesn't resuspend. So we can't let the call below suspend.
          typeof Oe == "object" && Oe !== null && Oe.$$typeof === Ce && hb(Oe) === me.type) {
            n(_, me.sibling);
            var mt = r(me, O.props);
            return mt.ref = ys(_, me, O), mt.return = _, mt._debugSource = O._source, mt._debugOwner = O._owner, mt;
          }
          n(_, me);
          break;
        } else
          t(_, me);
        me = me.sibling;
      }
      if (O.type === Ia) {
        var et = oi(O.props.children, _.mode, ne, O.key);
        return et.return = _, et;
      } else {
        var Pt = xh(O, _.mode, ne);
        return Pt.ref = ys(_, B, O), Pt.return = _, Pt;
      }
    }
    function Je(_, B, O, ne) {
      for (var ge = O.key, me = B; me !== null; ) {
        if (me.key === ge)
          if (me.tag === T && me.stateNode.containerInfo === O.containerInfo && me.stateNode.implementation === O.implementation) {
            n(_, me.sibling);
            var Oe = r(me, O.children || []);
            return Oe.return = _, Oe;
          } else {
            n(_, me);
            break;
          }
        else
          t(_, me);
        me = me.sibling;
      }
      var Ue = Sh(O, _.mode, ne);
      return Ue.return = _, Ue;
    }
    function qe(_, B, O, ne) {
      var ge = typeof O == "object" && O !== null && O.type === Ia && O.key === null;
      if (ge && (O = O.props.children), typeof O == "object" && O !== null) {
        switch (O.$$typeof) {
          case ca:
            return l(Ee(_, B, O, ne));
          case Xn:
            return l(Je(_, B, O, ne));
          case Ce:
            var me = O._payload, Oe = O._init;
            return qe(_, B, Oe(me), ne);
        }
        if (Ye(O))
          return H(_, B, O, ne);
        if (Ca(O))
          return fe(_, B, O, ne);
        pc(_, O);
      }
      return typeof O == "string" && O !== "" || typeof O == "number" ? l(De(_, B, "" + O, ne)) : (typeof O == "function" && mc(_), n(_, B));
    }
    return qe;
  }
  var Ul = vb(!0), gb = vb(!1);
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
  var Tp = Gr(null), wp;
  wp = {};
  var hc = null, Fl = null, _p = null, vc = !1;
  function gc() {
    hc = null, Fl = null, _p = null, vc = !1;
  }
  function bb() {
    vc = !0;
  }
  function yb() {
    vc = !1;
  }
  function Nb(e, t, n) {
    _n(Tp, t._currentValue, e), t._currentValue = n, t._currentRenderer !== void 0 && t._currentRenderer !== null && t._currentRenderer !== wp && d("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."), t._currentRenderer = wp;
  }
  function Op(e, t) {
    var n = Tp.current;
    wn(Tp, t), e._currentValue = n;
  }
  function Mp(e, t, n) {
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
            D !== null && (D.lanes = Be(D.lanes, n)), Mp(a.return, n, e), i.lanes = Be(i.lanes, n);
            break;
          }
          l = l.next;
        }
      } else if (a.tag === G)
        r = a.type === e.type ? null : a.child;
      else if (a.tag === K) {
        var V = a.return;
        if (V === null)
          throw new Error("We just came from a parent so we must have had a parent. This is a bug in React.");
        V.lanes = Be(V.lanes, n);
        var L = V.alternate;
        L !== null && (L.lanes = Be(L.lanes, n)), Mp(V, n, e), r = a.sibling;
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
          var H = r.sibling;
          if (H !== null) {
            H.return = r.return, r = H;
            break;
          }
          r = r.return;
        }
      a = r;
    }
  }
  function zl(e, t) {
    hc = e, Fl = null, _p = null;
    var n = e.dependencies;
    if (n !== null) {
      var a = n.firstContext;
      a !== null && (Zn(n.lanes, t) && As(), n.firstContext = null);
    }
  }
  function Yt(e) {
    vc && d("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
    var t = e._currentValue;
    if (_p !== e) {
      var n = {
        context: e,
        memoizedValue: t,
        next: null
      };
      if (Fl === null) {
        if (hc === null)
          throw new Error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
        Fl = n, hc.dependencies = {
          lanes: Q,
          firstContext: n
        };
      } else
        Fl = Fl.next = n;
    }
    return t;
  }
  var Bi = null;
  function Vp(e) {
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
  function xb(e, t, n, a) {
    var r = t.interleaved;
    return r === null ? (n.next = n, Vp(t)) : (n.next = r.next, r.next = n), t.interleaved = n, bc(e, a);
  }
  function kC(e, t, n, a) {
    var r = t.interleaved;
    r === null ? (n.next = n, Vp(t)) : (n.next = r.next, r.next = n), t.interleaved = n;
  }
  function UC(e, t, n, a) {
    var r = t.interleaved;
    return r === null ? (n.next = n, Vp(t)) : (n.next = r.next, r.next = n), t.interleaved = n, bc(e, a);
  }
  function Gn(e, t) {
    return bc(e, t);
  }
  var FC = bc;
  function bc(e, t) {
    e.lanes = Be(e.lanes, t);
    var n = e.alternate;
    n !== null && (n.lanes = Be(n.lanes, t)), n === null && (e.flags & (It | hr)) !== _e && gN(e);
    for (var a = e, r = e.return; r !== null; )
      r.childLanes = Be(r.childLanes, t), n = r.alternate, n !== null ? n.childLanes = Be(n.childLanes, t) : (r.flags & (It | hr)) !== _e && gN(e), a = r, r = r.return;
    if (a.tag === x) {
      var i = a.stateNode;
      return i;
    } else
      return null;
  }
  var Eb = 0, Sb = 1, yc = 2, Ap = 3, Nc = !1, Lp, xc;
  Lp = !1, xc = null;
  function kp(e) {
    var t = {
      baseState: e.memoizedState,
      firstBaseUpdate: null,
      lastBaseUpdate: null,
      shared: {
        pending: null,
        interleaved: null,
        lanes: Q
      },
      effects: null
    };
    e.updateQueue = t;
  }
  function Rb(e, t) {
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
      tag: Eb,
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
    if (xc === r && !Lp && (d("An update (setState, replaceState, or forceUpdate) was scheduled from inside an update function. Update functions should be pure, with zero side-effects. Consider using componentDidUpdate or a callback."), Lp = !0), kj()) {
      var i = r.pending;
      return i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, FC(e, n);
    } else
      return UC(e, r, t, n);
  }
  function Ec(e, t, n) {
    var a = t.updateQueue;
    if (a !== null) {
      var r = a.shared;
      if (Uv(n)) {
        var i = r.lanes;
        i = zv(i, e.pendingLanes);
        var l = Be(i, n);
        r.lanes = l, Tf(e, l);
      }
    }
  }
  function Up(e, t) {
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
      case Sb: {
        var l = n.payload;
        if (typeof l == "function") {
          bb();
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
            yb();
          }
          return u;
        }
        return l;
      }
      case Ap:
        e.flags = e.flags & ~zn | rt;
      case Eb: {
        var c = n.payload, h;
        if (typeof c == "function") {
          bb(), h = c.call(i, a, r);
          {
            if (e.mode & Lt) {
              un(!0);
              try {
                c.call(i, a, r);
              } finally {
                un(!1);
              }
            }
            yb();
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
      var V = r.baseState, L = Q, H = null, fe = null, De = null, Ee = i;
      do {
        var Je = Ee.lane, qe = Ee.eventTime;
        if (El(a, Je)) {
          if (De !== null) {
            var B = {
              eventTime: qe,
              // This update is going to be committed so we never want uncommit
              // it. Using NoLane works because 0 is a subset of all bitmasks, so
              // this will never be skipped by the check above.
              lane: cn,
              tag: Ee.tag,
              payload: Ee.payload,
              callback: Ee.callback,
              next: null
            };
            De = De.next = B;
          }
          V = zC(e, r, Ee, V, t, n);
          var O = Ee.callback;
          if (O !== null && // If the update was already committed, we should not queue its
          // callback again.
          Ee.lane !== cn) {
            e.flags |= bv;
            var ne = r.effects;
            ne === null ? r.effects = [Ee] : ne.push(Ee);
          }
        } else {
          var _ = {
            eventTime: qe,
            lane: Je,
            tag: Ee.tag,
            payload: Ee.payload,
            callback: Ee.callback,
            next: null
          };
          De === null ? (fe = De = _, H = V) : De = De.next = _, L = Be(L, Je);
        }
        if (Ee = Ee.next, Ee === null) {
          if (u = r.shared.pending, u === null)
            break;
          var ge = u, me = ge.next;
          ge.next = null, Ee = me, r.lastBaseUpdate = ge, r.shared.pending = null;
        }
      } while (!0);
      De === null && (H = V), r.baseState = H, r.firstBaseUpdate = fe, r.lastBaseUpdate = De;
      var Oe = r.shared.interleaved;
      if (Oe !== null) {
        var Ue = Oe;
        do
          L = Be(L, Ue.lane), Ue = Ue.next;
        while (Ue !== Oe);
      } else i === null && (r.shared.lanes = Q);
      qs(L), e.lanes = L, e.memoizedState = V;
    }
    xc = null;
  }
  function PC(e, t) {
    if (typeof e != "function")
      throw new Error("Invalid argument passed as callback. Expected a function. Instead " + ("received: " + e));
    e.call(t);
  }
  function Db() {
    Nc = !1;
  }
  function Rc() {
    return Nc;
  }
  function Cb(e, t, n) {
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
  function jb() {
    var e = Cc(Dc.current);
    return e;
  }
  function Fp(e, t) {
    _n(Dc, t, e), _n(xs, e, e), _n(Jr, Ns, e);
    var n = aD(t);
    wn(Jr, e), _n(Jr, n, e);
  }
  function Pl(e) {
    wn(Jr, e), wn(xs, e), wn(Dc, e);
  }
  function zp() {
    var e = Cc(Jr.current);
    return e;
  }
  function Tb(e) {
    Cc(Dc.current);
    var t = Cc(Jr.current), n = rD(t, e.type);
    t !== n && (_n(xs, e, e), _n(Jr, n, e));
  }
  function Pp(e) {
    xs.current === e && (wn(Jr, e), wn(xs, e));
  }
  var HC = 0, wb = 1, _b = 1, Es = 2, Va = Gr(HC);
  function Hp(e, t) {
    return (e & t) !== 0;
  }
  function Hl(e) {
    return e & wb;
  }
  function Bp(e, t) {
    return e & wb | t;
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
      if (t.tag === te) {
        var n = t.memoizedState;
        if (n !== null) {
          var a = n.dehydrated;
          if (a === null || Gg(a) || lp(a))
            return t;
        }
      } else if (t.tag === ie && // revealOrder undefined can't be trusted because it don't
      // keep track of whether it suspended or not.
      t.memoizedProps.revealOrder !== void 0) {
        var r = (t.flags & rt) !== _e;
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
  ), $p = [];
  function Ip() {
    for (var e = 0; e < $p.length; e++) {
      var t = $p[e];
      t._workInProgressVersionPrimary = null;
    }
    $p.length = 0;
  }
  function IC(e, t) {
    var n = t._getVersion, a = n(t._source);
    e.mutableSourceEagerHydrationData == null ? e.mutableSourceEagerHydrationData = [t, a] : e.mutableSourceEagerHydrationData.push(t, a);
  }
  var ve = m.ReactCurrentDispatcher, Ss = m.ReactCurrentBatchConfig, Yp, $l;
  Yp = /* @__PURE__ */ new Set();
  var $i = Q, pt = null, Zt = null, en = null, Tc = !1, Rs = !1, Ds = 0, YC = 0, qC = 25, I = null, ha = null, ei = -1, qp = !1;
  function ot() {
    {
      var e = I;
      ha === null ? ha = [e] : ha.push(e);
    }
  }
  function ue() {
    {
      var e = I;
      ha !== null && (ei++, ha[ei] !== e && GC(e));
    }
  }
  function Il(e) {
    e != null && !Ye(e) && d("%s received a final argument that is not an array (instead, received `%s`). When specified, the final argument must be an array.", I, typeof e);
  }
  function GC(e) {
    {
      var t = Fe(pt);
      if (!Yp.has(t) && (Yp.add(t), ha !== null)) {
        for (var n = "", a = 30, r = 0; r <= ei; r++) {
          for (var i = ha[r], l = r === ei ? e : i, u = r + 1 + ". " + i; u.length < a; )
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
  function Gp(e, t) {
    if (qp)
      return !1;
    if (t === null)
      return d("%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.", I), !1;
    e.length !== t.length && d(`The final argument passed to %s changed size between renders. The order and size of this array must remain constant.

Previous: %s
Incoming: %s`, I, "[" + t.join(", ") + "]", "[" + e.join(", ") + "]");
    for (var n = 0; n < t.length && n < e.length; n++)
      if (!na(e[n], t[n]))
        return !1;
    return !0;
  }
  function Yl(e, t, n, a, r, i) {
    $i = i, pt = t, ha = e !== null ? e._debugHookTypes : null, ei = -1, qp = e !== null && e.type !== t.type, t.memoizedState = null, t.updateQueue = null, t.lanes = Q, e !== null && e.memoizedState !== null ? ve.current = Jb : ha !== null ? ve.current = Xb : ve.current = Qb;
    var l = n(a, r);
    if (Rs) {
      var u = 0;
      do {
        if (Rs = !1, Ds = 0, u >= qC)
          throw new Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
        u += 1, qp = !1, Zt = null, en = null, t.updateQueue = null, ei = -1, ve.current = Zb, l = n(a, r);
      } while (Rs);
    }
    ve.current = Hc, t._debugHookTypes = ha;
    var c = Zt !== null && Zt.next !== null;
    if ($i = Q, pt = null, Zt = null, en = null, I = null, ha = null, ei = -1, e !== null && (e.flags & vr) !== (t.flags & vr) && // Disable this warning in legacy mode, because legacy Suspense is weird
    // and creates false positives. To make this work in legacy mode, we'd
    // need to mark fibers that commit in an incomplete state, somehow. For
    // now I'll disable the warning that most of the bugs that would trigger
    // it are either exclusive to concurrent mode or exist in both.
    (e.mode & Qe) !== je && d("Internal React error: Expected static flag was missing. Please notify the React team."), Tc = !1, c)
      throw new Error("Rendered fewer hooks than expected. This may be caused by an accidental early return statement.");
    return l;
  }
  function ql() {
    var e = Ds !== 0;
    return Ds = 0, e;
  }
  function Ob(e, t, n) {
    t.updateQueue = e.updateQueue, (t.mode & Wa) !== je ? t.flags &= -50333701 : t.flags &= -2053, e.lanes = wu(e.lanes, n);
  }
  function Mb() {
    if (ve.current = Hc, Tc) {
      for (var e = pt.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      Tc = !1;
    }
    $i = Q, pt = null, Zt = null, en = null, ha = null, ei = -1, I = null, Yb = !1, Rs = !1, Ds = 0;
  }
  function Za() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return en === null ? pt.memoizedState = en = e : en = en.next = e, en;
  }
  function va() {
    var e;
    if (Zt === null) {
      var t = pt.alternate;
      t !== null ? e = t.memoizedState : e = null;
    } else
      e = Zt.next;
    var n;
    if (en === null ? n = pt.memoizedState : n = en.next, n !== null)
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
      en === null ? pt.memoizedState = en = a : en = en.next = a;
    }
    return en;
  }
  function Vb() {
    return {
      lastEffect: null,
      stores: null
    };
  }
  function Wp(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function Kp(e, t, n) {
    var a = Za(), r;
    n !== void 0 ? r = n(t) : r = t, a.memoizedState = a.baseState = r;
    var i = {
      pending: null,
      interleaved: null,
      lanes: Q,
      dispatch: null,
      lastRenderedReducer: e,
      lastRenderedState: r
    };
    a.queue = i;
    var l = i.dispatch = XC.bind(null, pt, i);
    return [a.memoizedState, l];
  }
  function Qp(e, t, n) {
    var a = va(), r = a.queue;
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
      var v = l.next, C = i.baseState, D = null, V = null, L = null, H = v;
      do {
        var fe = H.lane;
        if (El($i, fe)) {
          if (L !== null) {
            var Ee = {
              // This update is going to be committed so we never want uncommit
              // it. Using NoLane works because 0 is a subset of all bitmasks, so
              // this will never be skipped by the check above.
              lane: cn,
              action: H.action,
              hasEagerState: H.hasEagerState,
              eagerState: H.eagerState,
              next: null
            };
            L = L.next = Ee;
          }
          if (H.hasEagerState)
            C = H.eagerState;
          else {
            var Je = H.action;
            C = e(C, Je);
          }
        } else {
          var De = {
            lane: fe,
            action: H.action,
            hasEagerState: H.hasEagerState,
            eagerState: H.eagerState,
            next: null
          };
          L === null ? (V = L = De, D = C) : L = L.next = De, pt.lanes = Be(pt.lanes, fe), qs(fe);
        }
        H = H.next;
      } while (H !== null && H !== v);
      L === null ? D = C : L.next = V, na(C, a.memoizedState) || As(), a.memoizedState = C, a.baseState = D, a.baseQueue = L, r.lastRenderedState = C;
    }
    var qe = r.interleaved;
    if (qe !== null) {
      var _ = qe;
      do {
        var B = _.lane;
        pt.lanes = Be(pt.lanes, B), qs(B), _ = _.next;
      } while (_ !== qe);
    } else l === null && (r.lanes = Q);
    var O = r.dispatch;
    return [a.memoizedState, O];
  }
  function Xp(e, t, n) {
    var a = va(), r = a.queue;
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
      na(u, a.memoizedState) || As(), a.memoizedState = u, a.baseQueue === null && (a.baseState = u), r.lastRenderedState = u;
    }
    return [u, i];
  }
  function aO(e, t, n) {
  }
  function rO(e, t, n) {
  }
  function Jp(e, t, n) {
    var a = pt, r = Za(), i, l = gn();
    if (l) {
      if (n === void 0)
        throw new Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
      i = n(), $l || i !== n() && (d("The result of getServerSnapshot should be cached to avoid an infinite loop"), $l = !0);
    } else {
      if (i = t(), !$l) {
        var u = t();
        na(i, u) || (d("The result of getSnapshot should be cached to avoid an infinite loop"), $l = !0);
      }
      var c = ld();
      if (c === null)
        throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
      Tu(c, $i) || Ab(a, t, i);
    }
    r.memoizedState = i;
    var h = {
      value: i,
      getSnapshot: t
    };
    return r.queue = h, Vc(kb.bind(null, a, h, e), [e]), a.flags |= Fr, Cs(Xt | bn, Lb.bind(null, a, h, i, t), void 0, null), i;
  }
  function wc(e, t, n) {
    var a = pt, r = va(), i = t();
    if (!$l) {
      var l = t();
      na(i, l) || (d("The result of getSnapshot should be cached to avoid an infinite loop"), $l = !0);
    }
    var u = r.memoizedState, c = !na(u, i);
    c && (r.memoizedState = i, As());
    var h = r.queue;
    if (Ts(kb.bind(null, a, h, e), [e]), h.getSnapshot !== t || c || // Check if the susbcribe function changed. We can save some memory by
    // checking whether we scheduled a subscription effect above.
    en !== null && en.memoizedState.tag & Xt) {
      a.flags |= Fr, Cs(Xt | bn, Lb.bind(null, a, h, i, t), void 0, null);
      var v = ld();
      if (v === null)
        throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
      Tu(v, $i) || Ab(a, t, i);
    }
    return i;
  }
  function Ab(e, t, n) {
    e.flags |= Gd;
    var a = {
      getSnapshot: t,
      value: n
    }, r = pt.updateQueue;
    if (r === null)
      r = Vb(), pt.updateQueue = r, r.stores = [a];
    else {
      var i = r.stores;
      i === null ? r.stores = [a] : i.push(a);
    }
  }
  function Lb(e, t, n, a) {
    t.value = n, t.getSnapshot = a, Ub(t) && Fb(e);
  }
  function kb(e, t, n) {
    var a = function() {
      Ub(t) && Fb(e);
    };
    return n(a);
  }
  function Ub(e) {
    var t = e.getSnapshot, n = e.value;
    try {
      var a = t();
      return !na(n, a);
    } catch {
      return !0;
    }
  }
  function Fb(e) {
    var t = Gn(e, Ae);
    t !== null && rn(t, e, Ae, xt);
  }
  function _c(e) {
    var t = Za();
    typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e;
    var n = {
      pending: null,
      interleaved: null,
      lanes: Q,
      dispatch: null,
      lastRenderedReducer: Wp,
      lastRenderedState: e
    };
    t.queue = n;
    var a = n.dispatch = JC.bind(null, pt, n);
    return [t.memoizedState, a];
  }
  function Zp(e) {
    return Qp(Wp);
  }
  function em(e) {
    return Xp(Wp);
  }
  function Cs(e, t, n, a) {
    var r = {
      tag: e,
      create: t,
      destroy: n,
      deps: a,
      // Circular
      next: null
    }, i = pt.updateQueue;
    if (i === null)
      i = Vb(), pt.updateQueue = i, i.lastEffect = r.next = r;
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
  function tm(e) {
    var t = Za();
    {
      var n = {
        current: e
      };
      return t.memoizedState = n, n;
    }
  }
  function Oc(e) {
    var t = va();
    return t.memoizedState;
  }
  function js(e, t, n, a) {
    var r = Za(), i = a === void 0 ? null : a;
    pt.flags |= e, r.memoizedState = Cs(Xt | t, n, void 0, i);
  }
  function Mc(e, t, n, a) {
    var r = va(), i = a === void 0 ? null : a, l = void 0;
    if (Zt !== null) {
      var u = Zt.memoizedState;
      if (l = u.destroy, i !== null) {
        var c = u.deps;
        if (Gp(i, c)) {
          r.memoizedState = Cs(t, n, l, i);
          return;
        }
      }
    }
    pt.flags |= e, r.memoizedState = Cs(Xt | t, n, l, i);
  }
  function Vc(e, t) {
    return (pt.mode & Wa) !== je ? js(Xd | Fr | Qd, bn, e, t) : js(Fr | Qd, bn, e, t);
  }
  function Ts(e, t) {
    return Mc(Fr, bn, e, t);
  }
  function nm(e, t) {
    return js(at, Ja, e, t);
  }
  function Ac(e, t) {
    return Mc(at, Ja, e, t);
  }
  function am(e, t) {
    var n = at;
    return n |= Ci, (pt.mode & Wa) !== je && (n |= zr), js(n, Jt, e, t);
  }
  function Lc(e, t) {
    return Mc(at, Jt, e, t);
  }
  function zb(e, t) {
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
  function rm(e, t, n) {
    typeof t != "function" && d("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t !== null ? typeof t : "null");
    var a = n != null ? n.concat([e]) : null, r = at;
    return r |= Ci, (pt.mode & Wa) !== je && (r |= zr), js(r, Jt, zb.bind(null, t, e), a);
  }
  function kc(e, t, n) {
    typeof t != "function" && d("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t !== null ? typeof t : "null");
    var a = n != null ? n.concat([e]) : null;
    return Mc(at, Jt, zb.bind(null, t, e), a);
  }
  function WC(e, t) {
  }
  var Uc = WC;
  function im(e, t) {
    var n = Za(), a = t === void 0 ? null : t;
    return n.memoizedState = [e, a], e;
  }
  function Fc(e, t) {
    var n = va(), a = t === void 0 ? null : t, r = n.memoizedState;
    if (r !== null && a !== null) {
      var i = r[1];
      if (Gp(a, i))
        return r[0];
    }
    return n.memoizedState = [e, a], e;
  }
  function lm(e, t) {
    var n = Za(), a = t === void 0 ? null : t, r = e();
    return n.memoizedState = [r, a], r;
  }
  function zc(e, t) {
    var n = va(), a = t === void 0 ? null : t, r = n.memoizedState;
    if (r !== null && a !== null) {
      var i = r[1];
      if (Gp(a, i))
        return r[0];
    }
    var l = e();
    return n.memoizedState = [l, a], l;
  }
  function om(e) {
    var t = Za();
    return t.memoizedState = e, e;
  }
  function Pb(e) {
    var t = va(), n = Zt, a = n.memoizedState;
    return Bb(t, a, e);
  }
  function Hb(e) {
    var t = va();
    if (Zt === null)
      return t.memoizedState = e, e;
    var n = Zt.memoizedState;
    return Bb(t, n, e);
  }
  function Bb(e, t, n) {
    var a = !VS($i);
    if (a) {
      if (!na(n, t)) {
        var r = Fv();
        pt.lanes = Be(pt.lanes, r), qs(r), e.baseState = !0;
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
  function sm() {
    var e = _c(!1), t = e[0], n = e[1], a = KC.bind(null, n), r = Za();
    return r.memoizedState = a, [t, a];
  }
  function $b() {
    var e = Zp(), t = e[0], n = va(), a = n.memoizedState;
    return [t, a];
  }
  function Ib() {
    var e = em(), t = e[0], n = va(), a = n.memoizedState;
    return [t, a];
  }
  var Yb = !1;
  function QC() {
    return Yb;
  }
  function um() {
    var e = Za(), t = ld(), n = t.identifierPrefix, a;
    if (gn()) {
      var r = pC();
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
    var e = va(), t = e.memoizedState;
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
    if (qb(e))
      Gb(t, r);
    else {
      var i = xb(e, t, r, a);
      if (i !== null) {
        var l = Bn();
        rn(i, e, a, l), Wb(i, t, a);
      }
    }
    Kb(e, a);
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
    if (qb(e))
      Gb(t, r);
    else {
      var i = e.alternate;
      if (e.lanes === Q && (i === null || i.lanes === Q)) {
        var l = t.lastRenderedReducer;
        if (l !== null) {
          var u;
          u = ve.current, ve.current = Aa;
          try {
            var c = t.lastRenderedState, h = l(c, n);
            if (r.hasEagerState = !0, r.eagerState = h, na(h, c)) {
              kC(e, t, r, a);
              return;
            }
          } catch {
          } finally {
            ve.current = u;
          }
        }
      }
      var v = xb(e, t, r, a);
      if (v !== null) {
        var C = Bn();
        rn(v, e, a, C), Wb(v, t, a);
      }
    }
    Kb(e, a);
  }
  function qb(e) {
    var t = e.alternate;
    return e === pt || t !== null && t === pt;
  }
  function Gb(e, t) {
    Rs = Tc = !0;
    var n = e.pending;
    n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
  }
  function Wb(e, t, n) {
    if (Uv(n)) {
      var a = t.lanes;
      a = zv(a, e.pendingLanes);
      var r = Be(a, n);
      t.lanes = r, Tf(e, r);
    }
  }
  function Kb(e, t, n) {
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
    unstable_isNewReconciler: ce
  }, Qb = null, Xb = null, Jb = null, Zb = null, er = null, Aa = null, Bc = null;
  {
    var cm = function() {
      d("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
    }, Le = function() {
      d("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://reactjs.org/link/rules-of-hooks");
    };
    Qb = {
      readContext: function(e) {
        return Yt(e);
      },
      useCallback: function(e, t) {
        return I = "useCallback", ot(), Il(t), im(e, t);
      },
      useContext: function(e) {
        return I = "useContext", ot(), Yt(e);
      },
      useEffect: function(e, t) {
        return I = "useEffect", ot(), Il(t), Vc(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return I = "useImperativeHandle", ot(), Il(n), rm(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return I = "useInsertionEffect", ot(), Il(t), nm(e, t);
      },
      useLayoutEffect: function(e, t) {
        return I = "useLayoutEffect", ot(), Il(t), am(e, t);
      },
      useMemo: function(e, t) {
        I = "useMemo", ot(), Il(t);
        var n = ve.current;
        ve.current = er;
        try {
          return lm(e, t);
        } finally {
          ve.current = n;
        }
      },
      useReducer: function(e, t, n) {
        I = "useReducer", ot();
        var a = ve.current;
        ve.current = er;
        try {
          return Kp(e, t, n);
        } finally {
          ve.current = a;
        }
      },
      useRef: function(e) {
        return I = "useRef", ot(), tm(e);
      },
      useState: function(e) {
        I = "useState", ot();
        var t = ve.current;
        ve.current = er;
        try {
          return _c(e);
        } finally {
          ve.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return I = "useDebugValue", ot(), void 0;
      },
      useDeferredValue: function(e) {
        return I = "useDeferredValue", ot(), om(e);
      },
      useTransition: function() {
        return I = "useTransition", ot(), sm();
      },
      useMutableSource: function(e, t, n) {
        return I = "useMutableSource", ot(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return I = "useSyncExternalStore", ot(), Jp(e, t, n);
      },
      useId: function() {
        return I = "useId", ot(), um();
      },
      unstable_isNewReconciler: ce
    }, Xb = {
      readContext: function(e) {
        return Yt(e);
      },
      useCallback: function(e, t) {
        return I = "useCallback", ue(), im(e, t);
      },
      useContext: function(e) {
        return I = "useContext", ue(), Yt(e);
      },
      useEffect: function(e, t) {
        return I = "useEffect", ue(), Vc(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return I = "useImperativeHandle", ue(), rm(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return I = "useInsertionEffect", ue(), nm(e, t);
      },
      useLayoutEffect: function(e, t) {
        return I = "useLayoutEffect", ue(), am(e, t);
      },
      useMemo: function(e, t) {
        I = "useMemo", ue();
        var n = ve.current;
        ve.current = er;
        try {
          return lm(e, t);
        } finally {
          ve.current = n;
        }
      },
      useReducer: function(e, t, n) {
        I = "useReducer", ue();
        var a = ve.current;
        ve.current = er;
        try {
          return Kp(e, t, n);
        } finally {
          ve.current = a;
        }
      },
      useRef: function(e) {
        return I = "useRef", ue(), tm(e);
      },
      useState: function(e) {
        I = "useState", ue();
        var t = ve.current;
        ve.current = er;
        try {
          return _c(e);
        } finally {
          ve.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return I = "useDebugValue", ue(), void 0;
      },
      useDeferredValue: function(e) {
        return I = "useDeferredValue", ue(), om(e);
      },
      useTransition: function() {
        return I = "useTransition", ue(), sm();
      },
      useMutableSource: function(e, t, n) {
        return I = "useMutableSource", ue(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return I = "useSyncExternalStore", ue(), Jp(e, t, n);
      },
      useId: function() {
        return I = "useId", ue(), um();
      },
      unstable_isNewReconciler: ce
    }, Jb = {
      readContext: function(e) {
        return Yt(e);
      },
      useCallback: function(e, t) {
        return I = "useCallback", ue(), Fc(e, t);
      },
      useContext: function(e) {
        return I = "useContext", ue(), Yt(e);
      },
      useEffect: function(e, t) {
        return I = "useEffect", ue(), Ts(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return I = "useImperativeHandle", ue(), kc(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return I = "useInsertionEffect", ue(), Ac(e, t);
      },
      useLayoutEffect: function(e, t) {
        return I = "useLayoutEffect", ue(), Lc(e, t);
      },
      useMemo: function(e, t) {
        I = "useMemo", ue();
        var n = ve.current;
        ve.current = Aa;
        try {
          return zc(e, t);
        } finally {
          ve.current = n;
        }
      },
      useReducer: function(e, t, n) {
        I = "useReducer", ue();
        var a = ve.current;
        ve.current = Aa;
        try {
          return Qp(e, t, n);
        } finally {
          ve.current = a;
        }
      },
      useRef: function(e) {
        return I = "useRef", ue(), Oc();
      },
      useState: function(e) {
        I = "useState", ue();
        var t = ve.current;
        ve.current = Aa;
        try {
          return Zp(e);
        } finally {
          ve.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return I = "useDebugValue", ue(), Uc();
      },
      useDeferredValue: function(e) {
        return I = "useDeferredValue", ue(), Pb(e);
      },
      useTransition: function() {
        return I = "useTransition", ue(), $b();
      },
      useMutableSource: function(e, t, n) {
        return I = "useMutableSource", ue(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return I = "useSyncExternalStore", ue(), wc(e, t);
      },
      useId: function() {
        return I = "useId", ue(), Pc();
      },
      unstable_isNewReconciler: ce
    }, Zb = {
      readContext: function(e) {
        return Yt(e);
      },
      useCallback: function(e, t) {
        return I = "useCallback", ue(), Fc(e, t);
      },
      useContext: function(e) {
        return I = "useContext", ue(), Yt(e);
      },
      useEffect: function(e, t) {
        return I = "useEffect", ue(), Ts(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return I = "useImperativeHandle", ue(), kc(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return I = "useInsertionEffect", ue(), Ac(e, t);
      },
      useLayoutEffect: function(e, t) {
        return I = "useLayoutEffect", ue(), Lc(e, t);
      },
      useMemo: function(e, t) {
        I = "useMemo", ue();
        var n = ve.current;
        ve.current = Bc;
        try {
          return zc(e, t);
        } finally {
          ve.current = n;
        }
      },
      useReducer: function(e, t, n) {
        I = "useReducer", ue();
        var a = ve.current;
        ve.current = Bc;
        try {
          return Xp(e, t, n);
        } finally {
          ve.current = a;
        }
      },
      useRef: function(e) {
        return I = "useRef", ue(), Oc();
      },
      useState: function(e) {
        I = "useState", ue();
        var t = ve.current;
        ve.current = Bc;
        try {
          return em(e);
        } finally {
          ve.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return I = "useDebugValue", ue(), Uc();
      },
      useDeferredValue: function(e) {
        return I = "useDeferredValue", ue(), Hb(e);
      },
      useTransition: function() {
        return I = "useTransition", ue(), Ib();
      },
      useMutableSource: function(e, t, n) {
        return I = "useMutableSource", ue(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return I = "useSyncExternalStore", ue(), wc(e, t);
      },
      useId: function() {
        return I = "useId", ue(), Pc();
      },
      unstable_isNewReconciler: ce
    }, er = {
      readContext: function(e) {
        return cm(), Yt(e);
      },
      useCallback: function(e, t) {
        return I = "useCallback", Le(), ot(), im(e, t);
      },
      useContext: function(e) {
        return I = "useContext", Le(), ot(), Yt(e);
      },
      useEffect: function(e, t) {
        return I = "useEffect", Le(), ot(), Vc(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return I = "useImperativeHandle", Le(), ot(), rm(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return I = "useInsertionEffect", Le(), ot(), nm(e, t);
      },
      useLayoutEffect: function(e, t) {
        return I = "useLayoutEffect", Le(), ot(), am(e, t);
      },
      useMemo: function(e, t) {
        I = "useMemo", Le(), ot();
        var n = ve.current;
        ve.current = er;
        try {
          return lm(e, t);
        } finally {
          ve.current = n;
        }
      },
      useReducer: function(e, t, n) {
        I = "useReducer", Le(), ot();
        var a = ve.current;
        ve.current = er;
        try {
          return Kp(e, t, n);
        } finally {
          ve.current = a;
        }
      },
      useRef: function(e) {
        return I = "useRef", Le(), ot(), tm(e);
      },
      useState: function(e) {
        I = "useState", Le(), ot();
        var t = ve.current;
        ve.current = er;
        try {
          return _c(e);
        } finally {
          ve.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return I = "useDebugValue", Le(), ot(), void 0;
      },
      useDeferredValue: function(e) {
        return I = "useDeferredValue", Le(), ot(), om(e);
      },
      useTransition: function() {
        return I = "useTransition", Le(), ot(), sm();
      },
      useMutableSource: function(e, t, n) {
        return I = "useMutableSource", Le(), ot(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return I = "useSyncExternalStore", Le(), ot(), Jp(e, t, n);
      },
      useId: function() {
        return I = "useId", Le(), ot(), um();
      },
      unstable_isNewReconciler: ce
    }, Aa = {
      readContext: function(e) {
        return cm(), Yt(e);
      },
      useCallback: function(e, t) {
        return I = "useCallback", Le(), ue(), Fc(e, t);
      },
      useContext: function(e) {
        return I = "useContext", Le(), ue(), Yt(e);
      },
      useEffect: function(e, t) {
        return I = "useEffect", Le(), ue(), Ts(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return I = "useImperativeHandle", Le(), ue(), kc(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return I = "useInsertionEffect", Le(), ue(), Ac(e, t);
      },
      useLayoutEffect: function(e, t) {
        return I = "useLayoutEffect", Le(), ue(), Lc(e, t);
      },
      useMemo: function(e, t) {
        I = "useMemo", Le(), ue();
        var n = ve.current;
        ve.current = Aa;
        try {
          return zc(e, t);
        } finally {
          ve.current = n;
        }
      },
      useReducer: function(e, t, n) {
        I = "useReducer", Le(), ue();
        var a = ve.current;
        ve.current = Aa;
        try {
          return Qp(e, t, n);
        } finally {
          ve.current = a;
        }
      },
      useRef: function(e) {
        return I = "useRef", Le(), ue(), Oc();
      },
      useState: function(e) {
        I = "useState", Le(), ue();
        var t = ve.current;
        ve.current = Aa;
        try {
          return Zp(e);
        } finally {
          ve.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return I = "useDebugValue", Le(), ue(), Uc();
      },
      useDeferredValue: function(e) {
        return I = "useDeferredValue", Le(), ue(), Pb(e);
      },
      useTransition: function() {
        return I = "useTransition", Le(), ue(), $b();
      },
      useMutableSource: function(e, t, n) {
        return I = "useMutableSource", Le(), ue(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return I = "useSyncExternalStore", Le(), ue(), wc(e, t);
      },
      useId: function() {
        return I = "useId", Le(), ue(), Pc();
      },
      unstable_isNewReconciler: ce
    }, Bc = {
      readContext: function(e) {
        return cm(), Yt(e);
      },
      useCallback: function(e, t) {
        return I = "useCallback", Le(), ue(), Fc(e, t);
      },
      useContext: function(e) {
        return I = "useContext", Le(), ue(), Yt(e);
      },
      useEffect: function(e, t) {
        return I = "useEffect", Le(), ue(), Ts(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return I = "useImperativeHandle", Le(), ue(), kc(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return I = "useInsertionEffect", Le(), ue(), Ac(e, t);
      },
      useLayoutEffect: function(e, t) {
        return I = "useLayoutEffect", Le(), ue(), Lc(e, t);
      },
      useMemo: function(e, t) {
        I = "useMemo", Le(), ue();
        var n = ve.current;
        ve.current = Aa;
        try {
          return zc(e, t);
        } finally {
          ve.current = n;
        }
      },
      useReducer: function(e, t, n) {
        I = "useReducer", Le(), ue();
        var a = ve.current;
        ve.current = Aa;
        try {
          return Xp(e, t, n);
        } finally {
          ve.current = a;
        }
      },
      useRef: function(e) {
        return I = "useRef", Le(), ue(), Oc();
      },
      useState: function(e) {
        I = "useState", Le(), ue();
        var t = ve.current;
        ve.current = Aa;
        try {
          return em(e);
        } finally {
          ve.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return I = "useDebugValue", Le(), ue(), Uc();
      },
      useDeferredValue: function(e) {
        return I = "useDeferredValue", Le(), ue(), Hb(e);
      },
      useTransition: function() {
        return I = "useTransition", Le(), ue(), Ib();
      },
      useMutableSource: function(e, t, n) {
        return I = "useMutableSource", Le(), ue(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return I = "useSyncExternalStore", Le(), ue(), wc(e, t);
      },
      useId: function() {
        return I = "useId", Le(), ue(), Pc();
      },
      unstable_isNewReconciler: ce
    };
  }
  var ti = f.unstable_now, ey = 0, $c = -1, ws = -1, Ic = -1, dm = !1, Yc = !1;
  function ty() {
    return dm;
  }
  function ZC() {
    Yc = !0;
  }
  function e1() {
    dm = !1, Yc = !1;
  }
  function t1() {
    dm = Yc, Yc = !1;
  }
  function ny() {
    return ey;
  }
  function ay() {
    ey = ti();
  }
  function fm(e) {
    ws = ti(), e.actualStartTime < 0 && (e.actualStartTime = ti());
  }
  function ry(e) {
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
          case $:
            var r = n.stateNode;
            r.effectDuration += t;
            return;
        }
        n = n.return;
      }
    }
  }
  function pm(e) {
    if (Ic >= 0) {
      var t = ti() - Ic;
      Ic = -1;
      for (var n = e.return; n !== null; ) {
        switch (n.tag) {
          case x:
            var a = n.stateNode;
            a !== null && (a.passiveEffectDuration += t);
            return;
          case $:
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
  function mm() {
    Ic = ti();
  }
  function hm(e) {
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
  var vm = {}, gm, bm, ym, Nm, xm, iy, Gc, Em, Sm, Rm, _s;
  {
    gm = /* @__PURE__ */ new Set(), bm = /* @__PURE__ */ new Set(), ym = /* @__PURE__ */ new Set(), Nm = /* @__PURE__ */ new Set(), Em = /* @__PURE__ */ new Set(), xm = /* @__PURE__ */ new Set(), Sm = /* @__PURE__ */ new Set(), Rm = /* @__PURE__ */ new Set(), _s = /* @__PURE__ */ new Set();
    var ly = /* @__PURE__ */ new Set();
    Gc = function(e, t) {
      if (!(e === null || typeof e == "function")) {
        var n = t + "_" + e;
        ly.has(n) || (ly.add(n), d("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t, e));
      }
    }, iy = function(e, t) {
      if (t === void 0) {
        var n = nt(e) || "Component";
        xm.has(n) || (xm.add(n), d("%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.", n));
      }
    }, Object.defineProperty(vm, "_processChildContext", {
      enumerable: !1,
      value: function() {
        throw new Error("_processChildContext is not available in React 16+. This likely means you have multiple copies of React and are attempting to nest a React 15 tree inside a React 16 tree using unstable_renderSubtreeIntoContainer, which isn't supported. Try to make sure you have only one copy of React (and ideally, switch to ReactDOM.createPortal).");
      }
    }), Object.freeze(vm);
  }
  function Dm(e, t, n, a) {
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
      iy(t, i);
    }
    var l = i == null ? r : Ie({}, r, i);
    if (e.memoizedState = l, e.lanes === Q) {
      var u = e.updateQueue;
      u.baseState = l;
    }
  }
  var Cm = {
    isMounted: qE,
    enqueueSetState: function(e, t, n) {
      var a = pl(e), r = Bn(), i = ii(a), l = Dr(r, i);
      l.payload = t, n != null && (Gc(n, "setState"), l.callback = n);
      var u = Xr(a, l, i);
      u !== null && (rn(u, a, i, r), Ec(u, a, i)), nf(a, i);
    },
    enqueueReplaceState: function(e, t, n) {
      var a = pl(e), r = Bn(), i = ii(a), l = Dr(r, i);
      l.tag = Sb, l.payload = t, n != null && (Gc(n, "replaceState"), l.callback = n);
      var u = Xr(a, l, i);
      u !== null && (rn(u, a, i, r), Ec(u, a, i)), nf(a, i);
    },
    enqueueForceUpdate: function(e, t) {
      var n = pl(e), a = Bn(), r = ii(n), i = Dr(a, r);
      i.tag = yc, t != null && (Gc(t, "forceUpdate"), i.callback = t);
      var l = Xr(n, i, r);
      l !== null && (rn(l, n, r, a), Ec(l, n, r)), SS(n, r);
    }
  };
  function oy(e, t, n, a, r, i, l) {
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
        c === void 0 && d("%s.shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false.", nt(t) || "Component");
      }
      return c;
    }
    return t.prototype && t.prototype.isPureReactComponent ? !Jo(n, a) || !Jo(r, i) : !0;
  }
  function n1(e, t, n) {
    var a = e.stateNode;
    {
      var r = nt(t) || "Component", i = a.render;
      i || (t.prototype && typeof t.prototype.render == "function" ? d("%s(...): No `render` method found on the returned component instance: did you accidentally return an object from the constructor?", r) : d("%s(...): No `render` method found on the returned component instance: you may have forgotten to define `render`.", r)), a.getInitialState && !a.getInitialState.isReactClassApproved && !a.state && d("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?", r), a.getDefaultProps && !a.getDefaultProps.isReactClassApproved && d("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.", r), a.propTypes && d("propTypes was defined as an instance property on %s. Use a static property to define propTypes instead.", r), a.contextType && d("contextType was defined as an instance property on %s. Use a static property to define contextType instead.", r), t.childContextTypes && !_s.has(t) && // Strict Mode has its own warning for legacy context, so we can skip
      // this one.
      (e.mode & Lt) === je && (_s.add(t), d(`%s uses the legacy childContextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() instead

.Learn more about this warning here: https://reactjs.org/link/legacy-context`, r)), t.contextTypes && !_s.has(t) && // Strict Mode has its own warning for legacy context, so we can skip
      // this one.
      (e.mode & Lt) === je && (_s.add(t), d(`%s uses the legacy contextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() with static contextType instead.

Learn more about this warning here: https://reactjs.org/link/legacy-context`, r)), a.contextTypes && d("contextTypes was defined as an instance property on %s. Use a static property to define contextTypes instead.", r), t.contextType && t.contextTypes && !Sm.has(t) && (Sm.add(t), d("%s declares both contextTypes and contextType static properties. The legacy contextTypes property will be ignored.", r)), typeof a.componentShouldUpdate == "function" && d("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.", r), t.prototype && t.prototype.isPureReactComponent && typeof a.shouldComponentUpdate < "u" && d("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.", nt(t) || "A pure component"), typeof a.componentDidUnmount == "function" && d("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?", r), typeof a.componentDidReceiveProps == "function" && d("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().", r), typeof a.componentWillRecieveProps == "function" && d("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?", r), typeof a.UNSAFE_componentWillRecieveProps == "function" && d("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?", r);
      var l = a.props !== n;
      a.props !== void 0 && l && d("%s(...): When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.", r, r), a.defaultProps && d("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.", r, r), typeof a.getSnapshotBeforeUpdate == "function" && typeof a.componentDidUpdate != "function" && !ym.has(t) && (ym.add(t), d("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.", nt(t))), typeof a.getDerivedStateFromProps == "function" && d("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.", r), typeof a.getDerivedStateFromError == "function" && d("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.", r), typeof t.getSnapshotBeforeUpdate == "function" && d("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.", r);
      var u = a.state;
      u && (typeof u != "object" || Ye(u)) && d("%s.state: must be set to an object or null", r), typeof a.getChildContext == "function" && typeof t.childContextTypes != "object" && d("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().", r);
    }
  }
  function sy(e, t) {
    t.updater = Cm, e.stateNode = t, BE(t, e), t._reactInternalInstance = vm;
  }
  function uy(e, t, n) {
    var a = !1, r = aa, i = aa, l = t.contextType;
    if ("contextType" in t) {
      var u = (
        // Allow null for conditional declaration
        l === null || l !== void 0 && l.$$typeof === de && l._context === void 0
      );
      if (!u && !Rm.has(t)) {
        Rm.add(t);
        var c = "";
        l === void 0 ? c = " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file." : typeof l != "object" ? c = " However, it is set to a " + typeof l + "." : l.$$typeof === Z ? c = " Did you accidentally pass the Context.Provider instead?" : l._context !== void 0 ? c = " Did you accidentally pass the Context.Consumer instead?" : c = " However, it is set to an object with keys {" + Object.keys(l).join(", ") + "}.", d("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s", nt(t) || "Component", c);
      }
    }
    if (typeof l == "object" && l !== null)
      i = Yt(l);
    else {
      r = Ml(e, t, !0);
      var h = t.contextTypes;
      a = h != null, i = a ? Vl(e, r) : aa;
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
    sy(e, v);
    {
      if (typeof t.getDerivedStateFromProps == "function" && C === null) {
        var D = nt(t) || "Component";
        bm.has(D) || (bm.add(D), d("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.", D, v.state === null ? "null" : "undefined", D));
      }
      if (typeof t.getDerivedStateFromProps == "function" || typeof v.getSnapshotBeforeUpdate == "function") {
        var V = null, L = null, H = null;
        if (typeof v.componentWillMount == "function" && v.componentWillMount.__suppressDeprecationWarning !== !0 ? V = "componentWillMount" : typeof v.UNSAFE_componentWillMount == "function" && (V = "UNSAFE_componentWillMount"), typeof v.componentWillReceiveProps == "function" && v.componentWillReceiveProps.__suppressDeprecationWarning !== !0 ? L = "componentWillReceiveProps" : typeof v.UNSAFE_componentWillReceiveProps == "function" && (L = "UNSAFE_componentWillReceiveProps"), typeof v.componentWillUpdate == "function" && v.componentWillUpdate.__suppressDeprecationWarning !== !0 ? H = "componentWillUpdate" : typeof v.UNSAFE_componentWillUpdate == "function" && (H = "UNSAFE_componentWillUpdate"), V !== null || L !== null || H !== null) {
          var fe = nt(t) || "Component", De = typeof t.getDerivedStateFromProps == "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
          Nm.has(fe) || (Nm.add(fe), d(`Unsafe legacy lifecycles will not be called for components using new component APIs.

%s uses %s but also contains the following legacy lifecycles:%s%s%s

The above lifecycles should be removed. Learn more about this warning here:
https://reactjs.org/link/unsafe-component-lifecycles`, fe, De, V !== null ? `
  ` + V : "", L !== null ? `
  ` + L : "", H !== null ? `
  ` + H : ""));
        }
      }
    }
    return a && Jg(e, r, i), v;
  }
  function a1(e, t) {
    var n = t.state;
    typeof t.componentWillMount == "function" && t.componentWillMount(), typeof t.UNSAFE_componentWillMount == "function" && t.UNSAFE_componentWillMount(), n !== t.state && (d("%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", Fe(e) || "Component"), Cm.enqueueReplaceState(t, t.state, null));
  }
  function cy(e, t, n, a) {
    var r = t.state;
    if (typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, a), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, a), t.state !== r) {
      {
        var i = Fe(e) || "Component";
        gm.has(i) || (gm.add(i), d("%s.componentWillReceiveProps(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", i));
      }
      Cm.enqueueReplaceState(t, t.state, null);
    }
  }
  function jm(e, t, n, a) {
    n1(e, t, n);
    var r = e.stateNode;
    r.props = n, r.state = e.memoizedState, r.refs = {}, kp(e);
    var i = t.contextType;
    if (typeof i == "object" && i !== null)
      r.context = Yt(i);
    else {
      var l = Ml(e, t, !0);
      r.context = Vl(e, l);
    }
    {
      if (r.state === n) {
        var u = nt(t) || "Component";
        Em.has(u) || (Em.add(u), d("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.", u));
      }
      e.mode & Lt && Ma.recordLegacyContextWarning(e, r), Ma.recordUnsafeLifecycleWarnings(e, r);
    }
    r.state = e.memoizedState;
    var c = t.getDerivedStateFromProps;
    if (typeof c == "function" && (Dm(e, t, c, n), r.state = e.memoizedState), typeof t.getDerivedStateFromProps != "function" && typeof r.getSnapshotBeforeUpdate != "function" && (typeof r.UNSAFE_componentWillMount == "function" || typeof r.componentWillMount == "function") && (a1(e, r), Sc(e, n, r, a), r.state = e.memoizedState), typeof r.componentDidMount == "function") {
      var h = at;
      h |= Ci, (e.mode & Wa) !== je && (h |= zr), e.flags |= h;
    }
  }
  function r1(e, t, n, a) {
    var r = e.stateNode, i = e.memoizedProps;
    r.props = i;
    var l = r.context, u = t.contextType, c = aa;
    if (typeof u == "object" && u !== null)
      c = Yt(u);
    else {
      var h = Ml(e, t, !0);
      c = Vl(e, h);
    }
    var v = t.getDerivedStateFromProps, C = typeof v == "function" || typeof r.getSnapshotBeforeUpdate == "function";
    !C && (typeof r.UNSAFE_componentWillReceiveProps == "function" || typeof r.componentWillReceiveProps == "function") && (i !== n || l !== c) && cy(e, r, n, c), Db();
    var D = e.memoizedState, V = r.state = D;
    if (Sc(e, n, r, a), V = e.memoizedState, i === n && D === V && !rc() && !Rc()) {
      if (typeof r.componentDidMount == "function") {
        var L = at;
        L |= Ci, (e.mode & Wa) !== je && (L |= zr), e.flags |= L;
      }
      return !1;
    }
    typeof v == "function" && (Dm(e, t, v, n), V = e.memoizedState);
    var H = Rc() || oy(e, t, i, n, D, V, c);
    if (H) {
      if (!C && (typeof r.UNSAFE_componentWillMount == "function" || typeof r.componentWillMount == "function") && (typeof r.componentWillMount == "function" && r.componentWillMount(), typeof r.UNSAFE_componentWillMount == "function" && r.UNSAFE_componentWillMount()), typeof r.componentDidMount == "function") {
        var fe = at;
        fe |= Ci, (e.mode & Wa) !== je && (fe |= zr), e.flags |= fe;
      }
    } else {
      if (typeof r.componentDidMount == "function") {
        var De = at;
        De |= Ci, (e.mode & Wa) !== je && (De |= zr), e.flags |= De;
      }
      e.memoizedProps = n, e.memoizedState = V;
    }
    return r.props = n, r.state = V, r.context = c, H;
  }
  function i1(e, t, n, a, r) {
    var i = t.stateNode;
    Rb(e, t);
    var l = t.memoizedProps, u = t.type === t.elementType ? l : La(t.type, l);
    i.props = u;
    var c = t.pendingProps, h = i.context, v = n.contextType, C = aa;
    if (typeof v == "object" && v !== null)
      C = Yt(v);
    else {
      var D = Ml(t, n, !0);
      C = Vl(t, D);
    }
    var V = n.getDerivedStateFromProps, L = typeof V == "function" || typeof i.getSnapshotBeforeUpdate == "function";
    !L && (typeof i.UNSAFE_componentWillReceiveProps == "function" || typeof i.componentWillReceiveProps == "function") && (l !== c || h !== C) && cy(t, i, a, C), Db();
    var H = t.memoizedState, fe = i.state = H;
    if (Sc(t, a, i, r), fe = t.memoizedState, l === c && H === fe && !rc() && !Rc() && !Me)
      return typeof i.componentDidUpdate == "function" && (l !== e.memoizedProps || H !== e.memoizedState) && (t.flags |= at), typeof i.getSnapshotBeforeUpdate == "function" && (l !== e.memoizedProps || H !== e.memoizedState) && (t.flags |= hl), !1;
    typeof V == "function" && (Dm(t, n, V, a), fe = t.memoizedState);
    var De = Rc() || oy(t, n, u, a, H, fe, C) || // TODO: In some cases, we'll end up checking if context has changed twice,
    // both before and after `shouldComponentUpdate` has been called. Not ideal,
    // but I'm loath to refactor this function. This only happens for memoized
    // components so it's not that common.
    Me;
    return De ? (!L && (typeof i.UNSAFE_componentWillUpdate == "function" || typeof i.componentWillUpdate == "function") && (typeof i.componentWillUpdate == "function" && i.componentWillUpdate(a, fe, C), typeof i.UNSAFE_componentWillUpdate == "function" && i.UNSAFE_componentWillUpdate(a, fe, C)), typeof i.componentDidUpdate == "function" && (t.flags |= at), typeof i.getSnapshotBeforeUpdate == "function" && (t.flags |= hl)) : (typeof i.componentDidUpdate == "function" && (l !== e.memoizedProps || H !== e.memoizedState) && (t.flags |= at), typeof i.getSnapshotBeforeUpdate == "function" && (l !== e.memoizedProps || H !== e.memoizedState) && (t.flags |= hl), t.memoizedProps = a, t.memoizedState = fe), i.props = a, i.state = fe, i.context = C, De;
  }
  function Ii(e, t) {
    return {
      value: e,
      source: t,
      stack: bi(t),
      digest: null
    };
  }
  function Tm(e, t, n) {
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
  function wm(e, t) {
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
      var u = r ? Fe(r) : null, c = u ? "The above error occurred in the <" + u + "> component:" : "The above error occurred in one of your React components:", h;
      if (e.tag === x)
        h = `Consider adding an error boundary to your tree to customize error handling behavior.
Visit https://reactjs.org/link/error-boundaries to learn more about error boundaries.`;
      else {
        var v = Fe(e) || "Anonymous";
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
  function dy(e, t, n) {
    var a = Dr(xt, n);
    a.tag = Ap, a.payload = {
      element: null
    };
    var r = t.value;
    return a.callback = function() {
      Zj(r), wm(e, t);
    }, a;
  }
  function _m(e, t, n) {
    var a = Dr(xt, n);
    a.tag = Ap;
    var r = e.type.getDerivedStateFromError;
    if (typeof r == "function") {
      var i = t.value;
      a.payload = function() {
        return r(i);
      }, a.callback = function() {
        EN(e), wm(e, t);
      };
    }
    var l = e.stateNode;
    return l !== null && typeof l.componentDidCatch == "function" && (a.callback = function() {
      EN(e), wm(e, t), typeof r != "function" && Xj(this);
      var c = t.value, h = t.stack;
      this.componentDidCatch(c, {
        componentStack: h !== null ? h : ""
      }), typeof r != "function" && (Zn(e.lanes, Ae) || d("%s: Error boundaries should implement getDerivedStateFromError(). In that method, return a state update to display an error message or fallback UI.", Fe(e) || "Unknown"));
    }), a;
  }
  function fy(e, t, n) {
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
    if ((e.mode & Qe) === je && (n === R || n === P || n === U)) {
      var a = e.alternate;
      a ? (e.updateQueue = a.updateQueue, e.memoizedState = a.memoizedState, e.lanes = a.lanes) : (e.updateQueue = null, e.memoizedState = null);
    }
  }
  function py(e) {
    var t = e;
    do {
      if (t.tag === te && $C(t))
        return t;
      t = t.return;
    } while (t !== null);
    return null;
  }
  function my(e, t, n, a, r) {
    if ((e.mode & Qe) === je) {
      if (e === t)
        e.flags |= zn;
      else {
        if (e.flags |= rt, n.flags |= Wd, n.flags &= -52805, n.tag === j) {
          var i = n.alternate;
          if (i === null)
            n.tag = X;
          else {
            var l = Dr(xt, Ae);
            l.tag = yc, Xr(n, l, Ae);
          }
        }
        n.lanes = Be(n.lanes, Ae);
      }
      return e;
    }
    return e.flags |= zn, e.lanes = r, e;
  }
  function c1(e, t, n, a, r) {
    if (n.flags |= Eu, Ta && Gs(e, r), a !== null && typeof a == "object" && typeof a.then == "function") {
      var i = a;
      u1(n), gn() && n.mode & Qe && ib();
      var l = py(t);
      if (l !== null) {
        l.flags &= ~mr, my(l, t, n, e, r), l.mode & Qe && fy(e, i, r), s1(l, e, i);
        return;
      } else {
        if (!MS(r)) {
          fy(e, i, r), uh();
          return;
        }
        var u = new Error("A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator. To fix, updates that suspend should be wrapped with startTransition.");
        a = u;
      }
    } else if (gn() && n.mode & Qe) {
      ib();
      var c = py(t);
      if (c !== null) {
        (c.flags & zn) === _e && (c.flags |= mr), my(c, t, n, e, r), Ep(Ii(a, n));
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
          var D = dy(h, v, C);
          Up(h, D);
          return;
        }
        case j:
          var V = a, L = h.type, H = h.stateNode;
          if ((h.flags & rt) === _e && (typeof L.getDerivedStateFromError == "function" || H !== null && typeof H.componentDidCatch == "function" && !pN(H))) {
            h.flags |= zn;
            var fe = Uo(r);
            h.lanes = Be(h.lanes, fe);
            var De = _m(h, V, fe);
            Up(h, De);
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
  var Os = m.ReactCurrentOwner, ka = !1, Om, Ms, Mm, Vm, Am, Yi, Lm, Wc, Vs;
  Om = {}, Ms = {}, Mm = {}, Vm = {}, Am = {}, Yi = !1, Lm = {}, Wc = {}, Vs = {};
  function Pn(e, t, n, a) {
    e === null ? t.child = gb(t, null, n, a) : t.child = Ul(t, e.child, n, a);
  }
  function f1(e, t, n, a) {
    t.child = Ul(t, e.child, null, a), t.child = Ul(t, null, n, a);
  }
  function hy(e, t, n, a, r) {
    if (t.type !== t.elementType) {
      var i = n.propTypes;
      i && _a(
        i,
        a,
        // Resolved props
        "prop",
        nt(n)
      );
    }
    var l = n.render, u = t.ref, c, h;
    zl(t, r), Oo(t);
    {
      if (Os.current = t, da(!0), c = Yl(e, t, l, a, u, r), h = ql(), t.mode & Lt) {
        un(!0);
        try {
          c = Yl(e, t, l, a, u, r), h = ql();
        } finally {
          un(!1);
        }
      }
      da(!1);
    }
    return bl(), e !== null && !ka ? (Ob(e, t, r), Cr(e, t, r)) : (gn() && h && vp(t), t.flags |= ml, Pn(e, t, c, r), t.child);
  }
  function vy(e, t, n, a, r) {
    if (e === null) {
      var i = n.type;
      if (gT(i) && n.compare === null && // SimpleMemoComponent codepath doesn't resolve outer props either.
      n.defaultProps === void 0) {
        var l = i;
        return l = eo(i), t.tag = U, t.type = l, Fm(t, i), gy(e, t, l, a, r);
      }
      {
        var u = i.propTypes;
        if (u && _a(
          u,
          a,
          // Resolved props
          "prop",
          nt(i)
        ), n.defaultProps !== void 0) {
          var c = nt(i) || "Unknown";
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
        nt(v)
      );
    }
    var D = e.child, V = Im(e, r);
    if (!V) {
      var L = D.memoizedProps, H = n.compare;
      if (H = H !== null ? H : Jo, H(L, a) && e.ref === t.ref)
        return Cr(e, t, r);
    }
    t.flags |= ml;
    var fe = Qi(D, a);
    return fe.ref = t.ref, fe.return = t, t.child = fe, fe;
  }
  function gy(e, t, n, a, r) {
    if (t.type !== t.elementType) {
      var i = t.elementType;
      if (i.$$typeof === Ce) {
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
          nt(i)
        );
      }
    }
    if (e !== null) {
      var v = e.memoizedProps;
      if (Jo(v, a) && e.ref === t.ref && // Prevent bailout if the implementation changed due to hot reload.
      t.type === e.type)
        if (ka = !1, t.pendingProps = a = v, Im(e, r))
          (e.flags & Wd) !== _e && (ka = !0);
        else return t.lanes = e.lanes, Cr(e, t, r);
    }
    return km(e, t, n, a, r);
  }
  function by(e, t, n) {
    var a = t.pendingProps, r = a.children, i = e !== null ? e.memoizedState : null;
    if (a.mode === "hidden" || Pe)
      if ((t.mode & Qe) === je) {
        var l = {
          baseLanes: Q,
          cachePool: null,
          transitions: null
        };
        t.memoizedState = l, od(t, n);
      } else if (Zn(n, Jn)) {
        var C = {
          baseLanes: Q,
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
        t.lanes = t.childLanes = Jn;
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
  function p1(e, t, n) {
    var a = t.pendingProps;
    return Pn(e, t, a, n), t.child;
  }
  function m1(e, t, n) {
    var a = t.pendingProps.children;
    return Pn(e, t, a, n), t.child;
  }
  function h1(e, t, n) {
    {
      t.flags |= at;
      {
        var a = t.stateNode;
        a.effectDuration = 0, a.passiveEffectDuration = 0;
      }
    }
    var r = t.pendingProps, i = r.children;
    return Pn(e, t, i, n), t.child;
  }
  function yy(e, t) {
    var n = t.ref;
    (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= Ri, t.flags |= Kd);
  }
  function km(e, t, n, a, r) {
    if (t.type !== t.elementType) {
      var i = n.propTypes;
      i && _a(
        i,
        a,
        // Resolved props
        "prop",
        nt(n)
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
      if (Os.current = t, da(!0), c = Yl(e, t, n, a, l, r), h = ql(), t.mode & Lt) {
        un(!0);
        try {
          c = Yl(e, t, n, a, l, r), h = ql();
        } finally {
          un(!1);
        }
      }
      da(!1);
    }
    return bl(), e !== null && !ka ? (Ob(e, t, r), Cr(e, t, r)) : (gn() && h && vp(t), t.flags |= ml, Pn(e, t, c, r), t.child);
  }
  function Ny(e, t, n, a, r) {
    {
      switch (MT(t)) {
        case !1: {
          var i = t.stateNode, l = t.type, u = new l(t.memoizedProps, i.context), c = u.state;
          i.updater.enqueueSetState(i, c, null);
          break;
        }
        case !0: {
          t.flags |= rt, t.flags |= zn;
          var h = new Error("Simulated error coming from DevTools"), v = Uo(r);
          t.lanes = Be(t.lanes, v);
          var C = _m(t, Ii(h, t), v);
          Up(t, C);
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
          nt(n)
        );
      }
    }
    var V;
    Xa(n) ? (V = !0, lc(t)) : V = !1, zl(t, r);
    var L = t.stateNode, H;
    L === null ? (Qc(e, t), uy(t, n, a), jm(t, n, a, r), H = !0) : e === null ? H = r1(t, n, a, r) : H = i1(e, t, n, a, r);
    var fe = Um(e, t, n, H, V, r);
    {
      var De = t.stateNode;
      H && De.props !== a && (Yi || d("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.", Fe(t) || "a component"), Yi = !0);
    }
    return fe;
  }
  function Um(e, t, n, a, r, i) {
    yy(e, t);
    var l = (t.flags & rt) !== _e;
    if (!a && !l)
      return r && tb(t, n, !1), Cr(e, t, i);
    var u = t.stateNode;
    Os.current = t;
    var c;
    if (l && typeof n.getDerivedStateFromError != "function")
      c = null, ry();
    else {
      Oo(t);
      {
        if (da(!0), c = u.render(), t.mode & Lt) {
          un(!0);
          try {
            u.render();
          } finally {
            un(!1);
          }
        }
        da(!1);
      }
      bl();
    }
    return t.flags |= ml, e !== null && l ? f1(e, t, c, i) : Pn(e, t, c, i), t.memoizedState = u.state, r && tb(t, n, !0), t.child;
  }
  function xy(e) {
    var t = e.stateNode;
    t.pendingContext ? Zg(e, t.pendingContext, t.pendingContext !== t.context) : t.context && Zg(e, t.context, !1), Fp(e, t.containerInfo);
  }
  function v1(e, t, n) {
    if (xy(t), e === null)
      throw new Error("Should have a current fiber. This is a bug in React.");
    var a = t.pendingProps, r = t.memoizedState, i = r.element;
    Rb(e, t), Sc(t, a, null, n);
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
      if (h.baseState = c, t.memoizedState = c, t.flags & mr) {
        var v = Ii(new Error("There was an error while hydrating. Because the error happened outside of a Suspense boundary, the entire root will switch to client rendering."), t);
        return Ey(e, t, u, n, v);
      } else if (u !== i) {
        var C = Ii(new Error("This root received an early update, before anything was able hydrate. Switched the entire root to client rendering."), t);
        return Ey(e, t, u, n, C);
      } else {
        yC(t);
        var D = gb(t, null, u, n);
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
  function Ey(e, t, n, a, r) {
    return kl(), Ep(r), t.flags |= mr, Pn(e, t, n, a), t.child;
  }
  function g1(e, t, n) {
    Tb(t), e === null && xp(t);
    var a = t.type, r = t.pendingProps, i = e !== null ? e.memoizedProps : null, l = r.children, u = np(a, r);
    return u ? l = null : i !== null && np(a, i) && (t.flags |= wo), yy(e, t), Pn(e, t, l, n), t.child;
  }
  function b1(e, t) {
    return e === null && xp(t), null;
  }
  function y1(e, t, n, a) {
    Qc(e, t);
    var r = t.pendingProps, i = n, l = i._payload, u = i._init, c = u(l);
    t.type = c;
    var h = t.tag = bT(c), v = La(c, r), C;
    switch (h) {
      case R:
        return Fm(t, c), t.type = c = eo(c), C = km(null, t, c, v, a), C;
      case j:
        return t.type = c = mh(c), C = Ny(null, t, c, v, a), C;
      case P:
        return t.type = c = hh(c), C = hy(null, t, c, v, a), C;
      case F: {
        if (t.type !== t.elementType) {
          var D = c.propTypes;
          D && _a(
            D,
            v,
            // Resolved for outer only
            "prop",
            nt(c)
          );
        }
        return C = vy(
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
    throw c !== null && typeof c == "object" && c.$$typeof === Ce && (V = " Did you wrap a component in React.lazy() more than once?"), new Error("Element type is invalid. Received a promise that resolves to: " + c + ". " + ("Lazy element type must resolve to a class or function." + V));
  }
  function N1(e, t, n, a, r) {
    Qc(e, t), t.tag = j;
    var i;
    return Xa(n) ? (i = !0, lc(t)) : i = !1, zl(t, r), uy(t, n, a), jm(t, n, a, r), Um(null, t, n, !0, i, r);
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
        var h = nt(n) || "Unknown";
        Om[h] || (d("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.", h, h), Om[h] = !0);
      }
      t.mode & Lt && Ma.recordLegacyContextWarning(t, null), da(!0), Os.current = t, u = Yl(null, t, n, r, i, a), c = ql(), da(!1);
    }
    if (bl(), t.flags |= ml, typeof u == "object" && u !== null && typeof u.render == "function" && u.$$typeof === void 0) {
      var v = nt(n) || "Unknown";
      Ms[v] || (d("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", v, v, v), Ms[v] = !0);
    }
    if (
      // Run these checks in production only if the flag is off.
      // Eventually we'll delete this branch altogether.
      typeof u == "object" && u !== null && typeof u.render == "function" && u.$$typeof === void 0
    ) {
      {
        var C = nt(n) || "Unknown";
        Ms[C] || (d("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", C, C, C), Ms[C] = !0);
      }
      t.tag = j, t.memoizedState = null, t.updateQueue = null;
      var D = !1;
      return Xa(n) ? (D = !0, lc(t)) : D = !1, t.memoizedState = u.state !== null && u.state !== void 0 ? u.state : null, kp(t), sy(t, u), jm(t, n, r, a), Um(null, t, n, !0, D, a);
    } else {
      if (t.tag = R, t.mode & Lt) {
        un(!0);
        try {
          u = Yl(null, t, n, r, i, a), c = ql();
        } finally {
          un(!1);
        }
      }
      return gn() && c && vp(t), Pn(null, t, u, a), Fm(t, n), t.child;
    }
  }
  function Fm(e, t) {
    {
      if (t && t.childContextTypes && d("%s(...): childContextTypes cannot be defined on a function component.", t.displayName || t.name || "Component"), e.ref !== null) {
        var n = "", a = kr();
        a && (n += `

Check the render method of \`` + a + "`.");
        var r = a || "", i = e._debugSource;
        i && (r = i.fileName + ":" + i.lineNumber), Am[r] || (Am[r] = !0, d("Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?%s", n));
      }
      if (t.defaultProps !== void 0) {
        var l = nt(t) || "Unknown";
        Vs[l] || (d("%s: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.", l), Vs[l] = !0);
      }
      if (typeof t.getDerivedStateFromProps == "function") {
        var u = nt(t) || "Unknown";
        Vm[u] || (d("%s: Function components do not support getDerivedStateFromProps.", u), Vm[u] = !0);
      }
      if (typeof t.contextType == "object" && t.contextType !== null) {
        var c = nt(t) || "Unknown";
        Mm[c] || (d("%s: Function components do not support contextType.", c), Mm[c] = !0);
      }
    }
  }
  var zm = {
    dehydrated: null,
    treeContext: null,
    retryLane: cn
  };
  function Pm(e) {
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
    return Hp(e, Es);
  }
  function R1(e, t) {
    return wu(e.childLanes, t);
  }
  function Sy(e, t, n) {
    var a = t.pendingProps;
    VT(t) && (t.flags |= rt);
    var r = Va.current, i = !1, l = (t.flags & rt) !== _e;
    if (l || S1(r, e) ? (i = !0, t.flags &= ~rt) : (e === null || e.memoizedState !== null) && (r = BC(r, _b)), r = Hl(r), Zr(t, r), e === null) {
      xp(t);
      var u = t.memoizedState;
      if (u !== null) {
        var c = u.dehydrated;
        if (c !== null)
          return w1(t, c);
      }
      var h = a.children, v = a.fallback;
      if (i) {
        var C = D1(t, h, v, n), D = t.child;
        return D.memoizedState = Pm(n), t.memoizedState = zm, C;
      } else
        return Hm(t, h);
    } else {
      var V = e.memoizedState;
      if (V !== null) {
        var L = V.dehydrated;
        if (L !== null)
          return _1(e, t, l, a, L, V, n);
      }
      if (i) {
        var H = a.fallback, fe = a.children, De = j1(e, t, fe, H, n), Ee = t.child, Je = e.child.memoizedState;
        return Ee.memoizedState = Je === null ? Pm(n) : E1(Je, n), Ee.childLanes = R1(e, n), t.memoizedState = zm, De;
      } else {
        var qe = a.children, _ = C1(e, t, qe, n);
        return t.memoizedState = null, _;
      }
    }
  }
  function Hm(e, t, n) {
    var a = e.mode, r = {
      mode: "visible",
      children: t
    }, i = Bm(r, a);
    return i.return = e, e.child = i, i;
  }
  function D1(e, t, n, a) {
    var r = e.mode, i = e.child, l = {
      mode: "hidden",
      children: t
    }, u, c;
    return (r & Qe) === je && i !== null ? (u = i, u.childLanes = Q, u.pendingProps = l, e.mode & ft && (u.actualDuration = 0, u.actualStartTime = -1, u.selfBaseDuration = 0, u.treeBaseDuration = 0), c = oi(n, r, a, null)) : (u = Bm(l, r), c = oi(n, r, a, null)), u.return = e, c.return = e, u.sibling = c, e.child = u, c;
  }
  function Bm(e, t, n) {
    return RN(e, t, Q, null);
  }
  function Ry(e, t) {
    return Qi(e, t);
  }
  function C1(e, t, n, a) {
    var r = e.child, i = r.sibling, l = Ry(r, {
      mode: "visible",
      children: n
    });
    if ((t.mode & Qe) === je && (l.lanes = a), l.return = t, l.sibling = null, i !== null) {
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
      (i & Qe) === je && // Make sure we're on the second pass, i.e. the primary child fragment was
      // already cloned. In legacy mode, the only case where this isn't true is
      // when DevTools forces us to display a fallback; we skip the first render
      // pass entirely and go straight to rendering the fallback. (In Concurrent
      // Mode, SuspenseList can also trigger this scenario, but this is a legacy-
      // only codepath.)
      t.child !== l
    ) {
      var v = t.child;
      h = v, h.childLanes = Q, h.pendingProps = c, t.mode & ft && (h.actualDuration = 0, h.actualStartTime = -1, h.selfBaseDuration = l.selfBaseDuration, h.treeBaseDuration = l.treeBaseDuration), t.deletions = null;
    } else
      h = Ry(l, c), h.subtreeFlags = l.subtreeFlags & vr;
    var C;
    return u !== null ? C = Qi(u, a) : (C = oi(a, i, r, null), C.flags |= It), C.return = t, h.return = t, h.sibling = C, t.child = h, C;
  }
  function Kc(e, t, n, a) {
    a !== null && Ep(a), Ul(t, e.child, null, n);
    var r = t.pendingProps, i = r.children, l = Hm(t, i);
    return l.flags |= It, t.memoizedState = null, l;
  }
  function T1(e, t, n, a, r) {
    var i = t.mode, l = {
      mode: "visible",
      children: n
    }, u = Bm(l, i), c = oi(a, i, r, null);
    return c.flags |= It, u.return = t, c.return = t, u.sibling = c, t.child = u, (t.mode & Qe) !== je && Ul(t, e.child, null, r), c;
  }
  function w1(e, t, n) {
    return (e.mode & Qe) === je ? (d("Cannot hydrate Suspense in legacy mode. Switch from ReactDOM.hydrate(element, container) to ReactDOMClient.hydrateRoot(container, <App />).render(element) or remove the Suspense components from the server rendered components."), e.lanes = Ae) : lp(t) ? e.lanes = wi : e.lanes = Jn, null;
  }
  function _1(e, t, n, a, r, i, l) {
    if (n)
      if (t.flags & mr) {
        t.flags &= ~mr;
        var _ = Tm(new Error("There was an error while hydrating this Suspense boundary. Switched to client rendering."));
        return Kc(e, t, l, _);
      } else {
        if (t.memoizedState !== null)
          return t.child = e.child, t.flags |= rt, null;
        var B = a.children, O = a.fallback, ne = T1(e, t, B, O, l), ge = t.child;
        return ge.memoizedState = Pm(l), t.memoizedState = zm, ne;
      }
    else {
      if (gC(), (t.mode & Qe) === je)
        return Kc(
          e,
          t,
          l,
          // TODO: When we delete legacy mode, we should make this error argument
          // required — every concurrent mode path that causes hydration to
          // de-opt to client rendering should have an error message.
          null
        );
      if (lp(r)) {
        var u, c, h;
        {
          var v = AD(r);
          u = v.digest, c = v.message, h = v.stack;
        }
        var C;
        c ? C = new Error(c) : C = new Error("The server could not finish this Suspense boundary, likely due to an error during server rendering. Switched to client rendering.");
        var D = Tm(C, u, h);
        return Kc(e, t, l, D);
      }
      var V = Zn(l, e.childLanes);
      if (ka || V) {
        var L = ld();
        if (L !== null) {
          var H = PS(L, l);
          if (H !== cn && H !== i.retryLane) {
            i.retryLane = H;
            var fe = xt;
            Gn(e, H), rn(L, e, H, fe);
          }
        }
        uh();
        var De = Tm(new Error("This Suspense boundary received an update before it finished hydrating. This caused the boundary to switch to client rendering. The usual way to fix this is to wrap the original update in startTransition."));
        return Kc(e, t, l, De);
      } else if (Gg(r)) {
        t.flags |= rt, t.child = e.child;
        var Ee = tT.bind(null, e);
        return LD(r, Ee), null;
      } else {
        NC(t, r, i.treeContext);
        var Je = a.children, qe = Hm(t, Je);
        return qe.flags |= hr, qe;
      }
    }
  }
  function Dy(e, t, n) {
    e.lanes = Be(e.lanes, t);
    var a = e.alternate;
    a !== null && (a.lanes = Be(a.lanes, t)), Mp(e.return, t, n);
  }
  function O1(e, t, n) {
    for (var a = t; a !== null; ) {
      if (a.tag === te) {
        var r = a.memoizedState;
        r !== null && Dy(a, n, e);
      } else if (a.tag === ie)
        Dy(a, n, e);
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
    if (e !== void 0 && e !== "forwards" && e !== "backwards" && e !== "together" && !Lm[e])
      if (Lm[e] = !0, typeof e == "string")
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
  function Cy(e, t) {
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
          if (!Cy(e[n], n))
            return;
      } else {
        var a = Ca(e);
        if (typeof a == "function") {
          var r = a.call(e);
          if (r)
            for (var i = r.next(), l = 0; !i.done; i = r.next()) {
              if (!Cy(i.value, l))
                return;
              l++;
            }
        } else
          d('A single row was passed to a <SuspenseList revealOrder="%s" />. This is not useful since it needs multiple rows. Did you mean to pass multiple children or an array?', t);
      }
  }
  function $m(e, t, n, a, r) {
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
  function jy(e, t, n) {
    var a = t.pendingProps, r = a.revealOrder, i = a.tail, l = a.children;
    V1(r), A1(i, r), L1(l, r), Pn(e, t, l, n);
    var u = Va.current, c = Hp(u, Es);
    if (c)
      u = Bp(u, Es), t.flags |= rt;
    else {
      var h = e !== null && (e.flags & rt) !== _e;
      h && O1(t, t.child, n), u = Hl(u);
    }
    if (Zr(t, u), (t.mode & Qe) === je)
      t.memoizedState = null;
    else
      switch (r) {
        case "forwards": {
          var v = M1(t.child), C;
          v === null ? (C = t.child, t.child = null) : (C = v.sibling, v.sibling = null), $m(
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
            var H = V.sibling;
            V.sibling = D, D = V, V = H;
          }
          $m(
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
          $m(
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
    Fp(t, t.stateNode.containerInfo);
    var a = t.pendingProps;
    return e === null ? t.child = Ul(t, null, a, n) : Pn(e, t, a, n), t.child;
  }
  var Ty = !1;
  function U1(e, t, n) {
    var a = t.type, r = a._context, i = t.pendingProps, l = t.memoizedProps, u = i.value;
    {
      "value" in i || Ty || (Ty = !0, d("The `value` prop is required for the `<Context.Provider>`. Did you misspell it or forget to pass it?"));
      var c = t.type.propTypes;
      c && _a(c, i, "prop", "Context.Provider");
    }
    if (Nb(t, r, u), l !== null) {
      var h = l.value;
      if (na(h, u)) {
        if (l.children === i.children && !rc())
          return Cr(e, t, n);
      } else
        VC(t, r, n);
    }
    var v = i.children;
    return Pn(e, t, v, n), t.child;
  }
  var wy = !1;
  function F1(e, t, n) {
    var a = t.type;
    a._context === void 0 ? a !== a.Consumer && (wy || (wy = !0, d("Rendering <Context> directly is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?"))) : a = a._context;
    var r = t.pendingProps, i = r.children;
    typeof i != "function" && d("A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it."), zl(t, n);
    var l = Yt(a);
    Oo(t);
    var u;
    return Os.current = t, da(!0), u = i(l), da(!1), bl(), t.flags |= ml, Pn(e, t, u, n), t.child;
  }
  function As() {
    ka = !0;
  }
  function Qc(e, t) {
    (t.mode & Qe) === je && e !== null && (e.alternate = null, t.alternate = null, t.flags |= It);
  }
  function Cr(e, t, n) {
    return e !== null && (t.dependencies = e.dependencies), ry(), qs(t.lanes), Zn(n, t.childLanes) ? (OC(e, t), t.child) : null;
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
  function Im(e, t) {
    var n = e.lanes;
    return !!Zn(n, t);
  }
  function P1(e, t, n) {
    switch (t.tag) {
      case x:
        xy(t), t.stateNode, kl();
        break;
      case k:
        Tb(t);
        break;
      case j: {
        var a = t.type;
        Xa(a) && lc(t);
        break;
      }
      case T:
        Fp(t, t.stateNode.containerInfo);
        break;
      case G: {
        var r = t.memoizedProps.value, i = t.type._context;
        Nb(t, i, r);
        break;
      }
      case $:
        {
          var l = Zn(n, t.childLanes);
          l && (t.flags |= at);
          {
            var u = t.stateNode;
            u.effectDuration = 0, u.passiveEffectDuration = 0;
          }
        }
        break;
      case te: {
        var c = t.memoizedState;
        if (c !== null) {
          if (c.dehydrated !== null)
            return Zr(t, Hl(Va.current)), t.flags |= rt, null;
          var h = t.child, v = h.childLanes;
          if (Zn(n, v))
            return Sy(e, t, n);
          Zr(t, Hl(Va.current));
          var C = Cr(e, t, n);
          return C !== null ? C.sibling : null;
        } else
          Zr(t, Hl(Va.current));
        break;
      }
      case ie: {
        var D = (e.flags & rt) !== _e, V = Zn(n, t.childLanes);
        if (D) {
          if (V)
            return jy(e, t, n);
          t.flags |= rt;
        }
        var L = t.memoizedState;
        if (L !== null && (L.rendering = null, L.tail = null, L.lastEffect = null), Zr(t, Va.current), V)
          break;
        return null;
      }
      case q:
      case be:
        return t.lanes = Q, by(e, t, n);
    }
    return Cr(e, t, n);
  }
  function _y(e, t, n) {
    if (t._debugNeedsRemount && e !== null)
      return z1(e, t, Nh(t.type, t.key, t.pendingProps, t._debugOwner || null, t.mode, t.lanes));
    if (e !== null) {
      var a = e.memoizedProps, r = t.pendingProps;
      if (a !== r || rc() || // Force a re-render if the implementation changed due to hot reload:
      t.type !== e.type)
        ka = !0;
      else {
        var i = Im(e, n);
        if (!i && // If this is the second pass of an error or suspense boundary, there
        // may not be work scheduled on `current`, so we check for this flag.
        (t.flags & rt) === _e)
          return ka = !1, P1(e, t, n);
        (e.flags & Wd) !== _e ? ka = !0 : ka = !1;
      }
    } else if (ka = !1, gn() && dC(t)) {
      var l = t.index, u = fC();
      rb(t, u, l);
    }
    switch (t.lanes = Q, t.tag) {
      case M:
        return x1(e, t, t.type, n);
      case re: {
        var c = t.elementType;
        return y1(e, t, c, n);
      }
      case R: {
        var h = t.type, v = t.pendingProps, C = t.elementType === h ? v : La(h, v);
        return km(e, t, h, C, n);
      }
      case j: {
        var D = t.type, V = t.pendingProps, L = t.elementType === D ? V : La(D, V);
        return Ny(e, t, D, L, n);
      }
      case x:
        return v1(e, t, n);
      case k:
        return g1(e, t, n);
      case ee:
        return b1(e, t);
      case te:
        return Sy(e, t, n);
      case T:
        return k1(e, t, n);
      case P: {
        var H = t.type, fe = t.pendingProps, De = t.elementType === H ? fe : La(H, fe);
        return hy(e, t, H, De, n);
      }
      case pe:
        return p1(e, t, n);
      case le:
        return m1(e, t, n);
      case $:
        return h1(e, t, n);
      case G:
        return U1(e, t, n);
      case oe:
        return F1(e, t, n);
      case F: {
        var Ee = t.type, Je = t.pendingProps, qe = La(Ee, Je);
        if (t.type !== t.elementType) {
          var _ = Ee.propTypes;
          _ && _a(
            _,
            qe,
            // Resolved for outer only
            "prop",
            nt(Ee)
          );
        }
        return qe = La(Ee.type, qe), vy(e, t, Ee, qe, n);
      }
      case U:
        return gy(e, t, t.type, t.pendingProps, n);
      case X: {
        var B = t.type, O = t.pendingProps, ne = t.elementType === B ? O : La(B, O);
        return N1(e, t, B, ne, n);
      }
      case ie:
        return jy(e, t, n);
      case Te:
        break;
      case q:
        return by(e, t, n);
    }
    throw new Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
  }
  function Gl(e) {
    e.flags |= at;
  }
  function Oy(e) {
    e.flags |= Ri, e.flags |= Kd;
  }
  var My, Ym, Vy, Ay;
  My = function(e, t, n, a) {
    for (var r = t.child; r !== null; ) {
      if (r.tag === k || r.tag === ee)
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
  }, Ym = function(e, t) {
  }, Vy = function(e, t, n, a, r) {
    var i = e.memoizedProps;
    if (i !== a) {
      var l = t.stateNode, u = zp(), c = cD(l, n, i, a, r, u);
      t.updateQueue = c, c && Gl(t);
    }
  }, Ay = function(e, t, n, a) {
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
    var t = e.alternate !== null && e.alternate.child === e.child, n = Q, a = _e;
    if (t) {
      if ((e.mode & ft) !== je) {
        for (var c = e.selfBaseDuration, h = e.child; h !== null; )
          n = Be(n, Be(h.lanes, h.childLanes)), a |= h.subtreeFlags & vr, a |= h.flags & vr, c += h.treeBaseDuration, h = h.sibling;
        e.treeBaseDuration = c;
      } else
        for (var v = e.child; v !== null; )
          n = Be(n, Be(v.lanes, v.childLanes)), a |= v.subtreeFlags & vr, a |= v.flags & vr, v.return = e, v = v.sibling;
      e.subtreeFlags |= a;
    } else {
      if ((e.mode & ft) !== je) {
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
    if (DC() && (t.mode & Qe) !== je && (t.flags & rt) === _e)
      return db(t), kl(), t.flags |= mr | Eu | zn, !1;
    var a = dc(t);
    if (n !== null && n.dehydrated !== null)
      if (e === null) {
        if (!a)
          throw new Error("A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.");
        if (SC(t), yn(t), (t.mode & ft) !== je) {
          var r = n !== null;
          if (r) {
            var i = t.child;
            i !== null && (t.treeBaseDuration -= i.treeBaseDuration);
          }
        }
        return !1;
      } else {
        if (kl(), (t.flags & rt) === _e && (t.memoizedState = null), t.flags |= at, yn(t), (t.mode & ft) !== je) {
          var l = n !== null;
          if (l) {
            var u = t.child;
            u !== null && (t.treeBaseDuration -= u.treeBaseDuration);
          }
        }
        return !1;
      }
    else
      return fb(), !0;
  }
  function Ly(e, t, n) {
    var a = t.pendingProps;
    switch (gp(t), t.tag) {
      case M:
      case re:
      case U:
      case R:
      case P:
      case pe:
      case le:
      case $:
      case oe:
      case F:
        return yn(t), null;
      case j: {
        var r = t.type;
        return Xa(r) && ic(t), yn(t), null;
      }
      case x: {
        var i = t.stateNode;
        if (Pl(t), pp(t), Ip(), i.pendingContext && (i.context = i.pendingContext, i.pendingContext = null), e === null || e.child === null) {
          var l = dc(t);
          if (l)
            Gl(t);
          else if (e !== null) {
            var u = e.memoizedState;
            // Check if this is a client root
            (!u.isDehydrated || // Check if we reverted to client rendering (e.g. due to an error)
            (t.flags & mr) !== _e) && (t.flags |= hl, fb());
          }
        }
        return Ym(e, t), yn(t), null;
      }
      case k: {
        Pp(t);
        var c = jb(), h = t.type;
        if (e !== null && t.stateNode != null)
          Vy(e, t, h, a, c), e.ref !== t.ref && Oy(t);
        else {
          if (!a) {
            if (t.stateNode === null)
              throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
            return yn(t), null;
          }
          var v = zp(), C = dc(t);
          if (C)
            xC(t, c, v) && Gl(t);
          else {
            var D = oD(h, a, c, v, t);
            My(D, t, !1, !1), t.stateNode = D, uD(D, h, a, c) && Gl(t);
          }
          t.ref !== null && Oy(t);
        }
        return yn(t), null;
      }
      case ee: {
        var V = a;
        if (e && t.stateNode != null) {
          var L = e.memoizedProps;
          Ay(e, t, L, V);
        } else {
          if (typeof V != "string" && t.stateNode === null)
            throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
          var H = jb(), fe = zp(), De = dc(t);
          De ? EC(t) && Gl(t) : t.stateNode = dD(V, H, fe, t);
        }
        return yn(t), null;
      }
      case te: {
        Bl(t);
        var Ee = t.memoizedState;
        if (e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          var Je = H1(e, t, Ee);
          if (!Je)
            return t.flags & zn ? t : null;
        }
        if ((t.flags & rt) !== _e)
          return t.lanes = n, (t.mode & ft) !== je && hm(t), t;
        var qe = Ee !== null, _ = e !== null && e.memoizedState !== null;
        if (qe !== _ && qe) {
          var B = t.child;
          if (B.flags |= Di, (t.mode & Qe) !== je) {
            var O = e === null && (t.memoizedProps.unstable_avoidThisFallback !== !0 || !0);
            O || Hp(Va.current, _b) ? Bj() : uh();
          }
        }
        var ne = t.updateQueue;
        if (ne !== null && (t.flags |= at), yn(t), (t.mode & ft) !== je && qe) {
          var ge = t.child;
          ge !== null && (t.treeBaseDuration -= ge.treeBaseDuration);
        }
        return null;
      }
      case T:
        return Pl(t), Ym(e, t), e === null && rC(t.stateNode.containerInfo), yn(t), null;
      case G:
        var me = t.type._context;
        return Op(me, t), yn(t), null;
      case X: {
        var Oe = t.type;
        return Xa(Oe) && ic(t), yn(t), null;
      }
      case ie: {
        Bl(t);
        var Ue = t.memoizedState;
        if (Ue === null)
          return yn(t), null;
        var mt = (t.flags & rt) !== _e, et = Ue.rendering;
        if (et === null)
          if (mt)
            Ls(Ue, !1);
          else {
            var Pt = Ij() && (e === null || (e.flags & rt) === _e);
            if (!Pt)
              for (var tt = t.child; tt !== null; ) {
                var kt = jc(tt);
                if (kt !== null) {
                  mt = !0, t.flags |= rt, Ls(Ue, !1);
                  var Mn = kt.updateQueue;
                  return Mn !== null && (t.updateQueue = Mn, t.flags |= at), t.subtreeFlags = _e, MC(t, n), Zr(t, Bp(Va.current, Es)), t.child;
                }
                tt = tt.sibling;
              }
            Ue.tail !== null && sn() > nN() && (t.flags |= rt, mt = !0, Ls(Ue, !1), t.lanes = Av);
          }
        else {
          if (!mt) {
            var Rn = jc(et);
            if (Rn !== null) {
              t.flags |= rt, mt = !0;
              var ia = Rn.updateQueue;
              if (ia !== null && (t.updateQueue = ia, t.flags |= at), Ls(Ue, !0), Ue.tail === null && Ue.tailMode === "hidden" && !et.alternate && !gn())
                return yn(t), null;
            } else // The time it took to render last row is greater than the remaining
            // time we have to render. So rendering one more row would likely
            // exceed it.
            sn() * 2 - Ue.renderingStartTime > nN() && n !== Jn && (t.flags |= rt, mt = !0, Ls(Ue, !1), t.lanes = Av);
          }
          if (Ue.isBackwards)
            et.sibling = t.child, t.child = et;
          else {
            var $n = Ue.last;
            $n !== null ? $n.sibling = et : t.child = et, Ue.last = et;
          }
        }
        if (Ue.tail !== null) {
          var In = Ue.tail;
          Ue.rendering = In, Ue.tail = In.sibling, Ue.renderingStartTime = sn(), In.sibling = null;
          var Vn = Va.current;
          return mt ? Vn = Bp(Vn, Es) : Vn = Hl(Vn), Zr(t, Vn), In;
        }
        return yn(t), null;
      }
      case Te:
        break;
      case q:
      case be: {
        sh(t);
        var Or = t.memoizedState, to = Or !== null;
        if (e !== null) {
          var Xs = e.memoizedState, ir = Xs !== null;
          ir !== to && // LegacyHidden doesn't do any hiding — it only pre-renders.
          !Pe && (t.flags |= Di);
        }
        return !to || (t.mode & Qe) === je ? yn(t) : Zn(rr, Jn) && (yn(t), t.subtreeFlags & (It | at) && (t.flags |= Di)), null;
      }
      case ye:
        return null;
      case Y:
        return null;
    }
    throw new Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
  }
  function B1(e, t, n) {
    switch (gp(t), t.tag) {
      case j: {
        var a = t.type;
        Xa(a) && ic(t);
        var r = t.flags;
        return r & zn ? (t.flags = r & ~zn | rt, (t.mode & ft) !== je && hm(t), t) : null;
      }
      case x: {
        t.stateNode, Pl(t), pp(t), Ip();
        var i = t.flags;
        return (i & zn) !== _e && (i & rt) === _e ? (t.flags = i & ~zn | rt, t) : null;
      }
      case k:
        return Pp(t), null;
      case te: {
        Bl(t);
        var l = t.memoizedState;
        if (l !== null && l.dehydrated !== null) {
          if (t.alternate === null)
            throw new Error("Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue.");
          kl();
        }
        var u = t.flags;
        return u & zn ? (t.flags = u & ~zn | rt, (t.mode & ft) !== je && hm(t), t) : null;
      }
      case ie:
        return Bl(t), null;
      case T:
        return Pl(t), null;
      case G:
        var c = t.type._context;
        return Op(c, t), null;
      case q:
      case be:
        return sh(t), null;
      case ye:
        return null;
      default:
        return null;
    }
  }
  function ky(e, t, n) {
    switch (gp(t), t.tag) {
      case j: {
        var a = t.type.childContextTypes;
        a != null && ic(t);
        break;
      }
      case x: {
        t.stateNode, Pl(t), pp(t), Ip();
        break;
      }
      case k: {
        Pp(t);
        break;
      }
      case T:
        Pl(t);
        break;
      case te:
        Bl(t);
        break;
      case ie:
        Bl(t);
        break;
      case G:
        var r = t.type._context;
        Op(r, t);
        break;
      case q:
      case be:
        sh(t);
        break;
    }
  }
  var Uy = null;
  Uy = /* @__PURE__ */ new Set();
  var Xc = !1, Nn = !1, $1 = typeof WeakSet == "function" ? WeakSet : Set, Ne = null, Wl = null, Kl = null;
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
  function Fy(e, t) {
    try {
      ni(Jt, e);
    } catch (n) {
      bt(e, t, n);
    }
  }
  function qm(e, t, n) {
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
  function zy(e, t) {
    try {
      Hy(e);
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
        typeof a == "function" && d("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", Fe(e));
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
  var Py = !1;
  function G1(e, t) {
    iD(e.containerInfo), Ne = t, W1();
    var n = Py;
    return Py = !1, n;
  }
  function W1() {
    for (; Ne !== null; ) {
      var e = Ne, t = e.child;
      (e.subtreeFlags & Jd) !== _e && t !== null ? (t.return = e, Ne = t) : K1();
    }
  }
  function K1() {
    for (; Ne !== null; ) {
      var e = Ne;
      Ct(e);
      try {
        Q1(e);
      } catch (n) {
        bt(e, e.return, n);
      }
      on();
      var t = e.sibling;
      if (t !== null) {
        t.return = e.return, Ne = t;
        return;
      }
      Ne = e.return;
    }
  }
  function Q1(e) {
    var t = e.alternate, n = e.flags;
    if ((n & hl) !== _e) {
      switch (Ct(e), e.tag) {
        case R:
        case P:
        case U:
          break;
        case j: {
          if (t !== null) {
            var a = t.memoizedProps, r = t.memoizedState, i = e.stateNode;
            e.type === e.elementType && !Yi && (i.props !== e.memoizedProps && d("Expected %s props to match memoized props before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Fe(e) || "instance"), i.state !== e.memoizedState && d("Expected %s state to match memoized state before getSnapshotBeforeUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Fe(e) || "instance"));
            var l = i.getSnapshotBeforeUpdate(e.elementType === e.type ? a : La(e.type, a), r);
            {
              var u = Uy;
              l === void 0 && !u.has(e.type) && (u.add(e.type), d("%s.getSnapshotBeforeUpdate(): A snapshot value (or null) must be returned. You have returned undefined.", Fe(e)));
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
        case ee:
        case T:
        case X:
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
          l.destroy = void 0, u !== void 0 && ((e & bn) !== Wn ? dS(t) : (e & Jt) !== Wn && wv(t), (e & Ja) !== Wn && Ws(!0), Jc(t, n, u), (e & Ja) !== Wn && Ws(!1), (e & bn) !== Wn ? fS() : (e & Jt) !== Wn && _v());
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
          (e & bn) !== Wn ? uS(t) : (e & Jt) !== Wn && pS(t);
          var l = i.create;
          (e & Ja) !== Wn && Ws(!0), i.destroy = l(), (e & Ja) !== Wn && Ws(!1), (e & bn) !== Wn ? cS() : (e & Jt) !== Wn && mS();
          {
            var u = i.destroy;
            if (u !== void 0 && typeof u != "function") {
              var c = void 0;
              (i.tag & Jt) !== _e ? c = "useLayoutEffect" : (i.tag & Ja) !== _e ? c = "useInsertionEffect" : c = "useEffect";
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
    if ((t.flags & at) !== _e)
      switch (t.tag) {
        case $: {
          var n = t.stateNode.passiveEffectDuration, a = t.memoizedProps, r = a.id, i = a.onPostCommit, l = ny(), u = t.alternate === null ? "mount" : "update";
          ty() && (u = "nested-update"), typeof i == "function" && i(r, u, n, l);
          var c = t.return;
          e: for (; c !== null; ) {
            switch (c.tag) {
              case x:
                var h = c.stateNode;
                h.passiveEffectDuration += n;
                break e;
              case $:
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
    if ((n.flags & _o) !== _e)
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
          if (n.flags & at && !Nn)
            if (t === null)
              if (n.type === n.elementType && !Yi && (r.props !== n.memoizedProps && d("Expected %s props to match memoized props before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Fe(n) || "instance"), r.state !== n.memoizedState && d("Expected %s state to match memoized state before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Fe(n) || "instance")), n.mode & ft)
                try {
                  nr(), r.componentDidMount();
                } finally {
                  tr(n);
                }
              else
                r.componentDidMount();
            else {
              var i = n.elementType === n.type ? t.memoizedProps : La(n.type, t.memoizedProps), l = t.memoizedState;
              if (n.type === n.elementType && !Yi && (r.props !== n.memoizedProps && d("Expected %s props to match memoized props before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Fe(n) || "instance"), r.state !== n.memoizedState && d("Expected %s state to match memoized state before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Fe(n) || "instance")), n.mode & ft)
                try {
                  nr(), r.componentDidUpdate(i, l, r.__reactInternalSnapshotBeforeUpdate);
                } finally {
                  tr(n);
                }
              else
                r.componentDidUpdate(i, l, r.__reactInternalSnapshotBeforeUpdate);
            }
          var u = n.updateQueue;
          u !== null && (n.type === n.elementType && !Yi && (r.props !== n.memoizedProps && d("Expected %s props to match memoized props before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", Fe(n) || "instance"), r.state !== n.memoizedState && d("Expected %s state to match memoized state before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", Fe(n) || "instance")), Cb(n, u, r));
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
            Cb(n, c, h);
          }
          break;
        }
        case k: {
          var v = n.stateNode;
          if (t === null && n.flags & at) {
            var C = n.type, D = n.memoizedProps;
            vD(v, C, D);
          }
          break;
        }
        case ee:
          break;
        case T:
          break;
        case $: {
          {
            var V = n.memoizedProps, L = V.onCommit, H = V.onRender, fe = n.stateNode.effectDuration, De = ny(), Ee = t === null ? "mount" : "update";
            ty() && (Ee = "nested-update"), typeof H == "function" && H(n.memoizedProps.id, Ee, n.actualDuration, n.treeBaseDuration, n.actualStartTime, De);
            {
              typeof L == "function" && L(n.memoizedProps.id, Ee, fe, De), Kj(n);
              var Je = n.return;
              e: for (; Je !== null; ) {
                switch (Je.tag) {
                  case x:
                    var qe = Je.stateNode;
                    qe.effectDuration += fe;
                    break e;
                  case $:
                    var _ = Je.stateNode;
                    _.effectDuration += fe;
                    break e;
                }
                Je = Je.return;
              }
            }
          }
          break;
        }
        case te: {
          lj(e, n);
          break;
        }
        case ie:
        case X:
        case Te:
        case q:
        case be:
        case Y:
          break;
        default:
          throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
      }
    Nn || n.flags & Ri && Hy(n);
  }
  function Z1(e) {
    switch (e.tag) {
      case R:
      case P:
      case U: {
        if (e.mode & ft)
          try {
            nr(), Fy(e, e.return);
          } finally {
            tr(e);
          }
        else
          Fy(e, e.return);
        break;
      }
      case j: {
        var t = e.stateNode;
        typeof t.componentDidMount == "function" && q1(e, e.return, t), zy(e, e.return);
        break;
      }
      case k: {
        zy(e, e.return);
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
      } else if (a.tag === ee) {
        if (n === null)
          try {
            var i = a.stateNode;
            t ? jD(i) : wD(i, a.memoizedProps);
          } catch (l) {
            bt(e, e.return, l);
          }
      } else if (!((a.tag === q || a.tag === be) && a.memoizedState !== null && a !== e)) {
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
  function Hy(e) {
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
        typeof r == "function" && d("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", Fe(e));
      } else
        t.hasOwnProperty("current") || d("Unexpected ref object provided for %s. Use either a ref-setter function or React.createRef().", Fe(e)), t.current = a;
    }
  }
  function tj(e) {
    var t = e.alternate;
    t !== null && (t.return = null), e.return = null;
  }
  function By(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, By(t));
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
      if ($y(t))
        return t;
      t = t.return;
    }
    throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
  }
  function $y(e) {
    return e.tag === k || e.tag === x || e.tag === T;
  }
  function Iy(e) {
    var t = e;
    e: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || $y(t.return))
          return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== k && t.tag !== ee && t.tag !== K; ) {
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
        t.flags & wo && (qg(n), t.flags &= ~wo);
        var a = Iy(e);
        Wm(e, a, n);
        break;
      }
      case x:
      case T: {
        var r = t.stateNode.containerInfo, i = Iy(e);
        Gm(e, i, r);
        break;
      }
      default:
        throw new Error("Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue.");
    }
  }
  function Gm(e, t, n) {
    var a = e.tag, r = a === k || a === ee;
    if (r) {
      var i = e.stateNode;
      t ? ED(n, i, t) : ND(n, i);
    } else if (a !== T) {
      var l = e.child;
      if (l !== null) {
        Gm(l, t, n);
        for (var u = l.sibling; u !== null; )
          Gm(u, t, n), u = u.sibling;
      }
    }
  }
  function Wm(e, t, n) {
    var a = e.tag, r = a === k || a === ee;
    if (r) {
      var i = e.stateNode;
      t ? xD(n, i, t) : yD(n, i);
    } else if (a !== T) {
      var l = e.child;
      if (l !== null) {
        Wm(l, t, n);
        for (var u = l.sibling; u !== null; )
          Wm(u, t, n), u = u.sibling;
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
      Yy(e, t, n), xn = null, Fa = !1;
    }
    tj(n);
  }
  function ai(e, t, n) {
    for (var a = n.child; a !== null; )
      Yy(e, t, a), a = a.sibling;
  }
  function Yy(e, t, n) {
    switch (iS(n), n.tag) {
      case k:
        Nn || Ql(n, t);
      case ee: {
        {
          var a = xn, r = Fa;
          xn = null, ai(e, t, n), xn = a, Fa = r, xn !== null && (Fa ? RD(xn, n.stateNode) : SD(xn, n.stateNode));
        }
        return;
      }
      case K: {
        xn !== null && (Fa ? DD(xn, n.stateNode) : ip(xn, n.stateNode));
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
      case F:
      case U: {
        if (!Nn) {
          var u = n.updateQueue;
          if (u !== null) {
            var c = u.lastEffect;
            if (c !== null) {
              var h = c.next, v = h;
              do {
                var C = v, D = C.destroy, V = C.tag;
                D !== void 0 && ((V & Ja) !== Wn ? Jc(n, t, D) : (V & Jt) !== Wn && (wv(n), n.mode & ft ? (nr(), Jc(n, t, D), tr(n)) : Jc(n, t, D), _v())), v = v.next;
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
          typeof L.componentWillUnmount == "function" && qm(n, t, L);
        }
        ai(e, t, n);
        return;
      }
      case Te: {
        ai(e, t, n);
        return;
      }
      case q: {
        if (
          // TODO: Remove this dead flag
          n.mode & Qe
        ) {
          var H = Nn;
          Nn = H || n.memoizedState !== null, ai(e, t, n), Nn = H;
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
  function qy(e) {
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
    Wl = n, Kl = e, Ct(t), Gy(t, e), Ct(t), Wl = null, Kl = null;
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
        Ct(u), Gy(u, e), u = u.sibling;
    Ct(l);
  }
  function Gy(e, t, n) {
    var a = e.alternate, r = e.flags;
    switch (e.tag) {
      case R:
      case P:
      case F:
      case U: {
        if (za(t, e), ar(e), r & at) {
          try {
            Ua(Ja | Xt, e, e.return), ni(Ja | Xt, e);
          } catch (Oe) {
            bt(e, e.return, Oe);
          }
          if (e.mode & ft) {
            try {
              nr(), Ua(Jt | Xt, e, e.return);
            } catch (Oe) {
              bt(e, e.return, Oe);
            }
            tr(e);
          } else
            try {
              Ua(Jt | Xt, e, e.return);
            } catch (Oe) {
              bt(e, e.return, Oe);
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
              qg(i);
            } catch (Oe) {
              bt(e, e.return, Oe);
            }
          }
          if (r & at) {
            var l = e.stateNode;
            if (l != null) {
              var u = e.memoizedProps, c = a !== null ? a.memoizedProps : u, h = e.type, v = e.updateQueue;
              if (e.updateQueue = null, v !== null)
                try {
                  gD(l, v, h, c, u, e);
                } catch (Oe) {
                  bt(e, e.return, Oe);
                }
            }
          }
        }
        return;
      }
      case ee: {
        if (za(t, e), ar(e), r & at) {
          if (e.stateNode === null)
            throw new Error("This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.");
          var C = e.stateNode, D = e.memoizedProps, V = a !== null ? a.memoizedProps : D;
          try {
            bD(C, V, D);
          } catch (Oe) {
            bt(e, e.return, Oe);
          }
        }
        return;
      }
      case x: {
        if (za(t, e), ar(e), r & at && a !== null) {
          var L = a.memoizedState;
          if (L.isDehydrated)
            try {
              $D(t.containerInfo);
            } catch (Oe) {
              bt(e, e.return, Oe);
            }
        }
        return;
      }
      case T: {
        za(t, e), ar(e);
        return;
      }
      case te: {
        za(t, e), ar(e);
        var H = e.child;
        if (H.flags & Di) {
          var fe = H.stateNode, De = H.memoizedState, Ee = De !== null;
          if (fe.isHidden = Ee, Ee) {
            var Je = H.alternate !== null && H.alternate.memoizedState !== null;
            Je || Hj();
          }
        }
        if (r & at) {
          try {
            ij(e);
          } catch (Oe) {
            bt(e, e.return, Oe);
          }
          qy(e);
        }
        return;
      }
      case q: {
        var qe = a !== null && a.memoizedState !== null;
        if (
          // TODO: Remove this dead flag
          e.mode & Qe
        ) {
          var _ = Nn;
          Nn = _ || qe, za(t, e), Nn = _;
        } else
          za(t, e);
        if (ar(e), r & Di) {
          var B = e.stateNode, O = e.memoizedState, ne = O !== null, ge = e;
          if (B.isHidden = ne, ne && !qe && (ge.mode & Qe) !== je) {
            Ne = ge;
            for (var me = ge.child; me !== null; )
              Ne = me, uj(me), me = me.sibling;
          }
          ej(ge, ne);
        }
        return;
      }
      case ie: {
        za(t, e), ar(e), r & at && qy(e);
        return;
      }
      case Te:
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
    Wl = n, Kl = t, Ne = e, Wy(e, t, n), Wl = null, Kl = null;
  }
  function Wy(e, t, n) {
    for (var a = (e.mode & Qe) !== je; Ne !== null; ) {
      var r = Ne, i = r.child;
      if (r.tag === q && a) {
        var l = r.memoizedState !== null, u = l || Xc;
        if (u) {
          Km(e, t, n);
          continue;
        } else {
          var c = r.alternate, h = c !== null && c.memoizedState !== null, v = h || Nn, C = Xc, D = Nn;
          Xc = u, Nn = v, Nn && !D && (Ne = r, cj(r));
          for (var V = i; V !== null; )
            Ne = V, Wy(
              V,
              // New root; bubble back up to here and stop.
              t,
              n
            ), V = V.sibling;
          Ne = r, Xc = C, Nn = D, Km(e, t, n);
          continue;
        }
      }
      (r.subtreeFlags & _o) !== _e && i !== null ? (i.return = r, Ne = i) : Km(e, t, n);
    }
  }
  function Km(e, t, n) {
    for (; Ne !== null; ) {
      var a = Ne;
      if ((a.flags & _o) !== _e) {
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
        Ne = null;
        return;
      }
      var i = a.sibling;
      if (i !== null) {
        i.return = a.return, Ne = i;
        return;
      }
      Ne = a.return;
    }
  }
  function uj(e) {
    for (; Ne !== null; ) {
      var t = Ne, n = t.child;
      switch (t.tag) {
        case R:
        case P:
        case F:
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
          typeof a.componentWillUnmount == "function" && qm(t, t.return, a);
          break;
        }
        case k: {
          Ql(t, t.return);
          break;
        }
        case q: {
          var r = t.memoizedState !== null;
          if (r) {
            Ky(e);
            continue;
          }
          break;
        }
      }
      n !== null ? (n.return = t, Ne = n) : Ky(e);
    }
  }
  function Ky(e) {
    for (; Ne !== null; ) {
      var t = Ne;
      if (t === e) {
        Ne = null;
        return;
      }
      var n = t.sibling;
      if (n !== null) {
        n.return = t.return, Ne = n;
        return;
      }
      Ne = t.return;
    }
  }
  function cj(e) {
    for (; Ne !== null; ) {
      var t = Ne, n = t.child;
      if (t.tag === q) {
        var a = t.memoizedState !== null;
        if (a) {
          Qy(e);
          continue;
        }
      }
      n !== null ? (n.return = t, Ne = n) : Qy(e);
    }
  }
  function Qy(e) {
    for (; Ne !== null; ) {
      var t = Ne;
      Ct(t);
      try {
        Z1(t);
      } catch (a) {
        bt(t, t.return, a);
      }
      if (on(), t === e) {
        Ne = null;
        return;
      }
      var n = t.sibling;
      if (n !== null) {
        n.return = t.return, Ne = n;
        return;
      }
      Ne = t.return;
    }
  }
  function dj(e, t, n, a) {
    Ne = t, fj(t, e, n, a);
  }
  function fj(e, t, n, a) {
    for (; Ne !== null; ) {
      var r = Ne, i = r.child;
      (r.subtreeFlags & vl) !== _e && i !== null ? (i.return = r, Ne = i) : pj(e, t, n, a);
    }
  }
  function pj(e, t, n, a) {
    for (; Ne !== null; ) {
      var r = Ne;
      if ((r.flags & Fr) !== _e) {
        Ct(r);
        try {
          mj(t, r, n, a);
        } catch (l) {
          bt(r, r.return, l);
        }
        on();
      }
      if (r === e) {
        Ne = null;
        return;
      }
      var i = r.sibling;
      if (i !== null) {
        i.return = r.return, Ne = i;
        return;
      }
      Ne = r.return;
    }
  }
  function mj(e, t, n, a) {
    switch (t.tag) {
      case R:
      case P:
      case U: {
        if (t.mode & ft) {
          mm();
          try {
            ni(bn | Xt, t);
          } finally {
            pm(t);
          }
        } else
          ni(bn | Xt, t);
        break;
      }
    }
  }
  function hj(e) {
    Ne = e, vj();
  }
  function vj() {
    for (; Ne !== null; ) {
      var e = Ne, t = e.child;
      if ((Ne.flags & Si) !== _e) {
        var n = e.deletions;
        if (n !== null) {
          for (var a = 0; a < n.length; a++) {
            var r = n[a];
            Ne = r, yj(r, e);
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
          Ne = e;
        }
      }
      (e.subtreeFlags & vl) !== _e && t !== null ? (t.return = e, Ne = t) : gj();
    }
  }
  function gj() {
    for (; Ne !== null; ) {
      var e = Ne;
      (e.flags & Fr) !== _e && (Ct(e), bj(e), on());
      var t = e.sibling;
      if (t !== null) {
        t.return = e.return, Ne = t;
        return;
      }
      Ne = e.return;
    }
  }
  function bj(e) {
    switch (e.tag) {
      case R:
      case P:
      case U: {
        e.mode & ft ? (mm(), Ua(bn | Xt, e, e.return), pm(e)) : Ua(bn | Xt, e, e.return);
        break;
      }
    }
  }
  function yj(e, t) {
    for (; Ne !== null; ) {
      var n = Ne;
      Ct(n), xj(n, t), on();
      var a = n.child;
      a !== null ? (a.return = n, Ne = a) : Nj(e);
    }
  }
  function Nj(e) {
    for (; Ne !== null; ) {
      var t = Ne, n = t.sibling, a = t.return;
      if (By(t), t === e) {
        Ne = null;
        return;
      }
      if (n !== null) {
        n.return = a, Ne = n;
        return;
      }
      Ne = a;
    }
  }
  function xj(e, t) {
    switch (e.tag) {
      case R:
      case P:
      case U: {
        e.mode & ft ? (mm(), Ua(bn, e, t), pm(e)) : Ua(bn, e, t);
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
        typeof t.componentWillUnmount == "function" && qm(e, e.return, t);
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
  var Tj = m.ReactCurrentActQueue;
  function wj(e) {
    {
      var t = (
        // $FlowExpectedError – Flow doesn't know about IS_REACT_ACT_ENVIRONMENT global
        typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0
      ), n = typeof jest < "u";
      return n && t !== !1;
    }
  }
  function Xy() {
    {
      var e = (
        // $FlowExpectedError – Flow doesn't know about IS_REACT_ACT_ENVIRONMENT global
        typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0
      );
      return !e && Tj.current !== null && d("The current testing environment is not configured to support act(...)"), e;
    }
  }
  var _j = Math.ceil, Qm = m.ReactCurrentDispatcher, Xm = m.ReactCurrentOwner, En = m.ReactCurrentBatchConfig, Pa = m.ReactCurrentActQueue, tn = (
    /*             */
    0
  ), Jy = (
    /*               */
    1
  ), Sn = (
    /*                */
    2
  ), ga = (
    /*                */
    4
  ), jr = 0, Us = 1, qi = 2, Zc = 3, Fs = 4, Zy = 5, Jm = 6, Xe = tn, Hn = null, Ot = null, nn = Q, rr = Q, Zm = Gr(Q), an = jr, zs = null, ed = Q, Ps = Q, td = Q, Hs = null, Kn = null, eh = 0, eN = 500, tN = 1 / 0, Oj = 500, Tr = null;
  function Bs() {
    tN = sn() + Oj;
  }
  function nN() {
    return tN;
  }
  var nd = !1, th = null, Xl = null, Gi = !1, ri = null, $s = Q, nh = [], ah = null, Mj = 50, Is = 0, rh = null, ih = !1, ad = !1, Vj = 50, Jl = 0, rd = null, Ys = xt, id = Q, aN = !1;
  function ld() {
    return Hn;
  }
  function Bn() {
    return (Xe & (Sn | ga)) !== tn ? sn() : (Ys !== xt || (Ys = sn()), Ys);
  }
  function ii(e) {
    var t = e.mode;
    if ((t & Qe) === je)
      return Ae;
    if ((Xe & Sn) !== tn && nn !== Q)
      return Uo(nn);
    var n = TC() !== jC;
    if (n) {
      if (En.transition !== null) {
        var a = En.transition;
        a._updatedFibers || (a._updatedFibers = /* @__PURE__ */ new Set()), a._updatedFibers.add(e);
      }
      return id === cn && (id = Fv()), id;
    }
    var r = wa();
    if (r !== cn)
      return r;
    var i = fD();
    return i;
  }
  function Aj(e) {
    var t = e.mode;
    return (t & Qe) === je ? Ae : kS();
  }
  function rn(e, t, n, a) {
    rT(), aN && d("useInsertionEffect must not schedule updates."), ih && (ad = !0), Fo(e, n, a), (Xe & Sn) !== Q && e === Hn ? oT(t) : (Ta && Hv(e, t, n), sT(t), e === Hn && ((Xe & Sn) === tn && (Ps = Be(Ps, n)), an === Fs && li(e, nn)), Qn(e, a), n === Ae && Xe === tn && (t.mode & Qe) === je && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
    !Pa.isBatchingLegacy && (Bs(), ab()));
  }
  function Lj(e, t, n) {
    var a = e.current;
    a.lanes = t, Fo(e, t, n), Qn(e, n);
  }
  function kj(e) {
    return (
      // TODO: Remove outdated deferRenderPhaseUpdateToNextBatch experiment. We
      // decided not to enable it.
      (Xe & Sn) !== tn
    );
  }
  function Qn(e, t) {
    var n = e.callbackNode;
    _S(e, t);
    var a = ju(e, e === Hn ? nn : Q);
    if (a === Q) {
      n !== null && yN(n), e.callbackNode = null, e.callbackPriority = cn;
      return;
    }
    var r = Oi(a), i = e.callbackPriority;
    if (i === r && // Special case related to `act`. If the currently scheduled task is a
    // Scheduler task, rather than an `act` task, cancel it and re-scheduled
    // on the `act` queue.
    !(Pa.current !== null && n !== fh)) {
      n == null && i !== Ae && d("Expected scheduled callback to exist. This error is likely caused by a bug in React. Please file an issue.");
      return;
    }
    n != null && yN(n);
    var l;
    if (r === Ae)
      e.tag === Wr ? (Pa.isBatchingLegacy !== null && (Pa.didScheduleLegacyUpdate = !0), cC(lN.bind(null, e))) : nb(lN.bind(null, e)), Pa.current !== null ? Pa.current.push(Kr) : mD(function() {
        (Xe & (Sn | ga)) === tn && Kr();
      }), l = null;
    else {
      var u;
      switch (Iv(a)) {
        case ea:
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
      l = ph(u, rN.bind(null, e));
    }
    e.callbackPriority = r, e.callbackNode = l;
  }
  function rN(e, t) {
    if (e1(), Ys = xt, id = Q, (Xe & (Sn | ga)) !== tn)
      throw new Error("Should not already be working.");
    var n = e.callbackNode, a = _r();
    if (a && e.callbackNode !== n)
      return null;
    var r = ju(e, e === Hn ? nn : Q);
    if (r === Q)
      return null;
    var i = !Tu(e, r) && !LS(e, r) && !t, l = i ? qj(e, r) : sd(e, r);
    if (l !== jr) {
      if (l === qi) {
        var u = Rf(e);
        u !== Q && (r = u, l = lh(e, u));
      }
      if (l === Us) {
        var c = zs;
        throw Wi(e, Q), li(e, r), Qn(e, sn()), c;
      }
      if (l === Jm)
        li(e, r);
      else {
        var h = !Tu(e, r), v = e.current.alternate;
        if (h && !Fj(v)) {
          if (l = sd(e, r), l === qi) {
            var C = Rf(e);
            C !== Q && (r = C, l = lh(e, C));
          }
          if (l === Us) {
            var D = zs;
            throw Wi(e, Q), li(e, r), Qn(e, sn()), D;
          }
        }
        e.finishedWork = v, e.finishedLanes = r, Uj(e, l, r);
      }
    }
    return Qn(e, sn()), e.callbackNode === n ? rN.bind(null, e) : null;
  }
  function lh(e, t) {
    var n = Hs;
    if (Ou(e)) {
      var a = Wi(e, t);
      a.flags |= mr, aC(e.containerInfo);
    }
    var r = sd(e, t);
    if (r !== qi) {
      var i = Kn;
      Kn = n, i !== null && iN(i);
    }
    return r;
  }
  function iN(e) {
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
        if (li(e, n), kv(n) && // do not delay if we're inside an act() scope
        !NN()) {
          var a = eh + eN - sn();
          if (a > 10) {
            var r = ju(e, Q);
            if (r !== Q)
              break;
            var i = e.suspendedLanes;
            if (!El(i, n)) {
              Bn(), Pv(e, i);
              break;
            }
            e.timeoutHandle = ap(Ki.bind(null, e, Kn, Tr), a);
            break;
          }
        }
        Ki(e, Kn, Tr);
        break;
      }
      case Fs: {
        if (li(e, n), AS(n))
          break;
        if (!NN()) {
          var l = TS(e, n), u = l, c = sn() - u, h = aT(c) - c;
          if (h > 10) {
            e.timeoutHandle = ap(Ki.bind(null, e, Kn, Tr), h);
            break;
          }
        }
        Ki(e, Kn, Tr);
        break;
      }
      case Zy: {
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
                if (!na(l(), u))
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
  function lN(e) {
    if (t1(), (Xe & (Sn | ga)) !== tn)
      throw new Error("Should not already be working.");
    _r();
    var t = ju(e, Q);
    if (!Zn(t, Ae))
      return Qn(e, sn()), null;
    var n = sd(e, t);
    if (e.tag !== Wr && n === qi) {
      var a = Rf(e);
      a !== Q && (t = a, n = lh(e, a));
    }
    if (n === Us) {
      var r = zs;
      throw Wi(e, Q), li(e, t), Qn(e, sn()), r;
    }
    if (n === Jm)
      throw new Error("Root did not complete. This is a bug in React.");
    var i = e.current.alternate;
    return e.finishedWork = i, e.finishedLanes = t, Ki(e, Kn, Tr), Qn(e, sn()), null;
  }
  function zj(e, t) {
    t !== Q && (Tf(e, Be(t, Ae)), Qn(e, sn()), (Xe & (Sn | ga)) === tn && (Bs(), Kr()));
  }
  function oh(e, t) {
    var n = Xe;
    Xe |= Jy;
    try {
      return e(t);
    } finally {
      Xe = n, Xe === tn && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
      !Pa.isBatchingLegacy && (Bs(), ab());
    }
  }
  function Pj(e, t, n, a, r) {
    var i = wa(), l = En.transition;
    try {
      return En.transition = null, dn(ea), e(t, n, a, r);
    } finally {
      dn(i), En.transition = l, Xe === tn && Bs();
    }
  }
  function wr(e) {
    ri !== null && ri.tag === Wr && (Xe & (Sn | ga)) === tn && _r();
    var t = Xe;
    Xe |= Jy;
    var n = En.transition, a = wa();
    try {
      return En.transition = null, dn(ea), e ? e() : void 0;
    } finally {
      dn(a), En.transition = n, Xe = t, (Xe & (Sn | ga)) === tn && Kr();
    }
  }
  function oN() {
    return (Xe & (Sn | ga)) !== tn;
  }
  function od(e, t) {
    _n(Zm, rr, e), rr = Be(rr, t);
  }
  function sh(e) {
    rr = Zm.current, wn(Zm, e);
  }
  function Wi(e, t) {
    e.finishedWork = null, e.finishedLanes = Q;
    var n = e.timeoutHandle;
    if (n !== rp && (e.timeoutHandle = rp, pD(n)), Ot !== null)
      for (var a = Ot.return; a !== null; ) {
        var r = a.alternate;
        ky(r, a), a = a.return;
      }
    Hn = e;
    var i = Qi(e.current, null);
    return Ot = i, nn = rr = t, an = jr, zs = null, ed = Q, Ps = Q, td = Q, Hs = null, Kn = null, LC(), Ma.discardPendingWarnings(), i;
  }
  function sN(e, t) {
    do {
      var n = Ot;
      try {
        if (gc(), Mb(), on(), Xm.current = null, n === null || n.return === null) {
          an = Us, zs = t, Ot = null;
          return;
        }
        if (st && n.mode & ft && qc(n, !0), Ze)
          if (bl(), t !== null && typeof t == "object" && typeof t.then == "function") {
            var a = t;
            vS(n, a, nn);
          } else
            hS(n, t, nn);
        c1(e, n.return, n, t, nn), fN(n);
      } catch (r) {
        t = r, Ot === n && n !== null ? (n = n.return, Ot = n) : n = Ot;
        continue;
      }
      return;
    } while (!0);
  }
  function uN() {
    var e = Qm.current;
    return Qm.current = Hc, e === null ? Hc : e;
  }
  function cN(e) {
    Qm.current = e;
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
    var n = Xe;
    Xe |= Sn;
    var a = uN();
    if (Hn !== e || nn !== t) {
      if (Ta) {
        var r = e.memoizedUpdaters;
        r.size > 0 && (Gs(e, nn), r.clear()), Bv(e, t);
      }
      Tr = $v(), Wi(e, t);
    }
    Ov(t);
    do
      try {
        Yj();
        break;
      } catch (i) {
        sN(e, i);
      }
    while (!0);
    if (gc(), Xe = n, cN(a), Ot !== null)
      throw new Error("Cannot commit an incomplete root. This error is likely caused by a bug in React. Please file an issue.");
    return Mv(), Hn = null, nn = Q, an;
  }
  function Yj() {
    for (; Ot !== null; )
      dN(Ot);
  }
  function qj(e, t) {
    var n = Xe;
    Xe |= Sn;
    var a = uN();
    if (Hn !== e || nn !== t) {
      if (Ta) {
        var r = e.memoizedUpdaters;
        r.size > 0 && (Gs(e, nn), r.clear()), Bv(e, t);
      }
      Tr = $v(), Bs(), Wi(e, t);
    }
    Ov(t);
    do
      try {
        Gj();
        break;
      } catch (i) {
        sN(e, i);
      }
    while (!0);
    return gc(), cN(a), Xe = n, Ot !== null ? (xS(), jr) : (Mv(), Hn = null, nn = Q, an);
  }
  function Gj() {
    for (; Ot !== null && !KE(); )
      dN(Ot);
  }
  function dN(e) {
    var t = e.alternate;
    Ct(e);
    var n;
    (e.mode & ft) !== je ? (fm(e), n = ch(t, e, rr), qc(e, !0)) : n = ch(t, e, rr), on(), e.memoizedProps = e.pendingProps, n === null ? fN(e) : Ot = n, Xm.current = null;
  }
  function fN(e) {
    var t = e;
    do {
      var n = t.alternate, a = t.return;
      if ((t.flags & Eu) === _e) {
        Ct(t);
        var r = void 0;
        if ((t.mode & ft) === je ? r = Ly(n, t, rr) : (fm(t), r = Ly(n, t, rr), qc(t, !1)), on(), r !== null) {
          Ot = r;
          return;
        }
      } else {
        var i = B1(n, t);
        if (i !== null) {
          i.flags &= $E, Ot = i;
          return;
        }
        if ((t.mode & ft) !== je) {
          qc(t, !1);
          for (var l = t.actualDuration, u = t.child; u !== null; )
            l += u.actualDuration, u = u.sibling;
          t.actualDuration = l;
        }
        if (a !== null)
          a.flags |= Eu, a.subtreeFlags = _e, a.deletions = null;
        else {
          an = Jm, Ot = null;
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
    an === jr && (an = Zy);
  }
  function Ki(e, t, n) {
    var a = wa(), r = En.transition;
    try {
      En.transition = null, dn(ea), Wj(e, t, n, a);
    } finally {
      En.transition = r, dn(a);
    }
    return null;
  }
  function Wj(e, t, n, a) {
    do
      _r();
    while (ri !== null);
    if (iT(), (Xe & (Sn | ga)) !== tn)
      throw new Error("Should not already be working.");
    var r = e.finishedWork, i = e.finishedLanes;
    if (sS(i), r === null)
      return Tv(), null;
    if (i === Q && d("root.finishedLanes should not be empty during a commit. This is a bug in React."), e.finishedWork = null, e.finishedLanes = Q, r === e.current)
      throw new Error("Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue.");
    e.callbackNode = null, e.callbackPriority = cn;
    var l = Be(r.lanes, r.childLanes);
    zS(e, l), e === Hn && (Hn = null, Ot = null, nn = Q), ((r.subtreeFlags & vl) !== _e || (r.flags & vl) !== _e) && (Gi || (Gi = !0, ah = n, ph(Ti, function() {
      return _r(), null;
    })));
    var u = (r.subtreeFlags & (Jd | Zd | _o | vl)) !== _e, c = (r.flags & (Jd | Zd | _o | vl)) !== _e;
    if (u || c) {
      var h = En.transition;
      En.transition = null;
      var v = wa();
      dn(ea);
      var C = Xe;
      Xe |= ga, Xm.current = null, G1(e, r), ay(), oj(e, r, i), lD(e.containerInfo), e.current = r, gS(i), sj(r, e, i), bS(), QE(), Xe = C, dn(v), En.transition = h;
    } else
      e.current = r, ay();
    var D = Gi;
    if (Gi ? (Gi = !1, ri = e, $s = i) : (Jl = 0, rd = null), l = e.pendingLanes, l === Q && (Xl = null), D || vN(e.current, !1), aS(r.stateNode, a), Ta && e.memoizedUpdaters.clear(), jj(), Qn(e, sn()), t !== null)
      for (var V = e.onRecoverableError, L = 0; L < t.length; L++) {
        var H = t[L], fe = H.stack, De = H.digest;
        V(H.value, {
          componentStack: fe,
          digest: De
        });
      }
    if (nd) {
      nd = !1;
      var Ee = th;
      throw th = null, Ee;
    }
    return Zn($s, Ae) && e.tag !== Wr && _r(), l = e.pendingLanes, Zn(l, Ae) ? (ZC(), e === rh ? Is++ : (Is = 0, rh = e)) : Is = 0, Kr(), Tv(), null;
  }
  function _r() {
    if (ri !== null) {
      var e = Iv($s), t = $S(yr, e), n = En.transition, a = wa();
      try {
        return En.transition = null, dn(t), Qj();
      } finally {
        dn(a), En.transition = n;
      }
    }
    return !1;
  }
  function Kj(e) {
    nh.push(e), Gi || (Gi = !0, ph(Ti, function() {
      return _r(), null;
    }));
  }
  function Qj() {
    if (ri === null)
      return !1;
    var e = ah;
    ah = null;
    var t = ri, n = $s;
    if (ri = null, $s = Q, (Xe & (Sn | ga)) !== tn)
      throw new Error("Cannot flush passive effects while already rendering.");
    ih = !0, ad = !1, yS(n);
    var a = Xe;
    Xe |= ga, hj(t.current), dj(t, t.current, n, e);
    {
      var r = nh;
      nh = [];
      for (var i = 0; i < r.length; i++) {
        var l = r[i];
        X1(t, l);
      }
    }
    NS(), vN(t.current, !0), Xe = a, Kr(), ad ? t === rd ? Jl++ : (Jl = 0, rd = t) : Jl = 0, ih = !1, ad = !1, rS(t);
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
  function mN(e, t, n) {
    var a = Ii(n, t), r = dy(e, a, Ae), i = Xr(e, r, Ae), l = Bn();
    i !== null && (Fo(i, Ae, l), Qn(i, l));
  }
  function bt(e, t, n) {
    if (I1(n), Ws(!1), e.tag === x) {
      mN(e, e, n);
      return;
    }
    var a = null;
    for (a = t; a !== null; ) {
      if (a.tag === x) {
        mN(a, e, n);
        return;
      } else if (a.tag === j) {
        var r = a.type, i = a.stateNode;
        if (typeof r.getDerivedStateFromError == "function" || typeof i.componentDidCatch == "function" && !pN(i)) {
          var l = Ii(n, e), u = _m(a, l, Ae), c = Xr(a, u, Ae), h = Bn();
          c !== null && (Fo(c, Ae, h), Qn(c, h));
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
    Pv(e, n), uT(e), Hn === e && El(nn, n) && (an === Fs || an === Zc && kv(nn) && sn() - eh < eN ? Wi(e, Q) : td = Be(td, n)), Qn(e, r);
  }
  function hN(e, t) {
    t === cn && (t = Aj(e));
    var n = Bn(), a = Gn(e, t);
    a !== null && (Fo(a, t, n), Qn(a, n));
  }
  function tT(e) {
    var t = e.memoizedState, n = cn;
    t !== null && (n = t.retryLane), hN(e, n);
  }
  function nT(e, t) {
    var n = cn, a;
    switch (e.tag) {
      case te:
        a = e.stateNode;
        var r = e.memoizedState;
        r !== null && (n = r.retryLane);
        break;
      case ie:
        a = e.stateNode;
        break;
      default:
        throw new Error("Pinged unknown suspense boundary type. This is probably a bug in React.");
    }
    a !== null && a.delete(t), hN(e, n);
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
  function vN(e, t) {
    Ct(e), ud(e, zr, Rj), t && ud(e, Xd, Dj), ud(e, zr, Ej), t && ud(e, Xd, Sj), on();
  }
  function ud(e, t, n) {
    for (var a = e, r = null; a !== null; ) {
      var i = a.subtreeFlags & t;
      a !== r && a.child !== null && i !== _e ? a = a.child : ((a.flags & t) !== _e && n(a), a.sibling !== null ? a = a.sibling : a = r = a.return);
    }
  }
  var cd = null;
  function gN(e) {
    {
      if ((Xe & Sn) !== tn || !(e.mode & Qe))
        return;
      var t = e.tag;
      if (t !== M && t !== x && t !== j && t !== R && t !== P && t !== F && t !== U)
        return;
      var n = Fe(e) || "ReactComponent";
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
      var a = DN(lT, t);
      try {
        return _y(e, t, n);
      } catch (i) {
        if (bC() || i !== null && typeof i == "object" && typeof i.then == "function")
          throw i;
        if (gc(), Mb(), ky(e, t), DN(t, a), t.mode & ft && fm(t), Yd(null, _y, null, e, t, n), PE()) {
          var r = qd();
          typeof r == "object" && r !== null && r._suppressLogging && typeof i == "object" && i !== null && !i._suppressLogging && (i._suppressLogging = !0);
        }
        throw i;
      }
    };
  }
  var bN = !1, dh;
  dh = /* @__PURE__ */ new Set();
  function oT(e) {
    if (yi && !QC())
      switch (e.tag) {
        case R:
        case P:
        case U: {
          var t = Ot && Fe(Ot) || "Unknown", n = t;
          if (!dh.has(n)) {
            dh.add(n);
            var a = Fe(e) || "Unknown";
            d("Cannot update a component (`%s`) while rendering a different component (`%s`). To locate the bad setState() call inside `%s`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render", a, t, t);
          }
          break;
        }
        case j: {
          bN || (d("Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state."), bN = !0);
          break;
        }
      }
  }
  function Gs(e, t) {
    if (Ta) {
      var n = e.memoizedUpdaters;
      n.forEach(function(a) {
        Hv(e, a, t);
      });
    }
  }
  var fh = {};
  function ph(e, t) {
    {
      var n = Pa.current;
      return n !== null ? (n.push(t), fh) : jv(e, t);
    }
  }
  function yN(e) {
    if (e !== fh)
      return WE(e);
  }
  function NN() {
    return Pa.current !== null;
  }
  function sT(e) {
    {
      if (e.mode & Qe) {
        if (!Xy())
          return;
      } else if (!wj() || Xe !== tn || e.tag !== R && e.tag !== P && e.tag !== U)
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

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`, Fe(e));
        } finally {
          t ? Ct(e) : on();
        }
      }
    }
  }
  function uT(e) {
    e.tag !== Wr && Xy() && Pa.current === null && d(`A suspended resource finished loading inside a test, but the event was not wrapped in act(...).

When testing, code that resolves suspended data should be wrapped into act(...):

act(() => {
  /* finish loading suspended data */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`);
  }
  function Ws(e) {
    aN = e;
  }
  var ba = null, Zl = null, cT = function(e) {
    ba = e;
  };
  function eo(e) {
    {
      if (ba === null)
        return e;
      var t = ba(e);
      return t === void 0 ? e : t.current;
    }
  }
  function mh(e) {
    return eo(e);
  }
  function hh(e) {
    {
      if (ba === null)
        return e;
      var t = ba(e);
      if (t === void 0) {
        if (e != null && typeof e.render == "function") {
          var n = eo(e.render);
          if (e.render !== n) {
            var a = {
              $$typeof: Re,
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
  function xN(e, t) {
    {
      if (ba === null)
        return !1;
      var n = e.elementType, a = t.type, r = !1, i = typeof a == "object" && a !== null ? a.$$typeof : null;
      switch (e.tag) {
        case j: {
          typeof a == "function" && (r = !0);
          break;
        }
        case R: {
          (typeof a == "function" || i === Ce) && (r = !0);
          break;
        }
        case P: {
          (i === Re || i === Ce) && (r = !0);
          break;
        }
        case F:
        case U: {
          (i === He || i === Ce) && (r = !0);
          break;
        }
        default:
          return !1;
      }
      if (r) {
        var l = ba(n);
        if (l !== void 0 && l === ba(a))
          return !0;
      }
      return !1;
    }
  }
  function EN(e) {
    {
      if (ba === null || typeof WeakSet != "function")
        return;
      Zl === null && (Zl = /* @__PURE__ */ new WeakSet()), Zl.add(e);
    }
  }
  var dT = function(e, t) {
    {
      if (ba === null)
        return;
      var n = t.staleFamilies, a = t.updatedFamilies;
      _r(), wr(function() {
        vh(e.current, a, n);
      });
    }
  }, fT = function(e, t) {
    {
      if (e.context !== aa)
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
      if (ba === null)
        throw new Error("Expected resolveFamily to be set during hot reload.");
      var h = !1, v = !1;
      if (c !== null) {
        var C = ba(c);
        C !== void 0 && (n.has(C) ? v = !0 : t.has(C) && (l === j ? v = !0 : h = !0));
      }
      if (Zl !== null && (Zl.has(e) || a !== null && Zl.has(a)) && (v = !0), v && (e._debugNeedsRemount = !0), v || h) {
        var D = Gn(e, Ae);
        D !== null && rn(D, e, Ae, xt);
      }
      r !== null && !v && vh(r, t, n), i !== null && vh(i, t, n);
    }
  }
  var pT = function(e, t) {
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
      u !== null && t.has(u) && (c = !0), c ? mT(e, n) : a !== null && gh(a, t, n), r !== null && gh(r, t, n);
    }
  }
  function mT(e, t) {
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
      var SN = Object.preventExtensions({});
    } catch {
      bh = !0;
    }
  }
  function vT(e, t, n, a) {
    this.tag = e, this.key = n, this.elementType = null, this.type = null, this.stateNode = null, this.return = null, this.child = null, this.sibling = null, this.index = 0, this.ref = null, this.pendingProps = t, this.memoizedProps = null, this.updateQueue = null, this.memoizedState = null, this.dependencies = null, this.mode = a, this.flags = _e, this.subtreeFlags = _e, this.deletions = null, this.lanes = Q, this.childLanes = Q, this.alternate = null, this.actualDuration = Number.NaN, this.actualStartTime = Number.NaN, this.selfBaseDuration = Number.NaN, this.treeBaseDuration = Number.NaN, this.actualDuration = 0, this.actualStartTime = -1, this.selfBaseDuration = 0, this.treeBaseDuration = 0, this._debugSource = null, this._debugOwner = null, this._debugNeedsRemount = !1, this._debugHookTypes = null, !bh && typeof Object.preventExtensions == "function" && Object.preventExtensions(this);
  }
  var ra = function(e, t, n, a) {
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
      if (t === Re)
        return P;
      if (t === He)
        return F;
    }
    return M;
  }
  function Qi(e, t) {
    var n = e.alternate;
    n === null ? (n = ra(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n._debugSource = e._debugSource, n._debugOwner = e._debugOwner, n._debugHookTypes = e._debugHookTypes, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = _e, n.subtreeFlags = _e, n.deletions = null, n.actualDuration = 0, n.actualStartTime = -1), n.flags = e.flags & vr, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue;
    var a = e.dependencies;
    switch (n.dependencies = a === null ? null : {
      lanes: a.lanes,
      firstContext: a.firstContext
    }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.selfBaseDuration = e.selfBaseDuration, n.treeBaseDuration = e.treeBaseDuration, n._debugNeedsRemount = e._debugNeedsRemount, n.tag) {
      case M:
      case R:
      case U:
        n.type = eo(e.type);
        break;
      case j:
        n.type = mh(e.type);
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
      e.childLanes = Q, e.lanes = t, e.child = null, e.subtreeFlags = _e, e.memoizedProps = null, e.memoizedState = null, e.updateQueue = null, e.dependencies = null, e.stateNode = null, e.selfBaseDuration = 0, e.treeBaseDuration = 0;
    else {
      e.childLanes = n.childLanes, e.lanes = n.lanes, e.child = n.child, e.subtreeFlags = _e, e.deletions = null, e.memoizedProps = n.memoizedProps, e.memoizedState = n.memoizedState, e.updateQueue = n.updateQueue, e.type = n.type;
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
    return e === oc ? (a = Qe, t === !0 && (a |= Lt, a |= Wa)) : a = je, Ta && (a |= ft), ra(x, null, null, a);
  }
  function Nh(e, t, n, a, r, i) {
    var l = M, u = e;
    if (typeof e == "function")
      yh(e) ? (l = j, u = mh(u)) : u = eo(u);
    else if (typeof e == "string")
      l = k;
    else
      e: switch (e) {
        case Ia:
          return oi(n.children, r, i, t);
        case pi:
          l = le, r |= Lt, (r & Qe) !== je && (r |= Wa);
          break;
        case E:
          return xT(n, r, i, t);
        case We:
          return ET(n, r, i, t);
        case Ve:
          return ST(n, r, i, t);
        case Rt:
          return RN(n, r, i, t);
        case jn:
        case Kt:
        case Ya:
        case Da:
        case St:
        default: {
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case Z:
                l = G;
                break e;
              case de:
                l = oe;
                break e;
              case Re:
                l = P, u = hh(u);
                break e;
              case He:
                l = F;
                break e;
              case Ce:
                l = re, u = null;
                break e;
            }
          var c = "";
          {
            (e === void 0 || typeof e == "object" && e !== null && Object.keys(e).length === 0) && (c += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
            var h = a ? Fe(a) : null;
            h && (c += `

Check the render method of \`` + h + "`.");
          }
          throw new Error("Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) " + ("but got: " + (e == null ? e : typeof e) + "." + c));
        }
      }
    var v = ra(l, n, t, r);
    return v.elementType = e, v.type = u, v.lanes = i, v._debugOwner = a, v;
  }
  function xh(e, t, n) {
    var a = null;
    a = e._owner;
    var r = e.type, i = e.key, l = e.props, u = Nh(r, i, l, a, t, n);
    return u._debugSource = e._source, u._debugOwner = e._owner, u;
  }
  function oi(e, t, n, a) {
    var r = ra(pe, e, a, t);
    return r.lanes = n, r;
  }
  function xT(e, t, n, a) {
    typeof e.id != "string" && d('Profiler must specify an "id" of type `string` as a prop. Received the type `%s` instead.', typeof e.id);
    var r = ra($, e, a, t | ft);
    return r.elementType = E, r.lanes = n, r.stateNode = {
      effectDuration: 0,
      passiveEffectDuration: 0
    }, r;
  }
  function ET(e, t, n, a) {
    var r = ra(te, e, a, t);
    return r.elementType = We, r.lanes = n, r;
  }
  function ST(e, t, n, a) {
    var r = ra(ie, e, a, t);
    return r.elementType = Ve, r.lanes = n, r;
  }
  function RN(e, t, n, a) {
    var r = ra(q, e, a, t);
    r.elementType = Rt, r.lanes = n;
    var i = {
      isHidden: !1
    };
    return r.stateNode = i, r;
  }
  function Eh(e, t, n) {
    var a = ra(ee, e, null, t);
    return a.lanes = n, a;
  }
  function RT() {
    var e = ra(k, null, null, je);
    return e.elementType = "DELETED", e;
  }
  function DT(e) {
    var t = ra(K, null, null, je);
    return t.stateNode = e, t;
  }
  function Sh(e, t, n) {
    var a = e.children !== null ? e.children : [], r = ra(T, a, e.key, t);
    return r.lanes = n, r.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      // Used by persistent updates
      implementation: e.implementation
    }, r;
  }
  function DN(e, t) {
    return e === null && (e = ra(M, null, null, je)), e.tag = t.tag, e.key = t.key, e.elementType = t.elementType, e.type = t.type, e.stateNode = t.stateNode, e.return = t.return, e.child = t.child, e.sibling = t.sibling, e.index = t.index, e.ref = t.ref, e.pendingProps = t.pendingProps, e.memoizedProps = t.memoizedProps, e.updateQueue = t.updateQueue, e.memoizedState = t.memoizedState, e.dependencies = t.dependencies, e.mode = t.mode, e.flags = t.flags, e.subtreeFlags = t.subtreeFlags, e.deletions = t.deletions, e.lanes = t.lanes, e.childLanes = t.childLanes, e.alternate = t.alternate, e.actualDuration = t.actualDuration, e.actualStartTime = t.actualStartTime, e.selfBaseDuration = t.selfBaseDuration, e.treeBaseDuration = t.treeBaseDuration, e._debugSource = t._debugSource, e._debugOwner = t._debugOwner, e._debugNeedsRemount = t._debugNeedsRemount, e._debugHookTypes = t._debugHookTypes, e;
  }
  function CT(e, t, n, a, r) {
    this.tag = t, this.containerInfo = e, this.pendingChildren = null, this.current = null, this.pingCache = null, this.finishedWork = null, this.timeoutHandle = rp, this.context = null, this.pendingContext = null, this.callbackNode = null, this.callbackPriority = cn, this.eventTimes = jf(Q), this.expirationTimes = jf(xt), this.pendingLanes = Q, this.suspendedLanes = Q, this.pingedLanes = Q, this.expiredLanes = Q, this.mutableReadLanes = Q, this.finishedLanes = Q, this.entangledLanes = Q, this.entanglements = jf(Q), this.identifierPrefix = a, this.onRecoverableError = r, this.mutableSourceEagerHydrationData = null, this.effectDuration = 0, this.passiveEffectDuration = 0;
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
  function CN(e, t, n, a, r, i, l, u, c, h) {
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
    return kp(C), v;
  }
  var Rh = "18.3.1";
  function jT(e, t, n) {
    var a = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
    return Ut(a), {
      // This tag allow us to uniquely identify this as a React Portal
      $$typeof: Xn,
      key: a == null ? null : "" + a,
      children: e,
      containerInfo: t,
      implementation: n
    };
  }
  var Dh, Ch;
  Dh = !1, Ch = {};
  function jN(e) {
    if (!e)
      return aa;
    var t = pl(e), n = uC(t);
    if (t.tag === j) {
      var a = t.type;
      if (Xa(a))
        return eb(t, a, n);
    }
    return n;
  }
  function TT(e, t) {
    {
      var n = pl(e);
      if (n === void 0) {
        if (typeof e.render == "function")
          throw new Error("Unable to find node on an unmounted component.");
        var a = Object.keys(e).join(",");
        throw new Error("Argument appears to not be a ReactComponent. Keys: " + a);
      }
      var r = Rv(n);
      if (r === null)
        return null;
      if (r.mode & Lt) {
        var i = Fe(n) || "Component";
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
  function TN(e, t, n, a, r, i, l, u) {
    var c = !1, h = null;
    return CN(e, t, c, h, n, a, r, i, l);
  }
  function wN(e, t, n, a, r, i, l, u, c, h) {
    var v = !0, C = CN(n, a, v, e, r, i, l, u, c);
    C.context = jN(null);
    var D = C.current, V = Bn(), L = ii(D), H = Dr(V, L);
    return H.callback = t ?? null, Xr(D, H, L), Lj(C, L, V), C;
  }
  function Ks(e, t, n, a) {
    nS(t, e);
    var r = t.current, i = Bn(), l = ii(r);
    ES(l);
    var u = jN(n);
    t.context === null ? t.context = u : t.pendingContext = u, yi && kn !== null && !Dh && (Dh = !0, d(`Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.

Check the render method of %s.`, Fe(kn) || "Unknown"));
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
      case te: {
        wr(function() {
          var r = Gn(e, Ae);
          if (r !== null) {
            var i = Bn();
            rn(r, e, Ae, i);
          }
        });
        var a = Ae;
        jh(e, a);
        break;
      }
    }
  }
  function _N(e, t) {
    var n = e.memoizedState;
    n !== null && n.dehydrated !== null && (n.retryLane = US(n.retryLane, t));
  }
  function jh(e, t) {
    _N(e, t);
    var n = e.alternate;
    n && _N(n, t);
  }
  function _T(e) {
    if (e.tag === te) {
      var t = Ao, n = Gn(e, t);
      if (n !== null) {
        var a = Bn();
        rn(n, e, t, a);
      }
      jh(e, t);
    }
  }
  function OT(e) {
    if (e.tag === te) {
      var t = ii(e), n = Gn(e, t);
      if (n !== null) {
        var a = Bn();
        rn(n, e, t, a);
      }
      jh(e, t);
    }
  }
  function ON(e) {
    var t = GE(e);
    return t === null ? null : t.stateNode;
  }
  var MN = function(e) {
    return null;
  };
  function MT(e) {
    return MN(e);
  }
  var VN = function(e) {
    return !1;
  };
  function VT(e) {
    return VN(e);
  }
  var AN = null, LN = null, kN = null, UN = null, FN = null, zN = null, PN = null, HN = null, BN = null;
  {
    var $N = function(e, t, n) {
      var a = t[n], r = Ye(e) ? e.slice() : Ie({}, e);
      return n + 1 === t.length ? (Ye(r) ? r.splice(a, 1) : delete r[a], r) : (r[a] = $N(e[a], t, n + 1), r);
    }, IN = function(e, t) {
      return $N(e, t, 0);
    }, YN = function(e, t, n, a) {
      var r = t[a], i = Ye(e) ? e.slice() : Ie({}, e);
      if (a + 1 === t.length) {
        var l = n[a];
        i[l] = i[r], Ye(i) ? i.splice(r, 1) : delete i[r];
      } else
        i[r] = YN(
          // $FlowFixMe number or string is fine here
          e[r],
          t,
          n,
          a + 1
        );
      return i;
    }, qN = function(e, t, n) {
      if (t.length !== n.length) {
        S("copyWithRename() expects paths of the same length");
        return;
      } else
        for (var a = 0; a < n.length - 1; a++)
          if (t[a] !== n[a]) {
            S("copyWithRename() expects paths to be the same except for the deepest key");
            return;
          }
      return YN(e, t, n, 0);
    }, GN = function(e, t, n, a) {
      if (n >= t.length)
        return a;
      var r = t[n], i = Ye(e) ? e.slice() : Ie({}, e);
      return i[r] = GN(e[r], t, n + 1, a), i;
    }, WN = function(e, t, n) {
      return GN(e, t, 0, n);
    }, Th = function(e, t) {
      for (var n = e.memoizedState; n !== null && t > 0; )
        n = n.next, t--;
      return n;
    };
    AN = function(e, t, n, a) {
      var r = Th(e, t);
      if (r !== null) {
        var i = WN(r.memoizedState, n, a);
        r.memoizedState = i, r.baseState = i, e.memoizedProps = Ie({}, e.memoizedProps);
        var l = Gn(e, Ae);
        l !== null && rn(l, e, Ae, xt);
      }
    }, LN = function(e, t, n) {
      var a = Th(e, t);
      if (a !== null) {
        var r = IN(a.memoizedState, n);
        a.memoizedState = r, a.baseState = r, e.memoizedProps = Ie({}, e.memoizedProps);
        var i = Gn(e, Ae);
        i !== null && rn(i, e, Ae, xt);
      }
    }, kN = function(e, t, n, a) {
      var r = Th(e, t);
      if (r !== null) {
        var i = qN(r.memoizedState, n, a);
        r.memoizedState = i, r.baseState = i, e.memoizedProps = Ie({}, e.memoizedProps);
        var l = Gn(e, Ae);
        l !== null && rn(l, e, Ae, xt);
      }
    }, UN = function(e, t, n) {
      e.pendingProps = WN(e.memoizedProps, t, n), e.alternate && (e.alternate.pendingProps = e.pendingProps);
      var a = Gn(e, Ae);
      a !== null && rn(a, e, Ae, xt);
    }, FN = function(e, t) {
      e.pendingProps = IN(e.memoizedProps, t), e.alternate && (e.alternate.pendingProps = e.pendingProps);
      var n = Gn(e, Ae);
      n !== null && rn(n, e, Ae, xt);
    }, zN = function(e, t, n) {
      e.pendingProps = qN(e.memoizedProps, t, n), e.alternate && (e.alternate.pendingProps = e.pendingProps);
      var a = Gn(e, Ae);
      a !== null && rn(a, e, Ae, xt);
    }, PN = function(e) {
      var t = Gn(e, Ae);
      t !== null && rn(t, e, Ae, xt);
    }, HN = function(e) {
      MN = e;
    }, BN = function(e) {
      VN = e;
    };
  }
  function AT(e) {
    var t = Rv(e);
    return t === null ? null : t.stateNode;
  }
  function LT(e) {
    return null;
  }
  function kT() {
    return kn;
  }
  function UT(e) {
    var t = e.findFiberByHostInstance, n = m.ReactCurrentDispatcher;
    return tS({
      bundleType: e.bundleType,
      version: e.version,
      rendererPackageName: e.rendererPackageName,
      rendererConfig: e.rendererConfig,
      overrideHookState: AN,
      overrideHookStateDeletePath: LN,
      overrideHookStateRenamePath: kN,
      overrideProps: UN,
      overridePropsDeletePath: FN,
      overridePropsRenamePath: zN,
      setErrorHandler: HN,
      setSuspenseHandler: BN,
      scheduleUpdate: PN,
      currentDispatcherRef: n,
      findHostInstanceByFiber: AT,
      findFiberByHostInstance: t || LT,
      // React Refresh
      findHostInstancesForRefresh: pT,
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
  var KN = typeof reportError == "function" ? (
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
      typeof arguments[1] == "function" ? d("render(...): does not support the second callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().") : pd(arguments[1]) ? d("You passed a container to the second argument of root.render(...). You don't need to pass it again since you already passed it to create the root.") : typeof arguments[1] < "u" && d("You passed a second argument to root.render(...) but it only accepts one argument.");
      var n = t.containerInfo;
      if (n.nodeType !== $t) {
        var a = ON(t.current);
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
      oN() && d("Attempted to synchronously unmount a root while React was already rendering. React cannot finish unmounting the root until the current render has completed, which may lead to a race condition."), wr(function() {
        Ks(null, e, null, null);
      }), Kg(t);
    }
  };
  function FT(e, t) {
    if (!pd(e))
      throw new Error("createRoot(...): Target container is not a DOM element.");
    QN(e);
    var n = !1, a = !1, r = "", i = KN;
    t != null && (t.hydrate ? S("hydrate through createRoot is deprecated. Use ReactDOMClient.hydrateRoot(container, <App />) instead.") : typeof t == "object" && t !== null && t.$$typeof === ca && d(`You passed a JSX element to createRoot. You probably meant to call root.render instead. Example usage:

  let root = createRoot(domContainer);
  root.render(<App />);`), t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (i = t.onRecoverableError), t.transitionCallbacks !== void 0 && t.transitionCallbacks);
    var l = TN(e, oc, null, n, a, r, i);
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
    if (!pd(e))
      throw new Error("hydrateRoot(...): Target container is not a DOM element.");
    QN(e), t === void 0 && d("Must provide initial children as second argument to hydrateRoot. Example usage: hydrateRoot(domContainer, <App />)");
    var a = n ?? null, r = n != null && n.hydratedSources || null, i = !1, l = !1, u = "", c = KN;
    n != null && (n.unstable_strictMode === !0 && (i = !0), n.identifierPrefix !== void 0 && (u = n.identifierPrefix), n.onRecoverableError !== void 0 && (c = n.onRecoverableError));
    var h = wN(t, null, e, oc, a, i, l, u, c);
    if (ec(h.current, e), ts(e), r)
      for (var v = 0; v < r.length; v++) {
        var C = r[v];
        IC(h, C);
      }
    return new fd(h);
  }
  function pd(e) {
    return !!(e && (e.nodeType === Yn || e.nodeType === pr || e.nodeType === Ad));
  }
  function Qs(e) {
    return !!(e && (e.nodeType === Yn || e.nodeType === pr || e.nodeType === Ad || e.nodeType === $t && e.nodeValue === " react-mount-point-unstable "));
  }
  function QN(e) {
    e.nodeType === Yn && e.tagName && e.tagName.toUpperCase() === "BODY" && d("createRoot(): Creating roots directly with document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try using a container element created for your app."), fs(e) && (e._reactRootContainer ? d("You are calling ReactDOMClient.createRoot() on a container that was previously passed to ReactDOM.render(). This is not supported.") : d("You are calling ReactDOMClient.createRoot() on a container that has already been passed to createRoot() before. Instead, call root.render() on the existing root instead if you want to update it."));
  }
  var HT = m.ReactCurrentOwner, XN;
  XN = function(e) {
    if (e._reactRootContainer && e.nodeType !== $t) {
      var t = ON(e._reactRootContainer.current);
      t && t.parentNode !== e && d("render(...): It looks like the React-rendered content of this container was removed without using React. This is not supported and will cause errors. Instead, call ReactDOM.unmountComponentAtNode to empty a container.");
    }
    var n = !!e._reactRootContainer, a = _h(e), r = !!(a && qr(a));
    r && !n && d("render(...): Replacing React-rendered children with a new root component. If you intended to update the children of this node, you should instead have the existing children update their state and render the new components instead of calling ReactDOM.render."), e.nodeType === Yn && e.tagName && e.tagName.toUpperCase() === "BODY" && d("render(): Rendering components directly into document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try rendering into a container element created for your app.");
  };
  function _h(e) {
    return e ? e.nodeType === pr ? e.documentElement : e.firstChild : null;
  }
  function JN() {
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
      var l = wN(
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
        JN
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
      var v = TN(
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
        JN
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
  function md(e, t, n, a, r) {
    XN(n), $T(r === void 0 ? null : r, "render");
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
  var ZN = !1;
  function IT(e) {
    {
      ZN || (ZN = !0, d("findDOMNode is deprecated and will be removed in the next major release. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node"));
      var t = HT.current;
      if (t !== null && t.stateNode !== null) {
        var n = t.stateNode._warnedAboutRefsInRender;
        n || d("%s is accessing findDOMNode inside its render(). render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", nt(t.type) || "A component"), t.stateNode._warnedAboutRefsInRender = !0;
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
    return md(null, e, t, !0, n);
  }
  function qT(e, t, n) {
    if (d("ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !Qs(t))
      throw new Error("Target container is not a DOM element.");
    {
      var a = fs(t) && t._reactRootContainer === void 0;
      a && d("You are calling ReactDOM.render() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.render(element)?");
    }
    return md(null, e, t, !1, n);
  }
  function GT(e, t, n, a) {
    if (d("ReactDOM.unstable_renderSubtreeIntoContainer() is no longer supported in React 18. Consider using a portal instead. Until you switch to the createRoot API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !Qs(n))
      throw new Error("Target container is not a DOM element.");
    if (e == null || !HE(e))
      throw new Error("parentComponent must be a valid React Component");
    return md(e, t, n, !1, a);
  }
  var ex = !1;
  function WT(e) {
    if (ex || (ex = !0, d("unmountComponentAtNode is deprecated and will be removed in the next major release. Switch to the createRoot API. Learn more: https://reactjs.org/link/switch-to-createroot")), !Qs(e))
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
        md(null, null, e, !1, function() {
          e._reactRootContainer = null, Kg(e);
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
    if (!pd(t))
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
    Events: [qr, Ol, tc, dv, fv, oh]
  };
  function XT(e, t) {
    return Oh.usingClientEntryPoint || d('You are importing createRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), FT(e, t);
  }
  function JT(e, t, n) {
    return Oh.usingClientEntryPoint || d('You are importing hydrateRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), PT(e, t, n);
  }
  function ZT(e) {
    return oN() && d("flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task."), wr(e);
  }
  var ew = UT({
    findFiberByHostInstance: Li,
    bundleType: 1,
    version: Rh,
    rendererPackageName: "react-dom"
  });
  if (!ew && J && window.top === window.self && (navigator.userAgent.indexOf("Chrome") > -1 && navigator.userAgent.indexOf("Edge") === -1 || navigator.userAgent.indexOf("Firefox") > -1)) {
    var tx = window.location.protocol;
    /^(https?|file):$/.test(tx) && console.info("%cDownload the React DevTools for a better development experience: https://reactjs.org/link/react-devtools" + (tx === "file:" ? `
You might need to use a local HTTP server (instead of file://): https://reactjs.org/link/react-devtools-faq` : ""), "font-weight:bold");
  }
  la.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Oh, la.createPortal = KT, la.createRoot = XT, la.findDOMNode = IT, la.flushSync = ZT, la.hydrate = YT, la.hydrateRoot = JT, la.render = qT, la.unmountComponentAtNode = WT, la.unstable_batchedUpdates = oh, la.unstable_renderSubtreeIntoContainer = QT, la.version = Rh, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
})();
Nx.exports = la;
var sw = Nx.exports, Sx, nx = sw;
{
  var ax = nx.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  Sx = function(o, f) {
    ax.usingClientEntryPoint = !0;
    try {
      return nx.createRoot(o, f);
    } finally {
      ax.usingClientEntryPoint = !1;
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
      var m = arguments[f];
      for (var g in m)
        Object.prototype.hasOwnProperty.call(m, g) && (o[g] = m[g]);
    }
    return o;
  }, Js.apply(this, arguments);
}
var si;
(function(o) {
  o.Pop = "POP", o.Push = "PUSH", o.Replace = "REPLACE";
})(si || (si = {}));
const rx = "popstate";
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
  function m(g, b) {
    return typeof b == "string" ? b : Zs(b);
  }
  return dw(f, m, null, o);
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
function ix(o, f) {
  return {
    usr: o.state,
    key: o.key,
    idx: f
  };
}
function Lh(o, f, m, g) {
  return m === void 0 && (m = null), Js({
    pathname: typeof o == "string" ? o : o.pathname,
    search: "",
    hash: ""
  }, typeof f == "string" ? ao(f) : f, {
    state: m,
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
    search: m = "",
    hash: g = ""
  } = o;
  return m && m !== "?" && (f += m.charAt(0) === "?" ? m : "?" + m), g && g !== "#" && (f += g.charAt(0) === "#" ? g : "#" + g), f;
}
function ao(o) {
  let f = {};
  if (o) {
    let m = o.indexOf("#");
    m >= 0 && (f.hash = o.substr(m), o = o.substr(0, m));
    let g = o.indexOf("?");
    g >= 0 && (f.search = o.substr(g), o = o.substr(0, g)), o && (f.pathname = o);
  }
  return f;
}
function dw(o, f, m, g) {
  g === void 0 && (g = {});
  let {
    window: b = document.defaultView,
    v5Compat: S = !1
  } = g, d = b.history, w = si.Pop, R = null, j = M();
  j == null && (j = 0, d.replaceState(Js({}, d.state, {
    idx: j
  }), ""));
  function M() {
    return (d.state || {
      idx: null
    }).idx;
  }
  function x() {
    w = si.Pop;
    let le = M(), oe = le == null ? null : le - j;
    j = le, R && R({
      action: w,
      location: pe.location,
      delta: oe
    });
  }
  function T(le, oe) {
    w = si.Push;
    let G = Lh(pe.location, le, oe);
    j = M() + 1;
    let P = ix(G, j), $ = pe.createHref(G);
    try {
      d.pushState(P, "", $);
    } catch (te) {
      if (te instanceof DOMException && te.name === "DataCloneError")
        throw te;
      b.location.assign($);
    }
    S && R && R({
      action: w,
      location: pe.location,
      delta: 1
    });
  }
  function k(le, oe) {
    w = si.Replace;
    let G = Lh(pe.location, le, oe);
    j = M();
    let P = ix(G, j), $ = pe.createHref(G);
    d.replaceState(P, "", $), S && R && R({
      action: w,
      location: pe.location,
      delta: 0
    });
  }
  function ee(le) {
    let oe = b.location.origin !== "null" ? b.location.origin : b.location.href, G = typeof le == "string" ? le : Zs(le);
    return G = G.replace(/ $/, "%20"), Tt(oe, "No window.location.(origin|href) available to create URL for href: " + G), new URL(G, oe);
  }
  let pe = {
    get action() {
      return w;
    },
    get location() {
      return o(b, d);
    },
    listen(le) {
      if (R)
        throw new Error("A history only accepts one active listener");
      return b.addEventListener(rx, x), R = le, () => {
        b.removeEventListener(rx, x), R = null;
      };
    },
    createHref(le) {
      return f(b, le);
    },
    createURL: ee,
    encodeLocation(le) {
      let oe = ee(le);
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
  return pe;
}
var lx;
(function(o) {
  o.data = "data", o.deferred = "deferred", o.redirect = "redirect", o.error = "error";
})(lx || (lx = {}));
function fw(o, f, m) {
  return m === void 0 && (m = "/"), pw(o, f, m);
}
function pw(o, f, m, g) {
  let b = typeof f == "string" ? ao(f) : f, S = ci(b.pathname || "/", m);
  if (S == null)
    return null;
  let d = Rx(o);
  mw(d);
  let w = null;
  for (let R = 0; w == null && R < d.length; ++R) {
    let j = Dw(S);
    w = Sw(d[R], j);
  }
  return w;
}
function Rx(o, f, m, g) {
  f === void 0 && (f = []), m === void 0 && (m = []), g === void 0 && (g = "");
  let b = (S, d, w) => {
    let R = {
      relativePath: w === void 0 ? S.path || "" : w,
      caseSensitive: S.caseSensitive === !0,
      childrenIndex: d,
      route: S
    };
    R.relativePath.startsWith("/") && (Tt(R.relativePath.startsWith(g), 'Absolute route path "' + R.relativePath + '" nested under path ' + ('"' + g + '" is not valid. An absolute child route path ') + "must start with the combined path of all its parent routes."), R.relativePath = R.relativePath.slice(g.length));
    let j = Vr([g, R.relativePath]), M = m.concat(R);
    S.children && S.children.length > 0 && (Tt(
      // Our types know better, but runtime JS may not!
      // @ts-expect-error
      S.index !== !0,
      "Index routes must not have child routes. Please remove " + ('all child routes from route path "' + j + '".')
    ), Rx(S.children, f, M, j)), !(S.path == null && !S.index) && f.push({
      path: j,
      score: xw(j, S.index),
      routesMeta: M
    });
  };
  return o.forEach((S, d) => {
    var w;
    if (S.path === "" || !((w = S.path) != null && w.includes("?")))
      b(S, d);
    else
      for (let R of Dx(S.path))
        b(S, d, R);
  }), f;
}
function Dx(o) {
  let f = o.split("/");
  if (f.length === 0) return [];
  let [m, ...g] = f, b = m.endsWith("?"), S = m.replace(/\?$/, "");
  if (g.length === 0)
    return b ? [S, ""] : [S];
  let d = Dx(g.join("/")), w = [];
  return w.push(...d.map((R) => R === "" ? S : [S, R].join("/"))), b && w.push(...d), w.map((R) => o.startsWith("/") && R === "" ? "/" : R);
}
function mw(o) {
  o.sort((f, m) => f.score !== m.score ? m.score - f.score : Ew(f.routesMeta.map((g) => g.childrenIndex), m.routesMeta.map((g) => g.childrenIndex)));
}
const hw = /^:[\w-]+$/, vw = 3, gw = 2, bw = 1, yw = 10, Nw = -2, ox = (o) => o === "*";
function xw(o, f) {
  let m = o.split("/"), g = m.length;
  return m.some(ox) && (g += Nw), f && (g += gw), m.filter((b) => !ox(b)).reduce((b, S) => b + (hw.test(S) ? vw : S === "" ? bw : yw), g);
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
function Sw(o, f, m) {
  let {
    routesMeta: g
  } = o, b = {}, S = "/", d = [];
  for (let w = 0; w < g.length; ++w) {
    let R = g[w], j = w === g.length - 1, M = S === "/" ? f : f.slice(S.length) || "/", x = kh({
      path: R.relativePath,
      caseSensitive: R.caseSensitive,
      end: j
    }, M), T = R.route;
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
  let [m, g] = Rw(o.path, o.caseSensitive, o.end), b = f.match(m);
  if (!b) return null;
  let S = b[0], d = S.replace(/(.)\/+$/, "$1"), w = b.slice(1);
  return {
    params: g.reduce((j, M, x) => {
      let {
        paramName: T,
        isOptional: k
      } = M;
      if (T === "*") {
        let pe = w[x] || "";
        d = S.slice(0, S.length - pe.length).replace(/(.)\/+$/, "$1");
      }
      const ee = w[x];
      return k && !ee ? j[T] = void 0 : j[T] = (ee || "").replace(/%2F/g, "/"), j;
    }, {}),
    pathname: S,
    pathnameBase: d,
    pattern: o
  };
}
function Rw(o, f, m) {
  f === void 0 && (f = !1), m === void 0 && (m = !0), Ha(o === "*" || !o.endsWith("*") || o.endsWith("/*"), 'Route path "' + o + '" will be treated as if it were ' + ('"' + o.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + o.replace(/\*$/, "/*") + '".'));
  let g = [], b = "^" + o.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(/\/:([\w-]+)(\?)?/g, (d, w, R) => (g.push({
    paramName: w,
    isOptional: R != null
  }), R ? "/?([^\\/]+)?" : "/([^\\/]+)"));
  return o.endsWith("*") ? (g.push({
    paramName: "*"
  }), b += o === "*" || o === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : m ? b += "\\/*$" : o !== "" && o !== "/" && (b += "(?:(?=\\/|$))"), [new RegExp(b, f ? void 0 : "i"), g];
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
  let m = f.endsWith("/") ? f.length - 1 : f.length, g = o.charAt(m);
  return g && g !== "/" ? null : o.slice(m) || "/";
}
function Cw(o, f) {
  f === void 0 && (f = "/");
  let {
    pathname: m,
    search: g = "",
    hash: b = ""
  } = typeof o == "string" ? ao(o) : o;
  return {
    pathname: m ? m.startsWith("/") ? m : jw(m, f) : f,
    search: _w(g),
    hash: Ow(b)
  };
}
function jw(o, f) {
  let m = f.replace(/\/+$/, "").split("/");
  return o.split("/").forEach((b) => {
    b === ".." ? m.length > 1 && m.pop() : b !== "." && m.push(b);
  }), m.length > 1 ? m.join("/") : "/";
}
function Mh(o, f, m, g) {
  return "Cannot include a '" + o + "' character in a manually specified " + ("`to." + f + "` field [" + JSON.stringify(g) + "].  Please separate it out to the ") + ("`to." + m + "` field. Alternatively you may provide the full path as ") + 'a string in <Link to="..."> and the router will parse it for you.';
}
function Tw(o) {
  return o.filter((f, m) => m === 0 || f.route.path && f.route.path.length > 0);
}
function Ph(o, f) {
  let m = Tw(o);
  return f ? m.map((g, b) => b === m.length - 1 ? g.pathname : g.pathnameBase) : m.map((g) => g.pathnameBase);
}
function Hh(o, f, m, g) {
  g === void 0 && (g = !1);
  let b;
  typeof o == "string" ? b = ao(o) : (b = Js({}, o), Tt(!b.pathname || !b.pathname.includes("?"), Mh("?", "pathname", "search", b)), Tt(!b.pathname || !b.pathname.includes("#"), Mh("#", "pathname", "hash", b)), Tt(!b.search || !b.search.includes("#"), Mh("#", "search", "hash", b)));
  let S = o === "" || b.pathname === "", d = S ? "/" : b.pathname, w;
  if (d == null)
    w = m;
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
  let R = Cw(b, w), j = d && d !== "/" && d.endsWith("/"), M = (S || d === ".") && m.endsWith("/");
  return !R.pathname.endsWith("/") && (j || M) && (R.pathname += "/"), R;
}
const Vr = (o) => o.join("/").replace(/\/\/+/g, "/"), ww = (o) => o.replace(/\/+$/, "").replace(/^\/*/, "/"), _w = (o) => !o || o === "?" ? "" : o.startsWith("?") ? o : "?" + o, Ow = (o) => !o || o === "#" ? "" : o.startsWith("#") ? o : "#" + o;
function Mw(o) {
  return o != null && typeof o.status == "number" && typeof o.statusText == "string" && typeof o.internal == "boolean" && "data" in o;
}
const Cx = ["post", "put", "patch", "delete"];
new Set(Cx);
const Vw = ["get", ...Cx];
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
      var m = arguments[f];
      for (var g in m)
        Object.prototype.hasOwnProperty.call(m, g) && (o[g] = m[g]);
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
    relative: m
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
    relative: m
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
const jx = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function Tx(o) {
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
    future: m,
    navigator: g
  } = y.useContext(Na), {
    matches: b
  } = y.useContext($a), {
    pathname: S
  } = Ji(), d = JSON.stringify(Ph(b, m.v7_relativeSplatPath)), w = y.useRef(!1);
  return Tx(() => {
    w.current = !0;
  }), y.useCallback(function(j, M) {
    if (M === void 0 && (M = {}), Ha(w.current, jx), !w.current) return;
    if (typeof j == "number") {
      g.go(j);
      return;
    }
    let x = Hh(j, JSON.parse(d), S, M.relative === "path");
    o == null && f !== "/" && (x.pathname = x.pathname === "/" ? f : Vr([f, x.pathname])), (M.replace ? g.replace : g.push)(x, M.state, M);
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
    relative: m
  } = f === void 0 ? {} : f, {
    future: g
  } = y.useContext(Na), {
    matches: b
  } = y.useContext($a), {
    pathname: S
  } = Ji(), d = JSON.stringify(Ph(b, g.v7_relativeSplatPath));
  return y.useMemo(() => Hh(o, JSON.parse(d), S, m === "path"), [o, d, S, m]);
}
function Fw(o, f) {
  return zw(o, f);
}
function zw(o, f, m, g) {
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
  } = y.useContext($a), d = S[S.length - 1], w = d ? d.params : {}, R = d ? d.pathname : "/", j = d ? d.pathnameBase : "/", M = d && d.route;
  {
    let G = M && M.path || "";
    _x(R, !M || G.endsWith("*"), "You rendered descendant <Routes> (or called `useRoutes()`) at " + ('"' + R + '" (under <Route path="' + G + '">) but the ') + `parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

` + ('Please change the parent <Route path="' + G + '"> to <Route ') + ('path="' + (G === "/" ? "*" : G + "/*") + '">.'));
  }
  let x = Ji(), T;
  if (f) {
    var k;
    let G = typeof f == "string" ? ao(f) : f;
    j === "/" || (k = G.pathname) != null && k.startsWith(j) || Tt(!1, "When overriding the location using `<Routes location>` or `useRoutes(routes, location)`, the location pathname must begin with the portion of the URL pathname that was " + ('matched by all parent routes. The current pathname base is "' + j + '" ') + ('but pathname "' + G.pathname + '" was given in the `location` prop.')), T = G;
  } else
    T = x;
  let ee = T.pathname || "/", pe = ee;
  if (j !== "/") {
    let G = j.replace(/^\//, "").split("/");
    pe = "/" + ee.replace(/^\//, "").split("/").slice(G.length).join("/");
  }
  let le = fw(o, {
    pathname: pe
  });
  Ha(M || le != null, 'No routes matched location "' + T.pathname + T.search + T.hash + '" '), Ha(le == null || le[le.length - 1].route.element !== void 0 || le[le.length - 1].route.Component !== void 0 || le[le.length - 1].route.lazy !== void 0, 'Matched leaf route at location "' + T.pathname + T.search + T.hash + '" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.');
  let oe = Iw(le && le.map((G) => Object.assign({}, G, {
    params: Object.assign({}, w, G.params),
    pathname: Vr([
      j,
      // Re-encode pathnames that were decoded inside matchRoutes
      b.encodeLocation ? b.encodeLocation(G.pathname).pathname : G.pathname
    ]),
    pathnameBase: G.pathnameBase === "/" ? j : Vr([
      j,
      // Re-encode pathnames that were decoded inside matchRoutes
      b.encodeLocation ? b.encodeLocation(G.pathnameBase).pathname : G.pathnameBase
    ])
  })), S, m, g);
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
  let o = Kw(), f = Mw(o) ? o.status + " " + o.statusText : o instanceof Error ? o.message : JSON.stringify(o), m = o instanceof Error ? o.stack : null, g = "rgba(200,200,200, 0.5)", b = {
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
  }, f), m ? /* @__PURE__ */ y.createElement("pre", {
    style: b
  }, m) : null, d);
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
  static getDerivedStateFromProps(f, m) {
    return m.location !== f.location || m.revalidation !== "idle" && f.revalidation === "idle" ? {
      error: f.error,
      location: f.location,
      revalidation: f.revalidation
    } : {
      error: f.error !== void 0 ? f.error : m.error,
      location: m.location,
      revalidation: f.revalidation || m.revalidation
    };
  }
  componentDidCatch(f, m) {
    console.error("React Router caught the following error during render", f, m);
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
    match: m,
    children: g
  } = o, b = y.useContext(nu);
  return b && b.static && b.staticContext && (m.route.errorElement || m.route.ErrorBoundary) && (b.staticContext._deepestRenderedBoundaryId = m.route.id), /* @__PURE__ */ y.createElement($a.Provider, {
    value: f
  }, g);
}
function Iw(o, f, m, g) {
  var b;
  if (f === void 0 && (f = []), m === void 0 && (m = null), g === void 0 && (g = null), o == null) {
    var S;
    if (!m)
      return null;
    if (m.errors)
      o = m.matches;
    else if ((S = g) != null && S.v7_partialHydration && f.length === 0 && !m.initialized && m.matches.length > 0)
      o = m.matches;
    else
      return null;
  }
  let d = o, w = (b = m) == null ? void 0 : b.errors;
  if (w != null) {
    let M = d.findIndex((x) => x.route.id && (w == null ? void 0 : w[x.route.id]) !== void 0);
    M >= 0 || Tt(!1, "Could not find a matching route for errors on route IDs: " + Object.keys(w).join(",")), d = d.slice(0, Math.min(d.length, M + 1));
  }
  let R = !1, j = -1;
  if (m && g && g.v7_partialHydration)
    for (let M = 0; M < d.length; M++) {
      let x = d[M];
      if ((x.route.HydrateFallback || x.route.hydrateFallbackElement) && (j = M), x.route.id) {
        let {
          loaderData: T,
          errors: k
        } = m, ee = x.route.loader && T[x.route.id] === void 0 && (!k || k[x.route.id] === void 0);
        if (x.route.lazy || ee) {
          R = !0, j >= 0 ? d = d.slice(0, j + 1) : d = [d[0]];
          break;
        }
      }
    }
  return d.reduceRight((M, x, T) => {
    let k, ee = !1, pe = null, le = null;
    m && (k = w && x.route.id ? w[x.route.id] : void 0, pe = x.route.errorElement || Hw, R && (j < 0 && T === 0 ? (_x("route-fallback", !1, "No `HydrateFallback` element provided to render during initial hydration"), ee = !0, le = null) : j === T && (ee = !0, le = x.route.hydrateFallbackElement || null)));
    let oe = f.concat(d.slice(0, T + 1)), G = () => {
      let P;
      return k ? P = pe : ee ? P = le : x.route.Component ? P = /* @__PURE__ */ y.createElement(x.route.Component, null) : x.route.element ? P = x.route.element : P = M, /* @__PURE__ */ y.createElement($w, {
        match: x,
        routeContext: {
          outlet: M,
          matches: oe,
          isDataRoute: m != null
        },
        children: P
      });
    };
    return m && (x.route.ErrorBoundary || x.route.errorElement || T === 0) ? /* @__PURE__ */ y.createElement(Bw, {
      location: m.location,
      revalidation: m.revalidation,
      component: pe,
      error: k,
      children: G(),
      routeContext: {
        outlet: null,
        matches: oe,
        isDataRoute: !0
      }
    }) : G();
  }, null);
}
var wx = /* @__PURE__ */ function(o) {
  return o.UseBlocker = "useBlocker", o.UseRevalidator = "useRevalidator", o.UseNavigateStable = "useNavigate", o;
}(wx || {}), tu = /* @__PURE__ */ function(o) {
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
  let f = Gw(o), m = f.matches[f.matches.length - 1];
  return m.route.id || Tt(!1, o + ' can only be used on routes that contain a unique "id"'), m.route.id;
}
function Ww() {
  return qh(tu.UseRouteId);
}
function Kw() {
  var o;
  let f = y.useContext($h), m = qw(tu.UseRouteError), g = qh(tu.UseRouteError);
  return f !== void 0 ? f : (o = m.errors) == null ? void 0 : o[g];
}
function Qw() {
  let {
    router: o
  } = Yw(wx.UseNavigateStable), f = qh(tu.UseNavigateStable), m = y.useRef(!1);
  return Tx(() => {
    m.current = !0;
  }), y.useCallback(function(b, S) {
    S === void 0 && (S = {}), Ha(m.current, jx), m.current && (typeof b == "number" ? o.navigate(b) : o.navigate(b, eu({
      fromRouteId: f
    }, S)));
  }, [o, f]);
}
const sx = {};
function _x(o, f, m) {
  !f && !sx[o] && (sx[o] = !0, Ha(!1, m));
}
const ux = {};
function Xw(o, f) {
  ux[f] || (ux[f] = !0, console.warn(f));
}
const cx = (o, f, m) => Xw(o, "⚠️ React Router Future Flag Warning: " + f + ". " + ("You can use the `" + o + "` future flag to opt-in early. ") + ("For more information, see " + m + "."));
function Jw(o, f) {
  (o == null ? void 0 : o.v7_startTransition) === void 0 && cx("v7_startTransition", "React Router will begin wrapping state updates in `React.startTransition` in v7", "https://reactrouter.com/v6/upgrading/future#v7_starttransition"), (o == null ? void 0 : o.v7_relativeSplatPath) === void 0 && cx("v7_relativeSplatPath", "Relative route resolution within Splat routes is changing in v7", "https://reactrouter.com/v6/upgrading/future#v7_relativesplatpath");
}
function Zw(o) {
  let {
    to: f,
    replace: m,
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
  } = Ji(), j = Ih(), M = Hh(f, Ph(w, S.v7_relativeSplatPath), R, b === "path"), x = JSON.stringify(M);
  return y.useEffect(() => j(JSON.parse(x), {
    replace: m,
    state: g,
    relative: b
  }), [j, x, b, m, g]), null;
}
function lr(o) {
  Tt(!1, "A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.");
}
function e_(o) {
  let {
    basename: f = "/",
    children: m = null,
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
    pathname: M = "/",
    search: x = "",
    hash: T = "",
    state: k = null,
    key: ee = "default"
  } = g, pe = y.useMemo(() => {
    let le = ci(M, R);
    return le == null ? null : {
      location: {
        pathname: le,
        search: x,
        hash: T,
        state: k,
        key: ee
      },
      navigationType: b
    };
  }, [R, M, x, T, k, ee, b]);
  return Ha(pe != null, '<Router basename="' + R + '"> is not able to match the URL ' + ('"' + M + x + T + '" because it does not start with the ') + "basename, so the <Router> won't render anything."), pe == null ? null : /* @__PURE__ */ y.createElement(Na.Provider, {
    value: j
  }, /* @__PURE__ */ y.createElement(au.Provider, {
    children: m,
    value: pe
  }));
}
function t_(o) {
  let {
    children: f,
    location: m
  } = o;
  return Fw(Uh(f), m);
}
new Promise(() => {
});
function Uh(o, f) {
  f === void 0 && (f = []);
  let m = [];
  return y.Children.forEach(o, (g, b) => {
    if (!/* @__PURE__ */ y.isValidElement(g))
      return;
    let S = [...f, b];
    if (g.type === y.Fragment) {
      m.push.apply(m, Uh(g.props.children, S));
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
    g.props.children && (d.children = Uh(g.props.children, S)), m.push(d);
  }), m;
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
      var m = arguments[f];
      for (var g in m)
        Object.prototype.hasOwnProperty.call(m, g) && (o[g] = m[g]);
    }
    return o;
  }, no.apply(this, arguments);
}
function Gh(o, f) {
  if (o == null) return {};
  var m = {}, g = Object.keys(o), b, S;
  for (S = 0; S < g.length; S++)
    b = g[S], !(f.indexOf(b) >= 0) && (m[b] = o[b]);
  return m;
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
  let m, g, b, S, d;
  if (a_(o)) {
    let w = o.getAttribute("action");
    g = w ? ci(w, f) : null, m = o.getAttribute("method") || vd, b = Vh(o.getAttribute("enctype")) || gd, S = new FormData(o);
  } else if (n_(o) || r_(o) && (o.type === "submit" || o.type === "image")) {
    let w = o.form;
    if (w == null)
      throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
    let R = o.getAttribute("formaction") || w.getAttribute("action");
    if (g = R ? ci(R, f) : null, m = o.getAttribute("formmethod") || w.getAttribute("method") || vd, b = Vh(o.getAttribute("formenctype")) || Vh(w.getAttribute("enctype")) || gd, S = new FormData(w, o), !o_()) {
      let {
        name: j,
        type: M,
        value: x
      } = o;
      if (M === "image") {
        let T = j ? j + "." : "";
        S.append(T + "x", "0"), S.append(T + "y", "0");
      } else j && S.append(j, x);
    }
  } else {
    if (Ed(o))
      throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');
    m = vd, g = null, b = gd, d = o;
  }
  return S && b === "text/plain" && (d = S, S = void 0), {
    action: g,
    method: m.toLowerCase(),
    encType: b,
    formData: S,
    body: d
  };
}
const c_ = ["onClick", "relative", "reloadDocument", "replace", "state", "target", "to", "preventScrollReset", "viewTransition"], d_ = ["aria-current", "caseSensitive", "className", "end", "style", "to", "viewTransition", "children"], f_ = ["fetcherKey", "navigate", "reloadDocument", "replace", "state", "method", "action", "onSubmit", "relative", "preventScrollReset", "viewTransition"], p_ = "6";
try {
  window.__reactRouterVersion = p_;
} catch {
}
const Ox = /* @__PURE__ */ y.createContext({
  isTransitioning: !1
});
Ox.displayName = "ViewTransition";
const m_ = /* @__PURE__ */ y.createContext(/* @__PURE__ */ new Map());
m_.displayName = "Fetchers";
const h_ = "startTransition", dx = lw[h_];
function v_(o) {
  let {
    basename: f,
    children: m,
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
  } = g || {}, M = y.useCallback((x) => {
    j && dx ? dx(() => R(x)) : R(x);
  }, [R, j]);
  return y.useLayoutEffect(() => d.listen(M), [d, M]), y.useEffect(() => Jw(g), [g]), /* @__PURE__ */ y.createElement(e_, {
    basename: f,
    children: m,
    location: w.location,
    navigationType: w.action,
    navigator: d,
    future: g
  });
}
const g_ = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", b_ = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, Xi = /* @__PURE__ */ y.forwardRef(function(f, m) {
  let {
    onClick: g,
    relative: b,
    reloadDocument: S,
    replace: d,
    state: w,
    target: R,
    to: j,
    preventScrollReset: M,
    viewTransition: x
  } = f, T = Gh(f, c_), {
    basename: k
  } = y.useContext(Na), ee, pe = !1;
  if (typeof j == "string" && b_.test(j) && (ee = j, g_))
    try {
      let P = new URL(window.location.href), $ = j.startsWith("//") ? new URL(P.protocol + j) : new URL(j), te = ci($.pathname, k);
      $.origin === P.origin && te != null ? j = te + $.search + $.hash : pe = !0;
    } catch {
      Ha(!1, '<Link to="' + j + '"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.');
    }
  let le = Lw(j, {
    relative: b
  }), oe = E_(j, {
    replace: d,
    state: w,
    target: R,
    preventScrollReset: M,
    relative: b,
    viewTransition: x
  });
  function G(P) {
    g && g(P), P.defaultPrevented || oe(P);
  }
  return (
    // eslint-disable-next-line jsx-a11y/anchor-has-content
    /* @__PURE__ */ y.createElement("a", no({}, T, {
      href: ee || le,
      onClick: pe || S ? g : G,
      ref: m,
      target: R
    }))
  );
});
Xi.displayName = "Link";
const y_ = /* @__PURE__ */ y.forwardRef(function(f, m) {
  let {
    "aria-current": g = "page",
    caseSensitive: b = !1,
    className: S = "",
    end: d = !1,
    style: w,
    to: R,
    viewTransition: j,
    children: M
  } = f, x = Gh(f, d_), T = ru(R, {
    relative: x.relative
  }), k = Ji(), ee = y.useContext(Bh), {
    navigator: pe,
    basename: le
  } = y.useContext(Na), oe = ee != null && // Conditional usage is OK here because the usage of a data router is static
  // eslint-disable-next-line react-hooks/rules-of-hooks
  T_(T) && j === !0, G = pe.encodeLocation ? pe.encodeLocation(T).pathname : T.pathname, P = k.pathname, $ = ee && ee.navigation && ee.navigation.location ? ee.navigation.location.pathname : null;
  b || (P = P.toLowerCase(), $ = $ ? $.toLowerCase() : null, G = G.toLowerCase()), $ && le && ($ = ci($, le) || $);
  const te = G !== "/" && G.endsWith("/") ? G.length - 1 : G.length;
  let F = P === G || !d && P.startsWith(G) && P.charAt(te) === "/", U = $ != null && ($ === G || !d && $.startsWith(G) && $.charAt(G.length) === "/"), re = {
    isActive: F,
    isPending: U,
    isTransitioning: oe
  }, X = F ? g : void 0, K;
  typeof S == "function" ? K = S(re) : K = [S, F ? "active" : null, U ? "pending" : null, oe ? "transitioning" : null].filter(Boolean).join(" ");
  let ie = typeof w == "function" ? w(re) : w;
  return /* @__PURE__ */ y.createElement(Xi, no({}, x, {
    "aria-current": X,
    className: K,
    ref: m,
    style: ie,
    to: R,
    viewTransition: j
  }), typeof M == "function" ? M(re) : M);
});
y_.displayName = "NavLink";
const N_ = /* @__PURE__ */ y.forwardRef((o, f) => {
  let {
    fetcherKey: m,
    navigate: g,
    reloadDocument: b,
    replace: S,
    state: d,
    method: w = vd,
    action: R,
    onSubmit: j,
    relative: M,
    preventScrollReset: x,
    viewTransition: T
  } = o, k = Gh(o, f_), ee = C_(), pe = j_(R, {
    relative: M
  }), le = w.toLowerCase() === "get" ? "get" : "post", oe = (G) => {
    if (j && j(G), G.defaultPrevented) return;
    G.preventDefault();
    let P = G.nativeEvent.submitter, $ = (P == null ? void 0 : P.getAttribute("formmethod")) || w;
    ee(P || G.currentTarget, {
      fetcherKey: m,
      method: $,
      navigate: g,
      replace: S,
      state: d,
      relative: M,
      preventScrollReset: x,
      viewTransition: T
    });
  };
  return /* @__PURE__ */ y.createElement("form", no({
    ref: f,
    method: le,
    action: pe,
    onSubmit: b ? j : oe
  }, k));
});
N_.displayName = "Form";
var yd;
(function(o) {
  o.UseScrollRestoration = "useScrollRestoration", o.UseSubmit = "useSubmit", o.UseSubmitFetcher = "useSubmitFetcher", o.UseFetcher = "useFetcher", o.useViewTransitionState = "useViewTransitionState";
})(yd || (yd = {}));
var fx;
(function(o) {
  o.UseFetcher = "useFetcher", o.UseFetchers = "useFetchers", o.UseScrollRestoration = "useScrollRestoration";
})(fx || (fx = {}));
function x_(o) {
  return o + " must be used within a data router.  See https://reactrouter.com/v6/routers/picking-a-router.";
}
function Mx(o) {
  let f = y.useContext(nu);
  return f || Tt(!1, x_(o)), f;
}
function E_(o, f) {
  let {
    target: m,
    replace: g,
    state: b,
    preventScrollReset: S,
    relative: d,
    viewTransition: w
  } = f === void 0 ? {} : f, R = Ih(), j = Ji(), M = ru(o, {
    relative: d
  });
  return y.useCallback((x) => {
    if (l_(x, m)) {
      x.preventDefault();
      let T = g !== void 0 ? g : Zs(j) === Zs(M);
      R(o, {
        replace: T,
        state: b,
        preventScrollReset: S,
        relative: d,
        viewTransition: w
      });
    }
  }, [j, R, M, g, b, m, o, S, d, w]);
}
function S_() {
  if (typeof document > "u")
    throw new Error("You are calling submit during the server render. Try calling submit within a `useEffect` or callback instead.");
}
let R_ = 0, D_ = () => "__" + String(++R_) + "__";
function C_() {
  let {
    router: o
  } = Mx(yd.UseSubmit), {
    basename: f
  } = y.useContext(Na), m = Ww();
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
      let M = b.fetcherKey || D_();
      o.fetch(M, m, b.action || S, {
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
        fromRouteId: m,
        flushSync: b.flushSync,
        viewTransition: b.viewTransition
      });
  }, [o, f, m]);
}
function j_(o, f) {
  let {
    relative: m
  } = f === void 0 ? {} : f, {
    basename: g
  } = y.useContext(Na), b = y.useContext($a);
  b || Tt(!1, "useFormAction must be used inside a RouteContext");
  let [S] = b.matches.slice(-1), d = no({}, ru(o || ".", {
    relative: m
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
  let m = y.useContext(Ox);
  m == null && Tt(!1, "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");
  let {
    basename: g
  } = Mx(yd.useViewTransitionState), b = ru(o, {
    relative: f.relative
  });
  if (!m.isTransitioning)
    return !1;
  let S = ci(m.currentLocation.pathname, g) || m.currentLocation.pathname, d = ci(m.nextLocation.pathname, g) || m.nextLocation.pathname;
  return kh(b.pathname, d) != null || kh(b.pathname, S) != null;
}
function w_() {
  const [o, f] = y.useState(null), [m, g] = y.useState(""), [b, S] = y.useState(""), [d, w] = y.useState(!0), [R, j] = y.useState(""), [M, x] = y.useState(""), [T, k] = y.useState(!1), [ee, pe] = y.useState(!1);
  y.useEffect(() => {
    const P = typeof window < "u" ? window : void 0, $ = P && P.__FIREBASE__ ? P.__FIREBASE__ : null;
    f({
      apiKey: $ && $.apiKey || void 0 || "AIzaSyD-zBSQk_OIyIDzRG0wBNlQCloBqu25ijo",
      authDomain: $ && $.authDomain || void 0 || "fresh-basket-a8933.firebaseapp.com",
      projectId: $ && $.projectId || void 0 || "fresh-basket-a8933",
      appId: $ && $.appId || void 0 || "1:163656027399:web:7bbd739740ec13453489a2",
      messagingSenderId: $ && $.messagingSenderId || void 0 || "163656027399",
      measurementId: $ && $.measurementId || void 0 || "G-7M8H5YJF18"
    });
  }, []);
  function le(P) {
    const $ = (P == null ? void 0 : P.code) || "", te = (P == null ? void 0 : P.message) || "";
    return $.includes("invalid-email") ? "Please enter a valid email address." : $.includes("user-not-found") ? "No account found with that email." : $.includes("wrong-password") || $.includes("invalid-credential") || te.includes("INVALID_LOGIN_CREDENTIALS") ? "Incorrect email or password." : $.includes("too-many-requests") ? "Too many attempts. Please wait and try again." : $.includes("network-request-failed") ? "Network error. Check your connection and try again." : te || "Something went wrong.";
  }
  async function oe(P) {
    P.preventDefault(), j(""), x(""), k(!0);
    try {
      if (!(o != null && o.apiKey)) throw new Error("Firebase not configured");
      const $ = (await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js")).initializeApp(o), te = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js"), { getAuth: F, setPersistence: U, browserLocalPersistence: re, browserSessionPersistence: X, signInWithEmailAndPassword: K } = te, ie = F();
      await U(ie, d ? re : X);
      const q = await (await K(ie, m.trim(), b)).user.getIdToken();
      if (!(await fetch("/auth/session", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify({ idToken: q }) })).ok) throw new Error("Session creation failed");
      x("Signed in successfully."), setTimeout(() => window.location.href = "/dashboard", 600);
    } catch ($) {
      j(le($));
    } finally {
      k(!1);
    }
  }
  async function G() {
    j(""), x("");
    try {
      if (!(o != null && o.apiKey)) throw new Error("Firebase not configured");
      const P = (await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js")).initializeApp(o), { getAuth: $, sendPasswordResetEmail: te } = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js"), F = $();
      await te(F, m.trim()), x("If an account exists for that email, a reset link has been sent.");
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
      M && /* @__PURE__ */ s.jsxDEV("div", { className: "auth-success", children: M }, void 0, !1, {
        fileName: "/app/code/client/pages/Login.jsx",
        lineNumber: 82,
        columnNumber: 16
      }, this),
      /* @__PURE__ */ s.jsxDEV("form", { className: "auth-form", onSubmit: oe, children: [
        /* @__PURE__ */ s.jsxDEV("label", { className: "auth-label", children: [
          "Email",
          /* @__PURE__ */ s.jsxDEV("input", { className: "auth-input", type: "email", value: m, onChange: (P) => g(P.target.value), required: !0 }, void 0, !1, {
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
            /* @__PURE__ */ s.jsxDEV("input", { className: "auth-input", type: ee ? "text" : "password", value: b, onChange: (P) => S(P.target.value), required: !0 }, void 0, !1, {
              fileName: "/app/code/client/pages/Login.jsx",
              lineNumber: 89,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ s.jsxDEV("button", { type: "button", id: "togglePwd", className: "toggle-password", "aria-label": ee ? "Hide password" : "Show password", onClick: () => pe((P) => !P), children: "👁️" }, void 0, !1, {
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
          /* @__PURE__ */ s.jsxDEV("button", { className: "link-button", type: "button", onClick: G, children: "Forgot password?" }, void 0, !1, {
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
  const [o, f] = y.useState(null), [m, g] = y.useState(""), [b, S] = y.useState(""), [d, w] = y.useState(""), [R, j] = y.useState(""), [M, x] = y.useState(""), [T, k] = y.useState(""), [ee, pe] = y.useState(""), [le, oe] = y.useState(!1), [G, P] = y.useState(!1), [$, te] = y.useState(!1), [F, U] = y.useState(!1);
  y.useEffect(() => {
    const K = typeof window < "u" ? window : void 0, ie = K && K.__FIREBASE__ ? K.__FIREBASE__ : null;
    f({
      apiKey: ie && ie.apiKey || void 0 || "AIzaSyD-zBSQk_OIyIDzRG0wBNlQCloBqu25ijo",
      authDomain: ie && ie.authDomain || void 0 || "fresh-basket-a8933.firebaseapp.com",
      projectId: ie && ie.projectId || void 0 || "fresh-basket-a8933",
      appId: ie && ie.appId || void 0 || "1:163656027399:web:7bbd739740ec13453489a2",
      messagingSenderId: ie && ie.messagingSenderId || void 0 || "163656027399",
      measurementId: ie && ie.measurementId || void 0 || "G-7M8H5YJF18"
    });
  }, []);
  function re(K) {
    const ie = (K == null ? void 0 : K.code) || "";
    return ie.includes("email-already-in-use") ? "An account with this email already exists." : ie.includes("weak-password") ? "Password should be at least 6 characters." : ie.includes("invalid-email") ? "Please enter a valid email address." : ie.includes("network-request-failed") ? "Network error. Check your connection and try again." : (K == null ? void 0 : K.message) || "Something went wrong.";
  }
  async function X(K) {
    K.preventDefault(), k(""), pe(""), oe(!0);
    try {
      const ie = String(m).trim(), Te = String(b).trim(), q = Te.replace(/\D+/g, ""), be = { fn: !ie, cn: !Te };
      if (te(be.fn), U(be.cn || q.length < 7), be.fn || be.cn) {
        k("Please fill in required fields");
        return;
      }
      if (q.length < 7) {
        k("Please enter a valid mobile number");
        return;
      }
      if (R !== M) throw new Error("Passwords do not match");
      if (!(o != null && o.apiKey)) throw new Error("Firebase not configured");
      const ye = (await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js")).initializeApp(o), { getAuth: Y, createUserWithEmailAndPassword: W } = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js"), ce = Y(), Pe = await (await W(ce, d.trim(), R)).user.getIdToken();
      if (!(await fetch("/auth/session", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify({ idToken: Pe, profile: { fullName: ie, contactNumber: Te } }) })).ok) throw new Error("Session creation failed");
      pe("Account created successfully. Redirecting..."), setTimeout(() => window.location.href = "/riders", 700);
    } catch (ie) {
      k(re(ie));
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
    ee && /* @__PURE__ */ s.jsxDEV("div", { className: "auth-success", children: ee }, void 0, !1, {
      fileName: "/app/code/client/pages/Register.jsx",
      lineNumber: 69,
      columnNumber: 14
    }, this),
    /* @__PURE__ */ s.jsxDEV("form", { className: "auth-form", onSubmit: X, children: [
      /* @__PURE__ */ s.jsxDEV("label", { className: "auth-label", children: [
        "Full name",
        /* @__PURE__ */ s.jsxDEV("input", { className: "auth-input" + ($ && !String(m).trim() ? " input-error" : ""), value: m, onChange: (K) => {
          g(K.target.value), $ && te(!String(K.target.value).trim());
        }, onBlur: () => te(!String(m).trim()), required: !0 }, void 0, !1, {
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
        /* @__PURE__ */ s.jsxDEV("input", { className: "auth-input" + (F ? " input-error" : ""), type: "tel", inputMode: "tel", pattern: "[0-9+()\\-\\s]{7,}", value: b, onChange: (K) => {
          if (S(K.target.value), F) {
            const ie = String(K.target.value).trim().replace(/\D+/g, "");
            U(!(ie.length >= 7));
          }
        }, onBlur: () => {
          const K = String(b).trim().replace(/\D+/g, "");
          U(!(K.length >= 7));
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
        /* @__PURE__ */ s.jsxDEV("input", { className: "auth-input", type: "email", value: d, onChange: (K) => w(K.target.value), required: !0 }, void 0, !1, {
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
          /* @__PURE__ */ s.jsxDEV("input", { className: "auth-input", type: G ? "text" : "password", value: R, onChange: (K) => j(K.target.value), minLength: 6, required: !0 }, void 0, !1, {
            fileName: "/app/code/client/pages/Register.jsx",
            lineNumber: 82,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ s.jsxDEV("button", { type: "button", className: "toggle-password", "aria-label": G ? "Hide password" : "Show password", onClick: () => P((K) => !K), children: "👁️" }, void 0, !1, {
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
        /* @__PURE__ */ s.jsxDEV("input", { className: "auth-input", type: "password", value: M, onChange: (K) => x(K.target.value), minLength: 6, required: !0 }, void 0, !1, {
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
    const m = Array.isArray(window.__pendingToasts) ? window.__pendingToasts.slice() : [];
    if (m.length) {
      const g = m.map((b) => ({
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
    const m = o.map((g) => setTimeout(() => {
      f((b) => b.filter((S) => S.id !== g.id));
    }, g.ttl));
    return () => {
      m.forEach(clearTimeout);
    };
  }, [o]), o.length ? /* @__PURE__ */ s.jsxDEV("div", { className: "toaster-container", "aria-live": "polite", "aria-atomic": "true", children: o.map((m) => /* @__PURE__ */ s.jsxDEV("div", { className: `toast ${m.type === "success" ? "toast-success" : "toast-info"}`, role: "status", children: [
    /* @__PURE__ */ s.jsxDEV("div", { className: "toast-message", children: m.message }, void 0, !1, {
      fileName: "/app/code/client/components/Toaster.jsx",
      lineNumber: 46,
      columnNumber: 11
    }, this),
    /* @__PURE__ */ s.jsxDEV("button", { className: "toast-close", onClick: () => f((g) => g.filter((b) => b.id !== m.id)), "aria-label": "Dismiss", children: "✕" }, void 0, !1, {
      fileName: "/app/code/client/components/Toaster.jsx",
      lineNumber: 47,
      columnNumber: 11
    }, this)
  ] }, m.id, !0, {
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
    typeof window > "u" || (window.__pendingToasts = window.__pendingToasts || [], typeof window.showToast != "function" && (window.showToast = function(m, g) {
      return window.__pendingToasts.push({ message: m, opts: g || {} }), null;
    }), typeof window.hideToast != "function" && (window.hideToast = function(m) {
      try {
        window.__pendingToasts && (window.__pendingToasts = window.__pendingToasts.filter((g) => g.id !== m));
      } catch {
      }
    }));
  }, []);
  const f = Ih();
  return y.useEffect(() => {
    const m = document.getElementById("notifBtn"), g = document.getElementById("notifMenu"), b = document.getElementById("profileBtn"), S = document.getElementById("profileMenu");
    function d(x, T, k) {
      x && (x.classList.toggle("hidden", !k), x.setAttribute("aria-hidden", k ? "false" : "true"), T && T.setAttribute("aria-expanded", k ? "true" : "false"));
    }
    function w() {
      d(g, m, !1), d(S, b, !1);
    }
    function R(x) {
      const T = (k) => k && (k === x.target || k.contains(x.target));
      !T(g) && !T(m) && !T(S) && !T(b) && w();
    }
    function j(x) {
      x.key === "Escape" && w();
    }
    function M(x) {
      x && x.querySelectorAll(".dropdown-item").forEach((T) => {
        T.addEventListener("click", () => w());
      });
    }
    return m && g && (m.addEventListener("click", (x) => {
      x.stopPropagation(), d(S, b, !1), d(g, m, g.classList.contains("hidden"));
    }), M(g)), b && S && (b.addEventListener("click", (x) => {
      x.stopPropagation(), d(g, m, !1), d(S, b, S.classList.contains("hidden"));
    }), M(S)), document.addEventListener("click", R), document.addEventListener("keydown", j), () => {
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
        /* @__PURE__ */ s.jsxDEV(Xi, { to: "/dashboard", onClick: (m) => {
          m.preventDefault(), f("/dashboard");
        }, children: "Dashboard" }, void 0, !1, {
          fileName: "/app/code/client/components/SiteLayout.jsx",
          lineNumber: 77,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ s.jsxDEV(Xi, { to: "/orders", onClick: (m) => {
          m.preventDefault(), f("/orders");
        }, children: "Orders" }, void 0, !1, {
          fileName: "/app/code/client/components/SiteLayout.jsx",
          lineNumber: 78,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ s.jsxDEV(Xi, { to: "/riders", onClick: (m) => {
          m.preventDefault(), f("/riders");
        }, children: "Riders" }, void 0, !1, {
          fileName: "/app/code/client/components/SiteLayout.jsx",
          lineNumber: 79,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ s.jsxDEV(Xi, { to: "/reports", onClick: (m) => {
          m.preventDefault(), f("/reports");
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
            /* @__PURE__ */ s.jsxDEV(Xi, { className: "dropdown-item", to: "/settings", onClick: (m) => {
              m.preventDefault(), f("/settings");
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
  const [m, g] = y.useState(""), [b, S] = y.useState(""), [d, w] = y.useState(""), [R, j] = y.useState(!1), [M, x] = y.useState(""), [T, k] = y.useState(""), [ee, pe] = y.useState(!1), [le, oe] = y.useState(!1), [G, P] = y.useState(!1), [$, te] = y.useState(!1), F = "+92";
  function U(X) {
    const K = String(X || "").replace(/\D+/g, "");
    return K.length === 0 ? "" : K.startsWith("92") ? F + K.slice(2) : F + K;
  }
  U(d);
  async function re() {
    x(""), k(""), te(!0);
    const X = String(m), K = String(b).trim(), ie = String(d).trim(), Te = ie.replace(/\D+/g, ""), q = { fn: !K, cn: !ie, pw: !X };
    if (pe(q.fn), oe(q.cn || Te.length < 7), P(q.pw), q.fn || q.cn || q.pw) {
      x("Full name, mobile and password are required");
      return;
    }
    if (Te.length !== 10) {
      x("numbers should be 10 digit"), oe(!0);
      return;
    }
    if (X.length < 6) {
      P(!0), x("Password must be at least 6 characters");
      return;
    }
    j(!0);
    try {
      const be = U(ie), ye = await fetch("/api/mobile/register", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: X, fullName: K, contactNumber: be })
      }), Y = await ye.json().catch(() => null);
      if (!ye.ok) {
        const W = String(Y && (Y.error || Y.message) || ""), ce = W.toUpperCase();
        /MISSING\s*FULLNAME\/CONTACTNUMBER/i.test(W) || /MISSING\s*PASSWORD/i.test(W) ? (x("Full name, mobile and password are required"), pe(!K), oe(!ie || Te.length !== 10), P(!X)) : ce.includes("WEAK_PASSWORD") || /AT LEAST 6 CHARACTERS/i.test(W) ? (P(!0), x("Password must be at least 6 characters")) : /INVALID CONTACT NUMBER|MUST BE EXACTLY 10 DIGITS|NUMBERS SHOULD BE 10 DIGIT/i.test(W) ? (oe(!0), x("numbers should be 10 digit")) : /FIREBASE NOT CONFIGURED/i.test(W) ? x("Service temporarily unavailable. Please try again later.") : x(W || "Failed to create rider");
        return;
      }
      k("Rider created successfully"), f && f(), setTimeout(() => {
        o && o();
      }, 600);
    } catch (be) {
      const ye = String((be == null ? void 0 : be.message) || "");
      /Missing\s*(fullName\/contactNumber|password)/i.test(ye) ? x("Full name, mobile and password are required") : /WEAK_PASSWORD/i.test(ye) || /AT LEAST 6 CHARACTERS/i.test(ye) ? (P(!0), x("Password must be at least 6 characters")) : /INVALID CONTACT NUMBER|MUST BE EXACTLY 10 DIGITS|NUMBERS SHOULD BE 10 DIGIT/i.test(ye) ? (oe(!0), x("numbers should be 10 digit")) : x(ye || "Failed to create rider");
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
        /* @__PURE__ */ s.jsxDEV("input", { className: "field-input" + ($ && !String(b).trim() ? " input-error" : ""), value: b, onChange: (X) => {
          S(X.target.value), $ && pe(!String(X.target.value).trim());
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
        /* @__PURE__ */ s.jsxDEV("input", { className: "field-input" + ($ && !String(m) ? " input-error" : ""), type: "password", value: m, onChange: (X) => {
          g(X.target.value), $ && P(!String(X.target.value));
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
              className: "field-input phone-input-field" + ($ && String(d).trim().replace(/\D+/g, "").length !== 10 ? " input-error" : ""),
              type: "tel",
              inputMode: "tel",
              pattern: "[0-9]{10}",
              placeholder: "3001234567",
              value: d,
              onChange: (X) => {
                const K = X.target.value.replace(/\D+/g, "").slice(0, 10);
                w(K), $ && oe(K.length !== 10);
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
      M && /* @__PURE__ */ s.jsxDEV("div", { className: "auth-error", children: M }, void 0, !1, {
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
function V_({ rider: o, onClose: f, onUpdated: m }) {
  const g = y.useMemo(() => String((o == null ? void 0 : o.name) || (o == null ? void 0 : o.displayName) || ""), [o]), b = y.useMemo(() => {
    const te = String((o == null ? void 0 : o.contactNumber) || "").trim().replace(/\D+/g, "");
    return te.length >= 10 ? te.slice(-10) : te;
  }, [o]), [S, d] = y.useState(g), [w, R] = y.useState(b), [j, M] = y.useState(!1), [x, T] = y.useState(""), [k, ee] = y.useState(""), [pe, le] = y.useState(!1), oe = "+92";
  function G($) {
    const te = String($ || "").replace(/\D+/g, "");
    return te.length === 0 ? "" : te.startsWith("92") ? oe + te.slice(2) : oe + te;
  }
  yx.useEffect(() => {
    let $ = !0;
    return (async () => {
      try {
        const te = await fetch(`/api/riders/${encodeURIComponent(o.id)}`, { credentials: "include" });
        if (te.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        const F = await te.json().catch(() => null), U = F && (F.data || F) || {}, re = U.rider || U || {};
        if (!$) return;
        const X = String(re.displayName || re.name || "").trim(), K = String(re.contactNumber || "").replace(/\D+/g, "");
        X && d(X), K && R(K.slice(-10));
      } catch {
      }
    })(), () => {
      $ = !1;
    };
  }, [o == null ? void 0 : o.id]);
  async function P() {
    le(!0), T(""), ee("");
    const $ = String(S).trim(), F = String(w).trim().replace(/\D+/g, "");
    if (!$ && F.length === 0) {
      T("Enter a name or mobile");
      return;
    }
    if (F && F.length !== 10) {
      T("numbers should be 10 digit");
      return;
    }
    M(!0);
    try {
      const U = {};
      $ && (U.displayName = $), F && (U.contactNumber = G(F));
      const re = await fetch(`/api/riders/${encodeURIComponent(o.id)}`, {
        method: "PATCH",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(U)
      }), X = await re.json().catch(() => ({}));
      if (re.status === 401) {
        window.location.href = "/auth/login";
        return;
      }
      if (!re.ok) {
        T(String(X && (X.error || X.message) || "Failed to update rider"));
        return;
      }
      ee("Saved"), m && m(X.data && X.data.rider ? X.data.rider : null), setTimeout(() => {
        f && f();
      }, 450);
    } catch (U) {
      T(String((U == null ? void 0 : U.message) || "Failed to update rider"));
    } finally {
      M(!1);
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
        /* @__PURE__ */ s.jsxDEV("input", { className: "field-input", value: S, onChange: ($) => d($.target.value) }, void 0, !1, {
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
              onChange: ($) => {
                const te = $.target.value.replace(/\D+/g, "").slice(0, 10);
                R(te);
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
const Nd = "app.settings.fares", ya = {
  baseFare: 0,
  farePerKm: 2
};
function Vx() {
  if (typeof window > "u" || !window.localStorage)
    return { ...ya };
  try {
    const o = window.localStorage.getItem(Nd);
    if (!o)
      return { ...ya };
    const f = JSON.parse(o), m = Number(f == null ? void 0 : f.baseFare), g = Number(f == null ? void 0 : f.farePerKm);
    return {
      baseFare: Number.isFinite(m) ? m : ya.baseFare,
      farePerKm: Number.isFinite(g) ? g : ya.farePerKm
    };
  } catch {
    return { ...ya };
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
    const m = JSON.parse(f);
    if (m && typeof m == "object" && !Array.isArray(m))
      return m;
  } catch {
  }
  return {};
}
function L_(o) {
  if (!o || typeof o != "object") return;
  const f = Lx();
  if (!f) return;
  const m = Object.entries(o);
  if (m.length === 0) return;
  const g = A_();
  let b = !1;
  const S = { ...g };
  for (const [d, w] of m) {
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
      const f = o.seconds * 1e3 + (typeof o.nanoseconds == "number" ? Math.floor(o.nanoseconds / 1e6) : 0), m = new Date(f);
      if (Number.isFinite(m.getTime())) return m;
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
    const m = o[f], g = k_(m);
    if (g) return U_(g);
  }
  return "";
}
function P_(o, f) {
  if (!Array.isArray(o) || !f) return 0;
  let m = 0;
  for (const g of o)
    z_(g) === f && (m += 1);
  return m;
}
function H_() {
  const o = () => {
    const Y = /* @__PURE__ */ new Date(), W = new Date(Y.getFullYear(), Y.getMonth(), 1), ce = `${W.getFullYear()}-${String(W.getMonth() + 1).padStart(2, "0")}-${String(W.getDate()).padStart(2, "0")}`, Me = `${Y.getFullYear()}-${String(Y.getMonth() + 1).padStart(2, "0")}-${String(Y.getDate()).padStart(2, "0")}`;
    return { from: ce, to: Me };
  }, f = y.useMemo(() => o(), []), [m, g] = y.useState([]), [b, S] = y.useState(""), [d, w] = y.useState(!0), [R, j] = y.useState(""), [M, x] = y.useState(1), [T, k] = y.useState(20), [ee, pe] = y.useState({ total: 0, page: 1, limit: 20, pages: 1 }), [le, oe] = y.useState(!1), [G, P] = y.useState(null), [$, te] = y.useState(ya), [F, U] = y.useState(f.from), [re, X] = y.useState(f.to), [K, ie] = y.useState(/* @__PURE__ */ new Map());
  y.useEffect(() => {
    function Y() {
      te(Vx());
    }
    Y();
    function W(ce) {
      ce.key === Nd && Y();
    }
    return typeof window < "u" && (window.addEventListener("storage", W), window.addEventListener("fare-settings-changed", Y)), () => {
      typeof window < "u" && (window.removeEventListener("storage", W), window.removeEventListener("fare-settings-changed", Y));
    };
  }, []), y.useEffect(() => {
    let Y = !0;
    return (async () => {
      var W, ce, Me, Pe;
      w(!0), j("");
      try {
        const it = new URLSearchParams();
        b && it.set("q", b), it.set("page", String(M)), it.set("limit", String(T));
        const ze = await fetch(`/api/riders?${it.toString()}`, { credentials: "include" });
        if (ze.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!ze.ok) throw new Error("Failed to load riders");
        const Ze = await ze.json();
        Y && (g(Array.isArray(Ze.riders) ? Ze.riders : []), pe({ total: ((W = Ze.meta) == null ? void 0 : W.total) || 0, page: ((ce = Ze.meta) == null ? void 0 : ce.page) || 1, limit: ((Me = Ze.meta) == null ? void 0 : Me.limit) || T, pages: ((Pe = Ze.meta) == null ? void 0 : Pe.pages) || 1 }));
      } catch (it) {
        Y && j(it.message || "Failed to load riders");
      } finally {
        Y && w(!1);
      }
    })(), () => {
      Y = !1;
    };
  }, [b, M, T]), y.useEffect(() => {
    if (!F || !re || !m.length) {
      ie(/* @__PURE__ */ new Map());
      return;
    }
    const Y = new AbortController(), W = Y.signal;
    let ce = !1;
    const Me = (() => {
      const ze = typeof navigator < "u" && Number.isFinite(Number(navigator.hardwareConcurrency)) ? Number(navigator.hardwareConcurrency) : 8;
      return Math.max(2, Math.min(8, Math.floor(ze / 2)));
    })();
    ie(/* @__PURE__ */ new Map());
    const Pe = m.map((ze) => async () => {
      const Ze = `${ze.id}:${F}:${re}`;
      try {
        const st = await fetch(`/api/riders/${ze.id}/km-in-range?fromDate=${F}&toDate=${re}`, { credentials: "include", signal: W });
        if (st.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!st.ok) {
          const Ht = await st.text().catch(() => String(st.status));
          console.error(`km-in-range error for ${ze.id}:`, st.status, Ht);
          return;
        }
        const fn = await st.json();
        if (ce || W.aborted) return;
        ie((Ht) => {
          const Mt = new Map(Ht);
          return Mt.set(Ze, {
            km: fn.totalKm || 0,
            rideCount: fn.rideCount || 0,
            performancePct: fn.performancePct || 0
          }), Mt;
        });
      } catch (st) {
        if (st && st.name === "AbortError") return;
        console.error(`km-in-range fetch error for ${ze.id}:`, st);
      }
    });
    async function it(ze, Ze) {
      let st = 0;
      const fn = new Array(Math.min(Ze, ze.length)).fill(0).map(async () => {
        for (; !ce && !W.aborted; ) {
          const Ht = st++;
          if (Ht >= ze.length) break;
          await ze[Ht]();
        }
      });
      await Promise.all(fn);
    }
    return it(Pe, Me), () => {
      ce = !0, Y.abort();
    };
  }, [F, re, m]);
  const Te = y.useMemo(() => m.filter((Y) => {
    if (b && !String(Y.name || "").toLowerCase().includes(b.toLowerCase().trim())) return !1;
    if (F || re) {
      const W = Number(Y.lastActiveDays ?? 0), ce = F ? new Date(F) : null, Me = re ? new Date(re) : null;
      if (ce && Me) {
        const Pe = Math.floor((Date.now() - ce.getTime()) / 864e5), it = Math.floor((Date.now() - Me.getTime()) / (1e3 * 60 * 60 * 24));
        if (W < it || W > Pe) return !1;
      } else if (ce) {
        const Pe = Math.floor((Date.now() - ce.getTime()) / 864e5);
        if (W > Pe) return !1;
      } else if (Me) {
        const Pe = Math.floor((Date.now() - Me.getTime()) / 864e5);
        if (W < Pe) return !1;
      }
    }
    return !0;
  }), [m, b, F, re]), q = y.useMemo(() => {
    const Y = Number($.farePerKm);
    return Number.isFinite(Y) ? Y : ya.farePerKm;
  }, [$]), be = y.useMemo(() => {
    const Y = Number($.baseFare);
    return Number.isFinite(Y) ? Y : ya.baseFare;
  }, [$]);
  y.useEffect(() => {
    if (!Array.isArray(m) || m.length === 0) return;
    const Y = {};
    for (const W of m) {
      if (!W || W.id === void 0 || W.id === null) continue;
      const ce = Number(W.performancePct);
      Number.isFinite(ce) && (Y[W.id] = Math.round(ce));
    }
    Object.keys(Y).length !== 0 && L_(Y);
  }, [m]);
  const ye = y.useMemo(() => {
    const Y = /* @__PURE__ */ new Date(), W = [], ce = [];
    for (let Me = 2; Me >= 0; Me--) {
      const Pe = new Date(Y.getFullYear(), Y.getMonth() - Me, 1), it = `${Pe.getFullYear()}-${String(Pe.getMonth() + 1).padStart(2, "0")}`, ze = Pe.toLocaleString(void 0, { month: "short", year: "numeric" });
      W.push(it), ce.push(ze);
    }
    return { keys: W, labels: ce };
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
        /* @__PURE__ */ s.jsxDEV("input", { type: "date", className: "date-range-input", value: F, onChange: (Y) => {
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
        /* @__PURE__ */ s.jsxDEV("input", { type: "date", className: "date-range-input", value: re, onChange: (Y) => {
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
      le && /* @__PURE__ */ s.jsxDEV(M_, { onClose: () => oe(!1), onCreated: () => {
        window.location.reload();
      } }, void 0, !1, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 289,
        columnNumber: 13
      }, this),
      G && /* @__PURE__ */ s.jsxDEV(
        V_,
        {
          rider: G,
          onClose: () => P(null),
          onUpdated: (Y) => {
            if (!Y) {
              P(null);
              return;
            }
            g((W) => W.map((ce) => String(ce.id) === String(Y.id) ? { ...ce, name: Y.displayName || Y.name || ce.name, contactNumber: Y.contactNumber ?? ce.contactNumber } : ce)), P(null);
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
          /* @__PURE__ */ s.jsxDEV("th", { className: "col-month", children: "Range" }, ye.keys[ye.keys.length - 1], !1, {
            fileName: "/app/code/client/pages/Riders.jsx",
            lineNumber: 306,
            columnNumber: 17
          }, this),
          /* @__PURE__ */ s.jsxDEV("th", { className: "col-earnings", children: (() => {
            const Y = ye.keys[ye.keys.length - 2], W = String(Y).split("-"), ce = parseInt(W[0], 10), Me = parseInt(W[1], 10);
            return `Earnings (${new Date(Number.isFinite(ce) ? ce : (/* @__PURE__ */ new Date()).getFullYear(), Number.isFinite(Me) ? Me - 1 : (/* @__PURE__ */ new Date()).getMonth() - 1, 1).toLocaleString(void 0, { month: "short" })}, Rs)`;
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
          !d && !R && Te.map((Y) => /* @__PURE__ */ s.jsxDEV("tr", { "data-rider-id": Y.id, "data-status": Y.status, "data-last-days": Y.lastActiveDays, children: [
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
              var W;
              if (F && re) {
                const ce = `${Y.id}:${F}:${re}`, Me = K.get(ce);
                if (!Me) return /* @__PURE__ */ s.jsxDEV("span", { className: "cell-loader loader-sm", "aria-busy": "true", "aria-label": "Loading range" }, void 0, !1, {
                  fileName: "/app/code/client/pages/Riders.jsx",
                  lineNumber: 327,
                  columnNumber: 42
                }, this);
                const Pe = (Me == null ? void 0 : Me.km) ?? 0;
                return `${Number(Pe).toFixed(2)} km`;
              }
              return `${Number(((W = Y.monthlyCounts) == null ? void 0 : W[ye.keys[ye.keys.length - 1]]) || 0).toFixed(2)} km`;
            })() }, void 0, !1, {
              fileName: "/app/code/client/pages/Riders.jsx",
              lineNumber: 323,
              columnNumber: 19
            }, this),
            (() => {
              var Pe, it;
              if (F && re) {
                const ze = `${Y.id}:${F}:${re}`;
                if (!K.get(ze)) return /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-earnings", children: /* @__PURE__ */ s.jsxDEV("span", { className: "cell-loader loader-md", "aria-busy": "true", "aria-label": "Loading earnings" }, void 0, !1, {
                  fileName: "/app/code/client/pages/Riders.jsx",
                  lineNumber: 337,
                  columnNumber: 74
                }, this) }, void 0, !1, {
                  fileName: "/app/code/client/pages/Riders.jsx",
                  lineNumber: 337,
                  columnNumber: 42
                }, this);
              }
              let W = 0, ce = 0;
              if (F && re) {
                const ze = `${Y.id}:${F}:${re}`, Ze = K.get(ze);
                W = (Ze == null ? void 0 : Ze.km) ?? 0, ce = (Ze == null ? void 0 : Ze.rideCount) ?? 0;
              } else {
                const ze = ye.keys[ye.keys.length - 2];
                W = Number(((Pe = Y.monthlyCounts) == null ? void 0 : Pe[ze]) || 0);
                const Ze = Array.isArray(Y.orders) ? Y.orders : [];
                ce = Number(((it = Y.monthlyRideCounts) == null ? void 0 : it[ze]) ?? P_(Ze, ze) ?? 0);
              }
              const Me = W * q + ce * be;
              return /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-earnings", children: Number.isFinite(Me) ? `${Me.toFixed(2)} Rs.` : "0 Rs." }, void 0, !1, {
                fileName: "/app/code/client/pages/Riders.jsx",
                lineNumber: 356,
                columnNumber: 29
              }, this);
            })(),
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-performance", children: (() => {
              if (F && re) {
                const W = `${Y.id}:${F}:${re}`, ce = K.get(W);
                if (!ce) return /* @__PURE__ */ s.jsxDEV("span", { className: "cell-loader loader-sm", "aria-busy": "true", "aria-label": "Loading performance" }, void 0, !1, {
                  fileName: "/app/code/client/pages/Riders.jsx",
                  lineNumber: 362,
                  columnNumber: 42
                }, this);
                const Me = (ce == null ? void 0 : ce.performancePct) ?? 0;
                return `${Number(Me)}%`;
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
                    const ce = await fetch(`/api/riders/${encodeURIComponent(Y.id)}`, { method: "DELETE", credentials: "include" });
                    if (ce.status === 401) {
                      window.location.href = "/auth/login";
                      return;
                    }
                    if (!ce.ok) {
                      const Me = await ce.text().catch(() => "");
                      alert(Me || "Failed to delete");
                      return;
                    }
                    g((Me) => Me.filter((Pe) => String(Pe.id) !== String(Y.id))), pe((Me) => ({ ...Me, total: Math.max(0, (Me.total || 1) - 1) }));
                  } catch (ce) {
                    alert(String((ce == null ? void 0 : ce.message) || "Failed to delete"));
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
          !d && !R && Te.length === 0 && /* @__PURE__ */ s.jsxDEV("tr", { children: /* @__PURE__ */ s.jsxDEV("td", { colSpan: 7, className: "section-note", children: "No riders found." }, void 0, !1, {
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
      /* @__PURE__ */ s.jsxDEV("button", { className: "rc-select rc-chip", disabled: ee.page <= 1 || d, onClick: () => x((Y) => Math.max(1, Y - 1)), children: "Prev" }, void 0, !1, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 400,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ s.jsxDEV("span", { className: "section-note", children: [
        "Page ",
        ee.page,
        " of ",
        ee.pages,
        " • ",
        ee.total,
        " total"
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 401,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ s.jsxDEV("button", { className: "rc-select rc-chip", disabled: ee.page >= ee.pages || d, onClick: () => x((Y) => Math.min(ee.pages, Y + 1)), children: "Next" }, void 0, !1, {
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
      const m = f * 1e3;
      return new Date(m);
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
    let m = f;
    const g = m.match(/^(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2})\.(\d+)(.*)$/);
    g && g[2].length > 3 && (m = `${g[1]}.${g[2].slice(0, 3)}${g[3]}`);
    const b = Date.parse(m);
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
    const m = Number(f);
    return Number.isFinite(m) ? m : null;
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
  var m, g, b, S, d, w;
  if (!Ba(o)) return null;
  const f = [
    o.durationMins,
    o.duration_minutes,
    o.deliveryDuration,
    o.delivery_duration,
    o.actualDuration,
    o.actual_duration,
    o.actualDurationMinutes,
    (m = o.orders) == null ? void 0 : m.deliveryDuration,
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
  var m, g, b, S;
  if (!Ba(o)) return null;
  const f = [
    o.deliveredAt,
    o.actual_delivery_time,
    o.actualDeliveryTime,
    o.deliveryEndTime,
    o.delivery_end_time,
    (m = o.orders) == null ? void 0 : m.deliveredAt,
    (g = o.orders) == null ? void 0 : g.actual_delivery_time,
    (b = o.orders) == null ? void 0 : b.actualDeliveryTime,
    (S = o.orders) == null ? void 0 : S.deliveryEndTime
  ];
  for (const d of f)
    if (d != null) return d;
  return null;
}
function kx(o) {
  var m, g, b, S, d, w;
  if (!Ba(o)) return null;
  const f = [
    o.deliveryStartTime,
    o.delivery_start_time,
    o.start_time,
    o.startTime,
    o.started_at,
    o.startedAt,
    (m = o.orders) == null ? void 0 : m.deliveryStartTime,
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
  const m = ui($_(o)), g = ui(kx(o));
  if (m instanceof Date && g instanceof Date) {
    const b = m.getTime() - g.getTime();
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
    const m = Number(o.minutes);
    if (Number.isFinite(m)) return `${m} min`;
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
    const m = o.trim();
    if (!m) return "-";
    const g = m.match(Fh);
    return g ? `${g[1].replace(/\.0+$/, "").replace(/(\.\d*[1-9])0+$/, "$1")} min` : m;
  }
  if (Ba(o) && o.expectedMinutes !== void 0) {
    const m = Number(o.expectedMinutes);
    if (Number.isFinite(m)) return `${m} min`;
  }
  return String(o);
}
function Px(o) {
  var g, b, S, d, w, R, j, M;
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
    (M = o.expected_delivery) == null ? void 0 : M.minutes,
    o.expected_time,
    o.expectedTime,
    o.expectedMinutes
  ];
  for (const x of f)
    if (x != null && !(typeof x == "string" && !x.trim()))
      return x;
  const m = o.delivery_events || o.deliveryEvents || o.events || null;
  if (Array.isArray(m))
    for (let x = m.length - 1; x >= 0; x -= 1) {
      const T = m[x];
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
  const m = Math.round(f);
  if (m < 60) return `${m} min`;
  const g = Math.floor(m / 60), b = m % 60;
  return `${g}h ${b}m`;
}
function Y_() {
  var x;
  const { id: o } = Uw(), [f, m] = y.useState(null), [g, b] = y.useState(!0), [S, d] = y.useState("");
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
        const ee = await k.json();
        T && m(ee);
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
  const { rider: w, metrics: R, history: j } = f, M = Number.isFinite(Number(R == null ? void 0 : R.onTimeRate)) ? Math.round(Number(R.onTimeRate)) : 0;
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
          M,
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
          const ee = T.name || T.orderId, pe = ui(T.created_at), le = pe instanceof Date && !Number.isNaN(pe.getTime()) ? pe.toISOString().slice(0, 10) : "-", oe = Fx(T.deliveryStartTime), G = Px(T), P = zx(G), $ = Ux(T), te = Hx($), F = Number(T.distance_km), U = Number.isFinite(F) ? `${F.toFixed(2)} km` : typeof T.distance_km == "string" && T.distance_km.trim() ? T.distance_km : "-";
          return /* @__PURE__ */ s.jsxDEV("tr", { children: [
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-name order-cell", children: ee }, void 0, !1, {
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
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-actual actual-time-cell", children: te }, void 0, !1, {
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
function Bx({ orderId: o, onClose: f, onAssigned: m }) {
  const [g, b] = y.useState([]), [S, d] = y.useState([]), [w, R] = y.useState(""), [j, M] = y.useState(""), [x, T] = y.useState(""), [k, ee] = y.useState(""), [pe, le] = y.useState(!0), [oe, G] = y.useState(!0), [P, $] = y.useState(""), [te, F] = y.useState(""), [U, re] = y.useState(!1);
  y.useEffect(() => {
    let q = !0;
    return (async () => {
      le(!0), $("");
      try {
        const be = await fetch("/api/riders?limit=200", { credentials: "include" });
        if (be.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!be.ok) throw new Error("Failed to load riders");
        const ye = await be.json();
        q && b(Array.isArray(ye.riders) ? ye.riders : []);
      } catch (be) {
        q && $(be.message || "Failed to load riders");
      } finally {
        q && le(!1);
      }
    })(), () => {
      q = !1;
    };
  }, []), y.useEffect(() => {
    let q = !0;
    return (async () => {
      G(!0), F("");
      try {
        const be = await fetch("/api/packers?limit=200", { credentials: "include" });
        if (be.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!be.ok) throw new Error("Failed to load packers");
        const ye = await be.json();
        q && d(Array.isArray(ye.packers) ? ye.packers : []);
      } catch (be) {
        q && F(be.message || "Failed to load packers");
      } finally {
        q && G(!1);
      }
    })(), () => {
      q = !1;
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
    if (!k.trim()) {
      alert("Please enter an amount");
      return;
    }
    re(!0);
    try {
      const q = await fetch(`/api/orders/${encodeURIComponent(o)}/assign`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ riderId: w, paymentMethod: x.trim(), amount: k.trim() })
      });
      if (q.status === 401) {
        window.location.href = "/auth/login";
        return;
      }
      const be = await q.json().catch(() => null);
      if (!q.ok) throw new Error(be && be.error ? be.error : "Assign failed");
      const ye = await fetch(`/api/orders/${encodeURIComponent(o)}/assign-packer`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packerId: j, paymentMethod: x.trim(), amount: k.trim() })
      });
      if (ye.status === 401) {
        window.location.href = "/auth/login";
        return;
      }
      const Y = await ye.json().catch(() => null);
      if (!ye.ok) throw new Error(Y && Y.error ? Y.error : "Assign failed");
      m && m({ orderId: o, riderId: w, packerId: j, paymentMethod: x.trim(), amount: k.trim() });
      try {
        window && typeof window.showToast == "function" && window.showToast("Order assigned successfully", { type: "success" });
      } catch {
      }
      f();
    } catch (q) {
      alert(q.message || "Failed to assign");
    } finally {
      re(!1);
    }
  }
  const K = P || "", ie = te || "", Te = pe || oe;
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
    /* @__PURE__ */ s.jsxDEV("div", { className: "assign-modal-body", children: Te ? /* @__PURE__ */ s.jsxDEV("div", { className: "section-note", children: "Loading…" }, void 0, !1, {
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
                onChange: (q) => R(q.target.value),
                disabled: U,
                children: [
                  /* @__PURE__ */ s.jsxDEV("option", { value: "", children: "-- Choose a rider --" }, void 0, !1, {
                    fileName: "/app/code/client/components/AssignModal.jsx",
                    lineNumber: 118,
                    columnNumber: 23
                  }, this),
                  [...g].sort((q, be) => q.name.localeCompare(be.name)).map((q) => /* @__PURE__ */ s.jsxDEV("option", { value: q.id, children: q.name }, q.id, !1, {
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
          K && /* @__PURE__ */ s.jsxDEV("div", { className: "auth-error", children: K }, void 0, !1, {
            fileName: "/app/code/client/components/AssignModal.jsx",
            lineNumber: 124,
            columnNumber: 34
          }, this),
          g.length === 0 && !K && /* @__PURE__ */ s.jsxDEV("div", { className: "section-note", children: "No riders available" }, void 0, !1, {
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
                onChange: (q) => M(q.target.value),
                disabled: U,
                children: [
                  /* @__PURE__ */ s.jsxDEV("option", { value: "", children: "-- Choose a packer --" }, void 0, !1, {
                    fileName: "/app/code/client/components/AssignModal.jsx",
                    lineNumber: 136,
                    columnNumber: 23
                  }, this),
                  [...S].sort((q, be) => q.name.localeCompare(be.name)).map((q) => /* @__PURE__ */ s.jsxDEV("option", { value: q.id, children: q.name }, q.id, !1, {
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
          ie && /* @__PURE__ */ s.jsxDEV("div", { className: "auth-error", children: ie }, void 0, !1, {
            fileName: "/app/code/client/components/AssignModal.jsx",
            lineNumber: 142,
            columnNumber: 35
          }, this),
          S.length === 0 && !ie && /* @__PURE__ */ s.jsxDEV("div", { className: "section-note", children: "No packers available" }, void 0, !1, {
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
              onChange: (q) => T(q.target.value),
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
              onChange: (q) => ee(q.target.value),
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
function q_({ order: o, onClose: f, onUpdated: m }) {
  const [g, b] = y.useState([]), [S, d] = y.useState([]), [w, R] = y.useState(""), [j, M] = y.useState(""), [x, T] = y.useState(""), [k, ee] = y.useState(""), [pe, le] = y.useState(!0), [oe, G] = y.useState(""), [P, $] = y.useState(!1);
  y.useEffect(() => {
    let F = !0;
    return (async () => {
      var U;
      le(!0), G("");
      try {
        const re = await fetch("/api/riders?limit=200", { credentials: "include" });
        if (re.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!re.ok) throw new Error("Failed to load riders");
        const X = await re.json();
        if (F) {
          b(Array.isArray(X.riders) ? X.riders : []);
          const K = ((U = o.assignment) == null ? void 0 : U.riderId) || o.riderId || o.rider_id || "";
          R(String(K));
        }
      } catch (re) {
        F && G(re.message || "Failed to load riders");
      } finally {
        F && le(!1);
      }
    })(), () => {
      F = !1;
    };
  }, [o]), y.useEffect(() => {
    let F = !0;
    return (async () => {
      var U;
      try {
        const re = await fetch("/api/packers?limit=200", { credentials: "include" });
        if (re.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!re.ok) throw new Error("Failed to load packers");
        const X = await re.json();
        if (F) {
          d(Array.isArray(X.packers) ? X.packers : []);
          const K = ((U = o.assignment) == null ? void 0 : U.packerId) || o.packed_by || o.packer_id || "";
          M(String(K));
        }
      } catch (re) {
        F && G(re.message || "Failed to load packers");
      }
    })(), () => {
      F = !1;
    };
  }, [o]), y.useEffect(() => {
    var re, X;
    const F = ((re = o.assignment) == null ? void 0 : re.paymentMethod) || o.paymentMethod || "", U = ((X = o.assignment) == null ? void 0 : X.amount) || o.amount || "";
    T(String(F)), ee(String(U));
  }, [o]);
  async function te() {
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
    $(!0);
    try {
      const F = o.name || o.order_number || o.id, U = await fetch(`/api/orders/${encodeURIComponent(F)}/assign`, {
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
      const X = await fetch(`/api/orders/${encodeURIComponent(F)}/assign-packer`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packerId: j, paymentMethod: x.trim(), amount: k.trim() })
      });
      if (X.status === 401) {
        window.location.href = "/auth/login";
        return;
      }
      const K = await X.json().catch(() => null);
      if (!X.ok) throw new Error(K && K.error ? K.error : "Update failed");
      try {
        window && typeof window.showToast == "function" && window.showToast("Order updated successfully", { type: "success" });
      } catch {
      }
      m && m(), f();
    } catch (F) {
      alert(F.message || "Failed to update order");
    } finally {
      $(!1);
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
                onChange: (F) => R(F.target.value),
                disabled: P,
                children: [
                  /* @__PURE__ */ s.jsxDEV("option", { value: "", children: "-- Choose a rider --" }, void 0, !1, {
                    fileName: "/app/code/client/components/EditOrderModal.jsx",
                    lineNumber: 126,
                    columnNumber: 23
                  }, this),
                  [...g].sort((F, U) => F.name.localeCompare(U.name)).map((F) => /* @__PURE__ */ s.jsxDEV("option", { value: F.id, children: F.name }, F.id, !1, {
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
                onChange: (F) => M(F.target.value),
                disabled: P,
                children: [
                  /* @__PURE__ */ s.jsxDEV("option", { value: "", children: "-- Choose a packer --" }, void 0, !1, {
                    fileName: "/app/code/client/components/EditOrderModal.jsx",
                    lineNumber: 143,
                    columnNumber: 23
                  }, this),
                  [...S].sort((F, U) => F.name.localeCompare(U.name)).map((F) => /* @__PURE__ */ s.jsxDEV("option", { value: F.id, children: F.name }, F.id, !1, {
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
              onChange: (F) => T(F.target.value),
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
              onChange: (F) => ee(F.target.value),
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
        /* @__PURE__ */ s.jsxDEV("button", { className: "btn-primary", onClick: te, disabled: P || !w || !j, children: P ? "Updating…" : "Update" }, void 0, !1, {
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
  const m = (o == null ? void 0 : o.image) || null;
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
    /* @__PURE__ */ s.jsxDEV("div", { className: "image-modal-body", children: m ? /* @__PURE__ */ s.jsxDEV("img", { src: m, alt: "Order delivery proof", className: "image-modal-img" }, void 0, !1, {
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
function mx(o) {
  return zh($x(o));
}
const W_ = [
  { key: "all", label: "All" },
  { key: "new", label: "New" },
  { key: "assigned", label: "Assigned" },
  { key: "pending", label: "Pending" },
  { key: "in-progress", label: "In-Progress" },
  { key: "completed", label: "delivered" }
], hx = {
  completed: "delivered",
  "in-progress": "in_progress",
  "in-transit": "in_progress"
};
function K_() {
  const [o, f] = y.useState([]), [m, g] = y.useState(""), [b, S] = y.useState("all"), [d, w] = y.useState(1), [R, j] = y.useState(20), [M, x] = y.useState({ total: 0, page: 1, limit: 20, pages: 1 }), [T, k] = y.useState(!0), [ee, pe] = y.useState(""), [le, oe] = y.useState(""), [G, P] = y.useState(!0), [$, te] = y.useState(0), [F, U] = y.useState(!1), [re, X] = y.useState(null), [K, ie] = y.useState(!1), [Te, q] = y.useState(null), [be, ye] = y.useState(!1), [Y, W] = y.useState(null), [ce, Me] = y.useState(""), [Pe, it] = y.useState("");
  y.useEffect(() => {
    let J = !0;
    return (async () => {
      var Ge, ut, vt, ht;
      k(!0), pe(""), oe("");
      try {
        const lt = new URLSearchParams();
        if (m && lt.set("q", m), b && b !== "all") {
          const Ln = hx[b] || b;
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
        J && (f(Array.isArray(Ft.orders) ? Ft.orders : []), oe(Ft.shopifyError || ""), P(!!Ft.shopifyConfigured), x({ total: ((Ge = Ft.meta) == null ? void 0 : Ge.total) || 0, page: ((ut = Ft.meta) == null ? void 0 : ut.page) || 1, limit: ((vt = Ft.meta) == null ? void 0 : vt.limit) || R, pages: ((ht = Ft.meta) == null ? void 0 : ht.pages) || 1 }));
      } catch (lt) {
        J && pe(lt.message || "Failed to load orders");
      } finally {
        J && k(!1);
      }
    })(), () => {
      J = !1;
    };
  }, [m, b, d, R, $]);
  async function ze() {
    try {
      const J = new URLSearchParams();
      ce && J.set("from", ce), Pe && J.set("to", Pe), m && J.set("q", m), b && b !== "all" && J.set("status", b);
      const Ge = await fetch(`/api/orders/export?${J.toString()}`, { credentials: "include" });
      if (Ge.status === 401) {
        window.location.href = "/auth/login";
        return;
      }
      if (!Ge.ok) throw new Error("Failed to generate export");
      const ut = await Ge.blob(), vt = URL.createObjectURL(ut), ht = document.createElement("a");
      ht.href = vt, ht.download = `orders_${ce || "all"}_${Pe || "all"}.csv`, document.body.appendChild(ht), ht.click(), ht.remove(), URL.revokeObjectURL(vt);
    } catch (J) {
      try {
        window && typeof window.showToast == "function" && window.showToast(J.message || "Failed to download CSV", { type: "error" });
      } catch {
      }
    }
  }
  y.useMemo(() => o, [o]);
  const Ze = y.useMemo(() => {
    if (!Array.isArray(o)) return [];
    if (b === "all") return o.slice();
    const J = zh(hx[b] || b);
    return o.filter((Ge) => mx(Ge) === J);
  }, [o, b]);
  function st() {
    X(null), U(!1);
  }
  function fn(J) {
    q(J), ie(!0);
  }
  function Ht() {
    q(null), ie(!1);
  }
  function Mt(J) {
    W(J), ye(!0);
  }
  function An() {
    W(null), ye(!1);
  }
  function qt(J) {
    try {
      const { orderId: Ge } = J || {};
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
  async function Gt(J) {
    if (J)
      try {
        const Ge = await fetch(`/api/orders/${encodeURIComponent(J)}/unassign`, {
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
          window && typeof window.showToast == "function" && window.showToast(`Order unassigned: ${J}`, { type: "success" });
        } catch {
        }
        w(1), te((ut) => ut + 1);
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
          /* @__PURE__ */ s.jsxDEV("input", { "aria-label": "From date", className: "date-input", type: "date", value: ce, onChange: (J) => Me(J.target.value) }, void 0, !1, {
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
          /* @__PURE__ */ s.jsxDEV("input", { "aria-label": "To date", className: "date-input", type: "date", value: Pe, onChange: (J) => it(J.target.value) }, void 0, !1, {
            fileName: "/app/code/client/pages/Orders.jsx",
            lineNumber: 181,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 179,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ s.jsxDEV("button", { className: "rc-select rc-chip download-csv-btn", onClick: ze, children: "Download CSV" }, void 0, !1, {
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
        /* @__PURE__ */ s.jsxDEV("input", { className: "rc-search-input", type: "search", placeholder: "Search", value: m, onChange: (J) => {
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
      /* @__PURE__ */ s.jsxDEV("div", { className: "rc-filters", children: W_.map(({ key: J, label: Ge }) => /* @__PURE__ */ s.jsxDEV("button", { className: `rc-select rc-chip${b === J ? " active" : ""}`, onClick: () => {
        S(J), w(1);
      }, "data-filter": J, children: Ge }, J, !1, {
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
    !G && /* @__PURE__ */ s.jsxDEV("div", { className: "section-note", children: "Shopify is not configured. Set SHOPIFY_SHOP and SHOPIFY_ADMIN_TOKEN to enable orders sync." }, void 0, !1, {
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
        !T && ee && /* @__PURE__ */ s.jsxDEV("tr", { children: /* @__PURE__ */ s.jsxDEV("td", { colSpan: 12, className: "auth-error", children: ee }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 229,
          columnNumber: 21
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 229,
          columnNumber: 17
        }, this),
        !T && !ee && Ze.map((J, Ge) => {
          var hn, xa, sa;
          const ut = $x(J), vt = mx(J), ht = J.full_name || (J.customer && J.customer.full_name ? J.customer.full_name : "");
          let lt = "-";
          typeof J.shipping_address == "string" && String(J.shipping_address).trim() ? lt = String(J.shipping_address).trim() : J.shipping_address && typeof J.shipping_address == "object" ? lt = [J.shipping_address.address1 || "", J.shipping_address.city || "", J.shipping_address.province || "", J.shipping_address.country || ""].map((se) => String(se || "").trim()).filter(Boolean).join(", ") || "-" : typeof J.billing_address == "string" && String(J.billing_address).trim() ? lt = String(J.billing_address).trim() : J.billing_address && typeof J.billing_address == "object" && (lt = [J.billing_address.address1 || "", J.billing_address.city || "", J.billing_address.province || "", J.billing_address.country || ""].map((se) => String(se || "").trim()).filter(Boolean).join(", ") || "-");
          const Ut = J.name || J.order_number || J.id, Ft = Ut != null ? String(Ut).replace(/^#+/, "").trim() : "", Ln = Ft || "-", Dn = I_(J), ln = Fx(Dn), Wt = Px(J), pn = zx(Wt), oa = Ux(J), zt = Hx(oa), mn = J.rider ? String(J.rider) : (hn = J.assignment) != null && hn.riderId ? String(J.assignment.riderId) : "Unassigned";
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
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-rider rider-cell", children: mn }, void 0, !1, {
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
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-expected expected-cell", children: pn }, void 0, !1, {
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
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-payment payment-cell", children: J.paymentMethod || ((sa = J.assignment) == null ? void 0 : sa.paymentMethod) || "-" }, void 0, !1, {
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
          ] }, Ut || Ge, !0, {
            fileName: "/app/code/client/pages/Orders.jsx",
            lineNumber: 259,
            columnNumber: 19
          }, this);
        }),
        !T && !ee && Ze.length === 0 && /* @__PURE__ */ s.jsxDEV("tr", { children: /* @__PURE__ */ s.jsxDEV("td", { colSpan: 12, className: "section-note", children: "No orders to display." }, void 0, !1, {
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
      F && re && /* @__PURE__ */ s.jsxDEV(Bx, { orderId: re, onClose: st, onAssigned: qt }, void 0, !1, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 315,
        columnNumber: 11
      }, this),
      K && Te && /* @__PURE__ */ s.jsxDEV(q_, { order: Te, onClose: Ht, onUpdated: () => {
        te((J) => J + 1), Ht();
      } }, void 0, !1, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 318,
        columnNumber: 11
      }, this),
      be && Y && /* @__PURE__ */ s.jsxDEV(G_, { order: Y, onClose: An }, void 0, !1, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 321,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ s.jsxDEV("div", { className: "rc-filters", children: [
        /* @__PURE__ */ s.jsxDEV("button", { className: "rc-select rc-chip", disabled: M.page <= 1 || T, onClick: () => w((J) => Math.max(1, J - 1)), children: "Prev" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 324,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ s.jsxDEV("span", { className: "section-note", children: [
          "Page ",
          M.page,
          " of ",
          M.pages,
          " • ",
          M.total,
          " total"
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 325,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ s.jsxDEV("button", { className: "rc-select rc-chip", disabled: M.page >= M.pages || T, onClick: () => w((J) => Math.min(M.pages, J + 1)), children: "Next" }, void 0, !1, {
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
  const [o, f] = y.useState({ totalDeliveries: 0, avgDeliveryMins: 0 }), [m, g] = y.useState([]), [b, S] = y.useState(!1), [d, w] = y.useState(!0), [R, j] = y.useState("");
  return y.useEffect(() => {
    let M = !0;
    return (async () => {
      w(!0), j("");
      try {
        const x = await fetch("/api/reports", { credentials: "include" });
        if (x.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!x.ok) throw new Error("Failed to load reports");
        const T = await x.json();
        M && (f(T.metrics || { totalDeliveries: 0, avgDeliveryMins: 0 }), g(Array.isArray(T.deliveries) ? T.deliveries : []));
      } catch (x) {
        M && j(x.message || "Failed to load reports");
      } finally {
        M && w(!1);
      }
    })(), () => {
      M = !1;
    };
  }, []), /* @__PURE__ */ s.jsxDEV(Mr, { children: /* @__PURE__ */ s.jsxDEV("section", { className: "rider-commissions", children: [
    /* @__PURE__ */ s.jsxDEV("header", { className: "rc-header", children: /* @__PURE__ */ s.jsxDEV("h2", { className: "rc-title", children: "Reporting & Analytics" }, void 0, !1, {
      fileName: "/app/code/client/pages/Reports.jsx",
      lineNumber: 34,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/pages/Reports.jsx",
      lineNumber: 33,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ s.jsxDEV("div", { className: "rc-toolbar", children: /* @__PURE__ */ s.jsxDEV("div", { className: "rc-filters", children: [
      /* @__PURE__ */ s.jsxDEV("button", { className: "rc-select rc-chip", "data-tab": "overview", children: "Overview" }, void 0, !1, {
        fileName: "/app/code/client/pages/Reports.jsx",
        lineNumber: 39,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ s.jsxDEV("button", { className: "rc-select rc-chip", "data-tab": "performance", children: "Performance" }, void 0, !1, {
        fileName: "/app/code/client/pages/Reports.jsx",
        lineNumber: 40,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ s.jsxDEV("button", { className: "rc-select rc-chip", "data-tab": "custom", children: "Custom Reports" }, void 0, !1, {
        fileName: "/app/code/client/pages/Reports.jsx",
        lineNumber: 41,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Reports.jsx",
      lineNumber: 38,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/pages/Reports.jsx",
      lineNumber: 37,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ s.jsxDEV("div", { id: "tab-overview", children: [
      /* @__PURE__ */ s.jsxDEV("div", { className: "rc-table-wrapper reports-overview", children: [
        /* @__PURE__ */ s.jsxDEV("div", { className: "rc-select rc-chip block-chip", children: [
          /* @__PURE__ */ s.jsxDEV("div", { className: "section-title reports-stat-title", children: "Total Deliveries" }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 48,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ s.jsxDEV("div", { className: "reports-stat-value", children: o.totalDeliveries }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 49,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Reports.jsx",
          lineNumber: 47,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ s.jsxDEV("div", { className: "rc-select rc-chip block-chip", children: [
          /* @__PURE__ */ s.jsxDEV("div", { className: "section-title reports-stat-title", children: "Average Delivery Time" }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 52,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ s.jsxDEV("div", { className: "reports-stat-value", children: [
            o.avgDeliveryMins,
            " mins"
          ] }, void 0, !0, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 53,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Reports.jsx",
          lineNumber: 51,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Reports.jsx",
        lineNumber: 46,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ s.jsxDEV("div", { className: "rc-toolbar reports-toolbar-center", children: [
        /* @__PURE__ */ s.jsxDEV("div", { className: "section-title reports-stat-title", children: "Delivery Data" }, void 0, !1, {
          fileName: "/app/code/client/pages/Reports.jsx",
          lineNumber: 58,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ s.jsxDEV("label", { className: "rc-select rc-chip toggle-data-label", children: [
          /* @__PURE__ */ s.jsxDEV("input", { type: "checkbox", checked: b, onChange: (M) => S(M.target.checked) }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 60,
            columnNumber: 15
          }, this),
          " Show Delivery Data Table"
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Reports.jsx",
          lineNumber: 59,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Reports.jsx",
        lineNumber: 57,
        columnNumber: 11
      }, this),
      b && /* @__PURE__ */ s.jsxDEV("div", { className: "rc-table-wrapper", children: /* @__PURE__ */ s.jsxDEV("table", { className: "rc-table", children: [
        /* @__PURE__ */ s.jsxDEV("thead", { children: /* @__PURE__ */ s.jsxDEV("tr", { children: [
          /* @__PURE__ */ s.jsxDEV("th", { className: "col-name", children: "Order Number" }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 69,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ s.jsxDEV("th", { className: "col-km", children: "Rider Assigned" }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 70,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ s.jsxDEV("th", { className: "col-perf", children: "Expected Time" }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 71,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ s.jsxDEV("th", { className: "col-perf", children: "Actual Delivery Time" }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 72,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ s.jsxDEV("th", { className: "col-perf", children: "Distance Traveled" }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 73,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ s.jsxDEV("th", { className: "col-comm", children: "Status" }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 74,
            columnNumber: 21
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Reports.jsx",
          lineNumber: 68,
          columnNumber: 19
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Reports.jsx",
          lineNumber: 67,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ s.jsxDEV("tbody", { children: [
          !d && !R && m.map((M, x) => /* @__PURE__ */ s.jsxDEV("tr", { children: [
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-name", children: [
              "#",
              M.orderNumber || M.orderId
            ] }, void 0, !0, {
              fileName: "/app/code/client/pages/Reports.jsx",
              lineNumber: 80,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-km", children: M.riderId || "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Reports.jsx",
              lineNumber: 81,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-perf", children: M.expectedMinutes != null ? `${M.expectedMinutes} mins` : "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Reports.jsx",
              lineNumber: 82,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-perf", children: M.durationMins != null ? `${M.durationMins} mins` : "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Reports.jsx",
              lineNumber: 83,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-perf", children: "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Reports.jsx",
              lineNumber: 84,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-commission", children: M.status || "new" }, void 0, !1, {
              fileName: "/app/code/client/pages/Reports.jsx",
              lineNumber: 85,
              columnNumber: 23
            }, this)
          ] }, M.orderId || x, !0, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 79,
            columnNumber: 21
          }, this)),
          !d && !R && m.length === 0 && /* @__PURE__ */ s.jsxDEV("tr", { children: /* @__PURE__ */ s.jsxDEV("td", { colSpan: 6, className: "section-note", children: "No data." }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 89,
            columnNumber: 25
          }, this) }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 89,
            columnNumber: 21
          }, this),
          d && /* @__PURE__ */ s.jsxDEV("tr", { children: /* @__PURE__ */ s.jsxDEV("td", { colSpan: 6, className: "section-note", children: "Loading…" }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 92,
            columnNumber: 25
          }, this) }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 92,
            columnNumber: 21
          }, this),
          R && /* @__PURE__ */ s.jsxDEV("tr", { children: /* @__PURE__ */ s.jsxDEV("td", { colSpan: 6, className: "auth-error", children: R }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 95,
            columnNumber: 25
          }, this) }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 95,
            columnNumber: 21
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Reports.jsx",
          lineNumber: 77,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Reports.jsx",
        lineNumber: 66,
        columnNumber: 15
      }, this) }, void 0, !1, {
        fileName: "/app/code/client/pages/Reports.jsx",
        lineNumber: 65,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Reports.jsx",
      lineNumber: 45,
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
function X_({ onClose: o, onCreated: f }) {
  const [m, g] = y.useState(""), [b, S] = y.useState(""), [d, w] = y.useState(""), [R, j] = y.useState(!1), [M, x] = y.useState(""), [T, k] = y.useState(""), [ee, pe] = y.useState(!1), [le, oe] = y.useState(!1), [G, P] = y.useState(!1), [$, te] = y.useState(!1), F = "+92";
  function U(X) {
    const K = String(X || "").replace(/\D+/g, "");
    return K.length === 0 ? "" : K.startsWith("92") ? F + K.slice(2) : F + K;
  }
  async function re() {
    x(""), k(""), te(!0);
    const X = String(m), K = String(b).trim(), ie = String(d).trim(), Te = ie.replace(/\D+/g, ""), q = { fn: !K, cn: !ie, pw: !X };
    if (pe(q.fn), oe(q.cn || Te.length !== 10), P(q.pw), q.fn || q.cn || q.pw) {
      x("Full name, mobile and password are required");
      return;
    }
    if (Te.length !== 10) {
      x("numbers should be 10 digit"), oe(!0);
      return;
    }
    if (X.length < 6) {
      P(!0), x("Password must be at least 6 characters");
      return;
    }
    j(!0);
    try {
      const be = U(ie), ye = await fetch("/api/packers", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: X, fullName: K, contactNumber: be })
      }), Y = await ye.json().catch(() => null);
      if (!ye.ok) {
        const W = String(Y && (Y.error || Y.message) || ""), ce = W.toUpperCase();
        if (/MISSING\s*FULLNAME\/CONTACTNUMBER/i.test(W) || /MISSING\s*PASSWORD/i.test(W))
          x("Full name, mobile and password are required"), pe(!K), oe(!ie || Te.length !== 10), P(!X);
        else if (ce.includes("WEAK_PASSWORD") || /AT LEAST 6 CHARACTERS/i.test(W))
          P(!0), x("Password must be at least 6 characters");
        else if (/INVALID CONTACT NUMBER|MUST BE EXACTLY 10 DIGITS|NUMBERS SHOULD BE 10 DIGIT/i.test(W))
          oe(!0), x("numbers should be 10 digit");
        else if (/FIREBASE NOT CONFIGURED/i.test(W))
          x("Service temporarily unavailable. Please try again later.");
        else
          throw new Error(W || "Failed to create packer");
        return;
      }
      k("Packer created successfully"), f && f(), setTimeout(() => {
        o && o();
      }, 600);
    } catch (be) {
      const ye = String((be == null ? void 0 : be.message) || "");
      /Missing\s*(fullName\/contactNumber|password)/i.test(ye) ? x("Full name, mobile and password are required") : /WEAK_PASSWORD/i.test(ye) || /AT LEAST 6 CHARACTERS/i.test(ye) ? (P(!0), x("Password must be at least 6 characters")) : /INVALID CONTACT NUMBER|MUST BE EXACTLY 10 DIGITS|NUMBERS SHOULD BE 10 DIGIT/i.test(ye) ? (oe(!0), x("numbers should be 10 digit")) : x(ye || "Failed to create packer");
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
        /* @__PURE__ */ s.jsxDEV("input", { className: "field-input" + ($ && !String(b).trim() ? " input-error" : ""), value: b, onChange: (X) => {
          S(X.target.value), $ && pe(!String(X.target.value).trim());
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
        /* @__PURE__ */ s.jsxDEV("input", { className: "field-input" + ($ && !String(m) ? " input-error" : ""), type: "password", value: m, onChange: (X) => {
          g(X.target.value), $ && P(!String(X.target.value));
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
              className: "field-input phone-input-field" + ($ && String(d).trim().replace(/\D+/g, "").length !== 10 ? " input-error" : ""),
              type: "tel",
              inputMode: "tel",
              pattern: "[0-9]{10}",
              placeholder: "3001234567",
              value: d,
              onChange: (X) => {
                const K = X.target.value.replace(/\D+/g, "").slice(0, 10);
                w(K), $ && oe(K.length !== 10);
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
      M && /* @__PURE__ */ s.jsxDEV("div", { className: "auth-error", children: M }, void 0, !1, {
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
  const [o, f] = y.useState([]), [m, g] = y.useState(!0), [b, S] = y.useState(""), [d, w] = y.useState(1), [R, j] = y.useState(25), [M, x] = y.useState({ total: 0, page: 1, limit: 25, pages: 1 });
  y.useEffect(() => {
    let F = !0;
    return (async () => {
      var U, re, X, K;
      g(!0), S("");
      try {
        const ie = new URLSearchParams();
        ie.set("limit", String(R)), ie.set("page", String(d)), ie.set("status", "new");
        const Te = await fetch(`/api/orders?${ie.toString()}`, { credentials: "include" });
        if (Te.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!Te.ok) throw new Error("Failed to load orders");
        const q = await Te.json();
        F && (f(Array.isArray(q.orders) ? q.orders : []), x({ total: ((U = q.meta) == null ? void 0 : U.total) || 0, page: ((re = q.meta) == null ? void 0 : re.page) || d, limit: ((X = q.meta) == null ? void 0 : X.limit) || R, pages: ((K = q.meta) == null ? void 0 : K.pages) || 1 }));
      } catch (ie) {
        F && S(ie.message || "Failed to load orders");
      } finally {
        F && g(!1);
      }
    })(), () => {
      F = !1;
    };
  }, [d]);
  function T(F) {
    return !F || typeof F != "object" ? "new" : typeof F.current_status == "string" && String(F.current_status).trim() ? String(F.current_status).toLowerCase().trim() : "new";
  }
  const [k, ee] = y.useState(!1), [pe, le] = y.useState(null), [oe, G] = y.useState(!1);
  function P(F) {
    le(F), ee(!0);
  }
  function $() {
    le(null), ee(!1);
  }
  function te(F) {
    try {
      const { orderId: U } = F || {};
      if (!U) return;
      const re = String(U).replace(/^#+/, "");
      f((X) => X.filter((K, ie) => {
        const Te = String(K.id || K.name || K.order_number || ie).replace(/^#+/, "");
        return String(Te) !== String(re);
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
          /* @__PURE__ */ s.jsxDEV("div", { className: "stat-value", children: m ? "…" : M.total || o.length }, void 0, !1, {
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
        /* @__PURE__ */ s.jsxDEV("button", { className: "btn-secondary btn-create-packer", onClick: () => G(!0), children: "Create Packer" }, void 0, !1, {
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
        m && /* @__PURE__ */ s.jsxDEV("tr", { children: /* @__PURE__ */ s.jsxDEV("td", { colSpan: 7, className: "section-note", children: "Loading…" }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 100,
          columnNumber: 32
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 100,
          columnNumber: 28
        }, this),
        !m && b && /* @__PURE__ */ s.jsxDEV("tr", { children: /* @__PURE__ */ s.jsxDEV("td", { colSpan: 7, className: "auth-error", children: b }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 101,
          columnNumber: 32
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Dashboard.jsx",
          lineNumber: 101,
          columnNumber: 28
        }, this),
        !m && !b && (Array.isArray(o) ? o.filter((U) => T(U) === "new") : []).map((U, re) => {
          const X = T(U), K = U.full_name || (U.customer && U.customer.full_name ? U.customer.full_name : "");
          let ie = "-";
          typeof U.shipping_address == "string" && String(U.shipping_address).trim() ? ie = String(U.shipping_address).trim() : U.shipping_address && typeof U.shipping_address == "object" ? ie = [U.shipping_address.address1 || "", U.shipping_address.city || "", U.shipping_address.province || "", U.shipping_address.country || ""].map((W) => String(W || "").trim()).filter(Boolean).join(", ") || "-" : typeof U.billing_address == "string" && String(U.billing_address).trim() ? ie = String(U.billing_address).trim() : U.billing_address && typeof U.billing_address == "object" && (ie = [U.billing_address.address1 || "", U.billing_address.city || "", U.billing_address.province || "", U.billing_address.country || ""].map((W) => String(W || "").trim()).filter(Boolean).join(", ") || "-");
          const Te = U.name || U.order_number || U.id || re, q = String(U.id || U.name || U.order_number || re).replace(/^#+/, ""), be = U.created_at ? new Date(U.created_at) : null, ye = be ? be.toLocaleDateString() : "-", Y = be ? be.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "-";
          return /* @__PURE__ */ s.jsxDEV("tr", { "data-status": X, children: [
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-order", children: Te }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 126,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-customer", children: K || "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 127,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-address", children: ie }, void 0, !1, {
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
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-date", children: ye }, void 0, !1, {
              fileName: "/app/code/client/pages/Dashboard.jsx",
              lineNumber: 130,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-time", children: Y }, void 0, !1, {
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
          ] }, q, !0, {
            fileName: "/app/code/client/pages/Dashboard.jsx",
            lineNumber: 125,
            columnNumber: 21
          }, this);
        }),
        !m && !b && o.length === 0 && /* @__PURE__ */ s.jsxDEV("tr", { children: /* @__PURE__ */ s.jsxDEV("td", { colSpan: 7, className: "section-note", children: "No recent orders." }, void 0, !1, {
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
      /* @__PURE__ */ s.jsxDEV("button", { className: "rc-select rc-chip", disabled: M.page <= 1 || m, onClick: () => w((F) => Math.max(1, F - 1)), children: "Prev" }, void 0, !1, {
        fileName: "/app/code/client/pages/Dashboard.jsx",
        lineNumber: 144,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ s.jsxDEV("span", { className: "section-note", children: [
        "Page ",
        M.page,
        " of ",
        M.pages,
        " • ",
        M.total,
        " total"
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Dashboard.jsx",
        lineNumber: 145,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ s.jsxDEV("button", { className: "rc-select rc-chip", disabled: M.page >= M.pages || m, onClick: () => w((F) => Math.min(M.pages, F + 1)), children: "Next" }, void 0, !1, {
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
    k && pe && /* @__PURE__ */ s.jsxDEV(Bx, { orderId: pe, onClose: $, onAssigned: te }, void 0, !1, {
      fileName: "/app/code/client/pages/Dashboard.jsx",
      lineNumber: 151,
      columnNumber: 11
    }, this),
    oe && /* @__PURE__ */ s.jsxDEV(X_, { onClose: () => G(!1), onCreated: () => {
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
  const [o, f] = y.useState(ya.baseFare), [m, g] = y.useState(ya.farePerKm), [b, S] = y.useState(!1);
  y.useEffect(() => {
    const R = Vx();
    f(R.baseFare), g(R.farePerKm);
  }, []);
  function d() {
    S(!0);
    try {
      const R = { baseFare: Number(o) || 0, farePerKm: Number(m) || 0 };
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
    f(ya.baseFare), g(ya.farePerKm);
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
              value: Number.isFinite(m) ? String(m) : "",
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
function vx() {
  const o = document.getElementById("react-root");
  if (!o) return;
  Sx(o).render(/* @__PURE__ */ s.jsxDEV(eO, {}, void 0, !1, {
    fileName: "/app/code/client/main.jsx",
    lineNumber: 9,
    columnNumber: 15
  }, this));
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", vx) : vx();
