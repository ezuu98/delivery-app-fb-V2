function rw(o, f) {
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
function iw(o) {
  return o && o.__esModule && Object.prototype.hasOwnProperty.call(o, "default") ? o.default : o;
}
var Sx = { exports: {} }, Uh = {}, Rx = { exports: {} }, Nd = { exports: {} };
Nd.exports;
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
    function J(p) {
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
    var K = !1, ie = !1, we = !1, q = !1, be = !1, ye = {
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
        var _e = A.map(function(xe) {
          return String(xe);
        });
        _e.unshift("Warning: " + N), Function.prototype.apply.call(console[p], console, _e);
      }
    }
    var Ve = {};
    function He(p, N) {
      {
        var A = p.constructor, z = A && (A.displayName || A.name) || "ReactClass", ae = z + "." + N;
        if (Ve[ae])
          return;
        W("Can't call %s on a component that is not yet mounted. This is a no-op, but it might indicate a bug in your application. Instead, assign to `this.state` directly or define a `state = {};` class property with the desired state in the %s component.", N, z), Ve[ae] = !0;
      }
    }
    var st = {
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
        He(p, "forceUpdate");
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
        He(p, "replaceState");
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
        He(p, "setState");
      }
    }, Pe = Object.assign, tt = {};
    Object.freeze(tt);
    function dt(p, N, A) {
      this.props = p, this.context = N, this.refs = tt, this.updater = A || st;
    }
    dt.prototype.isReactComponent = {}, dt.prototype.setState = function(p, N) {
      if (typeof p != "object" && typeof p != "function" && p != null)
        throw new Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");
      this.updater.enqueueSetState(this, p, N, "setState");
    }, dt.prototype.forceUpdate = function(p) {
      this.updater.enqueueForceUpdate(this, p, "forceUpdate");
    };
    {
      var bn = {
        isMounted: ["isMounted", "Instead, make sure to clean up subscriptions and pending requests in componentWillUnmount to prevent memory leaks."],
        replaceState: ["replaceState", "Refactor your code to use setState instead (see https://github.com/facebook/react/issues/3236)."]
      }, Qt = function(p, N) {
        Object.defineProperty(dt.prototype, p, {
          get: function() {
            Y("%s(...) is deprecated in plain JavaScript React classes. %s", N[0], N[1]);
          }
        });
      };
      for (var Lt in bn)
        bn.hasOwnProperty(Lt) && Qt(Lt, bn[Lt]);
    }
    function Un() {
    }
    Un.prototype = dt.prototype;
    function Xt(p, N, A) {
      this.props = p, this.context = N, this.refs = tt, this.updater = A || st;
    }
    var Jt = Xt.prototype = new Un();
    Jt.constructor = Xt, Pe(Jt, dt.prototype), Jt.isPureReactComponent = !0;
    function Zt() {
      var p = {
        current: null
      };
      return Object.seal(p), p;
    }
    var Q = Array.isArray;
    function $e(p) {
      return Q(p);
    }
    function ft(p) {
      {
        var N = typeof Symbol == "function" && Symbol.toStringTag, A = N && p[Symbol.toStringTag] || p.constructor.name || "Object";
        return A;
      }
    }
    function et(p) {
      try {
        return bt(p), !1;
      } catch {
        return !0;
      }
    }
    function bt(p) {
      return "" + p;
    }
    function pt(p) {
      if (et(p))
        return W("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", ft(p)), bt(p);
    }
    function $t(p, N, A) {
      var z = p.displayName;
      if (z)
        return z;
      var ae = N.displayName || N.name || "";
      return ae !== "" ? A + "(" + ae + ")" : A;
    }
    function Dt(p) {
      return p.displayName || "Context";
    }
    function It(p) {
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
            return Dt(N) + ".Consumer";
          case R:
            var A = p;
            return Dt(A._context) + ".Provider";
          case M:
            return $t(p, p.render, "ForwardRef");
          case k:
            var z = p.displayName || null;
            return z !== null ? z : It(p.type) || "Memo";
          case ee: {
            var ae = p, _e = ae._payload, xe = ae._init;
            try {
              return It(xe(_e));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var Yt = Object.prototype.hasOwnProperty, Ft = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, kt, Re, xt;
    xt = {};
    function en(p) {
      if (Yt.call(p, "ref")) {
        var N = Object.getOwnPropertyDescriptor(p, "ref").get;
        if (N && N.isReactWarning)
          return !1;
      }
      return p.ref !== void 0;
    }
    function fn(p) {
      if (Yt.call(p, "key")) {
        var N = Object.getOwnPropertyDescriptor(p, "key").get;
        if (N && N.isReactWarning)
          return !1;
      }
      return p.key !== void 0;
    }
    function yn(p, N) {
      var A = function() {
        kt || (kt = !0, W("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", N));
      };
      A.isReactWarning = !0, Object.defineProperty(p, "key", {
        get: A,
        configurable: !0
      });
    }
    function Gn(p, N) {
      var A = function() {
        Re || (Re = !0, W("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", N));
      };
      A.isReactWarning = !0, Object.defineProperty(p, "ref", {
        get: A,
        configurable: !0
      });
    }
    function se(p) {
      if (typeof p.ref == "string" && F.current && p.__self && F.current.stateNode !== p.__self) {
        var N = It(F.current.type);
        xt[N] || (W('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', N, p.ref), xt[N] = !0);
      }
    }
    var Ee = function(p, N, A, z, ae, _e, xe) {
      var Ue = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: g,
        // Built-in properties that belong on the element
        type: p,
        key: N,
        ref: A,
        props: xe,
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
        value: z
      }), Object.defineProperty(Ue, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: ae
      }), Object.freeze && (Object.freeze(Ue.props), Object.freeze(Ue)), Ue;
    };
    function Be(p, N, A) {
      var z, ae = {}, _e = null, xe = null, Ue = null, Qe = null;
      if (N != null) {
        en(N) && (xe = N.ref, se(N)), fn(N) && (pt(N.key), _e = "" + N.key), Ue = N.__self === void 0 ? null : N.__self, Qe = N.__source === void 0 ? null : N.__source;
        for (z in N)
          Yt.call(N, z) && !Ft.hasOwnProperty(z) && (ae[z] = N[z]);
      }
      var mt = arguments.length - 2;
      if (mt === 1)
        ae.children = A;
      else if (mt > 1) {
        for (var Et = Array(mt), St = 0; St < mt; St++)
          Et[St] = arguments[St + 2];
        Object.freeze && Object.freeze(Et), ae.children = Et;
      }
      if (p && p.defaultProps) {
        var Ge = p.defaultProps;
        for (z in Ge)
          ae[z] === void 0 && (ae[z] = Ge[z]);
      }
      if (_e || xe) {
        var Vt = typeof p == "function" ? p.displayName || p.name || "Unknown" : p;
        _e && yn(ae, Vt), xe && Gn(ae, Vt);
      }
      return Ee(p, _e, xe, Ue, Qe, F.current, ae);
    }
    function ut(p, N) {
      var A = Ee(p.type, N, p.ref, p._self, p._source, p._owner, p.props);
      return A;
    }
    function yt(p, N, A) {
      if (p == null)
        throw new Error("React.cloneElement(...): The argument must be a React element, but you passed " + p + ".");
      var z, ae = Pe({}, p.props), _e = p.key, xe = p.ref, Ue = p._self, Qe = p._source, mt = p._owner;
      if (N != null) {
        en(N) && (xe = N.ref, mt = F.current), fn(N) && (pt(N.key), _e = "" + N.key);
        var Et;
        p.type && p.type.defaultProps && (Et = p.type.defaultProps);
        for (z in N)
          Yt.call(N, z) && !Ft.hasOwnProperty(z) && (N[z] === void 0 && Et !== void 0 ? ae[z] = Et[z] : ae[z] = N[z]);
      }
      var St = arguments.length - 2;
      if (St === 1)
        ae.children = A;
      else if (St > 1) {
        for (var Ge = Array(St), Vt = 0; Vt < St; Vt++)
          Ge[Vt] = arguments[Vt + 2];
        ae.children = Ge;
      }
      return Ee(p.type, _e, xe, Ue, Qe, mt, ae);
    }
    function Ct(p) {
      return typeof p == "object" && p !== null && p.$$typeof === g;
    }
    var jt = ".", Nn = ":";
    function Ot(p) {
      var N = /[=:]/g, A = {
        "=": "=0",
        ":": "=2"
      }, z = p.replace(N, function(ae) {
        return A[ae];
      });
      return "$" + z;
    }
    var rt = !1, zt = /\/+/g;
    function Ea(p) {
      return p.replace(zt, "$&/");
    }
    function Sa(p, N) {
      return typeof p == "object" && p !== null && p.key != null ? (pt(p.key), Ot("" + p.key)) : N.toString(36);
    }
    function ca(p, N, A, z, ae) {
      var _e = typeof p;
      (_e === "undefined" || _e === "boolean") && (p = null);
      var xe = !1;
      if (p === null)
        xe = !0;
      else
        switch (_e) {
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
        var Ue = p, Qe = ae(Ue), mt = z === "" ? jt + Sa(Ue, 0) : z;
        if ($e(Qe)) {
          var Et = "";
          mt != null && (Et = Ea(mt) + "/"), ca(Qe, N, Et, "", function(Od) {
            return Od;
          });
        } else Qe != null && (Ct(Qe) && (Qe.key && (!Ue || Ue.key !== Qe.key) && pt(Qe.key), Qe = ut(
          Qe,
          // Keep both the (mapped) and old keys if they differ, just as
          // traverseAllChildren used to do for objects as children
          A + // $FlowFixMe Flow incorrectly thinks React.Portal doesn't have a key
          (Qe.key && (!Ue || Ue.key !== Qe.key) ? (
            // $FlowFixMe Flow incorrectly thinks existing element's key can be a number
            // eslint-disable-next-line react-internal/safe-string-coercion
            Ea("" + Qe.key) + "/"
          ) : "") + mt
        )), N.push(Qe));
        return 1;
      }
      var St, Ge, Vt = 0, qt = z === "" ? jt : z + Nn;
      if ($e(p))
        for (var xi = 0; xi < p.length; xi++)
          St = p[xi], Ge = qt + Sa(St, xi), Vt += ca(St, N, A, Ge, ae);
      else {
        var xo = G(p);
        if (typeof xo == "function") {
          var cr = p;
          xo === cr.entries && (rt || Y("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), rt = !0);
          for (var Eo = xo.call(cr), So, _d = 0; !(So = Eo.next()).done; )
            St = So.value, Ge = qt + Sa(St, _d++), Vt += ca(St, N, A, Ge, ae);
        } else if (_e === "object") {
          var vu = String(p);
          throw new Error("Objects are not valid as a React child (found: " + (vu === "[object Object]" ? "object with keys {" + Object.keys(p).join(", ") + "}" : vu) + "). If you meant to render a collection of children, use an array instead.");
        }
      }
      return Vt;
    }
    function or(p, N, A) {
      if (p == null)
        return p;
      var z = [], ae = 0;
      return ca(p, z, "", "", function(_e) {
        return N.call(A, _e, ae++);
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
    function Ji(p) {
      return or(p, function(N) {
        return N;
      }) || [];
    }
    function Zi(p) {
      if (!Ct(p))
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
        var _e = {
          $$typeof: j,
          _context: N
        };
        Object.defineProperties(_e, {
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
        }), N.Consumer = _e;
      }
      return N._currentRenderer = null, N._currentRenderer2 = null, N;
    }
    var Ra = -1, da = 0, ea = 1, Ia = 2;
    function pi(p) {
      if (p._status === Ra) {
        var N = p._result, A = N();
        if (A.then(function(_e) {
          if (p._status === da || p._status === Ra) {
            var xe = p;
            xe._status = ea, xe._result = _e;
          }
        }, function(_e) {
          if (p._status === da || p._status === Ra) {
            var xe = p;
            xe._status = Ia, xe._result = _e;
          }
        }), p._status === Ra) {
          var z = p;
          z._status = da, z._result = A;
        }
      }
      if (p._status === ea) {
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
            set: function(_e) {
              W("React.lazy(...): It is not supported to assign `defaultProps` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), z = _e, Object.defineProperty(A, "defaultProps", {
                enumerable: !0
              });
            }
          },
          propTypes: {
            configurable: !0,
            get: function() {
              return ae;
            },
            set: function(_e) {
              W("React.lazy(...): It is not supported to assign `propTypes` to a lazy component import. Either specify them where the component is defined, or create a wrapping component around it."), ae = _e, Object.defineProperty(A, "propTypes", {
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
    function De(p) {
      return !!(typeof p == "string" || typeof p == "function" || p === S || p === w || be || p === d || p === x || p === T || q || p === pe || K || ie || we || typeof p == "object" && p !== null && (p.$$typeof === ee || p.$$typeof === k || p.$$typeof === R || p.$$typeof === j || p.$$typeof === M || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      p.$$typeof === de || p.getModuleId !== void 0));
    }
    function Ke(p, N) {
      De(p) || W("memo: The first argument must be a component. Instead received: %s", p === null ? "null" : typeof p);
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
    function Ae() {
      var p = P.current;
      return p === null && W(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`), p;
    }
    function Ie(p) {
      var N = Ae();
      if (p._context !== void 0) {
        var A = p._context;
        A.Consumer === p ? W("Calling useContext(Context.Consumer) is not supported, may cause bugs, and will be removed in a future major release. Did you mean to call useContext(Context) instead?") : A.Provider === p && W("Calling useContext(Context.Provider) is not supported. Did you mean to call useContext(Context) instead?");
      }
      return N.useContext(p);
    }
    function je(p) {
      var N = Ae();
      return N.useState(p);
    }
    function tn(p, N, A) {
      var z = Ae();
      return z.useReducer(p, N, A);
    }
    function Tt(p) {
      var N = Ae();
      return N.useRef(p);
    }
    function wt(p, N) {
      var A = Ae();
      return A.useEffect(p, N);
    }
    function _n(p, N) {
      var A = Ae();
      return A.useInsertionEffect(p, N);
    }
    function Ya(p, N) {
      var A = Ae();
      return A.useLayoutEffect(p, N);
    }
    function Da(p, N) {
      var A = Ae();
      return A.useCallback(p, N);
    }
    function nn(p, N) {
      var A = Ae();
      return A.useMemo(p, N);
    }
    function mi(p, N, A) {
      var z = Ae();
      return z.useImperativeHandle(p, N, A);
    }
    function Ca(p, N) {
      {
        var A = Ae();
        return A.useDebugValue(p, N);
      }
    }
    function qe() {
      var p = Ae();
      return p.useTransition();
    }
    function hi(p) {
      var N = Ae();
      return N.useDeferredValue(p);
    }
    function iu() {
      var p = Ae();
      return p.useId();
    }
    function lu(p, N, A) {
      var z = Ae();
      return z.useSyncExternalStore(p, N, A);
    }
    var Ar = 0, lo, oo, so, uo, co, ou, su;
    function el() {
    }
    el.__reactDisabledLog = !0;
    function fo() {
      {
        if (Ar === 0) {
          lo = console.log, oo = console.info, so = console.warn, uo = console.error, co = console.group, ou = console.groupCollapsed, su = console.groupEnd;
          var p = {
            configurable: !0,
            enumerable: !0,
            value: el,
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
            log: Pe({}, p, {
              value: lo
            }),
            info: Pe({}, p, {
              value: oo
            }),
            warn: Pe({}, p, {
              value: so
            }),
            error: Pe({}, p, {
              value: uo
            }),
            group: Pe({}, p, {
              value: co
            }),
            groupCollapsed: Pe({}, p, {
              value: ou
            }),
            groupEnd: Pe({}, p, {
              value: su
            })
          });
        }
        Ar < 0 && W("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var vi = ye.ReactCurrentDispatcher, Lr;
    function tl(p, N, A) {
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
    var gi = !1, nl;
    {
      var po = typeof WeakMap == "function" ? WeakMap : Map;
      nl = new po();
    }
    function uu(p, N) {
      if (!p || gi)
        return "";
      {
        var A = nl.get(p);
        if (A !== void 0)
          return A;
      }
      var z;
      gi = !0;
      var ae = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var _e;
      _e = vi.current, vi.current = null, fo();
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
            } catch (qt) {
              z = qt;
            }
            Reflect.construct(p, [], xe);
          } else {
            try {
              xe.call();
            } catch (qt) {
              z = qt;
            }
            p.call(xe.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (qt) {
            z = qt;
          }
          p();
        }
      } catch (qt) {
        if (qt && z && typeof qt.stack == "string") {
          for (var Ue = qt.stack.split(`
`), Qe = z.stack.split(`
`), mt = Ue.length - 1, Et = Qe.length - 1; mt >= 1 && Et >= 0 && Ue[mt] !== Qe[Et]; )
            Et--;
          for (; mt >= 1 && Et >= 0; mt--, Et--)
            if (Ue[mt] !== Qe[Et]) {
              if (mt !== 1 || Et !== 1)
                do
                  if (mt--, Et--, Et < 0 || Ue[mt] !== Qe[Et]) {
                    var St = `
` + Ue[mt].replace(" at new ", " at ");
                    return p.displayName && St.includes("<anonymous>") && (St = St.replace("<anonymous>", p.displayName)), typeof p == "function" && nl.set(p, St), St;
                  }
                while (mt >= 1 && Et >= 0);
              break;
            }
        }
      } finally {
        gi = !1, vi.current = _e, qa(), Error.prepareStackTrace = ae;
      }
      var Ge = p ? p.displayName || p.name : "", Vt = Ge ? tl(Ge) : "";
      return typeof p == "function" && nl.set(p, Vt), Vt;
    }
    function mo(p, N, A) {
      return uu(p, !1);
    }
    function Dd(p) {
      var N = p.prototype;
      return !!(N && N.isReactComponent);
    }
    function bi(p, N, A) {
      if (p == null)
        return "";
      if (typeof p == "function")
        return uu(p, Dd(p));
      if (typeof p == "string")
        return tl(p);
      switch (p) {
        case x:
          return tl("Suspense");
        case T:
          return tl("SuspenseList");
      }
      if (typeof p == "object")
        switch (p.$$typeof) {
          case M:
            return mo(p.render);
          case k:
            return bi(p.type, N, A);
          case ee: {
            var z = p, ae = z._payload, _e = z._init;
            try {
              return bi(_e(ae), N, A);
            } catch {
            }
          }
        }
      return "";
    }
    var cu = {}, ho = ye.ReactDebugCurrentFrame;
    function it(p) {
      if (p) {
        var N = p._owner, A = bi(p.type, p._source, N ? N.type : null);
        ho.setExtraStackFrame(A);
      } else
        ho.setExtraStackFrame(null);
    }
    function Cd(p, N, A, z, ae) {
      {
        var _e = Function.call.bind(Yt);
        for (var xe in p)
          if (_e(p, xe)) {
            var Ue = void 0;
            try {
              if (typeof p[xe] != "function") {
                var Qe = Error((z || "React class") + ": " + A + " type `" + xe + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof p[xe] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw Qe.name = "Invariant Violation", Qe;
              }
              Ue = p[xe](N, xe, z, A, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (mt) {
              Ue = mt;
            }
            Ue && !(Ue instanceof Error) && (it(ae), W("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", z || "React class", A, xe, typeof Ue), it(null)), Ue instanceof Error && !(Ue.message in cu) && (cu[Ue.message] = !0, it(ae), W("Failed %s type: %s", A, Ue.message), it(null));
          }
      }
    }
    function sr(p) {
      if (p) {
        var N = p._owner, A = bi(p.type, p._source, N ? N.type : null);
        J(A);
      } else
        J(null);
    }
    var ze;
    ze = !1;
    function vo() {
      if (F.current) {
        var p = It(F.current.type);
        if (p)
          return `

Check the render method of \`` + p + "`.";
      }
      return "";
    }
    function Fn(p) {
      if (p !== void 0) {
        var N = p.fileName.replace(/^.*[\\\/]/, ""), A = p.lineNumber;
        return `

Check your code at ` + N + ":" + A + ".";
      }
      return "";
    }
    function yi(p) {
      return p != null ? Fn(p.__source) : "";
    }
    var kr = {};
    function jd(p) {
      var N = vo();
      if (!N) {
        var A = typeof p == "string" ? p : p.displayName || p.name;
        A && (N = `

Check the top-level render call using <` + A + ">.");
      }
      return N;
    }
    function pn(p, N) {
      if (!(!p._store || p._store.validated || p.key != null)) {
        p._store.validated = !0;
        var A = jd(N);
        if (!kr[A]) {
          kr[A] = !0;
          var z = "";
          p && p._owner && p._owner !== F.current && (z = " It was passed a child from " + It(p._owner.type) + "."), sr(p), W('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', A, z), sr(null);
        }
      }
    }
    function Mt(p, N) {
      if (typeof p == "object") {
        if ($e(p))
          for (var A = 0; A < p.length; A++) {
            var z = p[A];
            Ct(z) && pn(z, N);
          }
        else if (Ct(p))
          p._store && (p._store.validated = !0);
        else if (p) {
          var ae = G(p);
          if (typeof ae == "function" && ae !== p.entries)
            for (var _e = ae.call(p), xe; !(xe = _e.next()).done; )
              Ct(xe.value) && pn(xe.value, N);
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
          var z = It(N);
          Cd(A, p.props, "prop", z, p);
        } else if (N.PropTypes !== void 0 && !ze) {
          ze = !0;
          var ae = It(N);
          W("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", ae || "Unknown");
        }
        typeof N.getDefaultProps == "function" && !N.getDefaultProps.isReactClassApproved && W("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function fa(p) {
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
    function zn(p, N, A) {
      var z = De(p);
      if (!z) {
        var ae = "";
        (p === void 0 || typeof p == "object" && p !== null && Object.keys(p).length === 0) && (ae += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
        var _e = yi(N);
        _e ? ae += _e : ae += vo();
        var xe;
        p === null ? xe = "null" : $e(p) ? xe = "array" : p !== void 0 && p.$$typeof === g ? (xe = "<" + (It(p.type) || "Unknown") + " />", ae = " Did you accidentally export a JSX literal instead of a component?") : xe = typeof p, W("React.createElement: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", xe, ae);
      }
      var Ue = Be.apply(this, arguments);
      if (Ue == null)
        return Ue;
      if (z)
        for (var Qe = 2; Qe < arguments.length; Qe++)
          Mt(arguments[Qe], p);
      return p === S ? fa(Ue) : du(Ue), Ue;
    }
    var ja = !1;
    function Td(p) {
      var N = zn.bind(null, p);
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
      for (var z = yt.apply(this, arguments), ae = 2; ae < arguments.length; ae++)
        Mt(arguments[ae], z.type);
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
    var bo = !1, al = null;
    function wd(p) {
      if (al === null)
        try {
          var N = ("require" + Math.random()).slice(0, 7), A = o && o[N];
          al = A.call(o, "timers").setImmediate;
        } catch {
          al = function(ae) {
            bo === !1 && (bo = !0, typeof MessageChannel > "u" && W("This browser does not have a MessageChannel implementation, so enqueuing tasks via await act(async () => ...) will fail. Please file an issue at https://github.com/facebook/react/issues if you encounter this warning."));
            var _e = new MessageChannel();
            _e.port1.onmessage = ae, _e.port2.postMessage(void 0);
          };
        }
      return al(p);
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
            ae !== null && (te.didScheduleLegacyUpdate = !1, ll(ae));
          }
        } catch (Ge) {
          throw ur(N), Ge;
        } finally {
          te.isBatchingLegacy = A;
        }
        if (z !== null && typeof z == "object" && typeof z.then == "function") {
          var _e = z, xe = !1, Ue = {
            then: function(Ge, Vt) {
              xe = !0, _e.then(function(qt) {
                ur(N), Ur === 0 ? rl(qt, Ge, Vt) : Ge(qt);
              }, function(qt) {
                ur(N), Vt(qt);
              });
            }
          };
          return !Ni && typeof Promise < "u" && Promise.resolve().then(function() {
          }).then(function() {
            xe || (Ni = !0, W("You called act(async () => ...) without await. This could lead to unexpected testing behaviour, interleaving multiple act calls and mixing their scopes. You should - await act(async () => ...);"));
          }), Ue;
        } else {
          var Qe = z;
          if (ur(N), Ur === 0) {
            var mt = te.current;
            mt !== null && (ll(mt), te.current = null);
            var Et = {
              then: function(Ge, Vt) {
                te.current === null ? (te.current = [], rl(Qe, Ge, Vt)) : Ge(Qe);
              }
            };
            return Et;
          } else {
            var St = {
              then: function(Ge, Vt) {
                Ge(Qe);
              }
            };
            return St;
          }
        }
      }
    }
    function ur(p) {
      p !== Ur - 1 && W("You seem to have overlapping act() calls, this is not supported. Be sure to await previous act() calls before making a new one. "), Ur = p;
    }
    function rl(p, N, A) {
      {
        var z = te.current;
        if (z !== null)
          try {
            ll(z), wd(function() {
              z.length === 0 ? (te.current = null, N(p)) : rl(p, N, A);
            });
          } catch (ae) {
            A(ae);
          }
        else
          N(p);
      }
    }
    var il = !1;
    function ll(p) {
      if (!il) {
        il = !0;
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
          il = !1;
        }
      }
    }
    var pu = zn, mu = go, No = Td, hu = {
      map: or,
      forEach: di,
      count: io,
      toArray: Ji,
      only: Zi
    };
    f.Children = hu, f.Component = dt, f.Fragment = S, f.Profiler = w, f.PureComponent = Xt, f.StrictMode = d, f.Suspense = x, f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = ye, f.act = yo, f.cloneElement = mu, f.createContext = fi, f.createElement = pu, f.createFactory = No, f.createRef = Zt, f.forwardRef = Z, f.isValidElement = Ct, f.lazy = E, f.memo = Ke, f.startTransition = fu, f.unstable_act = yo, f.useCallback = Da, f.useContext = Ie, f.useDebugValue = Ca, f.useDeferredValue = hi, f.useEffect = wt, f.useId = iu, f.useImperativeHandle = mi, f.useInsertionEffect = _n, f.useLayoutEffect = Ya, f.useMemo = nn, f.useReducer = tn, f.useRef = Tt, f.useState = je, f.useSyncExternalStore = lu, f.useTransition = qe, f.version = m, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  })();
})(Nd, Nd.exports);
var lw = Nd.exports;
Rx.exports = lw;
var y = Rx.exports;
const Dx = /* @__PURE__ */ iw(y), ow = /* @__PURE__ */ rw({
  __proto__: null,
  default: Dx
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
      for (var Z = arguments.length, de = new Array(Z > 1 ? Z - 1 : 0), De = 1; De < Z; De++)
        de[De - 1] = arguments[De];
      P("error", E, de);
    }
  }
  function P(E, Z, de) {
    {
      var De = oe.ReactDebugCurrentFrame, Ke = De.getStackAddendum();
      Ke !== "" && (Z += "%s", de = de.concat([Ke]));
      var Ae = de.map(function(Ie) {
        return String(Ie);
      });
      Ae.unshift("Warning: " + Z), Function.prototype.apply.call(console[E], console, Ae);
    }
  }
  var $ = !1, te = !1, F = !1, U = !1, re = !1, J;
  J = Symbol.for("react.module.reference");
  function K(E) {
    return !!(typeof E == "string" || typeof E == "function" || E === g || E === S || re || E === b || E === j || E === M || U || E === k || $ || te || F || typeof E == "object" && E !== null && (E.$$typeof === T || E.$$typeof === x || E.$$typeof === d || E.$$typeof === w || E.$$typeof === R || // This needs to include all possible module reference object
    // types supported by any Flight configuration anywhere since
    // we don't know which Flight build this will end up being used
    // with.
    E.$$typeof === J || E.getModuleId !== void 0));
  }
  function ie(E, Z, de) {
    var De = E.displayName;
    if (De)
      return De;
    var Ke = Z.displayName || Z.name || "";
    return Ke !== "" ? de + "(" + Ke + ")" : de;
  }
  function we(E) {
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
          return we(Z) + ".Consumer";
        case d:
          var de = E;
          return we(de._context) + ".Provider";
        case R:
          return ie(E, E.render, "ForwardRef");
        case x:
          var De = E.displayName || null;
          return De !== null ? De : q(E.type) || "Memo";
        case T: {
          var Ke = E, Ae = Ke._payload, Ie = Ke._init;
          try {
            return q(Ie(Ae));
          } catch {
            return null;
          }
        }
      }
    return null;
  }
  var be = Object.assign, ye = 0, Y, W, ce, Ve, He, st, Pe;
  function tt() {
  }
  tt.__reactDisabledLog = !0;
  function dt() {
    {
      if (ye === 0) {
        Y = console.log, W = console.info, ce = console.warn, Ve = console.error, He = console.group, st = console.groupCollapsed, Pe = console.groupEnd;
        var E = {
          configurable: !0,
          enumerable: !0,
          value: tt,
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
  function bn() {
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
            value: Ve
          }),
          group: be({}, E, {
            value: He
          }),
          groupCollapsed: be({}, E, {
            value: st
          }),
          groupEnd: be({}, E, {
            value: Pe
          })
        });
      }
      ye < 0 && G("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
    }
  }
  var Qt = oe.ReactCurrentDispatcher, Lt;
  function Un(E, Z, de) {
    {
      if (Lt === void 0)
        try {
          throw Error();
        } catch (Ke) {
          var De = Ke.stack.trim().match(/\n( *(at )?)/);
          Lt = De && De[1] || "";
        }
      return `
` + Lt + E;
    }
  }
  var Xt = !1, Jt;
  {
    var Zt = typeof WeakMap == "function" ? WeakMap : Map;
    Jt = new Zt();
  }
  function Q(E, Z) {
    if (!E || Xt)
      return "";
    {
      var de = Jt.get(E);
      if (de !== void 0)
        return de;
    }
    var De;
    Xt = !0;
    var Ke = Error.prepareStackTrace;
    Error.prepareStackTrace = void 0;
    var Ae;
    Ae = Qt.current, Qt.current = null, dt();
    try {
      if (Z) {
        var Ie = function() {
          throw Error();
        };
        if (Object.defineProperty(Ie.prototype, "props", {
          set: function() {
            throw Error();
          }
        }), typeof Reflect == "object" && Reflect.construct) {
          try {
            Reflect.construct(Ie, []);
          } catch (nn) {
            De = nn;
          }
          Reflect.construct(E, [], Ie);
        } else {
          try {
            Ie.call();
          } catch (nn) {
            De = nn;
          }
          E.call(Ie.prototype);
        }
      } else {
        try {
          throw Error();
        } catch (nn) {
          De = nn;
        }
        E();
      }
    } catch (nn) {
      if (nn && De && typeof nn.stack == "string") {
        for (var je = nn.stack.split(`
`), tn = De.stack.split(`
`), Tt = je.length - 1, wt = tn.length - 1; Tt >= 1 && wt >= 0 && je[Tt] !== tn[wt]; )
          wt--;
        for (; Tt >= 1 && wt >= 0; Tt--, wt--)
          if (je[Tt] !== tn[wt]) {
            if (Tt !== 1 || wt !== 1)
              do
                if (Tt--, wt--, wt < 0 || je[Tt] !== tn[wt]) {
                  var _n = `
` + je[Tt].replace(" at new ", " at ");
                  return E.displayName && _n.includes("<anonymous>") && (_n = _n.replace("<anonymous>", E.displayName)), typeof E == "function" && Jt.set(E, _n), _n;
                }
              while (Tt >= 1 && wt >= 0);
            break;
          }
      }
    } finally {
      Xt = !1, Qt.current = Ae, bn(), Error.prepareStackTrace = Ke;
    }
    var Ya = E ? E.displayName || E.name : "", Da = Ya ? Un(Ya) : "";
    return typeof E == "function" && Jt.set(E, Da), Da;
  }
  function $e(E, Z, de) {
    return Q(E, !1);
  }
  function ft(E) {
    var Z = E.prototype;
    return !!(Z && Z.isReactComponent);
  }
  function et(E, Z, de) {
    if (E == null)
      return "";
    if (typeof E == "function")
      return Q(E, ft(E));
    if (typeof E == "string")
      return Un(E);
    switch (E) {
      case j:
        return Un("Suspense");
      case M:
        return Un("SuspenseList");
    }
    if (typeof E == "object")
      switch (E.$$typeof) {
        case R:
          return $e(E.render);
        case x:
          return et(E.type, Z, de);
        case T: {
          var De = E, Ke = De._payload, Ae = De._init;
          try {
            return et(Ae(Ke), Z, de);
          } catch {
          }
        }
      }
    return "";
  }
  var bt = Object.prototype.hasOwnProperty, pt = {}, $t = oe.ReactDebugCurrentFrame;
  function Dt(E) {
    if (E) {
      var Z = E._owner, de = et(E.type, E._source, Z ? Z.type : null);
      $t.setExtraStackFrame(de);
    } else
      $t.setExtraStackFrame(null);
  }
  function It(E, Z, de, De, Ke) {
    {
      var Ae = Function.call.bind(bt);
      for (var Ie in E)
        if (Ae(E, Ie)) {
          var je = void 0;
          try {
            if (typeof E[Ie] != "function") {
              var tn = Error((De || "React class") + ": " + de + " type `" + Ie + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof E[Ie] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
              throw tn.name = "Invariant Violation", tn;
            }
            je = E[Ie](Z, Ie, De, de, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
          } catch (Tt) {
            je = Tt;
          }
          je && !(je instanceof Error) && (Dt(Ke), G("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", De || "React class", de, Ie, typeof je), Dt(null)), je instanceof Error && !(je.message in pt) && (pt[je.message] = !0, Dt(Ke), G("Failed %s type: %s", de, je.message), Dt(null));
        }
    }
  }
  var Yt = Array.isArray;
  function Ft(E) {
    return Yt(E);
  }
  function kt(E) {
    {
      var Z = typeof Symbol == "function" && Symbol.toStringTag, de = Z && E[Symbol.toStringTag] || E.constructor.name || "Object";
      return de;
    }
  }
  function Re(E) {
    try {
      return xt(E), !1;
    } catch {
      return !0;
    }
  }
  function xt(E) {
    return "" + E;
  }
  function en(E) {
    if (Re(E))
      return G("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", kt(E)), xt(E);
  }
  var fn = oe.ReactCurrentOwner, yn = {
    key: !0,
    ref: !0,
    __self: !0,
    __source: !0
  }, Gn, se, Ee;
  Ee = {};
  function Be(E) {
    if (bt.call(E, "ref")) {
      var Z = Object.getOwnPropertyDescriptor(E, "ref").get;
      if (Z && Z.isReactWarning)
        return !1;
    }
    return E.ref !== void 0;
  }
  function ut(E) {
    if (bt.call(E, "key")) {
      var Z = Object.getOwnPropertyDescriptor(E, "key").get;
      if (Z && Z.isReactWarning)
        return !1;
    }
    return E.key !== void 0;
  }
  function yt(E, Z) {
    if (typeof E.ref == "string" && fn.current && Z && fn.current.stateNode !== Z) {
      var de = q(fn.current.type);
      Ee[de] || (G('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', q(fn.current.type), E.ref), Ee[de] = !0);
    }
  }
  function Ct(E, Z) {
    {
      var de = function() {
        Gn || (Gn = !0, G("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", Z));
      };
      de.isReactWarning = !0, Object.defineProperty(E, "key", {
        get: de,
        configurable: !0
      });
    }
  }
  function jt(E, Z) {
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
  var Nn = function(E, Z, de, De, Ke, Ae, Ie) {
    var je = {
      // This tag allows us to uniquely identify this as a React Element
      $$typeof: f,
      // Built-in properties that belong on the element
      type: E,
      key: Z,
      ref: de,
      props: Ie,
      // Record the component responsible for creating this element.
      _owner: Ae
    };
    return je._store = {}, Object.defineProperty(je._store, "validated", {
      configurable: !1,
      enumerable: !1,
      writable: !0,
      value: !1
    }), Object.defineProperty(je, "_self", {
      configurable: !1,
      enumerable: !1,
      writable: !1,
      value: De
    }), Object.defineProperty(je, "_source", {
      configurable: !1,
      enumerable: !1,
      writable: !1,
      value: Ke
    }), Object.freeze && (Object.freeze(je.props), Object.freeze(je)), je;
  };
  function Ot(E, Z, de, De, Ke) {
    {
      var Ae, Ie = {}, je = null, tn = null;
      de !== void 0 && (en(de), je = "" + de), ut(Z) && (en(Z.key), je = "" + Z.key), Be(Z) && (tn = Z.ref, yt(Z, Ke));
      for (Ae in Z)
        bt.call(Z, Ae) && !yn.hasOwnProperty(Ae) && (Ie[Ae] = Z[Ae]);
      if (E && E.defaultProps) {
        var Tt = E.defaultProps;
        for (Ae in Tt)
          Ie[Ae] === void 0 && (Ie[Ae] = Tt[Ae]);
      }
      if (je || tn) {
        var wt = typeof E == "function" ? E.displayName || E.name || "Unknown" : E;
        je && Ct(Ie, wt), tn && jt(Ie, wt);
      }
      return Nn(E, je, tn, Ke, De, fn.current, Ie);
    }
  }
  var rt = oe.ReactCurrentOwner, zt = oe.ReactDebugCurrentFrame;
  function Ea(E) {
    if (E) {
      var Z = E._owner, de = et(E.type, E._source, Z ? Z.type : null);
      zt.setExtraStackFrame(de);
    } else
      zt.setExtraStackFrame(null);
  }
  var Sa;
  Sa = !1;
  function ca(E) {
    return typeof E == "object" && E !== null && E.$$typeof === f;
  }
  function or() {
    {
      if (rt.current) {
        var E = q(rt.current.type);
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
  function Ji(E) {
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
  function Zi(E, Z) {
    {
      if (!E._store || E._store.validated || E.key != null)
        return;
      E._store.validated = !0;
      var de = Ji(Z);
      if (di[de])
        return;
      di[de] = !0;
      var De = "";
      E && E._owner && E._owner !== rt.current && (De = " It was passed a child from " + q(E._owner.type) + "."), Ea(E), G('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', de, De), Ea(null);
    }
  }
  function fi(E, Z) {
    {
      if (typeof E != "object")
        return;
      if (Ft(E))
        for (var de = 0; de < E.length; de++) {
          var De = E[de];
          ca(De) && Zi(De, Z);
        }
      else if (ca(E))
        E._store && (E._store.validated = !0);
      else if (E) {
        var Ke = le(E);
        if (typeof Ke == "function" && Ke !== E.entries)
          for (var Ae = Ke.call(E), Ie; !(Ie = Ae.next()).done; )
            ca(Ie.value) && Zi(Ie.value, Z);
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
        var De = q(Z);
        It(de, E.props, "prop", De, E);
      } else if (Z.PropTypes !== void 0 && !Sa) {
        Sa = !0;
        var Ke = q(Z);
        G("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", Ke || "Unknown");
      }
      typeof Z.getDefaultProps == "function" && !Z.getDefaultProps.isReactClassApproved && G("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
    }
  }
  function da(E) {
    {
      for (var Z = Object.keys(E.props), de = 0; de < Z.length; de++) {
        var De = Z[de];
        if (De !== "children" && De !== "key") {
          Ea(E), G("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", De), Ea(null);
          break;
        }
      }
      E.ref !== null && (Ea(E), G("Invalid attribute `ref` supplied to `React.Fragment`."), Ea(null));
    }
  }
  var ea = {};
  function Ia(E, Z, de, De, Ke, Ae) {
    {
      var Ie = K(E);
      if (!Ie) {
        var je = "";
        (E === void 0 || typeof E == "object" && E !== null && Object.keys(E).length === 0) && (je += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
        var tn = io(Ke);
        tn ? je += tn : je += or();
        var Tt;
        E === null ? Tt = "null" : Ft(E) ? Tt = "array" : E !== void 0 && E.$$typeof === f ? (Tt = "<" + (q(E.type) || "Unknown") + " />", je = " Did you accidentally export a JSX literal instead of a component?") : Tt = typeof E, G("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", Tt, je);
      }
      var wt = Ot(E, Z, de, Ke, Ae);
      if (wt == null)
        return wt;
      if (Ie) {
        var _n = Z.children;
        if (_n !== void 0)
          if (De)
            if (Ft(_n)) {
              for (var Ya = 0; Ya < _n.length; Ya++)
                fi(_n[Ya], E);
              Object.freeze && Object.freeze(_n);
            } else
              G("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
          else
            fi(_n, E);
      }
      if (bt.call(Z, "key")) {
        var Da = q(E), nn = Object.keys(Z).filter(function(qe) {
          return qe !== "key";
        }), mi = nn.length > 0 ? "{key: someKey, " + nn.join(": ..., ") + ": ...}" : "{key: someKey}";
        if (!ea[Da + mi]) {
          var Ca = nn.length > 0 ? "{" + nn.join(": ..., ") + ": ...}" : "{}";
          G(`A props object containing a "key" prop is being spread into JSX:
  let props = %s;
  <%s {...props} />
React keys must be passed directly to JSX without using spread:
  let props = %s;
  <%s key={someKey} {...props} />`, mi, Da, Ca, Da), ea[Da + mi] = !0;
        }
      }
      return E === g ? da(wt) : Ra(wt), wt;
    }
  }
  var pi = Ia;
  Uh.Fragment = g, Uh.jsxDEV = pi;
})();
Sx.exports = Uh;
var s = Sx.exports, Cx = { exports: {} }, ua = {}, jx = { exports: {} }, Tx = {};
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
    function g(se, Ee) {
      var Be = se.length;
      se.push(Ee), d(se, Ee, Be);
    }
    function b(se) {
      return se.length === 0 ? null : se[0];
    }
    function S(se) {
      if (se.length === 0)
        return null;
      var Ee = se[0], Be = se.pop();
      return Be !== Ee && (se[0] = Be, w(se, Be, 0)), Ee;
    }
    function d(se, Ee, Be) {
      for (var ut = Be; ut > 0; ) {
        var yt = ut - 1 >>> 1, Ct = se[yt];
        if (R(Ct, Ee) > 0)
          se[yt] = Ee, se[ut] = Ct, ut = yt;
        else
          return;
      }
    }
    function w(se, Ee, Be) {
      for (var ut = Be, yt = se.length, Ct = yt >>> 1; ut < Ct; ) {
        var jt = (ut + 1) * 2 - 1, Nn = se[jt], Ot = jt + 1, rt = se[Ot];
        if (R(Nn, Ee) < 0)
          Ot < yt && R(rt, Nn) < 0 ? (se[ut] = rt, se[Ot] = Ee, ut = Ot) : (se[ut] = Nn, se[jt] = Ee, ut = jt);
        else if (Ot < yt && R(rt, Ee) < 0)
          se[ut] = rt, se[Ot] = Ee, ut = Ot;
        else
          return;
      }
    }
    function R(se, Ee) {
      var Be = se.sortIndex - Ee.sortIndex;
      return Be !== 0 ? Be : se.id - Ee.id;
    }
    var j = 1, M = 2, x = 3, T = 4, k = 5;
    function ee(se, Ee) {
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
    var P = 1073741823, $ = -1, te = 250, F = 5e3, U = 1e4, re = P, J = [], K = [], ie = 1, we = null, q = x, be = !1, ye = !1, Y = !1, W = typeof setTimeout == "function" ? setTimeout : null, ce = typeof clearTimeout == "function" ? clearTimeout : null, Ve = typeof setImmediate < "u" ? setImmediate : null;
    typeof navigator < "u" && navigator.scheduling !== void 0 && navigator.scheduling.isInputPending !== void 0 && navigator.scheduling.isInputPending.bind(navigator.scheduling);
    function He(se) {
      for (var Ee = b(K); Ee !== null; ) {
        if (Ee.callback === null)
          S(K);
        else if (Ee.startTime <= se)
          S(K), Ee.sortIndex = Ee.expirationTime, g(J, Ee);
        else
          return;
        Ee = b(K);
      }
    }
    function st(se) {
      if (Y = !1, He(se), !ye)
        if (b(J) !== null)
          ye = !0, xt(Pe);
        else {
          var Ee = b(K);
          Ee !== null && en(st, Ee.startTime - se);
        }
    }
    function Pe(se, Ee) {
      ye = !1, Y && (Y = !1, fn()), be = !0;
      var Be = q;
      try {
        var ut;
        if (!f) return tt(se, Ee);
      } finally {
        we = null, q = Be, be = !1;
      }
    }
    function tt(se, Ee) {
      var Be = Ee;
      for (He(Be), we = b(J); we !== null && !(we.expirationTime > Be && (!se || $t())); ) {
        var ut = we.callback;
        if (typeof ut == "function") {
          we.callback = null, q = we.priorityLevel;
          var yt = we.expirationTime <= Be, Ct = ut(yt);
          Be = o.unstable_now(), typeof Ct == "function" ? we.callback = Ct : we === b(J) && S(J), He(Be);
        } else
          S(J);
        we = b(J);
      }
      if (we !== null)
        return !0;
      var jt = b(K);
      return jt !== null && en(st, jt.startTime - Be), !1;
    }
    function dt(se, Ee) {
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
      var Be = q;
      q = se;
      try {
        return Ee();
      } finally {
        q = Be;
      }
    }
    function bn(se) {
      var Ee;
      switch (q) {
        case j:
        case M:
        case x:
          Ee = x;
          break;
        default:
          Ee = q;
          break;
      }
      var Be = q;
      q = Ee;
      try {
        return se();
      } finally {
        q = Be;
      }
    }
    function Qt(se) {
      var Ee = q;
      return function() {
        var Be = q;
        q = Ee;
        try {
          return se.apply(this, arguments);
        } finally {
          q = Be;
        }
      };
    }
    function Lt(se, Ee, Be) {
      var ut = o.unstable_now(), yt;
      if (typeof Be == "object" && Be !== null) {
        var Ct = Be.delay;
        typeof Ct == "number" && Ct > 0 ? yt = ut + Ct : yt = ut;
      } else
        yt = ut;
      var jt;
      switch (se) {
        case j:
          jt = $;
          break;
        case M:
          jt = te;
          break;
        case k:
          jt = re;
          break;
        case T:
          jt = U;
          break;
        case x:
        default:
          jt = F;
          break;
      }
      var Nn = yt + jt, Ot = {
        id: ie++,
        callback: Ee,
        priorityLevel: se,
        startTime: yt,
        expirationTime: Nn,
        sortIndex: -1
      };
      return yt > ut ? (Ot.sortIndex = yt, g(K, Ot), b(J) === null && Ot === b(K) && (Y ? fn() : Y = !0, en(st, yt - ut))) : (Ot.sortIndex = Nn, g(J, Ot), !ye && !be && (ye = !0, xt(Pe))), Ot;
    }
    function Un() {
    }
    function Xt() {
      !ye && !be && (ye = !0, xt(Pe));
    }
    function Jt() {
      return b(J);
    }
    function Zt(se) {
      se.callback = null;
    }
    function Q() {
      return q;
    }
    var $e = !1, ft = null, et = -1, bt = m, pt = -1;
    function $t() {
      var se = o.unstable_now() - pt;
      return !(se < bt);
    }
    function Dt() {
    }
    function It(se) {
      if (se < 0 || se > 125) {
        console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported");
        return;
      }
      se > 0 ? bt = Math.floor(1e3 / se) : bt = m;
    }
    var Yt = function() {
      if (ft !== null) {
        var se = o.unstable_now();
        pt = se;
        var Ee = !0, Be = !0;
        try {
          Be = ft(Ee, se);
        } finally {
          Be ? Ft() : ($e = !1, ft = null);
        }
      } else
        $e = !1;
    }, Ft;
    if (typeof Ve == "function")
      Ft = function() {
        Ve(Yt);
      };
    else if (typeof MessageChannel < "u") {
      var kt = new MessageChannel(), Re = kt.port2;
      kt.port1.onmessage = Yt, Ft = function() {
        Re.postMessage(null);
      };
    } else
      Ft = function() {
        W(Yt, 0);
      };
    function xt(se) {
      ft = se, $e || ($e = !0, Ft());
    }
    function en(se, Ee) {
      et = W(function() {
        se(o.unstable_now());
      }, Ee);
    }
    function fn() {
      ce(et), et = -1;
    }
    var yn = Dt, Gn = null;
    o.unstable_IdlePriority = k, o.unstable_ImmediatePriority = j, o.unstable_LowPriority = T, o.unstable_NormalPriority = x, o.unstable_Profiling = Gn, o.unstable_UserBlockingPriority = M, o.unstable_cancelCallback = Zt, o.unstable_continueExecution = Xt, o.unstable_forceFrameRate = It, o.unstable_getCurrentPriorityLevel = Q, o.unstable_getFirstCallbackNode = Jt, o.unstable_next = bn, o.unstable_pauseExecution = Un, o.unstable_requestPaint = yn, o.unstable_runWithPriority = dt, o.unstable_scheduleCallback = Lt, o.unstable_shouldYield = $t, o.unstable_wrapCallback = Qt, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
  })();
})(Tx);
jx.exports = Tx;
var sw = jx.exports;
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
  var o = y, f = sw, m = o.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED, g = !1;
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
  var R = 0, j = 1, M = 2, x = 3, T = 4, k = 5, ee = 6, pe = 7, le = 8, oe = 9, G = 10, P = 11, $ = 12, te = 13, F = 14, U = 15, re = 16, J = 17, K = 18, ie = 19, we = 21, q = 22, be = 23, ye = 24, Y = 25, W = !0, ce = !1, Ve = !1, He = !1, st = !1, Pe = !0, tt = !0, dt = !0, bn = !0, Qt = /* @__PURE__ */ new Set(), Lt = {}, Un = {};
  function Xt(e, t) {
    Jt(e, t), Jt(e + "Capture", t);
  }
  function Jt(e, t) {
    Lt[e] && d("EventRegistry: More than one plugin attempted to publish the same registration name, `%s`.", e), Lt[e] = t;
    {
      var n = e.toLowerCase();
      Un[n] = e, e === "onDoubleClick" && (Un.ondblclick = e);
    }
    for (var a = 0; a < t.length; a++)
      Qt.add(t[a]);
  }
  var Zt = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", Q = Object.prototype.hasOwnProperty;
  function $e(e) {
    {
      var t = typeof Symbol == "function" && Symbol.toStringTag, n = t && e[Symbol.toStringTag] || e.constructor.name || "Object";
      return n;
    }
  }
  function ft(e) {
    try {
      return et(e), !1;
    } catch {
      return !0;
    }
  }
  function et(e) {
    return "" + e;
  }
  function bt(e, t) {
    if (ft(e))
      return d("The provided `%s` attribute is an unsupported type %s. This value must be coerced to a string before before using it here.", t, $e(e)), et(e);
  }
  function pt(e) {
    if (ft(e))
      return d("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", $e(e)), et(e);
  }
  function $t(e, t) {
    if (ft(e))
      return d("The provided `%s` prop is an unsupported type %s. This value must be coerced to a string before before using it here.", t, $e(e)), et(e);
  }
  function Dt(e, t) {
    if (ft(e))
      return d("The provided `%s` CSS property is an unsupported type %s. This value must be coerced to a string before before using it here.", t, $e(e)), et(e);
  }
  function It(e) {
    if (ft(e))
      return d("The provided HTML markup uses a value of unsupported type %s. This value must be coerced to a string before before using it here.", $e(e)), et(e);
  }
  function Yt(e) {
    if (ft(e))
      return d("Form field values (value, checked, defaultValue, or defaultChecked props) must be strings, not %s. This value must be coerced to a string before before using it here.", $e(e)), et(e);
  }
  var Ft = 0, kt = 1, Re = 2, xt = 3, en = 4, fn = 5, yn = 6, Gn = ":A-Z_a-z\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD", se = Gn + "\\-.0-9\\u00B7\\u0300-\\u036F\\u203F-\\u2040", Ee = new RegExp("^[" + Gn + "][" + se + "]*$"), Be = {}, ut = {};
  function yt(e) {
    return Q.call(ut, e) ? !0 : Q.call(Be, e) ? !1 : Ee.test(e) ? (ut[e] = !0, !0) : (Be[e] = !0, d("Invalid attribute name: `%s`", e), !1);
  }
  function Ct(e, t, n) {
    return t !== null ? t.type === Ft : n ? !1 : e.length > 2 && (e[0] === "o" || e[0] === "O") && (e[1] === "n" || e[1] === "N");
  }
  function jt(e, t, n, a) {
    if (n !== null && n.type === Ft)
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
  function Nn(e, t, n, a) {
    if (t === null || typeof t > "u" || jt(e, t, n, a))
      return !0;
    if (a)
      return !1;
    if (n !== null)
      switch (n.type) {
        case xt:
          return !t;
        case en:
          return t === !1;
        case fn:
          return isNaN(t);
        case yn:
          return isNaN(t) || t < 1;
      }
    return !1;
  }
  function Ot(e) {
    return zt.hasOwnProperty(e) ? zt[e] : null;
  }
  function rt(e, t, n, a, r, i, l) {
    this.acceptsBooleans = t === Re || t === xt || t === en, this.attributeName = a, this.attributeNamespace = r, this.mustUseProperty = n, this.propertyName = e, this.type = t, this.sanitizeURL = i, this.removeEmptyString = l;
  }
  var zt = {}, Ea = [
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
    zt[e] = new rt(
      e,
      Ft,
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
    zt[t] = new rt(
      t,
      kt,
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
    zt[e] = new rt(
      e,
      Re,
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
    zt[e] = new rt(
      e,
      Re,
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
    zt[e] = new rt(
      e,
      xt,
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
    zt[e] = new rt(
      e,
      xt,
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
    zt[e] = new rt(
      e,
      en,
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
    zt[e] = new rt(
      e,
      yn,
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
    zt[e] = new rt(
      e,
      fn,
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
    zt[t] = new rt(
      t,
      kt,
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
    zt[t] = new rt(
      t,
      kt,
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
    zt[t] = new rt(
      t,
      kt,
      !1,
      // mustUseProperty
      e,
      "http://www.w3.org/XML/1998/namespace",
      !1,
      // sanitizeURL
      !1
    );
  }), ["tabIndex", "crossOrigin"].forEach(function(e) {
    zt[e] = new rt(
      e,
      kt,
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
  zt[or] = new rt(
    "xlinkHref",
    kt,
    !1,
    // mustUseProperty
    "xlink:href",
    "http://www.w3.org/1999/xlink",
    !0,
    // sanitizeURL
    !1
  ), ["src", "href", "action", "formAction"].forEach(function(e) {
    zt[e] = new rt(
      e,
      kt,
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
  function Ji(e) {
    !di && io.test(e) && (di = !0, d("A future version of React will block javascript: URLs as a security precaution. Use event handlers instead if you can. If you need to generate unsafe HTML try using dangerouslySetInnerHTML instead. React was passed %s.", JSON.stringify(e)));
  }
  function Zi(e, t, n, a) {
    if (a.mustUseProperty) {
      var r = a.propertyName;
      return e[r];
    } else {
      bt(n, t), a.sanitizeURL && Ji("" + n);
      var i = a.attributeName, l = null;
      if (a.type === en) {
        if (e.hasAttribute(i)) {
          var u = e.getAttribute(i);
          return u === "" ? !0 : Nn(t, n, a, !1) ? u : u === "" + n ? n : u;
        }
      } else if (e.hasAttribute(i)) {
        if (Nn(t, n, a, !1))
          return e.getAttribute(i);
        if (a.type === xt)
          return n;
        l = e.getAttribute(i);
      }
      return Nn(t, n, a, !1) ? l === null ? n : l : l === "" + n ? n : l;
    }
  }
  function fi(e, t, n, a) {
    {
      if (!yt(t))
        return;
      if (!e.hasAttribute(t))
        return n === void 0 ? void 0 : null;
      var r = e.getAttribute(t);
      return bt(n, t), r === "" + n ? n : r;
    }
  }
  function Ra(e, t, n, a) {
    var r = Ot(t);
    if (!Ct(t, r, a)) {
      if (Nn(t, n, r, a) && (n = null), a || r === null) {
        if (yt(t)) {
          var i = t;
          n === null ? e.removeAttribute(i) : (bt(n, t), e.setAttribute(i, "" + n));
        }
        return;
      }
      var l = r.mustUseProperty;
      if (l) {
        var u = r.propertyName;
        if (n === null) {
          var c = r.type;
          e[u] = c === xt ? !1 : "";
        } else
          e[u] = n;
        return;
      }
      var h = r.attributeName, v = r.attributeNamespace;
      if (n === null)
        e.removeAttribute(h);
      else {
        var C = r.type, D;
        C === xt || C === en && n === !0 ? D = "" : (bt(n, h), D = "" + n, r.sanitizeURL && Ji(D.toString())), v ? e.setAttributeNS(v, h, D) : e.setAttribute(h, D);
      }
    }
  }
  var da = Symbol.for("react.element"), ea = Symbol.for("react.portal"), Ia = Symbol.for("react.fragment"), pi = Symbol.for("react.strict_mode"), E = Symbol.for("react.profiler"), Z = Symbol.for("react.provider"), de = Symbol.for("react.context"), De = Symbol.for("react.forward_ref"), Ke = Symbol.for("react.suspense"), Ae = Symbol.for("react.suspense_list"), Ie = Symbol.for("react.memo"), je = Symbol.for("react.lazy"), tn = Symbol.for("react.scope"), Tt = Symbol.for("react.debug_trace_mode"), wt = Symbol.for("react.offscreen"), _n = Symbol.for("react.legacy_hidden"), Ya = Symbol.for("react.cache"), Da = Symbol.for("react.tracing_marker"), nn = Symbol.iterator, mi = "@@iterator";
  function Ca(e) {
    if (e === null || typeof e != "object")
      return null;
    var t = nn && e[nn] || e[mi];
    return typeof t == "function" ? t : null;
  }
  var qe = Object.assign, hi = 0, iu, lu, Ar, lo, oo, so, uo;
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
          log: qe({}, e, {
            value: iu
          }),
          info: qe({}, e, {
            value: lu
          }),
          warn: qe({}, e, {
            value: Ar
          }),
          error: qe({}, e, {
            value: lo
          }),
          group: qe({}, e, {
            value: oo
          }),
          groupCollapsed: qe({}, e, {
            value: so
          }),
          groupEnd: qe({}, e, {
            value: uo
          })
        });
      }
      hi < 0 && d("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
    }
  }
  var el = m.ReactCurrentDispatcher, fo;
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
    var tl = typeof WeakMap == "function" ? WeakMap : Map;
    Lr = new tl();
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
    i = el.current, el.current = null, ou();
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
      vi = !1, el.current = i, su(), Error.prepareStackTrace = r;
    }
    var D = e ? e.displayName || e.name : "", V = D ? qa(D) : "";
    return typeof e == "function" && Lr.set(e, V), V;
  }
  function nl(e, t, n) {
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
      case Ke:
        return qa("Suspense");
      case Ae:
        return qa("SuspenseList");
    }
    if (typeof e == "object")
      switch (e.$$typeof) {
        case De:
          return po(e.render);
        case Ie:
          return mo(e.type, t, n);
        case je: {
          var a = e, r = a._payload, i = a._init;
          try {
            return mo(i(r), t, n);
          } catch {
          }
        }
      }
    return "";
  }
  function Dd(e) {
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
        return nl(e.type);
      default:
        return "";
    }
  }
  function bi(e) {
    try {
      var t = "", n = e;
      do
        t += Dd(n), n = n.return;
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
  function it(e) {
    if (e == null)
      return null;
    if (typeof e.tag == "number" && d("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof e == "function")
      return e.displayName || e.name || null;
    if (typeof e == "string")
      return e;
    switch (e) {
      case Ia:
        return "Fragment";
      case ea:
        return "Portal";
      case E:
        return "Profiler";
      case pi:
        return "StrictMode";
      case Ke:
        return "Suspense";
      case Ae:
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
        case De:
          return cu(e, e.render, "ForwardRef");
        case Ie:
          var a = e.displayName || null;
          return a !== null ? a : it(e.type) || "Memo";
        case je: {
          var r = e, i = r._payload, l = r._init;
          try {
            return it(l(i));
          } catch {
            return null;
          }
        }
      }
    return null;
  }
  function Cd(e, t, n) {
    var a = t.displayName || t.name || "";
    return e.displayName || (a !== "" ? n + "(" + a + ")" : n);
  }
  function sr(e) {
    return e.displayName || "Context";
  }
  function ze(e) {
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
        return Cd(n, n.render, "ForwardRef");
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
        return it(n);
      case le:
        return n === pi ? "StrictMode" : "Mode";
      case q:
        return "Offscreen";
      case $:
        return "Profiler";
      case we:
        return "Scope";
      case te:
        return "Suspense";
      case ie:
        return "SuspenseList";
      case Y:
        return "TracingMarker";
      case j:
      case R:
      case J:
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
  var vo = m.ReactDebugCurrentFrame, Fn = null, yi = !1;
  function kr() {
    {
      if (Fn === null)
        return null;
      var e = Fn._debugOwner;
      if (e !== null && typeof e < "u")
        return ze(e);
    }
    return null;
  }
  function jd() {
    return Fn === null ? "" : bi(Fn);
  }
  function pn() {
    vo.getCurrentStack = null, Fn = null, yi = !1;
  }
  function Mt(e) {
    vo.getCurrentStack = e === null ? null : jd, Fn = e, yi = !1;
  }
  function du() {
    return Fn;
  }
  function fa(e) {
    yi = e;
  }
  function zn(e) {
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
        return Yt(e), e;
      default:
        return "";
    }
  }
  var Td = {
    button: !0,
    checkbox: !0,
    image: !0,
    hidden: !0,
    radio: !0,
    reset: !0,
    submit: !0
  };
  function go(e, t) {
    Td[t.type] || t.onChange || t.onInput || t.readOnly || t.disabled || t.value == null || d("You provided a `value` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultValue`. Otherwise, set either `onChange` or `readOnly`."), t.onChange || t.readOnly || t.disabled || t.checked == null || d("You provided a `checked` prop to a form field without an `onChange` handler. This will render a read-only field. If the field should be mutable use `defaultChecked`. Otherwise, set either `onChange` or `readOnly`.");
  }
  function fu(e) {
    var t = e.type, n = e.nodeName;
    return n && n.toLowerCase() === "input" && (t === "checkbox" || t === "radio");
  }
  function bo(e) {
    return e._valueTracker;
  }
  function al(e) {
    e._valueTracker = null;
  }
  function wd(e) {
    var t = "";
    return e && (fu(e) ? t = e.checked ? "true" : "false" : t = e.value), t;
  }
  function Ur(e) {
    var t = fu(e) ? "checked" : "value", n = Object.getOwnPropertyDescriptor(e.constructor.prototype, t);
    Yt(e[t]);
    var a = "" + e[t];
    if (!(e.hasOwnProperty(t) || typeof n > "u" || typeof n.get != "function" || typeof n.set != "function")) {
      var r = n.get, i = n.set;
      Object.defineProperty(e, t, {
        configurable: !0,
        get: function() {
          return r.call(this);
        },
        set: function(u) {
          Yt(u), a = "" + u, i.call(this, u);
        }
      }), Object.defineProperty(e, t, {
        enumerable: n.enumerable
      });
      var l = {
        getValue: function() {
          return a;
        },
        setValue: function(u) {
          Yt(u), a = "" + u;
        },
        stopTracking: function() {
          al(e), delete e[t];
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
    var n = t.getValue(), a = wd(e);
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
  var rl = !1, il = !1, ll = !1, pu = !1;
  function mu(e) {
    var t = e.type === "checkbox" || e.type === "radio";
    return t ? e.checked != null : e.value != null;
  }
  function No(e, t) {
    var n = e, a = t.checked, r = qe({}, t, {
      defaultChecked: void 0,
      defaultValue: void 0,
      value: void 0,
      checked: a ?? n._wrapperState.initialChecked
    });
    return r;
  }
  function hu(e, t) {
    go("input", t), t.checked !== void 0 && t.defaultChecked !== void 0 && !il && (d("%s contains an input of type %s with both checked and defaultChecked props. Input elements must be either controlled or uncontrolled (specify either the checked prop, or the defaultChecked prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", kr() || "A component", t.type), il = !0), t.value !== void 0 && t.defaultValue !== void 0 && !rl && (d("%s contains an input of type %s with both value and defaultValue props. Input elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled input element and remove one of these props. More info: https://reactjs.org/link/controlled-components", kr() || "A component", t.type), rl = !0);
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
      !n._wrapperState.controlled && a && !pu && (d("A component is changing an uncontrolled input to be controlled. This is likely caused by the value changing from undefined to a defined value, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), pu = !0), n._wrapperState.controlled && !a && !ll && (d("A component is changing a controlled input to be uncontrolled. This is likely caused by the value changing from a defined to undefined, which should not happen. Decide between using a controlled or uncontrolled input element for the lifetime of the component. More info: https://reactjs.org/link/controlled-components"), ll = !0);
    }
    p(e, t);
    var r = ja(t.value), i = t.type;
    if (r != null)
      i === "number" ? (r === 0 && n.value === "" || // We explicitly want to coerce to number here if possible.
      // eslint-disable-next-line
      n.value != r) && (n.value = zn(r)) : n.value !== zn(r) && (n.value = zn(r));
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
      var l = zn(a._wrapperState.initialValue);
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
      bt(n, "name");
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
    (t !== "number" || ur(e.ownerDocument) !== e) && (n == null ? e.defaultValue = zn(e._wrapperState.initialValue) : e.defaultValue !== zn(n) && (e.defaultValue = zn(n)));
  }
  var xe = !1, Ue = !1, Qe = !1;
  function mt(e, t) {
    t.value == null && (typeof t.children == "object" && t.children !== null ? o.Children.forEach(t.children, function(n) {
      n != null && (typeof n == "string" || typeof n == "number" || Ue || (Ue = !0, d("Cannot infer the option value of complex children. Pass a `value` prop or use a plain string as children to <option>.")));
    }) : t.dangerouslySetInnerHTML != null && (Qe || (Qe = !0, d("Pass a `value` prop if you set dangerouslyInnerHTML so React knows which value should be selected.")))), t.selected != null && !xe && (d("Use the `defaultValue` or `value` props on <select> instead of setting `selected` on <option>."), xe = !0);
  }
  function Et(e, t) {
    t.value != null && e.setAttribute("value", zn(ja(t.value)));
  }
  var St = Array.isArray;
  function Ge(e) {
    return St(e);
  }
  var Vt;
  Vt = !1;
  function qt() {
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
          var a = Ge(e[n]);
          e.multiple && !a ? d("The `%s` prop supplied to <select> must be an array if `multiple` is true.%s", n, qt()) : !e.multiple && a && d("The `%s` prop supplied to <select> must be a scalar value if `multiple` is false.%s", n, qt());
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
      for (var v = zn(ja(n)), C = null, D = 0; D < r.length; D++) {
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
    return qe({}, t, {
      value: void 0
    });
  }
  function So(e, t) {
    var n = e;
    xo(t), n._wrapperState = {
      wasMultiple: !!t.multiple
    }, t.value !== void 0 && t.defaultValue !== void 0 && !Vt && (d("Select elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled select element and remove one of these props. More info: https://reactjs.org/link/controlled-components"), Vt = !0);
  }
  function _d(e, t) {
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
  function Od(e, t) {
    var n = e, a = t.value;
    a != null && cr(n, !!t.multiple, a, !1);
  }
  var ev = !1;
  function Md(e, t) {
    var n = e;
    if (t.dangerouslySetInnerHTML != null)
      throw new Error("`dangerouslySetInnerHTML` does not make sense on <textarea>.");
    var a = qe({}, t, {
      value: void 0,
      defaultValue: void 0,
      children: zn(n._wrapperState.initialValue)
    });
    return a;
  }
  function tv(e, t) {
    var n = e;
    go("textarea", t), t.value !== void 0 && t.defaultValue !== void 0 && !ev && (d("%s contains a textarea with both value and defaultValue props. Textarea elements must be either controlled or uncontrolled (specify either the value prop, or the defaultValue prop, but not both). Decide between using a controlled or uncontrolled textarea and remove one of these props. More info: https://reactjs.org/link/controlled-components", kr() || "A component"), ev = !0);
    var a = t.value;
    if (a == null) {
      var r = t.children, i = t.defaultValue;
      if (r != null) {
        d("Use the `defaultValue` or `value` props instead of setting children on <textarea>.");
        {
          if (i != null)
            throw new Error("If you supply `defaultValue` on a <textarea>, do not pass children.");
          if (Ge(r)) {
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
  function nv(e, t) {
    var n = e, a = ja(t.value), r = ja(t.defaultValue);
    if (a != null) {
      var i = zn(a);
      i !== n.value && (n.value = i), t.defaultValue == null && n.defaultValue !== i && (n.defaultValue = i);
    }
    r != null && (n.defaultValue = zn(r));
  }
  function av(e, t) {
    var n = e, a = n.textContent;
    a === n._wrapperState.initialValue && a !== "" && a !== null && (n.value = a);
  }
  function Yx(e, t) {
    nv(e, t);
  }
  var dr = "http://www.w3.org/1999/xhtml", qx = "http://www.w3.org/1998/Math/MathML", Vd = "http://www.w3.org/2000/svg";
  function Ad(e) {
    switch (e) {
      case "svg":
        return Vd;
      case "math":
        return qx;
      default:
        return dr;
    }
  }
  function Ld(e, t) {
    return e == null || e === dr ? Ad(t) : e === Vd && t === "foreignObject" ? dr : e;
  }
  var Gx = function(e) {
    return typeof MSApp < "u" && MSApp.execUnsafeLocalFunction ? function(t, n, a, r) {
      MSApp.execUnsafeLocalFunction(function() {
        return e(t, n, a, r);
      });
    } : e;
  }, gu, rv = Gx(function(e, t) {
    if (e.namespaceURI === Vd && !("innerHTML" in e)) {
      gu = gu || document.createElement("div"), gu.innerHTML = "<svg>" + t.valueOf().toString() + "</svg>";
      for (var n = gu.firstChild; e.firstChild; )
        e.removeChild(e.firstChild);
      for (; n.firstChild; )
        e.appendChild(n.firstChild);
      return;
    }
    e.innerHTML = t;
  }), Wn = 1, fr = 3, Gt = 8, pr = 9, kd = 11, bu = function(e, t) {
    if (t) {
      var n = e.firstChild;
      if (n && n === e.lastChild && n.nodeType === fr) {
        n.nodeValue = t;
        return;
      }
    }
    e.textContent = t;
  }, Wx = {
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
  function Kx(e, t) {
    return e + t.charAt(0).toUpperCase() + t.substring(1);
  }
  var Qx = ["Webkit", "ms", "Moz", "O"];
  Object.keys(Ro).forEach(function(e) {
    Qx.forEach(function(t) {
      Ro[Kx(t, e)] = Ro[e];
    });
  });
  function Ud(e, t, n) {
    var a = t == null || typeof t == "boolean" || t === "";
    return a ? "" : !n && typeof t == "number" && t !== 0 && !(Ro.hasOwnProperty(e) && Ro[e]) ? t + "px" : (Dt(t, e), ("" + t).trim());
  }
  var Xx = /([A-Z])/g, Jx = /^ms-/;
  function Zx(e) {
    return e.replace(Xx, "-$1").toLowerCase().replace(Jx, "-ms-");
  }
  var iv = function() {
  };
  {
    var eE = /^(?:webkit|moz|o)[A-Z]/, tE = /^-ms-/, nE = /-(.)/g, lv = /;\s*$/, ol = {}, Fd = {}, ov = !1, sv = !1, aE = function(e) {
      return e.replace(nE, function(t, n) {
        return n.toUpperCase();
      });
    }, rE = function(e) {
      ol.hasOwnProperty(e) && ol[e] || (ol[e] = !0, d(
        "Unsupported style property %s. Did you mean %s?",
        e,
        // As Andi Smith suggests
        // (http://www.andismith.com/blog/2012/02/modernizr-prefixed/), an `-ms` prefix
        // is converted to lowercase `ms`.
        aE(e.replace(tE, "ms-"))
      ));
    }, iE = function(e) {
      ol.hasOwnProperty(e) && ol[e] || (ol[e] = !0, d("Unsupported vendor-prefixed style property %s. Did you mean %s?", e, e.charAt(0).toUpperCase() + e.slice(1)));
    }, lE = function(e, t) {
      Fd.hasOwnProperty(t) && Fd[t] || (Fd[t] = !0, d(`Style property values shouldn't contain a semicolon. Try "%s: %s" instead.`, e, t.replace(lv, "")));
    }, oE = function(e, t) {
      ov || (ov = !0, d("`NaN` is an invalid value for the `%s` css style property.", e));
    }, sE = function(e, t) {
      sv || (sv = !0, d("`Infinity` is an invalid value for the `%s` css style property.", e));
    };
    iv = function(e, t) {
      e.indexOf("-") > -1 ? rE(e) : eE.test(e) ? iE(e) : lv.test(t) && lE(e, t), typeof t == "number" && (isNaN(t) ? oE(e, t) : isFinite(t) || sE(e, t));
    };
  }
  var uE = iv;
  function cE(e) {
    {
      var t = "", n = "";
      for (var a in e)
        if (e.hasOwnProperty(a)) {
          var r = e[a];
          if (r != null) {
            var i = a.indexOf("--") === 0;
            t += n + (i ? a : Zx(a)) + ":", t += Ud(a, r, i), n = ";";
          }
        }
      return t || null;
    }
  }
  function uv(e, t) {
    var n = e.style;
    for (var a in t)
      if (t.hasOwnProperty(a)) {
        var r = a.indexOf("--") === 0;
        r || uE(a, t[a]);
        var i = Ud(a, t[a], r);
        a === "float" && (a = "cssFloat"), r ? n.setProperty(a, i) : n[a] = i;
      }
  }
  function dE(e) {
    return e == null || typeof e == "boolean" || e === "";
  }
  function cv(e) {
    var t = {};
    for (var n in e)
      for (var a = Wx[n] || [n], r = 0; r < a.length; r++)
        t[a[r]] = n;
    return t;
  }
  function fE(e, t) {
    {
      if (!t)
        return;
      var n = cv(e), a = cv(t), r = {};
      for (var i in n) {
        var l = n[i], u = a[i];
        if (u && l !== u) {
          var c = l + "," + u;
          if (r[c])
            continue;
          r[c] = !0, d("%s a style property during rerender (%s) when a conflicting property is set (%s) can lead to styling bugs. To avoid this, don't mix shorthand and non-shorthand properties for the same value; instead, replace the shorthand with separate values.", dE(e[l]) ? "Removing" : "Updating", l, u);
        }
      }
    }
  }
  var pE = {
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
  }, mE = qe({
    menuitem: !0
  }, pE), hE = "__html";
  function zd(e, t) {
    if (t) {
      if (mE[e] && (t.children != null || t.dangerouslySetInnerHTML != null))
        throw new Error(e + " is a void element tag and must neither have `children` nor use `dangerouslySetInnerHTML`.");
      if (t.dangerouslySetInnerHTML != null) {
        if (t.children != null)
          throw new Error("Can only set one of `children` or `props.dangerouslySetInnerHTML`.");
        if (typeof t.dangerouslySetInnerHTML != "object" || !(hE in t.dangerouslySetInnerHTML))
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
  }, dv = {
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
  }, sl = {}, vE = new RegExp("^(aria)-[" + se + "]*$"), gE = new RegExp("^(aria)[A-Z][" + se + "]*$");
  function bE(e, t) {
    {
      if (Q.call(sl, t) && sl[t])
        return !0;
      if (gE.test(t)) {
        var n = "aria-" + t.slice(4).toLowerCase(), a = dv.hasOwnProperty(n) ? n : null;
        if (a == null)
          return d("Invalid ARIA attribute `%s`. ARIA attributes follow the pattern aria-* and must be lowercase.", t), sl[t] = !0, !0;
        if (t !== a)
          return d("Invalid ARIA attribute `%s`. Did you mean `%s`?", t, a), sl[t] = !0, !0;
      }
      if (vE.test(t)) {
        var r = t.toLowerCase(), i = dv.hasOwnProperty(r) ? r : null;
        if (i == null)
          return sl[t] = !0, !1;
        if (t !== i)
          return d("Unknown ARIA attribute `%s`. Did you mean `%s`?", t, i), sl[t] = !0, !0;
      }
    }
    return !0;
  }
  function yE(e, t) {
    {
      var n = [];
      for (var a in t) {
        var r = bE(e, a);
        r || n.push(a);
      }
      var i = n.map(function(l) {
        return "`" + l + "`";
      }).join(", ");
      n.length === 1 ? d("Invalid aria prop %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", i, e) : n.length > 1 && d("Invalid aria props %s on <%s> tag. For details, see https://reactjs.org/link/invalid-aria-props", i, e);
    }
  }
  function NE(e, t) {
    Ei(e, t) || yE(e, t);
  }
  var fv = !1;
  function xE(e, t) {
    {
      if (e !== "input" && e !== "textarea" && e !== "select")
        return;
      t != null && t.value === null && !fv && (fv = !0, e === "select" && t.multiple ? d("`value` prop on `%s` should not be null. Consider using an empty array when `multiple` is set to `true` to clear the component or `undefined` for uncontrolled components.", e) : d("`value` prop on `%s` should not be null. Consider using an empty string to clear the component or `undefined` for uncontrolled components.", e));
    }
  }
  var pv = function() {
  };
  {
    var Pn = {}, mv = /^on./, EE = /^on[^A-Z]/, SE = new RegExp("^(aria)-[" + se + "]*$"), RE = new RegExp("^(aria)[A-Z][" + se + "]*$");
    pv = function(e, t, n, a) {
      if (Q.call(Pn, t) && Pn[t])
        return !0;
      var r = t.toLowerCase();
      if (r === "onfocusin" || r === "onfocusout")
        return d("React uses onFocus and onBlur instead of onFocusIn and onFocusOut. All React events are normalized to bubble, so onFocusIn and onFocusOut are not needed/supported by React."), Pn[t] = !0, !0;
      if (a != null) {
        var i = a.registrationNameDependencies, l = a.possibleRegistrationNames;
        if (i.hasOwnProperty(t))
          return !0;
        var u = l.hasOwnProperty(r) ? l[r] : null;
        if (u != null)
          return d("Invalid event handler property `%s`. Did you mean `%s`?", t, u), Pn[t] = !0, !0;
        if (mv.test(t))
          return d("Unknown event handler property `%s`. It will be ignored.", t), Pn[t] = !0, !0;
      } else if (mv.test(t))
        return EE.test(t) && d("Invalid event handler property `%s`. React events use the camelCase naming convention, for example `onClick`.", t), Pn[t] = !0, !0;
      if (SE.test(t) || RE.test(t))
        return !0;
      if (r === "innerhtml")
        return d("Directly setting property `innerHTML` is not permitted. For more information, lookup documentation on `dangerouslySetInnerHTML`."), Pn[t] = !0, !0;
      if (r === "aria")
        return d("The `aria` attribute is reserved for future use in React. Pass individual `aria-` attributes instead."), Pn[t] = !0, !0;
      if (r === "is" && n !== null && n !== void 0 && typeof n != "string")
        return d("Received a `%s` for a string attribute `is`. If this is expected, cast the value to a string.", typeof n), Pn[t] = !0, !0;
      if (typeof n == "number" && isNaN(n))
        return d("Received NaN for the `%s` attribute. If this is expected, cast the value to a string.", t), Pn[t] = !0, !0;
      var c = Ot(t), h = c !== null && c.type === Ft;
      if (yu.hasOwnProperty(r)) {
        var v = yu[r];
        if (v !== t)
          return d("Invalid DOM property `%s`. Did you mean `%s`?", t, v), Pn[t] = !0, !0;
      } else if (!h && t !== r)
        return d("React does not recognize the `%s` prop on a DOM element. If you intentionally want it to appear in the DOM as a custom attribute, spell it as lowercase `%s` instead. If you accidentally passed it from a parent component, remove it from the DOM element.", t, r), Pn[t] = !0, !0;
      return typeof n == "boolean" && jt(t, n, c, !1) ? (n ? d('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.', n, t, t, n, t) : d('Received `%s` for a non-boolean attribute `%s`.\n\nIf you want to write it to the DOM, pass a string instead: %s="%s" or %s={value.toString()}.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.', n, t, t, n, t, t, t), Pn[t] = !0, !0) : h ? !0 : jt(t, n, c, !1) ? (Pn[t] = !0, !1) : ((n === "false" || n === "true") && c !== null && c.type === xt && (d("Received the string `%s` for the boolean attribute `%s`. %s Did you mean %s={%s}?", n, t, n === "false" ? "The browser will interpret it as a truthy value." : 'Although this works, it will not work as expected if you pass the string "false".', t, n), Pn[t] = !0), !0);
    };
  }
  var DE = function(e, t, n) {
    {
      var a = [];
      for (var r in t) {
        var i = pv(e, r, t[r], n);
        i || a.push(r);
      }
      var l = a.map(function(u) {
        return "`" + u + "`";
      }).join(", ");
      a.length === 1 ? d("Invalid value for prop %s on <%s> tag. Either remove it from the element, or pass a string or number value to keep it in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", l, e) : a.length > 1 && d("Invalid values for props %s on <%s> tag. Either remove them from the element, or pass a string or number value to keep them in the DOM. For details, see https://reactjs.org/link/attribute-behavior ", l, e);
    }
  };
  function CE(e, t, n) {
    Ei(e, t) || DE(e, t, n);
  }
  var hv = 1, Pd = 2, Do = 4, jE = hv | Pd | Do, Co = null;
  function TE(e) {
    Co !== null && d("Expected currently replaying event to be null. This error is likely caused by a bug in React. Please file an issue."), Co = e;
  }
  function wE() {
    Co === null && d("Expected currently replaying event to not be null. This error is likely caused by a bug in React. Please file an issue."), Co = null;
  }
  function _E(e) {
    return e === Co;
  }
  function Hd(e) {
    var t = e.target || e.srcElement || window;
    return t.correspondingUseElement && (t = t.correspondingUseElement), t.nodeType === fr ? t.parentNode : t;
  }
  var Bd = null, ul = null, cl = null;
  function vv(e) {
    var t = qr(e);
    if (t) {
      if (typeof Bd != "function")
        throw new Error("setRestoreImplementation() needs to be called to handle a target for controlled events. This error is likely caused by a bug in React. Please file an issue.");
      var n = t.stateNode;
      if (n) {
        var a = tc(n);
        Bd(t.stateNode, t.type, a);
      }
    }
  }
  function OE(e) {
    Bd = e;
  }
  function gv(e) {
    ul ? cl ? cl.push(e) : cl = [e] : ul = e;
  }
  function ME() {
    return ul !== null || cl !== null;
  }
  function bv() {
    if (ul) {
      var e = ul, t = cl;
      if (ul = null, cl = null, vv(e), t)
        for (var n = 0; n < t.length; n++)
          vv(t[n]);
    }
  }
  var yv = function(e, t) {
    return e(t);
  }, Nv = function() {
  }, $d = !1;
  function VE() {
    var e = ME();
    e && (Nv(), bv());
  }
  function xv(e, t, n) {
    if ($d)
      return e(t, n);
    $d = !0;
    try {
      return yv(e, t, n);
    } finally {
      $d = !1, VE();
    }
  }
  function AE(e, t, n) {
    yv = e, Nv = n;
  }
  function LE(e) {
    return e === "button" || e === "input" || e === "select" || e === "textarea";
  }
  function kE(e, t, n) {
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
        return !!(n.disabled && LE(t));
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
    if (kE(t, e.type, a))
      return null;
    if (r && typeof r != "function")
      throw new Error("Expected `" + t + "` listener to be a function, instead got a value of `" + typeof r + "` type.");
    return r;
  }
  var Id = !1;
  if (Zt)
    try {
      var To = {};
      Object.defineProperty(To, "passive", {
        get: function() {
          Id = !0;
        }
      }), window.addEventListener("test", To, To), window.removeEventListener("test", To, To);
    } catch {
      Id = !1;
    }
  function Ev(e, t, n, a, r, i, l, u, c) {
    var h = Array.prototype.slice.call(arguments, 3);
    try {
      t.apply(n, h);
    } catch (v) {
      this.onError(v);
    }
  }
  var Sv = Ev;
  if (typeof window < "u" && typeof window.dispatchEvent == "function" && typeof document < "u" && typeof document.createEvent == "function") {
    var Yd = document.createElement("react");
    Sv = function(t, n, a, r, i, l, u, c, h) {
      if (typeof document > "u" || document === null)
        throw new Error("The `document` global was defined when React was initialized, but is not defined anymore. This can happen in a test environment if a component schedules an update from an asynchronous callback, but the test has already finished running. To solve this, you can either unmount the component at the end of your test (and ensure that any asynchronous operations get canceled in `componentWillUnmount`), or you can change the test itself to be asynchronous.");
      var v = document.createEvent("Event"), C = !1, D = !0, V = window.event, L = Object.getOwnPropertyDescriptor(window, "event");
      function H() {
        Yd.removeEventListener(B, Ce, !1), typeof window.event < "u" && window.hasOwnProperty("event") && (window.event = V);
      }
      var fe = Array.prototype.slice.call(arguments, 3);
      function Ce() {
        C = !0, H(), n.apply(a, fe), D = !1;
      }
      var Se, Ze = !1, We = !1;
      function _(O) {
        if (Se = O.error, Ze = !0, Se === null && O.colno === 0 && O.lineno === 0 && (We = !0), O.defaultPrevented && Se != null && typeof Se == "object")
          try {
            Se._suppressLogging = !0;
          } catch {
          }
      }
      var B = "react-" + (t || "invokeguardedcallback");
      if (window.addEventListener("error", _), Yd.addEventListener(B, Ce, !1), v.initEvent(B, !1, !1), Yd.dispatchEvent(v), L && Object.defineProperty(window, "event", L), C && D && (Ze ? We && (Se = new Error("A cross-origin error was thrown. React doesn't have access to the actual error object in development. See https://reactjs.org/link/crossorigin-error for more information.")) : Se = new Error(`An error was thrown inside one of your components, but React doesn't know what it was. This is likely due to browser flakiness. React does its best to preserve the "Pause on exceptions" behavior of the DevTools, which requires some DEV-mode only tricks. It's possible that these don't work in your browser. Try triggering the error in production mode, or switching to a modern browser. If you suspect that this is actually an issue with React, please file an issue.`), this.onError(Se)), window.removeEventListener("error", _), !C)
        return H(), Ev.apply(this, arguments);
    };
  }
  var UE = Sv, dl = !1, Nu = null, xu = !1, qd = null, FE = {
    onError: function(e) {
      dl = !0, Nu = e;
    }
  };
  function Gd(e, t, n, a, r, i, l, u, c) {
    dl = !1, Nu = null, UE.apply(FE, arguments);
  }
  function zE(e, t, n, a, r, i, l, u, c) {
    if (Gd.apply(this, arguments), dl) {
      var h = Wd();
      xu || (xu = !0, qd = h);
    }
  }
  function PE() {
    if (xu) {
      var e = qd;
      throw xu = !1, qd = null, e;
    }
  }
  function HE() {
    return dl;
  }
  function Wd() {
    if (dl) {
      var e = Nu;
      return dl = !1, Nu = null, e;
    } else
      throw new Error("clearCaughtError was called but no error was captured. This error is likely caused by a bug in React. Please file an issue.");
  }
  function fl(e) {
    return e._reactInternals;
  }
  function BE(e) {
    return e._reactInternals !== void 0;
  }
  function $E(e, t) {
    e._reactInternals = t;
  }
  var Oe = (
    /*                      */
    0
  ), pl = (
    /*                */
    1
  ), Wt = (
    /*                    */
    2
  ), lt = (
    /*                       */
    4
  ), Si = (
    /*                */
    16
  ), wo = (
    /*                 */
    32
  ), Rv = (
    /*                     */
    64
  ), ot = (
    /*                   */
    128
  ), mr = (
    /*            */
    256
  ), Ri = (
    /*                          */
    512
  ), ml = (
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
  ), Kd = (
    /*             */
    16384
  ), IE = (
    /*               */
    32767
  ), Eu = (
    /*                   */
    32768
  ), Hn = (
    /*                */
    65536
  ), Qd = (
    /* */
    131072
  ), Dv = (
    /*                       */
    1048576
  ), Xd = (
    /*                    */
    2097152
  ), Ci = (
    /*                 */
    4194304
  ), Jd = (
    /*                */
    8388608
  ), zr = (
    /*               */
    16777216
  ), Zd = (
    /*              */
    33554432
  ), ef = (
    // TODO: Remove Update flag from before mutation phase by re-landing Visibility
    // flag logic (see #20043)
    lt | ml | 0
  ), tf = Wt | lt | Si | wo | Ri | hr | Di, _o = lt | Rv | Ri | Di, hl = Fr | Si, vr = Ci | Jd | Xd, YE = m.ReactCurrentOwner;
  function ji(e) {
    var t = e, n = e;
    if (e.alternate)
      for (; t.return; )
        t = t.return;
    else {
      var a = t;
      do
        t = a, (t.flags & (Wt | hr)) !== Oe && (n = t.return), a = t.return;
      while (a);
    }
    return t.tag === x ? n : null;
  }
  function Cv(e) {
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
  function jv(e) {
    return e.tag === x ? e.stateNode.containerInfo : null;
  }
  function qE(e) {
    return ji(e) === e;
  }
  function GE(e) {
    {
      var t = YE.current;
      if (t !== null && t.tag === j) {
        var n = t, a = n.stateNode;
        a._warnedAboutRefsInRender || d("%s is accessing isMounted inside its render() function. render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", ze(n) || "A component"), a._warnedAboutRefsInRender = !0;
      }
    }
    var r = fl(e);
    return r ? ji(r) === r : !1;
  }
  function Tv(e) {
    if (ji(e) !== e)
      throw new Error("Unable to find node on an unmounted component.");
  }
  function wv(e) {
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
            return Tv(i), e;
          if (c === r)
            return Tv(i), t;
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
  function _v(e) {
    var t = wv(e);
    return t !== null ? Ov(t) : null;
  }
  function Ov(e) {
    if (e.tag === k || e.tag === ee)
      return e;
    for (var t = e.child; t !== null; ) {
      var n = Ov(t);
      if (n !== null)
        return n;
      t = t.sibling;
    }
    return null;
  }
  function WE(e) {
    var t = wv(e);
    return t !== null ? Mv(t) : null;
  }
  function Mv(e) {
    if (e.tag === k || e.tag === ee)
      return e;
    for (var t = e.child; t !== null; ) {
      if (t.tag !== T) {
        var n = Mv(t);
        if (n !== null)
          return n;
      }
      t = t.sibling;
    }
    return null;
  }
  var Vv = f.unstable_scheduleCallback, KE = f.unstable_cancelCallback, QE = f.unstable_shouldYield, XE = f.unstable_requestPaint, mn = f.unstable_now, JE = f.unstable_getCurrentPriorityLevel, Su = f.unstable_ImmediatePriority, nf = f.unstable_UserBlockingPriority, Ti = f.unstable_NormalPriority, ZE = f.unstable_LowPriority, af = f.unstable_IdlePriority, eS = f.unstable_yieldValue, tS = f.unstable_setDisableYieldValue, vl = null, On = null, he = null, Ga = !1, Ta = typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u";
  function nS(e) {
    if (typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ > "u")
      return !1;
    var t = __REACT_DEVTOOLS_GLOBAL_HOOK__;
    if (t.isDisabled)
      return !0;
    if (!t.supportsFiber)
      return d("The installed version of React DevTools is too old and will not work with the current version of React. Please update React DevTools. https://reactjs.org/link/react-devtools"), !0;
    try {
      tt && (e = qe({}, e, {
        getLaneLabelMap: sS,
        injectProfilingHooks: oS
      })), vl = t.inject(e), On = t;
    } catch (n) {
      d("React instrumentation encountered an error: %s.", n);
    }
    return !!t.checkDCE;
  }
  function aS(e, t) {
    if (On && typeof On.onScheduleFiberRoot == "function")
      try {
        On.onScheduleFiberRoot(vl, e, t);
      } catch (n) {
        Ga || (Ga = !0, d("React instrumentation encountered an error: %s", n));
      }
  }
  function rS(e, t) {
    if (On && typeof On.onCommitFiberRoot == "function")
      try {
        var n = (e.current.flags & ot) === ot;
        if (dt) {
          var a;
          switch (t) {
            case aa:
              a = Su;
              break;
            case br:
              a = nf;
              break;
            case yr:
              a = Ti;
              break;
            case _u:
              a = af;
              break;
            default:
              a = Ti;
              break;
          }
          On.onCommitFiberRoot(vl, e, a, n);
        }
      } catch (r) {
        Ga || (Ga = !0, d("React instrumentation encountered an error: %s", r));
      }
  }
  function iS(e) {
    if (On && typeof On.onPostCommitFiberRoot == "function")
      try {
        On.onPostCommitFiberRoot(vl, e);
      } catch (t) {
        Ga || (Ga = !0, d("React instrumentation encountered an error: %s", t));
      }
  }
  function lS(e) {
    if (On && typeof On.onCommitFiberUnmount == "function")
      try {
        On.onCommitFiberUnmount(vl, e);
      } catch (t) {
        Ga || (Ga = !0, d("React instrumentation encountered an error: %s", t));
      }
  }
  function hn(e) {
    if (typeof eS == "function" && (tS(e), b(e)), On && typeof On.setStrictMode == "function")
      try {
        On.setStrictMode(vl, e);
      } catch (t) {
        Ga || (Ga = !0, d("React instrumentation encountered an error: %s", t));
      }
  }
  function oS(e) {
    he = e;
  }
  function sS() {
    {
      for (var e = /* @__PURE__ */ new Map(), t = 1, n = 0; n < lf; n++) {
        var a = TS(t);
        e.set(t, a), t *= 2;
      }
      return e;
    }
  }
  function uS(e) {
    he !== null && typeof he.markCommitStarted == "function" && he.markCommitStarted(e);
  }
  function Av() {
    he !== null && typeof he.markCommitStopped == "function" && he.markCommitStopped();
  }
  function Oo(e) {
    he !== null && typeof he.markComponentRenderStarted == "function" && he.markComponentRenderStarted(e);
  }
  function gl() {
    he !== null && typeof he.markComponentRenderStopped == "function" && he.markComponentRenderStopped();
  }
  function cS(e) {
    he !== null && typeof he.markComponentPassiveEffectMountStarted == "function" && he.markComponentPassiveEffectMountStarted(e);
  }
  function dS() {
    he !== null && typeof he.markComponentPassiveEffectMountStopped == "function" && he.markComponentPassiveEffectMountStopped();
  }
  function fS(e) {
    he !== null && typeof he.markComponentPassiveEffectUnmountStarted == "function" && he.markComponentPassiveEffectUnmountStarted(e);
  }
  function pS() {
    he !== null && typeof he.markComponentPassiveEffectUnmountStopped == "function" && he.markComponentPassiveEffectUnmountStopped();
  }
  function mS(e) {
    he !== null && typeof he.markComponentLayoutEffectMountStarted == "function" && he.markComponentLayoutEffectMountStarted(e);
  }
  function hS() {
    he !== null && typeof he.markComponentLayoutEffectMountStopped == "function" && he.markComponentLayoutEffectMountStopped();
  }
  function Lv(e) {
    he !== null && typeof he.markComponentLayoutEffectUnmountStarted == "function" && he.markComponentLayoutEffectUnmountStarted(e);
  }
  function kv() {
    he !== null && typeof he.markComponentLayoutEffectUnmountStopped == "function" && he.markComponentLayoutEffectUnmountStopped();
  }
  function vS(e, t, n) {
    he !== null && typeof he.markComponentErrored == "function" && he.markComponentErrored(e, t, n);
  }
  function gS(e, t, n) {
    he !== null && typeof he.markComponentSuspended == "function" && he.markComponentSuspended(e, t, n);
  }
  function bS(e) {
    he !== null && typeof he.markLayoutEffectsStarted == "function" && he.markLayoutEffectsStarted(e);
  }
  function yS() {
    he !== null && typeof he.markLayoutEffectsStopped == "function" && he.markLayoutEffectsStopped();
  }
  function NS(e) {
    he !== null && typeof he.markPassiveEffectsStarted == "function" && he.markPassiveEffectsStarted(e);
  }
  function xS() {
    he !== null && typeof he.markPassiveEffectsStopped == "function" && he.markPassiveEffectsStopped();
  }
  function Uv(e) {
    he !== null && typeof he.markRenderStarted == "function" && he.markRenderStarted(e);
  }
  function ES() {
    he !== null && typeof he.markRenderYielded == "function" && he.markRenderYielded();
  }
  function Fv() {
    he !== null && typeof he.markRenderStopped == "function" && he.markRenderStopped();
  }
  function SS(e) {
    he !== null && typeof he.markRenderScheduled == "function" && he.markRenderScheduled(e);
  }
  function RS(e, t) {
    he !== null && typeof he.markForceUpdateScheduled == "function" && he.markForceUpdateScheduled(e, t);
  }
  function rf(e, t) {
    he !== null && typeof he.markStateUpdateScheduled == "function" && he.markStateUpdateScheduled(e, t);
  }
  var Te = (
    /*                         */
    0
  ), Xe = (
    /*                 */
    1
  ), ht = (
    /*                    */
    2
  ), Pt = (
    /*               */
    8
  ), Wa = (
    /*              */
    16
  ), zv = Math.clz32 ? Math.clz32 : jS, DS = Math.log, CS = Math.LN2;
  function jS(e) {
    var t = e >>> 0;
    return t === 0 ? 32 : 31 - (DS(t) / CS | 0) | 0;
  }
  var lf = 31, X = (
    /*                        */
    0
  ), vn = (
    /*                          */
    0
  ), Le = (
    /*                        */
    1
  ), bl = (
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
  ), yl = (
    /*                       */
    4194240
  ), Vo = (
    /*                        */
    64
  ), of = (
    /*                        */
    128
  ), sf = (
    /*                        */
    256
  ), uf = (
    /*                        */
    512
  ), cf = (
    /*                        */
    1024
  ), df = (
    /*                        */
    2048
  ), ff = (
    /*                        */
    4096
  ), pf = (
    /*                        */
    8192
  ), mf = (
    /*                        */
    16384
  ), hf = (
    /*                       */
    32768
  ), vf = (
    /*                       */
    65536
  ), gf = (
    /*                       */
    131072
  ), bf = (
    /*                       */
    262144
  ), yf = (
    /*                       */
    524288
  ), Nf = (
    /*                       */
    1048576
  ), xf = (
    /*                       */
    2097152
  ), Ru = (
    /*                            */
    130023424
  ), Nl = (
    /*                             */
    4194304
  ), Ef = (
    /*                             */
    8388608
  ), Sf = (
    /*                             */
    16777216
  ), Rf = (
    /*                             */
    33554432
  ), Df = (
    /*                             */
    67108864
  ), Pv = Nl, Ao = (
    /*          */
    134217728
  ), Hv = (
    /*                          */
    268435455
  ), Lo = (
    /*               */
    268435456
  ), _i = (
    /*                        */
    536870912
  ), ta = (
    /*                   */
    1073741824
  );
  function TS(e) {
    {
      if (e & Le)
        return "Sync";
      if (e & bl)
        return "InputContinuousHydration";
      if (e & gr)
        return "InputContinuous";
      if (e & wi)
        return "DefaultHydration";
      if (e & Ka)
        return "Default";
      if (e & Mo)
        return "TransitionHydration";
      if (e & yl)
        return "Transition";
      if (e & Ru)
        return "Retry";
      if (e & Ao)
        return "SelectiveHydration";
      if (e & Lo)
        return "IdleHydration";
      if (e & _i)
        return "Idle";
      if (e & ta)
        return "Offscreen";
    }
  }
  var Rt = -1, Du = Vo, Cu = Nl;
  function ko(e) {
    switch (Oi(e)) {
      case Le:
        return Le;
      case bl:
        return bl;
      case gr:
        return gr;
      case wi:
        return wi;
      case Ka:
        return Ka;
      case Mo:
        return Mo;
      case Vo:
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
      case Nf:
      case xf:
        return e & yl;
      case Nl:
      case Ef:
      case Sf:
      case Rf:
      case Df:
        return e & Ru;
      case Ao:
        return Ao;
      case Lo:
        return Lo;
      case _i:
        return _i;
      case ta:
        return ta;
      default:
        return d("Should have found matching lanes. This is a bug in React."), e;
    }
  }
  function ju(e, t) {
    var n = e.pendingLanes;
    if (n === X)
      return X;
    var a = X, r = e.suspendedLanes, i = e.pingedLanes, l = n & Hv;
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
        v === Ka && (C & yl) !== X
      )
        return t;
    }
    (a & gr) !== X && (a |= n & Ka);
    var D = e.entangledLanes;
    if (D !== X)
      for (var V = e.entanglements, L = a & D; L > 0; ) {
        var H = Mi(L), fe = 1 << H;
        a |= V[H], L &= ~fe;
      }
    return a;
  }
  function wS(e, t) {
    for (var n = e.eventTimes, a = Rt; t > 0; ) {
      var r = Mi(t), i = 1 << r, l = n[r];
      l > a && (a = l), t &= ~i;
    }
    return a;
  }
  function _S(e, t) {
    switch (e) {
      case Le:
      case bl:
      case gr:
        return t + 250;
      case wi:
      case Ka:
      case Mo:
      case Vo:
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
      case Nf:
      case xf:
        return t + 5e3;
      case Nl:
      case Ef:
      case Sf:
      case Rf:
      case Df:
        return Rt;
      case Ao:
      case Lo:
      case _i:
      case ta:
        return Rt;
      default:
        return d("Should have found matching lanes. This is a bug in React."), Rt;
    }
  }
  function OS(e, t) {
    for (var n = e.pendingLanes, a = e.suspendedLanes, r = e.pingedLanes, i = e.expirationTimes, l = n; l > 0; ) {
      var u = Mi(l), c = 1 << u, h = i[u];
      h === Rt ? ((c & a) === X || (c & r) !== X) && (i[u] = _S(c, t)) : h <= t && (e.expiredLanes |= c), l &= ~c;
    }
  }
  function MS(e) {
    return ko(e.pendingLanes);
  }
  function Cf(e) {
    var t = e.pendingLanes & ~ta;
    return t !== X ? t : t & ta ? ta : X;
  }
  function VS(e) {
    return (e & Le) !== X;
  }
  function jf(e) {
    return (e & Hv) !== X;
  }
  function Bv(e) {
    return (e & Ru) === e;
  }
  function AS(e) {
    var t = Le | gr | Ka;
    return (e & t) === X;
  }
  function LS(e) {
    return (e & yl) === e;
  }
  function Tu(e, t) {
    var n = bl | gr | wi | Ka;
    return (t & n) !== X;
  }
  function kS(e, t) {
    return (t & e.expiredLanes) !== X;
  }
  function $v(e) {
    return (e & yl) !== X;
  }
  function Iv() {
    var e = Du;
    return Du <<= 1, (Du & yl) === X && (Du = Vo), e;
  }
  function US() {
    var e = Cu;
    return Cu <<= 1, (Cu & Ru) === X && (Cu = Nl), e;
  }
  function Oi(e) {
    return e & -e;
  }
  function Uo(e) {
    return Oi(e);
  }
  function Mi(e) {
    return 31 - zv(e);
  }
  function Tf(e) {
    return Mi(e);
  }
  function na(e, t) {
    return (e & t) !== X;
  }
  function xl(e, t) {
    return (e & t) === t;
  }
  function Ye(e, t) {
    return e | t;
  }
  function wu(e, t) {
    return e & ~t;
  }
  function Yv(e, t) {
    return e & t;
  }
  function tO(e) {
    return e;
  }
  function FS(e, t) {
    return e !== vn && e < t ? e : t;
  }
  function wf(e) {
    for (var t = [], n = 0; n < lf; n++)
      t.push(e);
    return t;
  }
  function Fo(e, t, n) {
    e.pendingLanes |= t, t !== _i && (e.suspendedLanes = X, e.pingedLanes = X);
    var a = e.eventTimes, r = Tf(t);
    a[r] = n;
  }
  function zS(e, t) {
    e.suspendedLanes |= t, e.pingedLanes &= ~t;
    for (var n = e.expirationTimes, a = t; a > 0; ) {
      var r = Mi(a), i = 1 << r;
      n[r] = Rt, a &= ~i;
    }
  }
  function qv(e, t, n) {
    e.pingedLanes |= e.suspendedLanes & t;
  }
  function PS(e, t) {
    var n = e.pendingLanes & ~t;
    e.pendingLanes = t, e.suspendedLanes = X, e.pingedLanes = X, e.expiredLanes &= t, e.mutableReadLanes &= t, e.entangledLanes &= t;
    for (var a = e.entanglements, r = e.eventTimes, i = e.expirationTimes, l = n; l > 0; ) {
      var u = Mi(l), c = 1 << u;
      a[u] = X, r[u] = Rt, i[u] = Rt, l &= ~c;
    }
  }
  function _f(e, t) {
    for (var n = e.entangledLanes |= t, a = e.entanglements, r = n; r; ) {
      var i = Mi(r), l = 1 << i;
      // Is this one of the newly entangled lanes?
      l & t | // Is this lane transitively entangled with the newly entangled lanes?
      a[i] & t && (a[i] |= t), r &= ~l;
    }
  }
  function HS(e, t) {
    var n = Oi(t), a;
    switch (n) {
      case gr:
        a = bl;
        break;
      case Ka:
        a = wi;
        break;
      case Vo:
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
      case Nf:
      case xf:
      case Nl:
      case Ef:
      case Sf:
      case Rf:
      case Df:
        a = Mo;
        break;
      case _i:
        a = Lo;
        break;
      default:
        a = vn;
        break;
    }
    return (a & (e.suspendedLanes | t)) !== vn ? vn : a;
  }
  function Gv(e, t, n) {
    if (Ta)
      for (var a = e.pendingUpdatersLaneMap; n > 0; ) {
        var r = Tf(n), i = 1 << r, l = a[r];
        l.add(t), n &= ~i;
      }
  }
  function Wv(e, t) {
    if (Ta)
      for (var n = e.pendingUpdatersLaneMap, a = e.memoizedUpdaters; t > 0; ) {
        var r = Tf(t), i = 1 << r, l = n[r];
        l.size > 0 && (l.forEach(function(u) {
          var c = u.alternate;
          (c === null || !a.has(c)) && a.add(u);
        }), l.clear()), t &= ~i;
      }
  }
  function Kv(e, t) {
    return null;
  }
  var aa = Le, br = gr, yr = Ka, _u = _i, zo = vn;
  function wa() {
    return zo;
  }
  function gn(e) {
    zo = e;
  }
  function BS(e, t) {
    var n = zo;
    try {
      return zo = e, t();
    } finally {
      zo = n;
    }
  }
  function $S(e, t) {
    return e !== 0 && e < t ? e : t;
  }
  function IS(e, t) {
    return e > t ? e : t;
  }
  function Of(e, t) {
    return e !== 0 && e < t;
  }
  function Qv(e) {
    var t = Oi(e);
    return Of(aa, t) ? Of(br, t) ? jf(t) ? yr : _u : br : aa;
  }
  function Ou(e) {
    var t = e.current.memoizedState;
    return t.isDehydrated;
  }
  var Xv;
  function YS(e) {
    Xv = e;
  }
  function qS(e) {
    Xv(e);
  }
  var Mf;
  function GS(e) {
    Mf = e;
  }
  var Jv;
  function WS(e) {
    Jv = e;
  }
  var Zv;
  function KS(e) {
    Zv = e;
  }
  var eg;
  function QS(e) {
    eg = e;
  }
  var Vf = !1, Mu = [], Pr = null, Hr = null, Br = null, Po = /* @__PURE__ */ new Map(), Ho = /* @__PURE__ */ new Map(), $r = [], XS = [
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
  function JS(e) {
    return XS.indexOf(e) > -1;
  }
  function ZS(e, t, n, a, r) {
    return {
      blockedOn: e,
      domEventName: t,
      eventSystemFlags: n,
      nativeEvent: r,
      targetContainers: [a]
    };
  }
  function tg(e, t) {
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
      var l = ZS(t, n, a, r, i);
      if (t !== null) {
        var u = qr(t);
        u !== null && Mf(u);
      }
      return l;
    }
    e.eventSystemFlags |= a;
    var c = e.targetContainers;
    return r !== null && c.indexOf(r) === -1 && c.push(r), e;
  }
  function e0(e, t, n, a, r) {
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
  function ng(e) {
    var t = Li(e.target);
    if (t !== null) {
      var n = ji(t);
      if (n !== null) {
        var a = n.tag;
        if (a === te) {
          var r = Cv(n);
          if (r !== null) {
            e.blockedOn = r, eg(e.priority, function() {
              Jv(n);
            });
            return;
          }
        } else if (a === x) {
          var i = n.stateNode;
          if (Ou(i)) {
            e.blockedOn = jv(n);
            return;
          }
        }
      }
    }
    e.blockedOn = null;
  }
  function t0(e) {
    for (var t = Zv(), n = {
      blockedOn: null,
      target: e,
      priority: t
    }, a = 0; a < $r.length && Of(t, $r[a].priority); a++)
      ;
    $r.splice(a, 0, n), a === 0 && ng(n);
  }
  function Vu(e) {
    if (e.blockedOn !== null)
      return !1;
    for (var t = e.targetContainers; t.length > 0; ) {
      var n = t[0], a = kf(e.domEventName, e.eventSystemFlags, n, e.nativeEvent);
      if (a === null) {
        var r = e.nativeEvent, i = new r.constructor(r.type, r);
        TE(i), r.target.dispatchEvent(i), wE();
      } else {
        var l = qr(a);
        return l !== null && Mf(l), e.blockedOn = a, !1;
      }
      t.shift();
    }
    return !0;
  }
  function ag(e, t, n) {
    Vu(e) && n.delete(t);
  }
  function n0() {
    Vf = !1, Pr !== null && Vu(Pr) && (Pr = null), Hr !== null && Vu(Hr) && (Hr = null), Br !== null && Vu(Br) && (Br = null), Po.forEach(ag), Ho.forEach(ag);
  }
  function $o(e, t) {
    e.blockedOn === t && (e.blockedOn = null, Vf || (Vf = !0, f.unstable_scheduleCallback(f.unstable_NormalPriority, n0)));
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
      ng(l), l.blockedOn === null && $r.shift();
    }
  }
  var El = m.ReactCurrentBatchConfig, Af = !0;
  function rg(e) {
    Af = !!e;
  }
  function a0() {
    return Af;
  }
  function r0(e, t, n) {
    var a = ig(t), r;
    switch (a) {
      case aa:
        r = i0;
        break;
      case br:
        r = l0;
        break;
      case yr:
      default:
        r = Lf;
        break;
    }
    return r.bind(null, t, n, e);
  }
  function i0(e, t, n, a) {
    var r = wa(), i = El.transition;
    El.transition = null;
    try {
      gn(aa), Lf(e, t, n, a);
    } finally {
      gn(r), El.transition = i;
    }
  }
  function l0(e, t, n, a) {
    var r = wa(), i = El.transition;
    El.transition = null;
    try {
      gn(br), Lf(e, t, n, a);
    } finally {
      gn(r), El.transition = i;
    }
  }
  function Lf(e, t, n, a) {
    Af && o0(e, t, n, a);
  }
  function o0(e, t, n, a) {
    var r = kf(e, t, n, a);
    if (r === null) {
      Qf(e, t, a, Au, n), tg(e, a);
      return;
    }
    if (e0(r, e, t, n, a)) {
      a.stopPropagation();
      return;
    }
    if (tg(e, a), t & Do && JS(e)) {
      for (; r !== null; ) {
        var i = qr(r);
        i !== null && qS(i);
        var l = kf(e, t, n, a);
        if (l === null && Qf(e, t, a, Au, n), l === r)
          break;
        r = l;
      }
      r !== null && a.stopPropagation();
      return;
    }
    Qf(e, t, a, null, n);
  }
  var Au = null;
  function kf(e, t, n, a) {
    Au = null;
    var r = Hd(a), i = Li(r);
    if (i !== null) {
      var l = ji(i);
      if (l === null)
        i = null;
      else {
        var u = l.tag;
        if (u === te) {
          var c = Cv(l);
          if (c !== null)
            return c;
          i = null;
        } else if (u === x) {
          var h = l.stateNode;
          if (Ou(h))
            return jv(l);
          i = null;
        } else l !== i && (i = null);
      }
    }
    return Au = i, null;
  }
  function ig(e) {
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
        return aa;
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
        var t = JE();
        switch (t) {
          case Su:
            return aa;
          case nf:
            return br;
          case Ti:
          case ZE:
            return yr;
          case af:
            return _u;
          default:
            return yr;
        }
      }
      default:
        return yr;
    }
  }
  function s0(e, t, n) {
    return e.addEventListener(t, n, !1), n;
  }
  function u0(e, t, n) {
    return e.addEventListener(t, n, !0), n;
  }
  function c0(e, t, n, a) {
    return e.addEventListener(t, n, {
      capture: !0,
      passive: a
    }), n;
  }
  function d0(e, t, n, a) {
    return e.addEventListener(t, n, {
      passive: a
    }), n;
  }
  var Yo = null, Uf = null, qo = null;
  function f0(e) {
    return Yo = e, Uf = og(), !0;
  }
  function p0() {
    Yo = null, Uf = null, qo = null;
  }
  function lg() {
    if (qo)
      return qo;
    var e, t = Uf, n = t.length, a, r = og(), i = r.length;
    for (e = 0; e < n && t[e] === r[e]; e++)
      ;
    var l = n - e;
    for (a = 1; a <= l && t[n - a] === r[i - a]; a++)
      ;
    var u = a > 1 ? 1 - a : void 0;
    return qo = r.slice(e, u), qo;
  }
  function og() {
    return "value" in Yo ? Yo.value : Yo.textContent;
  }
  function Lu(e) {
    var t, n = e.keyCode;
    return "charCode" in e ? (t = e.charCode, t === 0 && n === 13 && (t = 13)) : t = n, t === 10 && (t = 13), t >= 32 || t === 13 ? t : 0;
  }
  function ku() {
    return !0;
  }
  function sg() {
    return !1;
  }
  function ra(e) {
    function t(n, a, r, i, l) {
      this._reactName = n, this._targetInst = r, this.type = a, this.nativeEvent = i, this.target = l, this.currentTarget = null;
      for (var u in e)
        if (e.hasOwnProperty(u)) {
          var c = e[u];
          c ? this[u] = c(i) : this[u] = i[u];
        }
      var h = i.defaultPrevented != null ? i.defaultPrevented : i.returnValue === !1;
      return h ? this.isDefaultPrevented = ku : this.isDefaultPrevented = sg, this.isPropagationStopped = sg, this;
    }
    return qe(t.prototype, {
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
  var Sl = {
    eventPhase: 0,
    bubbles: 0,
    cancelable: 0,
    timeStamp: function(e) {
      return e.timeStamp || Date.now();
    },
    defaultPrevented: 0,
    isTrusted: 0
  }, Ff = ra(Sl), Go = qe({}, Sl, {
    view: 0,
    detail: 0
  }), m0 = ra(Go), zf, Pf, Wo;
  function h0(e) {
    e !== Wo && (Wo && e.type === "mousemove" ? (zf = e.screenX - Wo.screenX, Pf = e.screenY - Wo.screenY) : (zf = 0, Pf = 0), Wo = e);
  }
  var Uu = qe({}, Go, {
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
    getModifierState: Bf,
    button: 0,
    buttons: 0,
    relatedTarget: function(e) {
      return e.relatedTarget === void 0 ? e.fromElement === e.srcElement ? e.toElement : e.fromElement : e.relatedTarget;
    },
    movementX: function(e) {
      return "movementX" in e ? e.movementX : (h0(e), zf);
    },
    movementY: function(e) {
      return "movementY" in e ? e.movementY : Pf;
    }
  }), ug = ra(Uu), v0 = qe({}, Uu, {
    dataTransfer: 0
  }), g0 = ra(v0), b0 = qe({}, Go, {
    relatedTarget: 0
  }), Hf = ra(b0), y0 = qe({}, Sl, {
    animationName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), N0 = ra(y0), x0 = qe({}, Sl, {
    clipboardData: function(e) {
      return "clipboardData" in e ? e.clipboardData : window.clipboardData;
    }
  }), E0 = ra(x0), S0 = qe({}, Sl, {
    data: 0
  }), cg = ra(S0), R0 = cg, D0 = {
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
  }, C0 = {
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
  function j0(e) {
    if (e.key) {
      var t = D0[e.key] || e.key;
      if (t !== "Unidentified")
        return t;
    }
    if (e.type === "keypress") {
      var n = Lu(e);
      return n === 13 ? "Enter" : String.fromCharCode(n);
    }
    return e.type === "keydown" || e.type === "keyup" ? C0[e.keyCode] || "Unidentified" : "";
  }
  var T0 = {
    Alt: "altKey",
    Control: "ctrlKey",
    Meta: "metaKey",
    Shift: "shiftKey"
  };
  function w0(e) {
    var t = this, n = t.nativeEvent;
    if (n.getModifierState)
      return n.getModifierState(e);
    var a = T0[e];
    return a ? !!n[a] : !1;
  }
  function Bf(e) {
    return w0;
  }
  var _0 = qe({}, Go, {
    key: j0,
    code: 0,
    location: 0,
    ctrlKey: 0,
    shiftKey: 0,
    altKey: 0,
    metaKey: 0,
    repeat: 0,
    locale: 0,
    getModifierState: Bf,
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
  }), O0 = ra(_0), M0 = qe({}, Uu, {
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
  }), dg = ra(M0), V0 = qe({}, Go, {
    touches: 0,
    targetTouches: 0,
    changedTouches: 0,
    altKey: 0,
    metaKey: 0,
    ctrlKey: 0,
    shiftKey: 0,
    getModifierState: Bf
  }), A0 = ra(V0), L0 = qe({}, Sl, {
    propertyName: 0,
    elapsedTime: 0,
    pseudoElement: 0
  }), k0 = ra(L0), U0 = qe({}, Uu, {
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
  }), F0 = ra(U0), z0 = [9, 13, 27, 32], fg = 229, $f = Zt && "CompositionEvent" in window, Ko = null;
  Zt && "documentMode" in document && (Ko = document.documentMode);
  var P0 = Zt && "TextEvent" in window && !Ko, pg = Zt && (!$f || Ko && Ko > 8 && Ko <= 11), mg = 32, hg = String.fromCharCode(mg);
  function H0() {
    Xt("onBeforeInput", ["compositionend", "keypress", "textInput", "paste"]), Xt("onCompositionEnd", ["compositionend", "focusout", "keydown", "keypress", "keyup", "mousedown"]), Xt("onCompositionStart", ["compositionstart", "focusout", "keydown", "keypress", "keyup", "mousedown"]), Xt("onCompositionUpdate", ["compositionupdate", "focusout", "keydown", "keypress", "keyup", "mousedown"]);
  }
  var vg = !1;
  function B0(e) {
    return (e.ctrlKey || e.altKey || e.metaKey) && // ctrlKey && altKey is equivalent to AltGr, and is not a command.
    !(e.ctrlKey && e.altKey);
  }
  function $0(e) {
    switch (e) {
      case "compositionstart":
        return "onCompositionStart";
      case "compositionend":
        return "onCompositionEnd";
      case "compositionupdate":
        return "onCompositionUpdate";
    }
  }
  function I0(e, t) {
    return e === "keydown" && t.keyCode === fg;
  }
  function gg(e, t) {
    switch (e) {
      case "keyup":
        return z0.indexOf(t.keyCode) !== -1;
      case "keydown":
        return t.keyCode !== fg;
      case "keypress":
      case "mousedown":
      case "focusout":
        return !0;
      default:
        return !1;
    }
  }
  function bg(e) {
    var t = e.detail;
    return typeof t == "object" && "data" in t ? t.data : null;
  }
  function yg(e) {
    return e.locale === "ko";
  }
  var Rl = !1;
  function Y0(e, t, n, a, r) {
    var i, l;
    if ($f ? i = $0(t) : Rl ? gg(t, a) && (i = "onCompositionEnd") : I0(t, a) && (i = "onCompositionStart"), !i)
      return null;
    pg && !yg(a) && (!Rl && i === "onCompositionStart" ? Rl = f0(r) : i === "onCompositionEnd" && Rl && (l = lg()));
    var u = Bu(n, i);
    if (u.length > 0) {
      var c = new cg(i, t, null, a, r);
      if (e.push({
        event: c,
        listeners: u
      }), l)
        c.data = l;
      else {
        var h = bg(a);
        h !== null && (c.data = h);
      }
    }
  }
  function q0(e, t) {
    switch (e) {
      case "compositionend":
        return bg(t);
      case "keypress":
        var n = t.which;
        return n !== mg ? null : (vg = !0, hg);
      case "textInput":
        var a = t.data;
        return a === hg && vg ? null : a;
      default:
        return null;
    }
  }
  function G0(e, t) {
    if (Rl) {
      if (e === "compositionend" || !$f && gg(e, t)) {
        var n = lg();
        return p0(), Rl = !1, n;
      }
      return null;
    }
    switch (e) {
      case "paste":
        return null;
      case "keypress":
        if (!B0(t)) {
          if (t.char && t.char.length > 1)
            return t.char;
          if (t.which)
            return String.fromCharCode(t.which);
        }
        return null;
      case "compositionend":
        return pg && !yg(t) ? null : t.data;
      default:
        return null;
    }
  }
  function W0(e, t, n, a, r) {
    var i;
    if (P0 ? i = q0(t, a) : i = G0(t, a), !i)
      return null;
    var l = Bu(n, "onBeforeInput");
    if (l.length > 0) {
      var u = new R0("onBeforeInput", "beforeinput", null, a, r);
      e.push({
        event: u,
        listeners: l
      }), u.data = i;
    }
  }
  function K0(e, t, n, a, r, i, l) {
    Y0(e, t, n, a, r), W0(e, t, n, a, r);
  }
  var Q0 = {
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
  function Ng(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t === "input" ? !!Q0[e.type] : t === "textarea";
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
  function X0(e) {
    if (!Zt)
      return !1;
    var t = "on" + e, n = t in document;
    if (!n) {
      var a = document.createElement("div");
      a.setAttribute(t, "return;"), n = typeof a[t] == "function";
    }
    return n;
  }
  function J0() {
    Xt("onChange", ["change", "click", "focusin", "focusout", "input", "keydown", "keyup", "selectionchange"]);
  }
  function xg(e, t, n, a) {
    gv(a);
    var r = Bu(t, "onChange");
    if (r.length > 0) {
      var i = new Ff("onChange", "change", null, n, a);
      e.push({
        event: i,
        listeners: r
      });
    }
  }
  var Qo = null, Xo = null;
  function Z0(e) {
    var t = e.nodeName && e.nodeName.toLowerCase();
    return t === "select" || t === "input" && e.type === "file";
  }
  function eR(e) {
    var t = [];
    xg(t, Xo, e, Hd(e)), xv(tR, t);
  }
  function tR(e) {
    zg(e, 0);
  }
  function Fu(e) {
    var t = _l(e);
    if (yo(t))
      return e;
  }
  function nR(e, t) {
    if (e === "change")
      return t;
  }
  var Eg = !1;
  Zt && (Eg = X0("input") && (!document.documentMode || document.documentMode > 9));
  function aR(e, t) {
    Qo = e, Xo = t, Qo.attachEvent("onpropertychange", Rg);
  }
  function Sg() {
    Qo && (Qo.detachEvent("onpropertychange", Rg), Qo = null, Xo = null);
  }
  function Rg(e) {
    e.propertyName === "value" && Fu(Xo) && eR(e);
  }
  function rR(e, t, n) {
    e === "focusin" ? (Sg(), aR(t, n)) : e === "focusout" && Sg();
  }
  function iR(e, t) {
    if (e === "selectionchange" || e === "keyup" || e === "keydown")
      return Fu(Xo);
  }
  function lR(e) {
    var t = e.nodeName;
    return t && t.toLowerCase() === "input" && (e.type === "checkbox" || e.type === "radio");
  }
  function oR(e, t) {
    if (e === "click")
      return Fu(t);
  }
  function sR(e, t) {
    if (e === "input" || e === "change")
      return Fu(t);
  }
  function uR(e) {
    var t = e._wrapperState;
    !t || !t.controlled || e.type !== "number" || _e(e, "number", e.value);
  }
  function cR(e, t, n, a, r, i, l) {
    var u = n ? _l(n) : window, c, h;
    if (Z0(u) ? c = nR : Ng(u) ? Eg ? c = sR : (c = iR, h = rR) : lR(u) && (c = oR), c) {
      var v = c(t, n);
      if (v) {
        xg(e, v, a, r);
        return;
      }
    }
    h && h(t, u, n), t === "focusout" && uR(u);
  }
  function dR() {
    Jt("onMouseEnter", ["mouseout", "mouseover"]), Jt("onMouseLeave", ["mouseout", "mouseover"]), Jt("onPointerEnter", ["pointerout", "pointerover"]), Jt("onPointerLeave", ["pointerout", "pointerover"]);
  }
  function fR(e, t, n, a, r, i, l) {
    var u = t === "mouseover" || t === "pointerover", c = t === "mouseout" || t === "pointerout";
    if (u && !_E(a)) {
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
        var fe = ug, Ce = "onMouseLeave", Se = "onMouseEnter", Ze = "mouse";
        (t === "pointerout" || t === "pointerover") && (fe = dg, Ce = "onPointerLeave", Se = "onPointerEnter", Ze = "pointer");
        var We = D == null ? v : _l(D), _ = V == null ? v : _l(V), B = new fe(Ce, Ze + "leave", D, a, r);
        B.target = We, B.relatedTarget = _;
        var O = null, ne = Li(r);
        if (ne === n) {
          var ge = new fe(Se, Ze + "enter", V, a, r);
          ge.target = _, ge.relatedTarget = We, O = ge;
        }
        kR(e, B, O, D, V);
      }
    }
  }
  function pR(e, t) {
    return e === t && (e !== 0 || 1 / e === 1 / t) || e !== e && t !== t;
  }
  var ia = typeof Object.is == "function" ? Object.is : pR;
  function Jo(e, t) {
    if (ia(e, t))
      return !0;
    if (typeof e != "object" || e === null || typeof t != "object" || t === null)
      return !1;
    var n = Object.keys(e), a = Object.keys(t);
    if (n.length !== a.length)
      return !1;
    for (var r = 0; r < n.length; r++) {
      var i = n[r];
      if (!Q.call(t, i) || !ia(e[i], t[i]))
        return !1;
    }
    return !0;
  }
  function Dg(e) {
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
  function Cg(e, t) {
    for (var n = Dg(e), a = 0, r = 0; n; ) {
      if (n.nodeType === fr) {
        if (r = a + n.textContent.length, a <= t && r >= t)
          return {
            node: n,
            offset: t - a
          };
        a = r;
      }
      n = Dg(mR(n));
    }
  }
  function hR(e) {
    var t = e.ownerDocument, n = t && t.defaultView || window, a = n.getSelection && n.getSelection();
    if (!a || a.rangeCount === 0)
      return null;
    var r = a.anchorNode, i = a.anchorOffset, l = a.focusNode, u = a.focusOffset;
    try {
      r.nodeType, l.nodeType;
    } catch {
      return null;
    }
    return vR(e, r, i, l, u);
  }
  function vR(e, t, n, a, r) {
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
  function gR(e, t) {
    var n = e.ownerDocument || document, a = n && n.defaultView || window;
    if (a.getSelection) {
      var r = a.getSelection(), i = e.textContent.length, l = Math.min(t.start, i), u = t.end === void 0 ? l : Math.min(t.end, i);
      if (!r.extend && l > u) {
        var c = u;
        u = l, l = c;
      }
      var h = Cg(e, l), v = Cg(e, u);
      if (h && v) {
        if (r.rangeCount === 1 && r.anchorNode === h.node && r.anchorOffset === h.offset && r.focusNode === v.node && r.focusOffset === v.offset)
          return;
        var C = n.createRange();
        C.setStart(h.node, h.offset), r.removeAllRanges(), l > u ? (r.addRange(C), r.extend(v.node, v.offset)) : (C.setEnd(v.node, v.offset), r.addRange(C));
      }
    }
  }
  function jg(e) {
    return e && e.nodeType === fr;
  }
  function Tg(e, t) {
    return !e || !t ? !1 : e === t ? !0 : jg(e) ? !1 : jg(t) ? Tg(e, t.parentNode) : "contains" in e ? e.contains(t) : e.compareDocumentPosition ? !!(e.compareDocumentPosition(t) & 16) : !1;
  }
  function bR(e) {
    return e && e.ownerDocument && Tg(e.ownerDocument.documentElement, e);
  }
  function yR(e) {
    try {
      return typeof e.contentWindow.location.href == "string";
    } catch {
      return !1;
    }
  }
  function wg() {
    for (var e = window, t = ur(); t instanceof e.HTMLIFrameElement; ) {
      if (yR(t))
        e = t.contentWindow;
      else
        return t;
      t = ur(e.document);
    }
    return t;
  }
  function If(e) {
    var t = e && e.nodeName && e.nodeName.toLowerCase();
    return t && (t === "input" && (e.type === "text" || e.type === "search" || e.type === "tel" || e.type === "url" || e.type === "password") || t === "textarea" || e.contentEditable === "true");
  }
  function NR() {
    var e = wg();
    return {
      focusedElem: e,
      selectionRange: If(e) ? ER(e) : null
    };
  }
  function xR(e) {
    var t = wg(), n = e.focusedElem, a = e.selectionRange;
    if (t !== n && bR(n)) {
      a !== null && If(n) && SR(n, a);
      for (var r = [], i = n; i = i.parentNode; )
        i.nodeType === Wn && r.push({
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
  function ER(e) {
    var t;
    return "selectionStart" in e ? t = {
      start: e.selectionStart,
      end: e.selectionEnd
    } : t = hR(e), t || {
      start: 0,
      end: 0
    };
  }
  function SR(e, t) {
    var n = t.start, a = t.end;
    a === void 0 && (a = n), "selectionStart" in e ? (e.selectionStart = n, e.selectionEnd = Math.min(a, e.value.length)) : gR(e, t);
  }
  var RR = Zt && "documentMode" in document && document.documentMode <= 11;
  function DR() {
    Xt("onSelect", ["focusout", "contextmenu", "dragend", "focusin", "keydown", "keyup", "mousedown", "mouseup", "selectionchange"]);
  }
  var Dl = null, Yf = null, Zo = null, qf = !1;
  function CR(e) {
    if ("selectionStart" in e && If(e))
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
  function jR(e) {
    return e.window === e ? e.document : e.nodeType === pr ? e : e.ownerDocument;
  }
  function _g(e, t, n) {
    var a = jR(n);
    if (!(qf || Dl == null || Dl !== ur(a))) {
      var r = CR(Dl);
      if (!Zo || !Jo(Zo, r)) {
        Zo = r;
        var i = Bu(Yf, "onSelect");
        if (i.length > 0) {
          var l = new Ff("onSelect", "select", null, t, n);
          e.push({
            event: l,
            listeners: i
          }), l.target = Dl;
        }
      }
    }
  }
  function TR(e, t, n, a, r, i, l) {
    var u = n ? _l(n) : window;
    switch (t) {
      case "focusin":
        (Ng(u) || u.contentEditable === "true") && (Dl = u, Yf = n, Zo = null);
        break;
      case "focusout":
        Dl = null, Yf = null, Zo = null;
        break;
      case "mousedown":
        qf = !0;
        break;
      case "contextmenu":
      case "mouseup":
      case "dragend":
        qf = !1, _g(e, a, r);
        break;
      case "selectionchange":
        if (RR)
          break;
      case "keydown":
      case "keyup":
        _g(e, a, r);
    }
  }
  function zu(e, t) {
    var n = {};
    return n[e.toLowerCase()] = t.toLowerCase(), n["Webkit" + e] = "webkit" + t, n["Moz" + e] = "moz" + t, n;
  }
  var Cl = {
    animationend: zu("Animation", "AnimationEnd"),
    animationiteration: zu("Animation", "AnimationIteration"),
    animationstart: zu("Animation", "AnimationStart"),
    transitionend: zu("Transition", "TransitionEnd")
  }, Gf = {}, Og = {};
  Zt && (Og = document.createElement("div").style, "AnimationEvent" in window || (delete Cl.animationend.animation, delete Cl.animationiteration.animation, delete Cl.animationstart.animation), "TransitionEvent" in window || delete Cl.transitionend.transition);
  function Pu(e) {
    if (Gf[e])
      return Gf[e];
    if (!Cl[e])
      return e;
    var t = Cl[e];
    for (var n in t)
      if (t.hasOwnProperty(n) && n in Og)
        return Gf[e] = t[n];
    return e;
  }
  var Mg = Pu("animationend"), Vg = Pu("animationiteration"), Ag = Pu("animationstart"), Lg = Pu("transitionend"), kg = /* @__PURE__ */ new Map(), Ug = ["abort", "auxClick", "cancel", "canPlay", "canPlayThrough", "click", "close", "contextMenu", "copy", "cut", "drag", "dragEnd", "dragEnter", "dragExit", "dragLeave", "dragOver", "dragStart", "drop", "durationChange", "emptied", "encrypted", "ended", "error", "gotPointerCapture", "input", "invalid", "keyDown", "keyPress", "keyUp", "load", "loadedData", "loadedMetadata", "loadStart", "lostPointerCapture", "mouseDown", "mouseMove", "mouseOut", "mouseOver", "mouseUp", "paste", "pause", "play", "playing", "pointerCancel", "pointerDown", "pointerMove", "pointerOut", "pointerOver", "pointerUp", "progress", "rateChange", "reset", "resize", "seeked", "seeking", "stalled", "submit", "suspend", "timeUpdate", "touchCancel", "touchEnd", "touchStart", "volumeChange", "scroll", "toggle", "touchMove", "waiting", "wheel"];
  function Ir(e, t) {
    kg.set(e, t), Xt(t, [e]);
  }
  function wR() {
    for (var e = 0; e < Ug.length; e++) {
      var t = Ug[e], n = t.toLowerCase(), a = t[0].toUpperCase() + t.slice(1);
      Ir(n, "on" + a);
    }
    Ir(Mg, "onAnimationEnd"), Ir(Vg, "onAnimationIteration"), Ir(Ag, "onAnimationStart"), Ir("dblclick", "onDoubleClick"), Ir("focusin", "onFocus"), Ir("focusout", "onBlur"), Ir(Lg, "onTransitionEnd");
  }
  function _R(e, t, n, a, r, i, l) {
    var u = kg.get(t);
    if (u !== void 0) {
      var c = Ff, h = t;
      switch (t) {
        case "keypress":
          if (Lu(a) === 0)
            return;
        case "keydown":
        case "keyup":
          c = O0;
          break;
        case "focusin":
          h = "focus", c = Hf;
          break;
        case "focusout":
          h = "blur", c = Hf;
          break;
        case "beforeblur":
        case "afterblur":
          c = Hf;
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
          c = ug;
          break;
        case "drag":
        case "dragend":
        case "dragenter":
        case "dragexit":
        case "dragleave":
        case "dragover":
        case "dragstart":
        case "drop":
          c = g0;
          break;
        case "touchcancel":
        case "touchend":
        case "touchmove":
        case "touchstart":
          c = A0;
          break;
        case Mg:
        case Vg:
        case Ag:
          c = N0;
          break;
        case Lg:
          c = k0;
          break;
        case "scroll":
          c = m0;
          break;
        case "wheel":
          c = F0;
          break;
        case "copy":
        case "cut":
        case "paste":
          c = E0;
          break;
        case "gotpointercapture":
        case "lostpointercapture":
        case "pointercancel":
        case "pointerdown":
        case "pointermove":
        case "pointerout":
        case "pointerover":
        case "pointerup":
          c = dg;
          break;
      }
      var v = (i & Do) !== 0;
      {
        var C = !v && // TODO: ideally, we'd eventually add all events from
        // nonDelegatedEvents list in DOMPluginEventSystem.
        // Then we can remove this special list.
        // This is a breaking change that can wait until React 18.
        t === "scroll", D = AR(n, u, a.type, v, C);
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
  wR(), dR(), J0(), DR(), H0();
  function OR(e, t, n, a, r, i, l) {
    _R(e, t, n, a, r, i);
    var u = (i & jE) === 0;
    u && (fR(e, t, n, a, r), cR(e, t, n, a, r), TR(e, t, n, a, r), K0(e, t, n, a, r));
  }
  var es = ["abort", "canplay", "canplaythrough", "durationchange", "emptied", "encrypted", "ended", "error", "loadeddata", "loadedmetadata", "loadstart", "pause", "play", "playing", "progress", "ratechange", "resize", "seeked", "seeking", "stalled", "suspend", "timeupdate", "volumechange", "waiting"], Wf = new Set(["cancel", "close", "invalid", "load", "scroll", "toggle"].concat(es));
  function Fg(e, t, n) {
    var a = e.type || "unknown-event";
    e.currentTarget = n, zE(a, t, void 0, e), e.currentTarget = null;
  }
  function MR(e, t, n) {
    var a;
    if (n)
      for (var r = t.length - 1; r >= 0; r--) {
        var i = t[r], l = i.instance, u = i.currentTarget, c = i.listener;
        if (l !== a && e.isPropagationStopped())
          return;
        Fg(e, c, u), a = l;
      }
    else
      for (var h = 0; h < t.length; h++) {
        var v = t[h], C = v.instance, D = v.currentTarget, V = v.listener;
        if (C !== a && e.isPropagationStopped())
          return;
        Fg(e, V, D), a = C;
      }
  }
  function zg(e, t) {
    for (var n = (t & Do) !== 0, a = 0; a < e.length; a++) {
      var r = e[a], i = r.event, l = r.listeners;
      MR(i, l, n);
    }
    PE();
  }
  function VR(e, t, n, a, r) {
    var i = Hd(n), l = [];
    OR(l, e, a, n, i, t), zg(l, t);
  }
  function _t(e, t) {
    Wf.has(e) || d('Did not expect a listenToNonDelegatedEvent() call for "%s". This is a bug in React. Please file an issue.', e);
    var n = !1, a = uC(t), r = UR(e);
    a.has(r) || (Pg(t, e, Pd, n), a.add(r));
  }
  function Kf(e, t, n) {
    Wf.has(e) && !t && d('Did not expect a listenToNativeEvent() call for "%s" in the bubble phase. This is a bug in React. Please file an issue.', e);
    var a = 0;
    t && (a |= Do), Pg(n, e, a, t);
  }
  var Hu = "_reactListening" + Math.random().toString(36).slice(2);
  function ts(e) {
    if (!e[Hu]) {
      e[Hu] = !0, Qt.forEach(function(n) {
        n !== "selectionchange" && (Wf.has(n) || Kf(n, !1, e), Kf(n, !0, e));
      });
      var t = e.nodeType === pr ? e : e.ownerDocument;
      t !== null && (t[Hu] || (t[Hu] = !0, Kf("selectionchange", !1, t)));
    }
  }
  function Pg(e, t, n, a, r) {
    var i = r0(e, t, n), l = void 0;
    Id && (t === "touchstart" || t === "touchmove" || t === "wheel") && (l = !0), e = e, a ? l !== void 0 ? c0(e, t, i, l) : u0(e, t, i) : l !== void 0 ? d0(e, t, i, l) : s0(e, t, i);
  }
  function Hg(e, t) {
    return e === t || e.nodeType === Gt && e.parentNode === t;
  }
  function Qf(e, t, n, a, r) {
    var i = a;
    if (!(t & hv) && !(t & Pd)) {
      var l = r;
      if (a !== null) {
        var u = a;
        e: for (; ; ) {
          if (u === null)
            return;
          var c = u.tag;
          if (c === x || c === T) {
            var h = u.stateNode.containerInfo;
            if (Hg(h, l))
              break;
            if (c === T)
              for (var v = u.return; v !== null; ) {
                var C = v.tag;
                if (C === x || C === T) {
                  var D = v.stateNode.containerInfo;
                  if (Hg(D, l))
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
    xv(function() {
      return VR(e, t, n, i);
    });
  }
  function ns(e, t, n) {
    return {
      instance: e,
      listener: t,
      currentTarget: n
    };
  }
  function AR(e, t, n, a, r, i) {
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
  function jl(e) {
    if (e === null)
      return null;
    do
      e = e.return;
    while (e && e.tag !== k);
    return e || null;
  }
  function LR(e, t) {
    for (var n = e, a = t, r = 0, i = n; i; i = jl(i))
      r++;
    for (var l = 0, u = a; u; u = jl(u))
      l++;
    for (; r - l > 0; )
      n = jl(n), r--;
    for (; l - r > 0; )
      a = jl(a), l--;
    for (var c = r; c--; ) {
      if (n === a || a !== null && n === a.alternate)
        return n;
      n = jl(n), a = jl(a);
    }
    return null;
  }
  function Bg(e, t, n, a, r) {
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
  function kR(e, t, n, a, r) {
    var i = a && r ? LR(a, r) : null;
    a !== null && Bg(e, t, a, i, !1), r !== null && n !== null && Bg(e, n, r, i, !0);
  }
  function UR(e, t) {
    return e + "__bubble";
  }
  var Kn = !1, as = "dangerouslySetInnerHTML", $u = "suppressContentEditableWarning", Yr = "suppressHydrationWarning", $g = "autoFocus", Vi = "children", Ai = "style", Iu = "__html", Xf, Yu, rs, Ig, qu, Yg, qg;
  Xf = {
    // There are working polyfills for <dialog>. Let people use it.
    dialog: !0,
    // Electron ships a custom <webview> tag to display external web content in
    // an isolated frame and process.
    // This tag is not present in non Electron environments such as JSDom which
    // is often used for testing purposes.
    // @see https://electronjs.org/docs/api/webview-tag
    webview: !0
  }, Yu = function(e, t) {
    NE(e, t), xE(e, t), CE(e, t, {
      registrationNameDependencies: Lt,
      possibleRegistrationNames: Un
    });
  }, Yg = Zt && !document.documentMode, rs = function(e, t, n) {
    if (!Kn) {
      var a = Gu(n), r = Gu(t);
      r !== a && (Kn = !0, d("Prop `%s` did not match. Server: %s Client: %s", e, JSON.stringify(r), JSON.stringify(a)));
    }
  }, Ig = function(e) {
    if (!Kn) {
      Kn = !0;
      var t = [];
      e.forEach(function(n) {
        t.push(n);
      }), d("Extra attributes from the server: %s", t);
    }
  }, qu = function(e, t) {
    t === !1 ? d("Expected `%s` listener to be a function, instead got `false`.\n\nIf you used to conditionally omit it with %s={condition && value}, pass %s={condition ? value : undefined} instead.", e, e, e) : d("Expected `%s` listener to be a function, instead got a value of `%s` type.", e, typeof t);
  }, qg = function(e, t) {
    var n = e.namespaceURI === dr ? e.ownerDocument.createElement(e.tagName) : e.ownerDocument.createElementNS(e.namespaceURI, e.tagName);
    return n.innerHTML = t, n.innerHTML;
  };
  var FR = /\r\n?/g, zR = /\u0000|\uFFFD/g;
  function Gu(e) {
    It(e);
    var t = typeof e == "string" ? e : "" + e;
    return t.replace(FR, `
`).replace(zR, "");
  }
  function Wu(e, t, n, a) {
    var r = Gu(t), i = Gu(e);
    if (i !== r && (a && (Kn || (Kn = !0, d('Text content did not match. Server: "%s" Client: "%s"', i, r))), n && W))
      throw new Error("Text content does not match server-rendered HTML.");
  }
  function Gg(e) {
    return e.nodeType === pr ? e : e.ownerDocument;
  }
  function PR() {
  }
  function Ku(e) {
    e.onclick = PR;
  }
  function HR(e, t, n, a, r) {
    for (var i in a)
      if (a.hasOwnProperty(i)) {
        var l = a[i];
        if (i === Ai)
          l && Object.freeze(l), uv(t, l);
        else if (i === as) {
          var u = l ? l[Iu] : void 0;
          u != null && rv(t, u);
        } else if (i === Vi)
          if (typeof l == "string") {
            var c = e !== "textarea" || l !== "";
            c && bu(t, l);
          } else typeof l == "number" && bu(t, "" + l);
        else i === $u || i === Yr || i === $g || (Lt.hasOwnProperty(i) ? l != null && (typeof l != "function" && qu(i, l), i === "onScroll" && _t("scroll", t)) : l != null && Ra(t, i, l, r));
      }
  }
  function BR(e, t, n, a) {
    for (var r = 0; r < t.length; r += 2) {
      var i = t[r], l = t[r + 1];
      i === Ai ? uv(e, l) : i === as ? rv(e, l) : i === Vi ? bu(e, l) : Ra(e, i, l, a);
    }
  }
  function $R(e, t, n, a) {
    var r, i = Gg(n), l, u = a;
    if (u === dr && (u = Ad(e)), u === dr) {
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
    return u === dr && !r && Object.prototype.toString.call(l) === "[object HTMLUnknownElement]" && !Q.call(Xf, e) && (Xf[e] = !0, d("The tag <%s> is unrecognized in this browser. If you meant to render a React component, start its name with an uppercase letter.", e)), l;
  }
  function IR(e, t) {
    return Gg(t).createTextNode(e);
  }
  function YR(e, t, n, a) {
    var r = Ei(t, n);
    Yu(t, n);
    var i;
    switch (t) {
      case "dialog":
        _t("cancel", e), _t("close", e), i = n;
        break;
      case "iframe":
      case "object":
      case "embed":
        _t("load", e), i = n;
        break;
      case "video":
      case "audio":
        for (var l = 0; l < es.length; l++)
          _t(es[l], e);
        i = n;
        break;
      case "source":
        _t("error", e), i = n;
        break;
      case "img":
      case "image":
      case "link":
        _t("error", e), _t("load", e), i = n;
        break;
      case "details":
        _t("toggle", e), i = n;
        break;
      case "input":
        hu(e, n), i = No(e, n), _t("invalid", e);
        break;
      case "option":
        mt(e, n), i = n;
        break;
      case "select":
        So(e, n), i = Eo(e, n), _t("invalid", e);
        break;
      case "textarea":
        tv(e, n), i = Md(e, n), _t("invalid", e);
        break;
      default:
        i = n;
    }
    switch (zd(t, i), HR(t, e, a, i, r), t) {
      case "input":
        Ni(e), A(e, n, !1);
        break;
      case "textarea":
        Ni(e), av(e);
        break;
      case "option":
        Et(e, n);
        break;
      case "select":
        _d(e, n);
        break;
      default:
        typeof i.onClick == "function" && Ku(e);
        break;
    }
  }
  function qR(e, t, n, a, r) {
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
        l = Md(e, n), u = Md(e, a), i = [];
        break;
      default:
        l = n, u = a, typeof l.onClick != "function" && typeof u.onClick == "function" && Ku(e);
        break;
    }
    zd(t, u);
    var c, h, v = null;
    for (c in l)
      if (!(u.hasOwnProperty(c) || !l.hasOwnProperty(c) || l[c] == null))
        if (c === Ai) {
          var C = l[c];
          for (h in C)
            C.hasOwnProperty(h) && (v || (v = {}), v[h] = "");
        } else c === as || c === Vi || c === $u || c === Yr || c === $g || (Lt.hasOwnProperty(c) ? i || (i = []) : (i = i || []).push(c, null));
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
        } else c === Vi ? (typeof D == "string" || typeof D == "number") && (i = i || []).push(c, "" + D) : c === $u || c === Yr || (Lt.hasOwnProperty(c) ? (D != null && (typeof D != "function" && qu(c, D), c === "onScroll" && _t("scroll", e)), !i && V !== D && (i = [])) : (i = i || []).push(c, D));
    }
    return v && (fE(v, u[Ai]), (i = i || []).push(Ai, v)), i;
  }
  function GR(e, t, n, a, r) {
    n === "input" && r.type === "radio" && r.name != null && p(e, r);
    var i = Ei(n, a), l = Ei(n, r);
    switch (BR(e, t, i, l), n) {
      case "input":
        N(e, r);
        break;
      case "textarea":
        nv(e, r);
        break;
      case "select":
        vu(e, r);
        break;
    }
  }
  function WR(e) {
    {
      var t = e.toLowerCase();
      return yu.hasOwnProperty(t) && yu[t] || null;
    }
  }
  function KR(e, t, n, a, r, i, l) {
    var u, c;
    switch (u = Ei(t, n), Yu(t, n), t) {
      case "dialog":
        _t("cancel", e), _t("close", e);
        break;
      case "iframe":
      case "object":
      case "embed":
        _t("load", e);
        break;
      case "video":
      case "audio":
        for (var h = 0; h < es.length; h++)
          _t(es[h], e);
        break;
      case "source":
        _t("error", e);
        break;
      case "img":
      case "image":
      case "link":
        _t("error", e), _t("load", e);
        break;
      case "details":
        _t("toggle", e);
        break;
      case "input":
        hu(e, n), _t("invalid", e);
        break;
      case "option":
        mt(e, n);
        break;
      case "select":
        So(e, n), _t("invalid", e);
        break;
      case "textarea":
        tv(e, n), _t("invalid", e);
        break;
    }
    zd(t, n);
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
        else if (Lt.hasOwnProperty(L))
          H != null && (typeof H != "function" && qu(L, H), L === "onScroll" && _t("scroll", e));
        else if (l && // Convince Flow we've calculated it (it's DEV-only in this method.)
        typeof u == "boolean") {
          var fe = void 0, Ce = Ot(L);
          if (n[Yr] !== !0) {
            if (!(L === $u || L === Yr || // Controlled attributes are not validated
            // TODO: Only ignore them on controlled tags.
            L === "value" || L === "checked" || L === "selected")) {
              if (L === as) {
                var Se = e.innerHTML, Ze = H ? H[Iu] : void 0;
                if (Ze != null) {
                  var We = qg(e, Ze);
                  We !== Se && rs(L, Se, We);
                }
              } else if (L === Ai) {
                if (c.delete(L), Yg) {
                  var _ = cE(H);
                  fe = e.getAttribute("style"), _ !== fe && rs(L, fe, _);
                }
              } else if (u && !st)
                c.delete(L.toLowerCase()), fe = fi(e, L, H), H !== fe && rs(L, fe, H);
              else if (!Ct(L, Ce, u) && !Nn(L, H, Ce, u)) {
                var B = !1;
                if (Ce !== null)
                  c.delete(Ce.attributeName), fe = Zi(e, L, H, Ce);
                else {
                  var O = a;
                  if (O === dr && (O = Ad(t)), O === dr)
                    c.delete(L.toLowerCase());
                  else {
                    var ne = WR(L);
                    ne !== null && ne !== L && (B = !0, c.delete(ne)), c.delete(L);
                  }
                  fe = fi(e, L, H);
                }
                var ge = st;
                !ge && H !== fe && !B && rs(L, fe, H);
              }
            }
          }
        }
      }
    switch (l && // $FlowFixMe - Should be inferred as not undefined.
    c.size > 0 && n[Yr] !== !0 && Ig(c), t) {
      case "input":
        Ni(e), A(e, n, !0);
        break;
      case "textarea":
        Ni(e), av(e);
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
  function QR(e, t, n) {
    var a = e.nodeValue !== t;
    return a;
  }
  function Jf(e, t) {
    {
      if (Kn)
        return;
      Kn = !0, d("Did not expect server HTML to contain a <%s> in <%s>.", t.nodeName.toLowerCase(), e.nodeName.toLowerCase());
    }
  }
  function Zf(e, t) {
    {
      if (Kn)
        return;
      Kn = !0, d('Did not expect server HTML to contain the text node "%s" in <%s>.', t.nodeValue, e.nodeName.toLowerCase());
    }
  }
  function ep(e, t, n) {
    {
      if (Kn)
        return;
      Kn = !0, d("Expected server HTML to contain a matching <%s> in <%s>.", t, e.nodeName.toLowerCase());
    }
  }
  function tp(e, t) {
    {
      if (t === "" || Kn)
        return;
      Kn = !0, d('Expected server HTML to contain a matching text node for "%s" in <%s>.', t, e.nodeName.toLowerCase());
    }
  }
  function XR(e, t, n) {
    switch (t) {
      case "input":
        z(e, n);
        return;
      case "textarea":
        Yx(e, n);
        return;
      case "select":
        Od(e, n);
        return;
    }
  }
  var is = function() {
  }, ls = function() {
  };
  {
    var JR = ["address", "applet", "area", "article", "aside", "base", "basefont", "bgsound", "blockquote", "body", "br", "button", "caption", "center", "col", "colgroup", "dd", "details", "dir", "div", "dl", "dt", "embed", "fieldset", "figcaption", "figure", "footer", "form", "frame", "frameset", "h1", "h2", "h3", "h4", "h5", "h6", "head", "header", "hgroup", "hr", "html", "iframe", "img", "input", "isindex", "li", "link", "listing", "main", "marquee", "menu", "menuitem", "meta", "nav", "noembed", "noframes", "noscript", "object", "ol", "p", "param", "plaintext", "pre", "script", "section", "select", "source", "style", "summary", "table", "tbody", "td", "template", "textarea", "tfoot", "th", "thead", "title", "tr", "track", "ul", "wbr", "xmp"], Wg = [
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
    ], ZR = Wg.concat(["button"]), eD = ["dd", "dt", "li", "option", "optgroup", "p", "rp", "rt"], Kg = {
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
      var n = qe({}, e || Kg), a = {
        tag: t
      };
      return Wg.indexOf(t) !== -1 && (n.aTagInScope = null, n.buttonTagInScope = null, n.nobrTagInScope = null), ZR.indexOf(t) !== -1 && (n.pTagInButtonScope = null), JR.indexOf(t) !== -1 && t !== "address" && t !== "div" && t !== "p" && (n.listItemTagAutoclosing = null, n.dlItemTagAutoclosing = null), n.current = a, t === "form" && (n.formTag = a), t === "a" && (n.aTagInScope = a), t === "button" && (n.buttonTagInScope = a), t === "nobr" && (n.nobrTagInScope = a), t === "p" && (n.pTagInButtonScope = a), t === "li" && (n.listItemTagAutoclosing = a), (t === "dd" || t === "dt") && (n.dlItemTagAutoclosing = a), n;
    };
    var tD = function(e, t) {
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
          return eD.indexOf(t) === -1;
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
    }, nD = function(e, t) {
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
    }, Qg = {};
    is = function(e, t, n) {
      n = n || Kg;
      var a = n.current, r = a && a.tag;
      t != null && (e != null && d("validateDOMNesting: when childText is passed, childTag should be null"), e = "#text");
      var i = tD(e, r) ? null : a, l = i ? null : nD(e, n), u = i || l;
      if (u) {
        var c = u.tag, h = !!i + "|" + e + "|" + c;
        if (!Qg[h]) {
          Qg[h] = !0;
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
  var Qu = "suppressHydrationWarning", Xu = "$", Ju = "/$", os = "$?", ss = "$!", aD = "style", np = null, ap = null;
  function rD(e) {
    var t, n, a = e.nodeType;
    switch (a) {
      case pr:
      case kd: {
        t = a === pr ? "#document" : "#fragment";
        var r = e.documentElement;
        n = r ? r.namespaceURI : Ld(null, "");
        break;
      }
      default: {
        var i = a === Gt ? e.parentNode : e, l = i.namespaceURI || null;
        t = i.tagName, n = Ld(l, t);
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
  function iD(e, t, n) {
    {
      var a = e, r = Ld(a.namespace, t), i = ls(a.ancestorInfo, t);
      return {
        namespace: r,
        ancestorInfo: i
      };
    }
  }
  function nO(e) {
    return e;
  }
  function lD(e) {
    np = a0(), ap = NR();
    var t = null;
    return rg(!1), t;
  }
  function oD(e) {
    xR(ap), rg(np), np = null, ap = null;
  }
  function sD(e, t, n, a, r) {
    var i;
    {
      var l = a;
      if (is(e, null, l.ancestorInfo), typeof t.children == "string" || typeof t.children == "number") {
        var u = "" + t.children, c = ls(l.ancestorInfo, e);
        is(null, u, c);
      }
      i = l.namespace;
    }
    var h = $R(e, t, n, i);
    return ds(r, h), dp(h, t), h;
  }
  function uD(e, t) {
    e.appendChild(t);
  }
  function cD(e, t, n, a, r) {
    switch (YR(e, t, n, a), t) {
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
  function dD(e, t, n, a, r, i) {
    {
      var l = i;
      if (typeof a.children != typeof n.children && (typeof a.children == "string" || typeof a.children == "number")) {
        var u = "" + a.children, c = ls(l.ancestorInfo, t);
        is(null, u, c);
      }
    }
    return qR(e, t, n, a);
  }
  function rp(e, t) {
    return e === "textarea" || e === "noscript" || typeof t.children == "string" || typeof t.children == "number" || typeof t.dangerouslySetInnerHTML == "object" && t.dangerouslySetInnerHTML !== null && t.dangerouslySetInnerHTML.__html != null;
  }
  function fD(e, t, n, a) {
    {
      var r = n;
      is(null, e, r.ancestorInfo);
    }
    var i = IR(e, t);
    return ds(a, i), i;
  }
  function pD() {
    var e = window.event;
    return e === void 0 ? yr : ig(e.type);
  }
  var ip = typeof setTimeout == "function" ? setTimeout : void 0, mD = typeof clearTimeout == "function" ? clearTimeout : void 0, lp = -1, Xg = typeof Promise == "function" ? Promise : void 0, hD = typeof queueMicrotask == "function" ? queueMicrotask : typeof Xg < "u" ? function(e) {
    return Xg.resolve(null).then(e).catch(vD);
  } : ip;
  function vD(e) {
    setTimeout(function() {
      throw e;
    });
  }
  function gD(e, t, n, a) {
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
  function bD(e, t, n, a, r, i) {
    GR(e, t, n, a, r), dp(e, r);
  }
  function Jg(e) {
    bu(e, "");
  }
  function yD(e, t, n) {
    e.nodeValue = n;
  }
  function ND(e, t) {
    e.appendChild(t);
  }
  function xD(e, t) {
    var n;
    e.nodeType === Gt ? (n = e.parentNode, n.insertBefore(t, e)) : (n = e, n.appendChild(t));
    var a = e._reactRootContainer;
    a == null && n.onclick === null && Ku(n);
  }
  function ED(e, t, n) {
    e.insertBefore(t, n);
  }
  function SD(e, t, n) {
    e.nodeType === Gt ? e.parentNode.insertBefore(t, n) : e.insertBefore(t, n);
  }
  function RD(e, t) {
    e.removeChild(t);
  }
  function DD(e, t) {
    e.nodeType === Gt ? e.parentNode.removeChild(t) : e.removeChild(t);
  }
  function op(e, t) {
    var n = t, a = 0;
    do {
      var r = n.nextSibling;
      if (e.removeChild(n), r && r.nodeType === Gt) {
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
  function CD(e, t) {
    e.nodeType === Gt ? op(e.parentNode, t) : e.nodeType === Wn && op(e, t), Io(e);
  }
  function jD(e) {
    e = e;
    var t = e.style;
    typeof t.setProperty == "function" ? t.setProperty("display", "none", "important") : t.display = "none";
  }
  function TD(e) {
    e.nodeValue = "";
  }
  function wD(e, t) {
    e = e;
    var n = t[aD], a = n != null && n.hasOwnProperty("display") ? n.display : null;
    e.style.display = Ud("display", a);
  }
  function _D(e, t) {
    e.nodeValue = t;
  }
  function OD(e) {
    e.nodeType === Wn ? e.textContent = "" : e.nodeType === pr && e.documentElement && e.removeChild(e.documentElement);
  }
  function MD(e, t, n) {
    return e.nodeType !== Wn || t.toLowerCase() !== e.nodeName.toLowerCase() ? null : e;
  }
  function VD(e, t) {
    return t === "" || e.nodeType !== fr ? null : e;
  }
  function AD(e) {
    return e.nodeType !== Gt ? null : e;
  }
  function Zg(e) {
    return e.data === os;
  }
  function sp(e) {
    return e.data === ss;
  }
  function LD(e) {
    var t = e.nextSibling && e.nextSibling.dataset, n, a, r;
    return t && (n = t.dgst, a = t.msg, r = t.stck), {
      message: a,
      digest: n,
      stack: r
    };
  }
  function kD(e, t) {
    e._reactRetry = t;
  }
  function Zu(e) {
    for (; e != null; e = e.nextSibling) {
      var t = e.nodeType;
      if (t === Wn || t === fr)
        break;
      if (t === Gt) {
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
  function UD(e) {
    return Zu(e.firstChild);
  }
  function FD(e) {
    return Zu(e.firstChild);
  }
  function zD(e) {
    return Zu(e.nextSibling);
  }
  function PD(e, t, n, a, r, i, l) {
    ds(i, e), dp(e, n);
    var u;
    {
      var c = r;
      u = c.namespace;
    }
    var h = (i.mode & Xe) !== Te;
    return KR(e, t, n, u, a, h, l);
  }
  function HD(e, t, n, a) {
    return ds(n, e), n.mode & Xe, QR(e, t);
  }
  function BD(e, t) {
    ds(t, e);
  }
  function $D(e) {
    for (var t = e.nextSibling, n = 0; t; ) {
      if (t.nodeType === Gt) {
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
  function eb(e) {
    for (var t = e.previousSibling, n = 0; t; ) {
      if (t.nodeType === Gt) {
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
  function ID(e) {
    Io(e);
  }
  function YD(e) {
    Io(e);
  }
  function qD(e) {
    return e !== "head" && e !== "body";
  }
  function GD(e, t, n, a) {
    var r = !0;
    Wu(t.nodeValue, n, a, r);
  }
  function WD(e, t, n, a, r, i) {
    if (t[Qu] !== !0) {
      var l = !0;
      Wu(a.nodeValue, r, i, l);
    }
  }
  function KD(e, t) {
    t.nodeType === Wn ? Jf(e, t) : t.nodeType === Gt || Zf(e, t);
  }
  function QD(e, t) {
    {
      var n = e.parentNode;
      n !== null && (t.nodeType === Wn ? Jf(n, t) : t.nodeType === Gt || Zf(n, t));
    }
  }
  function XD(e, t, n, a, r) {
    (r || t[Qu] !== !0) && (a.nodeType === Wn ? Jf(n, a) : a.nodeType === Gt || Zf(n, a));
  }
  function JD(e, t, n) {
    ep(e, t);
  }
  function ZD(e, t) {
    tp(e, t);
  }
  function eC(e, t, n) {
    {
      var a = e.parentNode;
      a !== null && ep(a, t);
    }
  }
  function tC(e, t) {
    {
      var n = e.parentNode;
      n !== null && tp(n, t);
    }
  }
  function nC(e, t, n, a, r, i) {
    (i || t[Qu] !== !0) && ep(n, a);
  }
  function aC(e, t, n, a, r) {
    (r || t[Qu] !== !0) && tp(n, a);
  }
  function rC(e) {
    d("An error occurred during hydration. The server HTML was replaced with client content in <%s>.", e.nodeName.toLowerCase());
  }
  function iC(e) {
    ts(e);
  }
  var Tl = Math.random().toString(36).slice(2), wl = "__reactFiber$" + Tl, up = "__reactProps$" + Tl, cs = "__reactContainer$" + Tl, cp = "__reactEvents$" + Tl, lC = "__reactListeners$" + Tl, oC = "__reactHandles$" + Tl;
  function sC(e) {
    delete e[wl], delete e[up], delete e[cp], delete e[lC], delete e[oC];
  }
  function ds(e, t) {
    t[wl] = e;
  }
  function ec(e, t) {
    t[cs] = e;
  }
  function tb(e) {
    e[cs] = null;
  }
  function fs(e) {
    return !!e[cs];
  }
  function Li(e) {
    var t = e[wl];
    if (t)
      return t;
    for (var n = e.parentNode; n; ) {
      if (t = n[cs] || n[wl], t) {
        var a = t.alternate;
        if (t.child !== null || a !== null && a.child !== null)
          for (var r = eb(e); r !== null; ) {
            var i = r[wl];
            if (i)
              return i;
            r = eb(r);
          }
        return t;
      }
      e = n, n = e.parentNode;
    }
    return null;
  }
  function qr(e) {
    var t = e[wl] || e[cs];
    return t && (t.tag === k || t.tag === ee || t.tag === te || t.tag === x) ? t : null;
  }
  function _l(e) {
    if (e.tag === k || e.tag === ee)
      return e.stateNode;
    throw new Error("getNodeFromInstance: Invalid argument.");
  }
  function tc(e) {
    return e[up] || null;
  }
  function dp(e, t) {
    e[up] = t;
  }
  function uC(e) {
    var t = e[cp];
    return t === void 0 && (t = e[cp] = /* @__PURE__ */ new Set()), t;
  }
  var nb = {}, ab = m.ReactDebugCurrentFrame;
  function nc(e) {
    if (e) {
      var t = e._owner, n = mo(e.type, e._source, t ? t.type : null);
      ab.setExtraStackFrame(n);
    } else
      ab.setExtraStackFrame(null);
  }
  function _a(e, t, n, a, r) {
    {
      var i = Function.call.bind(Q);
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
          u && !(u instanceof Error) && (nc(r), d("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", a || "React class", n, l, typeof u), nc(null)), u instanceof Error && !(u.message in nb) && (nb[u.message] = !0, nc(r), d("Failed %s type: %s", n, u.message), nc(null));
        }
    }
  }
  var fp = [], ac;
  ac = [];
  var Nr = -1;
  function Gr(e) {
    return {
      current: e
    };
  }
  function Mn(e, t) {
    if (Nr < 0) {
      d("Unexpected pop.");
      return;
    }
    t !== ac[Nr] && d("Unexpected Fiber popped."), e.current = fp[Nr], fp[Nr] = null, ac[Nr] = null, Nr--;
  }
  function Vn(e, t, n) {
    Nr++, fp[Nr] = e.current, ac[Nr] = n, e.current = t;
  }
  var pp;
  pp = {};
  var la = {};
  Object.freeze(la);
  var xr = Gr(la), Qa = Gr(!1), mp = la;
  function Ol(e, t, n) {
    return n && Xa(t) ? mp : xr.current;
  }
  function rb(e, t, n) {
    {
      var a = e.stateNode;
      a.__reactInternalMemoizedUnmaskedChildContext = t, a.__reactInternalMemoizedMaskedChildContext = n;
    }
  }
  function Ml(e, t) {
    {
      var n = e.type, a = n.contextTypes;
      if (!a)
        return la;
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
      return r && rb(e, t, i), i;
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
    Mn(Qa, e), Mn(xr, e);
  }
  function hp(e) {
    Mn(Qa, e), Mn(xr, e);
  }
  function ib(e, t, n) {
    {
      if (xr.current !== la)
        throw new Error("Unexpected context found on stack. This error is likely caused by a bug in React. Please file an issue.");
      Vn(xr, t, e), Vn(Qa, n, e);
    }
  }
  function lb(e, t, n) {
    {
      var a = e.stateNode, r = t.childContextTypes;
      if (typeof a.getChildContext != "function") {
        {
          var i = ze(e) || "Unknown";
          pp[i] || (pp[i] = !0, d("%s.childContextTypes is specified but there is no getChildContext() method on the instance. You can either define getChildContext() on %s or remove childContextTypes from it.", i, i));
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
      return qe({}, n, l);
    }
  }
  function lc(e) {
    {
      var t = e.stateNode, n = t && t.__reactInternalMemoizedMergedChildContext || la;
      return mp = xr.current, Vn(xr, n, e), Vn(Qa, Qa.current, e), !0;
    }
  }
  function ob(e, t, n) {
    {
      var a = e.stateNode;
      if (!a)
        throw new Error("Expected to have an instance by this point. This error is likely caused by a bug in React. Please file an issue.");
      if (n) {
        var r = lb(e, t, mp);
        a.__reactInternalMemoizedMergedChildContext = r, Mn(Qa, e), Mn(xr, e), Vn(xr, r, e), Vn(Qa, n, e);
      } else
        Mn(Qa, e), Vn(Qa, n, e);
    }
  }
  function cC(e) {
    {
      if (!qE(e) || e.tag !== j)
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
  var Wr = 0, oc = 1, Er = null, vp = !1, gp = !1;
  function sb(e) {
    Er === null ? Er = [e] : Er.push(e);
  }
  function dC(e) {
    vp = !0, sb(e);
  }
  function ub() {
    vp && Kr();
  }
  function Kr() {
    if (!gp && Er !== null) {
      gp = !0;
      var e = 0, t = wa();
      try {
        var n = !0, a = Er;
        for (gn(aa); e < a.length; e++) {
          var r = a[e];
          do
            r = r(n);
          while (r !== null);
        }
        Er = null, vp = !1;
      } catch (i) {
        throw Er !== null && (Er = Er.slice(e + 1)), Vv(Su, Kr), i;
      } finally {
        gn(t), gp = !1;
      }
    }
    return null;
  }
  var Vl = [], Al = 0, sc = null, uc = 0, pa = [], ma = 0, ki = null, Sr = 1, Rr = "";
  function fC(e) {
    return Fi(), (e.flags & Dv) !== Oe;
  }
  function pC(e) {
    return Fi(), uc;
  }
  function mC() {
    var e = Rr, t = Sr, n = t & ~hC(t);
    return n.toString(32) + e;
  }
  function Ui(e, t) {
    Fi(), Vl[Al++] = uc, Vl[Al++] = sc, sc = e, uc = t;
  }
  function cb(e, t, n) {
    Fi(), pa[ma++] = Sr, pa[ma++] = Rr, pa[ma++] = ki, ki = e;
    var a = Sr, r = Rr, i = cc(a) - 1, l = a & ~(1 << i), u = n + 1, c = cc(t) + i;
    if (c > 30) {
      var h = i - i % 5, v = (1 << h) - 1, C = (l & v).toString(32), D = l >> h, V = i - h, L = cc(t) + V, H = u << V, fe = H | D, Ce = C + r;
      Sr = 1 << L | fe, Rr = Ce;
    } else {
      var Se = u << i, Ze = Se | l, We = r;
      Sr = 1 << c | Ze, Rr = We;
    }
  }
  function bp(e) {
    Fi();
    var t = e.return;
    if (t !== null) {
      var n = 1, a = 0;
      Ui(e, n), cb(e, n, a);
    }
  }
  function cc(e) {
    return 32 - zv(e);
  }
  function hC(e) {
    return 1 << cc(e) - 1;
  }
  function yp(e) {
    for (; e === sc; )
      sc = Vl[--Al], Vl[Al] = null, uc = Vl[--Al], Vl[Al] = null;
    for (; e === ki; )
      ki = pa[--ma], pa[ma] = null, Rr = pa[--ma], pa[ma] = null, Sr = pa[--ma], pa[ma] = null;
  }
  function vC() {
    return Fi(), ki !== null ? {
      id: Sr,
      overflow: Rr
    } : null;
  }
  function gC(e, t) {
    Fi(), pa[ma++] = Sr, pa[ma++] = Rr, pa[ma++] = ki, Sr = t.id, Rr = t.overflow, ki = e;
  }
  function Fi() {
    En() || d("Expected to be hydrating. This is a bug in React. Please file an issue.");
  }
  var xn = null, ha = null, Oa = !1, zi = !1, Qr = null;
  function bC() {
    Oa && d("We should not be hydrating here. This is a bug in React. Please file a bug.");
  }
  function db() {
    zi = !0;
  }
  function yC() {
    return zi;
  }
  function NC(e) {
    var t = e.stateNode.containerInfo;
    return ha = FD(t), xn = e, Oa = !0, Qr = null, zi = !1, !0;
  }
  function xC(e, t, n) {
    return ha = zD(t), xn = e, Oa = !0, Qr = null, zi = !1, n !== null && gC(e, n), !0;
  }
  function fb(e, t) {
    switch (e.tag) {
      case x: {
        KD(e.stateNode.containerInfo, t);
        break;
      }
      case k: {
        var n = (e.mode & Xe) !== Te;
        XD(
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
        a.dehydrated !== null && QD(a.dehydrated, t);
        break;
      }
    }
  }
  function pb(e, t) {
    fb(e, t);
    var n = DT();
    n.stateNode = t, n.return = e;
    var a = e.deletions;
    a === null ? (e.deletions = [n], e.flags |= Si) : a.push(n);
  }
  function Np(e, t) {
    {
      if (zi)
        return;
      switch (e.tag) {
        case x: {
          var n = e.stateNode.containerInfo;
          switch (t.tag) {
            case k:
              var a = t.type;
              t.pendingProps, JD(n, a);
              break;
            case ee:
              var r = t.pendingProps;
              ZD(n, r);
              break;
          }
          break;
        }
        case k: {
          var i = e.type, l = e.memoizedProps, u = e.stateNode;
          switch (t.tag) {
            case k: {
              var c = t.type, h = t.pendingProps, v = (e.mode & Xe) !== Te;
              nC(
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
              var C = t.pendingProps, D = (e.mode & Xe) !== Te;
              aC(
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
              t.pendingProps, eC(L, H);
              break;
            case ee:
              var fe = t.pendingProps;
              tC(L, fe);
              break;
          }
          break;
        }
        default:
          return;
      }
    }
  }
  function mb(e, t) {
    t.flags = t.flags & ~hr | Wt, Np(e, t);
  }
  function hb(e, t) {
    switch (e.tag) {
      case k: {
        var n = e.type;
        e.pendingProps;
        var a = MD(t, n);
        return a !== null ? (e.stateNode = a, xn = e, ha = UD(a), !0) : !1;
      }
      case ee: {
        var r = e.pendingProps, i = VD(t, r);
        return i !== null ? (e.stateNode = i, xn = e, ha = null, !0) : !1;
      }
      case te: {
        var l = AD(t);
        if (l !== null) {
          var u = {
            dehydrated: l,
            treeContext: vC(),
            retryLane: ta
          };
          e.memoizedState = u;
          var c = CT(l);
          return c.return = e, e.child = c, xn = e, ha = null, !0;
        }
        return !1;
      }
      default:
        return !1;
    }
  }
  function xp(e) {
    return (e.mode & Xe) !== Te && (e.flags & ot) === Oe;
  }
  function Ep(e) {
    throw new Error("Hydration failed because the initial UI does not match what was rendered on the server.");
  }
  function Sp(e) {
    if (Oa) {
      var t = ha;
      if (!t) {
        xp(e) && (Np(xn, e), Ep()), mb(xn, e), Oa = !1, xn = e;
        return;
      }
      var n = t;
      if (!hb(e, t)) {
        xp(e) && (Np(xn, e), Ep()), t = us(n);
        var a = xn;
        if (!t || !hb(e, t)) {
          mb(xn, e), Oa = !1, xn = e;
          return;
        }
        pb(a, n);
      }
    }
  }
  function EC(e, t, n) {
    var a = e.stateNode, r = !zi, i = PD(a, e.type, e.memoizedProps, t, n, e, r);
    return e.updateQueue = i, i !== null;
  }
  function SC(e) {
    var t = e.stateNode, n = e.memoizedProps, a = HD(t, n, e);
    if (a) {
      var r = xn;
      if (r !== null)
        switch (r.tag) {
          case x: {
            var i = r.stateNode.containerInfo, l = (r.mode & Xe) !== Te;
            GD(
              i,
              t,
              n,
              // TODO: Delete this argument when we remove the legacy root API.
              l
            );
            break;
          }
          case k: {
            var u = r.type, c = r.memoizedProps, h = r.stateNode, v = (r.mode & Xe) !== Te;
            WD(
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
  function RC(e) {
    var t = e.memoizedState, n = t !== null ? t.dehydrated : null;
    if (!n)
      throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
    BD(n, e);
  }
  function DC(e) {
    var t = e.memoizedState, n = t !== null ? t.dehydrated : null;
    if (!n)
      throw new Error("Expected to have a hydrated suspense instance. This error is likely caused by a bug in React. Please file an issue.");
    return $D(n);
  }
  function vb(e) {
    for (var t = e.return; t !== null && t.tag !== k && t.tag !== x && t.tag !== te; )
      t = t.return;
    xn = t;
  }
  function dc(e) {
    if (e !== xn)
      return !1;
    if (!Oa)
      return vb(e), Oa = !0, !1;
    if (e.tag !== x && (e.tag !== k || qD(e.type) && !rp(e.type, e.memoizedProps))) {
      var t = ha;
      if (t)
        if (xp(e))
          gb(e), Ep();
        else
          for (; t; )
            pb(e, t), t = us(t);
    }
    return vb(e), e.tag === te ? ha = DC(e) : ha = xn ? us(e.stateNode) : null, !0;
  }
  function CC() {
    return Oa && ha !== null;
  }
  function gb(e) {
    for (var t = ha; t; )
      fb(e, t), t = us(t);
  }
  function Ll() {
    xn = null, ha = null, Oa = !1, zi = !1;
  }
  function bb() {
    Qr !== null && (dN(Qr), Qr = null);
  }
  function En() {
    return Oa;
  }
  function Rp(e) {
    Qr === null ? Qr = [e] : Qr.push(e);
  }
  var jC = m.ReactCurrentBatchConfig, TC = null;
  function wC() {
    return jC.transition;
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
    var _C = function(e) {
      for (var t = null, n = e; n !== null; )
        n.mode & Pt && (t = n), n = n.return;
      return t;
    }, Pi = function(e) {
      var t = [];
      return e.forEach(function(n) {
        t.push(n);
      }), t.sort().join(", ");
    }, ps = [], ms = [], hs = [], vs = [], gs = [], bs = [], Hi = /* @__PURE__ */ new Set();
    Ma.recordUnsafeLifecycleWarnings = function(e, t) {
      Hi.has(e.type) || (typeof t.componentWillMount == "function" && // Don't warn about react-lifecycles-compat polyfilled components.
      t.componentWillMount.__suppressDeprecationWarning !== !0 && ps.push(e), e.mode & Pt && typeof t.UNSAFE_componentWillMount == "function" && ms.push(e), typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps.__suppressDeprecationWarning !== !0 && hs.push(e), e.mode & Pt && typeof t.UNSAFE_componentWillReceiveProps == "function" && vs.push(e), typeof t.componentWillUpdate == "function" && t.componentWillUpdate.__suppressDeprecationWarning !== !0 && gs.push(e), e.mode & Pt && typeof t.UNSAFE_componentWillUpdate == "function" && bs.push(e));
    }, Ma.flushPendingUnsafeLifecycleWarnings = function() {
      var e = /* @__PURE__ */ new Set();
      ps.length > 0 && (ps.forEach(function(D) {
        e.add(ze(D) || "Component"), Hi.add(D.type);
      }), ps = []);
      var t = /* @__PURE__ */ new Set();
      ms.length > 0 && (ms.forEach(function(D) {
        t.add(ze(D) || "Component"), Hi.add(D.type);
      }), ms = []);
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
    var fc = /* @__PURE__ */ new Map(), yb = /* @__PURE__ */ new Set();
    Ma.recordLegacyContextWarning = function(e, t) {
      var n = _C(e);
      if (n === null) {
        d("Expected to find a StrictMode component in a strict mode tree. This error is likely caused by a bug in React. Please file an issue.");
        return;
      }
      if (!yb.has(e.type)) {
        var a = fc.get(n);
        (e.type.contextTypes != null || e.type.childContextTypes != null || t !== null && typeof t.getChildContext == "function") && (a === void 0 && (a = [], fc.set(n, a)), a.push(e));
      }
    }, Ma.flushLegacyContextWarning = function() {
      fc.forEach(function(e, t) {
        if (e.length !== 0) {
          var n = e[0], a = /* @__PURE__ */ new Set();
          e.forEach(function(i) {
            a.add(ze(i) || "Component"), yb.add(i.type);
          });
          var r = Pi(a);
          try {
            Mt(n), d(`Legacy context API has been detected within a strict-mode tree.

The old API will be supported in all 16.x releases, but applications using it should migrate to the new version.

Please update the following components: %s

Learn more about this warning here: https://reactjs.org/link/legacy-context`, r);
          } finally {
            pn();
          }
        }
      });
    }, Ma.discardPendingWarnings = function() {
      ps = [], ms = [], hs = [], vs = [], gs = [], bs = [], fc = /* @__PURE__ */ new Map();
    };
  }
  var Dp, Cp, jp, Tp, wp, Nb = function(e, t) {
  };
  Dp = !1, Cp = !1, jp = {}, Tp = {}, wp = {}, Nb = function(e, t) {
    if (!(e === null || typeof e != "object") && !(!e._store || e._store.validated || e.key != null)) {
      if (typeof e._store != "object")
        throw new Error("React Component in warnForMissingKey should have a _store. This error is likely caused by a bug in React. Please file an issue.");
      e._store.validated = !0;
      var n = ze(t) || "Component";
      Tp[n] || (Tp[n] = !0, d('Each child in a list should have a unique "key" prop. See https://reactjs.org/link/warning-keys for more information.'));
    }
  };
  function OC(e) {
    return e.prototype && e.prototype.isReactComponent;
  }
  function ys(e, t, n) {
    var a = n.ref;
    if (a !== null && typeof a != "function" && typeof a != "object") {
      if ((e.mode & Pt || Pe) && // We warn in ReactElement.js if owner and self are equal for string refs
      // because these cannot be automatically converted to an arrow function
      // using a codemod. Therefore, we don't have to warn about string refs again.
      !(n._owner && n._self && n._owner.stateNode !== n._self) && // Will already throw with "Function components cannot have string refs"
      !(n._owner && n._owner.tag !== j) && // Will already warn with "Function components cannot be given refs"
      !(typeof n.type == "function" && !OC(n.type)) && // Will already throw with "Element ref was specified as a string (someStringRef) but no owner was set"
      n._owner) {
        var r = ze(e) || "Component";
        jp[r] || (d('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. We recommend using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', r, a), jp[r] = !0);
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
        $t(a, "ref");
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
      var t = ze(e) || "Component";
      if (wp[t])
        return;
      wp[t] = !0, d("Functions are not valid as a React child. This may happen if you return a Component instead of <Component /> from render. Or maybe you meant to call this function rather than return it.");
    }
  }
  function xb(e) {
    var t = e._payload, n = e._init;
    return n(t);
  }
  function Eb(e) {
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
        return _.flags |= Dv, B;
      var ne = _.alternate;
      if (ne !== null) {
        var ge = ne.index;
        return ge < B ? (_.flags |= Wt, B) : ge;
      } else
        return _.flags |= Wt, B;
    }
    function l(_) {
      return e && _.alternate === null && (_.flags |= Wt), _;
    }
    function u(_, B, O, ne) {
      if (B === null || B.tag !== ee) {
        var ge = Rh(O, _.mode, ne);
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
      jN(B, O) || // Lazy types should reconcile their resolved type.
      // We need to do this after the Hot Reloading check above,
      // because hot reloading has different semantics than prod because
      // it doesn't resuspend. So we can't let the call below suspend.
      typeof ge == "object" && ge !== null && ge.$$typeof === je && xb(ge) === B.type)) {
        var me = r(B, O.props);
        return me.ref = ys(_, B, O), me.return = _, me._debugSource = O._source, me._debugOwner = O._owner, me;
      }
      var Me = Sh(O, _.mode, ne);
      return Me.ref = ys(_, B, O), Me.return = _, Me;
    }
    function h(_, B, O, ne) {
      if (B === null || B.tag !== T || B.stateNode.containerInfo !== O.containerInfo || B.stateNode.implementation !== O.implementation) {
        var ge = Dh(O, _.mode, ne);
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
        var Me = r(B, O);
        return Me.return = _, Me;
      }
    }
    function C(_, B, O) {
      if (typeof B == "string" && B !== "" || typeof B == "number") {
        var ne = Rh("" + B, _.mode, O);
        return ne.return = _, ne;
      }
      if (typeof B == "object" && B !== null) {
        switch (B.$$typeof) {
          case da: {
            var ge = Sh(B, _.mode, O);
            return ge.ref = ys(_, null, B), ge.return = _, ge;
          }
          case ea: {
            var me = Dh(B, _.mode, O);
            return me.return = _, me;
          }
          case je: {
            var Me = B._payload, Fe = B._init;
            return C(_, Fe(Me), O);
          }
        }
        if (Ge(B) || Ca(B)) {
          var gt = oi(B, _.mode, O, null);
          return gt.return = _, gt;
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
          case da:
            return O.key === ge ? c(_, B, O, ne) : null;
          case ea:
            return O.key === ge ? h(_, B, O, ne) : null;
          case je: {
            var me = O._payload, Me = O._init;
            return D(_, B, Me(me), ne);
          }
        }
        if (Ge(O) || Ca(O))
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
          case da: {
            var Me = _.get(ne.key === null ? O : ne.key) || null;
            return c(B, Me, ne, ge);
          }
          case ea: {
            var Fe = _.get(ne.key === null ? O : ne.key) || null;
            return h(B, Fe, ne, ge);
          }
          case je:
            var gt = ne._payload, nt = ne._init;
            return V(_, B, O, nt(gt), ge);
        }
        if (Ge(ne) || Ca(ne)) {
          var Bt = _.get(O) || null;
          return v(B, Bt, ne, ge, null);
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
          case da:
          case ea:
            Nb(_, O);
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
          case je:
            var ge = _._payload, me = _._init;
            L(me(ge), B, O);
            break;
        }
      }
      return B;
    }
    function H(_, B, O, ne) {
      for (var ge = null, me = 0; me < O.length; me++) {
        var Me = O[me];
        ge = L(Me, ge, _);
      }
      for (var Fe = null, gt = null, nt = B, Bt = 0, at = 0, Ht = null; nt !== null && at < O.length; at++) {
        nt.index > at ? (Ht = nt, nt = null) : Ht = nt.sibling;
        var Ln = D(_, nt, O[at], ne);
        if (Ln === null) {
          nt === null && (nt = Ht);
          break;
        }
        e && nt && Ln.alternate === null && t(_, nt), Bt = i(Ln, Bt, at), gt === null ? Fe = Ln : gt.sibling = Ln, gt = Ln, nt = Ht;
      }
      if (at === O.length) {
        if (n(_, nt), En()) {
          var wn = at;
          Ui(_, wn);
        }
        return Fe;
      }
      if (nt === null) {
        for (; at < O.length; at++) {
          var sa = C(_, O[at], ne);
          sa !== null && (Bt = i(sa, Bt, at), gt === null ? Fe = sa : gt.sibling = sa, gt = sa);
        }
        if (En()) {
          var Yn = at;
          Ui(_, Yn);
        }
        return Fe;
      }
      for (var qn = a(_, nt); at < O.length; at++) {
        var kn = V(qn, _, at, O[at], ne);
        kn !== null && (e && kn.alternate !== null && qn.delete(kn.key === null ? at : kn.key), Bt = i(kn, Bt, at), gt === null ? Fe = kn : gt.sibling = kn, gt = kn);
      }
      if (e && qn.forEach(function(eo) {
        return t(_, eo);
      }), En()) {
        var Or = at;
        Ui(_, Or);
      }
      return Fe;
    }
    function fe(_, B, O, ne) {
      var ge = Ca(O);
      if (typeof ge != "function")
        throw new Error("An object is not an iterable. This error is likely caused by a bug in React. Please file an issue.");
      {
        typeof Symbol == "function" && // $FlowFixMe Flow doesn't know about toStringTag
        O[Symbol.toStringTag] === "Generator" && (Cp || d("Using Generators as children is unsupported and will likely yield unexpected results because enumerating a generator mutates it. You may convert it to an array with `Array.from()` or the `[...spread]` operator before rendering. Keep in mind you might need to polyfill these features for older browsers."), Cp = !0), O.entries === ge && (Dp || d("Using Maps as children is not supported. Use an array of keyed ReactElements instead."), Dp = !0);
        var me = ge.call(O);
        if (me)
          for (var Me = null, Fe = me.next(); !Fe.done; Fe = me.next()) {
            var gt = Fe.value;
            Me = L(gt, Me, _);
          }
      }
      var nt = ge.call(O);
      if (nt == null)
        throw new Error("An iterable object provided no iterator.");
      for (var Bt = null, at = null, Ht = B, Ln = 0, wn = 0, sa = null, Yn = nt.next(); Ht !== null && !Yn.done; wn++, Yn = nt.next()) {
        Ht.index > wn ? (sa = Ht, Ht = null) : sa = Ht.sibling;
        var qn = D(_, Ht, Yn.value, ne);
        if (qn === null) {
          Ht === null && (Ht = sa);
          break;
        }
        e && Ht && qn.alternate === null && t(_, Ht), Ln = i(qn, Ln, wn), at === null ? Bt = qn : at.sibling = qn, at = qn, Ht = sa;
      }
      if (Yn.done) {
        if (n(_, Ht), En()) {
          var kn = wn;
          Ui(_, kn);
        }
        return Bt;
      }
      if (Ht === null) {
        for (; !Yn.done; wn++, Yn = nt.next()) {
          var Or = C(_, Yn.value, ne);
          Or !== null && (Ln = i(Or, Ln, wn), at === null ? Bt = Or : at.sibling = Or, at = Or);
        }
        if (En()) {
          var eo = wn;
          Ui(_, eo);
        }
        return Bt;
      }
      for (var Xs = a(_, Ht); !Yn.done; wn++, Yn = nt.next()) {
        var ir = V(Xs, _, wn, Yn.value, ne);
        ir !== null && (e && ir.alternate !== null && Xs.delete(ir.key === null ? wn : ir.key), Ln = i(ir, Ln, wn), at === null ? Bt = ir : at.sibling = ir, at = ir);
      }
      if (e && Xs.forEach(function(aw) {
        return t(_, aw);
      }), En()) {
        var nw = wn;
        Ui(_, nw);
      }
      return Bt;
    }
    function Ce(_, B, O, ne) {
      if (B !== null && B.tag === ee) {
        n(_, B.sibling);
        var ge = r(B, O);
        return ge.return = _, ge;
      }
      n(_, B);
      var me = Rh(O, _.mode, ne);
      return me.return = _, me;
    }
    function Se(_, B, O, ne) {
      for (var ge = O.key, me = B; me !== null; ) {
        if (me.key === ge) {
          var Me = O.type;
          if (Me === Ia) {
            if (me.tag === pe) {
              n(_, me.sibling);
              var Fe = r(me, O.props.children);
              return Fe.return = _, Fe._debugSource = O._source, Fe._debugOwner = O._owner, Fe;
            }
          } else if (me.elementType === Me || // Keep this check inline so it only runs on the false path:
          jN(me, O) || // Lazy types should reconcile their resolved type.
          // We need to do this after the Hot Reloading check above,
          // because hot reloading has different semantics than prod because
          // it doesn't resuspend. So we can't let the call below suspend.
          typeof Me == "object" && Me !== null && Me.$$typeof === je && xb(Me) === me.type) {
            n(_, me.sibling);
            var gt = r(me, O.props);
            return gt.ref = ys(_, me, O), gt.return = _, gt._debugSource = O._source, gt._debugOwner = O._owner, gt;
          }
          n(_, me);
          break;
        } else
          t(_, me);
        me = me.sibling;
      }
      if (O.type === Ia) {
        var nt = oi(O.props.children, _.mode, ne, O.key);
        return nt.return = _, nt;
      } else {
        var Bt = Sh(O, _.mode, ne);
        return Bt.ref = ys(_, B, O), Bt.return = _, Bt;
      }
    }
    function Ze(_, B, O, ne) {
      for (var ge = O.key, me = B; me !== null; ) {
        if (me.key === ge)
          if (me.tag === T && me.stateNode.containerInfo === O.containerInfo && me.stateNode.implementation === O.implementation) {
            n(_, me.sibling);
            var Me = r(me, O.children || []);
            return Me.return = _, Me;
          } else {
            n(_, me);
            break;
          }
        else
          t(_, me);
        me = me.sibling;
      }
      var Fe = Dh(O, _.mode, ne);
      return Fe.return = _, Fe;
    }
    function We(_, B, O, ne) {
      var ge = typeof O == "object" && O !== null && O.type === Ia && O.key === null;
      if (ge && (O = O.props.children), typeof O == "object" && O !== null) {
        switch (O.$$typeof) {
          case da:
            return l(Se(_, B, O, ne));
          case ea:
            return l(Ze(_, B, O, ne));
          case je:
            var me = O._payload, Me = O._init;
            return We(_, B, Me(me), ne);
        }
        if (Ge(O))
          return H(_, B, O, ne);
        if (Ca(O))
          return fe(_, B, O, ne);
        pc(_, O);
      }
      return typeof O == "string" && O !== "" || typeof O == "number" ? l(Ce(_, B, "" + O, ne)) : (typeof O == "function" && mc(_), n(_, B));
    }
    return We;
  }
  var kl = Eb(!0), Sb = Eb(!1);
  function MC(e, t) {
    if (e !== null && t.child !== e.child)
      throw new Error("Resuming work not yet implemented.");
    if (t.child !== null) {
      var n = t.child, a = Qi(n, n.pendingProps);
      for (t.child = a, a.return = t; n.sibling !== null; )
        n = n.sibling, a = a.sibling = Qi(n, n.pendingProps), a.return = t;
      a.sibling = null;
    }
  }
  function VC(e, t) {
    for (var n = e.child; n !== null; )
      NT(n, t), n = n.sibling;
  }
  var _p = Gr(null), Op;
  Op = {};
  var hc = null, Ul = null, Mp = null, vc = !1;
  function gc() {
    hc = null, Ul = null, Mp = null, vc = !1;
  }
  function Rb() {
    vc = !0;
  }
  function Db() {
    vc = !1;
  }
  function Cb(e, t, n) {
    Vn(_p, t._currentValue, e), t._currentValue = n, t._currentRenderer !== void 0 && t._currentRenderer !== null && t._currentRenderer !== Op && d("Detected multiple renderers concurrently rendering the same context provider. This is currently unsupported."), t._currentRenderer = Op;
  }
  function Vp(e, t) {
    var n = _p.current;
    Mn(_p, t), e._currentValue = n;
  }
  function Ap(e, t, n) {
    for (var a = e; a !== null; ) {
      var r = a.alternate;
      if (xl(a.childLanes, t) ? r !== null && !xl(r.childLanes, t) && (r.childLanes = Ye(r.childLanes, t)) : (a.childLanes = Ye(a.childLanes, t), r !== null && (r.childLanes = Ye(r.childLanes, t))), a === n)
        break;
      a = a.return;
    }
    a !== n && d("Expected to find the propagation root when scheduling context work. This error is likely caused by a bug in React. Please file an issue.");
  }
  function AC(e, t, n) {
    LC(e, t, n);
  }
  function LC(e, t, n) {
    var a = e.child;
    for (a !== null && (a.return = e); a !== null; ) {
      var r = void 0, i = a.dependencies;
      if (i !== null) {
        r = a.child;
        for (var l = i.firstContext; l !== null; ) {
          if (l.context === t) {
            if (a.tag === j) {
              var u = Uo(n), c = Dr(Rt, u);
              c.tag = yc;
              var h = a.updateQueue;
              if (h !== null) {
                var v = h.shared, C = v.pending;
                C === null ? c.next = c : (c.next = C.next, C.next = c), v.pending = c;
              }
            }
            a.lanes = Ye(a.lanes, n);
            var D = a.alternate;
            D !== null && (D.lanes = Ye(D.lanes, n)), Ap(a.return, n, e), i.lanes = Ye(i.lanes, n);
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
        V.lanes = Ye(V.lanes, n);
        var L = V.alternate;
        L !== null && (L.lanes = Ye(L.lanes, n)), Ap(V, n, e), r = a.sibling;
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
  function Fl(e, t) {
    hc = e, Ul = null, Mp = null;
    var n = e.dependencies;
    if (n !== null) {
      var a = n.firstContext;
      a !== null && (na(n.lanes, t) && As(), n.firstContext = null);
    }
  }
  function Kt(e) {
    vc && d("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
    var t = e._currentValue;
    if (Mp !== e) {
      var n = {
        context: e,
        memoizedValue: t,
        next: null
      };
      if (Ul === null) {
        if (hc === null)
          throw new Error("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
        Ul = n, hc.dependencies = {
          lanes: X,
          firstContext: n
        };
      } else
        Ul = Ul.next = n;
    }
    return t;
  }
  var Bi = null;
  function Lp(e) {
    Bi === null ? Bi = [e] : Bi.push(e);
  }
  function kC() {
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
  function jb(e, t, n, a) {
    var r = t.interleaved;
    return r === null ? (n.next = n, Lp(t)) : (n.next = r.next, r.next = n), t.interleaved = n, bc(e, a);
  }
  function UC(e, t, n, a) {
    var r = t.interleaved;
    r === null ? (n.next = n, Lp(t)) : (n.next = r.next, r.next = n), t.interleaved = n;
  }
  function FC(e, t, n, a) {
    var r = t.interleaved;
    return r === null ? (n.next = n, Lp(t)) : (n.next = r.next, r.next = n), t.interleaved = n, bc(e, a);
  }
  function Qn(e, t) {
    return bc(e, t);
  }
  var zC = bc;
  function bc(e, t) {
    e.lanes = Ye(e.lanes, t);
    var n = e.alternate;
    n !== null && (n.lanes = Ye(n.lanes, t)), n === null && (e.flags & (Wt | hr)) !== Oe && SN(e);
    for (var a = e, r = e.return; r !== null; )
      r.childLanes = Ye(r.childLanes, t), n = r.alternate, n !== null ? n.childLanes = Ye(n.childLanes, t) : (r.flags & (Wt | hr)) !== Oe && SN(e), a = r, r = r.return;
    if (a.tag === x) {
      var i = a.stateNode;
      return i;
    } else
      return null;
  }
  var Tb = 0, wb = 1, yc = 2, kp = 3, Nc = !1, Up, xc;
  Up = !1, xc = null;
  function Fp(e) {
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
  function _b(e, t) {
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
      tag: Tb,
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
    if (xc === r && !Up && (d("An update (setState, replaceState, or forceUpdate) was scheduled from inside an update function. Update functions should be pure, with zero side-effects. Consider using componentDidUpdate or a callback."), Up = !0), U1()) {
      var i = r.pending;
      return i === null ? t.next = t : (t.next = i.next, i.next = t), r.pending = t, zC(e, n);
    } else
      return FC(e, r, t, n);
  }
  function Ec(e, t, n) {
    var a = t.updateQueue;
    if (a !== null) {
      var r = a.shared;
      if ($v(n)) {
        var i = r.lanes;
        i = Yv(i, e.pendingLanes);
        var l = Ye(i, n);
        r.lanes = l, _f(e, l);
      }
    }
  }
  function zp(e, t) {
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
  function PC(e, t, n, a, r, i) {
    switch (n.tag) {
      case wb: {
        var l = n.payload;
        if (typeof l == "function") {
          Rb();
          var u = l.call(i, a, r);
          {
            if (e.mode & Pt) {
              hn(!0);
              try {
                l.call(i, a, r);
              } finally {
                hn(!1);
              }
            }
            Db();
          }
          return u;
        }
        return l;
      }
      case kp:
        e.flags = e.flags & ~Hn | ot;
      case Tb: {
        var c = n.payload, h;
        if (typeof c == "function") {
          Rb(), h = c.call(i, a, r);
          {
            if (e.mode & Pt) {
              hn(!0);
              try {
                c.call(i, a, r);
              } finally {
                hn(!1);
              }
            }
            Db();
          }
        } else
          h = c;
        return h == null ? a : qe({}, a, h);
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
      var V = r.baseState, L = X, H = null, fe = null, Ce = null, Se = i;
      do {
        var Ze = Se.lane, We = Se.eventTime;
        if (xl(a, Ze)) {
          if (Ce !== null) {
            var B = {
              eventTime: We,
              // This update is going to be committed so we never want uncommit
              // it. Using NoLane works because 0 is a subset of all bitmasks, so
              // this will never be skipped by the check above.
              lane: vn,
              tag: Se.tag,
              payload: Se.payload,
              callback: Se.callback,
              next: null
            };
            Ce = Ce.next = B;
          }
          V = PC(e, r, Se, V, t, n);
          var O = Se.callback;
          if (O !== null && // If the update was already committed, we should not queue its
          // callback again.
          Se.lane !== vn) {
            e.flags |= Rv;
            var ne = r.effects;
            ne === null ? r.effects = [Se] : ne.push(Se);
          }
        } else {
          var _ = {
            eventTime: We,
            lane: Ze,
            tag: Se.tag,
            payload: Se.payload,
            callback: Se.callback,
            next: null
          };
          Ce === null ? (fe = Ce = _, H = V) : Ce = Ce.next = _, L = Ye(L, Ze);
        }
        if (Se = Se.next, Se === null) {
          if (u = r.shared.pending, u === null)
            break;
          var ge = u, me = ge.next;
          ge.next = null, Se = me, r.lastBaseUpdate = ge, r.shared.pending = null;
        }
      } while (!0);
      Ce === null && (H = V), r.baseState = H, r.firstBaseUpdate = fe, r.lastBaseUpdate = Ce;
      var Me = r.shared.interleaved;
      if (Me !== null) {
        var Fe = Me;
        do
          L = Ye(L, Fe.lane), Fe = Fe.next;
        while (Fe !== Me);
      } else i === null && (r.shared.lanes = X);
      qs(L), e.lanes = L, e.memoizedState = V;
    }
    xc = null;
  }
  function HC(e, t) {
    if (typeof e != "function")
      throw new Error("Invalid argument passed as callback. Expected a function. Instead " + ("received: " + e));
    e.call(t);
  }
  function Ob() {
    Nc = !1;
  }
  function Rc() {
    return Nc;
  }
  function Mb(e, t, n) {
    var a = t.effects;
    if (t.effects = null, a !== null)
      for (var r = 0; r < a.length; r++) {
        var i = a[r], l = i.callback;
        l !== null && (i.callback = null, HC(l, n));
      }
  }
  var Ns = {}, Jr = Gr(Ns), xs = Gr(Ns), Dc = Gr(Ns);
  function Cc(e) {
    if (e === Ns)
      throw new Error("Expected host context to exist. This error is likely caused by a bug in React. Please file an issue.");
    return e;
  }
  function Vb() {
    var e = Cc(Dc.current);
    return e;
  }
  function Pp(e, t) {
    Vn(Dc, t, e), Vn(xs, e, e), Vn(Jr, Ns, e);
    var n = rD(t);
    Mn(Jr, e), Vn(Jr, n, e);
  }
  function zl(e) {
    Mn(Jr, e), Mn(xs, e), Mn(Dc, e);
  }
  function Hp() {
    var e = Cc(Jr.current);
    return e;
  }
  function Ab(e) {
    Cc(Dc.current);
    var t = Cc(Jr.current), n = iD(t, e.type);
    t !== n && (Vn(xs, e, e), Vn(Jr, n, e));
  }
  function Bp(e) {
    xs.current === e && (Mn(Jr, e), Mn(xs, e));
  }
  var BC = 0, Lb = 1, kb = 1, Es = 2, Va = Gr(BC);
  function $p(e, t) {
    return (e & t) !== 0;
  }
  function Pl(e) {
    return e & Lb;
  }
  function Ip(e, t) {
    return e & Lb | t;
  }
  function $C(e, t) {
    return e | t;
  }
  function Zr(e, t) {
    Vn(Va, t, e);
  }
  function Hl(e) {
    Mn(Va, e);
  }
  function IC(e, t) {
    var n = e.memoizedState;
    return n !== null ? n.dehydrated !== null : (e.memoizedProps, !0);
  }
  function jc(e) {
    for (var t = e; t !== null; ) {
      if (t.tag === te) {
        var n = t.memoizedState;
        if (n !== null) {
          var a = n.dehydrated;
          if (a === null || Zg(a) || sp(a))
            return t;
        }
      } else if (t.tag === ie && // revealOrder undefined can't be trusted because it don't
      // keep track of whether it suspended or not.
      t.memoizedProps.revealOrder !== void 0) {
        var r = (t.flags & ot) !== Oe;
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
  var Xn = (
    /*   */
    0
  ), an = (
    /* */
    1
  ), Ja = (
    /*  */
    2
  ), rn = (
    /*    */
    4
  ), Sn = (
    /*   */
    8
  ), Yp = [];
  function qp() {
    for (var e = 0; e < Yp.length; e++) {
      var t = Yp[e];
      t._workInProgressVersionPrimary = null;
    }
    Yp.length = 0;
  }
  function YC(e, t) {
    var n = t._getVersion, a = n(t._source);
    e.mutableSourceEagerHydrationData == null ? e.mutableSourceEagerHydrationData = [t, a] : e.mutableSourceEagerHydrationData.push(t, a);
  }
  var ve = m.ReactCurrentDispatcher, Ss = m.ReactCurrentBatchConfig, Gp, Bl;
  Gp = /* @__PURE__ */ new Set();
  var $i = X, vt = null, ln = null, on = null, Tc = !1, Rs = !1, Ds = 0, qC = 0, GC = 25, I = null, va = null, ei = -1, Wp = !1;
  function ct() {
    {
      var e = I;
      va === null ? va = [e] : va.push(e);
    }
  }
  function ue() {
    {
      var e = I;
      va !== null && (ei++, va[ei] !== e && WC(e));
    }
  }
  function $l(e) {
    e != null && !Ge(e) && d("%s received a final argument that is not an array (instead, received `%s`). When specified, the final argument must be an array.", I, typeof e);
  }
  function WC(e) {
    {
      var t = ze(vt);
      if (!Gp.has(t) && (Gp.add(t), va !== null)) {
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
  function An() {
    throw new Error(`Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:
1. You might have mismatching versions of React and the renderer (such as React DOM)
2. You might be breaking the Rules of Hooks
3. You might have more than one copy of React in the same app
See https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem.`);
  }
  function Kp(e, t) {
    if (Wp)
      return !1;
    if (t === null)
      return d("%s received a final argument during this render, but not during the previous render. Even though the final argument is optional, its type cannot change between renders.", I), !1;
    e.length !== t.length && d(`The final argument passed to %s changed size between renders. The order and size of this array must remain constant.

Previous: %s
Incoming: %s`, I, "[" + t.join(", ") + "]", "[" + e.join(", ") + "]");
    for (var n = 0; n < t.length && n < e.length; n++)
      if (!ia(e[n], t[n]))
        return !1;
    return !0;
  }
  function Il(e, t, n, a, r, i) {
    $i = i, vt = t, va = e !== null ? e._debugHookTypes : null, ei = -1, Wp = e !== null && e.type !== t.type, t.memoizedState = null, t.updateQueue = null, t.lanes = X, e !== null && e.memoizedState !== null ? ve.current = ry : va !== null ? ve.current = ay : ve.current = ny;
    var l = n(a, r);
    if (Rs) {
      var u = 0;
      do {
        if (Rs = !1, Ds = 0, u >= GC)
          throw new Error("Too many re-renders. React limits the number of renders to prevent an infinite loop.");
        u += 1, Wp = !1, ln = null, on = null, t.updateQueue = null, ei = -1, ve.current = iy, l = n(a, r);
      } while (Rs);
    }
    ve.current = Hc, t._debugHookTypes = va;
    var c = ln !== null && ln.next !== null;
    if ($i = X, vt = null, ln = null, on = null, I = null, va = null, ei = -1, e !== null && (e.flags & vr) !== (t.flags & vr) && // Disable this warning in legacy mode, because legacy Suspense is weird
    // and creates false positives. To make this work in legacy mode, we'd
    // need to mark fibers that commit in an incomplete state, somehow. For
    // now I'll disable the warning that most of the bugs that would trigger
    // it are either exclusive to concurrent mode or exist in both.
    (e.mode & Xe) !== Te && d("Internal React error: Expected static flag was missing. Please notify the React team."), Tc = !1, c)
      throw new Error("Rendered fewer hooks than expected. This may be caused by an accidental early return statement.");
    return l;
  }
  function Yl() {
    var e = Ds !== 0;
    return Ds = 0, e;
  }
  function Ub(e, t, n) {
    t.updateQueue = e.updateQueue, (t.mode & Wa) !== Te ? t.flags &= -50333701 : t.flags &= -2053, e.lanes = wu(e.lanes, n);
  }
  function Fb() {
    if (ve.current = Hc, Tc) {
      for (var e = vt.memoizedState; e !== null; ) {
        var t = e.queue;
        t !== null && (t.pending = null), e = e.next;
      }
      Tc = !1;
    }
    $i = X, vt = null, ln = null, on = null, va = null, ei = -1, I = null, Xb = !1, Rs = !1, Ds = 0;
  }
  function Za() {
    var e = {
      memoizedState: null,
      baseState: null,
      baseQueue: null,
      queue: null,
      next: null
    };
    return on === null ? vt.memoizedState = on = e : on = on.next = e, on;
  }
  function ga() {
    var e;
    if (ln === null) {
      var t = vt.alternate;
      t !== null ? e = t.memoizedState : e = null;
    } else
      e = ln.next;
    var n;
    if (on === null ? n = vt.memoizedState : n = on.next, n !== null)
      on = n, n = on.next, ln = e;
    else {
      if (e === null)
        throw new Error("Rendered more hooks than during the previous render.");
      ln = e;
      var a = {
        memoizedState: ln.memoizedState,
        baseState: ln.baseState,
        baseQueue: ln.baseQueue,
        queue: ln.queue,
        next: null
      };
      on === null ? vt.memoizedState = on = a : on = on.next = a;
    }
    return on;
  }
  function zb() {
    return {
      lastEffect: null,
      stores: null
    };
  }
  function Qp(e, t) {
    return typeof t == "function" ? t(e) : t;
  }
  function Xp(e, t, n) {
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
    var l = i.dispatch = JC.bind(null, vt, i);
    return [a.memoizedState, l];
  }
  function Jp(e, t, n) {
    var a = ga(), r = a.queue;
    if (r === null)
      throw new Error("Should have a queue. This is likely a bug in React. Please file an issue.");
    r.lastRenderedReducer = e;
    var i = ln, l = i.baseQueue, u = r.pending;
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
        if (xl($i, fe)) {
          if (L !== null) {
            var Se = {
              // This update is going to be committed so we never want uncommit
              // it. Using NoLane works because 0 is a subset of all bitmasks, so
              // this will never be skipped by the check above.
              lane: vn,
              action: H.action,
              hasEagerState: H.hasEagerState,
              eagerState: H.eagerState,
              next: null
            };
            L = L.next = Se;
          }
          if (H.hasEagerState)
            C = H.eagerState;
          else {
            var Ze = H.action;
            C = e(C, Ze);
          }
        } else {
          var Ce = {
            lane: fe,
            action: H.action,
            hasEagerState: H.hasEagerState,
            eagerState: H.eagerState,
            next: null
          };
          L === null ? (V = L = Ce, D = C) : L = L.next = Ce, vt.lanes = Ye(vt.lanes, fe), qs(fe);
        }
        H = H.next;
      } while (H !== null && H !== v);
      L === null ? D = C : L.next = V, ia(C, a.memoizedState) || As(), a.memoizedState = C, a.baseState = D, a.baseQueue = L, r.lastRenderedState = C;
    }
    var We = r.interleaved;
    if (We !== null) {
      var _ = We;
      do {
        var B = _.lane;
        vt.lanes = Ye(vt.lanes, B), qs(B), _ = _.next;
      } while (_ !== We);
    } else l === null && (r.lanes = X);
    var O = r.dispatch;
    return [a.memoizedState, O];
  }
  function Zp(e, t, n) {
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
      ia(u, a.memoizedState) || As(), a.memoizedState = u, a.baseQueue === null && (a.baseState = u), r.lastRenderedState = u;
    }
    return [u, i];
  }
  function aO(e, t, n) {
  }
  function rO(e, t, n) {
  }
  function em(e, t, n) {
    var a = vt, r = Za(), i, l = En();
    if (l) {
      if (n === void 0)
        throw new Error("Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering.");
      i = n(), Bl || i !== n() && (d("The result of getServerSnapshot should be cached to avoid an infinite loop"), Bl = !0);
    } else {
      if (i = t(), !Bl) {
        var u = t();
        ia(i, u) || (d("The result of getSnapshot should be cached to avoid an infinite loop"), Bl = !0);
      }
      var c = ld();
      if (c === null)
        throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
      Tu(c, $i) || Pb(a, t, i);
    }
    r.memoizedState = i;
    var h = {
      value: i,
      getSnapshot: t
    };
    return r.queue = h, Vc(Bb.bind(null, a, h, e), [e]), a.flags |= Fr, Cs(an | Sn, Hb.bind(null, a, h, i, t), void 0, null), i;
  }
  function wc(e, t, n) {
    var a = vt, r = ga(), i = t();
    if (!Bl) {
      var l = t();
      ia(i, l) || (d("The result of getSnapshot should be cached to avoid an infinite loop"), Bl = !0);
    }
    var u = r.memoizedState, c = !ia(u, i);
    c && (r.memoizedState = i, As());
    var h = r.queue;
    if (Ts(Bb.bind(null, a, h, e), [e]), h.getSnapshot !== t || c || // Check if the susbcribe function changed. We can save some memory by
    // checking whether we scheduled a subscription effect above.
    on !== null && on.memoizedState.tag & an) {
      a.flags |= Fr, Cs(an | Sn, Hb.bind(null, a, h, i, t), void 0, null);
      var v = ld();
      if (v === null)
        throw new Error("Expected a work-in-progress root. This is a bug in React. Please file an issue.");
      Tu(v, $i) || Pb(a, t, i);
    }
    return i;
  }
  function Pb(e, t, n) {
    e.flags |= Kd;
    var a = {
      getSnapshot: t,
      value: n
    }, r = vt.updateQueue;
    if (r === null)
      r = zb(), vt.updateQueue = r, r.stores = [a];
    else {
      var i = r.stores;
      i === null ? r.stores = [a] : i.push(a);
    }
  }
  function Hb(e, t, n, a) {
    t.value = n, t.getSnapshot = a, $b(t) && Ib(e);
  }
  function Bb(e, t, n) {
    var a = function() {
      $b(t) && Ib(e);
    };
    return n(a);
  }
  function $b(e) {
    var t = e.getSnapshot, n = e.value;
    try {
      var a = t();
      return !ia(n, a);
    } catch {
      return !0;
    }
  }
  function Ib(e) {
    var t = Qn(e, Le);
    t !== null && dn(t, e, Le, Rt);
  }
  function _c(e) {
    var t = Za();
    typeof e == "function" && (e = e()), t.memoizedState = t.baseState = e;
    var n = {
      pending: null,
      interleaved: null,
      lanes: X,
      dispatch: null,
      lastRenderedReducer: Qp,
      lastRenderedState: e
    };
    t.queue = n;
    var a = n.dispatch = ZC.bind(null, vt, n);
    return [t.memoizedState, a];
  }
  function tm(e) {
    return Jp(Qp);
  }
  function nm(e) {
    return Zp(Qp);
  }
  function Cs(e, t, n, a) {
    var r = {
      tag: e,
      create: t,
      destroy: n,
      deps: a,
      // Circular
      next: null
    }, i = vt.updateQueue;
    if (i === null)
      i = zb(), vt.updateQueue = i, i.lastEffect = r.next = r;
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
  function am(e) {
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
    vt.flags |= e, r.memoizedState = Cs(an | t, n, void 0, i);
  }
  function Mc(e, t, n, a) {
    var r = ga(), i = a === void 0 ? null : a, l = void 0;
    if (ln !== null) {
      var u = ln.memoizedState;
      if (l = u.destroy, i !== null) {
        var c = u.deps;
        if (Kp(i, c)) {
          r.memoizedState = Cs(t, n, l, i);
          return;
        }
      }
    }
    vt.flags |= e, r.memoizedState = Cs(an | t, n, l, i);
  }
  function Vc(e, t) {
    return (vt.mode & Wa) !== Te ? js(Zd | Fr | Jd, Sn, e, t) : js(Fr | Jd, Sn, e, t);
  }
  function Ts(e, t) {
    return Mc(Fr, Sn, e, t);
  }
  function rm(e, t) {
    return js(lt, Ja, e, t);
  }
  function Ac(e, t) {
    return Mc(lt, Ja, e, t);
  }
  function im(e, t) {
    var n = lt;
    return n |= Ci, (vt.mode & Wa) !== Te && (n |= zr), js(n, rn, e, t);
  }
  function Lc(e, t) {
    return Mc(lt, rn, e, t);
  }
  function Yb(e, t) {
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
  function lm(e, t, n) {
    typeof t != "function" && d("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t !== null ? typeof t : "null");
    var a = n != null ? n.concat([e]) : null, r = lt;
    return r |= Ci, (vt.mode & Wa) !== Te && (r |= zr), js(r, rn, Yb.bind(null, t, e), a);
  }
  function kc(e, t, n) {
    typeof t != "function" && d("Expected useImperativeHandle() second argument to be a function that creates a handle. Instead received: %s.", t !== null ? typeof t : "null");
    var a = n != null ? n.concat([e]) : null;
    return Mc(lt, rn, Yb.bind(null, t, e), a);
  }
  function KC(e, t) {
  }
  var Uc = KC;
  function om(e, t) {
    var n = Za(), a = t === void 0 ? null : t;
    return n.memoizedState = [e, a], e;
  }
  function Fc(e, t) {
    var n = ga(), a = t === void 0 ? null : t, r = n.memoizedState;
    if (r !== null && a !== null) {
      var i = r[1];
      if (Kp(a, i))
        return r[0];
    }
    return n.memoizedState = [e, a], e;
  }
  function sm(e, t) {
    var n = Za(), a = t === void 0 ? null : t, r = e();
    return n.memoizedState = [r, a], r;
  }
  function zc(e, t) {
    var n = ga(), a = t === void 0 ? null : t, r = n.memoizedState;
    if (r !== null && a !== null) {
      var i = r[1];
      if (Kp(a, i))
        return r[0];
    }
    var l = e();
    return n.memoizedState = [l, a], l;
  }
  function um(e) {
    var t = Za();
    return t.memoizedState = e, e;
  }
  function qb(e) {
    var t = ga(), n = ln, a = n.memoizedState;
    return Wb(t, a, e);
  }
  function Gb(e) {
    var t = ga();
    if (ln === null)
      return t.memoizedState = e, e;
    var n = ln.memoizedState;
    return Wb(t, n, e);
  }
  function Wb(e, t, n) {
    var a = !AS($i);
    if (a) {
      if (!ia(n, t)) {
        var r = Iv();
        vt.lanes = Ye(vt.lanes, r), qs(r), e.baseState = !0;
      }
      return t;
    } else
      return e.baseState && (e.baseState = !1, As()), e.memoizedState = n, n;
  }
  function QC(e, t, n) {
    var a = wa();
    gn($S(a, br)), e(!0);
    var r = Ss.transition;
    Ss.transition = {};
    var i = Ss.transition;
    Ss.transition._updatedFibers = /* @__PURE__ */ new Set();
    try {
      e(!1), t();
    } finally {
      if (gn(a), Ss.transition = r, r === null && i._updatedFibers) {
        var l = i._updatedFibers.size;
        l > 10 && S("Detected a large number of updates inside startTransition. If this is due to a subscription please re-write it to use React provided hooks. Otherwise concurrent mode guarantees are off the table."), i._updatedFibers.clear();
      }
    }
  }
  function cm() {
    var e = _c(!1), t = e[0], n = e[1], a = QC.bind(null, n), r = Za();
    return r.memoizedState = a, [t, a];
  }
  function Kb() {
    var e = tm(), t = e[0], n = ga(), a = n.memoizedState;
    return [t, a];
  }
  function Qb() {
    var e = nm(), t = e[0], n = ga(), a = n.memoizedState;
    return [t, a];
  }
  var Xb = !1;
  function XC() {
    return Xb;
  }
  function dm() {
    var e = Za(), t = ld(), n = t.identifierPrefix, a;
    if (En()) {
      var r = mC();
      a = ":" + n + "R" + r;
      var i = Ds++;
      i > 0 && (a += "H" + i.toString(32)), a += ":";
    } else {
      var l = qC++;
      a = ":" + n + "r" + l.toString(32) + ":";
    }
    return e.memoizedState = a, a;
  }
  function Pc() {
    var e = ga(), t = e.memoizedState;
    return t;
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
    if (Jb(e))
      Zb(t, r);
    else {
      var i = jb(e, t, r, a);
      if (i !== null) {
        var l = In();
        dn(i, e, a, l), ey(i, t, a);
      }
    }
    ty(e, a);
  }
  function ZC(e, t, n) {
    typeof arguments[3] == "function" && d("State updates from the useState() and useReducer() Hooks don't support the second callback argument. To execute a side effect after rendering, declare it in the component body with useEffect().");
    var a = ii(e), r = {
      lane: a,
      action: n,
      hasEagerState: !1,
      eagerState: null,
      next: null
    };
    if (Jb(e))
      Zb(t, r);
    else {
      var i = e.alternate;
      if (e.lanes === X && (i === null || i.lanes === X)) {
        var l = t.lastRenderedReducer;
        if (l !== null) {
          var u;
          u = ve.current, ve.current = Aa;
          try {
            var c = t.lastRenderedState, h = l(c, n);
            if (r.hasEagerState = !0, r.eagerState = h, ia(h, c)) {
              UC(e, t, r, a);
              return;
            }
          } catch {
          } finally {
            ve.current = u;
          }
        }
      }
      var v = jb(e, t, r, a);
      if (v !== null) {
        var C = In();
        dn(v, e, a, C), ey(v, t, a);
      }
    }
    ty(e, a);
  }
  function Jb(e) {
    var t = e.alternate;
    return e === vt || t !== null && t === vt;
  }
  function Zb(e, t) {
    Rs = Tc = !0;
    var n = e.pending;
    n === null ? t.next = t : (t.next = n.next, n.next = t), e.pending = t;
  }
  function ey(e, t, n) {
    if ($v(n)) {
      var a = t.lanes;
      a = Yv(a, e.pendingLanes);
      var r = Ye(a, n);
      t.lanes = r, _f(e, r);
    }
  }
  function ty(e, t, n) {
    rf(e, t);
  }
  var Hc = {
    readContext: Kt,
    useCallback: An,
    useContext: An,
    useEffect: An,
    useImperativeHandle: An,
    useInsertionEffect: An,
    useLayoutEffect: An,
    useMemo: An,
    useReducer: An,
    useRef: An,
    useState: An,
    useDebugValue: An,
    useDeferredValue: An,
    useTransition: An,
    useMutableSource: An,
    useSyncExternalStore: An,
    useId: An,
    unstable_isNewReconciler: ce
  }, ny = null, ay = null, ry = null, iy = null, er = null, Aa = null, Bc = null;
  {
    var fm = function() {
      d("Context can only be read while React is rendering. In classes, you can read it in the render method or getDerivedStateFromProps. In function components, you can read it directly in the function body, but not inside Hooks like useReducer() or useMemo().");
    }, ke = function() {
      d("Do not call Hooks inside useEffect(...), useMemo(...), or other built-in Hooks. You can only call Hooks at the top level of your React function. For more information, see https://reactjs.org/link/rules-of-hooks");
    };
    ny = {
      readContext: function(e) {
        return Kt(e);
      },
      useCallback: function(e, t) {
        return I = "useCallback", ct(), $l(t), om(e, t);
      },
      useContext: function(e) {
        return I = "useContext", ct(), Kt(e);
      },
      useEffect: function(e, t) {
        return I = "useEffect", ct(), $l(t), Vc(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return I = "useImperativeHandle", ct(), $l(n), lm(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return I = "useInsertionEffect", ct(), $l(t), rm(e, t);
      },
      useLayoutEffect: function(e, t) {
        return I = "useLayoutEffect", ct(), $l(t), im(e, t);
      },
      useMemo: function(e, t) {
        I = "useMemo", ct(), $l(t);
        var n = ve.current;
        ve.current = er;
        try {
          return sm(e, t);
        } finally {
          ve.current = n;
        }
      },
      useReducer: function(e, t, n) {
        I = "useReducer", ct();
        var a = ve.current;
        ve.current = er;
        try {
          return Xp(e, t, n);
        } finally {
          ve.current = a;
        }
      },
      useRef: function(e) {
        return I = "useRef", ct(), am(e);
      },
      useState: function(e) {
        I = "useState", ct();
        var t = ve.current;
        ve.current = er;
        try {
          return _c(e);
        } finally {
          ve.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return I = "useDebugValue", ct(), void 0;
      },
      useDeferredValue: function(e) {
        return I = "useDeferredValue", ct(), um(e);
      },
      useTransition: function() {
        return I = "useTransition", ct(), cm();
      },
      useMutableSource: function(e, t, n) {
        return I = "useMutableSource", ct(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return I = "useSyncExternalStore", ct(), em(e, t, n);
      },
      useId: function() {
        return I = "useId", ct(), dm();
      },
      unstable_isNewReconciler: ce
    }, ay = {
      readContext: function(e) {
        return Kt(e);
      },
      useCallback: function(e, t) {
        return I = "useCallback", ue(), om(e, t);
      },
      useContext: function(e) {
        return I = "useContext", ue(), Kt(e);
      },
      useEffect: function(e, t) {
        return I = "useEffect", ue(), Vc(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return I = "useImperativeHandle", ue(), lm(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return I = "useInsertionEffect", ue(), rm(e, t);
      },
      useLayoutEffect: function(e, t) {
        return I = "useLayoutEffect", ue(), im(e, t);
      },
      useMemo: function(e, t) {
        I = "useMemo", ue();
        var n = ve.current;
        ve.current = er;
        try {
          return sm(e, t);
        } finally {
          ve.current = n;
        }
      },
      useReducer: function(e, t, n) {
        I = "useReducer", ue();
        var a = ve.current;
        ve.current = er;
        try {
          return Xp(e, t, n);
        } finally {
          ve.current = a;
        }
      },
      useRef: function(e) {
        return I = "useRef", ue(), am(e);
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
        return I = "useDeferredValue", ue(), um(e);
      },
      useTransition: function() {
        return I = "useTransition", ue(), cm();
      },
      useMutableSource: function(e, t, n) {
        return I = "useMutableSource", ue(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return I = "useSyncExternalStore", ue(), em(e, t, n);
      },
      useId: function() {
        return I = "useId", ue(), dm();
      },
      unstable_isNewReconciler: ce
    }, ry = {
      readContext: function(e) {
        return Kt(e);
      },
      useCallback: function(e, t) {
        return I = "useCallback", ue(), Fc(e, t);
      },
      useContext: function(e) {
        return I = "useContext", ue(), Kt(e);
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
          return Jp(e, t, n);
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
          return tm(e);
        } finally {
          ve.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return I = "useDebugValue", ue(), Uc();
      },
      useDeferredValue: function(e) {
        return I = "useDeferredValue", ue(), qb(e);
      },
      useTransition: function() {
        return I = "useTransition", ue(), Kb();
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
    }, iy = {
      readContext: function(e) {
        return Kt(e);
      },
      useCallback: function(e, t) {
        return I = "useCallback", ue(), Fc(e, t);
      },
      useContext: function(e) {
        return I = "useContext", ue(), Kt(e);
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
          return Zp(e, t, n);
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
          return nm(e);
        } finally {
          ve.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return I = "useDebugValue", ue(), Uc();
      },
      useDeferredValue: function(e) {
        return I = "useDeferredValue", ue(), Gb(e);
      },
      useTransition: function() {
        return I = "useTransition", ue(), Qb();
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
        return fm(), Kt(e);
      },
      useCallback: function(e, t) {
        return I = "useCallback", ke(), ct(), om(e, t);
      },
      useContext: function(e) {
        return I = "useContext", ke(), ct(), Kt(e);
      },
      useEffect: function(e, t) {
        return I = "useEffect", ke(), ct(), Vc(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return I = "useImperativeHandle", ke(), ct(), lm(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return I = "useInsertionEffect", ke(), ct(), rm(e, t);
      },
      useLayoutEffect: function(e, t) {
        return I = "useLayoutEffect", ke(), ct(), im(e, t);
      },
      useMemo: function(e, t) {
        I = "useMemo", ke(), ct();
        var n = ve.current;
        ve.current = er;
        try {
          return sm(e, t);
        } finally {
          ve.current = n;
        }
      },
      useReducer: function(e, t, n) {
        I = "useReducer", ke(), ct();
        var a = ve.current;
        ve.current = er;
        try {
          return Xp(e, t, n);
        } finally {
          ve.current = a;
        }
      },
      useRef: function(e) {
        return I = "useRef", ke(), ct(), am(e);
      },
      useState: function(e) {
        I = "useState", ke(), ct();
        var t = ve.current;
        ve.current = er;
        try {
          return _c(e);
        } finally {
          ve.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return I = "useDebugValue", ke(), ct(), void 0;
      },
      useDeferredValue: function(e) {
        return I = "useDeferredValue", ke(), ct(), um(e);
      },
      useTransition: function() {
        return I = "useTransition", ke(), ct(), cm();
      },
      useMutableSource: function(e, t, n) {
        return I = "useMutableSource", ke(), ct(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return I = "useSyncExternalStore", ke(), ct(), em(e, t, n);
      },
      useId: function() {
        return I = "useId", ke(), ct(), dm();
      },
      unstable_isNewReconciler: ce
    }, Aa = {
      readContext: function(e) {
        return fm(), Kt(e);
      },
      useCallback: function(e, t) {
        return I = "useCallback", ke(), ue(), Fc(e, t);
      },
      useContext: function(e) {
        return I = "useContext", ke(), ue(), Kt(e);
      },
      useEffect: function(e, t) {
        return I = "useEffect", ke(), ue(), Ts(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return I = "useImperativeHandle", ke(), ue(), kc(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return I = "useInsertionEffect", ke(), ue(), Ac(e, t);
      },
      useLayoutEffect: function(e, t) {
        return I = "useLayoutEffect", ke(), ue(), Lc(e, t);
      },
      useMemo: function(e, t) {
        I = "useMemo", ke(), ue();
        var n = ve.current;
        ve.current = Aa;
        try {
          return zc(e, t);
        } finally {
          ve.current = n;
        }
      },
      useReducer: function(e, t, n) {
        I = "useReducer", ke(), ue();
        var a = ve.current;
        ve.current = Aa;
        try {
          return Jp(e, t, n);
        } finally {
          ve.current = a;
        }
      },
      useRef: function(e) {
        return I = "useRef", ke(), ue(), Oc();
      },
      useState: function(e) {
        I = "useState", ke(), ue();
        var t = ve.current;
        ve.current = Aa;
        try {
          return tm(e);
        } finally {
          ve.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return I = "useDebugValue", ke(), ue(), Uc();
      },
      useDeferredValue: function(e) {
        return I = "useDeferredValue", ke(), ue(), qb(e);
      },
      useTransition: function() {
        return I = "useTransition", ke(), ue(), Kb();
      },
      useMutableSource: function(e, t, n) {
        return I = "useMutableSource", ke(), ue(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return I = "useSyncExternalStore", ke(), ue(), wc(e, t);
      },
      useId: function() {
        return I = "useId", ke(), ue(), Pc();
      },
      unstable_isNewReconciler: ce
    }, Bc = {
      readContext: function(e) {
        return fm(), Kt(e);
      },
      useCallback: function(e, t) {
        return I = "useCallback", ke(), ue(), Fc(e, t);
      },
      useContext: function(e) {
        return I = "useContext", ke(), ue(), Kt(e);
      },
      useEffect: function(e, t) {
        return I = "useEffect", ke(), ue(), Ts(e, t);
      },
      useImperativeHandle: function(e, t, n) {
        return I = "useImperativeHandle", ke(), ue(), kc(e, t, n);
      },
      useInsertionEffect: function(e, t) {
        return I = "useInsertionEffect", ke(), ue(), Ac(e, t);
      },
      useLayoutEffect: function(e, t) {
        return I = "useLayoutEffect", ke(), ue(), Lc(e, t);
      },
      useMemo: function(e, t) {
        I = "useMemo", ke(), ue();
        var n = ve.current;
        ve.current = Aa;
        try {
          return zc(e, t);
        } finally {
          ve.current = n;
        }
      },
      useReducer: function(e, t, n) {
        I = "useReducer", ke(), ue();
        var a = ve.current;
        ve.current = Aa;
        try {
          return Zp(e, t, n);
        } finally {
          ve.current = a;
        }
      },
      useRef: function(e) {
        return I = "useRef", ke(), ue(), Oc();
      },
      useState: function(e) {
        I = "useState", ke(), ue();
        var t = ve.current;
        ve.current = Aa;
        try {
          return nm(e);
        } finally {
          ve.current = t;
        }
      },
      useDebugValue: function(e, t) {
        return I = "useDebugValue", ke(), ue(), Uc();
      },
      useDeferredValue: function(e) {
        return I = "useDeferredValue", ke(), ue(), Gb(e);
      },
      useTransition: function() {
        return I = "useTransition", ke(), ue(), Qb();
      },
      useMutableSource: function(e, t, n) {
        return I = "useMutableSource", ke(), ue(), void 0;
      },
      useSyncExternalStore: function(e, t, n) {
        return I = "useSyncExternalStore", ke(), ue(), wc(e, t);
      },
      useId: function() {
        return I = "useId", ke(), ue(), Pc();
      },
      unstable_isNewReconciler: ce
    };
  }
  var ti = f.unstable_now, ly = 0, $c = -1, ws = -1, Ic = -1, pm = !1, Yc = !1;
  function oy() {
    return pm;
  }
  function ej() {
    Yc = !0;
  }
  function tj() {
    pm = !1, Yc = !1;
  }
  function nj() {
    pm = Yc, Yc = !1;
  }
  function sy() {
    return ly;
  }
  function uy() {
    ly = ti();
  }
  function mm(e) {
    ws = ti(), e.actualStartTime < 0 && (e.actualStartTime = ti());
  }
  function cy(e) {
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
  function hm(e) {
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
  function vm() {
    Ic = ti();
  }
  function gm(e) {
    for (var t = e.child; t; )
      e.actualDuration += t.actualDuration, t = t.sibling;
  }
  function La(e, t) {
    if (e && e.defaultProps) {
      var n = qe({}, t), a = e.defaultProps;
      for (var r in a)
        n[r] === void 0 && (n[r] = a[r]);
      return n;
    }
    return t;
  }
  var bm = {}, ym, Nm, xm, Em, Sm, dy, Gc, Rm, Dm, Cm, _s;
  {
    ym = /* @__PURE__ */ new Set(), Nm = /* @__PURE__ */ new Set(), xm = /* @__PURE__ */ new Set(), Em = /* @__PURE__ */ new Set(), Rm = /* @__PURE__ */ new Set(), Sm = /* @__PURE__ */ new Set(), Dm = /* @__PURE__ */ new Set(), Cm = /* @__PURE__ */ new Set(), _s = /* @__PURE__ */ new Set();
    var fy = /* @__PURE__ */ new Set();
    Gc = function(e, t) {
      if (!(e === null || typeof e == "function")) {
        var n = t + "_" + e;
        fy.has(n) || (fy.add(n), d("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t, e));
      }
    }, dy = function(e, t) {
      if (t === void 0) {
        var n = it(e) || "Component";
        Sm.has(n) || (Sm.add(n), d("%s.getDerivedStateFromProps(): A valid state object (or null) must be returned. You have returned undefined.", n));
      }
    }, Object.defineProperty(bm, "_processChildContext", {
      enumerable: !1,
      value: function() {
        throw new Error("_processChildContext is not available in React 16+. This likely means you have multiple copies of React and are attempting to nest a React 15 tree inside a React 16 tree using unstable_renderSubtreeIntoContainer, which isn't supported. Try to make sure you have only one copy of React (and ideally, switch to ReactDOM.createPortal).");
      }
    }), Object.freeze(bm);
  }
  function jm(e, t, n, a) {
    var r = e.memoizedState, i = n(a, r);
    {
      if (e.mode & Pt) {
        hn(!0);
        try {
          i = n(a, r);
        } finally {
          hn(!1);
        }
      }
      dy(t, i);
    }
    var l = i == null ? r : qe({}, r, i);
    if (e.memoizedState = l, e.lanes === X) {
      var u = e.updateQueue;
      u.baseState = l;
    }
  }
  var Tm = {
    isMounted: GE,
    enqueueSetState: function(e, t, n) {
      var a = fl(e), r = In(), i = ii(a), l = Dr(r, i);
      l.payload = t, n != null && (Gc(n, "setState"), l.callback = n);
      var u = Xr(a, l, i);
      u !== null && (dn(u, a, i, r), Ec(u, a, i)), rf(a, i);
    },
    enqueueReplaceState: function(e, t, n) {
      var a = fl(e), r = In(), i = ii(a), l = Dr(r, i);
      l.tag = wb, l.payload = t, n != null && (Gc(n, "replaceState"), l.callback = n);
      var u = Xr(a, l, i);
      u !== null && (dn(u, a, i, r), Ec(u, a, i)), rf(a, i);
    },
    enqueueForceUpdate: function(e, t) {
      var n = fl(e), a = In(), r = ii(n), i = Dr(a, r);
      i.tag = yc, t != null && (Gc(t, "forceUpdate"), i.callback = t);
      var l = Xr(n, i, r);
      l !== null && (dn(l, n, r, a), Ec(l, n, r)), RS(n, r);
    }
  };
  function py(e, t, n, a, r, i, l) {
    var u = e.stateNode;
    if (typeof u.shouldComponentUpdate == "function") {
      var c = u.shouldComponentUpdate(a, i, l);
      {
        if (e.mode & Pt) {
          hn(!0);
          try {
            c = u.shouldComponentUpdate(a, i, l);
          } finally {
            hn(!1);
          }
        }
        c === void 0 && d("%s.shouldComponentUpdate(): Returned undefined instead of a boolean value. Make sure to return true or false.", it(t) || "Component");
      }
      return c;
    }
    return t.prototype && t.prototype.isPureReactComponent ? !Jo(n, a) || !Jo(r, i) : !0;
  }
  function aj(e, t, n) {
    var a = e.stateNode;
    {
      var r = it(t) || "Component", i = a.render;
      i || (t.prototype && typeof t.prototype.render == "function" ? d("%s(...): No `render` method found on the returned component instance: did you accidentally return an object from the constructor?", r) : d("%s(...): No `render` method found on the returned component instance: you may have forgotten to define `render`.", r)), a.getInitialState && !a.getInitialState.isReactClassApproved && !a.state && d("getInitialState was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Did you mean to define a state property instead?", r), a.getDefaultProps && !a.getDefaultProps.isReactClassApproved && d("getDefaultProps was defined on %s, a plain JavaScript class. This is only supported for classes created using React.createClass. Use a static property to define defaultProps instead.", r), a.propTypes && d("propTypes was defined as an instance property on %s. Use a static property to define propTypes instead.", r), a.contextType && d("contextType was defined as an instance property on %s. Use a static property to define contextType instead.", r), t.childContextTypes && !_s.has(t) && // Strict Mode has its own warning for legacy context, so we can skip
      // this one.
      (e.mode & Pt) === Te && (_s.add(t), d(`%s uses the legacy childContextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() instead

.Learn more about this warning here: https://reactjs.org/link/legacy-context`, r)), t.contextTypes && !_s.has(t) && // Strict Mode has its own warning for legacy context, so we can skip
      // this one.
      (e.mode & Pt) === Te && (_s.add(t), d(`%s uses the legacy contextTypes API which is no longer supported and will be removed in the next major release. Use React.createContext() with static contextType instead.

Learn more about this warning here: https://reactjs.org/link/legacy-context`, r)), a.contextTypes && d("contextTypes was defined as an instance property on %s. Use a static property to define contextTypes instead.", r), t.contextType && t.contextTypes && !Dm.has(t) && (Dm.add(t), d("%s declares both contextTypes and contextType static properties. The legacy contextTypes property will be ignored.", r)), typeof a.componentShouldUpdate == "function" && d("%s has a method called componentShouldUpdate(). Did you mean shouldComponentUpdate()? The name is phrased as a question because the function is expected to return a value.", r), t.prototype && t.prototype.isPureReactComponent && typeof a.shouldComponentUpdate < "u" && d("%s has a method called shouldComponentUpdate(). shouldComponentUpdate should not be used when extending React.PureComponent. Please extend React.Component if shouldComponentUpdate is used.", it(t) || "A pure component"), typeof a.componentDidUnmount == "function" && d("%s has a method called componentDidUnmount(). But there is no such lifecycle method. Did you mean componentWillUnmount()?", r), typeof a.componentDidReceiveProps == "function" && d("%s has a method called componentDidReceiveProps(). But there is no such lifecycle method. If you meant to update the state in response to changing props, use componentWillReceiveProps(). If you meant to fetch data or run side-effects or mutations after React has updated the UI, use componentDidUpdate().", r), typeof a.componentWillRecieveProps == "function" && d("%s has a method called componentWillRecieveProps(). Did you mean componentWillReceiveProps()?", r), typeof a.UNSAFE_componentWillRecieveProps == "function" && d("%s has a method called UNSAFE_componentWillRecieveProps(). Did you mean UNSAFE_componentWillReceiveProps()?", r);
      var l = a.props !== n;
      a.props !== void 0 && l && d("%s(...): When calling super() in `%s`, make sure to pass up the same props that your component's constructor was passed.", r, r), a.defaultProps && d("Setting defaultProps as an instance property on %s is not supported and will be ignored. Instead, define defaultProps as a static property on %s.", r, r), typeof a.getSnapshotBeforeUpdate == "function" && typeof a.componentDidUpdate != "function" && !xm.has(t) && (xm.add(t), d("%s: getSnapshotBeforeUpdate() should be used with componentDidUpdate(). This component defines getSnapshotBeforeUpdate() only.", it(t))), typeof a.getDerivedStateFromProps == "function" && d("%s: getDerivedStateFromProps() is defined as an instance method and will be ignored. Instead, declare it as a static method.", r), typeof a.getDerivedStateFromError == "function" && d("%s: getDerivedStateFromError() is defined as an instance method and will be ignored. Instead, declare it as a static method.", r), typeof t.getSnapshotBeforeUpdate == "function" && d("%s: getSnapshotBeforeUpdate() is defined as a static method and will be ignored. Instead, declare it as an instance method.", r);
      var u = a.state;
      u && (typeof u != "object" || Ge(u)) && d("%s.state: must be set to an object or null", r), typeof a.getChildContext == "function" && typeof t.childContextTypes != "object" && d("%s.getChildContext(): childContextTypes must be defined in order to use getChildContext().", r);
    }
  }
  function my(e, t) {
    t.updater = Tm, e.stateNode = t, $E(t, e), t._reactInternalInstance = bm;
  }
  function hy(e, t, n) {
    var a = !1, r = la, i = la, l = t.contextType;
    if ("contextType" in t) {
      var u = (
        // Allow null for conditional declaration
        l === null || l !== void 0 && l.$$typeof === de && l._context === void 0
      );
      if (!u && !Cm.has(t)) {
        Cm.add(t);
        var c = "";
        l === void 0 ? c = " However, it is set to undefined. This can be caused by a typo or by mixing up named and default imports. This can also happen due to a circular dependency, so try moving the createContext() call to a separate file." : typeof l != "object" ? c = " However, it is set to a " + typeof l + "." : l.$$typeof === Z ? c = " Did you accidentally pass the Context.Provider instead?" : l._context !== void 0 ? c = " Did you accidentally pass the Context.Consumer instead?" : c = " However, it is set to an object with keys {" + Object.keys(l).join(", ") + "}.", d("%s defines an invalid contextType. contextType should point to the Context object returned by React.createContext().%s", it(t) || "Component", c);
      }
    }
    if (typeof l == "object" && l !== null)
      i = Kt(l);
    else {
      r = Ol(e, t, !0);
      var h = t.contextTypes;
      a = h != null, i = a ? Ml(e, r) : la;
    }
    var v = new t(n, i);
    if (e.mode & Pt) {
      hn(!0);
      try {
        v = new t(n, i);
      } finally {
        hn(!1);
      }
    }
    var C = e.memoizedState = v.state !== null && v.state !== void 0 ? v.state : null;
    my(e, v);
    {
      if (typeof t.getDerivedStateFromProps == "function" && C === null) {
        var D = it(t) || "Component";
        Nm.has(D) || (Nm.add(D), d("`%s` uses `getDerivedStateFromProps` but its initial state is %s. This is not recommended. Instead, define the initial state by assigning an object to `this.state` in the constructor of `%s`. This ensures that `getDerivedStateFromProps` arguments have a consistent shape.", D, v.state === null ? "null" : "undefined", D));
      }
      if (typeof t.getDerivedStateFromProps == "function" || typeof v.getSnapshotBeforeUpdate == "function") {
        var V = null, L = null, H = null;
        if (typeof v.componentWillMount == "function" && v.componentWillMount.__suppressDeprecationWarning !== !0 ? V = "componentWillMount" : typeof v.UNSAFE_componentWillMount == "function" && (V = "UNSAFE_componentWillMount"), typeof v.componentWillReceiveProps == "function" && v.componentWillReceiveProps.__suppressDeprecationWarning !== !0 ? L = "componentWillReceiveProps" : typeof v.UNSAFE_componentWillReceiveProps == "function" && (L = "UNSAFE_componentWillReceiveProps"), typeof v.componentWillUpdate == "function" && v.componentWillUpdate.__suppressDeprecationWarning !== !0 ? H = "componentWillUpdate" : typeof v.UNSAFE_componentWillUpdate == "function" && (H = "UNSAFE_componentWillUpdate"), V !== null || L !== null || H !== null) {
          var fe = it(t) || "Component", Ce = typeof t.getDerivedStateFromProps == "function" ? "getDerivedStateFromProps()" : "getSnapshotBeforeUpdate()";
          Em.has(fe) || (Em.add(fe), d(`Unsafe legacy lifecycles will not be called for components using new component APIs.

%s uses %s but also contains the following legacy lifecycles:%s%s%s

The above lifecycles should be removed. Learn more about this warning here:
https://reactjs.org/link/unsafe-component-lifecycles`, fe, Ce, V !== null ? `
  ` + V : "", L !== null ? `
  ` + L : "", H !== null ? `
  ` + H : ""));
        }
      }
    }
    return a && rb(e, r, i), v;
  }
  function rj(e, t) {
    var n = t.state;
    typeof t.componentWillMount == "function" && t.componentWillMount(), typeof t.UNSAFE_componentWillMount == "function" && t.UNSAFE_componentWillMount(), n !== t.state && (d("%s.componentWillMount(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", ze(e) || "Component"), Tm.enqueueReplaceState(t, t.state, null));
  }
  function vy(e, t, n, a) {
    var r = t.state;
    if (typeof t.componentWillReceiveProps == "function" && t.componentWillReceiveProps(n, a), typeof t.UNSAFE_componentWillReceiveProps == "function" && t.UNSAFE_componentWillReceiveProps(n, a), t.state !== r) {
      {
        var i = ze(e) || "Component";
        ym.has(i) || (ym.add(i), d("%s.componentWillReceiveProps(): Assigning directly to this.state is deprecated (except inside a component's constructor). Use setState instead.", i));
      }
      Tm.enqueueReplaceState(t, t.state, null);
    }
  }
  function wm(e, t, n, a) {
    aj(e, t, n);
    var r = e.stateNode;
    r.props = n, r.state = e.memoizedState, r.refs = {}, Fp(e);
    var i = t.contextType;
    if (typeof i == "object" && i !== null)
      r.context = Kt(i);
    else {
      var l = Ol(e, t, !0);
      r.context = Ml(e, l);
    }
    {
      if (r.state === n) {
        var u = it(t) || "Component";
        Rm.has(u) || (Rm.add(u), d("%s: It is not recommended to assign props directly to state because updates to props won't be reflected in state. In most cases, it is better to use props directly.", u));
      }
      e.mode & Pt && Ma.recordLegacyContextWarning(e, r), Ma.recordUnsafeLifecycleWarnings(e, r);
    }
    r.state = e.memoizedState;
    var c = t.getDerivedStateFromProps;
    if (typeof c == "function" && (jm(e, t, c, n), r.state = e.memoizedState), typeof t.getDerivedStateFromProps != "function" && typeof r.getSnapshotBeforeUpdate != "function" && (typeof r.UNSAFE_componentWillMount == "function" || typeof r.componentWillMount == "function") && (rj(e, r), Sc(e, n, r, a), r.state = e.memoizedState), typeof r.componentDidMount == "function") {
      var h = lt;
      h |= Ci, (e.mode & Wa) !== Te && (h |= zr), e.flags |= h;
    }
  }
  function ij(e, t, n, a) {
    var r = e.stateNode, i = e.memoizedProps;
    r.props = i;
    var l = r.context, u = t.contextType, c = la;
    if (typeof u == "object" && u !== null)
      c = Kt(u);
    else {
      var h = Ol(e, t, !0);
      c = Ml(e, h);
    }
    var v = t.getDerivedStateFromProps, C = typeof v == "function" || typeof r.getSnapshotBeforeUpdate == "function";
    !C && (typeof r.UNSAFE_componentWillReceiveProps == "function" || typeof r.componentWillReceiveProps == "function") && (i !== n || l !== c) && vy(e, r, n, c), Ob();
    var D = e.memoizedState, V = r.state = D;
    if (Sc(e, n, r, a), V = e.memoizedState, i === n && D === V && !rc() && !Rc()) {
      if (typeof r.componentDidMount == "function") {
        var L = lt;
        L |= Ci, (e.mode & Wa) !== Te && (L |= zr), e.flags |= L;
      }
      return !1;
    }
    typeof v == "function" && (jm(e, t, v, n), V = e.memoizedState);
    var H = Rc() || py(e, t, i, n, D, V, c);
    if (H) {
      if (!C && (typeof r.UNSAFE_componentWillMount == "function" || typeof r.componentWillMount == "function") && (typeof r.componentWillMount == "function" && r.componentWillMount(), typeof r.UNSAFE_componentWillMount == "function" && r.UNSAFE_componentWillMount()), typeof r.componentDidMount == "function") {
        var fe = lt;
        fe |= Ci, (e.mode & Wa) !== Te && (fe |= zr), e.flags |= fe;
      }
    } else {
      if (typeof r.componentDidMount == "function") {
        var Ce = lt;
        Ce |= Ci, (e.mode & Wa) !== Te && (Ce |= zr), e.flags |= Ce;
      }
      e.memoizedProps = n, e.memoizedState = V;
    }
    return r.props = n, r.state = V, r.context = c, H;
  }
  function lj(e, t, n, a, r) {
    var i = t.stateNode;
    _b(e, t);
    var l = t.memoizedProps, u = t.type === t.elementType ? l : La(t.type, l);
    i.props = u;
    var c = t.pendingProps, h = i.context, v = n.contextType, C = la;
    if (typeof v == "object" && v !== null)
      C = Kt(v);
    else {
      var D = Ol(t, n, !0);
      C = Ml(t, D);
    }
    var V = n.getDerivedStateFromProps, L = typeof V == "function" || typeof i.getSnapshotBeforeUpdate == "function";
    !L && (typeof i.UNSAFE_componentWillReceiveProps == "function" || typeof i.componentWillReceiveProps == "function") && (l !== c || h !== C) && vy(t, i, a, C), Ob();
    var H = t.memoizedState, fe = i.state = H;
    if (Sc(t, a, i, r), fe = t.memoizedState, l === c && H === fe && !rc() && !Rc() && !Ve)
      return typeof i.componentDidUpdate == "function" && (l !== e.memoizedProps || H !== e.memoizedState) && (t.flags |= lt), typeof i.getSnapshotBeforeUpdate == "function" && (l !== e.memoizedProps || H !== e.memoizedState) && (t.flags |= ml), !1;
    typeof V == "function" && (jm(t, n, V, a), fe = t.memoizedState);
    var Ce = Rc() || py(t, n, u, a, H, fe, C) || // TODO: In some cases, we'll end up checking if context has changed twice,
    // both before and after `shouldComponentUpdate` has been called. Not ideal,
    // but I'm loath to refactor this function. This only happens for memoized
    // components so it's not that common.
    Ve;
    return Ce ? (!L && (typeof i.UNSAFE_componentWillUpdate == "function" || typeof i.componentWillUpdate == "function") && (typeof i.componentWillUpdate == "function" && i.componentWillUpdate(a, fe, C), typeof i.UNSAFE_componentWillUpdate == "function" && i.UNSAFE_componentWillUpdate(a, fe, C)), typeof i.componentDidUpdate == "function" && (t.flags |= lt), typeof i.getSnapshotBeforeUpdate == "function" && (t.flags |= ml)) : (typeof i.componentDidUpdate == "function" && (l !== e.memoizedProps || H !== e.memoizedState) && (t.flags |= lt), typeof i.getSnapshotBeforeUpdate == "function" && (l !== e.memoizedProps || H !== e.memoizedState) && (t.flags |= ml), t.memoizedProps = a, t.memoizedState = fe), i.props = a, i.state = fe, i.context = C, Ce;
  }
  function Ii(e, t) {
    return {
      value: e,
      source: t,
      stack: bi(t),
      digest: null
    };
  }
  function _m(e, t, n) {
    return {
      value: e,
      source: null,
      stack: n ?? null,
      digest: t ?? null
    };
  }
  function oj(e, t) {
    return !0;
  }
  function Om(e, t) {
    try {
      var n = oj(e, t);
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
  var sj = typeof WeakMap == "function" ? WeakMap : Map;
  function gy(e, t, n) {
    var a = Dr(Rt, n);
    a.tag = kp, a.payload = {
      element: null
    };
    var r = t.value;
    return a.callback = function() {
      eT(r), Om(e, t);
    }, a;
  }
  function Mm(e, t, n) {
    var a = Dr(Rt, n);
    a.tag = kp;
    var r = e.type.getDerivedStateFromError;
    if (typeof r == "function") {
      var i = t.value;
      a.payload = function() {
        return r(i);
      }, a.callback = function() {
        TN(e), Om(e, t);
      };
    }
    var l = e.stateNode;
    return l !== null && typeof l.componentDidCatch == "function" && (a.callback = function() {
      TN(e), Om(e, t), typeof r != "function" && J1(this);
      var c = t.value, h = t.stack;
      this.componentDidCatch(c, {
        componentStack: h !== null ? h : ""
      }), typeof r != "function" && (na(e.lanes, Le) || d("%s: Error boundaries should implement getDerivedStateFromError(). In that method, return a state update to display an error message or fallback UI.", ze(e) || "Unknown"));
    }), a;
  }
  function by(e, t, n) {
    var a = e.pingCache, r;
    if (a === null ? (a = e.pingCache = new sj(), r = /* @__PURE__ */ new Set(), a.set(t, r)) : (r = a.get(t), r === void 0 && (r = /* @__PURE__ */ new Set(), a.set(t, r))), !r.has(n)) {
      r.add(n);
      var i = tT.bind(null, e, t, n);
      Ta && Gs(e, n), t.then(i, i);
    }
  }
  function uj(e, t, n, a) {
    var r = e.updateQueue;
    if (r === null) {
      var i = /* @__PURE__ */ new Set();
      i.add(n), e.updateQueue = i;
    } else
      r.add(n);
  }
  function cj(e, t) {
    var n = e.tag;
    if ((e.mode & Xe) === Te && (n === R || n === P || n === U)) {
      var a = e.alternate;
      a ? (e.updateQueue = a.updateQueue, e.memoizedState = a.memoizedState, e.lanes = a.lanes) : (e.updateQueue = null, e.memoizedState = null);
    }
  }
  function yy(e) {
    var t = e;
    do {
      if (t.tag === te && IC(t))
        return t;
      t = t.return;
    } while (t !== null);
    return null;
  }
  function Ny(e, t, n, a, r) {
    if ((e.mode & Xe) === Te) {
      if (e === t)
        e.flags |= Hn;
      else {
        if (e.flags |= ot, n.flags |= Qd, n.flags &= -52805, n.tag === j) {
          var i = n.alternate;
          if (i === null)
            n.tag = J;
          else {
            var l = Dr(Rt, Le);
            l.tag = yc, Xr(n, l, Le);
          }
        }
        n.lanes = Ye(n.lanes, Le);
      }
      return e;
    }
    return e.flags |= Hn, e.lanes = r, e;
  }
  function dj(e, t, n, a, r) {
    if (n.flags |= Eu, Ta && Gs(e, r), a !== null && typeof a == "object" && typeof a.then == "function") {
      var i = a;
      cj(n), En() && n.mode & Xe && db();
      var l = yy(t);
      if (l !== null) {
        l.flags &= ~mr, Ny(l, t, n, e, r), l.mode & Xe && by(e, i, r), uj(l, e, i);
        return;
      } else {
        if (!VS(r)) {
          by(e, i, r), dh();
          return;
        }
        var u = new Error("A component suspended while responding to synchronous input. This will cause the UI to be replaced with a loading indicator. To fix, updates that suspend should be wrapped with startTransition.");
        a = u;
      }
    } else if (En() && n.mode & Xe) {
      db();
      var c = yy(t);
      if (c !== null) {
        (c.flags & Hn) === Oe && (c.flags |= mr), Ny(c, t, n, e, r), Rp(Ii(a, n));
        return;
      }
    }
    a = Ii(a, n), I1(a);
    var h = t;
    do {
      switch (h.tag) {
        case x: {
          var v = a;
          h.flags |= Hn;
          var C = Uo(r);
          h.lanes = Ye(h.lanes, C);
          var D = gy(h, v, C);
          zp(h, D);
          return;
        }
        case j:
          var V = a, L = h.type, H = h.stateNode;
          if ((h.flags & ot) === Oe && (typeof L.getDerivedStateFromError == "function" || H !== null && typeof H.componentDidCatch == "function" && !yN(H))) {
            h.flags |= Hn;
            var fe = Uo(r);
            h.lanes = Ye(h.lanes, fe);
            var Ce = Mm(h, V, fe);
            zp(h, Ce);
            return;
          }
          break;
      }
      h = h.return;
    } while (h !== null);
  }
  function fj() {
    return null;
  }
  var Os = m.ReactCurrentOwner, ka = !1, Vm, Ms, Am, Lm, km, Yi, Um, Wc, Vs;
  Vm = {}, Ms = {}, Am = {}, Lm = {}, km = {}, Yi = !1, Um = {}, Wc = {}, Vs = {};
  function Bn(e, t, n, a) {
    e === null ? t.child = Sb(t, null, n, a) : t.child = kl(t, e.child, n, a);
  }
  function pj(e, t, n, a) {
    t.child = kl(t, e.child, null, a), t.child = kl(t, null, n, a);
  }
  function xy(e, t, n, a, r) {
    if (t.type !== t.elementType) {
      var i = n.propTypes;
      i && _a(
        i,
        a,
        // Resolved props
        "prop",
        it(n)
      );
    }
    var l = n.render, u = t.ref, c, h;
    Fl(t, r), Oo(t);
    {
      if (Os.current = t, fa(!0), c = Il(e, t, l, a, u, r), h = Yl(), t.mode & Pt) {
        hn(!0);
        try {
          c = Il(e, t, l, a, u, r), h = Yl();
        } finally {
          hn(!1);
        }
      }
      fa(!1);
    }
    return gl(), e !== null && !ka ? (Ub(e, t, r), Cr(e, t, r)) : (En() && h && bp(t), t.flags |= pl, Bn(e, t, c, r), t.child);
  }
  function Ey(e, t, n, a, r) {
    if (e === null) {
      var i = n.type;
      if (bT(i) && n.compare === null && // SimpleMemoComponent codepath doesn't resolve outer props either.
      n.defaultProps === void 0) {
        var l = i;
        return l = Zl(i), t.tag = U, t.type = l, Pm(t, i), Sy(e, t, l, a, r);
      }
      {
        var u = i.propTypes;
        if (u && _a(
          u,
          a,
          // Resolved props
          "prop",
          it(i)
        ), n.defaultProps !== void 0) {
          var c = it(i) || "Unknown";
          Vs[c] || (d("%s: Support for defaultProps will be removed from memo components in a future major release. Use JavaScript default parameters instead.", c), Vs[c] = !0);
        }
      }
      var h = Eh(n.type, null, a, t, t.mode, r);
      return h.ref = t.ref, h.return = t, t.child = h, h;
    }
    {
      var v = n.type, C = v.propTypes;
      C && _a(
        C,
        a,
        // Resolved props
        "prop",
        it(v)
      );
    }
    var D = e.child, V = qm(e, r);
    if (!V) {
      var L = D.memoizedProps, H = n.compare;
      if (H = H !== null ? H : Jo, H(L, a) && e.ref === t.ref)
        return Cr(e, t, r);
    }
    t.flags |= pl;
    var fe = Qi(D, a);
    return fe.ref = t.ref, fe.return = t, t.child = fe, fe;
  }
  function Sy(e, t, n, a, r) {
    if (t.type !== t.elementType) {
      var i = t.elementType;
      if (i.$$typeof === je) {
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
          it(i)
        );
      }
    }
    if (e !== null) {
      var v = e.memoizedProps;
      if (Jo(v, a) && e.ref === t.ref && // Prevent bailout if the implementation changed due to hot reload.
      t.type === e.type)
        if (ka = !1, t.pendingProps = a = v, qm(e, r))
          (e.flags & Qd) !== Oe && (ka = !0);
        else return t.lanes = e.lanes, Cr(e, t, r);
    }
    return Fm(e, t, n, a, r);
  }
  function Ry(e, t, n) {
    var a = t.pendingProps, r = a.children, i = e !== null ? e.memoizedState : null;
    if (a.mode === "hidden" || He)
      if ((t.mode & Xe) === Te) {
        var l = {
          baseLanes: X,
          cachePool: null,
          transitions: null
        };
        t.memoizedState = l, od(t, n);
      } else if (na(n, ta)) {
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
          c = Ye(h, n);
        } else
          c = n;
        t.lanes = t.childLanes = ta;
        var v = {
          baseLanes: c,
          cachePool: u,
          transitions: null
        };
        return t.memoizedState = v, t.updateQueue = null, od(t, c), null;
      }
    else {
      var V;
      i !== null ? (V = Ye(i.baseLanes, n), t.memoizedState = null) : V = n, od(t, V);
    }
    return Bn(e, t, r, n), t.child;
  }
  function mj(e, t, n) {
    var a = t.pendingProps;
    return Bn(e, t, a, n), t.child;
  }
  function hj(e, t, n) {
    var a = t.pendingProps.children;
    return Bn(e, t, a, n), t.child;
  }
  function vj(e, t, n) {
    {
      t.flags |= lt;
      {
        var a = t.stateNode;
        a.effectDuration = 0, a.passiveEffectDuration = 0;
      }
    }
    var r = t.pendingProps, i = r.children;
    return Bn(e, t, i, n), t.child;
  }
  function Dy(e, t) {
    var n = t.ref;
    (e === null && n !== null || e !== null && e.ref !== n) && (t.flags |= Ri, t.flags |= Xd);
  }
  function Fm(e, t, n, a, r) {
    if (t.type !== t.elementType) {
      var i = n.propTypes;
      i && _a(
        i,
        a,
        // Resolved props
        "prop",
        it(n)
      );
    }
    var l;
    {
      var u = Ol(t, n, !0);
      l = Ml(t, u);
    }
    var c, h;
    Fl(t, r), Oo(t);
    {
      if (Os.current = t, fa(!0), c = Il(e, t, n, a, l, r), h = Yl(), t.mode & Pt) {
        hn(!0);
        try {
          c = Il(e, t, n, a, l, r), h = Yl();
        } finally {
          hn(!1);
        }
      }
      fa(!1);
    }
    return gl(), e !== null && !ka ? (Ub(e, t, r), Cr(e, t, r)) : (En() && h && bp(t), t.flags |= pl, Bn(e, t, c, r), t.child);
  }
  function Cy(e, t, n, a, r) {
    {
      switch (VT(t)) {
        case !1: {
          var i = t.stateNode, l = t.type, u = new l(t.memoizedProps, i.context), c = u.state;
          i.updater.enqueueSetState(i, c, null);
          break;
        }
        case !0: {
          t.flags |= ot, t.flags |= Hn;
          var h = new Error("Simulated error coming from DevTools"), v = Uo(r);
          t.lanes = Ye(t.lanes, v);
          var C = Mm(t, Ii(h, t), v);
          zp(t, C);
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
          it(n)
        );
      }
    }
    var V;
    Xa(n) ? (V = !0, lc(t)) : V = !1, Fl(t, r);
    var L = t.stateNode, H;
    L === null ? (Qc(e, t), hy(t, n, a), wm(t, n, a, r), H = !0) : e === null ? H = ij(t, n, a, r) : H = lj(e, t, n, a, r);
    var fe = zm(e, t, n, H, V, r);
    {
      var Ce = t.stateNode;
      H && Ce.props !== a && (Yi || d("It looks like %s is reassigning its own `this.props` while rendering. This is not supported and can lead to confusing bugs.", ze(t) || "a component"), Yi = !0);
    }
    return fe;
  }
  function zm(e, t, n, a, r, i) {
    Dy(e, t);
    var l = (t.flags & ot) !== Oe;
    if (!a && !l)
      return r && ob(t, n, !1), Cr(e, t, i);
    var u = t.stateNode;
    Os.current = t;
    var c;
    if (l && typeof n.getDerivedStateFromError != "function")
      c = null, cy();
    else {
      Oo(t);
      {
        if (fa(!0), c = u.render(), t.mode & Pt) {
          hn(!0);
          try {
            u.render();
          } finally {
            hn(!1);
          }
        }
        fa(!1);
      }
      gl();
    }
    return t.flags |= pl, e !== null && l ? pj(e, t, c, i) : Bn(e, t, c, i), t.memoizedState = u.state, r && ob(t, n, !0), t.child;
  }
  function jy(e) {
    var t = e.stateNode;
    t.pendingContext ? ib(e, t.pendingContext, t.pendingContext !== t.context) : t.context && ib(e, t.context, !1), Pp(e, t.containerInfo);
  }
  function gj(e, t, n) {
    if (jy(t), e === null)
      throw new Error("Should have a current fiber. This is a bug in React.");
    var a = t.pendingProps, r = t.memoizedState, i = r.element;
    _b(e, t), Sc(t, a, null, n);
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
        return Ty(e, t, u, n, v);
      } else if (u !== i) {
        var C = Ii(new Error("This root received an early update, before anything was able hydrate. Switched the entire root to client rendering."), t);
        return Ty(e, t, u, n, C);
      } else {
        NC(t);
        var D = Sb(t, null, u, n);
        t.child = D;
        for (var V = D; V; )
          V.flags = V.flags & ~Wt | hr, V = V.sibling;
      }
    } else {
      if (Ll(), u === i)
        return Cr(e, t, n);
      Bn(e, t, u, n);
    }
    return t.child;
  }
  function Ty(e, t, n, a, r) {
    return Ll(), Rp(r), t.flags |= mr, Bn(e, t, n, a), t.child;
  }
  function bj(e, t, n) {
    Ab(t), e === null && Sp(t);
    var a = t.type, r = t.pendingProps, i = e !== null ? e.memoizedProps : null, l = r.children, u = rp(a, r);
    return u ? l = null : i !== null && rp(a, i) && (t.flags |= wo), Dy(e, t), Bn(e, t, l, n), t.child;
  }
  function yj(e, t) {
    return e === null && Sp(t), null;
  }
  function Nj(e, t, n, a) {
    Qc(e, t);
    var r = t.pendingProps, i = n, l = i._payload, u = i._init, c = u(l);
    t.type = c;
    var h = t.tag = yT(c), v = La(c, r), C;
    switch (h) {
      case R:
        return Pm(t, c), t.type = c = Zl(c), C = Fm(null, t, c, v, a), C;
      case j:
        return t.type = c = vh(c), C = Cy(null, t, c, v, a), C;
      case P:
        return t.type = c = gh(c), C = xy(null, t, c, v, a), C;
      case F: {
        if (t.type !== t.elementType) {
          var D = c.propTypes;
          D && _a(
            D,
            v,
            // Resolved for outer only
            "prop",
            it(c)
          );
        }
        return C = Ey(
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
    throw c !== null && typeof c == "object" && c.$$typeof === je && (V = " Did you wrap a component in React.lazy() more than once?"), new Error("Element type is invalid. Received a promise that resolves to: " + c + ". " + ("Lazy element type must resolve to a class or function." + V));
  }
  function xj(e, t, n, a, r) {
    Qc(e, t), t.tag = j;
    var i;
    return Xa(n) ? (i = !0, lc(t)) : i = !1, Fl(t, r), hy(t, n, a), wm(t, n, a, r), zm(null, t, n, !0, i, r);
  }
  function Ej(e, t, n, a) {
    Qc(e, t);
    var r = t.pendingProps, i;
    {
      var l = Ol(t, n, !1);
      i = Ml(t, l);
    }
    Fl(t, a);
    var u, c;
    Oo(t);
    {
      if (n.prototype && typeof n.prototype.render == "function") {
        var h = it(n) || "Unknown";
        Vm[h] || (d("The <%s /> component appears to have a render method, but doesn't extend React.Component. This is likely to cause errors. Change %s to extend React.Component instead.", h, h), Vm[h] = !0);
      }
      t.mode & Pt && Ma.recordLegacyContextWarning(t, null), fa(!0), Os.current = t, u = Il(null, t, n, r, i, a), c = Yl(), fa(!1);
    }
    if (gl(), t.flags |= pl, typeof u == "object" && u !== null && typeof u.render == "function" && u.$$typeof === void 0) {
      var v = it(n) || "Unknown";
      Ms[v] || (d("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", v, v, v), Ms[v] = !0);
    }
    if (
      // Run these checks in production only if the flag is off.
      // Eventually we'll delete this branch altogether.
      typeof u == "object" && u !== null && typeof u.render == "function" && u.$$typeof === void 0
    ) {
      {
        var C = it(n) || "Unknown";
        Ms[C] || (d("The <%s /> component appears to be a function component that returns a class instance. Change %s to a class that extends React.Component instead. If you can't use a class try assigning the prototype on the function as a workaround. `%s.prototype = React.Component.prototype`. Don't use an arrow function since it cannot be called with `new` by React.", C, C, C), Ms[C] = !0);
      }
      t.tag = j, t.memoizedState = null, t.updateQueue = null;
      var D = !1;
      return Xa(n) ? (D = !0, lc(t)) : D = !1, t.memoizedState = u.state !== null && u.state !== void 0 ? u.state : null, Fp(t), my(t, u), wm(t, n, r, a), zm(null, t, n, !0, D, a);
    } else {
      if (t.tag = R, t.mode & Pt) {
        hn(!0);
        try {
          u = Il(null, t, n, r, i, a), c = Yl();
        } finally {
          hn(!1);
        }
      }
      return En() && c && bp(t), Bn(null, t, u, a), Pm(t, n), t.child;
    }
  }
  function Pm(e, t) {
    {
      if (t && t.childContextTypes && d("%s(...): childContextTypes cannot be defined on a function component.", t.displayName || t.name || "Component"), e.ref !== null) {
        var n = "", a = kr();
        a && (n += `

Check the render method of \`` + a + "`.");
        var r = a || "", i = e._debugSource;
        i && (r = i.fileName + ":" + i.lineNumber), km[r] || (km[r] = !0, d("Function components cannot be given refs. Attempts to access this ref will fail. Did you mean to use React.forwardRef()?%s", n));
      }
      if (t.defaultProps !== void 0) {
        var l = it(t) || "Unknown";
        Vs[l] || (d("%s: Support for defaultProps will be removed from function components in a future major release. Use JavaScript default parameters instead.", l), Vs[l] = !0);
      }
      if (typeof t.getDerivedStateFromProps == "function") {
        var u = it(t) || "Unknown";
        Lm[u] || (d("%s: Function components do not support getDerivedStateFromProps.", u), Lm[u] = !0);
      }
      if (typeof t.contextType == "object" && t.contextType !== null) {
        var c = it(t) || "Unknown";
        Am[c] || (d("%s: Function components do not support contextType.", c), Am[c] = !0);
      }
    }
  }
  var Hm = {
    dehydrated: null,
    treeContext: null,
    retryLane: vn
  };
  function Bm(e) {
    return {
      baseLanes: e,
      cachePool: fj(),
      transitions: null
    };
  }
  function Sj(e, t) {
    var n = null;
    return {
      baseLanes: Ye(e.baseLanes, t),
      cachePool: n,
      transitions: e.transitions
    };
  }
  function Rj(e, t, n, a) {
    if (t !== null) {
      var r = t.memoizedState;
      if (r === null)
        return !1;
    }
    return $p(e, Es);
  }
  function Dj(e, t) {
    return wu(e.childLanes, t);
  }
  function wy(e, t, n) {
    var a = t.pendingProps;
    AT(t) && (t.flags |= ot);
    var r = Va.current, i = !1, l = (t.flags & ot) !== Oe;
    if (l || Rj(r, e) ? (i = !0, t.flags &= ~ot) : (e === null || e.memoizedState !== null) && (r = $C(r, kb)), r = Pl(r), Zr(t, r), e === null) {
      Sp(t);
      var u = t.memoizedState;
      if (u !== null) {
        var c = u.dehydrated;
        if (c !== null)
          return _j(t, c);
      }
      var h = a.children, v = a.fallback;
      if (i) {
        var C = Cj(t, h, v, n), D = t.child;
        return D.memoizedState = Bm(n), t.memoizedState = Hm, C;
      } else
        return $m(t, h);
    } else {
      var V = e.memoizedState;
      if (V !== null) {
        var L = V.dehydrated;
        if (L !== null)
          return Oj(e, t, l, a, L, V, n);
      }
      if (i) {
        var H = a.fallback, fe = a.children, Ce = Tj(e, t, fe, H, n), Se = t.child, Ze = e.child.memoizedState;
        return Se.memoizedState = Ze === null ? Bm(n) : Sj(Ze, n), Se.childLanes = Dj(e, n), t.memoizedState = Hm, Ce;
      } else {
        var We = a.children, _ = jj(e, t, We, n);
        return t.memoizedState = null, _;
      }
    }
  }
  function $m(e, t, n) {
    var a = e.mode, r = {
      mode: "visible",
      children: t
    }, i = Im(r, a);
    return i.return = e, e.child = i, i;
  }
  function Cj(e, t, n, a) {
    var r = e.mode, i = e.child, l = {
      mode: "hidden",
      children: t
    }, u, c;
    return (r & Xe) === Te && i !== null ? (u = i, u.childLanes = X, u.pendingProps = l, e.mode & ht && (u.actualDuration = 0, u.actualStartTime = -1, u.selfBaseDuration = 0, u.treeBaseDuration = 0), c = oi(n, r, a, null)) : (u = Im(l, r), c = oi(n, r, a, null)), u.return = e, c.return = e, u.sibling = c, e.child = u, c;
  }
  function Im(e, t, n) {
    return _N(e, t, X, null);
  }
  function _y(e, t) {
    return Qi(e, t);
  }
  function jj(e, t, n, a) {
    var r = e.child, i = r.sibling, l = _y(r, {
      mode: "visible",
      children: n
    });
    if ((t.mode & Xe) === Te && (l.lanes = a), l.return = t, l.sibling = null, i !== null) {
      var u = t.deletions;
      u === null ? (t.deletions = [i], t.flags |= Si) : u.push(i);
    }
    return t.child = l, l;
  }
  function Tj(e, t, n, a, r) {
    var i = t.mode, l = e.child, u = l.sibling, c = {
      mode: "hidden",
      children: n
    }, h;
    if (
      // In legacy mode, we commit the primary tree as if it successfully
      // completed, even though it's in an inconsistent state.
      (i & Xe) === Te && // Make sure we're on the second pass, i.e. the primary child fragment was
      // already cloned. In legacy mode, the only case where this isn't true is
      // when DevTools forces us to display a fallback; we skip the first render
      // pass entirely and go straight to rendering the fallback. (In Concurrent
      // Mode, SuspenseList can also trigger this scenario, but this is a legacy-
      // only codepath.)
      t.child !== l
    ) {
      var v = t.child;
      h = v, h.childLanes = X, h.pendingProps = c, t.mode & ht && (h.actualDuration = 0, h.actualStartTime = -1, h.selfBaseDuration = l.selfBaseDuration, h.treeBaseDuration = l.treeBaseDuration), t.deletions = null;
    } else
      h = _y(l, c), h.subtreeFlags = l.subtreeFlags & vr;
    var C;
    return u !== null ? C = Qi(u, a) : (C = oi(a, i, r, null), C.flags |= Wt), C.return = t, h.return = t, h.sibling = C, t.child = h, C;
  }
  function Kc(e, t, n, a) {
    a !== null && Rp(a), kl(t, e.child, null, n);
    var r = t.pendingProps, i = r.children, l = $m(t, i);
    return l.flags |= Wt, t.memoizedState = null, l;
  }
  function wj(e, t, n, a, r) {
    var i = t.mode, l = {
      mode: "visible",
      children: n
    }, u = Im(l, i), c = oi(a, i, r, null);
    return c.flags |= Wt, u.return = t, c.return = t, u.sibling = c, t.child = u, (t.mode & Xe) !== Te && kl(t, e.child, null, r), c;
  }
  function _j(e, t, n) {
    return (e.mode & Xe) === Te ? (d("Cannot hydrate Suspense in legacy mode. Switch from ReactDOM.hydrate(element, container) to ReactDOMClient.hydrateRoot(container, <App />).render(element) or remove the Suspense components from the server rendered components."), e.lanes = Le) : sp(t) ? e.lanes = wi : e.lanes = ta, null;
  }
  function Oj(e, t, n, a, r, i, l) {
    if (n)
      if (t.flags & mr) {
        t.flags &= ~mr;
        var _ = _m(new Error("There was an error while hydrating this Suspense boundary. Switched to client rendering."));
        return Kc(e, t, l, _);
      } else {
        if (t.memoizedState !== null)
          return t.child = e.child, t.flags |= ot, null;
        var B = a.children, O = a.fallback, ne = wj(e, t, B, O, l), ge = t.child;
        return ge.memoizedState = Bm(l), t.memoizedState = Hm, ne;
      }
    else {
      if (bC(), (t.mode & Xe) === Te)
        return Kc(
          e,
          t,
          l,
          // TODO: When we delete legacy mode, we should make this error argument
          // required — every concurrent mode path that causes hydration to
          // de-opt to client rendering should have an error message.
          null
        );
      if (sp(r)) {
        var u, c, h;
        {
          var v = LD(r);
          u = v.digest, c = v.message, h = v.stack;
        }
        var C;
        c ? C = new Error(c) : C = new Error("The server could not finish this Suspense boundary, likely due to an error during server rendering. Switched to client rendering.");
        var D = _m(C, u, h);
        return Kc(e, t, l, D);
      }
      var V = na(l, e.childLanes);
      if (ka || V) {
        var L = ld();
        if (L !== null) {
          var H = HS(L, l);
          if (H !== vn && H !== i.retryLane) {
            i.retryLane = H;
            var fe = Rt;
            Qn(e, H), dn(L, e, H, fe);
          }
        }
        dh();
        var Ce = _m(new Error("This Suspense boundary received an update before it finished hydrating. This caused the boundary to switch to client rendering. The usual way to fix this is to wrap the original update in startTransition."));
        return Kc(e, t, l, Ce);
      } else if (Zg(r)) {
        t.flags |= ot, t.child = e.child;
        var Se = nT.bind(null, e);
        return kD(r, Se), null;
      } else {
        xC(t, r, i.treeContext);
        var Ze = a.children, We = $m(t, Ze);
        return We.flags |= hr, We;
      }
    }
  }
  function Oy(e, t, n) {
    e.lanes = Ye(e.lanes, t);
    var a = e.alternate;
    a !== null && (a.lanes = Ye(a.lanes, t)), Ap(e.return, t, n);
  }
  function Mj(e, t, n) {
    for (var a = t; a !== null; ) {
      if (a.tag === te) {
        var r = a.memoizedState;
        r !== null && Oy(a, n, e);
      } else if (a.tag === ie)
        Oy(a, n, e);
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
  function Vj(e) {
    for (var t = e, n = null; t !== null; ) {
      var a = t.alternate;
      a !== null && jc(a) === null && (n = t), t = t.sibling;
    }
    return n;
  }
  function Aj(e) {
    if (e !== void 0 && e !== "forwards" && e !== "backwards" && e !== "together" && !Um[e])
      if (Um[e] = !0, typeof e == "string")
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
  function Lj(e, t) {
    e !== void 0 && !Wc[e] && (e !== "collapsed" && e !== "hidden" ? (Wc[e] = !0, d('"%s" is not a supported value for tail on <SuspenseList />. Did you mean "collapsed" or "hidden"?', e)) : t !== "forwards" && t !== "backwards" && (Wc[e] = !0, d('<SuspenseList tail="%s" /> is only valid if revealOrder is "forwards" or "backwards". Did you mean to specify revealOrder="forwards"?', e)));
  }
  function My(e, t) {
    {
      var n = Ge(e), a = !n && typeof Ca(e) == "function";
      if (n || a) {
        var r = n ? "array" : "iterable";
        return d("A nested %s was passed to row #%s in <SuspenseList />. Wrap it in an additional SuspenseList to configure its revealOrder: <SuspenseList revealOrder=...> ... <SuspenseList revealOrder=...>{%s}</SuspenseList> ... </SuspenseList>", r, t, r), !1;
      }
    }
    return !0;
  }
  function kj(e, t) {
    if ((t === "forwards" || t === "backwards") && e !== void 0 && e !== null && e !== !1)
      if (Ge(e)) {
        for (var n = 0; n < e.length; n++)
          if (!My(e[n], n))
            return;
      } else {
        var a = Ca(e);
        if (typeof a == "function") {
          var r = a.call(e);
          if (r)
            for (var i = r.next(), l = 0; !i.done; i = r.next()) {
              if (!My(i.value, l))
                return;
              l++;
            }
        } else
          d('A single row was passed to a <SuspenseList revealOrder="%s" />. This is not useful since it needs multiple rows. Did you mean to pass multiple children or an array?', t);
      }
  }
  function Ym(e, t, n, a, r) {
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
  function Vy(e, t, n) {
    var a = t.pendingProps, r = a.revealOrder, i = a.tail, l = a.children;
    Aj(r), Lj(i, r), kj(l, r), Bn(e, t, l, n);
    var u = Va.current, c = $p(u, Es);
    if (c)
      u = Ip(u, Es), t.flags |= ot;
    else {
      var h = e !== null && (e.flags & ot) !== Oe;
      h && Mj(t, t.child, n), u = Pl(u);
    }
    if (Zr(t, u), (t.mode & Xe) === Te)
      t.memoizedState = null;
    else
      switch (r) {
        case "forwards": {
          var v = Vj(t.child), C;
          v === null ? (C = t.child, t.child = null) : (C = v.sibling, v.sibling = null), Ym(
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
          Ym(
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
          Ym(
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
  function Uj(e, t, n) {
    Pp(t, t.stateNode.containerInfo);
    var a = t.pendingProps;
    return e === null ? t.child = kl(t, null, a, n) : Bn(e, t, a, n), t.child;
  }
  var Ay = !1;
  function Fj(e, t, n) {
    var a = t.type, r = a._context, i = t.pendingProps, l = t.memoizedProps, u = i.value;
    {
      "value" in i || Ay || (Ay = !0, d("The `value` prop is required for the `<Context.Provider>`. Did you misspell it or forget to pass it?"));
      var c = t.type.propTypes;
      c && _a(c, i, "prop", "Context.Provider");
    }
    if (Cb(t, r, u), l !== null) {
      var h = l.value;
      if (ia(h, u)) {
        if (l.children === i.children && !rc())
          return Cr(e, t, n);
      } else
        AC(t, r, n);
    }
    var v = i.children;
    return Bn(e, t, v, n), t.child;
  }
  var Ly = !1;
  function zj(e, t, n) {
    var a = t.type;
    a._context === void 0 ? a !== a.Consumer && (Ly || (Ly = !0, d("Rendering <Context> directly is not supported and will be removed in a future major release. Did you mean to render <Context.Consumer> instead?"))) : a = a._context;
    var r = t.pendingProps, i = r.children;
    typeof i != "function" && d("A context consumer was rendered with multiple children, or a child that isn't a function. A context consumer expects a single child that is a function. If you did pass a function, make sure there is no trailing or leading whitespace around it."), Fl(t, n);
    var l = Kt(a);
    Oo(t);
    var u;
    return Os.current = t, fa(!0), u = i(l), fa(!1), gl(), t.flags |= pl, Bn(e, t, u, n), t.child;
  }
  function As() {
    ka = !0;
  }
  function Qc(e, t) {
    (t.mode & Xe) === Te && e !== null && (e.alternate = null, t.alternate = null, t.flags |= Wt);
  }
  function Cr(e, t, n) {
    return e !== null && (t.dependencies = e.dependencies), cy(), qs(t.lanes), na(n, t.childLanes) ? (MC(e, t), t.child) : null;
  }
  function Pj(e, t, n) {
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
      return i === null ? (a.deletions = [e], a.flags |= Si) : i.push(e), n.flags |= Wt, n;
    }
  }
  function qm(e, t) {
    var n = e.lanes;
    return !!na(n, t);
  }
  function Hj(e, t, n) {
    switch (t.tag) {
      case x:
        jy(t), t.stateNode, Ll();
        break;
      case k:
        Ab(t);
        break;
      case j: {
        var a = t.type;
        Xa(a) && lc(t);
        break;
      }
      case T:
        Pp(t, t.stateNode.containerInfo);
        break;
      case G: {
        var r = t.memoizedProps.value, i = t.type._context;
        Cb(t, i, r);
        break;
      }
      case $:
        {
          var l = na(n, t.childLanes);
          l && (t.flags |= lt);
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
            return Zr(t, Pl(Va.current)), t.flags |= ot, null;
          var h = t.child, v = h.childLanes;
          if (na(n, v))
            return wy(e, t, n);
          Zr(t, Pl(Va.current));
          var C = Cr(e, t, n);
          return C !== null ? C.sibling : null;
        } else
          Zr(t, Pl(Va.current));
        break;
      }
      case ie: {
        var D = (e.flags & ot) !== Oe, V = na(n, t.childLanes);
        if (D) {
          if (V)
            return Vy(e, t, n);
          t.flags |= ot;
        }
        var L = t.memoizedState;
        if (L !== null && (L.rendering = null, L.tail = null, L.lastEffect = null), Zr(t, Va.current), V)
          break;
        return null;
      }
      case q:
      case be:
        return t.lanes = X, Ry(e, t, n);
    }
    return Cr(e, t, n);
  }
  function ky(e, t, n) {
    if (t._debugNeedsRemount && e !== null)
      return Pj(e, t, Eh(t.type, t.key, t.pendingProps, t._debugOwner || null, t.mode, t.lanes));
    if (e !== null) {
      var a = e.memoizedProps, r = t.pendingProps;
      if (a !== r || rc() || // Force a re-render if the implementation changed due to hot reload:
      t.type !== e.type)
        ka = !0;
      else {
        var i = qm(e, n);
        if (!i && // If this is the second pass of an error or suspense boundary, there
        // may not be work scheduled on `current`, so we check for this flag.
        (t.flags & ot) === Oe)
          return ka = !1, Hj(e, t, n);
        (e.flags & Qd) !== Oe ? ka = !0 : ka = !1;
      }
    } else if (ka = !1, En() && fC(t)) {
      var l = t.index, u = pC();
      cb(t, u, l);
    }
    switch (t.lanes = X, t.tag) {
      case M:
        return Ej(e, t, t.type, n);
      case re: {
        var c = t.elementType;
        return Nj(e, t, c, n);
      }
      case R: {
        var h = t.type, v = t.pendingProps, C = t.elementType === h ? v : La(h, v);
        return Fm(e, t, h, C, n);
      }
      case j: {
        var D = t.type, V = t.pendingProps, L = t.elementType === D ? V : La(D, V);
        return Cy(e, t, D, L, n);
      }
      case x:
        return gj(e, t, n);
      case k:
        return bj(e, t, n);
      case ee:
        return yj(e, t);
      case te:
        return wy(e, t, n);
      case T:
        return Uj(e, t, n);
      case P: {
        var H = t.type, fe = t.pendingProps, Ce = t.elementType === H ? fe : La(H, fe);
        return xy(e, t, H, Ce, n);
      }
      case pe:
        return mj(e, t, n);
      case le:
        return hj(e, t, n);
      case $:
        return vj(e, t, n);
      case G:
        return Fj(e, t, n);
      case oe:
        return zj(e, t, n);
      case F: {
        var Se = t.type, Ze = t.pendingProps, We = La(Se, Ze);
        if (t.type !== t.elementType) {
          var _ = Se.propTypes;
          _ && _a(
            _,
            We,
            // Resolved for outer only
            "prop",
            it(Se)
          );
        }
        return We = La(Se.type, We), Ey(e, t, Se, We, n);
      }
      case U:
        return Sy(e, t, t.type, t.pendingProps, n);
      case J: {
        var B = t.type, O = t.pendingProps, ne = t.elementType === B ? O : La(B, O);
        return xj(e, t, B, ne, n);
      }
      case ie:
        return Vy(e, t, n);
      case we:
        break;
      case q:
        return Ry(e, t, n);
    }
    throw new Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
  }
  function ql(e) {
    e.flags |= lt;
  }
  function Uy(e) {
    e.flags |= Ri, e.flags |= Xd;
  }
  var Fy, Gm, zy, Py;
  Fy = function(e, t, n, a) {
    for (var r = t.child; r !== null; ) {
      if (r.tag === k || r.tag === ee)
        uD(e, r.stateNode);
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
  }, Gm = function(e, t) {
  }, zy = function(e, t, n, a, r) {
    var i = e.memoizedProps;
    if (i !== a) {
      var l = t.stateNode, u = Hp(), c = dD(l, n, i, a, r, u);
      t.updateQueue = c, c && ql(t);
    }
  }, Py = function(e, t, n, a) {
    n !== a && ql(t);
  };
  function Ls(e, t) {
    if (!En())
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
  function Rn(e) {
    var t = e.alternate !== null && e.alternate.child === e.child, n = X, a = Oe;
    if (t) {
      if ((e.mode & ht) !== Te) {
        for (var c = e.selfBaseDuration, h = e.child; h !== null; )
          n = Ye(n, Ye(h.lanes, h.childLanes)), a |= h.subtreeFlags & vr, a |= h.flags & vr, c += h.treeBaseDuration, h = h.sibling;
        e.treeBaseDuration = c;
      } else
        for (var v = e.child; v !== null; )
          n = Ye(n, Ye(v.lanes, v.childLanes)), a |= v.subtreeFlags & vr, a |= v.flags & vr, v.return = e, v = v.sibling;
      e.subtreeFlags |= a;
    } else {
      if ((e.mode & ht) !== Te) {
        for (var r = e.actualDuration, i = e.selfBaseDuration, l = e.child; l !== null; )
          n = Ye(n, Ye(l.lanes, l.childLanes)), a |= l.subtreeFlags, a |= l.flags, r += l.actualDuration, i += l.treeBaseDuration, l = l.sibling;
        e.actualDuration = r, e.treeBaseDuration = i;
      } else
        for (var u = e.child; u !== null; )
          n = Ye(n, Ye(u.lanes, u.childLanes)), a |= u.subtreeFlags, a |= u.flags, u.return = e, u = u.sibling;
      e.subtreeFlags |= a;
    }
    return e.childLanes = n, t;
  }
  function Bj(e, t, n) {
    if (CC() && (t.mode & Xe) !== Te && (t.flags & ot) === Oe)
      return gb(t), Ll(), t.flags |= mr | Eu | Hn, !1;
    var a = dc(t);
    if (n !== null && n.dehydrated !== null)
      if (e === null) {
        if (!a)
          throw new Error("A dehydrated suspense component was completed without a hydrated node. This is probably a bug in React.");
        if (RC(t), Rn(t), (t.mode & ht) !== Te) {
          var r = n !== null;
          if (r) {
            var i = t.child;
            i !== null && (t.treeBaseDuration -= i.treeBaseDuration);
          }
        }
        return !1;
      } else {
        if (Ll(), (t.flags & ot) === Oe && (t.memoizedState = null), t.flags |= lt, Rn(t), (t.mode & ht) !== Te) {
          var l = n !== null;
          if (l) {
            var u = t.child;
            u !== null && (t.treeBaseDuration -= u.treeBaseDuration);
          }
        }
        return !1;
      }
    else
      return bb(), !0;
  }
  function Hy(e, t, n) {
    var a = t.pendingProps;
    switch (yp(t), t.tag) {
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
        return Rn(t), null;
      case j: {
        var r = t.type;
        return Xa(r) && ic(t), Rn(t), null;
      }
      case x: {
        var i = t.stateNode;
        if (zl(t), hp(t), qp(), i.pendingContext && (i.context = i.pendingContext, i.pendingContext = null), e === null || e.child === null) {
          var l = dc(t);
          if (l)
            ql(t);
          else if (e !== null) {
            var u = e.memoizedState;
            // Check if this is a client root
            (!u.isDehydrated || // Check if we reverted to client rendering (e.g. due to an error)
            (t.flags & mr) !== Oe) && (t.flags |= ml, bb());
          }
        }
        return Gm(e, t), Rn(t), null;
      }
      case k: {
        Bp(t);
        var c = Vb(), h = t.type;
        if (e !== null && t.stateNode != null)
          zy(e, t, h, a, c), e.ref !== t.ref && Uy(t);
        else {
          if (!a) {
            if (t.stateNode === null)
              throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
            return Rn(t), null;
          }
          var v = Hp(), C = dc(t);
          if (C)
            EC(t, c, v) && ql(t);
          else {
            var D = sD(h, a, c, v, t);
            Fy(D, t, !1, !1), t.stateNode = D, cD(D, h, a, c) && ql(t);
          }
          t.ref !== null && Uy(t);
        }
        return Rn(t), null;
      }
      case ee: {
        var V = a;
        if (e && t.stateNode != null) {
          var L = e.memoizedProps;
          Py(e, t, L, V);
        } else {
          if (typeof V != "string" && t.stateNode === null)
            throw new Error("We must have new props for new mounts. This error is likely caused by a bug in React. Please file an issue.");
          var H = Vb(), fe = Hp(), Ce = dc(t);
          Ce ? SC(t) && ql(t) : t.stateNode = fD(V, H, fe, t);
        }
        return Rn(t), null;
      }
      case te: {
        Hl(t);
        var Se = t.memoizedState;
        if (e === null || e.memoizedState !== null && e.memoizedState.dehydrated !== null) {
          var Ze = Bj(e, t, Se);
          if (!Ze)
            return t.flags & Hn ? t : null;
        }
        if ((t.flags & ot) !== Oe)
          return t.lanes = n, (t.mode & ht) !== Te && gm(t), t;
        var We = Se !== null, _ = e !== null && e.memoizedState !== null;
        if (We !== _ && We) {
          var B = t.child;
          if (B.flags |= Di, (t.mode & Xe) !== Te) {
            var O = e === null && (t.memoizedProps.unstable_avoidThisFallback !== !0 || !0);
            O || $p(Va.current, kb) ? $1() : dh();
          }
        }
        var ne = t.updateQueue;
        if (ne !== null && (t.flags |= lt), Rn(t), (t.mode & ht) !== Te && We) {
          var ge = t.child;
          ge !== null && (t.treeBaseDuration -= ge.treeBaseDuration);
        }
        return null;
      }
      case T:
        return zl(t), Gm(e, t), e === null && iC(t.stateNode.containerInfo), Rn(t), null;
      case G:
        var me = t.type._context;
        return Vp(me, t), Rn(t), null;
      case J: {
        var Me = t.type;
        return Xa(Me) && ic(t), Rn(t), null;
      }
      case ie: {
        Hl(t);
        var Fe = t.memoizedState;
        if (Fe === null)
          return Rn(t), null;
        var gt = (t.flags & ot) !== Oe, nt = Fe.rendering;
        if (nt === null)
          if (gt)
            Ls(Fe, !1);
          else {
            var Bt = Y1() && (e === null || (e.flags & ot) === Oe);
            if (!Bt)
              for (var at = t.child; at !== null; ) {
                var Ht = jc(at);
                if (Ht !== null) {
                  gt = !0, t.flags |= ot, Ls(Fe, !1);
                  var Ln = Ht.updateQueue;
                  return Ln !== null && (t.updateQueue = Ln, t.flags |= lt), t.subtreeFlags = Oe, VC(t, n), Zr(t, Ip(Va.current, Es)), t.child;
                }
                at = at.sibling;
              }
            Fe.tail !== null && mn() > sN() && (t.flags |= ot, gt = !0, Ls(Fe, !1), t.lanes = Pv);
          }
        else {
          if (!gt) {
            var wn = jc(nt);
            if (wn !== null) {
              t.flags |= ot, gt = !0;
              var sa = wn.updateQueue;
              if (sa !== null && (t.updateQueue = sa, t.flags |= lt), Ls(Fe, !0), Fe.tail === null && Fe.tailMode === "hidden" && !nt.alternate && !En())
                return Rn(t), null;
            } else // The time it took to render last row is greater than the remaining
            // time we have to render. So rendering one more row would likely
            // exceed it.
            mn() * 2 - Fe.renderingStartTime > sN() && n !== ta && (t.flags |= ot, gt = !0, Ls(Fe, !1), t.lanes = Pv);
          }
          if (Fe.isBackwards)
            nt.sibling = t.child, t.child = nt;
          else {
            var Yn = Fe.last;
            Yn !== null ? Yn.sibling = nt : t.child = nt, Fe.last = nt;
          }
        }
        if (Fe.tail !== null) {
          var qn = Fe.tail;
          Fe.rendering = qn, Fe.tail = qn.sibling, Fe.renderingStartTime = mn(), qn.sibling = null;
          var kn = Va.current;
          return gt ? kn = Ip(kn, Es) : kn = Pl(kn), Zr(t, kn), qn;
        }
        return Rn(t), null;
      }
      case we:
        break;
      case q:
      case be: {
        ch(t);
        var Or = t.memoizedState, eo = Or !== null;
        if (e !== null) {
          var Xs = e.memoizedState, ir = Xs !== null;
          ir !== eo && // LegacyHidden doesn't do any hiding — it only pre-renders.
          !He && (t.flags |= Di);
        }
        return !eo || (t.mode & Xe) === Te ? Rn(t) : na(rr, ta) && (Rn(t), t.subtreeFlags & (Wt | lt) && (t.flags |= Di)), null;
      }
      case ye:
        return null;
      case Y:
        return null;
    }
    throw new Error("Unknown unit of work tag (" + t.tag + "). This error is likely caused by a bug in React. Please file an issue.");
  }
  function $j(e, t, n) {
    switch (yp(t), t.tag) {
      case j: {
        var a = t.type;
        Xa(a) && ic(t);
        var r = t.flags;
        return r & Hn ? (t.flags = r & ~Hn | ot, (t.mode & ht) !== Te && gm(t), t) : null;
      }
      case x: {
        t.stateNode, zl(t), hp(t), qp();
        var i = t.flags;
        return (i & Hn) !== Oe && (i & ot) === Oe ? (t.flags = i & ~Hn | ot, t) : null;
      }
      case k:
        return Bp(t), null;
      case te: {
        Hl(t);
        var l = t.memoizedState;
        if (l !== null && l.dehydrated !== null) {
          if (t.alternate === null)
            throw new Error("Threw in newly mounted dehydrated component. This is likely a bug in React. Please file an issue.");
          Ll();
        }
        var u = t.flags;
        return u & Hn ? (t.flags = u & ~Hn | ot, (t.mode & ht) !== Te && gm(t), t) : null;
      }
      case ie:
        return Hl(t), null;
      case T:
        return zl(t), null;
      case G:
        var c = t.type._context;
        return Vp(c, t), null;
      case q:
      case be:
        return ch(t), null;
      case ye:
        return null;
      default:
        return null;
    }
  }
  function By(e, t, n) {
    switch (yp(t), t.tag) {
      case j: {
        var a = t.type.childContextTypes;
        a != null && ic(t);
        break;
      }
      case x: {
        t.stateNode, zl(t), hp(t), qp();
        break;
      }
      case k: {
        Bp(t);
        break;
      }
      case T:
        zl(t);
        break;
      case te:
        Hl(t);
        break;
      case ie:
        Hl(t);
        break;
      case G:
        var r = t.type._context;
        Vp(r, t);
        break;
      case q:
      case be:
        ch(t);
        break;
    }
  }
  var $y = null;
  $y = /* @__PURE__ */ new Set();
  var Xc = !1, Dn = !1, Ij = typeof WeakSet == "function" ? WeakSet : Set, Ne = null, Gl = null, Wl = null;
  function Yj(e) {
    Gd(null, function() {
      throw e;
    }), Wd();
  }
  var qj = function(e, t) {
    if (t.props = e.memoizedProps, t.state = e.memoizedState, e.mode & ht)
      try {
        nr(), t.componentWillUnmount();
      } finally {
        tr(e);
      }
    else
      t.componentWillUnmount();
  };
  function Iy(e, t) {
    try {
      ni(rn, e);
    } catch (n) {
      Nt(e, t, n);
    }
  }
  function Wm(e, t, n) {
    try {
      qj(e, n);
    } catch (a) {
      Nt(e, t, a);
    }
  }
  function Gj(e, t, n) {
    try {
      n.componentDidMount();
    } catch (a) {
      Nt(e, t, a);
    }
  }
  function Yy(e, t) {
    try {
      Gy(e);
    } catch (n) {
      Nt(e, t, n);
    }
  }
  function Kl(e, t) {
    var n = e.ref;
    if (n !== null)
      if (typeof n == "function") {
        var a;
        try {
          if (dt && bn && e.mode & ht)
            try {
              nr(), a = n(null);
            } finally {
              tr(e);
            }
          else
            a = n(null);
        } catch (r) {
          Nt(e, t, r);
        }
        typeof a == "function" && d("Unexpected return value from a callback ref in %s. A callback ref should not return a function.", ze(e));
      } else
        n.current = null;
  }
  function Jc(e, t, n) {
    try {
      n();
    } catch (a) {
      Nt(e, t, a);
    }
  }
  var qy = !1;
  function Wj(e, t) {
    lD(e.containerInfo), Ne = t, Kj();
    var n = qy;
    return qy = !1, n;
  }
  function Kj() {
    for (; Ne !== null; ) {
      var e = Ne, t = e.child;
      (e.subtreeFlags & ef) !== Oe && t !== null ? (t.return = e, Ne = t) : Qj();
    }
  }
  function Qj() {
    for (; Ne !== null; ) {
      var e = Ne;
      Mt(e);
      try {
        Xj(e);
      } catch (n) {
        Nt(e, e.return, n);
      }
      pn();
      var t = e.sibling;
      if (t !== null) {
        t.return = e.return, Ne = t;
        return;
      }
      Ne = e.return;
    }
  }
  function Xj(e) {
    var t = e.alternate, n = e.flags;
    if ((n & ml) !== Oe) {
      switch (Mt(e), e.tag) {
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
              var u = $y;
              l === void 0 && !u.has(e.type) && (u.add(e.type), d("%s.getSnapshotBeforeUpdate(): A snapshot value (or null) must be returned. You have returned undefined.", ze(e)));
            }
            i.__reactInternalSnapshotBeforeUpdate = l;
          }
          break;
        }
        case x: {
          {
            var c = e.stateNode;
            OD(c.containerInfo);
          }
          break;
        }
        case k:
        case ee:
        case T:
        case J:
          break;
        default:
          throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
      }
      pn();
    }
  }
  function Ua(e, t, n) {
    var a = t.updateQueue, r = a !== null ? a.lastEffect : null;
    if (r !== null) {
      var i = r.next, l = i;
      do {
        if ((l.tag & e) === e) {
          var u = l.destroy;
          l.destroy = void 0, u !== void 0 && ((e & Sn) !== Xn ? fS(t) : (e & rn) !== Xn && Lv(t), (e & Ja) !== Xn && Ws(!0), Jc(t, n, u), (e & Ja) !== Xn && Ws(!1), (e & Sn) !== Xn ? pS() : (e & rn) !== Xn && kv());
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
          (e & Sn) !== Xn ? cS(t) : (e & rn) !== Xn && mS(t);
          var l = i.create;
          (e & Ja) !== Xn && Ws(!0), i.destroy = l(), (e & Ja) !== Xn && Ws(!1), (e & Sn) !== Xn ? dS() : (e & rn) !== Xn && hS();
          {
            var u = i.destroy;
            if (u !== void 0 && typeof u != "function") {
              var c = void 0;
              (i.tag & rn) !== Oe ? c = "useLayoutEffect" : (i.tag & Ja) !== Oe ? c = "useInsertionEffect" : c = "useEffect";
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
  function Jj(e, t) {
    if ((t.flags & lt) !== Oe)
      switch (t.tag) {
        case $: {
          var n = t.stateNode.passiveEffectDuration, a = t.memoizedProps, r = a.id, i = a.onPostCommit, l = sy(), u = t.alternate === null ? "mount" : "update";
          oy() && (u = "nested-update"), typeof i == "function" && i(r, u, n, l);
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
  function Zj(e, t, n, a) {
    if ((n.flags & _o) !== Oe)
      switch (n.tag) {
        case R:
        case P:
        case U: {
          if (!Dn)
            if (n.mode & ht)
              try {
                nr(), ni(rn | an, n);
              } finally {
                tr(n);
              }
            else
              ni(rn | an, n);
          break;
        }
        case j: {
          var r = n.stateNode;
          if (n.flags & lt && !Dn)
            if (t === null)
              if (n.type === n.elementType && !Yi && (r.props !== n.memoizedProps && d("Expected %s props to match memoized props before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", ze(n) || "instance"), r.state !== n.memoizedState && d("Expected %s state to match memoized state before componentDidMount. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", ze(n) || "instance")), n.mode & ht)
                try {
                  nr(), r.componentDidMount();
                } finally {
                  tr(n);
                }
              else
                r.componentDidMount();
            else {
              var i = n.elementType === n.type ? t.memoizedProps : La(n.type, t.memoizedProps), l = t.memoizedState;
              if (n.type === n.elementType && !Yi && (r.props !== n.memoizedProps && d("Expected %s props to match memoized props before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", ze(n) || "instance"), r.state !== n.memoizedState && d("Expected %s state to match memoized state before componentDidUpdate. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", ze(n) || "instance")), n.mode & ht)
                try {
                  nr(), r.componentDidUpdate(i, l, r.__reactInternalSnapshotBeforeUpdate);
                } finally {
                  tr(n);
                }
              else
                r.componentDidUpdate(i, l, r.__reactInternalSnapshotBeforeUpdate);
            }
          var u = n.updateQueue;
          u !== null && (n.type === n.elementType && !Yi && (r.props !== n.memoizedProps && d("Expected %s props to match memoized props before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.props`. Please file an issue.", ze(n) || "instance"), r.state !== n.memoizedState && d("Expected %s state to match memoized state before processing the update queue. This might either be because of a bug in React, or because a component reassigns its own `this.state`. Please file an issue.", ze(n) || "instance")), Mb(n, u, r));
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
            Mb(n, c, h);
          }
          break;
        }
        case k: {
          var v = n.stateNode;
          if (t === null && n.flags & lt) {
            var C = n.type, D = n.memoizedProps;
            gD(v, C, D);
          }
          break;
        }
        case ee:
          break;
        case T:
          break;
        case $: {
          {
            var V = n.memoizedProps, L = V.onCommit, H = V.onRender, fe = n.stateNode.effectDuration, Ce = sy(), Se = t === null ? "mount" : "update";
            oy() && (Se = "nested-update"), typeof H == "function" && H(n.memoizedProps.id, Se, n.actualDuration, n.treeBaseDuration, n.actualStartTime, Ce);
            {
              typeof L == "function" && L(n.memoizedProps.id, Se, fe, Ce), Q1(n);
              var Ze = n.return;
              e: for (; Ze !== null; ) {
                switch (Ze.tag) {
                  case x:
                    var We = Ze.stateNode;
                    We.effectDuration += fe;
                    break e;
                  case $:
                    var _ = Ze.stateNode;
                    _.effectDuration += fe;
                    break e;
                }
                Ze = Ze.return;
              }
            }
          }
          break;
        }
        case te: {
          o1(e, n);
          break;
        }
        case ie:
        case J:
        case we:
        case q:
        case be:
        case Y:
          break;
        default:
          throw new Error("This unit of work tag should not have side-effects. This error is likely caused by a bug in React. Please file an issue.");
      }
    Dn || n.flags & Ri && Gy(n);
  }
  function e1(e) {
    switch (e.tag) {
      case R:
      case P:
      case U: {
        if (e.mode & ht)
          try {
            nr(), Iy(e, e.return);
          } finally {
            tr(e);
          }
        else
          Iy(e, e.return);
        break;
      }
      case j: {
        var t = e.stateNode;
        typeof t.componentDidMount == "function" && Gj(e, e.return, t), Yy(e, e.return);
        break;
      }
      case k: {
        Yy(e, e.return);
        break;
      }
    }
  }
  function t1(e, t) {
    for (var n = null, a = e; ; ) {
      if (a.tag === k) {
        if (n === null) {
          n = a;
          try {
            var r = a.stateNode;
            t ? jD(r) : wD(a.stateNode, a.memoizedProps);
          } catch (l) {
            Nt(e, e.return, l);
          }
        }
      } else if (a.tag === ee) {
        if (n === null)
          try {
            var i = a.stateNode;
            t ? TD(i) : _D(i, a.memoizedProps);
          } catch (l) {
            Nt(e, e.return, l);
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
  function Gy(e) {
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
        if (e.mode & ht)
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
  function n1(e) {
    var t = e.alternate;
    t !== null && (t.return = null), e.return = null;
  }
  function Wy(e) {
    var t = e.alternate;
    t !== null && (e.alternate = null, Wy(t));
    {
      if (e.child = null, e.deletions = null, e.sibling = null, e.tag === k) {
        var n = e.stateNode;
        n !== null && sC(n);
      }
      e.stateNode = null, e._debugOwner = null, e.return = null, e.dependencies = null, e.memoizedProps = null, e.memoizedState = null, e.pendingProps = null, e.stateNode = null, e.updateQueue = null;
    }
  }
  function a1(e) {
    for (var t = e.return; t !== null; ) {
      if (Ky(t))
        return t;
      t = t.return;
    }
    throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
  }
  function Ky(e) {
    return e.tag === k || e.tag === x || e.tag === T;
  }
  function Qy(e) {
    var t = e;
    e: for (; ; ) {
      for (; t.sibling === null; ) {
        if (t.return === null || Ky(t.return))
          return null;
        t = t.return;
      }
      for (t.sibling.return = t.return, t = t.sibling; t.tag !== k && t.tag !== ee && t.tag !== K; ) {
        if (t.flags & Wt || t.child === null || t.tag === T)
          continue e;
        t.child.return = t, t = t.child;
      }
      if (!(t.flags & Wt))
        return t.stateNode;
    }
  }
  function r1(e) {
    var t = a1(e);
    switch (t.tag) {
      case k: {
        var n = t.stateNode;
        t.flags & wo && (Jg(n), t.flags &= ~wo);
        var a = Qy(e);
        Qm(e, a, n);
        break;
      }
      case x:
      case T: {
        var r = t.stateNode.containerInfo, i = Qy(e);
        Km(e, i, r);
        break;
      }
      default:
        throw new Error("Invalid host parent fiber. This error is likely caused by a bug in React. Please file an issue.");
    }
  }
  function Km(e, t, n) {
    var a = e.tag, r = a === k || a === ee;
    if (r) {
      var i = e.stateNode;
      t ? SD(n, i, t) : xD(n, i);
    } else if (a !== T) {
      var l = e.child;
      if (l !== null) {
        Km(l, t, n);
        for (var u = l.sibling; u !== null; )
          Km(u, t, n), u = u.sibling;
      }
    }
  }
  function Qm(e, t, n) {
    var a = e.tag, r = a === k || a === ee;
    if (r) {
      var i = e.stateNode;
      t ? ED(n, i, t) : ND(n, i);
    } else if (a !== T) {
      var l = e.child;
      if (l !== null) {
        Qm(l, t, n);
        for (var u = l.sibling; u !== null; )
          Qm(u, t, n), u = u.sibling;
      }
    }
  }
  var Cn = null, Fa = !1;
  function i1(e, t, n) {
    {
      var a = t;
      e: for (; a !== null; ) {
        switch (a.tag) {
          case k: {
            Cn = a.stateNode, Fa = !1;
            break e;
          }
          case x: {
            Cn = a.stateNode.containerInfo, Fa = !0;
            break e;
          }
          case T: {
            Cn = a.stateNode.containerInfo, Fa = !0;
            break e;
          }
        }
        a = a.return;
      }
      if (Cn === null)
        throw new Error("Expected to find a host parent. This error is likely caused by a bug in React. Please file an issue.");
      Xy(e, t, n), Cn = null, Fa = !1;
    }
    n1(n);
  }
  function ai(e, t, n) {
    for (var a = n.child; a !== null; )
      Xy(e, t, a), a = a.sibling;
  }
  function Xy(e, t, n) {
    switch (lS(n), n.tag) {
      case k:
        Dn || Kl(n, t);
      case ee: {
        {
          var a = Cn, r = Fa;
          Cn = null, ai(e, t, n), Cn = a, Fa = r, Cn !== null && (Fa ? DD(Cn, n.stateNode) : RD(Cn, n.stateNode));
        }
        return;
      }
      case K: {
        Cn !== null && (Fa ? CD(Cn, n.stateNode) : op(Cn, n.stateNode));
        return;
      }
      case T: {
        {
          var i = Cn, l = Fa;
          Cn = n.stateNode.containerInfo, Fa = !0, ai(e, t, n), Cn = i, Fa = l;
        }
        return;
      }
      case R:
      case P:
      case F:
      case U: {
        if (!Dn) {
          var u = n.updateQueue;
          if (u !== null) {
            var c = u.lastEffect;
            if (c !== null) {
              var h = c.next, v = h;
              do {
                var C = v, D = C.destroy, V = C.tag;
                D !== void 0 && ((V & Ja) !== Xn ? Jc(n, t, D) : (V & rn) !== Xn && (Lv(n), n.mode & ht ? (nr(), Jc(n, t, D), tr(n)) : Jc(n, t, D), kv())), v = v.next;
              } while (v !== h);
            }
          }
        }
        ai(e, t, n);
        return;
      }
      case j: {
        if (!Dn) {
          Kl(n, t);
          var L = n.stateNode;
          typeof L.componentWillUnmount == "function" && Wm(n, t, L);
        }
        ai(e, t, n);
        return;
      }
      case we: {
        ai(e, t, n);
        return;
      }
      case q: {
        if (
          // TODO: Remove this dead flag
          n.mode & Xe
        ) {
          var H = Dn;
          Dn = H || n.memoizedState !== null, ai(e, t, n), Dn = H;
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
  function l1(e) {
    e.memoizedState;
  }
  function o1(e, t) {
    var n = t.memoizedState;
    if (n === null) {
      var a = t.alternate;
      if (a !== null) {
        var r = a.memoizedState;
        if (r !== null) {
          var i = r.dehydrated;
          i !== null && YD(i);
        }
      }
    }
  }
  function Jy(e) {
    var t = e.updateQueue;
    if (t !== null) {
      e.updateQueue = null;
      var n = e.stateNode;
      n === null && (n = e.stateNode = new Ij()), t.forEach(function(a) {
        var r = aT.bind(null, e, a);
        if (!n.has(a)) {
          if (n.add(a), Ta)
            if (Gl !== null && Wl !== null)
              Gs(Wl, Gl);
            else
              throw Error("Expected finished root and lanes to be set. This is a bug in React.");
          a.then(r, r);
        }
      });
    }
  }
  function s1(e, t, n) {
    Gl = n, Wl = e, Mt(t), Zy(t, e), Mt(t), Gl = null, Wl = null;
  }
  function za(e, t, n) {
    var a = t.deletions;
    if (a !== null)
      for (var r = 0; r < a.length; r++) {
        var i = a[r];
        try {
          i1(e, t, i);
        } catch (c) {
          Nt(i, t, c);
        }
      }
    var l = du();
    if (t.subtreeFlags & tf)
      for (var u = t.child; u !== null; )
        Mt(u), Zy(u, e), u = u.sibling;
    Mt(l);
  }
  function Zy(e, t, n) {
    var a = e.alternate, r = e.flags;
    switch (e.tag) {
      case R:
      case P:
      case F:
      case U: {
        if (za(t, e), ar(e), r & lt) {
          try {
            Ua(Ja | an, e, e.return), ni(Ja | an, e);
          } catch (Me) {
            Nt(e, e.return, Me);
          }
          if (e.mode & ht) {
            try {
              nr(), Ua(rn | an, e, e.return);
            } catch (Me) {
              Nt(e, e.return, Me);
            }
            tr(e);
          } else
            try {
              Ua(rn | an, e, e.return);
            } catch (Me) {
              Nt(e, e.return, Me);
            }
        }
        return;
      }
      case j: {
        za(t, e), ar(e), r & Ri && a !== null && Kl(a, a.return);
        return;
      }
      case k: {
        za(t, e), ar(e), r & Ri && a !== null && Kl(a, a.return);
        {
          if (e.flags & wo) {
            var i = e.stateNode;
            try {
              Jg(i);
            } catch (Me) {
              Nt(e, e.return, Me);
            }
          }
          if (r & lt) {
            var l = e.stateNode;
            if (l != null) {
              var u = e.memoizedProps, c = a !== null ? a.memoizedProps : u, h = e.type, v = e.updateQueue;
              if (e.updateQueue = null, v !== null)
                try {
                  bD(l, v, h, c, u, e);
                } catch (Me) {
                  Nt(e, e.return, Me);
                }
            }
          }
        }
        return;
      }
      case ee: {
        if (za(t, e), ar(e), r & lt) {
          if (e.stateNode === null)
            throw new Error("This should have a text node initialized. This error is likely caused by a bug in React. Please file an issue.");
          var C = e.stateNode, D = e.memoizedProps, V = a !== null ? a.memoizedProps : D;
          try {
            yD(C, V, D);
          } catch (Me) {
            Nt(e, e.return, Me);
          }
        }
        return;
      }
      case x: {
        if (za(t, e), ar(e), r & lt && a !== null) {
          var L = a.memoizedState;
          if (L.isDehydrated)
            try {
              ID(t.containerInfo);
            } catch (Me) {
              Nt(e, e.return, Me);
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
          var fe = H.stateNode, Ce = H.memoizedState, Se = Ce !== null;
          if (fe.isHidden = Se, Se) {
            var Ze = H.alternate !== null && H.alternate.memoizedState !== null;
            Ze || B1();
          }
        }
        if (r & lt) {
          try {
            l1(e);
          } catch (Me) {
            Nt(e, e.return, Me);
          }
          Jy(e);
        }
        return;
      }
      case q: {
        var We = a !== null && a.memoizedState !== null;
        if (
          // TODO: Remove this dead flag
          e.mode & Xe
        ) {
          var _ = Dn;
          Dn = _ || We, za(t, e), Dn = _;
        } else
          za(t, e);
        if (ar(e), r & Di) {
          var B = e.stateNode, O = e.memoizedState, ne = O !== null, ge = e;
          if (B.isHidden = ne, ne && !We && (ge.mode & Xe) !== Te) {
            Ne = ge;
            for (var me = ge.child; me !== null; )
              Ne = me, c1(me), me = me.sibling;
          }
          t1(ge, ne);
        }
        return;
      }
      case ie: {
        za(t, e), ar(e), r & lt && Jy(e);
        return;
      }
      case we:
        return;
      default: {
        za(t, e), ar(e);
        return;
      }
    }
  }
  function ar(e) {
    var t = e.flags;
    if (t & Wt) {
      try {
        r1(e);
      } catch (n) {
        Nt(e, e.return, n);
      }
      e.flags &= ~Wt;
    }
    t & hr && (e.flags &= ~hr);
  }
  function u1(e, t, n) {
    Gl = n, Wl = t, Ne = e, eN(e, t, n), Gl = null, Wl = null;
  }
  function eN(e, t, n) {
    for (var a = (e.mode & Xe) !== Te; Ne !== null; ) {
      var r = Ne, i = r.child;
      if (r.tag === q && a) {
        var l = r.memoizedState !== null, u = l || Xc;
        if (u) {
          Xm(e, t, n);
          continue;
        } else {
          var c = r.alternate, h = c !== null && c.memoizedState !== null, v = h || Dn, C = Xc, D = Dn;
          Xc = u, Dn = v, Dn && !D && (Ne = r, d1(r));
          for (var V = i; V !== null; )
            Ne = V, eN(
              V,
              // New root; bubble back up to here and stop.
              t,
              n
            ), V = V.sibling;
          Ne = r, Xc = C, Dn = D, Xm(e, t, n);
          continue;
        }
      }
      (r.subtreeFlags & _o) !== Oe && i !== null ? (i.return = r, Ne = i) : Xm(e, t, n);
    }
  }
  function Xm(e, t, n) {
    for (; Ne !== null; ) {
      var a = Ne;
      if ((a.flags & _o) !== Oe) {
        var r = a.alternate;
        Mt(a);
        try {
          Zj(t, r, a, n);
        } catch (l) {
          Nt(a, a.return, l);
        }
        pn();
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
  function c1(e) {
    for (; Ne !== null; ) {
      var t = Ne, n = t.child;
      switch (t.tag) {
        case R:
        case P:
        case F:
        case U: {
          if (t.mode & ht)
            try {
              nr(), Ua(rn, t, t.return);
            } finally {
              tr(t);
            }
          else
            Ua(rn, t, t.return);
          break;
        }
        case j: {
          Kl(t, t.return);
          var a = t.stateNode;
          typeof a.componentWillUnmount == "function" && Wm(t, t.return, a);
          break;
        }
        case k: {
          Kl(t, t.return);
          break;
        }
        case q: {
          var r = t.memoizedState !== null;
          if (r) {
            tN(e);
            continue;
          }
          break;
        }
      }
      n !== null ? (n.return = t, Ne = n) : tN(e);
    }
  }
  function tN(e) {
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
  function d1(e) {
    for (; Ne !== null; ) {
      var t = Ne, n = t.child;
      if (t.tag === q) {
        var a = t.memoizedState !== null;
        if (a) {
          nN(e);
          continue;
        }
      }
      n !== null ? (n.return = t, Ne = n) : nN(e);
    }
  }
  function nN(e) {
    for (; Ne !== null; ) {
      var t = Ne;
      Mt(t);
      try {
        e1(t);
      } catch (a) {
        Nt(t, t.return, a);
      }
      if (pn(), t === e) {
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
  function f1(e, t, n, a) {
    Ne = t, p1(t, e, n, a);
  }
  function p1(e, t, n, a) {
    for (; Ne !== null; ) {
      var r = Ne, i = r.child;
      (r.subtreeFlags & hl) !== Oe && i !== null ? (i.return = r, Ne = i) : m1(e, t, n, a);
    }
  }
  function m1(e, t, n, a) {
    for (; Ne !== null; ) {
      var r = Ne;
      if ((r.flags & Fr) !== Oe) {
        Mt(r);
        try {
          h1(t, r, n, a);
        } catch (l) {
          Nt(r, r.return, l);
        }
        pn();
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
  function h1(e, t, n, a) {
    switch (t.tag) {
      case R:
      case P:
      case U: {
        if (t.mode & ht) {
          vm();
          try {
            ni(Sn | an, t);
          } finally {
            hm(t);
          }
        } else
          ni(Sn | an, t);
        break;
      }
    }
  }
  function v1(e) {
    Ne = e, g1();
  }
  function g1() {
    for (; Ne !== null; ) {
      var e = Ne, t = e.child;
      if ((Ne.flags & Si) !== Oe) {
        var n = e.deletions;
        if (n !== null) {
          for (var a = 0; a < n.length; a++) {
            var r = n[a];
            Ne = r, N1(r, e);
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
      (e.subtreeFlags & hl) !== Oe && t !== null ? (t.return = e, Ne = t) : b1();
    }
  }
  function b1() {
    for (; Ne !== null; ) {
      var e = Ne;
      (e.flags & Fr) !== Oe && (Mt(e), y1(e), pn());
      var t = e.sibling;
      if (t !== null) {
        t.return = e.return, Ne = t;
        return;
      }
      Ne = e.return;
    }
  }
  function y1(e) {
    switch (e.tag) {
      case R:
      case P:
      case U: {
        e.mode & ht ? (vm(), Ua(Sn | an, e, e.return), hm(e)) : Ua(Sn | an, e, e.return);
        break;
      }
    }
  }
  function N1(e, t) {
    for (; Ne !== null; ) {
      var n = Ne;
      Mt(n), E1(n, t), pn();
      var a = n.child;
      a !== null ? (a.return = n, Ne = a) : x1(e);
    }
  }
  function x1(e) {
    for (; Ne !== null; ) {
      var t = Ne, n = t.sibling, a = t.return;
      if (Wy(t), t === e) {
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
  function E1(e, t) {
    switch (e.tag) {
      case R:
      case P:
      case U: {
        e.mode & ht ? (vm(), Ua(Sn, e, t), hm(e)) : Ua(Sn, e, t);
        break;
      }
    }
  }
  function S1(e) {
    switch (e.tag) {
      case R:
      case P:
      case U: {
        try {
          ni(rn | an, e);
        } catch (n) {
          Nt(e, e.return, n);
        }
        break;
      }
      case j: {
        var t = e.stateNode;
        try {
          t.componentDidMount();
        } catch (n) {
          Nt(e, e.return, n);
        }
        break;
      }
    }
  }
  function R1(e) {
    switch (e.tag) {
      case R:
      case P:
      case U: {
        try {
          ni(Sn | an, e);
        } catch (t) {
          Nt(e, e.return, t);
        }
        break;
      }
    }
  }
  function D1(e) {
    switch (e.tag) {
      case R:
      case P:
      case U: {
        try {
          Ua(rn | an, e, e.return);
        } catch (n) {
          Nt(e, e.return, n);
        }
        break;
      }
      case j: {
        var t = e.stateNode;
        typeof t.componentWillUnmount == "function" && Wm(e, e.return, t);
        break;
      }
    }
  }
  function C1(e) {
    switch (e.tag) {
      case R:
      case P:
      case U:
        try {
          Ua(Sn | an, e, e.return);
        } catch (t) {
          Nt(e, e.return, t);
        }
    }
  }
  if (typeof Symbol == "function" && Symbol.for) {
    var ks = Symbol.for;
    ks("selector.component"), ks("selector.has_pseudo_class"), ks("selector.role"), ks("selector.test_id"), ks("selector.text");
  }
  var j1 = [];
  function T1() {
    j1.forEach(function(e) {
      return e();
    });
  }
  var w1 = m.ReactCurrentActQueue;
  function _1(e) {
    {
      var t = (
        // $FlowExpectedError – Flow doesn't know about IS_REACT_ACT_ENVIRONMENT global
        typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0
      ), n = typeof jest < "u";
      return n && t !== !1;
    }
  }
  function aN() {
    {
      var e = (
        // $FlowExpectedError – Flow doesn't know about IS_REACT_ACT_ENVIRONMENT global
        typeof IS_REACT_ACT_ENVIRONMENT < "u" ? IS_REACT_ACT_ENVIRONMENT : void 0
      );
      return !e && w1.current !== null && d("The current testing environment is not configured to support act(...)"), e;
    }
  }
  var O1 = Math.ceil, Jm = m.ReactCurrentDispatcher, Zm = m.ReactCurrentOwner, jn = m.ReactCurrentBatchConfig, Pa = m.ReactCurrentActQueue, sn = (
    /*             */
    0
  ), rN = (
    /*               */
    1
  ), Tn = (
    /*                */
    2
  ), ba = (
    /*                */
    4
  ), jr = 0, Us = 1, qi = 2, Zc = 3, Fs = 4, iN = 5, eh = 6, Je = sn, $n = null, Ut = null, un = X, rr = X, th = Gr(X), cn = jr, zs = null, ed = X, Ps = X, td = X, Hs = null, Jn = null, nh = 0, lN = 500, oN = 1 / 0, M1 = 500, Tr = null;
  function Bs() {
    oN = mn() + M1;
  }
  function sN() {
    return oN;
  }
  var nd = !1, ah = null, Ql = null, Gi = !1, ri = null, $s = X, rh = [], ih = null, V1 = 50, Is = 0, lh = null, oh = !1, ad = !1, A1 = 50, Xl = 0, rd = null, Ys = Rt, id = X, uN = !1;
  function ld() {
    return $n;
  }
  function In() {
    return (Je & (Tn | ba)) !== sn ? mn() : (Ys !== Rt || (Ys = mn()), Ys);
  }
  function ii(e) {
    var t = e.mode;
    if ((t & Xe) === Te)
      return Le;
    if ((Je & Tn) !== sn && un !== X)
      return Uo(un);
    var n = wC() !== TC;
    if (n) {
      if (jn.transition !== null) {
        var a = jn.transition;
        a._updatedFibers || (a._updatedFibers = /* @__PURE__ */ new Set()), a._updatedFibers.add(e);
      }
      return id === vn && (id = Iv()), id;
    }
    var r = wa();
    if (r !== vn)
      return r;
    var i = pD();
    return i;
  }
  function L1(e) {
    var t = e.mode;
    return (t & Xe) === Te ? Le : US();
  }
  function dn(e, t, n, a) {
    iT(), uN && d("useInsertionEffect must not schedule updates."), oh && (ad = !0), Fo(e, n, a), (Je & Tn) !== X && e === $n ? sT(t) : (Ta && Gv(e, t, n), uT(t), e === $n && ((Je & Tn) === sn && (Ps = Ye(Ps, n)), cn === Fs && li(e, un)), Zn(e, a), n === Le && Je === sn && (t.mode & Xe) === Te && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
    !Pa.isBatchingLegacy && (Bs(), ub()));
  }
  function k1(e, t, n) {
    var a = e.current;
    a.lanes = t, Fo(e, t, n), Zn(e, n);
  }
  function U1(e) {
    return (
      // TODO: Remove outdated deferRenderPhaseUpdateToNextBatch experiment. We
      // decided not to enable it.
      (Je & Tn) !== sn
    );
  }
  function Zn(e, t) {
    var n = e.callbackNode;
    OS(e, t);
    var a = ju(e, e === $n ? un : X);
    if (a === X) {
      n !== null && DN(n), e.callbackNode = null, e.callbackPriority = vn;
      return;
    }
    var r = Oi(a), i = e.callbackPriority;
    if (i === r && // Special case related to `act`. If the currently scheduled task is a
    // Scheduler task, rather than an `act` task, cancel it and re-scheduled
    // on the `act` queue.
    !(Pa.current !== null && n !== mh)) {
      n == null && i !== Le && d("Expected scheduled callback to exist. This error is likely caused by a bug in React. Please file an issue.");
      return;
    }
    n != null && DN(n);
    var l;
    if (r === Le)
      e.tag === Wr ? (Pa.isBatchingLegacy !== null && (Pa.didScheduleLegacyUpdate = !0), dC(fN.bind(null, e))) : sb(fN.bind(null, e)), Pa.current !== null ? Pa.current.push(Kr) : hD(function() {
        (Je & (Tn | ba)) === sn && Kr();
      }), l = null;
    else {
      var u;
      switch (Qv(a)) {
        case aa:
          u = Su;
          break;
        case br:
          u = nf;
          break;
        case yr:
          u = Ti;
          break;
        case _u:
          u = af;
          break;
        default:
          u = Ti;
          break;
      }
      l = hh(u, cN.bind(null, e));
    }
    e.callbackPriority = r, e.callbackNode = l;
  }
  function cN(e, t) {
    if (tj(), Ys = Rt, id = X, (Je & (Tn | ba)) !== sn)
      throw new Error("Should not already be working.");
    var n = e.callbackNode, a = _r();
    if (a && e.callbackNode !== n)
      return null;
    var r = ju(e, e === $n ? un : X);
    if (r === X)
      return null;
    var i = !Tu(e, r) && !kS(e, r) && !t, l = i ? G1(e, r) : sd(e, r);
    if (l !== jr) {
      if (l === qi) {
        var u = Cf(e);
        u !== X && (r = u, l = sh(e, u));
      }
      if (l === Us) {
        var c = zs;
        throw Wi(e, X), li(e, r), Zn(e, mn()), c;
      }
      if (l === eh)
        li(e, r);
      else {
        var h = !Tu(e, r), v = e.current.alternate;
        if (h && !z1(v)) {
          if (l = sd(e, r), l === qi) {
            var C = Cf(e);
            C !== X && (r = C, l = sh(e, C));
          }
          if (l === Us) {
            var D = zs;
            throw Wi(e, X), li(e, r), Zn(e, mn()), D;
          }
        }
        e.finishedWork = v, e.finishedLanes = r, F1(e, l, r);
      }
    }
    return Zn(e, mn()), e.callbackNode === n ? cN.bind(null, e) : null;
  }
  function sh(e, t) {
    var n = Hs;
    if (Ou(e)) {
      var a = Wi(e, t);
      a.flags |= mr, rC(e.containerInfo);
    }
    var r = sd(e, t);
    if (r !== qi) {
      var i = Jn;
      Jn = n, i !== null && dN(i);
    }
    return r;
  }
  function dN(e) {
    Jn === null ? Jn = e : Jn.push.apply(Jn, e);
  }
  function F1(e, t, n) {
    switch (t) {
      case jr:
      case Us:
        throw new Error("Root did not complete. This is a bug in React.");
      case qi: {
        Ki(e, Jn, Tr);
        break;
      }
      case Zc: {
        if (li(e, n), Bv(n) && // do not delay if we're inside an act() scope
        !CN()) {
          var a = nh + lN - mn();
          if (a > 10) {
            var r = ju(e, X);
            if (r !== X)
              break;
            var i = e.suspendedLanes;
            if (!xl(i, n)) {
              In(), qv(e, i);
              break;
            }
            e.timeoutHandle = ip(Ki.bind(null, e, Jn, Tr), a);
            break;
          }
        }
        Ki(e, Jn, Tr);
        break;
      }
      case Fs: {
        if (li(e, n), LS(n))
          break;
        if (!CN()) {
          var l = wS(e, n), u = l, c = mn() - u, h = rT(c) - c;
          if (h > 10) {
            e.timeoutHandle = ip(Ki.bind(null, e, Jn, Tr), h);
            break;
          }
        }
        Ki(e, Jn, Tr);
        break;
      }
      case iN: {
        Ki(e, Jn, Tr);
        break;
      }
      default:
        throw new Error("Unknown root exit status.");
    }
  }
  function z1(e) {
    for (var t = e; ; ) {
      if (t.flags & Kd) {
        var n = t.updateQueue;
        if (n !== null) {
          var a = n.stores;
          if (a !== null)
            for (var r = 0; r < a.length; r++) {
              var i = a[r], l = i.getSnapshot, u = i.value;
              try {
                if (!ia(l(), u))
                  return !1;
              } catch {
                return !1;
              }
            }
        }
      }
      var c = t.child;
      if (t.subtreeFlags & Kd && c !== null) {
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
    t = wu(t, td), t = wu(t, Ps), zS(e, t);
  }
  function fN(e) {
    if (nj(), (Je & (Tn | ba)) !== sn)
      throw new Error("Should not already be working.");
    _r();
    var t = ju(e, X);
    if (!na(t, Le))
      return Zn(e, mn()), null;
    var n = sd(e, t);
    if (e.tag !== Wr && n === qi) {
      var a = Cf(e);
      a !== X && (t = a, n = sh(e, a));
    }
    if (n === Us) {
      var r = zs;
      throw Wi(e, X), li(e, t), Zn(e, mn()), r;
    }
    if (n === eh)
      throw new Error("Root did not complete. This is a bug in React.");
    var i = e.current.alternate;
    return e.finishedWork = i, e.finishedLanes = t, Ki(e, Jn, Tr), Zn(e, mn()), null;
  }
  function P1(e, t) {
    t !== X && (_f(e, Ye(t, Le)), Zn(e, mn()), (Je & (Tn | ba)) === sn && (Bs(), Kr()));
  }
  function uh(e, t) {
    var n = Je;
    Je |= rN;
    try {
      return e(t);
    } finally {
      Je = n, Je === sn && // Treat `act` as if it's inside `batchedUpdates`, even in legacy mode.
      !Pa.isBatchingLegacy && (Bs(), ub());
    }
  }
  function H1(e, t, n, a, r) {
    var i = wa(), l = jn.transition;
    try {
      return jn.transition = null, gn(aa), e(t, n, a, r);
    } finally {
      gn(i), jn.transition = l, Je === sn && Bs();
    }
  }
  function wr(e) {
    ri !== null && ri.tag === Wr && (Je & (Tn | ba)) === sn && _r();
    var t = Je;
    Je |= rN;
    var n = jn.transition, a = wa();
    try {
      return jn.transition = null, gn(aa), e ? e() : void 0;
    } finally {
      gn(a), jn.transition = n, Je = t, (Je & (Tn | ba)) === sn && Kr();
    }
  }
  function pN() {
    return (Je & (Tn | ba)) !== sn;
  }
  function od(e, t) {
    Vn(th, rr, e), rr = Ye(rr, t);
  }
  function ch(e) {
    rr = th.current, Mn(th, e);
  }
  function Wi(e, t) {
    e.finishedWork = null, e.finishedLanes = X;
    var n = e.timeoutHandle;
    if (n !== lp && (e.timeoutHandle = lp, mD(n)), Ut !== null)
      for (var a = Ut.return; a !== null; ) {
        var r = a.alternate;
        By(r, a), a = a.return;
      }
    $n = e;
    var i = Qi(e.current, null);
    return Ut = i, un = rr = t, cn = jr, zs = null, ed = X, Ps = X, td = X, Hs = null, Jn = null, kC(), Ma.discardPendingWarnings(), i;
  }
  function mN(e, t) {
    do {
      var n = Ut;
      try {
        if (gc(), Fb(), pn(), Zm.current = null, n === null || n.return === null) {
          cn = Us, zs = t, Ut = null;
          return;
        }
        if (dt && n.mode & ht && qc(n, !0), tt)
          if (gl(), t !== null && typeof t == "object" && typeof t.then == "function") {
            var a = t;
            gS(n, a, un);
          } else
            vS(n, t, un);
        dj(e, n.return, n, t, un), bN(n);
      } catch (r) {
        t = r, Ut === n && n !== null ? (n = n.return, Ut = n) : n = Ut;
        continue;
      }
      return;
    } while (!0);
  }
  function hN() {
    var e = Jm.current;
    return Jm.current = Hc, e === null ? Hc : e;
  }
  function vN(e) {
    Jm.current = e;
  }
  function B1() {
    nh = mn();
  }
  function qs(e) {
    ed = Ye(e, ed);
  }
  function $1() {
    cn === jr && (cn = Zc);
  }
  function dh() {
    (cn === jr || cn === Zc || cn === qi) && (cn = Fs), $n !== null && (jf(ed) || jf(Ps)) && li($n, un);
  }
  function I1(e) {
    cn !== Fs && (cn = qi), Hs === null ? Hs = [e] : Hs.push(e);
  }
  function Y1() {
    return cn === jr;
  }
  function sd(e, t) {
    var n = Je;
    Je |= Tn;
    var a = hN();
    if ($n !== e || un !== t) {
      if (Ta) {
        var r = e.memoizedUpdaters;
        r.size > 0 && (Gs(e, un), r.clear()), Wv(e, t);
      }
      Tr = Kv(), Wi(e, t);
    }
    Uv(t);
    do
      try {
        q1();
        break;
      } catch (i) {
        mN(e, i);
      }
    while (!0);
    if (gc(), Je = n, vN(a), Ut !== null)
      throw new Error("Cannot commit an incomplete root. This error is likely caused by a bug in React. Please file an issue.");
    return Fv(), $n = null, un = X, cn;
  }
  function q1() {
    for (; Ut !== null; )
      gN(Ut);
  }
  function G1(e, t) {
    var n = Je;
    Je |= Tn;
    var a = hN();
    if ($n !== e || un !== t) {
      if (Ta) {
        var r = e.memoizedUpdaters;
        r.size > 0 && (Gs(e, un), r.clear()), Wv(e, t);
      }
      Tr = Kv(), Bs(), Wi(e, t);
    }
    Uv(t);
    do
      try {
        W1();
        break;
      } catch (i) {
        mN(e, i);
      }
    while (!0);
    return gc(), vN(a), Je = n, Ut !== null ? (ES(), jr) : (Fv(), $n = null, un = X, cn);
  }
  function W1() {
    for (; Ut !== null && !QE(); )
      gN(Ut);
  }
  function gN(e) {
    var t = e.alternate;
    Mt(e);
    var n;
    (e.mode & ht) !== Te ? (mm(e), n = fh(t, e, rr), qc(e, !0)) : n = fh(t, e, rr), pn(), e.memoizedProps = e.pendingProps, n === null ? bN(e) : Ut = n, Zm.current = null;
  }
  function bN(e) {
    var t = e;
    do {
      var n = t.alternate, a = t.return;
      if ((t.flags & Eu) === Oe) {
        Mt(t);
        var r = void 0;
        if ((t.mode & ht) === Te ? r = Hy(n, t, rr) : (mm(t), r = Hy(n, t, rr), qc(t, !1)), pn(), r !== null) {
          Ut = r;
          return;
        }
      } else {
        var i = $j(n, t);
        if (i !== null) {
          i.flags &= IE, Ut = i;
          return;
        }
        if ((t.mode & ht) !== Te) {
          qc(t, !1);
          for (var l = t.actualDuration, u = t.child; u !== null; )
            l += u.actualDuration, u = u.sibling;
          t.actualDuration = l;
        }
        if (a !== null)
          a.flags |= Eu, a.subtreeFlags = Oe, a.deletions = null;
        else {
          cn = eh, Ut = null;
          return;
        }
      }
      var c = t.sibling;
      if (c !== null) {
        Ut = c;
        return;
      }
      t = a, Ut = t;
    } while (t !== null);
    cn === jr && (cn = iN);
  }
  function Ki(e, t, n) {
    var a = wa(), r = jn.transition;
    try {
      jn.transition = null, gn(aa), K1(e, t, n, a);
    } finally {
      jn.transition = r, gn(a);
    }
    return null;
  }
  function K1(e, t, n, a) {
    do
      _r();
    while (ri !== null);
    if (lT(), (Je & (Tn | ba)) !== sn)
      throw new Error("Should not already be working.");
    var r = e.finishedWork, i = e.finishedLanes;
    if (uS(i), r === null)
      return Av(), null;
    if (i === X && d("root.finishedLanes should not be empty during a commit. This is a bug in React."), e.finishedWork = null, e.finishedLanes = X, r === e.current)
      throw new Error("Cannot commit the same tree as before. This error is likely caused by a bug in React. Please file an issue.");
    e.callbackNode = null, e.callbackPriority = vn;
    var l = Ye(r.lanes, r.childLanes);
    PS(e, l), e === $n && ($n = null, Ut = null, un = X), ((r.subtreeFlags & hl) !== Oe || (r.flags & hl) !== Oe) && (Gi || (Gi = !0, ih = n, hh(Ti, function() {
      return _r(), null;
    })));
    var u = (r.subtreeFlags & (ef | tf | _o | hl)) !== Oe, c = (r.flags & (ef | tf | _o | hl)) !== Oe;
    if (u || c) {
      var h = jn.transition;
      jn.transition = null;
      var v = wa();
      gn(aa);
      var C = Je;
      Je |= ba, Zm.current = null, Wj(e, r), uy(), s1(e, r, i), oD(e.containerInfo), e.current = r, bS(i), u1(r, e, i), yS(), XE(), Je = C, gn(v), jn.transition = h;
    } else
      e.current = r, uy();
    var D = Gi;
    if (Gi ? (Gi = !1, ri = e, $s = i) : (Xl = 0, rd = null), l = e.pendingLanes, l === X && (Ql = null), D || EN(e.current, !1), rS(r.stateNode, a), Ta && e.memoizedUpdaters.clear(), T1(), Zn(e, mn()), t !== null)
      for (var V = e.onRecoverableError, L = 0; L < t.length; L++) {
        var H = t[L], fe = H.stack, Ce = H.digest;
        V(H.value, {
          componentStack: fe,
          digest: Ce
        });
      }
    if (nd) {
      nd = !1;
      var Se = ah;
      throw ah = null, Se;
    }
    return na($s, Le) && e.tag !== Wr && _r(), l = e.pendingLanes, na(l, Le) ? (ej(), e === lh ? Is++ : (Is = 0, lh = e)) : Is = 0, Kr(), Av(), null;
  }
  function _r() {
    if (ri !== null) {
      var e = Qv($s), t = IS(yr, e), n = jn.transition, a = wa();
      try {
        return jn.transition = null, gn(t), X1();
      } finally {
        gn(a), jn.transition = n;
      }
    }
    return !1;
  }
  function Q1(e) {
    rh.push(e), Gi || (Gi = !0, hh(Ti, function() {
      return _r(), null;
    }));
  }
  function X1() {
    if (ri === null)
      return !1;
    var e = ih;
    ih = null;
    var t = ri, n = $s;
    if (ri = null, $s = X, (Je & (Tn | ba)) !== sn)
      throw new Error("Cannot flush passive effects while already rendering.");
    oh = !0, ad = !1, NS(n);
    var a = Je;
    Je |= ba, v1(t.current), f1(t, t.current, n, e);
    {
      var r = rh;
      rh = [];
      for (var i = 0; i < r.length; i++) {
        var l = r[i];
        Jj(t, l);
      }
    }
    xS(), EN(t.current, !0), Je = a, Kr(), ad ? t === rd ? Xl++ : (Xl = 0, rd = t) : Xl = 0, oh = !1, ad = !1, iS(t);
    {
      var u = t.current.stateNode;
      u.effectDuration = 0, u.passiveEffectDuration = 0;
    }
    return !0;
  }
  function yN(e) {
    return Ql !== null && Ql.has(e);
  }
  function J1(e) {
    Ql === null ? Ql = /* @__PURE__ */ new Set([e]) : Ql.add(e);
  }
  function Z1(e) {
    nd || (nd = !0, ah = e);
  }
  var eT = Z1;
  function NN(e, t, n) {
    var a = Ii(n, t), r = gy(e, a, Le), i = Xr(e, r, Le), l = In();
    i !== null && (Fo(i, Le, l), Zn(i, l));
  }
  function Nt(e, t, n) {
    if (Yj(n), Ws(!1), e.tag === x) {
      NN(e, e, n);
      return;
    }
    var a = null;
    for (a = t; a !== null; ) {
      if (a.tag === x) {
        NN(a, e, n);
        return;
      } else if (a.tag === j) {
        var r = a.type, i = a.stateNode;
        if (typeof r.getDerivedStateFromError == "function" || typeof i.componentDidCatch == "function" && !yN(i)) {
          var l = Ii(n, e), u = Mm(a, l, Le), c = Xr(a, u, Le), h = In();
          c !== null && (Fo(c, Le, h), Zn(c, h));
          return;
        }
      }
      a = a.return;
    }
    d(`Internal React error: Attempted to capture a commit phase error inside a detached tree. This indicates a bug in React. Likely causes include deleting the same fiber more than once, committing an already-finished tree, or an inconsistent return pointer.

Error message:

%s`, n);
  }
  function tT(e, t, n) {
    var a = e.pingCache;
    a !== null && a.delete(t);
    var r = In();
    qv(e, n), cT(e), $n === e && xl(un, n) && (cn === Fs || cn === Zc && Bv(un) && mn() - nh < lN ? Wi(e, X) : td = Ye(td, n)), Zn(e, r);
  }
  function xN(e, t) {
    t === vn && (t = L1(e));
    var n = In(), a = Qn(e, t);
    a !== null && (Fo(a, t, n), Zn(a, n));
  }
  function nT(e) {
    var t = e.memoizedState, n = vn;
    t !== null && (n = t.retryLane), xN(e, n);
  }
  function aT(e, t) {
    var n = vn, a;
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
    a !== null && a.delete(t), xN(e, n);
  }
  function rT(e) {
    return e < 120 ? 120 : e < 480 ? 480 : e < 1080 ? 1080 : e < 1920 ? 1920 : e < 3e3 ? 3e3 : e < 4320 ? 4320 : O1(e / 1960) * 1960;
  }
  function iT() {
    if (Is > V1)
      throw Is = 0, lh = null, new Error("Maximum update depth exceeded. This can happen when a component repeatedly calls setState inside componentWillUpdate or componentDidUpdate. React limits the number of nested updates to prevent infinite loops.");
    Xl > A1 && (Xl = 0, rd = null, d("Maximum update depth exceeded. This can happen when a component calls setState inside useEffect, but useEffect either doesn't have a dependency array, or one of the dependencies changes on every render."));
  }
  function lT() {
    Ma.flushLegacyContextWarning(), Ma.flushPendingUnsafeLifecycleWarnings();
  }
  function EN(e, t) {
    Mt(e), ud(e, zr, D1), t && ud(e, Zd, C1), ud(e, zr, S1), t && ud(e, Zd, R1), pn();
  }
  function ud(e, t, n) {
    for (var a = e, r = null; a !== null; ) {
      var i = a.subtreeFlags & t;
      a !== r && a.child !== null && i !== Oe ? a = a.child : ((a.flags & t) !== Oe && n(a), a.sibling !== null ? a = a.sibling : a = r = a.return);
    }
  }
  var cd = null;
  function SN(e) {
    {
      if ((Je & Tn) !== sn || !(e.mode & Xe))
        return;
      var t = e.tag;
      if (t !== M && t !== x && t !== j && t !== R && t !== P && t !== F && t !== U)
        return;
      var n = ze(e) || "ReactComponent";
      if (cd !== null) {
        if (cd.has(n))
          return;
        cd.add(n);
      } else
        cd = /* @__PURE__ */ new Set([n]);
      var a = Fn;
      try {
        Mt(e), d("Can't perform a React state update on a component that hasn't mounted yet. This indicates that you have a side-effect in your render function that asynchronously later calls tries to update the component. Move this work to useEffect instead.");
      } finally {
        a ? Mt(e) : pn();
      }
    }
  }
  var fh;
  {
    var oT = null;
    fh = function(e, t, n) {
      var a = ON(oT, t);
      try {
        return ky(e, t, n);
      } catch (i) {
        if (yC() || i !== null && typeof i == "object" && typeof i.then == "function")
          throw i;
        if (gc(), Fb(), By(e, t), ON(t, a), t.mode & ht && mm(t), Gd(null, ky, null, e, t, n), HE()) {
          var r = Wd();
          typeof r == "object" && r !== null && r._suppressLogging && typeof i == "object" && i !== null && !i._suppressLogging && (i._suppressLogging = !0);
        }
        throw i;
      }
    };
  }
  var RN = !1, ph;
  ph = /* @__PURE__ */ new Set();
  function sT(e) {
    if (yi && !XC())
      switch (e.tag) {
        case R:
        case P:
        case U: {
          var t = Ut && ze(Ut) || "Unknown", n = t;
          if (!ph.has(n)) {
            ph.add(n);
            var a = ze(e) || "Unknown";
            d("Cannot update a component (`%s`) while rendering a different component (`%s`). To locate the bad setState() call inside `%s`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render", a, t, t);
          }
          break;
        }
        case j: {
          RN || (d("Cannot update during an existing state transition (such as within `render`). Render methods should be a pure function of props and state."), RN = !0);
          break;
        }
      }
  }
  function Gs(e, t) {
    if (Ta) {
      var n = e.memoizedUpdaters;
      n.forEach(function(a) {
        Gv(e, a, t);
      });
    }
  }
  var mh = {};
  function hh(e, t) {
    {
      var n = Pa.current;
      return n !== null ? (n.push(t), mh) : Vv(e, t);
    }
  }
  function DN(e) {
    if (e !== mh)
      return KE(e);
  }
  function CN() {
    return Pa.current !== null;
  }
  function uT(e) {
    {
      if (e.mode & Xe) {
        if (!aN())
          return;
      } else if (!_1() || Je !== sn || e.tag !== R && e.tag !== P && e.tag !== U)
        return;
      if (Pa.current === null) {
        var t = Fn;
        try {
          Mt(e), d(`An update to %s inside a test was not wrapped in act(...).

When testing, code that causes React state updates should be wrapped into act(...):

act(() => {
  /* fire events that update state */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`, ze(e));
        } finally {
          t ? Mt(e) : pn();
        }
      }
    }
  }
  function cT(e) {
    e.tag !== Wr && aN() && Pa.current === null && d(`A suspended resource finished loading inside a test, but the event was not wrapped in act(...).

When testing, code that resolves suspended data should be wrapped into act(...):

act(() => {
  /* finish loading suspended data */
});
/* assert on the output */

This ensures that you're testing the behavior the user would see in the browser. Learn more at https://reactjs.org/link/wrap-tests-with-act`);
  }
  function Ws(e) {
    uN = e;
  }
  var ya = null, Jl = null, dT = function(e) {
    ya = e;
  };
  function Zl(e) {
    {
      if (ya === null)
        return e;
      var t = ya(e);
      return t === void 0 ? e : t.current;
    }
  }
  function vh(e) {
    return Zl(e);
  }
  function gh(e) {
    {
      if (ya === null)
        return e;
      var t = ya(e);
      if (t === void 0) {
        if (e != null && typeof e.render == "function") {
          var n = Zl(e.render);
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
  function jN(e, t) {
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
          (typeof a == "function" || i === je) && (r = !0);
          break;
        }
        case P: {
          (i === De || i === je) && (r = !0);
          break;
        }
        case F:
        case U: {
          (i === Ie || i === je) && (r = !0);
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
  function TN(e) {
    {
      if (ya === null || typeof WeakSet != "function")
        return;
      Jl === null && (Jl = /* @__PURE__ */ new WeakSet()), Jl.add(e);
    }
  }
  var fT = function(e, t) {
    {
      if (ya === null)
        return;
      var n = t.staleFamilies, a = t.updatedFamilies;
      _r(), wr(function() {
        bh(e.current, a, n);
      });
    }
  }, pT = function(e, t) {
    {
      if (e.context !== la)
        return;
      _r(), wr(function() {
        Ks(t, e, null, null);
      });
    }
  };
  function bh(e, t, n) {
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
      if (Jl !== null && (Jl.has(e) || a !== null && Jl.has(a)) && (v = !0), v && (e._debugNeedsRemount = !0), v || h) {
        var D = Qn(e, Le);
        D !== null && dn(D, e, Le, Rt);
      }
      r !== null && !v && bh(r, t, n), i !== null && bh(i, t, n);
    }
  }
  var mT = function(e, t) {
    {
      var n = /* @__PURE__ */ new Set(), a = new Set(t.map(function(r) {
        return r.current;
      }));
      return yh(e.current, a, n), n;
    }
  };
  function yh(e, t, n) {
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
      u !== null && t.has(u) && (c = !0), c ? hT(e, n) : a !== null && yh(a, t, n), r !== null && yh(r, t, n);
    }
  }
  function hT(e, t) {
    {
      var n = vT(e, t);
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
  function vT(e, t) {
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
  var Nh;
  {
    Nh = !1;
    try {
      var wN = Object.preventExtensions({});
    } catch {
      Nh = !0;
    }
  }
  function gT(e, t, n, a) {
    this.tag = e, this.key = n, this.elementType = null, this.type = null, this.stateNode = null, this.return = null, this.child = null, this.sibling = null, this.index = 0, this.ref = null, this.pendingProps = t, this.memoizedProps = null, this.updateQueue = null, this.memoizedState = null, this.dependencies = null, this.mode = a, this.flags = Oe, this.subtreeFlags = Oe, this.deletions = null, this.lanes = X, this.childLanes = X, this.alternate = null, this.actualDuration = Number.NaN, this.actualStartTime = Number.NaN, this.selfBaseDuration = Number.NaN, this.treeBaseDuration = Number.NaN, this.actualDuration = 0, this.actualStartTime = -1, this.selfBaseDuration = 0, this.treeBaseDuration = 0, this._debugSource = null, this._debugOwner = null, this._debugNeedsRemount = !1, this._debugHookTypes = null, !Nh && typeof Object.preventExtensions == "function" && Object.preventExtensions(this);
  }
  var oa = function(e, t, n, a) {
    return new gT(e, t, n, a);
  };
  function xh(e) {
    var t = e.prototype;
    return !!(t && t.isReactComponent);
  }
  function bT(e) {
    return typeof e == "function" && !xh(e) && e.defaultProps === void 0;
  }
  function yT(e) {
    if (typeof e == "function")
      return xh(e) ? j : R;
    if (e != null) {
      var t = e.$$typeof;
      if (t === De)
        return P;
      if (t === Ie)
        return F;
    }
    return M;
  }
  function Qi(e, t) {
    var n = e.alternate;
    n === null ? (n = oa(e.tag, t, e.key, e.mode), n.elementType = e.elementType, n.type = e.type, n.stateNode = e.stateNode, n._debugSource = e._debugSource, n._debugOwner = e._debugOwner, n._debugHookTypes = e._debugHookTypes, n.alternate = e, e.alternate = n) : (n.pendingProps = t, n.type = e.type, n.flags = Oe, n.subtreeFlags = Oe, n.deletions = null, n.actualDuration = 0, n.actualStartTime = -1), n.flags = e.flags & vr, n.childLanes = e.childLanes, n.lanes = e.lanes, n.child = e.child, n.memoizedProps = e.memoizedProps, n.memoizedState = e.memoizedState, n.updateQueue = e.updateQueue;
    var a = e.dependencies;
    switch (n.dependencies = a === null ? null : {
      lanes: a.lanes,
      firstContext: a.firstContext
    }, n.sibling = e.sibling, n.index = e.index, n.ref = e.ref, n.selfBaseDuration = e.selfBaseDuration, n.treeBaseDuration = e.treeBaseDuration, n._debugNeedsRemount = e._debugNeedsRemount, n.tag) {
      case M:
      case R:
      case U:
        n.type = Zl(e.type);
        break;
      case j:
        n.type = vh(e.type);
        break;
      case P:
        n.type = gh(e.type);
        break;
    }
    return n;
  }
  function NT(e, t) {
    e.flags &= vr | Wt;
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
  function xT(e, t, n) {
    var a;
    return e === oc ? (a = Xe, t === !0 && (a |= Pt, a |= Wa)) : a = Te, Ta && (a |= ht), oa(x, null, null, a);
  }
  function Eh(e, t, n, a, r, i) {
    var l = M, u = e;
    if (typeof e == "function")
      xh(e) ? (l = j, u = vh(u)) : u = Zl(u);
    else if (typeof e == "string")
      l = k;
    else
      e: switch (e) {
        case Ia:
          return oi(n.children, r, i, t);
        case pi:
          l = le, r |= Pt, (r & Xe) !== Te && (r |= Wa);
          break;
        case E:
          return ET(n, r, i, t);
        case Ke:
          return ST(n, r, i, t);
        case Ae:
          return RT(n, r, i, t);
        case wt:
          return _N(n, r, i, t);
        case _n:
        case tn:
        case Ya:
        case Da:
        case Tt:
        default: {
          if (typeof e == "object" && e !== null)
            switch (e.$$typeof) {
              case Z:
                l = G;
                break e;
              case de:
                l = oe;
                break e;
              case De:
                l = P, u = gh(u);
                break e;
              case Ie:
                l = F;
                break e;
              case je:
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
    var v = oa(l, n, t, r);
    return v.elementType = e, v.type = u, v.lanes = i, v._debugOwner = a, v;
  }
  function Sh(e, t, n) {
    var a = null;
    a = e._owner;
    var r = e.type, i = e.key, l = e.props, u = Eh(r, i, l, a, t, n);
    return u._debugSource = e._source, u._debugOwner = e._owner, u;
  }
  function oi(e, t, n, a) {
    var r = oa(pe, e, a, t);
    return r.lanes = n, r;
  }
  function ET(e, t, n, a) {
    typeof e.id != "string" && d('Profiler must specify an "id" of type `string` as a prop. Received the type `%s` instead.', typeof e.id);
    var r = oa($, e, a, t | ht);
    return r.elementType = E, r.lanes = n, r.stateNode = {
      effectDuration: 0,
      passiveEffectDuration: 0
    }, r;
  }
  function ST(e, t, n, a) {
    var r = oa(te, e, a, t);
    return r.elementType = Ke, r.lanes = n, r;
  }
  function RT(e, t, n, a) {
    var r = oa(ie, e, a, t);
    return r.elementType = Ae, r.lanes = n, r;
  }
  function _N(e, t, n, a) {
    var r = oa(q, e, a, t);
    r.elementType = wt, r.lanes = n;
    var i = {
      isHidden: !1
    };
    return r.stateNode = i, r;
  }
  function Rh(e, t, n) {
    var a = oa(ee, e, null, t);
    return a.lanes = n, a;
  }
  function DT() {
    var e = oa(k, null, null, Te);
    return e.elementType = "DELETED", e;
  }
  function CT(e) {
    var t = oa(K, null, null, Te);
    return t.stateNode = e, t;
  }
  function Dh(e, t, n) {
    var a = e.children !== null ? e.children : [], r = oa(T, a, e.key, t);
    return r.lanes = n, r.stateNode = {
      containerInfo: e.containerInfo,
      pendingChildren: null,
      // Used by persistent updates
      implementation: e.implementation
    }, r;
  }
  function ON(e, t) {
    return e === null && (e = oa(M, null, null, Te)), e.tag = t.tag, e.key = t.key, e.elementType = t.elementType, e.type = t.type, e.stateNode = t.stateNode, e.return = t.return, e.child = t.child, e.sibling = t.sibling, e.index = t.index, e.ref = t.ref, e.pendingProps = t.pendingProps, e.memoizedProps = t.memoizedProps, e.updateQueue = t.updateQueue, e.memoizedState = t.memoizedState, e.dependencies = t.dependencies, e.mode = t.mode, e.flags = t.flags, e.subtreeFlags = t.subtreeFlags, e.deletions = t.deletions, e.lanes = t.lanes, e.childLanes = t.childLanes, e.alternate = t.alternate, e.actualDuration = t.actualDuration, e.actualStartTime = t.actualStartTime, e.selfBaseDuration = t.selfBaseDuration, e.treeBaseDuration = t.treeBaseDuration, e._debugSource = t._debugSource, e._debugOwner = t._debugOwner, e._debugNeedsRemount = t._debugNeedsRemount, e._debugHookTypes = t._debugHookTypes, e;
  }
  function jT(e, t, n, a, r) {
    this.tag = t, this.containerInfo = e, this.pendingChildren = null, this.current = null, this.pingCache = null, this.finishedWork = null, this.timeoutHandle = lp, this.context = null, this.pendingContext = null, this.callbackNode = null, this.callbackPriority = vn, this.eventTimes = wf(X), this.expirationTimes = wf(Rt), this.pendingLanes = X, this.suspendedLanes = X, this.pingedLanes = X, this.expiredLanes = X, this.mutableReadLanes = X, this.finishedLanes = X, this.entangledLanes = X, this.entanglements = wf(X), this.identifierPrefix = a, this.onRecoverableError = r, this.mutableSourceEagerHydrationData = null, this.effectDuration = 0, this.passiveEffectDuration = 0;
    {
      this.memoizedUpdaters = /* @__PURE__ */ new Set();
      for (var i = this.pendingUpdatersLaneMap = [], l = 0; l < lf; l++)
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
  function MN(e, t, n, a, r, i, l, u, c, h) {
    var v = new jT(e, t, n, u, c), C = xT(t, i);
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
    return Fp(C), v;
  }
  var Ch = "18.3.1";
  function TT(e, t, n) {
    var a = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : null;
    return pt(a), {
      // This tag allow us to uniquely identify this as a React Portal
      $$typeof: ea,
      key: a == null ? null : "" + a,
      children: e,
      containerInfo: t,
      implementation: n
    };
  }
  var jh, Th;
  jh = !1, Th = {};
  function VN(e) {
    if (!e)
      return la;
    var t = fl(e), n = cC(t);
    if (t.tag === j) {
      var a = t.type;
      if (Xa(a))
        return lb(t, a, n);
    }
    return n;
  }
  function wT(e, t) {
    {
      var n = fl(e);
      if (n === void 0) {
        if (typeof e.render == "function")
          throw new Error("Unable to find node on an unmounted component.");
        var a = Object.keys(e).join(",");
        throw new Error("Argument appears to not be a ReactComponent. Keys: " + a);
      }
      var r = _v(n);
      if (r === null)
        return null;
      if (r.mode & Pt) {
        var i = ze(n) || "Component";
        if (!Th[i]) {
          Th[i] = !0;
          var l = Fn;
          try {
            Mt(r), n.mode & Pt ? d("%s is deprecated in StrictMode. %s was passed an instance of %s which is inside StrictMode. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", t, t, i) : d("%s is deprecated in StrictMode. %s was passed an instance of %s which renders StrictMode children. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node", t, t, i);
          } finally {
            l ? Mt(l) : pn();
          }
        }
      }
      return r.stateNode;
    }
  }
  function AN(e, t, n, a, r, i, l, u) {
    var c = !1, h = null;
    return MN(e, t, c, h, n, a, r, i, l);
  }
  function LN(e, t, n, a, r, i, l, u, c, h) {
    var v = !0, C = MN(n, a, v, e, r, i, l, u, c);
    C.context = VN(null);
    var D = C.current, V = In(), L = ii(D), H = Dr(V, L);
    return H.callback = t ?? null, Xr(D, H, L), k1(C, L, V), C;
  }
  function Ks(e, t, n, a) {
    aS(t, e);
    var r = t.current, i = In(), l = ii(r);
    SS(l);
    var u = VN(n);
    t.context === null ? t.context = u : t.pendingContext = u, yi && Fn !== null && !jh && (jh = !0, d(`Render methods should be a pure function of props and state; triggering nested component updates from render is not allowed. If necessary, trigger nested updates in componentDidUpdate.

Check the render method of %s.`, ze(Fn) || "Unknown"));
    var c = Dr(i, l);
    c.payload = {
      element: e
    }, a = a === void 0 ? null : a, a !== null && (typeof a != "function" && d("render(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", a), c.callback = a);
    var h = Xr(r, c, l);
    return h !== null && (dn(h, r, l, i), Ec(h, r, l)), l;
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
  function _T(e) {
    switch (e.tag) {
      case x: {
        var t = e.stateNode;
        if (Ou(t)) {
          var n = MS(t);
          P1(t, n);
        }
        break;
      }
      case te: {
        wr(function() {
          var r = Qn(e, Le);
          if (r !== null) {
            var i = In();
            dn(r, e, Le, i);
          }
        });
        var a = Le;
        wh(e, a);
        break;
      }
    }
  }
  function kN(e, t) {
    var n = e.memoizedState;
    n !== null && n.dehydrated !== null && (n.retryLane = FS(n.retryLane, t));
  }
  function wh(e, t) {
    kN(e, t);
    var n = e.alternate;
    n && kN(n, t);
  }
  function OT(e) {
    if (e.tag === te) {
      var t = Ao, n = Qn(e, t);
      if (n !== null) {
        var a = In();
        dn(n, e, t, a);
      }
      wh(e, t);
    }
  }
  function MT(e) {
    if (e.tag === te) {
      var t = ii(e), n = Qn(e, t);
      if (n !== null) {
        var a = In();
        dn(n, e, t, a);
      }
      wh(e, t);
    }
  }
  function UN(e) {
    var t = WE(e);
    return t === null ? null : t.stateNode;
  }
  var FN = function(e) {
    return null;
  };
  function VT(e) {
    return FN(e);
  }
  var zN = function(e) {
    return !1;
  };
  function AT(e) {
    return zN(e);
  }
  var PN = null, HN = null, BN = null, $N = null, IN = null, YN = null, qN = null, GN = null, WN = null;
  {
    var KN = function(e, t, n) {
      var a = t[n], r = Ge(e) ? e.slice() : qe({}, e);
      return n + 1 === t.length ? (Ge(r) ? r.splice(a, 1) : delete r[a], r) : (r[a] = KN(e[a], t, n + 1), r);
    }, QN = function(e, t) {
      return KN(e, t, 0);
    }, XN = function(e, t, n, a) {
      var r = t[a], i = Ge(e) ? e.slice() : qe({}, e);
      if (a + 1 === t.length) {
        var l = n[a];
        i[l] = i[r], Ge(i) ? i.splice(r, 1) : delete i[r];
      } else
        i[r] = XN(
          // $FlowFixMe number or string is fine here
          e[r],
          t,
          n,
          a + 1
        );
      return i;
    }, JN = function(e, t, n) {
      if (t.length !== n.length) {
        S("copyWithRename() expects paths of the same length");
        return;
      } else
        for (var a = 0; a < n.length - 1; a++)
          if (t[a] !== n[a]) {
            S("copyWithRename() expects paths to be the same except for the deepest key");
            return;
          }
      return XN(e, t, n, 0);
    }, ZN = function(e, t, n, a) {
      if (n >= t.length)
        return a;
      var r = t[n], i = Ge(e) ? e.slice() : qe({}, e);
      return i[r] = ZN(e[r], t, n + 1, a), i;
    }, ex = function(e, t, n) {
      return ZN(e, t, 0, n);
    }, _h = function(e, t) {
      for (var n = e.memoizedState; n !== null && t > 0; )
        n = n.next, t--;
      return n;
    };
    PN = function(e, t, n, a) {
      var r = _h(e, t);
      if (r !== null) {
        var i = ex(r.memoizedState, n, a);
        r.memoizedState = i, r.baseState = i, e.memoizedProps = qe({}, e.memoizedProps);
        var l = Qn(e, Le);
        l !== null && dn(l, e, Le, Rt);
      }
    }, HN = function(e, t, n) {
      var a = _h(e, t);
      if (a !== null) {
        var r = QN(a.memoizedState, n);
        a.memoizedState = r, a.baseState = r, e.memoizedProps = qe({}, e.memoizedProps);
        var i = Qn(e, Le);
        i !== null && dn(i, e, Le, Rt);
      }
    }, BN = function(e, t, n, a) {
      var r = _h(e, t);
      if (r !== null) {
        var i = JN(r.memoizedState, n, a);
        r.memoizedState = i, r.baseState = i, e.memoizedProps = qe({}, e.memoizedProps);
        var l = Qn(e, Le);
        l !== null && dn(l, e, Le, Rt);
      }
    }, $N = function(e, t, n) {
      e.pendingProps = ex(e.memoizedProps, t, n), e.alternate && (e.alternate.pendingProps = e.pendingProps);
      var a = Qn(e, Le);
      a !== null && dn(a, e, Le, Rt);
    }, IN = function(e, t) {
      e.pendingProps = QN(e.memoizedProps, t), e.alternate && (e.alternate.pendingProps = e.pendingProps);
      var n = Qn(e, Le);
      n !== null && dn(n, e, Le, Rt);
    }, YN = function(e, t, n) {
      e.pendingProps = JN(e.memoizedProps, t, n), e.alternate && (e.alternate.pendingProps = e.pendingProps);
      var a = Qn(e, Le);
      a !== null && dn(a, e, Le, Rt);
    }, qN = function(e) {
      var t = Qn(e, Le);
      t !== null && dn(t, e, Le, Rt);
    }, GN = function(e) {
      FN = e;
    }, WN = function(e) {
      zN = e;
    };
  }
  function LT(e) {
    var t = _v(e);
    return t === null ? null : t.stateNode;
  }
  function kT(e) {
    return null;
  }
  function UT() {
    return Fn;
  }
  function FT(e) {
    var t = e.findFiberByHostInstance, n = m.ReactCurrentDispatcher;
    return nS({
      bundleType: e.bundleType,
      version: e.version,
      rendererPackageName: e.rendererPackageName,
      rendererConfig: e.rendererConfig,
      overrideHookState: PN,
      overrideHookStateDeletePath: HN,
      overrideHookStateRenamePath: BN,
      overrideProps: $N,
      overridePropsDeletePath: IN,
      overridePropsRenamePath: YN,
      setErrorHandler: GN,
      setSuspenseHandler: WN,
      scheduleUpdate: qN,
      currentDispatcherRef: n,
      findHostInstanceByFiber: LT,
      findFiberByHostInstance: t || kT,
      // React Refresh
      findHostInstancesForRefresh: mT,
      scheduleRefresh: fT,
      scheduleRoot: pT,
      setRefreshHandler: dT,
      // Enables DevTools to append owner stacks to error messages in DEV mode.
      getCurrentFiber: UT,
      // Enables DevTools to detect reconciler version rather than renderer version
      // which may not match for third party renderers.
      reconcilerVersion: Ch
    });
  }
  var tx = typeof reportError == "function" ? (
    // In modern browsers, reportError will dispatch an error event,
    // emulating an uncaught JavaScript error.
    reportError
  ) : function(e) {
    console.error(e);
  };
  function Oh(e) {
    this._internalRoot = e;
  }
  fd.prototype.render = Oh.prototype.render = function(e) {
    var t = this._internalRoot;
    if (t === null)
      throw new Error("Cannot update an unmounted root.");
    {
      typeof arguments[1] == "function" ? d("render(...): does not support the second callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().") : pd(arguments[1]) ? d("You passed a container to the second argument of root.render(...). You don't need to pass it again since you already passed it to create the root.") : typeof arguments[1] < "u" && d("You passed a second argument to root.render(...) but it only accepts one argument.");
      var n = t.containerInfo;
      if (n.nodeType !== Gt) {
        var a = UN(t.current);
        a && a.parentNode !== n && d("render(...): It looks like the React-rendered content of the root container was removed without using React. This is not supported and will cause errors. Instead, call root.unmount() to empty a root's container.");
      }
    }
    Ks(e, t, null, null);
  }, fd.prototype.unmount = Oh.prototype.unmount = function() {
    typeof arguments[0] == "function" && d("unmount(...): does not support a callback argument. To execute a side effect after rendering, declare it in a component body with useEffect().");
    var e = this._internalRoot;
    if (e !== null) {
      this._internalRoot = null;
      var t = e.containerInfo;
      pN() && d("Attempted to synchronously unmount a root while React was already rendering. React cannot finish unmounting the root until the current render has completed, which may lead to a race condition."), wr(function() {
        Ks(null, e, null, null);
      }), tb(t);
    }
  };
  function zT(e, t) {
    if (!pd(e))
      throw new Error("createRoot(...): Target container is not a DOM element.");
    nx(e);
    var n = !1, a = !1, r = "", i = tx;
    t != null && (t.hydrate ? S("hydrate through createRoot is deprecated. Use ReactDOMClient.hydrateRoot(container, <App />) instead.") : typeof t == "object" && t !== null && t.$$typeof === da && d(`You passed a JSX element to createRoot. You probably meant to call root.render instead. Example usage:

  let root = createRoot(domContainer);
  root.render(<App />);`), t.unstable_strictMode === !0 && (n = !0), t.identifierPrefix !== void 0 && (r = t.identifierPrefix), t.onRecoverableError !== void 0 && (i = t.onRecoverableError), t.transitionCallbacks !== void 0 && t.transitionCallbacks);
    var l = AN(e, oc, null, n, a, r, i);
    ec(l.current, e);
    var u = e.nodeType === Gt ? e.parentNode : e;
    return ts(u), new Oh(l);
  }
  function fd(e) {
    this._internalRoot = e;
  }
  function PT(e) {
    e && t0(e);
  }
  fd.prototype.unstable_scheduleHydration = PT;
  function HT(e, t, n) {
    if (!pd(e))
      throw new Error("hydrateRoot(...): Target container is not a DOM element.");
    nx(e), t === void 0 && d("Must provide initial children as second argument to hydrateRoot. Example usage: hydrateRoot(domContainer, <App />)");
    var a = n ?? null, r = n != null && n.hydratedSources || null, i = !1, l = !1, u = "", c = tx;
    n != null && (n.unstable_strictMode === !0 && (i = !0), n.identifierPrefix !== void 0 && (u = n.identifierPrefix), n.onRecoverableError !== void 0 && (c = n.onRecoverableError));
    var h = LN(t, null, e, oc, a, i, l, u, c);
    if (ec(h.current, e), ts(e), r)
      for (var v = 0; v < r.length; v++) {
        var C = r[v];
        YC(h, C);
      }
    return new fd(h);
  }
  function pd(e) {
    return !!(e && (e.nodeType === Wn || e.nodeType === pr || e.nodeType === kd));
  }
  function Qs(e) {
    return !!(e && (e.nodeType === Wn || e.nodeType === pr || e.nodeType === kd || e.nodeType === Gt && e.nodeValue === " react-mount-point-unstable "));
  }
  function nx(e) {
    e.nodeType === Wn && e.tagName && e.tagName.toUpperCase() === "BODY" && d("createRoot(): Creating roots directly with document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try using a container element created for your app."), fs(e) && (e._reactRootContainer ? d("You are calling ReactDOMClient.createRoot() on a container that was previously passed to ReactDOM.render(). This is not supported.") : d("You are calling ReactDOMClient.createRoot() on a container that has already been passed to createRoot() before. Instead, call root.render() on the existing root instead if you want to update it."));
  }
  var BT = m.ReactCurrentOwner, ax;
  ax = function(e) {
    if (e._reactRootContainer && e.nodeType !== Gt) {
      var t = UN(e._reactRootContainer.current);
      t && t.parentNode !== e && d("render(...): It looks like the React-rendered content of this container was removed without using React. This is not supported and will cause errors. Instead, call ReactDOM.unmountComponentAtNode to empty a container.");
    }
    var n = !!e._reactRootContainer, a = Mh(e), r = !!(a && qr(a));
    r && !n && d("render(...): Replacing React-rendered children with a new root component. If you intended to update the children of this node, you should instead have the existing children update their state and render the new components instead of calling ReactDOM.render."), e.nodeType === Wn && e.tagName && e.tagName.toUpperCase() === "BODY" && d("render(): Rendering components directly into document.body is discouraged, since its children are often manipulated by third-party scripts and browser extensions. This may lead to subtle reconciliation issues. Try rendering into a container element created for your app.");
  };
  function Mh(e) {
    return e ? e.nodeType === pr ? e.documentElement : e.firstChild : null;
  }
  function rx() {
  }
  function $T(e, t, n, a, r) {
    if (r) {
      if (typeof a == "function") {
        var i = a;
        a = function() {
          var D = dd(l);
          i.call(D);
        };
      }
      var l = LN(
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
        rx
      );
      e._reactRootContainer = l, ec(l.current, e);
      var u = e.nodeType === Gt ? e.parentNode : e;
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
      var v = AN(
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
        rx
      );
      e._reactRootContainer = v, ec(v.current, e);
      var C = e.nodeType === Gt ? e.parentNode : e;
      return ts(C), wr(function() {
        Ks(t, v, n, a);
      }), v;
    }
  }
  function IT(e, t) {
    e !== null && typeof e != "function" && d("%s(...): Expected the last optional `callback` argument to be a function. Instead received: %s.", t, e);
  }
  function md(e, t, n, a, r) {
    ax(n), IT(r === void 0 ? null : r, "render");
    var i = n._reactRootContainer, l;
    if (!i)
      l = $T(n, t, e, r, a);
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
  var ix = !1;
  function YT(e) {
    {
      ix || (ix = !0, d("findDOMNode is deprecated and will be removed in the next major release. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node"));
      var t = BT.current;
      if (t !== null && t.stateNode !== null) {
        var n = t.stateNode._warnedAboutRefsInRender;
        n || d("%s is accessing findDOMNode inside its render(). render() should be a pure function of props and state. It should never access something that requires stale data from the previous render, such as refs. Move this logic to componentDidMount and componentDidUpdate instead.", it(t.type) || "A component"), t.stateNode._warnedAboutRefsInRender = !0;
      }
    }
    return e == null ? null : e.nodeType === Wn ? e : wT(e, "findDOMNode");
  }
  function qT(e, t, n) {
    if (d("ReactDOM.hydrate is no longer supported in React 18. Use hydrateRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !Qs(t))
      throw new Error("Target container is not a DOM element.");
    {
      var a = fs(t) && t._reactRootContainer === void 0;
      a && d("You are calling ReactDOM.hydrate() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call hydrateRoot(container, element)?");
    }
    return md(null, e, t, !0, n);
  }
  function GT(e, t, n) {
    if (d("ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !Qs(t))
      throw new Error("Target container is not a DOM element.");
    {
      var a = fs(t) && t._reactRootContainer === void 0;
      a && d("You are calling ReactDOM.render() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.render(element)?");
    }
    return md(null, e, t, !1, n);
  }
  function WT(e, t, n, a) {
    if (d("ReactDOM.unstable_renderSubtreeIntoContainer() is no longer supported in React 18. Consider using a portal instead. Until you switch to the createRoot API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot"), !Qs(n))
      throw new Error("Target container is not a DOM element.");
    if (e == null || !BE(e))
      throw new Error("parentComponent must be a valid React Component");
    return md(e, t, n, !1, a);
  }
  var lx = !1;
  function KT(e) {
    if (lx || (lx = !0, d("unmountComponentAtNode is deprecated and will be removed in the next major release. Switch to the createRoot API. Learn more: https://reactjs.org/link/switch-to-createroot")), !Qs(e))
      throw new Error("unmountComponentAtNode(...): Target container is not a DOM element.");
    {
      var t = fs(e) && e._reactRootContainer === void 0;
      t && d("You are calling ReactDOM.unmountComponentAtNode() on a container that was previously passed to ReactDOMClient.createRoot(). This is not supported. Did you mean to call root.unmount()?");
    }
    if (e._reactRootContainer) {
      {
        var n = Mh(e), a = n && !qr(n);
        a && d("unmountComponentAtNode(): The node you're attempting to unmount was rendered by another copy of React.");
      }
      return wr(function() {
        md(null, null, e, !1, function() {
          e._reactRootContainer = null, tb(e);
        });
      }), !0;
    } else {
      {
        var r = Mh(e), i = !!(r && qr(r)), l = e.nodeType === Wn && Qs(e.parentNode) && !!e.parentNode._reactRootContainer;
        i && d("unmountComponentAtNode(): The node you're attempting to unmount was rendered by React and is not a top-level container. %s", l ? "You may have accidentally passed in a React root node instead of its container." : "Instead, have the parent component update its state and rerender in order to remove this component.");
      }
      return !1;
    }
  }
  YS(_T), GS(OT), WS(MT), KS(wa), QS(BS), (typeof Map != "function" || // $FlowIssue Flow incorrectly thinks Map has no prototype
  Map.prototype == null || typeof Map.prototype.forEach != "function" || typeof Set != "function" || // $FlowIssue Flow incorrectly thinks Set has no prototype
  Set.prototype == null || typeof Set.prototype.clear != "function" || typeof Set.prototype.forEach != "function") && d("React depends on Map and Set built-in types. Make sure that you load a polyfill in older browsers. https://reactjs.org/link/react-polyfills"), OE(XR), AE(uh, H1, wr);
  function QT(e, t) {
    var n = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : null;
    if (!pd(t))
      throw new Error("Target container is not a DOM element.");
    return TT(e, t, null, n);
  }
  function XT(e, t, n, a) {
    return WT(e, t, n, a);
  }
  var Vh = {
    usingClientEntryPoint: !1,
    // Keep in sync with ReactTestUtils.js.
    // This is an array for better minification.
    Events: [qr, _l, tc, gv, bv, uh]
  };
  function JT(e, t) {
    return Vh.usingClientEntryPoint || d('You are importing createRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), zT(e, t);
  }
  function ZT(e, t, n) {
    return Vh.usingClientEntryPoint || d('You are importing hydrateRoot from "react-dom" which is not supported. You should instead import it from "react-dom/client".'), HT(e, t, n);
  }
  function ew(e) {
    return pN() && d("flushSync was called from inside a lifecycle method. React cannot flush when React is already rendering. Consider moving this call to a scheduler task or micro task."), wr(e);
  }
  var tw = FT({
    findFiberByHostInstance: Li,
    bundleType: 1,
    version: Ch,
    rendererPackageName: "react-dom"
  });
  if (!tw && Zt && window.top === window.self && (navigator.userAgent.indexOf("Chrome") > -1 && navigator.userAgent.indexOf("Edge") === -1 || navigator.userAgent.indexOf("Firefox") > -1)) {
    var ox = window.location.protocol;
    /^(https?|file):$/.test(ox) && console.info("%cDownload the React DevTools for a better development experience: https://reactjs.org/link/react-devtools" + (ox === "file:" ? `
You might need to use a local HTTP server (instead of file://): https://reactjs.org/link/react-devtools-faq` : ""), "font-weight:bold");
  }
  ua.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = Vh, ua.createPortal = QT, ua.createRoot = JT, ua.findDOMNode = YT, ua.flushSync = ew, ua.hydrate = qT, ua.hydrateRoot = ZT, ua.render = GT, ua.unmountComponentAtNode = KT, ua.unstable_batchedUpdates = uh, ua.unstable_renderSubtreeIntoContainer = XT, ua.version = Ch, typeof __REACT_DEVTOOLS_GLOBAL_HOOK__ < "u" && typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop == "function" && __REACT_DEVTOOLS_GLOBAL_HOOK__.registerInternalModuleStop(new Error());
})();
Cx.exports = ua;
var uw = Cx.exports, wx, sx = uw;
{
  var ux = sx.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
  wx = function(o, f) {
    ux.usingClientEntryPoint = !0;
    try {
      return sx.createRoot(o, f);
    } finally {
      ux.usingClientEntryPoint = !1;
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
const cx = "popstate";
function cw(o) {
  o === void 0 && (o = {});
  function f(g, b) {
    let {
      pathname: S,
      search: d,
      hash: w
    } = g.location;
    return Fh(
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
  return fw(f, m, null, o);
}
function At(o, f) {
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
function dw() {
  return Math.random().toString(36).substr(2, 8);
}
function dx(o, f) {
  return {
    usr: o.state,
    key: o.key,
    idx: f
  };
}
function Fh(o, f, m, g) {
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
    key: f && f.key || g || dw()
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
function fw(o, f, m, g) {
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
    let G = Fh(pe.location, le, oe);
    j = M() + 1;
    let P = dx(G, j), $ = pe.createHref(G);
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
    let G = Fh(pe.location, le, oe);
    j = M();
    let P = dx(G, j), $ = pe.createHref(G);
    d.replaceState(P, "", $), S && R && R({
      action: w,
      location: pe.location,
      delta: 0
    });
  }
  function ee(le) {
    let oe = b.location.origin !== "null" ? b.location.origin : b.location.href, G = typeof le == "string" ? le : Zs(le);
    return G = G.replace(/ $/, "%20"), At(oe, "No window.location.(origin|href) available to create URL for href: " + G), new URL(G, oe);
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
      return b.addEventListener(cx, x), R = le, () => {
        b.removeEventListener(cx, x), R = null;
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
var fx;
(function(o) {
  o.data = "data", o.deferred = "deferred", o.redirect = "redirect", o.error = "error";
})(fx || (fx = {}));
function pw(o, f, m) {
  return m === void 0 && (m = "/"), mw(o, f, m);
}
function mw(o, f, m, g) {
  let b = typeof f == "string" ? ao(f) : f, S = ci(b.pathname || "/", m);
  if (S == null)
    return null;
  let d = _x(o);
  hw(d);
  let w = null;
  for (let R = 0; w == null && R < d.length; ++R) {
    let j = Cw(S);
    w = Rw(d[R], j);
  }
  return w;
}
function _x(o, f, m, g) {
  f === void 0 && (f = []), m === void 0 && (m = []), g === void 0 && (g = "");
  let b = (S, d, w) => {
    let R = {
      relativePath: w === void 0 ? S.path || "" : w,
      caseSensitive: S.caseSensitive === !0,
      childrenIndex: d,
      route: S
    };
    R.relativePath.startsWith("/") && (At(R.relativePath.startsWith(g), 'Absolute route path "' + R.relativePath + '" nested under path ' + ('"' + g + '" is not valid. An absolute child route path ') + "must start with the combined path of all its parent routes."), R.relativePath = R.relativePath.slice(g.length));
    let j = Vr([g, R.relativePath]), M = m.concat(R);
    S.children && S.children.length > 0 && (At(
      // Our types know better, but runtime JS may not!
      // @ts-expect-error
      S.index !== !0,
      "Index routes must not have child routes. Please remove " + ('all child routes from route path "' + j + '".')
    ), _x(S.children, f, M, j)), !(S.path == null && !S.index) && f.push({
      path: j,
      score: Ew(j, S.index),
      routesMeta: M
    });
  };
  return o.forEach((S, d) => {
    var w;
    if (S.path === "" || !((w = S.path) != null && w.includes("?")))
      b(S, d);
    else
      for (let R of Ox(S.path))
        b(S, d, R);
  }), f;
}
function Ox(o) {
  let f = o.split("/");
  if (f.length === 0) return [];
  let [m, ...g] = f, b = m.endsWith("?"), S = m.replace(/\?$/, "");
  if (g.length === 0)
    return b ? [S, ""] : [S];
  let d = Ox(g.join("/")), w = [];
  return w.push(...d.map((R) => R === "" ? S : [S, R].join("/"))), b && w.push(...d), w.map((R) => o.startsWith("/") && R === "" ? "/" : R);
}
function hw(o) {
  o.sort((f, m) => f.score !== m.score ? m.score - f.score : Sw(f.routesMeta.map((g) => g.childrenIndex), m.routesMeta.map((g) => g.childrenIndex)));
}
const vw = /^:[\w-]+$/, gw = 3, bw = 2, yw = 1, Nw = 10, xw = -2, px = (o) => o === "*";
function Ew(o, f) {
  let m = o.split("/"), g = m.length;
  return m.some(px) && (g += xw), f && (g += bw), m.filter((b) => !px(b)).reduce((b, S) => b + (vw.test(S) ? gw : S === "" ? yw : Nw), g);
}
function Sw(o, f) {
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
function Rw(o, f, m) {
  let {
    routesMeta: g
  } = o, b = {}, S = "/", d = [];
  for (let w = 0; w < g.length; ++w) {
    let R = g[w], j = w === g.length - 1, M = S === "/" ? f : f.slice(S.length) || "/", x = zh({
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
      pathnameBase: _w(Vr([S, x.pathnameBase])),
      route: T
    }), x.pathnameBase !== "/" && (S = Vr([S, x.pathnameBase]));
  }
  return d;
}
function zh(o, f) {
  typeof o == "string" && (o = {
    path: o,
    caseSensitive: !1,
    end: !0
  });
  let [m, g] = Dw(o.path, o.caseSensitive, o.end), b = f.match(m);
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
function Dw(o, f, m) {
  f === void 0 && (f = !1), m === void 0 && (m = !0), Ha(o === "*" || !o.endsWith("*") || o.endsWith("/*"), 'Route path "' + o + '" will be treated as if it were ' + ('"' + o.replace(/\*$/, "/*") + '" because the `*` character must ') + "always follow a `/` in the pattern. To get rid of this warning, " + ('please change the route path to "' + o.replace(/\*$/, "/*") + '".'));
  let g = [], b = "^" + o.replace(/\/*\*?$/, "").replace(/^\/*/, "/").replace(/[\\.*+^${}|()[\]]/g, "\\$&").replace(/\/:([\w-]+)(\?)?/g, (d, w, R) => (g.push({
    paramName: w,
    isOptional: R != null
  }), R ? "/?([^\\/]+)?" : "/([^\\/]+)"));
  return o.endsWith("*") ? (g.push({
    paramName: "*"
  }), b += o === "*" || o === "/*" ? "(.*)$" : "(?:\\/(.+)|\\/*)$") : m ? b += "\\/*$" : o !== "" && o !== "/" && (b += "(?:(?=\\/|$))"), [new RegExp(b, f ? void 0 : "i"), g];
}
function Cw(o) {
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
function jw(o, f) {
  f === void 0 && (f = "/");
  let {
    pathname: m,
    search: g = "",
    hash: b = ""
  } = typeof o == "string" ? ao(o) : o;
  return {
    pathname: m ? m.startsWith("/") ? m : Tw(m, f) : f,
    search: Ow(g),
    hash: Mw(b)
  };
}
function Tw(o, f) {
  let m = f.replace(/\/+$/, "").split("/");
  return o.split("/").forEach((b) => {
    b === ".." ? m.length > 1 && m.pop() : b !== "." && m.push(b);
  }), m.length > 1 ? m.join("/") : "/";
}
function Ah(o, f, m, g) {
  return "Cannot include a '" + o + "' character in a manually specified " + ("`to." + f + "` field [" + JSON.stringify(g) + "].  Please separate it out to the ") + ("`to." + m + "` field. Alternatively you may provide the full path as ") + 'a string in <Link to="..."> and the router will parse it for you.';
}
function ww(o) {
  return o.filter((f, m) => m === 0 || f.route.path && f.route.path.length > 0);
}
function qh(o, f) {
  let m = ww(o);
  return f ? m.map((g, b) => b === m.length - 1 ? g.pathname : g.pathnameBase) : m.map((g) => g.pathnameBase);
}
function Gh(o, f, m, g) {
  g === void 0 && (g = !1);
  let b;
  typeof o == "string" ? b = ao(o) : (b = Js({}, o), At(!b.pathname || !b.pathname.includes("?"), Ah("?", "pathname", "search", b)), At(!b.pathname || !b.pathname.includes("#"), Ah("#", "pathname", "hash", b)), At(!b.search || !b.search.includes("#"), Ah("#", "search", "hash", b)));
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
  let R = jw(b, w), j = d && d !== "/" && d.endsWith("/"), M = (S || d === ".") && m.endsWith("/");
  return !R.pathname.endsWith("/") && (j || M) && (R.pathname += "/"), R;
}
const Vr = (o) => o.join("/").replace(/\/\/+/g, "/"), _w = (o) => o.replace(/\/+$/, "").replace(/^\/*/, "/"), Ow = (o) => !o || o === "?" ? "" : o.startsWith("?") ? o : "?" + o, Mw = (o) => !o || o === "#" ? "" : o.startsWith("#") ? o : "#" + o;
function Vw(o) {
  return o != null && typeof o.status == "number" && typeof o.statusText == "string" && typeof o.internal == "boolean" && "data" in o;
}
const Mx = ["post", "put", "patch", "delete"];
new Set(Mx);
const Aw = ["get", ...Mx];
new Set(Aw);
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
const Wh = /* @__PURE__ */ y.createContext(null);
Wh.displayName = "DataRouterState";
const Lw = /* @__PURE__ */ y.createContext(null);
Lw.displayName = "Await";
const xa = /* @__PURE__ */ y.createContext(null);
xa.displayName = "Navigation";
const au = /* @__PURE__ */ y.createContext(null);
au.displayName = "Location";
const $a = /* @__PURE__ */ y.createContext({
  outlet: null,
  matches: [],
  isDataRoute: !1
});
$a.displayName = "Route";
const Kh = /* @__PURE__ */ y.createContext(null);
Kh.displayName = "RouteError";
function kw(o, f) {
  let {
    relative: m
  } = f === void 0 ? {} : f;
  ro() || At(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useHref() may be used only in the context of a <Router> component."
  );
  let {
    basename: g,
    navigator: b
  } = y.useContext(xa), {
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
function Xi() {
  return ro() || At(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useLocation() may be used only in the context of a <Router> component."
  ), y.useContext(au).location;
}
const Vx = "You should call navigate() in a React.useEffect(), not when your component is first rendered.";
function Ax(o) {
  y.useContext(xa).static || y.useLayoutEffect(o);
}
function Qh() {
  let {
    isDataRoute: o
  } = y.useContext($a);
  return o ? Xw() : Uw();
}
function Uw() {
  ro() || At(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useNavigate() may be used only in the context of a <Router> component."
  );
  let o = y.useContext(nu), {
    basename: f,
    future: m,
    navigator: g
  } = y.useContext(xa), {
    matches: b
  } = y.useContext($a), {
    pathname: S
  } = Xi(), d = JSON.stringify(qh(b, m.v7_relativeSplatPath)), w = y.useRef(!1);
  return Ax(() => {
    w.current = !0;
  }), y.useCallback(function(j, M) {
    if (M === void 0 && (M = {}), Ha(w.current, Vx), !w.current) return;
    if (typeof j == "number") {
      g.go(j);
      return;
    }
    let x = Gh(j, JSON.parse(d), S, M.relative === "path");
    o == null && f !== "/" && (x.pathname = x.pathname === "/" ? f : Vr([f, x.pathname])), (M.replace ? g.replace : g.push)(x, M.state, M);
  }, [f, g, d, S, o]);
}
function Fw() {
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
  } = y.useContext(xa), {
    matches: b
  } = y.useContext($a), {
    pathname: S
  } = Xi(), d = JSON.stringify(qh(b, g.v7_relativeSplatPath));
  return y.useMemo(() => Gh(o, JSON.parse(d), S, m === "path"), [o, d, S, m]);
}
function zw(o, f) {
  return Pw(o, f);
}
function Pw(o, f, m, g) {
  ro() || At(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of the
    // router loaded. We can help them understand how to avoid that.
    "useRoutes() may be used only in the context of a <Router> component."
  );
  let {
    navigator: b
  } = y.useContext(xa), {
    matches: S
  } = y.useContext($a), d = S[S.length - 1], w = d ? d.params : {}, R = d ? d.pathname : "/", j = d ? d.pathnameBase : "/", M = d && d.route;
  {
    let G = M && M.path || "";
    kx(R, !M || G.endsWith("*"), "You rendered descendant <Routes> (or called `useRoutes()`) at " + ('"' + R + '" (under <Route path="' + G + '">) but the ') + `parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

` + ('Please change the parent <Route path="' + G + '"> to <Route ') + ('path="' + (G === "/" ? "*" : G + "/*") + '">.'));
  }
  let x = Xi(), T;
  if (f) {
    var k;
    let G = typeof f == "string" ? ao(f) : f;
    j === "/" || (k = G.pathname) != null && k.startsWith(j) || At(!1, "When overriding the location using `<Routes location>` or `useRoutes(routes, location)`, the location pathname must begin with the portion of the URL pathname that was " + ('matched by all parent routes. The current pathname base is "' + j + '" ') + ('but pathname "' + G.pathname + '" was given in the `location` prop.')), T = G;
  } else
    T = x;
  let ee = T.pathname || "/", pe = ee;
  if (j !== "/") {
    let G = j.replace(/^\//, "").split("/");
    pe = "/" + ee.replace(/^\//, "").split("/").slice(G.length).join("/");
  }
  let le = pw(o, {
    pathname: pe
  });
  Ha(M || le != null, 'No routes matched location "' + T.pathname + T.search + T.hash + '" '), Ha(le == null || le[le.length - 1].route.element !== void 0 || le[le.length - 1].route.Component !== void 0 || le[le.length - 1].route.lazy !== void 0, 'Matched leaf route at location "' + T.pathname + T.search + T.hash + '" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.');
  let oe = Yw(le && le.map((G) => Object.assign({}, G, {
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
function Hw() {
  let o = Qw(), f = Vw(o) ? o.status + " " + o.statusText : o instanceof Error ? o.message : JSON.stringify(o), m = o instanceof Error ? o.stack : null, g = "rgba(200,200,200, 0.5)", b = {
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
const Bw = /* @__PURE__ */ y.createElement(Hw, null);
class $w extends y.Component {
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
    }, /* @__PURE__ */ y.createElement(Kh.Provider, {
      value: this.state.error,
      children: this.props.component
    })) : this.props.children;
  }
}
function Iw(o) {
  let {
    routeContext: f,
    match: m,
    children: g
  } = o, b = y.useContext(nu);
  return b && b.static && b.staticContext && (m.route.errorElement || m.route.ErrorBoundary) && (b.staticContext._deepestRenderedBoundaryId = m.route.id), /* @__PURE__ */ y.createElement($a.Provider, {
    value: f
  }, g);
}
function Yw(o, f, m, g) {
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
    M >= 0 || At(!1, "Could not find a matching route for errors on route IDs: " + Object.keys(w).join(",")), d = d.slice(0, Math.min(d.length, M + 1));
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
    m && (k = w && x.route.id ? w[x.route.id] : void 0, pe = x.route.errorElement || Bw, R && (j < 0 && T === 0 ? (kx("route-fallback", !1, "No `HydrateFallback` element provided to render during initial hydration"), ee = !0, le = null) : j === T && (ee = !0, le = x.route.hydrateFallbackElement || null)));
    let oe = f.concat(d.slice(0, T + 1)), G = () => {
      let P;
      return k ? P = pe : ee ? P = le : x.route.Component ? P = /* @__PURE__ */ y.createElement(x.route.Component, null) : x.route.element ? P = x.route.element : P = M, /* @__PURE__ */ y.createElement(Iw, {
        match: x,
        routeContext: {
          outlet: M,
          matches: oe,
          isDataRoute: m != null
        },
        children: P
      });
    };
    return m && (x.route.ErrorBoundary || x.route.errorElement || T === 0) ? /* @__PURE__ */ y.createElement($w, {
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
var Lx = /* @__PURE__ */ function(o) {
  return o.UseBlocker = "useBlocker", o.UseRevalidator = "useRevalidator", o.UseNavigateStable = "useNavigate", o;
}(Lx || {}), tu = /* @__PURE__ */ function(o) {
  return o.UseBlocker = "useBlocker", o.UseLoaderData = "useLoaderData", o.UseActionData = "useActionData", o.UseRouteError = "useRouteError", o.UseNavigation = "useNavigation", o.UseRouteLoaderData = "useRouteLoaderData", o.UseMatches = "useMatches", o.UseRevalidator = "useRevalidator", o.UseNavigateStable = "useNavigate", o.UseRouteId = "useRouteId", o;
}(tu || {});
function Xh(o) {
  return o + " must be used within a data router.  See https://reactrouter.com/v6/routers/picking-a-router.";
}
function qw(o) {
  let f = y.useContext(nu);
  return f || At(!1, Xh(o)), f;
}
function Gw(o) {
  let f = y.useContext(Wh);
  return f || At(!1, Xh(o)), f;
}
function Ww(o) {
  let f = y.useContext($a);
  return f || At(!1, Xh(o)), f;
}
function Jh(o) {
  let f = Ww(o), m = f.matches[f.matches.length - 1];
  return m.route.id || At(!1, o + ' can only be used on routes that contain a unique "id"'), m.route.id;
}
function Kw() {
  return Jh(tu.UseRouteId);
}
function Qw() {
  var o;
  let f = y.useContext(Kh), m = Gw(tu.UseRouteError), g = Jh(tu.UseRouteError);
  return f !== void 0 ? f : (o = m.errors) == null ? void 0 : o[g];
}
function Xw() {
  let {
    router: o
  } = qw(Lx.UseNavigateStable), f = Jh(tu.UseNavigateStable), m = y.useRef(!1);
  return Ax(() => {
    m.current = !0;
  }), y.useCallback(function(b, S) {
    S === void 0 && (S = {}), Ha(m.current, Vx), m.current && (typeof b == "number" ? o.navigate(b) : o.navigate(b, eu({
      fromRouteId: f
    }, S)));
  }, [o, f]);
}
const mx = {};
function kx(o, f, m) {
  !f && !mx[o] && (mx[o] = !0, Ha(!1, m));
}
const hx = {};
function Jw(o, f) {
  hx[f] || (hx[f] = !0, console.warn(f));
}
const vx = (o, f, m) => Jw(o, "⚠️ React Router Future Flag Warning: " + f + ". " + ("You can use the `" + o + "` future flag to opt-in early. ") + ("For more information, see " + m + "."));
function Zw(o, f) {
  (o == null ? void 0 : o.v7_startTransition) === void 0 && vx("v7_startTransition", "React Router will begin wrapping state updates in `React.startTransition` in v7", "https://reactrouter.com/v6/upgrading/future#v7_starttransition"), (o == null ? void 0 : o.v7_relativeSplatPath) === void 0 && vx("v7_relativeSplatPath", "Relative route resolution within Splat routes is changing in v7", "https://reactrouter.com/v6/upgrading/future#v7_relativesplatpath");
}
function e_(o) {
  let {
    to: f,
    replace: m,
    state: g,
    relative: b
  } = o;
  ro() || At(
    !1,
    // TODO: This error is probably because they somehow have 2 versions of
    // the router loaded. We can help them understand how to avoid that.
    "<Navigate> may be used only in the context of a <Router> component."
  );
  let {
    future: S,
    static: d
  } = y.useContext(xa);
  Ha(!d, "<Navigate> must not be used on the initial render in a <StaticRouter>. This is a no-op, but you should modify your code so the <Navigate> is only ever rendered in response to some user interaction or state change.");
  let {
    matches: w
  } = y.useContext($a), {
    pathname: R
  } = Xi(), j = Qh(), M = Gh(f, qh(w, S.v7_relativeSplatPath), R, b === "path"), x = JSON.stringify(M);
  return y.useEffect(() => j(JSON.parse(x), {
    replace: m,
    state: g,
    relative: b
  }), [j, x, b, m, g]), null;
}
function lr(o) {
  At(!1, "A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.");
}
function t_(o) {
  let {
    basename: f = "/",
    children: m = null,
    location: g,
    navigationType: b = si.Pop,
    navigator: S,
    static: d = !1,
    future: w
  } = o;
  ro() && At(!1, "You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");
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
  return Ha(pe != null, '<Router basename="' + R + '"> is not able to match the URL ' + ('"' + M + x + T + '" because it does not start with the ') + "basename, so the <Router> won't render anything."), pe == null ? null : /* @__PURE__ */ y.createElement(xa.Provider, {
    value: j
  }, /* @__PURE__ */ y.createElement(au.Provider, {
    children: m,
    value: pe
  }));
}
function n_(o) {
  let {
    children: f,
    location: m
  } = o;
  return zw(Ph(f), m);
}
new Promise(() => {
});
function Ph(o, f) {
  f === void 0 && (f = []);
  let m = [];
  return y.Children.forEach(o, (g, b) => {
    if (!/* @__PURE__ */ y.isValidElement(g))
      return;
    let S = [...f, b];
    if (g.type === y.Fragment) {
      m.push.apply(m, Ph(g.props.children, S));
      return;
    }
    g.type !== lr && At(!1, "[" + (typeof g.type == "string" ? g.type : g.type.name) + "] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>"), !g.props.index || !g.props.children || At(!1, "An index route cannot have child routes.");
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
    g.props.children && (d.children = Ph(g.props.children, S)), m.push(d);
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
function Zh(o, f) {
  if (o == null) return {};
  var m = {}, g = Object.keys(o), b, S;
  for (S = 0; S < g.length; S++)
    b = g[S], !(f.indexOf(b) >= 0) && (m[b] = o[b]);
  return m;
}
const vd = "get", gd = "application/x-www-form-urlencoded";
function Rd(o) {
  return o != null && typeof o.tagName == "string";
}
function a_(o) {
  return Rd(o) && o.tagName.toLowerCase() === "button";
}
function r_(o) {
  return Rd(o) && o.tagName.toLowerCase() === "form";
}
function i_(o) {
  return Rd(o) && o.tagName.toLowerCase() === "input";
}
function l_(o) {
  return !!(o.metaKey || o.altKey || o.ctrlKey || o.shiftKey);
}
function o_(o, f) {
  return o.button === 0 && // Ignore everything but left clicks
  (!f || f === "_self") && // Let browser handle "target=_blank" etc.
  !l_(o);
}
let hd = null;
function s_() {
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
const u_ = /* @__PURE__ */ new Set(["application/x-www-form-urlencoded", "multipart/form-data", "text/plain"]);
function Lh(o) {
  return o != null && !u_.has(o) ? (Ha(!1, '"' + o + '" is not a valid `encType` for `<Form>`/`<fetcher.Form>` ' + ('and will default to "' + gd + '"')), null) : o;
}
function c_(o, f) {
  let m, g, b, S, d;
  if (r_(o)) {
    let w = o.getAttribute("action");
    g = w ? ci(w, f) : null, m = o.getAttribute("method") || vd, b = Lh(o.getAttribute("enctype")) || gd, S = new FormData(o);
  } else if (a_(o) || i_(o) && (o.type === "submit" || o.type === "image")) {
    let w = o.form;
    if (w == null)
      throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');
    let R = o.getAttribute("formaction") || w.getAttribute("action");
    if (g = R ? ci(R, f) : null, m = o.getAttribute("formmethod") || w.getAttribute("method") || vd, b = Lh(o.getAttribute("formenctype")) || Lh(w.getAttribute("enctype")) || gd, S = new FormData(w, o), !s_()) {
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
    if (Rd(o))
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
const d_ = ["onClick", "relative", "reloadDocument", "replace", "state", "target", "to", "preventScrollReset", "viewTransition"], f_ = ["aria-current", "caseSensitive", "className", "end", "style", "to", "viewTransition", "children"], p_ = ["fetcherKey", "navigate", "reloadDocument", "replace", "state", "method", "action", "onSubmit", "relative", "preventScrollReset", "viewTransition"], m_ = "6";
try {
  window.__reactRouterVersion = m_;
} catch {
}
const Ux = /* @__PURE__ */ y.createContext({
  isTransitioning: !1
});
Ux.displayName = "ViewTransition";
const h_ = /* @__PURE__ */ y.createContext(/* @__PURE__ */ new Map());
h_.displayName = "Fetchers";
const v_ = "startTransition", gx = ow[v_];
function g_(o) {
  let {
    basename: f,
    children: m,
    future: g,
    window: b
  } = o, S = y.useRef();
  S.current == null && (S.current = cw({
    window: b,
    v5Compat: !0
  }));
  let d = S.current, [w, R] = y.useState({
    action: d.action,
    location: d.location
  }), {
    v7_startTransition: j
  } = g || {}, M = y.useCallback((x) => {
    j && gx ? gx(() => R(x)) : R(x);
  }, [R, j]);
  return y.useLayoutEffect(() => d.listen(M), [d, M]), y.useEffect(() => Zw(g), [g]), /* @__PURE__ */ y.createElement(t_, {
    basename: f,
    children: m,
    location: w.location,
    navigationType: w.action,
    navigator: d,
    future: g
  });
}
const b_ = typeof window < "u" && typeof window.document < "u" && typeof window.document.createElement < "u", y_ = /^(?:[a-z][a-z0-9+.-]*:|\/\/)/i, to = /* @__PURE__ */ y.forwardRef(function(f, m) {
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
  } = f, T = Zh(f, d_), {
    basename: k
  } = y.useContext(xa), ee, pe = !1;
  if (typeof j == "string" && y_.test(j) && (ee = j, b_))
    try {
      let P = new URL(window.location.href), $ = j.startsWith("//") ? new URL(P.protocol + j) : new URL(j), te = ci($.pathname, k);
      $.origin === P.origin && te != null ? j = te + $.search + $.hash : pe = !0;
    } catch {
      Ha(!1, '<Link to="' + j + '"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.');
    }
  let le = kw(j, {
    relative: b
  }), oe = S_(j, {
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
to.displayName = "Link";
const N_ = /* @__PURE__ */ y.forwardRef(function(f, m) {
  let {
    "aria-current": g = "page",
    caseSensitive: b = !1,
    className: S = "",
    end: d = !1,
    style: w,
    to: R,
    viewTransition: j,
    children: M
  } = f, x = Zh(f, f_), T = ru(R, {
    relative: x.relative
  }), k = Xi(), ee = y.useContext(Wh), {
    navigator: pe,
    basename: le
  } = y.useContext(xa), oe = ee != null && // Conditional usage is OK here because the usage of a data router is static
  // eslint-disable-next-line react-hooks/rules-of-hooks
  w_(T) && j === !0, G = pe.encodeLocation ? pe.encodeLocation(T).pathname : T.pathname, P = k.pathname, $ = ee && ee.navigation && ee.navigation.location ? ee.navigation.location.pathname : null;
  b || (P = P.toLowerCase(), $ = $ ? $.toLowerCase() : null, G = G.toLowerCase()), $ && le && ($ = ci($, le) || $);
  const te = G !== "/" && G.endsWith("/") ? G.length - 1 : G.length;
  let F = P === G || !d && P.startsWith(G) && P.charAt(te) === "/", U = $ != null && ($ === G || !d && $.startsWith(G) && $.charAt(G.length) === "/"), re = {
    isActive: F,
    isPending: U,
    isTransitioning: oe
  }, J = F ? g : void 0, K;
  typeof S == "function" ? K = S(re) : K = [S, F ? "active" : null, U ? "pending" : null, oe ? "transitioning" : null].filter(Boolean).join(" ");
  let ie = typeof w == "function" ? w(re) : w;
  return /* @__PURE__ */ y.createElement(to, no({}, x, {
    "aria-current": J,
    className: K,
    ref: m,
    style: ie,
    to: R,
    viewTransition: j
  }), typeof M == "function" ? M(re) : M);
});
N_.displayName = "NavLink";
const x_ = /* @__PURE__ */ y.forwardRef((o, f) => {
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
  } = o, k = Zh(o, p_), ee = j_(), pe = T_(R, {
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
x_.displayName = "Form";
var xd;
(function(o) {
  o.UseScrollRestoration = "useScrollRestoration", o.UseSubmit = "useSubmit", o.UseSubmitFetcher = "useSubmitFetcher", o.UseFetcher = "useFetcher", o.useViewTransitionState = "useViewTransitionState";
})(xd || (xd = {}));
var bx;
(function(o) {
  o.UseFetcher = "useFetcher", o.UseFetchers = "useFetchers", o.UseScrollRestoration = "useScrollRestoration";
})(bx || (bx = {}));
function E_(o) {
  return o + " must be used within a data router.  See https://reactrouter.com/v6/routers/picking-a-router.";
}
function Fx(o) {
  let f = y.useContext(nu);
  return f || At(!1, E_(o)), f;
}
function S_(o, f) {
  let {
    target: m,
    replace: g,
    state: b,
    preventScrollReset: S,
    relative: d,
    viewTransition: w
  } = f === void 0 ? {} : f, R = Qh(), j = Xi(), M = ru(o, {
    relative: d
  });
  return y.useCallback((x) => {
    if (o_(x, m)) {
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
function R_() {
  if (typeof document > "u")
    throw new Error("You are calling submit during the server render. Try calling submit within a `useEffect` or callback instead.");
}
let D_ = 0, C_ = () => "__" + String(++D_) + "__";
function j_() {
  let {
    router: o
  } = Fx(xd.UseSubmit), {
    basename: f
  } = y.useContext(xa), m = Kw();
  return y.useCallback(function(g, b) {
    b === void 0 && (b = {}), R_();
    let {
      action: S,
      method: d,
      encType: w,
      formData: R,
      body: j
    } = c_(g, f);
    if (b.navigate === !1) {
      let M = b.fetcherKey || C_();
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
function T_(o, f) {
  let {
    relative: m
  } = f === void 0 ? {} : f, {
    basename: g
  } = y.useContext(xa), b = y.useContext($a);
  b || At(!1, "useFormAction must be used inside a RouteContext");
  let [S] = b.matches.slice(-1), d = no({}, ru(o || ".", {
    relative: m
  })), w = Xi();
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
function w_(o, f) {
  f === void 0 && (f = {});
  let m = y.useContext(Ux);
  m == null && At(!1, "`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");
  let {
    basename: g
  } = Fx(xd.useViewTransitionState), b = ru(o, {
    relative: f.relative
  });
  if (!m.isTransitioning)
    return !1;
  let S = ci(m.currentLocation.pathname, g) || m.currentLocation.pathname, d = ci(m.nextLocation.pathname, g) || m.nextLocation.pathname;
  return zh(b.pathname, d) != null || zh(b.pathname, S) != null;
}
function __() {
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
      const $ = (await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js")).initializeApp(o), te = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js"), { getAuth: F, setPersistence: U, browserLocalPersistence: re, browserSessionPersistence: J, signInWithEmailAndPassword: K } = te, ie = F();
      await U(ie, d ? re : J);
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
function O_() {
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
  async function J(K) {
    K.preventDefault(), k(""), pe(""), oe(!0);
    try {
      const ie = String(m).trim(), we = String(b).trim(), q = we.replace(/\D+/g, ""), be = { fn: !ie, cn: !we };
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
      const ye = (await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-app.js")).initializeApp(o), { getAuth: Y, createUserWithEmailAndPassword: W } = await import("https://www.gstatic.com/firebasejs/10.12.5/firebase-auth.js"), ce = Y(), He = await (await W(ce, d.trim(), R)).user.getIdToken();
      if (!(await fetch("/auth/session", { method: "POST", headers: { "Content-Type": "application/json" }, credentials: "include", body: JSON.stringify({ idToken: He, profile: { fullName: ie, contactNumber: we } }) })).ok) throw new Error("Session creation failed");
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
    /* @__PURE__ */ s.jsxDEV("form", { className: "auth-form", onSubmit: J, children: [
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
function M_() {
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
  const f = Qh();
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
        /* @__PURE__ */ s.jsxDEV(to, { to: "/dashboard", onClick: (m) => {
          m.preventDefault(), f("/dashboard");
        }, children: "Dashboard" }, void 0, !1, {
          fileName: "/app/code/client/components/SiteLayout.jsx",
          lineNumber: 77,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ s.jsxDEV(to, { to: "/orders", onClick: (m) => {
          m.preventDefault(), f("/orders");
        }, children: "Orders" }, void 0, !1, {
          fileName: "/app/code/client/components/SiteLayout.jsx",
          lineNumber: 78,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ s.jsxDEV(to, { to: "/riders", onClick: (m) => {
          m.preventDefault(), f("/riders");
        }, children: "Riders" }, void 0, !1, {
          fileName: "/app/code/client/components/SiteLayout.jsx",
          lineNumber: 79,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ s.jsxDEV("span", { className: "site-nav-spacer" }, void 0, !1, {
          fileName: "/app/code/client/components/SiteLayout.jsx",
          lineNumber: 80,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ s.jsxDEV("div", { className: "nav-dropdown", children: [
          /* @__PURE__ */ s.jsxDEV("button", { id: "notifBtn", className: "icon-btn", "aria-haspopup": "true", "aria-expanded": "false", "aria-controls": "notifMenu", "aria-label": "Notifications", title: "Notifications", children: /* @__PURE__ */ s.jsxDEV("svg", { className: "bell-icon", width: "29", height: "29", viewBox: "0 0 24 24", xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true", children: [
            /* @__PURE__ */ s.jsxDEV("defs", { children: /* @__PURE__ */ s.jsxDEV("linearGradient", { id: "bellGold", x1: "0", y1: "0", x2: "0", y2: "1", children: [
              /* @__PURE__ */ s.jsxDEV("stop", { offset: "0%", stopColor: "#C08B3E" }, void 0, !1, {
                fileName: "/app/code/client/components/SiteLayout.jsx",
                lineNumber: 86,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ s.jsxDEV("stop", { offset: "50%", stopColor: "#D4AF37" }, void 0, !1, {
                fileName: "/app/code/client/components/SiteLayout.jsx",
                lineNumber: 87,
                columnNumber: 21
              }, this),
              /* @__PURE__ */ s.jsxDEV("stop", { offset: "100%", stopColor: "#FFD700" }, void 0, !1, {
                fileName: "/app/code/client/components/SiteLayout.jsx",
                lineNumber: 88,
                columnNumber: 21
              }, this)
            ] }, void 0, !0, {
              fileName: "/app/code/client/components/SiteLayout.jsx",
              lineNumber: 85,
              columnNumber: 19
            }, this) }, void 0, !1, {
              fileName: "/app/code/client/components/SiteLayout.jsx",
              lineNumber: 84,
              columnNumber: 17
            }, this),
            /* @__PURE__ */ s.jsxDEV("path", { fill: "url(#bellGold)", d: "M12 22a2 2 0 0 0 1.995-1.85L14 20h-4a2 2 0 0 0 1.85 1.995L12 22Zm8-5h-1a1 1 0 0 1-.707-.293l-.147-.147A3.99 3.99 0 0 1 17 14.172V11a5 5 0 1 0-10 0v3.172a3.99 3.99 0 0 1-1.146 2.388l-.147.147A1 1 0 0 1 5 17H4a1 1 0 1 0 0 2h16a1 1 0 1 0 0-2Z" }, void 0, !1, {
              fileName: "/app/code/client/components/SiteLayout.jsx",
              lineNumber: 91,
              columnNumber: 17
            }, this)
          ] }, void 0, !0, {
            fileName: "/app/code/client/components/SiteLayout.jsx",
            lineNumber: 83,
            columnNumber: 15
          }, this) }, void 0, !1, {
            fileName: "/app/code/client/components/SiteLayout.jsx",
            lineNumber: 82,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ s.jsxDEV("div", { id: "notifMenu", className: "dropdown-menu hidden", role: "menu", "aria-labelledby": "notifBtn", "aria-hidden": "true", children: [
            /* @__PURE__ */ s.jsxDEV("div", { className: "dropdown-header", children: "Notifications" }, void 0, !1, {
              fileName: "/app/code/client/components/SiteLayout.jsx",
              lineNumber: 95,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ s.jsxDEV("div", { className: "dropdown-item", children: "No new notifications" }, void 0, !1, {
              fileName: "/app/code/client/components/SiteLayout.jsx",
              lineNumber: 96,
              columnNumber: 15
            }, this)
          ] }, void 0, !0, {
            fileName: "/app/code/client/components/SiteLayout.jsx",
            lineNumber: 94,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/components/SiteLayout.jsx",
          lineNumber: 81,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ s.jsxDEV("div", { className: "nav-dropdown", children: [
          /* @__PURE__ */ s.jsxDEV("button", { id: "profileBtn", className: "icon-btn", "aria-haspopup": "true", "aria-expanded": "false", "aria-controls": "profileMenu", title: "Profile", children: /* @__PURE__ */ s.jsxDEV("svg", { className: "avatar", width: "28", height: "28", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [
            /* @__PURE__ */ s.jsxDEV("circle", { cx: "12", cy: "7.5", r: "3.5", stroke: "currentColor", strokeWidth: "1.5" }, void 0, !1, {
              fileName: "/app/code/client/components/SiteLayout.jsx",
              lineNumber: 102,
              columnNumber: 129
            }, this),
            /* @__PURE__ */ s.jsxDEV("path", { d: "M4 20c0-3.314 3.582-6 8-6s8 2.686 8 6", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" }, void 0, !1, {
              fileName: "/app/code/client/components/SiteLayout.jsx",
              lineNumber: 102,
              columnNumber: 203
            }, this)
          ] }, void 0, !0, {
            fileName: "/app/code/client/components/SiteLayout.jsx",
            lineNumber: 102,
            columnNumber: 15
          }, this) }, void 0, !1, {
            fileName: "/app/code/client/components/SiteLayout.jsx",
            lineNumber: 101,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ s.jsxDEV("div", { id: "profileMenu", className: "dropdown-menu hidden", role: "menu", "aria-labelledby": "profileBtn", "aria-hidden": "true", children: [
            /* @__PURE__ */ s.jsxDEV("div", { className: "dropdown-header", children: "Signed in" }, void 0, !1, {
              fileName: "/app/code/client/components/SiteLayout.jsx",
              lineNumber: 105,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ s.jsxDEV(to, { className: "dropdown-item", to: "/settings", onClick: (m) => {
              m.preventDefault(), f("/settings");
            }, children: "Settings" }, void 0, !1, {
              fileName: "/app/code/client/components/SiteLayout.jsx",
              lineNumber: 106,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ s.jsxDEV("form", { method: "POST", action: "/auth/logout", children: /* @__PURE__ */ s.jsxDEV("button", { className: "dropdown-item", type: "submit", children: "Logout" }, void 0, !1, {
              fileName: "/app/code/client/components/SiteLayout.jsx",
              lineNumber: 107,
              columnNumber: 57
            }, this) }, void 0, !1, {
              fileName: "/app/code/client/components/SiteLayout.jsx",
              lineNumber: 107,
              columnNumber: 15
            }, this)
          ] }, void 0, !0, {
            fileName: "/app/code/client/components/SiteLayout.jsx",
            lineNumber: 104,
            columnNumber: 13
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/components/SiteLayout.jsx",
          lineNumber: 100,
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
      lineNumber: 113,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ s.jsxDEV("footer", { className: "site-footer", children: [
      "© ",
      (/* @__PURE__ */ new Date()).getFullYear(),
      " FreshBasket"
    ] }, void 0, !0, {
      fileName: "/app/code/client/components/SiteLayout.jsx",
      lineNumber: 114,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ s.jsxDEV(M_, {}, void 0, !1, {
      fileName: "/app/code/client/components/SiteLayout.jsx",
      lineNumber: 115,
      columnNumber: 7
    }, this)
  ] }, void 0, !0, {
    fileName: "/app/code/client/components/SiteLayout.jsx",
    lineNumber: 73,
    columnNumber: 5
  }, this);
}
function V_({ onClose: o, onCreated: f }) {
  const [m, g] = y.useState(""), [b, S] = y.useState(""), [d, w] = y.useState(""), [R, j] = y.useState(!1), [M, x] = y.useState(""), [T, k] = y.useState(""), [ee, pe] = y.useState(!1), [le, oe] = y.useState(!1), [G, P] = y.useState(!1), [$, te] = y.useState(!1), F = "+92";
  function U(J) {
    const K = String(J || "").replace(/\D+/g, "");
    return K.length === 0 ? "" : K.startsWith("92") ? F + K.slice(2) : F + K;
  }
  U(d);
  async function re() {
    x(""), k(""), te(!0);
    const J = String(m), K = String(b).trim(), ie = String(d).trim(), we = ie.replace(/\D+/g, ""), q = { fn: !K, cn: !ie, pw: !J };
    if (pe(q.fn), oe(q.cn || we.length < 7), P(q.pw), q.fn || q.cn || q.pw) {
      x("Full name, mobile and password are required");
      return;
    }
    if (we.length !== 10) {
      x("numbers should be 10 digit"), oe(!0);
      return;
    }
    if (J.length < 6) {
      P(!0), x("Password must be at least 6 characters");
      return;
    }
    j(!0);
    try {
      const be = U(ie), ye = await fetch("/api/mobile/register", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: J, fullName: K, contactNumber: be })
      }), Y = await ye.json().catch(() => null);
      if (!ye.ok) {
        const W = String(Y && (Y.error || Y.message) || ""), ce = W.toUpperCase();
        /MISSING\s*FULLNAME\/CONTACTNUMBER/i.test(W) || /MISSING\s*PASSWORD/i.test(W) ? (x("Full name, mobile and password are required"), pe(!K), oe(!ie || we.length !== 10), P(!J)) : ce.includes("WEAK_PASSWORD") || /AT LEAST 6 CHARACTERS/i.test(W) ? (P(!0), x("Password must be at least 6 characters")) : /INVALID CONTACT NUMBER|MUST BE EXACTLY 10 DIGITS|NUMBERS SHOULD BE 10 DIGIT/i.test(W) ? (oe(!0), x("numbers should be 10 digit")) : /FIREBASE NOT CONFIGURED/i.test(W) ? x("Service temporarily unavailable. Please try again later.") : x(W || "Failed to create rider");
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
        /* @__PURE__ */ s.jsxDEV("input", { className: "field-input" + ($ && !String(b).trim() ? " input-error" : ""), value: b, onChange: (J) => {
          S(J.target.value), $ && pe(!String(J.target.value).trim());
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
        /* @__PURE__ */ s.jsxDEV("input", { className: "field-input" + ($ && !String(m) ? " input-error" : ""), type: "password", value: m, onChange: (J) => {
          g(J.target.value), $ && P(!String(J.target.value));
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
              onChange: (J) => {
                const K = J.target.value.replace(/\D+/g, "").slice(0, 10);
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
function A_({ rider: o, onClose: f, onUpdated: m }) {
  const g = y.useMemo(() => String((o == null ? void 0 : o.name) || (o == null ? void 0 : o.displayName) || ""), [o]), b = y.useMemo(() => {
    const te = String((o == null ? void 0 : o.contactNumber) || "").trim().replace(/\D+/g, "");
    return te.length >= 10 ? te.slice(-10) : te;
  }, [o]), [S, d] = y.useState(g), [w, R] = y.useState(b), [j, M] = y.useState(!1), [x, T] = y.useState(""), [k, ee] = y.useState(""), [pe, le] = y.useState(!1), oe = "+92";
  function G($) {
    const te = String($ || "").replace(/\D+/g, "");
    return te.length === 0 ? "" : te.startsWith("92") ? oe + te.slice(2) : oe + te;
  }
  Dx.useEffect(() => {
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
        const J = String(re.displayName || re.name || "").trim(), K = String(re.contactNumber || "").replace(/\D+/g, "");
        J && d(J), K && R(K.slice(-10));
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
      }), J = await re.json().catch(() => ({}));
      if (re.status === 401) {
        window.location.href = "/auth/login";
        return;
      }
      if (!re.ok) {
        T(String(J && (J.error || J.message) || "Failed to update rider"));
        return;
      }
      ee("Saved"), m && m(J.data && J.data.rider ? J.data.rider : null), setTimeout(() => {
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
const Ed = "app.settings.fares", Na = {
  baseFare: 0,
  farePerKm: 2
};
function zx() {
  if (typeof window > "u" || !window.localStorage)
    return { ...Na };
  try {
    const o = window.localStorage.getItem(Ed);
    if (!o)
      return { ...Na };
    const f = JSON.parse(o), m = Number(f == null ? void 0 : f.baseFare), g = Number(f == null ? void 0 : f.farePerKm);
    return {
      baseFare: Number.isFinite(m) ? m : Na.baseFare,
      farePerKm: Number.isFinite(g) ? g : Na.farePerKm
    };
  } catch {
    return { ...Na };
  }
}
const Px = "riderPerformancePct";
function Hx() {
  if (typeof window > "u") return null;
  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
}
function L_() {
  const o = Hx();
  if (!o) return {};
  try {
    const f = o.getItem(Px);
    if (!f) return {};
    const m = JSON.parse(f);
    if (m && typeof m == "object" && !Array.isArray(m))
      return m;
  } catch {
  }
  return {};
}
function k_(o) {
  if (!o || typeof o != "object") return;
  const f = Hx();
  if (!f) return;
  const m = Object.entries(o);
  if (m.length === 0) return;
  const g = L_();
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
      f.setItem(Px, JSON.stringify(S));
    } catch {
    }
}
function U_(o) {
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
function F_(o) {
  return !(o instanceof Date) || !Number.isFinite(o.getTime()) ? "" : `${o.getFullYear()}-${String(o.getMonth() + 1).padStart(2, "0")}`;
}
const z_ = [
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
function P_(o) {
  if (!o || typeof o != "object") return "";
  for (const f of z_) {
    const m = o[f], g = U_(m);
    if (g) return F_(g);
  }
  return "";
}
function H_(o, f) {
  if (!Array.isArray(o) || !f) return 0;
  let m = 0;
  for (const g of o)
    P_(g) === f && (m += 1);
  return m;
}
function B_() {
  const o = () => {
    const Y = /* @__PURE__ */ new Date(), W = new Date(Y.getFullYear(), Y.getMonth(), 1), ce = `${W.getFullYear()}-${String(W.getMonth() + 1).padStart(2, "0")}-${String(W.getDate()).padStart(2, "0")}`, Ve = `${Y.getFullYear()}-${String(Y.getMonth() + 1).padStart(2, "0")}-${String(Y.getDate()).padStart(2, "0")}`;
    return { from: ce, to: Ve };
  }, f = y.useMemo(() => o(), []), [m, g] = y.useState([]), [b, S] = y.useState(""), [d, w] = y.useState(!0), [R, j] = y.useState(""), [M, x] = y.useState(1), [T, k] = y.useState(20), [ee, pe] = y.useState({ total: 0, page: 1, limit: 20, pages: 1 }), [le, oe] = y.useState(!1), [G, P] = y.useState(null), [$, te] = y.useState(Na), [F, U] = y.useState(f.from), [re, J] = y.useState(f.to), [K, ie] = y.useState(/* @__PURE__ */ new Map());
  y.useEffect(() => {
    function Y() {
      te(zx());
    }
    Y();
    function W(ce) {
      ce.key === Ed && Y();
    }
    return typeof window < "u" && (window.addEventListener("storage", W), window.addEventListener("fare-settings-changed", Y)), () => {
      typeof window < "u" && (window.removeEventListener("storage", W), window.removeEventListener("fare-settings-changed", Y));
    };
  }, []), y.useEffect(() => {
    let Y = !0;
    return (async () => {
      var W, ce, Ve, He;
      w(!0), j("");
      try {
        const st = new URLSearchParams();
        b && st.set("q", b), st.set("page", String(M)), st.set("limit", String(T));
        const Pe = await fetch(`/api/riders?${st.toString()}`, { credentials: "include" });
        if (Pe.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!Pe.ok) throw new Error("Failed to load riders");
        const tt = await Pe.json();
        Y && (g(Array.isArray(tt.riders) ? tt.riders : []), pe({ total: ((W = tt.meta) == null ? void 0 : W.total) || 0, page: ((ce = tt.meta) == null ? void 0 : ce.page) || 1, limit: ((Ve = tt.meta) == null ? void 0 : Ve.limit) || T, pages: ((He = tt.meta) == null ? void 0 : He.pages) || 1 }));
      } catch (st) {
        Y && j(st.message || "Failed to load riders");
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
    const Ve = (() => {
      const Pe = typeof navigator < "u" && Number.isFinite(Number(navigator.hardwareConcurrency)) ? Number(navigator.hardwareConcurrency) : 8;
      return Math.max(2, Math.min(8, Math.floor(Pe / 2)));
    })();
    ie(/* @__PURE__ */ new Map());
    const He = m.map((Pe) => async () => {
      const tt = `${Pe.id}:${F}:${re}`;
      try {
        const dt = await fetch(`/api/riders/${Pe.id}/km-in-range?fromDate=${F}&toDate=${re}`, { credentials: "include", signal: W });
        if (dt.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!dt.ok) {
          const Qt = await dt.text().catch(() => String(dt.status));
          console.error(`km-in-range error for ${Pe.id}:`, dt.status, Qt);
          return;
        }
        const bn = await dt.json();
        if (ce || W.aborted) return;
        ie((Qt) => {
          const Lt = new Map(Qt);
          return Lt.set(tt, {
            km: bn.totalKm || 0,
            rideCount: bn.rideCount || 0,
            performancePct: bn.performancePct || 0
          }), Lt;
        });
      } catch (dt) {
        if (dt && dt.name === "AbortError") return;
        console.error(`km-in-range fetch error for ${Pe.id}:`, dt);
      }
    });
    async function st(Pe, tt) {
      let dt = 0;
      const bn = new Array(Math.min(tt, Pe.length)).fill(0).map(async () => {
        for (; !ce && !W.aborted; ) {
          const Qt = dt++;
          if (Qt >= Pe.length) break;
          await Pe[Qt]();
        }
      });
      await Promise.all(bn);
    }
    return st(He, Ve), () => {
      ce = !0, Y.abort();
    };
  }, [F, re, m]);
  const we = y.useMemo(() => m.filter((Y) => {
    if (b && !String(Y.name || "").toLowerCase().includes(b.toLowerCase().trim())) return !1;
    if (F || re) {
      const W = Number(Y.lastActiveDays ?? 0), ce = F ? new Date(F) : null, Ve = re ? new Date(re) : null;
      if (ce && Ve) {
        const He = Math.floor((Date.now() - ce.getTime()) / 864e5), st = Math.floor((Date.now() - Ve.getTime()) / (1e3 * 60 * 60 * 24));
        if (W < st || W > He) return !1;
      } else if (ce) {
        const He = Math.floor((Date.now() - ce.getTime()) / 864e5);
        if (W > He) return !1;
      } else if (Ve) {
        const He = Math.floor((Date.now() - Ve.getTime()) / 864e5);
        if (W < He) return !1;
      }
    }
    return !0;
  }), [m, b, F, re]), q = y.useMemo(() => {
    const Y = Number($.farePerKm);
    return Number.isFinite(Y) ? Y : Na.farePerKm;
  }, [$]), be = y.useMemo(() => {
    const Y = Number($.baseFare);
    return Number.isFinite(Y) ? Y : Na.baseFare;
  }, [$]);
  y.useEffect(() => {
    if (!Array.isArray(m) || m.length === 0) return;
    const Y = {};
    for (const W of m) {
      if (!W || W.id === void 0 || W.id === null) continue;
      const ce = Number(W.performancePct);
      Number.isFinite(ce) && (Y[W.id] = Math.round(ce));
    }
    Object.keys(Y).length !== 0 && k_(Y);
  }, [m]);
  const ye = y.useMemo(() => {
    const Y = /* @__PURE__ */ new Date(), W = [], ce = [];
    for (let Ve = 2; Ve >= 0; Ve--) {
      const He = new Date(Y.getFullYear(), Y.getMonth() - Ve, 1), st = `${He.getFullYear()}-${String(He.getMonth() + 1).padStart(2, "0")}`, Pe = He.toLocaleString(void 0, { month: "short", year: "numeric" });
      W.push(st), ce.push(Pe);
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
          J(Y.target.value), x(1);
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
      le && /* @__PURE__ */ s.jsxDEV(V_, { onClose: () => oe(!1), onCreated: () => {
        window.location.reload();
      } }, void 0, !1, {
        fileName: "/app/code/client/pages/Riders.jsx",
        lineNumber: 289,
        columnNumber: 13
      }, this),
      G && /* @__PURE__ */ s.jsxDEV(
        A_,
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
            const Y = ye.keys[ye.keys.length - 2], W = String(Y).split("-"), ce = parseInt(W[0], 10), Ve = parseInt(W[1], 10);
            return `Earnings (${new Date(Number.isFinite(ce) ? ce : (/* @__PURE__ */ new Date()).getFullYear(), Number.isFinite(Ve) ? Ve - 1 : (/* @__PURE__ */ new Date()).getMonth() - 1, 1).toLocaleString(void 0, { month: "short" })}, Rs)`;
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
          !d && !R && we.map((Y) => /* @__PURE__ */ s.jsxDEV("tr", { "data-rider-id": Y.id, "data-status": Y.status, "data-last-days": Y.lastActiveDays, children: [
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
                const ce = `${Y.id}:${F}:${re}`, Ve = K.get(ce);
                if (!Ve) return /* @__PURE__ */ s.jsxDEV("span", { className: "cell-loader loader-sm", "aria-busy": "true", "aria-label": "Loading range" }, void 0, !1, {
                  fileName: "/app/code/client/pages/Riders.jsx",
                  lineNumber: 327,
                  columnNumber: 42
                }, this);
                const He = (Ve == null ? void 0 : Ve.km) ?? 0;
                return `${Number(He).toFixed(2)} km`;
              }
              return `${Number(((W = Y.monthlyCounts) == null ? void 0 : W[ye.keys[ye.keys.length - 1]]) || 0).toFixed(2)} km`;
            })() }, void 0, !1, {
              fileName: "/app/code/client/pages/Riders.jsx",
              lineNumber: 323,
              columnNumber: 19
            }, this),
            (() => {
              var He, st;
              if (F && re) {
                const Pe = `${Y.id}:${F}:${re}`;
                if (!K.get(Pe)) return /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-earnings", children: /* @__PURE__ */ s.jsxDEV("span", { className: "cell-loader loader-md", "aria-busy": "true", "aria-label": "Loading earnings" }, void 0, !1, {
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
                const Pe = `${Y.id}:${F}:${re}`, tt = K.get(Pe);
                W = (tt == null ? void 0 : tt.km) ?? 0, ce = (tt == null ? void 0 : tt.rideCount) ?? 0;
              } else {
                const Pe = ye.keys[ye.keys.length - 2];
                W = Number(((He = Y.monthlyCounts) == null ? void 0 : He[Pe]) || 0);
                const tt = Array.isArray(Y.orders) ? Y.orders : [];
                ce = Number(((st = Y.monthlyRideCounts) == null ? void 0 : st[Pe]) ?? H_(tt, Pe) ?? 0);
              }
              const Ve = W * q + ce * be;
              return /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-earnings", children: Number.isFinite(Ve) ? `${Ve.toFixed(2)} Rs.` : "0 Rs." }, void 0, !1, {
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
                const Ve = (ce == null ? void 0 : ce.performancePct) ?? 0;
                return `${Number(Ve)}%`;
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
                      const Ve = await ce.text().catch(() => "");
                      alert(Ve || "Failed to delete");
                      return;
                    }
                    g((Ve) => Ve.filter((He) => String(He.id) !== String(Y.id))), pe((Ve) => ({ ...Ve, total: Math.max(0, (Ve.total || 1) - 1) }));
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
          !d && !R && we.length === 0 && /* @__PURE__ */ s.jsxDEV("tr", { children: /* @__PURE__ */ s.jsxDEV("td", { colSpan: 7, className: "section-note", children: "No riders found." }, void 0, !1, {
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
const Hh = /^(-?\d+(?:\.\d+)?)\s*(m|min|mins|minutes)$/i, yx = /^(-?\d+(?:\.\d+)?)\s*(s|sec|secs|seconds)$/i;
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
function Sd(o) {
  if (o == null || o === "") return null;
  if (typeof o == "number")
    return Number.isFinite(o) ? o : null;
  if (o instanceof Date) return null;
  if (typeof o == "string") {
    const f = o.trim();
    if (!f) return null;
    if (Hh.test(f)) return parseFloat(f.replace(Hh, "$1"));
    if (yx.test(f)) return parseFloat(f.replace(yx, "$1")) / 60;
    const m = Number(f);
    return Number.isFinite(m) ? m : null;
  }
  if (Ba(o)) {
    if (Number.isFinite(o.minutes)) return Number(o.minutes);
    if (Number.isFinite(o.expectedMinutes)) return Number(o.expectedMinutes);
    if (Number.isFinite(o.seconds)) return Number(o.seconds) / 60;
    if (o.duration !== void 0 && o.duration !== o) {
      const f = Sd(o.duration);
      if (f !== null) return f;
    }
    if (o.value !== void 0 && o.value !== o) {
      const f = Sd(o.value);
      if (f !== null) return f;
    }
  }
  return null;
}
function $_(o) {
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
    const j = Sd(R);
    if (j !== null) return j;
  }
  return null;
}
function I_(o) {
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
function Bx(o) {
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
function kh(o) {
  if (!Ba(o)) return null;
  const f = Bx(o);
  return f ?? null;
}
function bd(o) {
  if (!Ba(o)) return null;
  const f = $_(o);
  if (Number.isFinite(f)) return f;
  const m = ui(I_(o)), g = ui(Bx(o));
  if (m instanceof Date && g instanceof Date) {
    const b = m.getTime() - g.getTime();
    if (b >= 0)
      return Math.round(b / 6e4);
  }
  return null;
}
function Bh(o) {
  const f = ui(o);
  if (!(f instanceof Date) || Number.isNaN(f.getTime())) return "-";
  try {
    return f.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  } catch {
    return "-";
  }
}
function $h(o) {
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
    const g = m.match(Hh);
    return g ? `${g[1].replace(/\.0+$/, "").replace(/(\.\d*[1-9])0+$/, "$1")} min` : m;
  }
  if (Ba(o) && o.expectedMinutes !== void 0) {
    const m = Number(o.expectedMinutes);
    if (Number.isFinite(m)) return `${m} min`;
  }
  return String(o);
}
function yd(o) {
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
function Ih(o) {
  const f = Sd(o);
  if (f === null || !Number.isFinite(f)) return "-";
  const m = Math.round(f);
  if (m < 60) return `${m} min`;
  const g = Math.floor(m / 60), b = m % 60;
  return `${g}h ${b}m`;
}
function Y_() {
  var x;
  const { id: o } = Fw(), [f, m] = y.useState(null), [g, b] = y.useState(!0), [S, d] = y.useState("");
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
          const ee = T.name || T.orderId, pe = ui(T.created_at), le = pe instanceof Date && !Number.isNaN(pe.getTime()) ? pe.toISOString().slice(0, 10) : "-", oe = Bh(T.deliveryStartTime), G = yd(T), P = $h(G), $ = bd(T), te = Ih($), F = Number(T.distance_km), U = Number.isFinite(F) ? `${F.toFixed(2)} km` : typeof T.distance_km == "string" && T.distance_km.trim() ? T.distance_km : "-";
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
function $x({ orderId: o, onClose: f, onAssigned: m }) {
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
  async function J() {
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
  const K = P || "", ie = te || "", we = pe || oe;
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
    /* @__PURE__ */ s.jsxDEV("div", { className: "assign-modal-body", children: we ? /* @__PURE__ */ s.jsxDEV("div", { className: "section-note", children: "Loading…" }, void 0, !1, {
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
        /* @__PURE__ */ s.jsxDEV("button", { className: "btn-primary", onClick: J, disabled: U || !w || !j, children: U ? "Assigning…" : "Assign" }, void 0, !1, {
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
        const J = await re.json();
        if (F) {
          b(Array.isArray(J.riders) ? J.riders : []);
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
        const J = await re.json();
        if (F) {
          d(Array.isArray(J.packers) ? J.packers : []);
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
    var re, J;
    const F = ((re = o.assignment) == null ? void 0 : re.paymentMethod) || o.paymentMethod || "", U = ((J = o.assignment) == null ? void 0 : J.amount) || o.amount || "";
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
      const J = await fetch(`/api/orders/${encodeURIComponent(F)}/assign-packer`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ packerId: j, paymentMethod: x.trim(), amount: k.trim() })
      });
      if (J.status === 401) {
        window.location.href = "/auth/login";
        return;
      }
      const K = await J.json().catch(() => null);
      if (!J.ok) throw new Error(K && K.error ? K.error : "Update failed");
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
function Yh(o) {
  if (typeof o != "string") return "";
  const f = o.toLowerCase().trim().replace(/[\s-]+/g, "_");
  return f === "in_transit" ? "in_progress" : f;
}
function Ix(o) {
  return o && typeof o.current_status == "string" ? o.current_status : "";
}
function Nx(o) {
  return Yh(Ix(o));
}
const W_ = [
  { key: "all", label: "All" },
  { key: "new", label: "New" },
  { key: "assigned", label: "Assigned" },
  { key: "pending", label: "Pending" },
  { key: "in-progress", label: "In-Progress" },
  { key: "completed", label: "delivered" }
], xx = {
  completed: "delivered",
  "in-progress": "in_progress",
  "in-transit": "in_progress"
};
function K_() {
  const [o, f] = y.useState([]), [m, g] = y.useState(""), [b, S] = y.useState("all"), [d, w] = y.useState(1), [R, j] = y.useState(20), [M, x] = y.useState({ total: 0, page: 1, limit: 20, pages: 1 }), [T, k] = y.useState(!0), [ee, pe] = y.useState(""), [le, oe] = y.useState(""), [G, P] = y.useState(!0), [$, te] = y.useState(0), [F, U] = y.useState(!1), [re, J] = y.useState(null), [K, ie] = y.useState(!1), [we, q] = y.useState(null), [be, ye] = y.useState(!1), [Y, W] = y.useState(null), [ce, Ve] = y.useState(""), [He, st] = y.useState("");
  y.useEffect(() => {
    let Q = !0;
    return (async () => {
      var $e, ft, et, bt;
      k(!0), pe(""), oe("");
      try {
        const pt = new URLSearchParams();
        if (m && pt.set("q", m), b && b !== "all") {
          const It = xx[b] || b;
          pt.set("status", Yh(It));
        }
        pt.set("page", String(d)), pt.set("limit", String(R));
        const $t = await fetch(`/api/orders?${pt.toString()}`, { credentials: "include" });
        if ($t.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!$t.ok) throw new Error("Failed to load orders");
        const Dt = await $t.json();
        Q && (f(Array.isArray(Dt.orders) ? Dt.orders : []), oe(Dt.shopifyError || ""), P(!!Dt.shopifyConfigured), x({ total: (($e = Dt.meta) == null ? void 0 : $e.total) || 0, page: ((ft = Dt.meta) == null ? void 0 : ft.page) || 1, limit: ((et = Dt.meta) == null ? void 0 : et.limit) || R, pages: ((bt = Dt.meta) == null ? void 0 : bt.pages) || 1 }));
      } catch (pt) {
        Q && pe(pt.message || "Failed to load orders");
      } finally {
        Q && k(!1);
      }
    })(), () => {
      Q = !1;
    };
  }, [m, b, d, R, $]);
  function Pe(Q) {
    const $e = [Q.created_at, Q.createdAt, Q.expected_delivery_time, Q.expectedDeliveryTime, Q.deliveryStartTime, Q.deliveryStartTime, Q.actual_delivery_time, Q.actualDeliveryTime];
    for (const ft of $e) {
      if (!ft) continue;
      const et = Date.parse(String(ft));
      if (!Number.isNaN(et)) return new Date(et);
    }
    return null;
  }
  function tt() {
    var Q, $e, ft;
    try {
      const et = ce ? /* @__PURE__ */ new Date(ce + "T00:00:00") : null, bt = He ? /* @__PURE__ */ new Date(He + "T23:59:59") : null, pt = [], $t = ["Order", "Customer", "Address", "Rider", "Packer", "Start", "Expected", "Actual", "Amount", "Payment Method", "Status"];
      pt.push($t.map((Re) => `"${Re.replace(/"/g, '""')}"`).join(","));
      const Dt = Array.isArray(o) ? o : [];
      for (const Re of Dt) {
        const xt = Pe(Re);
        if (et && (!xt || xt < et) || bt && (!xt || xt > bt)) continue;
        const en = Re.name || Re.order_number || Re.id || "", fn = Re.full_name || Re.customer && Re.customer.full_name || "";
        let yn = "-";
        typeof Re.shipping_address == "string" && String(Re.shipping_address).trim() ? yn = String(Re.shipping_address).trim() : Re.shipping_address && typeof Re.shipping_address == "object" ? yn = [Re.shipping_address.address1 || "", Re.shipping_address.city || "", Re.shipping_address.province || "", Re.shipping_address.country || ""].map((rt) => String(rt || "").trim()).filter(Boolean).join(", ") || "-" : typeof Re.billing_address == "string" && String(Re.billing_address).trim() ? yn = String(Re.billing_address).trim() : Re.billing_address && typeof Re.billing_address == "object" && (yn = [Re.billing_address.address1 || "", Re.billing_address.city || "", Re.billing_address.province || "", Re.billing_address.country || ""].map((rt) => String(rt || "").trim()).filter(Boolean).join(", ") || "-");
        const Gn = Re.rider ? String(Re.rider) : (Q = Re.assignment) != null && Q.riderId ? String(Re.assignment.riderId) : "Unassigned", se = Re.packerName || (Re.packed_by ? String(Re.packed_by) : ""), Ee = typeof kh == "function" ? Bh(kh(Re)) : "", Be = typeof yd == "function" ? $h(yd(Re)) : "", ut = typeof bd == "function" ? Ih(bd(Re)) : "", yt = Re.amount || (($e = Re.assignment) == null ? void 0 : $e.amount) || "", Ct = Re.paymentMethod || ((ft = Re.assignment) == null ? void 0 : ft.paymentMethod) || "", jt = (Re.current_status || Re.order_status || Re.status || "").toString(), Ot = [en, fn, yn, Gn, se, Ee, Be, ut, yt, Ct, jt].map((rt) => `"${String(rt || "").replace(/"/g, '""')}"`).join(",");
        pt.push(Ot);
      }
      const It = pt.join(`
`), Yt = new Blob([It], { type: "text/csv;charset=utf-8;" }), Ft = URL.createObjectURL(Yt), kt = document.createElement("a");
      kt.href = Ft, kt.download = `orders_${ce || "all"}_${He || "all"}.csv`, document.body.appendChild(kt), kt.click(), kt.remove(), URL.revokeObjectURL(Ft);
    } catch (et) {
      try {
        window && typeof window.showToast == "function" && window.showToast(et.message || "Failed to generate CSV", { type: "error" });
      } catch {
      }
    }
  }
  y.useMemo(() => o, [o]);
  const dt = y.useMemo(() => {
    if (!Array.isArray(o)) return [];
    if (b === "all") return o.slice();
    const Q = Yh(xx[b] || b);
    return o.filter(($e) => Nx($e) === Q);
  }, [o, b]);
  function bn() {
    J(null), U(!1);
  }
  function Qt(Q) {
    q(Q), ie(!0);
  }
  function Lt() {
    q(null), ie(!1);
  }
  function Un(Q) {
    W(Q), ye(!0);
  }
  function Xt() {
    W(null), ye(!1);
  }
  function Jt(Q) {
    try {
      const { orderId: $e } = Q || {};
      if (!$e) return;
      const ft = String($e).replace(/^#+/, "");
      w(1);
      try {
        window && typeof window.showToast == "function" && window.showToast(`Order assigned: ${$e}`, { type: "success" });
      } catch {
      }
    } catch {
    }
  }
  async function Zt(Q) {
    if (Q)
      try {
        const $e = await fetch(`/api/orders/${encodeURIComponent(Q)}/unassign`, {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" }
        });
        if ($e.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!$e.ok) throw new Error("Failed to unassign order");
        try {
          window && typeof window.showToast == "function" && window.showToast(`Order unassigned: ${Q}`, { type: "success" });
        } catch {
        }
        w(1), te((ft) => ft + 1);
      } catch ($e) {
        try {
          window && typeof window.showToast == "function" && window.showToast($e.message || "Failed to unassign order", { type: "error" });
        } catch {
        }
      }
  }
  return /* @__PURE__ */ s.jsxDEV(Mr, { children: /* @__PURE__ */ s.jsxDEV("section", { className: "rider-commissions", children: [
    /* @__PURE__ */ s.jsxDEV("header", { className: "rc-header", children: [
      /* @__PURE__ */ s.jsxDEV("div", { className: "rc-header-left", children: [
        /* @__PURE__ */ s.jsxDEV("h2", { className: "rc-title", children: "Order Management" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 198,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ s.jsxDEV("p", { className: "rc-subtitle", children: "Manage orders synced from Shopify." }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 199,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 197,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ s.jsxDEV("div", { className: "rc-date-range", children: [
        /* @__PURE__ */ s.jsxDEV("label", { className: "date-field", children: [
          /* @__PURE__ */ s.jsxDEV("span", { className: "sr-only", children: "From date" }, void 0, !1, {
            fileName: "/app/code/client/pages/Orders.jsx",
            lineNumber: 204,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ s.jsxDEV("input", { "aria-label": "From date", className: "date-input", type: "date", value: ce, onChange: (Q) => Ve(Q.target.value) }, void 0, !1, {
            fileName: "/app/code/client/pages/Orders.jsx",
            lineNumber: 205,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 203,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ s.jsxDEV("label", { className: "date-field", children: [
          /* @__PURE__ */ s.jsxDEV("span", { className: "sr-only", children: "To date" }, void 0, !1, {
            fileName: "/app/code/client/pages/Orders.jsx",
            lineNumber: 208,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ s.jsxDEV("input", { "aria-label": "To date", className: "date-input", type: "date", value: He, onChange: (Q) => st(Q.target.value) }, void 0, !1, {
            fileName: "/app/code/client/pages/Orders.jsx",
            lineNumber: 209,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 207,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ s.jsxDEV("button", { className: "rc-select rc-chip download-csv-btn", onClick: tt, children: "Download CSV" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 211,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 202,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 196,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ s.jsxDEV("div", { className: "rc-toolbar", children: [
      /* @__PURE__ */ s.jsxDEV("div", { className: "rc-search", children: [
        /* @__PURE__ */ s.jsxDEV("span", { className: "rc-search-icon", "aria-hidden": "true" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 217,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ s.jsxDEV("input", { className: "rc-search-input", type: "search", placeholder: "Search", value: m, onChange: (Q) => {
          g(Q.target.value), w(1);
        } }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 218,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 216,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ s.jsxDEV("div", { className: "rc-filters", children: W_.map(({ key: Q, label: $e }) => /* @__PURE__ */ s.jsxDEV("button", { className: `rc-select rc-chip${b === Q ? " active" : ""}`, onClick: () => {
        S(Q), w(1);
      }, "data-filter": Q, children: $e }, Q, !1, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 222,
        columnNumber: 15
      }, this)) }, void 0, !1, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 220,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 215,
      columnNumber: 9
    }, this),
    !G && /* @__PURE__ */ s.jsxDEV("div", { className: "section-note", children: "Shopify is not configured. Set SHOPIFY_SHOP and SHOPIFY_ADMIN_TOKEN to enable orders sync." }, void 0, !1, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 230,
      columnNumber: 11
    }, this),
    le && /* @__PURE__ */ s.jsxDEV("div", { className: "auth-error", children: le }, void 0, !1, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 232,
      columnNumber: 25
    }, this),
    /* @__PURE__ */ s.jsxDEV("div", { className: "rc-table-wrapper orders-table-scroll", children: /* @__PURE__ */ s.jsxDEV("table", { className: "rc-table", children: [
      /* @__PURE__ */ s.jsxDEV("thead", { children: /* @__PURE__ */ s.jsxDEV("tr", { children: [
        /* @__PURE__ */ s.jsxDEV("th", { className: "col-name order-id-heading", children: "Order" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 238,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ s.jsxDEV("th", { className: "col-km customer-heading", children: "Customer" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 239,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ s.jsxDEV("th", { className: "col-perf address-heading", children: "Address" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 240,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ s.jsxDEV("th", { className: "col-rider rider-heading", children: "Rider" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 241,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ s.jsxDEV("th", { className: "col-packer packer-heading", children: "Packer" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 242,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ s.jsxDEV("th", { className: "col-start-time start-heading", children: "Start" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 243,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ s.jsxDEV("th", { className: "col-expected expected-heading", children: "Expected" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 244,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ s.jsxDEV("th", { className: "col-actual actual-heading", children: "Actual" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 245,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ s.jsxDEV("th", { className: "col-amount amount-heading", children: "Amount" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 246,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ s.jsxDEV("th", { className: "col-payment payment-heading", children: "Payment Method" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 247,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ s.jsxDEV("th", { className: "col-status status-heading", children: "Status" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 248,
          columnNumber: 17
        }, this),
        /* @__PURE__ */ s.jsxDEV("th", { className: "col-actions actions-heading", children: "Actions" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 249,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 237,
        columnNumber: 15
      }, this) }, void 0, !1, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 236,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ s.jsxDEV("tbody", { children: [
        T && /* @__PURE__ */ s.jsxDEV("tr", { children: /* @__PURE__ */ s.jsxDEV("td", { colSpan: 12, className: "section-note", children: "Loading…" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 254,
          columnNumber: 21
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 254,
          columnNumber: 17
        }, this),
        !T && ee && /* @__PURE__ */ s.jsxDEV("tr", { children: /* @__PURE__ */ s.jsxDEV("td", { colSpan: 12, className: "auth-error", children: ee }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 257,
          columnNumber: 21
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 257,
          columnNumber: 17
        }, this),
        !T && !ee && dt.map((Q, $e) => {
          var yn, Gn, se;
          const ft = Ix(Q), et = Nx(Q), bt = Q.full_name || (Q.customer && Q.customer.full_name ? Q.customer.full_name : "");
          let pt = "-";
          typeof Q.shipping_address == "string" && String(Q.shipping_address).trim() ? pt = String(Q.shipping_address).trim() : Q.shipping_address && typeof Q.shipping_address == "object" ? pt = [Q.shipping_address.address1 || "", Q.shipping_address.city || "", Q.shipping_address.province || "", Q.shipping_address.country || ""].map((Ee) => String(Ee || "").trim()).filter(Boolean).join(", ") || "-" : typeof Q.billing_address == "string" && String(Q.billing_address).trim() ? pt = String(Q.billing_address).trim() : Q.billing_address && typeof Q.billing_address == "object" && (pt = [Q.billing_address.address1 || "", Q.billing_address.city || "", Q.billing_address.province || "", Q.billing_address.country || ""].map((Ee) => String(Ee || "").trim()).filter(Boolean).join(", ") || "-");
          const $t = Q.name || Q.order_number || Q.id, Dt = $t != null ? String($t).replace(/^#+/, "").trim() : "", It = Dt || "-", Yt = kh(Q), Ft = Bh(Yt), kt = yd(Q), Re = $h(kt), xt = bd(Q), en = Ih(xt), fn = Q.rider ? String(Q.rider) : (yn = Q.assignment) != null && yn.riderId ? String(Q.assignment.riderId) : "Unassigned";
          return /* @__PURE__ */ s.jsxDEV("tr", { "data-status": et, children: [
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-name order-id-cell", children: It }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 288,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-km customer-cell", children: bt || "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 289,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-perf address-cell", children: pt }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 290,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-rider rider-cell", children: fn }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 291,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-packer packer-cell", children: Q.packerName || (Q.packed_by ? String(Q.packed_by) : "-") }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 292,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-start-time start-cell", children: Ft }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 293,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-expected expected-cell", children: Re }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 294,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-actual actual-time-cell", children: en }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 295,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-amount amount-cell", children: Q.amount || ((Gn = Q.assignment) == null ? void 0 : Gn.amount) || "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 296,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-payment payment-cell", children: Q.paymentMethod || ((se = Q.assignment) == null ? void 0 : se.paymentMethod) || "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 297,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-status status-cell", children: /* @__PURE__ */ s.jsxDEV("span", { className: `status-chip status-${et}`, children: ft }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 299,
              columnNumber: 23
            }, this) }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 298,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-actions actions-cell", children: /* @__PURE__ */ s.jsxDEV("div", { className: "actions-container", children: [
              et === "assigned" && /* @__PURE__ */ s.jsxDEV(
                "button",
                {
                  className: "status-unassign-btn icon-black",
                  onClick: () => Zt(Dt),
                  "aria-label": "Unassign order",
                  title: "Unassign order",
                  children: /* @__PURE__ */ s.jsxDEV("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ s.jsxDEV("path", { d: "M18.3 5.71a1 1 0 0 0-1.41 0L12 10.59 7.11 5.7A1 1 0 0 0 5.7 7.11L10.59 12l-4.9 4.89a1 1 0 1 0 1.41 1.41L12 13.41l4.89 4.9a1 1 0 0 0 1.41-1.41L13.41 12l4.9-4.89a1 1 0 0 0-.01-1.4z" }, void 0, !1, {
                    fileName: "/app/code/client/pages/Orders.jsx",
                    lineNumber: 310,
                    columnNumber: 151
                  }, this) }, void 0, !1, {
                    fileName: "/app/code/client/pages/Orders.jsx",
                    lineNumber: 310,
                    columnNumber: 29
                  }, this)
                },
                void 0,
                !1,
                {
                  fileName: "/app/code/client/pages/Orders.jsx",
                  lineNumber: 304,
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
                  disabled: et !== "delivered",
                  onClick: () => et === "delivered" && Un(Q),
                  children: /* @__PURE__ */ s.jsxDEV("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": "true", children: [
                    /* @__PURE__ */ s.jsxDEV("path", { d: "M21 5h-3.17l-1.41-1.41A2 2 0 0 0 15 3H9a2 2 0 0 0-1.41.59L6.17 5H3a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2zm0 13H3V7h4.05l1.41-1.41.01-.01L9 5h6l.53.58L17.95 7H21v11z" }, void 0, !1, {
                      fileName: "/app/code/client/pages/Orders.jsx",
                      lineNumber: 320,
                      columnNumber: 149
                    }, this),
                    /* @__PURE__ */ s.jsxDEV("path", { d: "M12 8a5 5 0 1 0 .001 10.001A5 5 0 0 0 12 8zm0 8a3 3 0 1 1 .001-6.001A3 3 0 0 1 12 16z" }, void 0, !1, {
                      fileName: "/app/code/client/pages/Orders.jsx",
                      lineNumber: 320,
                      columnNumber: 351
                    }, this)
                  ] }, void 0, !0, {
                    fileName: "/app/code/client/pages/Orders.jsx",
                    lineNumber: 320,
                    columnNumber: 27
                  }, this)
                },
                void 0,
                !1,
                {
                  fileName: "/app/code/client/pages/Orders.jsx",
                  lineNumber: 313,
                  columnNumber: 25
                },
                this
              ),
              /* @__PURE__ */ s.jsxDEV(
                "button",
                {
                  className: "status-edit-btn icon-black",
                  onClick: () => Qt(Q),
                  "aria-label": "Edit order",
                  title: "Edit order",
                  children: /* @__PURE__ */ s.jsxDEV("svg", { xmlns: "http://www.w3.org/2000/svg", width: "16", height: "16", viewBox: "0 0 24 24", fill: "currentColor", "aria-hidden": "true", children: /* @__PURE__ */ s.jsxDEV("path", { d: "M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zm2.92 2.33H5v-.92l9.06-9.06.92.92L5.92 19.58zM20.71 7.04a1.003 1.003 0 0 0 0-1.42l-2.34-2.34a1.003 1.003 0 0 0-1.42 0l-1.83 1.83 3.75 3.75 1.84-1.82z" }, void 0, !1, {
                    fileName: "/app/code/client/pages/Orders.jsx",
                    lineNumber: 328,
                    columnNumber: 149
                  }, this) }, void 0, !1, {
                    fileName: "/app/code/client/pages/Orders.jsx",
                    lineNumber: 328,
                    columnNumber: 27
                  }, this)
                },
                void 0,
                !1,
                {
                  fileName: "/app/code/client/pages/Orders.jsx",
                  lineNumber: 322,
                  columnNumber: 25
                },
                this
              )
            ] }, void 0, !0, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 302,
              columnNumber: 23
            }, this) }, void 0, !1, {
              fileName: "/app/code/client/pages/Orders.jsx",
              lineNumber: 301,
              columnNumber: 21
            }, this)
          ] }, $t || $e, !0, {
            fileName: "/app/code/client/pages/Orders.jsx",
            lineNumber: 287,
            columnNumber: 19
          }, this);
        }),
        !T && !ee && dt.length === 0 && /* @__PURE__ */ s.jsxDEV("tr", { children: /* @__PURE__ */ s.jsxDEV("td", { colSpan: 12, className: "section-note", children: "No orders to display." }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 336,
          columnNumber: 21
        }, this) }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 336,
          columnNumber: 17
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 252,
        columnNumber: 13
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 235,
      columnNumber: 11
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 234,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ s.jsxDEV("div", { className: "rc-toolbar", "aria-label": "pagination", children: [
      F && re && /* @__PURE__ */ s.jsxDEV($x, { orderId: re, onClose: bn, onAssigned: Jt }, void 0, !1, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 343,
        columnNumber: 11
      }, this),
      K && we && /* @__PURE__ */ s.jsxDEV(q_, { order: we, onClose: Lt, onUpdated: () => {
        te((Q) => Q + 1), Lt();
      } }, void 0, !1, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 346,
        columnNumber: 11
      }, this),
      be && Y && /* @__PURE__ */ s.jsxDEV(G_, { order: Y, onClose: Xt }, void 0, !1, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 349,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ s.jsxDEV("div", { className: "rc-filters", children: [
        /* @__PURE__ */ s.jsxDEV("button", { className: "rc-select rc-chip", disabled: M.page <= 1 || T, onClick: () => w((Q) => Math.max(1, Q - 1)), children: "Prev" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 352,
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
          lineNumber: 353,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ s.jsxDEV("button", { className: "rc-select rc-chip", disabled: M.page >= M.pages || T, onClick: () => w((Q) => Math.min(M.pages, Q + 1)), children: "Next" }, void 0, !1, {
          fileName: "/app/code/client/pages/Orders.jsx",
          lineNumber: 354,
          columnNumber: 13
        }, this)
      ] }, void 0, !0, {
        fileName: "/app/code/client/pages/Orders.jsx",
        lineNumber: 351,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Orders.jsx",
      lineNumber: 341,
      columnNumber: 9
    }, this)
  ] }, void 0, !0, {
    fileName: "/app/code/client/pages/Orders.jsx",
    lineNumber: 195,
    columnNumber: 7
  }, this) }, void 0, !1, {
    fileName: "/app/code/client/pages/Orders.jsx",
    lineNumber: 194,
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
    /* @__PURE__ */ s.jsxDEV("header", { className: "rc-header", children: [
      /* @__PURE__ */ s.jsxDEV("h2", { className: "rc-title", children: "Reporting & Analytics" }, void 0, !1, {
        fileName: "/app/code/client/pages/Reports.jsx",
        lineNumber: 34,
        columnNumber: 11
      }, this),
      /* @__PURE__ */ s.jsxDEV("p", { className: "rc-subtitle", children: "Gain insights into your delivery operations with detailed reports and visualizations." }, void 0, !1, {
        fileName: "/app/code/client/pages/Reports.jsx",
        lineNumber: 35,
        columnNumber: 11
      }, this)
    ] }, void 0, !0, {
      fileName: "/app/code/client/pages/Reports.jsx",
      lineNumber: 33,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ s.jsxDEV("div", { className: "rc-toolbar", children: /* @__PURE__ */ s.jsxDEV("div", { className: "rc-filters", children: [
      /* @__PURE__ */ s.jsxDEV("button", { className: "rc-select rc-chip", "data-tab": "overview", children: "Overview" }, void 0, !1, {
        fileName: "/app/code/client/pages/Reports.jsx",
        lineNumber: 40,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ s.jsxDEV("button", { className: "rc-select rc-chip", "data-tab": "performance", children: "Performance" }, void 0, !1, {
        fileName: "/app/code/client/pages/Reports.jsx",
        lineNumber: 41,
        columnNumber: 13
      }, this),
      /* @__PURE__ */ s.jsxDEV("button", { className: "rc-select rc-chip", "data-tab": "custom", children: "Custom Reports" }, void 0, !1, {
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
    /* @__PURE__ */ s.jsxDEV("div", { id: "tab-overview", children: [
      /* @__PURE__ */ s.jsxDEV("div", { className: "rc-table-wrapper reports-overview", children: [
        /* @__PURE__ */ s.jsxDEV("div", { className: "rc-select rc-chip block-chip", children: [
          /* @__PURE__ */ s.jsxDEV("div", { className: "section-title reports-stat-title", children: "Total Deliveries" }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 49,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ s.jsxDEV("div", { className: "reports-stat-value", children: o.totalDeliveries }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 50,
            columnNumber: 15
          }, this)
        ] }, void 0, !0, {
          fileName: "/app/code/client/pages/Reports.jsx",
          lineNumber: 48,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ s.jsxDEV("div", { className: "rc-select rc-chip block-chip", children: [
          /* @__PURE__ */ s.jsxDEV("div", { className: "section-title reports-stat-title", children: "Average Delivery Time" }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 53,
            columnNumber: 15
          }, this),
          /* @__PURE__ */ s.jsxDEV("div", { className: "reports-stat-value", children: [
            o.avgDeliveryMins,
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
      /* @__PURE__ */ s.jsxDEV("div", { className: "rc-toolbar reports-toolbar-center", children: [
        /* @__PURE__ */ s.jsxDEV("div", { className: "section-title reports-stat-title", children: "Delivery Data" }, void 0, !1, {
          fileName: "/app/code/client/pages/Reports.jsx",
          lineNumber: 59,
          columnNumber: 13
        }, this),
        /* @__PURE__ */ s.jsxDEV("label", { className: "rc-select rc-chip toggle-data-label", children: [
          /* @__PURE__ */ s.jsxDEV("input", { type: "checkbox", checked: b, onChange: (M) => S(M.target.checked) }, void 0, !1, {
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
      b && /* @__PURE__ */ s.jsxDEV("div", { className: "rc-table-wrapper", children: /* @__PURE__ */ s.jsxDEV("table", { className: "rc-table", children: [
        /* @__PURE__ */ s.jsxDEV("thead", { children: /* @__PURE__ */ s.jsxDEV("tr", { children: [
          /* @__PURE__ */ s.jsxDEV("th", { className: "col-name", children: "Order Number" }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 70,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ s.jsxDEV("th", { className: "col-km", children: "Rider Assigned" }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 71,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ s.jsxDEV("th", { className: "col-perf", children: "Expected Time" }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 72,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ s.jsxDEV("th", { className: "col-perf", children: "Actual Delivery Time" }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 73,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ s.jsxDEV("th", { className: "col-perf", children: "Distance Traveled" }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 74,
            columnNumber: 21
          }, this),
          /* @__PURE__ */ s.jsxDEV("th", { className: "col-comm", children: "Status" }, void 0, !1, {
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
        /* @__PURE__ */ s.jsxDEV("tbody", { children: [
          !d && !R && m.map((M, x) => /* @__PURE__ */ s.jsxDEV("tr", { children: [
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-name", children: [
              "#",
              M.orderNumber || M.orderId
            ] }, void 0, !0, {
              fileName: "/app/code/client/pages/Reports.jsx",
              lineNumber: 81,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-km", children: M.riderId || "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Reports.jsx",
              lineNumber: 82,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-perf", children: M.expectedMinutes != null ? `${M.expectedMinutes} mins` : "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Reports.jsx",
              lineNumber: 83,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-perf", children: M.durationMins != null ? `${M.durationMins} mins` : "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Reports.jsx",
              lineNumber: 84,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-perf", children: "-" }, void 0, !1, {
              fileName: "/app/code/client/pages/Reports.jsx",
              lineNumber: 85,
              columnNumber: 23
            }, this),
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-commission", children: M.status || "new" }, void 0, !1, {
              fileName: "/app/code/client/pages/Reports.jsx",
              lineNumber: 86,
              columnNumber: 23
            }, this)
          ] }, M.orderId || x, !0, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 80,
            columnNumber: 21
          }, this)),
          !d && !R && m.length === 0 && /* @__PURE__ */ s.jsxDEV("tr", { children: /* @__PURE__ */ s.jsxDEV("td", { colSpan: 6, className: "section-note", children: "No data." }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 90,
            columnNumber: 25
          }, this) }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 90,
            columnNumber: 21
          }, this),
          d && /* @__PURE__ */ s.jsxDEV("tr", { children: /* @__PURE__ */ s.jsxDEV("td", { colSpan: 6, className: "section-note", children: "Loading…" }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 93,
            columnNumber: 25
          }, this) }, void 0, !1, {
            fileName: "/app/code/client/pages/Reports.jsx",
            lineNumber: 93,
            columnNumber: 21
          }, this),
          R && /* @__PURE__ */ s.jsxDEV("tr", { children: /* @__PURE__ */ s.jsxDEV("td", { colSpan: 6, className: "auth-error", children: R }, void 0, !1, {
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
function X_({ onClose: o, onCreated: f }) {
  const [m, g] = y.useState(""), [b, S] = y.useState(""), [d, w] = y.useState(""), [R, j] = y.useState(!1), [M, x] = y.useState(""), [T, k] = y.useState(""), [ee, pe] = y.useState(!1), [le, oe] = y.useState(!1), [G, P] = y.useState(!1), [$, te] = y.useState(!1), F = "+92";
  function U(J) {
    const K = String(J || "").replace(/\D+/g, "");
    return K.length === 0 ? "" : K.startsWith("92") ? F + K.slice(2) : F + K;
  }
  async function re() {
    x(""), k(""), te(!0);
    const J = String(m), K = String(b).trim(), ie = String(d).trim(), we = ie.replace(/\D+/g, ""), q = { fn: !K, cn: !ie, pw: !J };
    if (pe(q.fn), oe(q.cn || we.length !== 10), P(q.pw), q.fn || q.cn || q.pw) {
      x("Full name, mobile and password are required");
      return;
    }
    if (we.length !== 10) {
      x("numbers should be 10 digit"), oe(!0);
      return;
    }
    if (J.length < 6) {
      P(!0), x("Password must be at least 6 characters");
      return;
    }
    j(!0);
    try {
      const be = U(ie), ye = await fetch("/api/packers", {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password: J, fullName: K, contactNumber: be })
      }), Y = await ye.json().catch(() => null);
      if (!ye.ok) {
        const W = String(Y && (Y.error || Y.message) || ""), ce = W.toUpperCase();
        if (/MISSING\s*FULLNAME\/CONTACTNUMBER/i.test(W) || /MISSING\s*PASSWORD/i.test(W))
          x("Full name, mobile and password are required"), pe(!K), oe(!ie || we.length !== 10), P(!J);
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
        /* @__PURE__ */ s.jsxDEV("input", { className: "field-input" + ($ && !String(b).trim() ? " input-error" : ""), value: b, onChange: (J) => {
          S(J.target.value), $ && pe(!String(J.target.value).trim());
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
        /* @__PURE__ */ s.jsxDEV("input", { className: "field-input" + ($ && !String(m) ? " input-error" : ""), type: "password", value: m, onChange: (J) => {
          g(J.target.value), $ && P(!String(J.target.value));
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
              onChange: (J) => {
                const K = J.target.value.replace(/\D+/g, "").slice(0, 10);
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
      var U, re, J, K;
      g(!0), S("");
      try {
        const ie = new URLSearchParams();
        ie.set("limit", String(R)), ie.set("page", String(d)), ie.set("status", "new");
        const we = await fetch(`/api/orders?${ie.toString()}`, { credentials: "include" });
        if (we.status === 401) {
          window.location.href = "/auth/login";
          return;
        }
        if (!we.ok) throw new Error("Failed to load orders");
        const q = await we.json();
        F && (f(Array.isArray(q.orders) ? q.orders : []), x({ total: ((U = q.meta) == null ? void 0 : U.total) || 0, page: ((re = q.meta) == null ? void 0 : re.page) || d, limit: ((J = q.meta) == null ? void 0 : J.limit) || R, pages: ((K = q.meta) == null ? void 0 : K.pages) || 1 }));
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
      f((J) => J.filter((K, ie) => {
        const we = String(K.id || K.name || K.order_number || ie).replace(/^#+/, "");
        return String(we) !== String(re);
      })), x((J) => ({ ...J || {}, total: Math.max(0, ((J == null ? void 0 : J.total) || 0) - 1) }));
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
          const J = T(U), K = U.full_name || (U.customer && U.customer.full_name ? U.customer.full_name : "");
          let ie = "-";
          typeof U.shipping_address == "string" && String(U.shipping_address).trim() ? ie = String(U.shipping_address).trim() : U.shipping_address && typeof U.shipping_address == "object" ? ie = [U.shipping_address.address1 || "", U.shipping_address.city || "", U.shipping_address.province || "", U.shipping_address.country || ""].map((W) => String(W || "").trim()).filter(Boolean).join(", ") || "-" : typeof U.billing_address == "string" && String(U.billing_address).trim() ? ie = String(U.billing_address).trim() : U.billing_address && typeof U.billing_address == "object" && (ie = [U.billing_address.address1 || "", U.billing_address.city || "", U.billing_address.province || "", U.billing_address.country || ""].map((W) => String(W || "").trim()).filter(Boolean).join(", ") || "-");
          const we = U.name || U.order_number || U.id || re, q = String(U.id || U.name || U.order_number || re).replace(/^#+/, ""), be = U.created_at ? new Date(U.created_at) : null, ye = be ? be.toLocaleDateString() : "-", Y = be ? be.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "-";
          return /* @__PURE__ */ s.jsxDEV("tr", { "data-status": J, children: [
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-order", children: we }, void 0, !1, {
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
            /* @__PURE__ */ s.jsxDEV("td", { className: "rc-col-status", children: /* @__PURE__ */ s.jsxDEV("span", { className: `status-chip status-${J}`, children: J.replace("-", " ") }, void 0, !1, {
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
    k && pe && /* @__PURE__ */ s.jsxDEV($x, { orderId: pe, onClose: $, onAssigned: te }, void 0, !1, {
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
  const [o, f] = y.useState(Na.baseFare), [m, g] = y.useState(Na.farePerKm), [b, S] = y.useState(!1);
  y.useEffect(() => {
    const R = zx();
    f(R.baseFare), g(R.farePerKm);
  }, []);
  function d() {
    S(!0);
    try {
      const R = { baseFare: Number(o) || 0, farePerKm: Number(m) || 0 };
      if (typeof window < "u" && window.localStorage) {
        window.localStorage.setItem(Ed, JSON.stringify(R));
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
    f(Na.baseFare), g(Na.farePerKm);
    try {
      if (typeof window < "u" && window.localStorage) {
        window.localStorage.removeItem(Ed);
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
  return /* @__PURE__ */ s.jsxDEV(g_, { children: /* @__PURE__ */ s.jsxDEV(n_, { children: [
    /* @__PURE__ */ s.jsxDEV(lr, { path: "/auth/login", element: /* @__PURE__ */ s.jsxDEV(__, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 16,
      columnNumber: 44
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 16,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ s.jsxDEV(lr, { path: "/auth/register", element: /* @__PURE__ */ s.jsxDEV(O_, {}, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 17,
      columnNumber: 47
    }, this) }, void 0, !1, {
      fileName: "/app/code/client/App.jsx",
      lineNumber: 17,
      columnNumber: 9
    }, this),
    /* @__PURE__ */ s.jsxDEV(lr, { path: "/riders", element: /* @__PURE__ */ s.jsxDEV(B_, {}, void 0, !1, {
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
    /* @__PURE__ */ s.jsxDEV(lr, { path: "*", element: /* @__PURE__ */ s.jsxDEV(e_, { to: "/auth/login", replace: !0 }, void 0, !1, {
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
function Ex() {
  const o = document.getElementById("react-root");
  if (!o) return;
  wx(o).render(/* @__PURE__ */ s.jsxDEV(eO, {}, void 0, !1, {
    fileName: "/app/code/client/main.jsx",
    lineNumber: 9,
    columnNumber: 15
  }, this));
}
document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", Ex) : Ex();
